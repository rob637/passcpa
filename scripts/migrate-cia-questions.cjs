#!/usr/bin/env node
/**
 * CIA Question Migration Script  
 * Migrates CIA questions from TypeScript to enhanced JSON format
 * 
 * Usage: node scripts/migrate-cia-questions.cjs
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src/data/cia/questions');
const OUTPUT_DIR = path.join(__dirname, '../content/cia');

// CIA Part information for enhanced fields
const CIA_INFO = {
  'CIA1': {
    name: 'Essentials of Internal Auditing',
    domains: {
      'I': 'Foundations of Internal Auditing',
      'II': 'Independence and Objectivity', 
      'III': 'Proficiency and Due Professional Care',
      'IV': 'Quality Assurance and Improvement Program',
      'V': 'Governance, Risk Management, and Control'
    }
  },
  'CIA2': {
    name: 'Practice of Internal Auditing',
    domains: {
      'I': 'Managing the Internal Audit Activity',
      'II': 'Planning the Engagement',
      'III': 'Performing the Engagement',
      'IV': 'Communicating Results and Monitoring Progress'
    }
  },
  'CIA3': {
    name: 'Business Knowledge for Internal Auditing',
    domains: {
      'I': 'Business Acumen',
      'II': 'Information Security',
      'III': 'Information Technology',
      'IV': 'Financial Management'
    }
  }
};

// IIA Standards references mapping
const IIA_REFERENCES = {
  'ethics': 'IIA Code of Ethics',
  'independence': 'IIA Standard 1100 - Independence and Objectivity',
  'proficiency': 'IIA Standard 1200 - Proficiency and Due Professional Care',
  'quality': 'IIA Standard 1300 - Quality Assurance and Improvement Program',
  'charter': 'IIA Standard 1000 - Purpose, Authority, and Responsibility',
  'planning': 'IIA Standard 2000 - Managing the Internal Audit Activity',
  'engagement': 'IIA Standard 2200 - Engagement Planning',
  'performing': 'IIA Standard 2300 - Performing the Engagement',
  'communicating': 'IIA Standard 2400 - Communicating Results',
  'monitoring': 'IIA Standard 2500 - Monitoring Progress',
  'governance': 'IIA Standard 2100 - Nature of Work',
  'risk': 'IIA Standard 2120 - Risk Management',
  'control': 'IIA Standard 2130 - Control',
  'fraud': 'IIA Guidance on Fraud Detection',
  'it': 'IIA GTAG (Global Technology Audit Guide)',
  'sampling': 'IIA Practice Guide: Audit Sampling',
  'coso': 'COSO Internal Control Framework',
  'default': 'IIA International Professional Practices Framework (IPPF)'
};

/**
 * Generate whyWrong explanations for each option
 */
function generateWhyWrong(question) {
  const whyWrong = {};
  const correctIdx = question.correctAnswer;
  
  for (let i = 0; i < 4; i++) {
    const optionLetter = String.fromCharCode(65 + i); // A, B, C, D
    const optionText = question.options[i] || '';
    
    if (i === correctIdx) {
      // Correct answer explanation
      whyWrong[String(i)] = `Why option ${optionLetter} is CORRECT - ${question.explanation.split('.')[0]}. This is the key concept being tested.`;
    } else {
      // Wrong answer explanation - generate contextual reason
      const wrongReason = generateWrongReason(question, i, optionText);
      whyWrong[String(i)] = `Why option ${optionLetter} is WRONG - ${wrongReason}`;
    }
  }
  
  return whyWrong;
}

/**
 * Generate contextual wrong answer explanation
 */
