---
description: "Add a new feature or page to VoraPrep following all project conventions"
agent: "agent"
---
# New Feature

Implement the requested feature following VoraPrep conventions:

1. **Components**: Functional, PascalCase, Tailwind + clsx, lazy-loaded pages
2. **State**: React Context — no Redux/Zustand
3. **Services**: All Firebase/API calls go through `src/services/`
4. **Types**: Define interfaces in `src/types/`, use `import type`
5. **Logging**: Use `logger` from `src/utils/logger.ts`
6. **Icons**: Individual imports from `lucide-react`
7. **Routes**: Add to router with `React.lazy()` + `Suspense`

## Validation
- `npx tsc --noEmit` — zero new TS errors
- `npx vitest run` — no test regressions
- Check for pre-existing errors vs new errors
