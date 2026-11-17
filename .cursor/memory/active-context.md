# Active Context — Obsidian Forge

* **Stage:** Phase 1 — Infrastructure & Data Foundation
* **Branch:** `main`
* **Last Verified Build:** Pending initial `npm run lint && npm run build` check

## Current Focus
1. Verify local Angular CLI toolchain and ensure `ng build` exits cleanly with zero missing-binary errors.
2. Confirm Supabase project status and apply initial migration (`0001_initial_schema.sql`) for `sandbox_manifest_meta`, `activities`, `compendium_perks`, and `user_loadouts`.
3. Scaffold global Black Armory CSS design tokens (`#0c0e12` base) and Guest/Read-Only application shell.

## Active Blockers & Open Decisions
* **Supabase Connection:** Confirm active Supabase project ref and set `BUNGIE_API_KEY`, `BUNGIE_CLIENT_SECRET`, and `GROQ_API_KEY` in Supabase Edge Function secrets.
* **Seed Activities:** Finalize the initial 6 endgame activities (e.g., current GM Nightfall, Master Raid encounters, Solo Dungeon) for MVP validation.
