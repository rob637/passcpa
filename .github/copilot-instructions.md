# Copilot Instructions — VoraPrep

> AI-powered professional exam prep (CPA, EA, CMA, CIA, CISA, CFP).
> React + TypeScript SPA with Firebase backend, deployed as PWA + native mobile (Capacitor).

---

## Project Identity

- **Product name:** VoraPrep (package name: `voraprep`)
- **Domain:** Professional certification exam preparation
- **Supported exams:** CPA, EA (Enrolled Agent), CMA, CIA, CISA, CFP
- **Target users:** Working professionals studying for certification exams
- **Tagline:** "AI-powered exam prep that gets you to 75+"

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript (strict mode, JSX) |
| **Build** | Vite (ESM, `@vitejs/plugin-react`) |
| **Styling** | Tailwind CSS + `clsx` for conditional classes |
| **State** | React Context + Providers (AuthProvider, CourseProvider, StudyProvider, ThemeProvider) |
| **Routing** | React Router v6 (lazy-loaded routes, route guards) |
| **Backend** | Firebase (Auth, Firestore, Storage, Functions Gen 2, Analytics) |
| **Payments** | Stripe (Checkout Sessions, Customer Portal, Webhooks) |
| **Email** | Resend (transactional emails from Cloud Functions) |
| **AI** | Google Gemini (AI tutor feature) |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Dates** | date-fns |
| **Markdown** | react-markdown + DOMPurify |
| **PWA** | vite-plugin-pwa (prompt-based updates) |
| **Mobile** | Capacitor 8 (Android + iOS) |
| **Testing** | Vitest + React Testing Library (unit), Playwright (e2e) |
| **Linting** | ESLint (flat config) + Prettier |

---

## Directory Structure

```
src/
├── components/          # React components
│   ├── common/          #   Reusable: Button, Card, Modal, Toast, Badge, etc.
│   ├── pages/           #   Route-level views (lazy-loaded)
│   ├── layouts/         #   MainLayout, AuthLayout
│   ├── navigation/      #   NavigationProvider, Breadcrumbs, BackButton
│   ├── analytics/       #   Analytics components
│   └── exam/            #   Exam simulator components
├── config/              # App configuration
│   ├── firebase.js      #   Firebase init (multi-env)
│   ├── featureFlags.ts  #   Feature flags
│   ├── examConfig.ts    #   Exam configuration
│   └── blueprintConfig.ts
├── courses/             # Per-course config (cpa/, ea/, cma/, cia/, cisa/, cfp/)
│   └── index.ts         #   Central course registry
├── data/                # Static content (questions, lessons, flashcards, etc.)
│   └── {course}/        #   Per-course data directories
├── hooks/               # Custom hooks (useAuth, useCourse, useStudy, etc.)
├── providers/           # Context providers (Auth, Course, Study, Theme)
├── services/            # Business logic + Firebase interactions
│   ├── {course}AdaptiveEngine.ts
│   ├── {course}ProgressService.ts
│   ├── {course}ScorePredictor.ts
│   └── analytics.ts, aiService.ts, notifications.ts, stripe.ts
├── types/               # TypeScript type definitions
│   ├── index.ts         #   Core types: Question, Lesson, TBS, UserProfile
│   └── course.ts        #   CourseId, Course, ExamSectionConfig
├── utils/               # Pure utilities (logger, confetti, courseDetection)
├── styles/              # CSS (globals.css design system, prometric.css)
└── test/                # Test files mirroring src/ structure

content_factory/         # Video production tooling (NOT part of the web app)
├── cisa_videos/         #   CISA video scripts, automation, batch runner
functions/               # Firebase Cloud Functions (CommonJS, Gen 2)
e2e/                     # Playwright end-to-end tests
scripts/                 # Build/migration scripts
docs/                    # Project documentation
```

---

## Code Conventions

### TypeScript / JavaScript

