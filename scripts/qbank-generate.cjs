#!/usr/bin/env node
/**
 * qbank-generate: AI-powered question generation for blueprint gaps
 * 
 * Generates new questions using Gemini with:
 * - Full UWorld-style explanations from the start
 * - Blueprint-aligned topics
 * - JSON schema validation
 * - Authoritative references (ASC, IRC, etc.)
 * 
 * Usage:
 *   node scripts/qbank-generate.cjs BAR-I --count 50
 *   node scripts/qbank-generate.cjs ISC-II --count 100 --topic "Access controls"
 *   node scripts/qbank-generate.cjs --gap-fill         # Auto-fill all gaps
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv').default;
const addFormats = require('ajv-formats').default;

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content/cpa');
const SCHEMA_PATH = path.join(PROJECT_ROOT, 'content/schema/question.schema.json');
const PROGRESS_FILE = path.join(CONTENT_DIR, '.generate-progress.json');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Official AICPA Blueprint with detailed topics for generation
const BLUEPRINT = {
  FAR: {
    'FAR-I': {
      name: 'Conceptual Framework, Standard-Setting, and Financial Reporting',
      topics: [
        'FASB Conceptual Framework objectives and qualitative characteristics',
        'Standard-setting process and GAAP hierarchy',
        'Financial statement presentation requirements',
        'Fair value measurements (ASC 820) and inputs',
        'SEC reporting requirements and forms',
        'Interim financial reporting (ASC 270)',
      ],
      references: ['FASB ASC 820', 'ASC 270', 'FASB Concepts Statements']
    },
    'FAR-II': {
      name: 'Select Financial Statement Accounts',
      topics: [
        'Cash and cash equivalents classification',
        'Accounts receivable and allowance for credit losses (CECL, ASC 326)',
        'Inventory costing methods (FIFO, LIFO, weighted average)',
        'Lower of cost or net realizable value',
        'Property, plant, and equipment (acquisition, depreciation)',
        'Impairment of long-lived assets (ASC 360)',
        'Intangible assets and goodwill (ASC 350)',
        'Current liabilities and contingencies',
        'Long-term debt and bonds payable',
        'Stockholders equity transactions',
        'Treasury stock accounting',
        'Stock compensation (ASC 718)',
      ],
      references: ['ASC 326', 'ASC 330', 'ASC 360', 'ASC 350', 'ASC 470', 'ASC 718']
    },
    'FAR-III': {
      name: 'Select Transactions',
      topics: [
        'Revenue recognition five-step model (ASC 606)',
        'Contract modifications and variable consideration',
        'Principal vs agent considerations',
        'Lease classification and accounting (ASC 842)',
        'Lessee and lessor accounting',
        'Sale-leaseback transactions',
        'Income tax accounting (ASC 740)',
        'Deferred tax assets and liabilities',
        'Uncertain tax positions',
        'Pension accounting (ASC 715)',
        'Other post-employment benefits',
        'Accounting changes and error corrections (ASC 250)',
        'Earnings per share calculations (ASC 260)',
        'Statement of cash flows preparation',
        'Business combinations (ASC 805)',
        'Consolidation accounting',
      ],
      references: ['ASC 606', 'ASC 842', 'ASC 740', 'ASC 715', 'ASC 250', 'ASC 260', 'ASC 230', 'ASC 805', 'ASC 810']
    },
    'FAR-IV': {
      name: 'State and Local Governments',
      topics: [
        'Government-wide financial statements',
        'Fund financial statements',
        'Major fund reporting',
        'Measurement focus and basis of accounting',
        'Budgetary accounting and reporting',
        'Modified accrual recognition',
        'Capital assets and infrastructure',
        'Long-term debt and other liabilities',
        'Interfund transactions',
        'GASB Statement 34 requirements',
      ],
      references: ['GASB 34', 'GASB 54', 'GASB 87']
    },
    'FAR-V': {
      name: 'Not-for-Profit Entities',
      topics: [
        'Statement of Financial Position for NFP',
        'Statement of Activities format',
        'Net asset classifications (with/without donor restrictions)',
        'Contribution revenue recognition',
        'Pledges and unconditional promises',
        'Split-interest agreements',
        'Agency transactions',
        'Functional expense allocation',
      ],
      references: ['ASC 958', 'FASB ASU 2016-14']
    },
  },
  AUD: {
    'AUD-I': {
      name: 'Ethics, Professional Responsibilities, and General Principles',
      topics: [
        'AICPA Code of Professional Conduct principles',
        'Independence rules and interpretations',
        'Covered members and financial interests',
        'Non-attest services impact on independence',
        'Professional skepticism and judgment',
        'Quality management standards (SQMS)',
        'Acceptance and continuance decisions',
      ],
      references: ['AICPA Code of Professional Conduct', 'SAS 145', 'SQMS 1']
    },
    'AUD-II': {
      name: 'Assessing Risk and Developing a Planned Response',
      topics: [
        'Audit planning and strategy',
        'Understanding the entity and its environment',
        'Internal control components (COSO)',
        'Risk assessment procedures',
        'Identifying significant risks',
        'Fraud risk assessment',
        'Materiality determination',
        'Audit documentation requirements',
      ],
      references: ['SAS 145', 'AU-C 315', 'AU-C 320', 'AU-C 240']
    },
    'AUD-III': {
      name: 'Performing Further Procedures and Obtaining Evidence',
      topics: [
        'Audit evidence and assertions',
        'Tests of controls',
        'Substantive procedures',
        'Attribute and variables sampling',
        'Statistical vs non-statistical sampling',
        'External confirmations',
        'Analytical procedures',
        'Revenue and accounts receivable procedures',
        'Inventory observation',
        'Investment and derivatives testing',
        'Related party transactions',
        'Going concern evaluation',
        'Subsequent events procedures',
        'Management representations',
      ],
      references: ['AU-C 330', 'AU-C 500', 'AU-C 530', 'AU-C 505', 'AU-C 520', 'AU-C 570', 'AU-C 560']
    },
    'AUD-IV': {
      name: 'Forming Conclusions and Reporting',
      topics: [
        'Unmodified audit report',
        'Modified opinions (qualified, adverse, disclaimer)',
        'Emphasis of matter paragraphs',
        'Other matter paragraphs',
        'Key audit matters',
        'Reports on internal control',
        'Integrated audits',
        'Review engagements (SSARS)',
        'Compilation engagements',
        'Attestation standards',
        'SOC report types',
      ],
      references: ['AU-C 700', 'AU-C 705', 'AU-C 706', 'AU-C 940', 'AR-C 80', 'AR-C 90', 'AT-C 105']
    },
  },
  REG: {
    'REG-I': {
      name: 'Ethics, Professional Responsibilities, and Federal Tax Procedures',
      topics: [
        'Treasury Circular 230 requirements',
        'Tax preparer penalties (IRC 6694, 6695)',
        'Taxpayer penalties (accuracy, fraud)',
        'AICPA Statements on Standards for Tax Services',
        'Tax return positions and disclosure',
        'IRS audit process and appeals',
        'Statute of limitations for assessment',
        'Collection procedures and liens',
        'Taxpayer rights and representation',
      ],
      references: ['Circular 230', 'IRC 6694', 'IRC 6695', 'IRC 6662', 'IRC 6501']
    },
    'REG-II': {
      name: 'Business Law',
      topics: [
        'Agency law and authority types',
        'Contract formation and consideration',
        'Statute of frauds',
        'Contract performance and remedies',
        'UCC Article 2 sales contracts',
        'UCC Article 9 secured transactions',
        'Debtor-creditor relationships',
        'Bankruptcy chapters 7 and 11',
        'Surety and guarantor obligations',
        'Business structure selection',
        'Securities regulation basics',
      ],
      references: ['UCC Article 2', 'UCC Article 9', 'Restatement of Contracts']
    },
    'REG-III': {
      name: 'Federal Taxation of Individuals',
      topics: [
        'Gross income inclusions and exclusions',
        'Above-the-line deductions',
        'Standard vs itemized deductions',
        'Medical expense deduction limitations',
        'Charitable contribution limitations',
        'Filing status determination',
        'Dependency exemptions and credits',
        'Child tax credit and EITC',
        'Education credits and deductions',
        'Alternative minimum tax',
        'Self-employment tax calculation',
        'Estimated tax payments',
      ],
      references: ['IRC 61', 'IRC 62', 'IRC 63', 'IRC 151', 'IRC 55']
    },
    'REG-IV': {
      name: 'Federal Taxation of Entities',
      topics: [
        'C corporation formation and basis',
        'Corporate taxable income calculation',
        'Corporate distributions and dividends',
        'Corporate redemptions and liquidations',
        'S corporation eligibility and election',
        'S corporation built-in gains tax',
        'Partnership formation and basis',
        'Partnership distributions',
        'Partner self-employment income',
        'Partnership allocations and special allocations',
        'Trust and estate taxation',
        'DNI and distributable income',
        'Tax-exempt organization requirements',
      ],
      references: ['IRC 351', 'IRC 368', 'IRC 1361', 'IRC 721', 'IRC 731', 'IRC 501']
    },
    'REG-V': {
      name: 'Federal Taxation of Property Transactions',
      topics: [
        'Basis determination rules',
        'Adjusted basis calculations',
        'Capital gains and losses',
        'Net capital loss limitations',
        'Section 1231 gains and losses',
        'Depreciation recapture (1245, 1250)',
        'Like-kind exchanges (Section 1031)',
        'Involuntary conversions (Section 1033)',
        'Installment sales method',
        'Related party transaction rules',
        'Wash sale rules',
      ],
      references: ['IRC 1001', 'IRC 1221', 'IRC 1231', 'IRC 1245', 'IRC 1250', 'IRC 1031']
    },
  },
  BAR: {
    'BAR-I': {
      name: 'Business Analysis',
      topics: [
        'Ratio analysis (liquidity, solvency, profitability)',
        'DuPont analysis and ROE decomposition',
        'Working capital management',
        'Cash flow forecasting',
        'Prospective financial statements',
        'Pro forma financial statements',
        'Variance analysis',
        'Break-even analysis',
        'Cost-volume-profit relationships',
        'Corporate governance principles',
        'Internal control frameworks (COSO)',
        'Risk assessment and management',
        'Key performance indicators',
      ],
      references: ['COSO Framework', 'AICPA Guide Prospective Financial Information']
    },
    'BAR-II': {
      name: 'Technical Accounting and Reporting',
      topics: [
        'Foreign currency translation (ASC 830)',
        'Functional currency determination',
        'Remeasurement vs translation',
        'Derivatives and hedging (ASC 815)',
        'Fair value option',
        'Segment reporting (ASC 280)',
        'Related party disclosures',
        'Subsequent events evaluation',
        'Going concern assessment',
        'Public company reporting requirements',
        'MD&A analysis',
        'XBRL tagging requirements',
      ],
      references: ['ASC 830', 'ASC 815', 'ASC 280', 'Regulation S-K', 'Regulation S-X']
    },
    'BAR-III': {
      name: 'State and Local Governments',
      topics: [
        'Fund types and classifications',
        'General fund accounting',
        'Special revenue funds',
        'Capital projects funds',
        'Debt service funds',
        'Enterprise funds',
        'Internal service funds',
        'Fiduciary funds',
        'GASB 34 reporting model',
        'Net position categories',
        'Statistical section requirements',
      ],
      references: ['GASB 34', 'GASB 54', 'GASB 63']
    },
  },
  ISC: {
    'ISC-I': {
      name: 'Information Systems',
      topics: [
        'IT governance frameworks (COBIT)',
        'IT strategic planning and alignment',
        'System development life cycle (SDLC)',
        'Agile development methodology',
        'Database management systems',
        'Data architecture and modeling',
        'Cloud computing models (IaaS, PaaS, SaaS)',
        'System integration and interfaces',
        'Data backup and recovery procedures',
        'Disaster recovery planning',
        'Business continuity planning',
        'IT change management',
        'Configuration management',
      ],
      references: ['COBIT', 'NIST Cybersecurity Framework', 'ISO 27001']
    },
    'ISC-II': {
      name: 'Security, Confidentiality, and Privacy',
      topics: [
        'Access control models (DAC, MAC, RBAC)',
        'Authentication methods (MFA, biometrics)',
        'Encryption symmetric and asymmetric',
        'Public key infrastructure (PKI)',
        'Network security (firewalls, IDS/IPS)',
        'Vulnerability management',
        'Penetration testing',
        'Security incident response',
        'Privacy regulations (GDPR, CCPA)',
        'Data classification schemes',
        'Physical security controls',
        'Social engineering awareness',
        'Malware protection',
      ],
      references: ['NIST SP 800-53', 'ISO 27001', 'GDPR', 'CCPA']
    },
    'ISC-III': {
      name: 'Considerations for System and Organization Controls',
      topics: [
        'SOC 1 report (ICFR)',
        'SOC 2 report (Trust Services Criteria)',
        'SOC 3 report (general use)',
        'Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy)',
        'Type 1 vs Type 2 reports',
        'Subservice organizations',
        'Complementary user entity controls (CUECs)',
        'Management assertions',
        'Service auditor responsibilities',
      ],
      references: ['AT-C 320', 'AICPA Trust Services Criteria', 'SSAE 18']
    },
  },
  TCP: {
    'TCP-I': {
      name: 'Tax Compliance and Planning for Individuals and Personal Financial Planning',
      topics: [
        'Comprehensive individual tax planning strategies',
        'Income timing and deferral techniques',
        'Deduction bunching strategies',
        'Retirement distribution planning',
        'Roth conversion analysis',
        'Required minimum distributions',
        'Social Security optimization',
        'Medicare premium surcharges (IRMAA)',
        'Education funding (529 plans, Coverdell)',
        'HSA planning strategies',
        'Charitable giving techniques (DAF, CRT)',
        'State residency planning',
      ],
      references: ['IRC 401', 'IRC 408A', 'IRC 529', 'IRC 223']
    },
    'TCP-II': {
      name: 'Entity Tax Compliance',
      topics: [
        'Partnership Form 1065 preparation',
        'Schedule K-1 allocations',
        'Partner capital account maintenance',
        'S corporation Form 1120S preparation',
        'Reasonable compensation requirements',
        'C corporation Form 1120 preparation',
        'Corporate estimated taxes',
        'Multi-state apportionment',
        'Nexus determination',
        'Unitary business principles',
        'Tax credits and incentives (R&D, Work Opportunity)',
      ],
      references: ['Form 1065', 'Form 1120S', 'Form 1120', 'IRC 41', 'IRC 51']
    },
    'TCP-III': {
      name: 'Entity Tax Planning',
      topics: [
        'Entity selection analysis',
        'Formation and organization planning',
        'Compensation planning (salary vs distributions)',
        'Qualified retirement plans selection',
        'State tax minimization strategies',
        'Exit strategy planning',
        'M&A tax considerations',
        'IRC 338(h)(10) elections',
        'Reorganization types (A, B, C, D)',
        'International tax basics (GILTI, Subpart F)',
      ],
      references: ['IRC 338', 'IRC 368', 'IRC 951A']
    },
    'TCP-IV': {
      name: 'Property Transactions',
      topics: [
        'Advanced like-kind exchange planning',
        'Reverse exchange structures',
        'Installment sale optimization',
        'Stock vs asset acquisition analysis',
        'Section 338 election benefits',
        'Corporate liquidation planning',
        'Partnership interest sales',
        'Hot asset rules (IRC 751)',
        'Opportunity Zone investments',
        'Qualified small business stock (1202)',
      ],
      references: ['IRC 1031', 'IRC 453', 'IRC 338', 'IRC 751', 'IRC 1202', 'IRC 1400Z-2']
    },
  },
};

// Parse command line
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerbose = args.includes('--verbose');
const gapFill = args.includes('--gap-fill');
const countArg = args.find(a => a.startsWith('--count='));
const topicArg = args.find(a => a.startsWith('--topic='));
const requestedCount = countArg ? parseInt(countArg.split('=')[1]) : 10;
const requestedTopic = topicArg ? topicArg.split('=')[1] : null;

// Find blueprint area argument
const areaArg = args.find(a => /^[A-Z]{3}-[IVX]+$/i.test(a));

if (!gapFill && !areaArg) {
  console.log('Usage: node qbank-generate.cjs <AREA> [--count=N] [--topic="..."] [--dry-run]');
  console.log('       node qbank-generate.cjs --gap-fill [--count=N]');
  console.log('\nAreas: FAR-I, FAR-II, FAR-III, FAR-IV, FAR-V');
  console.log('       AUD-I, AUD-II, AUD-III, AUD-IV');
  console.log('       REG-I, REG-II, REG-III, REG-IV, REG-V');
  console.log('       BAR-I, BAR-II, BAR-III');
  console.log('       ISC-I, ISC-II, ISC-III');
  console.log('       TCP-I, TCP-II, TCP-III, TCP-IV');
  console.log('\nSet GEMINI_API_KEY environment variable first.');
  process.exit(1);
}

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not set');
  console.log('Run: export GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env | cut -d"=" -f2)');
  process.exit(1);
}

// Initialize validator
function createValidator() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf-8'));
  return ajv.compile(schema);
}

// Sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Load existing questions to avoid duplicates
function loadExistingQuestions(section) {
  const filePath = path.join(CONTENT_DIR, section.toLowerCase(), 'questions.json');
  if (!fs.existsSync(filePath)) {
    return { questions: [], existingIds: new Set(), existingStems: new Set() };
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const existingIds = new Set(data.questions.map(q => q.id));
  const existingStems = new Set(data.questions.map(q => 
    q.question.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 100)
  ));
  return { questions: data.questions, existingIds, existingStems };
}

// Generate unique ID
function generateId(section, existing, prefix = '') {
  const base = section.toLowerCase();
  let num = existing.questions.length + 1;
  let id;
  do {
    id = prefix ? `${base}-${prefix}-${String(num).padStart(3, '0')}` : `${base}-gen-${String(num).padStart(4, '0')}`;
    num++;
  } while (existing.existingIds.has(id));
  return id;
}

// Build generation prompt
function buildGenerationPrompt(area, areaConfig, topic = null, existingSampleQuestion = null) {
  const section = area.split('-')[0];
  const topicToUse = topic || areaConfig.topics[Math.floor(Math.random() * areaConfig.topics.length)];
  const difficulty = ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)];
  const skillLevels = ['Remembering and Understanding', 'Application', 'Analysis'];
  const skillLevel = skillLevels[Math.floor(Math.random() * skillLevels.length)];
  
  const references = areaConfig.references.join(', ');
  
  return {
    prompt: `You are generating a CPA exam MCQ question for the ${section} section, blueprint area ${area}: ${areaConfig.name}.

TOPIC: ${topicToUse}
DIFFICULTY: ${difficulty} (${difficulty === 'easy' ? 'tests basic recall' : difficulty === 'medium' ? 'requires application' : 'requires analysis and judgment'})
SKILL LEVEL: ${skillLevel}
AUTHORITATIVE REFERENCES: ${references}

Generate a realistic CPA exam-style multiple choice question with 4 options (A, B, C, D).

Requirements:
1. Question should test practical knowledge a CPA needs
2. Include realistic numbers and scenarios when appropriate
3. All 4 options should be plausible to someone who hasn't mastered the topic
4. One and only one answer should be clearly correct
5. Include authoritative references (${references})

Respond with ONLY a valid JSON object (no markdown, no explanation):
{
  "topic": "${topicToUse}",
  "subtopic": "specific subtopic being tested",
  "difficulty": "${difficulty}",
  "skillLevel": "${skillLevel}",
  "question": "The complete question stem with any necessary context or scenario",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correctAnswer": 0,
  "explanation": "Clear explanation of why the correct answer is right, citing authoritative guidance",
  "whyWrong": {
    "0": "If A is wrong, explain why (skip if A is correct)",
    "1": "If B is wrong, explain why (skip if B is correct)",
    "2": "If C is wrong, explain why (skip if C is correct)",
    "3": "If D is wrong, explain why (skip if D is correct)"
  },
  "educational": "Teach the underlying concept in 2-3 sentences",
  "examTip": "Practical tip for recognizing similar questions on the exam",
  "memoryAid": "Mnemonic, acronym, or memory trick if applicable",
  "reference": "Primary authoritative reference (e.g., ASC 606, IRC 1031)"
}`,
    expectedTopic: topicToUse,
    expectedDifficulty: difficulty,
    expectedSkillLevel: skillLevel,
  };
}

// Call Gemini API
async function callGemini(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });
      
      if (!response.ok) {
        if (response.status === 429) {
          console.log(`   ⏳ Rate limited, waiting 30s (attempt ${attempt}/${retries})`);
          await sleep(30000);
          continue;
        }
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      if (attempt === retries) throw e;
      console.log(`   ⚠️  Attempt ${attempt} failed: ${e.message}, retrying...`);
      await sleep(2000);
    }
  }
}

// Generate a single question
async function generateQuestion(area, areaConfig, existing, validate, topic = null) {
  const section = area.split('-')[0];
  const { prompt, expectedDifficulty, expectedSkillLevel } = buildGenerationPrompt(area, areaConfig, topic);
  
  const generated = await callGemini(prompt);
  
  // Build full question object
  const questionId = generateId(section, existing);
  const question = {
    id: questionId,
    version: 1,
    status: 'draft',
    courseId: 'cpa',
    section: section,
    blueprintArea: area,
    topic: generated.topic || 'General',
    subtopic: generated.subtopic,
    difficulty: generated.difficulty || expectedDifficulty,
    skillLevel: generated.skillLevel || expectedSkillLevel,
    question: generated.question,
    options: generated.options,
    correctAnswer: generated.correctAnswer,
    explanation: generated.explanation,
    whyWrong: generated.whyWrong,
    educational: generated.educational,
    examTip: generated.examTip,
    memoryAid: generated.memoryAid,
    reference: generated.reference,
    createdAt: new Date().toISOString().slice(0, 10),
    sourceFile: 'ai-generated',
  };
  
  // Remove whyWrong entry for correct answer
  if (question.whyWrong && question.whyWrong[String(question.correctAnswer)]) {
    delete question.whyWrong[String(question.correctAnswer)];
  }
  
  // Validate
  const isValid = validate(question);
  if (!isValid) {
    const errors = validate.errors.slice(0, 3).map(e => `${e.instancePath}: ${e.message}`).join('; ');
    throw new Error(`Validation failed: ${errors}`);
  }
  
  // Check for duplicate
  const stemKey = question.question.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 100);
  if (existing.existingStems.has(stemKey)) {
    throw new Error('Duplicate question detected');
  }
  
  return question;
}

// Save questions to file
function saveQuestions(section, questions, newCount) {
  const filePath = path.join(CONTENT_DIR, section.toLowerCase(), 'questions.json');
  
  // Backup first
  if (fs.existsSync(filePath)) {
    const backupPath = filePath.replace('.json', `.backup-${Date.now()}.json`);
    fs.copyFileSync(filePath, backupPath);
  }
  
  // Load existing and merge
  let data;
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    data.questions = data.questions.concat(questions);
    // Update metadata if it exists, otherwise add top-level properties
    if (data.metadata) {
      data.metadata.questionCount = data.questions.length;
      data.metadata.updatedAt = new Date().toISOString();
    } else {
      data.questionCount = data.questions.length;
      data.updatedAt = new Date().toISOString();
    }
  } else {
    data = {
      $schema: '../schema/question.schema.json',
      section,
      courseId: 'cpa',
      questionCount: questions.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions,
    };
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`   💾 Saved ${newCount} new questions to ${filePath}`);
}

// Progress tracking
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  }
  return { generated: 0, byArea: {}, errors: [], lastRun: null };
}

function saveProgress(progress) {
  progress.lastRun = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf-8');
}

// Main generation function
async function generateForArea(area, count, topic = null) {
  const section = area.split('-')[0];
  const areaConfig = BLUEPRINT[section]?.[area];
  
  if (!areaConfig) {
    console.error(`❌ Unknown blueprint area: ${area}`);
    return { generated: 0, errors: [] };
  }
  
  console.log(`\n📝 Generating ${count} questions for ${area}: ${areaConfig.name}`);
  if (topic) console.log(`   Topic filter: ${topic}`);
  
  const validate = createValidator();
  const existing = loadExistingQuestions(section);
  const newQuestions = [];
  const errors = [];
  
  for (let i = 0; i < count; i++) {
    process.stdout.write(`   [${i + 1}/${count}] Generating... `);
    
    if (isDryRun) {
      console.log('(dry run)');
      continue;
    }
    
    try {
      const question = await generateQuestion(area, areaConfig, existing, validate, topic);
      newQuestions.push(question);
      existing.existingIds.add(question.id);
      existing.existingStems.add(question.question.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 100));
      console.log(`✓ ${question.id}`);
      
      // Rate limit
      await sleep(2500);
    } catch (e) {
      console.log(`✗ ${e.message}`);
      errors.push({ attempt: i + 1, error: e.message });
      await sleep(1000);
    }
  }
  
  // Save if we generated anything
  if (newQuestions.length > 0) {
    saveQuestions(section, newQuestions, newQuestions.length);
  }
  
  console.log(`   ✅ Generated ${newQuestions.length}/${count} questions`);
  if (errors.length > 0) {
    console.log(`   ⚠️  ${errors.length} errors`);
  }
  
  return { generated: newQuestions.length, errors };
}

// Main
async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║           VoraPrep AI Question Generator                      ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  
  if (isDryRun) {
    console.log('\n🔍 DRY RUN - No questions will be generated\n');
  }
  
  const progress = loadProgress();
  
  if (gapFill) {
    // Auto-fill gaps based on blueprint analysis
    const analysisPath = path.join(CONTENT_DIR, 'blueprint-analysis.json');
    if (!fs.existsSync(analysisPath)) {
      console.log('Run npm run qbank:analyze first to identify gaps');
      process.exit(1);
    }
    
    const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf-8'));
    console.log('\n📊 Gap-fill mode: generating for underweight areas\n');
    
    for (const section of analysis.sections) {
      for (const rec of section.recommendations) {
        if (rec.priority === 'HIGH' && rec.quantity > 0) {
          const toGenerate = Math.min(rec.quantity, requestedCount);
          const result = await generateForArea(rec.area, toGenerate);
          progress.generated += result.generated;
          progress.byArea[rec.area] = (progress.byArea[rec.area] || 0) + result.generated;
        }
      }
    }
  } else {
    // Generate for specific area
    const result = await generateForArea(areaArg.toUpperCase(), requestedCount, requestedTopic);
    progress.generated += result.generated;
    progress.byArea[areaArg.toUpperCase()] = (progress.byArea[areaArg.toUpperCase()] || 0) + result.generated;
  }
  
  saveProgress(progress);
  
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log(`  Total generated this session: ${progress.generated}`);
  console.log('════════════════════════════════════════════════════════════════');
}

main().catch(console.error);
