# HTML handoff contract

A renderer (manual, `/impeccable`, `reveal.js`, `slidev`, any agent) that turns a deck-architect outline into HTML **must** follow this contract. It encodes the failure modes we actually hit in past generations — not theoretical neatness.

If the target is `pptx`, `keynote`, or `google-slides`, skip this file — Phase 9's `pptx` handoff covers those.

---

## The failure modes this contract prevents

Observed in real generations. Each rule below ties back to one of these:

1. **Meta-guidance leaks onto slides.** `Triggered by: …`, `Depth L2`, `// The next 8 slides defend this claim`, `See B4` — authoring vocabulary rendered as audience-visible body copy.
2. **Speaker notes disappear.** The outline specifies them; the HTML drops them. The presenter has nothing to say that isn't on the slide.
3. **Appendix is invisible.** Backup slides render with a changed meta label and nothing else. A presenter advancing past the close walks straight into the reference material.
4. **Counter / meta row overflows.** `N / 16` renders as `N /` because the meta element isn't shrink-protected.
5. **Stock-AI aesthetics bleed in.** Gradient text, border-left accent stripes, cards-in-cards, reflex fonts — every rule impeccable bans, re-introduced by the renderer.

---

## Mandatory structure

### 1. Semantic section roles

Every slide element must declare its role via `data-role`:

| `data-role` | When | Required? |
|---|---|---|
| `cover` | The title slide. One per deck. | Yes |
| `main` | Main-flow content slides (Phase 3 output). | Yes |
| `appendix-divider` | The visual break between last main slide and first backup. Exactly one. | **Yes, if backup layer exists** |
| `appendix` | Backup slides (Phase 7 output). | Yes, if backup exists |
| `credits` | Sources / attribution / honest flags. Optional. | — |

The renderer must fail loudly (or the lint must catch it) if `appendix` slides appear without a preceding `appendix-divider`.

### 2. Speaker notes as a first-class element

Every `main` and `appendix` slide **must** include an `<aside class="notes">` element containing the outline's `Speaker notes:` block verbatim (minus the label).

```html
<section class="slide" data-role="main" data-section="STAR · reframe">
  <!-- slide body -->
  <aside class="notes" hidden>
    Quote obra: "If you have a skill to do something, you must use it."
    The audience will expect a tour of features; we're giving them a design pattern.
  </aside>
</section>
```

Default CSS: `.notes { display: none; }`. Presenter mode (`S` keypress) toggles a side panel that reveals them — see keyboard nav below.

**A slide without a speaker-notes aside is a missing output.** If the outline didn't specify notes, the renderer should emit `<aside class="notes" data-missing="true"></aside>` so the lint can flag it — not silently drop the element.

### 3. Appendix divider

The divider slide is a full-screen pause. Minimum content:

```html
<section class="slide" data-role="appendix-divider">
  <p class="appendix-label">Appendix</p>
  <h1>Reference material — triggered on question.</h1>
  <p class="appendix-hint">B1–BN · depth indicators on each slide</p>
</section>
```

**The divider is not optional when backup slides exist.** Presenters need an unambiguous visual cue that the main argument has closed.

### 4. Distinct visual treatment for backup slides

Every `appendix` slide must visibly differ from `main`. Acceptable treatments (pick one, apply consistently):

- Tinted background (e.g. `--paper-2` instead of `--paper`)
- Persistent `REFERENCE` watermark in the meta row
- De-emphasized headline weight / size
- Monospaced meta row shift (main uses sans, appendix uses mono)

What does **not** count: changing only the top-left label text. That is too easy to miss live.

### 5. Meta row must not overflow

If the deck has a `counter` or `section-label` in a meta row, those elements must survive viewport clipping:

- Fixed-width or `flex-shrink: 0` on the counter
- `min-width: 0` + `overflow: hidden` + `text-overflow: ellipsis` on any flexible sibling
- Test at viewport widths down to 960px

A truncated `N /` counter is the canonical smell that the meta row wasn't tested.

### 6. Keyboard navigation minimum

- `←` / `→` / `PageDown` / `PageUp`: prev/next slide
- `Home` / `End`: first / last
- `S`: toggle presenter mode (reveals `<aside class="notes">` in a side or overlay panel)
- `F`: toggle fullscreen
- `Esc`: exit fullscreen / presenter mode

Hash-based deep-links (`#7` for slide 7) should survive reload.

---

## Visual design inheritance

The HTML renderer inherits its aesthetic discipline from `/impeccable`. Before rendering, the renderer **must** either:

1. Confirm the project has a `.impeccable.md` design context, or
2. Invoke `/impeccable teach` to build one, or
3. Explicitly assume a default and document the assumption in the handoff notes so the user can override.

Downstream rules the renderer inherits (non-exhaustive — see `impeccable/SKILL.md` for the full list):

