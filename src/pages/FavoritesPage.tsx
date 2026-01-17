import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card } from '../components/common/Card';
import { Image } from '../components/common/Image';
import { Button } from '../components/common/Button';
import { useFavorites } from '../features/favorites/hooks/useFavorites';

export const FavoritesPage = memo(function FavoritesPage() {
  const { favorites, removeFavorite, clearAll } = useFavorites();

  const handleRemove = useCallback(
    (imageId: string) => {
      removeFavorite(imageId);
    },
    [removeFavorite],
  );

  return (
    <>
      <Helmet>
        <title>My Favorites - Cat Gallery</title>
        <meta name="description" content="View and manage your saved favorite cat images" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">
              {favorites.length} {favorites.length === 1 ? 'cat' : 'cats'} saved
            </p>
          </div>
          {favorites.length > 0 && (
            <Button
              onClick={clearAll}
              variant="secondary"
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😿</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">Start exploring and save your favorite cat images!</p>
            <Link to="/">
              <Button variant="primary">Browse Cats</Button>
            </Link>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 content-visibility-auto"
            style={{ contain: 'content' }}
          >
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="group relative">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={favorite.imageUrl}
                    alt={`Favorite cat ${favorite.imageId}`}
                    className="w-full h-full"
                    loading="lazy"
                  />
                  <button
                    onClick={() => handleRemove(favorite.imageId)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove from favorites"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-500">
                    Added {new Date(favorite.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
});
