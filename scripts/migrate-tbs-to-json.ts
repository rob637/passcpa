#!/usr/bin/env npx tsx
/**
 * TBS Migration Script - TypeScript to JSON
 * 
 * Converts TBS data from TypeScript modules to JSON format with enhanced explanations.
 * 
 * Usage:
 *   npx tsx scripts/migrate-tbs-to-json.ts [--dry-run] [--enhance]
 * 
 * Options:
 *   --dry-run   Show what would be migrated without writing files
 *   --enhance   Add UWorld-style explanation formatting markers
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Import all TBS data from the index
import {
  getTBSBySection,
  ALL_TBS,
} from '../src/data/cpa/tbs/index.js';

import type { TBS, TBSRequirement } from '../src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONTENT_DIR = path.join(__dirname, '../content/cpa');
const SCHEMA_REF = '../schema/tbs.schema.json';

// Parse command line args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const ENHANCE = args.includes('--enhance');

// Valid sections for CPA
const CPA_SECTIONS = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

/**
 * Enhance a TBS requirement explanation to UWorld-style
 */
function enhanceExplanation(req: TBSRequirement, tbsTitle?: string): string {
  const original = req.explanation || '';
  
  // Already enhanced?
  if (original.includes('**Step-by-Step') || 
      original.includes('**Correct Answer') ||
      original.includes('**Solution:**')) {
    return original;
  }
  
  // No explanation to enhance
  if (!original || original.length < 20) {
    return original;
  }
  
  let enhanced = '';
  const reqType = req.type || 'calculation';
  
  if (reqType === 'calculation') {
    enhanced = `**Step-by-Step Solution:**\n\n${original}`;
    
    // Add common mistake if not present
    if (!original.toLowerCase().includes('common mistake') && 
        !original.toLowerCase().includes('common error') &&
        !original.toLowerCase().includes('trap')) {
      enhanced += '\n\n**Common Mistake:** Candidates often miss a step in this calculation or use the wrong rate/period. Always verify your units match and your answer is reasonable.';
    }
  } else if (reqType === 'journal_entry') {
    enhanced = `**Journal Entry Solution:**\n\n${original}`;
    
    if (!original.toLowerCase().includes('key concept')) {
      enhanced += '\n\n**Key Concept:** Remember that debits must equal credits. Check that you\'ve correctly identified whether each account increases or decreases.';
    }
  } else if (reqType === 'multiple_choice') {
    enhanced = `**Correct Answer Explanation:**\n\n${original}`;
  } else if (reqType === 'reconciliation') {
    enhanced = `**Reconciliation Solution:**\n\n${original}`;
  } else {
    enhanced = original;
  }
  
  // Add exam tip if not present
  if (!original.toLowerCase().includes('exam tip') && 
      !original.toLowerCase().includes('💡') &&
      !original.toLowerCase().includes('tip:')) {
    enhanced += '\n\n**Exam Tip:** Always verify your answer makes sense in the context of the scenario before moving on.';
  }
  
  return enhanced;
}

/**
 * Process a TBS for JSON export
 */
