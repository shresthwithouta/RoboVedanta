import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { ArrowLeft, Cpu } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500/10 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div className="max-w-md mx-auto text-center space-y-8 relative z-10">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-accent-500/10 border border-accent-500/20 text-accent-400 flex items-center justify-center shadow-inner">
            <Cpu size={40} className="animate-pulse" />
          </div>

          <div className="space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px] font-black uppercase tracking-widest">
              Error 404
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-white/60 text-sm font-medium leading-relaxed">
              The neural pathway or module you requested could not be located in the RoboVedanta sequence.
            </p>
          </div>

          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent-500 hover:bg-accent-400 text-primary-900 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-accent-500/20 hover:scale-105"
            >
              <ArrowLeft size={18} /> Return to Homepage
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
