/*
 * waterfall.js — sequential contribution chart.
 *
 * Shows how a starting value becomes an ending value through
 * additive/subtractive deltas. Totals use ink; positive deltas accent;
 * negative deltas muted. Connector lines between consecutive bar tops.
 */

const PADDING = { top: 48, right: 40, bottom: 72, left: 60 };
const BAR_WIDTH_FRAC = 0.6;

function validate(spec) {
  if (!Array.isArray(spec.bars) || spec.bars.length < 2) throw new Error("waterfall: bars required (2+)");
  for (const b of spec.bars) {
    if (!b.label) throw new Error("waterfall: bar missing label");
    if (typeof b.value !== "number") throw new Error(`waterfall: bar ${b.label} value must be number`);
    if (b.kind && !["total", "delta"].includes(b.kind)) throw new Error(`waterfall: kind must be total|delta`);
  }
}

function render(spec, tokens) {
  validate(spec);
  const width = 960;
  const height = 420 + (spec.caption ? 28 : 0);
  const chartTop = PADDING.top;
  const chartBottom = height - PADDING.bottom - (spec.caption ? 28 : 0);
  const chartH = chartBottom - chartTop;
  const slotW = (width - PADDING.left - PADDING.right) / spec.bars.length;
  const barW = slotW * BAR_WIDTH_FRAC;

  // Compute cumulative positions
  const positions = [];
  let running = 0;
  spec.bars.forEach((b, i) => {
    const kind = b.kind || (i === 0 || i === spec.bars.length - 1 ? "total" : "delta");
    if (kind === "total") {
      positions.push({ top: b.value, bottom: 0, running: b.value, kind, ...b });
      running = b.value;
    } else {
      const bottom = running;
      const top = running + b.value;
      positions.push({ top, bottom, running: top, kind, ...b });
      running = top;
    }
  });

  const maxVal = Math.max(...positions.map(p => Math.max(p.top, p.bottom)));
  const minVal = Math.min(0, ...positions.map(p => Math.min(p.top, p.bottom)));
  const range = maxVal - minVal;
  const scale = chartH / range;
  const yForValue = v => chartBottom - (v - minVal) * scale;

  const elements = [];

  // Zero line
  const zeroY = yForValue(0);
  elements.push(
    `<line x1="${PADDING.left}" y1="${zeroY}" x2="${width - PADDING.right}" y2="${zeroY}" stroke="${tokens.rule}" stroke-width="${tokens.stroke.thin}"/>`
  );

  // Bars
  positions.forEach((p, i) => {
    const slotX = PADDING.left + i * slotW;
    const barX = slotX + (slotW - barW) / 2;
    const topY = yForValue(p.top);
    const bottomY = yForValue(p.bottom);
    const barH = Math.abs(bottomY - topY);
    const barY = Math.min(topY, bottomY);

    let color;
    if (p.kind === "total") color = tokens.ink;
    else if (p.value >= 0) color = tokens.accent;
    else color = tokens.muted;

    elements.push(`<rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" fill="${color}"/>`);

    // Value label above bar
    const valText = p.kind === "total" ? String(p.value) : (p.value >= 0 ? `+${p.value}` : String(p.value));
    elements.push(
      `<text x="${barX + barW / 2}" y="${barY - 8}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.sm}" fill="${color}" text-anchor="middle" font-weight="600">${escapeText(valText)}</text>`
    );

    // Bar label below
    elements.push(
      `<text x="${slotX + slotW / 2}" y="${chartBottom + 20}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" text-anchor="middle">${escapeText(p.label)}</text>`
    );

    // Connector to next bar
    if (i < positions.length - 1) {
      const nextTop = yForValue(positions[i + 1].kind === "total" ? positions[i + 1].top : positions[i].running);
      const connX1 = barX + barW;
      const connX2 = slotX + slotW + (slotW - barW) / 2;
      elements.push(
        `<line x1="${connX1}" y1="${topY}" x2="${connX2}" y2="${nextTop}" stroke="${tokens.rule}" stroke-width="${tokens.stroke.thin}" stroke-dasharray="4 4"/>`
      );
    }

    // Callout
    if (spec.callout && spec.callout.bar === i) {
      elements.push(
        `<text x="${barX + barW / 2}" y="${barY - 28}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.sm}" fill="${tokens.accent}" text-anchor="middle" font-weight="600">${escapeText(spec.callout.text)}</text>`
      );
    }
  });

  if (spec.axis && spec.axis.label) {
    elements.push(
      `<text x="${PADDING.left}" y="${chartBottom + 48}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.06em">${escapeText(spec.axis.label.toUpperCase())}</text>`
    );
  }

  if (spec.caption) {
    elements.push(
      `<text x="${PADDING.left}" y="${height - 8}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.08em">${escapeText(spec.caption.toUpperCase())}</text>`
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

module.exports = { render, validate };
