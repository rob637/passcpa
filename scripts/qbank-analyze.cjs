#!/usr/bin/env node
/**
 * qbank-analyze: Blueprint Coverage Analyzer
 * 
 * Compares actual question distribution against AICPA blueprint weights.
 * Identifies gaps, surpluses, and provides generation recommendations.
 * 
 * Usage:
 *   node scripts/qbank-analyze.cjs
 *   node scripts/qbank-analyze.cjs FAR
 *   node scripts/qbank-analyze.cjs --target 1500
 */

const fs = require('fs');
const path = require('path');

// Official AICPA Blueprint weights (midpoint of ranges)
const BLUEPRINT = {
  FAR: {
    name: 'Financial Accounting and Reporting',
    areas: {
      'FAR-I': { name: 'Conceptual Framework & Standard-Setting', weight: 10, minWeight: 5, maxWeight: 15 },
      'FAR-II': { name: 'Select Financial Statement Accounts', weight: 35, minWeight: 30, maxWeight: 40 },
      'FAR-III': { name: 'Select Transactions', weight: 30, minWeight: 25, maxWeight: 35 },
      'FAR-IV': { name: 'State and Local Governments', weight: 15, minWeight: 10, maxWeight: 20 },
      'FAR-V': { name: 'Not-for-Profit Entities', weight: 10, minWeight: 5, maxWeight: 15 },
    }
  },
  AUD: {
    name: 'Auditing and Attestation',
    areas: {
      'AUD-I': { name: 'Ethics & Professional Responsibilities', weight: 20, minWeight: 15, maxWeight: 25 },
      'AUD-II': { name: 'Assessing Risk & Planning', weight: 30, minWeight: 25, maxWeight: 35 },
      'AUD-III': { name: 'Performing Procedures & Evidence', weight: 35, minWeight: 30, maxWeight: 40 },
      'AUD-IV': { name: 'Forming Conclusions & Reporting', weight: 15, minWeight: 15, maxWeight: 25 },
    }
  },
  REG: {
    name: 'Regulation',
    areas: {
      'REG-I': { name: 'Ethics & Federal Tax Procedures', weight: 15, minWeight: 10, maxWeight: 20 },
      'REG-II': { name: 'Business Law', weight: 15, minWeight: 10, maxWeight: 20 },
      'REG-III': { name: 'Federal Taxation of Individuals', weight: 20, minWeight: 15, maxWeight: 25 },
      'REG-IV': { name: 'Federal Taxation of Entities', weight: 27, minWeight: 22, maxWeight: 32 },
      'REG-V': { name: 'Property Transactions', weight: 17, minWeight: 12, maxWeight: 22 },
    }
  },
  BAR: {
    name: 'Business Analysis and Reporting',
    areas: {
      'BAR-I': { name: 'Business Analysis', weight: 45, minWeight: 40, maxWeight: 50 },
      'BAR-II': { name: 'Technical Accounting & Reporting', weight: 40, minWeight: 35, maxWeight: 45 },
      'BAR-III': { name: 'State and Local Governments', weight: 15, minWeight: 10, maxWeight: 20 },
    }
  },
  ISC: {
    name: 'Information Systems and Controls',
    areas: {
      'ISC-I': { name: 'Information Systems', weight: 40, minWeight: 35, maxWeight: 45 },
      'ISC-II': { name: 'Security, Confidentiality & Privacy', weight: 40, minWeight: 35, maxWeight: 45 },
      'ISC-III': { name: 'SOC Considerations', weight: 20, minWeight: 15, maxWeight: 25 },
    }
  },
  TCP: {
    name: 'Tax Compliance and Planning',
    areas: {
      'TCP-I': { name: 'Individual Tax & Personal Financial Planning', weight: 35, minWeight: 30, maxWeight: 40 },
      'TCP-II': { name: 'Entity Tax Compliance', weight: 30, minWeight: 25, maxWeight: 35 },
      'TCP-III': { name: 'Entity Tax Planning', weight: 25, minWeight: 20, maxWeight: 30 },
      'TCP-IV': { name: 'Property Transactions', weight: 15, minWeight: 10, maxWeight: 20 },
    }
  }
};

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'cpa');
const SECTIONS = ['FAR', 'AUD', 'REG', 'BAR', 'ISC', 'TCP'];

// Parse command line
const args = process.argv.slice(2);
const targetPerSection = parseInt(args.find(a => a.match(/^\d+$/)) || args.find(a => a.startsWith('--target='))?.split('=')[1]) || 1500;
const sectionFilter = args.find(a => SECTIONS.includes(a.toUpperCase()))?.toUpperCase();

function loadQuestions(section) {
  const filePath = path.join(CONTENT_DIR, section.toLowerCase(), 'questions.json');
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return data.questions || [];
}

