import React from 'react';
import Link from 'next/link';
import { Menu, X, Landmark, Globe, Sun, Moon, LogIn, LogOut, User } from 'lucide-react';
import { t } from '../data/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  user: { name: string } | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const languages = [
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'en', label: 'English' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' }
];

const translationKeys: Record<string, string> = {
  'home': 'nav.home',
  'how-it-works': 'nav.howItWorks',
  'schemes': 'nav.schemes',
  'about': 'nav.about',
  'faq': 'nav.faq'
};

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  user,
  onOpenLogin,
  onLogout
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home' },
    { id: 'how-it-works' },
    { id: 'schemes' },
    { id: 'about' },
    { id: 'faq' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <button 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-950 dark:text-white transition hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 via-white to-emerald-600 p-[2px] shadow-sm">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-indigo-950 dark:bg-slate-900 text-white">
              <Landmark className="h-5 w-5 text-orange-400" />
            </div>
          </div>
          <span className="bg-gradient-to-r from-orange-600 via-indigo-950 to-emerald-700 dark:via-slate-200 dark:to-emerald-400 bg-clip-text text-transparent">
            VAANI-SETU
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`text-sm font-medium transition-colors hover:text-orange-600 dark:hover:text-orange-400 ${
                currentTab === item.id 
                  ? 'text-orange-600 dark:text-orange-400 font-semibold' 
                  : 'text-slate-600 dark:text-slate-350'
              }`}
            >
              {t(translationKeys[item.id], language)}
            </button>
          ))}
        </nav>

        {/* Right Section (Lang Selector, Theme, Auth & Button) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Lang */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-2.5 py-1">
            <Globe className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="dark:bg-slate-900 dark:text-white">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>



          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <User className="h-4.5 w-4.5 text-orange-500" />
                <span className="max-w-[80px] truncate">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-red-500 hover:bg-red-55 dark:hover:bg-red-950/20 transition"
                title={t("nav.logout", language)}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              <LogIn className="h-4 w-4" /> {t("nav.login", language)}
            </button>
          )}

          <button
            onClick={() => {
              setCurrentTab('home');
              setTimeout(() => {
                const element = document.getElementById('ai-assistant');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition"
          >
            {t("nav.try", language)}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5">
            <Globe className="h-3.5 w-3.5 text-slate-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-orange-100 bg-white px-4 pb-4 pt-2">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`text-left text-sm font-medium py-1.5 transition-colors ${
                  currentTab === item.id ? 'text-orange-600 font-semibold border-l-2 border-orange-600 pl-2' : 'text-slate-600 pl-2'
                }`}
              >
                {t(translationKeys[item.id], language)}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                setCurrentTab('home');
                setTimeout(() => {
                  const element = document.getElementById('ai-assistant');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full rounded-lg bg-orange-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition"
            >
              {t("nav.try", language)}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
