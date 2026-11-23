import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SplitText, Magnetic } from './fx';

import heroWalkathon from '../assets/events/portfolio_p10_img1.jpeg'; // Walkathon
import heroDiwali from '../assets/events/portfolio_p11_img4.jpeg'; // Diwali Carnival
import heroMomMe from '../assets/events/portfolio_p12_img1.jpeg'; // Mom & Me
import heroWomensDay from '../assets/events/portfolio_p13_img5.jpeg'; // Women's Day
import heroChildrensDay from '../assets/events/portfolio_p10_img2.jpeg'; // Children's Day
import heroOnam from '../assets/events/portfolio_p13_img6.jpeg'; // Onam
import heroPetRamp from '../assets/events/portfolio_p12_img3.jpeg'; // Pet Ramp Walk
import heroKomagal from '../assets/events/portfolio_p13_img1.jpeg'; // Komagal Awards

const heroSlides = [
  { image: heroDiwali, title: 'Diwali Carnival @ Kovaipudur', subtitle: '2,000+ Floating Audience Engaged in Screen-Free Joy' },
  { image: heroWalkathon, title: 'Walkathon @ Kovaipudur', subtitle: 'Community Fitness, Active Aging & Screen-Free Awareness' },
  { image: heroMomMe, title: 'Mom & Me – Inclusive Ramp Walk', subtitle: 'Autism Awareness, Courage & Emotion on Stage' },
  { image: heroWomensDay, title: 'Women’s Day @ Ananya’s Nana Nani', subtitle: 'Honoring 900+ Elderly Women Across Generations' },
  { image: heroChildrensDay, title: 'Children’s Day @ Kids.com', subtitle: 'Tactile Motor Skills, Sensory Play & Childhood Agility' },
  { image: heroOnam, title: 'Onam Celebrations @ Somayampalayam', subtitle: '1,000+ Senior Citizens United in Traditional Harmony' },
  { image: heroPetRamp, title: 'Pet Ramp Walk @ Kalapatti', subtitle: 'Human-Animal Emotional Bonding & Outdoor Joy' },
  { image: heroKomagal, title: 'Komagal Awards Ceremony', subtitle: 'Celebrating Women Who Create Change' },
];

const SLIDE_MS = 5500;

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // Parallax: content drifts up and fades as the hero scrolls away
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section ref={ref} id="home" className="relative w-full min-h-[640px] h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Slideshow with Ken Burns drift */}
      <motion.div className="absolute inset-0 bg-brand-dark" style={{ scale: bgScale }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.18, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1.04, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, filter: { duration: 1.4 }, scale: { duration: SLIDE_MS / 1000 + 1.5, ease: 'linear' } }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Editorial overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/75 to-brand-dark/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,13,15,0.85)_75%)]" />
        <div className="fx-aurora top-1/4 left-1/2 -translate-x-1/2 w-[360px] sm:w-[720px] h-[360px] sm:h-[720px] bg-brand-gold/15" />
      </motion.div>

      {/* Hero Central Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 pb-24 sm:pb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="fx-pill bg-black/40 backdrop-blur-md mb-5 sm:mb-7"
        >
          <Sparkles className="animate-pulse" />
          <span>Offscreen Hub • Events Division</span>
        </motion.div>

        <h1 className="font-serif font-bold tracking-tight text-brand-ivory leading-[1.05] mb-5 sm:mb-7">
          <SplitText
            as="span"
            by="chars"
            immediate
            delay={0.25}
            stagger={0.045}
            text="OFFSCREEN HUB"
            className="block text-[2.6rem] sm:text-7xl md:text-8xl lg:text-[6.5rem] whitespace-nowrap drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
          />
          <SplitText
            as="span"
            immediate
            delay={0.85}
            text="Beyond the Screen, Into the Real World."
            wordClassName="fx-shimmer"
            className="block text-xl sm:text-4xl md:text-5xl font-light italic mt-2 sm:mt-3"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-sm sm:text-lg text-brand-mutedIvory font-light leading-relaxed mb-7 sm:mb-10 px-2"
        >
          “Creating meaningful offline experiences that inspire creativity, confidence, intellectual learning and well-being.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
        >
          <Magnetic className="w-full sm:w-auto">
            <a
              href="#explore-journey"
              className="relative overflow-hidden w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-gold-gradient text-brand-dark font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-glow-gold transition-shadow duration-300 hover:shadow-[0_0_45px_-5px_rgba(212,175,55,0.7)] flex items-center justify-center gap-2 group"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <span className="relative">Explore Our Journey</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <a
              href="#collaborate"
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 text-brand-ivory font-semibold text-xs sm:text-sm tracking-wider uppercase border border-white/20 hover:border-brand-gold/60 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Collaborate With Us</span>
              <ArrowUpRight className="w-4 h-4 text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Magnetic>
        </motion.div>

        {/* Live slide caption with crossfade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-7 sm:mt-10 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-[11px] sm:text-xs border border-white/10 shadow-lg max-w-full overflow-hidden"
        >
          <span className="relative flex w-2 h-2 shrink-0">
            <span className="absolute inset-0 rounded-full bg-brand-gold animate-ping" />
            <span className="relative w-2 h-2 rounded-full bg-brand-gold" />
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentSlide}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="truncate"
            >
              <span className="font-semibold text-brand-ivory">{heroSlides[currentSlide].title}:</span>{' '}
              <span className="text-brand-mutedIvory/80 hidden md:inline">{heroSlides[currentSlide].subtitle}</span>
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Bottom Controls: progress-filling slide indicators & scroll cue */}
      <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-500 ${
                currentSlide === index ? 'w-8 sm:w-10 bg-white/20' : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {currentSlide === index && (
                <motion.span
                  key={`fill-${currentSlide}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                  className="absolute inset-0 origin-left bg-brand-gold"
                />
              )}
            </button>
          ))}
        </div>

        <a
          href="#explore-journey"
          className="flex flex-col items-center gap-1 text-brand-gold/80 hover:text-brand-gold transition-colors text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-semibold"
        >
          <span>Scroll to Discover</span>
          <span className="w-5 h-8 rounded-full border border-brand-gold/40 flex justify-center pt-1.5">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-brand-gold"
            />
          </span>
        </a>
      </div>
    </section>
  );
};