- **TypeScript preferred** for all new code (`.tsx`/`.ts`). Legacy `.js`/`.jsx` still exists.
- `strict: true` in tsconfig. `allowJs: true` for gradual migration.
- `target: ES2020`, `module: ESNext`, `jsx: react-jsx`.
- Use `import type` for type-only imports.
- Prefix unused parameters with `_` (ESLint allows it).
- Use `const` by default (`prefer-const`), never `var`.
- Use `===` for equality (`eqeqeq`).
- Use `logger` from `src/utils/logger.ts` instead of `console.log` (silent in production).

### React Components

- **Functional components only** — no class components.
- **PascalCase** file and component names: `StudyJourney.tsx` → `export const StudyJourney`.
- **camelCase** for hooks and utilities: `useAuth.ts`, `courseDetection.ts`.
- Props defined as TypeScript interfaces. Extend native HTML attributes where applicable:
  ```tsx
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    loading?: boolean;
    leftIcon?: LucideIcon;
  }
  ```
- Use `forwardRef` for reusable inputs/buttons.
- Use `React.lazy()` + `Suspense` for all page-level components.
- Code split aggressively — every route is lazy-loaded.

### Styling

- **Tailwind CSS** for all styling. Use utility classes directly.
- **`clsx`** for conditional class composition:
  ```tsx
  className={clsx('btn', variant === 'primary' && 'btn-primary', disabled && 'opacity-50')}
  ```
- Design system classes defined in `src/styles/globals.css` (`btn`, `card`, `card-elevated`, etc.).
- Dark mode via `darkMode: 'class'` — use `dark:` prefix for dark mode styles.
- Google-inspired color palette: `primary` (blue), `success` (green), `warning` (amber), `error` (red).
- Icons from `lucide-react` — import individual icons, not the whole library.

### State Management

- **React Context + Providers** — no Redux, no Zustand stores in use.
- Provider hierarchy: `ThemeProvider` > `CourseProvider` > `NavigationProvider` > `TourProvider` > `ToastProvider`.
- Hooks re-export pattern: `src/hooks/useAuth.ts` re-exports from `src/providers/AuthProvider.tsx`.
- Per-course progress hooks: `useCPAProgress`, `useEAProgress`, `useCISAProgress`, etc.
- Firebase Firestore for persistent state (user profiles, study logs, question history).

### File Organization

- Group by feature/domain, not by file type.
- Per-course pattern: `src/courses/{course}/config.ts`, `src/data/{course}/`, `src/services/{course}*.ts`.
- Common/shared components in `src/components/common/`.
- Page components in `src/components/pages/`.
- Service layer in `src/services/` handles all Firebase/API interactions.

---

## Multi-Course Architecture

The app supports 6 professional exams via a course registry pattern:

```typescript
type CourseId = 'cpa' | 'cma' | 'ea' | 'cia' | 'cfp' | 'cisa';
```

### Course Registry (`src/courses/index.ts`)
- Single source of truth for all course metadata.
- Each course has: sections, blueprint areas, weighting, pricing, features, exam format.
- Feature flags control which courses are enabled: `ENABLE_EA_COURSE`, `ENABLE_CMA_COURSE`, etc.

### Per-Course Pattern
When adding course-specific functionality, follow the existing pattern:
1. **Config**: `src/courses/{course}/config.ts` — course metadata, sections, blueprint
2. **Data**: `src/data/{course}/` — questions, lessons, flashcards
3. **Services**: `src/services/{course}AdaptiveEngine.ts`, `{course}ProgressService.ts`, `{course}ScorePredictor.ts`
4. **Hooks**: `src/hooks/use{COURSE}Progress.ts`

### Key Exam Structures
| Exam | Sections | Notes |
|------|----------|-------|
| CPA | FAR, AUD, REG + BAR/ISC/TCP (pick 1) | BEC retired Dec 2023. 2025→2026 blueprint transition. |
| EA | SEE1, SEE2, SEE3 | IRS Enrolled Agent, tax-focused |
| CMA | CMA1, CMA2 | Transitioning from essay to CBQ format (Sept 2026) |
| CIA | CIA1, CIA2, CIA3 | Internal audit |
| CISA | CISA1–CISA5 | IS audit, 5 domains with weights: D1=21%, D2=16%, D3=18%, D4=20%, D5=25% |
| CFP | 8 sections | Financial planning |

---

## Core Data Types

