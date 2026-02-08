// Curated Mock Exams - World Class CPA Exam Simulations
// Each mock exam is carefully designed to mirror actual AICPA exam structure
// with proper blueprint coverage and difficulty distribution

import { ExamSection, Question, TBS } from '../../../types';
import { getQuestionsBySection } from '../questions';
import { getTBSBySection } from '../tbs';

export interface MockExamConfig {
  id: string;
  name: string;
  description: string;
  section: ExamSection;
  version: '2025' | '2026' | 'both'; // Blueprint version
  testlets: MockExamTestlet[];
  totalTime: number; // in seconds
  passingScore: number;
  blueprintWeights: BlueprintWeight[];
}

export interface MockExamTestlet {
  id: string;
  type: 'mcq' | 'tbs';
  name: string;
  questionCount: number;
  timeAllocation: number; // in seconds
  // Specific question/TBS IDs for curated exams
  questionIds?: string[];
  tbsIds?: string[];
  // Or criteria for dynamic selection
  criteria?: {
    blueprintAreas?: string[];
    difficulty?: ('easy' | 'medium' | 'hard')[];
    topics?: string[];
  };
}

export interface BlueprintWeight {
  area: string;
  name: string;
  weight: number; // percentage (0-100)
  questionCount: number;
}

// Blueprint weights from AICPA (2025/2026)
export const BLUEPRINT_WEIGHTS: Record<ExamSection, BlueprintWeight[]> = {
  FAR: [
    { area: 'FAR-I', name: 'Conceptual Framework, Standards, and Regulation', weight: 25, questionCount: 17 },
    { area: 'FAR-II', name: 'Select Financial Statement Accounts', weight: 30, questionCount: 20 },
    { area: 'FAR-III', name: 'Select Transactions', weight: 25, questionCount: 17 },
    { area: 'FAR-IV', name: 'State and Local Governments', weight: 10, questionCount: 6 },
    { area: 'FAR-V', name: 'Not-for-Profit Entities', weight: 10, questionCount: 6 },
  ],
  AUD: [
    { area: 'AUD-I', name: 'Ethics, Independence, and Professional Conduct', weight: 15, questionCount: 11 },
    { area: 'AUD-II', name: 'Assessing Risk and Developing a Planned Response', weight: 25, questionCount: 18 },
    { area: 'AUD-III', name: 'Performing Further Procedures and Obtaining Evidence', weight: 30, questionCount: 22 },
    { area: 'AUD-IV', name: 'Forming Conclusions and Reporting', weight: 20, questionCount: 14 },
    { area: 'AUD-V', name: 'Accounting and Review Services', weight: 10, questionCount: 7 },
  ],
  REG: [
    { area: 'REG-I', name: 'Ethics, Professional Responsibilities, and Federal Tax Procedures', weight: 10, questionCount: 7 },
    { area: 'REG-II', name: 'Business Law', weight: 15, questionCount: 11 },
    { area: 'REG-III', name: 'Federal Taxation of Property Transactions', weight: 12, questionCount: 9 },
    { area: 'REG-IV', name: 'Federal Taxation of Individuals', weight: 22, questionCount: 16 },
    { area: 'REG-V', name: 'Federal Taxation of Entities', weight: 28, questionCount: 20 },
    { area: 'REG-VI', name: 'Federal Taxation of Property', weight: 13, questionCount: 9 },
  ],
  BAR: [
    { area: 'BAR-I', name: 'Business Analysis', weight: 35, questionCount: 23 },
    { area: 'BAR-II', name: 'Technical Accounting and Reporting', weight: 40, questionCount: 26 },
    { area: 'BAR-III', name: 'State and Local Government Concepts', weight: 15, questionCount: 10 },
    { area: 'BAR-IV', name: 'Not-for-Profit Concepts', weight: 10, questionCount: 7 },
  ],
  ISC: [
    { area: 'ISC-I', name: 'Information Systems and Data Management', weight: 35, questionCount: 25 },
    { area: 'ISC-II', name: 'Security, Confidentiality, and Privacy', weight: 35, questionCount: 25 },
    { area: 'ISC-III', name: 'Considerations for System and Organization Controls (SOC) Engagements', weight: 30, questionCount: 22 },
  ],
  TCP: [
    { area: 'TCP-I', name: 'Tax Compliance and Planning for Individuals and Personal Financial Planning', weight: 30, questionCount: 22 },
    { area: 'TCP-II', name: 'Entity Tax Compliance', weight: 30, questionCount: 22 },
    { area: 'TCP-III', name: 'Entity Tax Planning', weight: 20, questionCount: 14 },
    { area: 'TCP-IV', name: 'Property Transactions - Loss and Deferral', weight: 10, questionCount: 7 },
    { area: 'TCP-V', name: 'Wealth Transfer and Estate Planning', weight: 10, questionCount: 7 },
  ],
  BEC: [], // Deprecated
  PREP: [],
};

