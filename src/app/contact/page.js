'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        }, 3000);
      } else {
        alert(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // WhatsApp click-to-chat (replace with actual number)
  const whatsappNumber = '918808409295'; // Replace with actual WhatsApp number
  const whatsappMessage = 'Hi! I would like to know more about RoboVedanta programs.';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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
              Get In Touch
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tight">
              <span className="text-white block mb-2 drop-shadow-2xl">Let's Start a</span>
              <span className="text-shimmer">Conversation</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              Have questions about our programs? Want to bring RoboVedanta to your school? We're here to help.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Contact Methods Section */}
      <Section background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Email */}
            <ScrollReveal>
              <Card variant="elevated" className="p-8 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/2 text-center">
                <div className="inline-flex p-5 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                  <Mail size={40} />
                </div>
                <h3 className="text-xl font-heading font-black text-white mb-3">Email Us</h3>
                <p className="text-white/60 text-sm font-medium mb-6">Send us an email anytime</p>
                <a 
                  href="mailto:hello@robovedanta.com" 
                  className="text-accent-400 hover:text-accent-300 font-bold transition-colors break-all"
                >
                  hello@robovedanta.com
                </a>
              </Card>
            </ScrollReveal>

            {/* WhatsApp */}
            <ScrollReveal delay={0.1}>
              <Card variant="elevated" className="p-8 group h-full border-accent-500/30 hover:border-accent-500/50 transition-all duration-500 bg-linear-to-br from-accent-500/10 to-primary-600/50 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 px-3 py-1 bg-accent-500 rounded-full">
                  <span className="text-primary-900 font-black text-xs tracking-widest uppercase">Quick</span>
                </div>
                <div className="inline-flex p-5 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                  <MessageCircle size={40} />
                </div>
                <h3 className="text-xl font-heading font-black text-white mb-3">WhatsApp Chat</h3>
                <p className="text-white/60 text-sm font-medium mb-6">Get instant responses</p>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="rounded-xl px-6 font-black tracking-widest uppercase text-xs border-none shadow-xl shadow-accent-500/20"
                  >
                    Chat Now
                  </Button>
                </a>
              </Card>
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal delay={0.2}>
              <Card variant="elevated" className="p-8 group h-full border-white/10 hover:border-accent-500/30 transition-all duration-500 bg-white/2 text-center">
                <div className="inline-flex p-5 rounded-2xl bg-accent-600/20 text-accent-400 mb-6 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
                  <Phone size={40} />
                </div>
                <h3 className="text-xl font-heading font-black text-white mb-3">Call Us</h3>
                <p className="text-white/60 text-sm font-medium mb-6">Mon-Sat, 9 AM - 6 PM</p>
                <a 
                  href="tel:+918808409295" 
                  className="text-accent-400 hover:text-accent-300 font-bold transition-colors"
                >
                   +91 88084 09295
                </a>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section background="darker" spacing="lg" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.05)_0%,transparent_70%)] animate-slow-zoom" />
        
        <Container className="relative z-10">
            {/* Center: Form */}
            <ScrollReveal className="md:col-span-2 max-w-3xl mx-auto w-full">
              <div>
                <div className="mb-12 text-center">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                    Send Message
                  </div>
                  <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4 leading-tight tracking-tighter">
                    Drop Us a <span className="text-accent-500">Message</span>
                  </h2>
                  <p className="text-white/60 text-lg font-medium">
                    Fill out the form and we'll get back to you within 24 hours.
                  </p>
                </div>

                <Card variant="elevated" className="p-8 md:p-10 bg-white/2 border-white/10">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="inline-flex p-6 bg-accent-500/20 rounded-full mb-6">
                        <CheckCircle2 size={48} className="text-accent-500" />
                      </div>
                      <h3 className="text-2xl font-heading font-black text-accent-500 mb-3">Message Sent!</h3>
                      <p className="text-white/60 font-medium">We'll get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-white font-bold text-sm mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white font-bold text-sm mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-bold text-sm mb-2">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-bold text-sm mb-2">Subject *</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white focus:border-accent-500 focus:outline-none transition-colors"
                        >
                          <option value="">Select a subject</option>
                          <option value="student-programs">Student Programs Inquiry</option>
                          <option value="school-programs">School Programs Inquiry</option>
                          <option value="partnership">Partnership Opportunities</option>
                          <option value="support">Technical Support</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-bold text-sm mb-2">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-primary-600/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-accent-500 focus:outline-none transition-colors resize-none"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <Button 
                        type="submit"
                        variant="primary" 
                        size="lg" 
                        className="w-full rounded-2xl font-black tracking-widest uppercase text-xs border-none shadow-2xl shadow-accent-500/20 py-5"
                      >
                        <Send size={18} className="mr-2" />
                        Send Message
                      </Button>

                      <p className="text-white/40 text-xs text-center">
                        * Required fields. We typically respond within 24 hours.
                      </p>
                    </form>
                  )}
                </Card>
              </div>
            </ScrollReveal>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section background="darkBlue" className="relative group/section">
        <div className="motes-container">
          <div className="motes w-full h-full animate-slow-zoom" />
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Common Questions
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight tracking-tighter">
                Frequently Asked <span className="text-accent-500">Questions</span>
              </h2>
              <p className="text-white/60 text-lg font-medium">
                Quick answers to questions you may have
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: 'What are your response times?',
                a: 'We typically respond to all inquiries within 24 hours during business days.'
              },
              {
                q: 'Do you offer school visits?',
                a: 'Yes! We can arrange a visit to discuss how RoboVedanta can fit your school\'s needs.'
              },
              {
                q: 'Can I schedule a demo?',
                a: 'Absolutely! Contact us to schedule a live demo of our platform and curriculum.'
              },
              {
                q: 'What support do you provide?',
                a: 'We offer email, phone, and WhatsApp support, plus dedicated account managers for schools.'
              }
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <Card variant="elevated" className="p-6 bg-white/2 border-white/10 hover:border-accent-500/30 transition-all duration-500">
                  <h4 className="text-lg font-heading font-black text-accent-500 mb-3">{faq.q}</h4>
                  <p className="text-white/60 text-sm font-medium leading-relaxed">{faq.a}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
