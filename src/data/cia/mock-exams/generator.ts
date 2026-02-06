
import { CIASectionId } from '../../../courses/cia/config';
import { CIAMockExamConfig } from './config';
import { Question } from '../../../types';

export interface GeneratedCIAMockExam {
  config: CIAMockExamConfig;
  questions: Question[];
  answers: Record<string, string>;
  flagged: Set<string>;
  startTime: Date;
  timeRemaining: number;
}

export function generateCIAMockExam(config: CIAMockExamConfig, questionPool: Question[]): GeneratedCIAMockExam {
  // Simple random selection for now - in production use weighted selection
  const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, config.questionCount);
  
  return {
    config,
    questions: selected,
    answers: {},
    flagged: new Set(),
    startTime: new Date(),
    timeRemaining: config.timeLimitMinutes * 60,
  };
}
