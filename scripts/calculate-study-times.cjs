#!/usr/bin/env node
/**
 * Calculate study times for all CPA sections based on actual content
 * 
 * Usage: node scripts/calculate-study-times.cjs [section]
 * 
 * Examples:
 *   node scripts/calculate-study-times.cjs          # All sections
 *   node scripts/calculate-study-times.cjs FAR      # FAR only
 */

const fs = require('fs');
const path = require('path');

// =============================================================================
// CONSTANTS
// =============================================================================

const MCQ_TIME_FIRST_PASS = 3;
const MCQ_TIME_REVIEW_PASS = 1.5;
const MCQ_TIME_MASTERY_PASS = 1;
const TBS_TIME_FIRST_PASS = 20;
const TBS_TIME_REVIEW_PASS = 15;
const FLASHCARD_TIME_PER_CARD = 0.5;
const FLASHCARD_REVIEW_SESSIONS = 6;
const MOCK_EXAM_TIME = 240;

const EXPERIENCE_FACTORS = {
  'none': {
    lessonMultiplier: 1.5,
    mcqPassesNeeded: 2.5,
    tbsPassesNeeded: 3,
    flashcardMultiplier: 1.0,
  },
  'some': {
    lessonMultiplier: 1.0,
    mcqPassesNeeded: 2.0,
    tbsPassesNeeded: 2,
    flashcardMultiplier: 0.7,
  },
  'retake': {
    lessonMultiplier: 0.6,
    mcqPassesNeeded: 1.5,
    tbsPassesNeeded: 2,
    flashcardMultiplier: 0.5,
  },
};

// Current industry-standard estimates (what we have now)
const INDUSTRY_HOURS = {
  'FAR': 150,
  'AUD': 110,
  'REG': 120,
  'BAR': 50,
  'ISC': 50,
  'TCP': 50,
};

// =============================================================================
// DATA LOADING
// =============================================================================

function loadLessons(section) {
  const lessonsPath = path.join(__dirname, '..', 'src', 'data', 'cpa', 'lessons', 'json', `${section.toLowerCase()}.json`);
  if (!fs.existsSync(lessonsPath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));
  } catch (e) {
    console.warn(`Could not load lessons for ${section}: ${e.message}`);
    return [];
  }
}

