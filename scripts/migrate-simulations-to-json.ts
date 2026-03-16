#!/usr/bin/env npx tsx
/**
 * Simulation Content Migration Script
 * 
 * Migrates CMA CBQ, CFP Case Studies, and CMA Practice Simulations from TypeScript to JSON.
 * 
 * Usage:
 *   npx tsx scripts/migrate-simulations-to-json.ts [--dry-run] [--type=cbq|cases|sims|all]
 * 
 * Options:
 *   --dry-run        Show what would be migrated without writing files
 *   --type=cbq       Only migrate CMA CBQ scenarios
 *   --type=cases     Only migrate CFP Case Studies
 *   --type=sims      Only migrate CMA Practice Simulations
 *   --type=all       Migrate all types (default)
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Import all source data
import { CMA1_CBQS, CMA2_CBQS, ALL_CMA_CBQS } from '../src/data/cma/cbq/index.js';
import { CFP_CASE_STUDIES } from '../src/data/cfp/case-studies/index.js';
import { 
  CMA1_PRACTICE_SIMULATIONS, 
  CMA2_PRACTICE_SIMULATIONS,
  ALL_PRACTICE_SIMULATIONS 
} from '../src/data/cma/practice-simulations/index.js';

import type { CBQ, CBQQuestion, CaseStudy, CaseStudyQuestion } from '../src/types/index.js';
import type { PracticeSimulation, SimulationTask } from '../src/data/cma/practice-simulations/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONTENT_DIR = path.join(__dirname, '../content');
const CBQ_SCHEMA_REF = '../schema/cbq.schema.json';
const CASE_SCHEMA_REF = '../schema/case-study.schema.json';
const SIM_SCHEMA_REF = '../schema/practice-simulation.schema.json';

// Parse command line args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const typeArg = args.find(a => a.startsWith('--type='));
const MIGRATE_TYPE = typeArg ? typeArg.split('=')[1] : 'all';

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║       SIMULATION CONTENT MIGRATION: TypeScript → JSON      ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log(`\n  Mode: ${DRY_RUN ? '🧪 DRY RUN' : '📝 LIVE'}`);
console.log(`  Type: ${MIGRATE_TYPE}`);
console.log('');

interface MigrationStats {
  cbqScenarios: number;
  cbqQuestions: number;
  caseStudies: number;
  caseQuestions: number;
  simulations: number;
  simTasks: number;
  filesCreated: number;
  errors: string[];
}

const stats: MigrationStats = {
  cbqScenarios: 0,
  cbqQuestions: 0,
  caseStudies: 0,
  caseQuestions: 0,
  simulations: 0,
  simTasks: 0,
  filesCreated: 0,
  errors: [],
};

/**
 * Check if a CBQ question explanation is enhanced
 */
function isCBQQuestionEnhanced(q: CBQQuestion): boolean {
  const exp = q.explanation || '';
  return exp.includes('Step-by-Step') || 
         exp.includes('**Solution:**') ||
         exp.includes('**Key Concept') ||
         exp.length > 300;
}

/**
 * Check if a Case Study question explanation is enhanced
 */
function isCaseQuestionEnhanced(q: CaseStudyQuestion): boolean {
  const exp = q.explanation || '';
  return exp.includes('Step-by-Step') || 
         exp.includes('**Key Concept') ||
         exp.includes('Why each option') ||
         exp.length > 300;
}

/**
 * Check if a Task solution is enhanced
 */
function isTaskEnhanced(t: SimulationTask): boolean {
  const exp = t.solution?.explanation || '';
  return exp.includes('Step-by-Step') || 
         exp.includes('**Key Concept') ||
         exp.includes('**Common Mistake') ||
         exp.length > 400;
}

/**
 * Process CBQ for JSON export
 */
function processCBQ(cbq: CBQ): object {
  const questions = cbq.questions.map(q => ({
    ...q,
    enhanced: isCBQQuestionEnhanced(q),
  }));
  
  stats.cbqQuestions += questions.length;
  
  return {
    id: cbq.id,
    section: cbq.section,
    title: cbq.title,
    scenario: cbq.scenario,
    exhibits: cbq.exhibits || [],
    questions,
    totalPoints: cbq.totalPoints,
    estimatedMinutes: cbq.estimatedTime,
    difficulty: cbq.difficulty,
    topics: cbq.topics,
    blueprintArea: cbq.blueprintArea,
  };
}

/**
 * Process Case Study for JSON export
 */
function processCaseStudy(cs: CaseStudy): object {
  const questions = cs.questions.map(q => ({
    ...q,
    enhanced: isCaseQuestionEnhanced(q),
  }));
  
  stats.caseQuestions += questions.length;
  
  return {
    id: cs.id,
    title: cs.title,
    courseId: cs.courseId,
    difficulty: cs.difficulty,
    estimatedTime: cs.estimatedTime,
    domains: cs.domains,
    scenario: cs.scenario,
    questions,
    scoringGuide: cs.scoringGuide || null,
  };
}

/**
 * Process Practice Simulation for JSON export
 */
function processSimulation(sim: PracticeSimulation): object {
  const tasks = sim.tasks.map(t => ({
    ...t,
    enhanced: isTaskEnhanced(t),
  }));
  
  stats.simTasks += tasks.length;
  
  return {
    id: sim.id,
    section: sim.section,
    title: sim.title,
    blueprintArea: sim.blueprintArea,
    topic: sim.topic,
    difficulty: sim.difficulty,
    estimatedTime: sim.estimatedTime,
    scenario: sim.scenario,
    exhibits: sim.exhibits,
    tasks,
    skills: sim.skills,
    relatedConcepts: sim.relatedConcepts,
  };
}

