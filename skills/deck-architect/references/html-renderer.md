# HTML handoff contract

A renderer (manual, `/impeccable`, `reveal.js`, `slidev`, any agent) that turns a deck-architect outline into HTML **must** follow this contract. It encodes the failure modes we actually hit in past generations — not theoretical neatness.

If the target is `pptx`, `keynote`, or `google-slides`, skip this file — Phase 9's `pptx` handoff covers those.

**Start from the reference.** `references/html-renderer-reference.html` is a minimal working scaffold that implements every structural rule below. Adapt its colors, typography, and content per `/impeccable` — do not rebuild the scaffolding from scratch. The scaffolding is a solved problem with known failure modes; every re-derivation invites the same three bugs back (inline-notes disrupting layout, invisible shortcuts, fullscreen scroll drift).

---

## The failure modes this contract prevents

Observed in real generations. Each rule below ties back to one of these:

1. **Meta-guidance leaks onto slides.** `Triggered by: …`, `Depth L2`, `// The next 8 slides defend this claim`, `See B4` — authoring vocabulary rendered as audience-visible body copy.
2. **Speaker notes disappear.** The outline specifies them; the HTML drops them. The presenter has nothing to say that isn't on the slide.
3. **Appendix is invisible.** Backup slides render with a changed meta label and nothing else. A presenter advancing past the close walks straight into the reference material.
4. **Counter / meta row overflows.** `N / 16` renders as `N /` because the meta element isn't shrink-protected.
5. **Stock-AI aesthetics bleed in.** Gradient text, border-left accent stripes, cards-in-cards, reflex fonts — every rule impeccable bans, re-introduced by the renderer.
6. **Fragmented cover.** Three title-like text blocks (kicker + headline + subtitle) on the cover, each in a different typographic register, reading as three sentences instead of one unified deck name.

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

### 1a. Cover composition

The cover slide renders exactly one `<h1>` (the deck title) and **at most one** supporting element — a `<p class="subtitle">` of ≤ 12 words in the same voice, or a meta row with neutral metadata (time, format, author).

Forbidden on the cover:
- A kicker eyebrow *above* the title that reads as sentence part 1, with the `<h1>` reading as sentence part 2. The eye does not stitch them across vertical whitespace; the audience reads three fragments.
- Two text blocks of display-weight typography competing for primary position.
- A subtitle that introduces a *second* argument ("and the four moves that make them work") — that's a slide 2 promise, not cover copy.

If the outline specifies kicker + headline + subtitle, collapse to one title (merge the strongest part) plus at most one subtitle. Flag the merge in handoff notes.

```html
<!-- GOOD -->
<section class="slide" data-role="cover">
  <h1>What makes impeccable and superpowers great skills.</h1>
  <p class="subtitle">For Claude Code authors who already ship their own.</p>
  <div class="cover-meta">Design-lessons talk · 12 min</div>
</section>

<!-- BAD — three competing title fragments -->
<section class="slide" data-role="cover">
  <p class="kicker">THE TWO SKILLS EVERYONE IS COPYING</p>
  <h1>And the four moves that actually make them work.</h1>
  <p class="subtitle">A study of impeccable and superpowers for Claude Code authors.</p>
</section>
```

The test: read the cover aloud. If it sounds like three sentences with different cadences, it's broken.

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

**Notes must carry real content — target ≥ 20 characters of meaningful text.** One-word notes ("context" or "examples") fail the lint and are indistinguishable from a placeholder. If the outline's speaker-notes field is genuinely thin, that's a Phase 3 problem — go back and write real notes, don't paper over it at render time.

### 3. Appendix divider

The divider slide is a full-screen pause. Minimum content:

```html
<section class="slide" data-role="appendix-divider">
  <p class="appendix-label">Appendix</p>
  <h1>Reference material — triggered on question.</h1>
  <p class="appendix-hint">B1–BN · depth indicators on each slide</p>
</section>
```

**The divider has no meta row.** No counter chip, no section label — the point is a dramatic pause, and a counter in the top-right next to the word "Appendix" competes for the same attention. The divider is a navigational marker, not content. The counter continuity resumes on the first appendix slide (see §5 for the math).

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

**Counter numbering — the full rule:**

