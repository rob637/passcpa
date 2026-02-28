/**
 * CFP Professional Conduct Lessons - Standards and Ethics
 * Domain 1: Professional Conduct and Regulation (15% of exam)
 * Blueprint Area: PRO-1 - CFP Board's Code and Standards
 * 
 * Topics: Code of Ethics, Standards of Conduct, fiduciary duty
 */

import type { Lesson } from '../../../types';

export const CFP_PRO1_LESSONS: Lesson[] = [
  {
    id: 'CFP-PRO-L001',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    title: 'CFP Board Code of Ethics and Standards of Conduct',
    description: 'Understand the Code of Ethics and its principles',
    order: 1,
    duration: 35,
    difficulty: 'intermediate',
    topics: [
      'Code of Ethics principles',
      'Fiduciary Duty application',
      'Financial Advice vs. Financial Planning',
      'Standards of Conduct'
    ],
    content: {
      sections: [
        {
          title: 'The Code of Ethics',
          type: 'text',
          content: 'Every CFP® professional must adhere to four core principles that guide ethical conduct in financial planning practice.'
        },
        {
          title: 'Four Principles of the Code',
          type: 'table',
          headers: ['Principle', 'Key Requirements'],
          rows: [
            ['1. Act with Honesty, Integrity, Competence, and Diligence', 'Be truthful in all representations; maintain competency; perform work with appropriate care'],
            ['2. Act in the Client\'s Best Interests', 'The foundational principle; client interests override practitioner\'s interests; applies at ALL times'],
            ['3. Exercise Due Care', 'Skill, prudence, and diligence; apply sound professional judgment; appropriate documentation'],
            ['4. Maintain the Standards of the Profession', 'Uphold integrity of profession; report violations by CFP® professionals; cooperate with CFP Board']
          ]
        },
        {
          title: 'Exam Alert: Fiduciary Duty At All Times',
          type: 'warning',
          content: 'Since 2019, CFP® professionals owe fiduciary duty "at all times" when providing Financial Advice—not limited to financial planning engagements. This applies to ALL Financial Advice, even one-off recommendations.'
        },
        {
          title: 'Fiduciary Standard Components',
          type: 'list',
          items: [
            'Duty of Loyalty: Place client\'s interests ahead of your own; avoid or manage conflicts of interest; disclose conflicts that cannot be avoided',
            'Duty of Care: Act with skill, prudence, and diligence; make recommendations in client\'s best interest; consider factors relevant to the client'
          ]
        },
        {
          title: 'Financial Advice vs. Financial Planning',
          type: 'text',
          content: 'Financial Advice is communication applying financial planning considerations to a client\'s situation. It triggers fiduciary duty and applies to one-time advice without requiring a financial plan. Financial Planning is a collaborative process with the 7-step process: (1) Understanding client\'s situation, (2) Identifying and selecting goals, (3) Analyzing current course and alternatives, (4) Developing recommendations, (5) Presenting recommendations, (6) Implementing recommendations, (7) Monitoring progress and updating.'
        },
        {
          title: 'Distinction Between Activities',
          type: 'table',
          headers: ['Activity', 'Fiduciary Duty?', '7-Step Process?'],
          rows: [
            ['Financial Advice', 'Yes', 'No'],
            ['Financial Planning', 'Yes', 'Yes'],
            ['Sales without advice', 'See rules', 'No']
          ]
        },
        {
          title: 'Standards of Conduct Overview',
          type: 'text',
          content: 'The Standards of Conduct are organized into categories: (A) Duties When Providing Financial Advice—fiduciary duty, integrity, competence, diligence, conflict disclosure, sound judgment, professionalism, legal compliance. (B) Duties When Providing Financial Planning—all "A" duties plus agreement requirements, understanding client information, appropriate scope. (C) Duties to Prospective Clients—honesty, accurate representation. (D) Duties to Clients and Prospective Clients—privacy, confidentiality, complete disclosures. (E) Duties to Firms and Subordinates—reasonable supervision, compliance systems. (F) Duties to CFP Board—cooperation, disclosure, compliance.'
        },
        {
          title: 'Memory Aid: HIDS',
          type: 'callout',
          content: 'Code Principles: Honesty, (client) Interest, Due care, Standards'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Fiduciary duty applies AT ALL TIMES when providing Financial Advice',
            'Four Code principles: Honesty/Integrity, Client\'s Best Interest, Due Care, Standards',
            'Financial Planning requires the 7-step process; Financial Advice does not',
            'Both Financial Advice and Financial Planning trigger fiduciary duty',
            'Duty of Loyalty requires placing client interests first'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-PRO-L002',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    title: 'Conflicts of Interest and Duty of Loyalty',
    description: 'Identify common conflicts of interest',
    order: 2,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Common conflicts of interest',
      'Conflict management framework',
      'Compensation-related conflicts',
      'Material vs. non-material conflicts'
    ],
    content: {
      sections: [
        {
          title: 'Understanding Conflicts of Interest',
          type: 'text',
          content: 'A conflict of interest is a circumstance where a CFP® professional\'s interests or duties to third parties conflict (or appear to conflict) with duties to the client. Conflicts fall into three categories: Personal Conflicts (personal financial interest, relationships with providers, personal use of client information), Business Conflicts (proprietary products, revenue sharing, compensation incentives), and Third-Party Conflicts (duties to employer, duties to other clients, referral arrangements).'
        },
        {
          title: 'Conflict Management Framework: ADM',
          type: 'callout',
          content: 'Remember ADM: Avoid, Disclose, Manage. First, try to avoid the conflict entirely by declining to provide advice, referring to another provider, or restructuring arrangement. If you cannot avoid it, disclose BEFORE advice/services with a material conflict description and how the conflict affects advice. Finally, take appropriate steps to manage and mitigate the impact through additional safeguards, independent review, or enhanced documentation.'
        },
        {
          title: 'Critical Disclosure Requirements',
          type: 'warning',
          content: 'Material conflicts MUST be: (1) Disclosed in writing, (2) Disclosed in a clear and detailed manner, (3) Disclosed before or at time of engagement. Failure to properly disclose material conflicts is a serious violation.'
        },
        {
          title: 'Compensation-Related Conflicts',
          type: 'table',
          headers: ['Compensation Type', 'Conflicts', 'Management Strategy'],
          rows: [
            ['Commission-Based', 'Incentive to sell products; bias toward higher commissions', 'Full disclosure; compare lower-cost alternatives; document rationale'],
            ['Fee-Based (AUM)', 'Incentive against distributions', 'Transparency about fee structure; regular fee reviews'],
            ['Hourly', 'Incentive to prolong engagement', 'Transparency; documentation'],
            ['Flat Fee', 'Incentive to minimize work', 'Documentation; regular reviews'],
            ['Third-Party (Revenue sharing, referral fees)', 'Bias toward referring parties', 'Disclose source, amount, and impact on objectivity']
          ]
        },
        {
          title: 'Common Conflict Scenarios',
          type: 'list',
          items: [
            'Proprietary Products: Disclose compensation differential; compare to non-proprietary alternatives; document why proprietary is appropriate',
            'Custody of Client Assets: Use independent custodian; provide regular account statements; segregate duties',
            'Outside Business Activities: Disclose to clients and firm; evaluate impact on recommendations',
            'Gifts and Entertainment: Follow firm policies on limits; disclose when material; decline excessive gifts'
          ]
        },
        {
          title: 'Duty of Loyalty in Practice',
          type: 'text',
          content: 'When making recommendations under the "Best Interests" analysis, consider: client\'s objectives and needs, tax implications, costs and fees, liquidity needs, suitability of product/strategy, and client\'s overall situation. You CANNOT consider: revenue to the CFP® professional, benefits to the firm, or personal relationships with providers.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Conflicts must be avoided, or disclosed AND managed',
            'Material conflicts require written disclosure before engagement',
            'Compensation from any source creates potential conflicts',
            'Duty of Loyalty requires placing client interests first',
            'Document conflict identification, disclosure, and management'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-PRO-L003',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    title: 'The Financial Planning Process',
    description: 'Apply the 7-step financial planning process',
    order: 3,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      '7-step financial planning process',
      'Client engagement requirements',
      'Scope of engagement considerations',
      'Planning documentation'
    ],
    content: {
      sections: [
        {
          title: 'The Seven Steps of Financial Planning',
          type: 'text',
          content: 'The financial planning process consists of seven interconnected steps that guide the CFP® professional through a comprehensive engagement with the client.'
        },
        {
          title: 'Memory Aid: UIAA DPM',
          type: 'callout',
          content: '7 Steps: Understand, Identify goals, Analyze, develop recc(A)mmendations, Develop, Present, iMplement, Monitor'
        },
        {
          title: 'Step 1: Understanding Personal and Financial Circumstances',
          type: 'text',
          content: 'Obtain relevant information including family situation, financial position, current planning, values/attitudes/expectations, and risk tolerance. Gather both quantitative data (assets, liabilities, cash flow) and qualitative data (goals, concerns, preferences).'
        },
        {
          title: 'Step 2: Identifying and Selecting Goals',
          type: 'text',
          content: 'Work with the client to clarify goals, prioritize them, quantify them (amount, timing), and distinguish needs vs. wants. Documentation should include written goal statement, measurable objectives, and timeline for achievement.'
        },
        {
          title: 'Step 3: Analyzing Current and Alternative Courses of Action',
          type: 'text',
          content: 'For current course analysis: Will current strategies achieve goals? Identify gaps and shortfalls. Evaluate existing products/strategies. For alternative analysis: Develop potential strategies, compare alternatives, consider tax implications, and evaluate risks.'
        },
        {
          title: 'Step 4: Developing Recommendations',
          type: 'text',
          content: 'Recommendations must address identified goals, be based on complete analysis, consider all relevant factors, and be suitable for the client. Present alternatives when appropriate with trade-offs explained and rationale documented.'
        },
        {
          title: 'Step 5: Presenting Recommendations',
          type: 'text',
          content: 'Ensure clear communication, explain rationale, address questions, and confirm understanding. Documentation should include written recommendations, assumptions explained, risks disclosed, and client acknowledgment.'
        },
        {
          title: 'Step 6: Implementing Recommendations',
          type: 'text',
          content: 'If CFP® implements: execute recommendations, coordinate with other professionals, document implementation. If client implements: provide clear instructions, referrals if needed, follow-up timeline. Best interest standard applies.'
        },
        {
          title: 'Step 7: Monitoring Progress and Updating',
          type: 'text',
          content: 'Ongoing responsibilities include periodic reviews, updating for life changes, assessing goal progress, and revising as needed. The scope of monitoring should be defined in the engagement agreement.'
        },
        {
          title: 'Written Engagement Agreement Required',
          type: 'warning',
          content: 'Financial Planning engagements MUST have a written agreement covering: scope of engagement, client/planner responsibilities, compensation and conflicts, and duration and termination provisions.'
        },
        {
          title: 'Scope Considerations',
          type: 'list',
          items: [
            'Limited scope is acceptable when: client requests specific focus, client understands limitations, and CFP® documents scope',
            'Limited scope is NOT acceptable when: avoiding material issues, client unaware of gaps, or against client\'s interest',
            'If not competent in an area: decline the engagement, refer to appropriate professional, or collaborate with competent professional'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Financial Planning requires all 7 steps; Financial Advice does not',
            'Written engagement agreement required for Financial Planning',
            'Scope can be limited if client understands and agrees',
            'Monitoring obligations depend on engagement scope',
            'Must be competent in areas where providing advice'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-PRO-L004',
    courseId: 'cfp',
    section: 'CFP-PCR',
    blueprintArea: 'PCR-1',
    title: 'Practice Standards and Professional Responsibility',
    description: 'Apply confidentiality requirements',
    order: 4,
    duration: 25,
    difficulty: 'intermediate',
    topics: [
      'Confidentiality requirements',
      'Supervision obligations',
      'Termination and records',
      'CFP Board inquiries'
    ],
    content: {
      sections: [
        {
          title: 'Confidentiality',
          type: 'text',
          content: 'Client information is confidential and cannot be disclosed without consent. This applies during and after the relationship.'
        },
        {
          title: 'Memory Aid: CLCD - Confidentiality Exceptions',
          type: 'callout',
          content: 'Consent, Legal requirement, CFP Board, Defense of charges'
        },
        {
          title: 'Exceptions to Confidentiality',
          type: 'list',
          items: [
            'Client consents (written preferred)',
            'Legal requirement (subpoena, court order)',
            'Defense of charges against CFP®',
            'CFP Board request during investigation',
            'Disclosure to related parties (accountants, attorneys) working with client'
          ]
        },
        {
          title: 'Information Security',
          type: 'text',
          content: 'Reasonable safeguards are required to protect against unauthorized access. CFP® professionals must have a response plan for breaches.'
        },
        {
          title: 'Supervision Obligations',
          type: 'table',
          headers: ['Role', 'Responsibilities'],
          rows: [
            ['Supervisory CFP®', 'Establish reasonable supervision systems; ensure compliance with Standards; cannot condone violations, pressure subordinates, or create incentives for violations'],
            ['Supervised CFP®', 'Remains individually responsible for personal compliance; cannot blame supervisor for violations; must report supervisor misconduct']
          ]
        },
        {
          title: 'Termination of Services',
          type: 'text',
          content: 'Clients may terminate at any time. CFP® may terminate when: client fails to provide information, client fails to follow recommendations, relationship becomes untenable, or for business considerations. Proper termination requires reasonable notice, transfer assistance if requested, and return of client property/records.'
        },
        {
          title: 'Duties to CFP Board',
          type: 'list',
          items: [
            'Must cooperate with investigations, proceedings, and information requests',
            'Must disclose: criminal convictions, civil proceedings, regulatory actions, bankruptcy, professional designations revoked',
            'Disclosure timing: at initial certification, when changes occur (30 days), biennial renewal',
            'Should report conduct of others that raises concerns (only when in good faith)'
          ]
        },
        {
          title: 'Prohibited Conduct',
          type: 'warning',
          content: 'Examples of prohibited conduct: misleading advertising, guaranteeing results, misappropriating funds, forgery, false statements to CFP Board, obstruction of investigations. Consequences include: private censure, public letter of admonition, suspension, or revocation of certification.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Client information is confidential—exceptions limited',
            'CFP® supervisors must establish reasonable compliance systems',
            'Each CFP® is individually responsible regardless of supervision',
            'Must cooperate with CFP Board investigations and disclose conduct',
            'Termination requires reasonable notice and record transfer'
          ]
        }
      ]
    }
  }
];

export default CFP_PRO1_LESSONS;
