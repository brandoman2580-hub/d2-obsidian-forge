# Decisions Log (ADRs)

> Immutable. Append only. Do not rewrite past ADRs — supersede with a new entry.

## ADR-001 — Agent operating system layout

- **Date:** 2026-11-16
- **Status:** Accepted
- **Context:** Early repo (README only). Need durable cross-tool guidance without wasting tokens on always-on rules.
- **Decision:** Use Brandin's tree: `AGENTS.md` entry + `.cursor/rules` (scoped MDC) + `.cursor/memory` (living) + `.cursor/docs` (static KB via `@docs/`).
- **Consequences:** Agents must read memory each session; domain detail stays out of `alwaysApply` except architect workflow.

## ADR-002 — Intended frontend & data stack

- **Date:** 2026-11-16
- **Status:** Provisional (pending Brandin confirmation)
- **Context:** No `package.json` / `supabase/` yet; product is a high-perf D2 loadout/vault web app (README).
- **Decision:** Proceed with **Angular standalone + OnPush + Signals** for UI; **Web Workers** for build math; **Supabase (Postgres + RLS + Edge/cron)** for data; **Groq** for gameplay-agent with SHA-256 response cache.
- **Consequences:** Scaffolding and docs assume this stack. If Brandin chooses differently, supersede this ADR and update rules/docs — do not silently diverge.

## ADR-003 — Activity-first product model

- **Date:** 2026-11-16
- **Status:** Provisional (from PRD stub)
- **Context:** Loadout tools often start from inventory; Obsidian Forge prioritizes activity context.
- **Decision:** UX and data flows are **activity-first** (see `.cursor/docs/01-master-prd.md`): choose activity → constrained recommendations → vault/loadout actions.
- **Consequences:** Features that invert this (vault-first as primary nav) need explicit product approval.
