# PM Protocol — Mission Control Agent Dispatch

**Version:** 1.0  
**Date:** February 2, 2026  
**Applies to:** Any PM agent (Chhotu, Cheenu, or future PMs)

---

## Overview

When a task needs execution in Mission Control, the PM follows a structured dispatch protocol. This ensures work flows through the proper agent pipeline — never done ad-hoc by the PM itself (unless no suitable specialist exists).

---

## Trigger Sources

The PM receives work requests from three sources:

| Source | How it arrives | Example |
|--------|---------------|---------|
| **Start Button** | Discord webhook to `#disclawd-mission-control` | `🚀 Start Requested — Task: Fix progress bug` |
| **Cron/Heartbeat** | PM heartbeat checks active sprints | PM finds unassigned tasks in priority order |
| **Manual** | Human tells PM directly | "Chhotu, start working on the auth feature" |

All three MUST follow the same dispatch protocol below.

---

## Dispatch Protocol

### Step 1: Parse the Task

Extract from the request:
- **Task title** and description
- **Task ID** (UUID from Supabase)
- **Task type** (development, research, design, testing, bug, documentation, etc.)
- **Priority** (P1-P4)
- **Project ID**

### Step 2: Query Agent Roster

Fetch specialist agents from Supabase:

```
GET /rest/v1/agents?agent_type=eq.specialist&is_active=eq.true
```

Each agent has:
```json
{
  "id": "friday-dev",
  "display_name": "Friday",
  "role": "Developer",
  "capabilities": ["coding", "debugging", "architecture"],
  "invocation_method": "claude_code",
  "invocation_config": {
    "model": "anthropic/claude-sonnet-4-5-20250514",
    "allowedTools": ["Bash(*)", "Edit(*)", "Write(*)", "Read(*)", "Fetch(*)"]
  }
}
```

### Step 3: Select Best Agent

Match task type → agent capabilities:

| Task Type | Primary Agent | Fallback |
|-----------|--------------|----------|
| `development`, `bug` | friday-dev (Developer) | PM does it |
| `research` | fury (Customer Researcher) | shuri (Product Analyst) |
| `design` | wanda (Designer) | — |
| `testing` | hawkeye (QA Engineer) | antman (UI QA) |
| `documentation` | wong (Documentation) | loki (Content Writer) |
| `business`, `marketing` | quill (Social Media) / pepper (Email) | — |
| `other` | PM evaluates and picks | — |

**Selection criteria:**
1. Match capabilities to task type
2. Check if agent is currently busy (via agent_sessions table)
3. Prefer agents with relevant recent activity on the same project

### Step 4: Create Task File

Write a detailed task specification to `tasks/TASK-{slug}.md`:

```markdown
# Task: {Title}

## Task ID
`{uuid}`

## Agent
- **Target:** {agent_id}
- **Model:** {from invocation_config}

## Objective
{Clear, specific goal}

## Requirements
1. {Requirement 1}
2. {Requirement 2}

## Acceptance Criteria
- [ ] {Criterion 1}
- [ ] {Criterion 2}

## Files to Modify
- `{path}` — {what changes}

## Project Location
`{absolute path to project}`
```

### Step 5: Invoke Agent

Based on `invocation_method`:

#### `sessions_spawn` (most agents)

```
sessions_spawn(
  task: "Read {task_file_path} and complete the task. Report results when done.",
  model: invocation_config.model,
  label: "{agent_id}-{task_slug}",
  thinking: invocation_config.thinking || undefined
)
```

#### `claude_code` (friday-dev)

1. Pre-trust the project in `~/.claude.json`
2. Write task to `TASK.md` in project root
3. Spawn via coding-agent skill:

```bash
cd {project_path}
claude --allowedTools "Bash(*)" "Edit(*)" "Write(*)" "Read(*)" "Fetch(*)" \
  "Follow TASK.md and complete the task. Commit your changes when done."
```

#### `custom` (future extensibility)

Follow `invocation_config.command` template.

### Step 6: Update Task Status

After spawning:
```sql
UPDATE tasks SET 
  status = 'assigned',
  assigned_to = '{agent_id}',
  assigned_at = NOW()
WHERE id = '{task_id}';
```

Log to activity_log:
```sql
INSERT INTO activity_log (project_id, action, actor_id, details)
VALUES ('{project_id}', 'task_assigned', 'chhotu', 
  '{"task_id": "{task_id}", "agent_id": "{agent_id}", "method": "{invocation_method}"}');
```

### Step 7: Monitor

- Check spawned session within 10 minutes
- If agent reports completion → move task to `review`
- If agent is stuck/blocked → reassign or escalate
- If agent fails 2x → PM does it directly + logs the failure

---

## Anti-Patterns (Don't Do This)

| ❌ Wrong | ✅ Right |
|----------|---------|
| PM fixes the bug itself without checking roster | PM queries agents, finds friday-dev, spawns them |
| PM says "No agent available" without checking DB | PM queries Supabase `agents` table |
| PM checks `agents_list` (Clawdbot internal) | PM queries Supabase for Mission Control roster |
| PM skips task file, gives instructions verbally | PM writes full task spec to `tasks/TASK-*.md` |
| PM announces spawn without actual tool call | PM calls tool first, confirms with real session ID |

---

## Agent Roster (Current)

| ID | Name | Role | Method | Model |
|----|------|------|--------|-------|
| friday-dev | Friday | Developer | claude_code | sonnet-4.5 |
| shuri | Shuri | Product Analyst | sessions_spawn | sonnet-4 |
| fury | Fury | Customer Researcher | sessions_spawn | sonnet-4 |
| hawkeye | Hawkeye | QA Engineer | sessions_spawn | sonnet-4 |
| antman | Ant-Man | UI QA Engineer | sessions_spawn | sonnet-4 |
| wong | Wong | Documentation | sessions_spawn | haiku-3.5 |
| wanda | Wanda | Designer | sessions_spawn | haiku-3.5 |
| loki | Loki | Content Writer | sessions_spawn | sonnet-3.5 |
| vision | Vision | SEO Analyst | sessions_spawn | sonnet-3.5 |
| quill | Quill | Social Media Manager | sessions_spawn | sonnet-3.5 |
| pepper | Pepper | Email Marketing | sessions_spawn | sonnet-3.5 |

---

## Sharing This Protocol

This protocol is designed to be **portable**. Any Clawdbot instance acting as PM can follow it:

1. The agent roster lives in **Supabase** (not local config) — shared across all PMs
2. Task files use a **standard template** in the project's `tasks/` directory
3. Invocation methods are **self-describing** — the DB tells you how to spawn each agent
4. Any PM reads this doc + queries the DB = ready to dispatch

To share with another Clawdbot PM (e.g., Cheenu):
- They read `PM-PROTOCOL.md` from the shared repo
- They query the same Supabase for the agent roster
- They follow the same dispatch steps

---

*This is the canonical reference for PM task dispatch in Mission Control.*
