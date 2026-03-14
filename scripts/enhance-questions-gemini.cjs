#!/usr/bin/env node
/**
 * Question Enhancement Script - UWorld-Style Explanations
 * 
 * Uses Gemini to add whyWrong, memoryAid, and bottomLine to CPA questions.
 * 
 * Usage:
 *   node scripts/enhance-questions-gemini.cjs --file src/data/cpa/questions/far-questions.ts
 *   node scripts/enhance-questions-gemini.cjs --section FAR --limit 50
 *   node scripts/enhance-questions-gemini.cjs --section FAR --all
 */

const fs = require('fs');
const path = require('path');

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

/**
 * Call Gemini API to enhance a question
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
    // For each INCORRECT option (not the correct answer), explain WHY it's wrong in 1-2 sentences
    // Use the option INDEX (0, 1, 2, or 3) as the key
    // Be specific about the accounting/audit/tax concept being tested
    // Avoid generic "this is incorrect" - explain the actual reason
  },
  "memoryAid": "A mnemonic, acronym, or memory trick to remember this concept. Should be catchy and memorable. Use common CPA mnemonics where applicable (like COSO, CRIME, etc.)",
  "bottomLine": "One sentence summarizing what the exam wants you to know about this topic. Start with 'On the exam...' or a direct statement."
}

IMPORTANT RULES:
1. For whyWrong, only include the WRONG options (skip the correct answer index)
2. Be technically accurate - reference the specific ASC, AU-C, IRC, or regulation
3. Memory aids should be genuinely helpful, not forced
4. Bottom line should be actionable exam advice
5. Keep each whyWrong explanation to 2 sentences max
6. Return ONLY valid JSON, no markdown code blocks`;

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse JSON from response (handle markdown code blocks if present)
    let jsonStr = text.trim();
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.slice(7);
    }
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith('```')) {
      jsonStr = jsonStr.slice(0, -3);
    }
    
    const enhanced = JSON.parse(jsonStr.trim());
    
    // Validate the response
    if (!enhanced.whyWrong || !enhanced.memoryAid || !enhanced.bottomLine) {
      throw new Error('Incomplete response from Gemini');
    }
    
    // Convert whyWrong keys to numbers if they're strings
    const whyWrongNumeric = {};
    for (const [key, value] of Object.entries(enhanced.whyWrong)) {
      whyWrongNumeric[parseInt(key)] = value;
    }
    
    return {
      whyWrong: whyWrongNumeric,
      memoryAid: enhanced.memoryAid,
      bottomLine: enhanced.bottomLine,
    };
  } catch (error) {
    console.error(`  ⚠️ Error enhancing question ${question.id}:`, error.message);
    return null;
  }
}

/**
 * Parse a TypeScript question file and extract questions
 */
function parseQuestionFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find the export const array
  const match = content.match(/export const (\w+):\s*Question\[\]\s*=\s*\[/);
  if (!match) {
    console.error(`Could not find question array in ${filePath}`);
    return { questions: [], exportName: null, content };
  }
  
  const exportName = match[1];
  
  // Extract individual question objects (simplified - assumes well-formatted code)
  const questions = [];
  const questionRegex = /\{\s*id:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = questionRegex.exec(content)) !== null) {
    questions.push({ id: m[1], index: m.index });
  }
  
  return { questions, exportName, content };
}

/**
 * Check if a question already has enhanced fields
 */
function hasEnhancedFields(content, questionId) {
  // Find the question block and check for whyWrong
  const idPattern = new RegExp(`id:\\s*['"]${questionId}['"]`);
  const match = content.match(idPattern);
  if (!match) return false;
  
  // Look for whyWrong in the next ~2000 characters (within the question object)
  const searchArea = content.slice(match.index, match.index + 3000);
  return searchArea.includes('whyWrong:');
}

/**
 * Extract full question object from content
 */
