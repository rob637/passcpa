import React, { Suspense, ReactNode, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation, useSearchParams, useParams } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ENABLE_CPA_COURSE, ENABLE_EA_COURSE, ENABLE_CMA_COURSE, ENABLE_CIA_COURSE, ENABLE_CFP_COURSE, ENABLE_CISA_COURSE } from './config/featureFlags';
import { lazyWithRetry } from './utils/lazyWithRetry';
import { scrollToTop } from './utils/scroll';
import { saveCoursePreference } from './utils/courseDetection';
import { isAdminEmail } from './config/adminConfig';
import { getCourseHomePath } from './utils/courseNavigation';
import { initAnalytics, trackPageView } from './services/analytics';
import type { CourseId } from './types/course';

// Layouts (always loaded - part of shell)
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Common Components (always loaded)
import ErrorBoundary from './components/common/ErrorBoundary';
import { PageLoader, FullPageLoader } from './components/common/PageLoader';
import { SubscriptionGate } from './components/common/SubscriptionGate';
// import InstallPrompt from './components/common/InstallPrompt'; // Assuming this might be migrated or kept as JSX for now, but referenced as needed
import { ToastProvider } from './components/common/Toast';
import { UpdateBanner } from './components/common/UpdateBanner';
import { getUpdateFunction } from './main';
import { ThemeProvider } from './providers/ThemeProvider';
import { TourProvider } from './components/OnboardingTour';
import { CourseProvider, useCourse } from './providers/CourseProvider';
import { StudyProvider } from './providers/StudyProvider';
import { NavigationProvider } from './components/navigation';
// import { EnvironmentIndicator } from './components/common/EnvironmentIndicator';

// ============================================
// LAZY LOADED PAGES - Code Splitting
// Each page loads only when needed
// ============================================

// Auth Pages
const Login = lazyWithRetry(() => import('./components/pages/auth/Login'));
const Register = lazyWithRetry(() => import('./components/pages/auth/Register'));
const ForgotPassword = lazyWithRetry(() => import('./components/pages/auth/ForgotPassword'));
const VerifyEmail = lazyWithRetry(() => import('./components/pages/auth/VerifyEmail'));

// Core Pages (most used)
const Home = lazyWithRetry(() => import('./components/pages/Home'));
const Practice = lazyWithRetry(() => import('./components/pages/Practice'));
const Progress = lazyWithRetry(() => import('./components/pages/Progress'));
const Settings = lazyWithRetry(() => import('./components/pages/Settings'));
const You = lazyWithRetry(() => import('./components/pages/You'));

// Training Modes
const DailyChallenge = lazyWithRetry(() => import('./components/pages/DailyChallenge'));
const Flashcards = lazyWithRetry(() => import('./components/pages/Flashcards'));
const FlashcardSetup = lazyWithRetry(() => import('./components/FlashcardSetup'));
const TimedQuiz = lazyWithRetry(() => import('./components/pages/TimedQuiz'));
const ExamSimulator = lazyWithRetry(() => import('./components/pages/ExamSimulator'));
const CMAEssaySimulator = lazyWithRetry(() => import('./components/pages/CMAEssaySimulator'));
const CMACBQSimulator = lazyWithRetry(() => import('./components/pages/CMACBQSimulator'));
const EAExamSimulator = lazyWithRetry(() => import('./components/pages/EAExamSimulator'));
const EAFormExplorer = lazyWithRetry(() => import('./components/pages/EAFormExplorer'));
const EASection = lazyWithRetry(() => import('./components/pages/EASection'));
const EAInfo = lazyWithRetry(() => import('./components/pages/EAInfo'));
const EAStudyPlanSetup = lazyWithRetry(() => import('./components/pages/EAStudyPlanSetup'));
const CMAExamSimulator = lazyWithRetry(() => import('./components/pages/CMAExamSimulator'));
const CIAExamSimulator = lazyWithRetry(() => import('./components/pages/CIAExamSimulator'));
const CISAExamSimulator = lazyWithRetry(() => import('./components/pages/CISAExamSimulator'));
const CMAStudyPlanSetup = lazyWithRetry(() => import('./components/pages/CMAStudyPlanSetup'));
const CMASection = lazyWithRetry(() => import('./components/pages/CMASection'));
const TBSSimulator = lazyWithRetry(() => import('./components/pages/TBSSimulator'));
const WrittenCommunication = lazyWithRetry(() => import('./components/pages/WrittenCommunication'));
const CISASection = lazyWithRetry(() => import('./components/pages/CISASection'));
const CISAInfo = lazyWithRetry(() => import('./components/pages/CISAInfo'));
const CISAStudyPlanSetup = lazyWithRetry(() => import('./components/pages/CISAStudyPlanSetup'));

