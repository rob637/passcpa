/**
 * Test the Study Plan Generator V2
 * 
 * Run with: npx tsx scripts/test-study-plan-generator.ts
 */

import { addDays, format } from 'date-fns';
import { generateStudyPlan, validateInput } from '../src/services/studyPlanGeneratorV2';
import { getExamTotals, getExamSections, getSectionContent, getStudyPlanSections, resolveStudySection, getExamConfig } from '../src/services/contentRegistry';
import type { CourseId } from '../src/types/course';

function divider(title: string) {
  console.log('\n' + '='.repeat(80));
  console.log(` ${title}`);
  console.log('='.repeat(80));
}

function testValidation() {
  divider('VALIDATION TESTS');
  
  // Test invalid section
  const invalid1 = validateInput({
    courseId: 'cpa',
    section: 'INVALID',
    examDate: addDays(new Date(), 60),
    hoursPerDay: 3,
    studyDaysPerWeek: 5,
    experience: 'some',
  });
  console.log('Invalid section:', invalid1.valid ? 'FAIL' : 'PASS', invalid1.errors);
  
  // Test past exam date
  const invalid2 = validateInput({
    courseId: 'cpa',
    section: 'FAR',
    examDate: addDays(new Date(), -1),
    hoursPerDay: 3,
    studyDaysPerWeek: 5,
    experience: 'some',
  });
  console.log('Past exam date:', invalid2.valid ? 'FAIL' : 'PASS', invalid2.errors);
  
  // Test valid input with warning
  const valid1 = validateInput({
    courseId: 'cpa',
    section: 'FAR',
    examDate: addDays(new Date(), 10),
    hoursPerDay: 3,
    studyDaysPerWeek: 5,
    experience: 'some',
  });
  console.log('Short timeline (valid with warning):', valid1.valid ? 'PASS' : 'FAIL', 'Warnings:', valid1.warnings);
}

function testSinglePlan() {
  divider('SINGLE PLAN TEST: FAR (CPA) - 12 weeks, 3 hrs/day, 5 days/week');
  
  const plan = generateStudyPlan({
    courseId: 'cpa',
    section: 'FAR',
    examDate: addDays(new Date(), 84), // 12 weeks
    hoursPerDay: 3,
    studyDaysPerWeek: 5,
    experience: 'some',
  });
  
  console.log('\n📋 Plan Summary:');
  console.log(`   Section: ${plan.sectionName}`);
  console.log(`   Duration: ${plan.totalWeeks} weeks (${plan.totalDays} days)`);
  console.log(`   Hours Needed: ${plan.hoursNeeded}h`);
  console.log(`   Hours Available: ${plan.hoursAvailable}h`);
  
  console.log('\n📊 Content to Cover:');
  console.log(`   Lessons: ${plan.contentCounts.lessons}`);
  console.log(`   MCQs: ${plan.contentCounts.mcqs}`);
  console.log(`   TBS: ${plan.contentCounts.tbs}`);
  console.log(`   Flashcards: ${plan.contentCounts.flashcards}`);
  
  console.log('\n⚠️ Reality Check:');
  console.log(`   Severity: ${plan.realityCheck.severity}`);
  console.log(`   Message: ${plan.realityCheck.message}`);
  if (plan.realityCheck.recommendations.length > 0) {
    console.log('   Recommendations:');
    plan.realityCheck.recommendations.forEach(r => {
      console.log(`     - ${r.label}: ${r.description}`);
    });
  }
  
  console.log('\n📅 Weekly Plan:');
  console.log('   Week | Phase           | Lessons | MCQs  | TBS | Flash | Mock | Total');
  console.log('   ' + '-'.repeat(75));
  
  for (const week of plan.weeks) {
    const g = week.goals;
    console.log(
      `   ${String(week.weekNumber).padStart(2)}   | ` +
      `${week.phase.padEnd(14)} | ` +
      `${String(g.lessons).padStart(7)} | ` +
      `${String(g.mcqs).padStart(5)} | ` +
      `${String(g.tbs).padStart(3)} | ` +
      `${String(g.flashcards).padStart(5)} | ` +
      `${String(g.mockExams).padStart(4)} | ` +
      `${(g.totalMinutes / 60).toFixed(1)}h`
    );
  }
  
  // Verify all content is distributed
  const totalLessons = plan.weeks.reduce((sum, w) => sum + w.goals.lessons, 0);
  const totalMcqs = plan.weeks.reduce((sum, w) => sum + w.goals.mcqs, 0);
  const totalTbs = plan.weeks.reduce((sum, w) => sum + w.goals.tbs, 0);
  const totalFlashcards = plan.weeks.reduce((sum, w) => sum + w.goals.flashcards, 0);
  const totalMocks = plan.weeks.reduce((sum, w) => sum + w.goals.mockExams, 0);
  
  console.log('\n✅ Content Distribution Check:');
  console.log(`   Lessons distributed: ${totalLessons} / ${plan.contentCounts.lessons}`);
  console.log(`   MCQs distributed: ${totalMcqs} (adaptive coverage applied)`);
  console.log(`   TBS distributed: ${totalTbs} / ${plan.contentCounts.tbs}`);
  console.log(`   Flashcards distributed: ${totalFlashcards} / ${plan.contentCounts.flashcards}`);
  console.log(`   Mock exams scheduled: ${totalMocks}`);
  
  console.log('\n🎯 Milestones:');
  for (const milestone of plan.milestones.slice(0, 8)) {
    console.log(`   ${format(milestone.date, 'MMM d')}: ${milestone.label}`);
  }
}

