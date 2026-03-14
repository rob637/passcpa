---
description: "Use when creating or modifying React components, pages, or layouts. Covers component patterns, styling, and state management for VoraPrep."
applyTo: "src/components/**"
---
# React Component Standards

- Functional components only — no class components
- PascalCase filenames matching export: `StudyJourney.tsx` → `export const StudyJourney`
- Props as TypeScript interfaces, extend native HTML attributes where applicable
- Use `React.lazy()` + `Suspense` for all page-level components
- Use `forwardRef` for reusable inputs/buttons

## Styling
- Tailwind CSS utilities only — no inline styles, no CSS modules
- `clsx` for conditional classes: `clsx('btn', active && 'btn-primary')`
- Dark mode via `dark:` prefix
- Icons: import individual icons from `lucide-react`, never the whole library

## State
- React Context + Providers — no Redux/Zustand
- Provider hierarchy: ThemeProvider > CourseProvider > NavigationProvider > TourProvider > ToastProvider
- Per-course hooks: `useCPAProgress`, `useEAProgress`, etc.

## Logging
- Use `logger` from `src/utils/logger.ts` — never `console.log`
