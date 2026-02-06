
import { Question } from '../../../types';

export const CIA2_QUESTIONS: Question[] = [
  {
    id: 'CIA2-001',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Which of the following sampling methods gives every item in the population an equal chance of being selected?',
    options: [
      'Haphazard sampling',
      'Random sampling',
      'Judgmental sampling',
      'Block sampling'
    ],
    correctAnswer: 1,
    explanation: 'Random sampling is a statistical sampling method where every item in the population has an equal probability of selection. This allows for statistical projection of results.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Sampling'
  },
  {
    id: 'CIA2-002',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'hard',
    question: 'During a risk assessment, an internal auditor identifies a risk that has a high potential impact but a very low likelihood of occurrence. The most appropriate response strategy would generally be to:',
    options: [
      'Avoid the risk',
      'Accept the risk',
      'Share/Insure the risk',
      'Control the risk'
    ],
    correctAnswer: 2,
    explanation: 'Risks with high impact but low likelihood (catastrophic risks) are typically best managed by sharing or transferring the risk, such as purchasing insurance.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk Assessment'
  },
  {
    id: 'CIA2-003',
    courseId: 'cia',
    section: 'CIA2',
    difficulty: 'medium',
    question: 'Which of the following describes a key characteristic of a "preventive" control?',
    options: [
      'It detects errors after they have occurred',
      'It corrects errors that have been detected',
      'It promotes desirable actions',
      'It deters an undesirable event from occurring'
    ],
    correctAnswer: 3,
    explanation: 'Preventive controls are designed to stop an undesirable event (error or irregularity) from occurring in the first place (e.g., passwords, segregation of duties).',
    topic: 'Performing the Engagement',
    subtopic: 'Internal Controls'
  }
];
