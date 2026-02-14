import { Question } from '../../../types';
import { CISA3_QUESTIONS_BATCH2 } from './cisa3-questions-batch2';
import { CISA3_QUESTIONS_BATCH3 } from './cisa3-questions-batch3';
import { CISA3_QUESTIONS_BATCH4 } from './cisa3-questions-batch4';
import { CISA3_QUESTIONS_BATCH5 } from './cisa3-questions-batch5';
import { CISA3_QUESTIONS_BATCH6 } from './cisa3-questions-batch6';
import { CISA3_QUESTIONS_BATCH7 } from './cisa3-questions-batch7';
import { CISA3_QUESTIONS_BATCH8 } from './cisa3-questions-batch8';
import { CISA3_QUESTIONS_BATCH9 } from './cisa2-cisa3-batch9';
import { CISA3_QUESTIONS_BATCH10 } from './cisa-questions-batch10';
import { CISA3_QUESTIONS_BATCH11 } from './cisa-questions-batch11';
import { CISA3_QUESTIONS_BATCH12 } from './cisa-questions-batch12';
import { CISA3_QUESTIONS_BATCH13 } from './cisa-questions-batch13';

const CISA3_QUESTIONS_BATCH1: Question[] = [
  {
    id: 'cisa3-001',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A feasibility study for a new application system should primarily focus on:',
    options: [
      'Developing the user interface design',
      'Assessing the cost-benefit analysis and strategic alignment',
      'Determining the programming language to be used',
      'Selecting the hardware vendor',
    ],
    correctAnswer: 1,
    explanation: 'A feasibility study determines whether a project is viable. The primary focus is on cost-benefit analysis (economic feasibility) and whether the solution aligns with business strategy.',
    topic: 'Project Management',
    subtopic: 'Feasibility Study'
  },
  {
    id: 'cisa3-002',
    courseId: 'cisa',
    section: 'CISA3',
    blueprintArea: 'CISA3-1',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'In which phase of the SDLC should security controls be initially defined?',
    options: [
      'Requirements Analysis',
      'Implementation',
      'Testing',
      'Design',
    ],
    correctAnswer: 0,
    explanation: 'Security requirements should be defined as early as possible, ideally during the Requirements Analysis phase, to ensure they are built into the design rather than added as an afterthought.',
    topic: 'Business Application Development',
    subtopic: 'SDLC Phases'
  }
];

export const CISA3_QUESTIONS: Question[] = [
  ...CISA3_QUESTIONS_BATCH1,
  ...CISA3_QUESTIONS_BATCH2,
  ...CISA3_QUESTIONS_BATCH3,
  ...CISA3_QUESTIONS_BATCH4,
  ...CISA3_QUESTIONS_BATCH5,
  ...CISA3_QUESTIONS_BATCH6,
  ...CISA3_QUESTIONS_BATCH7,
  ...CISA3_QUESTIONS_BATCH8,
  ...CISA3_QUESTIONS_BATCH9,
  ...CISA3_QUESTIONS_BATCH10,
  ...CISA3_QUESTIONS_BATCH11,
  ...CISA3_QUESTIONS_BATCH12,
  ...CISA3_QUESTIONS_BATCH13,
];
