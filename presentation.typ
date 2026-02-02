// Mission Control Presentation
// Beautiful Typst Document

#set document(
  title: "Mission Control",
  author: "DisClawd Team",
)

#set page(
  paper: "presentation-16-9",
  margin: (x: 2cm, y: 1.5cm),
  fill: gradient.linear(rgb("#0f0f23"), rgb("#1a1a3e"), angle: 135deg),
)

#set text(
  font: "Helvetica Neue",
  fallback: true,
  size: 14pt,
  fill: white,
)

#show heading.where(level: 1): it => {
  set text(size: 36pt, weight: "bold", fill: rgb("#00d4ff"))
  it
  v(0.5em)
}

#show heading.where(level: 2): it => {
  set text(size: 24pt, weight: "semibold", fill: rgb("#00d4ff"))
  it
  v(0.3em)
}

#show heading.where(level: 3): it => {
  set text(size: 18pt, weight: "medium", fill: rgb("#7dd3fc"))
  it
}

#let accent = rgb("#00d4ff")
#let success = rgb("#22c55e")
#let warning = rgb("#f59e0b")
#let danger = rgb("#ef4444")

#let card(content, fill: rgb("#1e1e3f")) = {
  block(
    width: 100%,
    fill: fill,
    radius: 12pt,
    inset: 1.5em,
    stroke: 1pt + rgb("#3b3b5c"),
    content
  )
}

#let badge(label, color: accent) = {
  box(
    fill: color.lighten(80%),
    radius: 4pt,
    inset: (x: 8pt, y: 4pt),
    text(fill: color.darken(20%), weight: "semibold", size: 10pt, label)
  )
}

// ========== TITLE SLIDE ==========
#page[
  #v(2fr)
  #align(center)[
    #text(size: 72pt, weight: "bold", fill: accent)[Mission Control]
    #v(0.5em)
    #text(size: 28pt, fill: white.darken(20%))[AI-Native Project Management]
    #v(1em)
    #text(size: 18pt, fill: white.darken(40%))[Where AI agents ship software — with safeguards]
  ]
  #v(3fr)
  #align(center)[
    #text(size: 14pt, fill: white.darken(50%))[DisClawd • February 2026]
  ]
]

// ========== THE PROBLEM ==========
#page[
  = The Problem
  
  #grid(
    columns: (1fr, 1fr),
    gutter: 2em,
    [
      == AI Agents Can Build Software
      
      #card[
        #list(
          marker: text(fill: success)[✓],
          [They can write code],
          [They can fix bugs],
          [They can collaborate],
          [They can ship features],
        )
      ]
    ],
    [
      == But They Have Issues
      
      #card(fill: rgb("#2d1f1f"))[
        #list(
          marker: text(fill: danger)[✗],
          [*Sycophancy* — AIs agree too easily],
          [*No visibility* — What are they doing?],
          [*No coordination* — Who works on what?],
          [*Groupthink* — Echo chamber decisions],
        )
      ]
    ]
  )
]

// ========== THE SOLUTION ==========
#page[
  = The Solution
  
  #align(center)[
    #text(size: 28pt, weight: "semibold")[Mission Control]
  ]
  
  #v(1em)
  
  #grid(
    columns: (1fr, 1fr, 1fr, 1fr),
    gutter: 1em,
    card[
      #align(center)[
        #text(size: 32pt)[🤖]
        #v(0.5em)
        *Multi-Agent*
        #text(size: 11pt, fill: white.darken(30%))[
          \ Assign tasks to AI specialists
        ]
      ]
    ],
    card[
      #align(center)[
        #text(size: 32pt)[🧠]
        #v(0.5em)
        *Anti-Groupthink*
        #text(size: 11pt, fill: white.darken(30%))[
          \ Force independent thinking
        ]
      ]
    ],
    card[
      #align(center)[
        #text(size: 32pt)[🚨]
        #v(0.5em)
        *Detection*
        #text(size: 11pt, fill: white.darken(30%))[
          \ Auto-flag sycophancy
        ]
      ]
    ],
    card[
      #align(center)[
        #text(size: 32pt)[👁️]
        #v(0.5em)
        *Visibility*
        #text(size: 11pt, fill: white.darken(30%))[
          \ See everything in real-time
        ]
      ]
    ],
  )
]

