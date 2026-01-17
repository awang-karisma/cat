import { forwardRef, memo, type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
}

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = 'primary', children, className = '', disabled, ...props },
    ref,
  ) {
    const baseStyles =
      'inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const variantStyles =
      variant === 'primary'
        ? 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }),
);