function generateWrongReason(question, optIdx, optionText) {
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  const correctAnswer = question.options[question.correctAnswer] || '';
  
  // Try to extract reason from existing explanation
  const explanation = question.explanation || '';
  
  // Common wrong answer patterns for CIA exam
  if (optionText.toLowerCase().includes('only')) {
    return `This is too restrictive. ${correctAnswer} provides a more complete answer as stated in IIA guidance.`;
  }
  if (optionText.toLowerCase().includes('always') || optionText.toLowerCase().includes('never')) {
    return `Absolute statements like this are rarely correct in internal auditing. Professional judgment and context matter.`;
  }
  if (optionText.toLowerCase().includes('not required') || optionText.toLowerCase().includes('unnecessary')) {
    return `This understates the importance of the concept. IIA Standards require a more comprehensive approach.`;
  }
  
  // Topic-specific wrong reasons
  if (topic.includes('independence') || topic.includes('objectivity')) {
    return `This does not adequately address the independence and objectivity requirements under IIA Standard 1100.`;
  }
  if (topic.includes('quality') || subtopic.includes('qaip')) {
    return `This does not meet the quality assurance requirements specified in IIA Standard 1300.`;
  }
  if (topic.includes('ethics') || subtopic.includes('ethics')) {
    return `This conflicts with the IIA Code of Ethics principles of integrity, objectivity, confidentiality, and competency.`;
  }
  if (topic.includes('risk') || subtopic.includes('risk')) {
    return `This does not align with proper risk assessment principles used in internal audit planning.`;
  }
  if (topic.includes('control')) {
    return `This does not correctly describe control characteristics or the auditor's role in evaluating controls.`;
  }
  if (topic.includes('governance')) {
    return `This misrepresents the internal auditor's role in governance assurance under IIA Standard 2110.`;
  }
  if (topic.includes('sampling')) {
    return `This does not correctly apply statistical or judgmental sampling principles for audit procedures.`;
  }
  if (topic.includes('fraud')) {
    return `This does not properly address the internal auditor's responsibilities regarding fraud awareness and detection.`;
  }
  
  // Generic fallback based on context
  if (explanation.includes(optionText.split(' ')[0])) {
    // The explanation mentions this option
    const parts = explanation.split('.');
    for (const part of parts) {
      if (part.toLowerCase().includes(optionText.split(' ')[0].toLowerCase())) {
        return part.trim() + '.';
      }
    }
  }
  
  return `This is a common misconception. While it may seem related, ${correctAnswer.substring(0, 50)}... is the correct approach according to IIA Standards.`;
}

/**
 * Generate educational content for deeper learning
 */
function generateEducational(question) {
  const topic = question.topic || 'Internal Auditing';
  const subtopic = question.subtopic || '';
  const section = question.section || 'CIA1';
  const domainInfo = CIA_INFO[section];
  
  let educational = '';
  
  // Add context about why this matters
  if (subtopic.toLowerCase().includes('independence')) {
    educational = `Independence is the foundation of internal audit credibility. Organizational independence means the CAE reports functionally to the board/audit committee, while individual objectivity requires auditors to maintain an unbiased mental attitude. Without independence, audit opinions lose their value to stakeholders.`;
  } else if (subtopic.toLowerCase().includes('ethics')) {
    educational = `The IIA Code of Ethics establishes the profession's values and expectations. The four principles (Integrity, Objectivity, Confidentiality, Competency) guide behavior, while the Rules of Conduct provide specific behavioral guidelines. Ethical violations can result in disciplinary action by the IIA.`;
  } else if (subtopic.toLowerCase().includes('quality') || subtopic.toLowerCase().includes('qaip')) {
    educational = `The Quality Assurance and Improvement Program (QAIP) is mandatory for all internal audit functions. It includes both internal assessments (ongoing and periodic) and external assessments (at least every 5 years). QAIP results help demonstrate conformance with the Standards.`;
  } else if (subtopic.toLowerCase().includes('risk')) {
    educational = `Risk-based auditing focuses resources on areas of highest risk to the organization. The risk assessment considers both inherent risk (before controls) and residual risk (after controls). This approach ensures the audit plan addresses the organization's most significant risks.`;
  } else if (subtopic.toLowerCase().includes('control')) {
    educational = `Internal controls are designed to provide reasonable assurance regarding achievement of objectives. The three categories are: operations (effectiveness/efficiency), reporting (reliability), and compliance (laws/regulations). Preventive, detective, and corrective controls work together.`;
  } else if (topic.toLowerCase().includes('governance')) {
    educational = `Internal audit provides assurance on governance processes including ethics programs, performance management, and accountability structures. The three lines model shows how management, risk/compliance functions, and internal audit work together to achieve organizational objectives.`;
  } else if (topic.toLowerCase().includes('financial')) {
    educational = `Understanding financial concepts helps internal auditors assess financial reporting risks and controls. Key areas include ratio analysis, budgeting, costing methods, and capital investment decisions. Financial acumen is increasingly important for effective audit work.`;
  } else if (topic.toLowerCase().includes('information') || topic.toLowerCase().includes('security') || topic.toLowerCase().includes('it')) {
    educational = `IT and information security are critical audit areas given organizational dependence on technology. Key concepts include access controls, change management, disaster recovery, cybersecurity, and data privacy. Auditors must understand IT risks even without being technical experts.`;
  } else {
    educational = `This concept is essential for ${domainInfo ? domainInfo.name : 'CIA exam'} success. Understanding the underlying principles, not just memorizing rules, helps you apply knowledge to new scenarios on the exam and in practice.`;
  }
  
  return educational;
}

