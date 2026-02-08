/**
 * CFP Audio Study Mode
 * 
 * Provides audio-friendly flashcard format for hands-free study.
 * Ideal for commuting, walking, or multitasking.
 * 
 * Uses browser Speech Synthesis API for text-to-speech.
 */

export interface AudioFlashcard {
  id: string;
  domain: string;
  topic: string;
  term: string;
  definition: string;
  example?: string;
  pauseSeconds: number;
}

export interface AudioSession {
  id: string;
  domain: string | 'all';
  flashcards: AudioFlashcard[];
  currentIndex: number;
  isPlaying: boolean;
  speed: number; // 0.75 - 1.5
  repeatMode: 'none' | 'card' | 'session';
  autoAdvance: boolean;
  pauseBetweenCards: number; // seconds
}

interface AudioStudyState {
  sessions: Record<string, AudioSession>;
  completedCardIds: string[];
  settings: AudioSettings;
}

interface AudioSettings {
  voice: string;
  rate: number;
  pitch: number;
  volume: number;
  includeExamples: boolean;
  announceDomain: boolean;
  pauseBetweenCards: number;
}

const DEFAULT_SETTINGS: AudioSettings = {
  voice: 'default',
  rate: 0.9,
  pitch: 1.0,
  volume: 1.0,
  includeExamples: true,
  announceDomain: true,
  pauseBetweenCards: 3
};

