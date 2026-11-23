import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Building2, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { collaborationData } from '../data/collaboration';
import { SectionHeader, TiltCard, Reveal } from './fx';

interface CollaborationProps {
  onOpenJoinModal?: (role?: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6 text-brand-gold" />,
  Heart: <Heart className="w-6 h-6 text-brand-gold" />,
  Building2: <Building2 className="w-6 h-6 text-brand-gold" />,
};

export const Collaboration: React.FC<CollaborationProps> = ({ onOpenJoinModal }) => {
  const [active, setActive] = useState(0);

  const ctaClass =
    'relative overflow-hidden w-full py-3 rounded-full bg-white/5 hover:text-brand-dark text-brand-ivory font-semibold text-xs tracking-wider uppercase border border-white/15 hover:border-brand-gold transition-colors duration-500 flex items-center justify-center gap-2 group/cta';
  const ctaInner = (text: string) => (
    <>
      <span className="absolute inset-0 bg-gold-gradient translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      <span className="relative">{text}</span>
      <ArrowRight className="relative w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
    </>
  );

  return (
    <section id="collaborate" className="section bg-brand-darker border-t border-white/5">
      <div className="fx-aurora top-1/3 left-0 w-96 h-96 bg-brand-gold/[0.07]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Partnerships & Synergies"
          title="Why Collaborate With"
          accent="Offscreen Hub?"
          subtitle="Together, let’s create more meaningful childhoods and stronger communities through tailored offline engagement programs."
        />

        {/* Mobile / tablet path switcher */}
        <div className="lg:hidden mb-4 flex justify-center">
          <div className="inline-flex p-1 rounded-full fx-glass">
            {collaborationData.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={`relative px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors ${active === i ? 'text-brand-dark' : 'text-brand-mutedIvory'}`}
              >
                {active === i && <motion.span layoutId="collabPill" className="absolute inset-0 rounded-full bg-gold-gradient" />}
                <span className="relative">{p.pathNumber}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {collaborationData.map((path, index) => (
            <Reveal key={path.id} delay={index * 0.12} className={`${active === index ? 'block' : 'hidden'} lg:block`}>
              <TiltCard max={5} className="h-full p-6 sm:p-7 rounded-3xl fx-glass flex flex-col justify-between overflow-hidden">
                <span className="absolute -right-4 -top-6 text-[7rem] font-serif font-bold text-white/[0.03] select-none pointer-events-none">
                  0{index + 1}
                </span>
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center group-hover/tilt:scale-110 group-hover/tilt:rotate-6 transition-transform duration-500">
                      {iconMap[path.icon]}
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-gold uppercase bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-full">
                      {path.pathNumber}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-mutedIvory/70 block mb-1.5">
                    FOR {path.targetAudience.toUpperCase()}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-ivory group-hover/tilt:text-brand-goldLight transition-colors mb-3 leading-snug">
                    {path.title}
                  </h3>
                  <p className="text-sm text-brand-mutedIvory font-light leading-relaxed mb-4">{path.description}</p>

                  {path.id === 'parents' && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5 text-xs text-brand-gold font-serif italic">
                      <p className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 shrink-0" /> “How do I reduce my child’s screen time?”</p>
                      <p className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 shrink-0" /> “What activities can we enjoy together?”</p>
                      <p className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 shrink-0" /> “How can I help my child discover interests?”</p>
                    </div>
                  )}

                  <h4 className="text-[11px] font-semibold text-brand-ivory uppercase tracking-wider mb-2">Collaborative Offerings:</h4>
                  <ul className="space-y-1.5 mb-6">
                    {path.programs.map((prog, pIdx) => (
                      <motion.li
                        key={prog}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + pIdx * 0.05 }}
                        className="flex items-center gap-2 text-xs text-brand-mutedIvory"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{prog}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {onOpenJoinModal ? (
                  <button onClick={() => onOpenJoinModal(path.title)} className={ctaClass}>
                    {ctaInner(path.ctaText)}
                  </button>
                ) : (
                  <a href="#contact" className={ctaClass}>
                    {ctaInner(path.ctaText)}
                  </a>
                )}
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
