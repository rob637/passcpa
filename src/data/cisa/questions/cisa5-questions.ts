import { Question } from '../../../types';
import { CISA5_QUESTIONS_BATCH2 } from './cisa5-questions-batch2';
import { CISA5_QUESTIONS_BATCH3 } from './cisa5-questions-batch3';
import { CISA5_QUESTIONS_BATCH4 } from './cisa5-questions-batch4';
import { CISA5_QUESTIONS_BATCH5 } from './cisa5-questions-batch5';
import { CISA5_QUESTIONS_BATCH6 } from './cisa5-questions-batch6';
import { CISA5_QUESTIONS_BATCH7 } from './cisa5-questions-batch7';
import { CISA5_QUESTIONS_BATCH8 } from './cisa5-questions-batch8';
import { CISA5_QUESTIONS_EMERGING_TECH } from './cisa5-questions-emerging-tech';
import { CISA5_QUESTIONS_BATCH9 } from './cisa5-questions-batch9';
import { CISA5_QUESTIONS_BATCH10 } from './cisa-questions-batch10';
import { CISA5_QUESTIONS_BATCH11 } from './cisa-questions-batch11';
import { CISA5_QUESTIONS_BATCH12 } from './cisa-questions-batch12';
import { CISA5_QUESTIONS_BATCH13 } from './cisa-questions-batch13';
import { PRIVACY_REGULATION_QUESTIONS } from './cisa-cobit-privacy-batch15';

const CISA5_QUESTIONS_BATCH1: Question[] = [
  {
    id: 'cisa5-001',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-A',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Which of the following creates a digital signature?',
    options: [
      'Encrypting the message digest with the sender\'s private key',
      'Encrypting the message with a shared secret key',
      'Encrypting the message digest with the receiver\'s public key',
      'Encrypting the message digest with the sender\'s public key',
    ],
    correctAnswer: 0,
    explanation: 'A digital signature is created by hashing the message to create a digest, and then encrypting that digest with the sender\'s private key. This ensures authenticity and non-repudiation.',
    topic: 'Information Security',
    subtopic: 'Cryptography'
  },
  {
    id: 'cisa5-002',
    courseId: 'cisa',
    section: 'CISA5',
    blueprintArea: 'CISA5-A',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'The principle of "least privilege" is best described as:',
    options: [
      'Requiring two people to complete a sensitive task',
      'Granting users access to all data but logging their actions',
      'Rotation of duties to prevent fraud',
      'Granting users only the access necessary to perform their job functions',
    ],
    correctAnswer: 3,
    explanation: 'Least privilege ensures that users are granted the minimum level of access rights necessary to perform their assigned job responsibilities, reducing security risk.',
    topic: 'Logical Access',
    subtopic: 'Access Control Principles'
  }
];

export const CISA5_QUESTIONS: Question[] = [
  ...CISA5_QUESTIONS_BATCH1,
  ...CISA5_QUESTIONS_BATCH2,
  ...CISA5_QUESTIONS_BATCH3,
  ...CISA5_QUESTIONS_BATCH4,
  ...CISA5_QUESTIONS_BATCH5,
  ...CISA5_QUESTIONS_BATCH6,
  ...CISA5_QUESTIONS_BATCH7,
  ...CISA5_QUESTIONS_BATCH8,
  ...CISA5_QUESTIONS_EMERGING_TECH,
  ...CISA5_QUESTIONS_BATCH9,
  ...CISA5_QUESTIONS_BATCH10,
  ...CISA5_QUESTIONS_BATCH11,
  ...CISA5_QUESTIONS_BATCH12,
  ...CISA5_QUESTIONS_BATCH13,
  ...PRIVACY_REGULATION_QUESTIONS, // GDPR, CCPA, cross-border transfers (Batch 15)
];
