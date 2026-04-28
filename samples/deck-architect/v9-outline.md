# What makes impeccable and superpowers such great skills

## Audience Model
- Who's in the room: Claude Code power users who already author their own skills. Mix of indie devs who ship skills on GitHub, staff engineers at small shops, and agent-tooling tinkerers. Hardest sell: the skeptical skill author who has already read both repos and assumes a meta-talk on "what makes them great" will be brand adjectives. Likely interrupters: the one who quotes obra's blog post back at you.
- What they care about: making their own skills actually get used by Claude instead of drifting into a drawer. They are not here to be taught what a skill is. They want the mechanism — what do these two skills do at the markup level that their skill does not.
- What they already know/believe: they know both skills exist, have probably installed superpowers, may have read pbakaus's README. They likely believe "good skills = good prompts." They will push back on anything that sounds like "write clearer instructions."
- Transformation (walk-in → walk-out state): walks in thinking "my skill just needs better prose." Walks out with four concrete moves (ban behaviors, rebut rationalizations, ship objective checks, name failure modes) and the belief that a skill is a contract with the model, not a tutorial.
- Likely objections / deep-dive triggers:
  1. "Isn't this just prompt engineering with extra steps?"
  2. "Obra's domain is coding, pbakaus's is frontend — does this generalize to my skill on X?"
  3. "How do I know if my skill is actually getting loaded vs. ignored?"
  4. "The Cialdini framing feels manipulative — is that really what makes it work?"
  5. "What's the difference between a good SKILL.md and good CLAUDE.md instructions?"

## Brief
- Decision/ask: adopt the four moves in the next skill you author — or retrofit them into a skill you already ship. Not "agree these are good skills."
- Format & time: live 12-minute talk with laptop viewing afterward as reference. Moderated Q&A after.
- Constraints: HTML handoff. Fifth visual register — distinct from v5–v8. No reflex fonts. Honor impeccable bans verbatim.
- One-sentence takeaway: *Great skills don't describe behavior — they constrain it, rebut the excuses for breaking the constraint, and ship an objective check the model can't talk its way around.*
- Team contributors (if applicable): N/A — single-author talk, credits Jesse Vincent (obra) and Paul Bakaus (pbakaus) by name on the credits slide.

## Narrative spine
**Hook → Problem → Insight → Evidence → Takeaway.** This is a technical talk making one claim, not a survey. The insight is "skills are contracts, not tutorials"; the evidence is four moves extracted from the two repos and third-party commentary (Simon Willison, Emelia, 93k stars in five months).

## Cover slide
- Title: *What makes impeccable and superpowers such great skills.*
- Subtitle: For authors who want their own skills to actually get used.
- Meta: omitted — cover stays clean.

## Opening hook (first 30 seconds)
Spoken, not displayed: *"Obra's superpowers went from a few thousand stars to ninety-three thousand in five months. Pbakaus's impeccable crossed fifteen thousand in days. The natural question is 'what's in the prompt.' The interesting question is 'what's in the contract.'"* Holds on slide 1's single sentence until the audience settles.

## STAR moment
Slide 4 — the Cialdini quote rendered as a single line of monospace on bone paper: *"If you have a skill to do something, you must use it."* This is the STAR. One sentence re-frames every skill the audience has ever written. Combined with the hook — the hook is the setup, STAR is the payoff.

## Main flow

