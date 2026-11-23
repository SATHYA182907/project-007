import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

type Variant = 'rise' | 'tilt' | 'left' | 'right' | 'zoom';

interface ScrollCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  /** Stagger: shifts the scroll window so neighbours animate one after another. */
  offset?: number;
}

/**
 * Scroll-linked card entrance. Unlike a one-shot reveal, the transform is
 * scrubbed by scroll position, so cards fold/lift in as you scroll and
 * reverse when you scroll back.
 */
export const ScrollCard: React.FC<ScrollCardProps> = ({ children, className, variant = 'rise', offset = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${1 + offset * 0.06}`, `start ${0.62 + offset * 0.04}`],
  });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  const opacity = useTransform(p, [0, 0.6], [0, 1]);
  const y = useTransform(p, [0, 1], variant === 'zoom' ? [40, 0] : [90, 0]);
  const x = useTransform(p, [0, 1], variant === 'left' ? [-90, 0] : variant === 'right' ? [90, 0] : [0, 0]);
  const scale = useTransform(p, [0, 1], variant === 'zoom' ? [0.82, 1] : [0.94, 1]);
  const rotateX = useTransform(p, [0, 1], variant === 'tilt' || variant === 'rise' ? [28, 0] : [0, 0]);
  const rotateY = useTransform(p, [0, 1], variant === 'left' ? [18, 0] : variant === 'right' ? [-18, 0] : [0, 0]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y, x, scale, rotateX, rotateY, transformPerspective: 1100, transformOrigin: 'center bottom' }}
    >
      {children}
    </motion.div>
  );
};
