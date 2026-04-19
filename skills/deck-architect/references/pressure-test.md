# Pressure test — methodology

The other phases optimize for building a good argument. The pressure test optimizes for surviving a careful listener. They are different skills. A deck can have a strong structure and still fall apart under one pointed question from the person in the room most disposed to push back.

## Step-by-step

**1. Pick the hardest sell** from the Audience Model. If multiple skeptics push on different things (cost + technical + role-affected), run separate passes. Most decks need one; high-stakes need two or three.

**2. Adopt the role explicitly.** State it in the response: "Pressure-testing from the perspective of: [the CFO who's been burned on cloud cost overruns and has 11 years in the seat]." Name priors, incentives, pattern-match history. The more specific, the harder they push.

**3. Walk the deck slide-by-slide in their voice** — not Claude's. For each slide:

- What's the sharpest question they'd ask?
- Which claim is under-specified? ("Same cost" — same as what? "3x faster" — on which queries, picked how?)
- What would they assume the worst case is if you don't specify?
- What would their pattern-match be from prior decks they've killed?
- Where would they sense the presenter is selling rather than explaining?
- Where is the deck asking them to trust a presenter-dependent claim ("I talked to Marcus and we're aligned") they can't verify in the room?

**Quote, don't summarize.** "The TCO slide is hand-wavy" is useless. "Which direction is the 8% gap, and over 5 years not 1?" is useful.

**4. Classify each critique:**

- **Fatal** — if it lands, the ask dies. Fix before presenting.
- **Credibility** — if it lands, the presenter loses trust for the rest of the deck. Fix before presenting.
- **Minor** — a nit. Note for the presenter; don't re-architect. Likely → backup layer.

**5. Apply the fixes.** Common patterns:

- Under-specified quantitative claim → add the qualifier in the slide title itself ("3x faster on the 10 most-run queries" not "3x faster")
- Presenter-dependent trust claim → get the named person to co-present or remove the claim
- Hand-wavy direction → name it and own it ("Snowflake is 8% more expensive annually on current volume; the hardware refresh offsets 4 years of that gap")
- Missing tradeoff acknowledgment → add the "what we're giving up" content
- Rollback buried in backup → promote to main flow

**6. Show your work** in the Pressure-test log (Phase 9 output). The role(s) adopted, top critiques surfaced, what changed. Two purposes: lets the user see what the discipline caught, and gives the presenter a head start on anticipating those questions live.

## Sizing

| Size | Stakes signal | Passes | Coverage | Critiques |
|---|---|---|---|---|
| **Micro** | No decision asked; small/reversible/friendly | 1 | Hook + headline + close | 2–3 |
| **Standard** | Recommendation/proposal with at least one skeptic; ask involving money/people/commitment | 1 from hardest sell | Every main-flow slide + hook + close | 5–8 |
| **Extended** | Irreversible decision, reorg, major investment, migration, launch, board, regulator-facing, async-read deck | Multiple from distinct skeptics | Every slide including backup | 8+ |

When in doubt, run Standard. Cost of too-large is minutes; too-small is torched meetings.

## Rationalizations for skipping

| Excuse | Reality |
|---|---|
| "The deck is tight, it'll hold up" | That's what every presenter has thought before getting torched. 10 minutes here saves a meeting. |
| "I don't know the hardest sell well enough to role-play" | Use the audience model from Phase 0. If too thin for this, it was too thin for the deck. |
| "The user can pressure-test it themselves" | They won't. Presenters are too close to their own deck. |
| "There's no hostile audience in this meeting" | There is always at least one person whose default is skepticism. |
| "This is just an internal status update" | Low-stakes means smaller pressure test, not no pressure test. One pass, one skeptic, a paragraph. |

**The pressure test always runs. What scales is its size.**
