/**
 * CMA Part 2, Section F: Professional Ethics
 * Weight: 15% of Part 2 Exam
 * 
 * Topics covered:
 * - Business ethics
 * - Ethical considerations for management accounting and financial management
 * - Ethical considerations for organizations
 * 
 * Based on IMA CMA Content Specification Outline 2025-2026
 */

import { Lesson } from '../../../types';

export const cma2FLessons: Lesson[] = [
  // ============================================================================
  // CMA2-F: PROFESSIONAL ETHICS (Lessons 1-8)
  // ============================================================================
  
  {
    id: 'CMA2-F-001',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Foundations of Business Ethics',
    description: 'Understand ethical theories and their application in business decisions',
    order: 46,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Ethical theories', 'Moral reasoning', 'Stakeholder ethics', 'Corporate responsibility'],
    blueprintArea: 'CMA2-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Ethics is tested on EVERY CMA exam! As CMAs, we're trusted with financial information that affects decisions. One ethical lapse can destroy careers, companies, and public trust. Understanding ethical frameworks helps navigate tough decisions you'll face throughout your career.",
        },
        {
          title: 'Major Ethical Theories',
          type: 'table',
          headers: ['Theory', 'Core Idea', 'Decision Focus'],
          rows: [
            ['Utilitarianism', 'Greatest good for greatest number', 'Outcomes/consequences'],
            ['Deontology (Kant)', 'Duty-based ethics, universal rules', 'Actions themselves'],
            ['Virtue Ethics', 'Character and moral virtue', 'Who you should be'],
            ['Rights-Based', 'Fundamental human rights', 'Protecting individual rights'],
            ['Justice', 'Fair treatment and distribution', 'Equity and fairness'],
          ],
        },
        {
          title: 'Applying Ethical Theories',
          type: 'text',
          content: "**Utilitarianism:**\n\"What action produces the most benefit for most people?\"\n• Pros: Practical, measurable\n• Cons: May harm minorities, hard to measure all effects\n\n**Deontology:**\n\"What is my duty? Would I want this to be a universal rule?\"\n• Pros: Consistent principles, protects individuals\n• Cons: May be inflexible, conflicting duties\n\n**Virtue Ethics:**\n\"What would a person of good character do?\"\n• Pros: Develops moral character\n• Cons: Who defines virtue? Culture-dependent",
        },
        {
          title: '🧠 Memory Aid: Ethical Theories',
          type: 'callout',
          content: "**\"COR\"** - Three key questions:\n\n**C**onsequences - What results? (Utilitarianism)\n**O**bligation - What's my duty? (Deontology)\n**Rights** - Whose rights are at stake? (Rights-based)\n\n**Different theories may lead to different conclusions - that's why ethics is hard!**",
        },
        {
          title: 'Corporate Social Responsibility',
          type: 'text',
          content: "**Four levels (Carroll's Pyramid):**\n\n**1. Economic:** Be profitable (foundation)\n**2. Legal:** Obey the law\n**3. Ethical:** Do what's right, fair, just\n**4. Philanthropic:** Be a good corporate citizen\n\n**Stakeholder view:**\n• Companies responsible to ALL stakeholders\n• Employees, customers, communities, environment\n• Not just shareholders\n\n**Creating long-term sustainable value requires ethical behavior!**",
        },
        {
          title: 'Ethical Decision-Making Framework',
          type: 'text',
          content: "**Step-by-step approach:**\n\n1. **Identify** the ethical issue\n2. **Gather** relevant facts\n3. **Consider** affected stakeholders\n4. **Evaluate** alternatives (using ethical theories)\n5. **Decide** on best course of action\n6. **Act** with integrity\n7. **Reflect** on the outcome\n\n**Document your reasoning in sensitive situations!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Major theories: Utilitarianism (outcomes), Deontology (duty), Virtue (character)",
            "Theories may conflict - use multiple perspectives",
            "CSR: Economic, Legal, Ethical, Philanthropic responsibilities",
            "Stakeholder view expands accountability beyond shareholders",
            "Use structured framework for ethical decision-making",
            "Ethics is tested on every CMA exam",
            "Document reasoning for sensitive decisions",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-F-002',
    courseId: 'cma',
    section: 'CMA2',
    title: 'IMA Statement of Ethical Professional Practice',
    description: 'Apply IMA ethical standards to professional situations',
    order: 47,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['IMA ethics', 'Competence', 'Confidentiality', 'Integrity', 'Credibility'],
    blueprintArea: 'CMA2-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "As a CMA, you're bound by IMA's Statement of Ethical Professional Practice. This is THE document you must know cold for the exam! It provides specific guidance for situations you'll encounter. Violations can result in losing your certification.",
        },
        {
          title: 'Overarching Ethical Principles',
          type: 'text',
          content: "**Four principles guide all professional behavior:**\n\n**Honesty:** Be truthful in all professional and business relationships.\n\n**Fairness:** Deal with others fairly, equitably, and without bias.\n\n**Objectivity:** Communicate information fairly and objectively, without undue influence of your own interests.\n\n**Responsibility:** Use professional judgment responsibly, ethically, and for the benefit of stakeholders.",
        },
        {
          title: 'Standard 1: Competence',
          type: 'text',
          content: "**Members have responsibility to:**\n\n• Maintain appropriate level of professional expertise through ongoing development\n\n• Perform duties in accordance with relevant laws, regulations, and standards\n\n• Provide decision support information and recommendations that are accurate, clear, concise, and timely\n\n• Recognize and communicate professional limitations that would preclude responsible judgment",
        },
        {
          title: 'Standard 2: Confidentiality',
          type: 'text',
          content: "**Members have responsibility to:**\n\n• Keep information confidential except when disclosure is authorized or legally required\n\n• Inform all relevant parties regarding appropriate use of confidential information\n\n• Refrain from using confidential information for unethical or illegal advantage",
        },
        {
          title: 'Standard 3: Integrity',
          type: 'text',
          content: "**Members have responsibility to:**\n\n• Mitigate actual conflicts of interest\n\n• Regularly communicate with business associates to avoid apparent conflicts of interest\n\n• Refrain from conduct that would prejudice carrying out duties ethically\n\n• Refrain from engaging in or supporting any activity that might discredit the profession",
        },
        {
          title: 'Standard 4: Credibility',
          type: 'text',
          content: "**Members have responsibility to:**\n\n• Communicate information fairly and objectively\n\n• Disclose all relevant information that could influence users' understanding of reports, analyses, or recommendations\n\n• Delay or deficiencies in information, timeliness, processing, or internal controls in conformance with organization policy and/or applicable law",
        },
        {
          title: '🧠 Memory Aid: IMA Standards',
          type: 'callout',
          content: "**\"CCIC\"** - The four standards:\n\n**C**ompetence - Be capable (skills, knowledge)\n**C**onfidentiality - Keep secrets (don't misuse info)\n**I**ntegrity - Be honest (avoid conflicts)\n**C**redibility - Be believable (fair communication)\n\n**Each standard has specific requirements - know them!**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four principles: Honesty, Fairness, Objectivity, Responsibility",
            "Four standards: Competence, Confidentiality, Integrity, Credibility",
            "Competence: Maintain skills, recognize limitations",
            "Confidentiality: Don't disclose unless authorized/required",
            "Integrity: Avoid conflicts, don't discredit profession",
            "Credibility: Fair communication, disclose all relevant info",
            "Violation can result in loss of CMA certification",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-F-003',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Resolving Ethical Conflicts',
    description: 'Follow IMA guidance for resolving ethical dilemmas',
    order: 48,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Conflict resolution', 'Escalation', 'Whistleblowing', 'Documentation'],
    blueprintArea: 'CMA2-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Knowing the right thing to do is one challenge; knowing HOW to act is another. IMA provides a specific process for resolving ethical conflicts. Following this process protects you, provides documentation, and increases the chance of ethical resolution.",
        },
        {
          title: 'IMA Resolution Process',
          type: 'text',
          content: "**Step-by-step guidance from IMA:**\n\n**1. Follow organization policies first**\n• Use established reporting channels\n• Check employee handbook, ethics policies\n\n**2. Discuss with immediate supervisor**\n• Unless supervisor is involved\n• Seek clarification of issue\n\n**3. Escalate within organization**\n• Next level of management\n• Audit committee if appropriate\n\n**4. Seek confidential advice**\n• IMA Ethics Helpline\n• Legal counsel\n• Personal advisors",
        },
        {
          title: 'Resolution Flowchart',
          type: 'table',
          headers: ['Step', 'Action', 'If Unresolved'],
          rows: [
            ['1', 'Follow organization policies', 'Proceed to Step 2'],
            ['2', 'Discuss with supervisor', 'Escalate if needed'],
            ['3', 'Higher management/audit committee', 'Seek outside advice'],
            ['4', 'Confidential advice (IMA, attorney)', 'Consider resignation'],
            ['5', 'Consult attorney on legal obligations', 'External reporting if required'],
          ],
        },
        {
          title: '🧠 Memory Aid: Resolution Steps',
          type: 'callout',
          content: "**\"PESCA\"** - Path to resolution:\n\n**P**olicies first (organization's)\n**E**scalate internally (supervisor, then higher)\n**S**eek advice (IMA, legal)\n**C**onsider all options\n**A**ct with integrity\n\n**Document every step you take!**",
        },
        {
          title: 'Whistleblowing Considerations',
          type: 'text',
          content: "**When internal resolution fails:**\n\n**Legal requirements to report:**\n• Illegal activity\n• Securities violations\n• Fraud\n\n**Whistleblower protections:**\n• SOX protects employees of public companies\n• Dodd-Frank provides financial incentives\n• State laws vary\n\n**Before external reporting:**\n• Consult attorney\n• Understand risks and protections\n• Ensure facts are accurate\n\n**IMA does NOT require external reporting but doesn't prohibit it either**",
        },
        {
          title: 'Documentation Best Practices',
          type: 'text',
          content: "**Keep records of:**\n• Date and nature of ethical concern\n• People consulted and their responses\n• Actions taken and outcomes\n• Communications (emails, memos)\n\n**Why document?**\n• Demonstrates good faith effort\n• Protects you if questioned later\n• Supports legal proceedings if needed\n• Helps recall details accurately\n\n**Store securely; consider personal copies**",
        },
        {
          title: 'When There Is No Clear Answer',
          type: 'text',
          content: "**Sometimes no option is perfect:**\n\n**Consider:**\n• Least harm option\n• Your personal values\n• Long-term consequences\n• What you can live with\n\n**Remember:**\n• Ethical dilemmas are genuinely difficult\n• Reasonable people may disagree\n• Process matters as much as outcome\n• Your reputation is built on how you handle tough situations\n\n**Resignation may be appropriate if organization demands unethical action**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Follow IMA resolution process: Policies → Supervisor → Escalate → Seek advice",
            "Skip supervisor if they're involved in the issue",
            "IMA Ethics Helpline provides confidential guidance",
            "Consult attorney before external whistleblowing",
            "Document all steps and communications",
            "SOX and Dodd-Frank provide whistleblower protections",
            "Resignation may be necessary if organization demands unethical action",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-F-004',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Common Ethical Dilemmas for CMAs',
    description: 'Recognize and address typical ethical situations in management accounting',
    order: 49,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Earnings management', 'Conflicts of interest', 'Pressure situations', 'Case studies'],
    blueprintArea: 'CMA2-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "You WILL face ethical pressure in your career. Knowing common scenarios helps you recognize them and respond appropriately. The exam often presents scenarios and asks you to identify the ethical issue and best response.",
        },
        {
          title: 'Earnings Management Pressure',
          type: 'text',
          content: "**Scenario:**\nManager asks you to delay recording an expense to next quarter to meet targets.\n\n**Ethical issues:**\n• Violates GAAP matching principle\n• Misleads investors/stakeholders\n• May constitute fraud\n\n**Response:**\n• Explain why you cannot comply\n• Cite professional standards\n• Escalate if manager persists\n• Document the request and your response",
        },
        {
          title: 'Conflicts of Interest',
          type: 'text',
          content: "**Scenario:**\nYour company is evaluating vendors. Your brother owns one of the competing vendors.\n\n**Ethical issues:**\n• Actual conflict of interest\n• Could bias your analysis\n• Even if fair, appearance of conflict\n\n**Response:**\n• Disclose relationship immediately\n• Recuse yourself from decision\n• Do NOT simply \"be fair\" - conflicts should be avoided, not just managed",
        },
        {
          title: 'Common Pressure Situations',
          type: 'table',
          headers: ['Situation', 'Pressure', 'Ethical Response'],
          rows: [
            ['Budget padding', 'Include cushion for cuts', 'Present honest estimates'],
            ['Expense classification', 'Capitalize to boost income', 'Follow GAAP standards'],
            ['Reserve manipulation', 'Release reserves to meet targets', 'Document and refuse'],
            ['Side agreement', 'Sign revenue letter for deal', 'Refuse contingent deals'],
            ['Data manipulation', 'Change assumptions in model', 'Disclose all assumptions'],
          ],
        },
        {
          title: '🧠 Memory Aid: Red Flags',
          type: 'callout',
          content: "**\"PUSH\"** - Warning signs of unethical pressure:\n\n**P**ressure to meet targets at any cost\n**U**nusual requests near period end\n**S**ecrecy or \"just between us\" requests\n**H**urry (\"do this now, no time to discuss\")\n\n**When you feel PUSHED, slow down and think!**",
        },
        {
          title: 'Confidentiality Scenarios',
          type: 'text',
          content: "**Scenario 1:**\nFormer colleague at another company asks about your employer's plans.\n→ Refuse; information is confidential\n\n**Scenario 2:**\nYou learn your company will lay off 500 people; your neighbor works there.\n→ Cannot warn; confidential until announced\n\n**Scenario 3:**\nYou discover your company is dumping toxic waste illegally.\n→ May have legal obligation to report (consult attorney)\n\n**Confidentiality has limits when laws are broken!**",
        },
        {
          title: 'Personal Financial Interest',
          type: 'text',
          content: "**Scenario:**\nYou're analyzing a project. You'd personally benefit from its approval (bonus, promotion).\n\n**Issues:**\n• Self-interest threatens objectivity\n• May unconsciously bias analysis\n\n**Response:**\n• Disclose your interest to decision-makers\n• Have analysis reviewed by others\n• Consider recusal if conflict is significant\n\n**Integrity standard requires avoiding even APPARENT conflicts**",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Earnings management pressure is common - refuse and document",
            "Conflicts of interest must be disclosed and avoided",
            "When pressured (PUSH): slow down, think, document",
            "Confidentiality has limits when laws are broken",
            "Personal financial interest must be disclosed",
            "Appearance of conflict is as problematic as actual conflict",
            "Always document requests that cross ethical lines",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-F-005',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Fraud and Ethical Failures',
    description: 'Learn from major corporate scandals and fraud cases',
    order: 50,
    duration: 50,
    difficulty: 'intermediate',
    topics: ['Corporate scandals', 'Fraud triangle', 'Warning signs', 'Lessons learned'],
    blueprintArea: 'CMA2-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Learning from others' failures helps prevent future ones. Major scandals (Enron, WorldCom, etc.) led to regulations we live with today. Understanding what went wrong helps you recognize early warning signs and protect your organization.",
        },
        {
          title: 'The Fraud Triangle Review',
          type: 'text',
          content: "**Three conditions for fraud:**\n\n**Pressure (Motivation):**\n• Financial problems\n• Unrealistic targets\n• Personal issues (gambling, addiction)\n\n**Opportunity:**\n• Weak internal controls\n• Override of controls\n• Lack of oversight\n\n**Rationalization:**\n• \"Everyone does it\"\n• \"The company owes me\"\n• \"Just borrowing, will pay back\"\n\n**All three present in major frauds!**",
        },
        {
          title: 'Case Study: Enron',
          type: 'text',
          content: "**What happened:**\n• Used SPEs to hide debt\n• Marked-to-market accounting abused\n• Revenue overstated by billions\n• Executives sold stock before collapse\n\n**Ethical failures:**\n• Tone at top was win-at-all-costs\n• Auditor (Arthur Andersen) compromised\n• Board oversight inadequate\n• Truth-tellers silenced\n\n**Result:** SOX enacted, auditor independence rules",
        },
        {
          title: 'Case Study: WorldCom',
          type: 'table',
          headers: ['Issue', 'What They Did', 'Impact'],
          rows: [
            ['Line cost capitalization', 'Capitalized $3.8B in expenses', 'Overstated assets, income'],
            ['Revenue manipulation', 'Bogus revenue entries', 'Inflated top line'],
            ['Reserve releases', 'Released reserves to income', 'Artificial profit'],
            ['CEO pressure', 'Hit numbers at all costs', 'Culture of fraud'],
          ],
        },
        {
          title: '🧠 Memory Aid: Fraud Warning Signs',
          type: 'callout',
          content: "**\"GONE\"** - Management fraud indicators:\n\n**G**reed (excessive compensation focus)\n**O**pportunity (weak controls)\n**N**eed (pressure to meet expectations)\n**E**xposure (risk of detection low)\n\n**Also watch for:** Complex structures, related parties, aggressive accounting, silenced dissenters",
        },
        {
          title: 'Lessons for CMAs',
          type: 'text',
          content: "**From major frauds:**\n\n• **Tone at top matters:** Unethical leadership corrupts culture\n• **Controls can be overridden:** Governance must check management\n• **Complexity obscures:** Simple, transparent reporting helps\n• **Incentives drive behavior:** Poorly designed bonuses encourage fraud\n• **Speak up early:** Small issues become big ones\n• **Documentation matters:** Paper trail helps investigations\n\n**CMAs are often first to see warning signs!**",
        },
        {
          title: 'Regulatory Response',
          type: 'text',
          content: "**Post-scandal reforms:**\n\n**Sarbanes-Oxley (2002):**\n• CEO/CFO certification\n• Internal control requirements\n• Audit committee independence\n• Whistleblower protections\n\n**Dodd-Frank (2010):**\n• Enhanced whistleblower incentives\n• Executive compensation clawbacks\n• Risk committee requirements\n\n**Result:** More accountability, but also more compliance burden",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Fraud triangle: Pressure, Opportunity, Rationalization",
            "Enron: SPE abuse, mark-to-market manipulation",
            "WorldCom: Capitalizing expenses, reserve manipulation",
            "Warning signs: GONE (Greed, Opportunity, Need, Exposure)",
            "Tone at top is critical - unethical leaders corrupt culture",
            "CMAs often first to see warning signs - speak up!",
            "SOX and Dodd-Frank were regulatory responses to fraud",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-F-006',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Organizational Ethics Programs',
    description: 'Design and implement effective organizational ethics programs',
    order: 51,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Ethics programs', 'Codes of conduct', 'Training', 'Compliance'],
    blueprintArea: 'CMA2-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "CMAs help build ethical organizations, not just follow rules. An effective ethics program prevents problems and creates competitive advantage through trust. You may be asked to help design, implement, or evaluate your organization's ethics program.",
        },
        {
          title: 'Elements of Effective Ethics Programs',
          type: 'text',
          content: "**DOJ/SEC Federal Sentencing Guidelines elements:**\n\n1. Written standards and procedures\n2. Oversight by high-level personnel\n3. Due diligence in hiring\n4. Effective communication and training\n5. Monitoring, auditing, and reporting systems\n6. Consistent enforcement and discipline\n7. Response to problems and remediation\n\n**Having these elements can reduce penalties if violations occur!**",
        },
        {
          title: 'Code of Conduct',
          type: 'text',
          content: "**Core document for organizational ethics:**\n\n**Should include:**\n• Statement of values\n• Specific prohibited conduct\n• Reporting mechanisms\n• Non-retaliation policy\n• Consequences for violations\n\n**Best practices:**\n• Clear and understandable language\n• Practical examples\n• Regularly updated\n• Signed acknowledgment by employees\n• Available in multiple languages if needed",
        },
        {
          title: 'Ethics Training',
          type: 'table',
          headers: ['Element', 'Best Practice', 'Common Mistake'],
          rows: [
            ['Content', 'Relevant scenarios', 'Abstract theory only'],
            ['Frequency', 'Annual with updates', 'One-time only'],
            ['Format', 'Interactive, discussion', 'Boring video/click-through'],
            ['Audience', 'Tailored by role/risk', 'One size fits all'],
            ['Assessment', 'Test understanding', 'No validation'],
          ],
        },
        {
          title: '🧠 Memory Aid: Ethics Program',
          type: 'callout',
          content: "**\"CODE\"** - Key program elements:\n\n**C**ode of conduct (written standards)\n**O**versight (high-level commitment)\n**D**etection (monitoring, hotlines)\n**E**nforcement (consistent discipline)\n\n**An ethics program without enforcement is just decoration!**",
        },
        {
          title: 'Tone at the Top and Middle',
          type: 'text',
          content: "**Tone at the top:**\n• CEO and senior leaders model ethical behavior\n• Ethics is part of strategic discussions\n• Resources committed to ethics program\n• Ethical behavior rewarded\n\n**Tone in the middle:**\n• Middle managers translate values to action\n• Supervisors enforce day-to-day standards\n• Local leaders critical for culture\n\n**Employees watch what leaders DO, not just what they say!**",
        },
        {
          title: 'Measuring Ethics Program Effectiveness',
          type: 'text',
          content: "**Metrics to track:**\n• Hotline call volume and types\n• Survey results on ethical culture\n• Training completion rates\n• Time to investigate allegations\n• Substantiation rates\n• Discipline consistency\n\n**Warning signs:**\n• Very few or no hotline calls (fear?)\n• Low survey participation\n• Inconsistent discipline\n• Managers exempt from rules",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Effective programs have 7 federal guideline elements",
            "Code of conduct is the core document",
            "Training should be relevant, interactive, regular",
            "Tone at top AND middle both matter",
            "Monitor effectiveness through metrics and surveys",
            "Very few hotline calls may indicate fear, not ethics",
            "Consistent enforcement is essential - no exceptions for leaders",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-F-007',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Global and Cultural Ethics',
    description: 'Navigate ethical considerations across different cultures and jurisdictions',
    order: 52,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Global ethics', 'Cultural differences', 'FCPA', 'Bribery'],
    blueprintArea: 'CMA2-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Global business means operating across different ethical norms. What's acceptable in one country may be illegal or unethical in another. CMAs must navigate these differences while maintaining professional standards and legal compliance.",
        },
        {
          title: 'Ethical Relativism vs. Universalism',
          type: 'text',
          content: "**Ethical Relativism:**\n• Ethics determined by local culture\n• \"When in Rome, do as Romans do\"\n• Risk: Anything can be justified\n\n**Ethical Universalism:**\n• Some principles apply everywhere\n• Core human rights transcend culture\n• Challenge: Who decides universal values?\n\n**Practical approach:**\n• Some things are NEVER acceptable (bribery, forced labor)\n• Other practices may vary (gifts, relationships)\n• Know your company's global standards",
        },
        {
          title: 'FCPA and Anti-Bribery',
          type: 'table',
          headers: ['Act', 'Coverage', 'Key Provisions'],
          rows: [
            ['FCPA (US)', 'US companies, persons', 'Anti-bribery + Books/records'],
            ['UK Bribery Act', 'UK companies, global reach', 'Broadest - commercial bribery too'],
            ['OECD Convention', '44 countries', 'Framework for anti-bribery laws'],
          ],
        },
        {
          title: 'What Constitutes a Bribe?',
          type: 'text',
          content: "**Prohibited payments:**\n• Cash to government officials\n• Lavish gifts to influence decisions\n• Travel/entertainment beyond business purpose\n• Payments through intermediaries\n• Political contributions to gain favor\n\n**Generally acceptable:**\n• Modest business gifts (company policy limits)\n• Reasonable business entertainment\n• Facilitation payments (FCPA only, still risky)\n\n**When in doubt, DON'T!**",
        },
        {
          title: '🧠 Memory Aid: Gift/Entertainment Test',
          type: 'callout',
          content: "**\"GOLD\"** - Is this gift acceptable?\n\n**G**enuine business purpose?\n**O**pen and transparent?\n**L**egal in both countries?\n**D**ocumented and approved?\n\n**If NO to any, decline or return!**",
        },
        {
          title: 'Third-Party Risk',
          type: 'text',
          content: "**Agents, distributors, JV partners:**\n• May engage in bribery on your behalf\n• Company still liable!\n\n**Due diligence required:**\n• Background checks\n• Reasonable compensation (not suspiciously high)\n• Contract provisions forbidding bribery\n• Audit rights\n• Training requirements\n\n**Red flags:**\n• \"We need extra for customs officials\"\n• Requests for cash or unusual payments\n• Agent connected to government officials",
        },
        {
          title: 'Cultural Business Practices',
          type: 'text',
          content: "**Navigating cultural differences:**\n\n**Gift-giving cultures:**\n• Refusing gifts may insult\n• Accept graciously, disclose, check limits\n• Reciprocate appropriately\n\n**Relationship-based cultures:**\n• Business built on personal trust\n• Entertainment is relationship building\n• Document business purpose\n\n**Hierarchy-focused cultures:**\n• Decisions require senior approval\n• May delay ethical issue escalation\n• Ensure alternative reporting channels exist",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Core ethical standards (no bribery) apply universally",
            "FCPA/UK Bribery Act have broad, extraterritorial reach",
            "Third parties can create liability - due diligence required",
            "Use GOLD test for gifts/entertainment",
            "Cultural sensitivity ≠ ethical compromise",
            "Document business purpose for entertainment expenses",
            "When in doubt, get guidance from legal/compliance",
          ],
        },
      ],
    },
  },

  {
    id: 'CMA2-F-008',
    courseId: 'cma',
    section: 'CMA2',
    title: 'Building an Ethical Career',
    description: 'Develop and maintain ethical practices throughout your professional life',
    order: 53,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Career ethics', 'Professional development', 'Reputation', 'Leadership'],
    blueprintArea: 'CMA2-F',
    content: {
      sections: [
        {
          title: 'Why This Matters for Management Accountants',
          type: 'callout',
          content: "Your career is a marathon, not a sprint. The ethical choices you make today build (or destroy) the reputation you'll carry for decades. CMAs who consistently act with integrity become trusted advisors and leaders. Ethics isn't just tested on the exam - it's tested every day of your career!",
        },
        {
          title: 'Building Ethical Reputation',
          type: 'text',
          content: "**Reputation is your most valuable asset:**\n\n**Takes years to build:**\n• Consistent ethical behavior\n• Delivering on commitments\n• Being honest even when difficult\n• Helping others succeed\n\n**Seconds to destroy:**\n• One ethical lapse can end career\n• Social media amplifies mistakes\n• Industry networks spread news fast\n\n**Warren Buffett:** \"It takes 20 years to build a reputation and 5 minutes to destroy it.\"",
        },
        {
          title: 'Career Decision Framework',
          type: 'table',
          headers: ['Consideration', 'Questions to Ask'],
          rows: [
            ['Legality', 'Is this action legal?'],
            ['Compliance', 'Does it follow policies and standards?'],
            ['Public test', 'Would I be comfortable if this were public?'],
            ['Role model', 'Would I want others to follow this example?'],
            ['Sleep test', 'Can I sleep well after this decision?'],
            ['Family test', 'Would I be proud to tell my family?'],
          ],
        },
        {
          title: 'Continuing Professional Development',
          type: 'text',
          content: "**IMA CPE Requirements:**\n• 30 hours annually\n• 2 hours ethics required\n\n**Beyond minimums:**\n• Stay current with standards changes\n• Understand emerging technologies\n• Develop leadership skills\n• Build cross-functional knowledge\n\n**Competence is an ethical requirement:**\nPerforming work beyond your capability is an ethical violation!",
        },
        {
          title: '🧠 Memory Aid: Ethical Daily Practice',
          type: 'callout',
          content: "**\"DAILY\"** - Ethics every day:\n\n**D**ocument important decisions\n**A**sk questions when uncertain\n**I**ntegrity in small things\n**L**earn from mistakes\n**Y**our reputation matters\n\n**Small daily choices build ethical habits!**",
        },
        {
          title: 'When to Walk Away',
          type: 'text',
          content: "**Sometimes resignation is the ethical choice:**\n\n**Consider leaving when:**\n• Organization demands unethical actions\n• Culture is fundamentally corrupt\n• Your concerns are repeatedly ignored\n• Staying associates you with wrongdoing\n\n**Before resigning:**\n• Exhaust internal remedies\n• Document your efforts\n• Consult attorney\n• Consider financial implications\n\n**Your integrity is worth more than any job!**",
        },
        {
          title: 'Ethical Leadership',
          type: 'text',
          content: "**As you advance:**\n\n**Model behavior:**\n• Your actions set the standard\n• People watch leaders, not posters\n• Consistency is critical\n\n**Create environment for ethics:**\n• Reward ethical behavior\n• Make speaking up safe\n• Investigate concerns promptly\n• Handle mistakes with fairness\n\n**Hire and promote for ethics:**\n• Technical skills can be taught\n• Character is harder to change",
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Reputation is your most valuable career asset",
            "Apply multiple tests: Legal, Public, Role model, Sleep, Family",
            "Competence is an ethical requirement - keep learning",
            "Small daily choices build ethical habits (DAILY)",
            "Sometimes resignation is the ethical choice",
            "As a leader, model behavior and create safe environment",
            "Your integrity is worth more than any job",
          ],
        },
      ],
    },
  },
];

// Helper functions
export const getCMA2FLessons = () => cma2FLessons;
export const getCMA2FLessonById = (id: string) => cma2FLessons.find(lesson => lesson.id === id);
export const getCMA2FLessonCount = () => cma2FLessons.length;

export default cma2FLessons;
