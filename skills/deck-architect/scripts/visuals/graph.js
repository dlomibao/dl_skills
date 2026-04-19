/*
 * graph.js — small directed acyclic graph / network.
 *
 * Tiered layout: nodes grouped by tier (horizontal columns). Edges go
 * left-to-right across tiers. Accent on highlighted nodes and edges
 * into them.
 *
 * Hard cap at 12 nodes. Larger graphs are unreadable at slide scale
 * and should cut to a subset or become backup material.
 */

const TIER_WIDTH = 180;
const NODE_HEIGHT = 48;
const NODE_GAP = 18;
const PADDING = 32;
const MAX_NODES = 12;

function validate(spec) {
  if (!Array.isArray(spec.nodes)) throw new Error("graph: nodes required");
  if (spec.nodes.length > MAX_NODES) {
    throw new Error(`graph: ${spec.nodes.length} nodes exceeds max ${MAX_NODES}; cut to a subset`);
  }
  for (const n of spec.nodes) {
    if (!n.id || !n.label) throw new Error(`graph: node missing id or label`);
    if (typeof n.tier !== "number") throw new Error(`graph: node ${n.id} missing tier (number)`);
  }
  if (!Array.isArray(spec.edges)) throw new Error("graph: edges required");
  for (const e of spec.edges) {
    if (!e.from || !e.to) throw new Error(`graph: edge missing from/to`);
  }
}

function render(spec, tokens) {
  validate(spec);
  const highlightSet = new Set(spec.nodes.filter(n => n.highlight).map(n => n.id));

  // Group nodes by tier
  const byTier = {};
  for (const n of spec.nodes) {
    (byTier[n.tier] ||= []).push(n);
  }
  const tiers = Object.keys(byTier).map(Number).sort((a, b) => a - b);
  const maxCol = Math.max(...tiers.map(t => byTier[t].length));

  const width = PADDING * 2 + tiers.length * TIER_WIDTH;
  const height = PADDING * 2 + maxCol * (NODE_HEIGHT + NODE_GAP) + (spec.caption ? 36 : 0);

  // Position map: id -> {cx, cy}
  const positions = {};
  tiers.forEach((tier, ti) => {
    const nodes = byTier[tier];
    const totalH = nodes.length * NODE_HEIGHT + (nodes.length - 1) * NODE_GAP;
    const startY = PADDING + (height - PADDING * 2 - totalH - (spec.caption ? 36 : 0)) / 2;
    nodes.forEach((n, ni) => {
      const cx = PADDING + ti * TIER_WIDTH + TIER_WIDTH / 2;
      const cy = startY + ni * (NODE_HEIGHT + NODE_GAP) + NODE_HEIGHT / 2;
      positions[n.id] = { cx, cy };
    });
  });

  const elements = [];

  // Edges (drawn first, behind nodes)
  spec.edges.forEach(e => {
    const from = positions[e.from];
    const to = positions[e.to];
    if (!from || !to) return;
    const toHL = highlightSet.has(e.to);
    const color = toHL ? tokens.accent : tokens.rule;
    const stroke = toHL ? tokens.stroke.med : tokens.stroke.thin;
    // Start right edge of from-node, end left edge of to-node
    const x1 = from.cx + TIER_WIDTH / 2 - 16;
    const x2 = to.cx - TIER_WIDTH / 2 + 16;
    elements.push(
      `<line x1="${x1}" y1="${from.cy}" x2="${x2}" y2="${to.cy}" stroke="${color}" stroke-width="${stroke}"/>`
    );
    // Arrowhead at end (small triangle)
    const arrowSize = 5;
    elements.push(
      `<polygon points="${x2 - arrowSize},${to.cy - arrowSize} ${x2},${to.cy} ${x2 - arrowSize},${to.cy + arrowSize}" fill="${color}"/>`
    );
  });

  // Nodes
  spec.nodes.forEach(n => {
    const { cx, cy } = positions[n.id];
    const isHL = highlightSet.has(n.id);
    const textColor = isHL ? tokens.accent : tokens.ink;
    const borderColor = isHL ? tokens.accent : tokens.rule;
    const borderW = isHL ? tokens.stroke.med : tokens.stroke.thin;
    const x = cx - TIER_WIDTH / 2 + 16;
    const y = cy - NODE_HEIGHT / 2;
    const w = TIER_WIDTH - 32;
    // Rectangle with thin border (no rounded corners — impeccable discipline)
    elements.push(
      `<rect x="${x}" y="${y}" width="${w}" height="${NODE_HEIGHT}" fill="${tokens.paper}" stroke="${borderColor}" stroke-width="${borderW}"/>`
    );
    // Label, clipped to box
    elements.push(
      `<text x="${cx}" y="${cy + 5}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.sm}" fill="${textColor}" text-anchor="middle">${escapeText(truncate(n.label, 22))}</text>`
    );
    // Role tag (entry/exit) above
    if (n.role) {
      elements.push(
        `<text x="${cx}" y="${y - 6}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.accent}" text-anchor="middle" letter-spacing="0.08em">${escapeText(n.role.toUpperCase())}</text>`
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

function svg(width, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" role="img">
  ${body}
</svg>`;
}
function escapeText(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escapeAttr(s) { return String(s).replace(/"/g, "&quot;"); }
function truncate(s, max) { return s.length > max ? s.slice(0, max - 1) + "…" : s; }

module.exports = { render, validate };
