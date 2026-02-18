/**
 * Growth Engine Types — SEO, SEM, Content Automation
 * 
 * The VoraPrep Growth Engine automates:
 * - Keyword research, tracking, and gap analysis
 * - Content generation and optimization (via Gemini)
 * - Google Ads campaign management and bid optimization
 * - Sitemap, internal linking, and technical SEO
 * 
 * All content publishes under voraprep.com for domain authority consolidation.
 * Syndication to Medium/LinkedIn uses canonical URLs pointing home.
 */

import type { CourseId } from './course';

// ============================================================================
// Keyword Intelligence
// ============================================================================

/** Search intent classification */
export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';

/** Keyword difficulty tier */
export type KeywordDifficulty = 'low' | 'medium' | 'high' | 'very-high';

/** Keyword status in our pipeline */
export type KeywordStatus = 'discovered' | 'researched' | 'targeted' | 'ranking' | 'top3' | 'archived';

/** A tracked keyword */
export interface TrackedKeyword {
  id: string;
  keyword: string;
  courseId: CourseId;
  section?: string;                // e.g., 'FAR', 'SEE1', 'CISA1'
  intent: SearchIntent;
  monthlyVolume: number;
  difficulty: KeywordDifficulty;
  difficultyScore: number;        // 0-100
  currentRank: number | null;     // null = not ranking
  previousRank: number | null;
  bestRank: number | null;
  targetRank: number;             // our goal position
  cpc: number;                    // cost-per-click (market rate)
  assignedPage: string | null;    // URL path of our page targeting this
  contentGap: boolean;            // true = no page targeting this keyword
  status: KeywordStatus;
  tags: string[];                 // e.g., ['competitor', 'long-tail', 'seasonal']
  competitors: CompetitorRanking[];
  createdAt: Date;
  updatedAt: Date;
}

/** A competitor's ranking for a keyword */
export interface CompetitorRanking {
  domain: string;                 // e.g., 'becker.com', 'rogercpareview.com'
  rank: number;
  url: string;
  title: string;
}

/** Daily rank snapshot for historical tracking */
export interface RankSnapshot {
  keywordId: string;
  date: string;                   // 'YYYY-MM-DD'
  rank: number | null;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;               // avg position from GSC
}

/** Keyword research seed — input for bulk keyword generation */
export interface KeywordSeed {
  courseId: CourseId;
  section?: string;
  seedTerms: string[];            // e.g., ['cpa exam', 'cpa review', 'cpa prep']
  modifiers: string[];            // e.g., ['2026', 'free', 'best', 'online']
  intent: SearchIntent;
}

// ============================================================================
// Content Engine
// ============================================================================

/** Content type classification */
export type ContentType =
  | 'study-guide'         // "How to Pass FAR First Try"
  | 'comparison'          // "CPA vs CMA: Which Is Right?"
  | 'topic-explainer'     // "Governmental Accounting Explained"
  | 'pass-rates'          // "CPA Exam Pass Rates 2026"
  | 'study-schedule'      // "3-Month CPA Study Schedule"
  | 'review-comparison'   // "Best CPA Review Courses 2026"
  | 'salary-guide'        // "CPA Salary by State 2026"
  | 'requirements'        // "CPA Requirements in California"
  | 'practice-questions'  // "Free CPA FAR Practice Questions"
  | 'cheat-sheet'         // "Audit Sampling Cheat Sheet"
  | 'exam-tips'           // "10 Tips for CPA Exam Day"
  | 'career-guide'        // "What Can You Do with a CPA?"
  | 'news-update'         // "CPA Exam Changes 2026"
  | 'case-study';         // "How I Passed All 4 CPA Sections"

/** Content status in the pipeline */
export type ContentStatus = 'brief' | 'draft' | 'review' | 'published' | 'archived' | 'updating';

