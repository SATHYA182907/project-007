import React from 'react';
import { MapPin, Users, ArrowUpRight, Building2, Handshake, Clock } from 'lucide-react';
import type { EventItem } from '../types';
import { TiltCard } from './fx';

interface EventCardProps {
  event: EventItem;
  index?: number;
  className?: string;
  onSelectEvent: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, index: _index, className, onSelectEvent }) => {
  return (
    <TiltCard
      max={6}
      onClick={() => onSelectEvent(event)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${event.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectEvent(event);
        }
      }}
      className={`group cursor-pointer rounded-3xl fx-glass overflow-hidden flex flex-col transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(212,175,55,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${className || ''}`}
    >
      {/* Photograph */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-black/40 shrink-0">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/30 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 z-10">
          <div className="flex flex-wrap gap-1">
            {(event.categories && event.categories.length > 0 ? event.categories.slice(0, 2) : [event.category]).map((cat, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold text-brand-gold uppercase tracking-wider border border-brand-gold/30"
              >
                {cat}
              </span>
            ))}
          </div>
          {event.targetAudiences && event.targetAudiences.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[9px] font-medium text-brand-ivory border border-white/20">
              {event.targetAudiences[0]}
            </span>
          )}
        </div>

        <span className="absolute -bottom-3 right-3 text-6xl font-serif font-extrabold text-white/10 group-hover:text-brand-gold/30 transition-colors duration-500 select-none">
          {event.number}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-brand-gold/90 font-medium mb-1.5">
            <MapPin className="w-3 h-3 shrink-0 text-brand-gold" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-brand-ivory group-hover:text-brand-goldLight transition-colors mb-1.5 leading-snug line-clamp-1">
            {event.title}
          </h3>
          <p className="text-xs text-brand-mutedIvory font-light leading-relaxed line-clamp-2 mb-3">{event.description}</p>
        </div>

        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 text-brand-gold shrink-0" />
              <span className="font-semibold text-brand-ivory font-mono truncate">
                {event.participantCount ? `${event.participantCount.toLocaleString()} engaged` : event.audience}
              </span>
            </div>
            {event.screenTimeValue ? (
              <div className="flex items-center gap-1.5 justify-end">
                <Clock className="w-3 h-3 text-brand-gold/80 shrink-0" />
                <span className="font-medium text-brand-ivory/90 truncate font-mono">{event.screenTimeValue.toLocaleString()} hrs</span>
              </div>
            ) : (
              <div />
            )}
          </div>

          {(event.sponsor || event.collaborators) && (
            <div className="flex items-center justify-between text-[11px] text-brand-mutedIvory gap-2">
              {event.sponsor ? (
                <span className="flex items-center gap-1 text-brand-gold/90 truncate max-w-[50%]">
                  <Building2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">{event.sponsor}</span>
                </span>
              ) : (
                <span />
              )}
              {event.collaborators && (
                <span className="flex items-center gap-1 text-brand-lavender/90 truncate max-w-[50%] ml-auto">
                  <Handshake className="w-3 h-3 shrink-0" />
                  <span className="truncate">{event.collaborators}</span>
                </span>
              )}
            </div>
          )}

          <div className="pt-1 flex items-center justify-between">
            <span className="relative text-[11px] font-semibold uppercase tracking-wider text-brand-gold">
              View Details
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-gold group-hover:w-full transition-all duration-500" />
            </span>
            <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-gold group-hover:border-brand-gold group-hover:text-brand-dark group-hover:rotate-45 transition-all duration-500 flex items-center justify-center text-brand-ivory">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};
