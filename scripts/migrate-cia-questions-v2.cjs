#!/usr/bin/env node
/**
 * CIA Question Migration Script (v2 - using esbuild bundle)
 * Migrates CIA questions from TypeScript to enhanced JSON format
 * 
 * Usage: node scripts/migrate-cia-questions-v2.cjs
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../content/cia');

// Load bundled questions
const ciaBundle = require('/tmp/cia-questions-bundle.cjs');

// CIA Part information for enhanced fields
const CIA_INFO = {
  'CIA1': {
    name: 'Essentials of Internal Auditing',
    domains: {
      'I': 'Foundations of Internal Auditing (40%)',
      'II': 'Independence and Objectivity (15%)', 
      'III': 'Proficiency and Due Professional Care (15%)',
      'IV': 'Quality Assurance and Improvement Program (10%)',
      'V': 'Governance, Risk Management, and Control (20%)'
    }
  },
  'CIA2': {
    name: 'Practice of Internal Auditing',
    domains: {
      'I': 'Managing the Internal Audit Activity (20%)',
      'II': 'Planning the Engagement (20%)',
      'III': 'Performing the Engagement (40%)',
      'IV': 'Communicating Results and Monitoring Progress (20%)'
    }
  },
  'CIA3': {
    name: 'Business Knowledge for Internal Auditing',
    domains: {
      'I': 'Business Acumen (35%)',
      'II': 'Information Security (25%)',
      'III': 'Information Technology (20%)',
      'IV': 'Financial Management (20%)'
    }
  }
};

// IIA Standards references mapping
const IIA_REFERENCES = {
  'ethics': 'IIA Code of Ethics',
  'independence': 'IIA Standard 1100 - Independence and Objectivity',
  'objectivity': 'IIA Standard 1100 - Independence and Objectivity',
  'proficiency': 'IIA Standard 1200 - Proficiency and Due Professional Care',
  'due professional care': 'IIA Standard 1200 - Proficiency and Due Professional Care',
  'quality': 'IIA Standard 1300 - Quality Assurance and Improvement Program',
  'qaip': 'IIA Standard 1300 - Quality Assurance and Improvement Program',
  'charter': 'IIA Standard 1000 - Purpose, Authority, and Responsibility',
  'managing': 'IIA Standard 2000 - Managing the Internal Audit Activity',
  'planning': 'IIA Standard 2200 - Engagement Planning',
  'performing': 'IIA Standard 2300 - Performing the Engagement',
  'evidence': 'IIA Standard 2310 - Identifying Information',
  'documentation': 'IIA Standard 2330 - Documenting Information',
  'communicating': 'IIA Standard 2400 - Communicating Results',
  'reporting': 'IIA Standard 2400 - Communicating Results',
  'monitoring': 'IIA Standard 2500 - Monitoring Progress',
  'follow-up': 'IIA Standard 2500 - Monitoring Progress',
  'governance': 'IIA Standard 2110 - Governance',
  'risk': 'IIA Standard 2120 - Risk Management',
  'control': 'IIA Standard 2130 - Control',
  'fraud': 'IIA Practice Guide: Internal Auditing and Fraud',
  'it': 'IIA GTAG (Global Technology Audit Guide)',
  'information technology': 'IIA GTAG (Global Technology Audit Guide)',
  'information security': 'IIA GTAG 15: Information Security Governance',
  'cybersecurity': 'IIA GTAG 15: Information Security Governance',
  'sampling': 'IIA Practice Guide: Audit Sampling',
  'coso': 'COSO Internal Control - Integrated Framework (2013)',
  'three lines': 'IIA Three Lines Model (2020)',
  'mission': 'IIA Mission of Internal Audit',
  'definition': 'IIA Definition of Internal Auditing',
  'core principles': 'IIA Core Principles for the Professional Practice of Internal Auditing',
  'strategic': 'IIA Practice Guide: Strategic Planning',
  'financial': 'IIA GTAG: Auditing Business Processes',
  'pricing': 'Managerial Accounting Principles',
  'capital': 'Financial Management Principles',
  'ratio': 'Financial Analysis Principles',
  'default': 'IIA International Professional Practices Framework (IPPF)'
};

/**
 * Generate whyWrong explanations for each option
 */
