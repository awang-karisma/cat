import { useCallback, useEffect, useState, useMemo } from 'react';
import { CACHE } from '../../../config/constants';
import type { FavoriteItem } from '../types/favorite';

interface UseFavoritesReturn {
  favorites: FavoriteItem[];
  favoriteIds: string[];
  isFavorite: (imageId: string) => boolean;
  addFavorite: (imageId: string, imageUrl: string) => void;
  removeFavorite: (imageId: string) => void;
  toggleFavorite: (imageId: string, imageUrl: string) => void;
  clearAll: () => void;
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(CACHE.FAVORITES_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      if (parsed.version !== CACHE.FAVORITES_VERSION) {
        return [];
      }

      return parsed.items || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      const storageData = {
        version: CACHE.FAVORITES_VERSION,
        items: favorites,
      };
      localStorage.setItem(CACHE.FAVORITES_KEY, JSON.stringify(storageData));
    } catch {
      console.error('Failed to save favorites to localStorage');
    }
  }, [favorites]);

  const favoriteIds = useMemo(() => favorites.map(f => f.imageId), [favorites]);

  const isFavorite = useCallback(
    (imageId: string) => favoriteIds.includes(imageId),
    [favoriteIds],
  );

  const addFavorite = useCallback((imageId: string, imageUrl: string) => {
    setFavorites(prev => {
      if (prev.some(f => f.imageId === imageId)) return prev;

      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          imageId,
          imageUrl,
          addedAt: Date.now(),
        },
      ];
    });
  }, []);

  const removeFavorite = useCallback((imageId: string) => {
    setFavorites(prev => prev.filter(f => f.imageId !== imageId));
  }, []);

  const toggleFavorite = useCallback(
    (imageId: string, imageUrl: string) => {
      if (isFavorite(imageId)) {
        removeFavorite(imageId);
      } else {
        addFavorite(imageId, imageUrl);
      }
    },
    [isFavorite, addFavorite, removeFavorite],
  );

  const clearAll = useCallback(() => {
    setFavorites([]);
  }, []);

  const memoizedReturn = useMemo(
    () => ({
      favorites,
      favoriteIds,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearAll,
    }),
    [favorites, favoriteIds, isFavorite, addFavorite, removeFavorite, toggleFavorite, clearAll],
  );

  return memoizedReturn;
}
