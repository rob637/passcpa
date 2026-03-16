#!/usr/bin/env node
/**
 * case-study-generate.cjs: AI-powered CFP case study generation
 * 
 * Generates comprehensive CFP case studies with:
 * - Realistic client scenarios (demographics, assets, goals)
 * - Multi-domain questions (5-8 per case)
 * - UWorld-style enhanced explanations
 * 
 * Usage:
 *   node scripts/case-study-generate.cjs --status            # Show current counts
 *   node scripts/case-study-generate.cjs --generate=10       # Generate 10 case studies
 *   node scripts/case-study-generate.cjs --dry-run           # Preview without writing
 * 
 * Environment:
 *   GEMINI_API_KEY or VITE_GEMINI_API_KEY must be set
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'content', 'cfp', 'case-studies.json');

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Parse command line args
const args = process.argv.slice(2);
const STATUS_ONLY = args.includes('--status');
const DRY_RUN = args.includes('--dry-run');

const GENERATE_COUNT = (() => {
  const idx = args.findIndex(a => a.startsWith('--generate'));
  if (idx >= 0) {
    const val = args[idx].includes('=') ? args[idx].split('=')[1] : args[idx + 1];
    return parseInt(val, 10) || 5;
  }
  return 0;
})();

// CFP Domain weights (for realistic distribution)
const CFP_DOMAINS = {
  'RET': { name: 'Retirement', weight: 18 },
  'INV': { name: 'Investment', weight: 17 },
  'GEN': { name: 'General Planning', weight: 17 },
  'TAX': { name: 'Tax', weight: 14 },
  'RISK': { name: 'Risk/Insurance', weight: 12 },
  'EST': { name: 'Estate', weight: 12 },
  'PSY': { name: 'Psychology', weight: 7 },
  'PCR': { name: 'Professional Conduct', weight: 3 },
};

// Case study scenario themes
const SCENARIO_TYPES = [
  'young_professional_couple',
  'mid_career_family',
  'pre_retiree',
  'business_owner',
  'divorced_parent',
  'sudden_wealth',
  'sandwich_generation',
  'military_family',
  'healthcare_professional',
  'tech_executive',
  'early_retirement_seeker',
  'widowed_client',
  'blended_family',
  'nonprofit_executive',
  'dual_income_professionals',
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
            temperature: 0.8,
            maxOutputTokens: 8000,
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

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON object found in response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (err) {
      if (attempt === retries) {
        throw err;
      }
      console.log(`    Attempt ${attempt} failed: ${err.message}. Retrying...`);
      await new Promise(r => setTimeout(r, 3000 * attempt));
    }
  }
}

// ─── Prompt builder ───

function buildCaseStudyPrompt(caseNumber, scenarioType) {
  // Select 4-5 domains for this case
  const domainKeys = Object.keys(CFP_DOMAINS);
  const selectedDomains = [];
  
  // Always include RET, INV, or TAX (high-weight domains)
  const mustHave = ['RET', 'INV', 'TAX'];
  selectedDomains.push(mustHave[Math.floor(Math.random() * mustHave.length)]);
  
  // Add 3-4 more random domains
  while (selectedDomains.length < 5) {
    const domain = domainKeys[Math.floor(Math.random() * domainKeys.length)];
    if (!selectedDomains.includes(domain)) {
      selectedDomains.push(domain);
    }
  }
  
  return `You are a CFP exam expert creating a comprehensive case study for the CFP certification exam.

CASE STUDY #${caseNumber}
SCENARIO TYPE: ${scenarioType.replace(/_/g, ' ')}
DOMAINS TO COVER: ${selectedDomains.join(', ')}

Generate a complete case study as a JSON object with this structure:

{
  "id": "CFP-CASE-${String(caseNumber).padStart(3, '0')}",
  "title": "Descriptive title with client name",
  "courseId": "cfp",
  "difficulty": "medium" or "hard",
  "estimatedTime": 20-30,
  "domains": ${JSON.stringify(selectedDomains)},
  "scenario": "Detailed markdown scenario with:\\n## Client Profile\\n**Name** (Age)\\n- Career/income\\n- Family situation\\n\\n**Assets:**\\n- List all assets with values\\n\\n**Liabilities:**\\n- List all debts\\n\\n**Insurance:**\\n- Current coverage\\n\\n**Estate Planning:**\\n- Current documents\\n\\n**Goals:**\\n1. Primary goal\\n2. Secondary goals\\n\\n**Risk Tolerance:** Description\\n\\n**Special Circumstances:** Unique factors",
  "questions": [
    {
      "id": "CFP-CASE-${String(caseNumber).padStart(3, '0')}-Q1",
      "domain": "DOMAIN_CODE",
      "question": "Specific question about the case",
      "options": [
        {"id": "A", "text": "Option A"},
        {"id": "B", "text": "Option B"},
        {"id": "C", "text": "Option C"},
        {"id": "D", "text": "Option D"}
      ],
      "correctOptionId": "B",
      "explanation": "**Full UWorld-style explanation**\\n\\nWhy correct answer is correct:\\n- Key point 1\\n- Key point 2\\n\\n**Why other options are wrong:**\\n- A) Explanation\\n- C) Explanation\\n- D) Explanation\\n\\n**Key Concept:** Relevant CFP topic\\n\\n**Exam Tip:** Practical advice"
    }
  ],
  "scoringGuide": null
}

REQUIREMENTS:
1. Create a REALISTIC client scenario with specific numbers (income, assets, ages)
2. Include 6-8 questions, one for each domain listed
3. Questions should require analysis of the specific case facts
4. Use current 2025/2026 tax limits and rules (401k: $23,500, IRA: $7,000, IRMAA thresholds, etc.)
5. Include SECURE 2.0 Act considerations for retirement questions
6. Make explanations comprehensive with calculations where applicable
7. Each question should have exactly ONE correct answer
8. Scenario should be 400-600 words with markdown formatting

Return ONLY valid JSON, no markdown code fences.`;
}

// ─── File operations ───

function loadExistingCaseStudies() {
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
    } catch (e) {
      console.log('  Warning: Could not parse existing file, starting fresh');
      return { caseStudies: [], version: '1.0.0' };
    }
  }
  return { caseStudies: [], version: '1.0.0' };
}

function saveCaseStudies(data) {
  data.generatedAt = new Date().toISOString();
  data.version = '1.0.0';
  data['$schema'] = '../schema/case-study.schema.json';
  data.courseId = 'cfp';
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`  ✅ Saved ${data.caseStudies.length} case studies`);
}

// ─── Main functions ───

async function showStatus() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║               CFP CASE STUDY STATUS                         ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  const data = loadExistingCaseStudies();
  const cases = data.caseStudies || [];
  
  console.log(`Total Case Studies: ${cases.length}`);
  console.log(`Total Questions: ${cases.reduce((sum, c) => sum + (c.questions?.length || 0), 0)}`);
  console.log('');
  
  // Domain distribution
  const domainCounts = {};
  for (const cs of cases) {
    for (const domain of (cs.domains || [])) {
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    }
  }
  
  console.log('Domain Coverage:');
  for (const [domain, config] of Object.entries(CFP_DOMAINS)) {
    const count = domainCounts[domain] || 0;
    console.log(`  ${domain}: ${count} cases`);
  }
  
  console.log('\n');
  console.log('Difficulty Distribution:');
  const diffCounts = { easy: 0, medium: 0, hard: 0 };
  for (const cs of cases) {
    diffCounts[cs.difficulty] = (diffCounts[cs.difficulty] || 0) + 1;
  }
  console.log(`  Easy: ${diffCounts.easy}, Medium: ${diffCounts.medium}, Hard: ${diffCounts.hard}`);
  
  // Competitor benchmark
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('Competitor Benchmark: 30-50 case studies recommended');
  const needed = Math.max(0, 50 - cases.length);
  console.log(`Current: ${cases.length}, Gap: ${needed > 0 ? needed + ' more needed' : 'At target!'}`);
}

async function generateCaseStudies(count) {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║              CFP CASE STUDY GENERATION                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\nMode: ${DRY_RUN ? '🧪 DRY RUN' : '📝 LIVE'}`);
  console.log(`Generating: ${count} case studies\n`);
  
  const data = loadExistingCaseStudies();
  const existingIds = new Set(data.caseStudies.map(c => c.id));
  let nextNumber = data.caseStudies.length + 1;
  let generated = 0;
  let errors = 0;
  
  for (let i = 0; i < count; i++) {
    const scenarioType = SCENARIO_TYPES[(nextNumber - 1) % SCENARIO_TYPES.length];
    console.log(`  Generating case #${nextNumber}: ${scenarioType.replace(/_/g, ' ')}...`);
    
    if (DRY_RUN) {
      nextNumber++;
      generated++;
      continue;
    }
    
    try {
      const caseStudy = await callGemini(buildCaseStudyPrompt(nextNumber, scenarioType));
      
      // Ensure unique ID
      if (existingIds.has(caseStudy.id)) {
        caseStudy.id = `CFP-CASE-${String(nextNumber).padStart(3, '0')}`;
      }
      
      // Mark all questions as enhanced
      for (const q of (caseStudy.questions || [])) {
        q.enhanced = true;
      }
      
      data.caseStudies.push(caseStudy);
      existingIds.add(caseStudy.id);
      nextNumber++;
      generated++;
      
      console.log(`    ✓ Created "${caseStudy.title}" with ${caseStudy.questions?.length || 0} questions`);
      
      // Save periodically
      if (generated % 5 === 0) {
        saveCaseStudies(data);
      }
      
      // Rate limiting
      await new Promise(r => setTimeout(r, 2000));
      
    } catch (err) {
      console.log(`    ✗ ERROR: ${err.message}`);
      errors++;
      nextNumber++;
    }
  }
  
  // Final save
  if (!DRY_RUN && generated > 0) {
    saveCaseStudies(data);
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`Generated: ${generated} case studies, Errors: ${errors}`);
  console.log(`Total: ${data.caseStudies.length} case studies`);
}

async function main() {
  if (!GEMINI_API_KEY && !STATUS_ONLY) {
    console.error('ERROR: GEMINI_API_KEY or VITE_GEMINI_API_KEY must be set');
    process.exit(1);
  }
  
  if (GENERATE_COUNT > 0) {
    await generateCaseStudies(GENERATE_COUNT);
  } else {
    await showStatus();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