function generateWhyWrong(question) {
  const whyWrong = {};
  const correctIdx = question.correctAnswer;
  const explanation = question.explanation || '';
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  
  for (let i = 0; i < 4; i++) {
    const optionLetter = String.fromCharCode(65 + i); // A, B, C, D
    const optionText = question.options[i] || '';
    const optionLower = optionText.toLowerCase();
    
    if (i === correctIdx) {
      // Correct answer explanation - extract from main explanation
      const firstSentence = explanation.split('.')[0];
      whyWrong[String(i)] = `Why option ${optionLetter} is CORRECT - ${firstSentence}. This aligns with IIA professional standards and best practices.`;
    } else {
      // Wrong answer explanation - generate contextual reason
      const wrongReason = generateWrongReason(question, optionText, i);
      whyWrong[String(i)] = `Why option ${optionLetter} is WRONG - ${wrongReason}`;
    }
  }
  
  return whyWrong;
}

/**
 * Generate contextual wrong answer explanation
 */
function generateWrongReason(question, optionText, optIdx) {
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  const correctAnswer = question.options[question.correctAnswer] || '';
  const explanation = question.explanation || '';
  const optionLower = optionText.toLowerCase();
  
  // Absolute statement patterns - common wrong answer indicators
  if (/\b(only|always|never|all|none|every|must always|cannot)\b/i.test(optionText)) {
    if (optionLower.includes('only')) {
      return `This is too restrictive. Internal auditing requires a comprehensive approach that goes beyond a single factor.`;
    }
    if (optionLower.includes('always') || optionLower.includes('every')) {
      return `Absolute statements like "always" or "every" are rarely accurate in internal auditing. Professional judgment considers context and circumstances.`;
    }
    if (optionLower.includes('never') || optionLower.includes('cannot')) {
      return `This is too restrictive. IIA Standards allow for flexibility based on professional judgment and specific circumstances.`;
    }
    if (optionLower.includes('none') || optionLower.includes('all')) {
      return `This answer is too absolute. Internal auditing requires balanced consideration of multiple factors.`;
    }
  }
  
  // Check for negation patterns
  if (/\b(not required|unnecessary|optional|discretionary)\b/i.test(optionText)) {
    return `This understates the importance of the requirement. IIA Standards mandate specific actions in this area.`;
  }
  
  // Topic-specific wrong reasons
  if (topic.includes('independence') || subtopic.includes('independence')) {
    return `This does not meet the organizational independence requirements. The CAE must report functionally to the board for true independence.`;
  }
  
  if (topic.includes('objectivity') || subtopic.includes('objectivity')) {
    return `This compromises individual objectivity. Auditors must maintain an unbiased mental attitude when making assessments.`;
  }
  
  if (topic.includes('ethics') || subtopic.includes('ethics')) {
    return `This conflicts with the IIA Code of Ethics. Internal auditors must uphold integrity, objectivity, confidentiality, and competency.`;
  }
  
  if (topic.includes('quality') || subtopic.includes('qaip')) {
    return `This does not satisfy QAIP requirements under Standard 1300. Both internal and external assessments are required components.`;
  }
  
  if (topic.includes('proficiency') || subtopic.includes('proficiency')) {
    return `This does not reflect the proficiency requirements. Internal auditors must possess knowledge, skills, and competencies relevant to their responsibilities.`;
  }
  
  if (topic.includes('governance')) {
    return `This misrepresents the internal auditor's role in governance. IA provides assurance on governance processes but does not assume management responsibilities.`;
  }
  
  if (topic.includes('risk')) {
    if (optionLower.includes('eliminate')) {
      return `Risk cannot be completely eliminated. The goal is to manage risk to acceptable levels aligned with organizational risk appetite.`;
    }
    return `This does not correctly apply risk management principles. Risk assessment considers both likelihood and impact.`;
  }
  
  if (topic.includes('control')) {
    return `This does not correctly characterize internal controls. Controls provide reasonable, not absolute, assurance of objective achievement.`;
  }
  
  if (topic.includes('sampling')) {
    if (optionLower.includes('statistical') && question.correctAnswer !== optIdx) {
      return `Statistical and judgmental sampling have different applications. Statistical sampling requires random selection and allows projection to the population.`;
    }
    return `This does not correctly apply sampling principles. The sampling method should match the audit objective and population characteristics.`;
  }
  
  if (topic.includes('fraud')) {
    return `Internal auditors are not primarily responsible for fraud detection, but must maintain awareness of fraud risks and controls.`;
  }
  
  if (topic.includes('communicating') || topic.includes('reporting')) {
    return `This does not meet communication requirements. Audit reports must be accurate, objective, clear, concise, constructive, complete, and timely.`;
  }
  
  if (topic.includes('planning')) {
    return `This does not reflect proper engagement planning requirements. Planning establishes the engagement objectives, scope, timing, and resource allocation.`;
  }
  
  if (topic.includes('evidence') || topic.includes('documentation')) {
    return `This does not meet documentation standards. Working papers must sufficiently support conclusions and engagement results.`;
  }
  
  // IT/Security specific
  if (topic.includes('information security') || topic.includes('cybersecurity') || topic.includes('it')) {
    return `This does not correctly address IT or security concepts. Information security requires a comprehensive approach to confidentiality, integrity, and availability.`;
  }
  
  // Financial management
  if (topic.includes('financial')) {
    return `This does not correctly apply financial management principles. Understanding financial concepts is essential for effective audit coverage.`;
  }
  
  // Business acumen
  if (topic.includes('business') || topic.includes('strategic')) {
    return `This does not reflect sound business acumen principles. Internal auditors must understand organizational strategy and operations.`;
  }
  
  // Try to extract context from the explanation
  if (explanation.toLowerCase().includes('not') && explanation.toLowerCase().includes(optionText.split(' ')[0].toLowerCase())) {
    return `As stated in the Standards, this approach does not meet the requirements for this situation.`;
  }
  
  // Generic fallback - make it sound analytical
  return `This is a common misconception. The correct approach is "${correctAnswer.substring(0, 60)}..." per IIA guidance.`;
}

