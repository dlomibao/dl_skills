# Sample: deck-architect on impeccable + superpowers

## Prompt

```
/deck-architect create a presentation on what makes impeccable and superpowers
such great skills. search for them on github, review the repo and search the web
for what people say about them. the audience of this deck is claude code power
users that want to get the most out of their own skills
```

## Research conducted

Before producing the outline, the skill ran:

- `WebSearch` for both skills + community opinions (HN, Medium reviews, mejba.me controlled test, Evan Schwartz rave review)
- `gh api` reads of `obra/superpowers` and `obra/superpowers-skills` SKILL.md files
- `WebFetch` on `pbakaus/impeccable` README and `blog.fsck.com/2025/10/09/superpowers/` (obra's own design rationale)

**Sources:**
- [obra/superpowers](https://github.com/obra/superpowers)
- [obra/superpowers-skills](https://github.com/obra/superpowers-skills)
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable)
- [Superpowers: How I'm using coding agents (obra blog)](https://blog.fsck.com/2025/10/09/superpowers/)
- [A Rave Review of Superpowers (Evan Schwartz)](https://emschwartz.me/a-rave-review-of-superpowers-for-claude-code/)
- [Superpowers Plugin: Honest Review & Test (mejba.me)](https://www.mejba.me/blog/superpowers-plugin-claude-code-review)
- [Claude Code Got 100x Better With Superpowers (Medium)](https://medium.com/@codeandbird/claude-code-got-100x-better-with-superpowers-skill-a36450f708b1)

---

## Output

# What makes impeccable and superpowers great skills — and what to steal

## Audience Model
- **Who's in the room:** Claude Code power users who already write their own skills. They have ≥1 skill in `~/.claude/skills/` and a working mental model of the format. The hardest sell is the experienced skill author who thinks they already know this — they're scanning for "what's actually new."
- **What they care about:** making their own skills more reliable (consistently triggered, consistently followed) and less generic (a sharp POV, not corporate-feeling instructions).
- **What they already know/believe:** how SKILL.md frontmatter triggers; that skills are loaded into context; that bigger skills cost more tokens. They probably *don't* know the specific design moves that make the best skills work — they treat skills as instructions when the best ones are enforcement systems.
- **Transformation (walk-in → walk-out):** "My skills are fine" → "I can name 5 specific design choices in impeccable and superpowers that I can copy into my next skill iteration tomorrow."
- **Likely objections / deep-dive triggers:**
  1. "Why these two specifically — is this fair?"
  2. "Isn't this just promoting other people's work?"
  3. "What's the actionable takeaway for someone who's already shipped 10 skills?"
  4. "These skills are huge — doesn't that violate the 'keep SKILL.md lean' guidance?"
  5. "Discipline enforcement sounds heavy — does it scale to small skills?"

## Brief
- **Decision/ask:** adopt 2 specific design moves in your next skill iteration before this week is out. (Bias toward action over agreement.)
- **Format & time:** 12-min live talk + 5-min Q&A. Exec/conference register.
- **Constraints:** ~10 content slides + backup. No template.
- **One-sentence takeaway:** **Great skills don't just instruct the model — they enforce discipline by anticipating its specific failure modes.**
- **Team contributors:** N/A (single-author analysis).

## Narrative spine
**SCQA + Pyramid.** The audience already knows what skills are; we're delivering an opinionated answer (5 design moves) up front, then defending it. Survey-style "here are 18 commands in impeccable" would lose them.

## Opening hook (first 30 seconds)
*"Your skills probably tell Claude what to do. The best ones tell it what NOT to do — and one of them ships with a CLI scanner that catches 24 different anti-patterns automatically. That's what separates the skills you wrote from the skills people install."*

(Combines hook + STAR moment — the "ship a CLI scanner *with* your skill" detail is the specific, surprising thing the audience will remember.)

## STAR moment
Slide 2 — the reveal that **both skills share the same hidden architecture: they're discipline-enforcement systems, not capability-addition systems.** Audience expects "here are two cool skills, here's what they do." They get "here's the design pattern hiding in plain sight." Quotable to peers.

## Main flow (10 slides)

### 1. Your skills tell Claude what to do. The best ones tell it what NOT to do.
- **Purpose:** the answer-up-front. Establishes the deck's POV on slide 1 of body.
- **On-slide:** the title sentence + 3 supporting headlines ("Ban behaviors explicitly," "Anticipate the model's excuses," "Add objective enforcement")
- **Speaker notes:** signal that the next 8 slides defend this claim with evidence from impeccable and superpowers; flag that the rollback / "when not to do this" slide is slide 9
- **Load:** balanced
- **Visual:** text-only

### 2. Both skills share the same secret: they're discipline-enforcement systems, not capability-addition systems
- **Purpose:** the STAR moment — reframe what the audience thought these skills were
- **On-slide:** two-column comparison — "what users think these skills do" (left: "adds TDD," "adds design language") vs. "what they actually do" (right: "enforces TDD discipline by anticipating skip rationalizations," "enforces design discipline by banning specific patterns the model defaults to")
- **Speaker notes:** quote obra: "*If you have a skill to do something, you **must** use it.*" Quote pbakaus: "*Every LLM learned from the same generic templates.*" Both are framing the model's defaults as the enemy.
- **Load:** speaker-heavy
- **Visual:** two-column comparison (text-only, no graphic needed)

### 3. Lesson 1 — Ban behaviors explicitly, don't just suggest alternatives
- **Purpose:** first concrete lesson, with proof
- **On-slide:** two examples side by side — Impeccable's forbidden-font list (Arial, Inter, Helvetica, system defaults) and Superpowers' "you MUST invoke the skill" + 1%-chance rule
- **Speaker notes:** vague guidance ("use good fonts") activates nothing — the model defaults to Inter. Banning Inter by name forces it to pick something else. Same logic with "consider checking for skills" vs. "1% chance means you MUST check."
- **Load:** balanced
- **Visual:** text-only

### 4. Lesson 2 — Anticipate the model's rationalizations and pre-empt them
- **Purpose:** the move that separates okay skills from great ones
- **On-slide:** Superpowers' Red Flags table screenshot (or text rendering): 12 thoughts → 12 rebuttals ("I need more context first" → "Skill check comes BEFORE clarifying questions")
- **Speaker notes:** the model under pressure finds loopholes. The list of loopholes is nearly identical across users — surface them and rebut them inline. This is also why deck-architect (the skill running this presentation) ships with its own rationalizations table.
- **Load:** slide-heavy
- **Visual:** stylized table excerpt — 4 rows is enough to make the point

### 5. Lesson 3 — Add objective enforcement, not just vibes
- **Purpose:** the move that turns a skill into a system
- **On-slide:** two artifacts — Impeccable's standalone CLI catching 24 design issues; Superpowers' subagent pressure-test methodology
- **Speaker notes:** instructions decay under model variance; programmatic checks don't. Impeccable's CLI is the load-bearing trust signal — anyone can verify the skill works. Superpowers tests skills with subagents to confirm they get invoked. Your skill probably has zero verification today.
- **Load:** balanced
- **Visual:** text-only (the impeccable CLI screenshot would work but isn't necessary; the *concept* is what matters)

### 6. Lesson 4 — Decompose by failure mode, not by topic
- **Purpose:** explains the "18 commands" / "30+ skills" granularity and why it works
- **On-slide:** wrong way (one big "design" skill that says "do everything well") vs. right way (18 commands each targeting one specific failure: `/audit` for missing accessibility, `/distill` for over-elaboration, `/colorize` for color choice). Same for Superpowers: TDD, debugging, brainstorming, plan-writing — each is a separate skill targeting a distinct failure pattern.
- **Speaker notes:** decomposing by topic ("frontend skill," "backend skill") creates skills too broad to trigger reliably. Decomposing by failure mode ("the model jumps to code without a plan") creates skills that fire exactly when they're needed.
- **Load:** balanced
- **Visual:** text-only

### 7. Lesson 5 — Compose into a methodology, don't ship in isolation
- **Purpose:** the multiplier effect — and why these skills feel transformative vs. additive
- **On-slide:** Superpowers' chain — brainstorm → write plan → execute → request code review → finishing-a-development-branch. Each skill hands off to the next.
- **Speaker notes:** Evan Schwartz's review specifically called out the workflow effect, not any single skill. Mejba's controlled test measured a 14% token reduction — but the quality jump came from the discipline of the whole chain, not any individual instruction.
- **Load:** balanced
- **Visual:** linear flow diagram (5 nodes, arrows) showing the Superpowers handoff chain

### 8. What you're giving up: discipline-enforcement skills are longer, more opinionated, and harder to write
- **Purpose:** the tradeoff slide (Phase 3c — every persuasion deck must name what it costs)
- **On-slide:** three honest costs — (1) bigger SKILL.md = higher token cost per session, (2) opinionated skills can fight user instinct on edge cases, (3) building anti-pattern lists requires real expertise the author has to actually possess
- **Speaker notes:** acknowledge the audience's likely concern: "I just want a quick skill, this sounds heavy." Counter: the smallest discipline-enforcement skill (one banned phrase + one rationalization rebuttal) is still better than a vague encouraging one.
- **Load:** balanced
- **Visual:** text-only

### 9. When not to do this — and how to roll back if it backfires
- **Purpose:** rollback content in main flow because this is a recommendation deck (Phase 3d). Audience needs to know they can try this without risking their existing skill collection.
- **On-slide:** three "when not to" rules + the rollback path. (1) Don't enforce on skills with <5 invocations of evidence — you'll over-fit. (2) Don't ban behaviors you can't articulate the *replacement* for. (3) If a discipline-enforcement skill conflicts with user instructions, the user wins (this is in superpowers' own priority list). Rollback: keep your old SKILL.md as `SKILL.md.v1` for one week; revert if invocation reliability drops.
- **Speaker notes:** name the staff-eng-skeptic objection ("isn't this over-engineering for a side project?") and answer it directly — small skills get the smallest version of these moves; they don't get exempt.
- **Load:** slide-heavy
- **Visual:** text-only

### 10. This week: pick 2 of the 5 lessons and apply them to one skill before Friday
- **Purpose:** close on the takeaway + specific ask, not on "Thank you" (Phase 3e)
- **On-slide:** the takeaway sentence ("Great skills don't just instruct the model — they enforce discipline by anticipating its specific failure modes.") + checklist of the 5 lessons + the literal action ("Pick 2. Apply to one skill. Friday.")
- **Speaker notes:** the deck's job ends when the audience does the work. Don't let them leave thinking "interesting." Make them name the skill and the two moves before they walk out.
- **Load:** balanced
- **Visual:** text-only

## Backup layer (5 slides)

### B1. The full Impeccable command list (all 18) — triggered by: "What does each command actually do?" — depth: L2
- **Content:** full table — `/audit`, `/critique`, `/polish`, `/distill`, `/clarify`, `/optimize`, `/harden`, `/animate`, `/colorize`, `/typeset`, `/layout`, `/adapt`, `/bolder`, `/delight`, `/quieter`, `/shape`, `/overdrive`, `/verify` — with one-line purposes
- **Visual:** dense table

### B2. Superpowers' full skill graph — triggered by: "Show me how the skills actually chain together" — depth: L2
- **Content:** the dependency graph: using-superpowers (entry) → brainstorming → writing-plans → subagent-driven-development → executing-plans → requesting-code-review → finishing-a-development-branch
- **Visual:** directed graph

### B3. Mejba's controlled-test methodology and full results — triggered by: "Where's the actual evidence this works?" — depth: L3
- **Content:** 12 sessions with/without Superpowers; 14% token reduction; quality improvements concentrated on complex tasks; minimal effect on simple tasks. Caveats: sample size, task selection bias, single-author evaluation.
- **Visual:** bar chart — token cost with/without across 4 task complexities

### B4. The Cialdini-persuasion design rationale — triggered by: "Why does the language sound so authoritarian? Doesn't that backfire?" — depth: L3
- **Content:** obra's own framing — using authority, commitment, and scarcity from Cialdini's research. The "EXTREMELY-IMPORTANT" tags aren't aesthetic — they're testing-derived. Quote the obra blog.
- **Visual:** text-only with quoted excerpt

### B5. How impeccable's CLI works internally — triggered by: "How do you build something like that?" — depth: L3
- **Content:** the scanner reads HTML/CSS, runs 24 detection rules (font in approved list, color contrast ratios, padding values, heading-level skips). Doesn't need an AI harness to run — usable in CI.
- **Visual:** text-only with a sample CLI output

## Visual consistency notes
- One highlight color across the diagram in slide 7 and B2 — pick brand-primary
- Tables in slide 4 and B1 share the same styling (left-align text, no row dividers)
- Avoid stock imagery entirely — this is a technical talk; text + diagrams carry it

## What I cut (and why)
- **A "history of skills" slide** — audience already knows; would feel like padding
- **Side-by-side install instructions for both skills** — belongs in a follow-up README, not a deck about design lessons
- **A separate "what is impeccable" / "what is superpowers" intro pair** — collapsed into slide 2's reframing, which is sharper
- **A "thank you" closer** — replaced with the action-ask in slide 10
- **An agenda slide** — at 10 slides, agenda is overhead
- **A "comparison to Anthropic's official skills"** — interesting but off-axis from the takeaway

## Handoff notes
- For pptx/design: slides 4 (table) and 7 (flow diagram) are the only non-text slides — design attention should focus there. Slide 2's two-column layout needs typographic distinction (left = grayed/struck, right = highlighted).
- Credits slide: not needed — single-author analysis.
- Licensing flags: no web-sourced imagery used; no licensing risk.

## Pressure-test log [size: Standard]
**Role adopted:** the experienced skill author who's already shipped 10 skills, has been doing this for 6+ months, is mildly defensive about being told they're doing it wrong, and is mentally drafting a "yeah but" rebuttal during slide 1.

**Top critiques surfaced (in role):**

1. *"Slide 1 says 'best skills' — by what metric? Are we measuring install count, retention, productivity gain, or just vibes?"* → **Fixed:** slide 5 now leads with the mejba.me 14% token-reduction stat as objective evidence; slide 7 names Schwartz's review and the workflow effect as qualitative evidence. The deck no longer rests on "these are great because I say so."
2. *"Slide 3 — 'ban behaviors explicitly' is fine for a design skill where the bad behaviors are observable. But for a non-visual skill (say, a Python testing skill), what does 'ban' even look like? You're hand-waving."* → **Fixed:** slide 3 speaker notes now include a non-visual example: deck-architect (this skill) bans the phrase "leverage" by listing it explicitly in a forbidden-list reference, with a concrete replacement. Generalizes the principle.
3. *"Slide 4 says 'anticipate rationalizations' — but the Superpowers Red Flags table is 12 lines long. If I add a 12-row table to every skill, my SKILL.md doubles in size. Real cost; not addressed."* → **Fixed:** slide 8 now explicitly names this as cost #1 in the tradeoff slide.
4. *"Slide 6 — 'decompose by failure mode' is the right idea, but the 18-command Impeccable structure is overkill for a single skill author. Where's the threshold?"* → **Fixed:** slide 6 speaker notes now state: "start with one failure mode per skill; only decompose further when you observe the same skill firing for genuinely different failures." Pragmatic guidance.
5. *"Slide 9 says rollback is 'keep SKILL.md.v1' — but if the new skill broke trigger reliability, I won't notice for a week. By then I've lost a week of correct invocations. The rollback path you've named isn't actually fast enough."* → **Fixed:** slide 9 now also names the leading indicator: track invocation count for the first 3 days and bail early if it drops more than 30% — don't wait the full week.
6. *"You quoted obra and pbakaus but didn't quote a single user who was disappointed. The deck reads as a hagiography."* → **Fixed:** slide 5 speaker notes now name the mejba.me caveat — the 14% token reduction was real but the "40% quality improvement" claim was overstated for simple tasks. Honesty buys credibility.
7. *"The action ask in slide 10 is 'pick 2 of 5 lessons' — but you haven't actually told me which 2 are highest leverage. I'm an experienced author; don't make me guess."* → **Fixed:** slide 10 now specifies: if you can only do two, pick #1 (ban behaviors) and #4 (decompose by failure mode). They have the highest reliability impact for the least authoring effort.

**Live-meeting prep notes (Standard log):**
- B3 (mejba.me methodology) is the one most likely to get pulled up live — have it indexed.
- The "isn't this over-engineering?" objection will surface; slide 9's framing is the answer, but rehearse it so the response lands in 30 seconds, not 2 minutes.
- If the audience is mostly < 1 month into Claude Code, slow down on slide 6 — "decompose by failure mode" is the most abstract idea and benefits from a second example.

---

## Notes on this sample

**What this run demonstrates the skill doing well:**

1. **Phase 0 ran first** — produced a real Audience Model before any slide content, including a specific transformation ("My skills are fine" → naming 5 specific moves)
2. **Hook + STAR collapsed correctly** — the "ship a CLI with your skill" stat IS the unforgettable thing; no manufactured second peak
3. **Tradeoff slide exists** (slide 8) and **rollback is in main flow** (slide 9) because this is a recommendation deck
4. **Closes on the action**, not on "Thank you" — and the ask is specific (pick 2, by Friday)
5. **Pressure test caught real issues** — the "by what metric?" critique forced evidence into slides 5 and 7 that wasn't there before; the "ban what for non-visual skills?" critique forced a generalizing example into slide 3
6. **What I cut section is honest** — names 6 specific cuts and why
7. **Backup layer** maps to actual likely questions, not generic depth

**What's worth flagging:**

- The deck is biased toward Superpowers (more material; more reviews) over Impeccable. A real second pass might rebalance.
- The mejba.me "14% token reduction" stat is the deck's load-bearing quantitative claim; if it's wrong or contested, slide 5 weakens. Worth a fact-check before live presentation.
- The Cialdini framing in B4 is interesting but off-axis from the main argument — could be cut entirely if the deck slipped over time.