```typescript
// Key types from src/types/index.ts
interface Question {
  id: string;
  courseId?: CourseId;
  section: string;          // e.g., 'FAR', 'SEE1', 'CISA1'
  topic: string;
  subtopic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;    // 0-indexed
  explanation: string;
  blueprintArea?: string;
  blueprintRef?: string;
}

interface Lesson {
  id: string;
  courseId?: CourseId;
  section: string;
  title: string;
  content: LessonContent;
  topics: string[];
  difficulty: string;
  duration: number;         // minutes
  order: number;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  activeCourse: CourseId;
  examDates: Record<string, string>;
  studyPlans: Record<string, any>;
  onboardingCompleted: Record<string, boolean>;
  isAdmin?: boolean;
  subscription?: SubscriptionInfo;
}
```

---

## Firebase Architecture

### Client-Side (`src/config/firebase.js`)
- **Multi-environment**: Separate Firebase projects for dev/staging/production.
- **Emulator support**: `VITE_USE_EMULATORS=true` connects to local emulators.
- **Services used**: Auth, Firestore, Storage, Functions (Gen 2), Analytics.
- Auth persistence: IndexedDB → localStorage → session (fallback chain).

### Cloud Functions (`functions/index.js`)
- **Runtime**: Node.js, CommonJS (`require()`), Firebase Functions Gen 2.
- **Key functions**:
  - `createCheckoutSession` / `stripeWebhook` — Stripe payments
  - `sendDailyReminders` — FCM push notifications (timezone-aware)
  - `sendWeeklyReports` / `sendOnboardingReminders` — email via Resend
  - `sendWelcomeEmail` / `sendWaitlistConfirmation` — Firestore triggers
  - `createCustomerPortalSession` — Stripe customer portal
- **Secrets**: Set via `firebase functions:secrets:set` (RESEND_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET).

### Firestore Collections
- `users/{uid}` — User profiles (private to each user + admin access)
- `users/{uid}/dailyLogs/{date}` — Daily study activity
- `users/{uid}/questionHistory/{qId}` — Per-question performance
- `waitlist/{email}` — Waitlist signups
- Security rules enforce owner-only access; admins can read all.

---

## Environment Variables

All client-side env vars are prefixed with `VITE_`:

```bash
# Required — Firebase config
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Optional
VITE_USE_EMULATORS=true|false        # Firebase emulators
VITE_ENVIRONMENT=development|staging|production
VITE_GEMINI_API_KEY=                 # AI tutor
VITE_ENABLE_ANALYTICS=true|false
```

---

## Testing

### Unit Tests (Vitest)
- **Location**: `src/test/` mirroring source structure.
- **Naming**: `*.test.ts`, `*.test.tsx`, `*.quality.test.ts`.
- **Setup**: `src/test/setup.js` mocks Firebase, Auth, Firestore globally.
- **Run**: `npm test` (watch), `npm run test:run` (CI), `npm run test:coverage`.
- **Coverage thresholds**: 40% lines/statements, 35% functions, 30% branches.
- **Patterns**:
  ```tsx
  // Mock Firebase before imports
  vi.mock('../../config/firebase', () => ({ db: {}, auth: {} }));

  // Wrap components needing Router context
  render(<MemoryRouter><Component /></MemoryRouter>);

  // Use data-testid for queries
  screen.getByTestId('submit-button');
  ```

### E2E Tests (Playwright)
- **Location**: `e2e/` directory.
- **Config**: `playwright.config.js`.
- **Run**: `npm run test:e2e`, `npm run test:e2e:headed`, `npm run test:e2e:ui`.
- Tests cover: auth flows, practice sessions, accessibility, performance, visual regression.

---

## Git Workflow

- **`develop`** — Active development branch (daily work).
- **`main`** — Production/default branch.
- PR flow: feature branches → `develop` → `main` for releases.
- Deployment: `npm run deploy:dev|staging|prod` (Firebase Hosting).

---

## Video Production System

Located in `content_factory/cisa_videos/`. NOT part of the web application — this is a standalone Python toolchain for producing AI-generated video content using HeyGen.

