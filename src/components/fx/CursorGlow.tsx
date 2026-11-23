import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/** Gold cursor ring that trails the pointer and swells over interactive elements (desktop only). */
export const CursorGlow: React.FC = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest('a, button, [role="button"], select, input, textarea, label'));
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] rounded-full border border-brand-gold/70 mix-blend-difference"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hover ? 54 : 30, height: hover ? 54 : 30, opacity: visible ? 1 : 0, backgroundColor: hover ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] w-1.5 h-1.5 rounded-full bg-brand-gold"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && !hover ? 1 : 0 }}
      />
    </>
  );
};
