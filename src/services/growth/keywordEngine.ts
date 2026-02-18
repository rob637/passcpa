/**
 * Keyword Research Engine — Automated keyword discovery and tracking
 * 
 * Seeds, expands, and manages the keyword database for all exams.
 * Generates keyword lists from:
 * 1. Exam-specific seed terms
 * 2. Modifier expansion (year, free, best, online, etc.)
 * 3. Competitor keyword gaps
 * 4. Content-driven keywords (from existing question/lesson data)
 * 
 * Integrates with:
 * - Google Search Console API (free rank tracking)
 * - DataForSEO API (keyword volume, difficulty, SERP data)
 * - Firestore (keyword database storage)
 */

import type { CourseId } from '../../types/course';
import type {
  TrackedKeyword,
  KeywordSeed,
  KeywordDifficulty,
  KeywordStatus,
  SearchIntent,
} from '../../types/growth';
import { EXAM_CONTENT_META } from './contentEngine';

// ============================================================================
// Keyword Seed Data — Per-Exam
// ============================================================================

/** Universal modifiers applied to exam keywords */
const UNIVERSAL_MODIFIERS = [
  '2026', '2025', 'free', 'best', 'online', 'course', 'prep', 'review',
  'study guide', 'practice questions', 'pass rate', 'difficulty',
  'tips', 'schedule', 'salary', 'requirements', 'cost', 'how to pass',
  'practice exam', 'test bank', 'flashcards', 'study plan',
  'for beginners', 'working professionals', 'cheap', 'affordable',
];

/** Intent-specific modifiers */
export const INTENT_MODIFIERS: Record<SearchIntent, string[]> = {
  informational: ['what is', 'how to', 'guide', 'explained', 'vs', 'difference between', 'overview'],
  commercial: ['best', 'top', 'review', 'comparison', 'alternative to', 'like'],
  transactional: ['buy', 'sign up', 'free trial', 'discount', 'coupon', 'pricing'],
  navigational: ['login', 'portal', 'website', 'app'],
};