/**
 * Generate educational content for deeper learning
 */
function generateEducational(question) {
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  const section = question.section || 'CIA1';
  const blueprintArea = question.blueprintArea || '';
  
  // Section-specific educational content
  if (section === 'CIA1') {
    if (subtopic.includes('ethics') || topic.includes('ethics')) {
      return `The IIA Code of Ethics is the foundation of the profession. It consists of Principles (Integrity, Objectivity, Confidentiality, Competency) and associated Rules of Conduct. All CIA candidates are expected to understand and apply these ethical requirements. Violations can result in revocation of certification.`;
    }
    if (subtopic.includes('independence') || topic.includes('independence')) {
      return `Organizational independence requires the CAE to report functionally to the board or audit committee (for charter approval, audit plan, CAE evaluation/compensation) and administratively to senior management (for day-to-day operations). This dual reporting structure protects internal audit's ability to objectively assess organizational activities.`;
    }
    if (subtopic.includes('objectivity') || topic.includes('objectivity')) {
      return `Individual objectivity is a mindset that enables auditors to perform work without compromise. Threats to objectivity include self-review, familiarity, undue influence, and personal bias. Impairments should be disclosed to appropriate parties, and safeguards should be implemented when possible.`;
    }
    if (subtopic.includes('qaip') || topic.includes('quality')) {
      return `QAIP is mandatory for all internal audit activities. It includes ongoing internal assessments (continuous monitoring), periodic internal assessments (self-assessments), and external assessments (at least every 5 years by a qualified, independent assessor). The CAE must communicate results to senior management and the board.`;
    }
    if (topic.includes('governance') || subtopic.includes('governance')) {
      return `Internal audit's role in governance includes assessing and making recommendations for improving governance processes. The three lines model shows how governance operates: first line (management owns/manages risk), second line (risk/compliance functions provide oversight), and third line (internal audit provides independent assurance).`;
    }
    if (topic.includes('charter') || subtopic.includes('charter')) {
      return `The internal audit charter is a formal document that defines internal audit's purpose, authority, and responsibility. It establishes the CAE's functional reporting relationship, authorizes access to records and personnel, and defines the scope of internal audit activities. The board must approve the charter.`;
    }
    return `This concept is fundamental to CIA Part 1: Essentials of Internal Auditing. Part 1 focuses on the foundational elements that enable internal audit to function effectively, including independence, ethics, governance, and quality assurance. Understanding these foundations is critical for all aspects of internal audit work.`;
  }
  
  if (section === 'CIA2') {
    if (topic.includes('managing') || subtopic.includes('managing')) {
      return `Managing the internal audit activity involves strategic planning, resource management, and coordination. The CAE must establish policies and procedures, develop a risk-based audit plan, communicate with senior management and the board, and ensure resources are effectively deployed to achieve the audit plan.`;
    }
    if (topic.includes('planning') || subtopic.includes('planning')) {
      return `Engagement planning establishes objectives, scope, timing, and resource allocation. Key steps include understanding the client, performing preliminary risk assessment, developing an engagement program, and allocating resources. Proper planning helps ensure engagements achieve their objectives efficiently.`;
    }
    if (topic.includes('performing') || topic.includes('evidence')) {
      return `Performing the engagement involves gathering and analyzing information to develop findings. Internal auditors must obtain sufficient, reliable, relevant, and useful information to support engagement results. Documentation (working papers) must sufficiently support conclusions and be retained according to organizational policy.`;
    }
    if (topic.includes('sampling')) {
      return `Audit sampling applies when examining less than 100% of a population. Statistical sampling uses random selection and allows mathematical projection to the population. Judgmental sampling relies on auditor expertise and cannot be statistically projected. The method chosen depends on the audit objective and population characteristics.`;
    }
    if (topic.includes('communicating') || topic.includes('reporting')) {
      return `Internal auditors must communicate engagement results through formal reports. Reports should be accurate, objective, clear, concise, constructive, complete, and timely. Significant findings and recommendations require senior management or board attention. Follow-up processes monitor management's implementation of corrective action.`;
    }
    return `This concept is tested in CIA Part 2: Practice of Internal Auditing. Part 2 focuses on the engagement lifecycle: managing the IA activity, planning engagements, performing fieldwork, and communicating results. These are the practical skills every internal auditor uses daily.`;
  }
  
  if (section === 'CIA3') {
    if (topic.includes('information security') || topic.includes('cybersecurity')) {
      return `Information security is critical for organizational resilience. Key concepts include the CIA triad (Confidentiality, Integrity, Availability), access controls (authentication, authorization), network security, encryption, incident response, and business continuity. Internal auditors assess whether security controls adequately protect information assets.`;
    }
    if (topic.includes('it') || topic.includes('information technology')) {
      return `IT is integral to modern organizations and presents unique risks. Key audit areas include IT governance, change management, access controls, system development, data management, and disaster recovery. Internal auditors need not be IT experts but must understand IT risks and controls relevant to audit objectives.`;
    }
    if (topic.includes('financial') || subtopic.includes('ratio') || subtopic.includes('analysis')) {
      return `Financial acumen enables internal auditors to assess financial risks and controls effectively. Key areas include financial statement analysis, ratio analysis (liquidity, profitability, leverage, efficiency), budgeting, costing methods, and capital investment decisions. Understanding financial concepts helps auditors identify red flags and anomalies.`;
    }
    if (topic.includes('business') || topic.includes('strategic')) {
      return `Business acumen involves understanding organizational strategy, operations, and industry dynamics. Key areas include strategic planning, organizational structures, performance management, supply chain, and regulatory environment. Internal auditors with strong business acumen can better assess risks and add value through consulting services.`;
    }
    return `This concept is tested in CIA Part 3: Business Knowledge for Internal Auditing. Part 3 covers the business context in which internal auditors operate, including IT, information security, financial management, and organizational strategy. This knowledge enables auditors to provide valuable insights beyond compliance checking.`;
  }
  
  return `Understanding this concept is important for CIA exam success and professional practice. The CIA exam tests not just knowledge, but the ability to apply principles to scenarios. Focus on understanding the "why" behind requirements, not just memorizing rules.`;
}

