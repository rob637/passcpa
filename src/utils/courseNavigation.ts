/**
 * Course-aware navigation utilities
 * Provides centralized course-specific path resolution to prevent course bleeding
 */

import { CourseId } from '../types/course';

// Course-specific navigation paths
export const COURSE_HOME_PATHS: Record<CourseId, string> = {
  cpa: '/home',
  ea: '/ea',
  cma: '/cma/dashboard',
  cia: '/cia/dashboard',
  cfp: '/cfp/dashboard',
  cisa: '/cisa/dashboard',
};

export const COURSE_DASHBOARD_PATHS: Record<CourseId, string> = {
  cpa: '/home',
  ea: '/ea',
  cma: '/cma/dashboard',
  cia: '/cia/dashboard',
  cfp: '/cfp/dashboard',
  cisa: '/cisa/dashboard',
};

// Course-specific learn paths (sections/lessons entry point)
export const COURSE_LEARN_PATHS: Record<CourseId, string> = {
  cpa: '/learn',
  ea: '/ea/section/SEE1',
  cma: '/cma/section/CMA1',
  cia: '/cia/section/CIA1',
  cfp: '/cfp/domain/CFP-GEN',
  cisa: '/cisa/section/CISA1',
};

// Course-specific practice paths
export const COURSE_PRACTICE_PATHS: Record<CourseId, string> = {
  cpa: '/practice',
  ea: '/practice',
  cma: '/practice',
  cia: '/practice',
  cfp: '/practice',
  cisa: '/practice',
};

// Course-specific flashcard paths
export const COURSE_FLASHCARD_PATHS: Record<CourseId, string> = {
  cpa: '/flashcards',
  ea: '/flashcards',
  cma: '/flashcards',
  cia: '/flashcards',
  cfp: '/flashcards',
  cisa: '/flashcards',
};

// Course-specific quiz paths
export const COURSE_QUIZ_PATHS: Record<CourseId, string> = {
  cpa: '/quiz',
  ea: '/quiz',
  cma: '/quiz',
  cia: '/quiz',
  cfp: '/quiz',
  cisa: '/quiz',
};

// Course-specific exam paths
export const COURSE_EXAM_PATHS: Record<CourseId, string> = {
  cpa: '/exam',
  ea: '/ea-exam',
  cma: '/cma-exam',
  cia: '/cia-exam',
  cfp: '/cfp-exam',
  cisa: '/cisa-exam',
};

// Course-specific TBS paths
export const COURSE_TBS_PATHS: Record<CourseId, string> = {
  cpa: '/tbs',
  ea: '/tbs', // EA doesn't have TBS but fallback
  cma: '/tbs',
  cia: '/tbs',
  cfp: '/tbs',
  cisa: '/tbs',
};

// Course-specific Essay/CBQ paths
export const COURSE_ESSAY_PATHS: Record<CourseId, string> = {
  cpa: '/wc', // Written Communications
  ea: '/ea', // EA doesn't have essays
  cma: '/cma/essay', // CMA Essay/CBQ Simulator
  cia: '/cia', // CIA doesn't have essays
  cfp: '/cfp', // CFP doesn't have essays
  cisa: '/cisa', // CISA doesn't have essays
};

// Course-specific CBQ paths (CMA only - effective Sept 2026)
export const COURSE_CBQ_PATHS: Record<CourseId, string> = {
  cpa: '/', // CPA doesn't have CBQ
  ea: '/', // EA doesn't have CBQ
  cma: '/cma/cbq', // CMA CBQ Simulator
  cia: '/', // CIA doesn't have CBQ
  cfp: '/', // CFP doesn't have CBQ
  cisa: '/', // CISA doesn't have CBQ
};

// Course-specific Case Study paths (CFP only)
export const COURSE_CASE_STUDY_PATHS: Record<CourseId, string> = {
  cpa: '/', // CPA doesn't have case studies
  ea: '/', // EA doesn't have case studies
  cma: '/', // CMA doesn't have case studies
  cia: '/', // CIA doesn't have case studies
  cfp: '/cfp/cases', // CFP Case Study Simulator
  cisa: '/', // CISA doesn't have case studies
};

