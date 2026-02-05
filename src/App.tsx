import { lazy, Suspense, ReactNode, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
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
import { CourseProvider } from './providers/CourseProvider';
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
const TBSSimulator = lazy(() => import('./components/pages/TBSSimulator'));
const WrittenCommunication = lazy(() => import('./components/pages/WrittenCommunication'));

// Content Pages
const Lessons = lazy(() => import('./components/pages/Lessons'));
const LessonMatrix = lazy(() => import('./components/pages/LessonMatrix'));
const LessonViewer = lazy(() => import('./components/pages/LessonViewer'));
const StudyJourney = lazy(() => import('./components/pages/StudyJourney'));
const AITutor = lazy(() => import('./components/pages/AITutor'));
const Achievements = lazy(() => import('./components/pages/Achievements'));
const Community = lazy(() => import('./components/pages/Community'));

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

// Business Pages
const Pricing = lazy(() => import('./components/pages/Pricing'));
const Landing = lazy(() => import('./components/pages/Landing'));

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
  const location = useLocation();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to onboarding if not complete (unless we're already on onboarding page or skipOnboarding is true)
  // Only redirect if userProfile exists - if it's still loading/null, wait rather than redirect
  if (!skipOnboarding && userProfile && !userProfile.onboardingComplete && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isAdmin = (userProfile as any)?.isAdmin === true;
  
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
    if (updateFn) {
      // Mark that we're updating to prevent banner from showing immediately after reload
      // Use localStorage for persistence (sessionStorage can be unreliable during reloads)
      localStorage.setItem('pwa-just-updated', Date.now().toString());
      
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
      
      // Fallback: if controllerchange doesn't fire within 3s, force reload
      setTimeout(() => {
        reloadOnce();
      }, 3000);
    } else {
      // Fallback: force reload to bypass cache
      window.location.reload();
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

                {/* Landing Page (public, for non-logged-in visitors) */}
                <Route
                  path="/"
                  element={
                    <SuspensePage>
                      <Landing />
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
                
                {/* Business Pages (public) */}
                <Route
                  path="/pricing"
                  element={
                    <SuspensePage>
                      <Pricing />
                    </SuspensePage>
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