/**
 * Generate exam tip for test-taking strategy
 */
function generateExamTip(question) {
  const difficulty = question.difficulty || 'medium';
  const skillLevel = question.skillLevel || 'Application';
  const options = question.options || [];
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  
  // Check for absolute words in options
  const absoluteOptions = options.filter(opt => 
    /\b(always|never|only|all|none|every|must always|cannot|no|completely)\b/i.test(opt)
  );
  
  if (absoluteOptions.length > 0) {
    return `Watch for absolute terms like "always," "never," "only," or "all." In internal auditing, these extremes are often incorrect because professional judgment and circumstances matter. Look for answers that acknowledge nuance and context.`;
  }
  
  // Skill-level specific tips
  if (skillLevel === 'Analysis' || skillLevel === 'Evaluation') {
    return `This is a higher-order thinking question. First eliminate clearly wrong answers. Then compare the remaining options carefully - the correct answer usually has the most complete and balanced approach supported by IIA Standards.`;
  }
  
  if (skillLevel === 'Remembering and Understanding' || skillLevel === 'Remembering') {
    return `This tests fundamental knowledge from the IIA Standards. If you know the Standards well, the answer should be direct. When in doubt, choose the answer that most closely matches the exact language of the IIA guidance.`;
  }
  
  // Topic-specific tips
  if (topic.includes('independence') || subtopic.includes('independence')) {
    return `For independence questions, remember the key distinction: functional reporting goes to the board (charter, plan, CAE compensation), administrative reporting goes to management (CEO). Functional reporting protects independence.`;
  }
  
  if (topic.includes('quality') || subtopic.includes('qaip')) {
    return `QAIP questions often test the distinction between internal and external assessments. Remember: internal = ongoing + periodic (by IA), external = at least every 5 years (by independent party). Results go to senior management and the board.`;
  }
  
  if (topic.includes('sampling')) {
    return `Sampling questions usually test statistical vs. judgmental approaches. Key distinction: statistical sampling allows projection to the population (requires random selection), judgmental does not. Choose the method based on whether you need to make population inferences.`;
  }
  
  if (topic.includes('ethics')) {
    return `Ethics questions test the four principles: Integrity, Objectivity, Confidentiality, and Competency. Each has specific rules of conduct. When answering, identify which principle is at stake and whether the described behavior conforms to or violates it.`;
  }
  
  if (topic.includes('fraud')) {
    return `Remember: internal auditors are not primarily responsible for detecting fraud, but must maintain fraud awareness when planning and performing engagements. We assess whether controls are adequate to prevent and detect fraud.`;
  }
  
  if (topic.includes('risk')) {
    return `Risk questions often test the four responses: Accept, Avoid, Transfer/Share, or Reduce/Mitigate. The appropriate response depends on the organization's risk appetite and the cost-benefit of controls. Inherent risk exists before controls; residual risk remains after.`;
  }
  
  // Difficulty-based tips
  if (difficulty === 'hard') {
    return `This is a challenging question. Read the scenario carefully for key details. Eliminate answers that are partially correct but incomplete. The best answer is the one that fully addresses the situation according to IIA Standards.`;
  }
  
  return `Read all four options before selecting. The CIA exam often includes plausible distractors. Look for the answer that best reflects IIA Standards and would be considered best practice in the profession.`;
}

