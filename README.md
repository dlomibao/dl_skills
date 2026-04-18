# dl_skills

Personal collection of custom [Claude Code](https://claude.com/claude-code) skills.

## Layout

```
skills/
  <skill-name>/
    SKILL.md        # required — frontmatter (name, description) + instructions
    ...             # optional supporting files, scripts, references
```

Each skill is a self-contained directory. The `SKILL.md` frontmatter tells Claude
when to invoke the skill; the body is the instructions Claude follows.

See the [Anthropic skills spec](https://docs.claude.com/en/docs/claude-code/skills)
for the authoring format.

## Installing locally

Symlink or copy a skill dir into `~/.claude/skills/` (user-level) or
`<project>/.claude/skills/` (project-level):

```bash
ln -s "$PWD/skills/my-skill" ~/.claude/skills/my-skill
```

## Developing a new skill

Use the `skill-creator` skill from the official marketplace, or scaffold by hand
from `skills/_template/` (if present).

## License

MIT — see [LICENSE](LICENSE).
