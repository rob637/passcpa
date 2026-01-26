// Question Bank Index
// Consolidates all section questions for easy import
// Updated for 2024+ CPA Evolution: Added BAR, ISC, TCP disciplines

import { REG_QUESTIONS } from './reg-questions';
import { FAR_QUESTIONS } from './far-questions';
import { AUD_QUESTIONS } from './aud-questions';

// 2024+ CPA Evolution Disciplines (replaced BEC)
import { BAR_QUESTIONS } from './bar-questions';
import { ISC_QUESTIONS } from './isc-questions';
import { TCP_QUESTIONS } from './tcp-questions';

/** @deprecated BEC was replaced by BAR/ISC/TCP in 2024 CPA Evolution. Retained for legacy support. */
import { BEC_QUESTIONS } from './bec-questions';

// Extended question banks
import { REG_QUESTIONS_EXTENDED } from './reg-questions-extended';
import { ExamSection, QuestionDifficulty, Difficulty, normalizeDifficulty } from '../../types';
import { FAR_QUESTIONS_EXTENDED } from './far-questions-extended';
import { AUD_QUESTIONS_EXTENDED } from './aud-questions-extended';
/** @deprecated Legacy BEC content */
import { BEC_QUESTIONS_EXTENDED } from './bec-questions-extended';

// Extra question banks (Sprint 5 expansion)
import { REG_QUESTIONS_EXTRA } from './reg-questions-extra';
import { FAR_QUESTIONS_EXTRA } from './far-questions-extra';
import { AUD_QUESTIONS_EXTRA } from './aud-questions-extra';
/** @deprecated Legacy BEC content */
import { BEC_QUESTIONS_EXTRA } from './bec-questions-extra';

// Combined section questions (original + extended + extra)
export const REG_ALL = [...REG_QUESTIONS, ...REG_QUESTIONS_EXTENDED, ...REG_QUESTIONS_EXTRA];
export const FAR_ALL = [...FAR_QUESTIONS, ...FAR_QUESTIONS_EXTENDED, ...FAR_QUESTIONS_EXTRA];
export const AUD_ALL = [...AUD_QUESTIONS, ...AUD_QUESTIONS_EXTENDED, ...AUD_QUESTIONS_EXTRA];

// New discipline question banks (2024+ CPA Evolution)
export const BAR_ALL = [...BAR_QUESTIONS];
export const ISC_ALL = [...ISC_QUESTIONS];
export const TCP_ALL = [...TCP_QUESTIONS];

/** @deprecated BEC was replaced by BAR/ISC/TCP in 2024 CPA Evolution */
export const BEC_ALL = [...BEC_QUESTIONS, ...BEC_QUESTIONS_EXTENDED, ...BEC_QUESTIONS_EXTRA];

// Combined question bank (Core + Disciplines)
export const ALL_QUESTIONS = [
  ...REG_ALL, 
  ...FAR_ALL, 
  ...AUD_ALL, 
  ...BAR_ALL, 
  ...ISC_ALL, 
  ...TCP_ALL
];

/** @deprecated Includes legacy BEC - use ALL_QUESTIONS for current exam */
export const ALL_QUESTIONS_WITH_LEGACY = [...ALL_QUESTIONS, ...BEC_ALL];

// Export by section (original only for backward compatibility)
export { REG_QUESTIONS, FAR_QUESTIONS, AUD_QUESTIONS, BEC_QUESTIONS };

// Export new disciplines
export { BAR_QUESTIONS, ISC_QUESTIONS, TCP_QUESTIONS };

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
export const getQuestionsBySection = (section: ExamSection) => {
  switch (section) {
    case 'REG':
      return REG_ALL;
    case 'FAR':
      return FAR_ALL;
    case 'AUD':
      return AUD_ALL;
    case 'BAR':
      return BAR_ALL;
    case 'ISC':
      return ISC_ALL;
    case 'TCP':
      return TCP_ALL;
    case 'BEC':
      // @deprecated - Legacy support, BEC replaced by BAR/ISC/TCP in 2024
      return BEC_ALL;
    default:
      return [];
  }
};

/**
 * @deprecated Use getQuestionsBySection instead. BEC was replaced by BAR/ISC/TCP.
 */
export const getLegacyBECQuestions = () => BEC_ALL;

// Get questions by topic
export const getQuestionsByTopic = (topicId: string) => {
  return ALL_QUESTIONS.filter((q) => q.topicId === topicId);
};

// Get questions by difficulty (handles normalized difficulty matching)
export const getQuestionsByDifficulty = (difficulty: Difficulty) => {
  const normalized = normalizeDifficulty(difficulty);
  return ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === normalized);
};

// Get random questions
export const getRandomQuestions = (count: number, section: ExamSection | null = null) => {
  const pool = section ? getQuestionsBySection(section) : ALL_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get question statistics
export const getQuestionStats = () => {
  const stats = {
    total: ALL_QUESTIONS.length,
    bySection: {
      // Core sections
      REG: REG_ALL.length,
      FAR: FAR_ALL.length,
      AUD: AUD_ALL.length,
      // Discipline sections (2024+ CPA Evolution)
      BAR: BAR_ALL.length,
      ISC: ISC_ALL.length,
      TCP: TCP_ALL.length,
      // Legacy (deprecated)
      BEC: BEC_ALL.length,
    },
    byDifficulty: {
      easy: ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'easy').length,
      medium: ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'medium').length,
      hard: ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'hard').length,
    },
    topics: [...new Set(ALL_QUESTIONS.map((q) => q.topic))].length,
  };
  return stats;
};

export default ALL_QUESTIONS;
