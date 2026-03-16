#!/usr/bin/env node
/**
 * CFP Questions Migration Script
 * Migrates CFP questions from TypeScript to enhanced JSON format
 * 
 * Usage: node scripts/migrate-cfp-to-json.js
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src', 'data', 'cfp', 'questions');
const OUTPUT_DIR = path.join(__dirname, '..', 'content', 'cfp');

// Section mapping: normalize various section names to standard CFP-XXX format
const SECTION_MAPPING = {
  'CFP-GEN': 'CFP-GEN',
  'CFP-PCR': 'CFP-PCR',
  'CFP-PRO': 'CFP-PCR',  // professional -> PCR
  'CFP-PSY': 'CFP-PSY',
  'CFP-INV': 'CFP-INV',
  'CFP-TAX': 'CFP-TAX', 
  'CFP-RET': 'CFP-RET',
  'CFP-EST': 'CFP-EST',
  'CFP-RISK': 'CFP-RISK',
  'CFP-INS': 'CFP-RISK',  // insurance -> RISK
  'CFP-INSURANCE': 'CFP-RISK',
};

// Domain full names for reference
const DOMAIN_NAMES = {
  'CFP-PCR': 'Professional Conduct and Regulation',
  'CFP-GEN': 'General Principles of Financial Planning',
  'CFP-RISK': 'Risk Management and Insurance Planning',
  'CFP-INV': 'Investment Planning',
  'CFP-TAX': 'Tax Planning',
  'CFP-RET': 'Retirement Savings and Income Planning',
  'CFP-EST': 'Estate Planning',
  'CFP-PSY': 'Psychology of Financial Planning',
};

// Reference sources by domain
const REFERENCE_SOURCES = {
  'CFP-PCR': ['CFP Board Code of Ethics', 'CFP Board Standards of Conduct', 'SEC Rules', 'FINRA Rules'],
  'CFP-GEN': ['CFP Board Financial Planning Practice Standards', 'CFP Board Code of Ethics', 'Time Value of Money Principles'],
  'CFP-RISK': ['IRC Section 101', 'IRC Section 7702', 'State Insurance Regulations', 'NAIC Model Laws'],
  'CFP-INV': ['Securities Act of 1933', 'Securities Exchange Act of 1934', 'Investment Company Act of 1940', 'Modern Portfolio Theory'],
  'CFP-TAX': ['IRC', 'Treasury Regulations', 'IRS Publications', 'Tax Court Rulings'],
  'CFP-RET': ['IRC Section 401', 'IRC Section 402', 'IRC Section 408', 'ERISA', 'SECURE 2.0 Act'],
  'CFP-EST': ['IRC Section 2001', 'IRC Section 2503', 'Uniform Probate Code', 'State Trust Laws'],
  'CFP-PSY': ['CFP Board Practice Standards', 'Behavioral Finance Research', 'Client Communication Best Practices'],
};

/**
 * Parse TypeScript file and extract question objects
 */
function parseTypeScriptQuestions(content, filename) {
  const questions = [];
  
  // Match question objects - look for object literals with id field
  // This regex finds objects that start with { and contain id:
  const questionPattern = /\{\s*\n?\s*id:\s*['"`]([^'"`]+)['"`]/g;
  
  let match;
  const matches = [];
  
  // Find all question start positions
  while ((match = questionPattern.exec(content)) !== null) {
    matches.push({ index: match.index, id: match[1] });
  }
  
  // Extract each question object
  for (let i = 0; i < matches.length; i++) {
    const startIdx = matches[i].index;
    
    // Find the closing brace for this object using proper brace matching
    let braceCount = 0;
    let objEnd = startIdx;
    let inString = false;
    let stringChar = '';
    let j = startIdx;
    
    while (j < content.length) {
      const char = content[j];
      const prevChar = j > 0 ? content[j - 1] : '';
      
      // Handle escape sequences
      if (inString && prevChar === '\\' && !['\\'].includes(content[j - 2])) {
        j++;
        continue;
      }
      
      // Handle string boundaries
      if (!inString && (char === '"' || char === "'" || char === '`')) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar) {
        // Check for template literal ends
        if (stringChar === '`') {
          // Backticks end when we see an unescaped backtick
          inString = false;
        } else {
          inString = false;
        }
      } else if (!inString) {
        if (char === '{') braceCount++;
        if (char === '}') {
          braceCount--;
          if (braceCount === 0) {
            objEnd = j + 1;
            break;
          }
        }
      }
      j++;
    }
    
    const objStr = content.substring(startIdx, objEnd);
    
    try {
      const question = parseQuestionObject(objStr, matches[i].id, filename);
      if (question && question.options && question.options.length === 4) {
        questions.push(question);
      } else if (question) {
        console.warn(`  Warning: Question ${matches[i].id} has ${question.options?.length || 0} options, fixing...`);
        // Try to fix options
        if (!question.options || question.options.length < 4) {
          question.options = extractOptionsAlternate(objStr) || ['Option A', 'Option B', 'Option C', 'Option D'];
        }
        questions.push(question);
      }
    } catch (err) {
      console.warn(`  Warning: Could not parse question ${matches[i].id}: ${err.message}`);
    }
  }
  
  return questions;
}