function testAllExams() {
  divider('ALL EXAMS TEST - Using Correct Study Plan Sections');
  
  // Build the correct list of sections using our new API
  const courses: CourseId[] = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
  const examSections: { courseId: CourseId, section: string }[] = [];
  
  for (const courseId of courses) {
    const info = getStudyPlanSections(courseId);
    for (const section of info.sections) {
      examSections.push({ courseId, section });
    }
  }
  
  console.log(`\n📋 Testing ${examSections.length} study plan configurations`);
  console.log('   (CISA and CFP now use full-exam aggregated sections)\n');
  
  console.log(' Section     | Lessons | MCQs  | TBS | Flash | Hrs Needed | Hrs Avail | Reality');
  console.log(' ' + '-'.repeat(85));
  
  let successCount = 0;
  let failCount = 0;
  
  for (const { courseId, section } of examSections) {
    try {
      const plan = generateStudyPlan({
        courseId,
        section,
        examDate: addDays(new Date(), 84),
        hoursPerDay: 3,
        studyDaysPerWeek: 5,
        experience: 'some',
      });
      
      const reality = plan.realityCheck.severity === 'good' ? '✅' :
                      plan.realityCheck.severity === 'tight' ? '⚠️' :
                      plan.realityCheck.severity === 'challenging' ? '🟠' : '🔴';
      
      console.log(
        ` ${section.padEnd(10)} | ` +
        `${String(plan.contentCounts.lessons).padStart(7)} | ` +
        `${String(plan.contentCounts.mcqs).padStart(5)} | ` +
        `${String(plan.contentCounts.tbs).padStart(3)} | ` +
        `${String(plan.contentCounts.flashcards).padStart(5)} | ` +
        `${String(plan.hoursNeeded).padStart(10)}h | ` +
        `${String(plan.hoursAvailable).padStart(9)}h | ` +
        `${reality} ${plan.realityCheck.severity}`
      );
      successCount++;
    } catch (error) {
      console.log(` ${section.padEnd(10)} | ERROR: ${error}`);
      failCount++;
    }
  }
  
  console.log(`\n✅ Success: ${successCount} / ${examSections.length}`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount}`);
  }
}

function testTimelines() {
  divider('TIMELINE COMPARISON - FAR at different durations');
  
  const timelines = [
    { weeks: 4, description: '1 month (aggressive)' },
    { weeks: 8, description: '2 months (standard)' },
    { weeks: 12, description: '3 months (comfortable)' },
    { weeks: 16, description: '4 months (relaxed)' },
  ];
  
  console.log('\n Timeline    | Reality     | Hrs Need | Hrs Avail | Message');
  console.log(' ' + '-'.repeat(90));
  
  for (const { weeks, description } of timelines) {
    const plan = generateStudyPlan({
      courseId: 'cpa',
      section: 'FAR',
      examDate: addDays(new Date(), weeks * 7),
      hoursPerDay: 3,
      studyDaysPerWeek: 5,
      experience: 'some',
    });
    
    const shortMsg = plan.realityCheck.message.substring(0, 50) + 
      (plan.realityCheck.message.length > 50 ? '...' : '');
    
    console.log(
      ` ${description.padEnd(12)} | ` +
      `${plan.realityCheck.severity.padEnd(11)} | ` +
      `${String(plan.hoursNeeded).padStart(8)}h | ` +
      `${String(plan.hoursAvailable).padStart(9)}h | ` +
      `${shortMsg}`
    );
  }
}

function testExperienceLevels() {
  divider('EXPERIENCE LEVEL COMPARISON - FAR');
  
  const experiences: ('none' | 'some' | 'retake')[] = ['none', 'some', 'retake'];
  
  console.log('\n Experience | Hrs Needed | MCQs to Cover | Reality');
  console.log(' ' + '-'.repeat(55));
  
  for (const experience of experiences) {
    const plan = generateStudyPlan({
      courseId: 'cpa',
      section: 'FAR',
      examDate: addDays(new Date(), 84),
      hoursPerDay: 3,
      studyDaysPerWeek: 5,
      experience,
    });
    
    const totalMcqs = plan.weeks.reduce((sum, w) => sum + w.goals.mcqs, 0);
    
    console.log(
      ` ${experience.padEnd(10)} | ` +
      `${String(plan.hoursNeeded).padStart(10)}h | ` +
      `${String(totalMcqs).padStart(13)} | ` +
      `${plan.realityCheck.severity}`
    );
  }
}

// Run all tests
console.log('\n🧪 STUDY PLAN GENERATOR V2 - COMPREHENSIVE TEST SUITE\n');
console.log('This tests the new content-based study plan generator.');

testValidation();
testStudyPlanModes();
testSinglePlan();
testFullExamPlan();
testTimelines();
testExperienceLevels();
testAllExams();

console.log('\n' + '='.repeat(80));
console.log(' TEST COMPLETE');
console.log('='.repeat(80) + '\n');

function testStudyPlanModes() {
  divider('STUDY PLAN MODES - Per-Section vs Full-Exam');
  
  const courses: CourseId[] = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
  
  console.log('\n Exam  | Mode        | Study Plan Sections');
  console.log(' ' + '-'.repeat(70));
  
  for (const courseId of courses) {
    const info = getStudyPlanSections(courseId);
    const config = getExamConfig(courseId);
    
    console.log(
      ` ${courseId.toUpperCase().padEnd(5)} | ` +
      `${info.mode.padEnd(11)} | ` +
      `${info.sections.join(', ')}`
    );
    console.log(`       | ${info.description}`);
    console.log();
  }
  
  console.log('\n📌 KEY INSIGHT:');
  console.log('   - CPA, EA, CMA, CIA: User picks ONE section → Study plan for that section');
  console.log('   - CISA, CFP: User studies for ENTIRE exam → All domains in one study plan');
}

function testFullExamPlan() {
  divider('FULL EXAM TEST: CISA (all 5 domains) - 10 weeks');
  
  // For CISA, we use the aggregated 'CISA' section
  const section = resolveStudySection('cisa');
  console.log(`\nResolved section for CISA: "${section}"`);
  
  if (!section) {
    console.log('ERROR: Could not resolve section for CISA');
    return;
  }
  
  const content = getSectionContent(section);
  console.log('\n📊 CISA Full Exam Content (aggregated from 5 domains):');
  console.log(`   Lessons: ${content?.counts.lessons}`);
  console.log(`   MCQs: ${content?.counts.mcqs}`);
  console.log(`   Flashcards: ${content?.counts.flashcards}`);
  
  const plan = generateStudyPlan({
    courseId: 'cisa',
    section,
    examDate: addDays(new Date(), 70),  // 10 weeks
    hoursPerDay: 2.5,
    studyDaysPerWeek: 5,
    experience: 'some',
  });
  
  console.log('\n📋 Study Plan:');
  console.log(`   Duration: ${plan.totalWeeks} weeks`);
  console.log(`   Hours Needed: ${plan.hoursNeeded}h`);
  console.log(`   Hours Available: ${plan.hoursAvailable}h`);
  console.log(`   Reality: ${plan.realityCheck.severity} - ${plan.realityCheck.message.slice(0, 60)}...`);
  
  console.log('\n📅 Weekly Distribution:');
  for (const week of plan.weeks.slice(0, 5)) {
    console.log(
      `   Week ${week.weekNumber}: ${week.phase.padEnd(14)} - ` +
      `${week.goals.lessons} lessons, ${week.goals.mcqs} MCQs, ${week.goals.flashcards} flashcards`
    );
  }
  console.log('   ...');
}
