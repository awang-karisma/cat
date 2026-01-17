import { memo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { CatGallery } from '../features/cats/components/CatGallery';
import { useCatImages } from '../features/cats/hooks/useCatImages';
import { useFavorites } from '../features/favorites/hooks/useFavorites';

export const HomePage = memo(function HomePage() {
  const { images, isLoading, error, hasMore, loadMore } = useCatImages();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const handleToggleFavorite = useCallback(
    (cat: { id: string; url: string }) => {
      toggleFavorite(cat.id, cat.url);
    },
    [toggleFavorite],
  );

  return (
    <>
      <Helmet>
        <title>Cat Gallery - Browse Adorable Cat Images</title>
        <meta
          name="description"
          content="Browse and discover adorable cat images from around the world. Save your favorites and explore different cat breeds."
        />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cat Gallery</h1>
          <p className="text-gray-600">
            Discover adorable cats from around the world
          </p>
        </div>
        <CatGallery
          images={images}
          favoriteIds={favoriteIds}
          isLoading={isLoading}
          error={error}
          hasMore={hasMore}
          onToggleFavorite={handleToggleFavorite}
          onLoadMore={loadMore}
        />
      </div>
    </>
  );
});
