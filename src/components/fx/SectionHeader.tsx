import React from 'react';
import { motion } from 'framer-motion';
import { SplitText } from './SplitText';

interface SectionHeaderProps {
  icon?: React.ReactNode;
  eyebrow: string;
  title: string;
  /** Optional portion of the title rendered in animated gold. */
  accent?: string;
  subtitle?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
  /** Right-hand slot (filters, controls) for left-aligned headers. */
  aside?: React.ReactNode;
}

/** Shared, animated section header: eyebrow pill → split-text title → subtitle. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  eyebrow,
  title,
  accent,
  subtitle,
  align = 'center',
  className,
  aside,
}) => {
  const centered = align === 'center';
  return (
    <div
      className={`relative z-10 ${centered ? 'text-center max-w-3xl mx-auto' : 'flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5'} ${className ?? 'mb-8 sm:mb-10'}`}
    >
      <div className={centered ? '' : 'max-w-2xl'}>
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fx-pill mb-3"
        >
          {icon}
          <span>{eyebrow}</span>
        </motion.div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-ivory leading-[1.08] tracking-tight">
          <SplitText as="span" text={title} className="block" />
          {accent && <SplitText as="span" text={accent} delay={0.15} className="block" wordClassName="fx-shimmer" />}
        </h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-3 text-sm sm:text-base text-brand-mutedIvory font-light leading-relaxed ${centered ? 'max-w-2xl mx-auto' : ''}`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
};
