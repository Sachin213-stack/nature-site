import { create } from 'zustand';
import { SectionId, SiteState } from '@nature/contracts';

export interface SiteStore extends SiteState {
  // Additional runtime UI flags
  isMuted: boolean;
  toggleMute: () => void;
  isGuideOpen: boolean;
  setGuideOpen: (open: boolean) => void;
  qualityTier: 'high' | 'low';
  setQualityTier: (tier: 'high' | 'low') => void;
  isReducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  heroEnded: boolean;
  setHeroEnded: (ended: boolean) => void;
  logosDone: boolean;
  setLogosDone: (done: boolean) => void;

  // Section interaction states
  riversDamRemovalProgress: number; // 0 to 100
  setRiversDamRemovalProgress: (progress: number) => void;
  foodRegenerativeMode: boolean; // false = Today, true = Nature-friendly
  setFoodRegenerativeMode: (mode: boolean) => void;
  undergroundSelectedNode: number | null;
  setUndergroundSelectedNode: (node: number | null) => void;

  // Actions
  setProgress: (progress: number) => void;
  setActiveSection: (section: SectionId | 'intro' | 'footer') => void;
  setSectionProgress: (section: SectionId, progress: number) => void;
  markSectionRead: (section: SectionId) => void;
  setVoiceState: (voice: 'idle' | 'listening' | 'thinking' | 'speaking') => void;
  setMode: (mode: 'guide' | 'specialist') => void;
  setSpecialist: (specialist: SectionId | null) => void;
  scrollToSection: (id: SectionId | 'intro' | 'footer') => void;
}

const getInitialReadSections = (): SectionId[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = sessionStorage.getItem('nature_read_sections');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useSiteStore = create<SiteStore>((set, get) => ({
  progress: 0,
  activeSection: 'intro',
  sectionProgress: {
    loss: 0,
    underground: 0,
    food: 0,
    rivers: 0,
    recovery: 0,
    cities: 0,
  },
  readSections: getInitialReadSections(),
  voice: 'idle',
  mode: 'guide',
  specialist: null,

  isMuted: true,
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  isGuideOpen: false,
  setGuideOpen: (open) => set({ isGuideOpen: open }),
  qualityTier: 'high',
  setQualityTier: (tier) => set({ qualityTier: tier }),
  isReducedMotion:
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  setReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
  heroEnded: false,
  setHeroEnded: (ended) => set({ heroEnded: ended }),
  logosDone: false,
  setLogosDone: (done) => set({ logosDone: done }),

  riversDamRemovalProgress: 0,
  setRiversDamRemovalProgress: (progress) => set({ riversDamRemovalProgress: progress }),
  foodRegenerativeMode: false,
  setFoodRegenerativeMode: (mode) => set({ foodRegenerativeMode: mode }),
  undergroundSelectedNode: null,
  setUndergroundSelectedNode: (node) => set({ undergroundSelectedNode: node }),

  setProgress: (progress) => set({ progress }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setSectionProgress: (section, progress) =>
    set((s) => ({
      sectionProgress: {
        ...s.sectionProgress,
        [section]: progress,
      },
    })),
  markSectionRead: (section) => {
    const current = get().readSections;
    if (!current.includes(section)) {
      const updated = [...current, section];
      set({ readSections: updated });
      try {
        sessionStorage.setItem('nature_read_sections', JSON.stringify(updated));
      } catch {
        // Ignored
      }
    }
  },
  setVoiceState: (voice) => set({ voice }),
  setMode: (mode) => set({ mode }),
  setSpecialist: (specialist) => set({ specialist }),
  scrollToSection: (id) => {
    if (typeof window === 'undefined') return;
    const targetElement = document.getElementById(`section-${id}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: get().isReducedMotion ? 'auto' : 'smooth',
      });
    }
  },
}));
