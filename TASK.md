# Task: Rename "sub-agents" to "workers" throughout codebase and docs

## Objective
Replace all references to "sub-agent" with "worker" across the entire Mission Control project. This establishes the naming convention: Agent = persistent identity with memory, Worker = temporary stateless task executor.

## Context
Per team meeting (2026-02-02): "sub-agent" is confusing terminology. The agreed convention is:
- **Agent** = persistent identity + memory + personality (Chhotu, Cheenu)
- **Worker** = spawned task executor, stateless, temporary, dies after task (friday-dev, hawkeye, wong)
- **Skill** = a capability package

## Requirements

### 1. Code Changes
Search and replace in `dashboard/src/`:
- UI labels: "sub-agent" → "worker", "Sub-Agent" → "Worker"
- Variable names: `subAgent` → `worker`, `subAgentId` → `workerId` (where applicable)
- Comments referencing sub-agents
- Component names if any reference sub-agents

### 2. Documentation Changes
Update these files:
- `PM-PROTOCOL.md` — all references to sub-agents
- `skill/SKILL.md` — skill package docs
- `skill/PM-PROTOCOL.md` — portable protocol
- `agents/README.md` — if exists
- `agents/*.md` — agent profile files (update terminology in descriptions)
- `SETUP.md` — setup guide
- `PLAN.md` — project plan

### 3. Database
- Check if `agent_type` values in Supabase agents table use "sub-agent" — if so, update to "specialist" or "worker"
- The `agents` table column names stay the same (they're generic enough)

### 4. Don't Break Things
- Don't rename the `agents/` directory (it contains worker profiles, name is fine)
- Don't rename Supabase table names
- Don't change API route paths
- Keep git history clean — one logical commit

## Files to Search
```bash
grep -r "sub.agent" dashboard/src/ --include="*.ts" --include="*.tsx" -l
grep -r "sub.agent" *.md agents/*.md skill/*.md -l
```

## Acceptance Criteria
- [x] No references to "sub-agent" remain in code or docs
- [x] Worker terminology used consistently
- [x] Dashboard UI shows "worker" not "sub-agent" where applicable (no UI references existed)
- [x] All markdown docs updated
- [ ] Single clean commit
- [ ] App still builds without errors (`npm run build`)

## Out of Scope
- Renaming the Avengers names (separate task)
- Changing Supabase table/column names
- Renaming agent profile filenames
