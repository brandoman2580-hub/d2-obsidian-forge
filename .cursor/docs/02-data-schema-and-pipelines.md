# Obsidian Forge — Data Schema & Ingestion Pipelines

## 1. Architecture Overview
* **Database:** Supabase (PostgreSQL) with strict Row-Level Security (RLS) on all user-owned tables.
* **Auth & Secrets:** Bungie OAuth 2.0 token exchange handled exclusively inside a Supabase Edge Function (`/functions/v1/bungie-auth`). Access/refresh tokens are encrypted and never exposed to client-side storage.
* **Write Queue:** Bungie API equip/transfer mutations run through a client-side rate-limited queue respecting Bungie's per-second throttle limits.

## 2. Core PostgreSQL Tables

### `sandbox_manifest_meta` (Public Read)
Tracks data freshness and sandbox testing reliability.
* `id` (uuid, PK)
* `season_name` (text)
* `patch_version` (text)
* `manifest_synced_at` (timestamptz)
* `compendium_synced_at` (timestamptz)
* `sandbox_status` (enum: `'VERIFIED'`, `'PROVISIONAL'`)

### `activities` (Public Read)
Curated and manifest-derived endgame encounters.
* `id` (uuid, PK)
* `bungie_activity_hash` (bigint, unique)
* `name` (text)
* `category` (enum: `'RAID'`, `'DUNGEON'`, `'NIGHTFALL'`, `'EXOTIC_MISSION'`, `'ONSLAUGHT'`)
* `champions` (text[]) — e.g., `['BARRIER', 'UNSTOPPABLE']`
* `shields` (text[]) — e.g., `['SOLAR', 'VOID']`
* `surges` (text[])
* `threats` (text[])
* `boss_archetype` (jsonb) — `{ "crit_accessible": boolean, "range": "CLOSE" | "MID" | "LONG", "dps_window_sec": number }`

### `compendium_perks` (Public Read)
Ingested from the community Destiny 2 Compendium spreadsheet for accurate combat math.
* `perk_hash` (bigint, PK)
* `name` (text)
* `category` (enum: `'WEAPON_PERK'`, `'EXOTIC_ARMOR'`, `'ASPECT'`, `'FRAGMENT'`, `'MOD'`)
* `stacking_group` (text) — Prevents invalid buff/debuff stacking in simulator
* `pve_damage_multiplier` (numeric, nullable)
* `damage_resistance_pct` (numeric, nullable)
* `duration_sec` (numeric, nullable)
* `cooldown_reduction_pct` (numeric, nullable)
* `is_verified` (boolean)
* `raw_notes` (text)

### `user_loadouts` (RLS: `auth.uid() = user_id` or `is_public = true`)
* `id` (uuid, PK)
* `user_id` (uuid, FK -> `auth.users.id`)
* `activity_id` (uuid, FK -> `activities.id`, nullable)
* `title` (text)
* `guardian_class` (enum: `'TITAN'`, `'HUNTER'`, `'WARLOCK'`)
* `subclass_config` (jsonb) — Super, Aspects, Fragments, Abilities
* `weapons` (jsonb) — Kinetic, Energy, Power item hashes + instance IDs + selected perks
* `armor` (jsonb) — Helmet, Gauntlets, Chest, Legs, Class Item hashes + mod hashes + artifice slots
* `computed_pillars` (jsonb) — Cached Survivability, Damage Output, and Playstyle scores
* `gameplay_loop_md` (text, nullable) — Cached AI-generated tactical rotation
* `is_public` (boolean, default false)
* `created_at` (timestamptz)
* `updated_at` (timestamptz)

## 3. Scheduled Cron Ingestion Pipeline
1. **Trigger:** Supabase `pg_cron` job runs every 6 hours (and manually post-Tuesday reset).
2. **Step 1 (Bungie Manifest):** Checks `DestinyManifest` version endpoint. If updated, fetches `DestinyInventoryItemDefinition`, `DestinyActivityDefinition`, and `DestinySandboxPerkDefinition`, validates payloads with **Zod**, and upserts changed records.
3. **Step 2 (Destiny 2 Compendium):** Fetches structured sheets from the Destiny 2 Compendium source, parses numeric scalars (damage %, DR %, cooldown timers), flags unverified new-season entries as `is_verified = false`, and updates `sandbox_manifest_meta`.
