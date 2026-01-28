# PassCPA Notification System Setup Guide

This guide covers the complete setup for PassCPA's notification system, which includes:
- **FCM Push Notifications** (Web)
- **Capacitor Local Notifications** (iOS/Android)
- **Cloud Functions** for scheduled reminders and weekly email reports

---

## Prerequisites

- Firebase project (passcpa-dev)
- Google Cloud access with IAM permissions
- SendGrid account for email delivery

---

## Step 1: Fix Cloud Build Permissions

The Cloud Functions deployment is blocked due to missing IAM permissions. This is a one-time fix.

### Option A: Using Google Cloud Console

1. Go to [IAM Admin](https://console.cloud.google.com/iam-admin/iam?project=passcpa-dev)

2. Click **"+ Grant Access"**

3. Add this principal:
   ```
   1064460054399@cloudbuild.gserviceaccount.com
   ```

4. Grant these roles:
   - **Cloud Functions Developer** (`roles/cloudfunctions.developer`)
   - **Service Account User** (`roles/iam.serviceAccountUser`)
   - **Cloud Build Service Account** (`roles/cloudbuild.builds.builder`)

5. Click **Save**

### Option B: Using Google Cloud Shell

Open [Google Cloud Shell](https://console.cloud.google.com/cloudshell?project=passcpa-dev) and run:

```bash
PROJECT_ID="passcpa-dev"
PROJECT_NUMBER="1064460054399"

# Grant Cloud Functions Developer role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/cloudfunctions.developer"

# Grant Service Account User role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Grant Cloud Build Service Account role
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.builder"
```

Wait 2-3 minutes for permissions to propagate.

---

## Step 2: Deploy Cloud Functions

After fixing permissions, deploy the functions:

```bash
cd /workspaces/passcpa
firebase deploy --only functions
```

Expected output:
```
✔ functions[sendDailyReminders(us-central1)] Successful create operation.
✔ functions[sendWeeklyReports(us-central1)] Successful create operation.
✔ functions[onFcmTokenUpdate(us-central1)] Successful create operation.
```

---

## Step 3: Configure SendGrid for Email Reports

### 3.1 Get SendGrid API Key

1. Go to [SendGrid API Keys](https://app.sendgrid.com/settings/api_keys)
2. Click **Create API Key**
3. Give it a name: `PassCPA Weekly Reports`
4. Select **Restricted Access** with:
   - Mail Send: Full Access
5. Copy the API key

### 3.2 Set the Secret in Firebase

```bash
firebase functions:secrets:set SENDGRID_API_KEY
```

Enter your SendGrid API key when prompted.

### 3.3 Verify Sender Domain (Required)

1. Go to [SendGrid Sender Authentication](https://app.sendgrid.com/settings/sender_auth)
2. Add and verify `passcpa.com` domain
3. Or use a verified single sender email address

> **Note:** Weekly reports will be sent from `reports@passcpa.com`. This domain must be verified in SendGrid.

---

## Step 4: Configure FCM for Web Push

### 4.1 Get VAPID Key

1. Go to [Firebase Console](https://console.firebase.google.com/project/passcpa-dev/settings/cloudmessaging)
2. Scroll to **Web Push certificates**
3. Click **Generate key pair** (or use existing)
4. Copy the Key pair

### 4.2 Add to Environment

Create/update `.env` file in project root:

```env
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
```

For production, add to your hosting environment variables.

### 4.3 Verify Service Worker

Ensure `public/firebase-messaging-sw.js` exists:

```javascript
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "passcpa-dev.firebaseapp.com",
  projectId: "passcpa-dev",
  storageBucket: "passcpa-dev.firebasestorage.app",
  messagingSenderId: "1064460054399",
  appId: "YOUR_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png'
  });
});
```

---

## Step 5: Capacitor Setup (iOS/Android)

### 5.1 Sync Capacitor

```bash
npx cap sync
```

### 5.2 iOS Configuration

Add to `ios/App/App/Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
</array>
```

### 5.3 Android Configuration

Local notifications should work automatically. For FCM on Android, add `google-services.json` to `android/app/`.

---

## Architecture Overview

### Notification Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER ENABLES NOTIFICATIONS                │
└─────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
           ┌───────────────┐             ┌───────────────┐
           │     WEB       │             │    MOBILE     │
           │  (FCM Push)   │             │  (Capacitor)  │
           └───────────────┘             └───────────────┘
                    │                             │
                    ▼                             ▼
           ┌───────────────┐             ┌───────────────┐
           │ Request FCM   │             │ Schedule Local│
           │    Token      │             │ Notification  │
           └───────────────┘             └───────────────┘
                    │                             │
                    ▼                             │
           ┌───────────────┐                      │
           │ Save token to │                      │
           │   Firestore   │                      │
           └───────────────┘                      │
                    │                             │
                    ▼                             ▼
┌─────────────────────────────────────────────────────────────────┐
│            Cloud Function: sendDailyReminders                   │
│            (Runs every hour, checks user preferences)           │
│            Sends FCM to web users at their preferred time       │
└─────────────────────────────────────────────────────────────────┘
                                   
┌─────────────────────────────────────────────────────────────────┐
│            Cloud Function: sendWeeklyReports                    │
│            (Runs every Sunday 9am)                              │
│            Sends HTML email via SendGrid                        │
└─────────────────────────────────────────────────────────────────┘
```

### Files Modified/Created

| File | Purpose |
|------|---------|
| `functions/index.js` | Cloud Functions for scheduled notifications |
| `functions/package.json` | Functions dependencies |
| `src/services/pushNotifications.ts` | Unified notification service |
| `src/providers/AuthProvider.tsx` | Auto-initialize on login |
| `src/components/pages/Settings.tsx` | Toggle preferences |
| `firebase.json` | Functions configuration |

### Firestore User Document Fields

```javascript
{
  // Notification preferences
  dailyReminderEnabled: boolean,
  dailyReminderTime: "HH:MM",  // e.g., "09:00"
  weeklyReportEnabled: boolean,
  
  // FCM tokens (for web push)
  fcmTokens: string[],
  lastTokenUpdate: Timestamp
}
```

---

## Testing

### Test Daily Reminders Manually

```bash
# Invoke the function manually
firebase functions:shell

# In the shell:
sendDailyReminders()
```

### Test Weekly Report Manually

```bash
firebase functions:shell

# In the shell:
sendWeeklyReports()
```

### Verify FCM Token Storage

1. Enable notifications in Settings
2. Check Firestore > users > {userId} > fcmTokens array

### Test Local Notifications (Mobile)

1. Build and run on device
2. Enable daily reminders in Settings
3. Wait for scheduled time (or set to 1 minute from now for testing)

---

## Troubleshooting

### "Permission denied" on Cloud Functions deploy

Run the IAM commands from Step 1 again, then wait 5 minutes before retrying.

### FCM token not saving

1. Check browser console for errors
2. Ensure VAPID key is set in `.env`
3. Verify service worker is registered

### Weekly emails not sending

1. Verify SendGrid API key is set: `firebase functions:secrets:access SENDGRID_API_KEY`
2. Check sender domain is verified in SendGrid
3. View function logs: `firebase functions:log --only sendWeeklyReports`

### Local notifications not firing (mobile)

1. Check app has notification permissions
2. Verify Capacitor is synced: `npx cap sync`
3. Check device settings for app notifications

---

## Monitoring

### View Function Logs

```bash
# All functions
firebase functions:log

# Specific function
firebase functions:log --only sendDailyReminders

# Follow logs in real-time
firebase functions:log --only sendDailyReminders --follow
```

### Google Cloud Console

- [Cloud Functions](https://console.cloud.google.com/functions?project=passcpa-dev)
- [Cloud Scheduler](https://console.cloud.google.com/cloudscheduler?project=passcpa-dev)
- [Cloud Build](https://console.cloud.google.com/cloud-build/builds?project=passcpa-dev)

---

## Cost Considerations

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Cloud Functions | 2M invocations/month | Schedule runs ~720 times/month (hourly) |
| Cloud Scheduler | 3 free jobs | We use 2 jobs |
| FCM | Unlimited | Free for all message types |
| SendGrid | 100 emails/day | May need paid plan for growth |

---

## Next Steps After Setup

1. ✅ Deploy Cloud Functions
2. ✅ Configure SendGrid
3. ✅ Add VAPID key
4. ⬜ Test on real devices
5. ⬜ Monitor function execution
6. ⬜ Set up alerts for failures
