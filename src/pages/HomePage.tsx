import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useRandomCat } from '../features/cats/hooks/useRandomCat';
import { RandomCatCard } from '../features/cats/components/RandomCatCard';
import { Button } from '../components/common/Button';

export const HomePage = memo(function HomePage() {
  const { cat, isLoading, error, refresh } = useRandomCat();

  return (
    <>
      <Helmet>
        <title>Random Cat - Cat Gallery</title>
        <meta
          name="description"
          content="Get a random cat image every time you visit. Add to favorites and discover more cats!"
        />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🐱 Random Cat of the Moment</h1>
          <p className="text-gray-600">
            Click the button below to get a new random cat image, or browse our full gallery!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <RandomCatCard cat={cat} isLoading={isLoading} error={error} onRefresh={refresh} />

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={refresh} variant="primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : '🐱 Get Another Cat'}
            </Button>

            <Link to="/discover">
              <Button variant="secondary">🔍 Discover More Cats</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});
