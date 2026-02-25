#!/usr/bin/env node
/**
 * qbank-migrate: Migrate TypeScript question files to validated JSON
 * 
 * This script:
 * 1. Reads TypeScript question files
 * 2. Extracts question arrays using AST-like parsing
 * 3. Normalizes and validates each question
 * 4. Writes clean JSON files to content/cpa/{section}/
 * 5. Creates a migration report
 * 
 * Usage:
 *   node scripts/qbank-migrate.cjs FAR
 *   node scripts/qbank-migrate.cjs --all
 *   node scripts/qbank-migrate.cjs --all --dry-run
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv').default;
const addFormats = require('ajv-formats').default;

// Paths
const PROJECT_ROOT = path.join(__dirname, '..');
const SRC_QUESTIONS = path.join(PROJECT_ROOT, 'src/data/cpa/questions');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content/cpa');
const SCHEMA_PATH = path.join(PROJECT_ROOT, 'content/schema/question.schema.json');

// Valid sections
const SECTIONS = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

// Parse command line args
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerbose = args.includes('--verbose');
const doAll = args.includes('--all');
const sectionArg = args.find(a => !a.startsWith('-') && SECTIONS.includes(a.toUpperCase()));

// Determine which sections to process
let sectionsToProcess = [];
if (doAll) {
  sectionsToProcess = SECTIONS;
} else if (sectionArg) {
  sectionsToProcess = [sectionArg.toUpperCase()];
} else {
  console.log('Usage: node qbank-migrate.cjs <section> [--all] [--dry-run] [--verbose]');
  console.log('Sections: FAR, AUD, REG, BAR, ISC, TCP');
  process.exit(1);
}

// Initialize validator
function createValidator() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf-8'));
  return ajv.compile(schema);
}

/**
 * Parse a TypeScript file and extract questions array
 * Uses string parsing to handle the TS syntax
 */
function extractQuestionsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  // Find export const XXXX = [ or export const XXXX: Question[] = [
  const exportMatch = content.match(/export\s+const\s+(\w+)\s*(?::\s*\w+(?:\[\]|<[^>]+>)?)?\s*=\s*\[/);
  if (!exportMatch) {
    return { questions: [], error: 'No export found' };
  }
  
  // Find the array bounds
  const equalsIndex = content.indexOf('=', exportMatch.index);
  const arrayStart = content.indexOf('[', equalsIndex);
  
  let depth = 0;
  let arrayEnd = arrayStart;
  let inString = false;
  let stringChar = null;
  let escaped = false;
  
  for (let i = arrayStart; i < content.length; i++) {
    const char = content[i];
    
    if (escaped) {
      escaped = false;
      continue;
    }
    
    if (char === '\\') {
      escaped = true;
      continue;
    }
    
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar) {
      inString = false;
      stringChar = null;
    } else if (!inString) {
      if (char === '[') depth++;
      if (char === ']') depth--;
      if (depth === 0) {
        arrayEnd = i;
        break;
      }
    }
  }
  
  const arrayContent = content.substring(arrayStart, arrayEnd + 1);
  
  // Parse using Function constructor (safer than eval, handles JS syntax)
  try {
    // Create a safe evaluation context
    const parseFunc = new Function(`return ${arrayContent}`);
    const questions = parseFunc();
    return { questions, exportName: exportMatch[1] };
  } catch (e) {
    return { questions: [], error: `Parse error: ${e.message}` };
  }
}

/**
 * Normalize a question to the canonical schema format
 */
function normalizeQuestion(q, sourceFile) {
  const normalized = {
    id: q.id,
    version: 1,
    status: 'approved',
    courseId: q.courseId || 'cpa',
    section: q.section,
    blueprintArea: q.blueprintArea || `${q.section}-I`,
    topic: q.topic || 'General',
    difficulty: normalizeDifficulty(q.difficulty),
    skillLevel: q.skillLevel || 'Application',
    question: q.question,
    options: q.options || q.choices || [],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    sourceFile: sourceFile,
  };
  
  // Optional fields - only include if present
  if (q.subtopic) normalized.subtopic = q.subtopic;
  if (q.blueprintRef) normalized.blueprintRef = q.blueprintRef;
  if (q.tags) normalized.tags = q.tags;
  if (q.whyWrong && Object.keys(q.whyWrong).length > 0) {
    normalized.whyWrong = q.whyWrong;
  }
  if (q.educational) normalized.educational = q.educational;
  if (q.examTip) normalized.examTip = q.examTip;
  if (q.memoryAid) normalized.memoryAid = q.memoryAid;
  if (q.bottomLine) normalized.bottomLine = q.bottomLine;
  if (q.reference) normalized.reference = q.reference;
  if (q.effectiveDate) normalized.effectiveDate = q.effectiveDate;
  
  return normalized;
}

