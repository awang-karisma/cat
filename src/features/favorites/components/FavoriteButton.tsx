import { memo, useCallback, useEffect, useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  imageId: string;
  imageUrl: string;
}

export const FavoriteButton = memo(function FavoriteButton({
  imageId,
  imageUrl,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when favorited
  useEffect(() => {
    if (isFavorite(imageId)) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isFavorite, imageId]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Trigger animation
      if (!isFavorite(imageId)) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      }

      toggleFavorite(imageId, imageUrl);
    },
    [toggleFavorite, imageId, imageUrl, isFavorite],
  );

  const isActive = isFavorite(imageId);

  return (
    <button
      onClick={handleClick}
      className={`
        w-8 h-8 flex items-center justify-center
        rounded-full transition-all duration-300
        ${
          isActive
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-red-200 hover:text-red-500 shadow-md'
        }
        cursor-pointer
        ${isAnimating && isActive ? 'animate-heart-beat' : ''}
        hover:scale-110
      `}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isActive}
    >
      <svg
        className="w-4 h-4"
        fill={isActive ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
});