/**
 * Generate exam tip for test-taking strategy
 */
function generateExamTip(question) {
  const difficulty = question.difficulty || 'medium';
  const skillLevel = question.skillLevel || 'Application';
  const options = question.options || [];
  
  // Check for absolute words that signal wrong answers
  const hasAbsolutes = options.some(opt => 
    /\b(always|never|only|all|none|every|must always)\b/i.test(opt)
  );
  
  if (hasAbsolutes) {
    return `Watch for absolute words like "always," "never," or "only" - these are often incorrect in internal auditing contexts where professional judgment applies.`;
  }
  
  if (difficulty === 'hard' || skillLevel === 'Analysis') {
    return `This is an application/analysis question. First eliminate obviously wrong answers, then focus on subtle differences between remaining options. Consider what IIA Standards specifically require.`;
  }
  
  if (skillLevel === 'Remembering and Understanding' || skillLevel === 'Remembering') {
    return `This tests fundamental knowledge. If you know the IIA Standards well, this should be straightforward. Look for the answer that most closely matches official IIA guidance.`;
  }
  
  // Topic-specific tips
  const topic = (question.topic || '').toLowerCase();
  if (topic.includes('independence')) {
    return `For independence questions, remember: functional reporting = board/audit committee, administrative reporting = senior management (CEO). The board approves the charter, plan, and CAE compensation.`;
  }
  if (topic.includes('sampling')) {
    return `Sampling questions often test statistical vs. judgmental approaches. Statistical sampling allows projection to the population; judgmental sampling does not. Know when each is appropriate.`;
  }
  if (topic.includes('fraud')) {
    return `Internal auditors are not primarily responsible for detecting fraud, but must be alert to fraud indicators. We provide assurance that controls to prevent/detect fraud are adequate.`;
  }
  
  return `Read all four options before answering. The best answer is the one most supported by IIA Standards and professional practices, even if other options are partially correct.`;
}

/**
 * Generate memory aid for the concept
 */
function generateMemoryAid(question) {
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  const correctOption = question.options[question.correctAnswer] || '';
  
  // Common CIA mnemonics
  if (topic.includes('ethics') || subtopic.includes('ethics')) {
    return `IIA Ethics: ICON = Integrity, Confidentiality, Objectivity, and Competency (Note: official order varies, but ICON helps remember all four).`;
  }
  if (subtopic.includes('independence') || topic.includes('independence')) {
    return `CAE Reporting: "BOARD = functional, BOSS (CEO) = administrative." Functional reporting gives independence.`;
  }
  if (topic.includes('quality') || subtopic.includes('qaip')) {
    return `QAIP timing: "Internal = Ongoing + Periodic, External = 5 years." Remember "IPE-5" (Internal Periodic External every 5).`;
  }
  if (topic.includes('sampling')) {
    return `Sampling approaches: "SAS = Statistical Allows Projection to Sample; JAS = Judgmental, Auditor's Selection only."`;
  }
  if (topic.includes('control')) {
    return `Control types: "PDC" = Preventive (stops it), Detective (finds it), Corrective (fixes it).`;
  }
  if (topic.includes('risk')) {
    return `Risk response: "AATR" = Accept, Avoid, Transfer, Reduce. Choose based on risk appetite and cost-benefit.`;
  }
  if (topic.includes('three lines') || subtopic.includes('three lines')) {
    return `Three Lines Model: "1-2-3 = Management owns risks, Risk/Compliance monitors, IA provides assurance."`;
  }
  if (topic.includes('governance')) {
    return `Governance elements: "SOAP" = Strategy, Objectives, Accountability, Performance monitoring.`;
  }
  if (topic.includes('coso')) {
    return `COSO Components: "CE-RIC-MA" = Control Environment, Risk Assessment, Information & Communication, Control Activities, Monitoring Activities.`;
  }
  
  // Generate from first letters of key terms
  const keyWords = correctOption.split(' ').filter(w => w.length > 3).slice(0, 4);
  if (keyWords.length >= 3) {
    const acronym = keyWords.map(w => w[0].toUpperCase()).join('');
    return `Remember "${acronym}" from the key terms: ${keyWords.join(', ')}.`;
  }
  
  return `Focus on understanding the underlying principle rather than memorizing specifics. Link this concept to your understanding of the IIA Standards framework.`;
}