// Core CFP flashcards organized by domain
export const CFP_AUDIO_FLASHCARDS: AudioFlashcard[] = [
  // RETIREMENT PLANNING
  {
    id: 'audio-ret-001',
    domain: 'RET',
    topic: 'Retirement Accounts',
    term: 'Required Minimum Distribution',
    definition: 'The minimum amount you must withdraw from retirement accounts starting at age 73. Calculated by dividing account balance by a life expectancy factor. Failure to withdraw incurs a 25% penalty.',
    example: 'If your IRA balance is $500,000 and your factor is 26.5, your RMD is approximately $18,868.',
    pauseSeconds: 5
  },
  {
    id: 'audio-ret-002',
    domain: 'RET',
    topic: 'Retirement Accounts',
    term: '4% Rule',
    definition: 'A retirement withdrawal guideline suggesting you can withdraw 4% of your portfolio in year one, then adjust for inflation annually. Designed to provide income for 30 years.',
    example: 'With a $1 million portfolio, withdraw $40,000 in year one. If inflation is 3%, withdraw $41,200 in year two.',
    pauseSeconds: 5
  },
  {
    id: 'audio-ret-003',
    domain: 'RET',
    topic: 'Social Security',
    term: 'Full Retirement Age',
    definition: 'The age at which you receive 100% of your Social Security benefit. For those born 1960 or later, FRA is age 67. Claiming earlier reduces benefits permanently by up to 30%.',
    example: 'Claiming at 62 instead of 67 reduces a $2,000 benefit to $1,400 per month.',
    pauseSeconds: 5
  },
  {
    id: 'audio-ret-004',
    domain: 'RET',
    topic: 'Social Security',
    term: 'Spousal Benefit',
    definition: 'A Social Security benefit equal to 50% of the higher-earning spouse\'s PIA. Available at full retirement age to spouses who worked less or not at all. Reduced if claimed early.',
    pauseSeconds: 4
  },
  {
    id: 'audio-ret-005',
    domain: 'RET',
    topic: 'Retirement Accounts',
    term: 'Roth Conversion',
    definition: 'Moving money from a traditional IRA to a Roth IRA. You pay income tax now, but future growth and withdrawals are tax-free. Especially valuable when you expect higher future tax rates.',
    example: 'Convert $50,000 in a low-income year, pay 22% tax now, avoid 32% tax in retirement.',
    pauseSeconds: 5
  },
  {
    id: 'audio-ret-006',
    domain: 'RET',
    topic: 'Retirement Planning',
    term: 'Sequence of Returns Risk',
    definition: 'The risk that poor investment returns early in retirement permanently damage your portfolio. Withdrawing from a declining portfolio locks in losses and reduces future growth potential.',
    example: 'A 30% drop in year one of retirement is far more damaging than the same drop in year 20.',
    pauseSeconds: 5
  },
  
  // TAX PLANNING
  {
    id: 'audio-tax-001',
    domain: 'TAX',
    topic: 'Tax Concepts',
    term: 'Marginal Tax Rate',
    definition: 'The tax rate applied to your last dollar of income. Different from your effective rate, which is total tax divided by total income. Use marginal rate for planning decisions.',
    example: 'If you\'re in the 24% bracket, an extra $1,000 of income costs $240 in tax.',
    pauseSeconds: 4
  },
  {
    id: 'audio-tax-002',
    domain: 'TAX',
    topic: 'Capital Gains',
    term: 'Step-Up in Basis',
    definition: 'When inherited assets receive a new basis equal to fair market value at death. All unrealized gains are permanently eliminated. One of the most valuable tax benefits in planning.',
    example: 'Stock bought for $10,000 worth $100,000 at death. Heirs\' basis is $100,000. Zero capital gains if sold.',
    pauseSeconds: 5
  },
  {
    id: 'audio-tax-003',
    domain: 'TAX',
    topic: 'Tax Planning',
    term: 'Tax Loss Harvesting',
    definition: 'Selling investments at a loss to offset capital gains. Losses first offset gains, then up to $3,000 of ordinary income. Excess carries forward indefinitely. Avoid wash sales.',
    example: 'Sell stock for $10,000 loss to offset $10,000 gain. Tax savings at 15% rate equals $1,500.',
    pauseSeconds: 5
  },
  {
    id: 'audio-tax-004',
    domain: 'TAX',
    topic: 'AMT',
    term: 'Alternative Minimum Tax',
    definition: 'A parallel tax system that limits certain deductions. Common triggers include large state tax deductions, incentive stock options, and private activity bond interest. Compare regular tax to AMT and pay the higher.',
    pauseSeconds: 4
  },
  {
    id: 'audio-tax-005',
    domain: 'TAX',
    topic: 'Charitable Giving',
    term: 'Qualified Charitable Distribution',
    definition: 'A direct transfer from your IRA to a charity, up to $105,000 per year at age 70.5 or older. Counts toward your RMD but is not included in taxable income. Better than taking the RMD and donating cash.',
    pauseSeconds: 5
  },
  
  // ESTATE PLANNING
  {
    id: 'audio-est-001',
    domain: 'EST',
    topic: 'Estate Basics',
    term: 'Unified Credit',
    definition: 'The amount exempt from gift and estate tax. In 2024, the exemption is $13.61 million per person. Gifts and estates share this single lifetime limit. Scheduled to drop to approximately $6 million in 2026.',
    pauseSeconds: 5
  },
  {
    id: 'audio-est-002',
    domain: 'EST',
    topic: 'Estate Basics',
    term: 'Annual Gift Tax Exclusion',
    definition: 'The amount you can give to any recipient each year tax-free and without using your lifetime exemption. In 2024, the exclusion is $18,000 per person. Spouses can combine for $36,000 per recipient.',
    pauseSeconds: 4
  },
  {
    id: 'audio-est-003',
    domain: 'EST',
    topic: 'Trusts',
    term: 'Revocable Living Trust',
    definition: 'A trust you control during life that becomes irrevocable at death. Avoids probate but provides no estate tax benefits while alive. Assets pass according to trust terms privately and quickly.',
    pauseSeconds: 4
  },
  {
    id: 'audio-est-004',
    domain: 'EST',
    topic: 'Trusts',
    term: 'Irrevocable Life Insurance Trust',
    definition: 'An ILIT holds life insurance outside your estate. The death benefit avoids estate tax if properly structured. Transfer an existing policy and survive 3 years, or have the trust buy a new policy.',
    pauseSeconds: 5
  },
  {
    id: 'audio-est-005',
    domain: 'EST',
    topic: 'Powers',
    term: 'Durable Power of Attorney',
    definition: 'A document granting someone authority to make financial decisions if you become incapacitated. "Durable" means it remains valid during incapacity. Without it, family may need court guardianship.',
    pauseSeconds: 4
  },
  {
    id: 'audio-est-006',
    domain: 'EST',
    topic: 'Estate Concepts',
    term: 'Income in Respect of a Decedent',
    definition: 'IRD is income the decedent earned but didn\'t receive before death. Includes IRAs, 401(k)s, and unpaid wages. Does not receive step-up in basis. Beneficiaries pay income tax when distributed.',
    example: 'A $500,000 IRA is IRD. Beneficiaries will pay income tax on all distributions.',
    pauseSeconds: 5
  },
  
  // INVESTMENT PLANNING
  {
    id: 'audio-inv-001',
    domain: 'INV',
    topic: 'Portfolio Theory',
    term: 'Modern Portfolio Theory',
    definition: 'The idea that diversification can optimize risk-adjusted returns. Combining assets with low correlation reduces overall portfolio volatility without sacrificing expected return. Created by Harry Markowitz.',
    pauseSeconds: 4
  },
  {
    id: 'audio-inv-002',
    domain: 'INV',
    topic: 'Risk Measures',
    term: 'Standard Deviation',
    definition: 'A measure of volatility showing how much returns deviate from the average. Higher standard deviation means more risk. About 68% of returns fall within one standard deviation of the mean.',
    example: 'A fund with 10% average return and 15% standard deviation typically returns between minus 5% and plus 25%.',
    pauseSeconds: 5
  },
  {
    id: 'audio-inv-003',
    domain: 'INV',
    topic: 'Risk Measures',
    term: 'Beta',
    definition: 'A measure of an investment\'s volatility relative to the market. Beta of 1 means same volatility as market. Beta above 1 is more volatile. Beta below 1 is less volatile. Used in CAPM.',
    example: 'A stock with beta of 1.2 is expected to move 12% when the market moves 10%.',
    pauseSeconds: 4
  },
  {
    id: 'audio-inv-004',
    domain: 'INV',
    topic: 'Risk Measures',
    term: 'Sharpe Ratio',
    definition: 'Measures risk-adjusted performance. Calculated as return minus risk-free rate, divided by standard deviation. Higher is better. Useful for comparing investments with different risk levels.',
    example: 'Fund A: 12% return, 15% standard deviation. Risk-free rate 3%. Sharpe ratio equals 0.6.',
    pauseSeconds: 5
  },
  {
    id: 'audio-inv-005',
    domain: 'INV',
    topic: 'Asset Location',
    term: 'Tax-Efficient Asset Location',
    definition: 'Placing investments in accounts that minimize taxes. Tax-inefficient assets like REITs and bonds go in tax-deferred accounts. Tax-efficient assets like index funds go in taxable accounts.',
    pauseSeconds: 4
  },
  {
    id: 'audio-inv-006',
    domain: 'INV',
    topic: 'Bonds',
    term: 'Duration',
    definition: 'A measure of a bond\'s sensitivity to interest rate changes. Duration of 5 means the bond price drops approximately 5% when rates rise 1%. Longer duration means more interest rate risk.',
    pauseSeconds: 4
  },
  
  // RISK MANAGEMENT
  {
    id: 'audio-risk-001',
    domain: 'RISK',
    topic: 'Life Insurance',
    term: 'Term Life Insurance',
    definition: 'Pure death protection for a specified period, typically 10 to 30 years. No cash value. Lowest cost per dollar of coverage. Ideal for temporary needs like income replacement during working years.',
    pauseSeconds: 4
  },
  {
    id: 'audio-risk-002',
    domain: 'RISK',
    topic: 'Life Insurance',
    term: 'Whole Life Insurance',
    definition: 'Permanent coverage with guaranteed cash value growth. Level premiums for life. Cash value grows tax-deferred and can be accessed via loans. Higher cost but provides lifetime coverage.',
    pauseSeconds: 4
  },
  {
    id: 'audio-risk-003',
    domain: 'RISK',
    topic: 'Disability',
    term: 'Own Occupation Disability',
    definition: 'The strongest definition of disability. You\'re disabled if you cannot perform your specific occupation, even if you could work elsewhere. Common for physicians and professionals.',
    example: 'A surgeon who can no longer operate is disabled even if she could teach medicine.',
    pauseSeconds: 5
  },
  {
    id: 'audio-risk-004',
    domain: 'RISK',
    topic: 'Long-Term Care',
    term: 'Benefit Triggers',
    definition: 'Conditions that must be met to receive long-term care insurance benefits. Typically requires inability to perform 2 of 6 activities of daily living, or cognitive impairment. 90-day elimination period is common.',
    pauseSeconds: 4
  },
  {
    id: 'audio-risk-005',
    domain: 'RISK',
    topic: 'Life Insurance',
    term: 'Modified Endowment Contract',
    definition: 'A life insurance policy that was overfunded based on IRS rules. Loses tax advantages: withdrawals become taxable gain first, and pre-59.5 withdrawals have 10% penalty. Tests against 7-pay limit.',
    pauseSeconds: 5
  },
  
  // GENERAL PRINCIPLES
  {
    id: 'audio-gen-001',
    domain: 'GEN',
    topic: 'Time Value of Money',
    term: 'Present Value',
    definition: 'The current worth of a future sum of money given a specified rate of return. Money today is worth more than the same amount in the future due to earning potential. Fundamental to all financial planning.',
    pauseSeconds: 4
  },
  {
    id: 'audio-gen-002',
    domain: 'GEN',
    topic: 'Time Value of Money',
    term: 'Net Present Value',
    definition: 'The difference between present value of cash inflows and outflows. Positive NPV means the investment adds value. Use to compare projects: choose the highest NPV option.',
    pauseSeconds: 4
  },
  {
    id: 'audio-gen-003',
    domain: 'GEN',
    topic: 'Financial Statements',
    term: 'Debt-to-Income Ratio',
    definition: 'Monthly debt payments divided by gross monthly income. Lenders use this to assess creditworthiness. Generally, 36% or lower is considered healthy. Above 43% may disqualify you from mortgages.',
    example: 'Monthly debts of $1,800 on gross income of $6,000 equals 30% debt-to-income ratio.',
    pauseSeconds: 5
  },
  {
    id: 'audio-gen-004',
    domain: 'GEN',
    topic: 'Economic Concepts',
    term: 'Inflation',
    definition: 'The rate at which prices increase, reducing purchasing power. The Federal Reserve targets 2% annual inflation. Retirees must account for inflation eroding their fixed income over 30 years.',
    pauseSeconds: 4
  },
  {
    id: 'audio-gen-005',
    domain: 'GEN',
    topic: 'Education Planning',
    term: '529 Plan',
    definition: 'A tax-advantaged account for education savings. Contributions grow tax-free and qualified withdrawals are tax-free. Can be used for college, K-12 tuition up to $10,000, and apprenticeships.',
    pauseSeconds: 4
  },
  
  // PROFESSIONAL CONDUCT
  {
    id: 'audio-pro-001',
    domain: 'PRO',
    topic: 'Fiduciary Duty',
    term: 'Duty of Loyalty',
    definition: 'The obligation to place client interests above your own. Avoid conflicts of interest and disclose material conflicts that cannot be avoided. Central to fiduciary standard.',
    pauseSeconds: 4
  },
  {
    id: 'audio-pro-002',
    domain: 'PRO',
    topic: 'Fiduciary Duty',
    term: 'Duty of Care',
    definition: 'The obligation to act with competence, diligence, and thoroughness. Provide services with the skill of a qualified professional. Includes maintaining current knowledge.',
    pauseSeconds: 4
  },
  {
    id: 'audio-pro-003',
    domain: 'PRO',
    topic: 'Client Relationship',
    term: 'Informed Consent',
    definition: 'The client\'s agreement to a course of action after being fully informed of relevant facts, risks, and alternatives. Must be obtained before implementing recommendations, especially when conflicts exist.',
    pauseSeconds: 4
  },
  {
    id: 'audio-pro-004',
    domain: 'PRO',
    topic: 'Practice Standards',
    term: 'Financial Planning Process',
    definition: 'The seven-step process: understand context, identify goals, analyze current situation, develop recommendations, present recommendations, implement, and monitor. Apply to every client engagement.',
    pauseSeconds: 4
  }
];