- **Typography.** Reject every font in impeccable's `reflex_fonts_to_reject` list. Inter, DM Sans, Fraunces, Instrument Serif, Space Grotesk — banned.
- **Color.** OKLCH, tinted neutrals, one accent. No gradient text (`background-clip: text` + gradient). No pure black/white.
- **Layout.** No `border-left` or `border-right` > 1px as accent stripes. No cards-in-cards. Varied spacing — not the same padding everywhere.
- **Motion.** Transform/opacity only. No bounce/elastic easing.
- **Theme.** Derived from audience + viewing context, not a default.

If a deck-architect outline contradicts impeccable's bans (unlikely — the two skills are orthogonal), the more-specific visual rule wins. Flag the contradiction in handoff notes.

---

## Forbidden slide-body content (renderer-side)

Even when the outline includes meta-guidance (unlikely, but guard against it), the renderer **must not** place the following in audience-visible slide body. They go in `<aside class="notes">` or are deleted:

- Any reference to another slide by ID (`See B4`, `slide 7`, `as covered earlier`)
- Depth indicators (`L2`, `L3`, `depth:`)
- Trigger annotations (`Triggered by:`, `For questions about:`)
- Structural commentary (`The next N slides …`, `In the following section …`)
- Skill-authoring shorthand (`// …` structural notes, `[INFERRED — confirm]` markers that should have been resolved)

See `forbidden-phrases.md` for the full audience-facing ban list (also applies here).

---

## Minimal renderer checklist (run before presenting the file)

Check each item; a "no" is a blocker:

- [ ] Exactly one `cover` slide; at the front
- [ ] Every slide has `data-role`
- [ ] Every `main` and `appendix` slide has an `<aside class="notes">` (not empty)
- [ ] If any `appendix` exists, exactly one `appendix-divider` precedes it
- [ ] No `main` slide body contains a banned meta phrase (see above)
- [ ] Backup slides visibly differ from main (not just a label change)
- [ ] Counter / meta row survives at 960px viewport
- [ ] `S` reveals speaker notes; `F` goes fullscreen; `←/→` navigates
- [ ] No reflex fonts (impeccable reject list)
- [ ] No gradient text, no `border-left` accent stripes, no cards-in-cards
- [ ] Deck loads without console errors

The companion lint at `scripts/lint-deck.js` automates the static-checkable items.

---

## Ready-to-paste template

A minimal skeleton that conforms to this contract:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{{ deck title }}</title>
  <style>
    :root {
      /* Derived from .impeccable.md — OKLCH, tinted neutrals, one accent */
      --paper: oklch(96.5% 0.018 82);
      --paper-2: oklch(93% 0.022 82);
      --ink: oklch(18% 0.018 50);
      --accent: oklch(56% 0.205 32);
      --rule: oklch(82% 0.025 80);
    }
    body { margin: 0; background: var(--ink); color: var(--ink); }
    .slide { position: absolute; inset: 0; background: var(--paper); padding: 6vw 7vw; display: none; flex-direction: column; gap: 3vh; }
    .slide.active { display: flex; }
    .slide[data-role="appendix"] { background: var(--paper-2); }
    .slide[data-role="appendix"] .meta::before { content: "REFERENCE · "; color: var(--accent); }
    .slide[data-role="appendix-divider"] { justify-content: center; text-align: left; }
    .meta { display: flex; justify-content: space-between; border-bottom: 1px solid var(--rule); padding-bottom: 12px; }
    .meta .section { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .meta .counter { flex-shrink: 0; font-variant-numeric: tabular-nums; }
    .notes { display: none; }
    body.presenter .notes { display: block; position: fixed; right: 0; top: 0; bottom: 0; width: 36vw; background: var(--ink); color: var(--paper); padding: 24px; overflow: auto; z-index: 10; }
    /* Typography, layout, etc. — derived from .impeccable.md */
  </style>
</head>
<body>
<div class="deck">
  <section class="slide" data-role="cover">…</section>
  <section class="slide" data-role="main" data-section="…">
    <div class="meta"><span class="section">01 · …</span><span class="counter">01 / N</span></div>
    …
    <aside class="notes">Speaker says …</aside>
  </section>
  <!-- main slides -->
  <section class="slide" data-role="appendix-divider">
    <p class="appendix-label">Appendix</p>
    <h1>Reference material — triggered on question.</h1>
  </section>
  <section class="slide" data-role="appendix" data-section="B1 · …">
    <div class="meta"><span class="section">B1 · …</span><span class="counter">11 / N</span></div>
    …
    <aside class="notes">…</aside>
  </section>
  <!-- appendix slides -->
</div>
<script>
  // keyboard nav: ← → PageUp PageDown Home End
  // S → presenter mode, F → fullscreen, Esc → exit
  // hash deep-link + reload
</script>
</body>
</html>
```

This is a contract, not a style sheet. The look is inherited from `/impeccable`. The *structure* above is the non-negotiable part.
