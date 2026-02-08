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
import { ExamSection, Difficulty, normalizeDifficulty } from '../../../types';
import { FAR_QUESTIONS_EXTENDED } from './far-questions-extended';
import { AUD_QUESTIONS_EXTENDED } from './aud-questions-extended';
/** @deprecated Legacy BEC content */
import { BEC_QUESTIONS_EXTENDED } from './bec-questions-extended';

// Extended banks for new disciplines (2024+ CPA Evolution)
import { TCP_QUESTIONS_EXTENDED } from './tcp-questions-extended';
import { ISC_QUESTIONS_EXTENDED } from './isc-questions-extended';
import { BAR_QUESTIONS_EXTENDED } from './bar-questions-extended';

// Extra question banks (Sprint 5 expansion)
import { REG_QUESTIONS_EXTRA } from './reg-questions-extra';
import { FAR_QUESTIONS_EXTRA } from './far-questions-extra';
import { AUD_QUESTIONS_EXTRA } from './aud-questions-extra';
/** @deprecated Legacy BEC content */
import { BEC_QUESTIONS_EXTRA } from './bec-questions-extra';

// Additional question banks (World-Class expansion)
import { REG_QUESTIONS_ADDITIONAL } from './reg-questions-additional';
import { FAR_QUESTIONS_ADDITIONAL } from './far-questions-additional';
import { AUD_QUESTIONS_ADDITIONAL } from './aud-questions-additional';
import { BAR_QUESTIONS_ADDITIONAL } from './bar-questions-additional';
import { ISC_QUESTIONS_ADDITIONAL } from './isc-questions-additional';
import { TCP_QUESTIONS_ADDITIONAL } from './tcp-questions-additional';

// Expanded question banks (World-Class expansion - batch 2)
import { REG_QUESTIONS_EXPANDED } from './reg-questions-expanded';
import { FAR_QUESTIONS_EXPANDED as FAR_QUESTIONS_EXPANDED_2 } from './far-questions-expanded';
import { AUD_QUESTIONS_EXPANDED as AUD_QUESTIONS_EXPANDED_2 } from './aud-questions-expanded';
import { BAR_QUESTIONS_EXPANDED } from './bar-questions-expanded';
import { ISC_QUESTIONS_EXPANDED as ISC_QUESTIONS_EXPANDED_2 } from './isc-questions-expanded';
import { TCP_QUESTIONS_EXPANDED as TCP_QUESTIONS_EXPANDED_2 } from './tcp-questions-expanded';

// Comprehensive question banks (World-Class expansion - final batch)
import { REG_QUESTIONS_COMPREHENSIVE } from './reg-questions-comprehensive';
import { FAR_QUESTIONS_COMPREHENSIVE } from './far-questions-comprehensive';
import { AUD_QUESTIONS_COMPREHENSIVE } from './aud-questions-comprehensive';
import { BAR_QUESTIONS_COMPREHENSIVE } from './bar-questions-comprehensive';
import { ISC_QUESTIONS_COMPREHENSIVE } from './isc-questions-comprehensive';
import { TCP_QUESTIONS_COMPREHENSIVE } from './tcp-questions-comprehensive';

// Mastery question banks (World-Class expansion - expert level)
import { REG_QUESTIONS_MASTERY } from './reg-questions-mastery';
import { FAR_QUESTIONS_MASTERY } from './far-questions-mastery';
import { AUD_QUESTIONS_MASTERY } from './aud-questions-mastery';
import { BAR_QUESTIONS_MASTERY } from './bar-questions-mastery';
import { ISC_QUESTIONS_MASTERY } from './isc-questions-mastery';
import { TCP_QUESTIONS_MASTERY } from './tcp-questions-mastery';

// Elite question banks (World-Class expansion - final push to 2500+)
import { REG_QUESTIONS_ELITE } from './reg-questions-elite';
import { FAR_QUESTIONS_ELITE } from './far-questions-elite';
import { AUD_QUESTIONS_ELITE } from './aud-questions-elite';
import { BAR_QUESTIONS_ELITE } from './bar-questions-elite';
import { ISC_QUESTIONS_ELITE } from './isc-questions-elite';
import { TCP_QUESTIONS_ELITE } from './tcp-questions-elite';

// Quality Sprint: Coverage gap and difficulty balance improvements
import { FAR_QUESTIONS_GOVT } from './far-questions-govt';
import { AUD_QUESTIONS_REPORTING } from './aud-questions-reporting';
import { BAR_QUESTIONS_PLANNING } from './bar-questions-planning';
import { EASY_QUESTIONS } from './easy-questions';
import { EASY_QUESTIONS_EXPANDED } from './easy-questions-expanded';
import { EASY_QUESTIONS_EXPANDED_2 } from './easy-questions-expanded-2';
import { TCP_EASY_QUESTIONS, BAR_EASY_QUESTIONS, ISC_EASY_QUESTIONS } from './easy-questions-tcp-bar-isc';
import { FAR_EASY_QUESTIONS_SPRINT, AUD_EASY_QUESTIONS_SPRINT, REG_EASY_QUESTIONS_SPRINT } from './easy-questions-far-aud-reg';

