#!/usr/bin/env node
/**
 * Add educational field to questions missing it
 * Target: EA (385), CMA (504), CIA (690) = ~1,165 questions
 */

const fs = require('fs');
const path = require('path');

// Load environment
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('ERROR: VITE_GEMINI_API_KEY not set in .env');
  process.exit(1);
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const PROGRESS_FILE = '/tmp/add-educational-progress.json';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callGemini(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 2048,
          }
        })
      });
      
      if (response.status === 429) {
        console.log(`  Rate limited, waiting 30s...`);
        await sleep(30000);
        continue;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (error) {
      console.log(`  API error: ${error.message}, retrying...`);
      await sleep(5000);
    }
  }
  return null;
}

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return { completed: [] };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function generateEducationalContent(questions) {
  // Batch process 3 questions at a time
  const prompt = `You are an expert exam prep instructor. For each question below, generate educational content.

${questions.map((q, i) => `
Question ${i + 1}:
Topic: ${q.topic}
Question: ${q.question}
Correct Answer: ${q.options[q.correctAnswer]}
Explanation: ${q.explanation}
`).join('\n')}

For EACH question, provide:
1. educational: A 2-3 sentence explanation of the underlying concept (not just the answer, but the broader principle)
2. examTip: A practical tip for answering similar questions on the exam
3. memoryAid: A mnemonic, acronym, or memory trick if applicable (or leave empty if none fits)

Return ONLY a JSON array with this structure:
[
  {
    "educational": "...",
    "examTip": "...", 
    "memoryAid": "..."
  }
]

Return exactly ${questions.length} objects in the array.`;

  const response = await callGemini(prompt);
  if (!response) return null;
  
  try {
    let jsonStr = response;
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }
    
    // Clean up JSON
    jsonStr = jsonStr
      .replace(/[\x00-\x1F\x7F]/g, ' ')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*\]/g, ']');
    
    return JSON.parse(jsonStr);
  } catch (e) {
    console.log(`  JSON parse error: ${e.message}`);
    return null;
  }
}

async function main() {
  console.log('=== Add Educational Fields ===\n');
  
  const progress = loadProgress();
  const completedSet = new Set(progress.completed);
  let totalAdded = 0;
  let totalFound = 0;
  
  // Process EA, CMA, CIA (the exams with missing educational fields)
  const targetExams = ['ea', 'cma', 'cia'];
  
  for (const exam of targetExams) {
    const examDir = path.join(CONTENT_DIR, exam);
    if (!fs.existsSync(examDir)) continue;
    
    // Find all questions.json files
    const sections = fs.readdirSync(examDir).filter(f => {
      const sectionPath = path.join(examDir, f, 'questions.json');
      return fs.existsSync(sectionPath);
    });
    
    for (const section of sections) {
      const questionsPath = path.join(examDir, section, 'questions.json');
      const data = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
      
      // Find questions missing educational field
      const missingEducational = data.questions.filter(q => 
        (!q.educational || q.educational === '') &&
        !completedSet.has(q.id)
      );
      
      if (missingEducational.length === 0) continue;
      
      console.log(`${exam.toUpperCase()}/${section}: ${missingEducational.length} missing educational`);
      totalFound += missingEducational.length;
      
      // Process in batches of 3
      const batchSize = 3;
      let sectionAdded = 0;
      
      for (let i = 0; i < missingEducational.length; i += batchSize) {
        const batch = missingEducational.slice(i, i + batchSize);
        console.log(`  Batch ${Math.floor(i / batchSize) + 1}: processing ${batch.length} questions...`);
        
        const results = await generateEducationalContent(batch);
        
        if (results && results.length === batch.length) {
          // Update questions
          for (let j = 0; j < batch.length; j++) {
            const q = batch[j];
            const idx = data.questions.findIndex(x => x.id === q.id);
            if (idx !== -1 && results[j]) {
              data.questions[idx].educational = results[j].educational || '';
              data.questions[idx].examTip = data.questions[idx].examTip || results[j].examTip || '';
              data.questions[idx].memoryAid = data.questions[idx].memoryAid || results[j].memoryAid || '';
              completedSet.add(q.id);
              progress.completed.push(q.id);
              sectionAdded++;
              totalAdded++;
            }
          }
          console.log(`    ✓ Added ${batch.length} educational fields`);
        } else {
          console.log(`    ✗ Failed batch`);
        }
        
        // Rate limit
        await sleep(4500);
        
        // Save progress every 10 questions
        if (sectionAdded % 10 === 0 || i + batchSize >= missingEducational.length) {
          saveProgress(progress);
          data.exportedAt = new Date().toISOString();
          fs.writeFileSync(questionsPath, JSON.stringify(data, null, 2));
        }
      }
      
      console.log(`  Saved ${sectionAdded} to ${section}`);
    }
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Found: ${totalFound} missing educational`);
  console.log(`Added: ${totalAdded}`);
}

main().catch(console.error);
