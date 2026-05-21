# API Key & Secret Management

> Single source of truth for every credential VoraPrep uses. If you add a new
> integration, update this doc in the same PR.

---

## 1. Storage Tiers

| Tier | Where it lives | Examples | Committed? |
|------|----------------|----------|------------|
| **Public client config** | `.env.development`, `.env.staging`, `.env.production` | `VITE_FIREBASE_*`, `VITE_GA_*`, `VITE_GOOGLE_ADS_*`, `VITE_FIREBASE_VAPID_KEY` | ✅ Yes — public by design, locked down with GCP API-key restrictions |
| **Local dev secrets** | `.env`, `.env.local` (root); `scripts/**/.env` | Dev `VITE_GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `HEYGEN_API_KEY`, `DISCORD_BOT_TOKEN`, `RESEND_API_KEY` (scripts) | ❌ Never — gitignored |
| **Cloud Functions secrets** | Google Secret Manager | `RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `GEMINI_API_KEY`, `DATAFORSEO_*`, `TELNYX_*` | ❌ Never — managed via `firebase functions:secrets:set` |
| **Firebase Admin SDK** | `serviceAccountKey.json`, `serviceAccountKey.prod.json` | JSON private keys with full admin scope | ❌ Never — gitignored; treat as root-equivalent |

---

## 2. Complete Inventory

### 2.1 Client-side (`VITE_*`, embedded in browser bundle)

| Variable | Sensitivity | Rotate? | Notes |
|----------|------------|---------|-------|
| `VITE_FIREBASE_API_KEY` | Public | Never | Identifies the GCP project. Restrict via GCP Console → APIs & Services → Credentials → HTTP referrers (web) + package name + SHA-1 (Android/iOS). |
| `VITE_FIREBASE_AUTH_DOMAIN` | Public | Never | |
| `VITE_FIREBASE_PROJECT_ID` | Public | Never | |
| `VITE_FIREBASE_STORAGE_BUCKET` | Public | Never | |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Public | Never | |
| `VITE_FIREBASE_APP_ID` | Public | Never | |
| `VITE_FIREBASE_MEASUREMENT_ID` | Public | Never | GA4 measurement ID. |
| `VITE_FIREBASE_VAPID_KEY` | Public | Never | FCM web-push *public* key. |
| `VITE_GA_MEASUREMENT_ID` | Public | Never | |
| `VITE_GOOGLE_ADS_*` | Public | Never | Conversion action IDs. |
| `VITE_GEMINI_API_KEY` | **Semi-sensitive** | If exposed | Dev/test fallback + admin CourseFactory only; production AI tutor goes through `geminiProxy` Cloud Function. Restrict via GCP Console → API restrictions → Generative Language API only + HTTP referrer allow-list. |

### 2.2 Server-only secrets in local `.env` (used by Node scripts only)

| Variable | Used by | Rotation cadence | Rotate at |
|----------|---------|------------------|-----------|
| `ANTHROPIC_API_KEY` | `scripts/ux-audit`, content tooling | 12 months | https://console.anthropic.com/settings/keys |
| `OPENAI_API_KEY` | content generation | 12 months | https://platform.openai.com/api-keys |
| `HEYGEN_API_KEY` | `content_factory/*` | 12 months | https://app.heygen.com/settings/api |
| `RESEND_API_KEY` (scripts/reddit_monitor) | reddit notifier | 12 months | https://resend.com/api-keys |
| `DISCORD_BOT_TOKEN` (scripts/discord_bots, scripts/reddit_monitor) | Discord bots | On suspicion | https://discord.com/developers/applications → Bot → Reset Token |

### 2.3 Cloud Functions secrets (Google Secret Manager, per project)

Set in dev/staging/prod independently:

```bash
firebase functions:secrets:set RESEND_API_KEY --project passcpa-dev
firebase functions:secrets:set RESEND_API_KEY --project voraprep-staging
firebase functions:secrets:set RESEND_API_KEY --project voraprep-prod
```

