/**
 * CFP Mock Exams
 * 
 * Full-length practice exams simulating the actual CFP exam experience
 * - 170 questions per exam (matching real CFP exam)
 * - 3-hour time limit
 * - Questions pulled from all domains based on exam weighting
 * - Includes item sets (mini case studies) and standalone questions
 */

import type { NormalizedDifficulty } from '../../../types';

/**
 * Mock exam question (can be standalone or part of item set)
 */
export interface MockExamQuestion {
  id: string;
  questionRef: string;        // Reference to actual question ID
  itemSetId?: string;         // If part of an item set
  position: number;           // Position in exam
}

/**
 * Item Set - Group of questions based on a short scenario
 */
export interface MockExamItemSet {
  id: string;
  title: string;
  scenario: string;           // Short scenario (1-2 paragraphs)
  questionRefs: string[];     // 4-8 question IDs
}

/**
 * Mock Exam Configuration
 */
export interface MockExam {
  id: string;
  title: string;
  courseId: 'cfp';
  version: string;            // For versioning exams
  difficulty: NormalizedDifficulty;
  totalQuestions: number;     // Should be 170 for full exam
  timeLimit: number;          // In minutes (180 for full exam)
  passingScore: number;       // Percentage (typically 70%)
  
  // Domain distribution matching CFP exam weights
  domainDistribution: {
    domain: string;
    weight: number;           // Percentage weight
    questionCount: number;    // Number of questions
  }[];
  
  // Item sets configuration
  itemSetCount: number;       // Number of item sets (typically 2-4)
  itemSets: MockExamItemSet[];
  
  // Standalone questions
  standaloneQuestionRefs: string[];
  
  // Metadata
  description: string;
  lastUpdated: string;
  releaseDate: string;
}

/**
 * CFP Exam Domain Weights (per CFP Board blueprint 2024+)
 * Total: 170 questions
 */
export const CFP_DOMAIN_WEIGHTS = {
  'RET': { name: 'Retirement Planning', weight: 0.18, questionCount: 31 },
  'INV': { name: 'Investment Planning', weight: 0.17, questionCount: 29 },
  'GEN': { name: 'General Principles', weight: 0.15, questionCount: 26 },
  'TAX': { name: 'Tax Planning', weight: 0.14, questionCount: 24 },
  'RIS': { name: 'Risk Management', weight: 0.11, questionCount: 19 },
  'EST': { name: 'Estate Planning', weight: 0.10, questionCount: 17 },
  'PRO': { name: 'Professional Conduct', weight: 0.08, questionCount: 14 },
  'PSY': { name: 'Psychology of Financial Planning', weight: 0.07, questionCount: 12 },
} as const;

/**
 * 8 Domains: 31+29+26+24+19+17+14+12 = 172 (rounded to 170 for exam)
 */

/**
 * Sample Mock Exam #1 - Foundation Level
 */
