import { Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Suspense, lazy } from 'react';
import { LandingPage } from './features/landingPage/ui/LandingPage';
import { ProtectedRoute } from './middleware/auth';
import { Navigation } from './shared/components/Navigation/Navigation';

// Lazy load pages for better performance
const DataCollectionPage = lazy(() => import('./features/data-collection/ui/DataCollectionPage'));
const DashboardPage = lazy(() => import('./features/dashboard/ui/DashboardPage'));
const ProfilePage = lazy(() => import('./features/profile/ui/ProfilePage'));

// Layout component for protected routes
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navigation />
    <main className="min-h-screen bg-gray-50 pt-16">
      {children}
    </main>
  </>
);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected routes */}
        <Route
          path="/data-collection"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Suspense fallback={<div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>}>
                  <DataCollectionPage />
                </Suspense>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Suspense fallback={<div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>}>
                  <DashboardPage />
                </Suspense>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Suspense fallback={<div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>}>
                  <ProfilePage />
                </Suspense>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}
