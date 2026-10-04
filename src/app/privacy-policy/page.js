import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | RoboVedanta',
  description: 'Privacy Policy for RoboVedanta STEM & Robotics Education platform.',
};

export default function PrivacyPolicyPage() {
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
              <ShieldCheck size={16} /> Legal & Compliance
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Last updated: October 2026
            </p>
          </div>

          <div className="h-px bg-white/10" />

          {/* Content */}
          <div className="space-y-10 text-white/70 leading-relaxed font-medium">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">1. Information We Collect</h2>
              <p>
                RoboVedanta collects information provided directly by schools, parents, and prospective students when registering interest in our STEM and robotics programs, requesting quotes, or submitting inquiry messages.
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/60 pl-4">
                <li>Institutional details (School name, board affiliation, contact person, office address).</li>
                <li>Contact information (Email address, phone number, city, state).</li>
                <li>Student enrollment details (Student name, parent/guardian name, grade level).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">2. How We Use Information</h2>
              <p>
                The information collected is strictly used to evaluate school partnerships, deliver tailored STEM/Robotics curriculum estimates, communicate course schedules, and provide technical and instructional support.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">3. Data Security & Storage</h2>
              <p>
                We implement industry-standard cryptographic protocols, strict access controls, and secure database connections to protect all personal and institutional data from unauthorized access or disclosure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">4. Third-Party Sharing</h2>
              <p>
                RoboVedanta does not sell, rent, or trade your personal data to third-party advertisers. Information is only processed through essential infrastructure providers (e.g. secure database hosting) necessary to operate our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-black text-white">5. Contact Information</h2>
              <p>
                For any privacy concerns or data requests, please contact our support team at <a href="mailto:info@robovedanta.com" className="text-accent-400 font-bold hover:underline">info@robovedanta.com</a>.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
