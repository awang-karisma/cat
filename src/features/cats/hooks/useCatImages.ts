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

      setHasMore(newImages.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch images'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load: fetch 2 pages (20 images) for better UX
  useEffect(() => {
    async function loadInitialPages() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch page 1 and page 2 in parallel
        const [page1Images, page2Images] = await Promise.all([
          fetchCatImages(1, PAGINATION.DEFAULT_PAGE_SIZE),
          fetchCatImages(2, PAGINATION.DEFAULT_PAGE_SIZE),
        ]);

        // Deduplicate images by ID
        const seenIds = new Set<string>();
        const uniqueImages: CatImage[] = [];

        for (const img of [...page1Images, ...page2Images]) {
          if (!seenIds.has(img.id)) {
            seenIds.add(img.id);
            uniqueImages.push(img);
          }
        }

        setImages(uniqueImages);
        setHasMore(uniqueImages.length >= PAGINATION.DEFAULT_PAGE_SIZE);
        setPage(2); // Start from page 2 for subsequent loads
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch initial images'));
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialPages();
  }, []);

  const loadMore = useCallback(() => {
    // Prevent loadMore during initial loading or if no more images
    if (isLoading || !hasMore || images.length === 0) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    loadImages(nextPage);
  }, [isLoading, hasMore, page, loadImages, images.length]);

  const refresh = useCallback(() => {
    setPage(1);
    // Re-trigger the initial load effect
    setImages([]);
  }, []);

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
