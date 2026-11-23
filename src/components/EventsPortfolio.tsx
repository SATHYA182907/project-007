import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventsData, EVENT_CATEGORIES, TARGET_AUDIENCES } from '../data/events';
import { EventCard } from './EventCard';
import type { EventItem, EventCategory, TargetAudience } from '../types';
import { Layers, Filter, Award, ChevronRight, ChevronLeft, Compass, MousePointer2 } from 'lucide-react';
import { SectionHeader } from './fx';

interface EventsPortfolioProps {
  onSelectEvent: (event: EventItem) => void;
}

export const EventsPortfolio: React.FC<EventsPortfolioProps> = ({ onSelectEvent }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeAudience, setActiveAudience] = useState<string>('All');
  const [scrollProgress, setScrollProgress] = useState(0);

  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

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

  const updateProgress = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  // Reset rail when filters change
  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    const t = setTimeout(updateProgress, 400);
    return () => clearTimeout(t);
  }, [activeCategory, activeAudience, updateProgress]);

  const handleScrollByCards = (direction: 'prev' | 'next') => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = (card?.offsetWidth ?? 340) + 20;
    el.scrollBy({ left: step * (direction === 'next' ? 1 : -1), behavior: 'smooth' });
  };

  // Mouse drag-to-scroll (touch already scrolls natively)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !railRef.current) return;
    drag.current = { active: true, startX: e.clientX, startLeft: railRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!drag.current.active || !el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5 && !drag.current.moved) {
      drag.current.moved = true;
      el.style.scrollSnapType = 'none';
      el.style.cursor = 'grabbing';
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    const el = railRef.current;
    if (!drag.current.active || !el) return;
    drag.current.active = false;
    el.style.scrollSnapType = '';
    el.style.cursor = '';
  };
  // Swallow the click that ends a drag so it doesn't open a modal
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  const visibleIndex = Math.min(
    filteredEvents.length,
    Math.max(1, Math.round(scrollProgress * (filteredEvents.length - 1)) + 1)
  );

  return (
    <section id="events" className="section bg-brand-darker text-brand-ivory border-t border-white/5">
      <div className="fx-aurora top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-gold/[0.06]" />
      <div className="fx-aurora bottom-0 right-10 w-[500px] h-[500px] bg-brand-lavender/[0.07]" style={{ animationDelay: '-9s' }} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          align="left"
          className="mb-6"
          icon={<Layers />}
          eyebrow="✦ 21 Verified Initiatives"
          title="Our Events &"
          accent="Initiatives"
          aside={
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full fx-glass text-xs text-brand-mutedIvory font-mono">
                <Compass className="w-3.5 h-3.5 text-brand-gold" />
                <span>
                  <span className="text-brand-ivory">{filteredEvents.length ? visibleIndex : 0}</span> of {filteredEvents.length} Cards
                </span>
              </div>
              <button
                onClick={() => handleScrollByCards('prev')}
                className="w-10 h-10 rounded-full fx-glass hover:border-brand-gold/50 flex items-center justify-center hover:text-brand-gold transition-colors disabled:opacity-30"
                disabled={scrollProgress <= 0.001}
                aria-label="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollByCards('next')}
                className="w-10 h-10 rounded-full bg-gold-gradient text-brand-dark flex items-center justify-center shadow-glow-gold hover:scale-105 transition-transform disabled:opacity-30"
                disabled={scrollProgress >= 0.999}
                aria-label="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          }
        />

        {/* Filter Bar: category chips with sliding indicator + audience select */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1 min-w-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="flex items-center gap-1 shrink-0 text-[11px] text-brand-gold font-semibold uppercase tracking-wider">
              <Filter className="w-3 h-3" />
              <span className="hidden sm:inline">Category:</span>
            </span>
            <div className="inline-flex items-center gap-0.5 p-1 rounded-full fx-glass">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                    activeCategory === cat ? 'text-brand-dark' : 'text-brand-mutedIvory hover:text-brand-ivory'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.span layoutId="eventCatPill" className="absolute inset-0 rounded-full bg-gold-gradient shadow-glow-gold" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <label className="shrink-0 self-start sm:self-auto flex items-center gap-1.5 fx-glass rounded-full px-3.5 py-2 text-xs hover:border-brand-gold/40 transition-colors">
            <span className="text-[10px] uppercase font-semibold text-brand-gold tracking-wider">Audience:</span>
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
          </label>
        </div>

        <AnimatePresence>
          {activeCategory === 'Awards' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-3 rounded-2xl fx-glass border-brand-gold/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-brand-ivory">
                  <Award className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>Looking for our dedicated Awards presentation? Explore the Komagal Awards feature below.</span>
                </div>
                <a href="#awards" className="px-3 py-1 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-wider whitespace-nowrap hover:bg-brand-goldLight transition-colors">
                  Go to Awards
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Draggable snap rail */}
      <div
        ref={railRef}
        onScroll={updateProgress}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="fx-rail relative z-10 gap-5 py-8 cursor-grab select-none"
        style={{ paddingInline: 'max(1rem, calc((100vw - 80rem) / 2 + 2rem))', scrollPaddingInline: 'max(1rem, calc((100vw - 80rem) / 2 + 2rem))' }}
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              data-card
              layout
              initial={{ opacity: 0, y: 40, rotateY: -25, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, delay: Math.min(idx, 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="w-[78vw] max-w-[300px] sm:w-[330px] sm:max-w-none shrink-0"
              style={{ transformPerspective: 1200 }}
            >
              <EventCard event={event} index={idx} className="h-full" onSelectEvent={onSelectEvent} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <div className="w-[320px] sm:w-[380px] p-8 text-center fx-glass rounded-3xl shrink-0 flex flex-col items-center justify-center">
            <Layers className="w-10 h-10 text-brand-gold mb-4" />
            <h4 className="text-base font-serif font-bold text-brand-ivory mb-1">No Matching Events</h4>
            <p className="text-brand-mutedIvory text-xs mb-4">No events found for "{activeCategory}". Try resetting filters.</p>
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
        <div className="w-1 shrink-0" aria-hidden />
      </div>

      {/* Progress track */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center gap-4">
        <div className="relative flex-1 h-[2px] rounded-full bg-white/10 overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-gold-gradient" animate={{ width: `${Math.max(6, scrollProgress * 100)}%` }} transition={{ duration: 0.2 }} />
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-brand-mutedIvory/60 font-semibold">
          <MousePointer2 className="w-3 h-3 text-brand-gold" /> Drag or swipe to explore
        </span>
      </div>
    </section>
  );
};
