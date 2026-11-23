import React from 'react';

/** Seamless infinite marquee. Pauses on hover; disabled for reduced motion via CSS. */
export const Marquee: React.FC<{ children: React.ReactNode; reverse?: boolean; speed?: number; className?: string }> = ({
  children,
  reverse = false,
  speed = 40,
  className,
}) => (
  <div className={`group/marquee relative flex overflow-hidden fx-mask-x ${className ?? ''}`}>
    {[0, 1].map((i) => (
      <div
        key={i}
        aria-hidden={i === 1}
        className="fx-marquee flex shrink-0 items-center gap-4 pr-4 group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {children}
      </div>
    ))}
  </div>
);
