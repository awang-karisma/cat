import { memo } from 'react';
import { ComponentProps } from '../../types';

interface SkeletonProps extends ComponentProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = memo(function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
}: SkeletonProps) {
  const baseStyles = 'bg-gray-200';

  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || '1rem',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} animate-pulse ${className}`}
      style={style}
    />
  );
});
