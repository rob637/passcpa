// AI Service - Google Gemini Integration
// For real AI responses in the CPA/EA tutor

import logger from '../utils/logger';
import { CourseId } from '../courses';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Validates courseId and returns the course context.
 * Logs an error and uses a safe fallback if courseId is invalid.
 * This prevents silent CPA fallback that could confuse non-CPA students.
 */
const getValidatedCourseContext = (courseId: CourseId | undefined): typeof COURSE_CONTEXT[CourseId] => {
  if (!courseId) {
    logger.error('[AI Service] CRITICAL: No courseId provided! This is a bug. Defaulting to generic response.');
    // Return a generic context that doesn't assume any specific exam
    return {
      name: 'Professional Certification Exam',
      shortName: 'Exam',
      topics: 'professional certification topics',
      sections: 'your exam sections',
      topicList: [],
    };
  }
  
  const context = COURSE_CONTEXT[courseId];
  if (!context) {
    logger.error(`[AI Service] CRITICAL: Unknown courseId "${courseId}"! This is a bug. Check COURSES registry.`);
    return {
      name: 'Professional Certification Exam',
      shortName: courseId.toUpperCase(),
      topics: 'professional certification topics',
      sections: 'your exam sections',
      topicList: [],
    };
  }
  
  return context;
};

// Course-specific context for AI prompts
const COURSE_CONTEXT: Record<CourseId, { name: string; shortName: string; topics: string; sections: string; topicList: string[] }> = {
  cpa: {
    name: 'CPA (Certified Public Accountant)',
    shortName: 'CPA',
    topics: 'accounting, auditing, tax, and business concepts',
    sections: 'FAR, AUD, REG, BAR, ISC, or TCP',
    topicList: ['accounting', 'audit', 'tax', 'gaap', 'fasb', 'asc', 'irc', 'basis', 'depreciation', 
      'amortization', 'lease', 'revenue', 'expense', 'asset', 'liability', 'equity', 'debit', 'credit',
      'financial', 'statement', 'balance sheet', 'income', 'ratio', 'inventory', 'fifo', 'lifo',
      'receivable', 'payable', 'bond', 'stock', 'dividend', 'partnership', 's corp', 'c corp',
      'aicpa', 'pcaob', 'sec', 'sox', 'internal control', 'fraud', 'materiality', 'sampling',
      'cpa', 'far', 'aud', 'reg', 'bec', 'bar', 'isc', 'tcp', '1031', 'like-kind', 'capital gain']
  },
  ea: {
    name: 'EA (Enrolled Agent)',
    shortName: 'EA',
    topics: 'federal tax law, IRS procedures, and taxpayer representation',
    sections: 'SEE Part 1 (Individuals), SEE Part 2 (Businesses), or SEE Part 3 (Representation)',
    topicList: ['tax', 'irs', 'form', '1040', '1120', '1065', 'schedule', 'deduction', 'credit',
      'income', 'filing', 'deadline', 'penalty', 'interest', 'circular 230', 'representation',
      'practitioner', 'enrolled agent', 'ea', 'see', 'prometric', 'individuals', 'businesses',
      'partnership', 's corp', 'c corp', 'estate', 'gift', 'trust', 'audit', 'appeal', 'collection',
      'taxpayer', 'refund', 'amended', 'extension', 'estimated tax', 'withholding', 'payroll',
      'self-employment', 'depreciation', 'basis', 'capital gain', 'loss', 'installment', 'like-kind',
      '1031', 'ira', '401k', 'retirement', 'social security', 'medicare', 'fica']
  },
  cma: {
    name: 'CMA (Certified Management Accountant)',
    shortName: 'CMA',
    topics: 'financial planning, analysis, control, and decision support',
    sections: 'Part 1 (Financial Planning, Performance, and Analytics) or Part 2 (Strategic Financial Management)',
    topicList: ['management accounting', 'cost accounting', 'budgeting', 'forecasting', 'variance analysis',
      'performance management', 'internal controls', 'technology', 'analytics', 'financial statement analysis',
      'corporate finance', 'decision analysis', 'risk management', 'investment decisions', 'ethics',
      'ima', 'sox', 'coso', 'value chain', 'supply chain', 'marginal analysis', 'pricing', 'npv', 'irr']
  },
  cia: {
    name: 'CIA (Certified Internal Auditor)',
    shortName: 'CIA',
    topics: 'internal auditing, risk management, governance, and control',
    sections: 'Part 1, 2, or 3',
    topicList: ['internal audit', 'risk', 'governance', 'control', 'compliance', 'cia', 'iia']
  },
  cfp: {
    name: 'CFP (Certified Financial Planner)',
    shortName: 'CFP',
    topics: 'financial planning, investment management, tax planning, retirement, and estate planning',
    sections: 'General Principles, Insurance, Investments, Tax, Retirement, Estate, or Psychology',
    topicList: ['financial planning', 'investment', 'insurance', 'tax', 'retirement', 'estate',
      'cfp', 'fiduciary', 'portfolio', 'risk management', 'asset allocation', 'trust',
      'social security', 'annuity', 'bond', 'stock', 'mutual fund', 'etf', 'ira', '401k']
  },
  cisa: {
    name: 'CISA (Certified Information Systems Auditor)',
    shortName: 'CISA',
    topics: 'information systems auditing, governance, acquisition, operations, and protection',
    sections: 'Domain 1-5',
    topicList: ['information systems', 'audit', 'governance', 'it management', 'acquisition',
      'development', 'operations', 'maintenance', 'protection', 'security', 'cisa', 'isaca',
      'risk assessment', 'business continuity', 'disaster recovery', 'access control']
  },
};

