// CFP Lessons Index - JSON-based
// Migrated to JSON format: 2026-02-28

import { Lesson } from '../../../types';

// General Principles
import genFinancialData from './json/gen-financial-statements.json';
import genTimeValueData from './json/gen-time-value.json';
import genEconomicData from './json/gen-economic.json';
import genEducationData from './json/gen-education.json';
import genBatch2Data from './json/gen-batch2.json';

// Investment
import invTheoryData from './json/inv-theory.json';
import invVehiclesData from './json/inv-vehicles.json';
import invPortfolioData from './json/inv-portfolio.json';
import invBatch2Data from './json/inv-batch2.json';

// Risk Management
import risFundamentalsData from './json/ris-fundamentals.json';
import risLifeData from './json/ris-life.json';
import risHealthData from './json/ris-health.json';
import risPropertyData from './json/ris-property.json';
import riskBatch2Data from './json/risk-batch2.json';

// Tax Planning
import taxFundamentalsData from './json/tax-fundamentals.json';
import taxStrategiesData from './json/tax-strategies.json';
import taxAdvancedData from './json/tax-advanced.json';
import taxBatch2Data from './json/tax-batch2.json';

// Retirement
import retNeedsData from './json/ret-needs.json';
import retEmployerData from './json/ret-employer.json';
import retIndividualData from './json/ret-individual.json';
import retExecutiveData from './json/ret-executive.json';
import retSpecialData from './json/ret-special.json';
import retAdvancedData from './json/ret-advanced.json';
import retBatch2Data from './json/ret-batch2.json';

// Estate Planning
import estDocumentsData from './json/est-documents.json';
import estTransfersData from './json/est-transfers.json';
import estTaxationData from './json/est-taxation.json';
import estAdvancedData from './json/est-advanced.json';
import estBatch2Data from './json/est-batch2.json';

// Psychology & Behavioral Finance
import psyBehavioralData from './json/psy-behavioral.json';
import psyCounselingData from './json/psy-counseling.json';
import psyBatch2Data from './json/psy-batch2.json';

// Professional Conduct
import proStandardsData from './json/pro-standards.json';
import proRegulationsData from './json/pro-regulations.json';
import proFiduciaryData from './json/pro-fiduciary.json';
import pcrBatch2Data from './json/pcr-batch2.json';

// Type assertions
export const genFinancialLessons: Lesson[] = genFinancialData as Lesson[];
export const genTimeValueLessons: Lesson[] = genTimeValueData as Lesson[];
export const genEconomicLessons: Lesson[] = genEconomicData as Lesson[];
export const genEducationLessons: Lesson[] = genEducationData as Lesson[];
export const invTheoryLessons: Lesson[] = invTheoryData as Lesson[];
export const invVehiclesLessons: Lesson[] = invVehiclesData as Lesson[];
export const invPortfolioLessons: Lesson[] = invPortfolioData as Lesson[];
export const risFundamentalsLessons: Lesson[] = risFundamentalsData as Lesson[];
export const risLifeLessons: Lesson[] = risLifeData as Lesson[];
export const risHealthLessons: Lesson[] = risHealthData as Lesson[];
export const risPropertyLessons: Lesson[] = risPropertyData as Lesson[];
export const taxFundamentalsLessons: Lesson[] = taxFundamentalsData as Lesson[];
export const taxStrategiesLessons: Lesson[] = taxStrategiesData as Lesson[];
export const taxAdvancedLessons: Lesson[] = taxAdvancedData as Lesson[];
export const retNeedsLessons: Lesson[] = retNeedsData as Lesson[];
export const retEmployerLessons: Lesson[] = retEmployerData as Lesson[];
export const retIndividualLessons: Lesson[] = retIndividualData as Lesson[];
export const retExecutiveLessons: Lesson[] = retExecutiveData as Lesson[];
export const retSpecialLessons: Lesson[] = retSpecialData as Lesson[];
export const retAdvancedLessons: Lesson[] = retAdvancedData as Lesson[];
export const estDocumentsLessons: Lesson[] = estDocumentsData as Lesson[];
export const estTransfersLessons: Lesson[] = estTransfersData as Lesson[];
export const estTaxationLessons: Lesson[] = estTaxationData as Lesson[];
export const estAdvancedLessons: Lesson[] = estAdvancedData as Lesson[];
export const psyBehavioralLessons: Lesson[] = psyBehavioralData as Lesson[];
export const psyCounselingLessons: Lesson[] = psyCounselingData as Lesson[];
export const proStandardsLessons: Lesson[] = proStandardsData as Lesson[];
export const proRegulationsLessons: Lesson[] = proRegulationsData as Lesson[];
export const proFiduciaryLessons: Lesson[] = proFiduciaryData as Lesson[];

