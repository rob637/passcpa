/**
 * CMA Questions Migration Script
 * 
 * Migrates CMA questions from TypeScript to enhanced JSON format
 * 
 * Usage: node scripts/migrate-cma-to-json.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const questionsDir = join(rootDir, 'src/data/cma/questions');
const contentDir = join(rootDir, 'content/cma');

// CMA Blueprint areas for reference
const CMA_BLUEPRINT = {
  'CMA1': {
    'CMA1-A': 'External Financial Reporting',
    'CMA1-B': 'Planning, Budgeting, and Forecasting',
    'CMA1-C': 'Performance Management',
    'CMA1-D': 'Cost Management',
    'CMA1-E': 'Internal Controls',
    'CMA1-F': 'Technology and Analytics',
  },
  'CMA2': {
    'CMA2-A': 'Financial Statement Analysis',
    'CMA2-B': 'Corporate Finance',
    'CMA2-C': 'Decision Analysis',
    'CMA2-D': 'Risk Management',
    'CMA2-E': 'Investment Decisions',
    'CMA2-F': 'Professional Ethics',
  }
};

// Reference mapping by blueprint area
const REFERENCES = {
  'CMA1-A': 'IMA Statement on Management Accounting; FASB Conceptual Framework',
  'CMA1-B': 'IMA Statement on Management Accounting; Master Budget Framework',
  'CMA1-C': 'IMA Statement on Management Accounting; Balanced Scorecard Institute',
  'CMA1-D': 'IMA Statement on Management Accounting; Cost Accounting Standards',
  'CMA1-E': 'COSO Internal Control Framework; IMA Statement on Management Accounting',
  'CMA1-F': 'IMA Statement on Management Accounting; COBIT Framework',
  'CMA2-A': 'IMA Statement on Management Accounting; Financial Analysis Techniques',
  'CMA2-B': 'IMA Statement on Management Accounting; Corporate Finance Principles',
  'CMA2-C': 'IMA Statement on Management Accounting; Decision Analysis Framework',
  'CMA2-D': 'IMA Statement on Management Accounting; Enterprise Risk Management',
  'CMA2-E': 'IMA Statement on Management Accounting; Capital Budgeting Standards',
  'CMA2-F': 'IMA Statement of Ethical Professional Practice',
};

/**
 * Parse a TypeScript file and extract questions array
 */
function parseTypeScriptFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const questions = [];
  
  // Find the export constant pattern (array)
  const exportMatch = content.match(/export\s+const\s+(\w+)\s*:\s*Question\[\]\s*=\s*\[/);
  if (!exportMatch) {
    console.warn(`  No question export found in ${filePath}`);
    return [];
  }
  
  // Parse question objects from the file
  // Use regex to find each question object
  const questionRegex = /\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?(?=\},\s*\{|\}\s*\];)/g;
  
  let match;
  let rawContent = content;
  
  // Better approach: find all id fields and parse objects around them
  const idMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
  
  for (const idMatch of idMatches) {
    const id = idMatch[1];
    const startIdx = content.lastIndexOf('{', idMatch.index);
    
    // Find the matching closing brace
    let braceCount = 0;
    let endIdx = startIdx;
    for (let i = startIdx; i < content.length; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      if (braceCount === 0) {
        endIdx = i;
        break;
      }
    }
    
    const objStr = content.substring(startIdx, endIdx + 1);
    const question = parseQuestionObject(objStr, id);
    if (question) {
      questions.push(question);
    }
  }
  
  return questions;
}

/**
 * Parse a single question object from string
 */
