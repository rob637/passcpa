/**
 * CMA Questions Migration Script V2
 * 
 * Migrates CMA questions from TypeScript to enhanced JSON format
 * Uses dynamic import to properly parse TypeScript files
 * 
 * Usage: npx tsx scripts/migrate-cma-to-json-v2.ts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Import the CMA questions index directly
import {
  CMA_PART1_QUESTIONS,
  CMA_PART2_QUESTIONS,
  CMA_ALL_QUESTIONS,
} from '../src/data/cma/questions/index.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const contentDir = join(rootDir, 'content/cma');

// Define Question type locally
interface Question {
  id: string;
  courseId?: string;
  section: string;
  blueprintArea?: string;
  topic: string;
  subtopic?: string;
  difficulty: string;
  skillLevel?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reference?: string;
}

interface EnhancedQuestion extends Question {
  version: number;
  status: string;
  whyWrong: Record<string, string>;
  educational: string;
  examTip: string;
  memoryAid: string;
  sourceFile?: string;
}

// CMA Blueprint areas for reference
const CMA_BLUEPRINT: Record<string, Record<string, string>> = {
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
const REFERENCES: Record<string, string> = {
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
 * Generate whyWrong explanations for each option
 */
function generateWhyWrong(question: Question): Record<string, string> {
  const { options, correctAnswer, explanation, topic, subtopic } = question;
  const whyWrong: Record<string, string> = {};
  
  for (let i = 0; i < 4; i++) {
    const optionText = options[i] || `Option ${String.fromCharCode(65 + i)}`;
    const isCorrect = i === correctAnswer;
    
    if (isCorrect) {
      whyWrong[i.toString()] = `Why option ${String.fromCharCode(65 + i)} is CORRECT - ${explanation}`;
    } else {
      whyWrong[i.toString()] = generateWrongExplanation(optionText, options[correctAnswer], topic, subtopic, i);
    }
  }
  
  return whyWrong;
}

/**
 * Generate explanation for why an option is wrong
 */
function generateWrongExplanation(wrongOption: string, correctOption: string, topic: string, subtopic: string | undefined, index: number): string {
  const letter = String.fromCharCode(65 + index);
  
  // Common patterns for CMA topics
  const topicHints: Record<string, string> = {
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
    'Consolidation': 'does not properly apply consolidated reporting requirements',
    'GAAP': 'does not comply with generally accepted accounting principles',
    'IFRS': 'does not align with international financial reporting standards',
    'Tax': 'misapplies tax accounting concepts',
    'Segment': 'does not properly apply segment reporting requirements',
    'Lease': 'does not correctly classify or account for lease transactions',
    'Inventory': 'incorrectly values or reports inventory',
    'Depreciation': 'misapplies depreciation methods',
    'Revenue': 'does not correctly apply revenue recognition principles',
    'Receivable': 'does not properly account for receivables',
    'Payable': 'does not properly account for payables',
    'Debt': 'incorrectly applies debt accounting',
    'Equity': 'does not properly account for equity transactions',
    'Dividend': 'misapplies dividend accounting',
    'Stock': 'does not correctly account for stock transactions',
    'Currency': 'misapplies foreign currency translation',
    'Hedge': 'does not properly apply hedge accounting',
    'Derivative': 'incorrectly accounts for derivative instruments',
    'Fair Value': 'does not properly apply fair value measurement',
    'Impairment': 'does not correctly assess or record impairment',
    'Goodwill': 'misapplies goodwill accounting',
    'Intangible': 'incorrectly accounts for intangible assets',
    'Finance': 'does not align with financial management principles',
    'Decision': 'does not apply proper decision analysis techniques',
    'Sensitivity': 'does not correctly perform sensitivity analysis',
    'Scenario': 'does not properly apply scenario analysis',
    'Forecast': 'does not follow proper forecasting methodology',
    'Planning': 'does not align with strategic planning principles',
    'Standard Cost': 'misapplies standard costing concepts',
    'Activity': 'does not correctly apply activity-based costing',
    'Job': 'misapplies job costing methods',
    'Process': 'does not correctly apply process costing',
    'Absorption': 'misapplies absorption costing concepts',
    'Direct': 'does not correctly apply direct costing',
    'Marginal': 'misapplies marginal costing concepts',
    'Relevant': 'does not properly identify relevant costs',
    'Sunk': 'incorrectly treats sunk costs as relevant',
    'Opportunity': 'does not properly consider opportunity costs',
  };
  
  let hint = 'does not align with management accounting principles';
  for (const [key, value] of Object.entries(topicHints)) {
    if (topic?.toLowerCase().includes(key.toLowerCase()) || 
        subtopic?.toLowerCase()?.includes(key.toLowerCase()) ||
        wrongOption.toLowerCase().includes(key.toLowerCase())) {
      hint = value;
      break;
    }
  }
  
  return `Why option ${letter} is WRONG - This answer ${hint}. The correct answer "${correctOption?.substring(0, 80)}${correctOption?.length > 80 ? '...' : ''}" properly addresses the concept being tested.`;
}

