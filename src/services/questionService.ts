// Question Bank Service
// Local-first approach: Questions are stored in TypeScript files for fast loading
// and offline support. Firebase is used only for user progress tracking.

import { Question, AllExamSections, ExamSection, Difficulty } from '../types';
import logger from '../utils/logger';
import { getSmartQuestionSelection, getQuestionIdsByStatus, CurriculumFilterOptions } from './questionHistoryService';
import { COURSES } from '../courses';
import { CourseId } from '../types/course';

/**
 * Get all section IDs for a given course
 */
function getSectionsForCourse(courseId: CourseId): string[] {
  const course = COURSES[courseId];
  if (!course) return [];
  return course.sections.map(s => s.id);
}

/**
 * Get all section IDs across all courses
 */
function getAllSections(): string[] {
  const allSections: string[] = [];
  for (const courseId of Object.keys(COURSES) as CourseId[]) {
    allSections.push(...getSectionsForCourse(courseId));
  }
  return allSections;
}

interface FetchQuestionsOptions {
  section?: AllExamSections | string;
  topicId?: string;
  blueprintArea?: string;
  blueprintGroup?: string;
  blueprintTopic?: string;
  subtopic?: string; // Filter by specific subtopic (e.g., "Dollar-Value LIFO")
  topic?: string; // Filter by topic (e.g., "Inventory")
  hr1Only?: boolean;
  difficulty?: Difficulty;
  count?: number;
  mode?: 'random' | 'weak' | 'review' | 'exam';
  excludeIds?: string[];
  userId?: string; // For smart question selection - uses spaced repetition
  useSmartSelection?: boolean; // Enable intelligent question selection
  courseId?: string; // Multi-course support
  examDate?: string; // For adaptive review weights near exam
  questionStatus?: 'all' | 'unanswered' | 'incorrect' | 'correct'; // Filter by user's answer history
  // NEW: Curriculum-aware options
  curriculumOptions?: CurriculumFilterOptions; // Filter to covered topics only
}

// Cache for loaded questions to avoid re-importing
// Uses LRU eviction to prevent memory leaks on mobile devices
let questionCache: Record<string, Question[]> = {};
let cacheAccessOrder: string[] = []; // Track access order for LRU eviction
const MAX_CACHED_SECTIONS = 8; // Limit cache to ~8 sections (~3-4MB max)

/**
 * Load questions for a section (with LRU caching)
 * Evicts oldest sections when cache exceeds MAX_CACHED_SECTIONS
 */
