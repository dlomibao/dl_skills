#!/usr/bin/env bash
# Lint all skills under skills/. Prints findings; exits non-zero on errors.
#
# Checks (errors):
#   - SKILL.md exists
#   - Frontmatter parses (--- ... ---)
#   - Required fields: name, description
#   - name matches directory name
#   - name is kebab-case
#   - description length 50-1024 chars (Anthropic spec)
#   - All references/*.md links in SKILL.md resolve to real files
#   - allowed-tools (if present) only contains known tool names
#   - _template / .template / _* skills are not installable as themselves
#
# Checks (warnings):
#   - version field present (recommended)
#   - license field present (recommended)
#   - SKILL.md > 500 lines (encourage references/ split)
#
# Skipped: directories starting with . or _ (templates, drafts).

set -u

cd "$(dirname "$0")/.." || exit 2

SKILLS_DIR="skills"
ERRORS=0
WARNINGS=0

# Canonical Anthropic + Vercel-recognized tool names. Add as the ecosystem grows.
KNOWN_TOOLS=(
  Bash Edit Glob Grep Read Write WebSearch WebFetch
  TodoWrite NotebookEdit Task Agent
  Skill SlashCommand
)

err()  { echo "ERROR   [$1] $2" >&2; ERRORS=$((ERRORS+1)); }
warn() { echo "WARNING [$1] $2" >&2; WARNINGS=$((WARNINGS+1)); }
ok()   { echo "OK      [$1] $2"; }

is_known_tool() {
  local t="$1"
  for kt in "${KNOWN_TOOLS[@]}"; do
    [[ "$t" == "$kt" ]] && return 0
  done
  return 1
}

extract_field() {
  # extract_field <file> <key> -> first matching value (raw, may include quotes/brackets)
  awk -v key="$2" '
    /^---[[:space:]]*$/ { fm++; next }
    fm == 1 {
      if (match($0, "^" key ":[[:space:]]*")) {
        print substr($0, RLENGTH+1)
        exit
      }
    }
  ' "$1"
}

extract_frontmatter() {
  awk '/^---[[:space:]]*$/ { fm++; next } fm == 1 { print }' "$1"
}

