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

let failures = 0;
function fail(msg) { console.error("FAIL: " + msg); failures++; }
function ok(msg)   { console.log ("  ok: " + msg); }

// Split into slide sections by <section ... class*="slide" ...>. Regex is
// intentionally simple — we only need a rough slice for text-level checks.
const slideRe = /<section\b([^>]*)\bclass=["'][^"']*\bslide\b[^"']*["']([^>]*)>([\s\S]*?)<\/section>/gi;
const slides = [];
let m;
while ((m = slideRe.exec(html)) !== null) {
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

// ─── Check 6: impeccable absolute bans in rendered CSS/HTML ───────────────
const cssBans = [
  { pat: /-webkit-background-clip\s*:\s*text|background-clip\s*:\s*text/i, why: `gradient text (impeccable BAN 2)` },
  { pat: /border-(left|right)\s*:\s*[2-9]\d*\s*px/i,                       why: `border-left/right > 1px accent stripe (impeccable BAN 1)` },
  { pat: /font-family\s*:\s*[^;}]*\b(Inter|DM Sans|Plus Jakarta Sans|Instrument Serif|Space Grotesk|Fraunces|Instrument Sans|Newsreader|Lora|Crimson)\b/i, why: `reflex font from impeccable reject list` },
];
const cssHits = cssBans.filter(b => b.pat.test(html));
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
