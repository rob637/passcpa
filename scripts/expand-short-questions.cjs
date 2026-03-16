#!/usr/bin/env node
/**
 * Expand Short Questions with Realistic Scenarios
 * 
 * Transforms short questions (<100 chars) into world-class scenario-based questions
 * with company names, specific amounts, and realistic exam context.
 * 
 * Usage:
 *   node scripts/expand-short-questions.cjs --exam cpa
 *   node scripts/expand-short-questions.cjs --all
 *   node scripts/expand-short-questions.cjs --resume
 */

const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const BATCH_SIZE = 8;
const DELAY_MS = 2000;
const PROGRESS_FILE = 'content/.expand-progress.json';
const MIN_QUESTION_LENGTH = 100;

// ============================================================================
// PROGRESS
// ============================================================================

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return { completed: {}, stats: { expanded: 0, skipped: 0 } };
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
          temperature: 0.4,
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
// EXPANSION LOGIC
// ============================================================================

async function expandQuestions(questions, exam, section) {
  const questionsText = questions.map((q, i) => `
Q${i + 1}:
ID: ${q.id}
Topic: ${q.topic}
Difficulty: ${q.difficulty}
Original: ${q.question}
Options: A) ${q.options[0]} | B) ${q.options[1]} | C) ${q.options[2]} | D) ${q.options[3]}
Correct: ${['A','B','C','D'][q.correctAnswer]}
`).join('\n---\n');

  const prompt = `You are an expert ${exam.toUpperCase()} exam question writer. Transform these SHORT questions into WORLD-CLASS scenario-based questions.

REQUIREMENTS:
1. Add a realistic company/client name (e.g., "Meridian Corp", "Chen & Associates", "Vista Healthcare LLC")
2. Include specific dollar amounts, dates, or percentages where appropriate
3. Create a mini-scenario (2-3 sentences) before asking the actual question
4. Keep the question testing the EXACT same concept - don't change what's being tested
5. Keep the same options and correct answer - only expand the question text
6. Target length: 150-300 characters
7. Use professional exam language ("Which of the following...", "Under GAAP...", etc.)

EXAMPLES OF GOOD EXPANSIONS:

SHORT: "When is revenue recognized under ASC 606?"
EXPANDED: "Quantum Software Inc. licenses its enterprise software to clients with a 3-year term. The license includes updates and technical support. Under ASC 606, when should Quantum recognize revenue from the software license?"

SHORT: "What is the correct treatment for goodwill?"
EXPANDED: "On January 1, Year 1, Pacific Holdings acquired 100% of Coastal Corp for $5 million. The fair value of identifiable net assets was $4.2 million. Under GAAP, how should Pacific Holdings account for the resulting goodwill in subsequent periods?"

QUESTIONS TO EXPAND:
${questionsText}

Respond in JSON format:
{
  "expansions": [
    {"qIndex": 0, "expanded": "The full expanded question text..."},
    {"qIndex": 1, "expanded": "..."},
    ...
  ]
}

CRITICAL: Preserve the original testing intent. The expanded question must have the SAME correct answer.`;

  const response = await callGemini(prompt);
  
  const jsonMatch = response.match(/\{[\s\S]*"expansions"[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON in response');
  }
  
  return JSON.parse(jsonMatch[0]).expansions || [];
}

// ============================================================================
// PROCESSING
// ============================================================================

async function processSection(exam, section, progress) {
  const filePath = `content/${exam}/${section}/questions.json`;
  if (!fs.existsSync(filePath)) {
    return { processed: 0, expanded: 0 };
  }
  
  const progressKey = `${exam}/${section}`;
  const completedIds = new Set(progress.completed?.[progressKey] || []);
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const questions = data.questions;
  
  // Find short questions that need expansion
  const shortQuestions = questions.filter(q => 
    q.question.length < MIN_QUESTION_LENGTH && 
    !completedIds.has(q.id)
  );
  
  if (shortQuestions.length === 0) {
    console.log(`  ${section.toUpperCase()}: No short questions to expand`);
    return { processed: 0, expanded: 0 };
  }
  
  console.log(`  ${section.toUpperCase()}: ${shortQuestions.length} short questions to expand`);
  
  let expanded = 0;
  
  // Process in batches
  for (let i = 0; i < shortQuestions.length; i += BATCH_SIZE) {
    const batch = shortQuestions.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(shortQuestions.length / BATCH_SIZE);
    
    process.stdout.write(`    Batch ${batchNum}/${totalBatches}...`);
    
    try {
      const expansions = await expandQuestions(batch, exam, section);
      
      for (const exp of expansions) {
        const originalQ = batch[exp.qIndex];
        if (!originalQ) continue;
        
        // Find the question in the main array and update it
        const mainQ = questions.find(q => q.id === originalQ.id);
        if (mainQ && exp.expanded && exp.expanded.length > mainQ.question.length) {
          mainQ.question = exp.expanded;
          expanded++;
          
          // Track completion
          if (!progress.completed[progressKey]) {
            progress.completed[progressKey] = [];
          }
          progress.completed[progressKey].push(originalQ.id);
        }
      }
      
      console.log(` expanded ${expansions.length}`);
      
      // Save after each batch
      saveProgress(progress);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
    }
    
    await new Promise(r => setTimeout(r, DELAY_MS));
  }
  
  return { processed: shortQuestions.length, expanded };
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
  
  console.log('=== Expand Short Questions ===');
  console.log(`Resume: ${resume ? 'Yes' : 'No'}`);
  console.log('');
  
  const progress = resume ? loadProgress() : { completed: {}, stats: {} };
  
  const exams = doAll || !examFilter 
    ? ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp']
    : [examFilter];
  
  let totalExpanded = 0;
  
  for (const exam of exams) {
    const examDir = `content/${exam}`;
    if (!fs.existsSync(examDir)) continue;
    
    console.log(`\n${exam.toUpperCase()}:`);
    
    const sections = fs.readdirSync(examDir).filter(d => 
      fs.statSync(path.join(examDir, d)).isDirectory()
    );
    
    for (const section of sections) {
      const result = await processSection(exam, section, progress);
      totalExpanded += result.expanded;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`Total expanded: ${totalExpanded} questions`);
}

main().catch(console.error);