function processTBS(tbs: TBS, sourceFile: string): object {
  // Process requirements
  const requirements = (tbs.requirements || tbs.questions || []).map((req, idx) => {
    const processed: Record<string, unknown> = {
      id: req.id || `req-${idx + 1}`,
      type: req.type || 'calculation',
      question: req.question || req.text || '',
    };
    
    if (req.options) processed.options = req.options;
    if (req.correctAnswer !== undefined) processed.correctAnswer = req.correctAnswer;
    if (req.correctEntries) processed.correctEntries = req.correctEntries;
    if (req.tolerance !== undefined) processed.tolerance = req.tolerance;
    if (req.points !== undefined) processed.points = req.points;
    if (req.hints) processed.hints = req.hints;
    
    // Handle explanation
    const explanation = ENHANCE 
      ? enhanceExplanation(req as TBSRequirement, tbs.title)
      : (req.explanation || '');
    if (explanation) processed.explanation = explanation;
    
    return processed;
  });
  
  // Build processed TBS
  const processed: Record<string, unknown> = {
    id: tbs.id,
    version: 1,
    status: 'approved',
    courseId: tbs.courseId || 'cpa',
    section: tbs.section,
    type: tbs.type,
  };
  
  if (tbs.blueprintArea) processed.blueprintArea = tbs.blueprintArea;
  if (tbs.title) processed.title = tbs.title;
  if (tbs.topic) processed.topic = tbs.topic;
  processed.difficulty = tbs.difficulty || 'medium';
  processed.timeEstimate = tbs.timeEstimate || tbs.estimatedTime || 15;
  
  // Clean up scenario (trim whitespace)
  if (tbs.scenario) {
    processed.scenario = tbs.scenario.trim();
  }
  
  if (tbs.exhibits && tbs.exhibits.length > 0) {
    processed.exhibits = tbs.exhibits;
  }
  
  processed.requirements = requirements;
  
  if (tbs.hints && tbs.hints.length > 0) {
    processed.hints = tbs.hints;
  }
  if (tbs.references && tbs.references.length > 0) {
    processed.references = tbs.references;
  }
  
  processed.sourceFile = sourceFile;
  
  return processed;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('TBS Migration: TypeScript → JSON');
  console.log('================================');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Enhance: ${ENHANCE ? 'YES' : 'NO'}`);
  console.log('');
  
  // Get all TBS from the existing data
  const allTBS = ALL_TBS;
  console.log(`Total TBS loaded: ${allTBS.length}`);
  
  // Group by section
  const tbsBySection: Record<string, TBS[]> = {};
  
  for (const tbs of allTBS) {
    const section = tbs.section?.toUpperCase();
    
    if (!section || !CPA_SECTIONS.includes(section)) {
      console.log(`  Skipping ${tbs.id}: invalid section "${section}"`);
      continue;
    }
    
    if (!tbsBySection[section]) {
      tbsBySection[section] = [];
    }
    tbsBySection[section].push(tbs);
  }
  
  // Count statistics
  let totalTBS = 0;
  let totalRequirements = 0;
  let enhancedCount = 0;
  
  console.log('\nTBS by Section:');
  for (const [section, tbsList] of Object.entries(tbsBySection)) {
    const reqCount = tbsList.reduce((sum, t) => sum + (t.requirements?.length || 0), 0);
    console.log(`  ${section}: ${tbsList.length} TBS, ${reqCount} requirements`);
    totalTBS += tbsList.length;
    totalRequirements += reqCount;
    
    // Count already enhanced
    for (const tbs of tbsList) {
      for (const req of (tbs.requirements || [])) {
        const expl = req.explanation || '';
        if (expl.includes('**Step-by-Step') || 
            expl.includes('**Solution:') ||
            expl.includes('**Correct Answer')) {
          enhancedCount++;
        }
      }
    }
  }
  
  console.log(`\nTotal: ${totalTBS} TBS, ${totalRequirements} requirements`);
  console.log(`Already enhanced: ${enhancedCount} requirements`);
  console.log(`Need enhancement: ${totalRequirements - enhancedCount} requirements`);
  
  if (DRY_RUN) {
    console.log('\n[DRY RUN] No files written');
    return;
  }
  
  // Write JSON files
  console.log('\nWriting JSON files...');
  
  for (const [section, tbsList] of Object.entries(tbsBySection)) {
    const sectionDir = path.join(CONTENT_DIR, section.toLowerCase());
    
    // Create directory if needed
    if (!fs.existsSync(sectionDir)) {
      fs.mkdirSync(sectionDir, { recursive: true });
    }
    
    // Process each TBS
    const processedTBS = tbsList
      .map(tbs => processTBS(tbs, 'migrated-from-ts'))
      .sort((a: Record<string, unknown>, b: Record<string, unknown>) => 
        String(a.id).localeCompare(String(b.id)));
    
    const output = {
      "$schema": SCHEMA_REF,
      section: section,
      exportedAt: new Date().toISOString(),
      tbs: processedTBS
    };
    
    const outputPath = path.join(sectionDir, 'tbs.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`  Wrote: content/cpa/${section.toLowerCase()}/tbs.json (${tbsList.length} TBS)`);
  }
  
  console.log('\nMigration complete!');
}

// Run
migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
