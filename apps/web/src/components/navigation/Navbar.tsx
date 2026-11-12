import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X } from 'lucide-react';
import { SectionId } from '@nature/contracts';
import { useSiteStore } from '../../store/useSiteStore';

const NAV_ITEMS: { id: SectionId | 'recovery-hub'; label: string }[] = [
  { id: 'loss', label: 'Loss' },
  { id: 'underground', label: 'Underground' },
  { id: 'food', label: 'Food' },
  { id: 'rivers', label: 'Rivers' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'cities', label: 'Cities' },
  { id: 'recovery-hub', label: 'Your Move' },
];

export const Navbar: React.FC = () => {
  const activeSection = useSiteStore((s) => s.activeSection);
  const scrollToSection = useSiteStore((s) => s.scrollToSection);
  const isMuted = useSiteStore((s) => s.isMuted);
  const toggleMute = useSiteStore((s) => s.toggleMute);
  const isGuideOpen = useSiteStore((s) => s.isGuideOpen);
  const setGuideOpen = useSiteStore((s) => s.setGuideOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: SectionId | 'recovery-hub') => {
    setMobileMenuOpen(false);
    if (id === 'recovery-hub') {
      const el = document.getElementById('recovery-hub');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className="backdrop-blur-md border-b px-4 sm:px-8 py-3.5 flex items-center justify-between"
        style={{
          backgroundColor: 'rgba(247, 245, 239, 0.88)',
          borderColor: '#DCE0D5',
        }}
      >
        {/* Brand */}
        <button
          onClick={() => scrollToSection('intro')}
          className="flex items-center gap-2 group text-left"
          aria-label="Back to top"
        >
          <span
            className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
            style={{ backgroundColor: '#9CAF88' }}
          />
          <span className="font-bold text-lg tracking-tight" style={{ color: '#263128' }}>
            Nature 3D
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive ? 'shadow-sm' : 'hover:bg-slate-200/50'
                }`}
                style={{
                  color: isActive ? '#F7F5EF' : '#263128',
                  backgroundColor: isActive ? '#263128' : 'transparent',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute narration' : 'Mute narration'}
            title={isMuted ? 'Sound is muted (Click to activate)' : 'Sound is active'}
            className="p-2 rounded-full border transition-colors hover:bg-slate-200/60"
            style={{ borderColor: '#DCE0D5', color: '#263128' }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* AI Guide trigger */}
          <button
            onClick={() => setGuideOpen(!isGuideOpen)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all hover:opacity-90"
            style={{
              backgroundColor: '#9CAF88',
              color: '#263128',
            }}
          >
            <Sparkles size={14} className="text-[#E8412C]" />
            <span>AI Guide</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border ml-1"
            style={{ borderColor: '#DCE0D5', color: '#263128' }}
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b px-6 py-4 space-y-2 backdrop-blur-lg shadow-lg"
          style={{
            backgroundColor: '#F7F5EF',
            borderColor: '#DCE0D5',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2 px-3 rounded-lg text-sm font-medium hover:bg-slate-100"
              style={{ color: '#263128' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
