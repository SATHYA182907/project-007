import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface StackingCardsProps {
  children: React.ReactNode;
  className?: string;
  /** Sticky offset from the top of the viewport (px). */
  top?: number;
  /** Extra vertical offset per card so earlier cards peek out above (px). */
  peek?: number;
  /** How much each buried card shrinks. */
  scaleStep?: number;
  /** Scroll distance between cards (CSS length). */
  gap?: string;
}

/**
 * Sticky stacking cards: each card pins near the top of the viewport and the
 * next one slides over it, while the buried cards scale down and dim.
 */
export const StackingCards: React.FC<StackingCardsProps> = ({
  children,
  className,
  top = 96,
  peek = 18,
  scaleStep = 0.05,
  gap = '14vh',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const items = React.Children.toArray(children);
  const n = items.length;

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <StackItem
          key={i}
          index={i}
          total={n}
          progress={scrollYProgress}
          top={top + i * peek}
          scaleStep={scaleStep}
          gap={i < n - 1 ? gap : '0px'}
        >
          {child}
        </StackItem>
      ))}
    </div>
  );
};

const StackItem: React.FC<{
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  top: number;
  scaleStep: number;
  gap: string;
}> = ({ children, index, total, progress, top, scaleStep, gap }) => {
  const start = index / total;
  const buried = total - 1 - index;
  const scale = useTransform(progress, [start, 1], [1, 1 - buried * scaleStep]);
  const dim = useTransform(progress, [start, 1], [0, Math.min(0.55, buried * 0.14)]);
  const rotateX = useTransform(progress, [start, 1], [0, buried * 2]);

  return (
    <div className="sticky" style={{ top, marginBottom: gap }}>
      <motion.div style={{ scale, rotateX, transformPerspective: 1200, transformOrigin: 'top center' }} className="relative">
        {children}
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 rounded-[inherit] bg-black rounded-3xl z-40" />
      </motion.div>
    </div>
  );
};
