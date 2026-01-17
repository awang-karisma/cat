import { memo } from 'react';
import { CatCard } from './CatCard';
import { Loader } from '../../../components/common/Loader';
import { Button } from '../../../components/common/Button';
import type { CatImage } from '../types/cat';

interface CatGalleryProps {
  images: CatImage[];
  favoriteIds: string[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  onToggleFavorite: (cat: CatImage) => void;
  onLoadMore: () => void;
  className?: string;
}

export const CatGallery = memo(function CatGallery({
  images,
  favoriteIds,
  isLoading,
  error,
  hasMore,
  onToggleFavorite,
  onLoadMore,
  className = '',
}: CatGalleryProps) {
  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Button onClick={() => window.location.reload()} variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 content-visibility-auto"
        style={{ contain: 'content' }}
      >
        {images.map(cat => (
          <CatCard
            key={cat.id}
            cat={cat}
            isFavorite={favoriteIds.includes(cat.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {isLoading && (
        <div className="py-8">
          <Loader className="h-12" />
        </div>
      )}

      {!isLoading && hasMore && (
        <div className="py-8 text-center">
          <Button onClick={onLoadMore} variant="secondary">
            Load More
          </Button>
        </div>
      )}

      {!isLoading && images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No cat images found
        </div>
      )}
    </div>
  );
});
