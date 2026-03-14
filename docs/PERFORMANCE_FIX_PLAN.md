# VoraPrep Performance Improvement Plan

> Addressing Core Web Vitals failures: LCP 4.4s (target <2.5s), FCP 4s (target <1.8s)

## Executive Summary

PageSpeed Insights shows:
- **Performance Score**: 56 (Mobile)
- **LCP**: 4.4s (field) / 10.0s (lab) — **FAILING**
- **FCP**: 4s (field) / 9.4s (lab) — **FAILING**
- **CLS**: 0.12 (borderline, needs work)
- **Unused JavaScript**: 296 KiB potential savings
- **Unused CSS**: 18 KiB potential savings

---

## Root Cause Analysis

### 1. **Critical Path Blocking (Main Issue)**

The main entry point loads too much JavaScript before first paint:

```
main.tsx → AuthProvider → firebase.js (646KB vendor chunk)
         → All Firebase modules (Auth, Firestore, Storage, Functions, Analytics)
         → Capacitor plugin imports
         → PWA registration
```

**Impact**: User sees nothing until 646KB Firebase bundle + React bundle (165KB) + main app code loads.

### 2. **No Resource Preloading**

`index.html` has:
- ✅ Preconnect to Google Fonts
- ❌ No preload for critical JS chunks
- ❌ No preload for critical CSS
- ❌ No preload for hero fonts
- ❌ Render-blocking Google Fonts CSS import

### 3. **Font Loading Blocks Render**

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

This is a **render-blocking** stylesheet that must complete before FCP.

### 4. **Images Without Dimensions**

```tsx
// ExamLandingTemplate.tsx
<img src="/logo.svg" alt="VoraPrep" className="h-8 sm:h-10 dark:hidden" />
```

Images using CSS for sizing but no HTML width/height attributes cause layout shift (CLS).

### 5. **Large JavaScript Bundles**

| Bundle | Size | Issue |
|--------|------|-------|
| vendor-firebase | 646 KB | All Firebase in critical path |
| vendor-react | 165 KB | Unavoidable, but could be smaller |
| index (main) | 733 KB | TOO BIG - includes too much |
| Data chunks | 1-2 MB each | Fine (lazy loaded) |

### 6. **PWA Precache Too Large**

```
precache  174 entries (24861.00 KiB)
```

24MB precache causes slow initial service worker install and blocks resources.

---

## Fix Plan - Prioritized

### Phase 1: Critical Path Optimization (Highest Impact)

#### 1.1 Lazy Load Firebase Services

**Current**: Firebase loaded immediately in critical path
**Fix**: Load Firebase modules only when needed

```typescript
// src/config/firebase-lazy.ts
let _auth: Auth | null = null;
let _db: Firestore | null = null;

export const getAuth = async (): Promise<Auth> => {
  if (!_auth) {
    const { getAuth: initAuth } = await import('firebase/auth');
    const { app } = await import('./firebase-core');
    _auth = initAuth(app);
  }
  return _auth;
};

export const getDb = async (): Promise<Firestore> => {
  if (!_db) {
    const { getFirestore } = await import('firebase/firestore');
    const { app } = await import('./firebase-core');
    _db = getFirestore(app);
  }
  return _db;
};
```

**Note**: This is a significant refactor. AuthProvider would need to be async-aware.

#### 1.2 Optimize Font Loading

**Change `index.html`**:

```html
<!-- Before: Render-blocking -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- After: Non-blocking with fallback -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload only critical weights -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</noscript>

<!-- JetBrains Mono can load lazily - only used in code blocks -->
```

Or better: **Self-host Inter font** with `font-display: swap`:

```css
/* In globals.css */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
}
```

#### 1.3 Add Critical Resource Preloading

**Add to `index.html`**:

