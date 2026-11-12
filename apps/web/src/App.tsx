import React, { useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { SectionShell } from './components/sections/SectionShell';
import { RecoveryHub } from './components/recovery/RecoveryHub';
import { Footer } from './components/footer/Footer';
import { SceneCanvas } from './components/canvas/SceneCanvas';
import { GuideDrawer } from './components/guide/GuideDrawer';
import { SECTIONS } from './data/content';
import { useSiteStore } from './store/useSiteStore';

export const App: React.FC = () => {
  const setProgress = useSiteStore((s) => s.setProgress);

  // Global scroll listener for whole-page progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const p = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
        setProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setProgress]);

  return (
    <div
      className="min-h-screen relative text-[#263128]"
      style={{
        backgroundColor: '#F7F5EF',
      }}
    >
      {/* Fixed 3D Canvas Background */}
      <SceneCanvas />

      {/* Main Interactive Website Experience */}
      <div className="relative z-10 flex flex-col">
        <Navbar />

        <main className="flex-1 flex flex-col">
          <HeroSection />

          {/* Six Core Storytelling Sections */}
          {SECTIONS.map((section) => (
            <SectionShell key={section.id} content={section} />
          ))}

          {/* Recovery Hub with Dynamic Read-Tracking Solutions */}
          <RecoveryHub />
        </main>

        <Footer />
      </div>

      {/* Slide-out Grounded AI Guide Drawer */}
      <GuideDrawer />
    </div>
  );
};

export default App;
