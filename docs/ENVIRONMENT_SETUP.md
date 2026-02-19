# 🔧 Environment Setup Guide

This document explains how VoraPrep's development, staging, and production environments are structured.

## 📊 Environment Overview

| Environment | Branch | Firebase Project | URL | Purpose |
|-------------|--------|------------------|-----|---------|
| **Development** | `v2` | `passcpa-dev` | passcpa-dev.web.app | V2 development — big features, redesigns |
| **Staging** | `develop` | `voraprep-staging` | staging.voraprep.com | Hotfixes & patches — test before production |
| **Production** | `main` | `voraprep-prod` | voraprep.com | Live users |

## 🔀 Git Workflow

```
                    V2 Development (isolated)
                    ─────────────────────────
                    v2 ──> deploy:dev (passcpa-dev.web.app)
                    │
                    │  (merge only when V2 is ready)
                    ▼
Hotfixes & Patches
──────────────────
develop ──> deploy:staging ──> PR to main ──> deploy:prod
    ↑                              ↓
    │                         Production
feature/fix-* branches           (voraprep.com)
```

### Branch Rules
- **`main`**: Protected. Requires PR. Deploys to production (`voraprep-prod`).
- **`develop`**: Hotfixes, patches, small improvements. Deploys to staging (`voraprep-staging`). Merges to `main` via PR.
- **`v2`**: Version 2 development. Deploys to dev (`passcpa-dev`). **Never merges to `main` or `develop` until V2 is ready.**
- **`feature/*`, `fix/*`**: Short-lived branches off `develop` for specific fixes.

### Key Safety Rules
1. **V2 cannot reach production** — `v2` never merges to `develop` or `main` directly. When V2 is done, it merges to `develop` first, gets tested on staging, then goes to `main`.
2. **Production hotfixes** — branch from `develop`, fix, test on staging, PR to `main`.
3. **Deploy scripts enforce environment matching** — `scripts/verify-deploy-env.cjs` prevents deploying wrong builds to wrong projects.

### Deploy Commands
```bash
# V2 development (from v2 branch)
npm run deploy:dev          # → passcpa-dev.web.app

# Staging / hotfix testing (from develop branch)  
npm run deploy:staging      # → staging.voraprep.com

# Production release (from main branch, after PR merge)
npm run deploy:prod         # → voraprep.com
```

### One-Time Setup: Branch Protection on `main`
Go to GitHub → Settings → Rules → Rulesets → New ruleset:
1. Name: "Protect main"
2. Target: `main` branch
3. Rules: ✅ Require pull request, ✅ Prevent deletion
4. Enforcement: Active

## 🔐 Firebase Projects Setup

### 1. Create Firebase Projects