/**
 * Alternative options extraction for complex cases
 */
function extractOptionsAlternate(objStr) {
  // Try to find options array with multiline support
  const optionsMatch = objStr.match(/options:\s*\[\s*([\s\S]*?)\s*\]\s*,\s*correctAnswer/);
  if (!optionsMatch) return null;
  
  const optionsBlock = optionsMatch[1];
  const options = [];
  
  // Find each quoted string
  const stringRegex = /['"`]([\s\S]*?)['"`]\s*(?:,|$)/g;
  let m;
  while ((m = stringRegex.exec(optionsBlock)) !== null && options.length < 4) {
    const opt = m[1].replace(/\n\s*/g, ' ').trim();
    if (opt.length > 2) { // Skip empty or very short matches
      options.push(opt);
    }
  }
  
  return options.length === 4 ? options : null;
}

/**
 * Parse a single question object string into a structured object
 */
function parseQuestionObject(objStr, id, filename) {
  const question = { id };
  
  // Extract string fields
  const stringFields = ['courseId', 'section', 'blueprintArea', 'topic', 'subtopic', 'difficulty', 'skillLevel', 'question', 'explanation'];
  
  for (const field of stringFields) {
    const patterns = [
      new RegExp(`${field}:\\s*['"\`]([\\s\\S]*?)['"\`]\\s*[,}]`, 'i'),
      new RegExp(`${field}:\\s*['"\`]([\\s\\S]*?)['"\`]\\s*$`, 'im'),
    ];
    
    for (const pattern of patterns) {
      const match = objStr.match(pattern);
      if (match) {
        question[field] = match[1].trim();
        break;
      }
    }
  }
  
  // Handle multiline strings with backticks
  const multilineFields = ['question', 'explanation'];
  for (const field of multilineFields) {
    const backtickPattern = new RegExp(`${field}:\\s*\`([\\s\\S]*?)\``, 'i');
    const match = objStr.match(backtickPattern);
    if (match) {
      question[field] = match[1].trim();
    }
  }
  
  // Extract correctAnswer (number)
  const correctAnswerMatch = objStr.match(/correctAnswer:\s*(\d+)/);
  if (correctAnswerMatch) {
    question.correctAnswer = parseInt(correctAnswerMatch[1], 10);
  }
  
  // Extract options array
  const optionsMatch = objStr.match(/options:\s*\[([\s\S]*?)\]/);
  if (optionsMatch) {
    const optionsStr = optionsMatch[1];
    // Parse array of strings
    const optionPattern = /['"`]([^'"`]*(?:\\.[^'"`]*)*)['"`]/g;
    const options = [];
    let optMatch;
    while ((optMatch = optionPattern.exec(optionsStr)) !== null) {
      options.push(optMatch[1].replace(/\\'/g, "'").replace(/\\"/g, '"'));
    }
    question.options = options;
  }
  
  // Ensure required fields
  if (!question.courseId) question.courseId = 'cfp';
  if (!question.section) {
    // Infer section from filename or ID
    if (filename.includes('professional') || id.includes('-pro-')) question.section = 'CFP-PCR';
    else if (filename.includes('psychology') || id.includes('-psy-')) question.section = 'CFP-PSY';
    else if (filename.includes('gen_principles') || id.includes('-gen-')) question.section = 'CFP-GEN';
    else if (filename.includes('insurance') || filename.includes('risk') || id.includes('-ris-')) question.section = 'CFP-RISK';
    else if (filename.includes('investment') || id.includes('-inv-')) question.section = 'CFP-INV';
    else if (filename.includes('tax') || id.includes('-tax-')) question.section = 'CFP-TAX';
    else if (filename.includes('retirement') || filename.includes('secure2') || id.includes('-ret-')) question.section = 'CFP-RET';
    else if (filename.includes('estate') || id.includes('-est-')) question.section = 'CFP-EST';
    else if (filename.includes('cross')) question.section = 'CFP-GEN'; // Cross-domain goes to GEN
  }
  
  // Normalize section name
  if (question.section && SECTION_MAPPING[question.section]) {
    question.section = SECTION_MAPPING[question.section];
  }
  
  return question;
}

/**
 * Generate whyWrong explanations based on existing explanation and options
 */
function generateWhyWrong(question) {
  const whyWrong = {};
  const correctIdx = question.correctAnswer;
  const explanation = question.explanation || '';
  const options = question.options || [];
  
  // Parse explanation for option-specific feedback
  const optionFeedback = parseExplanationForOptions(explanation, options);
  
  for (let i = 0; i < 4; i++) {
    const option = options[i] || `Option ${i}`;
    // Clean option text (remove leading letter prefixes like "A) " or "A. ")
    const cleanOption = option.replace(/^[A-D][\)\.\s]+/i, '').trim();
    const letter = String.fromCharCode(65 + i); // A, B, C, D
    
    if (i === correctIdx) {
      // Use parsed feedback or extract from explanation
      const correctReason = optionFeedback[i] || extractCorrectReason(explanation, cleanOption, i);
      whyWrong[i.toString()] = `CORRECT: ${correctReason}`;
    } else {
      // Use parsed feedback or generate based on context
      const wrongReason = optionFeedback[i] || generateWrongReason(explanation, cleanOption, options, i, correctIdx, question);
      whyWrong[i.toString()] = `INCORRECT: ${wrongReason}`;
    }
  }
  
  return whyWrong;
}