export const CFP_MOCK_EXAM_1: MockExam = {
  id: 'CFP-MOCK-001',
  title: 'CFP Practice Exam 1: Foundation Assessment',
  courseId: 'cfp',
  version: '2026.1',
  difficulty: 'medium',
  totalQuestions: 170,
  timeLimit: 180, // 3 hours
  passingScore: 70,
  
  domainDistribution: [
    { domain: 'RET', weight: 18, questionCount: 31 },
    { domain: 'INV', weight: 17, questionCount: 29 },
    { domain: 'GEN', weight: 15, questionCount: 26 },
    { domain: 'TAX', weight: 14, questionCount: 24 },
    { domain: 'RIS', weight: 11, questionCount: 19 },
    { domain: 'EST', weight: 10, questionCount: 17 },
    { domain: 'PRO', weight: 8, questionCount: 14 },
    { domain: 'PSY', weight: 7, questionCount: 12 },
  ],
  
  itemSetCount: 3,
  itemSets: [
    {
      id: 'CFP-MOCK-001-IS-1',
      title: 'The Chen Family',
      scenario: `
David Chen (58) and Lisa Chen (55) are successful professionals planning for retirement in 5-7 years.
David earns $220,000 as an IT director; Lisa earns $145,000 as a nurse manager. They have combined 
retirement accounts of $1.8 million (80% equities). Their home is worth $650,000 with a $180,000 
mortgage at 4.5%. They have two adult children. David's employer offers a deferred compensation plan 
he hasn't utilized. Lisa is concerned about long-term care after her mother required nursing home care. 
They want to retire with $150,000 annual income (pre-tax) and leave an inheritance.
      `,
      questionRefs: [
        'CFP-RET-001', 'CFP-RET-015', 'CFP-RET-028', 'CFP-TAX-019',
        'CFP-RISK-012', 'CFP-EST-008'
      ]
    },
    {
      id: 'CFP-MOCK-001-IS-2',
      title: 'Dr. Priya Sharma',
      scenario: `
Priya Sharma (42) is a physician who recently joined a private practice as a partner after 8 years 
as an employee. She earns $380,000 with potential bonus of $50,000-$100,000. She has $450,000 in 
her previous employer's 403(b) and $180,000 in a taxable brokerage account. As a new partner, she 
must decide on retirement plan design for the practice (5 physicians, 12 staff). She is divorced 
with two children (ages 8 and 10) and pays $3,500/month in alimony. She wants to maximize 
tax-advantaged savings and fund children's education.
      `,
      questionRefs: [
        'CFP-RET-034', 'CFP-TAX-026', 'CFP-TAX-038', 'CFP-GEN-018',
        'CFP-EST-029', 'CFP-PRO-009'
      ]
    },
    {
      id: 'CFP-MOCK-001-IS-3',
      title: 'Small Business Exit Planning',
      scenario: `
Robert Williams (62) owns a manufacturing business valued at $4.5 million. He started the company 
30 years ago; his basis is $250,000. His son James (35) works in the business and wants to take over. 
His daughter Sarah (33) is not involved. Robert's wife died 2 years ago. He has $900,000 in personal 
retirement accounts and wants to retire in 3 years. His goals: transfer business to James, treat 
both children fairly, minimize taxes, and ensure retirement security. He recently had a health scare.
      `,
      questionRefs: [
        'CFP-EST-023', 'CFP-TAX-031', 'CFP-RET-041', 'CFP-EST-042',
        'CFP-RISK-020', 'CFP-PRO-015'
      ]
    }
  ],
  
  // Standalone questions by domain (remaining after item sets)
  standaloneQuestionRefs: [
    // RET questions (32 - 6 in item sets = 26 standalone)
    'CFP-RET-002', 'CFP-RET-003', 'CFP-RET-004', 'CFP-RET-005', 'CFP-RET-006',
    'CFP-RET-007', 'CFP-RET-008', 'CFP-RET-009', 'CFP-RET-010', 'CFP-RET-011',
    'CFP-RET-012', 'CFP-RET-013', 'CFP-RET-014', 'CFP-RET-016', 'CFP-RET-017',
    'CFP-RET-018', 'CFP-RET-019', 'CFP-RET-020', 'CFP-RET-021', 'CFP-RET-022',
    'CFP-RET-023', 'CFP-RET-024', 'CFP-RET-025', 'CFP-RET-026', 'CFP-RET-027',
    'CFP-RET-029',
    
    // GEN questions (31 standalone)
    'CFP-GEN-001', 'CFP-GEN-002', 'CFP-GEN-003', 'CFP-GEN-004', 'CFP-GEN-005',
    'CFP-GEN-006', 'CFP-GEN-007', 'CFP-GEN-008', 'CFP-GEN-009', 'CFP-GEN-010',
    'CFP-GEN-011', 'CFP-GEN-012', 'CFP-GEN-013', 'CFP-GEN-014', 'CFP-GEN-015',
    'CFP-GEN-016', 'CFP-GEN-017', 'CFP-GEN-019', 'CFP-GEN-020', 'CFP-GEN-021',
    'CFP-GEN-022', 'CFP-GEN-023', 'CFP-GEN-024', 'CFP-GEN-025',
    
    // PRO questions (26 - 2 in item sets = 24 standalone)
    'CFP-PRO-001', 'CFP-PRO-002', 'CFP-PRO-003', 'CFP-PRO-004', 'CFP-PRO-005',
    'CFP-PRO-006', 'CFP-PRO-007', 'CFP-PRO-008', 'CFP-PRO-010', 'CFP-PRO-011',
    'CFP-PRO-012', 'CFP-PRO-013', 'CFP-PRO-014', 'CFP-PRO-016', 'CFP-PRO-017',
    'CFP-PRO-018', 'CFP-PRO-019', 'CFP-PRO-020', 'CFP-PRO-021', 'CFP-PRO-022',
    'CFP-PRO-023', 'CFP-PRO-024', 'CFP-PRO-025',
    
    // TAX questions (24 - 4 in item sets = 20 standalone)
    'CFP-TAX-001', 'CFP-TAX-002', 'CFP-TAX-003', 'CFP-TAX-004', 'CFP-TAX-005',
    'CFP-TAX-006', 'CFP-TAX-007', 'CFP-TAX-008', 'CFP-TAX-009', 'CFP-TAX-010',
    'CFP-TAX-011', 'CFP-TAX-012', 'CFP-TAX-013', 'CFP-TAX-014', 'CFP-TAX-015',
    'CFP-TAX-016', 'CFP-TAX-017', 'CFP-TAX-018', 'CFP-TAX-020',
    
    // EST questions (20 - 4 in item sets = 16 standalone)
    'CFP-EST-001', 'CFP-EST-002', 'CFP-EST-003', 'CFP-EST-004', 'CFP-EST-005',
    'CFP-EST-006', 'CFP-EST-007', 'CFP-EST-009', 'CFP-EST-010', 'CFP-EST-011',
    'CFP-EST-012', 'CFP-EST-013', 'CFP-EST-014', 'CFP-EST-015', 'CFP-EST-016',
    
    // RISK questions (20 - 2 in item sets = 18 standalone)
    'CFP-RISK-001', 'CFP-RISK-002', 'CFP-RISK-003', 'CFP-RISK-004', 'CFP-RISK-005',
    'CFP-RISK-006', 'CFP-RISK-007', 'CFP-RISK-008', 'CFP-RISK-009', 'CFP-RISK-010',
    'CFP-RISK-011', 'CFP-RISK-013', 'CFP-RISK-014', 'CFP-RISK-015', 'CFP-RISK-016',
    'CFP-RISK-017', 'CFP-RISK-018', 'CFP-RISK-019',
    
    // INV questions (29 standalone)
    'CFP-INV-001', 'CFP-INV-002', 'CFP-INV-003', 'CFP-INV-004', 'CFP-INV-005',
    'CFP-INV-006', 'CFP-INV-007', 'CFP-INV-008', 'CFP-INV-009', 'CFP-INV-010',
    'CFP-INV-011', 'CFP-INV-012', 'CFP-INV-013', 'CFP-INV-014', 'CFP-INV-015',
    'CFP-INV-016', 'CFP-INV-017', 'CFP-INV-018', 'CFP-INV-019', 'CFP-INV-020',
    'CFP-INV-021', 'CFP-INV-022', 'CFP-INV-023', 'CFP-INV-024', 'CFP-INV-025',
    'CFP-INV-026', 'CFP-INV-027', 'CFP-INV-028', 'CFP-INV-029',
    
    // PSY questions (12 standalone)
    'CFP-PSY-001', 'CFP-PSY-002', 'CFP-PSY-003', 'CFP-PSY-004', 'CFP-PSY-005',
    'CFP-PSY-006', 'CFP-PSY-007', 'CFP-PSY-008', 'CFP-PSY-009', 'CFP-PSY-010',
    'CFP-PSY-011', 'CFP-PSY-012'
  ],
  
  description: `
This practice exam simulates the CFP® certification examination with 170 questions 
across all eight principal knowledge domains. The exam includes 3 item sets (mini case 
studies) with 6 questions each, plus standalone questions. Time limit is 3 hours.

**Domain Coverage (2024+ Blueprint):**
- Retirement Planning: 31 questions (18%)
- Investment Planning: 29 questions (17%)
- General Principles: 26 questions (15%)
- Tax Planning: 24 questions (14%)
- Risk Management: 19 questions (11%)
- Estate Planning: 17 questions (10%)
- Professional Conduct: 14 questions (8%)
- Psychology: 12 questions (7%)

A score of 70% or higher indicates exam readiness.
`,
  lastUpdated: '2026-02-07',
  releaseDate: '2026-02-07'
};

