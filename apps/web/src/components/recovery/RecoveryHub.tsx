import React, { useMemo } from 'react';
import { Compass, Sparkles, BookOpen } from 'lucide-react';
import { useSiteStore } from '../../store/useSiteStore';
import { RECOVERY_SOLUTIONS } from '../../data/content';
import { SourceChip } from '../sections/SourceChip';

export const RecoveryHub: React.FC = () => {
  const readSections = useSiteStore((s) => s.readSections);
  const scrollToSection = useSiteStore((s) => s.scrollToSection);

  // Sort solution cards by overlap with readSections
  const sortedSolutions = useMemo(() => {
    return [...RECOVERY_SOLUTIONS].sort((a, b) => {
      const aOverlap = a.forSections.filter((sec) => readSections.includes(sec)).length;
      const bOverlap = b.forSections.filter((sec) => readSections.includes(sec)).length;
      return bOverlap - aOverlap;
    });
  }, [readSections]);

  const readNames = useMemo(() => {
    if (readSections.length === 0) return 'Introductory Overview';
    return readSections.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
  }, [readSections]);

  return (
    <section
      id="recovery-hub"
      className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 flex flex-col justify-center border-t border-[#DCE0D5]"
      style={{
        backgroundColor: 'rgba(247, 245, 239, 0.95)',
      }}
    >
      <div className="max-w-4xl mx-auto w-full space-y-8 z-10">
        <div className="space-y-3 text-center sm:text-left">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs"
            style={{
              backgroundColor: 'rgba(156, 175, 136, 0.3)',
              color: '#263128',
            }}
          >
            <Compass size={13} className="text-[#E8412C]" />
            <span>Recovery Hub · Targeted Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263128]">
            Solutions Tailored to Your Reading
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#62695F]">
            <BookOpen size={14} className="text-[#9CAF88]" />
            <span>
              <strong>Because you read:</strong>{' '}
              <span className="text-[#263128] font-semibold">{readNames}</span>
            </span>
            <span className="text-slate-400">({readSections.length} of 6 sections logged)</span>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {sortedSolutions.map((sol) => {
            const isRelevant = sol.forSections.some((s) => readSections.includes(s));
            return (
              <div
                key={sol.id}
                className={`p-6 rounded-2xl border shadow-xs flex flex-col justify-between transition-all ${
                  isRelevant
                    ? 'border-[#9CAF88] bg-white ring-1 ring-[#9CAF88]/30'
                    : 'border-[#DCE0D5] bg-white/70'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: '#9CAF8825',
                        color: '#263128',
                      }}
                    >
                      {sol.category}
                    </span>
                    {isRelevant && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E8412C]">
                        <Sparkles size={11} />
                        <span>Recommended Match</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#263128] leading-snug">{sol.title}</h3>

                  <p className="text-xs text-[#62695F] leading-relaxed">{sol.body}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DCE0D5] space-y-3">
                  <div className="text-[11px] font-medium text-emerald-800">
                    <strong>Measured Impact:</strong> {sol.impactMetric}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {sol.sourceIds.map((sid) => (
                      <SourceChip key={sid} sourceId={sid} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to narrative control */}
        <div className="pt-6 text-center">
          <button
            onClick={() => scrollToSection('loss')}
            className="text-xs font-semibold text-[#62695F] hover:text-[#263128] underline underline-offset-4"
          >
            Review sections from the beginning
          </button>
        </div>
      </div>
    </section>
  );
};
