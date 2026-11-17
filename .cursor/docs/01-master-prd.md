# Obsidian Forge — Master Product Requirements Document (PRD)

## 1. Product Vision & Positioning
**Obsidian Forge** is an activity-first *Destiny 2* loadout builder, combat math simulator, and inventory manager built for desktop and mobile. Unlike generic vault managers that treat gear in isolation, Obsidian Forge anchors every build decision to a target **Activity** and evaluates loadouts across three combat pillars: **Survivability**, **Damage Output**, and **Playstyle**.

## 2. Core User Personas & Modes
* **Authenticated Guardian (Bungie OAuth):** Syncs live vault/character inventories, saves custom activity loadouts, equips gear directly via Bungie API, and tracks missing build items.
* **Guest / Read-Only Explorer:** Inspects community or preset builds, runs stat simulations against sandbox data, and generates AI gameplay loops without requiring Bungie authentication.

## 3. Core Functional Pillars

### 3.1 Activity-First Context Engine
* Users select a target Activity (e.g., Grandmaster Nightfall, Master Raid Encounter, Solo Dungeon) before optimizing gear.
* **Activity Metadata Schema:**
  * Enemy Faction(s) & Combatant Density
  * Champion Types (Barrier, Overload, Unstoppable)
  * Elemental Shield Types (Arc, Solar, Void, Stasis, Strand)
  * Active Modifiers (Surges, Threats, Overcharges, Galvanized/Brawn)
  * Boss Archetype (Precision vs. Explosive, Ranged vs. Melee/Close-Quarters, DPS Phase Duration)

### 3.2 The Three Build Evaluation Pillars
Every loadout receives real-time diagnostic feedback across:
1. **Survivability:** Effective HP (EHP), tier-based Resilience/Recovery calculations, stacked Damage Resistance (chest mods + subclass verbs like Woven Mail/Frost Armor/Restoration), and healing uptime.
2. **Damage Output:** Sustained DPS vs. Total Damage reserves, Surge/Empowering buff and Weaken debuff stacking validation (flagging non-stacking conflicts), and Champion stun coverage.
3. **Playstyle:** Ability regeneration cadence, ammo economy sustainability (flagging double-special starvation risks), and Solo vs. Fireteam role fit.

### 3.3 Off-Main-Thread Stat Min-Maxer (Web Worker)
* Evaluates armor permutations, stat tiers (including 0–200 stat thresholds and armor set bonuses), artifice/stat mods, and fragment stat penalties/bonuses inside a dedicated Angular Web Worker.
* Must return top-ranked permutations without blocking UI frame rates on desktop or mobile.

### 3.4 Dual-Form-Factor UX
* **Desktop Studio:** Multi-panel workspace featuring Activity Selector, Armor/Weapon Loadout Matrix, Three-Pillar Telemetry Breakdown, and AI Gameplay Loop Console.
* **Mobile Tactical View:** Streamlined **Quick Equip** one-tap loadout applier and instant **Vault Search** with perk/element filtering for mid-encounter swaps.

### 3.5 Data Status & Sandbox Transparency
* Global header/status badge displaying:
  * Active *Destiny 2* Episode/Season & Patch Version.
  * Last Bungie Manifest sync timestamp.
  * Destiny 2 Compendium verification flag (`VERIFIED` vs. `PROVISIONAL / EARLY SEASON`).

## 4. Non-Functional & Aesthetic Requirements
* **Performance:** Zero UI thread stalls during stat solving; virtualized scrolling for large vault inventories (`@angular/cdk`).
* **Visual Identity:** Black Armory tactical terminal—monochrome obsidian/charcoal surfaces (`#0c0e12` base) with high-contrast crimson/amber/cyan semantic accents. No stock MUI/Chakra visuals, no decorative background grid lines, and no unbordered clipped corners.
* **Accessibility:** Full WCAG AA contrast compliance, keyboard-navigable loadout slots, and semantic ARIA labels.
