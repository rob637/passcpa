#!/usr/bin/env node
/**
 * qbank-enhance: AI-enhance questions with UWorld-style explanations
 * 
 * Uses Gemini to add:
 * - whyWrong: Explanations for each wrong answer
 * - educational: Teaching the underlying concept
 * - examTip: Practical exam-day advice
 * - memoryAid: Mnemonic or memory trick
 * 
 * Safety features:
 * - Works on JSON (not TypeScript) - easy to validate
 * - Validates JSON after each enhancement
 * - Backup before changes
 * - Progress tracking with resume capability
 * - Rate limiting to avoid 429 errors
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'content/cpa');
const PROGRESS_FILE = path.join(PROJECT_ROOT, 'content', '.enhance-progress.json');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SECTIONS = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

// Parse args
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerbose = args.includes('--verbose');
const doResume = args.includes('--resume');
const doAll = args.includes('--all');
const doDeepen = args.includes('--deepen'); // Re-enhance shallow explanations (<80 chars)
const limitArg = args.find(a => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : null;
const sectionArg = args.find(a => !a.startsWith('-') && SECTIONS.includes(a.toUpperCase()));

let sectionsToEnhance = [];
if (doAll) {
  sectionsToEnhance = SECTIONS;
} else if (sectionArg) {
  sectionsToEnhance = [sectionArg.toUpperCase()];
} else {
  console.log('Usage: node qbank-enhance.cjs <section> [--all] [--limit=N] [--dry-run] [--resume] [--deepen]');
  console.log('Sections: FAR, AUD, REG, BAR, ISC, TCP');
  console.log('\nSet GEMINI_API_KEY environment variable first.');
  process.exit(1);
}

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not set');
  console.log('Run: export GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env | cut -d"=" -f2)');
  process.exit(1);
}

// Progress tracking
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  }
  return { enhanced: [], errors: [], lastRun: null };
}

function saveProgress(progress) {
  progress.lastRun = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf-8');
}

// Sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// AI prompt
function buildPrompt(question) {
  const optionLabels = ['A', 'B', 'C', 'D'];
  const correctLetter = optionLabels[question.correctAnswer];
  
  return `You are creating UWorld-style CPA exam explanations. Given this question, generate enhanced explanations.

QUESTION:
${question.question}

OPTIONS:
A) ${question.options[0]}
B) ${question.options[1]}
C) ${question.options[2]}
D) ${question.options[3]}

CORRECT ANSWER: ${correctLetter}

EXISTING EXPLANATION:
${question.explanation}

Generate a JSON object with these fields:
{
  "whyWrong": {
    "0": "Why option A is ${question.correctAnswer === 0 ? 'CORRECT - explain the key concept' : 'WRONG - specific reason'}",
    "1": "Why option B is ${question.correctAnswer === 1 ? 'CORRECT - explain the key concept' : 'WRONG - specific reason'}",
    "2": "Why option C is ${question.correctAnswer === 2 ? 'CORRECT - explain the key concept' : 'WRONG - specific reason'}",
    "3": "Why option D is ${question.correctAnswer === 3 ? 'CORRECT - explain the key concept' : 'WRONG - specific reason'}"
  },
  "educational": "2-4 sentences teaching the underlying concept, not just restating the answer",
  "examTip": "One practical sentence for exam day",
  "memoryAid": "A mnemonic, acronym, or memorable phrase (optional, only if helpful)"
}

Requirements:
- Be concise but thorough (each whyWrong: 1-2 sentences)
- Use plain language, avoid unnecessary jargon
- Educational note should teach, not just explain the answer
- Exam tip should be actionable
- Memory aid is optional - only include if genuinely helpful

Return ONLY valid JSON, no markdown formatting.`;
}

// Call Gemini API
async function callGemini(prompt) {
  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
      },
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${error}`);
  }
  
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('Empty response from Gemini');
  }
  
  // Parse JSON from response (handle markdown code blocks)
  let jsonStr = text;
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1];
  }
  
  return JSON.parse(jsonStr.trim());
}

// Enhance a single question
async function enhanceQuestion(question) {
  const prompt = buildPrompt(question);
  const enhancement = await callGemini(prompt);
  
  // Validate enhancement structure
  if (!enhancement.whyWrong || typeof enhancement.whyWrong !== 'object') {
    throw new Error('Invalid enhancement: missing whyWrong');
  }
  
  // Merge enhancement into question
  return {
    ...question,
    whyWrong: enhancement.whyWrong,
    educational: enhancement.educational,
    examTip: enhancement.examTip,
    memoryAid: enhancement.memoryAid || question.memoryAid,
    version: (question.version || 1) + 1,
    updatedAt: new Date().toISOString().split('T')[0],
  };
}

// Main enhance function
async function enhance() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║           VoraPrep AI Question Enhancement                    ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  
  if (isDryRun) {
    console.log('🔍 DRY RUN - No files will be modified\n');
  }
  
  const progress = doResume ? loadProgress() : { enhanced: [], errors: [], lastRun: null };
  const alreadyEnhanced = new Set(progress.enhanced);
  
  for (const section of sectionsToEnhance) {
    console.log(`\n📂 Processing ${section}...`);
    
    const jsonPath = path.join(CONTENT_DIR, section.toLowerCase(), 'questions.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.log(`   ⚠️  Not migrated yet. Run: node scripts/qbank-migrate.cjs ${section}`);
      continue;
    }
    
    // Create backup
    const backupPath = jsonPath.replace('.json', `.backup-${Date.now()}.json`);
    if (!isDryRun) {
      fs.copyFileSync(jsonPath, backupPath);
    }
    
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const questions = data.questions || [];
    
    // Find questions needing enhancement
    const toEnhance = questions.filter(q => {
      // Skip if already enhanced this session
      if (alreadyEnhanced.has(q.id)) return false;
      
      // Check if missing educational content
      const hasEducational = q.educational && String(q.educational).length >= 50;
      if (!hasEducational) return true; // Always enhance if missing educational
      
      // Skip if already has full UWorld-style content
      if (q.whyWrong && Object.keys(q.whyWrong).length >= 3) {
        // If --deepen flag, check if any explanation is too shallow (<80 chars)
        if (doDeepen) {
          const vals = Object.values(q.whyWrong).filter(v => v);
          const isShallow = vals.length === 0 || vals.some(v => String(v).length < 80);
          if (isShallow) return true; // Re-enhance shallow ones
        }
        return false;
      }
      return true;
    });
    
    const processCount = limit ? Math.min(limit, toEnhance.length) : toEnhance.length;
    console.log(`   Found ${toEnhance.length} questions needing enhancement, processing ${processCount}`);
    
    let enhanced = 0;
    let errors = 0;
    
    for (let i = 0; i < processCount; i++) {
      const q = toEnhance[i];
      
      if (isVerbose) {
        console.log(`   🔄 Enhancing: ${q.id} (${i + 1}/${processCount})`);
      }
      
      try {
        const enhancedQ = await enhanceQuestion(q);
        
        // Update in array
        const idx = questions.findIndex(qq => qq.id === q.id);
        if (idx >= 0 && !isDryRun) {
          questions[idx] = enhancedQ;
        }
        
        progress.enhanced.push(q.id);
        alreadyEnhanced.add(q.id);
        enhanced++;
        
        if (isVerbose) {
          console.log(`   ✅ Enhanced: ${q.id}`);
        }
        
        // Rate limiting: 2 seconds between calls to avoid 429
        if (i < processCount - 1) {
          await sleep(2000);
        }
        
        // Save progress periodically
        if (enhanced % 10 === 0 && !isDryRun) {
          data.questions = questions;
          fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
          saveProgress(progress);
        }
        
      } catch (error) {
        errors++;
        progress.errors.push({ id: q.id, error: error.message });
        console.log(`   ❌ Error with ${q.id}: ${error.message}`);
        
        // If rate limited, wait longer
        if (error.message.includes('429')) {
          console.log('   ⏳ Rate limited, waiting 30 seconds...');
          await sleep(30000);
        }
      }
    }
    
    // Final save
    if (!isDryRun && enhanced > 0) {
      data.questions = questions;
      data.lastEnhanced = new Date().toISOString();
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
    }
    
    console.log(`   ✅ Enhanced: ${enhanced}, ❌ Errors: ${errors}`);
    
    // Clean up backup if successful
    if (!isDryRun && errors === 0 && fs.existsSync(backupPath)) {
      fs.unlinkSync(backupPath);
    }
  }
  
  // Save final progress
  if (!isDryRun) {
    saveProgress(progress);
  }
  
  console.log('\n✅ Enhancement complete!');
  console.log(`   Total enhanced this session: ${progress.enhanced.length}`);
  if (progress.errors.length > 0) {
    console.log(`   Errors: ${progress.errors.length}`);
  }
}

// Run
enhance().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