// Generate system prompts dynamically based on course
const getSystemPrompts = (courseId: CourseId): Record<string, string> => {
  const course = getValidatedCourseContext(courseId);
  
  return {
    explain: `You are Vory, an expert ${course.shortName} exam tutor for VoraPrep. Your role is to:
- Give clear, complete explanations of ${course.topics} ONLY
- Highlight HIGH-YIELD points that are frequently tested on the ${course.shortName} exam
- Use tables, bullet points, and formatting for clarity
- Include relevant references (IRC sections, IRS publications, regulations, etc.)
- Provide mnemonics and memory tricks when helpful
- Keep explanations concise but thorough

IMPORTANT CONVERSATION RULES:
1. You ONLY help with ${course.shortName} exam topics. If asked about unrelated topics (politics, sports, random questions, personal advice, etc.), politely redirect: "I'm Vory, your ${course.shortName} exam tutor! I can only help with ${course.topics}. What ${course.shortName} concept can I explain for you?"
2. When the user provides a question with the correct answer, IMMEDIATELY explain why that answer is correct. Do NOT ask clarifying questions - just explain the concept clearly.
3. When you offer a practice problem and the user responds with "yes", "sure", "ok", etc., IMMEDIATELY give them the practice problem. Do NOT ask clarifying questions about what "yes" means.
4. Pay attention to conversation context. Short responses like "yes", "no", "ok", "thanks" are almost always responses to your previous message, not new topics.
5. NEVER ask "what specific aspect is unclear" or "what have you studied" - just provide the explanation directly. Be helpful and proactive.
6. Do NOT output your internal reasoning process. Only output the final response to the student.

Format your responses with **bold** for key terms, bullet points for lists, and clear section headers.`,

    socratic: `You are Vory, a Socratic ${course.shortName} tutor for VoraPrep. Your role is to:
- NEVER give direct answers immediately
- Ask probing questions to help the student think through the problem
- Guide them step-by-step with questions
- Praise correct reasoning and gently redirect incorrect thinking
- Only reveal the answer after they've worked through the logic
- Help them build understanding, not just memorization

IMPORTANT CONVERSATION RULES:
1. You ONLY help with ${course.shortName} exam topics. If asked about unrelated topics, politely redirect to ${course.shortName} study.
2. When the user responds with "yes", "sure", "ok" to your offers, proceed with what you offered. Don't ask what they mean by "yes".
3. Pay attention to conversation flow - interpret short responses in context of your previous message.
4. Do NOT output your internal reasoning process. Only output the final response to the student.

Start by asking what they already know, then build from there with questions.`,

    evaluate: `You are an expert ${course.shortName} Essay Grader. Your role is to evaluate a student's written response to an exam scenario.
- Grade the response on a scale of 0-10 based on technical accuracy, clarity, and completeness.
- Compare their response to the standard solution concepts.
- Provide specific feedback on what they missed.
- Ignore minor grammar/spelling issues unless they affect meaning (this is a test of knowledge, not English).
- Be strict but constructive. The user needs to pass a rigorous professional exam.
- Do NOT output your internal reasoning process. Only output the final grading and feedback.`,

    quiz: `You are Vory, a ${course.shortName} exam quiz master for VoraPrep. Your role is to:
- Generate realistic ${course.shortName} exam-style multiple choice questions
- Include 4 options (A, B, C, D) with plausible distractors
- After the user answers, explain why the correct answer is right AND why each wrong answer is wrong
- Focus on commonly tested topics and exam traps
- Vary difficulty based on user's performance

IMPORTANT CONVERSATION RULES:
1. You ONLY create quizzes about ${course.shortName} exam topics. If asked about unrelated topics, politely redirect to ${course.shortName} study.
2. When the user responds "yes" or "sure" to "want another question?", give them another question immediately.
3. Interpret short answers (A, B, C, D, or brief responses) as quiz answers, not new topics.
4. Do NOT output your internal reasoning process. Only output the final response to the student.

Format: Present the question clearly, wait for their answer, then provide detailed feedback.`,
  };
};