// Audio session management
let currentState: AudioStudyState = {
  sessions: {},
  completedCardIds: [],
  settings: DEFAULT_SETTINGS
};

let speechSynthesis: SpeechSynthesis | null = null;

/**
 * Initialize the audio study system
 */
export function initializeAudioStudy(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    speechSynthesis = window.speechSynthesis;
  }
  
  // Load saved state from localStorage
  const saved = localStorage.getItem('cfp-audio-study');
  if (saved) {
    try {
      currentState = JSON.parse(saved);
    } catch {
      currentState = {
        sessions: {},
        completedCardIds: [],
        settings: DEFAULT_SETTINGS
      };
    }
  }
}

/**
 * Get available voices
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!speechSynthesis) return [];
  return speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
}

/**
 * Update audio settings
 */
export function updateSettings(updates: Partial<AudioSettings>): void {
  currentState.settings = { ...currentState.settings, ...updates };
  saveState();
}

/**
 * Create an audio study session for a domain
 */
export function createAudioSession(
  domain: string | 'all' = 'all',
  shuffled = true
): AudioSession {
  let cards = domain === 'all'
    ? [...CFP_AUDIO_FLASHCARDS]
    : CFP_AUDIO_FLASHCARDS.filter(c => c.domain === domain);
  
  if (shuffled) {
    cards = shuffleArray(cards);
  }
  
  const session: AudioSession = {
    id: generateId(),
    domain,
    flashcards: cards,
    currentIndex: 0,
    isPlaying: false,
    speed: currentState.settings.rate,
    repeatMode: 'none',
    autoAdvance: true,
    pauseBetweenCards: currentState.settings.pauseBetweenCards
  };
  
  currentState.sessions[session.id] = session;
  saveState();
  
  return session;
}