async function loadSectionQuestions(section: string): Promise<Question[]> {
  if (questionCache[section]) {
    // Move to end of access order (most recently used)
    cacheAccessOrder = cacheAccessOrder.filter(s => s !== section);
    cacheAccessOrder.push(section);
    return questionCache[section];
  }

  try {
    let questions: Question[] = [];

    // CPA sections
    if (['FAR', 'AUD', 'REG', 'BEC', 'BAR', 'ISC', 'TCP'].includes(section)) {
      const localData = await import('../data/cpa/questions');
      switch (section) {
        case 'FAR': questions = localData.FAR_ALL || []; break;
        case 'AUD': questions = localData.AUD_ALL || []; break;
        case 'REG': questions = localData.REG_ALL || []; break;
        case 'BEC': questions = []; break; // BEC retired December 2023
        case 'BAR': questions = localData.BAR_ALL || []; break;
        case 'ISC': questions = localData.ISC_ALL || []; break;
        case 'TCP': questions = localData.TCP_ALL || []; break;
        default: questions = [];
      }
    }
    // EA sections
    else if (['SEE1', 'SEE2', 'SEE3'].includes(section)) {
      try {
        const eaData = await import('../data/ea/questions');
        switch (section) {
          case 'SEE1': questions = eaData.SEE1_ALL || []; break;
          case 'SEE2': questions = eaData.SEE2_ALL || []; break;
          case 'SEE3': questions = eaData.SEE3_ALL || []; break;
          default: questions = [];
        }
      } catch {
        questions = [];
      }
    }
    // CMA sections
    else if (['CMA1', 'CMA2'].includes(section)) {
      try {
        const cmaData = await import('../data/cma/questions');
        switch (section) {
          case 'CMA1': questions = cmaData.CMA_PART1_QUESTIONS || []; break;
          case 'CMA2': questions = cmaData.CMA_PART2_QUESTIONS || []; break;
          default: questions = [];
        }
      } catch {
        questions = [];
      }
    }
    // CIA sections
    else if (['CIA1', 'CIA2', 'CIA3'].includes(section)) {
      try {
        const ciaData = await import('../data/cia/questions');
        switch (section) {
          case 'CIA1': questions = ciaData.CIA1_QUESTIONS || []; break;
          case 'CIA2': questions = ciaData.CIA2_QUESTIONS || []; break;
          case 'CIA3': questions = ciaData.CIA3_QUESTIONS || []; break;
          default: questions = [];
        }
      } catch (e) {
        console.error('Failed to load CIA data', e);
        questions = [];
      }
    }
    // CISA sections
    else if (['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'].includes(section)) {
      try {
        const cisaData = await import('../data/cisa/questions');
        switch (section) {
          case 'CISA1': questions = cisaData.CISA1_QUESTIONS || []; break;
          case 'CISA2': questions = cisaData.CISA2_QUESTIONS || []; break;
          case 'CISA3': questions = cisaData.CISA3_QUESTIONS || []; break;
          case 'CISA4': questions = cisaData.CISA4_QUESTIONS || []; break;
          case 'CISA5': questions = cisaData.CISA5_QUESTIONS || []; break;
          default: questions = [];
        }
      } catch (e) {
        console.error('Failed to load CISA data', e);
        questions = [];
      }
    }
    // CFP Sections
    else if (section.startsWith('CFP-')) {
        try {
            const cfpData = await import('../data/cfp/questions');
            // CFP uses mixed question formats - cast to Question[] for compatibility
            questions = (cfpData.getCFPQuestions(section) || []) as Question[];
        } catch (err) {
            console.error('Failed to load CFP questions', err);
            questions = [];
        }
    }

    // LRU eviction: remove oldest sections if cache is full
    while (cacheAccessOrder.length >= MAX_CACHED_SECTIONS) {
      const oldest = cacheAccessOrder.shift();
      if (oldest) {
        delete questionCache[oldest];
      }
    }

    questionCache[section] = questions;
    cacheAccessOrder.push(section);
    return questions;
  } catch (err) {
    logger.error(`Failed to load questions for ${section}:`, err);
    return [];
  }
}

/**
 * Fetch questions from local data with optional filters
 * This is the primary way to get questions - fast, offline-capable
 * 
 * When useSmartSelection is enabled and userId is provided, questions are
 * selected using spaced repetition principles:
 * - 40% due for review (based on SM-2 algorithm)
 * - 30% recently answered incorrectly
 * - 30% fresh/never-seen questions
 */
