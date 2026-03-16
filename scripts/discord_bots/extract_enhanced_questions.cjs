/**
 * Extract Enhanced Questions for Discord Bots
 * 
 * Pulls from content/ JSON files (which have whyWrong, examTip, etc.)
 * and creates comprehensive explanations for Discord.
 * 
 * Run: node scripts/discord_bots/extract_enhanced_questions.cjs
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../../content');
const OUTPUT_DIR = path.join(__dirname, 'data');
const QUESTIONS_PER_EXAM = 200;
const MAX_EXPLANATION_LENGTH = 800;

// Exam configurations
const EXAM_CONFIGS = {
  cpa: {
    name: 'CPA',
    sections: ['far', 'aud', 'reg', 'bar', 'isc', 'tcp'],
  },
  ea: {
    name: 'EA',
    sections: ['see1', 'see2', 'see3'],
  },
  cma: {
    name: 'CMA',
    sections: ['cma1', 'cma2'],
  },
  cia: {
    name: 'CIA',
    sections: ['cia1', 'cia2', 'cia3'],
  },
  cisa: {
    name: 'CISA',
    sections: ['cisa1', 'cisa2', 'cisa3', 'cisa4', 'cisa5'],
  },
  cfp: {
    name: 'CFP',
    sections: ['CFP-GEN', 'CFP-INV', 'CFP-TAX', 'CFP-RET', 'CFP-EST', 'CFP-RISK', 'CFP-PSY', 'CFP-PCR'],
  },
};

/**
 * Build a comprehensive explanation from the enhanced question fields
 */
function buildEnhancedExplanation(q) {
  const parts = [];
  
  // Start with the base explanation
  if (q.explanation) {
    parts.push(q.explanation);
  }
  
  // Add why correct answer is correct (from whyWrong field, index 0 typically)
  const correctIdx = q.correctAnswer;
  if (q.whyWrong && q.whyWrong[String(correctIdx)]) {
    // Skip if it's redundant with the main explanation
    const whyCorrect = q.whyWrong[String(correctIdx)];
    if (!q.explanation?.includes(whyCorrect.slice(0, 50))) {
      parts.push(whyCorrect);
    }
  }
  
  // Add exam tip if present and space allows
  if (q.examTip) {
    parts.push(`💡 Exam Tip: ${q.examTip}`);
  }
  
  // Add common mistake warning if present
  if (q.commonMistake && parts.join(' ').length < 500) {
    parts.push(`⚠️ Common Mistake: ${q.commonMistake.slice(0, 150)}...`);
  }
  
  // Combine and truncate to limit
  let explanation = parts.join(' ');
  
  // Clean up multiple spaces
  explanation = explanation.replace(/\s+/g, ' ').trim();
  
  // Truncate if needed
  if (explanation.length > MAX_EXPLANATION_LENGTH) {
    explanation = explanation.slice(0, MAX_EXPLANATION_LENGTH - 3) + '...';
  }
  
  return explanation;
}

/**
 * Load and process questions from content folder for an exam
 */
function loadExamQuestions(examId) {
  const config = EXAM_CONFIGS[examId];
  if (!config) {
    console.log(`  ⚠️ No config for ${examId}`);
    return [];
  }
  
  const questions = [];
  const examDir = path.join(CONTENT_DIR, examId);
  
  if (!fs.existsSync(examDir)) {
    console.log(`  ⚠️ No content directory for ${examId}`);
    return [];
  }
  
  for (const section of config.sections) {
    const sectionFile = path.join(examDir, section, 'questions.json');
    if (!fs.existsSync(sectionFile)) {
      // Try top-level questions file
      continue;
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(sectionFile, 'utf-8'));
      const sectionQuestions = data.questions || [];
      
      for (const q of sectionQuestions) {
        if (validateQuestion(q)) {
          questions.push({
            ...q,
            exam: config.name,
            section: section.toUpperCase(),
          });
        }
      }
    } catch (err) {
      console.log(`  ⚠️ Error loading ${sectionFile}: ${err.message}`);
    }
  }
  
  return questions;
}

/**
 * Validate a question has required fields and good quality
 */
function validateQuestion(q) {
  // Required fields
  if (!q.question || !q.options || !Array.isArray(q.options) || q.options.length < 4) {
    return false;
  }
  if (q.correctAnswer === undefined || q.correctAnswer === null) {
    return false;
  }
  if (!q.explanation || q.explanation.length < 20) {
    return false;
  }
  
  // Skip overly long questions (bad for Discord embeds)
  if (q.question.length > 500) {
    return false;
  }
  
  // Skip if any option is too long
  if (q.options.some(o => o.length > 200)) {
    return false;
  }
  
  return true;
}

/**
 * Transform a question for Discord bot format
 */
