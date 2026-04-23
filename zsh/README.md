# Zsh

Shell configuration focused on development toolchains, completions, and local utilities.

## Files

- `.zshrc.example`
  - sanitized version of the main config
  - ready to serve as a base on another machine
- `.zshenv`
  - lightweight bootstrap loaded in every shell

## Important Decision

The real local configuration contained hardcoded credentials and tokens.

This repo does **not** version those credentials.

Instead, the recommended approach is:

- keep secrets in `.zshrc.local`
- or use a secrets manager / 1Password / local dotenv file

## What The Config Does

### Base PATH

Ensures system binaries and Homebrew are early in the PATH.

### Oh My Zsh

- uses `oh-my-zsh`
- theme `robbyrussell`
- plugin `git`

### Toolchains Added To PATH

- `~/.local/bin`
- `pnpm`
- `Volta`
- `Go` (`GOPATH/bin`)
- Android SDK (`emulator`, `platform-tools`)
- Bun
- Google Cloud SDK
- OpenCode bin local
- Maestro
- Vite+

### Completions

- Bun
- `gcloud`

### Dev Environment Variables

- `JAVA_HOME`
- `PNPM_HOME`
- `VOLTA_HOME`
- `NI_CONFIG_FILE`
- `GOPATH`
- `ANDROID_HOME`
- `BUN_INSTALL`

## Things To Watch

- some PATH entries were duplicated in the original config
- some credentials were exported directly
- this repo keeps the structure but removes sensitive material

## Suggested Usage

1. copy `.zshrc.example` to `.zshrc`
2. create `.zshrc.local`
3. keep secrets and tokens only in the local unversioned file
