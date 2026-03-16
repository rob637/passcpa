#!/usr/bin/env node
/**
 * Fix Question Bank Gaps
 * 
 * Fixes 4 identified gaps:
 * 1. CISA short explanations (~280 questions need expansion)
 * 2. EA authority/commonMistake gaps (~100 questions)
 * 3. CPA TCP authority/commonMistake gaps (~50 questions)
 * 4. CPA AUD authority/commonMistake gaps (~12 questions)
 * 
 * Usage:
 *   node scripts/fix-qbank-gaps.cjs
 */

const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const BATCH_SIZE = 10;
const DELAY_MS = 2000;
const LOG_FILE = '/tmp/fix-gaps.log';

function log(msg) {
  const ts = new Date().toISOString();
  const line = `[${ts}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callGemini(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 8000,
            },
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        if (response.status === 429 || response.status === 500) {
          log(`  Retry ${attempt}/${retries}: ${response.status}`);
          await sleep(5000 * attempt);
          continue;
        }
        throw new Error(`Gemini API error: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (e) {
      if (attempt === retries) throw e;
      log(`  Retry ${attempt}/${retries}: ${e.message}`);
      await sleep(3000 * attempt);
    }
  }
}

// ============================================================================
// FIX 1: Expand CISA Short Explanations
// ============================================================================

async function fixCISAShortExplanations() {
  log('=== FIX 1: CISA Short Explanations ===');
  
  const cisaSections = ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'];
  let totalFixed = 0;
  
  for (const section of cisaSections) {
    const filePath = path.join('content/cisa', section, 'questions.json');
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const shortExplanations = data.questions.filter(q => 
      !q.explanation || q.explanation.length < 100
    );
    
    if (shortExplanations.length === 0) {
      log(`  ${section}: No short explanations found`);
      continue;
    }
    
    log(`  ${section}: ${shortExplanations.length} short explanations to expand`);
    
    // Process in batches
    for (let i = 0; i < shortExplanations.length; i += BATCH_SIZE) {
      const batch = shortExplanations.slice(i, i + BATCH_SIZE);
      
      const prompt = `You are a CISA exam expert. Expand these short explanations into thorough, educational explanations (150-300 words each).

For each question, provide a comprehensive explanation that:
1. States why the correct answer is right
2. Explains the underlying concept
3. Connects to ISACA standards or frameworks where applicable

Questions:
${batch.map((q, idx) => `
Q${idx + 1}: ${q.question}
Options: A) ${q.options[0]} | B) ${q.options[1]} | C) ${q.options[2]} | D) ${q.options[3]}
Correct: ${['A','B','C','D'][q.correctAnswer]}
Current explanation: ${q.explanation || 'None'}
`).join('\n---\n')}

Respond in JSON:
{
  "expanded": [
    { "qIndex": 0, "explanation": "..." },
    ...
  ]
}`;

      try {
        const response = await callGemini(prompt);
        const jsonMatch = response.match(/\{[\s\S]*"expanded"[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          for (const item of result.expanded) {
            const q = batch[item.qIndex];
            const idx = data.questions.findIndex(x => x.id === q.id);
            if (idx >= 0 && item.explanation && item.explanation.length > 100) {
              data.questions[idx].explanation = item.explanation;
              totalFixed++;
            }
          }
        }
        log(`    Batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(shortExplanations.length/BATCH_SIZE)} expanded`);
      } catch (e) {
        log(`    ERROR: ${e.message}`);
      }
      
      await sleep(DELAY_MS);
    }
    
    // Save updated file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    log(`  ${section}: Saved`);
  }
  
  log(`FIX 1 Complete: ${totalFixed} explanations expanded`);
  return totalFixed;
}

// ============================================================================
// FIX 2-4: Fill Authority/CommonMistake Gaps
// ============================================================================

