
import type { CourseData } from '../../types/courseData';
// NOTE: Questions are NOT eagerly imported — see CPA index.ts for rationale.
// Use `loadSectionQuestions('cia', 'CIA1')` from courseDataLoader at runtime.
import { ALL_CIA_FLASHCARDS } from './flashcards';
import { ALL_CIA_LESSONS } from './lessons';
import { ciaCheatsheets } from './cheatsheets';

/** Standard course data export — required by courseDataLoader */
export const COURSE_DATA: CourseData = {
  courseId: 'cia',
  flashcards: ALL_CIA_FLASHCARDS,
  lessons: ALL_CIA_LESSONS,
  cheatsheets: Object.values(ciaCheatsheets),
};

// `./questions` intentionally NOT re-exported (would defeat lazy loading).
// `getAllCIAQuestions()` removed — use `loadAllCourseQuestions('cia')` from
// services/courseDataLoader instead. No callers remain.
