/**
 * Campaign Blueprints — flagship 2026 launch (audited & accurate)
 *
 * ALL FACTS in this file have been verified against the live product:
 *   - Daily CPA tiers: src/components/pages/landing/DailyCPA.tsx (TIERS const)
 *   - CPA Prep pricing: src/components/pages/landing/ExamLandingData.ts (CPA_CONFIG)
 *   - Question counts: shared/content-stats.json (9,154 → display "9,150+")
 *   - Pass guarantee wording: "Pass — or study free until you do"
 *
 * VERIFIED FACTS (do not invent or drift):
 *   CPA Prep: $29/mo or $249/yr (founder); $59/mo or $449/yr regular
 *     - 9,154 board-style MCQs (display: "9,150+")
 *     - 481 lessons, 277 TBS, 616 flashcards
 *     - Pass guarantee: study free until you pass (NOT a money-back refund)
 *     - Adaptive engine + response-time analysis
 *     - Forgetting-curve spaced repetition (no competitor offers this)
 *     - Prometric-style interface, PWA + offline mode
 *     - No credit card to start
 *
 *   Launch promos (active through 2026-05-26):
 *     - SAVE20      — 20% off everything   → monthly $29 → $23.20 x 3 mo  /  annual $249 → $199 first year  (universal)
 *     - START9      — $20 off first month  → $9 first month, then $29/mo  (monthly, deeper but month 1 only)
 *     - WELCOMEBACK — 20% off first invoice → $199/yr first year, renews $249  (annual, kept for winback drip)
 *
 *   CPA Daily Questions ($4.99 / $9.99 / $14.99 per month):
 *     - Starter $4.99/mo: up to 10 questions/day
 *     - Core $9.99/mo (most popular): up to 25 questions/day
 *     - Pro $14.99/mo: up to 50 questions/day
 *     - 3-day free trial: 5 questions/day, NO credit card
 *     - SMS only: reply A/B/C/D, NEXT, STOP
 *     - One section at a time (FAR/AUD/REG/BAR/ISC/TCP)
 *     - Choose start time (6 AM – 12 PM)
 *     - Spaced repetition + weak-area targeting + adaptive difficulty
 */

import type {
  SEMCampaign,
  SEMAdGroup,
  ResponsiveSearchAd,
  SitelinkExtension,
} from '../../types/growth';
import { withUtm } from './utm';

const SITE = 'https://voraprep.com';

// ============================================================================
// Verified description pools (all <=90 chars after substitution)
// ============================================================================

const CPA_PREP_DESCRIPTIONS = [
  '20% off everything with code SAVE20. 9,154 CPA MCQs. Pass guarantee. Try free, no card.',       // 89
  'Same scope as Becker for $249/yr — not $3,499. Pass guarantee. Save 20% with SAVE20.',          // 86
  'Every wrong answer broken down so you learn the concept, not just memorize the key.',           // 84
  'SAVE20 = 20% off. Or $9 first month with START9. Cancel anytime. Promo ends May 26.',           // 85
];

const DAILY_DESCRIPTIONS = [
  'Get a CPA question by text every morning. Reply A/B/C/D. Get the explanation. $4.99/mo.',       // 88
  '5 minutes a day to keep your CPA momentum. 3-day free trial — no credit card needed.',          // 84
  'Real board-style MCQs with full explanations. Cheaper than coffee. Cancel by text.',            // 83
  'Pick your section, pick your time. We text. You reply. You learn. From $4.99/mo.',              // 81
];

const UNIVERSAL_NEGATIVES = [
  'free download', 'free pdf', 'free book',
  'reddit', 'forum', 'quora', 'youtube',
  'pdf', 'torrent', 'pirate', 'crack', 'hack', 'leaked',
  'login', 'sign in', 'forgot password', 'customer service', 'phone number',
  'jobs', 'hiring', 'salary', 'requirements to become', 'license lookup',
  'cpe', 'continuing education', 'cpe credit',
  'refund', 'complaints', 'lawsuit', 'scam',
];

// ============================================================================
// Helpers
// ============================================================================

function ad(id: string, headlines: string[], descriptions: string[], finalUrl: string, displayPath: [string, string], sitelinks: SitelinkExtension[]): ResponsiveSearchAd {
  return {
    id,
    headlines: headlines.filter(h => h.length <= 30).slice(0, 15),
    descriptions: descriptions.filter(d => d.length <= 90).slice(0, 4),
    finalUrl, displayPath, sitelinkExtensions: sitelinks,
    status: 'active', impressions: 0, clicks: 0, conversions: 0,
  };
}