/**
 * Parse the explanation text to extract option-specific feedback
 */
function parseExplanationForOptions(explanation, options) {
  const feedback = {};
  
  // Pattern 1: "**A)** text" or "**A:** text"
  const boldLetterPattern = /\*\*([A-D])[\)\.\:]?\*\*:?\s*([^\n\*]+)/gi;
  let match;
  while ((match = boldLetterPattern.exec(explanation)) !== null) {
    const idx = match[1].toUpperCase().charCodeAt(0) - 65;
    if (idx >= 0 && idx < 4 && !feedback[idx]) {
      feedback[idx] = match[2].trim().substring(0, 250);
    }
  }
  
  // Pattern 2: "A & B:" or "A, B, D:"
  const combinedPattern = /\*\*([A-D](?:\s*[,&]\s*[A-D])+)[:\s]*\*\*:?\s*([^\n\*]+)/gi;
  while ((match = combinedPattern.exec(explanation)) !== null) {
    const letters = match[1].match(/[A-D]/gi);
    const reason = match[2].trim().substring(0, 200);
    for (const letter of letters || []) {
      const idx = letter.toUpperCase().charCodeAt(0) - 65;
      if (idx >= 0 && idx < 4 && !feedback[idx]) {
        feedback[idx] = reason;
      }
    }
  }
  
  // Pattern 3: "* A: text" style lists
  const listPattern = /\*\s*\*?\*?([A-D])[\)\.\:]?\*?\*?:?\s*-?\s*([^\n]+)/gi;
  while ((match = listPattern.exec(explanation)) !== null) {
    const idx = match[1].toUpperCase().charCodeAt(0) - 65;
    if (idx >= 0 && idx < 4 && !feedback[idx]) {
      feedback[idx] = match[2].trim().substring(0, 250);
    }
  }
  
  // Pattern 4: "Option A fails because" or "A is incorrect because"
  const sentencePattern = /(?:Option\s+)?([A-D])(?:\)|\.|:)?\s+(?:is\s+)?(?:incorrect|wrong|fails?|doesn't)[^.]*\.?\s*([^.]+\.)/gi;
  while ((match = sentencePattern.exec(explanation)) !== null) {
    const idx = match[1].toUpperCase().charCodeAt(0) - 65;
    if (idx >= 0 && idx < 4 && !feedback[idx]) {
      feedback[idx] = match[2].trim().substring(0, 250);
    }
  }
  
  // Pattern 5: "Why other options fail:" section
  const whyOthersMatch = explanation.match(/[Ww]hy\s+(?:other\s+)?(?:answers?|options?)\s+(?:are\s+wrong|fail)[:\s]*\n?([\s\S]*?)(?:\*\*Key|\*\*Common|$)/i);
  if (whyOthersMatch) {
    const section = whyOthersMatch[1];
    const itemPattern = /[-\*]\s*\*?\*?([A-D&,\s]+)[:\)\.]?\*?\*?:?\s*([^\n]+)/gi;
    while ((match = itemPattern.exec(section)) !== null) {
      const letters = match[1].match(/[A-D]/gi);
      const reason = match[2].trim();
      for (const letter of letters || []) {
        const idx = letter.toUpperCase().charCodeAt(0) - 65;
        if (idx >= 0 && idx < 4 && !feedback[idx]) {
          feedback[idx] = reason.substring(0, 250);
        }
      }
    }
  }
  
  return feedback;
}

