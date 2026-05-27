# Incident response checklist — PII leak in public repo

**Awareness date:** 2026-05-27 (today)
**Repo:** `rob637/passcpa` (PUBLIC)
**Leaked files:** `users.json`, `orphaned-users.json` (Firebase Auth export)
**Leaked data:** real user emails, display names, Firebase scrypt password
hashes + salts, Google OAuth `providerUserInfo`, `localId` UIDs
**First committed:** `b6bbf15` ("cleanup: remove stray files from root directory")
**Also present in:** `caf68fb`
**Removed from HEAD:** `bf648ec` (pushed to `origin/main` on 2026-05-27)

> The data is **still in git history** until step 5 (history rewrite) is done.
> Even after that, GitHub may keep cached SHAs for ~90 days (step 5b).
> **Assume the data is already compromised** — rotation + notification
> (steps 1–3) are higher priority than the history rewrite.

---

## ✅ Already done (in this session)

- [x] Audited Gemini key usage and confirmed Cloud Functions use Secret Manager
- [x] Audited all other API keys (no other hardcoded secrets in source)
- [x] Added `users.json`, `orphaned-users.json`, `**/users-export*.json`,
      `**/auth-export*.json` to `.gitignore` (commit `208cc20`)
- [x] `git rm --cached users.json orphaned-users.json` (commit `bf648ec`)
- [x] Pushed both cleanup commits to `origin/main`
- [x] Backed up the two files to `/tmp/users.json.backup` and `/tmp/orphaned-users.json.backup`
      (needed by the breach-reset script in step 3)
- [x] Added `gitleaks` CI workflow (`.github/workflows/secret-scan.yml`)
- [x] Added `.gitleaks.toml` with custom rules for Firebase Auth export shape
- [x] Wrote `scripts/dispatch-breach-resets.cjs` (dry-run by default)
- [x] Wrote `docs/INCIDENT_FILTER_REPO_RUNBOOK.md` (history purge runbook)

## 🔴 Do these now (today — GDPR clock is running)

### 1. Rotate every secret that could have been seen during the exposure window

The leaked JSON itself contained no API keys, but **assume any secret that
existed in this repo's history or in Cloud Functions logs during the exposure
window may have been observed**.

- [ ] **Firebase Auth scrypt SIGNER_KEY + SALT_SEPARATOR**
      Project settings → Users → "Password hash parameters" → rotate.
      This **invalidates every existing password hash** — which is exactly
      what we want. Existing users will be forced through password reset,
      which dovetails with step 3.
- [ ] **Stripe Secret Key + Webhook Secret**
      Stripe Dashboard → Developers → API keys → Roll → update
      `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` via
      `firebase functions:secrets:set STRIPE_SECRET_KEY --project voraprep-prod`.
- [ ] **Resend API key**
      Resend Dashboard → API Keys → revoke + create → update via
      `firebase functions:secrets:set RESEND_API_KEY --project voraprep-prod`.
- [ ] **Gemini API key (prod + staging)**
      GCP Console → APIs & Services → Credentials → regenerate → update:
      - `firebase functions:secrets:set GEMINI_API_KEY --project voraprep-prod`
      - GitHub repo secret `VITE_GEMINI_API_KEY_PROD` (Settings → Secrets → Actions)
      - GitHub repo secret `VITE_GEMINI_API_KEY_STAGING`
- [ ] **DataForSEO credentials** (`DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD`) —
      regenerate, then `firebase functions:secrets:set` for each.
- [ ] **Firebase Web API keys** (prod + staging). These are designed-public
      but should still be rotated and **HTTP referrer restrictions verified**:
      - GCP Console → APIs & Services → Credentials → Browser key
      - Allowed referrers: `https://voraprep.com/*`, `https://voraprep.web.app/*`,
        `https://voraprep-prod.web.app/*`, `https://voraprep-prod.firebaseapp.com/*`
      - After rotation: update `.env.production` and `.env.staging`, redeploy hosting.

After every rotation, redeploy Cloud Functions so they pick up the new secret:

```bash
firebase deploy --only functions --project voraprep-prod
firebase deploy --only functions --project voraprep-staging
```

### 2. Audit Firebase Auth sign-in logs

- [ ] In each project (`voraprep-prod`, `voraprep-staging`):
      Authentication → Users → check for unfamiliar successful sign-ins
      since `b6bbf15` (the first commit of `users.json`). Look for:
      - Sign-ins from IPs you don't recognize for known users.
      - Sign-ins for accounts that haven't been active in months.
      - Anomalous sign-in volume.
- [ ] Pull GCP audit logs for `identitytoolkit.googleapis.com` for the same window:
      `gcloud logging read 'resource.type="audited_resource" AND
       protoPayload.serviceName="identitytoolkit.googleapis.com"' --project voraprep-prod`

### 3. Notify affected users (breach disclosure)

The breach-reset script is ready in `scripts/dispatch-breach-resets.cjs`.

```bash
# Install deps once
cd /workspaces/passcpa/functions   # uses functions/ node_modules
# OR locally:
npm install --no-save firebase-admin resend

# Always start with a tiny dry-run to YOUR OWN inbox first
RESEND_API_KEY=re_xxx \
FIREBASE_PROJECT_ID=voraprep-prod \
node scripts/dispatch-breach-resets.cjs --limit 1 --send-to you@example.com

# Then a LIVE test to just yourself
RESEND_API_KEY=re_xxx \
FIREBASE_PROJECT_ID=voraprep-prod \
node scripts/dispatch-breach-resets.cjs --live --limit 1 --send-to you@example.com

# Then a real LIVE run (resume-safe — re-running skips already-sent)
RESEND_API_KEY=re_xxx \
FIREBASE_PROJECT_ID=voraprep-prod \
node scripts/dispatch-breach-resets.cjs --live --resume
```

