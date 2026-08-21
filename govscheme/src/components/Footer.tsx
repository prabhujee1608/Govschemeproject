import React from 'react';
import { Landmark } from 'lucide-react';

export const Footer: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Logo & Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600">
                <Landmark className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="tracking-wider bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
                VAANI-SETU
              </span>
            </div>
            <p className="text-sm max-w-xs">
              One Conversation. Every Government Benefit.
            </p>
            <p className="text-xs text-orange-400 font-semibold tracking-wide">
              🇮🇳 Hackathon Prototype Showcase
            </p>
          </div>

          {/* Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Navigation</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <button onClick={() => setCurrentTab('home')} className="hover:text-white transition">
                      Home
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCurrentTab('schemes')} className="hover:text-white transition">
                      Schemes Discovery
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCurrentTab('how-it-works')} className="hover:text-white transition">
                      How It Works
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Resources</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <button onClick={() => setCurrentTab('about')} className="hover:text-white transition">
                      About Us
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCurrentTab('faq')} className="hover:text-white transition">
                      FAQ
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Security & Trust</h3>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                Vaani-Setu uses AI-guided tools to match user profiles with publicly available scheme requirements. Always confirm details on official government portals.
              </p>
              <div className="mt-4 p-3 rounded-lg border border-slate-800 bg-slate-950/50 text-xs text-emerald-400 font-semibold text-center">
                🏆 National Hackathon Grand Finale
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 Vaani-Setu. Built for Hackathon Grand Finale demonstration purposes only.
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
