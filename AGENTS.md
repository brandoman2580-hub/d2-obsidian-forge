# Obsidian Forge — Repository Wayfinding

## Core Commands
* **Dev Server:** `npm start` (`ng serve`)
* **Build Gate:** `npm run lint && npm run build` (Must pass before closing any task)
* **Unit Tests:** `npm test` (`ng test --watch=false`)
* **Supabase Local:** `npx supabase start` / `npx supabase db reset`

## Session State & Knowledge Map
* **Current State:** Read `.cursor/memory/active-context.md` and `.cursor/memory/tasks.md` at session start.
* **Domain Specs (Load on Demand):**
  * Product & Pillars: `.cursor/docs/01-master-prd.md`
  * Database & Cron Pipelines: `.cursor/docs/02-data-schema-and-pipelines.md`
  * AI Gameplay Loop Agent: `.cursor/docs/03-ai-gameplay-agent.md`
* **Rule Enforcement:** Domain rules live in `.cursor/rules/*.mdc` and auto-attach by file path.
