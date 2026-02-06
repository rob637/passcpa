
import { Question } from '../../../types';
import { CISA1_QUESTIONS } from './cisa1-questions';
import { CISA2_QUESTIONS } from './cisa2-questions';
import { CISA3_QUESTIONS } from './cisa3-questions';
import { CISA4_QUESTIONS } from './cisa4-questions';
import { CISA5_QUESTIONS } from './cisa5-questions';

export const CISA_QUESTIONS: Question[] = [
  ...CISA1_QUESTIONS,
  ...CISA2_QUESTIONS,
  ...CISA3_QUESTIONS,
  ...CISA4_QUESTIONS,
  ...CISA5_QUESTIONS
];

export * from './cisa1-questions';
export * from './cisa2-questions';
export * from './cisa3-questions';
export * from './cisa4-questions';
export * from './cisa5-questions';