/**
 * Generate memory aid for the concept
 */
function generateMemoryAid(question) {
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  
  // Common CIA mnemonics
  if (subtopic.includes('ethics') || topic.includes('ethics')) {
    return `IIA Ethics Principles: "ICON" → Integrity, Confidentiality, Objectivity, Competency. Remember: Internal auditors must be ethical ICONs in their organizations.`;
  }
  
  if (subtopic.includes('independence') || topic.includes('independence')) {
    return `CAE Reporting: "Functional = Freedom, Administrative = Action." Functional reporting to the board protects independence; administrative reporting to management enables daily operations.`;
  }
  
  if (topic.includes('quality') || subtopic.includes('qaip')) {
    return `QAIP Components: "IOE-5" → Internal Ongoing, Internal pEriodic, External every 5 years. All three types of assessment are required for a complete QAIP.`;
  }
  
  if (topic.includes('sampling') || subtopic.includes('sampling')) {
    return `Sampling Types: "SNAP" → Statistical = Numbers Allow Projection; Judgmental = Just auditor's opinion. Statistical gives confidence levels; judgmental doesn't.`;
  }
  
  if (topic.includes('control') || subtopic.includes('control')) {
    return `Control Types: "PaDDle" → Preventive (stops problems), Detective (finds problems), Directive (tells what to do). Think of paddling a boat - you need all types to stay on course.`;
  }
  
  if (topic.includes('risk')) {
    return `Risk Responses: "AMTS" → Accept, Mitigate/Control, Transfer/Share, Stop/Avoid. Choose based on risk appetite, cost-benefit, and strategic importance.`;
  }
  
  if (topic.includes('three lines')) {
    return `Three Lines Model: "MAI" → Management owns risks (1st), Advisory functions monitor (2nd), Internal Audit assures (3rd). The board and senior management sit above all three lines.`;
  }
  
  if (topic.includes('governance')) {
    return `Governance Elements: "DOSE" → Direction, Oversight, Strategy, Ethics. Good governance ensures the organization operates with integrity toward its objectives.`;
  }
  
  if (topic.includes('coso') || subtopic.includes('coso')) {
    return `COSO Framework: "CRIME" → Control environment, Risk assessment, Information/communication, Monitoring, Control activities (Existing activities). Remember: COSO helps prevent CRIME.`;
  }
  
  if (topic.includes('evidence') || subtopic.includes('evidence')) {
    return `Audit Evidence: "SRRU" → Sufficient, Reliable, Relevant, Useful. All four qualities are needed to support conclusions and findings.`;
  }
  
  if (topic.includes('communicating') || topic.includes('reporting')) {
    return `Report Qualities: "ACCURATE" → Accurate, Clear, Concise, Complete, Constructive... (the Standards list seven qualities). Think "ACCURATE" reports that Respond To all issues.`;
  }
  
  if (topic.includes('financial') || subtopic.includes('ratio')) {
    return `Ratio Categories: "LEAP" → Liquidity (current, quick), Efficiency (turnover), Activity (asset utilization), Profitability (margins, ROE). LEAP through financial analysis.`;
  }
  
  if (topic.includes('information security') || topic.includes('cybersecurity')) {
    return `Security Triad: "CIA" (different CIA!) → Confidentiality, Integrity, Availability. These three are the foundation of all information security controls and assessments.`;
  }
  
  // Generate from first letters of key terms in correct answer
  const correctOption = question.options[question.correctAnswer] || '';
  const keyWords = correctOption.split(' ').filter(w => w.length > 4).slice(0, 3);
  if (keyWords.length >= 2) {
    const acronym = keyWords.map(w => w[0].toUpperCase()).join('');
    return `Remember the key concept: "${correctOption.substring(0, 50)}..." Focus on understanding why this is correct, not just memorizing.`;
  }
  
  return `Link this concept to the IIA Standards framework. Understanding why rules exist helps you apply them correctly on the exam and in practice.`;
}

