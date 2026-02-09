// Comprehensive CPA Exam Lesson Content
// Structured lessons for all exam sections
// BEC was retired December 15, 2023 - content migrated to BAR

import { prepLessons } from './prep';
import { farLessons } from './far';
import { audLessons } from './aud';
import { regLessons } from './reg';
import { barLessons } from './bar';
import { iscLessons } from './isc';
import { tcpLessons } from './tcp';
import { Lesson } from '../../../types';

export const LESSONS: Record<string, Lesson[]> = {
  prep: prepLessons,
  // ==========================================
  // FAR - FINANCIAL ACCOUNTING AND REPORTING
  // ==========================================
  far: farLessons,

  // ==========================================
  // AUD - AUDITING AND ATTESTATION
  // ==========================================
  aud: audLessons,

  // ==========================================
  // REG - REGULATION
  // ==========================================
  reg: regLessons,

  // ==========================================
  // BAR - BUSINESS ANALYSIS AND REPORTING
  // Includes managerial accounting content (migrated from retired BEC)
  // ==========================================
  bar: barLessons,

  // ==========================================
  // ISC - INFORMATION SYSTEMS AND CONTROLS
  // ==========================================
  isc: iscLessons,

  // ==========================================
  // TCP - TAX COMPLIANCE AND PLANNING
  // ==========================================
  tcp: tcpLessons,

};

// Helper function to get all lessons
export const getAllLessons = (): Lesson[] => {
  return [...(LESSONS.prep || []), ...LESSONS.far, ...LESSONS.aud, ...LESSONS.reg, ...(LESSONS.bar || []), ...(LESSONS.isc || []), ...(LESSONS.tcp || [])];
};

// Get lessons by section (sorted by order)
export const getLessonsBySection = (section: string): Lesson[] => {
  const lessons = LESSONS[section.toLowerCase()] || [];
  // Sort by order to ensure correct sequence
  return [...lessons].sort((a, b) => (a.order || 0) - (b.order || 0));
};

// Get lesson by ID
export const getLessonById = (lessonId: string): Lesson | undefined => {
  const allLessons = getAllLessons();
  return allLessons.find((lesson) => lesson.id === lessonId);
};

// Get lesson stats
export const getLessonStats = () => {
  return {
    total: getAllLessons().length,
    bySection: {
      PREP: (LESSONS.prep || []).length,
      FAR: LESSONS.far.length,
      AUD: LESSONS.aud.length,
      REG: LESSONS.reg.length,
      BAR: (LESSONS.bar || []).length,
      ISC: (LESSONS.isc || []).length,
      TCP: (LESSONS.tcp || []).length,
    },
  };
};

export default LESSONS;
