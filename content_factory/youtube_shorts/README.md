# YouTube Shorts Automation

Automated pipeline for uploading shorts to YouTube from Firebase Storage.

## How It Works

1. **Generate videos** in InVideo using the script templates in `scripts/`
2. **Upload videos** to Firebase Storage under `shorts/pending/`
3. **Cloud Function** runs daily at 9am ET and uploads one video to YouTube
4. **Video moves** to `shorts/published/` after successful upload

## Setup Instructions

### 1. Enable YouTube Data API

```bash
# In Google Cloud Console for your Firebase project:
# 1. Go to APIs & Services > Library
# 2. Search for "YouTube Data API v3"
# 3. Click Enable
```

### 2. Create OAuth Credentials

```bash
# In Google Cloud Console:
# 1. Go to APIs & Services > Credentials
# 2. Create OAuth 2.0 Client ID (Desktop app)
# 3. Download the JSON file
# 4. Run the auth helper to get refresh token:
node scripts/youtube-auth.js
```

### 3. Set Firebase Secrets

```bash
# Set the secrets for Cloud Functions
firebase functions:secrets:set YOUTUBE_CLIENT_ID
firebase functions:secrets:set YOUTUBE_CLIENT_SECRET
firebase functions:secrets:set YOUTUBE_REFRESH_TOKEN
firebase functions:secrets:set YOUTUBE_CHANNEL_ID
```

### 4. Deploy

```bash
firebase deploy --only functions:uploadYouTubeShorts
```

## Uploading Videos

### File Naming Convention

```
shorts/pending/
├── 2026-03-17_far-consolidation.mp4
├── 2026-03-18_aud-opinions.mp4
├── 2026-03-19_reg-basis.mp4
└── ...
```

**Format:** `YYYY-MM-DD_topic-slug.mp4`

- Date prefix determines publish order (oldest first)
- Topic slug is used for title generation

### Metadata (Optional)

For custom titles/descriptions, create a JSON sidecar:

```
shorts/pending/
├── 2026-03-17_far-consolidation.mp4
├── 2026-03-17_far-consolidation.json   <-- metadata file
```

**Metadata JSON:**
```json
{
  "title": "Why 40% Fail FAR: Consolidation Adjustments | CPA Exam",
  "description": "Learn the CAR IN BIG mnemonic for consolidated financial statements...",
  "tags": ["CPA exam", "FAR", "consolidation", "accounting"],
  "categoryId": "27"
}
```

### Default Settings

Without a metadata file, the function generates:
- **Title:** Topic slug humanized + "| CPA Exam Tips"
- **Description:** Generic VoraPrep call-to-action
- **Tags:** ["CPA exam", "CPA prep", "accounting", "VoraPrep"]
- **Category:** 27 (Education)
- **Privacy:** Public
- **Made for Kids:** No

## Monitoring

Check the function logs:
```bash
firebase functions:log --only uploadYouTubeShorts
```

View upload history in Firestore:
```
youtube_shorts/
├── 2026-03-17_far-consolidation
│   ├── status: "published"
│   ├── youtubeId: "abc123xyz"
│   ├── uploadedAt: ...
│   └── ...
```

## InVideo Scripts

See `scripts/invideo-prompts.md` for ready-to-use prompts organized by exam section.
