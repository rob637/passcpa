import { Link } from 'react-router-dom';
import { useSEO } from '../../../hooks/useSEO';
import { useBreadcrumbs, useArticleSchema } from '../../../hooks/useStructuredData';
import { ArrowLeft, ArrowRight, Calendar, Clock, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

const HowToPassFAR = () => {
  useSEO({
    title: 'How to Pass FAR on Your First Try: 15 Proven Strategies',
    description: 'Struggling with CPA FAR? These 15 strategies will help you pass Financial Accounting & Reporting on your first attempt. Study tips, time management, and topic priorities.',
    canonicalUrl: 'https://voraprep.com/blog/how-to-pass-far-first-try',
    ogType: 'article',
  });

  useBreadcrumbs([
    { name: 'Home', url: 'https://voraprep.com/' },
    { name: 'Blog', url: 'https://voraprep.com/blog' },
    { name: 'How to Pass FAR', url: 'https://voraprep.com/blog/how-to-pass-far-first-try' },
  ]);

  useArticleSchema({
    title: 'How to Pass FAR on Your First Try: 15 Proven Strategies',
    description: '15 proven strategies to pass the CPA FAR section on your first attempt.',
    url: 'https://voraprep.com/blog/how-to-pass-far-first-try',
    datePublished: '2026-02-17',
  });

  const strategies = [
    {
      number: 1,
      title: 'Start with FAR (if you can)',
      content: 'FAR has the most content and the lowest pass rate (~45%). Passing it first gives you momentum and the maximum 30-month window to complete the other sections. Most successful candidates who start with FAR report higher confidence going into their remaining exams.',
    },
    {
      number: 2,
      title: 'Allocate 100–120 study hours',
      content: 'FAR requires more study time than any other CPA section. Plan for 100–120 hours minimum. If you study 15 hours per week, that\'s about 7–8 weeks of dedicated FAR prep. Don\'t try to rush it — FAR rewards thorough preparation.',
    },
    {
      number: 3,
      title: 'Master the conceptual framework first',
      content: 'Before diving into specific topics, make sure you understand GAAP\'s conceptual framework — qualitative characteristics, recognition, measurement, and elements of financial statements. Nearly every FAR topic connects back to these fundamentals.',
    },
    {
      number: 4,
      title: 'Prioritize by AICPA blueprint weight',
      content: 'The AICPA blueprint tells you exactly how much each area is tested. For FAR in 2026: Financial Reporting (25–35%), Select Transactions (30–40%), State & Local Governments (5–15%), and Select Financial Statement Items (25–35%). Spend your time proportionally.',
    },
    {
      number: 5,
      title: 'Do 40–50 MCQs per day during final review',
      content: 'The "testing effect" is one of the most validated learning strategies in cognitive science. During your final 2 weeks, aim for 40–50 MCQs per day. Active recall through practice questions is 2–3x more effective than re-reading notes.',
    },
    {
      number: 6,
      title: 'Don\'t skip government accounting',
      content: 'Many candidates underprepare for government and nonprofit accounting because it\'s unfamiliar. It represents 5–15% of FAR — enough to make the difference between passing and failing. Learn fund accounting, GASB standards, and government-wide vs. fund financial statements.',
    },
    {
      number: 7,
      title: 'Understand journal entries, don\'t memorize them',
      content: 'FAR questions test whether you understand the "why" behind journal entries. For every transaction type, ask: What accounts are affected? Is this a debit or credit? Why? If you understand the logic, you can handle any variation the exam throws at you.',
    },
    {
      number: 8,
      title: 'Practice Task-Based Simulations (TBS) early',
      content: 'TBS count for 50% of your FAR score. Don\'t wait until the last week to practice them. Start doing TBS at least 3 weeks before your exam. Focus on research simulations (you can look up ASC references) and journal entry sims.',
    },
    {
      number: 9,
      title: 'Learn to use the authoritative literature',
      content: 'The CPA exam gives you access to the FASB Codification during TBS. Learning to quickly search for ASC references can help you answer research simulations correctly — these are essentially "free points" if you know how to navigate the codification.',
    },
    {
      number: 10,
      title: 'Focus on the new 2026 blueprint changes',
      content: 'The AICPA updates blueprints periodically. For 2026, make sure your study materials reflect the current blueprint. Key areas with recent changes include revenue recognition (ASC 606), leases (ASC 842), and credit losses (ASC 326).',
    },
    {
      number: 11,
      title: 'Time yourself during practice',
      content: 'FAR gives you 4 hours for 5 testlets. Practice under timed conditions at least once a week. A common mistake is spending too long on MCQs and running out of time for TBS — where half your score comes from.',
    },
    {
      number: 12,
      title: 'Use spaced repetition for retention',
      content: 'Studying a topic once and moving on is inefficient. Use spaced repetition — review material at increasing intervals (1 day, 3 days, 7 days, 14 days). This is proven to improve long-term retention by 200–300% compared to massed studying.',
    },
    {
      number: 13,
      title: 'Don\'t aim for perfection — aim for 75',
      content: 'You need a 75 to pass (on a 0–99 scale). You don\'t need to master every single topic. Focus on high-weight areas and make sure you\'re solid on the most frequently tested topics. It\'s better to know 80% of topics well than 100% of topics superficially.',
    },
    {
      number: 14,
      title: 'Take at least two full practice exams',
      content: 'Simulate real exam conditions: 4 hours, no notes, no breaks between testlets. This builds exam stamina, helps you practice time management, and reduces test-day anxiety. Aim for practice scores of 65+ before sitting for the real exam.',
    },
    {
      number: 15,
      title: 'Review wrong answers more than right ones',
      content: 'When you get a question wrong, don\'t just read the correct answer — understand why each incorrect option is wrong. This "elaborative interrogation" technique helps you recognize similar patterns on the actual exam.',
    },
  ];

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
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full">FAR</span>
            <span className="flex items-center gap-1 text-xs text-slate-400"><Clock className="w-3 h-3" /> 14 min read</span>
            <span className="flex items-center gap-1 text-xs text-slate-400"><Calendar className="w-3 h-3" /> February 17, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            How to Pass FAR on Your First Try: 15 Proven Strategies
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            FAR (Financial Accounting & Reporting) is widely considered the hardest CPA exam section. With a pass rate hovering around 45%, nearly half of candidates fail on their first attempt. Here are 15 strategies to help you beat those odds.
          </p>
        </header>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Avg. Pass Rate', value: '~45%', color: 'text-red-600 dark:text-red-400' },
            { label: 'Study Hours', value: '100–120', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Exam Length', value: '4 hours', color: 'text-slate-700 dark:text-slate-300' },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Strategies */}
        <div className="space-y-6">
          {strategies.map((strategy) => (
            <div key={strategy.number} className="border-l-2 border-blue-200 dark:border-blue-800 pl-5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-start gap-2 mb-2">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-mono mt-0.5">{String(strategy.number).padStart(2, '0')}</span>
                {strategy.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[0.95rem]">{strategy.content}</p>
            </div>
          ))}
        </div>

        {/* Common Mistakes */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-6 mt-10">
          <h3 className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 mb-4">
            <AlertTriangle className="w-5 h-5" /> Common FAR Mistakes to Avoid
          </h3>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Spending too much time on videos instead of doing practice questions</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Ignoring government accounting because it "probably won't show up"</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Waiting until the last week to practice Task-Based Simulations</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Studying for 4+ months — fatigue sets in and earlier material fades</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Not timing practice sessions and running out of time on exam day</li>
          </ul>
        </div>

        {/* Key takeaways */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-6 mt-6">
          <h3 className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-300 mb-4">
            <Lightbulb className="w-5 h-5" /> Key Takeaways
          </h3>
          <div className="space-y-2">
            {[
              'FAR requires 100–120 hours — plan for 7–8 weeks of focused study',
              'Active practice (MCQs + TBS) is more effective than passive review',
              'Focus on high-weight blueprint areas: financial reporting + select transactions',
              'Start TBS practice at least 3 weeks before your exam date',
              'Use spaced repetition to retain material across the study period',
              'You need 75, not 100 — prioritize breadth over depth',
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-center text-white mt-10">
          <h3 className="text-xl font-bold mb-2">Start your FAR prep today</h3>
          <p className="text-blue-100 mb-4 text-sm">
            VoraPrep's adaptive engine focuses your study time on the topics you need to review most.
          </p>
          <Link
            to="/register?course=cpa"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
          >
            Start Free CPA Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default HowToPassFAR;
