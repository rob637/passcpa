#!/usr/bin/env node
/**
 * qbank-validate: Validate question JSON files against schema
 * 
 * Validates:
 * - JSON syntax
 * - Schema compliance
 * - Required fields
 * - Data quality rules
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv').default;
const addFormats = require('ajv-formats').default;

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content/cpa');
const SCHEMA_PATH = path.join(PROJECT_ROOT, 'content/schema/question.schema.json');

const SECTIONS = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

const args = process.argv.slice(2);
const isVerbose = args.includes('--verbose');
const doAll = args.includes('--all');
const sectionArg = args.find(a => !a.startsWith('-') && SECTIONS.includes(a.toUpperCase()));

let sectionsToValidate = [];
if (doAll) {
  sectionsToValidate = SECTIONS;
} else if (sectionArg) {
  sectionsToValidate = [sectionArg.toUpperCase()];
} else {
  sectionsToValidate = SECTIONS; // Default to all
}

function createValidator() {
  if (!fs.existsSync(SCHEMA_PATH)) {
    console.error('❌ Schema not found. Run migration first.');
    process.exit(1);
  }
  
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf-8'));
  return ajv.compile(schema);
}

function validateSection(section, validate) {
  const jsonPath = path.join(CONTENT_DIR, section.toLowerCase(), 'questions.json');
  
  if (!fs.existsSync(jsonPath)) {
    return { status: 'missing', message: 'Not migrated yet' };
  }
  
  let data;
  try {
    data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  } catch (e) {
    return { status: 'error', message: `JSON parse error: ${e.message}` };
  }
  
  const questions = data.questions || [];
  const errors = [];
  let valid = 0;
  let invalid = 0;
  
  for (const q of questions) {
    const isValid = validate(q);
    if (isValid) {
      valid++;
    } else {
      invalid++;
      if (isVerbose || invalid <= 5) {
        errors.push({
          id: q.id,
          issues: validate.errors.slice(0, 3).map(e => `${e.instancePath}: ${e.message}`),
        });
      }
    }
  }
  
  // Additional quality checks
  const qualityIssues = [];
  
  // Check for duplicate IDs
  const ids = questions.map(q => q.id);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicates.length > 0) {
    qualityIssues.push(`${duplicates.length} duplicate IDs`);
  }
  
  // Check for very short questions
  const shortQuestions = questions.filter(q => q.question.length < 20);
  if (shortQuestions.length > 0) {
    qualityIssues.push(`${shortQuestions.length} questions < 20 chars`);
  }
  
  // Check for empty explanations
  const noExplanation = questions.filter(q => !q.explanation || q.explanation.length < 10);
  if (noExplanation.length > 0) {
    qualityIssues.push(`${noExplanation.length} missing/short explanations`);
  }
  
  return {
    status: invalid === 0 ? 'valid' : 'issues',
    total: questions.length,
    valid,
    invalid,
    errors: errors.slice(0, 10),
    qualityIssues,
  };
}

function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║            VoraPrep Question Bank Validator                   ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  
  const validate = createValidator();
  let allValid = true;
  
  for (const section of sectionsToValidate) {
    const result = validateSection(section, validate);
    
    let icon;
    switch (result.status) {
      case 'valid': icon = '✅'; break;
      case 'missing': icon = '⬜'; break;
      case 'error': icon = '❌'; break;
      default: icon = '⚠️';
    }
    
    console.log(`${icon} ${section}: ${result.message || `${result.valid}/${result.total} valid`}`);
    
    if (result.status === 'issues') {
      allValid = false;
      
      if (result.errors && result.errors.length > 0) {
        for (const err of result.errors) {
          console.log(`   ❌ ${err.id}: ${err.issues.join(', ')}`);
        }
      }
      
      if (result.qualityIssues && result.qualityIssues.length > 0) {
        console.log(`   ⚠️  Quality: ${result.qualityIssues.join(', ')}`);
      }
    }
  }
  
  console.log('');
  
  if (allValid) {
    console.log('✅ All questions validated successfully!');
  } else {
    console.log('⚠️  Some issues found. Run with --verbose for details.');
    process.exit(1);
  }
}

main();
