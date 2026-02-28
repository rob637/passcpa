import { Lesson } from '../../../types';

export const regLessons: Lesson[] = [
  {
    id: 'REG-I-001',
    section: 'REG',
    courseId: 'cpa',
    title: "Treasury Circular 230: Practice Before IRS",
    description: "Master the rules governing practice before the Internal Revenue Service",
    order: 1,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Ethics", "Circular 230"],
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Circular 230 is the LAW for tax practitioners! It governs who can practice before the IRS and how they must behave. Violations can result in disbarment, suspension, or monetary penalties. This is heavily tested on REG!"
        },
        {
          title: 'Who May Practice Before the IRS?',
          type: 'text',
          content: "**\"Practice\" means:**\n• Representing taxpayers\n• Preparing and filing documents\n• Communicating with IRS on taxpayer's behalf\n\n**Authorized practitioners:**\n• Attorneys (licensed, in good standing)\n• CPAs (licensed, in good standing)\n• Enrolled Agents (EAs)\n• Enrolled Actuaries (limited to pension matters)\n• Enrolled Retirement Plan Agents (limited)"
        },
        {
          title: '🧠 Memory Aid: Who Can Practice',
          type: 'callout',
          content: "**\"ACE\"** can practice:\n\n**A**ttorneys\n**C**PAs\n**E**nrolled Agents\n\n**These three have UNLIMITED practice rights!**"
        },
        {
          title: 'Practitioner Duties & Restrictions',
          type: 'table',
          headers: ['Duty', 'Requirement'],
          rows: [
            ['Due Diligence', 'Must exercise due diligence in preparing returns and documents'],
            ['Return Accuracy', 'Cannot willfully sign false returns'],
            ['Client Information', 'Must promptly submit information requested by IRS'],
            ['Knowledge of Error', 'Must advise client of errors and consequences'],
            ['Conflicting Interests', 'Cannot represent conflicting interests without disclosure and consent']
          ]
        },
        {
          title: 'Standards for Tax Positions',
          type: 'text',
          content: "**Advising positions on returns:**\n\n**Standard:** Realistic possibility of being sustained on merits\n\n**\"Realistic possibility\" = 1 in 3 (33%+) chance of success**\n\n**Cannot advise positions that:**\n• Lack reasonable basis\n• Are frivolous\n• Are solely for delay"
        },
        {
          title: 'Written Advice Standards',
          type: 'text',
          content: "**Must not give written advice that:**\n\n• Is based on unreasonable assumptions\n• Unreasonably relies on client representations\n• Doesn't consider all relevant facts\n• Reaches unreasonable conclusions\n\n**Covered opinions** have additional requirements for tax shelter transactions"
        },
        {
          title: 'Prohibited Conduct',
          type: 'list',
          content: [
            "Making false or misleading statements to IRS",
            "Using threat or false accusations to coerce",
            "Charging unconscionable fees",
            "Unauthorized disclosure of client information",
            "Negotiating refund checks (preparers only)",
            "Soliciting in prohibited ways",
            "Practicing while suspended or disbarred"
          ]
        },
        {
          title: '⚠️ Exam Trap: Refund Check Negotiation',
          type: 'warning',
          content: "**Tax return preparers CANNOT:**\n\n• Endorse or negotiate client refund checks\n• This applies even with client permission!\n\n**Why?** Prevents preparer fraud\n\n**Attorneys and CPAs representing clients in other matters CAN negotiate checks**—but not when acting as preparers!"
        },
        {
          title: 'Sanctions for Violations',
          type: 'text',
          content: "**OPR (Office of Professional Responsibility) can:**\n\n• **Censure** - Public reprimand\n• **Suspend** - Temporary loss of practice rights\n• **Disbar** - Permanent loss of practice rights\n• **Monetary penalty** - Up to $1,000 per violation\n\n**Willful violations = Disbarment likely**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Circular 230 governs practice before the IRS",
            "CPAs, attorneys, and EAs have unlimited practice rights",
            "Must exercise due diligence in all tax matters",
            "Tax positions need realistic possibility (33%+) of success",
            "Cannot negotiate client refund checks",
            "Violations can result in suspension or disbarment",
            "Must advise clients of discovered errors"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-I-002',
    section: 'REG',
    courseId: 'cpa',
    title: "AICPA Statements on Standards for Tax Services",
    description: "Understand the ethical standards CPAs must follow in tax practice",
    order: 2,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Ethics", "SSTS"],
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The AICPA Statements on Standards for Tax Services (SSTS) set ethical guidelines specifically for CPAs providing tax services. While Circular 230 is law, SSTS represents professional standards that can also lead to AICPA discipline!"
        },
        {
          title: 'Overview of SSTS',
          type: 'text',
          content: "**What are SSTS?**\n\n• Ethical standards for CPAs in tax practice\n• Complement (don't replace) Circular 230\n• Enforceable through AICPA ethics process\n• Cover return preparation, positions, advice\n\n**7 Statements covering tax practice**"
        },
        {
          title: 'SSTS No. 1: Tax Return Positions',
          type: 'text',
          content: "**Standard for taking positions:**\n\n• Must have **good faith belief** position is warranted\n• Position should have **realistic possibility of being sustained**\n• Can take aggressive position if properly disclosed\n\n**Key:** Don't sign returns with positions lacking reasonable basis"
        },
        {
          title: '🧠 Memory Aid: 7 SSTS Standards',
          type: 'callout',
          content: "**\"PAPERS QE\"** for 7 SSTS:\n\n**P**ositions on returns (SSTS 1)\n**A**nswers to questions (SSTS 2)\n**P**rocedural aspects (SSTS 3)\n**E**stimates (SSTS 4)\n**R**ecommendations (SSTS 5) - omit\n**S**ubsequent knowledge (SSTS 6)\n\n**Q**uality of advice (SSTS 7)\n**E**stimates again considered"
        },
        {
          title: 'SSTS No. 2: Answers to Questions',
          type: 'text',
          content: "**Regarding questions on returns:**\n\n• CPA should make reasonable effort to obtain answers\n• Can sign return with unanswered questions if:\n  - Information not readily available\n  - Answer unlikely to be significant\n\n**Document reasons for omitting answers!**"
        },
        {
          title: 'SSTS No. 3: Procedural Aspects',
          type: 'text',
          content: "**Certain procedural matters:**\n\n• CPA can rely on information from client without verification\n• UNLESS information appears incorrect/incomplete\n• Should make reasonable inquiries\n\n**\"Trust but verify\" when things don't look right**"
        },
        {
          title: 'SSTS No. 4: Use of Estimates',
          type: 'text',
          content: "**When estimates are acceptable:**\n\n• Records destroyed by fire/disaster\n• Exact data not available\n• Estimates don't imply greater accuracy\n\n**Requirements:**\n• Estimate must be reasonable\n• Disclose if required by law\n• Don't use if prohibited by tax law"
        },
        {
          title: 'SSTS No. 6: Knowledge of Error',
          type: 'text',
          content: "**When CPA discovers error:**\n\n**Must:**\n• Promptly inform client of error\n• Advise client of potential consequences\n• Recommend corrective action\n\n**Cannot:**\n• Disclose error to IRS without client consent\n• Continue to represent if client refuses to correct material error"
        },
        {
          title: '⚠️ Exam Trap: Client Confidentiality',
          type: 'warning',
          content: "**CPA discovers prior year error:**\n\n**CANNOT inform IRS directly!**\n\n**Must:**\n1. Tell client about error\n2. Recommend filing amended return\n3. Consider withdrawal if client refuses\n\n**Client decides whether to correct—not the CPA**\n\n(Unless subpoenaed or other legal exception)"
        },
        {
          title: 'SSTS No. 7: Form and Content of Advice',
          type: 'text',
          content: "**Tax advice should:**\n\n• Reflect professional judgment\n• Consider all relevant facts\n• Comply with applicable standards\n• Be documented appropriately\n\n**Written advice for significant matters preferred**\n\n**Must advise client of relevant tax return disclosure requirements**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SSTS are AICPA ethical standards for CPAs in tax",
            "Tax positions need realistic possibility of success",
            "Can rely on client info unless appears incorrect",
            "Estimates OK when reasonable and disclosed",
            "Must inform client of discovered errors",
            "Cannot disclose errors to IRS without consent",
            "May need to withdraw if client won't correct material errors"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-I-003',
    section: 'REG',
    courseId: 'cpa',
    title: "Tax Preparer Penalties",
    description: "Learn the penalties that apply to tax return preparers",
    order: 3,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Ethics", "Penalties"],
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Tax preparers face significant penalties for improper conduct! Understanding these penalties—including the dollar amounts and standards—is essential for REG. The exam loves testing the difference between negligence and willful violations!"
        },
        {
          title: 'Who is a Tax Return Preparer?',
          type: 'text',
          content: "**Tax return preparer =** Person who prepares for compensation any return or claim for refund\n\n**Includes:**\n• Signing preparers (primary responsibility)\n• Non-signing preparers (provide substantial portion)\n\n**Excludes:**\n• Furnishing typing/clerical services\n• Preparing return for no compensation\n• Preparing return for employer (as employee)"
        },
        {
          title: 'Section 6694 Penalties',
          type: 'table',
          headers: ['Violation', 'Standard', 'Penalty'],
          rows: [
            ['Unreasonable Position (6694(a))', 'Position lacks substantial authority', 'Greater of $1,000 OR 50% of fee'],
            ['Willful/Reckless (6694(b))', 'Willful or reckless disregard', 'Greater of $5,000 OR 75% of fee']
          ]
        },
        {
          title: '🧠 Memory Aid: Preparer Penalties',
          type: 'callout',
          content: "**\"1-5 Rule\"** for Section 6694:\n\n**$1,000** = Unreasonable (negligent)\n**$5,000** = Willful (intentional)\n\n**OR percentage of fees:**\n• 50% for unreasonable\n• 75% for willful\n\n**Willful = 5x the penalty!**"
        },
        {
          title: 'Reasonable Cause Defense',
          type: 'text',
          content: "**6694(a) penalty can be avoided if:**\n\n• Reasonable cause for position\n• Preparer acted in good faith\n\n**Factors considered:**\n• Reliance on information provided\n• Nature of error\n• Whether position was disclosed\n• Preparer's normal office practices"
        },
        {
          title: 'Position Standards',
          type: 'text',
          content: "**Undisclosed positions require:**\n• Substantial authority (more than 33%)\n\n**Disclosed positions require:**\n• Reasonable basis (approximately 20%+)\n\n**Tax shelter positions require:**\n• More likely than not (>50%)\n• Reasonable belief position would be sustained"
        },
        {
          title: 'Other Preparer Penalties',
          type: 'table',
          headers: ['Section', 'Violation', 'Penalty'],
          rows: [
            ['6695(a)', 'Failure to furnish copy to taxpayer', '$50 per return (max $27,000)'],
            ['6695(b)', 'Failure to sign return', '$50 per return (max $27,000)'],
            ['6695(c)', 'Failure to furnish identifying number', '$50 per return (max $27,000)'],
            ['6695(e)', 'Failure to retain copy/list', '$50 per return (max $27,000)'],
            ['6695(f)', 'Negotiating refund check', '$560 per check'],
            ['6695(g)', 'Failure to exercise due diligence (EIC/CTC)', '$560 per failure']
          ]
        },
        {
          title: '⚠️ Exam Trap: Due Diligence for Credits',
          type: 'warning',
          content: "**Special due diligence required for:**\n\n• Earned Income Credit (EIC)\n• Child Tax Credit\n• American Opportunity Credit\n• Head of Household status\n\n**Must complete Form 8867 (due diligence checklist)**\n\n**Penalty: $560 PER FAILURE**\n\n**Return claiming all four = potential $2,240 penalty!**"
        },
        {
          title: 'Section 6701: Aiding & Abetting',
          type: 'text',
          content: "**Penalty for helping others understate tax:**\n\n• **$1,000** per individual return\n• **$10,000** per corporate return\n\n**Applies when:**\n• Aids in preparing false document\n• Knows document would be used for tax purposes\n• Knows document would result in understatement"
        },
        {
          title: 'Injunctions Against Preparers',
          type: 'text',
          content: "**IRS can seek court injunction to:**\n\n• Prohibit preparer from continuing conduct\n• Bar preparer from tax preparation business\n• Require compliance with Circular 230\n\n**For repeated violations or egregious conduct**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "6694(a): $1,000 or 50% of fee for unreasonable positions",
            "6694(b): $5,000 or 75% of fee for willful/reckless conduct",
            "Due diligence required for EIC, CTC, AOTC, HOH ($560 penalty)",
            "Cannot negotiate client refund checks ($560 penalty)",
            "$50 penalty for various administrative failures",
            "Aiding understatement: $1,000 (individual) or $10,000 (corporate)",
            "Disclosure and reasonable basis can reduce position penalty risk"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-I-004',
    section: 'REG',
    courseId: 'cpa',
    title: "Filing Requirements & Deadlines",
    description: "Master individual and business tax filing deadlines",
    order: 4,
    duration: 40,
    difficulty: 'beginner',
    topics: ["Procedures", "Filing"],
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Missing a tax deadline can be costly! Knowing when different returns are due—and how extensions work—is fundamental knowledge for any tax professional. These dates are definitely tested on REG!"
        },
        {
          title: 'Individual Returns (Form 1040)',
          type: 'text',
          content: "**Original due date:** April 15\n\n**Automatic extension:** 6 months to October 15\n• File Form 4868\n• Extension is to FILE, not to PAY\n• Must estimate and pay tax due by April 15\n\n**If date falls on weekend/holiday:** Next business day"
        },
        {
          title: 'Business Entity Due Dates',
          type: 'table',
          headers: ['Entity', 'Form', 'Due Date', 'Extension'],
          rows: [
            ['C Corporation', '1120', '4/15 (calendar year)', '6 months'],
            ['S Corporation', '1120-S', '3/15 (calendar year)', '6 months'],
            ['Partnership', '1065', '3/15 (calendar year)', '6 months'],
            ['Trust/Estate', '1041', '4/15 (calendar year)', '5.5 months'],
            ['Exempt Org', '990', '5/15 (calendar year)', '6 months']
          ]
        },
        {
          title: '🧠 Memory Aid: Due Dates',
          type: 'callout',
          content: "**\"Partnerships and S Corps are EARLY\"**\n\n**March 15:** Pass-through entities (S Corps, Partnerships)\n**April 15:** Individuals, C Corps, Trusts\n**May 15:** Exempt organizations\n\n**Why early for pass-throughs?** So K-1s can be sent to owners for their April 15 returns!"
        },
        {
          title: 'Fiscal Year Filers',
          type: 'text',
          content: "**For fiscal year entities:**\n\nDue date = 15th day of 3rd or 4th month after year-end\n\n**Example:** June 30 fiscal year-end\n• C Corp due: October 15 (4th month)\n• S Corp due: September 15 (3rd month)\n• Partnership due: September 15 (3rd month)"
        },
        {
          title: 'Who Must File?',
          type: 'text',
          content: "**Individuals must file if gross income exceeds:**\n\n**2025 thresholds (approximate):**\n• Single, under 65: $14,600\n• Single, 65+: $16,550\n• MFJ, both under 65: $29,200\n• Head of Household: $21,900\n\n**Must also file if:**\n• Self-employment income ≥ $400\n• Special taxes owed (AMT, household employee)\n• Received advance premium tax credits"
        },
        {
          title: 'Extension Rules',
          type: 'text',
          content: "**Extension facts:**\n\n• Automatic if properly filed by due date\n• Must estimate tax liability\n• Interest runs from original due date\n• Failure-to-pay penalty still applies (reduced rate)\n• Extension does NOT extend time to pay!\n\n**Penalty relief:** First-time penalty abatement available"
        },
        {
          title: '⚠️ Exam Trap: Extension Doesn\'t Extend Payment',
          type: 'warning',
          content: "**Filing extension ≠ Payment extension!**\n\n**With extension:**\n• Interest accrues from April 15\n• Failure-to-pay penalty applies (0.5%/month)\n• BUT failure-to-file penalty avoided\n\n**Failure-to-file (5%/month) > Failure-to-pay (0.5%/month)**\n\n**If you can't pay, STILL FILE on time!**"
        },
        {
          title: 'Estimated Tax Payments',
          type: 'text',
          content: "**Quarterly due dates:**\n• Q1: April 15\n• Q2: June 15\n• Q3: September 15\n• Q4: January 15 (following year)\n\n**Required if:**\n• Expected tax liability ≥ $1,000\n• Withholding/credits won't cover obligation"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Individuals/C Corps: April 15 (6-month extension)",
            "S Corps/Partnerships: March 15 (6-month extension)",
            "Extensions extend filing, NOT payment deadline",
            "Interest runs from original due date regardless",
            "Filing thresholds vary by filing status and age",
            "Self-employment income ≥ $400 requires filing",
            "Estimated payments due quarterly (4/15, 6/15, 9/15, 1/15)"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-I-005',
    section: 'REG',
    courseId: 'cpa',
    title: "Statute of Limitations: Assessment & Collection",
    description: "Understand time limits for IRS assessment and collection actions",
    order: 5,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Procedures", "Statute of Limitations"],
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The statute of limitations protects taxpayers from perpetual IRS scrutiny—but there are critical exceptions! Knowing when the IRS can still assess tax or collect is essential. The exam frequently tests the 3-year vs 6-year vs unlimited rules!"
        },
        {
          title: 'General Assessment Period',
          type: 'text',
          content: "**Standard rule: 3 years**\n\n• IRS has 3 years from later of:\n  - Due date of return (with extensions), or\n  - Date return was actually filed\n\n• After 3 years, IRS cannot assess additional tax\n\n**Return filed early?** Clock starts on due date, not filing date"
        },
        {
          title: 'Extended Assessment Periods',
          type: 'table',
          headers: ['Situation', 'Assessment Period'],
          rows: [
            ['Normal return', '3 years'],
            ['25%+ gross income omission', '6 years'],
            ['Fraud or willful evasion', 'Unlimited'],
            ['No return filed', 'Unlimited'],
            ['False or fraudulent return', 'Unlimited']
          ]
        },
        {
          title: '🧠 Memory Aid: Assessment SOL',
          type: 'callout',
          content: "**\"3-6-∞\"** Rule:\n\n**3** years = Normal returns\n**6** years = >25% gross income omitted\n**∞** (Unlimited) = Fraud or no return\n\n**\"If you cheat or don't file, they can come after you FOREVER!\"**"
        },
        {
          title: '25% Gross Income Omission',
          type: 'text',
          content: "**6-year rule applies when:**\n\n• Taxpayer omits >25% of gross income\n• Gross income = total receipts before deductions\n\n**Example:**\n• Reported gross income: $80,000\n• Actual gross income: $120,000\n• Omission: $40,000 (50% of reported)\n• 6-year rule applies\n\n**Note:** Adequate disclosure can prevent 6-year rule"
        },
        {
          title: 'Collection Statute',
          type: 'text',
          content: "**Collection period: 10 years**\n\n• IRS has 10 years from assessment date to collect\n• Period can be extended by:\n  - Bankruptcy filing\n  - Installment agreement request\n  - Collection due process hearing\n  - Offer in compromise\n\n**Assessment ≠ Collection**\n• Assessment = Determining you owe\n• Collection = Actually getting the money"
        },
        {
          title: 'Suspensions and Extensions',
          type: 'text',
          content: "**SOL can be suspended during:**\n\n• IRS audit when 90-day letter issued\n• Bankruptcy proceedings\n• Taxpayer outside US for 6+ months\n• Third-party summons enforcement\n• Installment agreement request\n\n**Consent:** Taxpayer can agree to extend assessment period (Form 872)"
        },
        {
          title: '⚠️ Exam Trap: When Does Clock Start?',
          type: 'warning',
          content: "**Clock starts on LATER of:**\n\n• Due date (including extensions), OR\n• Actual filing date\n\n**Example:**\n• Return due April 15, 2024\n• Filed March 1, 2024 (early)\n• SOL runs from April 15, 2024\n\n**Example 2:**\n• Return due April 15, 2024\n• Filed August 1, 2024 (late)\n• SOL runs from August 1, 2024"
        },
        {
          title: 'Refund Claims',
          type: 'text',
          content: "**Taxpayer must claim refund within:**\n\n• **3 years from filing date**, OR\n• **2 years from payment date**\n• Whichever is LATER\n\n**Refund limited to:**\n• If 3-year rule: Tax paid in 3 years + extensions\n• If 2-year rule: Tax paid in 2 years\n\n**Miss the deadline = No refund!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Normal assessment period: 3 years from filing",
            "25%+ gross income omission: 6 years",
            "Fraud or no return filed: Unlimited",
            "Collection period: 10 years from assessment",
            "Early-filed returns: Clock starts on due date",
            "Refund claims: 3 years from filing or 2 years from payment",
            "SOL can be suspended or extended by agreement"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-I-006',
    section: 'REG',
    courseId: 'cpa',
    title: "IRS Audit Process & Appeals",
    description: "Navigate the IRS examination and appeals procedures",
    order: 6,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Procedures", "Audit", "Appeals"],
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Understanding the IRS audit process helps you advise clients and navigate disputes! From initial contact through Tax Court, knowing the procedures, deadlines, and taxpayer rights is critical for tax practice and the REG exam!"
        },
        {
          title: 'Types of IRS Examinations',
          type: 'text',
          content: "**Three types:**\n\n**1. Correspondence Audit**\n• Conducted by mail\n• Usually single-issue (W-2 match, etc.)\n• Most common type\n\n**2. Office Audit**\n• At IRS office\n• More complex issues\n\n**3. Field Audit**\n• At taxpayer's location\n• Business/high-income returns\n• Most comprehensive"
        },
        {
          title: 'The Examination Process',
          type: 'text',
          content: "**Steps:**\n\n1. **Selection** - Return flagged (DIF score, info matching)\n2. **Initial Contact** - IRS sends notice requesting documents\n3. **Examination** - Review of records, interviews\n4. **Findings** - Examiner proposes adjustments\n5. **Agreement/Disagreement** - Sign or appeal\n\n**Taxpayer can have representative present (POA)**"
        },
        {
          title: '🧠 Memory Aid: Audit Sequence',
          type: 'callout',
          content: "**\"SERF\"** for audit outcomes:\n\n**S**ign and agree (pay immediately)\n**E**xaminer's findings (receive report)\n**R**equest appeals conference\n**F**ile petition in court (if needed)\n\n**Always try Appeals before Court!**"
        },
        {
          title: 'The 30-Day Letter',
          type: 'text',
          content: "**Preliminary notice of deficiency:**\n\n• Sent when examiner proposes adjustments\n• Includes examination report\n• Taxpayer has 30 days to:\n  - Agree and pay\n  - Request Appeals conference\n  - Do nothing (triggers 90-day letter)\n\n**Not required by law—but standard practice**"
        },
        {
          title: 'The 90-Day Letter (Statutory Notice)',
          type: 'text',
          content: "**Statutory Notice of Deficiency:**\n\n• Official notice of proposed tax due\n• MUST be sent before IRS can assess\n• Taxpayer has 90 days (150 if abroad) to:\n  - File petition in Tax Court, OR\n  - Do nothing (tax becomes assessable)\n\n**This is a \"ticket to Tax Court\"**"
        },
        {
          title: 'IRS Appeals',
          type: 'text',
          content: "**Appeals Conference:**\n\n• Independent review within IRS\n• Settlement authority (hazards of litigation)\n• Can resolve 85%+ of cases\n• No new issues raised\n• Written protest required if >$25,000\n\n**Advantages:**\n• Less formal than court\n• Faster resolution\n• No legal fees"
        },
        {
          title: '⚠️ Exam Trap: Tax Court vs Other Courts',
          type: 'warning',
          content: "**Tax Court:**\n• Don't have to pay first!\n• File within 90 days of notice\n• Tax experts (no jury)\n\n**District Court or Court of Federal Claims:**\n• Must PAY FIRST, then sue for refund\n• Jury trial available (District Court only)\n\n**Want to fight without paying? Tax Court!**"
        },
        {
          title: 'Court Options',
          type: 'table',
          headers: ['Court', 'Pay First?', 'Jury?', 'Expertise'],
          rows: [
            ['US Tax Court', 'No', 'No', 'Tax specialists'],
            ['US District Court', 'Yes', 'Yes', 'General'],
            ['Court of Federal Claims', 'Yes', 'No', 'Various']
          ]
        },
        {
          title: 'Taxpayer Rights',
          type: 'text',
          content: "**Taxpayer Bill of Rights includes:**\n\n• Right to be informed\n• Right to quality service\n• Right to pay no more than correct amount\n• Right to challenge IRS position\n• Right to appeal\n• Right to finality\n• Right to privacy\n• Right to confidentiality\n• Right to representation\n• Right to a fair tax system"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Three audit types: Correspondence, Office, Field",
            "30-day letter = Preliminary (can request Appeals)",
            "90-day letter = Statutory notice (ticket to Tax Court)",
            "Tax Court: No payment required before petition",
            "District Court/Claims Court: Must pay first, then sue for refund",
            "Appeals can settle most cases without litigation",
            "Written protest required for appeals if >$25,000"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-I-007',
    section: 'REG',
    courseId: 'cpa',
    title: "Taxpayer Penalties: Civil & Criminal",
    description: "Understand the penalties taxpayers face for noncompliance",
    order: 7,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Procedures", "Penalties"],
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Taxpayer penalties can be devastating—from modest late-filing fees to criminal prosecution! Understanding the different penalty tiers and when they apply helps you advise clients and avoid problems. This is heavily tested material!"
        },
        {
          title: 'Failure-to-File Penalty',
          type: 'text',
          content: "**Section 6651(a)(1):**\n\n• **5% per month** (or fraction) of tax due\n• Maximum: **25%** of tax due\n• Reduced to 4.5% when failure-to-pay also applies\n• Minimum penalty if >60 days late: Lesser of $485 or 100% of tax\n\n**Reasonable cause defense available**"
        },
        {
          title: 'Failure-to-Pay Penalty',
          type: 'text',
          content: "**Section 6651(a)(2):**\n\n• **0.5% per month** of unpaid tax\n• Maximum: **25%** of unpaid tax\n• Increases to 1% if IRS issues notice of levy\n• Reduced to 0.25% if on installment plan\n\n**Runs from due date until paid**"
        },
        {
          title: '🧠 Memory Aid: File vs Pay Penalties',
          type: 'callout',
          content: "**\"5-point-5 Rule\"**\n\n**Fail to FILE: 5%**/month (max 25%)\n**Fail to PAY: 0.5%**/month (max 25%)\n\n**File penalty is 10x higher!**\n\n**Message:** Even if you can't pay, FILE on time to avoid the bigger penalty!"
        },
        {
          title: 'Accuracy-Related Penalties',
          type: 'table',
          headers: ['Type', 'Penalty', 'Applies When'],
          rows: [
            ['Negligence', '20% of underpayment', 'Failure to make reasonable attempt'],
            ['Substantial Understatement', '20% of underpayment', '>$5,000 or >10% of tax'],
            ['Substantial Valuation Misstatement', '20% of underpayment', 'Value stated ≥150% of correct'],
            ['Gross Valuation Misstatement', '40% of underpayment', 'Value stated ≥200% of correct']
          ]
        },
        {
          title: 'Substantial Understatement',
          type: 'text',
          content: "**Understatement is substantial if:**\n\n**Individuals:**\n• Greater of $5,000 OR 10% of tax shown\n\n**Corporations:**\n• Greater of $10,000 OR 10% of tax (or $10M)\n\n**Reduction:** Understatement reduced by:\n• Positions with substantial authority\n• Adequately disclosed positions with reasonable basis"
        },
        {
          title: 'Fraud Penalty',
          type: 'text',
          content: "**Section 6663 - Civil Fraud:**\n\n• **75% of underpayment** due to fraud\n• IRS must prove fraud by clear and convincing evidence\n• Once fraud shown, ALL underpayment presumed fraudulent\n• Taxpayer must then prove non-fraud portions\n\n**No statute of limitations for fraud!**"
        },
        {
          title: '⚠️ Exam Trap: Penalty Stacking',
          type: 'warning',
          content: "**Penalties that DON'T stack:**\n\n• Fraud (75%) and accuracy-related (20%) are MUTUALLY EXCLUSIVE\n• If fraud applies, accuracy-related does not\n\n**Penalties that DO stack:**\n• Failure-to-file + Failure-to-pay (but combined max is 5%/month)\n• Interest runs on top of all penalties\n\n**Fraud = 75% (not 95% combining them!)**"
        },
        {
          title: 'Criminal Penalties',
          type: 'text',
          content: "**Criminal tax violations:**\n\n• **Tax evasion (§7201):** Up to $100,000 ($500K corp) + 5 years\n• **Willful failure to file (§7203):** Up to $25,000 + 1 year\n• **Filing false return (§7206):** Up to $100,000 + 3 years\n\n**Require WILLFUL intent**—must prove beyond reasonable doubt\n\n**Criminal ≠ Civil—can face both!**"
        },
        {
          title: 'Estimated Tax Penalty',
          type: 'text',
          content: "**Underpayment of estimated tax:**\n\n• Interest-based penalty (not percentage)\n• No penalty if:\n  - Tax due < $1,000\n  - Paid 90% of current year, OR\n  - Paid 100% of prior year (110% if AGI >$150K)\n\n**Safe harbor:** Pay 100%/110% of prior year"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Failure-to-file: 5%/month (max 25%)",
            "Failure-to-pay: 0.5%/month (max 25%)",
            "Accuracy-related: 20% (negligence, substantial understatement)",
            "Fraud: 75% of underpayment (no SOL)",
            "Substantial understatement: >$5,000 or >10% of tax",
            "Fraud and accuracy penalties don't stack",
            "Criminal penalties require willful intent"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-I-008',
    section: 'REG',
    courseId: 'cpa',
    title: "Power of Attorney & Authorizations",
    description: "Learn how representatives are authorized to act before the IRS",
    order: 8,
    duration: 35,
    difficulty: 'intermediate',
    topics: ["Procedures", "Representation"],
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Before you can represent a client before the IRS, proper authorization must be in place! Understanding the different IRS forms and authorization levels is essential for tax practice. The exam tests the differences between POA and other authorizations!"
        },
        {
          title: 'Form 2848: Power of Attorney',
          type: 'text',
          content: "**Power of Attorney and Declaration of Representative:**\n\n• Authorizes representative to act on taxpayer's behalf\n• Can receive confidential information\n• Can sign documents, attend meetings, negotiate\n• Must specify tax matters and years covered\n• Representative must be authorized to practice (CPA, attorney, EA)"
        },
        {
          title: 'POA Authorization Levels',
          type: 'text',
          content: "**Form 2848 authorizes representative to:**\n\n• Receive and inspect confidential tax information\n• Perform acts on taxpayer's behalf\n• Sign consents to extend statute\n• Execute waivers\n• Sign closing agreements (if specifically authorized)\n• Receive refund checks? NO (unless specifically authorized)"
        },
        {
          title: '🧠 Memory Aid: IRS Authorization Forms',
          type: 'callout',
          content: "**\"2-8-86\"** for authorization forms:\n\n**2848** = Power of Attorney (full representation)\n**8821** = Tax Information Authorization (view only)\n**86**21 = Third Party Designee (limited)\n\n**2848 > 8821 > Designee**"
        },
        {
          title: 'Form 8821: Tax Information Authorization',
          type: 'text',
          content: "**Tax Information Authorization:**\n\n• Authorizes disclosure of tax info to designee\n• Does NOT allow representation before IRS\n• Can receive notices and transcripts\n• Cannot sign documents or negotiate\n\n**Use when:** Third party (like mortgage company) needs tax info"
        },
        {
          title: 'Third Party Designee (Checkbox)',
          type: 'text',
          content: "**Checkbox on return:**\n\n• Limited authorization on tax return\n• Allows IRS to discuss return with preparer\n• Only covers that specific return\n• Valid until due date of following year's return\n\n**Simple authorization for return-related questions only**"
        },
        {
          title: 'Comparison of Authorizations',
          type: 'table',
          headers: ['Feature', 'Form 2848', 'Form 8821', 'Designee'],
          rows: [
            ['Receive confidential info', 'Yes', 'Yes', 'Limited'],
            ['Represent before IRS', 'Yes', 'No', 'No'],
            ['Sign documents', 'Yes', 'No', 'No'],
            ['Duration', 'As specified', 'As specified', '~1 year'],
            ['Who can be named', 'Authorized practitioners', 'Anyone', 'Anyone']
          ]
        },
        {
          title: '⚠️ Exam Trap: Who Can Represent',
          type: 'warning',
          content: "**Only authorized practitioners can represent:**\n\n• Attorneys\n• CPAs\n• Enrolled Agents\n\n**Form 8821 can name ANYONE** (bank, family member)\n\n**But Form 2848 must name authorized practitioner!**\n\n**Exception:** Limited practice rights for certain preparers on returns they prepared"
        },
        {
          title: 'Centralized Authorization File (CAF)',
          type: 'text',
          content: "**IRS maintains CAF system:**\n\n• Records all active POAs and authorizations\n• Each representative has CAF number\n• IRS sends copies of notices to authorized representatives\n• Authorizations remain until revoked or superseded\n\n**CAF number is permanent identifier for practitioner**"
        },
        {
          title: 'Revoking Authorization',
          type: 'text',
          content: "**To revoke:**\n\n• Written statement to IRS\n• New POA for same matters supersedes prior\n• Death of taxpayer terminates POA\n• Representative can withdraw\n\n**Multiple representatives:** Can name more than one—each acts independently unless specified"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Form 2848: Full POA for authorized practitioners only",
            "Form 8821: Tax info disclosure (no representation)",
            "Third party designee: Limited, return-specific authorization",
            "Only CPAs, attorneys, EAs can be named on Form 2848",
            "Anyone can be named on Form 8821",
            "POA must specify tax matters and periods covered",
            "CAF system tracks active authorizations"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-001',
    section: 'REG',
    courseId: 'cpa',
    title: "Agency: Formation & Authority",
    description: "Understand how agency relationships are created and the types of authority",
    order: 9,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Business Law", "Agency"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Agency law is foundational to business! Every time someone acts on behalf of another—employees, partners, corporate officers—agency principles apply. Understanding how authority is created and when principals are bound is essential for REG!"
        },
        {
          title: 'What is Agency?',
          type: 'text',
          content: "**Agency = Fiduciary relationship**\n\n• **Principal:** Party authorizing action\n• **Agent:** Party acting on principal's behalf\n• **Third Party:** Outsider dealing with agent\n\n**Key question:** When does the agent's action bind the principal?"
        },
        {
          title: 'Creating Agency Relationships',
          type: 'text',
          content: "**Agency can be created by:**\n\n1. **Express agreement** - Written or oral\n2. **Implied conduct** - Actions showing intent\n3. **Estoppel** - Principal's conduct creates appearance\n4. **Ratification** - Principal adopts unauthorized act\n5. **Operation of law** - Emergency situations\n\n**No consideration required!**"
        },
        {
          title: 'Types of Authority',
          type: 'table',
          headers: ['Type', 'Definition', 'Example'],
          rows: [
            ['Express', 'Explicitly granted by principal', 'Written job description'],
            ['Implied', 'Reasonably necessary to carry out express', 'Secretary ordering office supplies'],
            ['Apparent', 'Third party reasonably believes exists', 'Store clerk appearing to have sales authority'],
            ['Inherent', 'Flows from position/title (agents only)', 'VP of Sales binding company to contracts']
          ]
        },
        {
          title: '🧠 Memory Aid: Types of Authority',
          type: 'callout',
          content: "**\"EAIR\"** the types:\n\n**E**xpress - Principal SAID it\n**A**pparent - Third party BELIEVED it\n**I**mplied - Reasonably NECESSARY\n**R**atification - Principal ADOPTED it after\n\n**\"Did the principal give authority or did it appear they did?\"**"
        },
        {
          title: 'Apparent Authority',
          type: 'text',
          content: "**Created by principal's conduct:**\n\n• Principal must manifest to third party\n• Third party must reasonably rely\n• Agent's own statements NOT enough!\n\n**Example:**\n• Company gives employee business cards with \"Sales Manager\" title\n• Customer reasonably believes manager can negotiate contracts\n• Company bound even if manager exceeded actual authority"
        },
        {
          title: 'Ratification',
          type: 'text',
          content: "**Adopting an unauthorized act:**\n\n**Requirements:**\n• Agent purported to act for principal\n• Principal knew material facts\n• Principal accepted benefits OR affirmed transaction\n• Principal had capacity at time of ratification\n\n**Effect:** Retroactive—as if originally authorized"
        },
        {
          title: '⚠️ Exam Trap: Agent\'s Own Statements',
          type: 'warning',
          content: "**Agent cannot create own apparent authority!**\n\n**Wrong:** Agent tells customer \"I have authority to offer 50% discount\"\n→ This alone doesn't bind principal\n\n**Right:** Principal tells customer \"This agent handles all discounts\"\n→ Creates apparent authority\n\n**Authority must come FROM principal, not agent!**"
        },
        {
          title: 'Termination of Agency',
          type: 'text',
          content: "**By act of parties:**\n• Mutual agreement\n• Revocation by principal\n• Renunciation by agent\n• Accomplishment of purpose\n• Expiration of time\n\n**By operation of law:**\n• Death of principal or agent\n• Incapacity of principal\n• Bankruptcy\n• Illegality of subject matter"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Agency is a fiduciary relationship requiring consent, not consideration",
            "Express authority: Explicitly granted",
            "Implied authority: Reasonably necessary to carry out express",
            "Apparent authority: Created by principal's conduct toward third parties",
            "Agent's own statements don't create apparent authority",
            "Ratification makes unauthorized acts retroactively authorized",
            "Death or incapacity of principal terminates agency"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-002',
    section: 'REG',
    courseId: 'cpa',
    title: "Agency: Duties & Liabilities",
    description: "Learn the duties agents and principals owe each other and to third parties",
    order: 10,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Business Law", "Agency"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Agency creates fiduciary duties—some of the highest obligations in law! When agents breach these duties, or when principals are held liable for agent acts, major consequences follow. Understanding who's liable for what is exam gold!"
        },
        {
          title: 'Agent\'s Duties to Principal',
          type: 'list',
          content: [
            "**Duty of Loyalty** - Act in principal's best interest, no self-dealing",
            "**Duty of Obedience** - Follow reasonable instructions",
            "**Duty of Care** - Exercise reasonable skill and care",
            "**Duty to Account** - Maintain records, turn over money/property",
            "**Duty to Notify** - Inform principal of relevant information",
            "**Duty of Confidentiality** - Protect principal's confidential information"
          ]
        },
        {
          title: '🧠 Memory Aid: Agent Duties',
          type: 'callout',
          content: "**\"LOCA-NC\"** for agent duties:\n\n**L**oyalty\n**O**bedience\n**C**are\n**A**ccount\n**N**otify\n**C**onfidentiality\n\n**Agents must be LOYAL and CAREFUL!**"
        },
        {
          title: 'Principal\'s Duties to Agent',
          type: 'text',
          content: "**Principal must:**\n\n• **Compensate** agent as agreed\n• **Reimburse** authorized expenses\n• **Indemnify** for losses from authorized acts\n• **Cooperate** and not hinder agent's performance\n\n**These duties can be modified by agreement**"
        },
        {
          title: 'Liability for Contracts',
          type: 'table',
          headers: ['Principal Type', 'Agent Liability', 'Principal Liability'],
          rows: [
            ['Disclosed (identity known)', 'Generally not liable', 'Liable if authorized'],
            ['Partially Disclosed (existence known)', 'Liable unless released', 'Liable if authorized'],
            ['Undisclosed (hidden)', 'Personally liable', 'Liable when discovered']
          ]
        },
        {
          title: 'Disclosed vs Undisclosed Principal',
          type: 'text',
          content: "**Disclosed Principal:**\n• Third party knows principal exists AND identity\n• Agent typically not personally liable\n\n**Partially Disclosed:**\n• Third party knows principal exists but NOT identity\n• BOTH agent and principal liable\n\n**Undisclosed:**\n• Third party doesn't know agent acts for principal\n• Agent personally liable; principal liable when revealed"
        },
        {
          title: 'Liability for Torts',
          type: 'text',
          content: "**Respondeat Superior:**\n\n• Principal liable for agent's torts\n• **Only if:** Committed within scope of employment\n• Agent is ALSO personally liable\n\n**Scope of employment factors:**\n• Authorized time and place?\n• Furthering employer's business?\n• Using employer's tools/methods?"
        },
        {
          title: '⚠️ Exam Trap: Independent Contractors',
          type: 'warning',
          content: "**Principal generally NOT liable for IC torts!**\n\n**Why?** Less control over HOW work is done\n\n**Exceptions (principal IS liable):**\n• Inherently dangerous activities\n• Non-delegable duties\n• Principal was negligent in hiring\n• Principal controlled the work\n\n**Employee vs IC = Control over manner of work**"
        },
        {
          title: 'Frolic vs Detour',
          type: 'text',
          content: "**Was agent within scope of employment?**\n\n**Detour:** Minor deviation from duties\n→ Still within scope, principal liable\n\n**Frolic:** Major departure for personal reasons\n→ Outside scope, principal NOT liable\n\n**Example:**\n• Quick stop for coffee = Detour (liable)\n• Driving 50 miles to see friend = Frolic (not liable)"
        },
        {
          title: 'Agent Exceeding Authority',
          type: 'text',
          content: "**If agent exceeds authority:**\n\n• Principal not bound to transaction\n• UNLESS ratified or apparent authority exists\n• Agent may be liable to:\n  - Principal (breach of duty)\n  - Third party (breach of implied warranty of authority)\n\n**Agent impliedly warrants they have authority to act**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Agents owe fiduciary duties: Loyalty, Obedience, Care, Account, Notify",
            "Disclosed principal: Agent generally not liable on contracts",
            "Undisclosed principal: Agent personally liable",
            "Respondeat superior: Principal liable for employee torts in scope",
            "Independent contractor torts: Principal generally NOT liable",
            "Frolic = Outside scope; Detour = Within scope",
            "Agent warrants authority; liable if no authority exists"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-003',
    section: 'REG',
    courseId: 'cpa',
    title: "Contracts: Formation & Enforceability",
    description: "Master the elements required to form a valid, enforceable contract",
    order: 11,
    duration: 60,
    difficulty: 'intermediate',
    topics: ["Business Law", "Contracts"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Contracts are the backbone of business! Understanding when a contract exists and when it's enforceable is fundamental legal knowledge. The REG exam heavily tests offer, acceptance, consideration, and the Statute of Frauds!"
        },
        {
          title: 'Elements of a Valid Contract',
          type: 'text',
          content: "**All required for valid contract:**\n\n1. **Offer** - Promise with definite terms\n2. **Acceptance** - Agreement to offer terms\n3. **Consideration** - Bargained-for exchange\n4. **Capacity** - Legal ability to contract\n5. **Legality** - Lawful purpose\n\n**Missing any = No contract!**"
        },
        {
          title: '🧠 Memory Aid: Contract Elements',
          type: 'callout',
          content: "**\"OACCL\"** (Oak-ul) for elements:\n\n**O**ffer\n**A**cceptance\n**C**onsideration\n**C**apacity\n**L**egality\n\n**\"OAK trees make contracts LEGAL!\"**"
        },
        {
          title: 'The Offer',
          type: 'text',
          content: "**Valid offer requires:**\n\n• **Intent** - Objective manifestation of willingness\n• **Definite terms** - Essential terms must be clear\n• **Communication** - Must reach offeree\n\n**NOT offers:**\n• Advertisements (generally invitations to deal)\n• Preliminary negotiations\n• Statements of opinion\n• Jokes (if reasonable person wouldn't take seriously)"
        },
        {
          title: 'Termination of Offer',
          type: 'list',
          content: [
            "**Revocation** - Offeror withdraws (effective when received)",
            "**Rejection** - Offeree declines (effective when received)",
            "**Counteroffer** - New offer that rejects original",
            "**Lapse of time** - Reasonable time or stated deadline",
            "**Death/incapacity** - Of either party before acceptance",
            "**Destruction** - Of subject matter",
            "**Illegality** - Subject matter becomes illegal"
          ]
        },
        {
          title: 'Acceptance',
          type: 'text',
          content: "**Rules for acceptance:**\n\n• Must be unequivocal (mirror image rule)\n• Must be communicated to offeror\n• Silence generally NOT acceptance\n• Acceptance effective when SENT (mailbox rule)\n• Revocation effective when RECEIVED\n\n**UCC more flexible:** Additional terms may be included (between merchants)"
        },
        {
          title: 'Consideration',
          type: 'text',
          content: "**Bargained-for exchange:**\n\n• Legal detriment OR benefit\n• Must be bargained for\n• Must be legally sufficient\n\n**NOT valid consideration:**\n• Past consideration (already done)\n• Pre-existing duty (already obligated)\n• Illusory promise (no real commitment)\n• Gift promises"
        },
        {
          title: '⚠️ Exam Trap: Pre-existing Duty',
          type: 'warning',
          content: "**Promising to do what you're ALREADY obligated to do = No consideration!**\n\n**Example:**\n• Contractor agreed to build for $100K\n• Contractor demands $20K more mid-project\n• Owner agrees under pressure\n• Modification NOT enforceable (no new consideration)\n\n**Exception:** UCC allows good faith modifications without consideration"
        },
        {
          title: 'Statute of Frauds',
          type: 'text',
          content: "**Must be IN WRITING:**\n\n**\"MY LEGS\"**\n• **M**arriage promises\n• **Y**ear+ contracts (can't perform within 1 year)\n• **L**and/real estate contracts\n• **E**xecutor promises (pay from own funds)\n• **G**oods $500+ (UCC)\n• **S**urety (guarantee another's debt)\n\n**Writing must contain essential terms + signature**"
        },
        {
          title: 'Capacity to Contract',
          type: 'text',
          content: "**Lack of capacity:**\n\n• **Minors** - Voidable by minor\n• **Mental incapacity** - Voidable if other party knew\n• **Intoxication** - Voidable if other party knew\n\n**Voidable = Valid until disaffirmed**\n\n**Minors liable for NECESSITIES (food, shelter, medical)**"
        },
        {
          title: 'Defenses to Enforcement',
          type: 'table',
          headers: ['Defense', 'Effect'],
          rows: [
            ['Void', 'No contract ever existed'],
            ['Voidable', 'Can be disaffirmed by protected party'],
            ['Unenforceable', 'Valid but cannot be enforced'],
            ['Fraud', 'Voidable by innocent party'],
            ['Duress', 'Voidable by coerced party'],
            ['Mistake (mutual)', 'Voidable by either party']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Valid contract requires: Offer, Acceptance, Consideration, Capacity, Legality",
            "Offer terminates on revocation, rejection, counteroffer, or lapse",
            "Acceptance must mirror offer (common law)",
            "Past performance is NOT valid consideration",
            "Statute of Frauds: MY LEGS must be in writing",
            "Minors' contracts are voidable (except necessities)",
            "Void = Never existed; Voidable = Valid until disaffirmed"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-004',
    section: 'REG',
    courseId: 'cpa',
    title: "Contracts: Performance & Remedies",
    description: "Understand contract performance standards and remedies for breach",
    order: 12,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Business Law", "Contracts"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "What happens when contracts aren't fully performed? Understanding performance standards, breach, and available remedies is crucial. The exam tests the difference between complete, substantial, and material breach—and what remedies apply!"
        },
        {
          title: 'Levels of Performance',
          type: 'table',
          headers: ['Level', 'Definition', 'Effect'],
          rows: [
            ['Complete Performance', 'Full performance as promised', 'Discharge of obligation'],
            ['Substantial Performance', 'Performance with minor defects', 'Other party must perform, minus damages'],
            ['Material Breach', 'Major failure to perform', 'Non-breaching party discharged'],
            ['Anticipatory Breach', 'Clear statement of future non-performance', 'Immediate breach, can sue now']
          ]
        },
        {
          title: 'Substantial Performance',
          type: 'text',
          content: "**When performance is substantial:**\n\n• Performing party acted in good faith\n• Defects are minor and not willful\n• Essential purpose of contract achieved\n\n**Effect:**\n• Other party must pay contract price MINUS cost to remedy defects\n\n**Does NOT apply to sale of goods (UCC requires perfect tender)**"
        },
        {
          title: '🧠 Memory Aid: Performance Levels',
          type: 'callout',
          content: "**\"CSM\"** - Complete, Substantial, Material:\n\n**C**omplete = You're done, get paid in full\n**S**ubstantial = Minor issues, get paid minus fixes\n**M**aterial = Major breach, other party walks away\n\n**The more complete, the more you get!**"
        },
        {
          title: 'Anticipatory Breach',
          type: 'text',
          content: "**Before performance is due:**\n\n• Party clearly indicates won't perform\n• Must be unequivocal repudiation\n• Non-breaching party can:\n  - Sue immediately for breach\n  - Wait for actual breach\n  - Treat as material breach\n\n**Can be retracted before other party relies on it**"
        },
        {
          title: 'Damages: Compensatory',
          type: 'text',
          content: "**Goal: Put non-breaching party in position if contract performed**\n\n**Types:**\n• **Expectation damages** - Benefit of the bargain\n• **Direct damages** - Naturally flow from breach\n• **Incidental damages** - Costs to find substitute\n• **Consequential damages** - Special damages if foreseeable\n\n**Must mitigate damages!**"
        },
        {
          title: 'Other Damage Types',
          type: 'text',
          content: "**Liquidated Damages:**\n• Pre-agreed amount in contract\n• Valid if: (1) Actual damages hard to estimate, (2) Amount reasonable\n• If excessive = Unenforceable penalty\n\n**Nominal Damages:**\n• Small amount when breach proven but no actual loss\n• Usually $1\n\n**Punitive Damages:**\n• Generally NOT available in contract (only tort)"
        },
        {
          title: 'Equitable Remedies',
          type: 'table',
          headers: ['Remedy', 'When Available'],
          rows: [
            ['Specific Performance', 'Unique goods/real estate; money damages inadequate'],
            ['Injunction', 'To prevent harmful action'],
            ['Rescission', 'Cancel contract, restore parties'],
            ['Reformation', 'Correct written contract to match intent']
          ]
        },
        {
          title: '⚠️ Exam Trap: Specific Performance',
          type: 'warning',
          content: "**Specific performance (forcing performance) available when:**\n\n✓ **Real estate** - Each parcel is unique\n✓ **Unique goods** - Rare art, antiques\n✗ **Personal services** - NEVER (13th Amendment)\n✗ **Ordinary goods** - Money damages adequate\n\n**Court won't force someone to work for you!**"
        },
        {
          title: 'Duty to Mitigate',
          type: 'text',
          content: "**Non-breaching party must minimize damages:**\n\n• Take reasonable steps to reduce loss\n• Cannot recover damages that could have been avoided\n• Must not \"pile up\" damages by inaction\n\n**Example:**\n• Employee wrongfully fired\n• Must seek comparable employment\n• Damages reduced by what could have been earned"
        },
        {
          title: 'Excuses for Nonperformance',
          type: 'list',
          content: [
            "**Impossibility** - Performance literally impossible (death, destruction)",
            "**Impracticability** - Extreme difficulty beyond contemplation",
            "**Frustration of Purpose** - Purpose destroyed by unforeseen event",
            "**Mutual Rescission** - Both parties agree to cancel",
            "**Accord and Satisfaction** - New agreement to settle existing dispute"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Substantial performance: Minor defects don't excuse payment",
            "Material breach: Major failure discharges other party",
            "Anticipatory breach: Can sue before performance due",
            "Compensatory damages: Put in position as if performed",
            "Specific performance: Only for unique goods/real estate",
            "No specific performance for personal services",
            "Non-breaching party must mitigate damages"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-005',
    section: 'REG',
    courseId: 'cpa',
    title: "Contracts: Third-Party Rights",
    description: "Learn how contract rights can be transferred to third parties",
    order: 13,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Business Law", "Contracts"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Contracts don't just affect the original parties! Assignment, delegation, and third-party beneficiaries extend contract rights and obligations to others. Understanding these concepts is essential for REG!"
        },
        {
          title: 'Assignment of Rights',
          type: 'text',
          content: "**Transfer of contract rights to third party:**\n\n• **Assignor:** Original party transferring rights\n• **Assignee:** Third party receiving rights\n• **Obligor:** Party who must now perform to assignee\n\n**No consideration required!**\n\n**Generally assignable** unless contract prohibits or would materially change obligor's duty"
        },
        {
          title: 'Rights that Cannot Be Assigned',
          type: 'list',
          content: [
            "Personal service contracts (unique skills)",
            "Rights that would materially increase obligor's risk",
            "Contracts expressly prohibiting assignment",
            "Some wage assignments (limited by law)",
            "Future rights not yet earned",
            "Rights coupled with personal trust (attorney-client)"
          ]
        },
        {
          title: '🧠 Memory Aid: Assignment vs Delegation',
          type: 'callout',
          content: "**\"Rights are ASSIGNED, Duties are DELEGATED\"**\n\n**Assignment:** \"You get my right to receive $\"\n**Delegation:** \"You do my job for me\"\n\n**Key difference:**\n• Assignment transfers BENEFITS\n• Delegation transfers BURDENS"
        },
        {
          title: 'Delegation of Duties',
          type: 'text',
          content: "**Transfer of contract duties to third party:**\n\n• **Delegator:** Original party delegating duty\n• **Delegatee:** Third party performing\n\n**Generally delegable** unless:\n• Personal skill/judgment required\n• Contract prohibits delegation\n• Would materially change performance\n\n**Delegator remains liable unless novation!**"
        },
        {
          title: 'Novation',
          type: 'text',
          content: "**Substitution of parties:**\n\n• New party completely replaces original party\n• Original party released from liability\n• Requires consent of ALL parties\n\n**Novation ≠ Assignment**\n• Assignment: Assignor still secondarily liable\n• Novation: Original party completely released"
        },
        {
          title: 'Third-Party Beneficiaries',
          type: 'table',
          headers: ['Type', 'Definition', 'Can Sue?'],
          rows: [
            ['Intended - Creditor', 'Promisee owes beneficiary debt', 'Yes'],
            ['Intended - Donee', 'Promisee intends gift to beneficiary', 'Yes'],
            ['Incidental', 'Benefits accidentally, not intended', 'No']
          ]
        },
        {
          title: 'Intended vs Incidental Beneficiary',
          type: 'text',
          content: "**Intended beneficiary:**\n• Parties INTENDED to benefit this person\n• Named or identifiable in contract\n• Has ENFORCEABLE rights\n\n**Incidental beneficiary:**\n• Benefits by chance from contract\n• NOT intended by parties\n• NO enforceable rights\n\n**Example:** City contracts for road repair → Businesses benefit = Incidental only"
        },
        {
          title: '⚠️ Exam Trap: When Rights Vest',
          type: 'warning',
          content: "**Third-party beneficiary rights VEST when:**\n\n• Beneficiary learns of contract and assents\n• Beneficiary materially changes position\n• Beneficiary sues to enforce\n\n**Before vesting:** Original parties can modify/cancel\n**After vesting:** Cannot modify without beneficiary's consent\n\n**Timing matters!**"
        },
        {
          title: 'Assignment Notice',
          type: 'text',
          content: "**Notice to obligor:**\n\n• Not required for valid assignment\n• BUT strongly recommended!\n\n**Without notice:**\n• Obligor who pays assignor is discharged\n• Assignee must sue assignor\n\n**With notice:**\n• Obligor must pay assignee\n• Payment to assignor doesn't discharge"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Assignment transfers rights; Delegation transfers duties",
            "Most rights assignable unless personal or prohibited",
            "Delegator remains liable unless novation occurs",
            "Novation requires ALL parties' consent",
            "Intended beneficiaries can sue; Incidental cannot",
            "Beneficiary rights vest once they rely or assent",
            "Notice to obligor is important but not required for validity"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-006',
    section: 'REG',
    courseId: 'cpa',
    title: "Business Structures: Overview",
    description: "Compare the legal characteristics of different business entities",
    order: 14,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Business Law", "Entity Selection"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Choosing the right business structure impacts liability, management, taxation, and more! Understanding the legal characteristics of each entity type helps CPAs advise clients and is essential for REG!"
        },
        {
          title: 'Entity Comparison',
          type: 'table',
          headers: ['Entity', 'Liability', 'Management', 'Taxation'],
          rows: [
            ['Sole Proprietorship', 'Unlimited', 'Owner', 'Schedule C'],
            ['General Partnership', 'Unlimited (joint/several)', 'Partners', 'Form 1065/K-1'],
            ['Limited Partnership', 'GP unlimited; LP limited', 'General partners', 'Form 1065/K-1'],
            ['LLC', 'Limited', 'Members/managers', 'Flexible'],
            ['C Corporation', 'Limited', 'Directors/officers', 'Double tax'],
            ['S Corporation', 'Limited', 'Directors/officers', 'Pass-through']
          ]
        },
        {
          title: 'Sole Proprietorship',
          type: 'text',
          content: "**Simplest structure:**\n\n• No formal creation required\n• Owner has unlimited personal liability\n• All income/losses on Schedule C\n• No separate legal existence\n• Terminates on owner's death\n\n**Pros:** Simple, low cost, full control\n**Cons:** Unlimited liability, limited capital raising"
        },
        {
          title: '🧠 Memory Aid: Entity Characteristics',
          type: 'callout',
          content: "**\"CALM\"** for limited liability entities:\n\n**C**orporation\n**A**s an LLC\n**L**imited Partnership (LPs only)\n**M**embers/shareholders protected\n\n**General Partners and Sole Proprietors = UNLIMITED liability**"
        },
        {
          title: 'General Partnership',
          type: 'text',
          content: "**Two or more persons carrying on business for profit:**\n\n• Created by agreement (can be oral)\n• Partners share profits/losses\n• ALL partners have unlimited liability\n• Joint and several liability for partnership debts\n• Pass-through taxation\n\n**Advantage:** Easy formation, flexibility\n**Disadvantage:** Liability exposure"
        },
        {
          title: 'Limited Partnership (LP)',
          type: 'text',
          content: "**Has two classes of partners:**\n\n**General Partners:**\n• Manage business\n• Unlimited liability\n\n**Limited Partners:**\n• Passive investors\n• Limited liability (to investment)\n• Cannot manage (or lose protection)\n\n**Requires formal filing with state**"
        },
        {
          title: 'Limited Liability Company (LLC)',
          type: 'text',
          content: "**Best of both worlds:**\n\n• Limited liability for ALL members\n• Flexible management (member or manager-managed)\n• Pass-through taxation (default)\n• Can elect corporate taxation\n• Operating agreement governs\n\n**Most popular new business entity!**\n\n**Requires state filing (Articles of Organization)**"
        },
        {
          title: '⚠️ Exam Trap: LP Participation',
          type: 'warning',
          content: "**Limited partner participating in management:**\n\n**Old rule:** Lose limited liability protection\n**Modern rule (RULPA):** More protected, but some risk remains\n\n**Safe activities for LPs:**\n• Voting on major matters\n• Being employee/contractor\n• Consulting on business\n\n**Danger:** Acting as if you're a general partner"
        },
        {
          title: 'Corporation Basics',
          type: 'text',
          content: "**Separate legal entity:**\n\n• Shareholders own; Directors manage\n• Limited liability for shareholders\n• Perpetual existence\n• Formal requirements (minutes, meetings)\n\n**C Corp:** Double taxation (corporate + dividend)\n**S Corp:** Pass-through (but restrictions apply)\n\n**Requires state filing (Articles of Incorporation)**"
        },
        {
          title: 'Choosing an Entity',
          type: 'text',
          content: "**Consider:**\n\n• **Liability protection needed?** → LLC, Corp\n• **Number of owners?** → S Corp limited to 100 shareholders\n• **Tax treatment preference?** → Pass-through vs C Corp\n• **Raising capital?** → Corp preferred by investors\n• **Simplicity?** → Sole prop, Partnership\n• **Formalities tolerable?** → Corp has most"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sole proprietorship: Simple but unlimited liability",
            "General partnership: All partners have unlimited liability",
            "Limited partnership: GPs unlimited, LPs limited (if passive)",
            "LLC: Limited liability + tax flexibility",
            "Corporation: Limited liability + formal requirements",
            "S Corps and LLCs offer pass-through taxation",
            "C Corps face double taxation"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-007',
    section: 'REG',
    courseId: 'cpa',
    title: "Partnerships & LLCs: Legal Aspects",
    description: "Understand partnership and LLC formation, operation, and dissolution",
    order: 15,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Business Law", "Partnerships", "LLCs"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnerships and LLCs are incredibly common business structures! Understanding the legal rules—especially partner rights, fiduciary duties, and dissolution—is critical for REG. Don't confuse legal rules (this lesson) with tax rules (covered later)!"
        },
        {
          title: 'Partnership Formation',
          type: 'text',
          content: "**Association of two or more persons:**\n\n• Carrying on a business\n• As co-owners\n• For profit\n\n**No formal agreement required!**\n\n**Factors suggesting partnership:**\n• Sharing profits (strongest factor)\n• Sharing losses\n• Sharing management\n• Joint ownership of property"
        },
        {
          title: 'Partner Rights',
          type: 'list',
          content: [
            "**Management** - Equal vote regardless of capital contribution",
            "**Profits/Losses** - Share equally (unless agreed otherwise)",
            "**Inspect books** - Full access to partnership records",
            "**Accounting** - Right to formal accounting",
            "**Partnership property** - Use for partnership purposes",
            "**Indemnification** - Reimbursement for proper expenses"
          ]
        },
        {
          title: '🧠 Memory Aid: Partner Duties',
          type: 'callout',
          content: "**Partners owe \"LOC\"** fiduciary duties:\n\n**L**oyalty - Put partnership first\n**O**bedience - Follow partnership agreement\n**C**are - Act as prudent person\n\n**Same as agent duties!** Partners are mutual agents."
        },
        {
          title: 'Partnership Liability',
          type: 'text',
          content: "**Joint and several liability:**\n\n• Each partner liable for ALL partnership debts\n• Creditor can sue any partner for full amount\n• Partner who pays can seek contribution from others\n\n**Incoming partner:** Not liable for pre-existing debts (unless agreed)\n\n**Outgoing partner:** Remains liable for debts incurred while partner (until creditor releases)"
        },
        {
          title: 'Partnership Property vs Partner Property',
          type: 'text',
          content: "**Partnership property:**\n• Owned by partnership entity\n• Used for partnership business\n• Cannot be attached by personal creditors\n\n**Partner's interest:**\n• Right to share of profits/surplus\n• Can be attached by personal creditors (charging order)\n• Cannot force liquidation (generally)"
        },
        {
          title: 'Dissolution vs Winding Up',
          type: 'text',
          content: "**Dissolution = Change in partner relationship**\n**Winding up = Process of terminating business**\n\n**Causes of dissolution:**\n• Express will of partner to withdraw\n• Expulsion per agreement\n• Bankruptcy of partner\n• Death of partner (unless agreed otherwise)\n• Court decree\n\n**After dissolution:** Wind up or continue with buyout"
        },
        {
          title: '⚠️ Exam Trap: Partnership vs Partner Property',
          type: 'warning',
          content: "**Personal creditor of partner:**\n• Can get \"charging order\" against partner's interest\n• CANNOT seize partnership property\n• CANNOT force dissolution (usually)\n\n**Partnership creditor:**\n• Can seize partnership property\n• Partners personally liable if partnership assets insufficient\n\n**Keep these creditor types straight!**"
        },
        {
          title: 'LLC Formation',
          type: 'text',
          content: "**Requires state filing:**\n\n• **Articles of Organization** - Filed with state\n• **Operating Agreement** - Governs internal affairs\n\n**Members have:**\n• Limited liability (like shareholders)\n• Flexible management options\n• Pass-through taxation (default)\n\n**Operating agreement is key document!**"
        },
        {
          title: 'LLC Management',
          type: 'text',
          content: "**Two options:**\n\n**Member-Managed:**\n• All members participate in management\n• Each member has authority to bind LLC\n• Default rule\n\n**Manager-Managed:**\n• Designated managers run business\n• Non-manager members are passive\n• Members can hire outside managers"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Partnership can be oral; sharing profits is key factor",
            "Partners share equally in profits/losses unless agreed",
            "Joint and several liability for partnership debts",
            "Partner's personal creditors: Charging order only",
            "Dissolution = Change in relationship; Winding up = Termination",
            "LLC requires Articles of Organization filed with state",
            "LLCs can be member-managed or manager-managed"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-008',
    section: 'REG',
    courseId: 'cpa',
    title: "Corporations: Formation & Governance",
    description: "Learn the legal requirements for forming and operating corporations",
    order: 16,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Business Law", "Corporations"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Corporations are the dominant form of large business organization! Understanding incorporation, the roles of shareholders/directors/officers, and corporate formalities is essential for REG and for advising business clients!"
        },
        {
          title: 'Corporation Formation',
          type: 'text',
          content: "**Steps to incorporate:**\n\n1. **Choose state** - Delaware popular for flexibility\n2. **File Articles of Incorporation** - With state\n3. **Pay filing fees** - State fees vary\n4. **Adopt Bylaws** - Internal operating rules\n5. **Hold organizational meeting** - Elect directors, issue stock\n\n**Corporation exists when articles filed (or effective date)**"
        },
        {
          title: 'Articles of Incorporation',
          type: 'text',
          content: "**Required contents (vary by state):**\n\n• Corporate name (must include Corp., Inc., etc.)\n• Registered agent and address\n• Number of authorized shares\n• Name(s) of incorporator(s)\n• Corporate purpose (can be \"any lawful purpose\")\n\n**Cannot be changed without shareholder approval**"
        },
        {
          title: '🧠 Memory Aid: Corporate Structure',
          type: 'callout',
          content: "**\"SOD\"** the hierarchy:\n\n**S**hareholders - ELECT directors, approve major changes\n**O**fficers - RUN daily operations\n**D**irectors - SET policy, HIRE officers\n\n**Shareholders own it → Directors govern it → Officers run it**"
        },
        {
          title: 'Role of Shareholders',
          type: 'text',
          content: "**Shareholders:**\n\n• OWN the corporation (residual claim)\n• ELECT directors (fundamental right)\n• Vote on fundamental changes:\n  - Mergers and acquisitions\n  - Amendments to articles\n  - Sale of substantially all assets\n  - Dissolution\n\n**Do NOT manage day-to-day operations!**"
        },
        {
          title: 'Role of Directors',
          type: 'text',
          content: "**Board of Directors:**\n\n• Set policy and major decisions\n• Hire and fire officers\n• Declare dividends\n• Approve major contracts\n• Act through board meetings\n\n**Owe fiduciary duties:** Duty of Care, Duty of Loyalty\n\n**Business Judgment Rule:** Protects good-faith decisions"
        },
        {
          title: 'Role of Officers',
          type: 'table',
          headers: ['Officer', 'Typical Duties'],
          rows: [
            ['CEO/President', 'General management, represent corporation'],
            ['CFO/Treasurer', 'Financial matters, custody of funds'],
            ['Secretary', 'Corporate records, meeting minutes'],
            ['COO', 'Day-to-day operations']
          ]
        },
        {
          title: '⚠️ Exam Trap: Piercing the Corporate Veil',
          type: 'warning',
          content: "**Courts can hold shareholders personally liable if:**\n\n• Corporation is \"alter ego\" of shareholder\n• Commingling personal and corporate funds\n• Inadequate capitalization\n• Failure to observe corporate formalities\n• Fraud or injustice\n\n**Maintain separation!** Separate accounts, proper records, adequate capital"
        },
        {
          title: 'Shareholder Meetings',
          type: 'text',
          content: "**Annual meeting required:**\n• Elect directors\n• Other business as needed\n\n**Special meetings:**\n• Called by board or specified shareholders\n• Only matters in notice can be addressed\n\n**Quorum:** Majority of shares entitled to vote (usually)\n\n**Proxy voting:** Shareholders can authorize others to vote"
        },
        {
          title: 'Director Meetings',
          type: 'text',
          content: "**Regular meetings:**\n• No notice required if time set\n\n**Special meetings:**\n• Reasonable notice required\n\n**Quorum:** Majority of directors\n\n**Voting:** Majority of quorum approves\n\n**Written consent:** Can act without meeting if unanimous written consent"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Corporation formed by filing Articles of Incorporation",
            "Shareholders elect directors and approve major changes",
            "Directors set policy and hire officers",
            "Officers run daily operations",
            "Directors owe fiduciary duties (Care, Loyalty)",
            "Business judgment rule protects good-faith decisions",
            "Piercing the veil if formalities not followed"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-009',
    section: 'REG',
    courseId: 'cpa',
    title: "Secured Transactions: UCC Article 9",
    description: "Master the rules for security interests in personal property",
    order: 17,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Business Law", "Secured Transactions"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Lenders want assurance they'll be repaid! Secured transactions under UCC Article 9 allow creditors to take a security interest in property. Understanding attachment, perfection, and priority is critical for REG!"
        },
        {
          title: 'What is a Secured Transaction?',
          type: 'text',
          content: "**Creditor takes interest in debtor's property:**\n\n• **Secured party:** Creditor with security interest\n• **Debtor:** Person who owes obligation\n• **Collateral:** Property subject to security interest\n\n**If debtor defaults:** Secured party can repossess collateral\n\n**UCC Article 9** governs secured transactions in personal property"
        },
        {
          title: 'Two-Step Process',
          type: 'text',
          content: "**Step 1: ATTACHMENT** (creates security interest)\n• Rights against debtor\n\n**Step 2: PERFECTION** (gives priority)\n• Rights against third parties\n\n**Without attachment:** No security interest\n**Without perfection:** Interest valid but may lose to others"
        },
        {
          title: '🧠 Memory Aid: Attachment Requirements',
          type: 'callout',
          content: "**\"VCR\"** for attachment:\n\n**V**alue - Creditor gave value\n**C**ollateral - Debtor has rights in collateral\n**R**ecord - Security agreement (authenticated) OR possession\n\n**All three required! Record the VCR!**"
        },
        {
          title: 'Security Agreement',
          type: 'text',
          content: "**Must contain:**\n\n• Debtor's authentication (signature)\n• Description of collateral\n• Intent to create security interest\n\n**Description can be:**\n• Specific (\"2024 Toyota Camry VIN #...\")\n• By type (\"all inventory\")\n• \"All assets\" NOT sufficient for some collateral\n\n**After-acquired property clause:** Can cover future collateral"
        },
        {
          title: 'Methods of Perfection',
          type: 'table',
          headers: ['Method', 'When Used'],
          rows: [
            ['Filing (financing statement)', 'Most collateral - default method'],
            ['Possession', 'Goods, instruments, money'],
            ['Control', 'Deposit accounts, investment property'],
            ['Automatic', 'PMSI in consumer goods']
          ]
        },
        {
          title: 'Financing Statement (UCC-1)',
          type: 'text',
          content: "**Filed with state (usually Secretary of State):**\n\n**Must contain:**\n• Debtor's name (EXACT!)\n• Secured party's name\n• Collateral description\n\n**Duration:** 5 years (can file continuation)\n\n**Where to file:** State where debtor is located (organization's state of incorporation)"
        },
        {
          title: '⚠️ Exam Trap: PMSI (Purchase Money Security Interest)',
          type: 'warning',
          content: "**PMSI = Creditor financed the collateral purchase**\n\n**Super-priority over prior perfected interests IF:**\n\n**Inventory:** PMSI perfected BEFORE delivery AND notice sent to prior secured parties\n\n**Non-inventory:** PMSI perfected within 20 days of delivery\n\n**Consumer goods:** PMSI automatically perfected (no filing needed)!"
        },
        {
          title: 'Priority Rules',
          type: 'text',
          content: "**General priority (first in time):**\n\n1. **Perfected > Unperfected** (always)\n2. **Between perfected:** First to file or perfect\n3. **Between unperfected:** First to attach\n\n**Exceptions:**\n• PMSI has super-priority\n• Buyers in ordinary course take free of security interests"
        },
        {
          title: 'Default and Remedies',
          type: 'text',
          content: "**Upon default, secured party can:**\n\n• Take possession (peacefully or by court)\n• Dispose of collateral (sale, lease)\n• Keep collateral in satisfaction (strict foreclosure)\n\n**Disposition must be commercially reasonable**\n\n**Proceeds:** Apply to debt; surplus to debtor; deficiency owed by debtor"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Attachment requires: Value, Collateral rights, Record (VCR)",
            "Perfection gives priority over third parties",
            "Most perfection by filing financing statement (UCC-1)",
            "Debtor's name must be EXACT on financing statement",
            "PMSI gets super-priority (special timing rules)",
            "Consumer goods PMSI: Automatic perfection",
            "Perfected beats unperfected; First to file/perfect wins"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-010',
    section: 'REG',
    courseId: 'cpa',
    title: "Bankruptcy: Chapters 7, 11, 13",
    description: "Understand the major types of bankruptcy proceedings",
    order: 18,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Law", "Bankruptcy"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Bankruptcy affects creditors, debtors, and businesses alike! Understanding the differences between liquidation (Ch. 7), reorganization (Ch. 11), and individual debt adjustment (Ch. 13) is essential for advising clients and passing REG!"
        },
        {
          title: 'Types of Bankruptcy',
          type: 'table',
          headers: ['Chapter', 'Type', 'Who Can File'],
          rows: [
            ['Chapter 7', 'Liquidation', 'Individuals, corporations, partnerships'],
            ['Chapter 11', 'Reorganization', 'Businesses (and some individuals)'],
            ['Chapter 13', 'Debt Adjustment', 'Individuals with regular income']
          ]
        },
        {
          title: 'Chapter 7: Liquidation',
          type: 'text',
          content: "**\"Fresh start\" through liquidation:**\n\n• Trustee collects and sells non-exempt assets\n• Proceeds distributed to creditors by priority\n• Remaining debts discharged (with exceptions)\n\n**Means test:** Individuals must qualify (income below median)\n\n**Not available:** If income above median and can pay some debts"
        },
        {
          title: '🧠 Memory Aid: Bankruptcy Chapters',
          type: 'callout',
          content: "**\"7-11-13\"** like convenience stores:\n\n**7** = LIQUIDATE (sell everything, quick)\n**11** = REORGANIZE (keep business running)\n**13** = REPAY over time (wage earner plan)\n\n**7 = Sell | 11 = Save business | 13 = Salary pays**"
        },
        {
          title: 'Voluntary vs Involuntary',
          type: 'text',
          content: "**Voluntary:** Debtor files petition\n\n**Involuntary (creditors force):**\n• Only Chapters 7 and 11\n• If 12+ creditors: Need 3 petitioning creditors\n• If fewer than 12: One creditor sufficient\n• Total claims must be at least ~$18,600\n• Debtor not paying debts as they become due\n\n**Cannot file involuntary against:** Farmers, nonprofits"
        },
        {
          title: 'Automatic Stay',
          type: 'text',
          content: "**Immediate upon filing:**\n\n• ALL collection efforts STOP\n• No lawsuits, garnishments, foreclosures\n• No phone calls demanding payment\n• Secured creditors can seek relief from stay\n\n**Powerful protection for debtor!**\n\n**Violation = Contempt of court**"
        },
        {
          title: 'Priority of Claims',
          type: 'list',
          content: [
            "**1. Secured creditors** (from collateral proceeds)",
            "**2. Domestic support obligations** (alimony, child support)",
            "**3. Administrative expenses** (trustee fees, attorney fees)",
            "**4. Gap claims** (involuntary - between filing and order)",
            "**5. Employee wages** (up to ~$15,150, within 180 days)",
            "**6. Employee benefit plan contributions**",
            "**7. Consumer deposits** (up to ~$3,350)",
            "**8. Tax claims** (certain taxes)",
            "**9. General unsecured creditors** (pro rata)"
          ]
        },
        {
          title: 'Non-Dischargeable Debts',
          type: 'text',
          content: "**Cannot be discharged (survive bankruptcy):**\n\n• Student loans (unless undue hardship)\n• Alimony and child support\n• Most taxes (within 3 years)\n• Debts from fraud or false statements\n• Debts not listed in petition\n• Fines and penalties to government\n• Personal injury from DUI\n\n**These must still be paid!**"
        },
        {
          title: '⚠️ Exam Trap: Student Loans',
          type: 'warning',
          content: "**Student loans are generally NOT dischargeable!**\n\n**Exception:** Prove \"undue hardship\" (very difficult standard)\n\n**Common misconception:** Filing bankruptcy eliminates student loans → FALSE\n\n**They survive both Chapter 7 AND Chapter 13!**"
        },
        {
          title: 'Chapter 11: Reorganization',
          type: 'text',
          content: "**Business continues operating:**\n\n• Debtor usually remains in possession (\"DIP\")\n• Files reorganization plan\n• Creditors vote on plan\n• Court confirms plan\n• Business pays debts over time\n\n**Allows business to survive and pay creditors more than liquidation**"
        },
        {
          title: 'Chapter 13: Wage Earner Plan',
          type: 'text',
          content: "**Individual debt adjustment:**\n\n• Regular income required\n• Keep property while repaying\n• 3-5 year repayment plan\n• Debt limits apply (~$465,000 unsecured)\n\n**Advantages over Ch. 7:**\n• Keep property\n• More debts may be discharged\n• Catch up on mortgage/car payments"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Chapter 7: Liquidation, fresh start, means test required",
            "Chapter 11: Business reorganization, debtor stays in control",
            "Chapter 13: Wage earner repayment plan, 3-5 years",
            "Automatic stay stops ALL collection immediately",
            "Priority: Secured → Support → Admin → Wages → Taxes → Unsecured",
            "Student loans, support, and recent taxes NOT dischargeable",
            "Involuntary: Only Ch. 7 and 11, requires creditor petition"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-011',
    section: 'REG',
    courseId: 'cpa',
    title: "Secured Transactions: UCC Article 9",
    description: "Master secured transactions including attachment, perfection, and priority",
    order: 15,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Business Law", "Secured Transactions", "UCC"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Secured transactions govern how creditors protect their interests in collateral. Understanding attachment, perfection, and priority is essential for advising business clients and is heavily tested on REG!"
        },
        {
          title: 'What is a Security Interest?',
          type: 'text',
          content: "**Security interest = Interest in personal property that secures payment**\n\n**Key terms:**\n• **Debtor** - Person who owes the debt\n• **Secured party** - Creditor with security interest\n• **Collateral** - Property securing the debt\n• **Security agreement** - Contract creating security interest"
        },
        {
          title: 'Attachment: Creating Security Interest',
          type: 'text',
          content: "**Three requirements for attachment:**\n\n1. **Value given** - Creditor gives something (loan, credit)\n2. **Debtor has rights** - In the collateral\n3. **Security agreement** - Authenticated description of collateral\n\n**When all three occur = Security interest ATTACHES**\n\n**Attachment makes it enforceable against debtor**"
        },
        {
          title: '🧠 Memory Aid: Attachment - VRS',
          type: 'callout',
          content: "**\"VRS\"** for Attachment:\n\n**V**alue given by secured party\n**R**ights in collateral (debtor has)\n**S**ecurity agreement (authenticated)\n\n**\"Very Risky Securities need all three!\"**"
        },
        {
          title: 'Perfection: Protecting Against Third Parties',
          type: 'text',
          content: "**Perfection = Notice to the world of security interest**\n\n**Methods of perfection:**\n• **Filing** - UCC-1 financing statement (most common)\n• **Possession** - Creditor takes collateral\n• **Control** - Bank accounts, investment securities\n• **Automatic** - PMSIs in consumer goods\n\n**Perfection protects against other creditors!**"
        },
        {
          title: 'Filing a Financing Statement',
          type: 'table',
          headers: ['Requirement', 'Details'],
          rows: [
            ['Debtor name', 'Exact legal name (errors may invalidate)'],
            ['Secured party name', 'Creditor identification'],
            ['Collateral description', 'Reasonably identifies collateral'],
            ['Where to file', 'Secretary of State (most collateral)'],
            ['Duration', '5 years (can be continued)']
          ]
        },
        {
          title: 'Purchase Money Security Interest (PMSI)',
          type: 'text',
          content: "**PMSI = Security interest in goods securing their purchase price**\n\n**Example:** Bank loans money to buy equipment, takes security interest in that equipment\n\n**Special priority rules:**\n• PMSI in inventory - Must perfect BEFORE delivery\n• PMSI in other goods - 20 days after delivery to perfect\n\n**PMSIs get SUPER-PRIORITY over earlier-filed interests!**"
        },
        {
          title: 'Priority Rules',
          type: 'table',
          headers: ['Situation', 'Priority Rule'],
          rows: [
            ['Perfected vs Unperfected', 'Perfected wins'],
            ['Both Perfected', 'First to file or perfect wins'],
            ['Both Unperfected', 'First to attach wins'],
            ['PMSI vs Earlier Filed', 'PMSI wins (if timely perfected)'],
            ['Buyer in Ordinary Course', 'Buyer takes free of security interest']
          ]
        },
        {
          title: '⚠️ Exam Trap: Buyer in Ordinary Course',
          type: 'warning',
          content: "**A buyer in ordinary course of business takes FREE of security interest!**\n\n**Example:**\n• Bank has security interest in store's inventory\n• Customer buys item from store (ordinary course)\n• Customer owns item FREE of bank's security interest\n\n**Buyer must not know interest is unauthorized**"
        },
        {
          title: 'Default and Remedies',
          type: 'text',
          content: "**Upon default, secured party may:**\n\n• Take possession of collateral (self-help if no breach of peace)\n• Sell collateral (commercially reasonable manner)\n• Accept collateral in satisfaction (strict foreclosure)\n• Sue on the debt\n\n**Surplus goes to debtor; deficiency owed by debtor**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Attachment: Value + Rights + Security Agreement",
            "Perfection: Filing, possession, control, or automatic",
            "File UCC-1 with Secretary of State (5-year duration)",
            "First to file or perfect generally wins priority",
            "PMSI has super-priority if timely perfected",
            "Buyer in ordinary course takes free of security interest",
            "Upon default: Repossess, sell, apply proceeds"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-012',
    section: 'REG',
    courseId: 'cpa',
    title: "Business Entity Formation: Sole Proprietorships",
    description: "Understand the simplest form of business organization",
    order: 16,
    duration: 35,
    difficulty: 'beginner',
    topics: ["Business Law", "Business Entities"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The sole proprietorship is the most common and simplest business form! Understanding its advantages and limitations helps advise clients choosing an entity structure. REG tests entity selection extensively!"
        },
        {
          title: 'What is a Sole Proprietorship?',
          type: 'text',
          content: "**One person owns and operates the business**\n\n• No separate legal entity\n• Owner IS the business\n• No formal filing required to start\n• May need licenses/permits\n\n**Default structure when individual starts business alone**"
        },
        {
          title: 'Formation Requirements',
          type: 'text',
          content: "**Simple formation:**\n\n• Just start doing business!\n• May need:\n  - Business license (local)\n  - DBA/Fictitious name filing\n  - Industry-specific permits\n  - EIN (if employees)\n\n**No state filing required for the entity itself**"
        },
        {
          title: 'Advantages',
          type: 'list',
          content: [
            "**Easy to form** - No paperwork or legal fees",
            "**Complete control** - Owner makes all decisions",
            "**Simple taxation** - Report on Schedule C",
            "**No double taxation** - Income flows to personal return",
            "**Easy to dissolve** - Just stop doing business",
            "**Minimal compliance** - No annual reports or meetings"
          ]
        },
        {
          title: 'Disadvantages',
          type: 'list',
          content: [
            "**Unlimited personal liability** - Owner liable for ALL business debts",
            "**Self-employment tax** - On all net earnings (15.3%)",
            "**Limited capital raising** - Cannot sell ownership interests",
            "**Limited life** - Ends when owner dies/stops",
            "**No employee benefits** - Cannot be own employee"
          ]
        },
        {
          title: '🧠 Memory Aid: Sole Prop Characteristics',
          type: 'callout',
          content: "**\"SIMPLE but RISKY\"**\n\n**SIMPLE:**\n• Single owner\n• Individual control\n• Minimal paperwork\n• Personal return (Schedule C)\n• Low cost\n• Easy start/stop\n\n**RISKY = Unlimited personal liability!**"
        },
        {
          title: 'Tax Treatment',
          type: 'text',
          content: "**Schedule C (Form 1040):**\n\n• Report income and expenses\n• Net profit = Self-employment income\n• Subject to:\n  - Income tax (regular rates)\n  - Self-employment tax (15.3%)\n  - Deduct 50% of SE tax above the line\n\n**Quarterly estimated payments typically required**"
        },
        {
          title: '⚠️ Exam Trap: Liability',
          type: 'warning',
          content: "**Business debts = Personal debts!**\n\n**Example:** Sole proprietor's business is sued for $500,000\n\n**At risk:**\n• Business assets\n• Personal home\n• Personal bank accounts\n• Personal investments\n• ALL personal assets!\n\n**No liability protection whatsoever**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Simplest business form - no state filing required",
            "Owner has complete control but unlimited liability",
            "Income reported on Schedule C (Form 1040)",
            "Subject to self-employment tax (15.3%)",
            "Default structure for individual doing business alone",
            "Cannot raise capital by selling ownership",
            "Business ends when owner dies or stops operating"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-013',
    section: 'REG',
    courseId: 'cpa',
    title: "Business Entity Formation: LLCs",
    description: "Master Limited Liability Company formation and characteristics",
    order: 17,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Business Law", "Business Entities", "LLC"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-C-4',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "LLCs combine the best features of corporations and partnerships! They're the most popular choice for new businesses. Understanding LLC formation, liability protection, and tax flexibility is essential for REG!"
        },
        {
          title: 'What is an LLC?',
          type: 'text',
          content: "**Limited Liability Company:**\n\n• Separate legal entity from owners\n• Owners called \"members\"\n• Combines liability protection with tax flexibility\n• State law entity (not federal)\n\n**Best of both worlds: Corp liability + Partnership taxation**"
        },
        {
          title: 'Formation Requirements',
          type: 'text',
          content: "**To form an LLC:**\n\n1. **File Articles of Organization** with state\n2. **Choose a name** (must include \"LLC\" or similar)\n3. **Designate registered agent**\n4. **Pay filing fees**\n\n**Operating Agreement** (highly recommended but not always required):\n• Governs internal affairs\n• Member rights and duties\n• Profit/loss allocation\n• Management structure"
        },
        {
          title: 'Management Structure',
          type: 'table',
          headers: ['Type', 'Description'],
          rows: [
            ['Member-Managed', 'All members participate in management (default)'],
            ['Manager-Managed', 'Designated managers run business']
          ]
        },
        {
          title: 'Liability Protection',
          type: 'text',
          content: "**Members have LIMITED LIABILITY:**\n\n• Generally not personally liable for LLC debts\n• At risk only for capital contribution\n• Personal assets protected\n\n**Exceptions (piercing the veil):**\n• Personal guarantees\n• Commingling funds\n• Undercapitalization\n• Failure to observe formalities"
        },
        {
          title: '🧠 Memory Aid: LLC Benefits',
          type: 'callout',
          content: "**\"FLIP\"** for LLC advantages:\n\n**F**lexibility in management\n**L**imited liability protection\n**I**ncome flows through (no double tax)\n**P**ass-through tax treatment (default)\n\n**FLIP to an LLC for protection + flexibility!**"
        },
        {
          title: 'Tax Classification (Check-the-Box)',
          type: 'text',
          content: "**LLCs choose their tax treatment:**\n\n**Single-member LLC:**\n• Default: Disregarded entity (Schedule C)\n• Can elect: S Corp or C Corp\n\n**Multi-member LLC:**\n• Default: Partnership (Form 1065)\n• Can elect: S Corp or C Corp\n\n**File Form 8832 to change classification**"
        },
        {
          title: 'LLC vs Other Entities',
          type: 'table',
          headers: ['Feature', 'LLC', 'Corp', 'Partnership'],
          rows: [
            ['Liability Protection', 'Yes', 'Yes', 'No (general)'],
            ['Default Pass-through', 'Yes', 'No', 'Yes'],
            ['Ownership Flexibility', 'High', 'Limited (S Corp)', 'High'],
            ['Formalities Required', 'Minimal', 'Extensive', 'Minimal'],
            ['Self-Employment Tax', 'Maybe', 'No (wages)', 'Yes']
          ]
        },
        {
          title: '⚠️ Exam Trap: Self-Employment Tax',
          type: 'warning',
          content: "**LLC members may owe SE tax!**\n\n**Active members:** Usually subject to SE tax on distributive share\n\n**S Corp election advantage:**\n• Pay reasonable salary (FICA on wages only)\n• Take distributions (no SE tax)\n\n**LLC taxed as partnership = More SE tax exposure**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "LLC provides liability protection + tax flexibility",
            "Form by filing Articles of Organization with state",
            "Operating Agreement governs internal affairs",
            "Default tax: Disregarded (single) or Partnership (multi)",
            "Can elect S Corp or C Corp taxation",
            "Member-managed (default) or manager-managed",
            "Limited liability but watch for piercing the veil"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-014',
    section: 'REG',
    courseId: 'cpa',
    title: "Partnership Formation and General Partners",
    description: "Understand partnership formation, rights, and liabilities",
    order: 18,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Business Law", "Business Entities", "Partnership"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnerships are common business structures and heavily tested on REG! Understanding formation, partner duties, and especially the JOINT AND SEVERAL LIABILITY of general partners is critical for advising clients!"
        },
        {
          title: 'What is a Partnership?',
          type: 'text',
          content: "**Association of two or more persons to carry on a business for profit**\n\n• No formal filing required (general partnership)\n• Can be formed by conduct alone\n• Partnership agreement recommended\n• Each partner is an agent of the partnership"
        },
        {
          title: 'Types of Partnerships',
          type: 'table',
          headers: ['Type', 'Filing', 'Liability'],
          rows: [
            ['General Partnership (GP)', 'None required', 'All partners unlimited liability'],
            ['Limited Partnership (LP)', 'File certificate', 'GPs unlimited; LPs limited'],
            ['Limited Liability Partnership (LLP)', 'File registration', 'Partners protected from each other']
          ]
        },
        {
          title: 'Partnership Formation',
          type: 'text',
          content: "**No formalities required for GP:**\n\n• Oral or written agreement\n• Intent to share profits\n• Co-ownership of business\n• Can form accidentally!\n\n**Partnership agreement should address:**\n• Capital contributions\n• Profit/loss sharing\n• Management rights\n• Dissolution procedures"
        },
        {
          title: '🧠 Memory Aid: Formation Elements',
          type: 'callout',
          content: "**\"PIC\"** creates a Partnership:\n\n**P**rofit sharing intent\n**I**ntent to do business together\n**C**o-ownership of business\n\n**Sharing profits creates PRESUMPTION of partnership!**"
        },
        {
          title: 'Partner Rights',
          type: 'list',
          content: [
            "**Equal management rights** (unless agreed otherwise)",
            "**Equal share of profits** (default rule)",
            "**Indemnification** for proper partnership expenses",
            "**Access to books** and records",
            "**Compensation** only for winding up (default)",
            "**New partners** require unanimous consent"
          ]
        },
        {
          title: 'Partner Duties',
          type: 'text',
          content: "**Fiduciary duties to partnership:**\n\n• **Duty of Loyalty** - No competing, no self-dealing\n• **Duty of Care** - Refrain from gross negligence\n• **Duty of Good Faith** - Fair dealing\n\n**Cannot eliminate duty of loyalty or good faith by agreement**"
        },
        {
          title: 'Partner Liability',
          type: 'text',
          content: "**JOINT AND SEVERAL LIABILITY:**\n\n• Each general partner liable for ALL partnership debts\n• Creditor can sue any one partner for entire debt\n• Partners can seek contribution from others\n• Personal assets at risk!\n\n**Incoming partner:** Liable only for new debts (not prior)\n**Outgoing partner:** Remains liable unless released"
        },
        {
          title: '⚠️ Exam Trap: Joint and Several',
          type: 'warning',
          content: "**Partnership has $1M debt, 4 partners:**\n\n**Can creditor sue one partner for $1M?** YES!\n\n• Each partner liable for entire amount\n• That partner seeks contribution from others\n• If others can't pay, one partner stuck with full debt\n\n**This is the BIGGEST RISK of general partnerships!**"
        },
        {
          title: 'Partnership Property',
          type: 'text',
          content: "**Property contributed becomes partnership property:**\n\n• Titled in partnership name\n• Used for partnership purposes\n• Purchased with partnership funds\n\n**Partners have no individual rights in specific property**\n\n**Interest in partnership is personal property**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Partnership: 2+ persons carrying on business for profit",
            "No formal filing required for general partnership",
            "Sharing profits creates presumption of partnership",
            "General partners have joint and several liability",
            "Fiduciary duties: Loyalty, care, good faith",
            "Equal management and profit sharing (default)",
            "Incoming partner: Not liable for pre-existing debts"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-015',
    section: 'REG',
    courseId: 'cpa',
    title: "Corporation Formation and Characteristics",
    description: "Master corporate formation, governance, and shareholder rights",
    order: 19,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Business Law", "Business Entities", "Corporation"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-C-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Corporations are the most formal business structure with the strongest liability protection! Understanding formation, governance, and shareholder rights is essential for REG and advising business clients!"
        },
        {
          title: 'What is a Corporation?',
          type: 'text',
          content: "**Separate legal entity created under state law**\n\n• Distinct from its owners (shareholders)\n• Can own property, sue, be sued\n• Perpetual existence (survives owners)\n• Centralized management (board of directors)\n\n**Limited liability for shareholders**"
        },
        {
          title: 'Formation: Articles of Incorporation',
          type: 'text',
          content: "**File Articles with Secretary of State:**\n\n**Required provisions:**\n• Corporate name (must include \"Inc.\" or similar)\n• Number of authorized shares\n• Registered agent and office\n• Incorporator name(s)\n\n**Optional provisions:**\n• Purpose (any lawful purpose)\n• Par value of shares\n• Director names"
        },
        {
          title: 'Corporate Structure',
          type: 'table',
          headers: ['Level', 'Role'],
          rows: [
            ['Shareholders', 'Elect directors, approve major changes'],
            ['Board of Directors', 'Policy, oversight, hire officers'],
            ['Officers', 'Day-to-day management (CEO, CFO, etc.)']
          ]
        },
        {
          title: '🧠 Memory Aid: Corporate Hierarchy',
          type: 'callout',
          content: "**\"SBO\"** - Top to Bottom:\n\n**S**hareholders (owners - vote)\n**B**oard (directors - oversee)\n**O**fficers (managers - operate)\n\n**\"Shareholders elect Board who hire Officers\"**"
        },
        {
          title: 'Shareholder Rights',
          type: 'list',
          content: [
            "**Vote** for directors and major changes",
            "**Receive dividends** if declared by board",
            "**Inspect** books and records (proper purpose)",
            "**Sue derivatively** on behalf of corporation",
            "**Preemptive rights** to maintain ownership % (if granted)",
            "**Share in liquidation** proceeds (after creditors)"
          ]
        },
        {
          title: 'Board of Directors Duties',
          type: 'text',
          content: "**Fiduciary duties:**\n\n• **Duty of Care** - Informed decisions, reasonable inquiry\n• **Duty of Loyalty** - No self-dealing, corporate opportunity\n• **Business Judgment Rule** - Protects good faith decisions\n\n**Board sets policy; does NOT manage day-to-day**"
        },
        {
          title: 'Piercing the Corporate Veil',
          type: 'text',
          content: "**When shareholders lose liability protection:**\n\n• **Commingling** - Personal and corporate funds mixed\n• **Undercapitalization** - Inadequate funding\n• **Alter ego** - No separation between owner and corp\n• **Fraud** - Corp used to perpetrate fraud\n• **Formality failures** - No meetings, minutes, records\n\n**Courts can hold shareholders personally liable!**"
        },
        {
          title: '⚠️ Exam Trap: Formalities Matter',
          type: 'warning',
          content: "**To maintain liability protection:**\n\n✓ Hold annual shareholder meetings\n✓ Maintain minutes and records\n✓ Keep separate bank accounts\n✓ Adequately capitalize the business\n✓ Use corporate name on contracts\n\n**Skip formalities = Risk personal liability!**"
        },
        {
          title: 'De Jure vs De Facto Corporation',
          type: 'text',
          content: "**De Jure Corporation:**\n• Properly formed under state law\n• Full liability protection\n\n**De Facto Corporation:**\n• Good faith attempt to incorporate\n• Colorable compliance with law\n• Business conducted as corporation\n• Limited protection from most creditors\n\n**Corporation by Estoppel:** One who deals with entity as corporation cannot later deny it"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Corporation is separate legal entity from owners",
            "Form by filing Articles of Incorporation with state",
            "Shareholders elect board; board hires officers",
            "Directors owe fiduciary duties (care, loyalty)",
            "Business judgment rule protects good faith decisions",
            "Piercing veil: Commingling, undercapitalization, fraud",
            "Maintain formalities to preserve liability protection"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-001',
    section: 'REG',
    courseId: 'cpa',
    title: "Gross Income: Inclusions",
    description: "Master what items must be included in gross income",
    order: 19,
    duration: 60,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Gross Income"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Gross income is the starting point for all tax calculations! Section 61 defines it broadly—\"all income from whatever source derived.\" Understanding what's included (and what's not) is fundamental to REG!"
        },
        {
          title: 'Section 61: All-Inclusive Definition',
          type: 'text',
          content: "**Gross income includes ALL income from whatever source:**\n\n• Cash received\n• Property received (FMV)\n• Services received (FMV)\n• Debt cancellation\n• Illegal income\n\n**\"If it's income, it's probably taxable unless specifically excluded!\"**"
        },
        {
          title: 'Common Income Inclusions',
          type: 'table',
          headers: ['Type', 'Included?', 'Notes'],
          rows: [
            ['Wages/Salary', 'Yes', 'Form W-2'],
            ['Tips', 'Yes', 'Cash tips reportable'],
            ['Interest', 'Yes', 'Taxable (except muni bonds)'],
            ['Dividends', 'Yes', 'Qualified rate may apply'],
            ['Business income', 'Yes', 'Schedule C'],
            ['Rental income', 'Yes', 'Schedule E'],
            ['Gambling winnings', 'Yes', 'Offset by losses to extent of winnings'],
            ['Prizes/Awards', 'Yes', 'FMV included']
          ]
        },
        {
          title: '🧠 Memory Aid: Income Sources',
          type: 'callout',
          content: "**\"WILD BIRD\"** includes income from:\n\n**W**ages\n**I**nterest\n**L**ottery/gambling\n**D**ividends\n\n**B**usiness\n**I**llegal activities\n**R**ents/royalties\n**D**ebt cancellation\n\n**All taxable unless specifically excluded!**"
        },
        {
          title: 'Constructive Receipt',
          type: 'text',
          content: "**Income is received when:**\n\n• Actually received, OR\n• **Constructively received** - Available without substantial limitation\n\n**Examples:**\n• Check mailed in December = December income (even if deposited in January)\n• Interest credited to account = Income when credited\n• Bonus earned but deferred = Not constructively received if legitimate deferral\n\n**Cash basis taxpayers recognize when received!**"
        },
        {
          title: 'Compensation Issues',
          type: 'text',
          content: "**Taxable compensation includes:**\n\n• Cash wages/salary\n• Bonuses\n• Stock options (taxed on exercise or sale)\n• Fringe benefits (unless excluded)\n• Severance pay\n• Back pay awards\n\n**Non-cash:** Include at FMV on date received"
        },
        {
          title: 'Alimony (Divorce Timing Matters!)',
          type: 'text',
          content: "**Divorce/separation agreements:**\n\n**Before 2019:**\n• Alimony = Taxable to recipient, deductible by payer\n\n**After 2018 (TCJA):**\n• Alimony = NOT taxable, NOT deductible\n\n**Child support:** Never taxable or deductible (regardless of date)\n\n**Property settlements:** Generally no tax consequence"
        },
        {
          title: '⚠️ Exam Trap: Pre-2019 vs Post-2018 Alimony',
          type: 'warning',
          content: "**The exam WILL test this!**\n\n**Agreement date matters:**\n\n• Executed BEFORE 2019 → Old rules (taxable/deductible)\n• Executed AFTER 2018 → New rules (nothing)\n\n**Modified agreements:** Old rules continue unless modification expressly adopts new rules\n\n**Read the dates carefully!**"
        },
        {
          title: 'Debt Cancellation',
          type: 'text',
          content: "**Cancellation of Debt (COD) income:**\n\n• Generally taxable (Form 1099-C)\n• Treated as if debtor received cash\n\n**Exclusions (not taxable):**\n• Bankruptcy discharge\n• Insolvency (to extent insolvent)\n• Qualified farm debt\n• Qualified real property business debt\n• Qualified principal residence debt (through 2025)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Gross income includes ALL income unless specifically excluded",
            "Constructive receipt: Available = Received (cash basis)",
            "Non-cash income taxed at FMV",
            "Alimony: Pre-2019 = taxable; Post-2018 = not taxable",
            "Child support: NEVER taxable or deductible",
            "Debt cancellation is income (with exclusions)",
            "Illegal income is still taxable!"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-002',
    section: 'REG',
    courseId: 'cpa',
    title: "Gross Income: Exclusions",
    description: "Learn what items can be excluded from gross income",
    order: 20,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Exclusions"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Not everything is taxable! The Code provides specific exclusions from gross income. Knowing these exclusions can save clients significant taxes—and they're heavily tested on REG!"
        },
        {
          title: 'Major Exclusions from Gross Income',
          type: 'list',
          content: [
            "**Gifts and inheritances** (Section 102)",
            "**Life insurance proceeds** (Section 101)",
            "**Municipal bond interest** (Section 103)",
            "**Qualified scholarships** (Section 117)",
            "**Employer-provided health insurance**",
            "**Workers' compensation** (Section 104)",
            "**Certain fringe benefits** (Section 132)",
            "**Foreign earned income** (Section 911)"
          ]
        },
        {
          title: '🧠 Memory Aid: Exclusions',
          type: 'callout',
          content: "**\"GLIMS\"** are excluded:\n\n**G**ifts and inheritances\n**L**ife insurance death benefits\n**I**njury compensation (workers' comp, damages)\n**M**unicipal bond interest\n**S**cholarships (qualified)\n\n**These are TAX-FREE!**"
        },
        {
          title: 'Gifts vs Compensation',
          type: 'text',
          content: "**Gift = Transfer from detached generosity**\n\n**NOT a gift (taxable):**\n• Tips (payment for services)\n• Employer \"gifts\" to employees\n• Payments for past services\n\n**True gift:** Motivated by affection, respect, charity\n\n**Inheritance:** Always excluded (but income FROM inherited property is taxable)"
        },
        {
          title: 'Life Insurance Proceeds',
          type: 'text',
          content: "**Death benefits generally excluded:**\n\n• Lump sum to beneficiary = Tax-free\n• Installments = Principal excluded, interest taxable\n\n**Exceptions (taxable):**\n• Transfer for valuable consideration\n• Employer-owned life insurance (EOLI) unless exceptions met\n\n**Accelerated death benefits:** Excluded if terminally/chronically ill"
        },
        {
          title: 'Qualified Scholarships',
          type: 'text',
          content: "**Excluded if used for:**\n\n• Tuition and fees\n• Books and supplies (required)\n\n**Taxable (NOT excluded):**\n• Room and board\n• Travel\n• Equipment not required\n\n**Must be degree candidate at educational institution**"
        },
        {
          title: 'Employer-Provided Fringe Benefits',
          type: 'table',
          headers: ['Benefit', 'Excluded?', 'Limit'],
          rows: [
            ['Health insurance premiums', 'Yes', 'No limit'],
            ['Group-term life insurance', 'Yes', 'Up to $50,000 coverage'],
            ['Dependent care assistance', 'Yes', 'Up to $5,000'],
            ['Qualified transportation', 'Yes', '$315/month (2024)'],
            ['Employee discounts', 'Yes', 'Within limits'],
            ['De minimis fringe', 'Yes', 'Small value items']
          ]
        },
        {
          title: '⚠️ Exam Trap: Group-Term Life Insurance',
          type: 'warning',
          content: "**Only first $50,000 of coverage excluded!**\n\n**Over $50,000:**\n• \"Cost\" of excess coverage is taxable\n• Use IRS Table I to determine includible amount\n• Based on employee's age\n\n**Example:** $100,000 policy\n• $50,000 excluded\n• Imputed income on $50,000 excess coverage"
        },
        {
          title: 'Damages and Settlements',
          type: 'text',
          content: "**Personal physical injury/sickness:**\n• Compensatory damages = Excluded\n• Medical expense reimbursement = Excluded\n\n**NOT excluded (taxable):**\n• Punitive damages (always taxable)\n• Emotional distress damages (unless physical origin)\n• Lost wages (unless part of physical injury)\n• Interest on judgment\n\n**Physical injury required for exclusion!**"
        },
        {
          title: 'Foreign Earned Income Exclusion',
          type: 'text',
          content: "**Section 911 exclusion:**\n\n**2024:** Up to $126,500 excluded\n\n**Requirements:**\n• Tax home in foreign country\n• Meet physical presence test (330 days in 12-month period), OR\n• Bona fide residence test\n\n**Plus:** Housing exclusion/deduction available"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Gifts and inheritances: Excluded from recipient's income",
            "Life insurance death benefits: Generally excluded",
            "Municipal bond interest: Excluded from federal tax",
            "Scholarships: Excluded for tuition/fees only (not room/board)",
            "Group-term life: Only first $50,000 excluded",
            "Physical injury damages: Excluded; Punitive damages: Taxable",
            "Foreign earned income: Up to $126,500 excluded (2024)"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-003',
    section: 'REG',
    courseId: 'cpa',
    title: "🆕 H.R. 1: Tip Income Exclusion",
    description: "Understand the new tip income exclusion provisions",
    order: 21,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "H.R. 1", "Tips"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "NEW LAW ALERT! H.R. 1 (the current tax legislation) includes provisions for excluding certain tip income from taxation. This is new material that may appear on future exams—understand the basics and limitations!"
        },
        {
          title: 'Overview of Tip Income Exclusion',
          type: 'text',
          content: "**New provision for tip workers:**\n\n• Certain cash tips may be excluded from income\n• Designed to benefit service industry workers\n• Subject to income limitations\n• Temporary provision (sunset applies)\n\n**Note:** This represents a significant change from prior law where ALL tips were taxable"
        },
        {
          title: 'Eligible Tips',
          type: 'text',
          content: "**Tips that may qualify:**\n\n• Cash tips from customers\n• Tips received in covered occupations\n• Tips reported to employer\n\n**Requirements:**\n• Must be in qualifying service industry\n• Income must be below threshold\n• Must properly report tips\n\n**Details may vary—check current guidance!**"
        },
        {
          title: '🧠 Memory Aid: Tip Exclusion',
          type: 'callout',
          content: "**\"TIPS\"** for the exclusion:\n\n**T**ip income eligible\n**I**ncome limits apply\n**P**roperly reported\n**S**ervice industry workers\n\n**New benefit for tip workers!**"
        },
        {
          title: 'Income Limitations',
          type: 'text',
          content: "**The exclusion phases out:**\n\n• Begins phasing out at certain income levels\n• Completely eliminated at higher incomes\n• Designed for lower/middle-income workers\n\n**Similar to other income-based benefits:**\n• Those earning above thresholds don't qualify\n• Check current thresholds as they may adjust"
        },
        {
          title: 'Employer Considerations',
          type: 'text',
          content: "**Employers still must:**\n\n• Collect tip reports from employees\n• Pay employer share of FICA on tips\n• Report tips on W-2\n\n**The exclusion affects INCOME tax, not necessarily employment taxes**\n\n**Proper tip reporting remains essential!**"
        },
        {
          title: '⚠️ Exam Trap: Limited Application',
          type: 'warning',
          content: "**Important limitations:**\n\n• NOT all tips are excluded\n• Income thresholds apply\n• Temporary provision (check sunset date)\n• Employment taxes may still apply\n• Must be properly reported tips\n\n**Don't assume ALL tip income is now tax-free!**"
        },
        {
          title: 'Comparison to Prior Law',
          type: 'table',
          headers: ['Factor', 'Prior Law', 'H.R. 1'],
          rows: [
            ['Cash tips', 'Fully taxable', 'May be excluded'],
            ['Income limits', 'None', 'Phaseout applies'],
            ['Reporting', 'Required', 'Still required'],
            ['FICA taxes', 'Applied', 'May still apply']
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "H.R. 1 introduces new tip income exclusion",
            "Designed to benefit service industry workers",
            "Income limitations apply—not universal",
            "Tips must still be properly reported",
            "Employment taxes may still apply",
            "Temporary provision with sunset date",
            "Check current guidance for specific details"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-004',
    section: 'REG',
    courseId: 'cpa',
    title: "Above-the-Line Deductions",
    description: "Master deductions for AGI that reduce adjusted gross income",
    order: 22,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Deductions"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Above-the-line deductions are pure gold! They reduce AGI, which affects eligibility for many tax benefits. Unlike itemized deductions, everyone can take these regardless of whether they itemize. Know these cold for REG!"
        },
        {
          title: 'What Are Above-the-Line Deductions?',
          type: 'text',
          content: "**Deductions FOR AGI (not FROM AGI):**\n\n**Gross Income**\n- Above-the-line deductions\n= **Adjusted Gross Income (AGI)**\n- Standard OR Itemized deductions\n- QBI deduction\n= **Taxable Income**\n\n**Above-the-line = Available to ALL taxpayers**"
        },
        {
          title: 'Major Above-the-Line Deductions',
          type: 'table',
          headers: ['Deduction', 'Limit', 'Form/Schedule'],
          rows: [
            ['Educator expenses', '$300 ($600 MFJ)', 'Form 1040'],
            ['IRA contributions', '$7,000 ($8,000 if 50+)', 'Form 1040'],
            ['Student loan interest', '$2,500', 'Form 1040'],
            ['Health insurance (self-employed)', '100%', 'Form 1040'],
            ['Self-employment tax', '50% of SE tax', 'Form 1040'],
            ['Alimony paid (pre-2019)', 'Amount paid', 'Form 1040'],
            ['Moving expenses (military only)', 'Actual', 'Form 3903']
          ]
        },
        {
          title: '🧠 Memory Aid: Above-the-Line',
          type: 'callout',
          content: "**\"I SHAMES\"** above-the-line:\n\n**I**RA contributions\n**S**tudent loan interest\n**H**ealth insurance (self-employed)\n**A**limony (pre-2019 agreements)\n**M**oving (military only)\n**E**ducator expenses\n**S**elf-employment tax (50%)\n\n**These reduce AGI!**"
        },
        {
          title: 'IRA Deduction',
          type: 'text',
          content: "**Traditional IRA contribution deduction:**\n\n• Maximum: $7,000 ($8,000 if 50+) for 2024\n• Must have earned income\n• Deduction phases out if covered by employer plan AND income exceeds limits\n\n**Phase-out (single, covered by plan):**\n• Begins at $77,000 AGI\n• Ends at $87,000 AGI\n\n**Roth IRA:** No deduction (contributions with after-tax dollars)"
        },
        {
          title: 'Student Loan Interest',
          type: 'text',
          content: "**Deduction for interest paid:**\n\n• Maximum: $2,500 per year\n• Must be legally obligated to pay\n• Loan for qualified education expenses\n\n**Phase-out (2024):**\n• Single: $80,000-$95,000\n• MFJ: $165,000-$195,000\n\n**Even if parent pays on child's loan, child gets deduction (if legally obligated)**"
        },
        {
          title: 'Self-Employed Health Insurance',
          type: 'text',
          content: "**100% deduction for:**\n\n• Health insurance premiums\n• Dental insurance\n• Long-term care insurance\n• Coverage for self, spouse, dependents\n\n**Limitations:**\n• Cannot exceed net self-employment income\n• Cannot be eligible for employer-sponsored plan\n• Applies to S corp >2% shareholders too"
        },
        {
          title: '⚠️ Exam Trap: HSA Contributions',
          type: 'warning',
          content: "**Health Savings Account (HSA) contributions:**\n\n• ABOVE-the-line deduction!\n• 2024 limits: $4,150 (individual), $8,300 (family)\n• Must have high-deductible health plan (HDHP)\n• Catch-up: $1,000 additional if 55+\n\n**Triple tax benefit:**\n1. Deductible contribution\n2. Tax-free growth\n3. Tax-free qualified withdrawals"
        },
        {
          title: 'Self-Employment Tax Deduction',
          type: 'text',
          content: "**50% of self-employment tax is deductible:**\n\n• SE tax = 15.3% (12.4% SS + 2.9% Medicare)\n• Above-the-line deduction for employer-equivalent portion\n\n**Calculation:**\n• Net SE earnings × 92.35% × 15.3% = SE tax\n• SE tax × 50% = Deduction\n\n**Partially offsets extra tax burden on self-employed**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Above-the-line deductions reduce AGI (available to all)",
            "IRA deduction: Up to $7,000 ($8,000 if 50+), income limits apply",
            "Student loan interest: Up to $2,500, phases out at higher income",
            "Self-employed health: 100% deductible (up to SE income)",
            "50% of SE tax is deductible",
            "HSA contributions: Above-the-line, triple tax benefit",
            "Educator expenses: $300 ($600 MFJ)"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-005',
    section: 'REG',
    courseId: 'cpa',
    title: "Standard vs Itemized Deductions",
    description: "Compare standard deduction with itemized deductions",
    order: 23,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Deductions"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Every taxpayer must choose: Standard deduction or itemize? TCJA dramatically increased the standard deduction, making itemizing less common. Understanding what's deductible—and when to itemize—is essential for REG!"
        },
        {
          title: 'Standard Deduction Amounts (2024)',
          type: 'table',
          headers: ['Filing Status', 'Standard Deduction'],
          rows: [
            ['Single', '$14,600'],
            ['Married Filing Jointly', '$29,200'],
            ['Married Filing Separately', '$14,600'],
            ['Head of Household', '$21,900'],
            ['Additional (65+ or blind)', '$1,550 ($1,950 if single)']
          ]
        },
        {
          title: 'When to Itemize',
          type: 'text',
          content: "**Itemize when itemized deductions > standard deduction:**\n\n**Common situations:**\n• Large mortgage interest\n• Significant charitable contributions\n• Major medical expenses\n• High state/local taxes (limited to $10K)\n\n**Most taxpayers now take standard deduction** (post-TCJA)"
        },
        {
          title: '🧠 Memory Aid: Itemized Deductions',
          type: 'callout',
          content: "**\"COMIC MATH\"** to itemize:\n\n**C**haritable contributions\n**O**ther taxes (SALT—limited!)\n**M**edical expenses (>7.5% AGI)\n**I**nterest (mortgage, investment)\n**C**asualty losses (federally declared disasters)\n\n**M**ortgage interest is most common!\n**A**ll have limits\n**T**hreshold applies to medical\n**H**igh-income? No overall limit anymore"
        },
        {
          title: 'Medical Expenses',
          type: 'text',
          content: "**Deductible if exceed 7.5% of AGI:**\n\n**Deductible:**\n• Doctor/hospital bills\n• Prescription drugs\n• Health insurance premiums\n• Medical equipment\n• Long-term care (limited)\n\n**NOT deductible:**\n• Cosmetic surgery (unless medically necessary)\n• General health items (gym, vitamins)\n• Premiums paid with pre-tax dollars"
        },
        {
          title: 'State and Local Taxes (SALT)',
          type: 'text',
          content: "**SALT deduction LIMITED to $10,000:**\n\n**Includes:**\n• State/local income taxes, OR\n• State/local sales taxes (choose one)\n• Real property taxes\n• Personal property taxes\n\n**$10,000 cap applies to total!**\n($5,000 if MFS)\n\n**Major TCJA limitation**"
        },
        {
          title: 'Mortgage Interest',
          type: 'text',
          content: "**Acquisition debt interest deductible:**\n\n**Debt limits:**\n• Mortgages after 12/15/17: $750,000\n• Mortgages before 12/15/17: $1,000,000\n\n**Home equity debt:**\n• Interest NOT deductible (TCJA eliminated)\n• Exception: If used for home improvement\n\n**Must be primary or second home**"
        },
        {
          title: '⚠️ Exam Trap: SALT Cap Impact',
          type: 'warning',
          content: "**The $10,000 SALT cap is huge!**\n\n**Example:**\n• State income tax: $15,000\n• Property tax: $8,000\n• Total: $23,000\n• **Deductible: Only $10,000**\n\n**This cap pushes many to standard deduction!**\n\n**MFS = $5,000 cap (even worse)**"
        },
        {
          title: 'Charitable Contributions',
          type: 'text',
          content: "**Cash donations:**\n• Generally up to 60% of AGI\n\n**Appreciated property:**\n• Generally up to 30% of AGI\n• Can elect 50% if use basis\n\n**Requirements:**\n• Qualified organization (501(c)(3))\n• Written acknowledgment if $250+\n• Appraisal if property >$5,000\n\n**Excess carries forward 5 years**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "2024 standard deduction: $14,600 (S), $29,200 (MFJ)",
            "Most taxpayers now use standard deduction",
            "Medical expenses: Only amount exceeding 7.5% of AGI",
            "SALT deduction: LIMITED to $10,000 ($5,000 MFS)",
            "Mortgage interest: Limited to $750K acquisition debt (post-2017)",
            "Home equity interest: No longer deductible (unless for home improvement)",
            "Charitable: Generally 60% AGI limit for cash"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-006',
    section: 'REG',
    courseId: 'cpa',
    title: "Qualified Business Income Deduction (199A)",
    description: "Master the 20% deduction for pass-through business income",
    order: 24,
    duration: 65,
    difficulty: 'advanced',
    topics: ["Individual Tax", "QBI"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Section 199A deduction can be worth 20% of qualified business income! This TCJA provision helps pass-through entities compete with C corps' lower rates. But it's complex with multiple limitations—master this for REG!"
        },
        {
          title: 'Basic QBI Deduction',
          type: 'text',
          content: "**20% of Qualified Business Income:**\n\n• Available to: Sole proprietors, S corp shareholders, partners\n• Deduction is \"below the line\" (but not itemized)\n• Does NOT reduce SE tax\n• Reduces taxable income, not AGI\n\n**Formula:** Lesser of:\n1. 20% of QBI, or\n2. 20% of taxable income (before QBI deduction)"
        },
        {
          title: 'What is Qualified Business Income?',
          type: 'text',
          content: "**QBI = Net income from qualified trade or business**\n\n**Includes:**\n• Business income\n• Gains/losses from business\n• Self-employment income\n\n**Excludes:**\n• W-2 wages earned as employee\n• Investment income (interest, dividends, capital gains)\n• Reasonable compensation from S corp\n• Guaranteed payments to partners"
        },
        {
          title: '🧠 Memory Aid: QBI Components',
          type: 'callout',
          content: "**\"QUALIFIED\"** for QBI:\n\n**Q**ualified trade or business\n**U**nearned income NOT included\n**A**ggregate all businesses\n**L**imitations may apply\n**I**nvestment income excluded\n**F**rom pass-through entities\n**I**ndividuals claim deduction\n**E**mployee wages NOT QBI\n**D**eduction up to 20%"
        },
        {
          title: 'Specified Service Trade or Business (SSTB)',
          type: 'text',
          content: "**SSTBs have limited deduction if income too high:**\n\n**SSTB includes:**\n• Health, law, accounting\n• Consulting\n• Athletics, performing arts\n• Financial services, brokerage\n• Any business where principal asset is reputation/skill\n\n**NOT SSTB:** Engineering, architecture"
        },
        {
          title: 'Income Thresholds (2024)',
          type: 'table',
          headers: ['Income Level', 'Non-SSTB', 'SSTB'],
          rows: [
            ['Below threshold ($191,950/$383,900)', 'Full 20%', 'Full 20%'],
            ['Phase-out range', 'W-2/UBIA limit applies', 'Phases out'],
            ['Above threshold', 'W-2/UBIA limit applies', 'NO deduction']
          ]
        },
        {
          title: 'W-2 Wage and UBIA Limitations',
          type: 'text',
          content: "**Above threshold, deduction limited to GREATER of:**\n\n1. **50% of W-2 wages** paid by business, OR\n2. **25% of W-2 wages + 2.5% of UBIA** (unadjusted basis immediately after acquisition of qualified property)\n\n**UBIA = Depreciable property in business**\n\n**Businesses with no employees or property may have limited deduction!**"
        },
        {
          title: '⚠️ Exam Trap: SSTB Complete Phase-Out',
          type: 'warning',
          content: "**High-income SSTB owners get ZERO deduction!**\n\n**Example:** Attorney with $450,000 taxable income\n• SSTB = Yes (legal services)\n• Income above threshold\n• **QBI deduction = $0**\n\n**Same attorney with $150,000 income:**\n• Below threshold\n• **Full 20% deduction available**\n\n**SSTBs are completely phased out above threshold!**"
        },
        {
          title: 'Calculation Steps',
          type: 'text',
          content: "**Simplified approach:**\n\n1. Calculate QBI for each business\n2. Check if SSTB\n3. Compare income to threshold\n4. Apply W-2/UBIA limitation if needed\n5. Calculate 20% of QBI (limited)\n6. Apply overall taxable income limit\n\n**Many taxpayers below threshold get simple 20%**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "QBI deduction: Up to 20% of qualified business income",
            "Available to pass-through entity owners and sole proprietors",
            "W-2 wages, investment income, guaranteed payments NOT QBI",
            "SSTB limitation: Phase-out and complete denial at high income",
            "Above threshold: W-2 wage and UBIA limitations apply",
            "Engineering and architecture are NOT SSTBs",
            "Deduction limited to 20% of taxable income"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-007',
    section: 'REG',
    courseId: 'cpa',
    title: "🆕 H.R. 1: SALT Deduction Changes",
    description: "Understand changes to the state and local tax deduction",
    order: 25,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "H.R. 1", "SALT"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The SALT cap has been one of the most controversial TCJA provisions! H.R. 1 addresses changes to the state and local tax deduction limits. Understanding these changes is important for advising clients in high-tax states!"
        },
        {
          title: 'Current SALT Cap Review',
          type: 'text',
          content: "**TCJA imposed $10,000 limit:**\n\n• State and local income taxes\n• State and local sales taxes (alternative)\n• Real property taxes\n• Personal property taxes\n\n**Combined total capped at $10,000**\n($5,000 if married filing separately)\n\n**Dramatically impacted high-tax state residents**"
        },
        {
          title: 'H.R. 1 SALT Provisions',
          type: 'text',
          content: "**Potential changes under H.R. 1:**\n\n• Modifications to the $10,000 cap\n• Possible increase in limit\n• Alternative calculation methods\n• Continued limitation approach\n\n**Note:** Check current law for specific changes enacted. Provisions may have been modified during legislative process."
        },
        {
          title: '🧠 Memory Aid: SALT Components',
          type: 'callout',
          content: "**\"SALT\"** stands for:\n\n**S**tate income tax\n**A**nd\n**L**ocal taxes (property, sales)\n**T**otal capped!\n\n**All combined toward the limit**"
        },
        {
          title: 'Impact on High-Tax States',
          type: 'text',
          content: "**States most affected by SALT cap:**\n\n• New York\n• California\n• New Jersey\n• Connecticut\n• Maryland\n\n**These states have:**\n• High income tax rates\n• High property values/taxes\n• Many residents hitting the cap"
        },
        {
          title: 'State Workarounds',
          type: 'text',
          content: "**States attempted workarounds:**\n\n• Pass-through entity (PTE) taxes\n• Charitable contribution programs\n• Entity-level taxes (some upheld by IRS)\n\n**PTE workaround:**\n• Entity pays state tax (deductible at entity level)\n• Owners get credit/exclusion\n• Effectively circumvents individual SALT cap"
        },
        {
          title: '⚠️ Exam Trap: MFS Penalty',
          type: 'warning',
          content: "**Married Filing Separately = WORSE cap!**\n\n• MFS SALT limit: $5,000 (not $10,000)\n• Cannot claim standard deduction if spouse itemizes\n\n**Planning:** High-tax couples should typically file jointly\n\n**The SALT cap particularly penalizes MFS filers!**"
        },
        {
          title: 'Legislative Considerations',
          type: 'text',
          content: "**Policy debates around SALT:**\n\n• Critics say cap penalizes high-tax states\n• Supporters say it's fair (reduces subsidy to high-tax states)\n• Temporary provision (original sunset 2025)\n• H.R. 1 addresses extension/modification\n\n**Stay current on final legislation!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SALT cap currently $10,000 ($5,000 MFS)",
            "Includes state income, sales, and property taxes",
            "H.R. 1 may modify this limitation",
            "High-tax state residents most affected",
            "PTE workarounds provide some relief",
            "MFS filers face worse $5,000 limit",
            "Check current law for final provisions"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-008',
    section: 'REG',
    courseId: 'cpa',
    title: "Filing Status Determination",
    description: "Master the rules for determining correct filing status",
    order: 26,
    duration: 45,
    difficulty: 'beginner',
    topics: ["Individual Tax", "Filing Status"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Filing status affects tax brackets, standard deduction, and eligibility for credits! Choosing the wrong status can cost thousands or trigger IRS penalties. Know the rules for each status—especially Head of Household, which is frequently tested!"
        },
        {
          title: 'Five Filing Statuses',
          type: 'table',
          headers: ['Status', 'Standard Ded (2024)', 'When to Use'],
          rows: [
            ['Single', '$14,600', 'Unmarried, not HOH or QSS'],
            ['Married Filing Jointly', '$29,200', 'Married, filing together'],
            ['Married Filing Separately', '$14,600', 'Married, filing apart'],
            ['Head of Household', '$21,900', 'Unmarried + qualifying person'],
            ['Qualifying Surviving Spouse', '$29,200', 'Spouse died within 2 years + dependent']
          ]
        },
        {
          title: 'Married Filing Jointly (MFJ)',
          type: 'text',
          content: "**Requirements:**\n\n• Married on December 31 of tax year\n• Both spouses agree to file jointly\n\n**Advantages:**\n• Highest standard deduction\n• Widest tax brackets\n• Most credits available\n\n**Disadvantage:** Joint and several liability for tax"
        },
        {
          title: '🧠 Memory Aid: Head of Household',
          type: 'callout',
          content: "**\"HOMES\"** test for HOH:\n\n**H**ome—Maintained for more than half year\n**O**ccupied by qualifying person (generally)\n**M**arriage—Must be unmarried (or considered unmarried)\n**E**xpense—Paid more than half cost of home\n**S**omeone qualified lives with you\n\n**HOH = Unmarried + Maintain Home + Qualifying Person**"
        },
        {
          title: 'Head of Household Requirements',
          type: 'text',
          content: "**Must meet ALL:**\n\n1. **Unmarried** (or \"considered unmarried\")\n2. **Paid more than half** home costs\n3. **Qualifying person** lived with you more than half year\n\n**Qualifying persons:**\n• Qualifying child\n• Qualifying relative who is close family member\n\n**Exception:** Dependent parent doesn't have to live with you"
        },
        {
          title: 'Considered Unmarried Rule',
          type: 'text',
          content: "**Married but treated as unmarried if:**\n\n1. Spouse didn't live in home for last 6 months\n2. You paid more than half home costs\n3. Home is main home of your child (you claim)\n4. You would file MFS otherwise\n\n**Allows abandoned spouse to use HOH status**"
        },
        {
          title: '⚠️ Exam Trap: HOH Common Errors',
          type: 'warning',
          content: "**Watch for these traps:**\n\n❌ Unmarried person living alone → NOT HOH (Single)\n❌ Child who doesn't live with you → NOT HOH (unless dependent parent exception)\n❌ Boyfriend/girlfriend as qualifying person → NOT HOH (not related)\n❌ Non-dependent adult child → NOT HOH\n\n**Must have QUALIFYING person!**"
        },
        {
          title: 'Qualifying Surviving Spouse',
          type: 'text',
          content: "**Available for 2 years after spouse's death:**\n\n**Requirements:**\n• Could have filed MFJ in year of death\n• Have dependent child living with you\n• Paid more than half home costs\n• Didn't remarry\n\n**Benefits:** Same brackets and deduction as MFJ\n\n**Only available for 2 tax years following death**"
        },
        {
          title: 'Married Filing Separately',
          type: 'text',
          content: "**When to consider:**\n\n• Protect from spouse's tax liability\n• Spouse has large medical expenses (lower AGI threshold)\n• Divorce/separation situations\n\n**Disadvantages:**\n• Lowest tax brackets\n• Many credits unavailable\n• Must both itemize OR both standard\n• Can't claim EIC, AOTC, student loan interest"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Filing status determined as of December 31",
            "MFJ generally most advantageous for married couples",
            "HOH requires: Unmarried + Qualifying person + Pay half home costs",
            "Dependent parent doesn't need to live with you for HOH",
            "Considered unmarried: Abandoned spouse can file HOH",
            "QSS available for 2 years after spouse death with dependent",
            "MFS limits many credits and benefits"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-009',
    section: 'REG',
    courseId: 'cpa',
    title: "Dependency: Qualifying Child & Relative",
    description: "Master the tests for claiming dependents",
    order: 27,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Dependents"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Dependents unlock valuable tax benefits—Child Tax Credit, EIC, HOH status, and more! The rules for qualifying child vs qualifying relative are different and frequently tested. Know both tests cold!"
        },
        {
          title: 'Two Types of Dependents',
          type: 'text',
          content: "**1. Qualifying Child (QC)**\n• More favorable rules\n• No income limit for dependent\n• Unlocks more benefits\n\n**2. Qualifying Relative (QR)**\n• Stricter rules\n• Must have low income\n• Fewer benefits available\n\n**Try QC first, then QR if fails!**"
        },
        {
          title: 'Qualifying Child Tests',
          type: 'text',
          content: "**\"CARES\" test for Qualifying Child:**\n\n**C**lose relative (child, sibling, descendant)\n**A**ge (under 19, or under 24 if student, or any age if disabled)\n**R**esidency (lived with you more than half year)\n**E**liminate joint return (child can't file MFJ with spouse)\n**S**upport (child didn't provide more than half own support)"
        },
        {
          title: '🧠 Memory Aid: QC vs QR',
          type: 'callout',
          content: "**Qualifying CHILD = \"CARES\"**\n**Qualifying RELATIVE = \"SING\"**\n\n**Key differences:**\n• QC has Age test; QR does not\n• QC has Residency; QR has Member of household OR related\n• QR requires gross income < $5,050 (2024)\n• QR requires YOU provide >50% support\n\n**QC rules are generally MORE lenient!**"
        },
        {
          title: 'Qualifying Relative Tests',
          type: 'table',
          headers: ['Test', 'Requirement'],
          rows: [
            ['Support', 'YOU provide MORE than half support'],
            ['Income', 'Gross income < $5,050 (2024)'],
            ['Not QC', 'Cannot be qualifying child of anyone'],
            ['Gross income', 'Below threshold (not from tax-exempt sources)']
          ]
        },
        {
          title: 'Relationship or Member of Household',
          type: 'text',
          content: "**For Qualifying Relative:**\n\n**Related persons (don't need to live with you):**\n• Parents, grandparents, siblings\n• Children, grandchildren (if not QC)\n• In-laws, aunts, uncles, nieces, nephews\n\n**Unrelated persons:**\n• Must live with you entire year\n• Must be member of household\n\n**Cannot violate local law (unmarried partner rules vary)**"
        },
        {
          title: 'Support Test',
          type: 'text',
          content: "**Qualifying Child:**\n• Child cannot provide more than HALF of own support\n\n**Qualifying Relative:**\n• YOU must provide MORE than half of person's support\n\n**Support includes:**\n• Food, lodging, clothing\n• Medical care, education\n• Recreation, transportation\n\n**Fair rental value counts for lodging!**"
        },
        {
          title: '⚠️ Exam Trap: Scholarships',
          type: 'warning',
          content: "**Scholarships are TRICKY for support test:**\n\n**Qualifying Child:**\n• Scholarships NOT counted in support\n• Student's summer job earnings ARE counted\n\n**Example:** College student with $30,000 scholarship, $5,000 job income\n• Total support: $20,000\n• Student provides: $5,000 (25%)\n• Still QC because student didn't provide >50%\n\n**Scholarships don't count as support from ANYONE!**"
        },
        {
          title: 'Tiebreaker Rules',
          type: 'text',
          content: "**If multiple taxpayers could claim same child:**\n\n1. **Parent over non-parent**\n2. **If both parents:** Parent with whom child lived longer\n3. **If equal time:** Parent with higher AGI\n4. **If non-parents:** Highest AGI\n\n**Only one taxpayer can claim each dependent!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Qualifying Child: CARES (Close, Age, Residency, Eliminate joint return, Support)",
            "QC age: Under 19 (or 24 if student, any if disabled)",
            "QC support: Child can't provide MORE than half own support",
            "Qualifying Relative: Support, Income, Not QC, Related/Household",
            "QR income: Must be below $5,050 (2024)",
            "QR support: YOU must provide MORE than half",
            "Scholarships: Not counted for support test"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-010',
    section: 'REG',
    courseId: 'cpa',
    title: "Child Tax Credit",
    description: "Master the Child Tax Credit and its refundable component",
    order: 28,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Credits"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Child Tax Credit is one of the most valuable family tax benefits! Understanding the credit amount, age requirements, phase-outs, and refundable portion is essential for REG and for serving clients with children!"
        },
        {
          title: 'Basic Child Tax Credit',
          type: 'text',
          content: "**Credit per qualifying child:**\n\n• **$2,000** per qualifying child under 17\n• **$500** credit for other dependents (not under 17 or not qualifying child)\n\n**Refundable portion:**\n• Up to $1,700 (2024) is refundable as Additional CTC\n• Requires earned income of at least $2,500"
        },
        {
          title: 'Qualifying Child Requirements',
          type: 'text',
          content: "**For Child Tax Credit:**\n\n• Under age 17 at end of year\n• Your qualifying child (meets CARES test)\n• U.S. citizen, national, or resident alien\n• Has valid SSN (not ITIN or ATIN)\n\n**Age 17 = No CTC (but may get $500 other dependent credit)**"
        },
        {
          title: '🧠 Memory Aid: CTC Requirements',
          type: 'callout',
          content: "**\"YOUNG\"** child gets CTC:\n\n**Y**ounger than 17\n**O**wn qualifying child\n**U**S citizen/national/resident\n**N**umber needed (valid SSN)\n**G**ets $2,000 credit\n\n**17+ = Other dependent credit only ($500)**"
        },
        {
          title: 'Phase-Out Thresholds',
          type: 'table',
          headers: ['Filing Status', 'Phase-Out Begins', 'Reduction'],
          rows: [
            ['Single', '$200,000', '$50 per $1,000 over'],
            ['Married Filing Jointly', '$400,000', '$50 per $1,000 over'],
            ['Head of Household', '$200,000', '$50 per $1,000 over']
          ]
        },
        {
          title: 'Additional Child Tax Credit (Refundable)',
          type: 'text',
          content: "**Refundable portion for those with earned income:**\n\n• Up to $1,700 per child (2024)\n• Calculated as 15% of earned income over $2,500\n• Allows credit even with no tax liability\n\n**Example:**\n• Earned income: $30,000\n• 15% × ($30,000 - $2,500) = $4,125\n• Refundable portion limited to $1,700 per child"
        },
        {
          title: '⚠️ Exam Trap: SSN Requirement',
          type: 'warning',
          content: "**Child must have valid SSN!**\n\n**ITIN (Individual Taxpayer ID Number):**\n• Does NOT qualify for CTC\n• Child can still be dependent\n• Can get $500 other dependent credit\n\n**Adopted child:**\n• ATIN (Adoption TIN) = No CTC until SSN issued\n\n**No SSN = No $2,000 credit!**"
        },
        {
          title: 'Other Dependent Credit',
          type: 'text',
          content: "**$500 credit for other dependents:**\n\n• Qualifying relatives\n• Children 17 or older\n• Children with ITIN (not SSN)\n\n**NOT refundable** (unlike CTC)\n\n**Same phase-out thresholds as CTC**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CTC: $2,000 per qualifying child under 17",
            "Must have valid SSN (not ITIN) for $2,000 credit",
            "Up to $1,700 refundable (Additional CTC)",
            "Phase-out: $200,000 (single), $400,000 (MFJ)",
            "Reduction: $50 per $1,000 over threshold",
            "Other dependents: $500 (non-refundable)",
            "Requires earned income of $2,500+ for refundable portion"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-011',
    section: 'REG',
    courseId: 'cpa',
    title: "Earned Income Credit",
    description: "Understand the refundable credit for low-income workers",
    order: 29,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Credits"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Earned Income Credit (EIC) is the largest anti-poverty program delivered through the tax code! It's fully refundable and can provide thousands of dollars. Understanding eligibility rules and the phase-out is essential!"
        },
        {
          title: 'Basic EIC Structure',
          type: 'text',
          content: "**Refundable credit for low-income workers:**\n\n• Based on earned income\n• Increases with number of qualifying children\n• Phases in, plateaus, then phases out\n• Requires valid SSN for taxpayer, spouse, and children\n\n**Maximum EIC (2024):**\n• 0 children: ~$632\n• 1 child: ~$4,213\n• 2 children: ~$6,960\n• 3+ children: ~$7,830"
        },
        {
          title: 'Earned Income Requirement',
          type: 'text',
          content: "**Must have earned income:**\n\n**Earned income includes:**\n• Wages, salaries, tips\n• Self-employment income\n• Union strike benefits\n\n**NOT earned income:**\n• Interest, dividends\n• Pensions, Social Security\n• Unemployment compensation\n• Alimony"
        },
        {
          title: '🧠 Memory Aid: EIC Requirements',
          type: 'callout',
          content: "**\"EARNS IT\"** for EIC:\n\n**E**arned income required\n**A**GI limits apply\n**R**efundable (even with no tax)\n**N**o excess investment income (>$11,600)\n**S**SN required (valid)\n\n**I**ncome phases out\n**T**axpayer must be US citizen/resident"
        },
        {
          title: 'Income Limits (2024 Approximate)',
          type: 'table',
          headers: ['Children', 'Single/HOH', 'MFJ'],
          rows: [
            ['0', '~$18,600', '~$25,500'],
            ['1', '~$49,100', '~$56,000'],
            ['2', '~$55,800', '~$62,700'],
            ['3+', '~$59,900', '~$66,800']
          ]
        },
        {
          title: 'Investment Income Limit',
          type: 'text',
          content: "**Investment income cannot exceed ~$11,600 (2024)**\n\n**Investment income includes:**\n• Interest\n• Dividends\n• Capital gains\n• Royalties\n• Rental income (passive)\n\n**Exceed limit = NO EIC!**"
        },
        {
          title: '⚠️ Exam Trap: MFS Not Allowed',
          type: 'warning',
          content: "**Married Filing Separately = NO EIC!**\n\n**Other disqualifications:**\n• Non-resident alien\n• Filing Form 2555 (foreign earned income)\n• Investment income over limit\n• Being qualifying child of another\n• No valid SSN\n\n**MFS is automatic disqualifier!**"
        },
        {
          title: 'Qualifying Child for EIC',
          type: 'text',
          content: "**Same basic tests as dependency, plus:**\n\n• Must have valid SSN\n• Must be younger than 19 (or 24 if student)\n• Must have lived with you more than half year\n\n**Different from dependency:**\n• No support test for EIC!\n• Child's income doesn't matter (for EIC purposes)"
        },
        {
          title: 'Due Diligence Requirements',
          type: 'text',
          content: "**Tax preparers must complete Form 8867:**\n\n• Document eligibility\n• Knowledge requirements\n• Interview questions asked\n• Records maintained\n\n**Penalty for failure:** $560 per failure (2024)\n\n**Applies to EIC, CTC, AOTC, and HOH status**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "EIC is fully refundable credit for low-income workers",
            "Requires earned income (wages, SE income)",
            "Maximum credit increases with qualifying children",
            "Investment income cannot exceed ~$11,600",
            "MFS filing status = NO EIC",
            "Valid SSN required for taxpayer and all claimed",
            "Preparer due diligence required (Form 8867)"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-012',
    section: 'REG',
    courseId: 'cpa',
    title: "Education Credits: AOTC & LLC",
    description: "Master the American Opportunity and Lifetime Learning Credits",
    order: 30,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Credits", "Education"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Education is expensive, but tax credits help! The AOTC and LLC can provide significant tax savings. Understanding which credit to choose, income limits, and qualified expenses is essential for REG and client service!"
        },
        {
          title: 'Two Education Credits',
          type: 'table',
          headers: ['Feature', 'AOTC', 'LLC'],
          rows: [
            ['Maximum credit', '$2,500', '$2,000'],
            ['Refundable', '40% ($1,000)', 'No'],
            ['Years available', 'First 4 years', 'Unlimited'],
            ['Enrollment', 'At least half-time', 'One or more courses'],
            ['Felony drug?', 'Disqualifies', 'No effect']
          ]
        },
        {
          title: 'American Opportunity Tax Credit (AOTC)',
          type: 'text',
          content: "**Most generous education credit:**\n\n• 100% of first $2,000 + 25% of next $2,000\n• Maximum: $2,500 per student\n• 40% refundable (up to $1,000)\n• First 4 years of post-secondary only\n• Student must be at least half-time\n\n**Books and supplies included!**"
        },
        {
          title: '🧠 Memory Aid: AOTC vs LLC',
          type: 'callout',
          content: "**AOTC = \"A\" is for AWESOME (bigger, better)**\n\n• **A**wesome max ($2,500)\n• **A**ll 4 years (undergrad)\n• **A**ctually refundable (40%)\n\n**LLC = \"L\" is for LIFETIME**\n\n• **L**imited max ($2,000)\n• **L**ifetime availability\n• **L**ess restrictive (any courses)"
        },
        {
          title: 'Lifetime Learning Credit (LLC)',
          type: 'text',
          content: "**More flexible but smaller:**\n\n• 20% of first $10,000 in expenses\n• Maximum: $2,000 per return (not per student!)\n• Not refundable\n• Any year of education (including grad school)\n• One course qualifies\n• No felony drug conviction restriction"
        },
        {
          title: 'Income Phase-Outs (2024)',
          type: 'table',
          headers: ['Credit', 'Single Phase-Out', 'MFJ Phase-Out'],
          rows: [
            ['AOTC', '$80,000 - $90,000', '$160,000 - $180,000'],
            ['LLC', '$80,000 - $90,000', '$160,000 - $180,000']
          ]
        },
        {
          title: 'Qualified Expenses',
          type: 'text',
          content: "**Both credits:**\n• Tuition and fees\n• Books (AOTC includes course materials)\n\n**NOT qualified:**\n• Room and board\n• Transportation\n• Insurance\n• Personal expenses\n\n**Reduce expenses by:** Tax-free scholarships, employer assistance"
        },
        {
          title: '⚠️ Exam Trap: Cannot Double-Dip',
          type: 'warning',
          content: "**Cannot use same expenses for:**\n\n• Both AOTC and LLC (choose one per student)\n• Credit AND scholarship exclusion\n• Credit AND 529 distribution\n\n**Example:** $10,000 scholarship + $15,000 tuition\n• Only $5,000 eligible for credit\n• Can't claim credit on scholarship-covered expenses\n\n**Allocate expenses wisely!**"
        },
        {
          title: 'Who Can Claim',
          type: 'text',
          content: "**Credit claimed by:**\n\n• Taxpayer (for self)\n• Taxpayer (for dependent)\n• Taxpayer (for spouse if MFJ)\n\n**Student claimed as dependent:**\n• Parent claims credit\n• Student cannot claim\n\n**Independent student:**\n• Claims own credit"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AOTC: $2,500 max, 40% refundable, first 4 years only",
            "LLC: $2,000 max per return, not refundable, unlimited years",
            "AOTC requires at least half-time enrollment",
            "LLC requires only one course",
            "Both phase out at similar income levels",
            "Cannot use same expenses for both credits",
            "Reduce qualified expenses by tax-free scholarships"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-013',
    section: 'REG',
    courseId: 'cpa',
    title: "🆕 H.R. 1: Enhanced Child Tax Credit",
    description: "Understand changes to the Child Tax Credit under H.R. 1",
    order: 31,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "H.R. 1", "Credits"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "H.R. 1 includes significant changes to the Child Tax Credit! Understanding these modifications—including any enhanced amounts, age limits, and refundability provisions—is important for current tax planning!"
        },
        {
          title: 'CTC Enhancement Overview',
          type: 'text',
          content: "**Potential H.R. 1 changes:**\n\n• Increased credit amounts\n• Modified age requirements\n• Enhanced refundability\n• Adjusted phase-out thresholds\n\n**Note:** Specific provisions depend on final legislation. Review current law for exact amounts and rules."
        },
        {
          title: 'Comparison to Prior Law',
          type: 'table',
          headers: ['Feature', 'TCJA', 'H.R. 1 (Potential)'],
          rows: [
            ['Credit amount', '$2,000', 'Enhanced amount'],
            ['Refundable portion', 'Up to $1,700', 'Modified'],
            ['Phase-out (MFJ)', '$400,000', 'May adjust'],
            ['Age limit', 'Under 17', 'May modify']
          ]
        },
        {
          title: '🧠 Memory Aid: CTC Changes',
          type: 'callout',
          content: "**\"CHILD\"** benefits under H.R. 1:\n\n**C**redit amount potentially enhanced\n**H**igher refundable portion possible\n**I**ncome thresholds may adjust\n**L**ooser or tighter rules depending on provision\n**D**ependent requirements continue\n\n**Watch for legislative updates!**"
        },
        {
          title: 'Refundability Provisions',
          type: 'text',
          content: "**Key consideration:**\n\n• Refundable portion helps low-income families\n• Additional CTC (ACTC) allows refund\n• Earned income requirements may apply\n• Maximum refundable amount matters\n\n**Enhanced refundability = More benefit for lower-income families**"
        },
        {
          title: 'Impact on Tax Planning',
          type: 'text',
          content: "**Considerations:**\n\n• Plan around phase-out thresholds\n• Consider timing of income\n• SSN requirements likely continue\n• Withholding adjustments may be needed\n\n**Work with current numbers but watch for changes**"
        },
        {
          title: '⚠️ Exam Trap: Stay Current',
          type: 'warning',
          content: "**H.R. 1 provisions may be temporary!**\n\n• Check effective dates\n• Note sunset provisions\n• Understand transition rules\n• Prior law may return after expiration\n\n**Exam will test law in effect for testing window**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "H.R. 1 potentially enhances Child Tax Credit",
            "Credit amount and refundability may increase",
            "SSN requirements likely continue",
            "Phase-out thresholds may be modified",
            "Check current law for specific provisions",
            "Temporary provisions may have sunset dates",
            "Plan based on actual enacted legislation"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-014',
    section: 'REG',
    courseId: 'cpa',
    title: "Basis Determination",
    description: "Master the rules for determining tax basis in property",
    order: 32,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Property Tax", "Basis"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Basis is fundamental to gain/loss calculations! Whether property is purchased, inherited, or received as a gift, the basis rules differ. Getting basis wrong means calculating the wrong gain or loss. Master these rules for REG!"
        },
        {
          title: 'What is Basis?',
          type: 'text',
          content: "**Basis = Your investment in property**\n\n**Used to calculate:**\n• Gain or loss on sale (Amount realized - Basis = Gain/Loss)\n• Depreciation\n• Depletion\n\n**General rule:** Cost basis = What you paid"
        },
        {
          title: 'Purchased Property',
          type: 'text',
          content: "**Cost basis includes:**\n\n• Purchase price\n• Sales tax\n• Freight/delivery charges\n• Installation costs\n• Legal fees (related to purchase)\n• Commissions paid\n\n**Adjustments to basis:**\n• + Improvements (increase basis)\n• − Depreciation allowed/allowable (decrease basis)\n• − Casualty loss deductions"
        },
        {
          title: '🧠 Memory Aid: Basis by Acquisition',
          type: 'callout',
          content: "**\"GIPsy\"** for basis rules:\n\n**G**ift = Carryover basis (generally)\n**I**nheritance = FMV at death (stepped up/down)\n**P**urchase = Cost\n**S**ubstituted = Special rules (like-kind, etc.)\n\n**How you GET it determines BASIS!**"
        },
        {
          title: 'Inherited Property',
          type: 'text',
          content: "**Stepped-up (or down) basis:**\n\n• Basis = FMV at date of death\n• OR FMV on alternate valuation date (6 months later)\n\n**Holding period:** Always LONG-TERM (regardless of how long held)\n\n**Exception:** Income in respect of decedent (IRD) items don't get step-up"
        },
        {
          title: 'Gifted Property',
          type: 'table',
          headers: ['FMV vs Donor Basis', 'Recipient Basis'],
          rows: [
            ['FMV ≥ Donor basis', 'Carryover basis (donor\'s basis)'],
            ['FMV < Donor basis (loss)', 'For gain: Donor basis; For loss: FMV'],
            ['Sale between (double basis)', 'No gain, no loss']
          ]
        },
        {
          title: 'Gift Basis Rules',
          type: 'text',
          content: "**Gift when FMV < Donor basis:**\n\n• Creates \"double basis\" situation\n• Basis for GAIN = Donor's basis\n• Basis for LOSS = FMV at gift date\n• Sale price between = No gain or loss\n\n**Example:** Donor basis $10,000, FMV $6,000\n• Sale at $8,000 = No gain, no loss\n• Sale at $12,000 = $2,000 gain ($12K - $10K)\n• Sale at $4,000 = $2,000 loss ($6K - $4K)"
        },
        {
          title: '⚠️ Exam Trap: Gift Tax Added to Basis',
          type: 'warning',
          content: "**Gift tax paid by donor adds to basis!**\n\n• Add portion of gift tax attributable to appreciation\n• Only if FMV > Donor's basis at gift time\n\n**Formula:**\n(FMV - Donor's basis) / FMV × Gift tax paid\n\n**Don't add ALL gift tax—only appreciation portion!**"
        },
        {
          title: 'Stock Basis Issues',
          type: 'text',
          content: "**Stock splits/dividends:**\n• Same total basis, spread over more shares\n• Per-share basis decreases\n\n**Stock purchases at different times:**\n• FIFO (default) or specific identification\n• Average cost for mutual funds\n\n**Wash sales:**\n• Add disallowed loss to new stock basis"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Purchased property: Basis = Cost + acquisition expenses",
            "Inherited property: FMV at death (stepped up/down)",
            "Inherited property: Always long-term holding",
            "Gifted property: Generally carryover basis",
            "Gift with built-in loss: Double basis rules",
            "Improvements increase basis; Depreciation decreases basis",
            "Gift tax paid can increase donee's basis"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-015',
    section: 'REG',
    courseId: 'cpa',
    title: "Capital Gains & Losses",
    description: "Master the taxation of capital gains and losses",
    order: 33,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Property Tax", "Capital Gains"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Capital gains taxation is a cornerstone of tax planning! Long-term gains get preferential rates while losses have limitations. Understanding the rules, netting process, and $3,000 deduction limit is essential for REG!"
        },
        {
          title: 'Capital Asset Definition',
          type: 'text',
          content: "**Capital asset = Property EXCEPT:**\n\n• Inventory or stock in trade\n• Property held primarily for sale to customers\n• Depreciable/real property used in business (§1231)\n• Accounts/notes receivable from business\n• Supplies used in business\n• Certain copyrights, artistic works\n\n**\"Capital assets = Investment property\"** (generally)"
        },
        {
          title: 'Holding Period',
          type: 'table',
          headers: ['Period', 'Classification', 'Tax Rate'],
          rows: [
            ['≤ 1 year', 'Short-term', 'Ordinary rates (up to 37%)'],
            ['> 1 year', 'Long-term', 'Preferential (0%, 15%, 20%)']
          ]
        },
        {
          title: '🧠 Memory Aid: Capital Gain Rates',
          type: 'callout',
          content: "**\"0-15-20\"** for long-term capital gains:\n\n**0%** = Below certain threshold (~$47,025 single)\n**15%** = Middle income (most taxpayers)\n**20%** = High income (>$518,900 single)\n\n**Plus 3.8% NIIT** if income over $200K/$250K!\n\n**Short-term = Ordinary rates (no preference)**"
        },
        {
          title: 'Capital Gain Netting Process',
          type: 'text',
          content: "**Step 1:** Net ST gains and ST losses\n**Step 2:** Net LT gains and LT losses\n**Step 3:** Net the nets\n\n**Results:**\n• Net LT gain = Preferential rates\n• Net ST gain = Ordinary rates\n• Net loss = Deductible up to $3,000 ($1,500 MFS)"
        },
        {
          title: 'Capital Loss Limitation',
          type: 'text',
          content: "**Net capital loss:**\n\n• Deductible up to **$3,000** per year\n• Excess carries forward indefinitely\n• Retains character (ST or LT)\n• MFS: $1,500 limit\n\n**Use ST losses against ST gains first, then ordinary income**"
        },
        {
          title: 'Collectibles and Section 1202 Stock',
          type: 'text',
          content: "**Special rates apply:**\n\n**Collectibles (art, coins, antiques):**\n• Maximum 28% rate on gains\n\n**Section 1202 QSBS (Qualified Small Business Stock):**\n• Exclusion of 50%, 75%, or 100% of gain\n• Must hold 5+ years\n• Original issuance from qualified C corp"
        },
        {
          title: '⚠️ Exam Trap: Wash Sale Rule',
          type: 'warning',
          content: "**Cannot deduct loss if buy substantially identical stock within 30 days!**\n\n**Wash sale:**\n• Sell stock at loss\n• Buy same stock within 30 days before OR after\n• Loss disallowed\n• Add disallowed loss to new stock basis\n\n**61-day window (30 before + sale + 30 after)**"
        },
        {
          title: 'Net Investment Income Tax (NIIT)',
          type: 'text',
          content: "**3.8% additional tax on:**\n\n• Investment income (including capital gains)\n• Lesser of: Net investment income OR excess MAGI\n\n**Thresholds:**\n• Single: $200,000\n• MFJ: $250,000\n\n**High earners may pay 23.8% on LTCG (20% + 3.8%)**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Capital assets: Generally investment property",
            "Long-term (>1 year): 0%, 15%, or 20% rates",
            "Short-term (≤1 year): Ordinary income rates",
            "Net losses: Deductible up to $3,000/year",
            "Excess losses carry forward indefinitely",
            "Wash sale: No loss if repurchase within 30 days",
            "NIIT: 3.8% on investment income above thresholds"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-016',
    section: 'REG',
    courseId: 'cpa',
    title: "Section 1231 Assets & Recapture",
    description: "Understand the taxation of business property sales",
    order: 34,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Property Tax", "Section 1231"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Section 1231 gives taxpayers the best of both worlds—gains get capital treatment, losses get ordinary treatment! But watch out for depreciation recapture. This complex area is heavily tested on REG!"
        },
        {
          title: 'Section 1231 Property',
          type: 'text',
          content: "**Depreciable property and real property used in business:**\n\n• Held more than one year\n• Used in trade or business\n• Not inventory or held for sale\n\n**Examples:**\n• Machinery and equipment\n• Buildings\n• Land used in business\n• Timber, coal, iron ore"
        },
        {
          title: 'Section 1231 Netting',
          type: 'text',
          content: "**Net all §1231 gains and losses:**\n\n**Net GAIN:**\n• Treated as long-term capital gain (preferential rate)\n\n**Net LOSS:**\n• Treated as ordinary loss (fully deductible)\n\n**Best of both worlds!**"
        },
        {
          title: '🧠 Memory Aid: 1231 \"Hotchpot\"',
          type: 'callout',
          content: "**\"1231 HOTCHPOT\"** rule:\n\n**H**eld more than one year\n**O**rdinary loss if net loss\n**T**rade or business property\n**C**apital gain if net gain\n**H**otchpot all together\n**P**roperty (not inventory)\n**O**nly depreciable/real property\n**T**ax benefits both ways!"
        },
        {
          title: 'Section 1245 Recapture',
          type: 'text',
          content: "**Depreciation recapture on personal property:**\n\n• Gain taxed as ORDINARY income to extent of depreciation taken\n• Remaining gain = §1231 gain\n\n**Example:**\n• Purchased equipment: $100,000\n• Depreciation taken: $60,000\n• Adjusted basis: $40,000\n• Sold for: $80,000\n• §1245 ordinary income: $40,000 (depreciation)\n• §1231 gain: $0"
        },
        {
          title: 'Section 1250 Recapture',
          type: 'text',
          content: "**Depreciation recapture on real property:**\n\n**Pre-1987 property:**\n• Recapture excess depreciation over straight-line\n\n**Post-1986 property (straight-line only):**\n• No §1250 recapture (but \"unrecaptured\" rules apply)\n\n**Unrecaptured §1250 gain:**\n• Taxed at 25% maximum rate\n• Applies to straight-line depreciation on real property"
        },
        {
          title: 'Recapture Comparison',
          type: 'table',
          headers: ['Factor', 'Section 1245', 'Section 1250'],
          rows: [
            ['Property type', 'Personal property', 'Real property'],
            ['Recapture', 'ALL depreciation', 'Excess over straight-line'],
            ['Rate on recapture', 'Ordinary (up to 37%)', 'Unrecaptured: 25% max'],
            ['Examples', 'Equipment, vehicles', 'Buildings']
          ]
        },
        {
          title: '⚠️ Exam Trap: 5-Year Lookback Rule',
          type: 'warning',
          content: "**§1231 gains recharacterized as ordinary if:**\n\n• Net §1231 losses in prior 5 years were treated as ordinary\n• Recapture prevents \"cherry picking\"\n\n**Example:**\n• Year 1: Net §1231 loss of $10,000 (ordinary deduction)\n• Year 3: Net §1231 gain of $15,000\n• $10,000 treated as ordinary (recapture)\n• $5,000 treated as LTCG"
        },
        {
          title: 'Calculating Gain on Sale',
          type: 'text',
          content: "**Order of gain recognition:**\n\n1. **§1245 recapture** (ordinary) - Up to depreciation taken\n2. **§1250 recapture** (ordinary) - Excess depreciation\n3. **Unrecaptured §1250** (25%) - Remaining straight-line\n4. **§1231 gain** (LTCG) - Balance\n\n**Always recapture depreciation first!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "§1231 property: Business property held >1 year",
            "Net §1231 gain = Capital gain; Net loss = Ordinary loss",
            "§1245: Recapture ALL depreciation as ordinary (personal property)",
            "§1250: Recapture excess depreciation (real property)",
            "Unrecaptured §1250: 25% max rate on straight-line depreciation",
            "5-year lookback: Prior ordinary losses recaptured from gains",
            "Always apply recapture rules before §1231 treatment"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-017',
    section: 'REG',
    courseId: 'cpa',
    title: "Like-Kind Exchanges (Section 1031)",
    description: "Master tax-deferred exchanges of real property",
    order: 35,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Property Tax", "Like-Kind Exchange"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Section 1031 allows deferral of gain on real property exchanges! This powerful tool lets investors swap properties without immediate tax. Understanding the rules—especially TCJA changes—is essential for REG and real estate advising!"
        },
        {
          title: 'Basic Requirements',
          type: 'text',
          content: "**Section 1031 requirements:**\n\n• Exchange of REAL PROPERTY only (post-TCJA)\n• Held for investment or business use\n• Like-kind for like-kind (broad definition)\n• Not property held for sale (inventory)\n\n**TCJA eliminated:** Personal property exchanges (equipment, vehicles, art)"
        },
        {
          title: 'Like-Kind Definition',
          type: 'text',
          content: "**Real property is broadly like-kind:**\n\n✓ Rental house for apartment building\n✓ Raw land for office building\n✓ Commercial building for industrial property\n\n✗ US property for foreign property (NOT like-kind)\n✗ Real property for personal property\n\n**Nature/character matters, not grade/quality**"
        },
        {
          title: '🧠 Memory Aid: 1031 Exchange',
          type: 'callout',
          content: "**\"DEFER\"** in 1031:\n\n**D**eferral (not exclusion)\n**E**xchange required (not sale/purchase)\n**F**orty-five days to identify\n**E**ighty (180) days to close\n**R**eal property only (post-TCJA)\n\n**Gain is DEFERRED, not eliminated!**"
        },
        {
          title: 'Timing Requirements',
          type: 'table',
          headers: ['Deadline', 'Requirement'],
          rows: [
            ['45 days', 'Identify replacement property (up to 3 properties)'],
            ['180 days', 'Receive replacement property'],
            ['Tax return due', 'Cannot exceed unextended due date']
          ]
        },
        {
          title: 'Boot and Gain Recognition',
          type: 'text',
          content: "**Boot = Non-like-kind property received:**\n\n• Cash\n• Net mortgage relief\n• Other property\n\n**Gain recognized:** Lesser of gain realized OR boot received\n\n**Loss:** Never recognized in like-kind exchange"
        },
        {
          title: 'Basis Calculation',
          type: 'text',
          content: "**Basis in new property:**\n\nFMV of new property\n− Deferred gain\n= Basis in new property\n\n**Alternative formula:**\nOld property basis\n+ Boot paid\n+ Gain recognized\n− Boot received\n= New property basis"
        },
        {
          title: '⚠️ Exam Trap: Mortgage Boot',
          type: 'warning',
          content: "**Net mortgage relief = Boot received!**\n\n**Example:**\n• Give up property with $200K mortgage\n• Receive property with $150K mortgage\n• Net relief: $50K = Boot received\n\n**Can offset by paying additional cash**\n\n**Net mortgage relief triggers gain recognition!**"
        },
        {
          title: 'Related Party Rules',
          type: 'text',
          content: "**Special rules for related parties:**\n\n• If either party disposes within 2 years\n• Gain is recognized (deferred gain accelerated)\n\n**Related parties:**\n• Family members\n• Controlled entities (>50%)\n\n**Exceptions:** Death, involuntary conversion"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "§1031 applies only to REAL property (post-TCJA)",
            "Must be investment or business property",
            "45 days to identify; 180 days to close",
            "Boot received = Gain recognized (up to realized gain)",
            "Mortgage relief is boot (triggers gain)",
            "Basis in new property = Old basis + gain recognized − boot received",
            "Related party 2-year holding requirement"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-018',
    section: 'REG',
    courseId: 'cpa',
    title: "Home Sale Exclusion (Section 121)",
    description: "Master the exclusion for gain on sale of principal residence",
    order: 36,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Property Tax", "Home Sale"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The home sale exclusion is one of the most generous tax benefits available! Up to $500,000 of gain can be excluded tax-free. Understanding ownership/use tests and exceptions is essential for REG and for advising homeowners!"
        },
        {
          title: 'Basic Exclusion Amounts',
          type: 'text',
          content: "**Maximum exclusion:**\n\n• **Single:** $250,000\n• **Married Filing Jointly:** $500,000\n\n**Requirements:**\n• Owned for at least 2 years\n• Used as principal residence for at least 2 years\n• 2-year period is in the 5 years before sale\n• Haven't used exclusion in past 2 years"
        },
        {
          title: 'Ownership and Use Tests',
          type: 'table',
          headers: ['Test', 'Requirement'],
          rows: [
            ['Ownership', '2 of 5 years before sale'],
            ['Use', '2 of 5 years as principal residence'],
            ['Both required', 'Don\'t need to be same 2 years'],
            ['Frequency', 'Generally once every 2 years']
          ]
        },
        {
          title: '🧠 Memory Aid: Section 121',
          type: 'callout',
          content: "**\"2-5-250\"** for home sale:\n\n**2** years ownership + use required\n**5** year lookback period\n**250**K excluded (single) / 500K (MFJ)\n\n**2 in 5 = $250K free!**"
        },
        {
          title: 'MFJ $500,000 Exclusion',
          type: 'text',
          content: "**To get full $500,000:**\n\n• Either spouse meets ownership test\n• BOTH spouses meet use test\n• Neither excluded gain in past 2 years\n\n**If one spouse doesn't qualify:**\n• Only $250,000 exclusion"
        },
        {
          title: 'Reduced Exclusion',
          type: 'text',
          content: "**Partial exclusion if fail due to:**\n\n• Work relocation (50+ miles)\n• Health issues\n• Unforeseen circumstances\n\n**Calculate:**\n(# months qualifying / 24) × Max exclusion\n\n**Example:** Lived 18 months, relocated for work\n(18/24) × $250,000 = $187,500 exclusion"
        },
        {
          title: '⚠️ Exam Trap: Depreciation Recapture',
          type: 'warning',
          content: "**If home was used for business:**\n\n• Depreciation taken is NOT excluded\n• Must recapture depreciation as gain\n• Subject to 25% unrecaptured §1250 rate\n\n**Example:** Home office depreciation $10,000\n• Even if gain is $200,000 (under exclusion)\n• $10,000 still taxable as recapture!\n\n**Exclusion doesn't cover depreciation!**"
        },
        {
          title: 'Non-Qualified Use',
          type: 'text',
          content: "**Post-2008 acquisitions:**\n\n• Periods of non-qualified use reduce exclusion\n• Non-qualified = Not principal residence\n\n**Allocate gain:**\n(Non-qualified use / Total ownership) × Gain = Non-excludable\n\n**Exceptions:** Temporary absence, military deployment"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Exclusion: $250,000 (single), $500,000 (MFJ)",
            "Must own AND use for 2 of 5 years before sale",
            "Both spouses must meet use test for $500K exclusion",
            "Reduced exclusion for work, health, unforeseen circumstances",
            "Cannot use exclusion more than once every 2 years",
            "Depreciation recapture NOT excluded (home office)",
            "Non-qualified use periods reduce exclusion proportionally"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-019',
    section: 'REG',
    courseId: 'cpa',
    title: "Above-the-Line Deductions",
    description: "Master adjustments to income that reduce AGI",
    order: 37,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Deductions"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Above-the-line deductions (adjustments to income) are valuable because EVERYONE can claim them—regardless of whether you itemize! These reduce AGI, which can unlock other tax benefits. Know these cold for REG!"
        },
        {
          title: 'What are Above-the-Line Deductions?',
          type: 'text',
          content: "**Deductions subtracted from gross income to arrive at AGI:**\n\n• Available to ALL taxpayers (itemizers AND standard deduction)\n• Listed on Schedule 1 (Form 1040)\n• Reduce AGI, which affects many other calculations\n\n**AGI affects:** Medical deduction floor, passive loss limits, IRA deduction, education credits"
        },
        {
          title: 'Common Above-the-Line Deductions',
          type: 'table',
          headers: ['Deduction', 'Limit'],
          rows: [
            ['Educator expenses', '$300 per educator'],
            ['Self-employment tax', '50% of SE tax paid'],
            ['Self-employed health insurance', '100% of premiums'],
            ['Self-employed retirement', 'Contribution limits apply'],
            ['Student loan interest', '$2,500 (phaseout applies)'],
            ['HSA contributions', '$4,150 single / $8,300 family (2024)'],
            ['Traditional IRA contributions', '$7,000 ($8,000 if 50+)'],
            ['Alimony paid (pre-2019 divorces)', 'Amount paid']
          ]
        },
        {
          title: '🧠 Memory Aid: Above-the-Line',
          type: 'callout',
          content: "**\"SHEA\" deductions:**\n\n**S**elf-employment (tax, health, retirement)\n**H**SA contributions\n**E**ducator expenses\n**A**limony (pre-2019 only)\n\n**Plus: Student loan interest, IRA contributions**"
        },
        {
          title: 'Self-Employment Deductions',
          type: 'text',
          content: "**Three key SE deductions:**\n\n1. **50% of SE tax** - Deduct half of 15.3% paid\n2. **SE health insurance** - 100% of premiums for self and family\n3. **SE retirement** - SEP, SIMPLE, Solo 401(k)\n\n**Health insurance limit:** Cannot exceed net SE income\n\n**Retirement limit:** Based on plan type and income"
        },
        {
          title: 'Student Loan Interest',
          type: 'text',
          content: "**Deduction for interest on qualified education loans:**\n\n• Maximum: $2,500 per year\n• Available even if you don't itemize\n• Loan must be for taxpayer, spouse, or dependent\n• Phaseout based on MAGI\n\n**2024 phaseout:**\n• Single: $80,000-$95,000\n• MFJ: $165,000-$195,000"
        },
        {
          title: 'Health Savings Account (HSA)',
          type: 'text',
          content: "**Triple tax benefit:**\n\n1. Contributions are above-the-line deduction\n2. Earnings grow tax-free\n3. Distributions for medical expenses tax-free\n\n**Requirements:**\n• Must have high-deductible health plan (HDHP)\n• Cannot be enrolled in Medicare\n• Cannot be claimed as dependent"
        },
        {
          title: '⚠️ Exam Trap: IRA Deduction Limits',
          type: 'warning',
          content: "**Traditional IRA deduction may be LIMITED if:**\n\n• Covered by employer retirement plan, AND\n• MAGI exceeds threshold\n\n**2024 phaseout (if covered):**\n• Single: $77,000-$87,000\n• MFJ: $123,000-$143,000\n\n**Spouse not covered:** Higher phaseout\n**Not covered by plan:** Full deduction allowed"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Above-the-line deductions available to ALL taxpayers",
            "Reduce AGI, which affects other tax benefits",
            "SE: 50% of SE tax, health insurance, retirement",
            "Student loan interest: Up to $2,500 (phaseout applies)",
            "HSA: Triple tax benefit (deduction, growth, distribution)",
            "IRA deduction may be limited if covered by employer plan",
            "Educator expenses: $300 per qualifying teacher"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-020',
    section: 'REG',
    courseId: 'cpa',
    title: "Itemized Deductions",
    description: "Master Schedule A deductions including SALT, mortgage interest, and charitable",
    order: 38,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Itemized Deductions"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Itemized deductions on Schedule A compete with the standard deduction! After TCJA doubled the standard deduction, fewer taxpayers itemize—but understanding the rules is still essential for tax planning and the REG exam!"
        },
        {
          title: 'Itemize or Standard Deduction?',
          type: 'text',
          content: "**2024 Standard Deduction:**\n\n• Single: $14,600\n• MFJ: $29,200\n• Head of Household: $21,900\n• Additional if 65+ or blind: $1,550-$1,950\n\n**Itemize ONLY if itemized deductions exceed standard!**"
        },
        {
          title: 'Major Itemized Deductions',
          type: 'table',
          headers: ['Category', 'Limit/Rules'],
          rows: [
            ['Medical expenses', 'Excess over 7.5% of AGI'],
            ['State and local taxes (SALT)', '$10,000 cap ($5,000 MFS)'],
            ['Mortgage interest', 'On $750,000 of acquisition debt'],
            ['Charitable contributions', '60% of AGI (cash to public charity)'],
            ['Casualty/theft losses', 'Only federally declared disasters']
          ]
        },
        {
          title: 'Medical Expenses',
          type: 'text',
          content: "**Deduct ONLY amounts exceeding 7.5% of AGI:**\n\n**Deductible:**\n• Doctor, dental, hospital bills\n• Prescription drugs\n• Health insurance premiums (not pre-tax)\n• Long-term care (with limits)\n• Medical transportation\n\n**NOT deductible:** Cosmetic surgery, gym memberships, OTC drugs"
        },
        {
          title: 'State and Local Taxes (SALT)',
          type: 'text',
          content: "**$10,000 cap on SALT deduction:**\n\n**Includes:**\n• State income tax OR sales tax (choose one)\n• Real property taxes\n• Personal property taxes\n\n**Cap:** $10,000 total ($5,000 if MFS)\n\n**H.R. 1 Note:** Cap may change after July 1, 2026"
        },
        {
          title: '🧠 Memory Aid: SALT Cap',
          type: 'callout',
          content: "**\"10K is the SALT limit\"**\n\n**S**tate income tax (OR sales)\n**A**nd\n**L**ocal property\n**T**axes\n\n**Total capped at $10,000!**\n\n**High-tax state? Hurts more.**"
        },
        {
          title: 'Mortgage Interest',
          type: 'text',
          content: "**Deductible on acquisition debt up to $750,000:**\n\n**Qualified residence:**\n• Principal residence AND\n• One other residence (vacation home)\n\n**Post-TCJA rules:**\n• No deduction for home equity interest (unless used to improve home)\n• $750,000 limit for loans after 12/15/2017\n• Pre-12/15/2017 loans: $1,000,000 limit"
        },
        {
          title: 'Charitable Contributions',
          type: 'text',
          content: "**AGI limits depend on type:**\n\n• Cash to public charity: 60% of AGI\n• Property to public charity: 30% of AGI\n• Capital gain property: 30% of AGI\n• Private foundations: 30%/20%\n\n**Excess carries forward 5 years**\n\n**Substantiation required:** Receipt for $250+ donations"
        },
        {
          title: '⚠️ Exam Trap: Charitable Property Deduction',
          type: 'warning',
          content: "**Deduction amount depends on property type:**\n\n**Capital gain property held >1 year:**\n• Deduct FMV (no gain recognized)\n• 30% AGI limit\n\n**Ordinary income property:**\n• Deduct LESSER of basis or FMV\n• Appreciation not deductible\n\n**Watch what's being donated!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Itemize only if deductions exceed standard deduction",
            "Medical: Only excess over 7.5% of AGI",
            "SALT: $10,000 cap on state/local taxes",
            "Mortgage interest: On $750,000 acquisition debt max",
            "Charitable: 60% AGI (cash), 30% AGI (property)",
            "Home equity interest not deductible (unless for improvements)",
            "Casualty losses only for federally declared disasters"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-021',
    section: 'REG',
    courseId: 'cpa',
    title: "Tax Credits: Child, Dependent Care, and Education",
    description: "Master refundable and nonrefundable individual tax credits",
    order: 39,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Tax Credits"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Tax credits are more valuable than deductions—they reduce tax dollar-for-dollar! Understanding the major credits (Child Tax Credit, EITC, education credits) is essential for REG and for serving individual tax clients!"
        },
        {
          title: 'Credits vs Deductions',
          type: 'text',
          content: "**Credits are better than deductions!**\n\n**Deduction:** Reduces taxable income\n• $1,000 deduction × 24% rate = $240 tax savings\n\n**Credit:** Reduces tax directly\n• $1,000 credit = $1,000 tax savings\n\n**Refundable credits:** Can generate refund even if no tax owed"
        },
        {
          title: 'Child Tax Credit',
          type: 'text',
          content: "**2024 amounts:**\n\n• **$2,000** per qualifying child (under 17)\n• **$500** credit for other dependents\n\n**Refundable portion:** Up to $1,700 (ACTC)\n\n**Phaseout:** $400,000 MFJ / $200,000 others\n\n**Requirements:** Child must have SSN, be US citizen/resident"
        },
        {
          title: 'Earned Income Tax Credit (EITC)',
          type: 'text',
          content: "**Refundable credit for low-moderate income workers:**\n\n**2024 maximum credit:**\n• 0 children: ~$632\n• 1 child: ~$4,213\n• 2 children: ~$6,960\n• 3+ children: ~$7,830\n\n**Must have earned income**\n**Investment income limit:** $11,600"
        },
        {
          title: '🧠 Memory Aid: EITC Requirements',
          type: 'callout',
          content: "**\"EITC needs EARNED\":**\n\n**E**arned income required\n**A**GI limits apply\n**R**esidency requirements\n**N**o excess investment income\n**E**ligible filing status\n**D**ue diligence by preparer!\n\n**Most valuable credit for low-income families**"
        },
        {
          title: 'Education Credits',
          type: 'table',
          headers: ['Feature', 'American Opportunity', 'Lifetime Learning'],
          rows: [
            ['Max credit', '$2,500 per student', '$2,000 per return'],
            ['Refundable?', '40% ($1,000)', 'No'],
            ['Years available', 'First 4 years only', 'Unlimited'],
            ['Enrollment', 'At least half-time', 'At least one course'],
            ['Felony drug?', 'Disqualifies', 'No restriction']
          ]
        },
        {
          title: 'American Opportunity Credit (AOTC)',
          type: 'text',
          content: "**For undergraduate students:**\n\n• **100%** of first $2,000 of expenses\n• **25%** of next $2,000\n• **Maximum:** $2,500 per student\n• **40% refundable** ($1,000 max)\n\n**Expenses:** Tuition, fees, books, supplies\n\n**Phaseout:** $80,000-$90,000 (single)"
        },
        {
          title: 'Child and Dependent Care Credit',
          type: 'text',
          content: "**Credit for care expenses while working:**\n\n**Eligible expenses:**\n• Up to $3,000 for one dependent\n• Up to $6,000 for two or more\n\n**Credit rate:** 20-35% based on AGI\n\n**Requirements:**\n• Child under 13 OR disabled dependent\n• Both spouses must work (or one in school)\n• Cannot use expenses claimed for FSA"
        },
        {
          title: '⚠️ Exam Trap: Preparer Due Diligence',
          type: 'warning',
          content: "**Form 8867 required for:**\n\n• Earned Income Credit\n• Child Tax Credit\n• American Opportunity Credit\n• Head of Household status\n\n**Preparer penalty: $560 per failure!**\n\n**Must ask questions and document answers!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Credits reduce tax dollar-for-dollar (better than deductions)",
            "Child Tax Credit: $2,000/child, up to $1,700 refundable",
            "EITC: Refundable credit, requires earned income",
            "AOTC: Up to $2,500, 40% refundable, first 4 years only",
            "Lifetime Learning: Up to $2,000, not refundable, unlimited years",
            "Dependent Care: 20-35% of up to $6,000 expenses",
            "Preparer due diligence required (Form 8867)"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-022',
    section: 'REG',
    courseId: 'cpa',
    title: "Filing Status and Dependents",
    description: "Determine correct filing status and dependency exemptions",
    order: 40,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Filing Status"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Filing status affects tax rates, standard deduction, and credit eligibility! Determining the correct status—especially Head of Household—is heavily tested. Understanding the qualifying child/relative tests is essential!"
        },
        {
          title: 'Five Filing Statuses',
          type: 'table',
          headers: ['Status', 'Requirements'],
          rows: [
            ['Single', 'Unmarried and don\'t qualify for other status'],
            ['Married Filing Jointly', 'Married on 12/31, both agree to file together'],
            ['Married Filing Separately', 'Married but choose to file separately'],
            ['Head of Household', 'Unmarried + maintain household for dependent'],
            ['Qualifying Surviving Spouse', 'Spouse died in prior 2 years + dependent child']
          ]
        },
        {
          title: 'Head of Household (HOH)',
          type: 'text',
          content: "**Better rates than Single! Requirements:**\n\n1. **Unmarried** on December 31 (or considered unmarried)\n2. **Paid >50%** of household costs\n3. **Qualifying person** lived with you >6 months\n\n**Qualifying persons:**\n• Qualifying child\n• Parent (doesn't have to live with you)\n• Qualifying relative who lived with you"
        },
        {
          title: '🧠 Memory Aid: HOH Requirements',
          type: 'callout',
          content: "**\"UPC\"** for Head of Household:\n\n**U**nmarried (or treated as)\n**P**aid over 50% of household\n**C**hild or qualifying person lives there\n\n**Parent is exception: Can live elsewhere but you support!**"
        },
        {
          title: 'Qualifying Child Test',
          type: 'text',
          content: "**CARES test:**\n\n• **C**lose relative (child, sibling, etc.)\n• **A**ge: Under 19, or under 24 if student, or any age if disabled\n• **R**esidency: Lived with taxpayer >6 months\n• **E**liminate: No joint return (with exceptions)\n• **S**upport: Child didn't provide >50% of own support\n\n**Must meet ALL tests**"
        },
        {
          title: 'Qualifying Relative Test',
          type: 'text',
          content: "**SUPORT test:**\n\n• **S**upport: You provide >50%\n• **U**nder gross income limit ($5,050 for 2024)\n• **P**recludes from being qualifying child\n• **O**nly citizens/residents (or N. American)\n• **R**elative OR member of household\n• **T**axpayer not claimed as dependent\n\n**No age test for qualifying relatives!**"
        },
        {
          title: 'Who Can Claim the Dependent?',
          type: 'text',
          content: "**Tiebreaker rules if multiple can claim:**\n\n1. **Parent wins** over non-parent\n2. **Longer residence** if both parents (custodial)\n3. **Higher AGI** if same residence\n4. **Noncustodial parent** if Form 8332 signed\n\n**Form 8332:** Custodial parent releases claim"
        },
        {
          title: 'Considered Unmarried',
          type: 'text',
          content: "**Married but can file HOH if:**\n\n• Lived apart from spouse last 6 months of year\n• Paid >50% of household costs\n• Home is principal residence for dependent child\n• Would file separate return\n\n**Allows better rates and HOH benefits**"
        },
        {
          title: '⚠️ Exam Trap: Claiming Child of Divorced Parents',
          type: 'warning',
          content: "**Custodial parent has priority!**\n\n**But noncustodial parent can claim:**\n• If custodial signs Form 8332\n• Noncustodial gets: Child Tax Credit, dependency\n• Custodial keeps: HOH status, EITC, Dep Care Credit\n\n**Form 8332 doesn't transfer everything!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Five statuses: Single, MFJ, MFS, HOH, QSS",
            "HOH: Unmarried + >50% household + qualifying person",
            "Qualifying child: CARES test (age, residency, support)",
            "Qualifying relative: SUPORT test (income limit applies)",
            "Tiebreaker: Parent wins, then longer residence, then higher AGI",
            "Form 8332: Release claim to noncustodial parent",
            "HOH only for dependent—not just any household member"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-023',
    section: 'REG',
    courseId: 'cpa',
    title: "Qualified Business Income Deduction (Section 199A)",
    description: "Master the 20% pass-through deduction",
    order: 41,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Individual Tax", "QBI Deduction"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Section 199A deduction can reduce effective tax rates on pass-through income by 20%! But it's complex—with income limits, SSTB rules, and W-2/property tests. This is heavily tested on REG!"
        },
        {
          title: 'Basic QBI Deduction',
          type: 'text',
          content: "**20% deduction for qualified business income:**\n\n• From pass-through entities (S corps, partnerships, sole props)\n• Or qualified REIT dividends and PTP income\n• Deducted from taxable income (below the line)\n• Not from AGI (doesn't affect AGI-based limits)\n\n**Maximum benefit:** Reduces effective rate by ~20%"
        },
        {
          title: 'Simplified Rule (Below Threshold)',
          type: 'text',
          content: "**If taxable income below threshold:**\n\n**2024 thresholds:**\n• Single: $191,950\n• MFJ: $383,900\n\n**Deduction = 20% of QBI**\n\n**No W-2/property limitations**\n**No SSTB restrictions**\n\n**Simple!**"
        },
        {
          title: 'What is QBI?',
          type: 'text',
          content: "**Qualified Business Income includes:**\n\n• Net income from qualified trade or business\n• Conducted in the US\n• Does NOT include:\n  - Capital gains/losses\n  - Interest income (unless business)\n  - Reasonable compensation (S corp)\n  - Guaranteed payments (partnership)\n  - Investment income"
        },
        {
          title: '🧠 Memory Aid: QBI Exclusions',
          type: 'callout',
          content: "**\"CRIG\" is NOT QBI:**\n\n**C**apital gains\n**R**easonable compensation (S corp wages)\n**I**nvestment income\n**G**uaranteed payments (partnership)\n\n**These are carved out of QBI!**"
        },
        {
          title: 'Specified Service Trades/Businesses (SSTB)',
          type: 'text',
          content: "**SSTBs get NO deduction above income threshold:**\n\n**SSTB includes:**\n• Health, law, accounting\n• Actuarial science, performing arts, consulting\n• Athletics, financial services, brokerage\n• Any business where principal asset is reputation/skill\n\n**Engineering and architecture are NOT SSTB!**"
        },
        {
          title: 'W-2/Property Limitation',
          type: 'text',
          content: "**Above income threshold, deduction limited to GREATER of:**\n\n**Option 1:** 50% of W-2 wages\n\n**Option 2:** 25% of W-2 wages + 2.5% of UBIA (property)\n\n**UBIA = Unadjusted Basis Immediately After Acquisition**\n\n**Capital-intensive businesses use Option 2**"
        },
        {
          title: 'Phase-In Range',
          type: 'text',
          content: "**Between threshold and threshold + $50,000/$100,000:**\n\n• Single: $191,950 - $241,950\n• MFJ: $383,900 - $483,900\n\n**Limitations phase IN:**\n• SSTB limitation phases in\n• W-2/property limitation phases in\n\n**Complex calculations in this range!**"
        },
        {
          title: '⚠️ Exam Trap: Overall Limitation',
          type: 'warning',
          content: "**QBI deduction ALSO limited to:**\n\n**Lesser of:**\n1. Combined QBI deduction (from all businesses)\n2. 20% of taxable income minus net capital gains\n\n**Cannot deduct more than 20% of taxable income!**\n\n**This is the \"overall cap\"**"
        },
        {
          title: 'Example Calculation',
          type: 'example',
          content: "**Below threshold - Simple:**\n\nTaxable income: $150,000 (MFJ)\nQBI from S corp: $80,000\n\nDeduction = $80,000 × 20% = **$16,000**\n\n**Above threshold - Limited:**\n\nTaxable income: $500,000\nQBI: $200,000\nW-2 wages: $50,000\n\nW-2 limit: $50,000 × 50% = $25,000\n20% of QBI: $200,000 × 20% = $40,000\n\nDeduction = **$25,000** (limited)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "QBI deduction: Up to 20% of qualified business income",
            "Below threshold: Simple 20% deduction, no limits",
            "Above threshold: W-2/property limitations apply",
            "SSTBs: No deduction above threshold (phases out)",
            "QBI excludes: Reasonable comp, guaranteed payments, capital gains",
            "Overall cap: Cannot exceed 20% of taxable income",
            "Engineering and architecture are NOT SSTB"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-001',
    section: 'REG',
    courseId: 'cpa',
    title: "C Corporation Formation (Section 351)",
    description: "Master tax-free incorporation rules",
    order: 37,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Entity Tax", "C Corporations"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Section 351 allows tax-free transfers to corporations! Understanding when boot triggers gain and how basis is calculated is fundamental to corporate taxation. This is heavily tested on REG!"
        },
        {
          title: 'Section 351 Requirements',
          type: 'text',
          content: "**Tax-free transfer if:**\n\n• Transfer property (not services)\n• To a corporation\n• Solely in exchange for stock\n• Transferors have 80% control immediately after\n\n**Control = 80% of voting + 80% of each class of nonvoting stock**"
        },
        {
          title: 'Control Requirement',
          type: 'text',
          content: "**\"Immediately after\" the exchange:**\n\n• All transferors combined must own ≥ 80%\n• Can include multiple transferors in same transaction\n• Prior shareholders don't count unless also transferring\n\n**Services for stock:**\n• Not property—doesn't count toward control\n• Person receiving stock for services has ordinary income"
        },
        {
          title: '🧠 Memory Aid: 351 Requirements',
          type: 'callout',
          content: "**\"PSCE\"** for tax-free incorporation:\n\n**P**roperty transferred (not services)\n**S**tock received solely\n**C**ontrol (80%) immediately after\n**E**xchange is tax-free\n\n**Property for Stock, 80% Control = Tax-free!**"
        },
        {
          title: 'Boot and Gain Recognition',
          type: 'text',
          content: "**Boot = Non-stock consideration:**\n\n• Cash\n• Debt instruments\n• Other property\n• Corporation assuming liabilities (special rules)\n\n**Gain recognized:** Lesser of:\n• Gain realized, OR\n• Boot received\n\n**Loss:** NEVER recognized in §351 exchange"
        },
        {
          title: 'Liability Assumption',
          type: 'table',
          headers: ['Scenario', 'Treatment'],
          rows: [
            ['Liabilities assumed ≤ Basis', 'No gain (not boot)'],
            ['Liabilities assumed > Basis', 'Gain recognized = Excess'],
            ['Tax avoidance purpose', 'All liabilities treated as boot']
          ]
        },
        {
          title: 'Basis Calculations',
          type: 'text',
          content: "**Shareholder's basis in stock:**\n\nBasis of property transferred\n+ Gain recognized\n− Boot received\n− Liabilities assumed by corp\n= Stock basis\n\n**Corporation's basis in property:**\n\nTransferor's basis\n+ Gain recognized by transferor\n= Corporate basis"
        },
        {
          title: '⚠️ Exam Trap: Services vs. Property',
          type: 'warning',
          content: "**Services for stock = ORDINARY INCOME!**\n\n**Example:**\n• A transfers $80K property for 80% stock\n• B provides $20K services for 20% stock\n\n**Result:**\n• A: Tax-free (B doesn't help with 80% control)\n• B: $20K ordinary income (FMV of stock received)\n\n**Services are compensation, not §351!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "§351: Property for stock, 80% control = Tax-free",
            "Services for stock = Ordinary income (not property)",
            "Boot received triggers gain (up to realized gain)",
            "Liabilities > Basis = Gain recognition",
            "Stock basis = Property basis + gain − boot − liabilities",
            "Corp basis = Transferor's basis + gain recognized",
            "Loss never recognized in §351 exchanges"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-002',
    section: 'REG',
    courseId: 'cpa',
    title: "C Corporation Taxable Income",
    description: "Understand corporate taxable income and rates",
    order: 38,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Entity Tax", "C Corporations"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "C corporations are separate taxable entities paying their own tax! Understanding taxable income calculations, the flat 21% rate, and special deductions like DRD is essential for REG and corporate tax practice!"
        },
        {
          title: 'Corporate Tax Rate',
          type: 'text',
          content: "**Flat 21% rate (post-TCJA)**\n\n**Corporate taxable income:**\n\nGross income\n− Deductions\n= Taxable income × 21%\n\n**No graduated rates—just flat 21%**"
        },
        {
          title: 'Key Corporate Deductions',
          type: 'table',
          headers: ['Deduction', 'Limitation'],
          rows: [
            ['Charitable contributions', '10% of taxable income (before DRD/contributions)'],
            ['Domestic Production (199A)', 'Applies to pass-through, not C corps'],
            ['Net operating losses', '80% of taxable income (post-TCJA)'],
            ['Interest expense', 'Limited to 30% of adjusted taxable income']
          ]
        },
        {
          title: 'Dividends Received Deduction (DRD)',
          type: 'text',
          content: "**Deduction for dividends from other domestic corporations:**\n\n• **<20% ownership:** 50% DRD\n• **20-79% ownership:** 65% DRD\n• **80%+ ownership:** 100% DRD (affiliated group)\n\n**Purpose:** Avoid triple taxation on corporate income"
        },
        {
          title: '🧠 Memory Aid: DRD Percentages',
          type: 'callout',
          content: "**\"50-65-100\"** for DRD:\n\n**50%** DRD = Less than 20% owned\n**65%** DRD = 20% to 79% owned\n**100%** DRD = 80%+ owned (affiliated)\n\n**More ownership = More deduction!**"
        },
        {
          title: 'DRD Limitation',
          type: 'text',
          content: "**DRD limited to taxable income:**\n\n• Cannot create or increase NOL\n• Exception: If full DRD would create NOL, take full DRD\n\n**Calculation:**\nLesser of:\n• Dividends × DRD %\n• Taxable income (before DRD) × DRD %"
        },
        {
          title: 'Organizational vs. Start-Up Costs',
          type: 'text',
          content: "**Organizational costs (forming corp):**\n• Deduct up to $5,000 (reduced if costs exceed $50K)\n• Amortize remainder over 180 months\n\n**Start-up costs (investigating/starting business):**\n• Same: $5,000 deduction + 180-month amortization\n\n**Examples:** Legal fees, incorporation fees, accounting setup"
        },
        {
          title: '⚠️ Exam Trap: Charitable Contribution Timing',
          type: 'warning',
          content: "**Accrual method corps can accrue contributions:**\n\n• Board authorizes by year-end\n• Payment made by 15th day of 4th month\n• Election to treat as current year\n\n**Still limited to 10% of taxable income!**\n\n**Calculate 10% limit BEFORE DRD and charitable deduction**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Flat 21% corporate tax rate (TCJA)",
            "DRD: 50%/65%/100% based on ownership percentage",
            "DRD limited to taxable income (unless creates NOL)",
            "Charitable contributions: 10% limit",
            "Organizational/start-up: $5K deduction + 180-month amortization",
            "NOL deduction limited to 80% of taxable income",
            "Interest expense may be limited (§163(j))"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-003',
    section: 'REG',
    courseId: 'cpa',
    title: "C Corporation Distributions & E&P",
    description: "Master dividend and non-dividend distributions",
    order: 39,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Entity Tax", "C Corporations"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Corporate distributions can be dividends, return of capital, or capital gains! Understanding the E&P ordering rules determines how shareholders are taxed. This is a key REG topic for corporate transactions!"
        },
        {
          title: 'Distribution Ordering Rules',
          type: 'text',
          content: "**Distributions are taxed in order:**\n\n1. **Dividend:** To extent of E&P (current + accumulated)\n2. **Return of capital:** Reduces stock basis (tax-free)\n3. **Capital gain:** Excess after basis reduced to zero\n\n**E&P is key to determining dividend treatment!**"
        },
        {
          title: 'Earnings & Profits (E&P)',
          type: 'text',
          content: "**E&P = Corporate ability to pay dividends:**\n\n**Starts with taxable income, then adjust:**\n\n+ Tax-exempt income\n+ DRD (add back)\n+ Federal income tax (subtract)\n+ Life insurance proceeds (add)\n− Life insurance premiums (subtract)\n− Penalties and fines (subtract)\n+ Excess depreciation (timing)"
        },
        {
          title: '🧠 Memory Aid: E&P Adjustments',
          type: 'callout',
          content: "**\"ADD BACK FAKE\"** benefits:\n\n**A**dd municipal bond interest\n**D**RD added back\n**D**epreciation (use ADS)\n\n**\"SUBTRACT REAL\"** payments:\n\n**S**ubtract federal income tax\n**U**se actual depreciation (ADS)\n**B**ad deductions (penalties, etc.)\n\n**E&P = Economic earnings, not tax earnings**"
        },
        {
          title: 'Current vs. Accumulated E&P',
          type: 'table',
          headers: ['E&P Type', 'Ordering'],
          rows: [
            ['Current E&P positive', 'Dividend to extent of current first'],
            ['Accumulated E&P positive', 'Then accumulated E&P'],
            ['Both negative', 'Return of capital/capital gain'],
            ['Current positive, accumulated negative', 'Current E&P = Dividend']
          ]
        },
        {
          title: 'Property Distributions',
          type: 'text',
          content: "**Corporation distributes property (not cash):**\n\n**Corporation recognizes gain:**\n• FMV > Basis = Gain recognized\n• FMV < Basis = NO loss recognized\n\n**Shareholder receives:**\n• Amount distributed = FMV of property\n• Shareholder's basis = FMV"
        },
        {
          title: '⚠️ Exam Trap: Appreciated Property',
          type: 'warning',
          content: "**Corporation recognizes gain on appreciated property distributions!**\n\n**Example:**\n• Corp distributes land: FMV $100K, Basis $40K\n• Corp recognizes $60K gain\n• E&P increases by $60K gain\n• Distribution amount = $100K FMV\n\n**Corp can't avoid gain by distributing property!**"
        },
        {
          title: 'Constructive Dividends',
          type: 'text',
          content: "**Disguised dividends (taxable to shareholder):**\n\n• Excess compensation to shareholder-employee\n• Below-market rent to shareholder\n• Loans to shareholders with no intent to repay\n• Personal expenses paid by corp\n\n**IRS recharacterizes as dividends**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Distribution order: Dividend → Return of capital → Capital gain",
            "E&P determines dividend amount",
            "Current E&P used first, then accumulated E&P",
            "Property distribution: Corp recognizes gain (FMV > Basis)",
            "Shareholder's basis in distributed property = FMV",
            "Constructive dividends: Disguised benefits taxable",
            "No loss on distribution of depreciated property"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-004',
    section: 'REG',
    courseId: 'cpa',
    title: "Accumulated Earnings Tax",
    description: "Understand the penalty tax on excess retained earnings",
    order: 40,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Entity Tax", "C Corporations"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "C corporations can't just accumulate earnings to avoid shareholder-level tax! The Accumulated Earnings Tax (AET) penalizes improper retention. Know this anti-abuse provision for REG!"
        },
        {
          title: 'Accumulated Earnings Tax (AET)',
          type: 'text',
          content: "**20% penalty tax on:**\n\nAccumulated taxable income\n\n**Applies when:**\n• Corporation accumulates earnings\n• Beyond reasonable business needs\n• To avoid shareholder dividend tax\n\n**Intent to avoid tax is key!**"
        },
        {
          title: 'AET Credit',
          type: 'text',
          content: "**Accumulated earnings credit:**\n\n**General corporations:**\n• Greater of: $250,000 OR reasonable needs\n\n**Personal service corporations:**\n• Greater of: $150,000 OR reasonable needs\n\n**Reasonable needs:**\n• Expansion plans\n• Debt retirement\n• Working capital"
        },
        {
          title: '🧠 Memory Aid: AET',
          type: 'callout',
          content: "**\"AVOID TAX = 20% TAX\"**\n\n**A**ccumulate beyond needs\n**V**oid of business purpose\n**O**nly for shareholder benefit\n**I**ntent to dodge dividends\n**D**ouble tax now!\n\n**AET = 20% on excess accumulations**"
        },
        {
          title: 'Reasonable Business Needs',
          type: 'table',
          headers: ['Reasonable Need', 'Not Reasonable'],
          rows: [
            ['Business expansion', 'Loans to shareholders'],
            ['Working capital', 'Personal investments'],
            ['Debt repayment', 'Life insurance (key-man)'],
            ['Self-insurance', 'Stock redemptions (general)']
          ]
        },
        {
          title: '⚠️ Exam Trap: Intent Requirement',
          type: 'warning',
          content: "**AET requires tax avoidance intent!**\n\n• Burden of proof on IRS initially\n• Shifts to taxpayer if prima facie case\n• Document business needs thoroughly\n\n**Unlike PHC tax (mechanical), AET is subjective!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AET: 20% on earnings accumulated to avoid dividend tax",
            "Credit: $250,000 (or $150,000 for PSC) or reasonable needs",
            "Intent to avoid tax is required element",
            "Document reasonable business needs carefully",
            "Excess accumulations encourage dividend distributions"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-005',
    section: 'REG',
    courseId: 'cpa',
    title: "Personal Holding Company Tax",
    description: "Understand the PHC penalty tax on passive income",
    order: 41,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Entity Tax", "C Corporations"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Personal Holding Company (PHC) tax targets closely held corporations with passive income! Unlike AET, this is a mechanical test—no intent required. Know these rules for REG!"
        },
        {
          title: 'PHC Two-Part Test',
          type: 'text',
          content: "**Closely held corporation with passive income:**\n\n**Two tests:**\n1. **Stock ownership:** >50% owned by 5 or fewer individuals\n2. **Income:** ≥60% from PHC income (passive)\n\n**Both tests must be met!**"
        },
        {
          title: 'PHC Income',
          type: 'text',
          content: "**PHC income includes:**\n\n• Dividends, interest, rents, royalties\n• Annuities\n• Personal service contracts (named individual)\n• Income from estates/trusts\n\n**Rents may escape if >50% of ordinary income**"
        },
        {
          title: '🧠 Memory Aid: PHC Tests',
          type: 'callout',
          content: "**\"5-50-60\"** for PHC:\n\n**5** or fewer individuals\n**50**% stock ownership (more than)\n**60**% passive income (at least)\n\n**Meet both = PHC tax!**"
        },
        {
          title: 'PHC Tax',
          type: 'table',
          headers: ['Feature', 'PHC Tax'],
          rows: [
            ['Rate', '20%'],
            ['Applied to', 'Undistributed PHC income'],
            ['Purpose', 'Force dividend distributions'],
            ['Avoided by', 'Distributing as dividends']
          ]
        },
        {
          title: 'Deficiency Dividend',
          type: 'text',
          content: "**Relief from PHC tax:**\n\n• Corporation can pay \"deficiency dividend\"\n• Paid after IRS determination\n• Within 90 days of determination\n• Eliminates or reduces PHC tax\n\n**Not available for AET (can't cure intent retroactively)**"
        },
        {
          title: '⚠️ Exam Trap: AET vs. PHC',
          type: 'warning',
          content: "**Both are 20% but different triggers:**\n\n**AET:**\n• Intent to avoid tax (subjective)\n• Any corporation can be subject\n• Credit for reasonable needs\n\n**PHC:**\n• Mechanical tests (ownership + income)\n• Closely held + 60% passive income\n• No intent required\n\n**Deficiency dividend works for PHC only!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "PHC: Closely held (>50% by 5 or fewer) + 60% passive income",
            "PHC tax: 20% on undistributed PHC income",
            "Mechanical test—no intent required (unlike AET)",
            "Deficiency dividend can eliminate PHC tax",
            "Distribute as dividends to avoid PHC tax"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-006',
    section: 'REG',
    courseId: 'cpa',
    title: "S Corporation Eligibility & Election",
    description: "Master S corporation eligibility and election rules",
    order: 42,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Entity Tax", "S Corporations"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "S corporations provide pass-through taxation with liability protection! But strict eligibility rules apply—violate them and lose S status. Understanding requirements and election procedures is essential for REG!"
        },
        {
          title: 'S Corporation Requirements',
          type: 'text',
          content: "**To qualify as S corp:**\n\n• Domestic corporation\n• No more than 100 shareholders\n• Only eligible shareholders\n• One class of stock\n• Not an ineligible corporation\n\n**Fail any requirement = Lose S status!**"
        },
        {
          title: 'Eligible Shareholders',
          type: 'table',
          headers: ['Eligible', 'Ineligible'],
          rows: [
            ['Individuals', 'Corporations'],
            ['Estates', 'Partnerships'],
            ['Certain trusts', 'Nonresident aliens'],
            ['Tax-exempt organizations (limited)', 'Most tax-exempt entities']
          ]
        },
        {
          title: '🧠 Memory Aid: S Corp Requirements',
          type: 'callout',
          content: "**\"DISCO\"** for S corp:\n\n**D**omestic corporation\n**I**ndividuals (eligible shareholders)\n**S**ingle class of stock\n**C**ount (100 or fewer shareholders)\n**O**ne election (Form 2553)\n\n**DISCO = S corp eligibility!**"
        },
        {
          title: 'One Class of Stock',
          type: 'text',
          content: "**Only ONE class allowed:**\n\n• All shares have identical distribution rights\n• All shares have identical liquidation rights\n\n**Allowed differences:**\n• Voting vs. non-voting (still one class)\n\n**Not allowed:**\n• Preferred stock\n• Different dividend preferences"
        },
        {
          title: 'Election Timing',
          type: 'text',
          content: "**Form 2553:**\n\n**For election effective current year:**\n• By 15th day of 3rd month (March 15 for calendar year)\n• All shareholders must consent\n\n**Late election:**\n• Can file Form 2553 late with reasonable cause\n• IRS may grant relief"
        },
        {
          title: '⚠️ Exam Trap: Family as One Shareholder',
          type: 'warning',
          content: "**Family members = One shareholder:**\n\n• Spouse, children, grandchildren, parents\n• Counts as single shareholder for 100-shareholder limit\n\n**Example:**\n• Parent + spouse + 3 children = 1 shareholder\n• This allows more actual people to own S corp\n\n**Family attribution rule helps stay under 100!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "S corp: Pass-through taxation with corporate liability protection",
            "Requirements: 100 shareholders, one class stock, eligible shareholders",
            "Eligible: Individuals, estates, certain trusts (not corps or partnerships)",
            "Election: Form 2553 by 15th day of 3rd month",
            "All shareholders must consent to election",
            "Family members count as one shareholder"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-007',
    section: 'REG',
    courseId: 'cpa',
    title: "S Corporation Shareholder Basis",
    description: "Master basis calculations for S corporation shareholders",
    order: 43,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Entity Tax", "S Corporations"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Shareholder basis determines how much loss can be deducted and whether distributions are taxable! S corp basis rules differ from partnerships. Getting this right is critical for REG!"
        },
        {
          title: 'Initial Basis',
          type: 'text',
          content: "**Starting basis:**\n\n• Cash contributed\n• Property basis (not FMV)\n• Services = FMV as ordinary income\n\n**If formed under §351:**\n• Same rules as C corp formation"
        },
        {
          title: 'Basis Adjustment Order',
          type: 'text',
          content: "**Annual adjustments (in order):**\n\n1. **Increase:** Share of income items\n2. **Increase:** Separately stated income\n3. **Decrease:** Distributions\n4. **Decrease:** Non-deductible expenses\n5. **Decrease:** Separately stated losses/deductions\n6. **Decrease:** Nonseparately stated loss\n\n**Order matters for loss limitation!**"
        },
        {
          title: '🧠 Memory Aid: Basis Adjustments',
          type: 'callout',
          content: "**\"IID NN\"** for basis order:\n\n**I**ncome increases first\n**I**ncome (separately stated) increases\n**D**istributions decrease\n\n**N**on-deductible decreases\n**N**onseparately stated loss decreases\n\n**Income UP first, then expenses DOWN**"
        },
        {
          title: 'Stock Basis vs. Debt Basis',
          type: 'table',
          headers: ['Basis Type', 'Source', 'Restoration Order'],
          rows: [
            ['Stock basis', 'Investment in stock', 'Restored first'],
            ['Debt basis', 'Shareholder loans to S corp', 'Restored second'],
            ['Third-party debt', 'Bank loans', 'Does NOT increase basis']
          ]
        },
        {
          title: 'Debt Basis Rules',
          type: 'text',
          content: "**S corp debt basis:**\n\n• Only SHAREHOLDER loans to S corp\n• Third-party debt does NOT create basis\n• Different from partnerships!\n\n**When losses exceed stock basis:**\n• Can use debt basis\n• Reduces debt basis\n• Future income restores debt basis first, then stock"
        },
        {
          title: '⚠️ Exam Trap: Third-Party Debt',
          type: 'warning',
          content: "**S corps: Third-party debt = NO basis!**\n\n**Unlike partnerships:**\n• Partnership: Recourse/nonrecourse debt adds to basis\n• S corp: Only shareholder loans add to basis\n\n**Example:**\n• S corp borrows $100K from bank\n• Shareholders get NO basis increase\n• Even if shareholder guarantees the loan!\n\n**S corp debt basis = Shareholder loans ONLY**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Stock basis: Start with investment + adjustments",
            "Order: Income first → Distributions → Losses",
            "Debt basis: Only direct shareholder loans (not third-party)",
            "Third-party debt gives NO basis (unlike partnerships)",
            "Losses limited to stock basis + debt basis",
            "Income restores debt basis before stock basis"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-008',
    section: 'REG',
    courseId: 'cpa',
    title: "S Corporation Built-In Gains Tax",
    description: "Understand the tax on C-to-S conversion gains",
    order: 44,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Entity Tax", "S Corporations"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When a C corporation converts to S status, built-in gains can't escape corporate tax! The BIG tax ensures C corp appreciation is taxed at the corporate level. Understanding this anti-abuse rule is important for REG!"
        },
        {
          title: 'Built-In Gains (BIG) Tax Overview',
          type: 'text',
          content: "**Corporate-level tax on:**\n\n• Appreciation that existed when C corp became S corp\n• Recognized during the recognition period\n• At corporate rate (21%)\n\n**Purpose:** Prevent avoidance of C corp tax through conversion"
        },
        {
          title: 'Recognition Period',
          type: 'text',
          content: "**5-year recognition period:**\n\n• Starts when S election effective\n• BIG tax applies to dispositions within 5 years\n• After 5 years, no BIG tax\n\n**Net recognized built-in gain:**\n• Lesser of: Built-in gain OR taxable income"
        },
        {
          title: '🧠 Memory Aid: BIG Tax',
          type: 'callout',
          content: "**\"5 YEARS TO ESCAPE\"**\n\n**5** years recognition period\n**Y**ou pay corporate tax on BIG\n**E**lection date sets \"snapshot\"\n**A**ll appreciation at conversion date\n**R**ecognized = Taxable\n**S**ells trigger BIG (within 5 years)\n\n**Wait 5 years = Escape BIG tax!**"
        },
        {
          title: 'Calculating BIG Tax',
          type: 'table',
          headers: ['Step', 'Description'],
          rows: [
            ['1', 'Identify assets held at conversion'],
            ['2', 'Determine FMV at conversion date'],
            ['3', 'Built-in gain = FMV − Basis at conversion'],
            ['4', 'Sale within 5 years triggers BIG'],
            ['5', 'Tax at 21% corporate rate']
          ]
        },
        {
          title: '⚠️ Exam Trap: Applies to Former C Corps Only',
          type: 'warning',
          content: "**BIG tax ONLY applies if:**\n\n• Previously was C corporation\n• Converted to S corporation\n• Has built-in gains at conversion\n\n**Does NOT apply:**\n• Always been S corp\n• S corp acquiring C corp assets (different rules)\n\n**BIG tax = C-to-S conversion issue**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "BIG tax: 21% corporate tax on built-in gains",
            "Applies when C corp converts to S corp",
            "5-year recognition period from conversion",
            "Built-in gain = FMV at conversion − Basis",
            "Only affects former C corporations",
            "Avoid by holding assets 5+ years post-conversion"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-009',
    section: 'REG',
    courseId: 'cpa',
    title: "S Corporation Distributions & AAA",
    description: "Master the Accumulated Adjustments Account",
    order: 45,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Entity Tax", "S Corporations"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "AAA tracks previously taxed S corp income! When an S corp has C corp E&P (from conversion), AAA determines whether distributions are tax-free or dividends. Understanding AAA ordering is critical for REG!"
        },
        {
          title: 'What is AAA?',
          type: 'text',
          content: "**Accumulated Adjustments Account:**\n\n• Tracks previously taxed S corp income\n• Similar to basis, but at corporate level\n• Critical when S corp has C corp E&P\n\n**AAA = \"Tax-free\" distribution pool**"
        },
        {
          title: 'AAA Adjustments',
          type: 'text',
          content: "**Increase AAA:**\n• Separately stated income\n• Nonseparately stated income\n\n**Decrease AAA:**\n• Separately stated deductions/losses\n• Nonseparately stated deductions/losses\n• Distributions\n• Non-deductible expenses (not related to tax-exempt income)\n\n**Tax-exempt income: Increases OAA, not AAA**"
        },
        {
          title: '🧠 Memory Aid: AAA vs. Basis',
          type: 'callout',
          content: "**\"AAA = ALREADY TAXED\"**\n\n**A**ccumulated S corp income\n**A**lready passed through to shareholders\n**A**vailable for tax-free distribution\n\n**Key difference from basis:**\n• AAA can go negative\n• Basis cannot go below zero"
        },
        {
          title: 'Distribution Ordering (with E&P)',
          type: 'table',
          headers: ['Order', 'Source', 'Treatment'],
          rows: [
            ['1st', 'AAA', 'Tax-free (reduces basis)'],
            ['2nd', 'C corp E&P', 'Dividend (taxable)'],
            ['3rd', 'Remaining basis', 'Tax-free (return of capital)'],
            ['4th', 'Excess', 'Capital gain']
          ]
        },
        {
          title: 'No E&P = Simpler Rules',
          type: 'text',
          content: "**If S corp has NO C corp E&P:**\n\n• Distributions first reduce basis\n• Excess is capital gain\n• AAA tracking still occurs but less critical\n\n**AAA ordering critical only when C corp E&P exists!**"
        },
        {
          title: '⚠️ Exam Trap: AAA Can Go Negative',
          type: 'warning',
          content: "**Unlike shareholder basis, AAA can be negative!**\n\n**Example:**\n• AAA: $50,000\n• Losses: $80,000\n• New AAA: ($30,000)\n\n**Impact:**\n• Negative AAA = No tax-free distributions from AAA\n• Future income restores AAA before distributions"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AAA tracks previously taxed S corp income",
            "Distributions from AAA are tax-free (reduce basis)",
            "C corp E&P distributed as dividends (after AAA)",
            "AAA can go negative (unlike basis)",
            "Distribution order: AAA → E&P → Basis → Capital gain",
            "No E&P = Simpler rules (basis reduction only)"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-010',
    section: 'REG',
    courseId: 'cpa',
    title: "Partnership Formation & Contributions",
    description: "Master tax-free contributions to partnerships",
    order: 46,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Entity Tax", "Partnerships"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnership formation is generally tax-free under Section 721! Understanding when gain is recognized (services, investment partnerships) and basis calculations is fundamental for REG!"
        },
        {
          title: 'Section 721 Nonrecognition',
          type: 'text',
          content: "**General rule: No gain or loss on formation**\n\n• Transfer property to partnership\n• Receive partnership interest\n• No immediate tax\n\n**No 80% control requirement (unlike §351 corps)**"
        },
        {
          title: 'Exceptions to Nonrecognition',
          type: 'text',
          content: "**Gain recognized when:**\n\n• Services for partnership interest\n• Investment company partnership (diversification)\n• Disguised sale (distribution within 2 years)\n• Liability shifts trigger gain\n\n**Services = Ordinary income (like §351)**"
        },
        {
          title: '🧠 Memory Aid: Partnership Formation',
          type: 'callout',
          content: "**\"721 = FREE\"** (mostly):\n\n**F**ormation is tax-free\n**R**eceive interest for property\n**E**xceptions: Services, investment co.\n**E**xcept liability issues\n\n**721 easier than 351—no 80% control needed!**"
        },
        {
          title: 'Partner Basis in Partnership Interest',
          type: 'text',
          content: "**Outside basis:**\n\nBasis of property contributed\n+ Gain recognized (if any)\n+ Share of partnership liabilities\n= Partner's outside basis\n\n**Liabilities increase basis (different from S corps!)**"
        },
        {
          title: 'Partnership Basis in Contributed Property',
          type: 'text',
          content: "**Inside basis:**\n\n• Carryover basis from partner\n• Plus any gain recognized by partner\n\n**Holding period:**\n• Tacks—includes partner's holding period\n• Exception: Inventory, unrealized receivables"
        },
        {
          title: 'Liability Impact',
          type: 'table',
          headers: ['Scenario', 'Effect on Contributing Partner'],
          rows: [
            ['Property with liability', 'Deemed distribution (share shifted to others)'],
            ['Partnership assumes liability', 'Reduces contributing partner basis'],
            ['Liability > Basis', 'Gain recognized']
          ]
        },
        {
          title: '⚠️ Exam Trap: Liabilities Over Basis',
          type: 'warning',
          content: "**If liability exceeds basis = GAIN!**\n\n**Example:**\n• Contribute property: Basis $50K\n• Property has liability: $80K\n• Gain recognized: $30K ($80K − $50K)\n\n**Partnership assumes liability = Deemed distribution to partner**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "§721: Formation is generally tax-free",
            "No 80% control requirement (unlike §351)",
            "Partner basis = Property basis + liabilities assumed by partnership",
            "Partnership basis = Carryover from partner",
            "Liabilities assumed are deemed distribution to partner",
            "Liabilities > Basis = Gain recognition",
            "Services for capital interest = Ordinary income"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-011',
    section: 'REG',
    courseId: 'cpa',
    title: "Partnership Partner Basis Calculations",
    description: "Master inside and outside basis for partners",
    order: 47,
    duration: 65,
    difficulty: 'advanced',
    topics: ["Entity Tax", "Partnerships"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partner basis determines deductible losses and distribution treatment! Unlike S corps, partnership debt increases basis. Understanding inside vs. outside basis is critical for REG!"
        },
        {
          title: 'Outside vs. Inside Basis',
          type: 'text',
          content: "**Two types of basis:**\n\n**Outside basis:**\n• Partner's basis in partnership interest\n• Used for loss limitations and distribution treatment\n\n**Inside basis:**\n• Partnership's basis in its assets\n• Used for depreciation and gain/loss on sale"
        },
        {
          title: 'Initial Outside Basis',
          type: 'text',
          content: "**Partner's starting basis:**\n\nCash contributed\n+ FMV of services (if recognized)\n+ Adjusted basis of property contributed\n+ Share of partnership liabilities\n= Initial outside basis\n\n**Liabilities are key difference from S corps!**"
        },
        {
          title: '🧠 Memory Aid: Outside Basis',
          type: 'callout',
          content: "**\"CLIP\"** for outside basis:\n\n**C**ontributed property basis\n**L**iabilities (share of)\n**I**ncome increases\n**P**artnership distributions decrease\n\n**CLIP your outside basis!**"
        },
        {
          title: 'Annual Basis Adjustments',
          type: 'table',
          headers: ['Increase Basis', 'Decrease Basis'],
          rows: [
            ['Share of partnership income', 'Share of partnership losses'],
            ['Share of tax-exempt income', 'Share of non-deductible expenses'],
            ['Additional contributions', 'Distributions received'],
            ['Increase in share of liabilities', 'Decrease in share of liabilities']
          ]
        },
        {
          title: 'Liability Allocation',
          type: 'text',
          content: "**Recourse liabilities:**\n• Allocated to partners bearing economic risk of loss\n\n**Nonrecourse liabilities:**\n• Generally allocated by profit-sharing ratios\n• Minimum gain allocations may apply\n\n**All liabilities increase basis (big advantage over S corps!)**"
        },
        {
          title: '⚠️ Exam Trap: Partnership vs. S Corp Debt',
          type: 'warning',
          content: "**Partnership debt = Basis; S corp debt = NO basis**\n\n**Partnership:**\n• Bank loan → Increases partner basis\n• Can deduct losses against share of debt\n\n**S Corporation:**\n• Bank loan → NO shareholder basis\n• Only direct shareholder loans count\n\n**Huge difference for loss deductions!**"
        },
        {
          title: 'Basis Cannot Go Below Zero',
          type: 'text',
          content: "**Ordering rule prevents negative basis:**\n\n1. Increase for income\n2. Decrease for distributions\n3. Decrease for non-deductible items\n4. Decrease for losses\n\n**Excess losses suspended and carried forward**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Outside basis = Partner's basis in partnership interest",
            "Inside basis = Partnership's basis in assets",
            "ALL partnership debt increases partner basis",
            "Recourse debt: To partners with economic risk",
            "Nonrecourse debt: Generally by profit ratios",
            "Major advantage over S corps for loss deductions",
            "Losses limited to outside basis; excess carries forward"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-012',
    section: 'REG',
    courseId: 'cpa',
    title: "Partnership Allocations & Distributions",
    description: "Understand special allocations and distribution rules",
    order: 48,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Entity Tax", "Partnerships"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnerships offer flexibility to allocate income and deductions specially! But allocations must have substantial economic effect. Understanding current vs. liquidating distributions is essential for REG!"
        },
        {
          title: 'Partnership Allocations',
          type: 'text',
          content: "**How income/loss is divided:**\n\n• Generally follows partnership agreement\n• Must have \"substantial economic effect\" (SEE)\n• Otherwise, allocated by partners' interests\n\n**Flexibility is partnership's key advantage!**"
        },
        {
          title: 'Substantial Economic Effect',
          type: 'text',
          content: "**Two requirements for SEE:**\n\n1. **Economic effect:**\n   • Capital accounts maintained properly\n   • Liquidating distributions by capital accounts\n   • Deficit restoration or QIO\n\n2. **Substantiality:**\n   • Reasonable possibility allocation affects dollar amounts\n   • Not just tax shifting"
        },
        {
          title: '🧠 Memory Aid: Distributions',
          type: 'callout',
          content: "**\"CLO\"** for current distributions:\n\n**C**ash first reduces basis\n**L**oss only if cash > basis\n**O**ther property = No gain (usually)\n\n**Liquidating distributions are MORE complex!**"
        },
        {
          title: 'Current Distributions',
          type: 'table',
          headers: ['Type', 'Recognition', 'Basis Effect'],
          rows: [
            ['Cash (≤ basis)', 'No gain', 'Reduces basis'],
            ['Cash (> basis)', 'Gain = Excess', 'Basis to zero'],
            ['Property', 'No gain/loss', 'Carryover basis (limited to outside basis)'],
            ['Hot assets', 'Ordinary income possible', 'Special rules']
          ]
        },
        {
          title: 'Liquidating Distributions',
          type: 'text',
          content: "**When partner exits:**\n\n**Cash only:**\n• Gain if cash > basis\n• Loss if cash < basis\n\n**Property:**\n• Basis = Partner's remaining outside basis\n• Allocated among assets received\n\n**Loss only recognized in cash/unrealized receivables/inventory liquidations**"
        },
        {
          title: '⚠️ Exam Trap: Hot Assets (§751)',
          type: 'warning',
          content: "**Hot assets = Ordinary income!**\n\n**Hot assets include:**\n• Unrealized receivables\n• Inventory items\n• Depreciation recapture\n\n**Distribution of hot assets:**\n• May trigger ordinary income\n• Even if overall partnership has capital gain character\n\n**§751 recharacterizes gain as ordinary!**"
        },
        {
          title: 'Disguised Sales',
          type: 'text',
          content: "**Contribution + distribution = Sale?**\n\n**Presumed sale if within 2 years:**\n• Partner contributes property\n• Partner receives cash/property distribution\n• Treated as sale (not tax-free contribution)\n\n**Can rebut with facts showing legitimate business purpose**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Allocations must have substantial economic effect",
            "Current distributions: Generally no gain unless cash > basis",
            "Property distributions: Carryover basis (limited)",
            "Liquidating distributions: Gain/loss may be recognized",
            "Hot assets (§751): Ordinary income treatment",
            "Disguised sale rules: Watch 2-year period",
            "Loss on liquidation: Only for cash/inventory/receivables"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-013',
    section: 'REG',
    courseId: 'cpa',
    title: "Partnership Sales & Liquidations",
    description: "Master the tax consequences of selling partnership interests",
    order: 49,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Entity Tax", "Partnerships"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Selling a partnership interest involves complex calculations! Hot assets trigger ordinary income, and Section 754 elections affect both buyer and seller. Understanding these rules is critical for REG!"
        },
        {
          title: 'Sale of Partnership Interest',
          type: 'text',
          content: "**General rule: Capital gain/loss**\n\n**Calculation:**\nAmount realized\n− Adjusted outside basis\n= Gain or loss\n\n**Exception: Hot assets → Ordinary income**"
        },
        {
          title: 'Amount Realized',
          type: 'text',
          content: "**Amount realized includes:**\n\n• Cash received\n• FMV of property received\n• Buyer's assumption of selling partner's share of liabilities\n\n**Liabilities increase amount realized!**"
        },
        {
          title: '🧠 Memory Aid: Sale Components',
          type: 'callout',
          content: "**\"CAROL\"** for sale calculation:\n\n**C**ash received\n**A**ssumed liabilities (by buyer)\n**R**educed by basis\n**O**rdinary income for hot assets\n**L**ong-term capital gain (remainder)\n\n**Don't forget liabilities in amount realized!**"
        },
        {
          title: 'Hot Assets (§751)',
          type: 'table',
          headers: ['Hot Asset', 'Character'],
          rows: [
            ['Unrealized receivables', 'Ordinary'],
            ['Inventory items', 'Ordinary'],
            ['Depreciation recapture', 'Ordinary'],
            ['Other partnership assets', 'Capital']
          ]
        },
        {
          title: 'Section 754 Election',
          type: 'text',
          content: "**Optional adjustment to inside basis:**\n\n**Purpose:**\n• Adjust partnership's inside basis\n• To reflect buyer's purchase price\n\n**Calculations:**\n• §743(b): Transfer of interest\n• §734(b): Distribution of property\n\n**Election applies to all future transfers!**"
        },
        {
          title: '⚠️ Exam Trap: Mandatory Basis Adjustment',
          type: 'warning',
          content: "**§754 election is MANDATORY if:**\n\n• Substantial basis reduction (>$250,000)\n• Substantial built-in loss\n\n**Previously optional, now required in these situations!**\n\n**Prevents abuse by shifting losses to new partners**"
        },
        {
          title: 'Liquidation of Partnership',
          type: 'text',
          content: "**Complete liquidation:**\n\n• Partners receive liquidating distributions\n• Gain/loss recognized on cash vs. basis\n• Property takes remaining basis\n\n**Partial liquidation:**\n• Treated as distribution + redemption\n• Hot asset rules apply"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sale of interest: Generally capital gain/loss",
            "Amount realized includes assumed liabilities",
            "Hot assets (§751): Ordinary income treatment",
            "§754 election adjusts inside basis",
            "Mandatory adjustment for substantial basis reductions",
            "Liquidation: Cash vs. basis determines recognition",
            "Partnership interest sale is entity approach (not aggregate)"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-014',
    section: 'REG',
    courseId: 'cpa',
    title: "Trusts & Estates: Fiduciary Income Tax",
    description: "Understand taxation of trusts and estates",
    order: 50,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Entity Tax", "Trusts & Estates"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Trusts and estates are separate taxpayers with unique rules! Income can be taxed to the entity or beneficiaries. Understanding DNI and the distribution deduction is essential for REG!"
        },
        {
          title: 'Fiduciary Taxation Overview',
          type: 'text',
          content: "**Trusts and estates file Form 1041:**\n\n• Separate taxable entities\n• Income taxed to entity OR beneficiaries\n• Distribution deduction passes income through\n• Highly compressed tax brackets\n\n**$14,450 income = 37% bracket (2024)!**"
        },
        {
          title: 'Types of Trusts',
          type: 'table',
          headers: ['Type', 'Key Feature'],
          rows: [
            ['Simple trust', 'Must distribute all income currently'],
            ['Complex trust', 'May accumulate income or distribute corpus'],
            ['Grantor trust', 'Grantor taxed on income (ignored for tax)'],
            ['Revocable trust', 'Grantor trust until death']
          ]
        },
        {
          title: '🧠 Memory Aid: Simple vs. Complex',
          type: 'callout',
          content: "**\"SIMPLE = SIMPLE\"**\n\n**S**imple trusts\n**I**ncome distributed currently\n**M**ust distribute (no accumulation)\n**P**rincipal stays in trust\n**L**imited to income distributions\n**E**xemption: $300\n\n**COMPLEX = Everything else (and $100 exemption)**"
        },
        {
          title: 'Fiduciary Taxable Income',
          type: 'text',
          content: "**Similar to individual calculation:**\n\nGross income\n− Deductions (administration, etc.)\n− Distribution deduction\n− Personal exemption ($300 or $100)\n= Taxable income\n\n**Key: Distribution deduction flows income to beneficiaries**"
        },
        {
          title: 'Distributable Net Income (DNI)',
          type: 'text',
          content: "**DNI limits distribution deduction:**\n\n• Maximum deduction = DNI\n• Maximum taxable to beneficiaries = DNI\n• Preserves character of income\n\n**DNI = Modified taxable income of trust/estate**"
        },
        {
          title: '⚠️ Exam Trap: Compressed Brackets',
          type: 'warning',
          content: "**Trust/estate brackets hit 37% FAST!**\n\n**2024:**\n• 10%: $0 - $3,100\n• 24%: $3,100 - $11,150\n• 35%: $11,150 - $14,450\n• 37%: Over $14,450\n\n**Compare to individuals: 37% at ~$609K!**\n\n**Strong incentive to distribute income to beneficiaries**"
        },
        {
          title: 'Income in Respect of Decedent (IRD)',
          type: 'text',
          content: "**Income earned by decedent but not taxed:**\n\n• Examples: Unpaid salary, deferred comp, IRA distributions\n• No step-up in basis (exception to general rule)\n• Taxed to estate or beneficiary who receives it\n• May get deduction for estate tax paid on IRD"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Trusts/estates are separate taxpayers (Form 1041)",
            "Distribution deduction passes income to beneficiaries",
            "DNI limits both deduction and beneficiary inclusion",
            "Compressed brackets: 37% at $14,450",
            "Simple trusts: Must distribute income; $300 exemption",
            "Complex trusts: May accumulate; $100 exemption",
            "IRD: No step-up; taxed when received"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-015',
    section: 'REG',
    courseId: 'cpa',
    title: "Distributable Net Income (DNI)",
    description: "Master DNI calculations and character",
    order: 51,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Entity Tax", "Trusts & Estates"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "DNI is the ceiling for both the distribution deduction and beneficiary income! Understanding how to calculate DNI and how it preserves character is essential for fiduciary taxation on REG!"
        },
        {
          title: 'Purpose of DNI',
          type: 'text',
          content: "**DNI serves multiple purposes:**\n\n1. **Ceiling on distribution deduction** (for trust/estate)\n2. **Ceiling on beneficiary inclusion**\n3. **Preserves character** of income\n\n**DNI = Tax on either entity OR beneficiaries, not both**"
        },
        {
          title: 'DNI Calculation',
          type: 'text',
          content: "**Start with taxable income, then adjust:**\n\nTaxable income\n+ Personal exemption (add back)\n+ Net tax-exempt interest (less expenses)\n− Capital gains allocated to corpus\n+ Capital losses (if deducted)\n= Distributable Net Income"
        },
        {
          title: '🧠 Memory Aid: DNI Adjustments',
          type: 'callout',
          content: "**\"PECK\"** for DNI:\n\n**P**ersonal exemption added back\n**E**xempt interest included (net)\n**C**apital gains removed (if to corpus)\n**K**eep character of income\n\n**DNI = Economic income available to distribute**"
        },
        {
          title: 'Character of DNI',
          type: 'table',
          headers: ['DNI Component', 'Character to Beneficiary'],
          rows: [
            ['Interest income', 'Interest'],
            ['Dividend income', 'Qualified dividend'],
            ['Rental income', 'Rental'],
            ['Tax-exempt interest', 'Tax-exempt'],
            ['Capital gains (if distributed)', 'Capital gain']
          ]
        },
        {
          title: 'Tier System',
          type: 'text',
          content: "**How DNI is allocated among beneficiaries:**\n\n**Tier 1:** Required distributions (income)\n• Gets first share of DNI\n\n**Tier 2:** Discretionary distributions\n• Shares remaining DNI pro rata\n\n**Tier 1 fills first, then Tier 2**"
        },
        {
          title: '⚠️ Exam Trap: Capital Gains in DNI',
          type: 'warning',
          content: "**Capital gains are usually NOT in DNI!**\n\n**General rule:**\n• Capital gains allocated to corpus\n• Not included in DNI\n• Taxed to trust/estate\n\n**Exception:**\n• If trust document or local law allocates to income\n• If actually distributed to beneficiary\n\n**Default: Capital gains stay with trust!**"
        },
        {
          title: 'Separate Share Rule',
          type: 'text',
          content: "**Complex trusts with separate shares:**\n\n• Treat each share as separate trust\n• DNI calculated separately\n• Distributions only carry out that share's DNI\n\n**Prevents shifting income between beneficiaries**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "DNI = Ceiling for distribution deduction and beneficiary income",
            "Start with taxable income, make specific adjustments",
            "Tax-exempt income included in DNI (net)",
            "Capital gains usually excluded (allocated to corpus)",
            "Character of income preserved through DNI",
            "Tier 1 (required) filled before Tier 2 (discretionary)",
            "Separate share rule may apply"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-016',
    section: 'REG',
    courseId: 'cpa',
    title: "Simple vs. Complex Trusts",
    description: "Understand the differences and tax treatment",
    order: 52,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Entity Tax", "Trusts & Estates"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Trust classification affects taxation! Simple trusts must distribute all income and get different treatment than complex trusts. Understanding these distinctions is important for REG!"
        },
        {
          title: 'Simple Trust Requirements',
          type: 'text',
          content: "**ALL three must be met:**\n\n1. Trust instrument requires ALL income distributed currently\n2. No amounts distributed from corpus\n3. No charitable contributions made by trust\n\n**Fail ANY requirement = Complex trust**"
        },
        {
          title: 'Simple vs. Complex Comparison',
          type: 'table',
          headers: ['Feature', 'Simple Trust', 'Complex Trust'],
          rows: [
            ['Income distribution', 'Required—ALL', 'Discretionary'],
            ['Corpus distributions', 'Not allowed', 'Allowed'],
            ['Charitable contributions', 'Not allowed', 'Allowed'],
            ['Personal exemption', '$300', '$100'],
            ['Income taxed to', 'Beneficiaries', 'Trust or beneficiaries']
          ]
        },
        {
          title: '🧠 Memory Aid: Simple Trust',
          type: 'callout',
          content: "**\"ALL-NONE-NONE\"** for simple:\n\n**ALL** income must be distributed\n**NONE** of corpus can be distributed\n**NONE** to charity\n\n**If it's not ALL-NONE-NONE, it's COMPLEX!**"
        },
        {
          title: 'Simple Trust Taxation',
          type: 'text',
          content: "**Beneficiary always taxed:**\n\n• Trust gets deduction for DNI distributed\n• Beneficiary includes DNI in income\n• Character passes through\n• Trust pays tax only on capital gains (to corpus)\n\n**$300 exemption for simple trusts**"
        },
        {
          title: 'Complex Trust Taxation',
          type: 'text',
          content: "**More flexibility, more complexity:**\n\n• Distributions may or may not be made\n• Accumulated income taxed to trust\n• Distributed income taxed to beneficiaries\n• Can make charitable contributions (deductible)\n\n**$100 exemption for complex trusts**"
        },
        {
          title: '⚠️ Exam Trap: Year-to-Year Classification',
          type: 'warning',
          content: "**Same trust can change classification!**\n\n**Example:**\n• Year 1: All income distributed, no corpus = Simple\n• Year 2: Corpus distributed = Complex (that year)\n\n**Test requirements EACH year separately!**\n\n**Classification is annual, not permanent**"
        },
        {
          title: '65-Day Rule',
          type: 'text',
          content: "**Complex trusts only:**\n\n• Distributions in first 65 days of year\n• Can elect to treat as prior year distribution\n• Helps with tax planning\n\n**Not available for simple trusts (must distribute anyway)**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Simple trust: All income distributed, no corpus, no charity",
            "Complex trust: Everything else",
            "Simple exemption: $300; Complex exemption: $100",
            "Classification can change year to year",
            "Simple trusts: Beneficiaries taxed on DNI",
            "Complex trusts: Trust OR beneficiaries taxed",
            "65-day rule: Complex trusts can elect prior year treatment"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-017',
    section: 'REG',
    courseId: 'cpa',
    title: "Tax-Exempt Entities: Section 501(c)(3)",
    description: "Understand requirements for tax-exempt organizations",
    order: 53,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Entity Tax", "Tax-Exempt"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "501(c)(3) organizations are exempt from income tax AND can receive deductible contributions! Understanding the requirements and restrictions is important for REG and for advising nonprofit clients!"
        },
        {
          title: '501(c)(3) Requirements',
          type: 'text',
          content: "**Must be organized and operated exclusively for:**\n\n• Religious\n• Charitable\n• Scientific\n• Educational\n• Literary\n• Prevention of cruelty to children/animals\n• Fostering amateur sports competition"
        },
        {
          title: 'Organizational Test',
          type: 'text',
          content: "**Organizing documents must:**\n\n• Limit purposes to exempt purposes\n• Not permit private benefit\n• Provide for distribution to exempt org on dissolution\n\n**Look to articles of incorporation/trust document**"
        },
        {
          title: '🧠 Memory Aid: 501(c)(3) Types',
          type: 'callout',
          content: "**\"RECELS\"** for exempt purposes:\n\n**R**eligious\n**E**ducational\n**C**haritable\n**E**radicate cruelty\n**L**iterary\n**S**cientific\n\n**RECELS get tax exemption!**"
        },
        {
          title: 'Operational Test',
          type: 'text',
          content: "**Must actually operate for exempt purposes:**\n\n• Primary activities further exempt purpose\n• No private inurement (benefits to insiders)\n• No substantial lobbying\n• No political campaign activity\n\n**What you DO matters, not just what documents say**"
        },
        {
          title: 'Private Inurement',
          type: 'table',
          headers: ['Prohibited', 'Allowed'],
          rows: [
            ['Excess compensation to insiders', 'Reasonable compensation'],
            ['Sweetheart deals with founders', 'Fair market transactions'],
            ['Loans to directors', 'Program-related investments'],
            ['Profit distributions', 'Accumulated earnings for exempt purposes']
          ]
        },
        {
          title: '⚠️ Exam Trap: Political Activity',
          type: 'warning',
          content: "**501(c)(3) = NO political campaign activity!**\n\n**Prohibited:**\n• Endorsing candidates\n• Contributing to campaigns\n• Making political statements\n\n**Limited lobbying allowed:**\n• Insubstantial part of activities\n• Or elect 501(h) expenditure test\n\n**Political activity = REVOCATION!**"
        },
        {
          title: 'Public Charity vs. Private Foundation',
          type: 'text',
          content: "**501(c)(3)s are either:**\n\n**Public charity:**\n• Broad public support\n• Less restrictive rules\n• Preferred status\n\n**Private foundation:**\n• Limited funding sources\n• Excise taxes apply\n• More restrictions on activities"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "501(c)(3): Exempt from tax + deductible contributions",
            "Organizational test: Documents limit to exempt purposes",
            "Operational test: Actually operate for exempt purposes",
            "No private inurement to insiders",
            "No political campaign activity (absolute)",
            "Limited lobbying allowed",
            "Public charity preferred over private foundation"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-018',
    section: 'REG',
    courseId: 'cpa',
    title: "Unrelated Business Income (UBTI)",
    description: "Understand when exempt organizations pay tax",
    order: 54,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Entity Tax", "Tax-Exempt", "UBTI"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Even tax-exempt organizations pay tax on unrelated business income! Understanding what triggers UBTI prevents surprises and helps exempt organizations plan activities. This is a popular REG topic!"
        },
        {
          title: 'UBTI Definition',
          type: 'text',
          content: "**Three requirements for UBTI:**\n\n1. **Trade or business** (profit motive)\n2. **Regularly carried on**\n3. **Not substantially related** to exempt purpose\n\n**All three must be met = UBTI**"
        },
        {
          title: 'Trade or Business Test',
          type: 'text',
          content: "**Activity conducted for profit:**\n\n• Same standards as for-profit entities\n• Intent to profit (even if loses money)\n• Selling goods or services\n\n**Investment activities generally NOT trade or business**"
        },
        {
          title: '🧠 Memory Aid: UBTI Tests',
          type: 'callout',
          content: "**\"RUN\"** to avoid UBTI:\n\n**R**elated to exempt purpose\n**U**nregularly carried on\n**N**ot a trade or business\n\n**Meet ANY of these = NOT UBTI**\n\n**Fail all three = RUN to Form 990-T!**"
        },
        {
          title: 'Regularly Carried On',
          type: 'table',
          headers: ['Regularly', 'NOT Regularly'],
          rows: [
            ['Year-round activity', 'Once-a-year event'],
            ['Ongoing commercial operation', 'Annual fundraiser'],
            ['Continuous selling', 'Occasional sales'],
            ['Similar to commercial competitor', 'Sporadic activity']
          ]
        },
        {
          title: 'Substantially Related',
          type: 'text',
          content: "**Activity must CONTRIBUTE to exempt purpose:**\n\n• More than just generating revenue\n• Conduct itself furthers mission\n• Size and extent must be proportionate\n\n**Just funding exempt activities is NOT enough!**"
        },
        {
          title: 'Excluded from UBTI',
          type: 'text',
          content: "**Statutory exclusions:**\n\n• Volunteer labor (substantially all)\n• Donated merchandise sales\n• Member convenience activities\n• Dividends, interest, royalties (generally)\n• Rental income (generally)\n• Research income\n\n**Know these common exclusions!**"
        },
        {
          title: '⚠️ Exam Trap: Debt-Financed Property',
          type: 'warning',
          content: "**Rental income from debt-financed property = UBTI!**\n\n**Example:**\n• Church owns rental building\n• Building has mortgage\n• Rental income proportionally taxable\n\n**Formula:**\n(Average acquisition indebtedness / Average adjusted basis) × Rental income = UBTI\n\n**Even passive income taxable if debt-financed!**"
        },
        {
          title: 'UBTI Tax Calculation',
          type: 'text',
          content: "**Form 990-T:**\n\n• $1,000 specific deduction\n• Taxed at corporate rates (21%)\n• Losses can offset (with limitations)\n• Separate \"silos\" for certain losses\n\n**Estimated taxes may be required**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "UBTI: Trade/business + Regularly carried on + Unrelated",
            "All three tests must be met for UBTI",
            "Exclusions: Volunteers, donations, passive income",
            "Debt-financed property income may be UBTI",
            "Form 990-T: $1,000 deduction, taxed at 21%",
            "Generating revenue alone doesn't make activity related",
            "Common activities: Gift shops, parking, advertising"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-IV-019',
    section: 'REG',
    courseId: 'cpa',
    title: "Partnership Liquidations and Terminations",
    description: "Master partnership wind-up tax rules",
    order: 55,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Entity Tax", "Partnerships"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnerships eventually end! Understanding liquidating distributions vs. sales, and when a partnership terminates for tax purposes, is essential. These rules differ significantly from current distributions!"
        },
        {
          title: 'Partnership Termination',
          type: 'text',
          content: "**A partnership terminates when:**\n\n• No part of business continues to be carried on\n• By any partner\n• In a partnership\n\n**TCJA eliminated technical terminations!**\n\n**Sale of 50%+ interest no longer terminates partnership**"
        },
        {
          title: 'Liquidating vs Current Distributions',
          type: 'table',
          headers: ['Feature', 'Current Distribution', 'Liquidating Distribution'],
          rows: [
            ['Partner status', 'Remains a partner', 'Exits the partnership'],
            ['Basis reduction', 'Reduces outside basis', 'Zeroes out basis'],
            ['Loss recognition', 'NEVER recognized', 'MAY be recognized'],
            ['Gain on property', 'Generally no gain', 'Generally no gain']
          ]
        },
        {
          title: 'Liquidating Distribution Rules',
          type: 'text',
          content: "**Gain recognized when:**\n• Cash exceeds outside basis\n\n**Loss recognized when:**\n• Only money, inventory, unrealized receivables received\n• FMV less than outside basis\n\n**Property distributions:**\n• Basis = Carryover (limited to outside basis)\n• Generally no gain/loss"
        },
        {
          title: '🧠 Memory Aid: Liquidation Loss',
          type: 'callout',
          content: "**\"MIR\" = Loss possible**\n\n**M**oney only\n**I**nventory only\n**R**eceivables only\n\n**Get MIR items + FMV < basis = Recognize LOSS**\n\n**Get ANY other property = NO loss recognition**"
        },
        {
          title: 'Section 736 Payments',
          type: 'text',
          content: "**Payments to retiring/deceased partner:**\n\n**736(a): Income payments**\n• Distributive share or guaranteed payments\n• Ordinary income to recipient\n• Deductible to partnership\n\n**736(b): Property payments**\n• For partner's interest in partnership assets\n• Exchange treatment to partner\n• No deduction to partnership"
        },
        {
          title: '⚠️ Exam Trap: Hot Assets',
          type: 'warning',
          content: "**Hot assets = Ordinary income!**\n\n**Hot assets include:**\n• Unrealized receivables\n• Substantially appreciated inventory\n\n**Section 751(b):** Ordinary gain if:\n• Hot assets exchanged for non-hot\n• Or vice versa\n\n**Cannot convert ordinary income to capital gain!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Partnership terminates when business ceases entirely",
            "TCJA: 50%+ sale no longer terminates",
            "Liquidating loss: Only if receive MIR (money, inventory, receivables)",
            "736(a): Income items; 736(b): Property items",
            "Hot assets trigger ordinary income treatment",
            "Cannot convert ordinary income to capital gain via distribution"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-V-001',
    section: 'REG',
    courseId: 'cpa',
    title: "Gift Tax Fundamentals",
    description: "Master federal gift tax rules and exclusions",
    order: 56,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Transfer Tax", "Gift Tax"],
    blueprintArea: 'REG-V',
    blueprintTopic: 'REG-V-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Gift tax is part of the unified transfer tax system! Understanding annual exclusions, lifetime exemptions, and what constitutes a taxable gift is essential for estate planning and REG. Many candidates overlook gift tax!"
        },
        {
          title: 'Gift Tax Overview',
          type: 'text',
          content: "**Unified transfer tax system:**\n\n• Gift tax (lifetime transfers)\n• Estate tax (death transfers)\n• Generation-skipping tax (to skip persons)\n\n**Gift tax is paid by DONOR, not donee!**\n\n**Unified credit shelters both gift and estate taxes**"
        },
        {
          title: 'What is a Gift?',
          type: 'text',
          content: "**Transfer without adequate consideration:**\n\n• Voluntary\n• Without full value in return\n• Complete transfer (donor gives up control)\n\n**Incomplete gift = No current gift tax**\n\n**Below-market loans may be deemed gifts (imputed interest)**"
        },
        {
          title: 'Annual Exclusion',
          type: 'text',
          content: "**$18,000 per donee (2024):**\n\n• Per donor, per donee, per year\n• Must be present interest (not future)\n• Unlimited number of donees\n• Indexed for inflation\n\n**Married couples can split gifts:**\n$18,000 × 2 = $36,000 per donee"
        },
        {
          title: '🧠 Memory Aid: Gift Exclusions',
          type: 'callout',
          content: "**\"TEMP\"** gifts are tax-free:\n\n**T**uition (paid directly to institution)\n**E**xclusion amount ($18K annual)\n**M**edical (paid directly to provider)\n**P**olitical contributions\n\n**TEMP gifts = No gift tax!**"
        },
        {
          title: 'Unlimited Exclusions',
          type: 'table',
          headers: ['Type', 'Requirement', 'Amount'],
          rows: [
            ['Medical expenses', 'Pay directly to provider', 'Unlimited'],
            ['Tuition', 'Pay directly to school', 'Unlimited'],
            ['Gifts to spouse', 'US citizen spouse', 'Unlimited marital deduction'],
            ['Charity', 'Qualified organization', 'Unlimited charitable deduction']
          ]
        },
        {
          title: 'Unified Credit',
          type: 'text',
          content: "**Lifetime exemption (2024): $13.61 million**\n\n• Shelters both gift and estate taxes\n• Use during life reduces estate exemption\n• Indexed for inflation\n\n**Sunset warning:** Returns to ~$5-6M in 2026 unless extended\n\n**Gift tax rate: 40% (same as estate tax)**"
        },
        {
          title: '⚠️ Exam Trap: Present vs. Future Interest',
          type: 'warning',
          content: "**Annual exclusion requires PRESENT interest!**\n\n**Present interest:** Immediate use/enjoyment\n**Future interest:** Enjoyment postponed (no exclusion)\n\n**Trust gifts:**\n• Outright gift to trust beneficiary = Present\n• Remainder interest = Future\n• Crummey power = Creates present interest"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Gift tax paid by DONOR (not donee)",
            "Annual exclusion: $18,000 per donee (2024)",
            "Unlimited: Medical and tuition paid directly",
            "Present interest required for annual exclusion",
            "Lifetime exemption: $13.61M (unified with estate)",
            "Gift splitting doubles exclusion for married couples",
            "40% tax rate on taxable gifts"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-V-002',
    section: 'REG',
    courseId: 'cpa',
    title: "Estate Tax Fundamentals",
    description: "Understand federal estate tax basics",
    order: 57,
    duration: 60,
    difficulty: 'intermediate',
    topics: ["Transfer Tax", "Estate Tax"],
    blueprintArea: 'REG-V',
    blueprintTopic: 'REG-V-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Estate tax applies to wealth transferred at death! Understanding what's included in the gross estate, available deductions, and the unified credit is essential for wealth planning and REG!"
        },
        {
          title: 'Estate Tax Calculation',
          type: 'text',
          content: "**Basic formula:**\n\nGross estate\n− Deductions\n= Taxable estate\n× Tax rate (40%)\n= Tentative tax\n− Unified credit\n− Other credits\n= Estate tax due"
        },
        {
          title: 'Gross Estate Inclusions',
          type: 'table',
          headers: ['Item', 'Amount Included'],
          rows: [
            ['Property owned at death', 'FMV at date of death'],
            ['Life insurance', 'If incidents of ownership or payable to estate'],
            ['Jointly owned property', 'Depends on type of ownership'],
            ['General power of appointment', 'Full value of property'],
            ['Transfers within 3 years', 'Life insurance premiums, gift tax paid'],
            ['Retained interests', 'Transfers with retained life estate']
          ]
        },
        {
          title: '🧠 Memory Aid: Gross Estate',
          type: 'callout',
          content: "**\"PILL JAR\"** for inclusions:\n\n**P**roperty owned\n**I**nsurance (if incidents owned)\n**L**ife estate retained\n**L**imited/General powers\n**J**oint interests\n**A**nnuities\n**R**evocable transfers\n\n**If you had control or benefit, it's in the estate!**"
        },
        {
          title: 'Estate Tax Deductions',
          type: 'text',
          content: "**Key deductions:**\n\n• **Marital deduction:** Unlimited (US citizen spouse)\n• **Charitable deduction:** Unlimited\n• **Debts and expenses:** Funeral, admin, claims\n• **Losses:** Casualty/theft during admin\n• **State death taxes:** Deduction allowed"
        },
        {
          title: 'Unified Credit and Portability',
          type: 'text',
          content: "**2024 exemption: $13.61 million**\n\n**Portability:** Unused exemption transfers to surviving spouse\n• Must elect on timely filed estate return\n• Only from last deceased spouse\n• Effectively doubles exemption for married couples\n\n**DSUE:** Deceased Spousal Unused Exclusion"
        },
        {
          title: 'Valuation Date',
          type: 'text',
          content: "**Two options:**\n\n**Date of death:** General rule\n\n**Alternate valuation date:** 6 months later\n• Only if reduces estate AND estate tax\n• Irrevocable election\n• Property distributed uses distribution date value\n\n**Executor chooses which benefits estate most**"
        },
        {
          title: '⚠️ Exam Trap: Marital Deduction Requirements',
          type: 'warning',
          content: "**Marital deduction requires:**\n\n• Property passing TO spouse\n• Included in gross estate\n• Not terminable interest (generally)\n• Spouse must be US citizen\n\n**Non-citizen spouse:** Use QDOT (Qualified Domestic Trust) instead\n\n**Unlimited = Potential for massive deduction!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Gross estate: Property + insurance + retained interests",
            "Marital deduction: Unlimited (US citizen spouse)",
            "Charitable deduction: Unlimited",
            "Unified credit: $13.61M exemption (2024)",
            "Portability: Transfer unused exemption to spouse",
            "Alternate valuation: 6 months after death (if reduces tax)",
            "40% tax rate on taxable estate"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-024',
    section: 'REG',
    courseId: 'cpa',
    title: "Installment Sales",
    description: "Master installment method for deferred payment sales",
    order: 58,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Property Transactions"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-E-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Installment sales let you spread gain recognition over multiple years as you receive payments! This powerful tax planning tool helps sellers manage tax liability. Understanding the rules—and exceptions—is critical for REG!"
        },
        {
          title: 'Installment Method Basics',
          type: 'text',
          content: "**Report gain as payments received:**\n\n• At least one payment after year of sale\n• Automatically applies (unless elect out)\n• Cannot use for losses\n\n**Formula:**\nGain recognized = Payment × Gross profit %"
        },
        {
          title: 'Gross Profit Percentage',
          type: 'text',
          content: "**GP% = Gross Profit / Contract Price**\n\n**Gross Profit:**\nSelling price − Adjusted basis − Selling expenses\n\n**Contract Price:**\nSelling price − Mortgage assumed (to extent of basis)\n\n**Each payment × GP% = Gain recognized**"
        },
        {
          title: '🧠 Memory Aid: Installment Formula',
          type: 'callout',
          content: "**\"GPP\" for installment:**\n\n**G**ross profit ÷\n**P**rice (contract) =\n**P**ercentage × Payment = Gain\n\n**Example:**\nSale price: $100,000\nBasis: $40,000\nGP: $60,000\nGP%: 60%\nPayment: $20,000\nGain: $12,000"
        },
        {
          title: 'Ineligible for Installment Method',
          type: 'table',
          headers: ['Cannot Use For', 'Reason'],
          rows: [
            ['Inventory sales', 'Ordinary course of business'],
            ['Dealer sales', 'Regular property sales business'],
            ['Depreciation recapture', 'All recapture in year of sale'],
            ['Publicly traded securities', 'Easy to value/sell'],
            ['Losses', 'No benefit to spreading']
          ]
        },
        {
          title: 'Related Party Sales',
          type: 'text',
          content: "**Special rules apply:**\n\n**If related buyer resells within 2 years:**\n• Original seller recognizes remaining gain\n• Prevents using installment to shift income\n\n**Related parties:**\n• Family (siblings, spouse, ancestors, descendants)\n• Controlled entities (>50%)"
        },
        {
          title: '⚠️ Exam Trap: Depreciation Recapture',
          type: 'warning',
          content: "**Recapture is NOT eligible for installment!**\n\n**Year of sale recognize:**\n• ALL depreciation recapture (§1245, §1250)\n\n**Spread over time:**\n• Only §1231 gain above recapture\n\n**Recapture comes first, installment second!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Installment: Spread gain as payments received",
            "GP% = Gross profit / Contract price",
            "Gain = Payment × GP%",
            "Cannot use for inventory, dealers, losses, recapture",
            "Depreciation recapture: ALL in year of sale",
            "Related party resale within 2 years accelerates gain",
            "Can elect out if desired"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-025',
    section: 'REG',
    courseId: 'cpa',
    title: "Passive Activity Loss Rules",
    description: "Master PAL limitations and material participation",
    order: 59,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Individual Tax", "Passive Activities"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-F-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Passive activity loss rules prevent using rental and investment losses to offset wages and business income! Understanding material participation and the rental exceptions is essential for individual tax planning and REG!"
        },
        {
          title: 'Passive Activity Basics',
          type: 'text',
          content: "**Two types of passive activities:**\n\n1. **Rental activities** (generally passive)\n2. **Business activities** where you don't materially participate\n\n**Key rule:** Passive losses only offset passive income\n\n**Excess losses:** Suspended and carried forward"
        },
        {
          title: 'Material Participation Tests',
          type: 'table',
          headers: ['Test', 'Requirement'],
          rows: [
            ['500-hour test', '500+ hours during year'],
            ['Substantially all test', 'Your participation is substantially all'],
            ['100-hour test', '100+ hours AND no one participates more'],
            ['Significant participation', '500+ hours total across multiple activities'],
            ['5-year test', 'Materially participated any 5 of last 10 years'],
            ['Personal service', 'Any 3 prior years for personal service activity']
          ]
        },
        {
          title: '🧠 Memory Aid: Material Participation',
          type: 'callout',
          content: "**\"500 is the MAGIC number\"**\n\n**500 hours = Definitely materially participate**\n\n**Below 500?** Try other tests:\n• 100 hours + most participation\n• Substantially all participation\n• Historical participation\n\n**Meet ANY test = Material participation**"
        },
        {
          title: 'Rental Real Estate Exception',
          type: 'text',
          content: "**$25,000 allowance for rental losses:**\n\n**Requirements:**\n• Actively participate (less than material)\n• Own at least 10%\n• AGI below threshold\n\n**Phaseout:**\n• Begins at $100,000 AGI\n• Fully phased out at $150,000\n• $1 reduction per $2 of AGI over $100K"
        },
        {
          title: 'Real Estate Professional',
          type: 'text',
          content: "**Rental not passive if:**\n\n1. >50% of personal services in real property businesses\n2. >750 hours in real property businesses\n3. Materially participate in each rental\n\n**Meet all three = Rentals are NOT passive**\n\n**Can offset wages with rental losses!**"
        },
        {
          title: '⚠️ Exam Trap: Disposition Unlocks Losses',
          type: 'warning',
          content: "**Suspended losses released on disposition!**\n\n**Fully taxable disposition:**\n• Sale to unrelated party\n• All suspended losses deductible\n• Against any type of income\n\n**Not fully taxable:**\n• Gift (losses transfer to donee)\n• Death (losses lost unless deducted on 1041)\n• Related party (losses stay suspended)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Passive losses only offset passive income",
            "500 hours = Material participation",
            "Rental: Generally passive (with exceptions)",
            "$25,000 allowance: Active participation, AGI limits",
            "Real estate professional: Rentals not passive",
            "Suspended losses: Carry forward until disposition",
            "Taxable sale releases all suspended losses"
          ]
        }
      ]
    }
  },

  // =============================================
  // REG: ADDITIONAL TOPICS
  // =============================================
  {
    id: 'REG-V-012',
    section: 'REG',
    courseId: 'cpa',
    title: "Like-Kind Exchanges (Section 1031)",
    description: "Master tax-deferred exchanges of real property",
    order: 75,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Individual Tax", "Property Transactions", "Tax Deferral"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Like-kind exchanges defer recognition of gain! Understanding the requirements, timing rules, and boot calculations is critical. Post-TCJA, only REAL property qualifies. This is a major tax planning tool!"
        },
        {
          title: 'Basic Requirements',
          type: 'text',
          content: "**For tax-deferred treatment:**\n\n1. **Like-kind property:** Real property for real property\n2. **Held for business or investment** (both properties)\n3. **Timing rules met** (45-day/180-day)\n4. **Same taxpayer** (exchanger)\n\n**Post-TCJA:** Only real property qualifies (not personal property!)"
        },
        {
          title: 'Timing Requirements',
          type: 'table',
          headers: ['Period', 'Requirement', 'Strict?'],
          rows: [
            ['45 days', 'Identify replacement property', 'Very strict'],
            ['180 days', 'Receive replacement property', 'Very strict'],
            ['Due date', 'Including extensions', 'Absolute limit'],
            ['Identification', 'Written, signed', 'Required']
          ]
        },
        {
          title: '🧠 Memory Aid: Timing',
          type: 'callout',
          content: "**\"45 to ID, 180 to Close\"**\n\n**Day 1:** Close on relinquished property\n**Day 45:** Must IDENTIFY replacement(s)\n**Day 180:** Must CLOSE on replacement\n\n**These are CALENDAR days!**\n**NO extensions (even with return extension)**"
        },
        {
          title: 'Boot and Gain Recognition',
          type: 'text',
          content: "**Boot = Non-like-kind property received:**\n\n• Cash received\n• Debt relief (mortgage paid off)\n• Other property\n\n**Gain recognized = Lesser of:**\n• Gain realized, OR\n• Boot received\n\n**Can never recognize loss in like-kind exchange!**"
        },
        {
          title: 'Basis Calculation',
          type: 'text',
          content: "**Basis of new property:**\n\n**Formula:**\nFMV of property received\n− Deferred gain\n+ Recognized gain\n= Basis of new property\n\n**Or shortcut:**\nBasis of old property\n− Boot received\n+ Boot paid\n+ Gain recognized\n= Basis of new property"
        },
        {
          title: '⚠️ Exam Trap: Mortgage Boot',
          type: 'warning',
          content: "**Debt relief = Boot received!**\n\n**Net mortgage boot:**\n• Mortgage transferred TO other party\n• MINUS mortgage assumed FROM other party\n\n**Example:**\n• Your mortgage: $100K (transferred)\n• Their mortgage: $80K (assumed)\n• Net boot received: $20K\n\n**Cash paid can offset debt relief!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Like-kind: Only real property (post-TCJA)",
            "45 days to identify, 180 days to close",
            "Boot = Cash, debt relief, other property",
            "Gain recognized = Lesser of gain realized or boot",
            "Loss is NEVER recognized in §1031",
            "Basis: FMV − Deferred gain + Recognized gain",
            "Debt relief is boot; cash paid can offset"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-V-013',
    section: 'REG',
    courseId: 'cpa',
    title: "Involuntary Conversions (Section 1033)",
    description: "Understand tax treatment of condemnations and casualties",
    order: 76,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Property Transactions", "Tax Deferral"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When property is destroyed or condemned, you may receive insurance or award! Understanding §1033 allows deferral of gain by reinvesting. This provides relief in involuntary situations!"
        },
        {
          title: 'What Is Involuntary Conversion?',
          type: 'text',
          content: "**Property compulsorily or involuntarily converted:**\n\n• Casualty (fire, storm, flood)\n• Theft\n• Condemnation (eminent domain)\n• Threat of condemnation\n\n**Conversion into:** Money (insurance, award)"
        },
        {
          title: 'Deferral Requirements',
          type: 'table',
          headers: ['Requirement', 'Details', 'Notes'],
          rows: [
            ['Reinvest proceeds', 'In similar or related property', 'Not same taxpayer required'],
            ['Replacement period', '2 years (3 for condemned real estate)', 'From END of tax year of gain'],
            ['Make election', 'On tax return', 'File timely return']
          ]
        },
        {
          title: '🧠 Memory Aid: Similar Property',
          type: 'callout',
          content: "**\"Similar Use\" NOT \"Like Kind\"**\n\n**§1033 is NARROWER than §1031:**\n\n**Must be similar in service or use:**\n• Factory → Factory\n• Rental house → Rental house\n\n**Condemnation of real estate:**\nCan use like-kind standard"
        },
        {
          title: 'Gain Recognition Rules',
          type: 'text',
          content: "**Gain recognized = Lesser of:**\n\n• Gain realized, OR\n• Amount NOT reinvested\n\n**Example:**\n• Insurance received: $500,000\n• Basis: $300,000\n• Gain realized: $200,000\n• Reinvested: $450,000\n• Not reinvested: $50,000\n• **Gain recognized: $50,000**"
        },
        {
          title: 'Basis of Replacement Property',
          type: 'text',
          content: "**Basis = Cost of replacement − Deferred gain**\n\n**Example (continuing):**\n• Cost of replacement: $450,000\n• Deferred gain: $150,000 ($200K - $50K recognized)\n• **Basis: $300,000**\n\n**Deferred gain reduces basis!**"
        },
        {
          title: '⚠️ Exam Trap: Timing',
          type: 'warning',
          content: "**Replacement period timing:**\n\n**Starts:** End of tax year in which gain realized\n**Ends:** 2 years later (or 3 for condemned RE)\n\n**NOT from date of conversion!**\n\n**Example:**\n• Casualty: March 2024\n• Tax year ends: December 31, 2024\n• Deadline: December 31, 2026"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Involuntary: Casualty, theft, condemnation",
            "Gain deferred if reinvest in similar property",
            "Replacement period: 2 years (3 for condemned RE)",
            "Period starts at END of tax year of gain",
            "Gain recognized = Lesser of gain or amount not reinvested",
            "Basis of replacement reduced by deferred gain",
            "§1033 requires similar use (narrower than §1031)"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-V-014',
    section: 'REG',
    courseId: 'cpa',
    title: "Home Sale Exclusion (Section 121)",
    description: "Master the $250K/$500K gain exclusion for principal residence",
    order: 77,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Property Transactions", "Exclusion"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-C-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The home sale exclusion is a HUGE tax benefit! Understanding the ownership/use tests and partial exclusion rules helps maximize this benefit. Up to $500K of gain can be excluded!"
        },
        {
          title: 'Basic Exclusion',
          type: 'table',
          headers: ['Filing Status', 'Maximum Exclusion', 'Requirements'],
          rows: [
            ['Single', '$250,000', 'Ownership + Use tests'],
            ['MFJ (both qualify)', '$500,000', 'Both meet O + U'],
            ['MFJ (one qualifies)', '$250,000', 'At least one meets O + U'],
            ['MFS', '$250,000 each', 'Each must qualify']
          ]
        },
        {
          title: '🧠 Memory Aid: 2-Out-of-5 Rule',
          type: 'callout',
          content: "**\"Owned AND used 2 of last 5\"**\n\n**OWNERSHIP test:** Owned 2+ years\n**USE test:** Lived there 2+ years\n\n**During 5-year period ending on sale date**\n\n**Don't have to be consecutive!**"
        },
        {
          title: 'Ownership and Use Tests',
          type: 'text',
          content: "**Both tests required:**\n\n**Ownership:** Owned for 2+ years during 5-year period\n\n**Use:** Used as principal residence for 2+ years during 5-year period\n\n**Periods don't have to overlap!**\n\n**Can count tacked period from spouse in divorce**"
        },
        {
          title: 'Partial Exclusion',
          type: 'text',
          content: "**When tests not fully met:**\n\n**If sale due to:**\n• Change in employment (50+ miles)\n• Health reasons\n• Unforeseen circumstances\n\n**Formula:**\nPartial exclusion = Max exclusion × (Months used / 24)\n\n**Example:** Lived 18 months, single\n$250,000 × 18/24 = **$187,500** exclusion"
        },
        {
          title: 'Frequency Limitation',
          type: 'text',
          content: "**One exclusion per 2 years:**\n\n• Can't have excluded gain on another home in 2 years before sale\n• Applies to each spouse individually\n\n**Married couple:**\n• If one spouse used exclusion within 2 years\n• Maximum is $250,000 (other spouse's portion)"
        },
        {
          title: '⚠️ Exam Trap: Depreciation Recapture',
          type: 'warning',
          content: "**If home used for business/rental:**\n\n• Depreciation taken = Recaptured as ordinary income\n• CANNOT exclude depreciation recapture\n• Only gain above depreciation eligible\n\n**Example:**\n• Gain: $300,000\n• Depreciation: $40,000\n• Recaptured as ordinary: $40,000\n• Excluded: $260,000 (if single)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Exclusion: $250K single, $500K MFJ",
            "2-out-of-5 rule: Owned AND used 2+ years",
            "Periods don't have to be consecutive or overlap",
            "Partial exclusion: For employment, health, unforeseen",
            "Once every 2 years limitation",
            "Depreciation cannot be excluded",
            "Both spouses must meet tests for $500K"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-V-015',
    section: 'REG',
    courseId: 'cpa',
    title: "Capital Gains and Losses",
    description: "Master capital gain rates and loss limitation rules",
    order: 78,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Capital Gains", "Investment"],
    blueprintArea: 'REG-IV',
    blueprintTopic: 'REG-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Capital gains have preferential tax rates! Understanding the netting process, rate brackets, and loss limitations is essential for investment tax planning. This is heavily tested on REG!"
        },
        {
          title: 'Capital Gain Tax Rates',
          type: 'table',
          headers: ['Type', 'Rate', 'Holding Period'],
          rows: [
            ['Short-term', 'Ordinary rates', '<= 1 year'],
            ['Long-term (0%)', '0%', 'Lower brackets'],
            ['Long-term (15%)', '15%', 'Middle brackets'],
            ['Long-term (20%)', '20%', 'Top bracket'],
            ['Collectibles', '28%', 'Art, coins, etc.'],
            ['Unrecaptured §1250', '25%', 'Depreciation on RE']
          ]
        },
        {
          title: '🧠 Memory Aid: Holding Period',
          type: 'callout',
          content: "**\">1 Year = Long-term\"**\n\n**Count from day AFTER acquisition**\n**To day OF disposition**\n\n**Example:**\n• Buy: January 15, 2024\n• Must sell AFTER: January 15, 2025\n• January 15, 2025 = Still short-term!\n• January 16, 2025 = Long-term"
        },
        {
          title: 'Netting Process',
          type: 'text',
          content: "**Step 1:** Net within each category\n• ST gains vs ST losses\n• LT gains vs LT losses\n\n**Step 2:** Net across categories\n• Net ST against Net LT\n\n**Results:**\n• Net LTCG: Preferential rate\n• Net STCG: Ordinary rate\n• Net loss: $3,000 deduction"
        },
        {
          title: 'Capital Loss Rules',
          type: 'text',
          content: "**Individuals:**\n• Net capital loss: Deduct up to $3,000/year\n• Excess carries forward indefinitely\n• Character (ST/LT) preserved in carryforward\n\n**Corporations:**\n• No deduction against ordinary income\n• Carryback 3 years, forward 5 years\n• Only offsets capital gains"
        },
        {
          title: 'Net Investment Income Tax (NIIT)',
          type: 'text',
          content: "**3.8% surtax on investment income:**\n\n**Applies when MAGI exceeds:**\n• $200,000 (single)\n• $250,000 (MFJ)\n\n**Investment income includes:**\n• Interest, dividends\n• Capital gains\n• Rental income\n• Passive income\n\n**Top effective rate: 20% + 3.8% = 23.8%**"
        },
        {
          title: '⚠️ Exam Trap: Wash Sale Rule',
          type: 'warning',
          content: "**Loss disallowed if:**\n\n• Sell at loss AND\n• Buy substantially identical within 30 days before/after\n\n**61-day window total!**\n\n**Effect:**\n• Loss is deferred, not lost\n• Added to basis of new shares\n\n**Does NOT apply to gains!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Long-term: >1 year; Preferential rates 0%/15%/20%",
            "Short-term: ≤1 year; Ordinary rates",
            "Collectibles max: 28%; Unrecaptured §1250: 25%",
            "Net losses: $3,000/year deduction (individuals)",
            "Carryforward: Indefinite, character preserved",
            "NIIT: 3.8% on investment income above thresholds",
            "Wash sale: 30-day rule defers loss"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-115',
    section: 'REG',
    courseId: 'cpa',
    title: "Professional Responsibility: Circular 230",
    description: "Understand IRS rules governing tax practitioners",
    order: 79,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Professional Responsibility", "Circular 230", "Ethics"],
    blueprintArea: 'REG-I',
    blueprintTopic: 'REG-I-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Circular 230 governs practice before the IRS! Understanding practitioner duties, standards for positions, and penalties is essential for professional responsibility questions on REG!"
        },
        {
          title: 'Who Is Covered?',
          type: 'text',
          content: "**Practitioners authorized to practice before IRS:**\n\n• Attorneys\n• CPAs\n• Enrolled agents\n• Enrolled actuaries\n• Enrolled retirement plan agents\n\n**\"Practice before IRS\" includes:**\nPreparing returns, representation, correspondence"
        },
        {
          title: 'Standards for Tax Positions',
          type: 'table',
          headers: ['Situation', 'Standard Required', 'Meaning'],
          rows: [
            ['Signing returns', 'Reasonable basis', '~20% chance'],
            ['Signing (disclosed)', 'Reasonable basis', 'Must disclose'],
            ['Not frivolous', 'Minimum', '~10% chance'],
            ['Oral advice', 'Good faith', 'All facts/circumstances']
          ]
        },
        {
          title: '🧠 Memory Aid: Position Standards',
          type: 'callout',
          content: "**Standards (Low → High):**\n\n**Not frivolous:** ~10% (barely colorable)\n**Reasonable basis:** ~20% (disclosed positions)\n**Substantial authority:** ~40% (undisclosed, no penalty)\n**More likely than not:** >50% (tax shelters)\n\n**Higher standard = Stronger position needed**"
        },
        {
          title: 'Due Diligence',
          type: 'text',
          content: "**Practitioner must:**\n\n• Exercise due diligence in preparing/filing\n• Not rely on client info if appears incorrect\n• Make reasonable inquiries\n• Advise client of consequences of positions\n\n**Cannot just accept what client says!**"
        },
        {
          title: 'Key Prohibitions',
          type: 'text',
          content: "**May NOT:**\n\n• Charge unconscionable fees\n• Endorse or negotiate client's IRS check\n• Practice during suspension/disbarment\n• Assist disbarred practitioners\n• Give false or misleading information\n• Knowingly submit false documents\n\n**May NOT represent conflicting interests** (without consent)"
        },
        {
          title: 'Written Advice Rules',
          type: 'text',
          content: "**When providing written tax advice:**\n\n• Base on reasonable factual assumptions\n• Consider all relevant facts\n• Don't rely on unreasonable assumptions\n• Don't take into account likelihood of audit\n\n**Must be based on good faith analysis**"
        },
        {
          title: '⚠️ Exam Trap: Penalties',
          type: 'warning',
          content: "**OPR (Office of Professional Responsibility) can:**\n\n• Censure (public reprimand)\n• Suspend (temporary)\n• Disbar (permanent)\n• Impose monetary penalty\n\n**Violations include:**\n• Willful violations\n• Reckless conduct\n• Gross incompetence\n• Pattern of incompetence"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Circular 230 governs IRS practice",
            "Applies to: CPAs, attorneys, enrolled agents",
            "Signing returns: Reasonable basis required",
            "Due diligence: Cannot blindly accept client info",
            "Conflicts: Written consent required",
            "Cannot negotiate client's IRS refund check",
            "Penalties: Censure, suspension, disbarment"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-II-016',
    section: 'REG',
    courseId: 'cpa',
    title: "Agency Law",
    description: "Understand principal-agent relationships and liability",
    order: 80,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Business Law", "Agency", "Liability"],
    blueprintArea: 'REG-II',
    blueprintTopic: 'REG-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Agency law determines when one person can bind another! Understanding types of authority, agent duties, and principal liability is essential for business law questions on REG!"
        },
        {
          title: 'Types of Authority',
          type: 'table',
          headers: ['Type', 'Source', 'Example'],
          rows: [
            ['Express', 'Stated by principal', 'Written or oral grant'],
            ['Implied', 'Reasonably necessary', 'Incidental to express'],
            ['Apparent', 'Principal\'s representations', 'Third party reasonably believes'],
            ['Ratification', 'After-the-fact approval', 'Adopting unauthorized act']
          ]
        },
        {
          title: '🧠 Memory Aid: Authority Types',
          type: 'callout',
          content: "**\"EIAR\"**\n\n**E**xpress - \"You may do X\"\n**I**mplied - Reasonable to accomplish X\n**A**pparent - Looks like authority to 3rd party\n**R**atification - \"I approve what you did\"\n\n**All can bind principal!**"
        },
        {
          title: 'Agent Duties to Principal',
          type: 'text',
          content: "**Fiduciary duties:**\n\n• **Loyalty:** Act in principal's interest\n• **Obedience:** Follow instructions\n• **Care:** Use reasonable skill\n• **Disclosure:** Report material information\n• **Accounting:** Account for property/money\n\n**Agent must put principal's interests first!**"
        },
        {
          title: 'Principal Duties to Agent',
          type: 'text',
          content: "**Principal must:**\n\n• Pay agreed compensation\n• Reimburse expenses\n• Indemnify for losses from authorized acts\n• Cooperate in agent's performance\n\n**Can be modified by agreement**"
        },
        {
          title: 'Liability to Third Parties',
          type: 'text',
          content: "**Principal's liability:**\n• Bound by authorized acts\n• Bound by apparent authority\n• Liable for agent's torts in scope\n\n**Agent's liability:**\n• Personally liable if principal undisclosed\n• Personally liable if exceeds authority\n• Not liable if disclosed and authorized"
        },
        {
          title: '⚠️ Exam Trap: Disclosed vs Undisclosed',
          type: 'warning',
          content: "**Disclosed principal:** Third party knows identity\n→ Principal bound, Agent usually not\n\n**Partially disclosed:** Knows agency, not identity\n→ Both may be liable\n\n**Undisclosed:** Third party doesn't know\n→ Agent personally liable\n→ Principal also liable when discovered"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Authority: Express, Implied, Apparent, Ratification",
            "Agent owes fiduciary duties to principal",
            "Principal liable for authorized agent acts",
            "Apparent authority binds principal to third parties",
            "Agent personally liable if principal undisclosed",
            "Ratification requires knowledge and capacity",
            "Principal liable for agent torts in scope of employment"
          ]
        }
      ]
    }
  },
  // ==========================================
  // H.R.1 - ONE BIG BEAUTIFUL BILL ACT OF 2025
  // ==========================================
  {
    id: 'REG-III-026',
    section: 'REG',
    courseId: 'cpa',
    title: "Tax-Free Tip Income (H.R.1)",
    description: "Understand the new tax exemption for qualifying tip income",
    order: 81,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Individual Taxation", "Gross Income", "Legislative Updates"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "H.R.1 (One Big Beautiful Bill Act of 2025) introduced a new above-the-line deduction for qualifying tip income! This is a major change affecting millions of hospitality workers and their tax planning."
        },
        {
          title: 'Key Provisions',
          type: 'table',
          headers: ['Element', 'Requirement', 'Details'],
          rows: [
            ['Eligible Workers', 'Tipped occupations', 'Food service, hospitality, beauty services'],
            ['Deduction Type', 'Above-the-line', 'Reduces AGI directly'],
            ['Maximum Benefit', 'Capped amount', 'Subject to income phase-outs'],
            ['Effective Date', 'Tax years 2025+', 'Applies to tips received after enactment'],
            ['Documentation', 'Employer reporting', 'Tips must be reported on W-2']
          ]
        },
        {
          title: 'Qualifying Tips',
          type: 'text',
          content: "**Tips that qualify for the deduction:**\n\n• Cash tips received directly from customers\n• Credit card tips processed through employer\n• Tips from tip pools and sharing arrangements\n• Service charges designated as tips\n\n**Must be properly reported to employer!**"
        },
        {
          title: '🧠 Memory Aid: Tip Deduction Rules',
          type: 'callout',
          content: "**\"TIPS\"** for qualification:\n\n**T**ipped occupation (defined categories)\n**I**ncome under threshold (phase-out applies)\n**P**roperly reported (on W-2)\n**S**ervice-related (food, hospitality, beauty)\n\n**Above-the-line = Available even without itemizing!**"
        },
        {
          title: 'Income Phase-Outs',
          type: 'text',
          content: "**Deduction phases out for higher earners:**\n\n• Single filers: Phase-out begins at $160,000 AGI\n• MFJ filers: Phase-out begins at $320,000 AGI\n• Completely phased out $40,000 above threshold\n\n**Calculate modified AGI excluding tips for threshold**"
        },
        {
          title: '⚠️ Exam Trap: Still Subject to FICA',
          type: 'warning',
          content: "**Tips are exempt from INCOME tax, NOT payroll tax!**\n\n• Social Security tax still applies\n• Medicare tax still applies\n• Employer FICA obligation unchanged\n\n**Only the federal income tax exclusion is new!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "H.R.1 creates above-the-line deduction for qualifying tips",
            "Applies to food service, hospitality, beauty workers",
            "Tips must be properly reported to employer",
            "Phase-outs apply for higher income taxpayers",
            "FICA taxes still apply - only income tax exempted",
            "Effective for tax years beginning after 2024"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-027',
    section: 'REG',
    courseId: 'cpa',
    title: "SALT Deduction Changes (H.R.1)",
    description: "Navigate the revised State and Local Tax deduction limits",
    order: 82,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Taxation", "Itemized Deductions", "Legislative Updates"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The $10,000 SALT cap has been one of the most debated provisions! H.R.1 modifies this limitation. Understanding the current rules and changes is essential for REG!"
        },
        {
          title: 'SALT Cap Timeline',
          type: 'table',
          headers: ['Period', 'SALT Limit', 'Status'],
          rows: [
            ['Pre-2018', 'Unlimited', 'Historical (pre-TCJA)'],
            ['2018-2025', '$10,000 ($5,000 MFS)', 'Original TCJA limit'],
            ['2025+', '$40,000 (projected)', 'H.R.1 increase (subject to phase-out)']
          ]
        },
        {
          title: 'What Qualifies as SALT',
          type: 'text',
          content: "**Deductible state and local taxes:**\n\n• State and local income taxes, OR\n• State and local sales taxes (elect one)\n• Real property taxes\n• Personal property taxes\n\n**NOT included:**\n• Foreign taxes (separate FTC)\n• Fees and assessments (non-tax)"
        },
        {
          title: '🧠 Memory Aid: SALT Components',
          type: 'callout',
          content: "**\"SIPR\"** for SALT:\n\n**S**tate income tax (or sales tax)\n**I**s limited to the cap\n**P**roperty tax (real property)\n**R**eal and personal property taxes\n\n**Choose income OR sales, not both!**"
        },
        {
          title: 'Phase-Out Structure',
          type: 'text',
          content: "**Higher cap phases out for wealthy:**\n\n• Full $40,000 cap: AGI under $500,000 (MFJ)\n• Reduced cap: AGI $500,000 - $1,000,000\n• Minimum cap: AGI over $1,000,000\n\n**Single filers: Half of MFJ thresholds**"
        },
        {
          title: 'Married Filing Separately',
          type: 'text',
          content: "**Special rules for MFS:**\n\n• Cap is HALF of the MFJ amount\n• $20,000 maximum (under new rules)\n• Phase-out thresholds also halved\n\n**Marriage penalty consideration!**"
        },
        {
          title: '⚠️ Exam Trap: Workarounds',
          type: 'warning',
          content: "**Common SALT workarounds:**\n\n• Pass-through entity tax elections (some states)\n• Charitable contributions to state credit programs\n• Business deductions on Schedule C/E\n\n**IRS has challenged some aggressive strategies!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SALT = State income/sales + Property taxes",
            "Original TCJA cap: $10,000 ($5,000 MFS)",
            "H.R.1 increases cap with phase-outs for high earners",
            "Must choose between income tax OR sales tax",
            "Property taxes are always included in SALT",
            "Business taxes on Sch C/E are NOT subject to SALT cap"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-028',
    section: 'REG',
    courseId: 'cpa',
    title: "Enhanced Child Tax Credit (H.R.1)",
    description: "Apply the expanded Child Tax Credit provisions",
    order: 83,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Taxation", "Tax Credits", "Legislative Updates"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The Child Tax Credit is one of the most valuable family tax benefits! H.R.1 enhances the credit amount and modifies eligibility. Understanding these changes is critical for REG!"
        },
        {
          title: 'CTC Enhancement Summary',
          type: 'table',
          headers: ['Element', 'Previous Law', 'H.R.1 Changes'],
          rows: [
            ['Credit Amount', '$2,000 per child', '$2,500 per child'],
            ['Refundable Portion', '$1,600 (ACTC)', '$2,000 (enhanced ACTC)'],
            ['Age Limit', 'Under 17', 'Under 18'],
            ['Phase-out Start (MFJ)', '$400,000', '$400,000 (unchanged)'],
            ['SSN Requirement', 'Required', 'Required (unchanged)']
          ]
        },
        {
          title: 'Qualifying Child Requirements',
          type: 'text',
          content: "**Child must meet ALL tests:**\n\n• **Age:** Under 18 at year-end (increased from 17)\n• **Relationship:** Son, daughter, stepchild, etc.\n• **Residency:** Lived with taxpayer > 6 months\n• **Support:** Child didn't provide > 50% of own support\n• **SSN:** Must have valid SSN\n• **Dependent:** Claimed as dependent on return"
        },
        {
          title: '🧠 Memory Aid: CTC Tests',
          type: 'callout',
          content: "**\"ARRSSD\"** for qualifying:\n\n**A**ge - Under 18 (H.R.1 change!)\n**R**elationship - Close family member\n**R**esidency - Lived together > 6 months\n**S**upport - Child not self-supporting\n**S**SN - Valid Social Security Number\n**D**ependent - Claimed on return\n\n**Remember: 18 is the NEW age limit!**"
        },
        {
          title: 'Refundable vs. Nonrefundable',
          type: 'text',
          content: "**Two components of CTC:**\n\n**Nonrefundable:** Reduces tax to zero\n**Refundable (ACTC):** Up to $2,000 refundable\n\n**ACTC calculation:**\n• 15% of earned income over $2,500\n• Capped at refundable limit\n\n**Must have earned income for refundable portion!**"
        },
        {
          title: 'Phase-Out Calculation',
          type: 'text',
          content: "**Credit reduces for high income:**\n\n• MFJ: Phase-out begins at $400,000\n• Other: Phase-out begins at $200,000\n• Reduction: $50 per $1,000 over threshold\n\n**Example:** MFJ with $420,000 AGI\n= $20,000 over ÷ $1,000 × $50\n= $1,000 reduction per child"
        },
        {
          title: '⚠️ Exam Trap: SSN Requirement',
          type: 'warning',
          content: "**SSN is STRICTLY required for CTC!**\n\n• ITIN holders do NOT qualify\n• SSN must be issued BEFORE due date\n• Adopted children: ATIN acceptable temporarily\n\n**No SSN = No CTC (but may get $500 ODC)**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "H.R.1 increases CTC to $2,500 per qualifying child",
            "Age limit increased to under 18 (was under 17)",
            "Refundable portion (ACTC) increased to $2,000",
            "Phase-out: $400,000 MFJ, $200,000 others",
            "Valid SSN required - no ITIN",
            "Must have earned income for refundable portion"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-029',
    section: 'REG',
    courseId: 'cpa',
    title: "Auto Loan Interest Deduction (H.R.1)",
    description: "Understand the new deduction for auto loan interest",
    order: 84,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Individual Taxation", "Itemized Deductions", "Legislative Updates"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "H.R.1 introduces a NEW deduction for auto loan interest on American-made vehicles! This is a significant departure from historical tax treatment of personal auto interest."
        },
        {
          title: 'Deduction Requirements',
          type: 'table',
          headers: ['Requirement', 'Details'],
          rows: [
            ['Vehicle Type', 'Must be assembled in the United States'],
            ['Use', 'Personal use (commuting, family)'],
            ['Loan Type', 'Secured auto loan from lender'],
            ['Maximum Deduction', 'Interest on first $100,000 of loan'],
            ['Deduction Type', 'Above-the-line (reduces AGI)']
          ]
        },
        {
          title: 'American-Made Requirement',
          type: 'text',
          content: "**Final assembly must be in USA:**\n\n• VIN identifies assembly location\n• Check EPA fuel economy label\n• Many \"foreign\" brands qualify (Toyota, Honda plants)\n• Some \"American\" brands don't (imported models)\n\n**Assembly location, not brand, determines eligibility!**"
        },
        {
          title: '🧠 Memory Aid: Auto Interest Rules',
          type: 'callout',
          content: "**\"MULA\"** for auto deduction:\n\n**M**ade in USA (final assembly)\n**U**p to $100,000 loan limit\n**L**oan interest only (not lease)\n**A**bove-the-line deduction\n\n**Unlike mortgage interest - this is above-the-line!**"
        },
        {
          title: 'Limitations',
          type: 'text',
          content: "**What does NOT qualify:**\n\n• Leased vehicles (no loan interest)\n• Foreign-assembled vehicles\n• Business-use portion (use Sch C instead)\n• Interest on loans over $100,000\n• Credit card interest used for car\n\n**Personal use, American-made, direct loan only!**"
        },
        {
          title: '⚠️ Exam Trap: Above-the-Line Benefit',
          type: 'warning',
          content: "**Unlike mortgage interest, auto interest is ABOVE-THE-LINE:**\n\n• Available even with standard deduction\n• Reduces AGI (helps other phase-outs)\n• No itemizing required\n\n**Much more valuable than if itemized!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "New H.R.1 deduction for auto loan interest",
            "Vehicle must be assembled in USA",
            "Maximum: Interest on $100,000 loan",
            "Above-the-line deduction (no itemizing needed)",
            "Leases do NOT qualify - must be loan",
            "Check VIN for assembly location"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-III-030',
    section: 'REG',
    courseId: 'cpa',
    title: "No Tax on Overtime (H.R.1)",
    description: "Apply the tax exemption for qualifying overtime pay",
    order: 85,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Individual Taxation", "Gross Income", "Legislative Updates"],
    blueprintArea: 'REG-III',
    blueprintTopic: 'REG-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "H.R.1 creates an above-the-line deduction for qualifying overtime pay! This major provision benefits millions of hourly workers and changes how overtime is taxed."
        },
        {
          title: 'Overtime Deduction Rules',
          type: 'table',
          headers: ['Element', 'Requirement'],
          rows: [
            ['Qualifying Overtime', 'Hours worked over 40/week'],
            ['Rate Requirement', 'Paid at 1.5x or higher regular rate'],
            ['Deduction Type', 'Above-the-line (reduces AGI)'],
            ['Documentation', 'Must be reported separately on W-2'],
            ['Income Limit', 'Phase-out for higher earners']
          ]
        },
        {
          title: 'Who Qualifies',
          type: 'text',
          content: "**Eligible workers:**\n\n• Non-exempt employees under FLSA\n• Hourly workers\n• Some salaried non-exempt employees\n\n**NOT eligible:**\n• Exempt employees (no OT premium)\n• Self-employed (no defined OT)\n• Gig workers (typically 1099)"
        },
        {
          title: '🧠 Memory Aid: OT Deduction',
          type: 'callout',
          content: "**\"FLOP\"** for overtime deduction:\n\n**F**LSA covered (non-exempt)\n**L**egitimate overtime (>40 hrs/week)\n**O**ne-and-a-half rate (minimum)\n**P**hase-out applies (income limits)\n\n**Must be TRUE overtime, not regular pay!**"
        },
        {
          title: 'Phase-Out Limits',
          type: 'text',
          content: "**Deduction reduces for higher earners:**\n\n• Single: Phase-out begins at $150,000\n• MFJ: Phase-out begins at $300,000\n• Completely phased out $50,000 above\n\n**Calculate without OT to determine eligibility**"
        },
        {
          title: '⚠️ Exam Trap: Still Subject to FICA',
          type: 'warning',
          content: "**Like tip income - FICA still applies!**\n\n• Social Security tax: Still withheld\n• Medicare tax: Still withheld\n• Employer taxes: Unchanged\n\n**Only federal INCOME tax is reduced!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "H.R.1 creates above-the-line deduction for overtime",
            "Only FLSA-covered overtime qualifies",
            "Must be paid at 1.5x or higher rate",
            "Phase-outs apply for higher income taxpayers",
            "FICA taxes still apply to overtime",
            "Must be separately identified on W-2"
          ]
        }
      ]
    }
  },
  // ==========================================
  // REG-V: TAX PROCEDURES & ADMINISTRATION
  // ==========================================
  {
    id: 'REG-V-003',
    section: 'REG',
    courseId: 'cpa',
    title: "IRS Audit Process and Taxpayer Rights",
    description: "Navigate IRS examinations and understand taxpayer protections",
    order: 86,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Tax Procedures", "IRS", "Taxpayer Rights"],
    blueprintArea: 'REG-V',
    blueprintTopic: 'REG-V-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Understanding the IRS audit process is essential for CPAs! You'll advise clients through examinations and must know their rights. The exam tests both procedures and taxpayer protections!"
        },
        {
          title: 'Types of IRS Examinations',
          type: 'table',
          headers: ['Type', 'Description', 'Scope'],
          rows: [
            ['Correspondence Audit', 'Mail-based, specific issues', 'Limited (1-2 items)'],
            ['Office Audit', 'At IRS office', 'Moderate (several items)'],
            ['Field Audit', 'At taxpayer location', 'Comprehensive (full return)'],
            ['TCMP Audit', 'Random selection, line-by-line', 'Complete (rare now)']
          ]
        },
        {
          title: 'Selection Methods',
          type: 'text',
          content: "**How returns are selected:**\n\n• **DIF Score:** Discriminant Function System scores deviation from norms\n• **Information Matching:** W-2s, 1099s don't match return\n• **Related Examinations:** Partner audits trigger related returns\n• **Industry Campaigns:** IRS targets specific industries\n• **Random Selection:** Small percentage for compliance studies"
        },
        {
          title: '🧠 Memory Aid: Taxpayer Bill of Rights',
          type: 'callout',
          content: "**\"RAPFI\"** for key rights:\n\n**R**ight to be informed\n**A**ppeal rights (independent review)\n**P**rivacy and confidentiality\n**F**inality (know when audit ends)\n**I**nnocent spouse relief\n\n**Plus:** Representation, quality service, challenge IRS position"
        },
        {
          title: 'Statute of Limitations',
          type: 'text',
          content: "**Time limits for IRS assessment:**\n\n• **Standard:** 3 years from filing or due date (later)\n• **25% Omission:** 6 years if >25% income omitted\n• **Fraud:** Unlimited - no statute\n• **No Return Filed:** Unlimited\n\n**Refund claims:** 3 years from filing OR 2 years from payment (later)"
        },
        {
          title: 'Examination Outcomes',
          type: 'table',
          headers: ['Outcome', 'Description', 'Next Step'],
          rows: [
            ['No Change', 'IRS accepts return as filed', 'Case closed'],
            ['Agreed', 'Taxpayer accepts adjustments', 'Sign Form 870, pay'],
            ['Unagreed', 'Taxpayer disagrees', 'Appeals or litigation']
          ]
        },
        {
          title: '⚠️ Exam Trap: Extending the Statute',
          type: 'warning',
          content: "**IRS can request extension (Form 872):**\n\n• Taxpayer may voluntarily extend\n• Often requested near statute expiration\n• Cannot be forced, but refusal may accelerate assessment\n\n**Strategic decision—consult carefully!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Three main audit types: Correspondence, Office, Field",
            "DIF scores identify returns that deviate from norms",
            "Standard statute of limitations: 3 years",
            "25% omission extends to 6 years; fraud is unlimited",
            "Taxpayers have formal rights (Taxpayer Bill of Rights)",
            "Can extend statute voluntarily via Form 872"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-V-004',
    section: 'REG',
    courseId: 'cpa',
    title: "IRS Appeals and Litigation",
    description: "Understand the administrative and judicial remedies for tax disputes",
    order: 87,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Tax Procedures", "Appeals", "Tax Court"],
    blueprintArea: 'REG-V',
    blueprintTopic: 'REG-V-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When taxpayers disagree with IRS findings, they have appeal options! Knowing the paths through Appeals and the courts is essential for representing clients effectively."
        },
        {
          title: 'Administrative Appeals',
          type: 'text',
          content: "**IRS Office of Appeals:**\n\n• Independent of examination function\n• Goal: Resolve disputes without litigation\n• Considers hazards of litigation\n• Can settle cases based on risk\n\n**How to access:**\n1. File written protest (if >$25,000)\n2. File small case request (if ≤$25,000)\n3. Conference with Appeals Officer"
        },
        {
          title: 'Judicial Forums',
          type: 'table',
          headers: ['Court', 'Payment Required?', 'Jury Trial?', 'Precedent'],
          rows: [
            ['Tax Court', 'No (petition before paying)', 'No', 'Follows own precedent'],
            ['District Court', 'Yes (pay first, sue for refund)', 'Yes', 'Follows Circuit Court'],
            ['Court of Federal Claims', 'Yes (pay first)', 'No', 'Follows Federal Circuit']
          ]
        },
        {
          title: '🧠 Memory Aid: Court Selection',
          type: 'callout',
          content: "**\"Don't Pay? Tax Court Today!\"**\n\n**Tax Court:** No payment required\n**District/Claims:** Pay first, sue for refund\n\n**Want jury?** District Court only\n**No payment?** Tax Court only"
        },
        {
          title: 'Tax Court Procedures',
          type: 'text',
          content: "**Regular Tax Court:**\n• Judges are tax specialists\n• Formal procedures\n• Decisions are precedential\n\n**Small Tax Cases (S Cases):**\n• Disputes ≤$50,000 per year\n• Simplified procedures\n• Decision is final, no appeal\n• Faster resolution"
        },
        {
          title: 'Appeal Path',
          type: 'text',
          content: "**Typical litigation flow:**\n\n1. IRS Notice of Deficiency (90-day letter)\n2. File petition in Tax Court (90 days)\n3. Trial and decision\n4. Appeal to Circuit Court\n5. Possible Supreme Court review\n\n**Miss 90-day deadline = Must pay first!**"
        },
        {
          title: '⚠️ Exam Trap: 90-Day Letter',
          type: 'warning',
          content: "**Notice of Deficiency (90-day letter):**\n\n• Required before Tax Court petition\n• 90 days to petition (150 if outside US)\n• Mailing is effective date\n• Missing deadline loses Tax Court access\n\n**Critical deadline—don't miss it!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Appeals Office: Independent review, settlement-oriented",
            "Tax Court: No prepayment, tax specialists",
            "District Court: Prepay required, jury available",
            "Court of Federal Claims: Prepay required, no jury",
            "90-day letter: Must petition within 90 days for Tax Court",
            "Small cases ≤$50K: Simplified, but no appeal"
          ]
        }
      ]
    }
  },
  {
    id: 'REG-V-005',
    section: 'REG',
    courseId: 'cpa',
    title: "Tax Penalties and Interest",
    description: "Apply accuracy-related, fraud, and failure-to-file/pay penalties",
    order: 88,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Tax Procedures", "Penalties", "Interest"],
    blueprintArea: 'REG-V',
    blueprintTopic: 'REG-V-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Tax penalties are heavily tested on REG! Understanding penalty rates, reasonable cause defenses, and how to avoid penalties is essential for tax practice and the exam!"
        },
        {
          title: 'Common Penalties',
          type: 'table',
          headers: ['Penalty', 'Rate', 'Trigger'],
          rows: [
            ['Failure to File', '5% per month, max 25%', 'Late filing'],
            ['Failure to Pay', '0.5% per month, max 25%', 'Late payment'],
            ['Accuracy-Related', '20% of underpayment', 'Negligence, substantial understatement'],
            ['Fraud', '75% of underpayment', 'Intentional tax evasion'],
            ['Frivolous Return', '$5,000', 'Tax protester positions']
          ]
        },
        {
          title: 'Accuracy-Related Penalties',
          type: 'text',
          content: "**20% penalty applies to:**\n\n• **Negligence:** Lack of reasonable attempt to comply\n• **Substantial Understatement:** Greater of 10% of tax or $5,000\n• **Substantial Valuation Misstatement:** 150%+ of correct value\n• **Transaction Without Economic Substance:** Lacks business purpose\n\n**Defenses:** Reasonable cause, good faith, adequate disclosure"
        },
        {
          title: '🧠 Memory Aid: Penalty Rates',
          type: 'callout',
          content: "**\"5-0.5-20-75\"**\n\n**5**% - Failure to File (per month)\n**0.5**% - Failure to Pay (per month)\n**20**% - Accuracy-Related\n**75**% - Fraud\n\n**Filing is 10x more penalized than paying!**"
        },
        {
          title: 'Reasonable Cause Defense',
          type: 'text',
          content: "**Penalties may be abated for reasonable cause:**\n\n• Death or serious illness\n• Unavoidable absence\n• Fire, casualty, or natural disaster\n• Inability to obtain records\n• Reliance on professional advice (if reasonable)\n\n**Must show ordinary business care and prudence**"
        },
        {
          title: 'Interest on Underpayments',
          type: 'text',
          content: "**Interest runs on:**\n\n• Tax underpayments\n• Penalties\n• From due date until paid\n\n**Rate:** Federal short-term rate + 3%\n**Compounded:** Daily\n\n**Interest CANNOT be waived** (unlike penalties)"
        },
        {
          title: '⚠️ Exam Trap: Combined Penalties',
          type: 'warning',
          content: "**When both FTF and FTP apply:**\n\n• Failure to File reduced by Failure to Pay amount\n• Effectively: FTF = 4.5%, FTP = 0.5%\n• Combined = 5% per month\n• Max FTF = 22.5%, Max FTP = 25%\n\n**Maximum combined = 47.5% + interest!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Failure to File: 5% per month (max 25%)",
            "Failure to Pay: 0.5% per month (max 25%)",
            "Accuracy-related: 20% for negligence, understatement",
            "Fraud: 75% of underpayment",
            "Reasonable cause can abate penalties, not interest",
            "Interest cannot be waived, runs from due date"
          ]
        }
      ]
    }
  }
];