export async function fetchQuestions(options: FetchQuestionsOptions = {}): Promise<Question[]> {
  const {
    section,
    topicId,
    blueprintArea,
    blueprintGroup,
    blueprintTopic,
    subtopic,
    topic,
    hr1Only,
    difficulty,
    count = 10,
    excludeIds = [],
    userId,
    useSmartSelection = false,
    courseId,
    examDate,
    questionStatus,
    curriculumOptions, // NEW: Curriculum filtering options
  } = options;

  try {
    let candidates: Question[] = [];

    if (section) {
      candidates = await loadSectionQuestions(section);
    } else {
      // Load all sections for the requested course, or all courses if no courseId
      const sections = courseId 
        ? getSectionsForCourse(courseId as CourseId)
        : getAllSections();
      for (const s of sections) {
        const sectionQuestions = await loadSectionQuestions(s);
        candidates.push(...sectionQuestions);
      }
    }

    // Apply filters
    let filtered = candidates.filter(q => {
      // Topic filter (legacy)
      if (topicId && q.topicId !== topicId) return false;
      
      // Subtopic filter (most specific - e.g., "Dollar-Value LIFO")
      if (subtopic && q.subtopic !== subtopic) return false;
      
      // Topic filter (e.g., "Inventory") - only if subtopic not specified
      if (topic && !subtopic && q.topic !== topic) return false;
      
      // Blueprint filters (2026 structure) - only if topic/subtopic not specified
      if (blueprintArea && !subtopic && !topic && q.blueprintArea !== blueprintArea) return false;
      if (blueprintGroup && q.blueprintGroup !== blueprintGroup) return false;
      if (blueprintTopic && q.blueprintTopic !== blueprintTopic) return false;
      
      // H.R. 1 filter (tax law changes)
      if (hr1Only && !q.hr1) return false;
      
      // Difficulty filter
      if (difficulty && q.difficulty !== difficulty) return false;
      
      // Exclude already seen
      if (excludeIds.includes(q.id)) return false;
      
      return true;
    });

    // Apply question status filter (unanswered/incorrect/correct)
    if (questionStatus && questionStatus !== 'all' && userId && section) {
      const statusIds = await getQuestionIdsByStatus(userId, section as string);
      
      if (questionStatus === 'unanswered') {
        filtered = filtered.filter(q => !statusIds.all.has(q.id));
      } else if (questionStatus === 'incorrect') {
        filtered = filtered.filter(q => statusIds.incorrect.has(q.id));
      } else if (questionStatus === 'correct') {
        filtered = filtered.filter(q => statusIds.correct.has(q.id));
      }
      
      logger.debug(`Question status filter '${questionStatus}': ${filtered.length} questions match`);
    }

    // Use smart selection if enabled and user is authenticated
    if (useSmartSelection && userId && section) {
      try {
        // Build question topic map for curriculum filtering
        const questionTopicMap = new Map<string, string>();
        for (const q of filtered) {
          questionTopicMap.set(q.id, q.topic);
        }
        
        // Merge curriculum options with the topic map
        const mergedCurriculumOptions: CurriculumFilterOptions | undefined = curriculumOptions 
          ? {
              ...curriculumOptions,
              questionTopicMap, // Always include topic map for filtering
            }
          : undefined;
        
        const smartSelection = await getSmartQuestionSelection(
          userId,
          section, // section is required for smart selection
          filtered.map(q => q.id),
          count,
          examDate, // Pass exam date for adaptive weights
          mergedCurriculumOptions // NEW: Pass curriculum filtering options
        );
        
        // Map selected IDs back to full question objects, preserving order
        const questionMap = new Map(filtered.map(q => [q.id, q]));
        const orderedQuestions: Question[] = [];
        
        for (const id of smartSelection.questionIds) {
          const q = questionMap.get(id);
          if (q) orderedQuestions.push(q);
        }
        
        // Log selection breakdown for debugging
        logger.debug(`Smart selection: ${smartSelection.breakdown.due} due, ${smartSelection.breakdown.incorrect} incorrect, ${smartSelection.breakdown.fresh} fresh${smartSelection.breakdown.filtered ? `, ${smartSelection.breakdown.filtered} filtered by curriculum` : ''}`);
        
        return orderedQuestions;
      } catch (smartError) {
        // Fallback to random selection if smart selection fails
        logger.error('Smart selection failed, using random:', smartError);
      }
    }

    // Shuffle and return requested count (default behavior)
    const shuffled = shuffleArray(filtered);
    return shuffled.slice(0, count);

  } catch (error) {
    logger.error('Error fetching questions:', error);
    return [];
  }
}

/**
 * Get a single question by ID
 */
export async function getQuestionById(questionId: string): Promise<Question | null> {
  try {
    // Search through all sections across all courses
    const allSections = getAllSections();
    
    for (const section of allSections) {
      const questions = await loadSectionQuestions(section);
      const found = questions.find(q => q.id === questionId);
      if (found) return found;
    }
    
    return null;
  } catch (error) {
    logger.error('Error fetching question by ID:', error);
    return null;
  }
}

