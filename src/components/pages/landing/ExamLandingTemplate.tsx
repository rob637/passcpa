/**
 * Unified Exam Landing Page Template
 * All 6 exam landing pages use this template with exam-specific data
 * 
 * Uniform Structure:
 * 1. Hero + Beta Badge + CTA
 * 2. Why Become a [Certification]?
 * 3. Exam Overview (Parts/Domains)
 * 4. Why VoraPrep (shared features)
 * 5. Competitor Comparison (if available)
 * 6. Final CTA
 * 7. Footer
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Check,
  X,
  Menu,
} from 'lucide-react';
import { ExamLandingConfig, SHARED_WHY_VORAPREP } from './ExamLandingData';
import { isFounderPricingActive, founderDaysRemaining } from '../../../services/subscription';
import { useAuth } from '../../../hooks/useAuth';

interface ExamLandingTemplateProps {
  config: ExamLandingConfig;
}

const ExamLandingTemplate = ({ config }: ExamLandingTemplateProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [config.id]);

  // Color utility - maps color name to Tailwind classes
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; light: string; ring: string; gradient: string }> = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', ring: 'ring-blue-500', gradient: 'from-blue-600 to-blue-700' },
      emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50', ring: 'ring-emerald-500', gradient: 'from-emerald-600 to-teal-600' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50', ring: 'ring-purple-500', gradient: 'from-purple-600 to-indigo-600' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50', ring: 'ring-amber-500', gradient: 'from-amber-500 to-orange-600' },
      green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', ring: 'ring-green-500', gradient: 'from-green-500 to-emerald-600' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50', ring: 'ring-cyan-500', gradient: 'from-cyan-500 to-blue-600' },
    };
    return colorMap[color] || colorMap.blue;
  };

  const colors = getColorClasses(config.primaryColor);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800" aria-label="Main navigation">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/">
              <img src="/logo.svg" alt="VoraPrep" className="h-8 sm:h-10 dark:hidden" />
              <img src="/logo-white.svg" alt="VoraPrep" className="h-8 sm:h-10 hidden dark:block" />
            </Link>
            <span className={`hidden sm:inline ${colors.text} font-bold text-lg`}>{config.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {/* Quick Exam Switcher Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
                Switch Exam
                <svg className="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <Link to="/cpa" className={`block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${config.id === 'cpa' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'text-slate-700 dark:text-slate-300'}`}>CPA - Certified Public Accountant</Link>
                  <Link to="/ea-prep" className={`block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${config.id === 'ea' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600' : 'text-slate-700 dark:text-slate-300'}`}>EA - Enrolled Agent</Link>
                  <Link to="/cma" className={`block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${config.id === 'cma' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600' : 'text-slate-700 dark:text-slate-300'}`}>CMA - Management Accountant</Link>
                  <Link to="/cia" className={`block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${config.id === 'cia' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600' : 'text-slate-700 dark:text-slate-300'}`}>CIA - Internal Auditor</Link>
                  <Link to="/cfp" className={`block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${config.id === 'cfp' ? 'bg-green-50 dark:bg-green-900/30 text-green-600' : 'text-slate-700 dark:text-slate-300'}`}>CFP - Financial Planner</Link>
                  <Link to="/cisa" className={`block px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${config.id === 'cisa' ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600' : 'text-slate-700 dark:text-slate-300'}`}>CISA - IS Auditor</Link>
                  <div className="border-t border-slate-200 dark:border-slate-700 mt-2 pt-2">
                    <Link to="/" className="block px-3 py-2 rounded-lg text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-medium">View All Certifications →</Link>
                  </div>
                </div>
              </div>
            </div>
            <a href="#why-become" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Why {config.name}?</a>
            <a href="#exam" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Exam</a>
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
            {config.competitors && (
              <a href="#comparison" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Compare</a>
            )}
            <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link to={config.loginPath} className="hidden md:block text-slate-600 dark:text-slate-300 hover:text-slate-900 px-4 py-2 transition-colors">
              Sign In
            </Link>
            <Link 
              to={config.registerPath}
              className={`bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
            >
              Start Free
            </Link>
            {/* Mobile hamburger menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-xl animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              <a 
                href="#why-become" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                Why {config.name}?
              </a>
              <a 
                href="#exam" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                Exam Overview
              </a>
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                Features
              </a>
              {config.competitors && (
                <a 
                  href="#comparison" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                >
                  Compare
                </a>
              )}
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                Pricing
              </a>
              
              <div className="border-t border-slate-200 dark:border-slate-700 my-2 pt-2">
                <p className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Other Certifications</p>
                <Link to="/cpa" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${config.id === 'cpa' ? colors.text + ' font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>CPA Exam Prep</Link>
                <Link to="/ea-prep" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${config.id === 'ea' ? colors.text + ' font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>EA Exam Prep</Link>
                <Link to="/cma" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${config.id === 'cma' ? colors.text + ' font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>CMA Exam Prep</Link>
                <Link to="/cia" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${config.id === 'cia' ? colors.text + ' font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>CIA Exam Prep</Link>
                <Link to="/cfp" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${config.id === 'cfp' ? colors.text + ' font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>CFP Exam Prep</Link>
                <Link to="/cisa" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg text-sm ${config.id === 'cisa' ? colors.text + ' font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>CISA Exam Prep</Link>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 my-2 pt-3 px-4">
                <Link 
                  to={config.loginPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main id="main-content">
        {/* ================================================================
            HERO SECTION
            ================================================================ */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 overflow-hidden">
          {/* Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.light} via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950`} />
          
          {/* Floating orbs */}
          <div className={`absolute top-20 left-10 w-72 h-72 ${colors.bg}/20 rounded-full blur-3xl animate-pulse`} />
          <div className={`absolute bottom-20 right-10 w-96 h-96 ${colors.bg}/10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }} />

          <div className={`max-w-7xl mx-auto relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Trial Badge */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/25">
                <Sparkles className="w-4 h-4" />
                14-Day Free Trial — Full Access, No Credit Card
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Notices */}
            {config.notices?.map((notice, idx) => (
              <div key={idx} className="flex justify-center mb-4">
                <div className={`inline-flex items-center gap-2 ${notice.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200' : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'} border px-4 py-2 rounded-lg text-sm`}>
                  <span className="font-semibold">{notice.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                  <span>{notice.text}</span>
                </div>
              </div>
            ))}

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-4 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Become a
              </span>
              <br />
              <span className={`bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} bg-clip-text text-transparent`}>
                {config.fullName}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
              {config.description}
              <br className="hidden md:block" />
              <span className={`font-semibold ${colors.text}`}>AI-powered prep</span> — start your free trial today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link 
                to={config.registerPath}
                className={`group bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white px-6 py-3 rounded-xl text-base font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2`}
              >
                Start Studying Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/"
                className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl text-base font-bold hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View All Certifications
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span>14-day free trial</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Check className={`w-4 h-4 ${colors.text}`} />
                {config.questionCount} Practice Questions
              </div>
              {config.lessonCount && (
                <div className="flex items-center gap-2">
                  <Check className={`w-4 h-4 ${colors.text}`} />
                  {config.lessonCount} Lessons
                </div>
              )}
              {config.flashcardCount && (
                <div className="flex items-center gap-2">
                  <Check className={`w-4 h-4 ${colors.text}`} />
                  {config.flashcardCount} Flashcards
                </div>
              )}
              <div className="flex items-center gap-2">
                <Check className={`w-4 h-4 ${colors.text}`} />
                AI-Powered Learning
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            WHY BECOME A [CERTIFICATION] SECTION
            ================================================================ */}
        <section id="why-become" className="scroll-mt-20 py-12 md:py-16 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Why Become a {config.name}?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                The {config.fullName} credential opens doors to career advancement and higher earnings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.whyBecome.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================
            EXAM OVERVIEW SECTION
            ================================================================ */}
        <section id="exam" className="scroll-mt-20 py-12 md:py-16 px-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                The {config.name} Exam
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {config.examParts.length} {config.examParts.length > 3 ? 'sections' : 'parts'} covering all areas of the {config.fullName} exam.
              </p>
            </div>

            <div className={`grid gap-6 ${config.examParts.length <= 3 ? 'md:grid-cols-3 max-w-4xl mx-auto' : config.examParts.length <= 6 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
              {config.examParts.map((part, idx) => (
                <Link 
                  key={idx}
                  to={`${config.registerPath}?section=${part.part}`}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer group"
                >
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white px-3 py-1 rounded-full text-sm font-semibold mb-3`}>
                    {part.part}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{part.title}</h3>
                  {(part.questions || part.time) && (
                    <div className="flex gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      {part.questions && <span>{part.questions}</span>}
                      {part.questions && part.time && <span>•</span>}
                      {part.time && <span>{part.time}</span>}
                    </div>
                  )}
                  <ul className="space-y-2">
                    {part.topics.slice(0, 4).map((topic, tidx) => (
                      <li key={tidx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                        {topic}
                      </li>
                    ))}
                    {part.topics.length > 4 && (
                      <li className="text-sm text-slate-500 dark:text-slate-400 pl-6">
                        +{part.topics.length - 4} more topics
                      </li>
                    )}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Start studying {part.part}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            WHY VORAPREP SECTION (shared across all exams)
            ================================================================ */}
        <section id="features" className="scroll-mt-20 py-12 md:py-16 px-6 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Why Study with VoraPrep?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Modern AI-powered learning designed for {config.name} exam success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SHARED_WHY_VORAPREP.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`${colors.text} font-bold text-sm`}>{item.stat}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================
            COMPETITOR COMPARISON SECTION (if available)
            ================================================================ */}
        {config.competitors && (
          <section id="comparison" className="scroll-mt-20 py-12 md:py-16 px-6 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  How We Compare
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  See how VoraPrep stacks up against other {config.name} prep courses
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-700">
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Feature</th>
                      <th className={`p-4 font-semibold ${colors.text}`}>VoraPrep</th>
                      {config.competitors.names.map((name, idx) => (
                        <th key={idx} className="p-4 font-semibold text-slate-600 dark:text-slate-400">{name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {config.competitors.data.map((row, idx) => (
                      <tr key={idx} className={`border-b border-slate-200 dark:border-slate-700 ${row.highlight ? `${colors.light}/50 dark:bg-slate-800/50` : ''}`}>
                        <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{row.feature}</td>
                        <td className="p-4 text-center">
                          {typeof row.voraprep === 'boolean' ? (
                            row.voraprep ? <CheckCircle className={`w-5 h-5 ${colors.text} mx-auto`} /> : <X className="w-5 h-5 text-slate-400 mx-auto" />
                          ) : (
                            <span className={`font-semibold ${colors.text}`}>{row.voraprep}</span>
                          )}
                        </td>
                        <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                          {typeof row.competitor1 === 'boolean' ? (
                            row.competitor1 ? <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" /> : <X className="w-5 h-5 text-slate-400 mx-auto" />
                          ) : row.competitor1}
                        </td>
                        <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                          {typeof row.competitor2 === 'boolean' ? (
                            row.competitor2 ? <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" /> : <X className="w-5 h-5 text-slate-400 mx-auto" />
                          ) : row.competitor2}
                        </td>
                        {row.competitor3 !== undefined && (
                          <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                            {typeof row.competitor3 === 'boolean' ? (
                              row.competitor3 ? <CheckCircle className="w-5 h-5 text-slate-400 mx-auto" /> : <X className="w-5 h-5 text-slate-400 mx-auto" />
                            ) : row.competitor3}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
                *Founding member annual rate — sign up by April 30, 2026, rate locked for 2 years. Regular annual pricing shown for competitors.
              </p>
            </div>
          </section>
        )}

        {/* ================================================================
            PRICING SECTION
            ================================================================ */}
        <PricingSection config={config} colors={colors} />

        {/* ================================================================
            FINAL CTA SECTION
            ================================================================ */}
        <section className={`py-12 md:py-20 px-6 bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo}`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Become a {config.name}?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of candidates using VoraPrep. Start your 14-day free trial!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={config.registerPath}
                className="group bg-white text-slate-900 px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Free Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/"
                className="border-2 border-white/50 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all duration-300"
              >
                View All Certifications
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================
          FOOTER
          ================================================================ */}
      <footer className="bg-slate-900 dark:bg-slate-950 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/logo-white.svg" alt="VoraPrep" className="h-8 mb-4" />
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Expert-crafted exam prep for accounting and finance professionals. 
                Built by practitioners, powered by AI.
              </p>
              <p className="text-slate-500 text-xs">
                {config.disclaimer}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Certifications</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/cpa" className={`hover:text-white transition-colors ${config.id === 'cpa' ? 'text-white font-medium' : ''}`}>CPA Exam Prep</Link></li>
                <li><Link to="/ea-prep" className={`hover:text-white transition-colors ${config.id === 'ea' ? 'text-white font-medium' : ''}`}>EA Exam Prep</Link></li>
                <li><Link to="/cma" className={`hover:text-white transition-colors ${config.id === 'cma' ? 'text-white font-medium' : ''}`}>CMA Exam Prep</Link></li>
                <li><Link to="/cia" className={`hover:text-white transition-colors ${config.id === 'cia' ? 'text-white font-medium' : ''}`}>CIA Exam Prep</Link></li>
                <li><Link to="/cfp" className={`hover:text-white transition-colors ${config.id === 'cfp' ? 'text-white font-medium' : ''}`}>CFP Exam Prep</Link></li>
                <li><Link to="/cisa" className={`hover:text-white transition-colors ${config.id === 'cisa' ? 'text-white font-medium' : ''}`}>CISA Exam Prep</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><a href="mailto:support@voraprep.com" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} VoraPrep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// PRICING SECTION COMPONENT
// ============================================================================

interface PricingSectionProps {
  config: ExamLandingConfig;
  colors: { bg: string; text: string; light: string; ring: string; gradient: string };
}

const PricingSection = ({ config, colors }: PricingSectionProps) => {
  const [billingInterval, setBillingInterval] = useState<'annual' | 'monthly'>('annual');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { user } = useAuth();
  
  // Reset checkout state on mount and bfcache restore (back button)
  // Also clear stale pendingCheckout if it's for a different course
  useEffect(() => {
    setIsCheckingOut(false);
    
    // Clear pendingCheckout if it's for a different course (user switched exams)
    const pendingCheckoutStr = localStorage.getItem('pendingCheckout');
    if (pendingCheckoutStr) {
      try {
        const pendingCheckout = JSON.parse(pendingCheckoutStr);
        if (pendingCheckout.course !== config.id) {
          localStorage.removeItem('pendingCheckout');
        }
      } catch {
        localStorage.removeItem('pendingCheckout');
      }
    }
    
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Page was restored from bfcache (back/forward navigation)
        setIsCheckingOut(false);
      }
    };
    
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [config.id]);
  
  // Founder pricing — single source of truth in subscription.ts
  const isFounderWindow = isFounderPricingActive();
  const daysRemaining = founderDaysRemaining();
  
  const pricing = config.pricing;
  const currentPrice = billingInterval === 'annual' 
    ? (isFounderWindow ? pricing.founderAnnual : pricing.annual)
    : (isFounderWindow ? pricing.founderMonthly : pricing.monthly);
  const regularPrice = billingInterval === 'annual' ? pricing.annual : pricing.monthly;
  const savings = billingInterval === 'annual' ? Math.round((1 - pricing.founderAnnual / pricing.annual) * 100) : 0;

  const features = [
    `${config.questionCount} practice questions`,
    `${config.lessonCount || '100+'} expert lessons`,
    config.flashcardCount ? `${config.flashcardCount} flashcards` : null,
    'Vory AI tutor - unlimited',
    'Real-time adaptive engine',
    'SM-2 spaced repetition',
    'Task-based simulations',
    'Full exam simulations',
    'Progress analytics',
    'Offline mode (PWA)',
    'Pass guarantee*',
  ].filter(Boolean);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Logged-in users go directly to checkout, others to registration
    if (user) {
      window.location.href = `/start-checkout?course=${config.id}&interval=${billingInterval}`;
    } else {
      window.location.href = `/register?course=${config.id}&redirect=checkout&interval=${billingInterval}`;
    }
  };

  return (
    <section id="pricing" className="scroll-mt-20 py-16 md:py-24 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {config.name} Exam Prep Pricing
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Premium exam prep at a fraction of traditional costs. 14-day free trial included.
          </p>
        </div>

        {/* Founder Banner */}
        {isFounderWindow && (
          <div className="mb-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 md:p-6 text-white text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <span className="text-2xl">🏆</span>
              <div>
                <span className="font-bold text-lg">Founding Member Pricing</span>
                <span className="mx-2">•</span>
                <span>Save over 40% — rate guaranteed for 2 years</span>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                {daysRemaining} days left
              </span>
            </div>
          </div>
        )}

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-1.5 inline-flex shadow-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setBillingInterval('annual')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingInterval === 'annual'
                  ? `bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white shadow-md`
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Annual
              {isFounderWindow && <span className="ml-2 text-xs opacity-80">(Best Value)</span>}
            </button>
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingInterval === 'monthly'
                  ? `bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white shadow-md`
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Popular Badge */}
            {billingInterval === 'annual' && (
              <div className={`absolute top-0 right-0 bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl`}>
                MOST POPULAR
              </div>
            )}

            {/* Price Header */}
            <div className={`bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} p-8 text-center text-white`}>
              <h3 className="text-xl font-bold mb-2">{config.name} Full Access</h3>
              
              <div className="flex items-baseline justify-center gap-2 mb-2">
                {isFounderWindow && regularPrice !== currentPrice && (
                  <span className="text-2xl text-white/60 line-through">${regularPrice}</span>
                )}
                <span className="text-5xl md:text-6xl font-bold">${currentPrice}</span>
                <span className="text-white/80">/{billingInterval === 'annual' ? 'year' : 'month'}</span>
              </div>
              
              {billingInterval === 'annual' && (
                <p className="text-white/80 text-sm">
                  Just ${(currentPrice / 12).toFixed(0)}/month • Save {savings}%
                </p>
              )}
              
              {billingInterval === 'monthly' && (
                <p className="text-white/80 text-sm">
                  Switch to annual and save ${(pricing.monthly * 12) - (isFounderWindow ? pricing.founderAnnual : pricing.annual)}/year
                </p>
              )}
              
              {isFounderWindow && (
                <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <span>🏆</span>
                  <span>Founder rate guaranteed through August 2028</span>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="p-8">
              <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                Everything you need to pass the {config.name} exam
              </p>
              
              <div className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0`} />
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Subscribe Now
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-4">
                Cancel anytime • Pass guarantee included
              </p>
            </div>

            {/* Pass Guarantee */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 border-t border-emerald-100 dark:border-emerald-900/30">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-300">Pass Guarantee</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">
                    *If you don't pass after meeting study requirements, we extend your subscription free.{' '}
                    <a href="/pass-guarantee" className="underline hover:text-emerald-600">See terms</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compare to competitors */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Compare to traditional review courses:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {config.competitors?.data.slice(0, 1).map((row, i) => (
              <div key={i} className="flex items-center gap-6 bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">{config.competitors?.names[0]}: <span className="text-slate-900 dark:text-white font-semibold">{row.competitor1}</span></span>
                <span className="text-slate-500">{config.competitors?.names[1]}: <span className="text-slate-900 dark:text-white font-semibold">{row.competitor2}</span></span>
                {config.competitors?.names[2] && row.competitor3 && (
                  <span className="text-slate-500">{config.competitors?.names[2]}: <span className="text-slate-900 dark:text-white font-semibold">{row.competitor3}</span></span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamLandingTemplate;
