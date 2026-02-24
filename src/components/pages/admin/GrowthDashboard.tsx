/**
 * Growth Engine Dashboard — Admin panel for SEO/SEM automation
 * 
 * The command center for VoraPrep's automated growth engine.
 * Shows: keyword tracking, content pipeline, SEM campaigns,
 * action items, and performance metrics across all exams.
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  BarChart3, Search, FileText, Megaphone, Zap,
  AlertTriangle, CheckCircle, Target, DollarSign, Eye, MousePointer,
  Globe, Layers, Settings, RefreshCw, ArrowUpRight,
  ArrowDownRight, ChevronDown, ChevronRight, ChevronLeft,
  Lightbulb, BookOpen, PenTool, Award,
  Shield, Pause, Save, Sliders, Newspaper, Trash2, Radio,
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import logger from '../../../utils/logger';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../config/firebase';
import type { CourseId } from '../../../types/course';
import type {
  ContentBrief,
} from '../../../types/growth';

// Import growth engine
import {
  getGrowthEngineStatus,
  generateFullContentMatrix,
  generateStateCPABriefs,
  generateAllCampaigns,
} from '../../../services/growth';
import {
  getGrowthConfig,
  updateGrowthConfig,
  getTrackedKeywordsWithRanks,
  getAllContentBriefs,
  reseedContentBriefs,
  deleteAllPendingBriefs,
  type GrowthEngineConfig,
} from '../../../services/growth/growthFirestore';
import { SEOStatusTab } from './SEOStatus';

// ============================================================================
// Types
// ============================================================================

type DashboardTab = 'overview' | 'keywords' | 'content' | 'sem' | 'technical' | 'seo-status' | 'settings';

const EXAM_COLORS: Record<CourseId, string> = {
  cpa: 'bg-blue-500',
  ea: 'bg-emerald-500',
  cma: 'bg-purple-500',
  cia: 'bg-amber-500',
  cfp: 'bg-green-500',
  cisa: 'bg-cyan-500',
};

// Section name lookup for all exams (section ID -> full name)
const SECTION_NAMES: Record<string, string> = {
  // CPA
  FAR: 'Financial Accounting and Reporting',
  AUD: 'Auditing and Attestation',
  REG: 'Taxation and Regulation',
  BAR: 'Business Analysis and Reporting',
  ISC: 'Information Systems and Controls',
  TCP: 'Tax Compliance and Planning',
  // EA
  SEE1: 'Individual Taxation',
  SEE2: 'Business Taxation',
  SEE3: 'Representation and Ethics',
  // CMA
  CMA1: 'Financial Planning, Performance & Analytics',
  CMA2: 'Strategic Financial Management',
  // CIA
  CIA1: 'Essentials of Internal Auditing',
  CIA2: 'Practice of Internal Auditing',
  CIA3: 'Business Knowledge for Internal Auditing',
  // CFP
  CFP1: 'Professional Conduct & Regulation',
  CFP2: 'General Principles of Financial Planning',
  CFP3: 'Education Planning',
  CFP4: 'Risk Management & Insurance',
  CFP5: 'Investment Planning',
  CFP6: 'Tax Planning',
  CFP7: 'Retirement Savings & Income Planning',
  CFP8: 'Estate Planning',
  // CISA
  CISA1: 'Information Systems Auditing Process',
  CISA2: 'Governance and Management of IT',
  CISA3: 'IS Acquisition, Development & Implementation',
  CISA4: 'IS Operations and Business Resilience',
  CISA5: 'Protection of Information Assets',
};

// ============================================================================
// Main Dashboard Component
// ============================================================================

export default function GrowthDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [loading, setLoading] = useState(true);
  const [engineStatus, setEngineStatus] = useState<ReturnType<typeof getGrowthEngineStatus> | null>(null);

  useEffect(() => {
    loadEngineStatus();
  }, []);

  const loadEngineStatus = useCallback(async () => {
    setLoading(true);
    try {
      // Load user's budget config to generate accurate campaign estimates
      const cfg = await getGrowthConfig();
      const status = getGrowthEngineStatus(cfg.examBudgets);
      setEngineStatus(status);
    } catch (error) {
      logger.error('[GrowthDashboard] Failed to load engine status:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const tabs: { id: DashboardTab; label: string; icon: typeof BarChart3 }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'keywords', label: 'Keywords', icon: Search },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'sem', label: 'Paid Search', icon: Megaphone },
    { id: 'technical', label: 'Technical SEO', icon: Settings },
    { id: 'seo-status', label: 'SEO Status', icon: Radio },
    { id: 'settings', label: 'Settings & Budget', icon: Sliders },
  ];

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
                <Zap className="w-6 h-6 text-amber-500" />
                Growth Engine
              </h1>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-8">
              Automated SEO, SEM & Content — All 6 exams, one dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/articles"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            >
              <Newspaper className="w-4 h-4" />
              Review Articles
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadEngineStatus}
              leftIcon={RefreshCw}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mt-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <>
            {activeTab === 'overview' && <OverviewTab status={engineStatus} />}
            {activeTab === 'keywords' && <KeywordsTab status={engineStatus} />}
            {activeTab === 'content' && <ContentTab status={engineStatus} />}
            {activeTab === 'sem' && <SEMTab status={engineStatus} />}
            {activeTab === 'technical' && <TechnicalTab />}
            {activeTab === 'seo-status' && <SEOStatusTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Overview Tab
// ============================================================================

type QuickActionStatus = 'ready' | 'running' | 'done';

function OverviewTab({ status }: { status: ReturnType<typeof getGrowthEngineStatus> | null }) {
  const [actionStates, setActionStates] = useState<Record<string, QuickActionStatus>>({
    seedKeywords: 'ready',
    generateBriefs: 'ready',
    buildCampaigns: 'ready',
    buildSitemap: 'ready',
    runAudit: 'ready',
    generateArticle: 'ready',
  });
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const runAction = async (actionKey: string, actionFn: () => Promise<void>) => {
    setLoadingAction(actionKey);
    setActionStates(prev => ({ ...prev, [actionKey]: 'running' }));
    try {
      await actionFn();
      setActionStates(prev => ({ ...prev, [actionKey]: 'done' }));
    } catch (error) {
      logger.error(`Quick action ${actionKey} failed:`, error);
      setActionStates(prev => ({ ...prev, [actionKey]: 'ready' }));
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSeedKeywords = async () => {
    // This would call a Cloud Function to seed keywords
    // For now, show an alert that this requires the Cloud Function
    alert('Keyword seeding requires running the Cloud Function. Go to Settings → API Connections → Seed Keywords.');
  };

  const handleGenerateBriefs = async () => {
    const seedBriefs = httpsCallable(functions, 'growthSeedBriefs');
    await seedBriefs();
    alert('Content briefs seeded! Check the Content tab.');
  };

  const handleBuildCampaigns = async () => {
    // Generate campaigns locally and show them
    const cfg = await getGrowthConfig();
    const allCampaigns = generateAllCampaigns(cfg.examBudgets || {});
    alert(`Generated ${allCampaigns.length} campaigns! Go to the SEM tab to view them.`);
  };

  const handleBuildSitemap = async () => {
    // Sitemap is auto-generated at build time
    alert('Sitemap is auto-generated at build time. Check /sitemap.xml');
  };

  const handleRunAudit = async () => {
    // Switch to Technical tab
    alert('Go to the Technical tab and click "Run Audit" to perform an on-page SEO audit.');
  };

  const handleGenerateArticle = async () => {
    // Redirect to Content tab
    alert('Go to the Content tab, click on a brief, and use "Generate Draft" to create an article with Gemini AI.');
  };

  if (!status) return null;

  const { content, keywords, campaigns } = status;

  return (
    <div className="space-y-6">
      {/* Top-Level Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={Search}
          label="Keywords Tracked"
          value={keywords.totalKeywords.toLocaleString()}
          color="blue"
        />
        <MetricCard
          icon={FileText}
          label="Content Briefs"
          value={content.totalBriefs.toLocaleString()}
          subtext={`~${(content.estimatedTotalWordCount / 1000).toFixed(0)}K words`}
          color="green"
        />
        <MetricCard
          icon={Megaphone}
          label="Ad Campaigns"
          value={campaigns.totalCampaigns.toString()}
          subtext={`${campaigns.totalKeywords} keywords`}
          color="purple"
        />
        <MetricCard
          icon={DollarSign}
          label="Est. Monthly Ad Spend"
          value={`$${campaigns.estimatedMonthlySpend.toLocaleString()}`}
          subtext={`Target CPA: $${campaigns.avgTargetCPA}`}
          color="amber"
        />
      </div>

      {/* Per-Exam Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" />
          Per-Exam Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Exam</th>
                <th className="pb-3 font-medium text-right">Keywords</th>
                <th className="pb-3 font-medium text-right">Content Briefs</th>
                <th className="pb-3 font-medium text-right">Ad Groups</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {(['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'] as CourseId[]).map(courseId => (
                <tr key={courseId} className="border-b dark:border-gray-700 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${EXAM_COLORS[courseId]}`} />
                      <span className="font-semibold text-gray-900 dark:text-white uppercase">{courseId}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-gray-700 dark:text-gray-300">
                    {(keywords.byExam[courseId] || 0).toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-gray-700 dark:text-gray-300">
                    {(content.byExam[courseId] || 0).toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-gray-700 dark:text-gray-300">
                    {/* Count ad groups from campaign data */}
                    {campaigns.totalAdGroups > 0
                      ? Math.round(campaigns.totalAdGroups / campaigns.totalCampaigns)
                      : '—'}
                  </td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Ready
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Content Type Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-500" />
          Content Matrix by Type
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(content.byType).map(([type, count]) => (
            <div key={type} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {type.replace(/-/g, ' ')}
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                {count}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Keyword Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          Keyword Distribution by Tag
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(keywords.byTag)
            .sort((a, b) => b[1] - a[1])
            .map(([tag, count]) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
                <span className="text-gray-400 dark:text-gray-500">({count})</span>
              </span>
            ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <QuickActionCard
            icon={Search}
            title="Seed Keyword Database"
            description={`Generate ${keywords.totalKeywords.toLocaleString()} keywords across all 6 exams`}
            action="Seed Keywords"
            status={actionStates.seedKeywords}
            loading={loadingAction === 'seedKeywords'}
            onClick={() => runAction('seedKeywords', handleSeedKeywords)}
          />
          <QuickActionCard
            icon={FileText}
            title="Generate Content Briefs"
            description={`Create ${content.totalBriefs} article briefs from templates`}
            action="Generate Briefs"
            status={actionStates.generateBriefs}
            loading={loadingAction === 'generateBriefs'}
            onClick={() => runAction('generateBriefs', handleGenerateBriefs)}
          />
          <QuickActionCard
            icon={Megaphone}
            title="Build SEM Campaigns"
            description={`Set up ${campaigns.totalCampaigns} campaigns with ${campaigns.totalKeywords} keywords`}
            action="Generate Campaigns"
            status={actionStates.buildCampaigns}
            loading={loadingAction === 'buildCampaigns'}
            onClick={() => runAction('buildCampaigns', handleBuildCampaigns)}
          />
          <QuickActionCard
            icon={Globe}
            title="Regenerate Sitemap"
            description="Auto-build sitemap.xml from all routes + published articles"
            action="Build Sitemap"
            status={actionStates.buildSitemap}
            loading={loadingAction === 'buildSitemap'}
            onClick={() => runAction('buildSitemap', handleBuildSitemap)}
          />
          <QuickActionCard
            icon={Award}
            title="Run SEO Audit"
            description="Check meta tags, structured data, and Core Web Vitals"
            action="Run Audit"
            status={actionStates.runAudit}
            loading={loadingAction === 'runAudit'}
            onClick={() => runAction('runAudit', handleRunAudit)}
          />
          <QuickActionCard
            icon={PenTool}
            title="Generate Article"
            description="Pick a brief and auto-generate with Gemini AI"
            action="Generate Content"
            status={actionStates.generateArticle}
            loading={loadingAction === 'generateArticle'}
            onClick={() => runAction('generateArticle', handleGenerateArticle)}
          />
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// Keywords Tab
// ============================================================================

interface TrackedKeywordWithRank {
  id: string;
  keyword: string;
  courseId?: string;
  currentRank: number | null;
  previousRank: number | null;
  impressions?: number;
  clicks?: number;
  rankingUrl?: string;
  lastChecked?: { toDate?: () => Date };
}

function KeywordsTab({ status }: { status: ReturnType<typeof getGrowthEngineStatus> | null }) {
  const [selectedExam, setSelectedExam] = useState<CourseId | 'all'>('all');
  const [trackedKeywords, setTrackedKeywords] = useState<TrackedKeywordWithRank[]>([]);
  const [loadingRanks, setLoadingRanks] = useState(false);
  const [ranksLoaded, setRanksLoaded] = useState(false);

  const loadRankData = async () => {
    setLoadingRanks(true);
    try {
      const keywords = await getTrackedKeywordsWithRanks(100);
      // Filter to only show keywords that have rank data
      const withRanks = keywords.filter(kw => kw.currentRank !== null && kw.currentRank !== undefined);
      setTrackedKeywords(withRanks as unknown as TrackedKeywordWithRank[]);
      setRanksLoaded(true);
    } catch (error) {
      logger.error('Failed to load rank data:', error);
    } finally {
      setLoadingRanks(false);
    }
  };

  if (!status) return null;

  const { keywords } = status;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={Search} label="Total Keywords" value={keywords.totalKeywords.toLocaleString()} color="blue" />
        <MetricCard icon={Target} label="Commercial" value={(keywords.byIntent.commercial || 0).toLocaleString()} color="purple" />
        <MetricCard icon={Eye} label="Informational" value={(keywords.byIntent.informational || 0).toLocaleString()} color="green" />
        <MetricCard icon={MousePointer} label="Transactional" value={(keywords.byIntent.transactional || 0).toLocaleString()} color="amber" />
      </div>

      {/* Exam Filter */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Keywords by Exam</h2>
          <div className="flex gap-2">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value as CourseId | 'all')}
              className="text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1.5"
            >
              <option value="all">All Exams</option>
              {(['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'] as CourseId[]).map(id => (
                <option key={id} value={id}>{id.toUpperCase()} ({keywords.byExam[id] || 0})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Keyword Count Bars */}
        <div className="space-y-3">
          {Object.entries(keywords.byExam)
            .sort((a, b) => b[1] - a[1])
            .map(([courseId, count]) => {
              if (selectedExam !== 'all' && selectedExam !== courseId) return null;
              const percentage = (count / keywords.totalKeywords) * 100;
              return (
                <div key={courseId} className="flex items-center gap-3">
                  <div className="w-12 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase">
                    {courseId}
                  </div>
                  <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div
                      className={`h-full ${EXAM_COLORS[courseId as CourseId]} rounded-lg flex items-center px-3`}
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    >
                      <span className="text-xs font-medium text-white">{count.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm text-gray-500">
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              );
            })}
        </div>
      </Card>

      {/* Keyword Tag Cloud */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Keyword Classification</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(keywords.byTag)
            .sort((a, b) => b[1] - a[1])
            .map(([tag, count]) => (
              <div key={tag} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{tag}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{count}</span>
              </div>
            ))}
        </div>
      </Card>

      {/* Rank Tracking Results */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Rank Tracking Results
          </h2>
          <Button
            variant="primary"
            size="sm"
            onClick={loadRankData}
            leftIcon={RefreshCw}
            loading={loadingRanks}
          >
            {ranksLoaded ? 'Refresh' : 'Load Ranks'}
          </Button>
        </div>

        {!ranksLoaded && !loadingRanks && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click "Load Ranks" to fetch the latest position data from Google Search Console.
            Ranks are updated daily at 7:00 AM UTC via Cloud Function.
          </p>
        )}

        {ranksLoaded && trackedKeywords.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No rank data available yet. The rank tracking Cloud Function runs daily at 7:00 AM UTC. 
            Make sure your keywords are seeded and the Search Console API is connected.
          </p>
        )}

        {trackedKeywords.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                  <th className="pb-2 font-semibold text-gray-700 dark:text-gray-300">Keyword</th>
                  <th className="pb-2 font-semibold text-gray-700 dark:text-gray-300 text-center w-20">Position</th>
                  <th className="pb-2 font-semibold text-gray-700 dark:text-gray-300 text-center w-20">Change</th>
                  <th className="pb-2 font-semibold text-gray-700 dark:text-gray-300 text-right w-24">Impr.</th>
                  <th className="pb-2 font-semibold text-gray-700 dark:text-gray-300 text-right w-20">Clicks</th>
                  <th className="pb-2 font-semibold text-gray-700 dark:text-gray-300">Ranking URL</th>
                </tr>
              </thead>
              <tbody>
                {trackedKeywords.slice(0, 50).map((kw) => {
                  const change = kw.previousRank && kw.currentRank 
                    ? kw.previousRank - kw.currentRank // positive = improved
                    : 0;
                  return (
                    <tr key={kw.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span>{kw.keyword}</span>
                          {kw.courseId && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase">
                              {kw.courseId}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 text-center">
                        <span className={clsx(
                          'font-bold',
                          kw.currentRank && kw.currentRank <= 10 && 'text-green-600 dark:text-green-400',
                          kw.currentRank && kw.currentRank > 10 && kw.currentRank <= 30 && 'text-amber-600 dark:text-amber-400',
                          kw.currentRank && kw.currentRank > 30 && 'text-gray-500',
                        )}>
                          {kw.currentRank ?? '-'}
                        </span>
                      </td>
                      <td className="py-2 text-center">
                        {change !== 0 && (
                          <span className={clsx(
                            'flex items-center justify-center gap-0.5 text-xs font-medium',
                            change > 0 && 'text-green-600 dark:text-green-400',
                            change < 0 && 'text-red-600 dark:text-red-400',
                          )}>
                            {change > 0 ? (
                              <><ArrowUpRight className="w-3 h-3" />+{change}</>
                            ) : (
                              <><ArrowDownRight className="w-3 h-3" />{change}</>
                            )}
                          </span>
                        )}
                      </td>
                      <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                        {(kw.impressions ?? 0).toLocaleString()}
                      </td>
                      <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                        {(kw.clicks ?? 0).toLocaleString()}
                      </td>
                      <td className="py-2 text-gray-500 dark:text-gray-500 truncate max-w-[200px]">
                        {kw.rankingUrl ? (
                          <a 
                            href={kw.rankingUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {kw.rankingUrl.replace('https://voraprep.com', '')}
                          </a>
                        ) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {trackedKeywords.length > 50 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Showing top 50 of {trackedKeywords.length} tracked keywords
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Instructions */}
      <Card className="p-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          How the Keyword Engine Works
        </h3>
        <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
          <li><strong>Seed:</strong> Click "Seed Keywords" to generate the initial keyword database from exam-specific terms + modifiers</li>
          <li><strong>Research:</strong> Cloud Function enriches keywords with volume, difficulty, and CPC data via DataForSEO API</li>
          <li><strong>Track:</strong> Daily rank tracking via Google Search Console API monitors your positions</li>
          <li><strong>Gap Analysis:</strong> Keywords with volume but no assigned page → auto-generate content briefs</li>
          <li><strong>Optimize:</strong> Re-rank priorities weekly based on performance data</li>
        </ol>
      </Card>
    </div>
  );
}

// ============================================================================
// Content Tab
// ============================================================================

function ContentTab({ status }: { status: ReturnType<typeof getGrowthEngineStatus> | null }) {
  const [showBriefs, setShowBriefs] = useState(false);
  const [briefExam, setBriefExam] = useState<CourseId | 'all'>('all');
  const [briefs, setBriefs] = useState<ContentBrief[]>([]);
  const [loadingBriefs, setLoadingBriefs] = useState(false);
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const [batchGenerating, setBatchGenerating] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [reseeding, setReseeding] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [results, setResults] = useState<{ success: number; failed: number; messages: string[] }>({ success: 0, failed: 0, messages: [] });
  const [briefsPage, setBriefsPage] = useState(0);
  const BRIEFS_PER_PAGE = 50;

  if (!status) return null;

  const { content } = status;

  // Load briefs from Firestore (after seeding)
  const loadBriefs = async () => {
    setLoadingBriefs(true);
    try {
      const firestoreBriefs = await getAllContentBriefs(500);
      if (firestoreBriefs.length > 0) {
        setBriefs(firestoreBriefs);
        logger.info(`Loaded ${firestoreBriefs.length} briefs from Firestore`);
      } else {
        // Fallback to client-side generation for display only (won't work for generation)
        const all = [...generateFullContentMatrix(), ...generateStateCPABriefs()];
        setBriefs(all);
        logger.warn('No briefs in Firestore - showing client-side preview. Seed briefs first!');
      }
    } catch (error) {
      logger.error('Error loading briefs from Firestore', error);
      // Fallback to client-side
      const all = [...generateFullContentMatrix(), ...generateStateCPABriefs()];
      setBriefs(all);
    } finally {
      setLoadingBriefs(false);
      setShowBriefs(true);
    }
  };

  // Seed briefs to Firestore (required before generating)
  const handleSeedBriefs = async () => {
    setSeeding(true);
    setResults({ success: 0, failed: 0, messages: ['Seeding briefs to Firestore...'] });
    
    try {
      const seedFn = httpsCallable(functions, 'growthSeedBriefs');
      const result = await seedFn({});
      const data = result.data as { seeded: number; skipped: number; message: string };
      
      setSeeded(true);
      setResults({
        success: data.seeded,
        failed: 0,
        messages: [`✓ ${data.message}`]
      });
      logger.info('Briefs seeded', data);
      
      // Reload briefs from Firestore after seeding
      await loadBriefs();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Seeding failed';
      logger.error('Seed briefs failed', { error: errMsg });
      setResults({
        success: 0,
        failed: 1,
        messages: [`✗ Failed to seed briefs: ${errMsg}`]
      });
    } finally {
      setSeeding(false);
    }
  };

  // Reseed briefs — update titles/outlines from templates (preserves generated content)
  const handleReseedBriefs = async () => {
    setReseeding(true);
    setResults({ success: 0, failed: 0, messages: ['Regenerating brief titles from updated templates...'] });
    
    try {
      // Generate fresh briefs from templates
      const freshBriefs = [...generateFullContentMatrix(), ...generateStateCPABriefs()];
      
      // Reseed — updates 'brief' status items only, preserves generated/published
      const result = await reseedContentBriefs(freshBriefs);
      
      // Show a sample brief title for verification
      const cfpSample = freshBriefs.find(b => b.id.includes('cfp') && b.id.includes('study-guide'));
      const sampleMsg = cfpSample ? `💡 Sample: "${cfpSample.title}"` : '';
      
      setResults({
        success: result.updated,
        failed: 0,
        messages: [
          `✓ Updated ${result.updated} briefs with new titles`,
          result.skipped > 0 ? `↳ Skipped ${result.skipped} (already generated/published)` : '',
          sampleMsg
        ].filter(Boolean)
      });
      logger.info('Briefs reseeded', result);
      
      // Reload briefs from Firestore
      await loadBriefs();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Reseed failed';
      logger.error('Reseed briefs failed', { error: errMsg });
      setResults({
        success: 0,
        failed: 1,
        messages: [`✗ Failed to reseed briefs: ${errMsg}`]
      });
    } finally {
      setReseeding(false);
    }
  };

  // Clear all pending briefs and re-seed from scratch
  const handleClearAndReseed = async () => {
    if (!confirm('This will DELETE all pending briefs and re-seed from templates. Generated/published content will be preserved. Continue?')) {
      return;
    }
    
    setReseeding(true);
    setResults({ success: 0, failed: 0, messages: ['Deleting pending briefs...'] });
    
    try {
      // Delete all pending briefs
      const deleted = await deleteAllPendingBriefs();
      setResults({ success: 0, failed: 0, messages: [`Deleted ${deleted} briefs. Re-seeding...`] });
      
      // Re-seed using Cloud Function
      const seedFn = httpsCallable(functions, 'growthSeedBriefs');
      const result = await seedFn({});
      const data = result.data as { seeded: number; skipped: number; message: string };
      
      setResults({
        success: data.seeded,
        failed: 0,
        messages: [`✓ Deleted ${deleted} → Seeded ${data.seeded} fresh briefs with correct titles`]
      });
      
      setSeeded(true);
      await loadBriefs();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Clear & Reseed failed';
      logger.error('Clear & Reseed failed', { error: errMsg });
      setResults({ success: 0, failed: 1, messages: [`✗ ${errMsg}`] });
    } finally {
      setReseeding(false);
    }
  };

  const handleGenerate = async (brief: ContentBrief) => {
    if (generatingIds.has(brief.id)) return;
    
    setGeneratingIds(prev => new Set([...prev, brief.id]));
    
    try {
      const generateFn = httpsCallable(functions, 'growthGenerateArticle');
      const result = await generateFn({ briefId: brief.id });
      const data = result.data as { status: string; wordCount: number; message: string };
      
      // Update brief status locally
      setBriefs(prev => prev.map(b => 
        b.id === brief.id ? { ...b, status: data.status as 'brief' | 'review' | 'published' } : b
      ));
      
      setResults(prev => ({
        ...prev,
        success: prev.success + 1,
        messages: [...prev.messages, `✓ ${brief.title.substring(0, 40)}... (${data.wordCount} words)`]
      }));
      
      logger.info('Article generated', { briefId: brief.id, status: data.status });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Generation failed';
      logger.error('Article generation failed', { briefId: brief.id, error: errMsg });
      
      setResults(prev => ({
        ...prev,
        failed: prev.failed + 1,
        messages: [...prev.messages, `✗ ${brief.title.substring(0, 40)}... - ${errMsg}`]
      }));
    } finally {
      setGeneratingIds(prev => {
        const next = new Set(prev);
        next.delete(brief.id);
        return next;
      });
    }
  };

  const handleBatchGenerate = async (count: number = 10) => {
    // Get briefs that haven't been generated yet
    const pendingBriefs = filteredBriefs.filter(b => b.status === 'brief').slice(0, count);
    
    if (pendingBriefs.length === 0) {
      setResults({ success: 0, failed: 0, messages: ['No pending briefs to generate.'] });
      return;
    }
    
    setBatchGenerating(true);
    setResults({ success: 0, failed: 0, messages: [`Starting batch generation of ${pendingBriefs.length} articles...`] });
    
    // Generate sequentially to avoid rate limits
    for (const brief of pendingBriefs) {
      await handleGenerate(brief);
      // Small delay between generations
      await new Promise(r => setTimeout(r, 500));
    }
    
    setBatchGenerating(false);
  };

  const filteredBriefs = briefExam === 'all' ? briefs : briefs.filter(b => b.courseId === briefExam);
  const pendingCount = filteredBriefs.filter(b => b.status === 'brief').length;
  const reviewCount = filteredBriefs.filter(b => b.status === 'review').length;
  const publishedCount = filteredBriefs.filter(b => b.status === 'published').length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={FileText} label="Total Briefs" value={content.totalBriefs.toLocaleString()} color="blue" />
        <MetricCard icon={BookOpen} label="Est. Word Count" value={`${(content.estimatedTotalWordCount / 1000).toFixed(0)}K`} color="green" />
        <MetricCard icon={Layers} label="Content Types" value={Object.keys(content.byType).length.toString()} color="purple" />
        <MetricCard icon={Globe} label="State Pages (CPA)" value="54" subtext="All 50 states + territories" color="amber" />
      </div>

      {/* Content Type Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Matrix</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <th className="pb-3 font-medium">Content Type</th>
                <th className="pb-3 font-medium text-right">Count</th>
                <th className="pb-3 font-medium text-right">% of Total</th>
                <th className="pb-3 font-medium text-right">Priority</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(content.byType)
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => (
                  <tr key={type} className="border-b dark:border-gray-700 last:border-0">
                    <td className="py-3 font-medium text-gray-900 dark:text-white capitalize">
                      {type.replace(/-/g, ' ')}
                    </td>
                    <td className="py-3 text-right text-gray-700 dark:text-gray-300">{count}</td>
                    <td className="py-3 text-right text-gray-500">
                      {((count / content.totalBriefs) * 100).toFixed(0)}%
                    </td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        type === 'practice-questions' || type === 'study-guide' || type === 'review-comparison'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : type === 'pass-rates' || type === 'study-schedule' || type === 'comparison' || type === 'requirements'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {type === 'practice-questions' || type === 'study-guide' || type === 'review-comparison' ? 'P1 - Critical' :
                         type === 'pass-rates' || type === 'study-schedule' || type === 'comparison' || type === 'requirements' ? 'P2 - High' : 'P3 - Normal'}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Browse Briefs */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Content Briefs</h2>
            {showBriefs && (
              <div className="text-sm text-gray-500 mt-1">
                <span className="text-gray-600 dark:text-gray-400">{pendingCount} pending</span>
                {reviewCount > 0 && <span className="ml-2 text-blue-600 dark:text-blue-400">{reviewCount} in review</span>}
                {publishedCount > 0 && <span className="ml-2 text-green-600 dark:text-green-400">{publishedCount} published</span>}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {showBriefs && (
              <>
                <select
                  value={briefExam}
                  onChange={(e) => {
                    setBriefExam(e.target.value as CourseId | 'all');
                    setBriefsPage(0); // Reset to first page when filter changes
                  }}
                  className="text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1.5"
                >
                  <option value="all">All Exams ({briefs.length})</option>
                  {(['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'] as CourseId[]).map(id => (
                    <option key={id} value={id}>{id.toUpperCase()} ({briefs.filter(b => b.courseId === id).length})</option>
                  ))}
                </select>
                {!seeded && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleSeedBriefs}
                    disabled={seeding}
                    leftIcon={seeding ? RefreshCw : Save}
                    className={seeding ? '[&_svg]:animate-spin' : ''}
                  >
                    {seeding ? 'Seeding...' : 'Seed to Firestore'}
                  </Button>
                )}
                {seeded && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReseedBriefs}
                      disabled={reseeding}
                      leftIcon={reseeding ? RefreshCw : RefreshCw}
                      className={reseeding ? '[&_svg]:animate-spin' : ''}
                      title="Regenerate brief titles from updated templates (preserves generated content)"
                    >
                      {reseeding ? 'Reseeding...' : 'Reseed Briefs'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAndReseed}
                      disabled={reseeding}
                      leftIcon={Trash2}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      title="Delete all pending briefs and re-seed with new templates"
                    >
                      Clear & Reseed
                    </Button>
                  </>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleBatchGenerate(10)}
                  disabled={batchGenerating || pendingCount === 0 || !seeded}
                  leftIcon={batchGenerating ? RefreshCw : Zap}
                  className={batchGenerating ? '[&_svg]:animate-spin' : ''}
                  title={!seeded ? 'Seed briefs to Firestore first' : ''}
                >
                  {batchGenerating ? 'Generating...' : `Generate Batch (10)`}
                </Button>
              </>
            )}
            <Button
              variant={showBriefs ? 'ghost' : 'primary'}
              size="sm"
              onClick={loadBriefs}
              leftIcon={showBriefs ? RefreshCw : FileText}
              disabled={loadingBriefs}
            >
              {loadingBriefs ? 'Loading...' : showBriefs ? 'Refresh' : 'Load Briefs'}
            </Button>
          </div>
        </div>

        {/* Generation Results */}
        {results.messages.length > 0 && (
          <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Generation Results
              </span>
              <div className="flex items-center gap-3 text-xs">
                {results.success > 0 && (
                  <span className="text-green-600 dark:text-green-400">
                    {results.success} generated
                  </span>
                )}
                {results.failed > 0 && (
                  <span className="text-red-600 dark:text-red-400">
                    {results.failed} failed
                  </span>
                )}
                <button 
                  onClick={() => setResults({ success: 0, failed: 0, messages: [] })}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto text-xs text-gray-600 dark:text-gray-400">
              {results.messages.slice(-10).map((msg, i) => (
                <div key={i} className={msg.startsWith('✓') ? 'text-green-600 dark:text-green-400' : msg.startsWith('✗') ? 'text-red-600 dark:text-red-400' : ''}>
                  {msg}
                </div>
              ))}
            </div>
          </div>
        )}

        {showBriefs ? (
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {!seeded && (
              <div className="mb-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm">
                <strong>Step 1:</strong> Click "Seed to Firestore" to save briefs before generating articles.
              </div>
            )}
            {filteredBriefs.slice(briefsPage * BRIEFS_PER_PAGE, (briefsPage + 1) * BRIEFS_PER_PAGE).map((brief, idx) => (
              <BriefRow 
                key={brief.id} 
                brief={brief} 
                index={briefsPage * BRIEFS_PER_PAGE + idx + 1}
                isGenerating={generatingIds.has(brief.id)}
                onGenerate={seeded ? handleGenerate : undefined}
              />
            ))}
            {filteredBriefs.length > BRIEFS_PER_PAGE && (
              <div className="flex items-center justify-between py-3 px-2 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setBriefsPage(p => Math.max(0, p - 1))}
                  disabled={briefsPage === 0}
                  className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Page {briefsPage + 1} of {Math.ceil(filteredBriefs.length / BRIEFS_PER_PAGE)} ({filteredBriefs.length} briefs)
                </span>
                <button
                  onClick={() => setBriefsPage(p => Math.min(Math.ceil(filteredBriefs.length / BRIEFS_PER_PAGE) - 1, p + 1))}
                  disabled={briefsPage >= Math.ceil(filteredBriefs.length / BRIEFS_PER_PAGE) - 1}
                  className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>Click "Load Briefs" to generate the full content matrix</p>
            <p className="text-sm mt-1">~{content.totalBriefs} briefs across all 6 exams + 54 state pages</p>
          </div>
        )}
      </Card>
    </div>
  );
}

// ============================================================================
// SEM Tab
// ============================================================================

function SEMTab({ status }: { status: ReturnType<typeof getGrowthEngineStatus> | null }) {
  const [campaigns, setCampaigns] = useState<ReturnType<typeof generateAllCampaigns> | null>(null);
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!status) return null;

  const { campaigns: campaignSummary } = status;

  const loadCampaigns = async () => {
    // Load user's budget config so campaigns respect their settings
    const cfg = await getGrowthConfig();
    const all = generateAllCampaigns(cfg.examBudgets);
    setCampaigns(all);
  };

  const syncToGoogleAds = async () => {
    if (!campaigns || campaigns.length === 0) return;
    setSyncing(true);
    setSyncResult(null);
    try {
      const syncFn = httpsCallable(functions, 'growthSyncCampaigns');
      const result = await syncFn({ campaigns: campaigns.map(c => ({
        id: c.id,
        courseId: c.courseId,
        name: c.name,
        dailyBudget: c.dailyBudget,
        targetCPA: c.targetCPA,
        adGroups: c.adGroups.map(ag => ({
          name: ag.name,
          theme: ag.theme,
          keywords: ag.keywords,
          ads: ag.ads,
          negativeKeywords: ag.negativeKeywords,
          landingPage: ag.landingPage,
          maxCpc: ag.maxCpc,
        })),
      }))});
      const data = result.data as { success: boolean; message?: string };
      setSyncResult({ success: data.success, message: data.message || 'Campaigns synced to Google Ads (PAUSED)' });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Sync failed';
      setSyncResult({ success: false, message: errMsg });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={Megaphone} label="Campaigns" value={campaignSummary.totalCampaigns.toString()} color="blue" />
        <MetricCard icon={Layers} label="Ad Groups" value={campaignSummary.totalAdGroups.toString()} color="green" />
        <MetricCard icon={Search} label="Keywords" value={campaignSummary.totalKeywords.toString()} color="purple" />
        <MetricCard icon={DollarSign} label="Est. Monthly Spend" value={`$${campaignSummary.estimatedMonthlySpend.toLocaleString()}`} subtext={`$${campaignSummary.totalDailyBudget}/day`} color="amber" />
      </div>

      {/* Campaign List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Structure</h2>
          <div className="flex items-center gap-2">
            {campaigns && campaigns.length > 0 && (
              <Button variant="primary" size="sm" onClick={syncToGoogleAds} loading={syncing} leftIcon={ArrowUpRight}>
                Sync to Google Ads
              </Button>
            )}
            <Button variant={campaigns ? 'ghost' : 'primary'} size="sm" onClick={loadCampaigns} leftIcon={Megaphone}>
              {campaigns ? 'Refresh' : 'Generate Campaigns'}
            </Button>
          </div>
        </div>

        {campaigns ? (
          <div className="space-y-3">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedCampaign(expandedCampaign === campaign.id ? null : campaign.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${EXAM_COLORS[campaign.courseId]}`} />
                    <span className="font-semibold text-gray-900 dark:text-white">{campaign.name}</span>
                    <span className="text-xs text-gray-500">
                      {campaign.adGroups.length} ad groups • ${campaign.dailyBudget}/day
                    </span>
                  </div>
                  {expandedCampaign === campaign.id ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {expandedCampaign === campaign.id && (
                  <div className="p-4 space-y-3">
                    {campaign.adGroups.map(ag => (
                      <div key={ag.id} className="p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{ag.name}</span>
                            <span className="ml-2 text-xs text-gray-500 capitalize">({ag.theme})</span>
                          </div>
                          <span className="text-xs text-gray-500">${ag.maxCpc} max CPC</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {ag.keywords.slice(0, 5).map((kw, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              {kw.matchType === 'exact' ? `[${kw.keyword}]` :
                               kw.matchType === 'phrase' ? `"${kw.keyword}"` : kw.keyword}
                            </span>
                          ))}
                          {ag.keywords.length > 5 && (
                            <span className="text-xs px-2 py-0.5 text-gray-400">
                              +{ag.keywords.length - 5} more
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {ag.ads.length} ads • {ag.negativeKeywords.length} negatives • Landing: {ag.landingPage}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>Click "Generate Campaigns" to build out ad campaign structures</p>
            <p className="text-sm mt-1">{campaignSummary.totalCampaigns} campaigns with {campaignSummary.totalAdGroups} ad groups and {campaignSummary.totalKeywords} keywords</p>
          </div>
        )}

        {syncResult && (
          <div className={`mt-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
            syncResult.success
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {syncResult.success ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {syncResult.message}
          </div>
        )}
      </Card>

      {/* Bid Optimization Info */}
      <Card className="p-6 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
        <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-400 mb-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Bid Optimization Engine
        </h3>
        <ol className="text-sm text-purple-700 dark:text-purple-300 space-y-1 list-decimal list-inside">
          <li><strong>Target CPA Bidding:</strong> Auto-adjusts bids to hit target cost-per-acquisition per exam</li>
          <li><strong>Dayparting:</strong> +25% bids during evening study hours (5pm-10pm), -30% late night</li>
          <li><strong>Geographic:</strong> +15% in high-density candidate states (CA, TX, NY, FL)</li>
          <li><strong>Budget Reallocation:</strong> Shifts budget toward highest-ROAS exams automatically</li>
          <li><strong>Negative Mining:</strong> Auto-adds irrelevant search terms as negatives</li>
          <li><strong>Ad Copy Refresh:</strong> Monthly Gemini-powered headline and description regeneration</li>
        </ol>
      </Card>
    </div>
  );
}

// ============================================================================
// Technical SEO Tab
// ============================================================================

interface AuditResult {
  category: string;
  item: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
}

function TechnicalTab() {
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditResults, setAuditResults] = useState<AuditResult[] | null>(null);

  const runSeoAudit = async () => {
    setAuditRunning(true);
    setAuditResults(null);

    // Small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 500));

    const results: AuditResult[] = [];

    // Check meta tags
    const title = document.querySelector('title')?.textContent;
    results.push({
      category: 'Meta',
      item: 'Title Tag',
      status: title && title.length >= 10 && title.length <= 60 ? 'pass' : title ? 'warning' : 'fail',
      detail: title ? `"${title}" (${title.length} chars)` : 'Missing title tag',
    });

    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    results.push({
      category: 'Meta',
      item: 'Meta Description',
      status: metaDesc && metaDesc.length >= 50 && metaDesc.length <= 160 ? 'pass' : metaDesc ? 'warning' : 'fail',
      detail: metaDesc ? `${metaDesc.length} chars` : 'Missing meta description',
    });

    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    results.push({
      category: 'Meta',
      item: 'Canonical URL',
      status: canonical ? 'pass' : 'warning',
      detail: canonical || 'No canonical URL set',
    });

    // Check Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    results.push({
      category: 'Social',
      item: 'Open Graph Tags',
      status: ogTitle && ogDesc && ogImage ? 'pass' : ogTitle || ogDesc ? 'warning' : 'fail',
      detail: `Title: ${ogTitle ? '✓' : '✗'}, Desc: ${ogDesc ? '✓' : '✗'}, Image: ${ogImage ? '✓' : '✗'}`,
    });

    // Check structured data
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    results.push({
      category: 'Schema',
      item: 'JSON-LD Structured Data',
      status: jsonLdScripts.length > 0 ? 'pass' : 'warning',
      detail: `${jsonLdScripts.length} JSON-LD script(s) found`,
    });

    // Check headings
    const h1s = document.querySelectorAll('h1');
    results.push({
      category: 'Content',
      item: 'H1 Heading',
      status: h1s.length === 1 ? 'pass' : h1s.length === 0 ? 'fail' : 'warning',
      detail: h1s.length === 1 ? 'Single H1 found' : `${h1s.length} H1 tags (should be exactly 1)`,
    });

    const h2s = document.querySelectorAll('h2');
    results.push({
      category: 'Content',
      item: 'H2 Subheadings',
      status: h2s.length >= 2 ? 'pass' : h2s.length > 0 ? 'warning' : 'fail',
      detail: `${h2s.length} H2 tags found`,
    });

    // Check images
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === '');
    results.push({
      category: 'Accessibility',
      item: 'Image Alt Tags',
      status: imagesWithoutAlt.length === 0 ? 'pass' : imagesWithoutAlt.length <= 2 ? 'warning' : 'fail',
      detail: `${images.length} images, ${imagesWithoutAlt.length} missing alt text`,
    });

    // Check internal links
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
    results.push({
      category: 'Links',
      item: 'Internal Links',
      status: internalLinks.length >= 3 ? 'pass' : internalLinks.length > 0 ? 'warning' : 'fail',
      detail: `${internalLinks.length} internal links found`,
    });

    // Check external links
    const allLinks = document.querySelectorAll('a[href]');
    const externalLinks = Array.from(allLinks).filter(a => {
      const href = a.getAttribute('href');
      return href && (href.startsWith('http://') || href.startsWith('https://')) && !href.includes(window.location.hostname);
    });
    results.push({
      category: 'Links',
      item: 'External Links',
      status: 'pass',
      detail: `${externalLinks.length} external links found`,
    });

    setAuditResults(results);
    setAuditRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Technical SEO Checklist */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Technical SEO Status
        </h2>
        <div className="space-y-3">
          <ChecklistItem label="Sitemap.xml" status="active" detail="Auto-generated from routes + published articles" />
          <ChecklistItem label="Robots.txt" status="active" detail="App routes disallowed, public pages allowed" />
          <ChecklistItem label="JSON-LD Structured Data" status="active" detail="Organization, Course, FAQ, Article schemas" />
          <ChecklistItem label="Canonical URLs" status="active" detail="Set via useSEO hook on all public pages" />
          <ChecklistItem label="Open Graph Tags" status="active" detail="Title, description, image, type on all pages" />
          <ChecklistItem label="Meta Descriptions" status="active" detail="Dynamic per-page via useSEO hook" />
          <ChecklistItem label="Google Search Console" status="active" detail="Connected via Cloud Function for rank tracking" />
          <ChecklistItem label="DataForSEO API" status="pending" detail="Connect for keyword volume and SERP data" />
          <ChecklistItem label="Google Ads API" status="active" detail="Connected for automated campaign management" />
          <ChecklistItem label="Core Web Vitals Monitor" status="ready" detail="Client-side CWV measurement built in" />
          <ChecklistItem label="Internal Link Graph" status="ready" detail="Automated orphan page detection + link suggestions" />
          <ChecklistItem label="Pre-rendering (SSR)" status="planned" detail="Recommended: Astro for /blog/* routes via reverse proxy" />
        </div>
      </Card>

      {/* SEO Audit */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">On-Page SEO Audit</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={runSeoAudit}
            leftIcon={Search}
            loading={auditRunning}
          >
            Run Audit
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Scans the current page for meta tags, headings, structured data, images, and internal links.
          For a full site audit, use the Cloud Function which crawls all public pages.
        </p>

        {/* Audit Results */}
        {auditResults && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Audit Results</h3>
            <div className="space-y-2">
              {auditResults.map((result, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span className={clsx(
                    'w-2 h-2 rounded-full flex-shrink-0',
                    result.status === 'pass' && 'bg-green-500',
                    result.status === 'warning' && 'bg-amber-500',
                    result.status === 'fail' && 'bg-red-500'
                  )} />
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-40 flex-shrink-0">
                    {result.item}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 truncate">
                    {result.detail}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Pass
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Warning
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Fail
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Architecture Recommendations */}
      <Card className="p-6 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
        <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Architecture Recommendation: SSR for Content Pages
        </h3>
        <div className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
          <p>
            The VoraPrep SPA renders fine for Google, but SSR/pre-rendering drastically improves
            crawl efficiency and time-to-index. Recommended approach:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Option A (Recommended):</strong> Astro site at /blog/*, proxied via Firebase Hosting rewrites</li>
            <li><strong>Option B:</strong> Pre-render public pages at build time with react-snap or vite-plugin-ssr</li>
            <li><strong>Option C:</strong> Separate Next.js app on blog.voraprep.com (loses some domain authority)</li>
          </ul>
          <p>
            All blog content should remain under <strong>voraprep.com/blog/*</strong> for maximum domain authority.
            Syndication to Medium, LinkedIn, and dev.to should use canonical URLs pointing back.
          </p>
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// Settings & Budget Tab
// ============================================================================

function SettingsTab() {
  const [_config, setConfig] = useState<GrowthEngineConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testResult, setTestResult] = useState<{
    googleAds?: {connected: boolean; accountName?: string; error?: string};
    searchConsole?: {connected: boolean; siteUrl?: string; error?: string};
    dataForSEO?: {connected: boolean; balance?: string; error?: string};
  } | null>(null);

  // Local form state
  const [formState, setFormState] = useState({
    semEnabled: false,
    totalDailyBudget: 100,
    autoBidOptimization: false,
    bidOptimizationFrequency: 'daily' as 'hourly' | '6hr' | 'daily',
    autoNegativeKeywords: false,
    autoContentGeneration: true,
    contentReviewRequired: true,
    maxArticlesPerWeek: 10,
    rankTrackingEnabled: true,
    rankTrackingFrequency: 'daily' as 'daily' | 'weekly',
    siteAuditFrequency: 'weekly' as 'daily' | 'weekly',
    autoGenerateSitemap: true,
    weeklyReportEnabled: true,
    alertOnRankDrop: true,
    alertOnBudgetOverage: true,
    // Per-exam daily budgets
    examBudgets: {
      cpa: 30,
      ea: 15,
      cma: 20,
      cia: 10,
      cfp: 10,
      cisa: 15,
    } as Record<CourseId, number>,
    // Guard rails
    maxCpaMultiplier: 2.0,
    pauseOnZeroConversions: true,
    pauseAfterDays: 7,
    emergencyPauseAll: false,
    // API connection status (synced from Firestore)
    googleAdsConfigured: false,
    searchConsoleConfigured: false,
    dataForSEOConfigured: false,
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const cfg = await getGrowthConfig();
      setConfig(cfg);
      setFormState(prev => ({
        ...prev,
        ...cfg,
      }));
      // Auto-test all API connections on load
      testAllConnections();
    } catch (error) {
      logger.error('[GrowthDashboard] Failed to load config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      await updateGrowthConfig(formState);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to save';
      logger.error('[GrowthDashboard] Failed to save config:', error);
      setSaveError(msg);
      setTimeout(() => setSaveError(null), 8000);
    } finally {
      setSaving(false);
    }
  };

  const updateField = <K extends keyof typeof formState>(
    key: K,
    value: typeof formState[K],
  ) => {
    setFormState(prev => ({ ...prev, [key]: value }));
  };

  const updateExamBudget = (courseId: CourseId, budget: number) => {
    setFormState(prev => ({
      ...prev,
      examBudgets: { ...prev.examBudgets, [courseId]: budget },
    }));
  };

  const totalExamBudget = Object.values(formState.examBudgets).reduce((a, b) => a + b, 0);

  const handleTestConnection = async () => {
    testAllConnections();
  };

  const testAllConnections = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const testFn = httpsCallable(functions, 'growthTestConnections');
      const result = await testFn();
      const data = result.data as {
        googleAds?: {connected: boolean; accountName?: string; error?: string};
        searchConsole?: {connected: boolean; siteUrl?: string; error?: string};
        dataForSEO?: {connected: boolean; balance?: string; error?: string};
      };
      setTestResult(data);
      // Auto-update config flags based on real results
      const updates: Partial<typeof formState> = {};
      if (data.googleAds) updates.googleAdsConfigured = data.googleAds.connected;
      if (data.searchConsole) updates.searchConsoleConfigured = data.searchConsole.connected;
      if (data.dataForSEO) updates.dataForSEOConfigured = data.dataForSEO.connected;
      if (Object.keys(updates).length > 0) {
        setFormState(prev => ({ ...prev, ...updates }));
        // Persist connection status to Firestore so it shows correctly on reload
        try {
          await updateGrowthConfig(updates as Partial<GrowthEngineConfig>);
        } catch (e) {
          logger.warn('[GrowthDashboard] Failed to persist connection status:', e);
        }
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      setTestResult({
        googleAds: { connected: false, error: errMsg },
        searchConsole: { connected: false, error: errMsg },
        dataForSEO: { connected: false, error: errMsg },
      });
    } finally {
      setTesting(false);
    }
  };

  // Seed content briefs to Firestore
  const seedContentBriefs = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const seedFn = httpsCallable(functions, 'growthSeedBriefs');
      const result = await seedFn({});
      const data = result.data as { seeded?: number; skipped?: number; total?: number; message?: string };
      setSeedResult({
        success: true,
        message: data.message || `Seeded ${data.seeded || 0} briefs (${data.skipped || 0} already existed)`,
      });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      setSeedResult({ success: false, message: errMsg });
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Save Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Sliders className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Growth Engine Configuration</span>
          {saved && (
            <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Saved
            </span>
          )}
          {saveError && (
            <span className="text-xs font-medium text-red-600 dark:text-red-400 flex items-center gap-1">
              ⚠ Save failed: {saveError}
            </span>
          )}
        </div>
        <Button variant="primary" size="sm" onClick={handleSave} loading={saving} leftIcon={Save}>
          Save Configuration
        </Button>
      </div>

      {/* Emergency Kill Switch */}
      <Card className={`p-6 ${formState.emergencyPauseAll ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className={`w-6 h-6 ${formState.emergencyPauseAll ? 'text-red-500' : 'text-gray-400'}`} />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Emergency Pause</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Immediately pause ALL paid campaigns and automated actions. Use this if something goes wrong.
              </p>
            </div>
          </div>
          <button
            onClick={() => updateField('emergencyPauseAll', !formState.emergencyPauseAll)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              formState.emergencyPauseAll ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
              formState.emergencyPauseAll ? 'translate-x-7' : 'translate-x-1'
            }`} />
          </button>
        </div>
        {formState.emergencyPauseAll && (
          <div className="mt-3 p-3 rounded-lg bg-red-100 dark:bg-red-900/40 text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
            <Pause className="w-4 h-4 flex-shrink-0" />
            ALL automated spending is paused. No campaigns will run, no bids will be adjusted.
          </div>
        )}
      </Card>

      {/* SEM Budget Controls */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-500" />
          Budget Controls
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Set daily spend limits. These are enforced by the Google Ads API — actual spend will never exceed these caps.
        </p>

        {/* Master Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mb-4">
          <div>
            <div className="font-medium text-gray-900 dark:text-white text-sm">Enable Paid Search (SEM)</div>
            <div className="text-xs text-gray-500">Campaigns will only run when this is ON and Google Ads is connected</div>
          </div>
          <ToggleSwitch value={formState.semEnabled} onChange={(v) => updateField('semEnabled', v)} />
        </div>

        {/* Total Daily Budget */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Total Daily Budget
          </label>
          <div className="flex items-center gap-3">
            <span className="text-gray-500">$</span>
            <input
              type="number"
              min={0}
              max={10000}
              step={5}
              value={formState.totalDailyBudget}
              onChange={(e) => updateField('totalDailyBudget', Number(e.target.value))}
              className="w-32 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm"
            />
            <span className="text-sm text-gray-500">/day = ~${(formState.totalDailyBudget * 30.4).toFixed(0)}/month</span>
          </div>
        </div>

        {/* Per-Exam Budgets */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Per-Exam Daily Allocation
            </label>
            <span className={`text-xs font-medium ${
              totalExamBudget > formState.totalDailyBudget
                ? 'text-red-500'
                : totalExamBudget === formState.totalDailyBudget
                ? 'text-green-500'
                : 'text-amber-500'
            }`}>
              ${totalExamBudget} / ${formState.totalDailyBudget} allocated
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'] as CourseId[]).map(courseId => (
              <div key={courseId} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className={`w-3 h-3 rounded-full ${EXAM_COLORS[courseId]}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 uppercase">{courseId}</span>
                <div className="flex items-center gap-1 flex-1">
                  <span className="text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    min={0}
                    max={1000}
                    step={5}
                    value={formState.examBudgets[courseId]}
                    onChange={(e) => updateExamBudget(courseId, Number(e.target.value))}
                    className="w-20 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bid Optimization */}
        <div className="space-y-3 border-t dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Bid Optimization</div>
              <div className="text-xs text-gray-500">Adjust bids based on CPA, CTR, and conversion data</div>
            </div>
            <ToggleSwitch value={formState.autoBidOptimization} onChange={(v) => updateField('autoBidOptimization', v)} />
          </div>
          {formState.autoBidOptimization && (
            <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
              <label className="block text-xs font-medium text-gray-500 mb-1">Optimization Frequency</label>
              <select
                value={formState.bidOptimizationFrequency}
                onChange={(e) => updateField('bidOptimizationFrequency', e.target.value as 'hourly' | '6hr' | 'daily')}
                className="text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1.5"
              >
                <option value="hourly">Every hour</option>
                <option value="6hr">Every 6 hours</option>
                <option value="daily">Once daily</option>
              </select>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Negative Keywords</div>
              <div className="text-xs text-gray-500">Automatically add irrelevant search terms as negatives</div>
            </div>
            <ToggleSwitch value={formState.autoNegativeKeywords} onChange={(v) => updateField('autoNegativeKeywords', v)} />
          </div>
        </div>
      </Card>

      {/* Guard Rails */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          Guard Rails & Safety
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Automatic protections that pause campaigns when performance degrades.
        </p>

        <div className="space-y-4">
          {/* CPA Multiplier */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-Pause on High CPA</div>
                <div className="text-xs text-gray-500">
                  Pause ad group if CPA exceeds {formState.maxCpaMultiplier}x target
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-gray-500">Max CPA Multiplier:</label>
              <input
                type="number"
                min={1.5}
                max={5}
                step={0.5}
                value={formState.maxCpaMultiplier}
                onChange={(e) => updateField('maxCpaMultiplier', Number(e.target.value))}
                className="w-20 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-sm"
              />
              <span className="text-xs text-gray-400">× target CPA</span>
            </div>
          </div>

          {/* Zero Conversions */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Pause After Zero Conversions</div>
              <div className="text-xs text-gray-500">
                Pause ad group if it spends {'>'} $50 with zero conversions for {formState.pauseAfterDays} days
              </div>
            </div>
            <ToggleSwitch value={formState.pauseOnZeroConversions} onChange={(v) => updateField('pauseOnZeroConversions', v)} />
          </div>
          {formState.pauseOnZeroConversions && (
            <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 flex items-center gap-3">
              <label className="text-xs text-gray-500">Pause after:</label>
              <input
                type="number"
                min={3}
                max={30}
                step={1}
                value={formState.pauseAfterDays}
                onChange={(e) => updateField('pauseAfterDays', Number(e.target.value))}
                className="w-16 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-sm"
              />
              <span className="text-xs text-gray-400">days with zero conversions</span>
            </div>
          )}

          {/* Budget Overage Alert */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget Overage Alert</div>
              <div className="text-xs text-gray-500">Email alert if daily spend exceeds budget by 20%+</div>
            </div>
            <ToggleSwitch value={formState.alertOnBudgetOverage} onChange={(v) => updateField('alertOnBudgetOverage', v)} />
          </div>
        </div>
      </Card>

      {/* Content Pipeline Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-500" />
          Content Pipeline
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Controls for automated content generation via Gemini AI.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Content Generation</div>
              <div className="text-xs text-gray-500">Let Gemini draft articles from content briefs</div>
            </div>
            <ToggleSwitch value={formState.autoContentGeneration} onChange={(v) => updateField('autoContentGeneration', v)} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div>
              <div className="text-sm font-medium text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Require Human Review Before Publish
              </div>
              <div className="text-xs text-amber-700 dark:text-amber-400">
                STRONGLY recommended. Google penalizes auto-published AI content at scale.
              </div>
            </div>
            <ToggleSwitch value={formState.contentReviewRequired} onChange={(v) => updateField('contentReviewRequired', v)} />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Articles Per Week</div>
              <div className="text-xs text-gray-500">Rate limit to avoid content spam signals</div>
            </div>
            <input
              type="number"
              min={1}
              max={50}
              step={1}
              value={formState.maxArticlesPerWeek}
              onChange={(e) => updateField('maxArticlesPerWeek', Number(e.target.value))}
              className="w-20 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 text-sm"
            />
          </div>

          {/* Seed Content Briefs */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div>
              <div className="text-sm font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Seed Content Briefs
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-400">
                Populate 100+ article topics (study guides, comparisons, etc.) for auto-publishing.
              </div>
              {seedResult && (
                <div className={`text-xs mt-1 ${seedResult.success ? 'text-green-600' : 'text-red-600'}`}>
                  {seedResult.message}
                </div>
              )}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={seedContentBriefs}
              loading={seeding}
              leftIcon={Zap}
            >
              {seeding ? 'Seeding...' : 'Seed Briefs'}
            </Button>
          </div>
        </div>
      </Card>

      {/* SEO Tracking */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" />
          SEO Tracking
        </h2>
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Rank Tracking</div>
              <div className="text-xs text-gray-500">Monitor keyword positions via Google Search Console</div>
            </div>
            <ToggleSwitch value={formState.rankTrackingEnabled} onChange={(v) => updateField('rankTrackingEnabled', v)} />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-Generate Sitemap</div>
              <div className="text-xs text-gray-500">Rebuild sitemap.xml on every build with latest published articles</div>
            </div>
            <ToggleSwitch value={formState.autoGenerateSitemap} onChange={(v) => updateField('autoGenerateSitemap', v)} />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Rank Drop Alert</div>
              <div className="text-xs text-gray-500">Email alert when a tracked keyword drops 5+ positions</div>
            </div>
            <ToggleSwitch value={formState.alertOnRankDrop} onChange={(v) => updateField('alertOnRankDrop', v)} />
          </div>
        </div>
      </Card>

      {/* API Connections */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-500" />
            API Connections
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleTestConnection}
            loading={testing}
            leftIcon={RefreshCw}
          >
            {testing ? 'Testing All...' : 'Re-test All'}
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          External service credentials. Set via <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">firebase functions:secrets:set</code>
          {testing && <span className="ml-2 text-blue-500 font-medium">— Testing connections...</span>}
        </p>

        <div className="space-y-3">
          <APIConnectionRow
            name="Google Ads API"
            description="Campaign management, bid optimization, spend tracking"
            secretNames={['GOOGLE_ADS_DEVELOPER_TOKEN', 'GOOGLE_ADS_CLIENT_ID', 'GOOGLE_ADS_CLIENT_SECRET', 'GOOGLE_ADS_REFRESH_TOKEN', 'GOOGLE_ADS_CUSTOMER_ID']}
            configured={formState.googleAdsConfigured}
            testing={testing}
            testResult={testResult?.googleAds ? {
              connected: testResult.googleAds.connected,
              detail: testResult.googleAds.connected
                ? `Account: ${testResult.googleAds.accountName}`
                : undefined,
              error: testResult.googleAds.error,
            } : undefined}
          />
          <APIConnectionRow
            name="Google Search Console API"
            description="Keyword rank tracking, indexing status, crawl errors"
            secretNames={['GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL', 'GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY']}
            configured={formState.searchConsoleConfigured || false}
            testing={testing}
            testResult={testResult?.searchConsole ? {
              connected: testResult.searchConsole.connected,
              detail: testResult.searchConsole.connected
                ? `Site: ${testResult.searchConsole.siteUrl}`
                : undefined,
              error: testResult.searchConsole.error,
            } : undefined}
          />
          <APIConnectionRow
            name="DataForSEO API"
            description="Keyword volume, difficulty, CPC, and SERP data"
            secretNames={['DATAFORSEO_LOGIN', 'DATAFORSEO_PASSWORD']}
            configured={formState.dataForSEOConfigured || false}
            testing={testing}
            testResult={testResult?.dataForSEO ? {
              connected: testResult.dataForSEO.connected,
              detail: testResult.dataForSEO.connected
                ? `Balance: ${testResult.dataForSEO.balance}`
                : undefined,
              error: testResult.dataForSEO.error,
            } : undefined}
          />
          <APIConnectionRow
            name="Gemini AI"
            description="Content generation for articles (already configured)"
            secretNames={['GEMINI_API_KEY']}
            configured={true}
          />
          <APIConnectionRow
            name="Resend Email"
            description="Alert emails for budget/rank changes (already configured)"
            secretNames={['RESEND_API_KEY']}
            configured={true}
          />
        </div>
      </Card>

      {/* Credentials Instructions */}
      <Card className="p-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          How to Connect APIs
        </h3>
        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-3">
          <div>
            <strong className="block mb-1">1. Google Ads API</strong>
            <ol className="list-decimal list-inside space-y-1 ml-2 text-xs">
              <li>Apply for a Google Ads API developer token at <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">ads.google.com/aw/apicenter</code></li>
              <li>Create OAuth2 credentials in Google Cloud Console (type: Web Application)</li>
              <li>Generate a refresh token using the OAuth2 playground</li>
              <li>Get your Google Ads Customer ID (10-digit number, no dashes)</li>
              <li>Set all 5 secrets in Firebase:</li>
            </ol>
            <pre className="mt-1 text-xs bg-blue-100 dark:bg-blue-900/40 p-2 rounded overflow-x-auto">
{`firebase functions:secrets:set GOOGLE_ADS_DEVELOPER_TOKEN
firebase functions:secrets:set GOOGLE_ADS_CLIENT_ID
firebase functions:secrets:set GOOGLE_ADS_CLIENT_SECRET
firebase functions:secrets:set GOOGLE_ADS_REFRESH_TOKEN
firebase functions:secrets:set GOOGLE_ADS_CUSTOMER_ID`}
            </pre>
          </div>
          <div>
            <strong className="block mb-1">2. Google Search Console</strong>
            <ol className="list-decimal list-inside space-y-1 ml-2 text-xs">
              <li>Create a service account in Google Cloud Console</li>
              <li>Add the service account email as a user in Search Console for voraprep.com</li>
              <li>Download the JSON key file and extract client_email + private_key</li>
            </ol>
            <pre className="mt-1 text-xs bg-blue-100 dark:bg-blue-900/40 p-2 rounded overflow-x-auto">
{`firebase functions:secrets:set GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL
firebase functions:secrets:set GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY`}
            </pre>
          </div>
          <div>
            <strong className="block mb-1">3. DataForSEO</strong>
            <ol className="list-decimal list-inside space-y-1 ml-2 text-xs">
              <li>Sign up at <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">dataforseo.com</code> (free trial: 500 requests)</li>
              <li>Find your API login and password in the dashboard</li>
            </ol>
            <pre className="mt-1 text-xs bg-blue-100 dark:bg-blue-900/40 p-2 rounded overflow-x-auto">
{`firebase functions:secrets:set DATAFORSEO_LOGIN
firebase functions:secrets:set DATAFORSEO_PASSWORD`}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// Settings Sub-Components
// ============================================================================

function ToggleSwitch({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
        value ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );
}

function APIConnectionRow({
  name,
  description,
  secretNames,
  configured,
  onToggle,
  testResult,
  testing,
}: {
  name: string;
  description: string;
  secretNames: string[];
  configured: boolean;
  onToggle?: () => void;
  testResult?: { connected: boolean; detail?: string; error?: string };
  testing?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {secretNames.map(s => (
            <code key={s} className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1 py-0.5 rounded">{s}</code>
          ))}
        </div>
        {testing && !testResult && (
          <div className="mt-2 text-xs text-blue-500 flex items-center gap-1">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500" />
            Testing...
          </div>
        )}
        {testResult && (
          <div className={`mt-2 text-xs ${testResult.connected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {testResult.connected
              ? `✅ Connected${testResult.detail ? ` — ${testResult.detail}` : ''}`
              : `❌ Failed: ${testResult.error}`}
          </div>
        )}
      </div>
      {onToggle ? (
        <button
          onClick={onToggle}
          className={`ml-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
            configured
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
              : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-yellow-100 hover:text-yellow-700 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400'
          }`}
          title={configured ? 'Click to mark as not configured' : 'Click to mark as configured (after setting secrets)'}
        >
          {configured ? <><CheckCircle className="w-3 h-3" /> Connected</> : 'Not configured — click after setting secrets'}
        </button>
      ) : (
        <span className={`ml-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          testResult?.connected
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : configured
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : testResult
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          {testResult?.connected
            ? <><CheckCircle className="w-3 h-3" /> Connected</>
            : configured
              ? <><CheckCircle className="w-3 h-3" /> Connected</>
              : testResult
                ? <><AlertTriangle className="w-3 h-3" /> Failed</>
                : 'Checking...'}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// Shared Components
// ============================================================================

function MetricCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
  trend,
}: {
  icon: typeof BarChart3;
  label: string;
  value: string;
  subtext?: string;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'red';
  trend?: 'up' | 'down' | 'neutral';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-1">
            {value}
            {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-green-500" />}
            {trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-500" />}
          </div>
          {subtext && <div className="text-xs text-gray-400 mt-0.5">{subtext}</div>}
        </div>
      </div>
    </Card>
  );
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  action,
  status,
  onClick,
  loading,
}: {
  icon: typeof Search;
  title: string;
  description: string;
  action: string;
  status: 'ready' | 'running' | 'done';
  onClick?: () => void;
  loading?: boolean;
}) {
  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
          <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          <button 
            onClick={onClick}
            disabled={loading || status === 'done'}
            className={clsx(
              "mt-2 text-xs font-medium flex items-center gap-1 transition-colors",
              status === 'done' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-blue-600 dark:text-blue-400 hover:text-blue-700',
              loading && 'opacity-50 cursor-wait'
            )}
          >
            {loading ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                Running...
              </>
            ) : status === 'done' ? (
              <>
                <CheckCircle className="w-3 h-3" />
                Done
              </>
            ) : (
              <>
                {action}
                <ArrowUpRight className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function BriefRow({ 
  brief, 
  index,
  isGenerating,
  onGenerate,
}: { 
  brief: ContentBrief; 
  index: number;
  isGenerating?: boolean;
  onGenerate?: (brief: ContentBrief) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isGenerated = brief.status === 'review' || brief.status === 'published';
  
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors overflow-hidden">
      <div 
        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-8 text-center text-xs text-gray-400">{index}</div>
        <div className={`w-3 h-3 rounded-full ${EXAM_COLORS[brief.courseId]}`} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {brief.title}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
            <span className="capitalize">{brief.contentType.replace(/-/g, ' ')}</span>
            <span>•</span>
            <span>{brief.courseId.toUpperCase()}</span>
            {brief.section && <><span>•</span><span title={brief.section}>{SECTION_NAMES[brief.section] || brief.section}</span></>}
            <span>•</span>
            <span>{brief.wordCountTarget.toLocaleString()} words</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded font-medium ${
            brief.priority === 1 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
            brief.priority === 2 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
          }`}>
            P{brief.priority}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded font-medium capitalize ${
            brief.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            brief.status === 'approved' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
            brief.status === 'review' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
          }`}>
            {brief.status}
          </span>
          {/* Distribution icons for published articles */}
          {brief.status === 'published' && (
            <div className="flex items-center gap-1 ml-1" title="Distribution Status">
              <span 
                className={`w-5 h-5 flex items-center justify-center rounded ${
                  brief.distribution?.blog?.status === 'posted' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                }`}
                title={`Blog: ${brief.distribution?.blog?.status || 'published'}`}
              >
                <Globe className="w-3 h-3" />
              </span>
              <span 
                className={`w-5 h-5 flex items-center justify-center rounded ${
                  brief.distribution?.rss?.status === 'included' 
                    ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400' 
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                }`}
                title={`RSS: ${brief.distribution?.rss?.status || 'included'}`}
              >
                <Newspaper className="w-3 h-3" />
              </span>
              <span 
                className={`w-5 h-5 flex items-center justify-center rounded ${
                  brief.distribution?.linkedin?.status === 'posted' 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' 
                    : brief.distribution?.linkedin?.status === 'skipped'
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                }`}
                title={`LinkedIn: ${brief.distribution?.linkedin?.status || 'pending'}`}
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </span>
            </div>
          )}
          {expanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
        </div>
      </div>
      
      {/* Expanded Section */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          {/* Outline Preview */}
          {brief.outline && brief.outline.length > 0 && (
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">Outline</h4>
              <div className="space-y-2">
                {brief.outline.map((section, i) => (
                  <div key={i} className="text-xs">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{section.heading}</div>
                    {section.keyPoints && section.keyPoints.length > 0 && (
                      <ul className="mt-1 ml-3 text-gray-500 dark:text-gray-400 list-disc">
                        {section.keyPoints.slice(0, 3).map((kp, j) => (
                          <li key={j}>{kp}</li>
                        ))}
                        {section.keyPoints.length > 3 && (
                          <li className="text-gray-400">+{section.keyPoints.length - 3} more...</li>
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Target Keywords */}
          {brief.targetKeywords && brief.targetKeywords.length > 0 && (
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">Target Keywords</h4>
              <div className="flex flex-wrap gap-1">
                {brief.targetKeywords.map((kw, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Distribution Details for published articles */}
          {brief.status === 'published' && (
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">Distribution</h4>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <Globe className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">Blog:</span>
                  <a 
                    href={`https://voraprep.com/blog/${brief.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    voraprep.com/blog/{brief.slug}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Newspaper className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-gray-600 dark:text-gray-400">RSS:</span>
                  <span className="text-gray-700 dark:text-gray-300">Included in feed.xml</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <svg className="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">LinkedIn:</span>
                  {brief.distribution?.linkedin?.status === 'posted' && brief.distribution?.linkedin?.postUrl ? (
                    <a 
                      href={brief.distribution.linkedin.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View Post
                    </a>
                  ) : brief.linkedInUrl ? (
                    <a 
                      href={brief.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View Post
                    </a>
                  ) : (
                    <span className={`${
                      brief.distribution?.linkedin?.status === 'skipped' 
                        ? 'text-amber-600 dark:text-amber-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {brief.distribution?.linkedin?.status === 'skipped' 
                        ? `Skipped${brief.distribution.linkedin.reason ? `: ${brief.distribution.linkedin.reason}` : ''}`
                        : 'Not posted'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Generate Button */}
          {!isGenerated && onGenerate && (
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Button
                size="sm"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onGenerate(brief);
                }}
                disabled={isGenerating}
                leftIcon={isGenerating ? RefreshCw : Zap}
                className={isGenerating ? '[&_svg]:animate-spin' : ''}
              >
                {isGenerating ? 'Generating...' : 'Generate Article'}
              </Button>
            </div>
          )}
          
          {/* Already Generated Notice */}
          {isGenerated && (
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to="/admin/articles"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                {brief.status === 'review' ? 'View in Review Queue' : 'View Published Article'}
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChecklistItem({
  label,
  status,
  detail,
}: {
  label: string;
  status: 'active' | 'pending' | 'ready' | 'planned' | 'error';
  detail: string;
}) {
  const statusConfig = {
    active: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', text: 'Active' },
    pending: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', text: 'Pending' },
    ready: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', text: 'Ready' },
    planned: { icon: Target, color: 'text-gray-400', bg: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400', text: 'Planned' },
    error: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', text: 'Error' },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <StatusIcon className={`w-5 h-5 flex-shrink-0 ${config.color}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{label}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{detail}</div>
      </div>
      <span className={`text-xs px-2 py-0.5 rounded font-medium ${config.bg}`}>
        {config.text}
      </span>
    </div>
  );
}
