// Question Bank Service
// Local-first approach: Questions are stored in TypeScript files for fast loading
// and offline support. Firebase is used only for user progress tracking.

import { Question, ExamSection, Difficulty } from '../types';
import logger from '../utils/logger';
import { getSmartQuestionSelection } from './questionHistoryService';

interface FetchQuestionsOptions {
  section?: ExamSection;
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
    useSmartSelection = false,    examDate,  } = options;

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

    // Use smart selection if enabled and user is authenticated
    if (useSmartSelection && userId && section) {
      try {
        const smartSelection = await getSmartQuestionSelection(
          userId,
          section, // section is required for smart selection
          filtered.map(q => q.id),
          count,
          examDate // Pass exam date for adaptive weights
        );
        
        // Map selected IDs back to full question objects, preserving order
        const questionMap = new Map(filtered.map(q => [q.id, q]));
        const orderedQuestions: Question[] = [];
        
        for (const id of smartSelection.questionIds) {
          const q = questionMap.get(id);
          if (q) orderedQuestions.push(q);
        }
        
        // Log selection breakdown for debugging
        logger.debug(`Smart selection: ${smartSelection.breakdown.due} due, ${smartSelection.breakdown.incorrect} incorrect, ${smartSelection.breakdown.fresh} fresh`);
        
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

/**
 * Adaptive question selection based on user performance
 * Prioritizes weak areas, includes spaced repetition, and adds variety
 * 
 * Distribution:
 * - 50% weak topics (accuracy < 70%)
 * - 30% stale topics (not practiced recently)
 * - 20% random for variety
 */
export interface AdaptiveSelectionInput {
  section: ExamSection;
  count: number;
  topicStats: Array<{
    topic: string;
    topicId?: string;
    accuracy: number;
    totalQuestions: number;
    lastPracticed?: string;
  }>;
  previouslyMissedIds?: string[];
  excludeIds?: string[];
}

export async function fetchAdaptiveQuestions(input: AdaptiveSelectionInput): Promise<{
  questions: Question[];
  breakdown: { topic: string; count: number; reason: string }[];
}> {
  const { section, count, topicStats, previouslyMissedIds = [], excludeIds = [] } = input;
  const result: Question[] = [];
  const breakdown: { topic: string; count: number; reason: string }[] = [];
  const usedIds = new Set(excludeIds);
  
  // 1. First priority: Previously missed questions (if available)
  if (previouslyMissedIds.length > 0) {
    const missedCount = Math.min(Math.ceil(count * 0.2), previouslyMissedIds.length, 3);
    for (const qId of previouslyMissedIds.slice(0, missedCount)) {
      if (usedIds.has(qId)) continue;
      const q = await getQuestionById(qId);
      if (q) {
        result.push(q);
        usedIds.add(qId);
      }
    }
    if (result.length > 0) {
      breakdown.push({
        topic: 'Previously Missed',
        count: result.length,
        reason: 'Review questions you got wrong before',
      });
    }
  }
  
  const remaining = count - result.length;
  if (remaining <= 0) {
    return { questions: shuffleArray(result), breakdown };
  }
  
  // 2. Weak topics (50% of remaining) - accuracy < 70%
  const weakTopics = topicStats
    .filter(t => t.accuracy < 70 && t.totalQuestions >= 3)
    .sort((a, b) => a.accuracy - b.accuracy);
  
  const weakCount = Math.ceil(remaining * 0.5);
  let weakFetched = 0;
  
  for (const topic of weakTopics) {
    if (weakFetched >= weakCount) break;
    const topicId = topic.topicId || topic.topic;
    const questionsNeeded = Math.min(5, weakCount - weakFetched);
    
    const topicQuestions = await fetchQuestions({
      section,
      topicId,
      count: questionsNeeded * 2, // Fetch extra to have options
      excludeIds: Array.from(usedIds),
    });
    
    for (const q of topicQuestions) {
      if (weakFetched >= weakCount) break;
      if (usedIds.has(q.id)) continue;
      result.push(q);
      usedIds.add(q.id);
      weakFetched++;
    }
    
    if (weakFetched > 0) {
      breakdown.push({
        topic: topic.topic,
        count: weakFetched,
        reason: `Weak area: ${topic.accuracy}% accuracy`,
      });
    }
  }
  
  // 3. Stale topics (30% of remaining) - not practiced recently
  const staleTopics = topicStats
    .filter(t => {
      if (!t.lastPracticed) return true;
      const daysSince = Math.ceil(
        (Date.now() - new Date(t.lastPracticed).getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysSince > 5;
    })
    .filter(t => !weakTopics.find(w => w.topic === t.topic))
    .sort((a, b) => {
      const aDate = a.lastPracticed ? new Date(a.lastPracticed).getTime() : 0;
      const bDate = b.lastPracticed ? new Date(b.lastPracticed).getTime() : 0;
      return aDate - bDate;
    });
  
  const staleCount = Math.ceil(remaining * 0.3);
  let staleFetched = 0;
  
  for (const topic of staleTopics) {
    if (staleFetched >= staleCount) break;
    const topicId = topic.topicId || topic.topic;
    const questionsNeeded = Math.min(3, staleCount - staleFetched);
    
    const topicQuestions = await fetchQuestions({
      section,
      topicId,
      count: questionsNeeded * 2,
      excludeIds: Array.from(usedIds),
    });
    
    for (const q of topicQuestions) {
      if (staleFetched >= staleCount) break;
      if (usedIds.has(q.id)) continue;
      result.push(q);
      usedIds.add(q.id);
      staleFetched++;
    }
    
    if (staleFetched > 0) {
      breakdown.push({
        topic: topic.topic,
        count: staleFetched,
        reason: 'Not practiced recently',
      });
    }
  }
  
  // 4. Fill remainder with random questions for variety
  const varietyNeeded = count - result.length;
  if (varietyNeeded > 0) {
    const randomQuestions = await fetchQuestions({
      section,
      count: varietyNeeded * 2,
      excludeIds: Array.from(usedIds),
    });
    
    let varietyFetched = 0;
    for (const q of randomQuestions) {
      if (varietyFetched >= varietyNeeded) break;
      if (usedIds.has(q.id)) continue;
      result.push(q);
      usedIds.add(q.id);
      varietyFetched++;
    }
    
    if (varietyFetched > 0) {
      breakdown.push({
        topic: 'Mixed Practice',
        count: varietyFetched,
        reason: 'Variety for well-rounded preparation',
      });
    }
  }
  
  return { questions: shuffleArray(result), breakdown };
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
