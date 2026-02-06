
import { CISASectionId } from '../../../courses/cisa';

export interface CISAMockExamConfig {
  questionCount: number;
  timeLimitMinutes: number;
  sections: CISASectionId[];
  mode: 'practice' | 'simulation';
  weighted: boolean; // Whether to respect domain weights
}

export const DEFAULT_CISA_MOCK_CONFIG: CISAMockExamConfig = {
  questionCount: 150,
  timeLimitMinutes: 240, // 4 hours
  sections: ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
  mode: 'simulation',
  weighted: true
};

export const MINI_CISA_MOCK_CONFIG: CISAMockExamConfig = {
  questionCount: 50,
  timeLimitMinutes: 80,
  sections: ['CISA1', 'CISA2', 'CISA3', 'CISA4', 'CISA5'],
  mode: 'practice',
  weighted: true
};
