/**
 * Centralized data configuration for all exam landing pages
 * Each exam follows the same uniform structure with exam-specific content
 */

import { 
  Brain,
  Target,
  Bot,
  RefreshCw,
  Smartphone,
  DollarSign,
  Briefcase,
  PieChart,
  Settings,
  Globe,
  Award,
  Scale,
  Lock,
  Users,
  TrendingUp,
  Shield,
  type LucideIcon,
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ExamPart {
  part: string;
  title: string;
  topics: string[];
  questions: string;
  time: string;
}

export interface WhyBecomeItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CompetitorRow {
  feature: string;
  voraprep: boolean | string;
  competitor1: boolean | string;
  competitor2: boolean | string;
  competitor3?: boolean | string;
  highlight?: boolean;
}

export interface ExamLandingConfig {
  // Basic info
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  
  // Colors
  primaryColor: string;           // e.g., 'blue', 'emerald', 'purple'
  gradientFrom: string;           // Tailwind class
  gradientTo: string;             // Tailwind class
  
  // Stats (shown in hero)
  questionCount: string;
  lessonCount?: string;
  flashcardCount?: string;
  passRate?: string;
  
  // URLs
  registerPath: string;
  loginPath: string;
  
  // Content sections
  examParts: ExamPart[];
  whyBecome: WhyBecomeItem[];
  
  // Competitor comparison (optional - some exams may not have this yet)
  competitors?: {
    names: string[];  // 2 or 3 competitors
    data: CompetitorRow[];
  };
  
  // Special banners/notices (optional)
  notices?: Array<{
    type: 'warning' | 'info';
    text: string;
  }>;
  
  // Pricing (used on landing page)
  pricing: {
    annual: number;           // Regular annual price
    monthly: number;          // Regular monthly price
    founderAnnual: number;    // Founder annual price (50% off)
    founderMonthly: number;   // Founder monthly price (50% off)
  };
  
  // Footer links specific to this exam
  examSpecificLinks?: Array<{
    label: string;
    href: string;
  }>;
  
  // Disclaimer text
  disclaimer: string;
}

// ============================================================================
// WHY VORAPREP (shared across all exams)
// ============================================================================

export const SHARED_WHY_VORAPREP = [
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Founder pricing: 50% off for our first users. Quality prep at a fraction of what others charge.',
    stat: 'Save 50%',
  },
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Our AI tracks your weak areas and adjusts difficulty in real-time. 70% of practice focuses on topics you struggle with most.',
    stat: 'Adaptive',
  },
  {
    icon: Bot,
    title: 'Meet Vory',
    description: 'Your AI study companion explains concepts until they click. Available 24/7, never judges, infinitely patient.',
    stat: '24/7',
  },
  {
    icon: RefreshCw,
    title: 'Spaced Repetition',
    description: 'SM-2 algorithm schedules reviews right before you forget. Maximum retention, minimum time.',
    stat: '2x Retention',
  },
  {
    icon: Target,
    title: 'Curriculum-Aware',
    description: 'Only quiz you on topics you\'ve studied. No frustrating questions on material you haven\'t learned yet.',
    stat: 'Smart Flow',
  },
  {
    icon: Smartphone,
    title: 'Study Anywhere',
    description: 'Full offline mode with PWA support. Study on the subway, in a coffee shop, anywhere without WiFi.',
    stat: 'Offline Ready',
  },
];

// ============================================================================
// CPA CONFIGURATION
// ============================================================================