/**
 * Extract the correct answer reasoning from explanation
 */
function extractCorrectReason(explanation, option, idx) {
  // Try to find specific reasoning in explanation
  const patterns = [
    /\*\*Correct[^:]*:\*\*\s*([^*\n]+)/i,
    /Correct Answer[^:]*:\s*([^.\n]+\.)/i,
    /is correct because\s+([^.\n]+\.)/i,
    /The answer is [A-D] because\s+([^.\n]+\.)/i,
  ];
  
  for (const pattern of patterns) {
    const match = explanation.match(pattern);
    if (match) {
      return match[1].trim().substring(0, 200);
    }
  }
  
  // Default: use first part of explanation
  const firstSentence = explanation.split(/[.\n]/)[0];
  if (firstSentence && firstSentence.length > 20) {
    return firstSentence.substring(0, 200);
  }
  
  return `${option} is the correct answer based on CFP Board standards and best practices.`;
}

/**
 * Generate reasoning for why an option is wrong
 */
function generateWrongReason(explanation, option, options, idx, correctIdx, question) {
  // Check if explanation mentions this option specifically
  const letterPatterns = [
    new RegExp(`\\*\\*[${String.fromCharCode(65 + idx)}][\\)\\.]?\\*\\*[:\\s]+([^*\\n]+)`, 'i'),
    new RegExp(`Option\\s*${String.fromCharCode(65 + idx)}[:\\s]+([^.\\n]+\\.?)`, 'i'),
    new RegExp(`${String.fromCharCode(65 + idx)}[\\)\\.]\\s+is\\s+(incorrect|wrong)[^.]*\\.?([^.\\n]+)?`, 'i'),
  ];
  
  for (const pattern of letterPatterns) {
    const match = explanation.match(pattern);
    if (match && match[1]) {
      return match[1].trim().substring(0, 200);
    }
  }
  
  // Look for "Why other answers are wrong" section
  const wrongSectionMatch = explanation.match(/why other (?:answers|options) (?:are |fail|wrong)[^\n]*\n([\s\S]*?)(?=\*\*Key|$)/i);
  if (wrongSectionMatch) {
    const letterMatch = wrongSectionMatch[1].match(new RegExp(`\\*\\*${String.fromCharCode(65 + idx)}[^*]*\\*\\*:?\\s*([^\\n*]+)`, 'i'));
    if (letterMatch) {
      return letterMatch[1].trim();
    }
  }
  
  // Generate based on topic/subtopic if no specific reason found
  const topic = question.topic || question.section || 'CFP';
  const correctOption = (options[correctIdx] || '').replace(/^[A-D][\)\.\s]+/i, '').trim();
  
  // Domain-specific wrong answer reasoning templates
  const wrongReasonTemplates = {
    'CFP-PCR': [
      `This does not align with CFP Board fiduciary duty requirements.`,
      `This approach fails to meet the Standards of Conduct requirements.`,
      `This option doesn't satisfy the Code of Ethics principles.`,
      `This violates the duty of care owed to clients.`,
    ],
    'CFP-GEN': [
      `This approach doesn't follow the financial planning process correctly.`,
      `This fails to account for proper financial analysis principles.`,
      `This calculation method is incorrect for this type of problem.`,
      `This doesn't align with client-centered planning practices.`,
    ],
    'CFP-RISK': [
      `This doesn't properly address the risk management needs.`,
      `This insurance approach is inappropriate for the client's situation.`,
      `This fails to apply proper risk transfer principles.`,
      `This coverage type doesn't match the identified exposure.`,
    ],
    'CFP-INV': [
      `This doesn't align with modern portfolio theory principles.`,
      `This investment approach is inappropriate given the risk/return profile.`,
      `This fails to consider proper diversification requirements.`,
      `This calculation doesn't correctly apply investment analysis formulas.`,
    ],
    'CFP-TAX': [
      `This treatment is incorrect under current tax law.`,
      `This doesn't properly apply IRC provisions.`,
      `This tax strategy doesn't achieve the desired outcome.`,
      `This option misapplies the relevant tax rules.`,
    ],
    'CFP-RET': [
      `This doesn't comply with retirement account rules.`,
      `This approach fails to optimize retirement income.`,
      `This violates distribution rules under ERISA or IRC.`,
      `This retirement strategy doesn't meet the client's needs.`,
    ],
    'CFP-EST': [
      `This estate planning technique doesn't achieve the stated goal.`,
      `This fails to properly transfer assets as intended.`,
      `This approach doesn't minimize estate tax exposure effectively.`,
      `This trust structure is inappropriate for this situation.`,
    ],
    'CFP-PSY': [
      `This communication approach doesn't effectively address client needs.`,
      `This fails to recognize the client's behavioral pattern.`,
      `This response doesn't demonstrate proper active listening.`,
      `This approach may damage the client-planner relationship.`,
    ],
  };
  
  const templates = wrongReasonTemplates[question.section] || wrongReasonTemplates['CFP-GEN'];
  return templates[idx % templates.length];
}

