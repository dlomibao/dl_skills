# Slide craft — titles, openings, contrast, tradeoff, rollback

## Slide-title rules

The title is the message of the slide, stated as a full sentence. If the audience reads only the slide titles top-to-bottom, they should get the whole argument. That is the test.

| DO | DO NOT |
|---|---|
| "Our migration cut p99 latency by 42% with no rollback events" | "Migration Results" |
| "The TAM has tripled in 18 months, driven by three buyer shifts" | "Market Overview" |
| "Activation dropped 12% after the March pricing change" | "Activation Rate Over Time" |
| "Three fixes cost us $40K and saved $2M in Q3" | "Cost Savings" |
| Full sentence with subject, verb, specific claim | Noun, category, or section label |
| Title carries the insight even if the chart doesn't load | Title describes what the chart is |

## Cover slide composition

The cover is the one slide the audience reads *without* the presenter's voice. It must stand alone and unify in one breath. A split title — kicker + headline + subtitle each in a different register — reads as three fragments, not one deck.

**The rule:** one primary title. Optionally one short supporting line. Nothing else that the eye tries to connect as narrative.

| DO | DO NOT |
|---|---|
| One display title that names the deck. Optionally one sub-line of context (≤12 words, same voice). | Kicker eyebrow + display title + subtitle where each is a different sentence fragment |
| Title that reads as a complete thought, not a continuation | Title that starts with "And", "Plus", "Or" as if continuing the kicker |
| Supporting line answers "what kind of deck is this?" (audience, format) | Supporting line introduces a *second* argument the deck will make |
| Metadata (time, setting, author) in a true meta row — clearly not title | Metadata typographically competing with the title |

**The test:** read the cover aloud as one sentence. Does it sound like one thing, or three? "*The two skills everyone is copying — and the four moves that actually make them work*" is one thing if rendered on **one visual line**, but if the "kicker" and "headline" render as two separated blocks, the eye reads them as independent — and the cover has failed.

When the outline specifies a cover, write the full intended title as one string. If you also want a subtitle, write it as one string, on its own field, explicitly marked. Do not emit three separate "kicker / headline / subtitle" fields and expect the renderer to unify them — it won't.

**Handoff to HTML:** the cover's `data-role="cover"` section should render a single `<h1>` (the title) and at most one `<p class="subtitle">`. Any additional kicker-like content belongs in the meta row, styled as metadata — not as a title fragment.

## The opening — earn the first 30 seconds

The first slide is not "Title + presenter name." The opening must do three things in ~30 seconds: pattern-interrupt, anchor to what the audience cares about, promise what they'll get.

| DO | DO NOT |
|---|---|
| Open with a surprising statistic the audience will want explained | Open with "Hi, I'm [name] from [team]" |
| Open with a provocative question ("What if we could ship this in 30 days?") | Open with an agenda slide |
| Open with vivid contrast between current and future state | Open with "About Us" / "22 offices, 10,000 employees" |
| Open with a short specific story or 10-second customer quote | Open with company-history timeline |
| Open with a bold promise of what they'll walk away with | Open with "Let me walk you through today's topics..." |
| Make the audience the subject ("you," "your customers," "the team") | Make the presenter or company the subject of every early slide |

## STAR moment

Something They'll Always Remember. Every deck needs at least one: a shocking statistic, a memorable dramatization or prop, a repeatable soundbite, a vivid visual, or a piece of emotive storytelling. This is what the audience quotes to others afterward.

The opening hook and the STAR moment can be the same thing — if the hook is genuinely unforgettable, it IS the STAR moment and you don't need to manufacture a second peak. Note when they're combined so the user doesn't feel obligated to invent a separate one.

If the deck has no candidate STAR moment, push back on the user.

## Build contrast into the flow

The narrative should oscillate between "what is" and "what could be" (or problem/solution, risk/reward, status-quo/vision). Flat monotone decks lose attention.

| DO | DO NOT |
|---|---|
| Alternate problem slides with solution slides | Stack four problem slides then four solution slides |
| Juxtapose current pain against future state on adjacent slides | Walk through status-quo for 10 slides before showing the alternative |
| Use a quiet slide after a data-heavy one to let it land | Stack five dense data slides in a row |
| Break the rhythm with a question, a quote, or a single vivid image | Keep "title + 3 bullets" for every slide |

