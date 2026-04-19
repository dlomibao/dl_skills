# deck-architect samples

Real outputs and test artifacts for the [deck-architect](../../skills/deck-architect/) skill.

## Featured: v6 end-to-end deck

**[v6-what-makes-great-skills.html](v6-what-makes-great-skills.html)** — a 12-minute conference talk rendered from a deck-architect outline through `/impeccable` for HTML. Self-contained file; open it in any browser.

- **Cover:** *"Weak skills describe. Strong skills forbid."*
- **Close:** *"Pick. Forbid. Check."*
- **Structure:** SCQA + pyramid, 4 MECE moves, honest tradeoff, main-flow rollback, action-ask close
- **Visuals:** flow (chain), bar (Mejba data), quadrant (skill positioning), graph (dependency DAG, appendix), waterfall (cumulative contribution, appendix)
- **Typography:** Sora (display) + Literata (body) + Geist Mono (meta)
- **Palette:** warm terracotta accent over tinted-paper OKLCH neutrals
- **Lint:** clean on all 11 static checks
- **Grade:** A+ (97/100)

Outline source at [v6-outline.md](v6-outline.md). Open the HTML and press `S` to see presenter-mode speaker notes; `←/→` to navigate; `F` for fullscreen.

## The progression — how we got to v6

Each version was a fresh end-to-end subagent run against a different skill version. Every regression the prior version surfaced drove the next skill bump.

| Version | Skill | Cover | Grade | What the failure-mode round taught |
|---|---|---|---|---|
| [v1](what-makes-great-skills.html) | 2.3.1 | descriptive | F | Commentary leaked onto slides; no `data-role`; no speaker notes; chain rendered as text paragraphs |
| [v2](v2-what-makes-great-skills.html) | 2.4.0 | fragmented kicker + headline | caught by lint | HTML handoff contract shipped; fragmented cover snuck past |
| [v3](v3-what-makes-great-skills.html) | 2.4.2 | informative ("The design moves behind…") | A−, 90 | Structure clean but chain still rendered as seven text paragraphs |
| [v4](v4-what-makes-great-skills.html) | 2.5.0 | quotable ("Four moves that turn a skill into a system.") | A, 93 | Structured visual specs + shipped renderer — chain is finally SVG |
| [v5](v5-what-makes-great-skills.html) | 2.5.1 | rhetorical ("Great skills refuse. Average skills suggest.") | A+, 97 | Cover echoes close; hyphen-wrap fixes flow overflow |
| **[v6](v6-what-makes-great-skills.html)** | **2.5.2** | **"Weak skills describe. Strong skills forbid."** | **A+, 97** | Graph label wrap + budget warnings at render time |

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
