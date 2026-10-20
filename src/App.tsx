import { useState, useEffect, useCallback } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ArticleBlitz } from './components/ArticleBlitz';
import { GermanWordle } from './components/GermanWordle';
import { SentenceScramble } from './components/SentenceScramble';
import { DialogueSimulator } from './components/DialogueSimulator';
import { FlashcardsView } from './components/FlashcardsView';
import { DTZExamLab } from './components/DTZExamLab';
import { ListeningQuiz } from './components/ListeningQuiz';
import { FormularTrainer } from './components/FormularTrainer';
import { GrammarHandbook } from './components/GrammarHandbook';
import { getTabFromUrl, syncUrlAndTitle } from './utils/navigation';

export function AppContent() {
  const [currentTab, setCurrentTab] = useState<string>(() => getTabFromUrl());

  const handleSelectTab = useCallback((tabId: string) => {
    setCurrentTab(tabId);
    syncUrlAndTitle(tabId);
  }, []);

  // Listen to browser Back / Forward buttons & Hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const detected = getTabFromUrl();
      setCurrentTab(detected);
      syncUrlAndTitle(detected, true);
    };

    // Sync on initial load
    syncUrlAndTitle(currentTab, true);

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar currentTab={currentTab} setCurrentTab={handleSelectTab} />

      <main className="flex-1 pb-16">
        {currentTab === 'dashboard' && <Dashboard setCurrentTab={handleSelectTab} />}
        {currentTab === 'blitz' && <ArticleBlitz />}
        {currentTab === 'wordle' && <GermanWordle />}
        {currentTab === 'scramble' && <SentenceScramble />}
        {currentTab === 'dialogue' && <DialogueSimulator />}
        {currentTab === 'flashcards' && <FlashcardsView />}
        {currentTab === 'dtz' && <DTZExamLab />}
        {currentTab === 'listening' && <ListeningQuiz />}
        {currentTab === 'forms' && <FormularTrainer />}
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