/**
 * Create a targeted session for weak areas
 */
export function createWeakAreaSession(weakDomains: string[]): AudioSession {
  // TODO: Use filtered cards for targeted session
  void weakDomains; // Mark as intentionally unused for now
  return createAudioSession('all', true);
}

/**
 * Start or resume playback
 */
export function playSession(sessionId: string): void {
  const session = currentState.sessions[sessionId];
  if (!session || !speechSynthesis) return;
  
  session.isPlaying = true;
  playCurrentCard(session);
  saveState();
}

/**
 * Pause playback
 */
export function pauseSession(sessionId: string): void {
  const session = currentState.sessions[sessionId];
  if (!session || !speechSynthesis) return;
  
  session.isPlaying = false;
  speechSynthesis.cancel();
  saveState();
}

/**
 * Skip to next card
 */
export function nextCard(sessionId: string): void {
  const session = currentState.sessions[sessionId];
  if (!session) return;
  
  if (session.currentIndex < session.flashcards.length - 1) {
    session.currentIndex++;
    if (session.isPlaying) {
      speechSynthesis?.cancel();
      playCurrentCard(session);
    }
  }
  saveState();
}

/**
 * Go to previous card
 */
export function previousCard(sessionId: string): void {
  const session = currentState.sessions[sessionId];
  if (!session) return;
  
  if (session.currentIndex > 0) {
    session.currentIndex--;
    if (session.isPlaying) {
      speechSynthesis?.cancel();
      playCurrentCard(session);
    }
  }
  saveState();
}

