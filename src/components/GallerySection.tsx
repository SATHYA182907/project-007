import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ZoomIn, ZoomOut, Image as ImageIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { ScrollCard, SectionHeader } from './fx';

import p10_1 from '../assets/events/portfolio_p10_img1.jpeg';
import p10_2 from '../assets/events/portfolio_p10_img2.jpeg';
import p10_3 from '../assets/events/portfolio_p10_img3.jpeg';
import p10_4 from '../assets/events/portfolio_p10_img4.jpeg';

import p11_1 from '../assets/events/portfolio_p11_img1.jpeg';
import p11_2 from '../assets/events/portfolio_p11_img2.jpeg';
import p11_3 from '../assets/events/portfolio_p11_img3.jpeg';
import p11_4 from '../assets/events/portfolio_p11_img4.jpeg';

import p12_1 from '../assets/events/portfolio_p12_img1.jpeg';
import p12_2 from '../assets/events/portfolio_p12_img2.jpeg';
import p12_3 from '../assets/events/portfolio_p12_img3.jpeg';
import p12_4 from '../assets/events/portfolio_p12_img4.jpeg';
import p12_5 from '../assets/events/portfolio_p12_img5.jpeg';
import p12_6 from '../assets/events/portfolio_p12_img6.jpeg';
import p12_7 from '../assets/events/portfolio_p12_img7.jpeg';

import p13_1 from '../assets/events/portfolio_p13_img1.jpeg';
import p13_2 from '../assets/events/portfolio_p13_img2.jpeg';
import p13_3 from '../assets/events/portfolio_p13_img3.jpeg';
import p13_4 from '../assets/events/portfolio_p13_img4.jpeg';
import p13_5 from '../assets/events/portfolio_p13_img5.jpeg';
import p13_6 from '../assets/events/portfolio_p13_img6.jpeg';
import p13_7 from '../assets/events/portfolio_p13_img7.jpeg';

