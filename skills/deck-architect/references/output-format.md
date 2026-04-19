# Phase 9 output format

Deliver the outline as **structured text**, not slides. The user takes it to a visual tool (`pptx` skill, design team, template).

Use this schema verbatim. Code-fenced for copy-paste reliability.

````markdown
# [Deck Title]

## Audience Model
- Who's in the room: ...
- What they care about: ...
- What they already know/believe: ...
- Transformation (walk-in → walk-out state): ...
- Likely objections / deep-dive triggers: ...

## Brief
- Decision/ask: ...
- Format & time: ...
- Constraints: ...
- One-sentence takeaway: ...
- Team contributors (if applicable): ...

## Narrative spine
[Which structure and why — one sentence]

## Opening hook (first 30 seconds)
[The actual words / visual / stat that opens the deck — not "title slide"]

## STAR moment
[The one thing the audience will remember and quote afterward — which slide it lives on]

## Main flow
1. [Title as full-sentence message]
   - Purpose: ...
   - On-slide: [what actually appears — short, anchor-oriented]
   - Speaker notes: [what the presenter says that is NOT on the slide]
   - Load: slide-heavy | balanced | speaker-heavy
   - Visual: text-only  (or chart/diagram/image/screenshot + spec)

2. ...

## Backup layer
B1. [Title] — triggered by: [question/moment] — depth: L2
   - Content: ...
   - Visual: [mode + spec]
B2. ...

## Visual consistency notes
- [Cross-deck notes — single highlight color, icon family, etc.]
- [Assets user needs to source vs. create]

## What I cut (and why)
- [Topic] — reason
- ...

## Handoff notes
- For pptx/design: [visual or layout suggestions that emerged]
- Credits slide (if team effort): [names + specific contributions]
- Licensing flags: [web-sourced images needing license verification]

## Pressure-test log [size: Micro | Standard | Extended]
- Role(s) adopted: [who you role-played, with priors]
- Top critiques surfaced: [in skeptic's voice — 2-3 Micro / 5-8 Standard / 8+ Extended]
- Fixes applied: [specific slide → specific change]
- Live-meeting prep notes (Standard/Extended only): [residual questions to rehearse]
````

## Length budget

Default output target: **main flow ≤ 12 slides** in the response, expand on request. Larger decks can truncate mid-output. Either:

1. Cap the main flow at 12 in the first response and offer to expand
2. For decks above 15 slides, deliver in two responses — main flow first, backup second

For Micro pressure tests, the Pressure-test log can collapse to one paragraph: "Pressure-tested as [role]. Surfaced [N critiques], fixed by [changes]." Full template above is overkill on a low-stakes deck.

## Inferred answers

If the user wouldn't answer Phase 0/1 questions and you inferred, mark inferences with `[INFERRED — confirm]` so they can correct in one pass:

```
- Who's in the room: VP Eng + 2 staff engineers [INFERRED — confirm]
```