export const CPA_CONFIG: ExamLandingConfig = {
  id: 'cpa',
  name: 'CPA',
  fullName: 'Certified Public Accountant',
  tagline: 'Pass Your CPA Exam Without Breaking the Bank',
  description: 'The gold standard for accountants. Master financial reporting, auditing, taxation, and business concepts.',
  
  primaryColor: 'blue',
  gradientFrom: 'from-blue-600',
  gradientTo: 'to-blue-700',
  
  questionCount: '3,200+',
  lessonCount: '460+',
  flashcardCount: '600+',
  passRate: '50%',
  
  registerPath: '/register?course=cpa',
  loginPath: '/login?course=cpa',
  
  pricing: {
    annual: 199,
    monthly: 29,
    founderAnnual: 99,
    founderMonthly: 14,
  },
  
  notices: [
    {
      type: 'info',
      text: '2026 Blueprint: Starting July 1, 2026, REG and TCP sections will include OBBBA tax law provisions. Our content adapts to your target exam date.',
    },
  ],
  
  examParts: [
    { part: 'FAR', title: 'Financial Accounting & Reporting', topics: ['Financial Statements', 'Government & NFP', 'Transactions', 'Consolidated Statements'], questions: '463+', time: '4 hours' },
    { part: 'AUD', title: 'Auditing & Attestation', topics: ['Audit Planning', 'Internal Controls', 'Evidence & Procedures', 'Reports'], questions: '425+', time: '4 hours' },
    { part: 'REG', title: 'Regulation', topics: ['Individual Tax', 'Business Tax', 'Ethics', 'Business Law'], questions: '460+', time: '4 hours' },
    { part: 'BAR', title: 'Business Analysis & Reporting', topics: ['Data Analysis', 'Technical Accounting', 'State & Local Gov', 'NFP Accounting'], questions: '393+', time: '4 hours' },
    { part: 'ISC', title: 'Information Systems & Controls', topics: ['IT Governance', 'System Development', 'SOC Engagements', 'Cybersecurity'], questions: '388+', time: '4 hours' },
    { part: 'TCP', title: 'Tax Compliance & Planning', topics: ['Individual Tax', 'Entity Tax', 'Property Transactions', 'Tax Research'], questions: '379+', time: '4 hours' },
  ],
  
  whyBecome: [
    { icon: Award, title: 'Gold Standard', description: 'The CPA license is the most recognized credential in accounting. Opens doors to leadership roles.' },
    { icon: DollarSign, title: 'Higher Earnings', description: 'CPAs earn 10-15% more than non-certified accountants on average.' },
    { icon: Briefcase, title: 'Career Flexibility', description: 'Work in public accounting, industry, government, or start your own practice.' },
    { icon: Globe, title: 'Global Recognition', description: 'CPA is recognized worldwide. Work for multinational firms or abroad.' },
  ],
  
  competitors: {
    names: ['Becker', 'Roger', 'Surgent'],
    data: [
      { feature: 'Annual Price', voraprep: '$14/mo*', competitor1: '$3,499', competitor2: '$2,095', competitor3: '$1,799', highlight: true },
      { feature: 'AI Tutor Included', voraprep: true, competitor1: 'Extra $$$', competitor2: false, competitor3: 'Limited', highlight: true },
      { feature: 'Adaptive Learning Engine', voraprep: 'Real-time AI', competitor1: 'Extra $$$', competitor2: false, competitor3: 'Basic', highlight: true },
      { feature: 'SM-2 Spaced Repetition', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'Learning Style', voraprep: 'Active Practice', competitor1: 'Video-Based', competitor2: 'Video-Based', competitor3: 'Video-Based', highlight: true },
      { feature: '2025 & 2026 Blueprint', voraprep: true, competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Task-Based Simulations', voraprep: '100+', competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Prometric-Style Interface', voraprep: true, competitor1: true, competitor2: false, competitor3: false, highlight: true },
      { feature: 'PWA + Offline Mode', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'No Credit Card to Start', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
    ],
  },
  
  disclaimer: 'Not affiliated with AICPA or NASBA.',
};

// ============================================================================
// EA CONFIGURATION
// ============================================================================

export const EA_CONFIG: ExamLandingConfig = {
  id: 'ea',
  name: 'EA',
  fullName: 'Enrolled Agent',
  tagline: 'Become an IRS-Authorized Tax Expert',
  description: 'The highest credential the IRS awards. Represent taxpayers before the IRS with unlimited practice rights.',
  
  primaryColor: 'emerald',
  gradientFrom: 'from-emerald-600',
  gradientTo: 'to-teal-600',
  
  questionCount: '2,200+',
  lessonCount: '150+',
  flashcardCount: '460+',
  passRate: '70%',
  
  registerPath: '/register?course=ea',
  loginPath: '/login?course=ea',
  
  pricing: {
    annual: 59,
    monthly: 9,
    founderAnnual: 29,
    founderMonthly: 5,
  },
  
  examParts: [
    { part: 'Part 1', title: 'Individuals', topics: ['Filing Requirements', 'Income & Deductions', 'Credits & Adjustments', 'Tax Calculations'], questions: '700+', time: '3.5 hours' },
    { part: 'Part 2', title: 'Businesses', topics: ['Business Entities', 'Business Income', 'Deductions & Credits', 'Specialized Returns'], questions: '700+', time: '3.5 hours' },
    { part: 'Part 3', title: 'Representation', topics: ['Practice & Procedures', 'Taxpayer Rights', 'Penalties & Appeals', 'Ethics'], questions: '700+', time: '3.5 hours' },
  ],
  
  whyBecome: [
    { icon: Scale, title: 'Unlimited Practice Rights', description: 'Represent any taxpayer on any tax matter before any IRS office. No state limitations.' },
    { icon: DollarSign, title: 'Lucrative Career', description: 'EAs charge $50-$500+ per hour for representation services.' },
    { icon: Briefcase, title: 'Flexible Practice', description: 'Work at a firm, start your own practice, or work remotely with clients nationwide.' },
    { icon: Shield, title: 'IRS Recognized', description: 'The only federally-authorized tax practitioner credential. Regulated by the IRS, not states.' },
  ],
  
  competitors: {
    names: ['Gleim', 'Passkey', 'Surgent'],
    data: [
      { feature: 'Price', voraprep: '$5/mo*', competitor1: '$629', competitor2: '$447', competitor3: '$599', highlight: true },
      { feature: 'AI Tutor (24/7)', voraprep: true, competitor1: false, competitor2: false, competitor3: 'Limited', highlight: true },
      { feature: 'Real-time Adaptive Engine', voraprep: true, competitor1: 'Basic', competitor2: false, competitor3: 'Basic', highlight: true },
      { feature: 'SM-2 Spaced Repetition', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'Learning Style', voraprep: 'Active Practice', competitor1: 'Video-Based', competitor2: 'Text-Based', competitor3: 'Video-Based', highlight: true },
      { feature: 'All 3 SEE Parts', voraprep: true, competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Practice Questions', voraprep: '2,100+', competitor1: '2,500+', competitor2: '1,800+', competitor3: '2,000+' },
      { feature: 'Flashcards', voraprep: '460+', competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'Expert Lessons', voraprep: '150+', competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Progress Analytics', voraprep: true, competitor1: 'Basic', competitor2: 'Basic', competitor3: 'Basic', highlight: true },
      { feature: 'PWA + Offline Mode', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'No Credit Card to Start', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
    ],
  },
  
  disclaimer: 'Not affiliated with the IRS or Treasury Department.',
};

// ============================================================================
// CMA CONFIGURATION
// ============================================================================

export const CMA_CONFIG: ExamLandingConfig = {
  id: 'cma',
  name: 'CMA',
  fullName: 'Certified Management Accountant',
  tagline: 'Master Financial Strategy & Business Performance',
  description: 'Excel in management accounting and financial strategy. Drive business decisions and advance to CFO-track roles.',
  
  primaryColor: 'purple',
  gradientFrom: 'from-purple-600',
  gradientTo: 'to-indigo-600',
  
  questionCount: '2,000+',
  lessonCount: '110+',
  flashcardCount: '500+',
  passRate: '45%',
  
  registerPath: '/register?course=cma',
  loginPath: '/login?course=cma',
  
  pricing: {
    annual: 99,
    monthly: 14,
    founderAnnual: 49,
    founderMonthly: 7,
  },
  
  examParts: [
    { part: 'Part 1', title: 'Financial Planning, Performance & Analytics', topics: ['External Financial Reporting', 'Planning & Budgeting', 'Performance Management', 'Cost Management', 'Internal Controls', 'Technology & Analytics'], questions: '100 MCQs + 2 Essays', time: '4 hours' },
    { part: 'Part 2', title: 'Strategic Financial Management', topics: ['Financial Statement Analysis', 'Corporate Finance', 'Decision Analysis', 'Risk Management', 'Investment Decisions', 'Professional Ethics'], questions: '100 MCQs + 2 Essays', time: '4 hours' },
  ],
  
  whyBecome: [
    { icon: TrendingUp, title: 'Career Advancement', description: 'CMAs earn 58% more than non-certified peers according to IMA salary survey.' },
    { icon: Globe, title: 'Global Recognition', description: 'Recognized in 150+ countries. Work anywhere in the world.' },
    { icon: PieChart, title: 'Strategic Focus', description: 'Go beyond accounting. Drive business strategy and financial decisions.' },
    { icon: Settings, title: 'Practical Skills', description: 'Learn budgeting, forecasting, and performance management used daily by CFOs.' },
  ],
  
  competitors: {
    names: ['Gleim', 'Hock', 'Wiley'],
    data: [
      { feature: 'Price', voraprep: '$7/mo*', competitor1: '$1,599', competitor2: '$1,199', competitor3: '$1,450', highlight: true },
      { feature: 'AI Tutor (24/7)', voraprep: true, competitor1: false, competitor2: false, competitor3: 'Limited', highlight: true },
      { feature: 'Real-time Adaptive Engine', voraprep: true, competitor1: 'Basic', competitor2: false, competitor3: 'Basic', highlight: true },
      { feature: 'SM-2 Spaced Repetition', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'Learning Style', voraprep: 'Active Practice', competitor1: 'Video-Based', competitor2: 'Video-Based', competitor3: 'Video-Based', highlight: true },
      { feature: 'Both Parts Included', voraprep: true, competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Practice Questions', voraprep: '2,000+', competitor1: '2,000+', competitor2: '1,500+', competitor3: '2,000+' },
      { feature: 'Essay Practice', voraprep: true, competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Flashcards', voraprep: '500+', competitor1: 'Limited', competitor2: false, competitor3: false, highlight: true },
      { feature: 'Expert Lessons', voraprep: '110+', competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Progress Analytics', voraprep: true, competitor1: 'Basic', competitor2: 'Basic', competitor3: 'Basic', highlight: true },
      { feature: 'PWA + Offline Mode', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'No Credit Card to Start', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
    ],
  },
  
  disclaimer: 'Not affiliated with IMA.',
};

// ============================================================================
// CIA CONFIGURATION
// ============================================================================

export const CIA_CONFIG: ExamLandingConfig = {
  id: 'cia',
  name: 'CIA',
  fullName: 'Certified Internal Auditor',
  tagline: 'Lead Internal Audit Excellence',
  description: 'The only globally recognized internal audit certification. Essential for Chief Audit Executives and audit leaders.',
  
  primaryColor: 'amber',
  gradientFrom: 'from-amber-500',
  gradientTo: 'to-orange-600',
  
  questionCount: '1,500+',
  lessonCount: '140+',
  flashcardCount: '550+',
  passRate: '40%',
  
  registerPath: '/register?course=cia',
  loginPath: '/login?course=cia',
  
  pricing: {
    annual: 99,
    monthly: 14,
    founderAnnual: 49,
    founderMonthly: 7,
  },
  
  examParts: [
    { part: 'Part 1', title: 'Essentials of Internal Auditing', topics: ['Foundations of Internal Auditing', 'Independence & Objectivity', 'Proficiency & Due Care', 'Quality Assurance'], questions: '125 MCQs', time: '2.5 hours' },
    { part: 'Part 2', title: 'Practice of Internal Auditing', topics: ['Managing the Audit Function', 'Planning Engagements', 'Performing Engagements', 'Communicating Results'], questions: '100 MCQs', time: '2 hours' },
    { part: 'Part 3', title: 'Business Knowledge for Internal Auditing', topics: ['Business Acumen', 'Information Security', 'IT Controls', 'Financial Management'], questions: '100 MCQs', time: '2 hours' },
  ],
  
  whyBecome: [
    { icon: Globe, title: 'Global Recognition', description: 'The only globally recognized internal audit certification. Work anywhere in the world.' },
    { icon: TrendingUp, title: 'Career Growth', description: 'CIAs are 51% more likely to reach senior management according to IIA research.' },
    { icon: Shield, title: 'Risk Leadership', description: 'Position yourself as a governance, risk, and compliance expert.' },
    { icon: Award, title: 'Professional Standard', description: 'Required or preferred for Chief Audit Executive positions at major organizations.' },
  ],
  
  competitors: {
    names: ['Gleim', 'IIA Learning', 'Surgent'],
    data: [
      { feature: 'Price', voraprep: '$7/mo*', competitor1: '$1,299', competitor2: '$1,400', competitor3: '$999', highlight: true },
      { feature: 'AI Tutor (24/7)', voraprep: true, competitor1: false, competitor2: false, competitor3: 'Limited', highlight: true },
      { feature: 'Real-time Adaptive Engine', voraprep: true, competitor1: 'Basic', competitor2: false, competitor3: false, highlight: true },
      { feature: 'SM-2 Spaced Repetition', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'Learning Style', voraprep: 'Active Practice', competitor1: 'Video-Based', competitor2: 'Video-Based', competitor3: 'Video-Based', highlight: true },
      { feature: 'All 3 Parts', voraprep: true, competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Practice Questions', voraprep: '1,500+', competitor1: '1,500+', competitor2: '1,200+', competitor3: '1,000+' },
      { feature: 'Flashcards', voraprep: '550+', competitor1: 'Limited', competitor2: false, competitor3: false, highlight: true },
      { feature: 'Expert Lessons', voraprep: '140+', competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Progress Analytics', voraprep: true, competitor1: 'Basic', competitor2: 'Basic', competitor3: 'Basic', highlight: true },
      { feature: 'PWA + Offline Mode', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'No Credit Card to Start', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
    ],
  },
  
  disclaimer: 'Not affiliated with The IIA.',
};

// ============================================================================
// CFP CONFIGURATION
// ============================================================================

export const CFP_CONFIG: ExamLandingConfig = {
  id: 'cfp',
  name: 'CFP',
  fullName: 'Certified Financial Planner',
  tagline: 'Master Comprehensive Financial Planning',
  description: 'The standard of excellence in financial planning. Build a career helping clients achieve their financial goals.',
  
  primaryColor: 'green',
  gradientFrom: 'from-green-500',
  gradientTo: 'to-emerald-600',
  
  questionCount: '2,500+',
  lessonCount: '135+',
  flashcardCount: '550+',
  passRate: '67%',
  
  registerPath: '/register?course=cfp',
  loginPath: '/login?course=cfp',
  
  pricing: {
    annual: 149,
    monthly: 19,
    founderAnnual: 74,
    founderMonthly: 10,
  },
  
  examParts: [
    { part: 'Domain 1', title: 'Professional Conduct & Regulation', topics: ['CFP Board Standards', 'Fiduciary Duty', 'Practice Standards'], questions: '7% of exam', time: '' },
    { part: 'Domain 2', title: 'General Financial Planning Principles', topics: ['Financial Planning Process', 'Client Communication', 'Time Value of Money'], questions: '17% of exam', time: '' },
    { part: 'Domain 3', title: 'Risk Management & Insurance', topics: ['Life Insurance', 'Health Insurance', 'Disability & LTC', 'Property & Liability'], questions: '12% of exam', time: '' },
    { part: 'Domain 4', title: 'Investment Planning', topics: ['Investment Theory', 'Portfolio Management', 'Asset Classes', 'Retirement Accounts'], questions: '17% of exam', time: '' },
    { part: 'Domain 5', title: 'Tax Planning', topics: ['Tax Fundamentals', 'Income Tax Planning', 'Tax-Advantaged Strategies'], questions: '14% of exam', time: '' },
    { part: 'Domain 6', title: 'Retirement Savings & Income Planning', topics: ['Retirement Plans', 'Social Security', 'Distribution Strategies'], questions: '13% of exam', time: '' },
    { part: 'Domain 7', title: 'Estate Planning', topics: ['Estate Documents', 'Transfer Strategies', 'Trusts', 'Estate Tax'], questions: '10% of exam', time: '' },
    { part: 'Domain 8', title: 'Psychology of Financial Planning', topics: ['Behavioral Finance', 'Client Psychology', 'Counseling Techniques'], questions: '10% of exam', time: '' },
  ],
  
  whyBecome: [
    { icon: Award, title: 'Gold Standard', description: 'CFP certification is the most recognized credential in financial planning.' },
    { icon: DollarSign, title: 'Premium Earnings', description: 'CFP professionals earn 9% more than non-certified advisors on average.' },
    { icon: Users, title: 'Client Trust', description: '88% of consumers prefer working with a CFP professional.' },
    { icon: TrendingUp, title: 'Growing Demand', description: 'Financial planning is one of the fastest-growing professions.' },
  ],
  
  competitors: {
    names: ['Kaplan', 'Dalton', 'Zahn'],
    data: [
      { feature: 'Price', voraprep: '$10/mo*', competitor1: '$1,299', competitor2: '$1,895', competitor3: '$1,450', highlight: true },
      { feature: 'AI Tutor (24/7)', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'Real-time Adaptive Engine', voraprep: true, competitor1: 'Limited', competitor2: false, competitor3: false, highlight: true },
      { feature: 'SM-2 Spaced Repetition', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'Learning Style', voraprep: 'Active Practice', competitor1: 'Video-Based', competitor2: 'Video-Based', competitor3: 'Video-Based', highlight: true },
      { feature: 'All 8 Domains', voraprep: true, competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Practice Questions', voraprep: '2,500+', competitor1: '2,000+', competitor2: '2,500+', competitor3: '2,000+' },
      { feature: 'Case Studies', voraprep: true, competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Flashcards', voraprep: '550+', competitor1: 'Limited', competitor2: false, competitor3: false, highlight: true },
      { feature: 'Expert Lessons', voraprep: '135+', competitor1: true, competitor2: true, competitor3: true },
      { feature: 'Progress Analytics', voraprep: true, competitor1: 'Basic', competitor2: 'Basic', competitor3: 'Basic', highlight: true },
      { feature: 'PWA + Offline Mode', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
      { feature: 'No Credit Card to Start', voraprep: true, competitor1: false, competitor2: false, competitor3: false, highlight: true },
    ],
  },
  
  disclaimer: 'Not affiliated with CFP Board.',
};

// ============================================================================
// CISA CONFIGURATION
// ============================================================================

export const CISA_CONFIG: ExamLandingConfig = {
  id: 'cisa',
  name: 'CISA',
  fullName: 'Certified Information Systems Auditor',
  tagline: 'Lead IT Audit & Information Security',
  description: 'The gold standard for IT audit, control, and information security professionals. Essential for IT governance roles.',
  
  primaryColor: 'cyan',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-blue-600',
  
  questionCount: '1,500+',
  lessonCount: '100+',
  flashcardCount: '530+',
  passRate: '50%',
  
  registerPath: '/register?course=cisa',
  loginPath: '/login?course=cisa',
  
  pricing: {
    annual: 79,
    monthly: 12,
    founderAnnual: 39,
    founderMonthly: 6,
  },
  
  examParts: [
    { part: 'Domain 1', title: 'Information Systems Auditing Process', topics: ['Audit Standards', 'Risk-Based Auditing', 'Audit Planning', 'Evidence Collection'], questions: '18% of exam', time: '' },
    { part: 'Domain 2', title: 'Governance & Management of IT', topics: ['IT Governance', 'IT Strategy', 'Policies & Standards', 'Resource Management'], questions: '18% of exam', time: '' },
    { part: 'Domain 3', title: 'Information Systems Acquisition & Development', topics: ['Business Case', 'Project Management', 'SDLC', 'Testing'], questions: '12% of exam', time: '' },
    { part: 'Domain 4', title: 'Information Systems Operations & Resilience', topics: ['IT Service Management', 'Business Continuity', 'Disaster Recovery'], questions: '26% of exam', time: '' },
    { part: 'Domain 5', title: 'Protection of Information Assets', topics: ['Information Security', 'Access Controls', 'Network Security', 'Data Privacy'], questions: '26% of exam', time: '' },
  ],
  
  whyBecome: [
    { icon: Shield, title: 'In-Demand Skillset', description: 'IT auditors are essential as organizations face increasing cyber threats.' },
    { icon: DollarSign, title: 'Premium Salary', description: 'CISAs earn 25%+ more than non-certified IT audit professionals.' },
    { icon: Globe, title: 'Global Recognition', description: 'CISA is recognized worldwide. Work for global enterprises or consulting firms.' },
    { icon: Lock, title: 'Security Focus', description: 'Position yourself at the intersection of IT and security governance.' },
  ],
  
  competitors: {
    names: ['ISACA', 'Hemang Doshi'],
    data: [
      { feature: 'Price', voraprep: '$6/mo*', competitor1: '$795', competitor2: '$299', highlight: true },
      { feature: 'AI Tutor (24/7)', voraprep: true, competitor1: false, competitor2: false, highlight: true },
      { feature: 'Real-time Adaptive Engine', voraprep: true, competitor1: 'Limited', competitor2: false, highlight: true },
      { feature: 'SM-2 Spaced Repetition', voraprep: true, competitor1: false, competitor2: false, highlight: true },
      { feature: 'Learning Style', voraprep: 'Active Practice', competitor1: 'Text-Based', competitor2: 'Video-Based', highlight: true },
      { feature: 'All 5 Domains', voraprep: true, competitor1: true, competitor2: true },
      { feature: 'Practice Questions', voraprep: '1,500+', competitor1: '1,000', competitor2: '500+' },
      { feature: 'Flashcards', voraprep: '530+', competitor1: false, competitor2: false, highlight: true },
      { feature: 'Expert Lessons', voraprep: '100+', competitor1: true, competitor2: true },
      { feature: 'Structured Learning Path', voraprep: true, competitor1: true, competitor2: true },
      { feature: 'Progress Analytics', voraprep: true, competitor1: 'Basic', competitor2: false, highlight: true },
      { feature: 'PWA + Offline Mode', voraprep: true, competitor1: false, competitor2: false, highlight: true },
      { feature: 'No Credit Card to Start', voraprep: true, competitor1: false, competitor2: false, highlight: true },
    ],
  },
  
  disclaimer: 'Not affiliated with ISACA.',
};

// ============================================================================
// EXPORT ALL CONFIGS
// ============================================================================

export const EXAM_CONFIGS: Record<string, ExamLandingConfig> = {
  cpa: CPA_CONFIG,
  ea: EA_CONFIG,
  cma: CMA_CONFIG,
  cia: CIA_CONFIG,
  cfp: CFP_CONFIG,
  cisa: CISA_CONFIG,
};

export const ALL_EXAMS = [
  CPA_CONFIG,
  EA_CONFIG,
  CMA_CONFIG,
  CIA_CONFIG,
  CFP_CONFIG,
  CISA_CONFIG,
];
