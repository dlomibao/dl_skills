# Visual-spec schema

deck-architect emits visuals as **structured specs**, not prose. A spec is a compact JSON block embedded in the outline — enough information for a renderer to draw the visual deterministically, not so much that the author is specifying pixels.

The shipped renderer `scripts/render-visual.js` converts specs → inline SVG using design tokens extracted from the deck's own CSS. The same accent color, typography, and spacing rhythm that drive the HTML drive the visuals. You don't re-specify colors; the palette is inherited.

## Why specs instead of prose

The old rule ("describe the visual in words, let the renderer decide") landed the chain-diagram on slide 7 as seven labeled paragraphs. The renderer had no structured information to draw from and no trust that text-first was wrong — so it fell through to text-first every time.

Specs fix two things:

1. **The renderer can actually draw.** Given a `flow` spec with nodes and edges, the script emits an SVG deterministically.
2. **Topology is non-negotiable.** Structures with ≥ 3 nodes and explicit directional edges (chains, graphs, sequences, 2×2 quadrants) are *auto-earned* visuals. The renderer does not get to default to text.

Prose descriptions remain valid for:
- Photographs / hero images — still need `WebSearch` + user asset sourcing (see `visuals.md`)
- Screenshots — the user captures them
- Concept illustrations that aren't standard shapes

For those, the outline spec stays prose + `<figure data-visual-todo>` placeholder. The lint catches remaining placeholders on main-flow slides.

---

## The five shipped shapes

Each shape has a minimal required spec and optional extensions. The renderer inherits:

- `--accent` → highlight color for emphasized nodes / data points
- `--ink`, `--ink-2`, `--muted` → neutrals, labels, de-emphasized elements
- `--paper`, `--paper-2` → backgrounds, tinted fills
- `--rule` → dividers, edges, axes
- `--display-font`, `--sans-font`, `--mono-font` → typography
- 4pt spacing scale → padding, gap, node size
- Stroke weight: 1px default, 1.5px for emphasis, 2px max (impeccable `border-*` ban carries over to SVG stroke)

### 1. `flow` — chain, sequence, pipeline

A horizontal or vertical sequence of labeled nodes connected by arrows. Highlights a subset for emphasis. Used for workflows, skill chains, process steps.

```yaml
type: flow
direction: horizontal          # horizontal | vertical (default: horizontal)
nodes:
  - id: a
    label: "using-superpowers"
    role: entry                # entry | step | exit (styling only)
  - id: b
    label: "brainstorming"
  - id: c
    label: "writing-plans"
    highlight: true            # boolean — accent applied
  - id: d
    label: "executing-plans"
    highlight: true
  - id: e
    label: "requesting-review"
    highlight: true
  - id: f
    label: "finishing"
    role: exit
edges:                         # optional — default connects adjacent nodes
  - { from: a, to: b }
  - { from: b, to: c }
  - { from: c, to: d }
  - { from: d, to: e }
  - { from: e, to: f }
caption: "the superpowers handoff chain"  # optional, rendered below
```