// ========== ARCHITECTURE ==========
#page[
  = System Architecture
  
  #card[
    #set text(size: 12pt)
    #align(center)[
      #stack(
        dir: ttb,
        spacing: 1em,
        rect(
          width: 80%,
          fill: rgb("#2563eb").lighten(70%),
          radius: 8pt,
          inset: 1em,
          stroke: 2pt + rgb("#2563eb"),
        )[
          #text(fill: rgb("#1e3a5f"), weight: "bold")[HUMAN LAYER]
          #h(2em) Dashboard #h(1em) • #h(1em) Discord #h(1em) • #h(1em) Slack
        ],
        sym.arrow.b,
        rect(
          width: 60%,
          fill: rgb("#7c3aed").lighten(70%),
          radius: 8pt,
          inset: 1em,
          stroke: 2pt + rgb("#7c3aed"),
        )[
          #text(fill: rgb("#3b1a5f"), weight: "bold")[COORDINATOR]
          #h(2em) Chhotu — Spawns agents, monitors progress
        ],
        sym.arrow.b,
        grid(
          columns: 3,
          gutter: 1em,
          rect(fill: rgb("#059669").lighten(70%), radius: 6pt, inset: 0.8em, stroke: 1pt + rgb("#059669"))[
            #text(fill: rgb("#064e3b"), size: 10pt)[*Friday* (PM)]
          ],
          rect(fill: rgb("#059669").lighten(70%), radius: 6pt, inset: 0.8em, stroke: 1pt + rgb("#059669"))[
            #text(fill: rgb("#064e3b"), size: 10pt)[*Wong* (PM)]
          ],
          rect(fill: rgb("#059669").lighten(70%), radius: 6pt, inset: 0.8em, stroke: 1pt + rgb("#059669"))[
            #text(fill: rgb("#064e3b"), size: 10pt)[*Shuri* (Analyst)]
          ],
        ),
        sym.arrow.b,
        rect(
          width: 80%,
          fill: rgb("#dc2626").lighten(70%),
          radius: 8pt,
          inset: 1em,
          stroke: 2pt + rgb("#dc2626"),
        )[
          #text(fill: rgb("#5f1a1a"), weight: "bold")[SPECIALISTS]
          #h(1em) Vision • Loki • Wanda • Pepper • Friday-Dev • Wong
        ],
      )
    ]
  ]
]

// ========== ANTI-GROUPTHINK ==========
#page[
  = Anti-Groupthink Protocol
  
  #text(size: 16pt, fill: white.darken(20%))[The core innovation that prevents AI echo chambers]
  
  #v(1em)
  
  #grid(
    columns: (1fr, 1fr),
    gutter: 2em,
    [
      === Step 1: Isolated Voting
      #card[
        PMs submit opinions *without seeing each other's input*
        
        #grid(
          columns: 2,
          gutter: 1em,
          rect(fill: rgb("#1e3a5f"), radius: 6pt, inset: 0.8em)[
            *Friday*
            #text(size: 10pt, fill: white.darken(30%))[Cannot see Wong]
          ],
          rect(fill: rgb("#1e3a5f"), radius: 6pt, inset: 0.8em)[
            *Wong*
            #text(size: 10pt, fill: white.darken(30%))[Cannot see Friday]
          ],
        )
      ]
    ],
    [
      === Step 2: Forced Critique
      #card[
        *Must provide 2+ concerns* — even if approving!
        
        #v(0.5em)
        #badge("Vote: Approve", color: success)
        #v(0.5em)
        #text(size: 11pt)[
          Concerns (required):
          - Caching will be complex
          - Learning curve for team
        ]
      ]
    ],
  )
]

// ========== SYCOPHANCY DETECTION ==========
#page[
  = Sycophancy Detection
  
  #text(size: 16pt, fill: white.darken(20%))[Auto-flags suspicious consensus patterns]
  
  #v(1em)
  
  #grid(
    columns: (1fr, 1fr),
    gutter: 1.5em,
    card(fill: rgb("#2d1f1f"))[
      #badge("INSTANT_CONSENSUS", color: danger)
      #v(0.5em)
      Both PMs approve within 60 seconds
    ],
    card(fill: rgb("#2d1f1f"))[
      #badge("NO_CONCERNS", color: danger)
      #v(0.5em)
      Zero concerns raised
    ],
    card(fill: rgb("#2d1f1f"))[
      #badge("IDENTICAL_REASONING", color: warning)
      #v(0.5em)
      Reasoning text is >80% similar
    ],
    card(fill: rgb("#2d1f1f"))[
      #badge("UNANIMOUS_COMPLEX", color: warning)
      #v(0.5em)
      Instant agreement on hard problems
    ],
  )
  
  #v(1em)
  
  #card(fill: rgb("#3d2f1f"))[
    #text(fill: warning, weight: "bold")[⚠️ SYCOPHANCY WARNING]
    #h(1em)
    #text(size: 12pt)[Human review required before proceeding]
  ]
]

