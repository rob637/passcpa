// AI Service - Google Gemini Integration
// For real AI responses in the CPA tutor

import logger from '../utils/logger';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// System prompts for different tutor modes
const SYSTEM_PROMPTS: Record<string, string> = {
  explain: `You are an expert CPA exam tutor. Your role is to:
- Give clear, complete explanations of accounting and tax concepts
- Highlight HIGH-YIELD points that are frequently tested on the CPA exam
- Use tables, bullet points, and formatting for clarity
- Include relevant IRC sections, ASC standards, or GAAP references
- Provide mnemonics and memory tricks when helpful
- Keep explanations concise but thorough

Format your responses with **bold** for key terms, bullet points for lists, and clear section headers.`,

  socratic: `You are a Socratic CPA tutor. Your role is to:
- NEVER give direct answers immediately
- Ask probing questions to help the student think through the problem
- Guide them step-by-step with questions
- Praise correct reasoning and gently redirect incorrect thinking
- Only reveal the answer after they've worked through the logic
- Help them build understanding, not just memorization

Start by asking what they already know, then build from there with questions.`,

  quiz: `You are a CPA exam quiz master. Your role is to:
- Generate realistic CPA exam-style multiple choice questions
- Include 4 options (A, B, C, D) with plausible distractors
- After the user answers, explain why the correct answer is right AND why each wrong answer is wrong
- Focus on commonly tested topics and exam traps
- Vary difficulty based on user's performance

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
const generateFallbackResponse = (input: string, mode: string, _section: string) => {
  const lowerInput = input.toLowerCase();

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
  return `I'd be happy to help you understand **${input}**! 📚\n\n**To give you the best explanation, could you tell me:**\n1. What specific aspect is unclear?\n2. Are you working on a particular problem?\n3. What have you already studied on this topic?\n\n*The more context you give me, the better I can tailor my explanation!*\n\n**Tip:** Add your Gemini API key to .env (VITE_GEMINI_API_KEY) for unlimited AI-powered responses!`;
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
    return generateFallbackResponse(userMessage, mode, section);
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
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('No response from Gemini');
  } catch (error) {
    logger.error('AI Service Error:', error);
    return generateFallbackResponse(userMessage, mode, section);
  }
};

export default { generateAIResponse };
