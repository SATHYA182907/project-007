import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Sparkles, Layers, Shield, Clock } from 'lucide-react';
import { SplitText } from '../components/fx';
import logoImg from '../assets/logo/offscreen_logo.jpg';

export const LifeSkillsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E232B] font-sans selection:bg-[#DDD6FE] selection:text-[#111827] relative overflow-hidden flex flex-col justify-between">
      {/* Soft Ambient Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#EDE9FE]/70 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-[#E0F2FE]/50 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] bg-[#FEF3C7]/40 rounded-full blur-[140px]" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#8A80B8]/40 shadow-sm flex items-center justify-center bg-white p-0.5">
            <img src={logoImg} alt="Offscreen Hub Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#14171F] block">
              OFFSCREEN HUB
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#7C3AED] font-sans font-semibold block">
              Life Skills Division
            </span>
          </div>
        </div>

        {/* Return to Division Hub */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#4B5563] hover:text-[#111827] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 hover:bg-white border border-[#E5E7EB] transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Hub</span>
        </Link>
      </header>

      {/* Main Life Skills Placeholder & Coming Soon Stage */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10 my-auto">
        {/* Life Skills Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F0FF] border border-[#DDD6FE] text-[#7C3AED] text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Division Under Formulation</span>
          </motion.div>

          <SplitText
            as="h1"
            by="chars"
            immediate
            delay={0.1}
            stagger={0.05}
            text="LIFE SKILLS"
            className="text-3xl sm:text-6xl font-serif font-bold text-[#111827] tracking-tight leading-tight mb-3 sm:mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-xl text-[#4B5563] font-light leading-relaxed mb-6 sm:mb-8"
          >
            “Discover opportunities for learning, creativity and personal development.”
          </motion.p>

          {/* Elegant Coming Soon Notice Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="fx-border relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-md border border-[#DDD6FE] shadow-[0_20px_50px_rgba(138,128,184,0.12)] text-left"
          >
            <div className="flex items-center gap-3 text-sm font-semibold text-[#7C3AED] uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-[#7C3AED]" />
              <span>Coming Soon</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#111827] mb-3">
              Screen-Free Cognitive & Life Skills Development
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6">
              The Life Skills division of Offscreen Hub is currently being structured with cognitive rigor, neuro-agility methods, and screen-free developmental frameworks. Practical modules, habit workshops, and community life-skill initiatives will be announced upon formal completion.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FAF5FF] text-[#6D28D9] border border-[#E9D5FF] text-xs font-medium">
                Cognitive Foundations & Problem Solving
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FAF5FF] text-[#6D28D9] border border-[#E9D5FF] text-xs font-medium">
                Deep Focus & Memory Gym
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FAF5FF] text-[#6D28D9] border border-[#E9D5FF] text-xs font-medium">
                Emotional Resilience & Adaptability
              </span>
            </div>
          </motion.div>
        </div>

        {/* Empty Content Sections Ready for Future Use */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">
          <div className="p-6 rounded-2xl border border-dashed border-[#CBD5E1] bg-white/40 text-center flex flex-col items-center justify-center min-h-[140px]">
            <Layers className="w-6 h-6 text-[#94A3B8] mb-2" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">Module Frameworks</span>
            <span className="text-[11px] text-[#94A3B8]">Under Development</span>
          </div>

          <div className="p-6 rounded-2xl border border-dashed border-[#CBD5E1] bg-white/40 text-center flex flex-col items-center justify-center min-h-[140px]">
            <Brain className="w-6 h-6 text-[#94A3B8] mb-2" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">Practical Agility Drills</span>
            <span className="text-[11px] text-[#94A3B8]">Under Development</span>
          </div>

          <div className="p-6 rounded-2xl border border-dashed border-[#CBD5E1] bg-white/40 text-center flex flex-col items-center justify-center min-h-[140px]">
            <Shield className="w-6 h-6 text-[#94A3B8] mb-2" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-1">Community Integration</span>
            <span className="text-[11px] text-[#94A3B8]">Under Development</span>
          </div>
        </div>

        {/* Return Button */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#111827] text-white hover:bg-[#7C3AED] transition-colors text-xs uppercase tracking-wider font-semibold shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Division Selection</span>
          </Link>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] border-t border-[#E5E7EB]/60 gap-4">
        <div>
          <span className="font-serif font-semibold text-[#14171F]">Offscreen Hub</span> — Life Skills Division
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-[#111827] transition-colors">
            Division Hub
          </Link>
          <Link to="/events" className="hover:text-[#111827] transition-colors">
            Events Portal
          </Link>
          <Link to="/lifeskills" className="hover:text-[#111827] transition-colors">
            Life Skills Portal
          </Link>
          <Link to="/admin" className="hover:text-[#111827] transition-colors">
            Admin Portal
          </Link>
        </div>
      </footer>
    </div>
  );
};

