---
name: deck-architect
description: Use when the user is building, outlining, or revising a slide deck, presentation, talk, pitch, board update, or briefing — any time someone needs to decide what to say, in what order, and what to cut. Use when a draft feels too long, too generic, doesn't land, or sounds AI-generated. Use when someone says "help me make a deck about X" — structure is where decks fail. Do NOT use when the user only wants visual polish on already-finalized content.
version: 2.1.0
license: MIT
allowed-tools: [WebSearch]
---

# Deck Architect

Handles the part of deck-building AI is bad at: **content and structure**. Not visuals. Produces a sharp outline; hands off to a visual-design skill (e.g. `pptx`) for rendering.

## When NOT to use

- User only wants visual polish on already-finalized slides → use `pptx` directly
- Single-slide updates / one-off charts → overhead exceeds value
- The deliverable is a written doc, not a deck → use a writing skill
- The deck must follow a locked corporate template that conflicts with full-sentence titles or main-flow rollback slides — the skill's prescriptions will fight the template; flag this and let the user choose
- User wants speaker notes only for an existing deck — the skill produces full outlines, not note-only revisions
- Someone else owns the structural decisions and the user is just executing — the skill pushes back on structure; that's friction in this case
- Non-English decks where the user wants enforcement on style — the structural checks (no agenda, full-sentence titles, tradeoff, rollback) still apply, but the slop-phrase list is English-only

## The Iron Law

**No slides without Audience + Takeaway + Spine first.**

Applies to new decks AND edits. If you catch yourself drafting before those three are locked, stop and go back to Phase 0. The rationalizations table in [references/rationalizations.md](references/rationalizations.md) covers every excuse you'll be tempted by — read it once, then don't re-litigate.

## The AI Slop Test

Before finalizing, ask: **"If someone said 'Claude wrote this deck,' would it be obvious?"**

A deck that passes:
- Slide titles are full-sentence messages, specific to this project
- Every substantive slide has at least one concrete detail (a name, number, date, artifact)
- The deck argues something — it doesn't just "cover" a topic
- Nothing could be copy-pasted to another company with nouns swapped

**When the test fails: Read `references/forbidden-phrases.md` and rewrite the offending content.**

## Operating principles

- **Audience first, always.** Phase 0 is non-negotiable. The audience determines the takeaway, the spine, the wins to surface, and the main-vs-backup split.
- **Audience is the hero, not the presenter.** Frame as their problem → their transformation. The presenter is the mentor.
- **Strategy first, slides last.** No slide content until audience, brief, takeaway, and spine are locked.
- **Pull for specifics, resist topics.** Topics produce generic output; specifics produce a deck only this user could give.
- **Honesty is a persuasion tool.** Name the tradeoff before the audience does.
- **Adversarial read before the live read.** Pressure-test before presenting (Phase 6).
- **Contrast creates attention.** Alternate problem/solution, current/future. Monotone = forgotten.
- **Progressive disclosure by default.** Main flow + backup layer.
- **Credit humans specifically.** Names + specific wins, never anonymous "we."
- **Protect opening and close.** Primacy + recency. Don't waste either on agenda or thanks.
- **Text-first on visuals.** Default text-only. Earn each visual.

---

## Workflow

Follow phases in order. Don't skip ahead.

If the user brings an existing draft, don't start from scratch — but don't skip Phase 0 either. Run Phases 0–1 (infer answers from the draft, confirm with user), then use Phase 4 as the main working mode. Output a revised outline plus a "what changed and why" section.

### Phase 0 — Model the audience

**Lock this before anything else.** Ask these five questions in one compact block:

1. **Who's in the room — specifically?** Names or roles. Hardest sell? Decision-maker? Likely interrupters?
2. **What do they care about?** Their incentives, not the topic. ROI/risk (CFO), strategic fit (CEO), technical rigor (eng leaders), career impact (often the real one).
3. **What do they already know/believe?** Skip what they know. Anticipate what they'll disagree with.
4. **What's the transformation?** Walk-in state → walk-out state. ("Skeptical of budget" → "convinced this is the cheapest insurance we can buy.")
5. **What objections / deep-dive questions will they raise?** List 3–5. These feed the backup layer (Phase 8).

