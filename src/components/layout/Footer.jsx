import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from './Container';
import { CONTACT_INFO } from '@/lib/constants';

/**
 * Footer component with multi-column layout
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <span className="text-2xl font-heading font-bold text-white">
                  RoboVedanta
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-md">
                Empowering students with project-based robotics and AI education. 
                Building the next generation of innovators through hands-on learning.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-heading font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/programs" className="hover:text-primary-400 transition-colors">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="/curriculum" className="hover:text-primary-400 transition-colors">
                    Curriculum
                  </Link>
                </li>
                <li>
                  <Link href="/schools" className="hover:text-primary-400 transition-colors">
                    For Schools
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary-400 transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-white font-heading font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Mail size={18} className="mt-0.5 shrink-0" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary-400 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={18} className="mt-0.5 shrink-0" />
                  <span>{CONTACT_INFO.phone}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  <span>{CONTACT_INFO.address}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-neutral-800 mt-12 pt-8 text-sm text-center md:text-left">
            <p>&copy; {currentYear} RoboVedanta. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