function analyzeSection(section, targetCount) {
  const questions = loadQuestions(section);
  const blueprint = BLUEPRINT[section];
  
  if (!blueprint) {
    return null;
  }
  
  // Count questions per blueprint area
  const areaCounts = {};
  for (const areaId of Object.keys(blueprint.areas)) {
    areaCounts[areaId] = 0;
  }
  areaCounts['UNMAPPED'] = 0;
  
  for (const q of questions) {
    const area = q.blueprintArea;
    if (area && areaCounts.hasOwnProperty(area)) {
      areaCounts[area]++;
    } else if (area && area.startsWith(section)) {
      // Try to map to closest area
      const normalizedArea = area.split('-').slice(0, 2).join('-');
      if (areaCounts.hasOwnProperty(normalizedArea)) {
        areaCounts[normalizedArea]++;
      } else {
        areaCounts['UNMAPPED']++;
      }
    } else {
      areaCounts['UNMAPPED']++;
    }
  }
  
  // Calculate analysis
  const totalQuestions = questions.length;
  const analysis = {
    section,
    name: blueprint.name,
    totalQuestions,
    targetCount,
    areas: [],
    recommendations: [],
  };
  
  for (const [areaId, config] of Object.entries(blueprint.areas)) {
    const count = areaCounts[areaId] || 0;
    const actualPercent = totalQuestions > 0 ? (count / totalQuestions * 100) : 0;
    const expectedPercent = config.weight;
    const expectedCount = Math.round(targetCount * config.weight / 100);
    const currentExpected = Math.round(totalQuestions * config.weight / 100);
    const gap = expectedCount - count;
    const currentGap = count - currentExpected;
    
    // Determine status
    let status;
    if (actualPercent < config.minWeight) {
      status = 'UNDER';
    } else if (actualPercent > config.maxWeight) {
      status = 'OVER';
    } else {
      status = 'OK';
    }
    
    analysis.areas.push({
      id: areaId,
      name: config.name,
      count,
      actualPercent: actualPercent.toFixed(1),
      expectedPercent,
      expectedRange: `${config.minWeight}-${config.maxWeight}%`,
      targetCount: expectedCount,
      gap,
      status,
    });
    
    // Generate recommendation
    if (gap > 0) {
      analysis.recommendations.push({
        area: areaId,
        name: config.name,
        action: 'GENERATE',
        quantity: gap,
        priority: gap > 100 ? 'HIGH' : gap > 50 ? 'MEDIUM' : 'LOW',
        reason: status === 'UNDER' 
          ? `Below blueprint minimum (${actualPercent.toFixed(1)}% vs ${config.minWeight}% min)`
          : `Need ${gap} more to reach ${targetCount} questions`,
      });
    }
  }
  
  // Sort recommendations by priority
  const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
  analysis.recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  // Add unmapped info
  if (areaCounts['UNMAPPED'] > 0) {
    analysis.unmappedCount = areaCounts['UNMAPPED'];
  }
  
  return analysis;
}

