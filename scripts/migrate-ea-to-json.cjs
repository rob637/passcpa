#!/usr/bin/env node
/**
 * EA Question Migration Script
 * 
 * Migrates EA questions from TypeScript files to enhanced JSON format.
 * Adds whyWrong, educational, examTip, memoryAid, and reference fields.
 * 
 * Usage:
 *   node scripts/migrate-ea-to-json.cjs --section SEE1
 *   node scripts/migrate-ea-to-json.cjs --all
 *   node scripts/migrate-ea-to-json.cjs --all --dry-run
 *   node scripts/migrate-ea-to-json.cjs --all --skip-enhance (fast mode - no AI)
 *   node scripts/migrate-ea-to-json.cjs --resume (continues from checkpoint)
 */

const fs = require('fs');
const path = require('path');

// Paths
const PROJECT_ROOT = path.join(__dirname, '..');
const SRC_QUESTIONS = path.join(PROJECT_ROOT, 'src/data/ea/questions');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content/ea');
const SCHEMA_PATH = path.join(PROJECT_ROOT, 'content/schema/question.schema.json');
const CHECKPOINT_PATH = path.join(__dirname, '.ea-migration-checkpoint.json');

// Valid sections
const SECTIONS = ['SEE1', 'SEE2', 'SEE3'];

// EA Blueprint Information
const EA_BLUEPRINTS = {
  'SEE1': {
    name: 'Individuals',
    areas: {
      'SEE1-1': 'Preliminary Work and Taxpayer Data',
      'SEE1-2': 'Income and Assets',
      'SEE1-3': 'Deductions and Adjustments',
      'SEE1-4': 'Taxation and Advice',
      'SEE1-5': 'Credits',
      'SEE1-6': 'Specialized Returns',
    },
    references: ['IRS Publication 17', 'IRC Section 1-1400'],
  },
  'SEE2': {
    name: 'Businesses',
    areas: {
      'SEE2-1': 'Business Entities',
      'SEE2-2': 'Business Financial Information',
      'SEE2-3': 'Business Income and Expenses',
      'SEE2-4': 'Sole Proprietorships',
      'SEE2-5': 'Partnerships',
      'SEE2-6': 'C Corporations',
      'SEE2-7': 'S Corporations',
      'SEE2-8': 'Specialized Industries and Entities',
    },
    references: ['IRS Publications', 'IRC Sections', 'Treasury Regulations'],
  },
  'SEE3': {
    name: 'Representation, Practices and Procedures',
    areas: {
      'SEE3-1': 'Practices and Procedures',
      'SEE3-2': 'Representation Before the IRS',
      'SEE3-3': 'Specific Types of Representation',
      'SEE3-4': 'Filing Process',
      'SEE3-5': 'Penalties',
      'SEE3-6': 'Ethics',
    },
    references: ['Circular 230', 'IRS Publications', 'IRC Sections'],
  },
};

// Parse command line args
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerbose = args.includes('--verbose');
const doAll = args.includes('--all');
const skipEnhance = args.includes('--skip-enhance');
const resumeMode = args.includes('--resume');
const sectionArg = args.find(a => !a.startsWith('-') && SECTIONS.includes(a.toUpperCase()));

// Determine which sections to process
let sectionsToProcess = [];
if (doAll || resumeMode) {
  sectionsToProcess = SECTIONS;
} else if (sectionArg) {
  sectionsToProcess = [sectionArg.toUpperCase()];
} else {
  console.log('Usage: node migrate-ea-to-json.cjs <section> [--all] [--dry-run] [--skip-enhance] [--resume]');
  console.log('Sections: SEE1, SEE2, SEE3');
  process.exit(1);
}

// Get Gemini API key
function getApiKey() {
  const envPath = path.join(PROJECT_ROOT, '.env.local');
  if (!fs.existsSync(envPath)) {
    return null;
  }
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/VITE_GEMINI_API_KEY=(.+)/);
  return match ? match[1].trim() : null;
}

