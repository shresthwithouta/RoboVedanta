'use client';

import { cn } from '@/lib/cn';

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
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 hover:-translate-y-1';
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 hover:from-accent-400 hover:to-accent-500 focus:ring-accent-500 shadow-lg shadow-accent-500/20 hover:shadow-xl hover:shadow-accent-500/30',
    secondary: 'bg-white text-primary-600 hover:bg-accent-50 border-2 border-white focus:ring-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-primary-900 focus:ring-accent-500 hover:shadow-md',
    ghost: 'text-white/80 hover:bg-white/10 hover:text-accent-400 focus:ring-accent-500'
  };
  
  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };
  
  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="shrink-0 transition-transform group-hover:scale-110">{icon}</span>}
      <span className="relative">{children}</span>
    </button>
  );
}
