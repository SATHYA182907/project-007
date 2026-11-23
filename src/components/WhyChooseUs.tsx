import React from 'react';
import { Users, Sparkles, ClipboardCheck, Smile, Network, CheckCircle, WalletCards } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { SectionHeader, StackingCards } from './fx';

import img1 from '../assets/events/portfolio_p12_img5.jpeg';
import img2 from '../assets/events/portfolio_p11_img4.jpeg';
import img3 from '../assets/events/portfolio_p13_img1.jpeg';
import img4 from '../assets/events/portfolio_p10_img2.jpeg';
import img5 from '../assets/events/portfolio_p13_img6.jpeg';
import img6 from '../assets/events/portfolio_p14_img1.jpeg';
import img7 from '../assets/events/portfolio_p12_img1.jpeg';

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5" />,
  Smile: <Smile className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  CheckCircle: <CheckCircle className="w-5 h-5" />,
  WalletCards: <WalletCards className="w-5 h-5" />,
};

const images = [img1, img2, img3, img4, img5, img6, img7];

export const WhyChooseUs: React.FC = () => {
  const { whyChooseUs } = siteContent;

  return (
    <section id="why-us" className="section bg-brand-darker border-t border-white/5">
      <div className="fx-aurora top-1/3 left-1/4 w-[600px] h-[600px] bg-brand-gold/[0.06]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        {/* Sticky narrative column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              align="left"
              className="mb-4"
              eyebrow="Our Unmatched Commitment"
              title="Why Choose"
              accent="Us?"
              subtitle="At Offscreen Hub, we believe every event should be meaningful, engaging, and memorable. We are a professional team committed to creating unique experiences tailored to your needs."
            />
            <div className="hidden lg:flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-brand-mutedIvory/60 font-semibold">
              <span className="w-10 h-px bg-brand-gold/50" /> {whyChooseUs.length} reasons — keep scrolling
            </div>
          </div>
        </div>

        {/* Stacking cards */}
        <StackingCards className="lg:col-span-7" top={88} peek={14} gap="8vh">
          {whyChooseUs.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#141419] shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.8)] grid grid-cols-1 sm:grid-cols-5 sm:min-h-[230px]"
            >
              <div className="relative hidden sm:block sm:col-span-2 overflow-hidden">
                <img src={images[index % images.length]} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-[#141419]/30 to-[#141419]" />
                <span className="absolute left-4 bottom-2 sm:bottom-3 font-serif text-5xl sm:text-6xl font-bold text-white/80 drop-shadow-lg">0{index + 1}</span>
              </div>
              <div className="relative sm:col-span-3 p-5 sm:p-7 flex flex-col justify-between">
                <div>
                  <span className="sm:hidden absolute right-5 top-4 font-serif text-4xl font-bold text-white/10">0{index + 1}</span>
                  <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-brand-gold group-hover:text-brand-dark group-hover:-rotate-6">
                    {iconMap[item.icon]}
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-brand-ivory group-hover:text-brand-goldLight transition-colors mb-2 leading-snug">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-brand-mutedIvory font-light leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-semibold text-brand-gold uppercase tracking-wider">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" /> Proven Excellence</span>
                  <span className="font-mono text-brand-mutedIvory/50">{index + 1} / {whyChooseUs.length}</span>
                </div>
              </div>
            </article>
          ))}
        </StackingCards>
      </div>
    </section>
  );
};
