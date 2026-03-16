#!/usr/bin/env node
/**
 * Generate Diagnostic Quizzes from Question Bank
 * 
 * Pulls balanced, diverse questions from the main question bank
 * and regenerates the diagnostic-quizzes.ts files.
 * 
 * Benefits:
 * - Single source of truth (main question bank)
 * - Answer distribution already balanced
 * - Questions have enhanced explanations
 * 
 * Run: node scripts/generate-diagnostic-quizzes.cjs [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

const CONTENT_DIR = 'content';
const OUTPUT_DIR = 'src/data';

const QUIZ_CONFIG = {
  questionsPerQuiz: 25,
  timeLimit: 35,
  passingScore: 65,
};

// Course configurations
const COURSES = {
  cpa: {
    sections: ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'],
    outputFile: 'cpa/diagnostic-quizzes.ts',
    areaNames: {
      'FAR-I': 'Conceptual Framework & Financial Reporting',
      'FAR-II': 'Select Financial Statement Accounts',
      'FAR-III': 'Select Transactions',
      'FAR-IV': 'State and Local Governments',
      'FAR-V': 'Not-for-Profit Entities',
      'AUD-I': 'Ethics & Professional Responsibilities',
      'AUD-II': 'Assessing Risk & Planned Response',
      'AUD-III': 'Performing Procedures & Obtaining Evidence',
      'AUD-IV': 'Forming Conclusions & Reporting',
      'REG-I': 'Ethics, Responsibilities & Federal Tax Procedures',
      'REG-II': 'Business Law',
      'REG-III': 'Federal Taxation of Individuals',
      'REG-IV': 'Federal Taxation of Entities',
      'REG-V': 'Federal Taxation of Property Transactions',
      'BAR-I': 'Business Analysis',
      'BAR-II': 'Technical Accounting & Reporting',
      'BAR-III': 'State and Local Governments',
      'ISC-I': 'Information Systems',
      'ISC-II': 'Security, Confidentiality & Privacy',
      'ISC-III': 'System and Organization Controls',
      'TCP-I': 'Tax Compliance for Individuals & PFP',
      'TCP-II': 'Entity Tax Compliance',
      'TCP-III': 'Entity Tax Planning',
      'TCP-IV': 'Property Transactions',
    },
  },
  ea: {
    sections: ['see1', 'see2', 'see3'],
    outputFile: 'ea/reference/diagnostic-quizzes.ts',
    areaNames: {
      'SEE1-A': 'Preliminary Work & Taxpayer Data',
      'SEE1-B': 'Income & Assets',
      'SEE1-C': 'Deductions & Credits',
      'SEE1-D': 'Other Topics',
      'SEE2-A': 'Business Entities',
      'SEE2-B': 'Business Financial Information',
      'SEE2-C': 'Specialized Returns',
      'SEE3-A': 'Representation',
      'SEE3-B': 'Practice Requirements',
      'SEE3-C': 'Procedures & Penalties',
    },
  },
  cma: {
    sections: ['cma1', 'cma2'],
    outputFile: 'cma/diagnostic-quizzes.ts',
    areaNames: {
      'CMA1-A': 'External Financial Reporting Decisions',
      'CMA1-B': 'Planning, Budgeting, and Forecasting',
      'CMA1-C': 'Performance Management',
      'CMA1-D': 'Cost Management',
      'CMA1-E': 'Internal Controls',
      'CMA1-F': 'Technology and Analytics',
      'CMA2-A': 'Financial Statement Analysis',
      'CMA2-B': 'Corporate Finance',
      'CMA2-C': 'Decision Analysis',
      'CMA2-D': 'Risk Management',
      'CMA2-E': 'Investment Decisions',
      'CMA2-F': 'Professional Ethics',
    },
  },
  cia: {
    sections: ['cia1', 'cia2', 'cia3'],
    outputFile: 'cia/diagnostic-quizzes.ts',
    areaNames: {
      'CIA1': 'Essentials of Internal Auditing',
      'CIA2': 'Practice of Internal Auditing',
      'CIA3': 'Business Knowledge for Internal Auditing',
    },
  },
  cisa: {
    sections: ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
    outputFile: 'cisa/diagnostic-quizzes.ts',
    areaNames: {
      'CISA1': 'Information Systems Auditing Process',
      'CISA2': 'Governance and Management of IT',
      'CISA3': 'Information Systems Acquisition, Development and Implementation',
      'CISA4': 'Information Systems Operations and Business Resilience',
      'CISA5': 'Protection of Information Assets',
    },
  },
  cfp: {
    sections: ['CFP-GEN', 'CFP-RISK', 'CFP-INV', 'CFP-TAX', 'CFP-RET', 'CFP-EST', 'CFP-PCR', 'CFP-PSY'],
    outputFile: 'cfp/diagnostic-quizzes.ts',
    areaNames: {
      'CFP-GEN': 'General Principles',
      'CFP-RISK': 'Risk Management',
      'CFP-INV': 'Investment Planning',
      'CFP-TAX': 'Tax Planning',
      'CFP-RET': 'Retirement Savings',
      'CFP-EST': 'Estate Planning',
      'CFP-PCR': 'Psychology of Financial Planning',
      'CFP-PSY': 'Professional Conduct & Regulation',
    },
    useSectionAsQuestions: true, // CFP puts all sections in one quiz file
  },
};

function loadQuestions(courseId, section) {
  // Try exact case first, then lowercase
  let filePath = path.join(CONTENT_DIR, courseId, section, 'questions.json');
  if (!fs.existsSync(filePath)) {
    filePath = path.join(CONTENT_DIR, courseId, section.toLowerCase(), 'questions.json');
  }
  if (!fs.existsSync(filePath)) {
    // Try uppercase
    filePath = path.join(CONTENT_DIR, courseId, section.toUpperCase(), 'questions.json');
  }
  if (!fs.existsSync(filePath)) {
    console.log(`  Warning: questions.json not found for ${section}`);
    return [];
  }
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data.questions || [];
  } catch (e) {
    console.log(`  Error loading ${filePath}: ${e.message}`);
    return [];
  }
}

function selectBalancedQuestions(questions, targetCount) {
  if (questions.length === 0) return [];
  
  // Group by blueprint area
  const byArea = {};
  for (const q of questions) {
    const area = q.blueprintArea || q.section || 'Other';
    if (!byArea[area]) byArea[area] = [];
    byArea[area].push(q);
  }
  
  const areas = Object.keys(byArea);
  const perArea = Math.ceil(targetCount / areas.length);
  const selected = [];
  
  // First pass: take from each area
  for (const area of areas) {
    const pool = byArea[area];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, perArea));
  }
  
  // Trim to target
  if (selected.length > targetCount) {
    const shuffled = [...selected].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, targetCount);
  }
  
  // Add more if needed
  if (selected.length < targetCount) {
    const selectedIds = new Set(selected.map(q => q.id));
    const remaining = questions.filter(q => !selectedIds.has(q.id));
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, targetCount - selected.length));
  }
  
  // Final shuffle
  return selected.sort(() => Math.random() - 0.5);
}

function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

function formatQuestion(q, idx) {
  const id = `${q.section?.toLowerCase() || 'q'}-d${String(idx + 1).padStart(2, '0')}`;
  return `    {
      id: '${id}',
      question: '${escapeString(q.question)}',
      options: [${q.options.map(o => `'${escapeString(o)}'`).join(', ')}],
      correctAnswer: ${q.correctAnswer},
      blueprintArea: '${q.blueprintArea || q.section || ''}',
      topic: '${escapeString(q.topic || '')}',
      difficulty: '${q.difficulty || 'medium'}',
      explanation: '${escapeString(q.explanation || '')}',
    }`;
}

// Convert section name to valid JS identifier (replace dashes with underscores)
function toIdentifier(section) {
  return section.replace(/-/g, '_');
}

function generateQuizFile(courseId, config) {
  const quizzes = {};
  let totalQuestions = 0;
  
  for (const section of config.sections) {
    const questions = loadQuestions(courseId, section);
    const selected = selectBalancedQuestions(questions, QUIZ_CONFIG.questionsPerQuiz);
    
    if (selected.length > 0) {
      quizzes[section.toUpperCase()] = {
        section: section.toUpperCase(),
        questions: selected,
      };
      totalQuestions += selected.length;
      console.log(`  ${section.toUpperCase()}: Selected ${selected.length} questions from ${questions.length}`);
    }
  }
  
  // Generate TypeScript file
  const sectionUpper = Object.keys(quizzes).map(s => s.toUpperCase());
  
  // Calculate import path depth based on output file location
  const depth = config.outputFile.split('/').length;
  const importPrefix = '../'.repeat(depth);
  
  let output = `/**
 * ${courseId.toUpperCase()} Diagnostic Quizzes
 * Auto-generated from question bank on ${new Date().toISOString().split('T')[0]}
 * ${QUIZ_CONFIG.questionsPerQuiz}-question assessments for knowledge gap identification.
 */
