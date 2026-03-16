import { 
  getSectionContent, 
  calculateSectionStudyHours, 
  compareWithIndustry,
  getExamTotals,
  getExamSections
} from '../src/services/contentRegistry';

console.log('=== CONTENT REGISTRY TEST ===\n');

// Test FAR
const far = getSectionContent('FAR');
console.log('FAR Content:');
console.log('  Lessons:', far?.counts.lessons);
console.log('  MCQs:', far?.counts.mcqs);
console.log('  TBS:', far?.counts.tbs);
console.log('  Flashcards:', far?.counts.flashcards);

// Test study time calculation
console.log('\nFAR Study Time Estimates:');
for (const exp of ['none', 'some', 'retake'] as const) {
  const result = calculateSectionStudyHours('FAR', exp);
  const comparison = compareWithIndustry('FAR', exp);
  console.log(`\n  ${exp.toUpperCase()}:`);
  console.log('    Total:', result.total, 'hours');
  console.log('    Breakdown: L=' + result.breakdown.lessons + 'h M=' + result.breakdown.mcqs + 'h T=' + result.breakdown.tbs + 'h');
  console.log('    vs Industry (' + comparison.industryMin + '-' + comparison.industryMax + 'h):', comparison.withinRange ? '✓ In range' : '✗ Out of range');
}

// Test all CPA sections
console.log('\n=== ALL CPA SECTIONS ===');
for (const section of getExamSections('cpa')) {
  const result = calculateSectionStudyHours(section, 'some');
  const comparison = compareWithIndustry(section, 'some');
  const status = comparison.withinRange ? '✓' : (comparison.difference > 0 ? '+' : '') + comparison.difference + 'h';
  console.log(section + ': ' + result.total + 'h (industry ' + comparison.industryMin + '-' + comparison.industryMax + 'h) ' + status);
}

// CPA Totals
console.log('\n=== CPA TOTALS ===');
const cpaTotals = getExamTotals('cpa');
console.log('Lessons:', cpaTotals.lessons, '(' + (cpaTotals.lessonMinutes / 60).toFixed(1) + ' hours)');
console.log('MCQs:', cpaTotals.mcqs);
console.log('TBS:', cpaTotals.tbs);
console.log('Flashcards:', cpaTotals.flashcards);
