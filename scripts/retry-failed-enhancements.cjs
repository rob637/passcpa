#!/usr/bin/env node
/**
 * Retry Failed FAR Question Enhancements
 * 
 * Re-runs enhancement for specific failed question IDs with longer delays
 * to avoid rate limiting.
 * 
 * Usage:
 *   node scripts/retry-failed-enhancements.cjs
 */

const fs = require('fs');
const path = require('path');

// Failed question IDs from the enhancement log
const FAILED_QUESTION_IDS = [
  'far-add-013',
  'far-d1-022',
  'far-d12-012',
  'far-d12-013',
  'far-d12-014',
  'far-d12-020',
  'far-d14-014',
  'far-d18-022',
  'far-d18-023',
  'far-d19-012',
  'far-d20-015',
  'far-d20-023',
  'far-d8-001',
  'far-d8-002',
  'far-exp-001',
  'far-exp-012',
  'far-exp-013',
  'far-exp-014',
  'far-extra-151',
  'far-extra-152',
  'far-extra-165',
  'far-extra-179',
  'far-extra-180',
  'far-govt-018'
];

// Map question ID prefixes to file paths
const FILE_MAP = {
  'far-add': 'src/data/cpa/questions/far-questions-additional.ts',
  'far-d1-': 'src/data/cpa/questions/far-questions-depth.ts',  // depth.ts contains far-d1-* 
  'far-d8': 'src/data/cpa/questions/far-questions-depth-8.ts',
  'far-d12': 'src/data/cpa/questions/far-questions-depth-12.ts',
  'far-d14': 'src/data/cpa/questions/far-questions-depth-14.ts',
  'far-d18': 'src/data/cpa/questions/far-questions-depth-18.ts',
  'far-d19': 'src/data/cpa/questions/far-questions-depth-19.ts',
  'far-d20': 'src/data/cpa/questions/far-questions-depth-20.ts',
  'far-exp': 'src/data/cpa/questions/far-questions-expanded.ts',  // expanded.ts not expert
  'far-extra': 'src/data/cpa/questions/far-questions-extra.ts',
  'far-govt': 'src/data/cpa/questions/far-questions-govt.ts',
};

// Get file for a question ID
function getFileForQuestion(qId) {
  for (const [prefix, file] of Object.entries(FILE_MAP)) {
    if (qId.startsWith(prefix)) {
      return file;
    }
  }
  return null;
}

// Read Gemini API key from .env.local
function getApiKey() {
  const envPath = path.join(__dirname, '../.env.local');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/VITE_GEMINI_API_KEY=(.+)/);
  return match ? match[1].trim() : null;
}

const GEMINI_API_KEY = getApiKey();
if (!GEMINI_API_KEY) {
  console.error('❌ Missing VITE_GEMINI_API_KEY in .env.local');
  process.exit(1);
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Sleep helper with longer delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Extract question object from file content
 */
function extractQuestion(content, questionId) {
  const idPattern = new RegExp(`id:\\s*['"]${questionId}['"]`);
  const match = content.match(idPattern);
  if (!match) return null;
  
  let start = match.index;
  while (start > 0 && content[start] !== '{') start--;
  
  let end = start + 1;
  let braceCount = 1;
  while (end < content.length && braceCount > 0) {
    if (content[end] === '{') braceCount++;
    if (content[end] === '}') braceCount--;
    end++;
  }
  
  const questionStr = content.slice(start, end);
  
  const getField = (field) => {
    const regex = new RegExp(`${field}:\\s*['"](.*?)['"],?\\s*$`, 'm');
    const m = questionStr.match(regex);
    return m ? m[1] : '';
  };
  
  const getArrayField = (field) => {
    const regex = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`, 'm');
    const m = questionStr.match(regex);
    if (!m) return [];
    const items = m[1].match(/'[^']*'|"[^"]*"/g) || [];
    return items.map(s => s.slice(1, -1));
  };
  
  const getNumberField = (field) => {
    const regex = new RegExp(`${field}:\\s*(\\d+)`);
    const m = questionStr.match(regex);
    return m ? parseInt(m[1]) : 0;
  };
  
  return {
    id: getField('id'),
    question: getField('question'),
    options: getArrayField('options'),
    correctAnswer: getNumberField('correctAnswer'),
    explanation: getField('explanation'),
    topic: getField('topic'),
    section: getField('section'),
    reference: getField('reference'),
    _raw: questionStr,
    _start: start,
    _end: end
  };
}

/**
 * Call Gemini to enhance a question
 */
async function enhanceQuestion(question) {
  const prompt = `You are a CPA exam expert creating UWorld-style explanations. Given this CPA exam question, provide enhanced explanation content.

QUESTION:
${question.question}

OPTIONS:
A. ${question.options[0]}
B. ${question.options[1]}
C. ${question.options[2]}
D. ${question.options[3]}

CORRECT ANSWER: ${String.fromCharCode(65 + question.correctAnswer)} (${question.options[question.correctAnswer]})

CURRENT EXPLANATION: ${question.explanation}

TOPIC: ${question.topic}
SECTION: ${question.section}
REFERENCE: ${question.reference || 'N/A'}

Please provide the following in JSON format:
{
  "whyWrong": {
    // For each INCORRECT option, explain WHY it's wrong in 1-2 sentences
    // Use the option INDEX (0, 1, 2, or 3) as the key
  },
  "memoryAid": "A mnemonic or memory trick for this concept",
  "bottomLine": "One sentence exam tip starting with 'On the exam...'"
}

IMPORTANT: Return ONLY valid JSON, no markdown code blocks.`;

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1500,
      }
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error ${response.status}: ${error}`);
  }
  
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('No content in response');
  }
  
  // Clean and parse JSON
  let jsonStr = text.trim();
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
  }
  
  return JSON.parse(jsonStr);
}