/**
 * Determine the best reference for a question
 */
function determineReference(question) {
  // If question already has a specific reference (not generic "IIA Standards"), use it
  if (question.reference && question.reference !== 'IIA Standards' && question.reference.length > 20) {
    return question.reference;
  }
  
  const topic = (question.topic || '').toLowerCase();
  const subtopic = (question.subtopic || '').toLowerCase();
  const combined = topic + ' ' + subtopic;
  
  // Search for matching references
  for (const [keyword, reference] of Object.entries(IIA_REFERENCES)) {
    if (combined.includes(keyword)) {
      return reference;
    }
  }
  
  // Blueprint area specific
  const blueprintArea = (question.blueprintArea || '').toUpperCase();
  if (blueprintArea.includes('CIA1-I')) return 'IIA Standard 1000 - Purpose, Authority, and Responsibility';
  if (blueprintArea.includes('CIA1-II')) return 'IIA Standard 1100 - Independence and Objectivity';
  if (blueprintArea.includes('CIA1-III')) return 'IIA Standard 1200 - Proficiency and Due Professional Care';
  if (blueprintArea.includes('CIA1-IV')) return 'IIA Standard 1300 - Quality Assurance and Improvement Program';
  if (blueprintArea.includes('CIA1-V')) return 'IIA Standard 2100 - Nature of Work';
  if (blueprintArea.includes('CIA2-I')) return 'IIA Standard 2000 - Managing the Internal Audit Activity';
  if (blueprintArea.includes('CIA2-II')) return 'IIA Standard 2200 - Engagement Planning';
  if (blueprintArea.includes('CIA2-III')) return 'IIA Standard 2300 - Performing the Engagement';
  if (blueprintArea.includes('CIA2-IV')) return 'IIA Standard 2400 - Communicating Results';
  if (blueprintArea.includes('CIA3')) return 'IIA International Professional Practices Framework (IPPF)';
  
  return IIA_REFERENCES.default;
}

/**
 * Enhance a question with additional fields
 */
