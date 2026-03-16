#!/usr/bin/env node
/**
 * Fix questions with duplicate answer options using Gemini
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
            temperature: 0.3,
            maxOutputTokens: 1024,
          }
        })
      });

      if (response.status === 429) {
        console.log(`Rate limited, waiting 30s (attempt ${attempt}/${retries})`);
        await sleep(30000);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      console.log(`Gemini error (attempt ${attempt}): ${error.message}`);
      if (attempt < retries) await sleep(5000);
    }
  }
  return null;
}

async function fixDuplicateOption(item) {
  const { question, options, dupeIndices, correctAnswer, exam, section } = item;
  
  // Find the duplicate value and the index to fix
  const dupeIdx = dupeIndices[0];
  const dupeValue = options[dupeIdx];
  
  const prompt = `You are a ${exam.toUpperCase()} exam question editor.

QUESTION: ${question}

CURRENT OPTIONS:
A) ${options[0]}
B) ${options[1]}
C) ${options[2]}
D) ${options[3]}

PROBLEM: Option ${String.fromCharCode(65 + dupeIdx)} is a duplicate of another option.
CORRECT ANSWER: Option ${String.fromCharCode(65 + correctAnswer)}

Generate a NEW unique option to replace Option ${String.fromCharCode(65 + dupeIdx)} that:
1. Is plausible but WRONG
2. Is different from all other options
3. Matches the style and format of the other options
4. Would be a reasonable distractor for someone who doesn't know the material

Respond with ONLY the replacement text for Option ${String.fromCharCode(65 + dupeIdx)}, nothing else.`;

  const response = await callGemini(prompt);
  if (!response) return null;
  
  // Clean up the response
  const newOption = response.trim().replace(/^[A-D]\)\s*/, '').replace(/^Option [A-D]:\s*/i, '');
  
  return { dupeIdx, newOption };
}

async function main() {
  const duplicates = JSON.parse(fs.readFileSync('/tmp/duplicate-options.json'));
  console.log(`Processing ${duplicates.length} questions with duplicate options...\n`);
  
  // Group by file for efficient updates
  const byFile = {};
  duplicates.forEach(d => {
    const key = `${d.exam}/${d.section}`;
    if (!byFile[key]) byFile[key] = [];
    byFile[key].push(d);
  });
  
  let fixed = 0;
  let errors = 0;
  
  for (const [fileKey, items] of Object.entries(byFile)) {
    const [exam, section] = fileKey.split('/');
    const jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
    const data = JSON.parse(fs.readFileSync(jsonPath));
    
    console.log(`Processing ${fileKey} (${items.length} questions)...`);
    
    for (const item of items) {
      const result = await fixDuplicateOption(item);
      
      if (result) {
        // Find the question by ID and update
        const q = data.questions.find(q => q.id === item.id);
        if (q) {
          const oldOpt = q.options[result.dupeIdx];
          q.options[result.dupeIdx] = result.newOption;
          console.log(`  Fixed ${item.id}: "${oldOpt}" -> "${result.newOption.slice(0, 40)}..."`);
          fixed++;
        }
      } else {
        console.log(`  Error fixing ${item.id}`);
        errors++;
      }
      
      // Rate limit
      await sleep(4500);
    }
    
    // Save file after processing all items in it
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`  Saved ${jsonPath}\n`);
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Fixed: ${fixed}`);
  console.log(`Errors: ${errors}`);
}

main().catch(console.error);