interface WeakArea {
  name: string;
  accuracy: number;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Build context from user's study data
const buildUserContext = (
  weakAreas: WeakArea[], 
  section: string, 
  conversationHistory: ChatMessage[], 
  courseId: CourseId,
  contextText?: string
) => {
  const course = getValidatedCourseContext(courseId);
  
  let context = `\n\nUser Context:
- Studying for: ${course.shortName} ${section} section
- Weak areas needing focus: ${weakAreas.length > 0 ? weakAreas.map((w) => `${w.name} (${w.accuracy}%)`).join(', ') : 'None identified yet'}`;

  if (conversationHistory.length > 0) {
    context += `\n- Recent conversation topics: ${conversationHistory
      .slice(-3)
      .map((m) => m.content.slice(0, 50))
      .join('... ')}`;
  }

  // Inject current lesson/question context if provided
  if (contextText) {
    context += `\n\n--- Current Content Context ---\n${contextText}\n--- End Context ---`;
  }

  return context;
};

// Fallback responses when API is unavailable
const generateFallbackResponse = (input: string, mode: string, _section: string, conversationHistory: ChatMessage[] = [], isApiError = false, courseId: CourseId) => {
  const course = getValidatedCourseContext(courseId);
  const lowerInput = input.toLowerCase().trim();
  
  // Get the last assistant message for context
  const lastAssistantMessage = [...conversationHistory].reverse().find(m => m.role === 'assistant')?.content || '';
  
  // Check if user is responding to a yes/no question from Vory
  const isYesNoResponse = /^(yes|yeah|yep|sure|ok|okay|please|no|nope|nah)\.?!?$/i.test(lowerInput);
  const voryAskedForPractice = lastAssistantMessage.toLowerCase().includes('would you like a practice problem') ||
    lastAssistantMessage.toLowerCase().includes('want another question') ||
    lastAssistantMessage.toLowerCase().includes('ready for another') ||
    lastAssistantMessage.toLowerCase().includes('want me to walk through') ||
    lastAssistantMessage.toLowerCase().includes('would you like me to') ||
    lastAssistantMessage.toLowerCase().includes('want a practice') ||
    lastAssistantMessage.toLowerCase().includes('want me to explain');
  
  // Handle "yes" responses to Vory's offers
  if (isYesNoResponse && voryAskedForPractice) {
    const isYes = /^(yes|yeah|yep|sure|ok|okay|please)\.?!?$/i.test(lowerInput);
    
    if (isYes) {
      // Generate relevant practice based on what was discussed
      if (lastAssistantMessage.toLowerCase().includes('lease')) {
        // Course-specific lease practice
        if (courseId === 'cpa') {
          return `**Practice Problem: Lease Classification** 📝\n\nBeta Corp enters into a lease with these terms:\n• **Asset:** Manufacturing equipment\n• **Lease term:** 3 years\n• **Useful life:** 4 years\n• **PV of lease payments:** $72,000\n• **Fair value:** $80,000\n• **No ownership transfer**, **no purchase option**\n\n**Question:** How should Beta Corp classify this lease under ASC 842?\n\n**Work through the OWNES criteria:**\n• O - Ownership transfer? \n• W - Written purchase option?\n• N - Nearly all useful life (≥75%)?\n• E - Essentially all fair value (≥90% PV)?\n• S - Specialized asset?\n\n*Calculate and tell me: Finance lease or Operating lease?*`;
        } else if (courseId === 'ea') {
          return `**Practice Problem: Lease Deductions** 📝\n\nTaylor, a self-employed consultant, leases a vehicle for business:\n• **Monthly lease payment:** $600\n• **Business use:** 70%\n• **Personal use:** 30%\n• **Lease inclusion amount (from IRS tables):** $45/year\n\n**Questions:**\n1. What is the annual deductible lease expense?\n2. How does the lease inclusion amount affect the deduction?\n3. How would the calculation change if business use dropped to 45%?\n\n*Remember: IRC §162 allows ordinary and necessary business expenses!*`;
        }
        return `**Practice Problem: Lease Topic** 📝\n\nI'd be happy to give you a practice problem on leases! What specific aspect would you like to practice?\n\n• Lease payments and deductions\n• Lease vs. purchase decisions\n• Capitalization requirements\n\n*Pick one and I'll create a problem for you!*`;
      }
      if (lastAssistantMessage.toLowerCase().includes('1031') || lastAssistantMessage.toLowerCase().includes('like-kind')) {
        return `**Practice Problem: §1031 Exchange** 📝\n\nTaylor owns an office building with:\n• **Adjusted basis:** $200,000\n• **Fair market value:** $350,000\n• **Mortgage:** $50,000\n\nTaylor exchanges it for:\n• **Warehouse FMV:** $320,000\n• **Assumes mortgage on warehouse:** $40,000\n• **Receives cash:** $20,000\n\n**Calculate:**\n1. Realized gain\n2. Recognized gain\n3. Basis in the new warehouse\n\n*Show your work and I'll check it!*`;
      }
      if (lastAssistantMessage.toLowerCase().includes('capital gain')) {
        return `**Practice Problem: Capital Gains** 📝\n\nJordan (single filer) has the following in 2024:\n• **Salary:** $60,000\n• **STCG from stock:** $5,000\n• **LTCG from stock held 2 years:** $15,000\n• **LTCL from another stock:** $8,000\n\n**Questions:**\n1. What is Jordan's net capital gain/loss?\n2. How much is taxed at ordinary rates vs. preferential rates?\n3. If Jordan had a net capital loss instead, how much could be deducted?\n\n*Work through each step!*`;
      }
      // Generic practice offer
      return `Great! Let's practice! 📝\n\n**What topic would you like a practice problem on?**\n\n• Lease classification (ASC 842)\n• Like-kind exchanges (§1031)\n• Capital gains taxation\n• S corporation requirements\n• Partnership basis\n• Revenue recognition\n\n*Pick one and I'll give you an exam-style question!*`;
    } else {
      // User said no
      return `No problem! 👍\n\n**What else would you like to explore?**\n\nI can:\n• Explain another concept\n• Give you a different type of practice problem\n• Walk through a specific scenario you're struggling with\n\nWhat's next on your study list?`;
    }
  }
  
  // Check for off-topic questions first - use course-specific keywords
  const topicKeywords = course.topicList;
  
  const isOnTopic = topicKeywords.some(keyword => lowerInput.includes(keyword)) || lowerInput.length < 15;
  
  // Off-topic response
  if (!isOnTopic && lowerInput.length > 20) {
    return `🎓 **I'm Vory, your ${course.shortName} exam tutor!**\n\nI specialize in helping you pass the ${course.shortName} exam. I can explain topics related to ${course.topics}.\n\n**Sections:** ${course.sections}\n\nWhat ${course.shortName} topic can I help you with?`;
  }
  
  // Check if this looks like an answer to a previous quiz question
  const isQuizAnswer = mode === 'quiz' && lastAssistantMessage.includes('Question:') && (
    lowerInput.length < 50 || // Short answers are likely quiz responses
    lowerInput.match(/^[a-d]$/) || // Single letter answer
    lowerInput.includes('operating') ||
    lowerInput.includes('finance') ||
    lowerInput.includes('capital') ||
    lowerInput.includes('ordinary')
  );

  // Handle quiz answers
  if (isQuizAnswer && lastAssistantMessage.includes('lease')) {
    if (lowerInput.includes('operating')) {
      return `**Incorrect.** This is actually a **finance lease**.\n\n**Here's why:**\n\nLet's check the 5 finance lease criteria (OWNES):\n\n1. **O**wnership transfers? ❌ No\n2. **W**ritten purchase option? ❌ No\n3. **N**early all useful life (≥75%)? ✅ YES - 4/5 years = 80% ≥ 75%\n4. **E**quivalent to FV (≥90%)? ❌ No - 85/100 = 85% < 90%\n5. **S**pecialized asset? ❌ No\n\n**Key insight:** The 75% useful life test IS met (80% ≥ 75%), so this is classified as a **finance lease**.\n\n🎯 **Exam trap:** Only ONE criterion needs to be met for finance lease classification!\n\nWant another question?`;
    } else if (lowerInput.includes('finance')) {
      return `**Correct!** ✅ Great job!\n\n**This is a finance lease** because:\n\n• Lease term (4 years) / Useful life (5 years) = **80%**\n• 80% ≥ 75% threshold ✅\n\nThe useful life criterion is met!\n\n**Note:** Even though the PV test wasn't met (85% < 90%), only ONE criterion needs to be satisfied for finance lease classification.\n\n🎯 **Exam tip:** Always test ALL 5 criteria systematically. The exam loves to give you scenarios where multiple criteria are close to the threshold!\n\nReady for another question?`;
    }
  }

  // Handle S Corp quiz answers  
  if (isQuizAnswer && lastAssistantMessage.includes('S Corporation') && lastAssistantMessage.includes('DISQUALIFY')) {
    if (lowerInput === 'd' || lowerInput.includes('nonresident') || lowerInput.includes('alien')) {
      return `**Correct!** ✅ Answer: **D) Nonresident alien shareholder**\n\n**Why D is correct:**\nS corporations can ONLY have these shareholders:\n• US citizens\n• Resident aliens\n• Certain trusts and estates\n\nNonresident aliens are **prohibited** shareholders.\n\n**Why the others are wrong:**\n• A) 95 shareholders - OK (limit is 100)\n• B) Single-member LLC - OK (disregarded, owner is the shareholder)\n• C) Voting/non-voting stock - OK (economic rights must be same, voting can differ)\n\n🎯 **Exam tip:** Remember "DISC" - especially the I for Individuals (domestic only)!\n\nWant another S corp question?`;
    }
  }

  // SOCRATIC MODE
  if (mode === 'socratic') {
    if (lowerInput.includes('lease')) {
      if (courseId === 'cpa') {
        return `Let's think through leases together! 🤔\n\n**Before I explain, let me ask you:**\n\nWhen determining if a lease is a finance lease vs operating lease, there are 5 criteria. Can you name any of them?\n\n*Hint: Think about what would make the lessee essentially "own" the asset by the end...*\n\nTake your time - working through this yourself will help it stick!`;
      } else if (courseId === 'ea') {
        return `Let's think through lease deductions together! 🤔\n\n**Before I explain, let me ask you:**\n\nWhen a business owner leases a vehicle used 70% for business and 30% personal, how would you calculate the deductible amount?\n\nAlso, there's something called a "lease inclusion amount" that affects luxury vehicles. Have you heard of it?\n\n*Think about what limits the IRS places on expensive vehicle deductions...*`;
      }
      return `Let's explore leases together! 💡\n\nWhat specific aspect of leases are you trying to understand for the ${course.shortName} exam?`;
    }
    if (lowerInput.includes('basis') || lowerInput.includes('partnership')) {
      return `Great topic! Let's work through partnership basis step by step. 🧠\n\n**First question for you:**\n\nWhen a partner contributes cash and property to a partnership, how do you think the partner's initial basis is calculated? Is it:\n\n• A) Fair market value of everything contributed?\n• B) The partner's adjusted basis in the contributed assets?\n• C) Something else?\n\n*Think about the general rule for tax-free transfers...*`;
    }
    return `Let's explore this together! 💡\n\n**Help me understand what you're working with:**\n\n1. What specific part of this topic is confusing you?\n2. What do you already know about it?\n3. Have you seen any practice problems on this?\n\nWalking me through your thinking will help me guide you to the right answer!`;
  }

  // QUIZ MODE
  if (mode === 'quiz') {
    if (lowerInput.includes('lease')) {
      if (courseId === 'cpa') {
        return `**Quick Quiz: Lease Classification** 📝\n\nAlpha Corp leases equipment with these terms:\n• Lease term: 4 years\n• Equipment useful life: 5 years\n• Present value of payments: $85,000\n• Fair value of equipment: $100,000\n• No transfer of ownership\n• No purchase option\n\n**Question:** Is this a finance lease or operating lease for the lessee under ASC 842?\n\n**Bonus:** Which specific criterion(s) would apply here?\n\n*Reply with your answer and I'll tell you if you're right!*`;
      } else if (courseId === 'ea') {
        return `**Quick Quiz: Lease Deductions** 📝\n\nSarah, a self-employed consultant, leases a car for business:\n• Annual lease payment: $7,200\n• Fair market value of car: $55,000\n• Business use: 80%\n• Lease inclusion amount (from IRS table): $52/year\n\n**Question:** What is Sarah's deductible lease expense for the year?\n\nA) $7,200\nB) $5,760\nC) $5,708\nD) $5,718\n\n*Show your calculation if you'd like feedback on your work!*`;
      }
      return `I'd love to quiz you on leases! 📚\n\nWhat aspect should I focus on for the ${course.shortName} exam?`;
    }
    if (lowerInput.includes('s corp') || lowerInput.includes('s-corp')) {
      return `**Quick Quiz: S Corporation Requirements** 📝\n\nWhich of the following would DISQUALIFY a corporation from making an S election?\n\nA) Having 95 shareholders\nB) Having a shareholder who is a single-member LLC\nC) Having both voting and non-voting common stock\nD) Having a shareholder who is a nonresident alien\n\n*Take a moment to think it through, then give me your answer!*`;
    }
    return `I'd love to quiz you! 📚\n\nTell me more specifically:\n• Which topic area? (e.g., "leases", "revenue recognition", "tax basis")\n• What difficulty? (basic concept, application, or ${course.shortName} exam level)\n\nI'll give you a question that tests real understanding, not just memorization!`;
  }

  // EXPLAIN MODE (default)
  if (lowerInput.includes('capital gain')) {
    return `**Capital Gains - Complete Breakdown** 📊\n\n**The Basics:**\nCapital gain = Amount Realized − Adjusted Basis\n\n**Short-term vs Long-term:**\n\n| Holding Period | Tax Rate |\n|----------------|----------|\n| ≤ 1 year (short-term) | Ordinary rates (10-37%) |\n| > 1 year (long-term) | 0%, 15%, or 20% |\n\n**2024 Long-term Rates (Single):**\n• **0%**: Taxable income up to $47,025\n• **15%**: $47,026 - $518,900\n• **20%**: Over $518,900\n\n**🎯 High-Yield Exam Points:**\n1. "More than one year" = 1 year + 1 day minimum\n2. Net capital losses limited to $3,000/year deduction\n3. Collectibles taxed at max 28% rate\n4. Unrecaptured §1250 gain taxed at max 25%\n\n**Exam Trap:** Watch for wash sales (selling at loss and rebuying within 30 days) - loss disallowed!\n\nWant me to walk through a calculation example?`;
  }

  // Course-specific lease explanation
  if (lowerInput.includes('lease')) {
    if (courseId === 'cpa') {
      return `**Lease Classification under ASC 842** 📋\n\n**Finance Lease Criteria (OWNES):**\nA lease is a **finance lease** if ANY of these 5 are met:\n\n• **O**wnership transfers at end of lease\n• **W**ritten bargain purchase option likely to be exercised\n• **N**early all of useful life (≥75% rule of thumb)\n• **E**ssentially all of fair value (≥90% PV of payments)\n• **S**pecialized asset with no alternative use to lessor\n\n**If NONE are met → Operating Lease**\n\n**🎯 High-Yield Points:**\n1. Lessee always records ROU asset and liability (both types)\n2. Finance lease: Front-loaded expense (interest + depreciation)\n3. Operating lease: Straight-line expense\n4. Use implicit rate if known, otherwise incremental borrowing rate\n\n**Common Exam Trap:**\nThe 75% and 90% are guidelines, not bright lines. Judgment required!\n\nWould you like a practice problem to apply these rules?`;
    } else if (courseId === 'ea') {
      return `**Lease Expenses for Tax Purposes (IRC §162)** 📋\n\n**Deducting Lease Payments:**\nLease payments on property used in a trade or business are generally deductible as ordinary and necessary business expenses.\n\n**Key Rules for Vehicle Leases:**\n\n1. **Business Use Percentage**\n   • Only the business-use portion is deductible\n   • Must maintain contemporaneous records (mileage log)\n\n2. **Lease Inclusion Amount (Luxury Auto Limitation)**\n   • If FMV exceeds threshold, must add back an "inclusion amount"\n   • Found in IRS tables (updated annually)\n   • Reduces the deduction for expensive vehicles\n\n**Calculation:**\n• Deductible amount = (Lease payment × Business %) − Inclusion amount\n\n**🎯 High-Yield SEE Points:**\n1. Self-employed: Deduct on Schedule C\n2. Employees: Generally not deductible (2018+ TCJA)\n3. Listed property rules apply (must keep records)\n4. No deduction for commuting (personal use)\n\nWant me to walk through a calculation example?`;
    }
    // Generic for other courses
    return `**Lease Expenses** 📋\n\nLease treatment depends on the specific exam:\n\n• **CPA**: Lease classification under GAAP (ASC 842)\n• **EA**: Lease deductions under IRC §162\n• **CMA**: Lease analysis for financial decision-making\n\nWhat specific aspect of leases would you like me to explain?`;
  }

  if (lowerInput.includes('1031') || lowerInput.includes('like-kind')) {
    return `**§1031 Like-Kind Exchanges** 🏢\n\n**Purpose:** Defer gain when swapping real property\n\n**Requirements:**\n• Real property only (post-2017)\n• Held for business/investment (not personal)\n• "Like-kind" = real estate for real estate\n• Strict timelines:\n  - **45 days** to identify replacement\n  - **180 days** to close\n\n**Boot = Taxable Portion:**\nBoot is any non-like-kind property received:\n• Cash received\n• Debt relief\n• Other property\n\n**Gain Recognized Formula:**\nGain recognized = LESSER of:\n1. Realized gain, OR\n2. Boot received\n\n**🎯 High-Yield Points:**\n• Basis in new property = Basis in old − Boot received + Gain recognized\n• Related party rules apply (can't swap with family then sell)\n• Partial exchanges are allowed (just recognize boot portion)\n\nWant me to walk through more examples?`;
  }

  if (lowerInput.includes('s corp') || lowerInput.includes('s-corp')) {
    return `**S Corporation Requirements** 🏛️\n\n**The "DISC" Test - Must ALL be met:**\n\n• **D**omestic corporation only\n• **I**ndividuals, estates, certain trusts as shareholders\n  - NO corporations, partnerships, or nonresident aliens!\n• **S**ingle class of stock\n  - Voting differences OK, economic differences NOT OK\n• **C**ap of 100 shareholders\n  - Family members can elect to count as 1\n\n**Key Termination Events:**\n• Exceed 100 shareholders\n• Ineligible shareholder acquires stock\n• Create second class of stock\n• Excess passive income (3 consecutive years if C corp E&P)\n\n**🎯 High-Yield Points:**\n1. Election due by March 15 (2½ months into tax year)\n2. All shareholders must consent\n3. Built-in gains tax if converted from C corp\n4. AAA (Accumulated Adjustments Account) tracks S corp earnings\n\nNeed me to explain the taxation flow-through?`;
  }

  // Audit evidence - relevant for CPA (AUD) and CIA only
  if (lowerInput.includes('evidence') || lowerInput.includes('reliable') || lowerInput.includes('third party')) {
    if (courseId === 'cpa' || courseId === 'cia' || courseId === 'cisa') {
      return `**Audit Evidence Reliability** 📋\n\n**Hierarchy of Evidence (Most to Least Reliable):**\n\n1. **External evidence from third parties** - Most reliable\n   - Bank confirmations, vendor confirmations\n   - Documents received directly from independent parties\n\n2. **External evidence through client** - Reliable\n   - Bank statements held by client\n   - Invoices from vendors\n\n3. **Internal evidence with strong controls** - Moderately reliable\n   - Documents created and processed with good internal controls\n\n4. **Internal evidence with weak controls** - Less reliable\n   - Documents from systems with poor controls\n\n**🎯 Key Exam Points:**\n• **External > Internal** (independent sources are more reliable)\n• **Original > Copy** (original documents beat photocopies)\n• **Auditor-generated > Client-generated** (auditor's own calculations are most reliable)\n• Direct knowledge (observation) > Indirect (inquiry)\n\n**Why Third Party Documents Are Most Reliable:**\nThey're created outside the client's control, so management can't manipulate them.\n\nWant me to give you a practice question on this topic?`;
    }
    // For tax exams, "evidence" likely means documentation for tax positions
    if (courseId === 'ea') {
      return `**Documentation & Evidence for Tax Positions** 📋\n\n**Substantiation Requirements (Generally):**\n\n1. **Business Expenses (IRC §274)**\n   • Amount, time, place, business purpose\n   • Contemporary records are best\n\n2. **Travel & Entertainment**\n   • Who, what, when, where, why\n   • Receipts required for expenses ≥ $75\n\n3. **Charitable Contributions**\n   • Written acknowledgment for ≥ $250\n   • Qualified appraisal for property > $5,000\n\n4. **Mileage Deductions**\n   • Log: date, destination, business purpose, miles\n\n**🎯 High-Yield SEE Points:**\n• Cohan Rule: Courts may estimate if some records exist\n• Contemporaneous records beat reconstructed records\n• Bank/credit card statements supplement but don't replace receipts\n\nNeed more detail on a specific type of documentation?`;
    }
  }

  // Insurance and risk management topics (CFP, CPA)
  if (lowerInput.includes('insurance') || lowerInput.includes('risk') || lowerInput.includes('coverage') || lowerInput.includes('policy') || lowerInput.includes('premium')) {
    if (courseId === 'cfp') {
      return `**Insurance & Risk Management Fundamentals** 📋\n\n**Key Insurance Concepts for CFP:**\n\n**Types of Insurance:**\n• **Life Insurance**: Term, Whole Life, Universal, Variable\n• **Health Insurance**: Individual, Group, HSA/FSA eligibility\n• **Disability Insurance**: Own-occupation vs Any-occupation\n• **Long-Term Care**: Benefit triggers, elimination periods\n• **Property & Casualty**: Homeowners, Auto, Umbrella\n\n**Risk Management Process:**\n1. Identify risks\n2. Evaluate/analyze risks\n3. Select appropriate techniques (avoid, reduce, retain, transfer)\n4. Implement the plan\n5. Monitor and review\n\n**🎯 High-Yield CFP Points:**\n• Human Life Value vs Needs Analysis for life insurance\n• Coordination of benefits rules\n• Subrogation and indemnity principles\n• Policy exclusions and limitations\n\nWhat specific aspect of insurance would you like me to explain further?`;
    }
    return `**Insurance & Risk Management** 📋\n\nInsurance is a key topic! I can help explain:\n\n• **Types of policies** and their features\n• **Coverage analysis** and gaps\n• **Premium calculations** and factors\n• **Risk transfer** vs retention strategies\n\nWhat specific insurance concept are you working on?`;
  }

  // Control/network/security topics (CISA, CFP)
  if (lowerInput.includes('control') || lowerInput.includes('internal') || lowerInput.includes('network') || lowerInput.includes('security')) {
    if (courseId === 'cisa') {
      return `**Internal Controls & Security** 📋\n\n**Types of Controls:**\n• **Preventive**: Stop issues before they occur (access controls, segregation of duties)\n• **Detective**: Identify issues that occurred (logs, reconciliations, audits)\n• **Corrective**: Fix issues after detection (incident response, patches)\n\n**Network Security Controls:**\n• Firewalls, IDS/IPS\n• Encryption (at rest, in transit)\n• Access control lists (ACLs)\n• Network segmentation\n• VPNs and secure protocols\n\n**🎯 Key Exam Points:**\n• Defense in depth principle\n• Least privilege access\n• Separation of duties\n• Audit trails and logging\n\nWhat specific control or security concept would you like me to elaborate on?`;
    }
    return `**Controls & Security Concepts** 📋\n\nThis is an important topic! Let me help with:\n\n• **Internal Controls**: Preventive, detective, and corrective measures\n• **Security Principles**: Confidentiality, integrity, availability\n• **Risk Assessment**: Identifying and mitigating threats\n\nCould you give me more details about what you're specifically trying to understand?`;
  }

  // Generic helpful response - actually try to be helpful instead of asking for section
  const questionSummary = input.slice(0, 100);
  if (isApiError) {
    return `📚 **I'm currently in offline mode**, but I can still help!\n\nRegarding your question about "${questionSummary}${input.length > 100 ? '...' : ''}":\n\nWhile I don't have a specific pre-built answer for this topic, here are some study tips:\n\n1. **Break it down**: What are the key terms in your question?\n2. **Check your course materials**: Review the relevant lesson or chapter\n3. **Practice problems**: Work through examples to reinforce understanding\n\nOnce I'm back online, I'll be able to give you a detailed, personalized explanation!\n\n*Note: Using offline mode. Some features may be limited.*`;
  }
  
  return `📚 **Great question about "${questionSummary}${input.length > 100 ? '...' : ''}"!**\n\nI want to give you the best answer possible. To help me focus my response:\n\n1. **Are you asking about a specific concept** you encountered in a question?\n2. **Need a calculation explained** step by step?\n3. **Looking for exam tips** on this topic?\n\nTell me a bit more and I'll give you a detailed, exam-focused explanation!`;
};

// Call Gemini API
export const generateAIResponse = async (
  userMessage: string,
  mode = 'explain',
  weakAreas: WeakArea[] = [],
  section = 'REG',
  conversationHistory: ChatMessage[] = [],
  courseId?: CourseId,
  contextText?: string
): Promise<string> => {
  // Validate courseId - warn if not provided (indicates a bug in calling code)
  if (!courseId) {
    logger.warn('[AI Service] generateAIResponse called without courseId! Defaulting to CPA. Please fix the calling code.');
    courseId = 'cpa';
  }
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    logger.warn('[AI Service] No API key found. Using offline response database.');
    return generateFallbackResponse(userMessage, mode, section, conversationHistory, false, courseId);
  }

