/**
 * Comprehensive Content Audit Script
 * 
 * Validates ALL content (Questions, Flashcards, Lessons, Exams) against
 * authoritative requirements for data integrity and correctness.
 * 
 * Run: node scripts/comprehensive-content-audit.cjs
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const COURSES = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];

// Valid sections by course
const VALID_SECTIONS = {
  cpa: ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP', 'PREP'],
  ea: ['SEE1', 'SEE2', 'SEE3'],
  cma: ['CMA1', 'CMA2'],
  cia: ['CIA1', 'CIA2', 'CIA3'],
  cisa: ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
  cfp: ['CFP-PCR', 'CFP-GEN', 'CFP-RISK', 'CFP-INV', 'CFP-TAX', 'CFP-RET', 'CFP-EST', 'CFP-PSY']
};

// Valid difficulties
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard', 'beginner', 'intermediate', 'advanced', 'moderate', 'tough', 'foundational'];

// Results tracking
const issues = {
  critical: [],
  high: [],
  medium: [],
  low: [],
  info: []
};

const stats = {
  questions: { total: 0, bySection: {}, byCourse: {} },
  flashcards: { total: 0, bySection: {}, byCourse: {} },
  lessons: { total: 0, bySection: {}, byCourse: {} },
  tbs: { total: 0, bySection: {}, byCourse: {} }
};

function addIssue(severity, category, message, file = null) {
  const issue = { category, message, file };
  issues[severity].push(issue);
}

function extractArrayFromFile(content, exportPattern) {
  // Try to find the export statement and extract the array
  const match = content.match(exportPattern);
  if (!match) return null;
  
  // Find where the array starts
  const startIndex = content.indexOf('[', match.index);
  if (startIndex === -1) return null;
  
  // Count brackets to find the end
  let depth = 0;
  let endIndex = startIndex;
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }
  
  return content.substring(startIndex, endIndex);
}

function parseObjectsFromArrayString(arrayStr) {
  // Extract individual objects from the array string
  const objects = [];
  let depth = 0;
  let currentObj = '';
  let inString = false;
  let stringChar = '';
  
  for (let i = 1; i < arrayStr.length - 1; i++) {
    const char = arrayStr[i];
    const prevChar = arrayStr[i - 1];
    
    // Track string state
    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }
    
    if (!inString) {
      if (char === '{') {
        if (depth === 0) currentObj = '';
        depth++;
      }
      if (char === '}') {
        depth--;
        if (depth === 0) {
          currentObj += char;
          objects.push(currentObj);
          currentObj = '';
          continue;
        }
      }
    }
    
    if (depth > 0) {
      currentObj += char;
    }
  }
  
  return objects;
}

function extractFieldValue(objStr, fieldName) {
  // Simple regex-based field extraction
  const patterns = [
    new RegExp(`${fieldName}:\\s*['"]([^'"]+)['"]`, 'i'),
    new RegExp(`${fieldName}:\\s*(\\d+)`, 'i'),
    new RegExp(`${fieldName}:\\s*(true|false)`, 'i'),
  ];
  
  for (const pattern of patterns) {
    const match = objStr.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractArrayField(objStr, fieldName) {
  const pattern = new RegExp(`${fieldName}:\\s*\\[([^\\]]+)\\]`, 'i');
  const match = objStr.match(pattern);
  if (match) {
    // Parse the array content
    const arrayContent = match[1];
    const items = [];
    const itemMatches = arrayContent.matchAll(/['"]([^'"]+)['"]/g);
    for (const m of itemMatches) {
      items.push(m[1]);
    }
    return items;
  }
  return null;
}

function validateQuestions(course) {
  const questionsDir = path.join(DATA_DIR, course, 'questions');
  if (!fs.existsSync(questionsDir)) {
    addIssue('info', 'questions', `No questions directory for ${course}`, questionsDir);
    return;
  }
  
  const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.ts'));
  const seenIds = new Set();
  const validSections = VALID_SECTIONS[course];
  
  for (const file of files) {
    const filePath = path.join(questionsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find all question objects
    const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
    const sectionMatches = [...content.matchAll(/section:\s*['"]([^'"]+)['"]/g)];
    const difficultyMatches = [...content.matchAll(/difficulty:\s*['"]([^'"]+)['"]/g)];
    const correctAnswerMatches = [...content.matchAll(/correctAnswer:\s*(\d+)/g)];
    const optionsMatches = [...content.matchAll(/options:\s*\[/g)];
    
    // Count questions in file
    const questionCount = idMatches.length;
    stats.questions.total += questionCount;
    stats.questions.byCourse[course] = (stats.questions.byCourse[course] || 0) + questionCount;
    
    // Validate each question's ID
    for (const match of idMatches) {
      const id = match[1];
      
      // Check for duplicate IDs
      if (seenIds.has(id)) {
        addIssue('critical', 'questions', `Duplicate question ID: ${id}`, filePath);
      }
      seenIds.add(id);
      
      // Check ID format (should be lowercase for consistency)
      if (id !== id.toLowerCase() && !id.match(/^[A-Z]+-/)) {
        // Allow uppercase section prefix like FAR-001
        const prefix = id.split('-')[0];
        if (!validSections.includes(prefix)) {
          addIssue('medium', 'questions', `Inconsistent ID casing: ${id}`, filePath);
        }
      }
    }
    
    // Validate sections
    for (const match of sectionMatches) {
      const section = match[1];
      if (!validSections.includes(section)) {
        addIssue('high', 'questions', `Invalid section "${section}" for ${course}`, filePath);
      }
      stats.questions.bySection[section] = (stats.questions.bySection[section] || 0) + 1;
    }
    
    // Validate difficulties
    for (const match of difficultyMatches) {
      const difficulty = match[1];
      if (!VALID_DIFFICULTIES.includes(difficulty)) {
        addIssue('high', 'questions', `Invalid difficulty "${difficulty}"`, filePath);
      }
    }
    
    // Validate correctAnswer is within bounds
    // Count options arrays to match with correctAnswer
    const lines = content.split('\n');
    let inQuestion = false;
    let currentOptions = [];
    let currentCorrectAnswer = null;
    let currentId = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
      if (idMatch) {
        // Check previous question if exists
        if (currentId && currentOptions.length > 0 && currentCorrectAnswer !== null) {
          if (currentCorrectAnswer < 0 || currentCorrectAnswer >= currentOptions.length) {
            addIssue('critical', 'questions', `correctAnswer ${currentCorrectAnswer} out of bounds (${currentOptions.length} options) for ${currentId}`, filePath);
          }
        }
        currentId = idMatch[1];
        currentOptions = [];
        currentCorrectAnswer = null;
      }
      
      const correctMatch = line.match(/correctAnswer:\s*(\d+)/);
      if (correctMatch) {
        currentCorrectAnswer = parseInt(correctMatch[1], 10);
      }
      
      // Count options (simplified - look for string array elements)
      if (line.includes('options:')) {
        // Start counting options
        let j = i;
        let bracketDepth = 0;
        let started = false;
        currentOptions = [];
        
        while (j < lines.length) {
          const optLine = lines[j];
          for (const char of optLine) {
            if (char === '[') {
              bracketDepth++;
              started = true;
            }
            if (char === ']' && started) {
              bracketDepth--;
              if (bracketDepth === 0) break;
            }
          }
          // Count string entries as options
          const optMatches = optLine.match(/['"][^'"]+['"]/g);
          if (optMatches && started && bracketDepth > 0) {
            currentOptions.push(...optMatches);
          }
          if (bracketDepth === 0 && started) break;
          j++;
        }
      }
    }
    
    // Check last question
    if (currentId && currentOptions.length > 0 && currentCorrectAnswer !== null) {
      if (currentCorrectAnswer < 0 || currentCorrectAnswer >= currentOptions.length) {
        addIssue('critical', 'questions', `correctAnswer ${currentCorrectAnswer} out of bounds (${currentOptions.length} options) for ${currentId}`, filePath);
      }
    }
    
    // Check for empty explanations
    const emptyExplanations = content.match(/explanation:\s*['"]['"],?/g);
    if (emptyExplanations) {
      addIssue('high', 'questions', `${emptyExplanations.length} empty explanation(s) found`, filePath);
    }
    
    // Check for missing required fields
    const hasQuestions = content.includes('id:') && (content.includes('question:') || content.includes('text:'));
    if (hasQuestions) {
      // Count occurrences of required fields
      const idCount = (content.match(/^\s+id:/gm) || []).length;
      const sectionCount = (content.match(/^\s+section:/gm) || []).length;
      const explanationCount = (content.match(/^\s+explanation:/gm) || []).length;
      
      if (idCount > sectionCount) {
        addIssue('high', 'questions', `Missing section field in ${idCount - sectionCount} question(s)`, filePath);
      }
      if (idCount > explanationCount && !file.includes('cfp')) {
        // CFP may use different format
        addIssue('medium', 'questions', `Missing explanation in ${idCount - explanationCount} question(s)`, filePath);
      }
    }
  }
}

function validateFlashcards(course) {
  const flashcardsDir = path.join(DATA_DIR, course, 'flashcards');
  if (!fs.existsSync(flashcardsDir)) {
    addIssue('info', 'flashcards', `No flashcards directory for ${course}`, flashcardsDir);
    return;
  }
  
  const files = fs.readdirSync(flashcardsDir).filter(f => f.endsWith('.ts'));
  const seenIds = new Set();
  const validSections = VALID_SECTIONS[course];
  
  for (const file of files) {
    const filePath = path.join(flashcardsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find all flashcard IDs
    const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
    const sectionMatches = [...content.matchAll(/section:\s*['"]([^'"]+)['"]/g)];
    const typeMatches = [...content.matchAll(/type:\s*['"]([^'"]+)['"]/g)];
    const difficultyMatches = [...content.matchAll(/difficulty:\s*['"]([^'"]+)['"]/g)];
    
    // Count flashcards
    const flashcardCount = idMatches.length;
    stats.flashcards.total += flashcardCount;
    stats.flashcards.byCourse[course] = (stats.flashcards.byCourse[course] || 0) + flashcardCount;
    
    // Validate IDs
    for (const match of idMatches) {
      const id = match[1];
      
      // Check for duplicate IDs within course
      if (seenIds.has(id)) {
        addIssue('critical', 'flashcards', `Duplicate flashcard ID: ${id}`, filePath);
      }
      seenIds.add(id);
      
      // Check for uppercase IDs (should be lowercase)
      if (id !== id.toLowerCase()) {
        addIssue('high', 'flashcards', `Uppercase flashcard ID: ${id}`, filePath);
      }
    }
    
    // Validate sections
    for (const match of sectionMatches) {
      const section = match[1];
      if (!validSections.includes(section)) {
        addIssue('high', 'flashcards', `Invalid section "${section}" for ${course}`, filePath);
      }
      stats.flashcards.bySection[section] = (stats.flashcards.bySection[section] || 0) + 1;
    }
    
    // Validate types (should be one of: term, concept, rule, mnemonic, formula, process)
    const validTypes = ['term', 'concept', 'rule', 'mnemonic', 'formula', 'process', 'definition', 'acronym', 'comparison', 'list', 'exception', 'threshold', 'calculation', 'procedure', 'standard', 'framework', 'regulation', 'principle', 'technique', 'method', 'model', 'ratio', 'timeline'];
    for (const match of typeMatches) {
      const type = match[1];
      if (!validTypes.includes(type)) {
        addIssue('low', 'flashcards', `Uncommon flashcard type "${type}"`, filePath);
      }
    }
    
    // Check field counts
    const idCount = idMatches.length;
    const sectionCount = sectionMatches.length;
    const typeCount = typeMatches.length;
    const difficultyCount = difficultyMatches.length;
    
    if (idCount > sectionCount && file !== 'index.ts') {
      addIssue('high', 'flashcards', `Missing section in ${idCount - sectionCount} flashcard(s)`, filePath);
    }
    if (idCount > typeCount && file !== 'index.ts') {
      addIssue('high', 'flashcards', `Missing type in ${idCount - typeCount} flashcard(s)`, filePath);
    }
    if (idCount > difficultyCount && file !== 'index.ts') {
      addIssue('medium', 'flashcards', `Missing difficulty in ${idCount - difficultyCount} flashcard(s)`, filePath);
    }
    
    // Check for empty front/back
    const emptyFront = content.match(/front:\s*['"]['"],?/g);
    const emptyBack = content.match(/back:\s*['"]['"],?/g);
    if (emptyFront) {
      addIssue('critical', 'flashcards', `${emptyFront.length} empty front(s) found`, filePath);
    }
    if (emptyBack) {
      addIssue('critical', 'flashcards', `${emptyBack.length} empty back(s) found`, filePath);
    }
  }
}

function validateLessons(course) {
  const lessonsDir = path.join(DATA_DIR, course, 'lessons');
  if (!fs.existsSync(lessonsDir)) {
    addIssue('info', 'lessons', `No lessons directory for ${course}`, lessonsDir);
    return;
  }
  
  const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  const seenIds = new Set();
  const validSections = VALID_SECTIONS[course];
  
  for (const file of files) {
    const filePath = path.join(lessonsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find lesson entries
    const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
    const sectionMatches = [...content.matchAll(/section:\s*['"]([^'"]+)['"]/g)];
    const courseIdMatches = [...content.matchAll(/courseId:\s*['"]([^'"]+)['"]/g)];
    const titleMatches = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)];
    
    // Count lessons
    const lessonCount = idMatches.length;
    stats.lessons.total += lessonCount;
    stats.lessons.byCourse[course] = (stats.lessons.byCourse[course] || 0) + lessonCount;
    
    // Validate IDs
    for (const match of idMatches) {
      const id = match[1];
      if (seenIds.has(id)) {
        addIssue('critical', 'lessons', `Duplicate lesson ID: ${id}`, filePath);
      }
      seenIds.add(id);
    }
    
    // Validate sections (CFP uses 'domain' instead)
    if (course !== 'cfp') {
      for (const match of sectionMatches) {
        const section = match[1];
        if (!validSections.includes(section)) {
          addIssue('high', 'lessons', `Invalid section "${section}" for ${course}`, filePath);
        }
        stats.lessons.bySection[section] = (stats.lessons.bySection[section] || 0) + 1;
      }
    }
    
    // Check courseIds match the course
    for (const match of courseIdMatches) {
      const courseId = match[1];
      if (courseId !== course) {
        addIssue('critical', 'lessons', `Wrong courseId "${courseId}" in ${course} lesson file`, filePath);
      }
    }
    
    // Check for missing required fields
    const idCount = idMatches.length;
    const sectionCount = sectionMatches.length;
    const courseIdCount = courseIdMatches.length;
    const titleCount = titleMatches.length;
    
    if (course !== 'cfp' && idCount > sectionCount) {
      addIssue('high', 'lessons', `Missing section in ${idCount - sectionCount} lesson(s)`, filePath);
    }
    if (idCount > courseIdCount) {
      addIssue('medium', 'lessons', `Missing courseId in ${idCount - courseIdCount} lesson(s)`, filePath);
    }
    
    // Check for empty content
    const emptyContent = content.match(/content:\s*{\s*sections:\s*\[\s*\]\s*}/g);
    if (emptyContent) {
      addIssue('high', 'lessons', `${emptyContent.length} lesson(s) with empty content`, filePath);
    }
    
    // Check for empty titles
    const emptyTitles = content.match(/title:\s*['"]['"],?/g);
    if (emptyTitles) {
      addIssue('critical', 'lessons', `${emptyTitles.length} lesson(s) with empty title`, filePath);
    }
  }
}

function validateExamConfig(course) {
  const configPath = path.join(DATA_DIR, '..', 'courses', course, 'config.ts');
  if (!fs.existsSync(configPath)) {
    // Try alternate path
    const altPath = path.join(DATA_DIR, course, 'config.ts');
    if (!fs.existsSync(altPath)) {
      addIssue('info', 'config', `No course config found for ${course}`, configPath);
      return;
    }
  }
}

function validateTBS(course) {
  const tbsDir = path.join(DATA_DIR, course, 'tbs');
  if (!fs.existsSync(tbsDir)) {
    // Not all courses have TBS
    return;
  }
  
  const files = fs.readdirSync(tbsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  const seenIds = new Set();
  
  for (const file of files) {
    const filePath = path.join(tbsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
    
    stats.tbs.total += idMatches.length;
    stats.tbs.byCourse[course] = (stats.tbs.byCourse[course] || 0) + idMatches.length;
    
    for (const match of idMatches) {
      const id = match[1];
      if (seenIds.has(id)) {
        addIssue('critical', 'tbs', `Duplicate TBS ID: ${id}`, filePath);
      }
      seenIds.add(id);
    }
  }
}

function checkCrossReferences() {
  // Check that blueprint areas referenced in questions/lessons actually exist in config
  // This would require parsing the config files more thoroughly
  // For now, just flag this as a check needed
  addIssue('info', 'cross-ref', 'Blueprint cross-reference validation requires config parsing', null);
}

function validateContentQuality() {
  // Check for common content issues across all content
  for (const course of COURSES) {
    // Check for very short explanations (likely incomplete)
    const questionsDir = path.join(DATA_DIR, course, 'questions');
    if (fs.existsSync(questionsDir)) {
      const files = fs.readdirSync(questionsDir).filter(f => f.endsWith('.ts'));
      
      for (const file of files) {
        const filePath = path.join(questionsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Find short explanations (less than 20 chars)
        const shortExplanations = content.match(/explanation:\s*['"][^'"]{1,20}['"]/g);
        if (shortExplanations) {
          addIssue('medium', 'quality', `${shortExplanations.length} very short explanation(s) (may be incomplete)`, filePath);
        }
      }
    }
  }
}

function printReport() {
  console.log('\n' + '='.repeat(70));
  console.log('COMPREHENSIVE CONTENT AUDIT REPORT');
  console.log('='.repeat(70));
  console.log(`Audit Date: ${new Date().toISOString()}`);
  console.log('');
  
  // Print statistics
  console.log('📊 CONTENT STATISTICS');
  console.log('-'.repeat(70));
  console.log(`\nQuestions: ${stats.questions.total.toLocaleString()}`);
  console.log('  By Course:');
  for (const [course, count] of Object.entries(stats.questions.byCourse).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${course.toUpperCase()}: ${count.toLocaleString()}`);
  }
  
  console.log(`\nFlashcards: ${stats.flashcards.total.toLocaleString()}`);
  console.log('  By Course:');
  for (const [course, count] of Object.entries(stats.flashcards.byCourse).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${course.toUpperCase()}: ${count.toLocaleString()}`);
  }
  
  console.log(`\nLessons: ${stats.lessons.total.toLocaleString()}`);
  console.log('  By Course:');
  for (const [course, count] of Object.entries(stats.lessons.byCourse).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${course.toUpperCase()}: ${count.toLocaleString()}`);
  }
  
  if (stats.tbs.total > 0) {
    console.log(`\nTask-Based Simulations: ${stats.tbs.total.toLocaleString()}`);
    console.log('  By Course:');
    for (const [course, count] of Object.entries(stats.tbs.byCourse).sort((a, b) => b[1] - a[1])) {
      console.log(`    ${course.toUpperCase()}: ${count.toLocaleString()}`);
    }
  }
  
  // Print issues by severity
  console.log('\n' + '='.repeat(70));
  console.log('🔍 ISSUES FOUND');
  console.log('='.repeat(70));
  
  const severityEmoji = {
    critical: '🔴 CRITICAL',
    high: '🟠 HIGH',
    medium: '🟡 MEDIUM',
    low: '🟢 LOW',
    info: 'ℹ️  INFO'
  };
  
  let totalIssues = 0;
  
  for (const severity of ['critical', 'high', 'medium', 'low', 'info']) {
    const sevIssues = issues[severity];
    if (sevIssues.length === 0) continue;
    
    totalIssues += sevIssues.length;
    console.log(`\n${severityEmoji[severity]} (${sevIssues.length} issues)`);
    console.log('-'.repeat(50));
    
    // Group by category
    const byCategory = {};
    for (const issue of sevIssues) {
      if (!byCategory[issue.category]) byCategory[issue.category] = [];
      byCategory[issue.category].push(issue);
    }
    
    for (const [category, catIssues] of Object.entries(byCategory)) {
      console.log(`\n  [${category.toUpperCase()}]`);
      for (const issue of catIssues) {
        const fileInfo = issue.file ? ` (${path.basename(issue.file)})` : '';
        console.log(`    • ${issue.message}${fileInfo}`);
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📋 SUMMARY');
  console.log('='.repeat(70));
  
  const criticalCount = issues.critical.length;
  const highCount = issues.high.length;
  const mediumCount = issues.medium.length;
  const lowCount = issues.low.length;
  
  console.log(`\nTotal Content Items: ${(stats.questions.total + stats.flashcards.total + stats.lessons.total + stats.tbs.total).toLocaleString()}`);
  console.log(`  Questions:  ${stats.questions.total.toLocaleString()}`);
  console.log(`  Flashcards: ${stats.flashcards.total.toLocaleString()}`);
  console.log(`  Lessons:    ${stats.lessons.total.toLocaleString()}`);
  console.log(`  TBS:        ${stats.tbs.total.toLocaleString()}`);
  
  console.log(`\nIssues by Severity:`);
  console.log(`  🔴 Critical: ${criticalCount}`);
  console.log(`  🟠 High:     ${highCount}`);
  console.log(`  🟡 Medium:   ${mediumCount}`);
  console.log(`  🟢 Low:      ${lowCount}`);
  
  if (criticalCount > 0) {
    console.log('\n❌ AUDIT FAILED - Critical issues must be resolved!');
    process.exit(1);
  } else if (highCount > 0) {
    console.log('\n⚠️  AUDIT PASSED WITH WARNINGS - High priority issues should be addressed');
    process.exit(0);
  } else {
    console.log('\n✅ AUDIT PASSED');
    process.exit(0);
  }
}

// Main execution
console.log('Starting comprehensive content audit...\n');

for (const course of COURSES) {
  console.log(`Auditing ${course.toUpperCase()}...`);
  validateQuestions(course);
  validateFlashcards(course);
  validateLessons(course);
  validateTBS(course);
  validateExamConfig(course);
}

console.log('\nValidating content quality...');
validateContentQuality();

console.log('Checking cross-references...');
checkCrossReferences();

printReport();
