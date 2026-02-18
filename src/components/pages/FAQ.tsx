import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import { useBreadcrumbs } from '../../hooks/useStructuredData';
import { ChevronDown, Search, ArrowRight } from 'lucide-react';

// ============================================================================
// FAQ Data
// ============================================================================

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  id: string;
  label: string;
  title: string;
  faqs: FAQItem[];
}

const FAQ_SECTIONS: FAQSection[] = [
  {
    id: 'general',
    label: 'General',
    title: 'About VoraPrep',
    faqs: [
      {
        question: 'What is VoraPrep?',
        answer: 'VoraPrep is an AI-powered exam prep platform for professional certifications including CPA, EA, CMA, CIA, CFP, and CISA. We combine adaptive learning, spaced repetition, and an AI tutor to help you pass your exam on the first try — at a fraction of the cost of traditional review courses.',
      },
      {
        question: 'How is VoraPrep different from Becker, Wiley, or Surgent?',
        answer: 'VoraPrep uses AI and learning science (adaptive algorithms, SM-2 spaced repetition) to personalize your study plan — features that legacy providers charge $2,000–$4,000 for or don\'t offer at all. Our CPA prep starts at $29/month with founder pricing, vs. $2,000+ for Becker. You also get an AI tutor that can explain concepts, work through problems, and answer your questions 24/7.',
      },
      {
        question: 'Is there a free trial?',
        answer: 'Yes. VoraPrep offers a 14-day free trial with full access to every feature — no credit card required. You get unlimited practice questions, lessons, flashcards, the AI tutor, and exam simulations during your trial.',
      },
      {
        question: 'How much does VoraPrep cost?',
        answer: 'Pricing varies by exam. CPA prep starts at $29/month or $249/year with our current founding member discount (regular price: $59/month or $449/year). EA and CIA prep start at $19/month or $149/year. CMA, CFP, and CISA start at $25/month or $199/year. All plans include a 14-day free trial.',
      },
      {
        question: 'What is founder pricing?',
        answer: 'Founding members lock in permanently discounted rates — over 40% off regular prices. This pricing is available to the first 300 subscribers per exam and is honored for as long as your subscription remains active. Once founder spots fill up, only regular pricing will be available.',
      },
      {
        question: 'Does VoraPrep have a pass guarantee?',
        answer: 'Yes. If you complete our study plan (80%+ content engagement, mock exams, and minimum 3 months of active study) and don\'t pass your exam, you\'re eligible for a full refund or extended access. You\'ll need to provide your official score report as proof. See our Pass Guarantee page for full terms.',
      },
      {
        question: 'Can I switch between exams?',
        answer: 'Each exam requires its own subscription, but you can have a free trial active on one exam while being subscribed to another. Your progress is tracked separately for each certification.',
      },
      {
        question: 'Does VoraPrep work on mobile?',
        answer: 'Yes. VoraPrep works as a progressive web app (PWA) on any device — phone, tablet, or desktop. You can install it on your home screen for a native app-like experience with offline support. No app store download required.',
      },
    ],
  },
  {
    id: 'features',
    label: 'Features',
    title: 'Features & Study Tools',
    faqs: [
      {
        question: 'What is adaptive learning?',
        answer: 'VoraPrep\'s adaptive learning engine tracks your performance on every question and identifies your weak areas. It then prioritizes those topics in your study plan so you spend time where it matters most — not reviewing what you already know.',
      },
      {
        question: 'What is spaced repetition?',
        answer: 'Spaced repetition is a scientifically-proven learning technique that schedules reviews at increasing intervals based on how well you know each concept. VoraPrep uses the SM-2 algorithm (the same one used by medical students) to optimize your review schedule and maximize long-term retention.',
      },
      {
        question: 'What is the AI tutor?',
        answer: 'Vory, VoraPrep\'s AI tutor powered by Google Gemini, can explain any concept, walk you through problems step-by-step, break down confusing answer explanations, and quiz you on topics you\'re struggling with. It\'s available 24/7 and included with all plans.',
      },
      {
        question: 'Does VoraPrep have a simulated exam mode?',
        answer: 'Yes. VoraPrep includes full-length simulated exams that replicate the real testing environment — timed sections, realistic question distribution, and scoring that mirrors the actual exam. This helps you build test-taking stamina and identify areas that need more work.',
      },
      {
        question: 'Are the questions aligned to current exam blueprints?',
        answer: 'Yes. All questions are mapped to the latest official exam blueprints and updated as requirements change. For CPA, we cover both the 2025 and 2026 AICPA blueprints. Content is continuously reviewed for accuracy and relevance.',
      },
      {
        question: 'Does VoraPrep include lessons, or is it just practice questions?',
        answer: 'VoraPrep includes comprehensive lessons, practice questions, flashcards, task-based simulations (for CPA), and exam simulations. It\'s a complete study solution — not just a question bank.',
      },
    ],
  },
  {
    id: 'cpa',
    label: 'CPA',
    title: 'CPA Exam',
    faqs: [
      {
        question: 'How many sections does the CPA exam have?',
        answer: 'The CPA exam has 4 sections: 3 Core sections that everyone takes (FAR — Financial Accounting & Reporting, AUD — Auditing & Attestation, REG — Taxation & Regulation) plus 1 Discipline section you choose (BAR — Business Analysis & Reporting, ISC — Information Systems & Controls, or TCP — Tax Compliance & Planning).',
      },
      {
        question: 'What is the CPA exam passing score?',
        answer: 'You need a score of 75 on each section to pass the CPA exam. Scores range from 0 to 99 and are based on a scaled scoring model, not a simple percentage correct.',
      },
      {
        question: 'How long do I have to pass all 4 CPA exam sections?',
        answer: 'You have 30 months (2.5 years) from the date you pass your first section to pass all remaining sections. If a section credit expires, you must retake and pass that section again.',
      },
      {
        question: 'What are the CPA exam eligibility requirements?',
        answer: 'Requirements vary by state, but most states require 150 semester credit hours of education (including a bachelor\'s degree), with specific coursework in accounting and business. Some states allow you to sit for the exam with 120 credits but require 150 for licensure.',
      },
      {
        question: 'How much does the CPA exam cost?',
        answer: 'Total CPA exam costs are approximately $1,000–$1,500, including: application fee ($50–$200 depending on state), exam fees (~$238 per section × 4 = ~$952), and the ethics exam ($189). This doesn\'t include study materials.',
      },
      {
        question: 'What is the CPA exam pass rate?',
        answer: 'CPA exam pass rates vary by section but typically range from 45–55%. FAR historically has the lowest pass rate (~45%), while AUD tends to be slightly higher (~50%). VoraPrep\'s adaptive learning approach is designed to help you beat those averages.',
      },
      {
        question: 'How many hours should I study for the CPA exam?',
        answer: 'Most candidates study 300–400 total hours across all 4 sections (about 80–100 hours per section). VoraPrep\'s adaptive learning can reduce this by focusing your time on weak areas rather than reviewing material you already know.',
      },
    ],
  },
  {
    id: 'ea',
    label: 'EA',
    title: 'Enrolled Agent (EA) Exam',
    faqs: [
      {
        question: 'What is an Enrolled Agent?',
        answer: 'An Enrolled Agent (EA) is a federally-authorized tax practitioner with unlimited rights to represent taxpayers before the IRS. It\'s the highest credential awarded by the IRS and is valid in all 50 states — unlike a CPA license, which is state-specific.',
      },
      {
        question: 'How many parts does the EA exam have?',
        answer: 'The EA exam (Special Enrollment Examination, or SEE) has 3 parts: Part 1 — Individual Taxation, Part 2 — Business Taxation, and Part 3 — Representation, Practices & Procedures. Each part has 100 multiple-choice questions with a 3.5-hour time limit.',
      },
      {
        question: 'What is the EA exam passing score?',
        answer: 'You need a scaled score of 105 out of 130 on each part to pass the EA exam.',
      },
      {
        question: 'Do I need a degree to take the EA exam?',
        answer: 'No. The EA exam has no education requirements — anyone can take it. There are no prerequisites for degree, coursework, or work experience. This makes it one of the most accessible professional certifications available.',
      },
      {
        question: 'How long does it take to study for the EA exam?',
        answer: 'Most candidates need 60–90 hours of study per part (180–270 hours total). Part 1 (Individuals) is typically the easiest, while Part 2 (Businesses) requires the most study time.',
      },
      {
        question: 'What is the EA exam pass rate?',
        answer: 'EA exam pass rates are generally between 60–70% per part, making it more achievable than the CPA exam. The IRS does not publish official pass rates, but these figures come from industry surveys.',
      },
    ],
  },
  {
    id: 'cma',
    label: 'CMA',
    title: 'CMA Exam',
    faqs: [
      {
        question: 'What does the CMA exam cover?',
        answer: 'The CMA exam has 2 parts: Part 1 covers Financial Planning, Performance & Analytics (budgeting, cost management, internal controls, technology & analytics). Part 2 covers Strategic Financial Management (financial statement analysis, corporate finance, decision analysis, risk management, investment decisions).',
      },
      {
        question: 'What is the CMA exam format?',
        answer: 'Each CMA exam part currently includes 100 multiple-choice questions (3 hours) and 2 essay scenarios (1 hour). Starting September 2026, the IMA is replacing the essay section with Case-Based Questions (CBQs).',
      },
      {
        question: 'What are the CMA exam eligibility requirements?',
        answer: 'You need a bachelor\'s degree from an accredited institution and 2 years of continuous professional experience in management accounting or financial management. You can take the exam before completing the experience requirement.',
      },
      {
        question: 'How is the CMA different from the CPA?',
        answer: 'The CPA focuses on public accounting, auditing, and tax. The CMA focuses on management accounting, financial planning, and strategic decision-making within organizations. CMAs typically work in corporate finance, FP&A, and management roles. Many professionals hold both.',
      },
      {
        question: 'What is the CMA exam pass rate?',
        answer: 'CMA exam pass rates average around 45% globally. Part 1 pass rates tend to be slightly higher than Part 2. The exam is considered challenging, but focused study with adaptive tools can significantly improve your chances.',
      },
    ],
  },
  {
    id: 'cia',
    label: 'CIA',
    title: 'CIA Exam',
    faqs: [
      {
        question: 'What is the CIA certification?',
        answer: 'The CIA (Certified Internal Auditor) is the only globally recognized certification for internal auditors. Administered by The Institute of Internal Auditors (IIA), it validates expertise in internal audit practices, risk management, governance, and business processes.',
      },
      {
        question: 'How many parts does the CIA exam have?',
        answer: 'The CIA exam has 3 parts: Part 1 — Essentials of Internal Auditing (125 questions, 2.5 hours), Part 2 — Practice of Internal Auditing (100 questions, 2 hours), and Part 3 — Business Knowledge for Internal Auditing (100 questions, 2 hours).',
      },
      {
        question: 'What is the CIA exam passing score?',
        answer: 'You need a scaled score of 600 out of 750 on each part to pass the CIA exam.',
      },
      {
        question: 'Do I need audit experience to take the CIA exam?',
        answer: 'You need a bachelor\'s degree plus 2 years of internal audit experience (or a master\'s degree plus 1 year). However, you can begin taking the exam before completing the experience requirement and have up to 3 years after passing to fulfill it.',
      },
      {
        question: 'How is the CIA different from CISA?',
        answer: 'The CIA focuses on internal auditing across all business functions — financial, operational, compliance, and strategic. CISA focuses specifically on information systems auditing, IT governance, and cybersecurity. CIA is broader; CISA is specialized for IT audit.',
      },
    ],
  },
  {
    id: 'cfp',
    label: 'CFP',
    title: 'CFP Exam',
    faqs: [
      {
        question: 'What does the CFP exam cover?',
        answer: 'The CFP exam covers 8 knowledge domains: Professional Conduct & Regulation, General Financial Planning Principles, Education Planning, Risk Management & Insurance, Investment Planning, Tax Planning, Retirement Savings & Income Planning, and Estate Planning. Questions are scenario-based using case studies.',
      },
      {
        question: 'What is the CFP exam format?',
        answer: 'The CFP exam is a single comprehensive exam with 170 multiple-choice questions over two 3-hour sessions (with a 40-minute break). It\'s offered over 3 testing windows per year (March, July, November).',
      },
      {
        question: 'What are the CFP exam eligibility requirements?',
        answer: 'You need a bachelor\'s degree, completion of a CFP Board-registered education program, and 6,000 hours of professional experience (or 4,000 hours in an apprenticeship). You can sit for the exam after completing the education requirement.',
      },
      {
        question: 'What is the CFP exam pass rate?',
        answer: 'The CFP exam pass rate averages around 60-65% for first-time test-takers. It\'s considered a challenging but achievable exam with proper preparation.',
      },
      {
        question: 'How long should I study for the CFP exam?',
        answer: 'The CFP Board recommends 250+ hours of study. Most successful candidates study for 3–6 months, focusing on weak domains and spending significant time on practice questions and case study scenarios.',
      },
    ],
  },
  {
    id: 'cisa',
    label: 'CISA',
    title: 'CISA Exam',
    faqs: [
      {
        question: 'What is the CISA certification?',
        answer: 'CISA (Certified Information Systems Auditor) is a globally recognized certification for IS audit, control, and security professionals. Administered by ISACA, it validates your ability to assess vulnerabilities, report on compliance, and implement controls for information systems.',
      },
      {
        question: 'How many domains does the CISA exam cover?',
        answer: 'The CISA exam covers 5 domains: Domain 1 — Information Systems Auditing Process (21%), Domain 2 — Governance & Management of IT (16%), Domain 3 — Information Systems Acquisition, Development & Implementation (18%), Domain 4 — Information Systems Operations & Business Resilience (20%), Domain 5 — Protection of Information Assets (25%).',
      },
      {
        question: 'What is the CISA exam passing score?',
        answer: 'You need a scaled score of 450 out of 800 to pass the CISA exam. The exam has 150 multiple-choice questions with a 4-hour time limit.',
      },
      {
        question: 'What experience do I need for CISA certification?',
        answer: 'CISA requires 5 years of professional IS auditing, control, or security work experience. Substitutions are available: a bachelor\'s degree can substitute for 1 year, a master\'s degree for 2 years, and certain certifications (CISM, CGEIT) can substitute for up to 2 years.',
      },
      {
        question: 'How long should I study for the CISA exam?',
        answer: 'Most candidates study 150–200 hours over 3–4 months. Domain 5 (Protection of Information Assets) carries the highest weight at 25%, so allocate study time proportionally to domain weights.',
      },
    ],
  },
];

