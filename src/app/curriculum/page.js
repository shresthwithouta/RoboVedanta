'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Target, Layers, GraduationCap, Lightbulb, Cpu, Radio, Code, Zap, CheckCircle2, TrendingUp, Users, Award } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CURRICULUM_LEVELS } from '@/lib/constants';
import { CheckTeachersCTA } from '@/components/ui/CheckTeachersCTA';

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

export default function CurriculumPage() {
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
              Learning Architecture
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tight">
              <span className="text-white block mb-2 drop-shadow-2xl">Curriculum &</span>
              <span className="text-shimmer">Learning Approach</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              A comprehensive, project-based robotics curriculum designed for Grades 1–12, aligned with CBSE & ICSE standards
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Button variant="primary" size="lg" className="rounded-2xl px-10 py-5 h-auto border-none shadow-2xl shadow-accent-500/10">
                <span className="relative z-10">Download Syllabus</span>
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-10 py-5 h-auto border-white/20 text-white hover:text-primary-900">
                <span className="relative z-10">View Sample Projects</span>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Project-Based Learning Section */}
      <Section background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Methodology
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                <span className="text-accent-500">Project-Based</span> Learning
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                Learning by doing. Every concept is taught through real-world projects that students build, test, and iterate.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { icon: <Lightbulb size={32} />, title: 'Ideate', description: 'Students identify real-world problems and brainstorm solutions' },
              { icon: <Code size={32} />, title: 'Design', description: 'Plan the robot architecture, sensors, and programming logic' },
              { icon: <Cpu size={32} />, title: 'Build', description: 'Construct robots using simulation tools or physical hardware kits' },
              { icon: <Zap size={32} />, title: 'Test & Iterate', description: 'Debug, optimize, and improve based on performance results' }
            ].map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" className="p-8 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500">
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                    {step.icon}
                  </div>
                  <div className="text-xs font-black text-accent-500 tracking-[0.2em] uppercase mb-3">Step {index + 1}</div>
                  <h3 className="text-2xl font-heading font-black text-white mb-4">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed font-medium">{step.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Project Examples */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-accent-500/5 border-accent-500/20 backdrop-blur-xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-heading font-black text-accent-500 mb-4">Example Projects</h3>
                <p className="text-white/60 text-lg">Real projects students build across different levels</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { level: 'Level 1', project: 'Line Following Robot', skills: 'Logic, Sensors' },
                  { level: 'Level 3', project: 'Smart Home Automation', skills: 'IoT, Communication' },
                  { level: 'Level 5', project: 'AI-Powered Sorting System', skills: 'Machine Learning, Vision' }
                ].map((example, i) => (
                  <div key={i} className="bg-primary-600/50 p-6 rounded-2xl border border-white/10 hover:border-accent-500/30 transition-all group">
                    <div className="text-xs font-black text-accent-400 tracking-widest uppercase mb-3">{example.level}</div>
                    <h4 className="text-xl font-heading font-black text-white mb-3 group-hover:text-accent-400 transition-colors">{example.project}</h4>
                    <div className="flex flex-wrap gap-2">
                      {example.skills.split(', ').map((skill, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/60 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Theme-Based Learning Section */}
      <Section background="darker" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" style={{ animationDirection: 'reverse' }} />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                Thematic Approach
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                <span className="text-accent-500">Theme-Based</span> Learning
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                Each level follows a unique Sanskrit-named theme that represents the learning journey from curiosity to mastery.
              </p>
            </ScrollReveal>
          </div>

          {/* 5 Levels with Themes */}
          <div className="space-y-8 mb-20">
            {CURRICULUM_LEVELS.map((level, index) => (
              <ScrollReveal key={level.id} delay={index * 0.05}>
                <Card variant="elevated" className="p-8 md:p-12 group hover:border-accent-500/30 transition-all duration-500 bg-white/[0.02] border-white/10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Level Number */}
                    <div className="lg:col-span-2 flex items-center justify-center lg:justify-start">
                      <div className="relative">
                        <div className="text-7xl md:text-8xl font-heading font-black text-accent-500/20 group-hover:text-accent-500/30 transition-colors">
                          0{level.id}
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-black text-accent-500 tracking-widest uppercase">
                          Level
                        </div>
                      </div>
                    </div>

                    {/* Theme & Name */}
                    <div className="lg:col-span-4 text-center lg:text-left">
                      <h3 className="text-3xl md:text-4xl font-heading font-black text-shimmer mb-3 tracking-tight">
                        {level.name}
                      </h3>
                      <p className="text-accent-400 font-bold text-sm tracking-widest uppercase mb-2">{level.theme}</p>
                      {/* <p className="text-white/40 text-sm font-medium">Grades {level.grade}</p> */}
                      <p className="text-white/40 text-xs font-medium italic">Grades with levels to be added soon</p>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-6">
                      <p className="text-white/70 text-lg leading-relaxed font-medium mb-6">
                        {level.description}
                      </p>
                      <Link href={`/curriculum/level-${level.id}`} className="inline-flex items-center gap-2 text-accent-400 font-black text-sm tracking-widest uppercase hover:gap-4 hover:text-accent-300 transition-all group/link">
                        Explore Level {level.id}
                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Theme Progression Visual */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-gradient-to-br from-accent-500/10 to-primary-600/50 border-accent-500/20">
              <h3 className="text-3xl md:text-4xl font-heading font-black text-center text-accent-500 mb-12">Learning Journey</h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                {CURRICULUM_LEVELS.map((level, index) => (
                  <div key={level.id} className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex flex-col items-center text-center group cursor-default flex-1 md:flex-initial">
                      <div className="w-16 h-16 rounded-full bg-accent-500/20 border-2 border-accent-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <span className="text-xl font-heading font-black text-accent-500">{level.id}</span>
                      </div>
                      <div className="text-sm font-black text-white mb-1">{level.name}</div>
                      {/* <div className="text-xs text-white/40 font-medium">Grade {level.grade}</div> */}
                      <div className="text-[10px] text-white/30 font-medium italic">Available Soon</div>
                    </div>
                    {index < CURRICULUM_LEVELS.length - 1 && (
                      <ArrowRight className="hidden md:block text-accent-500/50 shrink-0" size={24} />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Grade-Wise Progression Section */}
      <Section background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Progression Model
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                <span className="text-accent-500">Grade-Wise</span> Progression
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                Structured learning path that builds complexity as students advance through grades 1 to 12.
              </p>
            </ScrollReveal>
          </div>

          {/* Progression Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                stage: 'Foundation',
                grades: '1-8',
                icon: <BookOpen size={40} />,
                skills: ['Basic Logic', 'Sensors', 'Simple Circuits', 'Block Programming'],
                color: 'from-blue-500/20 to-accent-500/20'
              },
              {
                stage: 'Intermediate',
                grades: '9-10',
                icon: <Layers size={40} />,
                skills: ['Text-Based Coding', 'AI Concepts', 'IoT Systems', 'Data Processing'],
                color: 'from-accent-500/20 to-orange-500/20'
              },
              {
                stage: 'Advanced',
                grades: '11-12',
                icon: <Award size={40} />,
                skills: ['Machine Learning', 'Computer Vision', 'Advanced Robotics', 'Innovation Projects'],
                color: 'from-orange-500/20 to-red-500/20'
              }
            ].map((stage, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" className={`p-8 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-gradient-to-br ${stage.color}`}>
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                    {stage.icon}
                  </div>
                  <div className="text-xs font-black text-accent-500 tracking-[0.2em] uppercase mb-2">Grades {stage.grades}</div>
                  <h3 className="text-3xl font-heading font-black text-white mb-6">{stage.stage}</h3>
                  <ul className="space-y-3">
                    {stage.skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
                        <span className="text-white/70 font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Skill Development Chart */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-white/[0.02] border-white/10">
              <h3 className="text-3xl md:text-4xl font-heading font-black text-center text-accent-500 mb-12">Skill Development Timeline</h3>
              <div className="space-y-6">
                {[
                  { skill: 'Computational Thinking', levels: [20, 40, 60, 80, 100] },
                  { skill: 'Programming Proficiency', levels: [15, 35, 55, 75, 100] },
                  { skill: 'Hardware Integration', levels: [25, 45, 65, 80, 100] },
                  { skill: 'Problem Solving', levels: [30, 50, 70, 85, 100] },
                  { skill: 'Innovation & Creativity', levels: [20, 40, 60, 80, 100] }
                ].map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-bold text-sm md:text-base">{item.skill}</span>
                      <TrendingUp size={18} className="text-accent-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      {item.levels.map((level, i) => (
                        <div key={i} className="flex-1 relative">
                          <div className="h-8 bg-primary-600/50 rounded-lg overflow-hidden border border-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${level}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              viewport={{ once: true }}
                              className="h-full bg-gradient-to-r from-accent-600 to-accent-500 flex items-center justify-center"
                            >
                              <span className="text-[10px] font-black text-primary-900">{level}%</span>
                            </motion.div>
                          </div>
                          <div className="text-center mt-1">
                            <span className="text-[10px] text-white/40 font-bold">L{i + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Textbook Alignment Section */}
      <Section background="darker" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" style={{ animationDirection: 'reverse' }} />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                Academic Integration
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                How Robotics Supports <span className="text-accent-500">Textbooks</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                Our curriculum complements CBSE & ICSE textbooks, bringing theoretical concepts to life through hands-on robotics.
              </p>
            </ScrollReveal>
          </div>

          {/* Alignment Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {[
              {
                subject: 'Science',
                icon: <Target size={32} />,
                topics: ['Physics: Motion, Forces, Energy', 'Electronics: Circuits, Sensors', 'Biology: Neural Networks (AI)'],
                roboticsConnection: 'Build robots that demonstrate Newton\'s laws, use sensors to measure physical phenomena, and implement basic AI inspired by biological systems.'
              },
              {
                subject: 'Mathematics',
                icon: <Layers size={32} />,
                topics: ['Geometry: Angles, Coordinates', 'Algebra: Variables, Functions', 'Statistics: Data Analysis'],
                roboticsConnection: 'Program robots to navigate using coordinates, use algebraic functions for sensor calibration, and analyze performance data.'
              },
              {
                subject: 'Computer Science',
                icon: <Code size={32} />,
                topics: ['Programming: Loops, Conditionals', 'Data Structures: Arrays, Lists', 'Algorithms: Sorting, Searching'],
                roboticsConnection: 'Apply programming concepts directly to robot control, use data structures for sensor data, and implement algorithms for autonomous behavior.'
              },
              {
                subject: 'Social Studies',
                icon: <Users size={32} />,
                topics: ['Technology Impact on Society', 'Innovation & Entrepreneurship', 'Sustainable Development'],
                roboticsConnection: 'Explore how robotics and AI impact jobs, design solutions for social problems, and create eco-friendly automation projects.'
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" className="p-8 md:p-10 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/[0.02]">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 group-hover:bg-accent-600 group-hover:text-primary-900 transition-all duration-500 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading font-black text-accent-500 mb-2">{item.subject}</h3>
                      <div className="text-xs font-black text-white/40 tracking-widest uppercase">Textbook Topics</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {item.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-accent-500 shrink-0 mt-1" />
                        <span className="text-white/60 text-sm font-medium">{topic}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-white/10">
                    <div className="text-xs font-black text-accent-400 tracking-widest uppercase mb-3">Robotics Connection</div>
                    <p className="text-white/70 leading-relaxed font-medium text-sm">{item.roboticsConnection}</p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Board Alignment */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-gradient-to-br from-accent-500/10 to-primary-600/50 border-accent-500/20">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-heading font-black text-accent-500 mb-4">Board Alignment</h3>
                <p className="text-white/60 text-lg">Fully mapped to CBSE & ICSE learning outcomes</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-primary-600/50 p-8 rounded-2xl border border-white/10">
                  <h4 className="text-2xl font-heading font-black text-white mb-6">CBSE Alignment</h4>
                  <ul className="space-y-3">
                    {[
                      'Skill Subject: AI & Robotics',
                      'Coding Standards (Classes 1-12)',
                      'NEP 2020 Compliant',
                      'Experiential Learning Focus'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
                        <span className="text-white/70 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary-600/50 p-8 rounded-2xl border border-white/10">
                  <h4 className="text-2xl font-heading font-black text-white mb-6">ICSE Alignment</h4>
                  <ul className="space-y-3">
                    {[
                      'Computer Applications Syllabus',
                      'Project Work Requirements',
                      'Practical Skills Development',
                      'Internal Assessment Ready'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
                        <span className="text-white/70 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Teachers CTA */}
      <CheckTeachersCTA />

      {/* CTA Section */}
      <Section background="darkBlue" spacing="lg" className="relative overflow-hidden group/cta">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.05)_0%,transparent_70%)] animate-slow-zoom" />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center py-20 md:py-32">
            <ScrollReveal>
              <h2 className="text-5xl md:text-8xl font-heading font-black text-white mb-10 leading-[0.8] tracking-tighter">
                Ready to <br />
                <span className="text-shimmer">Get Started?</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/40 font-medium mb-16 max-w-2xl mx-auto tracking-tight">
                Download our complete curriculum guide or schedule a demo to see our approach in action.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                <Button variant="primary" size="lg" className="rounded-2xl px-12 font-black tracking-widest uppercase text-xs border-none shadow-2xl shadow-accent-500/20 py-5 w-full sm:w-auto">
                  Download Curriculum
                </Button>
                <Button variant="outline" size="lg" className="rounded-2xl px-12 font-black tracking-widest uppercase text-xs text-white hover:text-primary-900 py-5 w-full sm:w-auto transition-all duration-500">
                  Schedule Demo
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}
