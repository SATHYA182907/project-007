import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Users, Building2, MapPin, Clock } from 'lucide-react';
import { SplitText, TiltCard, ScrollCard, ScrollTextReveal } from './fx';

import stageImg from '../assets/events/portfolio_p13_img1.jpeg'; // Stage & ceremony
import trophyImg from '../assets/events/portfolio_p13_img2.jpeg'; // Trophies & citations
import recipientsImg from '../assets/events/portfolio_p13_img3.jpeg'; // Award recipients
import audienceImg from '../assets/events/portfolio_p13_img4.jpeg'; // Audience & dignitaries

const awardPhotos = [
  {
    src: stageImg,
    title: 'Grand Stage Felicitations',
    caption: 'The inspiring main stage at Srinivasa Art & Gallery, Peelamedu, honoring women changemakers.',
    tag: 'Stage Ceremony',
  },
  {
    src: trophyImg,
    title: 'Trophies & Mementos of Honor',
    caption: 'Exquisite brass mementos and citations crafted to celebrate courage, dedication, and leadership.',
    tag: 'Trophies & Citations',
  },
  {
    src: recipientsImg,
    title: 'Honoring Exceptional Recipients',
    caption: 'Educators, healthcare pillars, and social reformers receiving recognition before an appreciative audience.',
    tag: 'Award Recipients',
  },
  {
    src: audienceImg,
    title: 'Distinguished Gathering & Audience',
    caption: 'Over 400 citizens, community leaders, and family members cheering in screen-free fellowship.',
    tag: 'Audience & Fellowship',
  },
];

export const KomagalAwardsSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<number>(0);
  const [paused, setPaused] = useState(false);

  // Gentle auto-advance; pauses while the user hovers the showcase
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActivePhoto((p) => (p + 1) % awardPhotos.length), 5000);
    return () => clearInterval(t);
  }, [paused, activePhoto]);

  const photo = awardPhotos[activePhoto];

  return (
    <section id="awards" className="section bg-brand-dark border-t border-brand-gold/20">
      <div className="fx-aurora top-1/3 left-1/3 w-[700px] h-[700px] bg-brand-gold/[0.1]" />
      <div className="fx-aurora -bottom-20 right-10 w-[500px] h-[500px] bg-brand-lavender/[0.08]" style={{ animationDelay: '-5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Photo showcase */}
        <ScrollCard variant="zoom" className="lg:col-span-7 order-2 lg:order-1">
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] border border-brand-gold/40 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.35)] bg-black">
              <AnimatePresence initial={false}>
                <motion.img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.title}
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-gold text-brand-dark text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                    {photo.tag}
                  </span>
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                    <h3 className="text-lg sm:text-2xl font-serif font-bold text-brand-ivory mb-1">{photo.title}</h3>
                    <p className="text-xs sm:text-sm text-brand-mutedIvory font-light leading-relaxed">{photo.caption}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-3">
              {awardPhotos.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-500 focus:outline-none ${
                    activePhoto === idx ? 'border-brand-gold ring-2 ring-brand-gold/40 -translate-y-1' : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
                  aria-label={p.title}
                >
                  <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                  {activePhoto === idx && !paused && (
                    <motion.span
                      key={`bar-${activePhoto}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: 'linear' }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold origin-left"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollCard>

        {/* Right: narrative */}
        <div className="lg:col-span-5 order-1 lg:order-2 space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="fx-pill"
          >
            <Trophy className="animate-bounce" />
            <span>Awards & Recognition</span>
          </motion.div>

          <SplitText
            as="h2"
            by="chars"
            stagger={0.035}
            text="Komagal Awards"
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-brand-ivory leading-[1.02]"
          />
          <SplitText
            as="p"
            delay={0.4}
            text="“Celebrating Women Who Create Change.”"
            wordClassName="fx-shimmer"
            className="text-xl sm:text-2xl font-serif italic"
          />
          <ScrollTextReveal
            className="text-sm sm:text-base text-brand-ivory leading-relaxed font-light"
            text="A prestigious signature ceremony instituted by Offscreen Hub to honor educators, healthcare workers, social reformers, and grassroot heroes who transform our world every day."
          />

          <ScrollCard variant="right">
            <TiltCard max={4} className="p-5 sm:p-6 rounded-3xl fx-glass border-brand-gold/25 space-y-3">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-brand-gold flex items-center gap-2">
                <Award className="w-4 h-4" /> The Komagal Legacy
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-brand-ivory">Lifting Up the Real Changemakers of Our Society</h3>
              <p className="text-xs text-brand-mutedIvory leading-relaxed font-light">
                In an era dominated by superficial digital acclaim, the Komagal Awards creates an authentic, dignified stage to honor tangible real-world contributions. Recipients are felicitated in front of peers, dignitaries, and families in a spirit of pure offline celebration.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-1.5 text-[11px] text-brand-gold mb-0.5"><Users className="w-3.5 h-3.5" /><span>Audience</span></div>
                  <span className="text-sm sm:text-base font-serif font-bold text-brand-ivory">400 Attendees</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-1.5 text-[11px] text-brand-gold mb-0.5"><Clock className="w-3.5 h-3.5" /><span>Engagement</span></div>
                  <span className="text-sm sm:text-base font-serif font-bold text-brand-ivory">1,600 Part-Hours</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2 text-[11px] text-brand-mutedIvory">
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" /><span>Srinivasa Art & Gallery, Peelamedu, Coimbatore</span></div>
                <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" /><span>4 Hours Immersive Screen-Free Ceremony</span></div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold/90 flex items-center gap-2 mb-2">
                  <Building2 className="w-3.5 h-3.5" /> Collaborating Institutions & Sponsors
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-[11px] font-semibold">Lead Sponsor: OSH</span>
                  {['Adissia', 'Southern Bank', 'Lions Club'].map((n) => (
                    <span key={n} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-brand-ivory text-[11px]">{n}</span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </ScrollCard>
        </div>
      </div>
    </section>
  );
};
