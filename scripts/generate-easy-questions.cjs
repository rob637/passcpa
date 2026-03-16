#!/usr/bin/env node
/**
 * Generate easy difficulty questions for EA and CIA using Gemini
 * Takes existing medium/hard questions and creates simpler versions
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

const PROGRESS_FILE = '/tmp/generate-easy-progress.json';

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
            temperature: 0.7,
            maxOutputTokens: 2048,
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

function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    }
  } catch (e) {}
  return { generated: {}, completed: [] };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function generateEasyQuestions(exam, section, count, existingQuestions) {
  // Get unique topics and blueprint areas from existing questions
  const topics = [...new Set(existingQuestions.map(q => q.topic).filter(Boolean))];
  const blueprints = [...new Set(existingQuestions.map(q => q.blueprintArea).filter(Boolean))];
  
  // Sample some existing questions for context
  const sampleHard = existingQuestions
    .filter(q => q.difficulty === 'hard' || q.difficulty === 'medium')
    .slice(0, 5);
  
  const prompt = `You are a ${exam.toUpperCase()} exam question writer specializing in the ${section.toUpperCase()} section.

TASK: Generate ${count} NEW easy-difficulty multiple choice questions.

TOPICS TO COVER: ${topics.slice(0, 10).join(', ')}
BLUEPRINT AREAS: ${blueprints.slice(0, 5).join(', ')}

EXAMPLE EXISTING QUESTIONS (for style reference):
${sampleHard.map(q => `Q: ${q.question}\nA) ${q.options[0]}\nB) ${q.options[1]}\nC) ${q.options[2]}\nD) ${q.options[3]}\nCorrect: ${String.fromCharCode(65 + q.correctAnswer)}`).join('\n\n')}

REQUIREMENTS FOR EASY QUESTIONS:
1. Test basic recall and fundamental concepts
2. Use clear, straightforward language
3. One concept per question (no multi-step reasoning)
4. Avoid trick questions or nuanced scenarios
5. Options should be clearly distinguishable
6. All 4 options must be different

Respond with EXACTLY ${count} questions in this JSON format:
[
  {
    "question": "Full question text here?",
    "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
    "correctAnswer": 0,
    "explanation": "The correct answer is A because... (2-3 sentences)",
    "topic": "${topics[0] || 'General'}",
    "blueprintArea": "${blueprints[0] || section.toUpperCase()}"
  }
]

Return ONLY valid JSON array, no markdown code blocks.`;

  const response = await callGemini(prompt);
  if (!response) return [];
  
  try {
    // Extract JSON from response
    let jsonStr = response;
    // Remove markdown code blocks if present
    jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    const questions = JSON.parse(jsonStr);
    
    // Validate and enhance
    return questions.map((q, i) => ({
      ...q,
      id: `${section}-easy-gen-${Date.now()}-${i}`,
      version: 1,
      status: 'approved',
      courseId: exam,
      section: section.toUpperCase(),
      difficulty: 'easy',
      skillLevel: 'Remembering',
      blueprintArea: q.blueprintArea || blueprints[0] || section.toUpperCase(),
      topic: q.topic || topics[Math.floor(Math.random() * topics.length)] || 'General',
      whyWrong: {
        '0': q.correctAnswer !== 0 ? `Option A is incorrect. ${q.explanation.split('.')[0]}.` : undefined,
        '1': q.correctAnswer !== 1 ? `Option B is incorrect. ${q.explanation.split('.')[0]}.` : undefined,
        '2': q.correctAnswer !== 2 ? `Option C is incorrect. ${q.explanation.split('.')[0]}.` : undefined,
        '3': q.correctAnswer !== 3 ? `Option D is incorrect. ${q.explanation.split('.')[0]}.` : undefined,
      }
    })).filter(q => 
      q.question && 
      q.options && 
      q.options.length === 4 && 
      typeof q.correctAnswer === 'number' &&
      q.correctAnswer >= 0 && q.correctAnswer <= 3
    );
  } catch (e) {
    console.log(`JSON parse error: ${e.message}`);
    return [];
  }
}

async function main() {
  const targets = [
    { exam: 'ea', section: 'see1', need: 89 },
    { exam: 'ea', section: 'see2', need: 165 },
    { exam: 'ea', section: 'see3', need: 131 },
    { exam: 'cia', section: 'cia1', need: 54 },
    { exam: 'cia', section: 'cia2', need: 52 },
    { exam: 'cia', section: 'cia3', need: 81 },
  ];
  
  const progress = loadProgress();
  let totalGenerated = 0;
  
  for (const { exam, section, need } of targets) {
    const key = `${exam}/${section}`;
    if (progress.completed.includes(key)) {
      console.log(`Skipping ${key} (already completed)`);
      continue;
    }
    
    const jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
    const data = JSON.parse(fs.readFileSync(jsonPath));
    const existingQuestions = data.questions || [];
    
    console.log(`\nGenerating ${need} easy questions for ${key}...`);
    
    // Generate in batches of 10 (API returns better results in smaller batches)
    let generated = progress.generated[key] || [];
    const batchSize = 10;
    
    while (generated.length < need) {
      const remaining = need - generated.length;
      const batchCount = Math.min(batchSize, remaining);
      
      console.log(`  Batch: generating ${batchCount} (${generated.length}/${need} done)`);
      
      const newQuestions = await generateEasyQuestions(exam, section, batchCount, existingQuestions);
      generated.push(...newQuestions);
      
      // Save progress after each batch
      progress.generated[key] = generated;
      saveProgress(progress);
      
      console.log(`  Got ${newQuestions.length} valid questions`);
      
      // Rate limit between batches
      await sleep(5000);
    }
    
    // Add generated questions to the file
    data.questions.push(...generated);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    
    console.log(`  Saved ${generated.length} new easy questions to ${key}`);
    totalGenerated += generated.length;
    
    progress.completed.push(key);
    saveProgress(progress);
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Total generated: ${totalGenerated}`);
}

main().catch(console.error);
