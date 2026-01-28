/**
 * VoraPrep Blueprint Configuration
 * 
 * CRITICAL TRANSITION TIMELINE:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  January 1, 2026  ────────────►  June 30, 2026  │  2025 BLUEPRINT TESTED   │
 * │  July 1, 2026     ────────────►  December 31, 2026  │  2026 BLUEPRINT TESTED│
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * Users studying NOW (January 2026) need to focus on 2025 Blueprint content
 * if testing before July 1, 2026.
 * 
 * Key differences between 2025 and 2026 Blueprints are documented below.
 */

export type BlueprintVersion = '2025' | '2026';

export interface BlueprintTransition {
  effectiveDate: string;
  endDate: string;
  blueprintVersion: BlueprintVersion;
  description: string;
}

export interface TopicChange {
  topicId: string;
  topicName: string;
  section: string;
  changeType: 'added' | 'removed' | 'modified' | 'weight-changed';
  in2025: boolean;
  in2026: boolean;
  description: string;
  userAction: string;
}

// ============================================================================
// BLUEPRINT TESTING WINDOWS
// ============================================================================

export const BLUEPRINT_WINDOWS: BlueprintTransition[] = [
  {
    effectiveDate: '2026-01-01',
    endDate: '2026-06-30',
    blueprintVersion: '2025',
    description: '2025 Blueprint content tested. TCJA provisions as originally enacted (many expiring 12/31/2025). Pre-OBBBA tax law.',
  },
  {
    effectiveDate: '2026-07-01',
    endDate: '2026-12-31',
    blueprintVersion: '2026',
    description: '2026 Blueprint content tested. H.R. 1 (OBBBA) provisions now testable. Enhanced Section 199A, increased SALT cap, extended bonus depreciation.',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getCurrentBlueprintVersion(): BlueprintVersion {
  const today = new Date();
  const july1_2026 = new Date('2026-07-01');
  return today < july1_2026 ? '2025' : '2026';
}

export function getBlueprintForExamDate(examDate: Date): BlueprintVersion {
  const july1_2026 = new Date('2026-07-01');
  return examDate < july1_2026 ? '2025' : '2026';
}

export function getDaysUntilBlueprintChange(): number {
  const today = new Date();
  const july1_2026 = new Date('2026-07-01');
  const diffTime = july1_2026.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ============================================================================
// TOPIC CHANGES BETWEEN 2025 AND 2026 BLUEPRINTS
// ============================================================================

export const BLUEPRINT_CHANGES: TopicChange[] = [
  // -------------------------------------------------------------------------
  // REG SECTION CHANGES (Most Significant - Tax Law Updates)
  // -------------------------------------------------------------------------
  
  // Standard Deduction
  {
    topicId: 'REG-III-007',
    topicName: 'Standard Deduction',
    section: 'REG',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: Standard deduction amounts as set by TCJA (expiring). 2026: Enhanced amounts made permanent under H.R. 1.',
    userAction: 'If testing before July 1: Study 2025 standard deduction amounts. After July 1: New permanent amounts.',
  },
  
  // SALT Cap
  {
    topicId: 'REG-III-010',
    topicName: 'State and Local Tax (SALT) Deduction',
    section: 'REG',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: $10,000 SALT cap (TCJA). 2026: $40,000 SALT cap under H.R. 1.',
    userAction: 'MAJOR CHANGE: If testing before July 1, use $10,000 cap. After July 1, use $40,000 cap.',
  },
  
  // QBI Deduction (Section 199A)
  {
    topicId: 'REG-III-013',
    topicName: 'Qualified Business Income Deduction (Section 199A)',
    section: 'REG',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: 20% QBI deduction (TCJA, set to expire). 2026: 23% QBI deduction under H.R. 1.',
    userAction: 'CALCULATION CHANGE: If testing before July 1, use 20%. After July 1, use 23%.',
  },
  
  // Bonus Depreciation
  {
    topicId: 'REG-II-005',
    topicName: 'Bonus Depreciation',
    section: 'REG',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: 40% bonus depreciation (phasing down from 100%). 2026: 100% bonus depreciation restored under H.R. 1.',
    userAction: 'MAJOR CHANGE: If testing before July 1, use 40% rate. After July 1, use 100% rate.',
  },
  
  // Tax Brackets
  {
    topicId: 'REG-III-017',
    topicName: 'Individual Tax Rate Schedules',
    section: 'REG',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: TCJA brackets (set to expire, would revert to pre-2018 rates). 2026: Current brackets made permanent under H.R. 1.',
    userAction: 'If testing before July 1: TCJA brackets still apply. After July 1: Same brackets, now permanent.',
  },
  
  // AMT Exemption
  {
    topicId: 'REG-III-018',
    topicName: 'Alternative Minimum Tax',
    section: 'REG',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: Higher AMT exemption amounts (TCJA). 2026: Exemption amounts made permanent under H.R. 1.',
    userAction: 'Exemption amounts similar, but now permanent. Know the current exemption levels.',
  },
  
  // Child Tax Credit
  {
    topicId: 'REG-III-014',
    topicName: 'Child Tax Credit',
    section: 'REG',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: $2,000 per child (TCJA). 2026: Extended/enhanced amounts under H.R. 1.',
    userAction: 'Know current credit amount and refundable portion limits for your testing window.',
  },
  
  // Estate Tax Exemption
  {
    topicId: 'REG-IV-017',
    topicName: 'Estate Tax',
    section: 'REG',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: ~$13.6M exemption (TCJA, set to revert to ~$7M). 2026: High exemption made permanent under H.R. 1.',
    userAction: 'If testing before July 1: Know 2025 exemption. After July 1: High exemption is permanent.',
  },
  
  // Gift Tax Exemption
  {
    topicId: 'REG-IV-016',
    topicName: 'Gift Tax',
    section: 'REG',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: High lifetime exemption (unified with estate). 2026: Exemption made permanent under H.R. 1.',
    userAction: 'Know annual exclusion ($18,000 for 2025) and lifetime exemption for your testing window.',
  },
  
  // Social Security Taxation
  {
    topicId: 'TCP-I-005',
    topicName: 'Social Security Benefits Taxation',
    section: 'TCP',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: Up to 85% of SS benefits taxable. 2026: H.R. 1 eliminates tax on SS for many beneficiaries.',
    userAction: 'MAJOR CHANGE: If testing before July 1, use current 85% rules. After July 1, new exemption rules apply.',
  },
  
  // Business Interest Limitation (163(j))
  {
    topicId: 'TCP-II-011',
    topicName: 'Business Interest Limitation (Section 163(j))',
    section: 'TCP',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: 30% of ATI (EBIT basis after TCJA sunset). 2026: H.R. 1 restores EBITDA basis.',
    userAction: 'Know which calculation method applies to your testing window.',
  },
  
  // -------------------------------------------------------------------------
  // FAR SECTION CHANGES (Minor Updates)
  // -------------------------------------------------------------------------
  
  {
    topicId: 'FAR-II-002',
    topicName: 'Current Expected Credit Losses (CECL)',
    section: 'FAR',
    changeType: 'weight-changed',
    in2025: true,
    in2026: true,
    description: '2026 Blueprint increases emphasis on CECL model implementation.',
    userAction: 'CECL is heavily tested in both. Ensure strong understanding.',
  },
  
  {
    topicId: 'FAR-III-001',
    topicName: 'Revenue Recognition (ASC 606)',
    section: 'FAR',
    changeType: 'weight-changed',
    in2025: true,
    in2026: true,
    description: '2026 Blueprint continues heavy emphasis on 5-step model.',
    userAction: 'Revenue recognition remains high-weight. Master the 5-step model.',
  },
  
  // -------------------------------------------------------------------------
  // AUD SECTION CHANGES (Minor Updates)
  // -------------------------------------------------------------------------
  
  {
    topicId: 'AUD-I-005',
    topicName: 'Quality Management Standards',
    section: 'AUD',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2026 Blueprint reflects SQMS No. 1 full implementation.',
    userAction: 'Quality Management (SQMS) now fully effective. Know the requirements.',
  },
  
  // -------------------------------------------------------------------------
  // TCP SECTION CHANGES (Significant - Mirrors REG tax changes)
  // -------------------------------------------------------------------------
  
  {
    topicId: 'TCP-II-002',
    topicName: 'Pass-Through Entity Tax Planning',
    section: 'TCP',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2025: 20% Section 199A deduction. 2026: 23% deduction under H.R. 1.',
    userAction: 'CALCULATION CHANGE: Know which percentage applies to your testing window.',
  },
  
  {
    topicId: 'TCP-I-011',
    topicName: 'Estate Planning',
    section: 'TCP',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2026: Estate exemption permanency changes planning strategies.',
    userAction: 'Planning strategies differ based on exemption certainty. Know the current law.',
  },
  
  // -------------------------------------------------------------------------
  // ISC SECTION CHANGES (Minimal)
  // -------------------------------------------------------------------------
  
  {
    topicId: 'ISC-I-009',
    topicName: 'Emerging Technologies',
    section: 'ISC',
    changeType: 'modified',
    in2025: true,
    in2026: true,
    description: '2026 Blueprint adds more emphasis on AI and automation in accounting.',
    userAction: 'Increased focus on AI governance and controls in 2026.',
  },
  
  // -------------------------------------------------------------------------
  // BAR SECTION CHANGES (Minimal)
  // -------------------------------------------------------------------------
  
  {
    topicId: 'BAR-II-011',
    topicName: 'IFRS Differences',
    section: 'BAR',
    changeType: 'weight-changed',
    in2025: true,
    in2026: true,
    description: '2026 Blueprint maintains focus on key IFRS vs GAAP differences.',
    userAction: 'IFRS comparison questions continue to appear. Know key differences.',
  },
];

// ============================================================================
// USER-FACING ALERTS AND GUIDANCE
// ============================================================================

export interface BlueprintAlert {
  type: 'critical' | 'warning' | 'info';
  message: string;
  sections: string[];
  showUntil: string;
}

export const BLUEPRINT_ALERTS: BlueprintAlert[] = [
  {
    type: 'critical',
    message: '⚠️ BLUEPRINT TRANSITION: Testing before July 1, 2026? You will be tested on the 2025 Blueprint. Testing after July 1, 2026? You will be tested on the 2026 Blueprint. Tax law changes are SIGNIFICANT.',
    sections: ['REG', 'TCP'],
    showUntil: '2026-07-15',
  },
  {
    type: 'warning',
    message: '📋 The SALT cap changes from $10,000 (2025) to $40,000 (2026) on July 1, 2026. The QBI deduction changes from 20% to 23%. Know which applies to YOUR exam date!',
    sections: ['REG', 'TCP'],
    showUntil: '2026-07-15',
  },
  {
    type: 'info',
    message: 'FAR, AUD, BAR, and ISC have minimal changes between 2025 and 2026 Blueprints. Focus on core content.',
    sections: ['FAR', 'AUD', 'BAR', 'ISC'],
    showUntil: '2026-12-31',
  },
];

// ============================================================================
// STUDY RECOMMENDATIONS BY EXAM DATE
// ============================================================================

export interface StudyRecommendation {
  examDateRange: string;
  blueprintVersion: BlueprintVersion;
  recommendations: string[];
  taxLawFocus: string;
}

export const STUDY_RECOMMENDATIONS: StudyRecommendation[] = [
  {
    examDateRange: 'January 1 - March 31, 2026',
    blueprintVersion: '2025',
    recommendations: [
      'Focus on 2025 Blueprint content exclusively',
      'Study TCJA provisions AS THEY WERE ENACTED (many expiring 12/31/2025)',
      'Use $10,000 SALT cap in all calculations',
      'Use 20% QBI deduction rate',
      'Use 40% bonus depreciation rate',
      'Current tax brackets apply',
    ],
    taxLawFocus: 'Pre-OBBBA: TCJA as enacted, with 2025 rates and limits',
  },
  {
    examDateRange: 'April 1 - June 30, 2026',
    blueprintVersion: '2025',
    recommendations: [
      'Still 2025 Blueprint - DO NOT study H.R. 1 provisions yet',
      'Same tax law as Q1 2026',
      'If planning to test REG/TCP after July 1, consider scheduling accordingly',
      'Begin familiarizing with 2026 changes if retaking after July 1',
    ],
    taxLawFocus: 'Pre-OBBBA: TCJA as enacted, with 2025 rates and limits',
  },
  {
    examDateRange: 'July 1 - September 30, 2026',
    blueprintVersion: '2026',
    recommendations: [
      'NOW study H.R. 1 (OBBBA) provisions',
      'Use $40,000 SALT cap',
      'Use 23% QBI deduction rate',
      'Use 100% bonus depreciation',
      'Tax brackets now permanent (same rates, different legal status)',
      'Social Security taxation changes now apply',
    ],
    taxLawFocus: 'Post-OBBBA: H.R. 1 provisions fully testable',
  },
  {
    examDateRange: 'October 1 - December 31, 2026',
    blueprintVersion: '2026',
    recommendations: [
      '2026 Blueprint fully in effect',
      'All H.R. 1 provisions testable',
      'Standard 2026 study approach',
    ],
    taxLawFocus: 'Post-OBBBA: H.R. 1 provisions fully testable',
  },
];

// ============================================================================
// LESSON BLUEPRINT MARKERS
// ============================================================================

export type LessonBlueprintStatus = 
  | 'both'           // Same content in 2025 and 2026
  | '2025-only'      // Only tested in 2025 Blueprint
  | '2026-only'      // Only tested in 2026 Blueprint
  | '2025-version'   // Study THIS version if testing before July 1
  | '2026-version';  // Study THIS version if testing after July 1

export interface LessonBlueprintMarker {
  lessonId: string;
  status: LessonBlueprintStatus;
  note?: string;
}

// Mark lessons that differ between blueprints
export const LESSON_BLUEPRINT_MARKERS: LessonBlueprintMarker[] = [
  // REG differences
  { lessonId: 'REG-II-005', status: '2025-version', note: '2025: 40% bonus. After July 1: Use REG-II-005-2026 (100% bonus)' },
  { lessonId: 'REG-III-007', status: '2025-version', note: '2025 standard deduction. After July 1: Permanent enhanced amounts' },
  { lessonId: 'REG-III-010', status: '2025-version', note: '2025: $10,000 SALT cap. After July 1: $40,000 SALT cap' },
  { lessonId: 'REG-III-013', status: '2025-version', note: '2025: 20% QBI. After July 1: 23% QBI' },
  { lessonId: 'REG-III-014', status: '2025-version', note: '2025 child tax credit. After July 1: Enhanced credit' },
  { lessonId: 'REG-III-017', status: 'both', note: 'Same brackets, different legal status (permanent vs expiring)' },
  { lessonId: 'REG-III-018', status: '2025-version', note: '2025 AMT exemption. After July 1: Permanent exemption' },
  { lessonId: 'REG-IV-016', status: '2025-version', note: '2025 gift exemption. After July 1: Permanent exemption' },
  { lessonId: 'REG-IV-017', status: '2025-version', note: '2025 estate exemption. After July 1: Permanent exemption' },
  
  // TCP differences (mirror REG)
  { lessonId: 'TCP-I-001', status: '2025-version', note: '2025 individual tax overview. After July 1: OBBBA provisions' },
  { lessonId: 'TCP-I-005', status: '2025-version', note: '2025: Up to 85% SS taxable. After July 1: New exemptions' },
  { lessonId: 'TCP-I-008', status: '2025-version', note: '2025 AMT planning. After July 1: Permanent exemptions' },
  { lessonId: 'TCP-I-011', status: '2025-version', note: '2025 estate planning. After July 1: Permanent exemptions' },
  { lessonId: 'TCP-I-012', status: '2025-version', note: '2025 gift planning. After July 1: Permanent exemptions' },
  { lessonId: 'TCP-II-002', status: '2025-version', note: '2025: 20% Sec 199A. After July 1: 23% Sec 199A' },
  { lessonId: 'TCP-II-011', status: '2025-version', note: '2025: ATI (EBIT) basis. After July 1: EBITDA basis restored' },
];

// ============================================================================
// EXPORT SUMMARY
// ============================================================================

export const BLUEPRINT_SUMMARY = {
  currentBlueprint: getCurrentBlueprintVersion(),
  daysUntilChange: getDaysUntilBlueprintChange(),
  transitionDate: '2026-07-01',
  majorChangeSections: ['REG', 'TCP'],
  minorChangeSections: ['FAR', 'AUD', 'BAR', 'ISC'],
  criticalTopics: [
    'SALT Cap ($10K → $40K)',
    'QBI Deduction (20% → 23%)',
    'Bonus Depreciation (40% → 100%)',
    'Social Security Taxation',
    'Estate/Gift Exemptions',
  ],
};

console.log('Blueprint Configuration loaded.');
console.log(`Current Blueprint: ${BLUEPRINT_SUMMARY.currentBlueprint}`);
console.log(`Days until 2026 Blueprint: ${BLUEPRINT_SUMMARY.daysUntilChange}`);
