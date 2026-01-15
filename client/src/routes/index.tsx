import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const DashboardPage = lazy(() => import('../pages/Dashboard'));
const HomePage = lazy(() => import('../pages/Home'));


export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Suspense>
  );
}
