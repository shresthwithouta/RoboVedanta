import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Container } from './Container';
import { CONTACT_INFO } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 border-t border-white/5 py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 lg:gap-20">
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="inline-block group">
              <span className="text-3xl font-heading font-black authentic-gold-text tracking-tighter transition-all duration-500 group-hover:scale-105">
                RoboVedanta
              </span>
              <div className="h-px w-0 bg-accent-500/50 group-hover:w-full transition-all duration-700 mt-1" />
            </Link>
            <p className="text-white/60 text-lg leading-relaxed max-w-md font-medium">
              Transforming the future of education through high-fidelity robotics and AI simulation systems. CBSE & ICSE aligned excellence for Grades 6–12.
            </p>
            <div className="flex gap-5">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <div key={i} className="w-11 h-11 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-accent-500 hover:text-primary-900 hover:border-accent-500 cursor-pointer transition-all duration-500 hover:-translate-y-2 group">
                  <Icon size={18} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-white font-heading font-black text-sm uppercase tracking-[0.25em] relative inline-block">
              Explore
              <div className="absolute -bottom-3 left-0 w-8 h-px bg-accent-500" />
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'Programs', href: '/programs' },
                { label: 'Curriculum', href: '/curriculum' },
                { label: 'For Schools', href: '/schools' },
                { label: 'About Us', href: '/about' }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-accent-500 flex items-center gap-3 transition-all duration-300 group font-bold text-sm tracking-wide">
                    <span className="w-0 h-px bg-accent-500 transition-all duration-500 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-8">
            <h3 className="text-white font-heading font-black text-sm uppercase tracking-[0.25em] relative inline-block">
              Connect
              <div className="absolute -bottom-3 left-0 w-8 h-px bg-accent-500" />
            </h3>
            <ul className="space-y-6">
              {[
                { label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, Icon: Mail },
                { label: 'Phone', value: CONTACT_INFO.phone, href: null, Icon: Phone },
                { label: 'Office', value: CONTACT_INFO.address, href: null, Icon: MapPin }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-accent-400 transition-all duration-500 group-hover:bg-accent-500 group-hover:text-primary-900 group-hover:border-accent-500">
                    <item.Icon size={16} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="text-white/70 hover:text-white transition-colors text-sm font-bold tracking-tight break-all">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white/70 text-sm font-bold tracking-tight leading-snug">
                        {item.value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/30 text-xs font-bold tracking-wide">
            &copy; {currentYear} RoboVedanta. All Rights Reserved.
          </p>
          <div className="flex gap-10">
            {['Privacy Policy', 'Terms of Service'].map((label, i) => (
              <Link key={i} href={`/${label.toLowerCase().replace(' ', '-')}`} className="text-white/30 hover:text-white transition-colors text-xs font-bold tracking-wide">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
