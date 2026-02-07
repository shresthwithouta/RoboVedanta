'use client';

import { cn } from '@/lib/cn';

export function Section({
  background = 'blue',
  spacing = 'md',
  children,
  className,
  id,
  ...props
}) {
  const backgrounds = {
    blue: 'bg-primary-500',
    darkBlue: 'bg-primary-500',
    gradient: 'bg-primary-500'
  };
  
  const spacings = {
    sm: 'py-16 md:py-20',
    md: 'py-20 md:py-32 lg:py-40',
    lg: 'py-24 md:py-40 lg:py-56'
  };
  
  return (
    <section
      id={id}
      className={cn(
        'relative w-full overflow-hidden transition-colors duration-500', 
        backgrounds[background], 
        spacings[spacing], 
        className
      )}
      {...props}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </section>
  );
}