/** Exam-specific keyword seeds */
const EXAM_KEYWORD_SEEDS: Record<CourseId, KeywordSeed[]> = {
  cpa: [
    {
      courseId: 'cpa',
      seedTerms: [
        'cpa exam', 'cpa review', 'cpa prep', 'cpa study', 'cpa course',
        'cpa test', 'certified public accountant', 'cpa certification',
        'cpa exam prep', 'cpa review course', 'cpa study material',
        'cpa practice exam', 'cpa test bank', 'cpa questions',
      ],
      modifiers: UNIVERSAL_MODIFIERS,
      intent: 'commercial',
    },
    {
      courseId: 'cpa',
      seedTerms: [
        'cpa far', 'cpa aud', 'cpa reg', 'cpa bar', 'cpa isc', 'cpa tcp',
        'far exam', 'aud exam', 'reg exam', 'cpa far study guide',
        'cpa aud practice questions', 'cpa reg tax topics',
      ],
      modifiers: ['2026', 'study guide', 'practice questions', 'tips', 'pass rate', 'how to pass'],
      intent: 'informational',
    },
    {
      courseId: 'cpa',
      seedTerms: [
        'becker cpa', 'roger cpa', 'surgent cpa', 'wiley cpa', 'uworld cpa',
        'becker alternative', 'cheaper than becker', 'becker vs',
      ],
      modifiers: ['alternative', 'vs', 'review', 'cost', 'comparison', 'discount'],
      intent: 'commercial',
    },
    {
      courseId: 'cpa',
      section: 'FAR',
      seedTerms: [
        'governmental accounting', 'nonprofit accounting', 'revenue recognition',
        'lease accounting', 'bond accounting', 'inventory methods',
        'gaap vs ifrs', 'consolidation', 'equity method',
      ],
      modifiers: ['cpa exam', 'far', 'explained', 'examples', 'practice questions'],
      intent: 'informational',
    },
  ],

  ea: [
    {
      courseId: 'ea',
      seedTerms: [
        'enrolled agent', 'ea exam', 'enrolled agent exam', 'ea review',
        'see exam', 'special enrollment examination', 'ea certification',
        'irs enrolled agent', 'ea prep', 'ea study',
      ],
      modifiers: UNIVERSAL_MODIFIERS,
      intent: 'commercial',
    },
    {
      courseId: 'ea',
      seedTerms: [
        'ea part 1', 'ea part 2', 'ea part 3', 'see1', 'see2', 'see3',
        'ea individual tax', 'ea business tax', 'ea representation',
        'circular 230',
      ],
      modifiers: ['study guide', 'practice questions', 'tips', 'pass rate'],
      intent: 'informational',
    },
    {
      courseId: 'ea',
      seedTerms: [
        'gleim ea', 'surgent ea', 'fast forward academy ea',
        'ea vs cpa', 'enrolled agent vs cpa',
      ],
      modifiers: ['review', 'cost', 'alternative', 'comparison'],
      intent: 'commercial',
    },
  ],

  cma: [
    {
      courseId: 'cma',
      seedTerms: [
        'cma exam', 'cma review', 'cma certification', 'cma prep',
        'certified management accountant', 'ima cma', 'cma course',
        'cma part 1', 'cma part 2', 'cma study',
      ],
      modifiers: UNIVERSAL_MODIFIERS,
      intent: 'commercial',
    },
    {
      courseId: 'cma',
      seedTerms: [
        'wiley cma', 'gleim cma', 'hock cma', 'cma vs cpa',
        'management accounting', 'cost accounting',
      ],
      modifiers: ['review', 'alternative', 'comparison', 'cost'],
      intent: 'commercial',
    },
  ],

  cia: [
    {
      courseId: 'cia',
      seedTerms: [
        'cia exam', 'cia review', 'cia certification', 'cia prep',
        'certified internal auditor', 'iia cia', 'cia course',
        'cia part 1', 'cia part 2', 'cia part 3',
        'internal audit certification', 'cia study',
      ],
      modifiers: UNIVERSAL_MODIFIERS,
      intent: 'commercial',
    },
    {
      courseId: 'cia',
      seedTerms: [
        'gleim cia', 'iia learning', 'cia vs cisa',
        'internal audit standards', 'ippf', 'risk management audit',
      ],
      modifiers: ['review', 'comparison', 'study guide'],
      intent: 'commercial',
    },
  ],

  cfp: [
    {
      courseId: 'cfp',
      seedTerms: [
        'cfp exam', 'cfp review', 'cfp certification', 'cfp prep',
        'certified financial planner', 'cfp board', 'cfp course',
        'cfp test', 'financial planning exam', 'cfp study',
      ],
      modifiers: UNIVERSAL_MODIFIERS,
      intent: 'commercial',
    },
    {
      courseId: 'cfp',
      seedTerms: [
        'dalton cfp', 'kaplan cfp', 'zahn cfp', 'cfp vs cfa',
        'cfp vs cpa', 'financial planner certification',
      ],
      modifiers: ['review', 'cost', 'comparison', 'alternative'],
      intent: 'commercial',
    },
  ],

  cisa: [
    {
      courseId: 'cisa',
      seedTerms: [
        'cisa exam', 'cisa review', 'cisa certification', 'cisa prep',
        'certified information systems auditor', 'isaca cisa', 'cisa course',
        'cisa test', 'cisa study', 'is audit certification',
      ],
      modifiers: UNIVERSAL_MODIFIERS,
      intent: 'commercial',
    },
    {
      courseId: 'cisa',
      seedTerms: [
        'cisa domain 1', 'cisa domain 2', 'cisa domain 3', 'cisa domain 4', 'cisa domain 5',
        'it audit', 'information systems audit', 'cisa vs cissp',
        'isaca learning', 'cisa practice questions',
      ],
      modifiers: ['study guide', 'practice questions', 'tips', 'pass rate'],
      intent: 'informational',
    },
  ],
};

// ============================================================================
// Keyword Expansion Engine
// ============================================================================

/**
 * Expand a seed into a full keyword list by combining terms with modifiers.
 * Generates hundreds of keyword variations per seed.
 */
