import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollCard, SectionHeader, Marquee, Magnetic } from './fx';
import { Building2, Handshake, ArrowUpRight, ChevronDown } from 'lucide-react';

interface Partner {
  name: string;
  category: 'Corporate & Real Estate' | 'Healthcare & Wellness' | 'Education & Youth' | 'Civic & Community' | 'Retail & Hospitality' | 'Arts & Culture';
  role: string;
}

export const SponsorsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);

  const partnersList: Partner[] = [
    { name: 'Vedanta', category: 'Corporate & Real Estate', role: 'Sponsor (Walkathon, Community Projects & Senior Sangamam)' },
    { name: 'Ananya’s Nana Nani', category: 'Corporate & Real Estate', role: 'Sponsor (Women’s Day 2025 & 2026, Onam Celebrations)' },
    { name: 'Abhirami Hospital', category: 'Healthcare & Wellness', role: 'Lead Sponsor (“Mom & Me” Inclusive Ramp Walk)' },
    { name: 'Alveal Mall', category: 'Retail & Hospitality', role: 'Sponsor (Workshops, Ramp Walk & Let’s Dance)' },
    { name: 'Ganapathi Silks', category: 'Retail & Hospitality', role: 'Sponsor (Public Brain Gym Workshops in Townhall)' },
    { name: 'Kids.com', category: 'Education & Youth', role: 'Sponsor (Children’s Day Celebration, Kuniyamuthur)' },
    { name: 'Decathlon', category: 'Healthcare & Wellness', role: 'Collaborating Partner (Komagal Marathon at Racecourse)' },
    { name: 'Adissia', category: 'Civic & Community', role: 'Partner (Mom & Me, Komagal Awards & Pet Ramp Walk)' },
    { name: 'Southern Bank', category: 'Corporate & Real Estate', role: 'Collaborating Partner (Komagal Awards Ceremony)' },
    { name: 'Lions Club', category: 'Civic & Community', role: 'Collaborating Partner (Komagal Awards Ceremony)' },
    { name: 'Koumaram Prashanti', category: 'Healthcare & Wellness', role: 'Partner (Autism & Special Needs Support)' },
    { name: 'Annabrahma', category: 'Retail & Hospitality', role: 'Collaborating Partner (Kovaipudur Walkathon)' },
    { name: 'SADC', category: 'Arts & Culture', role: 'Collaborating Partner (Diwali Carnival)' },
    { name: 'Strumps & Hums', category: 'Arts & Culture', role: 'Collaborating Partner (Diwali Carnival Music)' },
    { name: 'Flying Moves', category: 'Arts & Culture', role: 'Collaborating Partner (Diwali Carnival Dance)' },
    { name: 'KSA Sports Academy', category: 'Healthcare & Wellness', role: 'Sponsor (Women’s Badminton Tournament)' },
    { name: 'Bow Bow Bliss', category: 'Civic & Community', role: 'Collaborating Partner (Pet Ramp Walk, Kalapatti)' },
    { name: 'NPR Jewelry', category: 'Retail & Hospitality', role: 'Sponsor (Republic Day Drawing Competition)' },
    { name: 'Thoorigai Academy', category: 'Education & Youth', role: 'Collaborating Partner (Art & Drawing Competition)' },
    { name: 'Ashram School', category: 'Education & Youth', role: 'Collaborating Partner (Dhandiya Event, Kovaipudur)' },
    { name: 'Nirmala College', category: 'Education & Youth', role: 'Collaborating Partner (Komagal Marathon)' },
    { name: 'Thai Ullam Trust', category: 'Civic & Community', role: 'Collaborating Partner (Komagal Marathon)' },
    { name: 'Mudcups', category: 'Retail & Hospitality', role: 'Sponsor (Valentine’s Day Youth Session)' },
  ];

  const categories = [
    'All',
    'Corporate & Real Estate',
    'Healthcare & Wellness',
    'Education & Youth',
    'Civic & Community',
    'Retail & Hospitality',
    'Arts & Culture',
  ];

  const filteredPartners = selectedCategory === 'All'
    ? partnersList
    : partnersList.filter((p) => p.category === selectedCategory);

  const PREVIEW = 8;
  const visiblePartners = showAll ? filteredPartners : filteredPartners.slice(0, PREVIEW);
  const half = Math.ceil(partnersList.length / 2);

  const nameChip = (p: Partner) => (
    <span key={p.name} className="shrink-0 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-sm sm:text-base font-serif font-semibold text-brand-ivory/80 hover:text-brand-gold hover:border-brand-gold/40 transition-colors whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/70" />
      {p.name}
    </span>
  );

  return (
    <section id="sponsors" className="section bg-brand-dark border-t border-white/5">
      <div className="fx-aurora top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-gold/[0.06]" />
      <div className="fx-aurora bottom-10 left-10 w-[500px] h-[500px] bg-brand-lavender/[0.06]" style={{ animationDelay: '-4s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          align="left"
          className="mb-6"
          icon={<Handshake />}
          eyebrow="Partners in Purpose"
          title="Our Sponsors"
          accent="& Partners"
          subtitle="We are proud to collaborate with esteemed institutions, visionary brands, healthcare leaders, and educational pillars who champion screen-free community vitality."
        />
      </div>

      {/* Dual-direction partner marquee */}
      <div className="relative z-10 space-y-3 mb-8">
        <Marquee speed={55}>{partnersList.slice(0, half).map(nameChip)}</Marquee>
        <Marquee speed={60} reverse>{partnersList.slice(half).map(nameChip)}</Marquee>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-5 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex items-center gap-0.5 p-1 rounded-full fx-glass">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAll(false);
                }}
                className={`relative px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  selectedCategory === cat ? 'text-brand-dark' : 'text-brand-mutedIvory hover:text-brand-ivory'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.span layoutId="sponsorPill" className="absolute inset-0 rounded-full bg-gold-gradient shadow-glow-gold" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Compact typography-first partner grid (no fake logos) */}
        <ScrollCard variant="tilt">
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {visiblePartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: (index % PREVIEW) * 0.035, ease: [0.16, 1, 0.3, 1] }}
                className="fx-border group relative p-4 sm:p-5 rounded-2xl fx-glass hover:-translate-y-1 transition-transform duration-500 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-brand-gold/0 group-hover:bg-brand-gold/15 blur-2xl transition-colors duration-700" />
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[8.5px] sm:text-[9.5px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-brand-gold/90 leading-tight">
                      {partner.category}
                    </span>
                    <Building2 className="w-3.5 h-3.5 shrink-0 text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                  </div>
                  <h3 className="text-base sm:text-xl font-serif font-bold text-brand-ivory group-hover:text-brand-goldLight transition-colors leading-tight">
                    {partner.name}
                  </h3>
                </div>
                <p className="pt-2 mt-2 border-t border-white/5 text-[10.5px] sm:text-xs text-brand-mutedIvory/80 font-light leading-relaxed">{partner.role}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        </ScrollCard>

        {filteredPartners.length > PREVIEW && (
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full fx-glass hover:border-brand-gold/50 text-xs font-semibold uppercase tracking-wider text-brand-ivory transition-colors"
            >
              <span>{showAll ? 'Show fewer partners' : `View all ${filteredPartners.length} partners`}</span>
              <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
            </button>
          </div>
        )}

        {/* Sponsor CTA */}
        <div className="mt-8 relative p-6 sm:p-8 rounded-3xl overflow-hidden border border-brand-gold/30 bg-gradient-to-br from-brand-gold/15 via-brand-card to-brand-card flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-brand-gold/20 blur-3xl pointer-events-none" />
          <div className="relative space-y-1.5 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-wider text-brand-gold">CSR & Brand Partnerships</span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-brand-ivory">Partner With Offscreen Hub</h4>
            <p className="text-xs sm:text-sm text-brand-mutedIvory font-light max-w-lg">
              Amplify your social impact by supporting authentic, screen-free experiences for families, students, and senior citizens.
            </p>
          </div>
          <Magnetic className="relative shrink-0">
            <a
              href="#collaborate"
              className="px-6 py-3.5 rounded-full bg-gold-gradient text-brand-dark font-semibold text-xs tracking-wider uppercase shadow-glow-gold hover:shadow-[0_0_45px_-5px_rgba(212,175,55,0.7)] transition-shadow duration-300 whitespace-nowrap flex items-center gap-2 group"
            >
              <span>Start a Partnership</span>
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};
