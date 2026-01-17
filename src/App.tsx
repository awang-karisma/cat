import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Loader } from './components/common/Loader';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage').then(module => ({ default: module.FavoritesPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader className="h-64" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