/**
 * Determine the best reference for a question
 */
function determineReference(question) {
  // If question already has a reference, use it
  if (question.reference && question.reference !== 'IIA Standards') {
    return question.reference;
  }
  
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  const blueprintArea = question.blueprintArea || '';
  
  // Map topics to specific IIA Standards
  if (subtopic.includes('ethics') || topic.includes('ethics')) {
    return IIA_REFERENCES.ethics;
  }
  if (topic.includes('independence') || subtopic.includes('independence')) {
    return IIA_REFERENCES.independence;
  }
  if (topic.includes('proficiency') || subtopic.includes('proficiency') || subtopic.includes('due professional care')) {
    return IIA_REFERENCES.proficiency;
  }
  if (topic.includes('quality') || subtopic.includes('qaip') || subtopic.includes('quality assurance')) {
    return IIA_REFERENCES.quality;
  }
  if (topic.includes('charter') || subtopic.includes('charter')) {
    return IIA_REFERENCES.charter;
  }
  if (topic.includes('managing') && blueprintArea.includes('CIA2')) {
    return IIA_REFERENCES.planning;
  }
  if (topic.includes('planning') && topic.includes('engagement')) {
    return IIA_REFERENCES.engagement;
  }
  if (topic.includes('performing') || subtopic.includes('evidence') || subtopic.includes('documentation')) {
    return IIA_REFERENCES.performing;
  }
  if (topic.includes('communicating') || subtopic.includes('reporting')) {
    return IIA_REFERENCES.communicating;
  }
  if (topic.includes('monitoring') || subtopic.includes('follow-up')) {
    return IIA_REFERENCES.monitoring;
  }
  if (topic.includes('governance')) {
    return IIA_REFERENCES.governance;
  }
  if (topic.includes('risk')) {
    return IIA_REFERENCES.risk;
  }
  if (topic.includes('control')) {
    return IIA_REFERENCES.control;
  }
  if (topic.includes('fraud')) {
    return IIA_REFERENCES.fraud;
  }
  if (topic.includes('it') || topic.includes('information technology') || topic.includes('information security')) {
    return IIA_REFERENCES.it;
  }
  if (topic.includes('sampling')) {
    return IIA_REFERENCES.sampling;
  }
  if (topic.includes('coso') || subtopic.includes('coso')) {
    return IIA_REFERENCES.coso;
  }
  
  return IIA_REFERENCES.default;
}

/**
 * Parse a TypeScript file and extract questions array
 */
function parseTypeScriptFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const questions = [];
  
  // Match question objects - look for objects with id starting with 'cia'
  const questionRegex = /\{\s*id:\s*['"]cia[\s\S]*?(?=\},\s*\{|\}\s*\])/g;
  
  let matches = content.match(questionRegex);
  
  if (!matches) {
    console.log(`  No questions found in ${path.basename(filePath)}`);
    return [];
  }
  
  for (let match of matches) {
    try {
      // Clean up the match and convert to valid JSON
      let questionStr = match + '}';
      
      // Convert TypeScript to JSON-parseable format
      questionStr = questionStr
        // Handle property names (add quotes)
        .replace(/(\s+)(\w+):\s*/g, '$1"$2": ')
        // Fix double-quoted keys
        .replace(/""(\w+)""/g, '"$1"')
        // Handle single quotes to double quotes for strings
        .replace(/:\s*'([^']*)'/g, ': "$1"')
        // Handle template literals (basic)
        .replace(/:\s*`([^`]*)`/g, ': "$1"')
        // Handle arrays with single quotes
        .replace(/\[\s*'([^']*)'/g, '["$1"')
        .replace(/'\s*,\s*'/g, '", "')
        .replace(/'\s*\]/g, '"]')
        // Remove trailing commas
        .replace(/,\s*}/g, '}')
        .replace(/,\s*\]/g, ']')
        // Handle escaped quotes in strings
        .replace(/\\'/g, "'")
        // Fix common issues
        .replace(/""/g, '"')
        // Handle newlines in strings
        .replace(/\n/g, ' ')
        .replace(/\r/g, '');
      
      // Try to parse
      const question = JSON.parse(questionStr);
      questions.push(question);
    } catch (err) {
      // Try alternative parsing for complex cases
      try {
        const extracted = extractQuestionManually(match + '}');
        if (extracted) {
          questions.push(extracted);
        }
      } catch (err2) {
        // console.error(`  Error parsing question in ${path.basename(filePath)}:`, err2.message);
      }
    }
  }
  
  return questions;
}

/**
 * Manual extraction for complex question structures
 */
function extractQuestionManually(str) {
  const extractField = (field, isArray = false) => {
    const regex = isArray 
      ? new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`)
      : new RegExp(`${field}:\\s*['"\`]([^'"\`]*?)['"\`]`);
    const match = str.match(regex);
    if (!match) return isArray ? [] : '';
    
    if (isArray) {
      // Parse array items
      const items = match[1].match(/['"`]([^'"`]*?)['"`]/g);
      return items ? items.map(i => i.replace(/['"`]/g, '')) : [];
    }
    return match[1];
  };
  
  const extractNumber = (field) => {
    const regex = new RegExp(`${field}:\\s*(\\d+)`);
    const match = str.match(regex);
    return match ? parseInt(match[1]) : 0;
  };
  
  const id = extractField('id');
  if (!id || !id.startsWith('cia')) return null;
  
  return {
    id,
    courseId: extractField('courseId') || 'cia',
    section: extractField('section') || 'CIA1',
    blueprintArea: extractField('blueprintArea') || '',
    difficulty: extractField('difficulty') || 'medium',
    skillLevel: extractField('skillLevel') || 'Application',
    question: extractField('question'),
    options: extractField('options', true),
    correctAnswer: extractNumber('correctAnswer'),
    explanation: extractField('explanation'),
    topic: extractField('topic'),
    subtopic: extractField('subtopic'),
    reference: extractField('reference')
  };
}

/**
 * Enhance a question with additional fields
 */
function enhanceQuestion(question, sourceFile) {
  // Ensure required fields exist
  const enhanced = {
    id: (question.id || '').toLowerCase(),
    version: 1,
    status: 'approved',
    courseId: 'cia',
    section: normalizeSection(question.section),
    blueprintArea: question.blueprintArea || `${normalizeSection(question.section)}-I`,
    topic: question.topic || 'Internal Auditing',
    subtopic: question.subtopic || '',
    difficulty: question.difficulty || 'medium',
    skillLevel: question.skillLevel || 'Application',
    question: question.question || '',
    options: question.options || ['', '', '', ''],
    correctAnswer: question.correctAnswer || 0,
    explanation: question.explanation || '',
    sourceFile: path.basename(sourceFile),
    // Enhanced fields
    whyWrong: generateWhyWrong(question),
    educational: generateEducational(question),
    examTip: generateExamTip(question),
    memoryAid: generateMemoryAid(question),
    reference: determineReference(question)
  };
  
  return enhanced;
}

/**
 * Normalize section names
 */
