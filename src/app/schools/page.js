'use client';

import { useRef, useState } from 'react';
import { ArrowRight, School, BookOpen, Users, Award, CheckCircle2, Target, Lightbulb, Cpu, GraduationCap, FileText, Headphones, TrendingUp, Shield, Zap, RefreshCw, Clock, Globe, Settings, ChevronRight, ChevronLeft, MapPin, Building, Mail, Phone, User, X, Check, DollarSign, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CURRICULUM_LEVELS } from '@/lib/constants';
import { getAllTrainers } from '@/data/trainers';
import TrainerVideos from '@/components/trainers/TrainerVideos';
import { CheckTrainersCTA } from '@/components/ui/CheckTrainersCTA';
import { Badge } from '@/components/ui/Badge';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onCancel}
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-linear-to-br from-primary-500 to-primary-600 border border-white/10 rounded-4xl p-8 max-w-sm w-full shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 blur-[50px]" />
          <h3 className="text-2xl font-heading font-black text-white mb-4 relative z-10">{title}</h3>
          <p className="text-white/60 font-medium mb-8 relative z-10">{message}</p>
          <div className="flex gap-4 relative z-10">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-6 rounded-xl font-bold text-sm bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10 transition-all"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-3 px-6 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg ${
                type === 'danger' 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
                : 'bg-accent-500 hover:bg-accent-400 text-primary-900 shadow-accent-500/20'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

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

const GRADE_RATES = {
  '1': 1200, '2': 1200, '3': 1300, '4': 1400, '5': 1500, '6': 1600,
  '7': 1800, '8': 1800, '9': 2000, '10': 2000, '11': 2400, '12': 2400
};
const TRAINER_FLAT_FEE = 500000;
const APPROX_RATE = 1800;

