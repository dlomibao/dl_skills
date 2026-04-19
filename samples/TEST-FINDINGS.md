# Test findings — deck-architect v2.2.0

Three subagent test runs implemented the PR test plan. Each subagent received only the `SKILL.md` path with explicit instructions not to pre-load any references. They reported which references they actually loaded, which tools they called, and whether the skill's enforcement landed.

| Test | Prompt type | Pass | Notable |
|---|---|---|---|
| [A](test-a-fresh-deck-trigger.md) | Fresh deck (Q3 reliability retro) | ✅ | Phase 0 fired; 2 refs loaded |
| [B](test-b-existing-draft.md) | Existing 28-slide draft to fix | ✅ | Existing-draft path correctly identified; 28 → 10 cut with reasons |
| [C](test-c-pitch-websearch.md) | Pitch deck with hook image | ✅ | **WebSearch actually fired 3×**; no fabricated URLs |

## Test plan completion

From the original PR description:

| Item | Status |
|---|---|
| Trigger with "help me make a deck about X" → Phase 0 fires | ✅ Test A — Phase 0 first thing in output |
| Trigger with "I have an existing draft, help me fix it" → Phase 4 working mode | ✅ Test B — quoted the SKILL.md instruction; ran existing-draft path |
| Verify references load on demand (not auto-loaded) | ✅ All 3 tests — references loaded only when their phase fired (see matrix below) |
| Verify `WebSearch` invoked for image-needing slides | ✅ Test C — 3 actual searches with specific queries |
| Run a Standard pressure test and confirm log appears | ✅ All 3 tests — Standard size, 7 quoted critiques each |

## Reference-loading matrix

Which reference each test loaded, and why:

| Reference | Test A | Test B | Test C | Notes |
|---|---|---|---|---|
| `slide-craft.md` | ✅ | ✅ | ✅ | Loaded reliably — Phase 3 instruction is unambiguous |
| `pressure-test.md` | ✅ | ✅ | ✅ | Loaded reliably — Phase 6 instruction is unambiguous |
| `forbidden-phrases.md` | ❌ | ✅ | ✅ | **Ambiguous trigger** — see Finding #1 |
| `visuals.md` | ❌ | ❌ | ✅ | Loaded only when an image was needed (correct) |
| `example.md` | ❌ | ❌ | ❌ | Optional reference; never loaded |
| `rationalizations.md` | ❌ | ❌ | ❌ | No skill instruction to load — content is implicit guidance |
| `failure-modes.md` | ❌ | ❌ | ❌ | Marked as background reading; never loaded |

**Net:** the loading-semantics fix from v2.1.0 works for the 4 references with explicit "Read X" instructions. The 3 references without explicit instructions never loaded. Two of those (`example`, `failure-modes`) are correctly marked as optional. One (`rationalizations`) might warrant an explicit load instruction if used regularly.

---

## Findings (actionable for next skill iteration)

### Finding 1 — `forbidden-phrases.md` trigger is ambiguous (Tests A + C confirm)

The Phase 4 instruction reads: *"Read `references/forbidden-phrases.md` for the reject-on-sight phrase list and structural tells. Rewrite with specifics."*

- Test A treated this as **conditional** (only when AI Slop Test fails) and skipped the load, relying on the inline TL;DR. Quote: *"A stricter read says I should have loaded it."*
- Test C loaded it **proactively** during fresh persuasive copy. Quote: *"the deck is fresh persuasive copy where slop risk is highest."*
- Test B loaded it because the existing draft visibly contained slop ("Key Themes," "Theme 1/2/3").

**Proposed fix:** rewrite the Phase 4 instruction to either:

- **Strict:** *"Read `references/forbidden-phrases.md` at the start of Phase 4."* (always loads)
- **Explicit-conditional:** *"If any slide title or body bullet contains a forbidden phrase from the inline TL;DR, Read `references/forbidden-phrases.md` for the full list and structural tells."* (only loads when needed)

Either resolves the ambiguity. The strict version is safer; the conditional version saves one load per run when the inline TL;DR catches everything.

### Finding 2 — Existing-draft path is one sentence (Test B)

The existing-draft instruction at the top of "Workflow" says: *"If the user brings an existing draft, don't start from scratch — but don't skip Phase 0 either. Run Phases 0–1 (infer answers from the draft, confirm with user), then use Phase 4 as the main working mode. Output a revised outline plus a 'what changed and why' section."*

