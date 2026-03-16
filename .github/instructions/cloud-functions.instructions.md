---
description: "Use when creating or modifying Firebase Cloud Functions, webhooks, or scheduled functions."
applyTo: "functions/**"
---
# Cloud Functions Standards

- **Runtime**: Node.js, CommonJS (`require()`) — NOT ESM
- **Generation**: Firebase Functions Gen 2
- **Secrets**: Via `firebase functions:secrets:set` — never hardcode API keys
- **Key secrets**: RESEND_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET

## Patterns
```javascript
const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
```

## Key Functions
- `createCheckoutSession` / `stripeWebhook` — Stripe payments
- `sendDailyReminders` — FCM push (timezone-aware)
- `sendWeeklyReports` / `sendOnboardingReminders` — Email via Resend
- `sendWelcomeEmail` / `sendWaitlistConfirmation` — Firestore triggers
