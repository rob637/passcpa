// Question Bank Service
// Local-first approach: Questions are stored in TypeScript files for fast loading
// and offline support. Firebase is used only for user progress tracking.

import { Question, ExamSection, Difficulty } from '../types';
import logger from '../utils/logger';

interface FetchQuestionsOptions {
  section?: ExamSection;
  topicId?: string;
  blueprintArea?: string;
  blueprintGroup?: string;
  blueprintTopic?: string;
  hr1Only?: boolean;
  difficulty?: Difficulty;
  count?: number;
  mode?: 'random' | 'weak' | 'review' | 'exam';
  excludeIds?: string[];
}

// Cache for loaded questions to avoid re-importing
let questionCache: Record<string, Question[]> = {};

/**
 * Load questions for a section (with caching)
 */
async function loadSectionQuestions(section: ExamSection): Promise<Question[]> {
  if (questionCache[section]) {
    return questionCache[section];
  }

  try {
    const localData = await import('../data/questions');
    let questions: Question[] = [];

    switch (section) {
      case 'FAR': questions = localData.FAR_ALL || []; break;
      case 'AUD': questions = localData.AUD_ALL || []; break;
      case 'REG': questions = localData.REG_ALL || []; break;
      case 'BEC': questions = localData.BEC_ALL || []; break;
      case 'BAR': questions = localData.BAR_ALL || []; break;
      case 'ISC': questions = localData.ISC_ALL || []; break;
      case 'TCP': questions = localData.TCP_ALL || []; break;
      default: questions = [];
    }

    questionCache[section] = questions;
    return questions;
  } catch (err) {
    logger.error(`Failed to load questions for ${section}:`, err);
    return [];
  }
}

/**
 * Fetch questions from local data with optional filters
 * This is the primary way to get questions - fast, offline-capable
 */
export async function fetchQuestions(options: FetchQuestionsOptions = {}): Promise<Question[]> {
  const {
    section,
    topicId,
    blueprintArea,
    blueprintGroup,
    blueprintTopic,
    hr1Only,
    difficulty,
    count = 10,
    excludeIds = [],
  } = options;

  try {
    let candidates: Question[] = [];

    if (section) {
      candidates = await loadSectionQuestions(section);
    } else {
      // Load all sections if no specific section requested
      const sections: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
      for (const s of sections) {
        const sectionQuestions = await loadSectionQuestions(s);
        candidates.push(...sectionQuestions);
      }
    }

    // Apply filters
    let filtered = candidates.filter(q => {
      // Topic filter (legacy)
      if (topicId && q.topicId !== topicId) return false;
      
      // Blueprint filters (2026 structure)
      if (blueprintArea && q.blueprintArea !== blueprintArea) return false;
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

    // Shuffle and return requested count
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
    // Search through all sections
    const sections: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
    
    for (const section of sections) {
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
    
    // Count all sections
    const sections: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
    let total = 0;
    for (const s of sections) {
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
    const sections: ExamSection[] = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
    const stats: { total: number; bySection: Record<string, number> } = {
      total: 0,
      bySection: {},
    };
    
    for (const section of sections) {
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
 */
export function clearQuestionCache(): void {
  questionCache = {};
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
