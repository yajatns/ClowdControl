# TASK: Cost Calculator (3603fa97)

## What
Build a cost calculator utility that converts token usage into dollar amounts based on model rates.

## Where
`dashboard/src/lib/cost-calculator.ts` (new file) + integrate into existing components

## Requirements

1. **Model Rate Table** — Create a lookup of cost-per-token for common models:
   - claude-opus-4-5: $15/1M input, $75/1M output
   - claude-sonnet-4: $3/1M input, $15/1M output  
   - claude-sonnet-3.5: $3/1M input, $15/1M output
   - claude-haiku-3.5: $0.80/1M input, $4/1M output
   - Cache read: 10% of input rate, Cache write: 125% of input rate

2. **Calculator Functions:**
   - `calculateCost(inputTokens, outputTokens, model, cacheRead?, cacheWrite?)` → returns `{ inputCost, outputCost, cacheCost, totalCost }`
   - `formatCost(dollars)` → returns formatted string like "$0.42" or "$1.23"
   - `calculateTaskCost(task)` → takes a task object with token_usage and returns cost breakdown

3. **Integration:**
   - Add cost display to `TokenUsageDisplay` component in TaskSidePanel (it already shows tokens, add dollar amount)
   - Add a cost summary to the project overview/sprint view if accessible

4. **Tests:** Add basic unit tests for the calculator functions

## Acceptance Criteria
- Cost calculator correctly computes costs for all listed models
- Dollar amounts show in task side panel next to token counts  
- Build passes: `npm run build`
- Commit changes with descriptive message

## Notes
- Check existing code in `dashboard/src/lib/supabase.ts` for Task type
- Check `dashboard/src/components/TaskSidePanel.tsx` for existing TokenUsageDisplay
- Keep it simple and functional