- **Counter-bearing slides:** `main`, `appendix`, `credits`. These show the counter chip.
- **Counter-less slides:** `cover` and `appendix-divider`. These show no meta row at all.
- **Denominator:** total slide count minus the cover (i.e. every physical slide from the first main onward, including the divider).
- **Numerator:** the slide's position in the file, counting from 1 at the first main slide. The divider occupies one position but does not display it.
- **Never reset** between main and appendix — the counter is continuous.

Worked example, 1 cover + 10 main + 1 divider + 5 appendix = 17 physical slides, denominator 16:

```
cover          → no counter
main 1         → 01 / 16
main 2         → 02 / 16
…
main 10        → 10 / 16
divider        → no counter (position 11 is consumed but not shown)
appendix 1     → 12 / 16
appendix 2     → 13 / 16
…
appendix 5     → 16 / 16
```

Rationale: the presenter navigates by absolute slide index at runtime; `B1 / 5` forces them to mentally translate. The `data-section` label on backup slides (e.g. `B1 · Command list`) carries the "this is backup content" signal — the counter stays continuous.

### 5a. Visual specs — how topology becomes inline SVG

Chains, graphs, sequences, 2×2 quadrants, and waterfalls auto-earn a visual (see `visuals.md`). The renderer embeds them as `<figure data-visual-spec='…'>` placeholders in the HTML, then runs `scripts/render-visual.js` as a post-processing pass to swap each placeholder for inline SVG.

**Placeholder format:**

```html
<figure data-visual-spec='{"type":"flow","nodes":[{"id":"a","label":"using-superpowers","role":"entry"},{"id":"b","label":"brainstorming"},{"id":"c","label":"writing-plans","highlight":true}],"caption":"the handoff chain"}' data-label="superpowers chain"></figure>
```

- `data-visual-spec` — JSON literal of the spec. Must validate against one of the five shipped shapes.
- `data-label` — short accessible label; becomes `aria-label` on the rendered figure.

**Design-token inheritance — the unification mechanism:**

The renderer parses the deck's own `:root { --accent: …; --ink: …; --sans-font: …; }` block and passes those tokens into every shape renderer. Colors, typography, and stroke weight in the SVG come from the same source as the CSS. If the deck's accent changes, the next render picks it up automatically. No SVG has hardcoded palette values.

The tokens honored: `--accent`, `--ink`, `--ink-2`, `--muted`, `--paper`, `--paper-2`, `--rule`, `--strike`, `--display-font`, `--sans-font`, `--mono-font`. The renderer ships sensible defaults if any are absent, so decks without a full token set still render, just with fallback aesthetics.

**Pipeline order:**

1. Generate HTML (includes `<figure data-visual-spec>` placeholders).
2. Run `render-visual.js` — swaps placeholders for inline SVG.
3. Run `lint-deck.js` — catches any remaining `data-visual-todo` on main-flow slides.

**When a visual can't fit a shape** (screenshots, photographs, hand-drawn, custom illustrations): emit `<figure data-visual-todo="one-line description">`. The lint flags it on main-flow slides but permits it in the backup layer as a work-in-progress artifact.

**Forbidden inside SVG:**

The impeccable bans carry over. The renderer enforces them; a custom shape extension must not reintroduce them:

- No gradient fills or strokes
- No drop shadows on rounded rectangles (in fact: no rounded corners anywhere in the shipped shapes — flat geometric only)
- No reflex default typography — the SVG inherits the deck's display/sans/mono fonts; if the deck is clean, the SVG is clean
- No fill tints as a "nice touch" — accent used sparingly per the 60/30/10 discipline

### 6. Viewport model — toggle, not scroll

Each slide is a full-viewport layer; the active slide is revealed via a class swap. Do **not** use a document-scroll model with `min-height: 100vh` slides — that re-introduces the fractional-fullscreen bug (F lands on whatever scroll position was last, so the first slide after toggling in is vertically mis-aligned).

**Required CSS pattern:**

```css
html, body { height: 100%; overflow: hidden; }
.deck  { position: fixed; inset: 0; }
.slide { position: absolute; inset: 0; display: none; overflow: hidden; }
.slide.active { display: flex; flex-direction: column; }
```

`html, body { overflow: hidden }` is load-bearing — it's what makes fullscreen predictable. The active slide owns the viewport; there is no scroll.

### 7. Composition — three regions, body centered