/** Content brief — the plan for an article before generation */
export interface ContentBrief {
  id: string;
  title: string;
  slug: string;                   // URL-safe: 'how-to-pass-far-2026'
  courseId: CourseId;
  section?: string;
  contentType: ContentType;
  targetKeywords: string[];       // primary + secondary keywords
  primaryKeyword: string;
  searchIntent: SearchIntent;
  estimatedVolume: number;        // combined volume of target keywords
  competitorUrls: string[];       // top-ranking URLs to beat
  outline: ContentOutlineSection[];
  wordCountTarget: number;
  internalLinks: string[];        // paths to link to
  ctaType: 'register' | 'free-trial' | 'pricing' | 'course-landing';
  ctaUrl: string;
  status: ContentStatus;
  priority: number;               // 1 = highest
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  generatedContent?: string;      // Gemini-generated markdown
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

/** Section within a content outline */
export interface ContentOutlineSection {
  heading: string;                // H2/H3 text
  level: 2 | 3;
  keyPoints: string[];
  targetKeyword?: string;         // keyword this section targets
  wordCount: number;
}

/** Published article metadata (stored in Firestore) */
export interface PublishedArticle {
  id: string;
  briefId: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  courseId: CourseId;
  section?: string;
  contentType: ContentType;
  primaryKeyword: string;
  targetKeywords: string[];
  content: string;                // full markdown
  wordCount: number;
  internalLinks: string[];
  ctaType: string;
  ctaUrl: string;
  ogImage: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  pageViews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  conversions: number;            // signups from this article
}

// ============================================================================
// Content Templates
// ============================================================================

/** Template for auto-generating content briefs per exam */
export interface ContentTemplate {
  id: string;
  contentType: ContentType;
  titleTemplate: string;          // "How to Pass {section} on the {exam} Exam in {year}"
  slugTemplate: string;           // "how-to-pass-{section}-{year}"
  outlineTemplate: ContentOutlineSection[];
  wordCountTarget: number;
  ctaType: 'register' | 'free-trial' | 'pricing' | 'course-landing';
  applicableCourses: CourseId[] | 'all';
  perSection: boolean;            // true = generate one per section
  seasonal: boolean;              // true = regenerate annually
  priority: number;
}

// ============================================================================
// SEM / Paid Search
// ============================================================================

/** Campaign status */
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'ended';

/** Ad group theme */
export type AdGroupTheme =
  | 'generic'             // "cpa exam prep"
  | 'section-specific'    // "cpa far study guide"
  | 'competitor'          // "becker cpa alternative"
  | 'practice-questions'  // "free cpa practice questions"
  | 'temporal'            // "cpa exam 2026"
  | 'price-sensitive'     // "affordable cpa review"
  | 'career'              // "cpa salary", "become a cpa"
  | 'long-tail';          // "how to pass aud section cpa"

/** SEM Campaign structure */
export interface SEMCampaign {
  id: string;
  courseId: CourseId;
  name: string;
  status: CampaignStatus;
  dailyBudget: number;
  targetCPA: number;              // target cost-per-acquisition
  adGroups: SEMAdGroup[];
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  roas: number;                   // return on ad spend
  startDate: Date;
  lastOptimized: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** Ad group within a campaign */
export interface SEMAdGroup {
  id: string;
  campaignId: string;
  name: string;
  theme: AdGroupTheme;
  status: CampaignStatus;
  keywords: SEMKeyword[];
  negativeKeywords: string[];
  ads: ResponsiveSearchAd[];
  landingPage: string;            // URL path
  maxCpc: number;
  qualityScore: number;           // 1-10
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  avgCpc: number;
  conversionRate: number;
}

/** Keyword in a paid campaign */
export interface SEMKeyword {
  keyword: string;
  matchType: 'broad' | 'phrase' | 'exact';
  maxCpc: number;
  qualityScore: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  avgCpc: number;
  avgPosition: number;
  status: 'active' | 'paused' | 'removed';
}

/** Responsive Search Ad */
export interface ResponsiveSearchAd {
  id: string;
  headlines: string[];            // up to 15 headlines (30 chars each)
  descriptions: string[];         // up to 4 descriptions (90 chars each)
  finalUrl: string;
  displayPath: string[];          // e.g., ['CPA', 'Prep']
  sitelinkExtensions?: SitelinkExtension[];
  status: 'active' | 'paused' | 'removed';
  impressions: number;
  clicks: number;
  conversions: number;
}

/** Sitelink ad extension */
export interface SitelinkExtension {
  text: string;
  description1: string;
  description2: string;
  finalUrl: string;
}

// ============================================================================
// Bid Optimization
// ============================================================================

/** Bid strategy type */
export type BidStrategy = 'manual-cpc' | 'target-cpa' | 'maximize-conversions' | 'target-roas';

/** Bid adjustment rule */
export interface BidAdjustment {
  type: 'device' | 'location' | 'schedule' | 'audience';
  target: string;                 // e.g., 'mobile', 'California', '18:00-22:00'
  modifier: number;               // e.g., 1.2 = +20%, 0.8 = -20%
  reason: string;
}

/** Bid optimization recommendation */
export interface BidRecommendation {
  id: string;
  campaignId: string;
  adGroupId?: string;
  keywordText?: string;
  type: 'increase-bid' | 'decrease-bid' | 'pause' | 'add-negative' | 'budget-shift';
  currentValue: number;
  recommendedValue: number;
  expectedImpact: string;         // "Estimated +15% conversions"
  confidence: number;             // 0-1
  reason: string;
  autoApply: boolean;             // true = engine applies automatically
  appliedAt?: Date;
  createdAt: Date;
}

// ============================================================================
// Performance & Reporting
// ============================================================================

/** Daily performance snapshot per course */
export interface DailyGrowthMetrics {
  date: string;                   // 'YYYY-MM-DD'
  courseId: CourseId;

