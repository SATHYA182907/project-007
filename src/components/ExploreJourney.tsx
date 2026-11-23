import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Users, ChevronRight, ChevronLeft, Compass, Quote } from 'lucide-react';
import { SectionHeader, ScrollCard } from './fx';

import jWalkathon from '../assets/events/portfolio_p10_img1.jpeg';
import jDiwali from '../assets/events/portfolio_p11_img4.jpeg';
import jMomMe from '../assets/events/portfolio_p12_img1.jpeg';
import jKomagal from '../assets/events/portfolio_p13_img1.jpeg';
import jNanaNani from '../assets/events/portfolio_p13_img6.jpeg';
import jMarathon from '../assets/events/portfolio_p14_img1.jpeg';
import jBrainGym from '../assets/events/portfolio_p10_img3.jpeg';

interface Milestone {
  id: string;
  year: string;
  chapter: string;
  title: string;
  location: string;
  participants: string;
  screenTime: string;
  story: string;
  image: string;
  keyTakeaway: string;
}

export const ExploreJourney: React.FC = () => {
  const milestones: Milestone[] = [
    {
      id: 'genesis',
      year: 'Phase 1',
      chapter: 'The Spark',
      title: 'Brain Gym Foundations in Schools',
      location: 'Shrishti & Vasavi Vidyala, Selvapuram',
      participants: '100+ Students',
      screenTime: '300 Screen-Free Hours',
      story: 'Offscreen Hub began with a vital realization: modern classrooms and homes are saturated with glowing rectangles. We introduced physical neuro-drills, bilateral coordination puzzles, and tactile challenges directly to schools to reignite natural curiosity and focus.',
      image: jBrainGym,
      keyTakeaway: 'Proving that hands-on physical engagement elevates attention spans faster than passive screen instruction.',
    },
    {
      id: 'walkathon',
      year: 'Phase 2',
      chapter: 'Community Wellness',
      title: 'Kovaipudur Walkathon',
      location: 'Kovaipudur, Coimbatore',
      participants: '300 Participants',
      screenTime: '1,500 Participant-Hours',
      story: 'Taking our mission into open streets, we rallied 300 citizens and senior residents for a 5-hour screen-free walkathon sponsored by Vedanta. Neighbors reconnected, children paced beside grandparents, and screen fatigue was replaced by brisk outdoor vigor.',
      image: jWalkathon,
      keyTakeaway: 'The beginning of multi-generational outdoor mobilization across Coimbatore neighborhoods.',
    },
    {
      id: 'carnival',
      year: 'Phase 3',
      chapter: 'The Mega Convergence',
      title: 'Diwali Carnival Festival',
      location: 'Kovaipudur Grounds',
      participants: '2,000+ Floating Crowd',
      screenTime: '6,000 Participant-Hours',
      story: 'A signature breakthrough. Over 2,000 residents gathered for traditional folk games, screen-free music, craft stalls, and spontaneous cultural dance. Families spent the entire evening immersed in laughter without glancing at smartphones.',
      image: jDiwali,
      keyTakeaway: 'Validated that communities crave real-world festive connection when given rich, interactive offline alternatives.',
    },
    {
      id: 'inclusive',
      year: 'Phase 4',
      chapter: 'Unconditional Dignity',
      title: 'Mom & Me — Inclusive Ramp Walk',
      location: 'Sri Maruti Gana Sabha, RS Puram',
      participants: '900 Participants',
      screenTime: '4,500 Participant-Hours',
      story: 'Partnering with Abhirami Hospital and Koumaram Prashanti, we created a compassionate stage where children on the autism spectrum walked with their mothers. It redefined what public celebration means: courage, tearful applause, and total social inclusion.',
      image: jMomMe,
      keyTakeaway: 'Demonstrated that screen-free spaces cultivate deep empathy and break social barriers with grace.',
    },
    {
      id: 'komagal',
      year: 'Phase 5',
      chapter: 'Honoring Leaders',
      title: 'Komagal Awards Ceremony',
      location: 'Srinivasa Art & Gallery, Peelamedu',
      participants: '400 Dignitaries & Awardees',
      screenTime: '1,600 Participant-Hours',
      story: 'Instituted to honor extraordinary women making quiet, monumental differences in society. Supported by Southern Bank and Lions Club, the 4-hour ceremony celebrated educators, healthcare pillars, and social reformers on an inspiring physical stage.',
      image: jKomagal,
      keyTakeaway: 'Anchoring Offscreen Hub as a patron of social changemakers and women empowerment.',
    },
    {
      id: 'nananani',
      year: 'Phase 6',
      chapter: 'Elder Fellowship',
      title: 'Onam & Senior Sangamam Celebrations',
      location: 'Ananya’s Nana Nani & Grand Regent',
      participants: '1,300+ Senior Citizens',
      screenTime: '4,900 Participant-Hours',
      story: 'Elder isolation is a silent crisis in the digital age. Our grand Onam pookalam and Senior Sangamam brought over a thousand senior citizens together for music, storytelling circles, memory games, and warm companionship in a dignified atmosphere.',
      image: jNanaNani,
      keyTakeaway: 'Showing that screen-free experiences nourish emotional wellness and vitality for older adults.',
    },
    {
      id: 'marathon',
      year: 'Phase 7',
      chapter: 'City-Wide Movement',
      title: 'Komagal Marathon at Racecourse',
      location: 'Racecourse Road, Coimbatore',
      participants: '1,800+ Runners',
      screenTime: '7,200 Participant-Hours',
      story: 'In collaboration with Decathlon, Nirmala College, and Thai Ullam Trust, 1,800 runners took to the streets in early dawn. The marathon proved that Offscreen Hub’s message of vitality and mindful living has become a celebrated regional institution.',
      image: jMarathon,
      keyTakeaway: 'A city-scale demonstration of collective stamina and real-world health.',
    },
  ];

  const [activeIdx, setActiveIdx] = useState(2); // Diwali Carnival default
  const [direction, setDirection] = useState(1);
  const activeMilestone = milestones[activeIdx];

  const go = (idx: number) => {
    const next = (idx + milestones.length) % milestones.length;
    setDirection(next > activeIdx ? 1 : -1);
    setActiveIdx(next);
  };

  return (
    <section id="explore-journey" className="section bg-brand-dark text-brand-ivory">
      <div className="fx-aurora top-0 left-1/3 w-[600px] h-[600px] bg-brand-gold/[0.07]" />
      <div className="fx-aurora bottom-0 right-10 w-[500px] h-[500px] bg-brand-lavender/[0.07]" style={{ animationDelay: '-6s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          align="left"
          icon={<Compass />}
          eyebrow="Our Evolution"
          title="Explore Our"
          accent="Journey"
          subtitle="From quiet classroom brain gym experiments to city-scale movements with thousands of participants, experience the story of Offscreen Hub through real photographs and measurable milestones."
          aside={
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-brand-mutedIvory">
                <span className="text-2xl font-serif font-bold text-brand-gold">{String(activeIdx + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                {String(milestones.length).padStart(2, '0')}
              </span>
              <button onClick={() => go(activeIdx - 1)} aria-label="Previous milestone" className="w-10 h-10 rounded-full fx-glass hover:border-brand-gold/50 flex items-center justify-center hover:text-brand-gold transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => go(activeIdx + 1)} aria-label="Next milestone" className="w-10 h-10 rounded-full bg-gold-gradient text-brand-dark flex items-center justify-center shadow-glow-gold hover:scale-105 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          }
        />

        {/* Timeline rail with animated progress line */}
        <div className="mb-6 sm:mb-8 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="relative min-w-[880px] lg:min-w-0">
            <div className="absolute left-0 right-0 top-[7px] h-px bg-white/10" />
            <motion.div
              className="absolute left-0 top-[7px] h-px bg-gold-gradient shadow-glow-gold"
              animate={{ width: `${(activeIdx / (milestones.length - 1)) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="relative flex justify-between">
              {milestones.map((m, idx) => {
                const isActive = idx === activeIdx;
                const isPast = idx < activeIdx;
                return (
                  <button key={m.id} onClick={() => go(idx)} className="group flex flex-col items-center text-center focus:outline-none w-[120px]">
                    <span className="relative w-[15px] h-[15px] flex items-center justify-center">
                      {isActive && <motion.span layoutId="journeyDot" className="absolute -inset-1.5 rounded-full border border-brand-gold/60" />}
                      <span className={`w-[9px] h-[9px] rounded-full transition-all duration-300 ${isActive ? 'bg-brand-gold shadow-glow-gold scale-125' : isPast ? 'bg-brand-gold/70' : 'bg-white/20 group-hover:bg-white/50'}`} />
                    </span>
                    <span className={`mt-2.5 text-[9px] uppercase font-mono tracking-wider transition-colors ${isActive ? 'text-brand-gold' : 'text-brand-gold/50'}`}>{m.year}</span>
                    <span className={`text-xs font-serif whitespace-nowrap transition-colors ${isActive ? 'text-brand-ivory' : 'text-brand-mutedIvory/50 group-hover:text-brand-mutedIvory'}`}>{m.chapter}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Milestone Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
          <ScrollCard variant="left" className="lg:col-span-7">
          <div className="relative h-full rounded-3xl overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[400px] border border-white/10 shadow-2xl bg-black">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeMilestone.id}
                custom={direction}
                initial={{ clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', scale: 1.15 }}
                animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
              >
                <img src={activeMilestone.image} alt={activeMilestone.title} className="w-full h-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
            <span className="absolute top-3 right-4 text-6xl sm:text-8xl font-serif font-bold text-white/[0.08] select-none pointer-events-none">
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-brand-ivory">
              <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-medium text-[11px] sm:text-xs">
                <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">{activeMilestone.location}</span>
              </span>
              <span className="bg-brand-gold text-brand-dark px-3 py-1.5 rounded-full font-bold text-[10px] sm:text-[11px] shrink-0">{activeMilestone.participants}</span>
            </div>
          </div>
          </ScrollCard>

          <ScrollCard variant="right" className="lg:col-span-5">
          <div className="h-full rounded-3xl fx-glass p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.id}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } }, exit: { opacity: 0, transition: { duration: 0.2 } } }}
                className="space-y-4"
              >
                {[
                  <div key="tag" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-brand-gold/20 text-xs text-brand-gold font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeMilestone.year} • {activeMilestone.chapter}</span>
                  </div>,
                  <h3 key="t" className="text-2xl sm:text-3xl font-serif font-bold text-brand-ivory leading-snug">{activeMilestone.title}</h3>,
                  <p key="s" className="text-sm text-brand-mutedIvory leading-relaxed font-light">{activeMilestone.story}</p>,
                  <div key="m" className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <div className="flex items-center gap-1.5 text-[11px] text-brand-gold font-semibold mb-0.5"><Users className="w-3.5 h-3.5" /><span>Audience</span></div>
                      <span className="text-sm font-serif font-bold text-brand-ivory">{activeMilestone.participants}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <div className="flex items-center gap-1.5 text-[11px] text-brand-gold font-semibold mb-0.5"><Sparkles className="w-3.5 h-3.5" /><span>Screen-Free Value</span></div>
                      <span className="text-sm font-serif font-bold text-brand-ivory">{activeMilestone.screenTime}</span>
                    </div>
                  </div>,
                  <div key="k" className="relative p-4 pl-10 rounded-xl bg-gradient-to-r from-brand-gold/15 to-transparent border-l-2 border-brand-gold">
                    <Quote className="absolute left-3 top-4 w-4 h-4 text-brand-gold/70" />
                    <span className="text-[10px] font-semibold text-brand-gold uppercase tracking-wider block mb-1">Historical Significance</span>
                    <p className="text-xs text-brand-ivory/90 leading-relaxed italic">“{activeMilestone.keyTakeaway}”</p>
                  </div>,
                ].map((el, i) => (
                  <motion.div key={i} variants={{ hidden: { opacity: 0, y: 16, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}>
                    {el}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => go(activeIdx + 1)}
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand-gold hover:text-brand-goldLight transition-colors group self-start"
            >
              <span>Explore Next Milestone</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          </ScrollCard>
        </div>
      </div>
    </section>
  );
};
