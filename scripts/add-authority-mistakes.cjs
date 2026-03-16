#!/usr/bin/env node
/**
 * Add Authority References and Common Mistake Explanations
 * 
 * Two highest-impact enhancements:
 * 1. authorityRef: "ASC 606-10-25", "IRC §162(a)", etc.
 * 2. commonMistake: "Many candidates confuse..." explanations
 * 
 * Usage:
 *   node scripts/add-authority-mistakes.cjs --exam cpa
 *   node scripts/add-authority-mistakes.cjs --all
 *   node scripts/add-authority-mistakes.cjs --resume
 */

const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const BATCH_SIZE = 10;
const DELAY_MS = 1500;
const PROGRESS_FILE = 'content/.authority-progress.json';

// Authority standards by exam/section
const STANDARDS = {
  cpa: {
    far: 'ASC (Accounting Standards Codification), FASB standards, GASB standards. Examples: ASC 606-10-25, ASC 842-20-25, GASB 68',
    aud: 'AU-C sections, PCAOB standards, AICPA standards. Examples: AU-C 315.05, PCAOB AS 2201, AT-C 205',
    reg: 'IRC sections, Treasury Regulations, Circular 230. Examples: IRC §162(a), Treas. Reg. §1.162-1, IRC §1031',
    bar: 'ASC sections for business combinations, derivatives, foreign currency. Examples: ASC 805-10, ASC 815, ASC 830',
    isc: 'COBIT, NIST, AICPA TSC, SOC standards. Examples: COBIT 2019, NIST 800-53, AICPA TSC CC6.1',
    tcp: 'IRC sections for tax planning, estate/gift tax. Examples: IRC §267, IRC §2503, IRC §2010',
  },
  ea: {
    see1: 'IRC sections, IRS Publications, Forms. Examples: IRC §61, IRC §162, Pub. 17, Form 1040',
    see2: 'IRC sections for businesses, Forms. Examples: IRC §179, IRC §701, Form 1065, Form 1120-S',
    see3: 'Circular 230, IRC penalty sections. Examples: Circular 230 §10.22, IRC §6662, IRC §6694',
  },
  cma: {
    cma1: 'FASB standards, IMA guidance, COSO framework. Examples: ASC 280, COSO ERM, IMA Statement 1A',
    cma2: 'IMA ethical standards, COSO, financial analysis frameworks. Examples: IMA Statement of Ethical Professional Practice',
  },
  cia: {
    cia1: 'IIA International Standards, IPPF. Examples: IIA Standard 1000, Standard 1100, Standard 1200',
    cia2: 'IIA Standards for engagement. Examples: Standard 2000, Standard 2100, Standard 2300',
    cia3: 'COSO, COBIT, industry frameworks. Examples: COSO Internal Control, COBIT 2019, NIST CSF',
  },
  cisa: {
    cisa1: 'ISACA standards, ITAF. Examples: ITAF 2200, ISACA Audit Standard',
    cisa2: 'COBIT, ITIL, ISO standards. Examples: COBIT 2019 APO, ITIL 4, ISO 27001',
    cisa3: 'SDLC, Agile frameworks. Examples: IEEE 12207, NIST SDLC, SAFe',
    cisa4: 'ITIL, BCP/DRP standards. Examples: ITIL Service Operation, ISO 22301, NIST 800-34',
    cisa5: 'NIST, ISO security standards. Examples: NIST 800-53, ISO 27001, COBIT DSS05',
  },
  cfp: {
    'CFP-PCR': 'CFP Board Standards, Code of Ethics. Examples: CFP Board Code of Ethics Rule 1.1, Standards of Conduct',
    'CFP-GEN': 'CFP Board Practice Standards. Examples: CFP Board Practice Standard 400-1',
    'CFP-RISK': 'State insurance law, NAIC model acts. Examples: HIPAA, State Insurance Code',
    'CFP-INV': 'SEC rules, FINRA regulations. Examples: SEC Rule 10b-5, Securities Act of 1933 §5',
    'CFP-TAX': 'IRC sections. Examples: IRC §61, IRC §162, IRC §401(k)',
    'CFP-RET': 'ERISA, IRC retirement sections. Examples: ERISA §404, IRC §401, IRC §408',
    'CFP-EST': 'IRC estate/gift, state law. Examples: IRC §2001, IRC §2503, Uniform Probate Code',
    'CFP-PSY': 'CFP Board Practice Standards. Examples: CFP Board Code of Ethics',
  },
};

