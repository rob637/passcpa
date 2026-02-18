import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useSEO } from '../../../hooks/useSEO';
import { useBreadcrumbs } from '../../../hooks/useStructuredData';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import logger from '../../../utils/logger';

// ============================================================================
// Article Metadata
// ============================================================================

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: 'cpa-exam-study-schedule-2026',
    title: 'CPA Exam Study Schedule 2026: Complete Week-by-Week Plan',
    description: 'A detailed, week-by-week CPA exam study schedule for 2026. How to plan your study time across FAR, AUD, REG, and your discipline section to pass all 4 parts.',
    category: 'CPA',
    readTime: '12 min read',
    date: '2026-02-17',
    featured: true,
  },
  {
    slug: 'ea-vs-cpa-which-certification',
    title: 'EA vs CPA: Which Certification Should You Get in 2026?',
    description: 'Enrolled Agent vs CPA comparison — differences in scope, requirements, cost, salary, and career paths. Find out which credential is right for your career goals.',
    category: 'Career',
    readTime: '10 min read',
    date: '2026-02-17',
    featured: true,
  },
  {
    slug: 'how-to-pass-far-first-try',
    title: 'How to Pass FAR on Your First Try: 15 Proven Strategies',
    description: 'Expert strategies to pass the CPA FAR section on your first attempt. Study tips for financial accounting concepts, government accounting, and the toughest FAR topics.',
    category: 'CPA',
    readTime: '14 min read',
    date: '2026-02-17',
    featured: true,
  },
];

// ============================================================================
// Blog Index Page
// ============================================================================

const BlogIndex = () => {
  const [dynamicArticles, setDynamicArticles] = useState<ArticleMeta[]>([]);

  useEffect(() => {
    const loadDynamicArticles = async () => {
      try {
        const q = query(
          collection(db, 'growth_content'),
          where('status', '==', 'published'),
          orderBy('generatedAt', 'desc'),
        );
        const snapshot = await getDocs(q);
        const articles: ArticleMeta[] = [];

        for (const doc of snapshot.docs) {
          const data = doc.data();
          // Skip if this slug already exists as a static article
          if (!data.slug || !data.generatedContent) continue;
          if (ARTICLES.some(a => a.slug === data.slug)) continue;

          const wordCount = data.generatedContent?.split(/\s+/).length || 0;
          const readMin = Math.max(1, Math.ceil(wordCount / 200));
          const date = data.publishedAt?.toDate?.()
            || data.generatedAt?.toDate?.()
            || new Date();

          articles.push({
            slug: data.slug,
            title: data.title || data.slug,
            description: data.metaDescription || `Learn about ${data.title || 'exam preparation'} with VoraPrep.`,
            category: (data.courseId || 'exam prep').toUpperCase(),
            readTime: `${readMin} min read`,
            date: date instanceof Date ? date.toISOString().split('T')[0] : String(date),
          });
        }

        setDynamicArticles(articles);
      } catch (err) {
        logger.warn('[BlogIndex] Failed to load dynamic articles:', err);
      }
    };

    loadDynamicArticles();
  }, []);

  // Merge static + dynamic, sort by date (newest first)
  const allArticles = [...ARTICLES, ...dynamicArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  useSEO({
    title: 'Exam Prep Blog & Study Guides',
    description: 'Free study guides, exam strategies, and career advice for CPA, EA, CMA, CIA, CFP, and CISA candidates. Expert tips to help you pass your certification exam.',
    canonicalUrl: 'https://voraprep.com/blog',
  });

  useBreadcrumbs([
    { name: 'Home', url: 'https://voraprep.com/' },
    { name: 'Blog', url: 'https://voraprep.com/blog' },
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Study Guides & Exam Tips
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Free, in-depth articles to help you study smarter and pass your exam on the first try.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Articles Grid */}
        <div className="space-y-6">
          {allArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="block bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {article.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                {article.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center">
          <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Ready to start studying?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
            Get full access to practice questions, lessons, and our AI tutor — free for 14 days.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;
