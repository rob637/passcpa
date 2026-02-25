/**
 * DynamicArticle — renders blog articles stored in Firestore (growth_content).
 * 
 * Loads article by slug from the URL, renders markdown content with react-markdown.
 * Falls back to 404 if the article doesn't exist or isn't published.
 */

import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSEO } from '../../../hooks/useSEO';
import { useBreadcrumbs, useArticleSchema, useFAQSchema, extractFAQsFromMarkdown } from '../../../hooks/useStructuredData';
import { Calendar, Clock, ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';
import logger from '../../../utils/logger';

interface ArticleData {
  title: string;
  slug: string;
  courseId: string;
  contentType: string;
  generatedContent: string;
  metaTitle?: string;
  metaDescription?: string;
  wordCountTarget?: number;
  publishedAt?: { seconds: number };
  generatedAt?: { seconds: number };
  updatedAt?: { seconds: number };
  targetKeywords?: string[];
  primaryKeyword?: string;
}

const DynamicArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const loadArticle = async () => {
      try {
        // Query growth_content for published articles with this slug
        const q = query(
          collection(db, 'growth_content'),
          where('slug', '==', slug),
          where('status', '==', 'published'),
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const doc = snapshot.docs[0];
        const data = doc.data() as ArticleData;

        if (!data.generatedContent) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setArticle(data);
      } catch (err) {
        logger.error('[DynamicArticle] Failed to load article:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  // SEO
  useSEO({
    title: article?.metaTitle || article?.title || 'Blog Article',
    description: article?.metaDescription || `Read about ${article?.title || 'exam preparation'} on VoraPrep.`,
    canonicalUrl: `https://voraprep.com/blog/${slug}`,
  });

  useBreadcrumbs([
    { name: 'Home', url: 'https://voraprep.com/' },
    { name: 'Blog', url: 'https://voraprep.com/blog' },
    ...(article ? [{ name: article.title, url: `https://voraprep.com/blog/${slug}` }] : []),
  ]);

  // Format date for schema
  const publishDate = article?.publishedAt?.seconds
    ? new Date(article.publishedAt.seconds * 1000)
    : article?.generatedAt?.seconds
      ? new Date(article.generatedAt.seconds * 1000)
      : null;
  
  const dateString = publishDate?.toISOString() || new Date().toISOString();

  // Article structured data for Google
  useArticleSchema({
    headline: article?.title || '',
    description: article?.metaDescription || `Read about ${article?.title || 'exam preparation'} on VoraPrep.`,
    author: 'VoraPrep Team',
    datePublished: dateString,
    url: `https://voraprep.com/blog/${slug}`,
  });

  // Extract FAQs from content for FAQ schema (enables featured snippets)
  const faqs = useMemo(() => {
    if (!article?.generatedContent) return [];
    return extractFAQsFromMarkdown(article.generatedContent);
  }, [article?.generatedContent]);

  useFAQSchema(faqs);

  // Estimate read time from content
  const readTime = article?.generatedContent
    ? `${Math.max(1, Math.ceil(article.generatedContent.split(/\s+/).length / 200))} min read`
    : '';

  // ---- Loading State ----
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-96 mx-auto mb-4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-64 mx-auto" />
        </div>
      </div>
    );
  }

  // ---- Not Found: Redirect to static blog page (served by Astro) ----
  if (notFound || !article) {
    // The article might exist as a static page served by Astro.
    // Redirect to force a full page load of the static version.
    // Use sessionStorage to prevent infinite redirect loops.
    if (typeof window !== 'undefined' && slug) {
      const redirectKey = `blog_redirect_${slug}`;
      const alreadyRedirected = sessionStorage.getItem(redirectKey);
      
      if (!alreadyRedirected) {
        sessionStorage.setItem(redirectKey, 'true');
        // Clear after 5 seconds to allow retry
        setTimeout(() => sessionStorage.removeItem(redirectKey), 5000);
        window.location.href = `/blog/${slug}/`;
        return null;
      }
    }
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            This article may have been moved or is no longer available.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // ---- Extract title from H1 in content (allows AI to edit it), fallback to title field ----
  const contentTitle = extractTitleFromContent(article.generatedContent);
  const displayTitle = contentTitle || article.title;
  const contentToRender = cleanMarkdownContent(article.generatedContent);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold bg-blue-500/30 text-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wide">
              {article.courseId?.toUpperCase() || 'Exam Prep'}
            </span>
            {readTime && (
              <span className="flex items-center gap-1 text-xs text-blue-200">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
            )}
            {publishDate && (
              <span className="flex items-center gap-1 text-xs text-blue-200">
                <Calendar className="w-3 h-3" />
                {publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {displayTitle}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium
          prose-li:text-slate-700 dark:prose-li:text-slate-300
          prose-strong:text-slate-900 dark:prose-strong:text-white
          prose-table:border-collapse prose-th:bg-slate-100 dark:prose-th:bg-slate-800
          prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2
          prose-th:border prose-td:border prose-th:border-slate-200 prose-td:border-slate-200
          dark:prose-th:border-slate-700 dark:prose-td:border-slate-700"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {contentToRender}
          </ReactMarkdown>
        </div>

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center">
          <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Ready to start studying?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-5 max-w-md mx-auto">
            Get full access to AI-powered practice questions, lessons, and our AI tutor — free for 14 days.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Back to Blog */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
};

/**
 * Clean up Gemini-generated markdown:
 * - Remove leading meta description line if present
 * - Strip any "Meta Description:" prefix lines
 * - Strip the H1 title (it's rendered separately in the header)
 */
function cleanMarkdownContent(raw: string): string {
  let content = raw;

  // Remove "Meta Description: ..." or "**Meta Description:**..." lines at the top
  content = content.replace(/^(?:\*\*)?Meta\s*Description:?\*?\*?\s*.+\n+/im, '');
  
  // Remove leading "---" divider sometimes added by Gemini
  content = content.replace(/^---\n+/, '');
  
  // Remove the H1 title line (we display it separately in the header)
  content = content.replace(/^#\s+.+\n+/, '');

  return content.trim();
}

/**
 * Extract the H1 title from markdown content.
 * Returns the title text or null if no H1 found.
 */
function extractTitleFromContent(raw: string): string | null {
  // Skip meta description line first
  let content = raw.replace(/^(?:\*\*)?Meta\s*Description:?\*?\*?\s*.+\n+/im, '');
  content = content.replace(/^---\n+/, '');
  
  const h1Match = content.match(/^#\s+(.+?)(?:\n|$)/);
  return h1Match ? h1Match[1].trim() : null;
}

export default DynamicArticle;