// FAR Mock Exams
export const FAR_MOCK_EXAMS: MockExamConfig[] = [
  {
    id: 'far-mock-1',
    name: 'FAR Mock Exam 1 - Foundation',
    description: 'Comprehensive exam covering core FAR concepts with emphasis on financial statement preparation and conceptual framework.',
    section: 'FAR',
    version: 'both',
    totalTime: 4 * 60 * 60, // 4 hours
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.FAR,
    testlets: [
      {
        id: 'far-mock-1-mcq-1',
        type: 'mcq',
        name: 'MCQ Testlet 1',
        questionCount: 33,
        timeAllocation: 50 * 60,
        criteria: {
          blueprintAreas: ['FAR-I', 'FAR-II'],
          difficulty: ['easy', 'medium'],
        },
      },
      {
        id: 'far-mock-1-mcq-2',
        type: 'mcq',
        name: 'MCQ Testlet 2',
        questionCount: 33,
        timeAllocation: 50 * 60,
        criteria: {
          blueprintAreas: ['FAR-III', 'FAR-IV', 'FAR-V'],
          difficulty: ['medium', 'hard'],
        },
      },
      {
        id: 'far-mock-1-tbs-1',
        type: 'tbs',
        name: 'TBS Testlet 1',
        questionCount: 4,
        timeAllocation: 60 * 60,
        tbsIds: ['far-tbs-001', 'far-tbs-002', 'far-tbs-003', 'far-tbs-004'],
      },
      {
        id: 'far-mock-1-tbs-2',
        type: 'tbs',
        name: 'TBS Testlet 2',
        questionCount: 4,
        timeAllocation: 60 * 60,
        tbsIds: ['far-tbs-005', 'far-tbs-006', 'far-tbs-007', 'far-tbs-008'],
      },
    ],
  },
  {
    id: 'far-mock-2',
    name: 'FAR Mock Exam 2 - Advanced',
    description: 'Advanced exam focusing on complex transactions, government accounting, and not-for-profit entities.',
    section: 'FAR',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.FAR,
    testlets: [
      {
        id: 'far-mock-2-mcq-1',
        type: 'mcq',
        name: 'MCQ Testlet 1',
        questionCount: 33,
        timeAllocation: 50 * 60,
        criteria: {
          blueprintAreas: ['FAR-II', 'FAR-III'],
          difficulty: ['medium'],
        },
      },
      {
        id: 'far-mock-2-mcq-2',
        type: 'mcq',
        name: 'MCQ Testlet 2',
        questionCount: 33,
        timeAllocation: 50 * 60,
        criteria: {
          blueprintAreas: ['FAR-IV', 'FAR-V', 'FAR-VI', 'FAR-VII'],
          difficulty: ['medium', 'hard'],
        },
      },
      {
        id: 'far-mock-2-tbs-1',
        type: 'tbs',
        name: 'TBS Testlet 1',
        questionCount: 4,
        timeAllocation: 60 * 60,
        tbsIds: ['far-tbs-009', 'far-tbs-010', 'far-tbs-011', 'far-tbs-012'],
      },
      {
        id: 'far-mock-2-tbs-2',
        type: 'tbs',
        name: 'TBS Testlet 2',
        questionCount: 4,
        timeAllocation: 60 * 60,
        tbsIds: ['far-tbs-013', 'far-tbs-014', 'far-tbs-002', 'far-tbs-005'],
      },
    ],
  },
  {
    id: 'far-mock-3',
    name: 'FAR Mock Exam 3 - Final Review',
    description: 'Comprehensive final review covering all FAR blueprint areas with exam-level difficulty.',
    section: 'FAR',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.FAR,
    testlets: [
      {
        id: 'far-mock-3-mcq-1',
        type: 'mcq',
        name: 'MCQ Testlet 1',
        questionCount: 33,
        timeAllocation: 50 * 60,
        criteria: {
          difficulty: ['easy', 'medium', 'hard'],
        },
      },
      {
        id: 'far-mock-3-mcq-2',
        type: 'mcq',
        name: 'MCQ Testlet 2',
        questionCount: 33,
        timeAllocation: 50 * 60,
        criteria: {
          difficulty: ['medium', 'hard'],
        },
      },
      {
        id: 'far-mock-3-tbs-1',
        type: 'tbs',
        name: 'TBS Testlet 1',
        questionCount: 4,
        timeAllocation: 60 * 60,
      },
      {
        id: 'far-mock-3-tbs-2',
        type: 'tbs',
        name: 'TBS Testlet 2',
        questionCount: 4,
        timeAllocation: 60 * 60,
      },
    ],
  },
];