1. **The two skills your Claude Code feed keeps recommending have one thing in common.**
   - Purpose: land the audience on the specific question this talk answers — not "what are these skills" but "what do they share that others don't."
   - On-slide: single declarative title; no bullets; quadrant figure placed to the right showing where impeccable/superpowers sit relative to typical custom skills.
   - Speaker notes: Name Jesse Vincent (obra) and Paul Bakaus (pbakaus). 93k stars in five months and 15k in days, respectively. The skills cover unrelated domains — coding methodology and frontend design — yet the reviews use the same language. Simon Willison: "one of the most creative users of coding agents I know." That overlap is the clue.
   - Load: balanced
   - Visual:
     ```yaml
     type: quadrant
     axes:
       x: { label: "Enforcement strength", low: "suggests", high: "enforces" }
       y: { label: "Domain breadth", low: "narrow failure mode", high: "broad area" }
     items:
       - { label: "impeccable", x: 0.85, y: 0.70, highlight: true }
       - { label: "superpowers", x: 0.80, y: 0.90, highlight: true }
       - { label: "a typical custom skill", x: 0.25, y: 0.75 }
       - { label: "deck-architect", x: 0.72, y: 0.30 }
       - { label: "one-shot prompt", x: 0.10, y: 0.15 }
     quadrant-labels:
       top-right: "enforcement + breadth"
       top-left: "broad but soft"
       bottom-right: "narrow but sharp"
       bottom-left: "slides in a drawer"
     caption: "the two shipped skills live in the top-right quadrant"
     ```

2. **Most skills describe behavior. These two constrain it.**
   - Purpose: name the difference in one sentence, then make it concrete.
   - On-slide: two short columns, left "describes," right "constrains." Two cells each. "Use good typography" vs. "Reject these 22 fonts by name." "Plan before you code" vs. "Write the plan, show it to the user in chunks, wait for confirmation."
   - Speaker notes: the typical custom skill reads as documentation — "here is how to do X well." Impeccable and superpowers read as contracts — "here is what you may not do, and here is the check that catches you." The difference isn't tone. It's whether the model has room to negotiate.
   - Load: balanced
   - Visual: text-only

3. **Move one — ban behaviors by name, with the exact pattern.**
   - Purpose: show the first shared move with the sharpest example.
   - On-slide: verbatim excerpt from impeccable's absolute-bans block. "PATTERN: `border-left:` or `border-right:` with width greater than 1px. INCLUDES: hard-coded colors AND CSS variables. FORBIDDEN: border-left: 4px solid var(--color-warning)." Title carries the point.
   - Speaker notes: the craft is the specificity. "Avoid overused design touches" gets ignored; a named CSS pattern the model will match against and refuse does not. Same pattern appears in superpowers — the red-green-refactor cycle specifies "the test must fail first" as an explicit gate, not a preference. The model searches its own output for the pattern because it was given the pattern.
   - Load: slide-heavy
   - Visual: text-only (the excerpt IS the visual)

4. **Move two — rebut the rationalizations before the model finds them.**
   - Purpose: the STAR slide. Land the Cialdini insight.
   - On-slide: one sentence, centered, monospace: *"If you have a skill to do something, you must use it."* Attribution beneath: Jesse Vincent, superpowers.
   - Speaker notes: Jesse Vincent discovered that Cialdini's persuasion principles work on LLMs. He engineered superpowers to incorporate authority, commitment, and scarcity — and pressure-tested them in synthetic high-stakes scenarios (production down, sunk cost, time pressure) to see if the model would actually invoke the skill or take a shortcut. The audience has written SKILL.md files that say "use this when X." Obra writes SKILL.md files that say "you must use this when X, here are the six excuses you will generate for skipping it, here is why each is wrong." That is the difference.
   - Load: speaker-heavy
   - Visual: text-only

5. **Move three — ship an objective check the model can't talk its way around.**
   - Purpose: concrete mechanism for enforcement — not vibes.
   - On-slide: side-by-side. Left: impeccable's CI-compatible lint catching gradient text, border-left stripes, AI palettes. Right: superpowers' RED-GREEN-REFACTOR gate where the test must literally fail before code is written. Below both, a single line: "prose cannot enforce itself — a script can."
   - Speaker notes: impeccable ships as a Claude Code skill AND a CLI that runs in pre-commit hooks and CI. Superpowers enforces the test-fails-first gate by making the test run a prerequisite to the implementation step. In both cases the skill's authority is delegated to an external check the model can't negotiate with. Your skill should have at least one of these — a lint, a test, a script, an API call, a thing that returns pass or fail. This is also what deck-architect does with lint-deck.js; the argument generalizes.
   - Load: balanced
   - Visual:
     ```yaml
     type: flow
     direction: horizontal
     nodes:
       - { id: a, label: "author writes skill", role: entry }
       - { id: b, label: "model reads skill" }
       - { id: c, label: "model produces output" }
       - { id: d, label: "external check runs", highlight: true }
       - { id: e, label: "pass or fail", role: exit, highlight: true }
     caption: "the check is what makes the skill a contract instead of a suggestion"
     ```