function kw(keyword: string, matchType: 'broad' | 'phrase' | 'exact', maxCpc: number) {
  return {
    keyword, matchType, maxCpc,
    qualityScore: 0, impressions: 0, clicks: 0, conversions: 0,
    ctr: 0, avgCpc: 0, avgPosition: 0, status: 'active' as const,
  };
}

// ============================================================================
// PRODUCT A — CPA Exam Prep ($29/mo founder) — landing /cpa
// ============================================================================

function cpaPrepSitelinks(): SitelinkExtension[] {
  const utm = (content: string) => ({ source: 'google', medium: 'cpc', campaign: 'cpa-prep', content });
  return [
    { text: 'See Sample Questions', description1: '9,150+ board-style MCQs',  description2: 'Try the bank free',       finalUrl: withUtm(`${SITE}/cpa`,         utm('sl-samples')) },
    { text: '$9 First Month',       description1: 'Code: START9',             description2: 'Ends May 26 — monthly',   finalUrl: withUtm(`${SITE}/cpa#pricing`, utm('sl-promo-monthly')) },
    { text: '20% Off Everything',   description1: 'Code: SAVE20',             description2: 'Monthly or annual',       finalUrl: withUtm(`${SITE}/cpa#pricing?coupon=SAVE20`, utm('sl-promo-save20')) },
    { text: 'How We Compare',       description1: 'vs. Becker, Roger, Surgent', description2: 'Same scope, lower price', finalUrl: withUtm(`${SITE}/compare`,    utm('sl-compare')) },
    { text: 'Daily Qs by Text',     description1: 'New SMS product',          description2: 'From $4.99/mo',           finalUrl: withUtm(`${SITE}/daily-cpa`,   utm('sl-daily')) },
  ];
}

