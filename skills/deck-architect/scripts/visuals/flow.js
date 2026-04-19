/*
 * flow.js — chain / sequence / pipeline diagram.
 *
 * Nodes laid out in a row (horizontal) or column (vertical), connected
 * by arrows. Highlighted nodes + their connecting edges get the accent
 * color. Entry / exit nodes get a small tier label above them.
 *
 * Uses tokens from tokens.js — no hardcoded colors or fonts.
 */

const WIDTH_PER_NODE = 180;
const MIN_WIDTH = 900;
const HEIGHT_H = 180;
const HEIGHT_V_PER_NODE = 110;
const PADDING = 24;

function validate(spec) {
  if (!Array.isArray(spec.nodes) || spec.nodes.length < 2) {
    throw new Error("flow: nodes required, min 2");
  }
  for (const n of spec.nodes) {
    if (!n.id || !n.label) throw new Error(`flow: node missing id or label: ${JSON.stringify(n)}`);
  }
  if (spec.direction && !["horizontal", "vertical"].includes(spec.direction)) {
    throw new Error(`flow: direction must be horizontal|vertical`);
  }
}

function defaultEdges(nodes) {
  return nodes.slice(0, -1).map((n, i) => ({ from: n.id, to: nodes[i + 1].id }));
}

function render(spec, tokens) {
  validate(spec);
  const direction = spec.direction || "horizontal";
  const edges = spec.edges || defaultEdges(spec.nodes);
  const highlightSet = new Set(spec.nodes.filter(n => n.highlight).map(n => n.id));

  if (direction === "horizontal") return renderHorizontal(spec, edges, highlightSet, tokens);
  return renderVertical(spec, edges, highlightSet, tokens);
}

function renderHorizontal(spec, edges, highlightSet, tokens) {
  const n = spec.nodes.length;
  const width = Math.max(MIN_WIDTH, n * WIDTH_PER_NODE);
  const colWidth = width / n;
  const height = HEIGHT_H + (spec.caption ? 36 : 0);
  const baselineY = 90;
  const labelY = 60;
  const tierY = 32;
  const descY = 120;

  const nodeElements = [];
  spec.nodes.forEach((node, i) => {
    const cx = colWidth * i + colWidth / 2;
    const isHL = highlightSet.has(node.id);
    const labelColor = isHL ? tokens.accent : tokens.ink;

    // Top rule above each node — mirrors the deck's appendix-slide rule treatment
    nodeElements.push(
      `<line x1="${cx - colWidth / 2 + 16}" y1="${baselineY - 50}" x2="${cx + colWidth / 2 - 16}" y2="${baselineY - 50}" stroke="${isHL ? tokens.accent : tokens.ink}" stroke-width="${tokens.stroke.bold}"/>`
    );

    // Tier label (entry/exit/step-N)
    const tierText = node.role === "entry" ? `01 · entry`
                    : node.role === "exit" ? `${String(i + 1).padStart(2, "0")} · exit`
                    : `${String(i + 1).padStart(2, "0")}`;
    nodeElements.push(
      `<text x="${cx - colWidth / 2 + 16}" y="${tierY}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.accent}" letter-spacing="0.08em">${escapeText(tierText)}</text>`
    );

    // Main label — wrap ~16 chars
    const lines = wrapLabel(node.label, 16);
    lines.forEach((line, li) => {
      nodeElements.push(
        `<text x="${cx - colWidth / 2 + 16}" y="${labelY + li * 22}" font-family='${escapeAttr(tokens.displayFont)}' font-size="${tokens.font.lg}" fill="${labelColor}">${escapeText(line)}</text>`
      );
    });

    // Optional description (from node.blurb) — muted
    if (node.blurb) {
      nodeElements.push(
        `<text x="${cx - colWidth / 2 + 16}" y="${descY + lines.length * 22 - 22}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.sm}" fill="${tokens.muted}">${escapeText(truncate(node.blurb, 28))}</text>`
      );
    }
  });

  // Edges — drawn as → glyphs between columns, accent if both endpoints highlighted
  const edgeElements = [];
  edges.forEach(e => {
    const fromIdx = spec.nodes.findIndex(n => n.id === e.from);
    const toIdx = spec.nodes.findIndex(n => n.id === e.to);
    if (fromIdx < 0 || toIdx < 0) return;
    const bothHL = highlightSet.has(e.from) && highlightSet.has(e.to);
    const color = bothHL ? tokens.accent : tokens.rule;
    const cx = colWidth * toIdx;  // arrow sits at start of target column
    edgeElements.push(
      `<text x="${cx - 12}" y="${labelY + 8}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.md}" fill="${color}" font-weight="700">&#8594;</text>`
    );
  });

  const captionY = HEIGHT_H + 24;
  const captionEl = spec.caption
    ? `<text x="16" y="${captionY}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.08em">${escapeText(spec.caption.toUpperCase())}</text>`
    : "";

  return svg(width, height, [...nodeElements, ...edgeElements, captionEl].join("\n  "));
}

