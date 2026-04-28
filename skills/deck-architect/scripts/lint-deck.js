#!/usr/bin/env node
/*
 * lint-deck.js — static checks for deck-architect HTML output.
 *
 * Usage:
 *   node lint-deck.js <path-to-deck.html>
 *
 * Exit 0 = clean. Exit 1 = one or more failures. Diagnostic goes to stderr.
 *
 * Regex-based (no DOM). Checks the items from references/html-renderer.md
 * that can be verified without rendering. Rendering-only issues (counter
 * overflow at 960px, console errors) still need the manual checklist.
 */

const fs = require("fs");
const path = require("path");

const file = process.argv[2];
if (!file) {
  console.error("usage: node lint-deck.js <deck.html>");
  process.exit(2);
}
const html = fs.readFileSync(file, "utf8");

// Strip HTML comments before slide-splitting. Commented-out <section>
// blocks (e.g. scaffold templates showing optional appendix markup) would
// otherwise inflate the slide count and confuse role/cover/divider checks.
const htmlForSlides = html.replace(/<!--[\s\S]*?-->/g, "");

let failures = 0;
function fail(msg) { console.error("FAIL: " + msg); failures++; }
function ok(msg)   { console.log ("  ok: " + msg); }

// Split into slide sections by <section ... class*="slide" ...>. Regex is
// intentionally simple — we only need a rough slice for text-level checks.
const slideRe = /<section\b([^>]*)\bclass=["'][^"']*\bslide\b[^"']*["']([^>]*)>([\s\S]*?)<\/section>/gi;
const slides = [];
let m;
while ((m = slideRe.exec(htmlForSlides)) !== null) {
  const attrs = (m[1] + " " + m[2]);
  const role = /data-role=["']([^"']+)["']/.exec(attrs)?.[1] || null;
  const section = /data-section=["']([^"']+)["']/.exec(attrs)?.[1] || null;
  slides.push({ role, section, body: m[3], index: slides.length });
}

if (slides.length === 0) {
  fail(`no <section class="slide"> blocks found — is this a deck-architect HTML file?`);
  process.exit(1);
}

// ─── Check 1: every slide has data-role ───────────────────────────────────
const missingRole = slides.filter(s => !s.role);
if (missingRole.length) {
  fail(`${missingRole.length} slide(s) missing data-role (indices: ${missingRole.map(s => s.index).join(", ")})`);
} else {
  ok(`all ${slides.length} slides have data-role`);
}

// ─── Check 2: exactly one cover, first ────────────────────────────────────
const covers = slides.filter(s => s.role === "cover");
if (covers.length !== 1) fail(`expected exactly 1 cover slide, found ${covers.length}`);
else if (slides[0].role !== "cover") fail(`cover slide must be first (found at index ${covers[0].index})`);
else ok(`cover present and first`);

// ─── Check 3: appendix-divider required when appendix slides exist ────────
const appendix = slides.filter(s => s.role === "appendix");
const dividers = slides.filter(s => s.role === "appendix-divider");
if (appendix.length > 0) {
  if (dividers.length === 0) {
    fail(`${appendix.length} appendix slide(s) present but no appendix-divider`);
  } else if (dividers.length > 1) {
    fail(`${dividers.length} appendix-dividers present — expected exactly 1`);
  } else {
    const dividerIdx = dividers[0].index;
    const firstAppendixIdx = appendix[0].index;
    if (dividerIdx >= firstAppendixIdx) {
      fail(`appendix-divider at index ${dividerIdx} does not precede first appendix slide at ${firstAppendixIdx}`);
    } else {
      ok(`appendix-divider precedes ${appendix.length} appendix slide(s)`);
    }
  }
} else if (dividers.length > 0) {
  fail(`appendix-divider present but no appendix slides`);
}

// ─── Check 4: every main + appendix slide has <aside class="notes"> ───────
const notesRe = /<aside\b[^>]*\bclass=["'][^"']*\bnotes\b/i;
const needNotes = slides.filter(s => s.role === "main" || s.role === "appendix");
const missingNotes = needNotes.filter(s => !notesRe.test(s.body));
if (missingNotes.length) {
  fail(`${missingNotes.length} content slide(s) missing <aside class="notes">: ${missingNotes.map(s => s.section || `#${s.index}`).slice(0, 5).join(", ")}${missingNotes.length > 5 ? ", …" : ""}`);
} else {
  ok(`all ${needNotes.length} content slides have speaker-notes aside`);
}

// Empty-notes check (aside exists but no text content)
const emptyNotes = needNotes.filter(s => {
  const match = /<aside\b[^>]*\bclass=["'][^"']*\bnotes\b[^>]*>([\s\S]*?)<\/aside>/i.exec(s.body);
  if (!match) return false;
  const text = match[1].replace(/<[^>]+>/g, "").trim();
  return text.length < 20;
});
if (emptyNotes.length) {
  fail(`${emptyNotes.length} content slide(s) have empty/near-empty notes (<20 chars): ${emptyNotes.map(s => s.section || `#${s.index}`).slice(0, 5).join(", ")}`);
} else if (needNotes.length > 0) {
  ok(`no empty speaker-notes asides`);
}

// ─── Check 5: slide-body commentary bans ──────────────────────────────────
// Strip the notes aside before scanning so notes content doesn't trigger.
function stripNotes(body) {
  return body.replace(/<aside\b[^>]*\bclass=["'][^"']*\bnotes\b[^>]*>[\s\S]*?<\/aside>/gi, "");
}
const banPatterns = [
  { pat: /\bTriggered by\s*:/i,            why: `"Triggered by:" is outline metadata` },
  { pat: /\bdepth\s*:?\s*L[123]\b/i,       why: `"Depth L2/L3" is outline metadata` },
  { pat: /\bsee\s+B\d+\b/i,                why: `"See B\\d+" is an internal cross-reference` },
  { pat: /\bsee\s+slide\s+\d+\b/i,         why: `"See slide N" is an internal cross-reference` },
  { pat: /\bas\s+covered\s+earlier\b/i,    why: `deck-structural narration` },
  { pat: /\bin\s+the\s+next\s+slide\b/i,   why: `deck-structural narration` },
  { pat: /\bthe\s+following\s+slides\b/i,  why: `deck-structural narration` },
  { pat: /\bthe\s+next\s+\d+\s+slides\b/i, why: `deck-structural narration ("the next N slides")` },
  { pat: /\bthe\s+next\s+(?:two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+slides\b/i, why: `deck-structural narration ("the next N slides", spelled out)` },
  { pat: /\bas\s+shown\s+on\s+slide\s+\d+\b/i, why: `cross-slide reference` },
  { pat: /\bas\s+we'?ll\s+see\s+in\b/i,    why: `forward-reference narration` },
  { pat: /\[INFERRED\s*—?\s*confirm\]/i,   why: `inferred marker should have been resolved` },
  { pat: /\bhardest\s+sell\s*:/i,          why: `audience-model metadata` },
  { pat: /\bpressure-tested\s+as\b/i,      why: `pressure-test log metadata` },
];
const bannedHits = [];
for (const s of slides) {
  if (s.role === "appendix-divider" || s.role === "cover" || s.role === "credits") continue;
  const visible = stripNotes(s.body);
  for (const { pat, why } of banPatterns) {
    if (pat.test(visible)) bannedHits.push({ section: s.section || `#${s.index}`, pat: pat.source, why });
  }
}
if (bannedHits.length) {
  fail(`${bannedHits.length} slide-body commentary violation(s):`);
  bannedHits.slice(0, 10).forEach(h => console.error(`        [${h.section}] ${h.why} (pattern /${h.pat}/)`));
  if (bannedHits.length > 10) console.error(`        … ${bannedHits.length - 10} more`);
} else {
  ok(`no slide-body commentary bans hit`);
}

// ─── Check 6: cover slide composition ─────────────────────────────────────
// The cover may have at most one <h1>. A second h1 or a kicker that renders
// as a title fragment is the "fragmented cover" failure mode. Also check
// that the cover's displayed text doesn't start with a continuation word
// like "And", "Plus", "Or" — the telltale of a split-title chain.
const cover = slides.find(s => s.role === "cover");
if (cover) {
  const h1Count = (cover.body.match(/<h1\b/gi) || []).length;
  if (h1Count > 1) fail(`cover slide has ${h1Count} <h1> elements (max 1)`);
  else ok(`cover has exactly one <h1>`);

  const h1Match = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(cover.body);
  const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : "";
  if (/^\s*(And|Plus|Or|But|Also)\b/i.test(h1Text)) {
    fail(`cover <h1> starts with continuation word — likely a split-title fragment: "${h1Text.slice(0, 60)}…"`);
  }
}

// ─── Check 6a: unrendered visual specs on main-flow slides ────────────────
// data-visual-todo is the explicit placeholder for not-yet-supplied visuals.
// It's fine during authoring; not fine on a shipped main-flow slide. Allowed
// in appendix (work-in-progress reference material).
const todoHits = [];
const unrenderedSpecs = [];
for (const s of slides) {
  const todoRe = /<figure\b[^>]*\bdata-visual-todo\b/gi;
  const specRe = /<figure\b[^>]*\bdata-visual-spec\b/gi;
  const renderedRe = /<figure\b[^>]*\bdata-rendered\s*=\s*["']true/i;

  let m;
  while ((m = todoRe.exec(s.body)) !== null) {
    if (s.role === "main" || s.role === "cover") {
      todoHits.push({ section: s.section || `#${s.index}`, role: s.role });
    }
  }
  // A raw <figure data-visual-spec> that wasn't post-processed means the
  // renderer wasn't run. Render-visual.js replaces the <figure> opening tag
  // with data-rendered="true" after swapping.
  if (specRe.test(s.body) && !renderedRe.test(s.body)) {
    unrenderedSpecs.push({ section: s.section || `#${s.index}`, role: s.role });
  }
}
if (todoHits.length) {
  fail(`${todoHits.length} unrendered data-visual-todo placeholder(s) on main-flow slides:`);
  todoHits.forEach(h => console.error(`        [${h.section}]`));
} else {
  ok(`no unrendered visual-todo placeholders on main-flow slides`);
}
if (unrenderedSpecs.length) {
  fail(`${unrenderedSpecs.length} data-visual-spec placeholder(s) not yet rendered — run scripts/render-visual.js before shipping:`);
  unrenderedSpecs.forEach(h => console.error(`        [${h.section}] role=${h.role}`));
} else {
  ok(`no unrendered visual-spec placeholders`);
}

// ─── Check 6b: appendix-divider has no meta row ───────────────────────────
// The divider is a dramatic pause, not a content slide. A counter chip next
// to the word "Appendix" competes for the same attention. The contract
// (html-renderer.md §3) is explicit: no meta row on the divider.
for (const d of dividers) {
  const hasCounter = /\bclass=["'][^"']*\bcounter\b[^"']*["']/i.test(d.body);
  const hasMeta    = /\bclass=["'][^"']*\bmeta\b[^"']*["']/i.test(d.body);
  if (hasCounter || hasMeta) {
    fail(`appendix-divider has a meta row / counter — divider should be counter-less (§3)`);
  }
}
if (dividers.length > 0 && !dividers.some(d => /\bclass=["'][^"']*\b(counter|meta)\b/i.test(d.body))) {
  ok(`appendix-divider has no meta row`);
}

// ─── Check 6c: presenter scaffold — notes tray, kbd hint pill ─────────────
// Three bugs Derek shipped in a v1 generation mapped to these three rules:
//   (a) aside.notes rendered inline by CSS — disrupts slide composition
//       mid-presentation. Notes must live in a fixed tray, never inline.
//   (b) no #kbd-hint pill — shortcuts invisible to anyone who didn't read
//       source. "Documented in the README" does not count.
//   (c) requestFullscreen() with no fullscreenchange listener — browser
//       can drift scroll/focus state on FS toggle; the listener re-asserts.
// See references/html-renderer.md §8 / §9 / §11 and the reference scaffold.

// (a) aside.notes must never be display: block outside @media print. Strip
// print blocks before scanning so the print override (notes inline for PDF)
// doesn't false-positive. Match any display:block rule whose selector path
// includes aside.notes or .notes (in the relevant class position).
const htmlNoPrint = html.replace(/@media\s+print\s*\{[\s\S]*?\n\}/gi, "");
const inlineNotesRe = /(?:^|[\s,{}])(?:[^{}]*\baside\.notes\b|[^{}]*\.notes\b)[^{}]*\{[^}]*display\s*:\s*(?:block|flex|grid|inline-block)\b/i;
if (inlineNotesRe.test(htmlNoPrint)) {
  fail(`aside.notes has a non-none display outside @media print — notes must be tray-only on screen (§8)`);
} else {
  ok(`aside.notes is display:none on screen (tray-only)`);
}

// (b) #notes-tray element must exist.
if (!/id=["']notes-tray["']/i.test(html)) {
  fail(`no #notes-tray element found — speaker notes have no tray to surface in (§8)`);
} else {
  ok(`#notes-tray element present`);
}

// (c) #kbd-hint element must exist.
if (!/id=["']kbd-hint["']/i.test(html)) {
  fail(`no #kbd-hint element found — keyboard shortcuts are invisible without a hint pill (§9)`);
} else {
  ok(`#kbd-hint element present`);
}

// (d) requestFullscreen() must be paired with a fullscreenchange listener.
const callsFS = /\brequestFullscreen\s*\(/i.test(html);
const hasFSHandler = /fullscreenchange/i.test(html);
if (callsFS && !hasFSHandler) {
  fail(`requestFullscreen() called without a fullscreenchange listener — FS toggle can drift layout (§11)`);
} else if (callsFS) {
  ok(`fullscreenchange handler registered`);
}

// (e) .slide must not use min-height: 100vh (document-flow model re-introduces
// the fractional-fullscreen bug). Our toggle model uses position: absolute; inset: 0.
// Strip print blocks first — print legitimately uses min-height: 100vh for
// page-break sizing.
const minHeightRe = /\.slide\b[^{}]*\{[^}]*\bmin-height\s*:\s*100v[hw]?\b/i;
if (minHeightRe.test(htmlNoPrint)) {
  fail(`.slide uses min-height: 100vh — toggle model requires position: absolute; inset: 0 (§6)`);
} else {
  ok(`.slide viewport model is not document-flow`);
}

// ─── Check 6d: .body wrapper on every main/appendix slide ─────────────────
// §7 of html-renderer.md requires the 3-region composition — meta, body,
// footer — with the middle row centered. A slide that skips the .body
// wrapper renders top-anchored and fails the live-presentation dry run
// even while passing every other lint. Cover and appendix-divider are
// allowed to omit it (cover often uses a different composition; divider
// is intentionally sparse).
const missingBody = needNotes.filter(s => !/\bclass=["'][^"']*\bbody\b[^"']*["']/i.test(s.body));
if (missingBody.length) {
  fail(`${missingBody.length} content slide(s) missing <div class="body"> wrapper (§7): ${missingBody.map(s => s.section || `#${s.index}`).slice(0, 5).join(", ")}${missingBody.length > 5 ? ", …" : ""}`);
} else {
  ok(`all content slides have .body wrapper`);
}

// Shared: HTML + CSS stripped of comments. Used by the text-color token
// check (6e) and the impeccable absolute-bans check (7). Stripping both
// comment styles prevents template/explanatory prose from false-positiving.
const htmlRendered = html
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/\/\*[\s\S]*?\*\//g, "");

// ─── Check 6e: text-color token whitelist ─────────────────────────────────
// The contract in html-renderer.md "The text-color token whitelist" defines
// the only token identifiers allowed after `color: var(` in deck CSS. The
// author commits to contrast at naming time; the lint enforces the name.
// Robust regex (no CSS parser needed) because naming is the contract, not
// contrast computation.
//
// Allowed: --ink, --ink-2, --ink-mute, --muted, --paper, --paper-2,
//          --accent-ink, --accent-on-ink, and any name ending in -ink.
// Forbidden: --accent, --accent-2, --rule, --strike, or any other name.
// Literal `color: oklch(…)` is permitted (one-off semantics) but the
// human still owes contrast — the lint does not police literals.
const textSafeTokens = new Set([
  "--ink", "--ink-2", "--ink-mute", "--muted",
  "--paper", "--paper-2",
  "--accent-ink", "--accent-on-ink",
]);
function isTextSafe(name) {
  return textSafeTokens.has(name) || /-ink$/.test(name);
}
const colorVarRe = /color\s*:\s*var\(\s*(--[a-z0-9-]+)\s*(?:,[^)]*)?\)/gi;
const badColorTokens = [];
let cm;
while ((cm = colorVarRe.exec(htmlRendered)) !== null) {
  const tok = cm[1];
  if (!isTextSafe(tok)) {
    if (!badColorTokens.some(b => b.tok === tok)) {
      badColorTokens.push({ tok });
    }
  }
}
if (badColorTokens.length) {
  fail(`${badColorTokens.length} non-text-safe token(s) used as color: ${badColorTokens.map(b => `var(${b.tok})`).join(", ")}`);
  console.error(`        text-safe tokens: --ink, --ink-2, --ink-mute, --muted, --paper, --paper-2, --accent-ink, --accent-on-ink, or any name ending in -ink`);
  console.error(`        contract: references/html-renderer.md "text-color token whitelist"`);
} else {
  ok(`all color: var(…) references use text-safe tokens`);
}

// ─── Check 7: impeccable absolute bans in rendered CSS/HTML ───────────────
// Uses htmlRendered from above — HTML + CSS comments already stripped so
// the documented-assumption template and explanatory CSS comments don't
// false-positive on their own prose.
const cssBans = [
  { pat: /-webkit-background-clip\s*:\s*text|background-clip\s*:\s*text/i, why: `gradient text (impeccable BAN 2)` },
  { pat: /border-(left|right)\s*:\s*[2-9]\d*\s*px/i,                       why: `border-left/right > 1px accent stripe (impeccable BAN 1)` },
  { pat: /font-family\s*:\s*[^;}]*\b(Inter|DM Sans|Plus Jakarta Sans|Instrument Serif|Space Grotesk|Fraunces|Instrument Sans|Newsreader|Lora|Crimson)\b/i, why: `reflex font from impeccable reject list` },
];
const cssHits = cssBans.filter(b => b.pat.test(htmlRendered));
if (cssHits.length) {
  fail(`${cssHits.length} impeccable absolute-ban violation(s):`);
  cssHits.forEach(h => console.error(`        ${h.why}`));
} else {
  ok(`no impeccable absolute-ban CSS patterns`);
}

// ─── Summary ──────────────────────────────────────────────────────────────
console.log("");
if (failures === 0) {
  console.log(`PASS  ${path.basename(file)} — ${slides.length} slides, ${needNotes.length} with notes`);
  process.exit(0);
} else {
  console.error(`FAIL  ${path.basename(file)} — ${failures} check(s) failed`);
  process.exit(1);
}