Every active slide is a flex column with three regions: **meta** (top, `flex: 0 0 auto`) · **body** (`flex: 1 1 auto`, centered) · **footer** (bottom, `flex: 0 0 auto`). Content anchors to slide center, not top. This is what makes vertical rhythm predictable across every slide — the designer commits to a composition and the scaffold holds it.

```css
.slide.active {
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
}
.slide > .meta,
.slide > .footer { flex: 0 0 auto; }
.slide > .body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;   /* vertical center inside the middle row */
  min-height: 0;             /* allow flex shrinking */
}
```

Markup inside every `main` / `appendix` slide wraps content in a `<div class="body">`:

```html
<section class="slide" data-role="main">
  <div class="meta">…</div>
  <div class="body">
    <h1>…</h1>
    <p>…</p>
  </div>
  <div class="footer"></div>
  <aside class="notes">…</aside>
</section>
```

The cover slide skips the meta row but keeps the `.body` wrapper so centering still works.

### 8. Speaker notes tray — NO inline rendering, ever

`<aside class="notes">` is `display: none` in its source position, **always**. It never renders inline under its slide, not even "hidden by default and shown with S." Per-slide inline notes — even when toggled — destroy slide composition mid-presentation because the slide's vertical rhythm is no longer what the designer committed to.

Notes surface through a single fixed presenter-mode tray:

```html
<div id="notes-tray" role="region" aria-label="Speaker notes" aria-hidden="true">
  <div class="tray-head" id="notes-tray-head">speaker notes</div>
  <div id="notes-tray-body"></div>
</div>
```

**Tray contract:**

- Fixed position, anchored bottom: `position: fixed; left: 0; right: 0; bottom: 0; max-height: 38vh`.
- Hidden by default via `transform: translateY(100%)`; open via `transform: translateY(0)` on `[data-open="true"]`.
- Head reads `speaker notes · slide N`. Body reads the **active** slide's `aside.notes` text content. Contents swap live when the presenter navigates while the tray is open.
- `S` toggles. `Esc` closes. When the tray is open, the keyboard hint pill hides (see §9).

The reference scaffold's `syncTray()` function is the canonical implementation — keep that shape.

### 9. Keyboard hint pill — always visible, documented-in-README does not count

A fixed `#kbd-hint` element anchored bottom-right shows the keyboard contract at all times:

```html
<div id="kbd-hint" aria-hidden="true">
  <kbd>&larr;</kbd><kbd>&rarr;</kbd> slide &middot; <kbd>S</kbd> notes &middot; <kbd>F</kbd> fullscreen
</div>
```

**Behavior:**

- Always rendered. Dims to 25% opacity after 4 seconds of inactivity; wakes on `mousemove` or `keydown`.
- Hidden when the notes tray is open (the presenter is already looking there).
- Hidden in print.

The failure mode this catches: keyboard shortcuts documented only in a README or source comment are invisible to anyone who didn't read them. The pill is the contract.

### 10. Keyboard bindings

- `←` / `→` / `PageDown` / `PageUp`: prev / next slide (via `.active` swap, not scrollIntoView).
- `Home` / `End`: first / last.
- `S`: toggle notes tray.
- `F`: toggle fullscreen.
- `Esc`: close tray if open; otherwise exit fullscreen.
- Hash deep-link (`#7` → slide 7, 1-indexed) survives reload; `history.replaceState` updates the hash on navigation.

### 11. `fullscreenchange` handler is mandatory

Every deck that calls `requestFullscreen()` must register a `fullscreenchange` listener that re-asserts the active slide on the next animation frame:

```js
document.addEventListener('fullscreenchange', () => {
  requestAnimationFrame(() => {
    document.scrollingElement.scrollTop = 0;
    show(index);  // re-apply .active to the current slide
  });
});
```

Why: some browsers shift `scrollTop` on the scrolling element when entering or exiting fullscreen. In the toggle model this is milder than in a scroll-snap model — the active slide is already `position: absolute; inset: 0` — but browser-specific drift can still leave focus or scroll state mis-aligned after an F toggle. Re-asserting the active slide is cheap insurance.

A `requestFullscreen()` call with no `fullscreenchange` listener is a bug even if the specific browser you're testing in happens not to drift.

### 12. Print override

For PDF export (`⌘P` / `Ctrl+P`):

