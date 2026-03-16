#!/usr/bin/env npx tsx
/**
 * Extract lesson data from TypeScript to JSON
 * Run with: npx tsx extract_lessons.ts <section>
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const section = process.argv[2];

if (!section) {
  console.error('Usage: npx tsx extract_lessons.ts <section>');
  console.error('Example: npx tsx extract_lessons.ts far');
  process.exit(1);
}

// Dynamic import of the lessons
async function extractSection(sectionName: string) {
  const outputDir = join(__dirname, 'json');
  
  try {
    // Import the section's lessons
    const modulePath = `../../src/data/cpa/lessons/${sectionName}`;
    const mod = await import(modulePath);
    
    const exportName = `${sectionName}Lessons`;
    const lessons = mod[exportName] || mod.default;
    
    if (!lessons) {
      console.error(`❌ Could not find export '${exportName}' in ${sectionName}.ts`);
      process.exit(1);
    }
    
    // Create output directory
    mkdirSync(outputDir, { recursive: true });
    
    // Write JSON
    const outputPath = join(outputDir, `${sectionName}.json`);
    writeFileSync(outputPath, JSON.stringify(lessons, null, 2));
    
    console.log(`✅ Extracted ${lessons.length} lessons to ${outputPath}`);
    
  } catch (error) {
    console.error(`❌ Error extracting ${sectionName}:`, error);
    process.exit(1);
  }
}

extractSection(section);
