/**
 * CISA Questions Migration Script
 * Converts TypeScript question files to enhanced JSON format
 * 
 * Usage: node scripts/migrate-cisa-to-json.cjs
 */

const fs = require('fs');
const path = require('path');

// CISA Domain info for generating educational content
const CISA_DOMAINS = {
  CISA1: {
    name: 'Information Systems Auditing Process',
    weight: '21%',
    topics: ['IS Audit Standards', 'Audit Planning', 'Audit Execution', 'Audit Evidence', 'Audit Reporting', 'Follow-up Activities'],
    references: ['ISACA IS Audit Standards', 'ISACA CISA Review Manual', 'COBIT 2019']
  },
  CISA2: {
    name: 'Governance and Management of IT',
    weight: '16%',
    topics: ['IT Governance', 'IT Strategy', 'IT Policies', 'Risk Management', 'IT Resource Management', 'Performance Monitoring'],
    references: ['COBIT 2019', 'ISO 38500', 'ISACA CISA Review Manual']
  },
  CISA3: {
    name: 'Information Systems Acquisition, Development, and Implementation',
    weight: '18%',
    topics: ['Business Case', 'Project Management', 'SDLC', 'System Development', 'Testing', 'Implementation'],
    references: ['ISACA CISA Review Manual', 'PMBOK', 'COBIT 2019']
  },
  CISA4: {
    name: 'Information Systems Operations and Business Resilience',
    weight: '20%',
    topics: ['IS Operations', 'Hardware', 'Network Infrastructure', 'Database Management', 'BCP/DRP', 'Incident Management'],
    references: ['ISACA CISA Review Manual', 'ISO 22301', 'ITIL 4', 'COBIT 2019']
  },
  CISA5: {
    name: 'Protection of Information Assets',
    weight: '25%',
    topics: ['Information Security', 'Access Controls', 'Cryptography', 'Physical Security', 'Environmental Controls', 'Network Security'],
    references: ['ISACA CISA Review Manual', 'ISO 27001/27002', 'NIST Cybersecurity Framework', 'COBIT 2019']
  }
};

// Common exam tips for CISA by topic area
const EXAM_TIPS = {
  audit: [
    'On the CISA exam, "FIRST" questions usually want you to assess or analyze before acting.',
    'When asked about audit evidence, external evidence is almost always more reliable than internal.',
    'Risk-based audit planning means highest-risk areas get the most attention.',
    'Audit independence is paramount - watch for conflicts of interest.',
    'Documentation is key - if it\'s not documented, it didn\'t happen.'
  ],
  governance: [
    'Board of Directors has ultimate responsibility for IT governance, not IT management.',
    'Segregation of duties prevents a single person from controlling a complete process.',
    'COBIT 2019 focuses on governance vs. management objectives.',
    'IT steering committees provide direction but don\'t replace management responsibility.',
    'Policies set the "what" while procedures set the "how".'
  ],
  sdlc: [
    'Security requirements should be defined early in the SDLC - during requirements phase.',
    'User acceptance testing (UAT) is performed by end users, not developers.',
    'Change control processes prevent unauthorized modifications to production.',
    'Feasibility studies assess economic, technical, and operational viability.',
    'Post-implementation reviews validate that objectives were met.'
  ],
  operations: [
    'Recovery Point Objective (RPO) = how much data loss is acceptable.',
    'Recovery Time Objective (RTO) = how long can you be down.',
    'Hot sites provide fastest recovery; cold sites are cheapest.',
    'Incident response follows: Identify, Contain, Eradicate, Recover.',
    'Service Level Agreements define expected performance metrics.'
  ],
  security: [
    'Defense in depth = multiple layers of security controls.',
    'Encryption at rest protects stored data; encryption in transit protects data moving on networks.',
    'Least privilege = only the access needed to do the job.',
    'Two-factor authentication uses "something you know" plus "something you have" or "are".',
    'Digital signatures provide authenticity and non-repudiation.'
  ]
};

