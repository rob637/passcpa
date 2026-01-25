import { Lesson } from '../../types';

/**
 * PREP Section: CPA Exam Strategy & Preparation
 * 2026 Blueprint Compliant
 * 
 * ⚠️ TAX LAW TRANSITION ALERT (January 2026):
 * - Old provisions (pre-OBBBA) remain testable through June 30, 2026
 * - New OBBBA (H.R. 1 "One Big Beautiful Bill Act") provisions testable July 1, 2026
 * - Study BOTH sets of rules if testing near the July 1 transition!
 */

export const prepLessons: Lesson[] = [
  {
    id: 'PREP-001',
    section: 'PREP',
    title: "CPA Evolution 2026: Your Complete Roadmap",
    description: "Understand the new 3 Core + 1 Discipline structure and 30-month testing window",
    order: 1,
    duration: 45,
    difficulty: 'beginner',
    topics: ["Exam Structure", "CPA Evolution", "2026 Blueprint"],
    content: {
      sections: [
        {
          title: '2026 Blueprint Compliant',
          type: 'callout',
          calloutType: 'important',
          content: "This course is fully aligned with the 2026 CPA Exam Blueprint. The CPA Evolution model (launched January 2024) transforms how you become a CPA. Understanding this structure is your first step to passing efficiently."
        },
        {
          title: 'The New CPA Exam Structure',
          type: 'text',
          content: "Gone is the old 4-section exam! CPA Evolution introduces a Core + Discipline model. You'll take 3 Core sections that every CPA needs, plus 1 Discipline section in your chosen specialty. This reflects how modern CPAs actually work."
        },
        {
          title: 'Core Sections (Required for All)',
          type: 'table',
          headers: ["Section", "Full Name", "Hours", "Focus"],
          rows: [
            ["FAR", "Financial Accounting & Reporting", "4 hours", "GAAP, government, nonprofit"],
            ["AUD", "Auditing & Attestation", "4 hours", "Audit procedures, ethics, reports"],
            ["REG", "Taxation & Regulation", "4 hours", "Individual, business tax, ethics"]
          ]
        },
        {
          title: 'Discipline Sections (Choose ONE)',
          type: 'table',
          headers: ["Section", "Full Name", "Hours", "Best For"],
          rows: [
            ["BAR", "Business Analysis & Reporting", "4 hours", "Traditional accounting, financial analysis"],
            ["ISC", "Information Systems & Controls", "4 hours", "IT audit, cybersecurity, systems"],
            ["TCP", "Tax Compliance & Planning", "4 hours", "Tax practice, planning, advisory"]
          ]
        },
        {
          title: 'Choosing Your Discipline',
          type: 'list',
          items: [
            "BAR: Best if you'll work in financial reporting, FP&A, or traditional public accounting",
            "ISC: Best if interested in IT audit, systems consulting, or cybersecurity",
            "TCP: Best if pursuing tax practice, planning, or tax advisory services",
            "Your discipline does NOT limit your career—all CPAs can do all work",
            "Choose based on interest and career goals, not perceived difficulty"
          ]
        },
        {
          title: 'The 30-Month Window',
          type: 'text',
          content: "You have 30 months from passing your first section to pass all four. This replaces the old 18-month window. Strategic planning matters: If you fail a section after 30 months, your first passed section expires!"
        },
        {
          title: 'Sample Timeline',
          type: 'example',
          content: "Recommended approach (working full-time):\n\nMonth 1-3: FAR (most content, tackle fresh)\nMonth 4-5: AUD (builds on FAR concepts)\nMonth 6-7: REG (self-contained, different material)\nMonth 8-9: Discipline of choice\n\nTotal: 9 months active study\nRemaining buffer: 21 months\n\nKey: Don't use all 30 months! Leave buffer for retakes."
        },
        {
          title: '⚠️ 2026 Tax Law Transition',
          type: 'callout',
          calloutType: 'warning',
          content: "CRITICAL FOR REG AND TCP CANDIDATES:\n\n• Through June 30, 2026: Test on pre-OBBBA (old) tax law\n• Starting July 1, 2026: OBBBA (H.R. 1 'One Big Beautiful Bill Act') provisions become testable\n\nIf testing near July 1, study BOTH sets of rules! Our H.R. 1 lessons are clearly marked with 🆕."
        },
        {
          title: 'Passing Score',
          type: 'text',
          content: "Each section requires a scaled score of 75 to pass. This isn't 75%—it's a scaled score based on question difficulty. Roughly, you need about 65-70% correct on medium-difficulty questions to pass."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• 3 Core sections (FAR, AUD, REG) + 1 Discipline (BAR, ISC, or TCP)\n• 30-month window from first passed section\n• 75 scaled score to pass each section\n• Choose discipline based on career interest, not difficulty\n• Tax candidates: Watch for July 1, 2026 OBBBA transition"
        }
      ]
    }
  },
  {
    id: 'PREP-002',
    section: 'PREP',
    title: "Anatomy of the Exam: Testlets, Timing, Scoring",
    description: "Master the exam structure, question types, and time allocation for each section",
    order: 2,
    duration: 45,
    difficulty: 'beginner',
    topics: ["Exam Structure", "Timing", "2026 Blueprint"],
    content: {
      sections: [
        {
          title: 'Know Your Battlefield',
          type: 'callout',
          calloutType: 'important',
          content: "Understanding the exam structure isn't just helpful—it's strategic. Knowing how many questions, how much time, and what's weighted most lets you allocate your energy where it counts. This knowledge alone can add points to your score."
        },
        {
          title: 'Question Types',
          type: 'table',
          headers: ["Type", "Abbreviation", "What It Is"],
          rows: [
            ["Multiple Choice Questions", "MCQ", "4-option questions, one correct answer"],
            ["Task-Based Simulations", "TBS", "Realistic scenarios with multiple parts"],
            ["Written Communication", "WC", "Professional memos/letters (REG/BAR only)"]
          ]
        },
        {
          title: 'Section Structure (2026 Blueprint)',
          type: 'table',
          headers: ["Section", "MCQs", "TBS", "WC", "Total Time"],
          rows: [
            ["FAR", "50 (50%)", "7 (50%)", "0", "4 hours"],
            ["AUD", "78 (50%)", "7 (50%)", "0", "4 hours"],
            ["REG", "72 (50%)", "6 (40%)", "1 (10%)", "4 hours"],
            ["BAR", "50 (50%)", "6 (40%)", "1 (10%)", "4 hours"],
            ["ISC", "82 (60%)", "6 (40%)", "0", "4 hours"],
            ["TCP", "68 (50%)", "6 (40%)", "1 (10%)", "4 hours"]
          ]
        },
        {
          title: 'Testlet Structure',
          type: 'text',
          content: "Each exam is divided into testlets (groups of questions). You must complete a testlet before moving to the next, and you CANNOT go back to previous testlets. Typically: 2-3 MCQ testlets, followed by 2-3 TBS testlets."
        },
        {
          title: 'Time Allocation Strategy',
          type: 'example',
          content: "For a 4-hour exam with 50 MCQs and 7 TBS:\n\nMCQ Time: ~90 seconds per question\n50 MCQs × 1.5 min = 75 minutes (~1.25 hours)\n\nTBS Time: Remaining 2.75 hours for 7 TBS\n~23 minutes per TBS average\n\nBuffer: Build in 15 minutes for review/unexpected\n\nGOLDEN RULE: Don't spend more than 2 minutes on any MCQ!"
        },
        {
          title: 'The 15-Minute Break',
          type: 'text',
          content: "You get one optional 15-minute break, typically between MCQ and TBS testlets. The clock stops during this break. USE IT! Get up, stretch, use the restroom, clear your mind. You'll perform better on TBS with a mental reset."
        },
        {
          title: 'Scoring Weights',
          type: 'list',
          items: [
            "MCQs count for 50-60% depending on section (see table above)",
            "TBS count for 40-50% of your score",
            "Written Communication (where applicable): 10%",
            "Pretest questions: Some MCQs/TBS don't count (you won't know which)",
            "No penalty for wrong answers—ALWAYS answer everything!"
          ]
        },
        {
          title: 'Pretest Questions',
          type: 'callout',
          calloutType: 'tip',
          content: "About 10-15% of questions are 'pretest'—they don't count toward your score but are being tested for future exams. You won't know which ones! Treat every question as if it counts. This also means a few 'impossible' questions might be pretests."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• MCQs = 50-60% of score; TBS = 40-50%\n• ~90 seconds per MCQ; ~20 minutes per TBS\n• Take the 15-minute break—it's free time!\n• Can't go back to previous testlets\n• Pretest questions exist—treat all as real\n• ALWAYS answer every question (no penalty)"
        }
      ]
    }
  },
  {
    id: 'PREP-003',
    section: 'PREP',
    title: "Adaptive Testing: What It Means for You",
    description: "Understand how MCQ difficulty adapts based on your performance",
    order: 3,
    duration: 35,
    difficulty: 'beginner',
    topics: ["Adaptive Testing", "MCQ", "Strategy"],
    content: {
      sections: [
        {
          title: 'The Test Adapts to YOU',
          type: 'callout',
          calloutType: 'important',
          content: "The CPA Exam uses Multi-Stage Testing (MST), a form of adaptive testing. Your performance on the first MCQ testlet determines the difficulty of the second. Understanding this helps you interpret your exam experience correctly."
        },
        {
          title: 'How It Works',
          type: 'text',
          content: "The first MCQ testlet is 'medium' difficulty for everyone. Based on your performance, the second testlet is either 'medium' or 'difficult.' Performing well on harder questions gives you more points—the exam rewards those who can handle tougher material."
        },
        {
          title: 'Difficulty Levels',
          type: 'table',
          headers: ["Testlet 1", "Your Performance", "Testlet 2"],
          rows: [
            ["Medium", "Below threshold", "Medium (stay)"],
            ["Medium", "Above threshold", "Difficult (move up)"],
            ["Medium", "Way above", "Difficult (move up)"]
          ]
        },
        {
          title: 'The Psychology Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "DANGER: Many candidates feel devastated when the second testlet seems harder. They think they're failing! In reality, harder questions often mean you're DOING WELL. Don't let psychology defeat you—harder questions are a GOOD sign."
        },
        {
          title: 'What This Means Strategically',
          type: 'list',
          items: [
            "First testlet matters most for 'setting your level'",
            "Getting harder questions = potentially passing",
            "Getting easier questions = warning sign, but not fatal",
            "Correct answers on hard questions = more points",
            "Wrong answers on hard questions = less penalty",
            "You can still pass either way—just keep working!"
          ]
        },
        {
          title: 'Example: Two Candidates',
          type: 'example',
          content: "Candidate A: Gets easier second testlet, answers 85% correct\nCandidate B: Gets harder second testlet, answers 65% correct\n\nWho passes? Possibly BOTH—or Candidate B might score higher!\n\nThe scoring algorithm accounts for difficulty. Getting 65% on hard questions can equal 85% on easy ones. Don't judge your performance by how questions 'felt.'"
        },
        {
          title: 'TBS Are NOT Adaptive',
          type: 'text',
          content: "Important: Only MCQ testlets adapt. TBS (Task-Based Simulations) are pre-selected and don't change based on your MCQ performance. Everyone gets the same TBS difficulty mix, so your TBS strategy doesn't change based on MCQ performance."
        },
        {
          title: 'Mental Game',
          type: 'callout',
          calloutType: 'tip',
          content: "If questions feel harder in testlet 2, tell yourself: 'The exam thinks I'm smart!' This reframe keeps you confident. Doubt and panic are your real enemies—not difficult questions."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• First MCQ testlet is always medium difficulty\n• Second testlet adapts based on your performance\n• Harder questions = likely doing well (good sign!)\n• Harder questions earn more points per correct answer\n• TBS don't adapt—same for everyone\n• Don't judge your score by question difficulty"
        }
      ]
    }
  },
  {
    id: 'PREP-004',
    section: 'PREP',
    title: "How the CPA Exam is Scored",
    description: "Understand raw scores, scaled scores, and what 75 really means",
    order: 4,
    duration: 40,
    difficulty: 'beginner',
    topics: ["Scoring", "Exam Structure"],
    content: {
      sections: [
        {
          title: 'Demystifying the 75',
          type: 'callout',
          calloutType: 'important',
          content: "You need a 75 to pass—but that's not 75%! Understanding how scoring works removes anxiety and helps you target your studying effectively. The 75 is a scaled score that accounts for question difficulty."
        },
        {
          title: 'Raw Score vs Scaled Score',
          type: 'table',
          headers: ["Type", "What It Is", "Range"],
          rows: [
            ["Raw Score", "Actual % of questions correct", "0-100%"],
            ["Scaled Score", "Adjusted for difficulty, reported", "0-99"],
            ["Passing Score", "Minimum scaled score needed", "75"]
          ]
        },
        {
          title: 'Why Scaling Matters',
          type: 'text',
          content: "Different exams have slightly different difficulty levels. Scaling ensures fairness—if you get a harder exam, your raw score is adjusted upward. If easier, adjusted downward. A 75 means 'minimally competent' regardless of which exam version you took."
        },
        {
          title: 'What Does 75 Actually Require?',
          type: 'example',
          content: "General estimates (not official):\n\nMCQs: ~65-70% correct on medium difficulty\nTBS: ~60-65% correct\nWC: 'Sufficient' rating (coherent, addresses topic)\n\nThis means you DON'T need perfection!\n\n• You can miss ~30-35% of MCQs\n• You can bomb 1-2 TBS completely\n• You can write a mediocre WC\n\nAim for solid performance, not perfection."
        },
        {
          title: 'How Each Component Is Scored',
          type: 'list',
          items: [
            "MCQs: Correct = 1 point (weighted by difficulty); Wrong = 0",
            "TBS: Partial credit available—each cell/entry scored separately",
            "WC: Holistic 0-2 scale (off-topic, below, sufficient, above)",
            "Pretest items: Don't count, but you can't identify them",
            "All components combined and scaled to 0-99"
          ]
        },
        {
          title: 'Partial Credit on TBS',
          type: 'callout',
          calloutType: 'tip',
          content: "TBS give PARTIAL CREDIT! If a TBS has 10 blanks and you get 6 right, you get 60% credit—not zero. This is huge! Always attempt every part of a TBS. Even getting the easy parts right while missing hard parts earns points."
        },
        {
          title: 'Written Communication Scoring',
          type: 'table',
          headers: ["Rating", "Description", "Requirements"],
          rows: [
            ["0 - Deficient", "Off-topic or unintelligible", "Nothing salvageable"],
            ["1 - Below", "On-topic but weak", "Attempts to address issue"],
            ["2 - Sufficient", "Adequately addresses", "Clear, organized, relevant"],
            ["3+ - Above", "Exceeds expectations", "Outstanding (rare)"]
          ]
        },
        {
          title: 'Score Release Timeline',
          type: 'text',
          content: "Scores are released in 'windows' throughout the year—typically 2-3 weeks after the testing window closes. You'll receive your scaled score (0-99) but NOT a breakdown by topic. If you fail, you'll get a performance report showing weak areas."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• 75 scaled score to pass (not 75% raw)\n• Scaling adjusts for exam difficulty\n• Need roughly 65-70% on MCQs, 60-65% on TBS\n• TBS give partial credit—attempt everything!\n• WC just needs to be 'sufficient' (not perfect)\n• Scores released in windows, 2-3 weeks after testing"
        }
      ]
    }
  },
  {
    id: 'PREP-005',
    section: 'PREP',
    title: "Strategic Section Order",
    description: "Plan your optimal exam sequence: FAR first? Save your discipline for last?",
    order: 5,
    duration: 35,
    difficulty: 'beginner',
    topics: ["Strategy", "Planning", "2026 Blueprint"],
    content: {
      sections: [
        {
          title: 'Order Matters',
          type: 'callout',
          calloutType: 'important',
          content: "There's no required order, but strategy matters! The sequence you choose affects your momentum, knowledge retention, and risk management. Most successful candidates think carefully about their path."
        },
        {
          title: 'Popular Approaches',
          type: 'table',
          headers: ["Strategy", "Order", "Best For"],
          rows: [
            ["FAR First (Classic)", "FAR → AUD → REG → Discipline", "Most candidates; tackle hardest fresh"],
            ["AUD First (Confidence)", "AUD → FAR → REG → Discipline", "Need early win; AUD has good pass rate"],
            ["REG First (Tax Focus)", "REG → TCP → FAR → AUD", "Tax-focused; keep REG/TCP together"],
            ["Discipline First", "Discipline → Cores", "Very strong in specialty area"]
          ]
        },
        {
          title: 'The Case for FAR First',
          type: 'list',
          items: [
            "Largest section with most content (~65 lessons)",
            "Foundation for other sections (AUD tests FAR knowledge)",
            "Best tackled when you're freshest and most motivated",
            "Passing FAR first builds massive confidence",
            "If you can pass FAR, you can pass anything"
          ]
        },
        {
          title: 'The Case for AUD Second',
          type: 'text',
          content: "AUD builds directly on FAR knowledge—you need to understand financial statements to audit them. Taking AUD shortly after FAR lets you leverage that knowledge while it's fresh. Many FAR concepts appear in AUD context."
        },
        {
          title: 'The Case for REG Flexibility',
          type: 'text',
          content: "REG is relatively self-contained. Tax law doesn't depend much on FAR or AUD content. This makes REG flexible in your sequence. If choosing TCP as your discipline, consider REG→TCP back-to-back to keep tax knowledge consolidated."
        },
        {
          title: '⚠️ 2026 Tax Timing Consideration',
          type: 'callout',
          calloutType: 'warning',
          content: "TAX LAW TRANSITION (REG and TCP):\n\n• Testing before July 1, 2026: Old law (pre-OBBBA)\n• Testing July 1, 2026 or later: OBBBA (H.R. 1) provisions\n\nIf testing near July, consider scheduling REG and TCP on the SAME SIDE of July 1 to avoid studying two different tax law regimes!"
        },
        {
          title: 'Save Your Discipline for Last?',
          type: 'text',
          content: "Many advise saving your discipline for last: You'll have exam experience, you're choosing an area of interest (more motivating), and it's lower stakes if you've passed 3 cores. However, if you're VERY strong in your discipline, taking it earlier can build confidence."
        },
        {
          title: 'Example Timeline: Full-Time Worker',
          type: 'example',
          content: "Starting January 2026:\n\nJan-Mar: FAR (3 months, hardest section)\nApr-May: AUD (2 months, leverage FAR)\nJun: REG (before July 1 OBBBA transition)\nAug-Sep: Discipline of choice\n\nTotal: 9 months\nWindow remaining: 21 months buffer\n\nAlternate if testing REG after July 1:\nStudy OBBBA provisions starting June!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• FAR first is most common (hardest, foundational)\n• AUD after FAR (builds on financial statement knowledge)\n• REG is flexible (self-contained tax content)\n• Consider keeping REG+TCP together if tax-focused\n• Watch July 1, 2026 OBBBA transition for REG/TCP timing\n• Leave buffer in your 30-month window for retakes"
        }
      ]
    }
  },
  {
    id: 'PREP-006',
    section: 'PREP',
    title: "The 90-Second Rule: MCQ Time Management",
    description: "Master the timing discipline that separates passers from failers",
    order: 6,
    duration: 30,
    difficulty: 'intermediate',
    topics: ["Strategy", "MCQ", "Time Management"],
    content: {
      sections: [
        {
          title: 'Time Is Your Enemy',
          type: 'callout',
          calloutType: 'important',
          content: "The #1 reason candidates fail isn't knowledge—it's time management. Getting stuck on hard MCQs steals time from easier questions you'd get right. The 90-second rule prevents this trap."
        },
        {
          title: 'The 90-Second Rule',
          type: 'text',
          content: "If you've spent 90 seconds on an MCQ and aren't close to answering, STOP. Mark it, make your best guess, and move on. You can return if time permits. Spending 3-4 minutes on one question means losing 2-3 easier questions."
        },
        {
          title: 'Time Budget by Section',
          type: 'table',
          headers: ["Section", "MCQs", "Target Time", "Per MCQ"],
          rows: [
            ["FAR", "50", "75-80 min", "90 sec"],
            ["AUD", "78", "100-110 min", "80 sec"],
            ["REG", "72", "95-100 min", "80 sec"],
            ["BAR", "50", "75-80 min", "90 sec"],
            ["ISC", "82", "105-115 min", "80 sec"],
            ["TCP", "68", "90-95 min", "80 sec"]
          ]
        },
        {
          title: 'When to Spend More Time',
          type: 'list',
          items: [
            "Calculation questions: May need 2 minutes—that's OK",
            "You're 90% there: Extra 30 seconds might get it",
            "You've banked time: Ahead of schedule allows flexibility",
            "Never exceed 3 minutes on ANY MCQ, regardless of situation"
          ]
        },
        {
          title: 'The Math of Moving On',
          type: 'example',
          content: "Scenario: 50 MCQs, 75 minutes\n\nBad approach: Spend 4 minutes on 5 hard questions\n= 20 minutes on 5 questions (10%)\n= 55 minutes for 45 questions (1.2 min each)\n= Rushing, making careless errors\n\nGood approach: Spend 90 sec max, guess and move\n= 7.5 minutes on 5 hard questions\n= 67.5 minutes for 45 questions (1.5 min each)\n= Calm, thoughtful answers\n\nEven if you'd have gotten 2 more hard ones right, you likely lose 3+ easy ones rushing!"
        },
        {
          title: 'Building Time Discipline',
          type: 'list',
          items: [
            "Practice with a timer ALWAYS",
            "During practice, force yourself to move at 90 seconds",
            "Check your pace every 10 questions",
            "If behind, move faster on next 10",
            "It feels wrong at first—trust the process"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• 90 seconds per MCQ maximum (80 for high-MCQ sections)\n• Mark and guess if stuck—don't burn time\n• Calculations may need 2 minutes, never more than 3\n• Check pace every 10 questions\n• Practice with timers to build discipline\n• Moving on saves more points than staying saves"
        }
      ]
    }
  },
  {
    id: 'PREP-007',
    section: 'PREP',
    title: "Reading MCQs Effectively",
    description: "Stem first or options first? Master the reading strategy that works",
    order: 7,
    duration: 25,
    difficulty: 'intermediate',
    topics: ["Strategy", "MCQ", "Reading"],
    content: {
      sections: [
        {
          title: 'Read Smart, Not Just Fast',
          type: 'callout',
          calloutType: 'important',
          content: "HOW you read an MCQ matters as much as what you know. Many candidates misread questions or miss key words, losing points they should have earned. A systematic reading approach prevents these costly errors."
        },
        {
          title: 'Two Approaches',
          type: 'table',
          headers: ["Approach", "Method", "Best For"],
          rows: [
            ["Stem First", "Read question, then options", "Most questions, conceptual"],
            ["Options First", "Scan options, then read stem", "'Which is correct' questions"]
          ]
        },
        {
          title: 'Stem-First Method (Default)',
          type: 'list',
          items: [
            "Read the entire question stem carefully",
            "Identify what's being asked BEFORE looking at options",
            "Form your own answer in your head",
            "Then find the matching option",
            "Prevents options from confusing you"
          ]
        },
        {
          title: 'Key Words to Circle (Mentally)',
          type: 'table',
          headers: ["Word", "Why It Matters"],
          rows: [
            ["NOT, EXCEPT", "Reverses what you're looking for"],
            ["MOST, LEAST", "Requires comparison, not absolute"],
            ["ALWAYS, NEVER", "Absolute statements (usually wrong)"],
            ["PRIMARY, MAIN", "Best answer, not just correct"],
            ["FIRST, LAST", "Order matters"]
          ]
        },
        {
          title: 'Example: Missing Key Words',
          type: 'example',
          content: "Question: Which is NOT a characteristic of internal control?\n\nCandidate reads: 'Which is a characteristic...'\nChooses: 'Segregation of duties' (IS a characteristic)\nResult: WRONG\n\nThe word 'NOT' changes everything!\n\nFix: Underline/circle negative words mentally.\nRead them as: 'Which is NOT...' (emphasis)."
        },
        {
          title: 'For Calculation Questions',
          type: 'list',
          items: [
            "Read the stem completely before calculating",
            "Note ALL given numbers (some are distractors)",
            "Identify exactly what's being asked",
            "Set up the calculation before punching numbers",
            "Check units (thousands? percentages?)"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Stem first for most questions\n• Form your answer before looking at options\n• Watch for NOT, EXCEPT, MOST, LEAST\n• Absolute words (always/never) are usually wrong\n• For calculations, read everything before computing\n• Slow down to speed up—careful reading saves time"
        }
      ]
    }
  },
  {
    id: 'PREP-008',
    section: 'PREP',
    title: "Process of Elimination (POE)",
    description: "Turn 'I don't know' into 'I can figure this out' by eliminating wrong answers",
    order: 8,
    duration: 35,
    difficulty: 'intermediate',
    topics: ["Strategy", "MCQ", "POE"],
    content: {
      sections: [
        {
          title: 'You Don\'t Need to Know the Answer',
          type: 'callout',
          calloutType: 'important',
          content: "Here's a secret: You don't need to KNOW the right answer—you need to FIND it. Process of Elimination (POE) turns a 25% guess into a 50%+ educated choice. Master POE and you'll pass questions you 'don't know.'"
        },
        {
          title: 'The Math of POE',
          type: 'table',
          headers: ["Options Eliminated", "Remaining", "Probability"],
          rows: [
            ["0", "4", "25%"],
            ["1", "3", "33%"],
            ["2", "2", "50%"],
            ["3", "1", "100%"]
          ]
        },
        {
          title: 'POE Strategy',
          type: 'list',
          items: [
            "Read all four options before choosing",
            "Eliminate obviously wrong answers first",
            "Look for 'too extreme' options (always, never, all)",
            "Identify answers outside the topic",
            "Between remaining, look for nuances"
          ]
        },
        {
          title: 'Common Elimination Triggers',
          type: 'table',
          headers: ["Red Flag", "Why Often Wrong"],
          rows: [
            ["Always, never, all, none", "Absolutes rarely true in accounting"],
            ["Opposite of another option", "Usually one is right, other wrong"],
            ["Off-topic answer", "Doesn't address the question"],
            ["Too simple/obvious", "May be a trap (but not always)"],
            ["Contradicts basic principles", "Violates fundamental rules"]
          ]
        },
        {
          title: 'Example: POE in Action',
          type: 'example',
          content: "Q: Which depreciation method results in highest expense in Year 1?\n\nA) Straight-line — ELIMINATE (lowest in early years)\nB) Double-declining balance — Keep (accelerated)\nC) Units of production — Keep (depends on usage)\nD) Sum-of-years digits — Keep (accelerated)\n\nNow compare B, C, D...\n\nC depends on usage—not ALWAYS highest\nB and D are accelerated methods...\nDDB is typically MORE accelerated than SYD\n\nAnswer: B (Double-declining balance)"
        },
        {
          title: 'When Two Options Look Right',
          type: 'list',
          items: [
            "Re-read the question—what EXACTLY is asked?",
            "Look for the 'most' correct vs 'also correct'",
            "Check if one is more specific/complete",
            "Consider scope: Is one too broad/narrow?",
            "Trust your first instinct if truly stuck"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• POE increases odds even when you don't know the answer\n• Eliminating 2 options = 50% success rate\n• Watch for absolutes (always/never)\u2014usually wrong\n• Opposite options: One is likely right\n• When stuck between two, re-read the question\n• Practice POE systematically during study"
        }
      ]
    }
  },
  {
    id: 'PREP-009',
    section: 'PREP',
    title: "Recognizing Distractor Patterns",
    description: "Learn how test writers craft wrong answers and avoid their traps",
    order: 9,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Strategy", "MCQ", "Distractors"],
    content: {
      sections: [
        {
          title: 'Know Your Enemy',
          type: 'callout',
          calloutType: 'important',
          content: "Wrong answers aren't random—they're carefully designed to trap candidates who know some, but not all, of the material. Understanding distractor patterns helps you spot and avoid traps."
        },
        {
          title: 'Common Distractor Types',
          type: 'table',
          headers: ["Type", "What It Does", "How to Spot"],
          rows: [
            ["Partial Truth", "True statement but doesn't answer question", "Re-read: Does it answer what's asked?"],
            ["Calculation Trap", "Right method, wrong step", "Check your work; verify each step"],
            ["Reversed Logic", "Opposite of correct answer", "DR vs CR, increase vs decrease"],
            ["Similar Concept", "Related topic, wrong application", "Verify the specific rule applies"],
            ["Scope Error", "Right answer to different question", "Match answer to actual question"]
          ]
        },
        {
          title: 'Example: Calculation Trap',
          type: 'example',
          content: "Q: Company bought equipment for $100,000, salvage $10,000, 5-year life.\nYear 2 depreciation using DDB?\n\nCommon distractors:\nA) $40,000 — Year 1 DDB (forgot it's Year 2!)\nB) $18,000 — Straight-line ($90k/5)\nC) $24,000 — Correct Year 2 DDB\nD) $36,000 — DDB on original cost (forgot Year 1)\n\nThree wrong answers catch common mistakes!\nAlways verify you're answering the RIGHT year/period."
        },
        {
          title: 'The "Almost Right" Trap',
          type: 'text',
          content: "The most dangerous distractors are 90% correct. They might state a true principle but apply it to the wrong situation, or get 3 of 4 elements right. Always verify EVERY element of your answer matches the question."
        },
        {
          title: 'Numeric Distractors',
          type: 'list',
          items: [
            "Transposed numbers: $45,000 vs $54,000",
            "Missing a step: Forgot to add back, subtract, or adjust",
            "Wrong formula: Used similar but incorrect calculation",
            "Sign error: Debit vs credit, gain vs loss",
            "Units: Answer in thousands when question asks actual"
          ]
        },
        {
          title: 'Conceptual Traps',
          type: 'list',
          items: [
            "Exception to the rule (but rule applies here)",
            "Rule stated correctly but situation is the exception",
            "Confusing similar standards (GAAP vs IFRS)",
            "Right answer for old law (watch tax law changes!)",
            "Technically true but not the BEST answer"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Wrong answers are designed to trap common errors\n• 'Partial truth' is most common—must answer the actual question\n• Calculation distractors use wrong steps/years/methods\n• Verify EVERY element of your answer\n• Watch for reversed logic (DR/CR, increase/decrease)\n• When unsure, ask: 'Does this answer THIS question?'"
        }
      ]
    }
  },
  {
    id: 'PREP-010',
    section: 'PREP',
    title: "Calculation MCQs: Set Up First",
    description: "Avoid calculation traps by setting up the problem before computing",
    order: 10,
    duration: 35,
    difficulty: 'intermediate',
    topics: ["Strategy", "MCQ", "Calculations"],
    content: {
      sections: [
        {
          title: 'Set Up Before You Calculate',
          type: 'callout',
          calloutType: 'important',
          content: "The biggest calculation mistakes happen when candidates start computing before understanding what's asked. Take 30 seconds to set up the problem structure—it saves time and errors."
        },
        {
          title: 'The 5-Step Calculation Method',
          type: 'list',
          items: [
            "1. What's asked? (Net income? EPS? Taxable income?)",
            "2. What formula? (Write it out or visualize)",
            "3. What's given? (List relevant numbers)",
            "4. What adjustments? (Add-backs, deductions, timing)",
            "5. Calculate and verify (check reasonableness)"
          ]
        },
        {
          title: 'Example: Setting Up',
          type: 'example',
          content: "Q: ABC Corp reported $500,000 pretax income. Included were:\n• Municipal bond interest: $20,000\n• Depreciation: Book $50,000, Tax $80,000\n• Warranty expense: Book $30,000, Cash paid $10,000\n\nWhat is current tax expense? (21% rate)\n\nSET UP FIRST:\n1. Asked: Current tax expense (not total, not deferred)\n2. Formula: Taxable income × Rate\n3. Start: $500,000 pretax book income\n4. Adjustments to get TAXABLE income:\n   • Muni interest: -$20,000 (tax-exempt)\n   • Depreciation: -$30,000 (tax > book)\n   • Warranty: +$20,000 (expense > cash)\n5. Taxable: $470,000 × 21% = $98,700"
        },
        {
          title: 'Common Calculation Traps',
          type: 'table',
          headers: ["Trap", "How to Avoid"],
          rows: [
            ["Using wrong year", "Circle the year asked"],
            ["Book vs Tax confusion", "Label which basis"],
            ["Forgetting an adjustment", "List ALL given info first"],
            ["Direction error (+/-)", "Think: Does this INCREASE or DECREASE?"],
            ["Units mismatch", "Check: thousands? actual? percentages?"]
          ]
        },
        {
          title: 'Reasonableness Check',
          type: 'text',
          content: "After calculating, ask: Does this make sense? If the answer seems wildly different from the given numbers, you may have made an error. A $10 million company probably doesn't have $500 million in depreciation!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• 30 seconds setting up saves minutes and errors\n• Identify: What's asked, what formula, what's given\n• List all adjustments before calculating\n• Check direction: increase or decrease?\n• Verify reasonableness of final answer\n• Watch units: thousands vs actual"
        }
      ]
    }
  },
  {
    id: 'PREP-011',
    section: 'PREP',
    title: 'The "I Have No Idea" Protocol',
    description: "What to do when you're completely stumped on an MCQ",
    order: 11,
    duration: 25,
    difficulty: 'intermediate',
    topics: ["Strategy", "Guessing", "MCQ"],
    content: {
      sections: [
        {
          title: 'It Will Happen',
          type: 'callout',
          calloutType: 'important',
          content: "Every candidate hits questions where they have NO IDEA. This is normal—some may be pretest questions on topics you haven't seen. Having a protocol prevents panic and maximizes your guessing success rate."
        },
        {
          title: 'The Protocol',
          type: 'list',
          items: [
            "1. DON'T PANIC. Take a breath. This is expected.",
            "2. Read the question again slowly. Sometimes clarity emerges.",
            "3. Apply POE. Eliminate what you CAN.",
            "4. Look for patterns in remaining answers.",
            "5. Make educated guess using strategies below.",
            "6. Mark for review if time permits.",
            "7. MOVE ON. Don't spend more than 90 seconds total."
          ]
        },
        {
          title: 'Strategic Guessing Tips',
          type: 'table',
          headers: ["Strategy", "When to Use"],
          rows: [
            ["Middle values", "Calculation questions with numeric options"],
            ["Longest answer", "When one option has most detail"],
            ["Avoid absolutes", "Options with 'always/never' usually wrong"],
            ["Opposite options", "If two are opposites, one is likely right"],
            ["Gut feeling", "When all else fails, first instinct"]
          ]
        },
        {
          title: 'The Middle Value Strategy',
          type: 'example',
          content: "Numeric options: A) $10,000  B) $25,000  C) $35,000  D) $50,000\n\nNo idea? Choose B or C (middle values).\n\nWhy? Test writers often put the correct answer in the middle, with high/low distractors based on common errors. This isn't foolproof, but it beats random guessing."
        },
        {
          title: 'Why You Should ALWAYS Answer',
          type: 'text',
          content: "There is NO PENALTY for wrong answers. Blank = 0% chance. Random guess = 25% chance. Strategic guess = 33-50% chance. ALWAYS answer every question, even if pure guess."
        },
        {
          title: 'Mark for Review Strategy',
          type: 'list',
          items: [
            "Mark the question AND enter an answer",
            "If time permits, return after finishing testlet",
            "Don't change unless you have clear reason",
            "Most first instincts are correct",
            "If testlet ends, your answer counts (not blank)"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• 'No idea' questions are normal—don't panic\n• Always answer (no penalty for wrong)\n• Apply POE first, then strategic guessing\n• Middle values for calculations\n• Avoid absolutes (always/never)\n• Mark, answer, and move on—90 seconds max"
        }
      ]
    }
  },
  {
    id: 'PREP-012',
    section: 'PREP',
    title: "TBS Overview: Types & Weighting",
    description: "Understand Task-Based Simulations and their heavy weight in your score",
    order: 12,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Strategy", "TBS", "Simulations"],
    content: {
      sections: [
        {
          title: 'TBS: Where Exams Are Won or Lost',
          type: 'callout',
          calloutType: 'important',
          content: "Task-Based Simulations (TBS) count for 50% of your score on Core sections and 40-50% on Discipline sections. Many candidates pass MCQs but fail TBS. Mastering simulations is essential to passing."
        },
        {
          title: 'TBS Weighting by Section',
          type: 'table',
          headers: ["Section", "MCQ Weight", "TBS Weight", "# of TBS"],
          rows: [
            ["FAR", "50%", "50%", "7 TBS"],
            ["AUD", "50%", "50%", "7 TBS"],
            ["REG", "50%", "50%", "7 TBS"],
            ["BAR", "50%", "50%", "7 TBS"],
            ["ISC", "60%", "40%", "6 TBS"],
            ["TCP", "50%", "50%", "7 TBS"]
          ]
        },
        {
          title: 'Types of TBS',
          type: 'list',
          items: [
            "Research: Find authoritative guidance in database",
            "Document Review: Analyze documents, extract data",
            "Journal Entries: Create/correct accounting entries",
            "Calculations: Multi-step computations with exhibits",
            "Form Completion: Tax forms, reconciliations",
            "Analysis: Evaluate situations, make recommendations"
          ]
        },
        {
          title: 'TBS Format Components',
          type: 'table',
          headers: ["Component", "Description"],
          rows: [
            ["Scenario", "Background information, situation"],
            ["Exhibits", "Supporting documents, data, forms"],
            ["Tabs", "Multiple sections to navigate"],
            ["Resources", "Authoritative literature, spreadsheets"],
            ["Response Area", "Where you enter answers"]
          ]
        },
        {
          title: 'TBS vs MCQ Skills',
          type: 'text',
          content: "TBS require APPLICATION of knowledge, not just recall. You must read exhibits, synthesize information, and perform multi-step tasks. Strong MCQ performance doesn't guarantee TBS success—different skills, different practice needed."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• TBS = 50%+ of your score—cannot be ignored\n• Types: Research, Document Review, Journal Entry, Calculations\n• Requires application, not just recall\n• Multiple exhibits and tabs to navigate\n• One pretest TBS per testlet (unscored)\n• Practice TBS separately from MCQs"
        }
      ]
    }
  },
  {
    id: 'PREP-013',
    section: 'PREP',
    title: "TBS Time Management: 15-Minute Rule",
    description: "Budget your simulation time to maximize points across all TBS",
    order: 13,
    duration: 35,
    difficulty: 'intermediate',
    topics: ["Strategy", "TBS", "Time Management"],
    content: {
      sections: [
        {
          title: 'Time Kills on TBS',
          type: 'callout',
          calloutType: 'important',
          content: "The #1 TBS mistake: Spending too much time on early simulations and rushing (or missing) later ones. Each TBS is worth similar points. The 15-minute rule keeps you on track."
        },
        {
          title: 'The 15-Minute Rule',
          type: 'text',
          content: "Allocate approximately 15 minutes per TBS. Some simpler ones take 10 minutes, some complex ones need 20, but 15 is your baseline. If you hit 15 minutes and aren't close to done, make strategic choices."
        },
        {
          title: 'Time Budget by Section',
          type: 'table',
          headers: ["Section", "TBS Count", "TBS Time", "Per TBS Avg"],
          rows: [
            ["FAR", "7", "~105 min", "15 min"],
            ["AUD", "7", "~105 min", "15 min"],
            ["REG", "7", "~105 min", "15 min"],
            ["BAR", "7", "~105 min", "15 min"],
            ["ISC", "6", "~90 min", "15 min"],
            ["TCP", "7", "~105 min", "15 min"]
          ]
        },
        {
          title: 'TBS Triage Strategy',
          type: 'list',
          items: [
            "Scan ALL TBS first (2-3 min total)",
            "Identify the Research TBS (do early for guaranteed points)",
            "Identify easiest/shortest TBS (quick wins)",
            "Leave most complex for later (with fresh time budget)",
            "NEVER skip a TBS entirely—partial credit exists"
          ]
        },
        {
          title: 'At the 15-Minute Mark',
          type: 'list',
          items: [
            "Near done? Finish it (2-3 more minutes OK)",
            "Halfway done? Complete what you can, move on",
            "Stuck early? Cut losses, enter best guesses, move on",
            "The next TBS might be easier and worth the same points"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• 15 minutes per TBS baseline\n• Scan all TBS first to identify quick wins\n• Do Research TBS early (guaranteed points)\n• At 15 min: assess and decide whether to continue\n• Partial credit > rushing through remaining TBS\n• NEVER leave a TBS blank—enter something"
        }
      ]
    }
  },
  {
    id: 'PREP-014',
    section: 'PREP',
    title: "Research TBS: Guaranteed Points",
    description: "Master the research simulation for nearly free points on exam day",
    order: 14,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Strategy", "TBS", "Research"],
    content: {
      sections: [
        {
          title: 'The Easiest Points on the Exam',
          type: 'callout',
          calloutType: 'important',
          content: "Research TBS are the closest thing to 'free points' on the CPA exam. You don't need to memorize—just find the right citation in the authoritative literature. With practice, these take 5-8 minutes and are nearly 100% accurate."
        },
        {
          title: 'Research Databases by Section',
          type: 'table',
          headers: ["Section", "Primary Database", "Format"],
          rows: [
            ["FAR", "FASB Codification", "ASC XXX-XX-XX-X"],
            ["AUD", "AICPA Standards", "AU-C/AT-C/AR-C Section XXX.XX"],
            ["REG", "IRC/Treasury Regs", "IRC Sec. XXX(x)(X)"],
            ["BAR", "Various standards", "Depends on topic"],
            ["ISC", "IT frameworks/AICPA", "Depends on topic"],
            ["TCP", "IRC/Treasury Regs", "IRC Sec. XXX(x)(X)"]
          ]
        },
        {
          title: 'Search Strategy',
          type: 'list',
          items: [
            "Identify key terms in the question",
            "Search using 2-3 specific keywords",
            "Too many results? Add more specific terms",
            "No results? Try synonyms or broader terms",
            "Use Table of Contents if keyword search fails",
            "Read the section to confirm it addresses the issue"
          ]
        },
        {
          title: 'Example: FAR Research',
          type: 'example',
          content: "Q: Where is guidance on accounting for stock compensation?\n\nSearch: 'stock compensation'\nResults: ASC 718\n\nNavigate to ASC 718-10-25 for recognition\n\nAnswer: ASC 718-10-25-1 (or similar specific paragraph)\n\nTip: The paragraph number matters! Read to find the MOST RELEVANT section."
        },
        {
          title: 'Common Mistakes',
          type: 'list',
          items: [
            "Too broad citation (Topic only, not section/paragraph)",
            "Wrong paragraph (right area, wrong specific guidance)",
            "Skipping verification (assuming first result is right)",
            "Spending too long (5-10 minutes max)",
            "Not practicing (unfamiliar with database navigation)"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Research TBS = easiest points (no memorization needed)\n• Practice with actual database interfaces\n• Use specific keywords, narrow down results\n• Verify by reading the section\n• Cite specific paragraph, not just topic\n• Do Research TBS EARLY in your TBS time"
        }
      ]
    }
  },
  {
    id: 'PREP-015',
    section: 'PREP',
    title: "Document Review TBS",
    description: "Master the art of extracting data from complex exhibit packages",
    order: 15,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Strategy", "TBS", "Document Review"],
    content: {
      sections: [
        {
          title: 'Real-World Simulations',
          type: 'callout',
          calloutType: 'important',
          content: "Document Review TBS mirror real CPA work: You receive a package of documents (contracts, emails, reports, financial data) and must extract relevant information to answer questions."
        },
        {
          title: 'Common Document Types',
          type: 'table',
          headers: ["Document Type", "What to Look For"],
          rows: [
            ["Contracts/Leases", "Terms, dates, amounts, conditions"],
            ["Emails/Memos", "Key facts, decisions, issues raised"],
            ["Financial Statements", "Balances, changes, unusual items"],
            ["Trial Balances", "Account balances, classifications"],
            ["Invoices/Receipts", "Dates, amounts, descriptions"],
            ["Meeting Minutes", "Decisions, authorizations, disclosures"]
          ]
        },
        {
          title: 'Document Review Strategy',
          type: 'list',
          items: [
            "1. Read the QUESTION first (know what you're looking for)",
            "2. Scan exhibit tabs to understand what's available",
            "3. Read documents strategically (not word-for-word)",
            "4. Highlight/note key facts mentally",
            "5. Cross-reference between documents",
            "6. Verify answers against exhibit evidence"
          ]
        },
        {
          title: 'Example: Lease Document Review',
          type: 'example',
          content: "Question: Determine lease classification.\n\nExhibits: Lease agreement, Equipment appraisal, Payment schedule\n\nStrategy:\n1. Question asks: Operating vs Finance lease\n2. Need: Lease term, useful life, PV of payments, fair value\n3. Lease agreement: 5-year term, monthly payments\n4. Appraisal: 8-year useful life, $100,000 FV\n5. Payment schedule: $1,500/month\n6. Calculate PV, compare to FV, assess term vs life"
        },
        {
          title: 'Common Traps',
          type: 'list',
          items: [
            "Irrelevant data: Some exhibit info is distractor",
            "Contradictory info: Documents may conflict (trust primary source)",
            "Hidden details: Key facts in footnotes or fine print",
            "Date sensitivity: Watch for cutoff issues"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Read question FIRST to know what you need\n• Scan all exhibits before deep reading\n• Read strategically—don't read every word\n• Cross-reference documents for conflicts\n• Watch for hidden details in footnotes\n• Some exhibit info is intentionally irrelevant"
        }
      ]
    }
  },
  {
    id: 'PREP-016',
    section: 'PREP',
    title: "Journal Entry TBS",
    description: "Approach journal entry simulations with confidence and precision",
    order: 16,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Strategy", "TBS", "Journal Entries"],
    content: {
      sections: [
        {
          title: 'Back to Basics',
          type: 'callout',
          calloutType: 'important',
          content: "Journal Entry TBS test the fundamental skill of accounting: recording transactions. Despite being 'basic,' these simulations trip up many candidates. Success requires systematic thinking and attention to detail."
        },
        {
          title: 'Journal Entry TBS Types',
          type: 'table',
          headers: ["Type", "Description"],
          rows: [
            ["Record Transactions", "Create entries from scratch"],
            ["Correcting Entries", "Fix errors in existing entries"],
            ["Adjusting Entries", "Period-end adjustments"],
            ["Closing Entries", "Year-end close procedures"],
            ["Consolidation Entries", "Elimination/consolidating entries"]
          ]
        },
        {
          title: 'The DEAD CLIC Method',
          type: 'list',
          items: [
            "D - Dividends (Debit to close)",
            "E - Expenses (Debit to increase)",
            "A - Assets (Debit to increase)",
            "D - Draws (Debit to increase)",
            "C - Capital/Equity (Credit to increase)",
            "L - Liabilities (Credit to increase)",
            "I - Income/Revenue (Credit to increase)",
            "C - Contra accounts (Opposite of main)"
          ]
        },
        {
          title: 'Journal Entry Strategy',
          type: 'list',
          items: [
            "1. Read the scenario completely",
            "2. Identify all accounts affected",
            "3. Determine direction (increase/decrease)",
            "4. Apply normal balance rules (DEAD CLIC)",
            "5. Calculate amounts carefully",
            "6. Verify debits = credits",
            "7. Check account names match dropdown options"
          ]
        },
        {
          title: 'Example: Correcting Entry',
          type: 'example',
          content: "Situation: Company recorded equipment purchase as expense.\nOriginal entry: DR Repairs Expense $50,000; CR Cash $50,000\n\nCorrection needed:\n1. Reverse the wrong part: CR Repairs Expense $50,000\n2. Record correctly: DR Equipment $50,000\n\nCorrecting Entry:\nDR Equipment        $50,000\n    CR Repairs Expense    $50,000\n\n(No need to touch Cash—that part was correct)"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Journal entries = fundamental accounting skill\n• Use DEAD CLIC to remember normal balances\n• Always verify debits = credits\n• For corrections, reverse wrong part only\n• Match account names to dropdown options exactly\n• Show all compound entry elements"
        }
      ]
    }
  },
  {
    id: 'PREP-017',
    section: 'PREP',
    title: "Spreadsheet TBS: Excel for CPAs",
    description: "Leverage spreadsheet tools in TBS for faster, accurate calculations",
    order: 17,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Strategy", "TBS", "Spreadsheet"],
    content: {
      sections: [
        {
          title: 'Built-In Advantage',
          type: 'callout',
          calloutType: 'important',
          content: "Many TBS include a spreadsheet tool (like Excel). This isn't just for your scratch work—it's a powerful tool to speed calculations and reduce errors. Knowing basic spreadsheet functions can save significant time."
        },
        {
          title: 'Available Functions',
          type: 'table',
          headers: ["Function", "Use Case", "Syntax"],
          rows: [
            ["SUM", "Add values", "=SUM(A1:A10)"],
            ["AVERAGE", "Calculate mean", "=AVERAGE(A1:A10)"],
            ["IF", "Conditional logic", "=IF(A1>100,\"Yes\",\"No\")"],
            ["PV", "Present value", "=PV(rate,nper,pmt)"],
            ["FV", "Future value", "=FV(rate,nper,pmt)"],
            ["PMT", "Payment amount", "=PMT(rate,nper,pv)"],
            ["ABS", "Absolute value", "=ABS(A1)"]
          ]
        },
        {
          title: 'When to Use Spreadsheets',
          type: 'list',
          items: [
            "Multiple calculations with similar structure",
            "Present/future value problems",
            "Amortization schedules",
            "Depreciation calculations over multiple years",
            "Comparative analysis (ratios, percentages)",
            "Any calculation you might make an arithmetic error on"
          ]
        },
        {
          title: 'Example: Lease PV Calculation',
          type: 'example',
          content: "Given: 5-year lease, $10,000 annual payment, 6% rate\nFind: Present value of lease payments\n\nSpreadsheet approach:\nCell A1: Rate = 0.06\nCell A2: Periods = 5\nCell A3: Payment = 10000\nCell A4: =PV(A1,A2,-A3) = $42,124\n\nFaster and more accurate than manual calculation!\n\nNote: Payment is negative in PV formula for correct sign."
        },
        {
          title: 'Best Practices',
          type: 'list',
          items: [
            "Label your cells (helps you stay organized)",
            "Put inputs in separate cells (easy to change)",
            "Double-check formula references",
            "Use absolute references ($A$1) when copying formulas",
            "Test with known values if unsure about syntax"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Spreadsheet tool is available in many TBS\n• Key functions: SUM, PV, FV, PMT, IF\n• Use for complex/repetitive calculations\n• Label inputs, keep formulas simple\n• Practice spreadsheet functions before exam\n• Saves time and reduces arithmetic errors"
        }
      ]
    }
  },
  {
    id: 'PREP-018',
    section: 'PREP',
    title: "Written Communication: What Graders Want",
    description: "Understand the rubric and maximize your WC scores",
    order: 18,
    duration: 40,
    difficulty: 'intermediate',
    topics: ["Strategy", "WC", "Written Communication"],
    content: {
      sections: [
        {
          title: 'WC Counts (On Some Sections)',
          type: 'callout',
          calloutType: 'important',
          content: "Written Communication (WC) tasks appear on FAR, AUD, and REG. They're graded on how well you communicate, not just accuracy. Even if your technical answer isn't perfect, strong writing can earn significant points."
        },
        {
          title: 'The Grading Rubric',
          type: 'table',
          headers: ["Criterion", "What Graders Assess"],
          rows: [
            ["Organization", "Logical structure, clear intro/body/conclusion"],
            ["Development", "Adequate detail, examples, explanations"],
            ["Expression", "Clear, professional language, proper grammar"],
            ["Technical Content", "Relevant, accurate application of concepts"]
          ]
        },
        {
          title: 'WC Structure Template',
          type: 'list',
          items: [
            "Opening: State the issue/purpose (1-2 sentences)",
            "Body: Address each point with explanation (3-5 paragraphs)",
            "Conclusion: Summarize recommendation/conclusion (1-2 sentences)",
            "Professional greeting and closing (memo/letter format)"
          ]
        },
        {
          title: 'Example Opening',
          type: 'example',
          content: "Dear [Client/Partner Name],\n\nPurpose: You have asked me to analyze the tax implications of [specific situation]. This memorandum addresses the treatment of [topic] under current tax law.\n\nOR\n\nRE: Analysis of Revenue Recognition for Contract XYZ\n\nThis memo provides guidance on the proper accounting treatment..."
        },
        {
          title: 'What Earns Points',
          type: 'list',
          items: [
            "Professional tone (you're writing to a client/supervisor)",
            "Organized paragraphs (one topic per paragraph)",
            "Complete sentences (no bullet points in final answer)",
            "Correct grammar and spelling (use spell check!)",
            "Logical flow from point to point",
            "Direct answer to the question asked"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• WC graded on communication quality, not just accuracy\n• Use intro/body/conclusion structure\n• Professional memo or letter format\n• One topic per paragraph\n• Complete sentences, proper grammar\n• Spell check before submitting"
        }
      ]
    }
  },
  {
    id: 'PREP-019',
    section: 'PREP',
    title: "IRAC Method for Tax Memos",
    description: "The proven legal/tax writing framework that graders love",
    order: 19,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Strategy", "WC", "Tax Memos"],
    content: {
      sections: [
        {
          title: 'IRAC: The Gold Standard',
          type: 'callout',
          calloutType: 'important',
          content: "IRAC (Issue, Rule, Analysis, Conclusion) is the standard framework for legal and tax writing. Using this structure ensures you address all elements graders look for and keeps your response organized."
        },
        {
          title: 'IRAC Components',
          type: 'table',
          headers: ["Component", "Purpose", "Example Start"],
          rows: [
            ["Issue", "State the question to be resolved", "The issue is whether..."],
            ["Rule", "State the applicable law/standard", "Under IRC Section..."],
            ["Analysis", "Apply rule to facts", "In this case..."],
            ["Conclusion", "Answer the question", "Therefore..."]
          ]
        },
        {
          title: 'Example: IRAC Tax Memo',
          type: 'example',
          content: "ISSUE: The issue is whether the $50,000 payment from ABC Corp to Mr. Smith constitutes compensation or a gift for tax purposes.\n\nRULE: Under IRC Section 102, gross income does not include the value of property acquired by gift. However, IRC Section 102(c) excludes from this treatment any amount transferred by an employer to an employee. The determination depends on the intent of the transferor.\n\nANALYSIS: In this case, Mr. Smith received the payment while employed by ABC Corp. The payment was designated as a 'retirement bonus.' Although ABC characterized it as a gift, the Supreme Court in Commissioner v. Duberstein established that the critical consideration is whether the payment was made from 'detached and disinterested generosity.'\n\nCONCLUSION: Therefore, the $50,000 payment should be treated as compensation and included in Mr. Smith's gross income."
        },
        {
          title: 'IRAC Tips',
          type: 'list',
          items: [
            "State the issue as a question or 'whether' statement",
            "Cite specific code sections/standards in the Rule",
            "Analysis should connect facts to the rule",
            "Conclusion should directly answer the issue",
            "Don't introduce new information in Conclusion"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• IRAC = Issue, Rule, Analysis, Conclusion\n• Standard framework for tax/legal writing\n• Issue: State the question\n• Rule: Cite applicable law\n• Analysis: Apply rule to facts\n• Conclusion: Answer the question directly"
        }
      ]
    }
  },
  {
    id: 'PREP-020',
    section: 'PREP',
    title: "Common WC Mistakes",
    description: "Avoid these errors that cost candidates easy points",
    order: 20,
    duration: 30,
    difficulty: 'intermediate',
    topics: ["Strategy", "WC", "Mistakes"],
    content: {
      sections: [
        {
          title: 'Easy Points Lost',
          type: 'callout',
          calloutType: 'important',
          content: "Written Communication is one of the easiest places to earn points—and lose them. These common mistakes cost candidates more than any technical errors. Avoid them and you're ahead of most test-takers."
        },
        {
          title: 'Top WC Mistakes',
          type: 'table',
          headers: ["Mistake", "Impact", "Fix"],
          rows: [
            ["Bullet points only", "Loses organization points", "Write complete sentences/paragraphs"],
            ["No structure", "Loses organization points", "Use intro/body/conclusion"],
            ["Casual tone", "Loses expression points", "Professional language"],
            ["Spelling errors", "Loses expression points", "Use spell check"],
            ["Not answering the question", "Loses all categories", "Re-read prompt, address it directly"],
            ["Too short", "Loses development points", "Aim for 150-300 words"]
          ]
        },
        {
          title: 'Bullet Point Trap',
          type: 'text',
          content: "Many candidates outline their answer in bullets and run out of time to convert to paragraphs. The grading rubric specifically looks for organized paragraphs. If you must start with bullets, LEAVE TIME to convert them."
        },
        {
          title: 'Tone Problems',
          type: 'example',
          content: "TOO CASUAL:\n'So basically the client can't deduct this because the IRS says no.'\n\nPROFESSIONAL:\n'Based on the applicable tax regulations, the deduction would not be allowable under IRC Section 162. Therefore, we recommend that the client not claim this expense on the return.'"
        },
        {
          title: 'Quick WC Checklist',
          type: 'list',
          items: [
            "☐ Did I answer the actual question asked?",
            "☐ Do I have intro, body, conclusion?",
            "☐ Are all sentences complete (not bullets)?",
            "☐ Is my tone professional?",
            "☐ Did I run spell check?",
            "☐ Is it long enough (150+ words)?"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• No bullet points—write paragraphs\n• Always use intro/body/conclusion\n• Professional tone (not casual)\n• Run spell check (always!)\n• Answer the specific question asked\n• Aim for 150-300 words minimum"
        }
      ]
    }
  },
  {
    id: 'PREP-021',
    section: 'PREP',
    title: "Building Your Study Schedule",
    description: "Create a realistic, effective study plan for all four sections",
    order: 21,
    duration: 50,
    difficulty: 'beginner',
    topics: ["Strategy", "Planning", "Schedule"],
    content: {
      sections: [
        {
          title: 'Plan to Win',
          type: 'callout',
          calloutType: 'important',
          content: "Candidates who create and follow a study schedule pass at significantly higher rates. Random studying leads to gaps in knowledge and wasted time. A structured plan ensures you cover everything and peak at the right time."
        },
        {
          title: 'Recommended Study Hours',
          type: 'table',
          headers: ["Section", "Study Hours", "Typical Timeline"],
          rows: [
            ["FAR", "120-150", "8-12 weeks"],
            ["AUD", "80-100", "6-8 weeks"],
            ["REG", "100-120", "8-10 weeks"],
            ["Discipline (BAR/ISC/TCP)", "80-100", "6-8 weeks"]
          ]
        },
        {
          title: 'Study Schedule Framework',
          type: 'list',
          items: [
            "Week 1-2: Foundation (30% of content)",
            "Week 3-5: Core learning (50% of content)",
            "Week 6-7: Final content (20% of content)",
            "Week 8: Comprehensive review",
            "Final 3-5 days: Final review, practice exams"
          ]
        },
        {
          title: 'Daily Study Structure',
          type: 'table',
          headers: ["Time", "Activity", "Purpose"],
          rows: [
            ["First 15 min", "Review yesterday's weak areas", "Reinforce learning"],
            ["Main block", "New content + practice", "Core learning"],
            ["Last 15 min", "Quick quiz on new material", "Test understanding"],
            ["Throughout", "70% practice, 30% reading", "Active learning"]
          ]
        },
        {
          title: 'Weekly Check-ins',
          type: 'text',
          content: "Every weekend, assess: Did I hit my targets? What topics need more work? Adjust your plan accordingly. Falling behind early compounds—catch up immediately, don't push it to 'later.'"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Total: 350-450 hours across all sections\n• Plan 6-12 weeks per section\n• 70% practice, 30% learning\n• Build in review time weekly\n• Final week = comprehensive review only\n• Adjust plan weekly based on progress"
        }
      ]
    }
  },
  {
    id: 'PREP-022',
    section: 'PREP',
    title: "Active vs Passive Studying",
    description: "Why practice beats reading and how to study effectively",
    order: 22,
    duration: 35,
    difficulty: 'beginner',
    topics: ["Strategy", "Habits", "Learning"],
    content: {
      sections: [
        {
          title: 'The 70/30 Rule',
          type: 'callout',
          calloutType: 'important',
          content: "The most effective CPA study ratio is 70% active practice, 30% passive learning. Most candidates do the opposite—they read and watch lectures but don't practice enough. Practice is where learning becomes retention."
        },
        {
          title: 'Active vs Passive',
          type: 'table',
          headers: ["Passive (30%)", "Active (70%)"],
          rows: [
            ["Reading textbook", "Doing MCQs"],
            ["Watching lectures", "Working TBS"],
            ["Highlighting notes", "Teaching concepts aloud"],
            ["Reviewing flashcards", "Creating flashcards"],
            ["Listening to audio", "Solving problems"]
          ]
        },
        {
          title: 'Why Active Learning Works',
          type: 'list',
          items: [
            "Retrieval practice strengthens memory",
            "Mistakes identify knowledge gaps immediately",
            "Simulates exam conditions",
            "Builds pattern recognition for question types",
            "Reveals what you THINK you know vs what you ACTUALLY know"
          ]
        },
        {
          title: 'The Illusion of Learning',
          type: 'text',
          content: "Reading feels productive but creates 'familiarity' not 'knowledge.' You recognize a concept when you see it, but can't recall it on the exam. Only active practice creates true recall ability."
        },
        {
          title: 'Effective Study Session',
          type: 'example',
          content: "PASSIVE APPROACH (less effective):\n• Watch 2-hour lecture on leases\n• Read chapter on leases\n• Review notes\nTime: 3+ hours, Retention: Low\n\nACTIVE APPROACH (more effective):\n• Watch lecture (1.5x speed): 80 min\n• Do 20 MCQs on leases: 40 min\n• Review wrong answers: 20 min\n• Attempt 1 lease TBS: 20 min\nTime: 2.5 hours, Retention: High"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• 70% active (practice), 30% passive (reading/lectures)\n• Reading creates familiarity, not knowledge\n• Practice reveals actual knowledge level\n• Speed up lectures (1.5x), maximize practice\n• Review wrong answers thoroughly\n• If you're not struggling, you're not learning"
        }
      ]
    }
  },
  {
    id: 'PREP-023',
    section: 'PREP',
    title: "Final Review: Last 2 Weeks",
    description: "Maximize your score in the critical final stretch before exam day",
    order: 23,
    duration: 45,
    difficulty: 'advanced',
    topics: ["Strategy", "Review", "Final Prep"],
    content: {
      sections: [
        {
          title: 'The Home Stretch',
          type: 'callout',
          calloutType: 'important',
          content: "The final 2 weeks before your exam are critical. This isn't the time to learn new material—it's time to consolidate, review, and peak at the right moment. Your final review strategy can make or break your score."
        },
        {
          title: 'Final 2-Week Timeline',
          type: 'table',
          headers: ["Days Out", "Focus", "Activities"],
          rows: [
            ["14-10", "Weak area intensive", "Target lowest-scoring topics"],
            ["9-7", "Comprehensive review", "Full-length practice exams"],
            ["6-4", "TBS and simulations", "Timed TBS practice"],
            ["3-2", "High-yield review", "Key formulas, rules, concepts"],
            ["1", "Light review only", "Rest, confidence building"]
          ]
        },
        {
          title: 'Weak Area Strategy',
          type: 'list',
          items: [
            "Review your MCQ analytics—which topics are lowest?",
            "Focus 70% of time on bottom 3-5 topics",
            "Do targeted practice sets (20-30 MCQs per topic)",
            "Don't try to master everything—aim for 'competent'",
            "Diminishing returns: Stop when you plateau"
          ]
        },
        {
          title: 'Practice Exam Strategy',
          type: 'text',
          content: "Take 2-3 full practice exams under real conditions: Timed, no breaks except scheduled, no reference materials. Review results to identify patterns. Your practice exam score will likely be close to your real score."
        },
        {
          title: 'Day Before Exam',
          type: 'list',
          items: [
            "Light review only (1-2 hours max)",
            "Review high-yield summary sheets",
            "NO new material—it creates anxiety",
            "Confirm test center location and time",
            "Prepare ID, confirmation, snacks",
            "Get full night's sleep (8+ hours)"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Final 2 weeks = consolidation, not new learning\n• Focus 70% on weakest topics\n• Take 2-3 full practice exams\n• Last 3 days = high-yield review only\n• Day before = rest and preparation\n• Peak at the right time—don't burn out early"
        }
      ]
    }
  },
  {
    id: 'PREP-024',
    section: 'PREP',
    title: "Test Day Protocol",
    description: "Everything you need to know from morning routine to walking out",
    order: 24,
    duration: 40,
    difficulty: 'beginner',
    topics: ["Logistics", "Test Day"],
    content: {
      sections: [
        {
          title: 'Game Day',
          type: 'callout',
          calloutType: 'important',
          content: "Test day logistics matter more than most candidates realize. Arriving stressed, forgetting required items, or mismanaging your energy can cost points. Follow this protocol to arrive calm and ready to perform."
        },
        {
          title: 'What to Bring',
          type: 'table',
          headers: ["Required", "Recommended"],
          rows: [
            ["Two forms of valid ID", "Snacks (for breaks)"],
            ["NTS (Notice to Schedule)", "Water bottle"],
            ["Confirmation email", "Light jacket (rooms are cold)"],
            ["Nothing else allowed in room", "Earplugs (if sensitive to noise)"]
          ]
        },
        {
          title: 'Morning Routine',
          type: 'list',
          items: [
            "Wake up 3+ hours before exam",
            "Eat a normal breakfast (protein, not sugar)",
            "Light physical activity (walk, stretch)",
            "Review 1-page summary sheet (optional)",
            "Arrive at test center 30 min early",
            "Use restroom before check-in"
          ]
        },
        {
          title: 'At the Test Center',
          type: 'list',
          items: [
            "Check in with ID and confirmation",
            "Store belongings in locker (phone OFF)",
            "Read and sign agreements",
            "Photo and palm scan taken",
            "Escorted to your workstation",
            "Tutorial time doesn't count against exam time"
          ]
        },
        {
          title: 'During the Exam',
          type: 'table',
          headers: ["Phase", "Strategy"],
          rows: [
            ["First 5 min", "Calm down, read carefully, find rhythm"],
            ["MCQ testlets", "Pace yourself, mark and move"],
            ["Break", "Restroom, snack, stretch, deep breaths"],
            ["TBS testlets", "Scan all, prioritize, manage time"],
            ["Final 15 min", "Review marked items, enter all answers"]
          ]
        },
        {
          title: 'After the Exam',
          type: 'text',
          content: "You'll see a 'Testing Complete' screen but NOT your score. Scores are released on specific dates (usually 1-2 weeks for most windows). Don't obsess over questions you remember—it's done. Celebrate completing a section!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Two valid IDs + NTS required\n• Arrive 30 min early\n• Normal breakfast, no cramming morning of\n• Use breaks strategically\n• Scores released later (not immediate)\n• Celebrate completing each section!"
        }
      ]
    }
  },
  {
    id: 'PREP-025',
    section: 'PREP',
    title: "Managing Test Anxiety",
    description: "Mental strategies to stay calm and perform at your best",
    order: 25,
    duration: 40,
    difficulty: 'beginner',
    topics: ["Mental Game", "Anxiety", "Performance"],
    content: {
      sections: [
        {
          title: 'Anxiety Is Normal',
          type: 'callout',
          calloutType: 'important',
          content: "Every candidate experiences test anxiety—it's hardwired into humans. The goal isn't to eliminate anxiety (impossible), but to manage it so it doesn't hurt your performance. Managed well, some anxiety actually improves focus."
        },
        {
          title: 'Physical Symptoms & Solutions',
          type: 'table',
          headers: ["Symptom", "Quick Fix"],
          rows: [
            ["Racing heart", "Deep breaths: 4 sec in, 4 sec hold, 4 sec out"],
            ["Sweaty palms", "Wipe hands, focus on next question"],
            ["Mind blank", "Close eyes, breathe, re-read question slowly"],
            ["Nausea", "Sip water, focus on breathing"],
            ["Shaking hands", "Squeeze fists tight 5 sec, release, repeat"]
          ]
        },
        {
          title: 'Mental Reframes',
          type: 'list',
          items: [
            "'I'm nervous' → 'I'm excited and ready'",
            "'I don't know this' → 'I can figure this out'",
            "'I'm going to fail' → 'I'm prepared and capable'",
            "'This is hard' → 'This is supposed to be hard'",
            "'Everyone else is smarter' → 'Everyone feels this way'"
          ]
        },
        {
          title: 'The Box Breathing Technique',
          type: 'example',
          content: "When panic hits, use Box Breathing (used by Navy SEALs):\n\n1. Breathe IN for 4 seconds\n2. HOLD for 4 seconds\n3. Breathe OUT for 4 seconds\n4. HOLD for 4 seconds\n5. Repeat 4 times\n\nThis activates your parasympathetic nervous system and physically calms your body. Do this before the exam starts and during breaks."
        },
        {
          title: 'Panic Protocol',
          type: 'list',
          items: [
            "STOP: Recognize you're panicking",
            "BREATHE: 4 box breaths",
            "GROUND: Feel your feet on floor, hands on desk",
            "REFOCUS: Read the current question slowly",
            "CONTINUE: Answer this one question, then the next"
          ]
        },
        {
          title: 'Long-Term Anxiety Management',
          type: 'list',
          items: [
            "Practice under timed conditions regularly",
            "Simulate test environment during practice",
            "Visualize success (not failure)",
            "Exercise regularly during study period",
            "Maintain sleep schedule (anxiety worsens with fatigue)"
          ]
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Anxiety is normal—everyone experiences it\n• Box breathing calms physical symptoms\n• Reframe negative thoughts to positive\n• Practice under test conditions to reduce fear\n• If you panic: Stop, Breathe, Ground, Refocus\n• Sleep and exercise reduce baseline anxiety"
        }
      ]
    }
  }
];
