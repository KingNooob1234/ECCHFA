import React, { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './Layout.jsx';
import PullToRefresh from './components/PullToRefresh';
import { useNavigationDirection } from '@/hooks/useNavigationDirection';
import { saveTabState } from '@/lib/tabState';

const Home = lazy(() => import('./pages/Home'));
const MiniWorldCup = lazy(() => import('./pages/MiniWorldCup'));
const PlayerProfile = lazy(() => import('./pages/PlayerProfile'));
const Players = lazy(() => import('./pages/Players'));
const Rankings = lazy(() => import('./pages/Rankings'));
const TeamRoster = lazy(() => import('./pages/TeamRoster'));
const Account = lazy(() => import('./pages/Account'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-white/20 border-t-[#0066FF] rounded-full animate-spin" />
    </div>
  );
}

const pageVariants = {
  initial: (dir) => {
    if (dir === 'forward') return { x: '100%', opacity: 0 };
    if (dir === 'backward') return { x: '-30%', opacity: 0 };
    return { opacity: 0 };
  },
  animate: { x: 0, opacity: 1 },
  exit: (dir) => {
    if (dir === 'forward') return { x: '-30%', opacity: 0 };
    if (dir === 'backward') return { x: '100%', opacity: 0 };
    return { opacity: 0 };
  },
};

function LayoutWrapper() {
  const location = useLocation();
  const pathKey = location.pathname.replace('/', '').split('/')[0] || 'Home';
  const direction = useNavigationDirection(location);

  useEffect(() => {
    saveTabState(location.pathname, location.search);
  }, [location]);

  return (
    <Layout currentPageName={pathKey}>
      <PullToRefresh>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={location.pathname}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/MiniWorldCup" element={<MiniWorldCup />} />
                <Route path="/PlayerProfile" element={<PlayerProfile />} />
                <Route path="/Players" element={<Players />} />
                <Route path="/Rankings" element={<Rankings />} />
                <Route path="/TeamRoster" element={<TeamRoster />} />
                <Route path="/Account" element={<Account />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </PullToRefresh>
    </Layout>
  );
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0e1a]">
        <div className="w-8 h-8 border-4 border-white/20 border-t-[#0066FF] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return <LayoutWrapper />;
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App