// AUD Mock Exams
export const AUD_MOCK_EXAMS: MockExamConfig[] = [
  {
    id: 'aud-mock-1',
    name: 'AUD Mock Exam 1 - Foundation',
    description: 'Core auditing concepts covering ethics, risk assessment, and evidence gathering.',
    section: 'AUD',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.AUD,
    testlets: [
      { id: 'aud-mock-1-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['AUD-I', 'AUD-II'], difficulty: ['easy', 'medium'] }},
      { id: 'aud-mock-1-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['AUD-III', 'AUD-IV', 'AUD-V'], difficulty: ['medium', 'hard'] }},
      { id: 'aud-mock-1-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60,
        tbsIds: ['aud-tbs-001', 'aud-tbs-002', 'aud-tbs-003', 'aud-tbs-004'] },
      { id: 'aud-mock-1-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60,
        tbsIds: ['aud-tbs-005', 'aud-tbs-006', 'aud-tbs-007', 'aud-tbs-008'] },
    ],
  },
  {
    id: 'aud-mock-2',
    name: 'AUD Mock Exam 2 - Advanced',
    description: 'Advanced auditing with focus on complex audit procedures and reporting.',
    section: 'AUD',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.AUD,
    testlets: [
      { id: 'aud-mock-2-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { difficulty: ['medium'] }},
      { id: 'aud-mock-2-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { difficulty: ['medium', 'hard'] }},
      { id: 'aud-mock-2-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60 },
      { id: 'aud-mock-2-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60 },
    ],
  },
  {
    id: 'aud-mock-3',
    name: 'AUD Mock Exam 3 - Final Review',
    description: 'Comprehensive final review covering all AUD blueprint areas.',
    section: 'AUD',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.AUD,
    testlets: [
      { id: 'aud-mock-3-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'aud-mock-3-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'aud-mock-3-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60 },
      { id: 'aud-mock-3-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60 },
    ],
  },
];

// REG Mock Exams
export const REG_MOCK_EXAMS: MockExamConfig[] = [
  {
    id: 'reg-mock-1-2025',
    name: 'REG Mock Exam 1 (2025 Blueprint)',
    description: 'Tax law as of 2025 Blueprint: $10K SALT cap, 20% QBI, 40% bonus depreciation.',
    section: 'REG',
    version: '2025',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.REG,
    testlets: [
      { id: 'reg-mock-1-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['REG-I', 'REG-II', 'REG-III'], difficulty: ['easy', 'medium'] }},
      { id: 'reg-mock-1-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['REG-IV', 'REG-V', 'REG-VI'], difficulty: ['medium', 'hard'] }},
      { id: 'reg-mock-1-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60,
        tbsIds: ['reg-tbs-001', 'reg-tbs-002', 'reg-tbs-003', 'reg-tbs-004'] },
      { id: 'reg-mock-1-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60,
        tbsIds: ['reg-tbs-005', 'reg-tbs-006', 'reg-tbs-007', 'reg-tbs-008'] },
    ],
  },
  {
    id: 'reg-mock-2-2026',
    name: 'REG Mock Exam 2 (2026 Blueprint)',
    description: 'Tax law with H.R. 1 provisions: $40K SALT cap, 23% QBI, 100% bonus depreciation.',
    section: 'REG',
    version: '2026',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.REG,
    testlets: [
      { id: 'reg-mock-2-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { difficulty: ['medium'] }},
      { id: 'reg-mock-2-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { difficulty: ['medium', 'hard'] }},
      { id: 'reg-mock-2-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60 },
      { id: 'reg-mock-2-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60 },
    ],
  },
  {
    id: 'reg-mock-3',
    name: 'REG Mock Exam 3 - Final Review',
    description: 'Comprehensive REG review covering ethics, business law, and all taxation areas.',
    section: 'REG',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.REG,
    testlets: [
      { id: 'reg-mock-3-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'reg-mock-3-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'reg-mock-3-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60 },
      { id: 'reg-mock-3-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60 },
    ],
  },
];

// BAR Mock Exams (Discipline)
export const BAR_MOCK_EXAMS: MockExamConfig[] = [
  {
    id: 'bar-mock-1',
    name: 'BAR Mock Exam 1 - Foundation',
    description: 'Business analysis, data analytics, and technical accounting fundamentals.',
    section: 'BAR',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.BAR,
    testlets: [
      { id: 'bar-mock-1-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 33, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['BAR-I', 'BAR-II'], difficulty: ['easy', 'medium'] }},
      { id: 'bar-mock-1-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 33, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['BAR-II', 'BAR-III', 'BAR-IV'], difficulty: ['medium', 'hard'] }},
      { id: 'bar-mock-1-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 70 * 60,
        tbsIds: ['bar-tbs-001', 'bar-tbs-002', 'bar-tbs-003', 'bar-tbs-004'] },
      { id: 'bar-mock-1-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 70 * 60,
        tbsIds: ['bar-tbs-005', 'bar-tbs-006', 'bar-tbs-007', 'bar-tbs-008'] },
    ],
  },
  {
    id: 'bar-mock-2',
    name: 'BAR Mock Exam 2 - Advanced',
    description: 'Advanced business combinations, IFRS differences, and financial analysis.',
    section: 'BAR',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.BAR,
    testlets: [
      { id: 'bar-mock-2-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 33, timeAllocation: 45 * 60 },
      { id: 'bar-mock-2-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 33, timeAllocation: 45 * 60 },
      { id: 'bar-mock-2-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 70 * 60 },
      { id: 'bar-mock-2-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 70 * 60 },
    ],
  },
  {
    id: 'bar-mock-3',
    name: 'BAR Mock Exam 3 - Final Review',
    description: 'Comprehensive BAR review with exam-level difficulty.',
    section: 'BAR',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.BAR,
    testlets: [
      { id: 'bar-mock-3-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 33, timeAllocation: 45 * 60 },
      { id: 'bar-mock-3-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 33, timeAllocation: 45 * 60 },
      { id: 'bar-mock-3-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 70 * 60 },
      { id: 'bar-mock-3-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 70 * 60 },
    ],
  },
];

// ISC Mock Exams (Discipline)
export const ISC_MOCK_EXAMS: MockExamConfig[] = [
  {
    id: 'isc-mock-1',
    name: 'ISC Mock Exam 1 - Foundation',
    description: 'IT governance, information security, and data management fundamentals.',
    section: 'ISC',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.ISC,
    testlets: [
      { id: 'isc-mock-1-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['ISC-I', 'ISC-II'], difficulty: ['easy', 'medium'] }},
      { id: 'isc-mock-1-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['ISC-II', 'ISC-III'], difficulty: ['medium', 'hard'] }},
      { id: 'isc-mock-1-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60,
        tbsIds: ['isc-tbs-001', 'isc-tbs-002', 'isc-tbs-003', 'isc-tbs-004'] },
      { id: 'isc-mock-1-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60,
        tbsIds: ['isc-tbs-005', 'isc-tbs-006', 'isc-tbs-007', 'isc-tbs-008'] },
    ],
  },
  {
    id: 'isc-mock-2',
    name: 'ISC Mock Exam 2 - Advanced',
    description: 'Advanced SOC engagements, cybersecurity, and system controls.',
    section: 'ISC',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.ISC,
    testlets: [
      { id: 'isc-mock-2-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'isc-mock-2-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'isc-mock-2-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60 },
      { id: 'isc-mock-2-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60 },
    ],
  },
  {
    id: 'isc-mock-3',
    name: 'ISC Mock Exam 3 - Final Review',
    description: 'Comprehensive ISC review with exam-level difficulty.',
    section: 'ISC',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.ISC,
    testlets: [
      { id: 'isc-mock-3-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'isc-mock-3-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'isc-mock-3-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60 },
      { id: 'isc-mock-3-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60 },
    ],
  },
];

// TCP Mock Exams (Discipline)
export const TCP_MOCK_EXAMS: MockExamConfig[] = [
  {
    id: 'tcp-mock-1-2025',
    name: 'TCP Mock Exam 1 (2025 Blueprint)',
    description: 'Tax compliance and planning with 2025 tax law provisions.',
    section: 'TCP',
    version: '2025',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.TCP,
    testlets: [
      { id: 'tcp-mock-1-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['TCP-I', 'TCP-II'], difficulty: ['easy', 'medium'] }},
      { id: 'tcp-mock-1-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60,
        criteria: { blueprintAreas: ['TCP-III', 'TCP-IV', 'TCP-V'], difficulty: ['medium', 'hard'] }},
      { id: 'tcp-mock-1-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60,
        tbsIds: ['tcp-tbs-001', 'tcp-tbs-002', 'tcp-tbs-003', 'tcp-tbs-004'] },
      { id: 'tcp-mock-1-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60,
        tbsIds: ['tcp-tbs-005', 'tcp-tbs-006', 'tcp-tbs-007', 'tcp-tbs-008'] },
    ],
  },
  {
    id: 'tcp-mock-2-2026',
    name: 'TCP Mock Exam 2 (2026 Blueprint)',
    description: 'Tax planning with H.R. 1 provisions (OBBBA changes).',
    section: 'TCP',
    version: '2026',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.TCP,
    testlets: [
      { id: 'tcp-mock-2-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'tcp-mock-2-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'tcp-mock-2-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60 },
      { id: 'tcp-mock-2-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60 },
    ],
  },
  {
    id: 'tcp-mock-3',
    name: 'TCP Mock Exam 3 - Final Review',
    description: 'Comprehensive TCP review covering all blueprint areas.',
    section: 'TCP',
    version: 'both',
    totalTime: 4 * 60 * 60,
    passingScore: 75,
    blueprintWeights: BLUEPRINT_WEIGHTS.TCP,
    testlets: [
      { id: 'tcp-mock-3-mcq-1', type: 'mcq', name: 'MCQ Testlet 1', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'tcp-mock-3-mcq-2', type: 'mcq', name: 'MCQ Testlet 2', questionCount: 36, timeAllocation: 45 * 60 },
      { id: 'tcp-mock-3-tbs-1', type: 'tbs', name: 'TBS Testlet 1', questionCount: 4, timeAllocation: 60 * 60 },
      { id: 'tcp-mock-3-tbs-2', type: 'tbs', name: 'TBS Testlet 2', questionCount: 4, timeAllocation: 60 * 60 },
    ],
  },
];

// All Mock Exams
export const ALL_MOCK_EXAMS: Record<ExamSection, MockExamConfig[]> = {
  FAR: FAR_MOCK_EXAMS,
  AUD: AUD_MOCK_EXAMS,
  REG: REG_MOCK_EXAMS,
  BAR: BAR_MOCK_EXAMS,
  ISC: ISC_MOCK_EXAMS,
  TCP: TCP_MOCK_EXAMS,
  BEC: [], // Deprecated
  PREP: [],
};

// Helper functions
export const getMockExamsBySection = (section: ExamSection): MockExamConfig[] => {
  return ALL_MOCK_EXAMS[section] || [];
};

export const getMockExamById = (examId: string): MockExamConfig | undefined => {
  for (const section of Object.values(ALL_MOCK_EXAMS)) {
    const exam = section.find(e => e.id === examId);
    if (exam) return exam;
  }
  return undefined;
};

// Load questions for a mock exam testlet
export const loadTestletQuestions = (
  testlet: MockExamTestlet,
  section: ExamSection
): Question[] => {
  const allQuestions = getQuestionsBySection(section);
  
  if (testlet.questionIds && testlet.questionIds.length > 0) {
    // Return specific curated questions
    return testlet.questionIds
      .map(id => allQuestions.find(q => q.id === id))
      .filter((q): q is Question => q !== undefined);
  }
  
  // Filter by criteria
  let filtered = [...allQuestions];
  
  if (testlet.criteria?.blueprintAreas) {
    filtered = filtered.filter(q => 
      testlet.criteria!.blueprintAreas!.some(area => q.blueprintArea?.startsWith(area))
    );
  }
  
  if (testlet.criteria?.difficulty) {
    filtered = filtered.filter(q => 
      testlet.criteria!.difficulty!.includes(q.difficulty as 'easy' | 'medium' | 'hard')
    );
  }
  
  if (testlet.criteria?.topics) {
    filtered = filtered.filter(q => 
      testlet.criteria!.topics!.includes(q.topic)
    );
  }
  
  // Shuffle and return required count
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, testlet.questionCount);
};

// Load TBS for a mock exam testlet
export const loadTestletTBS = (
  testlet: MockExamTestlet,
  section: ExamSection
): TBS[] => {
  const allTBS = getTBSBySection(section);
  
  if (testlet.tbsIds && testlet.tbsIds.length > 0) {
    // Return specific curated TBS
    return testlet.tbsIds
      .map(id => allTBS.find(t => t.id === id))
      .filter((t): t is TBS => t !== undefined);
  }
  
  // Random selection
  const shuffled = [...allTBS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, testlet.questionCount);
};

export default ALL_MOCK_EXAMS;