Go to [Firebase Console](https://console.firebase.google.com) and create:
- `voraprep-staging` (if not exists)
- `voraprep-prod` (if not exists)

### 2. Configure Each Project

For each project, enable:
- Authentication (Email/Password, Google)
- Firestore Database
- Hosting
- Storage
- Cloud Functions (optional)

### 3. Get Service Account Keys

For each project:
1. Go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save as JSON (DO NOT COMMIT!)

### 4. Add GitHub Secrets

Go to GitHub repo → Settings → Secrets → Actions, add:

**For Development (passcpa-dev):**
- `FIREBASE_SERVICE_ACCOUNT_DEV` - Service account JSON

**For Staging (voraprep-staging):**
- `FIREBASE_SERVICE_ACCOUNT_STAGING` - Service account JSON

**For Production (voraprep-prod):**
- `FIREBASE_SERVICE_ACCOUNT_PROD` - Service account JSON

**Shared Secrets (use production values for CI):**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_GEMINI_API_KEY`

## 💻 Local Development

### Quick Start

```bash
# Clone and install
git clone https://github.com/rob637/passcpa.git
cd passcpa
npm install

# Create local env file with your dev Firebase config
cp .env.development .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

### Manual Deployment Commands

```bash
# Deploy to Development
npm run deploy:dev

# Deploy to Staging  
npm run deploy:staging

# Deploy to Production
npm run deploy:prod
```

### Switch Firebase Projects Locally

```bash
# Use development project
firebase use development

# Use staging project
firebase use staging

# Use production project
firebase use production

# Check current project
firebase use
```

## 🔄 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) handles:

1. **On every push/PR:**
   - Lint code
   - Type check
   - Run unit tests
   - Build application

2. **On merge to `develop`:**
   - Deploy to Development (passcpa-dev.web.app)

3. **On merge to `staging`:**
   - Deploy to Staging (voraprep-staging.web.app)

4. **On merge to `main`:**
   - Deploy to Production (voraprep.com)

5. **On PR creation:**
   - Generate preview URL for testing

## 🌐 Custom Domains

### Staging
1. In Firebase Console → voraprep-staging → Hosting
2. Add custom domain: `staging.voraprep.com`
3. Follow DNS verification steps

### Production
1. In Firebase Console → voraprep-prod → Hosting
2. Add custom domain: `voraprep.com` and `www.voraprep.com`
3. Follow DNS verification steps

## ⚙️ Environment Variables

### Development (.env.development)
- Debug mode enabled
- Analytics disabled
- Uses passcpa-dev Firebase

### Staging (.env.staging)
- Debug mode enabled (for QA)
- Analytics enabled (test tracking)
- Uses voraprep-staging Firebase

### Production (.env.production)
- Debug mode disabled
- Analytics enabled
- Uses voraprep-prod Firebase

## 🔒 Security Checklist

- [ ] Never commit `.env` or `.env.local` files
- [ ] Use GitHub Secrets for CI/CD
- [ ] Enable Firebase App Check in production
- [ ] Set up Firestore security rules
- [ ] Configure Storage security rules
- [ ] Enable Firebase Auth security features
- [ ] Set up budget alerts for Firebase billing

## 🛡️ Environment Safety Features

VoraPrep includes multiple safety guards to prevent environment cross-contamination:

### 1. Runtime Environment Indicator
A visual badge appears in development and staging environments showing:
- 🔧 DEV (green) - Development environment
- 🧪 STAGING (yellow) - Staging environment
- Hidden in production (no visual indicator)

### 2. CI/CD Environment Isolation
Each environment has its own:
- Build job with environment-specific secrets
- Build verification step that checks for environment mismatches
- Dedicated GitHub Environment with optional approval gates

### 3. Firebase Config Validation
At runtime, the app:
- Validates all required environment variables exist
- Detects mismatches between `VITE_ENVIRONMENT` and `projectId`
- Logs environment info in non-production builds

### 4. Safe Migration Scripts
All migration scripts require explicit environment specification:

```bash
# Development (no confirmation required)
FIREBASE_ENV=development npx tsx scripts/migrate_to_db.ts

# Staging (5-second delay to cancel)
FIREBASE_ENV=staging npx tsx scripts/migrate_to_db.ts

# Production (requires flag AND manual confirmation)
FIREBASE_ENV=production npx tsx scripts/migrate_to_db.ts --confirm-production
```

## 🔐 Required GitHub Secrets

### Development Environment Secrets
| Secret Name | Description |
|-------------|-------------|
| `FIREBASE_SERVICE_ACCOUNT_DEV` | Service account JSON for deployment |
| `FIREBASE_DEV_API_KEY` | Firebase API key |
| `FIREBASE_DEV_AUTH_DOMAIN` | passcpa-dev.firebaseapp.com |
| `FIREBASE_DEV_PROJECT_ID` | passcpa-dev |
| `FIREBASE_DEV_STORAGE_BUCKET` | passcpa-dev.firebasestorage.app |
| `FIREBASE_DEV_MESSAGING_SENDER_ID` | Sender ID |
| `FIREBASE_DEV_APP_ID` | App ID |

### Staging Environment Secrets
| Secret Name | Description |
|-------------|-------------|
| `FIREBASE_SERVICE_ACCOUNT_STAGING` | Service account JSON |
| `FIREBASE_STAGING_API_KEY` | Firebase API key |
| `FIREBASE_STAGING_AUTH_DOMAIN` | voraprep-staging.firebaseapp.com |
| `FIREBASE_STAGING_PROJECT_ID` | voraprep-staging |
| `FIREBASE_STAGING_STORAGE_BUCKET` | voraprep-staging.firebasestorage.app |
| `FIREBASE_STAGING_MESSAGING_SENDER_ID` | Sender ID |
| `FIREBASE_STAGING_APP_ID` | App ID |

### Production Environment Secrets
| Secret Name | Description |
|-------------|-------------|
| `FIREBASE_SERVICE_ACCOUNT_PROD` | Service account JSON |
| `FIREBASE_PROD_API_KEY` | Firebase API key |
| `FIREBASE_PROD_AUTH_DOMAIN` | voraprep-prod.firebaseapp.com |
| `FIREBASE_PROD_PROJECT_ID` | voraprep-prod |
| `FIREBASE_PROD_STORAGE_BUCKET` | voraprep-prod.firebasestorage.app |
| `FIREBASE_PROD_MESSAGING_SENDER_ID` | Sender ID |
| `FIREBASE_PROD_APP_ID` | App ID |

### Shared Secrets
| Secret Name | Description |
|-------------|-------------|
| `VITE_GEMINI_API_KEY` | AI tutor API key (same across environments) |

## 📱 Mobile App Environments

For Capacitor (iOS/Android), each environment needs:

1. Separate Bundle IDs:
   - Dev: `com.voraprep.app.dev`
   - Staging: `com.voraprep.app.staging`
   - Prod: `com.voraprep.app`

2. Separate Firebase configs:
   - `google-services.json` (Android)
   - `GoogleService-Info.plist` (iOS)

## 🆘 Troubleshooting

### "Permission denied" on deploy
```bash
firebase login --reauth
firebase use <project-name>
```

### Build fails with env errors
```bash
# Make sure .env.local exists with all required vars
cat .env.example  # See required variables
```

### Preview URL not generated
- Check GitHub Actions logs
- Verify `FIREBASE_SERVICE_ACCOUNT_DEV` secret is set
