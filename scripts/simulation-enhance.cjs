#!/usr/bin/env node
/**
 * simulation-enhance.cjs: AI-enhanced UWorld-style explanations for CMA CBQ, CFP Case Studies, and CMA Practice Simulations
 * 
 * Enhances simulation content with:
 * - Step-by-step solutions with formulas
 * - Key concepts with authoritative references
 * - Common mistakes to avoid
 * - Why wrong answers are wrong
 * - Exam tips
 * 
 * Usage:
 *   node scripts/simulation-enhance.cjs --status                      # Show progress
 *   node scripts/simulation-enhance.cjs cbq                           # Enhance CMA CBQ
 *   node scripts/simulation-enhance.cjs cases                         # Enhance CFP Case Studies
 *   node scripts/simulation-enhance.cjs sims                          # Enhance CMA Practice Simulations
 *   node scripts/simulation-enhance.cjs all                           # Enhance all types
 *   node scripts/simulation-enhance.cjs cbq --limit=10                # Process 10 items
 *   node scripts/simulation-enhance.cjs cbq --resume                  # Resume from last run
 *   node scripts/simulation-enhance.cjs cbq --dry-run                 # Preview without writing
 * 
 * Environment:
 *   GEMINI_API_KEY or VITE_GEMINI_API_KEY must be set
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content');

// Content types and their paths
const CONTENT_TYPES = {
  cbq: {
    name: 'CMA Case-Based Questions',
    files: [
      { path: 'cma/CMA1/cbq.json', section: 'CMA1' },
      { path: 'cma/CMA2/cbq.json', section: 'CMA2' },
    ],
    itemKey: 'scenarios',
    questionKey: 'questions',
    description: 'CMA CBQs test applied management accounting skills with interactive scenarios',
  },
  cases: {
    name: 'CFP Case Studies',
    files: [
      { path: 'cfp/case-studies.json', section: 'CFP' },
    ],
    itemKey: 'caseStudies',
    questionKey: 'questions',
    description: 'CFP Case Studies test integrated financial planning knowledge across 8 domains',
  },
  sims: {
    name: 'CMA Practice Simulations',
    files: [
      { path: 'cma/CMA1/practice-simulations.json', section: 'CMA1' },
      { path: 'cma/CMA2/practice-simulations.json', section: 'CMA2' },
    ],
    itemKey: 'simulations',
    questionKey: 'tasks',
    description: 'CMA Practice Simulations test calculation and analysis skills',
  },
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

// Get type arg (first non-flag arg)
const typeArg = args.find(a => !a.startsWith('-'));

// ─── Progress tracking ───

function getProgressFile(contentType, section) {
  return path.join(CONTENT_DIR, `.${contentType}-${section}-enhance-progress.json`);
}

function loadProgress(contentType, section) {
  const progressFile = getProgressFile(contentType, section);
  if (fs.existsSync(progressFile)) {
    return JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
  }
  return { enhanced: [], errors: [], lastRun: null, stats: {} };
}

function saveProgress(contentType, section, progress) {
  progress.lastRun = new Date().toISOString();
  const progressFile = getProgressFile(contentType, section);
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2), 'utf-8');
}

// ─── Quality detection ───

function needsEnhancement(item, contentType) {
  const expl = contentType === 'sims' 
    ? (item.solution?.explanation || '') 
    : (item.explanation || '');
  
  // No explanation
  if (!expl || expl.length < 50) return true;
  
  // Already has quality enhancement
  if (expl.includes('**Step-by-Step') && 
      (expl.includes('**Common Mistake') || expl.includes('**Key Concept')) &&
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

// ─── AI prompts ───

function buildCBQPrompt(scenario, question) {
  return `You are a CMA exam expert creating UWorld-style explanations. This is a Case-Based Question (CBQ) from the CMA exam.

SCENARIO TITLE: ${scenario.title || 'Untitled'}
SCENARIO:
${(scenario.scenario || '').substring(0, 1500)}

QUESTION TYPE: ${question.type}
QUESTION:
${question.prompt || question.question || ''}

${question.type === 'numerical_entry' ? `CORRECT ANSWER: ${question.correctAnswer}` : ''}
${question.type === 'multiple_select' ? `OPTIONS: ${JSON.stringify(question.options)}\nCORRECT: ${JSON.stringify(question.correctAnswers)}` : ''}
${question.type === 'dropdown' ? `TEMPLATE: ${question.questionTemplate}\nBLANKS: ${JSON.stringify(question.blanks)}` : ''}
${question.type === 'drag_and_drop' ? `ITEMS: ${JSON.stringify(question.dragItems)}\nZONES: ${JSON.stringify(question.dropZones)}\nMAPPING: ${JSON.stringify(question.correctMapping)}` : ''}

EXISTING EXPLANATION:
${question.explanation || '(none)'}

Generate a comprehensive UWorld-style explanation. Return a JSON object:
{
  "explanation": "Full explanation with **Step-by-Step Solution:** section (show ALL calculations with numbers from scenario), **Key Concept:** section (IMA content specs reference if applicable), **Common Mistake:** section, and **Exam Tip:** section. Use markdown formatting.",
  "keyFormula": "The key formula used (if calculation, otherwise null)",
  "commonMistakes": ["Specific mistake 1", "Specific mistake 2"],
  "examTip": "One practical tip specific to this type of CBQ"
}

Requirements:
1. Be SPECIFIC to the numbers and context in this scenario
2. For numerical_entry, show complete calculation steps
3. For multiple_select, explain why each correct option is correct AND why wrong ones are wrong
4. For drag_and_drop, explain the logic behind the correct ordering/matching
5. Reference IMA Content Specification Outlines where applicable

Return ONLY valid JSON, no markdown code fences.`;
}

function buildCaseStudyPrompt(caseStudy, question) {
  const domains = (caseStudy.domains || []).join(', ');
  
  return `You are a CFP exam expert creating UWorld-style explanations. This is a CFP Case Study question.

CASE STUDY: ${caseStudy.title || 'Untitled'}
DOMAINS COVERED: ${domains}

SCENARIO:
${(caseStudy.scenario || '').substring(0, 1500)}

QUESTION DOMAIN: ${question.domain}
QUESTION:
${question.question}

OPTIONS:
${(question.options || []).map((o, i) => `${o.id}) ${o.text}`).join('\n')}

CORRECT ANSWER: ${question.correctOptionId}

EXISTING EXPLANATION:
${question.explanation || '(none)'}

Generate a comprehensive UWorld-style explanation. Return a JSON object:
{
  "explanation": "Full explanation with **Why ${question.correctOptionId} is Correct:** section, **Why Other Options Are Wrong:** section (explain each wrong option specifically), **Key Concept:** section (relevant financial planning principles), **Common Mistake:** section, and **Exam Tip:** section. Use markdown formatting.",
  "keyFormula": "Key formula or principle if applicable (otherwise null)",
  "whyWrong": {
    "a": "Why option A is wrong (if not correct)",
    "b": "Why option B is wrong (if not correct)",
    "c": "Why option C is wrong (if not correct)", 
    "d": "Why option D is wrong (if not correct)"
  },
  "commonMistakes": ["Specific mistake 1", "Specific mistake 2"],
  "examTip": "One practical tip for this type of planning question"
}

Requirements:
1. Be SPECIFIC to the client facts in this case study
2. Reference relevant financial planning standards, tax code sections, or estate planning rules
3. Explain why EACH wrong answer is wrong - candidates need to understand the logic
4. Connect to the CFP Body of Knowledge domain being tested

Return ONLY valid JSON, no markdown code fences.`;
}

function buildSimulationPrompt(simulation, task) {
  return `You are a CMA exam expert creating UWorld-style explanations. This is a Practice Simulation task.

SIMULATION: ${simulation.title || 'Untitled'}
BLUEPRINT AREA: ${simulation.blueprintArea}
TOPIC: ${simulation.topic}

SCENARIO:
${(simulation.scenario || '').substring(0, 1500)}

TASK ${task.taskNumber}:
${task.requirement}

${task.hints ? `HINTS PROVIDED: ${task.hints.join('; ')}` : ''}

SOLUTION APPROACH: ${task.solution?.approach || ''}
CALCULATIONS: ${task.solution?.calculations || ''}
ANSWER: ${JSON.stringify(task.solution?.answer)}

EXISTING EXPLANATION:
${task.solution?.explanation || '(none)'}

Generate a comprehensive UWorld-style explanation. Return a JSON object:
{
  "stepByStep": "Complete step-by-step walkthrough with:\n1. **Given Information:** List all relevant data from exhibits/scenario\n2. **Formula:** Write out the formula(s) needed\n3. **Calculation:** Show each calculation step with actual numbers\n4. **Answer:** State the final answer clearly",
  "keyFormula": "The key formula used",
  "commonMistakes": ["Specific calculation error candidates make", "Another common error"],
  "examTip": "One practical tip for solving this type of problem quickly on exam day"
}

Requirements:
1. Use ACTUAL numbers from the scenario/exhibits - no placeholder values
2. Show every calculation step - candidates learn by seeing the work
3. Reference IMA Content Specs or relevant accounting standards if applicable
4. Common mistakes should be specific to this calculation, not generic advice

Return ONLY valid JSON, no markdown code fences.`;
}

function buildPrompt(contentType, parent, item) {
  if (contentType === 'cbq') {
    return buildCBQPrompt(parent, item);
  } else if (contentType === 'cases') {
    return buildCaseStudyPrompt(parent, item);
  } else {
    return buildSimulationPrompt(parent, item);
  }
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

async function enhanceContentType(contentType) {
  const config = CONTENT_TYPES[contentType];
  console.log(`\n📦 ${config.name}`);
  console.log(`   ${config.description}\n`);
  
  let totalProcessed = 0;
  let totalErrors = 0;
  
  for (const fileConfig of config.files) {
    const filePath = path.join(CONTENT_DIR, fileConfig.path);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  ${fileConfig.section}: No file found at ${fileConfig.path}`);
      continue;
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const items = data[config.itemKey] || [];
    
    if (items.length === 0) {
      console.log(`  ${fileConfig.section}: No items found`);
      continue;
    }
    
    // Load progress
    const progress = RESUME ? loadProgress(contentType, fileConfig.section) : { enhanced: [], errors: [], stats: {} };
    const enhancedSet = new Set(progress.enhanced);
    
    // Count items needing enhancement
    let needsWork = 0;
    let alreadyDone = 0;
    
    for (const item of items) {
      const questions = item[config.questionKey] || [];
      for (const q of questions) {
        const key = `${item.id}:${q.id}`;
        if (enhancedSet.has(key) || !needsEnhancement(q, contentType)) {
          alreadyDone++;
        } else {
          needsWork++;
        }
      }
    }
    
    console.log(`  ${fileConfig.section}: ${items.length} items, ${needsWork} questions need enhancement, ${alreadyDone} done`);
    
    if (needsWork === 0 || STATUS_ONLY) {
      continue;
    }
    
    // Process items
    let processed = 0;
    let errors = 0;
    
    for (const item of items) {
      if (processed >= LIMIT) break;
      
      const questions = item[config.questionKey] || [];
      for (const q of questions) {
        if (processed >= LIMIT) break;
        
        const key = `${item.id}:${q.id}`;
        
        // Skip if already processed
        if (enhancedSet.has(key)) continue;
        
        // Skip if doesn't need enhancement
        if (!needsEnhancement(q, contentType)) {
          enhancedSet.add(key);
          continue;
        }
        
        if (VERBOSE) {
          console.log(`    Processing: ${key}`);
        }
        
        try {
          if (!DRY_RUN) {
            const enhancement = await callGemini(buildPrompt(contentType, item, q));
            
            // Apply enhancement based on content type
            if (contentType === 'sims') {
              // For simulations, update the solution
              if (enhancement.stepByStep) {
                q.stepByStep = enhancement.stepByStep;
              }
            } else {
              // For CBQ and cases
              if (enhancement.explanation) {
                q.explanation = enhancement.explanation;
              }
            }
            
            // Common fields
            if (enhancement.keyFormula) {
              q.keyFormula = enhancement.keyFormula;
            }
            if (enhancement.commonMistakes) {
              q.commonMistakes = enhancement.commonMistakes;
            }
            if (enhancement.examTip) {
              q.examTip = enhancement.examTip;
            }
            if (enhancement.whyWrong && contentType === 'cases') {
              q.whyWrong = enhancement.whyWrong;
            }
            
            q.enhanced = true;
            
            // Rate limiting
            await new Promise(r => setTimeout(r, 500));
          }
          
          progress.enhanced.push(key);
          enhancedSet.add(key);
          processed++;
          totalProcessed++;
          
          if (processed % 10 === 0) {
            console.log(`    Progress: ${processed} questions enhanced`);
            if (!DRY_RUN) {
              saveProgress(contentType, fileConfig.section, progress);
              data.enhancedAt = new Date().toISOString();
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            }
          }
        } catch (err) {
          console.log(`    ERROR ${key}: ${err.message}`);
          progress.errors.push({ key, error: err.message, time: new Date().toISOString() });
          errors++;
          totalErrors++;
        }
      }
    }
    
    // Save final state
    if (!DRY_RUN && processed > 0) {
      progress.stats = {
        totalItems: items.length,
        totalQuestions: items.reduce((sum, i) => sum + (i[config.questionKey]?.length || 0), 0),
        enhanced: progress.enhanced.length,
        errors: progress.errors.length,
      };
      saveProgress(contentType, fileConfig.section, progress);
      
      data.enhancedAt = new Date().toISOString();
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    
    console.log(`    Done: ${processed} enhanced, ${errors} errors`);
  }
  
  return { enhanced: totalProcessed, errors: totalErrors };
}

async function showStatus() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║            SIMULATION ENHANCEMENT STATUS                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  let grandTotalItems = 0;
  let grandTotalQuestions = 0;
  let grandTotalEnhanced = 0;
  let grandTotalNeeds = 0;
  
  for (const [contentType, config] of Object.entries(CONTENT_TYPES)) {
    console.log(`📦 ${config.name}`);
    
    for (const fileConfig of config.files) {
      const filePath = path.join(CONTENT_DIR, fileConfig.path);
      
      if (!fs.existsSync(filePath)) {
        console.log(`   ${fileConfig.section}: No file found`);
        continue;
      }
      
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const items = data[config.itemKey] || [];
      const progress = loadProgress(contentType, fileConfig.section);
      const enhancedSet = new Set(progress.enhanced);
      
      let totalQuestions = 0;
      let enhanced = 0;
      let needs = 0;
      
      for (const item of items) {
        const questions = item[config.questionKey] || [];
        for (const q of questions) {
          totalQuestions++;
          const key = `${item.id}:${q.id}`;
          if (enhancedSet.has(key) || !needsEnhancement(q, contentType)) {
            enhanced++;
          } else {
            needs++;
          }
        }
      }
      
      const pct = totalQuestions > 0 ? Math.round((enhanced / totalQuestions) * 100) : 0;
      const bar = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5));
      
      console.log(`   ${fileConfig.section}: ${items.length} items, ${totalQuestions} questions`);
      console.log(`   [${bar}] ${pct}% (${needs} remaining)`);
      
      grandTotalItems += items.length;
      grandTotalQuestions += totalQuestions;
      grandTotalEnhanced += enhanced;
      grandTotalNeeds += needs;
    }
    console.log('');
  }
  
  const grandPct = grandTotalQuestions > 0 ? Math.round((grandTotalEnhanced / grandTotalQuestions) * 100) : 0;
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`TOTAL: ${grandTotalItems} items, ${grandTotalQuestions} questions`);
  console.log(`Enhanced: ${grandTotalEnhanced} (${grandPct}%)`);
  console.log(`Needs work: ${grandTotalNeeds}`);
}

async function main() {
  // Check API key
  if (!GEMINI_API_KEY && !STATUS_ONLY) {
    console.error('ERROR: GEMINI_API_KEY or VITE_GEMINI_API_KEY must be set');
    process.exit(1);
  }
  
  // Status only
  if (STATUS_ONLY || !typeArg) {
    await showStatus();
    return;
  }
  
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║              SIMULATION ENHANCEMENT                         ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\nMode: ${DRY_RUN ? '🧪 DRY RUN' : '📝 LIVE'}`);
  console.log(`Resume: ${RESUME}`);
  console.log(`Limit: ${LIMIT === Infinity ? 'none' : LIMIT}`);
  
  // Validate type
  const validTypes = [...Object.keys(CONTENT_TYPES), 'all'];
  if (!validTypes.includes(typeArg)) {
    console.error(`\nInvalid type: ${typeArg}`);
    console.error(`Valid types: ${validTypes.join(', ')}`);
    process.exit(1);
  }
  
  // Process requested types
  const typesToProcess = typeArg === 'all' 
    ? Object.keys(CONTENT_TYPES) 
    : [typeArg];
  
  let totalEnhanced = 0;
  let totalErrors = 0;
  
  for (const type of typesToProcess) {
    const result = await enhanceContentType(type);
    totalEnhanced += result.enhanced;
    totalErrors += result.errors;
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`Total: ${totalEnhanced} enhanced, ${totalErrors} errors`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