function normalizeSection(section) {
  if (!section) return 'CIA1';
  const s = section.toUpperCase();
  if (s === 'PART1' || s === 'PART 1') return 'CIA1';
  if (s === 'PART2' || s === 'PART 2') return 'CIA2';
  if (s === 'PART3' || s === 'PART 3') return 'CIA3';
  if (s.startsWith('CIA')) return s;
  return 'CIA1';
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('='.repeat(60));
  console.log('CIA Question Migration: TypeScript → Enhanced JSON');
  console.log('='.repeat(60));
  console.log();
  
  const stats = {
    totalParsed: 0,
    totalEnhanced: 0,
    bySection: { CIA1: 0, CIA2: 0, CIA3: 0 },
    issues: [],
    filesProcessed: 0
  };
  
  // Collection for all questions by section
  const questionsBySection = {
    CIA1: [],
    CIA2: [],
    CIA3: []
  };
  
  // Get all TypeScript question files
  const files = fs.readdirSync(SRC_DIR)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .sort();
  
  console.log(`Found ${files.length} TypeScript files to process\n`);
  
  // Process each file
  for (const file of files) {
    const filePath = path.join(SRC_DIR, file);
    console.log(`Processing: ${file}`);
    
    const questions = parseTypeScriptFile(filePath);
    stats.filesProcessed++;
    
    console.log(`  Found ${questions.length} questions`);
    
    for (const q of questions) {
      stats.totalParsed++;
      
      try {
        const enhanced = enhanceQuestion(q, file);
        const section = enhanced.section;
        
        if (!questionsBySection[section]) {
          console.warn(`  Unknown section: ${section} for question ${q.id}`);
          questionsBySection[section] = [];
        }
        
        questionsBySection[section].push(enhanced);
        stats.totalEnhanced++;
        stats.bySection[section]++;
      } catch (err) {
        stats.issues.push({
          id: q.id || 'unknown',
          file,
          error: err.message
        });
      }
    }
    
    console.log();
  }
  
  // Deduplicate by ID within each section
  for (const section of Object.keys(questionsBySection)) {
    const seen = new Set();
    const deduped = [];
    
    for (const q of questionsBySection[section]) {
      if (!seen.has(q.id)) {
        seen.add(q.id);
        deduped.push(q);
      } else {
        console.log(`  Duplicate ID removed: ${q.id}`);
      }
    }
    
    questionsBySection[section] = deduped;
    stats.bySection[section] = deduped.length;
  }
  
  // Write JSON files
  console.log('Writing JSON files...\n');
  const timestamp = new Date().toISOString();
  
  for (const [section, questions] of Object.entries(questionsBySection)) {
    if (questions.length === 0) continue;
    
    // Sort by ID
    questions.sort((a, b) => a.id.localeCompare(b.id));
    
    const outputPath = path.join(OUTPUT_DIR, section.toLowerCase(), 'questions.json');
    const output = {
      "$schema": "../../schema/question.schema.json",
      section,
      exportedAt: timestamp,
      questions
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`  Written: ${outputPath} (${questions.length} questions)`);
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files processed:      ${stats.filesProcessed}`);
  console.log(`Questions parsed:     ${stats.totalParsed}`);
  console.log(`Questions enhanced:   ${stats.totalEnhanced}`);
  console.log();
  console.log('By Section:');
  console.log(`  CIA1: ${stats.bySection.CIA1} questions`);
  console.log(`  CIA2: ${stats.bySection.CIA2} questions`);
  console.log(`  CIA3: ${stats.bySection.CIA3} questions`);
  console.log(`  Total: ${stats.bySection.CIA1 + stats.bySection.CIA2 + stats.bySection.CIA3} questions`);
  
  if (stats.issues.length > 0) {
    console.log(`\nIssues encountered: ${stats.issues.length}`);
    for (const issue of stats.issues.slice(0, 10)) {
      console.log(`  - ${issue.id} (${issue.file}): ${issue.error}`);
    }
    if (stats.issues.length > 10) {
      console.log(`  ... and ${stats.issues.length - 10} more`);
    }
  }
  
  // Validate whyWrong exists on all questions
  let missingWhyWrong = 0;
  for (const section of Object.keys(questionsBySection)) {
    for (const q of questionsBySection[section]) {
      if (!q.whyWrong || Object.keys(q.whyWrong).length !== 4) {
        missingWhyWrong++;
      }
    }
  }
  
  console.log(`\nQuestions missing whyWrong: ${missingWhyWrong}`);
  console.log('\n' + '='.repeat(60));
  console.log('Output files:');
  console.log('  content/cia/cia1/questions.json');
  console.log('  content/cia/cia2/questions.json');
  console.log('  content/cia/cia3/questions.json');
  console.log('='.repeat(60));
  
  return stats;
}

// Run migration
migrate().catch(console.error);
