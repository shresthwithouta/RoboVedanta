'use client';

import Link from 'next/link';
import { Container } from './Container';
import { Button } from '../ui/Button';
import { NAV_LINKS } from '@/lib/constants';
import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100 transition-all duration-300">
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group shrink-0">
            <span className="text-2xl font-heading font-black text-neutral-900 tracking-tighter transition-transform duration-300 group-hover:scale-105">
              RoboVedanta
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6 lg:space-x-10">
              {NAV_LINKS.default.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-xs lg:text-sm font-bold text-neutral-500 hover:text-primary-600 transition-colors capitalize tracking-widest group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
            
            <Button variant="primary" size="sm" className="px-6 rounded-full shadow-lg shadow-primary-500/10 text-xs font-black capitalize tracking-widest whitespace-nowrap hover:scale-105 hover:shadow-primary-500/20 active:scale-95 transition-all">
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="primary" size="sm" className="rounded-full px-5 text-[10px] font-black capitalize tracking-widest hover:scale-105 transition-transform">
              Join
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
