---
description: "Use when writing or modifying unit tests (Vitest) or end-to-end tests (Playwright)."
applyTo: ["src/test/**", "e2e/**"]
---
# Testing Standards

## Unit Tests (Vitest)
- Location: `src/test/` mirroring source structure
- Naming: `*.test.ts`, `*.test.tsx`, `*.quality.test.ts`
- Run: `npm test` (watch), `npm run test:run` (CI)

### Patterns
```tsx
// Mock Firebase before imports
vi.mock('../../config/firebase', () => ({ db: {}, auth: {} }));

// Wrap components needing Router
render(<MemoryRouter><Component /></MemoryRouter>);

// Use data-testid for queries
screen.getByTestId('submit-button');
```

### Coverage
- Thresholds: 40% lines/statements, 35% functions, 30% branches

## E2E Tests (Playwright)
- Location: `e2e/`
- Run: `npm run test:e2e`, `npm run test:e2e:headed`
- Covers: auth flows, practice sessions, accessibility, performance