// Get the home path for a specific course
export function getCourseHomePath(courseId: CourseId): string {
  return COURSE_HOME_PATHS[courseId] || '/home';
}

// Get the learn/lessons path for a specific course
export function getCourseLearnPath(courseId: CourseId, sectionId?: string): string {
  if (courseId === 'cpa') {
    return sectionId ? `/learn?section=${sectionId}` : '/learn';
  }
  if (sectionId) {
    // Build section-specific path for non-CPA courses
    switch (courseId) {
      case 'ea':
        return `/ea/section/${sectionId}`;
      case 'cma':
        return `/cma/section/${sectionId}`;
      case 'cia':
        return `/cia/section/${sectionId}`;
      case 'cfp':
        return `/cfp/domain/${sectionId}`;
      case 'cisa':
        return `/cisa/section/${sectionId}`;
      default:
        return COURSE_LEARN_PATHS[courseId] || '/learn';
    }
  }
  return COURSE_LEARN_PATHS[courseId] || '/learn';
}

// Get the practice path for a specific course
export function getCoursePracticePath(courseId: CourseId): string {
  return COURSE_PRACTICE_PATHS[courseId] || '/practice';
}

// Get the flashcard path for a specific course
export function getCourseFlashcardPath(courseId: CourseId): string {
  return COURSE_FLASHCARD_PATHS[courseId] || '/flashcards';
}

// Get the quiz path for a specific course
export function getCourseQuizPath(courseId: CourseId): string {
  return COURSE_QUIZ_PATHS[courseId] || '/quiz';
}

// Get the mock exam path for a specific course
export function getCourseExamPath(courseId: CourseId): string {
  return COURSE_EXAM_PATHS[courseId] || '/exam';
}

// Get the TBS path for a specific course
export function getCourseTBSPath(courseId: CourseId): string {
  return COURSE_TBS_PATHS[courseId] || '/tbs';
}

// Get the Essay/CBQ path for a specific course
export function getCourseEssayPath(courseId: CourseId): string {
  return COURSE_ESSAY_PATHS[courseId] || '/';  
}

// Get the CBQ path for a specific course (CMA only)
export function getCourseCBQPath(courseId: CourseId): string {
  return COURSE_CBQ_PATHS[courseId] || '/';
}

// Get the Case Study path for a specific course (CFP only)
export function getCourseCaseStudyPath(courseId: CourseId): string {
  return COURSE_CASE_STUDY_PATHS[courseId] || '/';
}

// Get the lesson path for a specific course and lesson
export function getCourseLessonPath(_courseId: CourseId, lessonId: string): string {
  // All courses use /lessons/:lessonId since routing is shared
  return `/lessons/${lessonId}`;
}

// Get the AI tutor path (course-aware via query string)
export function getCourseAITutorPath(_courseId: CourseId): string {
  // All courses share /ai-tutor but context is determined by CourseProvider
  return '/ai-tutor';
}

// Detect course from pathname
export function detectCourseFromPath(pathname: string): CourseId {
  if (pathname.startsWith('/ea')) return 'ea';
  if (pathname.startsWith('/cma')) return 'cma';
  if (pathname.startsWith('/cia')) return 'cia';
  if (pathname.startsWith('/cfp')) return 'cfp';
  if (pathname.startsWith('/cisa')) return 'cisa';
  return 'cpa'; // Default to CPA for /home, /learn, /you, etc.
}

// Get the home path based on current pathname
export function getHomePathFromLocation(pathname: string): string {
  const courseId = detectCourseFromPath(pathname);
  return getCourseHomePath(courseId);
}

// Hook helper - for use in components (they should use the hook below)
export function getCoursePath(courseId: CourseId, path: 'home' | 'dashboard'): string {
  switch (path) {
    case 'home':
    case 'dashboard':
      return COURSE_HOME_PATHS[courseId];
    default:
      return COURSE_HOME_PATHS[courseId];
  }
}
