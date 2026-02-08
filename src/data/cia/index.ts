
import { Question } from '../../types';
import { ALL_CIA1_QUESTIONS, ALL_CIA2_QUESTIONS, ALL_CIA3_QUESTIONS } from './questions';

export const CIA_QUESTIONS: Question[] = [
  ...ALL_CIA1_QUESTIONS,
  ...ALL_CIA2_QUESTIONS,
  ...ALL_CIA3_QUESTIONS
];

export * from './questions';

export function getAllCIAQuestions(): Question[] {
  return CIA_QUESTIONS;
}
