# Task: Add Report Bug Button — Let Humans Talk Directly to PM

## Task ID
`9038dec9-f590-4fa4-8b0b-c13f33e9adf0`

## Objective
Add a floating "Report Bug" button in the dashboard that lets humans file bugs directly. Creates a task in Supabase and optionally notifies the PM via Discord.

## Context
This is the Mission Control dashboard — a Next.js app using Supabase, Tailwind, and shadcn/ui components. The project lives at `/Users/yajat/workspace/projects/mission-control/dashboard/`.

Key existing files:
- `src/lib/supabase.ts` — DB client, all types and helpers
- `src/lib/discord-notify.ts` — Discord webhook utility (`notifyPM()`)
- `src/app/api/tasks/route.ts` — Existing tasks API
- `src/components/ui/` — shadcn components (dialog, button, input, etc.)

## Requirements

### 1. Floating Bug Report Button
- 🐛 button, fixed position bottom-right corner
- Visible on all pages (add to `layout.tsx` or a client wrapper)
- Subtle but discoverable — small round button with tooltip

### 2. Bug Report Modal
When clicked, opens a dialog with:
- **Title** (required text input)
- **Description** (textarea, optional but encouraged)
- **Severity** dropdown: P1 (Critical), P2 (High), P3 (Medium)
- **Submit** button
- **Cancel** button

Use existing shadcn `dialog` component from `src/components/ui/dialog.tsx`.

### 3. Submit Flow
On submit:
1. POST to `/api/tasks` (or create a new `/api/bugs/route.ts`) with:
   ```json
   {
     "project_id": "<current project ID from URL or context>",
     "title": "[BUG] {user title}",
     "description": "{user description}",
     "task_type": "bug",
     "priority": <severity as number>,
     "created_by": "human",
     "status": "backlog"
   }
   ```
2. Send Discord notification via `notifyPM()`:
   ```
   🐛 **Bug Reported by Human**
   **Title:** {title}
   **Severity:** P{n}
   **Description:** {description}
   
   Task created: `{task_id}`
   ```
3. Show confirmation toast/message with task ID
4. Close modal

### 4. API Endpoint
Create `src/app/api/bugs/route.ts`:
- POST handler that creates a task with `task_type: 'bug'` and `created_by: 'human'`
- Sends Discord notification
- Returns created task

### 5. Determine Project Context
- If user is on `/projects/[id]` page, use that project ID
- If on homepage or elsewhere, either:
  - Show a project selector in the modal, OR
  - Default to the Mission Control project (`949d00d5-9072-4353-a0e9-174468978598`)

## Files to Create
- `src/components/BugReportButton.tsx` — Floating button + modal
- `src/app/api/bugs/route.ts` — Bug creation API

## Files to Modify
- `src/app/layout.tsx` — Add `<BugReportButton />` to layout
- `src/lib/supabase.ts` — Add `createBugReport()` helper if needed

## Acceptance Criteria
- [ ] Floating 🐛 button visible on all pages
- [ ] Clicking opens modal with title, description, severity
- [ ] Submit creates task in Supabase with task_type='bug'
- [ ] Discord notification sent to PM on submit
- [ ] Confirmation shown to user
- [ ] Modal closes after successful submit
- [ ] Works on project pages (uses project context) and homepage

## Out of Scope
- Chat-like natural language bug reporting (future enhancement)
- Authentication (no login required for now)
- File/screenshot attachments

## Notes
- Keep it simple and clean — minimal UI
- The sprint_id can be null (bugs go to backlog, PM triages later)
- Use existing shadcn components, don't add new UI libraries
