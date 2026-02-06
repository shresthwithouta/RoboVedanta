'use client';

import { cn } from '@/lib/cn';

/**
 * @typedef {Object} ButtonProps
 * @property {'primary' | 'secondary' | 'outline' | 'ghost'} [variant='primary'] - Button style variant
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Button size
 * @property {React.ReactNode} children - Button content
 * @property {React.ReactNode} [icon] - Optional icon element
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [disabled] - Disabled state
 * @property {() => void} [onClick] - Click handler
 * @property {'button' | 'submit' | 'reset'} [type='button'] - Button type
 */

/**
 * Reusable Button component with multiple variants and sizes
 * @param {ButtonProps} props
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
    secondary: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
