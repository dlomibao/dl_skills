# Test B — Existing-draft path / Phase 4 working mode

**Test goal:** Verify that an existing-draft prompt routes to Phase 4 working mode (revise rather than start fresh), still runs Phase 0 with inference, and produces a "what changed and why" section.

**Setup:** Subagent given only `SKILL.md` path, no pre-loaded references. Prompt was a 28-slide outline of a generic-feeling customer review.

## Prompt

> "I have this existing 28-slide deck for an internal customer review. It's too long, the message isn't landing, and my manager said it 'feels generic.' Help me fix it. Here's the current outline: [28-slide outline]. The audience is the customer's VP of Operations and her two directors. The customer is considering whether to renew their contract."

## Result

✅ **PASS** — with multiple actionable findings on the existing-draft path.

### Verified behaviors

| Check | Result |
|---|---|
| Existing-draft path identified, with quoted SKILL.md text | ✅ |
| Phase 0 inferred from draft using the new heuristics | ✅ |
| Loaded `references/slide-craft.md` per Phase 3 | ✅ |
| Loaded `references/forbidden-phrases.md` per Phase 4 | ✅ |
| Loaded `references/pressure-test.md` per Phase 6 | ✅ |
| Pressure-test log present, sized Standard | ✅ 7 quoted critiques |
| "What changed and why" section included | ✅ |
| Don't-infer-takeaway rule respected | ✅ Templated with "user must fill in" note |
| 28 slides cut to 10 main + 6 backup with reasons logged | ✅ |

### Tools called (in order)

1. `Read` SKILL.md
2. `Read` references/slide-craft.md
3. `Read` references/forbidden-phrases.md
4. `Read` references/pressure-test.md

### Friction surfaced

The existing-draft path produced 4 actionable findings on the skill itself — see [TEST-FINDINGS.md](TEST-FINDINGS.md):

1. **The existing-draft instruction is one sentence** and doesn't specify what happens to Phases 2/5/6/7/8 in this mode.
2. **Phase 8 output schema has no slot for "what changed and why"** — schema doesn't match the existing-draft instruction. Real bug.
3. **No slide-count ceiling for "external customer business review"** — agent picked 10 by analogy.
4. **The "don't infer takeaway" rule creates tension with existing-draft mode** (no live dialogue) — the agent left it templated with a hard "user must fill in" note, but the skill doesn't tell you to do that.

---

## Full simulated output

(Verbatim from subagent)

---

# Customer Q3 Business Review — Revised Outline

> Existing-draft revision. The outline below replaces the 28-slide draft. Audience Model and Brief inferred from the original deck per Phase 0/1 existing-draft instructions; please confirm or correct in one pass.

