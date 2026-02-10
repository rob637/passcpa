import { lazy, Suspense, ReactNode, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { ENABLE_EA_COURSE, ENABLE_CMA_COURSE, ENABLE_CIA_COURSE, ENABLE_CFP_COURSE, ENABLE_CISA_COURSE } from './config/featureFlags';
import { scrollToTop } from './utils/scroll';

// Layouts (always loaded - part of shell)
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Common Components (always loaded)
import ErrorBoundary from './components/common/ErrorBoundary';
import { PageLoader, FullPageLoader } from './components/common/PageLoader';
// import InstallPrompt from './components/common/InstallPrompt'; // Assuming this might be migrated or kept as JSX for now, but referenced as needed
import { ToastProvider } from './components/common/Toast';
import { UpdateBanner } from './components/common/UpdateBanner';
import { getUpdateFunction } from './main';
import { ThemeProvider } from './providers/ThemeProvider';
import { TourProvider } from './components/OnboardingTour';
import { CourseProvider, useCourse } from './providers/CourseProvider';
import { NavigationProvider } from './components/navigation';
// import { EnvironmentIndicator } from './components/common/EnvironmentIndicator';

// ============================================
// LAZY LOADED PAGES - Code Splitting
// Each page loads only when needed
// ============================================

// Auth Pages
const Login = lazy(() => import('./components/pages/auth/Login'));
const Register = lazy(() => import('./components/pages/auth/Register'));
const ForgotPassword = lazy(() => import('./components/pages/auth/ForgotPassword'));
const VerifyEmail = lazy(() => import('./components/pages/auth/VerifyEmail'));

// Core Pages (most used)
const Home = lazy(() => import('./components/pages/Home'));
const Practice = lazy(() => import('./components/pages/Practice'));
const Progress = lazy(() => import('./components/pages/Progress'));
const Settings = lazy(() => import('./components/pages/Settings'));
const You = lazy(() => import('./components/pages/You'));

// Training Modes
const Flashcards = lazy(() => import('./components/pages/Flashcards'));
const FlashcardSetup = lazy(() => import('./components/FlashcardSetup'));
const TimedQuiz = lazy(() => import('./components/pages/TimedQuiz'));
const ExamSimulator = lazy(() => import('./components/pages/ExamSimulator'));
const CMAEssaySimulator = lazy(() => import('./components/pages/CMAEssaySimulator'));
const CMACBQSimulator = lazy(() => import('./components/pages/CMACBQSimulator'));
const EAExamSimulator = lazy(() => import('./components/pages/EAExamSimulator'));
const EAFormExplorer = lazy(() => import('./components/pages/EAFormExplorer'));
const EASection = lazy(() => import('./components/pages/EASection'));
const EAInfo = lazy(() => import('./components/pages/EAInfo'));
const EAStudyPlanSetup = lazy(() => import('./components/pages/EAStudyPlanSetup'));
const CMAExamSimulator = lazy(() => import('./components/pages/CMAExamSimulator'));
const CIAExamSimulator = lazy(() => import('./components/pages/CIAExamSimulator'));
const CISAExamSimulator = lazy(() => import('./components/pages/CISAExamSimulator'));
const CMAStudyPlanSetup = lazy(() => import('./components/pages/CMAStudyPlanSetup'));
const CMASection = lazy(() => import('./components/pages/CMASection'));
const TBSSimulator = lazy(() => import('./components/pages/TBSSimulator'));
const WrittenCommunication = lazy(() => import('./components/pages/WrittenCommunication'));
const CISASection = lazy(() => import('./components/pages/CISASection'));
const CISAInfo = lazy(() => import('./components/pages/CISAInfo'));
const CISAStudyPlanSetup = lazy(() => import('./components/pages/CISAStudyPlanSetup'));

// Content Pages
const Lessons = lazy(() => import('./components/pages/Lessons'));
const LessonMatrix = lazy(() => import('./components/pages/LessonMatrix'));
const LessonViewer = lazy(() => import('./components/pages/LessonViewer'));
const StudyJourney = lazy(() => import('./components/pages/StudyJourney'));
const AITutor = lazy(() => import('./components/pages/AITutor'));
const Achievements = lazy(() => import('./components/pages/Achievements'));
const Community = lazy(() => import('./components/pages/Community'));

// Resources Pages
const ResourcesHub = lazy(() => import('./components/pages/resources/ResourcesHub').then(m => ({ default: m.default })));
const ResourceList = lazy(() => import('./components/pages/resources/ResourceList').then(m => ({ default: m.default })));
const ResourceViewer = lazy(() => import('./components/pages/resources/ResourceViewer').then(m => ({ default: m.default })));
const StrategyPage = lazy(() => import('./components/pages/resources/StrategyPage').then(m => ({ default: m.default })));

// Onboarding & Admin
const Onboarding = lazy(() => import('./components/pages/Onboarding'));
const AdminSeed = lazy(() => import('./components/pages/AdminSeed'));
const AdminCMS = lazy(() => import('./components/pages/admin/AdminCMS'));
const QuestionEditor = lazy(() => import('./components/pages/admin/QuestionEditor'));
const LessonEditor = lazy(() => import('./components/pages/admin/LessonEditor'));
const WCEditor = lazy(() => import('./components/pages/admin/WCEditor'));
const TBSEditor = lazy(() => import('./components/pages/admin/TBSEditor'));

// Legal Pages
const Terms = lazy(() => import('./components/pages/legal/Terms'));
const Privacy = lazy(() => import('./components/pages/legal/Privacy'));
const HelpLegal = lazy(() => import('./components/pages/legal/HelpLegal'));
const PassGuarantee = lazy(() => import('./components/pages/legal/PassGuarantee'));

// Checkout Pages
const CheckoutSuccess = lazy(() => import('./components/pages/CheckoutSuccess'));
const CheckoutCancel = lazy(() => import('./components/pages/CheckoutCancel'));
const StartCheckout = lazy(() => import('./components/pages/StartCheckout'));

// Business Pages
const VoraPrep = lazy(() => import('./components/pages/VoraPrep'));
// Unified Landing Pages (new template system)
const CPALanding = lazy(() => import('./components/pages/landing/CPALandingNew'));
const EALanding = lazy(() => import('./components/pages/landing/EALandingNew'));
const CMALanding = lazy(() => import('./components/pages/landing/CMALandingNew'));
const CIALanding = lazy(() => import('./components/pages/landing/CIALandingNew'));
const CFPLanding = lazy(() => import('./components/pages/landing/CFPLandingNew'));
const CISALanding = lazy(() => import('./components/pages/landing/CISALandingNew'));
// Info pages (keep original)
const CMAInfo = lazy(() => import('./components/pages/CMAInfo'));
const CIAInfo = lazy(() => import('./courses/cia/CIAInfo'));
const CIAStudyPlanSetup = lazy(() => import('./courses/cia/CIAStudyPlanSetup'));
const CIASection = lazy(() => import('./courses/cia/CIASection'));
const CFPSection = lazy(() => import('./courses/cfp/CFPSection'));
const CFPCaseStudy = lazy(() => import('./courses/cfp/CFPCaseStudy'));
const CFPExamSimulator = lazy(() => import('./components/pages/CFPExamSimulator'));
const CFPInfo = lazy(() => import('./components/pages/CFPInfo'));
const CFPStudyPlanSetup = lazy(() => import('./components/pages/CFPStudyPlanSetup'));
const CPAInfo = lazy(() => import('./components/pages/CPAInfo'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  
  return null;
};

// Protected Route Component
interface RouteProps {
  children: JSX.Element;
  skipOnboarding?: boolean;
}

const ProtectedRoute = ({ children, skipOnboarding = false }: RouteProps) => {
  const { user, userProfile, loading } = useAuth();
  const { courseId } = useCourse();
  const location = useLocation();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to onboarding if not complete for the current course
  // Check per-course onboarding status (with fallback to legacy global flag for existing users)
  if (!skipOnboarding && userProfile && location.pathname !== '/onboarding') {
    const activeCourse = courseId; // Use courseId from CourseProvider
    const courseOnboarded = userProfile.onboardingCompleted?.[activeCourse];
    const legacyOnboarded = userProfile.onboardingComplete; // Legacy global flag
    
    // If course-specific onboarding is not done, redirect
    // Use legacy flag only if onboardingCompleted map doesn't exist yet (for migration)
    const isOnboarded = courseOnboarded ?? (legacyOnboarded && !userProfile.onboardingCompleted);
    
    if (!isOnboarded) {
      return <Navigate to="/onboarding" replace />;
    }
  }

  return children;
};

// Admin-only Route - requires isAdmin: true in Firestore user profile
const AdminRoute = ({ children }: RouteProps) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check admin status from Firestore user profile
  const isAdmin = userProfile?.isAdmin === true;
  
  if (!isAdmin) {
    // Non-admins silently redirected to home
    return <Navigate to="/home" replace />;
  }

  return children;
};

// Public Route (redirect to home if logged in)
const PublicRoute = ({ children }: RouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (user) {
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
          <NavigationProvider>
            <TourProvider>
              <ToastProvider>
              <ScrollToTop />
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
                
                {/* Business Pages (public) */}
                {/* Pricing is now per-exam - redirect to home */}
                <Route
                  path="/pricing"
                  element={<Navigate to="/" replace />}
                />
                
                {/* Checkout flow pages */}
                <Route
                  path="/checkout-success"
                  element={
                    <SuspensePage>
                      <CheckoutSuccess />
                    </SuspensePage>
                  }
                />
                <Route
                  path="/checkout-cancel"
                  element={
                    <SuspensePage>
                      <CheckoutCancel />
                    </SuspensePage>
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

                {/* Admin Routes - requires isAdmin: true in user profile */}
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
                      <SuspensePage>
                        <Lessons />
                      </SuspensePage>
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
                  
                  {/* Keep these routes accessible */}
                  <Route
                    path="/practice"
                    element={
                      <SuspensePage>
                        <Practice />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/flashcards"
                    element={
                      <SuspensePage>
                        <FlashcardSetup />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/flashcards/session"
                    element={
                      <SuspensePage>
                        <Flashcards />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/quiz"
                    element={
                      <SuspensePage>
                        <TimedQuiz />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/exam"
                    element={
                      <SuspensePage>
                        <ExamSimulator />
                      </SuspensePage>
                    }
                  />
                  {ENABLE_EA_COURSE && (
                    <>
                      <Route
                        path="/ea-exam"
                        element={
                          <SuspensePage>
                            <EAExamSimulator />
                          </SuspensePage>
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
                          <SuspensePage>
                            <CMAExamSimulator />
                          </SuspensePage>
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
                          <SuspensePage>
                            <CMAEssaySimulator />
                          </SuspensePage>
                        }
                      />
                      <Route
                        path="/cma/cbq"
                        element={
                          <SuspensePage>
                            <CMACBQSimulator />
                          </SuspensePage>
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
                          <SuspensePage>
                            <CIAExamSimulator />
                          </SuspensePage>
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
                          <SuspensePage>
                            <CFPExamSimulator />
                          </SuspensePage>
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
                          <SuspensePage>
                            <CFPCaseStudy />
                          </SuspensePage>
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
                          <SuspensePage>
                            <CISAExamSimulator />
                          </SuspensePage>
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
                      <SuspensePage>
                        <TBSSimulator />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/written-communication"
                    element={
                      <SuspensePage>
                        <WrittenCommunication />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/lessons"
                    element={
                      <SuspensePage>
                        <Lessons />
                      </SuspensePage>
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
                      <SuspensePage>
                        <StudyJourney />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/lessons/matrix"
                    element={
                      <SuspensePage>
                        <LessonMatrix />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/lessons/:lessonId"
                    element={
                      <SuspensePage>
                        <LessonViewer />
                      </SuspensePage>
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
                      <SuspensePage>
                        <AITutor />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/ai-tutor"
                    element={
                      <SuspensePage>
                        <AITutor />
                      </SuspensePage>
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

                {/* Default redirect - logged in users go to home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </Suspense>
          </ToastProvider>
        </TourProvider>
      </NavigationProvider>
    </CourseProvider>
  </ThemeProvider>
</ErrorBoundary>
  );
}

export default App;
