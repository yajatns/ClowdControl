// Mission Control - Complete Workflow Guide
// Project Lifecycle, PM Election, Agent Assignment

#set document(
  title: "Mission Control Workflow",
  author: "DisClawd Team",
)

#set page(
  paper: "us-letter",
  margin: (x: 1.5cm, y: 1.5cm),
  fill: rgb("#0f0f1a"),
  header: context {
    if counter(page).get().first() > 1 [
      #set text(size: 9pt, fill: white.darken(50%))
      #grid(
        columns: (1fr, 1fr),
        align(left)[Mission Control Workflow],
        align(right)[Page #counter(page).display()]
      )
      #line(length: 100%, stroke: 0.5pt + rgb("#333"))
    ]
  }
)

#set text(
  font: "Helvetica Neue",
  size: 11pt,
  fill: white,
)

#show heading.where(level: 1): it => {
  pagebreak(weak: true)
  set text(size: 28pt, weight: "bold", fill: rgb("#00d4ff"))
  it
  v(0.5em)
  line(length: 100%, stroke: 2pt + rgb("#00d4ff"))
  v(0.5em)
}

#show heading.where(level: 2): it => {
  v(0.8em)
  set text(size: 18pt, weight: "semibold", fill: rgb("#00d4ff"))
  it
  v(0.3em)
}

#show heading.where(level: 3): it => {
  v(0.5em)
  set text(size: 14pt, weight: "semibold", fill: rgb("#7dd3fc"))
  it
  v(0.2em)
}

#let accent = rgb("#00d4ff")
#let success = rgb("#22c55e")
#let warning = rgb("#f59e0b")
#let danger = rgb("#ef4444")
#let purple = rgb("#a855f7")

#let card(content, fill: rgb("#1a1a2e"), title: none) = {
  block(
    width: 100%,
    fill: fill,
    radius: 8pt,
    inset: 1em,
    stroke: 1pt + rgb("#333"),
    {
      if title != none {
        text(weight: "bold", fill: accent)[#title]
        v(0.5em)
      }
      content
    }
  )
}

#let step-box(number, title, content) = {
  grid(
    columns: (auto, 1fr),
    gutter: 1em,
    align(center)[
      #circle(
        radius: 1.2em,
        fill: accent,
        text(fill: rgb("#0f0f1a"), weight: "bold", size: 14pt)[#number]
      )
    ],
    card[
      #text(weight: "bold", size: 13pt)[#title]
      #v(0.3em)
      #text(size: 10pt, fill: white.darken(20%))[#content]
    ]
  )
  v(0.5em)
}

#let arrow-down = {
  align(center)[
    #v(-0.3em)
    #text(fill: accent, size: 16pt)[↓]
    #v(-0.3em)
  ]
}

#let phase-header(name, color, status) = {
  box(
    width: 100%,
    fill: color.lighten(80%),
    radius: 6pt,
    inset: 0.8em,
    stroke: 2pt + color,
  )[
    #grid(
      columns: (1fr, auto),
      text(fill: color.darken(40%), weight: "bold", size: 14pt)[#name],
      text(fill: color.darken(20%), size: 11pt)[#status]
    )
  ]
}

// ========== COVER PAGE ==========
#page[
  #v(4fr)
  #align(center)[
    #text(size: 48pt, weight: "bold", fill: accent)[Mission Control]
    #v(0.3em)
    #text(size: 24pt, fill: white.darken(20%))[Complete Workflow Guide]
    #v(2em)
    #line(length: 40%, stroke: 2pt + accent)
    #v(2em)
    #text(size: 14pt, fill: white.darken(40%))[
      Project Lifecycle • PM Election • Agent Assignment \
      Task Management • Sprint Planning • Anti-Groupthink Protocol
    ]
  ]
  #v(5fr)
  #align(center)[
    #text(size: 12pt, fill: white.darken(50%))[DisClawd Team • February 2026 • v1.0]
  ]
]