Output: an **Audience Model block** at the top of your response. Cite it whenever you cut a slide in Phase 4.

**If the user won't answer after one push:** infer from context and mark each inferred answer with `[INFERRED — confirm]` so they can correct in one pass. Better an inferred Audience Model than no Audience Model.

**If the user brought an existing draft:** infer answers from it before asking. Audience clues = formality, jargon density, named stakeholders. Takeaway clues = the close (or its absence). Objection clues = the slides that already exist defensively (TCO, rollback, comparison tables). Confirm inferences with the user, don't replace asking.

For a real example of a complete Audience Model block, see [references/example.md](references/example.md).

### Phase 1 — The rest of the brief

One block, four items:

1. **Decision or action.** What do you want them to do/decide/approve/remember? If there isn't one, flag it — the deck has no purpose.
2. **Format & time.** Live presentation, async pre-read, or both? Minutes? Live decks and slide docs aren't interchangeable.
3. **Constraints.** Slide-count cap? Required sections? Brand/template?
4. **One-sentence takeaway.** If they remember one sentence, what is it? Shaped by Phase 0 — same project, different audiences, different takeaways. Don't move on without this.

Same fallback as Phase 0: if the user won't answer after one push, infer and mark with `[INFERRED — confirm]`. Exception: the one-sentence takeaway. Don't infer this — help the user articulate it instead. A wrong takeaway is worse than a missing one.

**Phase 1a — Team credit (conditional).** If the deck describes work by multiple people, ask once: *"Is this a team effort? If so, who contributed to which key wins?"* Then tie specific names to specific wins (see [references/team-credit.md](references/team-credit.md)). Never invent attributions.

**Phase 1b — Existing assets (conditional).** If the user mentions specific assets/screenshots/imagery, ask once where to find them and what else is available. Don't ask by default — friction without payoff.

### Phase 2 — Pick the narrative spine

Choose ONE structure. State which and why before outlining.

| Situation | Spine |
|---|---|
| Executive / business / recommendation | **SCQA + Pyramid (Minto)** — Situation, Complication, Question, Answer-up-front, then 2–4 MECE supporting arguments |
| Technical talk / conference | **Hook → Problem → Insight → Evidence → Takeaway** — single technical claim, not a survey |
| Pitch (funding/sales/partnership) | **Problem → Why Now → Solution → Why Us → Proof → Ask** |
| Update / status | **Headline → What changed → What it means → What's next** — headline first, details on tap |

If the situation doesn't fit cleanly, pick the closest and state the adaptation. Spine details and time-budget guidance: [references/spines.md](references/spines.md).

### Phase 3 — Draft the slide list (in text)

Numbered list. Each slide:

- **Title** — full-sentence message (the point the slide makes), NOT a topic noun
- **Purpose** — why this slide exists, one line
- **On-slide** — what appears on the slide (3–6 bullets max, or chart spec, or short sentence + visual)
- **Speaker notes** — what the presenter says that is NOT on the slide
- **Load** — `slide-heavy` | `balanced` | `speaker-heavy`

**The slide/speaker split is the craft.** If a phrase is on the slide, the presenter shouldn't read it aloud. Slide = anchor (number, phrase, chart, question). Presenter = story, nuance, example, "why this matters."

**Required content for every deck:**

- **Opening hook** (Phase 3a) — first 30 seconds. Not "Title + name." A pattern-interrupt that anchors to what the audience cares about and promises what they'll get.
- **STAR moment** (Phase 3b) — Something They'll Always Remember. A shocking stat, dramatization, soundbite, or vivid visual. Hook and STAR can be the same thing if the hook is genuinely unforgettable. If you can't identify one, push back on the user.
- **Tradeoff** (Phase 3c) — every persuasion deck must name what's being given up. Either a dedicated "What we're giving up" slide or an explicit on-slide tradeoff bullet. Not buried in speaker notes.
- **Rollback** (Phase 3d, decision decks only) — if the deck asks for approval on something with real consequences (migration, launch, hire, major investment, policy change), main-flow slide on rollback triggers, owners, and recovery. Burying this in backup signals the presenter hopes nobody asks.
- **Close** (Phase 3e) — close on the takeaway, full screen. Not "Thank you." Not "Questions?" (say that verbally; keep the takeaway visible).
- **Contrast** — alternate problem/solution, current/future. Don't stack slides in the same emotional register.

