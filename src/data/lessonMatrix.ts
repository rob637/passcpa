/**
 * VoraPrep Lesson Matrix
 * 2026 CPA Exam Blueprint Compliant
 * 
 * This matrix maps all 303 lessons to their corresponding AICPA Blueprint areas,
 * representative tasks, and skill levels. It also identifies lessons affected by
 * the One Big Beautiful Bill Act (OBBBA / H.R. 1) tax law changes.
 * 
 * CRITICAL TRANSITION DATES:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  January 1, 2026  ────────────►  June 30, 2026  │  2025 BLUEPRINT TESTED   │
 * │  July 1, 2026     ────────────►  December 31, 2026  │  2026 BLUEPRINT TESTED│
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * - Through June 30, 2026: 2025 Blueprint (Pre-OBBBA tax law, TCJA provisions as enacted)
 * - Starting July 1, 2026: 2026 Blueprint (OBBBA / H.R. 1 provisions become testable)
 * 
 * Blueprint version tracking:
 * - "both" = Content identical in 2025 and 2026 Blueprints
 * - "2025" = Content ONLY in 2025 Blueprint (testing ends June 30, 2026)
 * - "2026" = Content ONLY in 2026 Blueprint (testing starts July 1, 2026)
 * - "differs" = Content exists in both but with DIFFERENT rules/amounts
 * 
 * Last Updated: 2026-01
 */

import logger from '../utils/logger';

export type BlueprintVersionStatus = 'both' | '2025' | '2026' | 'differs';

export interface BlueprintArea {
  areaId: string;
  areaName: string;
  weight: string;
}

export interface LessonMatrixEntry {
  lessonId: string;
  section: 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP' | 'PREP';
  title: string;
  blueprintArea: BlueprintArea;
  representativeTask: string;
  skillLevel: 'Remembering and Understanding' | 'Application' | 'Analysis' | 'Evaluation';
  obbbaAffected: boolean;
  transitionNote?: string;
  duration: number;
  /** Which Blueprint version(s) this lesson applies to - determined by BLUEPRINT_DIFFERENCES map */
  /** For 'differs' lessons: what to study for 2025 Blueprint */
  study2025?: string;
  /** For 'differs' lessons: what to study for 2026 Blueprint */
  study2026?: string;
}

// Blueprint Areas by Section
export const BLUEPRINT_AREAS = {
  // FAR Areas (2026 Blueprint)
  FAR: [
    { areaId: 'FAR-I', areaName: 'Conceptual Framework and Financial Reporting', weight: '25-35%' },
    { areaId: 'FAR-II', areaName: 'Select Financial Statement Accounts', weight: '30-40%' },
    { areaId: 'FAR-III', areaName: 'Select Transactions', weight: '20-30%' },
    { areaId: 'FAR-IV', areaName: 'State and Local Governments', weight: '5-15%' },
  ],
  
  // AUD Areas (2026 Blueprint)
  AUD: [
    { areaId: 'AUD-I', areaName: 'Ethics, Professional Responsibilities, and General Principles', weight: '15-25%' },
    { areaId: 'AUD-II', areaName: 'Assessing Risk and Developing a Planned Response', weight: '25-35%' },
    { areaId: 'AUD-III', areaName: 'Performing Further Procedures and Obtaining Evidence', weight: '30-40%' },
    { areaId: 'AUD-IV', areaName: 'Forming Conclusions and Reporting', weight: '10-20%' },
  ],
  
  // REG Areas (2026 Blueprint)
  REG: [
    { areaId: 'REG-I', areaName: 'Ethics and Responsibilities in Tax Practice', weight: '10-20%' },
    { areaId: 'REG-II', areaName: 'Federal Taxation of Property Transactions', weight: '12-22%' },
    { areaId: 'REG-III', areaName: 'Federal Taxation of Individuals', weight: '22-32%' },
    { areaId: 'REG-IV', areaName: 'Federal Taxation of Entities', weight: '28-38%' },
  ],
  
  // BAR Areas (2026 Blueprint)
  BAR: [
    { areaId: 'BAR-I', areaName: 'Business Analysis', weight: '40-50%' },
    { areaId: 'BAR-II', areaName: 'Technical Accounting and Reporting', weight: '35-45%' },
    { areaId: 'BAR-III', areaName: 'State and Local Government Concepts', weight: '10-20%' },
  ],
  
  // ISC Areas (2026 Blueprint)  
  ISC: [
    { areaId: 'ISC-I', areaName: 'Information Systems and Data Management', weight: '35-45%' },
    { areaId: 'ISC-II', areaName: 'Security, Confidentiality, and Privacy', weight: '35-45%' },
    { areaId: 'ISC-III', areaName: 'Considerations for System and Organization Controls Engagements', weight: '15-25%' },
  ],
  
  // TCP Areas (2026 Blueprint)
  TCP: [
    { areaId: 'TCP-I', areaName: 'Tax Compliance and Planning for Individuals and Personal Financial Planning', weight: '30-40%' },
    { areaId: 'TCP-II', areaName: 'Entity Tax Compliance and Planning', weight: '30-40%' },
    { areaId: 'TCP-III', areaName: 'Property Transactions', weight: '12-17%' },
    { areaId: 'TCP-IV', areaName: 'Partnership Taxation', weight: '8-13%' },
    { areaId: 'TCP-V', areaName: 'C and S Corporation Taxation', weight: '8-13%' },
  ],
  
  // PREP (Non-Blueprint - Exam Strategy)
  PREP: [
    { areaId: 'PREP-EXAM', areaName: 'CPA Exam Structure & Strategy', weight: 'N/A' },
    { areaId: 'PREP-MCQ', areaName: 'Multiple Choice Question Strategy', weight: 'N/A' },
    { areaId: 'PREP-TBS', areaName: 'Task-Based Simulation Strategy', weight: 'N/A' },
    { areaId: 'PREP-WC', areaName: 'Written Communication Strategy', weight: 'N/A' },
    { areaId: 'PREP-STUDY', areaName: 'Study Planning & Execution', weight: 'N/A' },
  ],
};

