'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * ProgressFlow - Reusable component for showing step-by-step progression
 * Used for learning journeys, processes, timelines, etc.
 */
export function ProgressFlow({ steps, variant = 'horizontal', className }) {
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={cn(
      'flex items-center gap-4',
      isHorizontal ? 'flex-row flex-wrap justify-center' : 'flex-col',
      className
    )}>
      {steps.map((step, index) => (
        <div key={index} className={cn(
          'flex items-center gap-4',
          isHorizontal ? 'flex-row' : 'flex-col'
        )}>
          {/* Step Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group cursor-default"
          >
            <div className="w-16 h-16 rounded-full bg-accent-500/20 border-2 border-accent-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="text-xl font-heading font-black text-accent-500">
                {step.number || index + 1}
              </span>
            </div>
            <div className="text-sm font-black text-white mb-1 max-w-[120px]">
              {step.label}
            </div>
            {step.sublabel && (
              <div className="text-xs text-white/40 font-medium">{step.sublabel}</div>
            )}
          </motion.div>

          {/* Arrow (except for last item) */}
          {index < steps.length - 1 && (
            <ArrowRight 
              className={cn(
                'text-accent-500/50 shrink-0',
                isHorizontal ? 'block' : 'rotate-90'
              )} 
              size={24} 
            />
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * SkillBar - Animated skill/progress bar component
 */
export function SkillBar({ label, percentage, delay = 0, showPercentage = true }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-bold text-sm">{label}</span>
        {showPercentage && (
          <span className="text-accent-500 font-black text-sm">{percentage}%</span>
        )}
      </div>
      <div className="h-3 bg-primary-600/50 rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-accent-600 to-accent-500"
        />
      </div>
    </div>
  );
}

/**
 * MultiLevelSkillChart - Shows skill progression across multiple levels
 */
export function MultiLevelSkillChart({ skills, levelCount = 5 }) {
  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <div key={index} className="group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-bold text-sm md:text-base">{skill.name}</span>
            {skill.icon}
          </div>
          <div className="flex items-center gap-2">
            {skill.levels.map((level, i) => (
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
  );
}

/**
 * ProcessStep - Individual step in a process flow
 */
export function ProcessStep({ number, title, description, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center group"
    >
      <div className="inline-flex p-4 rounded-2xl bg-accent-600/20 text-accent-400 mb-4 group-hover:bg-accent-600 group-hover:text-primary-900 group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>
      <div className="text-xs font-black text-accent-500 tracking-[0.2em] uppercase mb-2">
        Step {number}
      </div>
      <h3 className="text-xl font-heading font-black text-white mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed font-medium text-sm max-w-xs">
        {description}
      </p>
    </motion.div>
  );
}

/**
 * ComparisonCard - Side-by-side comparison component
 */
export function ComparisonCard({ left, right, className }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-8', className)}>
      <div className="bg-primary-600/50 p-8 rounded-2xl border border-white/10">
        <h4 className="text-2xl font-heading font-black text-white mb-6">{left.title}</h4>
        <div className="space-y-3">
          {left.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              {left.icon || <div className="w-5 h-5 rounded-full bg-accent-500 shrink-0 mt-0.5" />}
              <span className="text-white/70 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary-600/50 p-8 rounded-2xl border border-white/10">
        <h4 className="text-2xl font-heading font-black text-white mb-6">{right.title}</h4>
        <div className="space-y-3">
          {right.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              {right.icon || <div className="w-5 h-5 rounded-full bg-accent-500 shrink-0 mt-0.5" />}
              <span className="text-white/70 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * StatCard - Animated statistic card
 */
export function StatCard({ value, label, delay = 0, variant = 'default' }) {
  const variants = {
    default: 'bg-primary-600/50 border-white/10',
    elevated: 'bg-white/[0.02] border-white/10',
    accent: 'bg-accent-500/10 border-accent-500/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={cn(
        'p-8 rounded-2xl border group hover:scale-105 transition-all cursor-default',
        variants[variant]
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-4xl font-heading font-black text-accent-500 mb-3 group-hover:scale-110 transition-transform">
          {value}
        </div>
        <div className="text-white/70 font-bold uppercase tracking-[0.2em] text-xs">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
