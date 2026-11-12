import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, Heart } from 'lucide-react';
import { SOURCES } from '../../data/content';
import { useSiteStore } from '../../store/useSiteStore';

export const Footer: React.FC = () => {
  const scrollToSection = useSiteStore((s) => s.scrollToSection);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <footer
      id="section-footer"
      className="relative border-t border-[#DCE0D5] py-20 px-4 sm:px-8 md:px-16"
      style={{
        backgroundColor: '#F7F5EF',
        color: '#263128',
      }}
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Top Grid: Mission & Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Mission statement */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: '#9CAF88' }} />
              <span className="font-extrabold text-xl tracking-tight text-[#263128]">
                Nature 3D
              </span>
            </div>

            <p className="text-sm text-[#62695F] leading-relaxed">
              Nature 3D is a non-profit scientific communication platform bringing empirical
              biodiversity monitoring data into clear, interactive 3D perspective. All figures cite
              primary source records; all scientific caveats are published without dilution.
            </p>

            <div className="space-y-2 text-xs text-[#62695F]">
              <div className="font-semibold text-[#263128]">Editorial Principles:</div>
              <ul className="space-y-1 list-disc list-inside">
                <li>No invented statistics or ungrounded claims</li>
                <li>Zero corporate sponsorship bias</li>
                <li>Open-access educational science dissemination</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#263128]">
              <button
                onClick={() => setPrivacyOpen(true)}
                className="hover:underline text-[#E8412C]"
              >
                Privacy & Data Consent
              </button>
              <span>·</span>
              <button onClick={() => scrollToSection('intro')} className="hover:underline">
                Back to Top ↑
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="p-6 sm:p-8 rounded-3xl border shadow-xs space-y-4"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#DCE0D5',
            }}
          >
            <div>
              <h3 className="font-bold text-lg text-[#263128]">Get in Touch</h3>
              <p className="text-xs text-[#62695F] mt-0.5">
                Questions, scientific source corrections, or educational licensing.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-900">Message Transmitted</h4>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out. Your inquiry has been routed to our science team.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-3 text-xs font-semibold text-emerald-800 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#62695F] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Jane Doe"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE0D5] bg-[#F7F5EF] text-[#263128] focus:outline-none focus:ring-1 focus:ring-[#9CAF88]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#62695F] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@university.edu"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE0D5] bg-[#F7F5EF] text-[#263128] focus:outline-none focus:ring-1 focus:ring-[#9CAF88]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#62695F] mb-1">
                    Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE0D5] bg-[#F7F5EF] text-[#263128] focus:outline-none focus:ring-1 focus:ring-[#9CAF88]"
                  >
                    <option value="inquiry">General Scientific Inquiry</option>
                    <option value="source">Source Attribution / Correction</option>
                    <option value="school">Educational Classroom Use</option>
                    <option value="media">Media / Press Access</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#62695F] mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your inquiry or feedback..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE0D5] bg-[#F7F5EF] text-[#263128] focus:outline-none focus:ring-1 focus:ring-[#9CAF88]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full font-bold text-xs shadow-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#E8412C',
                    color: '#F7F5EF',
                  }}
                >
                  <span>Submit Inquiry</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sources Attribution Registry List (C9) */}
        <div className="pt-8 border-t border-[#DCE0D5] space-y-4">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#9CAF88]" />
            <h4 className="font-bold text-sm text-[#263128]">
              Primary Documented Sources Registry
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {Object.values(SOURCES).map((src) => (
              <div
                key={src.id}
                className="p-3.5 rounded-xl border border-[#DCE0D5] bg-white/70 space-y-1"
              >
                <div className="font-bold text-[#263128] line-clamp-1">{src.publisher}</div>
                <div className="text-[11px] text-[#62695F] line-clamp-2">{src.title}</div>
                <div className="text-[10px] text-emerald-800 font-semibold pt-1">
                  Status: {src.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#DCE0D5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#62695F] gap-3">
          <div>© 2026 Nature 3D Project. Published under CC BY-NC 4.0.</div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Designed with</span>
            <Heart size={12} className="text-[#E8412C] fill-[#E8412C]" />
            <span>for Planetary Stewardship</span>
          </div>
        </div>
      </div>

      {/* Privacy modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div
            className="w-full max-w-lg rounded-2xl p-6 shadow-xl border space-y-4"
            style={{ backgroundColor: '#F7F5EF', borderColor: '#DCE0D5' }}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-[#263128]">Privacy & Data Consent</h3>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="text-slate-500 hover:text-slate-800 p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#62695F] leading-relaxed">
              <p>
                <strong>Zero Tracking Policy:</strong> Nature 3D does not run third-party tracking
                cookies, surveillance analytics, or ad trackers.
              </p>
              <p>
                <strong>Local Storage:</strong> Your reading progress across sections is cached
                strictly on your local device (via browser session storage) to tailor the Recovery
                Hub solutions. It is never transmitted to an external telemetry server.
              </p>
              <p>
                <strong>AI & Voice Interactions:</strong> Queries submitted to the AI Science Guide
                are processed securely on the backend without retaining audio streams or persistent
                user profiling.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#263128]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