// ========== TABLE OF CONTENTS ==========
#page[
  #text(size: 28pt, weight: "bold", fill: accent)[Contents]
  #v(1em)
  
  #set text(size: 12pt)
  #grid(
    columns: (auto, 1fr, auto),
    gutter: 0.8em,
    [*1*], [Project Lifecycle Overview], [3],
    [*2*], [Human → System Handoff], [4],
    [*3*], [PM Election Process], [5],
    [*4*], [Task Creation & Assignment], [6],
    [*5*], [Sprint Planning Workflow], [7],
    [*6*], [Agent Assignment Rules], [8],
    [*7*], [Anti-Groupthink Protocol], [9],
    [*8*], [Escalation & Human Review], [10],
    [*9*], [Feature Reference Guide], [11],
    [*10*], [Complete Flow Diagram], [12],
  )
]

// ========== 1. PROJECT LIFECYCLE ==========
= 1. Project Lifecycle Overview

The complete journey from idea to shipped feature:

#v(1em)

#grid(
  columns: (1fr, 1fr, 1fr, 1fr, 1fr),
  gutter: 0.5em,
  align(center)[
    #circle(radius: 1.5em, fill: purple)[
      #text(fill: white, size: 18pt)[💡]
    ]
    #v(0.3em)
    #text(size: 9pt, weight: "bold")[IDEATION]
    #text(size: 8pt, fill: white.darken(30%))[Human creates project]
  ],
  align(center)[
    #text(fill: accent)[→]
  ],
  align(center)[
    #circle(radius: 1.5em, fill: accent)[
      #text(fill: white, size: 18pt)[📋]
    ]
    #v(0.3em)
    #text(size: 9pt, weight: "bold")[PLANNING]
    #text(size: 8pt, fill: white.darken(30%))[PMs break into tasks]
  ],
  align(center)[
    #text(fill: accent)[→]
  ],
  align(center)[
    #circle(radius: 1.5em, fill: success)[
      #text(fill: white, size: 18pt)[🚀]
    ]
    #v(0.3em)
    #text(size: 9pt, weight: "bold")[EXECUTION]
    #text(size: 8pt, fill: white.darken(30%))[Agents build it]
  ],
)

#v(1.5em)

#card(title: "Lifecycle Phases")[
  #table(
    columns: (auto, 1fr, auto, auto),
    stroke: 0.5pt + rgb("#333"),
    fill: (_, row) => if row == 0 { rgb("#1a2a3a") } else { rgb("#0f0f1a") },
    inset: 0.7em,
    [*Phase*], [*Description*], [*Owner*], [*Duration*],
    [Ideation], [Human describes the goal/vision], [Human], [Minutes],
    [PM Election], [System selects 2 PMs for the project], [System], [Automatic],
    [Planning], [PMs create epics, tasks, sprints], [PMs], [Hours],
    [Assignment], [Tasks assigned to specialist agents], [PMs + System], [Automatic],
    [Execution], [Agents work on assigned tasks], [Agents], [Hours-Days],
    [Review], [PMs review work, request changes], [PMs], [Hours],
    [Delivery], [Human reviews final output], [Human], [Minutes],
  )
]

// ========== 2. HUMAN → SYSTEM ==========
= 2. Human → System Handoff

How a project moves from human idea to AI execution:

#v(1em)

#step-box(1, "Human Creates Project", [
  - Opens Mission Control dashboard
  - Clicks "New Project"
  - Provides: *Name*, *Description*, *Goals*, *Timeline*
  - Optionally tags complexity: Simple / Medium / Complex
])

#arrow-down

#step-box(2, "System Triggers PM Election", [
  - Evaluates project requirements
  - Considers agent availability and expertise
  - Runs PM Election algorithm (see Section 3)
  - Assigns 2 PMs with complementary skills
])

#arrow-down

#step-box(3, "PMs Receive Project Brief", [
  - Both PMs notified via Discord + Dashboard
  - PMs review project independently (anti-groupthink)
  - Each PM creates initial task breakdown
  - System compares approaches, merges best ideas
])

#arrow-down

#step-box(4, "Human Approves Plan (Optional)", [
  - Dashboard shows proposed task breakdown
  - Human can: Approve / Request Changes / Add Tasks
  - Once approved, execution begins automatically
])

// ========== 3. PM ELECTION ==========
= 3. PM Election Process

