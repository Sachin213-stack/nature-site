import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { SOURCES } from '../../data/content';

interface SourceChipProps {
  sourceId: string;
}

export const SourceChip: React.FC<SourceChipProps> = ({ sourceId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const record = SOURCES[sourceId];

  if (!record) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
        <AlertCircle size={12} />
        <span>Source pending</span>
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded border transition-colors hover:bg-slate-100"
        style={{
          borderColor: '#DCE0D5',
          color: '#263128',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
        title={`View source: ${record.title}`}
      >
        <ShieldCheck size={12} className="text-[#9CAF88]" />
        <span className="truncate max-w-[140px]">{record.publisher}</span>
      </button>

      {/* Source detail modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div
            className="w-full max-w-lg rounded-2xl p-6 shadow-xl border space-y-4"
            style={{ backgroundColor: '#F7F5EF', borderColor: '#DCE0D5' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {record.status === 'verified' ? 'Verified Source' : 'Pending Verification'}
                </span>
                <h3 className="text-lg font-bold mt-1 text-[#263128]">{record.title}</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-800 p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#62695F]">
              <p>
                <strong className="text-[#263128]">Publisher:</strong> {record.publisher}
              </p>
              <p>
                <strong className="text-[#263128]">Publication Date:</strong> {record.published}
              </p>
              <p>
                <strong className="text-[#263128]">Key Documented Metric:</strong> {record.figure}
              </p>
              <p>
                <strong className="text-[#263128]">Licence:</strong> {record.licence}
              </p>
            </div>

            {/* Caveat */}
            <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/70 text-xs text-amber-900 leading-relaxed">
              <strong>Caveat:</strong> {record.caveat}
            </div>

            <div className="flex items-center justify-between pt-2">
              {record.url && record.url !== '#' ? (
                <a
                  href={record.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline"
                >
                  <span>Open Primary Publication</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-xs text-slate-500">Internal documentation record</span>
              )}
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold border"
                style={{ borderColor: '#DCE0D5', color: '#263128' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
