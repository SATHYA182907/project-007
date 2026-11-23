import React from 'react';
import { motion, type Variants } from 'framer-motion';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

interface SplitTextProps {
  text: string;
  as?: Tag;
  className?: string;
  /** Split by characters ("chars") or by words ("words"). */
  by?: 'chars' | 'words';
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  wordClassName?: string;
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

const piece: Variants = {
  hidden: { y: '110%', opacity: 0, rotateX: -70, filter: 'blur(6px)' },
  show: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Masked, staggered text reveal. Each word is wrapped in an overflow-hidden
 * mask so characters slide up from beneath a baseline – an editorial effect.
 */
export const SplitText: React.FC<SplitTextProps> = ({
  text,
  as = 'h2',
  className,
  by = 'words',
  delay = 0,
  stagger,
  immediate = false,
  wordClassName,
}) => {
  const MotionTag = motion[as] as typeof motion.h2;
  const words = text.split(' ');
  const step = stagger ?? (by === 'chars' ? 0.025 : 0.07);

  return (
    <MotionTag
      className={className}
      variants={container(delay, step)}
      initial="hidden"
      {...(immediate
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: true, margin: '-60px' } })}
      aria-label={text}
      style={{ perspective: 800 }}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden
          className={`inline-flex overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] ${wordClassName ?? ''}`}
        >
          {by === 'chars' ? (
            word.split('').map((ch, ci) => (
              <motion.span key={ci} variants={piece} className="inline-block origin-bottom will-change-transform">
                {ch}
              </motion.span>
            ))
          ) : (
            <motion.span variants={piece} className="inline-block origin-bottom will-change-transform">
              {word}
            </motion.span>
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  );
};