```html
<head>
  <!-- Preload critical chunks (update hashes after build) -->
  <link rel="modulepreload" href="/assets/vendor-react-[hash].js">
  <link rel="modulepreload" href="/assets/index-[hash].js">
  
  <!-- Preload critical CSS -->
  <link rel="preload" href="/assets/index-[hash].css" as="style">
  
  <!-- Preload logo for LCP -->
  <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml">
</head>
```

**Automation**: Create a Vite plugin to inject correct hashes:

```javascript
// vite-plugin-preload.js
function preloadPlugin() {
  return {
    name: 'preload-plugin',
    transformIndexHtml(html, ctx) {
      if (ctx.bundle) {
        const chunks = Object.values(ctx.bundle)
          .filter(c => c.type === 'chunk' && c.isEntry)
          .map(c => c.fileName);
        
        const preloads = chunks
          .map(f => `<link rel="modulepreload" href="/${f}">`)
          .join('\n');
        
        return html.replace('</head>', `${preloads}\n</head>`);
      }
      return html;
    }
  };
}
```

### Phase 2: Image Optimization

#### 2.1 Add Explicit Dimensions to Images

**Fix all `<img>` tags**:

```tsx
// Before
<img src="/logo.svg" alt="VoraPrep" className="h-8 sm:h-10" />

// After
<img 
  src="/logo.svg" 
  alt="VoraPrep" 
  width="120" 
  height="40" 
  className="h-8 sm:h-10" 
/>
```