const GEMINI_API_KEY = getApiKey();
const GEMINI_URL = GEMINI_API_KEY 
  ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`
  : null;

/**
 * Parse a TypeScript file and extract questions array
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
  
  // Parse using Function constructor
  try {
    const parseFunc = new Function(`return ${arrayContent}`);
    const questions = parseFunc();
    return { questions, exportName: exportMatch[1], sourceFile: fileName };
  } catch (e) {
    return { questions: [], error: `Parse error: ${e.message}` };
  }
}

/**
 * Normalize difficulty level
 */
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
 * Generate placeholder enhancement fields for a question
 * Used when AI enhancement is skipped
 */
function generatePlaceholderEnhancement(question) {
  const correctIdx = question.correctAnswer;
  const whyWrong = {};
  
  for (let i = 0; i < question.options.length; i++) {
    if (i === correctIdx) {
      whyWrong[String(i)] = `Why option ${String.fromCharCode(65 + i)} is CORRECT - ${question.explanation.split('.')[0]}.`;
    } else {
      whyWrong[String(i)] = `Why option ${String.fromCharCode(65 + i)} is WRONG - This does not correctly address the question about ${question.topic?.toLowerCase() || 'this topic'}.`;
    }
  }
  
  return {
    whyWrong,
    educational: `Understanding ${question.topic || 'this concept'} is essential for EA exam success. ${question.explanation}`,
    examTip: `For questions about ${question.topic || 'this topic'}, focus on the key differences between the answer choices and eliminate obviously incorrect options first.`,
    memoryAid: `Remember the key concept tested here: ${question.topic || 'Tax Rules'}.`,
    reference: question.reference || 'IRS Publications',
  };
}

/**
 * Call Gemini API to enhance a question with full explanation fields
 */
async function enhanceQuestionWithAI(question) {
  if (!GEMINI_URL) {
    return generatePlaceholderEnhancement(question);
  }
  
  const prompt = `You are an EA (Enrolled Agent) exam expert creating UWorld-style explanations. Given this EA exam question, provide enhanced explanation content.

QUESTION:
${question.question}

OPTIONS:
A. ${question.options[0]}
B. ${question.options[1]}
C. ${question.options[2]}
D. ${question.options[3]}

CORRECT ANSWER: ${String.fromCharCode(65 + question.correctAnswer)} (${question.options[question.correctAnswer]})

CURRENT EXPLANATION: ${question.explanation}

TOPIC: ${question.topic || 'Tax'}
SUBTOPIC: ${question.subtopic || ''}
SECTION: ${question.section} (${EA_BLUEPRINTS[question.section]?.name || ''})
BLUEPRINT AREA: ${question.blueprintArea || ''}
EXISTING REFERENCE: ${question.reference || 'N/A'}

Please provide the following in JSON format:
{
  "whyWrong": {
    "0": "Why option A is WRONG/CORRECT - detailed explanation with tax code reference",
    "1": "Why option B is WRONG/CORRECT - detailed explanation with tax code reference",
    "2": "Why option C is WRONG/CORRECT - detailed explanation with tax code reference",
    "3": "Why option D is WRONG/CORRECT - detailed explanation with tax code reference"
  },
  "educational": "2-3 sentences providing deeper context and teaching the underlying tax concept. Connect to real-world application.",
  "examTip": "Specific test-taking strategy for THIS question type. How to quickly identify the correct answer or eliminate wrong ones.",
  "memoryAid": "A mnemonic, acronym, or memory hook specific to this concept. Should be genuinely helpful.",
  "reference": "Authoritative source (IRC Section, Treasury Regulation, IRS Publication, Circular 230, etc.)"
}

IMPORTANT RULES:
1. For EACH option (0-3), start with "Why option X is WRONG -" or "Why option X is CORRECT -"
2. Be technically accurate - reference actual IRC sections, Treasury Regulations, or IRS Publications
3. The educational field should teach, not just explain
4. Memory aids should be memorable and relevant to EA exam content
5. Reference should be specific (e.g., "IRC §61" not just "Tax code")
6. Return ONLY valid JSON, no markdown code blocks or extra text`;

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse JSON from response
    let jsonStr = text.trim();
    if (jsonStr.startsWith('```json')) jsonStr = jsonStr.slice(7);
    if (jsonStr.startsWith('```')) jsonStr = jsonStr.slice(3);
    if (jsonStr.endsWith('```')) jsonStr = jsonStr.slice(0, -3);
    
    const enhanced = JSON.parse(jsonStr.trim());
    
    // Validate required fields
    if (!enhanced.whyWrong || !enhanced.educational || !enhanced.examTip || !enhanced.memoryAid) {
      throw new Error('Incomplete response from Gemini');
    }
    
    // Ensure whyWrong has all 4 options
    const whyWrong = {};
    for (let i = 0; i < 4; i++) {
      whyWrong[String(i)] = enhanced.whyWrong[String(i)] || enhanced.whyWrong[i] || 
        `Why option ${String.fromCharCode(65 + i)} - ${i === question.correctAnswer ? 'This is the correct answer.' : 'This option is incorrect.'}`;
    }
    
    return {
      whyWrong,
      educational: enhanced.educational,
      examTip: enhanced.examTip,
      memoryAid: enhanced.memoryAid,
      reference: enhanced.reference || question.reference || 'IRS Publications',
    };
  } catch (error) {
    console.error(`  ⚠️ AI enhancement failed for ${question.id}:`, error.message);
    return generatePlaceholderEnhancement(question);
  }
}