Every project gets *exactly 2 PMs* to ensure diverse perspectives:

#v(1em)

#card(title: "Election Algorithm")[
  #set text(size: 10pt)
  ```
  function electPMs(project):
    candidates = getAvailablePMs()
    
    // Score each candidate
    for pm in candidates:
      pm.score = (
        skillMatch(pm, project) * 0.4 +
        availabilityScore(pm) * 0.3 +
        recentPerformance(pm) * 0.2 +
        diversityBonus(pm) * 0.1
      )
    
    // Select top PM
    pm1 = candidates.maxBy(score)
    
    // Select complementary PM (different strengths)
    pm2 = candidates
      .filter(pm => pm != pm1)
      .maxBy(pm => complementarityScore(pm, pm1))
    
    return [pm1, pm2]
  ```
]

#v(1em)

#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  card(title: "PM Roster")[
    #table(
      columns: (auto, 1fr),
      stroke: none,
      inset: 0.5em,
      [*Friday*], [Technical Architecture, Backend],
      [*Wong*], [Documentation, Process, UX],
      [*Shuri*], [Analytics, Testing, Research],
    )
  ],
  card(title: "Selection Criteria")[
    #list(
      marker: text(fill: accent)[•],
      [Skill match with project domain],
      [Current workload / availability],
      [Recent performance metrics],
      [Complementary expertise],
    )
  ],
)

#v(1em)

#card(fill: rgb("#1a2a1a"), title: "Why 2 PMs?")[
  #text(size: 10pt)[
    *Anti-Groupthink Requirement*: Two PMs must independently review all major decisions. This prevents single points of failure and ensures diverse perspectives. If PMs disagree, the system triggers debate protocol.
  ]
]

// ========== 4. TASK CREATION ==========
= 4. Task Creation & Assignment

How tasks flow from creation to completion:

#v(1em)

== 4.1 Task Creation

#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  [
    #card(title: "Created By PMs")[
      - PMs break epics into tasks
      - Each task gets: Title, Description, Acceptance Criteria
      - Tasks are estimated (story points)
      - Tasks tagged with required skills
    ]
  ],
  [
    #card(title: "Task Metadata")[
      #table(
        columns: (auto, 1fr),
        stroke: none,
        inset: 0.4em,
        [*Status*], [Backlog → Sprint → In Progress → Done],
        [*Priority*], [P0 (Critical) → P3 (Nice to have)],
        [*Points*], [1, 2, 3, 5, 8, 13 (Fibonacci)],
        [*Labels*], [frontend, backend, research, etc.],
      )
    ]
  ]
)

#v(1em)

== 4.2 Task Lifecycle

#align(center)[
  #grid(
    columns: 5,
    gutter: 0.5em,
    rect(fill: rgb("#374151"), radius: 4pt, inset: 0.6em)[
      #text(size: 9pt, weight: "bold")[BACKLOG]
    ],
    text(fill: white.darken(30%))[→],
    rect(fill: rgb("#1e3a5f"), radius: 4pt, inset: 0.6em)[
      #text(size: 9pt, weight: "bold")[SPRINT]
    ],
    text(fill: white.darken(30%))[→],
    rect(fill: rgb("#7c3aed"), radius: 4pt, inset: 0.6em)[
      #text(size: 9pt, weight: "bold")[ASSIGNED]
    ],
  )
  #v(0.3em)
  #grid(
    columns: 5,
    gutter: 0.5em,
    [],
    [],
    [],
    text(fill: white.darken(30%))[↓],
    [],
  )
  #grid(
    columns: 5,
    gutter: 0.5em,
    rect(fill: success, radius: 4pt, inset: 0.6em)[
      #text(size: 9pt, weight: "bold", fill: white)[DONE]
    ],
    text(fill: white.darken(30%))[←],
    rect(fill: rgb("#0891b2"), radius: 4pt, inset: 0.6em)[
      #text(size: 9pt, weight: "bold")[REVIEW]
    ],
    text(fill: white.darken(30%))[←],
    rect(fill: warning, radius: 4pt, inset: 0.6em)[
      #text(size: 9pt, weight: "bold", fill: rgb("#1a1a1a"))[IN PROGRESS]
    ],
  )
]

