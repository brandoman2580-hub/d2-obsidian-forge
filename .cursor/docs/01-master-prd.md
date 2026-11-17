# Master PRD — Obsidian Forge

> Source of product intent. Repo is early (README only as of 2026-11-16). Sections marked **TODO** need Brandin fill-in before implementation locks.

## Vision

Obsidian Forge is a high-performance, responsive web app for Destiny 2 players to:

1. Craft **activity-specific** loadouts
2. Simulate **build math**
3. Manage **vault inventory** across desktop and mobile

## Activity-first model

Primary flow is **not** vault-first:

1. Player selects (or lands on) an **Activity** (strike, raid encounter, PvP mode, seasonal activity, etc.).
2. System surfaces constraints and goals for that activity (champions, shields, recommended stats, modifiers — **TODO: exact metadata sources**).
3. Loadout workspace and AI agent operate inside those constraints.
4. Vault / inventory actions support the activity goal rather than owning the IA.

**Anti-goal:** A generic DIM-clone home screen as the default experience.

## Three pillars

| Pillar | Player job | Notes |
|--------|------------|-------|
| **Activity** | Understand what this activity demands | Catalog + modifiers + readiness |
| **Loadout / Build** | Equip / optimize for the activity | Stat worker + rules + agent |
| **Vault** | Find and move items that feed the build | Sync from Bungie — **TODO: OAuth scope** |

## Guest mode

- Guests can browse **public activity catalog** and educational / demo builds without signing in.
- Guests **cannot** read another user's vault, write loadouts to a linked account, or call privileged Edge Functions.
- CTA to authenticate appears at the vault-sync / save-loadout boundary.
- **TODO:** Exact guest feature matrix (can guests run the stat simulator on sample data?).

## Status badges

Badges communicate **activity readiness** and build fit at a glance (e.g. anti-champion coverage, resilience floor, exotic conflict).

Requirements:

- Readable without color alone (icon + text/label).
- Defined enum of badge kinds once data exists — **TODO: finalize badge taxonomy**.
- Sourced from computed build state + activity constraints, not arbitrary marketing tags.

## Non-goals (v1)

- Full LFG / social layer
- Replacing bungie.net clan tools
- Pixel-perfect in-game UI clone

## Success signals (draft)

- **TODO:** time-to-first useful loadout for a linked player
- **TODO:** guest → auth conversion on vault CTA
- **TODO:** cache hit rate on AI agent responses

## References

- Stack intent: `.cursor/memory/decisions-log.md` (ADR-002, ADR-003)
- Schema: `02-data-schema.md`
- Agent: `03-ai-gameplay-agent.md`