import p14_1 from '../assets/events/portfolio_p14_img1.jpeg';
import p1_img1 from '../assets/events/portfolio_p1_img1.jpeg';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  caption: string;
}

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const categories = [
    'All',
    'Walkathon',
    'Carnivals',
    'Children’s Events',
    'Mom & Me',
    'Komagal Awards',
    'Nana Nani Events',
    'Community Activities',
    'Fitness Events',
    'School Programs',
  ];

  const galleryItems: GalleryItem[] = [
    // Walkathon
    { id: 'g-walkathon-1', src: p10_1, title: 'Kovaipudur Walkathon', category: 'Walkathon', caption: 'Senior citizens and families marching together for screen-free health in Kovaipudur.' },
    // Carnivals
    { id: 'g-carnival-1', src: p11_4, title: 'Diwali Carnival Gathering', category: 'Carnivals', caption: 'Over 2000+ residents enjoying festive stalls, traditional music, and joyful community dance.' },
    { id: 'g-carnival-2', src: p13_7, title: 'Dhandiya Festive Dance', category: 'Carnivals', caption: 'Women united in rhythmic stick dance during the Kovaipudur Navratri celebration.' },
    // Children’s Events
    { id: 'g-children-1', src: p10_2, title: 'Children’s Day Joy', category: 'Children’s Events', caption: 'Toddlers and young students engaged with physical motor coordination toys at Kids.com.' },
    { id: 'g-children-2', src: p11_3, title: 'Republic Day Drawing Competition', category: 'Children’s Events', caption: '400 children expressing patriotic imagination on paper at Sri Kumaran Mahal.' },
    { id: 'g-children-3', src: p12_6, title: 'Kids Ramp Walk @ Alveal Mall', category: 'Children’s Events', caption: 'Confidence and poise on the runway without digital distractions.' },
    // Mom & Me
    { id: 'g-momme-1', src: p12_1, title: 'Mom & Me Inclusive Ramp Walk', category: 'Mom & Me', caption: 'Mothers walking hand-in-hand with their children on the autism spectrum with deep pride.' },
    { id: 'g-momme-2', src: p12_2, title: 'Mom & Me Celebration Stills', category: 'Mom & Me', caption: 'Heartwarming moments of triumph and community cheering at Sri Maruti Gana Sabha.' },
    // Komagal Awards
    { id: 'g-komagal-1', src: p13_1, title: 'Komagal Awards Stage', category: 'Komagal Awards', caption: 'Main ceremonial stage celebrating women changemakers at Srinivasa Art & Gallery.' },
    { id: 'g-komagal-2', src: p13_2, title: 'Komagal Trophies & Citations', category: 'Komagal Awards', caption: 'Brass mementos of honor bestowed on inspiring community pillars.' },
    { id: 'g-komagal-3', src: p13_3, title: 'Awardees on Stage', category: 'Komagal Awards', caption: 'Felicitating healthcare pioneers, educators, and social reformers.' },
    { id: 'g-komagal-4', src: p13_4, title: 'Komagal Audience Fellowship', category: 'Komagal Awards', caption: 'Distinguished guests and families applauding changemakers in screen-free presence.' },
    // Nana Nani Events (Dedicated category for Ananya's Nana Nani)
    { id: 'g-nananani-1', src: p13_5, title: 'Women’s Day @ Ananya’s Nana Nani', category: 'Nana Nani Events', caption: 'Honoring senior women residents across KN Palayam and Somayampalayam with cultural fellowship.' },
    { id: 'g-nananani-2', src: p13_6, title: 'Onam Celebrations @ Somayampalayam', category: 'Nana Nani Events', caption: 'Grand floral pookalam, traditional songs, and shared joy with 1000+ senior citizens.' },
    { id: 'g-nananani-3', src: p12_7, title: 'Senior Sangamam Elders Gathering', category: 'Nana Nani Events', caption: 'Elders bonding over memory puzzles and music at Grand Regent, Avinashi Road.' },
    // Community Activities
    { id: 'g-comm-1', src: p11_2, title: 'Vedanta Community Projects', category: 'Community Activities', caption: 'Five focused wellness and social sessions for senior living residents.' },
    { id: 'g-comm-2', src: p12_5, title: 'Alveal Mall Brain Gym Workshops', category: 'Community Activities', caption: 'Shoppers and young families solving tactile cognitive puzzles.' },
    { id: 'g-comm-3', src: p12_3, title: 'Pet Ramp Walk @ Kalapatti', category: 'Community Activities', caption: 'Human-animal emotional bonding and outdoor fun at Bow Bow Bliss.' },
    { id: 'g-comm-4', src: p12_4, title: 'Public Agility Challenges', category: 'Community Activities', caption: 'Pedestrian brain gym trials and street cognitive challenges along Racecourse.' },
    // Fitness Events
    { id: 'g-fit-1', src: p14_1, title: 'Komagal Marathon at Racecourse', category: 'Fitness Events', caption: '1,800 runners running in early morning dawn to promote active offline health.' },
    { id: 'g-fit-2', src: p11_1, title: 'Women’s Badminton Tournament', category: 'Fitness Events', caption: 'Homemakers and professionals competing on the court with vitality.' },
    // School Programs
    { id: 'g-school-1', src: p10_3, title: 'Brain Gym School Sessions', category: 'School Programs', caption: 'Bilateral coordination exercises in Shrishti Vidyala and Vasavi Vidyala.' },
    { id: 'g-school-2', src: p10_4, title: 'Townhall Public Agility Workshops', category: 'School Programs', caption: 'Cognitive drills and speed challenges conducted with Ganapathi Silks.' },
    { id: 'g-school-3', src: p1_img1, title: 'Youth Unplugged Session @ Mudcups', category: 'Community Activities', caption: 'Wholesome offline social conversation and acoustic vibes without phones.' },
  ];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const PREVIEW = 8;
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, PREVIEW);
  const hiddenCount = filteredItems.length - visibleItems.length;

  const step = useCallback(
    (dir: 1 | -1) => {
      setLightboxItem((cur) => {
        if (!cur) return cur;
        const i = filteredItems.findIndex((g) => g.id === cur.id);
        return filteredItems[(i + dir + filteredItems.length) % filteredItems.length];
      });
      setIsZoomed(false);
    },
    [filteredItems]
  );

  useEffect(() => {
    if (!lightboxItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxItem(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxItem, step]);

  // Bento rhythm: feature tiles at fixed positions (desktop only)
  const spanFor = (idx: number) => {
    const m = idx % 8;
    if (m === 0) return 'sm:col-span-2 sm:row-span-2';
    if (m === 5) return 'lg:col-span-2';
    return '';
  };

  return (
    <section id="gallery" className="section bg-brand-darker text-brand-ivory border-t border-white/5">
      <div className="fx-aurora top-1/4 left-10 w-[600px] h-[600px] bg-brand-gold/[0.06]" />
      <div className="fx-aurora bottom-1/4 right-10 w-[500px] h-[500px] bg-brand-lavender/[0.06]" style={{ animationDelay: '-7s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          align="left"
          className="mb-6"
          icon={<ImageIcon />}
          eyebrow="Authentic Photographic Record"
          title="Moments Beyond"
          accent="the Screen"
          subtitle="Real people, unposed joy, and genuine community bonds captured live across our 21 offline initiatives."
        />

        {/* Category chips with sliding indicator */}
        <div className="mb-5 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex items-center gap-0.5 p-1 rounded-full fx-glass">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false);
                }}
                className={`relative px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === cat ? 'text-brand-dark' : 'text-brand-mutedIvory hover:text-brand-ivory'
                }`}
              >
                {activeCategory === cat && (
                  <motion.span layoutId="galleryPill" className="absolute inset-0 rounded-full bg-gold-gradient shadow-glow-gold" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activeCategory === 'Nana Nani Events' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mb-5 p-4 rounded-2xl fx-glass border-brand-gold/40 bg-brand-gold/10">
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider block mb-1">
                  Dedicated Ananya’s Nana Nani Gallery Section
                </span>
                <p className="text-xs text-brand-ivory/90">
                  Featuring verified Onam celebrations and Women's Day gatherings for senior residents. Dynamic gallery architecture prepared for seamless integration of additional Nana Nani event photographs.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bento grid */}
        <ScrollCard variant="tilt">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[140px] sm:auto-rows-[170px] lg:auto-rows-[190px] gap-2.5 sm:gap-4 grid-flow-dense">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, idx) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.6, delay: (idx % PREVIEW) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  setLightboxItem(item);
                  setIsZoomed(false);
                }}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-brand-gold/50 bg-black/50 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${spanFor(idx)}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 z-10 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[9px] font-bold text-brand-gold uppercase tracking-wider block mb-0.5">{item.category}</span>
                  <h4 className="text-xs sm:text-sm font-serif font-semibold text-brand-ivory line-clamp-1">{item.title}</h4>
                  <p className="hidden sm:block text-[11px] text-brand-mutedIvory/90 leading-snug line-clamp-2 max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-1 transition-all duration-500">
                    {item.caption}
                  </p>
                </div>
                <span className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <Maximize2 className="w-3.5 h-3.5 text-brand-gold" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        </ScrollCard>

        {(hiddenCount > 0 || showAll) && filteredItems.length > PREVIEW && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full fx-glass hover:border-brand-gold/50 text-xs font-semibold uppercase tracking-wider text-brand-ivory transition-colors"
            >
              <span>{showAll ? 'Show fewer photos' : `View all ${filteredItems.length} photographs`}</span>
              <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] rounded-3xl overflow-hidden fx-glass border-brand-gold/30 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-gold">
                  {lightboxItem.category} • Authentic Photograph
                </span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setIsZoomed(!isZoomed)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-brand-ivory transition-colors" title={isZoomed ? 'Zoom out' : 'Zoom in'}>
                    {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setLightboxItem(null)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-brand-ivory hover:text-brand-gold transition-colors" title="Close">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex-grow flex items-center justify-center overflow-auto bg-black/60 max-h-[65vh]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxItem.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    src={lightboxItem.src}
                    alt={lightboxItem.title}
                    className={`max-w-full max-h-[62vh] object-contain transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </AnimatePresence>
                {filteredItems.length > 1 && (
                  <>
                    <button onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-brand-gold/60 flex items-center justify-center text-brand-ivory hover:text-brand-gold transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-brand-gold/60 flex items-center justify-center text-brand-ivory hover:text-brand-gold transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-5 border-t border-white/10 flex items-end justify-between gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-brand-ivory mb-1">{lightboxItem.title}</h4>
                  <p className="text-xs sm:text-sm text-brand-mutedIvory font-light leading-relaxed">{lightboxItem.caption}</p>
                </div>
                <span className="shrink-0 text-[11px] font-mono text-brand-mutedIvory/60">
                  {filteredItems.findIndex((g) => g.id === lightboxItem.id) + 1} / {filteredItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