// ========== 5. SPRINT PLANNING ==========
= 5. Sprint Planning Workflow

Sprints are 1-2 week cycles of focused work:

#v(1em)

== 5.1 Sprint Creation

#step-box(1, "PMs Create Sprint", [
  - Define sprint duration (7-14 days)
  - Set sprint goal (clear objective)
  - Calculate team capacity (available agent-hours)
])

#arrow-down

#step-box(2, "Backlog Grooming", [
  - PMs review and prioritize backlog
  - Tasks refined with acceptance criteria
  - Story points confirmed
])

#arrow-down

#step-box(3, "Sprint Planning Meeting", [
  - PMs select tasks from backlog
  - Total points ≤ team velocity (3-sprint average)
  - Tasks moved to sprint backlog
])

#v(1em)

== 5.2 Sprint Execution

#card[
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 1em,
    [
      *Daily Standups*
      #text(size: 10pt, fill: white.darken(20%))[
        - Cron job every 30 min
        - Agents report progress
        - Blockers flagged
      ]
    ],
    [
      *Burndown Tracking*
      #text(size: 10pt, fill: white.darken(20%))[
        - Real-time point tracking
        - Visual burndown chart
        - Alerts if behind pace
      ]
    ],
    [
      *Sprint Review*
      #text(size: 10pt, fill: white.darken(20%))[
        - End of sprint demo
        - PMs assess completion
        - Velocity calculated
      ]
    ],
  )
]

// ========== 6. AGENT ASSIGNMENT ==========
= 6. Agent Assignment Rules

When and how agents get assigned to tasks:

#v(1em)

== 6.1 Assignment Triggers

#card[
  #table(
    columns: (auto, 1fr, auto),
    stroke: 0.5pt + rgb("#333"),
    fill: (_, row) => if row == 0 { rgb("#1a2a3a") } else { rgb("#0f0f1a") },
    inset: 0.7em,
    [*Trigger*], [*Description*], [*Timing*],
    [Sprint Start], [All sprint tasks get assigned], [Automatic],
    [Manual Assignment], [PM assigns specific agent], [On demand],
    [Task Unblocked], [Dependency resolved], [Automatic],
    [Agent Available], [Finished previous task], [Automatic],
  )
]

#v(1em)

== 6.2 Assignment Algorithm

#card(title: "Agent Selection")[
  #set text(size: 10pt)
  ```
  function assignAgent(task):
    agents = getSpecialistAgents()
    
    for agent in agents:
      agent.score = (
        skillMatch(agent, task.labels) * 0.5 +
        currentWorkload(agent) * 0.3 +
        pastPerformance(agent, task.type) * 0.2
      )
    
    bestAgent = agents.maxBy(score)
    
    if bestAgent.score < THRESHOLD:
      escalateToHuman("No suitable agent found")
    
    return bestAgent
  ```
]

#v(1em)

== 6.3 Specialist Roster

#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  card[
    #table(
      columns: (auto, 1fr),
      stroke: none,
      inset: 0.4em,
      [*Friday-Dev*], [Coding, debugging, architecture],
      [*Shuri*], [Analytics, testing, research],
      [*Vision*], [SEO, analytics, content strategy],
      [*Loki*], [Writing, copywriting, storytelling],
    )
  ],
  card[
    #table(
      columns: (auto, 1fr),
      stroke: none,
      inset: 0.4em,
      [*Wanda*], [UI design, UX, visual design],
      [*Pepper*], [Email, marketing, automation],
      [*Quill*], [Social media, community],
      [*Fury*], [Research, interviews, competitive analysis],
    )
  ],
)

// ========== 7. ANTI-GROUPTHINK ==========
= 7. Anti-Groupthink Protocol

The system that prevents AI echo chambers:

#v(1em)

== 7.1 When It Triggers

#card(fill: rgb("#1a2a3a"))[
  The Anti-Groupthink Protocol activates for:
  #v(0.5em)
  #list(
    marker: text(fill: accent)[→],
    [*Architecture decisions* — Tech stack, database design],
    [*Priority disputes* — Which tasks are P0 vs P1],
    [*Scope changes* — Adding/removing features],
    [*Risk assessments* — Security, performance concerns],
    [*Any decision marked "requires consensus"*],
  )
]

