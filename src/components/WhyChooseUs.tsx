import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, ClipboardCheck, Smile, Network, CheckCircle, WalletCards } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { SectionHeader, TiltCard } from './fx';
import featureImg from '../assets/events/portfolio_p12_img5.jpeg';

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5" />,
  Smile: <Smile className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  WalletCards: <WalletCards className="w-5 h-5" />,
};

export const WhyChooseUs: React.FC = () => {
  const { whyChooseUs } = siteContent;

  return (
    <section id="why-us" className="section bg-brand-darker border-t border-white/5">
      <div className="fx-aurora top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/[0.06]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          align="left"
          eyebrow="Our Unmatched Commitment"
          title="Why Choose"
          accent="Us?"
          subtitle="At Offscreen Hub, we believe every event should be meaningful, engaging, and memorable. We are a professional team committed to creating unique experiences tailored to your needs."
        />
      </div>

      {/* Swipe rail on mobile, bento grid on desktop */}
      <div className="relative z-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="fx-rail gap-3 px-4 pb-2 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 sm:overflow-visible">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`w-[78vw] max-w-[300px] shrink-0 sm:w-auto sm:max-w-none ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''} ${index >= 5 ? 'lg:col-span-2' : ''}`}
              style={{ transformPerspective: 1000 }}
            >
              <TiltCard
                max={6}
                className={`h-full rounded-3xl fx-glass overflow-hidden flex flex-col justify-between ${index === 0 ? 'p-6 sm:p-8 bg-gradient-to-br from-brand-gold/15 via-transparent to-transparent border-brand-gold/30' : 'p-5'}`}
              >
                {index === 0 && (
                  <>
                    <img src={featureImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover/tilt:opacity-40 group-hover/tilt:scale-105 transition-all duration-[1.2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101015] via-[#101015]/70 to-[#101015]/20" />
                  </>
                )}
                <span className="absolute right-4 top-3 font-serif text-4xl font-bold text-white/[0.05] select-none">0{index + 1}</span>
                <div className="relative">
                  <div
                    className={`rounded-2xl border flex items-center justify-center mb-4 text-brand-gold transition-all duration-500 group-hover/tilt:bg-brand-gold group-hover/tilt:text-brand-dark group-hover/tilt:rotate-[-8deg] ${
                      index === 0 ? 'w-14 h-14 bg-brand-gold/15 border-brand-gold/40' : 'w-11 h-11 bg-white/5 border-white/10'
                    }`}
                  >
                    {iconMap[item.icon]}
                  </div>
                  <h3 className={`font-serif font-bold text-brand-ivory group-hover/tilt:text-brand-goldLight transition-colors mb-2 leading-snug ${index === 0 ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-brand-mutedIvory font-light leading-relaxed ${index === 0 ? 'text-sm sm:text-base max-w-md' : 'text-xs'}`}>{item.description}</p>
                </div>
                <div className="relative pt-4 mt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-semibold text-brand-gold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" /> Proven Excellence
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
