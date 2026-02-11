'use client';

import { useRef, useState } from 'react';
import { ArrowRight, School, BookOpen, Users, Award, CheckCircle2, Target, Lightbulb, Cpu, GraduationCap, FileText, Headphones, TrendingUp, Shield, Zap, RefreshCw, Clock, Globe, Settings, ChevronRight, ChevronLeft, MapPin, Building, Mail, Phone, User, X, Check } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CURRICULUM_LEVELS } from '@/lib/constants';
import { getAllTutors } from '@/data/tutors';
import TeacherVideos from '@/components/teachers/TeacherVideos';
import { CheckTeachersCTA } from '@/components/ui/CheckTeachersCTA';

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

// Pricing calculation function
const calculatePrice = (grade) => {
  const gradeNum = parseInt(grade);
  if (gradeNum >= 1 && gradeNum <= 12) {
    return 1500 + (gradeNum - 1) * 200;
  }
  return 0;
};

export default function SchoolsPage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: School Details, 2: Tutor Selection, 3: Quote
  const [selectedTutors, setSelectedTutors] = useState([]); // Array of selected tutors
  const [showTutorDetail, setShowTutorDetail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleCloseModal = () => {
    if (submitSuccess) {
      setShowRegistration(false);
      setSubmitSuccess(false);
      return;
    }
    
    // Check if any field has data
    const hasData = Object.entries(formData).some(([key, val]) => {
      if (Array.isArray(val)) return val.length > 0;
      return val !== '' && val !== 0;
    });

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
          selectedTutorIds: [],
          selectedGrade: '',
          numberOfStudents: '',
          estimatedQuote: 0,
          message: ''
        });
        setSelectedTutors([]);
        setShowConfirmModal(false);
      });
      setShowConfirmModal(true);
    } else {
      setShowRegistration(false);
    }
  };

  const [formData, setFormData] = useState({
    // School Details
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    board: '',
    // Tutor & Quote
    selectedTutorIds: [], // Array of tutor IDs
    selectedGrade: '',
    numberOfStudents: '',
    estimatedQuote: 0,
    message: ''
  });

  const tutors = getAllTutors();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate quote when grade or number of students changes
      if (name === 'selectedGrade' || name === 'numberOfStudents') {
        const grade = name === 'selectedGrade' ? value : prev.selectedGrade;
        const numStudents = name === 'numberOfStudents' ? value : prev.numberOfStudents;
        
        if (grade && numStudents) {
          const pricePerStudent = calculatePrice(grade);
          updated.estimatedQuote = pricePerStudent * parseInt(numStudents);
        }
      }
      
      return updated;
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate school details
      const requiredFields = ['schoolName', 'contactPerson', 'email', 'phone', 'address', 'city', 'state', 'pincode', 'board'];
      const isValid = requiredFields.every(field => formData[field]);
      
      if (!isValid) {
        alert('Please fill in all required fields');
        return;
      }
    }
    
    if (currentStep === 2) {
      // Validate tutor selection - at least 1, max 5
      if (!formData.selectedTutorIds || formData.selectedTutorIds.length === 0) {
        alert('Please select at least one tutor');
        return;
      }
      if (formData.selectedTutorIds.length > 5) {
        alert('You can select a maximum of 5 tutors');
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleTutorToggle = (tutorId) => {
    setFormData(prev => {
      const currentIds = prev.selectedTutorIds || [];
      
      // Check if tutor is already selected
      if (currentIds.includes(tutorId)) {
        // Remove tutor
        const newIds = currentIds.filter(id => id !== tutorId);
        setSelectedTutors(tutors.filter(t => newIds.includes(t.id)));
        return { ...prev, selectedTutorIds: newIds };
      } else {
        // Add tutor if under limit
        if (currentIds.length >= 5) {
          alert('You can select a maximum of 5 tutors');
          return prev;
        }
        const newIds = [...currentIds, tutorId];
        setSelectedTutors(tutors.filter(t => newIds.includes(t.id)));
        return { ...prev, selectedTutorIds: newIds };
      }
    });
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
        // Reset form after 3 seconds
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
            selectedTutorIds: [],
            selectedGrade: '',
            numberOfStudents: '',
            estimatedQuote: 0,
            message: ''
          });
          setSelectedTutors([]);
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
              Institutional Programs
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tight">
              <span className="text-white block mb-2 drop-shadow-2xl">Transform Your School's</span>
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
            <Card variant="elevated" className="p-10 md:p-16 bg-white/[0.02] border-white/10 mb-20">
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

      {/* Teachers CTA */}
      <CheckTeachersCTA />

      {/* CTA Section */}
      <Section id="contact" background="darker" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.05)_0%,transparent_70%)] animate-slow-zoom" />
        
        <Container className="relative z-10 text-center">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto py-20 px-6 bg-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl relative overflow-hidden group">
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
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-8"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-primary-950/98">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,134,11,0.1),transparent_70%)]" />
            <div className="absolute inset-0 backdrop-blur-md" />
          </div>

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-primary-900/95 backdrop-blur-md rounded-4xl shadow-2xl border border-accent-500/20 overflow-hidden flex flex-col will-change-transform"
            style={{ maxHeight: 'calc(100vh - 4rem)', minHeight: '600px' }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all duration-200 group"
              aria-label="Close modal"
            >
              <X size={20} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Header (Fixed) */}
            <div className="relative px-6 sm:px-8 pt-8 sm:pt-10 pb-6 shrink-0">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mb-2">
                  School Partnership
                </h2>
                <p className="text-accent-400 text-xs sm:text-sm font-bold tracking-widest uppercase">
                  🏫 Institutional Registration
                </p>
              </motion.div>
              
              {/* Progress Steps */}
              <div className="mt-8 flex items-center justify-between max-w-md mx-auto">
                {[
                  { num: 1, label: 'Details', icon: '📝' },
                  { num: 2, label: 'Tutors', icon: '👨‍🏫' },
                  { num: 3, label: 'Quote', icon: '💰' }
                ].map((step, idx) => (
                  <div key={step.num} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: currentStep === step.num ? 1.1 : 1,
                          opacity: currentStep >= step.num ? 1 : 0.5
                        }}
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-base sm:text-lg font-black transition-all duration-300 ${
                          currentStep === step.num
                            ? 'bg-accent-500 text-primary-900 shadow-lg shadow-accent-500/50'
                            : currentStep > step.num
                            ? 'bg-accent-500/20 text-accent-400 border-2 border-accent-500/40'
                            : 'bg-white/5 text-white/40 border-2 border-white/10'
                        }`}
                      >
                        {currentStep > step.num ? <Check size={24} strokeWidth={3} /> : step.num}
                      </motion.div>
                      <span className={`mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide ${
                        currentStep === step.num ? 'text-accent-400' : 'text-white/40'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {idx < 2 && (
                      <div className={`h-0.5 flex-1 mx-2 transition-all duration-500 ${
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
                <div className="flex-1 px-8 pb-8 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-24 h-24 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-4xl font-heading font-black text-white mb-4">Registration Successful!</h2>
                    <p className="text-white/70 text-lg max-w-md mx-auto">
                      Thank you for your interest. Our team will contact you within 24 hours.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <>
                  {/* Scrollable Body */}
                  <div className="flex-1 relative px-4 sm:px-8 pb-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="space-y-8">
                      {/* Step 1: School Details */}
                      {currentStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6 pt-4"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-3">School Details</h2>
                            <p className="text-white/60">Tell us about your institution</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-white font-bold text-sm mb-2">
                                <Building className="inline mr-2" size={16} />
                                School Name *
                              </label>
                              <input
                                type="text"
                                name="schoolName"
                                value={formData.schoolName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="Enter school name"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-sm mb-2">
                                <User className="inline mr-2" size={16} />
                                Contact Person *
                              </label>
                              <input
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="Principal / Coordinator name"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-sm mb-2">
                                <Mail className="inline mr-2" size={16} />
                                Email Address *
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="school@example.com"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-sm mb-2">
                                <Phone className="inline mr-2" size={16} />
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="+91 XXXXX XXXXX"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-white font-bold text-sm mb-2">
                                <MapPin className="inline mr-2" size={16} />
                                Address *
                              </label>
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="Street address"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-sm mb-2">City *</label>
                              <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="City"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-sm mb-2">State *</label>
                              <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="State"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-sm mb-2">Pincode *</label>
                              <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="PIN code"
                              />
                            </div>

                            <div>
                              <label className="block text-white font-bold text-sm mb-2">Board Affiliation *</label>
                              <select
                                name="board"
                                value={formData.board}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white focus:border-accent-500 focus:outline-none transition-colors"
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

                      {/* Step 2: Tutor Selection */}
                      {currentStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6 pt-4"
                        >
                          <div className="text-center mb-6 md:mb-8">
                            <h2 className="text-xl md:text-4xl font-heading font-black text-white mb-2 md:mb-3">Select Your Tutors</h2>
                            <p className="text-white/60">Choose up to 5 expert educators</p>
                            
                            {/* Selection Counter */}
                            <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-accent-500/10 border border-accent-500/30 rounded-full">
                              <Users size={20} className="text-accent-500" />
                              <span className="text-white font-bold">
                                {formData.selectedTutorIds.length} / 5 Selected
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tutors.map((tutor) => {
                              const isSelected = formData.selectedTutorIds.includes(tutor.id);
                              
                              return (
                                <motion.div
                                  key={tutor.id}
                                  whileHover={{ y: -4 }}
                                  className={`group bg-primary-600/30 border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                                    isSelected
                                      ? 'border-accent-500 bg-accent-500/10'
                                      : 'border-white/10 hover:border-accent-500/50'
                                  }`}
                                  onClick={() => handleTutorToggle(tutor.id)}
                                >
                                  {/* Tutor Image */}
                                  <div className="relative w-full h-48 bg-primary-600 rounded-xl mb-4 overflow-hidden border border-[#B8860B]/20">
                                    <img 
                                      src={tutor.imageUrl.startsWith('/tutors/') ? `/teachers/${tutor.id}.jpg` : tutor.imageUrl} 
                                      alt={tutor.name}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                      onError={(e) => {
                                        e.target.src = '/teachers/shresth.jpg'; // Fallback
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-primary-950/80 to-transparent opacity-60" />
                                    
                                    {/* Checkbox indicator */}
                                    <div className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                      isSelected 
                                        ? 'bg-accent-500 scale-100 shadow-lg shadow-accent-500/50' 
                                        : 'bg-black/50 backdrop-blur-md scale-90 border border-white/20'
                                    }`}>
                                      {isSelected && <Check size={20} className="text-primary-900 font-black" />}
                                    </div>
                                    
                                    {tutor.featured && (
                                      <div className="absolute top-2 right-2 bg-linear-to-r from-accent-500 to-accent-600 text-primary-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        Featured
                                      </div>
                                    )}
                                  </div>

                                  <h3 className="text-xl font-heading font-black text-white mb-1 group-hover:text-accent-500 transition-colors">{tutor.name}</h3>
                                  <p className="text-accent-400 text-[10px] font-bold uppercase tracking-widest mb-4">{tutor.title}</p>

                                  <div className="space-y-3 mb-6">
                                    <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Key Qualifications</p>
                                    {tutor.qualifications.slice(0, 2).map((qual, idx) => (
                                      <div key={idx} className="flex items-start text-[11px] text-white/70 bg-white/5 rounded-lg p-2 border border-white/5 leading-snug">
                                        <Award size={14} className="text-accent-500 mr-2 mt-0.5 shrink-0" />
                                        <span>{qual}</span>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                      <Clock size={14} className="text-white/30" />
                                      <span className="text-white/60 text-[10px] font-bold uppercase">{tutor.experience}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowTutorDetail(tutor);
                                        }}
                                        className="px-3 py-2 bg-accent-500/10 text-accent-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-accent-500 hover:text-primary-900 transition-all border border-accent-500/20"
                                      >
                                        Details
                                      </button>
                                    </div>
                                  </div>

                                  {isSelected && (
                                    <div className="mt-3 bg-accent-500/20 border border-accent-500 rounded-lg px-3 py-2 text-center">
                                      <Check size={16} className="inline text-accent-500 mr-2" />
                                      <span className="text-accent-500 text-sm font-black">Selected</span>
                                    </div>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Quote */}
                      {currentStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6 pt-4"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-3">Get Your Quote</h2>
                            <p className="text-white/60">Calculate approximate cost</p>
                          </div>

                          {/* Selected Tutors Summary */}
                          {selectedTutors.length > 0 && (
                            <div className="mb-6">
                              <div className="text-xs text-white/60 mb-3 font-bold uppercase tracking-wider">
                                Selected Tutors ({selectedTutors.length})
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedTutors.map((tutor) => (
                                  <Card key={tutor.id} variant="elevated" className="p-4 bg-accent-500/10 border-accent-500/30">
                                    <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 bg-gradient-to-br from-accent-500/30 to-primary-600 rounded-full flex items-center justify-center shrink-0">
                                        <User size={20} className="text-accent-500" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-heading font-black text-white truncate">{tutor.name}</h3>
                                        <p className="text-accent-400 text-xs truncate">{tutor.title}</p>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-white font-bold text-sm mb-2">Select Grade *</label>
                              <select
                                name="selectedGrade"
                                value={formData.selectedGrade}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white focus:border-accent-500 focus:outline-none transition-colors"
                              >
                                <option value="">Select grade</option>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                                  <option key={grade} value={grade}>Grade {grade}</option>
                                ))}
                              </select>
                              {formData.selectedGrade && (
                                <p className="text-accent-400 text-xs mt-2">
                                  ₹{calculatePrice(formData.selectedGrade).toLocaleString('en-IN')} per student
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-white font-bold text-sm mb-2">Number of Students *</label>
                              <input
                                type="number"
                                name="numberOfStudents"
                                value={formData.numberOfStudents}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                                placeholder="Enter number"
                              />
                            </div>
                          </div>

                          {/* Estimated Quote */}
                          {formData.estimatedQuote > 0 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-gradient-to-br from-accent-500/20 to-accent-600/10 border-2 border-accent-500 rounded-2xl p-8 text-center"
                            >
                              <div className="text-white/60 text-sm font-bold tracking-widest uppercase mb-2">Estimated Quote</div>
                              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-shimmer mb-2 break-all px-2">
                                ₹{formData.estimatedQuote.toLocaleString('en-IN')}
                              </div>
                              <div className="text-white/60 text-sm">
                                {formData.numberOfStudents} students × Grade {formData.selectedGrade}
                              </div>
                            </motion.div>
                          )}

                          <div>
                            <label className="block text-white font-bold text-sm mb-2">Additional Message (Optional)</label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={4}
                              className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors resize-none"
                              placeholder="Any specific requirements or questions..."
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Footer for Navigation */}
                  <div className="bg-primary-600/95 backdrop-blur-xl px-6 sm:px-8 py-6 border-t border-white/10 flex items-center justify-between z-20 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={currentStep === 1 || isSubmitting}
                      className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                        currentStep === 1 
                          ? 'opacity-0 pointer-events-none' 
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                      <span>Back</span>
                    </button>

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="group flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-accent-500 text-primary-900 hover:bg-accent-400 transition-all shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40"
                      >
                        <span>Continue</span>
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-accent-500 text-primary-900 hover:bg-accent-400 transition-all shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Request</span>
                            <Zap size={14} className="fill-current" />
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

      <ConfirmModal
        isOpen={showConfirmModal}
        title={currentStep === 3 ? "Complete Registration?" : "Discard Changes?"}
        message={currentStep === 3 ? "Ready to submit your interest? Our team will contact you soon." : "Are you sure you want to close? All progress will be lost."}
        confirmText={currentStep === 3 ? "Submit Now" : "Yes, Close"}
        type={currentStep === 3 ? "primary" : "danger"}
        onConfirm={confirmAction}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Tutor Detail Modal */}
      {showTutorDetail && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-150 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary-900 border border-accent-500/30 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl shadow-black/50 will-change-transform"
          >
            <button
              onClick={() => setShowTutorDetail(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            >
              <X size={28} />
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="w-32 h-32 bg-primary-600 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden border-2 border-[#B8860B]/30 shadow-lg shadow-accent-500/10">
                  <img 
                    src={showTutorDetail.imageUrl} 
                    alt={showTutorDetail.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/teachers/shresth.jpg'; // Fallback
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-2">{showTutorDetail.name}</h2>
                  <p className="text-xl text-accent-400 mb-4">{showTutorDetail.title}</p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Award size={16} className="text-accent-500" />
                      {showTutorDetail.experience}
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Mail size={16} className="text-accent-500" />
                      {showTutorDetail.email}
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Clock size={16} className="text-accent-500" />
                      {showTutorDetail.availability}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h3 className="text-xl font-heading font-black text-white mb-3">About</h3>
                <p className="text-white/70 leading-relaxed">{showTutorDetail.bio}</p>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <h3 className="text-xl font-heading font-black text-white mb-3">Specialties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {showTutorDetail.specialties.map((spec, idx) => (
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
                  {showTutorDetail.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/70">
                      <span className="text-accent-500 mt-1">•</span>
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video Spotlight */}
              {showTutorDetail.videos?.length > 0 && (
                <div className="mb-8 border-t border-white/10 pt-8 mt-8">
                  <div className="mb-6">
                     <h3 className="text-xl font-heading font-black text-white mb-1">Mentor Spotlight</h3>
                     <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Watch an exclusive introduction</p>
                  </div>
                  <div className="max-w-3xl mx-auto">
                    <TeacherVideos videos={showTutorDetail.videos} />
                  </div>
                </div>
              )}

              {/* Select Button */}
              <Button
                type="button"
                onClick={() => {
                  handleTutorToggle(showTutorDetail.id);
                  setShowTutorDetail(null);
                }}
                variant={formData.selectedTutorIds.includes(showTutorDetail.id) ? "secondary" : "primary"}
                className="w-full rounded-xl py-3 md:py-4 text-sm md:text-base"
              >
                {formData.selectedTutorIds.includes(showTutorDetail.id) 
                  ? `✓ ${showTutorDetail.name.split(' ')[0]} Selected` 
                  : `Select ${showTutorDetail.name.split(' ')[0]}`}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
