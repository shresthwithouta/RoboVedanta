'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, School, Phone, User } from 'lucide-react';
import { cn } from '@/lib/cn';

export function MobileNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/curriculum', label: 'Learn', icon: BookOpen },
    { href: '/schools', label: 'Schools', icon: School },
    { href: '/about', label: 'About', icon: User },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        {links.map((link) => {
           const Icon = link.icon;
           const isActive = pathname === link.href;
           return (
             <Link
               key={link.href}
               href={link.href}
               className={cn(
                 "flex flex-col items-center gap-1 p-2 min-w-[60px] rounded-lg transition-colors",
                 isActive ? "text-primary-600" : "text-neutral-500 hover:text-neutral-900"
               )}
             >
               <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
               <span className="text-[10px] font-medium">{link.label}</span>
             </Link>
           );
        })}
      </div>
    </div>
  );
}
