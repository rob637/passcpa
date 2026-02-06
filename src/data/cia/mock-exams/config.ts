
import { CIASectionId } from '../../../courses/cia/config';

export interface CIAMockExamConfig {
  id: string;
  name: string;
  description: string;
  section: CIASectionId;
  questionCount: number;
  timeLimitMinutes: number;
  passingScore: number;
  questionSelection: {
    difficultyDistribution: {
      easy: number;
      medium: number;
      hard: number;
    };
    requireAllAreas: boolean;
  };
}

// CIA weights are defined in the course config, but we can hardcode fallback defaults here for exam generation
export const CIA_BLUEPRINT_WEIGHTS: Record<CIASectionId, Record<string, number>> = {
  CIA1: {
    'CIA1-I': 0.40, // Foundations - 40% (Simplified for mock generator, see real config for breakdown)
    'CIA1-II': 0.15,
    'CIA1-III': 0.15,
    'CIA1-IV': 0.10,
    'CIA1-V': 0.20
  },
  CIA2: {
    'CIA2-I': 0.20,
    'CIA2-II': 0.20,
    'CIA2-III': 0.20,
    'CIA2-IV': 0.20,
    'CIA2-V': 0.20
  },
  CIA3: {
    'CIA3-I': 0.25,
    'CIA3-II': 0.25,
    'CIA3-III': 0.20,
    'CIA3-IV': 0.30
  }
};

export const MOCK_EXAM_MODES: Record<string, Omit<CIAMockExamConfig, 'section'>> = {
  'full': {
    id: 'full',
    name: 'Full Simulated Exam',
    description: 'Realistic exam experience',
    questionCount: 100, // 125 for part 1, handled in factory
    timeLimitMinutes: 120, // 150 for part 1
    passingScore: 600,
    questionSelection: {
      difficultyDistribution: { easy: 0.3, medium: 0.5, hard: 0.2 },
      requireAllAreas: true
    }
  },
  'quick': {
    id: 'quick',
    name: 'Quick Practice',
    description: '25 random questions',
    questionCount: 25,
    timeLimitMinutes: 30,
    passingScore: 75, // Percentage
    questionSelection: {
      difficultyDistribution: { easy: 0.4, medium: 0.4, hard: 0.2 },
      requireAllAreas: false
    }
  }
};

export function getCIAMockExamConfig(id: string, section: CIASectionId): CIAMockExamConfig {
    const base = MOCK_EXAM_MODES[id] || MOCK_EXAM_MODES['quick'];
    
    // Adjust for Part 1 specifics
    let qCount = base.questionCount;
    let tLimit = base.timeLimitMinutes;
    
    if (id === 'full') {
        if (section === 'CIA1') {
            qCount = 125;
            tLimit = 150;
        } else {
            qCount = 100;
            tLimit = 120;
        }
    }

    return {
        ...base,
        section,
        questionCount: qCount,
        timeLimitMinutes: tLimit
    };
}
