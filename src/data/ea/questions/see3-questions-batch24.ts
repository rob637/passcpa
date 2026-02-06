/**
 * EA SEE Part 3: Representation, Practices, and Procedures - Batch 24 (Q231-240)
 * Federal Tax Liens
 */

import { Question } from '../../../types';

export const SEE3_QUESTIONS_BATCH24: Question[] = [
  // ==========================================
  // SEE3: Federal Tax Liens
  // ==========================================
  {
    id: 'see3-231',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'Lien Basics',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A federal tax lien arises:',
    options: [
      'When a return is filed',
      'Automatically when tax is assessed and the taxpayer fails to pay after notice and demand',
      'Only after court action',
      'When an audit begins'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §6321, a lien arises automatically when: (1) tax is assessed, (2) notice and demand for payment is made, and (3) the taxpayer fails to pay. No court action is required.',
    reference: 'IRC §6321',
  },
  {
    id: 'see3-232',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'Property Subject',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A federal tax lien attaches to:',
    options: [
      'Only real property',
      'All property and rights to property belonging to the taxpayer',
      'Only bank accounts',
      'Only personal property'
    ],
    correctAnswer: 1,
    explanation: 'The federal tax lien attaches to all property and rights to property, whether real or personal, whether owned at the time of assessment or acquired thereafter.',
    reference: 'IRC §6321',
  },
  {
    id: 'see3-233',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'NFTL',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A Notice of Federal Tax Lien (NFTL):',
    options: [
      'Creates the lien',
      'Provides public notice of the existing lien and protects the government\'s priority',
      'Releases the lien',
      'Is the same as a levy'
    ],
    correctAnswer: 1,
    explanation: 'The NFTL does not create the lien (which arises by statute) but provides public notice. Filing the NFTL protects the government\'s priority against other creditors.',
    reference: 'IRC §6323(a)',
  },
  {
    id: 'see3-234',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'Where Filed',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'An NFTL is typically filed:',
    options: [
      'Only with the IRS',
      'In the county (or state) where the taxpayer resides or property is located',
      'Only in federal court',
      'With the Social Security Administration'
    ],
    correctAnswer: 1,
    explanation: 'NFTLs are filed in the state-designated office, typically the county recorder or Secretary of State, where the taxpayer resides or where real property is located.',
    reference: 'IRC §6323(f)',
  },
  {
    id: 'see3-235',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'Lien vs Levy',
    difficulty: 'medium',
    skillLevel: 'Analysis',
    question: 'The difference between a lien and a levy is:',
    options: [
      'They are the same thing',
      'A lien is a claim against property; a levy is the actual seizure of property',
      'A levy comes before a lien',
      'Only a lien requires notice'
    ],
    correctAnswer: 1,
    explanation: 'A lien is a legal claim securing the government\'s interest (does not take the property). A levy is the actual taking/seizure of property or rights to property to satisfy the debt.',
    reference: 'IRC §6321, §6331',
  },
  {
    id: 'see3-236',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'Lien Release',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'The IRS must release a federal tax lien within 30 days when:',
    options: [
      'The taxpayer requests it',
      'The liability is satisfied, becomes legally unenforceable, or a bond is accepted',
      'The audit is complete',
      'An appeal is filed'
    ],
    correctAnswer: 1,
    explanation: 'Under IRC §6325(a), the IRS must release the lien within 30 days if (1) liability is fully satisfied, (2) liability becomes legally unenforceable, or (3) an acceptable bond is furnished.',
    reference: 'IRC §6325(a)',
  },
  {
    id: 'see3-237',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'Lien Withdrawal',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A lien withdrawal:',
    options: [
      'Releases the underlying tax debt',
      'Removes the public filing but the lien itself remains in place',
      'Is the same as lien release',
      'Eliminates interest'
    ],
    correctAnswer: 1,
    explanation: 'Withdrawal removes the NFTL from public record but the underlying lien continues. Release extinguishes the lien entirely. Taxpayers may request withdrawal if lien was filed prematurely or is impeding payment.',
    reference: 'IRC §6323(j)',
  },
  {
    id: 'see3-238',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'Subordination',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A certificate of subordination:',
    options: [
      'Releases the lien',
      'Allows another creditor to move ahead of the federal tax lien for specific property',
      'Increases the lien amount',
      'Extends the lien period'
    ],
    correctAnswer: 1,
    explanation: 'Subordination allows another creditor\'s interest (like a new mortgage) to take priority over the federal tax lien for specific property. This may facilitate refinancing or sale that benefits collection.',
    reference: 'IRC §6325(d)',
  },
  {
    id: 'see3-239',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'Discharge',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A certificate of discharge:',
    options: [
      'Removes the lien from all property',
      'Removes the lien from specific property while it remains on other property',
      'Eliminates the tax debt',
      'Is automatic upon request'
    ],
    correctAnswer: 1,
    explanation: 'A discharge removes the lien from specific property (usually to allow sale) while the lien continues on other assets. The government may require proceeds or have remaining equity protected.',
    reference: 'IRC §6325(b)',
  },
  {
    id: 'see3-240',
    courseId: 'ea',
    section: 'SEE3',
    blueprintArea: 'SEE3-3',
    topic: 'Federal Tax Liens',
    subtopic: 'CAP Appeal',
    difficulty: 'hard',
    skillLevel: 'Remembering and Understanding',
    question: 'A taxpayer may appeal the filing of an NFTL through:',
    options: [
      'Tax Court only',
      'Collection Appeals Program (CAP) or Collection Due Process (CDP) hearing',
      'District Court only',
      'No appeal is available'
    ],
    correctAnswer: 1,
    explanation: 'Taxpayers receive a CDP notice after NFTL filing (or can use CAP). They can request a hearing to challenge the filing or proposed collection actions through Appeals.',
    reference: 'IRC §6320',
  },
];
