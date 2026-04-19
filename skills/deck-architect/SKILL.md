---
name: deck-architect
description: Use when the user is building, outlining, or revising a slide deck, presentation, talk, pitch, board update, or briefing — any time someone needs to decide what to say, in what order, and what to cut. Use when a draft feels too long, too generic, doesn't land, or sounds AI-generated. Use when someone says "help me make a deck about X" — structure is where decks fail. Do NOT use when the user only wants visual polish on already-finalized content.
---

# Deck Architect

This skill handles the part of deck-building that AI agents are notoriously bad at: **content and structure**. Not visuals. The job is to produce a deck outline that tells a sharp story, lands its points, and earns every slide — then hand off to a visual-design skill (like `pptx`) for rendering if needed.

## The Iron Law

**NO SLIDES WITHOUT AUDIENCE, TAKEAWAY, AND SPINE FIRST.**

Applies to new decks AND edits. Draft slides before these three are locked? Delete them. Start over.

**No exceptions:**
- Not for "just a quick deck"
- Not for "the audience is obvious"
- Not for "we can figure out the takeaway later"
- Not for "the user said just make slides"
- Don't sketch slides as "reference" while gathering the brief
- Don't compromise by producing both at once

The brief is the source of the slides, not a document that gets written in parallel. Violating the letter of this rule is violating the spirit of it. A deck built without an audience model and a one-sentence takeaway is a document of facts, not a presentation that lands.

## The AI Slop Test

Before finalizing any outline, ask: **If someone said "Claude wrote this deck," would it be obvious?**

If yes, the deck has AI-generated tells and needs specifics, a sharper point of view, or structural cuts. The `does this sound AI-generated?` pass in Phase 4 exists to catch and fix this before the user sees it.

A deck that passes the test has:
- Slide titles that are full-sentence messages, specific to this project
- At least one concrete detail on every substantive slide (a name, a number, a date, a specific artifact)
- A visible point of view — the deck argues something, not just "covers the topic"
- Nothing that could be copy-pasted to a different company with the nouns swapped

## Rationalizations for skipping the brief

Agents under pressure find loopholes. The user will say things that make it tempting to skip Phase 0. Don't.

| Excuse | Reality |
|--------|---------|
| "User said 'just make the slides'" | Users always say that. The 2 minutes on audience and takeaway save 45 minutes of rework. |
| "The audience is obvious" | If obvious, stating it in one line costs nothing. If you can't state it in one line, it wasn't obvious. |
| "I can infer from the context" | You can infer the topic. You cannot infer the decision, the skeptic in the room, or the transformation. |
| "It's just a small internal deck" | Small decks fail the same way big ones do. The brief is shorter for small decks, not absent. |
| "They're in a hurry" | In a hurry = even more reason to land the message on the first try. |
| "I have most of the info already" | "Most" is the word you use before you realize you were missing the one thing that mattered. |
| "I'll add the takeaway after I see the content" | Backwards. The takeaway determines which content survives. |
| "The user will correct me if I'm off" | Users rarely push back on a generated deck — they quietly stop using it. |

**All of these mean: ask the brief questions. No exceptions.**

## Red Flags — STOP and go back to the brief

If any of these are true while drafting, you skipped or under-cooked Phase 0/1:

- I'm drafting slides and I can't state the one-sentence takeaway
- I've written a slide title that could apply to any company/project
- I'm hedging ("this could potentially help drive...")
- The deck doesn't argue anything — it just "covers" a topic
- I don't know what the audience will push back on
- I'm about to write "Agenda" or "About Us" as slide 1
- I'm reaching for generic three-bullet structures because I don't have specifics
- I'm describing a visual as "a relevant image"
- The deck is all upside — I can't point to a single slide that acknowledges what's being given up
- It's a decision deck and rollback / "what if we're wrong" is only in backup
- I'm about to present the outline without having pressure-tested it
- I've applied pressure-test fixes and I'm about to present without re-reading the full deck
- A load-bearing claim doesn't specify direction ("roughly the same cost" — more or less?)
- The deck relies on a trust assertion the audience can't verify ("I talked to X and we're aligned")
- A slide title is a noun phrase ("Recent Milestones," "Background," "Results") — title should be a full-sentence message

**All of these mean: stop drafting. Go back to Phase 0, Phase 1, Phase 3's tradeoff/rollback requirements, Phase 6.5's pressure test, or Phase 6.75's final scan. Get the missing piece.**

## Why this skill exists

Most AI-generated decks fail the same way:

- They jump to slide generation and skip the strategy. 70% of presentation quality is strategy; AI inverts that to 5%.
- They don't model the audience. A CFO, a technical buyer, and a CEO need different framings of the same content — and are often in the same room.
- They make the presenter the hero instead of the audience. Decks open with "about us / 22 offices / 10,000 employees" instead of the audience's problem.
- They are comprehensive instead of persuasive — every feature, every benefit, every use case. Audiences remember nothing.
- They waste the first slide on pleasantries and the last on "Thank you," squandering the two most-remembered moments in the deck.
- Slide titles are weak nouns ("Background," "Results") instead of full-sentence messages. Chart slides title by metric, not by insight.
- They bury the recommendation at the end and go monotone in between — no contrast, no tension, no STAR moment the audience can quote afterward.
- Slide counts balloon — a 15-slide deck becomes 35, then 47. Execs give you 12 minutes.
- They have no backup layer, so the first technical or financial question ambushes the presenter.
- They flatten team effort into anonymous "we" statements, missing a free morale win and leaving contributors uncredited.
- They cram onto the slide what should be in the presenter's mouth — turning a talk into a document the audience reads while the presenter competes for attention.
- They write in the voice of nobody in particular: hedged qualifiers, three-bullet reflex, framework names without substance. Specifically: they read like an LLM.
- They pick wrong visuals or force them onto every slide — stock photos of smiling teams, pie charts with 12 slices, chart types that obscure the point.
- They are all-upside sales pitches. A deck that never acknowledges what's being given up reads as dishonest to a careful listener, and careful listeners are the people the deck needs to win over.
- They bury rollback and failure-mode thinking in the backup layer, if they have one at all — so the decision-maker can't say yes without asking "but what if it doesn't work?" and the presenter stumbles.
- They're never adversarially read before the meeting. The presenter is too close to their own deck to see the load-bearing claim that's actually hand-wavy, the quantitative comparison that doesn't specify direction, the trust assertion that nobody in the room can verify. Then they get torched live.
- They confuse **slide decks** (spoken support) with **slide docs** (read asynchronously) and fail at both.