#v(1em)

== 7.2 The Protocol

#step-box(1, "Proposal Created", [
  Any PM can create a proposal requiring consensus
])

#arrow-down

#step-box(2, "Isolated Opinion Phase", [
  - Each PM reviews *independently*
  - Cannot see other PM's input
  - Must provide: Vote + Reasoning + *2+ Concerns*
])

#arrow-down

#step-box(3, "Reveal & Compare", [
  - All opinions revealed simultaneously
  - Side-by-side comparison shown
  - Concerns matrix generated
])

#arrow-down

#step-box(4, "Consensus or Debate", [
  - If agree: Proposal approved
  - If disagree: Debate rounds (max 3)
  - Still stuck: Escalate to human
])

// ========== 8. ESCALATION ==========
= 8. Escalation & Human Review

When and how humans get pulled back in:

#v(1em)

== 8.1 Automatic Escalation Triggers

#card(fill: rgb("#2a1a1a"))[
  #grid(
    columns: (1fr, 1fr),
    gutter: 1em,
    [
      *Sycophancy Flags*
      #list(
        marker: text(fill: danger)[⚠],
        [Instant consensus (under 60s)],
        [Zero concerns raised],
        [>80% identical reasoning],
        [Unanimous on complex issue],
      )
    ],
    [
      *Process Failures*
      #list(
        marker: text(fill: danger)[⚠],
        [3 debate rounds, no consensus],
        [No suitable agent available],
        [Task blocked >48 hours],
        [Budget/scope creep detected],
      )
    ],
  )
]

#v(1em)

== 8.2 Escalation Flow

#card[
  #align(center)[
    #stack(
      dir: ltr,
      spacing: 1em,
      rect(fill: rgb("#1e3a5f"), radius: 6pt, inset: 0.8em)[
        #text(size: 10pt)[*Issue Detected*]
      ],
      text(fill: accent)[→],
      rect(fill: warning, radius: 6pt, inset: 0.8em)[
        #text(size: 10pt, fill: rgb("#1a1a1a"))[*Flagged*]
      ],
      text(fill: accent)[→],
      rect(fill: rgb("#7c3aed"), radius: 6pt, inset: 0.8em)[
        #text(size: 10pt)[*Discord Alert*]
      ],
      text(fill: accent)[→],
      rect(fill: success, radius: 6pt, inset: 0.8em)[
        #text(size: 10pt)[*Human Reviews*]
      ],
    )
  ]
]

#v(1em)

== 8.3 Human Review Options

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 1em,
  card[
    #text(fill: success, weight: "bold")[Override]
    #text(size: 10pt, fill: white.darken(20%))[
      Approve despite flag. Decision logged for audit.
    ]
  ],
  card[
    #text(fill: warning, weight: "bold")[Request Re-vote]
    #text(size: 10pt, fill: white.darken(20%))[
      PMs must reconsider with guidance.
    ]
  ],
  card[
    #text(fill: danger, weight: "bold")[Take Over]
    #text(size: 10pt, fill: white.darken(20%))[
      Human makes the decision directly.
    ]
  ],
)

// ========== 9. FEATURE REFERENCE ==========
= 9. Feature Reference Guide

Complete list of dashboard features and when to use them:

#v(1em)

== 9.1 Views

#card[
  #table(
    columns: (auto, 1fr, auto),
    stroke: 0.5pt + rgb("#333"),
    fill: (_, row) => if row == 0 { rgb("#1a2a3a") } else { rgb("#0f0f1a") },
    inset: 0.7em,
    [*View*], [*Use Case*], [*Shortcut*],
    [Kanban Board], [Drag-drop task management], [K],
    [List View], [Sortable table with filters], [L],
    [Sprint Planning], [Plan and manage sprints], [S],
    [Backlog], [Prioritize upcoming work], [B],
    [Proposals], [Consensus decisions], [P],
    [Burndown], [Track sprint progress], [D],
    [Velocity], [Historical performance], [V],
  )
]