  // Organic (SEO)
  organicImpressions: number;
  organicClicks: number;
  organicCtr: number;
  avgPosition: number;
  indexedPages: number;
  keywordsInTop3: number;
  keywordsInTop10: number;
  keywordsTracked: number;
  contentGaps: number;
  newPagesPublished: number;

  // Paid (SEM)
  adSpend: number;
  adImpressions: number;
  adClicks: number;
  adCtr: number;
  adConversions: number;
  costPerConversion: number;
  roas: number;

  // Combined
  totalSignups: number;
  organicSignups: number;
  paidSignups: number;
  revenue: number;
}

/** Growth Engine action item — auto-generated recommendation */
export interface GrowthActionItem {
  id: string;
  type: 'seo' | 'sem' | 'content' | 'technical';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  courseId?: CourseId;
  autoResolvable: boolean;
  resolvedAt?: Date;
  createdAt: Date;
}

/** Overall engine status for the dashboard */
export interface GrowthEngineStatus {
  lastRankCheck: Date | null;
  lastBidOptimization: Date | null;
  lastContentGapScan: Date | null;
  lastSiteAudit: Date | null;
  lastAdCopyRefresh: Date | null;
  totalKeywordsTracked: number;
  totalPagesPublished: number;
  totalCampaignsActive: number;
  totalMonthlyAdSpend: number;
  overallROAS: number;
  actionItems: GrowthActionItem[];
}

// ============================================================================
// Competitor Intelligence
// ============================================================================

/** Tracked competitor */
export interface Competitor {
  id: string;
  name: string;                   // 'Becker', 'Roger CPA', 'Gleim', 'Surgent'
  domain: string;                 // 'becker.com'
  courses: CourseId[];            // which exams they offer
  priceRange: string;             // '$2,000-$3,500'
  strengths: string[];
  weaknesses: string[];           // vs VoraPrep
}

/** Competitors we track per exam */
export const EXAM_COMPETITORS: Record<CourseId, Competitor[]> = {
  cpa: [
    { id: 'becker', name: 'Becker', domain: 'becker.com', courses: ['cpa'], priceRange: '$2,399-$3,799', strengths: ['Brand recognition', 'Employer partnerships'], weaknesses: ['10x+ price', 'No AI tutor', 'Outdated tech'] },
    { id: 'roger', name: 'Roger CPA', domain: 'rogercpareview.com', courses: ['cpa'], priceRange: '$1,299-$2,499', strengths: ['Engaging lectures'], weaknesses: ['Higher price', 'No adaptive AI'] },
    { id: 'surgent', name: 'Surgent', domain: 'surgent.com', courses: ['cpa', 'cma', 'ea'], priceRange: '$799-$1,999', strengths: ['Adaptive tech'], weaknesses: ['Higher price', 'Less AI'] },
    { id: 'wiley', name: 'Wiley', domain: 'efficientlearning.com', courses: ['cpa', 'cma'], priceRange: '$1,600-$3,000', strengths: ['Large question bank'], weaknesses: ['Expensive', 'Clunky UI'] },
    { id: 'uworld', name: 'UWorld', domain: 'uworld.com', courses: ['cpa'], priceRange: '$449-$949', strengths: ['Clean UI', 'Good explanations'], weaknesses: ['Higher price', 'No AI tutor'] },
  ],
  ea: [
    { id: 'gleim', name: 'Gleim', domain: 'gleim.com', courses: ['cpa', 'ea', 'cma', 'cia'], priceRange: '$479-$629', strengths: ['Comprehensive'], weaknesses: ['Higher price', 'Dated UI'] },
    { id: 'surgent', name: 'Surgent', domain: 'surgent.com', courses: ['cpa', 'cma', 'ea'], priceRange: '$399-$799', strengths: ['Adaptive tech'], weaknesses: ['Higher price'] },
    { id: 'fast-forward', name: 'Fast Forward Academy', domain: 'fastforwardacademy.com', courses: ['ea'], priceRange: '$399-$699', strengths: ['EA-focused'], weaknesses: ['Limited AI'] },
  ],
  cma: [
    { id: 'wiley', name: 'Wiley', domain: 'efficientlearning.com', courses: ['cpa', 'cma'], priceRange: '$1,200-$2,400', strengths: ['Market leader for CMA'], weaknesses: ['Expensive'] },
    { id: 'gleim', name: 'Gleim', domain: 'gleim.com', courses: ['cpa', 'ea', 'cma', 'cia'], priceRange: '$999-$1,599', strengths: ['Comprehensive'], weaknesses: ['Higher price'] },
    { id: 'hock', name: 'Hock International', domain: 'hockinternational.com', courses: ['cma', 'cia'], priceRange: '$499-$999', strengths: ['International focus'], weaknesses: ['Smaller brand'] },
  ],
  cia: [
    { id: 'gleim', name: 'Gleim', domain: 'gleim.com', courses: ['cpa', 'ea', 'cma', 'cia'], priceRange: '$749-$1,299', strengths: ['Market leader for CIA'], weaknesses: ['Expensive'] },
    { id: 'iia', name: 'IIA Learning', domain: 'theiia.org', courses: ['cia'], priceRange: '$695-$1,095', strengths: ['Official provider'], weaknesses: ['Limited adaptive learning'] },
  ],
  cfp: [
    { id: 'dalton', name: 'Dalton Education', domain: 'dalton-education.com', courses: ['cfp'], priceRange: '$1,595-$2,495', strengths: ['Well-known'], weaknesses: ['Very expensive'] },
    { id: 'kaplan', name: 'Kaplan', domain: 'kaplanfinancial.com', courses: ['cfp'], priceRange: '$1,299-$1,749', strengths: ['Brand recognition'], weaknesses: ['Higher price'] },
    { id: 'zahn', name: 'Zahn Associates', domain: 'zahnassociates.com', courses: ['cfp'], priceRange: '$395-$1,095', strengths: ['Review-focused'], weaknesses: ['Less tech'] },
  ],
  cisa: [
    { id: 'isaca', name: 'ISACA Learning', domain: 'isaca.org', courses: ['cisa'], priceRange: '$399-$799', strengths: ['Official provider'], weaknesses: ['Basic platform'] },
    { id: 'simplilearn', name: 'Simplilearn', domain: 'simplilearn.com', courses: ['cisa'], priceRange: '$399-$599', strengths: ['Live classes'], weaknesses: ['Not exam-focused AI'] },
  ],
};
