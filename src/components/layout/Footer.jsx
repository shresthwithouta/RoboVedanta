import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Container } from './Container';
import { CONTACT_INFO } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-16 lg:py-24 selection:bg-neutral-800">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
              <span className="text-2xl font-heading font-black text-white tracking-tight transition-transform duration-300 group-hover:scale-105">
                RoboVedanta
              </span>
            </Link>
            <p className="text-lg leading-relaxed max-w-md mb-8">
              Empowering the next generation of innovators with project-based robotics and AI education. CBSE & ICSE aligned for modern classrooms.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <div key={i} className="p-3 bg-neutral-800 rounded-lg hover:bg-primary-600 hover:text-white cursor-pointer transition-all duration-300 hover:-translate-y-1">
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 capitalize tracking-widest">Explore</h3>
            <ul className="space-y-4 font-medium">
              {[
                { label: 'Programs', href: '/programs' },
                { label: 'Curriculum', href: '/curriculum' },
                { label: 'For Schools', href: '/schools' },
                { label: 'About Us', href: '/about' }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center group text-neutral-400 hover:text-primary-400 transition-all duration-300">
                    <span className="w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-3 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 capitalize tracking-widest">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="p-2 bg-neutral-800 rounded-lg text-primary-400 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-500 capitalize">Email</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-white hover:text-primary-400 transition-colors break-all">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="p-2 bg-neutral-800 rounded-lg text-primary-400 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-500 capitalize">Phone</span>
                  <span className="text-white group-hover:text-primary-400 transition-colors">
                    {CONTACT_INFO.phone}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="p-2 bg-neutral-800 rounded-lg text-primary-400 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-500 capitalize">Office</span>
                  <span className="text-white group-hover:text-primary-400 transition-colors leading-snug">
                    {CONTACT_INFO.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium">
          <p>&copy; {currentYear} RoboVedanta. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