/**
 * Generate educational content
 */
function generateEducational(question: Question): string {
  const { topic, subtopic, explanation, blueprintArea } = question;
  const allAreas = { ...CMA_BLUEPRINT['CMA1'], ...CMA_BLUEPRINT['CMA2'] };
  const areaName = (blueprintArea && allAreas[blueprintArea]) || topic;
  
  return `Understanding ${topic}${subtopic ? ` (${subtopic})` : ''} is essential for ${areaName}. ${explanation.substring(0, 200)}${explanation.length > 200 ? '...' : ''} This concept is frequently tested on the CMA exam because it demonstrates core management accounting competencies that practitioners use daily.`;
}

/**
 * Generate exam tip
 */
function generateExamTip(question: Question): string {
  const { topic, difficulty } = question;
  
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
  
  const index = Math.abs(question.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % tips.length;
  return tips[index];
}

/**
 * Generate memory aid
 */
function generateMemoryAid(question: Question): string {
  const { topic, subtopic, options, correctAnswer } = question;
  const correctOption = options[correctAnswer];
  
  // Try to create an acronym or memorable phrase
  const words = (correctOption || '').split(/\s+/).filter(w => w.length > 2);
  if (words.length >= 2 && words.length <= 5) {
    const acronym = words.map(w => w[0]?.toUpperCase() || '').join('');
    if (acronym.length >= 2 && acronym.length <= 5 && /^[A-Z]+$/.test(acronym)) {
      return `Remember "${acronym}" - ${words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).slice(0, 4).join(', ')}.`;
    }
  }
  
  // Fallback to topic-based memory aid
  const memoryAids: Record<string, string> = {
    'Financial Statements': 'ALICE - Assets = Liabilities + Interests (Capital + Earnings)',
    'Balance Sheet': 'DEAD CLIC - Debits: Expenses, Assets, Dividends | Credits: Liabilities, Income, Capital',
    'Ratio': 'Current and Quick ratios test liquidity - Current is broader, Quick excludes inventory',
    'Budget': 'SMART budgeting - Specific, Measurable, Achievable, Relevant, Time-bound',
    'Variance': 'Price vs Volume - Price comes first, Volume shows capacity usage',
    'Cost': 'Variable costs VARY with volume; Fixed costs stay FIXED',
    'CVP': 'BEP = Fixed Costs / CM per unit - Break-even is where profit = zero',
    'Performance': 'KPIs should be SMART - Specific, Measurable, Achievable, Relevant, Time-bound',
    'Internal Control': 'CRIME prevents fraud - Control environment, Risk assessment, Information, Monitoring, Existing controls',
    'Ethics': 'COCA - Competence, Objectivity, Confidentiality, Integrity (IMA Standards)',
    'Investment': 'NPV > 0 = Accept; IRR > Cost of Capital = Accept',
    'Capital': 'WACC = Cost of Debt + Cost of Equity, weighted by proportions',
    'Consolidation': 'ELIE - Eliminate intercompany transactions',
    'Segment': 'SIZE matters - 10% revenue, assets, or profit threshold for segments',
    'Lease': 'OWNS it? Capitalize it. Finance leases transfer ownership risks.',
    'Inventory': 'LIFO vs FIFO - In inflation, LIFO = Lower income, Lower taxes',
    'Depreciation': 'SYD and DDB front-load depreciation; Straight-line is steady',
    'Revenue': 'RIVER - Revenue recognition when performance obligation satisfied',
    'Working Capital': 'WC = Current Assets - Current Liabilities = Operating liquidity',
    'Hedge': 'Hedging offsets risk - Match the hedge to the exposure',
    'Fair Value': 'Level 1: Quoted prices; Level 2: Observable; Level 3: Unobservable',
    'Standard Cost': 'SVP - Standard variance = Price + Volume components',
    'Activity': 'ABC assigns costs based on activity drivers, not volume alone',
    'Job': 'Job costing tracks costs to specific jobs or orders',
    'Process': 'Process costing averages costs across equivalent units',
    'Decision': 'Relevant costs: Future, Differ between alternatives',
    'NPV': 'NPV = PV of inflows - PV of outflows; Positive = Accept',
    'IRR': 'IRR is the rate that makes NPV = 0',
    'Risk': 'RISK = Probability × Impact',
    'Leverage': 'DOL × DFL = DCL - Combined leverage magnifies returns',
    'Forecast': 'Moving averages smooth out fluctuations',
    'Break-even': 'BEP in units = Fixed Costs ÷ Contribution Margin per unit',
    'Transfer': 'Transfer price range: Variable cost to market price',
    'Balanced Scorecard': 'FLIC - Financial, Learning, Internal, Customer perspectives',
    'Profitability': 'ROE = Net Income ÷ Equity; ROA = Net Income ÷ Assets',
    'Liquidity': 'Current Ratio > 1 = More assets than liabilities due short-term',
    'Solvency': 'D/E Ratio measures financial leverage and long-term stability',
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
function enhanceQuestion(question: Question): EnhancedQuestion {
  // Ensure ID is lowercase
  const id = question.id.toLowerCase();
  
  // Determine blueprintArea from section if not set
  let blueprintArea = question.blueprintArea;
  if (!blueprintArea) {
    const section = question.section;
    if (section === 'CMA1' || section.startsWith('CMA1')) {
      blueprintArea = 'CMA1-A';
    } else if (section === 'CMA2' || section.startsWith('CMA2')) {
      blueprintArea = 'CMA2-A';
    }
  }
  
  const enhanced: EnhancedQuestion = {
    id,
    version: 1,
    status: 'approved',
    courseId: question.courseId || 'cma',
    section: question.section,
    blueprintArea: blueprintArea || 'CMA1-A',
    topic: question.topic || 'General',
    subtopic: question.subtopic,
    difficulty: question.difficulty || 'medium',
    skillLevel: question.skillLevel || 'Application',
    question: question.question,
    options: question.options,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    whyWrong: generateWhyWrong(question),
    educational: generateEducational(question),
    examTip: generateExamTip(question),
    memoryAid: generateMemoryAid(question),
    reference: question.reference || REFERENCES[blueprintArea || 'CMA1-A'] || 'IMA Statement on Management Accounting',
  };
  
  // Remove undefined fields
  if (enhanced.subtopic === undefined) {
    delete (enhanced as any).subtopic;
  }
  
  return enhanced;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('Starting CMA Questions Migration V2...\n');
  
  console.log(`Total questions from index: ${CMA_ALL_QUESTIONS.length}`);
  console.log(`  CMA Part 1: ${CMA_PART1_QUESTIONS.length}`);
  console.log(`  CMA Part 2: ${CMA_PART2_QUESTIONS.length}\n`);
  
  const seenIds = new Set<string>();
  const errors: { id: string; reason: string }[] = [];
  
  // Process CMA1 questions
  const cma1Questions: EnhancedQuestion[] = [];
  for (const q of CMA_PART1_QUESTIONS) {
    const id = q.id.toLowerCase();
    if (seenIds.has(id)) {
      console.warn(`  Duplicate ID: ${id} - skipping`);
      continue;
    }
    seenIds.add(id);
    
    try {
      const enhanced = enhanceQuestion(q as Question);
      enhanced.section = 'CMA1'; // Ensure correct section
      cma1Questions.push(enhanced);
    } catch (e) {
      errors.push({ id, reason: (e as Error).message });
    }
  }
  
  // Process CMA2 questions
  const cma2Questions: EnhancedQuestion[] = [];
  for (const q of CMA_PART2_QUESTIONS) {
    const id = q.id.toLowerCase();
    if (seenIds.has(id)) {
      console.warn(`  Duplicate ID: ${id} - skipping`);
      continue;
    }
    seenIds.add(id);
    
    try {
      const enhanced = enhanceQuestion(q as Question);
      enhanced.section = 'CMA2'; // Ensure correct section
      cma2Questions.push(enhanced);
    } catch (e) {
      errors.push({ id, reason: (e as Error).message });
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
    console.log(`\nErrors: ${errors.length}`);
    for (const err of errors) {
      console.log(`  - ${err.id}: ${err.reason}`);
    }
  }
  
  // Validate all questions have whyWrong with 4 keys
  const cma1MissingWhyWrong = cma1Questions.filter(q => !q.whyWrong || Object.keys(q.whyWrong).length !== 4);
  const cma2MissingWhyWrong = cma2Questions.filter(q => !q.whyWrong || Object.keys(q.whyWrong).length !== 4);
  
  if (cma1MissingWhyWrong.length > 0 || cma2MissingWhyWrong.length > 0) {
    console.log(`\nQuestions with incomplete whyWrong (not exactly 4 options):`);
    for (const q of cma1MissingWhyWrong) {
      console.log(`  - CMA1: ${q.id} (${Object.keys(q.whyWrong || {}).length} keys)`);
    }
    for (const q of cma2MissingWhyWrong) {
      console.log(`  - CMA2: ${q.id} (${Object.keys(q.whyWrong || {}).length} keys)`);
    }
  } else {
    console.log(`\n✓ All questions have complete whyWrong fields (4 options each)`);
  }
  
  // Validate all questions have all required enhanced fields
  const allQuestions = [...cma1Questions, ...cma2Questions];
  const missingFields = allQuestions.filter(q => 
    !q.educational || !q.examTip || !q.memoryAid || !q.reference
  );
  
  if (missingFields.length > 0) {
    console.log(`\nQuestions missing enhanced fields:`);
    for (const q of missingFields.slice(0, 10)) {
      const missing = [];
      if (!q.educational) missing.push('educational');
      if (!q.examTip) missing.push('examTip');
      if (!q.memoryAid) missing.push('memoryAid');
      if (!q.reference) missing.push('reference');
      console.log(`  - ${q.id}: missing ${missing.join(', ')}`);
    }
    if (missingFields.length > 10) {
      console.log(`  ... and ${missingFields.length - 10} more`);
    }
  } else {
    console.log(`✓ All questions have educational, examTip, memoryAid, and reference fields`);
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
