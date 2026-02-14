#!/usr/bin/env npx tsx
/**
 * Runtime Content Counter
 * 
 * Imports actual TypeScript arrays and reports .length — the only reliable
 * counting method. Run with: npx tsx scripts/count-content.ts
 * 
 * Uses the standardized COURSE_DATA export from each course's index.ts.
 */

import { COURSE_DATA as CPA } from '../src/data/cpa';
import { COURSE_DATA as EA } from '../src/data/ea';
import { COURSE_DATA as CMA } from '../src/data/cma';
import { COURSE_DATA as CIA } from '../src/data/cia';
import { COURSE_DATA as CISA } from '../src/data/cisa';
import { COURSE_DATA as CFP } from '../src/data/cfp';
import type { CourseData } from '../src/types/courseData';

const COURSES: CourseData[] = [CPA, EA, CMA, CIA, CISA, CFP];

function printCourseStats(data: CourseData) {
  const id = data.courseId.toUpperCase();
  console.log(`\n${'═'.repeat(50)}`);
  console.log(`  ${id}`);
  console.log(`${'═'.repeat(50)}`);
  console.log(`  Questions:      ${data.questions.length}`);
  console.log(`  Flashcards:     ${data.flashcards.length}`);
  console.log(`  Lessons:        ${data.lessons.length}`);

  if (data.tbs?.length)                console.log(`  TBS:            ${data.tbs.length}`);
  if (data.essays?.length)             console.log(`  Essays:         ${data.essays.length}`);
  if (data.cbqs?.length)               console.log(`  CBQs:           ${data.cbqs.length}`);
  if (data.practiceSimulations?.length) console.log(`  Practice Sims:  ${data.practiceSimulations.length}`);
  if (data.caseStudies?.length)        console.log(`  Case Studies:   ${data.caseStudies.length}`);
  if (data.itemSets?.length)           console.log(`  Item Sets:      ${data.itemSets.length}`);
  if (data.calculatorProblems?.length) console.log(`  Calc Problems:  ${data.calculatorProblems.length}`);
  if (data.cheatsheets?.length)        console.log(`  Cheat Sheets:   ${data.cheatsheets.length}`);
  if (data.mockExams?.length)          console.log(`  Mock Exams:     ${data.mockExams.length}`);
}

console.log('\n╔══════════════════════════════════════════════════╗');
console.log('║        VoraPrep Content Stats (Runtime)         ║');
console.log('╚══════════════════════════════════════════════════╝');

let totalQuestions = 0;
let totalFlashcards = 0;
let totalLessons = 0;

for (const course of COURSES) {
  printCourseStats(course);
  totalQuestions += course.questions.length;
  totalFlashcards += course.flashcards.length;
  totalLessons += course.lessons.length;
}

console.log(`\n${'═'.repeat(50)}`);
console.log(`  TOTALS ACROSS ALL COURSES`);
console.log(`${'═'.repeat(50)}`);
console.log(`  Total Questions:   ${totalQuestions}`);
console.log(`  Total Flashcards:  ${totalFlashcards}`);
console.log(`  Total Lessons:     ${totalLessons}`);
console.log();

// Output JSON for programmatic use
console.log('\n--- JSON (for contentStats.ts) ---');
const json: Record<string, Record<string, number>> = {};
for (const course of COURSES) {
  json[course.courseId] = {
    questions: course.questions.length,
    flashcards: course.flashcards.length,
    lessons: course.lessons.length,
    ...(course.tbs?.length && { tbs: course.tbs.length }),
    ...(course.essays?.length && { essays: course.essays.length }),
    ...(course.cbqs?.length && { cbqs: course.cbqs.length }),
    ...(course.practiceSimulations?.length && { practiceSimulations: course.practiceSimulations.length }),
    ...(course.caseStudies?.length && { caseStudies: course.caseStudies.length }),
    ...(course.itemSets?.length && { itemSets: course.itemSets.length }),
    ...(course.calculatorProblems?.length && { calculatorProblems: course.calculatorProblems.length }),
    ...(course.cheatsheets?.length && { cheatsheets: course.cheatsheets.length }),
    ...(course.mockExams?.length && { mockExams: course.mockExams.length }),
  };
}
console.log(JSON.stringify(json, null, 2));