// Content Pages
const Lessons = lazyWithRetry(() => import('./components/pages/Lessons'));
const LessonMatrix = lazyWithRetry(() => import('./components/pages/LessonMatrix'));
const LessonViewer = lazyWithRetry(() => import('./components/pages/LessonViewer'));
const StudyJourney = lazyWithRetry(() => import('./components/pages/StudyJourney'));
const AITutor = lazyWithRetry(() => import('./components/pages/AITutor'));
const Achievements = lazyWithRetry(() => import('./components/pages/Achievements'));
const Community = lazyWithRetry(() => import('./components/pages/Community'));

// Resources Pages
const ResourcesHub = lazyWithRetry(() => import('./components/pages/resources/ResourcesHub').then(m => ({ default: m.default })));
const ResourceList = lazyWithRetry(() => import('./components/pages/resources/ResourceList').then(m => ({ default: m.default })));
const ResourceViewer = lazyWithRetry(() => import('./components/pages/resources/ResourceViewer').then(m => ({ default: m.default })));
const StrategyPage = lazyWithRetry(() => import('./components/pages/resources/StrategyPage').then(m => ({ default: m.default })));

// Onboarding & Admin
const Onboarding = lazyWithRetry(() => import('./components/pages/Onboarding'));
const DiagnosticQuiz = lazyWithRetry(() => import('./components/pages/DiagnosticQuiz'));
const DemoPractice = lazyWithRetry(() => import('./components/pages/DemoPractice'));
const AdminSeed = lazyWithRetry(() => import('./components/pages/AdminSeed'));
const AdminCMS = lazyWithRetry(() => import('./components/pages/admin/AdminCMS'));
const GrowthDashboard = lazyWithRetry(() => import('./components/pages/admin/GrowthDashboard'));
const ArticleReview = lazyWithRetry(() => import('./components/pages/admin/ArticleReview'));
const QuestionEditor = lazyWithRetry(() => import('./components/pages/admin/QuestionEditor'));
const LessonEditor = lazyWithRetry(() => import('./components/pages/admin/LessonEditor'));
const WCEditor = lazyWithRetry(() => import('./components/pages/admin/WCEditor'));
const TBSEditor = lazyWithRetry(() => import('./components/pages/admin/TBSEditor'));
const UserAnalyticsDashboard = lazyWithRetry(() => import('./components/pages/admin/UserAnalyticsDashboard'));
const ReferralSystem = lazyWithRetry(() => import('./components/pages/admin/ReferralSystem'));
const DiagnosticLeadMagnet = lazyWithRetry(() => import('./components/pages/admin/DiagnosticLeadMagnet'));
const TestimonialHarvester = lazyWithRetry(() => import('./components/pages/admin/TestimonialHarvester'));
const LinkedInPosts = lazyWithRetry(() => import('./components/pages/admin/LinkedInPosts'));

// Blog Pages (public, SEO content)
const BlogIndex = lazyWithRetry(() => import('./components/pages/blog/BlogIndex'));
const DynamicArticle = lazyWithRetry(() => import('./components/pages/blog/DynamicArticle'));
const HowToPassFAR = lazyWithRetry(() => import('./components/pages/blog/HowToPassFAR'));
const EAvsCPA = lazyWithRetry(() => import('./components/pages/blog/EAvsCPA'));
const CPAStudySchedule2026 = lazyWithRetry(() => import('./components/pages/blog/CPAStudySchedule2026'));

// Public Lead Magnet Pages
const DiagnosticPage = lazyWithRetry(() => import('./components/pages/DiagnosticPage'));

