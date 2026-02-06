
import { Question } from '../../../types';

export const CISA3_QUESTIONS: Question[] = [
  {
    id: 'CISA3-001',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'medium',
    question: 'A feasibility study for a new application system should primarily focus on:',
    options: [
      'Determining the programming language to be used',
      'Assessing the cost-benefit analysis and strategic alignment',
      'Developing the user interface design',
      'Selecting the hardware vendor'
    ],
    correctAnswer: 1,
    explanation: 'A feasibility study determines whether a project is viable. The primary focus is on cost-benefit analysis (economic feasibility) and whether the solution aligns with business strategy.',
    topic: 'Project Management',
    subtopic: 'Feasibility Study'
  },
  {
    id: 'CISA3-002',
    courseId: 'cisa',
    section: 'CISA3',
    difficulty: 'hard',
    question: 'In which phase of the SDLC should security controls be initially defined?',
    options: [
      'Testing',
      'Implementation',
      'Requirements Analysis',
      'Design'
    ],
    correctAnswer: 2,
    explanation: 'Security requirements should be defined as early as possible, ideally during the Requirements Analysis phase, to ensure they are built into the design rather than added as an afterthought.',
    topic: 'Business Application Development',
    subtopic: 'SDLC Phases'
  }
];
