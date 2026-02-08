# API Key Security - Action Required

## Current Status: ⚠️ PROTOTYPE RISK

The Gemini AI API key is currently exposed in the client-side bundle via `VITE_GEMINI_API_KEY`.

### The Problem

All `VITE_*` environment variables are embedded into the client-side JavaScript bundle during build. Anyone who inspects the source code in browser DevTools can extract the API key and:
- Use your API quota
- Incur charges on your Google Cloud account
- Make unlimited requests as your application

### Current Mitigation

The app has robust **offline fallback responses** that work when:
- No API key is configured
- API key is invalid/expired
- API service is unreachable

This means the app still functions without the AI feature, but authenticated AI tutoring is exposed.

## Solution: Firebase Cloud Functions Proxy

### Architecture

```
Current (INSECURE):
[Browser] --> [Gemini API] (API key exposed in JS)

Target (SECURE):
[Browser] --> [Firebase Function] --> [Gemini API]
                  (API key in server environment)
```

### Implementation Steps

#### 1. Create a Firebase Cloud Function

Create `functions/aiTutor.js`:

```javascript
const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// API key stored securely in Firebase environment
const genAI = new GoogleGenerativeAI(functions.config().gemini.apikey);

exports.chatWithTutor = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const { message, mode, section, conversationHistory, courseId, contextText } = data;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Build the prompt with system instructions and context
    // (Move prompt building logic from aiService.ts to here)
    
    const result = await model.generateContent(message);
    return { response: result.response.text() };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new functions.https.HttpsError('internal', 'AI service error');
  }
});
```

#### 2. Set the API Key in Firebase Environment

```bash
firebase functions:config:set gemini.apikey="YOUR_GEMINI_API_KEY"
```

#### 3. Update the Client Service

Update `src/services/aiService.ts`:

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

export const generateAIResponse = async (
  userMessage: string,
  mode = 'explain',
  weakAreas: WeakArea[] = [],
  section = 'REG',
  conversationHistory: ChatMessage[] = [],
  courseId: CourseId = 'cpa',
  contextText?: string
): Promise<string> => {
  try {
    const functions = getFunctions();
    const chatWithTutor = httpsCallable(functions, 'chatWithTutor');
    
    const result = await chatWithTutor({
      message: userMessage,
      mode,
      section,
      conversationHistory,
      courseId,
      contextText,
    });
    
    return (result.data as { response: string }).response;
  } catch (error) {
    // Fallback to offline responses
    return generateFallbackResponse(userMessage, mode, section, conversationHistory, true, courseId);
  }
};
```

#### 4. Remove Client-Side API Key

Delete from `.env`:
```diff
- VITE_GEMINI_API_KEY=your-key-here
```

#### 5. Deploy

```bash
firebase deploy --only functions
```

### Rate Limiting (Recommended)

Add rate limiting to the Cloud Function to prevent abuse:

```javascript
const rateLimit = require('firebase-functions-rate-limiter');

const limiter = rateLimit.FirestoreRateLimiter.buildLimiter({
  keyPrefix: 'ai-tutor',
  document: db.collection('rate_limits').doc('ai'),
  maxCalls: 50, // 50 requests
  periodSeconds: 3600, // per hour
});

exports.chatWithTutor = functions.https.onCall(async (data, context) => {
  // Check rate limit
  const limited = await limiter.isQuotaExceeded(context.auth.uid);
  if (limited) {
    throw new functions.https.HttpsError('resource-exhausted', 'Rate limit exceeded');
  }
  // ... rest of function
});
```

## Timeline

- **Before public launch**: MUST implement Firebase Functions proxy
- **Current status**: Acceptable for development/beta testing with limited users
- **Estimated effort**: 2-4 hours

## Related Files

- `src/services/aiService.ts` - Current client-side implementation
- `functions/index.js` - Firebase Functions entry point
- `.env` - Environment variables (do NOT commit to git)

## Monitoring

If you notice unexpected Gemini API usage:
1. Check `localStorage.getItem('ai_api_failures')` in browser console
2. Review Google Cloud Console for API usage spikes
3. Rotate the API key immediately if compromised
