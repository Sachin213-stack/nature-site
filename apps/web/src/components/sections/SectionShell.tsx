import React, { useEffect, useRef } from 'react';
import { AlertTriangle, Info, Sliders, ToggleLeft, ToggleRight } from 'lucide-react';
import { SectionContent } from '../../data/content';
import { SourceChip } from './SourceChip';
import { YourMovePanel } from './YourMovePanel';
import { useSiteStore } from '../../store/useSiteStore';

interface SectionShellProps {
  content: SectionContent;
}

export const SectionShell: React.FC<SectionShellProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const markSectionRead = useSiteStore((s) => s.markSectionRead);
  const setSectionProgress = useSiteStore((s) => s.setSectionProgress);
  const setActiveSection = useSiteStore((s) => s.setActiveSection);

  // Interaction store states
  const riversDamProgress = useSiteStore((s) => s.riversDamRemovalProgress);
  const setRiversDamProgress = useSiteStore((s) => s.setRiversDamRemovalProgress);
  const foodRegenerative = useSiteStore((s) => s.foodRegenerativeMode);
  const setFoodRegenerative = useSiteStore((s) => s.setFoodRegenerativeMode);
  const undergroundNode = useSiteStore((s) => s.undergroundSelectedNode);
  const setUndergroundNode = useSiteStore((s) => s.setUndergroundSelectedNode);

  // Intersection Observer for scroll tracking (C8: mark section read at >= 70% dwell)
  useEffect(() => {
    let dwellTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(content.id);
            setSectionProgress(content.id, entry.intersectionRatio);
            if (entry.intersectionRatio >= 0.6) {
              dwellTimer = setTimeout(() => {
                markSectionRead(content.id);
              }, 4000); // 4 seconds dwell marks read
            }
          } else {
            if (dwellTimer) clearTimeout(dwellTimer);
          }
        });
      },
      { threshold: [0.1, 0.4, 0.7, 1.0] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      observer.disconnect();
      if (dwellTimer) clearTimeout(dwellTimer);
    };
  }, [content.id, markSectionRead, setSectionProgress, setActiveSection]);

  return (
    <section
      ref={sectionRef}
      id={`section-${content.id}`}
      className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 flex flex-col justify-center"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-4xl mx-auto w-full space-y-8 z-10">
        {/* Eyebrow & Titles */}
        <div className="space-y-2">
          <span
            className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full border shadow-2xs inline-block"
            style={{
              borderColor: '#DCE0D5',
              backgroundColor: 'rgba(247, 245, 239, 0.9)',
              color: '#9CAF88',
            }}
          >
            {content.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#263128]">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-[#62695F] font-normal leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Narrative Body */}
        <div className="space-y-4 text-sm sm:text-base text-[#263128] leading-relaxed max-w-3xl">
          {content.body.map((paragraph, idx) => (
            <p
              key={idx}
              className="p-4 rounded-xl border border-transparent hover:border-[#DCE0D5] transition-colors"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Key Metrics & Factual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.facts.map((fact, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl border shadow-xs space-y-3 backdrop-blur-xs"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderColor: '#DCE0D5',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#62695F]">{fact.label}</span>
                <SourceChip sourceId={fact.sourceId} />
              </div>
              <div
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ color: '#263128' }}
              >
                {fact.value}
              </div>
              <p className="text-xs text-[#62695F] leading-normal">{fact.description}</p>
              {fact.subStats && (
                <div className="pt-2 grid grid-cols-3 gap-2 border-t border-[#DCE0D5]">
                  {fact.subStats.map((sub, sIdx) => (
                    <div key={sIdx} className="text-center">
                      <div className="text-xs font-bold text-[#E8412C]">{sub.value}</div>
                      <div className="text-[10px] text-[#62695F] leading-tight mt-0.5">
                        {sub.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive 3D Section Controller Widget */}
        <div
          className="p-5 sm:p-6 rounded-2xl border shadow-xs space-y-4"
          style={{
            backgroundColor: 'rgba(247, 245, 239, 0.9)',
            borderColor: '#DCE0D5',
          }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#263128] uppercase tracking-wider">
            <Sliders size={14} className="text-[#9CAF88]" />
            <span>Interactive 3D Stage Controller</span>
          </div>

          {content.id === 'loss' && (
            <div className="text-xs text-[#62695F] space-y-2">
              <p>
                The 3D space above displays population clusters. Scroll drives natural cluster
                density changes representing monitored population shifts across 1970–2020.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                  Freshwater (-85%)
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Terrestrial (-69%)
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Marine (-56%)
                </span>
              </div>
            </div>
          )}

          {content.id === 'underground' && (
            <div className="space-y-3 text-xs text-[#62695F]">
              <p>
                Click any glowing node on the 3D mycorrhizal network to trace symbiotic hyphal
                connections:
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setUndergroundNode(undergroundNode === null ? 3 : null)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={{
                    backgroundColor: undergroundNode !== null ? '#E8412C' : '#9CAF88',
                    color: '#F7F5EF',
                    borderColor: 'transparent',
                  }}
                >
                  {undergroundNode !== null
                    ? `Node #${undergroundNode + 1} Highlighted (Click to reset)`
                    : 'Highlight Sample Fungal Node'}
                </button>
                <span className="text-[11px] text-[#62695F]">
                  Labelled: Mycorrhizal fungi network
                </span>
              </div>
            </div>
          )}

          {content.id === 'food' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#263128] font-medium">
                  Agricultural Terrain Model:
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Illustrative Simulation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFoodRegenerative(!foodRegenerative)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs"
                  style={{
                    backgroundColor: foodRegenerative ? '#9CAF88' : '#263128',
                    color: '#F7F5EF',
                  }}
                >
                  {foodRegenerative ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                  <span>
                    {foodRegenerative
                      ? 'Nature-Friendly Agroecology'
                      : 'Today (Intensive Monoculture)'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {content.id === 'rivers' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#263128]">Decommission Dam Barrier:</span>
                <span className="font-bold text-[#E8412C]">{riversDamProgress}% Removed</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={riversDamProgress}
                onChange={(e) => setRiversDamProgress(Number(e.target.value))}
                className="w-full accent-[#E8412C] cursor-pointer"
                aria-label="Dam removal slider"
              />
              <div className="flex justify-between text-[11px] text-[#62695F]">
                <span>Blocked Headwater</span>
                <span>Partial Passage</span>
                <span>Unrestricted Free Flow</span>
              </div>
            </div>
          )}

          {content.id === 'recovery' && (
            <div className="space-y-2 text-xs text-[#62695F]">
              <p>Visualizing empirical tiger population rebound in the 3D constellation.</p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-white/70 border border-[#DCE0D5]">
                  <div className="font-bold text-sm text-[#263128]">2,967 → 3,682</div>
                  <div className="text-[10px] text-[#62695F]">India Wild Tigers (2018–2022)</div>
                </div>
                <div className="p-3 rounded-lg bg-white/70 border border-[#DCE0D5]">
                  <div className="font-bold text-sm text-[#263128]">~3,200 → ~5,700</div>
                  <div className="text-[10px] text-[#62695F]">Global Wild Tigers Rebound</div>
                </div>
              </div>
            </div>
          )}

          {content.id === 'cities' && (
            <div className="space-y-2 text-xs text-[#62695F]">
              <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
                <Info size={14} />
                <span>Model labelled Illustrative</span>
              </div>
              <p>
                Rooftop bio-canopies and urban wetland stepping stones rendered above illustrate
                biophilic architecture potential.
              </p>
            </div>
          )}
        </div>

        {/* Prominent Verbatim Caveat Box */}
        <div
          className="p-4 sm:p-5 rounded-xl border border-amber-300 bg-amber-50/80 shadow-xs space-y-1.5"
          role="note"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <AlertTriangle size={15} className="text-amber-700" />
            <span>Essential Scientific Caveat (Verbatim)</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
            {content.caveat}
          </p>
        </div>

        {/* Pending Research block for Cities */}
        {content.isResearchPending && (
          <div className="p-4 rounded-xl border border-dashed border-slate-400 bg-slate-100/50 text-xs text-slate-600 space-y-1">
            <strong>TODO(RESEARCH):</strong>
            <p>
              Local urban habitat corridor metrics remain pending director review and peer-reviewed
              citation ingestion.
            </p>
          </div>
        )}

        {/* Your Move Panel (Excluded from recovery section per specification) */}
        {content.id !== 'recovery' && (
          <YourMovePanel
            sectionId={content.id}
            earlier={content.yourMove.earlier}
            now={content.yourMove.now}
          />
        )}
      </div>
    </section>
  );
};
