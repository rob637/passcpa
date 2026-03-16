#!/usr/bin/env node
/**
 * Quick Field Enhancement (No AI Required)
 * 
 * Adds timeEstimate based on difficulty + question type
 * Adds relatedTopics based on blueprint area neighbors
 * 
 * This runs fast without API calls - good prep before AI enhancement
 */

const fs = require('fs');
const path = require('path');

// Time estimates by difficulty and question characteristics
function estimateTime(question) {
  const q = question.question || '';
  const diff = question.difficulty || 'medium';
  
  // Detect question type
  const isCalculation = /calculate|compute|determine the amount|how much|\$[\d,]+/i.test(q);
  const hasScenario = q.length > 200 || /scenario|following information|given that/i.test(q);
  const isExcept = /\bexcept\b|\bnot\b.*(?:correct|true)/i.test(q);
  
  let base;
  if (diff === 'easy') base = 45;
  else if (diff === 'hard') base = 90;
  else base = 60;
  
  if (isCalculation) base += 30;
  if (hasScenario) base += 30;
  if (isExcept) base += 15;
  
  // Cap at reasonable exam times
  return Math.min(180, Math.max(30, base));
}

// Blueprint topic relationships
const TOPIC_RELATIONSHIPS = {
  'cpa': {
    'far': {
      'FAR-I': ['FASB Conceptual Framework', 'Qualitative characteristics', 'Elements of financial statements'],
      'FAR-II': ['Bank reconciliations', 'Accounts receivable', 'Depreciation methods', 'Inventory', 'Investments'],
      'FAR-III': ['Revenue recognition', 'Leases', 'Income taxes', 'Pensions', 'Contingencies', 'EPS'],
      'FAR-IV': ['Fund accounting', 'Governmental funds', 'Budgetary accounting'],
      'FAR-V': ['Not-for-profit', 'Contributions', 'Net asset classifications'],
    },
    'aud': {
      'AUD-I': ['Ethics', 'Independence', 'Professional responsibilities'],
      'AUD-II': ['Risk assessment', 'Internal control', 'Materiality', 'Audit planning'],
      'AUD-III': ['Audit evidence', 'Sampling', 'Analytical procedures', 'Confirmations'],
      'AUD-IV': ['Audit reports', 'Modified opinions', 'Other reports'],
    },
    'reg': {
      'REG-I': ['Ethics', 'Circular 230', 'Tax procedures'],
      'REG-II': ['Agency', 'Contracts', 'Business structures', 'Bankruptcy'],
      'REG-III': ['Gross income', 'Deductions', 'Credits', 'Filing status', 'Capital gains'],
      'REG-IV': ['C corporations', 'S corporations', 'Partnerships', 'Trusts'],
      'REG-V': ['Property transactions', 'Depreciation', 'Like-kind exchanges'],
    },
    'bar': {
      'BAR-I': ['Business combinations', 'Consolidations', 'VIE'],
      'BAR-II': ['Derivatives', 'Hedging', 'Foreign currency', 'Leases'],
      'BAR-III': ['Government accounting', 'Capital assets', 'Pensions'],
      'BAR-IV': ['Financial analysis', 'Ratios', 'Budgeting', 'Forecasting'],
    },
    'isc': {
      'ISC-I': ['IT systems', 'Data management', 'Infrastructure'],
      'ISC-II': ['Security', 'Privacy', 'Access controls'],
      'ISC-III': ['SOC reports', 'Trust services', 'Cybersecurity'],
    },
    'tcp': {
      'TCP-I': ['Tax planning', 'Timing strategies', 'Capital gains'],
      'TCP-II': ['Entity planning', 'Compensation', 'State tax'],
      'TCP-III': ['Property transactions', 'Like-kind exchanges', 'Installment sales'],
      'TCP-IV': ['Estate tax', 'Gift tax', 'Valuation'],
    },
  },
};

function getRelatedTopics(question, exam, section) {
  const area = question.blueprintArea;
  const currentTopic = question.topic;
  
  // Get topics from same blueprint area
  const areaTopics = TOPIC_RELATIONSHIPS[exam]?.[section]?.[area] || [];
  
  // Filter out current topic and pick 2-3 related ones
  const related = areaTopics.filter(t => 
    t.toLowerCase() !== currentTopic?.toLowerCase()
  ).slice(0, 3);
  
  return related.length > 0 ? related : undefined;
}

// ============================================================================
// MAIN PROCESSING
// ============================================================================

async function processAllFiles() {
  const contentDir = 'content';
  const exams = ['cpa', 'ea', 'cma', 'cia', 'cisa', 'cfp'];
  
  let totalUpdated = 0;
  let totalQuestions = 0;
  
  console.log('=== Quick Field Enhancement ===\n');
  
  for (const exam of exams) {
    const examDir = path.join(contentDir, exam);
    if (!fs.existsSync(examDir)) continue;
    
    const sections = fs.readdirSync(examDir).filter(d => 
      fs.statSync(path.join(examDir, d)).isDirectory()
    );
    
    console.log(`${exam.toUpperCase()}:`);
    
    for (const section of sections) {
      const filePath = path.join(examDir, section, 'questions.json');
      if (!fs.existsSync(filePath)) continue;
      
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      let sectionUpdated = 0;
      
      for (const q of data.questions) {
        totalQuestions++;
        
        // Add timeEstimate if missing
        if (!q.timeEstimate) {
          q.timeEstimate = estimateTime(q);
          sectionUpdated++;
        }
        
        // Add relatedTopics if missing
        if (!q.relatedTopics) {
          const related = getRelatedTopics(q, exam, section);
          if (related) {
            q.relatedTopics = related;
          }
        }
      }
      
      if (sectionUpdated > 0) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        totalUpdated += sectionUpdated;
      }
      
      console.log(`  ${section}: ${data.questions.length} questions, ${sectionUpdated} updated`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`Total: ${totalQuestions} questions, ${totalUpdated} fields added`);
}

processAllFiles().catch(console.error);
