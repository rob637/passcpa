/**
 * SEM Campaign Engine — Automated Google Ads management
 * 
 * Generates, manages, and optimizes paid search campaigns for all exams.
 * 
 * Features:
 * - Auto-generate campaign structures per exam (ad groups, keywords, ads)
 * - Bid optimization engine (adjusts based on ROAS, CPA, time-of-day)
 * - Ad copy generation via Gemini
 * - Budget allocation across exams based on performance
 * - Negative keyword mining from search term reports
 * - A/B test management for ad variants
 * 
 * Integrates with Google Ads API via Cloud Functions.
 */

import type { CourseId } from '../../types/course';
import type {
  SEMCampaign,
  SEMAdGroup,
  ResponsiveSearchAd,
  SitelinkExtension,
  BidRecommendation,
  BidAdjustment,
  AdGroupTheme,
} from '../../types/growth';
import { EXAM_CONTENT_META } from './contentEngine';
import { EXAM_COMPETITORS } from '../../types/growth';

// ============================================================================
// Campaign Structure Generator
// ============================================================================

/**
 * Generate a complete Google Ads campaign structure for an exam.
 * Creates: campaign → ad groups → keywords → ads
 */
export function generateCampaignForExam(courseId: CourseId, budgetOverride?: number): SEMCampaign {
  const meta = EXAM_CONTENT_META[courseId];
  const competitors = EXAM_COMPETITORS[courseId] || [];

  const adGroups: SEMAdGroup[] = [
    // Generic exam prep
    generateAdGroup({
      campaignId: `campaign-${courseId}`,
      name: `${meta.exam} - Generic`,
      theme: 'generic',
      courseId,
      keywords: [
        { kw: `${meta.exam.toLowerCase()} exam prep`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} review course`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} study material`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} prep course`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} online course`, match: 'broad' },
        { kw: `${meta.exam.toLowerCase()} certification prep`, match: 'phrase' },
        { kw: `pass ${meta.exam.toLowerCase()} exam`, match: 'phrase' },
        { kw: `${meta.examFull.toLowerCase()} prep`, match: 'broad' },
      ],
      landingPage: `/${meta.course}`,
      maxCpc: getDefaultCPC(courseId, 'generic'),
    }),

    // Per-section ad groups
    ...meta.sections.map(section =>
      generateAdGroup({
        campaignId: `campaign-${courseId}`,
        name: `${meta.exam} - ${section.id}`,
        theme: 'section-specific',
        courseId,
        keywords: [
          { kw: `${meta.exam.toLowerCase()} ${section.id.toLowerCase()} study guide`, match: 'phrase' },
          { kw: `${meta.exam.toLowerCase()} ${section.id.toLowerCase()} practice questions`, match: 'phrase' },
          { kw: `${meta.exam.toLowerCase()} ${section.id.toLowerCase()} prep`, match: 'phrase' },
          { kw: `how to pass ${meta.exam.toLowerCase()} ${section.id.toLowerCase()}`, match: 'phrase' },
          { kw: `${section.name.toLowerCase()} exam prep`, match: 'broad' },
        ],
        landingPage: `/${meta.course}`,
        maxCpc: getDefaultCPC(courseId, 'section-specific'),
      })
    ),

    // Competitor comparison
    ...competitors.slice(0, 3).map(comp =>
      generateAdGroup({
        campaignId: `campaign-${courseId}`,
        name: `${meta.exam} - vs ${comp.name}`,
        theme: 'competitor',
        courseId,
        keywords: [
          { kw: `${comp.name.toLowerCase()} ${meta.exam.toLowerCase()} alternative`, match: 'phrase' },
          { kw: `${comp.name.toLowerCase()} ${meta.exam.toLowerCase()} review`, match: 'phrase' },
          { kw: `cheaper than ${comp.name.toLowerCase()}`, match: 'broad' },
          { kw: `${comp.name.toLowerCase()} vs voraprep`, match: 'exact' },
          { kw: `${meta.exam.toLowerCase()} review cheaper than ${comp.name.toLowerCase()}`, match: 'broad' },
        ],
        landingPage: '/compare',
        maxCpc: getDefaultCPC(courseId, 'competitor'),
      })
    ),

    // Practice questions (high intent)
    generateAdGroup({
      campaignId: `campaign-${courseId}`,
      name: `${meta.exam} - Practice Questions`,
      theme: 'practice-questions',
      courseId,
      keywords: [
        { kw: `free ${meta.exam.toLowerCase()} practice questions`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} practice exam`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} mcq practice`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} sample questions`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} test bank`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} question bank`, match: 'broad' },
      ],
      landingPage: `/${meta.course}`,
      maxCpc: getDefaultCPC(courseId, 'practice-questions'),
    }),

    // Price-sensitive
    generateAdGroup({
      campaignId: `campaign-${courseId}`,
      name: `${meta.exam} - Affordable`,
      theme: 'price-sensitive',
      courseId,
      keywords: [
        { kw: `cheap ${meta.exam.toLowerCase()} review`, match: 'phrase' },
        { kw: `affordable ${meta.exam.toLowerCase()} prep`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} review cost`, match: 'phrase' },
        { kw: `budget ${meta.exam.toLowerCase()} course`, match: 'broad' },
        { kw: `low cost ${meta.exam.toLowerCase()} study material`, match: 'broad' },
      ],
      landingPage: `/${meta.course}`,
      maxCpc: getDefaultCPC(courseId, 'price-sensitive'),
    }),

    // Temporal (current year)
    generateAdGroup({
      campaignId: `campaign-${courseId}`,
      name: `${meta.exam} - 2026`,
      theme: 'temporal',
      courseId,
      keywords: [
        { kw: `${meta.exam.toLowerCase()} exam 2026`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} prep 2026`, match: 'phrase' },
        { kw: `${meta.exam.toLowerCase()} changes 2026`, match: 'phrase' },
        { kw: `new ${meta.exam.toLowerCase()} exam`, match: 'broad' },
        { kw: `${meta.exam.toLowerCase()} exam updates`, match: 'broad' },
      ],
      landingPage: `/${meta.course}`,
      maxCpc: getDefaultCPC(courseId, 'temporal'),
    }),
  ];

  return {
    id: `campaign-${courseId}`,
    courseId,
    name: `${meta.exam} Exam Prep`,
    status: 'draft',
    dailyBudget: budgetOverride ?? getDefaultDailyBudget(courseId),
    targetCPA: getTargetCPA(courseId),
    adGroups,
    totalSpend: 0,
    totalImpressions: 0,
    totalClicks: 0,
    totalConversions: 0,
    roas: 0,
    startDate: new Date(),
    lastOptimized: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Generate all campaigns for all exams.
 * If examBudgets is provided, only generates campaigns for exams with budget > 0
 * and uses those budgets instead of defaults.
 */
export function generateAllCampaigns(examBudgets?: Record<string, number>): SEMCampaign[] {
  const allCourses: CourseId[] = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];

  if (examBudgets) {
    // Only generate campaigns for exams with budget > 0
    const activeCourses = allCourses.filter(c => (examBudgets[c] ?? 0) > 0);
    return activeCourses.map(c => generateCampaignForExam(c, examBudgets[c]));
  }

  return allCourses.map(c => generateCampaignForExam(c));
}

// ============================================================================
// Ad Group Generator
// ============================================================================

interface AdGroupInput {
  campaignId: string;
  name: string;
  theme: AdGroupTheme;
  courseId: CourseId;
  keywords: { kw: string; match: 'broad' | 'phrase' | 'exact' }[];
  landingPage: string;
  maxCpc: number;
}

function generateAdGroup(input: AdGroupInput): SEMAdGroup {
  void EXAM_CONTENT_META[input.courseId];

  return {
    id: `ag-${input.courseId}-${input.theme}-${Date.now()}`,
    campaignId: input.campaignId,
    name: input.name,
    theme: input.theme,
    status: 'draft',
    keywords: input.keywords.map(k => ({
      keyword: k.kw,
      matchType: k.match,
      maxCpc: input.maxCpc,
      qualityScore: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      avgCpc: 0,
      avgPosition: 0,
      status: 'active' as const,
    })),
    negativeKeywords: getDefaultNegativeKeywords(input.theme),
    ads: generateAdsForGroup(input.courseId, input.theme, `https://voraprep.com${input.landingPage}`),
    landingPage: input.landingPage,
    maxCpc: input.maxCpc,
    qualityScore: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    avgCpc: 0,
    conversionRate: 0,
  };
}

// ============================================================================
// Ad Copy Generator
// ============================================================================

/**
 * Generate Responsive Search Ads for an ad group.
 * Creates 2-3 RSAs with varied messaging angles.
 */
function generateAdsForGroup(
  courseId: CourseId,
  theme: AdGroupTheme,
  finalUrl: string,
): ResponsiveSearchAd[] {
  const meta = EXAM_CONTENT_META[courseId];
  const headlines = generateHeadlines(meta, theme);
  const descriptions = generateDescriptions(meta, theme);

  // Create 2 RSA variants
  return [
    {
      id: `ad-${courseId}-${theme}-1`,
      headlines: headlines.slice(0, 15),
      descriptions: descriptions.slice(0, 4),
      finalUrl,
      displayPath: [meta.exam, 'Prep'],
      sitelinkExtensions: generateSitelinks(courseId),
      status: 'active',
      impressions: 0,
      clicks: 0,
      conversions: 0,
    },
    {
      id: `ad-${courseId}-${theme}-2`,
      headlines: [...headlines.slice(5, 15), ...headlines.slice(0, 5)],
      descriptions: [...descriptions.slice(2, 4), ...descriptions.slice(0, 2)],
      finalUrl,
      displayPath: [meta.exam, 'Review'],
      sitelinkExtensions: generateSitelinks(courseId),
      status: 'active',
      impressions: 0,
      clicks: 0,
      conversions: 0,
    },
  ];
}

/**
 * Generate RSA headlines (max 30 chars each, up to 15 per ad).
 */
function generateHeadlines(meta: typeof EXAM_CONTENT_META[CourseId], theme: AdGroupTheme): string[] {
  const base = [
    `${meta.exam} Exam Prep - VoraPrep`,        // 24 chars max
    `Pass the ${meta.exam} Exam`,                 // 19 chars
    `AI-Powered ${meta.exam} Prep`,               // 21 chars
    `${meta.questionCount} Practice Questions`,    // varies
    `Start Free Today`,                           // 16 chars
    `Only ${meta.price}/Month`,                   // varies
    `${meta.exam} Review Course 2026`,            // varies
    `Adaptive ${meta.exam} Learning`,             // varies
    `AI Tutor Included`,                          // 18 chars
    `Score Predictor Built In`,                   // 24 chars
  ];

  const themeSpecific: Record<AdGroupTheme, string[]> = {
    generic: [
      `#1 ${meta.exam} Prep Platform`,
      `Join 1000s of ${meta.exam}s`,
      `${meta.exam} Prep That Works`,
      `Get to 75+ on ${meta.exam}`,
      `Smart ${meta.exam} Study Plan`,
    ],
    'section-specific': [
      `Master Every Section`,
      `All ${meta.exam} Sections`,
      `Section-by-Section Prep`,
      `Focused ${meta.exam} Practice`,
      `Blueprint-Aligned Content`,
    ],
    competitor: [
      `Save 90% vs Becker`,
      `Becker Alternative`,
      `Better & Affordable`,
      `Switch & Save Today`,
      `Why Pay $2,000+?`,
    ],
    'practice-questions': [
      `Free Practice Questions`,
      `Unlimited MCQ Practice`,
      `${meta.exam} Test Bank`,
      `Try 50 Questions Free`,
      `Detailed Explanations`,
    ],
    'price-sensitive': [
      `${meta.exam} Prep from ${meta.price}/mo`,
      `Most Affordable ${meta.exam}`,
      `Save 90% on ${meta.exam} Prep`,
      `Quality Without the Price`,
      `${meta.annualPrice}/Year - Full Access`,
    ],
    temporal: [
      `Updated for 2026`,
      `2026 ${meta.exam} Blueprint`,
      `New Exam Format Ready`,
      `Latest ${meta.exam} Content`,
      `2026 Exam Changes`,
    ],
    career: [
      `Boost Your Career`,
      `Earn More as a ${meta.exam}`,
      `${meta.exam} Career Path`,
      `Invest in Your Future`,
      `Join the ${meta.exam} Elite`,
    ],
    'long-tail': [
      `Personalized ${meta.exam} Prep`,
      `Study Your Way`,
      `Flexible ${meta.exam} Review`,
      `Learn at Your Pace`,
      `Mobile ${meta.exam} Study`,
    ],
  };

  return [...base, ...(themeSpecific[theme] || [])].filter(h => h.length <= 30);
}

/**
 * Generate RSA descriptions (max 90 chars each, up to 4 per ad).
 * NOTE: All descriptions MUST be <=90 chars after variable substitution.
 */
function generateDescriptions(meta: typeof EXAM_CONTENT_META[CourseId], theme: AdGroupTheme): string[] {
  // Keep descriptions SHORT - max 90 chars after substitution
  const base = [
    `AI-powered ${meta.exam} prep with ${meta.questionCount} questions. Adaptive learning. Start free!`, // ~75 chars
    `Pass the ${meta.exam} exam with VoraPrep. Smart practice & AI tutor. ${meta.price}/mo.`, // ~70 chars
    `${meta.exam} prep starting at ${meta.price}/mo. Join thousands studying smarter. Free trial!`, // ~75 chars
    `${meta.exam} review with AI that adapts to you. ${meta.questionCount} questions. Try free today.`, // ~75 chars
  ];

  const themeSpecific: Record<string, string[]> = {
    competitor: [
      `Why pay $2,000+ for ${meta.exam} prep? VoraPrep: AI-powered review from ${meta.price}/mo.`, // ~75 chars
      `Switch from expensive ${meta.exam} courses. Same quality, 90% less. Try free!`, // ~70 chars
    ],
    'practice-questions': [
      `Free ${meta.exam} practice questions with detailed explanations. Track progress.`, // ~70 chars
      `${meta.questionCount} ${meta.exam} questions. Adaptive difficulty & real exam simulation.`, // ~75 chars
    ],
    'price-sensitive': [
      `${meta.exam} prep from ${meta.price}/mo or ${meta.annualPrice}/yr. Full access, no limits.`, // ~70 chars
      `Affordable ${meta.exam} review with AI tutor & adaptive engine. Try free today.`, // ~70 chars
    ],
  };

  return [...base, ...(themeSpecific[theme] || [])].filter(d => d.length <= 90);
}

/**
 * Generate sitelink extensions for the ads.
 */
function generateSitelinks(courseId: CourseId): SitelinkExtension[] {
  const meta = EXAM_CONTENT_META[courseId];

  return [
    {
      text: 'Free Practice Questions',
      description1: `Try ${meta.exam} questions free`,
      description2: 'With detailed explanations',
      finalUrl: `https://voraprep.com/${meta.course}`,
    },
    {
      text: 'See Pricing',
      description1: `Starting at ${meta.price}/month`,
      description2: 'Or save with annual plan',
      finalUrl: `https://voraprep.com/${meta.course}#pricing`,
    },
    {
      text: 'AI Tutor Demo',
      description1: 'Meet Vory, your AI tutor',
      description2: 'Get instant explanations',
      finalUrl: `https://voraprep.com/${meta.course}`,
    },
    {
      text: 'Compare Courses',
      description1: `Compare ${meta.exam} prep courses`,
      description2: 'Side-by-side feature comparison',
      finalUrl: 'https://voraprep.com/compare',
    },
  ];
}

// ============================================================================
// Bid Optimization Engine
// ============================================================================

/**
 * Analyze campaign performance and generate bid recommendations.
 * Call this daily via Cloud Function.
 */
export function generateBidRecommendations(campaign: SEMCampaign): BidRecommendation[] {
  const recommendations: BidRecommendation[] = [];
  let recId = 0;

  for (const adGroup of campaign.adGroups) {
    // Skip draft/paused groups
    if (adGroup.status !== 'active') continue;

    for (const keyword of adGroup.keywords) {
      if (keyword.status !== 'active') continue;

      // Rule 1: High CPA — decrease bid
      if (keyword.conversions > 0) {
        const keywordCPA = (keyword.avgCpc * keyword.clicks) / keyword.conversions;
        if (keywordCPA > campaign.targetCPA * 1.5) {
          recommendations.push({
            id: `rec-${++recId}`,
            campaignId: campaign.id,
            adGroupId: adGroup.id,
            keywordText: keyword.keyword,
            type: 'decrease-bid',
            currentValue: keyword.maxCpc,
            recommendedValue: keyword.maxCpc * 0.8,
            expectedImpact: `Reduce CPA from $${keywordCPA.toFixed(2)} toward target $${campaign.targetCPA}`,
            confidence: 0.8,
            reason: `CPA ($${keywordCPA.toFixed(2)}) is ${((keywordCPA / campaign.targetCPA - 1) * 100).toFixed(0)}% above target`,
            autoApply: keywordCPA > campaign.targetCPA * 2, // auto-apply if way over
            createdAt: new Date(),
          });
        }
      }

      // Rule 2: High CTR + good conversion rate — increase bid for more volume
      if (keyword.ctr > 0.05 && keyword.clicks > 20) {
        const convRate = keyword.clicks > 0 ? keyword.conversions / keyword.clicks : 0;
        if (convRate > 0.03) {
          recommendations.push({
            id: `rec-${++recId}`,
            campaignId: campaign.id,
            adGroupId: adGroup.id,
            keywordText: keyword.keyword,
            type: 'increase-bid',
            currentValue: keyword.maxCpc,
            recommendedValue: keyword.maxCpc * 1.15,
            expectedImpact: `Estimated +15% impressions with ${(convRate * 100).toFixed(1)}% conversion rate`,
            confidence: 0.7,
            reason: `Strong performer: ${(keyword.ctr * 100).toFixed(1)}% CTR, ${(convRate * 100).toFixed(1)}% conversion`,
            autoApply: false,
            createdAt: new Date(),
          });
        }
      }

      // Rule 3: Zero conversions after significant spend — pause
      if (keyword.conversions === 0 && keyword.clicks > 50) {
        recommendations.push({
          id: `rec-${++recId}`,
          campaignId: campaign.id,
          adGroupId: adGroup.id,
          keywordText: keyword.keyword,
          type: 'pause',
          currentValue: keyword.maxCpc,
          recommendedValue: 0,
          expectedImpact: `Save $${(keyword.avgCpc * keyword.clicks).toFixed(2)} with no conversion loss`,
          confidence: 0.85,
          reason: `0 conversions after ${keyword.clicks} clicks ($${(keyword.avgCpc * keyword.clicks).toFixed(2)} spent)`,
          autoApply: keyword.clicks > 100, // auto-pause after 100 clicks with 0 conversions
          createdAt: new Date(),
        });
      }

      // Rule 4: Low quality score — flag for optimization
      if (keyword.qualityScore > 0 && keyword.qualityScore < 5) {
        recommendations.push({
          id: `rec-${++recId}`,
          campaignId: campaign.id,
          adGroupId: adGroup.id,
          keywordText: keyword.keyword,
          type: 'decrease-bid',
          currentValue: keyword.maxCpc,
          recommendedValue: keyword.maxCpc * 0.9,
          expectedImpact: 'Improve ROI while working on landing page relevance',
          confidence: 0.6,
          reason: `Low quality score (${keyword.qualityScore}/10) — review ad relevance and landing page`,
          autoApply: false,
          createdAt: new Date(),
        });
      }
    }

    // Ad-level recommendations
    for (const ad of adGroup.ads) {
      if (ad.impressions > 1000 && ad.clicks === 0) {
        recommendations.push({
          id: `rec-${++recId}`,
          campaignId: campaign.id,
          adGroupId: adGroup.id,
          type: 'pause',
          currentValue: 0,
          recommendedValue: 0,
          expectedImpact: 'Remove under-performing ad variant',
          confidence: 0.9,
          reason: `Ad "${ad.headlines[0]}" has 0 clicks after ${ad.impressions} impressions`,
          autoApply: true,
          createdAt: new Date(),
        });
      }
    }
  }

  return recommendations;
}

/**
 * Generate bid adjustments for device, location, schedule.
 */
export function generateBidAdjustments(courseId: CourseId): BidAdjustment[] {
  const adjustments: BidAdjustment[] = [];

  // Device adjustments
  adjustments.push(
    { type: 'device', target: 'mobile', modifier: 0.9, reason: 'Mobile typically has lower conversion rate for course purchases' },
    { type: 'device', target: 'desktop', modifier: 1.1, reason: 'Desktop users more likely to sign up and study' },
    { type: 'device', target: 'tablet', modifier: 1.0, reason: 'Neutral tablet performance' },
  );

  // Schedule adjustments (study hours)
  adjustments.push(
    { type: 'schedule', target: '06:00-09:00', modifier: 1.15, reason: 'Morning study window — high intent' },
    { type: 'schedule', target: '09:00-17:00', modifier: 0.85, reason: 'Work hours — lower conversion rate' },
    { type: 'schedule', target: '17:00-22:00', modifier: 1.25, reason: 'Evening study window — highest intent' },
    { type: 'schedule', target: '22:00-06:00', modifier: 0.7, reason: 'Late night — low volume, low conversion' },
  );

  // Weekend boost
  adjustments.push(
    { type: 'schedule', target: 'Saturday', modifier: 1.2, reason: 'Weekend study — higher engagement' },
    { type: 'schedule', target: 'Sunday', modifier: 1.15, reason: 'Sunday study sessions' },
  );

  // Location adjustments — higher bids in states with more candidates
  const highDemandStates = ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia'];
  for (const state of highDemandStates) {
    adjustments.push(
      { type: 'location', target: state, modifier: 1.15, reason: `High ${EXAM_CONTENT_META[courseId].exam} candidate density` },
    );
  }

  return adjustments;
}

/**
 * Optimize budget allocation across campaigns based on ROAS.
 * Shifts budget from underperforming campaigns to outperformers.
 */
export function optimizeBudgetAllocation(
  campaigns: SEMCampaign[],
  totalDailyBudget: number,
): { campaignId: string; courseId: CourseId; currentBudget: number; recommendedBudget: number; reason: string }[] {
  const activeCampaigns = campaigns.filter(c => c.status === 'active' && c.totalConversions > 0);

  if (activeCampaigns.length === 0) {
    // Equal distribution for new campaigns
    const equalBudget = totalDailyBudget / campaigns.length;
    return campaigns.map(c => ({
      campaignId: c.id,
      courseId: c.courseId,
      currentBudget: c.dailyBudget,
      recommendedBudget: equalBudget,
      reason: 'Equal distribution — insufficient data for optimization',
    }));
  }

  // Weight by ROAS — higher ROAS = more budget
  const totalROAS = activeCampaigns.reduce((sum, c) => sum + Math.max(c.roas, 0.1), 0);

  return activeCampaigns.map(c => {
    const weight = Math.max(c.roas, 0.1) / totalROAS;
    const recommended = totalDailyBudget * weight;

    return {
      campaignId: c.id,
      courseId: c.courseId,
      currentBudget: c.dailyBudget,
      recommendedBudget: Math.round(recommended * 100) / 100,
      reason: `ROAS: ${c.roas.toFixed(1)}x (weight: ${(weight * 100).toFixed(0)}% of budget)`,
    };
  });
}

// ============================================================================
// Negative Keyword Mining
// ============================================================================

/** Default negative keywords by ad group theme */
function getDefaultNegativeKeywords(theme: AdGroupTheme): string[] {
  const universal = [
    'reddit', 'forum', 'quora', 'youtube', 'video',
    'jobs', 'hiring', 'salary', // unless career theme
    'pdf', 'torrent', 'pirate', 'crack', 'hack',
    'login', 'sign in', 'forgot password',
    'complaints', 'scam', 'refund',
  ];

  const themeSpecific: Record<string, string[]> = {
    competitor: [],
    'price-sensitive': ['free', 'scholarship', 'financial aid'],
    generic: [],
    'section-specific': [],
    'practice-questions': [],
    temporal: [],
    career: [],
    'long-tail': [],
  };

  // Don't exclude salary/career for career-themed ad groups
  if (theme === 'career') {
    return [...universal.filter(kw => !['salary', 'jobs', 'hiring'].includes(kw)), ...(themeSpecific[theme] || [])];
  }

  return [...universal, ...(themeSpecific[theme] || [])];
}

/**
 * Analyze search terms and suggest new negative keywords.
 * Takes actual search term report data from Google Ads.
 */
export function mineNegativeKeywords(
  searchTerms: { term: string; impressions: number; clicks: number; conversions: number; cost: number }[],
  _campaigns: SEMCampaign[],
): { term: string; reason: string; confidence: number }[] {
  const suggestions: { term: string; reason: string; confidence: number }[] = [];

  for (const st of searchTerms) {
    // High spend, zero conversions
    if (st.conversions === 0 && st.cost > 10) {
      suggestions.push({
        term: st.term,
        reason: `$${st.cost.toFixed(2)} spent, 0 conversions`,
        confidence: st.cost > 50 ? 0.95 : 0.7,
      });
    }

    // Very low CTR — irrelevant search
    if (st.impressions > 100 && st.clicks === 0) {
      suggestions.push({
        term: st.term,
        reason: `0 clicks after ${st.impressions} impressions (0% CTR)`,
        confidence: 0.8,
      });
    }

    // Informational intent leaking into transactional campaigns
    const infoSignals = ['what is', 'how does', 'definition', 'meaning', 'wikipedia'];
    if (infoSignals.some(sig => st.term.toLowerCase().includes(sig)) && st.conversions === 0) {
      suggestions.push({
        term: st.term,
        reason: 'Informational intent — unlikely to convert',
        confidence: 0.75,
      });
    }
  }

  return suggestions;
}

// ============================================================================
// Ad Copy Generation Prompts (for Gemini)
// ============================================================================

/**
 * Build a Gemini prompt to generate new RSA headlines and descriptions.
 */
export function buildAdCopyPrompt(courseId: CourseId, theme: AdGroupTheme): string {
  const meta = EXAM_CONTENT_META[courseId];

  return `Generate Google Ads Responsive Search Ad copy for a ${meta.exam} exam prep course.

PRODUCT: VoraPrep — AI-powered ${meta.exam} exam prep
PRICE: ${meta.price}/month or ${meta.annualPrice}/year
FEATURES: ${meta.questionCount} practice questions, AI tutor, adaptive learning, score predictor
AD THEME: ${theme}
LANDING PAGE: voraprep.com/${meta.course}

Generate exactly:
- 15 headlines (max 30 characters each)
- 4 descriptions (max 90 characters each)

Requirements:
- Include the keyword "${meta.exam}" in at least 10 headlines
- Include price in at least 2 headlines
- Include a CTA in at least 3 headlines
- At least 2 headlines should be unique value propositions
- Descriptions should be compelling and action-oriented
- Use title case for headlines
- Include specific numbers (question count, price, savings %)

Theme-specific guidance for "${theme}":
${theme === 'competitor' ? '- Emphasize price savings (90%+ cheaper than Becker/competitors)\n- Don\'t name competitors directly in ads\n- Focus on "Switch and Save" messaging' : ''}
${theme === 'practice-questions' ? '- Lead with "Free" where possible\n- Emphasize question quantity and quality\n- Mention detailed explanations' : ''}
${theme === 'price-sensitive' ? '- Lead with price ($19/mo)\n- Compare to competitor pricing\n- Emphasize value for money' : ''}

Return as JSON:
{
  "headlines": ["...", "..."],
  "descriptions": ["...", "..."]
}`;
}

// ============================================================================
// Defaults & Config
// ============================================================================

/** Default CPC by exam and ad group theme.
 * 
 * Strategy: Start LOW and let Google Smart Bidding optimize up.
 * VoraPrep is $19/mo competing against $3,000 Becker — we can't afford
 * market-rate CPCs. Target long-tail, price-sensitive, and high-intent
 * keywords where competition is lower.
 * 
 * At $20/day CPA budget with $1.25 avg CPC → ~16 clicks/day (480/mo)
 * At $10/day EA budget with $0.80 avg CPC → ~12 clicks/day (360/mo)
 * Total: ~28 clicks/day, ~840/month for $900/mo spend
 */
function getDefaultCPC(courseId: CourseId, theme: AdGroupTheme): number {
  // Conservative starting bids — 40-50% below market rate
  // Google will raise bids on high-converting queries via Smart Bidding
  const baseCPC: Record<CourseId, number> = {
    cpa: 1.40,   // Market ~$3-5, start low
    ea: 0.85,    // Lower competition niche
    cma: 1.00,
    cia: 0.90,
    cfp: 1.10,
    cisa: 0.80,
  };

  // Theme multipliers — invest more in high-intent, less in awareness
  const themeMultiplier: Record<AdGroupTheme, number> = {
    generic: 1.0,
    'section-specific': 0.85,    // Lower competition on section keywords
    competitor: 1.2,             // Worth paying more for switchers
    'practice-questions': 1.1,   // HIGH intent — people ready to study
    temporal: 0.80,              // Moderate intent
    'price-sensitive': 0.90,     // Our sweet spot — budget-conscious buyers
    career: 0.65,                // Top-of-funnel, lower intent
    'long-tail': 0.55,           // Cheapest clicks, decent intent
  };

  return Math.round(baseCPC[courseId] * (themeMultiplier[theme] || 1.0) * 100) / 100;
}

/** Default daily budget per exam */
function getDefaultDailyBudget(courseId: CourseId): number {
  const budgets: Record<CourseId, number> = {
    cpa: 30,     // Highest volume
    ea: 15,
    cma: 15,
    cia: 12,
    cfp: 15,
    cisa: 12,
  };
  return budgets[courseId];
}

/** Target CPA per exam.
 * 
 * These target the cost to acquire a FREE TRIAL signup (no credit card).
 * At ~5% trial-to-paid conversion and $19/mo × 6mo avg LTV = ~$114 LTV,
 * breakeven CPA for a paid user = $114. So CPA for a trial = $114 × 5% = ~$5.70.
 * Starting with $8-12 target CPA gives room to optimize while staying profitable.
 */
function getTargetCPA(courseId: CourseId): number {
  const targets: Record<CourseId, number> = {
    cpa: 12,     // Higher volume, worth paying a bit more
    ea: 8,       // Smaller market, need efficiency
    cma: 10,
    cia: 8,
    cfp: 10,
    cisa: 8,
  };
  return targets[courseId];
}

// ============================================================================
// Campaign Summary
// ============================================================================

/**
 * Get a summary of all campaigns for the dashboard.
 */
export function getCampaignSummary(campaigns: SEMCampaign[]): {
  totalCampaigns: number;
  activeCampaigns: number;
  totalAdGroups: number;
  totalKeywords: number;
  totalAds: number;
  totalDailyBudget: number;
  estimatedMonthlySpend: number;
  avgTargetCPA: number;
} {
  let totalAdGroups = 0;
  let totalKeywords = 0;
  let totalAds = 0;
  let totalDailyBudget = 0;
  let totalTargetCPA = 0;

  for (const campaign of campaigns) {
    totalDailyBudget += campaign.dailyBudget;
    totalTargetCPA += campaign.targetCPA;
    for (const ag of campaign.adGroups) {
      totalAdGroups++;
      totalKeywords += ag.keywords.length;
      totalAds += ag.ads.length;
    }
  }

  return {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalAdGroups,
    totalKeywords,
    totalAds,
    totalDailyBudget: Math.round(totalDailyBudget),
    estimatedMonthlySpend: Math.round(totalDailyBudget * 30),
    avgTargetCPA: campaigns.length > 0 ? Math.round(totalTargetCPA / campaigns.length) : 0,
  };
}
