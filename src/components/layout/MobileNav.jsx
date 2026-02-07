'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, School, Phone, User, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/cn';

export function MobileNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/programs', label: 'Programs', icon: LayoutGrid },
    { href: '/curriculum', label: 'Learn', icon: BookOpen },
    { href: '/schools', label: 'Schools', icon: School },
    { href: '/about', label: 'About', icon: User },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary-600/95 backdrop-blur-xl border-t-2 border-accent-500/20 pb-safe shadow-2xl shadow-primary-900/50">
      <div className="flex items-center h-16 w-full">
        {links.map((link) => {
           const Icon = link.icon;
           const isActive = pathname === link.href;
           
           return (
             <Link
               key={link.href}
               href={link.href}
               className={cn(
                 "flex-1 flex flex-col items-center justify-center gap-1.5 min-w-0 transition-all duration-500",
                 isActive ? "text-accent-400" : "text-white/60 active:text-accent-400"
               )}
             >
               <Icon 
                 size={20} 
                 className={cn(
                   "transition-all duration-500", 
                   isActive ? "scale-110" : "active:scale-90"
                 )} 
               />
               <span className={cn(
                 "text-[9px] font-bold tracking-wide leading-none truncate w-full text-center px-0.5 capitalize transition-all duration-500",
                 isActive ? "opacity-100" : "opacity-70"
               )}>
                 {link.label}
               </span>
             </Link>
           );
        })}
      </div>
    </div>
  );
}
