#!/usr/bin/env node
/**
 * Generate new questions for CMA and CIA to reach competitive parity
 * Target: +500 CMA and +500 CIA questions
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

const PROGRESS_FILE = '/tmp/generate-cma-cia-progress.json';

// Target questions per section (proportional to existing)
const TARGETS = {
  cma: {
    cma1: 250, // CMA Part 1: Financial Planning, Performance, and Analytics
    cma2: 250, // CMA Part 2: Strategic Financial Management
  },
  cia: {
    cia1: 170, // CIA Part 1: Essentials of Internal Auditing
    cia2: 165, // CIA Part 2: Practice of Internal Auditing
    cia3: 165, // CIA Part 3: Business Knowledge for Internal Auditing
  }
};

// Blueprint topics for each section
const BLUEPRINTS = {
  cma1: [
    'External Financial Reporting Decisions',
    'Planning, Budgeting, and Forecasting',
    'Performance Management',
    'Cost Management',
    'Internal Controls',
  ],
  cma2: [
    'Financial Statement Analysis',
    'Corporate Finance',
    'Decision Analysis',
    'Risk Management',
    'Investment Decisions',
    'Professional Ethics',
  ],
  cia1: [
    'Foundations of Internal Auditing',
    'Independence and Objectivity',
    'Proficiency and Due Professional Care',
    'Quality Assurance and Improvement Program',
    'Governance, Risk Management, and Control',
    'Fraud Risks',
  ],
  cia2: [
    'Managing the Internal Audit Activity',
    'Planning the Engagement',
    'Performing the Engagement',
    'Communicating Results',
    'Monitoring Progress',
  ],
  cia3: [
    'Business Acumen',
    'Information Security',
    'Information Technology',
    'Financial Management',
  ],
};

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
            maxOutputTokens: 4096,
          }
        })
      });

      if (response.status === 429) {
        console.log(`Rate limited, waiting 60s (attempt ${attempt}/${retries})`);
        await sleep(60000);
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

async function generateQuestionBatch(exam, section, batchNum, blueprints) {
  const difficulties = ['easy', 'medium', 'medium', 'hard']; // 25/50/25 distribution via weighted
  const topic = blueprints[batchNum % blueprints.length];
  
  const examNames = {
    cma: 'CMA (Certified Management Accountant)',
    cia: 'CIA (Certified Internal Auditor)'
  };
  
  const prompt = `You are a ${examNames[exam]} exam question writer for ${section.toUpperCase()}.

TOPIC: ${topic}

Generate 5 multiple choice questions with the following distribution:
- 1 easy question (basic recall)
- 3 medium questions (application and analysis)
- 1 hard question (complex scenario)

REQUIREMENTS:
1. Each question must have exactly 4 distinct options
2. Include detailed explanations (2-3 sentences)
3. Questions should be challenging enough for professional certification
4. No duplicate answer options within a question
5. Cover different aspects of the topic

Return EXACTLY this JSON format (no markdown, just raw JSON):
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation here.",
    "difficulty": "easy",
    "topic": "${topic}",
    "skillLevel": "Remembering"
  },
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 1,
    "explanation": "Detailed explanation here.",
    "difficulty": "medium",
    "topic": "${topic}",
    "skillLevel": "Application"
  }
]

Generate all 5 questions now.`;

  const response = await callGemini(prompt);
  if (!response) return [];
  
  try {
    let jsonStr = response.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const questions = JSON.parse(jsonStr);
    
    return questions.map((q, i) => ({
      id: `${section}-gen-${Date.now()}-${batchNum}-${i}`,
      version: 1,
      status: 'approved',
      courseId: exam,
      section: section.toUpperCase(),
      blueprintArea: section.toUpperCase(),
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty || 'medium',
      topic: q.topic || topic,
      skillLevel: q.skillLevel || 'Application',
      whyWrong: {
        ...(q.correctAnswer !== 0 ? { '0': `Option A is incorrect. ${q.explanation.split('.')[0]}.` } : {}),
        ...(q.correctAnswer !== 1 ? { '1': `Option B is incorrect. ${q.explanation.split('.')[0]}.` } : {}),
        ...(q.correctAnswer !== 2 ? { '2': `Option C is incorrect. ${q.explanation.split('.')[0]}.` } : {}),
        ...(q.correctAnswer !== 3 ? { '3': `Option D is incorrect. ${q.explanation.split('.')[0]}.` } : {}),
      }
    })).filter(q => 
      q.question && 
      q.options?.length === 4 && 
      new Set(q.options.map(o => o.toLowerCase().trim())).size === 4 &&
      typeof q.correctAnswer === 'number' &&
      q.correctAnswer >= 0 && q.correctAnswer <= 3
    );
  } catch (e) {
    console.log(`JSON parse error: ${e.message}`);
    return [];
  }
}

async function main() {
  const progress = loadProgress();
  let totalGenerated = 0;
  
  for (const [exam, sections] of Object.entries(TARGETS)) {
    for (const [section, target] of Object.entries(sections)) {
      const key = `${exam}/${section}`;
      
      if (progress.completed.includes(key)) {
        console.log(`Skipping ${key} (already completed)`);
        continue;
      }
      
      const jsonPath = path.join(__dirname, '..', 'content', exam, section, 'questions.json');
      const data = JSON.parse(fs.readFileSync(jsonPath));
      
      console.log(`\nGenerating ${target} questions for ${key}...`);
      
      let generated = progress.generated[key] || [];
      const blueprints = BLUEPRINTS[section] || [section.toUpperCase()];
      let batchNum = Math.floor(generated.length / 5);
      
      while (generated.length < target) {
        const remaining = target - generated.length;
        console.log(`  Batch ${batchNum + 1}: generating 5 (${generated.length}/${target} done)`);
        
        const newQuestions = await generateQuestionBatch(exam, section, batchNum, blueprints);
        generated.push(...newQuestions);
        
        progress.generated[key] = generated;
        saveProgress(progress);
        
        console.log(`  Got ${newQuestions.length} valid questions`);
        
        batchNum++;
        await sleep(5000);
      }
      
      // Add to file
      data.questions.push(...generated);
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
      
      console.log(`  Saved ${generated.length} questions to ${key}`);
      totalGenerated += generated.length;
      
      progress.completed.push(key);
      saveProgress(progress);
    }
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Total generated: ${totalGenerated}`);
}

main().catch(console.error);
