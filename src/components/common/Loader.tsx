import { memo } from 'react';
import { ComponentProps } from '../../types';

type LoaderProps = ComponentProps;

export const Loader = memo(function Loader({ className = '' }: LoaderProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-200 border-t-primary-600" />
    </div>
  );
});
