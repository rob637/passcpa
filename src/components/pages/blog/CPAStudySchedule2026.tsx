import { Link } from 'react-router-dom';
import { useSEO } from '../../../hooks/useSEO';
import { useBreadcrumbs, useArticleSchema } from '../../../hooks/useStructuredData';
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const CPAStudySchedule2026 = () => {
  useSEO({
    title: 'CPA Exam Study Schedule 2026: Complete Week-by-Week Plan',
    description: 'A detailed, week-by-week CPA exam study schedule for 2026. How to plan your study time across FAR, AUD, REG, and your discipline section to pass all 4 parts.',
    canonicalUrl: 'https://voraprep.com/blog/cpa-exam-study-schedule-2026',
    ogType: 'article',
  });

  useBreadcrumbs([
    { name: 'Home', url: 'https://voraprep.com/' },
    { name: 'Blog', url: 'https://voraprep.com/blog' },
    { name: 'CPA Study Schedule 2026', url: 'https://voraprep.com/blog/cpa-exam-study-schedule-2026' },
  ]);

  useArticleSchema({
    headline: 'CPA Exam Study Schedule 2026: Complete Week-by-Week Plan',
    description: 'A detailed, week-by-week CPA exam study schedule for 2026.',
    author: 'VoraPrep Team',
    url: 'https://voraprep.com/blog/cpa-exam-study-schedule-2026',
    datePublished: '2026-02-17',
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-full">CPA</span>
            <span className="flex items-center gap-1 text-xs text-slate-400"><Clock className="w-3 h-3" /> 12 min read</span>
            <span className="flex items-center gap-1 text-xs text-slate-400"><Calendar className="w-3 h-3" /> February 17, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            CPA Exam Study Schedule 2026: Complete Week-by-Week Plan
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Planning your CPA exam study schedule is one of the most important decisions you'll make. This guide gives you a realistic, week-by-week plan to pass all 4 sections — whether you're studying full-time or working while you prep.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:mb-4 prose-li:mb-1">
          <h2>How Many Hours Do You Need?</h2>
          <p>
            Most successful CPA candidates study <strong>300–400 total hours</strong> across all 4 sections. Here's the typical breakdown per section:
          </p>
          <ul>
            <li><strong>FAR (Financial Accounting & Reporting):</strong> 100–120 hours — the most content-heavy section</li>
            <li><strong>AUD (Auditing & Attestation):</strong> 70–90 hours — conceptual but requires understanding audit process flows</li>
            <li><strong>REG (Taxation & Regulation):</strong> 80–100 hours — tax code rules and business law</li>
            <li><strong>Discipline Section (BAR/ISC/TCP):</strong> 60–80 hours — focused on your chosen specialty</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-5 my-6 not-prose">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Pro tip:</strong> These hours can be significantly reduced with adaptive learning. VoraPrep's AI engine identifies your weak areas so you don't waste time reviewing topics you already know.
            </p>
          </div>

          <h2>Choosing Your Section Order</h2>
          <p>
            There's no single best order — it depends on your background. Here are the two most popular approaches:
          </p>

          <h3>Approach 1: FAR First (Most Popular)</h3>
          <p>
            <strong>FAR → AUD → REG → Discipline</strong>
          </p>
          <p>
            Start with FAR because it has the most content and the lowest pass rate (~45%). Getting it done first gives you momentum and a 30-month window for the remaining sections. AUD builds on financial accounting concepts from FAR, so it flows naturally.
          </p>

          <h3>Approach 2: Strength First</h3>
          <p>
            Start with the section closest to your work experience. If you do tax preparation, start with REG. If you work in audit, start with AUD. Passing your first section builds confidence and teaches you how CPA study works.
          </p>

          <h2>The 6-Month Study Schedule (Working Full-Time)</h2>
          <p>
            This schedule assumes ~15 hours per week of study time (2 hours on weekdays, 5 hours on weekends). It covers all 4 sections in roughly 6 months.
          </p>

          <h3>Weeks 1–8: FAR (Financial Accounting & Reporting)</h3>
          <ul>
            <li><strong>Weeks 1–2:</strong> Conceptual framework, financial statements, revenue recognition</li>
            <li><strong>Weeks 3–4:</strong> Assets — inventory, PP&E, intangibles, leases</li>
            <li><strong>Weeks 5–6:</strong> Liabilities, equity, bonds, stock compensation, EPS</li>
            <li><strong>Week 7:</strong> Government & nonprofit accounting, state & local government</li>
            <li><strong>Week 8:</strong> Full review + practice exam simulations</li>
          </ul>

          <h3>Weeks 9–14: AUD (Auditing & Attestation)</h3>
          <ul>
            <li><strong>Weeks 9–10:</strong> Professional responsibilities, audit planning, risk assessment</li>
            <li><strong>Weeks 11–12:</strong> Audit evidence, sampling, internal controls (COSO)</li>
            <li><strong>Week 13:</strong> Audit reports, review & compilation, attestation engagements</li>
            <li><strong>Week 14:</strong> Full review + practice exam simulations</li>
          </ul>

          <h3>Weeks 15–21: REG (Taxation & Regulation)</h3>
          <ul>
            <li><strong>Weeks 15–16:</strong> Individual taxation — income, deductions, credits, AMT</li>
            <li><strong>Weeks 17–18:</strong> Business entities — C corps, S corps, partnerships, trusts</li>
            <li><strong>Week 19:</strong> Property transactions — basis, gains/losses, like-kind exchanges</li>
            <li><strong>Week 20:</strong> Business law — contracts, UCC, agency, bankruptcy</li>
            <li><strong>Week 21:</strong> Full review + practice exam simulations</li>
          </ul>

          <h3>Weeks 22–26: Discipline Section</h3>
          <ul>
            <li><strong>BAR:</strong> Data analytics, financial planning, prospective analysis, cost measurement</li>
            <li><strong>ISC:</strong> IT governance, cybersecurity, data management, system controls</li>
            <li><strong>TCP:</strong> Individual & entity tax planning, financial planning, compliance research</li>
          </ul>

          <h2>Daily Study Routine That Works</h2>
          <p>
            The most effective study session follows this pattern:
          </p>
          <ol>
            <li><strong>Review (15 min):</strong> Start with spaced repetition review of previously studied material</li>
            <li><strong>Learn (30 min):</strong> Study new content — read lessons, take notes on key concepts</li>
            <li><strong>Practice (45 min):</strong> Answer practice questions on today's topics</li>
            <li><strong>Analyze (15 min):</strong> Review incorrect answers — understand <em>why</em> each wrong answer is wrong</li>
          </ol>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-5 my-6 not-prose">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Why this works:</strong> Active practice (answering questions) is 2-3x more effective for retention than passive review (watching videos or re-reading notes). This is called the "testing effect" — one of the most well-established findings in learning science.
            </p>
          </div>

          <h2>Avoiding the 30-Month Trap</h2>
          <p>
            You have 30 months from passing your first section to pass all remaining sections. If a credit expires, you must retake that section. Here's how to avoid this:
          </p>
          <ul>
            <li><strong>Don't spread out too much.</strong> Taking more than 2 months between sections increases the risk of forgetting earlier material.</li>
            <li><strong>Schedule your exam before you feel "ready."</strong> Research shows candidates who schedule early study more consistently.</li>
            <li><strong>Use spaced repetition between sections.</strong> Even 10 minutes/day of review keeps earlier concepts fresh.</li>
          </ul>

          <h2>Key Takeaways</h2>
        </div>

        <div className="space-y-3 my-6">
          {[
            'Plan for 300–400 total hours across all 4 sections',
            'Start with FAR or your strongest section — both strategies work',
            'Study 15+ hours/week to pass all 4 in about 6 months',
            'Focus on active practice over passive video watching',
            'Use spaced repetition to retain material long-term',
            'Schedule your exam date early to create accountability',
          ].map((tip) => (
            <div key={tip} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">{tip}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-center text-white mt-10">
          <h3 className="text-xl font-bold mb-2">Start your CPA prep today</h3>
          <p className="text-blue-100 mb-4 text-sm">
            VoraPrep's adaptive learning engine builds a personalized study plan based on your target exam date.
          </p>
          <Link
            to="/register?course=cpa"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default CPAStudySchedule2026;
