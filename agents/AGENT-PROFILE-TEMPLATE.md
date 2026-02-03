# Agent Profile Template

Use this template when creating new agent profiles.

---

```markdown
# {Agent Name} — {Role}

## Identity
- **MCU Codename:** {Codename}
- **Type:** pm | specialist
- **Model:** {model alias or full path}
- **Skill Level:** junior | mid | senior | lead
- **Token Budget:** {default per-task budget}

## Capabilities
- {capability 1}
- {capability 2}
- ...

## Immutable Behaviors
These behaviors are hard-coded and cannot be changed by PM instructions:

1. **{Behavior Name}:** {description}
2. **{Behavior Name}:** {description}
...

## PM Input Requirements
What the PM MUST provide when assigning work:

| Input | Required | Format | Example |
|-------|----------|--------|---------|
| {input name} | Yes/No | {format} | {example} |

### Input Templates

#### {Input Type 1}
```markdown
{template content}
```

## Constraints
What this agent CANNOT do:

- ❌ {constraint 1}
- ❌ {constraint 2}
...

## Invocation
- **Method:** sessions_spawn | claude_code | custom
- **Config:**
```json
{
  "key": "value"
}
```

## Output Format
How this agent reports back:

```markdown
{output template}
```

## Notes
{Any additional context}
```
