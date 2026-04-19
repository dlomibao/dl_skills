# Pressure test — methodology and rationalizations

The step-by-step (1–7) and the Sizing matrix live in `SKILL.md` Phase 6 — used every run, kept inline. This file covers the *why* and the rationalizations to refuse.

## Why this phase exists

The other phases optimize for building a good argument. The pressure test optimizes for surviving a careful listener. Those are different skills. A deck can have a strong structure and still fall apart under one pointed question from the person in the room most disposed to push back. The pressure test simulates that person before the presenter faces them live.

## Common fix patterns (reference for Step 6)

- **Under-specified quantitative claim** → add the qualifier in the slide title itself: "3x faster on the 10 most-run queries" not "3x faster"
- **Presenter-dependent trust claim** ("I talked to Marcus and we're aligned") → either get the named person to co-present, or remove the claim
- **Hand-wavy direction** → name it and own it: "Snowflake is 8% more expensive annually on current volume; the hardware refresh offsets 4 years of that gap"
- **Missing tradeoff acknowledgment** → add the "what we're giving up" content (Phase 3c)
- **Rollback buried in backup** → promote to main flow (Phase 3d)
- **Passive sales-y phrasing** ("we are excited to") → cut, replace with the specific action verb

## Rationalizations for skipping

| Excuse | Reality |
|---|---|
| "The deck is tight, it'll hold up" | That's what every presenter has thought before getting torched. 10 minutes here saves a meeting. |
| "I don't know the hardest sell well enough to role-play" | Use the Audience Model from Phase 0. If too thin for this, it was too thin for the deck. |
| "The user can pressure-test it themselves" | They won't. Presenters are too close to their own deck. |
| "There's no hostile audience in this meeting" | There is always at least one person whose default is skepticism. |
| "This is just an internal status update" | Low-stakes means smaller pressure test (Micro), not no pressure test. One pass, one skeptic, a paragraph. |

**The pressure test always runs. What scales is its size.**

## Final scan rationalizations

| Excuse | Reality |
|---|---|
| "The pressure test caught everything important" | The pressure test focused on the skeptic's concerns. Slop on untouched slides is a different failure mode. |
| "I already ran the AI Slop Test in Phase 4" | Phase 4 ran before the pressure-test fixes. New content from those fixes wasn't scanned. |
| "Fixes were small, unlikely to introduce slop" | Small fixes are the most likely place for slop because they're written under mild time pressure after the hard work is done. |
