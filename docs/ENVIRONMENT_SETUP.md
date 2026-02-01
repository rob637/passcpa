# 🔧 Environment Setup Guide

This document explains how VoraPrep's development, staging, and production environments are structured.

## 📊 Environment Overview

| Environment | Branch | Firebase Project | URL | Purpose |
|-------------|--------|------------------|-----|---------|
| **Development** | `develop` | `passcpa-dev` | passcpa-dev.web.app | Daily development, testing |
| **Staging** | `staging` | `voraprep-staging` | staging.voraprep.com | QA, pre-release testing |
| **Production** | `main` | `voraprep-prod` | voraprep.com | Live users |

## 🔀 Git Workflow

```
feature/* ──┬──> develop ──> staging ──> main
            │       ↓           ↓         ↓
            │   Dev Deploy   Staging   Production
            │
            └──> PR Preview (auto-generated URL)
```

### Branch Rules
- **`main`**: Protected. Requires PR + approval. Auto-deploys to production.
- **`staging`**: Protected. Requires PR. Auto-deploys to staging.
- **`develop`**: Default branch for development. Auto-deploys to dev.
- **`feature/*`**: Feature branches. Create PRs to get preview URLs.

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
