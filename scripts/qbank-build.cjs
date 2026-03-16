#!/usr/bin/env node
/**
 * qbank-build: Generate TypeScript bundles from JSON question files
 * 
 * This generates optimized TypeScript files for the app from the
 * canonical JSON question files. This is the final step in the workflow:
 * 
 * Edit JSON → Validate → Build TS → Deploy
 * 
 * Output structure:
 *   src/data/generated/cpa-questions.ts  (combined file)
 *   src/data/generated/far-questions.ts  (per-section)
 *   src/data/generated/aud-questions.ts
 *   ...etc
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content/cpa');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src/data/generated');

const SECTIONS = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

// Parse args
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerbose = args.includes('--verbose');

/**
 * Convert JSON question to TypeScript-safe string
 */
function questionToTypeScript(q) {
  // Build the object with proper escaping
  const lines = [];
  lines.push('  {');
  
  // Required fields
  lines.push(`    id: ${JSON.stringify(q.id)},`);
  lines.push(`    courseId: ${JSON.stringify(q.courseId)},`);
  lines.push(`    section: ${JSON.stringify(q.section)},`);
  lines.push(`    blueprintArea: ${JSON.stringify(q.blueprintArea)},`);
  lines.push(`    topic: ${JSON.stringify(q.topic)},`);
  if (q.subtopic) lines.push(`    subtopic: ${JSON.stringify(q.subtopic)},`);
  lines.push(`    difficulty: ${JSON.stringify(q.difficulty)},`);
  lines.push(`    skillLevel: ${JSON.stringify(q.skillLevel)},`);
  lines.push(`    question: ${JSON.stringify(q.question)},`);
  lines.push(`    options: ${JSON.stringify(q.options)},`);
  lines.push(`    correctAnswer: ${q.correctAnswer},`);
  lines.push(`    explanation: ${JSON.stringify(q.explanation)},`);
  
  // UWorld-style enhancements
  if (q.whyWrong && Object.keys(q.whyWrong).length > 0) {
    lines.push('    whyWrong: {');
    for (const [key, value] of Object.entries(q.whyWrong)) {
      lines.push(`      ${key}: ${JSON.stringify(value)},`);
    }
    lines.push('    },');
  }
  
  if (q.educational) lines.push(`    educational: ${JSON.stringify(q.educational)},`);
  if (q.examTip) lines.push(`    examTip: ${JSON.stringify(q.examTip)},`);
  if (q.memoryAid) lines.push(`    memoryAid: ${JSON.stringify(q.memoryAid)},`);
  if (q.bottomLine) lines.push(`    bottomLine: ${JSON.stringify(q.bottomLine)},`);
  if (q.reference) lines.push(`    reference: ${JSON.stringify(q.reference)},`);
  
  lines.push('  },');
  
  return lines.join('\n');
}

/**
 * Generate TypeScript file for a section
 */
function generateSectionFile(section, questions) {
  const sectionUpper = section.toUpperCase();
  const sectionLower = section.toLowerCase();
  
  let content = `// Auto-generated from content/cpa/${sectionLower}/questions.json
// DO NOT EDIT DIRECTLY - Edit the JSON and run: npm run qbank build
// Generated at: ${new Date().toISOString()}

import { Question } from '../../types';

export const ${sectionUpper}_QUESTIONS: Question[] = [
`;
  
  for (const q of questions) {
    content += questionToTypeScript(q) + '\n';
  }
  
  content += '];\n';
  
  return content;
}

/**
 * Generate combined index file
 */
function generateIndexFile(sectionCounts) {
  let content = `// Auto-generated CPA Question Bank Index
// DO NOT EDIT DIRECTLY - Run: npm run qbank build
// Generated at: ${new Date().toISOString()}

`;

  // Import all sections
  for (const section of SECTIONS) {
    content += `import { ${section}_QUESTIONS } from './${section.toLowerCase()}-questions';\n`;
  }
  
  content += `
// Re-export all sections
export { ${SECTIONS.map(s => `${s}_QUESTIONS`).join(', ')} };

// Combined array of all questions
export const ALL_CPA_QUESTIONS = [
  ...FAR_QUESTIONS,
  ...AUD_QUESTIONS,
  ...REG_QUESTIONS,
  ...BAR_QUESTIONS,
  ...ISC_QUESTIONS,
  ...TCP_QUESTIONS,
];

// Section metadata
export const CPA_QUESTION_COUNTS = {
${SECTIONS.map(s => `  ${s}: ${sectionCounts[s] || 0},`).join('\n')}
  TOTAL: ${Object.values(sectionCounts).reduce((a, b) => a + b, 0)},
};
`;
  
  return content;
}

async function build() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║           VoraPrep Question Bank Build                        ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  
  if (isDryRun) {
    console.log('🔍 DRY RUN - No files will be written\n');
  }
  
  // Create output directory
  if (!isDryRun) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const sectionCounts = {};
  let totalQuestions = 0;
  
  for (const section of SECTIONS) {
    const jsonPath = path.join(CONTENT_DIR, section.toLowerCase(), 'questions.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.log(`⚠️  ${section}: Not migrated (skipping)`);
      sectionCounts[section] = 0;
      continue;
    }
    
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const questions = data.questions || [];
    
    sectionCounts[section] = questions.length;
    totalQuestions += questions.length;
    
    // Generate section file
    const tsContent = generateSectionFile(section, questions);
    const outputPath = path.join(OUTPUT_DIR, `${section.toLowerCase()}-questions.ts`);
    
    if (!isDryRun) {
      fs.writeFileSync(outputPath, tsContent, 'utf-8');
    }
    
    console.log(`✅ ${section}: ${questions.length} questions → ${section.toLowerCase()}-questions.ts`);
  }
  
  // Generate index file
  const indexContent = generateIndexFile(sectionCounts);
  const indexPath = path.join(OUTPUT_DIR, 'index.ts');
  
  if (!isDryRun) {
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
  }
  
  console.log(`\n📦 Generated ${totalQuestions} questions in ${SECTIONS.length} files`);
  console.log(`📁 Output: src/data/generated/`);
  
  if (!isDryRun) {
    console.log('\n✅ Build complete! Remember to import from src/data/generated/ in your components.');
  }
}

build().catch(console.error);
