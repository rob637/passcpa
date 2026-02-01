import { Lesson } from '../../types';

export const tcpLessons: Lesson[] = [
  {
    id: 'TCP-I-001',
    section: 'TCP',
    title: "Income Timing Strategies",
    description: "Master income recognition timing techniques to minimize tax liability across periods",
    order: 1,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Tax Planning", "Income Recognition", "Deferral"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Income timing is one of the most powerful tax planning tools. By controlling WHEN income is recognized, taxpayers can manage marginal tax rates, utilize lower brackets, defer taxes, and coordinate with deductions. CPAs must master both the strategies and the limitations."
        },
        {
          title: 'Core Timing Principles',
          type: 'text',
          content: "Income timing strategies work because of the time value of money and progressive tax rates. Deferring income delays tax payment (interest-free loan from government) and may shift income to years with lower rates. Accelerating income may be advantageous when rates are expected to increase or when income can offset expiring losses."
        },
        {
          title: 'Cash vs Accrual Method Impact',
          type: 'table',
          headers: ["Method", "Income Recognition", "Planning Flexibility"],
          rows: [
            ["Cash Method", "When actually/constructively received", "High—can delay billing, defer receipt"],
            ["Accrual Method", "When all events test met + amount determinable", "Lower—timing tied to earning"],
            ["Hybrid Methods", "Combination approaches", "Moderate—depends on elections"]
          ]
        },
        {
          title: 'Cash Method Deferral Techniques',
          type: 'list',
          items: [
            "Delay billing: Send invoices after year-end for services rendered late in year",
            "Defer receipt: Arrange for payments to be received in following year",
            "Installment sales: Spread gain recognition over payment period",
            "Deferred compensation: Negotiate payment timing with employers",
            "BEWARE: Constructive receipt doctrine limits aggressive deferral"
          ]
        },
        {
          title: 'Constructive Receipt Doctrine',
          type: 'text',
          content: "Income is constructively received when it's credited to your account, set apart for you, or made available without substantial limitation. You can't turn your back on income that's available. Example: December check mailed Dec 28—constructively received in current year even if not deposited until January."
        },
        {
          title: 'Constructive Receipt Exceptions',
          type: 'list',
          items: [
            "Substantial limitations or restrictions on access",
            "Amount not yet determinable",
            "Written deferral agreement BEFORE services performed",
            "Employer-established non-qualified deferred compensation plans (§409A)",
            "Installment sale elections properly structured"
          ]
        },
        {
          title: 'Accrual Method Planning',
          type: 'table',
          headers: ["Strategy", "Application", "Limitation"],
          rows: [
            ["Advance payments", "May defer under Rev. Proc. 2004-34", "One-year deferral max"],
            ["Contract completion", "Long-term contracts—percentage completion vs. completed contract", "PCM required for most"],
            ["Disputed amounts", "Don't accrue until resolved", "Must be genuine dispute"],
            ["Year-end accruals", "Time services to shift earning", "All events test controls"]
          ]
        },
        {
          title: 'Income Acceleration Strategies',
          type: 'list',
          items: [
            "Accelerate into year with expiring NOLs or capital losses",
            "Pull income into year before expected rate increase",
            "Roth conversions in low-income years",
            "Recognize gain before moving to high-tax state",
            "Accelerate income to utilize expiring credits"
          ]
        },
        {
          title: 'Retirement Account Timing',
          type: 'table',
          headers: ["Strategy", "Timing Impact", "Considerations"],
          rows: [
            ["Traditional IRA/401(k)", "Defer income via deduction", "Tax on withdrawal"],
            ["Roth conversion", "Accelerate income now", "Tax-free growth/withdrawal"],
            ["RMD timing", "Must take by deadline", "Penalty for late RMD"],
            ["QCD (Qualified Charitable Distribution)", "Exclude from income", "Age 70½+, up to $105k"]
          ]
        },
        {
          title: 'Example: Year-End Timing Decision',
          type: 'example',
          content: "Sarah, a consultant (cash basis), completes a $50,000 project on December 20. She expects to be in the 32% bracket this year but 24% next year due to retirement.\n\nOption A: Bill December 21, receive payment December 30\n• Tax: $50,000 × 32% = $16,000 current year\n\nOption B: Bill January 2, receive payment January 15\n• Tax: $50,000 × 24% = $12,000 next year\n• PV of deferral benefit (assuming 5% rate): ~$570\n• Total benefit: $4,000 rate differential + $570 deferral = $4,570\n\nRecommendation: Defer billing to next year, saving $4,570."
        },
        {
          title: 'Section 409A Compliance',
          type: 'callout',
          calloutType: 'warning',
          content: "Deferred compensation arrangements must comply with §409A. Violations result in immediate income inclusion PLUS 20% penalty PLUS interest. Key rules: deferral elections made before services performed, distributions only on specified events (separation, disability, death, change in control, fixed date)."
        },
        {
          title: 'Memory Aid: Income Timing',
          type: 'callout',
          calloutType: 'tip',
          content: "'DEFER or PULL':\nD = Delay billing (cash method)\nE = Elections (installment, deferral plans)\nF = Future rate expectations\nE = Earnings timing (accrual)\nR = Restrictions (constructive receipt limits)\n\nPULL = Pull income forward when rates rising or losses expiring"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Constructive receipt catches many candidates! A taxpayer cannot 'turn their back' on available income. The key is whether there are SUBSTANTIAL LIMITATIONS on access—not just inconvenience. Check is in the mail = constructively received when delivered, not when deposited."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Income timing exploits time value of money and rate differentials\n• Cash method offers more flexibility; accrual follows all-events test\n• Constructive receipt limits deferral—can't ignore available income\n• §409A governs deferred compensation—severe penalties for violations\n• Sometimes ACCELERATING income is optimal (expiring losses, rate increases)\n• Always consider both current and future tax rates in timing decisions"
        }
      ]
    }
  },
  {
    id: 'TCP-I-002',
    section: 'TCP',
    title: "Income Shifting Strategies",
    description: "Implement tax-efficient income shifting among family members and entities",
    order: 2,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Tax Planning", "Family Tax Planning", "Assignment of Income"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Income shifting can dramatically reduce family tax burdens by moving income to lower-bracket taxpayers. However, the IRS has developed extensive rules to prevent abuse. Understanding what works—and what doesn't—is essential for effective tax planning."
        },
        {
          title: 'Assignment of Income Doctrine',
          type: 'text',
          content: "The fruit-and-tree doctrine (Lucas v. Earl) holds that income is taxed to the person who earns it. You can't assign earned income to another taxpayer. However, you CAN transfer income-producing property, shifting future income to the property's new owner."
        },
        {
          title: 'Valid vs Invalid Income Shifting',
          type: 'table',
          headers: ["Strategy", "Valid?", "Explanation"],
          rows: [
            ["Gift salary to child", "No", "Assignment of earned income"],
            ["Gift dividend-paying stock", "Yes", "Transfer of income-producing property"],
            ["Employ child in business", "Yes", "If reasonable compensation for real work"],
            ["Family partnership", "Yes", "If valid business purpose, real services/capital"],
            ["Trust for child's benefit", "Yes", "If properly structured (grantor trust rules)"]
          ]
        },
        {
          title: 'Kiddie Tax Rules (§1(g))',
          type: 'text',
          content: "The kiddie tax limits income shifting to children by taxing their unearned income above a threshold at the parent's marginal rate. Applies to children under 19 (or under 24 if full-time student) who don't provide more than half their own support."
        },
        {
          title: 'Kiddie Tax Thresholds (2024-2026)',
          type: 'table',
          headers: ["Income Range", "Tax Treatment"],
          rows: [
            ["First $1,300", "Tax-free (standard deduction for dependents)"],
            ["$1,301 - $2,600", "Child's tax rate"],
            ["Above $2,600", "Parent's marginal rate (kiddie tax)"]
          ]
        },
        {
          title: 'Employing Family Members',
          type: 'list',
          items: [
            "Children under 18 in parent's sole proprietorship: No FICA",
            "Must pay REASONABLE compensation for ACTUAL services",
            "Document duties, hours, and comparable wages",
            "Child's standard deduction shelters up to $14,600 (2024)",
            "Child can contribute to Roth IRA with earned income",
            "Shifts income from high-bracket parent to zero/low-bracket child"
          ]
        },
        {
          title: 'Example: Employing a Child',
          type: 'example',
          content: "Dr. Smith (35% bracket) employs her 16-year-old son in her medical practice for legitimate office work.\n\nSon's compensation: $14,000/year (reasonable for duties)\nSon's tax: $0 (within standard deduction)\nSon's FICA: $0 (under 18, parent's sole prop)\n\nTax savings to Dr. Smith:\n• Income tax: $14,000 × 35% = $4,900\n• Self-employment tax: $14,000 × 15.3% = $2,142\n• Total family tax savings: $7,042\n\nBonus: Son can contribute $7,000 to Roth IRA, building tax-free retirement savings!"
        },
        {
          title: 'Family Partnerships',
          type: 'text',
          content: "Family members can be partners if they contribute capital or services. Special rules (§704(e)) require that capital be a material income-producing factor and allocations reflect reasonable compensation for services. IRS scrutinizes allocations disproportionate to contributions."
        },
        {
          title: 'Family Partnership Rules',
          type: 'list',
          items: [
            "Capital must be material income-producing factor",
            "Donor must be adequately compensated for services first",
            "Child's share limited to capital contribution portion",
            "Allocations must have economic substance",
            "Gift of partnership interest creates valid partner"
          ]
        },
        {
          title: 'Trusts for Income Shifting',
          type: 'table',
          headers: ["Trust Type", "Income Taxed To", "Planning Use"],
          rows: [
            ["Grantor Trust", "Grantor", "No income shift; estate planning"],
            ["Simple Trust", "Beneficiary (DNI)", "Shift income to beneficiaries"],
            ["Complex Trust", "Trust or beneficiary", "Flexible distributions"],
            ["UGMA/UTMA", "Minor (kiddie tax applies)", "Limited shift due to kiddie tax"],
            ["§2503(c) Trust", "Trust until 21", "Minor's trust; limited shift"]
          ]
        },
        {
          title: 'Shifting Investment Income',
          type: 'list',
          items: [
            "Gift appreciated stock: Done transfers to lower-bracket family member",
            "Series I/EE Bonds: Register in child's name; defer/shift interest",
            "Municipal bonds: Tax-exempt regardless of bracket",
            "Consider kiddie tax before gifting to minors",
            "Adult children (24+) not subject to kiddie tax"
          ]
        },
        {
          title: 'S Corporation Salary/Distribution Planning',
          type: 'text',
          content: "S corp shareholders who work in the business must receive reasonable compensation (subject to FICA). Remaining profits pass through as distributions (no FICA). Strategy: Minimize salary to reasonable level, maximize distributions. But IRS challenges unreasonably low salaries!"
        },
        {
          title: 'Memory Aid: Income Shifting',
          type: 'callout',
          calloutType: 'tip',
          content: "'SHIFT the TREE, not the FRUIT':\n• Can't assign earned income (fruit)\n• CAN transfer income-producing property (tree)\n• Employ family for real work at reasonable pay\n• Kiddie tax limits shifting to minors\n• Trusts and partnerships must have substance"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "The kiddie tax applies through age 23 for full-time students who don't provide over half their support! Many candidates think it ends at 18. Also, employment of children under 18 is only FICA-exempt in a sole proprietorship or spousal partnership—NOT in corporations or partnerships with non-parent partners."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Assignment of income doctrine: Can't assign earned income; CAN gift property\n• Kiddie tax applies to unearned income of children under 19 (24 if student)\n• Employing children: Real work, reasonable pay, no FICA if under 18 in sole prop\n• Family partnerships require capital as material factor, economic substance\n• Trusts can shift income but grantor trust rules may apply\n• S corp: Balance salary (FICA) vs distributions (no FICA)—IRS watches!"
        }
      ]
    }
  },
  {
    id: 'TCP-I-003',
    section: 'TCP',
    title: "🆕 H.R. 1: New Income Exclusions",
    description: "Navigate the Tax Cuts and Jobs Act income exclusion changes and planning opportunities",
    order: 3,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Tax Planning", "H.R. 1", "TCJA"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "The Tax Cuts and Jobs Act (TCJA/H.R. 1) significantly changed income exclusions. Many provisions sunset after 2025, creating critical planning windows. Understanding these changes helps clients maximize benefits while provisions remain available."
        },
        {
          title: 'TCJA Overview',
          type: 'text',
          content: "The Tax Cuts and Jobs Act, enacted December 2017, made sweeping changes to individual and business taxation. Many individual provisions expire after December 31, 2025, creating a 'sunset cliff.' Understanding which exclusions changed—and which remain permanent—is essential."
        },
        {
          title: 'Income Exclusion Changes',
          type: 'table',
          headers: ["Exclusion", "Pre-TCJA", "Under TCJA", "Sunset?"],
          rows: [
            ["Moving expense reimbursement", "Excluded", "Taxable (except military)", "Yes - 2026"],
            ["Bicycle commuting benefit", "$20/month excluded", "Suspended", "Yes - 2026"],
            ["Qualified tuition reduction", "Excluded", "Still excluded", "Permanent"],
            ["Employer student loan repayment", "Taxable", "$5,250 excluded (COVID)", "Extended"],
            ["Achievement awards", "$400-$1,600 excluded", "Same, but narrower definition", "Permanent"]
          ]
        },
        {
          title: 'Moving Expense Exclusion Suspension',
          type: 'text',
          content: "Before TCJA, employer-paid moving expenses were excluded from income, and employees could deduct unreimbursed moving expenses. TCJA suspended BOTH the exclusion and the deduction for 2018-2025. Exception: Active duty military moving pursuant to military orders retain both benefits."
        },
        {
          title: 'Qualified Fringe Benefits Retained',
          type: 'list',
          items: [
            "Health insurance premiums (employer-paid): Still excluded",
            "HSA contributions by employer: Still excluded",
            "Dependent care assistance: Still excluded up to $5,000",
            "Educational assistance: Still excluded up to $5,250",
            "Qualified transportation: Parking $315/month, transit $315/month (2024)",
            "De minimis fringe benefits: Still excluded"
          ]
        },
        {
          title: 'Alimony Treatment Change',
          type: 'table',
          headers: ["Divorce Date", "Payor Treatment", "Recipient Treatment"],
          rows: [
            ["Before 1/1/2019", "Deductible (above-the-line)", "Includible in income"],
            ["After 12/31/2018", "Not deductible", "Not income"],
            ["Modified after 2018*", "New rules if elected", "New rules if elected"]
          ]
        },
        {
          title: 'Alimony Planning Implications',
          type: 'text',
          content: "For divorces finalized after 2018, alimony is tax-neutral—no deduction for payor, no income for recipient. This shifts tax planning to property division. Pre-2019 divorces retain old treatment unless modified with election. Consider timing of divorce finalization for tax efficiency."
        },
        {
          title: 'Qualified Opportunity Zone Exclusions',
          type: 'list',
          items: [
            "New exclusion created by TCJA (§1400Z-2)",
            "Invest capital gains in Qualified Opportunity Fund within 180 days",
            "Defer original gain until 2026 (or earlier sale)",
            "10% basis increase if held 5 years (by 12/31/2026)",
            "15% basis increase if held 7 years (deadline passed)",
            "Permanent exclusion of NEW gains if held 10+ years"
          ]
        },
        {
          title: 'Section 529 Expansion',
          type: 'text',
          content: "TCJA expanded 529 plan distributions to include K-12 tuition (up to $10,000/year per beneficiary). Previously limited to higher education. Permanent change. State tax treatment varies—some states don't conform."
        },
        {
          title: 'Exclusions Sunset Schedule',
          type: 'table',
          headers: ["Provision", "Current Status", "After 2025"],
          rows: [
            ["Moving expense exclusion suspension", "Suspended (except military)", "Returns for all"],
            ["Bicycle commuting suspension", "Suspended", "$20/month returns"],
            ["Alimony (post-2018 divorces)", "Not income/not deductible", "Permanent"],
            ["QOZ 10-year gain exclusion", "Available", "Permanent"],
            ["529 K-12 expansion", "$10k/year", "Permanent"]
          ]
        },
        {
          title: 'Planning Before Sunset',
          type: 'list',
          items: [
            "Moving: If relocating for work, consider timing around 2026",
            "Divorce: Property division more important post-2018",
            "QOZ: Must invest by deadlines to get basis step-up",
            "Monitor legislation: Provisions may be extended or modified",
            "State conformity: Check state treatment of federal changes"
          ]
        },
        {
          title: 'Memory Aid: TCJA Exclusion Changes',
          type: 'callout',
          calloutType: 'tip',
          content: "'TCJA: MOVE-BIKE-ALIMONY-QOZ':\n• MOVing expenses suspended (except military)\n• BIKE benefit suspended\n• ALIMONY no longer income/deduction (post-2018)\n• QOZ new exclusion for opportunity zone gains\nMost return in 2026—sunset cliff!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Alimony rules depend on DIVORCE DATE, not payment date! A divorce finalized December 15, 2018, uses OLD rules forever (income to recipient, deduction to payor). Divorce finalized January 2, 2019, uses NEW rules (no income, no deduction). The cutoff is when the decree was entered."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Moving expense exclusion suspended 2018-2025 (except military)\n• Bicycle commuting benefit suspended 2018-2025\n• Alimony: Post-2018 divorces = no income/no deduction (permanent)\n• QOZ provides deferral + potential permanent exclusion of new gains\n• 529 expanded to K-12 tuition ($10k/year) permanently\n• Many provisions sunset after 2025—monitor legislation"
        }
      ]
    }
  },
  {
    id: 'TCP-I-004',
    section: 'TCP',
    title: "Deduction Timing & Bunching",
    description: "Optimize deduction timing through strategic bunching and year-end planning",
    order: 4,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Tax Planning", "Itemized Deductions", "Bunching"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "With the near-doubling of the standard deduction under TCJA, many taxpayers now alternate between itemizing and taking the standard deduction. Strategic 'bunching' of deductions can maximize tax benefits by concentrating deductible expenses into years when itemizing is advantageous."
        },
        {
          title: 'The Bunching Strategy',
          type: 'text',
          content: "Bunching involves timing discretionary deductible expenses to maximize itemized deductions in certain years while taking the standard deduction in others. Instead of spreading deductions evenly (potentially losing benefit), concentrate them to exceed the standard deduction threshold."
        },
        {
          title: 'Standard Deduction Amounts (2024)',
          type: 'table',
          headers: ["Filing Status", "Standard Deduction", "65+ Additional"],
          rows: [
            ["Single", "$14,600", "+$1,950"],
            ["MFJ", "$29,200", "+$1,550 each"],
            ["MFS", "$14,600", "+$1,550"],
            ["HOH", "$21,900", "+$1,950"]
          ]
        },
        {
          title: 'Deductions Eligible for Bunching',
          type: 'table',
          headers: ["Deduction", "Timing Control", "Bunching Strategy"],
          rows: [
            ["Charitable contributions", "High", "Accelerate/defer donations"],
            ["Medical expenses", "Moderate", "Time elective procedures"],
            ["State/local taxes (SALT)", "Limited", "$10k cap limits benefit"],
            ["Mortgage interest", "Low", "Mostly fixed by payments"],
            ["Property taxes", "Limited", "Prepayment restricted"]
          ]
        },
        {
          title: 'Charitable Contribution Bunching',
          type: 'list',
          items: [
            "Donor-Advised Fund (DAF): Contribute large amount in one year, distribute over time",
            "Bunch 2-3 years of donations into one year",
            "Alternate: Itemize Year 1 (large donation), Standard Year 2",
            "Appreciated stock: Avoid capital gains, get FMV deduction",
            "Qualified Charitable Distribution (QCD): Age 70½+, directly from IRA, up to $105k"
          ]
        },
        {
          title: 'Example: Charitable Bunching',
          type: 'example',
          content: "Tom and Mary (MFJ) typically donate $15,000/year. Their other itemized deductions total $20,000 (below $29,200 standard).\n\nWithout bunching (per year):\n• Itemized: $35,000; Benefit over standard: $5,800\n• Total 2-year benefit: $11,600\n\nWith bunching (every other year):\n• Year 1: $30,000 donations + $20,000 other = $50,000 itemized\n  Benefit: $50,000 - $29,200 = $20,800\n• Year 2: $0 donations, take $29,200 standard\n• Total 2-year benefit: $20,800\n\nBunching advantage: $9,200 additional deductions!"
        },
        {
          title: 'Donor-Advised Funds (DAFs)',
          type: 'text',
          content: "DAFs allow immediate deduction for contribution, with grants to charities made over time. Perfect for bunching: Make large DAF contribution in high-income year, recommend grants to favorite charities over following years. Contribution is irrevocable once made."
        },
        {
          title: 'Medical Expense Timing',
          type: 'list',
          items: [
            "Deductible only to extent exceeding 7.5% of AGI",
            "Bunch elective procedures (dental, vision, etc.) into one year",
            "If close to threshold, accelerate December expenses",
            "If under threshold, defer to following year",
            "Consider FSA/HSA for expenses that won't meet threshold"
          ]
        },
        {
          title: 'SALT Limitation Impact',
          type: 'text',
          content: "The $10,000 SALT cap ($5,000 MFS) limits bunching for state/local taxes. If SALT already exceeds cap, accelerating property tax payment provides no benefit. Bunching SALT only works if normally under the cap. Note: SALT cap sunsets after 2025."
        },
        {
          title: 'Year-End Deduction Strategies',
          type: 'table',
          headers: ["If This Year Itemizing", "If Next Year Itemizing"],
          rows: [
            ["Accelerate charitable contributions", "Defer contributions to next year"],
            ["Pay January mortgage in December", "Normal payment schedule"],
            ["Prepay state estimated tax (SALT cap)", "Defer if capped"],
            ["Schedule elective medical procedures", "Defer procedures"],
            ["Pay deductible expenses before 12/31", "Wait until January"]
          ]
        },
        {
          title: 'Qualified Charitable Distribution (QCD)',
          type: 'callout',
          calloutType: 'tip',
          content: "For taxpayers 70½+, QCDs from IRAs are excluded from income entirely (up to $105,000 in 2024). This beats itemizing because: (1) No AGI increase, (2) Satisfies RMD, (3) Benefits even standard deduction takers. QCDs are better than bunching for eligible taxpayers!"
        },
        {
          title: 'Interaction with AMT',
          type: 'list',
          items: [
            "Bunching may trigger AMT in high-deduction years",
            "SALT deduction disallowed for AMT",
            "Medical threshold was 10% for AMT (now both 7.5%)",
            "Calculate AMT impact before large bunching",
            "Charitable contributions allowed for both regular and AMT"
          ]
        },
        {
          title: 'Memory Aid: Bunching Candidates',
          type: 'callout',
          calloutType: 'tip',
          content: "'BUNCH when you CONTROL timing':\nB = Big charitable gifts (DAF ideal)\nU = Unreimbursed medical (elective procedures)\nN = kNow your threshold (standard deduction amount)\nC = Calculate 2-year impact\nH = Hold/accelerate based on comparison"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Property tax prepayment is LIMITED! Under TCJA, you cannot deduct prepaid property taxes for a future year if assessment hasn't been made. And even if you can prepay, the $10,000 SALT cap limits the benefit. Don't advise prepaying property taxes without checking both limitations."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Bunching concentrates deductions to exceed standard deduction threshold\n• Donor-Advised Funds enable large one-time deduction with distributions over time\n• Charitable contributions offer highest bunching flexibility\n• Medical expense bunching works when near 7.5% AGI threshold\n• SALT cap limits property/state tax bunching benefit\n• QCDs (age 70½+) may beat bunching for charitable giving\n• Always calculate 2-year tax impact before bunching"
        }
      ]
    }
  },
  {
    id: 'TCP-I-005',
    section: 'TCP',
    title: "🆕 H.R. 1: Updated Deduction Limits",
    description: "Master the TCJA deduction limit changes and planning strategies before sunset",
    order: 5,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Tax Planning", "H.R. 1", "TCJA", "Itemized Deductions"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "TCJA dramatically altered itemized deductions—eliminating some, capping others, and expanding the standard deduction. With most provisions sunsetting after 2025, understanding current rules and planning for potential changes is critical."
        },
        {
          title: 'Major TCJA Deduction Changes',
          type: 'table',
          headers: ["Deduction", "Pre-TCJA", "Under TCJA (2018-2025)"],
          rows: [
            ["Standard deduction", "$6,350 Single / $12,700 MFJ", "$14,600 Single / $29,200 MFJ (2024)"],
            ["Personal exemptions", "$4,050 per person", "Suspended ($0)"],
            ["SALT deduction", "Unlimited", "Capped at $10,000 ($5,000 MFS)"],
            ["Mortgage interest", "$1M acquisition debt", "$750K acquisition debt"],
            ["Home equity interest", "$100K deductible", "Suspended (unless for acquisition)"],
            ["Misc. itemized (2%)", "Deductible over 2% AGI", "Suspended"],
            ["Casualty losses", "Over $100 + 10% AGI", "Federally declared disasters only"]
          ]
        },
        {
          title: 'SALT Cap Deep Dive',
          type: 'text',
          content: "The $10,000 SALT cap covers state/local income taxes OR sales taxes (election), PLUS property taxes combined. High-tax state residents are significantly impacted. The cap applies regardless of filing status (except $5,000 for MFS). No inflation adjustment."
        },
        {
          title: 'SALT Workarounds Attempted',
          type: 'table',
          headers: ["Strategy", "IRS Position", "Status"],
          rows: [
            ["State charitable credit programs", "Addressed by regulations", "Limited benefit"],
            ["PTE (Pass-Through Entity) tax", "Generally allowed", "Available in many states"],
            ["Prepaying property taxes", "Blocked for future year taxes", "Ineffective"],
            ["Charitable contributions in lieu", "IRS scrutinizes", "Risky"]
          ]
        },
        {
          title: 'Pass-Through Entity Tax (PTE) Workaround',
          type: 'text',
          content: "Many states now allow PTEs (S corps, partnerships) to pay state income tax at the entity level. This tax is deductible as a business expense, bypassing the individual SALT cap. Owners receive credit or exclusion for their share. Available in 30+ states."
        },
        {
          title: 'Mortgage Interest Changes',
          type: 'list',
          items: [
            "New limit: $750,000 acquisition indebtedness (down from $1M)",
            "Grandfathered: Mortgages originated before 12/15/2017 retain $1M limit",
            "Refinancing: Grandfathered debt retains old limit if principal doesn't increase",
            "Home equity: Interest only deductible if used to buy, build, or improve home",
            "Second homes: Included in limit (combined with primary)"
          ]
        },
        {
          title: 'Example: Mortgage Interest Limitation',
          type: 'example',
          content: "John purchased a home in 2020 with an $850,000 mortgage.\n\nMortgage interest paid: $42,000\nDeductible portion: $750,000 / $850,000 = 88.2%\nDeductible interest: $42,000 × 88.2% = $37,044\nNon-deductible: $4,956\n\nIf John had purchased before 12/15/2017 with same mortgage, 100% would be deductible under the $1M grandfathered limit."
        },
        {
          title: 'Suspended Deductions',
          type: 'list',
          items: [
            "Miscellaneous itemized deductions (2% floor): Investment expenses, tax prep, unreimbursed employee expenses—ALL GONE",
            "Moving expenses: Suspended (except active military)",
            "Hobby losses: Cannot offset hobby income (was limited to hobby income)",
            "Casualty/theft losses: Only federally declared disasters",
            "Alimony deduction: Post-2018 divorces (permanent change)"
          ]
        },
        {
          title: 'Charitable Contribution Changes',
          type: 'table',
          headers: ["Aspect", "Pre-TCJA", "Under TCJA"],
          rows: [
            ["Cash to public charities", "50% AGI limit", "60% AGI limit"],
            ["Athletic seating rights", "80% deductible", "0% deductible"],
            ["Substantiation", "Same", "Same"],
            ["Carryforward", "5 years", "5 years"],
            ["Property donations", "Same rules", "Same rules"]
          ]
        },
        {
          title: 'Planning Before 2026 Sunset',
          type: 'list',
          items: [
            "SALT: Use PTE election if available in your state",
            "Mortgage: Grandfathered debt retains $1M limit—don't refinance above",
            "Maximize bunching while standard deduction is high",
            "Accelerate charitable contributions before potential limit reduction",
            "Monitor legislation for extension or modification",
            "Personal exemptions return in 2026—may help large families"
          ]
        },
        {
          title: 'What Returns After 2025?',
          type: 'table',
          headers: ["Provision", "After Sunset (2026+)"],
          rows: [
            ["Standard deduction", "Returns to ~$7,500 Single / ~$15,000 MFJ (inflation adjusted)"],
            ["Personal exemptions", "Returns (~$5,000+ per person)"],
            ["SALT cap", "Removed—unlimited SALT deduction"],
            ["Mortgage limit", "Returns to $1M acquisition debt"],
            ["Misc. itemized (2%)", "Returns"],
            ["Casualty losses", "Returns (not just federal disasters)"]
          ]
        },
        {
          title: 'Memory Aid: TCJA Deduction Changes',
          type: 'callout',
          calloutType: 'tip',
          content: "'TCJA LIMITS': Think 'STAMP':\nS = SALT capped at $10k\nT = Ten thousand dollar SALT limit\nA = Acquisition debt reduced to $750k\nM = Miscellaneous itemized GONE\nP = Personal exemptions GONE\n\nAll sunset 2026 (except alimony change = permanent)"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "The mortgage interest limit depends on ORIGINATION DATE! Pre-12/15/2017 mortgages use $1M limit; later mortgages use $750K. Refinancing grandfathered debt retains old limit ONLY if you don't increase principal. Know both thresholds and the date!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SALT capped at $10,000 ($5,000 MFS)—PTE election may bypass\n• Mortgage interest: $750K limit for post-12/14/2017 loans; $1M grandfathered\n• Miscellaneous itemized deductions (2% floor) suspended\n• Personal exemptions suspended (offset by higher standard deduction)\n• Charitable AGI limit increased from 50% to 60% for cash\n• Most provisions sunset after 2025—significant planning implications"
        }
      ]
    }
  },
  {
    id: 'TCP-I-006',
    section: 'TCP',
    title: "Capital Gains Strategies",
    description: "Optimize capital gains recognition through timing, harvesting, and rate management",
    order: 6,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Tax Planning", "Capital Gains", "Investment Planning"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Capital gains planning offers significant tax savings through preferential rates, loss harvesting, and strategic timing. Understanding the interplay between holding periods, rate brackets, and the 3.8% NIIT helps maximize after-tax returns for investment clients."
        },
        {
          title: 'Long-Term Capital Gains Rates (2024)',
          type: 'table',
          headers: ["Rate", "Single", "MFJ"],
          rows: [
            ["0%", "$0 - $47,025", "$0 - $94,050"],
            ["15%", "$47,026 - $518,900", "$94,051 - $583,750"],
            ["20%", "Over $518,900", "Over $583,750"],
            ["+3.8% NIIT", "Over $200,000 MAGI", "Over $250,000 MAGI"]
          ]
        },
        {
          title: 'Capital Gains Rate Planning',
          type: 'text',
          content: "The 0% LTCG bracket is a powerful planning tool. Taxpayers in lower brackets can recognize gains tax-free up to the threshold. Strategy: 'Fill up' the 0% bracket each year with gain recognition, effectively stepping up basis for free."
        },
        {
          title: 'Gain Harvesting Strategy',
          type: 'example',
          content: "Sarah, single, has taxable income of $35,000 before capital gains. She has stock with $50,000 unrealized LTCG.\n\nRoom in 0% bracket: $47,025 - $35,000 = $12,025\n\nStrategy: Sell shares to recognize $12,025 gain\n• Tax on gain: $0 (within 0% bracket)\n• Repurchase immediately (no wash sale for gains)\n• New basis: FMV at repurchase\n• Result: Stepped-up basis with zero tax!\n\nRepeat annually to systematically harvest gains at 0%."
        },
        {
          title: 'Tax Loss Harvesting',
          type: 'list',
          items: [
            "Sell investments at a loss to offset gains",
            "Net STCL first offsets STCG (saves up to 37%)",
            "Excess offsets LTCG (saves 15-23.8%)",
            "$3,000 annual deduction against ordinary income",
            "Unlimited carryforward of excess losses",
            "WATCH: Wash sale rule (30-day window)"
          ]
        },
        {
          title: 'Wash Sale Rule',
          type: 'text',
          content: "Loss is disallowed if you purchase substantially identical securities within 30 days before or after the sale. Disallowed loss is added to basis of replacement shares. Rule applies across all accounts (IRA, spouse, etc.). Does NOT apply to gains—you can harvest gains and immediately repurchase."
        },
        {
          title: 'Avoiding Wash Sales',
          type: 'table',
          headers: ["Strategy", "How It Works", "Risk"],
          rows: [
            ["Wait 31 days", "Repurchase after wash period", "Market exposure gap"],
            ["Buy similar (not identical)", "Different fund, same sector", "Tracking difference"],
            ["Double up, then sell", "Buy now, sell original after 31 days", "Market risk on doubled position"],
            ["Sell in taxable, buy in IRA", "Still triggers wash sale!", "Common mistake"]
          ]
        },
        {
          title: 'Specific Identification',
          type: 'text',
          content: "When selling partial positions, specific identification allows you to choose WHICH shares to sell. This lets you control gain/loss recognition. Must identify shares before sale and receive confirmation. Default method is FIFO (first in, first out)."
        },
        {
          title: 'Charitable Giving of Appreciated Stock',
          type: 'list',
          items: [
            "Donate LTCG stock: Deduction = FMV, no capital gains tax",
            "Better than selling and donating cash (avoids embedded gain)",
            "Must hold >1 year for FMV deduction",
            "30% AGI limit for appreciated property to public charities",
            "Donate highest-gain shares for maximum benefit"
          ]
        },
        {
          title: 'Example: Stock Donation vs Cash',
          type: 'example',
          content: "Mark (24% bracket, 15% LTCG) wants to donate $10,000. He owns stock worth $10,000 with $6,000 basis.\n\nOption 1: Sell stock, donate cash\n• Capital gain: $4,000 × 15% = $600 tax\n• Charitable deduction: $10,000 × 24% = $2,400 savings\n• Net benefit: $2,400 - $600 = $1,800\n\nOption 2: Donate stock directly\n• No capital gain recognized\n• Charitable deduction: $10,000 × 24% = $2,400 savings\n• Net benefit: $2,400\n\nDonating stock saves additional $600!"
        },
        {
          title: 'Step-Up in Basis at Death',
          type: 'text',
          content: "Assets receive stepped-up basis to FMV at death (§1014). Strategy: Hold highly appreciated assets until death rather than selling. Heirs inherit with FMV basis, eliminating all embedded gain. But: Don't let tax tail wag the investment dog!"
        },
        {
          title: 'Installment Sales',
          type: 'list',
          items: [
            "Spread gain recognition over payment period",
            "Each payment = return of basis + interest + gain portion",
            "Defers tax and may spread across lower brackets",
            "Not available for publicly traded securities",
            "Depreciation recapture recognized in year of sale"
          ]
        },
        {
          title: 'Collectibles and QSBS',
          type: 'table',
          headers: ["Asset Type", "Tax Rate", "Special Rules"],
          rows: [
            ["Collectibles (art, coins)", "28% max LTCG", "Higher than standard LTCG"],
            ["Qualified Small Business Stock", "50-100% exclusion", "§1202, must hold 5+ years"],
            ["Section 1250 (real estate)", "25% on unrecaptured depreciation", "Depreciation recapture layer"]
          ]
        },
        {
          title: 'Memory Aid: Capital Gains Planning',
          type: 'callout',
          calloutType: 'tip',
          content: "'HARVEST both ways':\n• Harvest LOSSES to offset gains (mind wash sale!)\n• Harvest GAINS at 0% bracket (step up basis free!)\n• GIVE appreciated stock (skip the gain, get deduction)\n• HOLD until death (step-up erases gain)\n• IDENTIFY specific shares (control recognition)"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Wash sale applies across ALL accounts including IRAs! Selling at a loss in a brokerage account and buying the same stock in your IRA within 30 days disallows the loss AND you don't get the basis added to IRA shares. This is worse than a regular wash sale!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• LTCG rates: 0%, 15%, 20% (+3.8% NIIT if applicable)\n• Harvest gains at 0% to step up basis tax-free\n• Harvest losses to offset gains ($3,000 vs ordinary income)\n• Wash sale: 30-day rule for losses, applies across all accounts\n• Donate appreciated stock: FMV deduction, no gain recognized\n• Specific identification controls which shares are sold"
        }
      ]
    }
  },
  {
    id: 'TCP-I-007',
    section: 'TCP',
    title: "Qualified Opportunity Zones",
    description: "Leverage Qualified Opportunity Zone investments for capital gains deferral and exclusion",
    order: 7,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Tax Planning", "Qualified Opportunity Zones", "Capital Gains"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Qualified Opportunity Zones (QOZs) offer powerful tax benefits: deferral of capital gains, basis step-up, and potential permanent exclusion of new appreciation. Created by TCJA, understanding QOZ rules helps clients maximize benefits before key deadlines pass."
        },
        {
          title: 'QOZ Benefits Overview',
          type: 'table',
          headers: ["Benefit", "Requirement", "Status"],
          rows: [
            ["Deferral of original gain", "Invest in QOF within 180 days", "Available through 2026"],
            ["10% basis step-up", "Hold QOF 5+ years", "Deadline: 12/31/2026"],
            ["15% basis step-up", "Hold QOF 7+ years", "Deadline PASSED (12/31/2019)"],
            ["Exclusion of new gain", "Hold QOF 10+ years", "Still available"]
          ]
        },
        {
          title: 'How QOZ Investment Works',
          type: 'text',
          content: "Taxpayer realizes capital gain from any source → Invests gain amount in Qualified Opportunity Fund (QOF) within 180 days → QOF invests in qualified opportunity zone property → Taxpayer defers original gain, may step up basis, and excludes appreciation if held 10+ years."
        },
        {
          title: '180-Day Investment Window',
          type: 'list',
          items: [
            "Clock starts on date gain would be recognized",
            "For partnership/S corp gains: Start from K-1 year-end (unless elect earlier)",
            "Section 1231 gains: 180 days from end of tax year (netting period)",
            "Investment must be in a Qualified Opportunity Fund (QOF)",
            "Only the GAIN amount needs to be invested (not gross proceeds)"
          ]
        },
        {
          title: 'Qualified Opportunity Fund Requirements',
          type: 'list',
          items: [
            "Corporation or partnership organized for QOZ investment",
            "Self-certifies on Form 8996 with tax return",
            "90% of assets must be QOZ property (tested semi-annually)",
            "Cannot exceed 5% non-qualified financial property",
            "Can be self-created (taxpayer forms own QOF)"
          ]
        },
        {
          title: 'Qualified Opportunity Zone Property',
          type: 'table',
          headers: ["Property Type", "Requirements"],
          rows: [
            ["QOZ Stock", "Acquired after 12/31/2017, domestic corp, 70%+ tangible QOZ property"],
            ["QOZ Partnership Interest", "Acquired after 12/31/2017, domestic partnership, 70%+ tangible QOZ property"],
            ["QOZ Business Property", "Tangible property, original use in QOZ or substantially improved"],
            ["Substantial Improvement", "Additions ≥ original basis within 30 months"]
          ]
        },
        {
          title: 'Original Use vs Substantial Improvement',
          type: 'text',
          content: "Land cannot be original use (always previously existed). Buildings can be original use if never placed in service. For existing buildings, must substantially improve: additions to basis must equal or exceed original building basis within 30 months. Land is excluded from substantial improvement calculation."
        },
        {
          title: 'Example: QOZ Investment Timeline',
          type: 'example',
          content: "June 1, 2024: Mike sells stock, realizes $500,000 LTCG\nOctober 1, 2024: Invests $500,000 in QOF (within 180 days)\n\nDecember 31, 2026: Must recognize deferred gain (or sale triggers earlier)\n• If still holding: 10% basis step-up ($50,000) applies (held 5+ years by 12/31/2026)\n• Taxable gain: $500,000 - $50,000 = $450,000\n\nOctober 1, 2034: Sells QOF investment for $1,200,000 (held 10+ years)\n• New appreciation: $1,200,000 - $500,000 = $700,000\n• Tax on new appreciation: $0 (10-year exclusion)\n• Total benefit: Deferred original gain + $50k basis step-up + $700k excluded"
        },
        {
          title: 'Key Dates and Deadlines',
          type: 'table',
          headers: ["Deadline", "Significance"],
          rows: [
            ["December 31, 2026", "Deferred gains recognized (inclusion event)"],
            ["December 31, 2026", "Last date for 5-year (10%) basis step-up"],
            ["December 31, 2019", "Last date for 7-year (15%) basis step-up (PASSED)"],
            ["December 31, 2047", "QOZ designations expire"],
            ["Any earlier sale", "Triggers gain recognition"]
          ]
        },
        {
          title: 'Inclusion Events',
          type: 'list',
          items: [
            "Sale or exchange of QOF investment",
            "December 31, 2026 (mandatory inclusion)",
            "Gift of QOF interest (gain recognized, no exclusion)",
            "Death does NOT trigger inclusion (passes to heirs)",
            "Distributions: May be inclusion events depending on structure"
          ]
        },
        {
          title: 'Practical Planning Considerations',
          type: 'list',
          items: [
            "Must invest within 180 days—identify QOF quickly",
            "Can form your own QOF if investing in specific property",
            "10-year hold required for maximum benefit (no new gain)",
            "7-year deadline passed—only 10% step-up still available",
            "Gains from ANY source qualify (stocks, real estate, crypto, etc.)",
            "State tax treatment varies—some don't conform"
          ]
        },
        {
          title: 'Memory Aid: QOZ Benefits',
          type: 'callout',
          calloutType: 'tip',
          content: "'5-7-10 Rule' (now just 5-10!):\n• 5 years = 10% basis step-up on deferred gain\n• 7 years = 15% basis step-up (deadline PASSED!)\n• 10 years = NEW appreciation excluded permanently\n\n'180 days to DEFER, 10 years to DISAPPEAR'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "The 10-year exclusion only applies to APPRECIATION on the QOF investment, not the original deferred gain! The deferred gain must be recognized by December 31, 2026, regardless of holding period. The 10-year benefit is for NEW gains earned while in the QOZ."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• QOZ allows deferral of capital gains + potential permanent exclusion\n• Must invest in QOF within 180 days of gain recognition\n• 5-year hold: 10% basis step-up (by 12/31/2026)\n• 10-year hold: NEW appreciation excluded from tax\n• Deferred gain recognized by December 31, 2026\n• Any capital gain qualifies; only gain amount (not proceeds) must be invested"
        }
      ]
    }
  },
  {
    id: 'TCP-I-008',
    section: 'TCP',
    title: "Net Investment Income Tax Planning",
    description: "Minimize the 3.8% Net Investment Income Tax through strategic income classification and timing",
    order: 8,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Tax Planning", "NIIT", "Investment Income"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "The 3.8% Net Investment Income Tax (NIIT) affects higher-income taxpayers with investment income. Strategic planning can reduce or eliminate NIIT through income reclassification, timing, and threshold management. This is often overlooked in tax planning."
        },
        {
          title: 'NIIT Basics',
          type: 'text',
          content: "The 3.8% NIIT applies to the LESSER of: (1) Net Investment Income, or (2) Modified AGI exceeding the threshold. It's an additional tax on top of regular income tax and capital gains tax. Thresholds are NOT indexed for inflation."
        },
        {
          title: 'NIIT Thresholds',
          type: 'table',
          headers: ["Filing Status", "MAGI Threshold"],
          rows: [
            ["Single", "$200,000"],
            ["Married Filing Jointly", "$250,000"],
            ["Married Filing Separately", "$125,000"],
            ["Head of Household", "$200,000"]
          ]
        },
        {
          title: 'Net Investment Income Includes',
          type: 'list',
          items: [
            "Interest income (taxable and tax-exempt)",
            "Dividends (qualified and non-qualified)",
            "Capital gains (short-term and long-term)",
            "Rental and royalty income (from passive activities)",
            "Passive activity income from partnerships/S corps",
            "Annuity income (non-qualified)"
          ]
        },
        {
          title: 'NOT Subject to NIIT',
          type: 'list',
          items: [
            "Wages and self-employment income (subject to payroll taxes instead)",
            "Active trade or business income",
            "Distributions from qualified retirement plans (401k, IRA)",
            "Social Security benefits",
            "Tax-exempt interest (technically NII but reduces threshold impact)",
            "Gain on sale of principal residence (excluded portion)"
          ]
        },
        {
          title: 'Material Participation Exception',
          type: 'text',
          content: "Income from a trade or business is NOT NII if the taxpayer materially participates. This includes S corporation and partnership income where the owner is actively involved. Material participation requires meeting one of seven tests (500 hours, substantially all, etc.)."
        },
        {
          title: 'Example: NIIT Calculation',
          type: 'example',
          content: "John and Mary (MFJ) have:\n• Wages: $200,000\n• Dividends: $30,000\n• Capital gains: $50,000\n• Rental income (passive): $40,000\n\nMAGI: $320,000\nNet Investment Income: $30,000 + $50,000 + $40,000 = $120,000\nExcess over threshold: $320,000 - $250,000 = $70,000\n\nNIIT Base: Lesser of $120,000 or $70,000 = $70,000\nNIIT: $70,000 × 3.8% = $2,660"
        },
        {
          title: 'NIIT Planning Strategies',
          type: 'table',
          headers: ["Strategy", "How It Works"],
          rows: [
            ["Reduce MAGI", "Max retirement contributions, HSA, defer income"],
            ["Material participation", "Convert passive to active (meet 500-hour test)"],
            ["Installment sales", "Spread gains across years below threshold"],
            ["Roth conversions", "Plan in lower-income years"],
            ["Municipal bonds", "Interest not subject to NIIT (but still in MAGI)"],
            ["Charitable giving", "Reduce MAGI through deductions"]
          ]
        },
        {
          title: 'Real Estate Professional Exception',
          type: 'list',
          items: [
            "Rental income NOT subject to NIIT if real estate professional status",
            "Requirements: 750+ hours in real property trades/businesses",
            "More than half of personal services in real estate",
            "Must materially participate in each rental activity (or group)",
            "Significant benefit for active real estate investors"
          ]
        },
        {
          title: 'Grouping Elections',
          type: 'text',
          content: "Taxpayers can elect to group activities for material participation testing. Once made, grouping is generally irrevocable. Proper grouping can help meet the 500-hour threshold by aggregating hours across related activities. Consider grouping implications for NIIT planning."
        },
        {
          title: 'Timing Strategies',
          type: 'list',
          items: [
            "Defer capital gains to years with lower MAGI",
            "Accelerate losses to offset NII",
            "Time Roth conversions in lower-income years",
            "Harvest capital losses in high-MAGI years",
            "Bunch income/deductions across years strategically"
          ]
        },
        {
          title: 'Trust and Estate NIIT',
          type: 'text',
          content: "Trusts and estates face NIIT at much lower threshold: MAGI over $14,450 (2024). The 3.8% applies quickly. Strategy: Distribute income to beneficiaries (uses their higher thresholds). Simple trusts automatically distribute; complex trusts have flexibility."
        },
        {
          title: 'Memory Aid: NIIT Planning',
          type: 'callout',
          calloutType: 'tip',
          content: "'NIIT hits PASSIVE PIGS':\nP = Passive rental income\nI = Interest and dividends\nG = Gains (capital)\nS = S corps/partnerships (passive only)\n\nActive business income escapes! Material participation is the key escape hatch."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Retirement plan distributions are NOT subject to NIIT even though they're investment-related! The 3.8% only applies to Net Investment Income, which specifically excludes qualified plan distributions. Don't confuse NII with all investment-related income."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• 3.8% NIIT on lesser of NII or MAGI over threshold ($250k MFJ)\n• NII includes interest, dividends, capital gains, passive income\n• Active business income and wages NOT subject to NIIT\n• Material participation converts passive to active (escapes NIIT)\n• Retirement distributions exempt from NIIT\n• Trusts hit 3.8% above only $14,450—distribute to beneficiaries"
        }
      ]
    }
  },
  {
    id: 'TCP-I-009',
    section: 'TCP',
    title: "Retirement Planning: Roth vs Traditional",
    description: "Analyze Roth versus Traditional retirement account decisions for optimal tax efficiency",
    order: 9,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Tax Planning", "Retirement Planning", "Roth IRA"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "The Roth vs. Traditional decision is one of the most common and impactful tax planning questions. The answer depends on current vs. future tax rates, time horizon, and individual circumstances. CPAs must understand the analysis framework to provide proper guidance."
        },
        {
          title: 'Traditional vs Roth Comparison',
          type: 'table',
          headers: ["Feature", "Traditional IRA/401(k)", "Roth IRA/401(k)"],
          rows: [
            ["Contribution", "Pre-tax (deductible)", "After-tax (not deductible)"],
            ["Growth", "Tax-deferred", "Tax-free"],
            ["Withdrawal", "Taxed as ordinary income", "Tax-free (if qualified)"],
            ["RMDs", "Required at age 73", "None for Roth IRA*"],
            ["Income limits", "No limit for contributions**", "Income limits for Roth IRA"],
            ["Best when", "Current rate > future rate", "Future rate > current rate"]
          ]
        },
        {
          title: 'The Core Analysis',
          type: 'text',
          content: "If tax rates are EQUAL at contribution and withdrawal, Roth and Traditional produce identical after-tax results! The key question: Will your marginal rate be higher or lower in retirement? Most people assume lower rates in retirement, but this isn't always true."
        },
        {
          title: 'Mathematical Proof: Equal Rates',
          type: 'example',
          content: "$6,000 contribution, 25% tax rate both periods, 7% return, 30 years\n\nTraditional:\n• Invest $6,000 pre-tax → Grows to $45,675\n• Withdrawal taxed at 25%: $45,675 × 0.75 = $34,256\n\nRoth:\n• Pay 25% tax first: $6,000 × 0.75 = $4,500 invested\n• Grows to: $4,500 × 7.61 = $34,256 (tax-free!)\n\nSame result! The deciding factor is rate CHANGE."
        },
        {
          title: 'When Traditional Wins',
          type: 'list',
          items: [
            "High current income, lower expected retirement income",
            "Currently in peak earning years",
            "Expect to retire in low/no income tax state",
            "Planning significant charitable giving in retirement (QCDs)",
            "Need the upfront deduction for cash flow",
            "Employer match is always pre-tax (capture it!)"
          ]
        },
        {
          title: 'When Roth Wins',
          type: 'list',
          items: [
            "Currently in low tax bracket (early career, gap year)",
            "Expect higher rates in retirement (career growth, tax law changes)",
            "Large traditional balances already (RMDs will push up bracket)",
            "Want to leave tax-free inheritance",
            "Value of no RMDs (more flexibility)",
            "Estate planning benefits (heirs inherit tax-free)"
          ]
        },
        {
          title: 'Roth Conversion Analysis',
          type: 'text',
          content: "Converting Traditional to Roth triggers current income (taxable event). Best done in low-income years: sabbatical, early retirement before Social Security/RMDs, market downturns (convert at reduced value). Pay conversion tax from outside funds if possible."
        },
        {
          title: 'Roth Conversion Checklist',
          type: 'list',
          items: [
            "Is current bracket lower than expected future bracket?",
            "Can you pay tax from non-retirement funds? (Better outcome)",
            "Will conversion bump you into higher bracket or trigger IRMAA?",
            "How long until you need the funds? (Need time to recover tax cost)",
            "Are you subject to pro-rata rule? (Non-deductible basis)"
          ]
        },
        {
          title: '2024 Contribution Limits',
          type: 'table',
          headers: ["Account Type", "Under 50", "50 and Over"],
          rows: [
            ["IRA (Traditional or Roth)", "$7,000", "$8,000"],
            ["401(k) employee", "$23,000", "$30,500"],
            ["401(k) total limit", "$69,000", "$76,500"],
            ["SIMPLE IRA", "$16,000", "$19,500"]
          ]
        },
        {
          title: 'Roth IRA Income Limits (2024)',
          type: 'table',
          headers: ["Filing Status", "Full Contribution", "Phase-Out Range"],
          rows: [
            ["Single/HOH", "Under $146,000", "$146,000 - $161,000"],
            ["MFJ", "Under $230,000", "$230,000 - $240,000"],
            ["MFS", "N/A", "$0 - $10,000"]
          ]
        },
        {
          title: 'Backdoor Roth IRA',
          type: 'text',
          content: "High earners exceeding Roth IRA income limits can use 'backdoor': Contribute to non-deductible Traditional IRA, then convert to Roth. Conversion is tax-free if no pre-tax IRA balance. BEWARE: Pro-rata rule applies if you have existing Traditional IRA funds."
        },
        {
          title: 'Pro-Rata Rule Example',
          type: 'example',
          content: "Sarah has $90,000 in Traditional IRA (all pre-tax) and wants backdoor Roth.\n\nStep 1: Contributes $7,000 non-deductible to Traditional IRA\nTotal IRA: $97,000 ($90,000 pre-tax + $7,000 after-tax)\n\nStep 2: Converts $7,000 to Roth\nTaxable portion: $7,000 × ($90,000/$97,000) = $6,495\nTax-free portion: $7,000 × ($7,000/$97,000) = $505\n\nThe pro-rata rule makes backdoor Roth less effective when pre-tax IRA balances exist. Consider rolling Traditional IRA into 401(k) first!"
        },
        {
          title: 'SECURE Act 2.0 Changes',
          type: 'list',
          items: [
            "Roth 401(k): No longer subject to RMDs (starting 2024)",
            "Higher catch-up for ages 60-63: $10,000 (starting 2025)",
            "Employer match can go to Roth (employee's choice)",
            "529 to Roth IRA rollovers (limits apply)",
            "RMD age increased to 73 (2023), then 75 (2033)"
          ]
        },
        {
          title: 'Memory Aid: Roth vs Traditional',
          type: 'callout',
          calloutType: 'tip',
          content: "'Pay taxes when CHEAPER':\n• Low bracket now? → Roth (pay tax now at low rate)\n• High bracket now? → Traditional (defer to lower rate)\n• Equal rates? → Roth (flexibility, no RMDs, estate benefits)\n• Uncertain? → Diversify between both (tax diversification)"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "The pro-rata rule for Roth conversions considers ALL Traditional IRAs (including SEP and SIMPLE after 2 years), not just the one you're converting. You can't isolate non-deductible contributions for tax-free conversion if you have ANY pre-tax IRA funds!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Equal tax rates = equal outcomes; rate CHANGE determines winner\n• Traditional: Deduction now, taxed at withdrawal (higher rate now favors)\n• Roth: No deduction, tax-free withdrawal (lower rate now favors)\n• Roth conversion best in low-income years; pay tax from outside funds\n• Backdoor Roth for high earners; watch pro-rata rule\n• Tax diversification (some in each) provides flexibility"
        }
      ]
    }
  },
  {
    id: 'TCP-I-010',
    section: 'TCP',
    title: "Charitable Giving Strategies",
    description: "Maximize tax benefits through strategic charitable contribution planning",
    order: 10,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Tax Planning", "Charitable Contributions", "Philanthropy"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Charitable giving offers significant tax planning opportunities, but the rules are complex. Choosing the right asset to donate, timing contributions effectively, and using advanced vehicles can dramatically increase both the tax benefit and philanthropic impact."
        },
        {
          title: 'AGI Limitations by Contribution Type',
          type: 'table',
          headers: ["Contribution Type", "Public Charity", "Private Foundation"],
          rows: [
            ["Cash", "60% AGI", "30% AGI"],
            ["LTCG property (FMV)", "30% AGI", "20% AGI"],
            ["LTCG property (basis)", "50% AGI", "N/A"],
            ["Ordinary income property", "50% AGI (basis)", "30% AGI (basis)"],
            ["Carryforward", "5 years", "5 years"]
          ]
        },
        {
          title: 'Appreciated Property Strategy',
          type: 'text',
          content: "Donating long-term appreciated property provides a double benefit: (1) Deduction for full fair market value, and (2) No capital gains tax on appreciation. This is almost always better than selling and donating cash. Must hold property >1 year for FMV deduction."
        },
        {
          title: 'Example: Appreciated Stock Donation',
          type: 'example',
          content: "Alice (32% bracket, 15% LTCG) wants to donate $50,000 to charity. She owns stock worth $50,000 with $10,000 basis.\n\nOption 1: Sell stock, donate cash\n• Capital gain: $40,000 × 15% = $6,000 tax\n• NIIT (3.8% if applicable): $40,000 × 3.8% = $1,520\n• Deduction value: $50,000 × 32% = $16,000\n• Net benefit: $16,000 - $7,520 = $8,480\n\nOption 2: Donate stock directly\n• No capital gain recognized\n• Deduction value: $50,000 × 32% = $16,000\n• Net benefit: $16,000\n\nStock donation saves $7,520 in avoided taxes!"
        },
        {
          title: 'Donor-Advised Funds (DAFs)',
          type: 'list',
          items: [
            "Immediate deduction in year of contribution",
            "Distributions to charities made over time at donor's recommendation",
            "Ideal for bunching strategy (large deduction in high-income year)",
            "Can contribute cash, securities, or other assets",
            "No minimum distribution requirement",
            "Contribution is irrevocable—cannot take back funds"
          ]
        },
        {
          title: 'Qualified Charitable Distributions (QCDs)',
          type: 'text',
          content: "Age 70½+ can transfer up to $105,000 (2024) directly from IRA to charity. QCD is excluded from gross income entirely—better than deduction! Counts toward RMD. Not available from 401(k) or employer plans."
        },
        {
          title: 'QCD vs Itemized Deduction',
          type: 'example',
          content: "Bob, age 72, wants to give $10,000 to charity. Takes standard deduction.\n\nOption 1: Withdraw IRA, donate cash\n• IRA withdrawal: $10,000 income\n• No deduction benefit (standard deduction)\n• Tax at 22%: $2,200\n• Net cost: $2,200\n\nOption 2: QCD from IRA\n• $10,000 never included in income\n• Tax: $0\n• Also satisfies RMD!\n\nQCD saves $2,200 AND reduces AGI (helps Medicare premiums, Social Security taxation, etc.)"
        },
        {
          title: 'Charitable Remainder Trusts (CRTs)',
          type: 'table',
          headers: ["Feature", "CRAT", "CRUT"],
          rows: [
            ["Payment type", "Fixed annuity", "Fixed % of annual value"],
            ["Additional contributions", "Not allowed", "Allowed"],
            ["Growth impact", "Payments don't change", "Payments fluctuate with value"],
            ["Inflation hedge", "No", "Yes (if assets grow)"],
            ["Minimum payout", "5%", "5%"],
            ["Maximum payout", "50%", "50%"]
          ]
        },
        {
          title: 'CRT Benefits',
          type: 'list',
          items: [
            "Immediate partial charitable deduction (present value of remainder)",
            "Avoid capital gains on contributed appreciated property",
            "Income stream for life or term of years (max 20)",
            "Remainder goes to charity at termination",
            "Can diversify concentrated stock position without immediate tax"
          ]
        },
        {
          title: 'Charitable Lead Trusts (CLTs)',
          type: 'text',
          content: "Opposite of CRT: Charity receives income stream first, remainder goes to non-charitable beneficiaries (family). Used for estate planning—freeze gift/estate value while passing future growth to heirs. Grantor CLT gives income tax deduction; non-grantor gives gift/estate tax deduction."
        },
        {
          title: 'Private Foundations',
          type: 'list',
          items: [
            "Family controls charitable giving permanently",
            "5% minimum annual distribution requirement",
            "Lower AGI limits (30% cash, 20% LTCG property)",
            "Excise tax on investment income (1.39%)",
            "Self-dealing rules restrict transactions with insiders",
            "More administrative burden than DAF"
          ]
        },
        {
          title: 'Substantiation Requirements',
          type: 'table',
          headers: ["Donation Amount", "Documentation Required"],
          rows: [
            ["Under $250", "Bank record or receipt"],
            ["$250+", "Written acknowledgment from charity"],
            ["$250+ non-cash", "Acknowledgment + description of property"],
            ["$500+ non-cash", "Form 8283, Section A"],
            ["$5,000+ non-cash", "Qualified appraisal + Form 8283, Section B"],
            ["Publicly traded stock", "No appraisal needed (market value)"]
          ]
        },
        {
          title: 'Memory Aid: Charitable Vehicles',
          type: 'callout',
          calloutType: 'tip',
          content: "'DAF = Donate And Forget (charity waits)'\n'CRT = Charity Remainder Trust (YOU get income now, charity later)'\n'CLT = Charity Leads Trust (CHARITY gets income now, heirs later)'\n'QCD = Quietly Contributes Directly (skips your return entirely)'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Appreciated property held ≤1 year only gets BASIS deduction, not FMV! The FMV deduction requires long-term holding (>1 year). Also, tangible personal property (art, collectibles) only gets FMV deduction if the charity's use is related to its exempt purpose."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Donate LTCG appreciated property for FMV deduction + avoid capital gains\n• DAFs enable bunching (big deduction now, give over time)\n• QCDs (70½+) excluded from income—better than deduction for non-itemizers\n• CRTs provide income + deduction + capital gain avoidance\n• 60% AGI limit for cash; 30% for LTCG property to public charities\n• Substantiation requirements vary by amount and property type"
        }
      ]
    }
  },
  {
    id: 'TCP-II-001',
    section: 'TCP',
    title: "Entity Selection: Comprehensive Comparison",
    description: "Master entity selection analysis considering tax, liability, and operational factors",
    order: 11,
    duration: 65,
    difficulty: 'advanced',
    topics: ["Entity Planning", "Business Formation", "Tax Planning"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Entity selection is a foundational business decision with significant and often irreversible tax consequences. CPAs must analyze multiple factors—tax rates, liability protection, operational flexibility, exit planning—to recommend the optimal structure."
        },
        {
          title: 'Entity Comparison Overview',
          type: 'table',
          headers: ["Feature", "Sole Prop", "Partnership", "S Corp", "C Corp", "LLC"],
          rows: [
            ["Limited liability", "No", "General: No; LP: Yes", "Yes", "Yes", "Yes"],
            ["Entity-level tax", "No", "No", "No", "Yes (21%)", "Default: No*"],
            ["Pass-through", "Yes", "Yes", "Yes", "No", "Default: Yes*"],
            ["Self-employment tax", "Yes", "GP: Yes", "Wages only", "No pass-through", "Depends on election"],
            ["Ownership flexibility", "N/A", "High", "Limited", "High", "High"],
            ["Basis from debt", "N/A", "Yes", "Limited", "No", "Depends on election"]
          ]
        },
        {
          title: 'Tax Rate Comparison (2024)',
          type: 'table',
          headers: ["Entity", "Tax Rate", "Additional Taxes"],
          rows: [
            ["Sole Proprietorship", "10-37% individual rates", "SE tax 15.3%"],
            ["Partnership", "10-37% to partners", "SE tax on GP shares"],
            ["S Corporation", "10-37% to shareholders", "FICA on wages only"],
            ["C Corporation", "21% flat", "Second tax on dividends (0-23.8%)"],
            ["LLC (default)", "Same as sole prop/partnership", "Depends on classification"]
          ]
        },
        {
          title: 'Self-Employment Tax Savings',
          type: 'text',
          content: "S corporations can reduce SE/payroll taxes by splitting income between 'reasonable compensation' (subject to FICA) and distributions (not subject to FICA). But compensation must be reasonable—IRS challenges unreasonably low salaries."
        },
        {
          title: 'Example: S Corp SE Tax Savings',
          type: 'example',
          content: "Sarah's consulting LLC earns $200,000 net profit.\n\nAs Sole Proprietor:\n• SE tax: $200,000 × 92.35% × 15.3% = $28,260\n\nAs S Corporation (reasonable salary $100,000):\n• FICA on salary: $100,000 × 7.65% = $7,650 (employee share)\n• Employer share: $7,650 (deductible)\n• Total: $15,300 (vs $28,260)\n• Distribution: $100,000 (no FICA)\n• Savings: ~$13,000 annually!\n\nBut: Payroll compliance costs, reasonable comp risk."
        },
        {
          title: 'Section 199A Deduction',
          type: 'text',
          content: "Pass-through entities may qualify for 20% deduction on Qualified Business Income. S corps, partnerships, and sole props benefit; C corps don't (but have 21% rate). Limits apply based on: wages paid, qualified property, specified service businesses, and taxable income."
        },
        {
          title: 'C Corporation Considerations',
          type: 'list',
          items: [
            "21% flat rate (lower than top individual rate of 37%)",
            "Double taxation on distributions (corp tax + dividend tax)",
            "Accumulated earnings can defer second level of tax",
            "QSBS exclusion potential (§1202): Up to 100% gain exclusion",
            "Preferred for venture capital/IPO (unlimited shareholders, classes)",
            "Foreign tax credit stacking opportunities"
          ]
        },
        {
          title: 'S Corporation Limitations',
          type: 'list',
          items: [
            "Maximum 100 shareholders",
            "Only individuals, estates, certain trusts (no corps/partnerships)",
            "One class of stock only",
            "Must be domestic corporation",
            "No nonresident alien shareholders",
            "Limited basis from debt (shareholder loans only)"
          ]
        },
        {
          title: 'Partnership Advantages',
          type: 'list',
          items: [
            "Flexible allocations (§704(b) substantial economic effect)",
            "Basis includes share of all partnership debt",
            "Special allocations of specific items (depreciation, gains)",
            "No double taxation; no entity-level tax",
            "Can have corporate, foreign, tax-exempt partners",
            "Profits interests for employees (tax-advantaged compensation)"
          ]
        },
        {
          title: 'Decision Framework',
          type: 'table',
          headers: ["If Priority Is...", "Consider..."],
          rows: [
            ["Simplicity, low cost", "Sole prop or single-member LLC"],
            ["Reducing SE tax", "S corporation"],
            ["Flexible allocations", "Partnership (or LLC taxed as partnership)"],
            ["Raising VC/IPO path", "C corporation"],
            ["QSBS exclusion", "C corporation (watch requirements)"],
            ["Retaining earnings at low rate", "C corporation (21%)"],
            ["Multiple owners, different contributions", "Partnership or LLC"]
          ]
        },
        {
          title: 'Liability Considerations',
          type: 'text',
          content: "All corporations and LLCs provide liability protection, but: personal guarantees override protection; professional malpractice still personal; veil piercing risks if formalities not followed. Sole props and general partners have unlimited personal liability."
        },
        {
          title: 'Exit/Sale Considerations',
          type: 'table',
          headers: ["Entity", "Asset Sale", "Equity Sale"],
          rows: [
            ["Sole Prop", "Only option", "N/A"],
            ["Partnership", "Pass-through gain/loss", "Interest sale, buyer gets carryover basis"],
            ["S Corporation", "Pass-through gain", "Stock sale, no basis step-up"],
            ["C Corporation", "Double tax (corp + shareholders)", "Stock sale preferred, no step-up"]
          ]
        },
        {
          title: 'Memory Aid: Entity Selection',
          type: 'callout',
          calloutType: 'tip',
          content: "'SELF-EMPLOYED? Think SPIT':\nS = S corp saves SE tax (with reasonable comp)\nP = Partnership for flexibility & debt basis\nI = Individual/sole prop for simplicity\nT = Tax integration: C corp 21% + dividend vs pass-through 37%\n\nRemember: No perfect answer—it depends on facts!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "S corporation distributions above basis create CAPITAL GAIN, not ordinary income. C corporation distributions are dividends (qualified or non-qualified). Know the character difference! Also: S corp losses limited to stock + debt basis; partnerships include share of ALL debt."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• S corp can reduce SE tax by splitting wages/distributions (reasonable comp required)\n• C corp: 21% rate but double taxation on distributions\n• Partnership: Flexible allocations, basis from all debt\n• §199A: 20% deduction for pass-throughs (limitations apply)\n• QSBS (§1202) can exclude 100% of C corp gain\n• Exit strategy matters: Asset vs equity sale implications differ by entity"
        }
      ]
    }
  },
  {
    id: 'TCP-II-002',
    section: 'TCP',
    title: "Check-the-Box Regulations",
    description: "Navigate entity classification elections under the check-the-box regulations",
    order: 12,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Entity Planning", "Check-the-Box", "Entity Classification"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "The check-the-box regulations give taxpayers flexibility to choose how eligible entities are taxed. Understanding default classifications and election options is essential for entity planning, restructuring, and optimizing tax treatment."
        },
        {
          title: 'Check-the-Box Overview',
          type: 'text',
          content: "Treasury Regulations §301.7701 allow 'eligible entities' to elect their federal tax classification. An LLC can be taxed as a sole proprietorship, partnership, S corporation, or C corporation. The election is made on Form 8832."
        },
        {
          title: 'Entity Classification Rules',
          type: 'table',
          headers: ["Entity Type", "Classification Options"],
          rows: [
            ["Corporation (Inc., Corp.)", "Must be corporation (no election)"],
            ["LLC - 1 member", "Default: Disregarded; Elect: Corp"],
            ["LLC - 2+ members", "Default: Partnership; Elect: Corp"],
            ["Limited Partnership", "Default: Partnership; Elect: Corp"],
            ["General Partnership", "Default: Partnership; Elect: Corp"],
            ["Foreign entity", "Specific per-country rules apply"]
          ]
        },
        {
          title: 'Default Classifications',
          type: 'list',
          items: [
            "Single-member LLC: Disregarded entity (Schedule C or branch of owner)",
            "Multi-member LLC: Partnership (Form 1065)",
            "Business trusts: Generally taxed as corporations",
            "State law corporations: Always corporations (no choice)",
            "Publicly traded partnerships: Treated as corporations"
          ]
        },
        {
          title: 'Making the Election',
          type: 'table',
          headers: ["Item", "Details"],
          rows: [
            ["Form", "Form 8832, Entity Classification Election"],
            ["When", "Effective up to 75 days before OR 12 months after filing"],
            ["Who signs", "All members/owner(s) or authorized officer"],
            ["Automatic", "S election (Form 2553) includes Corp election"],
            ["60-month rule", "Can't change again for 60 months (exceptions apply)"]
          ]
        },
        {
          title: 'S Corporation Election',
          type: 'text',
          content: "To be taxed as an S corp, an LLC must: (1) Be classified as a corporation (Form 8832 or formed as Inc.), then (2) Elect S status (Form 2553). Shortcut: Filing Form 2553 for an LLC is treated as electing both corp status and S status."
        },
        {
          title: 'Example: LLC to S Corp',
          type: 'example',
          content: "Tech Solutions LLC (2 members) wants S corp treatment starting January 1, 2025.\n\nOption 1: Two-step process\n• Form 8832 to elect corporation (effective 1/1/2025)\n• Form 2553 to elect S corp (due by 3/15/2025)\n\nOption 2: Shortcut\n• Form 2553 only (with late election relief if needed)\n• IRS treats this as electing corp AND S corp\n\nResult: LLC taxed as S corporation starting 1/1/2025"
        },
        {
          title: 'Tax Consequences of Election Changes',
          type: 'table',
          headers: ["Change", "Tax Consequence"],
          rows: [
            ["Partnership → Corporation", "Treated as contribution under §351 (generally tax-free)"],
            ["Corporation → Partnership", "Treated as liquidation + contribution (taxable!)"],
            ["Disregarded → Partnership", "Contribution of assets (generally tax-free)"],
            ["Partnership → Disregarded", "Liquidating distribution (basis determines gain/loss)"]
          ]
        },
        {
          title: 'Conversion to Corporation',
          type: 'text',
          content: "When a partnership elects corporation status, it's treated as if the partnership contributed all assets to a new corporation in exchange for stock under §351. Generally tax-free if requirements met. Built-in gains may be subject to later recognition."
        },
        {
          title: 'Conversion FROM Corporation',
          type: 'callout',
          calloutType: 'warning',
          content: "Converting FROM corporation to partnership is TAXABLE! Treated as a corporate liquidation followed by contribution to partnership. Corporation recognizes gain on appreciated assets; shareholders recognize gain/loss on deemed distribution. Avoid this—plan entity choice upfront!"
        },
        {
          title: '60-Month Limitation',
          type: 'list',
          items: [
            "After electing, can't change classification for 60 months",
            "Exceptions: Change in ownership (50%+), IRS approval",
            "Applies to the specific entity, not successors",
            "Purpose: Prevent whipsaw planning (frequent changes)",
            "New entity can choose any classification immediately"
          ]
        },
        {
          title: 'Disregarded Entity Uses',
          type: 'list',
          items: [
            "Single-member LLC owned by individual: Schedule C, E, or F",
            "Single-member LLC owned by corporation: Branch of parent",
            "QSub (Qualified S Subsidiary): Disregarded for income tax",
            "Employment taxes: May be treated as separate for FICA purposes",
            "State law: May still require separate state filings"
          ]
        },
        {
          title: 'Foreign Entity Classification',
          type: 'table',
          headers: ["Entity Type", "Default Classification"],
          rows: [
            ["Per se corporations", "Corporation (listed entities)"],
            ["Limited liability, 2+ members", "Partnership"],
            ["Limited liability, 1 member", "Disregarded"],
            ["Unlimited liability, 2+ members", "Partnership"],
            ["Unlimited liability, 1 member", "Disregarded"]
          ]
        },
        {
          title: 'Memory Aid: Check-the-Box',
          type: 'callout',
          calloutType: 'tip',
          content: "'LLC = Lots of Classification Choices':\n• 1 member: Disregarded (Schedule C) or Corporation\n• 2+ members: Partnership or Corporation\n• Corporation: Add S election for pass-through\n\n'Into corp = free; Out of corp = fee (taxable!)'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "An LLC cannot directly elect S corporation status. It must first be classified as a corporation, then elect S status. However, filing Form 2553 alone is treated as making BOTH elections. Don't confuse Form 8832 (entity classification) with Form 2553 (S election)."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Check-the-box allows eligible entities to choose tax classification\n• Single-member LLC default: Disregarded; Multi-member: Partnership\n• Form 8832 for entity classification; Form 2553 for S election\n• Partnership → Corp: Generally tax-free (§351)\n• Corp → Partnership: Taxable liquidation (avoid!)\n• 60-month rule limits frequent changes"
        }
      ]
    }
  },
  {
    id: 'TCP-II-003',
    section: 'TCP',
    title: "State Tax Considerations: Nexus",
    description: "Understand state tax nexus rules and multistate taxation triggers",
    order: 13,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Entity Planning", "State Tax", "Nexus"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "State taxes can significantly impact total tax burden and business structure decisions. Understanding nexus—the connection requiring a business to pay taxes in a state—is essential for compliance and planning in our increasingly mobile, multistate economy."
        },
        {
          title: 'What Is Nexus?',
          type: 'text',
          content: "Nexus is a sufficient connection between a taxpayer and a state that allows the state to impose a tax obligation. The threshold varies by state and tax type (income, sales, franchise). Constitutional limits (Due Process and Commerce Clause) require minimum contacts."
        },
        {
          title: 'Types of Nexus',
          type: 'table',
          headers: ["Type", "Description", "Examples"],
          rows: [
            ["Physical nexus", "Physical presence in state", "Office, warehouse, employees, inventory"],
            ["Economic nexus", "Sufficient economic activity", "Sales exceeding threshold ($100k or 200 transactions)"],
            ["Factor nexus", "Apportionment factor presence", "Sales, payroll, or property in state"],
            ["Agency nexus", "Third party acting on behalf", "Independent contractors, affiliates"],
            ["Click-through nexus", "In-state referral arrangements", "Affiliate marketing programs"]
          ]
        },
        {
          title: 'South Dakota v. Wayfair (2018)',
          type: 'text',
          content: "The Supreme Court overturned Quill, allowing states to require sales tax collection based on economic nexus alone—no physical presence required. Most states adopted $100,000 sales OR 200 transactions threshold. This revolutionized multistate tax compliance."
        },
        {
          title: 'Common Economic Nexus Thresholds (Sales Tax)',
          type: 'table',
          headers: ["Threshold Type", "Common Standard"],
          rows: [
            ["Sales revenue", "$100,000 in state"],
            ["Transactions", "200 or more transactions"],
            ["Combined test", "Either threshold triggers nexus"],
            ["Some states", "Revenue only (no transaction count)"]
          ]
        },
        {
          title: 'Income Tax Nexus',
          type: 'list',
          items: [
            "P.L. 86-272: Federal protection for solicitation of tangible goods only",
            "Does NOT protect: Services, intangibles, digital goods",
            "Many states interpret P.L. 86-272 narrowly",
            "Economic nexus for income tax expanding post-Wayfair",
            "Factor presence nexus: Property, payroll, or sales in state"
          ]
        },
        {
          title: 'P.L. 86-272 Protection',
          type: 'text',
          content: "Public Law 86-272 prohibits states from taxing income derived from interstate commerce if the only activity is solicitation of orders for tangible personal property. Orders must be approved and fulfilled outside the state. ANY activity beyond solicitation voids protection."
        },
        {
          title: 'Activities That Void P.L. 86-272',
          type: 'list',
          items: [
            "Maintaining inventory in state (beyond samples)",
            "Service or repair activities",
            "Installation of products",
            "Technical assistance or training",
            "Investigating creditworthiness",
            "Collecting delinquent accounts",
            "Website interactivity (MTC interpretation)"
          ]
        },
        {
          title: 'Franchise/Gross Receipts Taxes',
          type: 'table',
          headers: ["State", "Tax Type", "Nexus Standard"],
          rows: [
            ["Texas", "Franchise (margin) tax", "Doing business in state"],
            ["Washington", "B&O tax", "Economic nexus similar to sales tax"],
            ["Ohio", "CAT (Commercial Activity Tax)", "$500k sales threshold"],
            ["Delaware", "Franchise tax", "Formed or qualified in state"],
            ["Nevada", "Commerce tax", "$4M+ gross revenue"]
          ]
        },
        {
          title: 'Pass-Through Entity Nexus',
          type: 'text',
          content: "Partners and S corp shareholders may have nexus in states where the entity operates, regardless of the owner's home state. Many states impose withholding on pass-through income to nonresidents. Composite returns may be available."
        },
        {
          title: 'Planning Strategies',
          type: 'list',
          items: [
            "Monitor economic nexus thresholds in all states with sales",
            "Evaluate P.L. 86-272 protection carefully (activities matter)",
            "Consider entity structure to isolate state exposure",
            "Review employee work locations (especially remote work)",
            "Use nexus questionnaires/studies before expanding",
            "Implement sales tax automation for multi-state sellers"
          ]
        },
        {
          title: 'Remote Work Implications',
          type: 'callout',
          calloutType: 'warning',
          content: "Remote workers can create nexus! An employee working from home in State X may create income tax nexus, sales tax nexus, and withholding obligations for the employer. Post-COVID, this is a major compliance issue. Track where employees work and for how long."
        },
        {
          title: 'Memory Aid: Nexus Types',
          type: 'callout',
          calloutType: 'tip',
          content: "'PEACE creates nexus':\nP = Physical presence (property, people)\nE = Economic activity (Wayfair thresholds)\nA = Agency relationships (representatives)\nC = Click-through (affiliate links)\nE = Employee presence (including remote)\n\nAny of these can trigger state tax obligations!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "P.L. 86-272 only protects against INCOME tax—not sales tax, franchise tax, or other taxes. And it only covers solicitation of TANGIBLE personal property, not services or intangibles. Many candidates over-apply this protection!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Nexus is the connection allowing a state to impose tax\n• Economic nexus (Wayfair): $100k sales or 200 transactions for sales tax\n• P.L. 86-272: Limited protection for solicitation of tangible goods\n• Remote workers can create nexus in their work state\n• Pass-through owners may have nexus where entity operates\n• Different nexus standards for income, sales, franchise taxes"
        }
      ]
    }
  },
  {
    id: 'TCP-II-004',
    section: 'TCP',
    title: "State Apportionment Formulas",
    description: "Apply state income apportionment formulas to allocate multistate business income",
    order: 14,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Entity Planning", "State Tax", "Apportionment"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "When a business operates in multiple states, each state taxes only its portion of the business income. Apportionment formulas determine that portion. Understanding these formulas enables tax planning through strategic location of sales, property, and payroll."
        },
        {
          title: 'Apportionment vs Allocation',
          type: 'table',
          headers: ["Concept", "Definition", "Example"],
          rows: [
            ["Apportionment", "Dividing business income among states by formula", "Operating profit split by sales/property/payroll"],
            ["Allocation", "Assigning specific items to specific states", "Real estate gains to property state"],
            ["Business income", "From regular operations, apportioned", "Sales revenue, service income"],
            ["Non-business income", "Not regular operations, allocated", "Passive investment gains"]
          ]
        },
        {
          title: 'Traditional Three-Factor Formula',
          type: 'text',
          content: "The traditional UDITPA formula equally weights three factors: Property, Payroll, and Sales. Each factor compares in-state activity to everywhere activity. The average determines the apportionment percentage.\n\nApportionment % = (Property% + Payroll% + Sales%) ÷ 3"
        },
        {
          title: 'Factor Calculations',
          type: 'table',
          headers: ["Factor", "Numerator", "Denominator"],
          rows: [
            ["Property", "Average value of real/tangible property in state", "Average value everywhere"],
            ["Payroll", "Compensation paid to employees in state", "Total compensation everywhere"],
            ["Sales", "Sales sourced to state", "Total sales everywhere"],
            ["Rent", "Rent × 8 = property equivalent", "Include in property factor"]
          ]
        },
        {
          title: 'Modern Trend: Single Sales Factor',
          type: 'text',
          content: "Most states have moved to single sales factor (SSF) apportionment, weighting sales at 100%. This benefits companies with in-state property and payroll selling out-of-state. It disadvantages companies selling INTO the state from elsewhere."
        },
        {
          title: 'State Formula Variations',
          type: 'table',
          headers: ["Formula Type", "Example States"],
          rows: [
            ["Single Sales Factor", "CA, NY, TX, IL, PA, and most states"],
            ["Double-weighted sales", "Some states (declining)"],
            ["Three-factor equal", "Few remaining states"],
            ["Modified formulas", "Industry-specific rules"]
          ]
        },
        {
          title: 'Example: Three-Factor vs Single Sales',
          type: 'example',
          content: "TechCorp has:\n• Property: 80% in State A, 20% in State B\n• Payroll: 90% in State A, 10% in State B\n• Sales: 30% in State A, 70% in State B\n\nThree-Factor (State A):\n(80% + 90% + 30%) ÷ 3 = 66.7% apportioned to A\n\nSingle Sales Factor (State A):\n30% apportioned to A\n\nIf State A has higher rates, single sales factor is advantageous—more income apportioned to State B where TechCorp has lower physical presence."
        },
        {
          title: 'Sales Factor Sourcing',
          type: 'table',
          headers: ["Transaction Type", "Sourcing Rule"],
          rows: [
            ["Tangible goods", "Destination (delivery location)"],
            ["Services (traditional)", "Cost of performance (where performed)"],
            ["Services (market-based)", "Market (where benefit received)"],
            ["Intangibles", "Varies by state"],
            ["Digital goods", "Customer location (generally)"]
          ]
        },
        {
          title: 'Market-Based Sourcing',
          type: 'text',
          content: "Most states now use market-based sourcing for services: Sales are sourced to where the customer receives benefit, not where services are performed. This shifts tax burden to states with customers rather than states with operations."
        },
        {
          title: 'Throwback and Throwout Rules',
          type: 'list',
          items: [
            "Throwback: Sales to states where company has no nexus are 'thrown back' to origination state",
            "Throwout: Sales with no nexus are excluded from both numerator AND denominator",
            "Purpose: Prevent 'nowhere income' that escapes all state tax",
            "Planning: Establish nexus strategically to minimize throwback",
            "Approximately half of states have throwback rules"
          ]
        },
        {
          title: 'Planning Strategies',
          type: 'list',
          items: [
            "Locate property and payroll in states without income tax or with low rates",
            "In single-sales-factor states, in-state operations don't increase tax",
            "Evaluate market-based sourcing impact on service businesses",
            "Consider throwback rules when choosing operational locations",
            "Monitor state law changes—formula modifications are common"
          ]
        },
        {
          title: 'Special Industry Rules',
          type: 'table',
          headers: ["Industry", "Special Apportionment"],
          rows: [
            ["Financial institutions", "Receipts-based formulas"],
            ["Transportation", "Revenue miles, special rules"],
            ["Telecommunications", "Traffic-based factors"],
            ["Publishers", "Circulation-based"],
            ["Airlines", "Revenue passenger miles"]
          ]
        },
        {
          title: 'Memory Aid: Apportionment Factors',
          type: 'callout',
          calloutType: 'tip',
          content: "'P.P.S. = Property, Payroll, Sales'\nTraditional: Each factor weighted equally (33.3%)\nModern: 'Single Sales Factor' = Sales only (100%)\n\n'Throwback = Throw it Back home if nowhere to go'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Don't assume all states use the same formula! Single sales factor is most common, but some states still use three-factor or variations. Also, service sourcing differs: market-based (customer location) vs. cost of performance (where work done). Know both methods."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Apportionment divides business income among states by formula\n• Traditional: (Property + Payroll + Sales) ÷ 3\n• Most states now use single sales factor (100% sales)\n• Sales sourcing: Destination for goods; market-based for services (usually)\n• Throwback rules assign 'nowhere' sales to origination state\n• Single sales factor benefits companies with in-state operations selling out-of-state"
        }
      ]
    }
  },
  {
    id: 'TCP-II-005',
    section: 'TCP',
    title: "Reasonable Compensation Planning",
    description: "Navigate reasonable compensation requirements and optimize owner compensation structures",
    order: 15,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Entity Planning", "Reasonable Compensation", "Payroll Tax"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Reasonable compensation is a critical issue for S corporations and C corporations. Too low triggers IRS recharacterization and penalties; too high wastes money on payroll taxes (S corp) or creates deduction/accumulation issues (C corp). Finding the right balance requires understanding the factors and risks."
        },
        {
          title: 'S Corporation Compensation Issue',
          type: 'text',
          content: "S corporation shareholder-employees must receive reasonable compensation for services. Unlike distributions, wages are subject to FICA (15.3% combined). The temptation: Minimize wages, maximize distributions. The risk: IRS recharacterizes distributions as wages, plus penalties."
        },
        {
          title: 'S Corp Wage vs Distribution',
          type: 'table',
          headers: ["Payment Type", "FICA Tax", "Income Tax", "Deductible to Corp?"],
          rows: [
            ["Wages", "Yes (15.3%/7.65%)", "Yes (ordinary)", "Yes"],
            ["Distributions", "No", "Already taxed via pass-through", "N/A (not expense)"]
          ]
        },
        {
          title: 'IRS Factors for Reasonable Compensation',
          type: 'list',
          items: [
            "Training, education, and experience",
            "Duties and responsibilities",
            "Time devoted to the business",
            "Comparable pay for similar positions in similar businesses",
            "Size and complexity of business",
            "General economic conditions",
            "Salary history and dividend history",
            "Arm's length relationship test"
          ]
        },
        {
          title: 'Methods to Determine Reasonable Compensation',
          type: 'table',
          headers: ["Method", "Description", "Usefulness"],
          rows: [
            ["Comparable salaries", "Survey data for similar positions", "High—primary method"],
            ["Independent investor test", "Would investor accept this return?", "Moderate"],
            ["Return on equity", "Implicit return after reasonable comp", "Supporting evidence"],
            ["Cost of replacing", "What would replacement cost?", "Supporting evidence"]
          ]
        },
        {
          title: 'Example: Reasonable Compensation Analysis',
          type: 'example',
          content: "Dr. Smith operates a solo dental practice as an S corp.\nNet profit: $400,000\nRole: Full-time dentist, manager, owner\n\nAnalysis:\n• Comparable dentist salary: $180,000 - $220,000\n• Practice management duties: $30,000 - $50,000 value\n• Total reasonable range: $210,000 - $270,000\n\nRecommendation: $240,000 salary; $160,000 distribution\n• FICA savings vs all salary: ~$24,000 annually\n• Within defensible range if challenged\n\nRisky: $80,000 salary would likely be challenged."
        },
        {
          title: 'Red Flags for IRS Challenge',
          type: 'list',
          items: [
            "Wages significantly below comparable positions",
            "Zero or minimal wages with large distributions",
            "Wages that don't increase with business growth",
            "All profits paid as distributions (no reasonable wage component)",
            "Shareholder provides substantial services but minimal wage",
            "Inconsistent treatment year-to-year"
          ]
        },
        {
          title: 'Consequences of Unreasonably Low S Corp Wages',
          type: 'list',
          items: [
            "IRS recharacterizes distributions as wages",
            "Back FICA taxes owed (both employer and employee shares)",
            "Interest on late tax payments",
            "Potential accuracy-related penalties (20%)",
            "Professional liability for advisors"
          ]
        },
        {
          title: 'C Corporation Compensation Issues',
          type: 'text',
          content: "For C corps, the issue flips: High compensation is deductible but may be challenged as excessive. IRS may recharacterize excessive compensation as dividends (not deductible, double-taxed). Also: §162(m) limits deduction for covered employees of public companies to $1M."
        },
        {
          title: 'C Corp Excessive Compensation',
          type: 'table',
          headers: ["If Compensation Is...", "Tax Effect"],
          rows: [
            ["Reasonable", "Fully deductible by corporation"],
            ["Excessive (recharacterized)", "Excess treated as dividend (no deduction)"],
            ["Disguised dividend", "Double tax: Corp tax + shareholder dividend tax"]
          ]
        },
        {
          title: 'Documentation Best Practices',
          type: 'list',
          items: [
            "Obtain salary surveys for comparable positions",
            "Document owner's time, duties, and responsibilities",
            "Prepare written compensation policy or analysis",
            "Consider formal compensation study for high amounts",
            "Review and update analysis annually",
            "Keep minutes documenting board approval of compensation"
          ]
        },
        {
          title: 'Section 199A Interaction',
          type: 'callout',
          calloutType: 'tip',
          content: "For §199A, W-2 wages paid by the S corp are a key limitation on the 20% deduction. Higher wages = higher QBI deduction limit. In some cases, paying MORE wages (not less) maximizes total tax benefit. Run the numbers both ways!"
        },
        {
          title: 'Memory Aid: Reasonable Compensation',
          type: 'callout',
          calloutType: 'tip',
          content: "'S Corp = Save by Splitting (wages + distributions)'\n'C Corp = Caution on Compensation (not too high)'\n\nFactors: 'TEDCS' = Training, Experience, Duties, Comparables, Size"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "A $0 salary for an S corp shareholder who provides substantial services is NEVER reasonable! Even minimally active owners should receive some wages. Courts have consistently upheld IRS recharacterization of distributions when shareholders take no salary despite providing services."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• S corp shareholder-employees must receive reasonable compensation\n• Wages subject to FICA; distributions are not (tax savings opportunity)\n• IRS examines: Comparables, duties, time, experience, business size\n• Too low: IRS recharacterizes distributions as wages + penalties\n• C corp: Too high may be recharacterized as non-deductible dividend\n• Document compensation analysis and keep salary surveys"
        }
      ]
    }
  },
  {
    id: 'TCP-II-006',
    section: 'TCP',
    title: "Retirement Plan Selection",
    description: "Choose the optimal employer-sponsored retirement plan based on business and owner objectives",
    order: 16,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Entity Planning", "Retirement Plans", "Employee Benefits"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Retirement plan selection significantly impacts owner tax benefits, employee retention, and compliance burden. The 'best' plan depends on owner compensation, employee count, contribution flexibility needs, and business stage. CPAs must match plan features to client goals."
        },
        {
          title: 'Retirement Plan Comparison',
          type: 'table',
          headers: ["Plan Type", "2024 Employee Limit", "2024 Total Limit", "Key Feature"],
          rows: [
            ["SEP IRA", "25% of comp", "$69,000", "Simple, employer only contributes"],
            ["SIMPLE IRA", "$16,000 + catch-up", "Employee + match", "Small employers, lower limits"],
            ["Solo 401(k)", "$23,000 + employer", "$69,000", "Self-employed, highest limits"],
            ["Traditional 401(k)", "$23,000 + catch-up", "$69,000 total", "Larger employers, flexible"],
            ["Defined Benefit", "Actuarial", "$275,000 annual benefit", "Highest contributions possible"]
          ]
        },
        {
          title: 'SEP IRA',
          type: 'list',
          items: [
            "Simplified Employee Pension—easy to establish and maintain",
            "Employer contributes up to 25% of compensation (20% for self-employed)",
            "Maximum: $69,000 (2024)",
            "Must cover ALL eligible employees at same percentage",
            "No employee contributions (deferrals)",
            "Deadline: Tax filing deadline including extensions"
          ]
        },
        {
          title: 'SIMPLE IRA',
          type: 'list',
          items: [
            "For employers with ≤100 employees",
            "Employee deferrals: $16,000 (2024); $19,500 catch-up (50+)",
            "Employer: 2% non-elective OR 3% match",
            "Less administrative burden than 401(k)",
            "Cannot have other qualified plans",
            "25% early withdrawal penalty if within 2 years"
          ]
        },
        {
          title: 'Solo 401(k) (Individual 401(k))',
          type: 'text',
          content: "For self-employed with no employees (except spouse). Allows both employee deferrals ($23,000) AND employer contributions (25% of comp). Total limit: $69,000 (2024). Can have Roth option. Best for maximizing contributions with no employees."
        },
        {
          title: 'Example: Solo 401(k) vs SEP',
          type: 'example',
          content: "Sarah, self-employed consultant, net SE income = $100,000\n\nSEP IRA Maximum:\n• 20% × $100,000 = $20,000\n\nSolo 401(k) Maximum:\n• Employee deferral: $23,000\n• Employer contribution: 20% × $100,000 = $20,000\n• Total: $43,000\n\nSolo 401(k) allows $23,000 MORE in contributions!\nAt 32% bracket, additional tax savings: $7,360"
        },
        {
          title: 'Traditional 401(k)',
          type: 'list',
          items: [
            "Most flexible for larger employers",
            "Employee deferrals + employer match/profit sharing",
            "Requires annual testing (ADP, ACP, Top-Heavy) unless Safe Harbor",
            "Form 5500 filing required",
            "Can have Roth 401(k) option",
            "Vesting schedules allowed for employer contributions"
          ]
        },
        {
          title: 'Safe Harbor 401(k)',
          type: 'text',
          content: "Avoids annual nondiscrimination testing by providing mandatory employer contribution: (1) 3% non-elective to ALL eligible employees, OR (2) 4% match formula. Safe harbor contributions must be 100% vested. Popular for owner-heavy businesses."
        },
        {
          title: 'Defined Benefit Plans',
          type: 'list',
          items: [
            "Promise specific benefit at retirement (not contribution amount)",
            "Maximum annual benefit: $275,000 (2024)",
            "Contributions can exceed $300,000+ depending on age and benefit",
            "Ideal for older business owners wanting to catch up",
            "Complex and expensive to administer",
            "Actuarial calculations required annually"
          ]
        },
        {
          title: 'Defined Benefit Example',
          type: 'example',
          content: "Dr. Jones, age 58, wants to maximize retirement savings. Net income: $500,000.\n\n401(k) Maximum: $69,000 + $7,500 catch-up = $76,500\n\nDefined Benefit Plan:\n• Target benefit at 65: $275,000/year\n• Required contribution to fund benefit: ~$200,000/year\n• Can be combined with 401(k) for $275,000+ total\n\nDB plan allows $120,000+ MORE in deductible contributions!"
        },
        {
          title: 'Plan Selection Decision Tree',
          type: 'table',
          headers: ["If...", "Consider..."],
          rows: [
            ["No employees, maximize contributions", "Solo 401(k)"],
            ["Simplicity is priority, some employees", "SEP IRA"],
            ["≤100 employees, moderate contributions", "SIMPLE IRA"],
            ["Employees, need flexibility", "401(k) (Safe Harbor if testing concern)"],
            ["Older owner, need to catch up fast", "Defined Benefit + 401(k)"],
            ["Want to discriminate toward owner", "NOT allowed—coverage rules apply"]
          ]
        },
        {
          title: 'SECURE Act 2.0 Changes',
          type: 'list',
          items: [
            "Auto-enrollment required for new 401(k) plans (2025+)",
            "Higher catch-up for ages 60-63: $10,000 (2025+)",
            "RMD age increased to 73 (now), 75 (2033)",
            "Roth employer contributions allowed",
            "Student loan matching permitted",
            "Part-time employee coverage rules expanded"
          ]
        },
        {
          title: 'Memory Aid: Plan Selection',
          type: 'callout',
          calloutType: 'tip',
          content: "'SEP = Simple Employer Pays' (no deferrals)\n'SIMPLE = Small employer, IMmediate, PLain, Easy'\n'Solo 401(k) = SOLOpreneur Only (no employees)'\n'DB = Deferred Big amounts (older owners)'\n\nMax contributions: Solo 401k > SEP > SIMPLE (for self-employed)"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "SEP contributions for self-employed are based on NET self-employment income AFTER the SE tax deduction. The effective rate is ~20%, not 25%. Solo 401(k) employee deferrals don't have this reduction—that's why Solo 401(k) often beats SEP!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Solo 401(k): Best for self-employed (deferrals + employer contributions)\n• SEP IRA: Simple but employer-only contributions (25%/20%)\n• SIMPLE IRA: ≤100 employees, lower limits, less admin\n• 401(k): Most flexible, requires testing unless Safe Harbor\n• Defined Benefit: Highest contributions, complex, good for older owners\n• SECURE 2.0: Auto-enrollment, higher catch-ups, Roth employer contributions"
        }
      ]
    }
  },
  {
    id: 'TCP-II-007',
    section: 'TCP',
    title: "Fringe Benefits Tax Planning",
    description: "Maximize tax-advantaged fringe benefits for owners and employees",
    order: 17,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Entity Planning", "Fringe Benefits", "Employee Compensation"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Fringe benefits provide tax-advantaged compensation—deductible to the employer and often excludable to the employee. However, benefits available to owner-employees vary by entity type. Understanding these differences is essential for compensation planning."
        },
        {
          title: 'Fringe Benefit Overview by Entity',
          type: 'table',
          headers: ["Benefit", "C Corp Owner", "S Corp >2%", "Partner/Sole Prop"],
          rows: [
            ["Health insurance", "Excluded", "W-2 + SE deduction", "SE deduction only"],
            ["Group term life ($50k)", "Excluded", "Taxable (W-2)", "Taxable"],
            ["Disability insurance", "Excluded", "W-2 income", "N/A"],
            ["HSA contributions", "Excluded", "Excluded (but wage)", "Direct contribution"],
            ["Educational assistance", "Excluded ($5,250)", "Excluded", "Excluded"],
            ["Dependent care", "Excluded ($5,000)", "Excluded", "Excluded"]
          ]
        },
        {
          title: 'S Corporation >2% Shareholders',
          type: 'text',
          content: "Shareholders owning >2% of S corp are treated like partners for fringe benefits. Benefits must be reported as W-2 income (subject to income tax, not FICA). Shareholder can then take self-employed health insurance deduction. More administrative complexity than C corp."
        },
        {
          title: 'Health Insurance Planning',
          type: 'table',
          headers: ["Entity Type", "Deduction/Exclusion", "Tax Treatment"],
          rows: [
            ["C Corporation", "Corp deducts, employee excludes", "Best treatment"],
            ["S Corp (>2%)", "Corp deducts, shareholder includes in W-2", "Deduction on 1040 (SE health)"],
            ["Partnership", "Guaranteed payment, partner's SE deduction", "SE health deduction on 1040"],
            ["Sole Prop", "No entity deduction", "SE health deduction on 1040"]
          ]
        },
        {
          title: 'Health Savings Accounts (HSAs)',
          type: 'list',
          items: [
            "Must have High Deductible Health Plan (HDHP)",
            "2024 limits: $4,150 individual / $8,300 family",
            "Catch-up (55+): Additional $1,000",
            "Triple tax benefit: Deduction + tax-free growth + tax-free medical withdrawals",
            "No 'use it or lose it'—rolls over indefinitely",
            "Employer contributions excluded from income"
          ]
        },
        {
          title: 'Flexible Spending Accounts (FSAs)',
          type: 'table',
          headers: ["FSA Type", "2024 Limit", "Key Rules"],
          rows: [
            ["Healthcare FSA", "$3,200", "Use-or-lose (small carryover allowed)"],
            ["Dependent Care FSA", "$5,000", "Use-or-lose; reduces credit basis"],
            ["Limited Purpose FSA", "$3,200", "Dental/vision only (with HSA)"]
          ]
        },
        {
          title: 'Educational Assistance (§127)',
          type: 'list',
          items: [
            "Employer pays up to $5,250 tax-free annually",
            "Covers tuition, fees, books, supplies",
            "Can include student loan repayments (through 2025)",
            "Must be written plan, available to broad class",
            "Cannot discriminate in favor of highly compensated"
          ]
        },
        {
          title: 'Transportation Benefits',
          type: 'table',
          headers: ["Benefit", "2024 Monthly Limit", "Tax Treatment"],
          rows: [
            ["Transit passes", "$315", "Excluded from income"],
            ["Qualified parking", "$315", "Excluded from income"],
            ["Bicycle commuting", "Suspended", "TCJA suspended 2018-2025"],
            ["Employer parking", "Deductible to employer", "Was non-deductible 2018-2020"]
          ]
        },
        {
          title: 'Group Term Life Insurance',
          type: 'text',
          content: "First $50,000 of employer-paid group term life is tax-free. Coverage above $50,000: imputed income using IRS Table I rates. For S corp >2% shareholders and partners, ALL employer-paid coverage is taxable (no $50k exclusion)."
        },
        {
          title: 'De Minimis Fringe Benefits',
          type: 'list',
          items: [
            "Small value benefits excluded from income",
            "Examples: Coffee, occasional meals, holiday gifts, flowers",
            "Cash and gift cards are NEVER de minimis (always taxable)",
            "No specific dollar threshold—facts and circumstances",
            "Company parties, picnics generally qualify"
          ]
        },
        {
          title: 'Working Condition Fringe Benefits',
          type: 'list',
          items: [
            "Items employee could deduct if paid personally",
            "Business travel, professional subscriptions, work tools",
            "Cell phones used for business: Excluded",
            "Company vehicle: Personal use is taxable",
            "Professional development and training"
          ]
        },
        {
          title: 'Meals and Entertainment Post-TCJA',
          type: 'table',
          headers: ["Expense Type", "Deductibility"],
          rows: [
            ["Business meals (client)", "50% deductible"],
            ["Employee meals (convenience)", "50% deductible"],
            ["Entertainment", "0% deductible (eliminated by TCJA)"],
            ["Holiday party (all employees)", "100% deductible"],
            ["Meals during travel", "50% deductible"]
          ]
        },
        {
          title: 'Memory Aid: Fringe Benefits',
          type: 'callout',
          calloutType: 'tip',
          content: "'C Corp = Complete benefits for owners'\n'S Corp >2% = Some taxable (health on W-2, SE deduction)'\n'Partnership/Sole Prop = Partial benefits (SE deductions only)'\n\nBest owner fringe benefits: C corporation > S corporation > Partnership"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "S corporation >2% shareholders don't get the $50,000 group term life exclusion! The entire benefit is taxable. Same for accident and health insurance—included in W-2. The S corp can still provide it, but it's not tax-free like for C corp owner-employees."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• C corps provide best fringe benefit treatment for owner-employees\n• S corp >2% owners: Health insurance on W-2 + SE deduction\n• HSAs: Triple tax benefit (deduction, growth, withdrawal)\n• Educational assistance: $5,250/year excluded (includes loan repayment)\n• Group term life: $50k excluded (not for S corp >2% or partners)\n• De minimis: Small perks OK; cash/gift cards always taxable"
        }
      ]
    }
  },
  {
    id: 'TCP-II-008',
    section: 'TCP',
    title: "Section 199A Planning Strategies",
    description: "Maximize the Qualified Business Income deduction through strategic planning",
    order: 18,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Entity Planning", "Section 199A", "QBI Deduction"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Section 199A provides up to a 20% deduction on Qualified Business Income—potentially saving 7.4% in taxes (20% × 37% top rate). However, complex limitations based on income, wages, property, and business type require careful planning to maximize benefits."
        },
        {
          title: 'Section 199A Basics',
          type: 'text',
          content: "Section 199A allows a deduction equal to 20% of Qualified Business Income (QBI) from pass-through entities (partnerships, S corps, sole props). The deduction is taken on the individual return, subject to limitations based on taxable income, W-2 wages, and qualified property."
        },
        {
          title: '199A Calculation Framework',
          type: 'table',
          headers: ["Taxable Income", "Limitations Apply?"],
          rows: [
            ["Below threshold ($191,950 S / $383,900 MFJ)", "No—20% of QBI, no limits"],
            ["In phase-in range", "Partial wage/SSTB limits"],
            ["Above threshold ($241,950 S / $483,900 MFJ)", "Full wage limit OR SSTB exclusion"]
          ]
        },
        {
          title: 'W-2 Wage and Property Limitation',
          type: 'text',
          content: "For taxpayers above threshold, 199A deduction is limited to the GREATER of: (1) 50% of W-2 wages, OR (2) 25% of W-2 wages + 2.5% of qualified property (UBIA). This encourages paying wages and investing in property."
        },
        {
          title: 'Example: Wage Limitation',
          type: 'example',
          content: "Law firm partner (MFJ, taxable income $600,000):\n• QBI from firm: $400,000\n• 20% of QBI: $80,000\n• Share of W-2 wages: $100,000\n• Share of qualified property: $50,000\n\nWage Limitation:\n• 50% of wages: $50,000\n• 25% wages + 2.5% property: $25,000 + $1,250 = $26,250\n• Greater of: $50,000\n\nDeduction: Lesser of $80,000 (20% QBI) or $50,000 (wage limit)\nActual deduction: $50,000\n\nBUT: Law is SSTB, so at this income level, 199A = $0!"
        },
        {
          title: 'Specified Service Trades/Businesses (SSTBs)',
          type: 'list',
          items: [
            "Health, law, accounting, actuarial, performing arts, consulting",
            "Athletics, financial services, brokerage services",
            "Any business where principal asset is employee reputation/skill",
            "Engineering and architecture specifically EXCLUDED from SSTB",
            "At income above threshold: NO 199A deduction for SSTBs"
          ]
        },
        {
          title: 'SSTB Planning Strategies',
          type: 'list',
          items: [
            "Separate non-SSTB activities (product sales, real estate) into different entity",
            "Manage income to stay below SSTB threshold",
            "Maximize retirement contributions to reduce taxable income",
            "Consider entity conversion (SSTB rules don't apply to C corps)",
            "Review whether business truly qualifies as SSTB (narrow definitions)"
          ]
        },
        {
          title: 'Increasing W-2 Wages',
          type: 'text',
          content: "For non-SSTB businesses above threshold, W-2 wages drive the limitation. Strategies: Pay reasonable salaries (not just distributions), consider year-end bonuses, hire W-2 employees vs contractors, time wage payments strategically."
        },
        {
          title: 'Qualified Property (UBIA) Planning',
          type: 'list',
          items: [
            "UBIA = Unadjusted Basis Immediately After Acquisition",
            "Includes depreciable property held at year-end",
            "Property counts for the greater of: depreciable period OR 10 years",
            "Strategy: Acquire property to increase UBIA factor",
            "Real estate often has significant UBIA benefits"
          ]
        },
        {
          title: 'Aggregation Rules',
          type: 'table',
          headers: ["Aspect", "Rule"],
          rows: [
            ["Purpose", "Combine businesses to share wages/property"],
            ["Requirements", "50% common ownership, share factors"],
            ["Benefit", "High-wage business covers low-wage business"],
            ["SSTB rule", "Cannot aggregate SSTB with non-SSTB"],
            ["Election", "Annual election, must be consistent"]
          ]
        },
        {
          title: 'Example: Aggregation Benefit',
          type: 'example',
          content: "Tom owns:\n• Business A: QBI $200k, W-2 wages $20k\n• Business B: QBI $100k, W-2 wages $150k\n\nWithout aggregation:\n• A: 20% × $200k = $40k; 50% × $20k = $10k → Limited to $10k\n• B: 20% × $100k = $20k; 50% × $150k = $75k → $20k\n• Total: $30k\n\nWith aggregation:\n• Combined QBI: $300k → 20% = $60k\n• Combined wages: $170k → 50% = $85k\n• Deduction: $60k (wage limit doesn't bind)\n• Savings: $30k additional deduction!"
        },
        {
          title: 'Real Estate Safe Harbor',
          type: 'list',
          items: [
            "Rev. Proc. 2019-38 provides safe harbor for rental real estate",
            "250+ hours of rental services per year",
            "Separate books and records",
            "Must be 'trade or business' not investment",
            "Triple-net leases generally don't qualify",
            "Safe harbor makes rental QBI eligible for 199A"
          ]
        },
        {
          title: 'Memory Aid: 199A Limits',
          type: 'callout',
          calloutType: 'tip',
          content: "'Below threshold = No Sweat (just 20%)'\n'Above threshold = WAGE or SSTB trouble'\n\nWage limit: 50% W-2 OR (25% W-2 + 2.5% property)\n\n'SSTB = Sorry, Specialized Trades Blocked' above threshold"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Engineering and architecture are specifically EXCLUDED from SSTB definition—they can get 199A above threshold (subject to wage limits). Also, 'consulting' as SSTB means consulting in the SSTB fields listed, not all consulting. A management consultant is SSTB; an IT consultant may not be."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• 199A provides 20% deduction on Qualified Business Income\n• Below threshold: Simple 20% deduction\n• Above threshold: Wage/property limit applies; SSTBs excluded\n• Wage limit: Greater of 50% W-2 OR (25% W-2 + 2.5% UBIA)\n• Aggregation can help share wages across related businesses\n• Sunset: 199A expires after 2025 unless extended"
        }
      ]
    }
  },
  {
    id: 'TCP-II-009',
    section: 'TCP',
    title: "International Tax: GILTI",
    description: "Understand Global Intangible Low-Taxed Income rules and planning strategies",
    order: 19,
    duration: 55,
    difficulty: 'advanced',
    topics: ["International Tax", "GILTI", "CFC"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "GILTI ensures that US shareholders of foreign corporations pay minimum tax on foreign earnings. This anti-deferral regime was a major TCJA change, affecting multinationals and even individual owners of foreign businesses. Understanding GILTI is essential for international tax planning."
        },
        {
          title: 'What Is GILTI?',
          type: 'text',
          content: "Global Intangible Low-Taxed Income (GILTI) is a category of income from Controlled Foreign Corporations (CFCs) that US shareholders must include in income annually. Despite the name, it captures more than just intangible income—it's essentially a minimum tax on CFC earnings."
        },
        {
          title: 'GILTI Calculation Overview',
          type: 'table',
          headers: ["Component", "Definition"],
          rows: [
            ["Tested income", "CFC gross income minus allocable deductions"],
            ["QBAI (Qualified Business Asset Investment)", "Average adjusted basis in depreciable property"],
            ["DTIR (Deemed Tangible Income Return)", "10% × QBAI"],
            ["GILTI", "Tested income - DTIR (excess over 10% return)"],
            ["Net GILTI", "Aggregate of all CFCs (netting allowed)"]
          ]
        },
        {
          title: 'Simplified GILTI Formula',
          type: 'text',
          content: "GILTI = CFC Net Income - (10% × Tangible Assets)\n\nThink of it as: Any return ABOVE 10% of tangible assets is presumed to come from intangibles and taxed currently. Heavy investment in tangible property reduces GILTI."
        },
        {
          title: 'Example: GILTI Calculation',
          type: 'example',
          content: "US Parent owns 100% of Foreign Sub (CFC):\n• CFC tested income: $5,000,000\n• QBAI (tangible assets): $20,000,000\n• DTIR: 10% × $20,000,000 = $2,000,000\n\nGILTI = $5,000,000 - $2,000,000 = $3,000,000\n\nUS Parent includes $3,000,000 GILTI in income.\n\nIf CFC had $50M tangible assets instead:\nDTIR = $5,000,000 → GILTI = $0 (no excess over 10% return)"
        },
        {
          title: 'Corporate vs Individual Shareholders',
          type: 'table',
          headers: ["Shareholder Type", "GILTI Treatment"],
          rows: [
            ["C Corporation", "50% deduction (§250) → effective 10.5% rate"],
            ["C Corporation", "Foreign tax credit available (80%)"],
            ["Individual", "NO §250 deduction—full ordinary rates (37%)"],
            ["Individual", "Limited FTC (no §960 deemed paid credit)"],
            ["S Corp/Partnership", "Pass-through to owners (treated as individuals)"]
          ]
        },
        {
          title: 'Corporate GILTI Benefits',
          type: 'text',
          content: "C corporations receive a 50% deduction under §250, reducing the effective rate on GILTI to 10.5% (21% × 50%). They also get foreign tax credits for 80% of foreign taxes paid. Individuals get neither benefit—creating significant disparity."
        },
        {
          title: 'Planning for Individual CFC Owners',
          type: 'list',
          items: [
            "Consider interposing C corporation between individual and CFC",
            "Make §962 election to be taxed at corporate rates (complex)",
            "Maximize QBAI (tangible asset investment) to reduce GILTI",
            "Evaluate repatriation strategies",
            "Consider check-the-box elections for foreign entities"
          ]
        },
        {
          title: 'Section 962 Election',
          type: 'text',
          content: "Individual US shareholders can elect under §962 to be taxed on GILTI and Subpart F at corporate rates (21% vs 37%) with access to foreign tax credits. However, subsequent distributions face additional tax. Complex calculation required—model both scenarios."
        },
        {
          title: 'High-Tax Exclusion',
          type: 'list',
          items: [
            "CFC income taxed at effective rate >18.9% can be excluded from GILTI",
            "90% of 21% corporate rate = 18.9% threshold",
            "Must elect annually",
            "Tested on item-by-item or QBU basis",
            "Benefit: High-taxed foreign income escapes US GILTI tax"
          ]
        },
        {
          title: 'GILTI Planning Strategies',
          type: 'table',
          headers: ["Strategy", "How It Reduces GILTI"],
          rows: [
            ["Increase QBAI", "More tangible assets = higher DTIR = less GILTI"],
            ["Intercompany transactions", "Reduce tested income (transfer pricing rules apply)"],
            ["High-tax exclusion", "Exclude income taxed >18.9%"],
            ["Check-the-box", "Treat foreign entity as disregarded or branch"],
            ["C corp ownership", "Access §250 deduction and FTC"],
            ["Loss netting", "CFC losses offset gains across CFCs"]
          ]
        },
        {
          title: 'Memory Aid: GILTI',
          type: 'callout',
          calloutType: 'tip',
          content: "'GILTI = Grab Income, Low-Taxed Internationally'\n\nFormula: Income MINUS 10% of Tangible assets = GILTI\n\n'C corps get the 250 Discount' (50% deduction under §250)\n'Individuals pay the Full tab' (no deduction!)"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "GILTI taxes US shareholders—not the foreign corporation! The CFC doesn't pay GILTI tax; the US shareholder includes GILTI in their US return. Also, individual shareholders do NOT get the §250 deduction—only C corporations do. This is a major planning consideration."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• GILTI = CFC income exceeding 10% return on tangible assets\n• US shareholders include GILTI annually (anti-deferral)\n• C corps: 50% deduction (§250) → 10.5% effective rate + FTC\n• Individuals: No §250 deduction—full ordinary rates (37%)\n• Planning: Increase QBAI, use high-tax exclusion, consider C corp ownership\n• §962 election allows individuals to elect corporate rates (complex)"
        }
      ]
    }
  },
  {
    id: 'TCP-II-010',
    section: 'TCP',
    title: "International Tax: FDII & BEAT",
    description: "Navigate Foreign-Derived Intangible Income and Base Erosion Anti-Abuse Tax rules",
    order: 20,
    duration: 55,
    difficulty: 'advanced',
    topics: ["International Tax", "FDII", "BEAT"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "FDII incentivizes keeping intellectual property in the US by providing preferential rates on export income. BEAT ensures large multinationals don't erode the US tax base through deductible payments to foreign affiliates. Both are key TCJA international provisions."
        },
        {
          title: 'FDII Overview',
          type: 'text',
          content: "Foreign-Derived Intangible Income (FDII) provides a deduction for US corporations earning income from exports (goods, services, IP). The 37.5% deduction results in an effective rate of 13.125% (vs 21% standard). Think of it as the 'carrot' to GILTI's 'stick.'"
        },
        {
          title: 'FDII Calculation',
          type: 'table',
          headers: ["Step", "Calculation"],
          rows: [
            ["1. Deduction Eligible Income (DEI)", "Gross income minus allocable deductions"],
            ["2. Deemed Intangible Income (DII)", "DEI - (10% × QBAI)"],
            ["3. Foreign-Derived Ratio", "Foreign-derived DEI / Total DEI"],
            ["4. FDII", "DII × Foreign-Derived Ratio"],
            ["5. Deduction", "37.5% × FDII"]
          ]
        },
        {
          title: 'FDII Example',
          type: 'example',
          content: "US Tech Corp has:\n• Total DEI: $100 million\n• Foreign-derived DEI: $40 million (exports)\n• QBAI: $200 million\n\nDII = $100M - (10% × $200M) = $80 million\nForeign ratio = $40M / $100M = 40%\nFDII = $80M × 40% = $32 million\nFDII Deduction = $32M × 37.5% = $12 million\n\nTax savings: $12M × 21% = $2.52 million\nEffective rate on FDII: 13.125% (vs 21%)"
        },
        {
          title: 'Qualifying for FDII',
          type: 'list',
          items: [
            "Sale of property: For foreign use, to foreign person",
            "Services: Provided to person outside US, or with respect to foreign property",
            "IP licensing: Foreign use of intangibles",
            "Must document foreign use—reliable documentation required",
            "Related party transactions subject to additional scrutiny"
          ]
        },
        {
          title: 'FDII vs GILTI Comparison',
          type: 'table',
          headers: ["Aspect", "FDII (Carrot)", "GILTI (Stick)"],
          rows: [
            ["Purpose", "Incentive to keep IP in US", "Minimum tax on foreign income"],
            ["Who benefits", "US companies with exports", "N/A (it's a tax)"],
            ["Effective rate", "13.125%", "10.5% (C corps)"],
            ["Deduction", "37.5%", "50%"],
            ["Applies to", "US-based income from exports", "CFC income above 10% return"]
          ]
        },
        {
          title: 'BEAT Overview',
          type: 'text',
          content: "Base Erosion and Anti-Abuse Tax (BEAT) is a minimum tax on large corporations making deductible payments to foreign related parties. It recalculates tax by adding back certain 'base erosion payments,' then applies a minimum rate. If BEAT exceeds regular tax, pay the excess."
        },
        {
          title: 'BEAT Applicability',
          type: 'list',
          items: [
            "Applies to corporations with gross receipts ≥$500 million (3-year avg)",
            "Base erosion percentage ≥3% of total deductions",
            "Banks/dealers: 2% threshold",
            "Excludes: Cost of goods sold, qualified derivative payments",
            "Does NOT apply to individuals, S corps, or small corporations"
          ]
        },
        {
          title: 'BEAT Calculation',
          type: 'table',
          headers: ["Component", "Description"],
          rows: [
            ["Modified taxable income", "Taxable income + base erosion payments"],
            ["BEAT rate", "10% (12.5% after 2025)"],
            ["BEAT tax", "Modified taxable income × BEAT rate"],
            ["Regular tax", "Taxable income × 21%"],
            ["BEAT liability", "Excess of BEAT tax over regular tax"]
          ]
        },
        {
          title: 'Base Erosion Payments',
          type: 'list',
          items: [
            "Deductible payments to foreign related parties",
            "Includes: Royalties, interest, management fees, services",
            "Excludes: COGS, qualified derivative payments",
            "Acquisition of depreciable/amortizable property from related party",
            "Reinsurance premiums to foreign affiliates"
          ]
        },
        {
          title: 'BEAT Example',
          type: 'example',
          content: "Big Corp (US) has:\n• Taxable income: $100 million\n• Base erosion payments to foreign parent: $50 million\n\nRegular tax: $100M × 21% = $21 million\n\nBEAT calculation:\n• Modified taxable income: $100M + $50M = $150 million\n• BEAT tax: $150M × 10% = $15 million\n• BEAT liability: $15M - $21M = ($6M) negative → No BEAT\n\nIn this case, regular tax exceeds BEAT, so no additional tax.\nBut if base erosion payments were $200M, BEAT would apply."
        },
        {
          title: 'BEAT Planning Strategies',
          type: 'list',
          items: [
            "Restructure intercompany payments to qualify as COGS",
            "Use qualified derivative payments (excluded from BEAT)",
            "Consider US-to-US structures instead of US-to-foreign",
            "Monitor base erosion percentage (stay below 3%)",
            "Evaluate cost-sharing arrangements"
          ]
        },
        {
          title: 'Memory Aid: FDII & BEAT',
          type: 'callout',
          calloutType: 'tip',
          content: "'FDII = Foreign Dollars In Incentive' (37.5% deduction for exports)\n'BEAT = Base Erosion Adds Tax' (minimum tax on payments to foreign affiliates)\n\nFDII: Carrot for keeping IP in US\nBEAT: Stick for shifting profits out of US"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "FDII is only available to C corporations—NOT pass-throughs or individuals! Also, FDII and GILTI deductions share a combined limitation with taxable income. If losses reduce taxable income, the deductions may be limited. Plan for both provisions together."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• FDII: 37.5% deduction for export income → 13.125% effective rate\n• FDII mirrors GILTI: Income above 10% return on QBAI\n• BEAT: Minimum tax on large corps with base erosion payments\n• BEAT adds back deductible payments to foreign affiliates\n• BEAT rate: 10% (rising to 12.5%)\n• FDII encourages US exports; BEAT discourages profit shifting"
        }
      ]
    }
  },
  {
    id: 'TCP-II-011',
    section: 'TCP',
    title: "Transfer Pricing Concepts",
    description: "Understand arm's length principles and transfer pricing rules for related party transactions",
    order: 21,
    duration: 55,
    difficulty: 'advanced',
    topics: ["International Tax", "Transfer Pricing", "Related Party"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-III-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Transfer pricing determines how multinational groups allocate income among related entities in different jurisdictions. Getting it wrong triggers IRS adjustments, double taxation, and penalties. Understanding arm's length principles is fundamental for international tax compliance."
        },
        {
          title: 'What Is Transfer Pricing?',
          type: 'text',
          content: "Transfer pricing refers to the prices charged between related parties for goods, services, and intangibles. Section 482 gives IRS authority to reallocate income if related party transactions don't reflect arm's length results—what unrelated parties would charge."
        },
        {
          title: 'The Arm\'s Length Standard',
          type: 'text',
          content: "Related parties must price transactions as if they were dealing with unrelated parties at arm's length. This standard, adopted globally via OECD Guidelines, prevents profit shifting by ensuring taxable income is reported where economic value is created."
        },
        {
          title: 'Transfer Pricing Methods',
          type: 'table',
          headers: ["Method", "Description", "Best For"],
          rows: [
            ["CUP (Comparable Uncontrolled Price)", "Compare to actual unrelated transactions", "Commodities, identical products"],
            ["Resale Price", "Resale price minus appropriate margin", "Distributors"],
            ["Cost Plus", "Cost plus appropriate markup", "Manufacturers, service providers"],
            ["CPM (Comparable Profits)", "Compare profit margin to comparable companies", "When transaction data unavailable"],
            ["Profit Split", "Divide combined profits", "Highly integrated operations, unique IP"]
          ]
        },
        {
          title: 'Best Method Rule',
          type: 'text',
          content: "US regulations require the 'best method'—the method that provides the most reliable measure of arm's length result under the facts. Consider: Comparability, quality of data, reliability of assumptions. No hierarchy—choose based on circumstances."
        },
        {
          title: 'Example: Cost Plus Method',
          type: 'example',
          content: "US Parent contracts with Mexican Sub to manufacture products.\n\nMexican Sub's costs: $1,000,000\nComparable manufacturers earn 8% cost plus margin\n\nArm's length price:\n$1,000,000 × 1.08 = $1,080,000\n\nUS Parent should pay Mexican Sub $1,080,000\nMexican Sub reports $80,000 profit\nUS Parent's COGS = $1,080,000\n\nIf US Parent paid only $1,000,000 (no markup):\nIRS could reallocate $80,000 to Mexican Sub\nResult: US income increased, potential double taxation"
        },
        {
          title: 'Comparability Factors',
          type: 'list',
          items: [
            "Functions performed: What activities does each party perform?",
            "Assets used: Tangible, intangible, financial assets employed",
            "Risks assumed: Market, credit, inventory, operational risks",
            "Contractual terms: Payment terms, warranties, exclusivity",
            "Economic circumstances: Market size, competition, stage of product cycle",
            "Business strategies: Market penetration, capacity utilization"
          ]
        },
        {
          title: 'Documentation Requirements',
          type: 'table',
          headers: ["Document", "Purpose"],
          rows: [
            ["Master File", "Global overview of MNE, value chain, intangibles"],
            ["Local File", "Detailed TP analysis for local entity transactions"],
            ["Country-by-Country Report", "Allocation of income, taxes, employees by jurisdiction"],
            ["Contemporaneous", "Must exist when return filed"],
            ["Penalty protection", "Reasonable documentation avoids penalties"]
          ]
        },
        {
          title: 'Transfer Pricing Penalties',
          type: 'list',
          items: [
            "20% penalty on substantial valuation misstatement (200%+ overstatement)",
            "40% penalty on gross valuation misstatement (400%+ overstatement)",
            "Documentation exception: Penalties avoided with contemporaneous documentation + reasonable cause",
            "Penalty can apply even if no tax underpayment after foreign tax credits"
          ]
        },
        {
          title: 'Common Controlled Transactions',
          type: 'table',
          headers: ["Transaction", "Key TP Issues"],
          rows: [
            ["Tangible goods", "Comparable pricing, resale margins, cost plus"],
            ["Services", "Cost plus markup, benefit test"],
            ["IP licensing", "Royalty rates, CUT analysis"],
            ["Cost sharing arrangements", "Buy-in, platform contributions"],
            ["Financing (intercompany loans)", "Interest rate, thin capitalization"],
            ["Management fees", "Benefit test, cost allocation"]
          ]
        },
        {
          title: 'Advance Pricing Agreements (APAs)',
          type: 'text',
          content: "APAs are prospective agreements with IRS on transfer pricing methodology. Unilateral (US only), bilateral (US + treaty partner), or multilateral. Provide certainty and eliminate double taxation risk. Process takes 2-4 years; binding for agreed period (typically 5 years)."
        },
        {
          title: 'Intangibles and DEMPE',
          type: 'list',
          items: [
            "DEMPE: Development, Enhancement, Maintenance, Protection, Exploitation",
            "Legal ownership alone doesn't entitle to all intangible income",
            "Income allocated based on DEMPE functions performed",
            "Cost sharing: Participants share development costs and own resulting IP",
            "Section 367(d): Outbound IP transfers trigger deemed royalty"
          ]
        },
        {
          title: 'Memory Aid: Transfer Pricing Methods',
          type: 'callout',
          calloutType: 'tip',
          content: "'CR-C-C-P' for the 5 methods:\nC = CUP (Comparable Uncontrolled Price)\nR = Resale Price\nC = Cost Plus\nC = CPM (Comparable Profits)\nP = Profit Split\n\n'CUP of coffee CRP served with a Cost-Plus CPM Profit Split'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Transfer pricing adjustments can create DOUBLE TAXATION—IRS increases US income but foreign country already taxed it at the lower price. Competent Authority relief under tax treaties may provide relief but isn't guaranteed. Documentation is key to avoiding adjustments."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Transfer pricing governs related party transaction pricing\n• Arm's length standard: Price as if unrelated parties\n• Five methods: CUP, Resale Price, Cost Plus, CPM, Profit Split\n• Best method rule: Choose most reliable method for facts\n• Documentation critical: Avoids penalties, supports position\n• APAs provide prospective certainty"
        }
      ]
    }
  },
  {
    id: 'TCP-II-012',
    section: 'TCP',
    title: "Business Succession Planning",
    description: "Design tax-efficient business succession and transition strategies",
    order: 22,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Entity Planning", "Succession Planning", "Estate Planning"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Business succession planning addresses the inevitable transition of ownership and control. Without proper planning, transfers can trigger massive tax bills, family conflicts, and business failure. CPAs play a critical role in designing tax-efficient succession strategies."
        },
        {
          title: 'Succession Planning Overview',
          type: 'text',
          content: "Succession planning involves transferring ownership and control of a business to the next generation, employees, or outside buyers. Key considerations: Timing (lifetime vs death), recipients (family, employees, third parties), tax efficiency, and maintaining business continuity."
        },
        {
          title: 'Transfer Options',
          type: 'table',
          headers: ["Method", "Description", "Tax Considerations"],
          rows: [
            ["Gift during life", "Owner gives ownership interests", "Gift tax; carryover basis"],
            ["Sale during life", "Sale to family, ESOP, or third party", "Capital gains; buyer's fresh basis"],
            ["Transfer at death", "Inheritance via estate", "Estate tax; stepped-up basis"],
            ["Installment sale", "Sale with payments over time", "Spread gain recognition"],
            ["GRAT/IDGT", "Trust structures", "Estate freeze; gift tax leverage"]
          ]
        },
        {
          title: 'Valuation Discounts',
          type: 'list',
          items: [
            "Lack of Control Discount: Minority interest can't control decisions",
            "Lack of Marketability Discount: No ready market for private company stock",
            "Combined discounts can reach 25-40%",
            "Must be supported by qualified appraisal",
            "IRS scrutinizes aggressive discounts",
            "FLPs (Family Limited Partnerships) commonly used for discounts"
          ]
        },
        {
          title: 'Example: Valuation Discount Transfer',
          type: 'example',
          content: "Family business FMV: $10,000,000\nParent gifts 30% interest to child\n\nWithout discount:\nGift value: $10M × 30% = $3,000,000\n\nWith valuation discounts (30% combined):\nDiscounted value: $3M × (1 - 30%) = $2,100,000\n\nGift tax savings at 40% rate:\n($3M - $2.1M) × 40% = $360,000\n\nTransferred $3M of value while using only $2.1M of exemption!"
        },
        {
          title: 'Grantor Retained Annuity Trust (GRAT)',
          type: 'text',
          content: "GRAT freezes value for estate purposes. Grantor transfers business to trust, retains annuity for term. If business appreciates faster than IRS assumed rate (§7520 rate), excess passes to beneficiaries gift-tax-free. Zeroed-out GRATs minimize gift tax."
        },
        {
          title: 'GRAT Mechanics',
          type: 'list',
          items: [
            "Grantor transfers property to irrevocable trust",
            "Receives fixed annuity for specified term (e.g., 2 years)",
            "Remainder to beneficiaries (children/trusts for them)",
            "Gift = Transfer value minus present value of annuity",
            "'Zeroed-out' GRAT: Annuity set so gift = $0",
            "Risk: Grantor dies during term—full value in estate"
          ]
        },
        {
          title: 'Installment Sale to Intentionally Defective Grantor Trust (IDGT)',
          type: 'text',
          content: "Grantor sells business to trust (seeded with gift) in exchange for installment note. Trust is 'defective' for income tax (grantor pays tax on trust income) but outside estate. Growth above interest rate passes estate-tax-free. Powerful for appreciating assets."
        },
        {
          title: 'Buy-Sell Agreements',
          type: 'table',
          headers: ["Type", "How It Works", "Tax Treatment"],
          rows: [
            ["Cross-purchase", "Remaining owners buy departing owner's interest", "Buyers get cost basis"],
            ["Redemption", "Company buys departing owner's interest", "No basis step-up for remaining owners"],
            ["Hybrid", "Option for either structure", "Flexibility"],
            ["Wait-and-see", "Decision made at triggering event", "Maximum flexibility"]
          ]
        },
        {
          title: 'Life Insurance in Succession Planning',
          type: 'list',
          items: [
            "Fund buy-sell agreements at death",
            "Provide liquidity for estate taxes",
            "Key person insurance for business continuity",
            "ILIT (Irrevocable Life Insurance Trust) keeps proceeds out of estate",
            "Premium financing for large policies",
            "Split-dollar arrangements with family members"
          ]
        },
        {
          title: 'Employee Stock Ownership Plan (ESOP)',
          type: 'list',
          items: [
            "Tax-qualified retirement plan that invests in employer stock",
            "Seller can defer gain with §1042 rollover (C corp only)",
            "Company gets deduction for contributions",
            "S corp ESOP: Ownership % is tax-exempt",
            "Provides market for private company stock",
            "Employee retention and motivation benefits"
          ]
        },
        {
          title: 'Family Limited Partnerships (FLPs)',
          type: 'text',
          content: "FLPs allow gradual transfer of business interests with valuation discounts. Parents as GPs maintain control; children receive LP interests. Discounts for lack of control and marketability. IRS challenges require legitimate non-tax purposes (asset protection, family governance)."
        },
        {
          title: 'Section 6166: Estate Tax Deferral',
          type: 'list',
          items: [
            "Defer estate tax on closely held business interests",
            "Requirement: Business >35% of adjusted gross estate",
            "Interest-only payments for 4 years",
            "Then up to 10 annual installments of tax + interest",
            "Special 2% interest rate on first $1.7M+ of tax",
            "Must maintain business ownership"
          ]
        },
        {
          title: 'Memory Aid: Succession Techniques',
          type: 'callout',
          calloutType: 'tip',
          content: "'GIFT the FLiP with a GRAT':\nG = GRAT (grantor retained annuity trust)\nI = IDGT (intentionally defective grantor trust)\nF = Family limited partnership\nT = Trust structures\nFLiP = FLP (Family Limited Partnership)\nGRAT = Freeze value, pass appreciation"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Valuation discounts are under constant IRS attack. 'Deathbed' FLPs formed shortly before death with no legitimate non-tax purpose have been disallowed. The FLP must be properly funded, operated, and have legitimate business reasons beyond tax savings."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Succession planning: Transfer ownership tax-efficiently over time\n• Valuation discounts (LOC + LOM) can reduce transfer values 25-40%\n• GRATs freeze value; excess appreciation passes tax-free\n• IDGT: Sale to trust avoids gift/estate tax on growth\n• Buy-sell agreements ensure orderly transition at death/disability\n• §6166: Defer estate tax on closely held businesses up to 14 years"
        }
      ]
    }
  },
  {
    id: 'TCP-II-013',
    section: 'TCP',
    title: "Equity Compensation Planning",
    description: "Navigate stock options, restricted stock, and other equity compensation arrangements",
    order: 23,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Entity Planning", "Equity Compensation", "Stock Options"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Equity compensation aligns employee and shareholder interests while providing tax-advantaged pay. Different vehicles (ISOs, NSOs, RSUs, restricted stock) have vastly different tax consequences. CPAs must understand timing and character of income to advise clients effectively."
        },
        {
          title: 'Types of Equity Compensation',
          type: 'table',
          headers: ["Type", "Tax at Grant", "Tax at Vest/Exercise", "Tax at Sale"],
          rows: [
            ["Incentive Stock Options (ISO)", "None", "None (AMT possible)", "LTCG if qualified"],
            ["Non-Qualified Stock Options (NSO)", "None", "Ordinary income (spread)", "Capital gain on additional appreciation"],
            ["Restricted Stock", "None (unless 83b)", "Ordinary income (FMV)", "Capital gain on appreciation"],
            ["Restricted Stock Units (RSU)", "None", "Ordinary income (FMV)", "Capital gain on appreciation"],
            ["Profits Interest (LLC)", "None", "Pass-through income", "LTCG if >3 year hold"]
          ]
        },
        {
          title: 'Non-Qualified Stock Options (NSOs)',
          type: 'list',
          items: [
            "Most common type of stock option",
            "No tax at grant (unless readily ascertainable FMV)",
            "Exercise: Ordinary income on spread (FMV - exercise price)",
            "Subject to withholding and FICA",
            "Employer gets deduction equal to employee's income",
            "Future appreciation from exercise: Capital gain"]
        },
        {
          title: 'Example: NSO Exercise',
          type: 'example',
          content: "Employee receives NSO: 1,000 shares, $10 exercise price\nExercises when FMV = $50\nSells later at $70\n\nAt Exercise:\n• Spread: ($50 - $10) × 1,000 = $40,000\n• Ordinary income: $40,000\n• Tax (32% + 7.65% FICA): ~$15,860\n• Basis in shares: $50 (FMV at exercise)\n\nAt Sale:\n• Gain: ($70 - $50) × 1,000 = $20,000\n• Character: LTCG if held >1 year from exercise\n• Tax (15% LTCG): $3,000"
        },
        {
          title: 'Incentive Stock Options (ISOs)',
          type: 'list',
          items: [
            "Preferential tax treatment for employees",
            "No regular tax at grant or exercise",
            "AMT adjustment: Spread at exercise is AMT income",
            "Qualifying disposition: LTCG treatment on entire gain",
            "Requirements: Hold 2+ years from grant, 1+ year from exercise",
            "Employer gets NO deduction (trade-off for employee benefit)"]
        },
        {
          title: 'ISO Holding Periods',
          type: 'table',
          headers: ["Holding Period Met?", "Tax Treatment"],
          rows: [
            ["2+ years from grant AND 1+ year from exercise", "LTCG on entire gain"],
            ["Either period not met (disqualifying disposition)", "Ordinary income on spread at exercise; rest is capital gain"],
            ["Sold same day as exercise", "All ordinary income (no benefit)"]
          ]
        },
        {
          title: 'ISO vs NSO Comparison',
          type: 'table',
          headers: ["Feature", "ISO", "NSO"],
          rows: [
            ["Employee tax at exercise", "None (AMT issue)", "Ordinary income"],
            ["Character of gain", "LTCG if qualified", "Ordinary + Capital"],
            ["Employer deduction", "None", "Yes (at exercise)"],
            ["$100k annual limit", "Yes", "No"],
            ["Who can receive", "Employees only", "Anyone (employees, consultants)"]
          ]
        },
        {
          title: 'Restricted Stock',
          type: 'text',
          content: "Actual shares granted subject to vesting restrictions. Without 83(b) election: Taxed as ordinary income when restrictions lapse (at FMV). With 83(b) election: Pay tax on grant date value; future appreciation is capital gain. Risk: Forfeit and lose tax paid."
        },
        {
          title: 'Section 83(b) Election',
          type: 'list',
          items: [
            "Must file within 30 days of grant (NO EXTENSIONS)",
            "Pay tax on current FMV (often low for startups)",
            "Future appreciation taxed as capital gain",
            "Risk: If forfeited, tax paid is not refundable",
            "Best when: Low current value, high expected appreciation",
            "Attach to return and send copy to employer"
          ]
        },
        {
          title: 'Example: 83(b) Election',
          type: 'example',
          content: "Founder receives 1,000,000 restricted shares at $0.01/share\n4-year vesting; sells company at $10/share after 5 years\n\nWithout 83(b):\n• At each vest: Ordinary income at FMV (could be $10M+)\n• Tax rate: 37% + FICA = ~45%\n\nWith 83(b):\n• At grant: 1,000,000 × $0.01 = $10,000 ordinary income\n• Tax: ~$4,500\n• At sale: ($10 - $0.01) × 1M = $9.99M LTCG\n• Tax at 20%: ~$2M\n\nSavings: Millions in taxes!"
        },
        {
          title: 'Restricted Stock Units (RSUs)',
          type: 'list',
          items: [
            "Promise to deliver shares when vesting conditions met",
            "No shares owned until vesting (no voting rights, dividends)",
            "83(b) NOT available (no property transferred at grant)",
            "At vesting: Ordinary income on FMV",
            "Common at public companies (less risk than options)",
            "Often 'sell to cover' for tax withholding"
          ]
        },
        {
          title: 'Profits Interests (LLCs/Partnerships)',
          type: 'text',
          content: "Partnership equivalent of equity compensation. Receive interest in FUTURE profits/appreciation, not current capital. No tax at grant if properly structured. Income taxed as pass-through (may be capital gain, ordinary, or mixed). Liquidation value at grant must be $0."
        },
        {
          title: 'Memory Aid: Equity Compensation',
          type: 'callout',
          calloutType: 'tip',
          content: "'ISO = Income Saved (Optionally)'—No tax at exercise (but AMT!)\n'NSO = Normal Stock Option'—Ordinary income at exercise\n'RSU = Really Simple Unit'—Tax at vesting, no 83(b)\n'83(b) = 30-day deadline, Big potential savings'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "The 83(b) election has a STRICT 30-day deadline from grant date—there are NO extensions and NO relief for missing it! Also, ISOs have a $100,000 annual limit on options that can vest. Amounts over the limit are treated as NSOs. Watch both traps!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• NSOs: Ordinary income at exercise, employer deduction\n• ISOs: LTCG treatment if qualified (2-year/1-year hold), but AMT issue\n• Restricted stock: 83(b) election critical—30-day deadline\n• RSUs: Tax at vesting; 83(b) not available\n• Profits interests: Partnership equity compensation, no tax at grant\n• Key dates: 30 days (83b), 2 years/1 year (ISO qualification)"
        }
      ]
    }
  },
  {
    id: 'TCP-II-014',
    section: 'TCP',
    title: "Partnership Advanced Planning",
    description: "Master complex partnership tax planning including special allocations and basis management",
    order: 24,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Entity Planning", "Partnership Taxation", "Special Allocations"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Partnerships offer unparalleled flexibility through special allocations, basis from debt, and varied distribution rules. Mastering advanced partnership tax planning allows CPAs to structure transactions that minimize taxes while achieving clients' business objectives."
        },
        {
          title: 'Special Allocations (§704(b))',
          type: 'text',
          content: "Unlike S corps (pro-rata only), partnerships can specially allocate income, gain, loss, and deductions differently from ownership percentages. Allocations must have 'substantial economic effect'—they must affect dollar amounts partners receive, not just tax consequences."
        },
        {
          title: 'Substantial Economic Effect Requirements',
          type: 'list',
          items: [
            "Capital accounts maintained per §704(b) regulations",
            "Liquidating distributions based on capital account balances",
            "Partners with deficit capital accounts must restore deficit (DRO) OR",
            "Qualified income offset (QIO) alternative",
            "Allocation must be 'substantial'—not just tax-motivated"
          ]
        },
        {
          title: 'Example: Special Allocation',
          type: 'example',
          content: "AB Partnership: A and B each own 50%\nYear 1: $100,000 income; $50,000 depreciation\n\nDefault (no special allocation):\n• A: $50k income, $25k depreciation = $25k taxable\n• B: $50k income, $25k depreciation = $25k taxable\n\nSpecial allocation (A is in higher bracket):\n• A: $50k income, $50k depreciation = $0 taxable\n• B: $50k income, $0 depreciation = $50k taxable\n\nMust have substantial economic effect (affects capital accounts and distributions). Works if A accepts reduced capital account."
        },
        {
          title: 'Partnership Basis Rules',
          type: 'table',
          headers: ["Basis Component", "Effect on Basis"],
          rows: [
            ["Initial contribution", "Increases basis"],
            ["Share of partnership income", "Increases basis"],
            ["Share of tax-exempt income", "Increases basis"],
            ["Share of partnership liabilities", "Increases basis"],
            ["Share of partnership losses", "Decreases basis"],
            ["Distributions received", "Decreases basis"],
            ["Non-deductible expenses", "Decreases basis"]
          ]
        },
        {
          title: 'Debt Allocations',
          type: 'text',
          content: "Partners get basis from their share of partnership liabilities—a major advantage over S corps. Recourse debt: Allocated to partners who bear economic risk of loss. Nonrecourse debt: Allocated based on profit-sharing ratios (with adjustments for §704(c) and minimum gain)."
        },
        {
          title: 'Recourse vs Nonrecourse Debt',
          type: 'table',
          headers: ["Type", "Allocation Rule", "Example"],
          rows: [
            ["Recourse", "Partner with economic risk of loss", "Personal guarantee = that partner's share"],
            ["Nonrecourse", "Profit-sharing ratio (generally)", "Real estate mortgage with no guarantees"],
            ["Qualified nonrecourse", "Treated as nonrecourse", "Secured by real property in activity"],
            ["Partner nonrecourse", "To lending partner", "Partner loans to partnership"]
          ]
        },
        {
          title: 'Section 704(c) Allocations',
          type: 'text',
          content: "When a partner contributes appreciated/depreciated property, §704(c) prevents shifting built-in gain/loss to other partners. The contributing partner must recognize the pre-contribution gain/loss. Methods: Traditional, Traditional with curative, Remedial."
        },
        {
          title: 'Hot Assets and §751',
          type: 'list',
          items: [
            "'Hot assets': Unrealized receivables, inventory, depreciation recapture",
            "Sale/exchange of partnership interest: Hot asset gain is ordinary income",
            "Distribution of hot assets: May trigger ordinary income recognition",
            "Purpose: Prevent converting ordinary income to capital gain",
            "Carefully analyze before any partner disposition or distribution"
          ]
        },
        {
          title: 'Section 754 Election',
          type: 'text',
          content: "§754 election allows partnership to adjust basis of assets when: (1) Partnership interest is sold/exchanged (§743(b)), or (2) Distribution to partner (§734(b)). Purpose: Align inside and outside basis. Once made, applies to all future transfers until revoked."
        },
        {
          title: '§754 Example',
          type: 'example',
          content: "ABC Partnership has $300k FMV assets; each partner's interest worth $100k.\nA sells interest to D for $100k. A's basis was $60k (partnership has appreciated).\n\nWithout §754:\n• D's outside basis: $100k (purchase price)\n• D's inside basis: $60k (no adjustment)\n• If partnership sells assets, D taxed on $40k 'phantom' gain\n\nWith §754:\n• D's outside basis: $100k\n• D gets $40k special basis adjustment\n• D's share of gain on asset sale: $0 (basis equals FMV)\n\n§754 prevents D from paying tax on appreciation that occurred before D bought in."
        },
        {
          title: 'Disguised Sale Rules (§707(a)(2))',
          type: 'list',
          items: [
            "Contribution followed by distribution may be recharacterized as sale",
            "Two-year presumption: Distribution within 2 years presumed sale",
            "Facts and circumstances test applies",
            "Exceptions: Operating distributions, reasonable guarantees",
            "Planning: Wait 2+ years for distributions if possible"
          ]
        },
        {
          title: 'Guaranteed Payments',
          type: 'table',
          headers: ["Aspect", "Treatment"],
          rows: [
            ["Definition", "Payment determined without regard to partnership income"],
            ["Deductibility", "Deductible by partnership"],
            ["Character to recipient", "Ordinary income"],
            ["Timing", "When paid or accrued (partnership method)"],
            ["Self-employment tax", "Subject to SE tax"]
          ]
        },
        {
          title: 'Memory Aid: Partnership Tax',
          type: 'callout',
          calloutType: 'tip',
          content: "'Partnerships are FLEXIBLE':\nF = Flexible allocations (§704(b))\nL = Liabilities add to basis (unlike S corps)\nE = Economically substantial allocations required\nX = eXcept for hot assets (§751 = ordinary)\nI = Inside/outside basis may differ\nB = Basis adjustment with §754\nLE = Look at Economics, not just tax"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Special allocations that lack 'substantial economic effect' are REALLOCATED according to partners' interests in the partnership (PIP). The IRS looks at whether allocations affect actual economic outcomes, not just tax results. Tax-only allocations fail!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Special allocations: Must have substantial economic effect\n• Partners get basis from partnership debt (major advantage)\n• Recourse debt: To partner bearing economic risk; Nonrecourse: Profit ratio\n• §704(c): Prevents shifting built-in gain/loss to other partners\n• §751 hot assets: Ordinary income on sale (receivables, inventory)\n• §754: Basis adjustment for transfers/distributions"
        }
      ]
    }
  },
  {
    id: 'TCP-III-001',
    section: 'TCP',
    title: "Installment Sale Planning",
    description: "Optimize tax deferral through properly structured installment sales",
    order: 25,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Property Transactions", "Installment Sales", "Tax Deferral"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Installment sales allow sellers to defer gain recognition as payments are received, spreading tax over multiple years. This can keep taxpayers in lower brackets, manage NIIT exposure, and provide better cash flow. Understanding the rules is essential for transaction planning."
        },
        {
          title: 'What Is an Installment Sale?',
          type: 'text',
          content: "Under §453, if at least one payment is received after the year of sale, the seller can report gain as payments are received. Each payment consists of three components: return of basis, gain, and interest. No election required—installment method is the default."
        },
        {
          title: 'Installment Sale Formula',
          type: 'table',
          headers: ["Component", "Formula"],
          rows: [
            ["Gross Profit", "Selling price - Adjusted basis - Selling expenses"],
            ["Contract Price", "Selling price - Assumed liabilities (if < basis)"],
            ["Gross Profit Ratio", "Gross Profit ÷ Contract Price"],
            ["Gain Recognized", "Payment Received × Gross Profit Ratio"],
            ["Basis Recovered", "Payment Received - Gain Recognized"]
          ]
        },
        {
          title: 'Example: Basic Installment Sale',
          type: 'example',
          content: "Seller sells land for $100,000; basis $40,000\nTerms: $20,000 down, four annual payments of $20,000 + interest\n\nGross Profit: $100,000 - $40,000 = $60,000\nContract Price: $100,000\nGross Profit Ratio: $60,000 ÷ $100,000 = 60%\n\nYear 1: $20,000 payment × 60% = $12,000 gain\nYears 2-5: Same—$12,000 gain each year\n\nTotal gain reported: $60,000 (same as lump sum, but spread over 5 years)\nBenefit: Stay in lower bracket, manage income timing"
        },
        {
          title: 'Properties That Cannot Use Installment Method',
          type: 'list',
          items: [
            "Inventory sales (dealer property)",
            "Publicly traded securities",
            "Depreciation recapture (§1245/§1250)—recognized in year of sale",
            "Sales to related parties (special rules apply)",
            "Electing out of installment method (report all gain in year of sale)"
          ]
        },
        {
          title: 'Depreciation Recapture Rules',
          type: 'text',
          content: "Depreciation recapture (§1245, §1250, unrecaptured §1250 gain) must be recognized in the year of sale regardless of payment timing. Only the remaining gain (after recapture) qualifies for installment treatment."
        },
        {
          title: 'Example: Installment Sale with Recapture',
          type: 'example',
          content: "Building sold for $500,000; adjusted basis $200,000\nAccumulated depreciation: $100,000\n10-year note; $50,000/year + interest\n\nTotal gain: $500,000 - $200,000 = $300,000\nRecapture (unrecaptured §1250): $100,000—recognized Year 1\nRemaining gain: $300,000 - $100,000 = $200,000\n\nGross profit ratio: $200,000 ÷ $500,000 = 40%\n\nYear 1: $100,000 recapture + ($50,000 × 40%) = $120,000 gain\nYears 2-10: $50,000 × 40% = $20,000 gain each"
        },
        {
          title: 'Assumed Liabilities',
          type: 'table',
          headers: ["Scenario", "Treatment"],
          rows: [
            ["Liability ≤ Basis", "Reduces contract price"],
            ["Liability > Basis", "Excess treated as payment in year of sale"],
            ["Wraparound mortgage", "Complex rules; consult specialist"]
          ]
        },
        {
          title: 'Interest Requirements',
          type: 'list',
          items: [
            "Adequate stated interest required (AFR or higher)",
            "If interest too low: OID rules impute interest",
            "Unstated interest treated as interest income to seller",
            "Interest income recognized as payments received",
            "Buyer gets interest deduction (if allowed under §163)"
          ]
        },
        {
          title: 'Electing Out of Installment Method',
          type: 'text',
          content: "Sellers can elect out, recognizing all gain in year of sale. Why elect out? To use capital loss carryforwards, if expecting higher future tax rates, or if gain qualifies for exclusion. Election made on timely filed return (including extensions); irrevocable without IRS consent."
        },
        {
          title: 'Disposition of Installment Obligation',
          type: 'list',
          items: [
            "Sale/exchange: Gain/loss = Amount received - Basis in note",
            "Gift: Donor recognizes gain as if note sold for FMV",
            "Cancellation: Treated as receipt of payment",
            "Bequest at death: No gain recognition; heir takes installment obligation",
            "Basis in note = Face - Unrecognized gain"]
        },
        {
          title: 'Pledge Rule',
          type: 'callout',
          calloutType: 'warning',
          content: "If an installment obligation is pledged as security for a loan, the net loan proceeds are treated as a payment—triggering gain recognition. This prevents sellers from getting cash tax-free by borrowing against the note."
        },
        {
          title: 'Memory Aid: Installment Sales',
          type: 'callout',
          calloutType: 'tip',
          content: "'GRIP' the installment sale:\nG = Gross profit ratio determines gain per payment\nR = Recapture recognized immediately\nI = Interest must be adequate (AFR minimum)\nP = Pledge rule: Borrowing against note triggers gain"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Depreciation recapture is ALWAYS recognized in Year 1 even in an installment sale. Only the gain AFTER recapture qualifies for deferral. Don't forget to recognize the recapture amount when calculating Year 1 gain!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Installment method: Defer gain as payments received over time\n• Gross profit ratio × payment = gain recognized per payment\n• Depreciation recapture: Always recognized in year of sale\n• Cannot use for: Inventory, public securities, related party (special rules)\n• Pledge rule: Borrowing against note = deemed payment\n• Election out: All gain in year of sale (use loss carryforwards)"
        }
      ]
    }
  },
  {
    id: 'TCP-III-002',
    section: 'TCP',
    title: "Related Party Transactions",
    description: "Navigate the complex tax rules governing transactions between related parties",
    order: 26,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Property Transactions", "Related Party Rules", "Loss Disallowance"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Related party rules prevent taxpayers from manufacturing tax benefits through transactions with family members or controlled entities. Violating these rules can result in disallowed losses, recharacterized gains, and accelerated income. CPAs must identify related party relationships before advising on transactions."
        },
        {
          title: 'Who Are Related Parties?',
          type: 'table',
          headers: ["Code Section", "Related Parties Defined"],
          rows: [
            ["§267", "Family (spouse, siblings, ancestors, lineal descendants)"],
            ["§267", "Individual and >50% owned entity"],
            ["§267", "Two entities with >50% common ownership"],
            ["§267", "Grantor and fiduciary of trust"],
            ["§707(b)", "Partner and >50% partnership"],
            ["§318", "Constructive ownership through family, entities, options"]
          ]
        },
        {
          title: 'Constructive Ownership (§318)',
          type: 'list',
          items: [
            "Family attribution: Spouse, children, grandchildren, parents",
            "NOT siblings (unlike §267 direct relationship)",
            "Entity-to-owner: Stock owned by partnership/corp attributed to owners",
            "Owner-to-entity: Individual's stock attributed to controlled entity",
            "Option attribution: Person holding option treated as owning stock",
            "Double attribution: Some chains of attribution allowed"
          ]
        },
        {
          title: 'Loss Disallowance (§267)',
          type: 'text',
          content: "Losses on sales/exchanges between related parties are permanently disallowed. The buyer takes a basis equal to their purchase price. However, when the buyer later sells to an unrelated party, gain can be reduced (not below zero) by the previously disallowed loss."
        },
        {
          title: 'Example: Related Party Loss',
          type: 'example',
          content: "Father sells stock to Son:\nFather's basis: $100,000\nSale price to Son: $60,000\nFather's disallowed loss: $40,000\n\nSon's basis: $60,000 (purchase price)\n\nLater, Son sells to unrelated party for $150,000:\nSon's realized gain: $150,000 - $60,000 = $90,000\nDisallowed loss offset: $40,000\nSon's recognized gain: $90,000 - $40,000 = $50,000\n\nIf Son sells for $85,000:\nRealized gain: $85,000 - $60,000 = $25,000\nRecognized gain: $25,000 - $25,000 = $0\n(Remaining $15,000 disallowed loss is lost forever)"
        },
        {
          title: 'Installment Sales to Related Parties (§453)',
          type: 'text',
          content: "If property is sold to a related party on installment, and the related party resells within 2 years, the remaining gain is accelerated. Purpose: Prevent using related party as conduit for immediate cash while deferring gain."
        },
        {
          title: 'Second Disposition Rules',
          type: 'list',
          items: [
            "Applies when related buyer resells within 2 years",
            "Original seller recognizes gain to extent of resale proceeds",
            "Exceptions: Death, involuntary conversion, same property, tax avoidance disproved",
            "Marketable securities: First disposition treated as payment",
            "Depreciable property: All gain treated as ordinary income"]
        },
        {
          title: 'Example: Related Party Installment Resale',
          type: 'example',
          content: "Parent sells land to Child on installment:\nSales price: $500,000; Parent's basis: $200,000\n5-year note: $100,000/year (GP ratio: 60%)\n\nYear 1: Child pays Parent $100,000\nParent recognizes: $100,000 × 60% = $60,000\n\nYear 2: Child resells to unrelated party for $600,000 cash\nSecond disposition triggers acceleration!\n\nParent must recognize:\nLesser of: Resale price ($600,000) or remaining payments ($400,000)\nRemaining GP ratio gain: $400,000 × 60% = $240,000\n\nParent recognizes $240,000 gain in Year 2 (accelerated)"
        },
        {
          title: 'Depreciable Property Sales (§1239)',
          type: 'text',
          content: "Gain on sale of depreciable property to related party is recharacterized as ordinary income (not capital gain). Prevents selling appreciated capital asset to related party who will depreciate it—converting one person's capital gain into another's ordinary deductions."
        },
        {
          title: 'Timing Rules (§267)',
          type: 'table',
          headers: ["Transaction", "Timing Rule"],
          rows: [
            ["Accrual payor, cash payee", "Deduction deferred until included in payee's income"],
            ["Rent/interest owed to related party", "Deductible when payee recognizes"],
            ["Salary to controlling shareholder", "Same matching requirement"],
            ["Year-end accruals", "Watch December 31 accruals paid after 2.5 months"]
          ]
        },
        {
          title: 'Personal Use Assets (§1239)',
          type: 'text',
          content: "When a corporation sells personal-use assets (like a vacation home) to a controlling shareholder, gain is ordinary income, not capital gain. The shareholder will not depreciate personal-use property, but the conversion to ordinary income still applies."
        },
        {
          title: 'Memory Aid: Related Party Rules',
          type: 'callout',
          calloutType: 'tip',
          content: "'RELATED = No LOSSES Allowed':\nLoss disallowance: §267 (no deduction, but buyer can offset gain)\nOrdinary income: §1239 (depreciable property sales)\nSecond disposition: §453 (resale within 2 years accelerates gain)\nExpense matching: Deduction when payee includes in income"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "The disallowed loss in a related party sale is NOT added to the buyer's basis! Buyer's basis = purchase price. The disallowed loss can only offset gain when the buyer sells to an unrelated party. If the buyer sells at a loss, the original disallowed loss disappears forever."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Related parties: Family, >50% owned entities, trusts/beneficiaries\n• §267 loss disallowance: Permanent; buyer's basis = purchase price\n• Disallowed loss offsets buyer's gain on later sale (not below $0)\n• Installment resale within 2 years: Gain accelerated\n• §1239: Depreciable property gain = ordinary income\n• Expense matching: Deduction when payee includes income"
        }
      ]
    }
  },
  {
    id: 'TCP-III-003',
    section: 'TCP',
    title: "Like-Kind Exchange Planning: Advanced",
    description: "Master complex like-kind exchange structures including reverse and improvement exchanges",
    order: 27,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Property Transactions", "Like-Kind Exchanges", "Section 1031"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Section 1031 like-kind exchanges are one of the most powerful tax deferral tools for real estate investors. Advanced structures—reverse exchanges, improvement exchanges, and drop-and-swap—allow flexibility in complex transactions. Mastering these structures can save clients millions in taxes."
        },
        {
          title: 'Basic §1031 Review',
          type: 'text',
          content: "Like-kind exchanges defer gain when exchanging real property held for business or investment. Since 2018, ONLY real property qualifies (personal property no longer eligible). Gain is recognized only to extent of boot received. Strict timelines: 45 days to identify, 180 days to close."
        },
        {
          title: '§1031 Requirements',
          type: 'table',
          headers: ["Requirement", "Details"],
          rows: [
            ["Qualifying property", "Real property held for productive use or investment"],
            ["Like-kind", "Broad: Any real property for any real property (US only)"],
            ["45-day identification", "Must identify replacement property in writing"],
            ["180-day exchange period", "Must receive replacement property"],
            ["Qualified intermediary", "Required to avoid constructive receipt"]
          ]
        },
        {
          title: 'Boot and Gain Recognition',
          type: 'text',
          content: "Boot is non-like-kind property received (cash, debt relief, personal property). Gain recognized = Lesser of: (1) Realized gain, or (2) Boot received. Any mortgage boot (debt relief) triggers gain unless offset by assuming new debt or adding cash."
        },
        {
          title: 'Example: Exchange with Boot',
          type: 'example',
          content: "Taxpayer exchanges:\nRelinquished property: FMV $800,000; Basis $300,000; Mortgage $200,000\nReplacement property: FMV $700,000; Mortgage $150,000; Cash received $50,000\n\nRealized gain: $800,000 - $300,000 = $500,000\n\nBoot calculation:\n• Cash received: $50,000\n• Mortgage boot: $200,000 - $150,000 = $50,000\n• Total boot: $100,000\n\nRecognized gain: Lesser of $500,000 or $100,000 = $100,000\n\nBasis in replacement:\n$300,000 (old basis) - $50,000 (cash) - $50,000 (mortgage relief)\n+ $100,000 (gain recognized) + $150,000 (new mortgage) = $450,000"
        },
        {
          title: 'Reverse Exchanges',
          type: 'text',
          content: "Sometimes you find replacement property before selling relinquished property. In a reverse exchange, an Exchange Accommodation Titleholder (EAT) acquires and 'parks' property until the exchange can complete. Must complete within 180 days per Rev. Proc. 2000-37."
        },
        {
          title: 'Reverse Exchange Structure',
          type: 'list',
          items: [
            "EAT (Exchange Accommodation Titleholder) acquires new property",
            "Property 'parked' under qualified exchange accommodation agreement (QEAA)",
            "45 days to identify which property is relinquished",
            "180 days to complete exchange (sell relinquished, transfer replacement)",
            "EAT cannot hold property more than 180 days",
            "More expensive due to parking costs and complexity"
          ]
        },
        {
          title: 'Improvement Exchanges (Build-to-Suit)',
          type: 'text',
          content: "What if replacement property needs improvements to equal relinquished property value? In an improvement exchange, EAT acquires property and makes improvements during parking period. Improvements add to replacement value, reducing boot."
        },
        {
          title: 'Improvement Exchange Example',
          type: 'example',
          content: "Relinquished property sold: $2,000,000\nReplacement property (land + building): $1,500,000\nNeeded improvements: $500,000\n\nDirect exchange: $500,000 cash boot = taxable gain\n\nImprovement exchange:\n1. QI transfers funds to EAT\n2. EAT acquires replacement for $1,500,000\n3. EAT uses remaining $500,000 for improvements\n4. At 180 days, EAT transfers improved property (now worth $2M)\n5. Full deferral—no boot!\n\nKey: Improvements must be completed within 180 days"
        },
        {
          title: 'Drop-and-Swap / Swap-and-Drop',
          type: 'table',
          headers: ["Structure", "Description", "Use Case"],
          rows: [
            ["Drop-and-swap", "Partnership distributes property to partners; partners exchange individually", "Partners want different replacement properties"],
            ["Swap-and-drop", "Partnership exchanges; then distributes replacement to partners", "Partnership stays together through exchange"],
            ["Timing considerations", "Must avoid step transaction doctrine", "Allow time between steps"]
          ]
        },
        {
          title: 'Identification Rules',
          type: 'list',
          items: [
            "Three-property rule: Identify up to 3 properties (any value)",
            "200% rule: Identify any number if total FMV ≤ 200% of relinquished",
            "95% rule: If over 200%, must acquire 95% of identified value",
            "Identification must be in writing, signed, delivered to QI",
            "Can revoke before 45-day deadline"
          ]
        },
        {
          title: 'Related Party Exchanges',
          type: 'text',
          content: "Exchanges with related parties require both parties to hold property for 2 years after exchange. If either party disposes within 2 years, gain is recognized. Exceptions: Death, involuntary conversion, non-tax-avoidance transactions."
        },
        {
          title: 'DSTs (Delaware Statutory Trusts)',
          type: 'list',
          items: [
            "Allows fractional ownership of larger properties",
            "Investor receives beneficial interest in trust owning real estate",
            "Qualifies as real property for §1031 per Rev. Rul. 2004-86",
            "Passive investment—no management responsibilities",
            "Popular exit strategy: 'Lazy 1031'",
            "Strict DST rules: No new debt, no reinvestment of cash"
          ]
        },
        {
          title: 'Memory Aid: §1031 Timing',
          type: 'callout',
          calloutType: 'tip',
          content: "'45-180 Rule':\n45 days: ID (Identify) your replacement properties\n180 days: DONE (Close on replacement)\n\nRemember: 45 + 135 = 180\nIf you miss 45-day ID deadline, the exchange fails completely!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Since 2018 (TCJA), ONLY REAL PROPERTY qualifies for §1031! No more equipment, vehicles, or artwork exchanges. Also, real property must be within the US—foreign real property does not qualify for exchange with US property."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• §1031: Defer gain on real property exchanges (ONLY real property post-2017)\n• Strict timelines: 45 days to identify, 180 days to close\n• Boot (cash, debt relief) triggers gain recognition\n• Reverse exchange: Park property with EAT when buying before selling\n• Improvement exchange: EAT makes improvements during parking period\n• DSTs: Fractional ownership qualifies as replacement property"
        }
      ]
    }
  },
  {
    id: 'TCP-III-004',
    section: 'TCP',
    title: "Stock vs Asset Sales",
    description: "Analyze the tax implications of structuring business sales as stock or asset transactions",
    order: 28,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Property Transactions", "M&A", "Business Sales"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "The decision to structure a business sale as a stock sale or asset sale has enormous tax implications for both buyer and seller. Sellers typically prefer stock sales (single level of tax); buyers prefer asset sales (stepped-up basis). Understanding both perspectives is critical for negotiating deals."
        },
        {
          title: 'Stock Sale Overview',
          type: 'text',
          content: "In a stock sale, shareholders sell their ownership interests directly to the buyer. The corporation continues with the same tax attributes (basis, NOLs, etc.). The buyer steps into the sellers' shoes as the new shareholder(s)."
        },
        {
          title: 'Asset Sale Overview',
          type: 'text',
          content: "In an asset sale, the corporation sells its assets (not stock) to the buyer. The corporation recognizes gain/loss on asset sales. Proceeds are distributed to shareholders (liquidation), triggering a second tax. Buyer gets fair market value basis in assets."
        },
        {
          title: 'Comparison: Stock vs Asset Sale',
          type: 'table',
          headers: ["Factor", "Stock Sale", "Asset Sale"],
          rows: [
            ["What transfers", "Ownership interest", "Individual assets"],
            ["Levels of tax", "Single (shareholder)", "Double (corp + shareholder)"],
            ["Buyer's basis", "Carryover (no step-up)", "FMV (stepped-up)"],
            ["Liabilities", "All liabilities transfer", "Buyer can exclude liabilities"],
            ["NOL carryforwards", "May be available (limited)", "Lost to seller"],
            ["Contracts/licenses", "Generally transfer", "May require consent"],
            ["Seller preference", "Usually prefers", "Usually dislikes"]
          ]
        },
        {
          title: 'Seller\'s Perspective',
          type: 'list',
          items: [
            "Stock sale: Single capital gains tax (20% + 3.8% NIIT)",
            "Asset sale: Corporate tax (~21%) + shareholder tax on distribution",
            "Asset sale double tax can exceed 40% effective rate",
            "Stock sale transfers all liabilities (including unknown)",
            "Seller may accept lower price for stock sale (tax savings)"
          ]
        },
        {
          title: 'Example: Stock vs Asset Sale (C Corp)',
          type: 'example',
          content: "C Corp: Assets FMV $10M; Asset basis $4M; Stock basis $2M\n\nAsset Sale:\n• Corp gain: $10M - $4M = $6M\n• Corp tax (21%): $1,260,000\n• After-tax proceeds: $8,740,000\n• Shareholder gain: $8.74M - $2M = $6,740,000\n• Shareholder tax (23.8%): $1,604,120\n• Net to shareholders: $7,135,880\n• Total tax: $2,864,120 (28.6% effective rate)\n\nStock Sale:\n• Shareholder gain: $10M - $2M = $8M\n• Tax (23.8%): $1,904,000\n• Net to shareholders: $8,096,000\n• Tax savings: $960,120!"
        },
        {
          title: 'Buyer\'s Perspective',
          type: 'list',
          items: [
            "Asset sale: Stepped-up basis = future depreciation/amortization deductions",
            "Stock sale: Carryover basis—no additional deductions",
            "Asset sale: Can allocate purchase price to maximize deductions",
            "Asset sale: No inherited liabilities (generally)",
            "Stock sale: Inherits all liabilities, including unknown claims",
            "Buyer may pay premium for asset sale (tax benefits)"
          ]
        },
        {
          title: 'Purchase Price Allocation (§1060)',
          type: 'table',
          headers: ["Class", "Assets", "Priority"],
          rows: [
            ["I", "Cash and equivalents", "First"],
            ["II", "Marketable securities, CDs, foreign currency", "Second"],
            ["III", "Receivables, mortgages, credit card receivables", "Third"],
            ["IV", "Inventory", "Fourth"],
            ["V", "All other assets (equipment, land, buildings)", "Fifth"],
            ["VI", "Section 197 intangibles (except goodwill/going concern)", "Sixth"],
            ["VII", "Goodwill and going concern value", "Residual"]
          ]
        },
        {
          title: 'S Corporation Considerations',
          type: 'text',
          content: "S corps avoid double taxation—corporate-level gain flows through to shareholders. However, if S corp was formerly a C corp, built-in gains tax may apply for 5 years after conversion. Stock vs asset difference smaller for S corps, but basis step-up still matters to buyers."
        },
        {
          title: 'Section 338(h)(10) Election',
          type: 'text',
          content: "This election treats a stock sale as an asset sale for tax purposes. The target is deemed to sell all assets at FMV, then liquidate. Buyer gets stepped-up basis. Available for: S corps and corporate subsidiaries. Both buyer and seller must agree to election."
        },
        {
          title: '§338(h)(10) Example',
          type: 'example',
          content: "S Corp stock sale: $10M purchase price\nAsset basis: $4M; Stock basis: $2M\n\nWithout §338(h)(10):\n• Shareholder gain: $10M - $2M = $8M\n• Buyer's inside basis: $4M (carryover)\n\nWith §338(h)(10):\n• Deemed asset sale: $10M - $4M = $6M (flows to shareholders)\n• Shareholders taxed on $6M (not $8M!)\n• Buyer's inside basis: $10M (stepped up)\n\nBetter for shareholders AND buyer gets step-up!"
        },
        {
          title: 'Earnouts and Contingent Payments',
          type: 'list',
          items: [
            "Additional payments based on future performance",
            "Stock sale: Installment method may apply",
            "Asset sale: Open transaction vs closed transaction treatment",
            "Character issues: Ordinary income vs capital gain",
            "Non-compete covenants: Ordinary income to seller"
          ]
        },
        {
          title: 'Memory Aid: Stock vs Asset',
          type: 'callout',
          calloutType: 'tip',
          content: "'Sellers want STOCK, Buyers want ASSETS':\nSTOCK = Single Tax, No step-up (bad for buyer)\nASSETS = Allocated basis, Stepped-up, Seller pays double Tax\n\n§338(h)(10) = Best of both worlds for S corps/subsidiaries!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Don't assume double taxation always makes asset sales worse! If the corporation has NOLs or the assets have low built-in gain, the math can favor asset sales. Always calculate both scenarios. Also, §338(h)(10) is available only for S corps and subsidiary corps—not stand-alone C corps!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Stock sale: Single tax (shareholders); no basis step-up for buyer\n• Asset sale: Double tax (C corp); stepped-up basis for buyer\n• Sellers generally prefer stock sales; buyers prefer asset sales\n• §338(h)(10): Treats stock sale as asset sale (S corps/subsidiaries)\n• Purchase price allocation: §1060 residual method\n• Always model both structures to find optimal solution"
        }
      ]
    }
  },
  {
    id: 'TCP-III-005',
    section: 'TCP',
    title: "Section 338 Elections",
    description: "Apply Section 338 elections to optimize the tax treatment of corporate acquisitions",
    order: 29,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Property Transactions", "M&A", "Section 338"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Section 338 elections allow buyers to treat a stock purchase as an asset purchase for tax purposes, obtaining a stepped-up basis in target assets. Understanding when to use §338(g) vs §338(h)(10)—and when NOT to elect—is critical for M&A tax planning."
        },
        {
          title: 'Two Types of §338 Elections',
          type: 'table',
          headers: ["Election", "Who Elects", "Target Entities", "Key Feature"],
          rows: [
            ["§338(g)", "Buyer alone", "Any corporation", "Buyer-only decision; triggers seller-level tax"],
            ["§338(h)(10)", "Buyer AND Seller jointly", "S corps, subsidiaries", "Treats stock sale as asset sale; often tax-efficient"]
          ]
        },
        {
          title: 'Section 338(g) Election',
          type: 'text',
          content: "A §338(g) election, made solely by the purchasing corporation, treats the target as selling all assets at FMV, then purchasing them as 'new target.' Rarely used because it triggers corporate-level tax WITHOUT eliminating shareholder-level tax—worst of both worlds."
        },
        {
          title: 'When §338(g) Makes Sense',
          type: 'list',
          items: [
            "Target has large NOL carryforwards (offset deemed sale gain)",
            "Target has built-in losses (negative goodwill)",
            "Target is foreign corporation (no US corporate tax anyway)",
            "Buyer needs stepped-up basis regardless of seller's tax",
            "Tax attributes more valuable than double tax cost"
          ]
        },
        {
          title: 'Qualified Stock Purchase (QSP)',
          type: 'text',
          content: "To make any §338 election, buyer must make a 'qualified stock purchase'—acquire at least 80% of vote AND value within a 12-month period. Stock acquired from related parties, in tax-free exchanges, or previously owned doesn't count toward 80%."
        },
        {
          title: 'Section 338(h)(10) Election',
          type: 'text',
          content: "Available only for S corporations and corporate subsidiaries. Joint election by buyer and seller to treat stock sale as asset sale. Target is deemed to sell assets, then liquidate. Seller recognizes corporate-level gain (flows through for S corp); no shareholder-level stock gain."
        },
        {
          title: '§338(h)(10) Benefits',
          type: 'list',
          items: [
            "Buyer: Stepped-up basis in target assets",
            "Buyer: Amortizable goodwill (15 years)",
            "Seller (S corp shareholders): May have LESS tax than stock sale",
            "Single level of tax on deemed asset sale",
            "Avoid inheriting historic tax liabilities of target"
          ]
        },
        {
          title: 'Example: §338(h)(10) Math',
          type: 'example',
          content: "S Corp: Stock purchase price $10M\nShareholder's stock basis: $2M\nCorporation's asset basis: $6M\n\nWithout §338(h)(10):\n• Shareholder gain: $10M - $2M = $8M\n• Tax (23.8%): $1,904,000\n\nWith §338(h)(10):\n• Deemed asset sale gain: $10M - $6M = $4M (flows through)\n• Shareholder taxable gain: $4M\n• Tax (23.8%): $952,000\n• Basis step-up for buyer!\n\nSeller saves $952,000 in tax AND buyer gets stepped-up basis!"
        },
        {
          title: 'Aggregate Deemed Sale Price (ADSP)',
          type: 'text',
          content: "ADSP represents the price at which target is deemed to sell assets. ADSP = Purchase price + Liabilities + Other relevant items. This amount is allocated among assets using §1060 residual method (same as actual asset sale)."
        },
        {
          title: 'Adjusted Grossed-Up Basis (AGUB)',
          type: 'text',
          content: "AGUB is the buyer's deemed purchase price for target's assets. AGUB = Amount paid for stock (grossed up for minority interests) + Liabilities assumed. Allocated to assets per §1060, with residual to goodwill."
        },
        {
          title: '§336(e) Election',
          type: 'table',
          headers: ["Feature", "§338(h)(10)", "§336(e)"],
          rows: [
            ["Trigger", "Qualified stock purchase (80%+)", "Qualified stock disposition (80%+)"],
            ["How acquired", "Purchase only", "Sale, exchange, or distribution"],
            ["Availability", "S corps, subsidiaries", "Same, plus spin-offs"],
            ["Tax treatment", "Deemed asset sale", "Same"]
          ]
        },
        {
          title: 'Making the Election',
          type: 'list',
          items: [
            "§338(g): Form 8023, filed by buyer alone within 8.5 months",
            "§338(h)(10): Form 8023, signed by both parties",
            "Must be made by 15th day of 9th month following acquisition",
            "Irrevocable once made",
            "Allocate ADSP/AGUB via §1060 and report on Form 8594"
          ]
        },
        {
          title: 'Built-in Gains Tax Considerations',
          type: 'text',
          content: "If target S corp was formerly a C corp, the §338(h)(10) deemed sale may trigger built-in gains (BIG) tax if within 5 years of S election. BIG tax is at highest corporate rate on pre-conversion appreciation. Factor this into the election analysis."
        },
        {
          title: 'Memory Aid: Section 338 Elections',
          type: 'callout',
          calloutType: 'tip',
          content: "'§338(g) = Going it alone' (buyer only, usually bad)\n'§338(h)(10) = Help from seller' (joint, often good for S corps)\n\n'QSPS' = Qualified Stock Purchase required (80%+ in 12 months)"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "§338(h)(10) is NOT available for stand-alone C corporations—only S corporations and subsidiaries of C corporations. A §338(g) election on a stand-alone C corp creates TRIPLE taxation: corporate tax on deemed sale, shareholder tax on stock sale, then no seller benefit!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• §338(g): Buyer-only election; rarely beneficial (double tax)\n• §338(h)(10): Joint election; often beneficial for S corps/subsidiaries\n• QSP required: 80%+ of vote and value in 12 months\n• §338(h)(10) can reduce seller's tax while giving buyer step-up\n• ADSP/AGUB: Deemed sale/purchase prices allocated per §1060\n• Watch built-in gains tax for former C corps electing S status"
        }
      ]
    }
  },
  {
    id: 'TCP-III-006',
    section: 'TCP',
    title: "Corporate Liquidations Planning",
    description: "Understand the tax consequences of complete and partial corporate liquidations",
    order: 30,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Property Transactions", "Corporate Liquidations", "Section 331"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Corporate liquidations involve complex tax rules affecting both the corporation and its shareholders. Understanding the general rules under §331 and the parent-subsidiary exception under §332 is essential for advising clients on exit strategies and corporate restructurings."
        },
        {
          title: 'General Rule: §331 Liquidations',
          type: 'text',
          content: "When a corporation completely liquidates, it's treated as a sale of stock. Shareholders recognize gain or loss equal to the difference between the FMV of property received and their stock basis. The character is typically capital gain/loss (LTCG if stock held >1 year)."
        },
        {
          title: 'Corporate Level Tax: §336',
          type: 'text',
          content: "The liquidating corporation recognizes gain/loss as if it sold all assets at FMV. This creates double taxation for C corps: corporate-level gain under §336, then shareholder-level gain under §331. Losses may be limited if property distributed to related parties."
        },
        {
          title: 'C Corp Liquidation Example',
          type: 'example',
          content: "C Corp liquidates, distributes to sole shareholder:\nAsset FMV: $500,000; Asset basis: $200,000\nShareholder's stock basis: $100,000\n\nCorporate Level (§336):\n• Gain: $500,000 - $200,000 = $300,000\n• Tax (21%): $63,000\n• Cash available: $500,000 - $63,000 = $437,000\n\nShareholder Level (§331):\n• Amount received: $437,000\n• Gain: $437,000 - $100,000 = $337,000\n• Tax (23.8%): $80,206\n\nTotal tax: $143,206 (28.6% of $500,000 value)"
        },
        {
          title: 'Shareholder Tax Treatment',
          type: 'table',
          headers: ["Item", "Treatment"],
          rows: [
            ["Cash received", "FMV = cash amount"],
            ["Property received", "FMV at distribution date"],
            ["Basis in property", "FMV at distribution"],
            ["Holding period", "Starts new on distribution date"],
            ["Character of gain/loss", "Capital (usually LTCG)"]
          ]
        },
        {
          title: 'Parent-Subsidiary Liquidation: §332',
          type: 'text',
          content: "§332 provides nonrecognition for liquidations of 80%-owned subsidiaries. Parent receives subsidiary's assets and liabilities tax-free. Parent takes carryover basis and holding period. Subsidiary recognizes no gain/loss under §337."
        },
        {
          title: '§332 Requirements',
          type: 'list',
          items: [
            "Parent owns 80% of vote AND 80% of value",
            "Complete liquidation pursuant to a plan",
            "Distribution within one taxable year, OR",
            "Series of distributions within 3 years of plan adoption",
            "Subsidiary must be solvent (assets > liabilities)"
          ]
        },
        {
          title: '§332 Tax Consequences',
          type: 'table',
          headers: ["Party", "Treatment"],
          rows: [
            ["Parent", "No gain/loss recognized"],
            ["Parent basis", "Carryover from subsidiary's asset basis"],
            ["Parent holding period", "Tacks subsidiary's holding period"],
            ["Subsidiary", "No gain/loss under §337"],
            ["Minority shareholders", "Taxable under §331 (they don't qualify for §332)"]
          ]
        },
        {
          title: '§332 Example',
          type: 'example',
          content: "Parent owns 100% of Subsidiary\nSubsidiary assets: FMV $1,000,000; Basis $400,000\nParent's stock basis: $300,000\n\nUnder §332:\n• Subsidiary gain: $0 (no gain recognized under §337)\n• Parent gain: $0 (no gain recognized under §332)\n• Parent's basis in assets: $400,000 (carryover)\n\nCompare to taxable liquidation:\n• Subsidiary tax: ($600k × 21%) = $126,000\n• Parent tax: Based on value received\n\n§332 preserves basis and defers all gain!"
        },
        {
          title: 'Loss Limitations',
          type: 'list',
          items: [
            "§336(d): No loss on distributions to related parties (>50% owned)",
            "Exception: Pro-rata distributions AND property not acquired in §351 in past 5 years",
            "Built-in loss property: Loss limited to duplicated loss",
            "Purpose: Prevent manufactured losses through related-party transactions"
          ]
        },
        {
          title: 'S Corp Liquidations',
          type: 'text',
          content: "S corp liquidations avoid double taxation—corporate gain flows through to shareholders (single tax). However, watch for built-in gains tax if S corp was formerly C corp within 5 years. Shareholder also has §331 gain/loss on stock."
        },
        {
          title: 'Partial Liquidations',
          type: 'text',
          content: "A partial liquidation (§302(b)(4)) results in exchange treatment for non-corporate shareholders. Must be a genuine contraction of business (not just redemption from E&P). Corporate shareholders get dividend treatment. Requires distribution within taxable year of plan adoption or succeeding year."
        },
        {
          title: 'Planning Considerations',
          type: 'list',
          items: [
            "Convert C corp to S corp and wait 5 years before liquidating",
            "Use §338(h)(10) for subsidiary sales (deemed liquidation)",
            "Consider installment sale of assets before liquidation",
            "Distribute appreciated property to reduce shareholder gain",
            "Watch for PHC or accumulated earnings tax exposure",
            "Use §332 for subsidiary consolidations"
          ]
        },
        {
          title: 'Memory Aid: Liquidation Rules',
          type: 'callout',
          calloutType: 'tip',
          content: "'331-336-332-337':\n§331: Shareholder = Sale of stock (gain/loss)\n§336: Corp = Sale of assets (gain/loss)\n§332: 80% Parent = No gain (carryover basis)\n§337: 80% Sub = No gain (to parent)\n\n'Regular rules: Double tax. 80% parent-sub: No tax.'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "In a §332 liquidation, minority shareholders (those who don't own 80%) are taxed under the regular §331 rules. They recognize gain/loss even though the parent doesn't. Always check ownership percentages before applying §332!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• §331: Shareholders treat liquidation as stock sale (capital gain/loss)\n• §336: Corp recognizes gain/loss on asset distribution\n• §332: 80% parent-sub liquidation is tax-free\n• §337: Subsidiary recognizes no gain to 80% parent\n• Loss limitations apply to related-party distributions\n• S corp liquidation: Single tax (pass-through), but watch BIG tax"
        }
      ]
    }
  },
  {
    id: 'TCP-IV-001',
    section: 'TCP',
    title: "Gift Tax: Annual Exclusion & Lifetime",
    description: "Master the gift tax annual exclusion and lifetime exemption for tax-efficient wealth transfers",
    order: 31,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Gift & Estate", "Gift Tax", "Annual Exclusion"],
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Gift tax planning is fundamental to wealth transfer strategies. The annual exclusion allows tax-free transfers each year, while the lifetime exemption provides a massive bucket for larger gifts. Understanding these tools helps clients transfer wealth efficiently across generations."
        },
        {
          title: 'Gift Tax Overview',
          type: 'text',
          content: "Gift tax applies when you transfer property for less than full consideration. The DONOR (not recipient) pays any tax due. Key exclusions: Annual exclusion ($18,000 in 2024), unlimited marital deduction, unlimited charitable deduction, qualified transfers for education/medical."
        },
        {
          title: 'Annual Exclusion',
          type: 'table',
          headers: ["Feature", "2024 Rules"],
          rows: [
            ["Amount", "$18,000 per donee, per year"],
            ["Indexed for inflation", "Yes, in $1,000 increments"],
            ["Present interest required", "Yes (donee can use/enjoy now)"],
            ["Number of donees", "Unlimited"],
            ["Gift-splitting with spouse", "$36,000 per donee if elected"]
          ]
        },
        {
          title: 'Present Interest Requirement',
          type: 'text',
          content: "Annual exclusion only applies to gifts of present interest—the donee must have immediate right to use, possess, or enjoy the property. Future interests (remainder interests, reversions) don't qualify. Crummey powers can convert future interests to present interests for trusts."
        },
        {
          title: 'Example: Annual Exclusion Planning',
          type: 'example',
          content: "Parents with 4 children and 8 grandchildren (12 donees)\nBoth parents gift $18,000 to each (gift-splitting)\n\nAnnual tax-free transfers:\n$18,000 × 2 parents × 12 donees = $432,000/year\n\nOver 10 years: $4,320,000 transferred gift-tax-free!\n\nBonus: If children are married (4 spouses = 4 more donees):\n$18,000 × 2 × 16 = $576,000/year"
        },
        {
          title: 'Lifetime Gift Tax Exemption',
          type: 'text',
          content: "The lifetime exemption ($13.61M in 2024) covers gifts exceeding the annual exclusion. It's unified with the estate tax exemption—lifetime gifts reduce the amount available at death. Use it or lose it: The exemption is scheduled to drop to ~$6M in 2026."
        },
        {
          title: '2024 Exemption Amounts',
          type: 'table',
          headers: ["Item", "2024 Amount"],
          rows: [
            ["Lifetime gift/estate exemption", "$13,610,000"],
            ["Annual exclusion", "$18,000"],
            ["GST exemption", "$13,610,000"],
            ["Gift tax rate", "40% (on amounts over exemption)"],
            ["Sunset provision", "~$6M in 2026 (unless extended)"]
          ]
        },
        {
          title: 'Unlimited Exclusions',
          type: 'list',
          items: [
            "Marital deduction: Unlimited gifts to US citizen spouse",
            "Charitable deduction: Unlimited gifts to qualified charities",
            "Qualified tuition: Direct payment to educational institution",
            "Qualified medical: Direct payment to medical provider",
            "Note: Tuition/medical must be DIRECT payment, not reimbursement"
          ]
        },
        {
          title: 'Example: Qualified Transfers',
          type: 'example',
          content: "Grandparent wants to help grandchild:\n\nStrategy A: Give $50,000 to grandchild\n• Annual exclusion: $18,000\n• Taxable gift: $32,000 (uses lifetime exemption)\n\nStrategy B: Pay tuition directly + give $18,000\n• Tuition paid direct to school: $32,000 (excluded)\n• Cash gift: $18,000 (annual exclusion)\n• Taxable gift: $0\n\nStrategy B is better—no exemption used!"
        },
        {
          title: 'Gift Tax Return (Form 709)',
          type: 'list',
          items: [
            "Required if: Gifts exceed annual exclusion to any donee",
            "Required for: Gift-splitting election (even if under $18k)",
            "Required for: Gifts of future interests (any amount)",
            "Due date: April 15 (extends with income tax return)",
            "No return needed for: Gifts within annual exclusion, qualified transfers, charitable gifts"
          ]
        },
        {
          title: 'Basis Rules for Gifts',
          type: 'table',
          headers: ["Scenario", "Donee's Basis"],
          rows: [
            ["Gift of appreciated property", "Carryover basis (donor's basis)"],
            ["Gift of depreciated property", "Dual basis: Carryover for gain, FMV for loss"],
            ["Basis adjustment for gift tax", "Only if FMV > donor's basis at gift"]
          ]
        },
        {
          title: 'Planning for 2026 Sunset',
          type: 'callout',
          calloutType: 'warning',
          content: "The $13.61M exemption is scheduled to drop to approximately $6M in 2026 (indexed from 2017's $5M). Strategy: Use excess exemption NOW through gifts or trust funding. 'Anti-clawback' rules protect pre-2026 gifts from being taxed at death even with lower exemption."
        },
        {
          title: 'Memory Aid: Gift Tax Exclusions',
          type: 'callout',
          calloutType: 'tip',
          content: "'AMQQ + Present':\nA = Annual exclusion ($18k/donee)\nM = Marital (unlimited to US spouse)\nQ = Qualified tuition (direct to school)\nQ = Qualified medical (direct to provider)\n\nPlus: PRESENT interest required for annual exclusion!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Qualified tuition and medical payments must be made DIRECTLY to the institution/provider. Reimbursing someone for expenses they already paid is a taxable gift. Also, room and board don't qualify as 'qualified tuition'—only tuition itself."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Annual exclusion: $18,000 per donee (2024), present interest required\n• Lifetime exemption: $13.61M unified with estate tax\n• Unlimited exclusions: Marital, charitable, qualified tuition/medical\n• Form 709 required for gifts over annual exclusion\n• Donee gets carryover basis for appreciated property\n• Plan for 2026 sunset: Use excess exemption now"
        }
      ]
    }
  },
  {
    id: 'TCP-IV-002',
    section: 'TCP',
    title: "Gift-Splitting Strategies",
    description: "Maximize gift tax benefits through proper gift-splitting elections between spouses",
    order: 32,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Gift & Estate", "Gift-Splitting", "Married Couples"],
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Gift-splitting allows married couples to treat a gift from one spouse as made 50% by each spouse. This doubles the annual exclusion and allows access to both spouses' lifetime exemptions without retitling assets. It's a powerful planning tool for wealth transfer."
        },
        {
          title: 'Gift-Splitting Basics',
          type: 'text',
          content: "Under §2513, married couples can elect to split gifts. One spouse makes the gift; both spouses consent to treat it as if each gave half. This doubles the annual exclusion ($36k vs $18k per donee) and can use both lifetime exemptions."
        },
        {
          title: 'Gift-Splitting Requirements',
          type: 'list',
          items: [
            "Must be married at time of gift",
            "Both spouses must be US citizens or residents",
            "Both spouses must consent to split ALL gifts for the year",
            "Cannot split gifts of community property (already owned 50/50)",
            "Must file Form 709 (even if no tax due)",
            "Election is made on timely filed return"
          ]
        },
        {
          title: 'Example: Gift-Splitting Benefit',
          type: 'example',
          content: "Husband wants to give $50,000 to son (wife agrees to split):\n\nWithout Gift-Splitting:\n• Annual exclusion: $18,000\n• Taxable gift: $50,000 - $18,000 = $32,000\n• Uses $32,000 of husband's lifetime exemption\n\nWith Gift-Splitting:\n• Each spouse treated as giving $25,000\n• Husband: $25,000 - $18,000 = $7,000 taxable\n• Wife: $25,000 - $18,000 = $7,000 taxable\n• Total exemption used: $14,000 (split between both)\n\nSavings: $18,000 less lifetime exemption used!"
        },
        {
          title: 'All-or-Nothing Rule',
          type: 'callout',
          calloutType: 'warning',
          content: "Gift-splitting is ALL or NOTHING for the calendar year. If you elect to split one gift, you must split ALL gifts made by either spouse during that year. This can backfire if one spouse made gifts to someone you don't want the other spouse to 'give' to (like an ex-spouse's child)."
        },
        {
          title: 'Consent Requirements',
          type: 'table',
          headers: ["Requirement", "Details"],
          rows: [
            ["How to consent", "Both sign Form 709, or separate returns with consent"],
            ["Timing", "Timely filed return (with extensions)"],
            ["Revocation", "Can revoke before April 15 (or extended due date)"],
            ["Deceased spouse", "Executor can consent on behalf of deceased"],
            ["Divorced during year", "Can split gifts made while married"]
          ]
        },
        {
          title: 'When Gift-Splitting Is Valuable',
          type: 'list',
          items: [
            "One spouse has significant separate property",
            "Large gift exceeds one spouse's annual exclusion",
            "Want to use both spouses' lifetime exemptions",
            "Funding irrevocable trust with one spouse's assets",
            "Equalizing use of lifetime exemptions between spouses"
          ]
        },
        {
          title: 'When Gift-Splitting Is NOT Needed',
          type: 'list',
          items: [
            "Community property states (already owned 50/50)",
            "Gifts under $18,000 per donee per spouse",
            "Both spouses have sufficient assets to gift separately",
            "Gifts to spouse (marital deduction applies)",
            "Concern about all-or-nothing rule consequences"
          ]
        },
        {
          title: 'Example: Large Gift with Gift-Splitting',
          type: 'example',
          content: "Wife gifts $1,000,000 to irrevocable trust for children.\nHusband consents to gift-splitting.\n\nEach spouse treated as giving $500,000:\n• Wife's taxable gift: $500,000 - $18,000 = $482,000\n• Husband's taxable gift: $500,000 - $18,000 = $482,000\n\nEach uses $482,000 of their lifetime exemption.\nNeither exceeds their individual exemption.\n\nWithout splitting:\nWife's taxable gift: $1,000,000 - $18,000 = $982,000\nAll from wife's exemption alone."
        },
        {
          title: 'Gift-Splitting and Trusts',
          type: 'text',
          content: "Gift-splitting is commonly used when funding irrevocable life insurance trusts (ILITs), GRATs, or other planning vehicles. One spouse provides the funds; both consent to split. Crummey powers still required for annual exclusion on trust gifts."
        },
        {
          title: 'Form 709 Requirements',
          type: 'list',
          items: [
            "Both spouses must file if gift-splitting elected",
            "Can file joint Form 709 (one return, both sign)",
            "Or each files separate Form 709 with consent box",
            "Report all gifts by both spouses for the year",
            "Due April 15 (extends with income tax extension)"
          ]
        },
        {
          title: 'Memory Aid: Gift-Splitting',
          type: 'callout',
          calloutType: 'tip',
          content: "'SPLIT = Double the Benefit':\nS = Spouses must both consent\nP = Property from one, benefit to both\nL = Lifetime exemption of both available\nI = It's all-or-nothing for the year\nT = Timely filed Form 709 required"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Gift-splitting creates a DEEMED gift from the non-donor spouse. If the non-donor spouse has creditor issues, this deemed gift could be attacked as a fraudulent transfer. Also, the consenting spouse is secondarily liable for gift tax on the split portion."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Gift-splitting: Treat one spouse's gift as 50% from each\n• Doubles annual exclusion: $36k per donee vs $18k\n• All-or-nothing: Must split ALL gifts for the year\n• Both spouses must consent and file Form 709\n• Not needed for community property (already 50/50)\n• Powerful for large gifts and trust funding"
        }
      ]
    }
  },
  {
    id: 'TCP-IV-003',
    section: 'TCP',
    title: "Valuation Discounts: FLPs & LLCs",
    description: "Apply valuation discounts using family limited partnerships and LLCs for estate planning",
    order: 33,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Gift & Estate", "Valuation Discounts", "FLPs"],
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Valuation discounts can significantly reduce gift and estate taxes by transferring business or investment interests at values below proportionate asset values. Family Limited Partnerships (FLPs) and LLCs are the primary vehicles. However, IRS scrutiny is intense—proper structure is essential."
        },
        {
          title: 'Types of Valuation Discounts',
          type: 'table',
          headers: ["Discount Type", "Reason", "Typical Range"],
          rows: [
            ["Lack of Control (Minority)", "Can't force distributions, liquidation, or management decisions", "15-25%"],
            ["Lack of Marketability", "No ready market; can't easily sell", "15-35%"],
            ["Combined Discounts", "Both applied (multiplicatively)", "25-45%"]
          ]
        },
        {
          title: 'How Discounts Work',
          type: 'example',
          content: "Parent owns real estate worth $10,000,000\nTransfers to FLP, receives 99% LP interest + 1% GP interest\nGifts 30% LP interest to children\n\nWithout FLP:\nGift value: $10M × 30% = $3,000,000\n\nWith FLP (35% combined discount):\nLP interest value: $9.9M × 30% = $2,970,000\nDiscounted value: $2,970,000 × (1 - 35%) = $1,930,500\n\nTransfer tax savings at 40%:\n($3M - $1.93M) × 40% = $428,000!"
        },
        {
          title: 'Family Limited Partnership Structure',
          type: 'list',
          items: [
            "General Partner (GP): 1-2%, controls management and distributions",
            "Limited Partner (LP): 98-99%, passive economic interest",
            "Parents typically retain GP interest (control)",
            "LP interests transferred to children/trusts over time",
            "Partnership agreement restricts transfers and distributions"
          ]
        },
        {
          title: 'LLC Alternative',
          type: 'text',
          content: "LLCs offer similar benefits with different structure. Manager-managed LLCs work like FLPs (manager = GP, members = LPs). Member-managed LLCs have all owners involved. Operating agreement provisions create discount-eligible restrictions."
        },
        {
          title: 'Legitimate Non-Tax Purposes',
          type: 'list',
          items: [
            "Asset protection from creditors",
            "Centralized management of family investments",
            "Training next generation in business/investment management",
            "Preventing asset fragmentation",
            "Maintaining family control of business",
            "Facilitating family wealth governance"
          ]
        },
        {
          title: 'IRS Attack Grounds',
          type: 'table',
          headers: ["Attack Theory", "When IRS Wins"],
          rows: [
            ["§2036(a) inclusion", "Transferor retained control/enjoyment"],
            ["Step transaction", "FLP formed and transferred at death"],
            ["Gift on formation", "Disproportionate capital accounts"],
            ["Economic substance", "No legitimate non-tax purpose"],
            ["Assignment of income", "Income-producing assets transferred"],
            ["Disregard entity", "Entity not respected for tax purposes"]
          ]
        },
        {
          title: 'Section 2036 Danger',
          type: 'callout',
          calloutType: 'warning',
          content: "If the transferor retains the right to income or enjoyment, or control over who receives income, §2036 includes the transferred property in the estate at FULL VALUE. Deathbed FLPs, commingling personal expenses, and informal distributions are red flags that trigger §2036."
        },
        {
          title: 'Best Practices for FLP/LLC Success',
          type: 'list',
          items: [
            "Establish legitimate non-tax purposes (document!)",
            "Properly fund with business/investment assets (not personal use)",
            "Follow formalities: Meetings, capital accounts, K-1s",
            "Don't commingle personal and partnership funds",
            "Make proportionate distributions (or none)",
            "Retain sufficient assets outside FLP for living expenses",
            "Don't form on deathbed—allow time to pass",
            "Obtain qualified appraisal"
          ]
        },
        {
          title: 'Appraisal Requirements',
          type: 'text',
          content: "Discounts must be supported by qualified appraisals from accredited business valuators. The appraiser considers: Underlying asset values, partnership agreement restrictions, comparable transactions, and market data. Appraisals should be contemporaneous with transfers."
        },
        {
          title: 'Example: Properly Structured FLP',
          type: 'example',
          content: "Good Facts:\n• FLP formed 5 years before any transfers\n• Holds rental properties and marketable securities\n• Annual meetings, proper records, K-1s issued\n• Children actively learn investment management\n• No personal use assets in FLP\n• Parents retain adequate assets outside FLP\n• Distributions are proportionate and documented\n\nResult: Discounts likely sustained\n\nBad Facts:\n• FLP formed months before death\n• Holds personal residence, art, jewelry\n• No formalities followed\n• Parents pay personal expenses from FLP\n\nResult: §2036 inclusion—full value in estate"
        },
        {
          title: 'Memory Aid: FLP Discounts',
          type: 'callout',
          calloutType: 'tip',
          content: "'Control + Market = Discount':\nLack of CONTROL (can't force decisions) = 15-25% off\nLack of MARKET (can't easily sell) = 15-35% off\n\n'But watch 2036!'\nRetained control/enjoyment = NO discount, FULL inclusion"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Discounts are applied MULTIPLICATIVELY, not additively. A 20% control discount and 25% marketability discount is NOT 45%. It's: (1 - 20%) × (1 - 25%) = 80% × 75% = 60%, so 40% total discount. The order doesn't matter mathematically."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Lack of control + lack of marketability can yield 25-45% discounts\n• FLPs/LLCs are primary vehicles for discount planning\n• Must have legitimate non-tax purposes (asset protection, management)\n• §2036 is main IRS attack—retained control kills discounts\n• Follow formalities: Meetings, records, proportionate distributions\n• Qualified appraisal required to support discounts"
        }
      ]
    }
  },
  {
    id: 'TCP-IV-004',
    section: 'TCP',
    title: "Estate Tax: Valuation & Deductions",
    description: "Master estate tax valuation rules and available deductions to minimize estate tax liability",
    order: 34,
    duration: 60,
    difficulty: 'advanced',
    topics: ["Gift & Estate", "Estate Tax", "Valuation"],
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Estate tax is calculated on the fair market value of assets at death, reduced by allowable deductions. Understanding valuation methods and maximizing deductions can save significant taxes. The difference between date of death and alternate valuation can be millions of dollars."
        },
        {
          title: 'Estate Tax Calculation Overview',
          type: 'table',
          headers: ["Step", "Component"],
          rows: [
            ["1", "Gross Estate (FMV of all assets)"],
            ["2", "Less: Deductions (debts, expenses, marital, charitable)"],
            ["3", "= Taxable Estate"],
            ["4", "Plus: Adjusted taxable gifts (post-1976)"],
            ["5", "= Tax base"],
            ["6", "Less: Unified credit (exemption)"],
            ["7", "= Estate Tax Due"]
          ]
        },
        {
          title: 'Gross Estate Components',
          type: 'list',
          items: [
            "Assets owned outright at death",
            "Jointly held property (include portion based on contribution)",
            "Life insurance (if incidents of ownership retained)",
            "Retirement accounts (IRAs, 401(k)s)",
            "Revocable trust assets",
            "Powers of appointment (general powers)",
            "§2036/2037/2038 transfers with retained interests"
          ]
        },
        {
          title: 'Valuation Date Options',
          type: 'table',
          headers: ["Option", "When to Use"],
          rows: [
            ["Date of Death", "Default; use FMV on date of death"],
            ["Alternate Valuation Date", "6 months later; only if reduces estate AND tax"],
            ["Special Use Valuation (§2032A)", "Qualified farm/business real property"]
          ]
        },
        {
          title: 'Alternate Valuation Date (§2032)',
          type: 'list',
          items: [
            "Elect to value assets 6 months after death",
            "Must reduce BOTH gross estate AND estate tax",
            "If asset sold/distributed before 6 months, use that date",
            "Election is irrevocable",
            "Useful when market declined after death",
            "Affects basis to heirs (lower value = lower basis)"
          ]
        },
        {
          title: 'Example: Alternate Valuation',
          type: 'example',
          content: "Decedent dies January 15, 2024\nStock portfolio: DOD value $5,000,000; 6-month value $4,200,000\nOther assets: $10,000,000 (unchanged)\n\nDate of Death Valuation:\nGross estate: $15,000,000\nTaxable estate (after deductions): $14,500,000\nEstate tax: ~$360,000\n\nAlternate Valuation Date:\nGross estate: $14,200,000\nTaxable estate: $13,700,000\nEstate tax: ~$40,000\n\nSavings: $320,000!\nBut: Heirs' basis in stock is $4.2M (not $5M)"
        },
        {
          title: 'Allowable Deductions',
          type: 'table',
          headers: ["Deduction", "Description"],
          rows: [
            ["Funeral expenses", "Reasonable costs including burial, headstone"],
            ["Administration expenses", "Executor fees, attorney fees, accounting"],
            ["Debts of decedent", "Mortgages, credit cards, taxes owed"],
            ["Casualty/theft losses", "During administration period"],
            ["Marital deduction", "Unlimited for qualifying transfers to spouse"],
            ["Charitable deduction", "Unlimited for qualifying charitable bequests"]
          ]
        },
        {
          title: 'Marital Deduction Requirements',
          type: 'list',
          items: [
            "Property must pass to surviving spouse",
            "Spouse must be US citizen (or QDOT used)",
            "Must be includible in decedent's gross estate",
            "Terminable interest rule: Generally can't give spouse life estate",
            "Exception: QTIP (Qualified Terminable Interest Property)",
            "Unlimited amount—can reduce taxable estate to zero"
          ]
        },
        {
          title: 'QTIP Election',
          type: 'text',
          content: "QTIP allows marital deduction for property giving spouse only income for life (terminable interest). Executor elects QTIP treatment on Form 706. Remaining property passes to others (often children from prior marriage). QTIP property is included in surviving spouse's estate."
        },
        {
          title: 'Special Use Valuation (§2032A)',
          type: 'list',
          items: [
            "Value farm/business real property at current use, not highest/best use",
            "Can reduce value by up to $1,390,000 (2024)",
            "Requirements: 50% of estate is farm/business; 25% is real property",
            "Qualified heir must continue use for 10 years",
            "Recapture tax if sold or use changes within 10 years"
          ]
        },
        {
          title: 'Administration Expense Election',
          type: 'callout',
          calloutType: 'tip',
          content: "Administration expenses can be deducted on EITHER the estate tax return (Form 706) OR the estate's income tax return (Form 1041)—but NOT both. Choose based on which provides greater tax benefit. Generally: Deduct on 706 if estate is taxable; on 1041 if estate is below exemption."
        },
        {
          title: 'Memory Aid: Estate Deductions',
          type: 'callout',
          calloutType: 'tip',
          content: "'FADE the estate tax':\nF = Funeral expenses\nA = Administration costs\nD = Debts of decedent\nE = Estate charitable + marital deductions\n\n'Marital deduction = UNLIMITED (just delays tax to spouse's death)'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Alternate valuation date affects BASIS to heirs! If you elect AVD to save estate tax, heirs receive lower stepped-up basis. This may not be optimal if heirs plan to sell assets soon—the income tax on gain could exceed estate tax savings."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Gross estate: All assets at FMV including life insurance, retirement, trusts\n• Deductions: Debts, expenses, marital (unlimited), charitable (unlimited)\n• Alternate valuation: 6 months later if reduces estate AND tax\n• §2032A: Value farm/business at current use (up to $1.39M reduction)\n• QTIP: Marital deduction for terminable interest with election\n• Admin expenses: Deduct on 706 or 1041, not both"
        }
      ]
    }
  },
  {
    id: 'TCP-IV-005',
    section: 'TCP',
    title: "Estate Tax: Portability Election",
    description: "Leverage portability to transfer unused estate tax exemption between spouses",
    order: 35,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Gift & Estate", "Portability", "Estate Planning"],
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Portability allows the surviving spouse to use the deceased spouse's unused estate tax exemption (DSUE). This revolutionary 2010 provision simplifies estate planning for married couples, potentially doubling the combined exemption to $27.22M in 2024. But the election must be timely made!"
        },
        {
          title: 'How Portability Works',
          type: 'text',
          content: "When the first spouse dies, any unused portion of their estate tax exemption ($13.61M in 2024) can transfer to the surviving spouse. The surviving spouse can then use both exemptions—their own plus the DSUE amount—for lifetime gifts or at death."
        },
        {
          title: 'Portability Requirements',
          type: 'list',
          items: [
            "Both spouses must be US citizens or residents",
            "Election made on timely filed Form 706 (estate tax return)",
            "Return required EVEN IF no tax is due",
            "Must file within 9 months (15 months with extension)",
            "Late election relief available in limited circumstances",
            "Only works between spouses (not partners, not children)"
          ]
        },
        {
          title: 'Example: Portability Benefit',
          type: 'example',
          content: "2024: Husband dies with $5M estate, all to wife\nHusband's exemption: $13.61M\nUsed: $0 (marital deduction covers $5M)\nDSUE (unused): $13.61M\n\nWith portability election:\nWife's available exemption: $13.61M (own) + $13.61M (DSUE) = $27.22M\n\nWife dies in 2025 with $25M estate:\nTaxable estate: $25M\nExemption available: $27.22M+\nEstate tax: $0\n\nWithout portability:\nWife's exemption: $13.61M only\nTaxable amount: $25M - $13.61M = $11.39M\nEstate tax: ~$4.56M!"
        },
        {
          title: 'DSUE Calculation',
          type: 'table',
          headers: ["Step", "Calculation"],
          rows: [
            ["1", "Start with basic exclusion amount ($13.61M)"],
            ["2", "Add any DSUE from predeceased spouse (if applicable)"],
            ["3", "Subtract taxable estate of deceased"],
            ["4", "Subtract adjusted taxable gifts"],
            ["5", "= DSUE available to surviving spouse"]
          ]
        },
        {
          title: 'Last Deceased Spouse Rule',
          type: 'callout',
          calloutType: 'warning',
          content: "DSUE only comes from the LAST deceased spouse. If surviving spouse remarries and the new spouse dies first, the new spouse's DSUE replaces the original DSUE. Strategy: Use the first DSUE for lifetime gifts before remarrying to 'lock in' that exemption."
        },
        {
          title: 'Form 706 Filing Requirement',
          type: 'list',
          items: [
            "Must file even if estate is below threshold",
            "Due 9 months after death (6-month extension available)",
            "Rev. Proc. 2022-32: Late election relief (within 5 years)",
            "Complete return required—not just portability pages",
            "Report all assets even if no tax due"
          ]
        },
        {
          title: 'Example: Late Portability Election',
          type: 'example',
          content: "Husband died in 2020; no Form 706 filed (estate was $2M).\nWife discovers portability in 2024 (within 5 years).\n\nRev. Proc. 2022-32 Relief:\n• File late Form 706\n• Statement: 'Filed pursuant to Rev. Proc. 2022-32'\n• Elect portability\n• DSUE preserved: $11.58M (2020 exemption) - $2M = $9.58M\n\nWife now has: Own exemption + $9.58M DSUE\n\nNote: 5-year window; after that, relief is discretionary with IRS."
        },
        {
          title: 'Portability vs Trust Planning',
          type: 'table',
          headers: ["Factor", "Portability", "Credit Shelter Trust"],
          rows: [
            ["Simplicity", "Simple—file Form 706", "Complex trust drafting"],
            ["Future appreciation", "Grows in surviving spouse's estate", "Growth outside both estates"],
            ["GST exemption", "NOT portable", "Can be allocated to trust"],
            ["Asset protection", "None", "Yes (irrevocable trust)"],
            ["State estate tax", "May not apply", "Often shelters state tax"],
            ["Remarriage risk", "Lost if new spouse dies", "Protected in trust"]
          ]
        },
        {
          title: 'Why Still Use Trusts?',
          type: 'list',
          items: [
            "GST exemption is NOT portable (trusts preserve it)",
            "Trust appreciation escapes both estates",
            "Asset protection for surviving spouse",
            "State estate tax planning (states don't allow portability)",
            "Control over ultimate beneficiaries",
            "Protection from surviving spouse's remarriage/creditors"
          ]
        },
        {
          title: 'Planning Considerations',
          type: 'text',
          content: "Best practice: File Form 706 for portability AND use credit shelter trusts for GST planning and growth. Don't assume portability eliminates need for trusts. Consider: Large exemption may sunset in 2026; state estate taxes; non-citizen spouse (QDOT required, portability still available)."
        },
        {
          title: 'Memory Aid: Portability',
          type: 'callout',
          calloutType: 'tip',
          content: "'PORT the exemption to your spouse':\nP = Preserve unused exemption\nO = Only from LAST deceased spouse\nR = Return (Form 706) REQUIRED\nT = Timely file (9 months + 6 extension, or 5-year relief)\n\n'GST is NOT portable—only estate exemption!'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "The GST (Generation-Skipping Transfer) exemption is NOT PORTABLE! Only the estate/gift tax exemption transfers to the surviving spouse. If the first spouse doesn't use their GST exemption, it's lost. This is why trusts are still important for multi-generational planning."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Portability: Surviving spouse inherits unused estate exemption (DSUE)\n• Must file Form 706 even if no tax due\n• Only from LAST deceased spouse (remarriage risk)\n• 5-year late election relief available (Rev. Proc. 2022-32)\n• GST exemption is NOT portable—use trusts\n• Trusts still valuable for appreciation, protection, state taxes"
        }
      ]
    }
  },
  {
    id: 'TCP-IV-006',
    section: 'TCP',
    title: "Generation-Skipping Transfer Tax",
    description: "Navigate the complex GST tax rules for transfers to grandchildren and beyond",
    order: 36,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Gift & Estate", "GST Tax", "Multi-Generational"],
    blueprintArea: 'TCP-IV',
    blueprintTopic: 'TCP-IV-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "The Generation-Skipping Transfer (GST) tax prevents wealthy families from avoiding estate tax by skipping generations. Without it, grandparents could transfer wealth directly to grandchildren, avoiding estate tax at the parent's level. At a flat 40% rate on top of other transfer taxes, GST planning is essential."
        },
        {
          title: 'What Is the GST Tax?',
          type: 'text',
          content: "GST tax applies to transfers to 'skip persons'—people two or more generations below the transferor. The tax ensures each generation pays transfer tax. It applies IN ADDITION to gift/estate tax, creating potentially devastating combined rates without proper planning."
        },
        {
          title: 'Skip Persons Defined',
          type: 'table',
          headers: ["Relationship", "Skip Person?"],
          rows: [
            ["Child", "No (one generation below)"],
            ["Grandchild", "Yes (two generations below)"],
            ["Grandchild (if parent deceased)", "No (moves up to parent's generation)"],
            ["Unrelated person 37.5+ years younger", "Yes"],
            ["Trust for skip persons", "Depends on beneficiaries"]
          ]
        },
        {
          title: 'Types of GST Transfers',
          type: 'table',
          headers: ["Type", "Description", "Example"],
          rows: [
            ["Direct Skip", "Transfer directly to skip person", "Gift to grandchild"],
            ["Taxable Termination", "Trust interest ends, skip persons remain", "Child's life estate ends, grandkids get remainder"],
            ["Taxable Distribution", "Distribution from trust to skip person", "Trust distributes to grandchild"]
          ]
        },
        {
          title: 'GST Tax Rate and Exemption',
          type: 'list',
          items: [
            "Flat 40% rate (no graduated brackets)",
            "GST exemption: $13.61M (2024), same as estate exemption",
            "GST exemption is NOT PORTABLE between spouses",
            "Once allocated, exemption permanently shelters transfers",
            "Exemption indexed for inflation"
          ]
        },
        {
          title: 'Example: GST Tax Impact',
          type: 'example',
          content: "Grandparent gifts $5M to grandchild (no GST exemption allocated):\n\nGift tax:\n• Taxable gift: $5M - $18k (exclusion) = $4,982,000\n• Uses lifetime exemption (no gift tax paid)\n\nGST tax (direct skip):\n• GST rate: 40%\n• GST tax: $5M × 40% = $2,000,000\n• Tax-inclusive calculation may apply\n\nTotal transfer cost: $2M+ in GST tax!\n\nWith GST exemption allocated: $0 GST tax"
        },
        {
          title: 'GST Exemption Allocation',
          type: 'list',
          items: [
            "Affirmative allocation: Taxpayer elects on Form 709",
            "Automatic allocation: Applies to direct skips and GST trusts",
            "Deemed allocation: Can elect OUT of automatic allocation",
            "Inclusion ratio: Determines how much of transfer is GST-exempt",
            "Once allocated, shelters all future appreciation"
          ]
        },
        {
          title: 'Inclusion Ratio',
          type: 'text',
          content: "The inclusion ratio determines the GST tax rate. Inclusion ratio = 1 - (GST exemption allocated ÷ Value of transfer). If fully exempt (inclusion ratio = 0), no GST tax. If no exemption (inclusion ratio = 1), full 40% rate. Partial allocations create mixed ratios."
        },
        {
          title: 'Dynasty Trusts',
          type: 'list',
          items: [
            "Irrevocable trust designed to last multiple generations",
            "Allocate GST exemption at funding = 0% inclusion ratio",
            "All growth sheltered from estate AND GST tax",
            "State laws vary: Some allow perpetual trusts",
            "Can distribute to multiple generations GST-free"
          ]
        },
        {
          title: 'Example: Dynasty Trust',
          type: 'example',
          content: "Grandparent funds dynasty trust with $10M, allocates GST exemption.\n\nAt funding: Inclusion ratio = 0 (fully exempt)\n\nYear 30: Trust grows to $50M\n• Distributions to grandchildren: No GST\n• Distributions to great-grandchildren: No GST\n• Trust assets never subject to estate tax in any generation\n\nCompare: No trust\n• $10M in grandparent's estate: Estate tax\n• Remainder in child's estate: Estate tax again\n• Remainder in grandchild's estate: Estate tax again\n\nDynasty trust can save tens of millions over generations!"
        },
        {
          title: 'Predeceased Parent Exception',
          type: 'text',
          content: "If the grandchild's parent (transferor's child) is deceased at the time of transfer, the grandchild 'moves up' a generation and is no longer a skip person. This prevents GST tax when the natural order of death has been disrupted."
        },
        {
          title: 'Planning Strategies',
          type: 'list',
          items: [
            "Allocate GST exemption to appreciating assets (leverage)",
            "Use dynasty trusts in states with no rule against perpetuities",
            "Don't waste GST exemption on non-skip transfers",
            "Consider life insurance trusts (ILIT) with GST exemption",
            "Annual exclusion gifts to grandchildren save GST exemption",
            "Watch automatic allocation rules—may need to opt out"
          ]
        },
        {
          title: 'Memory Aid: GST Tax',
          type: 'callout',
          calloutType: 'tip',
          content: "'SKIP = GST':\nS = Skip persons (2+ generations below)\nK = Kills wealth if no planning (40% tax)\nI = Inclusion ratio determines tax\nP = Predeceased parent exception\n\n'GST exemption is NOT PORTABLE—use it or lose it!'"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "GST tax applies IN ADDITION to gift or estate tax—not instead of. A direct skip gift to a grandchild can trigger both gift tax (using lifetime exemption) AND GST tax (40% if no GST exemption allocated). Combined rate can exceed 70% without proper planning!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• GST tax: 40% on transfers to skip persons (2+ generations below)\n• Exemption: $13.61M (2024)—NOT portable between spouses\n• Three types: Direct skip, taxable termination, taxable distribution\n• Inclusion ratio: Determines portion subject to GST tax\n• Dynasty trusts: Allocate exemption once, shelter generations\n• Predeceased parent: Grandchild moves up if parent deceased"
        }
      ]
    }
  },
  {
    id: 'TCP-II-010',
    section: 'TCP',
    title: "Check-the-Box Entity Classification",
    description: "Master elective entity classification rules for tax purposes",
    order: 37,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Entity Tax Planning", "Classification"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Entity classification can dramatically impact tax consequences! The check-the-box rules give taxpayers flexibility to choose how their entity is taxed. Understanding defaults and elections is essential for TCP and tax planning!"
        },
        {
          title: 'What is Check-the-Box?',
          type: 'text',
          content: "**Elective entity classification (Form 8832):**\n\n• Allows eligible entities to choose tax classification\n• \"Check a box\" to select treatment\n• Simplifies what used to be complex classification tests\n\n**Applies to:** LLCs, partnerships, foreign entities\n**Does NOT apply to:** Corporations (per se corporations)"
        },
        {
          title: 'Default Classifications',
          type: 'table',
          headers: ['Entity Type', 'Default Classification'],
          rows: [
            ['Single-member LLC (domestic)', 'Disregarded entity'],
            ['Multi-member LLC (domestic)', 'Partnership'],
            ['Foreign eligible entity (limited liability)', 'Corporation'],
            ['Foreign eligible entity (unlimited liability)', 'Partnership (if 2+ owners)']
          ]
        },
        {
          title: '🧠 Memory Aid: Defaults',
          type: 'callout',
          content: "**\"DIPS\"** for Domestic LLC Defaults:\n\n**D**isregarded = Single member\n**I**f multiple members\n**P**artnership = Default\n**S** corp requires election!\n\n**Domestic LLCs default to pass-through!**"
        },
        {
          title: 'Election Options',
          type: 'text',
          content: "**Domestic eligible entities can elect:**\n\n• Corporation (C corp treatment)\n• Partnership (if 2+ members)\n• Disregarded (if single member)\n\n**Foreign eligible entities can elect:**\n• Corporation\n• Partnership or disregarded\n\n**Once classified as corporation, can also elect S corp (Form 2553)**"
        },
        {
          title: 'Per Se Corporations',
          type: 'text',
          content: "**Automatically treated as corporations—no election available:**\n\n• Business entity organized as corporation\n• Insurance companies\n• State-chartered banks\n• Government-owned entities\n• Certain publicly traded partnerships\n• Specific foreign entities listed in regulations\n\n**Cannot \"check the box\" to avoid corporate treatment**"
        },
        {
          title: 'Making the Election',
          type: 'text',
          content: "**Form 8832 requirements:**\n\n• File within 75 days BEFORE or 12 months AFTER effective date\n• All owners must consent (or single owner)\n• Specify effective date\n• Cannot change election for 60 months (generally)\n\n**Late elections possible with reasonable cause relief**"
        },
        {
          title: 'Tax Consequences of Election Change',
          type: 'table',
          headers: ['From', 'To', 'Tax Consequence'],
          rows: [
            ['Partnership', 'Corporation', 'Deemed contribution (351 likely)'],
            ['Corporation', 'Partnership', 'Deemed liquidation (taxable!)'],
            ['Disregarded', 'Corporation', 'Deemed contribution (351 likely)'],
            ['Disregarded', 'Partnership', 'Contribution of assets']
          ]
        },
        {
          title: '⚠️ Exam Trap: Conversion Consequences',
          type: 'warning',
          content: "**Converting FROM corporation is TAXABLE!**\n\n**Corporation → Partnership or Disregarded:**\n• Deemed liquidation occurs\n• Corporation recognizes gain on all assets\n• Shareholders recognize gain on deemed distribution\n• DOUBLE TAX potential!\n\n**Avoid electing into corporation status without careful planning**"
        },
        {
          title: 'S Corporation Election',
          type: 'text',
          content: "**S corp requires TWO elections:**\n\n1. First be classified as corporation (default or 8832)\n2. Then elect S corp status (Form 2553)\n\n**S corp election deadlines:**\n• Within 75 days of beginning of tax year\n• Or any time during preceding year\n• Late election relief available"
        },
        {
          title: 'Planning Considerations',
          type: 'list',
          content: [
            "**Self-employment tax** - LLC/partnership = SE tax; S corp = reasonable salary",
            "**Liability protection** - Same regardless of tax classification",
            "**Exit strategy** - C corps face double tax; pass-throughs don't",
            "**State taxes** - Some states don't recognize S corps",
            "**Investor types** - S corps have shareholder restrictions"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Check-the-box allows elective tax classification",
            "Single-member LLC defaults to disregarded; multi-member to partnership",
            "Per se corporations cannot elect different treatment",
            "Form 8832 for entity classification; Form 2553 for S corp",
            "Converting FROM corporation triggers deemed liquidation (taxable)",
            "60-month limitation on changing elections",
            "S corp election requires corporate classification first"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-010',
    section: 'TCP',
    title: "Section 338 Elections",
    description: "Understand deemed asset sale treatment in stock acquisitions",
    order: 38,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Business Dispositions", "M&A"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "When acquiring a corporation's stock, buyers usually want stepped-up asset basis. Section 338 elections convert a stock purchase into a deemed asset purchase for tax purposes. Understanding when and how to use 338 is crucial for M&A tax planning!"
        },
        {
          title: 'Why Step-Up Matters',
          type: 'text',
          content: "**Stock purchase (no 338):**\n• Buyer gets carryover basis in assets\n• No depreciation benefit from purchase price\n• Inherits all tax attributes (NOLs, etc.)\n\n**Asset purchase or 338 election:**\n• Buyer gets stepped-up basis in assets\n• Future depreciation deductions\n• Generally better for buyer"
        },
        {
          title: 'Two Types of Section 338 Elections',
          type: 'table',
          headers: ['Type', 'Parties', 'Tax Consequence'],
          rows: [
            ['338(g)', 'Buyer only', 'Deemed sale by target; Buyer pays target\'s tax!'],
            ['338(h)(10)', 'Buyer AND Seller', 'Deemed sale by target; Seller reports gain']
          ]
        },
        {
          title: '🧠 Memory Aid: 338 Elections',
          type: 'callout',
          content: "**\"G is Grim, H is Happy\"**\n\n**338(g):** BUYER pays tax on deemed sale\n• Grim for buyer (double tax effect)\n• Rarely used\n\n**338(h)(10):** SELLER reports gain\n• Happy compromise\n• More commonly used"
        },
        {
          title: 'Section 338(g) Election',
          type: 'text',
          content: "**Requirements:**\n• Corporate acquirer\n• Qualified stock purchase (80%+ in 12 months)\n• Election by buyer alone\n\n**Consequences:**\n• Target treated as selling ALL assets\n• Target recognizes gain/loss\n• NEW target has stepped-up basis\n• Buyer indirectly bears target's tax!\n\n**Rarely beneficial—creates phantom tax cost**"
        },
        {
          title: 'Section 338(h)(10) Election',
          type: 'text',
          content: "**Requirements:**\n• Target is S corp or member of consolidated group\n• Buyer and seller BOTH elect\n• Qualified stock purchase\n\n**Consequences:**\n• Treated as asset sale by old target\n• Stock sale ignored for tax purposes\n• Seller reports gain on deemed asset sale\n• Buyer gets stepped-up basis\n\n**More commonly used—win-win possible**"
        },
        {
          title: 'Qualified Stock Purchase',
          type: 'text',
          content: "**Must acquire 80%+ of target stock:**\n\n• By vote AND value\n• Within 12-month acquisition period\n• Through purchase (not tax-free exchange)\n• Certain stock excluded (preferred without voting/conversion)\n\n**80% threshold is strict—must be met precisely**"
        },
        {
          title: 'Example: 338(h)(10)',
          type: 'example',
          content: "**S Corp Target:**\n• Assets FMV: $10M\n• Asset basis: $2M\n• Stock purchase price: $10M\n\n**Without 338(h)(10):**\n• Shareholders report stock gain\n• Buyer gets carryover asset basis ($2M)\n• No step-up\n\n**With 338(h)(10):**\n• Deemed asset sale: $8M gain flows to shareholders\n• Buyer gets stepped-up asset basis ($10M)\n• Future depreciation on full $10M\n\n**Same tax to seller, but buyer benefits from step-up!**"
        },
        {
          title: 'Allocation of Purchase Price',
          type: 'text',
          content: "**ADSP (Aggregate Deemed Sales Price):**\n\n**Allocate to assets in order:**\n1. Cash and deposits\n2. Actively traded securities\n3. Receivables, inventory\n4. Other tangible and intangible assets\n5. Section 197 intangibles\n6. Goodwill and going concern\n\n**Residual method—like asset purchase allocation**"
        },
        {
          title: '⚠️ Exam Trap: When 338(g) Makes Sense',
          type: 'warning',
          content: "**338(g) is RARELY beneficial because:**\n\n• Buyer effectively pays target's tax\n• But might make sense when:\n  - Target has NOL to offset gain\n  - Foreign acquisition (no double tax)\n  - Tax attributes must be purged\n\n**338(h)(10) is almost always preferred when available!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "338 converts stock purchase to deemed asset purchase for tax",
            "338(g): Buyer-only election, buyer bears target's tax (rarely used)",
            "338(h)(10): Joint election, seller reports gain (more common)",
            "338(h)(10) requires S corp or consolidated group target",
            "Qualified stock purchase: 80%+ acquired in 12 months",
            "Benefit: Stepped-up asset basis for buyer = more depreciation",
            "Allocate purchase price using residual method"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-II-011',
    section: 'TCP',
    title: "International Tax Basics for Tax Planning",
    description: "Understand fundamental international tax concepts for planning",
    order: 39,
    duration: 55,
    difficulty: 'advanced',
    topics: ["International Tax", "Tax Planning"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Global business requires understanding of international tax rules! From foreign tax credits to GILTI, international tax affects entity selection and planning. TCP tests basic international concepts that every tax planner should know!"
        },
        {
          title: 'Worldwide vs Territorial Taxation',
          type: 'text',
          content: "**US uses WORLDWIDE system (with modifications):**\n\n• US persons taxed on worldwide income\n• Foreign income may be deferred (through foreign subs)\n• Foreign tax credit prevents double taxation\n\n**TCJA (2017) added territorial elements:**\n• Participation exemption (100% DRD for certain dividends)\n• But GILTI captures some foreign income"
        },
        {
          title: 'Key International Tax Terms',
          type: 'table',
          headers: ['Term', 'Meaning'],
          rows: [
            ['CFC', 'Controlled Foreign Corporation (>50% US-owned)'],
            ['PFIC', 'Passive Foreign Investment Company'],
            ['GILTI', 'Global Intangible Low-Taxed Income'],
            ['FDII', 'Foreign-Derived Intangible Income (deduction)'],
            ['Subpart F', 'Current taxation of certain CFC income']
          ]
        },
        {
          title: 'Foreign Tax Credit',
          type: 'text',
          content: "**Prevents double taxation:**\n\n• Credit for foreign taxes paid\n• Limited to US tax on foreign income\n• Excess credits can be carried forward/back\n\n**Formula:**\n\nFTC Limit = US Tax × (Foreign Source Income / Worldwide Income)\n\n**Cannot reduce US tax below zero**"
        },
        {
          title: '🧠 Memory Aid: FTC Limit',
          type: 'callout',
          content: "**\"Can't get more credit than you'd pay\"**\n\n**FTC is limited to:**\nUS tax rate × Foreign income\n\n**Example:**\n• Foreign income: $100\n• US tax rate: 21%\n• Foreign tax paid: 30%\n\n• FTC limit: $21\n• Excess $9 carried forward\n\n**High-tax foreign income = Excess credits**"
        },
        {
          title: 'Controlled Foreign Corporations (CFCs)',
          type: 'text',
          content: "**CFC = Foreign corporation with >50% US shareholder ownership**\n\n**US shareholders must include:**\n• Subpart F income (passive, mobile income)\n• GILTI (post-TCJA)\n\n**Even without dividend!**\n\n**\"10% US shareholder\" = owns 10%+ by vote or value**"
        },
        {
          title: 'Subpart F Income',
          type: 'text',
          content: "**Certain CFC income taxed currently to US shareholders:**\n\n**Types:**\n• Foreign base company sales income\n• Foreign base company services income\n• Foreign personal holding company income\n• Insurance income\n\n**Purpose:** Prevent deferral of easily-shifted income\n\n**No deferral benefit for Subpart F!**"
        },
        {
          title: 'GILTI (Global Intangible Low-Taxed Income)',
          type: 'text',
          content: "**Post-TCJA anti-deferral regime:**\n\n**GILTI = CFC's tested income minus deemed return on tangible assets**\n\n**Effect:**\n• Captures excess returns (attributed to intangibles)\n• Taxed currently to US shareholders\n• 50% deduction available (21% × 50% = 10.5% effective rate)\n• Foreign tax credit available (80%)\n\n**Minimum tax on foreign earnings**"
        },
        {
          title: 'FDII Deduction',
          type: 'text',
          content: "**Incentive for US exports of intangibles:**\n\n• Deduction for foreign-derived income from intangibles\n• 37.5% deduction (effective rate: 13.125%)\n• Must be income from foreign customers\n• Reduces US tax on export income\n\n**GILTI taxes foreign profits; FDII incentivizes US production**"
        },
        {
          title: '⚠️ Exam Trap: GILTI vs Subpart F',
          type: 'warning',
          content: "**Both cause current inclusion, but different!**\n\n**Subpart F:**\n• Passive/mobile income specifically\n• No 50% deduction\n• Full FTC available\n\n**GILTI:**\n• Residual CFC income (after Subpart F)\n• 50% deduction available\n• 80% FTC haircut\n\n**Subpart F = worse tax treatment!**"
        },
        {
          title: 'Planning Considerations',
          type: 'list',
          content: [
            "**Entity selection** - Branch vs subsidiary affects deferral",
            "**Location of IP** - Drives where income is earned",
            "**Transfer pricing** - Must be arm's length",
            "**Check-the-box** - Can create/eliminate CFCs",
            "**Foreign tax credits** - Manage high/low-tax baskets",
            "**FDII benefits** - Keep intangibles in US, sell abroad"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "US taxes worldwide income but allows FTC for foreign taxes",
            "CFC = >50% US-owned foreign corporation",
            "Subpart F income: Taxed currently, no deferral",
            "GILTI: Minimum tax on CFC excess returns (10.5% effective)",
            "FDII: Deduction for US export income (13.125% effective)",
            "FTC limited to US tax on foreign income",
            "Planning involves entity choice, IP location, transfer pricing"
          ]
        }
      ]
    }
  },

  // =============================================
  // TCP-III: TAX PLANNING & ADVICE (Continued)
  // =============================================
  {
    id: 'TCP-III-011',
    section: 'TCP',
    title: "Alternative Minimum Tax (AMT) for Corporations",
    description: "Master the corporate AMT after TCJA and IRA changes",
    order: 65,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Corporate Tax", "AMT", "Tax Planning"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The corporate AMT was repealed by TCJA but REINSTATED by the Inflation Reduction Act (IRA) for large corporations! Understanding this new 15% minimum tax is critical for TCP!"
        },
        {
          title: 'Corporate AMT Timeline',
          type: 'text',
          content: "**History:**\n\n• **Pre-TCJA:** 20% AMT on corporations\n• **TCJA (2018):** AMT repealed for corporations\n• **IRA (2023+):** NEW 15% Corporate AMT for large corporations\n\n**The new AMT is different from the old one!**"
        },
        {
          title: 'Who Is Subject to CAMT?',
          type: 'text',
          content: "**Corporate Alternative Minimum Tax (CAMT):**\n\n**Applicable Corporation:**\n• Average annual adjusted financial statement income (AFSI) > $1 billion\n• 3-year average\n• Aggregation rules for related groups\n\n**Certain foreign-parented groups:**\n• $1 billion worldwide AFSI, AND\n• $100 million US AFSI"
        },
        {
          title: 'Computing CAMT',
          type: 'table',
          headers: ['Step', 'Description', 'Notes'],
          rows: [
            ['1', 'Start with book income (GAAP)', 'From financial statements'],
            ['2', 'Adjustments', 'Add back certain items'],
            ['3', '= Adjusted Financial Statement Income', 'AFSI'],
            ['4', 'Apply 15% rate', 'CAMT liability'],
            ['5', 'Compare to regular tax', 'Pay greater of two']
          ]
        },
        {
          title: '🧠 Memory Aid: CAMT Threshold',
          type: 'callout',
          content: "**\"Billion Dollar Minimum\"**\n\n• Only corps with $1B+ average income\n• Based on BOOK income (not taxable!)\n• 3-year lookback\n\n**Small corporations: NOT affected by CAMT**"
        },
        {
          title: 'AFSI Adjustments',
          type: 'text',
          content: "**Key adjustments from book income:**\n\n**Add back:**\n• Federal income taxes (not deductible)\n• Certain foreign taxes\n\n**Reduce by:**\n• Depreciation adjustment (may use tax depreciation)\n• NOL deduction (limited)\n\n**Goal: Taxable base closer to economic income**"
        },
        {
          title: '⚠️ Exam Trap: Regular Tax vs CAMT',
          type: 'warning',
          content: "**Corporation pays the GREATER of:**\n\n• Regular tax (21% on taxable income)\n• CAMT (15% on AFSI)\n\n**If CAMT > Regular:**\n• Excess = AMT credit carryforward\n• Can offset future regular tax\n\n**Most large corps still pay regular tax > CAMT**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "CAMT: 15% minimum tax on large corporations (IRA 2023)",
            "Threshold: $1 billion average AFSI over 3 years",
            "Based on book income, not taxable income",
            "Pay greater of regular tax or CAMT",
            "Excess CAMT creates credit carryforward",
            "Most corporations not affected (too small)"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-012',
    section: 'TCP',
    title: "Retirement Plan Distributions & Taxation",
    description: "Understand taxation of qualified plan and IRA distributions",
    order: 66,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Retirement", "Tax Planning"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Retirement distributions are a HUGE area of tax planning! Early withdrawals, RMDs, Roth conversions—clients need guidance on timing and tax consequences. This is heavily tested!"
        },
        {
          title: 'Types of Retirement Plans',
          type: 'text',
          content: "**Tax-Deferred (Traditional):**\n• 401(k), 403(b), Traditional IRA\n• Contributions: Pre-tax (deductible)\n• Growth: Tax-deferred\n• Distributions: Fully taxable as ordinary income\n\n**Tax-Free (Roth):**\n• Roth 401(k), Roth IRA\n• Contributions: After-tax (non-deductible)\n• Growth: Tax-free\n• Qualified distributions: Tax-free"
        },
        {
          title: 'Early Distribution Penalty',
          type: 'table',
          headers: ['Situation', 'Tax Treatment', '10% Penalty?'],
          rows: [
            ['Distribution before 59½', 'Ordinary income', 'YES (usually)'],
            ['Age 59½ or older', 'Ordinary income', 'NO'],
            ['Disability', 'Ordinary income', 'NO'],
            ['Death', 'Ordinary income', 'NO'],
            ['72(t) substantially equal payments', 'Ordinary income', 'NO'],
            ['First-time home ($10K max)', 'Ordinary income', 'NO (IRA only)'],
            ['Higher education expenses', 'Ordinary income', 'NO (IRA only)']
          ]
        },
        {
          title: '🧠 Memory Aid: 10% Penalty Exceptions',
          type: 'callout',
          content: "**\"MEDICS\"** - No 10% penalty:\n\n**M**edical expenses (>7.5% AGI)\n**E**ducation (IRA only)\n**D**isability\n**I**nherited (death)\n**C**ourt-ordered QDRO\n**S**ubstantially equal payments (72t)\n\n**Still ordinary income—just no 10%!**"
        },
        {
          title: 'Required Minimum Distributions (RMDs)',
          type: 'text',
          content: "**Must begin by:**\n• Age 73 (SECURE 2.0)\n• April 1 of year after reaching 73\n\n**Calculation:**\n• Account balance ÷ Life expectancy factor\n\n**Penalty for failure:**\n• 25% of amount not distributed (was 50%)\n• 10% if corrected timely\n\n**Roth IRAs: No RMDs during owner's lifetime!**"
        },
        {
          title: 'Roth Conversions',
          type: 'text',
          content: "**Converting Traditional to Roth:**\n\n**Tax consequence:**\n• Converted amount = Ordinary income NOW\n• No 10% penalty (even if under 59½)\n\n**Benefits:**\n• Future growth tax-free\n• No RMDs on Roth\n• Tax-free to heirs\n\n**Strategy:** Convert in low-income years"
        },
        {
          title: '⚠️ Exam Trap: Basis in IRAs',
          type: 'warning',
          content: "**If you have non-deductible IRA contributions:**\n\n• Cannot just withdraw basis tax-free\n• Pro-rata rule applies\n• Must aggregate ALL traditional IRAs\n\n**Formula:**\nTaxable % = Pre-tax balance / Total IRA balance\n\n**Each distribution: Part taxable, part return of basis**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Traditional distributions: Ordinary income",
            "Early withdrawal (before 59½): 10% penalty + tax",
            "Many exceptions to 10% penalty (MEDICS)",
            "RMDs begin at 73, penalty 25% if missed",
            "Roth qualified distributions: Tax-free",
            "Roth conversions: Pay tax now, tax-free later",
            "Pro-rata rule for IRAs with basis"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-013',
    section: 'TCP',
    title: "Tax Research Methodology",
    description: "Learn systematic approaches to researching tax questions",
    order: 67,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Tax Research", "Professional Responsibilities"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "CPAs must know how to research complex tax questions! Understanding the hierarchy of authority and research methodology is essential for providing accurate tax advice. This is a key TCP skill!"
        },
        {
          title: 'Tax Authority Hierarchy',
          type: 'text',
          content: "**Primary Authority (Most Weight):**\n\n1. **Internal Revenue Code (IRC)**\n2. **Treasury Regulations** (Final, Temporary, Proposed)\n3. **Court Decisions** (Supreme Court > Circuit Courts > Tax Court)\n4. **IRS Rulings** (Revenue Rulings, Revenue Procedures)\n\n**Secondary Authority:**\n• Tax services, treatises, articles\n• NOT binding but can guide research"
        },
        {
          title: 'Types of Treasury Regulations',
          type: 'table',
          headers: ['Type', 'Authority Level', 'Effective?'],
          rows: [
            ['Final Regulations', 'Highest (below IRC)', 'Yes, until changed'],
            ['Temporary Regulations', 'Same as Final', 'Yes, 3-year limit'],
            ['Proposed Regulations', 'Limited authority', 'Not binding'],
            ['Legislative Regs', 'Force of law', 'Very high authority'],
            ['Interpretive Regs', 'IRS interpretation', 'Can be challenged']
          ]
        },
        {
          title: '🧠 Memory Aid: Authority Weight',
          type: 'callout',
          content: "**\"SCRIPT\"** - Primary authority order:\n\n**S**tatute (IRC)\n**C**ourt decisions\n**R**egulations (Treasury)\n**I**RS Rulings\n**P**roposed regs (limited)\n**T**ax services (secondary)\n\n**Higher = More weight!**"
        },
        {
          title: 'Research Process Steps',
          type: 'text',
          content: "**Systematic approach:**\n\n1. **Identify facts** - Understand the transaction\n2. **Identify issues** - What tax questions arise?\n3. **Find authority** - IRC, regs, rulings, cases\n4. **Analyze authority** - Apply to facts\n5. **Reach conclusion** - Document reasoning\n6. **Communicate** - Memo or opinion\n\n**Document EVERYTHING!**"
        },
        {
          title: 'Substantial Authority Standard',
          type: 'text',
          content: "**For penalty protection:**\n\n**Substantial authority = ~40% likelihood**\n\n**Sources that count:**\n• IRC, Treasury Regs, Court cases\n• Revenue Rulings/Procedures\n• Joint Committee explanations\n• IRS Notices, Announcements\n\n**NOT substantial authority:**\n• Taxpayer-favorable settlements\n• Private letter rulings (to others)\n• Tax articles or treatises"
        },
        {
          title: '⚠️ Exam Trap: Conflicting Authority',
          type: 'warning',
          content: "**When authorities conflict:**\n\n**Same level:** Use more recent\n**Different courts:** Use circuit where taxpayer located\n**IRS vs Court:** Courts override IRS positions\n**Supreme Court:** Binding nationwide\n\n**Document why you chose specific authority!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IRC is highest authority, then regulations, then courts/rulings",
            "Treasury regs: Final and Temporary binding; Proposed not binding",
            "Research process: Facts → Issues → Authority → Analysis → Conclusion",
            "Substantial authority: ~40% likelihood of success",
            "PLRs only apply to taxpayer who requested",
            "When conflicting: Use Supreme Court or taxpayer's circuit",
            "Always document research and reasoning"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-014',
    section: 'TCP',
    title: "Tax Penalties and Interest",
    description: "Understand civil and criminal tax penalties",
    order: 68,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Tax Compliance", "Penalties", "Professional Responsibilities"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Penalties can significantly increase a taxpayer's liability! Understanding penalty provisions helps CPAs advise clients on compliance and penalty abatement strategies. This is essential TCP knowledge!"
        },
        {
          title: 'Failure to File vs Failure to Pay',
          type: 'table',
          headers: ['Penalty', 'Rate', 'Maximum', 'Key Points'],
          rows: [
            ['Failure to file', '5% per month', '25%', 'Based on tax due'],
            ['Failure to pay', '0.5% per month', '25%', 'Based on tax due'],
            ['Combined max', 'N/A', '47.5%', 'If both apply'],
            ['Fraudulent failure', '15% per month', '75%', 'Fraud intent proven']
          ]
        },
        {
          title: '🧠 Memory Aid: FTF vs FTP',
          type: 'callout',
          content: "**\"Filing is 10x worse than Paying\"**\n\n• **F**ailure **T**o **F**ile: **5%**/month\n• **F**ailure **T**o **P**ay: **0.5%**/month\n\n**Message:** Always file on time, even if you can't pay!\n\n**Extension to file ≠ Extension to pay**"
        },
        {
          title: 'Accuracy-Related Penalties',
          type: 'text',
          content: "**20% of underpayment due to:**\n\n• **Negligence** - Failure to exercise reasonable care\n• **Substantial understatement** - Understatement >10% of tax or $5,000\n• **Substantial valuation misstatement** - 150% or more overvaluation\n• **Gross valuation misstatement** - 200% or more (40% penalty!)\n\n**Defense:** Reasonable cause and good faith"
        },
        {
          title: 'Substantial Understatement Defense',
          type: 'text',
          content: "**Avoid 20% penalty if:**\n\n1. **Substantial authority** for position (~40% chance), OR\n2. **Adequate disclosure** on return + reasonable basis (~20% chance)\n\n**For tax shelters:**\n• Must have substantial authority AND\n• Reasonably believe more likely than not to be sustained\n\n**Disclosure alone won't help shelters!**"
        },
        {
          title: 'Civil Fraud Penalty',
          type: 'text',
          content: "**75% of underpayment attributable to fraud**\n\n**IRS burden:** Prove fraud by clear and convincing evidence\n\n**Badges of fraud:**\n• Understating income\n• Keeping two sets of books\n• False statements\n• Concealment of assets\n• Destruction of records\n\n**No statute of limitations on fraud!**"
        },
        {
          title: 'Criminal Penalties',
          type: 'table',
          headers: ['Offense', 'Prison', 'Fine'],
          rows: [
            ['Tax evasion (§7201)', 'Up to 5 years', '$250K ($500K corp)'],
            ['Fraud/false statement (§7206)', 'Up to 3 years', '$250K'],
            ['Failure to file (§7203)', 'Up to 1 year', '$100K'],
            ['Aiding/abetting (§7206(2))', 'Up to 3 years', '$250K']
          ]
        },
        {
          title: '⚠️ Exam Trap: Reasonable Cause',
          type: 'warning',
          content: "**Reasonable cause defense requires showing:**\n\n• Ordinary business care and prudence\n• Unable to comply despite efforts\n\n**Examples:**\n• Death or serious illness\n• Reliance on professional advice (must be reasonable)\n• Natural disaster\n\n**NOT reasonable cause:**\n• Didn't know the law\n• Relied on preparer without verifying"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Failure to file: 5%/month (max 25%); Failure to pay: 0.5%/month",
            "Always file on time—penalty is 10x higher than late payment",
            "Accuracy penalty: 20% for negligence or substantial understatement",
            "Defenses: Substantial authority or adequate disclosure",
            "Civil fraud: 75% penalty, no statute of limitations",
            "Criminal: Tax evasion up to 5 years prison",
            "Reasonable cause defense: Show ordinary care and prudence"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-015',
    section: 'TCP',
    title: "State and Local Tax (SALT) Considerations",
    description: "Understand nexus, apportionment, and multistate planning",
    order: 69,
    duration: 50,
    difficulty: 'advanced',
    topics: ["State Tax", "Tax Planning", "Business"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-E-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "State taxes add complexity to every business decision! Understanding nexus, apportionment, and the interplay of state taxes is essential for complete tax planning. The SALT deduction limit makes this even more critical!"
        },
        {
          title: 'Nexus Basics',
          type: 'text',
          content: "**Nexus = Connection requiring tax filing**\n\n**Physical nexus:**\n• Employees in state\n• Property in state\n• Physical presence\n\n**Economic nexus (post-Wayfair):**\n• Sales exceeding threshold (often $100K or 200 transactions)\n• No physical presence required\n• State by state rules vary!"
        },
        {
          title: 'Income Apportionment',
          type: 'table',
          headers: ['Method', 'Formula', 'Trend'],
          rows: [
            ['3-Factor (Traditional)', 'Sales + Property + Payroll / 3', 'Declining use'],
            ['Double-weighted sales', '2×Sales + Prop + Pay / 4', 'Some states'],
            ['Single sales factor', '100% Sales', 'Growing trend'],
            ['Market-based sourcing', 'Where customer is', 'Services trend']
          ]
        },
        {
          title: '🧠 Memory Aid: SALT Deduction Limit',
          type: 'callout',
          content: "**\"$10K SALT Cap\"**\n\n• State and local tax deduction\n• Limited to $10,000 (individuals)\n• Includes income tax + property tax\n• TCJA through 2025\n\n**Workarounds:**\n• PTE elections (pass-through entity tax)\n• Charitable contributions"
        },
        {
          title: 'Pass-Through Entity (PTE) Elections',
          type: 'text',
          content: "**Strategy to bypass SALT cap:**\n\n**How it works:**\n• Entity pays state tax at entity level\n• Deduction against federal business income\n• Not subject to $10K individual cap\n\n**IRS blessed:** Notice 2020-75\n\n**Most states now offer PTE election**\n\n**Must file election timely!**"
        },
        {
          title: 'Sales Tax Considerations',
          type: 'text',
          content: "**Key issues:**\n\n• **Sourcing:** Origin vs destination\n• **Exemptions:** Resale, manufacturing, necessities\n• **Digital goods:** Growing taxation\n• **Services:** Historically exempt, changing\n\n**South Dakota v. Wayfair (2018):**\n• Economic nexus for sales tax upheld\n• Remote sellers must collect\n• Changed e-commerce taxation"
        },
        {
          title: '⚠️ Exam Trap: Public Law 86-272',
          type: 'warning',
          content: "**P.L. 86-272 Protections:**\n\n• Solicitation of tangible goods = No income tax nexus\n• Only protects INCOME tax (not sales tax!)\n\n**Does NOT protect:**\n• Services\n• Intangibles\n• Activities beyond solicitation\n\n**States narrowly interpret this protection**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Nexus: Physical or economic connection to state",
            "Post-Wayfair: Economic nexus common ($100K/200 transactions)",
            "Apportionment: Trend toward single sales factor",
            "SALT deduction capped at $10K for individuals",
            "PTE elections: Bypass SALT cap for pass-throughs",
            "P.L. 86-272: Limited protection for solicitation of goods",
            "Sales tax: Destination sourcing, economic nexus"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-016',
    section: 'TCP',
    title: "Estimated Tax Payments",
    description: "Master estimated tax rules for individuals and businesses",
    order: 70,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Tax Compliance", "Individual Tax", "Corporate Tax"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Estimated tax payments are required throughout the year! Understanding safe harbors and calculations helps avoid underpayment penalties. This is a core compliance topic on TCP!"
        },
        {
          title: 'Individual Estimated Taxes',
          type: 'text',
          content: "**Due dates:**\n• April 15, June 15, Sept 15, Jan 15\n\n**Who must pay:**\n• Expected tax liability ≥ $1,000\n• Withholding won't cover obligation\n\n**Safe harbors (no penalty if pay):**\n• 90% of current year tax, OR\n• 100% of prior year tax (110% if AGI > $150K)"
        },
        {
          title: 'Safe Harbor Comparison',
          type: 'table',
          headers: ['Method', 'Requirement', 'Best When'],
          rows: [
            ['Current Year', '90% of current tax', 'Income decreasing'],
            ['Prior Year (Regular)', '100% of prior tax', 'Income increasing'],
            ['Prior Year (High AGI)', '110% of prior tax', 'AGI > $150K'],
            ['Annualized Income', 'Complex calculation', 'Uneven income']
          ]
        },
        {
          title: '🧠 Memory Aid: Safe Harbor',
          type: 'callout',
          content: "**\"90/100/110 Rule\"**\n\n• **90%** of THIS year's tax, OR\n• **100%** of LAST year's tax\n• **110%** if high income (>$150K AGI)\n\n**Easiest:** Pay 110% of prior year—no guessing needed!"
        },
        {
          title: 'Corporate Estimated Taxes',
          type: 'text',
          content: "**Due dates:**\n• April 15, June 15, Sept 15, Dec 15\n\n**Required payments:**\n• 100% of current year tax, OR\n• 100% of prior year tax (if positive)\n\n**Large corporations ($1M+ taxable income):**\n• Can use prior year only for FIRST payment\n• Must pay 100% of current year for remaining\n\n**No 110% rule for corporations**"
        },
        {
          title: 'Underpayment Penalty',
          type: 'text',
          content: "**Penalty = Interest on underpaid amount**\n\n**Rate:** Federal short-term rate + 3%\n\n**Waiver available if:**\n• Casualty, disaster, or unusual circumstance\n• Retired/disabled (age 62+) and reasonable cause\n\n**Penalty calculated quarterly—can vary by quarter!**"
        },
        {
          title: '⚠️ Exam Trap: Annualized Method',
          type: 'warning',
          content: "**For uneven income (seasonal, bonuses):**\n\n• Annualize income for each period\n• Calculate tax on annualized amount\n• Reduces penalty if income earned late\n\n**Must complete Schedule AI (Form 2210)**\n\n**Complex but can save penalty!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Individual due: April 15, June 15, Sept 15, Jan 15",
            "Corporate due: April 15, June 15, Sept 15, Dec 15",
            "Safe harbor: 90% current OR 100%/110% prior year",
            "High income (>$150K): Use 110% of prior year",
            "Large corporations: Prior year only for first payment",
            "Annualized method: Reduces penalty for uneven income",
            "Penalty = Interest rate on quarterly underpayments"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-017',
    section: 'TCP',
    title: "Net Operating Loss (NOL) Rules",
    description: "Understand NOL carryforward rules and limitations",
    order: 71,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Corporate Tax", "Individual Tax", "Tax Planning"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "NOLs are valuable tax assets! Understanding the rules for carryforwards, limitations, and planning opportunities is essential. TCJA significantly changed these rules!"
        },
        {
          title: 'NOL Rules: Current Law',
          type: 'text',
          content: "**Post-TCJA rules (NOLs after 12/31/2017):**\n\n**Carryback:** None (generally)\n**Carryforward:** Indefinite\n**Limitation:** 80% of taxable income\n\n**Pre-TCJA NOLs:**\n• 20-year carryforward\n• 2-year carryback\n• No percentage limitation"
        },
        {
          title: 'NOL Calculation',
          type: 'table',
          headers: ['Individual Modifications', 'Add Back', 'Why'],
          rows: [
            ['Non-business deductions', 'Yes (excess)', 'NOL = Business loss only'],
            ['Personal exemptions', 'Yes', 'Not business related'],
            ['Capital loss excess', 'Yes', '$3K limit doesn\'t apply'],
            ['NOL deduction', 'Yes', 'Circular otherwise']
          ]
        },
        {
          title: '🧠 Memory Aid: 80% Limitation',
          type: 'callout',
          content: "**\"Keep 20% Taxable\"**\n\n• NOL can only offset 80% of income\n• Always pay tax on at least 20%\n• Applies to post-2017 NOLs\n\n**Example:**\nTaxable income: $100,000\nNOL available: $150,000\nNOL allowed: $80,000 (80% limit)\nTaxable: $20,000 remains"
        },
        {
          title: 'Section 382 Limitation',
          type: 'text',
          content: "**Ownership change limitation:**\n\n**When triggered:**\n• >50% ownership change in 3 years\n• \"Loss corporation\" status\n\n**Annual limit:**\nFMV of corporation × Long-term tax-exempt rate\n\n**Effect:** Limits annual NOL usage after acquisition\n\n**Purpose:** Prevent trafficking in NOLs"
        },
        {
          title: 'Planning Opportunities',
          type: 'text',
          content: "**Maximize NOL benefits:**\n\n1. **Accelerate income** into NOL year\n2. **Defer deductions** to future years\n3. **Watch ownership changes** (§382)\n4. **Monitor 80% limit** timing\n5. **Consider carryback elections** (if available)\n\n**Farming, insurance losses:** Special carryback rules"
        },
        {
          title: '⚠️ Exam Trap: Which Rules Apply?',
          type: 'warning',
          content: "**Timing matters!**\n\n**Pre-2018 NOLs:**\n• 20-year carryforward\n• No 80% limit\n• May have carryback\n\n**Post-2017 NOLs:**\n• Indefinite carryforward\n• 80% taxable income limit\n• No carryback (usually)\n\n**Stack pre-2018 NOLs first!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Post-TCJA NOLs: Indefinite carryforward, 80% limit, no carryback",
            "Pre-TCJA NOLs: 20-year carryforward, no % limit",
            "Individual NOL: Business losses only (modifications required)",
            "Section 382: Limits NOL after >50% ownership change",
            "Stack older NOLs first (more favorable rules)",
            "Special carryback for farming and insurance losses",
            "Plan to accelerate income, defer deductions"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-018',
    section: 'TCP',
    title: "Accounting Method Changes",
    description: "Learn how to change accounting methods for tax purposes",
    order: 72,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Tax Compliance", "Accounting Methods", "Tax Planning"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Changing accounting methods can defer income or accelerate deductions! But you need IRS consent and must handle the §481(a) adjustment correctly. This is a sophisticated tax planning tool!"
        },
        {
          title: 'Automatic vs Non-Automatic Changes',
          type: 'table',
          headers: ['Type', 'IRS Consent', 'Filing', 'Timing'],
          rows: [
            ['Automatic', 'Deemed granted', 'Form 3115', 'With return'],
            ['Non-automatic', 'Required', 'Form 3115', 'During year'],
            ['Advance consent', 'Ruling required', 'User fee', 'Before change']
          ]
        },
        {
          title: '🧠 Memory Aid: Form 3115',
          type: 'callout',
          content: "**\"3115 = Method Change\"**\n\n• Application for Change in Accounting Method\n• File with tax return (automatic)\n• Or file during year (advance consent)\n\n**National office copy required for:**\n• Non-automatic changes\n• Certain automatic changes"
        },
        {
          title: 'Section 481(a) Adjustment',
          type: 'text',
          content: "**Catch-up adjustment for method changes:**\n\n**Purpose:** Prevent duplication or omission of income/deductions\n\n**Calculation:**\n• Difference between old and new method\n• As of beginning of year of change\n\n**Positive adjustment:** Taxpayer owes more (spread over 4 years)\n**Negative adjustment:** Taxpayer deducts (take in year 1)"
        },
        {
          title: 'Common Automatic Changes',
          type: 'text',
          content: "**Revenue Procedure 2023-34 (updated annually):**\n\n• Cash to accrual method\n• Change in depreciation method\n• Inventory method changes\n• Revenue recognition changes\n• Bad debt reserve to direct write-off\n\n**Must meet eligibility requirements**\n\n**Audit protection available for automatic changes**"
        },
        {
          title: 'Taxpayer-Favorable vs IRS-Initiated',
          type: 'text',
          content: "**Taxpayer-initiated (voluntary):**\n• 4-year spread for positive §481(a)\n• Immediate recognition for negative\n• Audit protection\n\n**IRS-initiated (on exam):**\n• Entire adjustment in year of change\n• No spread period\n• May include penalties\n\n**Much better to change voluntarily!**"
        },
        {
          title: '⚠️ Exam Trap: Eligibility for Automatic',
          type: 'warning',
          content: "**Cannot use automatic procedures if:**\n\n• Under IRS examination for issue\n• Changed same method in past 5 years\n• Method is contrary to regulations\n\n**Must file correctly:**\n• Duplicate to national office (sometimes)\n• Timely with return\n• Include §481(a) adjustment"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Method changes require IRS consent (automatic or advance)",
            "Form 3115 filed with return (automatic) or during year (advance)",
            "§481(a) adjustment: Catch-up for switching methods",
            "Positive adjustment: Spread over 4 years",
            "Negative adjustment: Take immediately (year 1)",
            "Voluntary changes: Better than IRS-initiated",
            "Check Rev Proc for current automatic changes list"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-019',
    section: 'TCP',
    title: "Wealth Transfer Strategies",
    description: "Understand estate and gift planning techniques",
    order: 73,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Estate Tax", "Gift Tax", "Tax Planning"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-F-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "With $13.61 million exemption (2024) sunsetting in 2026, wealth transfer planning is critical! Understanding strategies to minimize transfer taxes while achieving client goals is essential for TCP!"
        },
        {
          title: 'Annual Exclusion Gifting',
          type: 'text',
          content: "**$18,000 per donee (2024):**\n\n• Each donor can give to unlimited recipients\n• Spouses can split gifts ($36K together)\n• Present interest required\n• No gift tax, no return required (usually)\n\n**Compound effect:**\nMarried couple to married child + spouse + 2 grandkids:\n$36K × 4 = $144K/year tax-free!"
        },
        {
          title: 'Grantor Retained Annuity Trust (GRAT)',
          type: 'table',
          headers: ['Feature', 'Description', 'Benefit'],
          rows: [
            ['Structure', 'Trust pays annuity to grantor', 'Low gift value'],
            ['Term', '2+ years typically', 'Shorter = less mortality risk'],
            ['Remainder', 'To beneficiaries after term', 'Growth passes tax-free'],
            ['Zeroed-out', 'Annuity = FMV of gift', 'No gift tax'],
            ['7520 rate', 'Hurdle rate for success', 'Low rates favor GRATs']
          ]
        },
        {
          title: '🧠 Memory Aid: GRAT Success',
          type: 'callout',
          content: "**\"Beat the Rate\"**\n\n• GRAT works if growth > §7520 rate\n• Appreciation passes to remaindermen\n• Gift value calculated at funding\n\n**Best for:**\n• Assets expected to appreciate\n• Low interest rate environment\n• Taxpayer survives term"
        },
        {
          title: 'Intentionally Defective Grantor Trusts (IDGTs)',
          type: 'text',
          content: "**\"Defective\" for income tax, not estate/gift:**\n\n**Structure:**\n• Grantor taxed on trust income\n• Trust assets out of estate\n\n**Benefits:**\n• Grantor pays income tax (tax-free gift!)\n• Trust grows without income tax drag\n• Basis step-up issues (planning needed)\n\n**Often combined with sales to IDGT**"
        },
        {
          title: 'Family Limited Partnerships (FLPs)',
          type: 'text',
          content: "**Transfer vehicle for family businesses/assets:**\n\n**Structure:**\n• Parents: General partners (control)\n• Children: Limited partners\n\n**Valuation discounts:**\n• Lack of marketability: 20-40%\n• Lack of control: 10-35%\n\n**IRS scrutiny:** Must have legitimate business purpose\n\n**Cannot be formed deathbed with no business reason**"
        },
        {
          title: 'Charitable Strategies',
          type: 'text',
          content: "**Charitable Remainder Trust (CRT):**\n• Income to donor for life\n• Remainder to charity\n• Immediate income tax deduction\n• No capital gains on sale\n\n**Charitable Lead Trust (CLT):**\n• Income to charity for term\n• Remainder to family\n• Reduces gift/estate tax\n\n**Private foundation vs donor-advised fund**"
        },
        {
          title: '⚠️ Exam Trap: Sunset Provisions',
          type: 'warning',
          content: "**TCJA exemption expires after 2025:**\n\n**Current (2024):** $13.61 million\n**Post-2025:** ~$7 million (projected)\n\n**\"Use it or lose it\" planning:**\n• Make large gifts before sunset\n• Anti-clawback regulations protect gifts\n\n**If client dies after sunset, gifts not added back!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Annual exclusion: $18K/donee (2024), no return needed",
            "GRAT: Annuity trust, zeroed-out gift, appreciation passes tax-free",
            "IDGT: Defective for income tax, grantor pays trust tax",
            "FLP: Valuation discounts, must have business purpose",
            "CRT: Income to donor, remainder to charity, immediate deduction",
            "Exemption sunsets 2026: Plan large gifts before then",
            "Anti-clawback protects gifts if exemption reduced"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-III-020',
    section: 'TCP',
    title: "Compensation Planning Strategies",
    description: "Optimize tax treatment of employee compensation",
    order: 74,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Individual Tax", "Compensation", "Tax Planning"],
    blueprintArea: 'TCP-III',
    blueprintTopic: 'TCP-III-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Compensation planning affects both employer and employee! Understanding the tax implications of salary, bonuses, equity, and fringe benefits helps maximize after-tax value. This is practical TCP planning!"
        },
        {
          title: 'Types of Compensation',
          type: 'table',
          headers: ['Type', 'Employee Tax', 'Employer Deduction', 'Timing'],
          rows: [
            ['Salary/wages', 'Ordinary income', 'When paid', 'Constructive receipt'],
            ['Bonus', 'Ordinary income', 'When paid', '2.5 month rule'],
            ['Stock options (ISO)', 'Defer until sale', 'Generally none', 'AMT impact'],
            ['Stock options (NQSO)', 'At exercise', 'At exercise', 'Spread = income'],
            ['Restricted stock', 'At vest (or 83b)', 'At vest', '83(b) election']
          ]
        },
        {
          title: '🧠 Memory Aid: ISO vs NQSO',
          type: 'callout',
          content: "**\"ISO = Income Saved (sort Of)\"**\n\n**ISO:**\n• No regular tax at exercise\n• AMT preference item\n• LTCG if hold 1yr from exercise, 2yr from grant\n\n**NQSO:**\n• Ordinary income at exercise (spread)\n• Employer gets deduction\n• Basis = FMV at exercise"
        },
        {
          title: 'Section 409A: Deferred Compensation',
          type: 'text',
          content: "**Nonqualified deferred comp rules:**\n\n**Requirements:**\n• Written plan\n• Election timing (prior year or 30 days of eligible)\n• Distribution events: Separation, death, disability, change in control, fixed date\n\n**Violation penalty:**\n• 20% additional tax + interest\n• All deferred amounts taxable\n\n**Strict rules—no informal arrangements!**"
        },
        {
          title: 'Fringe Benefits',
          type: 'text',
          content: "**Tax-free to employee if:**\n\n• **Health insurance** (employer-paid premiums)\n• **Group-term life** (up to $50K coverage)\n• **Dependent care** (up to $5K)\n• **Educational assistance** (up to $5,250)\n• **De minimis fringes** (coffee, occasional meals)\n• **Working condition fringes** (job-related items)\n\n**Employer deducts, employee excludes!**"
        },
        {
          title: 'Excess Compensation Issues',
          type: 'text',
          content: "**Reasonableness test (C corps):**\n• Compensation must be reasonable for services\n• Excess recharacterized as dividend (no deduction)\n• IRS scrutiny for owner-employees\n\n**$1 million limit (public companies):**\n• Deduction capped at $1M per covered employee\n• Performance-based exception eliminated by TCJA\n• CFO and next 3 highest paid included"
        },
        {
          title: '⚠️ Exam Trap: Section 83(b) Election',
          type: 'warning',
          content: "**For restricted stock:**\n\n**Without 83(b):**\n• Taxed at vesting on FMV\n• Risk of higher tax if appreciates\n\n**With 83(b):**\n• Taxed NOW on current value\n• Future appreciation = Capital gain\n• Must file within 30 DAYS\n\n**Risk:** If forfeited, no refund of tax paid!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Salary/wages: Ordinary income when received",
            "ISO: No tax at exercise, LTCG treatment if held properly",
            "NQSO: Ordinary income at exercise, employer deduction",
            "Section 409A: Strict rules for deferred comp, 20% penalty",
            "Many fringes tax-free to employee, deductible by employer",
            "83(b) election: 30 days to elect, upfront tax for future LTCG",
            "Reasonableness required; $1M limit for public companies"
          ]
        }
      ]
    }
  },

  // =============================================
  // TCP: ADDITIONAL ADVANCED TOPICS
  // =============================================
  {
    id: 'TCP-II-015',
    section: 'TCP',
    title: "Partnership Taxation Fundamentals",
    description: "Master pass-through taxation and basis rules",
    order: 75,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Partnership Tax", "Pass-through", "Basis"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Partnerships are a major pass-through entity! Understanding flow-through taxation, basis rules, and special allocations is essential for TCP. Complex but highly testable!"
        },
        {
          title: 'Pass-Through Taxation',
          type: 'text',
          content: "**No entity-level tax:**\n\n• Partnership files Form 1065 (informational)\n• Items flow to partners on Schedule K-1\n• Character of items preserved\n• Partners report on personal returns\n\n**Partners taxed whether or not distributed!**"
        },
        {
          title: 'Partner Basis',
          type: 'table',
          headers: ['Event', 'Effect on Basis', 'Notes'],
          rows: [
            ['Initial contribution', 'Cash/property basis', 'Carryover for property'],
            ['Share of income', 'Increase', 'Including tax-exempt'],
            ['Share of loss', 'Decrease', 'Subject to limits'],
            ['Distributions', 'Decrease', 'Cash first'],
            ['Share of liabilities', 'Increase', 'Based on allocation']
          ]
        },
        {
          title: '🧠 Memory Aid: Basis Order',
          type: 'callout',
          content: "**\"I SLID\" for basis adjustments:**\n\n**I**ncrease for Income\n**S**ubtract Losses\n**L**ess Distributions\n**I**ncrease for share of liabilities\n**D**on't go below zero!\n\n**Order matters at year-end!**"
        },
        {
          title: 'Loss Limitation Rules',
          type: 'text',
          content: "**Four hurdles for loss deduction:**\n\n1. **Basis limitation:** Cannot exceed outside basis\n2. **At-risk limitation:** Amount economically at risk\n3. **Passive activity rules:** PAL limitations apply\n4. **Excess business loss:** $500K/$250K limit\n\n**Apply in ORDER!**"
        },
        {
          title: 'Guaranteed Payments',
          type: 'text',
          content: "**Payments for services/capital use:**\n\n**To partner:**\n• Ordinary income (like salary)\n• Reported on K-1\n• Subject to SE tax\n\n**To partnership:**\n• Deductible expense\n• Before computing partnership income\n\n**Not affected by partnership profit/loss**"
        },
        {
          title: '⚠️ Exam Trap: Property Contributions',
          type: 'warning',
          content: "**Contributed property:**\n\n**Generally no gain/loss recognized:**\n• Partner takes carryover basis\n• Partnership takes carryover basis\n• Holding period tacks\n\n**Exceptions (gain recognized):**\n• Investment company\n• Partnership assumes excess liabilities\n• Services for interest"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "No entity tax—items flow through to partners",
            "Character of income/loss preserved",
            "Partner basis: Contributions + Income − Distributions − Losses + Liabilities",
            "Four loss limits: Basis, At-risk, PAL, Excess business",
            "Guaranteed payments: Ordinary income to partner",
            "Property contributions: Generally no gain/loss",
            "Schedule K-1 reports each partner's share"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-II-016',
    section: 'TCP',
    title: "S Corporation Taxation",
    description: "Understand S corp requirements and taxation rules",
    order: 76,
    duration: 55,
    difficulty: 'advanced',
    topics: ["S Corporation Tax", "Pass-through", "Shareholder Basis"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "S corps combine corporate liability protection with pass-through taxation! Understanding eligibility, basis rules, and the differences from partnerships is critical for TCP!"
        },
        {
          title: 'S Corporation Requirements',
          type: 'text',
          content: "**To elect S status:**\n\n• Domestic corporation\n• 100 or fewer shareholders\n• Only eligible shareholders (individuals, estates, certain trusts)\n• One class of stock\n• No ineligible corporations as shareholders\n\n**All shareholders must consent to election!**"
        },
        {
          title: 'S Corp vs Partnership Basis',
          type: 'table',
          headers: ['Feature', 'S Corporation', 'Partnership'],
          rows: [
            ['Debt basis', 'Only shareholder loans', 'Share of ALL liabilities'],
            ['Basis order', 'Stock, then debt', 'Combined outside basis'],
            ['Restore debt basis', 'After stock basis', 'N/A'],
            ['Distributions', 'Stock basis only', 'Outside basis']
          ]
        },
        {
          title: '🧠 Memory Aid: S Corp Basis',
          type: 'callout',
          content: "**S Corp = Stock + Debt (personal loans only)**\n\n**Key difference from partnership:**\n• Entity debt does NOT increase basis\n• Only loans FROM shareholder TO S corp\n\n**\"S = Shareholders own debt only\"**"
        },
        {
          title: 'Shareholder Basis Rules',
          type: 'text',
          content: "**Ordering rules (year-end):**\n\n1. Increase for income items\n2. Decrease for distributions (not below zero)\n3. Decrease for non-deductible expenses\n4. Decrease for losses (not below zero)\n\n**Losses in excess of stock basis:**\n• Reduce debt basis (creates gain later)\n• Carry forward excess losses"
        },
        {
          title: 'Built-In Gains Tax',
          type: 'text',
          content: "**When C corp converts to S:**\n\n• 5-year recognition period\n• Tax on built-in gains at corporate rate\n• Limited to net built-in gain at conversion\n\n**Purpose:** Prevent C corps from avoiding double taxation by converting to S\n\n**Also: LIFO recapture tax**"
        },
        {
          title: '⚠️ Exam Trap: Reasonable Compensation',
          type: 'warning',
          content: "**Shareholder-employees MUST receive:**\n\n• Reasonable salary for services\n• Subject to FICA/payroll taxes\n\n**IRS scrutiny if:**\n• All income as distributions\n• No or minimal salary\n• Services rendered\n\n**Consequences:** Reclassification + penalties"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "S corp: 100 shareholders, one class stock, eligible owners",
            "Pass-through taxation, no entity tax (usually)",
            "Basis includes stock + shareholder loans only",
            "Entity debt does NOT increase shareholder basis",
            "Built-in gains tax on C to S conversion",
            "Reasonable compensation required",
            "Distributions tax-free to extent of basis"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-II-017',
    section: 'TCP',
    title: "C Corporation Taxation Overview",
    description: "Understand corporate tax calculation and distributions",
    order: 77,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Corporate Tax", "Dividends", "E&P"],
    blueprintArea: 'TCP-II',
    blueprintTopic: 'TCP-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "C corps face double taxation—understanding how to minimize it is key! Corporate tax rates, E&P calculations, and dividend treatment are essential TCP knowledge!"
        },
        {
          title: 'Corporate Tax Rate',
          type: 'text',
          content: "**Post-TCJA:**\n\n• Flat 21% corporate rate\n• No graduated brackets\n• No AMT for most corporations\n\n**Personal service corporations:**\n• Also 21% (previously 35% flat rate)\n\n**State taxes:** Additional (vary by state)"
        },
        {
          title: 'Earnings and Profits (E&P)',
          type: 'table',
          headers: ['Adjustment', 'Taxable Income to E&P', 'Direction'],
          rows: [
            ['Federal income tax', 'Subtract', 'Reduces E&P'],
            ['Tax-exempt interest', 'Add', 'Increases E&P'],
            ['Excess depreciation', 'Add back', 'Use ADS for E&P'],
            ['Life insurance proceeds', 'Add', 'Increases E&P'],
            ['Dividends paid', 'Subtract', 'Reduces E&P']
          ]
        },
        {
          title: '🧠 Memory Aid: E&P Purpose',
          type: 'callout',
          content: "**E&P = \"Economic Ability to Pay Dividends\"**\n\n**Distribution treatment:**\n1. Dividend (to extent of E&P)\n2. Return of capital (to extent of basis)\n3. Capital gain (excess)\n\n**E&P determines dividend portion!**"
        },
        {
          title: 'Distribution Ordering',
          type: 'text',
          content: "**When corporation distributes cash:**\n\n**1. Current E&P first** (pro rata by date)\n**2. Accumulated E&P** (in order made)\n**3. Return of capital** (reduce stock basis)\n**4. Capital gain** (after basis is zero)\n\n**Each layer has different tax treatment**"
        },
        {
          title: 'Dividends Received Deduction',
          type: 'text',
          content: "**Corporate shareholders get DRD:**\n\n**Ownership %** → **DRD %**\n• < 20%: 50% DRD\n• 20-80%: 65% DRD\n• > 80%: 100% DRD (affiliated group)\n\n**Purpose:** Reduce triple taxation\n\n**Taxable income limitation may apply**"
        },
        {
          title: '⚠️ Exam Trap: Accumulated Earnings Tax',
          type: 'warning',
          content: "**20% penalty on excess accumulation:**\n\n**When:**\n• Accumulation beyond reasonable business needs\n• Purpose: Avoid shareholder-level tax\n\n**Credit allowed:**\n• Greater of $250K or business needs\n• $150K for PSCs\n\n**Document business purpose for accumulation!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Corporate rate: Flat 21%",
            "E&P measures ability to pay dividends",
            "Distributions: Dividend → Return of capital → Capital gain",
            "Current E&P allocated pro rata by date",
            "DRD reduces corporate dividend taxation",
            "Accumulated earnings tax: 20% on excess",
            "Document business needs for accumulations"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-I-010',
    section: 'TCP',
    title: "Tax Credits: Business and Individual",
    description: "Understand major tax credits and their application",
    order: 78,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Tax Credits", "Individual Tax", "Business Tax"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Credits are more valuable than deductions—they reduce tax dollar-for-dollar! Understanding major credits, limitations, and refundability is essential for tax planning!"
        },
        {
          title: 'Credit vs Deduction',
          type: 'text',
          content: "**Key difference:**\n\n**Deduction:** Reduces taxable income\n• Value = Amount × Marginal rate\n\n**Credit:** Reduces tax directly\n• Value = Dollar for dollar\n\n**Example:** $1,000 at 24% bracket\n• Deduction saves: $240\n• Credit saves: $1,000"
        },
        {
          title: 'Individual Tax Credits',
          type: 'table',
          headers: ['Credit', 'Max Amount', 'Refundable?'],
          rows: [
            ['Child Tax Credit', '$2,000/child', 'Partially ($1,600)'],
            ['Child/Dependent Care', '$3,000-6,000', 'No'],
            ['EITC', 'Varies (up to ~$7,400)', 'Yes'],
            ['American Opportunity', '$2,500', 'Partially (40%)'],
            ['Lifetime Learning', '$2,000', 'No'],
            ['Saver\'s Credit', '$1,000-2,000', 'No']
          ]
        },
        {
          title: '🧠 Memory Aid: Refundable Credits',
          type: 'callout',
          content: "**\"RACE\" for refundable:**\n\n**R**efundable = Get money even if no tax\n**A**OTC (40% refundable)\n**C**hild Tax Credit (partially)\n**E**ITC (fully refundable)\n\n**Nonrefundable = Only reduces tax to zero**"
        },
        {
          title: 'Business Tax Credits',
          type: 'text',
          content: "**Common business credits:**\n\n• **R&D Credit:** Qualified research expenses\n• **Work Opportunity Credit:** Targeted group hiring\n• **Disabled Access Credit:** Small business accessibility\n• **Low-Income Housing Credit:** Affordable housing\n• **General Business Credit:** Carryback 1, Forward 20\n\n**Subject to ordering and limitation rules**"
        },
        {
          title: 'Foreign Tax Credit',
          type: 'text',
          content: "**For taxes paid to foreign countries:**\n\n**Limitation:**\nFTC = US Tax × (Foreign source income / Worldwide income)\n\n**Cannot exceed US tax on foreign income**\n\n**Excess credits:**\n• Carryback 1 year\n• Carryforward 10 years\n\n**Alternative: Deduct instead of credit**"
        },
        {
          title: '⚠️ Exam Trap: Phase-outs',
          type: 'warning',
          content: "**Many credits phase out at higher incomes:**\n\n**Child Tax Credit:** Starts at $200K/$400K\n**EITC:** Varies by filing status\n**Education credits:** ~$80K-90K range\n\n**Always check income limits!**\n\n**Phase-out can make marginal rate very high**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Credits reduce tax dollar-for-dollar",
            "Refundable credits can create refund",
            "CTC: $2,000, partially refundable",
            "EITC: Fully refundable, low income",
            "Education: AOTC ($2,500) vs LLC ($2,000)",
            "FTC limited to US tax on foreign income",
            "Watch for phase-outs at higher incomes"
          ]
        }
      ]
    }
  },
  {
    id: 'TCP-I-011',
    section: 'TCP',
    title: "Qualified Business Income Deduction (Section 199A)",
    description: "Master the 20% pass-through deduction rules",
    order: 79,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Pass-through", "Tax Deductions", "Tax Planning"],
    blueprintArea: 'TCP-I',
    blueprintTopic: 'TCP-I-D-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "The QBI deduction can be worth 20% of qualified business income! Understanding the limitations, phase-outs, and planning opportunities is essential for pass-through entity planning!"
        },
        {
          title: 'Basic QBI Deduction',
          type: 'text',
          content: "**20% deduction for:**\n\n• Sole proprietors (Schedule C)\n• Partners (Schedule K-1)\n• S corp shareholders (Schedule K-1)\n• REIT dividends\n• PTP income\n\n**Deducted from AGI (not itemized)**\n\n**Maximum: 20% of QBI**"
        },
        {
          title: 'Limitations',
          type: 'table',
          headers: ['Limitation', 'Threshold (MFJ)', 'Effect'],
          rows: [
            ['Taxable income limit', 'All levels', 'Lesser of QBI or TI'],
            ['W-2/property limit', '> $364,200', '50% W-2 OR 25% W-2 + 2.5% property'],
            ['SSTB phase-out', '> $364,200', 'Complete exclusion above threshold'],
            ['Overall cap', 'All levels', '20% of (TI − Net cap gains)']
          ]
        },
        {
          title: '🧠 Memory Aid: SSTB',
          type: 'callout',
          content: "**Specified Service Trade or Business:**\n\n**\"HELP!\"**\n**H**ealth\n**E**ngineering... wait no, not included!\n**L**aw\n**P**erforming arts\n\n**Also:** Accounting, consulting, financial services, athletics\n\n**Engineering and Architecture are NOT SSTB!**"
        },
        {
          title: 'W-2 Wage Limitation',
          type: 'text',
          content: "**Above threshold, limited to greater of:**\n\n**Option 1:** 50% of W-2 wages\n**Option 2:** 25% of W-2 wages + 2.5% of UBIA\n\n**UBIA:** Unadjusted Basis Immediately After Acquisition (property)\n\n**Below threshold:** No W-2/property limit applies"
        },
        {
          title: 'Planning Strategies',
          type: 'text',
          content: "**Maximize QBI deduction:**\n\n• Aggregate related businesses\n• Increase W-2 wages (S corps especially)\n• Consider REIT investments\n• Manage taxable income around thresholds\n• Evaluate entity structure\n\n**SSTB owners:** Stay below threshold if possible"
        },
        {
          title: '⚠️ Exam Trap: What\'s NOT QBI',
          type: 'warning',
          content: "**Excluded from QBI:**\n\n• Wages/salary (employee income)\n• Investment income (portfolio)\n• Guaranteed payments for services\n• Reasonable compensation (S corp)\n• Short-term capital gains\n\n**QBI = Business PROFIT, not all income!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "20% deduction on qualified business income",
            "Available to pass-through owners and REIT investors",
            "W-2 wage/property limit above threshold",
            "SSTB completely excluded above threshold",
            "Engineering and architecture NOT SSTB",
            "Excludes wages, investment income, guaranteed payments",
            "Below AGI deduction (not itemized)"
          ]
        }
      ]
    }
  }
];
