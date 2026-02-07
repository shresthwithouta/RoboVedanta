import { cn } from '@/lib/cn';

export function Badge({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300';
  
  const variants = {
    primary: 'bg-primary-50 text-primary-600 border border-primary-100',
    accent: 'bg-accent-50 text-accent-700 border border-accent-100',
    neutral: 'bg-neutral-50 text-neutral-600 border border-neutral-200',
    outline: 'bg-white text-primary-600 border-2 border-primary-100 hover:border-primary-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1 text-[10px] uppercase tracking-wider',
    md: 'px-4 py-1.5 text-xs font-black uppercase tracking-widest',
    lg: 'px-6 py-2 text-sm font-black'
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
