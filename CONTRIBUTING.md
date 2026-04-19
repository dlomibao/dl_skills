# Contributing

## Skill conventions (enforced by `scripts/lint-skills.sh`)

Each installable skill lives at `skills/<name>/SKILL.md` and must:

- **`name`** in frontmatter matches the directory name and is kebab-case (`my-skill`, not `My_Skill`)
- **`description`** is 50–1024 characters — long enough to trigger reliably, short enough to fit context
- **`version`** is semver (recommended)
- **`license`** matches the repo license (recommended)
- **`allowed-tools`** (if present) lists only canonical tool names — see `KNOWN_TOOLS` in `scripts/lint-skills.sh`
- All `references/*.md` links inside `SKILL.md` resolve

Skills with `_` or `.` prefixes (e.g. `_template`, `.draft`) are skipped by the linter and the install script — use those prefixes for templates and work-in-progress.

## Layout

```
skills/<name>/
  SKILL.md          # required — frontmatter + instructions
  references/       # optional — depth loaded on demand
    *.md
  scripts/          # optional — helper scripts the skill calls
  ...
samples/<name>/     # optional — real outputs, test runs, regression evidence
  README.md         # index of what's here
  *.md
```

Keep `SKILL.md` lean (target <500 lines — the linter warns above that). Move depth into `references/*.md` files and link to them from SKILL.md so they load only when needed.

Samples directories are scoped per skill (`samples/<skill-name>/`) so multiple skills can each ship their own test artifacts without colliding. Each sample dir should have a `README.md` index listing what's inside.

**Why samples live at the repo root, not inside `skills/<name>/`:** when the Vercel `skills` CLI installs a skill, it copies/symlinks the entire `skills/<name>/` directory into the user's `~/.claude/skills/`. Anything inside that dir bloats the install. Tests and demo outputs belong outside the distributable unit.

**When to split samples into sub-dirs:** keep the layout flat while a skill has few artifacts. Split into `samples/<name>/examples/` (user-facing demos) and `samples/<name>/tests/` (maintainer-facing regression evidence) when any of:

- The skill accumulates >15 sample files
- A browsing user has to wade past test evidence to find a demo
- Both kinds of artifacts are growing independently

The split is a 5-minute move that doesn't break anything — cross-references are all relative paths that survive a group move.

## Local development

```bash
# Lint everything
bash scripts/lint-skills.sh

# Symlink a skill into ~/.claude/skills/ for local testing
bash scripts/install-skill.sh deck-architect

# Or install all skills
bash scripts/install-skill.sh --all

# Regenerate the README skills table (required before pushing if SKILL.md changed)
bash scripts/generate-index.sh
```

The lint check fails the PR if the README skills index is stale, so always run `generate-index.sh` and commit the result when you change a skill's frontmatter.

## Pull requests

- Bump the skill's `version:` field if you changed `SKILL.md` semantically (not for typos)
- Run `bash scripts/lint-skills.sh` locally before pushing
- The README skills table is regenerated automatically on merge to `main` — don't edit it by hand

## Note on the `.skill` files

Some skills include a `<name>.skill` ZIP archive next to `SKILL.md`. These are packaging exports from external Claude tooling and are not consumed by `npx skills add` or the install script. Leave them alone unless you know what produced them.