/**
 * Normalize a question to the target JSON schema format
 */
function normalizeQuestion(q, sourceFile, enhancement) {
  const normalized = {
    id: q.id.toLowerCase(),
    version: 1,
    status: 'approved',
    courseId: q.courseId || 'ea',
    section: q.section,
    blueprintArea: q.blueprintArea || `${q.section}-1`,
    topic: q.topic || 'General',
    difficulty: normalizeDifficulty(q.difficulty),
    skillLevel: q.skillLevel || 'Application',
    question: q.question,
    options: q.options || [],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    sourceFile: sourceFile,
  };
  
  // Add optional base fields
  if (q.subtopic) normalized.subtopic = q.subtopic;
  if (q.blueprintRef) normalized.blueprintRef = q.blueprintRef;
  if (q.tags) normalized.tags = q.tags;
  
  // Add enhanced fields
  if (enhancement) {
    normalized.whyWrong = enhancement.whyWrong;
    normalized.educational = enhancement.educational;
    normalized.examTip = enhancement.examTip;
    normalized.memoryAid = enhancement.memoryAid;
    normalized.reference = enhancement.reference;
  }
  
  return normalized;
}

/**
 * Sleep for rate limiting
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Load or create checkpoint
 */
function loadCheckpoint() {
  if (fs.existsSync(CHECKPOINT_PATH)) {
    return JSON.parse(fs.readFileSync(CHECKPOINT_PATH, 'utf-8'));
  }
  return { processedQuestions: {}, lastSection: null, lastFile: null };
}

/**
 * Save checkpoint
 */
function saveCheckpoint(checkpoint) {
  fs.writeFileSync(CHECKPOINT_PATH, JSON.stringify(checkpoint, null, 2));
}

/**
 * Get all question files for a section
 */
