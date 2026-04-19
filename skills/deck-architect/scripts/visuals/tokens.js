/*
 * tokens.js — extract design tokens from a deck's :root CSS block.
 *
 * The same :root that drives the deck's CSS becomes the source of truth
 * for every SVG visual. If the deck uses oklch(56% 0.205 32) as its
 * accent, that's what the chart bars use. No hardcoded colors.
 *
 * Parsing is intentionally simple — a full CSS parser would be overkill.
 * We look for the first :root {...} block and pull out the variables
 * we care about, with sensible fallbacks.
 */

const DEFAULTS = {
  accent:      "oklch(56% 0.205 32)",
  ink:         "oklch(18% 0.018 50)",
  ink2:        "oklch(35% 0.020 55)",
  muted:       "oklch(52% 0.018 60)",
  paper:       "oklch(96.5% 0.018 82)",
  paper2:      "oklch(93% 0.022 82)",
  rule:        "oklch(82% 0.025 80)",
  strike:      "oklch(70% 0.015 60)",
  displayFont: '"Young Serif", Georgia, serif',
  sansFont:    '"Geist", system-ui, sans-serif',
  monoFont:    '"JetBrains Mono", ui-monospace, monospace',

  // Spacing / stroke — derived scale, not tied to CSS variables directly
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  stroke: { thin: 1, med: 1.5, bold: 2 },
  font: { xs: 11, sm: 13, md: 15, lg: 18, xl: 22, xxl: 28 },
};

// Map CSS variable names to token keys. Renderers use the keys; the CSS
// side can use any of these conventional names.
const VAR_ALIASES = {
  accent:      ["--accent", "--color-accent", "--brand"],
  ink:         ["--ink", "--color-ink", "--text"],
  ink2:        ["--ink-2", "--color-ink-2", "--text-secondary"],
  muted:       ["--muted", "--color-muted"],
  paper:       ["--paper", "--color-paper", "--bg"],
  paper2:      ["--paper-2", "--color-paper-2", "--bg-alt"],
  rule:        ["--rule", "--color-rule", "--border"],
  strike:      ["--strike", "--color-strike"],
  displayFont: ["--display-font", "--font-display", "--display"],
  sansFont:    ["--sans-font", "--font-sans", "--sans", "--body-font"],
  monoFont:    ["--mono-font", "--font-mono", "--mono"],
};

function extractRootBlock(html) {
  const match = /:root\s*\{([^}]*)\}/s.exec(html);
  return match ? match[1] : "";
}

function parseVars(rootBlock) {
  const vars = {};
  const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(rootBlock)) !== null) {
    vars[m[1].trim()] = m[2].trim();
  }
  return vars;
}

function resolveToken(vars, aliases, fallback) {
  for (const name of aliases) {
    if (vars[name]) return vars[name];
  }
  return fallback;
}

/**
 * Read an HTML string, return a tokens object for renderers.
 * Renderers should NEVER reach outside this object for aesthetic choices.
 */
function extractTokens(html) {
  const root = extractRootBlock(html);
  const vars = parseVars(root);

  const resolved = {};
  for (const [key, aliases] of Object.entries(VAR_ALIASES)) {
    resolved[key] = resolveToken(vars, aliases, DEFAULTS[key]);
  }

  return {
    ...resolved,
    space: DEFAULTS.space,
    stroke: DEFAULTS.stroke,
    font: DEFAULTS.font,
    // theme detection — light if paper is lighter than ink (naive but works)
    theme: detectTheme(resolved.paper, resolved.ink),
    // expose raw vars for renderers that want unusual tokens
    raw: vars,
  };
}

function detectTheme(paper, ink) {
  // Any oklch value with first number < 50% is "dark." We only need a
  // rough signal — renderers use ink/paper directly anyway.
  const paperL = parseOklchLightness(paper);
  const inkL = parseOklchLightness(ink);
  if (paperL == null || inkL == null) return "light";
  return paperL > inkL ? "light" : "dark";
}

function parseOklchLightness(value) {
  const m = /oklch\s*\(\s*([\d.]+)%?/i.exec(value || "");
  return m ? parseFloat(m[1]) : null;
}

module.exports = { extractTokens, DEFAULTS };
