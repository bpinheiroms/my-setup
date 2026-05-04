# Zed

Zed setup focused on a clean interface, low visual noise, and fast editing for JS/TS projects.

## Files

- `settings.json`
  - main editor configuration
- `keymap.json`
  - custom shortcuts

## What The Settings Do

### Visual / Theme

- base theme: `Aura Dark`
- icons: `Warm Charmed Icons`
- color overrides to reduce harsh contrast on borders and panels
- italic comments

Goal: a calmer, less cluttered dark interface.

### Panels And Layout

- terminal docked on the right
- project panel docked on the right
- `project_panel.starts_open = false`
- `project_panel.hide_root = true`
- `outline_panel` with fixed width
- `centered_layout` with lateral padding

Goal: keep focus on the editor and show panels only when needed.

### Git

- `git_gutter = hide`
- `inline_blame.enabled = false`
- `git_status = false` in the project panel
- `git_panel.tree_view = false`

Goal: reduce git-related visual noise inside the editor.

### Agent / AI

- default agent model in Zed: `gpt-5.2-codex` via `copilot_chat`

Goal: keep a strong model available for chat/editing inside the editor itself.

### Editor behavior

- UI and editor font size `14`
- `vim_mode = false`
- block cursor with blink
- multi-cursor on `alt`
- highlight current line
- no whitespace markers
- tab size `2`
- auto-indent and auto-indent-on-paste enabled
- completion and inline documentation enabled

Goal: smooth TS/JS editing with low friction.

### Persistence And Save Behavior

- autosave after `1000ms`
- `format_on_save = on`
- startup restoration set to `empty_tab`
- does not restore unsaved buffers

Goal: keep startup predictable and avoid stale session clutter.

### Formatting / LSP

- `source.fixAll.eslint = true`
- `source.removeUnusedImports = true`
- ESLint configured with `useFlatConfig = true`

Goal: save files with basic fixes and clean imports already applied.

## Keymap

### Terminal

- `shift-enter`
  - sends `Esc + Enter` to the terminal
- `ctrl-a`, `ctrl-s`, `ctrl-d`, `ctrl-e`, `ctrl-z`, `ctrl-x`, `ctrl-f`
  - disabled in the `Terminal` context

Reason: avoid conflicts with personal shortcuts used outside Zed, especially ones that mirror the Zellij flow.

### Global

- `cmd-shift-e`
  - toggle the project panel

## Setup Philosophy

- less noise
- more focus on the buffer
- sensible save-time automation
- AI available in the editor, but not dominating the interface
