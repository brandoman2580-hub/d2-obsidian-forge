# Tasks

> Prioritized backlog. Move done items to a short "Done" section or strike through; keep acceptance criteria explicit.

## P0 — Foundation

- [ ] **Confirm stack pins** — Angular major, Node LTS, Supabase CLI/project link  
  - AC: versions recorded in README or package.json; AGENTS.md commands updated.

- [ ] **Scaffold Angular app under `src/`** — standalone, OnPush defaults  
  - AC: `npm start` serves a shell; routes stub for Activity / Loadout / Vault / Guest; aligns with `10-angular-black-armory.mdc`.

- [ ] **Init Supabase project under `supabase/`** — migrations matching `02-data-schema.md` stubs  
  - AC: local `supabase start` works; RLS enabled on user tables; schema TODOs resolved or explicitly deferred.

## P1 — Product spine

- [ ] **Activity-first shell** — pick activity → constrained loadout workspace  
  - AC: matches PRD three pillars; guest can browse catalog without auth.

- [ ] **Stat worker prototype** — `*.worker.ts` for armor/stat math  
  - AC: abortable; message protocol typed; unit tests for pure math.

- [ ] **Groq agent contract v0** — prompt + SHA-256 cache table  
  - AC: eval fixtures folder exists; cache hit path documented; no secrets in client.

## P2 — Later

- [ ] Bungie OAuth + vault sync  
- [ ] Golden-build eval harness for gameplay agent  
- [ ] Status badge system (activity readiness) wired to real data  

## Done

- [x] Scaffold `.cursor/` rules, memory, docs + `AGENTS.md` (this session)
