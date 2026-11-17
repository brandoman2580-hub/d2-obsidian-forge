# Obsidian Forge — Agent Entry

Destiny 2 loadout crafting, build-math simulation, and vault management (Angular + Supabase). Repo is early: no `package.json` / `src/` / `supabase/` yet — treat `.cursor/docs/` as intent, not implemented APIs.

## Commands

```bash
# TODO: fill once package.json lands
npm install
npm start          # Angular app
npm test
npm run build
npx supabase start # local Supabase (when supabase/ exists)
```

## Wayfinding

| Path | Purpose |
|------|---------|
| `.cursor/rules/` | Scoped MDC rules (alwaysApply vs globs) |
| `.cursor/memory/` | Living session state — read/update every session |
| `.cursor/docs/` | Static KB — pull with `@docs/` only when needed |

**Start every session:** read `.cursor/memory/active-context.md` → `tasks.md` → append `progress.md`.

**Do not invent APIs** that contradict docs or an empty tree; mark unknowns and ask Brandin.
