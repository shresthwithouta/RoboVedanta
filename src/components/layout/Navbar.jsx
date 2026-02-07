'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Container } from './Container';
import { Button } from '../ui/Button';
import { NAV_LINKS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

import { usePathname } from 'next/navigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
      scrolled 
        ? 'bg-primary-600/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-primary-900/50' 
        : 'bg-transparent border-b border-white/5 py-5'
    )}>
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative">
              <span className={cn(
                "font-heading font-black authentic-gold-text tracking-tighter transition-all duration-500 group-hover:scale-105 inline-block",
                scrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
              )}>
                RoboVedanta
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-px bg-accent-500/50 group-hover:w-full transition-all duration-700" />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-4 lg:gap-10">
            <div className="flex items-center gap-4 lg:gap-10">
              {NAV_LINKS.default.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-[10px] lg:text-sm font-bold transition-all duration-300 capitalize tracking-widest lg:tracking-[0.15em] group py-2",
                      isActive ? "text-accent-500" : "text-white/70 hover:text-accent-400"
                    )}
                  >
                    {link.label}
                    <span className={cn(
                      "absolute bottom-0 left-0 h-px bg-accent-500 transition-all duration-500 shadow-[0_0_8px_rgba(184,134,11,0.5)]",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </Link>
                );
              })}
            </div>
            
            <Button variant="primary" size="sm" className="px-4 lg:px-5 py-2 rounded-xl text-[9px] lg:text-xs font-black capitalize tracking-widest lg:tracking-[0.2em] whitespace-nowrap shadow-xl shadow-accent-500/10">
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
            <Link href="/contact">
              <span className="text-[10px] font-black text-accent-400 border border-accent-500/30 px-4 py-1.5 rounded-full uppercase tracking-widest bg-accent-500/5">
                Join
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}