**Files to fix**:
- [ExamLandingTemplate.tsx](src/components/pages/landing/ExamLandingTemplate.tsx#L102-L103) (logo images)
- [VoraPrep.tsx](src/components/pages/VoraPrep.tsx#L291-L296) (hero images)
- [MainLayout.tsx](src/components/layouts/MainLayout.tsx#L203) (logo)
- [AuthLayout.tsx](src/components/layouts/AuthLayout.tsx#L21-L26) (logo)
- [DemoPractice.tsx](src/components/pages/DemoPractice.tsx#L216) (logo)
- [Onboarding.tsx](src/components/pages/Onboarding.tsx#L154) (hero image)

#### 2.2 Create Optimized Image Component

```tsx
// src/components/common/OptimizedImage.tsx
interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className,
  ...props 
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      {...props}
    />
  );
};
```

### Phase 3: Bundle Optimization

#### 3.1 Split Main Entry Bundle

The 733KB main index bundle is too large. Investigate what's being pulled in:

```bash
ANALYZE=true npm run build
# Opens dist/stats.html with bundle treemap
```

**Likely culprits**:
- Capacitor plugins imported in AuthProvider (but only used natively)
- Analytics services loaded at startup
- Too many eager imports in App.tsx

#### 3.2 Lazy Load Capacitor

```typescript
// Only import Capacitor when actually on native
const getCapacitor = async () => {
  if (typeof window !== 'undefined' && window.Capacitor) {
    const { Capacitor } = await import('@capacitor/core');
    return Capacitor;
  }
  return null;
};
```

#### 3.3 Further Split Firebase

```javascript
// vite.config.js - manualChunks update
manualChunks(id) {
  if (id.includes('firebase')) {
    if (id.includes('firebase-auth')) return 'vendor-firebase-auth';
    if (id.includes('firebase-firestore')) return 'vendor-firebase-db';
    if (id.includes('firebase-storage')) return 'vendor-firebase-storage';
    if (id.includes('firebase-functions')) return 'vendor-firebase-functions';
    if (id.includes('firebase-app')) return 'vendor-firebase-core';
    return 'vendor-firebase-other';
  }
}
```

### Phase 4: CSS Optimization

#### 4.1 Critical CSS Extraction

Use `vite-plugin-critical` to inline above-the-fold CSS:

```javascript
// vite.config.js
import critical from 'vite-plugin-critical';

plugins: [
  critical({
    criticalUrl: '/',
    criticalBase: './dist',
    criticalPages: [
      { uri: '/', template: 'index' },
      { uri: '/cpa', template: 'cpa' },
    ],
  }),
]
```

#### 4.2 Remove Unused CSS

Use PurgeCSS or Tailwind's built-in purging (already configured).

Check `tailwind.config.js` content paths are correct:

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

### Phase 5: Server & Caching

#### 5.1 Optimize Firebase Hosting Headers

**firebase.json** - Add better caching:

```json
{
  "hosting": {
    "headers": [
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ]
  }
}
```

#### 5.2 Enable Brotli Compression

Firebase Hosting automatically serves Brotli when supported, but verify it's working.

### Phase 6: Landing Page Specific Fixes

#### 6.1 Inline Critical Hero Content

The hero section on `/cpa` is the LCP element. Optimize it:

```tsx
// ExamLandingTemplate.tsx - Make hero content immediate
const ExamLandingTemplate = ({ config }: Props) => {
  // Don't wait for useState animations
  const [isVisible] = useState(true); // Immediate visibility
  
  // Or remove the fade-in animation entirely for LCP
  return (
    <div className="min-h-screen">
      {/* Hero renders immediately, no transition */}
      <section className="pt-24 pb-12">
        <h1>...</h1>
      </section>
    </div>
  );
};
```

#### 6.2 Server-Side Rendering (Future)

Consider migrating to Next.js or Remix for SSR of landing pages.

---

## Implementation Priority

| Phase | Impact | Effort | Priority |
|-------|--------|--------|----------|
| 1.2 Font Loading | HIGH | LOW | 🔴 Do First |
| 1.3 Preloading | HIGH | MEDIUM | 🔴 Do First |
| 2.1 Image Dimensions | MEDIUM | LOW | 🟠 Do Second |
| 1.1 Lazy Firebase | HIGH | HIGH | 🟡 Do Third |
| 3.1-3.3 Bundle Split | MEDIUM | MEDIUM | 🟡 Do Third |
| 4.1 Critical CSS | MEDIUM | MEDIUM | 🟢 Do Fourth |
| 5.1+5.2 Caching | LOW | LOW | 🟢 Do Fourth |
| 6.1 Hero Animation | LOW | LOW | 🟢 Do Fourth |

---

## Quick Wins (Can Do Today)

### 1. Async Font Loading (10 min)

Update `index.html`:

```html
<!-- Replace current Google Fonts link with this -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" media="print" onload="this.media='all'">
```

### 2. Add Image Dimensions (30 min)

Add width/height to all `<img>` tags in the codebase.

### 3. Preload Hero Image/Logo (5 min)

```html
<link rel="preload" href="/logo.svg" as="image" type="image/svg+xml">
```

### 4. Remove Animation Delay (5 min)

In ExamLandingTemplate.tsx, remove the `isVisible` state and transition:

```tsx
// Change this
const [isVisible, setIsVisible] = useState(false);
useEffect(() => setIsVisible(true), []);

// To this (instant visibility)
const isVisible = true;
```

---

## Expected Results

After implementing Phase 1-2:
- **LCP**: 4.4s → ~2.5s (target: <2.5s)
- **FCP**: 4.0s → ~1.8s (target: <1.8s)
- **CLS**: 0.12 → <0.1
- **Performance Score**: 56 → 75+

After implementing Phases 3-6:
- **Performance Score**: 75+ → 90+
- **SEO**: Maintain 100
- **Core Web Vitals**: All passing ✅

---

## Monitoring

After each change, test with:

1. **PageSpeed Insights**: https://pagespeed.web.dev/
2. **WebPageTest**: https://www.webpagetest.org/
3. **Lighthouse in Chrome DevTools**
4. **Firebase Performance Monitoring** (already set up)

Track metrics over time in Analytics under `web_vital` events.

---

## Accessibility Issues (Also from Report)

1. **Contrast ratio issues**: Some text doesn't meet WCAG AA
2. **Heading order**: h1 → h3 (skipping h2) in some places

These don't affect performance but should be fixed for the 94→100 accessibility target.
