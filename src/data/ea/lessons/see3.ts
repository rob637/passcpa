/**
 * EA Part 3: Representation, Practices, and Procedures - Lesson Content
 * Special Enrollment Examination (SEE)
 * 
 * Complete lesson content for Part 3 covering:
 * - Circular 230 (Practice before the IRS)
 * - Tax preparer responsibilities
 * - IRS procedures and collections
 * - Audit and appeals processes
 * - Specific types of representation
 * 
 * Based on IRS SEE Content Outline and Circular 230
 * Current as of December 31, 2024
 */

import { Lesson } from '../../../types';

export const eaPart3Lessons: Lesson[] = [
  // ============================================================================
  // SEE3-1: PRACTICES AND PROCEDURES (Lessons 1-12)
  // ============================================================================
  
  {
    id: 'SEE3-001',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Who May Practice Before the IRS',
    description: 'Understand who is authorized to represent taxpayers before the IRS',
    order: 1,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Enrolled agents', 'CPAs', 'Attorneys', 'Limited practice'],
    blueprintArea: 'SEE3-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "As an Enrolled Agent, you'll have the right to represent taxpayers before the IRS. Understanding who can practice, what 'practice' means, and the different levels of authorization is fundamental to your professional role.",
        },
        {
          title: 'Practice Before the IRS Defined',
          type: 'text',
          content: "**What is Practice Before the IRS?**\n\nAll matters connected with a presentation to the IRS or any of its officers or employees relating to a taxpayer's rights, privileges, or liabilities under laws or regulations administered by the IRS.\n\n**Includes:**\n• Preparing documents\n• Filing documents\n• Corresponding and communicating with the IRS\n• Rendering written advice about the above\n• Representing a client at conferences, hearings, and meetings",
        },
        {
          title: 'Practitioners with Unlimited Practice Rights',
          type: 'table',
          headers: ['Type', 'Authorization', 'Requirements'],
          rows: [
            ['Enrolled Agent (EA)', 'Unlimited', 'Pass SEE or IRS experience, background check, continuing education'],
            ['Attorney', 'Unlimited', 'Member in good standing of state bar'],
            ['CPA', 'Unlimited', 'Licensed, in good standing'],
            ['Enrolled Retirement Plan Agent', 'Limited to ERISA matters', 'Pass ERPA exam'],
            ['Enrolled Actuary', 'Limited to actuarial matters', 'JBEA enrollment'],
          ],
        },
        {
          title: 'Limited Practice Rights',
          type: 'text',
          content: "**Unenrolled Return Preparer:**\nCan represent taxpayers ONLY:\n• Before revenue agents, customer service reps, and similar IRS personnel\n• For returns THEY prepared and signed\n• Not for Appeals, Collections, Counsel, or other offices\n\n**Annual Filing Season Program (AFSP):**\nUnenrolled tax Return preparers who complete annual requirements:\n• Limited representation rights (same as unenrolled)\n• Listed in IRS directory\n• Must complete continuing education annually\n\n**Students/LITC Participants:**\nCan represent in limited circumstances with practitioner supervision",
        },
        {
          title: 'Special Appearances',
          type: 'text',
          content: "**Taxpayer May Represent Self:**\nAny individual can represent themselves.\n\n**Others Who May Appear:**\n• Family members (with some restrictions)\n• Officers/employees of corporations\n• General partners of partnerships\n• Trustees, administrators of trusts/estates\n• Witnesses\n\n**Power of Attorney Not Required:**\nFor appearing as a witness or providing information",
        },
        {
          title: '🧠 Memory Aid: EA Practice Rights',
          type: 'callout',
          content: "**EAs have \"Unlimited\" practice rights meaning:**\n\n• ANY tax matter\n• ANY IRS office (including Appeals, Collections, Counsel)\n• ANY taxpayer (not just returns you prepared)\n• ANY tax year or period\n\n**Same as attorneys and CPAs - no limitations!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Practice = representing taxpayers in IRS matters",
            "EAs, CPAs, and Attorneys have unlimited practice rights",
            "Enrolled Retirement Plan Agents limited to retirement plan matters",
            "Unenrolled preparers can only represent on returns they prepared",
            "AFSP provides limited representation with annual CE requirements",
            "Taxpayers can always represent themselves",
            "Corporate officers can represent their corporations",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-002',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Power of Attorney and Authorizations',
    description: 'Master the forms and requirements for representing taxpayers',
    order: 2,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Form 2848', 'Form 8821', 'CAF number'],
    blueprintArea: 'SEE3-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "You can't represent a client without proper authorization! Form 2848 is your key to acting on behalf of clients. Understanding when and how to use each authorization form is essential to your practice.",
        },
        {
          title: 'Form 2848: Power of Attorney',
          type: 'text',
          content: "**What Form 2848 Authorizes:**\n\n• Represent the taxpayer before the IRS\n• Receive confidential tax information\n• Perform all acts the taxpayer can perform (unless restricted)\n• Sign certain documents on behalf of taxpayer\n\n**Key Elements:**\n• Specific tax matters (tax form, years/periods)\n• Representative's CAF number\n• Taxpayer's signature (electronic allowed)\n• Representative's signature and declaration\n\n**Doesn't Grant:**\n• Right to cash refund checks\n• Power to sign return (need separate power)",
        },
        {
          title: 'Form 8821: Tax Information Authorization',
          type: 'text',
          content: "**What Form 8821 Authorizes:**\n\n• Designee can RECEIVE and INSPECT confidential tax information\n• Does NOT authorize representation\n\n**Common Uses:**\n• Third parties who need tax information (lenders, attorneys)\n• Obtaining transcripts for a client\n• When you only need information, not representation\n\n**Key Difference from 2848:**\nNo authority to represent or advocate for taxpayer",
        },
        {
          title: 'Comparison: Authorization Forms',
          type: 'table',
          headers: ['Feature', 'Form 2848', 'Form 8821'],
          rows: [
            ['Receive tax information', 'Yes', 'Yes'],
            ['Represent before IRS', 'Yes', 'No'],
            ['Advocate on behalf of taxpayer', 'Yes', 'No'],
            ['Perform acts for taxpayer', 'Yes', 'No'],
            ['Appear at IRS meetings', 'Yes', 'No'],
            ['Who can use', 'Authorized practitioners', 'Anyone'],
          ],
        },
        {
          title: 'CAF Number',
          type: 'text',
          content: "**Centralized Authorization File (CAF):**\n\n• Unique number assigned to representatives\n• Links you to all clients in IRS system\n• Include on all POA forms\n• Allows IRS to verify your authorization\n\n**How to Get CAF Number:**\n• Request when first filing Form 2848\n• Or submit Form 2848 to CAF unit\n• Assigned automatically and returned to you\n• Keep it - you use it for your entire career!",
        },
        {
          title: 'Revoking or Replacing POA',
          type: 'text',
          content: "**Taxpayer Revocation:**\n• Written statement to IRS\n• Copy to representative\n• Effective upon receipt\n\n**Representative Withdrawal:**\n• Written statement to IRS\n• Copy to taxpayer\n• Effective upon receipt\n\n**New POA Replaces Old:**\nFiling new Form 2848 for same tax matter automatically revokes prior POA unless 'add' is specified.\n\n**Death of Taxpayer:**\nPOA terminates upon taxpayer's death - executor must grant new authorization.",
        },
        {
          title: '⚠️ Exam Trap: Signing Authority',
          type: 'warning',
          content: "**Form 2848 Does NOT Give Authority to Sign Returns!**\n\nSeparate authorization required to sign a return for a taxpayer:\n• Specified on Form 2848, or\n• Separate power of attorney document, or\n• Court-appointed authority\n\n**Exception:** Practitioner must sign the return if they're not appearing as representative (as preparer).",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Form 2848 = Power of Attorney (representation rights)",
            "Form 8821 = Information only (no representation)",
            "CAF number identifies you in IRS authorization system",
            "New POA for same matter revokes prior POA (unless added)",
            "Signing authority requires explicit grant",
            "POA terminates upon taxpayer's death",
            "Taxpayer or representative can revoke at any time",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-003',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Circular 230: Duties and Restrictions',
    description: 'Understand the ethical requirements governing practice before the IRS',
    order: 3,
    duration: 60,
    difficulty: 'intermediate',
    topics: ['Duties', 'Restrictions', 'Incompetence', 'Disreputable conduct'],
    blueprintArea: 'SEE3-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Circular 230 is the Bible of EA practice! These Treasury regulations govern everything you do as a practitioner. Violations can result in suspension or disbarment. Know these rules cold - they're heavily tested!",
        },
        {
          title: 'Subpart A: Rules Governing Authority',
          type: 'text',
          content: "**Key Subpart A Provisions:**\n\n• Who may practice before the IRS\n• Enrollment and renewal requirements\n• PTIN requirements\n• Continuing education requirements\n\n**EA Requirements:**\n• 72 hours of CE every 3-year period\n• Minimum 16 hours per year\n• 2 hours of ethics per year\n• 6 hours of federal tax law updates per cycle",
        },
        {
          title: 'Subpart B: Duties Relating to Practice',
          type: 'text',
          content: "**Key Duties (Section 10.22):**\n\n**Due Diligence:**\n• Must exercise due diligence in preparing returns\n• Determining correctness of representations to IRS\n• Determining correctness of representations to clients\n\n**Must Know or Have Good Faith Belief:**\nPositions taken have realistic possibility of being sustained if challenged.",
        },
        {
          title: 'Duties and Obligations',
          type: 'table',
          headers: ['Duty', 'Requirement', 'Reference'],
          rows: [
            ['Due Diligence', 'Exercise care in all matters', '§10.22'],
            ['Prompt Disposition', 'Handle matters without delay', '§10.23'],
            ['Return Client Records', 'Return upon request', '§10.28'],
            ['Knowledge of Client Omission', 'Advise client of error', '§10.21'],
            ['Diligence as to Accuracy', 'Verify information reasonably', '§10.34'],
          ],
        },
        {
          title: 'Client Records - Section 10.28',
          type: 'text',
          content: "**Must Return to Client Upon Request:**\n• Records necessary for client to comply with tax obligations\n• Include all client-provided records\n\n**May Retain:**\n• Copies of records you created/own\n• Work product (if fee paid)\n• Documents you prepared (if fee paid)\n\n**Fee Dispute Does NOT Justify:**\nRefusing to return client records necessary for compliance\n\n**State laws may provide additional protections or requirements**",
        },
        {
          title: '⚠️ When Client Makes an Error',
          type: 'warning',
          content: "**Section 10.21 - Knowledge of Client's Omission:**\n\nIf you discover a client's error or omission:\n\n1. **Must advise client** promptly of:\n   • The noncompliance, error, or omission\n   • The consequences\n\n2. **Cannot prepare** current year return ignoring known prior error\n\n3. **Client decides** whether to correct - you cannot force them\n\n4. **You must decide** whether to continue representation",
        },
        {
          title: 'Restrictions on Practice',
          type: 'text',
          content: "**Section 10.27 - Fees:**\n• No unconscionable fees\n• No contingent fees (with exceptions)\n• Exceptions: IRS exam/challenge, judicial proceedings, refund claims\n\n**Section 10.29 - Conflicting Interests:**\n• May not represent if conflict of interest\n• Unless all parties consent after full disclosure\n• And you reasonably believe competent representation possible\n\n**Section 10.35 - Competence:**\n• May not accept representation unless competent or become competent",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Circular 230 governs all practice before the IRS",
            "Due diligence required in all aspects of practice",
            "Client records must be returned upon request",
            "Advise client of errors but client decides whether to correct",
            "No contingent fees except for examinations, claims, litigation",
            "Conflicts of interest require disclosure and consent",
            "72 hours CE per 3-year cycle (minimum 16/year, 2 ethics/year)",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-004',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Tax Return Preparer Penalties',
    description: 'Understand the penalties that apply to tax return preparers',
    order: 4,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Section 6694', 'Section 6695', 'Preparer due diligence'],
    blueprintArea: 'SEE3-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Tax preparers face significant penalties for errors and misconduct. Understanding these penalties helps you maintain a compliant practice and avoid personal liability. These penalties are frequently tested!",
        },
        {
          title: 'Section 6694 Penalties',
          type: 'table',
          headers: ['Violation', 'Penalty Amount', 'Standard'],
          rows: [
            ['Unreasonable position', 'Greater of $1,000 or 50% of income from return', 'Position not supported by substantial authority (or not disclosed)'],
            ['Willful or reckless conduct', 'Greater of $5,000 or 75% of income from return', 'Intentional disregard of rules or reckless/intentional disregard of rules'],
          ],
        },
        {
          title: 'Section 6694(a): Unreasonable Position',
          type: 'text',
          content: "**Applies when:**\nPaid preparer takes a position that understates tax liability.\n\n**Standards:**\n• Undisclosed position: Must have \"substantial authority\"\n• Disclosed position: Must have \"reasonable basis\"\n• Tax shelter/reportable transaction: \"More likely than not\" standard\n\n**Penalty: Greater of $1,000 or 50% of preparer income from return**\n\n**Defenses:**\n• Reasonable cause AND good faith reliance on information\n• Adequate disclosure (for some positions)",
        },
        {
          title: 'Section 6694(b): Willful/Reckless Conduct',
          type: 'text',
          content: "**Applies when:**\n• Willful attempt to understate tax, OR\n• Reckless or intentional disregard of rules/regulations\n\n**Penalty: Greater of $5,000 or 75% of preparer income from return**\n\n**This is more serious:**\n• No good faith defense available\n• Must prove no willful or reckless conduct\n• Often leads to Circular 230 proceedings",
        },
        {
          title: 'Section 6695 Penalties',
          type: 'table',
          headers: ['Violation', 'Penalty (2024)', 'Notes'],
          rows: [
            ['Failure to furnish copy to taxpayer', '$60', 'Must give copy at time of signing'],
            ['Failure to sign return', '$60', 'Paid preparer must sign'],
            ['Failure to include PTIN', '$60', 'PTIN required on all returns'],
            ['Failure to retain copy or list', '$60', 'Keep for 3 years'],
            ['Failure to file correct info return', '$60', 'Report preparer info'],
            ['Negotiating refund check', '$600', 'Cannot cash/deposit client refund check'],
            ['EIC/CTC due diligence failure', '$635', 'Per failure - can stack'],
          ],
        },
        {
          title: '⚠️ Due Diligence Penalty - Form 8867',
          type: 'warning',
          content: "**Section 6695(g) - $635 Penalty (2024):**\n\nApplies for each failure regarding:\n• Earned Income Credit\n• Child Tax Credit / ACTC\n• American Opportunity Credit\n• Head of Household filing status\n\n**Requirements:**\n• Complete Form 8867 for each return\n• Meet knowledge requirement\n• Make reasonable inquiries\n• Retain records 3 years\n\n**A return claiming all 4 = potential $2,540 penalty per return!**",
        },
        {
          title: 'Avoiding Preparer Penalties',
          type: 'list',
          content: [
            "Document your due diligence thoroughly",
            "Ask probing questions when information seems incorrect",
            "Disclose aggressive positions properly",
            "Never sign a blank return or return you haven't reviewed",
            "Include your PTIN on every return",
            "Provide copy of return to client at signing",
            "Retain copies of returns for 3 years",
            "Never negotiate or endorse client refund checks",
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "6694(a): $1,000 or 50% of fee for unreasonable positions",
            "6694(b): $5,000 or 75% of fee for willful/reckless conduct",
            "6695: Various $60-$635 penalties for procedural failures",
            "Due diligence penalty: $635 for each of 4 credit/status items",
            "Good faith reliance is a defense to 6694(a)",
            "Never negotiate or endorse client refund checks",
            "Document, document, document!",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-005',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Sanctions and Disciplinary Proceedings',
    description: 'Understand the discipline process under Circular 230',
    order: 5,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Disreputable conduct', 'Sanctions', 'Disciplinary proceedings'],
    blueprintArea: 'SEE3-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Office of Professional Responsibility (OPR) can suspend or disbar practitioners for violations. Understanding what constitutes disreputable conduct and the disciplinary process protects your career.",
        },
        {
          title: 'Disreputable Conduct (Section 10.51)',
          type: 'text',
          content: "**Examples of Disreputable Conduct:**\n\n• Conviction of a crime under federal tax laws\n• Conviction of a felony involving dishonesty or breach of trust\n• Giving false or misleading information to Treasury Department\n• Soliciting clients using false or misleading representations\n• Willfully failing to file own tax returns\n• Willfully evading taxes\n• Misappropriating or failing to properly remit funds\n• Directly or indirectly giving false or misleading information in connection with any IRS matter",
        },
        {
          title: 'Additional Disreputable Conduct',
          type: 'list',
          content: [
            "Solicitation of employment involving false statements",
            "Willfully failing to sign a return when required",
            "Willfully assisting in violation of any requirements imposed under the tax laws",
            "Making false accusations against IRS employees",
            "Knowingly counseling clients to violate tax laws",
            "Contemptuous conduct before the IRS",
            "Being disbarred or suspended from practice by a state authority",
          ],
        },
        {
          title: 'Available Sanctions',
          type: 'table',
          headers: ['Sanction', 'Effect', 'Duration'],
          rows: [
            ['Censure', 'Public reprimand', 'Permanent record'],
            ['Suspension', 'Cannot practice', 'Specific period'],
            ['Disbarment', 'Cannot practice', 'Until reinstated (minimum 5 years)'],
            ['Monetary Penalty', 'Fine up to gross income from matter', 'N/A'],
          ],
        },
        {
          title: 'Disciplinary Proceeding Process',
          type: 'text',
          content: "**1. Complaint Filed:**\nOPR receives complaint or discovers potential violation.\n\n**2. Investigation:**\nOPR investigates and may request statement from practitioner.\n\n**3. Complaint Issued:**\nIf probable cause found, formal complaint issued.\n\n**4. Answer Filed:**\nPractitioner must respond within 30 days.\n\n**5. Hearing:**\nBefore Administrative Law Judge (ALJ).\n\n**6. Decision:**\nALJ issues decision, appealable to Treasury.",
        },
        {
          title: 'Expedited Suspension',
          type: 'text',
          content: "**Available for Immediate Action:**\n\n• Practitioner has had state license to practice suspended or revoked\n• Practitioner fails to comply with federal tax obligation\n• Practitioner poses threat to public\n\n**Process:**\n• Practitioner notified and given opportunity to respond\n• Summary proceeding\n• Suspension effective immediately upon decision\n\n**Why expedited?** Protect the public from imminent harm.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Disreputable conduct includes conviction, false statements, failure to file",
            "Sanctions range from censure to disbarment",
            "Monetary penalties can equal gross income from the matter",
            "OPR handles all disciplinary proceedings",
            "30 days to answer a formal complaint",
            "Expedited suspension for license revocation or immediate threat",
            "Disbarment requires minimum 5 years before reinstatement",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-006',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Circular 230 - Conflicts of Interest',
    description: 'Understand when conflicts of interest arise and how to handle them',
    order: 6,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Conflicts of interest', 'Waivers', 'Disclosure'],
    blueprintArea: 'SEE3-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Conflicts of interest can undermine your representation and subject you to discipline! Understanding when conflicts arise and how to properly address them protects you and your clients.",
        },
        {
          title: 'What is a Conflict of Interest?',
          type: 'text',
          content: "**A conflict exists when:**\n\n• Representation of one client will be directly adverse to another client, OR\n• There is significant risk representation will be materially limited by:\n  - Practitioner's responsibilities to another client\n  - Former client\n  - Third person\n  - Personal interest of the practitioner",
        },
        {
          title: 'Representation Despite Conflict',
          type: 'text',
          content: "**May represent with conflict IF:**\n\n1. Practitioner reasonably believes competent and diligent representation is possible\n2. Representation is not prohibited by law\n3. Each affected client gives informed consent confirmed in writing within 30 days\n\n**All three conditions must be met!**",
        },
        {
          title: 'Common Conflict Situations',
          type: 'list',
          content: [
            "Representing both spouses when divorce pending",
            "Representing partnership and individual partner",
            "Representing buyer and seller in same transaction",
            "Representing employer and employee in same matter",
            "Representing multiple taxpayers on same return position",
            "Personal financial interest in client's matter",
          ],
        },
        {
          title: '⚠️ Conflicts That Cannot Be Waived',
          type: 'warning',
          content: "**Some conflicts cannot be waived even with consent:**\n\n• Practitioner reasonably cannot provide competent representation\n• Representation is prohibited by law\n• Representing opposing parties in same IRS proceeding\n\n**When in doubt, decline the representation!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Conflict arises when interests of clients or practitioner diverge",
            "Can represent with conflict if all three conditions met",
            "Written consent required within 30 days",
            "Some conflicts cannot be waived",
            "When in doubt, decline or refer",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-007',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Circular 230 - Fees and Fee Restrictions',
    description: 'Understand proper fee arrangements and prohibited contingent fees',
    order: 7,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Contingent fees', 'Unconscionable fees', 'Fee restrictions'],
    blueprintArea: 'SEE3-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Fee arrangements are regulated under Circular 230. Contingent fees are generally prohibited for most IRS matters! Understanding the rules protects you from discipline.",
        },
        {
          title: 'Unconscionable Fees',
          type: 'text',
          content: "**Prohibited: Charging unconscionable fees**\n\n**Factors considered:**\n• Time and labor required\n• Novelty and difficulty of questions\n• Skill required\n• Fee customarily charged for similar services\n• Amount involved and results obtained\n• Experience, reputation, and ability of practitioner\n• Whether fee is fixed or contingent",
        },
        {
          title: 'Contingent Fees - General Rule',
          type: 'text',
          content: "**Contingent Fee:**\nFee based on whether a specific result is attained (e.g., percentage of refund).\n\n**Generally PROHIBITED for:**\n• Preparing original tax returns\n• Advising on matters before IRS\n\n**Why prohibited:**\n• Might encourage aggressive positions\n• Creates conflict between practitioner and client",
        },
        {
          title: 'Contingent Fees - Exceptions',
          type: 'text',
          content: "**Contingent fees ARE permitted for:**\n\n• Examination of return or refund claim (IRS dispute)\n• Claim for credit or refund AFTER return filed\n• Any matter before IRS that is primarily a JUDICIAL matter\n• Whistleblower claims under Section 7623\n\n**Key:** Audit representation and amended returns allow contingent fees.",
        },
        {
          title: 'Fee Documentation',
          type: 'text',
          content: "**Best Practices:**\n\n• Written engagement letter\n• Clear fee terms and billing method\n• Scope of services defined\n• Client signature acknowledging\n• Retainer terms if applicable\n\n**Protects both practitioner and client!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Unconscionable fees prohibited",
            "Contingent fees generally prohibited for return preparation",
            "Contingent fees allowed for audits and refund claims (after filing)",
            "Whistleblower claims: contingent fees permitted",
            "Written engagement letters recommended",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-008',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Preparer Penalties - Section 6694',
    description: 'Understand preparer penalties for understated tax positions',
    order: 8,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Section 6694(a)', 'Section 6694(b)', 'Reasonable cause'],
    blueprintArea: 'SEE3-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Preparer penalties can be substantial! Understanding the standards for tax positions and defenses against penalties is critical for every tax professional.",
        },
        {
          title: 'Section 6694(a): Unreasonable Positions',
          type: 'text',
          content: "**Penalty applies if:**\n\nPreparer takes a position that results in understatement AND:\n• Position has no substantial authority (undisclosed), OR\n• Position has no reasonable basis (disclosed)\n\n**Penalty Amount:**\nGreater of $1,000 OR 50% of preparer income from the return\n\n**Standard:** Must have substantial authority (or disclose with reasonable basis)",
        },
        {
          title: 'Section 6694(b): Willful or Reckless',
          type: 'text',
          content: "**Penalty applies if understatement due to:**\n\n• Willful attempt to understate tax, OR\n• Reckless or intentional disregard of rules/regulations\n\n**Penalty Amount:**\nGreater of $5,000 OR 75% of preparer income from the return\n\n**Much more serious!**\nBad faith or ignoring known rules.",
        },
        {
          title: 'Standards for Tax Positions',
          type: 'table',
          headers: ['Standard', 'Confidence Level', 'When Required'],
          rows: [
            ['Reasonable basis', '~20%', 'Minimum for disclosed positions'],
            ['Substantial authority', '~40%', 'For undisclosed positions'],
            ['More likely than not', '>50%', 'Tax shelters and some penalties'],
            ['Should', '~70-75%', 'Written advice covered opinions'],
          ],
        },
        {
          title: 'Reasonable Cause Defense',
          type: 'text',
          content: "**Avoid penalty if:**\n\n• Reasonable cause for the position, AND\n• Preparer acted in good faith\n\n**Defense factors:**\n• Normal office practice\n• Taxpayer furnished necessary information\n• Reliance on professional advice\n• Reasonable interpretation of law\n• Nature of error",
        },
        {
          title: '⚠️ Who is a Preparer?',
          type: 'warning',
          content: "**Tax Return Preparer:**\nAny person who prepares all or a substantial portion of any return or claim for refund.\n\n**Includes:**\n• Signing preparer\n• Non-signing preparers who prepare substantial portions\n• Certain advisors whose advice is used\n\n**Excludes:**\n• People who just furnish typing or clerical work\n• Employees who prepare returns for employer",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "6694(a): $1,000 or 50% for unreasonable positions",
            "6694(b): $5,000 or 75% for willful/reckless conduct",
            "Substantial authority needed for undisclosed positions",
            "Disclosure + reasonable basis is alternative",
            "Reasonable cause and good faith is defense",
            "Both signing and non-signing preparers can be penalized",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-009',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Preparer Penalties - Section 6695',
    description: 'Understand administrative preparer penalties and requirements',
    order: 9,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Failure to sign', 'PTIN', 'Due diligence'],
    blueprintArea: 'SEE3-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Section 6695 penalties cover administrative failures - not signing returns, failing to keep records, etc. These add up quickly and are easily avoided with proper procedures!",
        },
        {
          title: 'Section 6695 Penalties (2024)',
          type: 'table',
          headers: ['Violation', 'Penalty', 'Max/Year'],
          rows: [
            ['Failure to furnish copy to taxpayer', '$60', '$30,000'],
            ['Failure to sign return', '$60', '$30,000'],
            ['Failure to furnish PTIN', '$60', '$30,000'],
            ['Failure to retain copy/list', '$60', 'No max per se'],
            ['Failure to file correct information return', '$60', '$30,000'],
            ['Negotiating/endorsing refund check', '$600', 'Per check'],
            ['Due diligence (EIC, CTC, AOTC, HOH)', '$635', 'Per failure'],
          ],
        },
        {
          title: 'PTIN Requirements',
          type: 'text',
          content: "**All paid preparers must:**\n\n• Obtain PTIN before preparing returns\n• Include PTIN on all returns prepared\n• Renew PTIN annually\n• $11 fee for initial/renewal (2024)\n\n**Failure to use valid PTIN:**\n$60 penalty per return (max $30,000/year)",
        },
        {
          title: 'Signing and Copy Requirements',
          type: 'text',
          content: "**Signing:**\n• Signing preparer must sign in designated space\n• Can use electronic signature\n• $60 penalty for each failure\n\n**Copies:**\n• Must furnish copy to taxpayer\n• Must retain copy or list for 3 years\n• List must include taxpayer name, TIN, year, type\n\n**Cannot sign blank returns** for later completion!",
        },
        {
          title: 'Due Diligence Requirements (Section 6695(g))',
          type: 'text',
          content: "**$635 penalty for each failure** (2024) for:\n\n• Earned Income Credit\n• Child Tax Credit / Additional CTC\n• American Opportunity Tax Credit\n• Head of Household filing status\n\n**Four requirements:**\n1. Complete Form 8867 (Due Diligence Checklist)\n2. Complete applicable worksheets\n3. Make reasonable inquiries\n4. Retain records for 3 years\n\n**Potential $2,540 penalty on one return!**",
        },
        {
          title: 'Refund Check Prohibition',
          type: 'text',
          content: "**$600 penalty per check:**\n\nPreparers CANNOT endorse or negotiate (deposit) refund checks for clients.\n\n**Why:** Prevents preparers from taking refund as payment.\n\n**Exception:** NOT a penalty to be listed on direct deposit (bank product).\n\n**This is per check, not per year!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Most 6695 penalties: $60 each, max $30,000/year",
            "Due diligence penalty: $635 per credit/status",
            "Must have valid PTIN to prepare for compensation",
            "Must sign, provide copy, retain records (3 years)",
            "Cannot negotiate refund checks ($600 each)",
            "All penalties can be avoided with proper procedures!",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-010',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Circular 230 - Records and Client Communications',
    description: 'Understand record retention, client communication, and information return requirements',
    order: 10,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Records retention', 'Client requests', 'Information returns'],
    blueprintArea: 'SEE3-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Proper record keeping and communication with clients are professional obligations. Understanding what to keep, for how long, and what to return to clients avoids discipline issues!",
        },
        {
          title: 'Return of Client Records',
          type: 'text',
          content: "**Must Return Upon Request:**\n\n• All records originally provided by client\n• Needed by client to comply with tax obligations\n\n**May Retain:**\n• Own work product until fees paid\n• Copies of returns prepared\n• Working papers (generally)\n\n**Cannot hold client's original records hostage for fees!**",
        },
        {
          title: 'Practitioner Records Retention',
          type: 'text',
          content: "**Required to Keep for 3 Years:**\n\n• Copy of return OR list of returns prepared\n• List includes: taxpayer name, TIN, tax year, type of return\n• Due diligence documentation (Form 8867)\n• Supporting worksheets and documents\n\n**Best Practice:** Keep copies 7+ years (statute considerations).",
        },
        {
          title: 'Prompt Disposition of Matters',
          type: 'text',
          content: "**Circular 230 requires:**\n\n• Not unreasonably delay matter pending before IRS\n• Notify client of status and progress\n• Complete agreed work in reasonable time\n\n**Client Communication:**\n• Keep clients informed\n• Return calls and correspondence reasonably\n• Provide copies of IRS correspondence",
        },
        {
          title: 'Advertising Standards',
          type: 'text',
          content: "**Must NOT:**\n\n• Make false or misleading statements\n• Claim fee comparison unless verifiable\n• Imply endorsement by IRS\n\n**Professional Designation Use:**\n• May use EA, CPA, Attorney, etc.\n• Must only use if actually hold designation\n• AFSP participants may use specific language only",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Return client's original records upon request",
            "Keep copies/lists for 3 years minimum",
            "Cannot delay matters unreasonably",
            "Keep client informed of case status",
            "No false or misleading advertising",
            "Can use professional designations if held",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-011',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Taxpayer Rights - Taxpayer Bill of Rights',
    description: 'Understand the fundamental rights of taxpayers in dealing with the IRS',
    order: 11,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Taxpayer Bill of Rights', 'Publication 1', 'Taxpayer Advocate'],
    blueprintArea: 'SEE3-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "As an EA, you must understand taxpayer rights to effectively represent your clients! The Taxpayer Bill of Rights is foundational to all IRS interactions.",
        },
        {
          title: 'The 10 Taxpayer Rights',
          type: 'list',
          content: [
            "Right to Be Informed",
            "Right to Quality Service",
            "Right to Pay No More Than the Correct Amount",
            "Right to Challenge IRS Position and Be Heard",
            "Right to Appeal an IRS Decision in an Independent Forum",
            "Right to Finality",
            "Right to Privacy",
            "Right to Confidentiality",
            "Right to Retain Representation",
            "Right to a Fair and Just Tax System",
          ],
        },
        {
          title: 'Key Rights in Practice',
          type: 'text',
          content: "**Right to Be Informed:**\n• Know what is needed to comply\n• Be informed of IRS decisions\n\n**Right to Challenge:**\n• Raise objections\n• Provide additional documentation\n\n**Right to Appeal:**\n• Independent review by Appeals Office\n• Right to go to court\n\n**Right to Representation:**\n• May have EA, CPA, or Attorney represent\n• Can suspend interview to consult",
        },
        {
          title: 'Taxpayer Advocate Service',
          type: 'text',
          content: "**Independent Organization within IRS:**\n\n**Can help when:**\n• Taxpayer facing significant hardship\n• IRS systems not working properly\n• Issue not resolved through normal channels\n• Action needed to prevent irreparable harm\n\n**How to contact:**\n• Form 911 (Request for Taxpayer Advocate Service)\n• Local Taxpayer Advocate office\n• Toll-free number",
        },
        {
          title: 'Publication 1 - Your Rights as a Taxpayer',
          type: 'text',
          content: "**Must be provided:**\n\n• At start of examination\n• With first notice of taxes owed\n• When taxpayer asks\n\n**Contains:**\n• Summary of taxpayer rights\n• Examination, appeal, and collection processes\n• Refund information\n• Taxpayer Advocate contact information",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "10 fundamental taxpayer rights codified",
            "Right to representation at any IRS meeting",
            "Right to appeal IRS decisions",
            "Taxpayer Advocate helps with hardship situations",
            "Publication 1 must be provided at examination start",
            "Rights apply to all taxpayers at all times",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-012',
    courseId: 'ea',
    section: 'SEE3',
    title: 'E-file Requirements and Procedures',
    description: 'Understand mandatory e-filing requirements for tax professionals',
    order: 12,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Mandatory e-file', 'ERO requirements', 'E-file signatures'],
    blueprintArea: 'SEE3-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Electronic filing is now required for most tax professionals. Understanding the rules, ERO responsibilities, and signature requirements is essential for practice!",
        },
        {
          title: 'Mandatory E-file Threshold',
          type: 'text',
          content: "**If you file 11+ returns in a calendar year:**\n\n• Must file ALL individual returns electronically\n• Includes any returns covered by e-file program\n\n**Exceptions:**\n• Return rejected and cannot be resubmitted\n• Return not accepted by IRS e-file\n• Taxpayer opts out (Form 8948)\n\nThreshold used to be much higher - lowered significantly!",
        },
        {
          title: 'Electronic Return Originator (ERO)',
          type: 'text',
          content: "**ERO Responsibilities:**\n\n• Accept returns for electronic filing\n• Verify taxpayer identification\n• Retain required forms and signatures\n• Submit returns timely\n• Comply with all IRS e-file rules\n\n**Must apply to IRS e-file program** before filing.",
        },
        {
          title: 'Signature Requirements',
          type: 'table',
          headers: ['Method', 'Description', 'Requirements'],
          rows: [
            ['Self-select PIN', 'Taxpayer creates 5-digit PIN', 'Prior year AGI or prior year PIN'],
            ['Practitioner PIN', 'Preparer enters PIN with consent', 'Signed Form 8879'],
            ['Form 8878', 'E-file signature for extensions', 'Different from 8879'],
            ['Paper signature', 'Not for e-file', 'Only if paper filing'],
          ],
        },
        {
          title: 'Form 8879 - IRS e-file Signature Authorization',
          type: 'text',
          content: "**Required for Practitioner PIN method:**\n\n• Taxpayer signs before transmission\n• ERO retains original or electronic copy\n• Retain for 3 years from return due date\n• Contains taxpayer consent and PIN\n\n**Cannot transmit without signed Form 8879!**",
        },
        {
          title: 'ERO Retention Requirements',
          type: 'text',
          content: "**Must Retain 3 Years:**\n\n• Form 8879 (signature authorization)\n• Form 8878 (extension authorization)\n• Copy of return or summary\n• Any supporting documentation\n\n**Electronic or paper retention acceptable.**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Must e-file if preparing 11+ returns",
            "ERO has specific responsibilities for e-filing",
            "Form 8879 required for practitioner PIN method",
            "Retain e-file documents for 3 years",
            "Taxpayer can opt out with Form 8948",
            "Apply for IRS e-file program before filing",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE3-3: SPECIFIC AREAS OF REPRESENTATION (Lessons 13-25)
  // ============================================================================

  {
    id: 'SEE3-013',
    courseId: 'ea',
    section: 'SEE3',
    title: 'IRS Audit Process',
    description: 'Understand the examination process and how to represent clients during audits',
    order: 13,
    duration: 55,
    difficulty: 'intermediate',
    topics: ['Audit selection', 'Types of audits', 'Audit procedures'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Representing clients during audits is a core EA function! Understanding how audits work, what the IRS can and cannot do, and how to protect your clients is essential to effective representation.",
        },
        {
          title: 'How Returns Are Selected for Audit',
          type: 'text',
          content: "**DIF Score (Discriminant Information Function):**\n• Computer scoring based on statistical norms\n• Higher score = higher probability of change\n\n**Other Selection Methods:**\n• Random selection (National Research Program)\n• Related examinations (partner, spouse, subsidiary)\n• Information matching (W-2, 1099 mismatches)\n• Tips and whistleblowers\n• Prior audit adjustments\n• Specific compliance projects",
        },
        {
          title: 'Types of Examinations',
          type: 'table',
          headers: ['Type', 'Description', 'Where Conducted'],
          rows: [
            ['Correspondence', 'Limited issue by mail', 'IRS campus'],
            ['Office', 'Taxpayer visits IRS office', 'IRS office'],
            ['Field', 'Agent visits taxpayer', 'Taxpayer\'s location'],
            ['TCMP/NRP', 'Line-by-line comprehensive', 'Various'],
          ],
        },
        {
          title: 'Correspondence Audit',
          type: 'text',
          content: "**Handled entirely by mail:**\n\n• Most common type of audit\n• Limited issues (itemized deductions, EIC, etc.)\n• Reply within 30 days\n• Submit documentation by mail\n\n**Key:** Read the letter carefully - they're asking for specific items. Provide ONLY what's requested and keep copies of everything sent.",
        },
        {
          title: 'Office and Field Audits',
          type: 'text',
          content: "**Office Audit:**\n• Report to IRS office with records\n• Usually more complex returns\n• Multiple issues may be covered\n• Direct interaction with examiner\n\n**Field Audit:**\n• Agent comes to taxpayer's location\n• Business returns, complex returns\n• May include tour of business\n• Multiple interviews possible\n\n**Your Role:** Attend with client (or instead of client), provide documents, answer questions, negotiate issues.",
        },
        {
          title: 'Taxpayer Rights During Audit',
          type: 'list',
          content: [
            "Right to representation by an authorized practitioner",
            "Right to recording of interviews (with advance notice)",
            "Right to know why IRS is asking for information",
            "Right to know how information will be used",
            "Right to disagree and request supervisor conference",
            "Right to appeal within IRS",
            "Right to fair and impartial examination",
          ],
        },
        {
          title: '⚠️ What to Do and Not Do in an Audit',
          type: 'warning',
          content: "**DO:**\n• Be prepared and organized\n• Answer only what's asked\n• Provide copies, not originals\n• Keep a record of all interactions\n• Be professional and courteous\n\n**DON'T:**\n• Volunteer information not requested\n• Guess or speculate\n• Let client answer questions you haven't prepared them for\n• Argue about the law during the exam\n• Lose your temper",
        },
        {
          title: 'Audit Outcomes',
          type: 'text',
          content: "**No Change:**\nExaminer agrees with return as filed.\n\n**Agreed:**\nTaxpayer agrees with proposed changes.\n• Sign Form 870 (waiver of restrictions)\n• Assessment and collection can proceed\n\n**Unagreed:**\nTaxpayer disagrees with proposed changes.\n• Request manager conference\n• Pursue Appeals\n• Eventually may go to court",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "DIF score is primary audit selection method",
            "Three main audit types: correspondence, office, field",
            "Taxpayers have right to representation during audits",
            "Provide only what's requested - don't volunteer",
            "Keep copies of everything provided to IRS",
            "Can disagree and pursue Appeals if not resolved",
            "Form 870 is signed when taxpayer agrees to changes",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-014',
    courseId: 'ea',
    section: 'SEE3',
    title: 'IRS Appeals Process',
    description: 'Learn how to effectively use the IRS Appeals process',
    order: 14,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Appeals rights', 'Protest letter', 'Appeals conference'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Appeals is where most tax disputes are resolved! Understanding how to access Appeals and negotiate effectively can save clients thousands of dollars while avoiding costly litigation.",
        },
        {
          title: 'IRS Appeals Mission',
          type: 'text',
          content: "**Independent Office:**\nAppeals is independent from the examination function.\n\n**Mission:**\nResolve tax controversies without litigation where possible, in a way that's fair and impartial to both the government and the taxpayer.\n\n**Key Difference:**\n• Examiners apply the law strictly\n• Appeals considers hazards of litigation\n• Settlement authority exists in Appeals",
        },
        {
          title: 'Getting to Appeals',
          type: 'text',
          content: "**After Examination:**\n\n1. Receive 30-day letter with proposed changes\n2. File protest (or small case request) within 30 days\n3. Case transferred to Appeals\n4. Appeals conference scheduled\n\n**Small Case Request:**\n• For total proposed change ≤ $25,000 per period\n• Brief written request instead of formal protest\n\n**Formal Protest Required:**\n• For proposed change > $25,000 per period\n• Must include specific elements",
        },
        {
          title: 'Elements of a Formal Protest',
          type: 'list',
          content: [
            "Statement that you want to appeal the findings",
            "Your name, address, and daytime phone",
            "Copy of the 30-day letter you're protesting",
            "Tax periods or years involved",
            "List of changes you disagree with",
            "Statement of facts supporting your position",
            "Statement of law supporting your position",
            "Penalties of perjury statement (signed under penalties of perjury)",
          ],
        },
        {
          title: 'Appeals Conference',
          type: 'text',
          content: "**How It Works:**\n\n• Usually informal discussion\n• In person, by phone, or video\n• You present your case\n• Appeals Officer evaluates \"hazards of litigation\"\n• Settlement negotiated if possible\n\n**Hazards of Litigation:**\nLikelihood each party might win or lose if case went to court.\n\n**Example:** If 50% chance IRS loses, they might settle at 50% of proposed tax.",
        },
        {
          title: 'Appeals Outcomes',
          type: 'table',
          headers: ['Outcome', 'What Happens Next'],
          rows: [
            ['Full agreement', 'Sign Form 870-AD, case closed'],
            ['Partial agreement', 'Agree on some issues, may continue on others'],
            ['No agreement', 'IRS issues 90-day letter (Notice of Deficiency)'],
            ['Docketed case', 'If already in Tax Court, Appeals may still resolve'],
          ],
        },
        {
          title: 'Collection Due Process (CDP) Appeals',
          type: 'text',
          content: "**Different from Exam Appeals:**\n\n• Challenge collection action (lien or levy)\n• Request within 30 days of notice\n• Right to court review if no agreement\n• Independent review of proposed action\n\n**Issues That Can Be Raised:**\n• Appropriateness of collection action\n• Collection alternatives (OIC, IA)\n• Spousal defenses\n• Underlying liability (if no prior opportunity)",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Appeals is independent from examination",
            "30 days to file protest after 30-day letter",
            "Small case request for ≤ $25,000 per period",
            "Formal protest requires specific elements and perjury statement",
            "Appeals considers 'hazards of litigation' in settlement",
            "Form 870-AD finalizes Appeals agreement",
            "CDP Appeals available for collection actions",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-015',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Collection Procedures',
    description: 'Master IRS collection actions and taxpayer remedies',
    order: 15,
    duration: 60,
    difficulty: 'intermediate',
    topics: ['Liens', 'Levies', 'Installment agreements', 'Offer in compromise'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When clients can't pay their tax bills, you become their advocate with Collections! Understanding liens, levies, and payment alternatives is crucial to protecting clients from aggressive collection action.",
        },
        {
          title: 'Lien vs. Levy',
          type: 'table',
          headers: ['Action', 'What It Does', 'Effect'],
          rows: [
            ['Lien', 'Claim against property', 'Secures tax debt; doesn\'t take property'],
            ['Levy', 'Seizure of property', 'Actually takes property/wages'],
          ],
        },
        {
          title: 'Federal Tax Lien',
          type: 'text',
          content: "**When Lien Arises:**\n• Tax assessed\n• Notice and demand sent\n• Taxpayer fails to pay within 10 days\n\n**Lien attaches to ALL property:**\n• Real property\n• Personal property\n• Rights to property\n• After-acquired property\n\n**Notice of Federal Tax Lien (NFTL):**\nPublic filing that gives priority over subsequent purchasers and creditors.",
        },
        {
          title: 'Levy',
          type: 'text',
          content: "**IRS can seize:**\n• Bank accounts\n• Accounts receivable\n• Wages (ongoing levy)\n• Personal property\n• Real property (requires court approval for residence)\n\n**Property Exempt from Levy:**\n• Necessary clothing and school books\n• Fuel, provisions, furniture (limited amounts)\n• Books and tools for trade (limited)\n• Unemployment benefits\n• Workers' comp\n• Minimum exemption for wages\n• Certain pension and annuity payments",
        },
        {
          title: 'Installment Agreements',
          type: 'text',
          content: "**Types of IAs:**\n\n**Guaranteed IA:**\n• Tax ≤ $10,000\n• Filed all returns for 5 years\n• Not had IA in prior 5 years\n• Can full pay in 3 years or less\n\n**Streamlined IA:**\n• Tax ≤ $50,000 (or $100,000 in some cases)\n• Can full pay in 72 months (or within CSED)\n• No financial statement required\n\n**Regular IA:**\n• Any balance\n• Requires financial statement (433-F or 433-A)\n• Based on collection potential",
        },
        {
          title: 'Offer in Compromise',
          type: 'text',
          content: "**Grounds for OIC:**\n\n**1. Doubt as to Collectibility (most common):**\nCan't pay full amount before CSED expires.\n\n**2. Doubt as to Liability:**\nDispute whether tax is actually owed.\n\n**3. Effective Tax Administration:**\nCollection would create economic hardship or be unfair.\n\n**Key Formula (Doubt as to Collectibility):**\nOffer Amount = RCP (Reasonable Collection Potential)\n= Future Income + Net Equity in Assets",
        },
        {
          title: '⚠️ Exam Trap: Collection Statute',
          type: 'warning',
          content: "**Collection Statute Expiration Date (CSED):**\n\n• IRS has **10 years** from assessment to collect\n• After CSED, tax is legally uncollectible\n• Cannot lien or levy\n\n**CSED can be:** Extended by agreement, OIC, bankruptcy, innocent spouse proceedings, certain other events.\n\n**Key:** Calculate how much time is left before recommending collection alternatives!",
        },
        {
          title: 'Currently Not Collectible Status',
          type: 'text',
          content: "**When CNC Applies:**\nIRS determines taxpayer cannot pay any amount toward tax liability.\n\n**Effect:**\n• Collection activity suspended\n• Lien may still be filed\n• Case reviewed periodically\n• Stays in CNC until financial situation changes or CSED expires\n\n**How to Request:**\n• Provide financial information\n• Show expenses exceed income\n• No ability to pay anything",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Lien = claim against property; Levy = seizure of property",
            "Lien arises automatically when tax unpaid after notice and demand",
            "Some property is exempt from levy (clothing, tools, etc.)",
            "Guaranteed IA for ≤$10,000 payable in 3 years",
            "Streamlined IA for ≤$50,000 payable in 72 months",
            "OIC based on RCP (assets + future income)",
            "Collection statute: 10 years from assessment",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-016',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Penalties and Interest',
    description: 'Understand common tax penalties and when abatement is available',
    order: 16,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['FTF', 'FTP', 'Accuracy-related', 'Reasonable cause'],
    blueprintArea: 'SEE3-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Penalties can add substantially to a client's tax bill! Knowing when penalties apply and how to request abatement can save clients significant money. This is heavily tested on the SEE.",
        },
        {
          title: 'Failure to File Penalty (FTF)',
          type: 'text',
          content: "**Section 6651(a)(1):**\n\n• **Rate:** 5% per month or partial month\n• **Maximum:** 25% of tax due\n• **Time:** Late filing (not late payment)\n\n**Minimum Penalty (after 60 days late):**\nLesser of $510 (2024) or 100% of tax due\n\n**Extension:** Timely extension avoids FTF if filed by extended due date\n\n**Reasonable cause defense available**",
        },
        {
          title: 'Failure to Pay Penalty (FTP)',
          type: 'text',
          content: "**Section 6651(a)(2):**\n\n• **Rate:** 0.5% per month or partial month\n• **Maximum:** 25% of tax due\n• **Time:** Tax not paid by due date\n\n**Reduction:** If on approved installment agreement, reduced to 0.25%/month\n\n**Combined with FTF:** When both apply, FTF reduced by FTP amount (maximum combined 5%/month for first 5 months)\n\n**Reasonable cause defense available**",
        },
        {
          title: 'Combined FTF and FTP',
          type: 'table',
          headers: ['Month', 'FTF Penalty', 'FTP Penalty', 'Combined'],
          rows: [
            ['1', '5% - 0.5% = 4.5%', '0.5%', '5.0%'],
            ['2', '4.5%', '0.5%', '5.0%'],
            ['3', '4.5%', '0.5%', '5.0%'],
            ['4', '4.5%', '0.5%', '5.0%'],
            ['5', '4.5%', '0.5%', '5.0%'],
            ['6+', '0%', '0.5%', '0.5%'],
            ['Maximum', '22.5%', '25%', '47.5%'],
          ],
        },
        {
          title: 'Accuracy-Related Penalties',
          type: 'text',
          content: "**Section 6662 - 20% Penalty:**\n\n• Negligence or disregard of rules\n• Substantial understatement of income tax\n• Substantial valuation misstatement\n• Substantial overstatement of pension liabilities\n• Substantial estate/gift tax valuation understatement\n\n**Substantial Understatement:**\n• Greater of 10% of correct tax or $5,000 ($10,000 for corps)\n• Reduced by amounts with substantial authority or adequate disclosure\n\n**Section 6662(h) - 40% Penalty:**\nGross valuation misstatement",
        },
        {
          title: 'First Time Penalty Abatement (FTA)',
          type: 'text',
          content: "**Administrative Waiver:**\n\nIRS will abate FTF and/or FTP penalties if:\n• No penalties in prior 3 tax years\n• All required returns filed or on extension\n• All tax paid or arrangement in place\n\n**How to Request:**\n• By phone\n• In writing\n• With audit reconsideration\n\n**Key:** Don't use FTA for a small penalty - save it for when it counts!",
        },
        {
          title: 'Reasonable Cause Defense',
          type: 'text',
          content: "**What is Reasonable Cause?**\nTaxpayer exercised ordinary business care and prudence but could not comply.\n\n**Common Examples:**\n• Death or serious illness\n• Unavoidable absence\n• Fire, casualty, or other disaster\n• Unable to obtain records\n• Reliance on professional advice (limited)\n\n**NOT Reasonable Cause:**\n• Lack of funds (for FTF)\n• Ignorance of the law\n• Simple forgetfulness",
        },
        {
          title: 'Interest',
          type: 'text',
          content: "**Interest Runs On:**\n• Underpayments from due date until paid\n• Overpayments from filing date (or due date if filed early) until refunded\n\n**Rate:** Federal short-term rate + 3% (individual underpayments)\n\n**Cannot Be Abated (generally):**\nUnlike penalties, interest rarely abated.\n\n**Exception:** Ministerial or managerial acts by IRS causing delay.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "FTF: 5%/month up to 25%; FTP: 0.5%/month up to 25%",
            "Combined maximum: 47.5%",
            "Accuracy-related penalty: 20% (40% for gross misstatement)",
            "First Time Abatement available - save it for significant penalty",
            "Reasonable cause: ordinary care but couldn't comply",
            "Interest rarely abated - runs from due date",
            "Extensions avoid FTF (for filing) but not FTP",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-017',
    courseId: 'ea',
    section: 'SEE3',
    title: 'IRS Notices and Letters',
    description: 'Understand common IRS notices and how to respond effectively',
    order: 17,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['CP notices', 'Letter types', 'Response procedures'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "As an EA, you'll respond to IRS notices regularly! Understanding notice types, deadlines, and proper responses is fundamental to representation.",
        },
        {
          title: 'Common CP Notices (Computerized)',
          type: 'table',
          headers: ['Notice', 'Meaning', 'Action'],
          rows: [
            ['CP11', 'Math error - balance due', 'Pay or dispute within 60 days'],
            ['CP14', 'Balance due', 'Pay, set up plan, or dispute'],
            ['CP21', 'Changes made - refund/balance', 'Review changes, respond if disagree'],
            ['CP22', 'Changes resulted in balance due', 'Pay or dispute'],
            ['CP49', 'Refund applied to other taxes owed', 'None if correct - informational'],
            ['CP501-504', 'Balance due reminders (escalating)', 'Pay or arrange payment'],
            ['CP2000', 'Income discrepancy (not an audit)', 'Respond within 30 days'],
          ],
        },
        {
          title: 'Letter Notices (LTR)',
          type: 'text',
          content: "**Letter notices generated by employees:**\n\n• LTR 525: General 30-day letter\n• LTR 531: 90-day letter (Notice of Deficiency)\n• LTR 1058/LT11: Final Notice - Intent to Levy\n• LTR 3172: Notice of Federal Tax Lien Filed\n• LTR 3219: Statutory Notice of Deficiency\n\n**Critical:** 90-day letters and levy notices have strict deadlines!",
        },
        {
          title: 'CP2000 - Underreporter Notice',
          type: 'text',
          content: "**Not a formal audit, but:**\n\n• IRS matching program found discrepancy\n• Third-party info doesn't match return\n• 30 days to respond\n\n**Response Options:**\n• Agree: Sign and return, pay balance\n• Partially agree: Explain which items correct\n• Disagree: Provide documentation\n\n**Key:** Often about unreported 1099s, can be explained.",
        },
        {
          title: 'Response Best Practices',
          type: 'list',
          content: [
            "Respond by the deadline on notice",
            "Use the address/fax on the notice - not general IRS address",
            "Include notice number and taxpayer info on all correspondence",
            "Keep copies of everything sent",
            "Use certified mail for deadlines",
            "Request additional time if needed (usually granted once)",
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CP notices are computerized; LTR notices are from employees",
            "CP2000 is matching notice, not formal audit",
            "90-day letter (Statutory Notice) is critical deadline",
            "Always respond by deadline shown on notice",
            "Use certified mail for important responses",
            "Keep copies of all correspondence",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-018',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Collection Alternatives',
    description: 'Master payment options for taxpayers who cannot pay in full',
    order: 18,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Installment agreements', 'OIC', 'CNC status'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Many clients cannot pay their taxes in full. Understanding collection alternatives helps you protect clients from enforced collection while resolving their liabilities!",
        },
        {
          title: 'Installment Agreements Overview',
          type: 'table',
          headers: ['Type', 'Requirements', 'Benefits'],
          rows: [
            ['Guaranteed (§6159)', '<$10,000 owed, filed all returns', 'IRS must accept if requested'],
            ['Streamlined', '<$50,000 owed, pay in 72 months', 'No financials required'],
            ['Non-streamlined', '>$50,000 or longer term', 'Requires financial disclosure'],
            ['Partial Pay (PPIA)', "Can't full-pay before CSED", 'Pays what can afford'],
            ['In-Business Trust Fund Express', '<$25,000 trust fund', 'For payroll tax debts'],
          ],
        },
        {
          title: 'Streamlined Installment Agreement',
          type: 'text',
          content: "**Best option for most clients:**\n\n**Requirements:**\n• Owe $50,000 or less (assessed balance)\n• Can pay off in 72 months or less\n• All required returns filed\n• Current tax compliance going forward\n\n**Benefits:**\n• No financial disclosure required\n• Apply online or by phone\n• User fee (reduced for direct debit)\n\n**Key:** Pay down below $50,000 to qualify!",
        },
        {
          title: 'Offer in Compromise (OIC)',
          type: 'text',
          content: "**Settle for less than full amount:**\n\n**Three Types:**\n1. Doubt as to Collectibility (most common)\n2. Doubt as to Liability\n3. Effective Tax Administration (hardship)\n\n**Basic Formula (DATC):**\nOffer = RCP (Reasonable Collection Potential)\nRCP = Future Income + Asset Equity\n\n**Must demonstrate inability to full-pay before CSED!**",
        },
        {
          title: 'Currently Not Collectible (CNC)',
          type: 'text',
          content: "**When taxpayer truly cannot pay:**\n\n• All income needed for necessary expenses\n• No ability to make any payment\n• Collection suspended (not forgiven)\n• CSED continues to run\n\n**Requirements:**\n• Full financial disclosure (Form 433-A/B)\n• IRS determines inability to pay\n• Periodic review of status\n\n**Wait for CSED expiration if tax can't be resolved!**",
        },
        {
          title: '⚠️ Protecting the Client During Collection',
          type: 'warning',
          content: "**While working on alternative:**\n\n• Get levy released if causing hardship\n• Request Collection Due Process hearing if lien/levy issued\n• Don't let statute of limitations expire on requesting relief\n• File all required returns (IRS won't work with non-filers)\n• Stay current on new liabilities\n\n**Collection doesn't stop automatically - must request!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Guaranteed IA: <$10,000, must accept",
            "Streamlined: <$50,000, no financials, 72 months",
            "OIC: Settle for less, must show can't full-pay",
            "CNC: Collection suspended, CSED runs",
            "All options require filed returns",
            "Stay current on new taxes during agreement",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-019',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Collection Due Process and Appeals',
    description: 'Understand taxpayer rights to challenge collection actions',
    order: 19,
    duration: 45,
    difficulty: 'advanced',
    topics: ['CDP hearings', 'Equivalent hearings', 'Appeals'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Collection Due Process (CDP) gives taxpayers the right to an independent hearing before (or after) liens and levies! This is a powerful protection you need to know.",
        },
        {
          title: 'When CDP Rights Arise',
          type: 'text',
          content: "**Federal Tax Lien (LT11/Letter 3172):**\n• Right to CDP hearing\n• 30 days to request after notice\n\n**Levy (LTR 1058/LT11):**\n• Right to CDP hearing\n• 30 days to request after notice\n\n**First lien/levy triggers CDP rights.**\n\nSubsequent liens/levies: equivalent hearing only.",
        },
        {
          title: 'CDP vs. Equivalent Hearing',
          type: 'table',
          headers: ['Feature', 'CDP Hearing', 'Equivalent Hearing'],
          rows: [
            ['Request deadline', '30 days', '1 year (after 30-day period)'],
            ['Suspends collection', 'Yes', 'No'],
            ['Tolls statute', 'Yes', 'No'],
            ['Tax Court review', 'Yes', 'No'],
            ['Form', '12153', '12153'],
          ],
        },
        {
          title: 'What Can Be Raised at CDP',
          type: 'list',
          content: [
            "Appropriateness of collection action",
            "Collection alternatives (IA, OIC, CNC)",
            "Spousal defenses",
            "Underlying tax liability (if no prior opportunity)",
            "Procedural errors by IRS",
            "Whether lien/levy meets legal requirements",
          ],
        },
        {
          title: 'CDP Process',
          type: 'text',
          content: "**Steps:**\n\n1. Receive CDP notice (LT11, Letter 3172, etc.)\n2. File Form 12153 within 30 days\n3. Case assigned to Settlement Officer\n4. Hearing (phone, in-person, or correspondence)\n5. Determination letter issued\n6. 30 days to petition Tax Court if disagree\n\n**Collection suspended during CDP (except for collection period)!**",
        },
        {
          title: '⚠️ Critical Deadlines',
          type: 'warning',
          content: "**MUST file Form 12153 within 30 days for:**\n\n• Collection suspension\n• Tax Court review rights\n• Statute tolling\n\n**After 30 days:**\n• Only equivalent hearing available\n• Collection continues\n• No Tax Court review\n\n**Calendar this immediately upon receipt of CDP notice!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CDP: 30 days to request, suspends collection",
            "Equivalent hearing: After 30 days, no suspension",
            "Use Form 12153 for both types",
            "Can raise collection alternatives at hearing",
            "Underlying liability: only if no prior opportunity",
            "Tax Court review only for timely CDP request",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE3-5: SPECIFIC AREAS - STATUTES AND TIMING (Lessons 20-25)
  // ============================================================================

  {
    id: 'SEE3-020',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Statute of Limitations',
    description: 'Master the time limits on assessments, refunds, and collections',
    order: 20,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Assessment statute', 'Refund statute', 'Collection statute'],
    blueprintArea: 'SEE3-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Statutes of limitation protect both taxpayers and the IRS. Knowing when time runs out on assessments, refunds, and collections is critical to effective representation and planning.",
        },
        {
          title: 'Three Key Statutes',
          type: 'table',
          headers: ['Statute', 'Normal Period', 'Starts From'],
          rows: [
            ['Assessment', '3 years', 'Later of due date or filing date'],
            ['Refund claim', '3 years from filing OR 2 years from payment', 'Filing/payment date'],
            ['Collection', '10 years', 'Assessment date'],
          ],
        },
        {
          title: 'Assessment Statute (ASED)',
          type: 'text',
          content: "**General Rule: 3 years** from later of due date or filing date.\n\n**Extended to 6 years:**\n• Omission of gross income > 25% of reported income\n• Certain foreign income items\n\n**No Limit (Unlimited):**\n• Fraud\n• Willful attempt to evade tax\n• Failure to file a return\n\n**Extended by Agreement:**\nForm 872 (fixed date) or 872-A (open-ended) extends ASED.",
        },
        {
          title: 'Refund Statute',
          type: 'text',
          content: "**Must claim refund by LATER of:**\n\n• 3 years from date return was filed, OR\n• 2 years from date tax was paid\n\n**Amount Limited:**\n• If claiming within 3 years: Can get back what was paid within 3 years + extensions\n• If claiming within 2 years (but after 3 years from filing): Only what was paid in prior 2 years\n\n**Key:** Missing the deadline = losing the refund forever!",
        },
        {
          title: 'Collection Statute (CSED)',
          type: 'text',
          content: "**10 years from date of assessment.**\n\nAfter CSED:\n• Tax is legally uncollectible\n• Liens release automatically\n• Cannot levy or seize property\n\n**CSED Suspended:**\n• During bankruptcy\n• While OIC pending (+ 30 days)\n• While CDP appeal pending (+ 30 days)\n• While Innocent Spouse request pending\n• Time taxpayer is out of country (6+ months)",
        },
        {
          title: '⚠️ Exam Trap: Form 872 vs 872-A',
          type: 'warning',
          content: "**Form 872:** Fixed ending date\n• Specifies a particular date ASED expires\n• Cannot be revoked\n• Plan for specific date\n\n**Form 872-A:** Open-ended\n• No specific ending date\n• Remains open until terminated\n• Either party can terminate (90 days + 60 days notice)\n\n**Key:** Open-ended 872-A can leave case open indefinitely!",
        },
        {
          title: 'Protective Refund Claims',
          type: 'text',
          content: "**When to File:**\n• Statute about to expire\n• Issue pending that might affect refund\n• Hedge against possible later development\n\n**How to File:**\n• Form 1040-X or formal claim\n• State specific basis for claim\n• Reference pending case/ruling if applicable\n\n**Preserves right to refund** even if issue not yet resolved.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Assessment statute: 3 years (6 years for 25%+ omission, unlimited for fraud)",
            "Refund statute: 3 years from filing OR 2 years from payment",
            "Collection statute: 10 years from assessment",
            "Form 872 extends ASED to fixed date; 872-A is open-ended",
            "Certain events suspend collection statute (bankruptcy, OIC, CDP)",
            "Protective claims preserve refund rights when statute running",
            "No return filed = no statute starts running on assessment",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE3-3: EXAMINATION PROCEDURES (Lessons 21-25)
  // ============================================================================

  {
    id: 'SEE3-021',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Office and Field Examinations',
    description: 'Master in-person audit preparation and representation strategies',
    order: 21,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Preparation', 'IDRs', 'Representation strategies'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "In-person audits require face-time with IRS examiners. Your preparation and representation skills directly impact outcomes. Know how to prepare clients, handle document requests, and navigate the examination process.",
        },
        {
          title: 'Types of Examinations',
          type: 'table',
          headers: ['Type', 'Location', 'Complexity', 'Issues'],
          rows: [
            ['Correspondence', 'By mail', 'Simple', 'Single issues, documentation'],
            ['Office Audit', 'IRS office', 'Moderate', 'Multiple issues, interviews'],
            ['Field Audit', 'Taxpayer location', 'Complex', 'Businesses, high-income, multiple years'],
            ['TCMP/NRP', 'Varies', 'Comprehensive', 'Statistical sampling audits'],
          ],
        },
        {
          title: 'Pre-Audit Preparation',
          type: 'text',
          content: "**Before the Examination:**\n\n1. **Review the Return**\n   • Identify potential issues before IRS does\n   • Understand each item that may be questioned\n   • Locate all supporting documentation\n\n2. **Gather Documentation**\n   • Organize by issue and year\n   • Make copies - never give originals\n   • Identify gaps and address them\n\n3. **Interview the Client**\n   • Understand facts behind each item\n   • Identify potential problem areas\n   • Prepare client for possible questions",
        },
        {
          title: 'Office Audit Procedures',
          type: 'text',
          content: "**Conducted at IRS Office:**\n\n**Initial Contact:**\n• IRS sends appointment letter\n• Lists items to be examined\n• Specifies documents to bring\n\n**At the Audit:**\n• Present only requested documents\n• Answer only questions asked\n• Don't volunteer information\n• Take notes on discussions\n• Request breaks if needed\n\n**Your Role as Representative:**\n• Attend without client (if permitted and appropriate)\n• Control information flow\n• Advocate for client's positions",
        },
        {
          title: 'Field Audit Procedures',
          type: 'text',
          content: "**Conducted at Taxpayer's Location:**\n\n**Why Field Audit?**\n• Business examinations\n• Complex returns\n• Need to inspect books and records on-site\n• High-income individuals\n\n**Controlling the Environment:**\n• Designate conference room away from operations\n• Keep other records out of sight\n• Have records organized and ready\n• Don't let examiner wander freely\n\n**Revenue Agent vs. Revenue Officer:**\n• Revenue Agent: Conducts examinations\n• Revenue Officer: Collections (different function)",
        },
        {
          title: 'Information Document Requests (IDRs)',
          type: 'text',
          content: "**IDR Process:**\n\n• Written request from examiner for documents\n• Specifies items needed and deadline\n• Must respond timely\n\n**Best Practices:**\n• Request clarification if unclear\n• Negotiate deadlines if needed\n• Provide ONLY what's requested\n• Document what you provide\n• Keep copies of everything submitted\n\n**Extensions:** Usually granted if requested before deadline",
        },
        {
          title: '⚠️ Common Audit Mistakes',
          type: 'warning',
          content: "**Avoid These Errors:**\n\n• Volunteering extra information\n• Letting client speak without preparation\n• Providing documents not requested\n• Missing IDR deadlines\n• Being confrontational with examiner\n• Failing to document what was discussed\n\n**Remember:** Examiners can expand scope if they find issues you didn't expect!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Office audits at IRS; field audits at taxpayer location",
            "Thorough preparation is critical before any examination",
            "Provide only documents specifically requested",
            "Respond to IDRs timely - request extensions if needed",
            "Representative can often attend without client",
            "Document all discussions and items provided",
            "Don't volunteer information beyond what's asked",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-022',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Information Document Requests',
    description: 'Master responding to IRS document requests and protecting privileges',
    order: 22,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Responding to IDRs', 'Extensions', 'Privileges'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IDRs are the IRS's formal method of requesting documents during an examination. How you respond affects the audit's scope, duration, and outcome. Know how to respond strategically and protect privileges.",
        },
        {
          title: 'What is an IDR?',
          type: 'text',
          content: "**Information Document Request (Form 4564):**\n\n• Formal written request for documents\n• Lists specific items needed\n• Provides response deadline (usually 10-30 days)\n• Part of the permanent examination file\n\n**Types of Requests:**\n• Documents (bank statements, receipts, contracts)\n• Information (explanations, lists)\n• Third-party contacts (may require notice)",
        },
        {
          title: 'Responding Best Practices',
          type: 'table',
          headers: ['Do', 'Don\'t'],
          rows: [
            ['Respond by deadline', 'Ignore IDRs'],
            ['Provide only what\'s requested', 'Volunteer extra documents'],
            ['Organize documents logically', 'Send messy, unorganized pile'],
            ['Create transmittal letter listing items', 'Leave examiner to guess what you sent'],
            ['Keep copies of everything', 'Give originals without copies'],
            ['Request extension before deadline', 'Request extension after deadline'],
          ],
        },
        {
          title: 'Requesting Extensions',
          type: 'text',
          content: "**When You Need More Time:**\n\n1. Contact examiner BEFORE deadline\n2. Explain reason for delay\n3. Propose specific new deadline\n4. Document the agreement in writing\n\n**Reasonable Reasons:**\n• Volume of documents requested\n• Need to obtain from third parties\n• Client unavailability\n• Natural disaster or emergency\n\n**Unreasonable:** Simply not wanting to comply",
        },
        {
          title: 'Privileges and Protections',
          type: 'text',
          content: "**Attorney-Client Privilege:**\n• For communications with attorneys seeking legal advice\n• Does NOT extend to EAs (limited exception below)\n\n**Tax Practitioner Privilege (IRC §7525):**\n• Limited privilege for federally authorized practitioners\n• Only for non-criminal tax matters\n• Does NOT apply to tax shelter advice\n• Does NOT protect work papers\n\n**Work Product Doctrine:**\n• Protects materials prepared in anticipation of litigation\n• May not apply during examination phase",
        },
        {
          title: 'What Must Be Produced',
          type: 'text',
          content: "**IRS Has Broad Authority:**\n\n• All books and records relevant to tax liability\n• Bank statements and cancelled checks\n• Contracts and agreements\n• Correspondence related to transactions\n• Workpapers (generally not privileged)\n\n**Exceptions:**\n• Truly privileged communications\n• Items not relevant to examination\n• Items already in IRS possession",
        },
        {
          title: '⚠️ Summons Power',
          type: 'warning',
          content: "**If You Refuse to Comply:**\n\nIRS can issue a **Summons** (IRC §7602):\n• Compels production of documents\n• Compels testimony under oath\n• Enforceable in federal court\n\n**Failure to comply with summons:**\n• Contempt of court\n• Potential criminal penalties\n\n**Better approach:** Negotiate scope, request extensions, but ultimately comply.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IDRs are formal document requests - respond timely",
            "Provide only what's specifically requested",
            "Request extensions BEFORE deadline expires",
            "Tax practitioner privilege is limited - doesn't cover work papers",
            "Keep copies and document what you provide",
            "IRS can issue summons if you don't comply",
            "Transmittal letters create clear record of responses",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-023',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Examination Closing Procedures',
    description: 'Understand how examinations conclude and client options at each stage',
    order: 23,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['No change', 'Agreed cases', 'Unagreed cases'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "How an examination closes determines your client's next steps. Understanding the difference between agreed, unagreed, and no-change closures lets you advise clients on options and prepare for potential appeals.",
        },
        {
          title: 'Three Examination Outcomes',
          type: 'table',
          headers: ['Outcome', 'Definition', 'Next Steps'],
          rows: [
            ['No Change', 'IRS accepts return as filed', 'Case closed, no further action'],
            ['Agreed', 'Taxpayer agrees with all changes', 'Sign Form 870, pay or set up payment plan'],
            ['Unagreed', 'Taxpayer disagrees with some/all', '30-day letter, Appeals, Tax Court'],
          ],
        },
        {
          title: 'No Change Closure',
          type: 'text',
          content: "**Best Outcome:**\n\n• Examiner found no adjustments\n• Return accepted as filed\n• Client receives \"No Change\" letter\n• Case is closed\n\n**Keep Records:**\n• Retain documentation used in audit\n• May be relevant if future years examined\n• Shows positions were previously accepted",
        },
        {
          title: 'Agreed Cases',
          type: 'text',
          content: "**When Client Agrees with Adjustments:**\n\n1. **Examiner prepares Form 4549** (Income Tax Examination Changes)\n   • Shows proposed adjustments\n   • Calculates additional tax, penalties, interest\n\n2. **Client signs Form 870** (Waiver of Restrictions)\n   • Waives requirement for statutory notice (90-day letter)\n   • Allows immediate assessment\n   • Interest continues until paid\n\n3. **Assessment and Payment**\n   • Tax assessed when Form 870 processed\n   • Client has options for payment (lump sum, installment)\n\n**Note:** Signing Form 870 generally cannot be undone!",
        },
        {
          title: 'Unagreed Cases',
          type: 'text',
          content: "**When Client Disagrees:**\n\n1. **Request Manager Conference**\n   • Meet with examiner's supervisor\n   • May resolve issues at this level\n\n2. **Receive 30-Day Letter**\n   • Preliminary notice of proposed changes\n   • Right to appeal within 30 days\n\n3. **Choose Response:**\n   • Request Appeals conference\n   • Accept changes and pay\n   • Do nothing (leads to 90-day letter)\n\n4. **If Still Unagreed: Statutory Notice (90-Day Letter)**\n   • Formal notice of deficiency\n   • 90 days to petition Tax Court",
        },
        {
          title: 'Form 870 vs. Form 870-AD',
          type: 'table',
          headers: ['Form', 'When Used', 'Effect'],
          rows: [
            ['Form 870', 'Agreed at exam level', 'Waives 90-day letter, cannot be reopened except for fraud'],
            ['Form 870-AD', 'Agreed at Appeals', 'Closing agreement, prevents refund claim, prevents IRS reopening'],
          ],
        },
        {
          title: '⚠️ When NOT to Agree',
          type: 'warning',
          content: "**Consider rejecting settlement if:**\n\n• Legal position is strong\n• Penalty abatement is warranted but not offered\n• Significant dollar amounts involved\n• Examiner misunderstands facts or law\n• Client willing to pursue Appeals or Tax Court\n\n**Appeals** often reaches better results than examination level!",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "No change = case closed with return accepted",
            "Agreed = sign Form 870, waive right to 90-day letter",
            "Unagreed = receive 30-day letter with appeal rights",
            "Manager conference may resolve issues before appeal",
            "Form 870 generally cannot be undone once signed",
            "Form 870-AD at Appeals is a closing agreement",
            "Appeals often achieves better results than examination",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-024',
    courseId: 'ea',
    section: 'SEE3',
    title: '30-Day and 90-Day Letters',
    description: 'Understand IRS preliminary and statutory notices and response options',
    order: 24,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['30-day letter', '90-day letter', 'Response options'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The 30-day and 90-day letters are critical decision points in the examination process. Missing deadlines can eliminate options. Know what each letter means and how to respond.",
        },
        {
          title: 'The 30-Day Letter',
          type: 'text',
          content: "**Preliminary Notice:**\n\n**What It Is:**\n• IRS proposal of changes\n• NOT a formal assessment\n• Invitation to agree or appeal\n\n**Contains:**\n• Examination report (Form 4549)\n• Explanation of changes\n• Appeal rights information (Pub 5)\n\n**Response Options (within 30 days):**\n1. Sign and agree\n2. Request Appeals conference\n3. Provide additional information\n4. Do nothing (leads to 90-day letter)",
        },
        {
          title: 'Responding to 30-Day Letter',
          type: 'table',
          headers: ['Response', 'Result', 'When Appropriate'],
          rows: [
            ['Sign Form 870', 'Case closed, assessment issued', 'Agree with changes'],
            ['Written protest to Appeals', 'Appeals conference scheduled', 'Disagree, want administrative appeal'],
            ['Small case request', 'Informal Appeals conference', 'Tax + penalties ≤ $25,000 per period'],
            ['Submit more information', 'May resolve issues', 'Have evidence not yet considered'],
            ['No response', 'Receive 90-day letter', 'Want court option'],
          ],
        },
        {
          title: 'The 90-Day Letter (Statutory Notice of Deficiency)',
          type: 'text',
          content: "**The \"Ticket to Tax Court\":**\n\n**What It Is:**\n• Formal statutory notice required before assessment\n• Also called \"Notice of Deficiency\"\n• Certified mail to last known address\n\n**Critical Deadline:**\n• **90 days** from mailing to petition Tax Court\n• **150 days** if addressed outside the US\n• Missing deadline = lose Tax Court option!\n\n**Effect:**\n• Allows IRS to assess after 90 days\n• Freezes assessment during petition period\n• Starts prepayment forum jurisdiction",
        },
        {
          title: 'Response Options to 90-Day Letter',
          type: 'text',
          content: "**Within 90 Days:**\n\n**Option 1: Petition Tax Court**\n• Prepay is NOT required\n• Get judicial review of proposed deficiency\n• Must file timely petition\n\n**Option 2: Agree and Pay**\n• Sign and return agreement\n• Pay or set up payment plan\n• Case closed\n\n**Option 3: Do Nothing**\n• After 90 days, IRS assesses tax\n• Collection process begins\n• Can still contest by paying and filing refund claim",
        },
        {
          title: 'Calculating the 90-Day Deadline',
          type: 'text',
          content: "**The deadline is statutory - no extensions!**\n\n**Calculate from mailing date:**\n• Date on letter (postmark date for processing)\n• Add 90 calendar days\n• If 90th day is Saturday, Sunday, or holiday, next business day applies\n\n**Example:**\n• Letter dated January 15\n• 90 days = April 15\n• If April 15 is weekend, deadline is next Monday\n\n**The date the petition is FILED (received) matters, not mailing date (usually)!**\n\n**Electronic filing:** Available and encouraged",
        },
        {
          title: '⚠️ Critical: Address Changes',
          type: 'warning',
          content: "**IRS sends notice to \"last known address\":**\n\n• If client moved, may not receive 90-day letter!\n• Letter sent to old address is still valid\n• 90-day clock still runs\n\n**Protect Clients:**\n• File Form 8822 (change of address) promptly\n• Consider USPS mail forwarding\n• Monitor client addresses in IRS records\n\n**Missed deadline = no Tax Court = must pay first then sue in refund forum!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "30-day letter is preliminary - invites agreement or appeal",
            "90-day letter is statutory notice required for deficiency",
            "90 days to petition Tax Court - NO EXTENSIONS",
            "Missing 90-day deadline = lose prepayment forum",
            "Sent to last known address - valid even if not received",
            "Small case letter allows informal Appeals for ≤$25,000",
            "Tax Court petition does NOT require prepayment",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-025',
    courseId: 'ea',
    section: 'SEE3',
    title: 'IRS Appeals Process',
    description: 'Master the administrative appeals process for tax disputes',
    order: 25,
    duration: 55,
    difficulty: 'advanced',
    topics: ['Appeals conference', 'Protest requirements', 'Settlement strategies'],
    blueprintArea: 'SEE3-6',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IRS Appeals resolves most tax disputes without litigation. Appeals officers have authority to settle cases based on hazards of litigation. Knowing how Appeals works lets you achieve better outcomes for clients.",
        },
        {
          title: 'What is IRS Appeals?',
          type: 'text',
          content: "**Independent Division of IRS:**\n\n• Separate from Examination\n• Mission is to resolve disputes fairly\n• Settlement authority based on litigation hazards\n• Informal process (not like court)\n\n**Key Concept: Hazards of Litigation**\nAppeals considers the likelihood that IRS would win in court. If IRS position is weak, they'll settle!",
        },
        {
          title: 'How to Request Appeals',
          type: 'table',
          headers: ['Amount', 'Requirement', 'Process'],
          rows: [
            ['≤ $25,000 total', 'Small case request letter', 'Brief written statement'],
            ['> $25,000', 'Formal written protest', 'Detailed statement of facts and law'],
            ['Collection matters', 'CDP or equivalent hearing request', 'Form 12153'],
          ],
        },
        {
          title: 'Written Protest Requirements',
          type: 'text',
          content: "**For amounts over $25,000, include:**\n\n1. Statement requesting Appeals conference\n2. Your name, address, and contact information\n3. Copy of the letter showing proposed changes\n4. Tax periods or years involved\n5. Statement of facts (in your words, not IRS's)\n6. Discussion of applicable law\n7. Argument why you disagree\n8. Penalty of perjury statement\n\n**Submit within the time stated in IRS letter** (usually 30 days)",
        },
        {
          title: 'The Appeals Conference',
          type: 'text',
          content: "**What to Expect:**\n\n• Informal meeting (in-person, video, or phone)\n• Present your case and arguments\n• Appeals Officer considers both sides\n• May request additional documentation\n• Has settlement authority\n\n**Preparation:**\n• Organize legal arguments by issue\n• Identify strengths and weaknesses\n• Know your \"walk away\" point\n• Prepare client for possible outcomes\n• Bring documentation to support positions",
        },
        {
          title: 'Settlement Strategies',
          type: 'text',
          content: "**Effective Approaches:**\n\n**1. Focus on hazards of litigation**\n• Show where IRS position is legally weak\n• Cite relevant case law\n\n**2. Split the baby**\n• Propose splitting contested amounts\n• Shows reasonableness\n\n**3. Trade issues**\n• Concede weak issues\n• Fight strong issues harder\n\n**4. Penalty abatement**\n• Often available even when tax sustained\n• Reasonable cause arguments\n\n**Appeals often achieves 20-50% reductions!**",
        },
        {
          title: '⚠️ Ex Parte Communication Rules',
          type: 'warning',
          content: "**Appeals must remain independent:**\n\n• Prohibited from certain communications with Exam\n• Cannot discuss specific facts of case with examiner\n• Can only discuss legal interpretations\n\n**Why it matters:**\n• You get fresh look at case\n• Appeals isn't bound by examiner's views\n• Different decision-maker may see it differently",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Appeals is independent from Examination",
            "Settlement based on hazards of litigation",
            "Small cases (≤$25K): Brief letter request",
            "Larger cases: Formal written protest required",
            "Focus arguments on where IRS is legally weak",
            "Appeals often achieves significant reductions",
            "Penalty abatement commonly available at Appeals",
          ],
        },
      ],
    },
  },

  // ============================================================================
  // SEE3-4: FILING REQUIREMENTS (Lessons 26-30)
  // ============================================================================

  {
    id: 'SEE3-026',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Return Filing Requirements',
    description: 'Master who must file and when for various return types',
    order: 26,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Individual returns', 'Business returns', 'Due dates'],
    blueprintArea: 'SEE3-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Knowing who must file and when is fundamental! Penalties apply for late or missing returns. As a practitioner, ensuring clients meet filing obligations is one of your core responsibilities.",
        },
        {
          title: 'Individual Filing Requirements',
          type: 'table',
          headers: ['Filing Status', 'Under 65', '65 or Older'],
          rows: [
            ['Single', '$14,600', '$16,550'],
            ['Head of Household', '$21,900', '$23,850'],
            ['MFJ (both under 65)', '$29,200', '-'],
            ['MFJ (one 65+)', '-', '$30,750'],
            ['MFJ (both 65+)', '-', '$32,300'],
            ['MFS', '$5 (any)', '$5 (any)'],
          ],
        },
        {
          title: 'Must File Regardless of Income',
          type: 'text',
          content: "**Special filing requirements:**\n\n• Self-employment income ≥ $400\n• Social Security/Medicare tax on tips not reported to employer\n• Advance Premium Tax Credit received\n• Health Savings Account distributions\n• Alternative minimum tax owed\n• Household employment taxes owed\n• Recapture taxes (first-time homebuyer, education)\n• Write-in taxes\n\n**Also file to claim refund or refundable credit!**",
        },
        {
          title: 'Business Return Due Dates',
          type: 'table',
          headers: ['Entity Type', 'Form', 'Due Date (Calendar Year)', 'Extended Due Date'],
          rows: [
            ['Sole Proprietorship', 'Schedule C with 1040', 'April 15', 'October 15'],
            ['Partnership', 'Form 1065', 'March 15', 'September 15'],
            ['S Corporation', 'Form 1120-S', 'March 15', 'September 15'],
            ['C Corporation', 'Form 1120', 'April 15', 'October 15'],
            ['Trust/Estate', 'Form 1041', 'April 15', 'September 30'],
          ],
        },
        {
          title: 'Information Return Due Dates',
          type: 'text',
          content: "**Forms 1099-NEC:** Due January 31 (to IRS and recipients)\n\n**Forms 1099-MISC, 1099-INT, etc.:**\n• To recipients: January 31\n• To IRS: February 28 (paper) or March 31 (electronic)\n\n**Forms W-2:**\n• To employees: January 31\n• To SSA: January 31\n\n**E-file mandate:** Required for 10+ information returns",
        },
        {
          title: 'Fiscal Year Due Dates',
          type: 'text',
          content: "**For non-calendar year taxpayers:**\n\n• Return due 15th day of 4th month after year end\n• Extension adds 6 months (5 months for certain entities)\n\n**Example: Fiscal year ending June 30:**\n• Original due date: October 15\n• Extended due date: April 15 (following year)\n\n**Partnerships/S Corps with fiscal years:**\n• Due 15th day of 3rd month after year end",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Individual thresholds vary by filing status and age",
            "Must file with SE income ≥ $400 regardless of threshold",
            "Partnerships/S Corps due March 15 (calendar year)",
            "C Corps/Individuals due April 15 (calendar year)",
            "1099-NEC due January 31 to both IRS and recipients",
            "E-file required for 10+ information returns",
            "File even below threshold if refund or credit available",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-027',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Extensions and Estimated Taxes',
    description: 'Master extension procedures and estimated tax safe harbors',
    order: 27,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Automatic extensions', 'Estimated tax payments', 'Safe harbors'],
    blueprintArea: 'SEE3-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Extensions give clients more time to file without penalty, but payment is still due on time. Understanding estimated tax requirements prevents underpayment penalties throughout the year.",
        },
        {
          title: 'Extension Forms and Periods',
          type: 'table',
          headers: ['Return Type', 'Extension Form', 'Extension Period'],
          rows: [
            ['Individual (Form 1040)', 'Form 4868', '6 months (to Oct 15)'],
            ['Partnership (Form 1065)', 'Form 7004', '6 months (to Sep 15)'],
            ['S Corporation (Form 1120-S)', 'Form 7004', '6 months (to Sep 15)'],
            ['C Corporation (Form 1120)', 'Form 7004', '6 months (to Oct 15)'],
            ['Estate/Trust (Form 1041)', 'Form 7004', '5½ months (to Sep 30)'],
          ],
        },
        {
          title: 'Extensions - Key Points',
          type: 'text',
          content: "**Extension Extends TIME TO FILE, NOT TIME TO PAY!**\n\n**Automatic upon filing:**\n• No reason required\n• IRS does not \"approve\"\n• Just file timely and extension is granted\n\n**Payment still due:**\n• Estimate tax and pay with extension\n• Failure to pay = penalty + interest\n• Interest runs from original due date\n\n**Auto-extension for overseas:**\n• U.S. citizens/residents abroad: 2-month auto-extension\n• Interest still accrues from original due date!",
        },
        {
          title: 'Estimated Tax Requirements',
          type: 'text',
          content: "**Who Must Pay Estimates:**\n\n• Expected liability ≥ $1,000 after withholding and credits\n• Self-employed individuals\n• Investors with significant gains/dividends\n• Retirees without adequate withholding\n\n**Quarterly Due Dates (Calendar Year):**\n• Q1: April 15\n• Q2: June 15\n• Q3: September 15\n• Q4: January 15 (following year)",
        },
        {
          title: 'Safe Harbor Rules',
          type: 'text',
          content: "**Avoid Penalty by Paying Either:**\n\n**Option 1: Current Year Method**\n• 90% of current year's tax liability\n\n**Option 2: Prior Year Method**\n• 100% of prior year's tax liability, OR\n• 110% if prior year AGI > $150,000 ($75,000 MFS)\n\n**Prior year safe harbor is usually easier** - you know the amount!\n\n**Requirements:**\n• Prior year was 12-month tax year\n• Prior year had a tax liability",
        },
        {
          title: 'Annualized Income Method',
          type: 'text',
          content: "**For Uneven Income Throughout Year:**\n\nIf income varies seasonally:\n• Can annualize income each quarter\n• Pay estimates based on income earned through period\n\n**Form 2210, Schedule AI required**\n\n**Useful for:**\n• Seasonal businesses\n• Capital gains realized in one quarter\n• Bonuses received late in year\n\n**Benefit:** Lower early estimates when income is low",
        },
        {
          title: '⚠️ Underpayment Penalty',
          type: 'warning',
          content: "**Penalty if you don't meet safe harbors:**\n\n• Interest-based penalty on underpayment\n• Calculated quarter by quarter\n• IRS or Form 2210 computes amount\n\n**No penalty if:**\n• Total tax less than $1,000\n• You paid 100% (or 110%) of prior year\n• You paid 90% of current year\n\n**Increased withholding = estimated payments!**\nWithholding is treated as paid evenly throughout the year.",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Form 4868 extends filing to October 15 (individuals)",
            "Extension is automatic - no approval needed",
            "Payment still due by original due date",
            "Estimate safe harbors: 90% current OR 100%/110% prior year",
            "Quarterly estimates: April, June, September, January",
            "Annualized income method for seasonal income variation",
            "Increase W-4 withholding as alternative to estimates",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-028',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Electronic Filing Requirements',
    description: 'Understand e-file mandates and preparer requirements',
    order: 28,
    duration: 40,
    difficulty: 'beginner',
    topics: ['E-file mandate', 'ERO requirements', 'Signatures'],
    blueprintArea: 'SEE3-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Electronic filing is now the standard. Most preparers must e-file, and clients expect it. Know the mandates, ERO responsibilities, and signature requirements.",
        },
        {
          title: 'E-File Mandates',
          type: 'table',
          headers: ['Preparer Type', 'E-File Required When'],
          rows: [
            ['Tax Return Preparers', 'File 11+ individual returns per year'],
            ['Partnerships', '100+ partners (must e-file)'],
            ['Corporations', 'Assets ≥ $10 million'],
            ['Information Returns', '10+ returns (aggregate)'],
            ['Employment Returns', 'Varies by form and filer size'],
          ],
        },
        {
          title: 'ERO Responsibilities',
          type: 'text',
          content: "**Electronic Return Originator (ERO):**\n\n**A preparer who e-files must:**\n• Apply to be Authorized IRS e-file Provider\n• Complete e-file application\n• Pass suitability check\n• Comply with Pub 1345 requirements\n\n**ERO Duties:**\n• Collect taxpayer signatures (Form 8879)\n• Retain signed authorization 3 years\n• Provide copy of return to taxpayer\n• Correct rejected returns promptly",
        },
        {
          title: 'Form 8879: IRS e-file Signature Authorization',
          type: 'text',
          content: "**Required Before Transmitting Return:**\n\n• Taxpayer (and spouse) must sign\n• Authorizes ERO to enter PIN for e-signature\n• Authorizes direct deposit/debit\n• Must be signed AFTER return is complete\n\n**Cannot transmit before obtaining signature!**\n\n**Retain Form 8879 for 3 years** from due date or filing date, whichever is later.",
        },
        {
          title: 'Electronic Signatures',
          type: 'text',
          content: "**Self-Select PIN Program:**\n• Taxpayer creates 5-digit PIN\n• Used to sign e-filed return\n• ERO enters on behalf of taxpayer (with authorization)\n\n**Practitioner PIN:**\n• Preparer enters taxpayer's prior-year AGI or PIN\n• Creates signature for current return\n\n**Remote Transactions:**\n• IRS permits electronic signatures on Form 8879\n• Specific requirements apply (email, portal, etc.)\n• Made permanent after COVID-era temporary rules",
        },
        {
          title: 'Rejected Returns',
          type: 'text',
          content: "**If E-File Is Rejected:**\n\n1. Notify taxpayer within 24 hours\n2. Take reasonable steps to fix error\n3. Re-transmit corrected return\n\n**Common Rejection Reasons:**\n• Duplicate SSN (already filed)\n• AGI/PIN mismatch\n• Incorrect dependent SSN\n• Name/SSN mismatch with SSA records\n\n**If can't be fixed:** May file paper return with rejection code",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Preparers filing 11+ returns must e-file",
            "Must be Authorized IRS e-file Provider",
            "Form 8879 required before transmitting",
            "Retain Form 8879 for 3 years",
            "Electronic signatures now permitted on 8879",
            "Fix and re-transmit rejected returns within 24 hours",
            "Paper filing allowed if e-file rejected and uncorrectable",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-029',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Non-Filer Procedures',
    description: 'Handle clients who haven\'t filed required returns',
    order: 29,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['SFR', 'Delinquent returns', 'Compliance'],
    blueprintArea: 'SEE3-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Many potential clients walk in with years of unfiled returns. Knowing how to bring them into compliance, deal with IRS notices, and challenge substitute returns is essential for building a tax practice.",
        },
        {
          title: 'Substitute for Return (SFR)',
          type: 'text',
          content: "**What is an SFR?**\n\nIf you don't file, IRS can prepare a return FOR you:\n• Uses available information (W-2s, 1099s)\n• Files as Single or MFS (least favorable)\n• No itemized deductions\n• No exemptions/credits\n• Almost always OVERSTATES tax\n\n**The SFR is assessed, and collection begins!**",
        },
        {
          title: 'SFR Process',
          type: 'table',
          headers: ['Step', 'IRS Action', 'Taxpayer Response'],
          rows: [
            ['1', 'Send CP59/CP515 (notice to file)', 'File return or respond'],
            ['2', 'Send CP518 (second notice)', 'File return or respond'],
            ['3', 'Prepare and process SFR', 'SFR assesses tax due'],
            ['4', 'Issue Notice of Deficiency (90-day)', 'Petition Tax Court OR file actual return'],
            ['5', 'Assess tax and begin collection', 'Collection Due Process rights'],
          ],
        },
        {
          title: 'Filing Delinquent Returns',
          type: 'text',
          content: "**To Replace an SFR:**\n\n1. Prepare accurate return for the year(s)\n2. File with IRS (by mail if e-file rejected)\n3. Include all applicable deductions and credits\n4. Show correct tax liability\n\n**IRS Processing:**\n• Reviews filed return vs. SFR\n• Adjusts assessment if return accepted\n• May audit filed return\n\n**Time limit:** Generally none to file correcting return, but refunds expire after 3 years from original due date",
        },
        {
          title: 'Penalty Relief for Non-Filers',
          type: 'text',
          content: "**First Time Abatement:**\n• Available if prior 3 years clean\n• Covers failure-to-file and failure-to-pay\n• Request when filing delinquent returns\n\n**Reasonable Cause:**\n• Medical issues, natural disasters\n• Death in family\n• Reliance on professional\n• Document thoroughly!\n\n**File extension for future years** even if not ready to file the return",
        },
        {
          title: 'Voluntary Disclosure Practice',
          type: 'text',
          content: "**For Serious Non-Compliance:**\n\n**Criminal Investigation Voluntary Disclosure:**\n• Pre-clearance required\n• Before IRS initiates investigation\n• May avoid criminal prosecution\n• Civil penalties still apply\n\n**Offshore Voluntary Disclosure:**\n• For unreported foreign income/accounts\n• Specific procedures apply\n• Better than getting caught!\n\n**Consult with specialists** for serious non-filer cases",
        },
        {
          title: '⚠️ Practice Tips',
          type: 'warning',
          content: "**Working with Non-Filers:**\n\n• Get ALL prior returns filed before current year\n• IRS prioritizes compliance - show good faith\n• Request penalty abatement in writing\n• Consider Installment Agreement for amounts owed\n• Watch refund statutes - they expire!\n\n**Document everything** - these cases often have collection issues too",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SFR is IRS-prepared return - usually wrong and overstated",
            "SFR uses single/MFS, no deductions, no credits",
            "Can replace SFR by filing accurate return",
            "First Time Abatement available if prior 3 years clean",
            "Refund expires 3 years from original due date",
            "Get all delinquent years filed for compliance",
            "Serious cases may need criminal defense counsel",
          ],
        },
      ],
    },
  },

  {
    id: 'SEE3-030',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Penalties and Interest',
    description: 'Master common penalties, interest calculations, and abatement strategies',
    order: 30,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Failure to file', 'Failure to pay', 'Accuracy penalties', 'Abatement'],
    blueprintArea: 'SEE3-5',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Penalties and interest can exceed the original tax! Knowing the penalty structure, how interest compounds, and strategies for abatement helps you protect clients and manage their liabilities.",
        },
        {
          title: 'Common Civil Penalties',
          type: 'table',
          headers: ['Penalty', 'Rate', 'Maximum', 'Statute'],
          rows: [
            ['Failure to File (FTF)', '5%/month of unpaid tax', '25%', 'IRC §6651(a)(1)'],
            ['Failure to Pay (FTP)', '0.5%/month of unpaid tax', '25%', 'IRC §6651(a)(2)'],
            ['Combined FTF + FTP', 'Net 5%/month', '25% + 25% = 47.5%', '-'],
            ['Accuracy-Related', '20% of underpayment', 'No maximum', 'IRC §6662'],
            ['Fraud', '75% of underpayment', 'No maximum', 'IRC §6663'],
          ],
        },
        {
          title: 'Failure to File vs. Failure to Pay',
          type: 'text',
          content: "**Failure to File (FTF):**\n• 5% per month (or part of month)\n• Maximum 25%\n• Minimum: lesser of $510 or 100% of tax (if 60+ days late)\n\n**Failure to Pay (FTP):**\n• 0.5% per month\n• Maximum 25%\n• Increases to 1%/month after notice demand\n• Reduces to 0.25% if on installment agreement\n\n**When Both Apply:**\nFTF reduced by FTP for same month (net 4.5%/month + 0.5%/month = 5%)",
        },
        {
          title: 'Accuracy-Related Penalties',
          type: 'text',
          content: "**20% Penalty for:**\n\n• **Negligence:** Lack of reasonable attempt to comply\n• **Disregard:** Careless, reckless, or intentional disregard of rules\n• **Substantial Understatement:**\n  - Individuals: > $5,000 OR > 10% of correct tax\n  - Corporations: > $10 million OR > 10% of correct tax\n• **Substantial Valuation Misstatement:** Overstated value by 150%+\n\n**Defense:** Reasonable cause and good faith",
        },
        {
          title: 'Interest on Underpayments',
          type: 'text',
          content: "**Interest Rate:**\n• Federal short-term rate + 3%\n• Compounded daily\n• Adjusted quarterly\n• Typically 7-8% (varies by economy)\n\n**Interest Cannot Be Abated!**\n• Only exceptions: IRS error causing delay\n• Even with penalty abatement, interest continues\n\n**Interest runs from:**\n• Due date of return (or extended due date for payment)\n• Assessment date for some penalties",
        },
        {
          title: 'Penalty Abatement Strategies',
          type: 'table',
          headers: ['Strategy', 'Applies To', 'Requirements'],
          rows: [
            ['First Time Abatement', 'FTF, FTP', '3 prior years clean, all returns filed'],
            ['Reasonable Cause', 'Most civil penalties', 'Ordinary business care exercised'],
            ['Statutory Exception', 'Specific penalties', 'Meet specific exception criteria'],
            ['Written Advice Defense', 'Various', 'Relied on erroneous IRS advice'],
          ],
        },
        {
          title: 'Requesting Abatement',
          type: 'text',
          content: "**First Time Abatement (FTA):**\n• Request by phone (for simple cases)\n• Write letter citing FTA administrative waiver\n• Applies to FTF and FTP for one year\n\n**Reasonable Cause:**\n• Written request explaining circumstances\n• Document ordinary business care\n• Explain what caused non-compliance\n• Show how you tried to comply\n\n**Form 843** for formal refund claim including penalty abatement",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "FTF = 5%/month (max 25%); FTP = 0.5%/month (max 25%)",
            "Combined can reach 47.5% plus interest",
            "Accuracy penalty = 20% for negligence or understatement",
            "Interest cannot be abated (except IRS error)",
            "First Time Abatement if 3 prior years clean",
            "Reasonable cause requires showing ordinary business care",
            "Request abatement in writing with documentation",
          ],
        },
      ],
    },
  },
  // ============================================================================
  // SEE3 Expansion: Audits, Appeals, Collections, and More
  // ============================================================================
  
  {
    id: 'SEE3-031',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Audit Process: Selection and Types',
    description: 'Understanding how returns are selected for examination and the different types of audits.',
    order: 31,
    duration: 35,
    difficulty: 'medium',
    topics: ['DIF Score', 'Correspondence Audit', 'Office Audit', 'Field Audit'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Audit Selection Methods',
          type: 'text',
          content: "**DIF System (Discriminant Function):** Computer scoring (higher score = higher audit probability). Uses algorithms to find anomalies.\n**UIDIF (Unreported Income DIF):** Scores based on potential for unreported income.\n**Information Matching:** 1099s/W-2s don't match return.\n**Related Examinations:** Often happens when a business partner or investor is audited.",
        },
        {
          title: 'Types of Examinations',
          type: 'table',
          headers: ['Type', 'Description', 'Typical Issues'],
          rows: [
            ['Correspondence', 'Conducted by mail. 75%+ of audits.', 'Simple issues: Missing 1099, Math errors, Charity substantiation'],
            ['Office Audit', 'At IRS office. Interview with Tax Compliance Officer.', 'Small business Sch C, Rental expenses, Moving expenses'],
            ['Field Audit', 'At taxpayer home/business. Revenue Agent involved.', 'Complex specific issues, Inventory, Gross receipts, large corporations'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Most audits are limited to specific items (Correspondence).",
            "Field audits are the most comprehensive.",
            "DIF score is the primary selection method.",
            "Representation is allowed at all levels.",
          ],
        },
      ],
    },
  },
  {
    id: 'SEE3-032',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Audit Representation and Taxpayer Rights',
    description: 'Rights of taxpayers during examination and role of the representative.',
    order: 32,
    duration: 30,
    difficulty: 'medium',
    topics: ['Taxpayer Bill of Rights', 'Power of Attorney', 'Summons', 'Statute of Limitations'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Taxpayer Bill of Rights (TBOR)',
          type: 'list',
          items: [
             "The Right to Be Informed",
             "The Right to Quality Service",
             "The Right to Pay No More than the Correct Amount of Tax",
             "The Right to Challenge the IRS's Position and Be Heard",
             "The Right to Appeal an IRS Decision in an Independent Forum",
             "The Right to Finality",
             "The Right to Privacy",
             "The Right to Confidentiality",
             "The Right to Retain Representation",
             "The Right to a Fair and Just Tax System"
          ],
        },
        {
          title: 'Role of Representative',
          type: 'text',
          content: "**Form 2848 (POA):** Required to represent.\n**Benefits:**\n• IRS contacts YOU, not the client.\n• You can sign agreements (if authorized).\n• You attend interviews (client generally not required if you are there).\n\n**Bypassing the Rep:** IRS can bypass if you are causing unreasonable delays or hindering the examination.",
        },
        {
          title: 'Assessment Statute (ASED)',
          type: 'text',
          content: "Generally **3 years** from later of due date or filing date.\n**6 Years:** If >25% gross income omitted.\n**Unlimited:** Fraud, or no return filed.\n\n**Extension (Form 872):** IRS may ask to extend statute to finish audit. Taxpayer can refuse (IRS will likely issue Notice of Deficiency immediately) or limit scope.",
        },
      ],
    },
  },
  {
    id: 'SEE3-033',
    courseId: 'ea',
    section: 'SEE3',
    title: 'The Appeals Process',
    description: 'From 30-Day Letter to Appeals Conference.',
    order: 33,
    duration: 40,
    difficulty: 'hard',
    topics: ['30-Day Letter', 'Protest', 'Small Case Request', 'Appeals Conference'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
         {
          title: '30-Day Letter (Preliminary Notice)',
          type: 'text',
          content: "Issued after audit if unagreed.\n**Options:**\n1. Sign agreement (Form 870) - Give up appeal rights.\n2. Do nothing - Wait for 90-Day Letter.\n3. Request Appeals Conference (within 30 days).",
         },
         {
          title: 'How to Appeal',
          type: 'table',
          headers: ['Amount Disputed', 'Requirement'],
          rows: [
            ['< $25,000', 'Small Case Request (Form 12203 or simple written request). No formal protest needed.'],
            ['> $25,000', 'Formal Written Protest required. Must detail facts, law, and arguments.'],
          ],
         },
         {
          title: 'The Appeals Mission',
          type: 'callout',
          content: "To resolve tax controversies, without litigation, on a basis which is fair and impartial to both the Government and the taxpayer. Appeals Officers can settle based on 'Hazards of Litigation'.",
         },
      ],
    },
  },
  {
    id: 'SEE3-034',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Going to Court: Tax Court vs Others',
    description: 'Litigation options when administrative appeals fail.',
    order: 34,
    duration: 35,
    difficulty: 'hard',
    topics: ['90-Day Letter', 'Tax Court', 'District Court', 'Court of Federal Claims'],
    blueprintArea: 'SEE3-3',
    content: {
      sections: [
        {
          title: 'Notice of Deficiency (90-Day Letter)',
          type: 'text',
          content: "**The Ticket to Tax Court.**\nIssued if 30-day letter ignored or Appeals fails.\n**Strict Deadline:** 90 days (150 if outside US) from date of letter to file petition. Cannot be extended.",
        },
        {
          title: 'Comparison of Courts',
          type: 'table',
          headers: ['Court', 'Payment Required?', 'Jury?', 'Judges'],
          rows: [
             ['US Tax Court', 'NO', 'No', 'Tax Specialists (Travel nationwide)'],
             ['US District Court', 'YES (Refund Suit)', 'Yes (Available)', 'General Federal Judges'],
             ['Court of Federal Claims', 'YES (Refund Suit)', 'No', 'General Claims Judges (DC based)'],
          ],
        },
        {
          title: 'Small Tax Case Procedure (Tax Court)',
          type: 'text',
          content: "**Limit:** $50,000 or less per tax year.\n**Pros:** Simplified, less formal, faster, cheaper.\n**Cons:** Decision is FINAL. Cannot be appealed.",
        },
      ],
    },
  },
  {
    id: 'SEE3-035',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Collections: Installment Agreements',
    description: 'Options for taxpayers who cannot pay in full immediately.',
    order: 35,
    duration: 40,
    difficulty: 'medium',
    topics: ['Form 9465', 'Guaranteed IA', 'Streamlined IA', 'Partial Pay IA'],
    blueprintArea: 'SEE3-4',
    content: {
      sections: [
        {
          title: 'Setting up an Agreement',
          type: 'text',
          content: "Form 9465 used to request. Fees apply (lower for Direct Debit).\n**Note:** Interest and Failure to Pay penalties continue to accrue (penalty rate cut in half usually).",
        },
        {
           title: 'Types of Agreements',
           type: 'table',
           headers: ['Type', 'Balance Limit', 'Terms', 'Fin. Statement Needed?'],
           rows: [
             ['Guaranteed', '< $10,000', 'Pay in 3 years', 'No'],
             ['Streamlined', '< $50,000', 'Pay in 72 months (6 yrs)', 'No'],
             ['Non-Streamlined', '> $50,000', 'Negotiated based on ability', 'Yes (Form 433-F/A/etc)'],
           ],
        },
        {
          title: 'Partial Payment Installment Agreement (PPIA)',
          type: 'text',
          content: "Taxpayer pays what they can afford until CSED expires. Remainder is uncollected. Requires full financial disclosure (Form 433) and periodic review (every 2 years).",
        },
      ],
    },
  },
  {
    id: 'SEE3-036',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Collections: Offer in Compromise (OIC)',
    description: 'Resolving tax liability for less than the full amount owed.',
    order: 36,
    duration: 45,
    difficulty: 'hard',
    topics: ['Doubt as to Liability', 'Doubt as to Collectibility', 'ETA', 'Form 656'],
    blueprintArea: 'SEE3-4',
    content: {
      sections: [
        {
           title: 'What is an OIC?',
           type: 'callout',
           content: "An agreement between a taxpayer and the IRS that resolves the taxpayer's tax liability. The IRS has the authority to settle, or compromise, federal tax liabilities by accepting less than full payment under certain circumstances.",
        },
        {
          title: 'Three Bases for OIC',
          type: 'text',
          content: "1. **Doubt as to Liability:** Genuine dispute exists as to the existence or amount.\n2. **Doubt as to Collectibility:** Taxpayer's receipts + equity (RCP) < Tax Owed. (Most common).\n3. **Effective Tax Administration (ETA):** Owe it, can pay it, but would cause exceptional hardship or be unfair.",
        },
        {
          title: 'The Math: Reasonable Collection Potential (RCP)',
          type: 'text',
          content: "**RCP = (Net Equity in Assets) + (Future Disposable Income)**\n\nIf IRS calculates RCP > Offer Amount, they will reject.\n**Disposable Income Multiplier:**\n• Cash Offer (paid in 5 months): Monthly Income x 12\n• Periodic Payment (6-24 months): Monthly Income x 24",
        },
        {
          title: 'Process',
          type: 'list',
          items: [
             "File Form 656 and Form 433-A (OIC).",
             "Pay application fee and initial payment (unless Low Income Certification).",
             "While pending: Collection paused, CSED suspended.",
             "If rejected: Can appeal within 30 days.",
          ],
        },
      ],
    },
  },
  {
    id: 'SEE3-037',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Liens and Levies',
    description: 'IRS enforcement tools and how to release them.',
    order: 37,
    duration: 35,
    difficulty: 'hard',
    topics: ['Federal Tax Lien', 'Notice of Intent to Levy', 'Bank Levy', 'Wage Garnishment'],
    blueprintArea: 'SEE3-4',
    content: {
      sections: [
        {
          title: 'Federal Tax Lien',
          type: 'text',
          content: "**Lien:** Legal claim against property to secure payment.\n**Levy:** Actual seizure of property/funds.\n\n**Notice of Federal Tax Lien (NFTL):** Used to establish priority against other creditors. Public record. Harmful to credit.",
        },
        {
           title: 'Releasing a Lien',
           type: 'list',
           items: [
              "Pay in full (automatic release within 30 days).",
              "Discharge of Property: Removing lien from specific property (e.g., to sell a house).",
              "Subordination: Letting another creditor move ahead of IRS (e.g., to refinance).",
              "Withdrawal: Removing the public notice (as if it never happened) - e.g., if filed in error or entered Direct Debit IA.",
           ],
        },
        {
          title: 'Levy and Seizure',
          type: 'text',
          content: "**Wage Garnishment:** Continuous levy until released. Exempt amount is very low (based on standard deduction).\n**Bank Levy:** One-time seizure of funds in account on that day. 21-day holding period before bank sends money (time to release).",
        },
        {
           title: 'Collection Due Process (CDP)',
           type: 'callout',
           content: "Taxpayer must receive 'Final Notice of Intent to Levy' and right to CDP hearing 30 days before levy (except Jeopardy/State Refund).",
        },
      ],
    },
  },
  {
    id: 'SEE3-038',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Trust Fund Recovery Penalty (TFRP)',
    description: 'Personal liability for business payroll taxes.',
    order: 38,
    duration: 30,
    difficulty: 'hard',
    topics: ['Form 2751', 'Responsible Person', 'Willfulness', '100% Penalty'],
    blueprintArea: 'SEE3-4',
    content: {
      sections: [
        {
          title: 'What is Trust Fund Tax?',
          type: 'text',
          content: "Income Tax Withheld + Employee Share of FICA (SS/Med). \nDoes **NOT** include Employer match of FICA or FUTA.\n\nThis money belongs to employees; employer holds it in 'trust'.",
        },
        {
          title: 'The Penalty',
          type: 'text',
          content: "If business fails to pay, IRS can assess 100% of the trust fund amount against ANY **Responsible Person** who **Willfully** failed to pay.",
        },
        {
          title: 'Tests for Liability',
          type: 'table',
          headers: ['Condition', 'Meaning'],
          rows: [
            ['Responsible Person', 'Duty and power to direct payments. Signs checks, hires/fires, makes financial decisions. Can be officer, employee, board member, or even outside accountant if they had control.'],
            ['Willfulness', 'Voluntary, conscious, intentional act. Paying other creditors (suppliers, rent, yourself) while knowing taxes are unpaid.'],
          ],
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Penalty is 100% of unpaid trust fund taxes.",
            "Can be assessed against multiple people (Joint and Several Liability).",
            "Not dischargeable in personal bankruptcy.",
          ],
        },
      ],
    },
  },
  {
    id: 'SEE3-039',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Recordkeeping Requirements',
    description: 'How long to keep records for individuals and businesses.',
    order: 39,
    duration: 25,
    difficulty: 'easy',
    topics: ['Statute of Limitations', 'Employment Tax Records', 'Asset Records'],
    blueprintArea: 'SEE3-5',
    content: {
      sections: [
        {
          title: 'General Rules',
          type: 'table',
          headers: ['Period', 'Situation'],
          rows: [
             ['3 Years', 'General rule (from due date or filing date).'],
             ['6 Years', 'If income underreported by > 25%.'],
             ['7 Years', 'Claim for loss from worthless securities or bad debt.'],
             ['Unlimited', 'Fraudulent return or no return filed.'],
          ],
        },
        {
           title: 'Specific Requirements',
           type: 'list',
           items: [
             "**Employment Taxes:** Keep for 4 years after tax becomes due or is paid.",
             "**Assets:** Keep records until period expires for the year in which you dispose of the property (basis tracking).",
             "**EITC Due Diligence:** Keep for 3 years.",
           ],
        },
        {
          title: 'Electronic Storage',
          type: 'text',
          content: "Paper records can be converted to electronic storage systems. Must be: \n1. Complete and accurate\n2. Accessible/Retrievable\n3. Legible/Readable\n4. Reliable/Secure",
        },
      ],
    },
  },
  {
    id: 'SEE3-040',
    courseId: 'ea',
    section: 'SEE3',
    title: 'Circular 230: Preparer Penalties in Depth',
    description: 'Detailed review of civil penalties for tax return preparers.',
    order: 40,
    duration: 40,
    difficulty: 'hard',
    topics: ['Section 6694', 'Section 6695', 'Unreasonable Position', 'Willful/Reckless'],
    blueprintArea: 'SEE3-1',
    content: {
       sections: [
         {
           title: 'Understatement of Liability (Sec 6694)',
           type: 'table',
           headers: ['Type', 'Penalty Amount', 'Defense'],
           rows: [
             ['Unreasonable Position', 'Greater of $1,000 or 50% of income', 'Reasonable Basis disclosed OR Substantial Authority (undisclosed)'],
             ['Tax Shelter', 'Same', 'More Likely Than Not (>50%)'],
             ['Willful/Reckless', 'Greater of $5,000 or 75% of income', 'None (if proven)'],
           ],
         },
         {
           title: 'Other Assessable Penalties (Sec 6695)',
           type: 'list',
           items: [
             "**Failure to Furnish Copy:** $60/failure (Max $30,000)",
             "**Failure to Sign Return:** $60/failure (Max $30,000)",
             "**Failure to Furnish PTIN:** $60/failure (Max $30,000)",
             "**Failure to Retain Copy/List:** $60/failure (Max $30,000)",
             "**Negotiating Refund Check:** $600/check (No Max limit!)",
             "**EITC Due Diligence Failure:** $600/failure (indexed for inflation)",
           ],
         },
         {
            title: 'Injunctions (Sec 7407)',
            type: 'text',
            content: "IRS can seek court injunction to stop a preparer from engaging in specific conduct or facing a **lifetime ban** from preparing returns if conduct is repeated/egregious.",
         },
       ],
    },
  }
];

// Export section lessons
export const getSEE3Lessons = () => eaPart3Lessons;
export const getSEE3LessonById = (id: string) => eaPart3Lessons.find(l => l.id === id);
export const getSEE3LessonCount = () => eaPart3Lessons.length;
