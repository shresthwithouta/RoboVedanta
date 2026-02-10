'use client';

import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Monitor, Package, School, CheckCircle2, Lightbulb, Code, Cpu, Award, Users, Calendar, TrendingUp, Zap, Target, BookOpen, Video, Home, GraduationCap, X, ChevronRight, ChevronLeft, MapPin, Mail, Phone, User, Check, Building } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getActiveTeachers, getTeacherById } from '@/data/teachers';

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay,ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function ProgramsPage() {
  const searchParams = useSearchParams();
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Teacher (Blank), 3: Summary
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Student/Parent Details
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    grade: '',
    // Program Selection
    programType: '', // 'simulation' or 'hardware'
    estimatedQuote: 0,
    message: ''
  });

  const teachers = getActiveTeachers();

  const handleNextStep = () => {
    if (currentStep === 1) {
      const requiredFields = ['studentName', 'parentName', 'email', 'phone', 'grade', 'city'];
      const isValid = requiredFields.every(field => formData[field]);
      
      if (!isValid) {
        alert('Please fill in all required fields');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const openRegistration = (type) => {
    setFormData(prev => ({
      ...prev,
      programType: type,
      estimatedQuote: type === 'simulation' ? 3500 : 8000
    }));
    setShowRegistration(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mocking submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowRegistration(false);
        setSubmitSuccess(false);
        setCurrentStep(1);
        setFormData({
          studentName: '',
          parentName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          grade: '',
          programType: '',
          estimatedQuote: 0,
          message: ''
        });
      }, 3000);
    }, 1500);
  };

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
              Learning Programs
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tight">
              <span className="text-white block mb-2 drop-shadow-2xl">Choose Your</span>
              <span className="text-shimmer">Learning Path</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              From simulation-based learning to hands-on robotics with hardware kits. Find the perfect program for your journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Button variant="primary" size="lg" className="rounded-2xl px-10 py-5 h-auto border-none shadow-2xl shadow-accent-500/10">
                <span className="relative z-10">Explore Student Courses</span>
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-10 py-5 h-auto border-white/20 text-white hover:text-primary-900">
                <span className="relative z-10">School Programs</span>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Student Courses Section */}
      <Section background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Individual Students
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                <span className="text-accent-500">Student</span> Courses
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                Flexible learning options designed for individual students. Choose between simulation-based or hands-on learning with hardware kits.
              </p>
            </ScrollReveal>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* Simulation-Based Course */}
            <ScrollReveal>
              <Card variant="elevated" className="p-10 md:p-12 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/[0.02] relative overflow-hidden">
                {/* Popular Badge */}
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-accent-500 rounded-full">
                  <span className="text-primary-900 font-black text-xs tracking-widest uppercase">Most Popular</span>
                </div>

                <div className="inline-flex p-5 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                  <Monitor size={48} />
                </div>

                <h3 className="text-3xl md:text-4xl font-heading font-black text-accent-500 mb-4">
                  Simulation-Based Robotics & AI
                </h3>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl md:text-6xl font-heading font-black text-shimmer">₹3,500</span>
                    <span className="text-white/40 font-bold text-lg">/course</span>
                  </div>
                  <p className="text-white/60 font-medium">Complete online simulation-based learning</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Video size={14} className="text-accent-500" />
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">Mode: Online / Simulation-First</div>
                      <div className="text-white/60 text-sm font-medium">Learn from anywhere with virtual robotics platform</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Lightbulb size={14} className="text-accent-500" />
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">Focus: Concepts, Logic, Systems Thinking</div>
                      <div className="text-white/60 text-sm font-medium">Master fundamentals through high-fidelity simulations</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mb-8">
                  <div className="text-xs font-black text-white/40 tracking-widest uppercase mb-4">What's Included</div>
                  <ul className="space-y-3">
                    {[
                      'Access to virtual robotics lab',
                      'Project-based curriculum (Grades 1-12)',
                      'Weekly live sessions with instructors',
                      'Unlimited simulation practice',
                      'Progress tracking dashboard',
                      'Certificate upon completion'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
                        <span className="text-white/70 font-medium text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full rounded-2xl font-black tracking-widest uppercase text-xs border-none shadow-2xl shadow-accent-500/20"
                  onClick={() => openRegistration('simulation')}
                >
                  Register Interest
                </Button>
              </Card>
            </ScrollReveal>

            {/* Hardware Kit Course */}
            <ScrollReveal delay={0.2}>
              <Card variant="elevated" className="p-10 md:p-12 group h-full border-accent-500/30 hover:border-accent-500/50 transition-all duration-500 bg-gradient-to-br from-accent-500/5 to-primary-600/30 relative overflow-hidden">
                {/* Premium Badge */}
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-gradient-to-r from-accent-600 to-accent-500 rounded-full">
                  <span className="text-primary-900 font-black text-xs tracking-widest uppercase">Premium</span>
                </div>

                <div className="inline-flex p-5 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                  <Package size={48} />
                </div>

                <h3 className="text-3xl md:text-4xl font-heading font-black text-accent-500 mb-4">
                  Robotics & AI with Hardware Kits
                </h3>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl md:text-6xl font-heading font-black text-shimmer">₹8,000</span>
                    <span className="text-white/40 font-bold text-lg">/course</span>
                  </div>
                  <p className="text-white/60 font-medium">Simulation + Physical robotics kits delivered home</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Home size={14} className="text-accent-500" />
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">Includes: Kits Delivered to Home</div>
                      <div className="text-white/60 text-sm font-medium">Complete robotics kit shipped to your doorstep</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu size={14} className="text-accent-500" />
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">Focus: Hands-On Building After Simulation</div>
                      <div className="text-white/60 text-sm font-medium">Apply concepts with real hardware components</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mb-8">
                  <div className="text-xs font-black text-white/40 tracking-widest uppercase mb-4">What's Included</div>
                  <ul className="space-y-3">
                    {[
                      'Everything in Simulation course',
                      'Physical robotics kit (shipped)',
                      'Sensors, motors, and components',
                      'Hands-on project assignments',
                      'Hardware troubleshooting support',
                      'Build portfolio of real robots'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
                        <span className="text-white/70 font-medium text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full rounded-2xl font-black tracking-widest uppercase text-xs border-none shadow-2xl shadow-accent-500/20"
                  onClick={() => openRegistration('hardware')}
                >
                  Register Interest
                </Button>
              </Card>
            </ScrollReveal>
          </div>

          {/* Comparison Table */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-12 bg-white/[0.02] border-white/10">
              <h3 className="text-3xl font-heading font-black text-center text-accent-500 mb-12">Course Comparison</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-white/60 font-bold text-sm uppercase tracking-wider">Feature</th>
                      <th className="text-center py-4 px-4 text-accent-500 font-black text-sm uppercase tracking-wider">Simulation-Based<br/>₹3,500</th>
                      <th className="text-center py-4 px-4 text-accent-500 font-black text-sm uppercase tracking-wider">With Hardware<br/>₹8,000</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Virtual Robotics Lab', sim: true, hw: true },
                      { feature: 'Live Instructor Sessions', sim: true, hw: true },
                      { feature: 'Project-Based Learning', sim: true, hw: true },
                      { feature: 'Physical Robotics Kit', sim: false, hw: true },
                      { feature: 'Hardware Components', sim: false, hw: true },
                      { feature: 'Hands-On Building', sim: false, hw: true },
                      { feature: 'Certificate', sim: true, hw: true }
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 text-white/70 font-medium">{row.feature}</td>
                        <td className="py-4 px-4 text-center">
                          {row.sim ? (
                            <CheckCircle2 className="inline-block text-accent-500" size={20} />
                          ) : (
                            <span className="text-white/20">—</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {row.hw ? (
                            <CheckCircle2 className="inline-block text-accent-500" size={20} />
                          ) : (
                            <span className="text-white/20">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Program Structure Section */}
      <Section background="darker" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" style={{ animationDirection: 'reverse' }} />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                How It Works
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                Program <span className="text-accent-500">Structure</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                A structured, project-based approach that ensures continuous learning and real-world application.
              </p>
            </ScrollReveal>
          </div>

          {/* Structure Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                icon: <Calendar size={40} />,
                title: 'Weekly Hands-On Sessions',
                description: 'Each week, students engage in hands-on sessions, allowing them to directly apply their skills and knowledge in robotics.'
              },
              {
                icon: <Target size={40} />,
                title: 'Project-Based Learning',
                description: 'The program emphasizes project-based learning, where students work on real-world challenges to enhance their understanding and creativity.'
              },
              {
                icon: <BookOpen size={40} />,
                title: 'Structured Lessons',
                description: 'Structured lessons provide a clear framework, ensuring that students grasp essential concepts and techniques in robotics.'
              },
              {
                icon: <TrendingUp size={40} />,
                title: 'Regular Assessments',
                description: 'Regular assessments help track progress and identify areas for improvement, ensuring continuous learning and development.'
              }
            ].map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" className="p-8 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/[0.02]">
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                    {step.icon}
                  </div>
                  <div className="text-xs font-black text-accent-500 tracking-[0.2em] uppercase mb-3">Step {index + 1}</div>
                  <h3 className="text-xl font-heading font-black text-white mb-4">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed font-medium text-sm">{step.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Final Exhibition */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-gradient-to-br from-accent-500/10 to-primary-600/50 border-accent-500/20 text-center">
              <div className="inline-flex p-6 bg-accent-500/10 rounded-3xl mb-8 border border-accent-500/20 shadow-xl shadow-accent-500/5">
                <Award size={56} className="text-accent-500" />
              </div>
              <h3 className="text-3xl md:text-5xl font-heading font-black text-shimmer mb-6 tracking-tighter">
                Final Exhibition
              </h3>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
                At the end of the program, students participate in exhibitions to showcase their projects, demonstrating their accomplishments and innovations.
              </p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { icon: <Users size={24} />, label: 'Present to Peers' },
                  { icon: <Award size={24} />, label: 'Earn Recognition' },
                  { icon: <Zap size={24} />, label: 'Build Portfolio' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-14 h-14 rounded-full bg-accent-500/20 border-2 border-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="text-accent-500">{item.icon}</div>
                    </div>
                    <span className="text-white font-bold text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* School Programs Section */}
      <Section background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                  For Institutions
                </div>
                <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 leading-tight tracking-tighter">
                  <span className="text-accent-500">School</span> Programs
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed mb-8">
                  Comprehensive robotics & AI curriculum designed for institutional deployment. Fully aligned with CBSE & ICSE standards.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    'Complete Grades 1–12 curriculum',
                    'Teacher training & support',
                    'Simulation + hardware options',
                    'Assessment & tracking tools',
                    'Implementation support'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent-500 shrink-0 mt-0.5" />
                      <span className="text-white/70 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="rounded-2xl px-10 font-black tracking-widest uppercase text-xs border-none shadow-2xl shadow-accent-500/20"
                  >
                    Request Information
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-2xl px-10 text-white hover:text-primary-900 font-black tracking-widest uppercase text-xs"
                  >
                    View School Page
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card variant="elevated" className="p-10 md:p-12 bg-white/[0.02] border-white/10">
                <div className="text-center mb-8">
                  <School size={64} className="text-accent-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-heading font-black text-white mb-4">Institutional Pricing</h3>
                  <p className="text-white/60 font-medium">Custom packages based on your school's needs</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-primary-600/50 p-6 rounded-2xl border border-white/10">
                    <div className="text-sm font-black text-accent-400 tracking-widest uppercase mb-2">Inquiry Only</div>
                    <p className="text-white/70 font-medium text-sm">
                      School programs are customized based on student count, grade levels, and implementation requirements. Contact us for a detailed proposal.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Custom Pricing', value: 'Based on needs' },
                      { label: 'Flexible Plans', value: 'Simulation/Hardware' }
                    ].map((item, i) => (
                      <div key={i} className="bg-primary-600/30 p-4 rounded-xl border border-white/5 text-center">
                        <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">{item.label}</div>
                        <div className="text-white font-bold text-sm">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistration && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-primary-500 border border-accent-500/30 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowRegistration(false)}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-20 bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                <X size={24} />
              </button>

              {/* Progress Sidebar/Header */}
              <div className="bg-primary-600/50 border-b border-white/5 p-8 md:px-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-heading font-black text-white">Program Registration</h2>
                    <p className="text-accent-400 text-sm font-bold tracking-widest uppercase mt-1">
                      {formData.programType === 'simulation' ? 'Simulation Course' : 'Hardware Kit Course'}
                    </p>
                  </div>
                  
                  {/* Steps indicator */}
                  <div className="flex items-center gap-4">
                    {[
                      { num: 1, label: 'Details' },
                      { num: 2, label: 'Teacher' },
                      { num: 3, label: 'Review' }
                    ].map((step, idx) => (
                      <div key={step.num} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all duration-500 ${
                          currentStep === step.num 
                            ? 'bg-accent-500 text-primary-900 shadow-[0_0_20px_rgba(184,134,11,0.4)] scale-110' 
                            : currentStep > step.num 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white/10 text-white/40'
                        }`}>
                          {currentStep > step.num ? <Check size={20} /> : step.num}
                        </div>
                        <span className={`text-[10px] mt-2 font-bold uppercase tracking-tighter ${
                          currentStep === step.num ? 'text-accent-500' : 'text-white/40'
                        }`}>
                          {step.label}
                        </span>
                        {idx < 2 && <div className={`w-12 h-px mb-6 mx-2 ${currentStep > step.num ? 'bg-green-500' : 'bg-white/10'}`} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12">
                {submitSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-24 h-24 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-4xl font-heading font-black text-white mb-4">You're Registered!</h2>
                    <p className="text-white/60 text-lg max-w-md mx-auto">
                      We've received your interest. Our team will contact you shortly with the next steps.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Step 1: Student & Parent Details */}
                    {currentStep === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Student Name *</label>
                            <input name="studentName" value={formData.studentName} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-500 focus:outline-none transition-all" placeholder="Legal full name" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Parent/Guardian Name *</label>
                            <input name="parentName" value={formData.parentName} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-500 focus:outline-none transition-all" placeholder="Parent name" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Email Address *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-500 focus:outline-none transition-all" placeholder="email@example.com" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Phone Number *</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-500 focus:outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Current Grade *</label>
                            <select name="grade" value={formData.grade} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-500 focus:outline-none transition-all appearance-none">
                              <option value="" className="bg-primary-500">Select Grade</option>
                              {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1} className="bg-primary-500 text-white">Grade {i + 1}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">City *</label>
                            <input name="city" value={formData.city} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-500 focus:outline-none transition-all" placeholder="Your City" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Teacher Selection (Blank/Placeholder) */}
                    {currentStep === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center py-10 space-y-6">
                        <div className="w-20 h-20 bg-accent-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-accent-500/20">
                          <GraduationCap size={40} className="text-accent-500" />
                        </div>
                        <h3 className="text-2xl font-heading font-black text-white">Teacher Selection Coming Soon</h3>
                        <p className="text-white/60 max-w-sm mx-auto">
                          We are hand-picking the best educators for our individual programs. You will be able to select your preferred teacher during the onboarding phase.
                        </p>
                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 inline-block">
                          <p className="text-accent-400 font-bold text-sm tracking-widest uppercase">Currently In Development</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Summary/Quote */}
                    {currentStep === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 blur-[50px] group-hover:bg-accent-500/20 transition-all duration-1000" />
                          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-accent-500 rounded-2xl flex items-center justify-center">
                                  {formData.programType === 'simulation' ? <Monitor className="text-primary-900" size={24} /> : <Package className="text-primary-900" size={24} />}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-heading font-black text-white leading-tight">
                                  {formData.programType === 'simulation' ? 'Simulation Course' : 'Hardware Kit Course'}
                                </h3>
                              </div>
                              <p className="text-white/40 font-medium">For Grade {formData.grade} student</p>
                            </div>
                            <div className="text-left md:text-right">
                              <div className="text-[3.5rem] md:text-[4.5rem] font-heading font-black text-shimmer leading-none">
                                ₹{formData.estimatedQuote.toLocaleString('en-IN')}
                              </div>
                              <p className="text-accent-500 font-black tracking-[0.2em] uppercase text-xs mt-2">One-Time Payment</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest block mb-1">Student Details</span>
                            <p className="text-white font-bold">{formData.studentName}</p>
                            <p className="text-white/60 text-xs">{formData.email}</p>
                          </div>
                          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest block mb-1">Location</span>
                            <p className="text-white font-bold">{formData.city}, {formData.state}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Additional Notes (Optional)</label>
                          <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-accent-500 focus:outline-none transition-all resize-none" placeholder="Special requirements or questions..." />
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <Button type="button" onClick={handlePrevStep} disabled={currentStep === 1 || isSubmitting} variant="outline" className={`rounded-xl px-8 h-14 font-black ${currentStep === 1 ? 'opacity-0' : 'opacity-100'}`}>
                        <ChevronLeft className="mr-2" size={20} />
                        Back
                      </Button>
                      
                      {currentStep < 3 ? (
                        <Button type="button" onClick={handleNextStep} variant="primary" className="rounded-2xl px-12 h-14 font-black tracking-widest uppercase text-xs shadow-xl shadow-accent-500/20">
                          Continue
                          <ChevronRight className="ml-2" size={20} />
                        </Button>
                      ) : (
                        <Button type="submit" disabled={isSubmitting} variant="primary" className="rounded-2xl px-12 h-14 font-black tracking-widest uppercase text-xs shadow-xl shadow-accent-500/20 group relative overflow-hidden">
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <Zap size={16} className="animate-spin text-primary-900" />
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2 relative z-10 text-primary-900 font-bold">
                              Confirm Registration
                              <Zap size={16} fill="currentColor" />
                            </span>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
