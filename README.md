# dotfiles

Curated snapshot of the parts of my local development setup that are worth versioning and sharing.

## What This Repo Is

This repository is a clean, portable backup of the setup I actually use.

It focuses on reusable configuration, documentation, and workflow conventions.

It does **not** try to mirror every machine-specific detail.

## What Is Included

- [`NEW_PC_SETUP.md`](NEW_PC_SETUP.md)
  - checklist for rebuilding the setup on a new machine
- `cmux/`
  - Cmux app/session setup with default panes
- `ghostty/`
  - Ghostty terminal config, font, theme, and shell defaults
- `nvim/`
  - LazyVim-based Neovim setup from `omerxx/dotfiles`
- `yazi/`
  - Yazi opener config that sends code/text files to Neovim
- `zellij/`
  - base config and shortcuts for the terminal multiplexer
  - docs: [`zellij/README.md`](zellij/README.md)
- `opencode/`
  - plain OpenCode config
  - docs: [`opencode/README.md`](opencode/README.md)
- `droid/`
  - Factory Droid settings
  - docs: [`droid/README.md`](droid/README.md)
- `codex/`
  - Codex CLI config
  - docs: [`codex/README.md`](codex/README.md)
- `devin/`
  - Devin for Terminal token economy hooks and skills
  - docs: [`devin/README.md`](devin/README.md)
- `.cursorrules`
  - Cursor global rules
- `scripts/`
  - setup and bootstrap scripts
  - [`scripts/setup-ai-token-savers.sh`](scripts/setup-ai-token-savers.sh) installs RTK and caveman skills across all assistants
  - [`scripts/setup-devin-token-economy.sh`](scripts/setup-devin-token-economy.sh) installs Devin RTK/Caveman hooks and skills
- `skills/`
  - curated skill set kept at the repository root
  - docs: [`skills/README.md`](skills/README.md)
- `zsh/`
  - sanitized shell config for backup and restore
  - docs: [`zsh/README.md`](zsh/README.md)
- `zed/`
  - Zed editor settings and keymap
  - docs: [`zed/README.md`](zed/README.md)

## Principles

- Store reusable setup, not machine noise.
- Keep secrets, tokens, histories, caches, and logs out of version control.
- Prefer sanitized or portable versions when the real local config contains private data.

## Why This Exists

This repo gives me one place to:

- restore the setup on another machine
- document why each adjustment exists
- review environment changes with git history

## Repository Style

- small, explicit folders
- README per major area
- no hidden dependency on local history
- public-friendly structure when sensitive data is removed
