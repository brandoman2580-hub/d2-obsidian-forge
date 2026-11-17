# Obsidian Forge — AI Gameplay Loop Agent Specification

## 1. Purpose
The **AI Gameplay Loop Agent** translates a complex *Destiny 2* loadout + target activity context into an actionable, step-by-step combat rotation. It bridges raw build math with real-time execution during high-stakes encounters.

## 2. Inference & Caching Strategy
* **Inference Engine:** Groq API (low-latency LPU inference) invoked via a Supabase Edge Function (`/functions/v1/generate-loop`) to protect API keys and enforce rate limiting.
* **Deterministic Cache Key:** `SHA-256(activity_id + subclass_hash + exotic_armor_hash + sorted(weapon_hashes) + sorted(mod_hashes) + sandbox_patch_version)`.
* **Cache Behavior:** Before invoking the LLM, check Supabase `gameplay_loop_cache` by hash. If hit, return immediately (<50ms). Store new generations with token usage and latency telemetry.

## 3. Input Context Payload (Pre-LLM Deterministic Assembly)
Never pass raw, bloated Bungie JSON to the LLM. Assemble a compact, deterministic context object on the server:
```json
{
  "activity": {
    "name": "Grandmaster Nightfall: The Corrupted",
    "champions": ["Unstoppable", "Overload"],
    "shields": ["Void", "Solar"],
    "threats": ["Arc"],
    "boss_type": "Ranged / Small Precision Crit / Mobile"
  },
  "loadout": {
    "class": "Hunter",
    "subclass": "Strand (Whirling Maelstrom, Widow's Silk)",
    "exotic_armor": "Cyrtarachne's Facade (Woven Mail on Grapple)",
    "weapons": [
      { "slot": "Kinetic", "name": "The Call", "element": "Strand", "perks": ["Lead from Gold", "Hatchling"] },
      { "slot": "Energy", "name": "Buried Bloodline", "element": "Void", "perks": ["Devour", "Weaken"] },
      { "slot": "Power", "name": "Edge Transit", "element": "Void", "perks": ["Envious Assassin", "Bait and Switch"] }
    ],
    "key_mods": ["Heavy Handed", "Firepower", "Void Surge x2", "Recuperation"]
  },
  "warnings": [
    "Double Special weapons equipped: rely on Lead from Gold + Special Finisher for ammo sustainability.",
    "No intrinsic Overload weapon equipped: must rely on subclass Jolt/Suppression or seasonal artifact."
  ]
}
```

## 4. Output Contract (Strict Markdown Structure)
The system prompt must constrain the agent to return **only** the following four scannable sections (under 250 words total):
1. **Combat Loop (Neutral Game):** 3–4 numbered steps detailing ability sequence, buff upkeep (e.g., Woven Mail + Devour), and orb generation.
2. **Champion & Shield Counters:** Exact mapping of how each Champion and elemental shield in the target activity is stunned/broken.
3. **Boss DPS Rotation:** Step-by-step weapon swap and debuff/buff trigger sequence (e.g., *Apply Weaken -> Fire Kinetic/Energy -> Dump Bait & Switch Heavy*).
4. **Critical Watchouts:** Warnings for ammo economy, non-stacking buffs, or survivability gaps.

## 5. Golden-Build Evaluation Suite
Maintain a suite of 10+ canonical test loadouts (covering Solo Dungeons, GM Nightfalls, and Raid Boss DPS) to validate:
* Zero hallucinated perks or Champion stun capabilities.
* Strict adherence to buff/debuff stacking rules.
* Response latency under 1.5 seconds on cache miss.
