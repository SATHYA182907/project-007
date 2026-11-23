import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { ScrollProgress, SplitText } from '../components/fx';

import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ExploreJourney } from '../components/ExploreJourney';
import { EventsPortfolio } from '../components/EventsPortfolio';
import { KomagalAwardsSection } from '../components/KomagalAwardsSection';
import { StatsSection } from '../components/StatsSection';
import { PhilosophySection } from '../components/PhilosophySection';
import { GallerySection } from '../components/GallerySection';
import { SponsorsSection } from '../components/SponsorsSection';
import { Collaboration } from '../components/Collaboration';
import { JoinTeamSection } from '../components/JoinTeamSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { EventModal } from '../components/EventModal';

import type { EventItem } from '../types';
import logoImg from '../assets/logo/offscreen_logo.jpg';

/** Floating back-to-top control that appears after the hero. */
const BackToTop: React.FC = () => {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > window.innerHeight * 1.2));
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-gold-gradient text-brand-dark shadow-glow-gold flex items-center justify-center"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export const PortfolioPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fx-grain min-h-screen bg-brand-dark text-brand-ivory font-sans selection:bg-brand-gold selection:text-brand-dark overflow-x-hidden">
      {/* Cinematic Brand Entry Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-brand-dark flex flex-col items-center justify-center text-center p-4"
          >
            <div className="fx-aurora w-[420px] h-[420px] bg-brand-gold/15" />
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-20 h-20 mb-6"
            >
              <span className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,transparent,#D4AF37,transparent_60%)] animate-spin [animation-duration:1.2s]" />
              <span className="absolute inset-0 rounded-full overflow-hidden border-2 border-brand-dark">
                <img src={logoImg} alt="Offscreen Hub" className="w-full h-full object-cover" />
              </span>
            </motion.div>
            <SplitText as="h2" by="chars" immediate delay={0.1} stagger={0.03} text="OFFSCREEN HUB" className="relative text-2xl font-serif font-bold text-brand-ivory tracking-[0.3em] mb-2" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="relative text-xs font-serif italic text-brand-gold tracking-wider"
            >
              Beyond the Screen, Into the Real World
            </motion.p>
            <div className="relative mt-6 w-40 h-px bg-white/10 overflow-hidden">
              <motion.span initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 0.8, ease: 'easeInOut' }} className="absolute inset-0 bg-gold-gradient" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ScrollProgress />
          <BackToTop />

          {/* Responsive Navbar */}
          <Navbar />

          {/* Main Storytelling Page Layout — Strict Sequence */}
          <main>
            {/* 01: Hero Section */}
            <Hero />

            {/* 02: Explore Our Journey */}
            <ExploreJourney />

            {/* 04 & 05: Event Categories & Complete 21-Event Portfolio */}
            <EventsPortfolio onSelectEvent={(evt) => setSelectedEvent(evt)} />

            {/* 06: Awards & Recognition (Dedicated Komagal Awards Feature) */}
            <KomagalAwardsSection />

            {/* 07: Our Screen-Free Impact (Counters & Standards) */}
            <StatsSection />

            {/* 08: Screen-Free Philosophy */}
            <PhilosophySection />

            {/* 09: Gallery (Categorized Masonry with Nana Nani Events) */}
            <GallerySection />

            {/* 10: Sponsors & Partners (Dedicated 22+ Verified Partners) */}
            <SponsorsSection />

            {/* 11: Collaborate With Us */}
            <Collaboration />

            {/* 12: Join Our Team (Application Form with CV Upload) */}
            <JoinTeamSection />

            {/* 13: Why Choose Us */}
            <WhyChooseUs />

            {/* 14: Contact & Inquiries */}
            <ContactSection />
          </main>

          {/* 15: Footer */}
          <Footer />

          {/* Interactive Event Detail Modal */}
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        </>
      )}
    </div>
  );
};
