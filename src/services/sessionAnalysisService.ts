/**
 * AI Session Analysis Service
 * 
 * Uses Gemini AI to analyze user sessions and provide insights:
 * - Complete session journey review
 * - Drop-off analysis with reasons
 * - Actionable product improvement suggestions
 */

import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';
import { Session, Activity, ActivityType, getPageName } from './sessionRecordingService';
import { Timestamp } from 'firebase/firestore';
import logger from '../utils/logger';

// Safe date conversion (copied from SessionActivityViewer)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toSafeDate = (ts: any): Date => {
  if (!ts) return new Date(0);
  if (ts instanceof Timestamp) return ts.toDate();
  if (ts instanceof Date) return ts;
  if (typeof ts === 'object' && typeof ts.seconds === 'number') {
    return new Date(ts.seconds * 1000);
  }
  if (typeof ts === 'number') return new Date(ts);
  const d = new Date(ts);
  return isNaN(d.getTime()) ? new Date(0) : d;
};

export interface SessionAnalysisResult {
  // Overall assessment
  sessionScore: number; // 1-10 engagement score
  sessionType: 'exploration' | 'intent-to-convert' | 'learning' | 'confused' | 'abandoned';
  
  // Journey summary
  journeySummary: string;
  keyMoments: Array<{
    timestamp: string;
    action: string;
    significance: 'positive' | 'neutral' | 'negative' | 'critical';
    note: string;
  }>;
  
  // Drop-off analysis
  dropOffAnalysis: {
    likelyReason: string;
    confidenceLevel: 'high' | 'medium' | 'low';
    supportingEvidence: string[];
    psychologicalFactors: string[];
  };
  
  // Product improvement suggestions
  improvements: Array<{
    priority: 'critical' | 'high' | 'medium' | 'low';
    area: string;
    problem: string;
    suggestion: string;
    expectedImpact: string;
  }>;
  
  // User intent inference
  userIntent: {
    primaryGoal: string;
    achievedGoal: boolean;
    blockers: string[];
  };
  
  // Raw AI response for debugging
  rawResponse?: string;
}