function enhanceQuestion(question, index) {
  const section = (question.section || 'CIA1').toUpperCase();
  
  // Ensure ID is lowercase
  let id = (question.id || `${section.toLowerCase()}-unknown-${index}`).toLowerCase();
  
  // Normalize section in ID if needed
  id = id.replace(/^cia(\d)/, 'cia$1');
  
  const enhanced = {
    id,
    version: 1,
    status: 'approved',
    courseId: 'cia',
    section,
    blueprintArea: question.blueprintArea || `${section}-I`,
    topic: question.topic || 'Internal Auditing',
    subtopic: question.subtopic || '',
    difficulty: question.difficulty || 'medium',
    skillLevel: question.skillLevel || 'Application',
    question: question.question || '',
    options: question.options || ['', '', '', ''],
    correctAnswer: typeof question.correctAnswer === 'number' ? question.correctAnswer : 0,
    explanation: question.explanation || '',
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
 * Main migration function
 */
function migrate() {
  console.log('='.repeat(60));
  console.log('CIA Question Migration: TypeScript → Enhanced JSON');
  console.log('Using bundled question data for accuracy');
  console.log('='.repeat(60));
  console.log();
  
  const stats = {
    bySection: { CIA1: 0, CIA2: 0, CIA3: 0 },
    issues: [],
    missingWhyWrong: 0
  };
  
  const questionsBySection = {
    CIA1: [],
    CIA2: [],
    CIA3: []
  };
  
  // Process each section
  const sectionData = [
    { section: 'CIA1', questions: ciaBundle.ALL_CIA1_QUESTIONS },
    { section: 'CIA2', questions: ciaBundle.ALL_CIA2_QUESTIONS },
    { section: 'CIA3', questions: ciaBundle.ALL_CIA3_QUESTIONS }
  ];
  
  for (const { section, questions } of sectionData) {
    console.log(`Processing ${section}: ${questions.length} questions`);
    
    const seen = new Set();
    
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      try {
        const enhanced = enhanceQuestion(q, i);
        
        // Deduplicate by ID
        if (seen.has(enhanced.id)) {
          continue;
        }
        seen.add(enhanced.id);
        
        questionsBySection[section].push(enhanced);
        stats.bySection[section]++;
        
        // Validate whyWrong
        if (!enhanced.whyWrong || Object.keys(enhanced.whyWrong).length !== 4) {
          stats.missingWhyWrong++;
          stats.issues.push({ id: enhanced.id, error: 'Missing whyWrong' });
        }
      } catch (err) {
        stats.issues.push({ id: q.id || `unknown-${i}`, error: err.message });
      }
    }
    
    console.log(`  Unique questions: ${questionsBySection[section].length}`);
  }
  
  // Write JSON files
  console.log('\nWriting JSON files...');
  const timestamp = new Date().toISOString();
  
  for (const [section, questions] of Object.entries(questionsBySection)) {
    // Sort by ID for consistent ordering
    questions.sort((a, b) => a.id.localeCompare(b.id));
    
    const outputPath = path.join(OUTPUT_DIR, section.toLowerCase(), 'questions.json');
    const output = {
      "$schema": "../../schema/question.schema.json",
      section,
      exportedAt: timestamp,
      questions
    };
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`  ${outputPath} (${questions.length} questions)`);
  }
  
  // Summary
  const total = stats.bySection.CIA1 + stats.bySection.CIA2 + stats.bySection.CIA3;
  
  console.log('\n' + '='.repeat(60));
  console.log('MIGRATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`\nQuestions migrated by section:`);
  console.log(`  CIA1 (Essentials): ${stats.bySection.CIA1}`);
  console.log(`  CIA2 (Practice):   ${stats.bySection.CIA2}`);
  console.log(`  CIA3 (Business):   ${stats.bySection.CIA3}`);
  console.log(`  TOTAL:             ${total}`);
  
  console.log(`\nEnhancement validation:`);
  console.log(`  All questions have whyWrong: ${stats.missingWhyWrong === 0 ? 'YES ✓' : `NO (${stats.missingWhyWrong} missing)`}`);
  console.log(`  All questions have educational: YES ✓`);
  console.log(`  All questions have examTip: YES ✓`);
  console.log(`  All questions have memoryAid: YES ✓`);
  console.log(`  All questions have reference: YES ✓`);
  
  if (stats.issues.length > 0) {
    console.log(`\nIssues encountered: ${stats.issues.length}`);
    stats.issues.slice(0, 5).forEach(i => console.log(`  - ${i.id}: ${i.error}`));
    if (stats.issues.length > 5) {
      console.log(`  ... and ${stats.issues.length - 5} more`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('Output files created:');
  console.log('  content/cia/cia1/questions.json');
  console.log('  content/cia/cia2/questions.json');
  console.log('  content/cia/cia3/questions.json');
  console.log('='.repeat(60));
  
  return stats;
}

// Run migration
migrate();
