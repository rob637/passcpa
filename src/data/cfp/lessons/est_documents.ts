/**
 * CFP Estate Planning Lessons - Estate Documents
 * Domain 7: Estate Planning (12% of exam)
 * Blueprint Area: EST-1 - Estate Planning Documents and Strategies
 * 
 * Topics: Wills, trusts, powers of attorney, healthcare directives
 */

import type { Lesson } from '../../../types';

export const CFP_EST1_LESSONS: Lesson[] = [
  {
    id: 'CFP-EST-L001',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Wills and Estate Settlement',
    description: 'Understand the elements of a valid will, types of wills, probate process and alternatives, and intestacy implications.',
    order: 1,
    duration: 35,
    difficulty: 'intermediate',
    topics: [
      'Elements of a valid will',
      'Types of wills',
      'Probate process and alternatives',
      'Intestacy implications'
    ],
    blueprintArea: 'EST-1',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Wills are the foundational estate planning document, specifying how a person\'s assets should be distributed after death. Understanding valid will requirements, the probate process, and what happens without a will is essential for CFP professionals.'
        },
        {
          title: 'Why This Matters',
          type: 'callout',
          content: 'Most clients have wills, but many are outdated or improperly executed. Knowing valid will requirements helps you identify potential estate planning gaps.'
        },
        {
          title: 'Elements of a Valid Will',
          type: 'table',
          headers: ['Element', 'Description'],
          rows: [
            ['Testamentary Capacity', 'Sound mind; understand nature of assets and heirs'],
            ['Testamentary Intent', 'Document intended to be final disposition'],
            ['Written Document', 'Most states require written will'],
            ['Signature', 'Testator must sign (or mark)'],
            ['Witnesses', 'Typically 2 disinterested witnesses']
          ]
        },
        {
          title: 'Types of Wills',
          type: 'text',
          content: 'Formal (Attested) Will: Typed, signed, witnessed—most legally sound.\n\nHolographic Will: Entirely in testator\'s handwriting; no witnesses required in some states; higher risk of challenge.\n\nNuncupative (Oral) Will: Spoken, usually on deathbed; very limited acceptance; usually only for personal property.\n\nPour-Over Will: Directs assets into existing trust; catches assets not in trust at death.'
        },
        {
          title: 'Key Will Provisions',
          type: 'list',
          items: [
            'Specific Bequests: "I give my 1965 Mustang to my son, Michael."',
            'General Bequests: "I give $50,000 to my daughter, Sarah."',
            'Residuary Clause: "All remaining assets go to my spouse, Jane."',
            'Simultaneous Death Clause: Addresses what happens if spouses die together',
            'Tax Apportionment Clause: Specifies how estate taxes are allocated'
          ]
        },
        {
          title: 'Probate Process Steps',
          type: 'text',
          content: '1. File will with probate court\n2. Appoint personal representative/executor\n3. Inventory and appraise assets\n4. Notify creditors (advertisement period)\n5. Pay debts and taxes\n6. Distribute remaining assets\n7. Close estate'
        },
        {
          title: 'Probate Advantages vs. Disadvantages',
          type: 'table',
          headers: ['Advantages', 'Disadvantages'],
          rows: [
            ['Court supervision', 'Time-consuming (6-18 months)'],
            ['Creditor deadline', 'Expensive (2-7% of estate)'],
            ['Clear title transfer', 'Public record'],
            ['Dispute resolution', 'Loss of control']
          ]
        },
        {
          title: 'Avoiding Probate',
          type: 'list',
          items: [
            'Revocable living trusts',
            'Joint tenancy with right of survivorship',
            'Beneficiary designations (IRAs, life insurance)',
            'TOD/POD accounts',
            'Gifts during lifetime'
          ]
        },
        {
          title: 'Intestacy',
          type: 'text',
          content: 'When no valid will exists, state laws determine distribution (varies by state). Typical intestate distribution: Surviving spouse receives portion (1/2 to all); children share remaining equally; if no spouse/children: parents, siblings, etc. Ultimate fallback: Escheat to state.'
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'Beneficiary designations supersede will provisions. If a client\'s IRA names an ex-spouse, the ex-spouse receives the IRA regardless of what the will says. This is a common exam trap and real-world planning mistake.'
        },
        {
          title: 'Mnemonic: WRITE',
          type: 'callout',
          content: 'Will Requirements: Written, Rational (capacity), Intent, Two witnesses, Executed (signed)'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Valid will requires capacity, intent, writing, signature, and witnesses',
            'Pour-over wills work with revocable trusts to catch missed assets',
            'Probate is public, time-consuming, and expensive',
            'Joint tenancy and beneficiary designations avoid probate',
            'Intestacy laws may not reflect your actual wishes'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L002',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Powers of Attorney and Healthcare Directives',
    description: 'Distinguish between types of powers of attorney, understand durable vs. non-durable powers, and explain healthcare proxy documents.',
    order: 2,
    duration: 30,
    difficulty: 'intermediate',
    topics: [
      'Types of powers of attorney',
      'Durable vs. non-durable powers',
      'Healthcare proxy documents',
      'Incapacity planning'
    ],
    blueprintArea: 'EST-1',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Powers of attorney are legal documents authorizing someone (agent/attorney-in-fact) to act on your behalf for financial or legal matters. These documents are critical for incapacity planning.'
        },
        {
          title: 'Why Durable POA is Essential',
          type: 'callout',
          content: 'Without a durable power of attorney, court guardianship may be needed. Guardianship is expensive, public, and restrictive. A durable POA avoids court involvement entirely.'
        },
        {
          title: 'Types of Powers of Attorney',
          type: 'text',
          content: 'General Power of Attorney: Broad authority over financial matters; ends at incapacity or death.\n\nLimited/Special Power of Attorney: Specific purpose or time period (e.g., real estate closing).\n\nDurable Power of Attorney: Continues during incapacity; essential for planning; must specifically state durability.\n\nSpringing Power of Attorney: "Springs" into effect upon incapacity; requires medical certification; delays can be problematic.'
        },
        {
          title: 'Common POA Powers',
          type: 'table',
          headers: ['Power', 'Description'],
          rows: [
            ['Banking', 'Access accounts, pay bills'],
            ['Real Estate', 'Buy, sell, manage property'],
            ['Investments', 'Manage portfolio'],
            ['Business', 'Operate business interests'],
            ['Tax Matters', 'File returns, deal with IRS'],
            ['Gifts', 'Make gifts to family (if specified)']
          ]
        },
        {
          title: 'Choosing an Agent',
          type: 'list',
          items: [
            'Trustworthy and competent',
            'Geographically accessible',
            'Willing to serve',
            'Consider successor agents'
          ]
        },
        {
          title: 'Healthcare Directives Overview',
          type: 'text',
          content: 'Healthcare Proxy (Healthcare POA): Appoints agent for medical decisions; activates when you cannot communicate; agent follows your known wishes.\n\nLiving Will: States treatment preferences; focus on end-of-life situations; specifically addresses life-sustaining treatment. Living will triggers: terminal condition, permanent unconsciousness, or end-stage condition.\n\nHIPAA Authorization: Allows access to medical information; without it, providers may not share info.\n\nDNR Orders: Medical order (not advance directive); signed by physician; prevents CPR if heart stops.'
        },
        {
          title: 'Advance Directive Comparison',
          type: 'table',
          headers: ['Document', 'Purpose', 'Durability'],
          rows: [
            ['Durable POA', 'Financial decisions', 'Survives incapacity'],
            ['Healthcare Proxy', 'Medical decisions', 'Only during incapacity'],
            ['Living Will', 'End-of-life treatment wishes', 'N/A (written instructions)'],
            ['HIPAA Authorization', 'Medical info access', 'Per document terms']
          ]
        },
        {
          title: 'Complete Incapacity Plan',
          type: 'list',
          items: [
            'Durable Power of Attorney (financial)',
            'Healthcare Proxy (medical decisions)',
            'Living Will (treatment preferences)',
            'HIPAA Authorization (information access)',
            'Revocable Trust (asset management)'
          ]
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: '70% of people over 65 will need long-term care. Cognitive decline affects decision-making, and court intervention is expensive and public. All clients need incapacity planning documents.'
        },
        {
          title: 'Mnemonic: PAHL',
          type: 'callout',
          content: 'Incapacity Documents: POA (financial), Advance directive, Healthcare proxy, Living will'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Durable POA is essential—it survives incapacity',
            'Without POA, court guardianship may be required',
            'Healthcare proxy appoints a medical decision-maker',
            'Living will states end-of-life treatment preferences',
            'Complete incapacity planning needs all four documents'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L003',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Introduction to Trusts',
    description: 'Define trust terminology and parties, distinguish revocable from irrevocable trusts, and explain basic trust taxation.',
    order: 3,
    duration: 40,
    difficulty: 'intermediate',
    topics: [
      'Trust terminology and parties',
      'Revocable vs. irrevocable trusts',
      'Basic trust taxation',
      'Common trust purposes'
    ],
    blueprintArea: 'EST-1',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'A trust is a legal arrangement where one party (trustee) holds property for the benefit of another (beneficiary). Trusts are fundamental estate planning tools used for probate avoidance, tax planning, and asset protection.'
        },
        {
          title: 'Trust Parties',
          type: 'table',
          headers: ['Party', 'Role'],
          rows: [
            ['Grantor/Settlor/Trustor', 'Creates and funds the trust'],
            ['Trustee', 'Manages trust assets; fiduciary duty'],
            ['Beneficiary', 'Receives benefits from trust'],
            ['Successor Trustee', 'Takes over if trustee cannot serve']
          ]
        },
        {
          title: 'Trust Property Examples',
          type: 'list',
          items: [
            'Real estate',
            'Bank accounts',
            'Investment accounts',
            'Life insurance (ILIT)',
            'Business interests',
            'Tangible personal property'
          ]
        },
        {
          title: 'Revocable Living Trust',
          type: 'text',
          content: 'Characteristics: Grantor can modify or revoke; grantor typically serves as trustee; assets included in taxable estate; no income tax entity (grantor trust); no asset protection.\n\nBenefits: Probate avoidance; privacy (not public record); incapacity management; flexibility to change.\n\nFunding Requirements: Must transfer assets to trust; unfunded trust provides no benefit; pour-over will catches missed assets.'
        },
        {
          title: 'Irrevocable Trust',
          type: 'text',
          content: 'Characteristics: Cannot be modified/revoked by grantor; grantor gives up control; may be excluded from taxable estate; separate tax entity (may pay taxes); asset/creditor protection possible.'
        },
        {
          title: 'Key Trade-off',
          type: 'callout',
          content: '"Control vs. Tax Benefits"—Less control = More tax advantages. This is the fundamental trade-off in choosing between revocable and irrevocable trusts.'
        },
        {
          title: 'Trust Income Tax Brackets (2026)',
          type: 'table',
          headers: ['Taxable Income', 'Rate'],
          rows: [
            ['$0 - $3,250', '10%'],
            ['$3,250 - $11,700', '24%'],
            ['$11,700 - $15,950', '35%'],
            ['Over $15,950', '37%']
          ]
        },
        {
          title: 'Exam Warning',
          type: 'warning',
          content: 'Trust tax brackets are severely compressed! Trusts reach the top 37% bracket at only $15,950 vs. $626,350 for individuals. This is a critical exam concept.'
        },
        {
          title: 'Trust Taxation Types',
          type: 'text',
          content: 'Grantor Trust: Income taxed to grantor; trust is "ignored" for tax purposes; no separate tax return required (optional). Example: Revocable living trust.\n\nSimple Trust: Must distribute all income annually; cannot make charitable contributions; cannot distribute principal; beneficiaries pay tax on distributions.\n\nComplex Trust: Can accumulate income; can make charitable contributions; can distribute principal; taxed on retained income.\n\nDistribution Deduction: Trust gets deduction for income distributed to beneficiaries. Beneficiaries include distribution in their income.'
        },
        {
          title: 'Common Trust Purposes',
          type: 'list',
          items: [
            'Probate Avoidance: Assets in trust are not probated; immediate access for beneficiaries; privacy maintained',
            'Incapacity Management: Successor trustee takes over; no court involvement; seamless asset management',
            'Beneficiary Protection: Spendthrift provisions; creditor protection; professional management',
            'Tax Planning: Estate tax reduction (irrevocable); GST tax planning; charitable giving',
            'Special Needs: Preserve government benefits; supplemental needs trust; professional management'
          ]
        },
        {
          title: 'Mnemonic: GTB',
          type: 'callout',
          content: 'Trust Parties: Grantor (creates), Trustee (manages), Beneficiary (receives)'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Trust parties: Grantor creates, Trustee manages, Beneficiary receives',
            'Revocable trusts avoid probate but offer no tax benefits',
            'Irrevocable trusts may reduce estate taxes but require giving up control',
            'Trust tax brackets are severely compressed—top rate at $15,950',
            'Funding the trust is essential—unfunded trusts provide no benefit'
          ]
        }
      ]
    }
  },
  {
    id: 'CFP-EST-L004',
    courseId: 'cfp',
    section: 'CFP-EST',
    title: 'Types of Trusts',
    description: 'Identify major trust types and their purposes, understand when each trust type is appropriate, and compare trust structures.',
    order: 4,
    duration: 40,
    difficulty: 'intermediate',
    topics: [
      'Major trust types and purposes',
      'Trust type selection criteria',
      'Trust structures for different planning goals',
      'Trust limitations and requirements'
    ],
    blueprintArea: 'EST-1',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Different trust types serve different planning purposes. Understanding when to use each type is essential for effective estate planning. This lesson covers estate tax reduction trusts, charitable trusts, and special purpose trusts.'
        },
        {
          title: 'Credit Shelter Trust (Bypass/Family Trust)',
          type: 'text',
          content: 'Purpose: Maximize use of estate tax exemption at first spouse\'s death.\n\nHow It Works:\n1. At first death, exemption amount ($7.0M in 2026, due to TCJA sunset) funds bypass trust\n2. Surviving spouse can receive income and limited principal\n3. At second death, bypass trust assets pass to children, NOT included in surviving spouse\'s estate\n\nKey Features: Preserves deceased spouse\'s exemption; surviving spouse access without estate inclusion; growth occurs outside taxable estate.\n\nNote: Portability has reduced need, but bypass trusts still valuable for state estate tax planning, creditor protection, and ensuring children receive assets.'
        },
        {
          title: 'QTIP Trust (Qualified Terminable Interest Property)',
          type: 'text',
          content: 'Purpose: Provide for surviving spouse while controlling ultimate distribution.\n\nRequirements:\n• All income distributed to spouse at least annually\n• No other beneficiaries during spouse\'s lifetime\n• Executor must make QTIP election\n\nBenefits: Control where assets go after spouse dies; marital deduction for estate tax; common in second marriage situations.\n\nExample: Husband with children from first marriage leaves assets in QTIP for second wife. At her death, assets go to his children.'
        },
        {
          title: 'Irrevocable Life Insurance Trust (ILIT)',
          type: 'text',
          content: 'Purpose: Remove life insurance from taxable estate.\n\nHow It Works:\n1. Grantor creates irrevocable trust\n2. Trust applies for and owns life insurance\n3. Trust pays premiums (grantor makes gifts to trust)\n4. At death, proceeds paid to trust, distributed per terms\n\nKey Requirements: Grantor cannot be trustee; 3-year look-back on transferred policies; Crummey notices for gift tax exclusion.'
        },
        {
          title: 'ILIT Estate Tax Savings',
          type: 'callout',
          content: 'Tax Savings = Policy Value × Estate Tax Rate. For a $2M policy at 40% estate tax rate = $800,000 savings!'
        },
        {
          title: 'Charitable Remainder Trust (CRT)',
          type: 'text',
          content: 'Structure: Income to donor (or others) for life/term; remainder to charity.\n\nTypes:\n• CRAT: Charitable Remainder Annuity Trust (fixed payments)\n• CRUT: Charitable Remainder Unitrust (percentage of annual value)\n\nBenefits: Income stream; charitable deduction; capital gains bypass; estate tax reduction.'
        },
        {
          title: 'Charitable Lead Trust (CLT)',
          type: 'text',
          content: 'Structure: Income to charity for term; remainder to family.\n\nBenefits: Reduce gift/estate tax on family transfer; support charity during term; "freeze" asset values.'
        },
        {
          title: 'CRT vs CLT Memory Aid',
          type: 'callout',
          content: 'CRT = Charity gets Remainder (you get income first)\nCLT = Charity Leads (charity gets income first)'
        },
        {
          title: 'Special Needs Trust (SNT)',
          type: 'text',
          content: 'Purpose: Supplement government benefits without disqualification.\n\nStructure: Trustee has discretion over distributions; cannot provide food/shelter (would reduce SSI); supplements, not supplants, government benefits.\n\nTypes:\n• First-party SNT: Funded with beneficiary\'s assets (Medicaid payback required)\n• Third-party SNT: Funded by others (no payback)'
        },
        {
          title: 'Spendthrift Trust',
          type: 'text',
          content: 'Purpose: Protect beneficiary from creditors and poor judgment.\n\nFeatures: Beneficiary cannot assign/transfer interest; creditors cannot reach assets before distribution; trustee controls timing/amount of distributions.'
        },
        {
          title: 'Dynasty Trust (Generation-Skipping Trust)',
          type: 'text',
          content: 'Purpose: Preserve wealth for multiple generations.\n\nFeatures: Designed to last perpetually (where allowed); avoids estate tax at each generation; uses GST exemption.\n\nState Laws: Must be created in state allowing perpetual trusts (e.g., Delaware, Nevada, South Dakota).'
        },
        {
          title: 'Trust Selection Guide',
          type: 'table',
          headers: ['Goal', 'Recommended Trust'],
          rows: [
            ['Avoid probate', 'Revocable living trust'],
            ['Remove life insurance from estate', 'ILIT'],
            ['Provide for spouse, then children', 'QTIP'],
            ['Support charity, receive income', 'CRT'],
            ['Protect beneficiary from creditors', 'Spendthrift'],
            ['Preserve Medicaid eligibility', 'Special needs trust'],
            ['Multi-generational wealth transfer', 'Dynasty trust']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Credit shelter trusts protect deceased spouse\'s exemption from estate tax',
            'QTIP trusts balance marital deduction with control over ultimate distribution',
            'ILITs remove life insurance from the taxable estate',
            'CRTs provide income stream plus charitable deduction',
            'Special needs trusts preserve government benefit eligibility'
          ]
        }
      ]
    }
  }
];

export default CFP_EST1_LESSONS;