import type { DiagnosticQuiz } from '${importPrefix}types/diagnostic';

// Blueprint area display names
export const ${courseId.toUpperCase()}_AREA_NAMES: Record<string, string> = {
${Object.entries(config.areaNames).map(([k, v]) => `  '${k}': '${escapeString(v)}',`).join('\n')}
};

`;

  // Generate each section's quiz
  for (const [sectionKey, quiz] of Object.entries(quizzes)) {
    const identifier = toIdentifier(sectionKey);
    output += `export const ${identifier}_DIAGNOSTIC: DiagnosticQuiz = {
  courseId: '${courseId}',
  section: '${sectionKey}',
  title: '${sectionKey} Diagnostic Assessment',
  description: 'Assess your readiness for ${config.areaNames[sectionKey] || sectionKey}',
  timeLimit: ${QUIZ_CONFIG.timeLimit},
  passingScore: ${QUIZ_CONFIG.passingScore},
  questions: [
${quiz.questions.map((q, i) => formatQuestion(q, i)).join(',\n')}
  ],
};

`;
  }

  // Generate combined export
  output += `// Combined export for all ${courseId.toUpperCase()} diagnostic quizzes
export const ${courseId.toUpperCase()}_DIAGNOSTIC_QUIZZES: Record<string, DiagnosticQuiz> = {
${sectionUpper.map(s => `  '${s}': ${toIdentifier(s)}_DIAGNOSTIC,`).join('\n')}
};
`;

  return { output, totalQuestions };
}

function main() {
  console.log('='.repeat(60));
  console.log('Generate Diagnostic Quizzes from Question Bank');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log('='.repeat(60));
  
  let totalGenerated = 0;
  
  for (const [courseId, config] of Object.entries(COURSES)) {
    console.log(`\nProcessing ${courseId.toUpperCase()}...`);
    
    const { output, totalQuestions } = generateQuizFile(courseId, config);
    const outputPath = path.join(OUTPUT_DIR, config.outputFile);
    
    console.log(`  Total: ${totalQuestions} questions across ${config.sections.length} sections`);
    
    if (!dryRun) {
      // Ensure directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(outputPath, output);
      console.log(`  ✓ Wrote ${outputPath}`);
    } else {
      console.log(`  Would write ${outputPath}`);
    }
    
    totalGenerated += totalQuestions;
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`Total questions generated: ${totalGenerated}`);
  if (dryRun) {
    console.log('(DRY RUN - no files were modified)');
  }
  console.log('='.repeat(60));
}

main();
