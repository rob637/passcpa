
import { Question } from '../../types/question';
import { CIA1_QUESTIONS } from './questions/cia1-questions';
import { CIA2_QUESTIONS } from './questions/cia2-questions';
import { CIA3_QUESTIONS } from './questions/cia3-questions';

export const CIA_QUESTIONS: Question[] = [
  ...CIA1_QUESTIONS,
  ...CIA2_QUESTIONS,
  ...CIA3_QUESTIONS
];

export * from './questions';

export function getAllCIAQuestions(): Question[] {
  return CIA_QUESTIONS;
}
