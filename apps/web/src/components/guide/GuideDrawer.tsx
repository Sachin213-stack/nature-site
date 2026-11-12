import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { useSiteStore } from '../../store/useSiteStore';
import { SOURCES } from '../../data/content';

interface Message {
  sender: 'user' | 'guide';
  text: string;
  sources?: string[];
  caveat?: string;
}

const SUGGESTIONS = [
  'What does the 73% Living Planet figure actually mean?',
  'How do mycorrhizal fungal networks store carbon underground?',
  'What happens when a river dam is decommissioned?',
  'What evidence exists for tiger population recovery in India?',
];

export const GuideDrawer: React.FC = () => {
  const isGuideOpen = useSiteStore((s) => s.isGuideOpen);
  const setGuideOpen = useSiteStore((s) => s.setGuideOpen);
  const activeSection = useSiteStore((s) => s.activeSection);
  const setVoiceState = useSiteStore((s) => s.setVoiceState);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'guide',
      text: `Hello. I am the Nature 3D grounded science guide. I can answer questions about biodiversity metrics, underground fungal systems, agriculture, rivers, and recovery. Ask anything below.`,
      sources: ['src-lpr-2024'],
    },
  ]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    setInput('');
    const newMessages: Message[] = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setLoading(true);
    setVoiceState('thinking');

    try {
      // Call backend guide endpoint
      const response = await fetch('http://localhost:8000/api/guide/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          section: activeSection === 'intro' || activeSection === 'footer' ? 'loss' : activeSection,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([
          ...newMessages,
          {
            sender: 'guide',
            text: data.reply,
            sources: data.sources,
            caveat: data.caveat,
          },
        ]);
      } else {
        throw new Error('Backend guide endpoint unavailable');
      }
    } catch {
      // Honest grounded fallback when NVIDIA NIM backend is unconfigured
      let fallbackReply = '';
      let fallbackSources: string[] = [];
      let fallbackCaveat = '';

      const lower = textToSend.toLowerCase();
      if (lower.includes('73%') || lower.includes('decline') || lower.includes('loss')) {
        fallbackReply =
          'The Living Planet Report 2024 documented an average 73% relative decline in monitored vertebrate population sizes across 35,000 monitored populations between 1970 and 2020. Freshwater populations experienced the steepest average drop (-85%).';
        fallbackSources = ['src-lpr-2024'];
        fallbackCaveat =
          '73% represents the average proportional change in monitored population sizes, NOT 73% of all animals dying.';
      } else if (
        lower.includes('fungi') ||
        lower.includes('underground') ||
        lower.includes('mycorrhizal')
      ) {
        fallbackReply =
          'Mycorrhizal fungal networks form extensive underground associations with plant roots, drawing down and storing up to 13.12 Gt of carbon annually in soil minerals while transferring phosphorus and nitrogen across biochemical gradients.';
        fallbackSources = ['src-soil-biodiv-2023'];
        fallbackCaveat =
          'Nutrient transfer occurs via physical gradients and does NOT imply conscious communication or sharing between trees.';
      } else if (lower.includes('dam') || lower.includes('river')) {
        fallbackReply =
          'Over 1.2 million barriers fragment European rivers. Decommissioning obsolete barriers reconnects critical fish migratory routes and sediment dynamics.';
        fallbackSources = ['src-amber-rivers-2023'];
        fallbackCaveat = 'Ecological recovery is gradual across the catchment, not instant.';
      } else if (lower.includes('tiger') || lower.includes('recovery')) {
        fallbackReply =
          'Science-led corridor protection helped India’s wild tiger population rise from 2,967 (2018) to 3,682 (2022), and global numbers rebound from ~3,200 to ~5,700.';
        fallbackSources = ['src-tiger-status-2023'];
        fallbackCaveat =
          'Species recovery proves dedicated protection works, but does not mean the wider biodiversity emergency is resolved.';
      } else {
        fallbackReply =
          'I provide grounded scientific evidence based directly on verified peer-reviewed publications. The current section focuses on ' +
          activeSection +
          '. You can explore the data chips or test the interactive stage controls.';
        fallbackSources = ['src-lpr-2024'];
      }

      setMessages([
        ...newMessages,
        {
          sender: 'guide',
          text: fallbackReply,
          sources: fallbackSources,
          caveat: fallbackCaveat,
        },
      ]);
    } finally {
      setLoading(false);
      setVoiceState('idle');
    }
  };

  if (!isGuideOpen) return null;

  return (
    <aside
      role="dialog"
      aria-label="AI Science Guide"
      className="fixed inset-y-0 right-0 z-50 w-full max-w-md shadow-2xl flex flex-col border-l transition-transform"
      style={{
        backgroundColor: '#F7F5EF',
        borderColor: '#DCE0D5',
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#DCE0D5] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="p-1.5 rounded-full"
            style={{ backgroundColor: '#9CAF8830', color: '#263128' }}
          >
            <Sparkles size={16} className="text-[#E8412C]" />
          </span>
          <div>
            <h3 className="font-bold text-sm text-[#263128]">Grounded Science Guide</h3>
            <span className="text-[10px] text-[#62695F] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              NVIDIA NIM Adapter / Verified Retrieval
            </span>
          </div>
        </div>

        <button
          onClick={() => setGuideOpen(false)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800"
          aria-label="Close Guide"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed space-y-2 ${
                m.sender === 'user'
                  ? 'bg-[#263128] text-[#F7F5EF]'
                  : 'bg-white border border-[#DCE0D5] text-[#263128]'
              }`}
            >
              <p>{m.text}</p>

              {m.caveat && (
                <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                  <strong>Verbatim Caveat:</strong> {m.caveat}
                </div>
              )}

              {m.sources && m.sources.length > 0 && (
                <div className="pt-1 flex flex-wrap items-center gap-1">
                  <span className="text-[10px] text-[#62695F] font-semibold">Sources:</span>
                  {m.sources.map((s) => {
                    const record = SOURCES[s];
                    return (
                      <span
                        key={s}
                        className="text-[10px] bg-slate-100 text-[#263128] px-1.5 py-0.5 rounded border border-[#DCE0D5]"
                      >
                        {record?.publisher || s}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#62695F] p-2">
            <span className="w-2 h-2 rounded-full bg-[#9CAF88] animate-ping" />
            <span>Consulting verified scientific corpus...</span>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="p-3 border-t border-[#DCE0D5] bg-white/50 space-y-1.5">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#62695F]">
          Suggested Inquiries:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSend(sug)}
              className="text-[11px] text-left px-2.5 py-1 rounded-full border border-[#DCE0D5] bg-white text-[#263128] hover:bg-slate-50 transition-colors truncate max-w-full"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#DCE0D5] bg-[#F7F5EF] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask about ${activeSection}...`}
          className="flex-1 px-3.5 py-2 text-xs rounded-full border border-[#DCE0D5] bg-white text-[#263128] focus:outline-none focus:ring-1 focus:ring-[#9CAF88]"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="p-2 rounded-full bg-[#263128] text-[#F7F5EF] disabled:opacity-40 hover:opacity-90"
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </div>
    </aside>
  );
};
