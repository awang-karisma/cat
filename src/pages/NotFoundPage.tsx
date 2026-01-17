import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/common/Button';

export const NotFoundPage = memo(function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Cat Gallery</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🐱❓</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
        </div>
      </div>
    </>
  );
});
