// Question Bank Index
// Consolidates all section questions for easy import

import { REG_QUESTIONS } from './reg-questions';
import { FAR_QUESTIONS } from './far-questions';
import { AUD_QUESTIONS } from './aud-questions';
import { BEC_QUESTIONS } from './bec-questions';

// Extended question banks
import { REG_QUESTIONS_EXTENDED } from './reg-questions-extended';
import { FAR_QUESTIONS_EXTENDED } from './far-questions-extended';
import { AUD_QUESTIONS_EXTENDED } from './aud-questions-extended';
import { BEC_QUESTIONS_EXTENDED } from './bec-questions-extended';

// Extra question banks (Sprint 5 expansion)
import { REG_QUESTIONS_EXTRA } from './reg-questions-extra';
import { FAR_QUESTIONS_EXTRA } from './far-questions-extra';
import { AUD_QUESTIONS_EXTRA } from './aud-questions-extra';
import { BEC_QUESTIONS_EXTRA } from './bec-questions-extra';

// Combined section questions (original + extended + extra)
export const REG_ALL = [...REG_QUESTIONS, ...REG_QUESTIONS_EXTENDED, ...REG_QUESTIONS_EXTRA];
export const FAR_ALL = [...FAR_QUESTIONS, ...FAR_QUESTIONS_EXTENDED, ...FAR_QUESTIONS_EXTRA];
export const AUD_ALL = [...AUD_QUESTIONS, ...AUD_QUESTIONS_EXTENDED, ...AUD_QUESTIONS_EXTRA];
export const BEC_ALL = [...BEC_QUESTIONS, ...BEC_QUESTIONS_EXTENDED, ...BEC_QUESTIONS_EXTRA];

// Combined question bank
export const ALL_QUESTIONS = [...REG_ALL, ...FAR_ALL, ...AUD_ALL, ...BEC_ALL];

// Export by section (original only for backward compatibility)
export { REG_QUESTIONS, FAR_QUESTIONS, AUD_QUESTIONS, BEC_QUESTIONS };

// Export extended
export {
  REG_QUESTIONS_EXTENDED,
  FAR_QUESTIONS_EXTENDED,
  AUD_QUESTIONS_EXTENDED,
  BEC_QUESTIONS_EXTENDED,
};

// Export extra (Sprint 5)
export { REG_QUESTIONS_EXTRA, FAR_QUESTIONS_EXTRA, AUD_QUESTIONS_EXTRA, BEC_QUESTIONS_EXTRA };

// Get questions by section (uses full question banks)
export const getQuestionsBySection = (section) => {
  switch (section) {
    case 'REG':
      return REG_ALL;
    case 'FAR':
      return FAR_ALL;
    case 'AUD':
      return AUD_ALL;
    case 'BEC':
      return BEC_ALL;
    default:
      return [];
  }
};

// Get questions by topic
export const getQuestionsByTopic = (topicId) => {
  return ALL_QUESTIONS.filter((q) => q.topicId === topicId);
};

// Get questions by difficulty
export const getQuestionsByDifficulty = (difficulty) => {
  return ALL_QUESTIONS.filter((q) => q.difficulty === difficulty);
};

// Get random questions
export const getRandomQuestions = (count, section = null) => {
  const pool = section ? getQuestionsBySection(section) : ALL_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get question statistics
export const getQuestionStats = () => {
  const stats = {
    total: ALL_QUESTIONS.length,
    bySection: {
      REG: REG_ALL.length,
      FAR: FAR_ALL.length,
      AUD: AUD_ALL.length,
      BEC: BEC_ALL.length,
    },
    byDifficulty: {
      easy: ALL_QUESTIONS.filter((q) => q.difficulty === 'easy').length,
      medium: ALL_QUESTIONS.filter((q) => q.difficulty === 'medium').length,
      hard: ALL_QUESTIONS.filter((q) => q.difficulty === 'hard').length,
    },
    topics: [...new Set(ALL_QUESTIONS.map((q) => q.topic))].length,
  };
  return stats;
};

export default ALL_QUESTIONS;
