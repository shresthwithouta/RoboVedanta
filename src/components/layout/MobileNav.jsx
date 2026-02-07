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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-neutral-100 pb-safe shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.03)] selection:bg-transparent">
      <div className="flex items-center h-16 w-full">
        {links.map((link) => {
           const Icon = link.icon;
           const isActive = pathname === link.href;
           
           return (
             <Link
               key={link.href}
               href={link.href}
               className={cn(
                 "flex-1 flex flex-col items-center justify-center gap-1 min-w-0 transition-all duration-300 tap-highlight-none",
                 isActive ? "text-primary-600" : "text-neutral-400 active:text-primary-400 active:bg-neutral-50/50"
               )}
             >
               <Icon 
                 size={18} 
                 className={cn(
                   "transition-all duration-300", 
                   isActive ? "scale-110 drop-shadow-sm" : "group-active:scale-90"
                 )} 
               />
               <span className={cn(
                 "text-[8px] font-black tracking-tight leading-none truncate w-full text-center px-0.5 uppercase transition-all duration-300",
                 isActive ? "opacity-100 scale-105" : "opacity-60"
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
