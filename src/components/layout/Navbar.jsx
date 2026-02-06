'use client';

import Link from 'next/link';
import { Container } from './Container';
import { Button } from '../ui/Button';
import { NAV_LINKS } from '@/lib/constants';

/**
 * Main navigation bar component with responsive mobile menu
 */
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl md:text-2xl font-heading font-bold text-neutral-900">
              RoboVedanta
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.default.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