/**
 * Mini Mock Exam (50 questions, 1 hour) - For focused practice
 */
export const CFP_MINI_MOCK: MockExam = {
  id: 'CFP-MINI-001',
  title: 'CFP Mini Mock: Quick Assessment',
  courseId: 'cfp',
  version: '2026.1',
  difficulty: 'medium',
  totalQuestions: 50,
  timeLimit: 60, // 1 hour
  passingScore: 70,
  
  domainDistribution: [
    { domain: 'RET', weight: 18, questionCount: 9 },
    { domain: 'INV', weight: 17, questionCount: 9 },
    { domain: 'GEN', weight: 15, questionCount: 8 },
    { domain: 'TAX', weight: 14, questionCount: 7 },
    { domain: 'RIS', weight: 11, questionCount: 5 },
    { domain: 'EST', weight: 10, questionCount: 5 },
    { domain: 'PRO', weight: 8, questionCount: 4 },
    { domain: 'PSY', weight: 7, questionCount: 3 },
  ],
  
  itemSetCount: 1,
  itemSets: [
    {
      id: 'CFP-MINI-001-IS-1',
      title: 'The Nakamura Retirement',
      scenario: `
Ken Nakamura (59) wants to retire at 62. He has $1.2 million in his 401(k) and his wife 
Yuki (57) has $400,000 in her IRA. They own their home free and clear ($525,000 value). 
Ken's Social Security benefit at 62 is $2,100/month; at 67 it's $3,100/month. Yuki can 
claim spousal benefits. They estimate needing $7,000/month in retirement.
      `,
      questionRefs: [
        'CFP-RET-030', 'CFP-RET-035', 'CFP-TAX-025', 'CFP-EST-018'
      ]
    }
  ],
  
  standaloneQuestionRefs: [
    // Curated 46 standalone questions + PSY
    'CFP-RET-031', 'CFP-RET-032', 'CFP-RET-033', 'CFP-RET-036', 'CFP-RET-037',
    'CFP-GEN-001', 'CFP-GEN-003', 'CFP-GEN-005', 'CFP-GEN-007', 'CFP-GEN-009',
    'CFP-GEN-011', 'CFP-GEN-015',
    'CFP-INV-001', 'CFP-INV-005', 'CFP-INV-009', 'CFP-INV-013', 'CFP-INV-017',
    'CFP-INV-021', 'CFP-INV-025', 'CFP-INV-029',
    'CFP-TAX-001', 'CFP-TAX-005', 'CFP-TAX-009', 'CFP-TAX-015',
    'CFP-RIS-001', 'CFP-RIS-005', 'CFP-RIS-009', 'CFP-RIS-013',
    'CFP-EST-001', 'CFP-EST-005', 'CFP-EST-011',
    'CFP-PRO-001', 'CFP-PRO-005', 'CFP-PRO-011',
    'CFP-PSY-001', 'CFP-PSY-009', 'CFP-PSY-019'
  ],
  
  description: `
Quick 50-question assessment covering all 8 CFP domains proportionally.
Great for identifying weak areas before full practice exams.
Target time: 1 hour. Includes Psychology and behavioral finance questions.
`,
  lastUpdated: '2026-02-07',
  releaseDate: '2026-02-07'
};

