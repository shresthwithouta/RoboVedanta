'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, School, GraduationCap, Zap, Target, Award } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

import { CURRICULUM_LEVELS, FADE_IN_UP, STAGGER_CONTAINER } from '@/lib/constants';

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
      <Section spacing="md" background="none" className="pt-20 md:pt-24 lg:pt-28 gradient-animate">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_CONTAINER}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={FADE_IN_UP} className="mb-8">
              <Badge variant="primary" size="lg" className="hover:scale-105 transition-transform cursor-default shadow-sm border-primary-100/50">
                Premium STEM Education
              </Badge>
            </motion.div>
            
            <motion.h1
              variants={FADE_IN_UP}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-neutral-900 mb-6 leading-tight tracking-tight"
            >
              Learn Robotics & AI{' '}
              <span className="md:whitespace-nowrap">
                Through{' '}
                <span className="bg-linear-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Real Projects
                </span>
              </span>
            </motion.h1>
            
            <motion.p
              variants={FADE_IN_UP}
              className="text-lg md:text-xl lg:text-2xl text-neutral-600 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              CBSE & ICSE aligned curriculum that transforms education through simulation-based
              and hands-on robotics learning for Grades 6–12
            </motion.p>
            
            <motion.div
              variants={FADE_IN_UP}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} className="group">
                Explore Programs
              </Button>
              <Button variant="outline" size="lg">
                For Schools
              </Button>
            </motion.div>
            
            <motion.div
              variants={FADE_IN_UP}
              className="mt-20 md:mt-24 lg:mt-28 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-16 max-w-4xl mx-auto"
            >
              {[
                { val: '5', label: 'Curriculum Levels' },
                { val: 'Project-Based', label: 'Learning Approach' },
                { val: '6–12', label: 'Grade Coverage' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl lg:text-6xl font-heading font-black text-primary-600 mb-2 whitespace-nowrap drop-shadow-sm">
                    {stat.val}
                  </div>
                  <div className="text-sm md:text-base text-neutral-500 font-bold tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section spacing="lg" className="overflow-hidden bg-gradient-to-b from-accent-50/40 to-white">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4 tracking-tight">
                Built For Everyone
              </h2>
              <p className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto lg:whitespace-nowrap capitalize tracking-wide">
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
                  <div className="inline-flex p-4 rounded-2xl bg-primary-50 text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-black text-neutral-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 mb-8 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <Link href={item.link} className="inline-flex items-center gap-2 text-primary-600 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all group/link">
                    Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="none" spacing="lg" className="overflow-hidden bg-gradient-to-b from-white via-primary-50/50 to-primary-100/40">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="primary" size="md" className="mb-4 shadow-sm border-primary-200/50">
                5 Levels of Excellence
              </Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4 tracking-tight">
                Your Learning Journey
              </h2>
              <p className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto capitalize tracking-wide">
                From curiosity to innovation, each level builds upon the last
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRICULUM_LEVELS.map((level, index) => (
              <ScrollReveal key={level.id} delay={index * 0.05}>
                <Card variant="default" hover className="p-8 transition-all h-full group">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <Badge variant="primary" size="sm" className="mb-3 font-black">
                        Level {level.id}
                      </Badge>
                      <h3 className="text-2xl font-heading font-black text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {level.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] capitalize font-black text-neutral-400 tracking-widest mb-1">Grades</div>
                      <div className="font-black text-primary-600 text-lg">{level.grade}</div>
                    </div>
                  </div>
                  <p className="text-neutral-600 mb-6 leading-relaxed font-medium">{level.description}</p>
                  <div className="pt-6 border-t border-neutral-100">
                    <div className="text-[10px] capitalize font-black text-neutral-400 tracking-widest mb-1">Theme</div>
                    <div className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors capitalize tracking-tight">{level.theme}</div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
            
            <ScrollReveal delay={0.4}>
              <Card variant="glass" className="p-8 flex flex-col justify-center items-center text-center bg-linear-to-br from-primary-600 to-accent-600 h-full group cursor-pointer hover:shadow-glow-accent transition-all duration-500">
                <Zap size={48} className="text-white mb-6 animate-pulse group-hover:scale-120 group-hover:rotate-12 transition-transform" />
                <h3 className="text-2xl font-heading font-black text-white mb-4 capitalize tracking-tight">
                  Ready to Start?
                </h3>
                <p className="text-white/90 mb-8 font-bold capitalize tracking-widest text-xs">
                  Explore our complete curriculum
                </p>
                <Button variant="secondary" size="md" className="rounded-full px-8 py-3 bg-white text-primary-600 hover:scale-105 shadow-xl">
                  View Curriculum
                </Button>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="overflow-hidden bg-gradient-to-b from-primary-100/40 via-white to-accent-50/40">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4 tracking-tight">
                Why RoboVedanta?
              </h2>
              <p className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto capitalize tracking-wide">
                We don't just sell kits. We sell learning systems and thinking models.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Target size={32} />, title: 'Board Aligned', description: 'Every chapter maps to a robotics project, fully aligned with CBSE & ICSE' },
              { icon: <Bot size={32} />, title: 'Simulation First', description: 'Learn concepts through virtual simulations before hands-on hardware' },
              { icon: <Award size={32} />, title: 'Project-Based', description: 'Real-world projects that develop critical thinking and problem-solving' },
              { icon: <Zap size={32} />, title: 'Progressive Learning', description: '5 levels from Grade 6 to 12, building expertise year by year' },
              { icon: <School size={32} />, title: 'Complete Support', description: 'Full implementation support for schools and educators' },
              { icon: <GraduationCap size={32} />, title: 'Student Centric', description: 'Designed to engage and inspire the next generation of innovators' }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="flex gap-5 group">
                  <div className="shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-all duration-500 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 shadow-sm group-hover:shadow-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-black text-neutral-900 mb-2 transition-colors group-hover:text-primary-600">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="none" spacing="lg" className="bg-gradient-to-b from-accent-50/40 via-primary-50/30 to-primary-100/50">
        <Container>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6 tracking-tight">
                Ready to Transform Education?
              </h2>
              <p className="text-xl text-neutral-600 font-medium mb-12">
                Join schools and students already learning the future
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button variant="primary" size="lg" className="rounded-full shadow-2xl">
                  Explore Programs
                </Button>
                <Button variant="outline" size="lg" className="rounded-full bg-white/50 backdrop-blur-sm shadow-xl">
                  Request Curriculum
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </main>
  );
}
