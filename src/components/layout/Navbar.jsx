'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Container } from './Container';
import { Button } from '../ui/Button';
import { NAV_LINKS } from '@/lib/constants';
import { motion } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-primary-600 backdrop-blur-2xl border-b-2 border-accent-500/30 shadow-2xl shadow-primary-900/50' 
        : 'bg-primary-600/90 backdrop-blur-2xl border-b-2 border-accent-500/20 shadow-xl shadow-primary-900/30'
    }`}>
      <Container>
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-16' : 'h-20'
        }`}>
          <Link href="/" className="flex items-center group shrink-0">
            <span className={`font-heading font-black authentic-gold-text tracking-tight transition-all duration-300 group-hover:scale-105 inline-block ${
              scrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
            }`}>
              RoboVedanta
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-6 lg:space-x-8">
              {NAV_LINKS.default.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm lg:text-base font-bold text-white/90 hover:text-accent-400 transition-all duration-300 capitalize tracking-wide group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-400 to-accent-600 transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              ))}
            </div>
            
            <Button variant="primary" size="sm" className="px-6 py-2.5 rounded-full text-sm font-black capitalize tracking-wide whitespace-nowrap">
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="primary" size="sm" className="rounded-full px-5 py-2 text-xs font-black capitalize tracking-wide">
              Join
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
