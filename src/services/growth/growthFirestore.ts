/**
 * Growth Engine — Firestore Service
 * 
 * Handles all Firestore interactions for the Growth Engine:
 * - Keyword database CRUD
 * - Content brief storage
 * - Published article tracking
 * - Campaign performance data
 * - Growth metrics logging
 * 
 * Collections:
 *   growth/keywords/{keywordId}        — Tracked keywords
 *   growth/content/{briefId}           — Content briefs & articles
 *   growth/campaigns/{campaignId}      — SEM campaigns
 *   growth/metrics/{date}              — Daily growth metrics
 *   growth/actions/{actionId}          — Growth action items
 *   growth/config/settings             — Engine configuration
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  Timestamp,
  getCountFromServer,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import logger from '../../utils/logger';
import type { CourseId } from '../../types/course';
import type {
  TrackedKeyword,
  ContentBrief,
  PublishedArticle,
  SEMCampaign,
  DailyGrowthMetrics,
  GrowthActionItem,
  ContentStatus,
} from '../../types/growth';

// ============================================================================
// Collection References
// ============================================================================

const COLLECTIONS = {
  keywords: 'growth_keywords',
  content: 'growth_content',
  campaigns: 'growth_campaigns',
  metrics: 'growth_metrics',
  actions: 'growth_actions',
  config: 'growth_config',
} as const;

// ============================================================================
// Keyword Database Operations
// ============================================================================

/**
 * Save a batch of keywords to Firestore.
 * Uses batched writes for efficiency (max 500 per batch).
 */
export async function saveKeywords(keywords: Partial<TrackedKeyword>[]): Promise<number> {
  let saved = 0;
  const batchSize = 450; // Firestore limit is 500

  for (let i = 0; i < keywords.length; i += batchSize) {
    const batch = writeBatch(db);
    const chunk = keywords.slice(i, i + batchSize);

    for (const kw of chunk) {
      if (!kw.id) continue;
      const ref = doc(db, COLLECTIONS.keywords, kw.id);
      batch.set(ref, {
        ...kw,
        createdAt: kw.createdAt || Timestamp.now(),
        updatedAt: Timestamp.now(),
      }, { merge: true });
      saved++;
    }

    await batch.commit();
    logger.info(`[GrowthEngine] Saved keyword batch ${i / batchSize + 1} (${chunk.length} keywords)`);
  }

  return saved;
}

/**
 * Get all keywords for a specific exam.
 */
export async function getKeywordsByExam(courseId: CourseId): Promise<TrackedKeyword[]> {
  const q = query(
    collection(db, COLLECTIONS.keywords),
    where('courseId', '==', courseId),
    orderBy('monthlyVolume', 'desc'),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TrackedKeyword));
}

/**
 * Get content gap keywords (high volume, no assigned page).
 */
export async function getContentGapKeywords(minVolume = 100): Promise<TrackedKeyword[]> {
  const q = query(
    collection(db, COLLECTIONS.keywords),
    where('contentGap', '==', true),
    where('monthlyVolume', '>=', minVolume),
    orderBy('monthlyVolume', 'desc'),
    limit(100),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TrackedKeyword));
}

/**
 * Update keyword rank data (called by rank tracker Cloud Function).
 */