/**
 * Generate educational content for a question
 */
function generateEducational(question) {
  const topic = question.topic || '';
  const subtopic = question.subtopic || '';
  const section = question.section || 'CFP-GEN';
  const explanation = question.explanation || '';
  
  // Extract key concepts from explanation
  const keyConceptMatch = explanation.match(/\*\*Key[^:]*:\*\*\s*([^*\n]+)/i) ||
                          explanation.match(/Key (?:insight|point|takeaway)[:\s]+([^.\n]+\.)/i);
  
  if (keyConceptMatch) {
    return keyConceptMatch[1].trim();
  }
  
  // Generate based on domain
  const educationalTemplates = {
    'CFP-PCR': `Understanding ${topic || 'professional conduct'} is essential for CFP® professionals. The CFP Board's Standards of Conduct require placing client interests first in all financial advice situations. This principle underlies the fiduciary duty that distinguishes CFP® certification from other credentials.`,
    'CFP-GEN': `${topic || 'This concept'} demonstrates core financial planning principles. Effective financial planning requires integrating quantitative analysis with client goals and circumstances. Understanding the financial planning process helps ensure comprehensive advice.`,
    'CFP-RISK': `${topic || 'Risk management'} is fundamental to protecting client financial security. Proper insurance planning involves identifying exposures, analyzing their frequency and severity, and selecting appropriate risk management techniques. The goal is protection without over-insurance.`,
    'CFP-INV': `${topic || 'Investment analysis'} applies modern portfolio theory to real client situations. Understanding risk-return relationships, diversification benefits, and appropriate asset allocation helps build portfolios suited to client objectives and constraints.`,
    'CFP-TAX': `${topic || 'Tax planning'} requires current knowledge of IRC provisions and their application. Effective tax strategies minimize lifetime taxes while accomplishing client goals. Tax-efficient planning integrates income, deduction, and timing strategies.`,
    'CFP-RET': `${topic || 'Retirement planning'} combines multiple disciplines: savings, investments, tax, and distribution strategies. Understanding qualified plan rules, Social Security optimization, and withdrawal sequencing helps maximize retirement security.`,
    'CFP-EST': `${topic || 'Estate planning'} coordinates asset transfer with tax minimization and family goals. Understanding probate, trust structures, and gift/estate tax rules enables effective wealth transfer strategies across generations.`,
    'CFP-PSY': `${topic || 'Client psychology'} affects every aspect of financial planning. Understanding communication styles, behavioral biases, and emotional responses helps planners guide clients toward better financial decisions and improve plan implementation.`,
  };
  
  return educationalTemplates[section] || educationalTemplates['CFP-GEN'];
}

/**
 * Generate exam tip for a question
 */
