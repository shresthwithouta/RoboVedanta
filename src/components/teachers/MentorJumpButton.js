'use client';

import { Star } from 'lucide-react';

export default function MentorJumpButton() {
  return (
    <div className="pt-4">
      <button 
        onClick={() => document.getElementById('impact-gallery')?.scrollIntoView({ behavior: 'smooth' })}
        className="inline-flex items-center gap-3 px-6 py-3 bg-accent-500 hover:bg-white text-primary-900 rounded-xl font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-accent-500/20 group/btn"
      >
        <Star size={18} fill="currentColor" strokeWidth={0} className="group-hover/btn:scale-125 transition-transform" />
        Watch Mentor Session
      </button>
    </div>
  );
}