// Batch 2 type assertions
export const genBatch2Lessons: Lesson[] = genBatch2Data as Lesson[];
export const invBatch2Lessons: Lesson[] = invBatch2Data as Lesson[];
export const riskBatch2Lessons: Lesson[] = riskBatch2Data as Lesson[];
export const taxBatch2Lessons: Lesson[] = taxBatch2Data as Lesson[];
export const retBatch2Lessons: Lesson[] = retBatch2Data as Lesson[];
export const estBatch2Lessons: Lesson[] = estBatch2Data as Lesson[];
export const psyBatch2Lessons: Lesson[] = psyBatch2Data as Lesson[];
export const pcrBatch2Lessons: Lesson[] = pcrBatch2Data as Lesson[];

// Combined by category
export const GENERAL_LESSONS: Lesson[] = [
  ...genFinancialLessons,
  ...genTimeValueLessons,
  ...genEconomicLessons,
  ...genEducationLessons,
  ...genBatch2Lessons,
];

export const INVESTMENT_LESSONS: Lesson[] = [
  ...invTheoryLessons,
  ...invVehiclesLessons,
  ...invPortfolioLessons,
  ...invBatch2Lessons,
];

export const RISK_LESSONS: Lesson[] = [
  ...risFundamentalsLessons,
  ...risLifeLessons,
  ...risHealthLessons,
  ...risPropertyLessons,
  ...riskBatch2Lessons,
];

export const TAX_LESSONS: Lesson[] = [
  ...taxFundamentalsLessons,
  ...taxStrategiesLessons,
  ...taxAdvancedLessons,
  ...taxBatch2Lessons,
];

export const RETIREMENT_LESSONS: Lesson[] = [
  ...retNeedsLessons,
  ...retEmployerLessons,
  ...retIndividualLessons,
  ...retExecutiveLessons,
  ...retSpecialLessons,
  ...retAdvancedLessons,
  ...retBatch2Lessons,
];

export const ESTATE_LESSONS: Lesson[] = [
  ...estDocumentsLessons,
  ...estTransfersLessons,
  ...estTaxationLessons,
  ...estAdvancedLessons,
  ...estBatch2Lessons,
];

export const PSYCHOLOGY_LESSONS: Lesson[] = [
  ...psyBehavioralLessons,
  ...psyCounselingLessons,
  ...psyBatch2Lessons,
];

export const PROFESSIONAL_LESSONS: Lesson[] = [
  ...proStandardsLessons,
  ...proRegulationsLessons,
  ...proFiduciaryLessons,
  ...pcrBatch2Lessons,
];

// All CFP lessons
export const ALL_CFP_LESSONS: Lesson[] = [
  ...GENERAL_LESSONS,
  ...INVESTMENT_LESSONS,
  ...RISK_LESSONS,
  ...TAX_LESSONS,
  ...RETIREMENT_LESSONS,
  ...ESTATE_LESSONS,
  ...PSYCHOLOGY_LESSONS,
  ...PROFESSIONAL_LESSONS,
];

// Helper functions
export const getCFPLessonById = (id: string): Lesson | undefined => {
  return ALL_CFP_LESSONS.find(lesson => lesson.id === id);
};

export const getCFPLessonsBySection = (section: string): Lesson[] => {
  return ALL_CFP_LESSONS.filter(lesson => lesson.section === section);
};

export const getCFPLessonCount = () => ({
  total: ALL_CFP_LESSONS.length,
  general: GENERAL_LESSONS.length,
  investment: INVESTMENT_LESSONS.length,
  risk: RISK_LESSONS.length,
  tax: TAX_LESSONS.length,
  retirement: RETIREMENT_LESSONS.length,
  estate: ESTATE_LESSONS.length,
  psychology: PSYCHOLOGY_LESSONS.length,
  professional: PROFESSIONAL_LESSONS.length,
});

export default ALL_CFP_LESSONS;