function generateExamTip(question) {
  const topic = question.topic || '';
  const difficulty = question.difficulty || 'medium';
  const section = question.section || 'CFP-GEN';
  const skillLevel = question.skillLevel || 'Application';
  
  // Generate tips based on skill level and topic
  const examTipsBySkill = {
    'Remembering': [
      `For recall questions, look for familiar terms and definitions you've memorized.`,
      `When a question asks "which of the following," systematically eliminate obviously wrong answers first.`,
      `Remember key terminology differences - the CFP exam tests precise definitions.`,
    ],
    'Remembering and Understanding': [
      `Understand the "why" behind rules, not just the "what" - this helps eliminate wrong answers.`,
      `Look for answer choices that use absolute terms like "always" or "never" - these are often incorrect.`,
      `When unsure, choose the most moderate or balanced answer option.`,
    ],
    'Application': [
      `Read the entire scenario carefully - key details are often embedded in the facts.`,
      `Identify what the question is really asking before looking at answer choices.`,
      `For calculation questions, estimate first to eliminate obviously wrong numerical answers.`,
    ],
    'Analysis': [
      `Break complex scenarios into components and analyze each separately.`,
      `Consider multiple perspectives - what would different stakeholders want?`,
      `Look for the "best" answer, not just a correct one - several options may seem partially right.`,
    ],
    'Evaluation': [
      `These questions test judgment - consider long-term consequences of each option.`,
      `Think like a fiduciary - what serves the client's best interests?`,
      `When comparing strategies, consider both benefits and risks of each approach.`,
    ],
  };
  
  const tips = examTipsBySkill[skillLevel] || examTipsBySkill['Application'];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  
  // Add domain-specific tip
  const domainTips = {
    'CFP-PCR': `Fiduciary questions: Always choose the option that puts client interests first.`,
    'CFP-GEN': `Process questions: Remember the 7-step financial planning process order.`,
    'CFP-RISK': `Insurance math: Know coinsurance, HO forms, and life insurance need calculations.`,
    'CFP-INV': `Investment formulas: Have CAPM, Sharpe ratio, and duration memorized.`,
    'CFP-TAX': `Tax questions: Identify the tax year and applicable limits first.`,
    'CFP-RET': `Retirement: Know age milestones (59½, 62, 65, 70, 72, 73, 75) cold.`,
    'CFP-EST': `Estate: Remember the unified credit amount and annual exclusion.`,
    'CFP-PSY': `Psychology: Active listening = reflect feelings before providing solutions.`,
  };
  
  return `${randomTip} ${domainTips[section] || ''}`.trim();
}

/**
 * Generate memory aid/mnemonic for a question
 */
function generateMemoryAid(question) {
  const topic = question.topic || '';
  const subtopic = question.subtopic || '';
  const section = question.section || 'CFP-GEN';
  
  // Domain-specific mnemonics
  const memoryAids = {
    'CFP-PCR': {
      'Fiduciary Duty': 'CLIFF: Client interests, Loyalty, Integrity, Follow-up, Full disclosure',
      'Code of Ethics': 'Four Principles: Honest-Best-Care-Standards (HBCS)',
      'default': 'CFP = Client First Professional - always prioritize client interests',
    },
    'CFP-GEN': {
      'Financial Planning Process': '7 Steps: EGANIM = Establish relationship, Goals, Analyze, Need recommendations, Implement, Monitor',
      'Time Value of Money': 'PV wants to be FV when it grows up (PV × (1+r)^n = FV)',
      'default': 'SMART Goals: Specific, Measurable, Achievable, Relevant, Time-bound',
    },
    'CFP-RISK': {
      'Coinsurance': 'Did/Should × Loss - Deductible = Payment',
      'Life Insurance': 'DIMe method: Debt + Income replacement + Mortgage + education',
      'default': 'STARR: Share, Transfer, Avoid, Reduce, Retain',
    },
    'CFP-INV': {
      'CAPM': 'CAPM = Rf + β(Rm - Rf) - "Risk-free plus beta times market premium"',
      'Duration': 'Duration ≈ -% price change ÷ % yield change',
      'default': 'Risk-Return: Higher risk seeks higher return (positive relationship)',
    },
    'CFP-TAX': {
      'Tax Formula': 'GI - Above = AGI - (SD or ID) - QBI = Taxable Income',
      'Capital Gains': 'STCG = ordinary rates, LTCG = 0/15/20% (think "Long = Low")',
      'default': 'AGI is "Adjusted" - adjustments go above the line',
    },
    'CFP-RET': {
      'RMD Ages': '72-73: "Seventy-Three to See" (start RMDs at 73 under SECURE 2.0)',
      '401k': '401(k) 2024: $23,000 + $7,500 catch-up (50+) = $30,500',
      'default': 'Retirement age milestones: 59½, 62, 65, 70, 73 - know the penalties!',
    },
    'CFP-EST': {
      'Estate Tax': '2024 exemption: $13.61M per person ("Lucky 13")',
      'Annual Exclusion': '2024: $18,000/donee/year - "18 to give free"',
      'default': 'QTIP = Qualified Terminable Interest Property (income to spouse, remainder to others)',
    },
    'CFP-PSY': {
      'DISC': 'DISC: Dominant (results), Influential (people), Steady (harmony), Conscientious (accuracy)',
      'Active Listening': 'SOLER: Sit squarely, Open posture, Lean in, Eye contact, Relax',
      'default': 'Reflect before directing - acknowledge emotions before giving advice',
    },
  };
  
  const sectionAids = memoryAids[section] || memoryAids['CFP-GEN'];
  
  // Try to find topic-specific mnemonic
  for (const [key, value] of Object.entries(sectionAids)) {
    if (topic.toLowerCase().includes(key.toLowerCase()) || 
        (subtopic && subtopic.toLowerCase().includes(key.toLowerCase()))) {
      return value;
    }
  }
  
  return sectionAids['default'] || 'Focus on understanding the underlying principle, not just memorizing facts.';
}

