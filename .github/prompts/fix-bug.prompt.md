---
description: "Debug and fix a bug with full root-cause analysis"
agent: "agent"
---
# Bug Fix

Diagnose and fix the reported bug:

1. **Reproduce**: Understand the symptoms and find the affected code
2. **Root cause**: Trace the actual cause — don't just patch symptoms
3. **Fix**: Make the minimal change needed
4. **Verify**: Run `npx tsc --noEmit` and `npx vitest run` to confirm no regressions
5. **Explain**: Summarize what was wrong and why the fix works

## Rules
- Don't add unnecessary error handling or defensive code
- Don't refactor surrounding code — fix only the bug
- Check if the bug exists in other similar code paths (per-course pattern)
