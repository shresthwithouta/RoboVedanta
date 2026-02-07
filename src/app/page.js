'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, School, GraduationCap, Zap, Target, Award, LayoutGrid, Code, Radio } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

import { CURRICULUM_LEVELS } from '@/lib/constants';

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main>
      <Section spacing="md" className="relative pt-20 md:pt-24 lg:pt-32 min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-400 via-primary-400 to-primary-500">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-500/80 pointer-events-none" />
        
        {/* Floating Ambient Orbs */}
        <div className="absolute top-20 -right-20 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] floating pointer-events-none" />
        <div className="absolute bottom-40 -left-20 w-[400px] h-[400px] bg-primary-300/15 rounded-full blur-[100px] floating pointer-events-none" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.03)_0%,transparent_70%)] pointer-events-none" />

        <Container className="relative z-10 w-full px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              staggerChildren: 0.2
            }}
            className="text-center max-w-5xl mx-auto flex flex-col items-center translate-y-[10%] sm:translate-y-0"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-accent-500/30 bg-accent-500/5 text-accent-400 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider sm:tracking-widest uppercase mb-5 sm:mb-6 md:mb-8 backdrop-blur-sm"
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent-500 animate-pulse" />
              <span className="whitespace-nowrap">Premium STEM Education</span>
            </motion.div>

            <motion.h1
              className="text-[1.75rem] min-[360px]:text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-5 sm:mb-6 md:mb-8 leading-tight sm:leading-[0.9] tracking-tight sm:tracking-tighter text-center w-full px-1 sm:px-2 md:px-0"
            >
              <span className="text-white block sm:mb-2 drop-shadow-2xl">Learn Robotics & AI</span>
              <span className="text-white inline-block mb-1 sm:mb-2 mr-2 sm:mr-3 drop-shadow-2xl">Through</span>
              <span className="text-shimmer inline-block px-0.5 sm:px-1 py-2 sm:py-3 -my-2 sm:-my-3">Real Projects</span>
            </motion.h1>

            <motion.p
              className="text-white/70 text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 font-medium leading-relaxed text-center px-2 sm:px-4 md:px-0"
            >
              CBSE & ICSE aligned curriculum that transforms education through simulation-based and hands-on robotics learning for Grades 6–12
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full px-2 sm:px-4 md:px-0"
            >
              <Button variant="primary" size="lg" className="rounded-2xl text-xs xs:text-sm sm:text-md lg:text-lg px-6 xs:px-8 sm:px-10 py-3.5 xs:py-4 sm:py-5 h-auto relative w-full sm:w-auto border-none transition-all duration-500 hover:scale-[1.03]">
                <span className="relative z-10 whitespace-nowrap">Start Learning Now</span>
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl text-xs xs:text-sm sm:text-md lg:text-xl px-6 xs:px-8 sm:px-10 py-3.5 xs:py-4 sm:py-5 h-auto border-white/20 text-white hover:text-primary-900 w-full sm:w-auto transition-all duration-500">
                <span className="relative z-10 whitespace-nowrap">View Curriculum</span>
              </Button>
            </motion.div>

            <motion.div
              className="mt-20 md:mt-24 lg:mt-32 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 max-w-5xl mx-auto w-full"
            >
              {[
                { val: '5', label: 'Curriculum Levels' },
                { val: 'Project-Based', label: 'Learning Approach' },
                { val: '6–12', label: 'Grade Coverage' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
                  <span className="text-4xl md:text-5xl font-heading font-black authentic-gold-text group-hover:scale-110 transition-transform duration-500">{stat.val}</span>
                  <span className="text-white/40 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Scroll Indicator Below Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-16 sm:mt-20 md:mt-24 flex items-center justify-center gap-4 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/40" />
              <span className="text-[9px] sm:text-[10px] text-white/30 font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase whitespace-nowrap px-2">Scroll to Discover</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/40" />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section background="darkBlue" id="programs" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Curriculum
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                Learning <span className="text-accent-500">Pathways</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                Comprehensive project-based learning architecture across 5 strategic levels, meticulously designed for modern classrooms.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <LayoutGrid size={32} />, 
                title: 'Level 1: Fundamentals', 
                description: 'Introduction to logic, basic electronics, and modular robotics construction',
                link: '/curriculum'
              },
              { 
                icon: <Code size={32} />, 
                title: 'Level 2: Control', 
                description: 'Advanced programming logic and sensor integration for autonomous behavior',
                link: '/curriculum'
              },
              { 
                icon: <Radio size={32} />, 
                title: 'Level 3: Systems', 
                description: 'Wireless communication, data processing, and complex multi-tasking robots',
                link: '/curriculum'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" hover className="p-8 group h-full border-neutral-100/50 hover:border-primary-200">
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-black text-accent-500 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/80 mb-8 font-medium leading-relaxed">
                    {item.description}
                  </p>
                  <Link 
                    href={item.link}
                    className="inline-flex items-center gap-2 text-accent-400 font-black capitalize tracking-widest text-xs hover:gap-4 hover:text-accent-300 transition-all group/link"
                  >
                    View Modules 
                    <ArrowRight className="transition-transform group-hover/link:translate-x-1" size={16} />
                  </Link>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="darker" id="schools" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" style={{ animationDirection: 'reverse' }} />
        </div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-20 md:mb-32">
            <ScrollReveal className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                For Schools
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                Scale Your <br />
                <span className="text-shimmer">Curriculum</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mb-10 opacity-30 mx-auto lg:mx-0" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-12 mx-auto lg:mx-0">
                Empower your institution with a high-fidelity robotics and AI architecture. Our curriculum is built on industry-standard engineering principles, optimized for large-scale educational deployment.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 text-left">
                {[
                  { title: 'K-12 Aligned', desc: 'Seamless integration with CBSE/ICSE standards.' },
                  { title: 'Instructor Kits', desc: 'Comprehensive guides and training modules.' }
                ].map((item, i) => (
                  <div key={i} className="space-y-3 group/item">
                    <h4 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500/50 group-hover/item:bg-accent-500 transition-colors" />
                      {item.title}
                    </h4>
                    <p className="text-white/40 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="lg" className="rounded-2xl px-12 text-white hover:text-primary-900 transition-all duration-500">
                School Partnerships
              </Button>
            </ScrollReveal>

            <div className="relative">
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 gap-3 sm:gap-6 relative z-10 max-w-xl mx-auto sm:max-w-none">
                  <Card variant="elevated" className="p-6 sm:p-8 group hover:scale-105 transition-all backdrop-blur-sm border border-white/10">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-3xl sm:text-4xl font-heading font-black text-accent-500 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">120+</div>
                      <div className="text-white/70 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs">Projects</div>
                    </div>
                  </Card>
                  <Card variant="outlined" className="p-6 sm:p-8 group hover:scale-105 transition-all sm:mt-8 backdrop-blur-sm border border-accent-500/20">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-3xl sm:text-4xl font-heading font-black text-accent-500 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">5</div>
                      <div className="text-white/70 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs">Levels</div>
                    </div>
                  </Card>
                  <Card variant="outlined" className="p-6 sm:p-8 group hover:scale-105 transition-all backdrop-blur-sm border border-accent-500/20">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-3xl sm:text-4xl font-heading font-black text-accent-500 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">CBSE</div>
                      <div className="text-white/70 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs">Aligned</div>
                    </div>
                  </Card>
                  <Card variant="elevated" className="p-6 sm:p-8 group hover:scale-105 transition-all sm:mt-8 backdrop-blur-sm border border-white/10">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-3xl sm:text-4xl font-heading font-black text-accent-500 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">Grade</div>
                      <div className="text-white/70 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs">6–12</div>
                    </div>
                  </Card>
                </div>
                <div className="absolute inset-0 bg-accent-500/10 blur-[120px] rounded-full -z-10" />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="overflow-hidden">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-accent-500 mb-4 tracking-tight">
                Built For Everyone
              </h2>
              <p className="text-lg text-white/90 font-medium max-w-2xl mx-auto lg:whitespace-nowrap capitalize tracking-wide">
                Whether you're a student or educator, we have the right program for you
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <GraduationCap size={40} />,
                title: 'For Students',
                description: 'Simulation-based and hands-on robotics programs tailored to your grade level',
                link: '/students'
              },
              {
                icon: <School size={40} />,
                title: 'For Schools',
                description: 'Complete CBSE/ICSE aligned curriculum with implementation support',
                link: '/schools'
              },
              {
                icon: <Bot size={40} />,
                title: 'Our Approach',
                description: 'Project-based learning from simulation to hardware across 5 levels',
                link: '/curriculum'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" hover className="p-8 group h-full border-neutral-100/50 hover:border-primary-200">
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-black text-accent-500 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/80 mb-8 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <Link href={item.link} className="inline-flex items-center gap-2 text-accent-400 font-black capitalize tracking-widest text-xs hover:gap-4 hover:text-accent-300 transition-all group/link">
                    Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="darkBlue" spacing="lg" className="overflow-hidden relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center mb-20 md:mb-32 max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(184,134,11,0.5)]" />
                Evolution
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                Curriculum <span className="text-accent-500">Journey</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                From curiosity to innovation, our structured architecture bridges the gap between fundamental concepts and advanced engineering.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {CURRICULUM_LEVELS.map((level, index) => (
              <ScrollReveal key={level.id} delay={index * 0.05}>
                <Card variant="default" hover className="p-10 transition-all h-full group bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-accent-500/20">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="text-[10px] font-black text-accent-500 tracking-[0.2em] uppercase mb-2">Level 0{level.id}</div>
                      <h3 className="text-2xl font-heading font-black text-white group-hover:text-accent-400 transition-colors tracking-tight">
                        {level.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] uppercase font-black text-white/30 tracking-[0.2em] mb-1">Grades</div>
                      <div className="font-black text-accent-400 text-lg tracking-tighter">{level.grade}</div>
                    </div>
                  </div>
                  <p className="text-white/40 mb-8 leading-relaxed font-medium text-sm sm:text-base">{level.description}</p>
                  <div className="pt-8 border-t border-white/5">
                    <div className="text-[9px] uppercase font-black text-white/20 tracking-[0.2em] mb-2">Theme</div>
                    <div className="font-bold text-white/70 group-hover:text-accent-500 transition-colors capitalize tracking-wide text-sm">{level.theme}</div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-2 text-center lg:text-left">
              <ScrollReveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent-500/5 rounded-full border border-accent-500/20 mb-10 mx-auto lg:mx-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                  <span className="text-accent-400 font-black text-[10px] tracking-[0.3em] uppercase">Start Your Journey</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                  Transform <span className="text-white">Education</span> <br className="hidden md:block" />
                  <span className="text-shimmer">With Robotics</span>
                </h2>
                <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center lg:justify-start">
                  <Button variant="primary" size="lg" className="rounded-2xl px-12 text-sm sm:text-lg w-full sm:w-auto border-none shadow-2xl shadow-accent-500/10">
                    Contact Us
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-2xl px-12 text-sm sm:text-lg text-white hover:text-primary-900 w-full sm:w-auto transition-all duration-500">
                    Get Brochure
                  </Button>
                </div>
              </ScrollReveal>
            </div>
            
            <ScrollReveal delay={0.4}>
              <Card variant="elevated" hover className="p-10 md:p-16 flex flex-col justify-center items-center text-center h-full group bg-accent-500/5 border-accent-500/20 backdrop-blur-xl rounded-[2.5rem]">
                <div className="inline-flex p-6 bg-accent-500/10 rounded-3xl mb-8 border border-accent-500/20 shadow-xl shadow-accent-500/5">
                  <Zap size={48} className="text-accent-500" />
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-black text-shimmer mb-6 tracking-tighter">
                  Ready to Start?
                </h3>
                <p className="text-white/50 mb-10 font-medium text-base md:text-lg max-w-sm mx-auto leading-relaxed">
                  Explore our complete curriculum and transform your educational journey
                </p>
                <Button variant="primary" size="lg" className="rounded-xl text-xs font-black tracking-[0.2em] px-10 py-4 uppercase shadow-2xl shadow-accent-500/20 border-none">
                  View Syllabus
                </Button>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="overflow-hidden bg-primary-950/50">
        <Container>
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Differentiators
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-snug sm:leading-[0.9] tracking-tighter">
                Why <span className="text-accent-500">RoboVedanta</span>?
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                We don't just sell kits. We architect comprehensive learning ecosystems designed for systemic educational impact.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              { icon: <Target size={28} />, title: 'Board Aligned', description: 'Every module maps to engineering-grade projects, fully synchronized with CBSE & ICSE standards.' },
              { icon: <Bot size={28} />, title: 'Simulation Labs', description: 'Master deep concepts through high-fidelity virtual simulations before deploying to physical hardware.' },
              { icon: <Award size={28} />, title: 'Project First', description: 'Curriculum built on real-world engineering challenges that demand critical problem-solving.' },
              { icon: <Zap size={28} />, title: 'Agile Learning', description: 'A progressive 5-stage architecture that transforms students into future-ready innovators.' },
              { icon: <School size={28} />, title: 'Institutional Support', description: 'White-glove implementation support for schools, including instructor training and lab design.' },
              { icon: <GraduationCap size={28} />, title: 'Career-Ready', description: 'Developing the technical literacy and computational thinking required for the next industrial era.' }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="flex flex-col gap-8 group bg-white/[0.01] p-8 rounded-[2rem] border border-white/5 hover:border-accent-500/20 hover:bg-white/[0.03] transition-all duration-500">
                  <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-accent-500/5 text-accent-500 border border-accent-500/20 transition-all duration-500 group-hover:bg-accent-500 group-hover:text-primary-900 group-hover:scale-110 group-hover:-rotate-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-black text-white mb-4 transition-colors group-hover:text-accent-500 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/40 leading-relaxed font-medium text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="darker" spacing="lg" className="relative overflow-hidden group/cta">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.05)_0%,transparent_70%)] animate-slow-zoom" />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center py-20 md:py-32">
            <ScrollReveal>
              <h2 className="text-5xl md:text-8xl font-heading font-black text-white mb-10 leading-[0.8] tracking-tighter">
                Ready to <br />
                <span className="text-shimmer">Transform?</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/40 font-medium mb-16 max-w-2xl mx-auto tracking-tight">
                Join the vanguard of schools and students already architecting the future of robotics.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                <Button variant="primary" size="lg" className="rounded-2xl px-12 font-black tracking-widest uppercase text-xs border-none shadow-2xl shadow-accent-500/20 py-5 w-full sm:w-auto">
                  Explore Programs
                </Button>
                <Button variant="outline" size="lg" className="rounded-2xl px-12 font-black tracking-widest uppercase text-xs text-white hover:text-primary-900 py-5 w-full sm:w-auto transition-all duration-500">
                  Request Access
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