/**
 * Get questions for weak areas based on user's performance
 * Uses local questions but filters based on user's weak topics
 */
export async function getWeakAreaQuestions(
  _userId: string, 
  section: ExamSection, 
  count = 10,
  weakTopics: string[] = []
): Promise<Question[]> {
  try {
    if (weakTopics.length === 0) {
      // No weak areas identified, return random questions
      return fetchQuestions({ section, count });
    }

    // Get questions from weak topics
    const questions: Question[] = [];
    const perTopic = Math.ceil(count / weakTopics.length);

    for (const topicId of weakTopics.slice(0, 3)) {
      const topicQuestions = await fetchQuestions({
        section,
        topicId,
        count: perTopic,
      });
      questions.push(...topicQuestions);
    }

    return shuffleArray(questions).slice(0, count);
  } catch (error) {
    logger.error('Error fetching weak area questions:', error);
    return fetchQuestions({ section, count });
  }
}

/**
 * Get total question count for a section (from local data)
 */
export async function getQuestionCount(section?: ExamSection): Promise<number> {
  try {
    if (section) {
      const questions = await loadSectionQuestions(section);
      return questions.length;
    }
    
    // Count all sections across all courses
    const allSections = getAllSections();
    let total = 0;
    for (const s of allSections) {
      const questions = await loadSectionQuestions(s);
      total += questions.length;
    }
    return total;
  } catch (error) {
    logger.error('Error getting question count:', error);
    return 0;
  }
}

/**
 * Get question statistics by section (from local data)
 */
export async function getQuestionStats(): Promise<{ total: number; bySection: Record<string, number> }> {
  try {
    const allSections = getAllSections();
    const stats: { total: number; bySection: Record<string, number> } = {
      total: 0,
      bySection: {},
    };
    
    for (const section of allSections) {
      const questions = await loadSectionQuestions(section);
      stats.bySection[section] = questions.length;
      stats.total += questions.length;
    }
    
    return stats;
  } catch (error) {
    logger.error('Error getting question stats:', error);
    return { total: 0, bySection: {} };
  }
}

/**
 * Clear the question cache (useful for testing or forcing reload)
 * Also resets the LRU access order tracking
 */
export function clearQuestionCache(): void {
  questionCache = {};
  cacheAccessOrder = [];
}

/**
 * Get cache statistics for debugging/monitoring
 * Useful for verifying memory management on mobile devices
 */
export function getQuestionCacheStats(): {
  sectionsCount: number;
  sections: string[];
  totalQuestions: number;
  maxSections: number;
} {
  const sections = Object.keys(questionCache);
  const totalQuestions = sections.reduce(
    (sum, section) => sum + (questionCache[section]?.length || 0),
    0
  );
  return {
    sectionsCount: sections.length,
    sections: [...cacheAccessOrder], // Return in LRU order
    totalQuestions,
    maxSections: MAX_CACHED_SECTIONS,
  };
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Build a mapping from topic name to blueprintArea ID for given sections.
 * Used by the Progress page to associate topic performance with blueprint areas.
 */
export async function getTopicToBlueprintAreaMap(
  courseId?: string,
  section?: string
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  try {
    const sections = section
      ? [section]
      : courseId
        ? getSectionsForCourse(courseId as CourseId)
        : getAllSections();

    for (const s of sections) {
      const questions = await loadSectionQuestions(s);
      questions.forEach(q => {
        if (q.topic && q.blueprintArea) {
          map.set(q.topic, q.blueprintArea);
        }
      });
    }
  } catch (error) {
    logger.error('Error building topic-to-blueprint mapping:', error);
  }
  return map;
}

/**
 * Get all unique topics for a section
 */
export async function getTopicsForSection(section: ExamSection): Promise<string[]> {
  const questions = await loadSectionQuestions(section);
  const topics = new Set<string>();
  
  for (const q of questions) {
    if (q.topic) topics.add(q.topic);
    if (q.topicId) topics.add(q.topicId);
  }
  
  return Array.from(topics).sort();
}
