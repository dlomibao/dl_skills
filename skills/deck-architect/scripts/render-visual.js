#!/usr/bin/env node
/*
 * render-visual.js — post-processor that swaps <figure data-visual-spec>
 * placeholders for inline SVG, using design tokens from the deck's
 * own :root CSS.
 *
 * Usage:
 *   node render-visual.js <deck.html>                 # rewrite in place
 *   node render-visual.js <deck.html> -o <out.html>   # write to new file
 *   node render-visual.js <spec.json> --svg-only      # render a lone spec
 *
 * Exit 0 on success, 1 on any validation / render error.
 */

const fs = require("fs");
const path = require("path");

const { extractTokens } = require("./visuals/tokens.js");
const flow      = require("./visuals/flow.js");
const bar       = require("./visuals/bar.js");
const graph     = require("./visuals/graph.js");
const quadrant  = require("./visuals/quadrant.js");
const waterfall = require("./visuals/waterfall.js");

const RENDERERS = { flow, bar, graph, quadrant, waterfall };

function die(msg, code = 1) {
  console.error(`render-visual: ${msg}`);
  process.exit(code);
}

function usage() {
  console.error("usage: node render-visual.js <deck.html> [-o <out.html>]");
  console.error("       node render-visual.js <spec.json> --svg-only");
  process.exit(2);
}

// ─── argument parsing ─────────────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.length === 0) usage();

const inputFile = args[0];
let outputFile = inputFile;
let svgOnly = false;
for (let i = 1; i < args.length; i++) {
  if (args[i] === "-o" && args[i + 1]) { outputFile = args[i + 1]; i++; }
  else if (args[i] === "--svg-only") { svgOnly = true; }
  else die(`unknown arg: ${args[i]}`, 2);
}

if (!fs.existsSync(inputFile)) die(`file not found: ${inputFile}`);

// ─── svg-only mode: render a lone spec for testing ────────────────────────
if (svgOnly) {
  const spec = JSON.parse(fs.readFileSync(inputFile, "utf8"));
  const renderer = RENDERERS[spec.type];
  if (!renderer) die(`unknown shape: ${spec.type}`);
  // Defaults when no deck context
  const tokens = extractTokens("");
  try {
    console.log(renderer.render(spec, tokens));
    process.exit(0);
  } catch (e) {
    die(`${spec.type}: ${e.message}`);
  }
}

// ─── deck mode: walk HTML, swap placeholders ──────────────────────────────
const html = fs.readFileSync(inputFile, "utf8");
const tokens = extractTokens(html);

// Skip HTML comments during the scan. The documented-assumption template
// at the top of a rendered deck may include literal <figure data-visual-
// spec='{json}'> examples as prose documentation of the mechanism —
// that's exactly what references/html-renderer.md §5a shows. The browser
// never renders comment content; the renderer shouldn't try to parse it
// either. Same hygiene as lint-deck.js 2.4.2.
//
// Single-pass regex alternation: match either (a) an HTML comment — pass
// through verbatim, or (b) a <figure data-visual-spec> block — process.
// This preserves comments in the output rather than stripping them.
const commentOrFigureRe = /(<!--[\s\S]*?-->)|<figure\b([^>]*\bdata-visual-spec\s*=\s*(?:'([^']*)'|"([^"]*)")[^>]*)>([\s\S]*?)<\/figure>/gi;

let swaps = 0;
const errors = [];

const rendered = html.replace(commentOrFigureRe, (match, comment, attrs, singleQuoteSpec, doubleQuoteSpec) => {
  // Comment match: return as-is.
  if (comment) return comment;

  // Figure match: parse spec, render, swap.
  const raw = singleQuoteSpec || doubleQuoteSpec || "";
  const decoded = decodeHtmlEntities(raw);
  let spec;
  try {
    spec = JSON.parse(decoded);
  } catch (e) {
    errors.push(`  JSON parse error in data-visual-spec: ${e.message}\n  raw: ${decoded.slice(0, 120)}…`);
    return match;
  }

  const renderer = RENDERERS[spec.type];
  if (!renderer) {
    errors.push(`  unknown shape "${spec.type}"; supported: ${Object.keys(RENDERERS).join(", ")}`);
    return match;
  }

  let svg;
  try {
    svg = renderer.render(spec, tokens);
  } catch (e) {
    errors.push(`  ${spec.type}: ${e.message}`);
    return match;
  }

  swaps++;
  const cleanedAttrs = attrs.replace(/\bdata-visual-spec\s*=\s*(?:'[^']*'|"[^"]*")/, "").trim();
  const label = extractDataAttr(attrs, "data-label") || spec.caption || spec.type;
  return `<figure ${cleanedAttrs ? cleanedAttrs + " " : ""}data-rendered="true" aria-label="${escapeAttr(label)}">\n${svg}\n</figure>`;
});

if (errors.length) {
  console.error(`render-visual: ${errors.length} error(s)`);
  errors.forEach(e => console.error(e));
  process.exit(1);
}

if (swaps === 0) {
  console.log(`render-visual: no <figure data-visual-spec> placeholders found in ${path.basename(inputFile)}`);
  process.exit(0);
}

fs.writeFileSync(outputFile, rendered, "utf8");
console.log(`render-visual: swapped ${swaps} placeholder(s) into ${path.basename(outputFile)}`);
process.exit(0);

// ─── helpers ──────────────────────────────────────────────────────────────
function decodeHtmlEntities(s) {
  return s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function extractDataAttr(attrs, name) {
  const re = new RegExp(`\\b${name}\\s*=\\s*(?:'([^']*)'|"([^"]*)")`, "i");
  const m = re.exec(attrs);
  return m ? (m[1] || m[2]) : null;
}

function escapeAttr(s) { return String(s).replace(/"/g, "&quot;"); }