Test B's friction note: *"It tells you to use Phase 4 as the 'main working mode' but doesn't say what to do about Phases 2 (spine), 3 (slide list), 5 (visuals), 6 (pressure test), 7 (backup), 8 (output). I assumed: still run them all, just driven off the existing draft rather than a blank page. That worked, but it's an inference — the skill could be explicit."*

**Proposed fix:** add one sentence after the existing-draft instruction: *"All other phases still run, driven by the existing draft rather than a blank page — Phase 2 (spine) often re-validates the existing structure, Phase 3 (slide list) becomes a slot-by-slot revision, Phases 5–8 unchanged."*

### Finding 3 — Phase 8 output schema has no slot for "what changed and why" (Test B)

The existing-draft instruction asks for a "what changed and why" section, but the Phase 8 output schema has no place for it. Test B added one inline; the skill should bake it in.

**Proposed fix:** add to the Phase 8 output schema, immediately after the "What I cut" section:

```markdown
## What changed and why (existing-draft path only — omit for fresh decks)
- [Structural change to the deck] — reason
- ...
```

### Finding 4 — No slide-count ceiling for "external customer business review" (Test B)

Test B picked 10 slides for a customer renewal review by analogy to "Live exec update" (5–10). Reasonable, but the skill could be explicit.

**Proposed fix:** add one row to the Phase 4 slide-count ceilings table:

| Deck type | Ceiling |
|---|---|
| ... | ... |
| External customer business review | 8–12 + appendix |

### Finding 5 — Don't-infer-takeaway rule conflicts with existing-draft mode (Test B)

Phase 1 says: *"Don't infer the takeaway — help the user articulate it instead."* In existing-draft mode there's no live dialogue, so the skill needs to say what to do.

Test B's resolution: leave the takeaway as a templated sentence with a hard "user must fill this in" note. This is correct behavior, but the skill doesn't tell you to do it.

**Proposed fix:** amend the Phase 1 takeaway exception: *"Don't infer this — help the user articulate it instead. **Exception in existing-draft mode without live dialogue:** templatize the takeaway with `[USER: write the one-sentence takeaway]` and explicitly flag it as a blocking item before the deck is presentable."*

### Finding 6 — WebSearch returns library pages, not direct image URLs (Test C)

The Phase 5 instruction says to surface "2–3 candidate URLs" with fit notes. Test C's WebSearch returned iStock/Getty/StockCake category pages, not specific hero-image URLs. The agent surfaced these honestly with a caveat — the alternative would be fabrication, which the skill correctly forbids.

**Proposed fix:** clarify Phase 5 / `references/visuals.md` to acknowledge this real-world constraint. Suggested wording: *"WebSearch typically returns stock-library collection pages, not direct image asset URLs. Surface the collection URLs with a one-line query that locates a specific frame, and explicitly note the user must pick the frame and clear the license. Recommend the user shoot their own image when the concept is genuinely specific (a real lockscreen, a real product UI, a real whiteboard) — phone-shot beats stock photo for hooks."*

### Finding 7 — `rationalizations.md` is never loaded (no triggering instruction)

`references/rationalizations.md` contains the "excuses for skipping the brief" table and the "red flags while drafting" list. Tests A, B, C all proceeded without loading it. The content is enforcement-relevant but has no explicit `Read` instruction in SKILL.md.

**Two options:**
1. **Add a load instruction** — e.g., "Read `references/rationalizations.md` if the user pushes back on Phase 0 questions or you find yourself wanting to skip a phase."
2. **Fold the most critical content inline** as a TL;DR similar to the AI Slop Test treatment, then leave the file as background.

Option 2 is more consistent with the v2.2.0 polish pattern. The "red flags while drafting" list is the most leverage; a 3-bullet inline summary in the Phase 3 area would catch most of the value.

---

## Summary

The v2.1.0 loading-semantics fix is working: references with explicit "Read X" instructions load reliably; references without them don't. The remaining issues are wording clarifications (Findings 1, 2, 5, 6), one schema gap (Finding 3), one missing table row (Finding 4), and one orphan reference (Finding 7).

None of these are blockers. The skill produced three distinct, high-quality outputs that all followed the workflow, all included the load-bearing slides (tradeoff + rollback in main flow), all closed correctly, and all produced honest pressure-test logs with classified critiques.

**Recommended:** address Findings 1, 2, 3, and 6 as a follow-up patch (`v2.3.0`). Findings 4, 5, 7 are nice-to-haves. The PR is mergeable as-is — these findings document themselves as the next backlog item.
