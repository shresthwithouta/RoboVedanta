import { cn } from '@/lib/cn';

/**
 * @typedef {Object} BadgeProps
 * @property {'primary' | 'accent' | 'neutral'} [variant='primary'] - Badge color variant
 * @property {'sm' | 'md' | 'lg'} [size='md'] - Badge size
 * @property {React.ReactNode} children - Badge content
 * @property {string} [className] - Additional CSS classes
 */

/**
 * Reusable Badge component for labels, tags, and level indicators
 * @param {BadgeProps} props
 */
export function Badge({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variants = {
    primary: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100 text-accent-700',
    neutral: 'bg-neutral-100 text-neutral-700'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };
  
  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}
