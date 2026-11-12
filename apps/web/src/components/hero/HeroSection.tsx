import React from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { useSiteStore } from '../../store/useSiteStore';

export const HeroSection: React.FC = () => {
  const scrollToSection = useSiteStore((s) => s.scrollToSection);
  const isMuted = useSiteStore((s) => s.isMuted);
  const toggleMute = useSiteStore((s) => s.toggleMute);

  return (
    <section
      id="section-intro"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-12 text-center"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6 z-10">
        {/* Subtle pill */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm"
          style={{
            backgroundColor: 'rgba(156, 175, 136, 0.25)',
            border: '1px solid rgba(156, 175, 136, 0.5)',
            color: '#263128',
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E8412C' }} />
          Interactive 3D Documentary & Science Guide
        </div>

        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08]"
          style={{ color: '#263128' }}
        >
          Nature Loss <br />
          <span className="font-serif italic font-normal" style={{ color: '#9CAF88' }}>
            & The Path to
          </span>{' '}
          Recovery
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed"
          style={{ color: '#62695F' }}
        >
          A scroll-driven journey through 50 years of monitored biodiversity data. Explore the
          systems beneath our feet, along our waterways, and across global landscapes. Every claim
          verifiable. Every caveat visible.
        </p>

        {/* Action Controls */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('loss')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: '#E8412C', // Tomato Red CTA
              color: '#F7F5EF',
            }}
          >
            <span>Begin Exploration</span>
            <ChevronDown size={16} />
          </button>

          <button
            onClick={toggleMute}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm border transition-all hover:bg-slate-200/50"
            style={{
              borderColor: '#DCE0D5',
              color: '#263128',
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isMuted ? 'Enable Sound' : 'Mute Sound'}</span>
          </button>
        </div>
      </div>

      {/* Floating Section Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 text-xs text-[#62695F]">
        <span>Scroll to enter Section 01 · Global Loss</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
};