// Blueprint gap fill questions (AUD-VII, ISC-V)
import { AUD_VII_GAP_QUESTIONS, ISC_V_GAP_QUESTIONS } from './blueprint-gap-fill';

// World-Class Sprint: Exam-quality MCQs with detailed explanations
import { FAR_QUESTIONS_WORLD_CLASS } from './far-questions-world-class';
import { AUD_QUESTIONS_WORLD_CLASS } from './aud-questions-world-class';
import { REG_QUESTIONS_WORLD_CLASS } from './reg-questions-world-class';
import { TCP_QUESTIONS_WORLD_CLASS } from './tcp-questions-world-class';
import { BAR_QUESTIONS_WORLD_CLASS } from './bar-questions-world-class';
import { ISC_QUESTIONS_WORLD_CLASS } from './isc-questions-world-class';

// Combine all easy questions for filtering
const ALL_EASY_QUESTIONS = [...EASY_QUESTIONS, ...EASY_QUESTIONS_EXPANDED, ...EASY_QUESTIONS_EXPANDED_2, ...TCP_EASY_QUESTIONS, ...BAR_EASY_QUESTIONS, ...ISC_EASY_QUESTIONS, ...FAR_EASY_QUESTIONS_SPRINT, ...AUD_EASY_QUESTIONS_SPRINT, ...REG_EASY_QUESTIONS_SPRINT];

// Combined section questions (original + extended + extra + additional + expanded + comprehensive + mastery + elite + quality sprint + world-class)
export const REG_ALL = [...REG_QUESTIONS, ...REG_QUESTIONS_EXTENDED, ...REG_QUESTIONS_EXTRA, ...REG_QUESTIONS_ADDITIONAL, ...REG_QUESTIONS_EXPANDED, ...REG_QUESTIONS_COMPREHENSIVE, ...REG_QUESTIONS_MASTERY, ...REG_QUESTIONS_ELITE, ...REG_QUESTIONS_WORLD_CLASS, ...ALL_EASY_QUESTIONS.filter(q => q.section === 'REG')];
export const FAR_ALL = [...FAR_QUESTIONS, ...FAR_QUESTIONS_EXTENDED, ...FAR_QUESTIONS_EXTRA, ...FAR_QUESTIONS_ADDITIONAL, ...FAR_QUESTIONS_EXPANDED_2, ...FAR_QUESTIONS_COMPREHENSIVE, ...FAR_QUESTIONS_MASTERY, ...FAR_QUESTIONS_ELITE, ...FAR_QUESTIONS_GOVT, ...FAR_QUESTIONS_WORLD_CLASS, ...ALL_EASY_QUESTIONS.filter(q => q.section === 'FAR')];
export const AUD_ALL = [...AUD_QUESTIONS, ...AUD_QUESTIONS_EXTENDED, ...AUD_QUESTIONS_EXTRA, ...AUD_QUESTIONS_ADDITIONAL, ...AUD_QUESTIONS_EXPANDED_2, ...AUD_QUESTIONS_COMPREHENSIVE, ...AUD_QUESTIONS_MASTERY, ...AUD_QUESTIONS_ELITE, ...AUD_QUESTIONS_REPORTING, ...AUD_VII_GAP_QUESTIONS, ...AUD_QUESTIONS_WORLD_CLASS, ...ALL_EASY_QUESTIONS.filter(q => q.section === 'AUD')];

// New discipline question banks (2024+ CPA Evolution)
export const BAR_ALL = [...BAR_QUESTIONS, ...BAR_QUESTIONS_EXTENDED, ...BAR_QUESTIONS_ADDITIONAL, ...BAR_QUESTIONS_EXPANDED, ...BAR_QUESTIONS_COMPREHENSIVE, ...BAR_QUESTIONS_MASTERY, ...BAR_QUESTIONS_ELITE, ...BAR_QUESTIONS_PLANNING, ...BAR_QUESTIONS_WORLD_CLASS, ...ALL_EASY_QUESTIONS.filter(q => q.section === 'BAR')];
export const ISC_ALL = [...ISC_QUESTIONS, ...ISC_QUESTIONS_EXTENDED, ...ISC_QUESTIONS_ADDITIONAL, ...ISC_QUESTIONS_EXPANDED_2, ...ISC_QUESTIONS_COMPREHENSIVE, ...ISC_QUESTIONS_MASTERY, ...ISC_QUESTIONS_ELITE, ...ISC_V_GAP_QUESTIONS, ...ISC_QUESTIONS_WORLD_CLASS, ...ALL_EASY_QUESTIONS.filter(q => q.section === 'ISC')];
export const TCP_ALL = [...TCP_QUESTIONS, ...TCP_QUESTIONS_EXTENDED, ...TCP_QUESTIONS_ADDITIONAL, ...TCP_QUESTIONS_EXPANDED_2, ...TCP_QUESTIONS_COMPREHENSIVE, ...TCP_QUESTIONS_MASTERY, ...TCP_QUESTIONS_ELITE, ...TCP_QUESTIONS_WORLD_CLASS, ...ALL_EASY_QUESTIONS.filter(q => q.section === 'TCP')];

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