This skill enforces discipline across all of those. It does not make things pretty. It makes them land.

## Operating principles

- **Audience first, always.** Who is in the room and what they care about determines everything else — the takeaway, the spine, which wins to surface, what belongs in main flow vs. backup. Phase 0 locks this before any other work begins.
- **The audience is the hero, not the presenter.** Frame the content as the audience's journey — their problem, their transformation, their decision. The presenter is the mentor, not the star. This is counterintuitive for "company update" style decks but makes them dramatically more engaging.
- **Strategy first, slides last.** Don't produce slide content until the audience model, brief, one-sentence takeaway, and narrative arc are locked. If the user pushes to "just make the slides," gently push back once — explain that skipping this is exactly why their other decks didn't land — then comply if they insist, but use whatever inference you can for the missing pieces and flag the gaps.
- **Pull for specifics, resist topics.** When the user gives only a topic ("make a deck about our Q3 results"), push for actual content — numbers, names, wins, surprises. Topics produce generic output; specifics produce decks that can only be yours.
- **Honesty is a persuasion tool.** Every persuasion deck earns trust by naming the tradeoff. All-upside decks read as sales pitches and lose the careful listeners first. Name what's being given up, on a slide, before the audience does.
- **Adversarial read before the live read.** A deck has to survive its sharpest reader, not just its author. Pressure-test the deck in the skeptic's voice before presenting it to the user — catch the load-bearing claims that are secretly hand-wavy, the trust assertions that aren't verifiable, and the quantitative comparisons that don't specify direction.
- **Contrast creates attention.** Alternate between "what is" and "what could be," problem and solution, current state and future state. Monotone = forgotten.
- **Progressive disclosure by default.** Every deck gets a main flow tuned for the audience AND a backup layer ready for deep-dive questions. The presenter should never be caught flat-footed when a technical C-level interrupts.
- **Credit humans specifically.** When a team effort is involved, tie real names to real wins. Vague team praise is wasted — specific credit is morale gold.
- **Protect the opening and the close.** Primacy and recency effects are real — audiences remember the first and last slide disproportionately. Don't waste either on agenda, thanks, or filler.
- **Text-first on visuals.** Default every slide to text-only. Only spec a visual when the content genuinely earns one — data that has to be seen, a system/flow that words describe poorly, an opening hook or STAR moment that needs emotional punch, or a specific product/screenshot. Most decks need 0-2 public images total. Deciding *whether and what kind* of visual supports each slide is content work; colors, fonts, and pixel positions are layout and get handed off.

## The workflow

Follow these phases in order. Do not skip ahead. **Audience is Phase 0 for a reason — the answers there determine everything downstream** (which takeaway lands, which framework fits, which wins to surface, what goes in main flow vs. backup).

**If the user brings an existing draft** ("here's my 47-slide deck, help me fix it" or "I have this outline, can you make it land better"), don't start from scratch — but don't skip Phase 0 either. Run Phase 0 and Phase 1 to anchor audience and takeaway (use the existing draft to infer answers, confirm with the user), then use Phase 4 (discipline) as the main working mode: identify what to cut, what to merge, which slide titles are weak, what's missing (hook, STAR moment, backup layer), and what sounds AI-generated or generic. Output a revised outline in the same format — plus a clear "what changed and why" section.

### Phase 0 — Model the audience (lock this before anything else)

Knowing the audience isn't a brief item — it's the lens the entire deck refracts through. Before the rest of the brief, get specific about the room. Ask these five questions in one compact block:

1. **Who's in the room — specifically?** Names or roles. The CFO who's skeptical of growth spend vs. the VP Product who championed this project are different audiences, even in the same meeting. Who's the hardest sell? Who's the decision-maker? Who might interrupt with questions?
2. **What do they care about?** Not the topic — their incentives. ROI and risk (CFO), strategic fit and optics (CEO), technical rigor and tradeoffs (engineering leaders), personal career-impact (sometimes the real one). If you don't know, it's worth one honest sentence to say so and work from likely priorities.
3. **What do they already know/believe?** Skip what they know. Anticipate what they'll disagree with. The deck's job is to move them from current belief to new belief, not to educate them on things they already understand.
4. **What's the transformation?** Who are they when they walk in, and who do you want them to be when they leave? "Skeptical of the budget" → "Convinced this is the cheapest insurance we can buy." "Unaware of the risk" → "Pushing us to act by Friday." This framing is sharper than "decision" because it captures the emotional/mental shift the deck needs to create.
5. **What objections or deep-dive questions will they raise?** List 3-5 likely pushback questions or "wait, show me the data on X" moments. These feed directly into Phase 5 (backup layer) — you will build slides ready for each one.

Output of Phase 0: a short **Audience model block** at the top of your response. This gets referenced throughout — if a slide doesn't serve the audience model, it gets cut in Phase 4.

### Phase 1 — The rest of the Brief

Once audience is locked, nail down four more things in one block:

1. **The decision or action.** What do you want them to do, decide, approve, or remember after this presentation? If there isn't one, the deck has no purpose — flag this.
2. **Format & time.** Live presentation, async pre-read, or both? How many minutes? Live decks (spoken support) and slide docs (read artifacts) look different and can't share one file well.
3. **Constraints.** Hard slide count limit? Required sections (agenda, appendix, disclaimers)? Brand/template given?
4. **The one-sentence takeaway.** If the audience remembers only ONE sentence, what should it be? This must be shaped by Phase 0 — a CFO takeaway and a CTO takeaway for the same project look different. If the user can't state this, help them — but don't move on until it exists. This is the apex of the pyramid.

### Phase 1.5 — Detect team projects and handle credit

If the deck describes work done by multiple people (any mention of "we," "the team," "our engineers," named collaborators, cross-functional effort, or shipping of something non-trivial), assume it's a team effort and ask ONE confirmation question: *"Is this a team effort? If so, tell me who contributed to the key wins so I can make sure credit lands with the right people."*

When confirmed:
- **Tie specific wins to specific humans** in the slide content. Not "the team reduced latency" — "Priya rewrote the caching layer, cutting p99 latency 42%." This is morale gold and costs the presenter nothing.
- **Surface individual wins in speaker notes** even when the slide itself stays clean — the presenter can call out contributions verbally, which lands even harder than on-slide text.
- **Add a dedicated Credits slide near the end** (second-to-last, before the takeaway close) when the contributor list is meaningful. Short, specific, name-by-name. Vague "thanks to the team" gets cut.
- **Don't fabricate attributions.** If the user hasn't told you who did what, either ask or use neutral framing — never invent names or assign wins to people based on guesses.

