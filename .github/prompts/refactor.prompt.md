---
description: "Refactor code across multiple files while maintaining all existing behavior"
agent: "agent"
---
# Refactor

Refactor the specified code following these guardrails:

1. **Scope**: Only change what's requested — don't improve adjacent code
2. **Behavior**: All existing functionality must be preserved
3. **Types**: Maintain or improve type safety — never weaken types
4. **Tests**: Run full suite before and after — same pass/fail counts
5. **Imports**: Update all consumers of changed exports

## Validation Checklist
- [ ] `npx tsc --noEmit` — no new errors
- [ ] `npx vitest run` — no regressions
- [ ] All import paths updated
- [ ] No dead code left behind
