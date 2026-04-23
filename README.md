# my-setup

Curated snapshot of the parts of my local development setup that are worth versioning and sharing.

## What This Repo Is

This repository is a clean, portable backup of the setup I actually use.

It focuses on reusable configuration, documentation, and workflow conventions.

It does **not** try to mirror every machine-specific detail.

## What Is Included

- `zellij/`
  - base config and shortcuts for the terminal multiplexer
  - docs: [`zellij/README.md`](zellij/README.md)
- `opencode/`
  - global OpenCode config, agents, plugins, and tools
  - docs: [`opencode/README.md`](opencode/README.md)
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
