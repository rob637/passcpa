/**
 * useStructuredData — Injects JSON-LD structured data into <head>
 * 
 * Provides Schema.org markup for:
 * - Organization (VoraPrep)
 * - Course (per-exam landing pages)
 * - FAQPage (per-exam FAQs)
 * - WebSite (sitelinks search box)
 * 
 * Google uses this for rich results in search.
 */

import { useEffect } from 'react';
import type { CourseId } from '../types/course';

// ============================================================================
// Organization Schema (used on homepage)
// ============================================================================

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VoraPrep',
  url: 'https://voraprep.com',
  logo: 'https://voraprep.com/logo.svg',
  description: 'AI-powered professional exam prep for CPA, EA, CMA, CIA, CFP, and CISA certifications.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://voraprep.com/help',
  },
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VoraPrep',
  url: 'https://voraprep.com',
  description: 'AI-powered professional exam prep for CPA, EA, CMA, CIA, CFP, and CISA certifications.',
  publisher: {
    '@type': 'Organization',
    name: 'VoraPrep',
  },
};

// ============================================================================
// Per-Exam Course + FAQ Data
// ============================================================================

interface ExamSEOData {
  name: string;
  fullName: string;
  description: string;
  url: string;
  annualPrice: number;
  monthlyPrice: number;
  faqs: Array<{ question: string; answer: string }>;
}

const EXAM_SEO_DATA: Record<CourseId, ExamSEOData> = {
  cpa: {
    name: 'CPA Exam Prep',
    fullName: 'Certified Public Accountant (CPA) Exam Preparation',
    description: 'AI-powered CPA exam prep with thousands of practice questions, adaptive learning, and an AI tutor. Covers FAR, AUD, REG, BAR, ISC, and TCP sections with 2025 and 2026 AICPA blueprints.',
    url: 'https://voraprep.com/cpa',
    annualPrice: 99,
    monthlyPrice: 19,
    faqs: [
      { question: 'How many CPA practice questions does VoraPrep have?', answer: 'VoraPrep includes thousands of CPA practice questions covering all sections: FAR, AUD, REG, and the discipline sections (BAR, ISC, TCP). Questions are aligned to the 2025 and 2026 AICPA blueprints.' },
      { question: 'Does VoraPrep cover the new CPA exam format?', answer: 'Yes. VoraPrep is fully updated for the CPA Evolution exam launched in 2024, including the Core sections (FAR, AUD, REG) and all three Discipline sections (BAR, ISC, TCP).' },
      { question: 'How much does VoraPrep CPA prep cost?', answer: 'VoraPrep offers CPA exam prep starting at $19/month or $99/year, with founding member discounts saving over 40%. This is a fraction of the cost of traditional CPA review courses like Becker or Roger.' },
      { question: 'Can VoraPrep help me pass the CPA exam on my first try?', answer: 'VoraPrep uses adaptive AI learning that focuses on your weak areas, spaced repetition for long-term retention, and provides unlimited practice with detailed explanations to maximize your chances of passing.' },
      { question: 'Is VoraPrep a good alternative to Becker CPA Review?', answer: 'VoraPrep offers AI-powered adaptive learning, an AI tutor, and thousands of practice questions at a fraction of the price. While Becker costs $2,000+, VoraPrep starts at $99/year.' },
    ],
  },
  ea: {
    name: 'EA Exam Prep',
    fullName: 'Enrolled Agent (EA) Special Enrollment Examination Preparation',
    description: 'AI-powered EA exam prep for the IRS Special Enrollment Examination (SEE). Covers all 3 parts: Individuals, Businesses, and Representation with adaptive learning.',
    url: 'https://voraprep.com/ea-prep',
    annualPrice: 69,
    monthlyPrice: 14,
    faqs: [
      { question: 'What is the Enrolled Agent (EA) exam?', answer: 'The EA exam, officially called the Special Enrollment Examination (SEE), is a three-part IRS exam that grants unlimited representation rights before the IRS. It covers Individual Taxation (Part 1), Business Taxation (Part 2), and Representation, Practices & Procedures (Part 3).' },
      { question: 'How many EA practice questions does VoraPrep have?', answer: 'VoraPrep includes thousands of EA exam practice questions covering all three SEE parts, aligned with current IRS tax law and exam specifications.' },
      { question: 'How much does VoraPrep EA prep cost?', answer: 'VoraPrep EA exam prep starts at $14/month or $69/year, with founding member discounts. This is significantly more affordable than Gleim or Surgent EA review courses.' },
      { question: 'How long does it take to study for the EA exam?', answer: 'Most candidates need 60-90 hours of study per part (180-270 hours total). VoraPrep\'s adaptive learning optimizes your study time by focusing on weak areas.' },
    ],
  },
  cma: {
    name: 'CMA Exam Prep',
    fullName: 'Certified Management Accountant (CMA) Exam Preparation',
    description: 'AI-powered CMA exam prep covering Part 1 (Financial Planning, Performance & Analytics) and Part 2 (Strategic Financial Management) with adaptive learning.',
    url: 'https://voraprep.com/cma',
    annualPrice: 69,
    monthlyPrice: 14,
    faqs: [
      { question: 'What does the CMA exam cover?', answer: 'The CMA exam has two parts: Part 1 covers Financial Planning, Performance, and Analytics; Part 2 covers Strategic Financial Management. Both include multiple-choice questions and essays.' },
      { question: 'How many CMA practice questions does VoraPrep have?', answer: 'VoraPrep includes thousands of CMA practice questions for both parts, along with essay practice aligned to IMA exam specifications.' },
      { question: 'Is the CMA exam changing format?', answer: 'Yes, the IMA is transitioning the CMA exam from essay format to Case-Based Questions (CBQs) starting September 2026. VoraPrep is preparing content for both formats.' },
      { question: 'How much does VoraPrep CMA prep cost?', answer: 'VoraPrep CMA exam prep starts at $14/month or $69/year, with founding member discounts saving over 40%. Much more affordable than Wiley or Gleim CMA review.' },
    ],
  },
  cia: {
    name: 'CIA Exam Prep',
    fullName: 'Certified Internal Auditor (CIA) Exam Preparation',
    description: 'AI-powered CIA exam prep covering all 3 parts: Essentials of Internal Auditing, Practice of Internal Auditing, and Business Knowledge for Internal Auditing.',
    url: 'https://voraprep.com/cia',
    annualPrice: 69,
    monthlyPrice: 14,
    faqs: [
      { question: 'What is the CIA certification?', answer: 'The CIA (Certified Internal Auditor) is the only globally recognized certification for internal auditors, administered by The IIA. It validates expertise in internal audit practice, risk management, and governance.' },
      { question: 'How many parts does the CIA exam have?', answer: 'The CIA exam has 3 parts: Part 1 — Essentials of Internal Auditing, Part 2 — Practice of Internal Auditing, and Part 3 — Business Knowledge for Internal Auditing.' },
      { question: 'How much does VoraPrep CIA prep cost?', answer: 'VoraPrep CIA exam prep starts at $14/month or $69/year, with founding member discounts saving over 40%.' },
    ],
  },
  cfp: {
    name: 'CFP Exam Prep',
    fullName: 'Certified Financial Planner (CFP) Exam Preparation',
    description: 'AI-powered CFP exam prep covering all 8 CFP Board knowledge domains including financial planning, investment management, tax planning, retirement, and estate planning.',
    url: 'https://voraprep.com/cfp',
    annualPrice: 69,
    monthlyPrice: 14,
    faqs: [
      { question: 'What does the CFP exam cover?', answer: 'The CFP exam covers 8 principal knowledge domains: Professional Conduct & Regulation, General Principles of Financial Planning, Education Planning, Risk Management & Insurance, Investment Planning, Tax Planning, Retirement Savings & Income Planning, and Estate Planning.' },
      { question: 'How many CFP practice questions does VoraPrep have?', answer: 'VoraPrep includes thousands of CFP exam practice questions covering all 8 knowledge domains with case-study scenarios, aligned with CFP Board specifications.' },
      { question: 'How much does VoraPrep CFP prep cost?', answer: 'VoraPrep CFP exam prep starts at $14/month or $69/year, with founding member discounts. A fraction of Dalton or Kaplan CFP review costs.' },
    ],
  },
  cisa: {
    name: 'CISA Exam Prep',
    fullName: 'Certified Information Systems Auditor (CISA) Exam Preparation',
    description: 'AI-powered CISA exam prep covering all 5 ISACA domains: Information Systems Auditing Process, Governance & Management of IT, IS Acquisition Development & Implementation, IS Operations & Business Resilience, and Protection of Information Assets.',
    url: 'https://voraprep.com/cisa',
    annualPrice: 69,
    monthlyPrice: 14,
    faqs: [
      { question: 'What is the CISA certification?', answer: 'CISA (Certified Information Systems Auditor) is a globally recognized certification for IS audit, control, and security professionals, administered by ISACA.' },
      { question: 'How many CISA domains are on the exam?', answer: 'The CISA exam covers 5 domains: Domain 1 — Information Systems Auditing Process (21%), Domain 2 — Governance & Management of IT (16%), Domain 3 — IS Acquisition, Development & Implementation (18%), Domain 4 — IS Operations & Business Resilience (20%), Domain 5 — Protection of Information Assets (25%).' },
      { question: 'How much does VoraPrep CISA prep cost?', answer: 'VoraPrep CISA exam prep starts at $14/month or $69/year, with founding member discounts saving over 40%.' },
    ],
  },
};