function loadQuestions(section) {
  const questionsPath = path.join(__dirname, '..', 'content', 'cpa', section.toLowerCase(), 'questions.json');
  if (!fs.existsSync(questionsPath)) {
    return { questions: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
  } catch (e) {
    console.warn(`Could not load questions for ${section}: ${e.message}`);
    return { questions: [] };
  }
}

function loadTBS(section) {
  const tbsPath = path.join(__dirname, '..', 'content', 'cpa', section.toLowerCase(), 'tbs.json');
  if (!fs.existsSync(tbsPath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(tbsPath, 'utf8'));
  } catch (e) {
    console.warn(`Could not load TBS for ${section}: ${e.message}`);
    return [];
  }
}

function loadFlashcards(section) {
  const flashcardsPath = path.join(__dirname, '..', 'content', 'cpa', 'flashcards.json');
  if (!fs.existsSync(flashcardsPath)) {
    return [];
  }
  try {
    const data = JSON.parse(fs.readFileSync(flashcardsPath, 'utf8'));
    const flashcards = data.flashcards || data;
    return flashcards.filter(f => f.section === section);
  } catch (e) {
    console.warn(`Could not load flashcards: ${e.message}`);
    return [];
  }
}

function getContentStats(section) {
  const lessons = loadLessons(section);
  const questions = loadQuestions(section);
  const tbs = loadTBS(section);
  const flashcards = loadFlashcards(section);
  
  const lessonMinutes = lessons.reduce((sum, l) => sum + (l.duration || 0), 0);
  
  return {
    section,
    lessonCount: lessons.length,
    lessonMinutes,
    mcqCount: questions.questions?.length || 0,
    tbsCount: Array.isArray(tbs) ? tbs.length : 0,
    flashcardCount: flashcards.length,
  };
}

// =============================================================================
// CALCULATION
// =============================================================================

function calculateMcqAverageTime(passes) {
  if (passes <= 1) {
    return MCQ_TIME_FIRST_PASS;
  }
  
  const firstPassWeight = 1;
  const reviewWeight = Math.min(passes - 1, 1);
  const masteryWeight = Math.max(0, passes - 2);
  
  const totalTime = 
    (MCQ_TIME_FIRST_PASS * firstPassWeight) +
    (MCQ_TIME_REVIEW_PASS * reviewWeight) +
    (MCQ_TIME_MASTERY_PASS * masteryWeight);
  
  return totalTime / passes;
}

function calculateStudyTime(stats, experience = 'some', mockExamCount = 2) {
  const factors = EXPERIENCE_FACTORS[experience];
  
  // 1. Lesson time
  const baseLessonMinutes = stats.lessonMinutes;
  const adjustedLessonMinutes = baseLessonMinutes * factors.lessonMultiplier;
  const lessonHours = adjustedLessonMinutes / 60;
  
  // 2. MCQ time
  const avgTimePerQuestion = calculateMcqAverageTime(factors.mcqPassesNeeded);
  const totalMcqMinutes = stats.mcqCount * avgTimePerQuestion;
  const mcqHours = totalMcqMinutes / 60;
  
  // 3. TBS time
  const tbsMinutesPerAttempt = (TBS_TIME_FIRST_PASS + TBS_TIME_REVIEW_PASS * (factors.tbsPassesNeeded - 1)) / factors.tbsPassesNeeded;
  const totalTbsMinutes = stats.tbsCount * tbsMinutesPerAttempt * factors.tbsPassesNeeded;
  const tbsHours = totalTbsMinutes / 60;
  
  // 4. Flashcard time
  const flashcardMinutes = stats.flashcardCount * FLASHCARD_TIME_PER_CARD * FLASHCARD_REVIEW_SESSIONS * factors.flashcardMultiplier;
  const flashcardHours = flashcardMinutes / 60;
  
  // 5. Mock exams
  const mockExamHours = mockExamCount * (MOCK_EXAM_TIME / 60);
  
  // Total
  const totalHours = Math.round(lessonHours + mcqHours + tbsHours + flashcardHours + mockExamHours);
  
  return {
    section: stats.section,
    experience,
    lessonHours: Math.round(lessonHours * 10) / 10,
    mcqHours: Math.round(mcqHours * 10) / 10,
    tbsHours: Math.round(tbsHours * 10) / 10,
    flashcardHours: Math.round(flashcardHours * 10) / 10,
    mockExamHours,
    totalHours,
    stats,
  };
}

// =============================================================================
// MAIN
// =============================================================================

const sections = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];
const targetSection = process.argv[2]?.toUpperCase();

if (targetSection && !sections.includes(targetSection)) {
  console.error(`Invalid section: ${targetSection}`);
  console.error(`Valid sections: ${sections.join(', ')}`);
  process.exit(1);
}

