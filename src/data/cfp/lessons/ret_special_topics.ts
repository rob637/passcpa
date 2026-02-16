/**
 * CFP Domain 6: Retirement Savings and Income Planning
 * Area RET-5: Special Retirement Topics
 * 
 * These lessons cover inherited IRAs, divorce, NUA,
 * and special distribution rules under SECURE Act.
 */

import type { Lesson } from '../../../types';

export const CFP_RET5_LESSONS: Lesson[] = [
  {
    id: 'CFP-RET-L017',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Inherited IRAs and SECURE Act Rules',
    description: 'Apply the 10-year rule for inherited IRAs',
    order: 17,
    duration: 55,
    difficulty: 'advanced',
    topics: [
      'Apply the 10-year rule for inherited IRAs',
      'Identify eligible designated beneficiaries',
      'Calculate RMDs for inherited accounts',
      'Compare pre-SECURE and post-SECURE inheritance rules'
    ],
    blueprintArea: 'RET-5',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'The SECURE Act (2019) dramatically changed inherited IRA rules, eliminating the "stretch IRA" for most beneficiaries.'
        },
        {
          title: 'Pre-SECURE: Stretch IRA',
          type: 'text',
          content: 'Before SECURE Act, any designated beneficiary could take RMDs over their own life expectancy, stretching distributions over decades. Example: 30-year-old inheriting IRA could stretch over 53+ years—tremendous tax-deferred growth.'
        },
        {
          title: 'SECURE Act: The 10-Year Rule',
          type: 'callout',
          content: 'Most non-spouse beneficiaries must now completely distribute the inherited IRA within 10 years. No more "stretch" over life expectancy.'
        },
        {
          title: 'Three Types of Beneficiaries',
          type: 'table',
          headers: ['Category', 'Who', 'Rule'],
          rows: [
            ['Eligible Designated Beneficiary (EDB)', '5 categories (see below)', 'Stretch (life expectancy) OR 10-year'],
            ['Designated Beneficiary', 'Any other individual', '10-year rule'],
            ['Non-Designated Beneficiary', 'Estate, charity, certain trusts', '5-year rule']
          ]
        },
        {
          title: 'Five Eligible Designated Beneficiaries',
          type: 'list',
          items: [
            '1. Surviving spouse - can treat as own',
            '2. Minor child of deceased - stretch until majority, then 10-year (owner\'s child only, not grandchild)',
            '3. Disabled individual - IRS definition',
            '4. Chronically ill individual - requires certification',
            '5. Not more than 10 years younger - siblings, elderly parents'
          ]
        },
        {
          title: '10-Year Rule Details',
          type: 'table',
          headers: ['If Owner Died', 'Rule'],
          rows: [
            ['Before RMD age', 'Distribute by end of year 10 (any timing)'],
            ['After RMD age', 'Annual RMDs required + distribute by year 10']
          ]
        },
        {
          title: 'Exam Tip',
          type: 'warning',
          content: 'IRS clarified: If owner died AFTER RMD age, beneficiary must take annual RMDs AND deplete by year 10. If owner died BEFORE RMD age, no annual RMDs required—just empty by year 10.'
        },
        {
          title: 'Surviving Spouse Options',
          type: 'table',
          headers: ['Option', 'How It Works', 'Best When'],
          rows: [
            ['Treat as own IRA', 'Roll to own or elect as own', 'Under 59½ and won\'t need funds'],
            ['Remain beneficiary', 'Keep as inherited IRA', 'Need funds before 59½ (no 10% penalty)'],
            ['10-year rule', 'Deplete within 10 years', 'Want rapid distribution']
          ]
        },
        {
          title: 'Inherited Roth IRAs',
          type: 'text',
          content: 'Same 10-year rule applies. Key difference: Distributions are tax-free (if original 5-year rule met), no annual RMDs required during 10 years. Best strategy: Wait until year 10 to maximize tax-free growth.'
        },
        {
          title: 'Trusts as Beneficiaries',
          type: 'text',
          content: 'See-Through Trust requirements: Valid under state law, irrevocable (or becomes so at death), beneficiaries identifiable, documentation provided. Two types: Conduit trust (must distribute all RMDs) and Accumulation trust (can accumulate, often 10-year rule).'
        },
        {
          title: 'Planning Strategies',
          type: 'table',
          headers: ['For Account Owners', 'For Beneficiaries'],
          rows: [
            ['Roth conversions (tax-free inheritance)', 'Split accounts quickly (preserve treatment)'],
            ['Name EDBs (preserve stretch)', 'Time distributions (manage income)'],
            ['Consider charities (tax-free)', 'Consider state taxes'],
            ['Life insurance (replace tax burden)', 'Maximize tax-free Roth growth']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'SECURE Act: 10-year rule for most non-spouse beneficiaries',
            '5 EDBs can stretch: spouse, minor child, disabled, chronically ill, ≤10 years younger',
            'If owner died after RMD age: Annual RMDs + deplete by year 10',
            'Spouse can: treat as own, remain beneficiary, or elect 10-year',
            'Inherited Roth: 10-year rule but tax-free distributions'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L018',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Net Unrealized Appreciation (NUA)',
    description: 'Explain the NUA tax strategy',
    order: 18,
    duration: 45,
    difficulty: 'advanced',
    topics: [
      'Explain the NUA tax strategy',
      'Calculate tax savings from NUA treatment',
      'Identify when NUA is advantageous',
      'Apply NUA distribution requirements'
    ],
    blueprintArea: 'RET-5',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'NUA is a tax strategy that can convert ordinary income into long-term capital gains when distributing employer stock from a qualified plan.'
        },
        {
          title: 'What Is NUA?',
          type: 'text',
          content: 'Net Unrealized Appreciation = Current FMV - Cost Basis. The increase in value of employer stock while held inside a qualified plan. Normal 401(k) distributions: Taxed as ordinary income (up to 37%). NUA strategy: NUA portion taxed as long-term capital gains (up to 20%).'
        },
        {
          title: 'NUA vs. Rollover Example',
          type: 'table',
          headers: ['Item', 'Without NUA (Rollover)', 'With NUA Strategy'],
          rows: [
            ['Stock FMV', '$500,000', '$500,000'],
            ['Cost basis', '$100,000', '$100,000'],
            ['NUA', 'N/A', '$400,000'],
            ['Tax at distribution (35% OI)', 'N/A', '$35,000 on basis'],
            ['Tax at sale (15% LTCG)', 'N/A', '$60,000 on NUA'],
            ['Total tax later (35% OI)', '$175,000', 'N/A'],
            ['Total Tax', '$175,000', '$95,000'],
            ['Tax Savings', '-', '$80,000']
          ]
        },
        {
          title: 'NUA Requirements',
          type: 'list',
          items: [
            'Must be from qualified plan (401(k), profit-sharing, ESOP) - NOT from IRA',
            'Must be lump-sum distribution (entire balance in one tax year)',
            'Triggering events: Separation from service, death, disability, after age 59½',
            'Must distribute in-kind (stock goes to taxable account as stock)'
          ]
        },
        {
          title: 'When NUA Makes Sense',
          type: 'table',
          headers: ['Good Candidates', 'Poor Candidates'],
          rows: [
            ['Large NUA (appreciation)', 'Small NUA'],
            ['Low cost basis', 'High cost basis'],
            ['High ordinary rate', 'Low ordinary rate'],
            ['Need liquidity soon', 'Won\'t sell for decades'],
            ['N/A', 'Want diversification (concentrated risk)']
          ]
        },
        {
          title: '10% Penalty Treatment',
          type: 'callout',
          content: 'If under 59½: 10% penalty applies to cost basis only (distributed from plan). 10% penalty does NOT apply to NUA (taxed as LTCG at sale, no penalty).'
        },
        {
          title: 'Partial NUA Strategy',
          type: 'text',
          content: 'Can split: Take some employer stock as NUA (to taxable account), roll the rest to IRA. Benefits: Some liquidity, manage current-year tax, diversify some while preserving NUA.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'NUA = employer stock appreciation in plan; taxed at LTCG rate',
            'Must be lump-sum distribution from qualified plan (not IRA)',
            'Pay ordinary income on cost basis at distribution; LTCG on NUA at sale',
            'No 10% penalty on NUA portion (even if under 59½)',
            'Best when: Large NUA, low basis, high marginal rate, need access'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L019',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Retirement Plans and Divorce (QDROs)',
    description: 'Explain QDRO requirements and process',
    order: 19,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Explain QDRO requirements and process',
      'Compare division of different retirement account types',
      'Apply special tax rules for divorce-related transfers',
      'Identify common QDRO mistakes to avoid'
    ],
    blueprintArea: 'RET-5',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Retirement accounts are often the largest marital asset after a home. Proper division requires understanding QDROs and special tax rules.'
        },
        {
          title: 'What Is a QDRO?',
          type: 'text',
          content: 'Qualified Domestic Relations Order: A court order that divides a qualified retirement plan in a divorce or separation. Needed because ERISA-covered plans are protected from assignment. QDRO allows division to an alternate payee (spouse, former spouse, child, dependent).'
        },
        {
          title: 'Plans That Need QDROs vs. Not',
          type: 'table',
          headers: ['Needs QDRO', 'Doesn\'t Need QDRO'],
          rows: [
            ['401(k)', 'IRA'],
            ['403(b)', 'SEP-IRA'],
            ['Defined benefit pension', 'SIMPLE IRA'],
            ['Profit-sharing plan', 'Roth IRA'],
            ['457(b) governmental', '']
          ]
        },
        {
          title: 'IRAs: Transfer Incident to Divorce',
          type: 'callout',
          content: 'IRAs don\'t need QDROs. Divided by "transfer incident to divorce" under IRC 408(d)(6). Just need divorce decree or separation agreement. Tax-free transfer between spouses.'
        },
        {
          title: 'QDRO Requirements',
          type: 'list',
          items: [
            'Must Include: Names/addresses, plan name, dollar amount or percentage, payment timing',
            'Cannot Require: Benefits not otherwise available, increased benefits, benefits allocated to another payee'
          ]
        },
        {
          title: 'Division Methods',
          type: 'table',
          headers: ['Plan Type', 'Separate Interest', 'Shared Payment'],
          rows: [
            ['DC Plans (401k)', 'Alternate payee gets own account (preferred)', 'Split each distribution'],
            ['DB Pensions', 'Independent benefit stream', 'Split participant\'s benefit']
          ]
        },
        {
          title: 'Special Tax Rule: QDRO Exception',
          type: 'warning',
          content: 'Distributions from QDRO to alternate payee: NO 10% early withdrawal penalty if taken directly from the plan. BUT if alternate payee rolls to IRA first, then withdraws, 10% penalty applies if under 59½.'
        },
        {
          title: 'Planning Tip',
          type: 'text',
          content: 'If alternate payee needs funds, take from plan BEFORE rolling to IRA. This preserves the penalty-free access. Once in IRA, penalty-free access is lost.'
        },
        {
          title: 'Valuing Retirement Accounts',
          type: 'text',
          content: 'Defined Contribution: Simple - account balance at division date. Defined Benefit: Complex - requires actuarial present value calculation or coverture fraction. Coverture Fraction = Years Married During Employment / Total Years of Employment.'
        },
        {
          title: 'Coverture Example',
          type: 'text',
          content: '25 years total employment, 15 years married. Pension = $3,000/month. Coverture = 15/25 = 60%. Marital portion = $1,800/month. If split 50/50: Alternate payee = $900/month.'
        },
        {
          title: 'Common QDRO Mistakes',
          type: 'table',
          headers: ['Mistake', 'Consequence'],
          rows: [
            ['Rolling to IRA before taking needed funds', 'Lose penalty-free access'],
            ['Not checking vesting', 'May not receive expected funds'],
            ['Delaying QDRO submission', 'Plan changes, participant retires'],
            ['Using generic QDRO language', 'May not work for specific plan']
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'QDRO required for qualified plans (401(k), 403(b), pension); not for IRAs',
            'IRAs: Transfer incident to divorce = tax-free, no QDRO needed',
            'QDRO distribution exception: No 10% penalty from plan (even under 59½)',
            'Rolling to IRA first loses penalty-free access',
            'Coverture fraction = marital years / total employment years'
          ]
        }
      ]
    }
  },

  {
    id: 'CFP-RET-L020',
    courseId: 'cfp',
    section: 'CFP-RET',
    title: 'Retirement Plan Selection and Integration',
    description: 'Recommend appropriate plan types for different situations',
    order: 20,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Recommend appropriate plan types for different situations',
      'Integrate retirement plans with overall financial plan',
      'Apply SECURE 2.0 provisions to planning',
      'Coordinate multiple retirement income sources'
    ],
    blueprintArea: 'RET-5',
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Selecting the right retirement plan—and integrating it with other planning areas—is critical to maximizing benefits.'
        },
        {
          title: 'Plan Selection Decision Tree',
          type: 'table',
          headers: ['Question', 'If Yes → Consider'],
          rows: [
            ['Self-employed, no employees?', 'Solo 401(k), SEP-IRA'],
            ['Small employer, want simplicity?', 'SIMPLE IRA, SEP-IRA'],
            ['Want employee contributions?', '401(k), SIMPLE'],
            ['Need high owner contributions?', 'DB plan, cash balance'],
            ['Employees should participate?', '401(k), SIMPLE']
          ]
        },
        {
          title: 'SECURE 2.0 Highlights',
          type: 'table',
          headers: ['Provision', 'Details'],
          rows: [
            ['RMD age', '73 now; 75 for born 1960+'],
            ['Roth 401(k)', 'No RMD during owner\'s lifetime'],
            ['Super catch-up (60-63)', '$11,250 (150% of regular)'],
            ['529-to-Roth', '$35,000 lifetime, 15 year wait'],
            ['Student loan match', 'Employer can match loan payments'],
            ['Starter 401(k)', 'Simplified for small employers']
          ]
        },
        {
          title: 'Integrating with Tax Planning',
          type: 'table',
          headers: ['Strategy', 'Retirement Component'],
          rows: [
            ['Current deductions', 'Traditional contributions reduce AGI'],
            ['Tax diversification', 'Balance Traditional, Roth, taxable'],
            ['Managing brackets', 'Time Roth conversions strategically'],
            ['AMT planning', 'ISO exercise, deduction timing']
          ]
        },
        {
          title: 'Integrating with Estate Planning',
          type: 'table',
          headers: ['Goal', 'Retirement Strategy'],
          rows: [
            ['Maximize to heirs', 'Roth conversions (tax-free inheritance)'],
            ['Charitable giving', 'QCDs, charity as beneficiary'],
            ['EDB protection', 'Name eligible beneficiaries strategically'],
            ['Trust planning', 'See-through trusts for flexibility']
          ]
        },
        {
          title: 'Coordinating Multiple Income Sources',
          type: 'table',
          headers: ['Income Source', 'Characteristics'],
          rows: [
            ['Social Security', 'Inflation-adjusted, may be taxable'],
            ['Pension', 'Fixed or COLA, may have survivor benefit'],
            ['Traditional IRA/401(k)', 'Taxable, RMDs required'],
            ['Roth IRA', 'Tax-free, no RMDs'],
            ['Taxable accounts', 'Favorable cap gains rates'],
            ['Annuities', 'Guaranteed income, various tax treatment']
          ]
        },
        {
          title: 'Social Security Integration',
          type: 'callout',
          content: 'Large Traditional accounts: Delay SS, do Roth conversions. Mostly Roth: May claim SS earlier. Have pension: May claim SS earlier. Married: Coordinate spousal strategies. Delaying SS from 62 to 70 = 77% increase in monthly benefit.'
        },
        {
          title: 'Case Study: Comprehensive Integration',
          type: 'text',
          content: 'Client: Both 60, $1.5M Traditional IRAs, $200K Roth, $300K taxable, $70K combined SS at 70, $100K spending. Strategy: Ages 60-63: Distributions from Traditional + Roth conversions (fill 22% bracket). Ages 64-69: Continue conversions, use taxable for living expenses. Age 70+: Start SS, take RMDs, use Roth for spikes. Result: Without strategy ~28% effective rate, with strategy ~18% effective rate.'
        },
        {
          title: 'Summary',
          type: 'summary',
          items: [
            'Match plan type to business structure, owner age, and contribution goals',
            'SECURE 2.0: Super catch-up at 60-63, RMD age 75, Roth 401(k) no RMD',
            'Integrate retirement with tax planning, estate planning, risk management',
            'Strategic withdrawal sequencing can significantly reduce lifetime taxes',
            'Delay Social Security usually optimal; creates Roth conversion window'
          ]
        }
      ]
    }
  }
];

export default CFP_RET5_LESSONS;
