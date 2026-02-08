/**
 * CFP Professional Conduct Questions - Batch 3
 * Focus on PCR-2 (Fiduciary Duty) and PCR-3 (Practice Standards) - undertested areas
 * Adding 25 questions to improve coverage
 */

import { Question } from '../../../types';

export const CFP_PROFESSIONAL_BATCH3_QUESTIONS: Question[] = [
  // PCR-2: Fiduciary Duty
  {
    id: 'CFP-PCR-B3-001',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Standard',
    subtopic: 'Duty of Loyalty',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP® professional learns that a mutual fund company will pay her a $5,000 bonus for recommending their funds. Under the fiduciary duty. which action is REQUIRED?',
    options: [
      'A) Decline the bonus to avoid any conflict',
      'B) Disclose the bonus in writing and obtain client consent before recommending',
      'C) Accept the bonus since it does not affect advice quality',
      'D) Donate the bonus to charity and proceed without disclosure'
    ],
    correctAnswer: 1,
    explanation: 'The duty of loyalty requires disclosure of material conflicts of interest. The $5,000 bonus is a material conflict that could influence recommendations. While disclosure and consent can address the conflict, the CFP® must ensure the recommendation remains in the client\'s best interest.'
  },
  {
    id: 'CFP-PCR-B3-002',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Standard',
    subtopic: 'Duty of Care',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client asks for advice on a complex derivative strategy. The CFP® professional has no experience with derivatives. What does the duty of care require?',
    options: [
      'A) Decline the engagement entirely',
      'B) Research derivatives independently and provide advice',
      'C) Either acquire competence or refer to a qualified professional',
      'D) Provide general advice and disclaim specific competence'
    ],
    correctAnswer: 2,
    explanation: 'The duty of care requires competence. A CFP® must either acquire the necessary competence through education/research or refer the client to another professional with the required expertise. Simply disclaiming is insufficient.'
  },
  {
    id: 'CFP-PCR-B3-003',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Standard',
    subtopic: 'Best Interest',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A CFP® professional determining "best interest" for investment recommendations must consider all EXCEPT:',
    options: [
      'A) The client\'s risk tolerance and investment objectives',
      'B) Whether the product generates higher compensation for the planner',
      'C) The client\'s satisfaction with previous recommendations from other advisors',
      'D) The cost and complexity of the recommended product'
    ],
    correctAnswer: 2,
    explanation: 'Best interest analysis focuses on the client\'s current needs, goals, risk tolerance, costs, and any conflicts (like planner compensation). Past satisfaction with OTHER advisors\' recommendations is not relevant to determining if a current recommendation is in the client\'s best interest.'
  },
  {
    id: 'CFP-PCR-B3-004',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Standard',
    subtopic: 'Material Conflicts',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which of the following represents a material conflict of interest that MUST be disclosed?',
    options: [
      'A) The CFP® earns a salary from their employer firm',
      'B) The CFP® receives 12b-1 fees from recommended mutual funds',
      'C) The CFP® holds the same growth stocks as the client',
      'D) The CFP® uses the same software platform as competitors'
    ],
    correctAnswer: 1,
    explanation: '12b-1 fees create a material conflict because the planner receives ongoing compensation from fund companies, which could influence recommendations. A regular salary, holding similar investments, or using common software are not material conflicts requiring disclosure.'
  },
  {
    id: 'CFP-PCR-B3-005',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Standard',
    subtopic: 'Suitability vs Fiduciary',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'What is the key difference between a suitability standard and a fiduciary standard?',
    options: [
      'A) Suitability requires disclosure; fiduciary does not',
      'B) Fiduciary requires the best option; suitability only requires a suitable option',
      'C) Suitability applies to all advisors; fiduciary only to CFP® professionals',
      'D) There is no meaningful difference between the standards'
    ],
    correctAnswer: 1,
    explanation: 'The suitability standard only requires that a recommendation be "suitable" given the client\'s situation. The fiduciary standard is higher—it requires the advisor to act in the client\'s BEST interest, not merely find a suitable option among many.'
  },
  // PCR-3: Practice Standards
  {
    id: 'CFP-PCR-B3-006',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Client Engagement',
    subtopic: 'Written Agreement',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Before providing financial planning, a CFP® professional must have written documentation that includes:',
    options: [
      'A) Only the fee arrangement',
      'B) The client\'s complete financial history',
      'C) Scope of engagement, compensation, and material conflicts',
      'D) A guarantee of investment returns'
    ],
    correctAnswer: 2,
    explanation: 'CFP Board Standards require written documentation of the scope of engagement, how the professional will be compensated, and any material conflicts of interest before providing financial planning services.'
  },
  {
    id: 'CFP-PCR-B3-007',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Financial Planning Process',
    subtopic: 'Data Gathering',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'During data gathering, a client provides incomplete information about their debts. The CFP® professional should:',
    options: [
      'A) Proceed with available information and disclaim liability',
      'B) Make reasonable assumptions and document them',
      'C) Ask clarifying questions to obtain complete relevant information',
      'D) Refer the client to another planner who specializes in debt'
    ],
    correctAnswer: 2,
    explanation: 'The CFP® must gather sufficient information to provide competent advice. When information is incomplete, the professional should ask clarifying questions. Proceeding with incomplete data or excessive assumptions violates the duty of care.'
  },
  {
    id: 'CFP-PCR-B3-008',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Financial Planning Process',
    subtopic: 'Implementation',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP® presents recommendations but the client takes no action for 6 months. What is the professional\'s responsibility?',
    options: [
      'A) Close the file since the client is unresponsive',
      'B) Implement recommendations without further consent',
      'C) Follow up reasonably based on the engagement terms',
      'D) Report the client to CFP Board for non-compliance'
    ],
    correctAnswer: 2,
    explanation: 'The CFP® has an ongoing duty to clients that includes reasonable follow-up as defined by the engagement. Simply closing the file without follow-up or implementing without consent would violate practice standards.'
  },
  {
    id: 'CFP-PCR-B3-009',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Confidentiality',
    subtopic: 'Client Records',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP® receives a subpoena for client records in a civil lawsuit. What should the CFP® do?',
    options: [
      'A) Refuse to provide any records citing confidentiality',
      'B) Provide all records immediately without notifying the client',
      'C) Notify the client and comply with valid legal process',
      'D) Destroy records to protect client confidentiality'
    ],
    correctAnswer: 2,
    explanation: 'While confidentiality is paramount, a valid legal subpoena must be honored. The CFP® should notify the client of the subpoena and comply with the legal process. Destroying records or refusing a valid subpoena could result in legal consequences.'
  },
  {
    id: 'CFP-PCR-B3-010',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Documentation',
    subtopic: 'Record Retention',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'CFP Board Standards require that financial planning records be retained for at least:',
    options: [
      'A) 3 years',
      'B) 5 years',
      'C) 7 years',
      'D) 10 years'
    ],
    correctAnswer: 2,
    explanation: 'CFP Board Practice Standards require maintaining records for at least 7 years. This includes client data, recommendations, communications, and documentation of the planning process.'
  },
  // PCR-1: Code of Ethics & Standards
  {
    id: 'CFP-PCR-B3-011',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Professionalism',
    subtopic: 'Advertising',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP® professional\'s advertisement states "Guaranteed 10% annual returns." This violates:',
    options: [
      'A) Only SEC regulations, not CFP Board Standards',
      'B) The prohibition on misleading communications',
      'C) No rule if past performance achieved 10%',
      'D) Only the IRS disclosure requirements'
    ],
    correctAnswer: 1,
    explanation: 'CFP Board Standards prohibit misleading communications. Guaranteeing investment returns is inherently misleading since future returns cannot be guaranteed. This violates both CFP Standards and securities regulations.'
  },
  {
    id: 'CFP-PCR-B3-012',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Professionalism',
    subtopic: 'Using the Marks',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Which use of the CFP® marks is correct?',
    options: [
      'A) CFP (without registration mark) in all communications',
      'B) "CFP®" following the certificant\'s name',
      'C) "CFP™" since it is a trademark',
      'D) "Certified Financial Planner" alone without any marks'
    ],
    correctAnswer: 1,
    explanation: 'The proper use is "CFP®" with the registration mark following the individual\'s name. The marks should include ® to indicate registered certification marks owned by CFP Board.'
  },
  {
    id: 'CFP-PCR-B3-013',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Integrity',
    subtopic: 'Dishonesty',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A CFP® learns they made an error in a client\'s tax projection that resulted in a larger tax bill. The CFP® should:',
    options: [
      'A) Wait to see if the client notices the error',
      'B) Correct only if the client asks about the discrepancy',
      'C) Promptly disclose the error to the client',
      'D) Adjust future projections without acknowledging past error'
    ],
    correctAnswer: 2,
    explanation: 'The duty of integrity requires honesty. A CFP® must promptly disclose errors to clients, even when disclosure may reflect poorly on the professional. Hiding or delaying disclosure violates the Code of Ethics.'
  },
  {
    id: 'CFP-PCR-B3-014',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Fairness',
    subtopic: 'Fee Disputes',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client disputes a $500 fee believing the work was not completed. The CFP® completed 80% of the agreed work. What is the fairest approach?',
    options: [
      'A) Demand full payment since most work was done',
      'B) Waive the entire fee to avoid conflict',
      'C) Discuss with client and negotiate a reasonable resolution',
      'D) Report the client for breach of contract'
    ],
    correctAnswer: 2,
    explanation: 'The duty of fairness requires handling disputes reasonably. The CFP® should discuss the situation with the client and seek a fair resolution, which might include a prorated fee for work completed or an agreement to finish remaining work.'
  },
  {
    id: 'CFP-PCR-B3-015',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Diligence',
    subtopic: 'Ongoing Monitoring',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Under the duty of diligence, which situation would NOT require the CFP® to revisit a client\'s plan?',
    options: [
      'A) Client experiences a divorce',
      'B) Major tax law changes affecting client\'s strategy',
      'C) Client changes their email address',
      'D) Client receives a $500,000 inheritance'
    ],
    correctAnswer: 2,
    explanation: 'Diligence requires monitoring for material changes. Divorce, tax law changes, and large inheritances are material life events requiring plan review. A change in email address is administrative and does not trigger a financial plan review.'
  },
  // Disciplinary Process
  {
    id: 'CFP-PCR-B3-016',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Disciplinary Process',
    subtopic: 'Self-Reporting',
    difficulty: 'medium',
    skillLevel: 'Remembering and Understanding',
    question: 'A CFP® professional is charged (not convicted) with a misdemeanor involving dishonesty. What is required?',
    options: [
      'A) No action unless convicted',
      'B) Self-report to CFP Board within 30 days',
      'C) Voluntarily suspend certification until resolved',
      'D) Report only if the employer requires it'
    ],
    correctAnswer: 1,
    explanation: 'CFP Board requires self-reporting of certain matters including being charged with (not just convicted of) crimes involving dishonesty. The reporting deadline is generally 30 calendar days.'
  },
  {
    id: 'CFP-PCR-B3-017',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Disciplinary Process',
    subtopic: 'Sanctions',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'CFP Board disciplinary actions may include all EXCEPT:',
    options: [
      'A) Private censure',
      'B) Suspension of certification',
      'C) Criminal prosecution',
      'D) Permanent revocation'
    ],
    correctAnswer: 2,
    explanation: 'CFP Board is a private certification organization with authority over the CFP® marks. It can impose private censure, suspension, or revocation. Criminal prosecution is the domain of government authorities, not CFP Board.'
  },
  {
    id: 'CFP-PCR-B3-018',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-4',
    topic: 'Disciplinary Process',
    subtopic: 'Grounds for Discipline',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'Which action would most likely result in CFP Board discipline?',
    options: [
      'A) Disagreement with a client about investment strategy',
      'B) Charging higher fees than competitors',
      'C) Failing to disclose a referral fee received from another professional',
      'D) Recommending conservative investments during market volatility'
    ],
    correctAnswer: 2,
    explanation: 'Failing to disclose referral fees is a violation of the duty to disclose material conflicts of interest. Subjective investment disagreements, competitive pricing, and conservative recommendations during volatility are not disciplinary matters.'
  },
  // Client Communication
  {
    id: 'CFP-PCR-B3-019',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Client Communication',
    subtopic: 'Clear Disclosure',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'When presenting recommendations, the CFP® must communicate in a manner that:',
    options: [
      'A) Uses technical jargon to demonstrate expertise',
      'B) Is reasonably understandable to the client',
      'C) Minimizes client questions to save time',
      'D) Avoids discussing potential risks'
    ],
    correctAnswer: 1,
    explanation: 'CFP standards require communications that are clear and understandable to the client. Technical jargon should be explained, risks discussed, and clients should be encouraged to ask questions.'
  },
  {
    id: 'CFP-PCR-B3-020',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Standard',
    subtopic: 'Conflicts of Interest',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'A CFP® is considering recommending their brother-in-law\'s insurance products. Which statement is TRUE?',
    options: [
      'A) This is prohibited under all circumstances',
      'B) This is permitted with proper disclosure and if in client\'s best interest',
      'C) This is only permitted if the brother-in-law is also a CFP®',
      'D) This requires CFP Board pre-approval'
    ],
    correctAnswer: 1,
    explanation: 'Family relationships create conflicts of interest but do not automatically prohibit recommendations. The CFP® must disclose the relationship and ensure the recommendation is genuinely in the client\'s best interest, not influenced by the family connection.'
  },
  // Competence & Experience
  {
    id: 'CFP-PCR-B3-021',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Competence',
    subtopic: 'Continuing Education',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'To maintain CFP® certification, how many CE hours are required per reporting period?',
    options: [
      'A) 15 hours',
      'B) 30 hours',
      'C) 40 hours',
      'D) 60 hours'
    ],
    correctAnswer: 1,
    explanation: 'CFP Board requires 30 hours of continuing education every two-year reporting period. This includes 2 hours of CFP Board-approved ethics CE.'
  },
  {
    id: 'CFP-PCR-B3-022',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    topic: 'Competence',
    subtopic: 'Ethics CE',
    difficulty: 'easy',
    skillLevel: 'Remembering and Understanding',
    question: 'Of the required 30 CE hours, how many must be CFP Board-approved ethics CE?',
    options: [
      'A) 0 hours - ethics is optional',
      'B) 2 hours',
      'C) 6 hours',
      'D) 10 hours'
    ],
    correctAnswer: 1,
    explanation: 'CFP certificants must complete at least 2 hours of CFP Board-approved ethics CE within each two-year reporting period as part of the 30-hour requirement.'
  },
  {
    id: 'CFP-PCR-B3-023',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Scope Limitation',
    subtopic: 'Limited Engagements',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'A client engages a CFP® only for retirement planning advice. The CFP® notices significant estate planning issues. What should the CFP® do?',
    options: [
      'A) Ignore the estate issues since they are outside the scope',
      'B) Expand the engagement without discussing with client',
      'C) Inform the client of potential issues and recommend consultation',
      'D) Refuse to continue the engagement until estate issues are addressed'
    ],
    correctAnswer: 2,
    explanation: 'Even in limited-scope engagements, a CFP® must act in the client\'s best interest. This includes informing the client of significant issues in other areas, even if those areas are outside the engagement scope. The client can then decide how to address them.'
  },
  {
    id: 'CFP-PCR-B3-024',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-2',
    topic: 'Fiduciary Standard',
    subtopic: 'Investment Advice',
    difficulty: 'hard',
    skillLevel: 'Analysis',
    question: 'Fund A has a 0.5% expense ratio and Fund B has a 1.2% expense ratio. Both have similar holdings and performance. Under fiduciary duty, the CFP® should:',
    options: [
      'A) Always recommend Fund A due to lower costs',
      'B) Recommend Fund B if it pays higher compensation',
      'C) Consider costs along with all relevant factors in the client\'s interest',
      'D) Let the client decide since costs are disclosed'
    ],
    correctAnswer: 2,
    explanation: 'While cost is a significant factor in fiduciary analysis, it is not the only factor. The CFP® must consider all relevant factors (tax treatment, platform availability, client preferences, etc.). However, with similar holdings and performance, lower costs would typically favor Fund A unless other factors justify the higher-cost option.'
  },
  {
    id: 'CFP-PCR-B3-025',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-3',
    topic: 'Financial Planning Process',
    subtopic: 'Goals Identification',
    difficulty: 'medium',
    skillLevel: 'Application',
    question: 'During the understanding client circumstances step, a CFP® should NOT:',
    options: [
      'A) Ask about the client\'s values and attitudes about money',
      'B) Gather information about family situation',
      'C) Immediately recommend specific products',
      'D) Discuss risk tolerance and capacity'
    ],
    correctAnswer: 2,
    explanation: 'The financial planning process requires understanding client circumstances before making recommendations. Recommending specific products before fully understanding the client\'s situation violates the practice standards and the duty of care.'
  }
];
