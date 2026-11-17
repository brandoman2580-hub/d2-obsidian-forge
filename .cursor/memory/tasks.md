# Obsidian Forge — Sprint & Backlog

## In Progress
- [ ] **INFRA-01:** Commit `AGENTS.md`, `.cursor/rules/*.mdc`, `.cursor/memory/*`, and `.cursor/docs/*` to repository. *(PR #1 open)*
- [x] **INFRA-02:** Verify `npm run lint && npm run build` passes cleanly locally and on Vercel. *(local gate green; Vercel via `vercel.json` `npm run build`)*

## Up Next — Phase 1: Backend & Auth
- [ ] **DB-01:** Create `supabase/migrations/0001_initial_schema.sql` with tables, indexes, and RLS policies.
  * *Acceptance Criteria:* `user_loadouts` blocks cross-user writes; Guest users can `SELECT` public loadouts and `activities`.
- [ ] **AUTH-01:** Implement `supabase/functions/bungie-auth` Edge Function + Angular `AuthStore` signal service with Guest Mode fallback.
- [ ] **PIPE-01:** Build Zod-validated manifest & Destiny 2 Compendium sync script + `pg_cron` schedule.

## Backlog — Phase 2: Core Studio & Worker
- [ ] **UI-01:** Configure `#0c0e12` Black Armory design tokens and global Header Sandbox Status indicator. *(tokens + badge stub landed in scaffold; live data TBD)*
- [ ] **UI-02:** Build Activity Selector and Three-Pillar Telemetry cards (`Survivability`, `Damage Output`, `Playstyle`).
- [ ] **WORK-01:** Implement abortable Angular Web Worker for 0–200 armor stat min-maxing with unit tests.
- [ ] **AI-01:** Implement `supabase/functions/generate-loop` with SHA-256 caching and Groq inference.
- [ ] **MOB-01:** Build mobile Quick Equip drawer and virtualized Vault Search.

## Done
- [x] **PLAN-01:** Defined Master PRD, PostgreSQL schema, AI agent spec, and Cursor rule architecture.