function getQuestionFiles(section) {
  const files = fs.readdirSync(SRC_QUESTIONS)
    .filter(f => f.startsWith(section.toLowerCase()) && f.endsWith('.ts') && f !== 'index.ts')
    .sort((a, b) => {
      // Sort by batch number
      const numA = parseInt(a.match(/batch(\d+)/)?.[1] || '0');
      const numB = parseInt(b.match(/batch(\d+)/)?.[1] || '0');
      return numA - numB;
    });
  return files;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║          EA Question Migration to Enhanced JSON                 ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('');
  
  if (isDryRun) {
    console.log('🔍 DRY RUN - No files will be written\n');
  }
  
  if (skipEnhance) {
    console.log('⚡ SKIP ENHANCE mode - Using placeholder content (faster)\n');
  } else if (!GEMINI_API_KEY) {
    console.log('⚠️  No VITE_GEMINI_API_KEY found in .env.local - using placeholder content\n');
  }
  
  // Load checkpoint if resuming
  const checkpoint = resumeMode ? loadCheckpoint() : { processedQuestions: {}, lastSection: null, lastFile: null };
  
  if (resumeMode && Object.keys(checkpoint.processedQuestions).length > 0) {
    console.log(`📌 Resuming from checkpoint - ${Object.keys(checkpoint.processedQuestions).length} questions already processed\n`);
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    sections: {},
    totalQuestions: 0,
    totalEnhanced: 0,
    totalPlaceholder: 0,
    failedQuestions: [],
  };
  
  // Ensure output directories exist
  if (!isDryRun) {
    if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });
    for (const section of SECTIONS) {
      const sectionDir = path.join(CONTENT_DIR, section.toLowerCase());
      if (!fs.existsSync(sectionDir)) fs.mkdirSync(sectionDir, { recursive: true });
    }
  }
  
  // Process each section
  for (const section of sectionsToProcess) {
    console.log(`\n📂 Processing ${section} (${EA_BLUEPRINTS[section]?.name || ''})...`);
    
    const files = getQuestionFiles(section);
    console.log(`   Found ${files.length} question files\n`);
    
    const sectionQuestions = [];
    const sectionReport = {
      files: files.length,
      questions: 0,
      enhanced: 0,
      placeholder: 0,
      errors: [],
    };
    
    for (const file of files) {
      const filePath = path.join(SRC_QUESTIONS, file);
      
      console.log(`   📄 ${file}`);
      
      const { questions, error, exportName } = extractQuestionsFromFile(filePath);
      
      if (error) {
        console.log(`      ❌ Error: ${error}`);
        sectionReport.errors.push({ file, error });
        continue;
      }
      
      console.log(`      Found ${questions.length} questions`);
      
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        
        // Skip if already processed (resume mode)
        if (checkpoint.processedQuestions[q.id]) {
          sectionQuestions.push(checkpoint.processedQuestions[q.id]);
          sectionReport.questions++;
          continue;
        }
        
        // Enhance the question
        let enhancement;
        if (skipEnhance) {
          enhancement = generatePlaceholderEnhancement(q);
          sectionReport.placeholder++;
        } else {
          enhancement = await enhanceQuestionWithAI(q);
          
          // Check if we got real enhancement or placeholder
          if (enhancement.educational.includes('is essential for EA exam success')) {
            sectionReport.placeholder++;
          } else {
            sectionReport.enhanced++;
          }
          
          // Rate limiting - wait between API calls
          if (!skipEnhance && GEMINI_API_KEY && i < questions.length - 1) {
            await sleep(100); // 100ms between calls
          }
        }
        
        const normalizedQ = normalizeQuestion(q, file, enhancement);
        sectionQuestions.push(normalizedQ);
        sectionReport.questions++;
        
        // Save to checkpoint
        checkpoint.processedQuestions[q.id] = normalizedQ;
        if (sectionReport.questions % 50 === 0) {
          saveCheckpoint(checkpoint);
          console.log(`      💾 Checkpoint saved (${sectionReport.questions} questions)`);
        }
        
        // Progress indicator
        if (sectionReport.questions % 100 === 0 || i === questions.length - 1) {
          process.stdout.write(`\r      Processed ${sectionReport.questions} questions...`);
        }
      }
      
      console.log(''); // New line after progress
    }
    
    // Write the section JSON file
    const outputPath = path.join(CONTENT_DIR, section.toLowerCase(), 'questions.json');
    const outputData = {
      $schema: '../schema/question.schema.json',
      section: section,
      exportedAt: new Date().toISOString(),
      questions: sectionQuestions,
    };
    
    if (!isDryRun) {
      fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
      console.log(`\n   ✅ Wrote ${sectionQuestions.length} questions to ${outputPath}`);
    } else {
      console.log(`\n   📝 Would write ${sectionQuestions.length} questions to ${outputPath}`);
    }
    
    report.sections[section] = sectionReport;
    report.totalQuestions += sectionReport.questions;
    report.totalEnhanced += sectionReport.enhanced;
    report.totalPlaceholder += sectionReport.placeholder;
    
    // Save final checkpoint for this section
    checkpoint.lastSection = section;
    saveCheckpoint(checkpoint);
  }
  
  // Clean up checkpoint on successful completion
  if (!isDryRun && fs.existsSync(CHECKPOINT_PATH)) {
    fs.unlinkSync(CHECKPOINT_PATH);
  }
  
  // Print summary
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                      Migration Summary                          ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`Timestamp: ${report.timestamp}`);
  console.log(`Total Questions: ${report.totalQuestions}`);
  console.log(`  - AI Enhanced: ${report.totalEnhanced}`);
  console.log(`  - Placeholder: ${report.totalPlaceholder}`);
  console.log('');
  
  for (const [section, data] of Object.entries(report.sections)) {
    console.log(`${section}:`);
    console.log(`  Files: ${data.files}`);
    console.log(`  Questions: ${data.questions}`);
    console.log(`  Enhanced: ${data.enhanced}`);
    console.log(`  Placeholder: ${data.placeholder}`);
    if (data.errors.length > 0) {
      console.log(`  Errors: ${data.errors.length}`);
      data.errors.forEach(e => console.log(`    - ${e.file}: ${e.error}`));
    }
    console.log('');
  }
  
  if (report.failedQuestions.length > 0) {
    console.log('Failed Questions:');
    report.failedQuestions.forEach(id => console.log(`  - ${id}`));
  }
  
  console.log('Output Files:');
  for (const section of sectionsToProcess) {
    console.log(`  content/ea/${section.toLowerCase()}/questions.json`);
  }
  
  return report;
}

// Run
migrate().catch(console.error);
