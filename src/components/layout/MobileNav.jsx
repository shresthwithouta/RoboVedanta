'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, School, Phone, User, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="md:hidden fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-50">
      <div className="bg-primary-600/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 w-full relative">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 sm:gap-1 flex-1 transition-all duration-500 py-1",
                  isActive ? "text-accent-400" : "text-white/40"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-pill"
                    className="absolute inset-[2px] bg-accent-500/5 rounded-xl border border-accent-500/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon 
                  size={16}
                  className={cn(
                    "relative z-10 transition-all duration-500 sm:w-[18px] sm:h-[18px]", 
                    isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(184,134,11,0.3)]" : "opacity-80"
                  )} 
                />
                <span className={cn(
                  "relative z-10 text-[8px] sm:text-[9px] font-black tracking-widest uppercase transition-all duration-500",
                  isActive ? "opacity-100" : "opacity-50"
                )}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
