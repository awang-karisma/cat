import { useCallback, useEffect, useState, useMemo } from 'react';
import { fetchCatImages } from '../api/catApi';
import type { CatImage } from '../types/cat';
import { PAGINATION } from '../../../config/constants';

interface UseCatImagesReturn {
  images: CatImage[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export function useCatImages(): UseCatImagesReturn {
  const [images, setImages] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadImages = useCallback(async (pageNum: number, isRefresh: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const newImages = await fetchCatImages(pageNum, PAGINATION.DEFAULT_PAGE_SIZE);

      if (isRefresh) {
        setImages(newImages);
      } else {
        setImages(prev => [...prev, ...newImages]);
      }

      setHasMore(newImages.length === PAGINATION.DEFAULT_PAGE_SIZE);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch images'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages(1, true);
  }, [loadImages]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadImages(nextPage);
    }
  }, [isLoading, hasMore, page, loadImages]);

  const refresh = useCallback(() => {
    setPage(1);
    loadImages(1, true);
  }, [loadImages]);

  const memoizedReturn = useMemo(() => ({
    images,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh,
  }), [images, isLoading, error, hasMore, loadMore, refresh]);

  return memoizedReturn;
}