// Lesson Matrix - All 303 Lessons
export const LESSON_MATRIX: LessonMatrixEntry[] = [
  // ============================================================================
  // FAR SECTION (65 Lessons)
  // ============================================================================
  
  // FAR Area I: Conceptual Framework and Financial Reporting
  { lessonId: 'FAR-I-001', section: 'FAR', title: 'GAAP Hierarchy & Standard-Setting', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Identify and apply the appropriate level of U.S. GAAP', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 30 },
  { lessonId: 'FAR-I-002', section: 'FAR', title: 'Conceptual Framework Objectives', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Apply the FASB Conceptual Framework to determine proper accounting treatment', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-I-003', section: 'FAR', title: 'Qualitative Characteristics', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Evaluate financial information using qualitative characteristics', skillLevel: 'Evaluation', obbbaAffected: false, duration: 35 },
  { lessonId: 'FAR-I-004', section: 'FAR', title: 'Elements of Financial Statements', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Classify items within financial statement elements', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-I-005', section: 'FAR', title: 'Recognition and Measurement', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Apply recognition and measurement criteria', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-I-006', section: 'FAR', title: 'Balance Sheet Presentation', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Prepare and present balance sheet items', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-I-007', section: 'FAR', title: 'Income Statement Formats', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Prepare income statements using different formats', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-I-008', section: 'FAR', title: 'Comprehensive Income', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Calculate and present comprehensive income', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-I-009', section: 'FAR', title: 'Statement of Cash Flows', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Prepare statement of cash flows using direct and indirect methods', skillLevel: 'Application', obbbaAffected: false, duration: 60 },
  { lessonId: 'FAR-I-010', section: 'FAR', title: 'Statement of Stockholders Equity', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Prepare statement of stockholders equity', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'FAR-I-011', section: 'FAR', title: 'Notes and Disclosures', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Identify required disclosures', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-I-012', section: 'FAR', title: 'Subsequent Events', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Apply subsequent events guidance', skillLevel: 'Analysis', obbbaAffected: false, duration: 35 },
  { lessonId: 'FAR-I-013', section: 'FAR', title: 'Fair Value Framework', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Apply the fair value hierarchy and measurement techniques', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-I-014', section: 'FAR', title: 'Accounting Changes', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Account for changes in accounting principles, estimates, and corrections', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-I-015', section: 'FAR', title: 'Error Corrections', blueprintArea: BLUEPRINT_AREAS.FAR[0], representativeTask: 'Correct prior period errors', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  
  // FAR Area II: Select Financial Statement Accounts
  { lessonId: 'FAR-II-001', section: 'FAR', title: 'Cash and Cash Equivalents', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for cash and cash equivalents', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 25 },
  { lessonId: 'FAR-II-002', section: 'FAR', title: 'Receivables and Bad Debts', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for receivables and estimate bad debts using CECL', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-II-003', section: 'FAR', title: 'Inventory Costing Methods', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Apply inventory costing methods (FIFO, LIFO, Average)', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-II-004', section: 'FAR', title: 'Inventory Lower of Cost or NRV', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Apply lower of cost or net realizable value', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-II-005', section: 'FAR', title: 'Property, Plant & Equipment', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for acquisition and disposal of PP&E', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-II-006', section: 'FAR', title: 'Depreciation Methods', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Calculate depreciation using various methods', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-II-007', section: 'FAR', title: 'Intangible Assets', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for intangible assets including amortization', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-II-008', section: 'FAR', title: 'Goodwill and Impairment', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Test goodwill and other assets for impairment', skillLevel: 'Analysis', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-II-009', section: 'FAR', title: 'Investments in Debt Securities', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for debt security investments', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-II-010', section: 'FAR', title: 'Investments in Equity Securities', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for equity security investments', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-II-011', section: 'FAR', title: 'Equity Method Investments', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Apply the equity method of accounting', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-II-012', section: 'FAR', title: 'Current Liabilities', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for current liabilities', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-II-013', section: 'FAR', title: 'Contingencies and Commitments', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Apply contingency recognition and disclosure rules', skillLevel: 'Analysis', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-II-014', section: 'FAR', title: 'Long-Term Debt', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for bonds payable and long-term notes', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-II-015', section: 'FAR', title: 'Bond Premium and Discount', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Amortize bond premium and discount', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-II-016', section: 'FAR', title: 'Stockholders Equity', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for equity transactions', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-II-017', section: 'FAR', title: 'Treasury Stock', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for treasury stock transactions', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'FAR-II-018', section: 'FAR', title: 'Dividends', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for cash, property, and stock dividends', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-II-019', section: 'FAR', title: 'Stock Compensation', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Account for stock-based compensation', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-II-020', section: 'FAR', title: 'Earnings Per Share', blueprintArea: BLUEPRINT_AREAS.FAR[1], representativeTask: 'Calculate basic and diluted EPS', skillLevel: 'Application', obbbaAffected: false, duration: 60 },
  
  // FAR Area III: Select Transactions
  { lessonId: 'FAR-III-001', section: 'FAR', title: 'Revenue Recognition - 5 Step Model', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Apply the five-step revenue recognition model', skillLevel: 'Application', obbbaAffected: false, duration: 60 },
  { lessonId: 'FAR-III-002', section: 'FAR', title: 'Contract Modifications', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Account for contract modifications', skillLevel: 'Analysis', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-III-003', section: 'FAR', title: 'Variable Consideration', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Estimate variable consideration', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-III-004', section: 'FAR', title: 'Lease Classification', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Classify leases as finance or operating', skillLevel: 'Analysis', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-III-005', section: 'FAR', title: 'Lessee Accounting', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Account for leases from lessee perspective', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-III-006', section: 'FAR', title: 'Lessor Accounting', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Account for leases from lessor perspective', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-III-007', section: 'FAR', title: 'Income Taxes - Temporary Differences', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Identify and calculate temporary differences', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-III-008', section: 'FAR', title: 'Deferred Tax Assets and Liabilities', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Calculate and record deferred taxes', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'FAR-III-009', section: 'FAR', title: 'Pension Plans - Defined Benefit', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Account for defined benefit pension plans', skillLevel: 'Application', obbbaAffected: false, duration: 60 },
  { lessonId: 'FAR-III-010', section: 'FAR', title: 'Pension Plans - Defined Contribution', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Account for defined contribution plans', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 30 },
  { lessonId: 'FAR-III-011', section: 'FAR', title: 'Business Combinations', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Account for business combinations using acquisition method', skillLevel: 'Application', obbbaAffected: false, duration: 60 },
  { lessonId: 'FAR-III-012', section: 'FAR', title: 'Consolidated Financial Statements', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Prepare consolidated financial statements', skillLevel: 'Application', obbbaAffected: false, duration: 65 },
  { lessonId: 'FAR-III-013', section: 'FAR', title: 'Intercompany Transactions', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Eliminate intercompany transactions', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-III-014', section: 'FAR', title: 'Noncontrolling Interests', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Account for noncontrolling interests', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-III-015', section: 'FAR', title: 'Foreign Currency Transactions', blueprintArea: BLUEPRINT_AREAS.FAR[2], representativeTask: 'Account for foreign currency transactions', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  
  // FAR Area IV: State and Local Governments
  { lessonId: 'FAR-IV-001', section: 'FAR', title: 'Government Accounting Overview', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Understand the governmental accounting environment', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-IV-002', section: 'FAR', title: 'Fund Accounting Basics', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Apply fund accounting concepts', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-IV-003', section: 'FAR', title: 'Governmental Fund Types', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Identify and account for governmental fund types', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-IV-004', section: 'FAR', title: 'Proprietary and Fiduciary Funds', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Account for proprietary and fiduciary funds', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-IV-005', section: 'FAR', title: 'Government-Wide Financial Statements', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Prepare government-wide financial statements', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-IV-006', section: 'FAR', title: 'Budgetary Accounting', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Apply budgetary accounting concepts', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-IV-007', section: 'FAR', title: 'Capital Assets and Long-Term Debt', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Account for governmental capital assets and debt', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-IV-008', section: 'FAR', title: 'Interfund Transactions', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Account for interfund transactions', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'FAR-IV-009', section: 'FAR', title: 'Nonexchange Transactions', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Account for nonexchange transactions and revenues', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-IV-010', section: 'FAR', title: 'Not-for-Profit Accounting', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Apply not-for-profit accounting standards', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'FAR-IV-011', section: 'FAR', title: 'NFP Revenue Recognition', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Account for contributions and grants in NFPs', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-IV-012', section: 'FAR', title: 'NFP Financial Statements', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Prepare not-for-profit financial statements', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'FAR-IV-013', section: 'FAR', title: 'Net Asset Classifications', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Classify and report net assets with/without donor restrictions', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'FAR-IV-014', section: 'FAR', title: 'GASB vs FASB Differences', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Distinguish between GASB and FASB requirements', skillLevel: 'Analysis', obbbaAffected: false, duration: 40 },
  { lessonId: 'FAR-IV-015', section: 'FAR', title: 'Special Purpose Frameworks', blueprintArea: BLUEPRINT_AREAS.FAR[3], representativeTask: 'Apply special purpose frameworks', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 35 },
  
  // ============================================================================
  // AUD SECTION (50 Lessons)
  // ============================================================================
  
  // AUD Area I: Ethics, Professional Responsibilities, and General Principles
  { lessonId: 'AUD-I-001', section: 'AUD', title: 'AICPA Code of Professional Conduct', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Apply AICPA Code of Professional Conduct', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-I-002', section: 'AUD', title: 'Independence Requirements', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Evaluate independence requirements', skillLevel: 'Analysis', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-I-003', section: 'AUD', title: 'SEC Independence Rules', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Apply SEC independence requirements for issuers', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-I-004', section: 'AUD', title: 'Integrity and Objectivity', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Apply integrity and objectivity principles', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'AUD-I-005', section: 'AUD', title: 'Quality Management Standards', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Apply quality management standards', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-I-006', section: 'AUD', title: 'Engagement Acceptance', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Evaluate engagement acceptance and continuance', skillLevel: 'Evaluation', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-I-007', section: 'AUD', title: 'Professional Skepticism', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Apply professional skepticism throughout the audit', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'AUD-I-008', section: 'AUD', title: 'Documentation Requirements', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Prepare and evaluate audit documentation', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-I-009', section: 'AUD', title: 'Communication with TCWG', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Communicate with those charged with governance', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-I-010', section: 'AUD', title: 'Using Work of Others', blueprintArea: BLUEPRINT_AREAS.AUD[0], representativeTask: 'Evaluate using work of internal auditors and specialists', skillLevel: 'Evaluation', obbbaAffected: false, duration: 45 },
  
  // AUD Area II: Assessing Risk and Developing a Planned Response
  { lessonId: 'AUD-II-001', section: 'AUD', title: 'Understanding the Entity', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Obtain understanding of entity and environment', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-II-002', section: 'AUD', title: 'Internal Control Overview', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Understand internal control components', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-II-003', section: 'AUD', title: 'Control Environment', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Evaluate the control environment', skillLevel: 'Evaluation', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-II-004', section: 'AUD', title: 'Risk Assessment Process', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Assess risks of material misstatement', skillLevel: 'Analysis', obbbaAffected: false, duration: 55 },
  { lessonId: 'AUD-II-005', section: 'AUD', title: 'Control Activities', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Identify and evaluate control activities', skillLevel: 'Evaluation', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-II-006', section: 'AUD', title: 'Information and Communication', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Evaluate information systems and communication', skillLevel: 'Evaluation', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-II-007', section: 'AUD', title: 'Monitoring Activities', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Evaluate monitoring of controls', skillLevel: 'Evaluation', obbbaAffected: false, duration: 35 },
  { lessonId: 'AUD-II-008', section: 'AUD', title: 'Materiality', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Determine and apply materiality', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-II-009', section: 'AUD', title: 'Audit Planning', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Develop overall audit strategy and plan', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-II-010', section: 'AUD', title: 'Fraud Risk Factors', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Identify and assess fraud risk factors', skillLevel: 'Analysis', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-II-011', section: 'AUD', title: 'Fraud Response Procedures', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Design responses to assessed fraud risks', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-II-012', section: 'AUD', title: 'Laws and Regulations', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Consider laws and regulations in an audit', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-II-013', section: 'AUD', title: 'Related Parties', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Identify and audit related party transactions', skillLevel: 'Analysis', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-II-014', section: 'AUD', title: 'Analytical Procedures in Planning', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Apply analytical procedures in planning', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-II-015', section: 'AUD', title: 'IT General Controls', blueprintArea: BLUEPRINT_AREAS.AUD[1], representativeTask: 'Evaluate IT general controls', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  
  // AUD Area III: Performing Further Procedures and Obtaining Evidence
  { lessonId: 'AUD-III-001', section: 'AUD', title: 'Audit Evidence Concepts', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Evaluate sufficiency and appropriateness of evidence', skillLevel: 'Evaluation', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-III-002', section: 'AUD', title: 'Tests of Controls', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Design and perform tests of controls', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-III-003', section: 'AUD', title: 'Substantive Procedures', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Design and perform substantive procedures', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'AUD-III-004', section: 'AUD', title: 'Audit Sampling', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Apply audit sampling techniques', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-III-005', section: 'AUD', title: 'External Confirmations', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Use external confirmations as audit evidence', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-III-006', section: 'AUD', title: 'Inventory Observation', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Audit inventory through observation and other procedures', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-III-007', section: 'AUD', title: 'Auditing Estimates', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Audit accounting estimates', skillLevel: 'Analysis', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-III-008', section: 'AUD', title: 'Revenue Cycle', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Audit the revenue cycle', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'AUD-III-009', section: 'AUD', title: 'Expenditure Cycle', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Audit the expenditure cycle', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-III-010', section: 'AUD', title: 'Payroll and Personnel', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Audit payroll and personnel cycle', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-III-011', section: 'AUD', title: 'Cash and Investments', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Audit cash and investment balances', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-III-012', section: 'AUD', title: 'Auditing Fair Value', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Audit fair value measurements', skillLevel: 'Analysis', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-III-013', section: 'AUD', title: 'Subsequent Events Procedures', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Perform subsequent events procedures', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-III-014', section: 'AUD', title: 'Management Representations', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Obtain and evaluate management representations', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'AUD-III-015', section: 'AUD', title: 'Going Concern', blueprintArea: BLUEPRINT_AREAS.AUD[2], representativeTask: 'Evaluate going concern', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  
  // AUD Area IV: Forming Conclusions and Reporting
  { lessonId: 'AUD-IV-001', section: 'AUD', title: 'Unmodified Audit Opinion', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Draft an unmodified audit opinion', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-IV-002', section: 'AUD', title: 'Modified Audit Opinions', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Determine appropriate modified opinions', skillLevel: 'Evaluation', obbbaAffected: false, duration: 55 },
  { lessonId: 'AUD-IV-003', section: 'AUD', title: 'Emphasis of Matter Paragraphs', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Determine when emphasis of matter is appropriate', skillLevel: 'Analysis', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-IV-004', section: 'AUD', title: 'Other Matter Paragraphs', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Add other matter paragraphs when appropriate', skillLevel: 'Analysis', obbbaAffected: false, duration: 35 },
  { lessonId: 'AUD-IV-005', section: 'AUD', title: 'Comparative Financial Statements', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Report on comparative financial statements', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-IV-006', section: 'AUD', title: 'Internal Control Reports', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Report on internal control over financial reporting', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-IV-007', section: 'AUD', title: 'Reviews of Financial Statements', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Perform and report on review engagements', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'AUD-IV-008', section: 'AUD', title: 'Compilation Engagements', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Perform and report on compilation engagements', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'AUD-IV-009', section: 'AUD', title: 'Attestation Engagements', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Perform attestation engagements', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'AUD-IV-010', section: 'AUD', title: 'Service Organizations (SOC)', blueprintArea: BLUEPRINT_AREAS.AUD[3], representativeTask: 'Consider service organization controls and SOC reports', skillLevel: 'Analysis', obbbaAffected: false, duration: 45 },
  
  // ============================================================================
  // REG SECTION (54 Lessons) - Many OBBBA Affected
  // ============================================================================
  
  // REG Area I: Ethics and Responsibilities in Tax Practice
  { lessonId: 'REG-I-001', section: 'REG', title: 'Circular 230 Overview', blueprintArea: BLUEPRINT_AREAS.REG[0], representativeTask: 'Apply Treasury Circular 230 requirements', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'REG-I-002', section: 'REG', title: 'Tax Return Preparer Penalties', blueprintArea: BLUEPRINT_AREAS.REG[0], representativeTask: 'Identify preparer penalties under IRC', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 35 },
  { lessonId: 'REG-I-003', section: 'REG', title: 'Taxpayer Penalties', blueprintArea: BLUEPRINT_AREAS.REG[0], representativeTask: 'Identify taxpayer penalties', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 35 },
  { lessonId: 'REG-I-004', section: 'REG', title: 'Tax Practice Standards', blueprintArea: BLUEPRINT_AREAS.REG[0], representativeTask: 'Apply AICPA SSTS in tax practice', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'REG-I-005', section: 'REG', title: 'Privileged Communications', blueprintArea: BLUEPRINT_AREAS.REG[0], representativeTask: 'Apply confidentiality and privilege rules', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  
  // REG Area II: Federal Taxation of Property Transactions
  { lessonId: 'REG-II-001', section: 'REG', title: 'Basis of Assets', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Calculate basis in purchased and gifted assets', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-II-002', section: 'REG', title: 'Inherited Property Basis', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Calculate basis in inherited property', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'Estate tax basis rules may change under OBBBA', duration: 40 },
  { lessonId: 'REG-II-003', section: 'REG', title: 'Depreciation - MACRS', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Calculate MACRS depreciation', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-II-004', section: 'REG', title: 'Section 179 Expense', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Apply Section 179 expensing election', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'Section 179 limits adjusted under OBBBA', duration: 40 },
  { lessonId: 'REG-II-005', section: 'REG', title: 'Bonus Depreciation', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Apply bonus depreciation rules', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'H.R. 1 extends 100% bonus depreciation; current phaseout repealed', duration: 45 },
  { lessonId: 'REG-II-006', section: 'REG', title: 'Gain/Loss Recognition', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Calculate gain or loss on asset dispositions', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-II-007', section: 'REG', title: 'Capital Gains and Losses', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Apply capital gain/loss rules', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-II-008', section: 'REG', title: 'Section 1231 Property', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Apply Section 1231 rules', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-II-009', section: 'REG', title: 'Depreciation Recapture', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Calculate depreciation recapture under Sections 1245 and 1250', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-II-010', section: 'REG', title: 'Like-Kind Exchanges (1031)', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Apply like-kind exchange rules', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-II-011', section: 'REG', title: 'Involuntary Conversions', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Apply involuntary conversion deferral rules', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'REG-II-012', section: 'REG', title: 'Installment Sales', blueprintArea: BLUEPRINT_AREAS.REG[1], representativeTask: 'Account for installment sales', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  
  // REG Area III: Federal Taxation of Individuals - HEAVILY OBBBA AFFECTED
  { lessonId: 'REG-III-001', section: 'REG', title: 'Gross Income Concepts', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Identify items includible in gross income', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-III-002', section: 'REG', title: 'Wages and Compensation', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate taxable compensation', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'REG-III-003', section: 'REG', title: 'Interest and Dividends', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate taxable interest and dividend income', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'OBBBA extends TCJA preferential rates on qualified dividends', duration: 35 },
  { lessonId: 'REG-III-004', section: 'REG', title: 'Business Income', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate Schedule C business income', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-III-005', section: 'REG', title: 'Rental Income', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate rental income and losses', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-III-006', section: 'REG', title: 'Passive Activity Losses', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Apply passive activity loss rules', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-III-007', section: 'REG', title: 'Standard Deduction', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Determine standard deduction amounts', skillLevel: 'Remembering and Understanding', obbbaAffected: true, transitionNote: 'H.R. 1 makes permanent the enhanced standard deduction', duration: 30 },
  { lessonId: 'REG-III-008', section: 'REG', title: 'Itemized Deductions Overview', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Identify itemized deduction categories', skillLevel: 'Remembering and Understanding', obbbaAffected: true, transitionNote: 'SALT cap, mortgage interest limits extended under OBBBA', duration: 35 },
  { lessonId: 'REG-III-009', section: 'REG', title: 'Medical Expenses', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate deductible medical expenses', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'REG-III-010', section: 'REG', title: 'State and Local Taxes (SALT)', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Apply SALT deduction limitations', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'OBBBA increases SALT cap from $10,000 to $40,000', duration: 40 },
  { lessonId: 'REG-III-011', section: 'REG', title: 'Interest Deductions', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Identify deductible interest', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'Mortgage interest limits made permanent under H.R. 1', duration: 40 },
  { lessonId: 'REG-III-012', section: 'REG', title: 'Charitable Contributions', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate charitable contribution deductions', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'AGI limits for charitable deductions adjusted under OBBBA', duration: 45 },
  { lessonId: 'REG-III-013', section: 'REG', title: 'QBI Deduction (Section 199A)', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate qualified business income deduction', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'H.R. 1 increases Section 199A deduction from 20% to 23%', duration: 55 },
  { lessonId: 'REG-III-014', section: 'REG', title: 'Child Tax Credit', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate child tax credit', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'Child tax credit amounts extended/enhanced under OBBBA', duration: 40 },
  { lessonId: 'REG-III-015', section: 'REG', title: 'Earned Income Credit', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate earned income credit', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-III-016', section: 'REG', title: 'Education Credits', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate education credits', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'REG-III-017', section: 'REG', title: 'Tax Rate Schedules', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Apply individual tax rate schedules', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'TCJA tax brackets made permanent under H.R. 1', duration: 35 },
  { lessonId: 'REG-III-018', section: 'REG', title: 'Alternative Minimum Tax', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate individual AMT', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'AMT exemption amounts extended under OBBBA', duration: 50 },
  { lessonId: 'REG-III-019', section: 'REG', title: 'Net Investment Income Tax', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Calculate NIIT (3.8% surtax)', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'REG-III-020', section: 'REG', title: 'Filing Status', blueprintArea: BLUEPRINT_AREAS.REG[2], representativeTask: 'Determine proper filing status', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  
  // REG Area IV: Federal Taxation of Entities
  { lessonId: 'REG-IV-001', section: 'REG', title: 'Entity Selection', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Advise on entity selection considerations', skillLevel: 'Analysis', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-IV-002', section: 'REG', title: 'C Corporation Taxation', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Calculate C corporation taxable income', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'Corporate rate remains 21% under H.R. 1', duration: 55 },
  { lessonId: 'REG-IV-003', section: 'REG', title: 'S Corporation Eligibility', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Determine S corporation eligibility', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'REG-IV-004', section: 'REG', title: 'S Corporation Operations', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Calculate S corporation income and distributions', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-IV-005', section: 'REG', title: 'Partnership Formation', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Account for partnership formation', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-IV-006', section: 'REG', title: 'Partnership Operations', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Calculate partnership ordinary income and separately stated items', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-IV-007', section: 'REG', title: 'Partner Basis', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Calculate partner outside basis', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-IV-008', section: 'REG', title: 'Partnership Distributions', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Account for partnership distributions', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-IV-009', section: 'REG', title: 'Partnership Liquidations', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Account for partner liquidating distributions', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'REG-IV-010', section: 'REG', title: 'Corporate Formations', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Apply Section 351 to corporate formations', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-IV-011', section: 'REG', title: 'Corporate Distributions', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Characterize corporate distributions', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-IV-012', section: 'REG', title: 'Corporate Redemptions', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Apply stock redemption rules', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-IV-013', section: 'REG', title: 'Corporate Liquidations', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Account for corporate liquidations', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'REG-IV-014', section: 'REG', title: 'Tax-Free Reorganizations', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Identify types of tax-free reorganizations', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 50 },
  { lessonId: 'REG-IV-015', section: 'REG', title: 'Trusts and Estates', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Calculate trust and estate income taxation', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'Estate tax exemption levels extended under H.R. 1', duration: 55 },
  { lessonId: 'REG-IV-016', section: 'REG', title: 'Gift Tax', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Calculate gift tax', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'Gift tax exemption amounts extended under OBBBA', duration: 45 },
  { lessonId: 'REG-IV-017', section: 'REG', title: 'Estate Tax', blueprintArea: BLUEPRINT_AREAS.REG[3], representativeTask: 'Calculate estate tax', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'Estate tax exemption amounts made permanent under H.R. 1', duration: 50 },
  
  // ============================================================================
  // BAR SECTION (40 Lessons)
  // ============================================================================
  
  // BAR Area I: Business Analysis
  { lessonId: 'BAR-I-001', section: 'BAR', title: 'Financial Statement Analysis', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Perform financial statement analysis', skillLevel: 'Analysis', obbbaAffected: false, duration: 55 },
  { lessonId: 'BAR-I-002', section: 'BAR', title: 'Ratio Analysis', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Calculate and interpret financial ratios', skillLevel: 'Analysis', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-I-003', section: 'BAR', title: 'Liquidity and Solvency', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Evaluate liquidity and solvency', skillLevel: 'Evaluation', obbbaAffected: false, duration: 45 },
  { lessonId: 'BAR-I-004', section: 'BAR', title: 'Profitability Analysis', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Analyze profitability metrics', skillLevel: 'Analysis', obbbaAffected: false, duration: 45 },
  { lessonId: 'BAR-I-005', section: 'BAR', title: 'Cost-Volume-Profit Analysis', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Perform CVP analysis', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-I-006', section: 'BAR', title: 'Breakeven Analysis', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Calculate breakeven point', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'BAR-I-007', section: 'BAR', title: 'Contribution Margin', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Calculate and analyze contribution margin', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'BAR-I-008', section: 'BAR', title: 'Budgeting Concepts', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Apply budgeting concepts and methods', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-I-009', section: 'BAR', title: 'Variance Analysis', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Calculate and interpret budget variances', skillLevel: 'Analysis', obbbaAffected: false, duration: 55 },
  { lessonId: 'BAR-I-010', section: 'BAR', title: 'Standard Costing', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Apply standard costing systems', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'BAR-I-011', section: 'BAR', title: 'Activity-Based Costing', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Apply activity-based costing', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-I-012', section: 'BAR', title: 'Job Order vs Process Costing', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Distinguish costing systems', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'BAR-I-013', section: 'BAR', title: 'Capital Budgeting', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Evaluate capital budgeting decisions', skillLevel: 'Evaluation', obbbaAffected: false, duration: 55 },
  { lessonId: 'BAR-I-014', section: 'BAR', title: 'NPV and IRR', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Calculate NPV and IRR', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-I-015', section: 'BAR', title: 'Payback Period', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Calculate payback period', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'BAR-I-016', section: 'BAR', title: 'Working Capital Management', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Manage working capital', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'BAR-I-017', section: 'BAR', title: 'Cash Management', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Apply cash management techniques', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'BAR-I-018', section: 'BAR', title: 'Risk Assessment', blueprintArea: BLUEPRINT_AREAS.BAR[0], representativeTask: 'Assess business and financial risks', skillLevel: 'Analysis', obbbaAffected: false, duration: 50 },
  
  // BAR Area II: Technical Accounting and Reporting
  { lessonId: 'BAR-II-001', section: 'BAR', title: 'Complex Revenue Recognition', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Account for complex revenue arrangements', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'BAR-II-002', section: 'BAR', title: 'Long-Term Contracts', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Account for long-term construction contracts', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-II-003', section: 'BAR', title: 'Derivatives Basics', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Account for derivative instruments', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'BAR-II-004', section: 'BAR', title: 'Hedging Activities', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Account for hedging relationships', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-II-005', section: 'BAR', title: 'Foreign Currency Translation', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Translate foreign currency financial statements', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'BAR-II-006', section: 'BAR', title: 'Segment Reporting', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Apply segment reporting requirements', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'BAR-II-007', section: 'BAR', title: 'Interim Reporting', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Apply interim reporting standards', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'BAR-II-008', section: 'BAR', title: 'SEC Reporting', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Understand SEC reporting requirements', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-II-009', section: 'BAR', title: 'Variable Interest Entities', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Account for variable interest entities', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-II-010', section: 'BAR', title: 'Troubled Debt Restructuring', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Account for troubled debt restructurings', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'BAR-II-011', section: 'BAR', title: 'IFRS Differences', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Identify key IFRS vs US GAAP differences', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-II-012', section: 'BAR', title: 'Inventory Methods Comparison', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Compare IFRS and GAAP inventory methods', skillLevel: 'Analysis', obbbaAffected: false, duration: 40 },
  { lessonId: 'BAR-II-013', section: 'BAR', title: 'Asset Impairment IFRS', blueprintArea: BLUEPRINT_AREAS.BAR[1], representativeTask: 'Apply IFRS impairment standards', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  
  // BAR Area III: State and Local Government Concepts
  { lessonId: 'BAR-III-001', section: 'BAR', title: 'Government Accounting Concepts', blueprintArea: BLUEPRINT_AREAS.BAR[2], representativeTask: 'Apply governmental accounting concepts', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-III-002', section: 'BAR', title: 'Governmental Fund Reporting', blueprintArea: BLUEPRINT_AREAS.BAR[2], representativeTask: 'Prepare governmental fund statements', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-III-003', section: 'BAR', title: 'Proprietary Fund Reporting', blueprintArea: BLUEPRINT_AREAS.BAR[2], representativeTask: 'Prepare proprietary fund statements', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'BAR-III-004', section: 'BAR', title: 'Government-Wide Reporting', blueprintArea: BLUEPRINT_AREAS.BAR[2], representativeTask: 'Prepare government-wide statements', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'BAR-III-005', section: 'BAR', title: 'Pension Accounting GASB', blueprintArea: BLUEPRINT_AREAS.BAR[2], representativeTask: 'Apply GASB pension standards', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'BAR-III-006', section: 'BAR', title: 'OPEB Accounting', blueprintArea: BLUEPRINT_AREAS.BAR[2], representativeTask: 'Account for OPEB', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'BAR-III-007', section: 'BAR', title: 'Component Units', blueprintArea: BLUEPRINT_AREAS.BAR[2], representativeTask: 'Account for component units', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  
  // ============================================================================
  // ISC SECTION (33 Lessons)
  // ============================================================================
  
  // ISC Area I: Information Systems and Data Management
  { lessonId: 'ISC-I-001', section: 'ISC', title: 'Information Systems Overview', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Understand information system components', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'ISC-I-002', section: 'ISC', title: 'IT Infrastructure', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Evaluate IT infrastructure components', skillLevel: 'Analysis', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-I-003', section: 'ISC', title: 'Database Concepts', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Apply database management concepts', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-I-004', section: 'ISC', title: 'Data Governance', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Apply data governance principles', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-I-005', section: 'ISC', title: 'Business Intelligence', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Understand business intelligence concepts', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'ISC-I-006', section: 'ISC', title: 'Data Analytics', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Apply data analytics techniques', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-I-007', section: 'ISC', title: 'Cloud Computing', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Evaluate cloud computing models', skillLevel: 'Evaluation', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-I-008', section: 'ISC', title: 'System Implementation', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Understand system implementation processes', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-I-009', section: 'ISC', title: 'Emerging Technologies', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Identify emerging technology impacts', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'ISC-I-010', section: 'ISC', title: 'IT Change Management', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Apply IT change management processes', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-I-011', section: 'ISC', title: 'Digital Transformation', blueprintArea: BLUEPRINT_AREAS.ISC[0], representativeTask: 'Understand digital transformation', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  
  // ISC Area II: Security, Confidentiality, and Privacy
  { lessonId: 'ISC-II-001', section: 'ISC', title: 'Information Security Framework', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Apply information security frameworks', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-II-002', section: 'ISC', title: 'Cybersecurity Threats', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Identify cybersecurity threats', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-II-003', section: 'ISC', title: 'Access Controls', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Evaluate access control mechanisms', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-II-004', section: 'ISC', title: 'Authentication Methods', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Apply authentication methods', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'ISC-II-005', section: 'ISC', title: 'Encryption', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Apply encryption concepts', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-II-006', section: 'ISC', title: 'Network Security', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Evaluate network security controls', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-II-007', section: 'ISC', title: 'Data Privacy', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Apply data privacy principles', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-II-008', section: 'ISC', title: 'Privacy Regulations', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Understand privacy regulations', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'ISC-II-009', section: 'ISC', title: 'Incident Response', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Apply incident response procedures', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-II-010', section: 'ISC', title: 'Business Continuity', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Evaluate business continuity planning', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-II-011', section: 'ISC', title: 'Disaster Recovery', blueprintArea: BLUEPRINT_AREAS.ISC[1], representativeTask: 'Apply disaster recovery concepts', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  
  // ISC Area III: Considerations for SOC Engagements
  { lessonId: 'ISC-III-001', section: 'ISC', title: 'SOC Engagement Types', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Distinguish SOC report types', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-III-002', section: 'ISC', title: 'SOC 1 Reports', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Apply SOC 1 requirements', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-III-003', section: 'ISC', title: 'SOC 2 Reports', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Apply SOC 2 requirements', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-III-004', section: 'ISC', title: 'Trust Services Criteria', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Apply Trust Services Criteria', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'ISC-III-005', section: 'ISC', title: 'SOC for Cybersecurity', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Apply SOC for Cybersecurity framework', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-III-006', section: 'ISC', title: 'Testing Controls in SOC', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Test controls in SOC engagements', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-III-007', section: 'ISC', title: 'SOC Report Users', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Identify appropriate SOC report users', skillLevel: 'Analysis', obbbaAffected: false, duration: 35 },
  { lessonId: 'ISC-III-008', section: 'ISC', title: 'Complementary Controls', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Evaluate complementary user controls', skillLevel: 'Evaluation', obbbaAffected: false, duration: 40 },
  { lessonId: 'ISC-III-009', section: 'ISC', title: 'Subservice Organizations', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Account for subservice organizations', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'ISC-III-010', section: 'ISC', title: 'SOC Reporting Opinions', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Form SOC report opinions', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'ISC-III-011', section: 'ISC', title: 'IT Audit Considerations', blueprintArea: BLUEPRINT_AREAS.ISC[2], representativeTask: 'Apply IT audit considerations', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  
  // ============================================================================
  // TCP SECTION (36 Lessons) - Many OBBBA Affected
  // ============================================================================
  
  // TCP Area I: Tax Compliance and Planning for Individuals
  { lessonId: 'TCP-I-001', section: 'TCP', title: 'Individual Tax Overview', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Calculate individual taxable income', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'TCJA individual provisions extended under H.R. 1', duration: 50 },
  { lessonId: 'TCP-I-002', section: 'TCP', title: 'Tax Planning Strategies', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Develop individual tax planning strategies', skillLevel: 'Evaluation', obbbaAffected: true, transitionNote: 'Planning strategies affected by OBBBA permanency', duration: 55 },
  { lessonId: 'TCP-I-003', section: 'TCP', title: 'Retirement Planning', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Plan for retirement tax implications', skillLevel: 'Evaluation', obbbaAffected: true, transitionNote: 'H.R. 1 includes retirement savings enhancements', duration: 55 },
  { lessonId: 'TCP-I-004', section: 'TCP', title: 'Education Tax Benefits', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Apply education tax benefits', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'TCP-I-005', section: 'TCP', title: 'Social Security Benefits', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Calculate taxable Social Security', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'OBBBA eliminates tax on Social Security for many beneficiaries', duration: 40 },
  { lessonId: 'TCP-I-006', section: 'TCP', title: 'Self-Employment Tax', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Calculate self-employment tax', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'TCP-I-007', section: 'TCP', title: 'Estimated Tax Payments', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Calculate estimated tax payments', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'TCP-I-008', section: 'TCP', title: 'AMT Planning', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Plan for alternative minimum tax', skillLevel: 'Evaluation', obbbaAffected: true, transitionNote: 'AMT exemptions extended under OBBBA', duration: 50 },
  { lessonId: 'TCP-I-009', section: 'TCP', title: 'Investment Income Strategies', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Plan investment income taxation', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'TCP-I-010', section: 'TCP', title: 'Charitable Giving Strategies', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Plan charitable giving for tax benefit', skillLevel: 'Evaluation', obbbaAffected: true, transitionNote: 'Charitable deduction limits affected by OBBBA', duration: 45 },
  { lessonId: 'TCP-I-011', section: 'TCP', title: 'Estate Planning Basics', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Plan for estate tax implications', skillLevel: 'Evaluation', obbbaAffected: true, transitionNote: 'Estate exemption made permanent under H.R. 1', duration: 55 },
  { lessonId: 'TCP-I-012', section: 'TCP', title: 'Gift Tax Planning', blueprintArea: BLUEPRINT_AREAS.TCP[0], representativeTask: 'Plan gift transfers', skillLevel: 'Evaluation', obbbaAffected: true, transitionNote: 'Gift exemption levels extended under OBBBA', duration: 50 },
  
  // TCP Area II: Entity Tax Compliance and Planning
  { lessonId: 'TCP-II-001', section: 'TCP', title: 'Entity Tax Planning Overview', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Evaluate entity tax planning options', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'TCP-II-002', section: 'TCP', title: 'Pass-Through Entity Planning', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Plan pass-through entity taxation', skillLevel: 'Evaluation', obbbaAffected: true, transitionNote: 'Section 199A enhanced to 23% under H.R. 1', duration: 55 },
  { lessonId: 'TCP-II-003', section: 'TCP', title: 'C Corporation Planning', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Plan C corporation tax strategies', skillLevel: 'Evaluation', obbbaAffected: true, transitionNote: '21% corporate rate remains under OBBBA', duration: 50 },
  { lessonId: 'TCP-II-004', section: 'TCP', title: 'Compensation Planning', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Plan executive compensation', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'TCP-II-005', section: 'TCP', title: 'Fringe Benefits', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Plan fringe benefit structures', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'TCP-II-006', section: 'TCP', title: 'Business Credits', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Apply business tax credits', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'R&D credit changes under OBBBA', duration: 50 },
  { lessonId: 'TCP-II-007', section: 'TCP', title: 'NOL Planning', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Plan net operating loss utilization', skillLevel: 'Evaluation', obbbaAffected: false, duration: 45 },
  { lessonId: 'TCP-II-008', section: 'TCP', title: 'Section 1202 Exclusion', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Apply QSBS exclusion', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'TCP-II-009', section: 'TCP', title: 'Multi-State Tax Planning', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Plan for multi-state taxation', skillLevel: 'Evaluation', obbbaAffected: false, duration: 55 },
  { lessonId: 'TCP-II-010', section: 'TCP', title: 'International Tax Basics', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Apply basic international tax concepts', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  { lessonId: 'TCP-II-011', section: 'TCP', title: 'Business Interest Limitation', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Apply Section 163(j) limitations', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'EBITDA basis restored under H.R. 1', duration: 50 },
  { lessonId: 'TCP-II-012', section: 'TCP', title: 'GILTI and FDII', blueprintArea: BLUEPRINT_AREAS.TCP[1], representativeTask: 'Calculate GILTI and FDII', skillLevel: 'Application', obbbaAffected: false, duration: 55 },
  
  // TCP Area III: Property Transactions
  { lessonId: 'TCP-III-001', section: 'TCP', title: 'Basis Planning', blueprintArea: BLUEPRINT_AREAS.TCP[2], representativeTask: 'Plan asset basis strategies', skillLevel: 'Evaluation', obbbaAffected: false, duration: 45 },
  { lessonId: 'TCP-III-002', section: 'TCP', title: 'Capital Gains Planning', blueprintArea: BLUEPRINT_AREAS.TCP[2], representativeTask: 'Plan capital gain recognition', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'TCP-III-003', section: 'TCP', title: 'Section 1031 Planning', blueprintArea: BLUEPRINT_AREAS.TCP[2], representativeTask: 'Plan like-kind exchanges', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'TCP-III-004', section: 'TCP', title: 'Installment Sale Planning', blueprintArea: BLUEPRINT_AREAS.TCP[2], representativeTask: 'Plan installment sale strategies', skillLevel: 'Evaluation', obbbaAffected: false, duration: 45 },
  
  // TCP Area IV: Partnership Taxation
  { lessonId: 'TCP-IV-001', section: 'TCP', title: 'Partnership Tax Planning', blueprintArea: BLUEPRINT_AREAS.TCP[3], representativeTask: 'Plan partnership tax strategies', skillLevel: 'Evaluation', obbbaAffected: false, duration: 55 },
  { lessonId: 'TCP-IV-002', section: 'TCP', title: 'Special Allocations', blueprintArea: BLUEPRINT_AREAS.TCP[3], representativeTask: 'Plan special allocations', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'TCP-IV-003', section: 'TCP', title: 'Hot Assets', blueprintArea: BLUEPRINT_AREAS.TCP[3], representativeTask: 'Account for hot assets', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'TCP-IV-004', section: 'TCP', title: 'Partnership Interest Sales', blueprintArea: BLUEPRINT_AREAS.TCP[3], representativeTask: 'Plan partnership interest dispositions', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  
  // TCP Area V: C and S Corporation Taxation
  { lessonId: 'TCP-V-001', section: 'TCP', title: 'S Corp Planning', blueprintArea: BLUEPRINT_AREAS.TCP[4], representativeTask: 'Plan S corporation strategies', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  { lessonId: 'TCP-V-002', section: 'TCP', title: 'Built-In Gains Tax', blueprintArea: BLUEPRINT_AREAS.TCP[4], representativeTask: 'Calculate built-in gains tax', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'TCP-V-003', section: 'TCP', title: 'Reasonable Compensation', blueprintArea: BLUEPRINT_AREAS.TCP[4], representativeTask: 'Determine reasonable compensation', skillLevel: 'Evaluation', obbbaAffected: false, duration: 45 },
  { lessonId: 'TCP-V-004', section: 'TCP', title: 'Corporate Distributions Planning', blueprintArea: BLUEPRINT_AREAS.TCP[4], representativeTask: 'Plan corporate distributions', skillLevel: 'Evaluation', obbbaAffected: false, duration: 50 },
  
  // ============================================================================
  // PREP SECTION (25 Lessons) - Exam Strategy
  // ============================================================================
  
  { lessonId: 'PREP-001', section: 'PREP', title: 'CPA Evolution 2026: Your Complete Roadmap', blueprintArea: BLUEPRINT_AREAS.PREP[0], representativeTask: 'Understand exam structure and requirements', skillLevel: 'Remembering and Understanding', obbbaAffected: true, transitionNote: 'Includes July 1, 2026 OBBBA transition awareness', duration: 45 },
  { lessonId: 'PREP-002', section: 'PREP', title: 'Anatomy of the Exam: Testlets, Timing, Scoring', blueprintArea: BLUEPRINT_AREAS.PREP[0], representativeTask: 'Understand exam format and scoring', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'PREP-003', section: 'PREP', title: 'Adaptive Testing: What It Means for You', blueprintArea: BLUEPRINT_AREAS.PREP[0], representativeTask: 'Understand adaptive testing mechanics', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 35 },
  { lessonId: 'PREP-004', section: 'PREP', title: 'How the CPA Exam is Scored', blueprintArea: BLUEPRINT_AREAS.PREP[0], representativeTask: 'Understand scoring methodology', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'PREP-005', section: 'PREP', title: 'Strategic Section Order', blueprintArea: BLUEPRINT_AREAS.PREP[0], representativeTask: 'Plan optimal exam section sequence', skillLevel: 'Application', obbbaAffected: true, transitionNote: 'Consider OBBBA transition when scheduling REG/TCP', duration: 45 },
  { lessonId: 'PREP-006', section: 'PREP', title: 'The 90-Second Rule: MCQ Time Management', blueprintArea: BLUEPRINT_AREAS.PREP[1], representativeTask: 'Apply MCQ time management', skillLevel: 'Application', obbbaAffected: false, duration: 30 },
  { lessonId: 'PREP-007', section: 'PREP', title: 'Reading MCQs Effectively', blueprintArea: BLUEPRINT_AREAS.PREP[1], representativeTask: 'Read and analyze MCQ stems', skillLevel: 'Application', obbbaAffected: false, duration: 25 },
  { lessonId: 'PREP-008', section: 'PREP', title: 'Process of Elimination (POE)', blueprintArea: BLUEPRINT_AREAS.PREP[1], representativeTask: 'Apply elimination strategies', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'PREP-009', section: 'PREP', title: 'Recognizing Distractor Patterns', blueprintArea: BLUEPRINT_AREAS.PREP[1], representativeTask: 'Identify common distractors', skillLevel: 'Analysis', obbbaAffected: false, duration: 40 },
  { lessonId: 'PREP-010', section: 'PREP', title: 'Calculation MCQs: Set Up First', blueprintArea: BLUEPRINT_AREAS.PREP[1], representativeTask: 'Approach calculation questions', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'PREP-011', section: 'PREP', title: 'The "I Have No Idea" Protocol', blueprintArea: BLUEPRINT_AREAS.PREP[1], representativeTask: 'Handle unknown questions', skillLevel: 'Application', obbbaAffected: false, duration: 25 },
  { lessonId: 'PREP-012', section: 'PREP', title: 'TBS Overview: Types & Weighting', blueprintArea: BLUEPRINT_AREAS.PREP[2], representativeTask: 'Understand TBS formats', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'PREP-013', section: 'PREP', title: 'TBS Time Management: 15-Minute Rule', blueprintArea: BLUEPRINT_AREAS.PREP[2], representativeTask: 'Manage TBS time allocation', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'PREP-014', section: 'PREP', title: 'Research TBS: Guaranteed Points', blueprintArea: BLUEPRINT_AREAS.PREP[2], representativeTask: 'Navigate authoritative literature', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'PREP-015', section: 'PREP', title: 'Document Review TBS', blueprintArea: BLUEPRINT_AREAS.PREP[2], representativeTask: 'Extract information from exhibits', skillLevel: 'Analysis', obbbaAffected: false, duration: 45 },
  { lessonId: 'PREP-016', section: 'PREP', title: 'Journal Entry TBS', blueprintArea: BLUEPRINT_AREAS.PREP[2], representativeTask: 'Create journal entries in TBS', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'PREP-017', section: 'PREP', title: 'Spreadsheet TBS: Excel for CPAs', blueprintArea: BLUEPRINT_AREAS.PREP[2], representativeTask: 'Use spreadsheet functions in TBS', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'PREP-018', section: 'PREP', title: 'Written Communication: What Graders Want', blueprintArea: BLUEPRINT_AREAS.PREP[3], representativeTask: 'Write effective WC responses', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
  { lessonId: 'PREP-019', section: 'PREP', title: 'IRAC Method for Tax Memos', blueprintArea: BLUEPRINT_AREAS.PREP[3], representativeTask: 'Structure tax memoranda', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'PREP-020', section: 'PREP', title: 'Common WC Mistakes', blueprintArea: BLUEPRINT_AREAS.PREP[3], representativeTask: 'Avoid WC errors', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 30 },
  { lessonId: 'PREP-021', section: 'PREP', title: 'Building Your Study Schedule', blueprintArea: BLUEPRINT_AREAS.PREP[4], representativeTask: 'Create effective study plans', skillLevel: 'Application', obbbaAffected: false, duration: 50 },
  { lessonId: 'PREP-022', section: 'PREP', title: 'Active vs Passive Studying', blueprintArea: BLUEPRINT_AREAS.PREP[4], representativeTask: 'Apply effective study methods', skillLevel: 'Application', obbbaAffected: false, duration: 35 },
  { lessonId: 'PREP-023', section: 'PREP', title: 'Final Review: Last 2 Weeks', blueprintArea: BLUEPRINT_AREAS.PREP[4], representativeTask: 'Execute final review strategy', skillLevel: 'Application', obbbaAffected: false, duration: 45 },
  { lessonId: 'PREP-024', section: 'PREP', title: 'Test Day Protocol', blueprintArea: BLUEPRINT_AREAS.PREP[4], representativeTask: 'Prepare for exam day logistics', skillLevel: 'Remembering and Understanding', obbbaAffected: false, duration: 40 },
  { lessonId: 'PREP-025', section: 'PREP', title: 'Managing Test Anxiety', blueprintArea: BLUEPRINT_AREAS.PREP[4], representativeTask: 'Apply anxiety management techniques', skillLevel: 'Application', obbbaAffected: false, duration: 40 },
];

// Summary Statistics
export const LESSON_SUMMARY = {
  totalLessons: 303,
  bySection: {
    FAR: 65,
    AUD: 50,
    REG: 54,
    BAR: 40,
    ISC: 33,
    TCP: 36,
    PREP: 25,
  },
  obbbaAffectedLessons: LESSON_MATRIX.filter(l => l.obbbaAffected).length,
  totalDuration: LESSON_MATRIX.reduce((sum, l) => sum + l.duration, 0),
  totalHours: Math.round(LESSON_MATRIX.reduce((sum, l) => sum + l.duration, 0) / 60),
};

// ============================================================================
// BLUEPRINT VERSION MAPPINGS
// Lessons that DIFFER between 2025 and 2026 Blueprints
// ============================================================================

/**
 * Lessons with content differences between 2025 and 2026 Blueprints.
 * For lessons not in this list, blueprintVersion defaults to 'both'.
 */
export const BLUEPRINT_DIFFERENCES: Map<string, {
  status: BlueprintVersionStatus;
  study2025?: string;
  study2026?: string;
}> = new Map([
  // REG - Major tax law changes (OBBBA/H.R. 1)
  ['REG-II-012', { status: 'differs', study2025: 'Bonus depreciation: 40% rate', study2026: 'Bonus depreciation: 100% rate (H.R. 1)' }],
  ['REG-III-001', { status: 'differs', study2025: 'Standard deduction: 2025 amounts', study2026: 'Standard deduction: Permanent enhanced amounts (H.R. 1)' }],
  ['REG-III-003', { status: 'differs', study2025: 'SALT cap: $10,000', study2026: 'SALT cap: $40,000 (H.R. 1)' }],
  ['REG-III-004', { status: 'differs', study2025: 'QBI deduction: 20% of QBI', study2026: 'QBI deduction: 23% of QBI (H.R. 1)' }],
  ['REG-III-006', { status: 'differs', study2025: 'Child Tax Credit: $2,000 per child', study2026: 'Child Tax Credit: Enhanced (H.R. 1)' }],
  ['REG-III-007', { status: 'differs', study2025: '2025 tax rate brackets (TCJA)', study2026: '2026 tax brackets permanent (H.R. 1)' }],
  ['REG-III-009', { status: 'differs', study2025: 'AMT exemption: 2025 amounts', study2026: 'AMT exemption: Permanent (H.R. 1)' }],
  ['REG-IV-015', { status: 'differs', study2025: 'Estate exemption: ~$13.6M', study2026: 'Estate exemption: Permanent high (H.R. 1)' }],
  ['REG-IV-016', { status: 'differs', study2025: 'Gift tax exemption: 2025 limit', study2026: 'Gift tax exemption: Permanent (H.R. 1)' }],
  
  // TCP - Tax planning changes mirror REG
  ['TCP-I-001', { status: 'differs', study2025: 'Individual tax rates 2025', study2026: 'Individual tax rates permanent (H.R. 1)' }],
  ['TCP-I-004', { status: 'differs', study2025: 'SS benefits: Up to 85% taxable', study2026: 'SS benefits: New exemptions (H.R. 1)' }],
  ['TCP-I-006', { status: 'differs', study2025: 'AMT planning 2025', study2026: 'AMT permanent exemptions (H.R. 1)' }],
  ['TCP-I-009', { status: 'differs', study2025: 'Estate planning 2025 exemption', study2026: 'Estate planning permanent exemption (H.R. 1)' }],
  ['TCP-I-010', { status: 'differs', study2025: 'Gift tax planning 2025', study2026: 'Gift tax planning permanent (H.R. 1)' }],
  ['TCP-II-003', { status: 'differs', study2025: 'Sec 199A: 20% deduction', study2026: 'Sec 199A: 23% deduction (H.R. 1)' }],
  ['TCP-II-008', { status: 'differs', study2025: 'Business interest: ATI (EBIT)', study2026: 'Business interest: EBITDA (H.R. 1)' }],
  ['TCP-III-002', { status: 'differs', study2025: 'Depreciation planning: 40%', study2026: 'Depreciation planning: 100% (H.R. 1)' }],
]);

// Helper function to get lesson blueprint version
export function getLessonBlueprintVersion(lessonId: string): BlueprintVersionStatus {
  const diff = BLUEPRINT_DIFFERENCES.get(lessonId);
  return diff?.status || 'both';
}

// Helper function to get lessons by blueprint version
export function getLessonsByBlueprintVersion(version: BlueprintVersionStatus): LessonMatrixEntry[] {
  if (version === 'both') {
    return LESSON_MATRIX.filter(l => !BLUEPRINT_DIFFERENCES.has(l.lessonId));
  }
  return LESSON_MATRIX.filter(l => {
    const diff = BLUEPRINT_DIFFERENCES.get(l.lessonId);
    return diff?.status === version;
  });
}

// Helper function to get lessons that differ between blueprints
export function getDifferingLessons(): LessonMatrixEntry[] {
  return LESSON_MATRIX.filter(l => BLUEPRINT_DIFFERENCES.has(l.lessonId));
}

// Helper function to get study guidance for a lesson
export function getStudyGuidance(lessonId: string, userBlueprintVersion: '2025' | '2026'): string | null {
  const diff = BLUEPRINT_DIFFERENCES.get(lessonId);
  if (!diff || diff.status === 'both') return null;
  return userBlueprintVersion === '2025' ? diff.study2025 || null : diff.study2026 || null;
}

// Helper function to get OBBBA-affected lessons
export function getObbbaAffectedLessons(): LessonMatrixEntry[] {
  return LESSON_MATRIX.filter(lesson => lesson.obbbaAffected);
}

// Helper function to get lessons by section
export function getLessonsBySection(section: string): LessonMatrixEntry[] {
  return LESSON_MATRIX.filter(lesson => lesson.section === section);
}

// Helper function to get lessons by blueprint area
export function getLessonsByBlueprintArea(areaId: string): LessonMatrixEntry[] {
  return LESSON_MATRIX.filter(lesson => lesson.blueprintArea.areaId === areaId);
}

logger.log('VoraPrep Lesson Matrix loaded.');
logger.log(`Total Lessons: ${LESSON_SUMMARY.totalLessons}`);
logger.log(`OBBBA-Affected Lessons: ${LESSON_SUMMARY.obbbaAffectedLessons}`);
logger.log(`Lessons with Blueprint Differences: ${BLUEPRINT_DIFFERENCES.size}`);
logger.log(`Total Study Hours: ~${LESSON_SUMMARY.totalHours} hours`);