const sectionsToProcess = targetSection ? [targetSection] : sections;

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║                      CPA STUDY TIME ANALYSIS                                 ║');
console.log('║                   Based on Actual VoraPrep Content                           ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

for (const section of sectionsToProcess) {
  const stats = getContentStats(section);
  
  console.log(`\n${'═'.repeat(78)}`);
  console.log(`  ${section} - Content Inventory`);
  console.log(`${'═'.repeat(78)}`);
  console.log(`  Lessons:    ${stats.lessonCount} (${stats.lessonMinutes} min = ${(stats.lessonMinutes / 60).toFixed(1)} hrs)`);
  console.log(`  MCQs:       ${stats.mcqCount}`);
  console.log(`  TBS:        ${stats.tbsCount}`);
  console.log(`  Flashcards: ${stats.flashcardCount}`);
  
  console.log(`\n  Study Time Estimates by Experience Level:`);
  console.log(`  ${'─'.repeat(70)}`);
  console.log(`  ${'Experience'.padEnd(12)} | ${'Lessons'.padEnd(8)} | ${'MCQs'.padEnd(8)} | ${'TBS'.padEnd(6)} | ${'Flash'.padEnd(6)} | ${'Mock'.padEnd(6)} | TOTAL`);
  console.log(`  ${'─'.repeat(70)}`);
  
  for (const experience of ['none', 'some', 'retake']) {
    const estimate = calculateStudyTime(stats, experience);
    const label = experience === 'none' ? 'Beginner' : experience === 'some' ? 'Some Exp' : 'Retaker';
    
    console.log(`  ${label.padEnd(12)} | ${(estimate.lessonHours + 'h').padEnd(8)} | ${(estimate.mcqHours + 'h').padEnd(8)} | ${(estimate.tbsHours + 'h').padEnd(6)} | ${(estimate.flashcardHours + 'h').padEnd(6)} | ${(estimate.mockExamHours + 'h').padEnd(6)} | ${estimate.totalHours}h`);
  }
  
  const industryHours = INDUSTRY_HOURS[section] || 100;
  const someExpEstimate = calculateStudyTime(stats, 'some');
  const diff = someExpEstimate.totalHours - industryHours;
  const pctDiff = Math.round((diff / industryHours) * 100);
  
  console.log(`\n  Comparison with Industry Standard (${industryHours}h):`);
  console.log(`  Content-based (some exp): ${someExpEstimate.totalHours}h (${diff > 0 ? '+' : ''}${diff}h / ${pctDiff > 0 ? '+' : ''}${pctDiff}%)`);
  
  if (pctDiff > 30) {
    console.log(`  ⚠️  Content significantly exceeds industry estimate`);
  } else if (pctDiff > 10) {
    console.log(`  📊 Content is comprehensive, plan extra time`);
  } else if (pctDiff < -20) {
    console.log(`  ⚠️  Content may need expansion`);
  } else {
    console.log(`  ✅ Content aligns with industry standards`);
  }
}

console.log(`\n${'═'.repeat(78)}`);
console.log('  SUMMARY');
console.log(`${'═'.repeat(78)}`);

let totalContentHours = 0;
let totalIndustryHours = 0;

const summary = sectionsToProcess.map(section => {
  const stats = getContentStats(section);
  const estimate = calculateStudyTime(stats, 'some');
  const industry = INDUSTRY_HOURS[section] || 100;
  totalContentHours += estimate.totalHours;
  totalIndustryHours += industry;
  return { section, content: estimate.totalHours, industry };
});

console.log(`\n  ${'Section'.padEnd(8)} | ${'Content-Based'.padEnd(14)} | ${'Industry'.padEnd(10)} | Difference`);
console.log(`  ${'─'.repeat(55)}`);

for (const s of summary) {
  const diff = s.content - s.industry;
  console.log(`  ${s.section.padEnd(8)} | ${(s.content + 'h').padEnd(14)} | ${(s.industry + 'h').padEnd(10)} | ${diff > 0 ? '+' : ''}${diff}h`);
}

if (sectionsToProcess.length > 1) {
  console.log(`  ${'─'.repeat(55)}`);
  const totalDiff = totalContentHours - totalIndustryHours;
  console.log(`  ${'TOTAL'.padEnd(8)} | ${(totalContentHours + 'h').padEnd(14)} | ${(totalIndustryHours + 'h').padEnd(10)} | ${totalDiff > 0 ? '+' : ''}${totalDiff}h`);
}

console.log(`\n  Note: Industry estimates are general guidelines. Content-based estimates`);
console.log(`  reflect the ACTUAL material in VoraPrep.\n`);