function extractQuestion(content, questionId) {
  const idPattern = new RegExp(`id:\\s*['"]${questionId}['"]`);
  const match = content.match(idPattern);
  if (!match) return null;
  
  // Find the start of this object (go back to find opening brace)
  let start = match.index;
  while (start > 0 && content[start] !== '{') start--;
  
  // Find the end (count braces)
  let end = start + 1;
  let braceCount = 1;
  while (end < content.length && braceCount > 0) {
    if (content[end] === '{') braceCount++;
    if (content[end] === '}') braceCount--;
    end++;
  }
  
  const questionStr = content.slice(start, end);
  
  // Parse it (eval is dangerous but we control the input)
  try {
    // Extract fields manually for safety
    const getField = (field) => {
      const regex = new RegExp(`${field}:\\s*['"](.*?)['"],?\\s*$`, 'm');
      const m = questionStr.match(regex);
      return m ? m[1] : '';
    };
    
    const getArrayField = (field) => {
      const regex = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`, 'm');
      const m = questionStr.match(regex);
      if (!m) return [];
      // Parse the array content
      const items = m[1].match(/'[^']*'|"[^"]*"/g) || [];
      return items.map(s => s.slice(1, -1));
    };
    
    const getNumberField = (field) => {
      const regex = new RegExp(`${field}:\\s*(\\d+)`);
      const m = questionStr.match(regex);
      return m ? parseInt(m[1]) : 0;
    };
    
    return {
      id: questionId,
      question: getField('question'),
      options: getArrayField('options'),
      correctAnswer: getNumberField('correctAnswer'),
      explanation: getField('explanation'),
      topic: getField('topic'),
      section: getField('section'),
      reference: getField('reference'),
      _raw: questionStr,
      _start: start,
      _end: end,
    };
  } catch (error) {
    console.error(`Error parsing question ${questionId}:`, error.message);
    return null;
  }
}

/**
 * Insert enhanced fields into a question object
 */
function insertEnhancedFields(questionStr, enhanced) {
  // Find where to insert (before the reference field or at the end)
  const insertPoint = questionStr.lastIndexOf('reference:');
  
  // Format the enhanced fields
  const whyWrongStr = Object.entries(enhanced.whyWrong)
    .map(([key, value]) => `      ${key}: '${value.replace(/'/g, "\\'")}'`)
    .join(',\n');
  
  const enhancedStr = `    whyWrong: {\n${whyWrongStr},\n    },\n    memoryAid: '${enhanced.memoryAid.replace(/'/g, "\\'")}',\n    bottomLine: '${enhanced.bottomLine.replace(/'/g, "\\'")}',\n    `;
  
  if (insertPoint > 0) {
    return questionStr.slice(0, insertPoint) + enhancedStr + questionStr.slice(insertPoint);
  } else {
    // Insert before the closing brace
    const lastBrace = questionStr.lastIndexOf('}');
    return questionStr.slice(0, lastBrace) + enhancedStr + questionStr.slice(lastBrace);
  }
}

/**
 * Process a single question file
 */
async function processFile(filePath, options = {}) {
  const { limit = Infinity, dryRun = false } = options;
  
  console.log(`\n📂 Processing: ${path.basename(filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const { questions } = parseQuestionFile(filePath);
  
  console.log(`   Found ${questions.length} questions`);
  
  let enhanced = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const { id } of questions) {
    if (enhanced >= limit) {
      console.log(`   ⏹️ Reached limit of ${limit}`);
      break;
    }
    
    if (hasEnhancedFields(content, id)) {
      skipped++;
      continue;
    }
    
    const question = extractQuestion(content, id);
    if (!question || !question.question || question.options.length < 4) {
      console.log(`   ⏭️ Skipping ${id} (parse error)`);
      errors++;
      continue;
    }
    
    console.log(`   🔄 Enhancing: ${id}`);
    
    const enhancement = await enhanceQuestion(question);
    if (!enhancement) {
      errors++;
      continue;
    }
    
    // Insert enhanced fields
    const enhancedQuestion = insertEnhancedFields(question._raw, enhancement);
    content = content.slice(0, question._start) + enhancedQuestion + content.slice(question._end);
    
    enhanced++;
    
    // Rate limiting - 15 requests per minute for free tier
    await new Promise(resolve => setTimeout(resolve, 4500));
  }
  
  // Write back
  if (!dryRun && enhanced > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`   ✅ Wrote ${enhanced} enhanced questions`);
  }
  
  return { enhanced, skipped, errors };
}

/**
 * Find all FAR question files
 */
function findFARFiles() {
  const questionsDir = path.join(__dirname, '../src/data/cpa/questions');
  const files = fs.readdirSync(questionsDir);
  return files
    .filter(f => f.includes('far') && f.endsWith('.ts') && !f.includes('index'))
    .map(f => path.join(questionsDir, f));
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2);
  
  const fileArg = args.indexOf('--file');
  const sectionArg = args.indexOf('--section');
  const limitArg = args.indexOf('--limit');
  const allFlag = args.includes('--all');
  const dryRun = args.includes('--dry-run');
  
  const limit = limitArg >= 0 ? parseInt(args[limitArg + 1]) : (allFlag ? Infinity : 10);
  
  let files = [];
  
  if (fileArg >= 0) {
    files = [args[fileArg + 1]];
  } else if (sectionArg >= 0) {
    const section = args[sectionArg + 1].toUpperCase();
    if (section === 'FAR') {
      files = findFARFiles();
    } else {
      console.error(`Section ${section} not yet supported`);
      process.exit(1);
    }
  } else {
    console.log('Usage:');
    console.log('  node scripts/enhance-questions-gemini.cjs --file <path>');
    console.log('  node scripts/enhance-questions-gemini.cjs --section FAR --limit 50');
    console.log('  node scripts/enhance-questions-gemini.cjs --section FAR --all');
    process.exit(0);
  }
  
  console.log(`\n🚀 UWorld-Style Question Enhancement`);
  console.log(`   Files: ${files.length}`);
  console.log(`   Limit per file: ${limit === Infinity ? 'unlimited' : limit}`);
  console.log(`   Dry run: ${dryRun}`);
  
  let totalEnhanced = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  
  for (const file of files) {
    const result = await processFile(file, { limit, dryRun });
    totalEnhanced += result.enhanced;
    totalSkipped += result.skipped;
    totalErrors += result.errors;
  }
  
  console.log(`\n📊 Summary`);
  console.log(`   Enhanced: ${totalEnhanced}`);
  console.log(`   Already done: ${totalSkipped}`);
  console.log(`   Errors: ${totalErrors}`);
}

main().catch(console.error);
