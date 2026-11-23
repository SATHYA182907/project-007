import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonitorX, Sparkles, CheckCircle2 } from 'lucide-react';
import { SectionHeader, Reveal } from './fx';
import realWorldImg from '../assets/events/portfolio_p10_img2.jpeg'; // Children's Day joyful real-world moment

const pillars = [
  'Imagine & Dream Freely',
  'Build Hands-On Realities',
  'Communicate with Confidence',
  'Collaborate in Teams',
  'Discover Unique Human Potential',
];

export const PhilosophySection: React.FC = () => {
  const [toggleState, setToggleState] = useState<'screen' | 'real'>('real');

  return (
    <section id="philosophy" className="section bg-brand-dark border-t border-white/5">
      <div className="fx-aurora top-1/2 left-0 w-96 h-96 bg-brand-gold/[0.07]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: narrative */}
        <div className="lg:col-span-6">
          <SectionHeader
            align="left"
            className="mb-6"
            eyebrow="The Problem / The Purpose"
            title="What Childhood Are"
            accent="We Building?"
            subtitle="In a world where screens occupy more time than playgrounds, and scrolling often replaces exploring, children deserve spaces that help them reconnect with creativity, curiosity, confidence, and real human connection."
          />

          <Reveal delay={0.15}>
            <div className="p-5 sm:p-6 rounded-3xl fx-glass border-brand-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-lg sm:text-xl font-serif font-semibold text-brand-gold mb-2">Beyond Digital Overload</h3>
              <p className="text-sm text-brand-mutedIvory leading-relaxed mb-4">
                Offscreen Hub creates meaningful offline experiences thoughtfully designed to support every child’s creativity, life skills, emotional well-being, and overall development.
              </p>
              <ul className="flex flex-wrap gap-2">
                {pillars.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-brand-gold/40 transition-colors text-xs text-brand-ivory font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-gold/15 via-brand-gold/5 to-transparent border-l-4 border-brand-gold">
              <p className="text-base sm:text-lg font-serif italic text-brand-ivory">
                “The best childhood memories are made through experiences — not screens.”
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right: Screen vs Real toggle */}
        <Reveal className="lg:col-span-6 flex flex-col items-center" x={30} y={0}>
          <div className="relative flex items-center p-1 rounded-full fx-glass mb-4">
            {(['screen', 'real'] as const).map((k) => (
              <button
                key={k}
                onClick={() => setToggleState(k)}
                className={`relative px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  toggleState === k ? (k === 'real' ? 'text-brand-dark' : 'text-red-200') : 'text-brand-mutedIvory hover:text-white'
                }`}
              >
                {toggleState === k && (
                  <motion.span
                    layoutId="philoToggle"
                    className={`absolute inset-0 rounded-full ${k === 'real' ? 'bg-gold-gradient shadow-glow-gold' : 'bg-red-500/25 border border-red-500/40'}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{k === 'screen' ? 'Screen Time (Passive)' : 'Real-World Time (OSH)'}</span>
              </button>
            ))}
          </div>

          <div className="w-full h-80 sm:h-[26rem] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl bg-slate-950">
            <AnimatePresence initial={false}>
              {toggleState === 'screen' ? (
                <motion.div
                  key="screen"
                  initial={{ clipPath: 'circle(0% at 0% 50%)' }}
                  animate={{ clipPath: 'circle(150% at 0% 50%)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_3px)]" />
                  <motion.div
                    animate={{ x: [0, -2, 2, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.4, repeatDelay: 2 }}
                    className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6"
                  >
                    <MonitorX className="w-10 h-10 text-red-400" />
                  </motion.div>
                  <h4 className="text-xl font-serif text-red-200 mb-2">Screen Addiction & Isolation</h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
                    Endless scrolling, reduced attention span, lack of physical movement, emotional fatigue, and social isolation.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="real"
                  initial={{ clipPath: 'circle(0% at 100% 50%)' }}
                  animate={{ clipPath: 'circle(150% at 100% 50%)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 group"
                >
                  <img src={realWorldImg} alt="Real-World Offscreen Activity" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3 h-3" /> Offscreen Experience
                    </div>
                    <h4 className="text-xl font-serif text-brand-ivory font-bold mb-1">Active Hands-On Exploration</h4>
                    <p className="text-xs text-brand-mutedIvory">Laughter, teamwork, tactile creativity, real friendships, and lasting confidence.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-[10px] text-brand-gold/80 font-semibold uppercase tracking-[0.3em] mt-4">SCREEN TIME → REAL-WORLD TIME</p>
        </Reveal>
      </div>
    </section>
  );
};
