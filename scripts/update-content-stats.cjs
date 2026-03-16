#!/usr/bin/env node
/**
 * update-content-stats.cjs - Update shared/content-stats.json with accurate counts
 * 
 * Run: node scripts/update-content-stats.cjs
 */

const fs = require('fs');
const path = require('path');

const courses = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];

function countQuestions() {
  const stats = {};
  
  for (const course of courses) {
    stats[course] = { questions: 0 };
    
    // Count questions from content/{course}/{section}/questions.json
    const contentDir = path.join('content', course);
    if (fs.existsSync(contentDir)) {
      const sections = fs.readdirSync(contentDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);
      
      for (const section of sections) {
        const qFile = path.join(contentDir, section, 'questions.json');
        if (fs.existsSync(qFile)) {
          try {
            const data = JSON.parse(fs.readFileSync(qFile, 'utf8'));
            const qs = data.questions || data;
            stats[course].questions += Array.isArray(qs) ? qs.length : 0;
          } catch (e) {
            console.error(`Error reading ${qFile}:`, e.message);
          }
        }
      }
    }
  }
  
  return stats;
}

function main() {
  const stats = countQuestions();
  
  // Load current JSON
  const jsonPath = 'shared/content-stats.json';
  const current = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  console.log('=== QUESTION COUNT COMPARISON ===');
  console.log('Course | In JSON | Actual | Diff');
  console.log('-------|---------|--------|------');
  
  let allMatch = true;
  for (const course of courses) {
    const inJson = current[course]?.questions || 0;
    const actual = stats[course].questions;
    const diff = actual - inJson;
    const match = diff === 0 ? '✓' : (diff > 0 ? '+' + diff : String(diff));
    if (diff !== 0) allMatch = false;
    console.log(`${course.toUpperCase().padEnd(7)}| ${String(inJson).padEnd(8)}| ${String(actual).padEnd(7)}| ${match}`);
  }
  
  console.log('');
  
  if (!allMatch) {
    console.log('Updating shared/content-stats.json with actual counts...');
    for (const course of courses) {
      current[course].questions = stats[course].questions;
    }
    fs.writeFileSync(jsonPath, JSON.stringify(current, null, 2) + '\n');
    console.log('Done!');
    console.log('');
    console.log('Updated JSON:');
    console.log(JSON.stringify(current, null, 2));
  } else {
    console.log('All counts match! No update needed.');
  }
}

main();
