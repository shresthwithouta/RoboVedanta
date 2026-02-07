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
  const baseStyles = 'rounded-[2.5rem] transition-all duration-500 ease-out overflow-hidden';
  
  const variants = {
    default: 'bg-white border border-neutral-100 shadow-sm hover:border-primary-100',
    elevated: 'bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-transparent hover:border-primary-100/20',
    outlined: 'bg-white border-2 border-primary-100 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/5',
    glass: 'bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl shadow-primary-900/10 hover:bg-white/50 hover:border-white/60'
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
