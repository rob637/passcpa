/**
 * CFP Domain 7: Estate Planning
 * Advanced Estate Lessons
 * 
 * These lessons cover digital assets, trust administration, international estates,
 * and post-mortem planning strategies.
 */

import type { Lesson } from '../../../types';

export const CFP_EST4_LESSONS: Lesson[] = [
  {
    id: 'CFP-EST-L013',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Digital Assets and Estate Planning',
    description: 'Identify types of digital assets requiring estate planning, apply RUFADAA rules, create strategies for digital asset transfer and access.',
    order: 13,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Types of digital assets',
      'RUFADAA legal framework',
      'Digital asset transfer strategies',
      'Fiduciary documentation'
    ],
    blueprintArea: 'EST-1',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Digital assets are increasingly valuable parts of estates. Understanding how to plan for them is essential for modern estate planning. From cryptocurrency to social media accounts, digital assets present unique challenges.'
        },
        {
          title: 'Types of Digital Assets',
          type: 'table',
          headers: ['Category', 'Examples'],
          rows: [
            ['Financial', 'Cryptocurrency, online banking, payment apps (Venmo, PayPal)'],
            ['Business', 'Websites, domains, online stores, digital intellectual property'],
            ['Personal media', 'Photos, videos, music, e-books'],
            ['Social', 'Email, social media accounts, blogs'],
            ['Subscriptions', 'Streaming services, cloud storage, software'],
            ['Gaming', 'Game accounts, in-game purchases, virtual items']
          ]
        },
        {
          title: 'Digital vs. Traditional Assets',
          type: 'table',
          headers: ['Issue', 'Traditional Assets', 'Digital Assets'],
          rows: [
            ['Access', 'Physical possession', 'Password/authentication required'],
            ['Title', 'Clear ownership', 'May be licensed, not owned'],
            ['Valuation', 'Usually determinable', 'May be volatile or unclear'],
            ['Discovery', 'Tangible evidence', 'May be unknown to family']
          ]
        },
        {
          title: 'RUFADAA Legal Framework',
          type: 'text',
          content: 'The Revised Uniform Fiduciary Access to Digital Assets Act grants fiduciaries access to decedents\' digital accounts. Most states have adopted it with variations.\n\nKey principle: Terms-of-service controls, unless user directs otherwise.'
        },
        {
          title: 'Hierarchy of Authority',
          type: 'callout',
          content: '1. User\'s online tool (platform-specific settings)\n2. User\'s estate plan (will, trust, power of attorney)\n3. Terms of service (default if no instructions)'
        },
        {
          title: 'Platform Legacy Tools',
          type: 'table',
          headers: ['Platform', 'Tool Available'],
          rows: [
            ['Google', 'Inactive Account Manager'],
            ['Facebook', 'Legacy Contact or memorialization'],
            ['Apple', 'Digital Legacy contacts (iOS 15+)'],
            ['Most platforms', 'Nothing built-in; rely on estate documents']
          ]
        },
        {
          title: 'Cryptocurrency Challenges',
          type: 'table',
          headers: ['Challenge', 'Issue'],
          rows: [
            ['Private keys', 'If lost, assets are permanently inaccessible'],
            ['No intermediary', 'No customer service to call'],
            ['Volatility', 'Value can change dramatically'],
            ['Security vs. accessibility', 'Trade-off between protection and fiduciary access']
          ]
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'The PRIMARY risk with cryptocurrency in estates is loss of private keys making assets inaccessible. Without private keys or seed phrases, cryptocurrency cannot be accessed and is effectively lost forever.'
        },
        {
          title: 'Cryptocurrency Planning Strategies',
          type: 'list',
          items: [
            'Hardware wallet with documented seed phrase: Secure, but phrase must be accessible',
            'Multi-signature wallet: Multiple parties needed to access',
            'Custodial solutions: Third-party holds keys (Coinbase, etc.)',
            'Digital asset trust: Specialized trust with crypto provisions'
          ]
        },
        {
          title: 'Creating a Digital Estate Plan',
          type: 'text',
          content: 'Step 1: Inventory Digital Assets\nDocument account names, URLs, usernames, access methods, and estimated values.\n\nStep 2: Update Estate Documents\nInclude digital asset provisions in will, trust, power of attorney, and separate memorandum (updated regularly).\n\nStep 3: Set Up Platform Tools\nConfigure each platform\'s legacy settings when available.\n\nStep 4: Secure Access Information\nOptions: Password manager with shared vault; letter to executor with passwords; digital asset vault service; split knowledge (attorney + family).'
        },
        {
          title: 'Sample Will Language',
          type: 'callout',
          content: '"I authorize my Executor to access, manage, distribute, and delete any of my digital assets, accounts, and electronically stored information, including but not limited to email accounts, social media, cryptocurrency, and cloud storage, to the extent permitted by law and applicable terms of service."'
        },
        {
          title: 'Email and Social Media Policies',
          type: 'table',
          headers: ['Platform', 'Policy/Options'],
          rows: [
            ['Gmail', 'Inactive Account Manager; may provide data with court order'],
            ['Outlook/Microsoft', 'Next-of-kin process with documentation'],
            ['Facebook', 'Memorialize or delete; Legacy Contact manages'],
            ['Instagram', 'Memorialize or remove'],
            ['LinkedIn', 'Remove profile with death certificate']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Inventory digital assets regularly and keep list updated',
            'Use platform tools to designate legacy contacts',
            'Include digital asset provisions in will, trust, and POA',
            'Document cryptocurrency access securely but accessibly',
            'Store access information where fiduciaries can find it'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L014',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Trust Administration and Fiduciary Duties',
    description: 'Explain fiduciary duties of trustees and executors, apply prudent investor rules, manage trust distributions and documentation.',
    order: 14,
    duration: 55,
    difficulty: 'advanced',
    topics: [
      'Fiduciary duties',
      'Prudent investor rules',
      'Trust distributions',
      'Administration mistakes'
    ],
    blueprintArea: 'EST-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Serving as a trustee or executor carries significant legal responsibilities. Understanding fiduciary duties and administration requirements is essential for CFP professionals advising clients who serve in these roles.'
        },
        {
          title: 'What Is a Fiduciary?',
          type: 'callout',
          content: 'A person obligated to act in the best interest of another. This creates a heightened standard of care and loyalty.'
        },
        {
          title: 'Key Fiduciary Duties',
          type: 'table',
          headers: ['Duty', 'Description'],
          rows: [
            ['Duty of Loyalty', 'Act solely in beneficiaries\' interests'],
            ['Duty of Impartiality', 'Balance interests of current and remainder beneficiaries'],
            ['Duty of Prudence', 'Invest and manage with care, skill, and caution'],
            ['Duty to Inform', 'Keep beneficiaries reasonably informed'],
            ['Duty to Account', 'Provide regular accountings of trust activity'],
            ['Duty to Administer', 'Carry out trust terms and applicable law']
          ]
        },
        {
          title: 'Consequences of Breach',
          type: 'table',
          headers: ['Consequence', 'Example'],
          rows: [
            ['Surcharge', 'Personal liability for losses caused'],
            ['Removal', 'Court removes trustee'],
            ['Denial of fees', 'Compensation forfeited'],
            ['Criminal liability', 'In cases of theft or fraud']
          ]
        },
        {
          title: 'The Prudent Investor Rule',
          type: 'text',
          content: 'Modern Portfolio Theory Standard:\n• Diversification required unless imprudent under circumstances\n• Risk/return balance considering portfolio as a whole\n• Delegation permitted to investment advisors\n• Consider all circumstances: beneficiary needs, time horizon, tax impact'
        },
        {
          title: 'Old vs. Modern Investment Standards',
          type: 'table',
          headers: ['Old Standard', 'Modern Standard'],
          rows: [
            ['Avoid speculation', 'Total portfolio risk considered'],
            ['Each investment must be safe', 'Diversification is key'],
            ['Limited delegation', 'Delegation with prudent selection']
          ]
        },
        {
          title: 'Investment Policy Statement Components',
          type: 'list',
          items: [
            'Objectives: Income needs, growth, liquidity',
            'Time horizon: Trust duration, beneficiary ages',
            'Risk tolerance: Based on beneficiary circumstances',
            'Asset allocation: Target percentages by asset class',
            'Rebalancing: When and how to adjust'
          ]
        },
        {
          title: 'Principal vs. Income Allocation',
          type: 'table',
          headers: ['Item', 'Allocated To'],
          rows: [
            ['Dividends', 'Income'],
            ['Interest', 'Income'],
            ['Rent', 'Income'],
            ['Capital gains', 'Principal'],
            ['Trustee fees', 'Often split or all principal'],
            ['Taxes on income', 'Income'],
            ['Taxes on principal', 'Principal']
          ]
        },
        {
          title: 'Trust Distribution Standards',
          type: 'table',
          headers: ['Standard', 'Trustee Discretion'],
          rows: [
            ['Mandatory', '"Shall distribute all income" — No discretion'],
            ['Discretionary', '"May distribute" — Full discretion'],
            ['HEMS', 'Health, Education, Maintenance, Support — Guided discretion'],
            ['Ascertainable', 'Clear standard limiting discretion']
          ]
        },
        {
          title: 'HEMS Standard',
          type: 'callout',
          content: 'Health, Education, Maintenance, Support. The HEMS standard makes distributions excludable from beneficiary\'s taxable estate. It provides guided discretion for trustees.'
        },
        {
          title: 'Documentation of Distributions',
          type: 'list',
          items: [
            'Distribution request: Beneficiary asks in writing',
            'Trustee analysis: How request fits trust terms',
            'Distribution memo: Decision and rationale',
            'Beneficiary acknowledgment: Receipt of funds'
          ]
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'Common Trust Administration Mistakes:\n• Investment errors: Failing to diversify, keeping unsuitable inherited assets, self-dealing\n• Administrative errors: Missing tax filings, co-mingling funds, unauthorized distributions\n• Beneficiary relations: Favoritism, ignoring communications, failure to provide accountings'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Fiduciary duties include loyalty, prudence, impartiality, and accounting',
            'Prudent investor rule focuses on total portfolio, permits delegation',
            'Principal vs. income allocation affects different beneficiaries',
            'HEMS standard provides guided discretion for distributions',
            'Documentation is essential protection against liability'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L015',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'International and Cross-Border Estate Planning',
    description: 'Identify issues with U.S. citizens and foreign assets, apply rules for non-citizen spouses, and analyze foreign trust reporting requirements.',
    order: 15,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'U.S. citizens with foreign assets',
      'Non-citizen spouse rules',
      'Foreign trust reporting',
      'Estate tax treaties'
    ],
    blueprintArea: 'EST-3',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Global mobility creates complex estate planning challenges. Understanding cross-border issues helps advisors serve clients with international connections.'
        },
        {
          title: 'Who Is Affected?',
          type: 'table',
          headers: ['Situation', 'Issues'],
          rows: [
            ['U.S. citizen with foreign assets', 'FBAR, foreign probate, taxation'],
            ['U.S. resident alien', 'Same as citizen (worldwide estate taxation)'],
            ['Non-resident alien with U.S. assets', 'Limited U.S. estate tax exemption'],
            ['U.S. citizen married to non-citizen', 'Reduced marital deduction'],
            ['U.S. person inheriting from foreigner', 'Gift/inheritance reporting']
          ]
        },
        {
          title: 'Non-Citizen Spouse Problem',
          type: 'warning',
          content: 'Unlimited marital deduction requires spouse to be a U.S. citizen. Non-citizen spouses are limited to the enhanced annual exclusion (~$190,000/year for gifts).'
        },
        {
          title: 'QDOT Requirements',
          type: 'table',
          headers: ['Feature', 'Requirement'],
          rows: [
            ['At least one U.S. trustee', 'Required for all QDOTs'],
            ['For trusts over $2M', 'U.S. bank as trustee, or post bond'],
            ['Estate tax', 'Deferred until distributions to surviving spouse'],
            ['On death of survivor', 'Remaining assets taxed in survivor\'s estate']
          ]
        },
        {
          title: 'QDOT Mechanics',
          type: 'text',
          content: '1. Assets pass to QDOT at first spouse\'s death\n2. Marital deduction allowed\n3. Principal distributions trigger estate tax (as if first spouse\'s estate)\n4. Income can be distributed without estate tax\n5. Upon survivor\'s death, remaining principal taxed'
        },
        {
          title: 'Non-Resident Aliens (NRAs)',
          type: 'table',
          headers: ['Factor', 'NRA Rule'],
          rows: [
            ['What\'s taxable', 'Only U.S.-situs property'],
            ['Exemption', 'Only ~$60,000 (vs. $7M+ for citizens/residents)'],
            ['Tax rates', 'Same as U.S. persons (up to 40%)']
          ]
        },
        {
          title: 'U.S.-Situs Assets',
          type: 'table',
          headers: ['U.S.-Situs (Taxable)', 'Non-U.S.-Situs (Not Taxable)'],
          rows: [
            ['U.S. real estate', 'Bank deposits (portfolio interest)'],
            ['U.S. tangible personal property', 'Life insurance proceeds'],
            ['U.S. corporate stock', 'Debt obligations (portfolio)'],
            ['U.S. partnership interests', 'Stock in foreign corporations']
          ]
        },
        {
          title: 'NRA Planning Strategies',
          type: 'list',
          items: [
            'Treaty benefits: Some increase exemption (e.g., Germany)',
            'Holding structures: Foreign corporation owning U.S. real estate',
            'Life insurance: Proceeds are not U.S.-situs',
            'Joint ownership: Different rules for non-citizens'
          ]
        },
        {
          title: 'Foreign Trust Definition',
          type: 'text',
          content: 'A foreign trust is one that:\n• Has no U.S. trustee, or\n• Is not under U.S. court supervision'
        },
        {
          title: 'Foreign Trust Reporting Requirements',
          type: 'table',
          headers: ['Form', 'Who Files', 'What It Reports'],
          rows: [
            ['Form 3520', 'U.S. beneficiary or grantor', 'Transactions with foreign trusts'],
            ['Form 3520-A', 'Foreign trust with U.S. owner', 'Annual information return'],
            ['FBAR (FinCEN 114)', 'Any U.S. person', 'Foreign accounts over $10,000'],
            ['Form 8938', 'U.S. persons over threshold', 'Foreign financial assets (FATCA)']
          ]
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'Severe Penalties for Non-Compliance:\n• Failure to file Form 3520: 35% of gross value of property\n• Failure to file FBAR: Up to $100,000+ or 50% of account\n\nThrowback rules may apply interest charges on deferred tax for accumulated income distributions.'
        },
        {
          title: 'Multiple Probates',
          type: 'text',
          content: 'Each country where real estate is located usually requires probate. Strategies to avoid foreign probate:\n• Revocable trust (may work in some jurisdictions)\n• Joint ownership (depends on local law)\n• Beneficiary designations (life insurance, retirement accounts)\n• Local counsel is essential for proper planning'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Non-citizen spouses need QDOT for marital deduction',
            'Non-resident aliens face limited exemption on U.S. assets (~$60K)',
            'Foreign trusts trigger significant reporting requirements',
            'Estate tax treaties may provide relief (check country-specific)',
            'Multi-jurisdiction estates require coordination with local counsel'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L016',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Post-Mortem Estate Planning',
    description: 'Apply disclaimer strategies for tax optimization, evaluate post-mortem elections and choices, and analyze estate income tax planning.',
    order: 16,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Disclaimer strategies',
      'Post-mortem elections',
      'Estate income tax planning',
      'Settlement timeline'
    ],
    blueprintArea: 'EST-2',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Estate planning doesn\'t end at death. Post-mortem decisions can significantly affect family wealth. Understanding these strategies helps optimize outcomes after a client passes.'
        },
        {
          title: 'What Is a Disclaimer?',
          type: 'callout',
          content: 'An irrevocable, unqualified refusal to accept property. Disclaimers allow flexibility in estate distribution even after death.'
        },
        {
          title: 'Qualified Disclaimer Requirements',
          type: 'table',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['In writing', 'Written refusal required'],
            ['Timely', 'Within 9 months of death or transfer'],
            ['No benefit received', 'Cannot accept benefits before disclaiming'],
            ['Property passes without direction', 'Disclaimant cannot control who receives']
          ]
        },
        {
          title: 'Why Disclaim?',
          type: 'table',
          headers: ['Reason', 'Example'],
          rows: [
            ['Estate tax savings', 'Push assets to bypass trust'],
            ['Creditor protection', 'Assets pass to protected beneficiary'],
            ['Medicaid planning', 'Assets pass away from Medicaid applicant'],
            ['Generation planning', 'Skip to grandchildren']
          ]
        },
        {
          title: 'Disclaimer Example',
          type: 'text',
          content: 'Scenario: Husband\'s will leaves "All to wife"; wife\'s estate is already taxable.\n\nWithout disclaimer: Combined estates taxable.\n\nWith disclaimer: Wife disclaims enough to use husband\'s exemption; disclaimed portion passes to trust for wife\'s benefit. Result: Tax savings through use of both exemptions.'
        },
        {
          title: 'Partial Disclaimers',
          type: 'callout',
          content: 'Partial disclaimers are allowed—disclaim a portion, accept the rest (if clearly severable). This provides flexibility in tax planning.'
        },
        {
          title: 'Estate Income Tax Planning',
          type: 'text',
          content: 'The estate as a taxpayer hits the top 37% bracket at only ~$15,200 (2026), making tax planning critical.\n\nDistributable Net Income (DNI): Income available for distribution. Estate deducts DNI distributed; beneficiary includes distributed DNI in their income.\n\nStrategy: Distribute income to lower-bracket beneficiaries. If estate keeps income: taxed at 37%. If estate distributes: taxed at beneficiary\'s (probably lower) rate.'
        },
        {
          title: '65-Day Election',
          type: 'callout',
          content: 'Distributions made within 65 days after year-end can be treated as made in prior tax year. Use case: Year 1 has high estate income; make distribution in January; elect to treat as Year 1 distribution; estate gets deduction in Year 1.'
        },
        {
          title: 'Key Executor Elections',
          type: 'table',
          headers: ['Election', 'Deadline', 'Impact'],
          rows: [
            ['Alternate valuation date', '6 months after death', 'May reduce estate value/tax'],
            ['Portability', 'File Form 706', 'Preserve deceased spouse\'s exemption'],
            ['QTIP election', 'Form 706', 'Marital deduction for trust assets'],
            ['Section 2032A', 'Form 706', 'Reduced value for farm/business real estate'],
            ['Installment payment (6166)', 'Form 706', '15-year estate tax payment']
          ]
        },
        {
          title: 'Alternate Valuation Date',
          type: 'text',
          content: 'When available: Only if reduces gross estate AND tax.\nValuation date: 6 months after death.\nIf sold within 6 months: Use sale date value.\n\nStepped basis reflects chosen valuation date.'
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'Portability Election: If you fail to file Form 706, deceased spouse\'s unused exemption is lost forever. You must file Form 706 even if no estate tax is due to preserve portability. May qualify for 2-year safe harbor if filed late.'
        },
        {
          title: 'Estate Settlement Timeline',
          type: 'table',
          headers: ['Deadline', 'Action'],
          rows: [
            ['Immediately', 'Secure assets, locate documents'],
            ['10-30 days', 'Notify beneficiaries, file will with court'],
            ['60-90 days', 'Open probate, get Letters Testamentary'],
            ['3-4 months', 'Publish notice to creditors'],
            ['9 months', 'File Form 706 (estate tax, if required)'],
            ['12-18 months', 'Close estate, final distributions']
          ]
        },
        {
          title: 'Fiduciary Returns',
          type: 'table',
          headers: ['Form', 'Due Date', 'Purpose'],
          rows: [
            ['Final 1040', 'April 15 of following year', 'Decedent\'s final income'],
            ['Form 1041', 'April 15 (calendar year) or 9/30', 'Estate/trust income tax'],
            ['Form 706', '9 months after death (can extend 6 months)', 'Estate tax return']
          ]
        },
        {
          title: 'Date of Death vs. Alternate Valuation',
          type: 'table',
          headers: ['Factor', 'Date of Death', 'Alternate (6 months)'],
          rows: [
            ['Use when', 'Assets appreciate', 'Assets depreciate'],
            ['Affects', 'Estate tax', 'Estate tax AND heir basis']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Disclaimers can optimize tax outcomes even after death',
            '65-day election allows income shifting to prior year',
            'Portability election preserves unused exemption—must file Form 706',
            'Alternate valuation available only if it reduces estate and tax',
            'Estate income tax rates are steep—distribute income when possible'
          ]
        }
      ]
    }
  }
];

export default CFP_EST4_LESSONS;
