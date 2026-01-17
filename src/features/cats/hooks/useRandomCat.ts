import { useState, useCallback, useMemo } from 'react';
import { fetchRandomCat } from '../api/catApi';
import type { CatImage } from '../types/cat';

interface UseRandomCatReturn {
  cat: CatImage | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useRandomCat(): UseRandomCatReturn {
  // Lazy state initialization
  const [cat, setCat] = useState<CatImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const newCat = await fetchRandomCat();
      setCat(newCat);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch cat'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const returnValue = useMemo(
    () => ({
      cat,
      isLoading,
      error,
      refresh,
    }),
    [cat, isLoading, error, refresh],
  );

  return returnValue;
}