// Memory aids by concept
const MEMORY_AIDS = {
  'audit evidence': 'CARE: Competent, Appropriate, Relevant, Enough',
  'risk assessment': 'RAT: Risk Assessment considers Threats, Assets, and Vulnerabilities',
  'sdlc phases': 'RADIUM: Requirements, Analysis, Design, Implementation, User testing, Maintenance',
  'disaster recovery': 'RPO and RTO: Point = data loss, Time = downtime',
  'access control': 'IAAA: Identification, Authentication, Authorization, Accountability',
  'segregation of duties': 'CAPT: Custody, Authorization, Processing, Tracking should be separate',
  'change management': 'RTA: Request, Test, Approve before deployment',
  'control types': 'PPD: Preventive stops, Detective finds, Corrective fixes',
  'encryption': 'Symmetric = Same key (fast), Asymmetric = different keys (slower, PKI)',
  'digital signature': 'Hash + Private key = signature, Public key verifies',
  'governance': 'Board GOVERNS, Management MANAGES - don\'t confuse the two',
  'cobit': 'COBIT 2019: 6 principles, 40 governance/management objectives',
  'bcp': 'BIA first, then BCP, then test regularly',
  'incident response': 'PICERL: Prepare, Identify, Contain, Eradicate, Recover, Learn'
};

/**
 * Parse a TypeScript file and extract question objects
 */
function parseTypeScriptFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const questions = [];
  
  // Find all question objects using regex pattern matching
  // Looking for objects that have id: 'cisa...'
  const questionPattern = /\{[\s\n]*id:\s*'(cisa[^']+)'[\s\S]*?(?=\},[\s\n]*\{[\s\n]*id:|$)/g;
  
  // Alternative approach: match complete objects between { and }
  // Since TypeScript objects can be complex, we'll use a state machine approach
  
  let depth = 0;
  let currentObject = '';
  let inString = false;
  let stringChar = '';
  let i = 0;
  
  // Find where array content starts (after opening [)
  const arrayStart = content.indexOf('[');
  if (arrayStart === -1) return questions;
  
  for (i = arrayStart; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';
    
    // Handle string tracking
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }
    
    if (!inString) {
      if (char === '{') {
        if (depth === 0) {
          currentObject = '';
        }
        depth++;
      } else if (char === '}') {
        depth--;
        if (depth === 0) {
          currentObject += char;
          // Try to parse this object
          const question = parseQuestionObject(currentObject);
          if (question && question.id && question.id.startsWith('cisa')) {
            question.sourceFile = path.basename(filePath);
            questions.push(question);
          }
          currentObject = '';
          continue;
        }
      }
    }
    
    if (depth > 0) {
      currentObject += char;
    }
  }
  
  return questions;
}

/**
 * Parse a single question object string into an object
 */
