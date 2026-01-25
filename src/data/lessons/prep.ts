import { Lesson } from '../../types';

export const prepLessons: Lesson[] = [
  {
    id: 'prep-001',
    section: 'PREP',
    title: 'CPA Evolution 2026: Your Complete Roadmap',
    description: 'Master the new Core + Discipline model, 30-month window, and key changes in the 2026 CPA Exam.',
    order: 1,
    duration: 45,
    difficulty: 'beginner',
    topics: ['CPA Evolution', 'Core + Discipline', 'Exam Structure'],
    content: {
      sections: [
        {
          title: 'Welcome to the 2026 CPA Exam',
          type: 'text',
          content: `The CPA Exam has evolved. The new "Core + Discipline" model is designed to reflect the skills newly licensed CPAs need in a changing world. Gone are the days of one-size-fits-all testing. You now have more choice—and more strategy—in how you pass.

This lesson covers everything you need to know about the exam structure, timing, and requirements effective from 2026.`
        },
        {
          title: 'The Core + Discipline Model',
          type: 'text',
          content: `Every candidate must pass three **Core** sections and one **Discipline** section.`
        },
        {
            title: 'Core Sections (Mandatory)',
            type: 'list',
            content: [
                { term: 'AUD', definition: 'Auditing and Attestation. Focuses on auditing, attest services, ethics, and professional responsibilities.' },
                { term: 'FAR', definition: 'Financial Accounting and Reporting. The "gold standard" of accounting knowledge, covering GAAP, financial statements, and standard setting.' },
                { term: 'REG', definition: 'Regulation. Covers US federal taxation, business law, and ethics for tax practitioners.' }
            ]
        },
        {
          title: 'Discipline Sections (Choose One)',
          type: 'text',
          content: `You must select **one** of the following three Disciplines. This choice allows you to demonstrate deeper knowledge in a specific area. Once you pass a Discipline, you cannot switch—but the license you earn is the same regardless of your choice.`
        },
        {
            title: 'Discipline Options',
            type: 'list',
            content: [
                { term: 'BAR', definition: 'Business Analysis and Reporting. Advanced accounting, data analytics, and reporting. Ideal for those interested in corporate accounting or advisory.' },
                { term: 'ISC', definition: 'Information Systems and Controls. Focuses on IT governance, data security, and SOC engagements. Great for those interested in tech or systems auditing.' },
                { term: 'TCP', definition: 'Tax Compliance and Planning. Advanced individual and entity taxation. Perfect for future tax specialists.' }
            ]
        },
        {
            title: 'The 30-Month Window',
            type: 'text',
            content: `A massive win for candidates: You now have **30 months** (increased from 18) to pass all four sections.
            
**When does the clock start?**
The clock typically starts on the date you *pass* your first section. However, jurisdiction rules vary slightly, so always check with your State Board of Accountancy.

**Why the change?**
To reduce burnout and accommodate the increased breadth of material in the modern profession.`
        },
        {
            title: 'H.R. 1 "One Big Beautiful Bill"',
            type: 'warning',
            content: `Note: Provisions from H.R. 1 are testable starting July 1, 2026. This includes changes to tip income exclusions, SALT deductions, and child tax credits. Our REG and TCP lessons are fully updated with these provisions.`
        },
        {
            title: 'Key Takeaways',
            type: 'summary',
            content: [
                'Total of 4 sections: 3 Core (AUD, FAR, REG) + 1 Discipline (BAR, ISC, or TCP).',
                'Pass all 4 within a rolling 30-month window.',
                'Discipline selection does not change the CPA license type.',
                'The Evolution model focuses on technology and analytical skills.'
            ]
        }
      ]
    }
  },
  {
    id: 'prep-002',
    section: 'PREP',
    title: 'Anatomy of the Exam: Testlets, Timing, Scoring',
    description: 'Break down the structure of each exam section, understanding testlets, breaks, and time limits.',
    order: 2,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Testlets', 'Timing', 'Exam Structure'],
    content: {
      sections: [
        {
          title: 'The 4-Hour Marathon',
          type: 'text',
          content: `Each section of the CPA Exam is a 4-hour test. But it's not just a block of time—it's broken down into **5 Testlets**. Understanding this flow is crucial for pacing.`
        },
        {
            title: 'Exam Structure Breakdown',
            type: 'table',
            headers: ['Testlet', 'Content', 'Description'],
            rows: [
                ['Testlet 1', 'MCQs', 'Multiple Choice Questions (approx. 50% of score weight)'],
                ['Testlet 2', 'MCQs', 'Multiple Choice Questions'],
                ['Testlet 3', 'TBS', 'Task-Based Simulations (2-3 simulations)'],
                ['Break', '15 Min', 'Standardized break (Does not count against exam time)'],
                ['Testlet 4', 'TBS', 'Task-Based Simulations (3 simulations)'],
                ['Testlet 5', 'TBS', 'Task-Based Simulations (3 simulations)']
            ]
        },
        {
          title: 'The Standardized Break',
          type: 'text',
          content: `After Testlet 3, the timer **stops** for 15 minutes. TAKE THIS BREAK.
          
**Why take it?**
• Reset your brain.
• Use the restroom / drink water.
• Eat a quick snack (protein bar, nuts).
• Do not look at notes (strictly prohibited).

**Note:** You can take breaks between other testlets, but the timer *continues to run*.`
        },
        {
            title: 'Question Counts by Section',
            type: 'list',
            content: [
                { term: 'AUD', definition: '78 MCQs, 7 TBS' },
                { term: 'FAR', definition: '50 MCQs, 7 TBS' },
                { term: 'REG', definition: '72 MCQs, 8 TBS' },
                { term: 'Discipline Sections', definition: 'Typically 50 MCQs, 7 TBS (varies slightly)' }
            ]
        },
        {
            title: 'Key Takeaways',
            type: 'summary',
            content: [
                '5 Testlets per exam section.',
                '4 hours total testing time per section.',
                'Take the 15-minute standardized break after Testlet 3.',
                'Pacing is critical—don\'t spend too long on MCQs.'
            ]
        }
      ]
    }
  },
  {
    id: 'prep-003',
    section: 'PREP',
    title: 'Adaptive Testing: What It Means for You',
    description: 'Understand how MCQ difficulty changes based on your performance and how to handle it.',
    order: 3,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Adaptive Testing', 'MCQ Difficulty', 'Scoring'],
    content: {
        sections: [
            {
                title: 'It\'s Not You, It\'s the Algorithm',
                type: 'text',
                content: `The CPA Exam uses **Multi-Stage Testing (MST)** for MCQs. This means the difficulty of your second MCQ testlet depends on how well you did in the first one.`
            },
            {
                title: 'The Difficulty Path',
                type: 'list',
                content: [
                    { term: 'Testlet 1', definition: 'Always "Medium" difficulty.' },
                    { term: 'Testlet 2 (If you did well)', definition: '"Hard" difficulty. Questions are more complex, but worth more points.' },
                    { term: 'Testlet 2 (If you struggled)', definition: '"Medium" difficulty. Questions are easier, but worth fewer points.' }
                ]
            },
            {
                title: 'Why You WANT a Hard Testlet',
                type: 'text',
                content: `If you get to Testlet 2 and feel like you've been hit by a truck—**CONGRATULATIONS!** You likely did very well on the first testlet.
                
**The Psychology Trap:**
Many candidates panic when the questions get harder. They think they are failing. In reality, a "hard" second testlet is a sign you are on the path to passing. `
            },
            {
                title: 'Does this apply to TBS?',
                type: 'text',
                content: `No. Task-Based Simulations are **not** adaptive. Everyone gets a pre-selected set of simulations regardless of MCQ performance.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'MCQs are adaptive; TBS are not.',
                    'A harder second testlet is a GOOD sign.',
                    'Don\'t let difficult questions shake your confidence.',
                    'Focus on accuracy in Testlet 1 to trigger the harder path.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-004',
    section: 'PREP',
    title: 'How the CPA Exam is Scored',
    description: 'Demystifying the scoring process, from raw points to the scaled score of 75.',
    order: 4,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Scoring', 'AICPA', 'Psychometrics'],
    content: {
        sections: [
            {
                title: '75 is Not 75%',
                type: 'text',
                content: `A score of 75 is NOT 75% correct. It is a **scaled score** ranging from 0 to 99. The AICPA uses Item Response Theory (IRT) to calculate your score considering difficulty, discrimination, and guessing probability.`
            },
            {
                title: 'Scoring Components',
                type: 'table',
                headers: ['Component', 'Weight', 'Notes'],
                rows: [
                    ['Multiple Choice (MCQ)', '50%', 'Scored by computer based on IRT statistics.'],
                    ['Task-Based Simulations (TBS)', '50%', 'Scored by computer. Some Written Communication in older exams (now mostly integrated or absent).'],
                    ['Pretest Questions', '0%', '10-15% of questions are "pretest" and do NOT count toward your score. You won\'t know which ones they are.']
                ]
            },
            {
                title: 'The Pretest Factor',
                type: 'text',
                content: `Every exam contains questions that don't count.
                
**Why does this matter?**
If you see a question that looks completely alien, bizarre, or impossible—it might be a pretest question. **Do not dwell on it.** Guess, flag it, and move on. Don't let a dummy question ruin your time management for real questions.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'You need a scaled score of 75 to pass.',
                    'Scoring takes difficulty into account.',
                    'Ignore "weird" questions—they might be pretest items.',
                    'Every sub-part of a TBS is scored independently (partial credit is real!).'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-005',
    section: 'PREP',
    title: 'Strategic Section Order',
    description: 'How to plan your exam sequence for maximum efficiency and success.',
    order: 5,
    duration: 35,
    difficulty: 'beginner',
    topics: ['Planning', 'Exam Strategy', 'Schedule'],
    content: {
        sections: [
            {
                title: 'Where to Start?',
                type: 'text',
                content: `There is no "correct" order, but there are "strategic" orders. Your background (tax vs. audit experience) matters, but general principles apply.`
            },
            {
                title: 'Recommended Strategy: FAR First',
                type: 'text',
                content: `**Why FAR First?**
1.  **Foundation:** FAR concepts (journal entries, accruals, revenue recognition) feed into AUD and BAR.
2.  **Volume:** It has the most material. Getting the "beast" out of the way creates momentum.
3.  **Clock:** The 30-month clock starts when you PASS. You don't want to get stuck on FAR with your clock ticking.`
            },
            {
                title: 'Suggested Sequences',
                type: 'list',
                content: [
                    { term: 'The "Classic" Path', definition: 'FAR → AUD → REG → Discipline. Builds logically from accounting rules to auditing those rules, then tax, then specialization.' },
                    { term: 'The "Tax Pro" Path', definition: 'REG → TCP → FAR → AUD. If you work in tax, knock these out comfortably first to build confidence.' },
                    { term: 'The "Auditor" Path', definition: 'AUD → FAR → ISC → REG. If you live in audit, start there.' }
                ]
            },
            {
                title: 'Discipline Timing',
                type: 'text',
                content: `Take your Discipline section **immediately after** its related Core section.
                
• Take **BAR** right after **FAR**.
• Take **TCP** right after **REG**.
• Take **ISC** right after **AUD**.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'FAR is generally the best starting point.',
                    'Pair Disciplines with their corresponding Core foundations.',
                    'Plan your hardest section first so your 30-month clock doesn\'t pressure you on it.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-006',
    section: 'PREP',
    title: 'The 90-Second Rule: MCQ Time Management',
    description: 'Master the clock with strict time limits per question.',
    order: 6,
    duration: 30,
    difficulty: 'beginner',
    topics: ['Time Management', 'MCQ Strategy'],
    content: {
        sections: [
            {
                title: 'The Mathematics of Running Out of Time',
                type: 'text',
                content: `The #1 reason candidates fail is running out of time on the Simulations. You cannot afford to spend 5 minutes on one MCQ.`
            },
            {
                title: 'The Protocol',
                type: 'text',
                content: `**Maximum Time Per MCQ: 90 Seconds.**
                
• **0-45s:** Read stem, read options, calculate/analyze.
• **45-60s:** Process of Elimination.
• **60-90s:** Make a decision.
• **At 90s:** GUESS AND MOVE ON.

Mark/Flag the question if you are unsure, but **never leave it blank** even for a second.`
            },
            {
                title: 'Why Guess?',
                type: 'text',
                content: `There is no penalty for wrong answers. A blank answer is 100% wrong. A guess is 25% right.
                
If you spend 4 minutes on a hard question, you sacrifice time for 2-3 easier questions later. It is a bad trade.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Strict 90-second limit per MCQ.',
                    'Never leave a question blank.',
                    'Flag questions to review if you have extra time at the end of the Testlet.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-007',
    section: 'PREP',
    title: 'Reading MCQs Effectively',
    description: 'Techniques to read questions faster and avoid misinterpretation traps.',
    order: 7,
    duration: 25,
    difficulty: 'beginner',
    topics: ['Reading Strategy', 'MCQ'],
    content: {
        sections: [
            {
                title: 'Read the Inquiry First',
                type: 'text',
                content: `Before you read the paragraph of data, **read the actual question (the last sentence) first.**
                
*Example:*
"What is the net income?" vs "What is comprehensive income?"

Knowing the goal changes how you filter the data in the scenario. You can instantly ignore irrelevant numbers.`
            },
            {
                title: 'Watch for "Negative" Words',
                type: 'text',
                content: `The exam loves words like **EXCEPT**, **NOT**, **LEAST** likely.
                
*Strategy:*
When you see "Which is NOT a requirement...", mentally translate it to "Three of these ARE requirements. I need to find the one that is FALSE."`
            },
            {
                title: 'Dates Matter',
                type: 'text',
                content: `Always circle/highlight dates.
• "Year 1" vs "Year 2"
• "Beginning of year" vs "End of year"
• "July 1" (half-year depreciation?)
                
A correct calculation for the wrong year is a common distractor answer.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Read the last sentence (the question) first.',
                    'Highlight qualifiers like NOT, EXCEPT, ALWAYS, NEVER.',
                    'Pay close attention to dates and timelines.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-008',
    section: 'PREP',
    title: 'Process of Elimination (POE)',
    description: 'How to increase your odds when you don’t know the answer.',
    order: 8,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['MCQ Strategy', 'Logic'],
    content: {
        sections: [
            {
                title: 'The Power of POE',
                type: 'text',
                content: `You don't need to know the right answer; you just need to know the wrong ones. Eliminating two wrong answers boosts your guessing odds from 25% to 50%.`
            },
            {
                title: 'Elimination Techniques',
                type: 'list',
                content: [
                    { term: 'Absolutes', definition: 'Answers with words like "Always", "Never", "Must" are rarely correct in accounting/law. Exceptions usually exist.' },
                    { term: 'Opposites', definition: 'If Option A says "increase" and Option B says "decrease" (and C/D are unrelated), the answer is likely A or B.' },
                    { term: 'The "Odd One Out"', definition: 'If three options are focused on Balance Sheet items and one is an Income Statement item, check the question context again.' }
                ]
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Cross out answers you know are wrong immediately.',
                    'Be skeptical of absolute language.',
                    'Use logic even if you forgot the specific rule.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-009',
    section: 'PREP',
    title: 'Recognizing Distractor Patterns',
    description: 'How test writers create wrong answers to trick you.',
    order: 9,
    duration: 40,
    difficulty: 'advanced',
    topics: ['Psychometrics', 'MCQ Strategy'],
    content: {
        sections: [
            {
                title: 'The Anatomy of a Distractor',
                type: 'text',
                content: `Distractors (wrong answers) are not random strings of numbers. They are the result of **common mistakes**.`
            },
            {
                title: 'Common Calculation Traps',
                type: 'table',
                headers: ['Trap', 'Example'],
                rows: [
                    ['Reversal', 'Subtracting instead of adding (or vice versa).'],
                    ['Wrong Period', 'Calculating depreciation for a full year when asset was bought in Oct.'],
                    ['Partial Calculation', 'Stopping halfway through a multi-step formula.'],
                    ['Tax vs Book', 'Using tax rules for book income questions.']
                ]
            },
            {
                title: 'Defense Strategy',
                type: 'text',
                content: `If you calculate an answer and it helps match one of the options perfectly, **pause for 5 seconds.**
                
Did you account for the date? Did you read "NOT"?
                
Test writers know exactly what mistakes you will make and they put those answers there to catch you.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Wrong answers are calculated derived from common errors.',
                    'Double-check signs (positive/negative).',
                    'Verify the time period (months vs years).'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-010',
    section: 'PREP',
    title: 'Calculation MCQs: Set Up First',
    description: 'Avoid calculator errors by writing down the formula first.',
    order: 10,
    duration: 35,
    difficulty: 'beginner',
    topics: ['Calculations', 'Study Habits'],
    content: {
        sections: [
            {
                title: 'Put Down the Mouse',
                type: 'text',
                content: `When you see a calculation problem, do not reach for the calculator immediately.`
            },
            {
                title: 'The 3-Step Process',
                type: 'list',
                content: [
                    { term: '1. Write the Formula/T-Account', definition: 'Sketch it on your scratch paper/whiteboard. e.g., "Assets = Liab + Equity" or a T-account for A/R.' },
                    { term: '2. Plug the Numbers', definition: 'Write the numbers from the question into your sketch.' },
                    { term: '3. Calculate', definition: 'NOW use the calculator.' }
                ]
            },
            {
                title: 'Why Write It Down?',
                type: 'text',
                content: `Mental math under exam stress is a recipe for disaster. T-accounts clarify debits/credits instantly. Writing it down engages a different part of your brain and reduces "stupid mistakes."`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Use your scratch paper/whiteboard extensively.',
                    'T-Accounts are your best friend.',
                    'Don\'t do mental math.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-011',
    section: 'PREP',
    title: 'The "I Have No Idea" Protocol',
    description: 'What to do when you are completely stumped by a question.',
    order: 11,
    duration: 25,
    difficulty: 'beginner',
    topics: ['Stress Management', 'Guessing'],
    content: {
        sections: [
            {
                title: 'Don\'t Panic',
                type: 'text',
                content: `You will see questions you don't know. This is normal. It might be a pretest question. It might be a detail you forgot.`
            },
            {
                title: 'The Protocol',
                type: 'list',
                content: [
                    { term: '1. Breathe', definition: 'Take one deep breath. Reset.' },
                    { term: '2. Pick "B" (or any letter)', definition: 'Pick a "Letter of the Day" before the exam starts. If you have absolutely zero clue, pick that letter instantly.' },
                    { term: '3. Flag It', definition: 'Mark it for review.' },
                    { term: '4. Move On', definition: 'Forget it immediately. Do not let it haunt you on the next question.' }
                ]
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Consistency in guessing is better than random guessing.',
                    'Speed is more important than agony on a lost cause.',
                    'Protect your confidence.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-012',
    section: 'PREP',
    title: 'TBS Overview: Types & Weighting',
    description: 'Understanding Task-Based Simulations, the most challenging part of the exam.',
    order: 12,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['TBS', 'Simulations'],
    content: {
        sections: [
            {
                title: '50% of Your Score',
                type: 'text',
                content: `TBS questions require you to apply knowledge, not just recall it. They mimic real-world tasks.`
            },
            {
                title: 'Common TBS Types',
                type: 'list',
                content: [
                    { term: 'Document Review', definition: 'Reviewing exhibits (emails, memos, invoices) to correct a draft document or validate facts.' },
                    { term: 'Journal Entries', definition: 'Recording transactions. Often requires selecting account names and entering amounts.' },
                    { term: 'Research', definition: 'Searching the Authoritative Literature (FASB Codification, IRC, etc.) to cite a specific code section.' },
                    { term: 'Calculations in Spreadsheets', definition: 'Completing a schedule (e.g., depreciation schedule) in a grid.' }
                ]
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'TBS are worth 50% of your score.',
                    'They require synthesizing information from multiple exhibits.',
                    'Partial credit is available for each cell/field correctly filled.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-013',
    section: 'PREP',
    title: 'TBS Time Management: 15-Minute Rule',
    description: 'How to allocate time for simulations to ensure you finish.',
    order: 13,
    duration: 30,
    difficulty: 'intermediate',
    topics: ['Time Management', 'TBS'],
    content: {
        sections: [
            {
                title: 'The Time Sink',
                type: 'text',
                content: `TBS questions can be massive. If you aren't careful, one simulation can eat 40 minutes.`
            },
            {
                title: 'The Budget',
                type: 'text',
                content: `Allocate roughly **15-20 minutes per TBS**.
                
For a typical 4-hour exam:
• MCQs: 90-100 mins
• TBS: 130-140 mins`
            },
            {
                title: 'When to Move On',
                type: 'warning',
                content: `If you have spent 20 minutes on a TBS and are not finished, **fill in your best guesses for remaining blanks and MOVE ON.** Leaving the rest blank guarantees 0 points. Guessing gives you a chance. You need to save time for the remaining simulations.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Budget 15-20 minutes per simulation.',
                    'Keep an eye on the exam clock.',
                    'Don\'t let one difficult TBS sink your whole exam.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-014',
    section: 'PREP',
    title: 'Research TBS: Guaranteed Points',
    description: 'Mastering the search function for Authoritative Literature.',
    order: 14,
    duration: 40,
    difficulty: 'beginner',
    topics: ['Research', 'FASB', 'IRC'],
    content: {
        sections: [
            {
                title: 'The "Free" Points',
                type: 'text',
                content: `Research questions ask you to find the specific code section that supports a tax or accounting rule. You have access to the search tool.`
            },
            {
                title: 'Search Strategy',
                type: 'list',
                content: [
                    { term: 'Keywords', definition: 'Pick unique nouns from the question. Avoid generic words like "accounting" or "tax".' },
                    { term: 'Advanced Search', definition: 'Use "Exact Phrase" quotes if you are sure. e.g., "nonmonetary exchange".' },
                    { term: 'Drill Down', definition: 'Once you find the topic (e.g., ASC 842 Leases), browse the sub-sections to find the specific paragraph.' }
                ]
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Practice using the search tool before exam day.',
                    'These should be quick wins.',
                    'Double-check that the paragraph you cite actually answers the specific question.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-015',
    section: 'PREP',
    title: 'Document Review TBS',
    description: 'Strategies for handling simulations with multiple exhibits.',
    order: 15,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['TBS', 'Document Review'],
    content: {
        sections: [
            {
                title: 'Exhibit Overload',
                type: 'text',
                content: `You might get 5-8 exhibits: an email, a memo, an invoice, a meeting minute, a tax form, etc. It feels overwhelming.`
            },
            {
                title: 'Strategy: The Organizers',
                type: 'text',
                content: `1. **Glance at the Task:** Read what you are asked to do FIRST.
2. **Scan Exhibits:** Open each one briefly to see what it is (e.g., "Exhibit 1 is the Invoice").
3. **Use the Split Screen:** Keep the inputs visible while opening exhibits one by one.`
            },
            {
                title: 'Tip',
                type: 'text',
                content: `You rarely need *all* information in an exhibit. You are looking for specific facts (dates, amounts). Use the highlighting tool in the exam software to mark key numbers.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Don\'t read every word of every exhibit initially.',
                    'Understand the task requirement first.',
                    'Synthesize data carefully (e.g., verify invoice amount matches purchase order).'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-016',
    section: 'PREP',
    title: 'Journal Entry TBS',
    description: 'Best practices for recording journal entries in the exam interface.',
    order: 16,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Journal Entries', 'TBS'],
    content: {
        sections: [
            {
                title: 'The Interface',
                type: 'text',
                content: `You will usually select account names from a dropdown list and type in the debit/credit amounts.`
            },
            {
                title: 'Common Pitfalls',
                type: 'list',
                content: [
                    { term: 'Rounding', definition: 'Read instructions carefully! "Round to nearest dollar" vs "nearest thousand".' },
                    { term: 'Blank Rows', definition: 'If there are extra rows you don\'t need, leave them blank (unless instructions say select "No Entry").' },
                    { term: 'Debits First', definition: 'Standard convention is Debits first, then Credits. The computer usually grades on the account/amount pair, but stay organized.' }
                ]
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Read the "Rounding" instructions twice.',
                    'Verify your debits equal your credits.',
                    'Use the dropdown search to find account names quickly.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-017',
    section: 'PREP',
    title: 'Spreadsheet TBS: Excel for CPAs',
    description: 'Using the exam spreadsheet tool effectively.',
    order: 17,
    duration: 45,
    difficulty: 'intermediate',
    topics: ['Excel', 'TBS', 'Tools'],
    content: {
        sections: [
            {
                title: 'Not Quite Excel',
                type: 'text',
                content: `The exam tool is Excel-like but has fewer features. Basic formulas (SUM, AVERAGE, multiplication, division) work fine.`
            },
            {
                title: 'Use Formulas, Don\'t Type',
                type: 'text',
                content: `If you need to add a column, use \`=SUM(A1:A10)\`.
                
**Why?**
If you realize you made a typo in one number, correcting it will automatically update the total. If you typed the total manually, you have to recalc everything.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Use formulas to save time and reduce errors.',
                    'Keep your calculations organized in the spreadsheet so you can review them.',
                    'Don\'t rely on complex Excel macros or shortcuts; keep it simple.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-018',
    section: 'PREP',
    title: 'Written Communication: What Graders Want',
    description: 'Understanding the rubric for writing tasks (primarily in Discipline sections or BAR).',
    order: 18,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Writing', 'Communication'],
    content: {
        sections: [
            {
                title: 'The "Human" Grader',
                type: 'text',
                content: `Most writing tasks are graded by a computer, but some are human-graded. They look for specific things.`
            },
            {
                title: 'The 3 C\'s',
                type: 'list',
                content: [
                    { term: 'Clear', definition: 'Short sentences. Simple words.' },
                    { term: 'Concise', definition: 'Get to the point. No fluff.' },
                    { term: 'Correct', definition: 'Use proper grammar and spelling. Stay on topic.' }
                ]
            },
            {
                title: 'Keywords',
                type: 'text',
                content: `The automated grader looks for **keywords** related to the topic. If the topic is "Auditor Independence," use words like "independence," "threats," "safeguards," "audit committee."`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Write for a professional audience.',
                    'Include keywords from the prompt.',
                    'Proofread for spelling errors.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-019',
    section: 'PREP',
    title: 'IRAC Method for Tax Memos',
    description: 'A structured approach to writing technical memos.',
    order: 19,
    duration: 40,
    difficulty: 'advanced',
    topics: ['Writing', 'Tax', 'Strategy'],
    content: {
        sections: [
            {
                title: 'The IRAC Structure',
                type: 'text',
                content: `IRAC is a standard legal writing format that works perfectly for CPA Exam memos.`
            },
            {
                title: 'I-R-A-C Breakdown',
                type: 'list',
                content: [
                    { term: 'Issue', definition: 'State the problem clearly. "The issue is whether the taxpayer can deduct..."' },
                    { term: 'Rule', definition: 'State the relevant law/rule. "Per IRC Section 162..."' },
                    { term: 'Analysis', definition: 'Apply the rule to the facts. "In this case, the taxpayer incurred expenses..."' },
                    { term: 'Conclusion', definition: 'Give the answer. "Therefore, the deduction is allowed."' }
                ]
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Structure helps you stay organized.',
                    'Ensure you cover the "Why" (Analysis) not just the "What" (Conclusion).'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-020',
    section: 'PREP',
    title: 'Common WC Mistakes',
    description: 'Avoidable errors that cost points in written communication.',
    order: 20,
    duration: 30,
    difficulty: 'beginner',
    topics: ['Writing', 'Mistakes'],
    content: {
        sections: [
            {
                title: 'Top Mistakes',
                type: 'list',
                content: [
                    { term: 'Off-Topic', definition: 'Answering a question that wasn\'t asked. Stick to the prompt.' },
                    { term: 'Slang/Casual Tone', definition: 'Avoid "Can\'t", "Won\'t", "Kids", "Stuff". Use "Cannot", "Will not", "Children", "Material".' },
                    { term: 'One Giant Paragraph', definition: 'Break your writing into introduction, body, and conclusion paragraphs. Use white space.' }
                ]
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Be formal and professional.',
                    'Structure with paragraphs.',
                    'Answer the specific question asked.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-021',
    section: 'PREP',
    title: 'Building Your Study Schedule',
    description: 'How to create a realistic study plan you can stick to.',
    order: 21,
    duration: 45,
    difficulty: 'beginner',
    topics: ['Planning', 'Productivity'],
    content: {
        sections: [
            {
                title: 'Hours Required',
                type: 'table',
                headers: ['Section', 'Estimated Study Hours'],
                rows: [
                    ['FAR', '130 - 160 hours'],
                    ['AUD', '80 - 100 hours'],
                    ['REG', '90 - 120 hours'],
                    ['Discipline', '80 - 100 hours']
                ]
            },
            {
                title: 'Consistency > Intensity',
                type: 'text',
                content: `It is better to study 2 hours every day than 14 hours on Sunday. Your brain needs sleep to consolidate memory.`
            },
            {
                title: 'The Routine',
                type: 'list',
                content: [
                    { term: 'Morning', definition: '1 hour of MCQs before work. (Fresh brain)' },
                    { term: 'Lunch', definition: '30 mins of review / flashcards.' },
                    { term: 'Evening', definition: '1-1.5 hours of lectures/TBS.' }
                ]
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Be realistic about your time.',
                    'Schedule days off (e.g., Friday night).',
                    'Track your hours to ensure you hit the targets.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-022',
    section: 'PREP',
    title: 'Active vs Passive Studying',
    description: 'Why watching videos isn’t enough and how to learn actively.',
    order: 22,
    duration: 35,
    difficulty: 'intermediate',
    topics: ['Learning Science', 'Study Habits'],
    content: {
        sections: [
            {
                title: 'The Learning Pyramid',
                type: 'text',
                content: `**Passive Learning:** Watching lectures, reading the book. (Retention: ~10-20%)
**Active Learning:** Doing MCQs, teaching the concept, writing notes. (Retention: ~75-90%)`
            },
            {
                title: 'The 70/30 Rule',
                type: 'text',
                content: `Spend **30%** of your time learning the material (lectures/reading).
Spend **70%** of your time APPLYING the material (MCQs/TBS).`
            },
            {
                title: 'Strategies',
                type: 'list',
                content: [
                    { term: 'Stop & Quiz', definition: 'Pause the lecture every 10 mins and ask yourself: "What did I just learn?"' },
                    { term: 'Teach It', definition: 'Try to explain the concept out loud to an imaginary 5-year-old.' },
                    { term: 'Handwrite Notes', definition: 'Research shows handwriting improves memory retention over typing.' }
                ]
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Don\'t just watch videos passively.',
                    'Grind MCQs daily.',
                    'Focus on active recall techniques.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-023',
    section: 'PREP',
    title: 'Final Review: Last 2 Weeks',
    description: 'The taper phase: how to optimize the final days before the exam.',
    order: 23,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Review', 'Strategy'],
    content: {
        sections: [
            {
                title: 'No New Material',
                type: 'text',
                content: `Two weeks out, stop learning new lessons. It's review time.`
            },
            {
                title: 'Review Activities',
                type: 'list',
                content: [
                    { term: 'Cumulative MCQs', definition: 'Sets of 33 random questions from ALL chapters.' },
                    { term: 'Weakness Targeting', definition: 'Identify your lowest scoring areas and do focused bursts.' },
                    { term: 'Simulated Exams', definition: 'Take a full 4-hour mock exam to build stamina.' }
                ]
            },
            {
                title: 'The Final Day',
                type: 'text',
                content: `Do **NOT** study the day before the exam. Relax. Your brain needs to be fresh, not exhausted.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Focus on review sets.',
                    'Build exam stamina with mock tests.',
                    'Rest before the big day.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-024',
    section: 'PREP',
    title: 'Test Day Protocol',
    description: 'What to expect at the Prometric center and how to prepare.',
    order: 24,
    duration: 35,
    difficulty: 'beginner',
    topics: ['Test Day', 'Logistics'],
    content: {
        sections: [
            {
                title: 'What to Bring',
                type: 'list',
                content: [
                    { term: 'NTS', definition: 'Notice to Schedule. Print it out. Do not forget it.' },
                    { term: 'ID', definition: 'Two forms of ID. One must be a government-issued photo ID (Driver\'s License/Passport).' }
                ]
            },
            {
                title: 'Security Procedures',
                type: 'text',
                content: `Expect airport-style security. Pockets empty. Lockers for your stuff. Fingerprinting. Metal detectors.`
            },
            {
                title: 'The Environment',
                type: 'text',
                content: `It will be cold. Bring a light sweater or jacket (subject to inspection). Noise-canceling headphones are provided.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Don\'t forget your NTS and ID.',
                    'Arrive 30 minutes early.',
                    'Dress in layers.'
                ]
            }
        ]
    }
  },
  {
    id: 'prep-025',
    section: 'PREP',
    title: 'Managing Test Anxiety',
    description: 'Mental strategies to stay calm and focused under pressure.',
    order: 25,
    duration: 40,
    difficulty: 'intermediate',
    topics: ['Mental Health', 'Anxiety'],
    content: {
        sections: [
            {
                title: 'The Adrenaline Spike',
                type: 'text',
                content: `It is normal to feel your heart race when the timer starts. Use that energy for focus, not panic.`
            },
            {
                title: 'Techniques',
                type: 'list',
                content: [
                    { term: 'Box Breathing', definition: 'Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Lowers heart rate.' },
                    { term: 'Positive Visualization', definition: 'Visualize yourself passing the exam.' },
                    { term: 'The "Stop" Sign', definition: 'If you start spiraling ("I\'m failing, I don\'t know this"), mentally visualize a giant red STOP sign. Reset.' }
                ]
            },
            {
                title: 'You Are Prepared',
                type: 'text',
                content: `Trust your study hours. You have put in the work. One hard question acts not define your score.`
            },
            {
                title: 'Key Takeaways',
                type: 'summary',
                content: [
                    'Anxiety is improved by breathing.',
                    'Stay in the present moment (this question).',
                    'Believe in your preparation.'
                ]
            }
        ]
    }
  }
];
