import { memo, useEffect, useCallback, useState } from 'react';
import type { CatImage } from '@/types';
import { Card } from '../../../components/common/Card';
import { Image } from '../../../components/common/Image';
import { FavoriteButton } from '../../../features/favorites/components/FavoriteButton';
import { Loader } from '../../../components/common/Loader';
import { Button } from '../../../components/common/Button';

interface RandomCatCardProps {
  cat: CatImage | null;
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
}

export const RandomCatCard = memo(function RandomCatCard({
  cat,
  isLoading,
  error,
  onRefresh,
}: RandomCatCardProps) {
  // Track if this is a new cat for animation
  const [isNew, setIsNew] = useState(false);

  // Animate when cat changes
  useEffect(() => {
    if (cat) {
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cat?.id]);

  // Effect to load initial cat
  useEffect(() => {
    if (!cat && !isLoading && !error) {
      onRefresh();
    }
  }, [cat, isLoading, error, onRefresh]);

  const handleRefresh = useCallback(() => {
    setIsNew(true);
    onRefresh();
    setTimeout(() => setIsNew(false), 300);
  }, [onRefresh]);

  // Loading skeleton state
  if (isLoading && !cat) {
    return (
      <Card className="aspect-video overflow-hidden">
        <div className="relative h-full bg-gray-100 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="h-12" />
          </div>
        </div>
      </Card>
    );
  }

  // Error state
  if (error && !cat) {
    return (
      <Card className="aspect-video flex flex-col items-center justify-center p-8">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-red-600 mb-4">{error.message}</p>
        <Button onClick={handleRefresh} variant="primary">
          Try Again
        </Button>
      </Card>
    );
  }

  // No cat state
  if (!cat) {
    return (
      <Card className="aspect-video flex items-center justify-center">
        <p className="text-gray-500">No cat available</p>
      </Card>
    );
  }

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 cursor-pointer ${
        isNew ? 'animate-fade-in' : ''
      }`}
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={cat.url}
          alt={`Random cat ${cat.id}`}
          className={`w-full h-full transition-transform duration-500 ${
            isNew ? 'scale-105' : 'scale-100'
          }`}
        />

        {/* Favorite button with heart animation */}
        <div className="absolute top-3 right-3">
          <FavoriteButton
            imageId={cat.id}
            imageUrl={cat.url}
          />
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {cat.width} × {cat.height}
        </span>
      </div>
    </Card>
  );
});
