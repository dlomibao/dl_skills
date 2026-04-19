# Reject-your-reflex phrase list — forbidden on sight

> **Scope:** English-language decks. For other languages, translate the spirit (specifics over filler) rather than transliterating the list.

The model's natural failure mode is reaching for hedged, corporate-adjacent vocabulary on every deck. These phrases are training-data reflexes — statistically common in business writing, not informationally useful. Reject on sight; rewrite with specifics.

- "leverage" (as a verb — use "use")
- "drive alignment" / "drive results" / "drive value" / "drive impact"
- "unlock" / "unleash" / "harness"
- "strategic pillars" / "key themes" / "core tenets" / "guiding principles"
- "seamlessly" / "holistically" / "synergistically"
- "robust" / "scalable" / "best-in-class" / "world-class" / "industry-leading"
- "innovative" / "cutting-edge" / "next-generation" / "next-gen"
- "stakeholders" (when you mean specific named people or roles)
- "ecosystem" / "landscape" (when you just mean market or industry)
- "empower" / "enable" (when something more concrete works)
- "solution" (say what it actually is)
- "significant impact" / "substantial value" (give the number)
- "at the end of the day" / "at its core"
- "paradigm" / "paradigm shift"
- "game-changer" / "game-changing"
- "touch base" / "circle back" / "take this offline"
- "moving forward" / "going forward"
- "value-add" / "value proposition" (as filler)
- "North Star" / "table stakes" / "low-hanging fruit"
- "In today's fast-paced world..." (or any variant)
- "We are excited to..." / "We are thrilled to..."
- "Let me walk you through..."

These aren't bad because they're clichés — they're bad because they're *empty*. Each can be replaced with a concrete noun or verb that carries information.

| Reflex | Specific replacement |
|---|---|
| "Drive alignment" | "Get three execs to say yes" |
| "Leverage our platform" | "Use our existing data pipeline" |
| "Significant impact on retention" | "D30 retention moved from 22% to 41%" |
| "Empower the team" | "Cut weekly approval cycles from 4 to 1" |

Specificity is what kills the AI-slop feel.

## Other AI-slop structural tells

- Textbook-definition language ("In today's fast-paced world...")
- Three equal-weight bullets under every header (audit whether the three points are actually parallel and distinct — if not, collapse or restructure)
- Generic framework names with no substance ("Our Strategic Pillars," "Key Themes")
- Hedged qualifier-heavy sentences ("could potentially help drive...")
- Content that would apply to any company/project with the nouns swapped
- Placeholder phrases where specifics belong ("various stakeholders," "multiple initiatives")

If content hits these patterns, either pull more specific info from the user or rewrite with a sharper point of view.

## Slide-body commentary — belongs in speaker notes, not on the slide

These phrases are authoring vocabulary, not audience content. They describe the *deck* instead of making a point to the room. Observed leaking into rendered slides from outline meta-structure (Phase 8 schema fields), pressure-test notes, and handoff annotations.

**Never on a rendered slide. Move to `<aside class="notes">` or delete.**

- `Triggered by: …` — this is an outline field (Phase 7 backup trigger), not on-slide copy
- `Depth: L2` / `Depth: L3` / `depth indicator` — same
- `See B[0-9]+` / `See slide N` / `See backup N` — internal cross-references
- `As covered earlier` / `As we saw above` / `In the next slide` / `The following slides` — deck-structural narration
- `// …` style structural comments — authoring shorthand
- `[INFERRED — confirm]` — should have been resolved before render
- `(Phase N)` references — skill-internal vocabulary
- `Walk-in state → walk-out state` — audience-model phrasing, not a slide
- `Hardest sell:` / `Decision-maker:` — outline metadata
- `Pressure-tested as:` / `Fixed:` / `Role adopted:` — pressure-test log content

**The test:** read the line aloud to the actual audience. If it's *about* the deck instead of *part of* the argument, it's commentary — move it or delete it.

**Why this matters specifically for HTML renderers:** deck-architect's Phase 8 output includes structural metadata (triggers, depth, speaker notes). When a renderer converts that output to HTML, the easy mistake is dropping every field flat onto the slide. The `Speaker notes:` block needs its own aside element; the `Triggered by:` and `Depth:` fields belong in presenter mode or cut entirely. The renderer contract at `html-renderer.md` enforces this.