6. **Move four — enumerate the failure modes so the model can't invent new ones.**
   - Purpose: the catalogue move — making bad behaviors legible to the model.
   - On-slide: short list pulled from impeccable — "gray text on colored backgrounds," "pure black or pure white," "cards nested inside cards," "sparklines as decoration," "the same padding everywhere." Six items. Title carries the claim.
   - Speaker notes: impeccable doesn't just ban — it catalogs the family of AI design tells so the model can pattern-match against its own output. Superpowers catalogs four debugging phases with specific anti-patterns (jumping to fixes, treating symptoms, tool-breadth instead of depth). A model told "avoid bad patterns" invents its own taxonomy of "bad." A model given the taxonomy uses it. Naming is enforcement.
   - Load: slide-heavy
   - Visual: text-only

7. **The tradeoff: a contract is harder to author than a tutorial.**
   - Purpose: tradeoff slide. Name the cost honestly.
   - On-slide: two lines. "A tutorial SKILL.md takes an afternoon. A contract SKILL.md takes the next three weeks you use it." Below: "The first draft is the worst version — the catalogue grows every time you catch the model breaking it."
   - Speaker notes: impeccable's absolute-bans list did not ship with 22 fonts day one. It grew. Superpowers' rationalizations table is the result of obra watching agents weasel out of skills and adding each excuse back in. The cost of the contract style is that it requires you to use your own skill, notice breakage, and add the rebuttal. The upside is the skill compounds — each use makes it sharper. A tutorial skill decays; a contract skill compounds.
   - Load: balanced
   - Visual: text-only

8. **What if I'm wrong — when the contract style doesn't fit.**
   - Purpose: rollback / honest scope. Decision-deck discipline: say where this does not apply.
   - On-slide: three cases. "One-shot helpers (no enforcement needed)." "Domains with no external check possible (aesthetic-only judgment)." "Skills whose point is exploration, not correctness." Each with a one-line example.
   - Speaker notes: a skill that converts a CSV to JSON doesn't need rationalization-rebuttals; it needs a good example. A skill that helps you brainstorm poetry doesn't want a lint. The contract style earns its complexity when the skill is about discipline — the model has preferences the author wants overridden. If your skill is about capability, stay tutorial. Knowing which you're writing is half the battle.
   - Load: balanced
   - Visual: text-only

9. **The four moves, on one page, so you can steal them tomorrow.**
   - Purpose: summary / takeaway consolidation before the close.
   - On-slide: waterfall figure showing the four moves as contributors to skill reliability.
   - Speaker notes: each move on its own is a 10% improvement. Stacked, they are the difference between a skill that sits in a drawer and a skill that gets used. Walk through the figure left to right: start from the baseline SKILL.md, add ban-behaviors-by-pattern, add rebut-rationalizations, add an objective check, add a failure-mode catalogue. The model now has a contract.
   - Load: slide-heavy
   - Visual:
     ```yaml
     type: waterfall
     axis: { label: "relative impact on skill reliability", unit: "%" }
     bars:
       - { label: "Baseline",          kind: total, value: 100 }
       - { label: "+ ban by pattern",  kind: delta, value: 12 }
       - { label: "+ rebut excuses",   kind: delta, value: 10 }
       - { label: "+ objective check", kind: delta, value: 8 }
       - { label: "+ failure catalog", kind: delta, value: 5 }
       - { label: "Contract skill",    kind: total, value: 135 }
     callout: { bar: 3, text: "the one most authors skip" }
     caption: "illustrative — the point is the shape, not the numbers"
     ```