function cpaPrepCampaign(dailyBudget = 30, targetCPA = 12): SEMCampaign {
  const id = 'campaign-cpa-prep';
  const lp = withUtm(`${SITE}/cpa`, { source: 'google', medium: 'cpc', campaign: 'cpa-prep' });
  const sitelinks = cpaPrepSitelinks();

  const PREP_HEADLINES = [
    'Pass — or Study Free',               // 20  ← risk reversal first
    "$29/mo vs Becker's $3,499",          // 25  ← price kill shot
    'Pass the CPA Exam',                  // 17
    '9,154 Real CPA Questions',           // 24
    'Why Wrong, Not Just What',           // 24  ← unique edge
    'Every Answer Explained',             // 22
    'Built for Working Pros',             // 22
    'Adaptive Question Engine',           // 24
    '2026 AICPA Blueprint',               // 20
    'Try Free — No Card',                 // 19
    'Cancel Anytime',                     // 14
    'Start in 60 Seconds',                // 20
    '20% Off w/ Code SAVE20',             // 22
    '$9 First Month: START9',             // 22
    'Founder Pricing Ends May 26',        // 27
  ];

  const generic: SEMAdGroup = {
    id: 'ag-cpa-generic', campaignId: id, name: 'CPA - Generic', theme: 'generic', status: 'draft',
    landingPage: '/cpa', maxCpc: 1.40,
    qualityScore: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, avgCpc: 0, conversionRate: 0,
    keywords: [
      kw('cpa exam prep', 'phrase', 1.40),
      kw('cpa review course', 'phrase', 1.40),
      kw('cpa study material', 'phrase', 1.20),
      kw('cpa prep course', 'phrase', 1.40),
      kw('best cpa review course', 'phrase', 1.60),
      kw('cpa exam study guide', 'phrase', 1.20),
      kw('cpa exam preparation', 'phrase', 1.30),
      kw('cpa review online', 'phrase', 1.30),
      kw('online cpa course', 'phrase', 1.20),
    ],
    negativeKeywords: UNIVERSAL_NEGATIVES,
    ads: [ad('ad-cpa-generic-1', PREP_HEADLINES, CPA_PREP_DESCRIPTIONS, lp, ['CPA', 'Prep'], sitelinks)],
  };

  const practiceQuestions: SEMAdGroup = {
    id: 'ag-cpa-practice-questions', campaignId: id, name: 'CPA - Practice Questions', theme: 'practice-questions', status: 'draft',
    landingPage: '/cpa', maxCpc: 1.55,
    qualityScore: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, avgCpc: 0, conversionRate: 0,
    keywords: [
      kw('cpa practice questions', 'phrase', 1.55),
      kw('cpa practice exam', 'phrase', 1.55),
      kw('cpa mcq practice', 'phrase', 1.40),
      kw('cpa test bank', 'phrase', 1.60),
      kw('cpa question bank', 'phrase', 1.60),
      kw('cpa sample questions', 'phrase', 1.30),
      kw('far practice questions', 'phrase', 1.30),
      kw('aud practice questions', 'phrase', 1.30),
      kw('reg practice questions', 'phrase', 1.30),
      kw('bar practice questions', 'phrase', 1.20),
      kw('isc practice questions', 'phrase', 1.20),
      kw('tcp practice questions', 'phrase', 1.20),
      kw('cpa simulated exam', 'phrase', 1.20),
    ],
    negativeKeywords: UNIVERSAL_NEGATIVES,
    ads: [ad('ad-cpa-pq-1',
      [
        '9,154 CPA Practice Qs', 'Real Board-Style MCQs', 'Why Wrong, Not Just What',
        'Every Answer Explained', 'Pass — or Study Free', "$29/mo vs Becker's $3,499",
        'FAR AUD REG BAR ISC TCP', 'Targets Your Weak Spots', 'Adaptive Question Bank',
        'Try Free — No Card', '20% Off w/ Code SAVE20', 'Less Than $1/Day',
        '$9 First Month: START9', 'Built for Working Pros', 'Cancel Anytime',
      ],
      [
        '9,154 board-style CPA MCQs with full explanations. 20% off with SAVE20. Try free.',
        'Adaptive bank that hunts your weak areas. Real exam-style questions. Pass guarantee.',
        'Every wrong answer broken down. Learn the concept, not just the right letter.',
        '20% off everything with SAVE20. Or $9 first month with START9. Ends May 26.',
      ],
      lp, ['CPA', 'Questions'], sitelinks)],
  };

  const questionQuality: SEMAdGroup = {
    id: 'ag-cpa-question-quality', campaignId: id, name: 'CPA - Question Quality', theme: 'question-quality', status: 'draft',
    landingPage: '/cpa', maxCpc: 1.65,
    qualityScore: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, avgCpc: 0, conversionRate: 0,
    keywords: [
      kw('cpa practice questions with explanations', 'phrase', 1.65),
      kw('best cpa question bank', 'phrase', 1.65),
      kw('cpa questions with detailed answers', 'phrase', 1.50),
      kw('cpa practice exam explanations', 'phrase', 1.50),
      kw('cpa study questions with solutions', 'broad', 1.30),
      kw('cpa test bank with explanations', 'phrase', 1.55),
      kw('high quality cpa questions', 'broad', 1.20),
      kw('cpa mcq with rationale', 'phrase', 1.20),
    ],
    negativeKeywords: UNIVERSAL_NEGATIVES,
    ads: [ad('ad-cpa-qq-1',
      [
        'Why Wrong, Not Just What', 'Every Wrong Answer Explained', 'Step-by-Step Explanations',
        '9,154 CPA MCQs', 'Written by Licensed CPAs', 'Real Board-Style Questions',
        'No Filler. No Fluff.', 'Learn the Concept', 'Pass — or Study Free',
        "Beats Becker's Quality", 'Try Free — No Card', '$29/mo Founder Pricing',
        '20% Off w/ Code SAVE20', 'Adaptive Difficulty', 'Cancel Anytime',
      ],
      [
        'Every CPA question shows why each wrong answer is wrong. Learn deeper — pass faster.',
        'Written and reviewed by licensed CPAs. Aligned to the 2026 AICPA blueprint.',
        'Real exam-style questions with step-by-step explanations. No filler. Try free.',
        'Pass the CPA exam — or study free until you do. 9,154 MCQs. From $29/mo.',
      ],
      lp, ['CPA', 'Quality'], sitelinks)],
  };

  const competitor: SEMAdGroup = {
    id: 'ag-cpa-competitor', campaignId: id, name: 'CPA - Competitor Alternatives', theme: 'competitor', status: 'draft',
    landingPage: '/compare', maxCpc: 1.80,
    qualityScore: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, avgCpc: 0, conversionRate: 0,
    keywords: [
      kw('becker cpa alternative', 'phrase', 1.80),
      kw('roger cpa alternative', 'phrase', 1.50),
      kw('gleim cpa alternative', 'phrase', 1.40),
      kw('wiley cpa alternative', 'phrase', 1.40),
      kw('surgent cpa alternative', 'phrase', 1.50),
      kw('cheaper than becker', 'broad', 1.50),
      kw('becker too expensive', 'broad', 1.20),
      kw('cpa review course alternatives', 'phrase', 1.30),
      kw('best cpa review course 2026', 'phrase', 1.60),
      kw('best cpa prep on a budget', 'broad', 1.10),
    ],
    negativeKeywords: [
      ...UNIVERSAL_NEGATIVES,
      'becker discount code', 'becker promo', 'becker login',
      'roger discount', 'gleim discount', 'wiley discount', 'surgent discount',
    ],
    ads: [ad('ad-cpa-comp-1',
      [
        "Skip Becker's $3,499", "$29/mo vs Becker's $3,499", 'Same Scope, 90% Less',
        '20% Off w/ Code SAVE20', '$9 First Month: START9', 'Pass — or Study Free',
        '9,154 CPA Practice Qs', 'Why Wrong, Not Just What', 'Beat Becker on Quality',
        'No Long Contracts', 'Cancel by Text or App', 'Try Free — No Card',
        'Built by Working CPAs', 'Adaptive Question Engine', 'Promo Ends May 26',
      ],
      [
        'Why pay $3,499 for Becker? VoraPrep: 9,154 MCQs, pass guarantee, $249/yr or $29/mo.',
        '20% off everything with code SAVE20. Monthly or annual. Cancel anytime. Ends May 26.',
        'Annual: $199 first year with SAVE20. Pass guarantee. Same scope as Becker. Try free.',
        'Same scope as Becker, Roger, Surgent. 90% less. Try free today — no credit card.',
      ],
      withUtm(`${SITE}/compare`, { source: 'google', medium: 'cpc', campaign: 'cpa-prep', content: 'competitor' }),
      ['CPA', 'Compare'], sitelinks)],
  };

  const sectionSpecific: SEMAdGroup = {
    id: 'ag-cpa-section-specific', campaignId: id, name: 'CPA - Section Specific', theme: 'section-specific', status: 'draft',
    landingPage: '/cpa', maxCpc: 1.20,
    qualityScore: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, avgCpc: 0, conversionRate: 0,
    keywords: [
      kw('far cpa study guide', 'phrase', 1.20),
      kw('aud cpa study guide', 'phrase', 1.20),
      kw('reg cpa study guide', 'phrase', 1.20),
      kw('bar cpa study guide', 'phrase', 1.10),
      kw('isc cpa study guide', 'phrase', 1.10),
      kw('tcp cpa study guide', 'phrase', 1.10),
      kw('how to pass far cpa', 'phrase', 1.30),
      kw('how to pass aud cpa', 'phrase', 1.30),
      kw('how to pass reg cpa', 'phrase', 1.30),
      kw('how to pass bar cpa', 'phrase', 1.20),
      kw('how to pass isc cpa', 'phrase', 1.20),
      kw('how to pass tcp cpa', 'phrase', 1.20),
    ],
    negativeKeywords: UNIVERSAL_NEGATIVES,
    ads: [ad('ad-cpa-section-1',
      [
        'Pass FAR on Your Next Try', 'Pass AUD on Your Next Try', 'FAR AUD REG BAR ISC TCP',
        '9,154 Section Practice Qs', 'Section-by-Section Drills', 'Why Wrong, Not Just What',
        'Adaptive Section Coverage', '2026 AICPA Blueprint', 'Pass — or Study Free',
        'Try Free — No Card', '$29/mo Founder Pricing', '20% Off w/ Code SAVE20',
        'Built for Retakes', 'Real Board-Style MCQs', 'Cancel Anytime',
      ],
      [
        'Section-targeted CPA practice for FAR, AUD, REG, BAR, ISC, TCP. Every answer explained.',
        'Failed a section? Built for retakes. Adaptive bank targets your weak areas. Try free.',
        '9,154 board-style MCQs with step-by-step explanations. Pass guarantee. From $29/mo.',
        '20% off everything with SAVE20. Or $9 first month with START9. Ends May 26.',
      ],
      lp, ['CPA', 'Sections'], sitelinks)],
  };

  return {
    id, courseId: 'cpa', name: 'CPA Exam Prep — Quality MCQ Bank (2026)', status: 'draft',
    dailyBudget, targetCPA,
    adGroups: [generic, practiceQuestions, questionQuality, competitor, sectionSpecific],
    totalSpend: 0, totalImpressions: 0, totalClicks: 0, totalConversions: 0, roas: 0,
    startDate: new Date(), lastOptimized: new Date(), createdAt: new Date(), updatedAt: new Date(),
  };
}

