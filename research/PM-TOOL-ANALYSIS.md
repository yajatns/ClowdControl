# PM Tool Analysis for Mission Control

## Executive Summary

After analyzing Jira, Linear, Asana, Notion, Monday.com, and ClickUp, the key insight is clear: **modern PM tools succeed by being opinionated and fast, not by being everything to everyone.** Mission Control should adopt Linear's speed-first philosophy while incorporating the most valuable features from each tool.

---

## Feature Comparison Table

| Feature | Jira | Linear | Asana | Monday.com | ClickUp | Notion |
|---------|------|--------|-------|------------|---------|--------|
| **List View** | ✅ Advanced w/ JQL | ✅ Fast, minimal | ✅ Clean | ✅ Colorful | ✅ Dense | ✅ Flexible |
| **Board/Kanban** | ✅ Full-featured | ✅ Beautiful | ✅ Good | ✅ Good | ✅ Good | ✅ Basic |
| **Timeline/Gantt** | ✅ Premium | ❌ No | ✅ Premium | ✅ Good | ✅ Excellent | ✅ Basic |
| **Calendar View** | ✅ Yes | ❌ Limited | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Sprint/Cycle Planning** | ✅ Powerful | ✅ Elegant | ⚠️ Basic | ⚠️ Basic | ✅ Yes | ⚠️ Manual |
| **Roadmap** | ✅ Yes | ✅ Built-in | ✅ Yes | ✅ Yes | ✅ Yes | ⚠️ Manual |
| **Burndown Charts** | ✅ Comprehensive | ✅ Auto | ⚠️ Limited | ⚠️ Limited | ✅ Yes | ❌ No |
| **Velocity Tracking** | ✅ Yes | ✅ Yes | ❌ No | ❌ No | ✅ Yes | ❌ No |
| **Custom Fields** | ✅ Unlimited | ⚠️ Limited | ✅ Good | ✅ Excellent | ✅ Excellent | ✅ Flexible |
| **Keyboard Shortcuts** | ⚠️ Basic | ✅ Exceptional | ⚠️ Basic | ⚠️ Basic | ✅ Good | ✅ Good |
| **Speed/Performance** | ❌ Slow | ✅ Blazing | ✅ Good | ✅ Good | ⚠️ Can lag | ✅ Good |
| **Filtering/Search** | ✅ JQL (powerful) | ✅ Simple+fast | ✅ Good | ✅ Visual | ✅ Good | ✅ Database |
| **Integrations** | ✅ 3000+ | ✅ Dev-focused | ✅ 270+ | ✅ 200+ | ✅ Many | ✅ Many |
| **AI Features** | ✅ Atlassian Intelligence | ✅ AI workflows | ✅ AI Studio | ✅ AI assistant | ✅ ClickUp Brain | ⚠️ Basic |
| **Learning Curve** | ❌ High | ✅ Low | ✅ Low | ✅ Low | ⚠️ Medium | ⚠️ Medium |

---

## Tool-by-Tool Analysis

### 🔷 Linear: The Gold Standard for Modern PM UX

**Why developers love it:**
- **Keyboard-first design**: Every action accessible via shortcuts (`Cmd+K` for command palette)
- **Blazing fast**: Near-instant UI, no loading spinners
- **Opinionated workflow**: Issues flow from Triage → Backlog → In Progress → Done
- **Clean, minimal UI**: Reduces cognitive load; only shows what matters
- **Native GitHub integration**: Auto-updates issue status when PRs merge

**Key UX patterns to adopt:**
1. **Command palette** (`Cmd+K`): Universal search + actions
2. **Inline editing**: Click any field to edit instantly
3. **Real-time sync**: No refresh needed, ever
4. **Status indicators**: Color-coded, always visible
5. **Cycles (sprints)**: Auto-rollover incomplete tasks
6. **Issue IDs**: Short, memorable (e.g., `ENG-123`)

**Linear's limitations:**
- No Gantt/timeline view
- Limited custom fields
- Basic reporting compared to Jira
- No workload management

