/*
 * quadrant.js — 2x2 framework.
 *
 * Two axes through the middle, four corner labels, items plotted on
 * normalized 0-1 coordinates. Highlights in accent, rest in ink-2.
 * No fill tints (impeccable one-highlight discipline).
 */

const WIDTH = 860;
const HEIGHT = 560;
const PADDING = 80;

function validate(spec) {
  if (!spec.axes || !spec.axes.x || !spec.axes.y) throw new Error("quadrant: axes.x and axes.y required");
  if (!Array.isArray(spec.items) || spec.items.length < 2) throw new Error("quadrant: items required (2+)");
  for (const it of spec.items) {
    if (!it.label) throw new Error("quadrant: item missing label");
    if (typeof it.x !== "number" || typeof it.y !== "number") throw new Error(`quadrant: item ${it.label} needs x,y numbers 0-1`);
  }
}

function render(spec, tokens) {
  validate(spec);
  const chartLeft = PADDING;
  const chartRight = WIDTH - PADDING;
  const chartTop = PADDING;
  const chartBottom = HEIGHT - PADDING - (spec.caption ? 32 : 0);
  const chartW = chartRight - chartLeft;
  const chartH = chartBottom - chartTop;

  const elements = [];

  // Outer rule frame
  elements.push(
    `<rect x="${chartLeft}" y="${chartTop}" width="${chartW}" height="${chartH}" fill="none" stroke="${tokens.rule}" stroke-width="${tokens.stroke.thin}"/>`
  );

  // Axes through the middle
  const midX = chartLeft + chartW / 2;
  const midY = chartTop + chartH / 2;
  elements.push(
    `<line x1="${chartLeft}" y1="${midY}" x2="${chartRight}" y2="${midY}" stroke="${tokens.ink}" stroke-width="${tokens.stroke.thin}"/>`,
    `<line x1="${midX}" y1="${chartTop}" x2="${midX}" y2="${chartBottom}" stroke="${tokens.ink}" stroke-width="${tokens.stroke.thin}"/>`
  );

  // Axis labels (low/high at ends)
  // X axis
  elements.push(
    `<text x="${chartLeft + 4}" y="${midY - 8}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.06em">${escapeText((spec.axes.x.low || "").toUpperCase())} &#8592;</text>`,
    `<text x="${chartRight - 4}" y="${midY - 8}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.06em" text-anchor="end">&#8594; ${escapeText((spec.axes.x.high || "").toUpperCase())}</text>`,
    `<text x="${midX}" y="${chartBottom + 24}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.sm}" fill="${tokens.ink}" text-anchor="middle">${escapeText(spec.axes.x.label || "")}</text>`
  );
  // Y axis
  elements.push(
    `<text x="${midX + 8}" y="${chartBottom - 4}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.06em">${escapeText((spec.axes.y.low || "").toUpperCase())} &#8595;</text>`,
    `<text x="${midX + 8}" y="${chartTop + 14}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.06em">&#8593; ${escapeText((spec.axes.y.high || "").toUpperCase())}</text>`,
    `<text x="${chartLeft - 16}" y="${midY}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.sm}" fill="${tokens.ink}" text-anchor="middle" transform="rotate(-90 ${chartLeft - 16} ${midY})">${escapeText(spec.axes.y.label || "")}</text>`
  );

  // Quadrant corner labels
  const ql = spec.quadrantLabels || spec["quadrant-labels"] || {};
  if (ql["top-right"]) {
    elements.push(`<text x="${chartRight - 8}" y="${chartTop + 16}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" text-anchor="end" letter-spacing="0.06em">${escapeText(ql["top-right"].toUpperCase())}</text>`);
  }
  if (ql["top-left"]) {
    elements.push(`<text x="${chartLeft + 8}" y="${chartTop + 16}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.06em">${escapeText(ql["top-left"].toUpperCase())}</text>`);
  }
  if (ql["bottom-right"]) {
    elements.push(`<text x="${chartRight - 8}" y="${chartBottom - 6}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" text-anchor="end" letter-spacing="0.06em">${escapeText(ql["bottom-right"].toUpperCase())}</text>`);
  }
  if (ql["bottom-left"]) {
    elements.push(`<text x="${chartLeft + 8}" y="${chartBottom - 6}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.06em">${escapeText(ql["bottom-left"].toUpperCase())}</text>`);
  }

  // Items
  spec.items.forEach(item => {
    const x = chartLeft + item.x * chartW;
    const y = chartBottom - item.y * chartH;  // invert y so 1.0 is top
    const color = item.highlight ? tokens.accent : tokens.ink2;
    const weight = item.highlight ? "600" : "400";
    const dotR = item.highlight ? 5 : 3;
    elements.push(
      `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${color}"/>`,
      `<text x="${x + 10}" y="${y + 4}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.sm}" fill="${color}" font-weight="${weight}">${escapeText(item.label)}</text>`
    );
  });

  if (spec.caption) {
    elements.push(
      `<text x="${PADDING}" y="${HEIGHT - 8}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.08em">${escapeText(spec.caption.toUpperCase())}</text>`
    );
  }

  return svg(WIDTH, HEIGHT, elements.join("\n  "));
}

function svg(width, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" role="img">
  ${body}
</svg>`;
}
function escapeText(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escapeAttr(s) { return String(s).replace(/"/g, "&quot;"); }

module.exports = { render, validate };
