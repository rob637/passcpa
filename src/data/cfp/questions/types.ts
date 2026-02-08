/**
 * CFP Question Types
 * Type definitions for CFP batch question files
 */

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  domain: string;
  topic: string;
  subtopic?: string;
  question: string;
  questionType: 'conceptual' | 'calculation' | 'case-study' | 'scenario';
  options: QuestionOption[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  educationalObjective?: string;
  cfpTopicArea?: string;
  bloomLevel?: 'knowledge' | 'comprehension' | 'application' | 'analysis' | 'synthesis' | 'evaluation';
  caseStudyBased?: boolean;
  tags?: string[];
}
