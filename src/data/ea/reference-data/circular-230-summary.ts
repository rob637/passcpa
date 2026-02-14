/**
 * Circular 230 Comprehensive Summary
 * Professional ethics and conduct for IRS practitioners
 */

export const CIRCULAR_230_SUMMARY = {
  title: 'Circular 230: Regulations Governing Practice Before the IRS',
  fullTitle: 'Treasury Department Circular No. 230',
  authority: '31 U.S.C. § 330',
  lastRevised: 'June 2014 (with updates)',

  // ============================================
  // SUBPART A: Authority to Practice
  // ============================================
  subpartA: {
    title: 'Rules Governing Authority to Practice',
    sections: {
      '10.1': {
        title: 'Offices',
        summary: 'IRS Office of Professional Responsibility (OPR) administers practitioner conduct',
      },
      '10.2': {
        title: 'Definitions',
        keyTerms: [
          { term: 'Practice', definition: 'Representing taxpayers before IRS in all matters' },
          { term: 'Practitioner', definition: 'Attorneys, CPAs, EAs, enrolled actuaries, enrolled retirement plan agents' },
          { term: 'Tax Return Preparer', definition: 'Any person who prepares or assists in preparing returns for compensation' },
        ],
      },
      '10.3': {
        title: 'Who May Practice',
        practitioners: [
          { type: 'Attorneys', enrollment: 'Bar membership', rights: 'Unlimited' },
          { type: 'CPAs', enrollment: 'State license', rights: 'Unlimited' },
          { type: 'Enrolled Agents', enrollment: 'SEE exam or IRS experience', rights: 'Unlimited' },
          { type: 'Enrolled Actuaries', enrollment: 'Joint Board certification', rights: 'Limited to actuarial matters' },
          { type: 'Enrolled Retirement Plan Agents', enrollment: 'ERPA exam', rights: 'Limited to retirement plans' },
        ],
      },
      '10.4': {
        title: 'Eligibility to Become an Enrolled Agent',
        requirements: [
          'Pass all three parts of SEE (within 3-year window)',
          'Pass tax compliance check',
          'Pass suitability check (background)',
          'Apply on Form 23',
        ],
        alternativePath: '5+ years IRS experience in interpretation/application of tax code',
      },
      '10.5': {
        title: 'Enrollment Application',
        fee: 67,
        expirationDate: 'Last day of birth month, 3-year cycle',
        renewalWindow: 'Within 1 year preceding expiration',
      },
      '10.6': {
        title: 'Continuing Education',
        requirements: {
          hours: 72,
          period: '3-year enrollment cycle',
          hoursPerYear: 'Minimum 16 per year',
          ethicsRequired: 2,
          ethicsPeriod: 'Per year',
        },
        waiver: 'May request for health, military, or other compelling circumstances',
      },
      '10.7': {
        title: 'Limited Practice Without Enrollment',
        categories: [
          {
            person: 'Individual taxpayer',
            scope: 'Own personal matters',
            condition: 'No compensation',
          },
          {
            person: 'Corporate officer/employee',
            scope: 'Employer matters',
            condition: 'Regular employment',
          },
          {
            person: 'Partnership member/employee',
            scope: 'Partnership matters',
            condition: 'Regular employment',
          },
          {
            person: 'Trust fiduciary/employee',
            scope: 'Trust matters',
            condition: 'As fiduciary',
          },
          {
            person: 'Return preparer (AFSP)',
            scope: 'Returns they prepared',
            condition: 'Correspondence/audits only, for returns prepared',
          },
        ],
      },
    },
  },

  // ============================================
  // SUBPART B: Duties and Restrictions
  // ============================================
  subpartB: {
    title: 'Duties and Restrictions Relating to Practice Before the IRS',
    sections: {
      '10.20': {
        title: 'Information to Be Furnished',
        duties: [
          'Promptly submit records/information when lawfully requested by IRS',
          'Provide true and accurate information',
          'Cannot interfere with IRS efforts to obtain information',
        ],
        exceptions: ['Privileged communications', 'Assertion of constitutional rights'],
      },
      '10.21': {
        title: 'Knowledge of Client Omission',
        requirement: 'Notify client promptly of any error or omission',
        consequence: 'Practitioner must advise of consequences of noncompliance',
        note: 'Decision to correct is client\'s; practitioner must withdraw if client refuses and continues noncompliance',
      },
      '10.22': {
        title: 'Due Diligence',
        standards: [
          'Exercise due diligence in preparing, approving, and filing returns',
          'Exercise due diligence in oral and written representations to IRS',
          'Exercise due diligence in determining correctness of representations to clients',
        ],
        meaning: 'Reasonable inquiry into facts, not blind acceptance',
      },
      '10.23': {
        title: 'Prompt Disposition of Pending Matters',
        requirement: 'Take reasonable steps to ensure prompt disposition of IRS matters',
      },
      '10.24': {
        title: 'Assistance from Disbarred/Suspended Persons',
        prohibition: 'Cannot accept assistance from disbarred persons if would constitute practice',
        exceptions: 'Clerical work under direct supervision permitted',
      },
      '10.25': {
        title: 'Practice by Partners and Associates',
        rule: 'Practitioners in the same firm must ensure compliance with Circular 230',
        management: 'Partner with supervisory authority must take reasonable steps to ensure compliance',
      },
      '10.26': {
        title: 'Notaries',
        prohibition: 'Practitioner cannot act as notary with respect to any matter they have material interest',
      },
      '10.27': {
        title: 'Fees',
        permitted: ['Flat fees', 'Hourly fees', 'Retainer fees', 'Value-based fees'],
        contingent: {
          prohibited: [
            'Original tax return preparation',
            'Amended returns for positions not under examination',
          ],
          permitted: [
            'IRS examination or challenge',
            'Claims for refund or credit where amount in dispute',
            'Judicial proceedings arising from IRS determinations',
          ],
        },
        unconscionable: 'Cannot charge unconscionable fees',
      },
      '10.28': {
        title: 'Return of Client Records',
        requirement: 'Promptly return client records upon request',
        exception: 'May retain copies; dispute over fees does not justify withholding records needed by client for compliance',
        records: 'Client papers and any other documents given by client',
      },
      '10.29': {
        title: 'Conflicting Interests',
        prohibition: 'Cannot represent clients with conflicting interests',
        exception: {
          conditions: [
            'Practitioner reasonably believes they can provide competent representation',
            'All affected clients give informed consent in writing',
          ],
        },
        example: 'Representing both buyer and seller unless both consent',
      },
      '10.30': {
        title: 'Solicitation',
        permitted: [
          'Truthful advertising',
          'Direct targeted solicitations (mail, email)',
          'Seeking employment from former clients',
        ],
        prohibited: [
          'False or misleading communications',
          'Coercion, duress, or harassment',
          'Uninvited in-person solicitation',
          'Implied government connection',
          'Using IRS as referral source',
        ],
        labels: {
          required: 'Fee information must use "enrolled agent" or "enrolled to practice"',
          prohibited: 'Cannot imply special relationship with IRS',
        },
      },
      '10.31': {
        title: 'Negotiation of Taxpayer Checks',
        prohibition: 'Cannot endorse or negotiate refund checks issued to clients',
        penalty: '$600 per check',
      },
      '10.33': {
        title: 'Best Practices for Tax Advisors',
        practices: [
          'Communicate clearly terms of engagement',
          'Establish relevant facts and evaluate applicable law',
          'Advise client of legal conclusions reached',
          'Act fairly and with integrity',
        ],
        note: 'These are aspirational but important standards',
      },
      '10.34': {
        title: 'Standards for Returns and Documents',
        positions: {
          taxReturns: {
            standard: 'Realistic possibility of success on merits (roughly 1 in 3)',
            disclosure: 'If below realistic possibility, must have reasonable basis AND disclose',
          },
          advising: 'More likely than not standard for written advice on listed transactions',
        },
        wilful: 'Cannot wilfully sign return with false information',
        pattern: 'Cannot take position that reflects pattern undermining system',
      },
      '10.35': {
        title: 'Competence',
        requirement: 'Practitioners must possess necessary competence to handle matters',
        includes: ['Knowledge', 'Skill', 'Thoroughness', 'Preparation'],
      },
      '10.36': {
        title: 'Procedures to Ensure Compliance',
        requirement: 'Firm must have procedures to ensure members comply with Circular 230',
        responsibility: 'Partner with management authority responsible for compliance',
      },
      '10.37': {
        title: 'Written Advice Requirements',
        requirements: [
          'Cannot give written advice that has inadequate factual basis',
          'Cannot rely on unreasonable factual assumptions',
          'Cannot unreasonably rely on representations of taxpayer',
          'Must consider all relevant facts',
          'Cannot take into account possibility of audit',
        ],
        covered: 'Written tax advice including emails',
      },
    },
  },

  // ============================================
  // SUBPART C: Sanctions
  // ============================================
  subpartC: {
    title: 'Sanctions for Violation of Regulations',
    sections: {
      '10.50': {
        title: 'Sanctions',
        types: [
          {
            sanction: 'Censure',
            description: 'Public reprimand',
            severity: 'Least severe',
          },
          {
            sanction: 'Suspension',
            description: 'Temporary loss of practice rights',
            duration: 'Specified time period',
          },
          {
            sanction: 'Disbarment',
            description: 'Permanent loss of practice rights',
            severity: 'Most severe',
          },
          {
            sanction: 'Monetary Penalty',
            description: 'Civil penalty for violations',
            maxFirm: 'Gross income derived from conduct',
            maxIndividual: 'Gross income derived + $50,000',
          },
        ],
      },
      '10.51': {
        title: 'Incompetence and Disreputable Conduct',
        examples: [
          'Conviction of any felony under federal tax laws',
          'Conviction of any crime involving dishonesty or breach of trust',
          'Giving false or misleading information to Treasury',
          'Willfully failing to file federal tax returns',
          'Willfully evading or defrauding taxes',
          'Misappropriating client funds',
          'Directly or indirectly attempting to influence IRS employee',
          'Denial of admission to practice (disbarment) by any court or licensing authority',
          'Contemptuous conduct before IRS',
          'Giving false opinion to avoid penalties',
        ],
      },
      '10.52': {
        title: 'Violations Subject to Sanction',
        triggers: [
          'Willfully violating any provision of Circular 230',
          'Recklessly or through gross incompetence violating §§10.34, 10.35, 10.36, 10.37',
          'Engaging in disreputable conduct per §10.51',
        ],
        standardOfProof: 'Clear and convincing evidence (OPR burden)',
      },
      '10.53': {
        title: 'Receipt of Information Concerning Practitioners',
        process: [
          'OPR may receive complaints from any source',
          'OPR investigates and may issue complaint',
          'Respondent has opportunity to contest',
        ],
      },
    },
  },

  // ============================================
  // SUBPART D: Disciplinary Proceedings
  // ============================================
  subpartD: {
    title: 'Rules Applicable to Disciplinary Proceedings',
    process: [
      { step: 1, action: 'Complaint filed by OPR', description: 'States facts and violations alleged' },
      { step: 2, action: 'Service of complaint', description: 'Sent to practitioner\'s last known address' },
      { step: 3, action: 'Answer by respondent', description: '30 days to respond' },
      { step: 4, action: 'Discovery and hearing', description: 'Before Administrative Law Judge' },
      { step: 5, action: 'ALJ decision', description: 'Initial decision issued' },
      { step: 6, action: 'Appeal to Secretary', description: '30 days to appeal' },
      { step: 7, action: 'Final decision', description: 'Secretary\'s decision is final' },
    ],
    expedited: 'Immediate suspension available in cases of serious threat',
    publicRecord: 'Disciplinary actions published except for private reprimands',
  },

  // ============================================
  // SUBPART E: General Provisions
  // ============================================
  subpartE: {
    title: 'General Provisions',
    sections: {
      '10.79': {
        title: 'Representation of Taxpayers',
        requirement: 'Written declaration that practitioner is authorized and qualified',
        form: 'Form 2848 or Form 8821',
      },
      '10.81': {
        title: 'Petition to Reinstate Enrollment',
        eligibility: 'After expiration of suspension/disbarment period',
        requirements: [
          'Demonstrated good character',
          'Competence in technical matters',
          'Continued education during suspension',
        ],
      },
    },
  },

  // ============================================
  // Key Exam Topics
  // ============================================
  examFocus: {
    highFrequency: [
      { topic: 'Due Diligence (10.22)', points: 'Core duty - reasonable inquiry into facts' },
      { topic: 'Contingent Fees (10.27)', points: 'Prohibited on original returns; allowed for exam/refund claims' },
      { topic: 'Client Records (10.28)', points: 'Must return promptly upon request' },
      { topic: 'Conflicts of Interest (10.29)', points: 'Written consent required from all parties' },
      { topic: 'Sanctions (10.50)', points: 'Censure, suspension, disbarment, monetary' },
      { topic: 'Error Discovery (10.21)', points: 'Promptly notify client; client decides action' },
      { topic: 'Written Advice (10.37)', points: 'Cannot rely on audit lottery; must have factual basis' },
      { topic: 'CE Requirements (10.6)', points: '72 hours per 3-year cycle; 2 ethics per year' },
    ],
    commonMisconceptions: [
      { wrong: 'Practitioner can file amended return without client consent', right: 'Client must authorize any filing' },
      { wrong: 'Contingent fees are always prohibited', right: 'Allowed for refund claims under examination' },
      { wrong: 'Private reprimands are public', right: 'Only public censure is publicly disclosed' },
      { wrong: 'EA can sign notarized documents for own clients', right: 'Cannot notarize own matters per 10.26' },
    ],
    mnemonics: [
      { name: 'ACE', meaning: 'Attorneys, CPAs, Enrolled Agents - unlimited practice' },
      { name: 'DRIP', meaning: 'Due Diligence, Return Records, Inform of Error, Promptly Dispose' },
      { name: 'CSD', meaning: 'Censure (least), Suspension, Disbarment (most severe)' },
    ],
  },

  // ============================================
  // Quick Reference Tables
  // ============================================
  quickReference: {
    sanctions: [
      { level: 1, name: 'Censure', description: 'Public reprimand; can continue practice', appeal: 'Yes' },
      { level: 2, name: 'Suspension', description: 'Temporary ban from practice', appeal: 'Yes' },
      { level: 3, name: 'Disbarment', description: 'Permanent ban from practice', appeal: 'Yes' },
      { level: 4, name: 'Monetary', description: 'Financial penalty up to $50K + gross income', appeal: 'Yes' },
    ],
    fees: {
      prohibited: ['Contingent on original returns', 'Unconscionable fees'],
      permitted: ['Flat', 'Hourly', 'Retainer', 'Contingent on exam/refund claims'],
    },
    practiceRights: {
      unlimited: ['Attorney', 'CPA', 'Enrolled Agent'],
      limited: ['Enrolled Actuary', 'ERPA', 'AFSP (returns prepared only)'],
      none: ['Unenrolled preparer (unless AFSP)', 'Disbarred/suspended'],
    },
    dueDiligence: {
      EITC: { form: 'Form 8867', penalty: 635 },
      CTC: { form: 'Form 8867', penalty: 635 },
      AOTC: { form: 'Form 8867', penalty: 635 },
      HOH: { form: 'Form 8867', penalty: 635 },
    },
  },
};

// Helper functions
export function getSanctionByLevel(level: 1 | 2 | 3 | 4) {
  return CIRCULAR_230_SUMMARY.quickReference.sanctions.find(s => s.level === level);
}

export function getPractitionerRights(type: string) {
  const { unlimited, limited } = CIRCULAR_230_SUMMARY.quickReference.practiceRights;
  if (unlimited.includes(type)) return 'Unlimited';
  if (limited.includes(type)) return 'Limited';
  return 'None';
}

export function getCERequirements() {
  return CIRCULAR_230_SUMMARY.subpartA.sections['10.6'].requirements;
}
