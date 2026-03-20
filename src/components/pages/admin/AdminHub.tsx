/**
 * Admin Hub — Central navigation for all admin tools
 * 
 * Clean, organized access to:
 * - Content Management (questions, lessons, TBS, WC, articles)
 * - SEO Engine (briefs, keywords, sitemap)
 * - SEM/Paid (campaigns, budgets)
 * - System (users, flags, pricing)
 */

import { Link } from 'react-router-dom';
import {
  FileText, BookOpen, Newspaper,
  Search, TrendingUp, Megaphone,
  Settings, Zap, Users,
  ChevronRight, ExternalLink as ExternalLinkIcon,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { TOTAL_DISPLAY } from '../../../config/contentStats';

interface AdminSection {
  title: string;
  description: string;
  icon: typeof FileText;
  color: string;
  links: { label: string; path: string; badge?: string }[];
}

const ADMIN_SECTIONS: AdminSection[] = [
  {
    title: 'Content Management',
    description: 'Create and edit exam prep content',
    icon: BookOpen,
    color: 'bg-blue-500',
    links: [
      { label: 'Questions', path: '/admin/questions' },
      { label: 'Lessons', path: '/admin/lessons' },
      { label: 'TBS Simulations', path: '/admin/tbs' },
      { label: 'Written Communication', path: '/admin/wc' },
      { label: 'Blog Articles', path: '/admin/articles', badge: 'Review' },
    ],
  },
  {
    title: 'User Growth',
    description: 'Session tracking, analytics, and lead generation',
    icon: Users,
    color: 'bg-emerald-500',
    links: [
      { label: 'Session Tracking', path: '/admin/analytics', badge: 'LIVE' },
      { label: 'Referral System', path: '/admin/referrals', badge: 'NEW' },
      { label: 'LinkedIn Posts', path: '/admin/linkedin', badge: 'NEW' },
      { label: 'Diagnostic Leads', path: '/admin/diagnostics', badge: 'NEW' },
      { label: 'Testimonials', path: '/admin/testimonials', badge: 'NEW' },
    ],
  },
  {
    title: 'SEO Engine',
    description: 'Automated content & keyword management',
    icon: Search,
    color: 'bg-green-500',
    links: [
      { label: 'SEO Status', path: '/admin/seo', badge: 'Monitor' },
      { label: 'Content Briefs', path: '/admin/growth?tab=content' },
      { label: 'Keyword Tracking', path: '/admin/growth?tab=keywords' },
      { label: 'Technical SEO', path: '/admin/growth?tab=technical' },
      { label: 'Article Review', path: '/admin/articles', badge: 'NEW' },
    ],
  },
  {
    title: 'SEM / Paid',
    description: 'Google Ads campaigns & budgets',
    icon: Megaphone,
    color: 'bg-amber-500',
    links: [
      { label: 'Campaigns', path: '/admin/growth?tab=sem' },
      { label: 'Budget Settings', path: '/admin/growth?tab=settings' },
    ],
  },
  {
    title: 'System',
    description: 'Users, configuration & data',
    icon: Settings,
    color: 'bg-purple-500',
    links: [
      { label: 'User Management', path: '/admin/cms' },
      { label: 'Content Stats', path: '/admin/cms' },
      { label: 'Course Factory', path: '/admin/course-factory', badge: 'NEW' },
      { label: 'Data Seeding', path: '/admin/seed' },
    ],
  },
];

export default function AdminHub() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            VoraPrep Admin
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage content, SEO engine, paid campaigns, and system settings
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <QuickStat icon={FileText} label="Questions" value={TOTAL_DISPLAY.questions} color="blue" />
          <QuickStat icon={BookOpen} label="Lessons" value={TOTAL_DISPLAY.lessons} color="green" />
          <QuickStat icon={Newspaper} label="Blog Briefs" value="181" color="purple" />
          <QuickStat icon={TrendingUp} label="Keywords" value="4,988" color="amber" />
        </div>

        {/* Section Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {ADMIN_SECTIONS.map(section => (
            <Card key={section.title} className="p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center flex-shrink-0`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {section.description}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                {section.links.map(link => (
                  <Link
                    key={link.path + link.label}
                    to={link.path}
                    className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {link.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          link.badge === 'NEW' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* External Links */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">External Tools</h3>
          <div className="flex flex-wrap gap-3">
            <ExternalLink href="https://console.firebase.google.com/project/voraprep/overview" label="Firebase Console" />
            <ExternalLink href="https://dashboard.stripe.com/" label="Stripe Dashboard" />
            <ExternalLink href="https://search.google.com/search-console" label="Search Console" />
            <ExternalLink href="https://ads.google.com/" label="Google Ads" />
            <ExternalLink href="https://analytics.google.com/" label="GA4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Subcomponents
// ============================================================================

function QuickStat({ icon: Icon, label, value, color }: {
  icon: typeof FileText;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'amber';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{value}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
        </div>
      </div>
    </Card>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
    >
      {label}
      <ExternalLinkIcon className="w-3 h-3 opacity-50" />
    </a>
  );
}
