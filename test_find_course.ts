import { COURSES } from './src/courses';

function findCourseIdBySection(sectionId: string): string | null {
  for (const [courseId, course] of Object.entries(COURSES)) {
    if (course.sections.some(s => s.id === sectionId)) {
      return courseId;
    }
    // Prefix fallback like CFP-Gen
    if (sectionId.startsWith(courseId.toUpperCase() + '-')) {
      return courseId;
    }
  }
  return null;
}

console.log('FAR:', findCourseIdBySection('FAR'));
console.log('CISA1:', findCourseIdBySection('CISA1'));
console.log('CFP-Gen:', findCourseIdBySection('CFP-Gen'));