/**
 * Generate authoritative reference for a question
 */
function generateReference(question) {
  const section = question.section || 'CFP-GEN';
  const topic = question.topic || '';
  const blueprintArea = question.blueprintArea || '';
  
  const sources = REFERENCE_SOURCES[section] || REFERENCE_SOURCES['CFP-GEN'];
  
  // Try to match specific references based on topic
  const topicReferences = {
    // Tax references
    'IRA': 'IRC Section 408',
    '401': 'IRC Section 401(k)',
    'Roth': 'IRC Section 408A',
    'RMD': 'IRC Section 401(a)(9)',
    'Capital Gain': 'IRC Section 1(h)',
    'QBI': 'IRC Section 199A',
    'Standard Deduction': 'IRC Section 63',
    // Estate references
    'Estate Tax': 'IRC Section 2001',
    'Gift Tax': 'IRC Section 2501-2524',
    'Annual Exclusion': 'IRC Section 2503(b)',
    'QTIP': 'IRC Section 2056(b)(7)',
    'GST': 'IRC Section 2601',
    // Retirement references
    'ERISA': 'ERISA (Employee Retirement Income Security Act of 1974)',
    'SECURE': 'SECURE 2.0 Act of 2022',
    'Social Security': 'Social Security Act, Title II',
    // Insurance references
    'Life Insurance': 'IRC Section 101 (death benefits), IRC Section 7702 (contract definition)',
    'Annuity': 'IRC Section 72',
    // Professional references
    'Fiduciary': 'CFP Board Standards of Conduct (2019)',
    'Code of Ethics': 'CFP Board Code of Ethics and Standards of Conduct',
    // Investment references
    'Securities': 'Securities Act of 1933; Investment Advisers Act of 1940',
  };
  
  for (const [keyword, reference] of Object.entries(topicReferences)) {
    if (topic.toLowerCase().includes(keyword.toLowerCase())) {
      return reference;
    }
  }
  
  // Default to primary source for section
  return sources[0];
}

/**
 * Enhance a question with whyWrong, educational, examTip, memoryAid, reference
 */
function enhanceQuestion(question, sourceFile) {
  const enhanced = {
    ...question,
    version: 1,
    status: 'approved',
    whyWrong: generateWhyWrong(question),
    educational: generateEducational(question),
    examTip: generateExamTip(question),
    memoryAid: generateMemoryAid(question),
    reference: generateReference(question),
  };
  
  // Normalize ID to lowercase with proper format
  if (enhanced.id) {
    enhanced.id = enhanced.id.toLowerCase().replace(/[^a-z0-9-]/g, '');
  }
  
  // Ensure courseId
  enhanced.courseId = 'cfp';
  
  // Add source file tracking
  enhanced.sourceFile = sourceFile;
  
  return enhanced;
}