| Secret | Used by | Rotation cadence | Rotate at |
|--------|---------|------------------|-----------|
| `RESEND_API_KEY` | All transactional email (~19 functions in `functions/index.js`) | 12 months | https://resend.com/api-keys |
| `STRIPE_SECRET_KEY` | Checkout, webhook, customer portal | 6–12 months, or immediately on contractor offboarding | https://dashboard.stripe.com/apikeys |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature verification | When endpoint URL changes | Stripe Dashboard → Developers → Webhooks |
| `DAILY_CPA_STRIPE_WEBHOOK_SECRET` | daily-cpa subdomain webhook | Same as above | Same |
| `GEMINI_API_KEY` | `geminiProxy` Cloud Function, content jobs | 12 months | https://aistudio.google.com/apikey |
| `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` | keyword research | 12 months | https://app.dataforseo.com/api-access |
| `TELNYX_API_KEY` / `TELNYX_PHONE_NUMBER` / `TELNYX_PUBLIC_KEY` | daily-cpa SMS | 12 months | https://portal.telnyx.com/#/app/api-keys |

### 2.4 Firebase Admin SDK service accounts

| File | Project | Risk if leaked |
|------|---------|----------------|
| `serviceAccountKey.json` | `passcpa-dev` | Full admin on dev project |
| `serviceAccountKey.prod.json` | `voraprep-prod` | **Full admin on production — equivalent to losing the database** |

**Rules:**
- Never on a developer laptop or Codespace unless actively in use.
- Rotate every **90 days** or immediately after any laptop/Codespace exposure: GCP Console → IAM & Admin → Service Accounts → select → Keys → Add/Delete.
- Prefer `GOOGLE_APPLICATION_CREDENTIALS` env var pointing to a path outside the repo, or workload identity federation in CI.

---

## 3. Operational Procedures

### 3.1 Adding a new server secret

1. Decide tier: local script secret (root `.env`) vs Cloud Functions secret (Secret Manager).
2. If Cloud Functions:
   ```bash
   firebase functions:secrets:set NEW_SECRET --project passcpa-dev
   firebase functions:secrets:set NEW_SECRET --project voraprep-staging
   firebase functions:secrets:set NEW_SECRET --project voraprep-prod
   ```
3. Reference it in the function: `defineSecret('NEW_SECRET')` and add to the `secrets: [...]` array of the function options.
4. Update §2.3 of this doc and `.env.example` (in the "Cloud Functions secrets" reference block).
5. Deploy: `npm run deploy:dev` first, then staging, then prod.

### 3.2 Rotating a secret

1. Generate the new value at the provider.
2. **Cloud Functions secrets**: `firebase functions:secrets:set NAME --project <id>` then `firebase deploy --only functions --project <id>`. Old version is automatically destroyed after a 7-day grace by Secret Manager unless pinned.
3. **Local `.env` secrets**: replace value in your local `.env` / `.env.local`. Notify other devs out-of-band.
4. Revoke the old value at the provider.
5. Record the rotation in §4 below.

### 3.3 If a secret is leaked

1. **Revoke first, investigate second.** Rotate at the provider immediately.
2. Push a new value via the procedure above.
3. If committed to git: rotate, then scrub history with `git filter-repo` and force-push (coordinate with team).
4. Audit usage logs at the provider (Stripe Events, OpenAI usage, Resend logs, GCP Audit Logs) for the leak window.
5. Open a post-mortem.

---

## 4. Rotation Log

| Date | Secret | Reason | Done by |
|------|--------|--------|---------|
| _add entries here_ | | | |

---

## 5. Hardening Checklist

- [ ] Every `VITE_FIREBASE_API_KEY` has GCP API-key restrictions (HTTP referrer for web, package + SHA-1 for Android/iOS).
- [ ] `VITE_GEMINI_API_KEY` is restricted to the Generative Language API and an allow-list of referrers.
- [ ] Firestore + Storage rules enforce owner-only access (see `firestore.rules`, `storage.rules`).
- [ ] App Check is enabled on all production traffic.
- [ ] CI uses dedicated service accounts (not the same JSON developers have locally).
- [ ] No secret appears in CI logs (`firebase deploy --only functions` masks secrets automatically; custom scripts must not `echo $SECRET`).
- [ ] `serviceAccountKey*.json` only exists on machines that actively need it.