function parseQuestionObject(objStr) {
  try {
    // Clean up the object string to make it valid JSON-ish
    let cleaned = objStr.trim();
    
    // Convert to something we can eval safely
    // Replace single quotes with double quotes for JSON compatibility
    // But be careful with apostrophes in content
    
    // Extract key-value pairs manually for safety
    const question = {};
    
    // Extract id
    const idMatch = cleaned.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) question.id = idMatch[1];
    
    // Extract courseId
    const courseIdMatch = cleaned.match(/courseId:\s*['"]([^'"]+)['"]/);
    if (courseIdMatch) question.courseId = courseIdMatch[1];
    
    // Extract section
    const sectionMatch = cleaned.match(/section:\s*['"]([^'"]+)['"]/);
    if (sectionMatch) question.section = sectionMatch[1];
    
    // Extract blueprintArea
    const blueprintMatch = cleaned.match(/blueprintArea:\s*['"]([^'"]+)['"]/);
    if (blueprintMatch) question.blueprintArea = blueprintMatch[1];
    
    // Extract difficulty
    const difficultyMatch = cleaned.match(/difficulty:\s*['"]([^'"]+)['"]/);
    if (difficultyMatch) question.difficulty = difficultyMatch[1];
    
    // Extract skillLevel
    const skillMatch = cleaned.match(/skillLevel:\s*['"]([^'"]+)['"]/);
    if (skillMatch) question.skillLevel = skillMatch[1];
    
    // Extract topic
    const topicMatch = cleaned.match(/topic:\s*['"]([^'"]+)['"]/);
    if (topicMatch) question.topic = topicMatch[1];
    
    // Extract subtopic
    const subtopicMatch = cleaned.match(/subtopic:\s*['"]([^'"]+)['"]/);
    if (subtopicMatch) question.subtopic = subtopicMatch[1];
    
    // Extract reference
    const refMatch = cleaned.match(/reference:\s*['"]([^'"]+)['"]/);
    if (refMatch) question.reference = refMatch[1];
    
    // Extract correctAnswer
    const correctMatch = cleaned.match(/correctAnswer:\s*(\d+)/);
    if (correctMatch) question.correctAnswer = parseInt(correctMatch[1], 10);
    
    // Extract question text - handle multi-line
    const questionMatch = cleaned.match(/question:\s*['"`]([\s\S]*?)['"`]\s*,\s*(?:options|exhibit)/);
    if (questionMatch) {
      question.question = questionMatch[1]
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/^['"`]/, '')    // Remove leading quote
        .replace(/['"`]$/, '')    // Remove trailing quote
        .trim();
    }
    
    // Extract explanation - handle multi-line
    const explanationMatch = cleaned.match(/explanation:\s*['"`]([\s\S]*?)['"`]\s*(?:,\s*(?:reference|topic|subtopic|})|$)/);
    if (explanationMatch) {
      question.explanation = explanationMatch[1]
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/^['"`]/, '')    // Remove leading quote
        .replace(/['"`]$/, '')    // Remove trailing quote
        .trim();
    }
    
    // Extract options array
    const optionsMatch = cleaned.match(/options:\s*\[([\s\S]*?)\]\s*,/);
    if (optionsMatch) {
      const optionsStr = optionsMatch[1];
      // Parse options - split by commas but respect nested strings
      const options = [];
      let currentOption = '';
      let inOptString = false;
      let optStringChar = '';
      
      for (let i = 0; i < optionsStr.length; i++) {
        const char = optionsStr[i];
        const prevChar = i > 0 ? optionsStr[i - 1] : '';
        
        if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
          if (!inOptString) {
            inOptString = true;
            optStringChar = char;
          } else if (char === optStringChar) {
            inOptString = false;
            // End of option - clean up the string
            let opt = currentOption.trim()
              .replace(/\\'/g, "'")
              .replace(/\\"/g, '"')
              .replace(/^['"`]/, '')  // Remove leading quote
              .replace(/['"`]$/, ''); // Remove trailing quote
            if (opt) options.push(opt);
            currentOption = '';
            continue;
          }
        }
        
        if (inOptString) {
          currentOption += char;
        }
      }
      
      question.options = options;
    }
    
    return question;
  } catch (e) {
    console.error('Error parsing question object:', e.message);
    return null;
  }
}

/**
 * Generate whyWrong explanations for each option
 */
function generateWhyWrong(question) {
  const whyWrong = {};
  const correctIdx = question.correctAnswer;
  const options = question.options || [];
  
  for (let i = 0; i < 4; i++) {
    const option = options[i] || `Option ${String.fromCharCode(65 + i)}`;
    const optionLetter = String.fromCharCode(65 + i);
    
    if (i === correctIdx) {
      // This is the correct answer
      whyWrong[String(i)] = `Why option ${optionLetter} is CORRECT - ${question.explanation || 'This is the correct answer based on ISACA standards and best practices.'}`;
    } else {
      // Generate why this is wrong based on context
      const wrongExplanation = generateWrongExplanation(question, option, i, correctIdx);
      whyWrong[String(i)] = `Why option ${optionLetter} is WRONG - ${wrongExplanation}`;
    }
  }
  
  return whyWrong;
}

/**
 * Generate explanation for why an option is wrong
 */
function generateWrongExplanation(question, option, optionIdx, correctIdx) {
  const section = question.section || 'CISA1';
  const topic = (question.topic || '').toLowerCase();
  const correctOption = question.options?.[correctIdx] || '';
  
  // Common wrong answer patterns in CISA
  const optionLower = option.toLowerCase();
  
  // Check for common distractors
  if (optionLower.includes('all') || optionLower.includes('every') || optionLower.includes('eliminate all')) {
    return 'Absolute statements are rarely correct in auditing. Auditors work with reasonable assurance, not absolute certainty.';
  }
  
  if (optionLower.includes('immediately') && topic.includes('audit')) {
    return 'Auditors should verify and assess before escalating or reporting immediately. Due diligence requires analysis first.';
  }
  
  if (optionLower.includes('technical') && (topic.includes('governance') || topic.includes('strategy'))) {
    return 'Governance and strategic decisions focus on business alignment and risk, not technical implementation details.';
  }
  
  if (optionLower.includes('only') || optionLower.includes('solely')) {
    return 'This option is too restrictive. Effective IT management and auditing requires considering multiple factors.';
  }
  
  // Section-specific wrong answer explanations
  if (section === 'CISA1') {
    if (optionLower.includes('report') && correctOption.toLowerCase().includes('valid')) {
      return 'Reporting should occur after the auditor verifies and validates findings with relevant stakeholders.';
    }
    if (optionLower.includes('assum')) {
      return 'IS auditors should not make assumptions. Professional skepticism requires evidence-based conclusions.';
    }
  }
  
  if (section === 'CISA2') {
    if (optionLower.includes('cio') && correctOption.toLowerCase().includes('board')) {
      return 'The CIO executes IT strategy but the Board of Directors has ultimate governance responsibility per COBIT 2019.';
    }
    if (optionLower.includes('operational') && topic.includes('governance')) {
      return 'This is an operational concern, not a governance matter. Governance focuses on strategic direction and oversight.';
    }
  }
  
  if (section === 'CISA3') {
    if (optionLower.includes('design') && topic.includes('security')) {
      return 'Security requirements should be defined during requirements analysis, not design, to ensure they are built-in from the start.';
    }
    if (optionLower.includes('developer') && topic.includes('test')) {
      return 'Developers should not test their own code independently. Separation of duties requires independent testing.';
    }
  }
  
  if (section === 'CISA4') {
    if (optionLower.includes('checklist') && topic.includes('disaster')) {
      return 'A checklist review is the least effective DR test method. It provides minimal assurance of plan effectiveness.';
    }
    if (optionLower.includes('cold site') && topic.includes('immediate')) {
      return 'Cold sites require significant setup time and cannot provide immediate recovery capabilities.';
    }
  }
  
  if (section === 'CISA5') {
    if (optionLower.includes('public key') && topic.includes('signature')) {
      return 'Digital signatures are created with the private key (for authenticity) and verified with the public key.';
    }
    if (optionLower.includes('password only') && topic.includes('multi-factor')) {
      return 'Passwords alone represent single-factor authentication. Multi-factor requires additional factors.';
    }
  }
  
  // Default fallback
  return `This option does not align with ISACA best practices and standards. The correct approach focuses on ${correctOption.substring(0, 50)}...`;
}

/**
 * Generate educational content for a question
 */
function generateEducational(question) {
  const section = question.section || 'CISA1';
  const domain = CISA_DOMAINS[section] || CISA_DOMAINS.CISA1;
  const topic = question.topic || 'General';
  
  const baseEducation = question.explanation || '';
  
  // Add domain context
  let educational = `This question tests ${domain.name} (Domain ${section.replace('CISA', '')}, ${domain.weight} of exam). `;
  
  // Add topic-specific education
  if (topic.toLowerCase().includes('audit')) {
    educational += 'IS auditors must maintain objectivity and professional skepticism throughout the audit process. ';
  } else if (topic.toLowerCase().includes('governance')) {
    educational += 'IT governance ensures that IT investments support business objectives and manage associated risks. ';
  } else if (topic.toLowerCase().includes('sdlc') || topic.toLowerCase().includes('development')) {
    educational += 'The SDLC provides a structured approach to system development with appropriate controls at each phase. ';
  } else if (topic.toLowerCase().includes('disaster') || topic.toLowerCase().includes('recovery')) {
    educational += 'Business continuity planning ensures critical operations can continue during and after a disruption. ';
  } else if (topic.toLowerCase().includes('security') || topic.toLowerCase().includes('access')) {
    educational += 'Information security requires defense in depth with multiple layers of complementary controls. ';
  }
  
  educational += 'Understanding this concept is essential for the CISA exam and real-world IS auditing.';
  
  return educational;
}

/**
 * Generate exam tip for a question
 */
function generateExamTip(question) {
  const section = question.section || 'CISA1';
  const topic = (question.topic || '').toLowerCase();
  const questionText = (question.question || '').toLowerCase();
  
  // Check for specific question patterns
  if (questionText.includes('first')) {
    return 'When a CISA question asks what to do FIRST, look for the option that involves assessment, validation, or analysis before action.';
  }
  
  if (questionText.includes('most important') || questionText.includes('greatest')) {
    return 'MOST/GREATEST questions want the highest-priority answer. Rank options by impact and alignment with core principles.';
  }
  
  if (questionText.includes('best')) {
    return 'BEST answer questions have multiple correct-sounding options. Choose the one that most directly addresses the specific scenario.';
  }
  
  if (questionText.includes('except') || questionText.includes('not')) {
    return 'EXCEPT/NOT questions are asking for the outlier. Three options will be correct; find the one that doesn\'t belong.';
  }
  
  // Fall back to topic-based tips
  let tipCategory = 'audit';
  if (section === 'CISA2' || topic.includes('governance')) tipCategory = 'governance';
  else if (section === 'CISA3' || topic.includes('sdlc') || topic.includes('development')) tipCategory = 'sdlc';
  else if (section === 'CISA4' || topic.includes('operation') || topic.includes('disaster')) tipCategory = 'operations';
  else if (section === 'CISA5' || topic.includes('security')) tipCategory = 'security';
  
  const tips = EXAM_TIPS[tipCategory] || EXAM_TIPS.audit;
  return tips[Math.floor(Math.random() * tips.length)];
}

/**
 * Generate memory aid for a question
 */
function generateMemoryAid(question) {
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  const questionText = (question.question || '').toLowerCase();
  
  // Check for matching memory aids
  for (const [concept, aid] of Object.entries(MEMORY_AIDS)) {
    if (topic.includes(concept) || subtopic.includes(concept) || questionText.includes(concept)) {
      return aid;
    }
  }
  
  // Generate a simple memory aid based on the correct answer
  const correctOption = question.options?.[question.correctAnswer] || '';
  if (correctOption) {
    // Extract key word
    const words = correctOption.split(' ').filter(w => w.length > 4);
    if (words.length > 0) {
      const keyWord = words[0].toUpperCase();
      return `Remember: "${keyWord}" - a key concept for ${question.topic || 'this domain'}.`;
    }
  }
  
  return 'Focus on understanding the underlying principle rather than memorizing specific answers.';
}

/**
 * Generate reference for a question
 */
function generateReference(question) {
  if (question.reference) {
    return question.reference;
  }
  
  const section = question.section || 'CISA1';
  const domain = CISA_DOMAINS[section] || CISA_DOMAINS.CISA1;
  const chapter = section.replace('CISA', '');
  
  // Return primary reference plus additional
  const refs = domain.references || ['ISACA CISA Review Manual'];
  return `ISACA CISA Review Manual, Chapter ${chapter}; ${refs[1] || refs[0]}`;
}

/**
 * Enhance a question with whyWrong, educational, examTip, memoryAid, reference
 */
function enhanceQuestion(question, index) {
  const enhanced = {
    id: question.id,
    version: 1,
    status: 'approved',
    courseId: question.courseId || 'cisa',
    section: question.section,
    blueprintArea: question.blueprintArea || question.section,
    topic: question.topic || 'General',
    subtopic: question.subtopic,
    difficulty: question.difficulty || 'medium',
    skillLevel: question.skillLevel || 'Application',
    question: question.question,
    options: question.options || [],
    correctAnswer: question.correctAnswer,
    explanation: question.explanation || '',
    whyWrong: generateWhyWrong(question),
    educational: generateEducational(question),
    examTip: generateExamTip(question),
    memoryAid: generateMemoryAid(question),
    reference: generateReference(question),
    sourceFile: question.sourceFile
  };
  
  // Clean up undefined values
  if (!enhanced.subtopic) delete enhanced.subtopic;
  
  return enhanced;
}

/**
 * Main migration function
 */
async function migrateQuestions() {
  console.log('Starting CISA questions migration...\n');
  
  const questionsDir = path.join(__dirname, '..', 'src', 'data', 'cisa', 'questions');
  const outputDir = path.join(__dirname, '..', 'content', 'cisa');
  
  // Get all TS files
  const tsFiles = fs.readdirSync(questionsDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .sort();
  
  console.log(`Found ${tsFiles.length} TypeScript files to process\n`);
  
  // Parse all questions
  const allQuestions = [];
  const fileStats = {};
  
  for (const file of tsFiles) {
    const filePath = path.join(questionsDir, file);
    const questions = parseTypeScriptFile(filePath);
    fileStats[file] = questions.length;
    allQuestions.push(...questions);
    
    if (questions.length > 0) {
      console.log(`  ${file}: ${questions.length} questions`);
    }
  }
  
  console.log(`\nTotal questions parsed: ${allQuestions.length}\n`);
  
  // Group by section
  const bySection = {
    CISA1: [],
    CISA2: [],
    CISA3: [],
    CISA4: [],
    CISA5: []
  };
  
  const unclassified = [];
  
  for (const q of allQuestions) {
    const section = q.section?.toUpperCase();
    if (bySection[section]) {
      bySection[section].push(q);
    } else {
      // Try to determine section from ID
      const idSection = q.id?.match(/cisa(\d)/)?.[1];
      if (idSection && bySection[`CISA${idSection}`]) {
        q.section = `CISA${idSection}`;
        bySection[`CISA${idSection}`].push(q);
      } else {
        unclassified.push(q);
      }
    }
  }
  
  // Report section counts
  console.log('Questions per domain:');
  let totalOutputted = 0;
  for (const [section, questions] of Object.entries(bySection)) {
    console.log(`  ${section}: ${questions.length} questions`);
    totalOutputted += questions.length;
  }
  
  if (unclassified.length > 0) {
    console.log(`\n  WARNING: ${unclassified.length} questions could not be classified:`);
    unclassified.slice(0, 5).forEach(q => {
      console.log(`    - ${q.id}: section=${q.section}`);
    });
  }
  
  // Enhance and write each section
  console.log('\nGenerating enhanced JSON files...\n');
  
  const results = {
    success: {},
    errors: []
  };
  
  for (const [section, questions] of Object.entries(bySection)) {
    if (questions.length === 0) continue;
    
    const sectionLower = section.toLowerCase();
    const outputPath = path.join(outputDir, sectionLower, 'questions.json');
    
    // Enhance each question
    const enhanced = questions.map((q, idx) => {
      try {
        return enhanceQuestion(q, idx);
      } catch (e) {
        results.errors.push({ id: q.id, error: e.message });
        return null;
      }
    }).filter(Boolean);
    
    // Sort by ID
    enhanced.sort((a, b) => a.id.localeCompare(b.id));
    
    // Check for missing whyWrong
    const missingWhyWrong = enhanced.filter(q => !q.whyWrong || Object.keys(q.whyWrong).length !== 4);
    if (missingWhyWrong.length > 0) {
      console.log(`  WARNING: ${missingWhyWrong.length} questions in ${section} have incomplete whyWrong`);
    }
    
    // Build output JSON
    const output = {
      $schema: '../schema/question.schema.json',
      section: section,
      exportedAt: new Date().toISOString(),
      questions: enhanced
    };
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    
    // Write file
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
    
    results.success[section] = enhanced.length;
    console.log(`  ${section}: ${enhanced.length} questions -> ${outputPath}`);
  }
  
  // Summary
  console.log('\n========== Migration Summary ==========\n');
  console.log('Questions migrated successfully:');
  let totalMigrated = 0;
  for (const [section, count] of Object.entries(results.success)) {
    console.log(`  ${section}: ${count} questions`);
    totalMigrated += count;
  }
  console.log(`\nTotal migrated: ${totalMigrated}`);
  
  if (results.errors.length > 0) {
    console.log(`\nErrors (${results.errors.length}):`);
    results.errors.forEach(e => {
      console.log(`  - ${e.id}: ${e.error}`);
    });
  }
  
  console.log('\nOutput files:');
  for (const section of Object.keys(results.success)) {
    console.log(`  content/cisa/${section.toLowerCase()}/questions.json`);
  }
  
  console.log('\nMigration complete!');
  
  return results;
}

// Run if called directly
if (require.main === module) {
  migrateQuestions().catch(console.error);
}

module.exports = { migrateQuestions, parseTypeScriptFile, enhanceQuestion };
