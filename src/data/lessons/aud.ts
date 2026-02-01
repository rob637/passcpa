import { Lesson } from '../../types';

export const audLessons: Lesson[] = [
  {
    id: 'AUD-I-001',
    section: 'AUD',
    title: "Nature & Scope of Audit Engagements",
    description: "Understand the different types of engagements CPAs perform and the assurance spectrum",
    order: 1,
    duration: 45,
    difficulty: 'beginner',
    topics: ["Engagements", "Assurance"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Understanding the different types of engagements CPAs perform is FUNDAMENTAL to AUD. The exam tests your ability to distinguish between audits, reviews, compilations, and other services—and to know what level of assurance each provides!"
        },
        {
          title: 'The Assurance Spectrum',
          type: 'text',
          content: "**Assurance = Confidence in the reliability of information**\n\n**Levels of assurance from highest to lowest:**\n\n1. **Audit (Examination):** Reasonable assurance (HIGH)\n2. **Review:** Limited assurance (MODERATE)\n3. **Compilation/Preparation:** No assurance (NONE)\n4. **Agreed-Upon Procedures:** No opinion—just report findings\n\n**Key concept:** More assurance = More work = More cost"
        },
        {
          title: 'Types of CPA Engagements',
          type: 'table',
          headers: ['Engagement', 'Assurance Level', 'Opinion/Report', 'Standards'],
          rows: [
            ['Financial Statement Audit', 'Reasonable', 'Opinion on F/S', 'GAAS (SAS)'],
            ['Review of F/S', 'Limited', 'Conclusion', 'SSARS'],
            ['Compilation', 'None', 'No assurance', 'SSARS'],
            ['Preparation', 'None', 'No report required', 'SSARS'],
            ['Examination (Attestation)', 'Reasonable', 'Opinion', 'SSAE'],
            ['Review (Attestation)', 'Limited', 'Conclusion', 'SSAE'],
            ['Agreed-Upon Procedures', 'None', 'Findings only', 'SSAE']
          ]
        },
        {
          title: '🧠 Memory Aid: Assurance Levels',
          type: 'callout',
          content: "**\"ARLC\" = Audit, Review, Limited procedures, Compilation**\n\n**Think of it as a staircase:**\n🔝 AUDIT - \"I'm POSITIVE this is fairly stated\" (reasonable)\n📊 REVIEW - \"Nothing came to my attention\" (limited)\n📝 COMPILATION - \"I just organized their numbers\" (none)\n\n**Reasonable ≠ Absolute!** Even audits provide REASONABLE, not absolute, assurance."
        },
        {
          title: 'What is an Audit?',
          type: 'text',
          content: "**Definition:** Systematic process of objectively obtaining and evaluating evidence about assertions to form an opinion.\n\n**Purpose:** Express an opinion on whether financial statements are fairly presented in accordance with the applicable framework (GAAP, IFRS, etc.)\n\n**Key characteristics:**\n• Independence REQUIRED\n• Tests of controls and substantive procedures\n• Reasonable (not absolute) assurance\n• Expresses OPINION"
        },
        {
          title: 'Reasonable Assurance Explained',
          type: 'text',
          content: "**Why not absolute assurance?**\n\n**Inherent limitations of an audit:**\n• Sampling (can't test everything)\n• Judgment involved in selecting procedures\n• Management representations required\n• Persuasive, not conclusive, evidence\n• Concealment and collusion by management\n• Internal control limitations\n\n**Reasonable assurance = HIGH level of assurance**\n(but acknowledges limitations exist)"
        },
        {
          title: 'Review vs Audit',
          type: 'text',
          content: "**Review engagements:**\n• LIMITED assurance\n• Primarily inquiry and analytical procedures\n• NO tests of internal controls\n• NO detailed substantive testing\n• CONCLUSION (not opinion)\n• Less expensive than audit\n\n**Wording difference:**\n• Audit: \"In our OPINION, the F/S are fairly presented...\"\n• Review: \"We are not aware of any material modifications...\""
        },
        {
          title: 'Compilation and Preparation',
          type: 'text',
          content: "**Compilation:**\n• Present management's financial data in F/S format\n• NO assurance provided\n• Report states no assurance given\n• Independence NOT required (but must disclose if not independent)\n\n**Preparation:**\n• Prepare F/S using client records\n• NO assurance\n• NO report required\n• Must include \"no assurance\" legend on each page"
        },
        {
          title: '⚠️ Exam Trap: Standards Framework',
          type: 'warning',
          content: "**Know which standards apply:**\n\n**GAAS (SAS) - Generally Accepted Auditing Standards:**\n• Financial statement AUDITS of nonissuers\n\n**PCAOB Standards:**\n• Audits of ISSUERS (public companies)\n\n**SSARS - Statements on Standards for Accounting and Review Services:**\n• Compilations, Reviews, Preparations\n\n**SSAE - Statements on Standards for Attestation Engagements:**\n• Examination, Review, AUP of subject matter OTHER than F/S"
        },
        {
          title: 'Issuer vs Nonissuer',
          type: 'text',
          content: "**Issuer (Public Company):**\n• Registered with SEC\n• Subject to PCAOB standards\n• Integrated audit (F/S + ICFR)\n• Critical Audit Matters (CAMs) required\n\n**Nonissuer (Private Company):**\n• Not SEC registered\n• Subject to AICPA standards (GAAS)\n• ICFR audit optional\n• Key Audit Matters (KAMs) optional"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Audit provides REASONABLE assurance; review provides LIMITED assurance",
            "Compilation and preparation provide NO assurance",
            "GAAS/SAS for nonissuer audits; PCAOB for issuer audits",
            "SSARS for compilations, reviews, preparations",
            "SSAE for attestation engagements on subject matter other than F/S",
            "Reasonable assurance acknowledges inherent audit limitations",
            "Independence required for audits and reviews; disclosed if lacking for compilations"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-I-002',
    section: 'AUD',
    title: "AICPA Code of Professional Conduct",
    description: "Master the ethical principles and rules governing CPA conduct",
    order: 2,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Ethics", "Professional Conduct"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The AICPA Code of Professional Conduct is the ethical foundation of the CPA profession. Understanding these principles and rules—especially independence, integrity, and objectivity—is heavily tested on FAR and essential for your career!"
        },
        {
          title: 'Structure of the Code',
          type: 'text',
          content: "**The Code consists of:**\n\n**1. Principles:** Aspirational goals (6 principles)\n**2. Rules:** Enforceable standards\n**3. Interpretations:** Guidance on applying rules\n**4. Other Guidance:** Nonauthoritative help\n\n**Organized by member type:**\n• Members in Public Practice\n• Members in Business\n• Other Members"
        },
        {
          title: 'Six Principles of Professional Conduct',
          type: 'table',
          headers: ['Principle', 'Description'],
          rows: [
            ['Responsibilities', 'Exercise sensitive professional and moral judgments'],
            ['Public Interest', 'Act in a way that serves the public interest'],
            ['Integrity', 'Maintain highest sense of integrity'],
            ['Objectivity & Independence', 'Maintain objectivity; be independent when required'],
            ['Due Care', 'Observe technical and ethical standards'],
            ['Scope & Nature', 'Observe Codes principles in determining scope of services']
          ]
        },
        {
          title: '🧠 Memory Aid: The 6 Principles',
          type: 'callout',
          content: "**\"RIPODS\"** (like iPods but for ethics!)\n\n**R**esponsibilities\n**I**ntegrity\n**P**ublic interest\n**O**bjectivity & independence\n**D**ue care\n**S**cope & nature of services\n\n**Or think:** A CPA's reputation depends on these 6 pillars!"
        },
        {
          title: 'Integrity',
          type: 'text',
          content: "**Definition:** Being honest and candid within constraints of client confidentiality\n\n**Key requirements:**\n• Don't subordinate judgment to others\n• Don't knowingly misrepresent facts\n• Don't allow bias or conflict of interest\n\n**Integrity breach examples:**\n• Signing off on false financial statements\n• Omitting material information\n• Misrepresenting qualifications"
        },
        {
          title: 'Objectivity and Independence',
          type: 'text',
          content: "**Objectivity:** Freedom from conflicts of interest\n\n**Independence:**\n• Required for ATTEST services (audit, review, examination)\n• Two aspects:\n  - Independence in FACT (state of mind)\n  - Independence in APPEARANCE (perception)\n\n**Not required for:** Compilations, tax services, consulting (though objectivity still required)"
        },
        {
          title: 'General Standards',
          type: 'text',
          content: "**All members must:**\n\n**1. Professional Competence:**\n• Undertake only services you can complete competently\n• Maintain competence through CPE\n\n**2. Due Professional Care:**\n• Exercise appropriate care and diligence\n• Adequately plan and supervise\n\n**3. Planning and Supervision:**\n• Adequately plan and supervise work\n\n**4. Sufficient Relevant Data:**\n• Obtain sufficient data to support conclusions"
        },
        {
          title: 'Confidentiality',
          type: 'text',
          content: "**Rule:** Don't disclose confidential client information without consent\n\n**Exceptions (may disclose):**\n• Compliance with GAAS (quality review)\n• Response to valid subpoena/summons\n• Ethics investigation (peer review, state board)\n• State laws requiring disclosure\n• Client consent\n\n**No privilege:** Unlike attorneys, CPA-client communications are NOT privileged at federal level"
        },
        {
          title: 'Acts Discreditable',
          type: 'text',
          content: "**Prohibited acts include:**\n\n• Discrimination or harassment\n• Negligence in preparing F/S or records\n• Failure to file tax returns or pay taxes\n• Failure to follow government audit standards\n• Disclosing CPA exam questions/answers\n• Solicitation using coercion or false advertising\n\n**Consequence:** Disciplinary action by AICPA and/or state board"
        },
        {
          title: '⚠️ Exam Trap: Contingent Fees',
          type: 'warning',
          content: "**Contingent fees are PROHIBITED for:**\n• Audits and reviews of F/S\n• Compilations when third party will use and not disclose independence\n• Examination of prospective F/S\n• Original tax return preparation\n\n**Contingent fees ALLOWED for:**\n• Tax representation (audits, appeals)\n• Amended returns (refund claims)\n• Non-attest consulting services"
        },
        {
          title: 'Advertising and Solicitation',
          type: 'text',
          content: "**Permitted:**\n• Advertising (must not be false, misleading, or deceptive)\n• Solicitation of new clients\n• Listing areas of practice\n\n**Prohibited:**\n• False or misleading advertising\n• Coercion, overreaching, harassment\n• Claiming superiority that can't be substantiated"
        },
        {
          title: 'Form of Organization',
          type: 'text',
          content: "**CPAs may practice in various forms:**\n• Sole proprietorship\n• Partnership\n• Professional corporation\n• LLC/LLP\n\n**Requirements:**\n• Majority ownership by CPAs\n• Non-CPA owners must meet competency requirements\n• CPA must have ultimate responsibility for services"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Six principles: Responsibilities, Integrity, Public interest, Objectivity, Due care, Scope",
            "Independence required for attest services; objectivity always required",
            "Independence has two aspects: in fact AND in appearance",
            "Confidentiality exceptions: subpoena, ethics investigation, quality review, client consent",
            "Contingent fees prohibited for audits, reviews, most tax returns",
            "Acts discreditable: discrimination, negligence, failure to file/pay taxes",
            "CPA-client communications are NOT privileged at federal level"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-I-003',
    section: 'AUD',
    title: "Independence: Conceptual Framework",
    description: "Apply the threats and safeguards approach to evaluate auditor independence",
    order: 3,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Ethics", "Independence", "Threats"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Independence is the CORNERSTONE of audit credibility. Without independence, an auditor's opinion is worthless! The conceptual framework approach helps you identify threats to independence and apply safeguards—a skill tested repeatedly on AUD."
        },
        {
          title: 'Two Aspects of Independence',
          type: 'text',
          content: "**Independence in FACT:**\n• State of mind\n• Unbiased mental attitude\n• Objectivity in forming opinions\n• Can't be directly observed\n\n**Independence in APPEARANCE:**\n• How others perceive the auditor\n• Would a reasonable observer conclude auditor is independent?\n• Avoiding relationships that APPEAR to impair objectivity\n\n**Both are required!**"
        },
        {
          title: 'Conceptual Framework Approach',
          type: 'text',
          content: "**Three-step process:**\n\n**Step 1: Identify threats** to compliance with independence rules\n\n**Step 2: Evaluate significance** of threats (individually and combined)\n\n**Step 3: Apply safeguards** when necessary to reduce threats to acceptable level\n\n**If threats can't be reduced:** Don't provide the service or decline the engagement"
        },
        {
          title: 'Categories of Threats',
          type: 'table',
          headers: ['Threat', 'Definition', 'Example'],
          rows: [
            ['Self-Interest', 'Financial interest affects judgment', 'Owning client stock'],
            ['Self-Review', 'Reviewing own work', 'Auditing system you designed'],
            ['Advocacy', 'Promoting client position', 'Testifying as expert for client'],
            ['Familiarity', 'Too close to client personnel', 'Long tenure with client'],
            ['Undue Influence', 'Pressure from client or others', 'Client threatens to switch auditors']
          ]
        },
        {
          title: '🧠 Memory Aid: The 5 Threats',
          type: 'callout',
          content: "**\"SASSY\"** threats to independence:\n\n**S**elf-Interest (money in my pocket)\n**A**dvocacy (championing their cause)\n**S**elf-Review (checking my own work)\n**S**ocializing/Familiarity (too friendly)\n**Y**ielding to pressure (Undue influence)\n\n**Think:** An auditor who's SASSY about threats will lose independence!"
        },
        {
          title: 'Self-Interest Threat Examples',
          type: 'text',
          content: "**Financial relationships:**\n• Direct financial interest in client (ANY amount)\n• Material indirect financial interest\n• Loans to/from client\n• Close relative with financial interest\n\n**Business relationships:**\n• Employment negotiations with client\n• Overdue fees from client\n• Contingent fees\n• Significant fee dependence on one client"
        },
        {
          title: 'Self-Review Threat Examples',
          type: 'text',
          content: "**Performing services you later audit:**\n• Designing internal controls\n• Preparing F/S or accounting records\n• Performing valuation services\n• Implementing IT systems\n• Bookkeeping services\n\n**Key:** If you created it, you can't objectively evaluate it!"
        },
        {
          title: 'Familiarity Threat Examples',
          type: 'text',
          content: "**Close relationships:**\n• Long association with client (partner rotation required)\n• Family members in key client positions\n• Former firm employee joins client\n• Accepting gifts/hospitality\n• Social relationships with client management\n\n**Danger:** Being too close can cloud judgment"
        },
        {
          title: 'Advocacy and Undue Influence',
          type: 'text',
          content: "**Advocacy threats:**\n• Acting as promoter of client securities\n• Being expert witness supporting client's position\n• Negotiating on client's behalf\n\n**Undue Influence threats:**\n• Actual or threatened litigation\n• Pressure to reduce scope\n• Pressure to accept inappropriate accounting\n• Threats to replace auditor"
        },
        {
          title: 'Safeguards',
          type: 'text',
          content: "**Types of safeguards:**\n\n**Created by profession/legislation:**\n• Education and experience requirements\n• CPE requirements\n• Corporate governance regulations\n• External review (peer review)\n\n**Within the firm:**\n• Quality control policies\n• Partner rotation\n• Separate engagement quality review\n• Consultation requirements"
        },
        {
          title: '⚠️ Exam Trap: Direct vs Indirect Financial Interest',
          type: 'warning',
          content: "**DIRECT financial interest: ALWAYS impairs independence**\n• Owning client stock directly\n• Even $1 of stock = impaired!\n\n**INDIRECT financial interest: Only if MATERIAL**\n• Mutual fund that owns client stock\n• Retirement plan with client investment\n• Evaluate materiality to the CPA\n\n**Key:** Direct = no threshold; Indirect = materiality matters"
        },
        {
          title: 'Covered Members',
          type: 'text',
          content: "**Who must be independent?**\n\n**Covered members include:**\n• Individual on attest engagement team\n• Individual able to influence engagement\n• Partner in office providing engagement\n• Firm and its employee benefit plans\n• Entity controlled by any of above\n\n**Immediate family:** Spouse, spousal equivalent, dependent\n\n**Close relatives:** Parents, siblings, nondependent children"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Independence has two aspects: in fact AND in appearance",
            "Three-step conceptual framework: Identify threats → Evaluate → Apply safeguards",
            "Five threat categories: Self-interest, Advocacy, Self-review, Familiarity, Undue influence",
            "Direct financial interest ALWAYS impairs independence (no materiality threshold)",
            "Indirect financial interest impairs only if material to the CPA",
            "Covered members include engagement team, partners in office, and firm",
            "If safeguards can't reduce threats → Don't perform the service"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-I-004',
    section: 'AUD',
    title: "SEC & PCAOB Independence Rules",
    description: "Understand the stricter independence requirements for public company audits",
    order: 4,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Ethics", "Independence", "PCAOB", "SEC"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When auditing PUBLIC companies (issuers), stricter SEC and PCAOB rules apply—not just AICPA rules! After Enron, Sarbanes-Oxley created additional independence requirements. These differences are frequently tested on AUD!"
        },
        {
          title: 'Regulatory Framework',
          type: 'text',
          content: "**For Issuer (Public Company) Audits:**\n\n**SEC:** Sets independence rules for auditors of SEC registrants\n\n**PCAOB:** Enforces standards for registered accounting firms\n\n**Sarbanes-Oxley Act (SOX):** Congressional law establishing requirements\n\n**Note:** PCAOB and SEC rules are generally MORE RESTRICTIVE than AICPA rules"
        },
        {
          title: 'Prohibited Non-Audit Services',
          type: 'text',
          content: "**Under SOX, auditors of issuers CANNOT provide:**\n\n1. Bookkeeping and related services\n2. Financial information systems design/implementation\n3. Appraisal or valuation services\n4. Actuarial services\n5. Internal audit outsourcing\n6. Management functions or human resources\n7. Broker-dealer, investment advisor, or investment banking\n8. Legal services unrelated to audit\n9. Expert services for legal proceedings"
        },
        {
          title: '🧠 Memory Aid: Prohibited Services',
          type: 'callout',
          content: "**\"BAFTA-HELM\"** (like the British film awards steering a ship!)\n\n**B**ookkeeping\n**A**ppraisal/valuation\n**F**inancial systems design\n**T**ax services (aggressive planning - separate rule)\n**A**ctuarial services\n\n**H**uman resources\n**E**xpert witness (legal)\n**L**egal services\n**M**anagement functions\n\n**Think:** These services make auditor captain of client's ship = not independent!"
        },
        {
          title: 'Tax Services Restrictions',
          type: 'text',
          content: "**Tax services generally ALLOWED for issuers, BUT:**\n\n**Prohibited:**\n• Marketing aggressive tax shelters\n• Tax services for certain executives (CEO, CFO, CAO, controller)\n• Confidential or aggressive tax transactions\n\n**Required:**\n• Pre-approval by audit committee\n• Disclosure of fees paid\n\n**Key:** Tax compliance generally OK; aggressive planning NOT OK"
        },
        {
          title: 'Partner Rotation Requirements',
          type: 'table',
          headers: ['Role', 'SEC/PCAOB Requirement', 'Cooling-Off Period'],
          rows: [
            ['Lead/Coordinating Partner', 'Rotate after 5 years', '5 years off engagement'],
            ['Concurring Review Partner', 'Rotate after 5 years', '5 years off engagement'],
            ['Other Audit Partners', 'Rotate after 7 years', '2 years off engagement']
          ]
        },
        {
          title: 'Audit Committee Pre-Approval',
          type: 'text',
          content: "**ALL audit and non-audit services must be:**\n\n**Pre-approved by audit committee** (or designated member)\n\n**Includes:**\n• Audit services\n• Audit-related services\n• Permitted tax services\n• Any other allowed non-audit services\n\n**De minimis exception:** Up to 5% of total fees if:\n• Services not recognized as non-audit at start\n• Promptly brought to committee's attention\n• Approved before audit completion"
        },
        {
          title: 'Employment Cooling-Off Period',
          type: 'text',
          content: "**One-year cooling-off period required if:**\n\nFormer engagement team member joins issuer client in:\n• CEO, CFO, CAO, Controller position\n• Financial reporting oversight role\n• Any equivalent position\n\n**The firm is NOT independent** during this period!\n\n**Applies to:** Members of engagement team who provided 10+ hours of services in 12 months before employment"
        },
        {
          title: 'Financial Relationships',
          type: 'text',
          content: "**SEC rules for financial interests:**\n\n**Firm cannot have financial interest in:**\n• Audit client\n• Client's parent, subsidiaries, affiliates\n\n**Covered persons:**\n• Firm partners\n• Managers who supervise audit\n• All partners in office participating in audit\n• Anyone in chain of command\n\n**More expansive than AICPA \"covered member\" concept**"
        },
        {
          title: '⚠️ Exam Trap: AICPA vs SEC/PCAOB',
          type: 'warning',
          content: "**Know the key differences:**\n\n| Area | AICPA | SEC/PCAOB |\n|------|-------|------------|\n| Partner rotation | Recommended | REQUIRED (5/7 years) |\n| Bookkeeping | May be OK with safeguards | PROHIBITED |\n| IT systems design | May be OK with safeguards | PROHIBITED |\n| Cooling-off (employment) | Not specified | 1 year required |\n| Tax services | Generally OK | Restricted for executives |\n\n**Exam tip:** If question says \"issuer\" → Apply SEC/PCAOB (stricter) rules!"
        },
        {
          title: 'Communication Requirements',
          type: 'text',
          content: "**Auditor must communicate to audit committee:**\n\n• All critical accounting policies and practices\n• Alternative GAAP treatments discussed with management\n• Other material written communications with management\n• Independence matters (annually)\n\n**Purpose:** Ensure audit committee oversight of auditor independence"
        },
        {
          title: 'Integrated Audit Requirement',
          type: 'text',
          content: "**For Issuers (accelerated filers):**\n\n**Integrated audit = Audit of BOTH:**\n1. Financial statements\n2. Internal control over financial reporting (ICFR)\n\n**Same auditor must perform both!**\n\n**Opinion on ICFR:** Material weakness = adverse opinion on ICFR"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SOX prohibits 9 categories of non-audit services for issuer auditors",
            "Partner rotation: Lead/review = 5 years on, 5 off; Others = 7 on, 2 off",
            "Audit committee must pre-approve ALL audit and non-audit services",
            "1-year cooling-off before engagement team can join client in financial role",
            "Tax services allowed but restricted for executives; aggressive planning prohibited",
            "SEC/PCAOB rules are STRICTER than AICPA rules",
            "Issuers require integrated audit (F/S + ICFR)"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-I-005',
    section: 'AUD',
    title: "Conflicts of Interest & Threats",
    description: "Identify and resolve conflicts of interest in professional engagements",
    order: 5,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Ethics", "Conflicts"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Conflicts of interest can arise in countless ways—competing clients, personal relationships, financial interests. Knowing how to identify and resolve conflicts protects both you and your clients. The exam tests your ability to spot conflicts and determine appropriate responses!"
        },
        {
          title: 'What is a Conflict of Interest?',
          type: 'text',
          content: "**Definition:** A circumstance that could impair objectivity or compromise the CPA's ability to fulfill professional responsibilities.\n\n**Types of conflicts:**\n• Between CPA and client\n• Between two or more clients\n• Between CPA's personal interests and professional duties\n\n**Key:** Conflicts must be identified, evaluated, and managed"
        },
        {
          title: 'Common Conflict Situations',
          type: 'text',
          content: "**Client vs Client conflicts:**\n• Providing services to competitors\n• Litigation between clients\n• M&A transactions with two clients\n\n**Self-interest conflicts:**\n• Financial interest in client outcome\n• Referral fee arrangements\n• Commission-based compensation\n• Business relationship with client"
        },
        {
          title: 'Conflicts Framework',
          type: 'text',
          content: "**Step 1: IDENTIFY the conflict**\n• Client relationships\n• Personal financial interests\n• Business relationships\n\n**Step 2: EVALUATE significance**\n• How material is the conflict?\n• Are safeguards available?\n\n**Step 3: DETERMINE action**\n• Decline engagement\n• Implement safeguards\n• Obtain informed consent"
        },
        {
          title: 'Safeguards for Conflicts',
          type: 'text',
          content: "**Organizational safeguards:**\n• Separate engagement teams\n• Information barriers (\"Chinese walls\")\n• Different chains of command\n• Physical separation of files\n• Different office locations\n\n**Client-side safeguards:**\n• Full disclosure of conflict\n• Written informed consent from all affected parties\n• Consent to share information (if needed)"
        },
        {
          title: '🧠 Memory Aid: Conflict Resolution',
          type: 'callout',
          content: "**\"DICE\"** your way through conflicts:\n\n**D**isclose the conflict to affected parties\n**I**mplement safeguards\n**C**onsent obtained in writing\n**E**valuate if safeguards are adequate\n\n**If safeguards aren't enough → DECLINE the engagement!**"
        },
        {
          title: 'Informed Consent Requirements',
          type: 'text',
          content: "**For valid informed consent:**\n\n1. **Full disclosure:** Explain nature of conflict\n2. **Clear communication:** Client understands implications\n3. **Written consent:** Document the consent\n4. **Voluntary:** No pressure or coercion\n5. **Ongoing:** Re-evaluate as circumstances change\n\n**Note:** Some conflicts cannot be resolved even with consent!"
        },
        {
          title: 'Unresolvable Conflicts',
          type: 'text',
          content: "**Some conflicts require declining the engagement:**\n\n• Independence impairment for attest services\n• Significant threat that can't be adequately safeguarded\n• One party won't consent\n• Legal restrictions prevent dual representation\n• CPA's personal integrity would be compromised\n\n**Remember:** Sometimes \"no\" is the only ethical answer"
        },
        {
          title: '⚠️ Exam Trap: Competitor Clients',
          type: 'warning',
          content: "**Can you serve competing clients?**\n\n**Generally YES, with safeguards:**\n• Separate engagement teams\n• Confidentiality policies\n• Client consent may be needed\n\n**Exception:** Conflict if you have confidential information from one client that could benefit the other\n\n**Exam tip:** Serving competitors ≠ automatic conflict. Evaluate the specific facts!"
        },
        {
          title: 'Gift and Hospitality',
          type: 'text',
          content: "**Accepting gifts from clients:**\n\n**May be acceptable if:**\n• Clearly insignificant and inconsequential\n• Customary in business relationships\n• No intent to influence judgment\n\n**Generally problematic:**\n• Expensive gifts\n• Frequent gifts\n• Gifts that could appear to impair objectivity\n\n**Best practice:** Decline gifts that could appear improper"
        },
        {
          title: 'Documentation',
          type: 'text',
          content: "**Document all conflict situations:**\n\n• Nature of conflict identified\n• Parties affected\n• Evaluation of significance\n• Safeguards implemented\n• Consents obtained\n• Decision made\n\n**Purpose:** Evidence of due care and professional judgment"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Conflicts can arise between CPA/client, between clients, or with personal interests",
            "Framework: Identify → Evaluate → Determine action",
            "Safeguards include separate teams, information barriers, different offices",
            "Informed consent requires full disclosure, understanding, and written agreement",
            "Some conflicts cannot be resolved even with consent → must decline",
            "Serving competitors is possible with proper safeguards",
            "Document all conflict evaluations and resolutions"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-I-006',
    section: 'AUD',
    title: "Engagement Letters & Acceptance",
    description: "Understand the requirements for accepting engagements and documenting terms",
    order: 6,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Planning", "Engagement Letters"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Before accepting ANY engagement, auditors must evaluate whether they should take the job. The engagement letter then formalizes the agreement and sets expectations. Understanding this process is crucial for audit planning questions on AUD!"
        },
        {
          title: 'Pre-Engagement Activities',
          type: 'text',
          content: "**Before accepting an engagement, evaluate:**\n\n**1. Client acceptance/continuance:**\n• Client integrity\n• Independence issues\n• Competence to perform engagement\n• Predecessor auditor communications\n\n**2. Engagement acceptance:**\n• Appropriate reporting framework\n• Purpose of engagement\n• Nature of opinion expected"
        },
        {
          title: 'Client Acceptance Procedures',
          type: 'text',
          content: "**Evaluate client integrity:**\n• Background investigation\n• Inquiries with bankers, attorneys, credit agencies\n• Financial stability of client\n• Reputation in business community\n\n**Why this matters:** Dishonest client = higher fraud risk"
        },
        {
          title: 'Predecessor Auditor Communication',
          type: 'text',
          content: "**REQUIRED before accepting engagement:**\n\n**Successor auditor should inquire about:**\n• Reasons for change in auditors\n• Disagreements with management\n• Management integrity issues\n• Significant accounting issues\n• Communications with audit committee\n\n**Note:** Client must authorize predecessor to respond. If client refuses → consider red flag!"
        },
        {
          title: '🧠 Memory Aid: Client Acceptance',
          type: 'callout',
          content: "**\"RICH\" clients are worth accepting:**\n\n**R**eputation - What's client's standing?\n**I**ntegrity - Is management honest?\n**C**ompetence - Can we do the work?\n**H**istory - What did predecessor say?\n\n**If any are questionable → Think twice before accepting!**"
        },
        {
          title: 'Purpose of Engagement Letter',
          type: 'text',
          content: "**The engagement letter:**\n• Establishes terms of engagement\n• Documents understanding with client\n• Reduces risk of misunderstandings\n• Creates contract between parties\n\n**Required for ALL engagements!**\n• Audit, review, compilation\n• Initial and recurring engagements\n• Terms may be updated annually"
        },
        {
          title: 'Required Engagement Letter Contents',
          type: 'text',
          content: "**Essential elements:**\n\n1. **Objective and scope** of the audit\n2. **Responsibilities of the auditor**\n3. **Responsibilities of management**\n4. **Identification of framework** (e.g., GAAP)\n5. **Expected form of reports**\n6. **Limitations** (sampling, inherent risks)\n7. **Fees and billing** arrangements"
        },
        {
          title: 'Management Responsibilities',
          type: 'text',
          content: "**Management must acknowledge responsibility for:**\n\n• Preparation of F/S in accordance with framework\n• Design and maintenance of internal controls\n• Prevention and detection of fraud\n• Identifying and disclosing related party transactions\n• Compliance with laws and regulations\n• Providing access to all information\n• **Written representations to auditor**"
        },
        {
          title: 'Auditor Responsibilities',
          type: 'text',
          content: "**The engagement letter confirms auditor will:**\n\n• Conduct audit in accordance with GAAS\n• Obtain reasonable assurance about material misstatement\n• Issue opinion on financial statements\n• Communicate significant findings\n• Maintain independence and objectivity\n\n**Note:** Auditor does NOT guarantee detection of all fraud!"
        },
        {
          title: '⚠️ Exam Trap: Limiting Auditor Responsibility',
          type: 'warning',
          content: "**Cannot limit liability through engagement letter for:**\n• Gross negligence\n• Fraud\n• Willful misconduct\n\n**May limit liability:**\n• Some jurisdictions allow caps on damages\n• Alternative dispute resolution clauses\n\n**Key:** Cannot contract away responsibility to follow GAAS!"
        },
        {
          title: 'Changes in Engagement Terms',
          type: 'text',
          content: "**Client requests to change engagement (e.g., audit to review):**\n\n**Consider:**\n• Reason for request (legitimate vs. inappropriate)\n• Additional effort already completed\n• Cost of work already performed\n\n**Inappropriate reasons:**\n• Scope limitation auditor can't overcome\n• Client trying to hide information\n• Disagreement over accounting treatment\n\n**If inappropriate → Withdraw, don't downgrade!**"
        },
        {
          title: 'Recurring Audits',
          type: 'text',
          content: "**For continuing clients:**\n\n**Assess whether engagement letter needs updating:**\n• Changes in client structure\n• Changes in accounting framework\n• New regulatory requirements\n• Changes in engagement scope\n\n**At minimum:** Send letter confirming terms remain in effect\n\n**Best practice:** New engagement letter each year"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Pre-engagement: Evaluate client integrity, independence, competence",
            "Communication with predecessor auditor REQUIRED before accepting",
            "If client won't authorize predecessor communication → red flag",
            "Engagement letter documents terms, responsibilities, fees",
            "Management responsible for F/S, controls, fraud prevention",
            "Cannot contract away GAAS responsibilities",
            "Client request to downgrade engagement may signal problem"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-I-007',
    section: 'AUD',
    title: "Communications with Governance",
    description: "Learn the required communications between auditors and those charged with governance",
    order: 7,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Communication", "Governance"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Effective two-way communication between auditors and the audit committee/board is essential for a successful audit. The exam frequently tests WHAT must be communicated, WHEN, and in what FORM!"
        },
        {
          title: 'Those Charged with Governance',
          type: 'text',
          content: "**Definition:** Person(s) with responsibility for overseeing strategic direction and accountability of the entity.\n\n**Examples:**\n• Board of directors\n• Audit committee\n• Supervisory board\n• Trustees (NFP)\n• General partners\n\n**Key:** May differ from management (who runs day-to-day operations)"
        },
        {
          title: 'Purpose of Communications',
          type: 'text',
          content: "**Two-way communication helps:**\n\n**Auditor:**\n• Obtain information relevant to the audit\n• Understand entity governance\n• Assess control environment\n\n**Governance:**\n• Understand audit scope and timing\n• Oversee financial reporting process\n• Respond to findings and issues"
        },
        {
          title: 'Required Communications: Planning',
          type: 'text',
          content: "**Early in the audit, communicate:**\n\n• Planned scope and timing of audit\n• Auditor's responsibilities\n• Nature of communications expected\n• Significant risks identified\n• Significant areas requiring judgment\n• Materiality concepts\n\n**Purpose:** Set expectations and coordinate"
        },
        {
          title: 'Required Communications: Findings',
          type: 'text',
          content: "**After audit procedures, communicate:**\n\n• Significant accounting policies (including changes)\n• Significant accounting estimates and judgments\n• Audit adjustments (proposed and passed)\n• Uncorrected misstatements\n• Disagreements with management\n• Significant difficulties encountered\n• Material weaknesses and significant deficiencies"
        },
        {
          title: '🧠 Memory Aid: What to Communicate',
          type: 'callout',
          content: "**\"SUDDIM\"** - things that make governance go \"hmm\":\n\n**S**ignificant findings\n**U**ncorrected misstatements\n**D**isagreements with management\n**D**ifficulties (scope limitations)\n**I**nternal control deficiencies\n**M**anagement representations (required letters)\n\n**Think:** Anything governance SHOULD know to fulfill their oversight role!"
        },
        {
          title: 'Significant Audit Findings',
          type: 'text',
          content: "**Must communicate:**\n\n**1. Qualitative aspects of accounting:**\n• Acceptability of significant policies\n• Subjectivity in sensitive estimates\n• Consistency of disclosures\n\n**2. Significant difficulties:**\n• Delays in providing information\n• Unreasonable time pressures\n• Scope limitations\n\n**3. Written representations obtained**"
        },
        {
          title: 'Internal Control Deficiencies',
          type: 'text',
          content: "**Must communicate IN WRITING:**\n\n**Material weakness:** Reasonable possibility that material misstatement won't be prevented/detected timely\n\n**Significant deficiency:** Less severe than material weakness, but warrants attention\n\n**Timing:** Communicate promptly, no later than 60 days after report release (for nonissuers)\n\n**For issuers:** Material weaknesses reported publicly"
        },
        {
          title: 'Fraud Communications',
          type: 'text',
          content: "**Must communicate:**\n\n**To management:** All fraud involving employees (unless trivial)\n\n**To governance:** \n• Fraud involving management\n• Fraud causing material misstatement\n• Other fraud, unless clearly inconsequential\n\n**To regulatory authorities:** When required by law\n\n**Note:** If fraud involves senior management → communicate directly to audit committee"
        },
        {
          title: 'Form of Communication',
          type: 'table',
          headers: ['Matter', 'Form Required'],
          rows: [
            ['Significant deficiencies/material weaknesses', 'Written (required)'],
            ['Independence', 'Written (required for issuers)'],
            ['Auditors responsibilities', 'Written engagement letter'],
            ['Uncorrected misstatements', 'Written recommended'],
            ['Other audit matters', 'Oral or written']
          ]
        },
        {
          title: '⚠️ Exam Trap: Timing of Communications',
          type: 'warning',
          content: "**Timing varies by matter:**\n\n**Before audit:** Planned scope, timing, responsibilities\n\n**During audit:** Fraud, significant difficulties, independence issues\n\n**End of audit:** Uncorrected misstatements, control deficiencies\n\n**After report:** Written IC deficiencies (within 60 days for nonissuers)\n\n**Key:** Significant matters should be communicated TIMELY!"
        },
        {
          title: 'Independence Communication',
          type: 'text',
          content: "**For Issuers (SEC/PCAOB):**\n\n**Must communicate IN WRITING, at least annually:**\n• All relationships with the client\n• Matters affecting independence\n• Fees for audit and non-audit services\n• Independence confirmed\n\n**For Nonissuers:** Communication expected but less formal"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Those charged with governance = oversight responsibility (board, audit committee)",
            "Two-way communication benefits both auditor and governance",
            "Communicate planned scope, timing, significant risks BEFORE audit",
            "Communicate findings, deficiencies, disagreements AFTER procedures",
            "Material weaknesses and significant deficiencies must be IN WRITING",
            "Fraud involving management → communicate directly to audit committee",
            "Independence communications required in writing for issuers"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-I-008',
    section: 'AUD',
    title: "Quality Management Standards (SQMS)",
    description: "Understand the firm-wide quality management system requirements",
    order: 8,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Quality Control", "SQMS"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Quality management at the FIRM level ensures that every engagement meets professional standards. The new SQMS standards (replacing QC sections) require a risk-based approach to quality. Understanding these standards shows how audit quality is maintained across an entire practice!"
        },
        {
          title: 'What is Quality Management?',
          type: 'text',
          content: "**System of Quality Management (SQM):**\n\n**Purpose:** Design, implement, and operate a system providing reasonable assurance that:\n• Firm and personnel fulfill professional responsibilities\n• Reports issued are appropriate\n• Professional standards are followed\n\n**Key change:** Risk-based approach (identify risks → design responses)"
        },
        {
          title: 'SQMS Structure',
          type: 'text',
          content: "**Two SQMS Standards:**\n\n**SQMS No. 1:** Overall quality management for the firm\n• Establishes components of the system\n• Risk assessment and response\n• Monitoring activities\n\n**SQMS No. 2:** Engagement quality reviews\n• When required\n• Qualifications of reviewer\n• Nature of review procedures"
        },
        {
          title: 'Eight Components of Quality Management',
          type: 'table',
          headers: ['Component', 'Description'],
          rows: [
            ['1. Risk Assessment Process', 'Identify and assess quality risks'],
            ['2. Governance and Leadership', 'Tone at the top, accountability'],
            ['3. Relevant Ethical Requirements', 'Independence, integrity, objectivity'],
            ['4. Acceptance and Continuance', 'Client and engagement evaluation'],
            ['5. Engagement Performance', 'Direction, supervision, review'],
            ['6. Resources', 'Human, technological, intellectual'],
            ['7. Information and Communication', 'Obtain, generate, communicate quality info'],
            ['8. Monitoring and Remediation', 'Ongoing evaluation, corrective actions']
          ]
        },
        {
          title: '🧠 Memory Aid: Quality Components',
          type: 'callout',
          content: "**\"GRACEFUL RIM\"**\n\n**G**overnance and leadership\n**R**isk assessment\n**A**cceptance and continuance\n**C**ommunication and information\n**E**thical requirements\n**F**irm resources\n**U**sing engagement quality reviews\n**L**... (Engagement performance/Learning)\n**R**esources\n**I**nformation and communication\n**M**onitoring and remediation"
        },
        {
          title: 'Governance and Leadership',
          type: 'text',
          content: "**Firm leadership must:**\n\n• Demonstrate commitment to quality\n• Assign responsibility for quality management\n• Establish culture that emphasizes quality\n• Integrate quality into strategic decisions\n• Ensure adequate resources for quality\n\n**Key:** Tone at the top drives audit quality!"
        },
        {
          title: 'Engagement Performance',
          type: 'text',
          content: "**Policies and procedures for:**\n\n**Direction:** Clear engagement objectives, team understanding\n\n**Supervision:** Ongoing oversight during engagement\n\n**Review:** Timely evaluation of work performed\n\n**Consultation:** Obtaining advice on difficult issues\n\n**Differences of opinion:** Process for resolving disagreements"
        },
        {
          title: 'Engagement Quality Review',
          type: 'text',
          content: "**Purpose:** Objective evaluation of significant judgments and conclusions\n\n**Required for:**\n• Audits of issuers (public companies)\n• Audits where required by law/regulation\n• Other engagements meeting firm's criteria\n\n**Reviewer qualifications:**\n• Technical competence\n• Experience and authority\n• Objectivity (not involved in engagement)"
        },
        {
          title: 'EQ Review Procedures',
          type: 'text',
          content: "**Engagement quality reviewer evaluates:**\n\n• Significant risks and responses\n• Significant judgments (estimates, accounting policies)\n• Significant matters for governance\n• Uncorrected misstatements\n• Matters communicated to management/governance\n• F/S and proposed report\n• Independence conclusion\n\n**Report not released until EQR completed!**"
        },
        {
          title: '⚠️ Exam Trap: EQR vs Partner Review',
          type: 'warning',
          content: "**Engagement QUALITY review (EQR):**\n• Separate from engagement team\n• Objective evaluation\n• Required for certain engagements\n• Reviews significant judgments\n\n**Engagement PARTNER review:**\n• Part of engagement team\n• Responsible for overall audit\n• Reviews work of team\n• Signs the report\n\n**Key:** EQR provides independent \"second look\"!"
        },
        {
          title: 'Monitoring and Remediation',
          type: 'text',
          content: "**Monitoring activities:**\n• Ongoing evaluation of quality system\n• Periodic inspection of completed engagements\n• External inspections (peer review, PCAOB)\n\n**When deficiencies found:**\n• Evaluate root cause\n• Design remedial actions\n• Implement changes\n• Evaluate effectiveness\n\n**Annual evaluation:** Overall system operating effectively?"
        },
        {
          title: 'Documentation',
          type: 'text',
          content: "**Firm must document:**\n\n• Quality objectives and risks\n• Policies and procedures (responses)\n• Monitoring activities performed\n• Deficiencies identified and remediation\n• Annual evaluation and conclusions\n• Assignment of responsibility\n\n**Retention:** Long enough to enable monitoring and evaluation"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SQMS requires risk-based approach to quality management",
            "Eight components from governance to monitoring",
            "Leadership sets tone; culture emphasizes quality over profit",
            "Engagement quality review required for issuers and high-risk engagements",
            "EQR is objective, independent evaluation of significant judgments",
            "Report cannot be released until EQR is complete",
            "Monitoring includes ongoing evaluation and periodic inspections"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-I-009',
    section: 'AUD',
    title: "Professional Skepticism & Judgment",
    description: "Develop the critical mindset essential for effective auditing",
    order: 9,
    duration: 40,
    difficulty: 'beginner',
    topics: ["Concepts", "Skepticism", "Judgment"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Professional skepticism is the auditor's most important mindset. It means questioning everything—not assuming information is true just because management says so. Many audit failures trace back to insufficient skepticism. This concept permeates EVERY aspect of auditing!"
        },
        {
          title: 'What is Professional Skepticism?',
          type: 'text',
          content: "**Definition:** An attitude that includes:\n• A questioning mind\n• Being alert to conditions indicating possible misstatement\n• Critical assessment of audit evidence\n\n**NOT about:** Assuming dishonesty\n**IT IS about:** Neither assuming honesty NOR dishonesty\n\n**Maintain throughout the audit!**"
        },
        {
          title: 'Elements of Skepticism',
          type: 'text',
          content: "**A questioning mind:**\n• Why did this transaction occur?\n• Does this make business sense?\n• What could go wrong?\n\n**Alert to red flags:**\n• Unusual transactions or amounts\n• Missing documentation\n• Inconsistent explanations\n\n**Critical assessment:**\n• Is evidence sufficient and appropriate?\n• Does evidence from different sources agree?\n• Are management's assertions reasonable?"
        },
        {
          title: 'Professional Skepticism vs Distrust',
          type: 'table',
          headers: ['Skepticism', 'Distrust'],
          rows: [
            ['Questions and verifies', 'Assumes dishonesty'],
            ['Maintains objectivity', 'Approaches with bias'],
            ['Seeks corroborating evidence', 'Ignores contrary evidence'],
            ['Recognizes possibility of fraud', 'Expects fraud'],
            ['Professional duty', 'Unprofessional attitude']
          ]
        },
        {
          title: '🧠 Memory Aid: Skepticism Framework',
          type: 'callout',
          content: "**\"QUEST\" for truth:**\n\n**Q**uestion everything\n**U**nderstand the business rationale\n**E**valuate evidence critically\n**S**eek corroboration\n**T**hink independently (don't assume)\n\n**Remember:** Trust but VERIFY!"
        },
        {
          title: 'What is Professional Judgment?',
          type: 'text',
          content: "**Definition:** Application of relevant training, knowledge, and experience to make informed decisions about courses of action.\n\n**Used throughout the audit for:**\n• Planning the audit\n• Performing procedures\n• Evaluating evidence\n• Drawing conclusions\n\n**Not arbitrary:** Based on facts, knowledge of client, professional standards"
        },
        {
          title: 'Applying Professional Judgment',
          type: 'text',
          content: "**Good judgment requires:**\n\n**1. Sufficient knowledge:**\n• Technical accounting and auditing standards\n• Client's industry and business\n• Applicable regulations\n\n**2. Relevant experience:**\n• Similar situations encountered\n• Lessons learned from past engagements\n\n**3. Consultation:**\n• Seek input on complex issues\n• Use firm resources and specialists"
        },
        {
          title: 'Skepticism in Specific Areas',
          type: 'text',
          content: "**Areas requiring heightened skepticism:**\n\n**Estimates:**\n• Management bias potential\n• Significant assumptions\n• Wide range of possible values\n\n**Related parties:**\n• Unusual transactions\n• Terms not arm's length\n\n**Revenue recognition:**\n• Presumed fraud risk\n• Complex arrangements\n\n**Journal entries:**\n• Unusual or non-routine\n• Period-end adjustments"
        },
        {
          title: 'Impediments to Skepticism',
          type: 'text',
          content: "**Barriers to maintaining skepticism:**\n\n**Time pressure:** Deadlines may discourage thorough questioning\n\n**Familiarity:** Long relationship with client can reduce alertness\n\n**Confirmation bias:** Seeking evidence that supports initial belief\n\n**Overreliance:** Trusting client explanations without verification\n\n**Workload:** Fatigue can reduce critical thinking"
        },
        {
          title: '⚠️ Exam Trap: Documentation of Skepticism',
          type: 'warning',
          content: "**Documentation should reflect skeptical approach:**\n\n• How evidence was evaluated\n• Alternative explanations considered\n• Why auditor's conclusion is appropriate\n• How contradictory evidence was resolved\n\n**If documentation doesn't show skepticism:**\n→ Appears auditor just \"went through the motions\"\n→ Vulnerable in litigation and inspection"
        },
        {
          title: 'Skepticism and Fraud',
          type: 'text',
          content: "**Fraud consideration requires heightened skepticism:**\n\n• Assume risk of fraud exists\n• Consider how fraud COULD occur\n• Don't dismiss red flags as errors\n• Question unusual explanations\n• Verify management explanations\n\n**Remember:** Most fraud involves management override of controls"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Skepticism = questioning mind + alertness + critical assessment",
            "Neither assume honesty nor dishonesty—verify!",
            "Judgment applies knowledge, experience, and standards to decisions",
            "Heightened skepticism needed for estimates, related parties, revenue, journal entries",
            "Time pressure, familiarity, confirmation bias impede skepticism",
            "Documentation should reflect skeptical approach",
            "Fraud risk requires particular skepticism about management"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-I-010',
    section: 'AUD',
    title: "Documentation Requirements",
    description: "Master the requirements for audit documentation (working papers)",
    order: 10,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Documentation", "Working Papers"],
    blueprintArea: 'AUD-I',
    blueprintTopic: 'AUD-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "If it's not documented, it didn't happen! Audit documentation is the EVIDENCE that you performed the audit properly. Poor documentation can lead to litigation, regulatory sanctions, and failed inspections. Understanding documentation requirements is essential for practice!"
        },
        {
          title: 'Purpose of Documentation',
          type: 'text',
          content: "**Audit documentation serves to:**\n\n1. **Evidence of work:** Proof that procedures were performed\n2. **Basis for conclusions:** Support for auditor's opinion\n3. **Quality review:** Enable supervision and engagement quality review\n4. **Continuity:** Reference for future audits\n5. **Inspection:** Enable external review (peer review, PCAOB)\n6. **Defense:** Protection in litigation"
        },
        {
          title: 'What is Audit Documentation?',
          type: 'text',
          content: "**Definition:** Record of:\n• Audit procedures performed\n• Relevant audit evidence obtained\n• Conclusions reached\n\n**Forms:**\n• Written memos\n• Schedules and analyses\n• Confirmations\n• Checklists\n• Correspondence\n• Electronic files\n• Management representations"
        },
        {
          title: 'Documentation Requirements',
          type: 'text',
          content: "**Documentation must be sufficient to enable:**\n\n**Experienced auditor test:**\nAn experienced auditor, having no prior connection with the engagement, to understand:\n\n• Nature, timing, and extent of procedures\n• Results of procedures and evidence obtained\n• Significant findings or issues\n• Conclusions reached\n• Identity of who performed and reviewed work"
        },
        {
          title: '🧠 Memory Aid: Documentation Essentials',
          type: 'callout',
          content: "**\"NITE-RC\"** - Document like writing a night report:\n\n**N**ature of procedures performed\n**I**dentification of items tested\n**T**iming of procedures\n**E**xtent of testing\n**R**esults obtained\n**C**onclusions reached\n\n**Also:** WHO performed and WHO reviewed!"
        },
        {
          title: 'Specific Documentation Items',
          type: 'text',
          content: "**Must document:**\n\n• Audit strategy and audit plan\n• Risk assessment and responses\n• Nature, timing, extent of procedures\n• Results and conclusions\n• Significant matters and judgments\n• Communications with management/governance\n• How inconsistencies were resolved\n• Engagement team discussions"
        },
        {
          title: 'Significant Matters Documentation',
          type: 'text',
          content: "**Document significant matters including:**\n\n• Significant findings and issues\n• Actions taken to address them\n• Basis for final conclusions\n• Inconsistencies encountered\n• Changes to planned approach\n• Consultations on difficult issues\n• Who was consulted and conclusions reached"
        },
        {
          title: 'Assembly and Retention',
          type: 'table',
          headers: ['Standard', 'Assembly Deadline', 'Retention Period'],
          rows: [
            ['AICPA (Nonissuers)', '60 days after report release', '5 years'],
            ['PCAOB (Issuers)', '45 days after report release', '7 years']
          ]
        },
        {
          title: 'Changes to Documentation',
          type: 'text',
          content: "**After assembly deadline:**\n\n**May add documentation** to clarify or complete, but must document:\n• Specific information added\n• By whom and when\n• Reason for addition\n\n**Must NOT delete or discard** original documentation\n\n**Changes after report date** require special attention and documentation"
        },
        {
          title: '⚠️ Exam Trap: Documentation Timing',
          type: 'warning',
          content: "**When to prepare documentation:**\n\n**Best practice:** At time procedure is performed\n\n**Must document:** Before report is released\n\n**After report release:** Can add clarifications but cannot delete\n\n**Key dates:**\n• Documentation completion: 60 days (nonissuer) / 45 days (issuer)\n• After this: File is locked—changes require special procedures"
        },
        {
          title: 'Ownership and Access',
          type: 'text',
          content: "**Documentation belongs to the AUDITOR, not client**\n\n**Confidentiality:**\n• Cannot share without client consent (generally)\n• Subject to quality review/peer review access\n• May be subpoenaed\n\n**Client access:**\n• Generally provide copies if requested\n• Some items may be restricted"
        },
        {
          title: 'Electronic Documentation',
          type: 'text',
          content: "**Modern documentation is largely electronic:**\n\n**Considerations:**\n• Access controls (who can view/edit)\n• Version control\n• Backup procedures\n• Retention capabilities\n• Audit trail of changes\n• Signature/approval tracking\n\n**Same standards apply** whether paper or electronic"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Documentation = evidence audit was performed properly",
            "Must enable experienced auditor with no prior connection to understand work",
            "Document: nature, timing, extent of procedures + results + conclusions",
            "Assembly: 60 days (nonissuer) / 45 days (issuer) after report",
            "Retention: 5 years (nonissuer) / 7 years (issuer)",
            "After assembly deadline: can add but cannot delete documentation",
            "Documentation belongs to auditor, not client"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-001',
    section: 'AUD',
    title: "Preliminary Engagement Activities",
    description: "Understand the essential activities before beginning substantive audit work",
    order: 11,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Planning", "Risk Assessment"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Before diving into audit procedures, there's essential groundwork to lay. Preliminary engagement activities establish the foundation for an effective audit—ensuring you can actually perform the work properly. Skip these steps and the whole audit could be compromised!"
        },
        {
          title: 'Overview of Preliminary Activities',
          type: 'text',
          content: "**Before starting fieldwork, auditor must:**\n\n1. Perform acceptance and continuance procedures\n2. Establish terms of engagement (engagement letter)\n3. Assign engagement team\n4. Establish overall audit strategy\n5. Develop initial audit plan\n\n**These activities START the planning phase**"
        },
        {
          title: 'Acceptance and Continuance',
          type: 'text',
          content: "**For new clients:**\n• Evaluate management integrity\n• Assess independence\n• Communicate with predecessor auditor\n• Determine competence to perform\n\n**For continuing clients:**\n• Update understanding of integrity\n• Reassess independence\n• Evaluate any significant changes\n• Consider prior audit issues"
        },
        {
          title: 'Assigning the Engagement Team',
          type: 'text',
          content: "**Team assignment considers:**\n\n**Competence:**\n• Knowledge of industry\n• Experience with similar engagements\n• Technical expertise needed\n\n**Capabilities:**\n• Time availability\n• Understanding of professional standards\n• Supervisory skills\n\n**Independence:** All team members must be independent"
        },
        {
          title: 'Overall Audit Strategy',
          type: 'text',
          content: "**Strategy establishes:**\n\n• Scope of the audit\n• Timing of procedures\n• Direction of the audit\n• Resources required\n\n**Key decisions:**\n• Materiality levels\n• Areas of higher risk\n• Locations to visit (for multi-location)\n• Need for specialists\n• Extent of IT involvement"
        },
        {
          title: '🧠 Memory Aid: Audit Strategy',
          type: 'callout',
          content: "**\"STORM\"** before the audit:\n\n**S**cope (what's covered)\n**T**iming (when to do it)\n**O**bjectives (what we're trying to achieve)\n**R**esources (who and what we need)\n**M**ateriality (what level matters)\n\n**The strategy is the BIG PICTURE plan!**"
        },
        {
          title: 'Audit Plan vs Strategy',
          type: 'table',
          headers: ['Audit Strategy', 'Audit Plan'],
          rows: [
            ['Sets scope and timing', 'Details specific procedures'],
            ['High-level direction', 'Step-by-step instructions'],
            ['Establishes resources', 'Assigns specific tasks'],
            ['Determined early', 'Refined as audit progresses'],
            ['Framework for the plan', 'Execution of the framework']
          ]
        },
        {
          title: 'Initial Planning Considerations',
          type: 'text',
          content: "**Understand:**\n\n**The entity:**\n• Industry and regulatory environment\n• Nature of operations\n• Ownership structure\n• Governance\n\n**The financial reporting:**\n• Applicable framework (GAAP, IFRS)\n• Reporting requirements\n• Prior year issues\n\n**Internal control:**\n• Control environment\n• IT systems used"
        },
        {
          title: 'Engagement Team Discussion',
          type: 'text',
          content: "**Required discussion among team:**\n\n**Topics:**\n• Susceptibility of F/S to material misstatement\n• How and where F/S might be misstated\n• Fraud risks\n• Application of professional skepticism\n\n**Purpose:**\n• Share insights\n• Identify significant risks\n• Establish common understanding"
        },
        {
          title: '⚠️ Exam Trap: Planning is Iterative',
          type: 'warning',
          content: "**Planning doesn't end after preliminary activities!**\n\n**Planning is CONTINUOUS:**\n• Strategy and plan may be modified\n• New information changes approach\n• Risk assessment refined throughout\n\n**Common exam error:** Thinking planning only happens at the beginning\n\n**Reality:** Planning, performing, and evaluating overlap and repeat"
        },
        {
          title: 'Documentation of Planning',
          type: 'text',
          content: "**Document:**\n\n• Overall audit strategy\n• Audit plan\n• Significant changes during engagement\n• Reasons for changes\n• Engagement team discussions\n• Key decisions made\n\n**Purpose:** Evidence of planning, basis for procedures"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Preliminary activities: acceptance, engagement letter, team assignment, strategy, plan",
            "Evaluate client integrity and independence before accepting",
            "Audit strategy = big picture (scope, timing, resources, materiality)",
            "Audit plan = specific procedures to execute strategy",
            "Engagement team discussion required on misstatement susceptibility and fraud",
            "Planning is iterative—continues throughout the audit",
            "Document strategy, plan, and significant changes"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-002',
    section: 'AUD',
    title: "Materiality: Planning & Performance",
    description: "Master materiality concepts for audit planning and evaluation",
    order: 12,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Planning", "Materiality"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Materiality drives EVERYTHING in an audit—what you test, how much you test, and what misstatements matter. Set materiality too high and you miss problems; too low and you overaudit. Understanding materiality calculations and application is heavily tested!"
        },
        {
          title: 'What is Materiality?',
          type: 'text',
          content: "**Definition:** The magnitude of an omission or misstatement that, in light of surrounding circumstances, makes it probable that the judgment of a reasonable person relying on the information would have been changed or influenced.\n\n**Simpler:** An amount big enough to matter to users of the F/S\n\n**Materiality is a matter of PROFESSIONAL JUDGMENT**"
        },
        {
          title: 'Types of Materiality',
          type: 'text',
          content: "**Three levels:**\n\n**1. Overall Materiality (Financial Statement Level):**\n• Maximum tolerable misstatement for F/S as a whole\n• Used for planning and evaluation\n\n**2. Performance Materiality:**\n• Amount set BELOW overall materiality\n• Reduces risk that aggregate misstatements exceed overall\n\n**3. Specific Item Materiality:**\n• Lower threshold for sensitive items\n• Related party transactions, executive comp, etc."
        },
        {
          title: 'Common Materiality Benchmarks',
          type: 'table',
          headers: ['Benchmark', 'Common Range', 'When Used'],
          rows: [
            ['Income before tax', '3-5%', 'For-profit entities'],
            ['Total revenue', '0.5-1%', 'When income volatile'],
            ['Total assets', '0.5-1%', 'Asset-based entities'],
            ['Equity', '1-2%', 'When equity is key'],
            ['Total expenses', '0.5-1%', 'Not-for-profit entities']
          ]
        },
        {
          title: '🧠 Memory Aid: Materiality Hierarchy',
          type: 'callout',
          content: "**Think of a FUNNEL:**\n\n**OVERALL materiality** (widest)\n↓\n**PERFORMANCE materiality** (narrower)\n↓\n**TOLERABLE misstatement** (for sampling)\n↓\n**Clearly trivial** (narrowest - below this, don't accumulate)\n\n**Performance materiality is typically 50-75% of overall!**"
        },
        {
          title: 'Performance Materiality',
          type: 'text',
          content: "**Purpose:** Reduce risk that aggregate of uncorrected and undetected misstatements exceeds overall materiality\n\n**Setting performance materiality considers:**\n• Understanding of entity from prior audits\n• Nature and extent of expected misstatements\n• Risk assessment results\n\n**Typical range:** 50-75% of overall materiality\n\n**Higher risk engagement = lower performance materiality**"
        },
        {
          title: 'Qualitative Factors',
          type: 'text',
          content: "**Materiality isn't just about AMOUNT:**\n\n**Qualitative factors may lower thresholds:**\n• Misstatement affects compliance with loan covenants\n• Misstatement affects management compensation\n• Misstatement involves related parties\n• Misstatement changes a loss into income (or vice versa)\n• Misstatement masks a trend\n• Misstatement involves fraud"
        },
        {
          title: 'Materiality for Evaluation',
          type: 'text',
          content: "**At conclusion of audit:**\n\n**Evaluate:**\n• Uncorrected misstatements individually\n• Uncorrected misstatements in aggregate\n• Effect on F/S as a whole\n• Qualitative characteristics\n\n**If aggregate exceeds materiality:**\n→ Request management correct\n→ If not corrected, modify opinion"
        },
        {
          title: 'Revising Materiality',
          type: 'text',
          content: "**Materiality may need revision if:**\n\n• Circumstances change during audit\n• New information obtained\n• Actual results differ significantly from expected\n• Preliminary materiality was based on estimates\n\n**Direction of revision:**\n• Usually revised DOWNWARD (more conservative)\n• If revised lower, reconsider sufficiency of procedures"
        },
        {
          title: '⚠️ Exam Trap: Materiality Application',
          type: 'warning',
          content: "**Common exam mistakes:**\n\n**Wrong:** Using same materiality for all accounts\n**Right:** Consider specific item materiality for sensitive areas\n\n**Wrong:** Setting materiality only at planning\n**Right:** Revisit and potentially revise throughout audit\n\n**Wrong:** Only considering quantitative factors\n**Right:** Both qualitative AND quantitative matter!"
        },
        {
          title: 'Documentation',
          type: 'text',
          content: "**Must document:**\n\n• Overall materiality for F/S as a whole\n• Performance materiality\n• Basis for determining these amounts\n• Materiality for particular classes (if applicable)\n• Any revisions made during audit\n• Reasons for revisions"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Materiality = amount that would influence user's decision",
            "Three levels: Overall → Performance → Tolerable (for sampling)",
            "Common benchmarks: 3-5% of pretax income, 0.5-1% of revenue/assets",
            "Performance materiality typically 50-75% of overall",
            "Consider qualitative factors (covenants, trends, fraud) not just amounts",
            "Revise materiality if circumstances change (usually downward)",
            "Document materiality amounts, basis, and any revisions"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-003',
    section: 'AUD',
    title: "Audit Risk Model: AR = IR × CR × DR",
    description: "Understand the fundamental risk model that drives audit planning",
    order: 13,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Risk Assessment", "Audit Risk"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The audit risk model is the HEART of audit planning! It explains how auditors manage the risk of issuing an incorrect opinion. Understanding AR = IR × CR × DR helps you determine WHAT to test and HOW MUCH to test!"
        },
        {
          title: 'Audit Risk Defined',
          type: 'text',
          content: "**Audit Risk (AR):** Risk that the auditor expresses an inappropriate opinion when F/S are materially misstated.\n\n**The auditor's goal:** Reduce audit risk to an acceptably LOW level\n\n**Note:** We primarily worry about issuing an UNMODIFIED opinion on MISSTATED F/S (incorrect acceptance risk)"
        },
        {
          title: 'Components of the Model',
          type: 'text',
          content: "**AR = IR × CR × DR**\n\n**Inherent Risk (IR):** Susceptibility to material misstatement BEFORE considering controls\n\n**Control Risk (CR):** Risk that controls won't prevent/detect material misstatement\n\n**Detection Risk (DR):** Risk that audit procedures won't detect material misstatement\n\n**Note:** IR × CR = Risk of Material Misstatement (RMM)"
        },
        {
          title: 'The Model Visualized',
          type: 'text',
          content: "**Think of it as filters:**\n\n📝 Misstatements occur (INHERENT RISK)\n    ↓\n🔒 Controls may catch them (CONTROL RISK)\n    ↓\n🔍 Audit procedures may catch what's left (DETECTION RISK)\n    ↓\n⚠️ What gets through = AUDIT RISK\n\n**Each filter reduces risk!**"
        },
        {
          title: '🧠 Memory Aid: Risk Components',
          type: 'callout',
          content: "**\"I Can Detect\"**\n\n**I**nherent risk - Nature of account/transaction\n**C**ontrol risk - Effectiveness of client controls\n**D**etection risk - Our audit procedures\n\n**Key insight:**\n• IR and CR are CLIENT risks (we assess)\n• DR is AUDITOR risk (we control through our work)"
        },
        {
          title: 'Inherent Risk Factors',
          type: 'text',
          content: "**Higher IR when:**\n\n**Account characteristics:**\n• Complex calculations (derivatives, pensions)\n• Significant estimates involved\n• High volume of transactions\n• Manual vs automated processes\n\n**Entity factors:**\n• Industry under pressure\n• Complex transactions\n• Related party involvement\n• Management bias history"
        },
        {
          title: 'Control Risk Assessment',
          type: 'text',
          content: "**Control Risk reflects:**\n\n• Design of internal controls\n• Implementation of controls\n• Operating effectiveness (if tested)\n\n**To assess CR below maximum:**\n• Must understand relevant controls\n• Must test controls\n• Must find controls effective\n\n**Otherwise:** Assess CR at maximum and rely on substantive procedures"
        },
        {
          title: 'Detection Risk',
          type: 'text',
          content: "**Detection Risk is the AUDITOR'S lever:**\n\n**DR = AR ÷ (IR × CR)**\n\n**When IR × CR is HIGH:**\n→ DR must be LOW\n→ More persuasive procedures needed\n→ Larger sample sizes\n→ More experienced staff\n\n**When IR × CR is LOW:**\n→ DR can be higher\n→ Less extensive procedures acceptable"
        },
        {
          title: 'Inverse Relationship',
          type: 'table',
          headers: ['If RMM is...', 'Then DR should be...', 'And procedures are...'],
          rows: [
            ['HIGH', 'LOW', 'More extensive, larger samples'],
            ['MODERATE', 'MODERATE', 'Balanced approach'],
            ['LOW', 'HIGHER', 'Less extensive acceptable']
          ]
        },
        {
          title: '⚠️ Exam Trap: Risk Relationships',
          type: 'warning',
          content: "**Key relationships to remember:**\n\n**Inverse:** Higher RMM → Lower acceptable DR\n\n**Cannot reduce DR to zero!** Inherent limitations exist\n\n**Cannot directly control IR or CR** - these are client characteristics; we can only ASSESS them\n\n**We control DR** through nature, timing, and extent of procedures"
        },
        {
          title: 'Risk Assessment at Two Levels',
          type: 'text',
          content: "**Assess RMM at:**\n\n**1. Financial Statement Level:**\n• Pervasive risks affecting entire F/S\n• Control environment weaknesses\n• Management integrity concerns\n\n**2. Assertion Level:**\n• Specific account balances\n• Specific classes of transactions\n• Specific disclosures"
        },
        {
          title: 'Applying the Model',
          type: 'example',
          content: "**Example: Revenue Account**\n\n**Assessment:**\n• Inherent Risk: HIGH (complex contracts, estimates)\n• Control Risk: MODERATE (some controls, partially tested)\n• Risk of Material Misstatement: ABOVE MODERATE\n\n**Response:**\n• Detection Risk must be LOW\n• Extensive substantive testing\n• Larger sample sizes\n• More experienced staff\n• Testing closer to year-end"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Audit Risk = IR × CR × DR (or RMM × DR)",
            "IR = susceptibility to misstatement (nature of account)",
            "CR = risk controls won't prevent/detect (client's system)",
            "DR = risk audit procedures won't detect (our procedures)",
            "IR and CR assessed; DR is controlled by auditor",
            "Higher RMM → Lower DR required → More extensive testing",
            "Assess risk at financial statement AND assertion levels"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-004',
    section: 'AUD',
    title: "Understanding the Entity: Industry Factors",
    description: "Learn how industry knowledge helps identify audit risks",
    order: 14,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Risk Assessment", "Industry"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "You can't audit what you don't understand! Knowing the client's industry helps identify risks, understand transactions, and spot anomalies. Industry knowledge separates good auditors from great ones—and it's tested throughout AUD!"
        },
        {
          title: 'Why Industry Understanding Matters',
          type: 'text',
          content: "**Industry knowledge helps auditors:**\n\n• Identify inherent risks specific to industry\n• Understand normal vs unusual transactions\n• Assess reasonableness of accounting estimates\n• Evaluate competitive pressures\n• Understand regulatory requirements\n• Perform meaningful analytical procedures\n• Identify industry-specific fraud risks"
        },
        {
          title: 'Industry Risk Factors',
          type: 'text',
          content: "**Consider:**\n\n**Economic conditions:**\n• Industry growth or decline\n• Cyclical nature\n• Market demand\n• Pricing pressures\n\n**Competitive environment:**\n• Number of competitors\n• Barriers to entry\n• Disruptive technologies\n• Substitute products"
        },
        {
          title: 'Regulatory Environment',
          type: 'text',
          content: "**Industry-specific regulations:**\n\n**Examples:**\n• Banking: Capital requirements, loan loss provisions\n• Insurance: Reserve requirements, statutory accounting\n• Healthcare: Revenue recognition, compliance\n• Government contractors: Cost accounting standards\n• Oil & gas: Successful efforts vs full cost\n\n**Impact:** Regulations affect accounting, disclosure, and risk"
        },
        {
          title: '🧠 Memory Aid: Industry Analysis',
          type: 'callout',
          content: "**\"SPECTRUM\"** of industry factors:\n\n**S**upply chain dependencies\n**P**ricing and market dynamics\n**E**conomic conditions\n**C**ompetition intensity\n**T**echnology changes\n**R**egulatory requirements\n**U**nique accounting issues\n**M**arket trends\n\n**Industry knowledge = Context for everything!**"
        },
        {
          title: 'Industry-Specific Accounting',
          type: 'table',
          headers: ['Industry', 'Key Accounting Issues'],
          rows: [
            ['Banking', 'Loan losses, fair values, derivatives'],
            ['Insurance', 'Loss reserves, premium recognition'],
            ['Construction', 'Percentage-of-completion, estimates'],
            ['Real Estate', 'Revenue recognition, impairment'],
            ['Software', 'Revenue recognition, capitalization'],
            ['Retail', 'Inventory valuation, revenue recognition']
          ]
        },
        {
          title: 'Sources of Industry Information',
          type: 'text',
          content: "**Obtain understanding from:**\n\n**External sources:**\n• Industry publications and news\n• Analyst reports\n• Regulatory guidance\n• Trade associations\n• Prior audit experience\n\n**Internal sources:**\n• Industry specialists in firm\n• Training programs\n• Audit methodology guidance"
        },
        {
          title: 'Industry Trends and Risks',
          type: 'text',
          content: "**Monitor for:**\n\n**Declining industries:**\n• Going concern risks\n• Asset impairment\n• Restructuring\n\n**Rapidly growing industries:**\n• Revenue recognition pressure\n• Overstatement of assets\n• Understatement of liabilities\n\n**Changing industries:**\n• Obsolete inventory\n• Goodwill impairment\n• Technological disruption"
        },
        {
          title: '⚠️ Exam Trap: Industry Knowledge Application',
          type: 'warning',
          content: "**Don't just KNOW the industry—APPLY the knowledge:**\n\n**Wrong approach:** \"Banking uses fair value accounting\"\n\n**Right approach:** \"Given fair value requirements in banking, assess:\n• Valuation methodology reasonableness\n• Model inputs and assumptions\n• Disclosure completeness\n• Management bias in estimates\"\n\n**Connect industry factors to specific risks and procedures!**"
        },
        {
          title: 'Industry Comparisons',
          type: 'text',
          content: "**Use industry data for:**\n\n**Analytical procedures:**\n• Compare client ratios to industry benchmarks\n• Identify outliers requiring investigation\n• Assess reasonableness of trends\n\n**Risk assessment:**\n• Client significantly different from industry norm?\n• Why might that be?\n• Does it indicate risk or competitive advantage?"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Industry knowledge essential for identifying risks and understanding transactions",
            "Consider economic conditions, competition, regulations, technology",
            "Industry-specific accounting rules affect audit approach",
            "Sources: publications, analysts, regulators, firm specialists",
            "Apply industry knowledge to specific risk assessment and procedures",
            "Use industry benchmarks for analytical procedures",
            "Monitor industry trends for going concern and impairment risks"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-005',
    section: 'AUD',
    title: "Business Operations & Strategy",
    description: "Understand how business strategy affects financial reporting and audit risk",
    order: 15,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Risk Assessment", "Business Strategy"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "An entity's business strategy drives its financial results—and its risks. Understanding what the client is trying to achieve helps you identify where financial statements might be misstated. Strategic analysis connects business reality to audit procedures!"
        },
        {
          title: 'Business Strategy Considerations',
          type: 'text',
          content: "**Understand the entity's:**\n\n**Strategic direction:**\n• Growth vs maintenance\n• Geographic expansion\n• New products/services\n• Acquisitions or divestitures\n\n**Competitive positioning:**\n• Cost leadership vs differentiation\n• Niche vs mass market\n• Brand strength"
        },
        {
          title: 'Business Model Analysis',
          type: 'text',
          content: "**Understand how entity makes money:**\n\n**Revenue sources:**\n• Products vs services\n• One-time vs recurring\n• Customer concentration\n\n**Cost structure:**\n• Fixed vs variable costs\n• Key cost drivers\n• Break-even analysis\n\n**Value chain:**\n• Key activities\n• Dependencies on suppliers/customers"
        },
        {
          title: 'Strategy-Risk Connection',
          type: 'table',
          headers: ['Strategy', 'Potential Risks'],
          rows: [
            ['Rapid growth', 'Revenue overstatement, control weaknesses'],
            ['Cost cutting', 'Deferred maintenance, understated liabilities'],
            ['Acquisition strategy', 'Goodwill impairment, integration issues'],
            ['Market expansion', 'Collectibility of new receivables'],
            ['New products', 'Inventory obsolescence, warranty costs']
          ]
        },
        {
          title: '🧠 Memory Aid: Understanding the Business',
          type: 'callout',
          content: "**\"MOVIE\"** - Watch the client's story:\n\n**M**arket position and competition\n**O**perations and processes\n**V**alue proposition to customers\n**I**ncome sources and profitability\n**E**xternal factors and risks\n\n**The better you understand the MOVIE, the better you can audit the numbers!**"
        },
        {
          title: 'Operational Understanding',
          type: 'text',
          content: "**Key processes to understand:**\n\n**Revenue cycle:**\n• How orders are received and processed\n• Pricing and contract terms\n• Billing and collection process\n\n**Expenditure cycle:**\n• Purchasing and vendor management\n• Payment processing\n• Cost allocation methods"
        },
        {
          title: 'Related Party Relationships',
          type: 'text',
          content: "**Identify and understand:**\n\n**Related parties:**\n• Owners and key management\n• Affiliated entities\n• Joint ventures\n\n**Why it matters:**\n• Transactions may not be arm's length\n• Risk of undisclosed related parties\n• Potential for fraud or manipulation\n\n**Required disclosure** of material related party transactions"
        },
        {
          title: 'Key Performance Indicators',
          type: 'text',
          content: "**Understand what client tracks:**\n\n**Financial KPIs:**\n• Revenue growth\n• Profit margins\n• Return on equity\n\n**Non-financial KPIs:**\n• Customer satisfaction\n• Employee turnover\n• Production metrics\n\n**Why auditors care:** KPIs reveal what management focuses on—and where pressure exists"
        },
        {
          title: '⚠️ Exam Trap: Business Risk vs Audit Risk',
          type: 'warning',
          content: "**Business Risk:** Risk that business objectives won't be achieved\n\n**Audit Risk:** Risk of inappropriate audit opinion\n\n**Connection:** Business risks often lead to audit risks\n\n**Example:**\n• Business risk: Competitor launches better product\n• Leads to: Inventory obsolescence risk\n• Creates: Audit risk in inventory valuation"
        },
        {
          title: 'Sources of Information',
          type: 'text',
          content: "**Learn about business through:**\n\n**Internal:**\n• Tours of facilities\n• Interviews with management\n• Board meeting minutes\n• Strategic plans and budgets\n\n**External:**\n• SEC filings (10-K, proxy)\n• Press releases\n• Analyst reports\n• Customer reviews"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Business strategy drives financial results and risks",
            "Understand how the entity makes money (business model)",
            "Connect strategy to specific financial statement risks",
            "Rapid growth, cost cutting, acquisitions create specific risks",
            "Related party transactions require special attention",
            "KPIs reveal management focus and pressure points",
            "Business risk often leads to audit risk"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-006',
    section: 'AUD',
    title: "Financial Performance Measures",
    description: "Use financial metrics and ratios to identify audit risks",
    order: 16,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Risk Assessment", "Analytics"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Financial ratios and metrics tell a story about the entity's health and risks. Unusual ratios or trends may signal misstatement. Understanding how to interpret financial performance helps you focus audit effort where it matters most!"
        },
        {
          title: 'Why Analyze Financial Performance?',
          type: 'text',
          content: "**Financial analysis helps auditors:**\n\n• Identify unusual fluctuations\n• Understand entity's financial health\n• Assess going concern risk\n• Identify potential misstatements\n• Evaluate management's performance pressure\n• Compare to industry benchmarks\n• Set expectations for analytical procedures"
        },
        {
          title: 'Categories of Ratios',
          type: 'text',
          content: "**Four main categories:**\n\n**1. Liquidity:** Can entity pay current obligations?\n**2. Profitability:** Is entity making money?\n**3. Activity/Efficiency:** How well are assets used?\n**4. Leverage:** How is entity financed?"
        },
        {
          title: 'Key Liquidity Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'What It Shows'],
          rows: [
            ['Current Ratio', 'Current Assets / Current Liabilities', 'Short-term solvency'],
            ['Quick Ratio', '(Cash + AR + Securities) / Current Liabilities', 'Immediate liquidity'],
            ['Cash Ratio', 'Cash / Current Liabilities', 'Most conservative liquidity']
          ]
        },
        {
          title: 'Key Profitability Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'What It Shows'],
          rows: [
            ['Gross Margin', 'Gross Profit / Revenue', 'Production efficiency'],
            ['Net Profit Margin', 'Net Income / Revenue', 'Overall profitability'],
            ['ROA', 'Net Income / Total Assets', 'Asset utilization'],
            ['ROE', 'Net Income / Equity', 'Return to shareholders']
          ]
        },
        {
          title: '🧠 Memory Aid: DuPont Analysis',
          type: 'callout',
          content: "**ROE breakdown:**\n\n**ROE = Margin × Turnover × Leverage**\n\n(Net Income/Sales) × (Sales/Assets) × (Assets/Equity)\n\n**This shows:**\n• Margin: How profitable are sales?\n• Turnover: How efficiently used assets?\n• Leverage: How much debt financing?\n\n**Useful for identifying WHERE performance issues originate!**"
        },
        {
          title: 'Activity Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'What It Shows'],
          rows: [
            ['Inventory Turnover', 'COGS / Avg Inventory', 'Inventory efficiency'],
            ['Days in Inventory', '365 / Inventory Turnover', 'Time to sell inventory'],
            ['A/R Turnover', 'Credit Sales / Avg A/R', 'Collection efficiency'],
            ['Days Sales Outstanding', '365 / A/R Turnover', 'Collection period']
          ]
        },
        {
          title: 'Leverage Ratios',
          type: 'table',
          headers: ['Ratio', 'Formula', 'What It Shows'],
          rows: [
            ['Debt to Equity', 'Total Debt / Total Equity', 'Financial risk'],
            ['Debt Ratio', 'Total Debt / Total Assets', 'Asset financing'],
            ['Interest Coverage', 'EBIT / Interest Expense', 'Ability to pay interest']
          ]
        },
        {
          title: 'Ratio Analysis for Risk Assessment',
          type: 'text',
          content: "**Red flags from ratios:**\n\n**Declining gross margin:**\n→ Inventory overstatement?\n→ Revenue recognition issues?\n\n**Increasing DSO:**\n→ Collectibility problems?\n→ Revenue recorded before earned?\n\n**Increasing debt ratios:**\n→ Covenant violation risk?\n→ Going concern issues?"
        },
        {
          title: '⚠️ Exam Trap: Context Matters',
          type: 'warning',
          content: "**Ratios mean nothing without context:**\n\n**Compare to:**\n• Prior years (trend analysis)\n• Industry benchmarks\n• Budget/forecast\n• Management expectations\n\n**A \"bad\" ratio may be:**\n• Normal for the industry\n• Explained by known events\n• Sign of strategic change\n\n**Always investigate before concluding!**"
        },
        {
          title: 'Non-Financial Measures',
          type: 'text',
          content: "**Also consider:**\n\n**Operational metrics:**\n• Customer counts\n• Production volume\n• Employee headcount\n• Square footage\n\n**Why?** These should correlate with financial results\n\n**Example:** Revenue up 20% but customers down 10% → investigate!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Financial ratios help identify unusual fluctuations and risks",
            "Four categories: Liquidity, Profitability, Activity, Leverage",
            "DuPont analysis breaks ROE into margin, turnover, leverage",
            "Unexpected ratio changes may indicate misstatement",
            "Always compare to prior year, industry, and expectations",
            "Context matters—investigate before concluding",
            "Correlate financial with non-financial measures"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-007',
    section: 'AUD',
    title: "Internal Control: COSO Framework",
    description: "Master the COSO Internal Control Framework used in audit evaluation",
    order: 17,
    duration: 65,
    difficulty: 'intermediate',
    topics: ["Internal Control", "COSO"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "COSO is THE framework for internal control! Both AICPA and PCAOB use COSO concepts. Understanding its five components and 17 principles is essential for evaluating control design, identifying deficiencies, and determining your audit approach!"
        },
        {
          title: 'What is COSO?',
          type: 'text',
          content: "**Committee of Sponsoring Organizations (COSO):**\n\n**Internal Control – Integrated Framework (2013)**\n\n**Definition of internal control:**\nA process, effected by entity's board, management, and other personnel, designed to provide reasonable assurance regarding achievement of objectives.\n\n**Three objective categories:**\n1. Operations (effectiveness and efficiency)\n2. Reporting (reliable financial reporting)\n3. Compliance (with laws and regulations)"
        },
        {
          title: 'Five Components of Internal Control',
          type: 'text',
          content: "**The COSO Cube:**\n\n**1. Control Environment** (foundation)\n**2. Risk Assessment**\n**3. Control Activities**\n**4. Information & Communication**\n**5. Monitoring Activities**\n\n**All five must be present and functioning for effective internal control!**"
        },
        {
          title: '🧠 Memory Aid: COSO Components',
          type: 'callout',
          content: "**\"CRIME\"** doesn't happen with good controls:\n\n**C**ontrol Environment (tone at the top)\n**R**isk Assessment (identifying what can go wrong)\n**I**nformation & Communication (right info, right people)\n**M**onitoring (checking that controls work)\n**E**xecution of control activities (the actual controls)\n\n**Or:** \"**CRICA**\" = Control, Risk, Information, Control Activities, (monitoring)\"Anything\""
        },
        {
          title: 'Control Environment',
          type: 'text',
          content: "**The foundation—\"Tone at the Top\"**\n\n**Principles:**\n1. Commitment to integrity and ethical values\n2. Board independence and oversight\n3. Organizational structure and authority\n4. Commitment to competence\n5. Accountability for internal control\n\n**Most important component!** Weak control environment = weak overall controls"
        },
        {
          title: 'Risk Assessment',
          type: 'text',
          content: "**Entity's process for identifying and analyzing risks:**\n\n**Principles:**\n6. Specifies suitable objectives\n7. Identifies and analyzes risk\n8. Assesses fraud risk\n9. Identifies and assesses significant change\n\n**Key:** Entity must have objectives before risks can be assessed"
        },
        {
          title: 'Control Activities',
          type: 'text',
          content: "**The policies and procedures that address risks:**\n\n**Principles:**\n10. Selects and develops control activities\n11. Selects and develops technology controls\n12. Deploys through policies and procedures\n\n**Types of control activities:**\n• Authorization and approval\n• Verification and reconciliation\n• Physical controls\n• Segregation of duties\n• IT controls"
        },
        {
          title: 'Information & Communication',
          type: 'text',
          content: "**Getting the right information to the right people:**\n\n**Principles:**\n13. Uses relevant quality information\n14. Internal communication of IC information\n15. External communication (as appropriate)\n\n**Includes:**\n• Accounting system\n• Financial reporting process\n• Communication channels"
        },
        {
          title: 'Monitoring Activities',
          type: 'text',
          content: "**Ensuring controls continue to work:**\n\n**Principles:**\n16. Conducts ongoing and/or separate evaluations\n17. Evaluates and communicates deficiencies\n\n**Types:**\n• Ongoing monitoring (built into operations)\n• Separate evaluations (internal audit)\n• External evaluations (peer review, regulators)"
        },
        {
          title: 'Control Design vs Operating Effectiveness',
          type: 'table',
          headers: ['Design', 'Operating Effectiveness'],
          rows: [
            ['Control is properly designed', 'Control operates as designed'],
            ['Would control prevent/detect if it worked?', 'Did control actually prevent/detect?'],
            ['Evaluated through inquiry, observation', 'Tested through reperformance, sampling'],
            ['Assessed during risk assessment', 'Tested when relying on controls']
          ]
        },
        {
          title: '⚠️ Exam Trap: Component Integration',
          type: 'warning',
          content: "**All five components must work together!**\n\n**A deficiency in one component can undermine others:**\n\nExample: Weak control environment (management override) renders even well-designed control activities ineffective.\n\n**COSO is not a checklist:** Components are interrelated and operate as an integrated system."
        },
        {
          title: 'Relevance to Financial Reporting',
          type: 'text',
          content: "**Auditors focus on controls relevant to:**\n\n• Prevention/detection of material misstatement\n• Assertions in financial statements\n• Significant accounts and disclosures\n\n**Not all controls are relevant:**\n• Operations and compliance controls may not affect F/S\n• Focus on controls over financial reporting"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "COSO provides the framework for internal control evaluation",
            "Five components: Control Environment, Risk Assessment, Control Activities, Info & Communication, Monitoring",
            "17 principles underlie the components",
            "Control environment is foundation—tone at the top matters most",
            "All five components must be present AND functioning",
            "Distinguish between design effectiveness and operating effectiveness",
            "Focus on controls relevant to financial reporting assertions"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-008',
    section: 'AUD',
    title: "Evaluating Control Design & Implementation",
    description: "Learn to assess whether controls are properly designed and implemented",
    order: 18,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Internal Control", "Control Testing"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Before you can test whether controls work, you must determine if they're designed to address the risks. Evaluating design and implementation is a required step in every audit—and determines whether you can rely on controls to reduce substantive testing!"
        },
        {
          title: 'Understanding Controls',
          type: 'text',
          content: "**Auditor must obtain understanding of:**\n\n**1. Control environment**\n**2. Entity's risk assessment**\n**3. Information system and communication**\n**4. Control activities** (relevant to the audit)\n**5. Monitoring activities**\n\n**This understanding is REQUIRED regardless of audit approach!**"
        },
        {
          title: 'Design vs Implementation',
          type: 'text',
          content: "**Design Effectiveness:**\nWould the control, if operating as designed, prevent or detect material misstatement?\n\n**Implementation:**\nHas the control been put into operation? Does it exist?\n\n**Operating Effectiveness:**\nDid the control actually work throughout the period?\n\n**Sequence:** Design → Implementation → Operating Effectiveness"
        },
        {
          title: 'Evaluating Design',
          type: 'text',
          content: "**To evaluate control design:**\n\n**1. Identify the risk** the control addresses\n**2. Determine the assertion** affected\n**3. Assess whether control is capable of:**\n   • Preventing misstatement, OR\n   • Detecting misstatement timely\n\n**If poorly designed:** Cannot rely on control—test substantively"
        },
        {
          title: 'Procedures to Understand Controls',
          type: 'text',
          content: "**Methods to understand and evaluate:**\n\n**Inquiry:** Ask personnel who perform the control\n**Observation:** Watch the control being performed\n**Inspection:** Examine documents and reports\n**Walkthrough:** Trace transaction through the system\n\n**Note:** These evaluate design and implementation, not operating effectiveness"
        },
        {
          title: '🧠 Memory Aid: Walkthrough',
          type: 'callout',
          content: "**\"FOLLOW the transaction\"**\n\n**Start:** Transaction initiation\n**Follow:** Through each processing step\n**Observe:** Controls along the way\n**Learn:** How system actually works\n**Obtain:** Evidence of design and implementation\n**Witness:** Control execution\n\n**A walkthrough combines inquiry, observation, and inspection!**"
        },
        {
          title: 'Walkthrough Procedures',
          type: 'text',
          content: "**Effective walkthroughs:**\n\n**Select a transaction** from each significant class\n\n**Trace through entire process:**\n• Initiation\n• Authorization\n• Recording\n• Processing\n• Reporting\n\n**At each step:**\n• Inquire about procedures\n• Observe controls being performed\n• Inspect documentation"
        },
        {
          title: 'Documenting Understanding',
          type: 'text',
          content: "**Document using:**\n\n**Narratives:** Written descriptions of processes\n**Flowcharts:** Visual representation of transaction flow\n**Questionnaires:** Standardized checklists\n**Combination:** Multiple methods together\n\n**Include:**\n• Process descriptions\n• Control points identified\n• Personnel responsible\n• Documents and systems used"
        },
        {
          title: 'Control Deficiency Evaluation',
          type: 'text',
          content: "**Design deficiency exists when:**\n• Control is missing, OR\n• Control not properly designed to prevent/detect\n\n**Implementation deficiency exists when:**\n• Control is designed properly but not in operation\n\n**Either can result in:**\n• Significant deficiency\n• Material weakness\n• Depending on likelihood and magnitude of potential misstatement"
        },
        {
          title: '⚠️ Exam Trap: Understanding is Always Required',
          type: 'warning',
          content: "**Common misconception:**\n\"If I don't plan to rely on controls, I don't need to understand them.\"\n\n**WRONG!** Understanding internal control is REQUIRED on every audit:\n• Required to assess risk of material misstatement\n• Required to design appropriate procedures\n• Required to identify deficiencies to communicate\n\n**What's optional:** Testing operating effectiveness (if not relying)"
        },
        {
          title: 'Response to Deficiencies',
          type: 'text',
          content: "**When design/implementation deficiency found:**\n\n**1. Consider effect on:**\n   • Risk assessment\n   • Nature, timing, extent of procedures\n   • Other controls that might compensate\n\n**2. Determine severity:**\n   • Significant deficiency?\n   • Material weakness?\n\n**3. Communicate to governance** (in writing for material weaknesses and significant deficiencies)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Understanding controls is REQUIRED on every audit",
            "Design effectiveness: Would control prevent/detect if it worked?",
            "Implementation: Has control been put into operation?",
            "Procedures: Inquiry, observation, inspection, walkthrough",
            "Walkthroughs trace transactions through the entire system",
            "Document using narratives, flowcharts, and/or questionnaires",
            "Deficiencies must be evaluated and communicated to governance"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-009',
    section: 'AUD',
    title: "IT Controls: General & Application",
    description: "Understand IT controls and their impact on the audit",
    order: 19,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Internal Control", "IT Controls"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Almost every modern audit involves IT systems! Understanding IT general controls (ITGCs) and application controls is essential—if IT controls are weak, you can't rely on automated controls or computer-generated data. This topic is increasingly important on AUD!"
        },
        {
          title: 'Why IT Controls Matter',
          type: 'text',
          content: "**IT affects audits because:**\n\n• Transactions initiated, recorded, processed by computers\n• Reports generated automatically\n• Many controls are automated\n• Audit evidence exists only electronically\n\n**Weak IT controls can undermine:**\n• Automated controls\n• System-generated reports\n• Data integrity\n• Audit evidence reliability"
        },
        {
          title: 'Two Types of IT Controls',
          type: 'text',
          content: "**1. IT General Controls (ITGCs):**\n• Controls over IT environment\n• Apply to all applications\n• Foundation for application controls\n\n**2. Application Controls:**\n• Controls within specific applications\n• Relate to transaction processing\n• Prevent, detect, correct errors in transactions"
        },
        {
          title: 'IT General Controls (ITGCs)',
          type: 'text',
          content: "**Four main categories:**\n\n**1. Access controls:** Who can access systems/data?\n**2. Change management:** How are programs modified?\n**3. Operations:** Are systems properly operated?\n**4. System development:** How are systems designed/implemented?\n\n**ITGCs support reliability of application controls!**"
        },
        {
          title: '🧠 Memory Aid: ITGC Categories',
          type: 'callout',
          content: "**\"ASCO\"** - IT General Controls:\n\n**A**ccess controls (security)\n**S**ystem development (new systems)\n**C**hange management (modifications)\n**O**perations (computer operations)\n\n**Think:** ASCO protects the IT DISCO where data dances!"
        },
        {
          title: 'Access Controls',
          type: 'text',
          content: "**Restrict access to:**\n\n• Programs and data files\n• Application functions\n• Operating systems\n\n**Key controls:**\n• User authentication (passwords, MFA)\n• Access provisioning/deprovisioning\n• Privileged access management\n• Physical access to computer facilities\n• Segregation of duties within IT"
        },
        {
          title: 'Change Management',
          type: 'text',
          content: "**Controls over program changes:**\n\n• Changes properly authorized\n• Changes tested before implementation\n• Changes approved before production\n• Emergency changes controlled\n• Documentation maintained\n\n**Risk:** Unauthorized changes could alter processing logic or introduce errors"
        },
        {
          title: 'Application Controls',
          type: 'table',
          headers: ['Control Type', 'Purpose', 'Example'],
          rows: [
            ['Input controls', 'Ensure accurate, complete input', 'Edit checks, validation rules'],
            ['Processing controls', 'Ensure accurate processing', 'Batch totals, sequence checks'],
            ['Output controls', 'Ensure accurate, authorized output', 'Report distribution controls'],
            ['Master file controls', 'Protect standing data', 'Authorization for changes']
          ]
        },
        {
          title: 'Common Application Controls',
          type: 'text',
          content: "**Input controls:**\n• Format checks (valid data types)\n• Range checks (reasonable values)\n• Validity checks (valid codes)\n• Completeness checks (required fields)\n\n**Processing controls:**\n• Batch totals\n• Run-to-run controls\n• Exception reports\n\n**Output controls:**\n• Review of reports\n• Distribution restrictions"
        },
        {
          title: 'Relationship: ITGCs and Application Controls',
          type: 'text',
          content: "**ITGCs support application controls:**\n\n**If ITGCs are weak:**\n• Cannot rely on automated controls\n• Manual controls may be circumvented\n• Reports used for testing may be unreliable\n\n**Example:** If anyone can change programs, automated three-way match control could be modified to always match"
        },
        {
          title: '⚠️ Exam Trap: Testing IT Controls',
          type: 'warning',
          content: "**If planning to rely on application controls:**\n\nMust also test related ITGCs!\n\n**Why?** Application controls are only as reliable as the IT environment\n\n**If ITGCs deficient:**\n• Can't rely on automated application controls\n• Must perform additional substantive testing\n• May need to test controls more frequently"
        },
        {
          title: 'Using IT Specialists',
          type: 'text',
          content: "**Consider using IT audit specialists when:**\n\n• Complex IT environment\n• Significant automated controls\n• High volume of electronic transactions\n• Reliance on system-generated reports\n• Testing of ITGCs required\n\n**Auditor responsibility:** Even when using specialists, auditor is responsible for conclusions"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IT controls critical in modern audits—most transactions electronic",
            "ITGCs: Access, System development, Change management, Operations",
            "Application controls: Input, Processing, Output controls",
            "ITGCs are foundation—weak ITGCs undermine application controls",
            "To rely on automated controls, must test related ITGCs",
            "Weak IT controls → more substantive testing needed",
            "Consider using IT audit specialists for complex environments"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-010',
    section: 'AUD',
    title: "Identifying & Assessing RMM",
    description: "Learn to identify and assess risks of material misstatement",
    order: 20,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Risk Assessment", "RMM"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Risk assessment is the HEART of the audit! Identifying where material misstatements are likely to occur drives everything else—what you test, how much you test, when you test. Get risk assessment wrong and the whole audit is off track!"
        },
        {
          title: 'Risk of Material Misstatement',
          type: 'text',
          content: "**RMM = IR × CR**\n\n**Risk of Material Misstatement (RMM):**\nThe risk that financial statements contain material misstatement BEFORE the audit is conducted.\n\n**Two components:**\n• Inherent risk (nature of account/transaction)\n• Control risk (effectiveness of controls)\n\n**Assess at:** F/S level AND assertion level"
        },
        {
          title: 'Risk Assessment Process',
          type: 'text',
          content: "**Steps:**\n\n**1. Identify risks** of material misstatement\n   • Through understanding the entity\n   • Through understanding internal control\n\n**2. Relate risks to assertions** affected\n\n**3. Assess likelihood and magnitude**\n   • How likely is misstatement?\n   • How big could it be?\n\n**4. Determine if significant risk**"
        },
        {
          title: 'Risk Identification Sources',
          type: 'text',
          content: "**Identify risks through understanding:**\n\n• Industry and external factors\n• Nature of the entity\n• Accounting policies and practices\n• Entity objectives and strategies\n• Financial performance measures\n• Internal control components\n• Fraud risk factors"
        },
        {
          title: '🧠 Memory Aid: Risk Assessment',
          type: 'callout',
          content: "**\"WHERE\" are the risks?**\n\n**W**hat can go wrong? (inherent risk)\n**H**ow likely is it? (probability)\n**E**xposure—how big? (magnitude)\n**R**esponses—what controls exist? (control risk)\n**E**valuate overall RMM\n\n**Think through WHERE risks hide in each account!**"
        },
        {
          title: 'Risk at Financial Statement Level',
          type: 'text',
          content: "**Pervasive risks affecting many accounts:**\n\n**Examples:**\n• Weak control environment\n• Management integrity issues\n• Going concern doubt\n• Complex accounting issues\n• Significant unusual transactions\n\n**Response:** Generally affects overall audit approach\n• More experienced staff\n• Increased professional skepticism\n• More extensive supervision"
        },
        {
          title: 'Risk at Assertion Level',
          type: 'text',
          content: "**Specific to accounts and disclosures:**\n\n**For each significant account, assess:**\n• What could be misstated?\n• Which assertion affected?\n• How likely and how big?\n\n**Common high-risk areas:**\n• Revenue (existence, cutoff)\n• Accounts receivable (valuation)\n• Inventory (existence, valuation)\n• Estimates (valuation)"
        },
        {
          title: 'Assertions Refresher',
          type: 'table',
          headers: ['Transactions', 'Balances', 'Disclosures'],
          rows: [
            ['Occurrence', 'Existence', 'Occurrence/Rights'],
            ['Completeness', 'Completeness', 'Completeness'],
            ['Accuracy', 'Valuation/Allocation', 'Accuracy/Valuation'],
            ['Cutoff', 'Rights/Obligations', 'Classification'],
            ['Classification', '', 'Understandability']
          ]
        },
        {
          title: 'Linking Risks to Assertions',
          type: 'example',
          content: "**Example: Accounts Receivable**\n\n**Risk:** Economic downturn may impair collectibility\n\n**Assertion affected:** Valuation (net realizable value)\n\n**Response:** Test allowance for doubtful accounts:\n• Review aging\n• Evaluate subsequent cash receipts\n• Test management's estimation process\n• Assess adequacy of allowance"
        },
        {
          title: '⚠️ Exam Trap: Do Not Assess All Risks as High',
          type: 'warning',
          content: "**Risk assessment requires JUDGMENT:**\n\n**Wrong:** Assess everything as high risk to be safe\n\n**Why this is wrong:**\n• Leads to overauditing\n• Inefficient use of resources\n• Does not reflect actual risk profile\n\n**Right approach:**\n• Thoughtful analysis of each area\n• Support with evidence\n• Different risks = different responses"
        },
        {
          title: 'Documentation Requirements',
          type: 'text',
          content: "**Document:**\n\n• Discussion among engagement team\n• Key elements of understanding obtained\n• Identified risks of material misstatement\n• Assessment at F/S and assertion level\n• Significant risks identified\n• Risks for which substantive alone not sufficient\n• Basis for assessments made"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "RMM = risk F/S are materially misstated before audit",
            "Assess RMM at financial statement level AND assertion level",
            "Identify risks through understanding entity and controls",
            "Link each identified risk to specific assertions",
            "Consider likelihood AND magnitude of potential misstatement",
            "F/S level risks affect overall approach; assertion level drives specific tests",
            "Document risks, assessments, and basis for conclusions"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-011',
    section: 'AUD',
    title: "Significant Risks",
    description: "Identify and respond to risks requiring special audit consideration",
    order: 21,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Risk Assessment", "Significant Risks"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Not all risks are equal! Significant risks require special audit consideration—they're the high-stakes areas that keep auditors up at night. Revenue recognition is presumed a significant risk on EVERY audit. Understanding how to identify and respond to significant risks is crucial for the exam!"
        },
        {
          title: 'What is a Significant Risk?',
          type: 'text',
          content: "**Definition:**\nAn identified risk of material misstatement that, in the auditor's judgment, requires special audit consideration.\n\n**Special audit consideration includes:**\n• Obtaining understanding of controls\n• Substantive procedures specifically responsive to the risk\n• Cannot use prior year evidence—must test in current year"
        },
        {
          title: 'Criteria for Significant Risk',
          type: 'text',
          content: "**Consider whether the risk:**\n\n**1. Is a fraud risk**\n**2. Relates to significant unusual transactions**\n**3. Involves significant management judgment**\n**4. Relates to recent significant developments**\n\n**Also consider:**\n• Complexity of transactions\n• Related party transactions\n• Significant non-routine transactions"
        },
        {
          title: '🧠 Memory Aid: Significant Risk Factors',
          type: 'callout',
          content: "**\"FUSE\"** ignites significant risk:\n\n**F**raud risk (presumed for revenue)\n**U**nusual transactions (non-routine)\n**S**ubjectivity/judgment (estimates)\n**E**vents—recent significant changes\n\n**When FUSE is lit, give special attention!**"
        },
        {
          title: 'Presumed Significant Risks',
          type: 'text',
          content: "**Revenue Recognition:**\n\n**Presumed to be a significant risk** on every audit!\n\n**Why?** Revenue can be manipulated through:\n• Fictitious sales (existence)\n• Premature recognition (cutoff)\n• Side agreements (accuracy)\n• Channel stuffing (occurrence)\n\n**Auditor can rebut** the presumption, but must document why if doing so."
        },
        {
          title: 'Required Responses',
          type: 'text',
          content: "**For all significant risks:**\n\n**1. Evaluate design** of related controls\n**2. Determine if controls implemented**\n**3. Perform substantive procedures responsive** to the specific risk\n\n**Note:** Cannot use prior period audit evidence for significant risks—must obtain evidence in current period"
        },
        {
          title: 'Significant Risk Examples',
          type: 'table',
          headers: ['Area', 'Why Significant', 'Typical Response'],
          rows: [
            ['Revenue recognition', 'Fraud risk, management pressure', 'Cutoff testing, confirmations, analytics'],
            ['Management estimates', 'Subjectivity, judgment', 'Develop independent estimate, test inputs'],
            ['Related party transactions', 'Undisclosed terms possible', 'Detailed inquiry, extended procedures'],
            ['Non-routine transactions', 'Lack of experience', 'Examine supporting documentation'],
            ['Going concern', 'Significant judgment', 'Evaluate management plans, assess liquidity']
          ]
        },
        {
          title: '⚠️ Exam Trap: Cannot Skip Control Understanding',
          type: 'warning',
          content: "**For significant risks:**\n\nMust obtain understanding of controls EVEN IF not planning to rely on them!\n\n**Why?** Need to know:\n• What controls exist\n• Whether they're designed and implemented\n• Whether control deficiencies exist\n\n**This is different from testing operating effectiveness** (which remains optional if not relying)"
        },
        {
          title: 'Documentation for Significant Risks',
          type: 'text',
          content: "**Document:**\n\n• Why risk identified as significant\n• Understanding of related controls obtained\n• Specific substantive procedures performed\n• Link between risk and procedures\n• Conclusions reached\n\n**Critical:** Show clear linkage between identified risks and audit procedures performed"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Significant risks require special audit consideration",
            "Criteria: Fraud risk, unusual transactions, judgment, recent events",
            "Revenue recognition is presumed significant risk (rebuttable)",
            "Must evaluate control design and implementation for significant risks",
            "Substantive procedures must be responsive to specific risk",
            "Can't use prior year evidence for significant risks",
            "Document why significant and link risks to procedures"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-012',
    section: 'AUD',
    title: "Fraud Risk Assessment",
    description: "Understand the auditor's responsibility for fraud and the fraud triangle",
    order: 22,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Risk Assessment", "Fraud"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Fraud is always a concern in audits! AU-C 240 (AS 2401 for PCAOB) requires specific consideration of fraud risk. You must understand the fraud triangle, required procedures, and how management override always represents a fraud risk. This is HEAVILY tested on AUD!"
        },
        {
          title: 'Auditor Responsibility for Fraud',
          type: 'text',
          content: "**Auditor is responsible for:**\n\n• Obtaining reasonable assurance F/S are free of MATERIAL misstatement, whether due to fraud or error\n\n**Auditor is NOT responsible for:**\n• Detecting ALL fraud\n• Immaterial fraud\n• Fraud that doesn't affect F/S\n\n**Key:** Maintain professional skepticism—don't assume honesty or dishonesty!"
        },
        {
          title: 'Two Types of Fraud',
          type: 'text',
          content: "**1. Fraudulent Financial Reporting:**\n• Intentional misstatement or omission\n• Management perpetrates\n• Designed to deceive users\n\n**2. Misappropriation of Assets:**\n• Theft of entity assets\n• Employees more often (but can be management)\n• Usually concealed through false records\n\n**Fraudulent reporting usually more material!**"
        },
        {
          title: 'The Fraud Triangle',
          type: 'text',
          content: "**Three conditions present when fraud occurs:**\n\n**1. Incentive/Pressure:**\n• Need or desire to commit fraud\n• Bonus targets, debt covenants, personal problems\n\n**2. Opportunity:**\n• Ability to commit fraud\n• Weak controls, management override\n\n**3. Rationalization:**\n• Attitude that permits fraud\n• \"I deserve it,\" \"I'll pay it back\""
        },
        {
          title: '🧠 Memory Aid: Fraud Triangle',
          type: 'callout',
          content: "**\"PIE\"** of Fraud:\n\n**P**ressure (incentive to do it)\n**I** can do it (opportunity exists)\n**E**xcuse it away (rationalization)\n\n**Remove any slice and fraud is less likely!**\n\n**Think:** Fraudsters want a PIE and will take it if conditions allow!"
        },
        {
          title: 'Fraud Risk Factors',
          type: 'table',
          headers: ['Category', 'Examples'],
          rows: [
            ['Incentive/Pressure', 'Bonus tied to targets, debt covenants, personal financial problems'],
            ['Opportunity', 'Weak controls, related party transactions, management override'],
            ['Rationalization', 'Management disregard for ethics, high turnover of ethical employees']
          ]
        },
        {
          title: 'Required Fraud Risk Procedures',
          type: 'text',
          content: "**On every audit:**\n\n**1. Discussion among engagement team** about fraud risks\n**2. Inquire of management** about fraud programs, knowledge of fraud\n**3. Consider fraud risk factors** (fraud triangle)\n**4. Perform analytical procedures** for unusual relationships\n**5. Consider other information** indicating fraud may exist"
        },
        {
          title: 'Management Override',
          type: 'text',
          content: "**ALWAYS a fraud risk—cannot be rebutted!**\n\n**Why?** Management has unique ability to:\n• Override controls\n• Direct employees to do their bidding\n• Manipulate records\n• Prepare false entries\n\n**Required procedures to address:**\n• Test journal entries and adjustments\n• Review accounting estimates for bias\n• Evaluate business rationale for unusual transactions"
        },
        {
          title: '⚠️ Exam Trap: Revenue Fraud Risk',
          type: 'warning',
          content: "**Two presumptions:**\n\n**1. Revenue recognition is a fraud risk** (can rebut with documentation)\n\n**2. Management override is ALWAYS a fraud risk** (CANNOT rebut!)\n\n**Common mistake:** Treating these the same. Revenue CAN be rebutted in specific circumstances; override CANNOT."
        },
        {
          title: 'Responding to Fraud Risks',
          type: 'text',
          content: "**General responses:**\n• Assign more experienced staff\n• Increase professional skepticism\n• More supervision and review\n• Evaluate accounting policies for bias\n• Incorporate unpredictability\n\n**Specific responses:**\n• Procedures directly targeting identified fraud risks\n• Change timing, extent, or nature of procedures\n• Perform procedures management wouldn't anticipate"
        },
        {
          title: 'When Fraud is Identified',
          type: 'text',
          content: "**If fraud or suspected fraud:**\n\n**1. Communicate to appropriate level of management** (unless management involved)\n**2. Communicate to governance** (always if management involved)\n**3. Consider effect on audit**\n**4. Consider legal requirements** (some require reporting to regulators)\n**5. Consider withdrawal** from engagement if appropriate\n\n**Document:** All fraud-related findings and conclusions"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Auditor responsible for reasonable assurance—not detecting all fraud",
            "Two types: Fraudulent financial reporting, misappropriation of assets",
            "Fraud triangle: Pressure/Incentive, Opportunity, Rationalization",
            "Identify fraud risk factors in each category",
            "Revenue fraud risk can be rebutted; management override CANNOT",
            "Required procedures: team discussion, inquiries, analytics, journal entry testing",
            "Communicate fraud to management and governance"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-001',
    section: 'AUD',
    title: "Audit Evidence: Sufficiency & Appropriateness",
    description: "Understand what makes audit evidence sufficient and appropriate",
    order: 23,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Audit Evidence"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "All audit conclusions rest on EVIDENCE! You must understand what makes evidence \"sufficient\" (quantity) and \"appropriate\" (quality). The higher the risk, the more and better evidence you need. This concept underlies everything else in auditing!"
        },
        {
          title: 'What is Audit Evidence?',
          type: 'text',
          content: "**Definition:**\nAll information used by the auditor to arrive at conclusions on which the audit opinion is based.\n\n**Includes:**\n• Information in accounting records\n• Information from other sources (third parties, client, generated by auditor)\n\n**Evidence must be:**\n• Sufficient (quantity)\n• Appropriate (quality)"
        },
        {
          title: 'Sufficiency vs Appropriateness',
          type: 'text',
          content: "**Sufficiency = QUANTITY**\n• How much evidence is needed?\n• Measure of quantity\n• Affected by risk assessment\n• More risk = more evidence\n\n**Appropriateness = QUALITY**\n• Relevance and reliability\n• Does it address the assertion?\n• Can we trust it?\n• Quality can compensate for quantity"
        },
        {
          title: '🧠 Memory Aid: Evidence Quality',
          type: 'callout',
          content: "**\"RIPE\"** evidence is best:\n\n**R**elevant to the assertion\n**I**ndependent source (external > internal)\n**P**erformed directly by auditor\n**E**ffective internal controls over it\n\n**Ripe evidence doesn't need to be questioned—unripe evidence does!**"
        },
        {
          title: 'Relevance',
          type: 'text',
          content: "**Evidence must address the assertion being tested:**\n\n**Example: Accounts Receivable**\n• Existence assertion → Confirmation from customer\n• Valuation assertion → Subsequent cash receipts\n• Completeness assertion → Confirmation WON'T help!\n\n**Key:** Match evidence to the specific assertion—not all evidence is relevant to all assertions"
        },
        {
          title: 'Reliability Hierarchy',
          type: 'text',
          content: "**More reliable:**\n• External sources (vs internal)\n• Auditor-generated (vs client-generated)\n• Documentary (vs oral)\n• Original documents (vs copies)\n• Strong internal controls (vs weak)\n\n**Less reliable:**\n• Internal sources\n• Client-prepared\n• Oral representations\n• Faxes, copies, photocopies\n• Weak internal controls"
        },
        {
          title: 'Reliability Guidelines',
          type: 'table',
          headers: ['Factor', 'More Reliable', 'Less Reliable'],
          rows: [
            ['Source', 'External (independent)', 'Internal (client)'],
            ['Generator', 'Auditor creates/obtains', 'Client provides'],
            ['Form', 'Documentary', 'Oral'],
            ['Document', 'Original', 'Copy/fax'],
            ['Controls', 'Strong IC over evidence', 'Weak IC over evidence']
          ]
        },
        {
          title: 'Risk and Evidence Relationship',
          type: 'text',
          content: "**Higher RMM → More/Better Evidence:**\n\n• Increase sample size (sufficiency)\n• Use more reliable sources (appropriateness)\n• Use multiple sources (corroboration)\n• Test more locations/periods\n\n**Lower RMM:**\n• May reduce sample size\n• May accept less persuasive evidence\n\n**Professional judgment always required!**"
        },
        {
          title: '⚠️ Exam Trap: Quantity vs Quality Trade-off',
          type: 'warning',
          content: "**Higher quality can compensate for lower quantity!**\n\n**Example:**\nOne bank confirmation (high quality) is better than 100 internal reconciliations (lower quality)\n\n**BUT:** Quantity of low-quality evidence cannot compensate for lack of reliability.\n\n**Cannot just \"test more\" of unreliable evidence and call it sufficient!**"
        },
        {
          title: 'Evaluating Evidence Obtained',
          type: 'text',
          content: "**Questions to ask:**\n\n**1. Is evidence sufficient?**\n• Enough to support conclusion?\n• Higher risk = need more\n\n**2. Is evidence appropriate?**\n• Relevant to assertion tested?\n• Reliable given source and nature?\n\n**3. Is evidence corroborated?**\n• Consistent with other evidence?\n• Contradictory evidence investigated?"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Audit evidence = all information supporting audit conclusions",
            "Sufficiency = quantity; Appropriateness = quality (relevance + reliability)",
            "Higher risk requires more and better evidence",
            "External, auditor-generated, documentary evidence is most reliable",
            "Evidence must be relevant to the assertion being tested",
            "Quality can compensate for quantity, but not vice versa",
            "Consider corroboration—does evidence agree with other evidence?"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-002',
    section: 'AUD',
    title: "External Confirmations",
    description: "Master confirmation procedures for accounts receivable, payable, and more",
    order: 24,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Audit Evidence", "Confirmations"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "External confirmations are audit GOLD—they're independent evidence directly from third parties! Confirmations are standard procedure for A/R, cash, and legal contingencies. Know when to use them, how to maintain control, and what to do with exceptions. This is tested constantly!"
        },
        {
          title: 'What is External Confirmation?',
          type: 'text',
          content: "**Definition:**\nAudit evidence obtained as a direct written response to the auditor from a third party.\n\n**Common confirmations:**\n• Accounts receivable (customers)\n• Cash balances (banks)\n• Accounts payable (vendors)\n• Loans and debt (lenders)\n• Legal matters (attorneys)\n• Investments (custodians)"
        },
        {
          title: 'Why Confirmations Are Reliable',
          type: 'text',
          content: "**High reliability because:**\n\n• **External source** (independent of client)\n• **Direct to auditor** (client can't intercept)\n• **Written form** (documentary)\n• **Responsive to specific inquiry**\n\n**Particularly effective for:**\n• Existence assertion (does it exist?)\n• Rights/obligations (who owns it?)"
        },
        {
          title: 'Types of Confirmations',
          type: 'table',
          headers: ['Type', 'Description', 'Best For'],
          rows: [
            ['Positive—with info', 'Confirms specific balance; asks to respond either way', 'A/R, large balances'],
            ['Positive—blank', 'Asks recipient to fill in balance', 'More reliable but lower response'],
            ['Negative', 'Respond only if disagree', 'Many small balances, strong IC']
          ]
        },
        {
          title: '🧠 Memory Aid: Positive vs Negative',
          type: 'callout',
          content: "**Positive = \"Please respond\"** (always respond)\n**Negative = \"No news is good news\"** (respond only if wrong)\n\n**Use POSITIVE when:**\n• Few customers with large balances\n• Risk of material misstatement is higher\n• Controls are weaker\n\n**Use NEGATIVE when:**\n• Many small balances\n• Controls are strong\n• Low expectation of dispute"
        },
        {
          title: 'Auditor Control Over Confirmations',
          type: 'text',
          content: "**Auditor MUST maintain control:**\n\n**1. Select items** to confirm\n**2. Prepare requests** (or review client-prepared)\n**3. Send directly** to third party\n**4. Receive responses directly** (auditor's address/fax/email)\n\n**Why?** Client could alter requests or intercept responses\n\n**Critical:** Verify addresses are valid (client could provide fake addresses)"
        },
        {
          title: 'Non-responses',
          type: 'text',
          content: "**If no response to positive confirmation:**\n\n**1. Send second request**\n**2. Consider alternative methods** (phone, electronic)\n**3. Perform alternative procedures:**\n   • Examine subsequent cash receipts\n   • Review shipping documents\n   • Examine sales invoices and contracts\n\n**For negative:** Non-response assumed to agree (risky!)"
        },
        {
          title: 'Exceptions and Reconciling Items',
          type: 'text',
          content: "**When confirmed amount differs from book:**\n\n**Investigate cause:**\n• Timing differences (cash in transit, goods in transit)\n• Customer disputes\n• Clerical errors (customer or client)\n• Misstatements\n\n**Document resolution** of all exceptions\n\n**Consider implications** for other balances"
        },
        {
          title: '⚠️ Exam Trap: Completeness Assertion',
          type: 'warning',
          content: "**Confirmations are NOT effective for completeness!**\n\n**Why?** You confirm what's recorded—can't confirm what ISN'T recorded.\n\n**For A/R completeness:**\n• Trace shipping documents to sales journal\n• Review subsequent cash receipts for unrecorded A/R\n\n**Don't rely on confirmations to find unrecorded transactions!**"
        },
        {
          title: 'Management Refusal to Allow',
          type: 'text',
          content: "**If management refuses confirmation:**\n\n**1. Inquire about reasons**\n• Are reasons valid?\n• Does refusal make sense?\n\n**2. Evaluate implications** for risk assessment\n\n**3. Perform alternative procedures**\n\n**4. Consider effect on opinion** if alternatives insufficient\n\n**Document:** Reasons for refusal and conclusions"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "External confirmations are highly reliable—external, direct, written",
            "Positive confirmations: respond either way; Negative: respond only if disagree",
            "Auditor must maintain control—send and receive directly",
            "Non-responses require follow-up and alternative procedures",
            "Investigate all exceptions—timing, disputes, or misstatements",
            "Confirmations are great for existence, NOT for completeness",
            "Document management refusals and perform alternatives"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-003',
    section: 'AUD',
    title: "Analytical Procedures",
    description: "Use relationships in data to identify risks and evaluate conclusions",
    order: 25,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Audit Evidence", "Analytics"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Analytical procedures help you see the big picture! They're REQUIRED during planning and final review, and optional as substantive testing. Analytics compare financial data to expectations—when expectations don't match reality, investigate! This efficient technique is heavily tested."
        },
        {
          title: 'What Are Analytical Procedures?',
          type: 'text',
          content: "**Definition:**\nEvaluations of financial information through analysis of plausible relationships among financial and non-financial data.\n\n**Includes:**\n• Comparison to prior periods\n• Comparison to budgets/forecasts\n• Comparison to industry data\n• Ratio analysis\n• Trend analysis\n• Reasonableness tests"
        },
        {
          title: 'Three Uses of Analytics',
          type: 'table',
          headers: ['Purpose', 'Stage', 'Required?'],
          rows: [
            ['Risk assessment', 'Planning', 'YES—required'],
            ['Substantive testing', 'Fieldwork', 'NO—optional'],
            ['Overall review', 'Completion', 'YES—required']
          ]
        },
        {
          title: '🧠 Memory Aid: Analytics Uses',
          type: 'callout',
          content: "**\"PRO\"** uses analytics:\n\n**P**lanning (REQUIRED—identify risks)\n**R**esponse (optional—substantive analytics)\n**O**verall review (REQUIRED—final reasonableness)\n\n**P and O are bookends—always required!**\n**R (substantive) is your choice based on circumstances**"
        },
        {
          title: 'Planning Analytics',
          type: 'text',
          content: "**Purpose:** Identify risks of material misstatement\n\n**Procedures:**\n• Compare to prior year\n• Compare to budget\n• Ratio analysis\n• Unusual fluctuations = investigate\n\n**Example:** Gross margin dropped 5%—why?\n• Increased competition?\n• Inventory overstatement last year?\n• Revenue recognition change?\n\n**Analytics help direct audit attention!**"
        },
        {
          title: 'Substantive Analytical Procedures',
          type: 'text',
          content: "**Use as substantive test when:**\n\n• Relationship is predictable\n• Data is reliable\n• Expectation is precise\n• Appropriate for assertion\n\n**Steps:**\n1. Develop independent expectation\n2. Define acceptable difference (threshold)\n3. Compare expectation to recorded amount\n4. Investigate differences exceeding threshold\n5. Document and conclude"
        },
        {
          title: 'Developing Expectations',
          type: 'text',
          content: "**Good expectations need:**\n\n**Reliable data:**\n• Source (external > internal)\n• Controls over data\n• Auditor verification\n\n**Precision:**\n• Disaggregated data (by month, product, location)\n• More precise = more effective\n\n**Plausible relationship:**\n• Logical connection\n• Stable over time"
        },
        {
          title: 'Example: Substantive Analytics',
          type: 'example',
          content: "**Testing Payroll Expense:**\n\n**Develop expectation:**\n• Beginning employees: 100\n• Ending employees: 110\n• Average employees: 105\n• Average salary: $50,000\n• Expected payroll: $5,250,000\n\n**Compare to recorded: $5,180,000**\n\n**Difference:** $70,000 (1.3%)\n\n**Within threshold?** If yes, accept. If no, investigate."
        },
        {
          title: 'Final Analytical Procedures',
          type: 'text',
          content: "**Purpose:** Evaluate overall F/S presentation\n\n**Questions to ask:**\n• Do F/S make sense given our understanding?\n• Any unusual items we haven't explained?\n• Consistent with our conclusions?\n• Anything that should be communicated?\n\n**Final \"sniff test\"—do results look reasonable?**"
        },
        {
          title: '⚠️ Exam Trap: Precision Matters',
          type: 'warning',
          content: "**More disaggregated = more effective:**\n\n**Less effective:**\n• Annual company-wide sales comparison\n\n**More effective:**\n• Monthly sales by product line by region\n\n**Why?** Aggregated data can hide offsetting errors\n\n**Also:** The greater the risk of material misstatement, the more precise your expectation needs to be!"
        },
        {
          title: 'When Analytics Are Less Effective',
          type: 'text',
          content: "**Analytics may NOT be appropriate when:**\n\n• Relationship is not predictable\n• Data used is unreliable\n• Data is highly aggregated\n• Unusual transactions occurred\n• Changes in business environment\n• High inherent risk for the assertion\n\n**In these cases, use other substantive procedures**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Analytical procedures compare financial data to expectations",
            "Required in planning and final review; optional as substantive test",
            "Planning analytics identify risks; final analytics assess overall reasonableness",
            "Develop independent expectations using reliable data",
            "More disaggregated data = more effective analytics",
            "Investigate all differences exceeding threshold",
            "Not appropriate when relationships are unpredictable or data unreliable"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-004',
    section: 'AUD',
    title: "Audit Sampling: Statistical & Non-Statistical",
    description: "Master the fundamentals of audit sampling methods",
    order: 26,
    duration: 65,
    difficulty: 'advanced',
    topics: ["Sampling", "Audit Evidence"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "You can't test everything! Sampling lets you draw conclusions about a population from a subset. Understanding when to use statistical vs. non-statistical sampling, and the key risks involved, is fundamental to efficient auditing. Sampling questions are exam staples!"
        },
        {
          title: 'Why Sample?',
          type: 'text',
          content: "**Practical reasons:**\n• Population too large to test 100%\n• Cost/time constraints\n• Allows conclusions about population\n\n**When NOT to sample:**\n• Population is small\n• Risk is extremely high\n• All items have special characteristics\n• Computer can test entire population (100% testing)"
        },
        {
          title: 'Statistical vs Non-Statistical',
          type: 'text',
          content: "**Statistical Sampling:**\n• Random selection\n• Mathematical evaluation\n• Quantifiable sampling risk\n• Objective results\n\n**Non-Statistical Sampling:**\n• Judgmental selection\n• Judgmental evaluation\n• Non-quantifiable risk\n• Professional judgment required\n\n**Both are valid under GAAS!**"
        },
        {
          title: 'Two Types of Sampling Tests',
          type: 'table',
          headers: ['Type', 'Purpose', 'What We Measure'],
          rows: [
            ['Attribute Sampling', 'Tests of controls', 'Rate of deviation'],
            ['Variables Sampling', 'Substantive tests', 'Dollar amount of misstatement']
          ]
        },
        {
          title: '🧠 Memory Aid: Sampling Types',
          type: 'callout',
          content: "**Attribute = How often?** (deviation rate)\n• Used for control testing\n• Yes/No—did control work?\n• Result: Deviation rate (e.g., 2%)\n\n**Variables = How much?** (dollar amount)\n• Used for substantive testing\n• What's the monetary error?\n• Result: Dollar misstatement\n\n**\"A\" for Attribute = \"A\" for Acts (controls)\n\"V\" for Variables = \"V\" for Values (dollars)**"
        },
        {
          title: 'Sampling Risk',
          type: 'text',
          content: "**Sampling risk:**\nRisk that sample conclusion differs from what would be found testing entire population.\n\n**Two components for controls testing:**\n• Risk of over-reliance (assess CR too low)\n• Risk of under-reliance (assess CR too high)\n\n**Two components for substantive testing:**\n• Risk of incorrect acceptance (accept when misstated)\n• Risk of incorrect rejection (reject when correct)"
        },
        {
          title: 'Key Sampling Risks',
          type: 'table',
          headers: ['Risk', 'Effect', 'Concern Level'],
          rows: [
            ['Over-reliance (controls)', 'Rely when shouldnt', 'HIGH—audit effectiveness'],
            ['Under-reliance (controls)', 'Don\'t rely when could', 'LOW—audit efficiency'],
            ['Incorrect acceptance (substantive)', 'Accept when wrong', 'HIGH—audit effectiveness'],
            ['Incorrect rejection (substantive)', 'Reject when right', 'LOW—audit efficiency']
          ]
        },
        {
          title: 'Non-Sampling Risk',
          type: 'text',
          content: "**Non-sampling risk:**\nRisk auditor reaches incorrect conclusion for reasons unrelated to sampling.\n\n**Examples:**\n• Use of inappropriate audit procedures\n• Failure to recognize deviation/misstatement\n• Incorrect interpretation of results\n\n**Can be reduced through:** Training, supervision, quality control"
        },
        {
          title: '⚠️ Exam Trap: Risk Direction',
          type: 'warning',
          content: "**The dangerous risks affect EFFECTIVENESS:**\n\n• Over-reliance on controls\n• Incorrect acceptance of balances\n\n**These are the auditor's main concerns!**\n\n**The efficiency risks are less serious:**\n• Under-reliance → Just do more work\n• Incorrect rejection → Just investigate more\n\n**Auditors care more about missing errors than doing extra work!**"
        },
        {
          title: 'Factors Affecting Sample Size',
          type: 'text',
          content: "**Larger sample needed when:**\n\n• Higher assurance needed (lower risk)\n• Lower tolerable misstatement/deviation\n• Higher expected misstatement/deviation\n• Greater population variability\n• Lower RMM (more reliance on test)\n\n**Inverse relationships often tested on exam!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sampling allows conclusions about populations from subsets",
            "Statistical and non-statistical both acceptable under GAAS",
            "Attribute sampling for controls; Variables sampling for substantive",
            "Over-reliance and incorrect acceptance are the dangerous risks",
            "Under-reliance and incorrect rejection are efficiency concerns",
            "Non-sampling risk = human error, not sample design",
            "Sample size increases with desired assurance and expected error"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-005',
    section: 'AUD',
    title: "Sample Design & Selection",
    description: "Learn proper sample design and selection methods",
    order: 27,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Sampling", "Audit Evidence"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "A sample is only as good as its design! Understanding how to define populations, choose selection methods, and calculate sample sizes is essential for drawing valid conclusions. Get the design wrong and your whole test is compromised!"
        },
        {
          title: 'Sample Design Steps',
          type: 'text',
          content: "**1. Define objective** of the test\n**2. Define population** and sampling unit\n**3. Define deviation/misstatement** conditions\n**4. Determine sample size**\n**5. Select sample items**\n**6. Perform procedures**\n**7. Evaluate results**"
        },
        {
          title: 'Defining the Population',
          type: 'text',
          content: "**Population must be:**\n\n• **Complete:** All items that should be tested\n• **Appropriate:** Relevant to objective\n• **Defined correctly:** Match the assertion\n\n**Example—Testing Existence:**\n• Population: Items recorded on books\n• Select from: Book records (not physical items)\n• Direction: Book → Physical"
        },
        {
          title: '🧠 Memory Aid: Population Direction',
          type: 'callout',
          content: "**Select FROM → Test TO**\n\n**Existence/Occurrence:**\nSelect from BOOKS → Trace to PHYSICAL/SOURCE\n\"Is what's recorded actually there?\"\n\n**Completeness:**\nSelect from PHYSICAL/SOURCE → Trace to BOOKS\n\"Is what exists actually recorded?\"\n\n**Get this backward and your test is worthless!**"
        },
        {
          title: 'Selection Methods',
          type: 'text',
          content: "**Statistical (Random) Selection:**\n• Random number selection\n• Systematic selection (interval)\n• Probability proportional to size (PPS)\n\n**Non-Statistical Selection:**\n• Haphazard (attempts to be random)\n• Block selection (caution—may not be representative)\n• Judgmental (high risk items)"
        },
        {
          title: 'Statistical Selection Methods',
          type: 'table',
          headers: ['Method', 'Description', 'Best For'],
          rows: [
            ['Random number', 'Each item has equal chance', 'General purpose'],
            ['Systematic', 'Every nth item after random start', 'Large populations, easy'],
            ['PPS', 'Probability based on dollar amount', 'Substantive tests, large items']
          ]
        },
        {
          title: 'Probability Proportional to Size (PPS)',
          type: 'text',
          content: "**Also called:** Monetary Unit Sampling (MUS)\n\n**Key concept:** Each dollar is a sampling unit\n\n**Effect:**\n• Larger items more likely selected\n• Automatically stratifies by size\n• All items over threshold selected\n\n**Advantage:** Focuses on large dollar items\n**Disadvantage:** May miss small understatements"
        },
        {
          title: 'Sample Size Factors',
          type: 'text',
          content: "**For Attribute Sampling (Controls):**\n\n**Increase sample when:**\n• Higher assurance needed\n• Lower tolerable deviation rate\n• Higher expected deviation rate\n• Larger population (minimal effect)\n\n**Decrease sample when:**\n• Accept more risk\n• Higher tolerable deviation\n• Lower expected deviation"
        },
        {
          title: 'Sample Size Factors (Substantive)',
          type: 'text',
          content: "**For Variables Sampling:**\n\n**Increase sample when:**\n• Lower tolerable misstatement\n• Higher expected misstatement\n• Greater variability in population\n• Lower reliance on controls\n\n**Key:** Most factors have INVERSE relationship with sample size\n• More tolerance = smaller sample\n• Less risk = larger sample"
        },
        {
          title: '⚠️ Exam Trap: Stratification',
          type: 'warning',
          content: "**Stratification = Dividing population into subgroups**\n\n**Why stratify?**\n• Test high-risk items separately\n• More efficient—focus effort where needed\n• Reduce variability within each stratum\n\n**Example:** Stratify A/R by size—test all large balances, sample small ones\n\n**Result:** More efficient sample design!"
        },
        {
          title: 'Documenting Sample Design',
          type: 'text',
          content: "**Document:**\n\n• Objective of test\n• Population definition\n• Selection method used\n• Sample size determination\n• Any stratification\n• Items selected (or method to identify)\n\n**Why?** Enables review and demonstrates valid approach"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Define population to match the assertion being tested",
            "Existence: Select from books, trace to source",
            "Completeness: Select from source, trace to books",
            "Statistical methods: Random, systematic, PPS",
            "PPS/MUS emphasizes larger dollar items",
            "Stratification improves efficiency",
            "Document all design decisions and rationale"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-006',
    section: 'AUD',
    title: "Evaluating Sample Results",
    description: "Learn to evaluate and project sample findings to populations",
    order: 28,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Sampling", "Audit Evidence"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Finding errors in a sample is just the start! You must project those errors to the population, consider sampling risk, and determine whether results support reliance on controls or acceptance of balances. Evaluation is where the rubber meets the road!"
        },
        {
          title: 'Evaluation Process',
          type: 'text',
          content: "**Steps:**\n\n**1. Investigate each deviation/misstatement found**\n   • What caused it?\n   • Is it representative or anomaly?\n\n**2. Project results to population**\n\n**3. Consider sampling risk**\n\n**4. Conclude** on test objective"
        },
        {
          title: 'Analyzing Deviations',
          type: 'text',
          content: "**For each deviation/error found:**\n\n**Determine cause:**\n• Human error?\n• System problem?\n• Intentional?\n• Isolated or systematic?\n\n**Consider implications:**\n• Are there more like it?\n• What assertion affected?\n• Control weakness indicated?\n\n**Anomaly:** Can exclude from projection if truly unique"
        },
        {
          title: 'Projecting Results',
          type: 'text',
          content: "**Attribute Sampling:**\nSample deviation rate = Deviations found / Sample size\n\n**Variables Sampling:**\nProject misstatement to population:\n• Known misstatement (specific items tested)\n• Projected misstatement (sample × projection factor)\n• Total estimated misstatement\n\n**Compare to tolerable threshold!**"
        },
        {
          title: '🧠 Memory Aid: Evaluation Steps',
          type: 'callout',
          content: "**\"FAPC\"** evaluates samples:\n\n**F**ind and analyze each error\n**A**nomaly? Can exclude if truly isolated\n**P**roject to the population\n**C**ompare to tolerable—can we accept?\n\n**Don't forget sampling risk in your conclusion!**"
        },
        {
          title: 'Attribute Sampling Evaluation',
          type: 'example',
          content: "**Example: Testing Invoice Approval Control**\n\n**Parameters:**\n• Sample size: 60 invoices\n• Tolerable deviation rate: 5%\n• Expected deviation rate: 1%\n• Deviations found: 2\n\n**Sample deviation rate:** 2/60 = 3.3%\n\n**Conclusion:** Below tolerable rate → Can rely on control\n(But must consider sampling risk—upper limit may exceed 5%)"
        },
        {
          title: 'Variables Sampling Evaluation',
          type: 'example',
          content: "**Example: Testing A/R Balance**\n\n**Population:** $5,000,000\n**Sample:** 100 items\n**Misstatements found:** $4,500\n\n**Projection:**\n• If population has 1,000 items\n• Projected error: $4,500 × (1,000/100) = $45,000\n\n**Compare:** $45,000 vs. tolerable misstatement\n\n**Plus sampling risk adjustment!**"
        },
        {
          title: '⚠️ Exam Trap: Anomalies',
          type: 'warning',
          content: "**An anomaly can be excluded from projection ONLY IF:**\n\n• Clearly isolated incident\n• No indication of others like it\n• Root cause is unique\n• Not indicative of control problem\n\n**Be skeptical!** Most \"anomalies\" actually indicate systematic issues.\n\n**Must document:** Basis for treating as anomaly and additional procedures performed"
        },
        {
          title: 'When Results Exceed Tolerable',
          type: 'text',
          content: "**If projected error > tolerable misstatement:**\n\n**Options:**\n1. Expand sample size (may not help)\n2. Perform additional procedures\n3. Request client adjustment\n4. Consider qualification of opinion\n\n**For controls:** Increase assessed control risk, expand substantive testing"
        },
        {
          title: 'Documentation Requirements',
          type: 'text',
          content: "**Document:**\n\n• Deviations/errors found\n• Cause analysis for each\n• Any items treated as anomalies (and why)\n• Projection calculation\n• Consideration of sampling risk\n• Conclusion reached\n• Effect on audit approach"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Investigate cause of every deviation/error found",
            "Project sample results to the population",
            "Consider sampling risk in your conclusion",
            "Anomalies can be excluded only with strong documentation",
            "Compare projected results to tolerable threshold",
            "If over threshold: expand testing, adjust, or qualify",
            "Document everything—errors, projections, conclusions"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-007',
    section: 'AUD',
    title: "Auditing Accounting Estimates",
    description: "Learn the special considerations for testing management estimates",
    order: 29,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Audit Evidence", "Estimates"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Estimates are EVERYWHERE in financial statements—allowances, fair values, depreciation, pensions, contingencies. They involve significant judgment and are prone to bias. AS 2501/AU-C 540 requires specific procedures. Estimates are a favorite exam topic because they test professional judgment!"
        },
        {
          title: 'What Are Accounting Estimates?',
          type: 'text',
          content: "**Definition:**\nApproximations of monetary amounts in the absence of a precise means of measurement.\n\n**Common examples:**\n• Allowance for doubtful accounts\n• Inventory obsolescence reserve\n• Warranty liabilities\n• Fair value measurements\n• Depreciation/amortization\n• Pension obligations\n• Contingent liabilities"
        },
        {
          title: 'Why Estimates Are Risky',
          type: 'text',
          content: "**Inherently uncertain:**\n• Subjective by nature\n• Depend on assumptions\n• Outcome unknown when estimated\n\n**Susceptible to bias:**\n• Management incentives\n• Optimistic or pessimistic\n• May be intentional or unintentional\n\n**Often significant risk area!**"
        },
        {
          title: 'Required Procedures',
          type: 'text',
          content: "**Auditor must:**\n\n**1. Identify estimates** that may be misstated\n**2. Understand management's process:**\n   • Method used\n   • Key assumptions\n   • Data inputs\n   • Controls over estimation\n\n**3. Evaluate reasonableness** of estimate"
        },
        {
          title: '🧠 Memory Aid: Testing Estimates',
          type: 'callout',
          content: "**\"MADE\"** tests estimates:\n\n**M**ethod—Is approach appropriate?\n**A**ssumptions—Are they reasonable?\n**D**ata—Is underlying data accurate?\n**E**valuate outcome—Does estimate make sense?\n\n**Every estimate was MADE by management—question how!**"
        },
        {
          title: 'Three Approaches to Testing',
          type: 'text',
          content: "**Choose one or combination:**\n\n**1. Test management's process:**\n• Evaluate method used\n• Test data inputs\n• Assess assumptions\n\n**2. Develop independent estimate:**\n• Use different method or assumptions\n• Compare to management's estimate\n\n**3. Review subsequent events:**\n• What actually happened?\n• Does outcome support estimate?"
        },
        {
          title: 'Evaluating Assumptions',
          type: 'text',
          content: "**Key questions:**\n\n**Are assumptions:**\n• Relevant and reliable?\n• Consistent with prior periods?\n• Consistent with industry?\n• Internally consistent?\n• Supported by evidence?\n\n**Consider:**\n• Sensitivity to changes\n• Alternative assumptions\n• Bias indicators"
        },
        {
          title: 'Management Bias',
          type: 'text',
          content: "**Indicators of potential bias:**\n\n• Change in method without explanation\n• Consistently optimistic assumptions\n• Estimates at edge of acceptable range\n• Contradicts available evidence\n• Selective use of information\n\n**Response:**\n• Heightened skepticism\n• Consider management intent\n• Evaluate in context of other estimates"
        },
        {
          title: '⚠️ Exam Trap: Point vs. Range',
          type: 'warning',
          content: "**Auditor may develop a range:**\n\n• If management's estimate falls WITHIN auditor's range → acceptable\n• If management's estimate is OUTSIDE auditor's range → likely misstatement\n\n**Important:** Auditor's range must be narrow enough to be useful!\n\n**All amounts in range must be individually reasonable**"
        },
        {
          title: 'Estimation Uncertainty',
          type: 'text',
          content: "**Higher estimation uncertainty:**\n• Complex calculations\n• Long forecast period\n• Lack of reliable data\n• Significant assumptions required\n\n**Response to high uncertainty:**\n• May be significant risk\n• More extensive procedures\n• Evaluate disclosure adequacy\n• Consider emphasis of matter"
        },
        {
          title: 'Documentation',
          type: 'text',
          content: "**Document:**\n\n• Basis for identifying significant estimates\n• Understanding of management's process\n• Procedures performed and approach used\n• Evaluation of assumptions\n• Assessment of estimation uncertainty\n• Consideration of bias indicators\n• Conclusions on reasonableness"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Estimates involve judgment and inherent uncertainty",
            "Understand management's process, method, and assumptions",
            "Three approaches: Test process, develop independent estimate, review subsequent events",
            "Evaluate assumptions for reasonableness and bias",
            "Management bias indicators: consistency, contradicting evidence, edge of range",
            "Auditor's range must be reasonably narrow",
            "High estimation uncertainty may indicate significant risk"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-008',
    section: 'AUD',
    title: "Related Party Transactions",
    description: "Identify and audit transactions with related parties",
    order: 30,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Audit Evidence", "Related Parties"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Related parties can hide fraud, manipulate earnings, and deceive users! These transactions may not be arm's-length and often require special disclosure. Understanding how to identify and audit related party transactions is critical—they're a favorite tool for financial statement fraudsters!"
        },
        {
          title: 'What Are Related Parties?',
          type: 'text',
          content: "**Definition (per GAAP):**\n\n**Related parties include:**\n• Affiliates (parent, subsidiary)\n• Principal owners and families\n• Management and families\n• Entities under common control\n• Equity method investees\n• Employee benefit plans\n• Any party that can significantly influence"
        },
        {
          title: 'Why Related Parties Matter',
          type: 'text',
          content: "**Risks:**\n\n• Transactions may not be arm's-length\n• Terms may not reflect fair value\n• Undisclosed relationships\n• Fraud facilitated through related parties\n• Off-balance sheet arrangements\n\n**Disclosure required** for material transactions!\n• Nature of relationship\n• Description of transactions\n• Dollar amounts"
        },
        {
          title: '🧠 Memory Aid: Related Party Risk',
          type: 'callout',
          content: "**\"SHAM\"** transactions warning:\n\n**S**ubstance over form—real transaction?\n**H**idden relationships—who's involved?\n**A**rm's-length?—fair terms?\n**M**aterial disclosure—is it complete?\n\n**Related party deals can be a SHAM!**"
        },
        {
          title: 'Auditor Responsibilities',
          type: 'text',
          content: "**Required procedures:**\n\n**1. Obtain understanding:**\n• Names of known related parties\n• Nature of relationships\n• Types of transactions\n\n**2. Remain alert** throughout audit\n\n**3. Evaluate:**\n• Business purpose\n• Appropriate accounting\n• Adequate disclosure"
        },
        {
          title: 'Identifying Related Parties',
          type: 'text',
          content: "**Procedures to identify:**\n\n• Inquire of management\n• Review prior year workpapers\n• Examine SEC filings\n• Review shareholder records\n• Inspect material contracts\n• Review Board minutes\n• Inquire of other auditors\n• Review confirmations for unusual names"
        },
        {
          title: 'Testing Related Party Transactions',
          type: 'text',
          content: "**For identified transactions:**\n\n• Verify authorization (Board approval often required)\n• Examine contracts and terms\n• Evaluate business purpose\n• Compare to arm's-length terms\n• Verify appropriate accounting\n• Ensure complete disclosure\n\n**Significant transactions may be significant risk!**"
        },
        {
          title: 'Red Flags',
          type: 'text',
          content: "**Indicators of undisclosed related parties:**\n\n• Unusual terms or conditions\n• Transactions lacking business purpose\n• No apparent arm's-length\n• Loans without repayment provisions\n• Sales at unusual prices\n• Guarantees without compensation\n• Transactions outside normal course"
        },
        {
          title: '⚠️ Exam Trap: Disclosure Requirements',
          type: 'warning',
          content: "**What must be disclosed:**\n\n• Nature of relationship\n• Description of transaction(s)\n• Dollar amounts\n• Amounts due to/from\n\n**What's NOT required:**\n• Stating transactions were at arm's-length (unless auditor can verify!)\n\n**Common fraud:** Company states \"arm's-length\" when terms aren't fair"
        },
        {
          title: 'Previously Unknown Related Parties',
          type: 'text',
          content: "**If discovered during audit:**\n\n**1. Communicate** to engagement team\n**2. Reassess** risk assessment\n**3. Perform additional procedures:**\n   • What other transactions exist?\n   • Why wasn't it identified earlier?\n   • Any other unknown relationships?\n**4. Evaluate effect** on audit"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Related parties include affiliates, owners, management, and family",
            "Transactions may not be arm's-length—evaluate substance over form",
            "Auditor must identify related parties and remain alert throughout audit",
            "Test authorization, terms, business purpose, and disclosure",
            "Red flags: unusual terms, no business purpose, non-arm's-length",
            "Previously unknown related parties require reassessment",
            "Disclosure of arm's-length only if auditor can verify"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-009',
    section: 'AUD',
    title: "Going Concern Evaluation",
    description: "Evaluate management's assessment of the entity's ability to continue",
    order: 31,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Audit Evidence", "Going Concern"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Going concern is a fundamental accounting assumption! If an entity may not survive, users need to know. Auditors must evaluate whether substantial doubt exists about the entity's ability to continue as a going concern—and the reporting implications are significant!"
        },
        {
          title: 'Going Concern Assumption',
          type: 'text',
          content: "**Basic principle:**\nFinancial statements are prepared assuming the entity will continue operations for the foreseeable future.\n\n**If not a going concern:**\n• Liquidation basis may be required\n• Asset valuations affected\n• Liability classifications change\n\n**Evaluation period:** One year from F/S issuance date"
        },
        {
          title: 'Conditions and Events',
          type: 'text',
          content: "**Indicators of substantial doubt:**\n\n**Financial:**\n• Recurring operating losses\n• Working capital deficiency\n• Negative cash flows\n• Defaulted loans or restructuring\n• Unpaid dividends\n\n**Operating:**\n• Loss of key customer/supplier\n• Labor difficulties\n• Uninsured catastrophe\n• Legal proceedings"
        },
        {
          title: '🧠 Memory Aid: Going Concern Indicators',
          type: 'callout',
          content: "**\"LOANS\"** indicate trouble:\n\n**L**osses—recurring operating losses\n**O**ut of cash—negative cash flows\n**A**greements violated—loan defaults\n**N**egative working capital\n**S**ources lost—key customers/suppliers\n\n**When LOANS go bad, so does going concern!**"
        },
        {
          title: 'Auditor Responsibilities',
          type: 'text',
          content: "**Required procedures:**\n\n**1. Evaluate conditions and events** that raise substantial doubt\n\n**2. If substantial doubt raised, consider:**\n   • Management's plans to mitigate\n   • Likelihood plans will be implemented\n   • Whether plans alleviate substantial doubt\n\n**3. Conclude** and determine report impact"
        },
        {
          title: "Management's Plans",
          type: 'text',
          content: "**Consider management's plans to address:**\n\n• Sell assets\n• Borrow money or restructure debt\n• Reduce/delay expenditures\n• Increase equity\n• Obtain new customers\n\n**Evaluate:**\n• Are plans feasible?\n• Is management capable of executing?\n• What evidence supports likelihood of success?"
        },
        {
          title: 'Reporting Implications (Non-Issuer)',
          type: 'table',
          headers: ['Situation', 'Going Concern', 'Opinion'],
          rows: [
            ['Doubt alleviated by plans', 'No disclosure required', 'Unmodified'],
            ['Substantial doubt remains, adequate disclosure', 'Emphasis of matter', 'Unmodified'],
            ['Substantial doubt, inadequate disclosure', 'GAAP departure', 'Qualified or Adverse'],
            ['Liquidation basis required, not used', 'GAAP departure', 'Adverse']
          ]
        },
        {
          title: '⚠️ Exam Trap: Alleviated vs. Remains',
          type: 'warning',
          content: "**Key distinction:**\n\n**If management's plans ALLEVIATE substantial doubt:**\n• May not need disclosure\n• No emphasis of matter\n\n**If substantial doubt REMAINS despite plans:**\n• Disclosure required\n• Emphasis of matter paragraph in report\n• Still unmodified opinion (if disclosure adequate)\n\n**The EOM is NOT a qualification!**"
        },
        {
          title: 'Documentation',
          type: 'text',
          content: "**Document:**\n\n• Conditions/events identified\n• Evaluation performed\n• Management's plans and auditor's assessment\n• Evidence obtained about likelihood of plans\n• Conclusion reached\n• Effect on audit report\n\n**Important:** This can be a litigation target—document thoroughly!"
        },
        {
          title: 'Subsequent Events Consideration',
          type: 'text',
          content: "**After balance sheet date:**\n\n• Continue evaluating through report date\n• New information may:\n  - Raise doubt previously not present\n  - Alleviate doubt that existed\n\n**Be alert:** Conditions change rapidly in distressed companies"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Evaluate going concern for one year from F/S issuance date",
            "Indicators: recurring losses, negative cash flows, loan defaults",
            "Evaluate management's plans to address going concern doubt",
            "If doubt alleviated—no disclosure may be required",
            "If doubt remains—disclosure required and EOM paragraph",
            "Inadequate disclosure = qualified or adverse opinion",
            "Document conditions, plans, evidence, and conclusions"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-010',
    section: 'AUD',
    title: "Subsequent Events: Type I & Type II",
    description: "Understand and audit events occurring after period end",
    order: 32,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Audit Evidence", "Subsequent Events"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Events after year-end can significantly affect financial statements! Type I events require adjustment; Type II require disclosure. Knowing the difference—and the auditor's responsibilities during different periods—is essential for AUD success!"
        },
        {
          title: 'Two Types of Subsequent Events',
          type: 'text',
          content: "**Type I: Recognized Events**\n• Provide evidence about conditions existing at B/S date\n• ADJUST the financial statements\n\n**Type II: Non-recognized Events**\n• Conditions arose AFTER B/S date\n• DISCLOSE only (no adjustment)\n\n**Key question:** Did the condition EXIST at year-end?"
        },
        {
          title: '🧠 Memory Aid: Type I vs Type II',
          type: 'callout',
          content: "**Type I = \"It\" existed**\n• Condition existed at balance sheet date\n• New info confirms what was already true\n• ADJUST the statements\n\n**Type II = \"Two\" = \"New\"**\n• New condition after balance sheet date\n• Didn't exist at year-end\n• DISCLOSE only\n\n**\"I\" = It existed → Adjust\n\"II\" = New → Note disclosure**"
        },
        {
          title: 'Type I Examples',
          type: 'text',
          content: "**Adjust financial statements:**\n\n• Customer bankruptcy (confirms A/R uncollectible at year-end)\n• Settlement of litigation (clarifies year-end liability)\n• Sale of inventory below cost (confirms NRV at year-end)\n• Discovery of fraud affecting year-end balances\n\n**Evidence of conditions that EXISTED at B/S date**"
        },
        {
          title: 'Type II Examples',
          type: 'text',
          content: "**Disclose only:**\n\n• Sale of bonds or stock after year-end\n• Business combination after year-end\n• Catastrophic loss (fire, flood)\n• New lawsuit filed\n• Loss of major customer\n\n**Conditions arose AFTER B/S date—no adjustment!**"
        },
        {
          title: 'Three Key Periods',
          type: 'table',
          headers: ['Period', 'Dates', 'Auditor Responsibility'],
          rows: [
            ['Subsequent events period', 'B/S date to report date', 'Active procedures required'],
            ['Post-report to F/S release', 'Report date to release', 'No active duty, but if discovered, respond'],
            ['After F/S released', 'After release', 'No duty, but if discovered, may require action']
          ]
        },
        {
          title: 'Required Subsequent Events Procedures',
          type: 'text',
          content: "**Perform through report date:**\n\n• Read latest interim F/S\n• Inquire of management about:\n  - Unusual adjustments\n  - New commitments/contingencies\n  - Changes in capital\n  - Related party transactions\n• Read Board minutes\n• Obtain management representation letter\n• Inquire of legal counsel"
        },
        {
          title: '⚠️ Exam Trap: Dual Dating',
          type: 'warning',
          content: "**If event discovered after report date:**\n\n**Option 1: Redate entire report**\n• Extends responsibility for ALL subsequent events\n• Must update all procedures\n\n**Option 2: Dual date**\n• Original date PLUS new date for specific event\n• \"February 15, 20X2, except for Note X, as to which the date is March 1, 20X2\"\n• Responsibility extended ONLY for that matter\n\n**Dual dating limits expanded responsibility!**"
        },
        {
          title: 'After F/S Issued',
          type: 'text',
          content: "**If subsequently discovered facts:**\n\n**1. Discuss with management**\n• Were F/S materially affected?\n• What action will entity take?\n\n**2. If entity won't act appropriately:**\n• Notify governance\n• Consider regulatory notification\n• Consult legal counsel\n\n**3. May need to notify users** not to rely on F/S"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Type I: Condition existed at B/S date → Adjust F/S",
            "Type II: Condition arose after B/S date → Disclose only",
            "Active procedures required through report date",
            "Read minutes, inquire of management and legal counsel",
            "Dual dating limits responsibility for late discoveries",
            "After F/S issued: Discuss with management, may notify users",
            "Key question: Did condition EXIST at balance sheet date?"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-011',
    section: 'AUD',
    title: "Using Internal Auditors' Work",
    description: "Learn when and how to use the work of internal audit",
    order: 33,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Audit Evidence", "Internal Audit"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Internal auditors can provide valuable assistance—but you can't just accept their work blindly! Understanding how to evaluate internal audit and use their work appropriately can increase audit efficiency while maintaining quality. Know the boundaries!"
        },
        {
          title: 'Internal vs External Auditors',
          type: 'text',
          content: "**Key differences:**\n\n**Internal Auditors:**\n• Employees of the entity\n• Report to management/governance\n• Broader scope (operations, compliance, F/S)\n• Part of entity's governance\n\n**External Auditors:**\n• Independent of entity\n• Report to shareholders/users\n• Focus on F/S assertions\n• Sole responsibility for opinion"
        },
        {
          title: 'Two Ways to Use Internal Audit',
          type: 'text',
          content: "**1. Using the Work of Internal Auditors:**\n• External auditor uses IA's completed work\n• May reduce external audit procedures\n\n**2. Direct Assistance:**\n• IA performs work under external auditor's direction\n• More supervision required\n• Not permitted for significant risks or judgment areas"
        },
        {
          title: 'Evaluating Internal Audit Function',
          type: 'text',
          content: "**Assess:**\n\n**Competence:**\n• Education and experience\n• Professional certifications\n• Training programs\n\n**Objectivity:**\n• Reporting level (to audit committee best)\n• Organizational status\n• Policies on assignments\n\n**Quality of work:**\n• Adequate planning and supervision\n• Appropriate documentation\n• Reasonable conclusions"
        },
        {
          title: '🧠 Memory Aid: Evaluating Internal Audit',
          type: 'callout',
          content: "**\"COQ\"** evaluates Internal Audit:\n\n**C**ompetence—Are they qualified?\n**O**bjectivity—Are they independent?\n**Q**uality—Is their work good?\n\n**Higher COQ = More reliance possible\nLower COQ = Less reliance (or none)**\n\n**You want a COQ you can count on!**"
        },
        {
          title: 'Determining Extent of Use',
          type: 'text',
          content: "**Factors affecting how much to use:**\n\n**Can use MORE when:**\n• Higher objectivity (reports to audit committee)\n• Greater competence\n• Less subjectivity in the area\n• Lower RMM for the area\n\n**Can use LESS (or not at all) when:**\n• Significant risks involved\n• High subjectivity/judgment required\n• Objectivity is compromised"
        },
        {
          title: 'Limitations on Use',
          type: 'text',
          content: "**Cannot use internal audit work (or direct assistance) for:**\n\n• Making significant judgments\n• Significant risks (unless supervised)\n• Work related to their operating responsibilities\n• Matters requiring significant audit judgment\n\n**External auditor ALWAYS responsible for opinion!**"
        },
        {
          title: '⚠️ Exam Trap: Responsibility',
          type: 'warning',
          content: "**Using internal audit work does NOT:**\n\n• Reduce external auditor's responsibility\n• Allow reference to IA in report\n• Eliminate need to test\n\n**External auditor must:**\n• Evaluate and test IA's work\n• Make own conclusions\n• Take full responsibility for opinion\n\n**Never delegate responsibility—only work!**"
        },
        {
          title: 'Direct Assistance',
          type: 'text',
          content: "**When internal auditors work under direction:**\n\n• External auditor supervises\n• External auditor reviews work\n• Prohibitions apply (significant risks, judgment)\n• Some jurisdictions don't allow\n\n**More supervision required than using completed work**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Internal auditors can assist but external auditor retains responsibility",
            "Two approaches: Use their work, or direct assistance",
            "Evaluate competence, objectivity, and quality (COQ)",
            "Can't use for significant risks or significant judgments",
            "More objectivity and competence = more reliance possible",
            "External auditor must evaluate and test IA work",
            "No reference to internal audit in audit report"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-012',
    section: 'AUD',
    title: "Component Auditors & Group Audits",
    description: "Understand group audit responsibilities and component auditor oversight",
    order: 34,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Audit Evidence", "Group Audits"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Most public companies have subsidiaries audited by other firms! Group auditors must oversee component auditors and take responsibility for the consolidated opinion. Understanding who does what—and who's responsible—is critical for these complex engagements!"
        },
        {
          title: 'Key Terminology',
          type: 'text',
          content: "**Group:** Parent plus components (subsidiaries, divisions, etc.)\n\n**Component:** Entity or business unit with separate F/S\n\n**Group Auditor:** Auditor of consolidated F/S (signs the report)\n\n**Component Auditor:** Auditor of component F/S\n\n**Group engagement partner:** Responsible for overall group audit"
        },
        {
          title: 'Acceptance and Planning',
          type: 'text',
          content: "**Before accepting group engagement:**\n\n**Determine:**\n• Can sufficient appropriate evidence be obtained?\n• Is group auditor competent to take role?\n• Can involvement with components be adequate?\n\n**If answer is NO:** Don't accept!"
        },
        {
          title: 'Understanding Components',
          type: 'text',
          content: "**For each significant component:**\n\n• Understand component and environment\n• Identify component auditors\n• Assess competence and independence\n• Plan nature and extent of involvement\n\n**Significant component = Individually financially significant OR significant risks"
        },
        {
          title: '🧠 Memory Aid: Group Audit Duties',
          type: 'callout',
          content: "**\"DISCO\"** duties for group auditor:\n\n**D**irect—set overall strategy\n**I**nvolvement—participate in risk assessment\n**S**upervise—monitor component work\n**C**ommunicate—with component auditors\n**O**verall conclusion—take responsibility\n\n**Group auditor leads the DISCO!**"
        },
        {
          title: 'Involvement with Component Auditor',
          type: 'text',
          content: "**Procedures regarding component auditor:**\n\n**1. Evaluate:**\n   • Independence\n   • Professional competence\n   • Regulatory environment\n\n**2. Communicate:**\n   • Work to be performed\n   • Ethical requirements\n   • Materiality levels\n   • Identified risks\n\n**3. Review:**\n   • Component auditor's work\n   • Documentation (as needed)"
        },
        {
          title: 'Work Required on Components',
          type: 'table',
          headers: ['Component Type', 'Required Work'],
          rows: [
            ['Significant—financial', 'Audit or specified procedures'],
            ['Significant—risk', 'Audit or specified procedures on risk areas'],
            ['Non-significant', 'Analytics, inquiry, or specified procedures']
          ]
        },
        {
          title: '⚠️ Exam Trap: Reference vs. No Reference',
          type: 'warning',
          content: "**Two approaches to reporting:**\n\n**No reference (assumption of responsibility):**\n• Group auditor takes full responsibility\n• No mention of component auditor\n• More common approach\n\n**Reference (division of responsibility):**\n• Permissible in non-issuer audits only\n• Not a qualification\n• Cannot refer if component audit inadequate\n\n**PCAOB (issuers): No reference allowed!**"
        },
        {
          title: 'Consolidation Process',
          type: 'text',
          content: "**Group auditor must:**\n\n• Evaluate appropriateness of consolidation\n• Verify elimination entries\n• Test intercompany transactions\n• Evaluate uniform accounting policies\n• Consider subsequent events for all components\n\n**Cannot just add up—must verify consolidation!**"
        },
        {
          title: 'Communication Requirements',
          type: 'text',
          content: "**To component auditor:**\n• Work required and timing\n• Ethical requirements\n• Materiality levels\n• Risks requiring attention\n\n**From component auditor:**\n• Compliance with ethical requirements\n• Work performed and conclusions\n• Fraud indicators\n• Significant deficiencies"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Group auditor responsible for consolidated opinion",
            "Must evaluate component auditor independence and competence",
            "Significant components require audit or specified procedures",
            "Two-way communication with component auditors required",
            "Reference to component auditor: OK for non-issuers, not issuers",
            "Group auditor must evaluate consolidation process",
            "Cannot accept if insufficient evidence can be obtained"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-013',
    section: 'AUD',
    title: "Using Specialists & Experts",
    description: "Learn when and how to use the work of specialists",
    order: 35,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Audit Evidence", "Specialists"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Some audit areas require expertise auditors don't have—actuaries for pensions, appraisers for real estate, geologists for reserves. Knowing how to use specialists while maintaining audit responsibility is essential for complex engagements!"
        },
        {
          title: 'Types of Specialists',
          type: 'text',
          content: "**Management's Specialist:**\n• Hired by management\n• Creates information used in F/S\n• Example: Actuary who calculates pension liability\n\n**Auditor's Specialist:**\n• Engaged by auditor\n• Assists auditor with procedures\n• Example: Valuation expert reviewing fair values\n\n**Different evaluation requirements!**"
        },
        {
          title: 'When to Use a Specialist',
          type: 'text',
          content: "**Consider using when:**\n\n• Matter requires specialized knowledge\n• Area outside auditor's expertise\n• High complexity or subjectivity\n\n**Common areas:**\n• Fair value measurements\n• Actuarial valuations\n• Reserves (oil, gas, minerals)\n• Legal interpretations\n• Engineering assessments"
        },
        {
          title: '🧠 Memory Aid: Specialist Evaluation',
          type: 'callout',
          content: "**\"CAR\"** evaluates specialists:\n\n**C**ompetence—Qualified for the work?\n**A**ppropriate—Relevant expertise?\n**R**elationship—Objectivity/independence?\n\n**Before getting in the CAR, check the driver!**"
        },
        {
          title: "Evaluating Management's Specialist",
          type: 'text',
          content: "**Evaluate:**\n\n**1. Competence and capabilities:**\n• Qualifications and certifications\n• Experience with similar matters\n\n**2. Objectivity:**\n• Relationship with management\n• Financial interests\n• Controls over specialist's work\n\n**3. Understand the work:**\n• Nature of work performed\n• Key assumptions used"
        },
        {
          title: "Using Management's Specialist Work",
          type: 'text',
          content: "**Procedures:**\n\n• Evaluate reasonableness of assumptions\n• Evaluate appropriateness of methods\n• Test data provided to specialist\n• Consider if conclusions support F/S assertions\n\n**Cannot accept work without evaluation!**"
        },
        {
          title: "Auditor's Specialist",
          type: 'text',
          content: "**When auditor engages specialist:**\n\n• Agree on scope and objectives\n• Communicate responsibilities\n• Evaluate specialist's work\n• Determine effect on audit procedures\n\n**Auditor remains responsible!**\n\n**Note:** Auditor's specialist is NOT referred to in report"
        },
        {
          title: '⚠️ Exam Trap: Reference in Report',
          type: 'warning',
          content: "**General rule: Don't refer to specialists in report!**\n\n**Reference suggests:**\n• Divided responsibility (not allowed for auditor's specialist)\n• Qualification of opinion\n\n**Exception for management's specialist:**\n• May refer when explaining basis for modified opinion\n• Must indicate reference doesn't reduce auditor's responsibility"
        },
        {
          title: 'Disagreement with Specialist',
          type: 'text',
          content: "**If specialist's findings don't support assertions:**\n\n**1. Discuss with management**\n**2. Perform additional procedures:**\n   • Additional specialist consultation\n   • Expand audit procedures\n**3. Consider effect on opinion**\n\n**Cannot ignore specialist disagreement!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Two types: Management's specialist and auditor's specialist",
            "Evaluate competence, appropriateness, and relationship (CAR)",
            "Test reasonableness of specialist's assumptions and methods",
            "Auditor remains responsible for opinion—can't delegate",
            "Generally don't refer to specialist in report",
            "If specialist findings contradict assertions—investigate",
            "Common areas: Valuations, actuarial, reserves, legal"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-014',
    section: 'AUD',
    title: "Substantive Testing: Revenue & Receivables",
    description: "Master audit procedures for the revenue cycle",
    order: 36,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Substantive Testing", "Revenue"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Revenue is THE most scrutinized area on every audit! It's a presumed fraud risk and involves multiple assertions. Knowing the right procedures for revenue recognition and A/R testing is fundamental to audit success—and heavily tested on AUD!"
        },
        {
          title: 'Why Revenue is High Risk',
          type: 'text',
          content: "**Presumed fraud risk because:**\n\n• Most common area for financial statement fraud\n• Management pressure to meet targets\n• Complex recognition criteria\n• Multiple opportunities for manipulation\n• ASC 606 adds complexity\n\n**Key assertions:**\n• Occurrence/Existence\n• Cutoff\n• Completeness\n• Accuracy"
        },
        {
          title: 'Revenue Audit Assertions',
          type: 'table',
          headers: ['Assertion', 'Risk', 'Key Procedures'],
          rows: [
            ['Occurrence', 'Fictitious sales recorded', 'Confirm with customers, vouch to shipping docs'],
            ['Cutoff', 'Sales in wrong period', 'Test transactions around year-end'],
            ['Completeness', 'Sales not recorded', 'Trace from shipping to sales journal'],
            ['Accuracy', 'Wrong amounts', 'Recalculate, test prices to contracts']
          ]
        },
        {
          title: '🧠 Memory Aid: Revenue Procedures',
          type: 'callout',
          content: "**\"VOICE\"** tests revenue:\n\n**V**ouch sales to shipping documents\n**O**ccurrence—confirm with customers\n**I**nspect cutoff transactions\n**C**ompleteness—trace from shipping\n**E**valuate revenue recognition policies\n\n**Give VOICE to revenue concerns!**"
        },
        {
          title: 'Occurrence Testing',
          type: 'text',
          content: "**Are recorded sales real?**\n\n**Procedures:**\n• Vouch sales to shipping documents\n• Confirm with customers (positive confirmations)\n• Examine customer purchase orders\n• Review sales returns after year-end\n• Test for unusual sales patterns\n\n**Direction:** Book → Source (existence/occurrence)"
        },
        {
          title: 'Cutoff Testing',
          type: 'text',
          content: "**Are sales in the right period?**\n\n**Procedures:**\n• Select transactions around year-end\n• Compare shipping date to recording date\n• Examine shipping terms (FOB shipping vs. destination)\n• Test sales returns after year-end\n• Review credit memos near year-end\n\n**Critical:** When does title pass?"
        },
        {
          title: 'Accounts Receivable Testing',
          type: 'text',
          content: "**Existence:**\n• Confirm balances directly with customers\n• Examine subsequent cash receipts\n\n**Valuation:**\n• Review aging of receivables\n• Test allowance for doubtful accounts\n• Examine subsequent collections\n• Evaluate management's estimation process\n\n**Rights:** Verify not pledged or factored"
        },
        {
          title: 'A/R Confirmation Procedures',
          type: 'text',
          content: "**Standard procedures:**\n\n1. Select accounts (large, old, unusual)\n2. Maintain control—send directly to customers\n3. Receive responses directly\n4. Investigate exceptions\n5. Alternative procedures for non-responses:\n   • Subsequent cash receipts\n   • Shipping documents\n   • Customer purchase orders"
        },
        {
          title: '⚠️ Exam Trap: Confirmation Direction',
          type: 'warning',
          content: "**Confirmations test EXISTENCE, not completeness!**\n\n**Why?** You confirm what's recorded—can't confirm what isn't.\n\n**For completeness, trace from:**\n• Shipping documents → Sales journal\n• Subsequent cash receipts → A/R\n\n**Test FROM source documents TO books for completeness!**"
        },
        {
          title: 'Allowance for Doubtful Accounts',
          type: 'text',
          content: "**Testing the allowance:**\n\n• Review aging reliability\n• Test subsequent collections\n• Evaluate historical loss rates\n• Consider current economic conditions\n• Test management's estimation process\n• Compare to prior year and industry\n\n**Valuation assertion = Is NRV reasonable?**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Revenue is presumed fraud risk—high scrutiny required",
            "Key assertions: Occurrence, cutoff, completeness, accuracy",
            "Confirm A/R to test existence; trace from shipping for completeness",
            "Cutoff testing focuses on transactions around year-end",
            "Test shipping terms (FOB) to determine proper period",
            "Evaluate allowance for doubtful accounts carefully",
            "Confirmations test existence, NOT completeness"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-015',
    section: 'AUD',
    title: "Substantive Testing: Inventory & PP&E",
    description: "Learn key procedures for inventory observation and fixed assets",
    order: 37,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Substantive Testing", "Inventory"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Inventory is often the LARGEST current asset and most vulnerable to manipulation! PP&E testing involves both existence and valuation considerations. Understanding inventory observation procedures and fixed asset testing is essential for AUD!"
        },
        {
          title: 'Inventory Audit Assertions',
          type: 'text',
          content: "**Key assertions:**\n\n**Existence:** Is inventory actually there?\n**Completeness:** Is all inventory counted?\n**Valuation:** At lower of cost or NRV?\n**Rights:** Does entity own it?\n**Accuracy:** Are quantities correct?\n\n**Inventory observation is REQUIRED when inventory is material!**"
        },
        {
          title: 'Inventory Observation',
          type: 'text',
          content: "**Required procedures:**\n\n**1. Attend physical count:**\n• Evaluate client's count instructions\n• Observe client personnel counting\n• Make test counts\n• Control count tags\n\n**2. Document:**\n• Test counts performed\n• Tag numbers used\n• Cutoff information"
        },
        {
          title: '🧠 Memory Aid: Inventory Observation',
          type: 'callout',
          content: "**\"COUNT\"** inventory properly:\n\n**C**ontrol the tags (no manipulation)\n**O**bserve client counting\n**U**se test counts (verify accuracy)\n**N**ote cutoff information\n**T**race to final inventory listing\n\n**You must COUNT on inventory being correct!**"
        },
        {
          title: 'Before, During, and After',
          type: 'table',
          headers: ['Phase', 'Key Procedures'],
          rows: [
            ['Before count', 'Review count instructions, identify locations, staff the observation'],
            ['During count', 'Observe procedures, make test counts, control tags, note cutoff'],
            ['After count', 'Trace test counts to final listing, perform cutoff procedures']
          ]
        },
        {
          title: 'Inventory Cutoff',
          type: 'text',
          content: "**Critical procedures:**\n\n• Record last receiving document number\n• Record last shipping document number\n• Verify items in transit properly included/excluded\n• Test transactions around year-end\n\n**Shipping terms matter:**\n• FOB shipping point: Title passes at shipment\n• FOB destination: Title passes at receipt"
        },
        {
          title: 'Inventory Valuation',
          type: 'text',
          content: "**Testing lower of cost or NRV:**\n\n• Test costing method (FIFO, average)\n• Verify cost accumulation\n• Review obsolete/slow-moving items\n• Test selling prices for NRV\n• Evaluate inventory reserves\n• Consider market conditions"
        },
        {
          title: '⚠️ Exam Trap: Inventory Not Observed',
          type: 'warning',
          content: "**If auditor cannot observe inventory count:**\n\n**Options:**\n1. Observe count at alternative date, roll forward/back\n2. Perform alternative procedures (if count already taken)\n\n**If neither possible and inventory is MATERIAL:**\n• Scope limitation\n• Qualified opinion OR disclaimer\n\n**Cannot skip inventory observation when material!**"
        },
        {
          title: 'PP&E Testing',
          type: 'text',
          content: "**Key procedures:**\n\n**Existence:**\n• Physical inspection of major additions\n• Examine invoices and titles\n\n**Completeness:**\n• Trace from inspection to books\n• Review lease commitments\n\n**Valuation:**\n• Test depreciation calculations\n• Evaluate impairment indicators\n\n**Rights:**\n• Examine titles, deeds\n• Search for liens"
        },
        {
          title: 'PP&E Additions and Disposals',
          type: 'text',
          content: "**Additions:**\n• Vouch to supporting documentation\n• Verify proper capitalization vs. expense\n• Test classification\n• Inspect major additions\n\n**Disposals:**\n• Verify authorization\n• Recalculate gain/loss\n• Confirm removal from records\n• Verify no continued depreciation"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Inventory observation is REQUIRED when inventory is material",
            "Control tags, observe counting, make test counts",
            "Document cutoff information (last shipping/receiving docs)",
            "If can't observe: alternative date or scope limitation",
            "Test inventory valuation at lower of cost or NRV",
            "PP&E: Test additions, disposals, depreciation, impairment",
            "Verify ownership rights (titles, liens)"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-001',
    section: 'AUD',
    title: "Unmodified Audit Opinion",
    description: "Understand the standard unmodified audit report",
    order: 38,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Reporting", "Audit Opinion"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The unmodified opinion is the \"clean\" opinion—what everyone wants! Understanding its requirements and report elements is fundamental. You must know what conditions allow an unmodified opinion and recognize when modifications are needed!"
        },
        {
          title: 'Conditions for Unmodified Opinion',
          type: 'text',
          content: "**Unmodified opinion when:**\n\n• F/S prepared in accordance with applicable framework (GAAP)\n• No material misstatements identified\n• Sufficient appropriate evidence obtained\n• Adequate disclosures\n• No scope limitations\n\n**The \"clean\" opinion—F/S are fairly stated!**"
        },
        {
          title: 'Report Elements (Non-Issuer)',
          type: 'text',
          content: "**Required sections:**\n\n1. **Title:** \"Independent Auditor's Report\"\n2. **Addressee:** Usually shareholders/governance\n3. **Opinion paragraph** (first!)\n4. **Basis for Opinion paragraph**\n5. **Responsibilities of Management**\n6. **Auditor's Responsibilities**\n7. **Auditor's signature**\n8. **City and state** of auditor\n9. **Date** of report"
        },
        {
          title: '🧠 Memory Aid: Report Order',
          type: 'callout',
          content: "**\"OBM-AR\"** report structure:\n\n**O**pinion (comes FIRST now!)\n**B**asis for Opinion\n**M**anagement's Responsibilities\n**A**uditor's Responsibilities\n**R**est (signature, date, location)\n\n**Opinion upfront—what users want to know!**"
        },
        {
          title: 'Opinion Paragraph Wording',
          type: 'text',
          content: "**Standard language:**\n\n\"In our opinion, the financial statements present fairly, in all material respects, the financial position of [Company] as of [date], and the results of its operations and its cash flows for the year then ended in accordance with accounting principles generally accepted in the United States of America.\""
        },
        {
          title: 'Basis for Opinion Paragraph',
          type: 'text',
          content: "**Includes:**\n\n• Statement that audit was conducted in accordance with GAAS\n• Reference to auditor's responsibilities section\n• Statement of independence\n• Statement that evidence is sufficient and appropriate\n\n**Confirms HOW opinion was reached**"
        },
        {
          title: 'Management Responsibilities',
          type: 'text',
          content: "**Management responsible for:**\n\n• Preparation of F/S in accordance with GAAP\n• Internal control necessary for F/S preparation\n• Evaluating going concern\n• Disclosing relevant matters\n\n**Critical:** Opinion addresses F/S, not controls (unless integrated)"
        },
        {
          title: 'Auditor Responsibilities',
          type: 'text',
          content: "**Auditor responsible for:**\n\n• Obtaining reasonable assurance (not absolute!)\n• Exercising professional judgment\n• Maintaining professional skepticism\n• Evaluating accounting policies and estimates\n• Assessing risk of material misstatement\n• Concluding on going concern\n• Communicating with governance"
        },
        {
          title: '⚠️ Exam Trap: PCAOB vs AICPA',
          type: 'warning',
          content: "**Key differences:**\n\n**PCAOB (Issuers):**\n• Critical Audit Matters required\n• Integrated audit (F/S + IC)\n• More detailed auditor tenure disclosure\n• Specific report format\n\n**AICPA (Non-Issuers):**\n• Key Audit Matters optional\n• IC report separate (if engaged)\n• Simpler format\n\n**Know which standards apply!**"
        },
        {
          title: 'Report Dating',
          type: 'text',
          content: "**Date = Day audit evidence is complete**\n\n**Cannot be earlier than:**\n• Date sufficient evidence obtained\n• Date F/S approved by management\n• Date of management rep letter\n\n**Auditor responsible for subsequent events through report date**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Unmodified opinion = F/S fairly stated in all material respects",
            "Opinion paragraph comes FIRST in current format",
            "Reasonable assurance, not absolute assurance",
            "Management responsible for F/S and controls",
            "Auditor responsible for opinion on F/S",
            "Report date = when evidence is sufficient",
            "PCAOB and AICPA reports have some differences"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-002',
    section: 'AUD',
    title: "Modified Opinions: Qualified, Adverse, Disclaimer",
    description: "Master the three types of modified audit opinions",
    order: 39,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Reporting", "Modified Opinions"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Not all audits end with a clean opinion! Knowing when to qualify, disclaim, or issue an adverse opinion is crucial. The decision depends on whether the issue is material, pervasive, and whether it's a misstatement or inability to obtain evidence!"
        },
        {
          title: 'Two Causes of Modification',
          type: 'text',
          content: "**1. Material Misstatement:**\n• F/S do not comply with framework (GAAP departure)\n• Inadequate disclosures\n\n**2. Inability to Obtain Evidence:**\n• Scope limitation (by client or circumstances)\n• Cannot determine if F/S are correct\n\n**These drive different opinions!**"
        },
        {
          title: 'Materiality Levels',
          type: 'text',
          content: "**Material but NOT pervasive:**\n• Affects specific accounts/areas\n• Does not affect overall understanding\n• Isolated to particular elements\n\n**Material AND pervasive:**\n• Affects many accounts or elements\n• Represents substantial proportion of F/S\n• Is fundamental to user understanding\n• Disclosures are pervasively inadequate"
        },
        {
          title: 'Modified Opinion Decision Matrix',
          type: 'table',
          headers: ['Cause', 'Material Not Pervasive', 'Material AND Pervasive'],
          rows: [
            ['GAAP Departure', 'QUALIFIED', 'ADVERSE'],
            ['Scope Limitation', 'QUALIFIED', 'DISCLAIMER']
          ]
        },
        {
          title: '🧠 Memory Aid: Opinion Selection',
          type: 'callout',
          content: "**\"SAD\"** for modified opinions:\n\n**S** = Scope limitation → Qualified or Disclaimer\n**A** = GAAP departure → Qualified or Adverse\n**D** = Determine pervasiveness\n\n**Pervasive? Go to the extreme!**\n• Scope → Disclaimer (can't form opinion)\n• GAAP → Adverse (opinion is bad)"
        },
        {
          title: 'Qualified Opinion',
          type: 'text',
          content: "**\"Except for...\"**\n\n**Use when:**\n• Material misstatement, but NOT pervasive, OR\n• Unable to obtain evidence, but NOT pervasive\n\n**Report includes:**\n• Basis for Qualified Opinion paragraph\n• Describes the issue and effect\n• Opinion states \"except for\"\n\n**Still useful opinion—just with exception**"
        },
        {
          title: 'Adverse Opinion',
          type: 'text',
          content: "**\"F/S are NOT fairly stated\"**\n\n**Use when:**\n• Material misstatement\n• AND pervasive effect\n\n**Report includes:**\n• Basis for Adverse Opinion paragraph\n• Describes departure and effects\n• Opinion states F/S do NOT present fairly\n\n**Rare—management usually fixes before this!**"
        },
        {
          title: 'Disclaimer of Opinion',
          type: 'text',
          content: "**\"We cannot express an opinion\"**\n\n**Use when:**\n• Unable to obtain sufficient evidence\n• AND pervasive effect\n\n**Report includes:**\n• Basis for Disclaimer paragraph\n• Explains why evidence couldn't be obtained\n• States auditor does NOT express opinion\n\n**Auditor couldn't do the job!**"
        },
        {
          title: '⚠️ Exam Trap: Cannot Mix and Match',
          type: 'warning',
          content: "**Each issue gets ONE opinion:**\n\n• Can't have qualified AND adverse\n• Different issues may require different treatments\n\n**When multiple issues:**\n• Use the MORE severe opinion\n• Adverse \"trumps\" qualified for GAAP issues\n• Disclaimer \"trumps\" qualified for scope issues\n\n**One report, one opinion (the worst one)!**"
        },
        {
          title: 'Report Modifications',
          type: 'text',
          content: "**For modified opinions:**\n\n**Change:**\n• Opinion paragraph title\n• Add \"Basis for [Modified] Opinion\" paragraph\n• Explain the matter and effects\n\n**Basis paragraph goes AFTER Opinion paragraph (before for disclaimer)**\n\n**Quantify effects when practicable**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Two causes: Misstatement or inability to obtain evidence",
            "Two levels: Material only vs. material AND pervasive",
            "Qualified: \"Except for\" (material, not pervasive)",
            "Adverse: F/S not fairly stated (GAAP + pervasive)",
            "Disclaimer: Can't express opinion (scope + pervasive)",
            "Use the more severe opinion when multiple issues",
            "Basis for opinion paragraph explains the modification"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-003',
    section: 'AUD',
    title: "Emphasis of Matter & Other Matter Paragraphs",
    description: "Understand when to add informational paragraphs to the audit report",
    order: 40,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Reporting", "EOM"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Sometimes you need to highlight important information without modifying your opinion! Emphasis of Matter and Other Matter paragraphs draw attention to issues already disclosed or explain audit matters. Knowing when to use each is tested frequently on AUD!"
        },
        {
          title: 'Emphasis of Matter (EOM)',
          type: 'text',
          content: "**Purpose:** Draw attention to a matter properly disclosed in F/S that is fundamental to users' understanding.\n\n**Key features:**\n• Matter IS disclosed in F/S\n• Just highlighting it\n• Does NOT modify opinion\n• NOT a qualification\n\n**Title: \"Emphasis of Matter\" (or descriptive)**"
        },
        {
          title: 'When EOM Required',
          type: 'text',
          content: "**Required EOM:**\n\n• Substantial doubt about going concern (properly disclosed)\n• Change in accounting principle with material effect\n• Major catastrophe significantly affecting F/S\n• Significant related party transactions\n\n**Key:** Appropriately disclosed but fundamental to understanding"
        },
        {
          title: 'EOM Paragraph Contents',
          type: 'text',
          content: "**Must include:**\n\n1. Clear reference to matter being emphasized\n2. Where it's disclosed in F/S (note reference)\n3. Statement that opinion is NOT modified\n\n**Placement:** After Basis for Opinion, before Auditor's Responsibilities\n\n**Example:** \"As discussed in Note X, the Company has substantial doubt about its ability to continue as a going concern. Our opinion is not modified with respect to this matter.\""
        },
        {
          title: '🧠 Memory Aid: EOM vs OM',
          type: 'callout',
          content: "**\"EOM = Eyes on Material\"**\n• Points to F/S disclosures\n• \"Look at this important note!\"\n\n**\"OM = Other Matters\"**\n• About the audit itself\n• \"Here's something about our work\"\n\n**EOM = F/S focus\nOM = Audit focus**"
        },
        {
          title: 'Other Matter (OM) Paragraph',
          type: 'text',
          content: "**Purpose:** Communicate matters relevant to users' understanding of the audit, auditor's responsibilities, or auditor's report.\n\n**NOT disclosed in F/S—about the audit itself**\n\n**Examples:**\n• Prior year audited by another auditor\n• Restricting report distribution\n• Required supplementary information matters"
        },
        {
          title: 'Common OM Situations',
          type: 'text',
          content: "**Other Matter paragraphs for:**\n\n• Prior year reviewed, not audited\n• Prior year audited by predecessor auditor\n• Report on both F/S and supplementary info\n• Restriction on use of report\n• Separate report on ICFR\n• Supplementary information in document"
        },
        {
          title: '⚠️ Exam Trap: EOM is NOT Qualification',
          type: 'warning',
          content: "**Common misconception:**\n\n\"EOM means something is wrong.\"\n\n**WRONG!** EOM:\n• Does NOT modify opinion\n• Is NOT a qualification\n• Matter is PROPERLY disclosed\n• Opinion remains unmodified\n\n**If disclosure were inadequate → Qualified opinion, not EOM!**"
        },
        {
          title: 'Placement in Report',
          type: 'text',
          content: "**Emphasis of Matter:**\n• After Basis for Opinion\n• Before Auditor's Responsibilities\n\n**Other Matter:**\n• Generally after Emphasis of Matter (if both)\n• May be at end depending on nature\n\n**Both come with clear headers indicating what they are**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "EOM highlights matters disclosed in F/S—fundamental to understanding",
            "Other Matter covers audit-related information",
            "Neither EOM nor OM modify the opinion",
            "Required EOM: Going concern, accounting changes, catastrophes",
            "EOM must reference where disclosed and state opinion not modified",
            "OM covers prior period audited by others, restrictions, etc.",
            "EOM is NOT a qualification—matter is properly disclosed"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-004',
    section: 'AUD',
    title: "Comparative Financial Statements",
    description: "Understand reporting when prior periods are presented",
    order: 41,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Reporting", "Comparatives"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Most F/S present multiple years! Understanding how to report on comparatives—especially when opinions differ between periods or another auditor was involved—is essential. These scenarios are frequently tested on AUD!"
        },
        {
          title: 'Comparative Reporting Basics',
          type: 'text',
          content: "**When comparatives presented:**\n\n• Auditor's opinion covers ALL periods presented\n• Current auditor may not have audited prior periods\n• Opinion may differ between periods\n\n**Two approaches:**\n1. Updating prior year opinion (same auditor)\n2. Referring to predecessor auditor (different auditor)"
        },
        {
          title: 'Updating Prior Opinion (Same Auditor)',
          type: 'text',
          content: "**If same auditor for both periods:**\n\n• Opinion covers both years\n• May have different opinions by year\n• Current events may change prior opinion\n\n**Examples:**\n• Prior qualified, now unmodified (issue resolved)\n• Prior unmodified, now qualified (prior issue discovered)\n• Both years have same opinion"
        },
        {
          title: 'Different Prior Period Opinion',
          type: 'text',
          content: "**If prior period had different opinion:**\n\n**Add Other Matter paragraph:**\n• Reference prior period opinion\n• State type of modification and reason\n• Indicate if matter resolved or continues\n\n**Example language:** \"In our report dated [date], we expressed a qualified opinion because of [reason]. The situation has been resolved and our current opinion is unmodified.\""
        },
        {
          title: '🧠 Memory Aid: Prior Period Reference',
          type: 'callout',
          content: "**\"WRITE\"** about prior opinions:\n\n**W**hat was the prior opinion?\n**R**eason for that opinion\n**I**s it resolved now?\n**T**ype of current opinion\n**E**xplain the change\n\n**Don't leave users in the dark about changes!**"
        },
        {
          title: 'Predecessor Auditor Situations',
          type: 'text',
          content: "**If prior period audited by another auditor:**\n\n**Option 1: Predecessor reissues report**\n• Predecessor's report included with current report\n• Clear identification of who audited what\n\n**Option 2: Current auditor refers to predecessor**\n• Other Matter paragraph\n• States prior year audited by others\n• Type of opinion predecessor expressed"
        },
        {
          title: 'Reference to Predecessor',
          type: 'text',
          content: "**Other Matter paragraph includes:**\n\n• Prior period F/S audited by another auditor\n• Date of predecessor's report\n• Type of opinion expressed\n• Any modifications and reasons\n\n**Current auditor does NOT take responsibility for predecessor's work!**"
        },
        {
          title: 'Prior Period Not Audited',
          type: 'text',
          content: "**If prior period was reviewed or not audited:**\n\n**Other Matter paragraph:**\n• States prior period was not audited\n• States level of service (review, compilation, none)\n• If reviewed: Limited assurance provided\n• If compiled: No assurance provided\n\n**Cannot be silent about unaudited comparatives!**"
        },
        {
          title: '⚠️ Exam Trap: Restated Prior Period',
          type: 'warning',
          content: "**If prior period F/S are restated:**\n\n**Current auditor must:**\n• Audit restatement adjustments\n• Update opinion on restated F/S\n• Add explanatory language about restatement\n\n**Predecessor involved?**\n• May need to reissue report\n• Or current auditor addresses in report\n\n**Restatements require special attention!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Auditor's opinion covers all periods presented",
            "Different opinions by period require explanatory language",
            "Predecessor auditor: Either reissues report or is referenced",
            "Other Matter paragraph explains prior period situations",
            "Never remain silent about unaudited comparative periods",
            "Restated prior periods require special procedures",
            "Current auditor doesn't take responsibility for predecessor work"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-005',
    section: 'AUD',
    title: "Key Audit Matters (KAM) / Critical Audit Matters (CAM)",
    description: "Understand expanded audit reporting requirements",
    order: 42,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Reporting", "KAM", "CAM"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "KAM and CAM represent the biggest change to audit reporting in decades! They provide more insight into significant audit areas. PCAOB requires CAMs for issuers; AICPA has optional KAMs. Understanding what they are and how they differ is essential!"
        },
        {
          title: 'What Are KAM/CAM?',
          type: 'text',
          content: "**Key Audit Matters (KAM)** - International/AICPA:\n• Matters of most significance in the audit\n• Selected from matters communicated to governance\n• Voluntary for non-issuers under AICPA\n\n**Critical Audit Matters (CAM)** - PCAOB:\n• Required for issuer audits\n• Matters communicated to audit committee\n• Involved especially challenging judgment or evidence"
        },
        {
          title: 'CAM Requirements (PCAOB)',
          type: 'text',
          content: "**CAM is a matter that:**\n\n1. Was communicated (or required to be) to audit committee\n2. Relates to material accounts or disclosures\n3. Involved especially challenging, subjective, or complex auditor judgment\n\n**All three criteria must be met!**"
        },
        {
          title: 'CAM Determination Process',
          type: 'text',
          content: "**Consider factors:**\n\n• Degree of auditor judgment\n• Significant risk areas\n• Unusual transactions\n• Degree of subjectivity in measurement\n• Nature and extent of audit effort\n• Difficulty obtaining evidence\n• Significant events or transactions"
        },
        {
          title: '🧠 Memory Aid: CAM Criteria',
          type: 'callout',
          content: "**\"CCC\"** makes a CAM:\n\n**C**ommunicated to audit committee\n**C**oncerns material accounts\n**C**hallenging judgment required\n\n**All three C's must be present!**"
        },
        {
          title: 'CAM Communication in Report',
          type: 'text',
          content: "**For each CAM, describe:**\n\n1. Principal considerations leading to determination\n2. How the CAM was addressed in the audit\n3. Reference to relevant F/S accounts or disclosures\n\n**Placement:** Separate section titled \"Critical Audit Matters\"\n\n**After Basis for Opinion section**"
        },
        {
          title: 'What Cannot Be CAM',
          type: 'text',
          content: "**CAM does NOT include:**\n\n• Going concern (separate EOM required)\n• Matters giving rise to modified opinion\n• Matters that are routine or insignificant\n• Matters not requiring significant judgment\n\n**CAM is about the hardest, most judgment-intensive areas**"
        },
        {
          title: '⚠️ Exam Trap: KAM vs CAM',
          type: 'warning',
          content: "**Key differences:**\n\n**CAM (PCAOB/Issuers):**\n• Required for all public company audits\n• Specific three-part criteria\n• More detailed requirements\n\n**KAM (AICPA/Non-Issuers):**\n• Optional (voluntary)\n• Similar concept but different criteria\n• More judgment in selection\n\n**Know which applies to your question!**"
        },
        {
          title: 'No CAMs Identified',
          type: 'text',
          content: "**If no CAMs exist (rare):**\n\n• Still include CAM section in report\n• State that auditor has determined there are no CAMs\n\n**Unusual** but possible for very simple audits\n\n**Don't just omit the section!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAM required for issuers (PCAOB); KAM optional for non-issuers",
            "CAM: Communicated to AC, material accounts, challenging judgment",
            "Describe how CAM was addressed and reference F/S accounts",
            "Going concern and modified opinion matters are NOT CAMs",
            "Separate CAM section in report after Basis for Opinion",
            "If no CAMs: Still include section stating none identified",
            "CAMs provide transparency about audit's most challenging areas"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-006',
    section: 'AUD',
    title: "Attestation: Examination Engagements",
    description: "Understand examination engagements under the attestation standards",
    order: 43,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Attestation", "Examination"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Attestation engagements go beyond auditing financial statements! Examination engagements provide high-level assurance on subject matter like compliance, controls, or prospective information. Understanding attestation standards (AT-C) is essential for the AUD exam!"
        },
        {
          title: 'What is Attestation?',
          type: 'text',
          content: "**Attestation = Assurance on subject matter**\n\n**Three types:**\n1. **Examination** - Highest assurance\n2. **Review** - Limited assurance\n3. **Agreed-Upon Procedures** - No assurance (just findings)\n\n**Key difference from audit:** Subject matter varies (not just F/S)"
        },
        {
          title: 'Examination Engagement',
          type: 'text',
          content: "**Purpose:** Express opinion on subject matter or assertion\n\n**Level:** Reasonable assurance (like audit)\n\n**Common subjects:**\n• Pro forma financial information\n• Prospective financial information\n• Compliance with regulations\n• Internal control effectiveness\n• MD&A\n• Service organization controls (SOC 1)"
        },
        {
          title: 'Examination vs Audit',
          type: 'table',
          headers: ['Factor', 'Examination', 'Audit'],
          rows: [
            ['Standards', 'AT-C (Attestation)', 'AU-C (Audit)'],
            ['Subject matter', 'Various', 'Financial statements'],
            ['Assurance level', 'Reasonable', 'Reasonable'],
            ['Opinion type', 'On subject matter', 'On fair presentation']
          ]
        },
        {
          title: '🧠 Memory Aid: Attestation Types',
          type: 'callout',
          content: "**\"ERA\"** of attestation:\n\n**E**xamination = Opinion (high assurance)\n**R**eview = Conclusion (limited assurance)\n**A**greed-Upon = Findings (no assurance)\n\n**Higher the assurance → More procedures required**"
        },
        {
          title: 'Engagement Acceptance',
          type: 'text',
          content: "**Requirements to accept:**\n\n• Subject matter is appropriate\n• Criteria are suitable and available\n• Practitioner has adequate knowledge\n• Subject matter can be measured consistently\n• Reasonable expectation of conclusion\n\n**Must have suitable criteria!**"
        },
        {
          title: 'Suitable Criteria',
          type: 'text',
          content: "**Criteria must be:**\n\n• **Objective** - Different practitioners reach same conclusion\n• **Measurable** - Reasonably consistent measurement\n• **Complete** - All relevant factors included\n• **Relevant** - Relevant to subject matter\n• **Available** - Users can understand basis"
        },
        {
          title: 'Examination Report',
          type: 'text',
          content: "**Report elements:**\n\n1. Title including \"independent\"\n2. Identification of subject matter\n3. Responsible party's responsibility\n4. Practitioner's responsibility\n5. Summary of work performed\n6. Opinion paragraph\n7. Signature, date, location\n\n**Opinion expressed = Reasonable assurance**"
        },
        {
          title: '⚠️ Exam Trap: Management Assertion',
          type: 'warning',
          content: "**Two reporting options:**\n\n**1. Opinion on subject matter directly:**\n\"In our opinion, [the entity] complied with...\"\n\n**2. Opinion on management's assertion:**\n\"In our opinion, management's assertion is fairly stated...\"\n\n**Both acceptable—results should be the same!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Attestation provides assurance on various subject matters",
            "Examination = highest level (reasonable assurance/opinion)",
            "Subject matter includes compliance, controls, prospective info",
            "Must have suitable criteria to accept engagement",
            "Can opine on subject matter or management's assertion",
            "AT-C standards govern attestation engagements",
            "Similar rigor to audit but different subject matter"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-007',
    section: 'AUD',
    title: "Attestation: Review Engagements",
    description: "Learn the requirements for attestation review engagements",
    order: 44,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Attestation", "Review"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Review engagements under attestation standards provide LIMITED assurance—less than examination but more than AUP. Understanding what \"limited assurance\" means and how reviews differ from examinations is key for AUD success!"
        },
        {
          title: 'Attestation Review',
          type: 'text',
          content: "**Purpose:** Express conclusion on subject matter\n\n**Level:** Limited assurance (moderate)\n\n**Procedures:**\n• Inquiry\n• Analytical procedures\n• Other procedures as necessary\n\n**Less extensive than examination!**"
        },
        {
          title: 'Limited vs Reasonable Assurance',
          type: 'text',
          content: "**Limited Assurance (Review):**\n• \"Nothing came to our attention...\"\n• Negative assurance form\n• Meaningful but not high\n\n**Reasonable Assurance (Examination):**\n• \"In our opinion...\"\n• Positive assurance form\n• High level assurance\n\n**Review = Lower cost, lower assurance**"
        },
        {
          title: '🧠 Memory Aid: Review Procedures',
          type: 'callout',
          content: "**\"IAO\"** for review procedures:\n\n**I**nquiry (asking questions)\n**A**nalytics (comparing data)\n**O**ther procedures (as needed)\n\n**No detailed testing like examination!**\n\n**Think:** Review = IAO (I ask only!)"
        },
        {
          title: 'Review Report',
          type: 'text',
          content: "**Report elements:**\n\n1. Title with \"independent\"\n2. Identification of subject matter\n3. Responsibilities (management and practitioner)\n4. Nature of review (limited assurance)\n5. Conclusion paragraph\n6. Signature, date, location\n\n**Conclusion = \"Nothing came to our attention...\""
        },
        {
          title: 'Review Conclusion Wording',
          type: 'text',
          content: "**Standard language:**\n\n\"Based on our review, we are not aware of any material modifications that should be made to [subject matter/assertion] in order for it to be in accordance with [criteria].\"\n\n**Negative form = Limited assurance**\n\n**NOT: \"In our opinion\" (that's examination)**"
        },
        {
          title: 'When Review is Appropriate',
          type: 'text',
          content: "**Consider review when:**\n\n• Lower assurance is acceptable\n• Cost is a factor\n• Subject matter is less complex\n• Risk is moderate\n\n**Examples:**\n• Compliance reviews\n• Pro forma information\n• Sustainability reporting"
        },
        {
          title: '⚠️ Exam Trap: Not an Audit Alternative',
          type: 'warning',
          content: "**Review cannot substitute for audit when:**\n\n• High assurance is required\n• Regulatory mandate requires audit\n• Users need opinion-level assurance\n\n**Review ≠ Cheaper audit**\n\n**Different purpose, different procedures, different assurance!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Review provides limited (negative) assurance",
            "Procedures: Inquiry, analytics, other procedures",
            "Less extensive than examination",
            "Conclusion: \"Nothing came to our attention...\"",
            "Lower cost but also lower assurance",
            "Cannot substitute when high assurance needed",
            "Appropriate when moderate assurance is acceptable"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-008',
    section: 'AUD',
    title: "Agreed-Upon Procedures (AUP)",
    description: "Master agreed-upon procedures engagements",
    order: 45,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Attestation", "AUP"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "AUP engagements are unique—no opinion, no conclusion, just findings! Users engage the practitioner to perform specific procedures and report what was found. Understanding this \"procedures only\" engagement is essential for AUD!"
        },
        {
          title: 'What is AUP?',
          type: 'text',
          content: "**Agreed-Upon Procedures:**\n\n• Practitioner performs only agreed procedures\n• Reports only factual findings\n• NO opinion or conclusion\n• Users draw their own conclusions\n\n**Think:** \"Here's what I did, here's what I found. You decide what it means.\""
        },
        {
          title: 'Characteristics of AUP',
          type: 'text',
          content: "**Key features:**\n\n• Procedures must be agreed upon with engaging party\n• Procedures must be sufficient for intended use\n• Report lists procedures performed\n• Report presents factual findings only\n• No assurance provided\n• Users must be able to evaluate findings"
        },
        {
          title: '🧠 Memory Aid: AUP Elements',
          type: 'callout',
          content: "**\"FACT\"** describes AUP:\n\n**F**indings only (no opinion)\n**A**greed procedures (specified by users)\n**C**ustomized engagement\n**T**hey conclude (users, not practitioner)\n\n**Just the FACTs, ma'am!**"
        },
        {
          title: 'Engagement Acceptance',
          type: 'text',
          content: "**Requirements:**\n\n• Procedures must be agreed upon\n• Engaging party acknowledges appropriateness\n• Measurable subject matter\n• Findings can be objectively determined\n• Limited to those who agreed to procedures\n\n**Prior restriction on use was removed in 2020!**"
        },
        {
          title: 'AUP Report Contents',
          type: 'text',
          content: "**Report includes:**\n\n1. Title\n2. Subject matter identification\n3. Responsible party and practitioner responsibilities\n4. Procedures performed (in detail)\n5. Findings for each procedure\n6. Statement: No opinion or conclusion expressed\n7. Signature, date, location\n\n**Very detailed on procedures!**"
        },
        {
          title: 'Sample Procedures and Findings',
          type: 'example',
          content: "**Procedure:** Compare aged accounts receivable trial balance to general ledger.\n\n**Finding:** The aged trial balance total of $1,456,789 agreed to the general ledger balance.\n\n**Procedure:** Select 25 largest customer balances and mail confirmations.\n\n**Finding:** 23 of 25 confirmations returned. 22 agreed; 1 showed $1,200 timing difference due to payment in transit."
        },
        {
          title: '⚠️ Exam Trap: No Assurance',
          type: 'warning',
          content: "**AUP provides NO assurance!**\n\n**Cannot state:**\n• \"In our opinion...\"\n• \"Based on our review...\"\n• \"We conclude...\"\n\n**Must state:**\n\"We make no representation regarding the sufficiency of the procedures.\"\n\n**Users must evaluate adequacy of procedures and findings!**"
        },
        {
          title: 'Common AUP Applications',
          type: 'text',
          content: "**Frequently used for:**\n\n• Royalty audits\n• Grant compliance\n• Debt covenant verification\n• Real estate closing statements\n• Insurance claims\n• Due diligence support\n• Specific account testing\n\n**Flexible—can cover anything with measurable subject matter**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "AUP = Agreed procedures performed, findings reported",
            "NO opinion or conclusion—factual findings only",
            "Procedures must be agreed upon with engaging party",
            "Users draw their own conclusions from findings",
            "Report details each procedure and its finding",
            "Use restriction removed in 2020 (broader distribution OK)",
            "Common for royalties, grants, covenants, due diligence"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-009',
    section: 'AUD',
    title: "SSARS: Compilation Engagements",
    description: "Understand compilation services under SSARS",
    order: 46,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["SSARS", "Compilation"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Compilations are the most common accounting service for small businesses! Under SSARS, CPAs assist in preparing financial statements but provide NO assurance. Understanding what's required—and what's NOT—is essential for serving private company clients!"
        },
        {
          title: 'What is Compilation?',
          type: 'text',
          content: "**Compilation:**\n\n• CPA assists in presenting F/S\n• Uses management's information\n• NO assurance expressed\n• Reading for obvious errors only\n• Management takes responsibility\n\n**Governed by:** SSARS (Statements on Standards for Accounting and Review Services)"
        },
        {
          title: 'Compilation vs Audit vs Review',
          type: 'table',
          headers: ['Feature', 'Compilation', 'Review', 'Audit'],
          rows: [
            ['Assurance', 'None', 'Limited', 'Reasonable'],
            ['Standards', 'SSARS', 'SSARS/AT-C', 'GAAS'],
            ['Procedures', 'Minimal', 'Inquiry/Analytics', 'Extensive'],
            ['Independence', 'Not required', 'Required', 'Required'],
            ['Report', 'No assurance', 'Limited assurance', 'Opinion']
          ]
        },
        {
          title: '🧠 Memory Aid: Compilation',
          type: 'callout',
          content: "**\"PRESENT\"** the compilation:\n\n**P**repare F/S from management info\n**R**ead for obvious errors\n**E**ngagement letter required\n**S**SARS governs\n**E**xpress NO assurance\n**N**o independence required\n**T**ake care—still responsible!\n\n**Compilation = PRESENT, don't verify!**"
        },
        {
          title: 'Required Procedures',
          type: 'text',
          content: "**What accountant MUST do:**\n\n• Obtain engagement letter\n• Have knowledge of industry\n• Understand client's accounting policies\n• Read F/S for obvious material errors\n• Ensure appropriate framework\n\n**What accountant does NOT do:**\n• Verify information\n• Test underlying data\n• Obtain evidence"
        },
        {
          title: 'Independence NOT Required',
          type: 'text',
          content: "**Unique to compilation:**\n\n• Independence NOT required\n• BUT—if not independent, must disclose in report\n• Reason for impairment not required to be stated\n\n**Example:** \"We are not independent with respect to XYZ Company.\"\n\n**Still must be competent and ethical!**"
        },
        {
          title: 'Compilation Report',
          type: 'text',
          content: "**Report elements:**\n\n1. Title (no \"independent\" if not independent)\n2. Addressee\n3. Identification of F/S compiled\n4. Management's responsibility statement\n5. Accountant's responsibility statement\n6. Statement that NO assurance expressed\n7. Signature, date, city\n\n**Key statement:** \"We have not audited or reviewed...\""
        },
        {
          title: '⚠️ Exam Trap: GAAP Departures',
          type: 'warning',
          content: "**If F/S depart from GAAP:**\n\n**Option 1:** Modify report\n• Disclose departure in separate paragraph\n• May include dollar effect if known\n\n**Option 2:** Withdrawal\n• If client won't correct material departures\n• Consider if association is appropriate\n\n**Can compile with GAAP departures—just disclose!**"
        },
        {
          title: 'Omission of Disclosures',
          type: 'text',
          content: "**Substantially all disclosures may be omitted IF:**\n\n• Not intended to mislead users\n• Report indicates omission\n\n**Report states:** \"Management has elected to omit substantially all disclosures required by [framework].\"\n\n**Cannot selectively omit—all or none!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Compilation = Assist in presenting F/S, NO assurance",
            "Independence NOT required (but disclose if not independent)",
            "SSARS governs compilation engagements",
            "Read for obvious errors only—no verification",
            "GAAP departures: Disclose or withdraw",
            "Substantially all disclosures may be omitted if disclosed",
            "Engagement letter required"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-010',
    section: 'AUD',
    title: "SSARS: Review Engagements",
    description: "Master review services for non-public entities",
    order: 47,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["SSARS", "Review"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Reviews under SSARS provide limited assurance on private company financial statements—more than compilation but less than audit! Understanding the procedures and report language is essential. Reviews are very common in practice and on the exam!"
        },
        {
          title: 'SSARS Review',
          type: 'text',
          content: "**Review engagement:**\n\n• Provides LIMITED assurance\n• Based primarily on inquiry and analytics\n• Less scope than audit\n• Independence IS required\n• Governed by SSARS (AR-C 90)\n\n**Conclusion:** \"We are not aware of any material modifications...\""
        },
        {
          title: 'Review Procedures',
          type: 'text',
          content: "**Primary procedures:**\n\n**1. Inquiry:**\n• Of management about accounting practices\n• About unusual transactions\n• About subsequent events\n\n**2. Analytical procedures:**\n• Compare to prior periods\n• Compare to expectations\n• Investigate unusual fluctuations\n\n**Not designed to obtain reasonable assurance!**"
        },
        {
          title: '🧠 Memory Aid: Review = IA',
          type: 'callout',
          content: "**Review = \"I Ask\"**\n\n**I** = Inquiry (asking questions)\n**A** = Analytics (comparing numbers)\n\n**That's primarily it!**\n\n**No detailed testing, sampling, or confirmation**\n\n**Just ASK and ANALYZE**"
        },
        {
          title: 'Independence Requirement',
          type: 'text',
          content: "**Must be independent for review!**\n\n**If not independent:**\n• Cannot perform review\n• Must compile instead (or decline)\n\n**This is different from compilation** where independence not required\n\n**No disclosure option—simply cannot do review without independence**"
        },
        {
          title: 'Review Report',
          type: 'text',
          content: "**Report elements:**\n\n1. Title including \"Independent\"\n2. Addressee\n3. Identification of F/S reviewed\n4. Management's responsibility\n5. Accountant's responsibility\n6. Description of review (limited assurance)\n7. Conclusion paragraph\n8. Signature, date, city"
        },
        {
          title: 'Review Conclusion Wording',
          type: 'text',
          content: "**Standard conclusion:**\n\n\"Based on our review, we are not aware of any material modifications that should be made to the accompanying financial statements in order for them to be in accordance with accounting principles generally accepted in the United States of America.\"\n\n**Negative form = Limited assurance**"
        },
        {
          title: '⚠️ Exam Trap: Review vs Audit Procedures',
          type: 'warning',
          content: "**Review does NOT include:**\n\n• Confirmation of receivables\n• Physical inventory observation\n• Testing internal controls\n• Sampling transactions\n• Obtaining third-party evidence\n\n**If you find yourself doing these → You're auditing, not reviewing!**\n\n**Review = Inquiry + Analytics only**"
        },
        {
          title: 'Known Departures from GAAP',
          type: 'text',
          content: "**If material GAAP departure found:**\n\n**Option 1:** Request management to revise\n\n**Option 2:** Modify report\n• Describe departure\n• Include effect if known\n• Qualified or adverse conclusion\n\n**Option 3:** Withdraw\n• If modification inadequate"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Review provides LIMITED assurance (negative form)",
            "Procedures: Primarily inquiry and analytics",
            "Independence IS required for reviews",
            "No detailed testing, sampling, or confirmations",
            "Conclusion: \"Not aware of any material modifications...\"",
            "GAAP departures: Modify report or withdraw",
            "More assurance than compilation, less than audit"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-011',
    section: 'AUD',
    title: "SSARS: Preparation Engagements",
    description: "Understand the preparation of financial statements service",
    order: 48,
    duration: 35,
    difficulty: 'beginner',
    topics: ["SSARS", "Preparation"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Preparation engagements are the simplest SSARS service! The CPA prepares financial statements but issues NO report. Understanding this \"report-less\" service and when it's appropriate is important for serving small business clients!"
        },
        {
          title: 'What is Preparation?',
          type: 'text',
          content: "**Preparation engagement:**\n\n• CPA prepares F/S for management\n• NO report is issued\n• NO assurance provided\n• Management uses for internal purposes\n\n**Simplest SSARS engagement—no report!**\n\n**Governed by:** AR-C 70"
        },
        {
          title: 'Preparation vs Compilation',
          type: 'table',
          headers: ['Feature', 'Preparation', 'Compilation'],
          rows: [
            ['Report issued', 'NO report', 'YES—compilation report'],
            ['Legend required', 'YES (on each page)', 'NO'],
            ['Assurance', 'None', 'None'],
            ['Independence', 'Not required', 'Not required'],
            ['Engagement letter', 'Required', 'Required']
          ]
        },
        {
          title: '🧠 Memory Aid: Preparation',
          type: 'callout',
          content: "**\"NO Report, LEGEND\"**\n\n**NO R**eport is issued\n**LEGEND** on each page\n\n**That's the key difference from compilation!**\n\nPreparation = Legend instead of report"
        },
        {
          title: 'Legend Requirement',
          type: 'text',
          content: "**Each page of F/S must include legend:**\n\n**\"No assurance is provided on these financial statements\"**\n\n**Or similar wording that:**\n• Indicates no assurance\n• Identifies the CPA (optional)\n\n**Purpose:** Users know no assurance was provided"
        },
        {
          title: 'When to Use Preparation',
          type: 'text',
          content: "**Appropriate when:**\n\n• F/S for internal use only\n• No external users need assurance\n• Management just needs F/S prepared\n• Cost is a primary factor\n\n**Not appropriate when:**\n• Third parties will rely on F/S\n• Bank or creditor requires compilation/review\n• Assurance is needed"
        },
        {
          title: '⚠️ Exam Trap: Third-Party Use',
          type: 'warning',
          content: "**CPA should assess intended use:**\n\n**If F/S will go to third parties:**\n• Consider compilation or review instead\n• Preparation may not be appropriate\n• Bank/creditor may require report\n\n**Preparation is really for INTERNAL use only**\n\n**No prohibition, but consider appropriateness!**"
        },
        {
          title: 'Required Documentation',
          type: 'text',
          content: "**Must document:**\n\n• Engagement letter (signed)\n• Understanding of terms\n• Legend requirement agreement\n\n**Engagement letter specifies:**\n• Services to be performed\n• No report will be issued\n• Legend will be included\n• Management responsibilities"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Preparation = CPA prepares F/S, NO report issued",
            "Legend required on each page: \"No assurance provided\"",
            "Independence NOT required",
            "Engagement letter required",
            "Simplest SSARS service—no assurance, no report",
            "Best for internal use only",
            "Consider compilation if third parties will use F/S"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-012',
    section: 'AUD',
    title: "SOC 1 & SOC 2 Reports",
    description: "Understand Service Organization Control reports",
    order: 49,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Attestation", "SOC Reports"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Service organizations handle critical data—payroll, cloud computing, data centers. SOC reports provide assurance about their controls! Understanding SOC 1 vs SOC 2, Type I vs Type II is essential for modern auditing. This topic is increasingly important on AUD!"
        },
        {
          title: 'What Are SOC Reports?',
          type: 'text',
          content: "**Service Organization Control (SOC) Reports:**\n\n• Assurance reports on service organizations\n• Cover internal controls at service org\n• Used by user entities and their auditors\n• Performed under attestation standards\n\n**Why needed:** User entities outsource functions but need assurance about provider controls"
        },
        {
          title: 'SOC 1 vs SOC 2 vs SOC 3',
          type: 'table',
          headers: ['Report', 'Focus', 'Users'],
          rows: [
            ['SOC 1', 'Controls relevant to user entities F/S', 'User auditors, management'],
            ['SOC 2', 'Trust Services Criteria (security, etc.)', 'Management, specified parties'],
            ['SOC 3', 'Trust Services Criteria (general use)', 'General public (marketing)']
          ]
        },
        {
          title: 'SOC 1 Reports',
          type: 'text',
          content: "**Controls relevant to user entity F/S:**\n\n• Transaction processing controls\n• Controls over financial data\n• Relevant to user's audit\n\n**Example:** Payroll processor\n• Controls over payroll calculations\n• Tax withholding accuracy\n• Report generation controls\n\n**User auditors use to assess control risk!**"
        },
        {
          title: '🧠 Memory Aid: SOC Report Types',
          type: 'callout',
          content: "**\"1-2-3\"** SOC reports:\n\n**SOC 1** = **1**nternal controls for F/S\n**SOC 2** = **2** types of users (restricted + specific)\n**SOC 3** = For **3**veryone (general public)\n\n**1 = Financial focus\n2 = Security/Trust focus\n3 = General marketing**"
        },
        {
          title: 'Type I vs Type II',
          type: 'text',
          content: "**Type I Report:**\n• Controls at a POINT in time\n• Design and implementation only\n• No testing of operating effectiveness\n\n**Type II Report:**\n• Controls over a PERIOD of time\n• Tests operating effectiveness\n• More valuable for auditors\n\n**Type II > Type I for audit reliance!**"
        },
        {
          title: 'Type I vs Type II Details',
          type: 'table',
          headers: ['Feature', 'Type I', 'Type II'],
          rows: [
            ['Coverage', 'Point in time', 'Period of time'],
            ['Tests operating effectiveness', 'No', 'Yes'],
            ['Describes tests', 'No', 'Yes'],
            ['User auditor reliance', 'Limited', 'Greater']
          ]
        },
        {
          title: 'Trust Services Criteria (SOC 2/3)',
          type: 'text',
          content: "**Five criteria:**\n\n1. **Security** - Protected against unauthorized access\n2. **Availability** - Available for operation as agreed\n3. **Processing Integrity** - Complete, accurate, timely\n4. **Confidentiality** - Information protected as committed\n5. **Privacy** - Personal information handled appropriately\n\n**At minimum, security must be covered**"
        },
        {
          title: '⚠️ Exam Trap: User Auditor Responsibilities',
          type: 'warning',
          content: "**User auditor cannot just rely on SOC report!**\n\n**Must still:**\n• Evaluate relevance of service org controls\n• Consider period covered vs. audit period\n• Evaluate complementary user entity controls\n• Test controls at user entity\n\n**SOC report helps—but doesn't replace user auditor work!**"
        },
        {
          title: 'Using SOC Reports in Audit',
          type: 'text',
          content: "**User auditor should:**\n\n• Evaluate service auditor competence\n• Assess period covered by report\n• Consider complementary controls\n• Evaluate subservice organizations\n• Test controls user entity must perform\n\n**Gap period:** If SOC report doesn't cover full audit period, additional testing may be needed"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SOC 1: Controls relevant to user entity F/S",
            "SOC 2: Trust Services Criteria (security, availability, etc.)",
            "SOC 3: General use marketing report",
            "Type I: Point in time (design only)",
            "Type II: Period of time (tests operating effectiveness)",
            "User auditor must still perform procedures—can't just rely",
            "Consider period covered and complementary controls"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-013',
    section: 'AUD',
    title: "Single Audit & Government Auditing",
    description: "Understand audits of federal awards and government auditing standards",
    order: 50,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Government Auditing", "Single Audit"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Organizations receiving federal awards must comply with special audit requirements! The Single Audit (Uniform Guidance) and Yellow Book (GAGAS) add layers to traditional GAAS audits. Understanding these requirements is essential for governmental and nonprofit audit work!"
        },
        {
          title: 'Yellow Book (GAGAS)',
          type: 'text',
          content: "**Government Auditing Standards:**\n\n• Issued by GAO (Comptroller General)\n• Also called \"Yellow Book\" or GAGAS\n• Applies to government entities and federal award recipients\n• Builds on GAAS with additional requirements\n\n**Key additions:**\n• Stricter independence rules\n• CPE requirements (80 hours every 2 years)\n• Quality control requirements"
        },
        {
          title: 'Single Audit (Uniform Guidance)',
          type: 'text',
          content: "**Who needs a Single Audit?**\n\n**Non-federal entities expending $750,000+ in federal awards**\n\n**What it covers:**\n• F/S audit (GAAS + Yellow Book)\n• Compliance audit of major programs\n• Internal control over compliance\n\n**Governed by:** 2 CFR 200 (Uniform Guidance)"
        },
        {
          title: 'Single Audit Components',
          type: 'table',
          headers: ['Component', 'Description'],
          rows: [
            ['F/S Audit', 'Audit of entire F/S under GAAS/GAGAS'],
            ['Schedule of Expenditures', 'Schedule of Federal Awards (SEFA)'],
            ['Compliance Testing', 'Test compliance with federal requirements'],
            ['IC over Compliance', 'Evaluate controls over federal programs'],
            ['Data Collection Form', 'Submit to Federal Audit Clearinghouse']
          ]
        },
        {
          title: '🧠 Memory Aid: Single Audit',
          type: 'callout',
          content: "**\"FICS\"** the Single Audit:\n\n**F**inancial statement audit\n**I**nternal control over compliance\n**C**ompliance testing of major programs\n**S**chedule of Federal Awards (SEFA)\n\n**All four must be addressed!**"
        },
        {
          title: 'Major Program Determination',
          type: 'text',
          content: "**Not all programs are tested:**\n\n**Major programs identified using:**\n• Risk-based approach\n• Type A/Type B classification\n• Prior audit findings\n• Federal oversight\n\n**Type A:** Larger programs (higher threshold)\n**Type B:** Smaller programs (lower threshold)\n\n**Must test major programs for compliance!**"
        },
        {
          title: 'Compliance Requirements',
          type: 'text',
          content: "**Compliance Supplement identifies requirements:**\n\n**Common compliance areas:**\n• Allowable activities/costs\n• Cash management\n• Eligibility\n• Equipment management\n• Matching/Level of effort\n• Period of performance\n• Procurement\n• Reporting\n• Subrecipient monitoring"
        },
        {
          title: 'Single Audit Reports',
          type: 'text',
          content: "**Reports required:**\n\n1. Opinion on F/S (standard audit report)\n2. Report on IC over F/S\n3. Report on compliance (F/S audit)\n4. Report on compliance for major programs\n5. Report on IC over compliance for major programs\n6. Schedule of findings and questioned costs\n\n**Multiple reports required!**"
        },
        {
          title: '⚠️ Exam Trap: Yellow Book Independence',
          type: 'warning',
          content: "**Yellow Book is STRICTER than AICPA:**\n\n**Non-audit services:**\n• More services prohibited\n• Documentation requirements stricter\n• Management must take responsibility\n\n**Cooling-off period:**\n• For personnel joining audited entity\n\n**GAGAS independence requirements exceed AICPA Code!**"
        },
        {
          title: 'Findings and Questioned Costs',
          type: 'text',
          content: "**Schedule of Findings:**\n\n• Material weaknesses and significant deficiencies\n• Material noncompliance\n• Known questioned costs > $25,000\n• Fraud\n\n**Questioned costs:**\n• Costs that may not be allowable\n• Must be resolved with federal agency\n• Can result in repayment requirement"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Single Audit required for $750,000+ in federal awards",
            "Yellow Book (GAGAS) builds on GAAS with additional requirements",
            "Single Audit covers F/S, SEFA, compliance, and IC over compliance",
            "Major programs determined using risk-based approach",
            "Multiple reports required—F/S opinion plus compliance reports",
            "Yellow Book independence is STRICTER than AICPA",
            "Findings and questioned costs must be reported"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-010',
    section: 'AUD',
    title: "Components of Internal Control",
    description: "Master the five COSO internal control components",
    order: 51,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Internal Control", "COSO"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Internal control is the FOUNDATION of audit risk assessment! Auditors must understand and evaluate the client's controls to determine the nature, timing, and extent of further procedures. The COSO framework is the standard—know it cold!"
        },
        {
          title: 'What is Internal Control?',
          type: 'text',
          content: "**Process designed to provide reasonable assurance about:**\n\n• Reliability of financial reporting\n• Effectiveness/efficiency of operations\n• Compliance with laws and regulations\n\n**Internal control is a PROCESS, not an event**\n\n**Provides REASONABLE, not absolute, assurance**"
        },
        {
          title: 'The Five COSO Components',
          type: 'table',
          headers: ['Component', 'Focus'],
          rows: [
            ['Control Environment', 'Tone at the top, ethics, governance'],
            ['Risk Assessment', 'Identifying and analyzing risks'],
            ['Control Activities', 'Policies and procedures'],
            ['Information & Communication', 'Capturing and sharing information'],
            ['Monitoring', 'Ongoing and separate evaluations']
          ]
        },
        {
          title: '🧠 Memory Aid: COSO Components',
          type: 'callout',
          content: "**\"CRIME\"** stops fraud:\n\n**C**ontrol Environment\n**R**isk Assessment\n**I**nformation & Communication\n**M**onitoring\n**E**xisting Control Activities\n\n**Or: \"CRICA\" (sounds like \"criteria\")**"
        },
        {
          title: 'Control Environment',
          type: 'text',
          content: "**The foundation—sets the tone:**\n\n• Integrity and ethical values\n• Board of directors oversight\n• Organizational structure\n• Commitment to competence\n• Accountability\n\n**\"Tone at the top\"—most important component!**\n\n**If control environment is weak, other controls may be ineffective**"
        },
        {
          title: 'Risk Assessment',
          type: 'text',
          content: "**Entity's process to identify and respond to risks:**\n\n• Identify risks to objectives\n• Analyze likelihood and impact\n• Determine risk response\n• Consider fraud risk\n• Address changes in environment\n\n**Management's risk assessment ≠ Auditor's risk assessment**"
        },
        {
          title: 'Control Activities',
          type: 'text',
          content: "**Actions to address risks:**\n\n**Types:**\n• Preventive (stop errors before they occur)\n• Detective (find errors after they occur)\n\n**Examples:**\n• Authorizations and approvals\n• Segregation of duties\n• Reconciliations\n• Physical controls\n• IT general and application controls"
        },
        {
          title: 'Information and Communication',
          type: 'text',
          content: "**Capturing and sharing relevant information:**\n\n**Information systems:**\n• Identify and capture transactions\n• Maintain accountability\n• Enable financial reporting\n\n**Communication:**\n• Internal (employees understand roles)\n• External (customers, suppliers, regulators)"
        },
        {
          title: 'Monitoring',
          type: 'text',
          content: "**Ongoing assessment of control effectiveness:**\n\n**Ongoing monitoring:**\n• Built into normal operations\n• Real-time feedback\n\n**Separate evaluations:**\n• Internal audit\n• Periodic assessments\n\n**Deficiencies reported to management and those charged with governance**"
        },
        {
          title: '⚠️ Exam Trap: Required Understanding',
          type: 'warning',
          content: "**Auditor must obtain understanding of ALL five components!**\n\n**Even if not testing controls:**\n• Still need to understand control environment\n• Evaluate design of controls\n• Determine if controls are implemented\n\n**Cannot skip internal control assessment!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "COSO: Control Environment, Risk Assessment, Control Activities, Information/Communication, Monitoring",
            "Control environment is the foundation ('tone at the top')",
            "Internal control provides reasonable, not absolute, assurance",
            "Auditor must understand all five components",
            "Control activities: Preventive and detective",
            "Monitoring includes ongoing and separate evaluations",
            "Deficiencies communicated to management and governance"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-011',
    section: 'AUD',
    title: "IT General and Application Controls",
    description: "Understand IT controls in an automated environment",
    order: 52,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Internal Control", "IT Controls"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-C-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Almost every audit involves IT systems! Understanding IT general controls (ITGCs) and application controls is essential. Weak ITGCs can undermine ALL application controls, so auditors must evaluate the IT environment carefully!"
        },
        {
          title: 'ITGCs vs Application Controls',
          type: 'table',
          headers: ['Type', 'Scope', 'Examples'],
          rows: [
            ['IT General Controls', 'Apply across ALL systems', 'Access security, change management'],
            ['Application Controls', 'Specific to ONE application', 'Input validation, calculations']
          ]
        },
        {
          title: 'IT General Control Categories',
          type: 'list',
          content: [
            "**Access to Programs and Data** - Who can access what?",
            "**Program Change Management** - How are changes controlled?",
            "**Program Development** - How are new systems built?",
            "**Computer Operations** - How are systems run day-to-day?"
          ]
        },
        {
          title: '🧠 Memory Aid: ITGC Categories',
          type: 'callout',
          content: "**\"ACPO\"** for ITGCs:\n\n**A**ccess controls\n**C**hange management\n**P**rogram development\n**O**perations controls\n\n**\"ACPO\" protects the systems!**"
        },
        {
          title: 'Access Controls',
          type: 'text',
          content: "**Restrict access to authorized users:**\n\n• User IDs and passwords\n• Role-based access\n• Segregation of duties in systems\n• Physical security of hardware\n\n**Key principle:** Least privilege\n\n**Risks:** Unauthorized access, data theft, fraud"
        },
        {
          title: 'Change Management',
          type: 'text',
          content: "**Control changes to programs and data:**\n\n• Change request documentation\n• Testing before implementation\n• Approval procedures\n• Separation of development and production\n\n**Risks:** Unauthorized changes, bugs, system failures"
        },
        {
          title: 'Application Controls',
          type: 'text',
          content: "**Controls within specific applications:**\n\n**Input controls:**\n• Validation checks\n• Edit checks\n• Batch totals\n\n**Processing controls:**\n• Calculations\n• Data matching\n\n**Output controls:**\n• Report distribution\n• Reconciliations"
        },
        {
          title: 'Input Control Examples',
          type: 'table',
          headers: ['Control', 'Purpose'],
          rows: [
            ['Validity check', 'Data is within allowed values'],
            ['Range check', 'Number is within acceptable range'],
            ['Reasonableness test', 'Data makes sense'],
            ['Check digit', 'Catches transcription errors'],
            ['Hash total', 'Verifies data completeness']
          ]
        },
        {
          title: 'Why ITGCs Matter to Auditors',
          type: 'text',
          content: "**If ITGCs are weak:**\n\n• Application controls may be unreliable\n• Cannot rely on automated controls\n• May need more substantive testing\n\n**If ITGCs are strong:**\n\n• Application controls likely effective\n• Can reduce substantive testing\n• More efficient audit"
        },
        {
          title: '⚠️ Exam Trap: Automated vs Manual Controls',
          type: 'warning',
          content: "**Automated controls are CONSISTENT:**\n\n• Once tested, perform identically each time\n• Less susceptible to human error\n• May only need to test once if ITGCs effective\n\n**Manual controls vary:**\n• Human error, fatigue, judgment\n• Need to test throughout the period\n\n**But automated controls depend on ITGCs!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "ITGCs support ALL applications; Application controls are specific",
            "ITGC categories: Access, Change, Development, Operations",
            "Weak ITGCs can undermine all application controls",
            "Input controls: Validation, edit checks, batch totals",
            "Automated controls are consistent but need strong ITGCs",
            "Auditor must understand IT environment and controls",
            "Strong ITGCs allow reduced substantive testing"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-012',
    section: 'AUD',
    title: "Materiality in Planning and Performing the Audit",
    description: "Determine planning and performance materiality levels",
    order: 53,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Audit Planning", "Materiality"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Materiality drives the entire audit! It determines how much work to do, what errors to report, and whether to modify the opinion. Understanding how to set and apply materiality is fundamental to audit planning!"
        },
        {
          title: 'What is Materiality?',
          type: 'text',
          content: "**Materiality is:**\n\nThe magnitude of an omission or misstatement that could influence decisions of financial statement users.\n\n**Key concept:** Would this matter to users' decisions?\n\n**Materiality is based on auditor JUDGMENT**"
        },
        {
          title: 'Types of Materiality',
          type: 'table',
          headers: ['Type', 'Purpose', 'Amount'],
          rows: [
            ['Overall Materiality', 'F/S as a whole', 'Full benchmark amount'],
            ['Performance Materiality', 'Individual account testing', 'Lower than overall'],
            ['Tolerable Misstatement', 'Sampling threshold', 'Lower than overall'],
            ['Clearly Trivial', 'Below this, don\'t accumulate', 'Much lower (e.g., 5% of materiality)']
          ]
        },
        {
          title: 'Setting Overall Materiality',
          type: 'text',
          content: "**Common benchmarks:**\n\n• 5% of pre-tax income (for-profit)\n• 0.5-1% of total revenue\n• 0.5-1% of total assets\n• 1-2% of equity\n\n**Choice depends on:**\n• Entity type and users\n• Stability of benchmark\n• Relevant factors"
        },
        {
          title: '🧠 Memory Aid: Materiality Benchmarks',
          type: 'callout',
          content: "**\"TREAT\"** benchmarks:\n\n**T**otal assets (0.5-1%)\n**R**evenue (0.5-1%)\n**E**quity (1-2%)\n**A**ssets, net (NFP: 1-2%)\n**T**ax-adjusted income (5%)\n\n**Pre-tax income = most common for for-profits**"
        },
        {
          title: 'Performance Materiality',
          type: 'text',
          content: "**Set BELOW overall materiality:**\n\n**Purpose:** Reduce risk that aggregate of undetected + detected misstatements exceeds overall materiality\n\n**Typically 50-75% of overall materiality**\n\n**Consider:**\n• Risk of undetected misstatements\n• Experience with prior audits\n• Nature and volume of misstatements expected"
        },
        {
          title: 'Factors Affecting Materiality',
          type: 'text',
          content: "**Qualitative factors can make small amounts material:**\n\n• Involves fraud or illegal acts\n• Affects loan covenant compliance\n• Changes a loss into profit (or vice versa)\n• Affects executive compensation\n• Involves related parties\n• Affects segment reporting\n• Previously communicated to users"
        },
        {
          title: 'Revising Materiality',
          type: 'text',
          content: "**Materiality may change during audit:**\n\n**Reasons to revise:**\n• Significant change in circumstances\n• New information obtained\n• Original benchmark no longer appropriate\n\n**If revised downward:**\n• May need additional procedures\n• Evaluate if work already done is sufficient"
        },
        {
          title: '⚠️ Exam Trap: Materiality Direction',
          type: 'warning',
          content: "**Lower materiality = MORE audit work!**\n\n• Lower tolerable misstatement\n• Larger sample sizes\n• More accounts tested\n\n**Higher materiality = LESS audit work**\n\n**Risk moves inversely with materiality**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Materiality = Magnitude that could influence user decisions",
            "Common benchmark: 5% of pre-tax income (for-profit)",
            "Performance materiality set below overall materiality",
            "Qualitative factors can make small amounts material",
            "Materiality is auditor judgment, not a bright line",
            "Lower materiality = More audit work required",
            "Materiality may be revised during the audit"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-II-013',
    section: 'AUD',
    title: "Fraud Risk Assessment",
    description: "Identify and respond to fraud risk factors in the audit",
    order: 54,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Risk Assessment", "Fraud"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-D-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Fraud is a significant audit risk! AU-C 240 requires auditors to specifically consider fraud risk throughout the audit. Understanding the fraud triangle and how to respond to identified risks is essential for AUD!"
        },
        {
          title: 'The Fraud Triangle',
          type: 'text',
          content: "**Three conditions present when fraud occurs:**\n\n1. **Incentive/Pressure** - Reason to commit fraud\n2. **Opportunity** - Ability to commit fraud\n3. **Rationalization** - Justification for behavior\n\n**All three typically present in fraud situations**"
        },
        {
          title: '🧠 Memory Aid: Fraud Triangle',
          type: 'callout',
          content: "**\"POR\"** = Pressure, Opportunity, Rationalization\n\n**Think:**\n\"POOR judgment leads to fraud\"\n\n**P**ressure (I NEED the money)\n**O**pportunity (I CAN take it)\n**R**ationalization (It's OK because...)"
        },
        {
          title: 'Two Types of Fraud',
          type: 'table',
          headers: ['Type', 'Description', 'Who'],
          rows: [
            ['Fraudulent Financial Reporting', 'Intentional misstatement of F/S', 'Management'],
            ['Misappropriation of Assets', 'Theft of company assets', 'Employees or management']
          ]
        },
        {
          title: 'Fraud Risk Factors: Incentive/Pressure',
          type: 'text',
          content: "**Examples:**\n\n• Financial targets or expectations to meet\n• Personal financial difficulties\n• Compensation tied to financial results\n• Threat of bankruptcy or hostile takeover\n• Highly competitive industry\n• High debt with restrictive covenants"
        },
        {
          title: 'Fraud Risk Factors: Opportunity',
          type: 'text',
          content: "**Examples:**\n\n• Weak internal controls\n• Poor tone at the top\n• Inadequate oversight by board/audit committee\n• Complex organizational structure\n• High turnover in accounting personnel\n• Significant related party transactions\n• Ineffective monitoring of management"
        },
        {
          title: 'Fraud Risk Factors: Rationalization',
          type: 'text',
          content: "**Examples:**\n\n• \"Everyone does it\"\n• \"I'll pay it back later\"\n• \"The company owes me\"\n• Management disregard for controls or ethics\n• Strained relationship between management and auditor\n• History of violations or lawsuits"
        },
        {
          title: 'Required Fraud Procedures',
          type: 'list',
          content: [
            "**Discussion among engagement team** about fraud risks",
            "**Inquiries of management** about fraud and controls",
            "**Analytical procedures** to identify unusual relationships",
            "**Consider fraud risk factors** in risk assessment",
            "**Presumed risks:** Revenue recognition, management override"
          ]
        },
        {
          title: 'Management Override',
          type: 'text',
          content: "**ALWAYS presumed to be a significant risk!**\n\n**Why?** Management can override controls\n\n**Required procedures:**\n• Test journal entries and adjustments\n• Review accounting estimates for bias\n• Evaluate business rationale for unusual transactions\n\n**Cannot be mitigated away—must be addressed**"
        },
        {
          title: '⚠️ Exam Trap: Revenue Recognition Presumption',
          type: 'warning',
          content: "**Revenue recognition fraud risk is PRESUMED!**\n\n**Can rebut only with:**\n• Documented specific reasons\n• No relevant fraud risk factors identified\n• No unusual incentives\n\n**Even if rebutted, document rationale**\n\n**Most audits: Cannot rebut—must address**"
        },
        {
          title: 'Responding to Fraud Risks',
          type: 'text',
          content: "**Modify audit approach:**\n\n• Increase professional skepticism\n• Assign more experienced staff\n• Change nature, timing, extent of procedures\n• Perform procedures at unexpected times\n• Address management override\n• Evaluate selection of accounting policies"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Fraud triangle: Pressure, Opportunity, Rationalization",
            "Two types: Fraudulent reporting and asset misappropriation",
            "Revenue recognition fraud risk is presumed (can rebut with documentation)",
            "Management override is ALWAYS a significant risk",
            "Required: Test journal entries, review estimates, evaluate unusual transactions",
            "Team discussion about fraud risks required",
            "Professional skepticism increased when fraud risks identified"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-013',
    section: 'AUD',
    title: "Audit Sampling Fundamentals",
    description: "Master statistical and non-statistical sampling methods",
    order: 55,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Audit Sampling", "Audit Procedures"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Auditors can't test every transaction! Sampling allows auditors to reach conclusions about an entire population by testing a subset. Understanding sampling risk, sample size, and how to evaluate results is essential for audit efficiency and effectiveness!"
        },
        {
          title: 'Why Use Sampling?',
          type: 'text',
          content: "**Sampling allows auditors to:**\n\n• Test a portion of the population\n• Draw conclusions about the whole population\n• Balance thoroughness with efficiency\n• Focus resources on higher-risk areas\n\n**Alternative:** 100% testing (usually impractical)"
        },
        {
          title: 'Statistical vs Non-Statistical',
          type: 'table',
          headers: ['Feature', 'Statistical', 'Non-Statistical'],
          rows: [
            ['Selection', 'Random selection', 'Judgmental selection'],
            ['Evaluation', 'Probability theory', 'Professional judgment'],
            ['Precision', 'Can quantify', 'Cannot quantify'],
            ['Documentation', 'More rigorous', 'Judgment-based'],
            ['Validity', 'Both equally valid under GAAS', 'Both equally valid']
          ]
        },
        {
          title: 'Sampling Risk',
          type: 'text',
          content: "**Risk that sample conclusion differs from full population:**\n\n**Two types:**\n\n1. **Risk of incorrect acceptance** (Type II)\n   • Conclude no misstatement when there IS\n   • Effectiveness risk\n\n2. **Risk of incorrect rejection** (Type I)\n   • Conclude misstatement when there is NOT\n   • Efficiency risk"
        },
        {
          title: '🧠 Memory Aid: Sampling Risks',
          type: 'callout',
          content: "**\"Accept Bad, Reject Good\"**\n\n**Incorrect Acceptance (worse):**\n• Accepting BAD as good\n• Miss a misstatement\n• Relates to audit EFFECTIVENESS\n\n**Incorrect Rejection:**\n• Rejecting GOOD as bad\n• Do unnecessary work\n• Relates to audit EFFICIENCY\n\n**Incorrect acceptance is the bigger concern!**"
        },
        {
          title: 'Sample Size Factors',
          type: 'text',
          content: "**Larger sample needed when:**\n\n• Lower acceptable risk of incorrect acceptance\n• Higher expected deviation rate\n• Higher tolerable deviation rate\n• Larger population (diminishing effect)\n• Greater population variability\n\n**Smaller sample:**\n• When opposite factors apply"
        },
        {
          title: 'Types of Sampling',
          type: 'text',
          content: "**Tests of Controls (Attribute Sampling):**\n• Looking for deviations from prescribed controls\n• Binary outcome: Deviation or no deviation\n• Use: Compliance testing\n\n**Substantive Tests (Variables Sampling):**\n• Looking for monetary misstatements\n• Dollar amounts involved\n• Use: Account balance testing"
        },
        {
          title: 'Selection Methods',
          type: 'text',
          content: "**Random selection:**\n• Every item has equal chance\n• Computer or random number table\n\n**Systematic selection:**\n• Every nth item (with random start)\n• Must be careful of patterns\n\n**Haphazard selection:**\n• No conscious bias\n• Not truly random\n\n**Block selection:**\n• Consecutive items\n• Generally NOT appropriate for statistical"
        },
        {
          title: '⚠️ Exam Trap: Sample Size Relationships',
          type: 'warning',
          content: "**INVERSE relationship:**\n• Tolerable deviation ↑ = Sample size ↓\n• Acceptable risk ↑ = Sample size ↓\n\n**DIRECT relationship:**\n• Expected deviation ↑ = Sample size ↑\n• Population size ↑ = Sample size ↑ (slightly)\n\n**These are tested frequently!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Sampling: Test subset to conclude about population",
            "Statistical and non-statistical both valid under GAAS",
            "Incorrect acceptance: Bigger concern (effectiveness)",
            "Incorrect rejection: Efficiency concern",
            "Tolerable deviation ↑ = Sample size ↓ (inverse)",
            "Expected deviation ↑ = Sample size ↑ (direct)",
            "Attribute sampling for controls; Variables for balances"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-III-014',
    section: 'AUD',
    title: "Substantive Analytical Procedures",
    description: "Use analytics as substantive evidence",
    order: 56,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Analytical Procedures", "Substantive Testing"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Analytical procedures can be powerful substantive tests! When designed properly, comparing relationships and trends can provide strong evidence about account balances. Understanding when and how to use substantive analytics is essential for efficient auditing!"
        },
        {
          title: 'Three Uses of Analytics',
          type: 'text',
          content: "**In an audit:**\n\n1. **Planning** (Required)\n   • Understand the entity\n   • Identify risk areas\n\n2. **Substantive testing** (Optional)\n   • Replace or supplement tests of details\n   • Provide evidence about assertions\n\n3. **Overall review** (Required)\n   • Final reasonableness check\n   • Identify concerns before opinion"
        },
        {
          title: 'When to Use Substantive Analytics',
          type: 'text',
          content: "**Effective when:**\n\n• Plausible relationship exists\n• Data is reliable\n• Relationship is predictable\n• Precision can be developed\n\n**Examples:**\n• Depreciation expense (predictable relationship)\n• Payroll expense (hours × rate)\n• Interest income (balance × rate × time)"
        },
        {
          title: '🧠 Memory Aid: Substantive Analytics',
          type: 'callout',
          content: "**\"PEDIR\"** for effective analytics:\n\n**P**lausible relationship\n**E**xpectation developed\n**D**ata reliability\n**I**nvestigate differences\n**R**ecord conclusions\n\n**If relationship isn't PREDICTABLE, analytics won't work!**"
        },
        {
          title: 'Developing Expectations',
          type: 'text',
          content: "**Sources for expectations:**\n\n• Prior year amounts\n• Budgets and forecasts\n• Industry data\n• Non-financial data\n• Relationships among data elements\n\n**More precise expectation = Better evidence**\n\n**Must document the expectation!**"
        },
        {
          title: 'Precision of Analytics',
          type: 'text',
          content: "**Factors affecting precision:**\n\n• Level of disaggregation (more detail = more precise)\n• Data reliability\n• Type of expectation\n• Threshold for investigation\n\n**Higher precision:**\n• Analyzing by month vs. year\n• Analyzing by location vs. total\n• Using operational data vs. financial only"
        },
        {
          title: 'Investigation of Differences',
          type: 'text',
          content: "**When actual differs from expectation:**\n\n1. **Inquire of management**\n2. **Corroborate explanations**\n3. **Perform additional procedures if needed**\n\n**Do NOT accept explanations without corroboration!**\n\n**Unexplained differences = Potential misstatement**"
        },
        {
          title: '⚠️ Exam Trap: Relying on Analytics',
          type: 'warning',
          content: "**Substantive analytics alone may NOT be enough for:**\n\n• Significant risks\n• Material balances requiring precision\n• Assertions where relationships aren't predictable\n\n**Often combined with tests of details**\n\n**Analytics good for reasonableness—not precision**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Analytics: Planning (required), Substantive (optional), Overall review (required)",
            "Substantive analytics: Provide evidence about assertions",
            "Effective when relationship is predictable",
            "More disaggregation = More precision",
            "Must investigate and corroborate differences",
            "Cannot accept management explanations without proof",
            "May combine with tests of details for best evidence"
          ]
        }
      ]
    }
  },

  // =============================================
  // AUD: ADDITIONAL AUDIT TOPICS
  // =============================================
  {
    id: 'AUD-IV-012',
    section: 'AUD',
    title: "Government Auditing Standards (Yellow Book)",
    description: "Understand GAGAS requirements for government audits",
    order: 57,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Government Audits", "Yellow Book", "GAGAS"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Government Auditing Standards (Yellow Book/GAGAS) apply to audits of governmental entities and those receiving federal funding! These build on GAAS with additional requirements. Essential AUD knowledge!"
        },
        {
          title: 'Yellow Book Framework',
          type: 'text',
          content: "**Generally Accepted Government Auditing Standards (GAGAS):**\n\n• Issued by the Comptroller General (GAO)\n• Applies to government entities and recipients\n• Incorporates AICPA standards by reference\n• Adds additional independence and reporting requirements\n\n**Nicknamed \"Yellow Book\" for its cover color**"
        },
        {
          title: 'Types of GAGAS Engagements',
          type: 'table',
          headers: ['Type', 'Description', 'Standards'],
          rows: [
            ['Financial audits', 'Opinion on financial statements', 'GAAS + GAGAS'],
            ['Attestation', 'Opinion on subject matter', 'Attestation + GAGAS'],
            ['Performance audits', 'Effectiveness and efficiency', 'GAGAS specific'],
            ['Review (new)', 'Compliance reviews', 'GAGAS specific']
          ]
        },
        {
          title: '🧠 Memory Aid: Yellow Book Extras',
          type: 'callout',
          content: "**\"GAAS Plus Extras\"**\n\n**Additional GAGAS requirements:**\n• More restrictive independence\n• CPE requirements (80 hours/2 years)\n• Quality control & peer review\n• Additional reporting elements\n\n**All GAAS requirements STILL apply!**"
        },
        {
          title: 'Independence Requirements',
          type: 'text',
          content: "**More restrictive than AICPA:**\n\n**Threats framework:**\n• Self-interest, self-review, bias, familiarity, undue influence, management participation, structural\n\n**Prohibited nonaudit services:**\n• Preparing financial statements (sometimes)\n• Maintaining client records\n• Designing or implementing internal controls\n\n**Must document threats and safeguards**"
        },
        {
          title: 'Reporting Requirements',
          type: 'text',
          content: "**Financial audit reports include:**\n\n• Opinion on financial statements (standard)\n• Report on internal control (required!)\n• Report on compliance (required!)\n\n**Internal control report:**\n• Material weaknesses\n• Significant deficiencies\n• Even if none found—still report!\n\n**More extensive than commercial audits**"
        },
        {
          title: '⚠️ Exam Trap: Report Distribution',
          type: 'warning',
          content: "**Yellow Book reports are PUBLIC:**\n\n• Must be made available to public\n• Unless classified or sensitive\n• Posted on websites, clearinghouses\n\n**Different from private company audits!**\n\n**30-day response requirement:**\n• Management must respond to findings\n• Response included in report"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "GAGAS: Government Auditing Standards issued by GAO",
            "Incorporates GAAS but adds additional requirements",
            "Independence: More restrictive, threats framework",
            "CPE: 80 hours every 2 years, including 24 in government",
            "Reports include internal control and compliance",
            "Reports generally available to public",
            "Management response to findings required"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-013',
    section: 'AUD',
    title: "Single Audit (Uniform Guidance)",
    description: "Understand single audit requirements for federal award recipients",
    order: 58,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Government Audits", "Single Audit", "Uniform Guidance"],
    blueprintArea: 'AUD-IV',
    blueprintTopic: 'AUD-IV-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Organizations receiving federal awards must undergo single audits! Understanding the Uniform Guidance requirements, major program determination, and compliance testing is essential for AUD!"
        },
        {
          title: 'Single Audit Threshold',
          type: 'text',
          content: "**When required:**\n\n**$750,000 or more in federal awards**\n(Fiscal years starting after 12/26/2014)\n\n**Applies to:**\n• State and local governments\n• Nonprofits\n• Colleges and universities\n• Indian tribes\n\n**Subrecipients may also require single audit**"
        },
        {
          title: 'Single Audit Components',
          type: 'table',
          headers: ['Component', 'Description', 'Required?'],
          rows: [
            ['Financial statements', 'Entity-wide audit', 'Yes'],
            ['Schedule of expenditures (SEFA)', 'Federal awards listing', 'Yes'],
            ['Internal control over compliance', 'Major programs', 'Yes'],
            ['Compliance testing', 'Major programs', 'Yes'],
            ['Data collection form', 'SF-SAC submission', 'Yes']
          ]
        },
        {
          title: '🧠 Memory Aid: Major Program',
          type: 'callout',
          content: "**\"Type A vs Type B\"**\n\n**Type A programs:**\n• Larger programs (threshold varies)\n• Generally $750K or 3% of total\n\n**Type B programs:**\n• Smaller programs\n\n**Risk-based selection:**\n• All high-risk Type A = Major\n• Some Type B may be elevated\n\n**At least 20% coverage of awards**"
        },
        {
          title: 'Compliance Requirements',
          type: 'text',
          content: "**12 Types of Compliance:**\n\n• Activities allowed/unallowed\n• Allowable costs/cost principles\n• Cash management\n• Eligibility\n• Equipment/real property\n• Matching/level of effort\n• Period of performance\n• Procurement\n• Program income\n• Reporting\n• Subrecipient monitoring\n• Special tests and provisions"
        },
        {
          title: 'Audit Findings',
          type: 'text',
          content: "**When to report:**\n\n**Compliance findings:**\n• Material noncompliance (opinion modifier)\n• Questioned costs (known + likely > $25,000)\n\n**Internal control findings:**\n• Material weaknesses\n• Significant deficiencies\n\n**Schedule of findings and questioned costs required**"
        },
        {
          title: '⚠️ Exam Trap: Questioned Costs',
          type: 'warning',
          content: "**Report if known + likely > $25,000:**\n\n**Known costs:** Specifically identified\n**Likely costs:** Projection from sample\n\n**Can be:**\n• Unallowable costs\n• Undocumented costs\n• Costs outside eligibility\n\n**Questioned ≠ Disallowed** (final determination by feds)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Threshold: $750,000 in federal awards",
            "SEFA: Schedule of Expenditures of Federal Awards required",
            "Major programs: Risk-based selection, coverage thresholds",
            "12 compliance requirements to test",
            "Report questioned costs > $25,000 (known + likely)",
            "Report internal control deficiencies for major programs",
            "Submit Data Collection Form (SF-SAC) to clearinghouse"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-014',
    section: 'AUD',
    title: "Engagement Quality Review",
    description: "Understand EQR requirements and the reviewer's responsibilities",
    order: 59,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Quality Control", "Engagement Quality", "Standards"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Engagement Quality Review (EQR) is a critical quality control mechanism! Understanding when EQR is required and what the reviewer does helps ensure audit quality. This is an important AUD topic!"
        },
        {
          title: 'When EQR Is Required',
          type: 'text',
          content: "**PCAOB (public companies):**\n• All audits and interim reviews\n• Required by standards\n\n**AICPA (nonissuers):**\n• Based on firm's quality management policies\n• High-risk engagements\n• May be required by regulators\n\n**Consider risk, complexity, public interest**"
        },
        {
          title: 'EQR Reviewer Requirements',
          type: 'table',
          headers: ['Requirement', 'Description', 'Why'],
          rows: [
            ['Competence', 'Technical knowledge', 'Quality review'],
            ['Objectivity', 'Not part of team', 'Fresh perspective'],
            ['Authority', 'Can challenge team', 'Effective review'],
            ['Cooling-off', 'Wait period after team', 'Independence']
          ]
        },
        {
          title: '🧠 Memory Aid: EQR Duties',
          type: 'callout',
          content: "**\"Review, Not Redo\"**\n\n**EQR reviewer does:**\n• Reviews significant judgments\n• Evaluates conclusions\n• Reads financial statements\n• Discusses with engagement partner\n\n**EQR reviewer does NOT:**\n• Re-perform all procedures\n• Replace team's judgment\n• Make final decisions"
        },
        {
          title: 'Areas of Focus',
          type: 'text',
          content: "**EQR reviewer evaluates:**\n\n• Independence\n• Significant risks identified\n• Significant judgments made\n• Consultations on difficult matters\n• Significant deficiencies/material weaknesses\n• Uncorrected misstatements\n• Documentation appropriateness\n• Draft auditor's report\n\n**Focus on SIGNIFICANT matters**"
        },
        {
          title: 'Documentation and Approval',
          type: 'text',
          content: "**EQR completion:**\n\n• Document procedures performed\n• Document conclusions\n• Resolve disagreements before report\n\n**Report release:**\n• Cannot release until EQR complete\n• EQR reviewer provides concurring approval\n\n**No backdating EQR completion!**"
        },
        {
          title: '⚠️ Exam Trap: Disagreements',
          type: 'warning',
          content: "**When EQR and team disagree:**\n\n• Consultation process\n• May involve firm leadership\n• Must resolve before report release\n\n**EQR does not have veto power, but:**\n• Firm must address concerns\n• Cannot release with unresolved disputes\n\n**Document the resolution!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "EQR required for public company audits (PCAOB)",
            "Nonissuers: Based on firm policy and risk",
            "Reviewer: Competent, objective, not on team",
            "Focus on significant judgments and risks",
            "Cannot release report until EQR complete",
            "Resolve disagreements through consultation",
            "Document EQR procedures and conclusions"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-015',
    section: 'AUD',
    title: "Communications with Those Charged with Governance",
    description: "Master required and other communications with audit committees",
    order: 60,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Audit Communications", "Governance", "Standards"],
    blueprintArea: 'AUD-II',
    blueprintTopic: 'AUD-II-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Effective communication with those charged with governance is essential! Understanding what must be communicated, when, and how helps maintain strong relationships and quality audits. Key AUD knowledge!"
        },
        {
          title: 'Who Are \"Those Charged with Governance\"?',
          type: 'text',
          content: "**TCWG = Oversight responsibility for financial reporting:**\n\n• Audit committee (typical for public)\n• Board of directors\n• Owner-manager (small entities)\n• Supervisory board\n\n**May include subsets like audit committee**\n\n**Identify appropriate person(s) for communication**"
        },
        {
          title: 'Required Communications',
          type: 'table',
          headers: ['Topic', 'When', 'How'],
          rows: [
            ['Auditor responsibilities', 'Planning', 'Written'],
            ['Planned scope and timing', 'Planning', 'Oral/Written'],
            ['Significant findings', 'Before report', 'Written (if significant)'],
            ['Independence', 'Annually', 'Written (issuers)'],
            ['Material weaknesses', 'Timely', 'Written'],
            ['Significant deficiencies', 'Timely', 'Written']
          ]
        },
        {
          title: '🧠 Memory Aid: Planning Communications',
          type: 'callout',
          content: "**\"SMART Planning\"**\n\n**S**cope and timing\n**M**ateriality approach\n**A**udit strategy\n**R**isks identified\n**T**iming of procedures\n\n**Allows TCWG to provide input early!**"
        },
        {
          title: 'Significant Audit Findings',
          type: 'text',
          content: "**Communicate before report issuance:**\n\n• Significant accounting policies (initial selection, changes)\n• Significant estimates and judgments\n• Significant unusual transactions\n• Uncorrected misstatements\n• Material corrected misstatements\n• Difficulties encountered\n• Disagreements with management\n• Other matters requiring attention"
        },
        {
          title: 'Internal Control Communications',
          type: 'text',
          content: "**Material weaknesses and significant deficiencies:**\n\n• Communicate in writing\n• To TCWG and management\n• Within 60 days of report release\n\n**Content:**\n• Definition of deficiency type\n• Description of deficiency\n• Potential effects\n\n**No deficiencies noted = Not required to communicate that**"
        },
        {
          title: '⚠️ Exam Trap: Form of Communication',
          type: 'warning',
          content: "**Written vs oral:**\n\n**Must be WRITTEN:**\n• Material weaknesses\n• Significant deficiencies\n• Independence (issuers)\n• Fraud involving management\n• Significant findings (if requested)\n\n**May be oral:**\n• Planned scope and timing\n• Other less significant matters\n\n**If oral, document in workpapers!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "TCWG: Those with financial reporting oversight",
            "Plan communications: Scope, timing, risks, materiality",
            "Findings before report: Policies, estimates, difficulties",
            "Written for: Material weaknesses, significant deficiencies",
            "60 days: Deadline for internal control communications",
            "Independence communication: Annual for issuers",
            "Two-way communication: Allow TCWG input"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-016',
    section: 'AUD',
    title: "Related Party Transactions",
    description: "Understand audit procedures for related party relationships and transactions",
    order: 61,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Audit Procedures", "Related Parties", "Risk"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Related party transactions can be used to manipulate financial statements! Understanding how to identify, audit, and evaluate these transactions is critical. Related parties are a significant fraud risk indicator!"
        },
        {
          title: 'What Are Related Parties?',
          type: 'text',
          content: "**Related parties include:**\n\n• Parent and subsidiaries\n• Entities under common control\n• Investors with significant influence\n• Management and close family\n• Principal owners (>10%)\n• Employee benefit plans\n\n**Arm's length presumption may NOT apply!**"
        },
        {
          title: 'Audit Procedures',
          type: 'table',
          headers: ['Procedure', 'Purpose', 'Timing'],
          rows: [
            ['Inquire of management', 'Identify related parties', 'Planning'],
            ['Review board minutes', 'Identify transactions', 'Throughout'],
            ['Confirm with related parties', 'Verify terms', 'Substantive'],
            ['Examine contracts/agreements', 'Understand terms', 'Substantive'],
            ['Review SEC filings', 'Identify relationships', 'Planning/Final']
          ]
        },
        {
          title: '🧠 Memory Aid: Related Party Red Flags',
          type: 'callout',
          content: "**\"UNUSUAL\"** transactions:\n\n**U**nusual terms (no interest, forgiven debt)\n**N**o business rationale\n**U**ndisclosed until late in audit\n**S**ubstance over form issues\n**U**nverified pricing\n**A**bnormal volume year-end\n**L**ack of documentation"
        },
        {
          title: 'Risk Assessment',
          type: 'text',
          content: "**Related parties increase risk because:**\n\n• May not be at arm's length\n• May obscure substance\n• Inherent limitations in confirming\n• Management may have incentive to hide\n\n**Consider:**\n• Nature and extent of transactions\n• Business purpose\n• Whether TCWG approved\n• Whether properly disclosed"
        },
        {
          title: 'Disclosure Requirements',
          type: 'text',
          content: "**GAAP requires disclosure of:**\n\n• Nature of relationship\n• Transaction descriptions\n• Dollar amounts\n• Amounts due to/from\n• Terms and manner of settlement\n\n**Cannot state \"at arm's length\" unless verified!**\n\n**Auditor: Evaluate completeness and adequacy**"
        },
        {
          title: '⚠️ Exam Trap: Significant Transactions Outside Normal',
          type: 'warning',
          content: "**Extra scrutiny for:**\n\n• Transactions outside normal course\n• Significant transactions with related parties\n\n**Understand:**\n• Business rationale\n• Terms of transaction\n• Authorization\n\n**If no business rationale:**\n• Consider fraud risk\n• Potential omitted liability or asset"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Related parties: Parent, subs, management, significant owners",
            "Arm's length presumption may not apply",
            "Procedures: Inquire, review minutes, confirm, examine",
            "Red flags: Unusual terms, no rationale, undisclosed",
            "Cannot represent arm's length unless verified",
            "Consider fraud risk for significant transactions",
            "Evaluate disclosure completeness and adequacy"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-017',
    section: 'AUD',
    title: "Using the Work of a Specialist",
    description: "Understand when and how auditors use specialists",
    order: 62,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Audit Procedures", "Specialists", "Evidence"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Auditors can't be experts in everything! Understanding when to use specialists, how to evaluate their work, and reporting implications is essential. Common areas: valuations, actuarial, IT, legal!"
        },
        {
          title: 'Types of Specialists',
          type: 'text',
          content: "**Auditor's specialist:**\n• Engaged by auditor\n• Works for auditor\n• Part of audit team (firm employee) or external\n\n**Management's specialist:**\n• Engaged by management\n• Prepares estimates for client\n• Work is evidence, not assistance\n\n**Different evaluation requirements!**"
        },
        {
          title: 'Common Specialist Areas',
          type: 'table',
          headers: ['Area', 'Specialist Type', 'Example'],
          rows: [
            ['Valuations', 'Appraiser', 'Fair value of assets'],
            ['Actuarial', 'Actuary', 'Pension liabilities'],
            ['Legal', 'Attorney', 'Litigation outcomes'],
            ['IT', 'IT specialist', 'System controls'],
            ['Environmental', 'Engineer', 'Remediation costs'],
            ['Taxes', 'Tax expert', 'Complex positions']
          ]
        },
        {
          title: '🧠 Memory Aid: Evaluating Specialists',
          type: 'callout',
          content: "**\"CAR Check\"**\n\n**C**ompetence - Qualifications and credentials\n**A**ssumptions - Are they reasonable?\n**R**elevance - Does work address the assertion?\n\n**Plus: Objectivity (especially auditor's specialist)**"
        },
        {
          title: 'Using Auditor\'s Specialist',
          type: 'text',
          content: "**Auditor responsibilities:**\n\n• Evaluate competence and objectivity\n• Reach understanding on scope/objectives\n• Evaluate appropriateness of work\n• Evaluate consistency with other evidence\n\n**Auditor takes responsibility for conclusion**\n\n**Cannot outsource judgment!**"
        },
        {
          title: 'Evaluating Management\'s Specialist',
          type: 'text',
          content: "**Treat work as EVIDENCE:**\n\n• Evaluate competence and objectivity\n• Obtain understanding of specialist's work\n• Evaluate appropriateness as evidence\n• Consider source data used\n• Assess reasonableness of assumptions\n\n**Management's specialist work ≠ Auditor's work!**"
        },
        {
          title: '⚠️ Exam Trap: Report Reference',
          type: 'warning',
          content: "**Do NOT refer to specialist in standard unmodified report:**\n\n• Auditor takes full responsibility\n• Reference might be misunderstood as shared responsibility\n• Exception: Modified opinion where relevant\n\n**Engagement letter may reference specialists**\n**Workpapers should document use**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Auditor's specialist: Engaged by auditor, part of team",
            "Management's specialist: Engaged by client, work is evidence",
            "Evaluate: Competence, objectivity, assumptions, relevance",
            "Auditor responsible for conclusions using specialist work",
            "Cannot simply accept specialist conclusions",
            "No report reference to specialist (usually)",
            "Document understanding, scope, and evaluation"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-018',
    section: 'AUD',
    title: "Group Audits (Component Auditors)",
    description: "Understand using the work of component auditors",
    order: 63,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Group Audits", "Component Auditors", "Consolidation"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-D-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Large entities often have subsidiaries audited by other firms! Understanding group audit requirements, supervision, and reporting is essential. The group auditor remains responsible for the group opinion!"
        },
        {
          title: 'Key Terms',
          type: 'text',
          content: "**Group engagement team:**\n• Partners and staff of group auditor\n• Responsible for group audit\n\n**Component auditor:**\n• Audits component (subsidiary, division)\n• May be same firm or different firm\n\n**Component:**\n• Entity or business unit with separate financial info"
        },
        {
          title: 'Component Materiality',
          type: 'table',
          headers: ['Component Type', 'Significance', 'Procedures'],
          rows: [
            ['Significant - Financial', 'Large relative to group', 'Full audit'],
            ['Significant - Risk', 'High risk areas', 'Targeted procedures'],
            ['Not significant', 'Small and low risk', 'Analytics or none'],
            ['Aggregation risk', 'Combined not significant', 'Consider collectively']
          ]
        },
        {
          title: '🧠 Memory Aid: Group Auditor Duties',
          type: 'callout',
          content: "**\"SUPA\" responsibilities:**\n\n**S**cope determination\n**U**nderstanding component auditors\n**P**articipation in risk assessment\n**A**ssessment of component work\n\n**Cannot just accept component work blindly!**"
        },
        {
          title: 'Understanding Component Auditors',
          type: 'text',
          content: "**Evaluate:**\n\n• Independence (meets requirements?)\n• Professional competence\n• Whether group team can be involved\n• Regulatory environment\n• Quality control processes\n\n**If concerns:**\n• Perform work directly\n• Or don't use component auditor's work"
        },
        {
          title: 'Communication Requirements',
          type: 'text',
          content: "**Group auditor communicates to component:**\n\n• Work to be performed\n• Form of reports/conclusions needed\n• Materiality levels\n• Identified risks\n• Related party list\n• Findings requiring communication\n\n**Component communicates to group:**\n• Whether work completed as instructed\n• Significant findings\n• Overall conclusions"
        },
        {
          title: '⚠️ Exam Trap: Report Reference',
          type: 'warning',
          content: "**Reference to component auditor in report:**\n\n**Old approach (still acceptable):**\n• Divided responsibility - reference to other auditor\n• Indicates portion audited by other auditor\n\n**Modern approach:**\n• No reference if group auditor takes full responsibility\n• Requires sufficient involvement\n\n**Cannot assume responsibility without sufficient involvement!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Group auditor responsible for group audit opinion",
            "Component auditors audit subsidiaries/divisions",
            "Evaluate component auditor competence and independence",
            "Significant components: Full audit required",
            "Communicate scope, materiality, risks to components",
            "Review component work and conclusions",
            "May reference or assume responsibility (choice)"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-019',
    section: 'AUD',
    title: "Auditing Estimates",
    description: "Master audit procedures for accounting estimates",
    order: 64,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Audit Procedures", "Estimates", "Risk"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Estimates are everywhere in financial statements! From bad debts to fair values to useful lives, auditing estimates requires judgment about judgment. High estimation uncertainty = Higher inherent risk!"
        },
        {
          title: 'Examples of Estimates',
          type: 'table',
          headers: ['Account', 'Estimate', 'Key Inputs'],
          rows: [
            ['Allowance for doubtful accounts', 'Expected credit losses', 'Historical data, economy'],
            ['Warranty liability', 'Future claims', 'Claim rates, costs'],
            ['Fair value of assets', 'Exit price', 'Models, assumptions'],
            ['Useful life', 'Service period', 'Technology, usage'],
            ['Contingent liabilities', 'Probable amount', 'Legal assessment'],
            ['Pension liability', 'PBO', 'Discount rate, returns']
          ]
        },
        {
          title: '🧠 Memory Aid: Estimation Risk Factors',
          type: 'callout',
          content: "**\"SCUM\"** increases estimation risk:\n\n**S**ubjectivity of inputs\n**C**omplexity of model/method\n**U**ncertainty in assumptions\n**M**anagement bias potential\n\n**More SCUM = More work needed!**"
        },
        {
          title: 'Audit Approaches',
          type: 'text',
          content: "**Three approaches:**\n\n1. **Test management's process**\n   • Evaluate reasonableness of assumptions\n   • Test data used\n   • Evaluate model/methodology\n\n2. **Develop independent expectation**\n   • Use different model or assumptions\n   • Compare to management's estimate\n\n3. **Review subsequent events**\n   • Actual results vs estimate\n   • Provides evidence of reasonableness"
        },
        {
          title: 'Evaluating Reasonableness',
          type: 'text',
          content: "**For assumptions, consider:**\n\n• Consistency with industry/economic conditions\n• Historical accuracy of prior estimates\n• Support for significant assumptions\n• Sensitivity to changes\n• Whether within reasonable range\n\n**Estimates often have a RANGE of reasonable values**"
        },
        {
          title: 'Management Bias',
          type: 'text',
          content: "**Indicators of bias:**\n\n• Consistently favorable assumptions\n• Point estimates at aggressive end of range\n• Selective use of data\n• Changes in assumptions without rationale\n• Undue influence on specialists\n\n**Evaluate:**\n• Prior period estimate accuracy\n• Whether assumptions appropriate vs biased"
        },
        {
          title: '⚠️ Exam Trap: Point Estimate vs Range',
          type: 'warning',
          content: "**When auditor's range differs:**\n\n• If management estimate within range → Acceptable\n• If outside range → Potential misstatement\n\n**Narrow the range:**\n• More evidence reduces uncertainty\n• Tighter range increases precision\n\n**Wide range = Consider qualitative factors**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Estimates pervasive in financial statements",
            "Higher uncertainty = Higher inherent risk",
            "Approaches: Test process, independent estimate, subsequent events",
            "Evaluate assumptions: Support, consistency, reasonableness",
            "Watch for management bias: One-sided, aggressive",
            "Reasonable range: Management within range is acceptable",
            "Consider specialist use for complex estimates"
          ]
        }
      ]
    }
  },
  {
    id: 'AUD-IV-020',
    section: 'AUD',
    title: "Subsequent Events and Subsequently Discovered Facts",
    description: "Understand audit procedures for events after period end",
    order: 65,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Subsequent Events", "Audit Procedures", "Dating"],
    blueprintArea: 'AUD-III',
    blueprintTopic: 'AUD-III-E-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Events after year-end can significantly impact financial statements! Understanding the two types, required procedures, and report dating implications is essential. This is heavily tested on AUD!"
        },
        {
          title: 'Two Types of Subsequent Events',
          type: 'table',
          headers: ['Type', 'Description', 'F/S Treatment'],
          rows: [
            ['Type I (Recognized)', 'Conditions existed at balance sheet date', 'Adjust F/S'],
            ['Type II (Non-recognized)', 'Conditions arose after balance sheet date', 'Disclose only']
          ]
        },
        {
          title: '🧠 Memory Aid: Type I vs Type II',
          type: 'callout',
          content: "**\"Existed vs Emerged\"**\n\n**Type I:** Condition **EXISTED** at year-end\n→ Provides additional evidence\n→ ADJUST financial statements\n\n**Type II:** Condition **EMERGED** after year-end\n→ New information only\n→ DISCLOSE but don't adjust\n\n**Example:** Lawsuit filed in January for December incident = Type I"
        },
        {
          title: 'Audit Procedures',
          type: 'text',
          content: "**Perform through report date:**\n\n• Read minutes of board/shareholders\n• Review latest available interim F/S\n• Inquire of management about:\n  - New commitments/borrowings\n  - Sales of assets\n  - Unusual adjustments\n  - Subsequent events\n• Obtain written representations\n• Legal counsel inquiry (update)"
        },
        {
          title: 'Subsequent Events Timeline',
          type: 'text',
          content: "**Key dates:**\n\n• **Balance sheet date** → Period end\n• **Fieldwork completion** → Procedures done\n• **Report date** → Date auditor signs report\n• **Report release** → Provided to client\n• **F/S issuance** → Made available publicly\n\n**Active duty: Through REPORT DATE**\n**Passive duty: Through ISSUANCE**"
        },
        {
          title: 'Subsequently Discovered Facts',
          type: 'text',
          content: "**After report date but before issuance:**\n• Perform additional procedures\n• Consider F/S revision if material\n• May delay report\n\n**After F/S issued:**\n• No obligation to seek out information\n• BUT if becomes aware of material facts:\n  - Discuss with management\n  - Consider if F/S need revision\n  - May need to notify users"
        },
        {
          title: '⚠️ Exam Trap: Dual Dating',
          type: 'warning',
          content: "**When subsequent event after original report date:**\n\n**Option 1: Dual date**\n• Original date, \"except for Note X which is as of [later date]\"\n• Responsibility limited to specific matter\n\n**Option 2: Update date**\n• Use new date for entire report\n• Responsibility extends to new date\n\n**Dual dating = More common, less exposure**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Type I: Existed at B/S date → Adjust F/S",
            "Type II: Arose after B/S date → Disclose only",
            "Active procedures through report date",
            "Subsequent events procedures: Minutes, inquiries, interim F/S",
            "After issuance: No duty to search, but respond if aware",
            "Dual dating limits responsibility to specific matter",
            "Going concern events considered separately"
          ]
        }
      ]
    }
  }
];