---

### 🔵 Jira: Enterprise Power, Enterprise Complexity

**Strengths:**
- **JQL (Jira Query Language)**: Powerful filtering (`project = ENG AND sprint = "Sprint 5" AND assignee = currentUser()`)
- **Advanced agile reporting**: Burndown, velocity, cumulative flow, control charts
- **Highly customizable workflows**: Any status, any transition
- **Enterprise features**: SSO, audit logs, compliance
- **Massive ecosystem**: 3000+ integrations

**Key features to learn from:**
1. **Sprint burndown chart**: Visual progress tracking
2. **Velocity chart**: Predict future capacity
3. **Epic/release burndown**: Track larger initiatives
4. **Control chart**: Analyze cycle time
5. **Cumulative flow diagram**: Spot bottlenecks

**Jira's problems (what to avoid):**
- Slow, especially at scale
- Overwhelming UI with too many options
- Steep learning curve
- Configuration paralysis

---

### 🟢 Asana: Clean Workflows for Cross-Functional Teams

**Strengths:**
- **Multiple views**: List, Board, Timeline, Calendar, Gantt
- **Portfolio management**: Track multiple projects at once
- **AI automation**: Natural language workflow builder
- **My Tasks view**: Personal dashboard of assigned work
- **Workload management**: See team capacity

**Key patterns:**
1. **Task sections**: Group tasks within a project
2. **Multi-homing**: Same task in multiple projects
3. **Progress indicators**: % complete on projects
4. **Dependencies**: Waiting-on and blocking relationships

---

### 🟡 Monday.com: Visual Customization King

**Strengths:**
- **15+ views**: List, Board, Calendar, Timeline, Gantt, Map, Chart, etc.
- **50+ widgets**: Highly customizable dashboards
- **Color coding**: Status columns are instantly scannable
- **Workdocs**: Embedded collaborative documents
- **Split-screen task view**: Details + updates side by side

**Key patterns:**
1. **Status columns**: Color-coded at a glance
2. **Multiple board views**: Same data, different lenses
3. **Dashboard widgets**: Drag-and-drop reporting
4. **Automation recipes**: If-this-then-that logic

---

### 🟣 ClickUp: Swiss Army Knife of PM Tools

**Strengths:**
- **Most views**: List, Board, Box, Calendar, Gantt, Timeline, Workload, Table, Mind Map, Team, Activity, Docs, Chat, Whiteboards
- **Hierarchy**: Workspace → Space → Folder → List → Task → Subtask
- **Time tracking**: Built-in
- **Goals**: OKR-style tracking
- **Docs + Whiteboards**: All-in-one workspace

**Key patterns:**
1. **Flexible hierarchy**: Organize any way you want
2. **Multiple assignees**: Collaboration on tasks
3. **Time estimates vs actuals**: Compare planned vs real
4. **Workload view**: See who's overloaded

**ClickUp's problems:**
- Feature bloat (can be overwhelming)
- Performance issues with large workspaces

---

### 🟤 Notion: Flexible Database Power

**Strengths:**
- **Database views**: Same data as Table, Board, Calendar, Timeline, Gallery, List
- **Relations**: Link databases together
- **Templates**: Create reusable structures
- **All-in-one**: Docs + databases + wiki
- **Flexibility**: Build anything you want

**Key patterns:**
1. **Linked database views**: Filter same data differently
2. **Rollups**: Aggregate related data
3. **Formulas**: Computed properties
4. **Toggle content**: Progressive disclosure

**Notion's limitations:**
- No built-in sprints or velocity
- Manual burndown tracking
- Not optimized for agile teams

---

## Recommended Features for Mission Control (Prioritized)

### 🔴 P0: Must Have (Core Functionality)

