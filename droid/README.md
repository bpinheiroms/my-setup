# Factory Droid Config

Factory Droid configuration for using VibeProxy with OpenAI Codex accounts.

## Requirements

- VibeProxy running locally.
- Codex accounts authenticated in VibeProxy.
- VibeProxy exposing the OpenAI-compatible endpoint at `http://localhost:8317/v1`.

Validate the proxy:

```bash
curl -sS http://localhost:8317/v1/models | jq -r '.data[].id'
```

Expected models include:

- `gpt-5.5`
- `gpt-5.4`
- `gpt-5.4-mini`
- `gpt-5.3-codex`
- `gpt-5.3-codex-spark`
- `gpt-5.2`

## Restore

```bash
mkdir -p ~/.factory
cp droid/settings.json ~/.factory/settings.json
```

Restart Factory Droid after copying the file.

## Notes

- Droid only talks to VibeProxy. Account rotation is handled inside VibeProxy/CLIProxyAPI.
- OpenAI-compatible providers use `baseUrl` ending in `/v1`.
- The `apiKey` value is the local proxy placeholder expected by VibeProxy, not a real OpenAI API key.
- The `gpt-5.4(high)`, `gpt-5.4(xhigh)`, `gpt-5.4(medium)`, and `gpt-5.4(low)` aliases are included because they were validated against the local VibeProxy endpoint.
- This file preserves the existing Factory Droid notification hooks. Remove or edit the `hooks` block if the hook script path changes on another machine.
