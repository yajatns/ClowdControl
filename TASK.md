# Task: Make PM Notification Configurable — Setup Wizard for New Instances

## Objective
Create a setup wizard / configuration panel that lets new Mission Control users configure how the PM gets notified. Currently the Discord webhook URL is hardcoded in `.env.local` — this should be configurable through the dashboard UI with a guided setup flow.

## Context
The Mission Control dashboard at `/Users/yajat/workspace/projects/mission-control/dashboard/` is a Next.js 15 app with Tailwind CSS, using Supabase as the backend. The `notifyPM()` function in `src/lib/discord-notify.ts` currently reads from `process.env.DISCORD_WEBHOOK_URL`. We need to make this configurable per-project.

## Requirements

### 1. Notification Settings in Project Settings
Add a "Notifications" section to the existing Project Settings modal (`ProjectSettings.tsx`):

- **Discord Webhook URL** — text input for the webhook URL
- **Test Connection** button — sends a test message to verify the webhook works
- **Notification Types** toggle — which events trigger notifications:
  - Task started (Start button pressed)
  - Execution mode changed
  - Bug reported
  - Task completed
  - Sprint completed
- **Status indicator** — shows if webhook is configured and working (green dot) or not (red dot)

### 2. Store in Project Settings
Extend the `ProjectSettings` type in `src/lib/supabase.ts`:

```typescript
interface ProjectSettings {
  execution_mode: ExecutionMode;
  sprint_approval: SprintApproval;
  budget_limit_per_sprint: number | null;
  // NEW:
  notification_webhook_url: string | null;
  notification_types: {
    task_started: boolean;
    mode_changed: boolean;
    bug_reported: boolean;
    task_completed: boolean;
    sprint_completed: boolean;
  };
}
```

### 3. Update notifyPM() to Use Project Settings
Modify `discord-notify.ts`:
- Accept a `projectId` parameter
- Look up the project's webhook URL from Supabase settings
- Fall back to `process.env.DISCORD_WEBHOOK_URL` if no project-level URL is set
- Check notification type toggles before sending
- Add a `testNotification()` function for the test button

### 4. Test Webhook API
Create `dashboard/src/app/api/projects/[id]/test-webhook/route.ts`:
- `POST` endpoint that sends a test message to the configured webhook
- Returns success/failure status
- Message format: `✅ **Mission Control** — Webhook test successful! Notifications are working for project: {name}`

### 5. Setup Wizard (First-Time Experience)
If no webhook URL is configured for a project, show a banner/callout on the project page:
- "⚙️ Set up PM notifications to get the most out of Mission Control"
- Link to Settings → Notifications section
- Brief instructions: "Create a Discord webhook in your channel → paste the URL here → click Test"
- Dismissible (save dismiss state in localStorage)

## Files to Create
- `dashboard/src/app/api/projects/[id]/test-webhook/route.ts`

## Files to Modify
- `dashboard/src/lib/supabase.ts` — Extend ProjectSettings type
- `dashboard/src/lib/discord-notify.ts` — Accept projectId, lookup from DB, check notification types
- `dashboard/src/components/ProjectSettings.tsx` — Add Notifications section with webhook URL, toggles, test button
- `dashboard/src/app/projects/[id]/page.tsx` — Add setup banner if webhook not configured

## Acceptance Criteria
- [ ] Notification section visible in Project Settings modal
- [ ] Webhook URL can be saved per-project to Supabase
- [ ] Test button sends a real message and shows success/failure
- [ ] notifyPM() reads project-level webhook URL from DB
- [ ] notifyPM() respects notification type toggles
- [ ] Falls back to env var if no project-level URL configured
- [ ] Setup banner shows when no webhook is configured
- [ ] Banner is dismissible
- [ ] Dark mode styling matches existing components

## Out of Scope
- Slack/Teams/other notification channels (Discord only for now)
- Email notifications
- Per-user notification preferences

## Notes
- Keep the existing env var fallback so it doesn't break current setup
- The ProjectSettings modal already has execution_mode and sprint_approval — add a third section
- Use the existing zinc/dark-mode palette