export default function SchoolsPage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showTrainerDetail, setShowTrainerDetail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(false);

  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    board: '',
    pricingMode: 'approximate',
    totalStudents: '',
    gradesData: [{ grade: '', students: '' }],
    selectedTrainerId: null,
    selectedTrainer: null,
    estimatedQuote: 0,
    message: ''
  });

  const updateQuote = (newData) => {
    let baseQuote = 0;
    if (newData.pricingMode === 'approximate') {
      baseQuote = (parseInt(newData.totalStudents) || 0) * APPROX_RATE;
    } else {
      baseQuote = newData.gradesData.reduce((sum, item) => {
        const rate = GRADE_RATES[item.grade] || 0;
        return sum + (rate * (parseInt(item.students) || 0));
      }, 0);
    }
    const trainerCost = newData.selectedTrainerId ? TRAINER_FLAT_FEE : 0;
    return baseQuote + trainerCost;
  };

  const handleGradeDataChange = (index, field, value) => {
    setFormData(prev => {
      const newGradesData = [...prev.gradesData];
      newGradesData[index] = { ...newGradesData[index], [field]: value };
      const updated = { ...prev, gradesData: newGradesData };
      updated.estimatedQuote = updateQuote(updated);
      return updated;
    });
  };

  const addGradeEntry = () => {
    setFormData(prev => ({
      ...prev,
      gradesData: [...prev.gradesData, { grade: '', students: '' }]
    }));
  };

  const removeGradeEntry = (index) => {
    setFormData(prev => {
      if (prev.gradesData.length === 1) return prev;
      const newGradesData = prev.gradesData.filter((_, i) => i !== index);
      const updated = { ...prev, gradesData: newGradesData };
      updated.estimatedQuote = updateQuote(updated);
      return updated;
    });
  };

  const trainers = getAllTrainers();

  const handleTrainerSelect = (trainer) => {
    setFormData(prev => {
      const isSelected = prev.selectedTrainerId === trainer.id;
      const updated = {
        ...prev,
        selectedTrainerId: isSelected ? null : trainer.id,
        selectedTrainer: isSelected ? null : trainer
      };
      updated.estimatedQuote = updateQuote(updated);
      return updated;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'pricingMode' || name === 'totalStudents') {
        updated.estimatedQuote = updateQuote(updated);
      }
      return updated;
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const requiredFields = ['schoolName', 'contactPerson', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'board'];
      const isValid = requiredFields.every(field => formData[field]);
      
      if (!isValid) {
        alert('Please fill in all required fields');
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.selectedTrainerId) {
        alert('Please select a trainer');
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleCloseModal = () => {
    if (submitSuccess) {
      setShowRegistration(false);
      setSubmitSuccess(false);
      return;
    }
    
    const hasData = formData.schoolName || formData.contactPerson || formData.email || formData.selectedTrainerId;
    
    if (hasData) {
      setConfirmAction(() => () => {
        setShowRegistration(false);
        setCurrentStep(1);
        setFormData({
          schoolName: '',
          contactPerson: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          board: '',
          pricingMode: 'approximate',
          totalStudents: '',
          gradesData: [{ grade: '', students: '' }],
          selectedTrainerId: null,
          selectedTrainer: null,
          estimatedQuote: 0,
          message: ''
        });
        setAppliedDiscount(false);
        setShowConfirmModal(false);
      });
      setShowConfirmModal(true);
    } else {
      setShowRegistration(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!window.confirm('Are you sure you want to submit this request?')) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/school-registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setShowRegistration(false);
          setCurrentStep(1);
          setFormData({
            schoolName: '',
            contactPerson: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            board: '',
            totalStudents: '',
            gradesData: [{ grade: '', students: '' }],
            selectedTrainerId: null,
            selectedTrainer: null,
            estimatedQuote: 0,
            message: ''
          });
          setAppliedDiscount(false);
          setSubmitSuccess(false);
        }, 3000);
      } else {
        alert('Error submitting registration: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <Section spacing="md" className="relative pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-32 min-h-[70vh] flex items-center justify-center overflow-hidden bg-linear-to-b from-primary-400 via-primary-400 to-primary-500">
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-primary-500/80 pointer-events-none" />
        
        <div className="absolute top-20 -right-20 w-125 h-125 bg-accent-500/10 rounded-full blur-[120px] floating pointer-events-none" />
        <div className="absolute bottom-40 -left-20 w-100 h-100 bg-primary-300/15 rounded-full blur-[100px] floating pointer-events-none" style={{ animationDelay: '-3s' }} />

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
              Institutional Programs
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tight">
              <span className="text-white block mb-2 drop-shadow-2xl">Transform Your School&apos;s</span>
              <span className="text-shimmer">STEM Education</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              Premium robotics & AI curriculum for forward-thinking institutions. Fully aligned with CBSE & ICSE standards, designed for Grades 1–12.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto rounded-2xl px-10 py-5 h-auto border-none shadow-2xl shadow-accent-500/10"
                onClick={() => setShowRegistration(true)}
              >
                <span className="relative z-10">Request Curriculum</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto rounded-2xl px-10 py-5 h-auto border-white/20 text-white hover:text-primary-900"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10">Get In Touch</span>
              </Button>
            </div>
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              {[
                { icon: <Shield size={24} />, text: 'CBSE & ICSE Aligned' },
                { icon: <Award size={24} />, text: 'NEP 2020 Compliant' },
                { icon: <Users size={24} />, text: 'Trusted by Schools' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/60">
                  <div className="text-accent-500">{item.icon}</div>
                  <span className="text-sm font-bold tracking-wide">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* What Schools Get Section */}
      <Section id="benefits" background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Complete Solution
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                What Your <span className="text-accent-500">School Gets</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                A comprehensive, turnkey robotics & AI program designed for seamless institutional integration.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <BookOpen size={40} />,
                title: 'Complete Curriculum',
                features: [
                  'Grades 1–12 syllabus-mapped content',
                  '120+ project-based modules',
                  'Theme-based learning progression',
                  'Digital & print teacher manuals'
                ]
              },
              {
                icon: <Cpu size={40} />,
                title: 'Robotics Kits & Software',
                features: [
                  'Simulation-based learning platform',
                  'Optional hardware robotics kits',
                  'Cloud-based student dashboard',
                  'Lifetime software updates'
                ]
              },
              {
                icon: <Users size={40} />,
                title: 'Teacher Training',
                features: [
                  'Comprehensive onboarding program',
                  'Quarterly professional development',
                  'Dedicated training portal access',
                  'Certification upon completion'
                ]
              },
              {
                icon: <Headphones size={40} />,
                title: 'Ongoing Support',
                features: [
                  'Dedicated account manager',
                  'Technical support helpdesk',
                  'Regular curriculum updates',
                  'Community forum access'
                ]
              },
              {
                icon: <FileText size={40} />,
                title: 'Assessment Tools',
                features: [
                  'Project rubrics & grading guides',
                  'Automated skill tracking',
                  'Progress reports for parents',
                  'Internal assessment ready'
                ]
              },
              {
                icon: <Award size={40} />,
                title: 'Certification & Recognition',
                features: [
                  'Student completion certificates',
                  'School partnership badge',
                  'Annual innovation showcase',
                  'National competition access'
                ]
              }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" className="p-8 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/2">
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-black text-accent-500 mb-6">{item.title}</h3>
                  <ul className="space-y-3">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
                        <span className="text-white/70 font-medium text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Value Proposition */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-linear-to-br from-accent-500/10 to-primary-600/50 border-accent-500/20">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-heading font-black text-accent-500 mb-4">One Curriculum, Complete Solution</h3>
                <p className="text-white/60 text-lg">Everything your school needs to launch a world-class robotics program</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '120+', label: 'Projects' },
                  { value: '5', label: 'Learning Levels' },
                  { value: '12', label: 'Grades Covered' },
                  { value: '100%', label: 'Board Aligned' }
                ].map((stat, i) => (
                  <div key={i} className="text-center group cursor-default">
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

      {/* Academic Alignment Section */}
      <Section id="curriculum" background="darker" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" style={{ animationDirection: 'reverse' }} />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                Curriculum Integration
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                <span className="text-accent-500">Academic</span> Alignment
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                Seamlessly integrated with your existing curriculum. Every robotics project maps directly to textbook chapters.
              </p>
            </ScrollReveal>
          </div>

          {/* Board Alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <ScrollReveal>
              <Card variant="elevated" className="p-10 md:p-12 bg-white/2 border-white/10 hover:border-accent-500/30 transition-all duration-500">
                <div className="flex items-start gap-6 mb-8">
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 shrink-0">
                    <Target size={40} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading font-black text-accent-500 mb-3">CBSE Alignment</h3>
                    <p className="text-white/60 font-medium">Fully mapped to CBSE Skill Subject guidelines</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {[
                    'Skill Subject: Artificial Intelligence & Robotics',
                    'Aligned with Coding & Computational Thinking standards',
                    'NEP 2020 compliant experiential learning',
                    'Supports Science, Math, and Computer Science curricula',
                    'Internal assessment & project work ready'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
                      <span className="text-white/70 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card variant="elevated" className="p-10 md:p-12 bg-white/2 border-white/10 hover:border-accent-500/30 transition-all duration-500">
                <div className="flex items-start gap-6 mb-8">
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 shrink-0">
                    <Target size={40} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading font-black text-accent-500 mb-3">ICSE Alignment</h3>
                    <p className="text-white/60 font-medium">Integrated with ICSE Computer Applications syllabus</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {[
                    'Computer Applications syllabus integration',
                    'Project work & practical requirements covered',
                    'Supports Science & Mathematics curricula',
                    'Internal assessment documentation provided',
                    'Practical skills development focus'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-accent-500 shrink-0 mt-0.5" />
                      <span className="text-white/70 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          </div>

          {/* Chapter-to-Project Mapping */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-linear-to-br from-accent-500/5 to-primary-600/30 border-accent-500/20">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-heading font-black text-accent-500 mb-4">One Chapter → One Project</h3>
                <p className="text-white/60 text-lg">Direct mapping between textbook concepts and hands-on robotics projects</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    subject: 'Science',
                    chapter: 'Chapter: Motion & Forces',
                    project: 'Project: Build a Self-Balancing Robot',
                    skills: 'Apply Newton\'s laws in real-time'
                  },
                  {
                    subject: 'Mathematics',
                    chapter: 'Chapter: Coordinate Geometry',
                    project: 'Project: Program Path Navigation',
                    skills: 'Use coordinates for robot movement'
                  },
                  {
                    subject: 'Computer Science',
                    chapter: 'Chapter: Loops & Conditionals',
                    project: 'Project: Obstacle Avoidance Bot',
                    skills: 'Implement control structures'
                  }
                ].map((example, i) => (
                  <div key={i} className="bg-primary-600/50 p-6 rounded-2xl border border-white/10 hover:border-accent-500/30 transition-all group">
                    <div className="text-xs font-black text-accent-400 tracking-widest uppercase mb-3">{example.subject}</div>
                    <div className="mb-4">
                      <div className="text-sm text-white/50 font-medium mb-1">Textbook</div>
                      <div className="text-white font-bold">{example.chapter}</div>
                    </div>
                    <ArrowRight className="text-accent-500 mb-4" size={20} />
                    <div className="mb-4">
                      <div className="text-sm text-white/50 font-medium mb-1">Robotics</div>
                      <div className="text-white font-bold">{example.project}</div>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs text-white/60 font-medium">{example.skills}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>

          {/* Grade Progression */}
          <div className="mt-20">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-4">Grades 1–12 Progression</h3>
                <p className="text-white/60 text-lg">Structured learning path across all secondary grades</p>
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              {CURRICULUM_LEVELS.map((level, index) => (
                <ScrollReveal key={level.id} delay={index * 0.05}>
                  <Card variant="elevated" className="p-6 md:p-8 group hover:border-accent-500/30 transition-all duration-500 bg-white/2 border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-1 flex justify-center md:justify-start">
                        <div className="w-12 h-12 rounded-full bg-accent-500/20 border-2 border-accent-500 flex items-center justify-center">
                          <span className="text-lg font-heading font-black text-accent-500">{level.id}</span>
                        </div>
                      </div>
                      <div className="md:col-span-3 text-center md:text-left">
                        <h4 className="text-xl font-heading font-black text-accent-500 mb-1">{level.name}</h4>
                        {/* <p className="text-white/40 text-sm font-medium">Grades {level.grade}</p> */}
                        <p className="text-white/30 text-[9px] font-medium italic">Grades with levels to be added soon</p>
                      </div>
                      <div className="md:col-span-5">
                        <p className="text-white/70 font-medium text-sm">{level.description}</p>
                      </div>
                      <div className="md:col-span-3 text-center md:text-right">
                        <div className="inline-flex px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full">
                          <span className="text-accent-400 font-bold text-xs tracking-widest uppercase">{level.theme}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Implementation Support Section */}
      <Section id="support" background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Partnership Support
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-10 leading-[0.9] tracking-tighter">
                Implementation <span className="text-accent-500">Support</span>
              </h2>
              <div className="h-px w-20 bg-accent-500 mx-auto mb-10 opacity-30" />
              <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                White-glove implementation support from planning to launch and beyond.
              </p>
            </ScrollReveal>
          </div>

          {/* Implementation Timeline */}
          <ScrollReveal>
            <Card variant="elevated" className="p-10 md:p-16 bg-white/2 border-white/10 mb-20">
              <h3 className="text-3xl font-heading font-black text-center text-accent-500 mb-12">Implementation Timeline</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    phase: 'Week 1-2',
                    title: 'Planning & Setup',
                    icon: <Settings size={32} />,
                    tasks: ['Curriculum customization', 'Infrastructure assessment', 'Teacher identification']
                  },
                  {
                    phase: 'Week 3-4',
                    title: 'Teacher Training',
                    icon: <GraduationCap size={32} />,
                    tasks: ['Intensive onboarding', 'Platform familiarization', 'Project walkthroughs']
                  },
                  {
                    phase: 'Week 5-6',
                    title: 'Pilot Launch',
                    icon: <Zap size={32} />,
                    tasks: ['Select grade rollout', 'Real-time support', 'Feedback collection']
                  },
                  {
                    phase: 'Week 7+',
                    title: 'Full Deployment',
                    icon: <TrendingUp size={32} />,
                    tasks: ['All grades live', 'Ongoing training', 'Quarterly reviews']
                  }
                ].map((step, i) => (
                  <div key={i} className="text-center group">
                    <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-4 group-hover:bg-accent-600 group-hover:text-primary-900 transition-all duration-500">
                      {step.icon}
                    </div>
                    <div className="text-xs font-black text-accent-500 tracking-widest uppercase mb-2">{step.phase}</div>
                    <h4 className="text-xl font-heading font-black text-white mb-4">{step.title}</h4>
                    <ul className="space-y-2 text-left">
                      {step.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-accent-500 shrink-0 mt-1" />
                          <span className="text-white/60 text-sm font-medium">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollReveal>

          {/* Support Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={32} />,
                title: 'Dedicated Account Manager',
                description: 'Single point of contact for all your needs, from setup to ongoing support.'
              },
              {
                icon: <Headphones size={32} />,
                title: 'Technical Helpdesk',
                description: 'Email and phone support for teachers and administrators during school hours.'
              },
              {
                icon: <Globe size={32} />,
                title: 'Online Training Portal',
                description: 'On-demand video tutorials, webinars, and resource library for teachers.'
              },
              {
                icon: <FileText size={32} />,
                title: 'Curriculum Updates',
                description: 'Regular content updates aligned with latest board guidelines and tech trends.'
              },
              {
                icon: <Clock size={32} />,
                title: 'Quarterly Reviews',
                description: 'Performance analytics, teacher feedback sessions, and improvement planning.'
              },
              {
                icon: <Award size={32} />,
                title: 'Recognition Programs',
                description: 'Annual innovation showcases, student competitions, and achievement certificates.'
              }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <Card variant="elevated" className="p-8 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/2">
                  <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-heading font-black text-white mb-4">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed font-medium text-sm">{feature.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trainers CTA */}
      <CheckTrainersCTA />

      {/* CTA Section */}
      <Section id="contact" background="darker" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.05)_0%,transparent_70%)] animate-slow-zoom" />
        
        <Container className="relative z-10 text-center">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto py-20 px-6 bg-white/2 border border-white/10 rounded-[3rem] backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-500/20 transition-all duration-1000" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                  Direct Partnership
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-8 leading-tight tracking-tighter">
                  Ready to <span className="text-shimmer">Transform</span> Your School?
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12">
                  Join our elite network of partner institutions. Our team will guide you through every step of implementation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="rounded-2xl px-12 py-5 h-auto font-black tracking-widest uppercase text-xs border-none shadow-2xl shadow-accent-500/20 w-full sm:w-auto"
                    onClick={() => setShowRegistration(true)}
                  >
                    Partner With Us
                  </Button>
                  <div className="flex items-center gap-6">
                    <a href="mailto:schools@robovedanta.com" className="flex items-center gap-2 text-white/60 hover:text-accent-400 font-bold transition-all group">
                      <Mail size={18} className="group-hover:scale-110 transition-transform" />
                      <span>Email Us</span>
                    </a>
                    <div className="w-px h-4 bg-white/10" />
                    <a href="tel:+911234567890" className="flex items-center gap-2 text-white/60 hover:text-accent-400 font-bold transition-all group">
                      <Phone size={18} className="group-hover:scale-110 transition-transform" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Registration Modal */}
      {showRegistration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-end sm:items-center justify-center sm:p-6 lg:p-8"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-primary-950/98">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,134,11,0.1),transparent_70%)]" />
            <div className="absolute inset-0 backdrop-blur-md" />
          </div>

          {/* Modal Card - Mobile: Bottom Sheet, Desktop: Centered */}
          <motion.div
            initial={{ scale: 0.9, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 100 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full sm:max-w-5xl bg-primary-900/98 backdrop-blur-xl sm:rounded-4xl rounded-t-4xl shadow-2xl border-t border-x sm:border border-accent-500/30 overflow-hidden flex flex-col will-change-transform"
            style={{ 
              maxHeight: 'calc(100vh - 2rem)',
              height: 'auto',
              minHeight: '70vh'
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-accent-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            {/* Mobile Handle Bar */}
            <div className="sm:hidden flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/60 hover:text-white transition-all duration-200 group"
              aria-label="Close modal"
            >
              <X size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Header (Fixed) - Mobile Optimized */}
            <div className="relative px-4 sm:px-8 pt-4 sm:pt-10 pb-4 sm:pb-6 shrink-0 border-b border-white/5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl sm:text-3xl font-heading font-black text-white mb-1 sm:mb-2">
                  School Partnership
                </h2>
                <p className="text-accent-400 text-[10px] sm:text-sm font-bold tracking-widest uppercase">
                  🏫 Institutional Registration
                </p>
              </motion.div>
              
              {/* Progress Steps - Mobile: Compact, Desktop: Full */}
              <div className="mt-4 sm:mt-8 flex items-center justify-between max-w-md mx-auto">
                {[
                  { num: 1, label: 'Details', icon: '📝' },
                  { num: 2, label: 'Trainer', icon: '👨‍🏫' },
                  { num: 3, label: 'Budget', icon: '💰' },
                  { num: 4, label: 'Summary', icon: '📋' }
                ].map((step, idx) => (
                  <div key={step.num} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: currentStep === step.num ? 1.1 : 1,
                          opacity: currentStep >= step.num ? 1 : 0.5
                        }}
                        className={`relative w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xs sm:text-base font-black transition-all duration-300 ${
                          currentStep === step.num
                            ? 'bg-accent-500 text-primary-900 shadow-lg shadow-accent-500/50'
                            : currentStep > step.num
                            ? 'bg-accent-500/20 text-accent-400 border-2 border-accent-500/40'
                            : 'bg-white/5 text-white/40 border-2 border-white/10'
                        }`}
                      >
                        {currentStep > step.num ? <Check size={16} className="sm:w-5 sm:h-5" strokeWidth={3} /> : step.num}
                      </motion.div>
                      <span className={`mt-1 sm:mt-2 text-[8px] sm:text-[10px] font-bold uppercase tracking-wide hidden sm:block ${
                        currentStep === step.num ? 'text-accent-400' : 'text-white/40'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {idx < 3 && (
                      <div className={`h-0.5 flex-1 mx-0.5 sm:mx-2 transition-all duration-500 ${
                        currentStep > step.num ? 'bg-accent-500/60' : 'bg-white/10'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Area & Buttons Box */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              {submitSuccess ? (
                <div className="flex-1 px-4 sm:px-8 pb-8 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 sm:py-16"
                  >
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Check size={32} className="sm:w-12 sm:h-12 text-green-500" />
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-heading font-black text-white mb-2 sm:mb-4">Registration Successful!</h2>
                    <p className="text-white/70 text-sm sm:text-lg max-w-md mx-auto px-4">
                      Thank you for your interest. Our team will contact you within 24 hours.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <>
                  {/* Scrollable Body */}
                  <div className="flex-1 relative px-4 sm:px-8 pb-4 sm:pb-8 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="space-y-6 sm:space-y-8">
                      {/* Step 1: School Details */}
                      {currentStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4 sm:space-y-6 pt-2 sm:pt-4"
                        >
                          {/* Mobile: Compact Header, Desktop: Full */}
                          <div className="text-center mb-4 sm:mb-8">
                            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white mb-2 sm:mb-3">School Details</h2>
                            <p className="text-white/60 text-sm sm:text-base">Tell us about your institution</p>
                          </div>

                          {/* Mobile: Single Column, Desktop: Two Columns */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <label className="block text-white font-bold text-xs sm:text-sm mb-2 flex items-center gap-2">
                                <Building className="inline" size={14} />
                                School Name *
                              </label>
                              <input
                                type="text"
                                name="schoolName"
                                value={formData.schoolName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="Enter school name"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-xs sm:text-sm mb-2 flex items-center gap-2">
                                <User className="inline" size={14} />
                                Contact Person *
                              </label>
                              <input
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="Principal / Administrator"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-xs sm:text-sm mb-2 flex items-center gap-2">
                                <Mail className="inline" size={14} />
                                Email *
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="school@example.com"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-xs sm:text-sm mb-2 flex items-center gap-2">
                                <Phone className="inline" size={14} />
                                Phone *
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="+91 XXXXX XXXXX"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-white font-bold text-xs sm:text-sm mb-2 flex items-center gap-2">
                                <MapPin className="inline" size={14} />
                                Address *
                              </label>
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="Street address"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-xs sm:text-sm mb-2">City *</label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="City"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-xs sm:text-sm mb-2">State *</label>
                              <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="State"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-xs sm:text-sm mb-2">Pincode *</label>
                              <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white text-sm sm:text-base placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="PIN code"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-xs sm:text-sm mb-2">Board Affiliation *</label>
                              <select
                                name="board"
                                value={formData.board}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 sm:py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white text-sm sm:text-base focus:border-accent-500 focus:outline-none transition-colors"
                              >
                                <option value="">Select board</option>
                                <option value="CBSE">CBSE</option>
                                <option value="ICSE">ICSE</option>
                                <option value="State Board">State Board</option>
                                <option value="IB">IB</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Trainer Selection */}
                      {currentStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4 sm:space-y-6 pt-2 sm:pt-4"
                        >
                          {/* Mobile: Compact Header */}
                          <div className="text-center mb-4 sm:mb-8">
                            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white mb-2 sm:mb-3">Select Your Trainer</h2>
                            <p className="text-white/60 text-sm sm:text-base px-2">Choose exactly one expert educator (Premium Charge: ₹5,00,000)</p>
                            
                            {/* Selection Status - Mobile: Compact */}
                            <div className={`mt-3 sm:mt-4 inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border rounded-full transition-all text-xs sm:text-sm ${
                              formData.selectedTrainerId 
                                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                                : 'bg-accent-500/10 border-accent-500/30 text-accent-400'
                            }`}>
                              {formData.selectedTrainerId ? <CheckCircle2 size={16} className="sm:w-5 sm:h-5" /> : <Users size={16} className="sm:w-5 sm:h-5" />}
                              <span className="font-bold">
                                {formData.selectedTrainerId ? 'Trainer Selected' : 'No Trainer Selected'}
                              </span>
                            </div>
                          </div>

                          {/* Mobile: Single Column, Desktop: Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {trainers.map((trainer) => {
                              const isSelected = formData.selectedTrainerId === trainer.id;
                              
                              return (
                                <motion.div
                                  key={trainer.id}
                                  whileHover={{ y: -4 }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`group bg-primary-600/30 border-2 rounded-2xl p-4 sm:p-6 cursor-pointer transition-all active:scale-95 ${
                                    isSelected
                                      ? 'border-accent-500 bg-accent-500/10'
                                      : 'border-white/10 hover:border-accent-500/50'
                                  }`}
                                  onClick={() => handleTrainerSelect(trainer)}
                                >
                                  {/* Trainer Image - Mobile: Smaller */}
                                  <div className="relative w-full h-40 sm:h-48 bg-primary-600 rounded-xl mb-3 sm:mb-4 overflow-hidden border border-[#B8860B]/20">
                                    <img 
                                      src={trainer.imageUrl} 
                                      alt={trainer.name}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                      onError={(e) => {
                                        e.target.src = '/trainers/shresth.jpg';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 to-transparent opacity-60" />
                                    
                                    {/* Selection indicator */}
                                    <div className={`absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                                      isSelected 
                                        ? 'bg-accent-500 scale-100 shadow-lg shadow-accent-500/50' 
                                        : 'bg-black/50 backdrop-blur-md scale-90 border border-white/20 opacity-0 group-hover:opacity-100'
                                    }`}>
                                      {isSelected && <Check size={16} className="sm:w-5 sm:h-5 text-primary-900 font-black" />}
                                    </div>
                                    
                                    {trainer.featured && (
                                      <div className="absolute top-2 right-2 bg-linear-to-r from-accent-500 to-accent-600 text-primary-900 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        Featured
                                      </div>
                                    )}
                                  </div>

                                  <h3 className="text-lg sm:text-xl font-heading font-black text-white mb-1 group-hover:text-accent-500 transition-colors">{trainer.name}</h3>
                                  <p className="text-accent-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-3 sm:mb-4">{trainer.title}</p>

                                  {/* Qualifications - Mobile: Compact */}
                                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                                    <p className="text-[9px] sm:text-[10px] text-white/30 font-black uppercase tracking-widest">Key Qualifications</p>
                                    {trainer.qualifications.slice(0, 2).map((qual, idx) => (
                                      <div key={idx} className="flex items-start text-[10px] sm:text-[11px] text-white/70 bg-white/5 rounded-lg p-2 border border-white/5 leading-snug">
                                        <Award size={12} className="sm:w-3.5 sm:h-3.5 text-accent-500 mr-2 mt-0.5 shrink-0" />
                                        <span>{qual}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Footer - Mobile: Compact */}
                                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                      <Clock size={12} className="sm:w-3.5 sm:h-3.5 text-white/30" />
                                      <span className="text-white/60 text-[9px] sm:text-[10px] font-bold uppercase">{trainer.experience}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowTrainerDetail(trainer);
                                        }}
                                        className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-accent-500/10 text-accent-500 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-accent-500 hover:text-primary-900 active:scale-95 transition-all border border-accent-500/20"
                                      >
                                        Details
                                      </button>
                                    </div>
                                  </div>

                                  {isSelected && (
                                    <div className="mt-3 bg-accent-500/20 border border-accent-500 rounded-lg px-3 py-2 text-center">
                                      <Check size={14} className="sm:w-4 sm:h-4 inline text-accent-500 mr-2" />
                                      <span className="text-accent-500 text-xs sm:text-sm font-black">Selected</span>
                                    </div>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Budget Model */}
                      {currentStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6 sm:space-y-10 pt-2 sm:pt-4"
                        >
                          {/* Header - Mobile: Compact */}
                          <div className="text-center mb-6 sm:mb-10">
                            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-4 sm:mb-6">
                              <DollarSign size={10} className="sm:w-3 sm:h-3" />
                              Investment Planning
                            </div>
                            <h2 className="text-2xl sm:text-5xl font-heading font-black text-white mb-2 sm:mb-4 tracking-tight px-2">Budget Estimation</h2>
                            <p className="text-white/50 text-xs sm:text-sm font-medium max-w-2xl mx-auto px-4">Select your preferred calculation model</p>
                          </div>

                          {/* Mode Selection Cards - Mobile: Stack, Desktop: Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <motion.button
                              type="button"
                              onClick={() => handleChange({ target: { name: 'pricingMode', value: 'approximate' } })}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 text-left overflow-hidden group active:scale-95 ${
                                formData.pricingMode === 'approximate'
                                  ? 'border-accent-500 bg-accent-500/5 shadow-xl shadow-accent-500/10'
                                  : 'border-white/10 hover:border-white/20 bg-white/2'
                              }`}
                            >
                              {/* Decorative gradient */}
                              <div className={`absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 blur-[60px] transition-opacity duration-500 pointer-events-none ${
                                formData.pricingMode === 'approximate' ? 'opacity-100' : 'opacity-0'
                              }`} style={{ background: 'radial-gradient(circle, rgba(184,134,11,0.2) 0%, transparent 70%)' }} />
                              
                              <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4 sm:mb-6">
                                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                                    formData.pricingMode === 'approximate' 
                                      ? 'bg-accent-500 text-primary-900 shadow-lg shadow-accent-500/30' 
                                      : 'bg-white/5 text-white/60 group-hover:bg-white/10'
                                  }`}>
                                    <TrendingUp size={20} className="sm:w-7 sm:h-7" strokeWidth={2.5} />
                                  </div>
                                  {formData.pricingMode === 'approximate' && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="p-1.5 sm:p-2 rounded-full bg-accent-500/20"
                                    >
                                      <CheckCircle2 size={16} className="sm:w-5 sm:h-5 text-accent-500" />
                                    </motion.div>
                                  )}
                                </div>
                                
                                <h3 className="text-lg sm:text-2xl font-heading font-black text-white mb-2 sm:mb-3 tracking-tight">Quick Estimate</h3>
                                <p className="text-white/60 text-xs sm:text-sm font-medium leading-relaxed">
                                  Total student count calculation
                                </p>
                              </div>
                            </motion.button>

                            <motion.button
                              type="button"
                              onClick={() => handleChange({ target: { name: 'pricingMode', value: 'precise' } })}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 text-left overflow-hidden group active:scale-95 ${
                                formData.pricingMode === 'precise'
                                  ? 'border-accent-500 bg-accent-500/5 shadow-xl shadow-accent-500/10'
                                  : 'border-white/10 hover:border-white/20 bg-white/2'
                              }`}
                            >
                              {/* Decorative gradient */}
                              <div className={`absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 blur-[60px] transition-opacity duration-500 pointer-events-none ${
                                formData.pricingMode === 'precise' ? 'opacity-100' : 'opacity-0'
                              }`} style={{ background: 'radial-gradient(circle, rgba(184,134,11,0.2) 0%, transparent 70%)' }} />
                              
                              <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4 sm:mb-6">
                                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                                    formData.pricingMode === 'precise' 
                                      ? 'bg-accent-500 text-primary-900 shadow-lg shadow-accent-500/30' 
                                      : 'bg-white/5 text-white/60 group-hover:bg-white/10'
                                  }`}>
                                    <Target size={20} className="sm:w-7 sm:h-7" strokeWidth={2.5} />
                                  </div>
                                  {formData.pricingMode === 'precise' && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="p-1.5 sm:p-2 rounded-full bg-accent-500/20"
                                    >
                                      <CheckCircle2 size={16} className="sm:w-5 sm:h-5 text-accent-500" />
                                    </motion.div>
                                  )}
                                </div>
                                
                                <h3 className="text-lg sm:text-2xl font-heading font-black text-white mb-2 sm:mb-3 tracking-tight">Detailed Breakdown</h3>
                                <p className="text-white/60 text-xs sm:text-sm font-medium leading-relaxed">
                                  Grade-specific pricing
                                </p>
                              </div>
                            </motion.button>
                          </div>

                          {/* Input Section - Mobile: Compact */}
                          <div className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm">
                            {formData.pricingMode === 'approximate' ? (
                              <div className="max-w-xl mx-auto">
                                <label className="block text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-6 text-center">
                                  <Users size={14} className="inline-block mr-2 mb-1 sm:w-4 sm:h-4" />
                                  Total Students
                                </label>
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-accent-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                  <div className="relative flex items-center">
                                    <Users size={20} className="absolute left-4 sm:left-5 text-accent-500/50 group-hover:text-accent-500 transition-colors sm:w-6 sm:h-6" />
                                    <input
                                      type="number"
                                      name="totalStudents"
                                      value={formData.totalStudents}
                                      onChange={handleChange}
                                      required
                                      min="1"
                                      className="w-full pl-12 sm:pl-16 pr-4 sm:pr-8 py-4 sm:py-6 bg-primary-900/80 border-2 border-white/10 rounded-2xl text-white text-xl sm:text-2xl font-bold text-center focus:border-accent-500 focus:outline-none transition-all placeholder-white/20"
                                      placeholder="500"
                                    />
                                  </div>
                                  <p className="text-center text-white/30 text-[10px] sm:text-xs font-medium mt-2 sm:mt-3 tracking-wide px-2">Enter total number of students</p>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4 sm:space-y-6">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 pb-4 border-b border-white/10">
                                  <div>
                                    <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-1">Grade Distribution</h4>
                                    <p className="text-white/40 text-[10px] sm:text-xs font-medium">Add student counts per grade</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={addGradeEntry}
                                    className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-accent-500 hover:bg-accent-400 active:scale-95 text-primary-900 font-black text-[10px] sm:text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-accent-500/20"
                                  >
                                    <Zap size={12} className="sm:w-3.5 sm:h-3.5 fill-current" />
                                    Add Grade
                                  </button>
                                </div>
                                
                                <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                  {formData.gradesData.map((entry, index) => (
                                    <motion.div 
                                      key={index}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-end sm:items-center bg-primary-900/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/5 hover:border-accent-500/30 transition-all group"
                                    >
                                      <div className="sm:col-span-5">
                                        <label className="block text-accent-500/70 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] mb-2 sm:mb-3">Class / Grade</label>
                                        <select
                                          value={entry.grade}
                                          onChange={(e) => handleGradeDataChange(index, 'grade', e.target.value)}
                                          required
                                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-primary-600 border border-white/10 rounded-xl text-white text-sm sm:text-base font-bold focus:border-accent-500 focus:outline-none transition-all"
                                        >
                                          <option value="">Select Grade</option>
                                          {Object.keys(GRADE_RATES).map(grade => (
                                            <option key={grade} value={grade}>Class {grade}</option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="sm:col-span-5">
                                        <label className="block text-accent-500/70 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] mb-2 sm:mb-3">Student Count</label>
                                        <input
                                          type="number"
                                          value={entry.students}
                                          onChange={(e) => handleGradeDataChange(index, 'students', e.target.value)}
                                          required
                                          min="1"
                                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-primary-600 border border-white/10 rounded-xl text-white text-sm sm:text-base font-bold placeholder-white/20 focus:border-accent-500 focus:outline-none transition-all"
                                          placeholder="0"
                                        />
                                      </div>
                                      <div className="sm:col-span-2 flex justify-end sm:justify-center">
                                        <button
                                          type="button"
                                          onClick={() => removeGradeEntry(index)}
                                          disabled={formData.gradesData.length === 1}
                                          className="p-2 sm:p-3 text-white/30 hover:text-red-400 hover:bg-red-500/10 active:scale-95 rounded-xl transition-all disabled:opacity-0 disabled:pointer-events-none"
                                        >
                                          <X size={18} className="sm:w-5 sm:h-5" />
                                        </button>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Quote Display - Mobile: Optimized */}
                          {formData.estimatedQuote > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-4 sm:space-y-6"
                            >
                              {/* Main Quote Card */}
                              <div className="relative bg-linear-to-br from-accent-500/10 via-accent-600/5 to-transparent border-2 border-accent-500/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 overflow-hidden shadow-2xl shadow-accent-500/10">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-accent-500/10 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-accent-500/5 blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                                
                                <div className="relative z-10">
                                  {/* Quote Header */}
                                  <div className="text-center mb-6 sm:mb-8">
                                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent-500/20 border border-accent-500/30 text-accent-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-4 sm:mb-6">
                                      <DollarSign size={10} className="sm:w-3 sm:h-3" />
                                      Investment Estimate
                                    </div>
                                    <div className="text-4xl sm:text-7xl font-heading font-black text-shimmer mb-2 tracking-tighter break-all">
                                      ₹{formData.estimatedQuote.toLocaleString('en-IN')}
                                    </div>
                                    <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Total Budget Estimate</p>
                                  </div>
                                  
                                  {/* Breakdown - Mobile: Stack */}
                                  <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 py-6 sm:py-8 border-y border-white/10">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/5">
                                      <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-accent-500/20 shrink-0">
                                          <Users size={14} className="sm:w-4.5 sm:h-4.5 text-accent-500" />
                                        </div>
                                        <div className="min-w-0">
                                          <div className="text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-0.5 sm:mb-1">Student Enrollment</div>
                                          <div className="text-white text-xs sm:text-base font-bold truncate">
                                            {formData.pricingMode === 'approximate' 
                                              ? `${formData.totalStudents || 0} Students`
                                              : `${formData.gradesData.reduce((sum, item) => sum + (parseInt(item.students) || 0), 0)} Students`}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-accent-500 font-black text-base sm:text-lg text-right sm:text-left">
                                        {formData.pricingMode === 'approximate' 
                                          ? `₹${((formData.totalStudents || 0) * 1800).toLocaleString('en-IN')}`
                                          : `₹${formData.gradesData.reduce((sum, item) => {
                                              const rate = GRADE_RATES[item.grade] || 0;
                                              return sum + (rate * (parseInt(item.students) || 0));
                                            }, 0).toLocaleString('en-IN')}`}
                                      </div>
                                    </div>
                                    
                                    {formData.selectedTrainer && (
                                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 bg-accent-500/5 rounded-xl sm:rounded-2xl border border-accent-500/20">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                          <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-accent-500/30 shrink-0">
                                            <Award size={14} className="sm:w-4.5 sm:h-4.5 text-accent-500" />
                                          </div>
                                          <div className="min-w-0">
                                            <div className="text-accent-500/70 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-0.5 sm:mb-1">Premium Trainer</div>
                                            <div className="text-white text-xs sm:text-base font-black truncate">{formData.selectedTrainer.name}</div>
                                          </div>
                                        </div>
                                        <div className="text-accent-500 font-black text-base sm:text-lg text-right sm:text-left">₹5,00,000</div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Discount Section - Mobile: Compact */}
                                  <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-6 sm:mt-8 p-4 sm:p-6 bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl sm:rounded-2xl cursor-pointer group/discount active:scale-95"
                                    onClick={() => setShowDiscountPopup(true)}
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                        <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-green-500/20 shrink-0">
                                          <Zap size={16} className="sm:w-5 sm:h-5 text-green-400" />
                                        </div>
                                        <div className="min-w-0">
                                          <div className="text-green-400 font-black text-xs sm:text-sm mb-0.5 sm:mb-1">Special Launch Discount</div>
                                          <div className="text-white/60 text-[10px] sm:text-xs font-medium">Save up to 15%</div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1.5 sm:gap-2 text-green-400 font-black text-[10px] sm:text-xs uppercase tracking-widest group-hover/discount:gap-3 transition-all shrink-0">
                                        Apply
                                        <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                              </div>

                              {/* Disclaimer - Mobile: Compact */}
                              <div className="bg-white/3 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/5">
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 shrink-0 mt-0.5">
                                    <FileText size={14} className="sm:w-4 sm:h-4 text-white/40" />
                                  </div>
                                  <p className="text-white/40 text-[10px] sm:text-xs font-medium leading-relaxed">
                                    <span className="text-white/60 font-bold">Note:</span> This is an automated estimate. Final pricing will be customized based on your requirements.
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Additional Comments - Mobile: Compact */}
                          <div className="pt-4 sm:pt-6">
                            <label className="block text-white font-black text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
                              <MessageSquare size={14} className="sm:w-4 sm:h-4 text-accent-500" />
                              Additional Requirements
                            </label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={4}
                              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-primary-900/50 border border-white/10 rounded-xl sm:rounded-2xl text-white text-sm sm:text-base placeholder-white/20 focus:border-accent-500 focus:outline-none transition-all resize-none font-medium"
                              placeholder="Share any specific requirements or questions..."
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 4: Summary */}
                      {currentStep === 4 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8 pt-4"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-3">Partnership Review</h2>
                            <p className="text-white/60">Final review of your institutional request</p>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* School & Trainer Details */}
                            <div className="space-y-6">
                              <Card variant="elevated" className="p-6 bg-white/2 border-white/10">
                                <h3 className="text-lg font-heading font-black text-accent-500 mb-6 flex items-center gap-2">
                                  <Building size={20} />
                                  Institution Details
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                  <div className="text-xs font-bold text-white/40 uppercase">School</div>
                                  <div className="text-sm text-white font-medium">{formData.schoolName}</div>
                                  <div className="text-xs font-bold text-white/40 uppercase">Contact</div>
                                  <div className="text-sm text-white font-medium">{formData.contactPerson}</div>
                                  <div className="text-xs font-bold text-white/40 uppercase">Email</div>
                                  <div className="text-sm text-white font-medium truncate">{formData.email}</div>
                                  <div className="text-xs font-bold text-white/40 uppercase">Phone</div>
                                  <div className="text-sm text-white font-medium">{formData.phone}</div>
                                  <div className="text-xs font-bold text-white/40 uppercase">Board</div>
                                  <div className="text-sm text-white font-medium">{formData.board}</div>
                                </div>
                              </Card>

                              {formData.selectedTrainer && (
                                <Card variant="elevated" className="p-6 bg-white/2 border-white/10">
                                  <h3 className="text-lg font-heading font-black text-accent-500 mb-6 flex items-center gap-2">
                                    <Award size={20} />
                                    Selected Lead Trainer
                                  </h3>
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-accent-500/30">
                                      <img src={formData.selectedTrainer.imageUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                      <div className="text-white font-bold">{formData.selectedTrainer.name}</div>
                                      <div className="text-accent-400 text-xs font-bold uppercase tracking-wider">{formData.selectedTrainer.title}</div>
                                    </div>
                                  </div>
                                </Card>
                              )}
                            </div>

                            {/* Budget Summary */}
                            <div className="space-y-6">
                              <Card variant="elevated" className="p-6 bg-accent-500/5 border-accent-500/20">
                                <h3 className="text-lg font-heading font-black text-accent-500 mb-6 flex items-center gap-2">
                                  <Zap size={20} />
                                  Budget Framework
                                </h3>
                                <div className="space-y-4 mb-6">
                                  {formData.pricingMode === 'approximate' ? (
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-white/60">Calculated Model</span>
                                      <span className="text-white font-bold">Approximate (Flat Rate)</span>
                                    </div>
                                  ) : (
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-white/60">Calculated Model</span>
                                      <span className="text-white font-bold">Precise (Grade-wise)</span>
                                    </div>
                                  )}
                                  
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-white/60">Total Students</span>
                                    <span className="text-white font-bold">
                                      {formData.pricingMode === 'approximate' 
                                        ? formData.totalStudents 
                                        : formData.gradesData.reduce((sum, item) => sum + (parseInt(item.students) || 0), 0)}
                                    </span>
                                  </div>

                                  <div className="h-px bg-white/10 w-full" />
                                  <div className="flex justify-between items-center">
                                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Base Curriculum</span>
                                    <span className="text-white font-bold">₹{(formData.estimatedQuote - (formData.selectedTrainerId ? 500000 : 0)).toLocaleString('en-IN')}</span>
                                  </div>
                                  {formData.selectedTrainerId && (
                                    <div className="flex justify-between items-center">
                                      <span className="text-accent-400 text-[10px] font-black uppercase tracking-widest">Trainer Premium</span>
                                      <span className="text-accent-400 font-bold">+ ₹5,00,000</span>
                                    </div>
                                  )}
                                </div>

                                <div className="bg-primary-950 p-6 rounded-2xl border border-white/5 text-center">
                                  <div className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mb-2">Final Estimated Budget</div>
                                  <div className={`text-4xl font-heading font-black ${appliedDiscount ? 'text-green-500' : 'text-accent-500'}`}>
                                    ₹{Math.round(formData.estimatedQuote * (appliedDiscount ? 0.85 : 1)).toLocaleString('en-IN')}
                                  </div>
                                  {appliedDiscount && (
                                    <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                      <CheckCircle2 size={12} className="text-green-500" />
                                      <span className="text-green-500 text-[10px] font-black uppercase tracking-widest">15% Discount Applied</span>
                                    </div>
                                  )}
                                </div>
                              </Card>

                              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <h4 className="text-xs font-black text-white/40 uppercase tracking-widest mb-3">Next Step</h4>
                                <p className="text-white/70 text-sm font-medium leading-relaxed">
                                  Upon submission, our Institutional Strategy Team will review your requirements and share a formal proposal within 24 hours.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Footer for Navigation - Mobile: Compact Buttons */}
                  <div className="bg-primary-600/98 backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-6 border-t border-white/10 flex items-center justify-between z-20 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={currentStep === 1 || isSubmitting}
                      className={`group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all ${
                        currentStep === 1 
                          ? 'opacity-0 pointer-events-none' 
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white active:scale-95 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <ChevronLeft size={14} className="sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-0.5" />
                      <span>Back</span>
                    </button>

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="group flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider bg-accent-500 text-primary-900 hover:bg-accent-400 active:scale-95 transition-all shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40"
                      >
                        <span>Continue</span>
                        <ChevronRight size={14} className="sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider bg-accent-500 text-primary-900 hover:bg-accent-400 active:scale-95 transition-all shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw size={12} className="sm:w-3.5 sm:h-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit</span>
                            <Zap size={12} className="sm:w-3.5 sm:h-3.5 fill-current" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Discount Confirmation Modal */}
      <ConfirmModal
        isOpen={showDiscountPopup}
        title="Apply 15% Special Discount?"
        message="Would you like to apply an additional 15% discount to your estimated budget? Our team will reach out to you soon to discuss specialized partnership terms."
        confirmText="Yes, Apply Discount"
        cancelText="Maybe Later"
        type="primary"
        onConfirm={() => {
          setAppliedDiscount(true);
          setShowDiscountPopup(false);
          const notification = document.createElement('div');
          notification.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-black uppercase tracking-widest animate-bounce';
          notification.innerText = 'Our team will reach out to you soon!';
          document.body.appendChild(notification);
          setTimeout(() => notification.remove(), 4000);
        }}
        onCancel={() => setShowDiscountPopup(false)}
      />

      <ConfirmModal
        isOpen={showConfirmModal}
        title={currentStep === 3 ? "Complete Registration?" : "Discard Changes?"}
        message={currentStep === 3 ? "Ready to submit your interest? Our team will contact you soon." : "Are you sure you want to close? All progress will be lost."}
        confirmText={currentStep === 3 ? "Submit Now" : "Yes, Close"}
        type={currentStep === 3 ? "primary" : "danger"}
        onConfirm={confirmAction}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Trainer Detail Modal */}
      {showTrainerDetail && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-150 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary-900 border border-accent-500/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl shadow-black/50 will-change-transform"
          >
            <button
              onClick={() => setShowTrainerDetail(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            >
              <X size={28} />
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-32 h-32 bg-primary-600 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden border-2 border-[#B8860B]/30 shadow-lg shadow-accent-500/10">
                  <img 
                    src={showTrainerDetail.imageUrl} 
                    alt={showTrainerDetail.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/trainers/shresth.jpg';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-2">{showTrainerDetail.name}</h2>
                  <p className="text-xl text-accent-400 mb-4">{showTrainerDetail.title}</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Award size={16} className="text-accent-500" />
                      {showTrainerDetail.experience}
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Mail size={16} className="text-accent-500" />
                      {showTrainerDetail.email}
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Clock size={16} className="text-accent-500" />
                      {showTrainerDetail.availability}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h3 className="text-xl font-heading font-black text-white mb-3">About</h3>
                <p className="text-white/70 leading-relaxed">{showTrainerDetail.bio}</p>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <h3 className="text-xl font-heading font-black text-white mb-3">Specialties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {showTrainerDetail.specialties.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-white/80">
                      <CheckCircle2 size={18} className="text-accent-500 mt-0.5 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div className="mb-8">
                <h3 className="text-xl font-heading font-black text-white mb-3">Qualifications</h3>
                <ul className="space-y-2">
                  {showTrainerDetail.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/70">
                      <span className="text-accent-500 mt-1">•</span>
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video Spotlight */}
              {showTrainerDetail.videos?.length > 0 && (
                <div className="mb-8 border-t border-white/10 pt-8 mt-8">
                  <div className="mb-6">
                     <h3 className="text-xl font-heading font-black text-white mb-1">Mentor Spotlight</h3>
                     <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Watch an exclusive introduction</p>
                  </div>
                  <div className="max-w-3xl mx-auto">
                    <TrainerVideos videos={showTrainerDetail.videos} />
                  </div>
                </div>
              )}

              {/* Select Button */}
              <Button
                type="button"
                onClick={() => {
                  handleTrainerSelect(showTrainerDetail);
                  setShowTrainerDetail(null);
                }}
                variant={formData.selectedTrainerId === showTrainerDetail.id ? "secondary" : "primary"}
                className="w-full rounded-xl py-3 md:py-4 text-sm md:text-base"
              >
                {formData.selectedTrainerId === showTrainerDetail.id 
                  ? `✓ ${showTrainerDetail.name.split(' ')[0]} Selected` 
                  : `Select ${showTrainerDetail.name.split(' ')[0]}`}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