### Phase 1.6 — Detect available assets (only when signaled)

If the user mentions existing assets, screenshots, charts, brand imagery, product photos, a design system, or a specific image they want used, ask ONE clarifying question about what's available and where to find it. Example: *"You mentioned the customer dashboard screenshot — can you share the file path or URL, and are there other existing visuals (architecture diagrams, brand images, product screenshots) I should plan around?"*

Do NOT ask about assets by default — it creates friction. Only ask when the user's own language signals assets exist. When no assets are mentioned, plan Phase 5 (visual aids) under the assumption that public/web imagery or newly-created visuals will be needed.

### Phase 2 — Pick the narrative spine

Choose ONE of these structures based on the situation. State which one and why before outlining.

**For executive / business / recommendation decks → SCQA + Pyramid (Minto)**
- Situation: uncontroversial current-state context the audience already accepts
- Complication: what changed, what's at stake, why now
- Question: the decision question that naturally follows
- Answer: the recommendation, stated directly — this is slide 1 of the body
- Then 2–4 supporting arguments, each with evidence
- Arguments must be MECE: Mutually Exclusive (no overlap) and Collectively Exhaustive (cover the territory). If two arguments restate the same point, collapse them.

**For technical talks / conference presentations → Hook → Problem → Insight → Evidence → Takeaway**
- Hook: a sharp problem statement, surprising stat, or vivid example
- Problem: define the pain, who it affects, why existing approaches fall short
- Insight/Approach: the core idea — a single technical claim, not a survey
- Evidence: the minimum proof needed (benchmarks, demos, case)
- Takeaway: what the audience should do or build differently on Monday
- Time budget: ~15% hook/intro, 60-70% body, 15-20% demo + close

**For pitch decks → Problem → Why Now → Solution → Why Us → Proof → Ask**
- Use this only when explicitly pitching for funding, a sale, or a decision to partner

**For update / status decks → Headline → What changed → What it means → What's next**
- Resist the urge to walk through every workstream. Headline first, details on tap.

If the user's situation doesn't fit these cleanly, pick the closest and adapt — but state the adaptation.

### Phase 3 — Draft the slide list (in text, not slides)

Produce a numbered list. For each slide:

