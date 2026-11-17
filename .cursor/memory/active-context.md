# Active Context — Obsidian Forge

* **Stage:** Phase 1 — Infrastructure & Data Foundation
* **Branch:** `cursor/angular-scaffold-infra-02-0f28` (stacked on PR #1 docs tree)
* **Last Verified Build:** `npm run lint && npm run build` — exit 0 (Angular 19.2.x)

## Current Focus
1. Land Angular scaffold PR (INFRA-02) so Vercel uses `npm run build` / local `ng` via npm scripts.
2. Confirm Supabase project status and apply initial migration (`0001_initial_schema.sql`) for `sandbox_manifest_meta`, `activities`, `compendium_perks`, and `user_loadouts`.
3. Guest / Read-Only shell + Black Armory tokens are scaffolded; wire live sandbox badge data after DB/auth.

## Active Blockers & Open Decisions
* **Supabase Connection:** Confirm active Supabase project ref and set `BUNGIE_API_KEY`, `BUNGIE_CLIENT_SECRET`, and `GROQ_API_KEY` in Supabase Edge Function secrets.
* **Seed Activities:** Finalize the initial 6 endgame activities (e.g., current GM Nightfall, Master Raid encounters, Solo Dungeon) for MVP validation.
* **PR #1:** Docs/rules tree still open; Angular PR stacks on it until merge.
