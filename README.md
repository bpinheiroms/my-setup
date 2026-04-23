# my-setup

My private repository for organizing and versioning the main parts of my local development setup.

## Structure

- `zellij/`
  - base config and shortcuts for the terminal multiplexer
  - docs: [`zellij/README.md`](zellij/README.md)
- `opencode/`
  - global OpenCode config, agents, plugins, and tools
  - docs: [`opencode/README.md`](opencode/README.md)
- `skills/`
  - skills installed locally for Claude and agents
  - docs: [`skills/README.md`](skills/README.md)
- `zsh/`
  - sanitized shell config for backup and restore
  - docs: [`zsh/README.md`](zsh/README.md)
- `zed/`
  - Zed editor settings and keymap
  - docs: [`zed/README.md`](zed/README.md)

## Notes

- This repo stores configuration and documentation, not ephemeral state.
- Secrets, tokens, histories, caches, `node_modules`, and logs are intentionally excluded.
- Where the real local config had hardcoded credentials, this repo uses a sanitized version instead.

## Goal

Maintain a single place to:

- restore the setup on another machine
- document why each adjustment exists
- review environment changes with git history