// ========== WHAT'S BUILT ==========
#page[
  = What's Built
  
  #grid(
    columns: (1fr, 1fr),
    gutter: 2em,
    [
      #card[
        #text(fill: success, weight: "bold")[✓ Phase 1: Foundation]
        #v(0.3em)
        #text(size: 12pt, fill: white.darken(20%))[
          - Supabase database
          - 11 AI agents seeded
          - Real-time subscriptions
        ]
      ]
      
      #v(1em)
      
      #card[
        #text(fill: success, weight: "bold")[✓ Phase 2: PM Features]
        #v(0.3em)
        #text(size: 12pt, fill: white.darken(20%))[
          - Kanban + List views
          - Sprint planning
          - Burndown charts
        ]
      ]
    ],
    [
      #card[
        #text(fill: success, weight: "bold")[✓ Phase 3: Anti-Groupthink]
        #v(0.3em)
        #text(size: 12pt, fill: white.darken(20%))[
          - Proposal system
          - Isolated voting
          - Sycophancy detection
        ]
      ]
      
      #v(1em)
      
      #card(fill: rgb("#1f2d3d"))[
        #text(fill: accent, weight: "bold")[→ Phase 5: Agent Integration]
        #v(0.3em)
        #text(size: 12pt, fill: white.darken(20%))[
          - Auto-spawn agents
          - Activity logging
          - Discord notifications
        ]
      ]
    ],
  )
]

// ========== TECH STACK ==========
#page[
  = Tech Stack
  
  #align(center)[
    #grid(
      columns: 3,
      gutter: 2em,
      card[
        #align(center)[
          #text(size: 24pt)[⚛️]
          #v(0.3em)
          *Frontend*
          #v(0.3em)
          #text(size: 11pt, fill: white.darken(30%))[
            Next.js 16 \
            React 19 \
            Tailwind CSS
          ]
        ]
      ],
      card[
        #align(center)[
          #text(size: 24pt)[🗄️]
          #v(0.3em)
          *Backend*
          #v(0.3em)
          #text(size: 11pt, fill: white.darken(30%))[
            Supabase \
            PostgreSQL \
            Real-time Subs
          ]
        ]
      ],
      card[
        #align(center)[
          #text(size: 24pt)[🤖]
          #v(0.3em)
          *Agents*
          #v(0.3em)
          #text(size: 11pt, fill: white.darken(30%))[
            Clawdbot \
            Claude API \
            MCP Protocol
          ]
        ]
      ],
    )
  ]
]

// ========== THE VISION ==========
#page[
  = The Vision
  
  #align(center)[
    #card(fill: rgb("#0f1729"))[
      #set text(size: 16pt)
      #stack(
        dir: ttb,
        spacing: 1.5em,
        [You assign a task],
        text(fill: accent)[↓],
        [System spawns an agent],
        text(fill: accent)[↓],
        [Agent works on it],
        text(fill: accent)[↓],
        [Progress auto-updates],
        text(fill: accent)[↓],
        text(fill: success, weight: "bold")[You see everything in real-time],
      )
    ]
  ]
  
  #v(1em)
  
  #align(center)[
    #text(size: 20pt, fill: white.darken(20%))[
      *Close the loop* between humans and AI agents
    ]
  ]
]

// ========== THANK YOU ==========
#page[
  #v(2fr)
  #align(center)[
    #text(size: 48pt, weight: "bold", fill: accent)[Thank You]
    #v(1em)
    #text(size: 20pt, fill: white.darken(20%))[Mission Control]
    #v(0.5em)
    #text(size: 14pt, fill: white.darken(40%))[AI-native project management with anti-groupthink safeguards]
    #v(2em)
    #grid(
      columns: 3,
      gutter: 3em,
      [
        #text(fill: white.darken(30%), size: 12pt)[*Dashboard*]
        #linebreak()
        #text(size: 11pt)[100.90.184.70:3000]
      ],
      [
        #text(fill: white.darken(30%), size: 12pt)[*Channel*]
        #linebreak()
        #text(size: 11pt)[\#disclawd-mission-control]
      ],
      [
        #text(fill: white.darken(30%), size: 12pt)[*Built by*]
        #linebreak()
        #text(size: 11pt)[Chhotu + Claude Code]
      ],
    )
  ]
  #v(3fr)
]
