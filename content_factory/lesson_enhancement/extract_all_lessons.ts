#!/usr/bin/env npx tsx
/**
 * Extract ALL exam lessons to JSON
 * Run with: npx tsx extract_all_lessons.ts
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DATA = join(__dirname, '../../src/data');

interface ExamConfig {
  course: string;
  sections: { name: string; exportName: string; modulePath: string }[];
}

const EXAM_CONFIGS: ExamConfig[] = [
  {
    course: 'ea',
    sections: [
      { name: 'see1', exportName: 'eaPart1Lessons', modulePath: './see1' },
      { name: 'see2', exportName: 'eaPart2Lessons', modulePath: './see2' },
      { name: 'see3', exportName: 'eaPart3Lessons', modulePath: './see3' },
    ]
  },
  {
    course: 'cma',
    sections: [
      { name: 'cma1-a', exportName: 'cma1ALessons', modulePath: './cma1-a' },
      { name: 'cma1-b', exportName: 'cma1BLessons', modulePath: './cma1-b' },
      { name: 'cma1-c', exportName: 'cma1CLessons', modulePath: './cma1-c' },
      { name: 'cma1-d', exportName: 'cma1DLessons', modulePath: './cma1-d' },
      { name: 'cma1-e', exportName: 'cma1ELessons', modulePath: './cma1-e' },
      { name: 'cma1-f', exportName: 'cma1FLessons', modulePath: './cma1-f' },
      { name: 'cma2-a', exportName: 'cma2ALessons', modulePath: './cma2-a' },
      { name: 'cma2-b', exportName: 'cma2BLessons', modulePath: './cma2-b' },
      { name: 'cma2-c', exportName: 'cma2CLessons', modulePath: './cma2-c' },
      { name: 'cma2-d', exportName: 'cma2DLessons', modulePath: './cma2-d' },
      { name: 'cma2-e', exportName: 'cma2ELessons', modulePath: './cma2-e' },
      { name: 'cma2-f', exportName: 'cma2FLessons', modulePath: './cma2-f' },
    ]
  },
  {
    course: 'cia',
    sections: [
      { name: 'cia1', exportName: 'cia1Lessons', modulePath: './cia1-lessons' },
      { name: 'cia1-batch2', exportName: 'cia1LessonsBatch2', modulePath: './cia1-lessons-batch2' },
      { name: 'cia1-batch3', exportName: 'cia1LessonsBatch3', modulePath: './cia1-lessons-batch3' },
      { name: 'cia2', exportName: 'cia2Lessons', modulePath: './cia2-lessons' },
      { name: 'cia2-batch2', exportName: 'cia2LessonsBatch2', modulePath: './cia2-lessons-batch2' },
      { name: 'cia2-batch3', exportName: 'cia2LessonsBatch3', modulePath: './cia2-lessons-batch3' },
      { name: 'cia2-domain-iii', exportName: 'cia2DomainIIILessons', modulePath: './cia2-domain-iii-expansion' },
      { name: 'cia3', exportName: 'cia3Lessons', modulePath: './cia3-lessons' },
      { name: 'cia3-batch2', exportName: 'cia3LessonsBatch2', modulePath: './cia3-lessons-batch2' },
      { name: 'cia3-batch3', exportName: 'cia3LessonsBatch3', modulePath: './cia3-lessons-batch3' },
      { name: 'cia-batch3', exportName: 'ciaLessonsBatch3', modulePath: './cia-lessons-batch3' },
      { name: 'cia-batch4', exportName: 'ciaLessonsBatch4', modulePath: './cia-lessons-batch4' },
      { name: 'cia-batch5', exportName: 'ciaLessonsBatch5', modulePath: './cia-lessons-batch5' },
      { name: 'gias-2024', exportName: 'gias2024Lessons', modulePath: './gias-2024-lesson' },
      { name: 'cia-missing', exportName: 'ciaMissingTopicsLessons', modulePath: './cia-missing-topics' },
    ]
  },
  {
    course: 'cisa',
    sections: [
      { name: 'cisa1', exportName: 'cisa1Lessons', modulePath: './cisa1-lessons' },
      { name: 'cisa1-batch2', exportName: 'cisa1LessonsBatch2', modulePath: './cisa1-lessons-batch2' },
      { name: 'cisa1-batch3', exportName: 'cisa1LessonsBatch3', modulePath: './cisa1-lessons-batch3' },
      { name: 'cisa2', exportName: 'cisa2Lessons', modulePath: './cisa2-lessons' },
      { name: 'cisa2-batch2', exportName: 'cisa2LessonsBatch2', modulePath: './cisa2-lessons-batch2' },
      { name: 'cisa3', exportName: 'cisa3Lessons', modulePath: './cisa3-lessons' },
      { name: 'cisa3-batch2', exportName: 'cisa3LessonsBatch2', modulePath: './cisa3-lessons-batch2' },
      { name: 'cisa4', exportName: 'cisa4Lessons', modulePath: './cisa4-lessons' },
      { name: 'cisa4-batch2', exportName: 'cisa4LessonsBatch2', modulePath: './cisa4-lessons-batch2' },
      { name: 'cisa5', exportName: 'cisa5Lessons', modulePath: './cisa5-lessons' },
      { name: 'cisa5-batch2', exportName: 'cisa5LessonsBatch2', modulePath: './cisa5-lessons-batch2' },
    ]
  },
  {
    course: 'cfp',
    sections: [
      // General Principles
      { name: 'gen-planning', exportName: 'genPlanningLessons', modulePath: './gen_planning_process' },
      { name: 'gen-financial-statements', exportName: 'genFinancialLessons', modulePath: './gen_financial_statements' },
      { name: 'gen-time-value', exportName: 'genTimeValueLessons', modulePath: './gen_time_value_money' },
      { name: 'gen-economic', exportName: 'genEconomicLessons', modulePath: './gen_economic_debt' },
      { name: 'gen-education', exportName: 'genEducationLessons', modulePath: './gen_education_planning' },
      // Investment
      { name: 'inv-theory', exportName: 'invTheoryLessons', modulePath: './inv_theory' },
      { name: 'inv-vehicles', exportName: 'invVehiclesLessons', modulePath: './inv_vehicles' },
      { name: 'inv-portfolio', exportName: 'invPortfolioLessons', modulePath: './inv_portfolio' },
      { name: 'inv-tax', exportName: 'invTaxLessons', modulePath: './inv_tax_sensitivity' },
      { name: 'inv-advanced', exportName: 'invAdvancedLessons', modulePath: './inv_advanced' },
      // Risk Management
      { name: 'ris-fundamentals', exportName: 'risFundamentalsLessons', modulePath: './ris_fundamentals' },
      { name: 'ris-life', exportName: 'risLifeLessons', modulePath: './ris_life_insurance' },
      { name: 'ris-health', exportName: 'risHealthLessons', modulePath: './ris_health_disability' },
      { name: 'ris-property', exportName: 'risPropertyLessons', modulePath: './ris_property_liability' },
      // Tax Planning
      { name: 'tax-fundamentals', exportName: 'taxFundamentalsLessons', modulePath: './tax_fundamentals' },
      { name: 'tax-planning', exportName: 'taxPlanningLessons', modulePath: './tax_planning' },
      { name: 'tax-strategies', exportName: 'taxStrategiesLessons', modulePath: './tax_strategies' },
      { name: 'tax-advanced', exportName: 'taxAdvancedLessons', modulePath: './tax_advanced' },
      // Retirement
      { name: 'ret-needs', exportName: 'retNeedsLessons', modulePath: './ret_needs_analysis' },
      { name: 'ret-employer', exportName: 'retEmployerLessons', modulePath: './ret_employer_plans' },
      { name: 'ret-individual', exportName: 'retIndividualLessons', modulePath: './ret_individual_plans' },
      { name: 'ret-executive', exportName: 'retExecutiveLessons', modulePath: './ret_executive_plans' },
      { name: 'ret-special', exportName: 'retSpecialLessons', modulePath: './ret_special_topics' },
      { name: 'ret-advanced', exportName: 'retAdvancedLessons', modulePath: './ret_advanced' },
      // Estate Planning
      { name: 'est-documents', exportName: 'estDocumentsLessons', modulePath: './est_documents' },
      { name: 'est-transfers', exportName: 'estTransfersLessons', modulePath: './est_transfers' },
      { name: 'est-taxation', exportName: 'estTaxationLessons', modulePath: './est_taxation' },
      { name: 'est-advanced', exportName: 'estAdvancedLessons', modulePath: './est_advanced' },
      // Psychology and Behavioral Finance
      { name: 'psy-behavioral', exportName: 'psyBehavioralLessons', modulePath: './psy_behavioral_finance' },
      { name: 'psy-counseling', exportName: 'psyCounselingLessons', modulePath: './psy_client_counseling' },
      // Professional Conduct
      { name: 'pro-standards', exportName: 'proStandardsLessons', modulePath: './pro_standards' },
      { name: 'pro-regulations', exportName: 'proRegulationsLessons', modulePath: './pro_regulations' },
      { name: 'pro-fiduciary', exportName: 'proFiduciaryLessons', modulePath: './pro_fiduciary' },
    ]
  }
];

async function extractCourse(config: ExamConfig) {
  const { course, sections } = config;
  const lessonsDir = join(SRC_DATA, course, 'lessons');
  const outputDir = join(lessonsDir, 'json');
  
  console.log(`\n📦 Extracting ${course.toUpperCase()} lessons...`);
  
  mkdirSync(outputDir, { recursive: true });
  
  let totalLessons = 0;
  const results: { name: string; count: number }[] = [];
  
  for (const section of sections) {
    try {
      const modulePath = join(lessonsDir, section.modulePath.replace('./', ''));
      const mod = await import(modulePath);
      const lessons = mod[section.exportName] || mod.default || [];
      
      if (lessons.length > 0) {
        const outputPath = join(outputDir, `${section.name}.json`);
        writeFileSync(outputPath, JSON.stringify(lessons, null, 2));
        console.log(`  ✅ ${section.name}: ${lessons.length} lessons`);
        results.push({ name: section.name, count: lessons.length });
        totalLessons += lessons.length;
      } else {
        console.log(`  ⚠️  ${section.name}: empty or not found`);
      }
    } catch (error) {
      console.log(`  ❌ ${section.name}: ${(error as Error).message}`);
    }
  }
  
  console.log(`  📊 Total: ${totalLessons} lessons extracted`);
  return { course, totalLessons, results };
}

async function main() {
  console.log('=' .repeat(60));
  console.log('  LESSON EXTRACTION: TypeScript → JSON');
  console.log('=' .repeat(60));
  
  const allResults = [];
  
  for (const config of EXAM_CONFIGS) {
    const result = await extractCourse(config);
    allResults.push(result);
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('  EXTRACTION SUMMARY');
  console.log('=' .repeat(60));
  
  let grandTotal = 0;
  for (const result of allResults) {
    console.log(`  ${result.course.toUpperCase()}: ${result.totalLessons} lessons`);
    grandTotal += result.totalLessons;
  }
  console.log('-'.repeat(60));
  console.log(`  TOTAL: ${grandTotal} lessons extracted`);
}

main().catch(console.error);
