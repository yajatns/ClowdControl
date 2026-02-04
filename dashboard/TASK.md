# TASK: Fix RLS — authenticated users see 0 projects

## Problem
After enabling Supabase Auth + RLS, logged-in users see no projects. The debug endpoint at `/api/debug-auth` confirms:
- User IS authenticated (auth.uid() returns correct UUID)
- Service role sees 6 projects (bypasses RLS)
- Authenticated user query returns [] (no error, just empty)
- auth_uid_check SECURITY DEFINER function shows project_count: 6 — data matches

## What's been done
1. RLS enabled on projects, tasks, sprints, activity_log, proposals, profiles, project_members
2. Policies created (users_view_projects FOR SELECT, admins_modify_projects FOR ALL)
3. owner_id set on all projects to the user's UUID
4. GRANT SELECT ON projects TO authenticated, anon; (and similar for other tables) — executed but still not working

## Root cause hypothesis
The GRANT statements may not have been applied correctly, or there's a policy conflict. Possibly the `admins_modify_projects FOR ALL` policy interferes with SELECT, or the grants aren't taking effect.

## What to do
1. Connect to Supabase and diagnose why authenticated role can't SELECT from projects despite policies
2. The Supabase URL and keys are in `.env.local` (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
3. You can run SQL via the Supabase Management API or create RPC functions
4. Fix the issue so that `SELECT * FROM projects` returns rows for authenticated users
5. Test by running `npm run dev -- -p 3001` and checking http://localhost:3001/api/debug-auth (sign in first at /login with yajatns@gmail.com)
6. Also verify the dashboard homepage loads projects

## Key files
- `supabase/migrations/20260204_auth_system.sql` — the migration with all policies
- `src/lib/supabase.ts` — client (uses Proxy to pick browser vs server client)
- `src/app/api/debug-auth/route.ts` — debug endpoint
- `src/middleware.ts` — auth middleware (excludes /api/ routes)

## Supabase details
- URL: https://emsivxzsrkovjrrpquki.supabase.co
- Yajat's user ID: 1c9424ee-495f-49db-a3ae-39ba97fd6576
- All projects have owner_id = 1c9424ee-495f-49db-a3ae-39ba97fd6576

## Definition of Done
- Authenticated user sees their projects on the dashboard
- `/api/debug-auth` shows authProjectsCount > 0 when logged in
- `npm run build` still passes
