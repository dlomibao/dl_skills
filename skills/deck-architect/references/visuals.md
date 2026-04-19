# Visual aid specs

Visual aid **selection** (what kind of visual supports this slide's point) is content work and belongs in Phase 5. Visual aid **rendering** (colors, fonts, pixel positions) is layout — handed off.

**Default text-only.** A headline + a few words is often the strongest treatment, especially when the slide's point is a single number, one-line insight, or a direct quote. Text with massive typography beats a generic stock image every time.

A slide earns a visual when:

- The argument depends on data the audience needs to see → **chart**
- The content is a system, flow, or relationship that words describe poorly → **diagram**
- It's the opening hook or STAR moment that needs emotional punch → **image**
- The point is about a specific product/interface/artifact → **screenshot**

Otherwise, mark `text-only`.

## Chart / data visualization — full spec

- **Chart type**, chosen to match the question:
  - Comparison across categories → bar chart (horizontal if labels are long or >5 categories)
  - Trend over time → line chart (2–5 lines max; if more, use small multiples)
  - Part-to-whole, few categories → stacked bar or donut (avoid pie charts with >4 slices)
  - Relationship between two numerics → scatter
  - Distribution → histogram
  - Sequential build to a total → waterfall
  - Geographic → map (color-coded with overlay labels if exact values matter)
  - Avoid: 3D charts, pie charts with many slices, dual-axis unless units genuinely differ
- **The data** — which numbers, from where, what time range
- **Highlighting** — which series/bar/segment to emphasize; everything else neutral gray. One highlight color max.
- **Axes** — labels, units, range. State if zero-baselined or truncated (and why).
- **Annotations** — arrows, callouts, event markers ("pricing change, March 2026"), trend arrows with % change.
- **Title** — the insight, not the metric.

## Diagram / architecture / flow / concept

Describe in enough detail to draw:

- Type (system architecture, process flow, org chart, decision tree, swim-lane, timeline, comparison matrix, 2x2 quadrant)
- Nodes/boxes with labels
- Connections, directions, groupings
- What to highlight as the focal point
- Specific style if it applies (UML, C4, BPMN)

## Photograph / hero image / conceptual visual

Most decks need 0–2 of these total, usually opening hook or STAR moment.

- **If the user signaled an existing asset** (Phase 1b): reference by name/path; note "use user-provided asset."
- **Otherwise, run `WebSearch` for 2–3 candidates** with a slide-specific query. Surface URLs with one line on which fits best.
  - Example: "For the hook about infrastructure fragility, search: 'server rack on fire datacenter'; candidates: [url1] (strongest — conveys urgency), [url2], [url3]."
- **Real-world constraint:** `WebSearch` typically returns stock-library **collection pages** (e.g. `https://www.istockphoto.com/photos/server-fire`) rather than direct image-asset URLs (e.g. `https://www.istockphoto.com/photo/server-on-fire-id12345.jpg`). Surface the collection URL with a one-line query that locates the right frame, and tell the user they must pick the specific frame.
- **Always flag licensing risk** — user must verify reuse rights before publishing.
- **Never fabricate URLs** to look more specific than the search actually returned. If `WebSearch` isn't available, give specific search queries and describe what a good result looks like.
- **When the concept is genuinely specific** (a real lockscreen with real notifications, a real product UI, a real whiteboard), recommend the user shoot their own — a phone-shot beats any stock photo for hooks, and costs 20 minutes.
- If the image concept is generic ("handshake," "teamwork," "growth chart with arrow") — that's a signal the slide should be text-only.

## Screenshot / product / UI

If user-provided, reference it. Otherwise: "screenshot needed: [specific UI/screen/feature], captured at [state/condition]" so the user knows exactly what to grab.

## Visual consistency

At the end of Phase 5, surface cross-deck concerns:

- "Use one highlight color across all chart slides."
- "If icons appear, use one family throughout — don't mix sources."