```css
@media print {
  html, body { height: auto; overflow: visible; }
  .deck { position: static; }
  .slide {
    position: static; inset: auto;
    display: flex !important;     /* all slides visible */
    page-break-after: always;
    min-height: 100vh;
  }
  aside.notes { display: block; }  /* notes render inline in print only */
  #notes-tray, #kbd-hint { display: none !important; }
}
```

Print is the **only** context where `aside.notes { display: block }` is allowed. On screen, notes are always tray-only.

---

## Visual design inheritance

The HTML renderer inherits its aesthetic discipline from `/impeccable`. Before rendering, the renderer **must** either:

1. Confirm the project has a `.impeccable.md` design context, or
2. Invoke `/impeccable teach` to build one, or
3. Explicitly assume a default and document the assumption using the template below.

**Two non-negotiables whenever the palette is agent-picked** (paths 2 and 3 — only path 1, `.impeccable.md`, is exempt because a human already decided):

- **Commit to a one-sentence "feel."** Before picking any colors, write one concrete sentence describing the aesthetic register you are aiming for. Not three brand adjectives — one sentence with a noun the audience can picture. "A xerox zine pressed onto cream paper," "an architect's dark-mode CAD workspace," "a Financial Times print spread on a matte projector." This sentence is the load-bearing constraint the palette must serve. If you cannot write it, you cannot pick colors — go back and specify the feel first.
- **Every palette token pair used together must clear WCAG contrast.** Compute, don't eyeball. For every (foreground, background) pair that will actually render as text or meaningful UI, the contrast ratio must be ≥ **4.5:1** for body text and ≥ **3:1** for large display text (≥ 24px or ≥ 18.66px bold). An OKLCH lightness delta of ~50 points is a reasonable first approximation — but verify the final hex/OKLCH values with a real contrast check before shipping.

**The two-tone accent pattern.** A single accent token is a trap: bright enough to read as accent on a light background, too pale to use as text. Ship two:

- `--accent` — identity / decoration only. Highlighter bands, chart fills, background tints. Never `color:` on text.
- `--accent-ink` — the same hue at a lower L (typically L ≤ 50% on light themes, ≥ 70% on dark themes) with preserved chroma. This is the token allowed on text (`color: var(--accent-ink)`).

The CSS rule: `color: var(--accent)` on body text is a bug. If the deck uses an accent color for readable text, it uses `--accent-ink`.

### The text-color token whitelist — contract that makes contrast lintable

A real contrast check needs a CSS parser plus OKLCH-to-L\* math plus a lightness computation across cascades. That's fragile in a regex lint. Instead we contract on **token naming**: only tokens whose names signal "text-safe" may appear in a `color:` declaration. The author commits to contrast at naming time; the lint enforces the name.

**Text-safe token names (the whitelist).** These are the only identifiers allowed after `color: var(` in deck CSS:

| Token | Use | Required contrast |
|---|---|---|
| `--ink` | Primary text on paper | ≥ 7:1 vs paper |
| `--ink-2` | Secondary text, subtitles | ≥ 4.5:1 vs paper |
| `--ink-mute` / `--muted` | Muted text, metadata, meta rows | ≥ 4.5:1 vs paper |
| `--paper` / `--paper-2` | Text on inverted backgrounds (tray, dark theme) | ≥ 4.5:1 vs ink |
| `--accent-ink` | Accent-hued text on paper | ≥ 4.5:1 vs paper |
| `--accent-on-ink` | Accent-hued text on ink (optional; add only if needed) | ≥ 4.5:1 vs ink |

**Anything else is a contract violation.** `color: var(--accent)`, `color: var(--rule)`, `color: var(--strike)`, or a literal `color: oklch(…)` in a text context are all caught by the same rule. The `color:` property takes a text-safe named token, and the named token commits to meeting contrast.

Where an inline literal is unavoidable (e.g. terminal-output semantic colors like `.fail`), keep it inline but honor contrast:

```css
pre.term .fail { color: oklch(42% 0.17 28); }  /* dark enough for text on paper */
```

The lint permits literal `color: oklch(…)` but a human reviewer still owes contrast. Named tokens are the path of least friction; reach for literals only when the semantics are genuinely one-off.

