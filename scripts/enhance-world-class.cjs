#!/usr/bin/env node
/**
 * World-Class Question Enhancement Pipeline
 * 
 * Adds missing fields to make questions best-in-class:
 * - authorityRef: Specific standard citations (ASC 606, IRC §162, etc.)
 * - commonMistake: Why each distractor is tempting
 * - timeEstimate: Expected seconds to solve
 * - relatedTopics: Related blueprint topics for cross-learning
 * - Expands short questions with realistic scenarios
 * 
 * Usage:
 *   node scripts/enhance-world-class.cjs --exam cpa --section far
 *   node scripts/enhance-world-class.cjs --exam cpa           # All CPA sections
 *   node scripts/enhance-world-class.cjs --all                # All exams
 *   node scripts/enhance-world-class.cjs --resume             # Resume from progress
 *   node scripts/enhance-world-class.cjs --dry-run            # Preview only
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const BATCH_SIZE = 5; // Questions per API call (smaller for complex prompts)
const DELAY_MS = 2000; // Between API calls
const PROGRESS_FILE = 'content/.enhance-progress.json';

// Authority reference patterns per exam
const AUTHORITY_PATTERNS = {
  cpa: {
    far: ['ASC', 'FASB', 'GAAP', 'GASB', 'SFAS'],
    aud: ['AU-C', 'PCAOB', 'AICPA', 'SAS', 'GAAS', 'AT-C', 'SSARS'],
    reg: ['IRC §', 'Treasury Reg', 'Circular 230', 'UCC', 'AICPA SSTS'],
    bar: ['ASC', 'FASB', 'GASB'],
    isc: ['COBIT', 'NIST', 'SOC', 'COSO', 'AICPA TSC'],
    tcp: ['IRC §', 'Treasury Reg', 'Rev. Proc.', 'Rev. Rul.'],
  },
  ea: {
    see1: ['IRC §', 'Pub. 17', 'Form 1040', 'Treasury Reg'],
    see2: ['IRC §', 'Pub. 334', 'Form 1065', 'Form 1120', 'Treasury Reg'],
    see3: ['Circular 230', 'IRC §', 'Form 2848', 'PTIN'],
  },
  cma: {
    cma1: ['IMA', 'COSO', 'FASB', 'GAAP'],
    cma2: ['IMA', 'COSO', 'NPV', 'IRR'],
  },
  cia: {
    cia1: ['IIA Standards', 'IPPF', 'Code of Ethics'],
    cia2: ['IIA Standards', 'IPPF'],
    cia3: ['COSO', 'COBIT', 'NIST'],
  },
  cisa: {
    cisa1: ['ISACA', 'COBIT', 'ITAF'],
    cisa2: ['COBIT', 'ITIL', 'ISO 27001'],
    cisa3: ['SDLC', 'Agile', 'DevOps'],
    cisa4: ['ITIL', 'BCP', 'DRP'],
    cisa5: ['NIST', 'ISO 27001', 'COBIT'],
  },
  cfp: {
    'CFP-PCR': ['CFP Board', 'Code of Ethics', 'Standards of Conduct'],
    'CFP-GEN': ['CFP Board'],
    'CFP-RISK': ['State Insurance Law', 'HIPAA'],
    'CFP-INV': ['SEC', 'FINRA', 'Investment Company Act'],
    'CFP-TAX': ['IRC §', 'Treasury Reg', 'Pub. 17'],
    'CFP-RET': ['ERISA', 'IRC §', 'SSA'],
    'CFP-EST': ['IRC §', 'State law', 'UPC'],
    'CFP-PSY': ['CFP Board'],
  },
};

// Time estimates by difficulty and type
const TIME_ESTIMATES = {
  easy: { conceptual: 45, calculation: 60, scenario: 75 },
  medium: { conceptual: 60, calculation: 90, scenario: 120 },
  hard: { conceptual: 90, calculation: 120, scenario: 150 },
};

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return { completed: {}, lastRun: null };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// ============================================================================
// GEMINI API
// ============================================================================

async function callGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 4000,
        },
      }),
    }
  );
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${text}`);
  }
  
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// ============================================================================
// ENHANCEMENT LOGIC
// ============================================================================

async function enhanceQuestions(questions, exam, section) {
  const authorityHints = AUTHORITY_PATTERNS[exam]?.[section] || AUTHORITY_PATTERNS[exam]?.[section.toLowerCase()] || [];
  
  const questionsText = questions.map((q, i) => {
    const isShort = q.question.length < 100;
    return `
Q${i + 1}:
ID: ${q.id}
Topic: ${q.topic}
Difficulty: ${q.difficulty}
Question: ${q.question}
Options: ${q.options?.map((o, j) => `${j}) ${o}`).join(' | ')}
Correct: ${q.correctAnswer}
Current Explanation: ${(q.explanation || '').substring(0, 200)}...
IsShort: ${isShort}
`;
  }).join('\n---\n');

  const prompt = `You are an expert exam content developer. Enhance these ${exam.toUpperCase()} ${section.toUpperCase()} questions to be WORLD-CLASS.

For EACH question, provide:
1. authorityRef: Specific authoritative citation (e.g., "ASC 606-10-25", "IRC §162(a)", "AU-C 315"). Use standards like: ${authorityHints.join(', ')}
2. commonMistake: 1-2 sentences explaining WHY each distractor is tempting. Start with "Many candidates..." or "A common trap is..."
3. timeEstimate: Estimated seconds to solve (45-150 based on difficulty/complexity)
4. relatedTopics: Array of 2-4 related blueprint topics from this section
5. expandedQuestion: ONLY if question is marked IsShort=true, rewrite with a realistic scenario (company name, specific amounts, context). Otherwise leave blank.

QUESTIONS:
${questionsText}

Respond in JSON format:
{
  "enhancements": [
    {
      "qIndex": 0,
      "authorityRef": "ASC 606-10-25-23",
      "commonMistake": "Many candidates confuse...",
      "timeEstimate": 90,
      "relatedTopics": ["Topic A", "Topic B"],
      "expandedQuestion": "Acme Corp entered into..." or ""
    },
    ...
  ]
}

Be specific and accurate. Use real standard citations. Make commonMistake explanatory and educational.`;

  const response = await callGemini(prompt);
  
  // Parse JSON from response
  const jsonMatch = response.match(/\{[\s\S]*"enhancements"[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON in response');
  }
  
  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return parsed.enhancements || [];
  } catch (e) {
    throw new Error(`JSON parse error: ${e.message}`);
  }
}

// ============================================================================
// PROCESSING
// ============================================================================

async function processSection(exam, section, dryRun = false, progress = {}) {
  const filePath = `content/${exam}/${section}/questions.json`;
  if (!fs.existsSync(filePath)) {
    console.log(`  Skipping ${section} - file not found`);
    return { processed: 0, enhanced: 0 };
  }
  
  const progressKey = `${exam}/${section}`;
  const startIndex = progress.completed?.[progressKey] || 0;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const questions = data.questions;
  
  if (startIndex >= questions.length) {
    console.log(`  ${section.toUpperCase()}: Already completed`);
    return { processed: 0, enhanced: 0 };
  }
  
  console.log(`  Processing ${section.toUpperCase()}: ${questions.length} questions (starting at ${startIndex})`);
  
  let enhanced = 0;
  let errors = 0;
  
  // Process in batches
  for (let i = startIndex; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(questions.length / BATCH_SIZE);
    
    process.stdout.write(`    Batch ${batchNum}/${totalBatches}...`);
    
    try {
      const enhancements = await enhanceQuestions(batch, exam, section);
      
      for (const enh of enhancements) {
        const absIndex = i + (enh.qIndex || 0);
        const q = questions[absIndex];
        if (!q) continue;
        
        let changed = false;
        
        // Add authorityRef if not present or generic
        if (enh.authorityRef && !q.authorityRef) {
          q.authorityRef = enh.authorityRef;
          changed = true;
        }
        
        // Add commonMistake
        if (enh.commonMistake && !q.commonMistake) {
          q.commonMistake = enh.commonMistake;
          changed = true;
        }
        
        // Add timeEstimate
        if (enh.timeEstimate && !q.timeEstimate) {
          q.timeEstimate = enh.timeEstimate;
          changed = true;
        }
        
        // Add relatedTopics
        if (enh.relatedTopics?.length > 0 && !q.relatedTopics) {
          q.relatedTopics = enh.relatedTopics;
          changed = true;
        }
        
        // Expand short questions
        if (enh.expandedQuestion && enh.expandedQuestion.length > q.question.length) {
          q.question = enh.expandedQuestion;
          changed = true;
        }
        
        if (changed) enhanced++;
      }
      
      console.log(` enhanced ${enhancements.length}`);
      
      // Save progress after each batch
      if (!dryRun) {
        progress.completed = progress.completed || {};
        progress.completed[progressKey] = i + BATCH_SIZE;
        progress.lastRun = new Date().toISOString();
        saveProgress(progress);
      }
      
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
      errors++;
      if (errors > 5) {
        console.log('  Too many errors, stopping section');
        break;
      }
    }
    
    // Rate limiting
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
  
  if (!dryRun && enhanced > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    // Mark section complete
    progress.completed[progressKey] = questions.length;
    saveProgress(progress);
  }
  
  return { processed: questions.length, enhanced };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const examFilter = args.includes('--exam') ? args[args.indexOf('--exam') + 1]?.toLowerCase() : null;
  const sectionFilter = args.includes('--section') ? args[args.indexOf('--section') + 1]?.toLowerCase() : null;
  const doAll = args.includes('--all');
  const resume = args.includes('--resume');
  const dryRun = args.includes('--dry-run');
  
  if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY or VITE_GEMINI_API_KEY environment variable required');
    process.exit(1);
  }
  
  console.log('=== World-Class Question Enhancement ===');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Resume: ${resume ? 'Yes' : 'No'}`);
  console.log('');
  
  const progress = resume ? loadProgress() : { completed: {}, lastRun: null };
  
  const exams = doAll || !examFilter 
    ? ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp']
    : [examFilter];
  
  let totalProcessed = 0;
  let totalEnhanced = 0;
  
  for (const exam of exams) {
    const examDir = `content/${exam}`;
    if (!fs.existsSync(examDir)) {
      console.log(`Skipping ${exam} - directory not found`);
      continue;
    }
    
    console.log(`\n${exam.toUpperCase()}:`);
    
    const sections = sectionFilter 
      ? [sectionFilter]
      : fs.readdirSync(examDir).filter(d => 
          fs.statSync(path.join(examDir, d)).isDirectory()
        );
    
    for (const section of sections) {
      const result = await processSection(exam, section, dryRun, progress);
      totalProcessed += result.processed;
      totalEnhanced += result.enhanced;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`Total processed: ${totalProcessed} questions`);
  console.log(`Total enhanced: ${totalEnhanced} fields added`);
  
  if (dryRun) {
    console.log('\n(Dry run - no files modified)');
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