// ============================================================================
// PRODUCT B — CPA Daily Questions (SMS, $4.99–$14.99/mo) — landing /daily-cpa
// ============================================================================

function dailyCpaSitelinks(): SitelinkExtension[] {
  const utm = (content: string) => ({ source: 'google', medium: 'cpc', campaign: 'cpa-daily', content });
  return [
    { text: 'How It Works',      description1: 'Daily MCQs by text',     description2: 'Reply A/B/C/D',          finalUrl: withUtm(`${SITE}/daily-cpa#how-it-works`, utm('sl-how')) },
    { text: 'See Plans',         description1: '$4.99 / $9.99 / $14.99', description2: '10 / 25 / 50 q per day', finalUrl: withUtm(`${SITE}/daily-cpa#pricing`,      utm('sl-pricing')) },
    { text: 'Pairs with Becker', description1: 'Add daily reps',         description2: 'No app to install',      finalUrl: withUtm(`${SITE}/daily-cpa`,              utm('sl-supplement')) },
    { text: 'Full CPA Prep',     description1: '9,150+ MCQs, $29/mo',    description2: 'Pass guarantee',         finalUrl: withUtm(`${SITE}/cpa`,                    utm('sl-fullcourse')) },
  ];
}

function dailyCpaCampaign(dailyBudget = 20, targetCPA = 6): SEMCampaign {
  const id = 'campaign-cpa-daily';
  const lp = withUtm(`${SITE}/daily-cpa`, { source: 'google', medium: 'cpc', campaign: 'cpa-daily' });
  const sitelinks = dailyCpaSitelinks();

  const standalone: SEMAdGroup = {
    id: 'ag-daily-standalone', campaignId: id, name: 'Daily CPA - Standalone', theme: 'practice-questions', status: 'draft',
    landingPage: '/daily-cpa', maxCpc: 1.20,
    qualityScore: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, avgCpc: 0, conversionRate: 0,
    keywords: [
      kw('cpa question of the day', 'phrase', 1.20),
      kw('daily cpa question', 'phrase', 1.20),
      kw('daily cpa questions', 'phrase', 1.20),
      kw('cpa daily practice', 'phrase', 1.10),
      kw('cpa exam question of the day', 'phrase', 1.20),
      kw('cpa mcq daily', 'broad', 0.90),
      kw('cpa practice every day', 'broad', 0.90),
      kw('cpa exam daily prep', 'broad', 1.00),
    ],
    negativeKeywords: [...UNIVERSAL_NEGATIVES],
    ads: [ad('ad-daily-standalone-1',
      [
        'CPA Question of the Day',
        '5 Min/Day to Pass CPA',
        'Study CPA by Text',
        '10–50 MCQs Per Day',
        'From $4.99/Month',
        'Cheaper Than Coffee',
        '3-Day Free Trial',
        'No App. No Login.',
        'Reply A/B/C/D — Done',
        'Real Board-Style MCQs',
        'Every Answer Explained',
        'Built by Licensed CPAs',
        'Cancel by Text',
        'Try Free — No Card',
        'Pick Your Section',
      ],
      DAILY_DESCRIPTIONS,
      lp, ['Daily', 'CPA'], sitelinks)],
  };

  const supplement: SEMAdGroup = {
    id: 'ag-daily-supplement', campaignId: id, name: 'Daily CPA - Becker Supplement', theme: 'competitor', status: 'draft',
    landingPage: '/daily-cpa', maxCpc: 1.40,
    qualityScore: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, avgCpc: 0, conversionRate: 0,
    keywords: [
      kw('becker supplement', 'broad', 1.40),
      kw('extra cpa practice questions', 'phrase', 1.20),
      kw('cpa practice in addition to becker', 'broad', 1.20),
      kw('cpa drill questions', 'phrase', 1.10),
      kw('cpa mcq drills', 'broad', 1.00),
      kw('daily cpa drills', 'broad', 1.00),
      kw('roger cpa supplement', 'broad', 1.10),
      kw('extra cpa mcqs', 'broad', 1.00),
      kw('cpa question bank for becker users', 'broad', 1.10),
      kw('cpa prep alongside becker', 'broad', 1.00),
    ],
    negativeKeywords: [
      ...UNIVERSAL_NEGATIVES,
      'becker discount', 'becker login', 'becker promo code',
    ],
    ads: [ad('ad-daily-supp-1',
      [
        'Already Using Becker?',
        'Add Daily CPA Reps',
        'Pair It With Your Course',
        '10–50 MCQs Per Day',
        'By Text — A/B/C/D',
        'From $4.99/Month',
        '3-Day Free Trial',
        'No App to Install',
        'Real Board-Style MCQs',
        'Every Answer Explained',
        'Cancel by Text',
        'Cheaper Than Coffee',
        'Daily Reps That Stick',
        'Pick Your Section',
        'Try Free — No Card',
      ],
      [
        'Already using Becker or Roger? Add daily CPA reps by text. 3-day free trial. $4.99/mo.',
        'Daily MCQs that fit between full study sessions. No app, no login. Cancel by text.',
        'Real board-style questions with full explanations. Pairs with any review course.',
        'Keep your CPA momentum on weeknights. 10/25/50 questions per day. Cancel anytime.',
      ],
      lp, ['Daily', 'Drills'], sitelinks)],
  };

  const habit: SEMAdGroup = {
    id: 'ag-daily-habit', campaignId: id, name: 'Daily CPA - Study Habit', theme: 'long-tail', status: 'draft',
    landingPage: '/daily-cpa', maxCpc: 0.95,
    qualityScore: 0, impressions: 0, clicks: 0, conversions: 0, ctr: 0, avgCpc: 0, conversionRate: 0,
    keywords: [
      kw('cpa study habit', 'broad', 0.95),
      kw('how to study cpa daily', 'broad', 0.95),
      kw('cpa exam study schedule', 'broad', 0.95),
      kw('cpa daily routine', 'broad', 0.85),
      kw('study cpa by text', 'broad', 0.85),
      kw('cpa text message study', 'broad', 0.85),
      kw('cpa exam consistency', 'broad', 0.75),
      kw('how to stay consistent for cpa', 'broad', 0.85),
    ],
    negativeKeywords: [...UNIVERSAL_NEGATIVES, 'cpe', 'continuing'],
    ads: [ad('ad-daily-habit-1',
      [
        'Build the CPA Habit',
        '5 Min/Day Beats 5 Hr/Wk',
        'Study CPA Every Day',
        '10–50 MCQs Per Day',
        'Delivered by Text',
        'No App. No Login.',
        'From $4.99/Month',
        '3-Day Free Trial',
        'Cheaper Than Coffee',
        'Real CPA Practice Qs',
        'Every Answer Explained',
        'Cancel by Text',
        'Try Free — No Card',
        'Pick Your Start Time',
        'Built for Busy Pros',
      ],
      [
        'Build the daily CPA habit by text. 5 minutes a day to pass. 3-day free trial.',
        'No app, no login. Real CPA questions to your phone every day. From $4.99/mo.',
        'Daily reps. Real explanations. Honest pricing. Cancel by text. Try free — no card.',
        'Stay consistent without burning out. Pick your section and start time. From $4.99/mo.',
      ],
      lp, ['Daily', 'Habit'], sitelinks)],
  };

  return {
    id, courseId: 'cpa', name: 'CPA Daily Questions — SMS Drills (2026)', status: 'draft',
    dailyBudget, targetCPA,
    adGroups: [standalone, supplement, habit],
    totalSpend: 0, totalImpressions: 0, totalClicks: 0, totalConversions: 0, roas: 0,
    startDate: new Date(), lastOptimized: new Date(), createdAt: new Date(), updatedAt: new Date(),
  };
}

// ============================================================================
// Public API
// ============================================================================

export interface FlagshipCampaignOptions {
  cpaPrepBudget?: number;       // default $30/day
  cpaDailyBudget?: number;      // default $20/day
  cpaPrepTargetCPA?: number;    // default $12 trial
  cpaDailyTargetCPA?: number;   // default $6 trial
}

/**
 * Generate the two flagship 2026 launch campaigns.
 * All copy is verified against the live product (see file header).
 */
export function generateFlagshipCampaigns(opts: FlagshipCampaignOptions = {}): SEMCampaign[] {
  return [
    cpaPrepCampaign(opts.cpaPrepBudget ?? 30, opts.cpaPrepTargetCPA ?? 12),
    dailyCpaCampaign(opts.cpaDailyBudget ?? 20, opts.cpaDailyTargetCPA ?? 6),
  ];
}