// Legal Pages
const Terms = lazyWithRetry(() => import('./components/pages/legal/Terms'));
const Privacy = lazyWithRetry(() => import('./components/pages/legal/Privacy'));
const HelpLegal = lazyWithRetry(() => import('./components/pages/legal/HelpLegal'));
const PassGuarantee = lazyWithRetry(() => import('./components/pages/legal/PassGuarantee'));

// Error Pages
const NotFound = lazyWithRetry(() => import('./components/pages/NotFound'));
const Unsubscribe = lazyWithRetry(() => import('./components/pages/Unsubscribe'));

// Checkout Pages
const CheckoutSuccess = lazyWithRetry(() => import('./components/pages/CheckoutSuccess'));
const CheckoutCancel = lazyWithRetry(() => import('./components/pages/CheckoutCancel'));
const StartCheckout = lazyWithRetry(() => import('./components/pages/StartCheckout'));

// Business Pages
const VoraPrep = lazyWithRetry(() => import('./components/pages/VoraPrep'));
// Unified Landing Pages (new template system)
const CPALanding = lazyWithRetry(() => import('./components/pages/landing/CPALandingNew'));
const EALanding = lazyWithRetry(() => import('./components/pages/landing/EALandingNew'));
const CMALanding = lazyWithRetry(() => import('./components/pages/landing/CMALandingNew'));
const CIALanding = lazyWithRetry(() => import('./components/pages/landing/CIALandingNew'));
const CFPLanding = lazyWithRetry(() => import('./components/pages/landing/CFPLandingNew'));
const CISALanding = lazyWithRetry(() => import('./components/pages/landing/CISALandingNew'));
// Info pages (keep original)
const CMAInfo = lazyWithRetry(() => import('./components/pages/CMAInfo'));
const CIAInfo = lazyWithRetry(() => import('./courses/cia/CIAInfo'));
const CIAStudyPlanSetup = lazyWithRetry(() => import('./courses/cia/CIAStudyPlanSetup'));
const CIASection = lazyWithRetry(() => import('./courses/cia/CIASection'));
const CFPSection = lazyWithRetry(() => import('./courses/cfp/CFPSection'));
const CFPCaseStudy = lazyWithRetry(() => import('./courses/cfp/CFPCaseStudy'));
const CFPExamSimulator = lazyWithRetry(() => import('./components/pages/CFPExamSimulator'));
const CFPInfo = lazyWithRetry(() => import('./components/pages/CFPInfo'));
const CFPStudyPlanSetup = lazyWithRetry(() => import('./components/pages/CFPStudyPlanSetup'));
const CPAInfo = lazyWithRetry(() => import('./components/pages/CPAInfo'));
const CPAStudyPlanSetup = lazyWithRetry(() => import('./components/pages/CPAStudyPlanSetup'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  
  return null;
};

// Global page tracker - initializes analytics and tracks ALL page views (including public landing pages)
const GlobalPageTracker = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    initAnalytics();
    
    // Capture UTM params and gclid on first landing for attribution
    // These persist in localStorage until user signs up
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'];
    utmParams.forEach(param => {
      const value = searchParams.get(param);
      if (value) {
        localStorage.setItem(param, value);
      }
    });
  }, [searchParams]);

  useEffect(() => {
    const title = document.title || 'VoraPrep';
    const timeout = setTimeout(() => {
      trackPageView(pathname, title);
    }, 150);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

// Force remount when course changes (prevents stale data in session-based components)
const CourseKeyed = ({ children }: { children: JSX.Element }) => {
  const { courseId } = useCourse();
  return <React.Fragment key={courseId}>{children}</React.Fragment>;
};

// Protected Route Component
interface RouteProps {
  children: JSX.Element;
  skipOnboarding?: boolean;
}

const ProtectedRoute = ({ children, skipOnboarding: _skipOnboarding = false }: RouteProps) => {
  const { user, userProfile: _userProfile, loading, profileLoaded } = useAuth();
  const { courseId: _courseId } = useCourse();
  const location = useLocation();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Require email verification before accessing protected routes
  // Grace period: new accounts get 3 days before we require verification
  // This reduces friction during initial signup flow
  const accountAgeMs = user.metadata?.creationTime 
    ? Date.now() - new Date(user.metadata.creationTime).getTime()
    : Infinity;
  const gracePeriodMs = 3 * 24 * 60 * 60 * 1000; // 3 days
  const withinGracePeriod = accountAgeMs < gracePeriodMs;
  
  if (!user.emailVerified && !withinGracePeriod && location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace />;
  }

  // Wait for user profile fetch to complete before making onboarding decisions.
  // profileLoaded becomes true once fetchUserProfile finishes (even if profile is null).
  if (!profileLoaded && location.pathname !== '/verify-email') {
    return <FullPageLoader />;
  }

  // ONBOARDING REMOVED: Users land directly on dashboard
  // The dashboard now has all the contextual prompts they need:
  // - Exam date prompt at top of Home
  // - Section picker in header
  // - Daily Plan card with "set exam date" message
  // - Diagnostic quiz prompt can appear in Practice page
  // This gets users to value in 0 screens after registration.

  return children;
};

// Admin-only Route - requires isAdmin: true in Firestore user profile OR whitelisted email
const AdminRoute = ({ children }: RouteProps) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check admin status from Firestore user profile OR email whitelist
  const isAdmin = userProfile?.isAdmin === true || isAdminEmail(user.email);
  
  if (!isAdmin) {
    // Non-admins silently redirected to home
    return <Navigate to="/home" replace />;
  }

  return children;
};

// Public Route (redirect to home if logged in)
const PublicRoute = ({ children }: RouteProps) => {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();

  if (loading) {
    return <FullPageLoader />;
  }

  if (user) {
    // Unverified users must verify their email first (after 3-day grace period)
    // Grace period allows new users to explore before requiring verification
    const accountAgeMs = user.metadata?.creationTime 
      ? Date.now() - new Date(user.metadata.creationTime).getTime()
      : Infinity;
    const gracePeriodMs = 3 * 24 * 60 * 60 * 1000; // 3 days
    const withinGracePeriod = accountAgeMs < gracePeriodMs;
    
    if (!user.emailVerified && !withinGracePeriod) {
      return <Navigate to="/verify-email" replace />;
    }

    // If user is already logged in and came from an exam-specific page
    // (e.g., /register?course=ea), redirect to that course's dashboard
    const courseParam = searchParams.get('course')?.toLowerCase();
    if (courseParam && ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'].includes(courseParam)) {
      // Save course preference so CourseProvider picks it up
      saveCoursePreference(courseParam as CourseId);
      localStorage.setItem('pendingCourse', courseParam);
      return <Navigate to={getCourseHomePath(courseParam as CourseId)} replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

// Suspense wrapper for lazy pages
const SuspensePage = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<PageLoader />}>
    <ErrorBoundary variant="page">{children}</ErrorBoundary>
  </Suspense>
);

// Premium content wrapper - requires subscription or active trial
const PremiumPage = ({ children }: { children: ReactNode }) => (
  <SuspensePage>
    <SubscriptionGate>{children}</SubscriptionGate>
  </SuspensePage>
);

// Course-prefixed URL redirect handler
// Handles URLs like /cpa/practice, /ea/study-plan from email links
const CourseRedirect = ({ to }: { to: string }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const validCourses = ['cpa', 'ea', 'cma', 'cia', 'cfp', 'cisa'];
  
  // Save course preference if valid
  if (courseId && validCourses.includes(courseId.toLowerCase())) {
    saveCoursePreference(courseId.toLowerCase() as CourseId);
  }
  
  // Preserve query parameters (e.g. ?section=FAR from campaign links)
  const destination = location.search ? `${to}${location.search}` : to;
  return <Navigate to={destination} replace />;
};

function App() {
  // Handle PWA updates
  const handleUpdate = useCallback(() => {
    const updateFn = getUpdateFunction();
    
    // Mark that we're updating to prevent banner from showing immediately after reload
    // Use localStorage for persistence (sessionStorage can be unreliable during reloads)
    localStorage.setItem('pwa-just-updated', Date.now().toString());
    
    if (updateFn) {
      // Listen for the new service worker to take control
      let reloaded = false;
      const reloadOnce = () => {
        if (!reloaded) {
          reloaded = true;
          window.location.reload();
        }
      };
      
      // When new SW takes control, reload
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', reloadOnce);
      }
      
      // Call update to trigger skipWaiting on waiting SW
      updateFn();
      
      // Fallback: if controllerchange doesn't fire within 1.5s, force reload
      setTimeout(() => {
        reloadOnce();
      }, 1500);
    } else {
      // No update function available - just force reload
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, []);

  return (
    <ErrorBoundary variant="page">
      <ThemeProvider>
        <CourseProvider>
          <StudyProvider>
          <NavigationProvider>
            <TourProvider>
              <ToastProvider>
              <ScrollToTop />
              <GlobalPageTracker />
              {/* <EnvironmentIndicator /> */}
              <UpdateBanner onUpdate={handleUpdate} />
              <Suspense fallback={<FullPageLoader />}>
                <Routes>
                  {/* Public Auth Routes */}
                  <Route element={<AuthLayout />}>
                    <Route
                      path="/login"
                      element={
                        <PublicRoute>
                          <SuspensePage>
                            <Login />
                          </SuspensePage>
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/register"
                    element={
                      <PublicRoute>
                        <SuspensePage>
                          <Register />
                        </SuspensePage>
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={
                      <PublicRoute>
                        <SuspensePage>
                          <ForgotPassword />
                        </SuspensePage>
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/verify-email"
                    element={
                      <SuspensePage>
                        <VerifyEmail />
                      </SuspensePage>
                    }
                  />
                </Route>

                {/* VoraPrep Main Landing (public, for non-logged-in visitors) */}
                <Route
                  path="/"
                  element={
                    <SuspensePage>
                      <VoraPrep />
                    </SuspensePage>
                  }
                />

                {/* CPA Landing Page (public) */}
                {ENABLE_CPA_COURSE && (
                  <>
                    <Route
                      path="/cpa"
                      element={
                        <SuspensePage>
                          <CPALanding />
                        </SuspensePage>
                      }
                    />
                    <Route
                      path="/cpa/info"
                      element={
                        <SuspensePage>
                          <CPAInfo />
                        </SuspensePage>
                      }
                    />
                    <Route
                      path="/cpa/study-plan"
                      element={
                        <SuspensePage>
                          <CPAStudyPlanSetup />
                        </SuspensePage>
                      }
                    />
                  </>
                )}

                {/* EA Landing Page (public) */}
                {ENABLE_EA_COURSE && (
                  <Route
                    path="/ea-prep"
                    element={
                      <SuspensePage>
                        <EALanding />
                      </SuspensePage>
                    }
                  />
                )}

                {/* CMA Landing Page (public) */}
                {ENABLE_CMA_COURSE && (
                  <>
                    <Route
                      path="/cma"
                      element={
                        <SuspensePage>
                          <CMALanding />
                        </SuspensePage>
                      }
                    />
                    <Route
                      path="/cma/info"
                      element={
                        <SuspensePage>
                          <CMAInfo />
                        </SuspensePage>
                      }
                    />
                  </>
                )}

                {/* CIA Landing Page (public) */}
                {ENABLE_CIA_COURSE && (
                  <>
                    <Route
                      path="/cia"
                      element={
                        <SuspensePage>
                          <CIALanding />
                        </SuspensePage>
                      }
                    />
                    <Route
                      path="/cia/info"
                      element={
                        <SuspensePage>
                          <CIAInfo />
                        </SuspensePage>
                      }
                    />
                  </>
                )}

                {/* CFP Landing Page (public) */}
                {ENABLE_CFP_COURSE && (
                  <>
                  <Route
                    path="/cfp"
                    element={
                      <SuspensePage>
                        <CFPLanding />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/cfp/info"
                    element={
                      <SuspensePage>
                        <CFPInfo />
                      </SuspensePage>
                    }
                  />
                  </>
                )}

                {/* CISA Landing Page (public) */}
                {ENABLE_CISA_COURSE && (
                  <Route
                    path="/cisa"
                    element={
                      <SuspensePage>
                        <CISALanding />
                      </SuspensePage>
                    }
                  />
                )}

                {/* Demo Practice - Try 5 Questions Free (public, no auth) */}
                <Route
                  path="/demo-practice"
                  element={
                    <SuspensePage>
                      <DemoPractice />
                    </SuspensePage>
                  }
                />

                {/* Legal Pages (public) */}
                <Route
                  path="/help"
                  element={
                    <SuspensePage>
                      <HelpLegal />
                    </SuspensePage>
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <SuspensePage>
                      <Terms />
                    </SuspensePage>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <SuspensePage>
                      <Privacy />
                    </SuspensePage>
                  }
                />
                <Route
                  path="/pass-guarantee"
                  element={
                    <SuspensePage>
                      <PassGuarantee />
                    </SuspensePage>
                  }
                />
                <Route
                  path="/terms/pass-guarantee"
                  element={
                    <SuspensePage>
                      <PassGuarantee />
                    </SuspensePage>
                  }
                />

                {/* Blog Routes (public, SEO content) */}
                <Route
                  path="/blog"
                  element={
                    <SuspensePage>
                      <BlogIndex />
                    </SuspensePage>
                  }
                />
                {/* Static blog articles (hand-crafted) */}
                <Route
                  path="/blog/how-to-pass-far-first-try"
                  element={
                    <SuspensePage>
                      <HowToPassFAR />
                    </SuspensePage>
                  }
                />
                <Route
                  path="/blog/ea-vs-cpa-which-certification"
                  element={
                    <SuspensePage>
                      <EAvsCPA />
                    </SuspensePage>
                  }
                />
                <Route
                  path="/blog/cpa-exam-study-schedule-2026"
                  element={
                    <SuspensePage>
                      <CPAStudySchedule2026 />
                    </SuspensePage>
                  }
                />
                {/* Dynamic blog articles (from Firestore/growth_content) */}
                <Route
                  path="/blog/:slug"
                  element={
                    <SuspensePage>
                      <DynamicArticle />
                    </SuspensePage>
                  }
                />
                
                {/* Public Diagnostic Quiz (lead magnet) */}
                <Route
                  path="/diagnostic/:configId"
                  element={
                    <SuspensePage>
                      <DiagnosticPage />
                    </SuspensePage>
                  }
                />
                
                {/* Email unsubscribe (public, one-click) */}
                <Route
                  path="/unsubscribe"
                  element={
                    <SuspensePage>
                      <Unsubscribe />
                    </SuspensePage>
                  }
                />
                
                {/* Business Pages (public) */}
                {/* Pricing is now per-exam - redirect to home */}
                <Route
                  path="/pricing"
                  element={<Navigate to="/" replace />}
                />
                {/* About redirect - no dedicated page, redirect to home */}
                <Route
                  path="/about"
                  element={<Navigate to="/" replace />}
                />
                
                {/* Checkout flow pages */}
                <Route
                  path="/checkout-success"
                  element={
                    <ProtectedRoute skipOnboarding>
                      <SuspensePage>
                        <CheckoutSuccess />
                      </SuspensePage>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout-cancel"
                  element={
                    <ProtectedRoute skipOnboarding>
                      <SuspensePage>
                        <CheckoutCancel />
                      </SuspensePage>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/start-checkout"
                  element={
                    <ProtectedRoute skipOnboarding>
                      <SuspensePage>
                        <StartCheckout />
                      </SuspensePage>
                    </ProtectedRoute>
                  }
                />

                {/* Onboarding (protected but different layout) */}
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute skipOnboarding>
                      <SuspensePage>
                        <Onboarding />
                      </SuspensePage>
                    </ProtectedRoute>
                  }
                />

                {/* Diagnostic Quiz (protected, standalone layout, skip onboarding check) */}
                <Route
                  path="/diagnostic"
                  element={
                    <ProtectedRoute skipOnboarding>
                      <SuspensePage>
                        <DiagnosticQuiz />
                      </SuspensePage>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes - requires isAdmin: true in user profile */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <AdminCMS />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/cms"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <AdminCMS />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/articles"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <ArticleReview />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/linkedin"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <LinkedInPosts />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/seed"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <AdminSeed />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/questions"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <QuestionEditor />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/lessons"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <LessonEditor />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/wc"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <WCEditor />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/tbs"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <TBSEditor />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/growth"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <GrowthDashboard />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <UserAnalyticsDashboard />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/referrals"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <ReferralSystem />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/diagnostics"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <DiagnosticLeadMagnet />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/testimonials"
                  element={
                    <AdminRoute>
                      <SuspensePage>
                        <TestimonialHarvester />
                      </SuspensePage>
                    </AdminRoute>
                  }
                />

                {/* Protected Main App Routes */}
                <Route
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* New primary routes */}
                  <Route
                    path="/home"
                    element={
                      <SuspensePage>
                        <Home />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/learn"
                    element={
                      <PremiumPage>
                        <Lessons />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/you"
                    element={
                      <SuspensePage>
                        <You />
                      </SuspensePage>
                    }
                  />
                  
                  {/* Legacy route redirects for backwards compatibility */}
                  <Route
                    path="/dashboard"
                    element={<Navigate to="/home" replace />}
                  />
                  <Route
                    path="/study"
                    element={<Navigate to="/learn" replace />}
                  />
                  
                  {/* Course-prefixed redirects for email links */}
                  <Route path="/:courseId/practice" element={<CourseRedirect to="/practice" />} />
                  <Route path="/:courseId/study-plan" element={<CourseRedirect to="/you/study-plan" />} />
                  <Route path="/:courseId/ai-tutor" element={<CourseRedirect to="/ai-tutor" />} />
                  
                  {/* Keep these routes accessible */}
                  <Route
                    path="/practice"
                    element={
                      <PremiumPage>
                        <CourseKeyed>
                          <Practice />
                        </CourseKeyed>
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/daily-challenge"
                    element={
                      <PremiumPage>
                        <CourseKeyed>
                          <DailyChallenge />
                        </CourseKeyed>
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/flashcards"
                    element={
                      <PremiumPage>
                        <FlashcardSetup />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/flashcards/session"
                    element={
                      <PremiumPage>
                        <Flashcards />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/quiz"
                    element={
                      <PremiumPage>
                        <TimedQuiz />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/exam"
                    element={
                      <PremiumPage>
                        <ExamSimulator />
                      </PremiumPage>
                    }
                  />
                  {ENABLE_EA_COURSE && (
                    <>
                      <Route
                        path="/ea-exam"
                        element={
                          <PremiumPage>
                            <EAExamSimulator />
                          </PremiumPage>
                        }
                      />
                      <Route
                        path="/ea"
                        element={
                          <SuspensePage>
                            <Home />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/ea/section/:sectionId"
                        element={
                          <SuspensePage>
                            <EASection />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/ea/info"
                        element={
                          <SuspensePage>
                            <EAInfo />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/ea/study-plan"
                        element={
                          <SuspensePage>
                            <EAStudyPlanSetup />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/ea/forms"
                        element={
                          <SuspensePage>
                            <EAFormExplorer />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/ea/learn"
                        element={<Navigate to="/learn" replace />}
                      />
                    </>
                  )}
                  {ENABLE_CMA_COURSE && (
                    <>
                      <Route
                        path="/cma-exam"
                        element={
                          <PremiumPage>
                            <CMAExamSimulator />
                          </PremiumPage>
                        }
                      />
                      <Route
                        path="/cma/dashboard"
                        element={
                          <SuspensePage>
                            <Home />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cma/study-plan"
                        element={
                          <SuspensePage>
                            <CMAStudyPlanSetup />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cma/essay"
                        element={
                          <PremiumPage>
                            <CMAEssaySimulator />
                          </PremiumPage>
                        }
                      />
                      <Route
                        path="/cma/cbq"
                        element={
                          <PremiumPage>
                            <CMACBQSimulator />
                          </PremiumPage>
                        }
                      />
                      <Route
                        path="/cma/learn"
                        element={<Navigate to="/learn" replace />}
                      />
                    </>
                  )}
                  {ENABLE_CMA_COURSE && (
                    <Route
                      path="/cma/section/:sectionId"
                      element={
                        <SuspensePage>
                          <CMASection />
                        </SuspensePage>
                      }
                    />
                  )}

                  {/* CIA Routes */}
                  {ENABLE_CIA_COURSE && (
                    <>
                      <Route
                        path="/cia-exam"
                        element={
                          <PremiumPage>
                            <CIAExamSimulator />
                          </PremiumPage>
                        }
                      />
                      <Route
                        path="/cia/dashboard"
                        element={
                          <SuspensePage>
                            <Home />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cia/study-plan"
                        element={
                          <SuspensePage>
                            <CIAStudyPlanSetup />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cia/section/:sectionId"
                        element={
                          <SuspensePage>
                            <CIASection />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cia/learn"
                        element={<Navigate to="/learn" replace />}
                      />
                    </>
                  )}

                  {/* CFP Routes */}
                  {ENABLE_CFP_COURSE && (
                    <>
                      <Route
                        path="/cfp-exam"
                        element={
                          <PremiumPage>
                            <CFPExamSimulator />
                          </PremiumPage>
                        }
                      />
                      <Route 
                        path="/cfp/dashboard" 
                        element={
                          <SuspensePage>
                            <Home />
                          </SuspensePage>
                        } 
                      />
                      <Route 
                        path="/cfp/cases" 
                        element={
                          <PremiumPage>
                            <CFPCaseStudy />
                          </PremiumPage>
                        } 
                      />
                      <Route
                        path="/cfp/study-plan"
                        element={
                          <SuspensePage>
                            <CFPStudyPlanSetup />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cfp/domain/:sectionId"
                        element={
                          <SuspensePage>
                            <CFPSection />
                          </SuspensePage>
                        }
                      />
                      <Route 
                        path="/cfp/learn" 
                        element={<Navigate to="/learn" replace />}
                      />
                    </>
                  )}

                  {/* CISA Routes */}
                  {ENABLE_CISA_COURSE && (
                    <>
                      <Route
                        path="/cisa-exam"
                        element={
                          <PremiumPage>
                            <CISAExamSimulator />
                          </PremiumPage>
                        }
                      />
                      <Route
                        path="/cisa/dashboard"
                        element={
                          <SuspensePage>
                            <Home />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cisa/info"
                        element={
                          <SuspensePage>
                            <CISAInfo />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cisa/study-plan"
                        element={
                          <SuspensePage>
                            <CISAStudyPlanSetup />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cisa/section/:id"
                        element={
                          <SuspensePage>
                            <CISASection />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cisa/learn"
                        element={<Navigate to="/learn" replace />}
                      />
                    </>
                  )}
                  <Route
                    path="/tbs"
                    element={
                      <PremiumPage>
                        <TBSSimulator />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/written-communication"
                    element={
                      <PremiumPage>
                        <WrittenCommunication />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/lessons"
                    element={
                      <PremiumPage>
                        <Lessons />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/resources"
                    element={
                      <SuspensePage>
                        <ResourcesHub />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/resources/strategy"
                    element={
                      <SuspensePage>
                        <StrategyPage />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/resources/:type"
                    element={
                      <SuspensePage>
                        <ResourceList />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/resources/:type/:itemId"
                    element={
                      <SuspensePage>
                        <ResourceViewer />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/journey"
                    element={
                      <PremiumPage>
                        <StudyJourney />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/lessons/matrix"
                    element={
                      <PremiumPage>
                        <LessonMatrix />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/lessons/:lessonId"
                    element={
                      <PremiumPage>
                        <LessonViewer />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/progress"
                    element={
                      <SuspensePage>
                        <Progress />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/community"
                    element={
                      <SuspensePage>
                        <Community />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/achievements"
                    element={
                      <SuspensePage>
                        <Achievements />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/tutor"
                    element={
                      <PremiumPage>
                        <AITutor />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/ai-tutor"
                    element={
                      <PremiumPage>
                        <AITutor />
                      </PremiumPage>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <SuspensePage>
                        <Settings />
                      </SuspensePage>
                    }
                  />
                </Route>

                {/* 404 - Not Found */}
                <Route path="*" element={<SuspensePage><NotFound /></SuspensePage>} />
              </Routes>
            </Suspense>
          </ToastProvider>
        </TourProvider>
      </NavigationProvider>
    </StudyProvider>
    </CourseProvider>
  </ThemeProvider>
</ErrorBoundary>
  );
}

export default App;
