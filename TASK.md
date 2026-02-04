# TASK: Add Report Bug Button (7d80188b)

## What
Add a floating bug report button (🐛) to the dashboard that lets users quickly submit bugs.

## Requirements

1. **Floating Button:** A small floating action button in the bottom-right corner of the dashboard with 🐛 emoji
2. **Click behavior:** Opens a simple modal/dialog with:
   - Title field (text input)
   - Description field (textarea)
   - Priority dropdown (P0/P1/P2/P3)
   - Submit button
3. **On submit:** POST to `/api/projects/{projectId}/bugs` (or create the task directly via Supabase client)
   - Creates a new task with the bug details
   - Status: backlog
   - Priority: from dropdown
   - Title prefix: "[BUG] "
4. **Feedback:** Show success toast/message after submission, close modal

## Technical Notes
- Use existing UI patterns from the dashboard (check components/ for existing modals/dialogs)
- The existing bug report API at `/api/projects/{id}/bugs` has a schema issue (tries to insert "tags" field) — either fix the API route or bypass it by creating the task directly via Supabase client
- Check `dashboard/src/lib/supabase.ts` for Task type and Supabase client
- Keep it simple — functional > fancy

## Acceptance Criteria
- Floating 🐛 button visible on all dashboard pages
- Clicking opens bug report form
- Submitting creates a task in Supabase
- Build passes: `npm run build`
- Commit changes
