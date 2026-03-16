#!/usr/bin/env node
/**
 * flashcard-generate.cjs: AI-powered flashcard generation for CMA and CFP
 * 
 * Generates comprehensive flashcard decks covering all blueprint areas with:
 * - Key concepts and definitions
 * - Formulas and calculations
 * - Mnemonics and memory aids
 * - Exam tips and common mistakes
 * 
 * Usage:
 *   node scripts/flashcard-generate.cjs cma --limit=50    # Generate 50 CMA flashcards
 *   node scripts/flashcard-generate.cjs cfp --limit=50    # Generate 50 CFP flashcards
 *   node scripts/flashcard-generate.cjs all               # Generate for both
 *   node scripts/flashcard-generate.cjs --status          # Show current counts
 * 
 * Environment:
 *   GEMINI_API_KEY or VITE_GEMINI_API_KEY must be set
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'content');

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Parse command line args
const args = process.argv.slice(2);
const STATUS_ONLY = args.includes('--status');
const DRY_RUN = args.includes('--dry-run');

const LIMIT = (() => {
  const idx = args.findIndex(a => a.startsWith('--limit'));
  if (idx >= 0) {
    const val = args[idx].includes('=') ? args[idx].split('=')[1] : args[idx + 1];
    return parseInt(val, 10) || 50;
  }
  return 50; // Default to 50 per area
})();

const typeArg = args.find(a => !a.startsWith('-'));

// CMA Blueprint Areas (12 total)
const CMA_BLUEPRINT = {
  'CMA1-A': {
    name: 'External Financial Reporting Decisions',
    weight: '15%',
    topics: [
      'Financial statements (balance sheet, income statement, cash flows)',
      'Revenue recognition (ASC 606)',
      'Leases (ASC 842)',
      'Income taxes',
      'Equity and EPS',
      'SEC filings',
    ],
    targetCards: 40,
  },
  'CMA1-B': {
    name: 'Planning, Budgeting, and Forecasting',
    weight: '20%',
    topics: [
      'Strategic planning process',
      'Master budget components',
      'Flexible budgets',
      'Sales forecasting methods',
      'Pro forma financial statements',
    ],
    targetCards: 45,
  },
  'CMA1-C': {
    name: 'Performance Management',
    weight: '20%',
    topics: [
      'Variance analysis (material, labor, overhead)',
      'Responsibility centers',
      'Transfer pricing',
      'Balanced scorecard',
      'Key performance indicators',
    ],
    targetCards: 45,
  },
  'CMA1-D': {
    name: 'Cost Management',
    weight: '15%',
    topics: [
      'Job costing vs process costing',
      'Activity-based costing (ABC)',
      'Standard costing',
      'Joint and by-product costing',
      'Cost allocation methods',
    ],
    targetCards: 40,
  },
  'CMA1-E': {
    name: 'Internal Controls',
    weight: '15%',
    topics: [
      'COSO framework',
      'Internal control components',
      'IT controls',
      'Internal audit',
      'Fraud prevention',
    ],
    targetCards: 35,
  },
  'CMA1-F': {
    name: 'Technology and Analytics',
    weight: '15%',
    topics: [
      'Data analytics',
      'Business intelligence',
      'Robotic process automation',
      'Data visualization',
      'Cybersecurity basics',
    ],
    targetCards: 35,
  },
  'CMA2-A': {
    name: 'Financial Statement Analysis',
    weight: '20%',
    topics: [
      'Liquidity ratios',
      'Profitability ratios',
      'Leverage ratios',
      'DuPont analysis',
      'Trend analysis',
    ],
    targetCards: 45,
  },
  'CMA2-B': {
    name: 'Corporate Finance',
    weight: '20%',
    topics: [
      'Cost of capital (WACC)',
      'Capital structure',
      'Dividend policy',
      'Working capital management',
      'Cash management',
    ],
    targetCards: 45,
  },
  'CMA2-C': {
    name: 'Decision Analysis',
    weight: '25%',
    topics: [
      'CVP analysis and breakeven',
      'Contribution margin',
      'Make vs buy decisions',
      'Special orders',
      'Product mix decisions',
      'Pricing strategies',
    ],
    targetCards: 50,
  },
  'CMA2-D': {
    name: 'Risk Management',
    weight: '10%',
    topics: [
      'Enterprise risk management',
      'Risk identification',
      'Risk mitigation strategies',
      'Business continuity',
    ],
    targetCards: 30,
  },
  'CMA2-E': {
    name: 'Investment Decisions',
    weight: '10%',
    topics: [
      'NPV calculation',
      'IRR methodology',
      'Payback period',
      'Profitability index',
      'Capital rationing',
    ],
    targetCards: 35,
  },
  'CMA2-F': {
    name: 'Professional Ethics',
    weight: '15%',
    topics: [
      'IMA Statement of Ethical Professional Practice',
      'Competence, confidentiality, integrity, credibility',
      'Ethical conflict resolution',
      'Whistleblowing',
    ],
    targetCards: 35,
  },
};

// CFP Domains (8 total)
const CFP_BLUEPRINT = {
  'CFP-GEN': {
    name: 'General Principles of Financial Planning',
    weight: '17%',
    topics: [
      'Financial planning process (7 steps)',
      'CFP Board Code of Ethics',
      'Fiduciary duty',
      'Client communication',
      'Time value of money',
      'Economic concepts',
    ],
    targetCards: 100,
  },
  'CFP-RISK': {
    name: 'Risk Management and Insurance Planning',
    weight: '12%',
    topics: [
      'Life insurance types and needs analysis',
      'Health insurance and Medicare',
      'Disability insurance',
      'Property and casualty insurance',
      'Long-term care insurance',
      'Liability insurance',
    ],
    targetCards: 90,
  },
  'CFP-INV': {
    name: 'Investment Planning',
    weight: '17%',
    topics: [
      'Modern portfolio theory',
      'Asset allocation strategies',
      'Security analysis',
      'Bond valuation and duration',
      'Options and derivatives',
      'Alternative investments',
      'Performance measurement',
    ],
    targetCards: 100,
  },
  'CFP-TAX': {
    name: 'Tax Planning',
    weight: '14%',
    topics: [
      'Filing status and exemptions',
      'Gross income and adjustments',
      'Itemized deductions',
      'Tax credits',
      'Capital gains treatment',
      'AMT',
      'Tax planning strategies',
    ],
    targetCards: 100,
  },
  'CFP-RET': {
    name: 'Retirement Savings and Income Planning',
    weight: '18%',
    topics: [
      'Qualified plans (401k, 403b, pension)',
      'IRAs (Traditional, Roth, SEP, SIMPLE)',
      'Social Security benefits',
      'Distribution rules and RMDs',
      'Retirement needs analysis',
      'SECURE 2.0 Act changes',
    ],
    targetCards: 120,
  },
  'CFP-EST': {
    name: 'Estate Planning',
    weight: '12%',
    topics: [
      'Wills and trusts',
      'Estate tax calculation',
      'Gift tax rules',
      'Marital deduction',
      'Charitable giving strategies',
      'Business succession',
      'Probate process',
    ],
    targetCards: 90,
  },
  'CFP-PSY': {
    name: 'Psychology of Financial Planning',
    weight: '7%',
    topics: [
      'Behavioral finance biases',
      'Client attitudes and values',
      'Counseling techniques',
      'Crisis events',
      'Family dynamics',
    ],
    targetCards: 50,
  },
  'CFP-PCR': {
    name: 'Professional Conduct and Regulation',
    weight: '3%',
    topics: [
      'CFP Board Standards of Conduct',
      'Fiduciary vs suitability',
      'Regulatory environment',
      'Client data privacy',
    ],
    targetCards: 50,
  },
};

// Flashcard types to generate
const CARD_TYPES = [
  { type: 'concept', weight: 30, description: 'Key concept definition' },
  { type: 'formula', weight: 20, description: 'Formula or calculation' },
  { type: 'mnemonic', weight: 15, description: 'Memory aid' },
  { type: 'comparison', weight: 15, description: 'Compare/contrast two things' },
  { type: 'rule', weight: 10, description: 'Rule, limit, or threshold' },
  { type: 'example', weight: 10, description: 'Practical example' },
];

// ─── Gemini API ───

async function callGemini(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4000,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429) {
          const waitTime = Math.min(60000, 5000 * Math.pow(2, attempt));
          console.log(`    Rate limited. Waiting ${waitTime / 1000}s...`);
          await new Promise(r => setTimeout(r, waitTime));
          continue;
        }
        throw new Error(`Gemini API error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error('Empty response from Gemini');
      }

      // Parse JSON array response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON array found in response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      console.log(`    Attempt ${attempt} failed: ${err.message}. Retrying...`);
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
}

// ─── Prompt builders ───

function buildCMAPrompt(areaId, areaConfig, count) {
  return `You are a CMA exam expert creating flashcards for management accountants.

BLUEPRINT AREA: ${areaId} - ${areaConfig.name}
EXAM WEIGHT: ${areaConfig.weight}
TOPICS: ${areaConfig.topics.join(', ')}

Generate ${count} flashcards as a JSON array. Mix these types:
- concept: Key definitions and concepts (30%)
- formula: Formulas with variables explained (20%)
- mnemonic: Memory aids (15%)
- comparison: Compare/contrast items (15%)
- rule: Thresholds, limits, requirements (10%)
- example: Practical scenarios (10%)

Each flashcard should be a JSON object:
{
  "id": "${areaId.toLowerCase()}-fc-001",
  "section": "${areaId.split('-')[0]}",
  "type": "concept|formula|mnemonic|comparison|rule|example",
  "topic": "Topic name",
  "subtopic": "Specific subtopic",
  "blueprintArea": "${areaId}",
  "front": "Question or prompt (concise, exam-focused)",
  "back": "Answer with **bold** key terms, bullet points for lists, formulas in plain text",
  "mnemonic": "Memory aid if applicable (null otherwise)",
  "difficulty": "easy|medium|hard",
  "tags": ["tag1", "tag2"]
}

Requirements:
1. Focus on what IMA actually tests - practical management accounting
2. Include specific numbers for rules/thresholds
3. Make mnemonics memorable and relevant
4. For formulas, show the calculation clearly
5. Reference IMA Code of Ethics for CMA2-F topics
6. Make content CMA-exam specific, not generic accounting

Return ONLY a valid JSON array with ${count} flashcards. No markdown code fences.`;
}

function buildCFPPrompt(domainId, domainConfig, count) {
  return `You are a CFP exam expert creating flashcards for financial planners.

DOMAIN: ${domainId} - ${domainConfig.name}
EXAM WEIGHT: ${domainConfig.weight}
TOPICS: ${domainConfig.topics.join(', ')}

Generate ${count} flashcards as a JSON array. Mix these types:
- concept: Key definitions and concepts (30%)
- formula: Formulas with variables explained (20%)
- mnemonic: Memory aids (15%)
- comparison: Compare/contrast items (15%)
- rule: IRS limits, thresholds, deadlines (10%)
- example: Client scenarios (10%)

Each flashcard should be a JSON object:
{
  "id": "${domainId.toLowerCase()}-fc-001",
  "section": "${domainId}",
  "type": "concept|formula|mnemonic|comparison|rule|example",
  "topic": "Topic name",
  "subtopic": "Specific subtopic",
  "blueprintArea": "${domainId}",
  "front": "Question or prompt (concise, exam-focused)",
  "back": "Answer with **bold** key terms, bullet points for lists, current 2025/2026 limits",
  "mnemonic": "Memory aid if applicable (null otherwise)",
  "difficulty": "easy|medium|hard",
  "tags": ["tag1", "tag2"]
}

Requirements:
1. Use CURRENT 2025/2026 tax limits and contribution limits
2. Include SECURE 2.0 Act changes for retirement topics
3. Make mnemonics memorable (acronyms, phrases)
4. For investment topics, include formulas (Sharpe ratio, duration, etc.)
5. Reference CFP Board Standards for ethics topics
6. Include practical client scenario applications

Return ONLY a valid JSON array with ${count} flashcards. No markdown code fences.`;
}

// ─── File operations ───

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadExistingFlashcards(course) {
  const filePath = path.join(OUTPUT_DIR, course, 'flashcards.json');
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      return { flashcards: [], version: '1.0.0', generatedAt: null };
    }
  }
  return { flashcards: [], version: '1.0.0', generatedAt: null };
}

function saveFlashcards(course, data) {
  const dir = path.join(OUTPUT_DIR, course);
  ensureDir(dir);
  const filePath = path.join(dir, 'flashcards.json');
  data.generatedAt = new Date().toISOString();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`  ✅ Saved ${data.flashcards.length} flashcards to ${path.relative(PROJECT_ROOT, filePath)}`);
}

// ─── Main generation ───

async function generateFlashcards(course, blueprint, promptBuilder) {
  console.log(`\n📦 Generating ${course.toUpperCase()} Flashcards\n`);
  
  const existingData = loadExistingFlashcards(course);
  const existingIds = new Set(existingData.flashcards.map(f => f.id));
  let allCards = [...existingData.flashcards];
  let totalGenerated = 0;
  
  for (const [areaId, areaConfig] of Object.entries(blueprint)) {
    // Count existing cards for this area
    const existingCount = allCards.filter(f => f.blueprintArea === areaId).length;
    const needed = Math.min(LIMIT, areaConfig.targetCards - existingCount);
    
    if (needed <= 0) {
      console.log(`  ${areaId}: ${existingCount} cards (target met)`);
      continue;
    }
    
    console.log(`  ${areaId}: Generating ${needed} cards (have ${existingCount}, target ${areaConfig.targetCards})`);
    
    if (DRY_RUN) {
      continue;
    }
    
    try {
      const prompt = promptBuilder(areaId, areaConfig, needed);
      const newCards = await callGemini(prompt);
      
      // Dedupe and add IDs
      let addedCount = 0;
      for (const card of newCards) {
        // Generate unique ID
        const baseId = `${areaId.toLowerCase()}-fc-`;
        let counter = allCards.filter(f => f.blueprintArea === areaId).length + addedCount + 1;
        card.id = `${baseId}${String(counter).padStart(3, '0')}`;
        
        if (!existingIds.has(card.id)) {
          allCards.push(card);
          existingIds.add(card.id);
          addedCount++;
        }
      }
      
      totalGenerated += addedCount;
      console.log(`    Added ${addedCount} cards`);
      
      // Rate limiting
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (err) {
      console.log(`    ERROR: ${err.message}`);
    }
  }
  
  // Save all cards
  if (!DRY_RUN && totalGenerated > 0) {
    existingData.flashcards = allCards;
    saveFlashcards(course, existingData);
  }
  
  return { total: allCards.length, generated: totalGenerated };
}

async function showStatus() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║               FLASHCARD INVENTORY STATUS                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  const courses = [
    { id: 'cma', blueprint: CMA_BLUEPRINT },
    { id: 'cfp', blueprint: CFP_BLUEPRINT },
  ];
  
  for (const { id, blueprint } of courses) {
    console.log(`📦 ${id.toUpperCase()} Flashcards`);
    
    const data = loadExistingFlashcards(id);
    const cards = data.flashcards || [];
    
    let totalTarget = 0;
    for (const [areaId, config] of Object.entries(blueprint)) {
      const count = cards.filter(f => f.blueprintArea === areaId).length;
      totalTarget += config.targetCards;
      const pct = Math.round((count / config.targetCards) * 100);
      const bar = '█'.repeat(Math.min(20, Math.round(pct / 5))) + '░'.repeat(Math.max(0, 20 - Math.round(pct / 5)));
      console.log(`   ${areaId}: [${bar}] ${count}/${config.targetCards} (${pct}%)`);
    }
    
    const totalPct = totalTarget > 0 ? Math.round((cards.length / totalTarget) * 100) : 0;
    console.log(`\n   Total: ${cards.length}/${totalTarget} (${totalPct}%)\n`);
  }
}

async function main() {
  if (!GEMINI_API_KEY && !STATUS_ONLY) {
    console.error('ERROR: GEMINI_API_KEY or VITE_GEMINI_API_KEY must be set');
    process.exit(1);
  }
  
  if (STATUS_ONLY || !typeArg) {
    await showStatus();
    return;
  }
  
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║              FLASHCARD GENERATION                           ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\nMode: ${DRY_RUN ? '🧪 DRY RUN' : '📝 LIVE'}`);
  console.log(`Limit per area: ${LIMIT}`);
  
  const validTypes = ['cma', 'cfp', 'all'];
  if (!validTypes.includes(typeArg)) {
    console.error(`\nInvalid type: ${typeArg}. Valid: ${validTypes.join(', ')}`);
    process.exit(1);
  }
  
  let totalGenerated = 0;
  
  if (typeArg === 'cma' || typeArg === 'all') {
    const result = await generateFlashcards('cma', CMA_BLUEPRINT, buildCMAPrompt);
    totalGenerated += result.generated;
  }
  
  if (typeArg === 'cfp' || typeArg === 'all') {
    const result = await generateFlashcards('cfp', CFP_BLUEPRINT, buildCFPPrompt);
    totalGenerated += result.generated;
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`Total generated: ${totalGenerated} flashcards`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