// Flatten all FAQs for structured data
const ALL_FAQS = FAQ_SECTIONS.flatMap((section) => section.faqs);

// ============================================================================
// FAQ Accordion Component
// ============================================================================

const FAQAccordion = ({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) => (
  <div className="border-b border-slate-200 dark:border-slate-700 last:border-0">
    <button
      onClick={onToggle}
      className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      aria-expanded={isOpen}
    >
      <span className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-2">
        {faq.question}
      </span>
      <ChevronDown
        className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
    {isOpen && (
      <div className="pb-5 pr-8">
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
      </div>
    )}
  </div>
);

// ============================================================================
// Main FAQ Page Component
// ============================================================================

const FAQ = () => {
  useSEO({
    title: 'Frequently Asked Questions',
    description:
      'Answers to common questions about VoraPrep, pricing, free trial, pass guarantee, and everything you need to know about the CPA, EA, CMA, CIA, CFP, and CISA exams.',
    canonicalUrl: 'https://voraprep.com/faq',
  });

  useBreadcrumbs([
    { name: 'Home', url: 'https://voraprep.com/' },
    { name: 'FAQ', url: 'https://voraprep.com/faq' },
  ]);

  const [activeSection, setActiveSection] = useState('general');
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Inject FAQPage structured data
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ALL_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const toggleFAQ = (key: string) => {
    setOpenFAQs((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Filter FAQs by search query
  const filteredSections = searchQuery.trim()
    ? FAQ_SECTIONS.map((section) => ({
        ...section,
        faqs: section.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((section) => section.faqs.length > 0)
    : FAQ_SECTIONS.filter((section) => section.id === activeSection);

  const totalQuestions = ALL_FAQS.length;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Everything you need to know about VoraPrep and the exams we cover.
            {' '}{totalQuestions} answers across {FAQ_SECTIONS.length} categories.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search all FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Tabs */}
        {!searchQuery.trim() && (
          <div className="flex flex-wrap gap-2 mb-8">
            {FAQ_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Content */}
        {filteredSections.map((section) => (
          <div key={section.id} className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {section.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {section.faqs.length} question{section.faqs.length !== 1 ? 's' : ''}
            </p>
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-200 dark:divide-slate-700 px-6">
              {section.faqs.map((faq, i) => {
                const key = `${section.id}-${i}`;
                return (
                  <FAQAccordion
                    key={key}
                    faq={faq}
                    isOpen={openFAQs.has(key)}
                    onToggle={() => toggleFAQ(key)}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {searchQuery.trim() && filteredSections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No questions match "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Clear search
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Start your free trial and explore VoraPrep for yourself — or reach out to our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/help"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