function renderVertical(spec, edges, highlightSet, tokens) {
  const n = spec.nodes.length;
  const width = 700;
  const height = n * HEIGHT_V_PER_NODE + (spec.caption ? 36 : 0) + PADDING * 2;
  const elements = [];

  spec.nodes.forEach((node, i) => {
    const y = PADDING + i * HEIGHT_V_PER_NODE + 40;
    const isHL = highlightSet.has(node.id);
    const color = isHL ? tokens.accent : tokens.ink;

    // Top rule
    elements.push(
      `<line x1="${PADDING}" y1="${y - 24}" x2="${width - PADDING}" y2="${y - 24}" stroke="${isHL ? tokens.accent : tokens.ink}" stroke-width="${tokens.stroke.bold}"/>`
    );

    // Tier label
    const tierText = node.role === "entry" ? `01 · entry`
                    : node.role === "exit" ? `${String(i + 1).padStart(2, "0")} · exit`
                    : `${String(i + 1).padStart(2, "0")}`;
    elements.push(
      `<text x="${PADDING}" y="${y - 4}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.accent}" letter-spacing="0.08em">${escapeText(tierText)}</text>`
    );

    // Label
    elements.push(
      `<text x="${PADDING}" y="${y + 22}" font-family='${escapeAttr(tokens.displayFont)}' font-size="${tokens.font.lg}" fill="${color}">${escapeText(node.label)}</text>`
    );

    // Blurb
    if (node.blurb) {
      elements.push(
        `<text x="${PADDING}" y="${y + 46}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.sm}" fill="${tokens.muted}">${escapeText(node.blurb)}</text>`
      );
    }

    // Arrow down to next
    if (i < n - 1) {
      const arrowY = y + HEIGHT_V_PER_NODE - 28;
      const bothHL = highlightSet.has(node.id) && highlightSet.has(spec.nodes[i + 1].id);
      const arrowColor = bothHL ? tokens.accent : tokens.rule;
      elements.push(
        `<text x="${PADDING}" y="${arrowY}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.md}" fill="${arrowColor}" font-weight="700">&#8595;</text>`
      );
    }
  });

  if (spec.caption) {
    elements.push(
      `<text x="${PADDING}" y="${height - 8}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.08em">${escapeText(spec.caption.toUpperCase())}</text>`
    );
  }

  return svg(width, height, elements.join("\n  "));
}

// ─── helpers ──────────────────────────────────────────────────────────────
function svg(width, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" role="img">
  ${body}
</svg>`;
}

function escapeText(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return String(s).replace(/"/g, "&quot;");
}

function truncate(s, max) {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

function wrapLabel(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const w of words) {
    const candidate = current ? `${current} ${w}` : w;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = w;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);  // hard cap at 2 lines
}

module.exports = { render, validate };
