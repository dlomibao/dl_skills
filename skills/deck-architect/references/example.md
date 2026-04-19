# Worked example — brief to outline

A short end-to-end illustration. Compressed for length; a real run would be more detailed.

## User input

> "Help me make a deck for next week's eng leadership meeting. We just finished migrating our analytics warehouse from Redshift to Snowflake. I want them to approve doing the same for the prod data warehouse next quarter."

## Phase 0 — Audience Model (Claude asks; user replies inline)

> Q: Who's in the room?
> A: VP Eng (decision-maker), 2 staff engineers (one championed Snowflake, one is skeptical), the CFO will be on the call.
>
> Q: What do they care about?
> A: VP Eng — risk and rollout time. CFO — TCO over 3 years. Skeptical staff eng — query performance regressions and lock-in.
>
> Q: What do they already know?
> A: They know we did the analytics migration. They don't know the actual cost numbers or the full incident log.
>
> Q: Transformation?
> A: From "skeptical the migration is worth the disruption for prod" → "convinced enough to greenlight a Q3 start."
>
> Q: Objections?
> A: (1) Snowflake costs more long-term. (2) What if a critical query regresses. (3) What's the rollback if we're 6 weeks in. (4) Why now vs. waiting another year.

## Phase 1 — Brief

- Decision: approve a Q3 start for prod warehouse migration; ask is for $180K budget + 2 staff eng FTEs
- Format & time: 25 min live + Q&A
- Constraints: no template, ~12 slides max
- Takeaway: **"The analytics migration de-risked the prod migration enough that delaying costs more than starting now."**
- Team: Priya led caching, Marcus owned the cost model, Jenna ran the runbook

## Phase 2 — Spine

**SCQA + Pyramid.** This is a recommendation deck for a decision-maker with two skeptics in the room — the answer-up-front structure forces the recommendation to slide 1 of the body and pre-empts "where is this going."

## Phase 9 output (compressed)

