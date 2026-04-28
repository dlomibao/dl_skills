# deck-architect samples

Real outputs and test artifacts for the [deck-architect](../../skills/deck-architect/) skill.

## Featured: v7 end-to-end deck

**[v7-what-makes-great-skills.html](v7-what-makes-great-skills.html)** — the first generation that fully complies with the HTML-handoff scaffold contract (viewport model, 3-region composition, notes tray, keyboard hint pill, fullscreenchange handler, print override). Self-contained file; open it in any browser.

- **Scaffold:** starts from [`references/html-renderer-reference.html`](../../skills/deck-architect/references/html-renderer-reference.html); notes surface in a fixed bottom-sheet tray, never inline; keyboard hint pill always visible (dims after 4s inactivity).
- **Lint:** clean on all 17 static checks (including the four new presenter-scaffold rules).
- **Dry-run:** 10-step live-presentation checklist passes from source inspection.

Outline source at [v7-outline.md](v7-outline.md). Open the HTML and press `S` to slide the notes tray up; `←/→` to navigate; `F` for fullscreen.

## Pre-scaffold samples (v5, v6)

**[v5-what-makes-great-skills.html](v5-what-makes-great-skills.html)** and **[v6-what-makes-great-skills.html](v6-what-makes-great-skills.html)** predate the scaffold contract. They remain strong references for content, palette, and typographic choices (v5: cool teal + Unbounded; v6: warm terracotta + Sora), but fail three current lint rules (inline `aside.notes` display, no `#notes-tray`, no `#kbd-hint`). Do not copy them as templates — start from the reference scaffold instead.

## What the scaffold isolates: v8 and v9

Two follow-on generations against the same 2.6.0 contract, each demonstrating a different axis the scaffold lets the author vary independently.

- **[v8-what-makes-great-skills.html](v8-what-makes-great-skills.html)** — *register-isolation.* Same outline as v7 (validated finding-set, identical four moves) re-rendered in a different visual register: indigo ink on oat-milk paper under tungsten-amber accent (Syne / Spectral / Martian Mono). The scaffold makes content–visual separation cheap; v8 changes only the design-context block.
- **[v9-what-makes-great-skills.html](v9-what-makes-great-skills.html)** — *content fork.* Different outline (pyramid spine; Cialdini "if you have a skill … you must use it" as the STAR), different opening hook (93k stars in five months), fifth distinct visual register. Demonstrates the scaffold travels with arbitrary content.

Both lint clean on all 17 checks.

## The progression — how we got here

Each version was a fresh end-to-end subagent run against a different skill version. Every regression the prior version surfaced drove the next skill bump.

| Version | Skill | Cover | Grade | What the failure-mode round taught |
|---|---|---|---|---|
| [v1](what-makes-great-skills.html) | 2.3.1 | descriptive | F | Commentary leaked onto slides; no `data-role`; no speaker notes; chain rendered as text paragraphs |
| [v2](v2-what-makes-great-skills.html) | 2.4.0 | fragmented kicker + headline | caught by lint | HTML handoff contract shipped; fragmented cover snuck past |
| [v3](v3-what-makes-great-skills.html) | 2.4.2 | informative ("The design moves behind…") | A−, 90 | Structure clean but chain still rendered as seven text paragraphs |
| [v4](v4-what-makes-great-skills.html) | 2.5.0 | quotable ("Four moves that turn a skill into a system.") | A, 93 | Structured visual specs + shipped renderer — chain is finally SVG |
| [v5](v5-what-makes-great-skills.html) | 2.5.1 | rhetorical ("Great skills refuse. Average skills suggest.") | A+, 97 | Cover echoes close; hyphen-wrap fixes flow overflow |
| [v6](v6-what-makes-great-skills.html) | 2.5.2 | "Weak skills describe. Strong skills forbid." | A+, 97 | Graph label wrap + budget warnings at render time |
| [v7](v7-what-makes-great-skills.html) | 2.6.0 | "Your skills mostly say do. The best ones say don't — and check the don't held." | PASS | Presenter-mode scaffold contract: notes tray, kbd-hint pill, fullscreenchange handler, print override — three production bugs fixed |
| [v8](v8-what-makes-great-skills.html) | 2.6.0 | "Weak skills describe. Strong skills forbid." (v7 outline, indigo-on-oat register) | PASS | Same outline as v7 re-rendered in a different register — proves the scaffold isolates visual variation cleanly |
| **[v9](v9-what-makes-great-skills.html)** | **2.6.0** | **"What makes impeccable and superpowers such great skills."** | **PASS** | **Different outline (contracts-not-tutorials reframe, Cialdini STAR), fifth visual register — proves the scaffold travels with arbitrary content** |

Each HTML file has the corresponding `-outline.md` alongside it showing the Phase 8 source the subagent produced.

## Meta-deck on the skills themselves

[impeccable-superpowers-meta-deck.md](impeccable-superpowers-meta-deck.md) — the original Phase 8 markdown output from the same prompt, before the HTML handoff contract existed. Kept as the reference point the progression measured itself against.

## Earlier subagent test runs (v2.2.0)

Validated the skill's loading semantics — clean-context subagents given only `SKILL.md` paths.

| File | Prompt | Result |
|---|---|---|
| [test-a-fresh-deck-trigger.md](test-a-fresh-deck-trigger.md) | "help me make a deck about our Q3 platform reliability" | Phase 0 fired first; 2 refs loaded per explicit instructions |
| [test-b-existing-draft.md](test-b-existing-draft.md) | "I have a 28-slide customer review — help me fix it" | Existing-draft path identified; 28 → 10 cut; 3 refs loaded |
| [test-c-pitch-websearch.md](test-c-pitch-websearch.md) | "10-min Sequoia seed pitch with a hook image" | WebSearch actually fired 3×; no fabricated URLs; licensing flagged |
| [TEST-FINDINGS.md](TEST-FINDINGS.md) | — | Synthesis + 7 actionable findings (resolved in v2.3.0) |

## Regression tests (v2.3.0)

Same 3 prompts re-run against v2.3.0 to validate the fixes landed. Surfaced 3 small polish items addressed in v2.3.1.

| File | What it validates |
|---|---|
| [v2.3-regression-test-a-fresh-deck.md](v2.3-regression-test-a-fresh-deck.md) | `forbidden-phrases.md` trigger clarity + inline Red Flags replacing `rationalizations.md` load |
| [v2.3-regression-test-b-existing-draft.md](v2.3-regression-test-b-existing-draft.md) | 4 existing-draft fixes (guidance expansion, schema slot, ceiling, takeaway exception) |
| [v2.3-regression-test-c-websearch.md](v2.3-regression-test-c-websearch.md) | WebSearch collection-page acknowledgment + unified `forbidden-phrases.md` trigger |
