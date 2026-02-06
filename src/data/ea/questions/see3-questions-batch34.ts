/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 34 (Q331-340)
 * IRS Appeals Process
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH34: Question[] = [
  // ==========================================
  // SEE3: IRS Appeals Process
  // ==========================================
  {
    id: 'see3-331',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'Appeals Mission',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS Office of Appeals:',
    options: [
      'Audits returns',
      'Provides an independent review of disputed tax matters to resolve cases without litigation',
      'Prosecutes tax crimes',
      'Issues refunds'
    ],
    correctAnswer: 1,
    explanation: 'Appeals is independent from the IRS examination functions. Its mission is to resolve tax disputes without litigation in a way that is fair to both taxpayer and government.',
    reference: 'IRM 8.1.1',
  },
  {
    id: 'see3-332',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'Access to Appeals',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A taxpayer may request Appeals consideration:',
    options: [
      'Only after paying the tax',
      'After receiving a 30-day letter or final adverse determination from an IRS function',
      'Only through Tax Court',
      'Before any IRS contact'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers may request Appeals after receiving a 30-day letter (post-exam), after adverse CDP determination, OIC rejection, or other IRS function determinations with appeal rights.',
    reference: 'IRM 8.1.1.2',
  },
  {
    id: 'see3-333',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'Protest Requirements',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A formal written protest is required for Appeals when:',
    options: [
      'All cases',
      'The total amount in dispute (tax, penalties, interest) exceeds $25,000 for any period',
      'Only criminal cases',
      'The taxpayer declines'
    ],
    correctAnswer: 1,
    explanation: 'A formal written protest is required when the total disputed amount exceeds $25,000 for any period. For smaller amounts, a small case request (brief statement) may suffice.',
    reference: 'IRS Publication 5',
  },
  {
    id: 'see3-334',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'Protest Contents',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A formal written protest must include:',
    options: [
      'Only the taxpayer\'s name',
      'Taxpayer information, statement of facts, law and arguments, and a penalties of perjury statement',
      'Only a signature',
      'Court citations only'
    ],
    correctAnswer: 1,
    explanation: 'A formal protest includes: taxpayer info, statement of disagreement, statement of facts (signed under penalties of perjury), applicable law, and arguments supporting the taxpayer\'s position.',
    reference: 'IRS Publication 5',
  },
  {
    id: 'see3-335',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'Ex Parte Rules',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The ex parte communication prohibition means:',
    options: [
      'Taxpayers cannot communicate with Appeals',
      'Appeals Officers should not have prohibited communications with IRS compliance without taxpayer opportunity to participate',
      'All communications must be in writing',
      'No phone calls are allowed'
    ],
    correctAnswer: 1,
    explanation: 'Ex parte rules (IRC §7803(e)) prohibit certain communications between Appeals and other IRS functions without giving the taxpayer notice and opportunity to participate.',
    reference: 'IRC §7803(e)',
  },
  {
    id: 'see3-336',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'Hazards of Litigation',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Appeals Officers may settle cases based on:',
    options: [
      'Personal preference',
      'Hazards of litigation - the realistic possibility of both parties\' positions prevailing in court',
      'Only 50/50 splits',
      'Taxpayer\'s payment ability'
    ],
    correctAnswer: 1,
    explanation: 'Appeals considers "hazards of litigation" - the likelihood each party would prevail in court - when proposing settlements. Both factual and legal uncertainties are evaluated.',
    reference: 'IRM 8.6.4',
  },
  {
    id: 'see3-337',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'New Issues',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'In Appeals, new issues:',
    options: [
      'May be raised freely by Appeals',
      'Generally should not be raised by Appeals unless taxpayer is notified and given opportunity to respond',
      'Are always raised',
      'Must be raised by the taxpayer'
    ],
    correctAnswer: 1,
    explanation: 'As a matter of policy, Appeals generally does not raise new issues. If a new issue must be addressed, the taxpayer should be notified and given opportunity to respond.',
    reference: 'IRM 8.6.1.4',
  },
  {
    id: 'see3-338',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'Conference Procedures',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'Appeals conferences:',
    options: [
      'Are always in person',
      'May be held by telephone, video, or in person',
      'Are held only at IRS headquarters',
      'Require an attorney present'
    ],
    correctAnswer: 1,
    explanation: 'Appeals conferences may be conducted by telephone, video conference, or in person. The method depends on case complexity, taxpayer preference, and Appeals Office procedures.',
    reference: 'IRM 8.1.3',
  },
  {
    id: 'see3-339',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'Settlement Agreement',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'If a case is settled in Appeals:',
    options: [
      'It automatically goes to Tax Court',
      'A closing agreement or decision document is executed, binding both parties',
      'Either party may reopen the issue',
      'No documentation is required'
    ],
    correctAnswer: 1,
    explanation: 'Settled cases result in a Form 870-AD (or similar) binding the IRS and usually precluding further administrative action. For docketed cases, a stipulated decision is filed with Tax Court.',
    reference: 'IRM 8.13.1',
  },
  {
    id: 'see3-340',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-2',
    topic: 'IRS Appeals',
    subtopic: 'Fast Track Settlement',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'Fast Track Settlement (FTS) allows:',
    options: [
      'Immediate court filing',
      'Appeals involvement during the examination stage to attempt rapid issue resolution',
      'Skipping examination',
      'Automatic case dismissal'
    ],
    correctAnswer: 1,
    explanation: 'Fast Track Settlement brings Appeals Officers into the examination process to mediate disputes while the case is still open. It aims for resolution within 120 days.',
    reference: 'IRM 8.26.1',
  },
];
