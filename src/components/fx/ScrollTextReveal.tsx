import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/** Words brighten one by one as the paragraph scrolls through the viewport. */
export const ScrollTextReveal: React.FC<{ text: string; className?: string; as?: 'p' | 'h3' | 'div' }> = ({
  text,
  className,
  as = 'p',
}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] });
  const words = text.split(' ');
  const Tag = as as 'p';
  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </Tag>
  );
};

const Word: React.FC<{ children: string; progress: MotionValue<number>; range: [number, number] }> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span aria-hidden className="relative inline-block mr-[0.28em]">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
};
