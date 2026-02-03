// AI Service - Google Gemini Integration
// For real AI responses in the CPA tutor

import logger from '../utils/logger';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// System prompts for different tutor modes
const SYSTEM_PROMPTS: Record<string, string> = {
  explain: `You are Vory, an expert CPA exam tutor for VoraPrep. Your role is to:
- Give clear, complete explanations of accounting, auditing, tax, and business concepts ONLY
- Highlight HIGH-YIELD points that are frequently tested on the CPA exam
- Use tables, bullet points, and formatting for clarity
- Include relevant IRC sections, ASC standards, or GAAP references
- Provide mnemonics and memory tricks when helpful
- Keep explanations concise but thorough

IMPORTANT CONVERSATION RULES:
1. You ONLY help with CPA exam topics. If asked about unrelated topics (politics, sports, random questions, personal advice, etc.), politely redirect: "I'm Vory, your CPA exam tutor! I can only help with accounting, auditing, tax, and business topics. What CPA concept can I explain for you?"
2. When you offer a practice problem and the user responds with "yes", "sure", "ok", etc., IMMEDIATELY give them the practice problem. Do NOT ask clarifying questions about what "yes" means.
3. Pay attention to conversation context. Short responses like "yes", "no", "ok", "thanks" are almost always responses to your previous message, not new topics.

Format your responses with **bold** for key terms, bullet points for lists, and clear section headers.`,

  socratic: `You are Vory, a Socratic CPA tutor for VoraPrep. Your role is to:
- NEVER give direct answers immediately
- Ask probing questions to help the student think through the problem
- Guide them step-by-step with questions
- Praise correct reasoning and gently redirect incorrect thinking
- Only reveal the answer after they've worked through the logic
- Help them build understanding, not just memorization

IMPORTANT CONVERSATION RULES:
1. You ONLY help with CPA exam topics. If asked about unrelated topics, politely redirect to CPA study.
2. When the user responds with "yes", "sure", "ok" to your offers, proceed with what you offered. Don't ask what they mean by "yes".
3. Pay attention to conversation flow - interpret short responses in context of your previous message.

Start by asking what they already know, then build from there with questions.`,

  quiz: `You are Vory, a CPA exam quiz master for VoraPrep. Your role is to:
- Generate realistic CPA exam-style multiple choice questions
- Include 4 options (A, B, C, D) with plausible distractors
- After the user answers, explain why the correct answer is right AND why each wrong answer is wrong
- Focus on commonly tested topics and exam traps
- Vary difficulty based on user's performance

IMPORTANT CONVERSATION RULES:
1. You ONLY create quizzes about CPA exam topics. If asked about unrelated topics, politely redirect to CPA study.
2. When the user responds "yes" or "sure" to "want another question?", give them another question immediately.
3. Interpret short answers (A, B, C, D, or brief responses) as quiz answers, not new topics.

Format: Present the question clearly, wait for their answer, then provide detailed feedback.`,
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
const buildUserContext = (weakAreas: WeakArea[], section: string, conversationHistory: ChatMessage[]) => {
  let context = `\n\nUser Context:
- Studying for: CPA ${section} section
- Weak areas needing focus: ${weakAreas.length > 0 ? weakAreas.map((w) => `${w.name} (${w.accuracy}%)`).join(', ') : 'None identified yet'}`;

  if (conversationHistory.length > 0) {
    context += `\n- Recent conversation topics: ${conversationHistory
      .slice(-3)
      .map((m) => m.content.slice(0, 50))
      .join('... ')}`;
  }

  return context;
};

// Fallback responses when API is unavailable
const generateFallbackResponse = (input: string, mode: string, _section: string, conversationHistory: ChatMessage[] = [], isApiError = false) => {
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
        return `**Practice Problem: Lease Classification** 📝\n\nBeta Corp enters into a lease with these terms:\n• **Asset:** Manufacturing equipment\n• **Lease term:** 3 years\n• **Useful life:** 4 years\n• **PV of lease payments:** $72,000\n• **Fair value:** $80,000\n• **No ownership transfer**, **no purchase option**\n\n**Question:** How should Beta Corp classify this lease under ASC 842?\n\n**Work through the OWNES criteria:**\n• O - Ownership transfer? \n• W - Written purchase option?\n• N - Nearly all useful life (≥75%)?\n• E - Essentially all fair value (≥90% PV)?\n• S - Specialized asset?\n\n*Calculate and tell me: Finance lease or Operating lease?*`;
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
  
  // Check for off-topic questions first
  const cpaKeywords = ['accounting', 'audit', 'tax', 'gaap', 'fasb', 'asc', 'irc', 'basis', 'depreciation', 
    'amortization', 'lease', 'revenue', 'expense', 'asset', 'liability', 'equity', 'debit', 'credit',
    'journal', 'ledger', 'financial', 'statement', 'balance sheet', 'income', 'cash flow', 'ratio',
    'inventory', 'fifo', 'lifo', 'receivable', 'payable', 'bond', 'stock', 'dividend', 'partnership',
    's corp', 'c corp', 'llc', 'sole proprietor', 'irs', '1031', '1099', 'w-2', 'capital gain', 'loss',
    'deduction', 'credit', 'exclusion', 'aicpa', 'pcaob', 'sec', 'sox', 'internal control', 'fraud',
    'materiality', 'sampling', 'attestation', 'compilation', 'review', 'assertion', 'disclosure',
    'consolidation', 'subsidiary', 'goodwill', 'impairment', 'pension', 'benefit', 'aro', 'contingency',
    'cpa', 'far', 'aud', 'reg', 'bec', 'bar', 'isc', 'tcp', 'exam', 'blueprint', 'testlet', 'simulation'];
  
  const isOnTopic = cpaKeywords.some(keyword => lowerInput.includes(keyword)) || lowerInput.length < 15;
  
  // Off-topic response
  if (!isOnTopic && lowerInput.length > 20) {
    return `🎓 **I'm Vory, your CPA exam tutor!**\n\nI specialize in helping you pass the CPA exam. I can explain:\n\n• **FAR** - Financial Accounting & Reporting\n• **AUD** - Auditing & Attestation  \n• **REG** - Regulation (Tax & Business Law)\n• **BAR/ISC/TCP** - Discipline sections\n\nWhat CPA topic can I help you with? Try asking about leases, revenue recognition, tax basis, or any exam concept!`;
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
      return `**Correct!** ✅ This is an **operating lease**.\n\n**Here's why:**\n\nLet's check the 5 finance lease criteria (OWNES):\n\n1. **O**wnership transfers? ❌ No\n2. **W**ritten purchase option? ❌ No\n3. **N**early all useful life (≥75%)? ❌ 4/5 years = 80%... wait, that's ≥75%! 🤔\n\nActually, let me recalculate:\n• Lease term: 4 years\n• Useful life: 5 years  \n• 4/5 = 80% ≥ 75% ✅\n\n**Hmm, this could actually be a finance lease** under the useful life test!\n\nAlso check:\n• PV of payments: $85,000\n• Fair value: $100,000\n• 85/100 = 85% ≤ 90% ❌\n\n**Key insight:** The 75% useful life test IS met (80% ≥ 75%), so this would be classified as a **finance lease**, not operating!\n\n🎯 **Exam trap:** Always check ALL criteria - one "yes" makes it a finance lease!\n\nWant another question?`;
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
      return `Let's think through leases together! 🤔\n\n**Before I explain, let me ask you:**\n\nWhen determining if a lease is a finance lease vs operating lease, there are 5 criteria. Can you name any of them?\n\n*Hint: Think about what would make the lessee essentially "own" the asset by the end...*\n\nTake your time - working through this yourself will help it stick!`;
    }
    if (lowerInput.includes('basis') || lowerInput.includes('partnership')) {
      return `Great topic! Let's work through partnership basis step by step. 🧠\n\n**First question for you:**\n\nWhen a partner contributes cash and property to a partnership, how do you think the partner's initial basis is calculated? Is it:\n\n• A) Fair market value of everything contributed?\n• B) The partner's adjusted basis in the contributed assets?\n• C) Something else?\n\n*Think about the general rule for tax-free transfers...*`;
    }
    return `Let's explore this together! 💡\n\n**Help me understand what you're working with:**\n\n1. What specific part of this topic is confusing you?\n2. What do you already know about it?\n3. Have you seen any practice problems on this?\n\nWalking me through your thinking will help me guide you to the right answer!`;
  }

  // QUIZ MODE
  if (mode === 'quiz') {
    if (lowerInput.includes('lease')) {
      return `**Quick Quiz: Lease Classification** 📝\n\nAlpha Corp leases equipment with these terms:\n• Lease term: 4 years\n• Equipment useful life: 5 years\n• Present value of payments: $85,000\n• Fair value of equipment: $100,000\n• No transfer of ownership\n• No purchase option\n\n**Question:** Is this a finance lease or operating lease for the lessee under ASC 842?\n\n**Bonus:** Which specific criterion(s) would apply here?\n\n*Reply with your answer and I'll tell you if you're right!*`;
    }
    if (lowerInput.includes('s corp') || lowerInput.includes('s-corp')) {
      return `**Quick Quiz: S Corporation Requirements** 📝\n\nWhich of the following would DISQUALIFY a corporation from making an S election?\n\nA) Having 95 shareholders\nB) Having a shareholder who is a single-member LLC\nC) Having both voting and non-voting common stock\nD) Having a shareholder who is a nonresident alien\n\n*Take a moment to think it through, then give me your answer!*`;
    }
    return `I'd love to quiz you! 📚\n\nTell me more specifically:\n• Which topic area? (e.g., "leases", "revenue recognition", "tax basis")\n• What difficulty? (basic concept, application, or CPA exam level)\n\nI'll give you a question that tests real understanding, not just memorization!`;
  }

  // EXPLAIN MODE (default)
  if (lowerInput.includes('capital gain')) {
    return `**Capital Gains - Complete Breakdown** 📊\n\n**The Basics:**\nCapital gain = Amount Realized − Adjusted Basis\n\n**Short-term vs Long-term:**\n\n| Holding Period | Tax Rate |\n|----------------|----------|\n| ≤ 1 year (short-term) | Ordinary rates (10-37%) |\n| > 1 year (long-term) | 0%, 15%, or 20% |\n\n**2024 Long-term Rates (Single):**\n• **0%**: Taxable income up to $47,025\n• **15%**: $47,026 - $518,900\n• **20%**: Over $518,900\n\n**🎯 High-Yield Exam Points:**\n1. "More than one year" = 1 year + 1 day minimum\n2. Net capital losses limited to $3,000/year deduction\n3. Collectibles taxed at max 28% rate\n4. Unrecaptured §1250 gain taxed at max 25%\n\n**Exam Trap:** Watch for wash sales (selling at loss and rebuying within 30 days) - loss disallowed!\n\nWant me to walk through a calculation example?`;
  }

  if (lowerInput.includes('lease')) {
    return `**Lease Classification under ASC 842** 📋\n\n**Finance Lease Criteria (OWNES):**\nA lease is a **finance lease** if ANY of these 5 are met:\n\n• **O**wnership transfers at end of lease\n• **W**ritten bargain purchase option likely to be exercised\n• **N**early all of useful life (≥75% rule of thumb)\n• **E**ssentially all of fair value (≥90% PV of payments)\n• **S**pecialized asset with no alternative use to lessor\n\n**If NONE are met → Operating Lease**\n\n**🎯 High-Yield Points:**\n1. Lessee always records ROU asset and liability (both types)\n2. Finance lease: Front-loaded expense (interest + depreciation)\n3. Operating lease: Straight-line expense\n4. Use implicit rate if known, otherwise incremental borrowing rate\n\n**Common Exam Trap:**\nThe 75% and 90% are guidelines, not bright lines. Judgment required!\n\nWould you like a practice problem to apply these rules?`;
  }

  if (lowerInput.includes('1031') || lowerInput.includes('like-kind')) {
    return `**§1031 Like-Kind Exchanges** 🏢\n\n**Purpose:** Defer gain when swapping real property\n\n**Requirements:**\n• Real property only (post-2017)\n• Held for business/investment (not personal)\n• "Like-kind" = real estate for real estate\n• Strict timelines:\n  - **45 days** to identify replacement\n  - **180 days** to close\n\n**Boot = Taxable Portion:**\nBoot is any non-like-kind property received:\n• Cash received\n• Debt relief\n• Other property\n\n**Gain Recognized Formula:**\nGain recognized = LESSER of:\n1. Realized gain, OR\n2. Boot received\n\n**🎯 High-Yield Points:**\n• Basis in new property = Basis in old − Boot received + Gain recognized\n• Related party rules apply (can't swap with family then sell)\n• Partial exchanges are allowed (just recognize boot portion)\n\nWant me to walk through more examples?`;
  }

  if (lowerInput.includes('s corp') || lowerInput.includes('s-corp')) {
    return `**S Corporation Requirements** 🏛️\n\n**The "DISC" Test - Must ALL be met:**\n\n• **D**omestic corporation only\n• **I**ndividuals, estates, certain trusts as shareholders\n  - NO corporations, partnerships, or nonresident aliens!\n• **S**ingle class of stock\n  - Voting differences OK, economic differences NOT OK\n• **C**ap of 100 shareholders\n  - Family members can elect to count as 1\n\n**Key Termination Events:**\n• Exceed 100 shareholders\n• Ineligible shareholder acquires stock\n• Create second class of stock\n• Excess passive income (3 consecutive years if C corp E&P)\n\n**🎯 High-Yield Points:**\n1. Election due by March 15 (2½ months into tax year)\n2. All shareholders must consent\n3. Built-in gains tax if converted from C corp\n4. AAA (Accumulated Adjustments Account) tracks S corp earnings\n\nNeed me to explain the taxation flow-through?`;
  }

  // Default
  return `I'd be happy to help you understand **${input}**! 📚\n\n**To give you the best explanation, could you tell me:**\n1. What specific aspect is unclear?\n2. Are you working on a particular problem?\n3. What have you already studied on this topic?\n\n*The more context you give me, the better I can tailor my explanation!*${isApiError ? '\n\n*Note: Using offline mode. Some features may be limited.*' : ''}`;
};

// Call Gemini API
export const generateAIResponse = async (
  userMessage: string,
  mode = 'explain',
  weakAreas: WeakArea[] = [],
  section = 'REG',
  conversationHistory: ChatMessage[] = []
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    logger.warn('[AI Service] No API key found. Using offline response database.');
    return generateFallbackResponse(userMessage, mode, section, conversationHistory);
  }

  try {
    const systemPrompt =
      SYSTEM_PROMPTS[mode] + buildUserContext(weakAreas, section, conversationHistory);

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
      return `⚠️ **AI Service Temporarily Unavailable**\n\nI'm currently in offline mode. Here's what I can help with:\n\n---\n\n${generateFallbackResponse(userMessage, mode, section, conversationHistory, true)}`;
    }
    
    return generateFallbackResponse(userMessage, mode, section, conversationHistory, true);
  }
};

export default { generateAIResponse };
