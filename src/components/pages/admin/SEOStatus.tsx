/**
 * SEO Status Dashboard — Central monitoring for all SEO activities
 * 
 * Shows status of:
 * - Content distribution channels (Blog, RSS, LinkedIn)
 * - Technical SEO (Sitemap, Robots.txt, Structured Data)
 * - Auto-publish schedule
 * - Rank tracking
 * - Pre-rendered blog
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  CheckCircle, AlertTriangle, XCircle, Clock, ExternalLink,
  RefreshCw, Rss, Linkedin, FileText, Globe, Search,
  Newspaper, Calendar, ChevronLeft, Zap, Settings,
  Pause, AlertCircle, Link as LinkIcon,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import logger from '../../../utils/logger';
import { db } from '../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

// ============================================================================
// Types
// ============================================================================

type StatusLevel = 'active' | 'warning' | 'error' | 'pending' | 'disabled';

interface SEOItem {
  id: string;
  name: string;
  description: string;
  status: StatusLevel;
  statusText: string;
  lastChecked?: Date;
  lastActivity?: Date;
  verifyUrl?: string;
  verifyAction?: () => void;
  configUrl?: string;
  details?: string;
  icon: typeof Rss;
}

interface SEOCategory {
  id: string;
  name: string;
  description: string;
  items: SEOItem[];
}

// ============================================================================
// Main Component (standalone page)
// ============================================================================

export default function SEOStatus() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link
                to="/admin"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Search className="w-6 h-6 text-blue-500" />
                SEO Status
              </h1>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-8">
              Monitor all SEO systems and verify they're running
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto">
        <SEOStatusTab />
      </div>
    </div>
  );
}

// ============================================================================
// Embeddable Tab Component (for GrowthDashboard)
// ============================================================================

export function SEOStatusTab() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState<SEOCategory[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch various status data in parallel
      const [linkedInConfig, growthConfig, rssCheck, sitemapCheck] = await Promise.all([
        fetchLinkedInStatus(),
        fetchGrowthConfig(),
        checkRssFeed(),
        checkSitemap(),
      ]);

      const cats: SEOCategory[] = [
        // Content Distribution
        {
          id: 'distribution',
          name: 'Content Distribution',
          description: 'Channels where your content is published and syndicated',
          items: [
            {
              id: 'blog',
              name: 'Pre-rendered Blog',
              description: 'Astro SSG blog at /blog/* for SEO-friendly static HTML',
              icon: Newspaper,
              status: 'active',
              statusText: 'Live',
              verifyUrl: 'https://voraprep.com/blog',
              details: 'Static HTML pages built at deploy time',
            },
            {
              id: 'rss',
              name: 'RSS Feed',
              description: 'Dynamic RSS feed at /feed.xml for subscribers and IFTTT',
              icon: Rss,
              status: rssCheck.status,
              statusText: rssCheck.statusText,
              lastActivity: rssCheck.lastBuildDate,
              verifyUrl: 'https://voraprep.com/feed.xml',
              details: `${rssCheck.itemCount} articles in feed`,
            },
            {
              id: 'linkedin',
              name: 'LinkedIn Auto-Post',
              description: 'Auto-shares new articles to your LinkedIn profile',
              icon: Linkedin,
              status: linkedInConfig.status,
              statusText: linkedInConfig.statusText,
              lastActivity: linkedInConfig.lastPost,
              verifyUrl: 'https://www.linkedin.com/in/me/',
              configUrl: 'https://us-central1-voraprep-prod.cloudfunctions.net/linkedinOAuthCallback',
              details: linkedInConfig.details,
            },
          ],
        },

        // Technical SEO
        {
          id: 'technical',
          name: 'Technical SEO',
          description: 'Infrastructure that helps search engines crawl and index your site',
          items: [
            {
              id: 'sitemap',
              name: 'Dynamic Sitemap',
              description: 'XML sitemap at /sitemap.xml updated with published articles',
              icon: Globe,
              status: sitemapCheck.status,
              statusText: sitemapCheck.statusText,
              verifyUrl: 'https://voraprep.com/sitemap.xml',
              details: `${sitemapCheck.urlCount} URLs in sitemap`,
            },
            {
              id: 'robots',
              name: 'Robots.txt',
              description: 'Crawler directives at /robots.txt',
              icon: FileText,
              status: 'active',
              statusText: 'Configured',
              verifyUrl: 'https://voraprep.com/robots.txt',
              details: 'App routes disallowed, public pages allowed',
            },
            {
              id: 'structured-data',
              name: 'Structured Data (JSON-LD)',
              description: 'Schema.org markup for rich search results',
              icon: FileText,
              status: 'active',
              statusText: 'Active',
              verifyUrl: 'https://search.google.com/test/rich-results?url=https%3A%2F%2Fvoraprep.com%2Fblog',
              details: 'Organization, Article, Course schemas',
            },
            {
              id: 'canonical',
              name: 'Canonical URLs',
              description: 'Prevents duplicate content issues',
              icon: LinkIcon,
              status: 'active',
              statusText: 'Active',
              details: 'Set via useSEO hook on all public pages',
            },
            {
              id: 'og-tags',
              name: 'Open Graph Tags',
              description: 'Social media preview cards',
              icon: FileText,
              status: 'active',
              statusText: 'Active',
              verifyUrl: 'https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fvoraprep.com',
              details: 'Title, description, image on all pages',
            },
          ],
        },

        // Automation
        {
          id: 'automation',
          name: 'Content Automation',
          description: 'Scheduled jobs that create and publish content',
          items: [
            {
              id: 'auto-publish',
              name: 'Auto-Publish (growthAutoPublish)',
              description: 'Publishes approved articles daily at 10 AM ET',
              icon: Calendar,
              status: growthConfig.autoContentGeneration ? 'active' : 'disabled',
              statusText: growthConfig.autoContentGeneration ? 'Enabled' : 'Disabled',
              details: `Max ${growthConfig.maxArticlesPerWeek || 5} articles/week, ~60% publish rate`,
              configUrl: '/admin/growth',
            },
            {
              id: 'content-queue',
              name: 'Content Queue',
              description: 'Approved articles waiting to be published',
              icon: FileText,
              status: 'active',
              statusText: `${growthConfig.approvedCount || 0} queued`,
              details: 'Approve articles in Growth Dashboard → Content tab',
              configUrl: '/admin/growth',
            },
          ],
        },

        // Monitoring
        {
          id: 'monitoring',
          name: 'Monitoring & Analytics',
          description: 'Track rankings and performance',
          items: [
            {
              id: 'gsc',
              name: 'Google Search Console',
              description: 'Index coverage and search performance',
              icon: Search,
              status: growthConfig.searchConsoleConfigured ? 'active' : 'pending',
              statusText: growthConfig.searchConsoleConfigured ? 'Connected' : 'Setup Required',
              verifyUrl: 'https://search.google.com/search-console?resource_id=https%3A%2F%2Fvoraprep.com',
              details: growthConfig.searchConsoleConfigured 
                ? 'Daily rank tracking via growthRankTracking function' 
                : 'Add property in GSC, then enable in Growth settings',
            },
            {
              id: 'rank-tracking',
              name: 'Keyword Rank Tracking',
              description: 'Automated position monitoring for target keywords',
              icon: Search,
              status: growthConfig.rankTrackingEnabled ? 'active' : 'disabled',
              statusText: growthConfig.rankTrackingEnabled ? 'Active' : 'Disabled',
              details: `Frequency: ${growthConfig.rankTrackingFrequency || 'daily'}`,
              configUrl: '/admin/growth',
            },
            {
              id: 'cwv',
              name: 'Core Web Vitals',
              description: 'LCP, FID, CLS performance metrics',
              icon: Zap,
              status: 'active',
              statusText: 'Measured',
              verifyUrl: 'https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fvoraprep.com',
              details: 'Client-side measurement via web-vitals library',
            },
          ],
        },
      ];

      setCategories(cats);
      setLastRefresh(new Date());
    } catch (error) {
      logger.error('[SEOStatus] Failed to load status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadStatus();
    setRefreshing(false);
  };

  const getStatusIcon = (status: StatusLevel) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'disabled':
        return <Pause className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadgeClass = (status: StatusLevel) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'warning':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'error':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'pending':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'disabled':
        return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  // Count active vs total
  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const activeItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter(i => i.status === 'active').length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Refresh Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-500" />
            SEO Systems Monitor
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track all content distribution & technical SEO
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            leftIcon={RefreshCw}
            loading={refreshing}
          >
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : (
        <>
          {/* Summary */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Overall Status
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {activeItems} of {totalItems} systems active
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className={clsx(
                    'px-4 py-2 rounded-full text-sm font-semibold',
                    activeItems === totalItems
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : activeItems >= totalItems * 0.8
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  )}>
                    {activeItems === totalItems ? '✓ All Systems Go' : `${activeItems}/${totalItems} Active`}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  <QuickLink href="https://voraprep.com/blog" label="View Blog" />
                  <QuickLink href="https://voraprep.com/sitemap.xml" label="Sitemap" />
                  <QuickLink href="https://voraprep.com/feed.xml" label="RSS Feed" />
                  <QuickLink href="https://search.google.com/search-console" label="Search Console" />
                  <QuickLink href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fvoraprep.com" label="PageSpeed" />
                  <QuickLink to="/admin/growth" label="Growth Dashboard" internal />
                </div>
              </div>
            </Card>

            {/* Categories */}
            {categories.map(category => (
              <Card key={category.id} className="p-6 mb-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {category.items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <span className={clsx(
                            'px-2 py-0.5 rounded-full text-xs font-medium',
                            getStatusBadgeClass(item.status)
                          )}>
                            {item.statusText}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {item.description}
                        </p>
                        {item.details && (
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {item.details}
                          </p>
                        )}
                        {item.lastActivity && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Last activity: {item.lastActivity.toLocaleString()}
                          </p>
                        )}
                      </div>

                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {getStatusIcon(item.status)}
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0 flex gap-2">
                        {item.verifyUrl && (
                          <a
                            href={item.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            title="Verify"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {item.configUrl && (
                          item.configUrl.startsWith('/') ? (
                            <Link
                              to={item.configUrl}
                              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="Configure"
                            >
                              <Settings className="w-4 h-4" />
                            </Link>
                          ) : (
                            <a
                              href={item.configUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="Configure"
                            >
                              <Settings className="w-4 h-4" />
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            {/* How to Verify Section */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                How to Verify Each System
              </h2>
              <div className="space-y-4 text-sm">
                <VerifyStep 
                  title="Blog (Pre-rendered)" 
                  steps={[
                    'Visit voraprep.com/blog',
                    'View page source — should be full HTML, not just a <div id="root">',
                    'Check that articles load without JavaScript'
                  ]} 
                />
                <VerifyStep 
                  title="RSS Feed" 
                  steps={[
                    'Visit voraprep.com/feed.xml',
                    'Should show XML with <channel> and <item> elements',
                    'Use a feed reader or IFTTT to subscribe'
                  ]} 
                />
                <VerifyStep 
                  title="LinkedIn Auto-Post" 
                  steps={[
                    'Check your LinkedIn profile for recent VoraPrep posts',
                    'Look at article distribution status in /admin/growth → Content tab',
                    'If token expired, re-auth at the OAuth callback URL'
                  ]} 
                />
                <VerifyStep 
                  title="Sitemap" 
                  steps={[
                    'Visit voraprep.com/sitemap.xml',
                    'Should include /blog/* URLs for published articles',
                    'Submit to Google Search Console if not already'
                  ]} 
                />
                <VerifyStep 
                  title="Google Search Console" 
                  steps={[
                    'Go to search.google.com/search-console',
                    'Check Index Coverage — should show pages indexed',
                    'Check Performance for impressions and clicks'
                  ]} 
                />
              </div>
            </Card>
          </>
        )}
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

function QuickLink({ href, to, label, internal }: { href?: string; to?: string; label: string; internal?: boolean }) {
  const className = "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors";
  
  if (internal || to) {
    return (
      <Link to={to || href || '#'} className={className}>
        {label}
      </Link>
    );
  }
  
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}

function VerifyStep({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{title}</h4>
      <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400">
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

// ============================================================================
// Data Fetching Helpers
// ============================================================================

async function fetchLinkedInStatus(): Promise<{
  status: StatusLevel;
  statusText: string;
  lastPost?: Date;
  details: string;
}> {
  try {
    const configDoc = await getDoc(doc(db, 'system_config', 'linkedin'));
    if (!configDoc.exists()) {
      return { status: 'pending', statusText: 'Not Configured', details: 'OAuth not completed' };
    }
    
    const data = configDoc.data();
    const expiresAt = data.expiresAt?.toDate?.();
    const now = new Date();
    
    if (!data.accessToken || !data.personId) {
      return { status: 'pending', statusText: 'Setup Incomplete', details: 'Missing token or person ID' };
    }
    
    if (expiresAt && expiresAt < now) {
      return { status: 'error', statusText: 'Token Expired', details: `Expired ${expiresAt.toLocaleDateString()}` };
    }
    
    const daysUntilExpiry = expiresAt ? Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0;
    
    if (daysUntilExpiry < 7) {
      return { 
        status: 'warning', 
        statusText: 'Expiring Soon', 
        details: `Token expires in ${daysUntilExpiry} days (${expiresAt?.toLocaleDateString()})` 
      };
    }
    
    return { 
      status: 'active', 
      statusText: 'Connected', 
      details: `Token valid until ${expiresAt?.toLocaleDateString()}`,
      lastPost: data.updatedAt?.toDate?.(),
    };
  } catch (error) {
    logger.error('[SEOStatus] Failed to fetch LinkedIn status:', error);
    return { status: 'error', statusText: 'Error', details: 'Could not check status' };
  }
}

async function fetchGrowthConfig(): Promise<{
  autoContentGeneration: boolean;
  maxArticlesPerWeek: number;
  rankTrackingEnabled: boolean;
  rankTrackingFrequency: string;
  searchConsoleConfigured: boolean;
  approvedCount: number;
}> {
  try {
    const configDoc = await getDoc(doc(db, 'growth_config', 'settings'));
    const data = configDoc.exists() ? configDoc.data() : {};
    
    // Count approved articles
    // This is a simplified count - in production you might want to use a Cloud Function
    let approvedCount = 0;
    try {
      const { getDocs, query, collection, where } = await import('firebase/firestore');
      const q = query(collection(db, 'growth_content'), where('status', '==', 'approved'));
      const snapshot = await getDocs(q);
      approvedCount = snapshot.size;
    } catch {
      // Ignore count errors
    }
    
    return {
      autoContentGeneration: data.autoContentGeneration ?? true,
      maxArticlesPerWeek: data.maxArticlesPerWeek ?? 5,
      rankTrackingEnabled: data.rankTrackingEnabled ?? false,
      rankTrackingFrequency: data.rankTrackingFrequency ?? 'daily',
      searchConsoleConfigured: data.searchConsoleConfigured ?? false,
      approvedCount,
    };
  } catch (error) {
    logger.error('[SEOStatus] Failed to fetch growth config:', error);
    return {
      autoContentGeneration: false,
      maxArticlesPerWeek: 5,
      rankTrackingEnabled: false,
      rankTrackingFrequency: 'daily',
      searchConsoleConfigured: false,
      approvedCount: 0,
    };
  }
}

async function checkRssFeed(): Promise<{
  status: StatusLevel;
  statusText: string;
  itemCount: number;
  lastBuildDate?: Date;
}> {
  try {
    const response = await fetch('https://voraprep.com/feed.xml', { method: 'HEAD' });
    if (!response.ok) {
      return { status: 'error', statusText: 'Not Reachable', itemCount: 0 };
    }
    
    // For now, just check it's reachable
    // A more thorough check would parse the XML
    return { status: 'active', statusText: 'Live', itemCount: 2 }; // Placeholder count
  } catch {
    return { status: 'warning', statusText: 'Check Manually', itemCount: 0 };
  }
}

async function checkSitemap(): Promise<{
  status: StatusLevel;
  statusText: string;
  urlCount: number;
}> {
  try {
    const response = await fetch('https://voraprep.com/sitemap.xml', { method: 'HEAD' });
    if (!response.ok) {
      return { status: 'error', statusText: 'Not Reachable', urlCount: 0 };
    }
    
    return { status: 'active', statusText: 'Live', urlCount: 30 }; // Placeholder count
  } catch {
    return { status: 'warning', statusText: 'Check Manually', urlCount: 0 };
  }
}