/**
 * Jump to specific card
 */
export function goToCard(sessionId: string, index: number): void {
  const session = currentState.sessions[sessionId];
  if (!session || index < 0 || index >= session.flashcards.length) return;
  
  session.currentIndex = index;
  if (session.isPlaying) {
    speechSynthesis?.cancel();
    playCurrentCard(session);
  }
  saveState();
}

/**
 * Play the current card
 */
function playCurrentCard(session: AudioSession): void {
  if (!speechSynthesis) return;
  
  const card = session.flashcards[session.currentIndex];
  const { settings } = currentState;
  
  // Build speech text
  let text = '';
  
  if (settings.announceDomain) {
    text += `${getDomainName(card.domain)}. `;
  }
  
  text += `${card.term}. `;
  text += `${card.definition} `;
  
  if (settings.includeExamples && card.example) {
    text += `For example: ${card.example}`;
  }
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.volume = settings.volume;
  
  // Set voice if specified
  if (settings.voice !== 'default') {
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.name === settings.voice);
    if (voice) utterance.voice = voice;
  }
  
  // Handle end of card
  utterance.onend = () => {
    // Mark as completed
    if (!currentState.completedCardIds.includes(card.id)) {
      currentState.completedCardIds.push(card.id);
    }
    
    // Handle repeat mode
    if (session.repeatMode === 'card') {
      setTimeout(() => playCurrentCard(session), session.pauseBetweenCards * 1000);
      return;
    }
    
    // Auto-advance to next card
    if (session.autoAdvance && session.currentIndex < session.flashcards.length - 1) {
      setTimeout(() => {
        session.currentIndex++;
        playCurrentCard(session);
        saveState();
      }, session.pauseBetweenCards * 1000);
    } else if (session.repeatMode === 'session' && session.currentIndex === session.flashcards.length - 1) {
      // Loop back to start
      setTimeout(() => {
        session.currentIndex = 0;
        playCurrentCard(session);
        saveState();
      }, session.pauseBetweenCards * 1000);
    } else {
      session.isPlaying = false;
      saveState();
    }
  };
  
  speechSynthesis.speak(utterance);
}

/**
 * Get session progress
 */
export function getSessionProgress(sessionId: string): {
  current: number;
  total: number;
  percentComplete: number;
  currentCard: AudioFlashcard | null;
} {
  const session = currentState.sessions[sessionId];
  if (!session) {
    return { current: 0, total: 0, percentComplete: 0, currentCard: null };
  }
  
  return {
    current: session.currentIndex + 1,
    total: session.flashcards.length,
    percentComplete: ((session.currentIndex + 1) / session.flashcards.length) * 100,
    currentCard: session.flashcards[session.currentIndex] || null
  };
}

