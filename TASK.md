# Task: Human Escalation Feature + Clean Data

## Objective
1. Add human escalation workflow for blocked tasks
2. Clean up test data and set up real projects

---

## Feature 1: Human Escalation

### Database Changes
Add new task status value:

```sql
-- Update tasks status check constraint
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_status_check;
ALTER TABLE tasks ADD CONSTRAINT tasks_status_check 
  CHECK (status IN ('backlog', 'assigned', 'in_progress', 'blocked', 'waiting_human', 'review', 'done', 'cancelled'));
```

### API Changes
Update `POST /api/tasks` to accept `waiting_human` status.

### Dashboard Changes

**File:** `dashboard/src/app/page.tsx`

Add a "Needs Your Attention" section at the TOP of the dashboard that shows:
- Tasks with status `waiting_human`
- Tasks with status `blocked` 
- Should be visually prominent (yellow/orange background, icon)
- Each card shows: title, what's needed, urgency, created time

**Component:** Create `dashboard/src/components/HumanAttentionQueue.tsx`

```tsx
// Shows tasks that need human input
// Fetches tasks where status = 'waiting_human' OR status = 'blocked'
// Displays prominently with action buttons
```

### Migration File
Create `supabase/migrations/004_waiting_human_status.sql`

---

## Feature 2: Clean Data & Real Projects

### Delete Test Data
Create a script or SQL to clean test projects:

```sql
-- Delete test tasks first (foreign key)
DELETE FROM tasks WHERE project_id IN (
  SELECT id FROM projects WHERE name ILIKE '%test%'
);

-- Delete test projects
DELETE FROM projects WHERE name ILIKE '%test%';
```

### Create Real Projects

**Project 1: Mission Control**
```json
{
  "name": "Mission Control",
  "description": "Multi-agent project coordination system with anti-groupthink mechanisms",
  "status": "active",
  "owner_type": "human",
  "owner_ids": ["yajat"],
  "current_pm_id": "chhotu",
  "tags": ["infrastructure", "ai", "meta"]
}
```

**Project 2: DpuDebugAgent** (if desired)
```json
{
  "name": "DpuDebugAgent", 
  "description": "AI-powered DPU regression analysis and live debugging system",
  "status": "active",
  "owner_type": "human",
  "owner_ids": ["yajat"],
  "current_pm_id": "chhotu",
  "tags": ["microsoft", "ai", "debugging"]
}
```

**Project 3: FPL Analytics** (if desired)
```json
{
  "name": "FPL Analytics",
  "description": "Fantasy Premier League data analysis and optimization tools",
  "status": "planning",
  "owner_type": "human", 
  "owner_ids": ["yajat"],
  "current_pm_id": "chhotu",
  "tags": ["fpl", "analytics", "sports"]
}
```

### API Endpoint for Seeding
Create `POST /api/admin/seed` that:
1. Cleans test data
2. Creates real projects
3. Returns summary of changes

---

## Files to Create/Modify

### Create:
- `dashboard/src/components/HumanAttentionQueue.tsx`
- `dashboard/src/app/api/admin/seed/route.ts`
- `dashboard/supabase/migrations/004_waiting_human_status.sql`

### Modify:
- `dashboard/src/app/page.tsx` — Add HumanAttentionQueue at top
- `dashboard/src/app/api/tasks/route.ts` — Accept waiting_human status
- `dashboard/src/lib/supabase.ts` — Add helper for human attention tasks

---

## Feature 3: Fix Task Detail Panel Layout

The task detail slide-out panel on the right has layout issues:
- Content is pushed too far right with lots of empty space on left
- Text alignment is off
- Metadata grid (ASSIGNEE, CREATED BY, etc.) looks cramped

**Find the component** that renders the task detail panel (likely in `src/components/` - could be TaskDetail, TaskPanel, TaskDrawer, or similar).

**Fix:**
- Left-align content properly with consistent padding
- Fix the metadata grid to have proper spacing
- Make description text wrap nicely with good margins
- "Edit Task" button should be positioned better (maybe top-right or bottom)

Look at the existing component and improve the layout/spacing.

---

## Acceptance Criteria
- [x] Tasks can have status `waiting_human`
- [x] Dashboard shows "Needs Your Attention" section at top
- [x] Blocked and waiting_human tasks appear in attention queue
- [x] Test projects are removed (via admin seed endpoint)
- [x] Real projects (Mission Control at minimum) exist (via admin seed endpoint)
- [x] Migration file created for status update
- [x] Task detail panel has proper left-aligned layout with good spacing

## Notes
- Keep existing projects that aren't test data (Soccer Stats Tracker, FPL Analytics if real)
- The attention queue should auto-refresh or use real-time subscription
- Make the attention section collapsible when empty

---

## ✅ COMPLETED FEATURES

### Feature 1: Human Escalation ✅
- ✅ Added `waiting_human` task status with database migration
- ✅ Created HumanAttentionQueue component with real-time updates
- ✅ Positioned prominently at top of dashboard
- ✅ Orange/yellow design for visual urgency
- ✅ Quick action buttons: "Start Work" and "Resolve"
- ✅ Updated all UI components to support new status

### Feature 2: Data Cleanup ✅  
- ✅ Created `/api/admin/seed` endpoint for data management
- ✅ GET endpoint for dry-run preview
- ✅ POST endpoint cleans test data and creates real projects
- ✅ Mission Control, DpuDebugAgent, FPL Analytics projects ready
- ✅ Basic auth protection for admin operations

### Feature 3: Task Panel Layout ✅
- ✅ Fixed content alignment with proper left padding
- ✅ Improved metadata grid spacing (from cramped to spacious)  
- ✅ Moved Edit button to top-right header position
- ✅ Enhanced typography with better line-height and margins
- ✅ Increased panel width for better content display

**All acceptance criteria completed! 🎉**