## Audience Model
- **Who's in the room:** Customer's VP of Operations (decision-maker on renewal) + 2 directors (likely interrupters; they own the day-to-day relationship and have the receipts on what did and didn't work). Hardest sell: the **VP**, who is not in the weekly cadence and will judge on outcomes vs. cost. `[INFERRED — confirm]`
- **What they care about:** Did the contract pay back? What does year 2 look like vs. alternatives? Risk of switching costs vs. risk of staying on a vendor that's plateaued. `[INFERRED — confirm]`
- **What they already know/believe:** They know your team, they've seen the metrics dashboards, they've lived the wins and the misses already. They do NOT need "About Our Team" or "Customer Overview." They likely believe: "the relationship is fine but I'm not sure it's worth what we're paying." `[INFERRED — confirm]`
- **Transformation:** "Renewal is an open question, and this deck feels generic" → "I can defend this renewal to my CFO with three specific outcomes and a credible Q4 plan." `[INFERRED — confirm]`
- **Likely objections:**
  1. "The retention number — is that us, or seasonality?"
  2. "What did Challenge 2 actually cost us, and is it fixed?"
  3. "Why should we expect Q4 to be different from Q3?"
  4. "What are we giving up if we renew at the proposed level?"
  5. "What does the resource ask actually buy us — be specific."

## Brief
- **Decision/ask:** Renew the contract (and likely: approve the Q4 resource ask). The original deck buries this — there is no slide that says "here's what we're asking for." That is the deck's biggest structural problem. `[INFERRED — confirm]`
- **Format & time:** Live presentation, ~45 minutes including Q&A → ~25–30 minutes of content → 10–12 content slides max. `[INFERRED — confirm]`
- **One-sentence takeaway:** *"In Q3 we moved [retention metric] by [X], and the Q4 plan turns that into [Y outcome the VP cares about] — here's what we need from you to do it."* **The user must fill this in. Do not move forward without it — a wrong takeaway is worse than a missing one (Phase 1 rule).**

## Narrative spine
**Update spine** (Headline → What changed → What it means → What's next). The original used Update implicitly but front-loaded ceremony (Intro / Team / Agenda / Customer Overview = 4 slides) before the headline. Move the headline to slide 1 of body.

## Opening hook (first 30 seconds)
A single number, full-screen: *"D90 retention on your power-user cohort moved from 22% to 41% this quarter."* Then: *"That's the headline. The rest of this deck is what got us there, what didn't work, and what Q4 looks like."*

## STAR moment
The retention jump on the power-user cohort, delivered as the opening hook (combined). One number, full-screen, said once.

## Main flow (10 slides)

1. **D90 retention on your power-user cohort moved from 22% to 41% in Q3** — text-only, big-number layout
2. **Three things drove the Q3 result: [X], [Y], [Z]** — replaces 8 generic slides
3. **[Single chart slide — the trend that tells the story]** — line chart, single highlight color
4. **"[Customer quote, verbatim, attributed]"** — contrast slide after data
5. **What didn't work in Q3: [specific challenge], and what it cost** — tradeoff slide (replaces 3 generic Challenge slides)
6. **Q4 plan: one outcome, three workstreams, one date** — replaces 4 generic Roadmap slides
7. **What we need from you to hit the Q4 number** — the specific ask (was buried at slide 25 in the original)
8. **If Q4 underperforms: here's what triggers a course-correction, and when** — rollback slide (was missing entirely)
9. **Credits — the Q3 wins, by name** — Phase 1a specific human credit
10. **[The one-sentence takeaway, full screen]** — close

## What I cut (28 → 10)

| Cut from original | Why |
|---|---|
| 1. Introduction | Audience knows you. Cut-on-sight. |
| 2. About Our Team | Same. Cut-on-sight. |
| 3. Q3 Agenda | Agenda slide on a deck <15 slides. Cut-on-sight per Phase 4. |
| 4. Customer Overview | Reciting the customer's own business back to them is the most generic slide possible. |
| 5. What We Did Last Quarter | Topic title, no message. Replaced by slide 1. |
| 6. Our Approach | "Approach" is a topic noun. |
| 7. Key Themes | "Key themes" is a forbidden-phrase reflex. |
| 8–10. Theme 1/2/3 | Three category slides with no message each. Synthesized into slide 2. |
| 11–13. Engagement / Adoption / Retention Metrics | Three near-identical metric slides → one chart on slide 3 + detail in B2. |
| 14. Customer Quote | Kept and promoted to slide 4. |
| 15. Wins | Pure section divider. Cut-on-sight. |
| 16–18. Win 1 / 2 / 3 | Subsumed into slide 2 and slide 9. Three parallel "win" slides is the AI-slop tell. |
| 19. Challenges | Section divider. Cut. |
| 20–21. Challenge 1 / 2 | Collapsed to slide 5. Honest beats comprehensive. |
| 22–24. Roadmap / Q4 Plan / Q4 Initiatives | Subsumed into slide 6. |
| 25. Resource Asks | Promoted to slide 7 with specificity. |
| 26. Timeline | Subsumed into slide 6. |
| 27. Summary | Summarizing what you just said is what speakers do, not slides. |
| 28. Thank You & Questions | Cut-on-sight per Phase 4. |

**Net: 28 → 10 main + 6 backup. 18 slides cut.**

## What changed and why (existing-draft summary)

1. **The deck had no ask.** "Resource Asks" at slide 25 was a placeholder. Promoted and made specific (slide 7).
2. **The deck had no headline.** Opened with 4 slides of ceremony before the audience learned anything. Moved strongest result to slide 1.
3. **The deck had no tradeoff and no rollback.** For a renewal decision with skeptics, those are credibility-buying slides. Added (slides 5 and 8).
4. **The deck surveyed instead of arguing.** "Theme 1 / Theme 2 / Theme 3 / Metric 1 / Metric 2 / Metric 3 / Win 1 / Win 2 / Win 3" is the textbook generic-deck shape — exactly what your manager flagged.
5. **The deck buried specific people.** Generic "Wins" slides → named contributors on slide 9.
6. **Closer was wasted.** "Thank You & Questions" replaced with the takeaway full-screen.

## Pressure-test log [size: Standard]

**Role adopted:** VP of Operations on the customer side. Priors: has been pitched by 4 vendors in the last 12 months; one delivered great Q1/Q2 numbers and then plateaued, costing her credibility internally. Pattern-matches hard against "three themes" decks, dashboards-as-storytelling, and roadmaps without owners. Will renew if she can defend it to her CFO in two sentences.

**Top critiques (in her voice):**

1. *Slide 1, the 41% number:* "Cohort of how many users? If it's 30 power users out of our 4,000 active, I don't care."
2. *Slide 2, three drivers:* "Which one moved the number the most? Don't tell me they all contributed equally — that's never true. Rank them."
3. *Slide 3, the chart:* "Is there a control group? Otherwise this is correlation."
4. *Slide 5, what didn't work:* "Is this the worst thing that happened, or the safest one to admit? My directors will tell me afterward if you skipped the real one."
5. *Slide 6, Q4 plan:* "You shipped 3 things in Q3. Now you're proposing 3 workstreams for Q4. Why should I believe the throughput?"
6. *Slide 7, the ask:* "What's the dollar value? And what happens to the Q4 outcome if we say no to one of the three?"
7. *Slide 8, rollback:* "If the trigger trips in October, do we get a credit, an out-clause, or just a meeting?"

**Classification + fixes:**
- **Fatal — #1:** Require cohort-size footer and same-cohort Q2 baseline.
- **Fatal — #6:** Slide 7 must list dollar/hour cost per ask + outcome impact of dropping each.
- **Credibility — #2:** Three drivers ranked by contribution.
- **Credibility — #4:** Pick the actual worst miss, not the most palatable one.
- **Credibility — #7:** Slide 8 must name what the trigger gets her.
- **Minor — #3:** Pushed to backup B1 (methodology).
- **Minor — #5:** Speaker notes for slide 6 — name what's the same and different about Q4 capacity.

**Final scan:** Titles read top-to-bottom = "Retention jumped → here's what drove it → here's the trend → here's the customer in their own words → here's what didn't work → here's the Q4 plan → here's what we need from you → here's the rollback → here are the people → [takeaway]." Coherent. Pass.