| Feature | Why | Implementation Notes |
|---------|-----|---------------------|
| **List View** | Primary task view | Sortable columns, inline editing, bulk actions |
| **Kanban Board** | Visual workflow | Drag-drop, swimlanes by assignee/priority |
| **Command Palette** | Power user efficiency | `Cmd+K` for search + actions |
| **Quick Filters** | Fast data access | Status, assignee, label, sprint chips |
| **Task Detail Panel** | View/edit without leaving page | Side panel or modal |
| **Real-time Updates** | Team sync | WebSocket-based live updates |
| **Keyboard Shortcuts** | Speed | Global navigation + task actions |

### 🟠 P1: Should Have (Agile Essentials)

| Feature | Why | Implementation Notes |
|---------|-----|---------------------|
| **Sprint/Cycle Planning** | Agile methodology | Start/end dates, sprint goals, capacity |
| **Sprint Burndown** | Progress tracking | Story points vs time remaining |
| **Backlog View** | Prioritization | Drag to reorder, sprint assignment |
| **Velocity Chart** | Forecasting | Rolling average over sprints |
| **Labels/Tags** | Categorization | Multi-select, color-coded |
| **Assignee Management** | Ownership | Avatar display, multi-assign option |
| **Due Dates** | Time tracking | Calendar picker, overdue highlighting |

### 🟡 P2: Nice to Have (Enhanced Planning)

| Feature | Why | Implementation Notes |
|---------|-----|---------------------|
| **Timeline/Gantt** | Project planning | Drag to adjust dates, dependencies |
| **Calendar View** | Date-based perspective | Month/week views |
| **Roadmap View** | Strategic planning | Projects/milestones on timeline |
| **Cumulative Flow Diagram** | Bottleneck detection | Stacked area chart |
| **Cycle Time Metrics** | Process optimization | Time in each status |
| **Workload View** | Capacity planning | Work per person over time |
| **Custom Fields** | Flexibility | Text, number, select, date |

### 🟢 P3: Future Enhancements

| Feature | Why | Implementation Notes |
|---------|-----|---------------------|
| **Goals/OKRs** | Strategic alignment | Link tasks to objectives |
| **AI Summaries** | Efficiency | Auto-summarize tasks, meetings |
| **Automation Rules** | Workflow efficiency | If-this-then-that triggers |
| **Portfolio View** | Multi-project tracking | Health scores, progress bars |
| **Time Tracking** | Resource management | Estimates vs actuals |
| **Dependencies** | Complex projects | Blocking/blocked-by relationships |

---

## UI/UX Patterns to Adopt

### 1. Speed-First Design (from Linear)
```
Principles:
- Optimistic UI updates (change immediately, sync in background)
- No loading spinners for common actions
- Instant search with fuzzy matching
- Keyboard shortcuts for everything
```

### 2. Command Palette Pattern
```tsx
// Trigger: Cmd+K or Ctrl+K
<CommandPalette>
  <SearchInput placeholder="Type a command or search..." />
  <Results>
    <Section title="Actions">
      <Item>Create new task</Item>
      <Item>Go to backlog</Item>
      <Item>Start sprint</Item>
    </Section>
    <Section title="Recent Tasks">
      {recentTasks.map(task => <TaskItem />)}
    </Section>
  </Results>
</CommandPalette>
```

### 3. Status Chips with Color
```tsx
// Visual status indicators (Linear/Monday style)
const statusColors = {
  backlog: 'gray',
  todo: 'blue', 
  'in-progress': 'yellow',
  'in-review': 'purple',
  done: 'green',
  cancelled: 'red'
};

<StatusChip status={task.status} />
```

### 4. Inline Editing
```tsx
// Click to edit any field (Linear pattern)
<EditableField 
  value={task.title}
  onSave={(newValue) => updateTask(task.id, { title: newValue })}
/>
```

### 5. Quick Filters Bar
```tsx
// Chip-based filters (Asana/Linear pattern)
<FiltersBar>
  <FilterChip type="status" options={statuses} />
  <FilterChip type="assignee" options={teamMembers} />
  <FilterChip type="label" options={labels} />
  <FilterChip type="sprint" options={sprints} />
  <ClearFilters />
</FiltersBar>
```

