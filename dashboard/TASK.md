# 🎯 Mission Control Dashboard — Build Task

## Context
You're continuing a Next.js dashboard build. Phase 1 is done (Kanban, basic views). 
Now build Phase 2 features.

**Supabase is already configured** in `.env.local` and `src/lib/supabase.ts`.

## Your Mission: Sprint 2.1 Features

Build these 6 features in order:

### 1. List View Component
- Jira-style sortable table for tasks
- Columns: Title, Status, Assignee, Priority, Created
- Click row → opens task detail (side panel later)
- Add toggle between List View / Kanban View

### 2. Command Palette (Cmd+K)
- Global keyboard shortcut `Cmd+K` or `Ctrl+K`
- Search tasks by title
- Quick actions: Create task, Go to project, Switch view
- Use shadcn/ui Command component

### 3. Quick Filters
- Filter bar with chips for: Status, Assignee, Type
- Multiple selections allowed
- Clear all button
- Filters persist in URL params

### 4. Task Side Panel
- Clicking a task slides in a detail panel from right
- Shows full task details + edit form
- Can close with X or Escape
- No page navigation (stays on list/kanban)

### 5. Inline Editing
- Click task title → becomes editable input
- Click assignee → dropdown to change
- Click status → dropdown to change
- Auto-saves on blur

### 6. Project Progress Indicator
- Shows % complete for project
- Based on tasks done vs total
- Visual progress bar on project page

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components (install as needed: `npx shadcn@latest add <component>`)
- Supabase client already configured

## Supabase Schema Reference

```sql
-- Tasks table (key fields)
tasks (
  id UUID,
  title TEXT,
  description TEXT,
  status TEXT, -- backlog, assigned, in_progress, blocked, review, done, cancelled
  task_type TEXT, -- development, research, design, testing, documentation, business, marketing, other
  priority INTEGER, -- 0-3
  assigned_to TEXT, -- agent id
  project_id UUID,
  created_at TIMESTAMPTZ
)

-- Agents table
agents (
  id TEXT PRIMARY KEY,
  display_name TEXT,
  role TEXT,
  agent_type TEXT -- pm, specialist
)

-- Projects table
projects (
  id UUID,
  name TEXT,
  status TEXT,
  current_pm_id TEXT
)
```

## File Structure
Put new components in:
- `src/components/ui/` — shadcn components
- `src/components/` — app components
- `src/app/` — pages

## Acceptance Criteria
- [ ] List view shows all tasks in sortable table
- [ ] Cmd+K opens search/command palette
- [ ] Can filter by status/assignee/type
- [ ] Clicking task opens side panel (no page nav)
- [ ] Can edit task title/assignee/status inline
- [ ] Project page shows progress bar

## Notes
- Real-time updates are nice-to-have (basic CRUD is priority)
- Mobile responsive is nice-to-have
- Dark mode already works via Tailwind

**Start with #1 (List View), test it works, then continue to #2, etc.**