interface GeminiProxyRequest {
  messages: Array<{ role: string; parts: Array<{ text: string }> }>;
  systemPrompt: string;
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

interface GeminiProxyResponse {
  text: string;
  error?: string;
}

/**
 * Format session data into a readable narrative for the AI
 */
function formatSessionForAI(
  session: Session,
  activities: Activity[],
  userName?: string,
  userEmail?: string
): string {
  const startTime = toSafeDate(session.startedAt);
  const endTime = session.endedAt ? toSafeDate(session.endedAt) : null;
  const duration = session.duration ? Math.round(session.duration / 1000) : 0;
  
  // Build activity timeline
  const timeline = activities.map((act, idx) => {
    const time = toSafeDate(act.timestamp);
    const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    let description = `[${timeStr}] ${act.type}`;
    
    switch (act.type) {
      case 'page_view':
        description += ` → ${act.pageName || act.page}`;
        break;
      case 'button_click':
      case 'link_click':
      case 'click':
        description += `: "${act.details?.element || 'unknown element'}"`;
        if (act.details?.target) {
          description += ` → ${act.details.target}`;
        }
        break;
      case 'error':
        description += `: ${act.details?.errorMessage || 'unknown error'}`;
        break;
      case 'form_submit':
        description += `: form submitted on ${act.pageName}`;
        break;
      case 'modal_open':
      case 'modal_close':
        description += `: ${act.details?.element || 'modal'}`;
        break;
      case 'practice_start':
      case 'practice_end':
        description += ` (${act.details?.section || 'unknown section'})`;
        break;
      case 'lesson_start':
      case 'lesson_complete':
        description += `: ${act.details?.element || 'lesson'}`;
        break;
      case 'checkout_start':
      case 'checkout_complete':
        description += ` — conversion event!`;
        break;
      default:
        if (act.details?.element) {
          description += `: ${act.details.element}`;
        }
    }
    
    return description;
  }).join('\n');
  
  // Device info
  const device = session.device || {};
  const deviceInfo = `${device.isMobile ? 'Mobile' : 'Desktop'}, ${device.platform || 'unknown'}, viewport ${device.viewportWidth}x${device.viewportHeight}`;
  
  // Entry info
  const entry = session.entry || {} as { page?: string; pageName?: string; referrer?: string; utmSource?: string; utmMedium?: string; utmCampaign?: string };
  const referrer = entry.referrer || 'direct';
  const utmInfo = [
    entry.utmSource && `source=${entry.utmSource}`,
    entry.utmMedium && `medium=${entry.utmMedium}`,
    entry.utmCampaign && `campaign=${entry.utmCampaign}`,
  ].filter(Boolean).join(', ') || 'no UTM params';
  
  // Exit info
  const exit = session.exit || {} as { page?: string; pageName?: string };
  const exitPage = exit.pageName || 'unknown';
  
  return `
## SESSION OVERVIEW
- **User**: ${userName || userEmail || 'Anonymous visitor'}
- **Session ID**: ${session.id}
- **Date**: ${startTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- **Start Time**: ${startTime.toLocaleTimeString('en-US')}
- **Duration**: ${duration} seconds (${Math.round(duration / 60)} minutes)
- **Status**: ${session.isActive ? 'STILL ACTIVE' : 'ENDED'}
- **Device**: ${deviceInfo}
- **Referrer**: ${referrer}
- **UTM**: ${utmInfo}
- **Entry Page**: ${entry.pageName || 'unknown'}
- **Exit Page**: ${exitPage}
- **Pages Viewed**: ${session.pageCount || 0}
- **Click Count**: ${session.clickCount || 0}

## ACTIVITY TIMELINE (${activities.length} actions)
${timeline || '(no activities recorded)'}

## KEY STATS
- Time on site: ${duration}s
- Pages per session: ${session.pageCount || 0}
- Engagement (clicks): ${session.clickCount || 0}
- Conversion events: ${activities.filter(a => a.type === 'checkout_start' || a.type === 'checkout_complete').length}
- Errors encountered: ${activities.filter(a => a.type === 'error').length}
`.trim();
}

/**
 * Analyze a user session with AI
 */
export async function analyzeSession(
  session: Session,
  activities: Activity[],
  userName?: string,
  userEmail?: string
): Promise<SessionAnalysisResult> {
  const sessionNarrative = formatSessionForAI(session, activities, userName, userEmail);
  
  const systemPrompt = `You are an expert UX researcher and product analyst for VoraPrep, an AI-powered professional exam prep platform (CPA, EA, CMA, CIA, CISA, CFP certification exams).

Your job is to analyze user session data and provide actionable insights. VoraPrep is:
- A study app for professionals preparing for certification exams
- Key features: practice questions (MCQs), lessons, flashcards, AI tutor, study plans, progress tracking
- Conversion goal: users sign up for paid subscriptions after free trial
- Common pages: /dashboard, /practice (questions), /lessons, /flashcards, /study-plan, /pricing, /signup, /login

When analyzing sessions:
1. Look for friction points, confusion signals, and drop-off patterns
2. Consider the user's likely intent based on their journey
3. Be specific about what UI/UX changes would help
4. Flag critical issues that are definitely losing conversions
5. Consider technical issues (errors), mobile experience, and cognitive load

Always structure your response as valid JSON.`;

  const prompt = `Analyze this user session from VoraPrep and provide insights in JSON format.

${sessionNarrative}

Respond with ONLY valid JSON in this exact structure (no markdown, no code blocks):
{
  "sessionScore": <1-10 engagement score>,
  "sessionType": "<exploration|intent-to-convert|learning|confused|abandoned>",
  "journeySummary": "<2-3 sentence summary of what the user did and their likely experience>",
  "keyMoments": [
    {
      "timestamp": "<time of event>",
      "action": "<what they did>",
      "significance": "<positive|neutral|negative|critical>",
      "note": "<why this matters>"
    }
  ],
  "dropOffAnalysis": {
    "likelyReason": "<most probable reason they left>",
    "confidenceLevel": "<high|medium|low>",
    "supportingEvidence": ["<evidence 1>", "<evidence 2>"],
    "psychologicalFactors": ["<factor 1>", "<factor 2>"]
  },
  "improvements": [
    {
      "priority": "<critical|high|medium|low>",
      "area": "<specific page or feature>",
      "problem": "<what's wrong>",
      "suggestion": "<specific change to make>",
      "expectedImpact": "<what improvement is expected>"
    }
  ],
  "userIntent": {
    "primaryGoal": "<what they were trying to do>",
    "achievedGoal": <true|false>,
    "blockers": ["<blocker 1>", "<blocker 2>"]
  }
}`;

  try {
    const geminiProxy = httpsCallable<GeminiProxyRequest, GeminiProxyResponse>(
      functions,
      'geminiProxy'
    );
    
    const result = await geminiProxy({
      messages: [
        { role: 'user', parts: [{ text: prompt }] }
      ],
      systemPrompt,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2000,
      },
    });
    
    if (result.data.error) {
      throw new Error(result.data.error);
    }
    
    // Parse the JSON response
    let responseText = result.data.text.trim();
    
    // Remove markdown code blocks if present
    if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }
    