function normalizeDifficulty(d) {
  const map = {
    'easy': 'easy',
    'beginner': 'easy',
    'foundational': 'easy',
    'medium': 'medium',
    'moderate': 'medium',
    'intermediate': 'medium',
    'hard': 'hard',
    'tough': 'hard',
    'advanced': 'hard',
  };
  return map[d?.toLowerCase()] || 'medium';
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║              VoraPrep Question Bank Migration                 ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  
  if (isDryRun) {
    console.log('🔍 DRY RUN - No files will be written\n');
  }
  
  const validate = createValidator();
  const report = {
    timestamp: new Date().toISOString(),
    sections: {},
    totalQuestions: 0,
    totalValid: 0,
    totalInvalid: 0,
    totalDuplicates: 0,
  };
  
  for (const section of sectionsToProcess) {
    console.log(`\n📂 Processing ${section}...`);
    
    const sectionLower = section.toLowerCase();
    // Process ALL .ts files (except index.ts) - questions are filtered by section field
    const files = fs.readdirSync(SRC_QUESTIONS)
      .filter(f => f.endsWith('.ts') && f !== 'index.ts');
    
    console.log(`   Scanning ${files.length} files for ${section} questions...`);
    
    const sectionReport = {
      files: files.length,
      questions: 0,
      valid: 0,
      invalid: 0,
      duplicates: 0,
      errors: [],
    };
    
    const allQuestions = [];
    const seenIds = new Set();
    
    for (const file of files) {
      const filePath = path.join(SRC_QUESTIONS, file);
      const { questions, error, exportName } = extractQuestionsFromFile(filePath);
      
      if (error) {
        sectionReport.errors.push({ file, error });
        if (isVerbose) console.log(`   ⚠️  ${file}: ${error}`);
        continue;
      }
      
      if (isVerbose) {
        console.log(`   📄 ${file}: ${questions.length} questions (${exportName})`);
      }
      
      for (const q of questions) {
        if (!q || !q.id || q.section !== section) continue;
        
        // Check for duplicates
        if (seenIds.has(q.id)) {
          sectionReport.duplicates++;
          if (isVerbose) console.log(`      ⚠️  Duplicate ID: ${q.id}`);
          continue;
        }
        seenIds.add(q.id);
        
        // Normalize
        const normalized = normalizeQuestion(q, file);
        
        // Validate
        const isValid = validate(normalized);
        if (!isValid) {
          sectionReport.invalid++;
          if (isVerbose) {
            console.log(`      ❌ Invalid: ${q.id}`);
            validate.errors.slice(0, 3).forEach(e => {
              console.log(`         - ${e.instancePath}: ${e.message}`);
            });
          }
          sectionReport.errors.push({
            id: q.id,
            file,
            errors: validate.errors.slice(0, 5),
          });
        } else {
          sectionReport.valid++;
          allQuestions.push(normalized);
        }
        
        sectionReport.questions++;
      }
    }
    
    // Sort questions by ID for consistent output
    allQuestions.sort((a, b) => a.id.localeCompare(b.id));
    
    // Write to JSON
    const outputDir = path.join(CONTENT_DIR, sectionLower);
    const outputPath = path.join(outputDir, 'questions.json');
    
    if (!isDryRun) {
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(
        outputPath,
        JSON.stringify({ 
          $schema: '../schema/question.schema.json',
          section,
          exportedAt: new Date().toISOString(),
          questions: allQuestions 
        }, null, 2),
        'utf-8'
      );
    }
    
    console.log(`   ✅ ${sectionReport.valid} valid, ❌ ${sectionReport.invalid} invalid, ⚠️  ${sectionReport.duplicates} duplicates`);
    if (!isDryRun) {
      console.log(`   📝 Written to: content/cpa/${sectionLower}/questions.json`);
    }
    
    report.sections[section] = sectionReport;
    report.totalQuestions += sectionReport.questions;
    report.totalValid += sectionReport.valid;
    report.totalInvalid += sectionReport.invalid;
    report.totalDuplicates += sectionReport.duplicates;
  }
  
  // Summary
  console.log('\n' + '═'.repeat(64));
  console.log('                         MIGRATION SUMMARY');
  console.log('═'.repeat(64));
  console.log(`  Total questions:    ${report.totalQuestions}`);
  console.log(`  Valid:              ${report.totalValid} ✅`);
  console.log(`  Invalid:            ${report.totalInvalid} ❌`);
  console.log(`  Duplicates skipped: ${report.totalDuplicates} ⚠️`);
  console.log('');
  
  // Write report
  if (!isDryRun) {
    const reportPath = path.join(CONTENT_DIR, 'migration-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`📋 Report written to: content/cpa/migration-report.json`);
  }
  
  return report;
}

// Run
migrate().catch(console.error);
