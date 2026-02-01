# TASK: Mission Control - Build Dashboard (Continued)

## Status
- ✅ Task 1: Review Complete (schema is solid, minor fixes noted)
- 🔄 Task 2-5: In Progress

## Review Notes (from Task 1)
1. Add constraint to critiques table: `ALTER TABLE critiques ADD CONSTRAINT critiques_min_concerns CHECK (array_length(concerns, 1) >= 2);`
2. Enable real-time in Supabase dashboard for: tasks, activity_log, proposals, sycophancy_flags
3. RLS policies can be added post-MVP

## Your Tasks (Continue from Task 2)

### Task 2: Create Supabase Client Library
Create `lib/supabase.ts`:
```typescript
- Initialize Supabase client with env vars
- Export typed client
- Add helper functions for CRUD operations
```

### Task 3: Scaffold Next.js Dashboard
```bash
npx create-next-app@latest dashboard --typescript --tailwind --eslint --app --src-dir
```

Then:
- Install shadcn/ui
- Set up Supabase client
- Create basic layout

### Task 4: Build MVP Pages
Priority:
1. `/` - Project list (cards showing name, status, PM, task counts)
2. `/projects/[id]` - Project detail with sprint info
3. `/projects/[id]/tasks` - Kanban board

### Task 5: Real-time Activity Feed
- Subscribe to activity_log table
- Show live updates on project pages

## Environment
Credentials are in `.env` - use them via process.env

## Technical Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- @supabase/supabase-js v2
- React Query (optional)

## Deliverables
- Working dashboard with at least project list + detail pages
- README with setup instructions
- Commit your progress frequently

Start with Task 2 - create the Supabase client library!
