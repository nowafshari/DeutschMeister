import React from 'react';
import { useProgress, LEVEL_TITLES } from '../context/ProgressContext';
import { Flame, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { progress, toggleSound, setSpeechRate, getXpForNextLevel } = useProgress();
  const xpInfo = getXpForNextLevel();
  const levelTitle = LEVEL_TITLES[progress.level - 1] || 'Deutsch-Meister';

  const navItems = [
    { id: 'dashboard', label: 'Übersicht' },
    { id: 'blitz', label: '⚡ Artikel-Blitz' },
    { id: 'wordle', label: '🧩 Wort-Rätsel' },
    { id: 'scramble', label: '🧱 Satz-Meister' },
    { id: 'dialogue', label: '💬 Dialoge' },
    { id: 'flashcards', label: '🃏 Karteikarten' },
    { id: 'dtz', label: '🎓 DTZ-Labor' },
    { id: 'grammar', label: '📖 Grammatik' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => {
            soundEngine.playClickSound();
            setCurrentTab('dashboard');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 p-[2px] shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 text-lg">
              DE
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-lg tracking-tight">DeutschMeister</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                A2 ➔ B1
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">DTZ & Alltag Training</p>
          </div>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-sm font-semibold text-orange-400">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span>{progress.streak} <span className="hidden sm:inline font-normal text-xs text-slate-400">Tage</span></span>
          </div>

          {/* Level & XP */}
          <div className="hidden sm:flex flex-col items-end min-w-[140px]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Stufe {progress.level}: <span className="text-amber-400">{levelTitle}</span></span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1 border border-slate-700">
              <div 
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-full transition-all duration-500"
                style={{ width: `${xpInfo.percentage}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 font-mono">{xpInfo.current} / {xpInfo.max} XP</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
              soundEngine.playClickSound();
            }}
            title={progress.soundEnabled ? 'Ton ausschalten' : 'Ton einschalten'}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {progress.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Speed Selector */}
          <div className="hidden md:flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700 text-xs text-slate-300 font-medium">
            <span className="text-slate-400 mr-1">Tempo:</span>
            {[0.8, 1.0].map(rate => (
              <button
                key={rate}
                onClick={() => setSpeechRate(rate)}
                className={`px-1.5 py-0.5 rounded text-[11px] transition-colors ${
                  progress.speechRate === rate 
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 sm:space-x-2 py-2 min-w-max">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playClickSound();
                  setCurrentTab(item.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md shadow-rose-900/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