function printSectionAnalysis(analysis) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  ${analysis.section}: ${analysis.name}`);
  console.log(`  Current: ${analysis.totalQuestions} questions │ Target: ${analysis.targetCount} questions`);
  console.log(`${'═'.repeat(70)}`);
  
  // Header
  console.log('');
  console.log(`  ${'Area'.padEnd(12)} │ ${'Name'.padEnd(30)} │ ${'Count'.padStart(5)} │ ${'Actual'.padStart(6)} │ ${'Target'.padStart(6)} │ ${'Gap'.padStart(5)} │ Status`);
  console.log(`  ${'─'.repeat(12)}─┼─${'─'.repeat(30)}─┼─${'─'.repeat(5)}─┼─${'─'.repeat(6)}─┼─${'─'.repeat(6)}─┼─${'─'.repeat(5)}─┼─${'─'.repeat(6)}`);
  
  for (const area of analysis.areas) {
    const statusIcon = area.status === 'OK' ? '✓' : area.status === 'UNDER' ? '⚠️' : '▲';
    const gapStr = area.gap > 0 ? `+${area.gap}` : area.gap.toString();
    console.log(`  ${area.id.padEnd(12)} │ ${area.name.substring(0, 30).padEnd(30)} │ ${String(area.count).padStart(5)} │ ${(area.actualPercent + '%').padStart(6)} │ ${(area.expectedPercent + '%').padStart(6)} │ ${gapStr.padStart(5)} │ ${statusIcon} ${area.status}`);
  }
  
  if (analysis.unmappedCount) {
    console.log(`\n  ⚠️  ${analysis.unmappedCount} questions have unmapped/invalid blueprint areas`);
  }
  
  // Recommendations
  if (analysis.recommendations.length > 0) {
    console.log(`\n  📋 Generation Recommendations:`);
    for (const rec of analysis.recommendations.filter(r => r.quantity > 0)) {
      const prioIcon = rec.priority === 'HIGH' ? '🔴' : rec.priority === 'MEDIUM' ? '🟡' : '🟢';
      console.log(`     ${prioIcon} ${rec.area}: Generate ${rec.quantity} questions (${rec.priority})`);
      console.log(`        └─ ${rec.reason}`);
    }
  }
}

function printSummary(allAnalysis, targetPerSection) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`                    BLUEPRINT COVERAGE SUMMARY`);
  console.log(`${'═'.repeat(70)}`);
  
  let totalCurrent = 0;
  let totalTarget = 0;
  let totalGap = 0;
  let underweightAreas = 0;
  
  console.log('');
  console.log(`  ${'Section'.padEnd(8)} │ ${'Current'.padStart(8)} │ ${'Target'.padStart(8)} │ ${'Gap'.padStart(8)} │ ${'Progress'.padStart(10)} │ Status`);
  console.log(`  ${'─'.repeat(8)}─┼─${'─'.repeat(8)}─┼─${'─'.repeat(8)}─┼─${'─'.repeat(8)}─┼─${'─'.repeat(10)}─┼─${'─'.repeat(10)}`);
  
  for (const analysis of allAnalysis) {
    totalCurrent += analysis.totalQuestions;
    totalTarget += analysis.targetCount;
    const gap = analysis.targetCount - analysis.totalQuestions;
    totalGap += gap;
    
    const progress = (analysis.totalQuestions / analysis.targetCount * 100).toFixed(0);
    const progressBar = '█'.repeat(Math.floor(progress / 10)) + '░'.repeat(10 - Math.floor(progress / 10));
    const underCount = analysis.areas.filter(a => a.status === 'UNDER').length;
    underweightAreas += underCount;
    
    const status = underCount > 0 ? `⚠️ ${underCount} under` : '✓ OK';
    
    console.log(`  ${analysis.section.padEnd(8)} │ ${String(analysis.totalQuestions).padStart(8)} │ ${String(analysis.targetCount).padStart(8)} │ ${String(gap).padStart(8)} │ ${progressBar} │ ${status}`);
  }
  
  console.log(`  ${'─'.repeat(8)}─┼─${'─'.repeat(8)}─┼─${'─'.repeat(8)}─┼─${'─'.repeat(8)}─┼─${'─'.repeat(10)}─┼─${'─'.repeat(10)}`);
  const totalProgress = (totalCurrent / totalTarget * 100).toFixed(0);
  console.log(`  ${'TOTAL'.padEnd(8)} │ ${String(totalCurrent).padStart(8)} │ ${String(totalTarget).padStart(8)} │ ${String(totalGap).padStart(8)} │ ${(totalProgress + '%').padStart(10)} │`);
  
  console.log(`\n  📊 Overall Progress: ${totalCurrent}/${totalTarget} questions (${totalProgress}%)`);
  console.log(`  📈 Questions needed to reach target: ${totalGap}`);
  if (underweightAreas > 0) {
    console.log(`  ⚠️  Blueprint areas below minimum weight: ${underweightAreas}`);
  }
  
  // Top recommendations across all sections
  const allRecs = allAnalysis.flatMap(a => 
    a.recommendations.map(r => ({ ...r, section: a.section }))
  ).filter(r => r.priority === 'HIGH' || r.quantity > 50);
  
  if (allRecs.length > 0) {
    console.log(`\n  🎯 Top Generation Priorities:`);
    allRecs.sort((a, b) => b.quantity - a.quantity).slice(0, 10).forEach((rec, i) => {
      console.log(`     ${i + 1}. ${rec.section} ${rec.area}: +${rec.quantity} questions`);
    });
  }
}

// Main
console.log('╔══════════════════════════════════════════════════════════════════════╗');
console.log('║              VoraPrep CPA Blueprint Coverage Analyzer                ║');
console.log('╚══════════════════════════════════════════════════════════════════════╝');
console.log(`\n  Target: ${targetPerSection} questions per section (${targetPerSection * 6} total)`);

const sectionsToAnalyze = sectionFilter ? [sectionFilter] : SECTIONS;
const allAnalysis = [];

for (const section of sectionsToAnalyze) {
  const analysis = analyzeSection(section, targetPerSection);
  if (analysis) {
    allAnalysis.push(analysis);
    printSectionAnalysis(analysis);
  }
}

if (!sectionFilter) {
  printSummary(allAnalysis, targetPerSection);
}

// Write JSON report
const reportPath = path.join(CONTENT_DIR, 'blueprint-analysis.json');
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  targetPerSection,
  sections: allAnalysis,
}, null, 2));

console.log(`\n  📋 Full report: content/cpa/blueprint-analysis.json`);