Rendering rules:
- Nodes: text labels in `--sans-font`, no rounded corners, separated by top-rules (mirrors the deck's appendix-slide rule treatment)
- Edges: thin lines with `→` glyph, `--rule` color for non-highlighted, `--accent` for highlighted sequences
- `role: entry` / `role: exit` gets a small label above the node (`01 · entry`, `05 · exit`) in `--mono-font` accent
- Caption: `--muted`, small, below the diagram

### 2. `bar` — comparison chart

Categorical comparison. Single series by default; supports a second comparison series for before/after. Used for "X vs Y" data slides.

```yaml
type: bar
orientation: horizontal        # horizontal | vertical (default: horizontal)
axis:
  label: "token cost (relative to baseline)"
  zero-baseline: true
series:
  - label: "Baseline"
    color: ink                 # ink | muted | accent (default: ink)
  - label: "With superpowers"
    color: accent
data:                          # rows. each row = one category.
  - { category: "Trivial task",     values: [100, 96] }
  - { category: "Simple feature",   values: [100, 89] }
  - { category: "Moderate feature", values: [100, 82] }
  - { category: "Complex multi-file", values: [100, 77] }
callout:
  row: 3                       # index — highlight a specific row
  text: "-23% on complex tasks"
caption: "Mejba, 12-session controlled test"
```

Rendering rules:
- One highlight per chart max (the accent series or the callout row)
- No 3D, no gradients, no texture fills (impeccable ban carries)
- Zero-baseline required unless explicitly disabled
- Axis labels in `--sans-font`, small; data values in `--mono-font` tabular-nums
- Callout uses accent color, arrow + label to the right of the bar

### 3. `graph` — small DAG / network

Directed acyclic graph with ≤ 12 nodes. Used for dependency maps, skill graphs, system architecture at low detail. Larger graphs should cut to a readable subset or become backup material.

```yaml
type: graph
layout: tiered                 # tiered | radial (default: tiered)
nodes:
  - { id: a, label: "using-superpowers", tier: 0, role: entry }
  - { id: b, label: "brainstorming", tier: 1 }
  - { id: c, label: "writing-plans", tier: 1 }
  - { id: d, label: "subagent-dev", tier: 2 }
  - { id: e, label: "executing-plans", tier: 2, highlight: true }
  - { id: f, label: "code-review", tier: 3, highlight: true }
  - { id: g, label: "finishing", tier: 4, role: exit }
edges:
  - { from: a, to: b }
  - { from: a, to: c }
  - { from: b, to: d }
  - { from: c, to: d }
  - { from: c, to: e }
  - { from: d, to: e }
  - { from: e, to: f }
  - { from: f, to: g }
caption: "superpowers dependency graph"
```

Rendering rules:
- Tiered layout: nodes by tier (columns or rows), edges span tiers forward-only
- Node boxes: thin border (`--rule`), `--sans-font` labels
- Edges: thin lines, no arrowheads on short hops; arrowhead on long (>1 tier) hops
- Accent on highlighted nodes, accent on edges leading into them
- If more than 12 nodes, renderer errors — cut the spec

### 4. `quadrant` — 2×2 framework

Two-axis categorization, four quadrants with items placed by position. Used for prioritization, market maps, mental-model frameworks.

```yaml
type: quadrant
axes:
  x:
    label: "Enforcement strength"
    low: "suggests"
    high: "enforces"
  y:
    label: "Domain breadth"
    low: "narrow failure mode"
    high: "broad area"
items:
  - { label: "impeccable", x: 0.85, y: 0.70, highlight: true }
  - { label: "superpowers", x: 0.80, y: 0.90, highlight: true }
  - { label: "a typical custom skill", x: 0.25, y: 0.75 }
  - { label: "deck-architect", x: 0.70, y: 0.30 }
  - { label: "a one-shot prompt snippet", x: 0.10, y: 0.15 }
quadrant-labels:
  top-right: "enforcement + breadth"
  top-left: "broad but soft"
  bottom-right: "narrow but sharp"
  bottom-left: "slides in a drawer"
caption: "where the two skills sit among what users typically ship"
```

Rendering rules:
- Axes as thin rule lines through the center, `--ink` color
- Axis labels at ends in `--mono-font` small
- Quadrant labels at corners in `--muted`, small
- Items: text labels, accent for highlighted, `--ink-2` for others
- No fill tints (tempting but violates the "one highlight color" rhythm)
- Positions are 0–1 on each axis, origin at bottom-left

### 5. `waterfall` — sequential contribution chart

Shows how a starting value becomes an ending value through additive / subtractive steps. Used for cost breakdowns, P&L walks, version-to-version changes.

```yaml
type: waterfall
axis:
  label: "relative impact"
  unit: "%"
bars:
  - { label: "Starting point",    kind: total, value: 100 }
  - { label: "+ ban behaviors",   kind: delta, value: 12 }
  - { label: "+ rebut rationalizations", kind: delta, value: 8 }
  - { label: "+ objective checks", kind: delta, value: 6 }
  - { label: "+ decompose failures", kind: delta, value: 4 }
  - { label: "Final",             kind: total, value: 130 }
callout:
  bar: 1
  text: "highest leverage single move"
caption: "cumulative contribution to skill reliability (illustrative)"
```

Rendering rules:
- `kind: total` bars use `--ink`
- `kind: delta` bars: `--accent` for positive, `--muted` for negative
- Connector lines between consecutive bars' top edges, `--rule` dashed
- Values above each bar in `--mono-font` tabular-nums
- Callout: accent arrow + label

---

## Spec placement in the outline

Each slide's visual spec lives in the Phase 8 output's `Visual:` field, written as a fenced YAML block:

````markdown
7. **A chain of enforcement skills beats any single hero skill.**
   - Purpose: explain why users describe superpowers as transformative
   - On-slide: visual carries the point
   - Speaker notes: Schwartz's review, Mejba's measured uplift on complex tasks
   - Load: slide-heavy
   - Visual:
     ```yaml
     type: flow
     direction: horizontal
     nodes:
       - { id: a, label: "using-superpowers", role: entry }
       - { id: b, label: "brainstorming" }
       ...
     ```
````

The renderer `scripts/render-visual.js` walks a rendered HTML file, finds every `<figure data-visual-spec='...'>` placeholder, and swaps in the SVG. This is a post-processing pass, run after the HTML is generated and before the lint.

## Escape hatch — `data-visual-todo`

When the visual is genuinely custom (a hand-drawn whiteboard, a product screenshot, a photograph) and can't fit any shape:

```html
<figure data-visual-todo="hand-drawn whiteboard of the Cialdini mapping — author to supply"></figure>
```

The lint flags any `data-visual-todo` on main-flow slides (backup allowed as work-in-progress). The escape hatch makes unfinished work visible; it does not make it shippable.

## Validation

Every spec validates against its shape's schema before the renderer draws. Validation errors fail the render with the offending slide identified. The orchestrator's error output names:
- The slide (by `data-section`)
- The shape
- The specific field that failed

A malformed spec is a Phase 5 bug — go back and fix the outline, don't hand-tune the SVG.
