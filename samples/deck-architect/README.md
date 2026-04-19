# deck-architect samples

Real outputs and test artifacts for the [deck-architect](../../skills/deck-architect/) skill.

## End-to-end example runs

| File | Prompt shape | What it demonstrates |
|---|---|---|
| [impeccable-superpowers-meta-deck.md](impeccable-superpowers-meta-deck.md) | "Build a deck about what makes these two skills great" | Full Phase 8 output with research (WebSearch + gh API), tradeoff slide, rollback slide, Standard pressure test, final scan |

## Subagent test runs (v2.2.0 — validated the skill's loading semantics)

Each test spawned a clean-context subagent given only the `SKILL.md` path and an explicit instruction not to pre-load references.

| File | Prompt | Result |
|---|---|---|
| [test-a-fresh-deck-trigger.md](test-a-fresh-deck-trigger.md) | "help me make a deck about our Q3 platform reliability" | Phase 0 fired first; 2 refs loaded per explicit instructions |
| [test-b-existing-draft.md](test-b-existing-draft.md) | "I have a 28-slide customer review — help me fix it" | Existing-draft path identified; 28 → 10 cut; 3 refs loaded |
| [test-c-pitch-websearch.md](test-c-pitch-websearch.md) | "10-min Sequoia seed pitch with a hook image" | WebSearch actually fired 3×; no fabricated URLs; licensing flagged |
| [TEST-FINDINGS.md](TEST-FINDINGS.md) | — | Synthesis + 7 actionable findings (resolved in v2.3.0) |

## Regression tests (v2.3.0)

Same 3 prompts, re-run against v2.3.0 to validate the fixes landed. Surfaced 3 small polish items addressed in v2.3.1.

| File | What it validates |
|---|---|
| [v2.3-regression-test-a-fresh-deck.md](v2.3-regression-test-a-fresh-deck.md) | `forbidden-phrases.md` trigger clarity + inline Red Flags replacing `rationalizations.md` load |
| [v2.3-regression-test-b-existing-draft.md](v2.3-regression-test-b-existing-draft.md) | 4 existing-draft fixes (guidance expansion, schema slot, ceiling, takeaway exception) |
| [v2.3-regression-test-c-websearch.md](v2.3-regression-test-c-websearch.md) | WebSearch collection-page acknowledgment + unified `forbidden-phrases.md` trigger |
