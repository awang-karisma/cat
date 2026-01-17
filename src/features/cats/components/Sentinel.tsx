import { useEffect, useRef, memo } from 'react';

interface SentinelProps {
  page: number;
  onLoadPage: (page: number) => void;
  hasMore: boolean;
  isLoading: boolean;
}

/**
 * Sentinel component for page-starting infinite scroll pattern.
 * Triggers loading of the next page when this sentinel comes into view.
 */
export const Sentinel = memo(function Sentinel({ 
  page, 
  onLoadPage, 
  hasMore, 
  isLoading 
}: SentinelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadPage(page);
        }
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [page, onLoadPage, hasMore, isLoading]);

  return (
    <div 
      ref={ref} 
      className="h-4" 
      aria-hidden="true" 
      data-page={page}
    />
  );
});
