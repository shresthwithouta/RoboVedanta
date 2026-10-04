'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, Shield, LayoutDashboard } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(result.error || 'Invalid credentials');
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    } catch {
      setError('Network error. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-500 flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
      <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 -left-40 w-[400px] h-[400px] bg-primary-300/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.02)_0%,transparent_60%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card */}
        <div className="bg-primary-600/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          {/* Glow effect behind card */}
          <div className="absolute -inset-px bg-gradient-to-b from-accent-500/10 via-transparent to-transparent rounded-[2.5rem] pointer-events-none" />
          
          {/* Header */}
          <div className="relative text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-accent-500/10 border border-accent-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6"
            >
              <Shield size={36} className="text-accent-500" />
            </motion.div>
            
            <h1 className="text-3xl font-heading font-black text-white tracking-tighter mb-2">
              Admin Access
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative space-y-6">
            <motion.div
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-14 py-4 text-white font-bold placeholder:text-white/20 focus:outline-none focus:border-accent-500/50 focus:bg-white/8 transition-all duration-300 text-sm tracking-wider"
                  placeholder="••••••••••••"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs font-bold text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-accent-500 hover:bg-accent-400 disabled:opacity-40 disabled:cursor-not-allowed text-primary-900 font-black uppercase tracking-[0.2em] text-[11px] py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-accent-500/20 hover:shadow-2xl hover:shadow-accent-500/30 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-900/30 border-t-primary-900 rounded-full animate-spin" />
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="relative mt-8 pt-6 border-t border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 text-white/20">
              <LayoutDashboard size={12} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">RoboVedanta Management</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
