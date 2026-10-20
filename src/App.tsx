import { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ArticleBlitz } from './components/ArticleBlitz';
import { GermanWordle } from './components/GermanWordle';
import { SentenceScramble } from './components/SentenceScramble';
import { DialogueSimulator } from './components/DialogueSimulator';
import { FlashcardsView } from './components/FlashcardsView';
import { DTZExamLab } from './components/DTZExamLab';
import { GrammarHandbook } from './components/GrammarHandbook';

export function AppContent() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1 pb-16">
        {currentTab === 'dashboard' && <Dashboard setCurrentTab={setCurrentTab} />}
        {currentTab === 'blitz' && <ArticleBlitz />}
        {currentTab === 'wordle' && <GermanWordle />}
        {currentTab === 'scramble' && <SentenceScramble />}
        {currentTab === 'dialogue' && <DialogueSimulator />}
        {currentTab === 'flashcards' && <FlashcardsView />}
        {currentTab === 'dtz' && <DTZExamLab />}
        {currentTab === 'grammar' && <GrammarHandbook />}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">DeutschMeister (DEU)</span>
            <span>—</span>
            <span>100% Offline & Standalone Deutsch-Lernplattform (A2–B1)</span>
          </div>
          <div className="text-[11px] text-slate-600">
            Angepasst für DTZ-Prüfungsvorbereitung, Blue-Card & Leben in Deutschland
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