/**
 * Get overall study statistics
 */
export function getAudioStudyStats(): {
  totalCards: number;
  completedCards: number;
  percentComplete: number;
  cardsByDomain: Record<string, { total: number; completed: number }>;
} {
  const cardsByDomain: Record<string, { total: number; completed: number }> = {};
  
  // Count all cards by domain
  for (const card of CFP_AUDIO_FLASHCARDS) {
    if (!cardsByDomain[card.domain]) {
      cardsByDomain[card.domain] = { total: 0, completed: 0 };
    }
    cardsByDomain[card.domain].total++;
    
    if (currentState.completedCardIds.includes(card.id)) {
      cardsByDomain[card.domain].completed++;
    }
  }
  
  const completedCards = currentState.completedCardIds.length;
  const totalCards = CFP_AUDIO_FLASHCARDS.length;
  
  return {
    totalCards,
    completedCards,
    percentComplete: (completedCards / totalCards) * 100,
    cardsByDomain
  };
}

/**
 * Generate text-based study script for offline use
 */
export function generateStudyScript(domain: string | 'all' = 'all'): string {
  const cards = domain === 'all'
    ? CFP_AUDIO_FLASHCARDS
    : CFP_AUDIO_FLASHCARDS.filter(c => c.domain === domain);
  
  let script = `# CFP Audio Study Script\n`;
  script += domain === 'all' ? `All Domains\n\n` : `Domain: ${getDomainName(domain)}\n\n`;
  script += `---\n\n`;
  
  for (const card of cards) {
    script += `## ${card.term}\n`;
    script += `*${getDomainName(card.domain)} - ${card.topic}*\n\n`;
    script += `${card.definition}\n\n`;
    if (card.example) {
      script += `**Example:** ${card.example}\n\n`;
    }
    script += `---\n\n`;
  }
  
  return script;
}

/**
 * Export cards for podcast-style reading
 */
export function generatePodcastScript(domain: string | 'all' = 'all'): string {
  const cards = domain === 'all'
    ? CFP_AUDIO_FLASHCARDS
    : CFP_AUDIO_FLASHCARDS.filter(c => c.domain === domain);
  
  let script = `CFP Exam Audio Study Guide\n`;
  script += domain === 'all' 
    ? `Covering all seven domains of the CFP exam.\n\n`
    : `Focus area: ${getDomainName(domain)}.\n\n`;
  
  script += `Let's begin.\n\n`;
  script += `[PAUSE 3 SECONDS]\n\n`;
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    
    if (i > 0 && cards[i-1].domain !== card.domain) {
      script += `[TRANSITION]\n`;
      script += `Moving on to ${getDomainName(card.domain)}.\n\n`;
      script += `[PAUSE 2 SECONDS]\n\n`;
    }
    
    script += `${card.term}.\n\n`;
    script += `[PAUSE 1 SECOND]\n\n`;
    script += `${card.definition}\n\n`;
    
    if (card.example) {
      script += `Here's an example: ${card.example}\n\n`;
    }
    
    script += `[PAUSE ${card.pauseSeconds} SECONDS]\n\n`;
  }
  
  script += `That concludes this study session. Good luck on your exam!\n`;
  
  return script;
}

/**
 * Reset completed cards tracking
 */
export function resetProgress(): void {
  currentState.completedCardIds = [];
  saveState();
}

/**
 * Get current settings
 */
export function getSettings(): AudioSettings {
  return { ...currentState.settings };
}

// Helper functions
function getDomainName(code: string): string {
  const names: Record<string, string> = {
    RET: 'Retirement Planning',
    TAX: 'Tax Planning',
    EST: 'Estate Planning',
    INV: 'Investment Planning',
    RISK: 'Risk Management',
    GEN: 'General Principles',
    PRO: 'Professional Conduct'
  };
  return names[code] || code;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateId(): string {
  return `audio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function saveState(): void {
  localStorage.setItem('cfp-audio-study', JSON.stringify(currentState));
}

export default {
  initializeAudioStudy,
  getAvailableVoices,
  updateSettings,
  createAudioSession,
  createWeakAreaSession,
  playSession,
  pauseSession,
  nextCard,
  previousCard,
  goToCard,
  getSessionProgress,
  getAudioStudyStats,
  generateStudyScript,
  generatePodcastScript,
  resetProgress,
  getSettings,
  CFP_AUDIO_FLASHCARDS
};
