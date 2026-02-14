/**
 * CIA Part 1: Essentials - Proficiency & Due Professional Care Expansion
 * 
 * Filling gap in CIA1-III: Proficiency and Due Professional Care (15% weight)
 * Focus: IT knowledge, fraud awareness, CPD planning, due diligence requirements
 */

import { Question } from '../../../types';

export const CIA1_PROFICIENCY_QUESTIONS: Question[] = [
  {
    id: 'cia1-prof-001',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'Standard 1210 states that internal auditors must possess the knowledge, skills, and other competencies needed to perform their responsibilities. Which type of knowledge is specifically mentioned as necessary even for non-IT audit staff?',
    options: [
      'Network architecture design',
      'Key information technology risks and controls',
      'Advanced programming languages',
      'Database administration',
    ],
    correctAnswer: 1,
    explanation: 'Standard 1210.A3 requires internal auditors to have sufficient knowledge of key information technology risks and controls, as well as technology-based audit techniques to perform their work. This applies to all auditors, not just IT specialists.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'IT Knowledge Requirements',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-prof-002',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'An internal auditor suspects fraud during an engagement but is not a Certified Fraud Examiner. According to the Standards, what is the appropriate action?',
    options: [
      'Immediately report to law enforcement before gathering any evidence',
      'Conduct a full fraud investigation independently',
      'Ignore the fraud indicators and continue with the planned scope',
      'Extend procedures to identify indicators of fraud and notify the appropriate parties',
    ],
    correctAnswer: 3,
    explanation: 'Standard 1210.A2 states that internal auditors must have sufficient knowledge to evaluate the risk of fraud and identify red flags, but are not expected to have the expertise of someone whose primary responsibility is fraud investigation. They should extend procedures, gather indicators, and notify appropriate parties.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Fraud Knowledge',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-prof-003',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'Due professional care requires the internal auditor to consider all of the following EXCEPT:',
    options: [
      'The cost of assurance in relation to potential benefits',
      'The extent of work needed to achieve engagement objectives',
      'The relative complexity and materiality of matters to which assurance procedures are applied',
      'Guaranteeing that all errors and irregularities will be detected',
    ],
    correctAnswer: 3,
    explanation: 'Due professional care (Standard 1220) does NOT require a guarantee that all errors will be detected. It requires reasonable care and competence—not infallibility. Auditors must consider scope, complexity, materiality, and cost-benefit, but absolute assurance is impossible.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Due Professional Care',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-prof-004',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'Standard 1230 addresses continuing professional development. Which statement about CPD is CORRECT?',
    options: [
      'CPD is satisfied solely by attending annual conferences',
      'CPD requirements apply only to the CAE',
      'Internal auditors must enhance their knowledge, skills, and competencies through continuing professional development',
      'CPD is optional for experienced auditors with more than 10 years of service',
    ],
    correctAnswer: 2,
    explanation: 'Standard 1230 requires ALL internal auditors to enhance their knowledge, skills, and competencies through continuing professional development. This is an ongoing obligation regardless of experience level and extends beyond conference attendance.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Continuing Professional Development',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-prof-005',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'An internal auditor is assigned to audit the treasury function but has limited knowledge of financial instruments. Which action BEST demonstrates proficiency?',
    options: [
      'Decline the engagement and recommend an external auditor',
      'Accept the engagement and learn about financial instruments during fieldwork',
      'Complete the audit using standard testing procedures without specialized knowledge',
      'Request that the CAE assign a team member with financial instruments expertise or arrange for subject matter expert assistance',
    ],
    correctAnswer: 3,
    explanation: 'Proficiency requires having or obtaining the necessary expertise. Standard 1210 allows the CAE to obtain advice and assistance from qualified individuals when the audit staff lacks the necessary expertise. This maintains audit quality while building the team\'s capability.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Proficiency Requirements',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-prof-006',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'Which of the following BEST demonstrates the exercise of due professional care in a consulting engagement?',
    options: [
      'Ensuring the engagement is completed under budget',
      'Considering the needs and expectations of the engagement client',
      'Documenting every conversation with the client',
      'Providing an opinion on the adequacy of controls',
    ],
    correctAnswer: 1,
    explanation: 'Standard 1220.C1 specifically addresses due professional care in consulting engagements, requiring consideration of the needs and expectations of clients, relative complexity, extent of work needed, and cost relative to benefits. Client needs drive consulting engagements.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Due Professional Care',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-prof-007',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'easy',
    question: 'The internal audit activity collectively must possess or obtain which of the following?',
    options: [
      'The knowledge, skills, and competencies to perform its responsibilities',
      'Certification as CPAs',
      'A graduate degree in accounting',
      'At least 5 years of audit experience per staff member',
    ],
    correctAnswer: 0,
    explanation: 'Standard 1210 states the internal audit activity must collectively possess or obtain the knowledge, skills, and other competencies to perform its responsibilities. The emphasis is on collective competency—not every individual needs every skill.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Proficiency Requirements',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-prof-008',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'hard',
    question: 'During an engagement, an internal auditor notices a pattern of transactions that could indicate money laundering but is unsure. Exercising due professional care, the auditor should:',
    options: [
      'Complete sufficient additional procedures to determine if fraud indicators exist and escalate to the CAE',
      'Include a detailed description in the draft audit report',
      'Dismiss the observation since money laundering investigation is beyond audit scope',
      'Immediately contact law enforcement directly',
    ],
    correctAnswer: 0,
    explanation: 'Due professional care and Standard 1210.A2 require auditors to have sufficient knowledge to recognize fraud indicators. The auditor should perform additional procedures to evaluate the indicators and escalate through proper channels (CAE, legal, compliance) rather than dismissing or over-reacting.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Fraud Knowledge',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-prof-009',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'Which of the following is an example of appropriate CPD activity for an internal auditor?',
    options: [
      'Completing the previous year\'s audit plan',
      'Attending professional seminars, pursuing additional certifications, and participating in research projects',
      'Only passing the CIA exam',
      'Reading only the organization\'s internal audit reports',
    ],
    correctAnswer: 1,
    explanation: 'CPD encompasses a variety of activities: professional seminars, conferences, additional certifications, self-study, research projects, teaching, and mentoring. It goes beyond the initial certification and day-to-day audit work.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Continuing Professional Development',
  reference: 'IIA Standards'
  },
  {
    id: 'cia1-prof-010',
    courseId: 'cia',
    section: 'CIA1',
    blueprintArea: 'CIA1-I',
    difficulty: 'medium',
    question: 'The concept of exercising "due professional care" means that the internal auditor:',
    options: [
      'Applies the care and skill expected of a reasonably prudent and competent internal auditor',
      'Ensures every transaction has been tested',
      'Guarantees the absence of errors or fraud',
      'Eliminates all risks associated with the audited process',
    ],
    correctAnswer: 0,
    explanation: 'Due professional care requires the care and skill expected of a reasonably prudent and competent internal auditor. It does not imply infallibility or a guarantee. Auditors exercise judgment about the extent of testing and evaluate the adequacy of work to achieve objectives.',
    topic: 'Proficiency and Due Professional Care',
    subtopic: 'Due Professional Care',
  reference: 'IIA Standards'
  }
];
