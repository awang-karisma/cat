import { memo } from 'react';
import { Skeleton } from './Skeleton';
import { Card } from './Card';

interface SkeletonCardProps {
  showFavorite?: boolean;
}

export const SkeletonCard = memo(function SkeletonCard({
  showFavorite = true,
}: SkeletonCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Image placeholder */}
      <div className="aspect-square bg-gray-100 relative">
        <Skeleton
          variant="rectangular"
          className="w-full h-full rounded-none"
        />

        {/* Favorite button placeholder */}
        {showFavorite && (
          <div className="absolute top-3 right-3">
            <Skeleton
              variant="circular"
              width={32}
              height={32}
            />
          </div>
        )}
      </div>

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton width={60} height={12} />
          {showFavorite && (
            <Skeleton variant="circular" width={24} height={24} />
          )}
        </div>
      </div>
    </Card>
  );
});
