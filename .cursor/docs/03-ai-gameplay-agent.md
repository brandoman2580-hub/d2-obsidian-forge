# AI Gameplay Agent — Groq Contract

> Intent stub. No Edge Functions or Groq wiring exist in-repo yet.

## Role

Given an **activity context** + **player-build fingerprint** (and optional vault highlights), return actionable gameplay / loadout guidance that respects activity constraints.

Non-goals: unrestricted chat companion; inventing item rolls that contradict inventory when vault is linked.

## Prompt contract (v0 draft)

Canonical request object (hash this, not free-form chat logs):

```json
{
  "prompt_version": "v0",
  "model": "TODO_GROQ_MODEL_ID",
  "activity": {
    "id": "string",
    "bungie_hash": "string",
    "constraints": {}
  },
  "build": {
    "fingerprint": "string",
    "summary": {}
  },
  "options": {
    "locale": "en",
    "max_suggestions": 5
  }
}
```

**Rules:**

- Serialize with **stable key order** (or a documented canonical JSON form) before hashing.
- `prompt_version` bumps when system instructions or schema change.
- System prompt text lives server-side only — **TODO: add file path once scaffolded**.

## SHA-256 caching

1. Canonicalize request JSON → UTF-8 bytes → **SHA-256** hex.
2. Lookup `ai_response_cache` by `hash` (+ matching `model` / `prompt_version` if stored separately).
3. On miss: call Groq → validate response schema (Zod) → upsert cache → return.
4. Never cache raw API errors as successful payloads.

## Response schema (draft)

```json
{
  "summary": "string",
  "suggestions": [
    {
      "title": "string",
      "rationale": "string",
      "related_badge_kinds": ["string"]
    }
  ],
  "warnings": ["string"],
  "meta": {
    "cache_hit": true,
    "hash": "string",
    "model": "string"
  }
}
```

**TODO:** align `related_badge_kinds` with PRD badge taxonomy.

## Golden-build evals

Purpose: prevent prompt/model regressions on known activity + build pairs.

Proposed layout (when code exists):

```
evals/
  golden/
    <case-id>.input.json
    <case-id>.expected.json
```

Harness (**TODO**):

- Run agent with cache bypass or fixed fixture mode.
- Score: schema validity + required suggestion themes + no forbidden claims.
- Fail CI on regression past threshold.

## Secrets & egress

- Groq API key: server / Edge Function env only.
- Client sends activity id + build fingerprint; never the provider key.
- Log hash + latency; avoid logging full prompts with PII.

## Brandin fill-ins

- [ ] Choose Groq model id and temperature defaults
- [ ] Finalize system prompt + tool/function calling (if any)
- [ ] Decide shared vs private cache
- [ ] Author first 5 golden cases
