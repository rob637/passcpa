import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Layouts (always loaded - part of shell)
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Common Components (always loaded)
import ErrorBoundary from './components/common/ErrorBoundary';
import { PageLoader, FullPageLoader } from './components/common/PageLoader';
import InstallPrompt from './components/common/InstallPrompt';
import { ToastProvider } from './components/common/Toast';
import { ThemeProvider } from './providers/ThemeProvider';
import { TourProvider, FirstTimePrompt } from './components/OnboardingTour';

// ============================================
// LAZY LOADED PAGES - Code Splitting
// Each page loads only when needed
// ============================================

// Auth Pages
const Login = lazy(() => import('./components/pages/auth/Login'));
const Register = lazy(() => import('./components/pages/auth/Register'));
const ForgotPassword = lazy(() => import('./components/pages/auth/ForgotPassword'));

// Core Pages (most used)
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const Study = lazy(() => import('./components/pages/Study'));
const Practice = lazy(() => import('./components/pages/Practice'));
const Progress = lazy(() => import('./components/pages/Progress'));
const Settings = lazy(() => import('./components/pages/Settings'));

// Training Modes
const Flashcards = lazy(() => import('./components/pages/Flashcards'));
const TimedQuiz = lazy(() => import('./components/pages/TimedQuiz'));
const ExamSimulator = lazy(() => import('./components/pages/ExamSimulator'));
const TBSSimulator = lazy(() => import('./components/pages/TBSSimulator'));
const WrittenCommunication = lazy(() => import('./components/pages/WrittenCommunication'));

// Content Pages
const Lessons = lazy(() => import('./components/pages/Lessons'));
const LessonViewer = lazy(() => import('./components/pages/LessonViewer'));
const AITutor = lazy(() => import('./components/pages/AITutor'));
const Achievements = lazy(() => import('./components/pages/Achievements'));

// Onboarding & Admin
const Onboarding = lazy(() => import('./components/pages/Onboarding'));
const AdminSeed = lazy(() => import('./components/pages/AdminSeed'));
const AdminCMS = lazy(() => import('./components/pages/admin/AdminCMS'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Suspense wrapper for lazy pages
const SuspensePage = ({ children }) => (
  <Suspense fallback={<PageLoader />}>
    <ErrorBoundary variant="page">{children}</ErrorBoundary>
  </Suspense>
);

function App() {
  return (
    <ErrorBoundary variant="page">
      <ThemeProvider>
        <TourProvider>
          <ToastProvider>
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
                </Route>

                {/* Onboarding (protected but different layout) */}
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute>
                      <SuspensePage>
                        <Onboarding />
                      </SuspensePage>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes (protected but different layout) */}
                <Route
                  path="/admin/cms"
                  element={
                    <ProtectedRoute>
                      <SuspensePage>
                        <AdminCMS />
                      </SuspensePage>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/seed"
                  element={
                    <ProtectedRoute>
                      <SuspensePage>
                        <AdminSeed />
                      </SuspensePage>
                    </ProtectedRoute>
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
                  <Route
                    path="/dashboard"
                    element={
                      <SuspensePage>
                        <Dashboard />
                      </SuspensePage>
                    }
                  />
                  <Route
                    path="/study"
                    element={
                      <SuspensePage>
                        <Study />
                      </SuspensePage>
                    }
                  />
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

                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>

            {/* PWA Install Prompt */}
            <InstallPrompt />

            {/* First-time User Tour Prompt */}
            <FirstTimePrompt />
          </ToastProvider>
        </TourProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
