# Task: Wire claude-code-mastery agents into worker-dev dispatch

## Task ID
`d7ec9302-702a-4cf3-aedf-12c839aa80fc`

## Objective
Implement the mastery agent integration designed in `docs/MASTERY-INTEGRATION.md`. This wires claude-code-mastery sub-agents (senior-dev, junior-dev, frontend-dev, etc.) into Mission Control's worker dispatch system.

## What to Implement

### 1. Update worker-dev.md agent profile
- Edit `agents/worker-dev.md` to include mastery agent delegation instructions
- Add complexity analysis framework: low → junior-dev, high → senior-dev, frontend → frontend-dev, etc.
- Include delegation strategy and available mastery agents list

### 2. Update PM-PROTOCOL.md with mastery integration
- Add a "Claude Code Mastery Integration" section to `PM-PROTOCOL.md`
- Document the two-tier delegation pattern: PM → Claude Code → Mastery Agent
- Add delegation hints for task dispatch

### 3. Create enhanced task template
- Create `agents/TASK-MASTERY-TEMPLATE.md` with:
  - Complexity analysis section
  - Domain categorization (frontend/backend/fullstack/architecture)
  - Suggested mastery agent field
  - Delegation instructions block

### 4. Verify mastery agents are installed
- Check `~/.claude/agents/` directory exists and has agents
- If missing, run the install script from claude-code-mastery skill
- List available agents in the profile

### 5. Update skill/SKILL.md dispatch logic
- When dispatching to worker-dev, include mastery delegation hints in task file
- Add complexity-based agent selection rules
- Document fallback: if delegation fails, worker-dev handles directly

## Reference
- Design doc: `docs/MASTERY-INTEGRATION.md` (read this first!)
- Current PM protocol: `PM-PROTOCOL.md`
- Current worker profile: `agents/worker-dev.md`
- Mastery skill: `/Users/yajat/workspace/skills/claude-code-mastery/SKILL.md`

## Project Location
`/Users/yajat/workspace/projects/mission-control`

## Acceptance Criteria
- [ ] worker-dev.md updated with mastery delegation framework
- [ ] PM-PROTOCOL.md has mastery integration section
- [ ] TASK-MASTERY-TEMPLATE.md created
- [ ] Mastery agents verified installed in ~/.claude/agents/
- [ ] skill/SKILL.md updated with mastery dispatch logic
- [ ] Build passes (if applicable)
- [ ] Changes committed to git
- [ ] Task marked done in Supabase

## Supabase Details
- **URL:** https://emsivxzsrkovjrrpquki.supabase.co/rest/v1
- **Key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtc2l2eHpzcmtvdmpycnBxdWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NzUzNDAsImV4cCI6MjA4NTU1MTM0MH0.jogq1dXEvF1S5fjRxvFfNnkO1eLbeHPBpvzVWJGG5IQ
- **Task ID:** d7ec9302-702a-4cf3-aedf-12c839aa80fc
- Mark done with: `PATCH /rest/v1/tasks?id=eq.d7ec9302-702a-4cf3-aedf-12c839aa80fc` body: `{"status": "done"}`
