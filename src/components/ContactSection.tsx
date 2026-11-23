import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { SplitText, TiltCard, Magnetic } from './fx';
import bgImg from '../assets/events/portfolio_p10_img1.jpeg';

interface ContactSectionProps {
  onOpenJoinModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenJoinModal }) => {
  const { contact } = siteContent;

  const methods = [
    { href: `tel:${contact.phone}`, icon: <Phone className="w-5 h-5 text-brand-gold" />, label: 'CALL DIRECTLY', value: contact.phone, big: true },
    { href: `mailto:${contact.email}`, icon: <Mail className="w-5 h-5 text-brand-gold" />, label: 'EMAIL US', value: contact.email, big: false },
  ];

  const ctaClass =
    'relative overflow-hidden inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gold-gradient text-brand-dark font-bold text-xs sm:text-sm uppercase tracking-widest shadow-glow-gold hover:shadow-[0_0_50px_-5px_rgba(212,175,55,0.75)] transition-shadow duration-300 group';

  return (
    <section id="contact" className="section bg-brand-dark border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <motion.img
          src={bgImg}
          alt="Offscreen Hub Event Background"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-brand-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark" />
        <div className="fx-aurora top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-gold/[0.12]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="fx-pill mb-5">
          <Sparkles />
          <span>Start the Conversation</span>
        </motion.div>

        <h2 className="text-4xl sm:text-6xl font-serif font-bold text-brand-ivory mb-4 leading-[1.05]">
          <SplitText as="span" text="Let’s Build Screen-Free Time" className="block" />
          <SplitText as="span" text="Together." delay={0.3} by="chars" wordClassName="fx-shimmer" className="block" />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto text-sm sm:text-lg text-brand-mutedIvory font-light leading-relaxed mb-8"
        >
          Together, let’s create more meaningful childhoods and stronger communities across schools, families, and organizations.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          {methods.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }}
            >
              <TiltCard max={6} className="rounded-2xl fx-glass border-brand-gold/25">
                <a href={m.href} className="p-5 flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-4 text-left min-w-0">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      {m.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest block">{m.label}</span>
                      <span className={`font-serif font-bold text-brand-ivory group-hover:text-brand-gold transition-colors block truncate ${m.big ? 'text-xl' : 'text-sm sm:text-base'}`}>
                        {m.value}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-brand-gold group-hover:rotate-45 transition-transform duration-300" />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <Magnetic>
          {onOpenJoinModal ? (
            <button onClick={onOpenJoinModal} className={ctaClass}>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <span className="relative">Collaborate With Us Now</span>
            </button>
          ) : (
            <a href="#collaborate" className={ctaClass}>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <span className="relative">Collaborate With Us Now</span>
              <ArrowUpRight className="relative w-4 h-4" />
            </a>
          )}
        </Magnetic>
      </div>
    </section>
  );
};