export async function updateKeywordRank(
  keywordId: string,
  rank: number | null,
  _impressions: number,
  _clicks: number,
): Promise<void> {
  const ref = doc(db, COLLECTIONS.keywords, keywordId);
  const existing = await getDoc(ref);

  if (!existing.exists()) return;

  const data = existing.data() as TrackedKeyword;
  const previousRank = data.currentRank;
  const bestRank = data.bestRank !== null && rank !== null
    ? Math.min(data.bestRank, rank)
    : rank;

  await updateDoc(ref, {
    currentRank: rank,
    previousRank,
    bestRank,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Get total keyword count.
 */
export async function getKeywordCount(): Promise<number> {
  const coll = collection(db, COLLECTIONS.keywords);
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
}

// ============================================================================
// Content Brief Operations
// ============================================================================

/**
 * Save a batch of content briefs.
 */
export async function saveContentBriefs(briefs: ContentBrief[]): Promise<number> {
  let saved = 0;
  const batchSize = 450;

  for (let i = 0; i < briefs.length; i += batchSize) {
    const batch = writeBatch(db);
    const chunk = briefs.slice(i, i + batchSize);

    for (const brief of chunk) {
      const ref = doc(db, COLLECTIONS.content, brief.id);
      batch.set(ref, {
        ...brief,
        createdAt: brief.createdAt || Timestamp.now(),
        updatedAt: Timestamp.now(),
      }, { merge: true });
      saved++;
    }

    await batch.commit();
  }

  logger.info(`[GrowthEngine] Saved ${saved} content briefs`);
  return saved;
}

/**
 * Get content briefs by status.
 */
export async function getContentBriefsByStatus(status: ContentStatus): Promise<ContentBrief[]> {
  const q = query(
    collection(db, COLLECTIONS.content),
    where('status', '==', status),
    orderBy('priority', 'asc'),
    limit(50),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContentBrief));
}

/**
 * Get content briefs by exam.
 */
export async function getContentBriefsByExam(courseId: CourseId): Promise<ContentBrief[]> {
  const q = query(
    collection(db, COLLECTIONS.content),
    where('courseId', '==', courseId),
    orderBy('priority', 'asc'),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContentBrief));
}

/**
 * Update a content brief (e.g., change status, add generated content).
 */
export async function updateContentBrief(
  briefId: string,
  updates: Partial<ContentBrief>,
): Promise<void> {
  const ref = doc(db, COLLECTIONS.content, briefId);
  await updateDoc(ref, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

/**
 * Publish an article (updates brief status + creates article record).
 */
export async function publishArticle(
  briefId: string,
  article: Partial<PublishedArticle>,
): Promise<void> {
  const batch = writeBatch(db);

  // Update brief status
  const briefRef = doc(db, COLLECTIONS.content, briefId);
  batch.update(briefRef, {
    status: 'published',
    publishedAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  // Create published article record
  const articleRef = doc(db, COLLECTIONS.content, `published-${briefId}`);
  batch.set(articleRef, {
    ...article,
    briefId,
    publishedAt: Timestamp.now(),
    pageViews: 0,
    avgTimeOnPage: 0,
    bounceRate: 0,
    conversions: 0,
  });

  await batch.commit();
  logger.info(`[GrowthEngine] Published article from brief ${briefId}`);
}

/**
 * Get all published article slugs (for sitemap generation).
 */
export async function getPublishedArticleSlugs(): Promise<string[]> {
  const q = query(
    collection(db, COLLECTIONS.content),
    where('status', '==', 'published'),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(doc => doc.data().slug as string)
    .filter(Boolean);
}

// ============================================================================
// Campaign Operations
// ============================================================================

/**
 * Save campaign data.
 */
export async function saveCampaign(campaign: SEMCampaign): Promise<void> {
  const ref = doc(db, COLLECTIONS.campaigns, campaign.id);
  await setDoc(ref, {
    ...campaign,
    updatedAt: Timestamp.now(),
  }, { merge: true });
}

/**
 * Get all campaigns.
 */
export async function getCampaigns(): Promise<SEMCampaign[]> {
  const q = query(
    collection(db, COLLECTIONS.campaigns),
    orderBy('courseId'),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SEMCampaign));
}

/**
 * Update campaign performance metrics.
 */
export async function updateCampaignMetrics(
  campaignId: string,
  metrics: Partial<SEMCampaign>,
): Promise<void> {
  const ref = doc(db, COLLECTIONS.campaigns, campaignId);
  await updateDoc(ref, {
    ...metrics,
    updatedAt: Timestamp.now(),
  });
}

// ============================================================================
// Growth Metrics (Daily Snapshots)
// ============================================================================

/**
 * Log daily growth metrics for a course.
 */
export async function logDailyMetrics(metrics: DailyGrowthMetrics): Promise<void> {
  const id = `${metrics.courseId}-${metrics.date}`;
  const ref = doc(db, COLLECTIONS.metrics, id);
  await setDoc(ref, metrics, { merge: true });
}

/**
 * Get growth metrics for a date range.
 */
export async function getMetricsRange(
  courseId: CourseId,
  startDate: string,
  endDate: string,
): Promise<DailyGrowthMetrics[]> {
  const q = query(
    collection(db, COLLECTIONS.metrics),
    where('courseId', '==', courseId),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'asc'),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as DailyGrowthMetrics);
}

/**
 * Get the latest metrics for all courses (for the dashboard).
 */
export async function getLatestMetrics(): Promise<DailyGrowthMetrics[]> {
  const today = new Date().toISOString().split('T')[0];
  const q = query(
    collection(db, COLLECTIONS.metrics),
    where('date', '==', today),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as DailyGrowthMetrics);
}

// ============================================================================
// Action Items
// ============================================================================

/**
 * Save action items for the dashboard.
 */
export async function saveActionItems(items: GrowthActionItem[]): Promise<void> {
  const batch = writeBatch(db);

  for (const item of items) {
    const ref = doc(db, COLLECTIONS.actions, item.id);
    batch.set(ref, {
      ...item,
      createdAt: item.createdAt || Timestamp.now(),
    }, { merge: true });
  }

  await batch.commit();
}

/**
 * Get unresolved action items.
 */
export async function getActiveActionItems(): Promise<GrowthActionItem[]> {
  const q = query(
    collection(db, COLLECTIONS.actions),
    where('resolvedAt', '==', null),
    orderBy('createdAt', 'desc'),
    limit(50),
  );

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GrowthActionItem));
  } catch {
    // Fallback without orderBy if index doesn't exist yet
    const q2 = query(
      collection(db, COLLECTIONS.actions),
      limit(50),
    );
    const snapshot = await getDocs(q2);
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as GrowthActionItem))
      .filter(item => !item.resolvedAt);
  }
}

