#!/usr/bin/env node
/**
 * tbs-enhance.cjs: AI-enhanced UWorld-style explanations for CPA TBS
 * 
 * Enhances TBS requirements in content/cpa/{section}/tbs.json with:
 * - Step-by-step solution with formulas
 * - Key concepts with ASC/AU-C/IRC references
 * - Common mistakes to avoid
 * - Why wrong answers are wrong (for MCQ requirements)
 * - Exam tips
 * 
 * Usage:
 *   node scripts/tbs-enhance.cjs --status                         # Show progress
 *   node scripts/tbs-enhance.cjs far                              # Enhance FAR TBS
 *   node scripts/tbs-enhance.cjs all                              # Enhance all sections
 *   node scripts/tbs-enhance.cjs far --limit=10                   # Process 10 TBS
 *   node scripts/tbs-enhance.cjs far --resume                     # Resume from last run
 *   node scripts/tbs-enhance.cjs far --dry-run                    # Preview without writing
 * 
 * Environment:
 *   GEMINI_API_KEY or VITE_GEMINI_API_KEY must be set
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content', 'cpa');

// CPA sections
const SECTIONS = ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'];

const SECTION_DESCRIPTIONS = {
  far: 'Financial Accounting and Reporting (GAAP, ASC, financial statements, leases, pensions)',
  aud: 'Auditing and Attestation (AU-C, PCAOB, audit procedures, internal control, ethics)',
  reg: 'Regulation (Federal taxation, business law, ethics)',
  bar: 'Business Analysis and Reporting (variance analysis, ratio analysis, prospective financials)',
  isc: 'Information Systems and Controls (IT governance, cybersecurity, SOC reports)',
  tcp: 'Tax Compliance and Planning (tax planning strategies, entity selection, multi-jurisdictional)',
};

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Parse command line args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const RESUME = args.includes('--resume');
const STATUS_ONLY = args.includes('--status');
const VERBOSE = args.includes('--verbose');

const LIMIT = (() => {
  const idx = args.findIndex(a => a.startsWith('--limit'));
  if (idx >= 0) {
    const val = args[idx].includes('=') ? args[idx].split('=')[1] : args[idx + 1];
    return parseInt(val, 10) || Infinity;
  }
  return Infinity;
})();

// Get section arg (first non-flag arg)
const sectionArg = args.find(a => !a.startsWith('-'));

// ─── Progress tracking ───

function getProgressFile(section) {
  return path.join(CONTENT_DIR, section, '.tbs-enhance-progress.json');
}

function loadProgress(section) {
  const progressFile = getProgressFile(section);
  if (fs.existsSync(progressFile)) {
    return JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
  }
  return { enhanced: [], errors: [], lastRun: null, stats: {} };
}

function saveProgress(section, progress) {
  progress.lastRun = new Date().toISOString();
  const progressFile = getProgressFile(section);
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2), 'utf-8');
}

// ─── Quality detection ───

function requirementNeedsEnhancement(req) {
  const expl = req.explanation || '';
  
  // No explanation
  if (!expl || expl.length < 50) return true;
  
  // Has generic enhancement markers but no real content
  if (expl.includes('**Step-by-Step') && expl.length < 200) return true;
  
  // Already has quality enhancement
  if (expl.includes('**Step-by-Step Solution:**') && 
      expl.includes('**Common Mistake:**') &&
      expl.length > 300) {
    return false;
  }
  
  // Check for generic placeholder text
  if (expl.includes('Candidates often miss a step') && 
      !expl.includes('specifically') &&
      !expl.includes('formula')) {
    return true;
  }
  
  return expl.length < 200; // Short explanations need enhancement
}

// ─── AI prompt for TBS requirement ───

function buildPrompt(tbs, requirement, sectionId) {
  const sectionDesc = SECTION_DESCRIPTIONS[sectionId.toLowerCase()] || sectionId;
  const reqType = requirement.type || 'calculation';
  
  let typeSpecificInstructions = '';
  
  if (reqType === 'calculation') {
    typeSpecificInstructions = `
This is a CALCULATION requirement. Generate:
1. Step-by-step solution with:
   - Given information clearly listed
   - Formula written out
   - Each calculation step shown
   - Final answer highlighted
2. Key concept explaining the underlying rule
3. Common mistakes candidates make on this specific calculation
4. Exam tip for quick solving`;
  } else if (reqType === 'journal_entry') {
    typeSpecificInstructions = `
This is a JOURNAL ENTRY requirement. Generate:
1. The complete journal entry solution with:
   - Each debit and credit account
   - Dollar amounts
   - Brief explanation of why each account is debited/credited
2. Key concept (relevant ASC reference if applicable)
3. Common mistakes (wrong accounts, reversed entries, etc.)
4. Exam tip for remembering the entry structure`;
  } else if (reqType === 'multiple_choice') {
    typeSpecificInstructions = `
This is a MULTIPLE CHOICE requirement within a TBS. Generate:
1. Why the correct answer is correct (with specific reasoning)
2. Why each wrong answer is wrong (be specific to each option)
3. Key concept connecting to broader exam material
4. Exam tip for eliminating wrong answers`;
  } else if (reqType === 'reconciliation') {
    typeSpecificInstructions = `
This is a RECONCILIATION requirement. Generate:
1. Step-by-step reconciliation process
2. Which items adjust the bank side vs. book side
3. Common reconciling items and their treatment
4. Key concept about reconciliation purpose
5. Common mistakes (putting items on wrong side)`;
  } else {
    typeSpecificInstructions = `
Generate a comprehensive explanation with:
1. How to solve this requirement
2. Key concept with authoritative reference if applicable
3. Common mistakes
4. Exam tip`;
  }

  const optionsSection = requirement.options 
    ? `\nOPTIONS:\n${requirement.options.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join('\n')}\nCORRECT ANSWER: ${String.fromCharCode(65 + (requirement.correctAnswer || 0))}`
    : '';

  return `You are a CPA exam expert creating UWorld-style TBS explanations. This TBS is from the ${sectionId.toUpperCase()} section: ${sectionDesc}.

TBS TITLE: ${tbs.title || 'Untitled'}
TOPIC: ${tbs.topic || 'N/A'}
BLUEPRINT AREA: ${tbs.blueprintArea || 'N/A'}

SCENARIO:
${(tbs.scenario || '').substring(0, 1500)}

REQUIREMENT:
${requirement.question || requirement.text || 'N/A'}
${optionsSection}

EXISTING EXPLANATION:
${requirement.explanation || '(none)'}

${typeSpecificInstructions}

Generate a JSON object with this structure:
{
  "explanation": "Full UWorld-style explanation with **Step-by-Step Solution:** section, **Key Concept:** section, **Common Mistake:** section, and **Exam Tip:** section. Use markdown formatting with bold headers. Be specific to this exact scenario and numbers.",
  "keyFormula": "The key formula used (if applicable, otherwise null)",
  "commonMistakes": ["Specific mistake 1", "Specific mistake 2"],
  "examTip": "One practical exam-day tip specific to this type of problem"
}

Requirements:
1. Be SPECIFIC to the numbers and context in this TBS - don't give generic advice
2. Reference ASC, AU-C, IRC, or other authoritative guidance where applicable
3. For calculations, show ALL steps with actual numbers from the scenario
4. For journal entries, explain the debit/credit logic
5. Make common mistakes specific to this TBS, not generic
6. Exam tip should be actionable and memorable

Return ONLY valid JSON, no markdown code fences.`;
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
            maxOutputTokens: 2000,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429) {
          // Rate limit - wait and retry
          const waitTime = Math.min(60000, 5000 * Math.pow(2, attempt));
          console.log(`    Rate limited. Waiting ${waitTime / 1000}s...`);
          await new Promise(r => setTimeout(r, waitTime));
          continue;
        }
        throw new Error(`Gemini API error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error('Empty response from Gemini');
      }

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      console.log(`    Attempt ${attempt} failed: ${err.message}. Retrying...`);
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
}

// ─── Main functions ───

async function enhanceSection(section) {
  const tbsPath = path.join(CONTENT_DIR, section, 'tbs.json');
  
  if (!fs.existsSync(tbsPath)) {
    console.log(`  No TBS file found for ${section}`);
    return { enhanced: 0, errors: 0 };
  }
  
  const data = JSON.parse(fs.readFileSync(tbsPath, 'utf-8'));
  const tbsList = data.tbs || [];
  
  if (tbsList.length === 0) {
    console.log(`  No TBS in ${section}`);
    return { enhanced: 0, errors: 0 };
  }
  
  // Load progress
  const progress = RESUME ? loadProgress(section) : { enhanced: [], errors: [], stats: {} };
  const enhancedSet = new Set(progress.enhanced);
  
  // Count requirements needing enhancement
  let needsEnhancement = 0;
  let alreadyEnhanced = 0;
  
  for (const tbs of tbsList) {
    for (const req of (tbs.requirements || [])) {
      const reqKey = `${tbs.id}:${req.id}`;
      if (enhancedSet.has(reqKey)) {
        alreadyEnhanced++;
      } else if (requirementNeedsEnhancement(req)) {
        needsEnhancement++;
      } else {
        alreadyEnhanced++;
      }
    }
  }
  
  console.log(`\n${section.toUpperCase()}: ${tbsList.length} TBS`);
  console.log(`  Needs enhancement: ${needsEnhancement}`);
  console.log(`  Already enhanced: ${alreadyEnhanced}`);
  
  if (needsEnhancement === 0 || STATUS_ONLY) {
    return { enhanced: 0, errors: 0, skipped: alreadyEnhanced };
  }
  
  // Process TBS
  let processed = 0;
  let errors = 0;
  
  for (const tbs of tbsList) {
    if (processed >= LIMIT) break;
    
    for (const req of (tbs.requirements || [])) {
      if (processed >= LIMIT) break;
      
      const reqKey = `${tbs.id}:${req.id}`;
      
      // Skip if already processed
      if (enhancedSet.has(reqKey)) continue;
      
      // Skip if doesn't need enhancement
      if (!requirementNeedsEnhancement(req)) {
        enhancedSet.add(reqKey);
        continue;
      }
      
      if (VERBOSE) {
        console.log(`  Processing: ${reqKey}`);
      }
      
      try {
        if (!DRY_RUN) {
          const enhancement = await callGemini(buildPrompt(tbs, req, section));
          
          // Apply enhancement
          if (enhancement.explanation) {
            req.explanation = enhancement.explanation;
          }
          if (enhancement.keyFormula) {
            req.keyFormula = enhancement.keyFormula;
          }
          if (enhancement.commonMistakes) {
            req.commonMistakes = enhancement.commonMistakes;
          }
          if (enhancement.examTip) {
            req.examTip = enhancement.examTip;
          }
          
          // Rate limiting
          await new Promise(r => setTimeout(r, 500));
        }
        
        progress.enhanced.push(reqKey);
        enhancedSet.add(reqKey);
        processed++;
        
        if (processed % 10 === 0) {
          console.log(`  Progress: ${processed} requirements enhanced`);
          if (!DRY_RUN) {
            saveProgress(section, progress);
            // Save TBS file periodically
            data.exportedAt = new Date().toISOString();
            fs.writeFileSync(tbsPath, JSON.stringify(data, null, 2));
          }
        }
      } catch (err) {
        console.log(`  ERROR ${reqKey}: ${err.message}`);
        progress.errors.push({ reqKey, error: err.message, time: new Date().toISOString() });
        errors++;
      }
    }
  }
  
  // Save final state
  if (!DRY_RUN && processed > 0) {
    progress.stats = {
      totalTBS: tbsList.length,
      totalRequirements: tbsList.reduce((sum, t) => sum + (t.requirements?.length || 0), 0),
      enhanced: progress.enhanced.length,
      errors: progress.errors.length,
    };
    saveProgress(section, progress);
    
    data.exportedAt = new Date().toISOString();
    fs.writeFileSync(tbsPath, JSON.stringify(data, null, 2));
  }
  
  console.log(`  Done: ${processed} enhanced, ${errors} errors`);
  return { enhanced: processed, errors };
}

async function showStatus() {
  console.log('TBS Enhancement Status');
  console.log('======================\n');
  
  let totalTBS = 0;
  let totalReqs = 0;
  let totalEnhanced = 0;
  let totalNeedsWork = 0;
  
  for (const section of SECTIONS) {
    const tbsPath = path.join(CONTENT_DIR, section, 'tbs.json');
    
    if (!fs.existsSync(tbsPath)) {
      console.log(`${section.toUpperCase()}: No TBS file`);
      continue;
    }
    
    const data = JSON.parse(fs.readFileSync(tbsPath, 'utf-8'));
    const tbsList = data.tbs || [];
    const progress = loadProgress(section);
    const enhancedSet = new Set(progress.enhanced);
    
    let sectionReqs = 0;
    let sectionEnhanced = 0;
    let sectionNeedsWork = 0;
    
    for (const tbs of tbsList) {
      for (const req of (tbs.requirements || [])) {
        sectionReqs++;
        const reqKey = `${tbs.id}:${req.id}`;
        if (enhancedSet.has(reqKey) || !requirementNeedsEnhancement(req)) {
          sectionEnhanced++;
        } else {
          sectionNeedsWork++;
        }
      }
    }
    
    const pct = sectionReqs > 0 ? Math.round((sectionEnhanced / sectionReqs) * 100) : 0;
    console.log(`${section.toUpperCase()}: ${tbsList.length} TBS, ${sectionReqs} reqs, ${pct}% enhanced (${sectionNeedsWork} remaining)`);
    
    totalTBS += tbsList.length;
    totalReqs += sectionReqs;
    totalEnhanced += sectionEnhanced;
    totalNeedsWork += sectionNeedsWork;
  }
  
  console.log('');
  console.log(`TOTAL: ${totalTBS} TBS, ${totalReqs} requirements`);
  console.log(`Enhanced: ${totalEnhanced} (${Math.round((totalEnhanced / totalReqs) * 100)}%)`);
  console.log(`Needs work: ${totalNeedsWork}`);
}

async function main() {
  // Check API key
  if (!GEMINI_API_KEY && !STATUS_ONLY) {
    console.error('ERROR: GEMINI_API_KEY or VITE_GEMINI_API_KEY must be set');
    process.exit(1);
  }
  
  // Status only
  if (STATUS_ONLY || !sectionArg) {
    await showStatus();
    return;
  }
  
  console.log('TBS Enhancement');
  console.log('===============');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Resume: ${RESUME}`);
  console.log(`Limit: ${LIMIT === Infinity ? 'none' : LIMIT}`);
  
  // Process requested sections
  const sectionsToProcess = sectionArg === 'all' 
    ? SECTIONS 
    : [sectionArg.toLowerCase()];
  
  if (!sectionsToProcess.every(s => SECTIONS.includes(s))) {
    console.error(`Invalid section. Valid sections: ${SECTIONS.join(', ')}, all`);
    process.exit(1);
  }
  
  let totalEnhanced = 0;
  let totalErrors = 0;
  
  for (const section of sectionsToProcess) {
    const result = await enhanceSection(section);
    totalEnhanced += result.enhanced;
    totalErrors += result.errors;
  }
  
  console.log('\n===============');
  console.log(`Total: ${totalEnhanced} enhanced, ${totalErrors} errors`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
