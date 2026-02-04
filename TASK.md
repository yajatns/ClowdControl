# TASK: Replace Avengers naming convention with new worker identities

**Task ID:** ab711588-3d1a-4ce8-a82c-8635cc015194
**Sprint:** 10
**Priority:** 1

## Objective
Replace all Avengers-themed worker names (wong, friday-dev, hawkeye, wanda) with generic, professional worker identities throughout the codebase, documentation, and configuration.

## New Worker Names
Replace the old Avengers names with descriptive role-based identities:
- `friday-dev` → `worker-dev` (primary developer worker)
- `wong` → `worker-research` (research & analysis worker)
- `hawkeye` → `worker-qa` (QA & testing worker)
- `wanda` → `worker-design` (design & creative worker)
- `chhotu` stays as-is (PM/orchestrator — not an Avenger name)
- `cheenu` stays as-is (infrastructure — not an Avenger name)

## Scope

### 1. Source Code (dashboard/src/)
- Search all `.ts` and `.tsx` files for old names
- Replace in UI components, API routes, type definitions
- Check for hardcoded agent profile references

### 2. Documentation (docs/)
- Update all `.md` files with new naming
- Update any planning or protocol documents

### 3. Configuration
- Check `package.json`, config files for old names
- Update any agent profile configs

### 4. Supabase Data
Update `assigned_to` column in tasks table:
```
Supabase URL: https://emsivxzsrkovjrrpquki.supabase.co/rest/v1
API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtc2l2eHpzcmtvdmpycnBxdWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NzUzNDAsImV4cCI6MjA4NTU1MTM0MH0.jogq1dXEvF1S5fjRxvFfNnkO1eLbeHPBpvzVWJGG5IQ
```

Run PATCH requests to update assigned_to for all tasks with old names:
- `friday-dev` → `worker-dev`
- `wong` → `worker-research`
- `hawkeye` → `worker-qa`
- `wanda` → `worker-design`

### 5. Git
- Commit all changes with message: "chore: replace Avengers naming with role-based worker identities"

## Deliverables
1. All source files updated
2. All docs updated
3. Supabase data migrated
4. Build passes (`npm run build` in dashboard/)
5. Git commit with changes
6. Mark this task as done in Supabase:
```bash
curl -X PATCH "https://emsivxzsrkovjrrpquki.supabase.co/rest/v1/tasks?id=eq.ab711588-3d1a-4ce8-a82c-8635cc015194" \
  -H "apikey: <KEY>" \
  -H "Authorization: Bearer <KEY>" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=minimal" \
  -d '{"status":"done","updated_at":"now()"}'
```

## Notes
- Do NOT rename chhotu or cheenu — those are not Avengers names
- Keep the rename mapping consistent everywhere
- If any agent_profiles table or similar exists in Supabase, update those too
