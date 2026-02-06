
import { Question } from '../../../types';

export const CIA3_QUESTIONS: Question[] = [
  {
    id: 'CIA3-001',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'hard',
    question: 'In the context of IT security, "phishing" is best described as:',
    options: [
      'Intercepting data packets during transmission',
      'Flooding a network with traffic to cause a denial of service',
      'Using social engineering to deceive users into revealing sensitive information',
      'Installing malware that encrypts files for ransom'
    ],
    correctAnswer: 2,
    explanation: 'Phishing is a form of social engineering where attackers masquerade as a trusted entity (usually via email) to trick victims into revealing sensitive data like passwords or credit card numbers.',
    topic: 'Information Security',
    subtopic: 'Cybersecurity'
  },
  {
    id: 'CIA3-002',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Which of the following financial ratios is most useful for assessing a company’s short-term liquidity?',
    options: [
      'Debt-to-Equity Ratio',
      'Return on Assets',
      'Current Ratio',
      'Gross Profit Margin'
    ],
    correctAnswer: 2,
    explanation: 'The Current Ratio (Current Assets / Current Liabilities) is a primary measure of short-term liquidity, indicating the company\'s ability to pay short-term obligations.',
    topic: 'Financial Management',
    subtopic: 'Financial Ratios'
  },
  {
    id: 'CIA3-003',
    courseId: 'cia',
    section: 'CIA3',
    difficulty: 'medium',
    question: 'Under a centralized organizational structure, decision-making authority is primarily:',
    options: [
      'Delegated to lower-level managers',
      'Retained by top management',
      'Distributed geographically',
      'Based on product lines'
    ],
    correctAnswer: 1,
    explanation: 'In a centralized structure, decision-making authority is concentrated at the top levels of management, ensuring consistent policies and control.',
    topic: 'Business Acumen',
    subtopic: 'Organizational Structure'
  }
];
