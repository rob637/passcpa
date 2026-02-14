
import { Question } from '../../types';
import type { CourseData } from '../../types/courseData';
import { ALL_CIA1_QUESTIONS, ALL_CIA2_QUESTIONS, ALL_CIA3_QUESTIONS } from './questions';
import { ALL_CIA_FLASHCARDS } from './flashcards';
import { ALL_CIA_LESSONS } from './lessons';
import { ciaCheatsheets } from './cheatsheets';

export const CIA_QUESTIONS: Question[] = [
  ...ALL_CIA1_QUESTIONS,
  ...ALL_CIA2_QUESTIONS,
  ...ALL_CIA3_QUESTIONS
];

/** Standard course data export — required by courseDataLoader */
export const COURSE_DATA: CourseData = {
  courseId: 'cia',
  questions: CIA_QUESTIONS,
  flashcards: ALL_CIA_FLASHCARDS,
  lessons: ALL_CIA_LESSONS,
  cheatsheets: Object.values(ciaCheatsheets),
};

export * from './questions';

export function getAllCIAQuestions(): Question[] {
  return CIA_QUESTIONS;
}
