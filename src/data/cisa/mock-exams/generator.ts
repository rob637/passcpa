
import { CISASectionId } from '../../../courses/cisa';
import { CISAMockExamConfig } from './config';
import { Question } from '../../../types';

export interface GeneratedCISAMockExam {
  config: CISAMockExamConfig;
  questions: Question[];
  answers: Record<string, string>;
  flagged: Set<string>;
  startTime: Date;
  timeRemaining: number;
}

export function generateCISAMockExam(config: CISAMockExamConfig, questionPool: Question[]): GeneratedCISAMockExam {
  let selectedQuestions: Question[] = [];

  if (config.weighted) {
    // Select based on domain weights
    // Map section IDs to their weights
    const WEIGHTS: Record<string, number> = {
      'CISA1': 0.21,
      'CISA2': 0.17,
      'CISA3': 0.12,
      'CISA4': 0.23,
      'CISA5': 0.27
    };

    const targetCount = config.questionCount;
    
    // Group questions by section
    const bySection: Record<string, Question[]> = {};
    questionPool.forEach(q => {
      const sec = q.section as string;
      if (!bySection[sec]) bySection[sec] = [];
      bySection[sec].push(q);
    });

    // Select questions
    Object.entries(WEIGHTS).forEach(([sectionId, weight]) => {
      if (!config.sections.includes(sectionId as CISASectionId)) return;

      const sectionQuestions = bySection[sectionId] || [];
      const count = Math.round(targetCount * weight);
      
      // Randomize
      const shuffled = [...sectionQuestions].sort(() => 0.5 - Math.random());
      selectedQuestions.push(...shuffled.slice(0, count));
    });

    // If rounding errors caused shortage/surplus, adjust with randoms
    if (selectedQuestions.length < targetCount) {
      const remaining = targetCount - selectedQuestions.length;
      // Very simple fill for now
      selectedQuestions.push(...questionPool
        .filter(q => !selectedQuestions.includes(q))
        .sort(() => 0.5 - Math.random())
        .slice(0, remaining)
      );
    }
    
    // Initial shuffle of the final set
    selectedQuestions = selectedQuestions.sort(() => 0.5 - Math.random());

  } else {
    // Pure random
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, config.questionCount);
  }
  
  return {
    config,
    questions: selectedQuestions.slice(0, config.questionCount), // Ensure exact count
    answers: {},
    flagged: new Set(),
    startTime: new Date(),
    timeRemaining: config.timeLimitMinutes * 60,
  };
}
