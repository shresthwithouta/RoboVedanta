'use client';

import Link from 'next/link';
import { ArrowRight, Bot, School, GraduationCap, Zap, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CURRICULUM_LEVELS, FADE_IN_UP, STAGGER_CONTAINER } from '@/lib/constants';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Section background="gradient" spacing="lg">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_CONTAINER}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={FADE_IN_UP} className="mb-6">
              <Badge variant="primary" size="lg">
                Premium STEM Education
              </Badge>
            </motion.div>
            
            <motion.h1
              variants={FADE_IN_UP}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-neutral-900 mb-6"
            >
              Learn Robotics & AI Through
              <span className="bg-linear-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {' '}Real Projects
              </span>
            </motion.h1>
            
            <motion.p
              variants={FADE_IN_UP}
              className="text-xl md:text-2xl text-neutral-600 mb-10 leading-relaxed"
            >
              CBSE & ICSE aligned curriculum that transforms education through simulation-based
              and hands-on robotics learning for Grades 6–12
            </motion.p>
            
            <motion.div
              variants={FADE_IN_UP}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg" icon={<ArrowRight size={20} />}>
                Explore Programs
              </Button>
              <Button variant="outline" size="lg">
                For Schools
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              variants={FADE_IN_UP}
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { label: 'Curriculum Levels', value: '5' },
                { label: 'Grade Coverage', value: '6–12' },
                { label: 'Learning Approach', value: 'Project-Based' }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Who We Serve */}
      {/* Who We Serve */}
      <Section spacing="lg" className="overflow-hidden">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
              Built For Everyone
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Whether you're a student, parent, or educator, we have the right program for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <GraduationCap size={40} />,
                title: 'For Students',
                description: 'Simulation-based and hands-on robotics programs tailored to your grade level',
                link: '/students',
                color: 'primary'
              },
              {
                icon: <School size={40} />,
                title: 'For Schools',
                description: 'Complete CBSE/ICSE aligned curriculum with implementation support',
                link: '/schools',
                color: 'accent'
              },
              {
                icon: <Bot size={40} />,
                title: 'Our Approach',
                description: 'Project-based learning from simulation to hardware across 5 levels',
                link: '/curriculum',
                color: 'primary'
              }
            ].map((item, index) => (
              <Card key={index} variant="elevated" hover className="p-6 md:p-8 group h-full">
                <div className={`inline-flex p-4 rounded-xl bg-${item.color}-100 text-${item.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed line-clamp-2 md:line-clamp-none">
                  {item.description}
                </p>
                <Link href={item.link} className="inline-flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all">
                  Learn More <ArrowRight size={18} />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Learning Journey */}
      <Section background="gray" spacing="lg" className="overflow-hidden">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" size="md" className="mb-4">
              5 Levels of Excellence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              From curiosity to innovation, each level builds upon the last
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRICULUM_LEVELS.map((level, index) => (
              <Card key={level.id} variant="default" className="p-6 hover:shadow-lg transition-shadow h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="primary" size="sm" className="mb-2">
                      Level {level.id}
                    </Badge>
                    <h3 className="text-2xl font-heading font-bold text-neutral-900">
                      {level.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-500">Grades</div>
                    <div className="font-semibold text-primary-600">{level.grade}</div>
                  </div>
                </div>
                <p className="text-neutral-600 mb-4 line-clamp-2 md:line-clamp-none">{level.description}</p>
                <div className="pt-4 border-t border-neutral-200">
                  <div className="text-sm text-neutral-500">Theme</div>
                  <div className="font-medium text-neutral-900">{level.theme}</div>
                </div>
              </Card>
            ))}
            
            {/* CTA Card */}
            <Card variant="glass" className="p-6 flex flex-col justify-center items-center text-center bg-linear-to-br from-primary-600 to-accent-600 h-full">
              <Zap size={48} className="text-white mb-4" />
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                Ready to Start?
              </h3>
              <p className="text-white/90 mb-6 font-medium">
                Explore our complete curriculum
              </p>
              <Button variant="secondary" size="md">
                View Curriculum
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section spacing="lg" className="overflow-hidden">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
              Why RoboVedanta?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We don't just sell kits. We sell learning systems and thinking models.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={32} />,
                title: 'Board Aligned',
                description: 'Every chapter maps to a robotics project, fully aligned with CBSE & ICSE'
              },
              {
                icon: <Bot size={32} />,
                title: 'Simulation First',
                description: 'Learn concepts through virtual simulations before hands-on hardware'
              },
              {
                icon: <Award size={32} />,
                title: 'Project-Based',
                description: 'Real-world projects that develop critical thinking and problem-solving'
              },
              {
                icon: <Zap size={32} />,
                title: 'Progressive Learning',
                description: '5 levels from Grade 6 to 12, building expertise year by year'
              },
              {
                icon: <School size={32} />,
                title: 'Complete Support',
                description: 'Full implementation support for schools and educators'
              },
              {
                icon: <GraduationCap size={32} />,
                title: 'Student Centric',
                description: 'Designed to engage and inspire the next generation of innovators'
              }
            ].map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed line-clamp-2 md:line-clamp-none">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-neutral-600 mb-10">
              Join schools and students already learning the future
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Explore Programs
              </Button>
              <Button variant="outline" size="lg">
                Request Curriculum
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
