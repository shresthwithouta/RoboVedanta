'use client';

import { cn } from '@/lib/cn';

/**
 * @typedef {Object} CardProps
 * @property {'default' | 'elevated' | 'outlined' | 'glass'} [variant='default'] - Card style variant
 * @property {boolean} [hover=false] - Enable hover effects
 * @property {React.ReactNode} children - Card content
 * @property {string} [className] - Additional CSS classes
 * @property {() => void} [onClick] - Click handler (makes card interactive)
 */

/**
 * Reusable Card component with multiple visual styles
 * @param {CardProps} props
 */
export function Card({
  variant = 'default',
  hover = false,
  children,
  className,
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white border border-neutral-200 shadow-sm',
    elevated: 'bg-white shadow-lg hover:shadow-xl',
    outlined: 'bg-white border-2 border-primary-200',
    glass: 'bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg'
  };
  
  const hoverStyles = hover ? 'cursor-pointer hover:scale-[1.02] hover:shadow-xl' : '';
  const interactiveStyles = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, interactiveStyles, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
