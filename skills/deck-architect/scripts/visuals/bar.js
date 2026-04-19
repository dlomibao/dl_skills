/*
 * bar.js — categorical comparison chart.
 *
 * Horizontal by default (room for long labels). Supports up to 2 series
 * for before/after patterns. One highlight per chart — either the accent
 * series or a callout row.
 */

const PADDING = { top: 48, right: 120, bottom: 48, left: 180 };
const BAR_HEIGHT = 28;
const BAR_GAP = 12;
const SERIES_GAP = 4;

function validate(spec) {
  if (!Array.isArray(spec.series) || spec.series.length < 1) throw new Error("bar: series required (1+)");
  if (spec.series.length > 2) throw new Error("bar: max 2 series");
  if (!Array.isArray(spec.data) || spec.data.length < 2) throw new Error("bar: data required (2+ rows)");
  for (const row of spec.data) {
    if (!row.category) throw new Error(`bar: row missing category: ${JSON.stringify(row)}`);
    if (!Array.isArray(row.values) || row.values.length !== spec.series.length) {
      throw new Error(`bar: row values must match series count: ${row.category}`);
    }
  }
}

function resolveColor(colorKey, tokens) {
  const map = { accent: tokens.accent, ink: tokens.ink, muted: tokens.muted, rule: tokens.rule };
  return map[colorKey] || tokens.ink;
}

function render(spec, tokens) {
  validate(spec);
  const orientation = spec.orientation || "horizontal";
  if (orientation === "horizontal") return renderHorizontal(spec, tokens);
  return renderVertical(spec, tokens);
}

function renderHorizontal(spec, tokens) {
  const numSeries = spec.series.length;
  const rowHeight = BAR_HEIGHT * numSeries + SERIES_GAP * (numSeries - 1) + BAR_GAP;
  const chartHeight = spec.data.length * rowHeight;
  const width = 960;
  const height = PADDING.top + chartHeight + PADDING.bottom + (spec.caption ? 28 : 0);

  // Scale: find max absolute value across all cells
  const maxVal = Math.max(...spec.data.flatMap(r => r.values.map(Math.abs)));
  const scale = (width - PADDING.left - PADDING.right) / maxVal;

  const elements = [];

  // Axis line at left edge of bars
  elements.push(
    `<line x1="${PADDING.left}" y1="${PADDING.top}" x2="${PADDING.left}" y2="${PADDING.top + chartHeight}" stroke="${tokens.rule}" stroke-width="${tokens.stroke.thin}"/>`
  );

  // Series legend
  spec.series.forEach((s, si) => {
    const color = resolveColor(s.color, tokens);
    const legendX = PADDING.left + si * 220;
    const legendY = PADDING.top - 16;
    elements.push(
      `<rect x="${legendX}" y="${legendY - 9}" width="12" height="12" fill="${color}"/>`,
      `<text x="${legendX + 18}" y="${legendY}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.06em">${escapeText(s.label.toUpperCase())}</text>`
    );
  });

  // Rows
  spec.data.forEach((row, ri) => {
    const rowY = PADDING.top + ri * rowHeight;
    const isCallout = spec.callout && spec.callout.row === ri;

    // Category label
    elements.push(
      `<text x="${PADDING.left - 12}" y="${rowY + rowHeight / 2 + 2}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.md}" fill="${isCallout ? tokens.accent : tokens.ink}" text-anchor="end">${escapeText(row.category)}</text>`
    );

    // Bars per series
    row.values.forEach((val, si) => {
      const barY = rowY + si * (BAR_HEIGHT + SERIES_GAP);
      const barW = Math.abs(val) * scale;
      const color = resolveColor(spec.series[si].color, tokens);
      elements.push(
        `<rect x="${PADDING.left}" y="${barY}" width="${barW}" height="${BAR_HEIGHT}" fill="${color}"/>`
      );
      // Value label at end of bar
      elements.push(
        `<text x="${PADDING.left + barW + 8}" y="${barY + BAR_HEIGHT / 2 + 4}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.sm}" fill="${tokens.muted}">${escapeText(String(val))}</text>`
      );
    });

    // Callout text at right, if this row
    if (isCallout) {
      const rightX = width - PADDING.right + 16;
      elements.push(
        `<text x="${rightX}" y="${rowY + rowHeight / 2 + 4}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.sm}" fill="${tokens.accent}" font-weight="600">${escapeText(spec.callout.text)}</text>`
      );
    }
  });

  // Axis label
  if (spec.axis && spec.axis.label) {
    const labelY = PADDING.top + chartHeight + 24;
    elements.push(
      `<text x="${PADDING.left}" y="${labelY}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.06em">${escapeText(spec.axis.label.toUpperCase())}</text>`
    );
  }

  // Caption
  if (spec.caption) {
    elements.push(
      `<text x="${PADDING.left}" y="${height - 8}" font-family='${escapeAttr(tokens.monoFont)}' font-size="${tokens.font.xs}" fill="${tokens.muted}" letter-spacing="0.08em">${escapeText(spec.caption.toUpperCase())}</text>`
    );
  }

  return svg(width, height, elements.join("\n  "));
}

function renderVertical(spec, tokens) {
  // Vertical bars — simpler layout, used less often
  const width = 960;
  const barSlotWidth = (width - PADDING.left - PADDING.right) / spec.data.length;
  const barWidth = barSlotWidth * 0.6;
  const chartHeight = 320;
  const height = PADDING.top + chartHeight + PADDING.bottom + (spec.caption ? 28 : 0);
  const maxVal = Math.max(...spec.data.flatMap(r => r.values.map(Math.abs)));
  const scale = chartHeight / maxVal;

  const elements = [];
  // Baseline
  elements.push(
    `<line x1="${PADDING.left}" y1="${PADDING.top + chartHeight}" x2="${width - PADDING.right}" y2="${PADDING.top + chartHeight}" stroke="${tokens.rule}" stroke-width="${tokens.stroke.thin}"/>`
  );

  spec.data.forEach((row, ri) => {
    const slotX = PADDING.left + ri * barSlotWidth + (barSlotWidth - barWidth) / 2;
    row.values.forEach((val, si) => {
      const h = Math.abs(val) * scale;
      const y = PADDING.top + chartHeight - h;
      const subBarW = barWidth / spec.series.length;
      const x = slotX + si * subBarW;
      const color = resolveColor(spec.series[si].color, tokens);
      elements.push(`<rect x="${x}" y="${y}" width="${subBarW}" height="${h}" fill="${color}"/>`);
    });
    // Category label
    elements.push(
      `<text x="${slotX + barWidth / 2}" y="${PADDING.top + chartHeight + 20}" font-family='${escapeAttr(tokens.sansFont)}' font-size="${tokens.font.sm}" fill="${tokens.ink}" text-anchor="middle">${escapeText(row.category)}</text>`
    );
  });

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
