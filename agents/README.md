# Agent Profiles

This directory contains detailed profiles for all Mission Control agents. Each profile defines:

1. **Identity** — Model, skill level, token budget
2. **Capabilities** — What the agent can do
3. **Immutable Behaviors** — Hard-coded behaviors that can't be overridden
4. **PM Input Requirements** — What the PM must provide when assigning work
5. **Constraints** — What the agent cannot do
6. **Invocation** — How to spawn the agent
7. **Output Format** — How the agent reports back

## Agent Roster

### Project Managers
| Agent | Codename | Model | Role |
|-------|----------|-------|------|
| [jarvis-pm.md](jarvis-pm.md) | Jarvis | sonnet4/opus | Project Manager (Chhotu) |

### Development
| Agent | Codename | Model | Skill | Role |
|-------|----------|-------|-------|------|
| [friday-dev.md](friday-dev.md) | Friday | sonnet4 | Senior | Developer |

### Quality Assurance
| Agent | Codename | Model | Skill | Role |
|-------|----------|-------|-------|------|
| [ant-man.md](ant-man.md) | Ant-Man | haiku35 | Mid | UI QA Engineer |
| [hawkeye.md](hawkeye.md) | Hawkeye | haiku35 | Mid | API Tester |
| [shuri.md](shuri.md) | Shuri | sonnet4 | Senior | Product Analyst / QA Lead |

### Research & Analysis
| Agent | Codename | Model | Skill | Role |
|-------|----------|-------|-------|------|
| [fury.md](fury.md) | Fury | sonnet4 | Senior | Customer Research |
| [vision.md](vision.md) | Vision | opus | Lead | SEO & Analytics |

### Content & Marketing
| Agent | Codename | Model | Skill | Role |
|-------|----------|-------|-------|------|
| [loki.md](loki.md) | Loki | haiku35 | Junior | Content Writer |
| [quill.md](quill.md) | Quill | haiku35 | Mid | Social Media |
| [pepper.md](pepper.md) | Pepper | haiku35 | Mid | Email Marketing |

### Design & Documentation
| Agent | Codename | Model | Skill | Role |
|-------|----------|-------|-------|------|
| [wanda.md](wanda.md) | Wanda | sonnet4 | Mid | UI/UX Designer |
| [wong.md](wong.md) | Wong | sonnet4 | Mid | Documentation |

## How to Use

### For PMs (Jarvis/Chhotu)
1. Before assigning work, **read the agent's profile**
2. Check the **PM Input Requirements** table
3. Prepare all **required inputs** using the templates
4. Create the task in Mission Control
5. Spawn the agent with proper context
6. Monitor and verify output

### For Humans
1. Review profiles to understand agent capabilities
2. Edit profiles via Mission Control UI (Agents → Edit Profile)
3. Update behaviors/constraints as needed
4. Profiles sync to database on save

## Editing Profiles

Profiles can be edited:
1. **Directly** — Edit markdown files in this directory
2. **Via UI** — Mission Control → Agents → Click agent → Edit Profile

Changes to profiles affect how PMs assign work to agents.

## Creating New Agents

1. Copy `AGENT-PROFILE-TEMPLATE.md`
2. Fill in all sections
3. Add to agent registry in Supabase
4. Update this README

## File Structure

```
agents/
├── README.md                    # This file
├── AGENT-PROFILE-TEMPLATE.md    # Template for new agents
├── jarvis-pm.md                 # PM profile
├── friday-dev.md                # Developer
├── ant-man.md                   # UI QA
├── hawkeye.md                   # API Tester
├── shuri.md                     # Product Analyst
├── fury.md                      # Research
├── vision.md                    # SEO Lead
├── loki.md                      # Content Writer
├── quill.md                     # Social Media
├── wanda.md                     # Designer
├── wong.md                      # Documentation
└── pepper.md                    # Email Marketing
```
