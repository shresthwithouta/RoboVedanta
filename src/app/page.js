'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, School, GraduationCap, Zap, Target, Award, LayoutGrid, Code, Radio } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Modal } from '@/components/ui/Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Choose Your Path"
      >
        <div className="flex flex-col gap-4">
          <p className="text-white/60 text-sm mb-4">
            Select the program that best fits your needs to start your robotics journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/schools" 
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-500/50 hover:bg-accent-500/5 transition-all text-center"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <School className="text-accent-500" size={24} />
              </div>
              <h3 className="text-white font-bold mb-1 text-lg">For Schools</h3>
              <p className="text-white/40 text-xs">Institutional programs & curriculum</p>
            </Link>
            <Link 
              href="/programs#student-courses" 
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-500/50 hover:bg-accent-500/5 transition-all text-center"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="text-accent-500" size={24} />
              </div>
              <h3 className="text-white font-bold mb-1 text-lg">For Students</h3>
              <p className="text-white/40 text-xs">Individual courses & hands-on kits</p>
            </Link>
          </div>
        </div>
      </Modal>
      <Section spacing="md" className="relative pt-20 md:pt-24 lg:pt-32 min-h-[90vh] flex items-center justify-center overflow-hidden bg-linear-to-b from-primary-400 via-primary-400 to-primary-500">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-primary-500/80 pointer-events-none" />
        
        {/* Floating Ambient Orbs */}
        <div className="absolute top-20 -right-20 w-125 h-125 bg-accent-500/10 rounded-full blur-[120px] floating pointer-events-none" />
        <div className="absolute bottom-40 -left-20 w-100 h-100 bg-primary-300/15 rounded-full blur-[100px] floating pointer-events-none" style={{ animationDelay: '-3s' }} />
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
              className="text-[1.75rem] min-[360px]:text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-5 sm:mb-6 md:mb-8 leading-[1.1] sm:leading-none tracking-tight sm:tracking-tighter text-center w-full px-1 sm:px-2 md:px-0"
            >
              <span className="text-white block sm:mb-2 drop-shadow-2xl">Learn Robotics & AI</span>
              <span className="text-white inline-block mb-1 sm:mb-2 mr-2 sm:mr-3 drop-shadow-2xl">Through</span>
              <span className="text-shimmer inline-block px-2 py-4 -my-4 sm:px-4 sm:py-6 sm:-my-6">Real Projects</span>
            </motion.h1>

            <motion.p
              className="text-white/70 text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 font-medium leading-relaxed text-center px-2 sm:px-4 md:px-0"
            >
              CBSE & ICSE aligned curriculum that transforms education through simulation-based and hands-on robotics learning for Grades 1–12
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full px-2 sm:px-4 md:px-0"
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="rounded-2xl text-xs xs:text-sm sm:text-md lg:text-lg px-6 xs:px-8 sm:px-10 py-3.5 xs:py-4 sm:py-5 h-auto relative w-full sm:w-auto border-none transition-all duration-500 hover:scale-[1.03]"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="relative z-10 whitespace-nowrap">Start Learning Now</span>
              </Button>
              <Link href="/curriculum">
                <Button variant="outline" size="lg" className="rounded-2xl text-xs xs:text-sm sm:text-md lg:text-xl px-6 xs:px-8 sm:px-10 py-3.5 xs:py-4 sm:py-5 h-auto border-white/20 text-white hover:text-primary-900 w-full sm:w-auto transition-all duration-500">
                  <span className="relative z-10 whitespace-nowrap">View Curriculum</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-20 md:mt-24 lg:mt-32 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 max-w-5xl mx-auto w-full"
            >
              {[
                { val: '5', label: 'Curriculum Levels' },
                { val: 'Project-Based', label: 'Learning Approach' },
                  { val: '1-12', label: 'Grades Covered' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
                  <span className="text-4xl md:text-5xl font-heading font-black authentic-gold-text group-hover:scale-110 transition-transform duration-500 inline-block px-1 py-1 -my-1">{stat.val}</span>
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
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/20 to-white/40" />
              <span className="text-[9px] sm:text-[10px] text-white/30 font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase whitespace-nowrap px-2">Scroll to Discover</span>
              <div className="h-px flex-1 bg-linear-to-l from-transparent via-white/20 to-white/40" />
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section background="darkBlue" id="pathways" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Learning Architecture
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                Curriculum <span className="text-accent-500 text-shimmer">Pathways</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                Discover our comprehensive 5-level journey designed to transform students from curious beginners to advanced innovators.
              </p>
            </ScrollReveal>
          </div>

          {/* Creative Staggered Layout: 2 cards, then 3 cards */}
          <div className="space-y-6 lg:space-y-8">
            {/* First Row - 2 Cards (Jigyasa, Khoj) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {CURRICULUM_LEVELS.slice(0, 2).map((level, index) => (
                <ScrollReveal key={level.id} delay={index * 0.05}>
                  <Card variant="elevated" hover className="p-6 lg:p-8 transition-all h-full group bg-white/2 border-white/5 hover:bg-white/4 hover:border-accent-500/20 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="text-[10px] font-black text-accent-500 tracking-[0.2em] uppercase mb-2">Level 0{level.id}</div>
                        <h3 className="text-xl lg:text-2xl font-heading font-black text-white group-hover:text-accent-400 transition-colors tracking-tight">
                          {level.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] uppercase font-black text-white/30 tracking-[0.2em] mb-1">Grades</div>
                        <div className="font-bold text-accent-400 text-sm">{level.grade}</div>
                      </div>
                    </div>
                    
                    <p className="text-white/60 mb-6 leading-relaxed font-medium text-sm flex-1">
                      {level.description}
                    </p>
                    
                    {level.projects && (
                      <div className="mb-6">
                        <div className="text-[9px] uppercase font-black text-accent-500/50 tracking-[0.2em] mb-3">Key Projects</div>
                        <div className="grid grid-cols-1 gap-2">
                          {level.projects.map((project, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-white/70 bg-white/5 px-3 py-2 rounded-lg border border-white/5 group-hover:border-white/10 transition-all">
                              <div className="w-1 h-1 rounded-full bg-accent-500" />
                              {project}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-white/5 mt-auto">
                      <div className="text-[9px] uppercase font-black text-white/20 tracking-[0.2em] mb-2">Theme</div>
                      <div className="font-bold text-accent-400 group-hover:text-accent-300 transition-colors capitalize tracking-wide text-sm">{level.theme}</div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            {/* Second Row - 3 Cards (Nirmaan, Pragati, Udaan) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {CURRICULUM_LEVELS.slice(2, 5).map((level, index) => (
                <ScrollReveal key={level.id} delay={(index + 2) * 0.05}>
                  <Card variant="elevated" hover className="p-6 lg:p-8 transition-all h-full group bg-white/2 border-white/5 hover:bg-white/4 hover:border-accent-500/20 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="text-[10px] font-black text-accent-500 tracking-[0.2em] uppercase mb-2">Level 0{level.id}</div>
                        <h3 className="text-xl lg:text-2xl font-heading font-black text-white group-hover:text-accent-400 transition-colors tracking-tight">
                          {level.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] uppercase font-black text-white/30 tracking-[0.2em] mb-1">Grades</div>
                        <div className="font-bold text-accent-400 text-sm">{level.grade}</div>
                      </div>
                    </div>
                    
                    <p className="text-white/60 mb-6 leading-relaxed font-medium text-sm flex-1">
                      {level.description}
                    </p>
                    
                    {level.projects && (
                      <div className="mb-6">
                        <div className="text-[9px] uppercase font-black text-accent-500/50 tracking-[0.2em] mb-3">Key Projects</div>
                        <div className="grid grid-cols-1 gap-2">
                          {level.projects.map((project, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-white/70 bg-white/5 px-3 py-2 rounded-lg border border-white/5 group-hover:border-white/10 transition-all">
                              <div className="w-1 h-1 rounded-full bg-accent-500" />
                              {project}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-white/5 mt-auto">
                      <div className="text-[9px] uppercase font-black text-white/20 tracking-[0.2em] mb-2">Theme</div>
                      <div className="font-bold text-accent-400 group-hover:text-accent-300 transition-colors capitalize tracking-wide text-sm">{level.theme}</div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
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

              <Link href="/schools">
                <Button variant="outline" size="lg" className="rounded-2xl px-12 text-white hover:text-primary-900 transition-all duration-500">
                  School Partnerships
                </Button>
              </Link>
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
                      <div className="text-white/70 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs">1–12</div>
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
                Whether you&apos;re a student or trainer, we have the right program for you
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <GraduationCap size={40} />,
                title: 'For Students',
                description: 'Simulation-based and hands-on robotics programs tailored to your grade level',
                link: '/programs'
              },
              {
                icon: <School size={40} />,
                title: 'For Schools',
                description: 'Complete CBSE/ICSE aligned curriculum with implementation support',
                link: '#schools'
              },
              {
                icon: <Bot size={40} />,
                title: 'Our Approach',
                description: 'Project-based learning from simulation to hardware across 5 levels',
                link: '#pathways'
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
                  <Link 
                    href={item.link} 
                    className="inline-flex items-center gap-2 text-accent-400 font-black capitalize tracking-widest text-xs hover:gap-4 hover:text-accent-300 transition-all group/link"
                    scroll={item.link.startsWith('#')}
                  >
                    Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              </ScrollReveal>
            ))}
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
                We don&apos;t just sell kits. We architect comprehensive learning ecosystems designed for systemic educational impact.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
              { icon: <Target size={28} />, title: 'Board Aligned', description: 'Every module maps to engineering-grade projects, fully synchronized with CBSE & ICSE standards.' },
              { icon: <Bot size={28} />, title: 'Simulation Labs', description: 'Master deep concepts through high-fidelity virtual simulations before deploying to physical hardware.' },
              { icon: <Award size={28} />, title: 'Project First', description: 'Curriculum built on real-world engineering challenges that demand critical problem-solving.' },
              { icon: <Zap size={28} />, title: 'Agile Learning', description: 'A progressive 5-stage architecture that transforms students into future-ready innovators.' },
              { icon: <School size={32} />, title: 'Grades Covered', description: 'White-glove implementation support for schools, including instructor training and lab design.' },
              { icon: <GraduationCap size={28} />, title: 'Career-Ready', description: 'Developing the technical literacy and computational thinking required for the next industrial era.' }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="flex flex-col gap-8 group bg-white/1 p-8 rounded-4xl border border-white/5 hover:border-accent-500/20 hover:bg-white/3 transition-all duration-500">
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
              <div className="flex justify-center">
                <Link href="/programs">
                  <Button variant="primary" size="lg" className="rounded-2xl px-12 font-black tracking-widest uppercase text-xs border-none shadow-2xl shadow-accent-500/20 py-5 w-full sm:w-auto transition-all duration-500 hover:scale-105">
                    Explore Programs
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
