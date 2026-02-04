# Task: Add Dashboard API GET Handlers + Budget Prediction Tracking

## Combined Task — Two Features

### Feature 1: Dashboard API GET Handlers (BUG FIX)
The dashboard has no server-side GET API for reading data. External tools and PM automation must query Supabase directly.

**Create/Update:**

1. `dashboard/src/app/api/projects/route.ts` — ADD this file:
   - `GET` → returns all projects from Supabase
   
2. `dashboard/src/app/api/projects/[id]/route.ts` — ADD GET handler:
   - `GET` → returns single project by ID with settings

3. `dashboard/src/app/api/tasks/route.ts` — ADD GET handler:
   - `GET ?projectId=xxx` → returns tasks for a project
   - `GET ?sprintId=xxx` → returns tasks for a sprint
   - Keep existing POST/PATCH handlers

Use the existing `supabaseAdmin` client from `src/lib/supabase.ts`.

### Feature 2: Budget Prediction — Estimated vs Actual Tokens

The `tasks` table has `tokens_consumed` (int) and `estimated_hours` (decimal). Add `estimated_tokens` tracking:

1. **Task detail panel** (`TaskSidePanel.tsx` or similar):
   - If `tokens_consumed` > 0, show actual tokens
   - If both estimated and actual exist, show comparison with accuracy %
   
2. **Sprint velocity view** (optional, if time permits):
   - Average tokens per task type
   - Estimation accuracy trend

Note: The BudgetTracker widget was just built in the previous task. This adds the estimation comparison layer on top.

## Acceptance Criteria
- [ ] `GET /api/projects` returns project list (200)
- [ ] `GET /api/projects/:id` returns single project (200) or 404
- [ ] `GET /api/tasks?projectId=xxx` returns filtered tasks (200)
- [ ] `GET /api/tasks?sprintId=xxx` returns filtered tasks (200)
- [ ] Existing POST/PATCH on tasks still works
- [ ] Token estimation vs actual comparison visible in task detail
- [ ] `npm run build` passes

## Project Location
`/Users/yajat/workspace/projects/mission-control/dashboard/`