#v(1em)

== 9.2 Actions

#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  card(title: "Quick Actions (Cmd+K)")[
    #list(
      marker: text(fill: accent)[•],
      [Create task],
      [Assign agent],
      [Move to sprint],
      [Create proposal],
      [Start sprint],
    )
  ],
  card(title: "Bulk Operations")[
    #list(
      marker: text(fill: accent)[•],
      [Multi-select tasks],
      [Bulk status change],
      [Bulk assignment],
      [Export to CSV],
    )
  ],
)

// ========== 10. COMPLETE FLOW ==========
= 10. Complete Flow Diagram

End-to-end journey of a feature request:

#v(1em)

#card(fill: rgb("#0a0a14"))[
  #set text(size: 9pt)
  #align(center)[
    #stack(
      dir: ttb,
      spacing: 0.8em,
      
      // Row 1: Human
      rect(fill: purple.lighten(70%), radius: 6pt, inset: 0.8em, stroke: 2pt + purple)[
        #text(fill: purple.darken(40%), weight: "bold")[👤 HUMAN: "Build feature X"]
      ],
      
      text(fill: accent)[↓ Project created],
      
      // Row 2: PM Election
      rect(fill: accent.lighten(70%), radius: 6pt, inset: 0.8em, stroke: 2pt + accent)[
        #text(fill: accent.darken(40%), weight: "bold")[🗳️ PM Election → Friday + Wong assigned]
      ],
      
      text(fill: accent)[↓ PMs plan independently],
      
      // Row 3: Planning
      grid(
        columns: 2,
        gutter: 1em,
        rect(fill: rgb("#1e3a5f"), radius: 6pt, inset: 0.6em)[
          #text(size: 8pt)[*Friday's Plan* \ 5 tasks, 21 pts]
        ],
        rect(fill: rgb("#1e3a5f"), radius: 6pt, inset: 0.6em)[
          #text(size: 8pt)[*Wong's Plan* \ 4 tasks, 18 pts]
        ],
      ),
      
      text(fill: accent)[↓ Plans merged, sprint created],
      
      // Row 4: Assignment
      rect(fill: warning.lighten(70%), radius: 6pt, inset: 0.8em, stroke: 2pt + warning)[
        #text(fill: warning.darken(40%), weight: "bold")[📋 Tasks assigned to specialists]
      ],
      
      text(fill: accent)[↓ Agents start work],
      
      // Row 5: Execution
      grid(
        columns: 4,
        gutter: 0.5em,
        rect(fill: rgb("#064e3b"), radius: 4pt, inset: 0.4em)[
          #text(size: 7pt)[Friday-Dev \ Task 1 ✓]
        ],
        rect(fill: rgb("#064e3b"), radius: 4pt, inset: 0.4em)[
          #text(size: 7pt)[Shuri \ Task 2 ✓]
        ],
        rect(fill: rgb("#7c2d12"), radius: 4pt, inset: 0.4em)[
          #text(size: 7pt)[Wanda \ Task 3...]
        ],
        rect(fill: rgb("#374151"), radius: 4pt, inset: 0.4em)[
          #text(size: 7pt)[Loki \ Queued]
        ],
      ),
      
      text(fill: accent)[↓ Progress tracked real-time],
      
      // Row 6: Review
      rect(fill: rgb("#7c3aed").lighten(70%), radius: 6pt, inset: 0.8em, stroke: 2pt + rgb("#7c3aed"))[
        #text(fill: rgb("#7c3aed").darken(40%), weight: "bold")[🔍 PMs review completed work]
      ],
      
      text(fill: accent)[↓ Human notified],
      
      // Row 7: Done
      rect(fill: success.lighten(70%), radius: 6pt, inset: 0.8em, stroke: 2pt + success)[
        #text(fill: success.darken(40%), weight: "bold")[✅ HUMAN: "Looks great, ship it!"]
      ],
    )
  ]
]

#v(2em)

#align(center)[
  #text(size: 14pt, fill: white.darken(30%))[
    *End of Workflow Guide*
    #v(0.5em)
    Questions? Ask in \#disclawd-mission-control
  ]
]
