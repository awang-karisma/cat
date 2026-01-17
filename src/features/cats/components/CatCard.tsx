import { memo } from 'react';
import { Card } from '../../../components/common/Card';
import { Image } from '../../../components/common/Image';
import type { CatImage as CatImageType } from '../types/cat';

interface CatCardProps {
  cat: CatImageType;
  isFavorite: boolean;
  onToggleFavorite: (cat: CatImageType) => void;
  className?: string;
}

export const CatCard = memo(function CatCard({
  cat,
  isFavorite,
  onToggleFavorite,
  className = '',
}: CatCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(cat);
  };

  return (
    <Card className={`group relative ${className}`}>
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={cat.url}
          alt={`Cat ${cat.id}`}
          className="w-full h-full"
          loading="lazy"
          prefetch
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-5 h-5 ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      {cat.breeds && cat.breeds.length > 0 && (
        <div className="p-3">
          <h3 className="font-semibold text-gray-800 truncate">
            {cat.breeds[0].name}
          </h3>
          {cat.breeds[0].origin && (
            <p className="text-sm text-gray-500">
              Origin: {cat.breeds[0].origin}
            </p>
          )}
        </div>
      )}
    </Card>
  );
});
