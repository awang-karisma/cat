import { memo } from 'react';
import { ComponentProps } from '../../types';

type FooterProps = ComponentProps;

export const Footer = memo(function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-white border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500">© {currentYear} Cat Gallery. Powered by TheCatAPI</p>
          <p className="text-sm text-gray-500">Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
});
