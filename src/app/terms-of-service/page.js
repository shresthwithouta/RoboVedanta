import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | RoboVedanta',
  description: 'Terms of Service for RoboVedanta STEM & Robotics Education platform.',
};

export default function TermsOfServicePage() {
  return (
    <div className="py-20 lg:py-32">
      <Container>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-bold text-xs uppercase tracking-widest transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-black uppercase tracking-widest">
              <FileText size={16} /> Legal Agreement
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Last updated: October 2026
            </p>
          </div>

          <div className="h-px bg-white/10" />

          {/* Content */}
          <div className="space-y-10 text-white/70 leading-relaxed font-medium">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">1. Program Agreements</h2>
              <p>
                By enrolling in RoboVedanta courses or entering into institutional agreements for school robotics labs, institutions and individual participants agree to abide by the curriculum structures, facility guidelines, and safety protocols outlined by RoboVedanta instructors.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">2. Intellectual Property</h2>
              <p>
                All curriculum materials, software simulations, robotics lab designs, branding, and instructional media provided by RoboVedanta remain the exclusive intellectual property of RoboVedanta. Reproduction or unauthorized redistribution without written consent is strictly prohibited.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">3. Quotations & Pricing</h2>
              <p>
                Estimated quotes generated on our platform are indicative based on school size, board alignment, and lab tier selection. Final binding agreements will be executed via formal contracts detailing equipment delivery and instructor dispatch schedules.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">4. Limitation of Liability</h2>
              <p>
                RoboVedanta strives for continuous platform availability and excellence in educational content. We are not liable for indirect damages arising from technical disruptions or external network outages beyond our control.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">5. Revisions & Support</h2>
              <p>
                RoboVedanta reserves the right to update these terms at any time. Continued use of our educational services constitutes acceptance of revised terms. For inquiries, reach out to <a href="mailto:info@robovedanta.com" className="text-accent-400 font-bold hover:underline">info@robovedanta.com</a>.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
