import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Compass, ArrowRight, Sparkles, Brain } from 'lucide-react';
import { SplitText } from '../components/fx';
import logoImg from '../assets/logo/offscreen_logo.jpg';

// Authentic event preview photos for the Events card
import p10_1 from '../assets/events/portfolio_p10_img1.jpeg'; // Walkathon
import p11_4 from '../assets/events/portfolio_p11_img4.jpeg'; // Diwali Carnival
import p12_1 from '../assets/events/portfolio_p12_img1.jpeg'; // Mom & Me
import p13_1 from '../assets/events/portfolio_p13_img1.jpeg'; // Komagal Awards

export const EntryHubPage: React.FC = () => {
  const eventPreviewImages = [
    { src: p11_4, title: 'Diwali Carnival', stat: '2,000+ Participants' },
    { src: p12_1, title: 'Mom & Me Ramp Walk', stat: 'Inclusive Celebration' },
    { src: p10_1, title: 'Kovaipudur Walkathon', stat: 'Active Community' },
    { src: p13_1, title: 'Komagal Awards', stat: 'Honoring Women' },
  ];

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen bg-[#FAF8F5] text-[#1E232B] font-sans selection:bg-[#E5C96D]/40 selection:text-[#0D0D0F] relative overflow-y-auto lg:overflow-hidden flex flex-col justify-between">
      {/* Soft Gradient Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#EDE9FE]/70 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute top-1/4 -right-24 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#E0F2FE]/60 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute -bottom-24 left-1/3 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#FFEDD5]/60 rounded-full blur-[110px] sm:blur-[150px]" />
        <div className="absolute top-2/3 right-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[#FEF3C7]/50 rounded-full blur-[90px] sm:blur-[130px]" />
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#1E232B 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Top Header / Brand Bar (Compact, Fit-To-Screen) */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-4 sm:pt-5 pb-1 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-sm flex items-center justify-center bg-white p-0.5">
            <img src={logoImg} alt="Offscreen Hub Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#14171F] block group-hover:text-[#967C29] transition-colors leading-none">
              OFFSCREEN HUB
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#6B7280] font-sans font-medium block mt-0.5">
              Digital Platform Ecosystem
            </span>
          </div>
        </div>
      </header>

      {/* Main Selection Stage (Strictly Fit to Screen) */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-2 sm:py-3 flex-1 flex flex-col justify-center items-center">
        {/* Central Brand Introduction (Compact Header) */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/80 border border-[#E5C96D]/50 shadow-xs mb-2"
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span className="text-[10px] font-semibold tracking-widest text-[#967C29] uppercase">
              Beyond the Screen, Into the Real World
            </span>
          </motion.div>

          <SplitText
            as="h1"
            by="chars"
            immediate
            delay={0.1}
            stagger={0.04}
            text="OFFSCREEN HUB"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#111827] tracking-tight leading-tight mb-1"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed max-w-xl mx-auto mb-1 line-clamp-1 sm:line-clamp-none"
          >
            “Creating meaningful offline experiences that inspire creativity, confidence, intellectual learning and well-being.”
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-[10px] sm:text-[11px] text-[#9CA3AF] tracking-wider uppercase font-medium"
          >
            Select a division to explore our real-world ecosystem
          </motion.p>
        </div>

        {/* Two Major Division Interactive Portal Cards (Fit-To-Screen Dimensions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl w-full items-stretch">
          {/* OPTION 1 — EVENTS PORTAL CARD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="fx-border group relative rounded-2xl p-5 sm:p-6 bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_15px_35px_rgba(20,24,35,0.05)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Card Glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#FEF3C7]/60 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#FFEDD5]/40 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Card Badge & Metric */}
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF5E6] border border-[#E5C96D]/40 text-[#967C29] text-[10px] font-semibold uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  <span>Division 01 • Active</span>
                </div>
                <span className="text-[11px] font-serif italic text-[#9CA3AF]">21 Events • 10,300+ Engaged</span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mb-1.5 group-hover:text-[#967C29] transition-colors leading-tight">
                EVENTS
              </h2>
              <p className="text-xs text-[#4B5563] leading-relaxed mb-4 line-clamp-2">
                “Discover experiences that bring people together, inspire creativity and create meaningful moments beyond screens.”
              </p>

              {/* Real Photographs Grid (Compact Aspect Ratio) */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {eventPreviewImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, delay: 0.45 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-xl overflow-hidden h-16 sm:h-20 group/img bg-[#E5E7EB] shadow-xs"
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2 text-white">
                      <p className="text-[10px] font-semibold leading-tight line-clamp-1">{img.title}</p>
                      <p className="text-[8.5px] text-[#E5C96D] font-mono leading-none">{img.stat}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                to="/events"
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#14171F] hover:bg-[#967C29] text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md shadow-xs"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* OPTION 2 — LIFE SKILLS PORTAL CARD (Changed from Education to Life Skills) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="fx-border group relative rounded-2xl p-5 sm:p-6 bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_15px_35px_rgba(20,24,35,0.05)] hover:shadow-[0_20px_45px_rgba(138,128,184,0.18)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Card Glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#EDE9FE]/70 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#E0F2FE]/50 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Card Badge & Metric */}
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F3F0FF] border border-[#DDD6FE] text-[#7C3AED] text-[10px] font-semibold uppercase tracking-wider">
                  <Brain className="w-3 h-3" />
                  <span>Division 02 • Coming Soon</span>
                </div>
                <span className="text-[11px] font-serif italic text-[#8A80B8] font-medium">In Formulation</span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mb-1.5 group-hover:text-[#7C3AED] transition-colors leading-tight">
                LIFE SKILLS
              </h2>
              <p className="text-xs text-[#4B5563] leading-relaxed mb-4 line-clamp-2">
                “Discover opportunities for learning, creativity and personal development.”
              </p>

              {/* Refined Abstract Visual (Matching Compact Height) */}
              <div className="relative rounded-xl overflow-hidden h-[136px] sm:h-[168px] bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE]/50 to-[#E0F2FE]/40 border border-[#DDD6FE]/60 p-3.5 flex flex-col justify-between mb-4 shadow-inner">
                {/* Abstract Geometric Rings & Orbiting Nodes */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                  <div className="w-36 h-36 rounded-full border border-[#8A80B8]/40 animate-[spin_25s_linear_infinite]" />
                  <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#4A6FA5]/50 animate-[spin_18s_linear_infinite_reverse]" />
                  <div className="absolute w-16 h-16 rounded-full border border-[#7C3AED]/40" />
                  <div className="absolute w-3 h-3 rounded-full bg-[#8A80B8]/60 blur-xs" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6D28D9]">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Cognitive & Agility Development</span>
                  </div>
                  <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-white/80 border border-[#DDD6FE] text-[#7C3AED]">
                    Future Architecture
                  </span>
                </div>

                <div className="relative z-10 space-y-1.5 max-w-xs">
                  <div className="h-1.5 w-3/4 bg-[#8A80B8]/25 rounded-full" />
                  <div className="h-1.5 w-1/2 bg-[#8A80B8]/20 rounded-full" />
                  <p className="text-[10px] font-serif italic text-[#6B7280] pt-1 leading-snug line-clamp-2">
                    Nurturing patience, concentration, and practical problem-solving beyond digital distractions.
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-[#8A80B8]/15 text-[10px] text-[#4B5563]">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Sparkles className="w-2.5 h-2.5 text-[#7C3AED]" />
                    Screen-Free Foundations
                  </span>
                  <span className="font-semibold text-[#7C3AED]">Coming Soon</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                to="/lifeskills"
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-white hover:bg-[#F5F3FF] text-[#111827] hover:text-[#7C3AED] font-medium text-xs tracking-wider uppercase border border-[#DDD6FE] transition-all duration-300 flex items-center justify-center gap-2 shadow-xs hover:shadow-sm"
              >
                <span>Explore Life Skills</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Editorial Footer (Compact, Single-Line, Fit-To-Screen) */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-5 sm:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6B7280] border-t border-[#E5E7EB]/60 gap-2 shrink-0">
        <div>
          <span className="font-serif font-semibold text-[#14171F]">Offscreen Hub</span> — Beyond the Screen, Into the Real World.
        </div>
        <div className="flex items-center gap-5">
          <Link to="/events" className="hover:text-[#111827] transition-colors">
            Events Portal
          </Link>
          <Link to="/lifeskills" className="hover:text-[#111827] transition-colors">
            Life Skills Portal
          </Link>
        </div>
      </footer>
    </div>
  );
};
