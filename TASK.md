# Task: Add Report Bug Button — Let Humans Talk Directly to PM

## Objective
Add a "Report Bug" button to the project dashboard that lets users submit bugs directly. The bug gets created as a task in Supabase and a Discord notification is sent to the PM.

## Context
The Mission Control dashboard at `/Users/yajat/workspace/projects/mission-control/dashboard/` is a Next.js 15 app with Tailwind CSS, using Supabase as the backend. We already have a `notifyPM()` function in `src/lib/discord-notify.ts` that sends messages to Discord.

## Requirements

### 1. Bug Report Dialog Component
Create `dashboard/src/components/BugReportDialog.tsx`:
- Modal dialog triggered by a 🐛 button in the project header area
- Fields: Title (required), Description (textarea, required), Priority (P1/P2/P3 dropdown, default P2), Steps to Reproduce (optional textarea)
- Submit creates a task in Supabase via API
- Clean dark-mode UI matching existing components (zinc palette)

### 2. Bug Report API Endpoint
Create `dashboard/src/app/api/projects/[id]/bugs/route.ts`:
- `POST` endpoint that:
  - Creates a new task in Supabase with `task_type: "bug"`, `status: "backlog"`, the active sprint ID
  - Sends Discord notification via `notifyPM()`:
    ```
    🐛 **Bug Reported**
    **Title:** {title}
    **Priority:** P{priority}
    **Description:** {description}
    **Task ID:** `{task_id}`
    
    PM: Triage and assign to an agent.
    ```
  - Returns the created task

### 3. Wire Into Project Page
In `dashboard/src/app/projects/[id]/page.tsx`:
- Add the BugReportDialog component near the settings/header area
- Pass the project ID and active sprint ID

### 4. Supabase Integration
Use the existing `supabaseAdmin` client from `src/lib/supabase.ts` to create tasks. The tasks table schema:
- `id` (uuid, auto)
- `title` (text)
- `description` (text)
- `status` (text) — set to 'backlog'
- `priority` (int) — 1, 2, or 3
- `task_type` (text) — set to 'bug'
- `sprint_id` (uuid) — the active sprint
- `project_id` (uuid)
- `assigned_to` (text, nullable)
- `tags` (text[], set to ['bug', 'user-reported'])

## Files to Create
- `dashboard/src/components/BugReportDialog.tsx`
- `dashboard/src/app/api/projects/[id]/bugs/route.ts`

## Files to Modify
- `dashboard/src/app/projects/[id]/page.tsx` — add BugReportDialog

## Acceptance Criteria
- [ ] 🐛 button visible on project page
- [ ] Clicking opens a modal with title, description, priority, steps to reproduce
- [ ] Submit creates a task in Supabase with correct fields
- [ ] Discord notification sent to PM
- [ ] Error handling for missing fields
- [ ] Dialog closes and shows success state after submit
- [ ] Dark mode styling matches existing components

## Out of Scope
- File attachments
- Screenshot capture
- Assigning bugs to agents (PM does that)

## Notes
- Use existing `Dialog` component pattern from `src/components/ui/dialog.tsx` if available
- Follow the existing code style in the project
- The Supabase anon key is in `.env.local`
