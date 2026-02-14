'use client';

import Link from 'next/link';
import { Users, ArrowRight, Star, ShieldCheck, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export function CheckTrainersCTA() {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative group overflow-hidden bg-primary-900 border border-accent-500/20 rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-16 text-center">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-primary-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,134,11,0.08),transparent_70%)] group-hover:scale-110 transition-transform duration-1000 will-change-transform" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-500/5 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6 md:space-y-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]"
            >
              <Star size={14} fill="currentColor" />
              Expert Mentorship
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-3 md:space-y-4"
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-white tracking-tighter leading-[1.1]">
                Meet the <span className="text-shimmer">Innovators</span> Guiding Your Journey
              </h2>
              <p className="text-white/60 text-base md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                Our innovators aren't just trainers; they are B.Tech scholars and robotics experts dedicated to bridging the gap between theory and innovation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-4"
            >
              <div className="flex flex-col items-center gap-2 md:gap-3 p-5 md:p-6 rounded-3xl bg-white/5 border border-white/10">
                <ShieldCheck className="text-accent-500" size={32} />
                <h3 className="text-white font-bold text-base md:text-lg">Verified Experts</h3>
                <p className="text-white/40 text-xs md:text-sm">Every mentor is handpicked for their technical and academic excellence.</p>
              </div>
              <div className="flex flex-col items-center gap-2 md:gap-3 p-5 md:p-6 rounded-3xl bg-white/5 border border-white/10">
                <GraduationCap className="text-accent-500" size={32} />
                <h3 className="text-white font-bold text-base md:text-lg">Personalized Path</h3>
                <p className="text-white/40 text-xs md:text-sm">Choose the trainer that best matches your learning style and goals.</p>
              </div>
              <div className="flex flex-col items-center gap-2 md:gap-3 p-5 md:p-6 rounded-3xl bg-white/5 border border-white/10">
                <Users className="text-accent-500" size={32} />
                <h3 className="text-white font-bold text-base md:text-lg">1:1 Mentorship</h3>
                <p className="text-white/40 text-xs md:text-sm">Direct access to industry-standard tools and methodology.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-8"
            >
              <Link
                href="/trainers"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-accent-500 text-primary-900 font-black text-sm uppercase tracking-wider hover:bg-accent-400 transition-all shadow-xl shadow-accent-500/20 hover:shadow-accent-500/40 hover:-translate-y-1"
              >
                <span>Check Our Trainers</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