/**
 * Mock Exam #2 - Advanced Application
 * Uses questions from 046-075 range for variety
 */
export const CFP_MOCK_EXAM_2: MockExam = {
  id: 'CFP-MOCK-002',
  title: 'CFP Practice Exam 2: Advanced Application',
  courseId: 'cfp',
  version: '2026.1',
  difficulty: 'hard',
  totalQuestions: 170,
  timeLimit: 180, // 3 hours
  passingScore: 70,
  
  domainDistribution: [
    { domain: 'RET', weight: 18, questionCount: 31 },
    { domain: 'INV', weight: 17, questionCount: 29 },
    { domain: 'GEN', weight: 15, questionCount: 26 },
    { domain: 'TAX', weight: 14, questionCount: 24 },
    { domain: 'RIS', weight: 11, questionCount: 19 },
    { domain: 'EST', weight: 10, questionCount: 17 },
    { domain: 'PRO', weight: 8, questionCount: 14 },
    { domain: 'PSY', weight: 7, questionCount: 12 },
  ],
  
  itemSetCount: 3,
  itemSets: [
    {
      id: 'CFP-MOCK-002-IS-1',
      title: 'The Anderson Blended Family',
      scenario: `
Michael Anderson (52) recently remarried to Sophia (48). Michael has two children from 
his first marriage (ages 22 and 19) and Sophia has one child (age 16). Michael earns 
$275,000 as a marketing VP; Sophia owns a boutique earning $120,000. Combined they have 
$1.4 million in retirement accounts, a home worth $850,000 (mortgage $320,000), and 
Michael pays $4,200/month in alimony to his ex-wife (tax-deductible, pre-2019 agreement).
Both want to protect their biological children's inheritance while providing for each 
other. Sophia's business partner might want to buy out her share in 5 years.
      `,
      questionRefs: [
        'CFP-RET-046', 'CFP-EST-046', 'CFP-EST-049', 'CFP-TAX-052',
        'CFP-RISK-047', 'CFP-PRO-046'
      ]
    },
    {
      id: 'CFP-MOCK-002-IS-2',
      title: 'Tech Startup Wealth',
      scenario: `
Jennifer Liu (38) is CTO at a successful tech startup that recently received Series C 
funding at a $500M valuation. She holds 1.2% equity (pre-dilution) through ISOs exercised 
3 years ago at $2/share. Current FMV is approximately $45/share. She earns $320,000 base 
plus potential bonuses. Her other assets: $380,000 in 401(k), $150,000 in taxable accounts,
$200,000 emergency fund. She is single with no children but supports her elderly parents.
The company may IPO or be acquired within 18-24 months. She wants to diversify but is 
worried about taxes and triggering AMT implications.
      `,
      questionRefs: [
        'CFP-TAX-071', 'CFP-INV-071', 'CFP-RET-056', 'CFP-GEN-047',
        'CFP-EST-059', 'CFP-PRO-055'
      ]
    },
    {
      id: 'CFP-MOCK-002-IS-3',
      title: 'Early Retirement with Real Estate',
      scenario: `
Daniel and Maria Gonzalez (both 45) want to retire at 55 using FIRE principles. Daniel 
is a dentist earning $350,000; Maria is a part-time teacher making $45,000. They own their 
home ($600,000, no mortgage), 4 rental properties ($1.8M total value, $600,000 mortgages), 
and have $1.2M in retirement accounts. Rental income is $6,500/month after expenses.
They spend $140,000/year and want to maintain lifestyle in retirement. They're concerned 
about healthcare before Medicare and passive income sustainability. They also want to 
help their two children (8 and 11) with college and eventual home purchases.
      `,
      questionRefs: [
        'CFP-RET-051', 'CFP-TAX-047', 'CFP-RISK-064', 'CFP-INV-056',
        'CFP-GEN-061', 'CFP-EST-051'
      ]
    }
  ],
  
  standaloneQuestionRefs: [
    // RET questions (32 - 4 in item sets = 28 standalone)
    'CFP-RET-047', 'CFP-RET-048', 'CFP-RET-049', 'CFP-RET-050', 'CFP-RET-052',
    'CFP-RET-053', 'CFP-RET-054', 'CFP-RET-055', 'CFP-RET-057', 'CFP-RET-058',
    'CFP-RET-059', 'CFP-RET-060', 'CFP-RET-061', 'CFP-RET-062', 'CFP-RET-063',
    'CFP-RET-064', 'CFP-RET-065', 'CFP-RET-066', 'CFP-RET-067', 'CFP-RET-068',
    'CFP-RET-069', 'CFP-RET-070', 'CFP-RET-071', 'CFP-RET-072', 'CFP-RET-073',
    'CFP-RET-074', 'CFP-RET-075', 'CFP-RET-029',
    
    // GEN questions (31 standalone - mix of old and new)
    'CFP-GEN-046', 'CFP-GEN-048', 'CFP-GEN-049', 'CFP-GEN-050', 'CFP-GEN-051',
    'CFP-GEN-052', 'CFP-GEN-053', 'CFP-GEN-054', 'CFP-GEN-055', 'CFP-GEN-056',
    'CFP-GEN-057', 'CFP-GEN-058', 'CFP-GEN-059', 'CFP-GEN-060', 'CFP-GEN-062',
    'CFP-GEN-063', 'CFP-GEN-064', 'CFP-GEN-065', 'CFP-GEN-066', 'CFP-GEN-067',
    'CFP-GEN-068', 'CFP-GEN-069', 'CFP-GEN-070', 'CFP-GEN-071', 'CFP-GEN-072',
    'CFP-GEN-073', 'CFP-GEN-074', 'CFP-GEN-075', 'CFP-GEN-026', 'CFP-GEN-027',
    'CFP-GEN-028',
    
    // PRO questions (26 - 2 in item sets = 24 standalone)
    'CFP-PRO-047', 'CFP-PRO-048', 'CFP-PRO-049', 'CFP-PRO-050', 'CFP-PRO-051',
    'CFP-PRO-052', 'CFP-PRO-053', 'CFP-PRO-054', 'CFP-PRO-056', 'CFP-PRO-057',
    'CFP-PRO-058', 'CFP-PRO-059', 'CFP-PRO-060', 'CFP-PRO-061', 'CFP-PRO-062',
    'CFP-PRO-063', 'CFP-PRO-064', 'CFP-PRO-065', 'CFP-PRO-066', 'CFP-PRO-067',
    'CFP-PRO-068', 'CFP-PRO-069', 'CFP-PRO-070', 'CFP-PRO-071',
    
    // TAX questions (24 - 3 in item sets = 21 standalone)
    'CFP-TAX-046', 'CFP-TAX-048', 'CFP-TAX-049', 'CFP-TAX-050', 'CFP-TAX-051',
    'CFP-TAX-053', 'CFP-TAX-054', 'CFP-TAX-055', 'CFP-TAX-056', 'CFP-TAX-057',
    'CFP-TAX-058', 'CFP-TAX-059', 'CFP-TAX-060', 'CFP-TAX-061', 'CFP-TAX-062',
    'CFP-TAX-063', 'CFP-TAX-064', 'CFP-TAX-065', 'CFP-TAX-066', 'CFP-TAX-067',
    'CFP-TAX-068',
    
    // EST questions (20 - 4 in item sets = 16 standalone)
    'CFP-EST-047', 'CFP-EST-048', 'CFP-EST-050', 'CFP-EST-052', 'CFP-EST-053',
    'CFP-EST-054', 'CFP-EST-055', 'CFP-EST-056', 'CFP-EST-057', 'CFP-EST-058',
    'CFP-EST-060', 'CFP-EST-061', 'CFP-EST-062', 'CFP-EST-063', 'CFP-EST-064',
    'CFP-EST-065',
    
    // RISK questions (20 - 2 in item sets = 18 standalone)
    'CFP-RISK-046', 'CFP-RISK-048', 'CFP-RISK-049', 'CFP-RISK-050', 'CFP-RISK-051',
    'CFP-RISK-052', 'CFP-RISK-053', 'CFP-RISK-054', 'CFP-RISK-055', 'CFP-RISK-056',
    'CFP-RISK-057', 'CFP-RISK-058', 'CFP-RISK-059', 'CFP-RISK-060', 'CFP-RISK-061',
    'CFP-RISK-062', 'CFP-RISK-063', 'CFP-RISK-065',
    
    // INV questions (29 - 2 in item sets = 27 standalone)
    'CFP-INV-046', 'CFP-INV-047', 'CFP-INV-048', 'CFP-INV-049', 'CFP-INV-050',
    'CFP-INV-051', 'CFP-INV-052', 'CFP-INV-053', 'CFP-INV-054', 'CFP-INV-055',
    'CFP-INV-057', 'CFP-INV-058', 'CFP-INV-059', 'CFP-INV-060', 'CFP-INV-061',
    'CFP-INV-062', 'CFP-INV-063', 'CFP-INV-064', 'CFP-INV-065', 'CFP-INV-066',
    'CFP-INV-067', 'CFP-INV-068', 'CFP-INV-069', 'CFP-INV-070', 'CFP-INV-072',
    'CFP-INV-073', 'CFP-INV-074',
    
    // PSY questions (12 standalone)
    'CFP-PSY-013', 'CFP-PSY-014', 'CFP-PSY-015', 'CFP-PSY-016', 'CFP-PSY-017',
    'CFP-PSY-018', 'CFP-PSY-019', 'CFP-PSY-020', 'CFP-PSY-021', 'CFP-PSY-022',
    'CFP-PSY-023', 'CFP-PSY-024'
  ],
  
  description: `
This advanced practice exam focuses on complex, multi-faceted scenarios requiring 
integration of knowledge across all 8 domains. Uses primarily questions from the 046-075 
range featuring harder calculations and nuanced analysis.

**Highlights:**
- Blended family estate planning
- Concentrated stock positions and equity compensation
- FIRE (Financial Independence, Retire Early) strategies
- Real estate investment tax implications
- Behavioral finance and client communication

**Domain Coverage (2024+ Blueprint):**
- Retirement Planning: 31 questions (18%)
- Investment Planning: 29 questions (17%)
- General Principles: 26 questions (15%)
- Tax Planning: 24 questions (14%)
- Risk Management: 19 questions (11%)
- Estate Planning: 17 questions (10%)
- Professional Conduct: 14 questions (8%)
- Psychology: 12 questions (7%)

Recommended after completing Practice Exam 1. A score of 70% or higher indicates 
strong exam readiness.
`,
  lastUpdated: '2026-02-07',
  releaseDate: '2026-02-07'
};

// Export all mock exams
export const CFP_MOCK_EXAMS: MockExam[] = [
  CFP_MOCK_EXAM_1,
  CFP_MOCK_EXAM_2,
  CFP_MINI_MOCK
];

export default CFP_MOCK_EXAMS;
