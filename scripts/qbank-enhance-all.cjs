#!/usr/bin/env node
/**
 * qbank-enhance-all: Universal AI-enhanced UWorld-style explanations for ALL exams
 * 
 * Enhances questions in content/{exam}/{section}/questions.json with:
 * - whyWrong: Per-option explanations (correct + wrong)
 * - educational: Teaching the underlying concept
 * - examTip: Practical exam-day advice
 * - memoryAid: Mnemonic or memory trick
 * 
 * Usage:
 *   node scripts/qbank-enhance-all.cjs --status                   # Show progress
 *   node scripts/qbank-enhance-all.cjs ea                         # Enhance all EA sections
 *   node scripts/qbank-enhance-all.cjs cfp --section CFP-TAX      # Enhance one section
 *   node scripts/qbank-enhance-all.cjs ea --limit=50              # Process 50 per section
 *   node scripts/qbank-enhance-all.cjs ea --resume                # Resume from last run
 *   node scripts/qbank-enhance-all.cjs ea --dry-run               # Preview without writing
 *   node scripts/qbank-enhance-all.cjs ea --verbose               # Show per-question progress
 *   node scripts/qbank-enhance-all.cjs all                        # Enhance all exams
 * 
 * Environment:
 *   GEMINI_API_KEY or VITE_GEMINI_API_KEY must be set
 * 
 * Supports: EA, CMA, CIA, CISA, CFP (CPA already done via qbank-enhance.cjs)
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');

// Exam → section → JSON file path mapping
const EXAMS = {
  ea: {
    name: 'EA (Enrolled Agent)',
    context: 'IRS Enrolled Agent Special Enrollment Examination',
    sections: {
      SEE1: 'ea/see1/questions.json',
      SEE2: 'ea/see2/questions.json',
      SEE3: 'ea/see3/questions.json',
    },
    sectionDescriptions: {
      SEE1: 'Individual Taxation (filing status, income, deductions, credits)',
      SEE2: 'Business Taxation (entities, partnerships, S-corps, estates & trusts)',
      SEE3: 'Representation, Practices, and Procedures (Circular 230, ethics, IRS procedures)',
    },
  },
  cma: {
    name: 'CMA (Certified Management Accountant)',
    context: 'IMA Certified Management Accountant examination',
    sections: {
      CMA1: 'cma/cma1/questions.json',
      CMA2: 'cma/cma2/questions.json',
    },
    sectionDescriptions: {
      CMA1: 'Financial Planning, Performance, and Analytics (external reporting, budgeting, cost mgmt, internal controls)',
      CMA2: 'Strategic Financial Management (financial analysis, corporate finance, decision analysis, risk, ethics)',
    },
  },
  cia: {
    name: 'CIA (Certified Internal Auditor)',
    context: 'IIA Certified Internal Auditor examination (GIAS 2024 standards)',
    sections: {
      CIA1: 'cia/cia1/questions.json',
      CIA2: 'cia/cia2/questions.json',
      CIA3: 'cia/cia3/questions.json',
    },
    sectionDescriptions: {
      CIA1: 'Essentials of Internal Auditing (mission, ethics, IPPF framework, independence)',
      CIA2: 'Practice of Internal Auditing (engagement planning, performing, communicating, monitoring)',
      CIA3: 'Business Knowledge for Internal Auditing (governance, risk, controls, IT, financial acumen)',
    },
  },
  cisa: {
    name: 'CISA (Certified Information Systems Auditor)',
    context: 'ISACA Certified Information Systems Auditor examination',
    sections: {
      CISA1: 'cisa/cisa1/questions.json',
      CISA2: 'cisa/cisa2/questions.json',
      CISA3: 'cisa/cisa3/questions.json',
      CISA4: 'cisa/cisa4/questions.json',
      CISA5: 'cisa/cisa5/questions.json',
    },
    sectionDescriptions: {
      CISA1: 'Information Systems Auditing Process (audit standards, planning, execution, reporting)',
      CISA2: 'Governance and Management of IT (IT governance frameworks, strategic alignment)',
      CISA3: 'Information Systems Acquisition, Development, and Implementation',
      CISA4: 'Information Systems Operations and Business Resilience (BCP, DRP)',
      CISA5: 'Protection of Information Assets (security, access controls, encryption)',
    },
  },
  cfp: {
    name: 'CFP (Certified Financial Planner)',
    context: 'CFP Board Certified Financial Planner examination',
    sections: {
      'CFP-EST': 'cfp/CFP-EST/questions.json',
      'CFP-GEN': 'cfp/CFP-GEN/questions.json',
      'CFP-INV': 'cfp/CFP-INV/questions.json',
      'CFP-PCR': 'cfp/CFP-PCR/questions.json',
      'CFP-PSY': 'cfp/CFP-PSY/questions.json',
      'CFP-RET': 'cfp/CFP-RET/questions.json',
      'CFP-RISK': 'cfp/CFP-RISK/questions.json',
      'CFP-TAX': 'cfp/CFP-TAX/questions.json',
    },
    sectionDescriptions: {
      'CFP-EST': 'Estate Planning (trusts, wills, gifting, estate tax)',
      'CFP-GEN': 'General Principles of Financial Planning (process, ethics, economics, financial statements)',
      'CFP-INV': 'Investment Planning (asset allocation, securities, portfolio management)',
      'CFP-PCR': 'Professional Conduct and Regulation (Code of Ethics, fiduciary duty, practice standards)',
      'CFP-PSY': 'Psychology of Financial Planning (behavioral finance, client communication)',
      'CFP-RET': 'Retirement Savings and Income Planning (qualified plans, Social Security, distributions)',
      'CFP-RISK': 'Risk Management and Insurance Planning (life, health, disability, liability)',
      'CFP-TAX': 'Tax Planning (individual, property, AMT, retirement tax strategies)',
    },
  },
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || (() => {
  try {
    const envPath = path.join(PROJECT_ROOT, '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const match = envContent.match(/VITE_GEMINI_API_KEY=(.+)/);
      return match ? match[1].trim() : null;
    }
    const envPath2 = path.join(PROJECT_ROOT, '.env');
    if (fs.existsSync(envPath2)) {
      const envContent = fs.readFileSync(envPath2, 'utf-8');
      const match = envContent.match(/VITE_GEMINI_API_KEY=(.+)/);
      return match ? match[1].trim() : null;
    }
  } catch (_) {}
  return null;
})();

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// ─── Argument parsing ───

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerbose = args.includes('--verbose');
const doResume = args.includes('--resume');
const showStatusOnly = args.includes('--status');
const limitArg = args.find(a => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : null;
const sectionFilter = (() => {
  const idx = args.indexOf('--section');
  return idx >= 0 ? args[idx + 1] : null;
})();

// Get exam arg (first non-flag arg)
const examArg = args.find(a => !a.startsWith('-'));

// ─── Progress tracking ───

function getProgressFile(exam) {
  return path.join(CONTENT_DIR, exam, '.enhance-progress.json');
}

function loadProgress(exam) {
  const progressFile = getProgressFile(exam);
  if (fs.existsSync(progressFile)) {
    return JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
  }
  return { enhanced: [], errors: [], lastRun: null, stats: {} };
}

function saveProgress(exam, progress) {
  progress.lastRun = new Date().toISOString();
  const progressFile = getProgressFile(exam);
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2), 'utf-8');
}

// ─── Quality detection ───

function needsEnhancement(question) {
  const ww = question.whyWrong;
  if (!ww || typeof ww !== 'object') return true;
  
  const vals = Object.values(ww);
  if (vals.length < 3) return true;
  
  // Check for generic/placeholder whyWrong (80+ chars for quality)
  const hasGeneric = vals.some(v =>
    (typeof v === 'string' && v.includes('does not correctly')) ||
    (typeof v === 'string' && v.length < 80)
  );
  
  return hasGeneric;
}

// ─── AI prompt ───

function buildPrompt(question, examConfig, sectionId) {
  const optionLabels = ['A', 'B', 'C', 'D'];
  const correctLetter = optionLabels[question.correctAnswer];
  const sectionDesc = examConfig.sectionDescriptions[sectionId] || sectionId;
  
  return `You are a ${examConfig.name} exam expert creating UWorld-style explanations. This question is from the ${sectionId} section: ${sectionDesc}.

QUESTION:
${question.question}

OPTIONS:
A) ${question.options[0]}
B) ${question.options[1]}
C) ${question.options[2]}
D) ${question.options[3]}

CORRECT ANSWER: ${correctLetter}
TOPIC: ${question.topic || 'N/A'}
BLUEPRINT AREA: ${question.blueprintArea || 'N/A'}

EXISTING EXPLANATION:
${question.explanation}

Generate a JSON object with these fields:
{
  "whyWrong": {
    "0": "Why option A is ${question.correctAnswer === 0 ? 'CORRECT - explain the key concept and why this is the right answer' : 'WRONG - specific reason this option is incorrect for this question'}",
    "1": "Why option B is ${question.correctAnswer === 1 ? 'CORRECT - explain the key concept and why this is the right answer' : 'WRONG - specific reason this option is incorrect for this question'}",
    "2": "Why option C is ${question.correctAnswer === 2 ? 'CORRECT - explain the key concept and why this is the right answer' : 'WRONG - specific reason this option is incorrect for this question'}",
    "3": "Why option D is ${question.correctAnswer === 3 ? 'CORRECT - explain the key concept and why this is the right answer' : 'WRONG - specific reason this option is incorrect for this question'}"
  },
  "educational": "2-4 sentences teaching the underlying concept. Don't just restate the answer — explain WHY this rule/standard/concept exists and how it connects to broader exam topics.",
  "examTip": "One practical sentence the student should remember on exam day. Be specific to the ${examConfig.name} exam.",
  "memoryAid": "A mnemonic, acronym, or memorable phrase. Only include if genuinely helpful — omit if forced."
}

Requirements:
1. Each whyWrong entry: Start with "Why option X is CORRECT/WRONG - " then 1-3 specific sentences
2. Be technically accurate — reference specific standards, codes, or regulations where applicable
3. Make wrong answer explanations SPECIFIC to each option (never use generic "this is incorrect")
4. Educational note should teach, not just restate — connect to exam blueprint concepts
5. Exam tip should be actionable for the ${examConfig.name} exam specifically
6. Memory aid: only include if genuinely helpful, not forced

Return ONLY valid JSON, no markdown formatting.`;
}

// ─── Gemini API ───

async function callGemini(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1500,
          },
        }),
      });

      if (response.status === 429) {
        const waitTime = Math.min(30000 * attempt, 120000);
        console.log(`   ⏳ Rate limited (429), waiting ${waitTime / 1000}s... (attempt ${attempt}/${retries})`);
        await sleep(waitTime);
        continue;
      }

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Gemini API error ${response.status}: ${error.substring(0, 200)}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('Empty response from Gemini');
      }

      // Parse JSON from response
      let jsonStr = text;
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }

      return JSON.parse(jsonStr.trim());
    } catch (error) {
      if (attempt === retries) throw error;
      if (error.message.includes('429')) {
        await sleep(30000 * attempt);
      } else {
        await sleep(2000);
      }
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Enhancement logic ───

async function enhanceQuestion(question, examConfig, sectionId) {
  const prompt = buildPrompt(question, examConfig, sectionId);
  const enhancement = await callGemini(prompt);

  // Validate structure
  if (!enhancement.whyWrong || typeof enhancement.whyWrong !== 'object') {
    throw new Error('Invalid enhancement: missing whyWrong');
  }

  return {
    ...question,
    whyWrong: enhancement.whyWrong,
    educational: enhancement.educational || question.educational,
    examTip: enhancement.examTip || question.examTip,
    memoryAid: enhancement.memoryAid || question.memoryAid,
    version: (question.version || 1) + 1,
  };
}

async function enhanceSection(exam, sectionId, examConfig, progress) {
  const jsonRelPath = examConfig.sections[sectionId];
  const jsonPath = path.join(CONTENT_DIR, jsonRelPath);

  if (!fs.existsSync(jsonPath)) {
    console.log(`   ⚠️  File not found: ${jsonRelPath}`);
    return { enhanced: 0, skipped: 0, errors: 0, total: 0 };
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const questions = data.questions || [];

  const alreadyEnhanced = new Set(progress.enhanced || []);

  // Find questions needing enhancement
  const toEnhance = questions.filter(q => {
    if (doResume && alreadyEnhanced.has(q.id)) return false;
    return needsEnhancement(q);
  });

  const processCount = limit ? Math.min(limit, toEnhance.length) : toEnhance.length;

  console.log(`   ${sectionId}: ${toEnhance.length} need enhancement, processing ${processCount} (of ${questions.length} total)`);

  if (processCount === 0) return { enhanced: 0, skipped: questions.length, errors: 0, total: questions.length };

  // Create backup
  const backupPath = jsonPath.replace('.json', `.backup-${Date.now()}.json`);
  if (!isDryRun) {
    fs.copyFileSync(jsonPath, backupPath);
  }

  let enhanced = 0;
  let errors = 0;

  for (let i = 0; i < processCount; i++) {
    const q = toEnhance[i];

    if (isVerbose) {
      console.log(`   🔄 [${i + 1}/${processCount}] ${q.id}`);
    } else if (i % 25 === 0 && i > 0) {
      console.log(`   ... ${i}/${processCount} done (${errors} errors)`);
    }

    try {
      const enhancedQ = await enhanceQuestion(q, examConfig, sectionId);

      // Update in array
      const idx = questions.findIndex(qq => qq.id === q.id);
      if (idx >= 0 && !isDryRun) {
        questions[idx] = enhancedQ;
      }

      progress.enhanced.push(q.id);
      enhanced++;

      // Rate limiting
      if (i < processCount - 1) {
        await sleep(1500);
      }

      // Periodic save (every 25 questions)
      if (enhanced % 25 === 0 && !isDryRun) {
        data.questions = questions;
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
        saveProgress(exam, progress);
        if (!isVerbose) {
          console.log(`   💾 Saved checkpoint: ${enhanced} enhanced`);
        }
      }

    } catch (error) {
      errors++;
      progress.errors.push({ id: q.id, section: sectionId, error: error.message, at: new Date().toISOString() });
      console.log(`   ❌ ${q.id}: ${error.message.substring(0, 100)}`);

      if (error.message.includes('429')) {
        console.log('   ⏳ Rate limited, waiting 60 seconds...');
        await sleep(60000);
      }
    }
  }

  // Final save
  if (!isDryRun && enhanced > 0) {
    data.questions = questions;
    data.lastEnhanced = new Date().toISOString();
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Clean up backup if fully successful
  if (!isDryRun && errors === 0 && fs.existsSync(backupPath)) {
    fs.unlinkSync(backupPath);
  }

  // Update section stats
  if (!progress.stats) progress.stats = {};
  progress.stats[sectionId] = {
    total: questions.length,
    enhanced,
    errors,
    remaining: toEnhance.length - enhanced,
    lastRun: new Date().toISOString(),
  };

  return { enhanced, skipped: questions.length - toEnhance.length, errors, total: questions.length };
}

// ─── Status display ───

function showStatus() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║          VoraPrep Question Enhancement Status               ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');

  for (const [examId, examConfig] of Object.entries(EXAMS)) {
    const progress = loadProgress(examId);
    console.log(`📚 ${examConfig.name}`);
    
    let examTotal = 0;
    let examNeedEnhance = 0;
    
    for (const [sectionId, relPath] of Object.entries(examConfig.sections)) {
      const jsonPath = path.join(CONTENT_DIR, relPath);
      if (!fs.existsSync(jsonPath)) {
        console.log(`   ${sectionId}: ❌ Not migrated`);
        continue;
      }
      
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      const questions = data.questions || [];
      const needEnhance = questions.filter(needsEnhancement).length;
      
      examTotal += questions.length;
      examNeedEnhance += needEnhance;
      
      const icon = needEnhance === 0 ? '✅' : needEnhance < questions.length / 2 ? '🔶' : '🔴';
      console.log(`   ${icon} ${sectionId}: ${questions.length} Qs, ${needEnhance} need enhancement`);
    }
    
    const pct = examTotal > 0 ? ((examTotal - examNeedEnhance) / examTotal * 100).toFixed(0) : 0;
    console.log(`   📊 ${examTotal} total, ${pct}% complete`);
    if (progress.lastRun) {
      console.log(`   🕐 Last run: ${progress.lastRun}`);
    }
    console.log('');
  }
}

// ─── Main ───

async function main() {
  if (showStatusOnly) {
    showStatus();
    return;
  }

  if (!examArg || examArg === '--help') {
    console.log('Usage: node scripts/qbank-enhance-all.cjs <exam|all> [options]');
    console.log('');
    console.log('Exams: ea, cma, cia, cisa, cfp, all');
    console.log('');
    console.log('Options:');
    console.log('  --status          Show enhancement progress');
    console.log('  --section <ID>    Enhance only one section (e.g., --section SEE1)');
    console.log('  --limit=N         Maximum questions per section');
    console.log('  --resume          Skip previously enhanced questions');
    console.log('  --dry-run         Preview without writing');
    console.log('  --verbose         Show per-question progress');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/qbank-enhance-all.cjs ea --verbose');
    console.log('  node scripts/qbank-enhance-all.cjs cfp --section CFP-TAX --limit=50');
    console.log('  node scripts/qbank-enhance-all.cjs all --resume');
    process.exit(0);
  }

  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not set');
    console.log('Set it: export GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env.local | cut -d"=" -f2)');
    process.exit(1);
  }

  // Determine exams to process
  let examsToProcess;
  if (examArg === 'all') {
    examsToProcess = Object.keys(EXAMS);
  } else {
    const examId = examArg.toLowerCase();
    if (!EXAMS[examId]) {
      console.error(`Unknown exam: ${examArg}. Valid: ea, cma, cia, cisa, cfp, all`);
      process.exit(1);
    }
    examsToProcess = [examId];
  }

  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║       VoraPrep AI Question Enhancement (All Exams)          ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');

  if (isDryRun) console.log('🔍 DRY RUN — No files will be modified\n');

  let grandTotal = { enhanced: 0, skipped: 0, errors: 0 };

  for (const examId of examsToProcess) {
    const examConfig = EXAMS[examId];
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📚 ${examConfig.name}`);
    console.log(`${'═'.repeat(60)}`);

    const progress = doResume ? loadProgress(examId) : { enhanced: [], errors: [], lastRun: null, stats: {} };

    // Get sections to process
    let sections = Object.keys(examConfig.sections);
    if (sectionFilter) {
      if (!examConfig.sections[sectionFilter]) {
        console.log(`   ⚠️  Unknown section: ${sectionFilter}. Available: ${sections.join(', ')}`);
        continue;
      }
      sections = [sectionFilter];
    }

    let examResult = { enhanced: 0, skipped: 0, errors: 0 };

    for (const sectionId of sections) {
      const result = await enhanceSection(examId, sectionId, examConfig, progress);
      examResult.enhanced += result.enhanced;
      examResult.skipped += result.skipped;
      examResult.errors += result.errors;
    }

    // Save final progress
    if (!isDryRun) {
      saveProgress(examId, progress);
    }

    console.log(`\n   📊 ${examConfig.name} Summary:`);
    console.log(`      Enhanced: ${examResult.enhanced}`);
    console.log(`      Already good: ${examResult.skipped}`);
    console.log(`      Errors: ${examResult.errors}`);

    grandTotal.enhanced += examResult.enhanced;
    grandTotal.skipped += examResult.skipped;
    grandTotal.errors += examResult.errors;
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log('🏁 Grand Total:');
  console.log(`   Enhanced: ${grandTotal.enhanced}`);
  console.log(`   Already good: ${grandTotal.skipped}`);
  console.log(`   Errors: ${grandTotal.errors}`);
  console.log(`${'═'.repeat(60)}\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
