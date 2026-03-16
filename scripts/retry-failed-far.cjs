#!/usr/bin/env node
/**
 * Retry failed FAR question enhancements
 * These failed due to 429 rate limits - retry with longer delays
 */

const fs = require('fs');
const path = require('path');

// Failed question IDs from the log
const FAILED_IDS = [
  'far-add-013',
  'far-d12-012', 'far-d12-013', 'far-d12-014', 'far-d12-020',
  'far-d14-014',
  'far-d18-022', 'far-d18-023',
  'far-d19-012',
  'far-d20-015', 'far-d20-023',
  'far-d8-001',
  'far-d1-022',
  'far-exp-001', 'far-exp-012', 'far-exp-013', 'far-exp-014',
  'far-extra-151', 'far-extra-152', 'far-extra-165', 'far-extra-179', 'far-extra-180',
  'far-govt-018',
];

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not set');
  process.exit(1);
}

async function callGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function buildPrompt(question) {
  return `You are enhancing CPA exam question explanations to be world-class, like UWorld's medical exam prep.

QUESTION:
${question.question}

OPTIONS:
A) ${question.options[0]}
B) ${question.options[1]}
C) ${question.options[2]}
D) ${question.options[3]}

CORRECT ANSWER: ${['A', 'B', 'C', 'D'][question.correctAnswer]}

CURRENT EXPLANATION:
${question.explanation}

Generate an enhanced explanation in this JSON format:
{
  "explanation": "2-3 sentence explanation of why the correct answer is right",
  "educationalNote": "A teaching moment that helps the student understand the underlying concept (2-4 sentences)",
  "wrongAnswerExplanations": [
    "Why option A is wrong (or why it's correct if A is the answer)",
    "Why option B is wrong (or why it's correct if B is the answer)",
    "Why option C is wrong (or why it's correct if C is the answer)",
    "Why option D is wrong (or why it's correct if D is the answer)"
  ],
  "examTip": "A brief, memorable tip for the CPA exam (1 sentence)"
}

Requirements:
- Be concise but thorough
- Use plain language, avoid jargon
- Make wrong answer explanations specific to each option
- The educational note should teach the concept, not just restate the answer
- The exam tip should be practical and memorable

Return ONLY valid JSON, no markdown or extra text.`;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function findAndEnhanceQuestion(questionId) {
  // Find which file contains this question - FAR files are in flat structure
  const questionsDir = path.join(__dirname, '../src/data/cpa/questions');
  const files = fs.readdirSync(questionsDir).filter(f => f.startsWith('far-') && f.endsWith('.ts'));
  
  for (const file of files) {
    const filePath = path.join(questionsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if this file has the question
    if (!content.includes(`id: '${questionId}'`) && !content.includes(`id: "${questionId}"`)) {
      continue;
    }
    
    // Parse questions from file - handle TypeScript type annotations
    const match = content.match(/export const \w+(?::\s*\w+\[\])?\s*=\s*\[([\s\S]*)\];?\s*$/);
    if (!match) continue;
    
    try {
      // Extract and parse questions
      const questionsStr = '[' + match[1] + ']';
      const cleanedStr = questionsStr
        .replace(/\/\/.*$/gm, '')
        .replace(/,(\s*[}\]])/g, '$1');
      
      const questions = eval(cleanedStr);
      const question = questions.find(q => q.id === questionId);
      
      if (!question) continue;
      
      // Skip if already enhanced
      if (question.wrongAnswerExplanations && question.wrongAnswerExplanations.length === 4) {
        console.log(`  ⏭️ ${questionId} already enhanced`);
        return { status: 'skipped', file };
      }
      
      // Call Gemini
      console.log(`  🔄 Enhancing ${questionId}...`);
      const prompt = buildPrompt(question);
      const response = await callGemini(prompt);
      
      // Parse response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON in response');
      }
      
      const enhanced = JSON.parse(jsonMatch[0]);
      
      // Update question in content
      const questionRegex = new RegExp(
        `(\\{[^}]*id:\\s*['"]${questionId}['"][^}]*explanation:\\s*['"\`])([^'"\`]*?)(['"\`])`,
        's'
      );
      
      let newContent = content;
      
      // Add wrongAnswerExplanations if not present
      if (!content.includes('wrongAnswerExplanations') || !content.match(new RegExp(`id:\\s*['"]${questionId}['"][\\s\\S]*?wrongAnswerExplanations`))) {
        // Find the question object and add the new fields
        const idPattern = new RegExp(`(id:\\s*['"]${questionId}['"][\\s\\S]*?explanation:\\s*['"\`][^'"\`]*['"\`])([,\\s]*)(\\})`, 's');
        
        const wrongAnswerStr = JSON.stringify(enhanced.wrongAnswerExplanations);
        const educationalNote = enhanced.educationalNote?.replace(/'/g, "\\'") || '';
        const examTip = enhanced.examTip?.replace(/'/g, "\\'") || '';
        
        newContent = newContent.replace(idPattern, (match, before, comma, brace) => {
          return `${before},
    wrongAnswerExplanations: ${wrongAnswerStr},
    educationalNote: '${educationalNote}',
    examTip: '${examTip}'${comma}${brace}`;
        });
      }
      
      // Update explanation
      if (enhanced.explanation) {
        const explPattern = new RegExp(
          `(id:\\s*['"]${questionId}['"][\\s\\S]*?explanation:\\s*)(['"\`])([^'"\`]*?)\\2`,
          's'
        );
        const newExplanation = enhanced.explanation.replace(/'/g, "\\'").replace(/\n/g, ' ');
        newContent = newContent.replace(explPattern, `$1'${newExplanation}'`);
      }
      
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`  ✅ Enhanced ${questionId}`);
      return { status: 'enhanced', file };
      
    } catch (err) {
      console.error(`  ❌ Error with ${questionId}: ${err.message}`);
      return { status: 'error', file, error: err.message };
    }
  }
  
  console.log(`  ⚠️ ${questionId} not found in any file`);
  return { status: 'not_found' };
}

async function main() {
  console.log('🔄 Retrying failed FAR question enhancements...\n');
  console.log(`Found ${FAILED_IDS.length} questions to retry\n`);
  
  let enhanced = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const id of FAILED_IDS) {
    const result = await findAndEnhanceQuestion(id);
    
    if (result.status === 'enhanced') enhanced++;
    else if (result.status === 'skipped') skipped++;
    else errors++;
    
    // Longer delay to avoid rate limits (3 seconds)
    await sleep(3000);
  }
  
  console.log('\n📊 Summary');
  console.log(`   Enhanced: ${enhanced}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

main().catch(console.error);