/**
 * Insert enhanced fields into question string
 */
function insertEnhancedFields(questionStr, enhanced) {
  const enhancedStr = `
  whyWrong: ${JSON.stringify(enhanced.whyWrong, null, 4).replace(/\n/g, '\n  ')},
  memoryAid: '${enhanced.memoryAid.replace(/'/g, "\\'")}',
  bottomLine: '${enhanced.bottomLine.replace(/'/g, "\\'")}',
`;
  
  // Insert before explanation
  const explMatch = questionStr.match(/\n(\s*)explanation:/);
  if (explMatch) {
    const insertPoint = explMatch.index + 1;
    return questionStr.slice(0, insertPoint) + enhancedStr + questionStr.slice(insertPoint);
  }
  
  // Fallback: insert before closing brace
  const lastBrace = questionStr.lastIndexOf('}');
  return questionStr.slice(0, lastBrace) + enhancedStr + questionStr.slice(lastBrace);
}

/**
 * Main retry function
 */
async function main() {
  console.log('🔄 Retrying failed FAR question enhancements');
  console.log(`   ${FAILED_QUESTION_IDS.length} questions to retry\n`);
  
  // Group questions by file
  const fileGroups = {};
  for (const qId of FAILED_QUESTION_IDS) {
    const file = getFileForQuestion(qId);
    if (!file) {
      console.log(`⚠️  No file mapping for ${qId}`);
      continue;
    }
    if (!fileGroups[file]) fileGroups[file] = [];
    fileGroups[file].push(qId);
  }
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [filePath, questionIds] of Object.entries(fileGroups)) {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      continue;
    }
    
    console.log(`\n📄 Processing ${filePath} (${questionIds.length} questions)`);
    let content = fs.readFileSync(fullPath, 'utf-8');
    let modified = false;
    
    for (const qId of questionIds) {
      console.log(`   🔄 ${qId}...`);
      
      // Check if already enhanced (in case of retry)
      if (content.includes(`id: '${qId}'`) || content.includes(`id: "${qId}"`)) {
        const searchArea = content.slice(
          content.indexOf(qId),
          content.indexOf(qId) + 3000
        );
        if (searchArea.includes('whyWrong:')) {
          console.log(`   ⏭️  Already enhanced, skipping`);
          continue;
        }
      }
      
      const question = extractQuestion(content, qId);
      if (!question) {
        console.log(`   ⚠️  Could not extract question`);
        failCount++;
        continue;
      }
      
      try {
        // Longer delay: 3 seconds between requests
        await sleep(3000);
        
        const enhancement = await enhanceQuestion(question);
        const enhancedQuestion = insertEnhancedFields(question._raw, enhancement);
        content = content.slice(0, question._start) + enhancedQuestion + content.slice(question._end);
        modified = true;
        successCount++;
        console.log(`   ✅ Enhanced`);
      } catch (err) {
        console.log(`   ❌ Error: ${err.message}`);
        failCount++;
        
        // If rate limited, wait longer
        if (err.message.includes('429')) {
          console.log(`   ⏳ Rate limited, waiting 60 seconds...`);
          await sleep(60000);
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`   💾 Saved changes`);
    }
  }
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`✅ Successfully enhanced: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`${'='.repeat(50)}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