  try {
    const SYSTEM_PROMPTS = getSystemPrompts(courseId);
    const systemPrompt =
      SYSTEM_PROMPTS[mode] + buildUserContext(weakAreas, section, conversationHistory, courseId, contextText);

    // Build conversation history for context
    const messages = conversationHistory.slice(-6).map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Add current message
    messages.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || `HTTP ${response.status}`;
      logger.error(`Gemini API error: ${errorMessage}`);
      
      // Check for specific error types - API key issues
      if (
        errorMessage.includes('API_KEY_INVALID') ||
        errorMessage.includes('PERMISSION_DENIED') ||
        errorMessage.includes('API key not valid') ||
        errorMessage.includes('API key expired') ||
        errorMessage.includes('invalid API key') ||
        response.status === 400 ||
        response.status === 401 ||
        response.status === 403
      ) {
        // Log for admin notification
        logger.error('[ADMIN ALERT] Gemini API key is invalid or expired! Status:', response.status, 'Message:', errorMessage);
        
        // Track the failure for admin dashboard (can be picked up by error tracking)
        try {
          // Store in localStorage for admin to see
          const failures = JSON.parse(localStorage.getItem('ai_api_failures') || '[]');
          failures.push({
            timestamp: new Date().toISOString(),
            status: response.status,
            message: errorMessage,
          });
          // Keep only last 10 failures
          localStorage.setItem('ai_api_failures', JSON.stringify(failures.slice(-10)));
        } catch {
          // Ignore localStorage errors
        }
        
        throw new Error('API_KEY_INVALID');
      }
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('No response from Gemini');
  } catch (error) {
    logger.error('AI Service Error:', error);
    
    // Show specific message for API key issues
    if (error instanceof Error && error.message === 'API_KEY_INVALID') {
      return `⚠️ **AI Service Temporarily Unavailable**\n\nI'm currently in offline mode. Here's what I can help with:\n\n---\n\n${generateFallbackResponse(userMessage, mode, section, conversationHistory, true, courseId)}`;
    }
    
    return generateFallbackResponse(userMessage, mode, section, conversationHistory, true, courseId);
  }
};

export default { generateAIResponse };
