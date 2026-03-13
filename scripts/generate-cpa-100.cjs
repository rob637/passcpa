#!/usr/bin/env node
/**
 * Generate 100 CPA questions to hit 9,000 milestone
 * ~17 per section across FAR, AUD, REG, TCP, ISC, BAR
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

const PROGRESS_FILE = '/tmp/generate-cpa-100-progress.json';

// Target ~17 per section
const TARGETS = {
  far: 17,
  aud: 17,
  reg: 17,
  tcp: 17,
  isc: 16,
  bar: 16, // = 100 total
};

// Blueprint areas for each section
const BLUEPRINTS = {
  far: ['FAR-I', 'FAR-II', 'FAR-III', 'FAR-IV', 'FAR-V'],
  aud: ['AUD-I', 'AUD-II', 'AUD-III', 'AUD-IV'],
  reg: ['REG-I', 'REG-II', 'REG-III', 'REG-IV', 'REG-V'],
  tcp: ['TCP-I', 'TCP-II', 'TCP-III', 'TCP-IV'],
  isc: ['ISC-I', 'ISC-II', 'ISC-III', 'ISC-IV'],
  bar: ['BAR-I', 'BAR-II', 'BAR-III', 'BAR-IV'],
};

const SECTION_TOPICS = {
  far: [
    'Conceptual Framework and Standards',
    'Revenue Recognition (ASC 606)',
    'Leases (ASC 842)',
    'Inventory Valuation',
    'Fixed Assets and Depreciation',
    'Intangible Assets and Goodwill',
    'Investments and Fair Value',
    'Stockholders Equity',
    'Earnings Per Share',
    'Statement of Cash Flows',
    'Financial Statement Analysis',
    'Government Accounting (GASB)',
    'Not-for-Profit Accounting',
  ],
  aud: [
    'Audit Planning and Risk Assessment',
    'Internal Control Evaluation',
    'Audit Evidence and Procedures',
    'Audit Sampling',
    'Audit Reports and Modifications',
    'Review and Compilation Engagements',
    'Ethics and Independence',
    'Quality Control Standards',
    'Fraud Detection and Response',
  ],
  reg: [
    'Individual Taxation - Income',
    'Individual Taxation - Deductions',
    'Individual Taxation - Credits',
    'Property Transactions - Basis',
    'Property Transactions - Gains/Losses',
    'Corporate Taxation',
    'Partnership Taxation',
    'S Corporation Taxation',
    'Estate and Gift Tax',
    'Business Law - Contracts',
    'Business Law - Agency',
    'Business Law - UCC',
  ],
  tcp: [
    'Tax Compliance - Individual',
    'Tax Compliance - Business',
    'Tax Planning Strategies',
    'Entity Selection',
    'Retirement Plan Taxation',
    'Compensation Planning',
    'Wealth Transfer Planning',
  ],
  isc: [
    'IT General Controls',
    'Cybersecurity Frameworks',
    'Data Analytics and Automation',
    'System Development Life Cycle',
    'IT Governance',
    'Cloud Computing Controls',
    'Business Continuity Planning',
  ],
  bar: [
    'Business Analysis - Budgeting',
    'Variance Analysis',
    'Financial Modeling',
    'Data Analytics',
    'Prospective Financial Information',
    'Business Valuation',
    'Economic Analysis',
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
        console.log(`  Rate limited, waiting 30s (attempt ${attempt}/${retries})`);
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
  return { completed: {} };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function generateQuestions(section, count) {
  const sectionUpper = section.toUpperCase();
  const topics = SECTION_TOPICS[section];
  const blueprints = BLUEPRINTS[section];
  const difficulties = ['easy', 'medium', 'hard'];
  
  const prompt = `Generate ${count} unique CPA exam multiple-choice questions for the ${sectionUpper} section.

Requirements:
1. Questions must be CPA exam quality - challenging and professional
2. Mix difficulty levels: easy (20%), medium (50%), hard (30%)
3. Include realistic business scenarios with company names
4. Each question needs 4 answer options
5. CRITICAL: Do NOT include letter prefixes (A., B., C., D.) in the options text - just the answer content
6. Provide comprehensive explanations for the correct answer
7. Explain why each wrong answer is incorrect

Topics to cover: ${topics.join(', ')}
Blueprint areas: ${blueprints.join(', ')}

Return ONLY a valid JSON array with this exact structure for each question:
[
  {
    "question": "Full question text with scenario",
    "options": ["First option text", "Second option text", "Third option text", "Fourth option text"],
    "correctAnswer": 0,
    "explanation": "Detailed explanation of why the correct answer is right",
    "difficulty": "easy|medium|hard",
    "topic": "Topic name",
    "blueprintArea": "${blueprints[0]}",
    "whyWrong": {
      "0": "Why option A is correct/wrong",
      "1": "Why option B is wrong",
      "2": "Why option C is wrong", 
      "3": "Why option D is wrong"
    },
    "educational": "Key concept explanation",
    "examTip": "Exam strategy tip",
    "memoryAid": "Mnemonic or memory aid"
  }
]

Generate exactly ${count} questions. Return ONLY the JSON array, no markdown or explanations.`;

  const response = await callGemini(prompt);
  if (!response) return [];
  
  try {
    // Extract JSON from response
    let jsonStr = response;
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }
    
    // Fix common JSON issues from LLM responses
    jsonStr = jsonStr
      .replace(/[\x00-\x1F\x7F]/g, ' ')  // Remove control characters
      .replace(/\n\s*\n/g, '\n')         // Collapse multiple newlines
      .replace(/,\s*}/g, '}')            // Remove trailing commas in objects
      .replace(/,\s*\]/g, ']')           // Remove trailing commas in arrays
      .replace(/\\\n/g, '\\n')           // Fix literal backslash-newline
      .replace(/(?<!\\)\\(?!["\\/bfnrtu])/g, '\\\\'); // Escape unescaped backslashes
    
    const questions = JSON.parse(jsonStr);
    
    // Strip any letter prefixes (A., B., etc.) from options - safety net
    const LETTER_PREFIX_REGEX = /^[A-D]\.\s+/;
    const cleanedQuestions = questions.map(q => {
      if (Array.isArray(q.options)) {
        q.options = q.options.map(opt => 
          typeof opt === 'string' ? opt.replace(LETTER_PREFIX_REGEX, '') : opt
        );
      }
      return q;
    });
    
    return cleanedQuestions.filter(q => 
      q.question && 
      Array.isArray(q.options) && 
      q.options.length === 4 &&
      typeof q.correctAnswer === 'number'
    );
  } catch (e) {
    console.log(`  JSON parse error: ${e.message}`);
    return [];
  }
}

async function main() {
  console.log('=== CPA 9,000 Question Generator ===\n');
  
  const progress = loadProgress();
  let totalGenerated = 0;
  
  for (const [section, target] of Object.entries(TARGETS)) {
    const sectionKey = `cpa/${section}`;
    const done = progress.completed[sectionKey] || 0;
    
    if (done >= target) {
      console.log(`${section.toUpperCase()}: Already done (${done}/${target})`);
      totalGenerated += done;
      continue;
    }
    
    console.log(`\nGenerating ${target - done} questions for ${section.toUpperCase()}...`);
    
    // Load existing questions
    const questionsPath = path.join(__dirname, '..', 'content', 'cpa', section, 'questions.json');
    const data = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
    const existingIds = new Set(data.questions.map(q => q.id));
    
    let sectionGenerated = done;
    const batchSize = 5;
    
    while (sectionGenerated < target) {
      const remaining = target - sectionGenerated;
      const toGenerate = Math.min(batchSize, remaining);
      
      console.log(`  Batch: generating ${toGenerate} (${sectionGenerated}/${target} done)`);
      
      const questions = await generateQuestions(section, toGenerate);
      
      if (questions.length === 0) {
        console.log('  No questions generated, retrying...');
        await sleep(5000);
        continue;
      }
      
      // Add metadata and save
      const newQuestions = questions.map((q, i) => {
        const baseId = `${section}-9k-${String(sectionGenerated + i + 1).padStart(3, '0')}`;
        let id = baseId;
        let counter = 1;
        while (existingIds.has(id)) {
          id = `${baseId}-${counter++}`;
        }
        existingIds.add(id);
        
        return {
          id,
          version: 1,
          status: 'approved',
          courseId: 'cpa',
          section: section.toUpperCase(),
          blueprintArea: q.blueprintArea || BLUEPRINTS[section][0],
          topic: q.topic || SECTION_TOPICS[section][0],
          difficulty: q.difficulty || 'medium',
          skillLevel: q.difficulty === 'hard' ? 'Analysis' : q.difficulty === 'easy' ? 'Remembering and Understanding' : 'Application',
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          whyWrong: q.whyWrong || {},
          educational: q.educational || '',
          examTip: q.examTip || '',
          memoryAid: q.memoryAid || '',
          sourceFile: 'generate-cpa-100.cjs',
        };
      });
      
      data.questions.push(...newQuestions);
      sectionGenerated += questions.length;
      
      console.log(`  Got ${questions.length} valid questions`);
      
      // Save progress
      progress.completed[sectionKey] = sectionGenerated;
      saveProgress(progress);
      
      // Save questions file
      data.questionCount = data.questions.length;
      data.exportedAt = new Date().toISOString();
      fs.writeFileSync(questionsPath, JSON.stringify(data, null, 2));
      
      // Rate limit
      await sleep(4500);
    }
    
    console.log(`  Saved ${sectionGenerated} questions to ${section.toUpperCase()}`);
    totalGenerated += sectionGenerated;
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`Total generated: ${totalGenerated}`);
}

main().catch(console.error);
