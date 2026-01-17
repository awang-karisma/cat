import { memo, useCallback } from 'react';
import { CatCard } from './CatCard';
import { Loader } from '../../../components/common/Loader';
import { Button } from '../../../components/common/Button';
import { SkeletonCard } from '../../../components/common/SkeletonCard';
import { Sentinel } from './Sentinel';
import { useCatImages } from '../hooks/useCatImages';
import { useFavorites } from '../../../features/favorites/hooks/useFavorites';
import { PAGINATION } from '../../../config/constants';

interface CatGalleryProps {
  className?: string;
}

export const CatGallery = memo(function CatGallery({ className = '' }: CatGalleryProps) {
  const { images, isLoading, error, hasMore, loadedPages, loadPage, refresh } = useCatImages();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const handleToggleFavorite = useCallback(
    (cat: { id: string; url: string }) => {
      toggleFavorite(cat.id, cat.url);
    },
    [toggleFavorite],
  );

  // Skeleton count based on page size
  const skeletonCount = Array.from({ length: PAGINATION.DEFAULT_PAGE_SIZE }, (_, i) => i);

  // Calculate next page number for sentinel
  const loadedPagesArray = Array.from(loadedPages);
  const nextPage = loadedPagesArray.length > 0 ? Math.max(...loadedPagesArray) + 1 : 2;

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Button onClick={refresh} variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  // Show initial loading skeletons
  if (isLoading && images.length === 0) {
    return (
      <div className={className}>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 content-visibility-auto"
          style={{ contain: 'content' }}
        >
          {skeletonCount.map((index) => (
            <SkeletonCard key={`skeleton-${index}`} showFavorite={false} />
          ))}
        </div>
        <div className="py-4 text-center">
          <Loader className="h-8 inline-block" />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 content-visibility-auto"
        style={{ contain: 'content' }}
      >
        {/* Render all cat cards directly in grid */}
        {images.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            isFavorite={favoriteIds.includes(cat.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}

        {/* Sentinel placed at the end of the grid - triggers loading next page */}
        <Sentinel page={nextPage} onLoadPage={loadPage} hasMore={hasMore} isLoading={isLoading} />
      </div>

      {/* Loading indicator when fetching additional page */}
      {isLoading && images.length > 0 && (
        <div className="py-4 text-center">
          <Loader className="h-8 inline-block" />
        </div>
      )}

      {/* End of content message */}
      {!hasMore && images.length > 0 && (
        <p className="text-center text-gray-500 py-4">You&apos;ve seen all the cats! 🐱</p>
      )}

      {!isLoading && images.length === 0 && (
        <div className="text-center py-12 text-gray-500">No cat images found</div>
      )}
    </div>
  );
});
