import { Lesson } from '../../types';

export const audLessons: Lesson[] = [
  // ==========================================
  // AREA I: ETHICS, PROFESSIONAL RESPONSIBILITES & GENERAL PRINCIPLES (10 Lessons)
  // ==========================================
  {
    id: 'aud-001',
    section: 'AUD',
    title: 'Nature & Scope of Audit Engagements',
    description: 'Distinguish between Audits, Reviews, Compilations, and Agreement-Upon Procedures.',
    order: 1,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Engagements', 'Scope'],
    content: {
      sections: [
        {
          title: 'The Spectrum of Assurance',
          type: 'table',
          headers: ['Service', 'Assurance Level', 'Conclusion Type'],
          rows: [
            ['Audit', 'Reasonable (High but not absolute)', 'Positive ("In our opinion...")'],
            ['Review', 'Limited (Moderate)', 'Negative ("We are not aware of...")'],
            ['Compilation', 'None', 'None (Disclaimer implied)'],
            ['Agreed-Upon Procedures', 'Varies (Fact-based)', 'Summary of Findings (No opinion)']
          ]
        },
        {
          title: 'Standards Bodies',
          type: 'list',
          content: [
            { term: 'AICPA (SAS)', definition: 'Audits of Non-Issuers (Private Companies).' },
            { term: 'PCAOB (AS)', definition: 'Audits of Issuers (Public Companies).' },
            { term: 'GAO (GAGAS)', definition: 'Government Audits.' },
            { term: 'SSARS', definition: 'Reviews, Compilations, Prep for Non-Issuers.' },
            { term: 'SSAE', definition: 'Attestation engagements (e.g., Forecasts).' }
          ]
        }
      ]
    }
  },
  {
    id: 'aud-002',
    section: 'AUD',
    title: 'AICPA Code of Professional Conduct',
    description: 'Seven principles of professional conduct and the conceptual framework for ethics.',
    order: 2,
    duration: 55,
    difficulty: 'beginner',
    topics: ['Ethics', 'AICPA'],
    content: {
      sections: [
        {
          title: 'The Principles',
          type: 'list',
          content: [
            { term: 'Responsibilities', definition: 'Exercise sensitive professional and moral judgments.' },
            { term: 'Public Interest', definition: 'Honor the public trust.' },
            { term: 'Integrity', definition: 'Highest sense of integrity.' },
            { term: 'Objectivity & Independence', definition: 'Impartial, intellectual honest, free of conflicts.' },
            { term: 'Due Care', definition: 'Competence and diligence.' },
            { term: 'Scope and Nature of Services', definition: 'Observe the principles in determining the scope of services.' }
          ]
        },
        {
          title: 'Conceptual Framework Approach',
          type: 'text',
          content: `When a specific rule does not exist, apply the framework:
1. Identify Threats.
2. Evaluate Significance.
3. Identify and Apply Safeguards.`
        }
      ]
    }
  },
  {
    id: 'aud-003',
    section: 'AUD',
    title: 'Independence: Conceptual Framework',
    description: 'Identifying threats to independence for assurance engagements.',
    order: 3,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Independence', 'Ethics'],
    content: {
      sections: [
        {
          title: 'Independence of Mind vs Appearance',
          type: 'text',
          content: `You must be independent in FACT (mind) and APPEARANCE.
          
**Covered Members:**
• Individual on attest engagement team.
• Individual in position to influence the engagement.
• Partner/Manager who provides > 10 hours of non-attest services to the client.
• Partner in the office where the lead engagement partner practices.`
        },
        {
          title: 'Threats to Independence',
          type: 'list',
          content: [
            { term: 'Adverse Interest', definition: 'Litigation between client and CPA.' },
            { term: 'Advocacy', definition: 'Promoting client shares or acting as an expert witness.' },
            { term: 'Familiarity', definition: 'Long association, close relative employed by client.' },
            { term: 'Management Participation', definition: 'Acting as management (e.g., signing checks).' },
            { term: 'Self-Interest', definition: 'Financial interest in client.' },
            { term: 'Self-Review', definition: 'Auditing your own bookkeeping work.' },
            { term: 'Undue Influence', definition: 'Client threatens to fire firm.' }
          ]
        }
      ]
    }
  },
  {
    id: 'aud-004',
    section: 'AUD',
    title: 'SEC & PCAOB Independence Rules',
    description: 'Stricter rules for public company auditors.',
    order: 4,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['SEC', 'PCAOB', 'Independence'],
    content: {
      sections: [
        {
          title: 'Prohibited Non-Audit Services',
          type: 'text',
          content: `For public audit clients, you CANNOT perform:
• Bookkeeping
• Financial Systems Design/Implementation
• Appraisal/Valuation
• Actuarial Services
• Internal Audit Outsourcing
• Management Functions
• HR Services
• Broker-Dealer Services
• Legal Services`
        },
        {
          title: 'Partner Rotation (SOX Title II)',
          type: 'list',
          content: [
            { term: 'Lead & Concurring Partner', definition: 'Rotate every 5 years. 5 year "time-out".' },
            { term: 'Other Audit Partners', definition: 'Rotate every 7 years. 2 year "time-out".' }
          ]
        },
        {
          title: 'Cooling-Off Period',
          type: 'text',
          content: `If a CEO, CFO, Controller, or CAO was employed by the audit firm and worked on the audit, there is a **1-year cooling-off period** before the firm can audit that company.`
        }
      ]
    }
  },
  {
    id: 'aud-005',
    section: 'AUD',
    title: 'Conflicts of Interest & Threats',
    description: 'Navigating ethical conflicts.',
    order: 5,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Ethics', 'Conflict'],
    content: {
      sections: [
        {
          title: 'Examples of Conflicts',
          type: 'list',
          content: [
            { term: 'Divorce', definition: 'Representing both husband and wife in a divorce settlement.' },
            { term: 'Investment', definition: 'Suggesting a client invest in a business the CPA owns.' }
          ]
        },
        {
          title: 'Resolution',
          type: 'text',
          content: `If a conflict exists, it must be **disclosed** and **consented** to by relevant parties, provided the CPA believes they can remain objective. If objectivity is impaired, the CPA must withdraw.`
        }
      ]
    }
  },
  {
      id: 'aud-006',
      section: 'AUD',
      title: 'Engagement Letters & Acceptance',
      description: 'Pre-conditions for an audit and the contract with the client.',
      order: 6,
      duration: 40,
      difficulty: 'beginner',
      topics: ['Planning', 'Engagement'],
      content: {
          sections: [
              {
                  title: 'Pre-conditions',
                  type: 'text',
                  content: `Before accepting:
1. Determine if financial reporting framework is acceptable.
2. Obtain agreement from management that they acknowledge their responsibilities (Internal Control, Access to Evidence).`
              },
              {
                  title: 'Predecessor Auditor',
                  type: 'warning',
                  content: `You **MUST** attempt to communicate with the predecessor auditor (with client permission).
                  
**Ask about:**
• Management integrity.
• Disagreements with management.
• Reasons for change.
• Fraud/Non-compliance communicates.
• Related parties.`
              }
          ]
      }
  },
  {
      id: 'aud-007',
      section: 'AUD',
      title: 'Communications with Governance',
      description: 'What must be communicated to the Audit Committee.',
      order: 7,
      duration: 50,
      difficulty: 'intermediate',
      topics: ['Communication', 'Governance'],
      content: {
          sections: [
              {
                  title: 'Required Communications',
                  type: 'list',
                  content: [
                      { term: 'Planned Scope and Timing', definition: 'Overview, not specific details of tests.' },
                      { term: 'Significant Findings', definition: 'Accounting policies chosen, estimates, difficulties encountered.' },
                      { term: 'Uncorrected Misstatements', definition: 'List of errors found but not fixed (immaterial).' },
                      { term: 'Independence', definition: ' reaffirm independence (for issuers).' }
                  ]
              }
          ]
      }
  },
  {
      id: 'aud-008',
      section: 'AUD',
      title: 'Quality Management Standards (SQMS)',
      description: 'System of quality control for the CPA firm itself.',
      order: 8,
      duration: 55,
      difficulty: 'advanced',
      topics: ['Quality Control', 'SQMS'],
      content: {
          sections: [
              {
                  title: 'New SQMS Model',
                  type: 'text',
                  content: `Moved from "Quality Control" to "Quality Management" (Risk-based approach).
                  
**8 Components:**
1. Risk Assessment Process.
2. Governance and Leadership.
3. Relevant Ethical Requirements.
4. Acceptance and Continuance.
5. Engagement Performance.
6. Resources (Human, Tech).
7. Information and Communication.
8. Monitoring and Remediation.`
              }
          ]
      }
  },

  // ==========================================
  // AREA II: ASSESSING RISK & DEVELOPING RESPONSE (12 Lessons)
  // ==========================================
  {
      id: 'aud-011',
      section: 'AUD',
      title: 'Materiality: Planning & Performance',
      description: 'Defining what matters to the user of financial statements.',
      order: 11,
      duration: 55,
      difficulty: 'intermediate',
      topics: ['Materiality', 'Planning'],
      content: {
          sections: [
              {
                  title: 'Levels of Materiality',
                  type: 'list',
                  content: [
                      { term: 'Materiality for F/S as a Whole', definition: 'The Big Number. Usually % of Income, Assets, or Revenue.' },
                      { term: 'Performance Materiality', definition: '"Safety buffer". Lower than FS materiality to reduce probability of undetected aggregates exceeding limit.' },
                      { term: 'Tolerable Misstatement', definition: 'Application of performance materiality to a specific sampling procedure.' }
                  ]
              },
              {
                  title: 'Qualitative Factors',
                  type: 'text',
                  content: `An error can be quantitatively small but qualitatively material if it:
• Changes income to loss.
• Meets a debt covenant.
• Affects management compensation.
• Is fraudulent.`
              }
          ]
      }
  },
  {
      id: 'aud-012',
      section: 'AUD',
      title: 'Audit Risk Model',
      description: 'AR = IR x CR x DR',
      order: 12,
      duration: 60,
      difficulty: 'advanced',
      topics: ['Audit Risk', 'Risk Assessment'],
      content: {
          sections: [
              {
                  title: 'The Equation',
                  type: 'text',
                  content: `**Audit Risk (AR) = RMM × Detection Risk (DR)**
**RMM = Inherent Risk (IR) × Control Risk (CR)**
                  
Thus: **AR = IR × CR × DR**`
              },
              {
                  title: 'Who Controls What?',
                  type: 'list',
                  content: [
                      { term: 'Inherent Risk', definition: 'Client/Environment. (e.g., Crypto is inherently riskier than Retail).' },
                      { term: 'Control Risk', definition: 'Client. (Did they install good controls?).' },
                      { term: 'Detection Risk', definition: 'AUDITOR. We control this by doing more/less work.' }
                  ]
              },
              {
                  title: 'The Relationship',
                  type: 'warning',
                  content: `If RMM is **High**, we must set Detection Risk to **Low** to keep Audit Risk acceptable.
                  
Low Detection Risk = **More Work** (Larger samples, more experienced staff, year-end testing).`
              }
          ]
      }
  },
  {
      id: 'aud-013',
      section: 'AUD',
      title: 'Internal Control: COSO Framework',
      description: 'The Cube: CRIME.',
      order: 13,
      duration: 65,
      difficulty: 'intermediate',
      topics: ['Internal Control', 'COSO'],
      content: {
          sections: [
              {
                  title: 'The 5 Components (CRIME)',
                  type: 'list',
                  content: [
                      { term: 'Control Environment', definition: '"Tone at the Top", Ethics, HR policies.' },
                      { term: 'Risk Assessment', definition: 'Management\'s identification of risks.' },
                      { term: 'Information & Communication', definition: 'Recording transactions, communicating roles.' },
                      { term: 'Monitoring', definition: 'Internal audit, ongoing evaluation.' },
                      { term: 'Existing Control Activities', definition: 'Policies/procedures (PAID TIPS).' }
                  ]
              }
          ]
      }
  },

  // ==========================================
  // AREA III: PERFORMING PROCEDURES & EVIDENCE (15 Lessons)
  // ==========================================
  {
      id: 'aud-023',
      section: 'AUD',
      title: 'Audit Evidence: Sufficiency & Appropriateness',
      description: 'What constitutes good evidence?',
      order: 23,
      duration: 50,
      difficulty: 'beginner',
      topics: ['Evidence'],
      content: {
          sections: [
              {
                  title: 'Sufficiency vs Appropriateness',
                  type: 'text',
                  content: `• **Sufficiency:** Quantity (Sample size).
• **Appropriateness:** Quality (Reliability and Relevance).`
              },
              {
                  title: 'Hierarchy of Reliability (AEIOU)',
                  type: 'list',
                  content: [
                      { term: 'A - Auditor Knowledge', definition: 'Direct observation/calculation. (Best)' },
                      { term: 'E - External Evidence', definition: 'Sent directly to auditor (Confirmations, Bank Statements).' },
                      { term: 'I - Internal Evidence', definition: 'Generated by client (Invoices, Ledgers). Weak unless controls are good.' },
                      { term: 'O - Oral Evidence', definition: 'Inquiries of management. (Worst)' }
                  ]
              }
          ]
      }
  },
  {
      id: 'aud-024',
      section: 'AUD',
      title: 'External Confirmations',
      description: 'Positive vs Negative confirmations for AR and Cash.',
      order: 24,
      duration: 45,
      difficulty: 'intermediate',
      topics: ['Confirmations', 'Evidence'],
      content: {
          sections: [
              {
                  title: 'Positive Confirmations',
                  type: 'text',
                  content: `Request a reply **always** (agree or disagree).
• Use when accounts are large, or errors are expected.
• If no reply: Perform alternative procedures (subsequent cash receipts).`
              },
              {
                  title: 'Negative Confirmations',
                  type: 'text',
                  content: `Request a reply **only if they disagree**.
• Use only when: RMM is low, many small balances, and customers are likely to read/respond.`
              }
          ]
      }
  },

  // ==========================================
  // AREA IV: REPORTING (13 Lessons)
  // ==========================================
  {
      id: 'aud-038',
      section: 'AUD',
      title: 'Unmodified Audit Opinion',
      description: 'The standard "Clean" opinion format.',
      order: 38,
      duration: 50,
      difficulty: 'beginner',
      topics: ['Reporting', 'Opinion'],
      content: {
          sections: [
              {
                  title: 'Report Sections (Private - AICPA)',
                  type: 'list',
                  content: [
                      { term: 'Title', definition: 'Must include "Independent".' },
                      { term: 'Opinion', definition: 'First section. "In our opinion... present fairly..."' },
                      { term: 'Basis for Opinion', definition: 'Compliance with GAAS, Independence.' },
                      { term: 'Responsibilities of MGT', definition: 'Internal control, Going Concern.' },
                      { term: 'Responsibilities of Auditor', definition: 'Reasonable assurance, Professional Judgment.' }
                  ]
              },
              {
                  title: 'Critical Audit Matters (CAMs)',
                  type: 'text',
                  content: `Required for **Public (Issuer)** audits only. Matters communicated to the audit committee that involved challenging/subjective judgment.`
              }
          ]
      }
  },
  {
      id: 'aud-039',
      section: 'AUD',
      title: 'Modified Opinions',
      description: 'Qualified, Adverse, and Disclaimer.',
      order: 39,
      duration: 60,
      difficulty: 'advanced',
      topics: ['Reporting', 'Modifications'],
      content: {
          sections: [
              {
                  title: 'The Decision Tree',
                  type: 'table',
                  headers: ['Nature of Issue', 'Material', 'Material & Pervasive'],
                  rows: [
                      ['GAAP Departure (Misstatement)', 'Qualified ("Except for")', 'Adverse ("Do not present fairly")'],
                      ['GAAS Issue (Scope Limitation)', 'Qualified ("Except for")', 'Disclaimer ("We do not express an opinion")']
                  ]
              },
              {
                  title: 'Pervasive',
                  type: 'text',
                  content: `Pervasive means it affects a substantial portion of the statements, or is fundamental to user understanding (e.g., cash, or if the whole company is a fraud).`
              }
          ]
      }
  }
];