### 6. Task Detail Side Panel
```tsx
// Don't navigate away from list (Linear/Asana pattern)
<TaskList>
  {tasks.map(task => <TaskRow onClick={() => openPanel(task)} />)}
</TaskList>

<SidePanel isOpen={selectedTask}>
  <TaskHeader task={selectedTask} />
  <TaskProperties editable />
  <TaskDescription />
  <Comments />
  <ActivityLog />
</SidePanel>
```

---

## Key Metrics & KPIs to Display

### Sprint Dashboard
| Metric | Description | Visualization |
|--------|-------------|---------------|
| **Sprint Progress** | % complete of sprint | Progress bar |
| **Burndown** | Story points remaining vs ideal | Line chart |
| **Velocity** | Points completed per sprint | Bar chart (3-sprint average) |
| **Open Issues** | Count by status | Pie or stacked bar |
| **Overdue Tasks** | Tasks past due date | Count + list |
| **Blocked Items** | Tasks with blockers | Count with alert |

### Team Health Indicators
| Indicator | Red Flag | Implementation |
|-----------|----------|----------------|
| **Sprint Scope Creep** | >10% tasks added mid-sprint | Track task additions |
| **Carryover Rate** | >30% incomplete from last sprint | Compare start vs end |
| **Cycle Time Trending Up** | Increasing over 3 sprints | Calculate avg time in progress |
| **WIP Limit Exceeded** | >3 tasks per person in progress | Count in-progress by assignee |

---

## Implementation Suggestions for Next.js

### Recommended Stack
```
Frontend:
- Next.js 15 (App Router)
- Tailwind CSS + shadcn/ui
- @tanstack/react-query (data fetching)
- Zustand (client state)
- @dnd-kit (drag and drop)
- cmdk (command palette)

Backend:
- Next.js API routes or tRPC
- Prisma + PostgreSQL
- WebSockets for real-time (Pusher/Ably or Socket.io)
```

### Key Components to Build

1. **TaskTable** - Sortable list view with column customization
2. **KanbanBoard** - Drag-drop board with swimlanes
3. **CommandPalette** - Global search + actions (`cmdk` library)
4. **TaskPanel** - Slide-out detail view
5. **SprintBurndown** - Chart.js or Recharts
6. **FilterBar** - Chip-based quick filters
7. **InlineEdit** - Click-to-edit text fields

### Data Model Suggestions
```prisma
model Task {
  id          String   @id @default(cuid())
  identifier  String   @unique // e.g., "MC-123"
  title       String
  description String?
  status      Status   @default(BACKLOG)
  priority    Priority @default(MEDIUM)
  storyPoints Int?
  dueDate     DateTime?
  
  assigneeId  String?
  assignee    User?    @relation(fields: [assigneeId])
  
  sprintId    String?
  sprint      Sprint?  @relation(fields: [sprintId])
  
  projectId   String
  project     Project  @relation(fields: [projectId])
  
  labels      Label[]
  comments    Comment[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Sprint {
  id        String   @id @default(cuid())
  name      String   // e.g., "Sprint 5"
  goal      String?
  startDate DateTime
  endDate   DateTime
  tasks     Task[]
  projectId String
  project   Project  @relation(fields: [projectId])
}
```

---

## Summary: What Would Make Mission Control Feel Professional

1. **Be fast** - No spinners, optimistic updates, instant search
2. **Keyboard-first** - Everything accessible via shortcuts
3. **Clean, opinionated UI** - Don't show everything; show what matters
4. **Real-time collaboration** - See changes as they happen
5. **Built-in agile metrics** - Burndown, velocity, cycle time
6. **Flexible views** - List, Board, (later: Timeline, Calendar)
7. **Command palette** - The modern power-user interface
8. **Smart defaults** - Opinionated workflow that just works

The goal isn't to copy Jira's feature list—it's to capture Linear's speed and developer experience while adding the planning tools (Gantt, roadmaps, metrics) that PMs actually need.

---

*Research completed: Feb 2026*
