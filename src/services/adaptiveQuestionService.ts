/**
 * Adaptive Question Service
 * 
 * Provides intelligent question selection for Daily Challenge and other adaptive modes.
 * Prioritizes:
 * 1. Questions from weak topics (user has low accuracy)
 * 2. Questions due for review (spaced repetition)
 * 3. New questions for topic coverage
 */

import { Question } from '../types';
import { CourseId } from '../types/course';
import { fetchQuestions } from './questionService';
import { COURSES } from '../courses';
import logger from '../utils/logger';

/**
 * Get adaptive questions for the Daily Challenge
 * Balances weak areas, due reviews, and new content
 */
export async function getAdaptiveQuestions(
  userId: string,
  courseId: CourseId,
  count: number
): Promise<Question[]> {
  try {
    const course = COURSES[courseId];
    if (!course) {
      logger.error(`Unknown course: ${courseId}`);
      return [];
    }
    
    // Get all sections for this course
    const sections = course.sections.map(s => s.id);
    
    // Collect questions from all sections with smart selection
    const allQuestions: Question[] = [];
    
    for (const section of sections) {
      const sectionQuestions = await fetchQuestions({
        section,
        userId,
        useSmartSelection: true,
        count: Math.ceil(count * 2), // Get extra from each section
        courseId,
      });
      allQuestions.push(...sectionQuestions);
    }
    
    // Shuffle and take requested count
    const shuffled = shuffleArray(allQuestions);
    
    // Prioritize variety - try to get questions from different sections
    const bySection = new Map<string, Question[]>();
    for (const q of shuffled) {
      const section = q.section;
      if (!bySection.has(section)) bySection.set(section, []);
      bySection.get(section)!.push(q);
    }
    
    // Round-robin selection from sections for variety
    const selected: Question[] = [];
    const sectionIterators = Array.from(bySection.values()).map(qs => ({ questions: qs, index: 0 }));
    
    while (selected.length < count && sectionIterators.some(it => it.index < it.questions.length)) {
      for (const iterator of sectionIterators) {
        if (selected.length >= count) break;
        if (iterator.index < iterator.questions.length) {
          selected.push(iterator.questions[iterator.index]);
          iterator.index++;
        }
      }
    }
    
    // If we still don't have enough, add remaining
    if (selected.length < count) {
      for (const q of shuffled) {
        if (selected.length >= count) break;
        if (!selected.includes(q)) {
          selected.push(q);
        }
      }
    }
    
    // Final shuffle so it's not always in section order
    return shuffleArray(selected).slice(0, count);
  } catch (error) {
    logger.error('Error getting adaptive questions:', error);
    
    // Fallback: return random questions from the first section
    const course = COURSES[courseId];
    if (course && course.sections.length > 0) {
      const fallback = await fetchQuestions({
        section: course.sections[0].id,
        count,
        courseId,
      });
      return fallback;
    }
    
    return [];
  }
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