// ============================================================================
// Hook to inject JSON-LD
// ============================================================================

/**
 * Inject Organization + WebSite structured data (use on homepage)
 */
export const useOrganizationSchema = () => {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    const addJsonLd = (data: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      scripts.push(script);
    };

    addJsonLd(ORGANIZATION_SCHEMA);
    addJsonLd(WEBSITE_SCHEMA);

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, []);
};

/**
 * Inject Course + FAQPage structured data (use on exam landing pages)
 */
export const useCourseSchema = (courseId: CourseId) => {
  useEffect(() => {
    const examData = EXAM_SEO_DATA[courseId];
    if (!examData) return;

    const scripts: HTMLScriptElement[] = [];

    const addJsonLd = (data: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      scripts.push(script);
    };

    // Course Schema
    const courseSchema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: examData.fullName,
      description: examData.description,
      url: examData.url,
      provider: {
        '@type': 'Organization',
        name: 'VoraPrep',
        url: 'https://voraprep.com',
      },
      offers: [
        {
          '@type': 'Offer',
          price: examData.monthlyPrice,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          name: 'Monthly Plan',
          category: 'Subscription',
        },
        {
          '@type': 'Offer',
          price: examData.annualPrice,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          name: 'Annual Plan',
          category: 'Subscription',
        },
      ],
      educationalLevel: 'Professional',
      inLanguage: 'en',
      isAccessibleForFree: false,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'Self-paced',
      },
    };

    addJsonLd(courseSchema);

    // FAQ Schema
    if (examData.faqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: examData.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };
      addJsonLd(faqSchema);
    }

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [courseId]);
};

export default useCourseSchema;