async function fixAuthorityGaps(exam, sections) {
  log(`=== Fixing ${exam.toUpperCase()} Authority/CommonMistake Gaps ===`);
  
  // Standards by exam/section
  const STANDARDS = {
    ea: {
      see1: 'IRC sections, IRS Publications. Examples: IRC §61, IRC §162, Pub. 17',
      see2: 'IRC sections for businesses. Examples: IRC §179, IRC §701, Form 1065',
      see3: 'Circular 230, IRC penalty sections. Examples: Circular 230 §10.22, IRC §6662',
    },
    cpa: {
      tcp: 'IRC sections for tax planning. Examples: IRC §267, IRC §2503',
      aud: 'AU-C sections, PCAOB standards. Examples: AU-C 315, PCAOB AS 2201',
    },
  };
  
  let totalFixed = 0;
  
  for (const section of sections) {
    const filePath = path.join('content', exam, section, 'questions.json');
    if (!fs.existsSync(filePath)) continue;
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const needsEnhancement = data.questions.filter(q => 
      !q.authorityRef || q.authorityRef === '' ||
      !q.commonMistake || q.commonMistake === ''
    );
    
    if (needsEnhancement.length === 0) {
      log(`  ${section}: No gaps found`);
      continue;
    }
    
    log(`  ${section}: ${needsEnhancement.length} questions need authority/commonMistake`);
    
    const standardsHint = STANDARDS[exam]?.[section] || '';
    
    for (let i = 0; i < needsEnhancement.length; i += BATCH_SIZE) {
      const batch = needsEnhancement.slice(i, i + BATCH_SIZE);
      
      const prompt = `You are an ${exam.toUpperCase()} exam expert. Add authoritative references and common mistake explanations.

STANDARDS: ${standardsHint}

For EACH question provide:
1. authorityRef: The SPECIFIC authoritative standard (e.g., "IRC §162(a)", "AU-C 315.05")
2. commonMistake: Why wrong answers are tempting (1-3 sentences starting with "Many candidates...")

Questions:
${batch.map((q, idx) => `
Q${idx + 1}:
Topic: ${q.topic}
Question: ${q.question.substring(0, 200)}...
Options: A) ${q.options[0]} | B) ${q.options[1]}
Correct: ${['A','B','C','D'][q.correctAnswer]}
`).join('\n---\n')}

Respond in JSON:
{
  "enhancements": [
    { "qIndex": 0, "authorityRef": "...", "commonMistake": "..." },
    ...
  ]
}`;

      try {
        const response = await callGemini(prompt);
        const jsonMatch = response.match(/\{[\s\S]*"enhancements"[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          for (const item of result.enhancements) {
            const q = batch[item.qIndex];
            const idx = data.questions.findIndex(x => x.id === q.id);
            if (idx >= 0) {
              if (item.authorityRef && (!data.questions[idx].authorityRef || data.questions[idx].authorityRef === '')) {
                data.questions[idx].authorityRef = item.authorityRef;
                totalFixed++;
              }
              if (item.commonMistake && (!data.questions[idx].commonMistake || data.questions[idx].commonMistake === '')) {
                data.questions[idx].commonMistake = item.commonMistake;
              }
            }
          }
        }
        log(`    Batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(needsEnhancement.length/BATCH_SIZE)} done`);
      } catch (e) {
        log(`    ERROR: ${e.message}`);
      }
      
      await sleep(DELAY_MS);
    }
    
    // Save updated file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    log(`  ${section}: Saved`);
  }
  
  return totalFixed;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  log('========================================');
  log('   QUESTION BANK GAP FIXER');
  log('========================================');
  
  if (!GEMINI_API_KEY) {
    log('ERROR: GEMINI_API_KEY not set');
    process.exit(1);
  }
  
  const results = {
    cisaExplanations: 0,
    eaAuthority: 0,
    cpaTcpAuthority: 0,
    cpaAudAuthority: 0,
  };
  
  // Fix 1: CISA Short Explanations
  results.cisaExplanations = await fixCISAShortExplanations();
  
  // Fix 2: EA Authority/CommonMistake
  results.eaAuthority = await fixAuthorityGaps('ea', ['see1', 'see2', 'see3']);
  
  // Fix 3: CPA TCP Authority/CommonMistake
  results.cpaTcpAuthority = await fixAuthorityGaps('cpa', ['tcp']);
  
  // Fix 4: CPA AUD Authority/CommonMistake
  results.cpaAudAuthority = await fixAuthorityGaps('cpa', ['aud']);
  
  log('========================================');
  log('   SUMMARY');
  log('========================================');
  log(`CISA explanations expanded: ${results.cisaExplanations}`);
  log(`EA authority gaps filled: ${results.eaAuthority}`);
  log(`CPA TCP authority gaps filled: ${results.cpaTcpAuthority}`);
  log(`CPA AUD authority gaps filled: ${results.cpaAudAuthority}`);
  log(`TOTAL fixes: ${Object.values(results).reduce((a, b) => a + b, 0)}`);
  log('========================================');
}

main().catch(e => {
  log(`FATAL: ${e.message}`);
  process.exit(1);
});
