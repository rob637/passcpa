/**
 * CFP Domain 8: Psychology of Financial Planning
 * Additional Psychology Lessons
 * 
 * These lessons expand coverage of client psychology, counseling techniques,
 * and working with diverse client situations.
 */

import type { Lesson } from '../../../types';

export const CFP_PSY2_LESSONS: Lesson[] = [
  {
    id: 'CFP-PSY-L006',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    title: 'Financial Counseling Skills',
    description: 'Apply motivational interviewing techniques to financial planning',
    order: 6,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Motivational interviewing techniques',
      'Recognizing readiness for change vs. resistance',
      'Reframing techniques',
      'Boundaries between planning and therapy'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'CFP® professionals need counseling skills to help clients translate goals into action. This lesson covers techniques that bridge the gap between planning and implementation.'
        },
        {
          title: 'Motivational Interviewing (MI)',
          type: 'text',
          content: 'A collaborative, client-centered approach that helps resolve ambivalence about change.'
        },
        {
          title: 'The Spirit of MI',
          type: 'table',
          headers: ['Element', 'Description', 'Example'],
          rows: [
            ['Partnership', 'Work with, not on, the client', '"Let\'s explore this together"'],
            ['Acceptance', 'Respect autonomy and worth', '"You\'re the expert on your own life"'],
            ['Compassion', 'Prioritize client welfare', 'Focus on their goals, not yours'],
            ['Evocation', 'Draw out client\'s motivation', '"What reasons do you see for making a change?"']
          ]
        },
        {
          title: 'Core Skills (OARS)',
          type: 'list',
          items: [
            'Open-ended questions: "What would be different if you were debt-free?"',
            'Affirmations: "It took courage to share that with me"',
            'Reflections: "It sounds like you\'re feeling torn between..."',
            'Summaries: "Let me make sure I\'ve captured what you\'ve shared..."'
          ]
        },
        {
          title: 'Stages of Change Model',
          type: 'table',
          headers: ['Stage', 'Client Mindset', 'Planner Approach'],
          rows: [
            ['Precontemplation', '"I don\'t have a problem"', 'Raise awareness gently, don\'t push'],
            ['Contemplation', '"Maybe I should..."', 'Explore pros/cons, tip the balance'],
            ['Preparation', '"I\'m going to do this"', 'Plan specific steps, set timeline'],
            ['Action', '"I\'m doing it"', 'Support, troubleshoot, celebrate wins'],
            ['Maintenance', '"I\'ve been doing it"', 'Prevent relapse, reinforce identity'],
            ['Relapse', '"I slipped"', 'Normalize, learn, restart']
          ]
        },
        {
          title: 'Key Insight',
          type: 'callout',
          content: 'Meeting clients where they are—not where you want them to be—is essential for lasting change.'
        },
        {
          title: 'Matching Interventions to Stages',
          type: 'table',
          headers: ['Stage', 'Ineffective', 'Effective'],
          rows: [
            ['Precontemplation', '"You need to start saving now"', '"What do you imagine retirement looking like?"'],
            ['Contemplation', '"Here\'s your savings plan"', '"What would need to happen for you to feel ready?"'],
            ['Action', '"You already know this"', '"How\'s the first month going? What\'s working?"']
          ]
        },
        {
          title: 'Reframing Techniques',
          type: 'table',
          headers: ['Client Statement', 'Reframe'],
          rows: [
            ['"I can\'t afford to save"', '"What would happen if we paid your future self first?"'],
            ['"I\'m terrible with money"', '"You\'ve been making choices without a system—let\'s build one"'],
            ['"The market is too scary"', '"Volatility is the price of admission for long-term returns"'],
            ['"I\'ll never retire"', '"Let\'s see what\'s possible with some adjustments"']
          ]
        },
        {
          title: 'When to Reframe (and When NOT)',
          type: 'list',
          items: [
            'When to reframe: Client is stuck in limiting beliefs, perspective is overly negative or catastrophizing, client can\'t see options or alternatives',
            'When NOT to reframe: Client is processing a genuine loss, the situation actually is dire and needs addressing, reframe would feel dismissive'
          ]
        },
        {
          title: 'Boundaries: Planning vs. Therapy',
          type: 'table',
          headers: ['Situation', 'Action'],
          rows: [
            ['Signs of clinical depression/anxiety', 'Suggest professional support'],
            ['Marital conflict dominates sessions', 'Recommend couples counselor'],
            ['Grief preventing all decision-making', 'Connect with grief counselor'],
            ['Addictive behaviors (gambling, spending)', 'Refer to specialist'],
            ['Past trauma driving financial decisions', 'Therapeutic support needed']
          ]
        },
        {
          title: 'How to Refer Gracefully',
          type: 'example',
          content: '"I\'ve noticed you\'re dealing with a lot beyond finances right now. I want to make sure you have all the support you need. Would you be open to talking with someone who specializes in [X]?"'
        },
        {
          title: 'What CFPs CAN Do',
          type: 'list',
          items: [
            'Listen with empathy',
            'Validate emotions',
            'Help process financial aspects of life events',
            'Coach on behavior change',
            'Provide structure and accountability'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Motivational interviewing is collaborative, not prescriptive', 'Stages of change guide intervention—meet clients where they are', 'Reframing helps shift limiting beliefs when appropriate', 'Know your boundaries—refer when mental health issues exceed planning scope', 'OARS skills (Open questions, Affirmations, Reflections, Summaries) are essential']
        }
      ]
    }
  },
  {
    id: 'CFP-PSY-L007',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    title: 'Working with Couples and Families',
    description: 'Identify common sources of money conflict between partners',
    order: 7,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Money conflict between partners',
      'Facilitating productive couple discussions',
      'Family dynamics in financial planning',
      'Navigating different partner goals'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Money is a leading source of relationship conflict. CFP® professionals often mediate between partners with different values, goals, and styles.'
        },
        {
          title: 'Sources of Money Conflict',
          type: 'list',
          items: [
            'Different Money Scripts: Money Avoider vs. Money Vigilant (A ignores finances; B obsesses), Money Status vs. Money Worship (both overspend for different reasons)',
            'Different Risk Tolerances: One partner wants aggressive growth, other wants capital preservation—neither is "wrong" but compromise is needed',
            'Different Life Experiences: One grew up wealthy, one grew up poor; one experienced financial trauma (bankruptcy, foreclosure); different cultural backgrounds',
            'Power Imbalances: Income disparity, one partner handles all finances, historical control patterns'
          ]
        },
        {
          title: 'Ground Rules for Couple Discussions',
          type: 'list',
          items: [
            'No blame or criticism—focus on going forward',
            'Both partners speak—actively solicit quieter partner\'s views',
            'Acknowledge feelings—"I can see this is frustrating for you"',
            'Focus on shared goals—find common ground first',
            'Use "I" statements—"I worry about..." not "You always..."'
          ]
        },
        {
          title: 'The Planner\'s Role with Couples',
          type: 'table',
          headers: ['DO', 'DON\'T'],
          rows: [
            ['Facilitate balanced dialogue', 'Take sides'],
            ['Reflect each partner\'s perspective', 'Let one partner dominate'],
            ['Find common ground', 'Impose your own values'],
            ['Ask clarifying questions', 'Assume you understand'],
            ['Summarize agreements', 'Ignore disagreements']
          ]
        },
        {
          title: 'Techniques for Stuck Conversations',
          type: 'list',
          items: [
            'The Columbo Approach: "Help me understand—when you say \'comfortable retirement,\' what does that look like to you? [To partner] And what about you?"',
            'Scaling: "On a scale of 1-10, how important is leaving an inheritance?" (Ask both separately)',
            'Future Pacing: "Fast forward 10 years. What will you wish you had done?"'
          ]
        },
        {
          title: 'When Partners Disagree',
          type: 'text',
          content: 'Prioritize shared goals first. Often couples agree on ends but disagree on means: Both want kids\' education funded—disagree on how much. Both want comfortable retirement—disagree on spending now. Use numbers to clarify trade-offs: "If we fund 100% of college, retirement happens at 67. At 50% college funding, retirement at 64. What matters more?"'
        },
        {
          title: 'Compromise Frameworks',
          type: 'table',
          headers: ['Approach', 'Example'],
          rows: [
            ['Split the difference', 'One wants $50K emergency fund, other wants $20K—agree on $35K'],
            ['Alternate decisions', '"You choose the vacation budget, I\'ll choose the car budget"'],
            ['Pilot periods', '"Let\'s try your approach for 6 months and evaluate"'],
            ['Separate accounts', 'Individual "no-judgment" spending accounts within shared framework']
          ]
        },
        {
          title: 'When Compromise Fails',
          type: 'warning',
          content: 'If partners fundamentally disagree on major issues (children, work, location), financial planning may need to pause until they resolve underlying conflicts.'
        },
        {
          title: 'Multi-Generational Planning',
          type: 'table',
          headers: ['Pattern', 'Description', 'Planning Impact'],
          rows: [
            ['Golden Child', 'One child favored', 'Inheritance conflict'],
            ['Black Sheep', 'One child excluded/blamed', 'Estate disputes'],
            ['Enmeshment', 'Boundaries blurred', 'Adult children expect support'],
            ['Cutoff', 'Family members estranged', 'Beneficiary complications']
          ]
        },
        {
          title: 'Facilitating Family Meetings',
          type: 'list',
          items: [
            'Clarify purpose and agenda in advance',
            'Establish ground rules',
            'Manage dominant personalities',
            'Ensure all voices are heard',
            'Document agreements in writing'
          ]
        },
        {
          title: 'Inheritance Conversations',
          type: 'list',
          items: [
            'Help parents think through: Equal vs. equitable distribution?',
            'How to communicate intentions?',
            'Potential for conflict after death?',
            'Special situations (disabled child, addiction, blended family)?'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Money conflict often stems from different scripts, experiences, or power dynamics', 'Facilitate, don\'t arbitrate—your job is productive dialogue, not judging', 'Find shared goals first, then work on differing means', 'Numbers clarify trade-offs when words fail', 'Multi-generational planning requires understanding family dynamics']
        }
      ]
    }
  },
  {
    id: 'CFP-PSY-L008',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-1',
    title: 'Special Populations in Financial Planning',
    description: 'Adapt planning approaches for elderly clients and cognitive decline',
    order: 8,
    duration: 50,
    difficulty: 'advanced',
    topics: [
      'Elderly clients and cognitive decline',
      'Financial exploitation signs and responses',
      'Divorcing clients needs',
      'Clients with disabilities and special needs'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Different life circumstances require adapted approaches. This lesson covers planning considerations for elderly clients, divorcing individuals, and those with disabilities.'
        },
        {
          title: 'Risk Factors for Cognitive Decline',
          type: 'list',
          items: [
            'Age 65+: risk increases significantly with each decade',
            'Family history of dementia',
            'Cardiovascular risk factors',
            'Social isolation'
          ]
        },
        {
          title: 'Warning Signs During Meetings',
          type: 'table',
          headers: ['Category', 'Signs'],
          rows: [
            ['Memory', 'Repeating questions, forgetting recent discussions'],
            ['Judgment', 'Unusual decisions, susceptibility to scams'],
            ['Confusion', 'Getting lost, not recognizing familiar people'],
            ['Personality', 'Sudden changes, increased anxiety or apathy'],
            ['Finances', 'Unpaid bills, missing money, disorganized records']
          ]
        },
        {
          title: 'Proactive Planning While Client is Competent',
          type: 'list',
          items: [
            'Establish durable power of attorney',
            'Introduce trusted contact person',
            'Simplify finances (fewer accounts)',
            'Document current wishes and values',
            'Discuss "what if" scenarios'
          ]
        },
        {
          title: 'When Decline is Suspected',
          type: 'list',
          items: [
            'Involve trusted family members (with permission)',
            'Slow down decisions—no urgency',
            'Simplify recommendations',
            'Document conversations thoroughly',
            'Consider capacity assessment referral'
          ]
        },
        {
          title: 'Common Financial Exploitation Scenarios',
          type: 'table',
          headers: ['Type', 'Description', 'Warning Signs'],
          rows: [
            ['Family exploitation', 'Relatives taking advantage', 'Sudden POA changes, isolation from others'],
            ['Caregiver exploitation', 'Paid helpers taking money', 'Unusual withdrawals, new "best friend"'],
            ['Romance scams', 'Online relationship cons', 'Secret new partner, wire transfers'],
            ['Sweepstakes/lottery scams', 'Pay to collect "winnings"', 'Multiple checks to unknown parties'],
            ['Contractor fraud', 'Overcharging for services', 'Cash payments, unnecessary work']
          ]
        },
        {
          title: 'CFP® Professional Responsibilities for Exploitation',
          type: 'list',
          items: [
            'Report suspected exploitation to adult protective services (in many states, mandatory)',
            'Document concerning behaviors and conversations',
            'Delay suspicious transactions when possible',
            'Involve trusted contacts or family',
            'Know your firm\'s procedures'
          ]
        },
        {
          title: 'Sample Difficult Conversation',
          type: 'example',
          content: '"Mrs. Johnson, I\'m concerned about some of the transactions I\'m seeing. You\'ve sent $15,000 to someone you met online. Can we talk about this?"'
        },
        {
          title: 'Divorcing Clients: Key Areas',
          type: 'table',
          headers: ['Area', 'Considerations'],
          rows: [
            ['Assets', 'Division of retirement accounts (QDRO), real estate, investments'],
            ['Liabilities', 'Debt responsibility, mortgage, joint accounts'],
            ['Support', 'Alimony and child support—giver and receiver implications'],
            ['Insurance', 'Health coverage, life insurance requirements'],
            ['Taxes', 'Filing status, dependency exemptions, deduction changes'],
            ['Estate', 'Update beneficiaries, new estate plan needed']
          ]
        },
        {
          title: 'Working with Divorcing Clients',
          type: 'list',
          items: [
            'DO: Maintain neutrality if working with both spouses, focus on objective financial analysis, help client understand trade-offs, coordinate with attorney',
            'DON\'T: Take sides emotionally, provide legal advice, encourage adversarial behavior, assume you know the emotional state'
          ]
        },
        {
          title: 'Common Divorce Financial Mistakes',
          type: 'list',
          items: [
            'Fighting for the house when it\'s unaffordable',
            'Ignoring tax implications of asset division',
            'Underestimating post-divorce expenses',
            'Not updating beneficiary designations',
            'Assuming 50/50 is "fair" when assets have different characteristics'
          ]
        },
        {
          title: 'Clients with Disabilities',
          type: 'table',
          headers: ['Type', 'Planning Focus'],
          rows: [
            ['Physical disabilities', 'Accessible housing, transportation, equipment costs'],
            ['Intellectual disabilities', 'Special needs trusts, guardianship, ABLE accounts'],
            ['Mental health conditions', 'Episodic planning, trusted contacts, benefit preservation'],
            ['Acquired disability', 'Life insurance, disability insurance, career transition']
          ]
        },
        {
          title: 'Preserving Government Benefits',
          type: 'text',
          content: 'SSI and Medicaid have asset limits (~$2,000). Inheritances or gifts can disqualify. Special Needs Trusts allow supplemental support without disqualification. ABLE accounts offer some flexibility (up to $100K protected).'
        },
        {
          title: 'Third-Party vs. First-Party SNTs',
          type: 'table',
          headers: ['Type', 'Funded By', 'Medicaid Payback?'],
          rows: [
            ['Third-party SNT', 'Family, will, others', 'No'],
            ['First-party SNT', 'Individual\'s own assets', 'Yes—remainder to state']
          ]
        },
        {
          title: 'Communication Adaptations',
          type: 'list',
          items: [
            'Allow extra time',
            'Use clear, simple language when appropriate',
            'Include support persons as requested',
            'Confirm understanding frequently',
            'Provide written summaries'
          ]
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Cognitive decline requires proactive planning and vigilance for changes', 'Financial exploitation is common—know the signs and your reporting obligations', 'Divorcing clients need objective analysis and coordination with legal professionals', 'Special needs planning must preserve benefit eligibility', 'Adapt communication to each client\'s needs and circumstances']
        }
      ]
    }
  },
  {
    id: 'CFP-PSY-L009',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    title: 'Sources of Client Motivation',
    description: 'Distinguish between intrinsic and extrinsic motivation',
    order: 9,
    duration: 40,
    difficulty: 'intermediate',
    topics: [
      'Intrinsic vs. extrinsic motivation',
      'SMART goals framework',
      'How values drive financial behavior',
      'Accountability structures for change'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Understanding what motivates clients helps CFP® professionals create plans that clients actually follow.'
        },
        {
          title: 'Intrinsic vs. Extrinsic Motivation',
          type: 'table',
          headers: ['Type', 'Definition', 'Example'],
          rows: [
            ['Intrinsic', 'Doing something for its own satisfaction', 'Saving because security feels good'],
            ['Extrinsic', 'Doing something for external reward/avoidance', 'Saving to get employer match']
          ]
        },
        {
          title: 'Application to Financial Planning',
          type: 'list',
          items: [
            'Intrinsic motivators (more sustainable): Personal values alignment, sense of security and peace, freedom and autonomy, legacy and meaning',
            'Extrinsic motivators (useful but limited): Tax benefits, employer matches, avoiding penalties, social expectations'
          ]
        },
        {
          title: 'Research Finding',
          type: 'callout',
          content: 'Intrinsic motivation produces more lasting behavior change. Connect recommendations to client values, not just external benefits.'
        },
        {
          title: 'Example: Less vs. More Effective',
          type: 'example',
          content: 'Less effective: "You should max your 401(k) for the tax deduction." More effective: "You mentioned wanting to travel in retirement without worrying about money. Maxing your 401(k) gets you closer to that freedom."'
        },
        {
          title: 'SMART Goal Framework',
          type: 'table',
          headers: ['Element', 'Description', 'Example'],
          rows: [
            ['Specific', 'Clear and precise', '"Pay off credit card" not "reduce debt"'],
            ['Measurable', 'Quantifiable', '$5,000 balance to $0'],
            ['Achievable', 'Realistic', '$500/month payment is doable'],
            ['Relevant', 'Connects to values', '"So I can feel in control of my money"'],
            ['Time-bound', 'Has a deadline', 'By December 31st']
          ]
        },
        {
          title: 'Converting Client Statements to SMART Goals',
          type: 'table',
          headers: ['Client Says', 'SMART Version'],
          rows: [
            ['"I want to save more"', '"I will save $500/month to my IRA starting March 1"'],
            ['"I should invest"', '"I will invest my tax refund of $3,000 by April 15"'],
            ['"We need to budget"', '"We will track all spending for 30 days in February"']
          ]
        },
        {
          title: 'Beyond SMART: Emotion + Logic',
          type: 'text',
          content: 'SMART provides structure, but emotional connection drives follow-through. Ask: "What will it feel like to make that final payment?" "Imagine telling your kids their college is fully funded."'
        },
        {
          title: 'Values-Based Planning',
          type: 'text',
          content: 'Values are the WHY behind financial goals. Discovery questions: "What does money mean to you?" "What would you do with unlimited resources?" "What do you want people to say about you financially?" "When have you felt most satisfied with a financial decision?"'
        },
        {
          title: 'Common Core Values and Financial Expression',
          type: 'table',
          headers: ['Value', 'Financial Expression'],
          rows: [
            ['Security', 'Emergency funds, insurance, stable investments'],
            ['Freedom', 'No debt, passive income, flexibility'],
            ['Family', 'Education funding, inheritance, togetherness'],
            ['Status', 'Nice home, new cars, visible success'],
            ['Generosity', 'Charitable giving, helping others'],
            ['Experience', 'Travel, hobbies, adventures']
          ]
        },
        {
          title: 'Using Values in Recommendations',
          type: 'example',
          content: '"You\'ve said family is your top priority. This insurance policy ensures they\'re protected no matter what." "I noticed security keeps coming up. Let\'s build a larger emergency fund before increasing investment risk."'
        },
        {
          title: 'Accountability Structures',
          type: 'list',
          items: [
            'Why accountability matters: Humans better at commitments to others than to themselves, regular check-ins prevent procrastination, celebration of progress reinforces behavior',
            'Tools: Regular meetings, written agreements, milestones, accountability partners, automation, visual tracking'
          ]
        },
        {
          title: 'The Power of Implementation Intentions',
          type: 'text',
          content: 'Research shows when/where/how plans dramatically increase follow-through. Instead of: "I\'ll set up automatic savings" Use: "I will log into my bank on Saturday morning after coffee and set up a $300 automatic transfer to my Roth IRA"'
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Intrinsic motivation (values-based) is more sustainable than external rewards', 'SMART goals turn vague intentions into specific actions', 'Connect recommendations to values for better follow-through', 'Accountability structures increase success rates', 'Implementation intentions (when/where/how) beat general intentions']
        }
      ]
    }
  },
  {
    id: 'CFP-PSY-L010',
    courseId: 'cfp',
    section: 'CFP-PSY',
    blueprintArea: 'PSY-2',
    title: 'Overcoming Decision-Making Challenges',
    description: 'Recognize analysis paralysis and help clients move forward',
    order: 10,
    duration: 45,
    difficulty: 'intermediate',
    topics: [
      'Analysis paralysis recognition and solutions',
      'Perfectionism preventing financial action',
      'Simplifying complex decisions',
      'Recovering from financial mistakes'
    ],
    content: {
      sections: [
        {
          title: 'Introduction',
          type: 'text',
          content: 'Many clients know what they should do but struggle to act. This lesson covers common decision-making barriers and how to overcome them.'
        },
        {
          title: 'Analysis Paralysis',
          type: 'text',
          content: 'Overthinking options to the point of taking no action. The pursuit of the "perfect" choice prevents any choice. Why it happens: Fear of making wrong choice, overestimating consequences of "imperfect" choice, cognitive overload from too many options, perfectionism tendencies.'
        },
        {
          title: 'Common Manifestations',
          type: 'table',
          headers: ['Situation', 'Paralysis Behavior'],
          rows: [
            ['Investment selection', 'Researching endlessly, never investing'],
            ['Insurance purchase', 'Comparing quotes for months'],
            ['Home buying', 'Looking at 50+ houses'],
            ['Career decisions', 'Can\'t choose between options'],
            ['401(k) allocation', 'Staying in default because too many choices']
          ]
        },
        {
          title: 'Intervention Strategies for Paralysis',
          type: 'table',
          headers: ['Strategy', 'How to Apply'],
          rows: [
            ['Reduce options', '"Let\'s compare these 3 funds instead of 50"'],
            ['Good enough', '"A B+ decision today beats an A+ decision never"'],
            ['Reversibility', '"This isn\'t permanent—we can adjust in 6 months"'],
            ['Cost of inaction', '"Every month not invested is returns you miss"'],
            ['Default options', '"If you can\'t decide, this is my recommendation"'],
            ['Time limits', '"Let\'s make this decision by Friday"']
          ]
        },
        {
          title: 'Perfectionism and Financial Inaction',
          type: 'text',
          content: 'Perfectionists: Wait for the "right time" to invest (timing the market), need to understand everything before acting, abandon strategies at the first setback, beat themselves up for not-optimal decisions.'
        },
        {
          title: 'Intervention Approaches for Perfectionism',
          type: 'list',
          items: [
            'Normalize imperfection: "Even the best investors get it wrong 40% of the time. Success comes from a portfolio of decisions, not any single choice."',
            'Focus on process, not outcome: "Let\'s evaluate whether we followed good principles, not just the result."',
            'Embrace iteration: "This is version 1.0. We\'ll improve as we learn more about your needs."',
            'Small wins first: "Let\'s start with $5,000 and see how it feels before investing more."'
          ]
        },
        {
          title: 'Choice Architecture Approach',
          type: 'text',
          content: 'Make the right choice the easy choice. Principles: Default enrollment (automatic 401(k) contribution), automatic escalation (increase savings 1% per year), limit options (offer 3 model portfolios, not 100 funds), pre-commitment (decide future actions now), remove friction (paperless, single-click enrollment).'
        },
        {
          title: 'Breaking Down Big Decisions',
          type: 'example',
          content: 'Instead of: "Choose your entire investment allocation" Use: (1) "First, let\'s decide: stocks vs. bonds ratio" (2) "Now, U.S. vs. international split" (3) "Finally, active vs. passive approach"'
        },
        {
          title: 'Decision Trees',
          type: 'list',
          items: [
            'Map out key decision points and consequences',
            '"If X happens, we do Y"',
            '"If rates drop below 4%, we refinance"',
            '"If your income increases 10%+, we accelerate 401(k)"'
          ]
        },
        {
          title: 'Common Client Mistakes',
          type: 'list',
          items: [
            'Sold investments during a crash',
            'Took on too much debt',
            'Failed to save during high-earning years',
            'Made bad business/real estate decisions',
            'Trusted the wrong person'
          ]
        },
        {
          title: 'The Recovery Conversation',
          type: 'list',
          items: [
            'Acknowledge without judgment: "That sounds like a difficult situation"',
            'Normalize: "You\'re not alone—many people face similar challenges"',
            'Learn: "What would you do differently knowing what you know now?"',
            'Redirect: "Now let\'s focus on what we can control going forward"',
            'Act: Create specific next steps'
          ]
        },
        {
          title: 'Avoid These Responses',
          type: 'table',
          headers: ['Don\'t Say', 'Say Instead'],
          rows: [
            ['"That was a mistake"', '"That was a learning experience"'],
            ['"You should have..."', '"Going forward, we can..."'],
            ['"Why did you do that?"', '"Help me understand what you were thinking at the time"'],
            ['"Don\'t worry about it"', '"It\'s understandable to feel frustrated"']
          ]
        },
        {
          title: 'The Sunk Cost Lesson',
          type: 'callout',
          content: 'Help clients let go of past decisions: "The money spent is gone regardless of what we decide now. Let\'s make the best decision from this point forward, not based on what we\'ve already invested."'
        },
        {
          title: 'Summary',
          type: 'summary',
          content: ['Analysis paralysis is overcome by limiting options and setting deadlines', 'Perfectionism prevents action—embrace "good enough" decisions', 'Choice architecture makes right decisions easy and automatic', 'Break big decisions into smaller, sequential choices', 'Financial mistakes are learning opportunities—focus forward, not backward']
        }
      ]
    }
  }
];

export default CFP_PSY2_LESSONS;
