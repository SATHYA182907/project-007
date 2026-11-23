import React from 'react';
import { Users, CalendarCheck, Building2, Clock, ShieldCheck } from 'lucide-react';
import { SectionHeader, TiltCard, CountUp, ScrollCard } from './fx';

const verifiedHighlights = [
  { label: 'Diwali Carnival Festival', value: '2,000+', note: 'Participants immersed in offline games & cultural dance' },
  { label: 'Komagal Public Marathon', value: '1,800+', note: 'City runners promoting health & screen-free stamina' },
  { label: 'Nana Nani Senior Fellowship', value: '1,900+', note: 'Elders celebrating Onam and Women’s Day in togetherness' },
  { label: 'Mom & Me Inclusive Walk', value: '900+', note: 'Families & children with autism stepping out with pride' },
];

const counters = [
  {
    to: 10300,
    suffix: '+',
    label: 'Participant Entries',
    note: 'From toddlers and young parents to working professionals and senior citizens.',
    icon: <Users className="w-5 h-5 text-brand-gold" />,
    accent: 'text-brand-ivory',
    featured: true,
  },
  {
    to: 21,
    suffix: '',
    label: 'Events Documented',
    note: 'Across public grounds, educational schools, senior living facilities, and retail hubs.',
    icon: <CalendarCheck className="w-5 h-5 text-brand-gold" />,
    accent: 'text-brand-gold',
    featured: false,
  },
  {
    to: 21,
    suffix: '+',
    label: 'Verified Partners & Sponsors',
    note: 'Corporate entities, hospitals, NGOs, schools, and civic associations joined in partnership.',
    icon: <Building2 className="w-5 h-5 text-brand-lavender" />,
    accent: 'text-brand-lavender',
    featured: false,
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section id="impact" className="section bg-brand-darker border-t border-white/5">
      <div className="fx-aurora top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-gold/[0.06]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          align="left"
          icon={<ShieldCheck />}
          eyebrow="Measurable Community Impact"
          title="Our Screen-Free"
          accent="Impact"
          subtitle="We measure our success not by digital likes or impressions, but by real human hours spent present in the physical world without glowing screens."
        />

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:grid-flow-dense">
          {counters.map((c, i) => (
            <ScrollCard key={c.label} variant={i === 0 ? 'zoom' : 'tilt'} offset={i} className={c.featured ? 'col-span-2 lg:col-span-2 lg:row-span-2' : 'col-span-1'}>
              <TiltCard
                max={5}
                className={`h-full rounded-3xl p-5 sm:p-7 fx-glass overflow-hidden flex flex-col justify-between ${c.featured ? 'border-brand-gold/40 shadow-glow-gold min-h-[220px] lg:min-h-full' : ''}`}
              >
                {c.featured && <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />}
                <div className="relative flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">{c.icon}</div>
                  {c.featured && <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold">Headline metric</span>}
                </div>
                <div className="relative">
                  <CountUp
                    to={c.to}
                    suffix={c.suffix}
                    className={`block font-serif font-bold leading-none mb-2 tabular-nums ${c.featured ? 'text-6xl sm:text-7xl lg:text-8xl fx-shimmer' : 'text-4xl sm:text-5xl text-brand-ivory'}`}
                  />
                  <h3 className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1 ${c.accent}`}>{c.label}</h3>
                  <p className="text-[11px] sm:text-xs text-brand-mutedIvory/80 leading-relaxed">{c.note}</p>
                </div>
              </TiltCard>
            </ScrollCard>
          ))}

          {/* Measurement Standard */}
          <ScrollCard variant="rise" offset={1} className="col-span-2 lg:col-span-2">
            <div className="h-full p-5 sm:p-6 rounded-3xl fx-glass border-brand-gold/20 space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-brand-gold">
                <Clock className="w-4 h-4" />
                <span>The Measurement Standard</span>
              </div>
              <h4 className="text-base sm:text-lg font-serif font-bold text-brand-ivory leading-snug">
                Formula: Number of participants × Event duration = Participant-hours of screen-free engagement.
              </h4>
              <p className="text-xs text-brand-mutedIvory font-light leading-relaxed">
                We define this metric strictly as <strong className="text-brand-ivory font-medium">participant-hours of screen-free engagement</strong> (collective human attention freed from digital interfaces during our organized activities). We do not claim unique individual hours of screen-time eliminated.
              </p>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs space-y-1">
                <span className="font-semibold text-brand-gold uppercase tracking-wider text-[10px]">Total Screen-Time Value: </span>
                <span className="text-brand-ivory font-mono font-bold">Pending Verification Audit</span>
                <p className="text-[11px] text-brand-mutedIvory/80 leading-relaxed italic">
                  *Note: Source records list stated sum of 36,550 participant-hours alongside itemized values. In adherence to strict transparency, we present verified event-level values in each event overview.
                </p>
              </div>
            </div>
          </ScrollCard>
        </div>

        {/* Event-level verified milestones */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {verifiedHighlights.map((vh, i) => (
            <ScrollCard key={vh.label} variant="tilt" offset={i}>
              <div className="group h-full p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-gold/30 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden">
                <span className="absolute left-0 top-0 h-full w-[2px] bg-gold-gradient scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                <span className="text-xl sm:text-2xl font-serif font-bold text-brand-gold font-mono block mb-1">{vh.value}</span>
                <h5 className="text-[10px] sm:text-xs font-serif font-semibold text-brand-ivory uppercase tracking-wider mb-1">{vh.label}</h5>
                <p className="text-[11px] text-brand-mutedIvory font-light leading-relaxed">{vh.note}</p>
              </div>
            </ScrollCard>
          ))}
        </div>
      </div>
    </section>
  );
};
