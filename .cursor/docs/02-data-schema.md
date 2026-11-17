# Data Schema — PostgreSQL / Supabase

> Intent stub. **No `supabase/` directory exists yet.** Do not treat table names as shipped. Validate against Brandin before writing irreversible migrations.

## Principles

- RLS on all user-owned tables.
- Idempotent ingestion keyed by stable external IDs (Bungie hashes / membership ids).
- Zod (or agreed) validation at Edge Function boundaries.
- AI cache keyed by SHA-256 of canonical prompt payload (see `03-ai-gameplay-agent.md`).

## Proposed tables

### `profiles`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | = `auth.users.id` |
| `bungie_membership_id` | text | **TODO: uniqueness / platform** |
| `display_name` | text | |
| `created_at` | timestamptz | |

**RLS:** user can select/update own row only.

### `activities` (catalog — public read)

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid / text PK | |
| `bungie_hash` | text unique | activity definition hash |
| `name` | text | |
| `activity_type` | text | enum TBD |
| `modifiers` | jsonb | **TODO: schema** |
| `constraints` | jsonb | champ/shield/stat hints |
| `updated_at` | timestamptz | |

**RLS:** `SELECT` for `anon` + `authenticated`; writes via service role / ingestion only.

### `loadouts`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_id` | uuid FK → profiles | |
| `activity_id` | FK → activities | nullable? **TODO** |
| `name` | text | |
| `payload` | jsonb | items, mods, subclass — **TODO: versioned schema** |
| `created_at` / `updated_at` | timestamptz | |

**RLS:** owner CRUD only.

### `vault_snapshots` (optional v1)

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_id` | uuid | |
| `captured_at` | timestamptz | |
| `items` | jsonb / storage ref | **TODO: normalize vs blob** |

**RLS:** owner only.

### `ai_response_cache`

| Column | Type | Notes |
|--------|------|-------|
| `hash` | text PK | SHA-256 hex of canonical request |
| `model` | text | Groq model id |
| `prompt_version` | text | |
| `response` | jsonb | |
| `created_at` | timestamptz | |
| `expires_at` | timestamptz | nullable |

**RLS:** no direct client write; Edge Function / service role. Read policy **TODO** (user-scoped vs global shared cache for identical public prompts).

## RLS policy sketch

```sql
-- Example only — not applied
ALTER TABLE loadouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY loadouts_owner ON loadouts
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

## Cron / ingestion pipelines

| Job | Source | Target | Notes |
|-----|--------|--------|-------|
| Activity catalog sync | Bungie manifest / API | `activities` | Idempotent upsert on `bungie_hash` |
| **TODO** seasonal modifiers | TBD | `activities.modifiers` | |
| Cache GC | — | `ai_response_cache` | Delete expired rows |

**TODO:** schedule (pg_cron vs external), rate limits, manifest versioning strategy.

## Open questions for Brandin

1. Normalize inventory items into relational tables vs JSON blobs?
2. Multi-character / multi-membership model?
3. Shared vs per-user AI cache visibility?