/**
 * Resolve an action item.
 */
export async function resolveActionItem(actionId: string): Promise<void> {
  const ref = doc(db, COLLECTIONS.actions, actionId);
  await updateDoc(ref, {
    resolvedAt: Timestamp.now(),
  });
}

// ============================================================================
// Engine Configuration
// ============================================================================

export interface GrowthEngineConfig {
  // SEO
  rankTrackingEnabled: boolean;
  rankTrackingFrequency: 'daily' | 'weekly';
  siteAuditFrequency: 'daily' | 'weekly';
  autoGenerateSitemap: boolean;

  // SEM
  semEnabled: boolean;
  totalDailyBudget: number;
  autoBidOptimization: boolean;
  bidOptimizationFrequency: 'hourly' | '6hr' | 'daily';
  autoNegativeKeywords: boolean;

  // Per-exam daily budgets
  examBudgets: Record<string, number>;

  // Guard rails
  maxCpaMultiplier: number;
  pauseOnZeroConversions: boolean;
  pauseAfterDays: number;
  emergencyPauseAll: boolean;

  // Content
  autoContentGeneration: boolean;
  contentReviewRequired: boolean;  // require manual approval before publish
  maxArticlesPerWeek: number;
  geminiModel: string;

  // Notifications
  weeklyReportEnabled: boolean;
  alertOnRankDrop: boolean;
  alertOnBudgetOverage: boolean;

  // API Keys (stored in Cloud Functions secrets, referenced here)
  dataForSEOConfigured: boolean;
  googleAdsConfigured: boolean;
  searchConsoleConfigured: boolean;
}

const DEFAULT_CONFIG: GrowthEngineConfig = {
  rankTrackingEnabled: true,
  rankTrackingFrequency: 'daily',
  siteAuditFrequency: 'weekly',
  autoGenerateSitemap: true,
  semEnabled: false,
  totalDailyBudget: 100,
  autoBidOptimization: false,
  bidOptimizationFrequency: 'daily',
  autoNegativeKeywords: false,
  examBudgets: {
    cpa: 30,
    ea: 15,
    cma: 20,
    cia: 10,
    cfp: 10,
    cisa: 15,
  },
  maxCpaMultiplier: 2.0,
  pauseOnZeroConversions: true,
  pauseAfterDays: 7,
  emergencyPauseAll: false,
  autoContentGeneration: true,
  contentReviewRequired: true,
  maxArticlesPerWeek: 10,
  geminiModel: 'gemini-2.0-flash',
  weeklyReportEnabled: true,
  alertOnRankDrop: true,
  alertOnBudgetOverage: true,
  dataForSEOConfigured: false,
  googleAdsConfigured: false,
  searchConsoleConfigured: false,
};

/**
 * Get the Growth Engine configuration.
 */
export async function getGrowthConfig(): Promise<GrowthEngineConfig> {
  try {
    const ref = doc(db, COLLECTIONS.config, 'settings');
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      return { ...DEFAULT_CONFIG, ...snapshot.data() } as GrowthEngineConfig;
    }

    // Initialize with defaults
    await setDoc(ref, DEFAULT_CONFIG);
    return DEFAULT_CONFIG;
  } catch (error) {
    logger.warn('[GrowthEngine] Failed to load config, using defaults:', error);
    return DEFAULT_CONFIG;
  }
}

/**
 * Update Growth Engine configuration.
 */
export async function updateGrowthConfig(
  updates: Partial<GrowthEngineConfig>,
): Promise<void> {
  const ref = doc(db, COLLECTIONS.config, 'settings');
  await setDoc(ref, updates, { merge: true });
  logger.info('[GrowthEngine] Configuration updated');
}