**Why this works.** The rule is: *"any text-safe identity concept gets a `-ink` suffix (or equivalent text-safe name); any decoration-only concept does not."* Authors pick colors freely; the naming convention gates what can go on text. The lint is a string match over identifier names — cheap, robust, and it catches the exact failure mode (v7's `color: var(--accent)` on L=97% paper with an L=86% chartreuse accent).

**Template for the "documented assumption" path** (when options 1 and 2 aren't available — e.g., non-interactive agent run). Embed this as an HTML comment at the top of the rendered file so the user can override on sight:

```html
<!--
  design-context (inferred, no .impeccable.md present)

  feel         : one concrete sentence with a noun the audience can picture.
                 e.g. "a xerox zine pressed onto cream paper",
                 "an architect's dark-mode CAD workspace".
                 NOT three adjectives — one sentence.
  audience     : [one line — who reads this and where]
  viewing ctx  : [one line — when/where/under what light]
  theme        : [light | dark] — because [one-line rationale tied to audience]
  brand words  : three concrete words for voice (e.g. "opinionated, instrumented, tested")
                 NOT "modern" / "elegant" / "sleek" — dead categories.
  font pick    : display = [name], body = [name], mono = [name]
                 rejected reflexes: [≥3 names from impeccable reject list you
                 actively chose against]
  palette      : OKLCH, tinted toward [hue]. Accent pair:
                   --accent     = oklch(L₁ C H)   (decoration only)
                   --accent-ink = oklch(L₂ C H)   (on-text; L₂ chosen so
                                                  contrast vs paper ≥ 4.5:1)
                 ≤10% visual weight for accent.
  contrast     : body-ink vs paper   = X.X:1  (≥ 4.5 required)
                 accent-ink vs paper = X.X:1  (≥ 4.5 required)
                 display-ink vs paper= X.X:1  (≥ 3.0 required)
                 verified with [tool/method — e.g. WebAIM checker, OKLCH
                 L-delta estimate ≥ 50 points].
  bans held    : no reflex fonts, no gradient text, no border-left>1px,
                 no cards-in-cards, no pure #000 / #fff.
-->
```

Anything vaguer than this — a one-line "using a warm palette" — is not a documented assumption; it is a hole. The user can't override what the renderer didn't decide. A filled template that skips the `feel` or `contrast` lines is also a hole — those are the two hardest things to re-derive by reading the code.

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

### Static structure

Check each item; a "no" is a blocker. `scripts/lint-deck.js` automates these.

- [ ] Exactly one `cover` slide; at the front
- [ ] Every slide has `data-role`
- [ ] Every `main` and `appendix` slide has an `<aside class="notes">` (not empty)
- [ ] If any `appendix` exists, exactly one `appendix-divider` precedes it
- [ ] No `main` slide body contains a banned meta phrase
- [ ] No `aside.notes { display: block }` in screen CSS — tray-only, print-only exception
- [ ] `#notes-tray` element is present
- [ ] `#kbd-hint` element is present
- [ ] `requestFullscreen` is paired with a `fullscreenchange` listener
- [ ] No reflex fonts (impeccable reject list)
- [ ] No gradient text, no `border-left` accent stripes, no cards-in-cards

### Live-presentation dry run

After the lint passes, actually drive the deck. Each failure maps to a real bug we've shipped:

1. Load the deck → default slide lands centered (not top-anchored).
2. `→` five times → every slide lands centered.
3. `F` → centering still holds on the current slide.
4. `→` inside fullscreen → still centered.
5. `F` again (exit fullscreen) → current slide is still centered, not drifted.
6. `S` → tray slides up from the bottom with the current slide's notes. Head reads `speaker notes · slide N`. Hint pill is hidden.
7. `→` with tray open → tray contents swap live to the next slide's notes.
8. `Esc` → tray closes, hint pill returns.
9. Reload the page with `#7` in the URL → lands on slide 7.
10. `⌘P` / `Ctrl+P` → one slide per page, notes render inline under each slide, no tray, no hint pill.

Any failure → back to the structural contract. Do not "fix it in the moment" — the same bug ships next time.

---

## Starting point

`references/html-renderer-reference.html` is a minimal two-slide deck implementing every rule above end-to-end. Start from it. Adapt the `:root` palette, typography variables, and content — leave the scaffolding (viewport model, composition, tray, hint pill, keyboard/fullscreen handlers, print override) alone. The scaffolding is a contract, not a style sheet; the look is inherited from `/impeccable`.