function transformForDiscord(q, examName) {
  return {
    id: q.id || `${examName.toLowerCase()}-${Math.random().toString(36).slice(2, 8)}`,
    exam: examName,
    section: q.section || '',
    topic: q.topic || '',
    difficulty: normalizeDifficulty(q.difficulty),
    question: q.question.trim(),
    options: q.options.slice(0, 4).map(o => o.trim()),
    correctAnswer: q.correctAnswer,
    explanation: buildEnhancedExplanation(q),
  };
}

/**
 * Normalize difficulty values
 */
function normalizeDifficulty(diff) {
  const normalized = (diff || 'medium').toLowerCase();
  if (['easy', 'beginner'].includes(normalized)) return 'easy';
  if (['hard', 'difficult', 'advanced'].includes(normalized)) return 'hard';
  return 'medium';
}

/**
 * Select a curated subset with good variety
 */
function selectCuratedSubset(questions, count) {
  if (questions.length <= count) return questions;
  
  // Group by section
  const bySection = {};
  for (const q of questions) {
    const key = q.section || 'general';
    if (!bySection[key]) bySection[key] = [];
    bySection[key].push(q);
  }
  
  const sections = Object.keys(bySection);
  const perSection = Math.max(1, Math.floor(count / sections.length));
  const selected = [];
  
  for (const section of sections) {
    const pool = bySection[section];
    
    // Categorize by difficulty
    const easy = pool.filter(q => q.difficulty === 'easy');
    const medium = pool.filter(q => q.difficulty === 'medium');
    const hard = pool.filter(q => q.difficulty === 'hard');
    
    // Pick function
    const pick = (arr, n) => {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, n);
    };
    
    // Aim for 30% easy, 40% medium, 30% hard
    const easyCount = Math.max(1, Math.round(perSection * 0.3));
    const hardCount = Math.max(1, Math.round(perSection * 0.3));
    const medCount = perSection - easyCount - hardCount;
    
    // Prioritize questions with enhanced fields (whyWrong, examTip)
    const prioritized = (arr) => {
      return arr.sort((a, b) => {
        const aScore = (a.whyWrong ? 2 : 0) + (a.examTip ? 1 : 0);
        const bScore = (b.whyWrong ? 2 : 0) + (b.examTip ? 1 : 0);
        return bScore - aScore;
      });
    };
    
    selected.push(
      ...pick(prioritized(easy), easyCount),
      ...pick(prioritized(medium), medCount),
      ...pick(prioritized(hard), hardCount),
    );
  }
  
  // Fill remaining slots if needed
  if (selected.length < count) {
    const selectedIds = new Set(selected.map(q => q.id));
    const remaining = questions.filter(q => !selectedIds.has(q.id));
    const shuffled = remaining.sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, count - selected.length));
  }
  
  // Shuffle and trim to exact count
  return selected.sort(() => Math.random() - 0.5).slice(0, count);
}

// Main execution
console.log('🚀 Extracting enhanced questions for Discord bots...\n');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let totalExtracted = 0;
const summary = {};

for (const examId of Object.keys(EXAM_CONFIGS)) {
  const examName = EXAM_CONFIGS[examId].name;
  console.log(`📚 Processing ${examName}...`);
  
  const rawQuestions = loadExamQuestions(examId);
  console.log(`   Loaded ${rawQuestions.length} valid questions from content/`);
  
  if (rawQuestions.length === 0) {
    console.log(`   ⚠️ Skipping ${examName} - no questions found`);
    continue;
  }
  
  // Count enhanced questions
  const enhancedCount = rawQuestions.filter(q => q.whyWrong || q.examTip).length;
  console.log(`   ${enhancedCount} have enhanced explanations (whyWrong/examTip)`);
  
  // Select subset
  const subset = selectCuratedSubset(rawQuestions, QUESTIONS_PER_EXAM);
  
  // Transform for Discord format
  const discordQuestions = subset.map(q => transformForDiscord(q, examName));
  
  // Calculate explanation stats
  const explanations = discordQuestions.map(q => q.explanation.length);
  const avgLen = Math.round(explanations.reduce((a, b) => a + b, 0) / explanations.length);
  const minLen = Math.min(...explanations);
  const maxLen = Math.max(...explanations);
  console.log(`   Explanation lengths: avg=${avgLen}, min=${minLen}, max=${maxLen}`);
  
  // Write output
  const outputPath = path.join(OUTPUT_DIR, `${examId}_questions.json`);
  fs.writeFileSync(outputPath, JSON.stringify(discordQuestions, null, 2));
  console.log(`   ✅ Wrote ${discordQuestions.length} questions to ${examId}_questions.json\n`);
  
  totalExtracted += discordQuestions.length;
  summary[examId] = discordQuestions.length;
}

console.log(`\n🎉 Done! ${totalExtracted} total questions extracted`);
console.log('Summary:', JSON.stringify(summary, null, 2));
