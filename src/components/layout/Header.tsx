import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ComponentProps } from '../../types';

type HeaderProps = ComponentProps;

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/discover', label: 'Discover' },
  { path: '/favorites', label: 'Favorites' },
] as const;

export const Header = memo(function Header({ className = '' }: HeaderProps) {
  const location = useLocation();

  return (
    <header className={`bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🐱</span>
            <span className="text-xl font-bold text-primary-600">Cat Gallery</span>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              {navItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
});
