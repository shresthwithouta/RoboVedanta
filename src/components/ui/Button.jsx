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
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 hover:-translate-y-0.5';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40',
    secondary: 'bg-white text-primary-600 hover:bg-neutral-50 border border-neutral-100 focus:ring-primary-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 hover:shadow-sm',
    ghost: 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-600 focus:ring-primary-500'
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