function parseQuestionObject(objStr, id) {
  try {
    // Extract each field using regex
    const getString = (field) => {
      const match = objStr.match(new RegExp(`${field}:\\s*['"\`]([\\s\\S]*?)['"\`]\\s*,`));
      if (match) return match[1].replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
      // Try multiline backtick strings
      const btMatch = objStr.match(new RegExp(`${field}:\\s*\`([\\s\\S]*?)\`\\s*,`));
      if (btMatch) return btMatch[1].trim();
      return null;
    };
    
    const getNumber = (field) => {
      const match = objStr.match(new RegExp(`${field}:\\s*(\\d+)`));
      return match ? parseInt(match[1]) : null;
    };
    
    const getArray = (field) => {
      const arrayMatch = objStr.match(new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]\\s*,`));
      if (!arrayMatch) return [];
      
      const arrayContent = arrayMatch[1];
      const items = [];
      
      // Match strings in the array
      const itemMatches = [...arrayContent.matchAll(/['"`]([^'"`]*?)['"`]/g)];
      for (const m of itemMatches) {
        items.push(m[1].replace(/\\'/g, "'").replace(/\\"/g, '"'));
      }
      
      return items;
    };
    
    const courseId = getString('courseId') || 'cma';
    const section = getString('section');
    const blueprintArea = getString('blueprintArea');
    const topic = getString('topic');
    const subtopic = getString('subtopic');
    const difficulty = getString('difficulty');
    const skillLevel = getString('skillLevel');
    const question = getString('question');
    const options = getArray('options');
    const correctAnswer = getNumber('correctAnswer');
    const explanation = getString('explanation');
    const reference = getString('reference');
    
    if (!section || !question || options.length < 4 || correctAnswer === null) {
      console.warn(`  Incomplete question: ${id}`);
      return null;
    }
    
    return {
      id: id.toLowerCase(),
      courseId,
      section,
      blueprintArea: blueprintArea || `${section}-A`,
      topic: topic || 'General',
      subtopic: subtopic || undefined,
      difficulty: difficulty || 'medium',
      skillLevel: skillLevel || 'Application',
      question,
      options,
      correctAnswer,
      explanation: explanation || '',
      reference: reference || REFERENCES[blueprintArea] || 'IMA Statement on Management Accounting',
    };
  } catch (e) {
    console.error(`  Error parsing question ${id}:`, e.message);
    return null;
  }
}

/**
 * Generate whyWrong explanations for each option
 */
function generateWhyWrong(question) {
  const { options, correctAnswer, explanation, topic, subtopic } = question;
  const whyWrong = {};
  
  for (let i = 0; i < options.length; i++) {
    const optionText = options[i];
    const isCorrect = i === correctAnswer;
    
    if (isCorrect) {
      whyWrong[i.toString()] = `Why option ${String.fromCharCode(65 + i)} is CORRECT - ${explanation}`;
    } else {
      // Generate reason why this option is wrong based on the question context
      whyWrong[i.toString()] = generateWrongExplanation(optionText, options[correctAnswer], topic, subtopic, i);
    }
  }
  
  return whyWrong;
}

/**
 * Generate explanation for why an option is wrong
 */
function generateWrongExplanation(wrongOption, correctOption, topic, subtopic, index) {
  const letter = String.fromCharCode(65 + index);
  
  // Common patterns for CMA topics
  const topicHints = {
    'Financial Statements': 'does not align with GAAP financial reporting requirements',
    'Balance Sheet': 'incorrectly classifies or values balance sheet items',
    'Income Statement': 'does not properly match revenues and expenses',
    'Cash Flow': 'confuses operating, investing, or financing activities',
    'Ratio': 'uses incorrect formula or components in the ratio calculation',
    'Liquidity': 'does not accurately measure short-term financial health',
    'Profitability': 'does not correctly measure profit generation capability',
    'Budget': 'does not follow proper budgeting methodology',
    'Variance': 'misapplies variance analysis concepts',
    'Cost': 'incorrectly allocates or classifies costs',
    'Overhead': 'misapplies overhead allocation methods',
    'CVP': 'does not correctly apply cost-volume-profit relationships',
    'Break-even': 'incorrectly calculates break-even point',
    'Pricing': 'does not consider all relevant pricing factors',
    'Transfer': 'does not align with transfer pricing principles',
    'Performance': 'does not properly measure performance metrics',
    'Balanced Scorecard': 'does not align with balanced scorecard perspectives',
    'Internal Control': 'does not align with COSO framework principles',
    'Risk': 'does not properly assess or manage risk factors',
    'Ethics': 'violates IMA ethical standards',
    'Investment': 'incorrectly evaluates investment decisions',
    'NPV': 'does not properly discount cash flows',
    'IRR': 'misapplies internal rate of return concepts',
    'Capital': 'does not consider cost of capital correctly',
    'Leverage': 'incorrectly assesses financial or operating leverage',
    'Working Capital': 'does not properly manage short-term assets and liabilities',
  };
  
  let hint = 'does not align with management accounting principles';
  for (const [key, value] of Object.entries(topicHints)) {
    if (topic?.toLowerCase().includes(key.toLowerCase()) || 
        subtopic?.toLowerCase().includes(key.toLowerCase()) ||
        wrongOption.toLowerCase().includes(key.toLowerCase())) {
      hint = value;
      break;
    }
  }
  
  return `Why option ${letter} is WRONG - This answer ${hint}. The correct answer "${correctOption}" properly addresses the concept being tested.`;
}

/**
 * Generate educational content
 */
function generateEducational(question) {
  const { topic, subtopic, explanation, blueprintArea } = question;
  const areaName = Object.values(CMA_BLUEPRINT).flatMap(a => Object.entries(a))
    .find(([k]) => k === blueprintArea)?.[1] || topic;
  
  return `Understanding ${topic}${subtopic ? ` (${subtopic})` : ''} is essential for ${areaName}. ${explanation} This concept is frequently tested on the CMA exam because it demonstrates core management accounting competencies that practitioners use daily.`;
}

/**
 * Generate exam tip
 */
function generateExamTip(question) {
  const { topic, difficulty, options, correctAnswer } = question;
  
  const tips = [
    `When answering ${topic} questions, first eliminate options that contain extreme language like "always" or "never."`,
    `For ${topic} questions, carefully read each option and look for the most complete answer.`,
    `Remember that ${topic} questions often test practical application rather than just memorization.`,
    `On ${difficulty} ${topic} questions, take time to analyze all options before selecting your answer.`,
    `Look for keywords in the question stem that point to the ${topic} concept being tested.`,
    `When in doubt on ${topic} questions, consider which answer best aligns with IMA standards.`,
    `For calculation-based ${topic} questions, verify your arithmetic before selecting an answer.`,
    `${topic} questions often include distractors - options that are partially correct but miss key elements.`,
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
}

/**
 * Generate memory aid
 */
function generateMemoryAid(question) {
  const { topic, subtopic, options, correctAnswer } = question;
  const correctOption = options[correctAnswer];
  
  // Try to create an acronym or memorable phrase
  const words = correctOption.split(/\s+/).filter(w => w.length > 2);
  if (words.length >= 2 && words.length <= 5) {
    const acronym = words.map(w => w[0].toUpperCase()).join('');
    if (acronym.length >= 2 && acronym.length <= 5) {
      return `Remember "${acronym}" - ${words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(', ')}.`;
    }
  }
  
  // Fallback to topic-based memory aid
  const memoryAids = {
    'Financial Statements': 'ALICE - Assets = Liabilities + Interests (Capital + Earnings)',
    'Balance Sheet': 'DEAD CLIC - Debits: Expenses, Assets, Dividends | Credits: Liabilities, Income, Capital',
    'Ratio': 'Current and Quick ratios test liquidity - Current is broader, Quick excludes inventory',
    'Budget': 'SMART budgeting - Specific, Measurable, Achievable, Relevant, Time-bound',
    'Variance': 'Price vs Volume - Price comes first, Volume shows capacity usage',
    'Cost': 'Variable costs VARY with volume; Fixed costs stay FIXED',
    'CVP': 'BEP = Fixed Costs / CM per unit - Break-even is where profit = zero',
    'Performance': 'KPIs should be SMART - Specific, Measurable, Achievable, Relevant, Time-bound',
    'Internal Control': 'CRIME prevents fraud - Control environment, Risk assessment, Information, Monitoring, Existing controls',
    'Ethics': 'COCA - Competence, Objectivity, Confidentiality, Integrity',
    'Investment': 'NPV > 0 = Accept; IRR > Cost of Capital = Accept',
    'Capital': 'WACC = Cost of Debt + Cost of Equity, weighted by proportions',
  };
  
  for (const [key, aid] of Object.entries(memoryAids)) {
    if (topic?.toLowerCase().includes(key.toLowerCase())) {
      return aid;
    }
  }
  
  return `Key concept: ${topic}${subtopic ? ` - ${subtopic}` : ''} - focus on understanding the underlying principle.`;
}

/**
 * Enhance a question with additional fields
 */
function enhanceQuestion(question, sourceFile) {
  const enhanced = {
    id: question.id.toLowerCase(),
    version: 1,
    status: 'approved',
    courseId: question.courseId || 'cma',
    section: question.section,
    blueprintArea: question.blueprintArea,
    topic: question.topic,
    subtopic: question.subtopic,
    difficulty: question.difficulty,
    skillLevel: question.skillLevel,
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    whyWrong: generateWhyWrong(question),
    educational: generateEducational(question),
    examTip: generateExamTip(question),
    memoryAid: generateMemoryAid(question),
    reference: question.reference,
    sourceFile: sourceFile,
  };
  
  // Remove undefined fields
  Object.keys(enhanced).forEach(key => {
    if (enhanced[key] === undefined) {
      delete enhanced[key];
    }
  });
  
  return enhanced;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('Starting CMA Questions Migration...\n');
  
  // Get all TypeScript files
  const files = readdirSync(questionsDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts');
  
  console.log(`Found ${files.length} TypeScript files to process\n`);
  
  const cma1Questions = [];
  const cma2Questions = [];
  const errors = [];
  const seenIds = new Set();
  
  for (const file of files) {
    const filePath = join(questionsDir, file);
    console.log(`Processing: ${file}`);
    
    try {
      const questions = parseTypeScriptFile(filePath);
      console.log(`  Found ${questions.length} questions`);
      
      for (const q of questions) {
        // Check for duplicate IDs
        if (seenIds.has(q.id)) {
          console.warn(`  Duplicate ID: ${q.id} - skipping`);
          continue;
        }
        seenIds.add(q.id);
        
        const enhanced = enhanceQuestion(q, file);
        
        if (q.section === 'CMA1' || q.section?.startsWith('CMA1')) {
          cma1Questions.push(enhanced);
        } else if (q.section === 'CMA2' || q.section?.startsWith('CMA2')) {
          cma2Questions.push(enhanced);
        } else {
          // Try to determine from ID or filename
          if (file.includes('cma1') || q.id?.startsWith('cma1')) {
            enhanced.section = 'CMA1';
            cma1Questions.push(enhanced);
          } else if (file.includes('cma2') || q.id?.startsWith('cma2')) {
            enhanced.section = 'CMA2';
            cma2Questions.push(enhanced);
          } else {
            errors.push({ id: q.id, file, reason: 'Unknown section' });
          }
        }
      }
    } catch (e) {
      console.error(`  Error processing ${file}:`, e.message);
      errors.push({ file, reason: e.message });
    }
  }
  
  // Create output directories
  mkdirSync(join(contentDir, 'cma1'), { recursive: true });
  mkdirSync(join(contentDir, 'cma2'), { recursive: true });
  
  // Sort questions by ID for consistency
  cma1Questions.sort((a, b) => a.id.localeCompare(b.id));
  cma2Questions.sort((a, b) => a.id.localeCompare(b.id));
  
  // Write CMA1 questions
  const cma1Output = {
    $schema: '../../schema/question.schema.json',
    section: 'CMA1',
    exportedAt: new Date().toISOString(),
    questions: cma1Questions,
  };
  
  writeFileSync(
    join(contentDir, 'cma1/questions.json'),
    JSON.stringify(cma1Output, null, 2),
    'utf-8'
  );
  
  // Write CMA2 questions
  const cma2Output = {
    $schema: '../../schema/question.schema.json',
    section: 'CMA2',
    exportedAt: new Date().toISOString(),
    questions: cma2Questions,
  };
  
  writeFileSync(
    join(contentDir, 'cma2/questions.json'),
    JSON.stringify(cma2Output, null, 2),
    'utf-8'
  );
  
  // Print summary
  console.log('\n========================================');
  console.log('Migration Complete!');
  console.log('========================================\n');
  console.log(`CMA1 Questions: ${cma1Questions.length}`);
  console.log(`CMA2 Questions: ${cma2Questions.length}`);
  console.log(`Total Migrated: ${cma1Questions.length + cma2Questions.length}`);
  console.log(`\nOutput files:`);
  console.log(`  - content/cma/cma1/questions.json`);
  console.log(`  - content/cma/cma2/questions.json`);
  
  if (errors.length > 0) {
    console.log(`\nErrors/Warnings: ${errors.length}`);
    for (const err of errors) {
      console.log(`  - ${err.id || err.file}: ${err.reason}`);
    }
  }
  
  // Validate all questions have whyWrong
  const cma1MissingWhyWrong = cma1Questions.filter(q => !q.whyWrong || Object.keys(q.whyWrong).length !== 4);
  const cma2MissingWhyWrong = cma2Questions.filter(q => !q.whyWrong || Object.keys(q.whyWrong).length !== 4);
  
  if (cma1MissingWhyWrong.length > 0 || cma2MissingWhyWrong.length > 0) {
    console.log(`\nQuestions missing complete whyWrong:`);
    for (const q of cma1MissingWhyWrong) {
      console.log(`  - CMA1: ${q.id}`);
    }
    for (const q of cma2MissingWhyWrong) {
      console.log(`  - CMA2: ${q.id}`);
    }
  } else {
    console.log(`\nAll questions have complete whyWrong fields (4 options each)`);
  }
  
  return {
    cma1Count: cma1Questions.length,
    cma2Count: cma2Questions.length,
    total: cma1Questions.length + cma2Questions.length,
    errors,
  };
}

// Run migration
migrate().catch(console.error);
