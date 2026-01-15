import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const DashboardPage = lazy(() => import('../pages/Dashboard'));
const HomePage = lazy(() => import('../pages/Home'));


export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="fade-in">Loading...</div>}>
      <Routes>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
      </Routes>
    </Suspense>
  );
}
