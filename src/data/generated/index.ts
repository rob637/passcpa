// Auto-generated CPA Question Bank Index
// DO NOT EDIT DIRECTLY - Run: npm run qbank build
// Generated at: 2026-02-25T20:34:52.146Z

import { FAR_QUESTIONS } from './far-questions';
import { AUD_QUESTIONS } from './aud-questions';
import { REG_QUESTIONS } from './reg-questions';
import { BAR_QUESTIONS } from './bar-questions';
import { ISC_QUESTIONS } from './isc-questions';
import { TCP_QUESTIONS } from './tcp-questions';

// Re-export all sections
export { FAR_QUESTIONS, AUD_QUESTIONS, REG_QUESTIONS, BAR_QUESTIONS, ISC_QUESTIONS, TCP_QUESTIONS };

// Combined array of all questions
export const ALL_CPA_QUESTIONS = [
  ...FAR_QUESTIONS,
  ...AUD_QUESTIONS,
  ...REG_QUESTIONS,
  ...BAR_QUESTIONS,
  ...ISC_QUESTIONS,
  ...TCP_QUESTIONS,
];

// Section metadata
export const CPA_QUESTION_COUNTS = {
  FAR: 1497,
  AUD: 1461,
  REG: 1460,
  BAR: 1610,
  ISC: 1482,
  TCP: 1480,
  TOTAL: 8990,
};
