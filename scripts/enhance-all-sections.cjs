#!/usr/bin/env node
/**
 * Batch enhance ALL CPA exam questions (AUD, REG, BAR, ISC, TCP)
 * 
 * Usage:
 *   node scripts/enhance-all-sections.cjs           # Run all sections
 *   node scripts/enhance-all-sections.cjs AUD       # Run specific section
 *   node scripts/enhance-all-sections.cjs --status  # Check progress
 * 
 * This runs in background and logs progress to /tmp/enhance-{section}.log
 */

const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

const SECTIONS = {
  AUD: { dir: 'src/data/cpa/questions', prefix: 'aud-' },
  REG: { dir: 'src/data/cpa/questions', prefix: 'reg-' },
  BAR: { dir: 'src/data/cpa/questions', prefix: 'bar-' },
  ISC: { dir: 'src/data/cpa/questions', prefix: 'isc-' },
  TCP: { dir: 'src/data/cpa/questions', prefix: 'tcp-' },
};

// Track progress
const PROGRESS_FILE = '/tmp/enhance-progress.json';

function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
    }
  } catch (e) {}
  return { sections: {}, lastUpdated: null };
}

function saveProgress(progress) {
  progress.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function showStatus() {
  const progress = loadProgress();
  console.log('\n📊 Enhancement Progress\n');
  console.log(`Last updated: ${progress.lastUpdated || 'Never'}\n`);
  
  for (const [section, config] of Object.entries(SECTIONS)) {
    const sectionProgress = progress.sections[section] || {};
    const status = sectionProgress.status || 'not started';
    const enhanced = sectionProgress.enhanced || 0;
    const total = sectionProgress.total || '?';
    const errors = sectionProgress.errors || 0;
    
    let icon = '⬜';
    if (status === 'complete') icon = '✅';
    else if (status === 'in_progress') icon = '🔄';
    else if (status === 'error') icon = '❌';
    
    console.log(`${icon} ${section}: ${enhanced}/${total} enhanced, ${errors} errors (${status})`);
  }
  console.log('');
}

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
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error.substring(0, 200)}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function buildPrompt(question, section) {
  const sectionContext = {
    AUD: 'auditing and attestation',
    REG: 'tax and business law',
    BAR: 'business analysis and reporting',
    ISC: 'information systems and controls',
    TCP: 'tax compliance and planning',
  };
  
  return `You are enhancing CPA exam question explanations for the ${section} section (${sectionContext[section] || 'CPA exam'}).

QUESTION:
${question.question}

OPTIONS:
A) ${question.options[0]}
B) ${question.options[1]}
C) ${question.options[2]}
D) ${question.options[3]}

CORRECT ANSWER: ${['A', 'B', 'C', 'D'][question.correctAnswer]}

CURRENT EXPLANATION:
${question.explanation}

Generate an enhanced explanation in this JSON format:
{
  "explanation": "2-3 sentence explanation of why the correct answer is right",
  "educationalNote": "A teaching moment that helps the student understand the underlying concept (2-4 sentences)",
  "wrongAnswerExplanations": [
    "Why option A is wrong (or why it's correct if A is the answer)",
    "Why option B is wrong (or why it's correct if B is the answer)",
    "Why option C is wrong (or why it's correct if C is the answer)",
    "Why option D is wrong (or why it's correct if D is the answer)"
  ],
  "examTip": "A brief, memorable tip for the CPA exam (1 sentence)"
}

Requirements:
- Be concise but thorough
- Use plain language, avoid jargon
- Make wrong answer explanations specific to each option
- The educational note should teach the concept, not just restate the answer
- The exam tip should be practical and memorable

Return ONLY valid JSON, no markdown or extra text.`;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function enhanceFile(filePath, section, logStream) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  // Find export const - handle Question[], Type<T>, etc.
  const exportMatch = content.match(/export const (\w+)\s*(?::\s*\w+(?:\[\]|(?:<[^>]+>))?)?\s*=\s*\[/);
  if (!exportMatch) {
    logStream.write(`   Skipping ${fileName}: No export found\n`);
    return { enhanced: 0, skipped: 0, errors: 0 };
  }
  
  const exportName = exportMatch[1];
  
  // Extract questions array - find the `[` after `=`, not in type annotation
  const equalsIndex = content.indexOf('=', exportMatch.index);
  const arrayStart = content.indexOf('[', equalsIndex);
  let depth = 0;
  let arrayEnd = arrayStart;
  
  for (let i = arrayStart; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') depth--;
    if (depth === 0) {
      arrayEnd = i;
      break;
    }
  }
  
  const arrayContent = content.substring(arrayStart, arrayEnd + 1);
  
  // Parse questions
  let questions;
  try {
    const cleanedStr = arrayContent
      .replace(/\/\/.*$/gm, '')
      .replace(/,(\s*[}\]])/g, '$1');
    questions = eval(cleanedStr);
  } catch (e) {
    logStream.write(`   Error parsing ${fileName}: ${e.message}\n`);
    return { enhanced: 0, skipped: 0, errors: 1 };
  }
  
  logStream.write(`   Found ${questions.length} questions\n`);
  
  let enhanced = 0;
  let skipped = 0;
  let errors = 0;
  let newContent = content;
  
  for (const question of questions) {
    if (!question.id || !question.options || question.options.length !== 4) {
      continue;
    }
    
    // Skip if already enhanced
    if (question.wrongAnswerExplanations && question.wrongAnswerExplanations.length === 4) {
      skipped++;
      continue;
    }
    
    try {
      logStream.write(`   🔄 Enhancing: ${question.id}\n`);
      
      const prompt = buildPrompt(question, section);
      const response = await callGemini(prompt);
      
      // Parse JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON in response');
      }
      
      const enhancedData = JSON.parse(jsonMatch[0]);
      
      // Build replacement
      const wrongAnswerStr = JSON.stringify(enhancedData.wrongAnswerExplanations);
      const educationalNote = (enhancedData.educationalNote || '').replace(/'/g, "\\'").replace(/\n/g, ' ');
      const examTip = (enhancedData.examTip || '').replace(/'/g, "\\'").replace(/\n/g, ' ');
      const newExplanation = (enhancedData.explanation || question.explanation).replace(/'/g, "\\'").replace(/\n/g, ' ');
      
      // Update explanation
      const explPattern = new RegExp(
        `(id:\\s*['"]${question.id}['"][\\s\\S]*?explanation:\\s*)(['"\`])([^'"\`]*?)\\2`,
        's'
      );
      newContent = newContent.replace(explPattern, `$1'${newExplanation}'`);
      
      // Add new fields before the closing brace of this question
      const idPattern = new RegExp(
        `(id:\\s*['"]${question.id}['"][\\s\\S]*?explanation:\\s*['"\`][^'"\`]*['"\`])([,\\s]*)(\\})`,
        's'
      );
      
      if (!newContent.match(new RegExp(`id:\\s*['"]${question.id}['"][\\s\\S]*?wrongAnswerExplanations`))) {
        newContent = newContent.replace(idPattern, (match, before, comma, brace) => {
          return `${before},
    wrongAnswerExplanations: ${wrongAnswerStr},
    educationalNote: '${educationalNote}',
    examTip: '${examTip}'${comma}${brace}`;
        });
      }
      
      enhanced++;
      
      // Rate limit: 2 second delay between calls
      await sleep(2000);
      
    } catch (err) {
      logStream.write(`   ⚠️ Error enhancing question ${question.id}: ${err.message}\n`);
      errors++;
      await sleep(1000);
    }
  }
  
  // Write updated content
  if (enhanced > 0) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    logStream.write(`   ✅ Wrote ${enhanced} enhanced questions\n`);
  }
  
  return { enhanced, skipped, errors };
}

