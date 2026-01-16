import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const DashboardPage = lazy(() => import('../pages/Dashboard'));
const HomePage = lazy(() => import('../pages/Home'));
const GenrePage = lazy(() => import('../pages/Genere'));
const MoviePage = lazy(() => import('../pages/Movie'));
const ActorPage = lazy(() => import('../pages/Actor'));
const DirectorPage = lazy(() => import('../pages/Director'));



export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="fade-in">Loading...</div>}>
      <Routes>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
        <Route path="/genre/:genreId" element={<PageTransition><GenrePage /></PageTransition>} />
        <Route path="/movie/:movieId" element={<PageTransition><MoviePage /></PageTransition>} />
        <Route path="/actor/:actorId" element={<PageTransition><ActorPage /></PageTransition>} />
        <Route path="/director/:directorId" element={<PageTransition><DirectorPage /></PageTransition>} />

      </Routes>
    </Suspense>
  );
}
