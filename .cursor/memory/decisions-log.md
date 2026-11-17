# Obsidian Forge — Architectural Decision Records (ADRs)

## ADR-001: Hybrid `AGENTS.md` + Glob-Scoped `.cursor/rules/*.mdc`
* **Context:** Need cross-agent compatibility without bloating every Cursor chat context window with irrelevant rules.
* **Decision:** Keep `AGENTS.md` under 35 lines for CLI/build commands and directory wayfinding; isolate Angular, Web Worker, and Supabase rules into `.mdc` files with explicit `globs`.

## ADR-002: Activity-First Domain Hierarchy
* **Decision:** `Activity` is the root entity driving Champion counters, elemental shields, surges/threats, and boss crit/range evaluation across **Survivability**, **Damage Output**, and **Playstyle**.

## ADR-003: Off-Main-Thread Abortable Stat Solver
* **Decision:** Execute all armor/mod/fragment stat permutations inside a dedicated Angular Web Worker with request cancellation tokens to guarantee zero UI frame drops.

## ADR-004: Deterministic SHA-256 Caching for Groq Gameplay Loops
* **Decision:** Cache generated rotations by `SHA-256(activity + subclass + exotic + sorted_weapons + sorted_mods + patch_version)` in PostgreSQL before calling Groq LPU inference.
