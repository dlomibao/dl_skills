#!/usr/bin/env bash
# Symlink a skill from this repo into ~/.claude/skills/ for local use.
#
# Usage:
#   scripts/install-skill.sh <skill-name>     # install one skill
#   scripts/install-skill.sh --all            # install all skills
#   scripts/install-skill.sh --uninstall <skill-name>
#
# This is the manual alternative to: npx skills add <repo>

set -u

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"

usage() {
  sed -n '2,12p' "$0"
  exit 1
}

[[ $# -lt 1 ]] && usage

mkdir -p "$TARGET_DIR"

install_one() {
  local name="$1"
  local src="$REPO_ROOT/skills/$name"
  local dst="$TARGET_DIR/$name"
  if [[ ! -d "$src" ]]; then
    echo "ERROR: $src does not exist" >&2
    return 1
  fi
  if [[ -e "$dst" || -L "$dst" ]]; then
    echo "Removing existing $dst"
    rm -rf "$dst"
  fi
  ln -s "$src" "$dst"
  echo "Installed: $dst -> $src"
}

uninstall_one() {
  local name="$1"
  local dst="$TARGET_DIR/$name"
  if [[ -L "$dst" ]]; then
    rm "$dst"
    echo "Uninstalled symlink: $dst"
  elif [[ -e "$dst" ]]; then
    echo "Refusing to remove $dst — not a symlink (manual cleanup required)" >&2
    return 1
  else
    echo "Nothing installed at $dst"
  fi
}

case "$1" in
  --all)
    shopt -s nullglob
    for dir in "$REPO_ROOT"/skills/*/; do
      base="$(basename "$dir")"
      [[ "$base" == .* || "$base" == _* ]] && continue
      install_one "$base"
    done
    ;;
  --uninstall)
    [[ $# -lt 2 ]] && usage
    uninstall_one "$2"
    ;;
  -h|--help)
    usage
    ;;
  *)
    install_one "$1"
    ;;
esac