**Read `references/slide-craft.md` before writing slide titles** — it contains the DO/DO NOT tables for titles, openings, contrast, tradeoff phrasing, rollback specs, and the slide/speaker split patterns. These rules are enforced; not loading them produces the exact failures Phase 4 will catch.

### Phase 4 — Ruthless discipline pass

Show the user what was cut and why.

**Slide-count ceilings (push back if user exceeds without reason):**

| Deck type | Ceiling |
|---|---|
| Live exec update | 5–10 content slides |
| Board deck | 10–15 + appendix |
| Conference talk (20 min) | 15–20, one idea per slide |
| Pitch (YC-style) | ~10 |
| Exec pre-read (slide doc) | No fixed limit, dense prose per page |

If content exceeds the ceiling, **cut — don't shrink fonts.** Move detail to appendix.

**Time reality-check.** Math out time-per-slide vs. allotted minutes. Live decks: 1–2 min/content slide; charts 2–3; hook/close more. State the math when it forces a cut: "20 slides in 15 min = 45s/slide, too fast — cut to 12."

**Cut rules:**

- **One idea per slide.** Two messages → split or cut. Two slides making the same point → merge.
- **Cut test:** "If I deleted this slide, would the argument still hold?" If yes, delete.
- **Filler to delete on sight:** agenda slides on decks <15 slides; "About us" up front; "Thank you" / "Questions?" closers; transition slides ("Section 2"); slides that restate what's about to come.
- **Empty-calorie tells:** title could apply to any company; lists categories without synthesis; chart shows data without takeaway in title.

**Run the AI Slop Test.** Read the outline asking: would a sharp reader spot this as Claude output? **Read `references/forbidden-phrases.md`** for the reject-on-sight phrase list and structural tells. Rewrite with specifics — every forbidden phrase has a concrete replacement.

**Audience-fit check.** Re-read through the audience's eyes. Cut what they know. Add what they'd push back on.

### Phase 5 — Spec visual aids (only where earned)

**Default text-only.** For every slide, ask "does this slide need a visual?" — not "what visual goes here?" Forcing visuals onto every slide is an AI anti-pattern.

A slide earns a visual when:
- The argument depends on data the audience must see → **chart**
- It's a system/flow/relationship words describe poorly → **diagram**
- It's the opening hook or STAR moment needing emotional punch → **image**
- The point is about a specific product/UI/artifact → **screenshot**

Otherwise: mark `text-only` and move on.

**Read `references/visuals.md`** for full chart-type selection rules, diagram modes, image search/licensing protocol, and screenshot format before specifying any non-text-only slide.

When images are needed and the user hasn't supplied an asset, run `WebSearch` for 2–3 candidates with a slide-specific query. Surface URLs with one line on which fits best. **Always flag licensing risk** — user must verify reuse rights. Never fabricate URLs.

### Phase 6 — Pressure test (role-play the skeptic)

**Always run. Scale to stakes — never skip.**

The other phases optimize for building a good argument. This phase optimizes for surviving a careful listener. They are different skills.

**Steps:**

1. **Pick the hardest sell** from the Audience Model.
2. **Adopt the role explicitly:** "Pressure-testing as: [the CFO who's been burned on cloud cost overruns and has 11 years in the seat]." Name priors, incentives, pattern-match history.
3. **Walk the deck in their voice.** For each slide ask: sharpest question? Under-specified claim? Worst-case assumption if you don't specify? Pattern-match from prior decks they've killed? Where does it sound like selling vs. explaining? What presenter-dependent trust assertion can't they verify?
4. **Quote, don't summarize.** "The TCO slide is hand-wavy" is useless. "Which direction is the 8% gap, and over 5 years not 1?" is useful.
5. **Classify:** **Fatal** (ask dies) / **Credibility** (presenter loses trust) / **Minor** (nit). Fix Fatal + Credibility before presenting; Minor → backup layer.
6. **Apply fixes.** Common patterns: under-specified quantitative claim → add the qualifier in the title itself. Presenter-dependent trust → co-presenter or remove. Hand-wavy direction → name it and own it. Missing tradeoff → see Phase 3c. Buried rollback → promote to main flow (Phase 3d).
7. **Show your work** in the Pressure-test log (Phase 7 output).