10. **A skill is a contract, not a tutorial.**
    - Purpose: close on the takeaway, full screen.
    - On-slide: the takeaway sentence alone, display type, centered. Nothing else.
    - Speaker notes: leave this on screen during Q&A. Don't replace with "Thank you." If someone asks "but can't I just write good prose?" — yes, and obra did, and pbakaus did, and the prose they wrote describes constraints, rebuts excuses, and ships a check. That is what the prose of a great skill looks like.
    - Load: speaker-heavy
    - Visual: text-only

## Appendix divider
*Appendix — reference material, triggered on question.*

## Backup layer

B1. **The Cialdini mapping in superpowers, specifically.** — triggered by: "the manipulation framing feels weird" — depth: L2
   - Content: authority ("this is the mandatory workflow"), commitment ("you committed to the plan in chunk 3"), scarcity ("your remaining context window is tight"), social proof ("prior agents that followed this pattern succeeded"), reciprocity ("the plan file is a favor the user gave you"). Each mapped to a concrete superpowers skill clause.
   - Visual: text-only

B2. **Obra's pressure-test methodology in one paragraph.** — triggered by: "how do you know a skill will hold?" — depth: L2
   - Content: spawn a fresh agent in a synthetic crisis (production down, sunk cost committed, deadline in 15 minutes). Give it the skill and a shortcut. See if it takes the shortcut. If yes, the skill is not enforced enough. Add the rebuttal and re-run. Quote Vincent: "You can hand a model a book or a document or a codebase and say 'Read this. Think about it. Write down the new stuff you learned.'"
   - Visual: text-only

B3. **The reject-font list from impeccable, verbatim.** — triggered by: "does pbakaus actually ban fonts by name?" — depth: L3
   - Content: Fraunces, Newsreader, Lora, Crimson (and variants), Playfair Display, Cormorant (and Garamond), Syne, IBM Plex (Mono/Sans/Serif), Space Mono, Space Grotesk, Inter, DM Sans, DM Serif (Display/Text), Outfit, Plus Jakarta Sans, Instrument Sans, Instrument Serif. Twenty-two fonts rejected by name. The rule: if you pick your second-favorite after Inter, you've re-created the monoculture. Look further.
   - Visual: text-only

B4. **What counts as an "objective check" for non-code skills?** — triggered by: "my skill is about writing/analysis, not code" — depth: L2
   - Content: deck-architect's lint-deck.js is the analogy. For a writing skill: a regex list of banned slop phrases. For an analysis skill: a structured output schema the model must fit. For a judgment skill: a checklist of questions the output must explicitly answer. The check doesn't have to be runnable code — it has to be a thing the model can't negotiate with.
   - Visual: text-only

B5. **What does NOT make these skills work (common misreads).** — triggered by: "isn't it just that they're well-written?" — depth: L2
   - Content: not length (impeccable's SKILL.md is terse). Not tone (both are neutral, professional). Not examples (both have fewer than many skills that underperform). Not marketing (obra didn't market; it grew on word of mouth). The specific moves are what generalize.
   - Visual: text-only

B6. **Sources and who said what.** — triggered by: "where is this from?" — depth: L2
   - Content: obra's Oct 2025 blog post "Superpowers: How I'm using coding agents." Simon Willison's Oct 2025 writeup. Emelia Hub's reviews of both skills (Mar 2026). The GitHub READMEs for obra/superpowers, obra/superpowers-skills, pbakaus/impeccable. The impeccable reject-font list and absolute bans are quoted from its SKILL.md directly.
   - Visual: text-only