### Key Commands
```bash
cd content_factory/cisa_videos
python create_batch_drafts.py --status         # Progress dashboard
python create_batch_drafts.py --resume         # Continue where you left off
python create_batch_drafts.py --limit 10       # Do 10 videos
python heygen_pyautogui.py --test              # Test single video
python heygen_pyautogui.py --calibrate         # Recalibrate screen coordinates
```

### Key Files
| File | Purpose |
|------|---------|
| `create_batch_drafts.py` | Batch runner with progress tracking/resume |
| `heygen_pyautogui.py` | PyAutoGUI video engine (calibrated pixel coordinates) |
| `output/video_matrix.json` | Master list of 84 videos with avatar/outfit/background assignments |
| `output/scripts_spoken/*.txt` | Individual SSML-cleaned script files |
| `cleanup_scripts.py` | Script quality fixer (acronyms, domain weights, names) |
| `prepare_batch.py` | CSV → video_matrix.json + script file converter |

### Video System Details
- 4 avatars: Freja (5 looks), Zosia (5 looks), Esmond (4 looks), Jinwoo (5 looks)
- 4 backgrounds: executive_dark, slate_gray, modern_teal, corporate_blue
- SSML break tags for TTS pauses: `<break time='0.8s'/>`
- Acronym pronunciation: periods for letter-by-letter (R.T.O.), phonetic for words (SEEM for SIEM)
- PyAutoGUI is the ONLY working automation method — Playwright fails against HeyGen's dynamic UI

---

## Important Patterns & Gotchas

### Do
- Use `logger.info/warn/error()` from `src/utils/logger.ts` (not `console.log`).
- Lazy-load all page components with `React.lazy()`.
- Follow per-course naming: `{course}AdaptiveEngine.ts`, `use{COURSE}Progress.ts`.
- Use Tailwind + `clsx` for styling, never inline styles.
- Use `date-fns` for date operations (not native Date formatting).
- Keep Cloud Functions in CommonJS (`require()`) — different from the client-side ESM.
- Use feature flags for course availability, not conditional component rendering.
- Sanitize user-generated HTML with DOMPurify before rendering.

### Don't
- Don't use class components.
- Don't add Zustand stores (project uses React Context).
- Don't import the entire `lucide-react` library — import individual icons.
- Don't use `console.log` in production code (ESLint warns on it).
- Don't reference BEC section — it was retired December 2023.
- Don't hardcode Firebase config — it comes from environment variables.
- Don't use the Playwright-based HeyGen scripts (`heygen_automation.py`, `heygen_automation_v2.py`) — only PyAutoGUI works.
- Don't commit `.env` files or API keys.

### Common Types to Know
- `CourseId` — `'cpa' | 'cma' | 'ea' | 'cia' | 'cfp' | 'cisa'`
- `Difficulty` — `'easy' | 'medium' | 'hard'` (legacy aliases: `'beginner'`, `'moderate'`, `'tough'`)
- `Question`, `Lesson`, `TBS`, `WCTask`, `CBQ`, `CaseStudy` — see `src/types/`
- `UserProfile` — Firestore user document shape
- `Course`, `ExamSectionConfig`, `BlueprintArea` — see `src/types/course.ts`

---

## Deployment

```bash
npm run deploy:dev      # Dev environment
npm run deploy:staging  # Staging environment
npm run deploy:prod     # Production environment
```

Each deploys to a separate Firebase project. Hosting, Firestore rules, Storage rules, and Functions are all deployed via Firebase CLI.

### Mobile (Capacitor)
```bash
npx cap sync android    # Sync web assets to Android
npx cap open android    # Open in Android Studio
```

---

## Documentation

Key docs in `docs/`:
- `ENVIRONMENT_SETUP.md` — Local dev environment setup
- `BLUEPRINT_GUIDE_2025_vs_2026.md` — CPA exam blueprint transition
- `VIDEO.md` — Video production guide and batch runner usage
- `ROADMAP.md` / `WORLD_CLASS_ROADMAP.md` — Product roadmap
- `PRICING.md` — Subscription pricing model
- `NOTIFICATION_SETUP.md` — Push notification configuration
- `API_KEY_SECURITY.md` — Security practices for API keys