```
# Migrating Prod Warehouse to Snowflake — Q3 Start

## Audience Model
- Who: VP Eng (decision), 2 staff eng (1 champion, 1 skeptic), CFO
- Care about: VP — risk/timeline; CFO — 3yr TCO; skeptic — perf + lock-in
- Know/believe: aware analytics migration happened; don't know real cost or incident log
- Transformation: skeptical → greenlight Q3 start
- Objections: TCO; query regressions; rollback path; why now

## Brief
- Ask: approve Q3 start, $180K + 2 FTEs
- Time: 25 min live + Q&A
- Constraints: ~12 slides, no template
- Takeaway: The analytics migration de-risked prod enough that delaying costs more than starting now.
- Contributors: Priya (caching), Marcus (cost model), Jenna (runbook)

## Spine
SCQA + Pyramid — answer-up-front to pre-empt skeptics with two competing concerns.

## Opening hook (first 30s)
"Three months ago we cut analytics query p99 from 8s to 1.2s and dropped warehouse spend 18%. Today we're asking to do the same for prod — and the rollback we built means we can stop at any of three checkpoints."  (Combines hook + STAR moment.)

## STAR moment
Same as hook — the 8s→1.2s + 18% spend cut is the unforgettable specific. Lives on slide 2.

## Main flow
1. **Approve a Q3 start for prod migration; here's why the risk is lower than it looks**
   - Purpose: the answer, up front
   - On-slide: the ask, in 1 sentence + 3 supporting headlines
   - Speaker notes: name the three pillars verbally; signal that rollback path is slide 6
   - Load: balanced
   - Visual: text-only

2. **Analytics migration cut p99 from 8s to 1.2s and trimmed spend 18%**
   - Purpose: anchor credibility with the specific outcome
   - On-slide: two big numbers, one-line caption
   - Speaker notes: Priya's caching layer was the key technical move; tell the "we hit it without a single rollback" story
   - Load: speaker-heavy
   - Visual: two-number layout, no chart needed

3. **TCO over 3 years: Snowflake is 8% more on current volume, breakeven at 22% growth**
   - Purpose: address CFO's #1 concern head-on, with direction named
   - On-slide: chart + insight title
   - Speaker notes: walk through the assumptions Marcus used; flag where the model is sensitive
   - Load: balanced
   - Visual: line chart, current volume vs. growth scenarios, one highlighted line, axes labeled

4. **What we're giving up: tighter coupling to one vendor; here's how we handle it**
   - Purpose: the tradeoff, on its own slide (don't bury it)
   - On-slide: the loss + 2-line mitigation (open table format, dbt for portability)
   - Speaker notes: acknowledge skeptic's lock-in concern by name
   - Load: balanced
   - Visual: text-only

5. **Three rollback checkpoints, each fully reversible until month 4**
   - Purpose: rollback in main flow because this is a decision deck (Phase 3d)
   - On-slide: timeline with the three checkpoints + one "irreversible after" marker
   - Speaker notes: Jenna built the runbook; specific trigger conditions for each halt
   - Load: slide-heavy
   - Visual: timeline diagram, 5 nodes (start → cp1 → cp2 → cp3 → cutover), irreversible point marked

6. **Delaying a year costs more than starting now: $260K in continued Redshift growth + 2 quarters of feature debt**
   - Purpose: address "why now"
   - On-slide: two-bar comparison: cost-of-action vs. cost-of-delay
   - Speaker notes: name the specific features that are blocked
   - Load: balanced
   - Visual: bar chart, side-by-side, single highlight color on cost-of-delay

7. **Approve $180K + 2 FTE for a Q3 start; first checkpoint is week 4**
   - Purpose: close on the takeaway / specific ask
   - On-slide: the ask, the date of the first checkpoint, takeaway sentence
   - Speaker notes: thank Priya, Marcus, Jenna by name
   - Load: balanced
   - Visual: text-only

## Backup layer (5 slides)
B1. **Query regression methodology** — triggered by skeptic asking "how do we know prod queries won't regress" — L3
   - Content: the 50 most-run prod queries, benchmark methodology, how analytics performed against same suite
   - Visual: comparison table

B2. **Snowflake cost model assumptions and sensitivities** — triggered by CFO pushing on the 8% number — L2
   - Content: assumptions log + 3 scenarios (low/expected/high growth)
   - Visual: scenario table

B3. **Detailed rollback runbook** — triggered by VP Eng pushing on rollback specifics — L3
   - Content: per-checkpoint trigger conditions, owner, recovery time, data-integrity guarantee
   - Visual: swim-lane diagram

B4. **Lock-in mitigation — open table format details** — triggered by skeptic pushing on lock-in — L2
   - Content: Iceberg adoption plan, dbt portability, exit-cost estimate
   - Visual: text-only

B5. **What we'd do differently vs. analytics migration** — triggered by anyone asking what went wrong last time — L2
   - Content: 3 lessons + how each is built into the prod plan
   - Visual: text-only

## Visual consistency notes
- One highlight color across all chart slides (use brand-primary blue)
- Timeline and swim-lane share the same node-shape vocabulary

## What I cut (and why)
- Agenda slide — 7 slides doesn't need one
- "About the team" intro — VP Eng knows the team; wastes opening real estate
- Industry-trend slide on cloud warehouses — they know; would feel like padding
- Detailed Snowflake feature comparison — belongs in B-layer if asked, not main flow
- "Thank you" closer — replaced with the ask + takeaway

## Handoff notes
- For pptx/design: slide 5 (timeline) and B3 (swim-lane) need design attention; rest is text-and-charts
- Credits slide: not a separate slide — names baked into speaker notes for slides 2, 3, 5, 7

## Pressure-test log [size: Standard]
- Role adopted: the skeptical staff engineer who's been through one bad migration and now defaults to "wait another year"
- Top critiques:
  1. "Slide 2 says 'no rollback events' — does that mean zero incidents, or zero rollbacks of incidents that did happen?" → Slide 2 speaker notes now distinguish.
  2. "Slide 3 says 8% more — annually? over 5 years? at what volume?" → Slide title now reads "8% more on current volume" and 3-year framing is in the chart.
  3. "Slide 5 — what's the actual trigger for halting at checkpoint 2? 'If things go wrong' isn't a trigger." → On-slide bullets now name specific testable trigger conditions.
  4. "Slide 6 — the $260K — is that incremental Redshift cost or total? And does it count the FTE time we'd save by waiting?" → Speaker notes now break out the components and explicitly net out FTE.
  5. "Why isn't the analytics migration's actual incident log on a slide? You're asking me to trust your summary." → Added to B5 (incident log + lessons), referenced in slide 2 speaker notes.
- Live-meeting prep: rehearse the slide-2 story; have B5 one click away.
```

## What this example shows

- The audience model is short but specific — names of skeptics, their actual concerns
- The takeaway is a real sentence with a verb and a claim, not a topic
- Hook and STAR collapse into one — no manufactured second peak
- Tradeoff slide exists (slide 4) and rollback is in main flow (slide 5)
- Pressure-test critiques are quoted, not summarized
- "What I cut" shows the discipline applied