/**
 * Main migration function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('CFP Questions Migration: TypeScript → Enhanced JSON');
  console.log('='.repeat(60));
  console.log('');
  
  // Get all TS files
  const tsFiles = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  console.log(`Found ${tsFiles.length} TypeScript question files\n`);
  
  // Parse all questions
  const allQuestions = [];
  const fileStats = {};
  
  for (const file of tsFiles) {
    const filePath = path.join(SRC_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`Processing: ${file}`);
    const questions = parseTypeScriptQuestions(content, file);
    console.log(`  Found ${questions.length} questions`);
    
    fileStats[file] = questions.length;
    allQuestions.push(...questions);
  }
  
  console.log(`\nTotal questions parsed: ${allQuestions.length}\n`);
  
  // Group by section
  const bySection = {};
  const sectionSourceMapping = {};
  
  for (const q of allQuestions) {
    // Normalize section
    let section = q.section || 'CFP-GEN';
    if (SECTION_MAPPING[section]) {
      section = SECTION_MAPPING[section];
    }
    
    if (!bySection[section]) {
      bySection[section] = [];
      sectionSourceMapping[section] = new Set();
    }
    
    bySection[section].push(q);
    sectionSourceMapping[section].add(q.id.split('-')[1]); // Track source batches
  }
  
  // Print section summary
  console.log('Questions by Section:');
  console.log('-'.repeat(40));
  for (const [section, questions] of Object.entries(bySection)) {
    console.log(`  ${section}: ${questions.length} questions`);
  }
  console.log('');
  
  // Enhance and write JSON files
  console.log('Enhancing questions and writing JSON files...\n');
  
  const stats = {
    total: 0,
    bySection: {},
    missingWhyWrong: [],
    enhanced: 0,
  };
  
  for (const [section, questions] of Object.entries(bySection)) {
    console.log(`Processing ${section}...`);
    
    // Enhance all questions
    const enhanced = questions.map((q, idx) => {
      const sourceFile = Object.keys(fileStats).find(f => {
        const stem = f.replace('.ts', '').replace(/_batch\d+/, '');
        return q.id.includes(stem.replace('_', '-')) || 
               f.includes(section.toLowerCase().replace('cfp-', ''));
      });
      return enhanceQuestion(q, sourceFile || 'unknown');
    });
    
    // Validate whyWrong
    for (const q of enhanced) {
      if (!q.whyWrong || Object.keys(q.whyWrong).length !== 4) {
        stats.missingWhyWrong.push(q.id);
      } else {
        stats.enhanced++;
      }
    }
    
    // Create JSON structure
    const jsonData = {
      "$schema": "../schema/question.schema.json",
      "section": section,
      "exportedAt": new Date().toISOString(),
      "count": enhanced.length,
      "questions": enhanced,
    };
    
    // Write to file
    const outputDir = path.join(OUTPUT_DIR, section);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'questions.json');
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
    console.log(`  Wrote ${enhanced.length} questions to ${outputPath}`);
    
    stats.total += enhanced.length;
    stats.bySection[section] = enhanced.length;
  }
  
  // Print final summary
  console.log('\n' + '='.repeat(60));
  console.log('MIGRATION COMPLETE');
  console.log('='.repeat(60));
  console.log('');
  console.log('Section Mapping (old → new):');
  console.log('-'.repeat(40));
  console.log('  professional.ts, professional_batch*.ts → CFP-PCR');
  console.log('  gen_principles.ts, gen_principles_batch*.ts → CFP-GEN');
  console.log('  insurance.ts, insurance_batch*.ts → CFP-RISK');
  console.log('  risk_batch*.ts → CFP-RISK');
  console.log('  investments.ts, investments_batch*.ts → CFP-INV');
  console.log('  tax.ts, tax_batch*.ts → CFP-TAX');
  console.log('  retirement.ts, retirement_batch*.ts → CFP-RET');
  console.log('  retirement_secure2_batch.ts → CFP-RET');
  console.log('  estate.ts, estate_batch*.ts → CFP-EST');
  console.log('  psychology.ts, psychology_batch*.ts → CFP-PSY');
  console.log('  crossDomain.ts → CFP-GEN');
  console.log('');
  console.log('Questions Migrated Per Domain:');
  console.log('-'.repeat(40));
  for (const [section, count] of Object.entries(stats.bySection).sort()) {
    const domainName = DOMAIN_NAMES[section] || section;
    console.log(`  ${section} (${domainName}): ${count}`);
  }
  console.log('-'.repeat(40));
  console.log(`  TOTAL: ${stats.total} questions`);
  console.log('');
  console.log(`Questions with whyWrong: ${stats.enhanced}`);
  if (stats.missingWhyWrong.length > 0) {
    console.log(`Questions missing whyWrong: ${stats.missingWhyWrong.length}`);
    console.log(`  IDs: ${stats.missingWhyWrong.slice(0, 10).join(', ')}${stats.missingWhyWrong.length > 10 ? '...' : ''}`);
  }
  console.log('');
  console.log('Created Files:');
  console.log('-'.repeat(40));
  for (const section of Object.keys(stats.bySection).sort()) {
    console.log(`  content/cfp/${section}/questions.json`);
  }
  console.log('');
  
  return stats;
}

main().catch(console.error);
