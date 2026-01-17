import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { CatGallery } from '../features/cats/components/CatGallery';

export const DiscoverPage = memo(function DiscoverPage() {
  return (
    <>
      <Helmet>
        <title>Discover Cats - Cat Gallery</title>
        <meta
          name="description"
          content="Browse and discover random cat images from around the world."
        />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 Discover Cats</h1>
          <p className="text-gray-600">
            Browse our collection of adorable cat images. Scroll down for more cats!
          </p>
        </div>
        <CatGallery />
      </div>
    </>
  );
});