**Sizing — match to stakes:**

| Signal | Size |
|---|---|
| No decision asked of audience; small/reversible/friendly | **Micro** — 1 pass, hook + headline + close, 2–3 critiques |
| Recommendation/proposal with at least one skeptic; ask involving money/people/commitment | **Standard** — 1 pass from hardest sell, every slide, 5–8 critiques |
| Irreversible decision, reorg, major investment, migration, launch, board, regulator, async-read deck | **Extended** — multiple passes from distinct skeptics, every slide including backup, 8+ critiques |

When in doubt, run Standard. Cost of too-large is minutes; too-small is torched meetings.

**Read `references/pressure-test.md`** for the full step-by-step methodology, common-fix patterns, and rationalizations to refuse — load it before running the test, especially the first time per session.

### Phase 7 — Final scan

Cheap re-read after Phase 6 fixes land. Three passes, all decks, no skipping.

1. **Slide-title scan.** Read every title top to bottom. Each must be a full-sentence message, not a noun phrase. Catches the #1 post-fix regression — slides that got edited for content but kept their pre-edit title.
2. **AI Slop Test on the full deck.** Re-run the named test. New content from Phase 6 fixes is the most likely place for slop because it was written under mild time pressure.
3. **Argument coherence scan.** Read titles top to bottom as one sentence. Does it tell a coherent story landing on the takeaway? If it jumps/repeats/meanders, a Phase 6 fix broke the spine — go back, don't paper over.

**Not** another pressure test, restructuring phase, or style polish. Content integrity only.

Significant fixes get noted in the Pressure-test log. Otherwise silent.

### Phase 8 — Build the backup layer

**Default for high-stakes decks** (board, investor, exec recommendation, anywhere skeptical/technical attendees might interrupt). Skip for low-stakes short decks (5-min status, lightning talk) and note that you did.

Source: the 3–5 objections from Phase 0 question 5. Each becomes a backup slide. Add more as the main flow reveals soft spots.

Each backup slide:
- **Trigger** — the question/moment that cues the presenter ("If anyone asks about model assumptions...")
- **Title** — same full-sentence-message rules as main flow
- **Content** — the actual depth (methodology, raw data, architecture, unit economics, sensitivity, edge cases)
- **Depth** — `L2` (one click deeper) or `L3` (full technical detail)

**Count target:** 30–60% as many backup slides as main flow. Too few = exposed; too many = can't find the right one under pressure.

Typical backup by audience: [references/backup-patterns.md](references/backup-patterns.md).

### Phase 9 — Present the outline

Deliver as **structured text**, not slides. Use this schema verbatim:

````markdown
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
[Which structure and why — one sentence]

## Opening hook (first 30 seconds)
[The actual words / visual / stat that opens the deck — not "title slide"]

## STAR moment
[The one thing the audience will remember and quote afterward — which slide it lives on]

## Main flow
1. [Title as full-sentence message]
   - Purpose: ...
   - On-slide: [what actually appears — short, anchor-oriented]
   - Speaker notes: [what the presenter says that is NOT on the slide]
   - Load: slide-heavy | balanced | speaker-heavy
   - Visual: text-only  (or chart/diagram/image/screenshot + spec)

2. ...

## Backup layer
B1. [Title] — triggered by: [question/moment] — depth: L2
   - Content: ...
   - Visual: [mode + spec]
B2. ...

## Visual consistency notes
- [Cross-deck notes — single highlight color, icon family, etc.]
- [Assets user needs to source vs. create]

## What I cut (and why)
- [Topic] — reason
- ...

## Handoff notes
- For pptx/design: [visual or layout suggestions that emerged]
- Credits slide (if team effort): [names + specific contributions]
- Licensing flags: [web-sourced images needing license verification]

