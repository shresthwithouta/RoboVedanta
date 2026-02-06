import { cn } from '@/lib/cn';

/**
 * @typedef {Object} SectionProps
 * @property {'white' | 'gray' | 'gradient'} [background='white'] - Section background style
 * @property {'sm' | 'md' | 'lg'} [spacing='md'] - Vertical spacing/padding
 * @property {React.ReactNode} children - Section content
 * @property {string} [className] - Additional CSS classes
 * @property {string} [id] - Section ID for navigation
 */

/**
 * Reusable Section component for consistent page layout and vertical rhythm
 * @param {SectionProps} props
 */
export function Section({
  background = 'white',
  spacing = 'md',
  children,
  className,
  id,
  ...props
}) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-neutral-50',
    gradient: 'bg-linear-to-br from-primary-50 via-white to-accent-50'
  };
  
  const spacings = {
    sm: 'py-12',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32'
  };
  
  return (
    <section
      id={id}
      className={cn(backgrounds[background], spacings[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
