import React from 'react';
import { useSiteStore } from '../../store/useSiteStore';
import { LossScene } from './scenes/LossScene';
import { UndergroundScene } from './scenes/UndergroundScene';
import { FoodScene } from './scenes/FoodScene';
import { RiversScene } from './scenes/RiversScene';
import { RecoveryScene } from './scenes/RecoveryScene';
import { CitiesScene } from './scenes/CitiesScene';

export const SceneManager: React.FC = () => {
  const activeSection = useSiteStore((s) => s.activeSection);
  const quality = useSiteStore((s) => s.qualityTier);
  const sectionProgress = useSiteStore((s) => s.sectionProgress);

  return (
    <group>
      {activeSection === 'loss' && (
        <LossScene progress={sectionProgress.loss} quality={quality} active={true} />
      )}
      {activeSection === 'underground' && (
        <UndergroundScene progress={sectionProgress.underground} quality={quality} active={true} />
      )}
      {activeSection === 'food' && (
        <FoodScene progress={sectionProgress.food} quality={quality} active={true} />
      )}
      {activeSection === 'rivers' && (
        <RiversScene progress={sectionProgress.rivers} quality={quality} active={true} />
      )}
      {activeSection === 'recovery' && (
        <RecoveryScene progress={sectionProgress.recovery} quality={quality} active={true} />
      )}
      {activeSection === 'cities' && (
        <CitiesScene progress={sectionProgress.cities} quality={quality} active={true} />
      )}
      {/* Intro fallback subtle particle ambient */}
      {(activeSection === 'intro' || activeSection === 'footer') && (
        <LossScene progress={0} quality="low" active={false} />
      )}
    </group>
  );
};