    const analysis = JSON.parse(responseText) as SessionAnalysisResult;
    analysis.rawResponse = result.data.text;
    
    return analysis;
  } catch (error) {
    logger.error('[SessionAnalysis] Failed to analyze session:', error);
    
    // Return a fallback analysis
    return {
      sessionScore: 0,
      sessionType: 'abandoned',
      journeySummary: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}. The session had ${activities.length} activities over ${Math.round((session.duration || 0) / 1000)}s.`,
      keyMoments: [],
      dropOffAnalysis: {
        likelyReason: 'Unable to analyze - AI service error',
        confidenceLevel: 'low',
        supportingEvidence: [],
        psychologicalFactors: [],
      },
      improvements: [],
      userIntent: {
        primaryGoal: 'Unknown',
        achievedGoal: false,
        blockers: ['Analysis failed'],
      },
      rawResponse: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Format analysis for display
 */
export function formatAnalysisForDisplay(analysis: SessionAnalysisResult): string {
  const sections: string[] = [];
  
  // Header
  sections.push(`## Session Analysis (Score: ${analysis.sessionScore}/10)`);
  sections.push(`**Type:** ${analysis.sessionType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`);
  sections.push('');
  
  // Summary
  sections.push(`### Journey Summary`);
  sections.push(analysis.journeySummary);
  sections.push('');
  
  // Key moments
  if (analysis.keyMoments.length > 0) {
    sections.push('### Key Moments');
    for (const moment of analysis.keyMoments) {
      const emoji = {
        positive: '✅',
        neutral: '➖',
        negative: '⚠️',
        critical: '🚨',
      }[moment.significance];
      sections.push(`${emoji} **${moment.timestamp}** - ${moment.action}`);
      sections.push(`   _${moment.note}_`);
    }
    sections.push('');
  }
  
  // Drop-off analysis
  sections.push('### Drop-Off Analysis');
  sections.push(`**Likely Reason:** ${analysis.dropOffAnalysis.likelyReason}`);
  sections.push(`**Confidence:** ${analysis.dropOffAnalysis.confidenceLevel}`);
  if (analysis.dropOffAnalysis.supportingEvidence.length > 0) {
    sections.push('**Evidence:**');
    for (const evidence of analysis.dropOffAnalysis.supportingEvidence) {
      sections.push(`- ${evidence}`);
    }
  }
  if (analysis.dropOffAnalysis.psychologicalFactors.length > 0) {
    sections.push('**Psychological Factors:**');
    for (const factor of analysis.dropOffAnalysis.psychologicalFactors) {
      sections.push(`- ${factor}`);
    }
  }
  sections.push('');
  
  // Improvements
  if (analysis.improvements.length > 0) {
    sections.push('### Recommended Improvements');
    for (const imp of analysis.improvements) {
      const priorityEmoji = {
        critical: '🔴',
        high: '🟠',
        medium: '🟡',
        low: '🟢',
      }[imp.priority];
      sections.push(`${priorityEmoji} **[${imp.priority.toUpperCase()}] ${imp.area}**`);
      sections.push(`   Problem: ${imp.problem}`);
      sections.push(`   Suggestion: ${imp.suggestion}`);
      sections.push(`   Expected Impact: ${imp.expectedImpact}`);
      sections.push('');
    }
  }
  
  // User Intent
  sections.push('### User Intent');
  sections.push(`**Goal:** ${analysis.userIntent.primaryGoal}`);
  sections.push(`**Achieved:** ${analysis.userIntent.achievedGoal ? '✅ Yes' : '❌ No'}`);
  if (analysis.userIntent.blockers.length > 0) {
    sections.push('**Blockers:**');
    for (const blocker of analysis.userIntent.blockers) {
      sections.push(`- ${blocker}`);
    }
  }
  
  return sections.join('\n');
}
