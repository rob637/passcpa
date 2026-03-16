#!/usr/bin/env node
/**
 * Fix short explanations (<100 chars) by expanding them with Gemini
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
const PROGRESS_FILE = '/tmp/fix-short-explanations-progress.json';

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
  return { fixed: [] };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function expandExplanation(question) {
  const prompt = `You are a CPA exam expert. This question has a short explanation that needs to be expanded.

Question: ${question.question}

Options:
A) ${question.options[0]}
B) ${question.options[1]}
C) ${question.options[2]}
D) ${question.options[3]}

Correct Answer: ${['A', 'B', 'C', 'D'][question.correctAnswer]}

Current short explanation: "${question.explanation}"

Write an expanded explanation (150-300 characters) that:
1. States why the correct answer is right
2. Provides the key concept or rule
3. Is professional and educational

Return ONLY the expanded explanation text, no quotes or formatting.`;

  const response = await callGemini(prompt);
  if (!response) return null;
  
  // Clean up the response
  let explanation = response.trim();
  // Remove quotes if wrapped
  explanation = explanation.replace(/^["']|["']$/g, '');
  // Ensure it's longer than original and reasonable length
  if (explanation.length > question.explanation.length && explanation.length < 500) {
    return explanation;
  }
  return null;
}

async function main() {
  console.log('=== Fix Short Explanations ===\n');
  
  const progress = loadProgress();
  const fixedSet = new Set(progress.fixed);
  let totalFixed = 0;
  let totalFound = 0;
  
  // Find all question files
  const exams = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
  
  for (const exam of exams) {
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
      
      // Find questions with short explanations
      const shortExplanations = data.questions.filter(q => 
        q.explanation && 
        q.explanation.length < 100 &&
        !fixedSet.has(q.id)
      );
      
      if (shortExplanations.length === 0) continue;
      
      console.log(`${exam.toUpperCase()}/${section}: ${shortExplanations.length} short explanations`);
      totalFound += shortExplanations.length;
      
      let modified = false;
      
      for (const q of shortExplanations) {
        console.log(`  Fixing ${q.id} (${q.explanation.length} chars)...`);
        
        const expanded = await expandExplanation(q);
        if (expanded) {
          // Find and update the question in the array
          const idx = data.questions.findIndex(x => x.id === q.id);
          if (idx !== -1) {
            data.questions[idx].explanation = expanded;
            fixedSet.add(q.id);
            progress.fixed.push(q.id);
            modified = true;
            totalFixed++;
            console.log(`    ✓ Expanded to ${expanded.length} chars`);
          }
        } else {
          console.log(`    ✗ Failed to expand`);
        }
        
        // Rate limit
        await sleep(4500);
        
        // Save progress periodically
        if (totalFixed % 5 === 0) {
          saveProgress(progress);
          if (modified) {
            data.exportedAt = new Date().toISOString();
            fs.writeFileSync(questionsPath, JSON.stringify(data, null, 2));
          }
        }
      }
      
      // Save final changes for this section
      if (modified) {
        data.exportedAt = new Date().toISOString();
        fs.writeFileSync(questionsPath, JSON.stringify(data, null, 2));
        saveProgress(progress);
      }
    }
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Found: ${totalFound} short explanations`);
  console.log(`Fixed: ${totalFixed}`);
}

main().catch(console.error);