## Close on the takeaway, not on "Thank you"

The last slide is the most remembered after the first.

| DO | DO NOT |
|---|---|
| Close on the one-sentence takeaway, full screen | Close on "Thank you" |
| Circle back to the hook (if it was a question, answer it) | Close on "Questions?" (say verbally; keep takeaway on screen) |
| Close on the specific ask ("Approve $60K for the 6-week activation sprint") | Close on a generic "Next steps" bullet list |
| Leave the takeaway on screen during Q&A | Replace the takeaway with a "Thanks!" slide during Q&A |

## The slide / speaker split

A deck is not a document. The slide is a *visual anchor*; the presenter's voice is the narrative.

**The rule:** if the slide contains a phrase, the presenter should not read that phrase aloud. On-slide text and spoken content should complement, not duplicate. The slide holds the anchor (a number, a phrase, a chart, a question). The presenter holds the story, the nuance, the example, the "why this matters."

Patterns that work:

- **Big number slide** (on-slide: "42%") + speaker notes carrying context ("42% is the p99 latency reduction after Priya's caching rewrite — and we hit it without a single rollback, which nobody thought possible six months ago.")
- **Chart with insight-title** + speaker notes explaining what the audience is seeing ("The green bar overtakes the legacy cohort in month three — payback is faster than we modeled.")
- **Single question slide** ("What if we could ship this in 30 days?") + speaker notes setting up what comes next
- **Quote slide** + speaker notes on who said it, when, and why it matters

When a slide is **speaker-heavy**, flag it — the presenter needs to actually rehearse what they'll say. Powerful (forces attention to the speaker) but dangerous (falls apart if the presenter goes blank).

Speaker notes also carry: individual contributor credit (say names out loud), caveats and nuance, the specific anecdote that makes the number feel real, transitional bridges, "by the way" context that would clutter the slide.

## Show the tradeoff. Honestly.

Every persuasion deck has a trust dimension. The presenter gains credibility by naming the downside — and loses it when the deck reads like a sales pitch with only upside. A skeptical exec reading an all-upside deck assumes you're hiding something and hunts for it. You save time by naming the tradeoff yourself.

Either: (a) a dedicated "What we're giving up, and why it's worth it" slide, or (b) an explicit on-slide tradeoff bullet on one of the existing body slides. Don't bury this in speaker notes.

| DO | DO NOT |
|---|---|
| "We'll lose [specific capability X]. Here's how we handle it." | "This has no meaningful drawbacks" |
| "The first 6 weeks will be slower for everyone — here's why that's worth it" | Omit any mention of cost, disruption, or loss |
| Name the specific thing the audience will worry about before they do | Pretend the alternative had no advantages |
| Acknowledge the strongest counter-argument in one sentence, then address it | Strawman the alternatives ("the status quo is obviously broken") |

If the deck genuinely has no meaningful tradeoff, say so and back it: "There is no material capability we lose — the one gap is [X], which we handle by [Y]" is credible. "This is a slam dunk" is not.

## Rollback / "what if we're wrong" — main flow for decision decks

If the deck asks the audience to approve something with real consequences (migration, launch, hire, major investment, policy change), "what if it doesn't work" is load-bearing content, not a backup slide. It's what lets the audience say yes. Burying it signals the presenter hopes nobody asks.

| DO | DO NOT |
|---|---|
| Main-flow slide on rollback triggers, owners, recovery path | Put rollback only in backup |
| Name specific reversible checkpoints ("if phase 2 fails on workload X, we halt; on-prem remains source of truth until month 4") | Wave at it with "we have a rollback plan" |
| State the one irreversible moment and when it happens | Leave the audience guessing what "acceptance" or "cutover" means |
| Describe the failure trigger in one testable sentence | Describe failure abstractly ("if things go wrong...") |

For non-decision decks (status updates, informational briefings, retros), rollback doesn't apply — skip this. Judgment based on whether the deck is asking for a commitment.