## Pressure-test log [size: Micro | Standard | Extended]
- Role(s) adopted: [who you role-played, with priors]
- Top critiques surfaced: [in skeptic's voice — 2-3 Micro / 5-8 Standard / 8+ Extended]
- Fixes applied: [specific slide → specific change]
- Live-meeting prep notes (Standard/Extended only): [residual questions to rehearse]
````

**Length budget.** Default target: main flow ≤ 12 slides per response. Larger decks risk truncation — chunk into two responses (main flow first, backup second) or cap at 12 and offer to expand.

**For Micro pressure tests**, the Pressure-test log can collapse to one paragraph: *"Pressure-tested as [role]. Surfaced [N critiques], fixed by [changes]."* The full template is overkill on a low-stakes deck.

**Inferred answers** carry through to the output: `- Who's in the room: VP Eng + 2 staff engineers [INFERRED — confirm]`

For a complete worked example (brief → full schema filled out), see [references/example.md](references/example.md).

### Phase 10 — Handoff (only if rendering)

Don't render slides in this skill. Hand off to `pptx` (or the user's chosen tool) with the outline above. Keep the content exactly as outlined — the visual skill makes it look good, not rewrites the points. Include both main flow and backup layer.

---

## Interacting with the user

- **Phase 0 and Phase 1 in two compact blocks.** Don't drip-feed.
- **Show reasoning briefly.** When you pick SCQA over the technical-talk spine, say why in one sentence.
- **Push back when warranted.** No one-sentence takeaway? Don't let them skip — help them find one. Asking for 30 slides? Explain the cost, suggest a count, accept override.
- **When cutting, be explicit.** What was removed and why. Builds trust and catches over-cuts.
- **No slides during the brief phases.** Resist.
- **Confirm team credit when detected.** One question; never invent names.
- **For web images, actually search.** Don't just describe — run `WebSearch`, surface 2–3 URLs, note the best fit, flag licensing.
- **Always run the pressure test.** Scale to stakes. Show your work in the log.
- **Always run the final scan.** Three passes. No exceptions.
- **Quote the skeptic, don't summarize.** Specific and sharp.
- **Handle stalled briefs.** If after one push the user still won't answer Phase 0/1, infer from context and mark inferences with `[INFERRED — confirm]` so the user can correct in one pass.
- **Mid-deck audience changes.** If the room composition changes ("CFO is now joining"), re-run Phase 0 question 5 and patch the backup layer. Full re-runs only if the hardest sell changed.

## Anti-patterns

Specific behaviors to avoid (the failure-modes catalogue is descriptive; this is prescriptive):

- Generating slides in response to "make me a deck about X" without Phase 0
- Accepting a topic when you could pull specifics
- Drip-feeding brief questions one per turn
- Shipping a deck with no STAR moment
- All-upside decks with no tradeoff
- Burying rollback in backup on a decision deck
- Skipping the pressure test "to save time"
- Skipping the final scan after pressure-test fixes
- Pressure-testing in Claude's voice instead of the skeptic's
- Recommending pie charts >4 slices, 3D charts, dual-axis without strong reason
- Forcing a visual onto every slide; defaulting to stock imagery
- Fabricating image URLs
- Slide content that duplicates what the presenter will say
- Vague team credit ("thanks to the team") instead of specific attribution
- Inventing contributor names
- Hedged qualifier-heavy prose where specific claims belong
- Three-equal-weight bullets as a reflex

For background on *why* these matter — the failure modes that motivate this whole skill: [references/failure-modes.md](references/failure-modes.md).

## Quick reference: highest-leverage cuts

When a draft feels bloated, cut these first:

1. The agenda slide
2. The company/team intro (unless pitching to strangers)
3. Any slide whose title is a noun
4. The 3rd/4th/5th example of the same point — keep the sharpest one
5. Transition/section dividers on short decks
6. "Summary of what we'll cover" right before covering it
7. The "Thank you" closer — replace with the takeaway
8. Historical background that predates what the audience knows

## The bottom line

A great deck is a short, sharp argument delivered by a human to a specific room.

Structure beats beauty. A one-sentence takeaway beats a 15-slide overview. A specific name and number beats "significant stakeholder impact." A real moment the audience will quote beats three parallel bullets. The presenter's voice carries the story; the slide is the anchor. Every slide earns its place or gets cut.

If the deck doesn't pass the AI Slop Test, it doesn't ship.
