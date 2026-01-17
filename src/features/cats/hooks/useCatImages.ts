import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { fetchCatImages } from '../api/catApi';
import type { CatImage } from '../types/cat';
import { PAGINATION } from '../../../config/constants';

interface UseCatImagesReturn {
  images: CatImage[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadedPages: Set<number>;
  loadPage: (pageNum: number) => void;
  refresh: () => void;
}

export function useCatImages(): UseCatImagesReturn {
  const [images, setImages] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set([1])); // Page 1 initially loaded
  const hasMoreRef = useRef(true);

  const loadImages = useCallback(async (pageNum: number) => {
    // Skip if already loaded
    if (loadedPages.has(pageNum)) {
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const newImages = await fetchCatImages(pageNum, PAGINATION.DEFAULT_PAGE_SIZE);

      setImages(prev => {
        // Deduplicate by ID
        const existingIds = new Set(prev.map(img => img.id));
        const uniqueNew = newImages.filter(img => !existingIds.has(img.id));
        return [...prev, ...uniqueNew];
      });

      setLoadedPages(prev => new Set([...prev, pageNum]));
      
      const hasMore = newImages.length > 0;
      hasMoreRef.current = hasMore;
      
      return newImages;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch images'));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [loadedPages]);

  // Initial load - just page 1
  useEffect(() => {
    loadImages(1);
  }, [loadImages]);

  const loadPage = useCallback((pageNum: number) => {
    if (!hasMoreRef.current) return;
    loadImages(pageNum);
  }, [loadImages]);

  const refresh = useCallback(() => {
    setLoadedPages(new Set([1]));
    setImages([]);
    hasMoreRef.current = true;
    loadImages(1);
  }, [loadImages]);

  const memoizedReturn = useMemo(() => ({
    images,
    isLoading,
    error,
    hasMore: hasMoreRef.current,
    loadedPages,
    loadPage,
    refresh,
  }), [images, isLoading, error, loadedPages, loadPage, refresh]);

  return memoizedReturn;
}