- **Slide title** written as a full-sentence message (the "action title" — the point the slide is making), NOT a topic noun
- **One-line purpose** — why this slide exists; what it contributes to the argument
- **On-slide content** — what appears ON the slide itself (3-6 bullets max, or a chart spec, or a short sentence + visual)
- **Speaker notes** — what the presenter says that is NOT on the slide (see below; this is often the load-bearing content)
- **Load indicator** — mark each slide as **slide-heavy** (content carries itself, notes are minimal), **balanced** (slide + notes each carry part), or **speaker-heavy** (slide is sparse, presenter's narration does the work)

**The slide/speaker split is the craft.**

A deck is not a document. The slide is a *visual anchor* and the presenter's voice is the narrative. When a slide is cluttered with everything the presenter plans to say, the audience reads instead of listens — which is slower, more cognitively taxing, and kills engagement.

The rule: **if the slide contains a phrase, the presenter should not read that phrase aloud.** On-slide text and spoken content should complement each other, not duplicate. The slide holds the anchor — a number, a phrase, a chart, a question. The presenter holds the story, the nuance, the example, the "why this matters."

For every slide, decide what lives where. Some patterns that work:
- **Big number slide** (on-slide: "42%") + **speaker notes carrying context** ("42% is the p99 latency reduction after Priya's caching rewrite — and the real story is that we hit this without a single rollback, which nobody thought was possible six months ago.")
- **Chart with insight-title** (on-slide: the chart + insight headline) + **speaker notes explaining what the audience is seeing** ("The green bar is the new cohort — note it overtakes the legacy cohort in month three, which means payback happens faster than we modeled.")
- **Single question slide** (on-slide: "What if we could ship this in 30 days?") + **speaker notes setting up what comes next**
- **Quote slide** (on-slide: the quote) + **speaker notes on who said it, when, and why it matters**

When a slide is **speaker-heavy**, flag it — the presenter needs to actually rehearse what they'll say. Speaker-heavy slides are powerful (they force attention to the speaker) but dangerous (they fall apart if the presenter goes blank).

**Speaker notes also carry things that shouldn't be on any slide:** individual contributor credit (say names out loud), caveats and nuance, the specific anecdote that makes the number feel real, transitional bridges between slides, and the "by the way" context that would clutter the slide.

**Slide-title rules:**

The title is the message of the slide, stated as a full sentence. If the audience reads only the slide titles top-to-bottom, they should get the whole argument. That is the test.

| DO | DO NOT |
|----|--------|
| "Our migration cut p99 latency by 42% with no rollback events" | "Migration Results" |
| "The TAM has tripled in 18 months, driven by three buyer shifts" | "Market Overview" |
| "Activation dropped 12% after the March pricing change" (chart slide) | "Activation Rate Over Time" (chart slide) |
| "Three fixes cost us $40K and saved $2M in Q3" | "Cost Savings" |
| Full sentence with a subject, verb, and specific claim | A noun, a category, or a section label |
| Title carries the insight even if the chart doesn't load | Title describes what the chart is |

**The opening: earn the first 30 seconds.**

The first slide is not "Title + presenter name" — that's wasted real estate. The opening must do three things in ~30 seconds: pattern-interrupt (a sharp stat, question, vivid image, or contrast), anchor to what the audience cares about, and promise what they'll get.

| DO | DO NOT |
|----|--------|
| Open with a surprising statistic the audience will want explained | Open with "Hi, I'm [name] from [team]" |
| Open with a provocative question ("What if we could ship this in 30 days?") | Open with an agenda slide |
| Open with a vivid contrast between current and future state | Open with "About Us" / "22 offices, 10,000 employees" ("me-ness") |
| Open with a short specific story or a 10-second customer quote | Open with a company-history timeline |
| Open with a bold promise of what they'll walk away with | Open with "Let me walk you through today's topics..." |
| Make the audience the subject ("you," "your customers," "the team") | Make the presenter or company the subject of every early slide |

**Plant at least one STAR moment.**

STAR = "Something They'll Always Remember." Every deck needs at least one: a shocking statistic, a memorable dramatization or prop, a repeatable soundbite, a vivid visual, or a piece of emotive storytelling. This is what the audience quotes to others afterward. Identify where in the flow the STAR moment goes and flag it explicitly.

The opening hook and the STAR moment can be the same thing — if the hook is genuinely unforgettable (a provocative stat, a vivid prop), it IS the STAR moment and you don't need to manufacture a second peak. Note when they're combined so the user doesn't feel obligated to invent a separate moment.

If the deck has no candidate STAR moment at all, it's forgettable — push back on the user for one.

**Build contrast into the flow.**

The narrative should oscillate between "what is" and "what could be" (or problem/solution, risk/reward, status-quo/vision). Flat monotone decks lose attention. Adjacent slides shouldn't all land in the same emotional register.

| DO | DO NOT |
|----|--------|
| Alternate problem slides with solution slides | Stack four problem slides then four solution slides |
| Juxtapose current pain against future state on adjacent slides | Walk through status-quo for 10 slides before showing the alternative |
| Use a quiet slide after a data-heavy one to let it land | Stack five dense data slides in a row |
| Break the rhythm with a question, a quote, or a single vivid image | Keep the same slide structure (title + 3 bullets) for every slide |

**Close on the takeaway, not on "Thank you."**

The last slide is the most remembered after the first. Do not waste it.

| DO | DO NOT |
|----|--------|
| Close on the one-sentence takeaway, full screen | Close on "Thank you" |
| Close by circling back to the hook (if it was a question, answer it) | Close on "Questions?" (say that verbally; keep the takeaway on screen) |
| Close on the specific ask ("Approve $60K for the 6-week activation sprint") | Close on a generic "Next steps" bullet list |
| Leave the takeaway on screen during Q&A | Replace the takeaway with a "Thanks!" slide during Q&A |

**Show the tradeoff. Honestly.**

Every persuasion deck has a trust dimension. The presenter gains credibility by naming the downside — and loses it when the deck reads like a sales pitch with only upside. A skeptical exec reading an all-upside deck will assume you're hiding something, and will hunt for it. You save time by naming the tradeoff yourself.

Before Phase 4, add either (a) a dedicated "What we're giving up, and why it's worth it" slide, or (b) an explicit on-slide tradeoff bullet on one of the existing body slides. Don't bury this in speaker notes — the audience needs to see the honesty.

| DO | DO NOT |
|----|--------|
| "We'll lose \[specific capability X\]. Here's how we handle it." | "This has no meaningful drawbacks" |
| "The first 6 weeks will be slower for everyone — here's why that's worth it" | Omit any mention of cost, disruption, or loss |
| Name the specific thing the audience will worry about before they do | Pretend the alternative had no advantages |
| Acknowledge the strongest counter-argument in one sentence, then address it | Strawman the alternatives ("the status quo is obviously broken") |

If the deck genuinely has no meaningful tradeoff, say so and back it with one sentence on what the gaps are and how they're handled. "There is no material capability we lose — the one gap is \[X\], which we handle by \[Y\]" is credible. "This is a slam dunk" is not.

**Rollback / "what if we're wrong" belongs in main flow — for decision decks.**

If the deck is asking the audience to approve something with real consequences (a migration, a launch, a hire, a major investment, a policy change), the "what if it doesn't work" answer is load-bearing content, not a backup slide. It's what lets the audience say yes. Burying it in backup is a tell that the presenter hopes nobody asks.

| DO | DO NOT |
|----|--------|
| Include a main-flow slide on rollback triggers, owners, and recovery path | Put rollback only in backup |
| Name the specific, reversible checkpoints ("if phase 2 fails on workload X, we halt; on-prem remains source of truth until month 4") | Wave at rollback with "we have a rollback plan" |
| State the one irreversible moment and when it happens | Leave the audience guessing what "acceptance" or "cutover" means |
| Describe the failure trigger in one testable sentence | Describe failure abstractly ("if things go wrong...") |

For non-decision decks (status updates, informational briefings, retros), rollback doesn't apply — skip this requirement. Judgment based on whether the deck is asking for a commitment.

### Phase 4 — Enforce ruthless discipline

After drafting, do an explicit pass applying these rules. Show the user what was cut and why.

**Slide count ceilings** (hard defaults — push back if user exceeds without reason):
- Live exec update: 5-10 content slides
- Board deck: 10-15 content slides + appendix
- Conference talk (20 min): 15-20 slides, one idea per slide
- Pitch deck: 10 slides (YC) or ~10-12 (Sequoia-style)
- Executive pre-read (slide doc): no fixed limit, but each page is dense prose
- If content exceeds the ceiling, cut — don't shrink fonts. Move detail to appendix.

**Time reality-check.** Do the math on time-per-slide against the allotted minutes. Live decks average 1-2 minutes per content slide for a confident presenter; chart/data slides take 2-3; hook and close take more. If the slide count would require <45 seconds per slide to fit the time, something has to give: cut slides, shorten the segment, or move content to backup. State the math to the user ("20 slides in 15 minutes = 45 seconds per slide, which is too fast — recommend cutting to 12").

**One idea per slide.** If a slide has two messages, split or cut one. If two slides are making the same point differently, merge.

**Every slide must earn its place.** Apply the cut test to each slide: "If I deleted this slide, would the argument still hold?" If yes, delete it. "Nice to have" is the enemy.

**Kill filler.** Typical filler to delete on sight:
- Agenda slides on decks under 15 slides (just start)
- "About us" / team bios up front (move to end unless credibility is the point)
- "Thank you" / "Questions?" slides (waste of the last moment — end on the takeaway instead)
- Transition slides that just say "Section 2"
- Any slide that restates what's about to come

**Insight density per slide.** Each slide should deliver ONE sharp, specific, non-obvious point. Warning signs that a slide is empty calories:
- The title could apply to any company/project ("Our Approach")
- It lists categories without synthesis ("Three Themes")
- It shows data without a takeaway baked into the title

**The "does this sound AI-generated?" pass.** Read the outline back asking: would a sharp reader spot this as Claude output?

The model's natural failure mode is reaching for the same hedged, corporate-adjacent vocabulary on every deck. These phrases are training-data reflexes — they appear in AI-generated decks because they're statistically common in business writing, not because they communicate anything. Reject them on sight and rewrite with specifics.

**Reject-your-reflex phrase list — forbidden on sight:**

- "leverage" (as a verb — use "use")
- "drive alignment" / "drive results" / "drive value" / "drive impact"
- "unlock" / "unleash" / "harness"
- "strategic pillars" / "key themes" / "core tenets" / "guiding principles"
- "seamlessly" / "holistically" / "synergistically"
- "robust" / "scalable" / "best-in-class" / "world-class" / "industry-leading"
- "innovative" / "cutting-edge" / "next-generation" / "next-gen"
- "stakeholders" (when you mean specific named people or roles)
- "ecosystem" / "landscape" (when you just mean market or industry)
- "empower" / "enable" (when something more concrete works)
- "solution" (say what it actually is)
- "significant impact" / "substantial value" (give the number)
- "at the end of the day" / "at its core"
- "paradigm" / "paradigm shift"
- "game-changer" / "game-changing"
- "touch base" / "circle back" / "take this offline"
- "moving forward" / "going forward"
- "value-add" / "value proposition" (as filler, not as a specific claim)
- "North Star" / "table stakes" / "low-hanging fruit"
- "In today's fast-paced world..." (or any variant)
- "We are excited to..." / "We are thrilled to..."
- "Let me walk you through..."

These aren't bad because they're clichés — they're bad because they're *empty*. Every one of them can be replaced with a concrete noun or verb that carries information. "Drive alignment" → "get three execs to say yes." "Leverage our platform" → "use our existing data pipeline." "Significant impact on user retention" → "D30 retention moved from 22% to 41%." Specificity is what kills the AI-slop feel.

**Other AI-slop structural tells:**

- Textbook-definition language ("In today's fast-paced world...")
- Three equal-weight bullets under every header (audit whether the three points are actually parallel and distinct — if not, collapse or restructure)
- Generic framework names with no substance ("Our Strategic Pillars," "Key Themes")
- Hedged qualifier-heavy sentences ("could potentially help drive...")
- Content that would apply to any company/project with the nouns swapped out
- Placeholder phrases where specifics belong ("various stakeholders," "multiple initiatives")

If content hits these patterns, either pull more specific info from the user or rewrite with a sharper point of view.

**Audience fit check.** Re-read the outline through the audience's eyes. Cut anything they already know. Add what they'd push back on. For bad-news or sensitive content, think about framing — same data can be "revenue decline" or "strategic pivot to higher-margin segments." Reframing isn't spin; it's choosing which true story to lead with.

### Phase 5 — Spec the visual aids (only where they earn it)

Visual aid **selection** (what kind of visual supports this slide's point) is a content decision, not a layout decision, so it belongs here. Visual aid **rendering** (colors, fonts, pixel positions) is layout and gets handed off.

**Start from a default of text-only.** For every slide, the first question is "does this slide actually need a visual?" — not "what visual goes here?" A headline + a few words of text is often the strongest treatment, especially when the slide's point is a single number, a one-line insight, or a direct quote. Text with massive typography beats a generic stock image every time. Forcing a visual onto every slide is an AI anti-pattern and a leading cause of "AI slop" aesthetics.

**When a slide does earn a visual, it's usually one of these cases:**
- The argument depends on data the audience needs to see (→ chart)
- The content is a system, flow, or relationship that words describe poorly (→ diagram)
- The slide is the opening hook or STAR moment and needs emotional punch (→ image or dramatic visual)
- The point is about a specific product/interface/artifact (→ screenshot)

If none of those apply, mark the slide **text-only** and move on. Don't invent a reason to add a picture.

**For slides that do need a visual**, spec by mode:

**Chart / data visualization.** Full spec:
- **Chart type**, chosen to match the question:
  - Comparison across categories → bar chart (horizontal if labels are long or >5 categories)
  - Trend over time → line chart (2-5 lines max; if more, use small multiples)
  - Part-to-whole, few categories → stacked bar or donut (avoid pie charts with >4 slices)
  - Relationship between two numerics → scatter plot
  - Distribution → histogram
  - Sequential build to a total → waterfall
  - Geographic → map (color-coded with overlay labels if exact values matter)
  - Avoid: 3D charts, pie charts with many slices, dual-axis charts unless units genuinely differ
- **The data** (which numbers, from where, what time range)
- **Highlighting** — which series/bar/segment to emphasize; everything else neutral gray. One highlight color max.
- **Axes** — labels, units, range. State if zero-baselined or truncated (and why).
- **Annotations** — arrows, callout boxes, event markers ("pricing change, March 2026"), trend arrows with % change.
- **Title** — the insight, not the metric.

**Diagram / architecture / flow / concept.** Describe in enough detail to draw:
- Type (system architecture, process flow, org chart, decision tree, swim-lane, timeline, comparison matrix, 2x2 quadrant)
- Nodes/boxes with labels
- Connections, directions, groupings
- What to highlight as the focal point
- Note if a specific style applies (UML, C4, BPMN)

**Photograph / hero image / conceptual visual.** Most decks need 0-2 of these total, usually for the opening hook or a STAR moment — not for every third slide. When genuinely needed:
- **If the user signaled an existing asset** (Phase 1.6), reference it by name/path and note "use user-provided asset."
- **Otherwise, run `web_search` for 2-3 candidate images** with a specific query tied to the slide's message. Surface URLs with one line on which fits best. Example: "For the hook about infrastructure fragility, search: 'server rack on fire datacenter'; candidates: [url1] (strongest — conveys urgency), [url2], [url3]."
- **Always flag licensing risk** — user must verify reuse rights before publishing.
- Never fabricate URLs. If `web_search` isn't available, give specific search queries and describe what a good result looks like.
- If the image concept is generic ("handshake," "teamwork," "growth chart with arrow"), that's a signal the slide should be text-only instead. Stock-image clichés weaken a deck.

**Screenshot / product / UI.** If user-provided, reference it. Otherwise note "screenshot needed: [specific UI/screen/feature], captured at [state/condition]" so the user knows exactly what to grab.

**Visual consistency notes.** At the end of Phase 5, surface any cross-deck concerns: "Use one highlight color across all chart slides." "If icons appear, use one family throughout — don't mix sources."

### Phase 6 — Build the backup layer (progressive disclosure)

This is standard for high-stakes decks — board updates, investor pitches, exec recommendations, any presentation where a skeptical or technical attendee might interrupt with a deep-dive question. For those, always build a backup layer.

For low-stakes, short decks (a 5-minute internal status to a familiar team, a casual team update, a lightning talk), skip the backup layer — it's overhead without payoff. Use judgment based on the audience model: if Phase 0 identified real deep-dive triggers or skeptical stakeholders, build it; if not, skip it and note that you did.

**Where the backup questions come from:** the 3-5 objections/deep-dive questions identified in Phase 0, question 4. Each one becomes a backup slide. Add more as the main flow reveals places where a skeptical viewer might poke.

**What each backup slide needs:**
- **Trigger** — the question or moment in the live flow that cues the presenter to jump to this slide ("If anyone asks about the model assumptions..." / "If the CTO pushes on the rollout plan...")
- **Slide title** — still a full-sentence message, same rules as main flow
- **Content** — the actual detail: methodology, raw data, architecture diagram, unit economics, sensitivity analysis, edge cases, implementation specifics
- **Depth level** — mark as `L2` (one click deeper than the main flow) or `L3` (full technical detail, for the person who really wants to go there). This helps the presenter gauge how far down to go based on who's asking.

**Typical backup slides to consider by audience type:**
- Exec audience with technical sub-audience: technical architecture, implementation timeline, tradeoff analysis, what could go wrong
- Financial audience: sensitivity analysis, unit economics, scenario tables, assumptions log
- Board/investor: cohort data, churn mechanics, competitive positioning detail, regulatory considerations
- Technical audience: benchmark methodology, reproducibility details, alternative approaches considered and rejected

**Backup count:** target 30-60% as many backup slides as main flow. Too few = presenter is exposed. Too many = the presenter can't find the right one under pressure. Group them clearly.

### Phase 6.5 — Pressure test the deck (role-play the skeptic)

Before presenting the outline to the user, run a pressure test. This is the step that catches the load-bearing claims an agent naturally glosses over — the "same annual cost" that isn't quite, the "3x faster" on queries picked how, the "we talked to Marcus" presenter-dependent weight, the rollback plan that isn't really a plan.

**Why this step matters:**

The skill's other phases optimize for building a good argument. This phase optimizes for surviving a careful listener. Those are different. A deck can have a strong structure and still fall apart under one pointed question from the person in the room most disposed to push back. The pressure test simulates that person before the presenter faces them live.

**How to run it:**

**Step 1 — Pick the hardest sell from the Audience Model.**

From Phase 0, the Audience Model already identifies "the hardest sell" or "who's most likely to push back." That person is the role for this step. If multiple people would push back on different things (a cost skeptic AND a technical skeptic AND someone whose role is affected), run the pressure test from each of their perspectives in turn. Most decks need one pass; high-stakes decks need two or three.

**Step 2 — Adopt the role explicitly.**

State the role in the response: "Pressure-testing from the perspective of: \[the CFO who's been burned on cloud cost overruns before and has 11 years in the seat\]." Name their priors, their incentives, their pattern-match history. The more specific, the harder they'll push.

**Step 3 — Walk the deck slide-by-slide and write down what they'd say.**

For each slide in the main flow (and the hook and close), ask — *in this person's voice, not Claude's voice*:

- What's the sharpest question they'd ask?
- Which claim on this slide is under-specified? ("Same cost" — same as what? "3x faster" — on which queries, picked how?)
- What would they assume the worst case is if you don't specify it?
- What would their pattern-match be from prior decks they've killed?
- Where would they sense the presenter is selling rather than explaining?
- Where is the deck asking them to trust a presenter-dependent claim ("I talked to Marcus and we're aligned") that they can't verify in the room?

Write the questions and critiques down explicitly. Don't summarize; quote the skeptic. If the critique is "the TCO slide is hand-wavy — which direction is the 8% gap, and over 5 years not 1?" — that's what goes in the pressure-test output. Not "TCO needs more detail."

**Step 4 — Find the adversarial reads that land.**

For each critique, mark it as:
- **Fatal** — if this lands, the ask dies. Fix before presenting.
- **Credibility** — if this lands, the presenter loses trust for the rest of the deck. Fix before presenting.
- **Minor** — a nit or edge case. Note for the presenter but don't re-architect.

Fatal and Credibility critiques feed directly back into slide revision. Minor ones feed into the backup layer — if a question is likely enough to ask, a backup slide should answer it.

**Step 5 — Apply the fixes.**

Go back to the affected slides and tighten. Common fixes:
- Under-specified quantitative claim → add the qualifier that makes it defensible in the slide title itself ("3x faster on the 10 most-run queries" not "3x faster")
- Presenter-dependent trust claim → either get the named person to co-present, or remove the claim
- Hand-wavy direction → name the direction and own it ("Snowflake is 8% more expensive annually on current volume; the hardware refresh offsets 4 years of that gap")
- Missing tradeoff acknowledgment → add the "what we're giving up" content (see Phase 3)
- Rollback buried in backup → promote to main flow (see Phase 3)

**Step 6 — Show your work.**

In the output (Phase 7), include a short **Pressure-test log** section that shows: the role(s) adopted, the top critiques surfaced, and what changed as a result. This serves two purposes: it lets the user see what the skill actually caught (builds trust in the discipline), and it gives the presenter a head start on anticipating those questions live.

**Rationalizations for skipping the pressure test:**

| Excuse | Reality |
|--------|---------|
| "The deck is tight, it'll hold up" | That's what every presenter has thought before getting torched. 10 minutes on this saves a meeting. |
| "I don't know the hardest sell well enough to role-play" | Use the audience model you already built in Phase 0. If it's too thin for this, it was too thin for the whole deck. |
| "The user can pressure-test it themselves" | They won't. Presenters are too close to their own deck to see what a stranger with different priors sees. |
| "There's no hostile audience in this meeting" | There is always at least one person whose default is skepticism. Every meeting. |
| "This is just an internal status update" | Low-stakes means smaller pressure test, not no pressure test. One pass, one skeptic, a paragraph. Every deck gets read by someone, and that someone has opinions. |

**The pressure test always runs. What scales is its size.**

Match the pressure test to the stakes of the deck. Undersized on a high-stakes deck leaves load-bearing claims uncaught; oversized on a low-stakes deck wastes the presenter's attention. Three sizes:

**Micro pressure test (low-stakes decks — internal status updates, retros, team updates, informational briefings):**
- One pass. Adopt the role of the most likely passive-skeptical reader (the person who'll skim it and push back on one thing).
- Walk the hook, the headline claim, and the close. Not every slide.
- Surface 2-3 critiques, in their voice. Classify as Fatal / Credibility / Minor (most will be Minor on low-stakes decks — that's fine).
- Apply fixes. Pressure-test log is a short paragraph, not a dedicated section.
- Even here, the test catches things: unsupported headline claims, a hook that assumes context the reader doesn't have, a close that leaves the reader unclear on what you want them to do with the info.

**Standard pressure test (most decks — recommendations, proposals, project updates with an ask, external briefings):**
- One pass from the hardest sell identified in the Audience Model.
- Walk every main-flow slide plus the hook and close.
- Surface 5-8 critiques in their voice. Classify each. Fix the Fatals and Credibilities.
- Full Pressure-test log in the output.

**Extended pressure test (high-stakes decisions — migrations, major investments, reorgs, launches, board-level decisions, decks read async by people the presenter can't coach):**
- Multiple passes from distinct skeptics (financial + technical + stakeholder-whose-role-is-affected). Each pass gets its own role declaration with priors.
- Walk every slide including backup. Adversarial read of every quantitative claim, every named person, every irreversible moment.
- Surface 8+ critiques. Expect several Fatals on the first pass of the first draft.
- Pressure-test log is comprehensive. Include residual live-meeting prep notes for the presenter.

**How to tell which size applies:**

| Signal | Size |
|--------|------|
| No decision being asked of the audience | Micro |
| Small decision, low reversibility cost, friendly audience | Micro |
| A recommendation or proposal with at least one skeptic in the room | Standard |
| An ask involving money, people, or a commitment the company has to live with | Standard |
| An irreversible decision, a reorg, a major investment, a migration, a launch | Extended |
| Board meeting, investor pitch, regulator-facing content | Extended |
| Deck will be read async by people the presenter can't answer questions for | Extended (async removes the presenter's ability to repair in real time — compensate with more pre-work) |
| Multiple distinct skeptics with different concerns | Extended (one pass per skeptic) |

**When in doubt, run Standard.** The cost of a too-large pressure test is measured in minutes; the cost of a too-small one is measured in torched meetings.

### Phase 6.75 — Final scan (re-read the whole deck after fixes)

The pressure test in Phase 6.5 surfaces targeted critiques and applies targeted fixes. That's correct — you don't want to re-architect the deck, just tighten the load-bearing claims. But fixes introduce new content, and targeted attention on some slides means reduced attention on others. Slides that weren't touched by the pressure test are subject to reflex writing that the earlier Phase 4 AI Slop Test was supposed to catch — but Phase 4 ran *before* the pressure test's edits landed.

The final scan is a short, cheap pass that catches what falls through the cracks between phases.

**Why this phase exists:**

A deck can pass every individual phase check and still fail as a whole because nobody re-read it as a reader after the fixes landed. The pressure test catches credibility failures; the final scan catches the slop that escaped because the pressure test was (correctly) focused on the most skeptical reader's lens and not on the whole-deck aesthetic read.

This phase is cheap. It's not another pressure test. It's a fast re-read against three specific criteria.

**Run these three passes, in order. All decks. All sizes. No skipping.**

**Pass 1 — Slide title scan.**

Read every slide title, top to bottom. For each, ask: is this a full-sentence message that takes a position, or is it a noun phrase describing what the slide is?

| DO | DO NOT |
|----|--------|
| Full sentence with subject, verb, and specific claim | Noun phrase or topic label |
| Title carries the argument if the slide doesn't load | Title describes the slide's topic |
| Reader could follow the whole deck from titles alone | Reader learns the section but not the argument |

If any title fails, rewrite it. This catches the #1 most common post-fix regression — a slide that got edited for content but kept its pre-edit title.

**Pass 2 — AI Slop Test on the full deck.**

Re-run the named test from the top of this skill: *"If someone said 'Claude wrote this deck,' would it be obvious?"*

Specifically scan for:
- Forbidden phrases from the reject-your-reflex list (any that slipped in during fixes)
- Hedged qualifier-heavy sentences ("could potentially help drive...") that appeared in pressure-test-fixed content
- Three-equal-weight bullet reflex on any slide that wasn't structured that way before fixes
- Content that would apply to any company/project with the nouns swapped
- Placeholder phrases where specifics belong

If any slide fails, rewrite. Specificity beats style.

**Pass 3 — Argument coherence scan.**

Read the slide titles top to bottom one more time, as a single sentence separated by periods. Does it tell a coherent story that matches the one-sentence takeaway from Phase 1?

If the title sequence reads as a coherent argument that lands on the takeaway, the deck's spine is intact. If it jumps, repeats, or meanders, one of the pressure-test fixes broke the narrative flow and needs a structural adjustment, not a word-level one.

**What the final scan is NOT:**

- Not another pressure test. Don't role-play a skeptic here; just read the deck as a careful reader would.
- Not a restructuring phase. If slides need to be reordered or cut at this point, the pressure test missed something structural — go back to Phase 6.5 with the new finding.
- Not a style polish. Visual polish is Phase 8's domain; this phase is content integrity only.

**Output:**

The final scan usually adds nothing to the user-facing output — fixes are applied silently. If a fix is significant (a title rewrite, a slide-level rewrite), note it in the Pressure-test log alongside the pressure-test fixes. The Pressure-test log becomes the single source of truth for "what changed in Phase 6.5 and Phase 6.75."

**Rationalizations for skipping the final scan:**

| Excuse | Reality |
|--------|---------|
| "The pressure test caught everything important" | The pressure test focused on the skeptic's concerns. Slop on untouched slides is a different failure mode. |
| "I already ran the AI Slop Test in Phase 4" | Phase 4 ran before the pressure-test fixes. Those fixes introduced new content that wasn't scanned. |
| "It's only 2-3 passes, it's not worth a whole phase" | That's exactly why it's cheap and mandatory — the cost is minimal and the value is catching a known failure mode. |
| "Fixes were small, unlikely to introduce slop" | Small fixes are the ones most likely to introduce slop because they're written under mild time pressure after the hard work is done. |

### Phase 7 — Present the outline

Deliver the outline as **structured text**, not as slides. The user will take this to a visual tool (pptx skill, their design team, a template). Format:

```
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
[Which structure and why]

## Opening hook (first 30 seconds)
[The actual words / visual / stat that opens the deck — not "title slide"]

## STAR moment
[The one thing the audience will remember and quote afterward — which slide it lives on]

## Main flow (slides)
1. [Title as full-sentence message]
   - Purpose: ...
   - On-slide: [what actually appears on the slide — short, anchor-oriented]
   - Speaker notes: [what the presenter says that is NOT on the slide; this is often the load-bearing content]
   - Load: slide-heavy | balanced | speaker-heavy
   - Visual: text-only  (default — or chart/diagram/image/screenshot + spec when earned)

2. ...

## Backup layer (progressive disclosure)
B1. [Title] — triggered by: [question/moment] — depth: L2
   - Content: ...
   - Visual: [mode + spec, same format as main flow]
B2. ...

## Visual consistency notes
- [Cross-deck notes, e.g., "Use brand-primary blue as the single highlight color across all chart slides"]
- [Icon family to use if icons appear]
- [Any assets user needs to source vs. create]

## What I cut (and why)
- [Topic] — reason
- ...

## Handoff notes
- For pptx/design: [any visual or layout suggestions that emerged]
- Credits slide (if team effort): [names + specific contributions]
- Licensing flags: [web-sourced images that need license verification before publication]

## Pressure-test log [size: Micro | Standard | Extended]
- Role(s) adopted: [who you role-played as the skeptic, with priors]
- Top critiques surfaced: [in the skeptic's voice — 2-3 for Micro, 5-8 for Standard, 8+ for Extended]
- Fixes applied: [specific slide → specific change]
- Live-meeting prep notes (Standard/Extended only): [residual questions the presenter should rehearse, even after fixes]
```

For Micro pressure tests, this section can collapse to a single paragraph: "Pressure-tested as \[role\]. Surfaced \[N critiques\], fixed by \[changes\]." The full template above is overkill on a low-stakes deck.

### Phase 8 — Handoff (only if user wants slides rendered)

If the user wants an actual .pptx file, do NOT render it yourself from this skill. Tell them to use the `pptx` skill (or whatever deck tool they prefer) and hand off the outline above. This skill's job is done when the structure is tight.

If the user does want to render, keep the content exactly as outlined — the visual skill's job is to make it look good, not to rewrite the points. Make sure the handoff includes both the main flow and the backup layer (backup slides usually go in a separate section after the main appendix divider).

## Interacting with the user

- **Ask Phase 0 and Phase 1 questions in two compact blocks, not seven separate turns.** Audience first (Phase 0), then the rest of the brief (Phase 1). Don't drip-feed.
- **Show your reasoning briefly.** When you pick SCQA over the technical-talk structure, say why in one sentence.
- **Be willing to push back.** If the user says "make it 30 slides," explain why that hurts the landing, suggest a count, and let them override. If the user has no one-sentence takeaway, don't let them skip it — help them find one.
- **When cutting, be explicit.** Show what was removed and why. This is how the user learns to trust the discipline and also catches cases where they actually need something you cut.
- **Don't produce slides during the brief phases.** Resist. The audience model and brief are the deliverables of Phases 0-1.
- **Always produce a backup layer.** Even if the user doesn't ask. It's cheap insurance and it's how presentations survive tough Q&A.
- **Confirm team credit when a team effort is detected.** One clarifying question — don't invent names.
- **For public/web images, actually search — don't just describe.** When a slide needs a web-sourced image and the user hasn't supplied an asset, run `web_search` and surface 2-3 candidate URLs with a note on which fits best. If `web_search` isn't available, give specific search queries and what a good result looks like.
- **Always flag licensing risk on web-sourced imagery.** The user must verify reuse rights before publishing.
- **Always run the pressure test before presenting the outline** (Phase 6.5). Scale it to the stakes of the deck — Micro for low-stakes, Standard for most decks, Extended for high-stakes decisions. Never skip. The pressure test is where load-bearing claims get stress-tested and presenter-dependent trust assertions get caught. Show your work in the Pressure-test log section.
- **Always run the final scan after pressure-test fixes land** (Phase 6.75). Three passes — slide titles, AI Slop Test on the full deck, argument coherence. This catches what the pressure test's targeted focus missed. Never skip, even on Micro pressure tests.
- **Quote the skeptic, don't summarize them.** During the pressure test, write the critique in the skeptic's voice, specific and sharp. "The TCO slide is hand-wavy" is useless; "Which direction is the 8% gap, and over 5 years not 1?" is useful.

## Anti-patterns to actively avoid

These are specific behaviors Claude should not do (the failure-modes list above is descriptive; this list is prescriptive):

- Generating slides in response to "make me a deck about X" without running Phase 0
- Accepting a topic when you could pull specific content from the user (numbers, names, surprises)
- Drip-feeding the brief questions one per turn instead of asking them as a compact block
- Producing a deck with no STAR moment — if the user can't offer one, push back; don't just ship something forgettable
- Shipping an all-upside deck with no acknowledgment of tradeoffs — the audience stops trusting the presenter the moment they sense a sales pitch
- Burying rollback / failure-mode content in the backup layer when the deck is asking for approval on something with real consequences
- Skipping the pressure test on any deck to save time — the time saved is always less than the time lost to a torched meeting. Low-stakes decks still get a Micro pressure test; they just don't get an Extended one.
- Skipping the final scan after pressure-test fixes — the pressure test's targeted focus leaves untouched slides vulnerable to reflex writing, and Phase 4's earlier Slop Test ran before the fixes landed
- Pressure-testing in Claude's voice instead of the skeptic's voice (produces generic critiques that catch nothing)
- Recommending pie charts with more than 4 slices, 3D charts, or dual-axis overlays without a strong reason
- Forcing a visual onto every slide; defaulting to stock imagery ("handshake," "teamwork") when the slide should be text-only
- Fabricating image URLs or citing images without actually running `web_search`
- Writing slide content that duplicates what the presenter will say — slide text and spoken narration should complement, not repeat
- Vague team credit ("thanks to the team") instead of specific attribution
- Inventing contributor names or guessing who did what
- Hedged qualifier-heavy prose ("could potentially help drive...") where specific claims belong
- Three-equal-weight bullets as a reflex — audit whether points are actually parallel and distinct before using that shape

## Quick reference: the cuts that usually matter most

When a draft feels bloated, these are the highest-leverage cuts:

1. The agenda slide
2. The company/team intro (unless it's literally a pitch to strangers)
3. Any slide whose title is a noun
4. The third, fourth, fifth example of the same point — keep the sharpest one
5. Transition/section-divider slides on short decks
6. "Summary of what we'll cover" immediately before covering it
7. The "Thank you" closer — replace with the one-sentence takeaway
8. Historical background that predates what the audience already knows

## The Bottom Line

A great deck is a short, sharp argument delivered by a human to a specific room.

Structure beats beauty. A one-sentence takeaway beats a fifteen-slide overview. A specific name and number beats "significant stakeholder impact." A real moment the audience will quote beats three parallel bullets. The presenter's voice carries the story; the slide is the anchor. Every slide earns its place or gets cut.

If the deck doesn't pass the AI Slop Test, it doesn't ship.
