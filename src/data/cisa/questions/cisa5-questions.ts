
import { Question } from '../../../types';

export const CISA5_QUESTIONS: Question[] = [
  {
    id: 'CISA5-001',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'hard',
    question: 'Which of the following creates a digital signature?',
    options: [
      'Encrypting the message digest with the sender\'s private key',
      'Encrypting the message digest with the sender\'s public key',
      'Encrypting the message digest with the receiver\'s public key',
      'Encrypting the message with a shared secret key'
    ],
    correctAnswer: 0,
    explanation: 'A digital signature is created by hashing the message to create a digest, and then encrypting that digest with the sender\'s private key. This ensures authenticity and non-repudiation.',
    topic: 'Information Security',
    subtopic: 'Cryptography'
  },
  {
    id: 'CISA5-002',
    courseId: 'cisa',
    section: 'CISA5',
    difficulty: 'medium',
    question: 'The principle of "least privilege" is best described as:',
    options: [
      'Granting users access to all data but logging their actions',
      'Granting users only the access necessary to perform their job functions',
      'Rotation of duties to prevent fraud',
      'Requiring two people to complete a sensitive task'
    ],
    correctAnswer: 1,
    explanation: 'Least privilege ensures that users are granted the minimum level of access rights necessary to perform their assigned job responsibilities, reducing security risk.',
    topic: 'Logical Access',
    subtopic: 'Access Control Principles'
  }
];
