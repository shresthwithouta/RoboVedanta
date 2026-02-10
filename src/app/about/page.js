'use client';

import { useRef } from 'react';
import { Users, Heart, Lightbulb, Target, BookOpen, Award, Zap, TrendingUp, CheckCircle2, School, Cpu, Globe } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

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

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section spacing="md" className="relative pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-32 min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-400 via-primary-400 to-primary-500">
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-500/80 pointer-events-none" />
        
        <div className="absolute top-20 -right-20 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] floating pointer-events-none" />
        <div className="absolute bottom-40 -left-20 w-[400px] h-[400px] bg-primary-300/15 rounded-full blur-[100px] floating pointer-events-none" style={{ animationDelay: '-3s' }} />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/5 text-accent-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
              About Us
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tight">
              <span className="text-white block mb-2 drop-shadow-2xl">Welcome to</span>
              <span className="text-shimmer">RoboVedanta</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              A leading EdTech company dedicated to inspiring the next generation with hands-on robotics and AI learning experiences for kids.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                  Our Mission
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-10 leading-tight tracking-tighter text-white">
                  Empowering Young Minds Through <span className="text-accent-500">Technology</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card variant="elevated" className="p-10 md:p-16 bg-gradient-to-br from-accent-500/10 to-primary-600/50 border-accent-500/20 text-center">
                <div className="space-y-6 text-white/80 text-lg md:text-xl leading-relaxed font-medium">
                  <p>
                    We specialize in integrating <span className="text-accent-400 font-bold">STEM education</span> into school programs and workshops, creating meaningful learning experiences that go beyond traditional classroom boundaries.
                  </p>
                  <p>
                    Our approach fosters a <span className="text-accent-400 font-bold">student-centered learning environment</span> that encourages curiosity and innovation, preparing students for the technological challenges of tomorrow.
                  </p>
                  <p className="text-accent-500 font-bold text-xl md:text-2xl pt-6">
                    Join us in empowering young minds to explore the exciting world of technology and engineering!
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Who We Are Section */}
      <Section background="darker" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" style={{ animationDirection: 'reverse' }} />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                Who We Are
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                Built by <span className="text-accent-500">Educators</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                We are a group of passionate educators who understand what works in real classrooms because we've been there.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: <Users size={40} />,
                title: 'Group of Educators',
                description: 'Teachers, mentors, and education specialists who have spent years in classrooms understanding how students learn best.'
              },
              {
                icon: <School size={40} />,
                title: 'Classroom Experience',
                description: 'Our curriculum is built from real classroom experience, tested and refined with actual students over multiple academic years.'
              },
              {
                icon: <Lightbulb size={40} />,
                title: 'Focus on Thinking',
                description: 'We prioritize developing critical thinking and problem-solving skills over just assembling kits or following instructions.'
              },
              {
                icon: <Target size={40} />,
                title: 'Long-Term Vision',
                description: 'Our goal is sustainable education transformation, not quick fixes. We build foundations that last a lifetime.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" className="p-8 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/[0.02]">
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-heading font-black text-accent-500 mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed font-medium text-sm">{item.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Philosophy Card */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-white/[0.02] border-white/10">
              <div className="text-center mb-12">
                <Heart size={56} className="text-accent-500 mx-auto mb-6" />
                <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-4">Our Philosophy</h3>
                <p className="text-white/60 text-lg">What drives our approach to education</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Thinking Over Kits',
                    description: 'We believe in teaching students how to think, analyze, and create—not just how to assemble pre-packaged kits. The robotics kit is a tool, not the goal.'
                  },
                  {
                    title: 'Real Classroom Roots',
                    description: 'Every lesson, every project, every assessment has been shaped by actual classroom feedback. We know what works because we\'ve seen it work.'
                  },
                  {
                    title: 'Sustainable Impact',
                    description: 'We\'re not chasing trends or making exaggerated claims. We\'re building a long-term educational foundation that truly prepares students for the future.'
                  }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-accent-500/20 border-2 border-accent-500 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={24} className="text-accent-500" />
                    </div>
                    <h4 className="text-xl font-heading font-black text-white mb-3">{item.title}</h4>
                    <p className="text-white/60 leading-relaxed font-medium text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* What We Do Section */}
      <Section background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                What We Do
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                Our <span className="text-accent-500">Approach</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                We create comprehensive learning experiences that integrate seamlessly with existing curricula.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {[
              {
                icon: <BookOpen size={40} />,
                title: 'Curriculum Integration',
                points: [
                  'Aligned with CBSE & ICSE standards',
                  'Maps directly to textbook chapters',
                  'Supports Science, Math, and CS curricula',
                  'Project-based learning approach'
                ]
              },
              {
                icon: <Users size={40} />,
                title: 'Student-Centered Learning',
                points: [
                  'Encourages curiosity and exploration',
                  'Hands-on, experiential learning',
                  'Collaborative problem-solving',
                  'Real-world application focus'
                ]
              },
              {
                icon: <Cpu size={40} />,
                title: 'Technology Integration',
                points: [
                  'Simulation-based learning platforms',
                  'Optional physical robotics kits',
                  'AI and machine learning concepts',
                  'Industry-relevant skills'
                ]
              },
              {
                icon: <Award size={40} />,
                title: 'Teacher Support',
                points: [
                  'Comprehensive training programs',
                  'Ongoing professional development',
                  'Ready-to-use lesson plans',
                  'Dedicated technical support'
                ]
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" className="p-8 md:p-10 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/[0.02]">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 group-hover:bg-accent-600 group-hover:text-primary-900 transition-all duration-500 shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-heading font-black text-accent-500 pt-2">{item.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
                        <span className="text-white/70 font-medium text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Impact Stats */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-gradient-to-br from-accent-500/10 to-primary-600/50 border-accent-500/20">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-heading font-black text-accent-500 mb-4">Our Commitment</h3>
                <p className="text-white/60 text-lg">Building the foundation for tomorrow's innovators</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: <BookOpen size={32} />, value: '120+', label: 'Projects' },
                  { icon: <TrendingUp size={32} />, value: '5', label: 'Learning Levels' },
                  { icon: <School size={32} />, value: '12', label: 'Grades Covered' },
                  { icon: <Globe size={32} />, value: '100%', label: 'Board Aligned' }
                ].map((stat, i) => (
                  <div key={i} className="text-center group cursor-default">
                    <div className="inline-flex p-3 bg-accent-500/20 rounded-2xl mb-4 group-hover:bg-accent-600 group-hover:scale-110 transition-all">
                      <div className="text-accent-500 group-hover:text-primary-900 transition-colors">{stat.icon}</div>
                    </div>
                    <div className="text-4xl md:text-5xl font-heading font-black text-shimmer mb-2 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Values Section */}
      <Section background="darker" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" style={{ animationDirection: 'reverse' }} />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                Our Values
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                What We <span className="text-accent-500">Stand For</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart size={40} />,
                title: 'Authenticity',
                description: 'No exaggerated claims or empty promises. We deliver what we say, backed by real classroom experience and proven results.'
              },
              {
                icon: <Lightbulb size={40} />,
                title: 'Innovation',
                description: 'We continuously evolve our curriculum based on feedback, emerging technologies, and educational best practices.'
              },
              {
                icon: <Users size={40} />,
                title: 'Collaboration',
                description: 'We work closely with schools, teachers, and students to create learning experiences that truly make a difference.'
              }
            ].map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" className="p-8 md:p-10 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/[0.02] text-center">
                  <div className="inline-flex p-5 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-black text-accent-500 mb-4">{value.title}</h3>
                  <p className="text-white/60 leading-relaxed font-medium">{value.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="darkBlue" spacing="lg" className="relative overflow-hidden group/cta">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.05)_0%,transparent_70%)] animate-slow-zoom" />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center py-20 md:py-32">
            <ScrollReveal>
              <h2 className="text-5xl md:text-8xl font-heading font-black text-white mb-10 leading-[0.8] tracking-tighter">
                Join Our <br />
                <span className="text-shimmer">Mission</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/40 font-medium mb-16 max-w-2xl mx-auto tracking-tight">
                Be part of the movement to transform STEM education and empower the next generation of innovators.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                <Button variant="primary" size="lg" className="rounded-2xl px-12 font-black tracking-widest uppercase text-xs border-none shadow-2xl shadow-accent-500/20 py-5 w-full sm:w-auto">
                  Explore Programs
                </Button>
                <Button variant="outline" size="lg" className="rounded-2xl px-12 font-black tracking-widest uppercase text-xs text-white hover:text-primary-900 py-5 w-full sm:w-auto transition-all duration-500">
                  Contact Us
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