async function processSection(section, config, logStream) {
  const fullDir = path.join(__dirname, '..', config.dir);
  
  if (!fs.existsSync(fullDir)) {
    logStream.write(`❌ Directory not found: ${fullDir}\n`);
    return { enhanced: 0, skipped: 0, errors: 1, total: 0 };
  }
  
  const files = fs.readdirSync(fullDir).filter(f => f.startsWith(config.prefix) && f.endsWith('.ts'));
  logStream.write(`\n📂 Processing ${section}: ${files.length} files\n`);
  
  let totalEnhanced = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  
  for (const file of files) {
    logStream.write(`\n📂 Processing: ${file}\n`);
    const result = await enhanceFile(path.join(fullDir, file), section, logStream);
    totalEnhanced += result.enhanced;
    totalSkipped += result.skipped;
    totalErrors += result.errors;
  }
  
  return { 
    enhanced: totalEnhanced, 
    skipped: totalSkipped, 
    errors: totalErrors,
    total: totalEnhanced + totalSkipped 
  };
}

async function main() {
  const args = process.argv.slice(2);
  
  // Show status
  if (args.includes('--status')) {
    showStatus();
    return;
  }
  
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not set');
    process.exit(1);
  }
  
  // Determine which sections to process
  let sectionsToProcess = Object.keys(SECTIONS);
  if (args.length > 0 && !args[0].startsWith('--')) {
    sectionsToProcess = args.filter(s => SECTIONS[s.toUpperCase()]).map(s => s.toUpperCase());
    if (sectionsToProcess.length === 0) {
      console.error('Invalid section. Valid sections: AUD, REG, BAR, ISC, TCP');
      process.exit(1);
    }
  }
  
  console.log(`🚀 Enhancing sections: ${sectionsToProcess.join(', ')}`);
  console.log('Logs will be written to /tmp/enhance-{section}.log\n');
  
  const progress = loadProgress();
  
  for (const section of sectionsToProcess) {
    const logPath = `/tmp/enhance-${section.toLowerCase()}.log`;
    const logStream = fs.createWriteStream(logPath, { flags: 'a' });
    
    logStream.write(`\n${'='.repeat(60)}\n`);
    logStream.write(`Starting ${section} enhancement at ${new Date().toISOString()}\n`);
    logStream.write(`${'='.repeat(60)}\n`);
    
    progress.sections[section] = { status: 'in_progress', startedAt: new Date().toISOString() };
    saveProgress(progress);
    
    try {
      const result = await processSection(section, SECTIONS[section], logStream);
      
      progress.sections[section] = {
        status: 'complete',
        enhanced: result.enhanced,
        skipped: result.skipped,
        errors: result.errors,
        total: result.total,
        completedAt: new Date().toISOString(),
      };
      
      logStream.write(`\n📊 ${section} Summary\n`);
      logStream.write(`   Enhanced: ${result.enhanced}\n`);
      logStream.write(`   Already done: ${result.skipped}\n`);
      logStream.write(`   Errors: ${result.errors}\n`);
      
    } catch (err) {
      progress.sections[section] = {
        status: 'error',
        error: err.message,
      };
      logStream.write(`\n❌ Fatal error: ${err.message}\n`);
    }
    
    saveProgress(progress);
    logStream.end();
  }
  
  console.log('\n✅ All sections processed. Run with --status to see results.');
}

main().catch(console.error);
