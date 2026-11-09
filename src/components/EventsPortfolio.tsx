import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eventsData, EVENT_CATEGORIES, TARGET_AUDIENCES } from '../data/events';
import { EventCard } from './EventCard';
import type { EventItem, EventCategory, TargetAudience } from '../types';
import { Layers, Filter, Award, ChevronRight, ChevronLeft, Compass } from 'lucide-react';

// Register GSAP ScrollTrigger plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EventsPortfolioProps {
  onSelectEvent: (event: EventItem) => void;
}

export const EventsPortfolio: React.FC<EventsPortfolioProps> = ({ onSelectEvent }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeAudience, setActiveAudience] = useState<string>('All');
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const categories = ['All', ...EVENT_CATEGORIES];
  const audiences = ['All', ...TARGET_AUDIENCES];

  const filteredEvents = eventsData.filter((evt) => {
    const matchesCategory =
      activeCategory === 'All' ||
      (evt.categories && evt.categories.includes(activeCategory as EventCategory)) ||
      evt.category === activeCategory;

    const matchesAudience =
      activeAudience === 'All' ||
      (evt.targetAudiences && evt.targetAudiences.includes(activeAudience as TargetAudience));

    return matchesCategory && matchesAudience;
  });

  // Calculate dynamic horizontal scroll distance based on actual content width
  const getScrollAmount = () => {
    if (!trackRef.current) return 0;
    // Calculate total track width minus viewport width plus generous end margin
    const totalWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    return Math.max(0, totalWidth - viewportWidth + 80);
  };

  // GSAP ScrollTrigger setup
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Create horizontal scroll animation bound to vertical scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1.2, // Silk-smooth interpolation
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Translate the single horizontal row from right to left as user scrolls down
      tl.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });
    }, sectionRef);

    // Refresh ScrollTrigger after DOM layout calculations
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [filteredEvents.length, activeCategory, activeAudience]);

  // Refresh ScrollTrigger on window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Quick jump helpers (smooth programmatic scroll)
  const handleScrollByCards = (direction: 'prev' | 'next') => {
    if (!sectionRef.current) return;
    const scrollAmount = 350 * (direction === 'next' ? 1 : -1);
    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full h-screen max-h-screen bg-brand-dark text-brand-ivory border-t border-white/5 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-brand-lavender/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Section Header & Filter Controls */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-2 z-10 shrink-0">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-brand-ivory tracking-tight">
              Our Events & Initiatives
            </h2>
            <span className="hidden md:inline-block text-xs text-brand-gold/80 font-mono">
              ✦ 21 Verified Initiatives
            </span>
          </div>

          {/* Interactive Navigation Helpers & Metric Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-brand-mutedIvory font-mono">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              <span>
                {Math.min(filteredEvents.length, Math.max(1, Math.round(scrollProgress * (filteredEvents.length - 1)) + 1))} of {filteredEvents.length} Cards
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleScrollByCards('prev')}
                className="w-7 h-7 rounded-full glass-card border border-white/10 hover:border-brand-gold/50 flex items-center justify-center text-brand-ivory hover:text-brand-gold transition-colors"
                title="Scroll previous"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleScrollByCards('next')}
                className="w-7 h-7 rounded-full glass-card border border-white/10 hover:border-brand-gold/50 flex items-center justify-center text-brand-ivory hover:text-brand-gold transition-colors"
                title="Scroll next"
                aria-label="Next card"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Unified Sleek Filter Bar: Categories + Audience Dropdown */}
        <div className="flex items-center justify-between gap-3">
          {/* 8 Official Event Categories Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1 min-w-0">
            <div className="flex items-center gap-1 shrink-0 text-[11px] text-brand-gold font-semibold uppercase tracking-wider mr-1">
              <Filter className="w-3 h-3" />
              <span className="hidden sm:inline">Category:</span>
            </div>
            <div className="inline-flex items-center gap-1 p-0.5 rounded-xl glass-card border border-white/10 shadow-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-gold-gradient text-brand-dark shadow-glow-gold'
                      : 'text-brand-mutedIvory hover:text-brand-ivory hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Target Audience Dropdown Selector */}
          <div className="shrink-0 flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1 text-xs hover:border-brand-gold/40 transition-colors">
            <span className="text-[10px] uppercase font-semibold text-brand-gold tracking-wider hidden sm:inline">
              Audience:
            </span>
            <select
              value={activeAudience}
              onChange={(e) => setActiveAudience(e.target.value)}
              className="bg-transparent text-brand-ivory text-xs focus:outline-none cursor-pointer pr-1"
            >
              {audiences.map((aud) => (
                <option key={aud} value={aud} className="bg-brand-card text-brand-ivory">
                  {aud === 'All' ? 'All Audiences' : aud}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Awards Feature Banner (if filtering by Awards) */}
        {activeCategory === 'Awards' && (
          <div className="mt-2 p-2.5 rounded-xl glass-card border border-brand-gold/30 bg-brand-gold/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-brand-ivory">
              <Award className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Looking for our dedicated Awards presentation? Explore the Komagal Awards feature below.</span>
            </div>
            <a
              href="#awards"
              className="px-2.5 py-1 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-wider whitespace-nowrap hover:bg-brand-goldLight transition-colors"
            >
              Go to Awards
            </a>
          </div>
        )}
      </div>

      {/* Main Single Horizontal Row Strip (GSAP ScrollTrigger Pinned Target) */}
      <div className="relative w-full flex-1 min-h-0 flex items-center overflow-hidden py-3 sm:py-6">
        <div
          ref={trackRef}
          className="flex flex-nowrap items-stretch gap-5 sm:gap-6 px-6 sm:px-12 will-change-transform"
        >
          {filteredEvents.map((event, idx) => (
            <EventCard
              key={event.id}
              event={event}
              index={idx}
              className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0"
              onSelectEvent={onSelectEvent}
            />
          ))}

          {/* Empty State Card if no events match */}
          {filteredEvents.length === 0 && (
            <div className="w-[320px] sm:w-[380px] p-8 text-center glass-card rounded-2xl border border-white/10 shrink-0 flex flex-col items-center justify-center">
              <Layers className="w-10 h-10 text-brand-gold mb-4" />
              <h4 className="text-base font-serif font-bold text-brand-ivory mb-1">No Matching Events</h4>
              <p className="text-brand-mutedIvory text-xs mb-4">
                No events found for "{activeCategory}". Try resetting filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setActiveAudience('All');
                }}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-brand-ivory transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