The script:
- generates a password-reset link per user via Firebase Admin SDK
- sends a branded disclosure email via Resend with the reset link
- writes per-user results to `scripts/.breach-reset-report.json`
- is idempotent (`--resume` skips users already marked `sent`)

- [ ] Review the email copy in `dispatch-breach-resets.cjs` (`renderEmail()`)
      and tweak if you want different wording.
- [ ] Send a tiny dry-run + live test to yourself.
- [ ] Run live for all affected users.
- [ ] Save `scripts/.breach-reset-report.json` somewhere safe (compliance record).

### 4. Enable branch protection on `main`

The Codespaces token doesn't have admin scope, so do this from your laptop
or via the GitHub UI:

**Option A — UI:** GitHub → Settings → Branches → Add rule for `main`:
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging → require `lint-and-test`
      and `gitleaks` jobs
- ✅ Require linear history
- ✅ Do not allow bypassing the above settings
- ❌ Allow force pushes (leave OFF except during the history-rewrite window)

**Option B — gh CLI** (after `gh auth login` with `admin:repo` scope locally):

```bash
gh api -X PUT repos/rob637/passcpa/branches/main/protection \
  -H "Accept: application/vnd.github+json" \
  --input - <<'JSON'
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["lint-and-test", "gitleaks"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 0,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true
}
JSON
```

### 5. Rewrite git history (purge the files from past commits)

Follow [INCIDENT_FILTER_REPO_RUNBOOK.md](INCIDENT_FILTER_REPO_RUNBOOK.md) end-to-end.

Order matters:
- **5a.** Disable branch protection temporarily (UI: toggle "Allow force pushes" on)
- **5b.** Run the `git-filter-repo` purge and force-push
- **5c.** File a GitHub Support ticket to purge cached blob SHAs
- **5d.** Re-enable branch protection (step 4)
- **5e.** Tell every collaborator to re-clone

### 6. GDPR / breach notification (if EU users affected)

GDPR Article 33: a personal-data breach must be reported to the supervisory
authority within **72 hours of awareness**. Awareness anchor = today, **2026-05-27**.
Deadline: **2026-05-30 23:59 local time**.

- [ ] Check `users.json` for any users with EU email TLDs or known EU residency.
      `jq -r '.users[] | select(.email | test("\\.(de|fr|it|es|nl|be|at|pl|ie|pt|dk|se|fi|cz|gr|ro|hu|sk|bg|hr|si|ee|lv|lt|lu|mt|cy|eu)$")) | .email' /tmp/users.json.backup`
- [ ] If any: notify the relevant Data Protection Authority. For the US-based
      VoraPrep, you can choose any EU lead authority — Ireland (DPC) is
      common for English-language notifications.
- [ ] California: if any user is a CA resident, CCPA / CPRA require disclosure
      to affected users (covered by step 3) and to the AG if >500 CA residents.

### 7. Clean up local copies after dispatch

After the breach-reset run is complete:

```bash
rm /tmp/users.json.backup /tmp/orphaned-users.json.backup
# Local working-tree copies (untracked but still on disk):
rm users.json orphaned-users.json
```

## 🟡 Do these this week (hardening)

- [ ] **Drop `VITE_GEMINI_API_KEY` from the production bundle.** Currently
      `.github/workflows/deploy.yml` injects it at build time so the client
      can call Gemini directly. Move *all* AI traffic through the existing
      `geminiProxy` Cloud Function (auth + rate-limited + secret-managed).
      The dual-path code in `src/services/aiService.ts` is unnecessary risk.
- [ ] **Wire a real admin alert on `[ADMIN ALERT]` log lines in `geminiProxy`.**
      Today it only `console.error`s. Add a `pubsub` → email (Resend) or
      Slack webhook trigger when the log pattern matches.
- [ ] **Add a secondary AI provider (OpenAI or Anthropic) as a fallback in
      `geminiProxy`** so a Gemini outage doesn't break the AI tutor. The
      curated static fallback in `aiService.ts` already exists for total
      outages; this gives a real-LLM fallback before that.
- [ ] **Add a content-type allowlist to the `firebase.json` storage rules**
      so users can't smuggle JSON exports through Firebase Storage either.
- [ ] **Add a quarterly key-rotation reminder** (calendar) for Stripe / Resend /
      Gemini / DataForSEO. Document the cadence in `docs/API_KEY_SECURITY.md`.

## 🟢 Already in place (no action needed)

- ✅ `serviceAccountKey.json` is gitignored and was never committed.
- ✅ All Cloud Functions use Firebase Secret Manager (`secrets: [...]`).
- ✅ `geminiProxy` requires auth, rate-limits 30/hr per user, logs abuse.
- ✅ The `lint-and-test` CI job runs on every push to `main` and `develop`.

---

## File reference

| Path | Purpose |
|------|---------|
| `.gitignore` | Now blocks `users.json`, `orphaned-users.json`, `**/users-export*.json`, `**/auth-export*.json` |
| `.gitleaks.toml` | Custom secret-scan rules including Firebase Auth export shape |
| `.github/workflows/secret-scan.yml` | CI job that fails the build on any gitleaks finding |
| `scripts/dispatch-breach-resets.cjs` | Sends breach-disclosure email + password reset link to every affected user |
| `docs/INCIDENT_FILTER_REPO_RUNBOOK.md` | Step-by-step git history purge using `git-filter-repo` |
| `docs/INCIDENT_CHECKLIST.md` | This file |
| `/tmp/users.json.backup` | Local-only backup (used by dispatch script). **Delete after dispatch.** |
| `/tmp/orphaned-users.json.backup` | Local-only backup. **Delete after dispatch.** |