/**
 * Write JSON to file
 */
function writeJsonFile(filePath: string, data: object): void {
  if (DRY_RUN) {
    console.log(`  📄 Would create: ${path.relative(process.cwd(), filePath)}`);
    return;
  }
  
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  ✅ Created: ${path.relative(process.cwd(), filePath)}`);
  stats.filesCreated++;
}

/**
 * Migrate CMA CBQ scenarios
 */
function migrateCBQs(): void {
  console.log('\n📦 Migrating CMA CBQ Scenarios...\n');
  
  // Use ALL_CMA_CBQS and split by section to include all batch files
  const allCma1CBQs = ALL_CMA_CBQS.filter(cbq => cbq.section === 'CMA1');
  const allCma2CBQs = ALL_CMA_CBQS.filter(cbq => cbq.section === 'CMA2');
  
  // Process CMA1 CBQs
  const cma1CBQs = allCma1CBQs.map(processCBQ);
  stats.cbqScenarios += cma1CBQs.length;
  
  const cma1Json = {
    $schema: CBQ_SCHEMA_REF,
    version: '1.0.0',
    courseId: 'cma',
    section: 'CMA1',
    generatedAt: new Date().toISOString(),
    scenarios: cma1CBQs,
  };
  
  writeJsonFile(path.join(CONTENT_DIR, 'cma/CMA1/cbq.json'), cma1Json);
  
  // Process CMA2 CBQs
  const cma2CBQs = allCma2CBQs.map(processCBQ);
  stats.cbqScenarios += cma2CBQs.length;
  
  const cma2Json = {
    $schema: CBQ_SCHEMA_REF,
    version: '1.0.0',
    courseId: 'cma',
    section: 'CMA2',
    generatedAt: new Date().toISOString(),
    scenarios: cma2CBQs,
  };
  
  writeJsonFile(path.join(CONTENT_DIR, 'cma/CMA2/cbq.json'), cma2Json);
  
  console.log(`\n  CBQ Summary: ${stats.cbqScenarios} scenarios, ${stats.cbqQuestions} questions`);
}

/**
 * Migrate CFP Case Studies
 */
function migrateCaseStudies(): void {
  console.log('\n📦 Migrating CFP Case Studies...\n');
  
  const caseStudies = CFP_CASE_STUDIES.map(processCaseStudy);
  stats.caseStudies = caseStudies.length;
  
  const casesJson = {
    $schema: CASE_SCHEMA_REF,
    version: '1.0.0',
    courseId: 'cfp',
    generatedAt: new Date().toISOString(),
    caseStudies,
  };
  
  writeJsonFile(path.join(CONTENT_DIR, 'cfp/case-studies.json'), casesJson);
  
  console.log(`\n  Case Study Summary: ${stats.caseStudies} case studies, ${stats.caseQuestions} questions`);
}

/**
 * Migrate CMA Practice Simulations
 */
function migrateSimulations(): void {
  console.log('\n📦 Migrating CMA Practice Simulations...\n');
  
  // Process CMA1 Simulations
  const cma1Sims = CMA1_PRACTICE_SIMULATIONS.map(processSimulation);
  
  const cma1Json = {
    $schema: SIM_SCHEMA_REF,
    version: '1.0.0',
    courseId: 'cma',
    section: 'CMA1',
    generatedAt: new Date().toISOString(),
    simulations: cma1Sims,
  };
  
  writeJsonFile(path.join(CONTENT_DIR, 'cma/CMA1/practice-simulations.json'), cma1Json);
  
  // Process CMA2 Simulations
  const cma2Sims = CMA2_PRACTICE_SIMULATIONS.map(processSimulation);
  
  const cma2Json = {
    $schema: SIM_SCHEMA_REF,
    version: '1.0.0',
    courseId: 'cma',
    section: 'CMA2',
    generatedAt: new Date().toISOString(),
    simulations: cma2Sims,
  };
  
  writeJsonFile(path.join(CONTENT_DIR, 'cma/CMA2/practice-simulations.json'), cma2Json);
  
  stats.simulations = cma1Sims.length + cma2Sims.length;
  console.log(`\n  Simulation Summary: ${stats.simulations} simulations, ${stats.simTasks} tasks`);
}

// Main execution
async function main() {
  try {
    if (MIGRATE_TYPE === 'all' || MIGRATE_TYPE === 'cbq') {
      migrateCBQs();
    }
    
    if (MIGRATE_TYPE === 'all' || MIGRATE_TYPE === 'cases') {
      migrateCaseStudies();
    }
    
    if (MIGRATE_TYPE === 'all' || MIGRATE_TYPE === 'sims') {
      migrateSimulations();
    }
    
    // Print summary
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                    MIGRATION COMPLETE                       ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log(`
  📊 Summary:
     CBQ Scenarios: ${stats.cbqScenarios}
     CBQ Questions: ${stats.cbqQuestions}
     Case Studies:  ${stats.caseStudies}
     Case Questions: ${stats.caseQuestions}
     Simulations:   ${stats.simulations}
     Sim Tasks:     ${stats.simTasks}
     Files Created: ${stats.filesCreated}
`);
    
    if (DRY_RUN) {
      console.log('  ⚠️  This was a dry run. No files were created.');
      console.log('     Run without --dry-run to create files.\n');
    }
    
    if (stats.errors.length > 0) {
      console.log('  ❌ Errors:');
      stats.errors.forEach(e => console.log(`     - ${e}`));
    }
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
