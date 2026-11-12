import React, { useState } from 'react';
import { ArrowRight, History, Compass } from 'lucide-react';
import { SectionId } from '@nature/contracts';

interface YourMoveProps {
  sectionId: SectionId;
  earlier: {
    heading: string;
    description: string;
    actions: string[];
  };
  now: {
    heading: string;
    description: string;
    actions: string[];
    recoveryRef: SectionId;
  };
}

export const YourMovePanel: React.FC<YourMoveProps> = ({ earlier, now, sectionId }) => {
  const [activeTab, setActiveTab] = useState<'earlier' | 'now'>('now');

  const scrollToRecoveryHub = () => {
    const el = document.getElementById('recovery-hub');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      data-section={sectionId}
      className="mt-8 rounded-2xl border p-5 sm:p-7 shadow-xs backdrop-blur-sm"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderColor: '#DCE0D5',
      }}
    >
      <div className="flex items-center justify-between border-b pb-4 mb-4 border-[#DCE0D5]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#62695F]">
            Perspective Shift
          </span>
          <h4 className="text-base font-bold text-[#263128]">Your Move</h4>
        </div>

        {/* Tab buttons */}
        <div
          className="flex p-0.5 rounded-full border border-[#DCE0D5]"
          style={{ backgroundColor: '#F7F5EF' }}
        >
          <button
            onClick={() => setActiveTab('earlier')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'earlier'
                ? 'shadow-xs text-[#263128]'
                : 'text-[#62695F] hover:text-[#263128]'
            }`}
            style={{
              backgroundColor: activeTab === 'earlier' ? '#9CAF8840' : 'transparent',
            }}
          >
            <History size={12} />
            <span>Earlier</span>
          </button>
          <button
            onClick={() => setActiveTab('now')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'now'
                ? 'shadow-xs text-[#263128]'
                : 'text-[#62695F] hover:text-[#263128]'
            }`}
            style={{
              backgroundColor: activeTab === 'now' ? '#9CAF88' : 'transparent',
            }}
          >
            <Compass size={12} />
            <span>Now</span>
          </button>
        </div>
      </div>

      {activeTab === 'earlier' ? (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-[#263128]">{earlier.heading}</p>
          <p className="text-xs text-[#62695F] leading-relaxed">{earlier.description}</p>
          <ul className="space-y-1.5 text-xs text-[#263128] pt-1">
            {earlier.actions.map((act, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#263128]">{now.heading}</p>
            <p className="text-xs text-[#62695F] leading-relaxed mt-1">{now.description}</p>
            <ul className="space-y-1.5 text-xs text-[#263128] pt-2">
              {now.actions.map((act, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={scrollToRecoveryHub}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-xs transition-all hover:gap-3"
              style={{
                backgroundColor: '#263128',
                color: '#F7F5EF',
              }}
            >
              <span>See solutions for this section</span>
              <ArrowRight size={14} className="text-[#9CAF88]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
