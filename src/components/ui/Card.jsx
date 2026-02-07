'use client';

import { cn } from '@/lib/cn';

export function Card({
  variant = 'default',
  hover = false,
  children,
  className,
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-[2.5rem] transition-all duration-700 ease-out overflow-hidden';
  
  const variants = {
    default: 'bg-primary-600 border border-accent-500/30 shadow-sm hover:border-accent-500/60',
    elevated: 'bg-primary-600 shadow-lg hover:shadow-xl border border-accent-500/20 hover:border-accent-500/40',
    outlined: 'bg-primary-600 border-2 border-accent-500/50 hover:border-accent-500',
    glass: 'bg-primary-700/60 backdrop-blur-xl border border-accent-500/30 shadow-lg hover:border-accent-500/50'
  };
  
  const hoverStyles = hover ? 'cursor-pointer hover:-translate-y-1.5' : '';
  const interactiveStyles = onClick ? 'active:scale-[0.98]' : '';
  
  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, interactiveStyles, className)}
      onClick={onClick}
      {...props}
    >
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
}
