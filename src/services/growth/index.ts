/**
 * Growth Engine — Central orchestrator
 * 
 * Exports all sub-engines and provides the unified interface
 * for the admin dashboard and Cloud Functions.
 * 
 * Architecture:
 *   growth/
 *   ├── index.ts           ← You are here (orchestrator)
 *   ├── contentEngine.ts   ← Content brief/article generation
 *   ├── keywordEngine.ts   ← Keyword research & tracking
 *   ├── seoEngine.ts       ← Technical SEO automation
 *   └── semEngine.ts       ← Paid search campaign management
 * 
 * All content publishes under voraprep.com for domain authority.
 * Syndication uses canonical URLs pointing to voraprep.com.
 */

// Content Engine
export {
  CONTENT_TEMPLATES,
  EXAM_CONTENT_META,
  generateBriefsForExam,
  generateFullContentMatrix,
  generateStateCPABriefs,
  getContentPipelineSummary,
  buildContentGenerationPrompt,
  buildMetaOptimizationPrompt,
  US_STATES,
} from './contentEngine';

export type {
  ExamContentMeta,
  ExamSectionMeta,
} from './contentEngine';

// Keyword Engine
export {
  expandKeywordSeed,
  generateFullKeywordDatabase,
  getKeywordDatabaseSummary,
  identifyContentGaps,
  matchKeywordsToPages,
  scoreKeywordPriority,
} from './keywordEngine';

// SEO Engine
export {
  generateSitemapXML,
  generateRobotsTxt,
  buildLinkGraph,
  suggestInternalLinks,
  auditPage,
  generateActionItems,
  validateStructuredData,
  measureCoreWebVitals,
} from './seoEngine';

export type {
  SitemapEntry,
  PageNode,
  SEOAuditResult,
  SEOAuditIssue,
} from './seoEngine';

// SEM Engine
export {
  generateCampaignForExam,
  generateAllCampaigns,
  generateBidRecommendations,
  generateBidAdjustments,
  optimizeBudgetAllocation,
  mineNegativeKeywords,
  buildAdCopyPrompt,
  getCampaignSummary,
} from './semEngine';

// Types (re-export growth types)
export type {
  TrackedKeyword,
  KeywordSeed,
  ContentBrief,
  ContentTemplate,
  ContentType,
  ContentStatus,
  PublishedArticle,
  SEMCampaign,
  SEMAdGroup,
  SEMKeyword,
  ResponsiveSearchAd,
  BidRecommendation,
  BidAdjustment,
  DailyGrowthMetrics,
  GrowthActionItem,
  GrowthEngineStatus,
  Competitor,
  SearchIntent,
} from '../../types/growth';

// ============================================================================
// Growth Engine Status (for Dashboard)
// ============================================================================

import { getContentPipelineSummary } from './contentEngine';
import { getKeywordDatabaseSummary } from './keywordEngine';
import { getCampaignSummary, generateAllCampaigns } from './semEngine';
import type { GrowthEngineStatus } from '../../types/growth';

/**
 * Get the overall Growth Engine status for the admin dashboard.
 * This is the primary data source for the Growth Dashboard component.
 */
export function getGrowthEngineStatus(examBudgets?: Record<string, number>): GrowthEngineStatus & {
  content: ReturnType<typeof getContentPipelineSummary>;
  keywords: ReturnType<typeof getKeywordDatabaseSummary>;
  campaigns: ReturnType<typeof getCampaignSummary>;
} {
  const content = getContentPipelineSummary();
  const keywords = getKeywordDatabaseSummary();
  const campaigns = getCampaignSummary(generateAllCampaigns(examBudgets));

  return {
    // Engine status timestamps (null until first run)
    lastRankCheck: null,
    lastBidOptimization: null,
    lastContentGapScan: null,
    lastSiteAudit: null,
    lastAdCopyRefresh: null,

    // Summary counts
    totalKeywordsTracked: keywords.totalKeywords,
    totalPagesPublished: 0,  // from Firestore when connected
    totalCampaignsActive: campaigns.activeCampaigns,
    totalMonthlyAdSpend: campaigns.estimatedMonthlySpend,
    overallROAS: 0,
    actionItems: [],

    // Sub-engine summaries
    content,
    keywords,
    campaigns,
  };
}
