import { Link } from 'react-router-dom';
import { useSEO } from '../../../hooks/useSEO';
import { useBreadcrumbs, useArticleSchema } from '../../../hooks/useStructuredData';
import { ArrowLeft, ArrowRight, Calendar, Clock, DollarSign, BookOpen, Briefcase, Scale } from 'lucide-react';

const EAvsCPA = () => {
  useSEO({
    title: 'EA vs CPA: Which Certification Should You Get in 2026?',
    description: 'A detailed comparison of the Enrolled Agent (EA) vs CPA certification. Salary, career paths, exam difficulty, requirements, and which credential is right for you.',
    canonicalUrl: 'https://voraprep.com/blog/ea-vs-cpa-which-certification',
    ogType: 'article',
  });

  useBreadcrumbs([
    { name: 'Home', url: 'https://voraprep.com/' },
    { name: 'Blog', url: 'https://voraprep.com/blog' },
    { name: 'EA vs CPA', url: 'https://voraprep.com/blog/ea-vs-cpa-which-certification' },
  ]);

  useArticleSchema({
    title: 'EA vs CPA: Which Certification Should You Get in 2026?',
    description: 'A detailed comparison of the Enrolled Agent (EA) vs CPA certification.',
    url: 'https://voraprep.com/blog/ea-vs-cpa-which-certification',
    datePublished: '2026-02-17',
  });

  const comparisonRows = [
    { category: 'Exam Sections', ea: '3 sections (SEE 1–3)', cpa: '4 sections (FAR, AUD, REG + Discipline)' },
    { category: 'Exam Length', ea: '~10.5 hours total', cpa: '~16 hours total' },
    { category: 'Study Hours', ea: '150–250 hours', cpa: '300–400 hours' },
    { category: 'Pass Rate', ea: '~55–65% per part', cpa: '~45–55% per part' },
    { category: 'Education Req.', ea: 'None — high school diploma', cpa: '150 credit hours (bachelor\'s + 30)' },
    { category: 'Experience Req.', ea: 'None', cpa: '1–2 years supervised (varies by state)' },
    { category: 'Exam Cost', ea: '~$600 (3 sections)', cpa: '~$1,500–$2,500 (varies by state)' },
    { category: 'Scope of Practice', ea: 'Tax only (federal, unlimited)', cpa: 'Tax, audit, advisory, attestation' },
    { category: 'License Authority', ea: 'IRS (federal, all 50 states)', cpa: 'State board (per-state license)' },
    { category: 'Avg. Salary (2025)', ea: '$55,000–$80,000', cpa: '$70,000–$120,000+' },
    { category: 'CPE / CE', ea: '72 hours per 3-year cycle', cpa: '40 hours/year (varies by state)' },
    { category: 'Time to Complete', ea: '3–6 months', cpa: '6–18 months' },
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
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-full">EA</span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded-full">CPA</span>
            <span className="flex items-center gap-1 text-xs text-slate-400"><Clock className="w-3 h-3" /> 10 min read</span>
            <span className="flex items-center gap-1 text-xs text-slate-400"><Calendar className="w-3 h-3" /> February 17, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            EA vs CPA: Which Certification Should You Get in 2026?
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            The Enrolled Agent (EA) and Certified Public Accountant (CPA) are the two most recognized credentials in accounting and tax. Here's an honest comparison to help you decide which one to pursue.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:mb-4 prose-li:mb-1">
          <h2>The Key Difference</h2>
          <p>
            The EA is a <strong>tax-specific credential</strong> issued by the IRS. It gives you unlimited representation rights before the IRS — the same authority as CPAs and tax attorneys — but only for tax matters.
          </p>
          <p>
            The CPA is a <strong>broad accounting credential</strong> issued by state boards. It covers tax, audit, financial reporting, advisory, and attestation. If you want to sign audit opinions or prepare reviewed financial statements, you need a CPA license.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="my-8 overflow-x-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Side-by-Side Comparison</h2>
          <table className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                <th className="text-left px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 w-[28%]">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400 w-[36%]">Enrolled Agent (EA)</th>
                <th className="text-left px-4 py-3 font-semibold text-blue-700 dark:text-blue-400 w-[36%]">CPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {comparisonRows.map((row) => (
                <tr key={row.category} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{row.category}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.ea}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.cpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:mb-4 prose-li:mb-1">
          <h2>When to Choose the EA</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 my-6">
          {[
            { icon: BookOpen, title: 'No degree required', desc: 'The EA exam has no education prerequisites — anyone can sit for it.' },
            { icon: DollarSign, title: 'Lower cost & faster', desc: 'Total exam cost is ~$600 and most candidates pass within 3–6 months.' },
            { icon: Briefcase, title: 'Tax career focus', desc: 'Ideal if you want to run a tax practice, work in tax preparation, or represent clients before the IRS.' },
            { icon: Scale, title: 'Same IRS authority', desc: 'EAs have the same unlimited representation rights before the IRS as CPAs and attorneys.' },
          ].map((item) => (
            <div key={item.title} className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{item.title}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:mb-4 prose-li:mb-1">
          <h2>When to Choose the CPA</h2>
          <ul>
            <li><strong>You want to work in public accounting</strong> — Big 4, mid-size, or regional firms typically require (or strongly prefer) a CPA license.</li>
            <li><strong>You need to sign audit opinions</strong> — Only CPAs (among accountants) can issue audit and attestation reports.</li>
            <li><strong>You want maximum career versatility</strong> — CPA opens doors to CFO roles, advisory, forensic accounting, and controllership positions.</li>
            <li><strong>You already have 150 credits</strong> — If you've already met the education requirements, the CPA's biggest barrier is removed.</li>
            <li><strong>Long-term earning potential matters most</strong> — CPAs generally earn $15,000–$40,000 more per year than EAs in comparable roles.</li>
          </ul>

          <h2>Can You Get Both?</h2>
          <p>
            Yes — and some professionals do. A common path is to get the EA first (since it's faster and has no education requirement), build a tax career, then pursue the CPA later. The tax knowledge from EA prep overlaps significantly with the REG section of the CPA exam.
          </p>
          <p>
            VoraPrep covers both the EA and CPA exams so you can seamlessly transition from one to the other.
          </p>

          <h2>The Bottom Line</h2>
          <p>
            Choose the <strong>EA</strong> if you want to specialize in tax, start quickly, and don't want to deal with education requirements. Choose the <strong>CPA</strong> if you want maximum career flexibility in accounting, finance, or advisory. Both are respected credentials — the right choice depends on your goals.
          </p>
        </div>

        {/* Decision Helper */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 my-8">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Decision Guide</h3>
          <div className="space-y-3">
            {[
              { q: 'No bachelor\'s degree?', a: 'EA', reason: 'No education requirement' },
              { q: 'Want to work in Big 4?', a: 'CPA', reason: 'Required or strongly preferred' },
              { q: 'Tax-only career?', a: 'EA', reason: 'Fastest path to IRS representation' },
              { q: 'Want to be CFO someday?', a: 'CPA', reason: 'Expected credential for financial leadership' },
              { q: 'Budget under $1,000?', a: 'EA', reason: '~$600 exam cost vs $1,500+' },
              { q: 'Need audit authority?', a: 'CPA', reason: 'Only CPAs can sign audit opinions' },
            ].map((item) => (
              <div key={item.q} className="flex items-center gap-3 text-sm">
                <span className="text-slate-600 dark:text-slate-400 w-[45%]">{item.q}</span>
                <span className={`font-semibold w-[10%] ${item.a === 'EA' ? 'text-emerald-600' : 'text-blue-600'}`}>{item.a}</span>
                <span className="text-slate-500 dark:text-slate-500 w-[45%]">— {item.reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-center text-white mt-10">
          <h3 className="text-xl font-bold mb-2">Ready to start studying?</h3>
          <p className="text-blue-100 mb-4 text-sm">
            VoraPrep offers both EA and CPA prep with adaptive AI-powered learning.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/register?course=ea"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              Start EA Prep <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register?course=cpa"
              className="inline-flex items-center gap-2 bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-400 transition-colors text-sm"
            >
              Start CPA Prep <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EAvsCPA;
