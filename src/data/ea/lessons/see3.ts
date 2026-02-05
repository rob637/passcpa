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
];

// Export section lessons
export const getSEE3Lessons = () => eaPart3Lessons;
export const getSEE3LessonById = (id: string) => eaPart3Lessons.find(l => l.id === id);
export const getSEE3LessonCount = () => eaPart3Lessons.length;