// ============================================================================
// PROGRESS
// ============================================================================

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return { completed: {} };
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
          temperature: 0.2,
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
  const standardsHint = STANDARDS[exam]?.[section] || STANDARDS[exam]?.[section.toLowerCase()] || '';
  
  const questionsText = questions.map((q, i) => `
Q${i + 1}:
Topic: ${q.topic}
Question: ${q.question.substring(0, 300)}${q.question.length > 300 ? '...' : ''}
Options: A) ${q.options[0]} | B) ${q.options[1]} | C) ${q.options[2]} | D) ${q.options[3]}
Correct: ${['A','B','C','D'][q.correctAnswer]}
WhyWrong Summary: ${Object.entries(q.whyWrong || {}).slice(0, 2).map(([k,v]) => v?.substring(0, 50)).join('; ')}
`).join('\n---\n');

  const prompt = `You are an expert ${exam.toUpperCase()} exam content specialist. Add authoritative references and common mistake explanations.

STANDARDS FOR THIS SECTION:
${standardsHint}

For EACH question provide:

1. authorityRef: The SPECIFIC authoritative standard being tested. Be precise (e.g., "ASC 606-10-25" not just "ASC 606"). If multiple apply, list the primary one.

2. commonMistake: Explain WHY each wrong answer is tempting. Start with phrases like:
   - "Many candidates confuse..."
   - "A common trap is..."
   - "Test-takers often incorrectly..."
   - "The exam exploits the misconception that..."
   This should be 1-3 sentences explaining the psychology of the distractors.

QUESTIONS:
${questionsText}

Respond in JSON:
{
  "enhancements": [
    {
      "qIndex": 0,
      "authorityRef": "ASC 606-10-25-23",
      "commonMistake": "Many candidates confuse the point of transfer with the point of payment. The exam tests whether you understand that control, not cash receipt, triggers revenue recognition."
    },
    ...
  ]
}

Be SPECIFIC with citations. Make commonMistake educational and insightful.`;

  const response = await callGemini(prompt);
  
  const jsonMatch = response.match(/\{[\s\S]*"enhancements"[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON in response');
  }
  
  return JSON.parse(jsonMatch[0]).enhancements || [];
}

// ============================================================================
// PROCESSING
// ============================================================================

async function processSection(exam, section, progress) {
  const filePath = `content/${exam}/${section}/questions.json`;
  if (!fs.existsSync(filePath)) {
    return { processed: 0, enhanced: 0 };
  }
  
  const progressKey = `${exam}/${section}`;
  const startIndex = progress.completed?.[progressKey] || 0;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const questions = data.questions;
  
  // Filter to questions needing enhancement
  const needsEnhancement = questions.filter(q => !q.authorityRef || !q.commonMistake);
  
  if (startIndex >= questions.length || needsEnhancement.length === 0) {
    console.log(`  ${section.toUpperCase()}: Already complete or no work needed`);
    return { processed: 0, enhanced: 0 };
  }
  
  console.log(`  ${section.toUpperCase()}: ${questions.length} questions (${needsEnhancement.length} need enhancement)`);
  
  let enhanced = 0;
  
  for (let i = startIndex; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(questions.length / BATCH_SIZE);
    
    // Skip batch if all questions already have both fields
    const batchNeedsWork = batch.some(q => !q.authorityRef || !q.commonMistake);
    if (!batchNeedsWork) {
      continue;
    }
    
    process.stdout.write(`    Batch ${batchNum}/${totalBatches}...`);
    
    try {
      const enhancements = await enhanceQuestions(batch, exam, section);
      
      for (const enh of enhancements) {
        const absIndex = i + (enh.qIndex || 0);
        const q = questions[absIndex];
        if (!q) continue;
        
        if (enh.authorityRef && !q.authorityRef) {
          q.authorityRef = enh.authorityRef;
          enhanced++;
        }
        
        if (enh.commonMistake && !q.commonMistake) {
          q.commonMistake = enh.commonMistake;
          enhanced++;
        }
      }
      
      console.log(` added ${enhancements.length * 2} fields`);
      
      // Save progress
      progress.completed[progressKey] = i + BATCH_SIZE;
      saveProgress(progress);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
    }
    
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
  
  // Mark complete
  progress.completed[progressKey] = questions.length;
  saveProgress(progress);
  
  return { processed: questions.length, enhanced };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const examFilter = args.includes('--exam') ? args[args.indexOf('--exam') + 1]?.toLowerCase() : null;
  const doAll = args.includes('--all');
  const resume = args.includes('--resume');
  
  if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY required');
    process.exit(1);
  }
  
  console.log('=== Add Authority References & Common Mistakes ===');
  console.log(`Resume: ${resume ? 'Yes' : 'No'}\n`);
  
  const progress = resume ? loadProgress() : { completed: {} };
  
  const exams = doAll || !examFilter 
    ? ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp']
    : [examFilter];
  
  let totalEnhanced = 0;
  
  for (const exam of exams) {
    const examDir = `content/${exam}`;
    if (!fs.existsSync(examDir)) continue;
    
    console.log(`${exam.toUpperCase()}:`);
    
    const sections = fs.readdirSync(examDir).filter(d => 
      fs.statSync(path.join(examDir, d)).isDirectory()
    );
    
    for (const section of sections) {
      const result = await processSection(exam, section, progress);
      totalEnhanced += result.enhanced;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`Total fields added: ${totalEnhanced}`);
}

main().catch(console.error);
