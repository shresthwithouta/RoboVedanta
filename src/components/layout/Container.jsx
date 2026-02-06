import { cn } from '@/lib/cn';

/**
 * Container component for consistent max-width and horizontal padding
 */
export function Container({ children, className, ...props }) {
  return (
    <div
      className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  );
}