trim() {
  local s="$1"
  s="${s#"${s%%[![:space:]]*}"}"
  s="${s%"${s##*[![:space:]]}"}"
  printf '%s' "$s"
}

unquote() {
  local s="$1"
  if [[ "$s" =~ ^\".*\"$ ]] || [[ "$s" =~ ^\'.*\'$ ]]; then
    s="${s:1:${#s}-2}"
  fi
  printf '%s' "$s"
}

lint_skill() {
  local dir="$1"
  local name_from_dir
  name_from_dir="$(basename "$dir")"
  local skill_md="$dir/SKILL.md"

  if [[ ! -f "$skill_md" ]]; then
    err "$name_from_dir" "SKILL.md missing"
    return
  fi

  # Frontmatter present?
  local fm_count
  fm_count=$(grep -c '^---[[:space:]]*$' "$skill_md")
  if (( fm_count < 2 )); then
    err "$name_from_dir" "SKILL.md missing YAML frontmatter (need two '---' delimiters)"
    return
  fi

  # name
  local name
  name="$(unquote "$(trim "$(extract_field "$skill_md" name)")")"
  if [[ -z "$name" ]]; then
    err "$name_from_dir" "frontmatter missing required field: name"
  elif [[ "$name" != "$name_from_dir" ]]; then
    err "$name_from_dir" "frontmatter name='$name' does not match directory '$name_from_dir'"
  elif ! [[ "$name" =~ ^[a-z][a-z0-9-]*$ ]]; then
    err "$name_from_dir" "name '$name' is not kebab-case (lowercase, digits, hyphens; must start with letter)"
  fi

  # description
  local description
  description="$(unquote "$(trim "$(extract_field "$skill_md" description)")")"
  if [[ -z "$description" ]]; then
    err "$name_from_dir" "frontmatter missing required field: description"
  else
    local dlen=${#description}
    if (( dlen < 50 )); then
      err "$name_from_dir" "description too short ($dlen chars; need >=50 for reliable triggering)"
    elif (( dlen > 1024 )); then
      err "$name_from_dir" "description too long ($dlen chars; max 1024)"
    fi
  fi

  # version (warn)
  local version
  version="$(unquote "$(trim "$(extract_field "$skill_md" version)")")"
  if [[ -z "$version" ]]; then
    warn "$name_from_dir" "no version field (recommend semver, e.g. 1.0.0)"
  elif ! [[ "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+([-+].*)?$ ]]; then
    warn "$name_from_dir" "version '$version' is not semver"
  fi

  # license (warn)
  local license
  license="$(unquote "$(trim "$(extract_field "$skill_md" license)")")"
  [[ -z "$license" ]] && warn "$name_from_dir" "no license field (recommend matching repo LICENSE)"

  # allowed-tools (validate members if present)
  local allowed
  allowed="$(trim "$(extract_field "$skill_md" allowed-tools)")"
  if [[ -n "$allowed" ]]; then
    # strip [ ] and split on ,
    local stripped="${allowed#[}"
    stripped="${stripped%]}"
    local IFS=','
    for tool in $stripped; do
      tool="$(trim "$tool")"
      tool="$(unquote "$tool")"
      [[ -z "$tool" ]] && continue
      if ! is_known_tool "$tool"; then
        warn "$name_from_dir" "allowed-tools contains unknown tool '$tool' (typo? or new tool — extend KNOWN_TOOLS in lint script)"
      fi
    done
  fi

  # references/*.md links resolve
  local broken=0
  while IFS= read -r ref; do
    [[ -z "$ref" ]] && continue
    local target="$dir/$ref"
    if [[ ! -f "$target" ]]; then
      err "$name_from_dir" "broken link in SKILL.md: $ref"
      broken=$((broken+1))
    fi
  done < <(grep -oE '\(references/[^)]+\)' "$skill_md" | sed -E 's/^\(|\)$//g' | sort -u)

  # Size warning
  local lines
  lines=$(wc -l < "$skill_md")
  if (( lines > 500 )); then
    warn "$name_from_dir" "SKILL.md is $lines lines (>500 — consider moving depth into references/)"
  fi

  if [[ -z "$name" || "$name" == "$name_from_dir" ]] && (( broken == 0 )); then
    ok "$name_from_dir" "passed (${lines} lines)"
  fi
}

# Iterate skills/ — skip dirs starting with . or _
shopt -s nullglob
found=0
for dir in "$SKILLS_DIR"/*/; do
  base="$(basename "$dir")"
  if [[ "$base" == .* ]] || [[ "$base" == _* ]]; then
    echo "SKIP    [$base] non-installable directory (leading . or _)"
    continue
  fi
  found=$((found+1))
  lint_skill "${dir%/}"
done

if (( found == 0 )); then
  echo "No installable skills found in $SKILLS_DIR/"
fi

echo
echo "Summary: $ERRORS error(s), $WARNINGS warning(s) across $found skill(s)"

# Verify the README skills index is up to date (run as part of lint so
# stale READMEs fail the PR — branch protection blocks the alternative
# of having a workflow auto-commit to main).
if [[ -x scripts/generate-index.sh ]]; then
  cp README.md /tmp/README.before
  bash scripts/generate-index.sh > /dev/null
  if ! cmp -s /tmp/README.before README.md; then
    err "README" "skills index is stale — run: bash scripts/generate-index.sh && commit"
    mv /tmp/README.before README.md  # restore so the diff isn't left behind locally
  else
    rm -f /tmp/README.before
  fi
fi

if (( ERRORS > 0 )); then
  exit 1
fi
exit 0