export function expandKeywordSeed(seed: KeywordSeed): Partial<TrackedKeyword>[] {
  const keywords: Partial<TrackedKeyword>[] = [];
  const seen = new Set<string>();

  for (const term of seed.seedTerms) {
    // Add the base term
    if (!seen.has(term)) {
      seen.add(term);
      keywords.push(createKeywordEntry(term, seed));
    }

    // Add modifier combinations
    for (const modifier of seed.modifiers) {
      const variations = [
        `${term} ${modifier}`,
        `${modifier} ${term}`,
      ];

      for (const variant of variations) {
        const normalized = variant.toLowerCase().trim();
        if (!seen.has(normalized) && normalized.split(' ').length <= 6) {
          seen.add(normalized);
          keywords.push(createKeywordEntry(normalized, seed));
        }
      }
    }

    // Add question-form variations
    const questionForms = [
      `what is ${term}`,
      `how to pass ${term}`,
      `is ${term} hard`,
      `${term} worth it`,
      `how long to study for ${term}`,
    ];

    for (const q of questionForms) {
      const normalized = q.toLowerCase().trim();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        keywords.push(createKeywordEntry(normalized, { ...seed, intent: 'informational' }));
      }
    }
  }

  return keywords;
}

function createKeywordEntry(keyword: string, seed: KeywordSeed): Partial<TrackedKeyword> {
  return {
    keyword,
    courseId: seed.courseId,
    section: seed.section,
    intent: seed.intent,
    monthlyVolume: 0,      // filled by API
    difficulty: 'medium' as KeywordDifficulty,
    difficultyScore: 0,
    currentRank: null,
    previousRank: null,
    bestRank: null,
    targetRank: 10,
    cpc: 0,
    assignedPage: null,
    contentGap: true,
    status: 'discovered' as KeywordStatus,
    tags: classifyKeyword(keyword),
    competitors: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Auto-classify a keyword with tags based on patterns.
 */
function classifyKeyword(keyword: string): string[] {
  const tags: string[] = [];
  const kw = keyword.toLowerCase();

  if (kw.includes('vs') || kw.includes('alternative') || kw.includes('comparison')) tags.push('competitor');
  if (kw.split(' ').length >= 4) tags.push('long-tail');
  if (kw.includes('2025') || kw.includes('2026') || kw.includes('2027')) tags.push('seasonal');
  if (kw.includes('free') || kw.includes('practice questions') || kw.includes('sample')) tags.push('lead-gen');
  if (kw.includes('salary') || kw.includes('career') || kw.includes('worth it')) tags.push('career');
  if (kw.includes('how to') || kw.includes('what is') || kw.includes('guide')) tags.push('informational');
  if (kw.includes('best') || kw.includes('review') || kw.includes('course')) tags.push('commercial');
  if (kw.includes('buy') || kw.includes('sign up') || kw.includes('pricing')) tags.push('transactional');
  if (kw.includes('requirement') || kw.includes('eligib')) tags.push('requirements');

  return tags;
}

// ============================================================================
// Full Keyword Database Generation
// ============================================================================

/**
 * Generate the complete keyword database for all exams.
 * This is the initial seed — call once, then track and expand over time.
 */
export function generateFullKeywordDatabase(): Partial<TrackedKeyword>[] {
  const allKeywords: Partial<TrackedKeyword>[] = [];
  const seen = new Set<string>();

  for (const courseId of Object.keys(EXAM_KEYWORD_SEEDS) as CourseId[]) {
    const seeds = EXAM_KEYWORD_SEEDS[courseId];
    for (const seed of seeds) {
      const expanded = expandKeywordSeed(seed);
      for (const kw of expanded) {
        if (kw.keyword && !seen.has(kw.keyword)) {
          seen.add(kw.keyword);
          kw.id = `kw-${courseId}-${seen.size}`;
          allKeywords.push(kw);
        }
      }
    }
  }

  // Add topic-derived keywords from exam content metadata
  for (const courseId of Object.keys(EXAM_CONTENT_META) as CourseId[]) {
    const meta = EXAM_CONTENT_META[courseId];
    for (const section of meta.sections) {
      for (const topic of section.topics) {
        const topicKw = `${meta.exam.toLowerCase()} ${topic.toLowerCase()}`;
        if (!seen.has(topicKw)) {
          seen.add(topicKw);
          allKeywords.push({
            id: `kw-${courseId}-topic-${seen.size}`,
            keyword: topicKw,
            courseId,
            section: section.id,
            intent: 'informational',
            monthlyVolume: 0,
            difficulty: 'medium',
            difficultyScore: 0,
            currentRank: null,
            previousRank: null,
            bestRank: null,
            targetRank: 10,
            cpc: 0,
            assignedPage: null,
            contentGap: true,
            status: 'discovered',
            tags: ['topic', 'informational'],
            competitors: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }
  }

  return allKeywords;
}

/**
 * Get keyword database summary statistics.
 */
export function getKeywordDatabaseSummary(): {
  totalKeywords: number;
  byExam: Record<string, number>;
  byIntent: Record<string, number>;
  byTag: Record<string, number>;
} {
  const allKeywords = generateFullKeywordDatabase();

  const byExam: Record<string, number> = {};
  const byIntent: Record<string, number> = {};
  const byTag: Record<string, number> = {};

  for (const kw of allKeywords) {
    if (kw.courseId) byExam[kw.courseId] = (byExam[kw.courseId] || 0) + 1;
    if (kw.intent) byIntent[kw.intent] = (byIntent[kw.intent] || 0) + 1;
    if (kw.tags) {
      for (const tag of kw.tags) {
        byTag[tag] = (byTag[tag] || 0) + 1;
      }
    }
  }

  return { totalKeywords: allKeywords.length, byExam, byIntent, byTag };
}

// ============================================================================
// Content Gap Analysis
// ============================================================================

/**
 * Identify keywords that have no assigned page — these are content gaps.
 * Each gap represents a potential new article that could rank.
 */
export function identifyContentGaps(
  keywords: TrackedKeyword[],
): TrackedKeyword[] {
  return keywords
    .filter(kw => kw.contentGap && kw.monthlyVolume > 0)
    .sort((a, b) => b.monthlyVolume - a.monthlyVolume);
}

/**
 * Match keywords to existing pages.
 * Updates assignedPage and contentGap fields.
 */
export function matchKeywordsToPages(
  keywords: Partial<TrackedKeyword>[],
  existingPages: { path: string; title: string; content?: string }[],
): Partial<TrackedKeyword>[] {
  return keywords.map(kw => {
    if (!kw.keyword) return kw;

    const kwLower = kw.keyword.toLowerCase();

    // Check if any existing page title or URL contains this keyword
    const matchedPage = existingPages.find(page => {
      const titleMatch = page.title.toLowerCase().includes(kwLower) ||
        kwLower.includes(page.title.toLowerCase());
      const pathMatch = page.path.toLowerCase().includes(kwLower.replace(/\s+/g, '-'));
      const contentMatch = page.content?.toLowerCase().includes(kwLower);
      return titleMatch || pathMatch || contentMatch;
    });

    if (matchedPage) {
      return {
        ...kw,
        assignedPage: matchedPage.path,
        contentGap: false,
      };
    }

    return kw;
  });
}

// ============================================================================
// Keyword Priority Scoring
// ============================================================================

/**
 * Score keywords by priority for targeting.
 * Higher score = should target this keyword first.
 * 
 * Factors: volume, difficulty, intent, content gap, competition.
 */
export function scoreKeywordPriority(kw: TrackedKeyword): number {
  let score = 0;

  // Volume (0-30 points)
  if (kw.monthlyVolume >= 10000) score += 30;
  else if (kw.monthlyVolume >= 5000) score += 25;
  else if (kw.monthlyVolume >= 1000) score += 20;
  else if (kw.monthlyVolume >= 500) score += 15;
  else if (kw.monthlyVolume >= 100) score += 10;
  else score += 5;

  // Difficulty (0-25 points, lower difficulty = more points)
  if (kw.difficultyScore <= 20) score += 25;
  else if (kw.difficultyScore <= 40) score += 20;
  else if (kw.difficultyScore <= 60) score += 15;
  else if (kw.difficultyScore <= 80) score += 10;
  else score += 5;

  // Intent (0-20 points)
  const intentScores: Record<SearchIntent, number> = {
    transactional: 20,
    commercial: 15,
    informational: 10,
    navigational: 5,
  };
  score += intentScores[kw.intent] || 10;

  // Content gap bonus (0-15 points)
  if (kw.contentGap) score += 15;

  // Already ranking bonus (0-10 points)
  if (kw.currentRank !== null) {
    if (kw.currentRank <= 20) score += 10; // close to page 1, push it
    else if (kw.currentRank <= 50) score += 5;
  }

  return score;
}
