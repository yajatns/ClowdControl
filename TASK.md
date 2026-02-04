# TASK: Complete Avengers-to-Role-Based Naming (Remaining 7 Agents)

**Task ID:** 11f0eec0-0bc0-467e-9e07-9671a8cd5a4b
**Sprint:** 10
**Priority:** In Progress — follow-up to completed rename task

## Context
The first rename pass (task ab711588) renamed 4 core workers:
- friday-dev → worker-dev
- hawkeye → worker-qa
- wanda → worker-design
- wong → worker-research

But 7 specialist agents still have MCU/Avengers names.

## Scope
Rename these agents everywhere they appear:
1. **fury** → appropriate role-based name
2. **shuri** → appropriate role-based name
3. **antman** → appropriate role-based name
4. **loki** → appropriate role-based name
5. **pepper** → appropriate role-based name
6. **quill** → appropriate role-based name
7. **vision** → appropriate role-based name

## Where to Update
1. **Supabase `agents` table** — update `id` and `name` fields
2. **Agent profile `.md` files** in `/Users/yajat/workspace/projects/mission-control/agents/`
3. **README.md** references
4. **PM-PROTOCOL.md** roster and references
5. **All code references** in `dashboard/src/`
6. **Task assignments** in Supabase `tasks` table (any tasks assigned to old names)

## Supabase Config
- URL: https://emsivxzsrkovjrrpquki.supabase.co/rest/v1
- Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtc2l2eHpzcmtvdmpycnBxdWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NzUzNDAsImV4cCI6MjA4NTU1MTM0MH0.jogq1dXEvF1S5fjRxvFfNnkO1eLbeHPBpvzVWJGG5IQ

## Completion Criteria
- [ ] All 7 agents renamed in Supabase
- [ ] All agent .md files renamed/updated
- [ ] All code and doc references updated
- [ ] Dashboard build still passes (`cd dashboard && npm run build`)
- [ ] Git commit with changes
- [ ] Mark this task as `done` in Supabase:
  ```
  curl -X PATCH "https://emsivxzsrkovjrrpquki.supabase.co/rest/v1/tasks?id=eq.11f0eec0-0bc0-467e-9e07-9671a8cd5a4b" \
    -H "apikey: <KEY>" -H "Authorization: Bearer <KEY>" \
    -H "Content-Type: application/json" \
    -d '{"status": "done", "completed_at": "now()"}'
  ```

## Naming Convention
Use the pattern: `worker-{role}` for generic workers, or a descriptive role name. Keep `chhotu` and `cheenu` unchanged.