## Visual consistency notes
- Fifth register: **inked-blueprint on bone.** Deep prussian blue (`oklch(32% 0.12 245)`) as the decorative accent, a slightly desaturated oxblood (`oklch(38% 0.14 25)`) as `--accent-ink` for text emphasis. Bone paper at `oklch(96% 0.008 82)`, warm-ink body at `oklch(22% 0.015 260)`. The register is letterpress-technical — a small-press manual from the 1970s, printed in two ink plates on cream cotton stock. Distinct from v5 teal (cool cyan), v6 terracotta (warm clay), v7 plum/chartreuse (high-contrast complementary), v8 indigo/amber (neon-on-dark).
- Display: **Fraunk** (Pangram Pangram-adjacent; no reflex-list member). Body: **Tiempos Text** substitute via `Crimson Pro` — wait, Crimson is banned. Use **Literata** instead (Google Fonts, open-source, readable long-form, warm, not in the reject list). Mono: **JetBrains Mono** — not in the reject list, has the technical-manual register.
- Single highlight color; no gradients; no border-left stripes; body copy on paper clears ≥ 7:1 via the ink-on-bone pairing.

## What I cut (and why)
- A slide on "how to install both skills" — the audience already has them; install instructions are README material.
- A slide on competitive-landscape ("other skills that try this") — low content, high risk of sounding like a market analysis.
- A demo of running `/impeccable teach` on an empty project — live demo risk inside a 12-minute slot; moved to backup.
- The third example of a banned pattern — one (gradient text) plus one (border-left) carries the point; a third was padding.
- "The history of Claude Code skills" — audience doesn't need it and it's primacy waste.

## Handoff notes
- For pptx/design: fifth visual register documented above. Honor the bone/prussian palette; if substituting, keep the two-ink feel.
- Credits slide (if team effort): N/A — talk attributes obra and pbakaus on slide content; separate credits slide not needed.
- Licensing flags: no web-sourced imagery; all visuals are shape specs rendered by render-visual.js. No stock photos.
- **Design-context documented-assumption block** will ride as an HTML comment at the top of the rendered file (per html-renderer.md § Visual design inheritance), filled with feel, contrast math, font rejections honored, and impeccable bans held.

## Pressure-test log [size: Standard]
- Role adopted: the skeptical skill author — 4 years shipping Claude skills, already read both repos, pattern-matches "meta-talks on great design" as vague. Priors: hates brand adjectives, quotes obra's blog post back at presenters.
- Top critiques surfaced:
  1. *"Slide 1 is a quadrant without axes I can argue with. What makes 'enforcement strength' measurable?"* — fatal if the audience is measurement-minded. **Fix:** speaker notes now name the x-axis operationalization (pattern-specificity count; number of rebutted rationalizations; presence or absence of an external check). The visual axes stay conceptual; the speaker carries the rigor.
  2. *"Slide 3 leans on a single impeccable example. What's the superpowers parallel?"* — credibility. **Fix:** speaker notes added for slide 3 explicitly name the RED-GREEN-REFACTOR gate as the superpowers parallel so the two-skills-one-move claim has both data points on the same slide.
  3. *"Move four — 'naming is enforcement' — feels like a slogan."* — credibility. **Fix:** slide 6's speaker notes now specify the concrete mechanism: the model pattern-matches against its own output against the named catalogue; without the catalogue it invents its own "bad." Slogan becomes mechanism.
  4. *"The waterfall numbers are made up."* — minor but damaging. **Fix:** caption now says *"illustrative — the point is the shape, not the numbers"* on slide 9. Honesty is a persuasion tool.
  5. *"Why should I care about move three if I'm writing a non-code skill?"* — fatal for half the room. **Fix:** promoted B4 to backup trigger-ready; speaker notes on slide 5 now forward-reference the generalization ("deck-architect's lint is the same pattern applied to prose"). Audience sees the generalization without spending slide real-estate on it.
  6. *"Obra's Cialdini reference — manipulation framing."* — minor, but will derail Q&A if not pre-empted. **Fix:** B1 exists specifically to answer this in the trigger.
- Fixes applied: as above — five substantive changes (three speaker-note additions, one caption change, one backup slide trigger promotion). No slide titles changed.
- Live-meeting prep notes: rehearse the STAR-slide silence. After the Cialdini sentence lands, count two seconds before moving. The sentence is the slide.
