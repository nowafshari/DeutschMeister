import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProgress, SRSCardState, Achievement } from '../types';
import { soundEngine } from '../utils/audio';

const STORAGE_KEY = 'deutschmeister:progress:v2';

export const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'first_step', title: 'Erster Schritt', description: 'Erste Lerneinheit erfolgreich absolviert', icon: 'Footprints', unlocked: false },
  { id: 'blitz_ace', title: 'Artikel-Gott', description: 'Erziele 10 Punkte im Artikel-Blitz', icon: 'Zap', unlocked: false },
  { id: 'wordle_detective', title: 'Wort-Detektiv', description: 'Löse ein deutsches 5-Buchstaben-Worträtsel', icon: 'Search', unlocked: false },
  { id: 'sentence_architect', title: 'Satz-Architekt', description: 'Löse 3 Satz-Bau Puzzles fehlerfrei', icon: 'Layers', unlocked: false },
  { id: 'doener_pro', title: 'Döner-Diplomat', description: 'Bestelle im Imbiss erfolgreich mit Sonderwünschen', icon: 'Utensils', unlocked: false },
  { id: 'bureaucracy_boss', title: 'Bürgeramt-Bezwinger', description: 'Schließe das Wohnsitz-Anmeldegespräch ab', icon: 'Landmark', unlocked: false },
  { id: 'dtz_letter_master', title: 'DTZ-Briefmeister', description: 'Erstelle und prüfe einen formellen Brief', icon: 'Mail', unlocked: false },
  { id: 'flashcard_scholar', title: 'Wortschatz-Meister', description: 'Lerne 20 Karteikarten mit Spaced Repetition', icon: 'BookOpen', unlocked: false }
];

export const LEVEL_TITLES = [
  'Neuling (A1.1)',
  'Wort-Entdecker (A1.2)',
  'Satz-Bauer (A2.1)',
  'A2 Meister (A2.2)',
  'DTZ-Kandidat (A2-B1)',
  'Konversations-Held (B1.1)',
  'Bürokratie-Bezwinger (B1.1)',
  'Grammatik-König (B1.2)',
  'DTZ-Prüfungsprofi (B1.2)',
  'Deutsch-Meister (B1+)'
];

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  cardsReviewedCount: 0,
  gamesPlayedCount: 0,
  solvedWordlesCount: 0,
  completedLettersCount: 0,
  completedDialoguesCount: 0,
  highScoreArticleBlitz: 0,
  achievements: {},
  srs: {},
  soundEnabled: true,
  speechRate: 0.9,
  selectedVoiceURI: null
};

interface ProgressContextType {
  progress: UserProgress;
  addXp: (amount: number, reason?: string) => void;
  recordCardReview: (cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') => void;
  recordGamePlayed: (gameType: 'blitz' | 'wordle' | 'scramble' | 'dialogue' | 'letter', score?: number) => void;
  toggleSound: () => void;
  setSpeechRate: (rate: number) => void;
  setSelectedVoice: (voiceURI: string | null) => void;
  exportProgress: () => void;
  importProgress: (jsonString: string) => { success: boolean; message: string };
  resetProgress: () => void;
  getXpForNextLevel: () => { current: number; max: number; percentage: number };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // check streak
        const today = new Date().toISOString().slice(0, 10);
        const last = parsed.lastActiveDate;
        let streak = parsed.streak || 1;
        if (last && last !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          if (last === yesterday) {
            streak += 1;
          } else {
            streak = 1; // broken streak
          }
        }
        return { ...parsed, streak, lastActiveDate: today };
      }
    } catch {
      // fallback
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    soundEngine.setSoundEnabled(progress.soundEnabled);
    soundEngine.setSpeechRate(progress.speechRate);
    if (progress.selectedVoiceURI) {
      soundEngine.setSelectedVoiceURI(progress.selectedVoiceURI);
    }
  }, [progress]);

  const calculateLevel = (xp: number): number => {
    // Level 1: 0-99, Level 2: 100-299, Level 3: 300-599, etc.
    let lvl = 1;
    let threshold = 100;
    let accumulated = 0;
    while (xp >= accumulated + threshold && lvl < 10) {
      accumulated += threshold;
      lvl += 1;
      threshold += 100;
    }
    return lvl;
  };

  const getXpForNextLevel = () => {
    let lvl = 1;
    let threshold = 100;
    let accumulated = 0;
    while (progress.xp >= accumulated + threshold && lvl < 10) {
      accumulated += threshold;
      lvl += 1;
      threshold += 100;
    }
    const currentInLevel = progress.xp - accumulated;
    const percentage = Math.min(100, Math.floor((currentInLevel / threshold) * 100));
    return { current: currentInLevel, max: threshold, percentage };
  };

  const checkAchievements = (curr: UserProgress) => {
    const unlocked = { ...curr.achievements };
    let newlyUnlocked = false;

    if (!unlocked['first_step'] && (curr.xp > 0 || curr.cardsReviewedCount > 0)) {
      unlocked['first_step'] = true;
      newlyUnlocked = true;
    }
    if (!unlocked['blitz_ace'] && curr.highScoreArticleBlitz >= 10) {
      unlocked['blitz_ace'] = true;
      newlyUnlocked = true;
    }
    if (!unlocked['wordle_detective'] && curr.solvedWordlesCount >= 1) {
      unlocked['wordle_detective'] = true;
      newlyUnlocked = true;
    }
    if (!unlocked['sentence_architect'] && curr.gamesPlayedCount >= 3) {
      unlocked['sentence_architect'] = true;
      newlyUnlocked = true;
    }
    if (!unlocked['doener_pro'] && curr.completedDialoguesCount >= 1) {
      unlocked['doener_pro'] = true;
      newlyUnlocked = true;
    }
    if (!unlocked['bureaucracy_boss'] && curr.completedDialoguesCount >= 2) {
      unlocked['bureaucracy_boss'] = true;
      newlyUnlocked = true;
    }
    if (!unlocked['dtz_letter_master'] && curr.completedLettersCount >= 1) {
      unlocked['dtz_letter_master'] = true;
      newlyUnlocked = true;
    }
    if (!unlocked['flashcard_scholar'] && curr.cardsReviewedCount >= 20) {
      unlocked['flashcard_scholar'] = true;
      newlyUnlocked = true;
    }

    if (newlyUnlocked) {
      soundEngine.playLevelUpSound();
    }

    return unlocked;
  };

  const addXp = (amount: number) => {
    setProgress(prev => {
      const newXp = prev.xp + amount;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newXp);

      if (newLevel > oldLevel) {
        soundEngine.playLevelUpSound();
      } else {
        soundEngine.playSuccessSound();
      }

      const updated = {
        ...prev,
        xp: newXp,
        level: newLevel
      };

      updated.achievements = checkAchievements(updated);
      return updated;
    });
  };

  const recordCardReview = (cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') => {
    setProgress(prev => {
      const currentSrs: SRSCardState = prev.srs[cardId] || {
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0,
        dueDate: new Date().toISOString()
      };

      let nextInterval = 1;
      let nextRepetitions = currentSrs.repetitions;
      let nextEase = currentSrs.easeFactor;

      if (rating === 'again') {
        nextInterval = 1;
        nextRepetitions = 0;
        nextEase = Math.max(1.3, nextEase - 0.2);
      } else if (rating === 'hard') {
        nextInterval = Math.max(1, Math.round(currentSrs.interval * 1.2));
        nextEase = Math.max(1.3, nextEase - 0.15);
      } else if (rating === 'good') {
        nextRepetitions += 1;
        if (nextRepetitions === 1) nextInterval = 1;
        else if (nextRepetitions === 2) nextInterval = 3;
        else nextInterval = Math.round(currentSrs.interval * nextEase);
      } else if (rating === 'easy') {
        nextRepetitions += 1;
        if (nextRepetitions === 1) nextInterval = 4;
        else nextInterval = Math.round(currentSrs.interval * nextEase * 1.4);
        nextEase = Math.min(3.0, nextEase + 0.15);
      }

      const due = new Date();
      due.setDate(due.getDate() + nextInterval);

      const newSrs = {
        ...prev.srs,
        [cardId]: {
          interval: nextInterval,
          easeFactor: nextEase,
          repetitions: nextRepetitions,
          dueDate: due.toISOString().slice(0, 10),
          lastReviewed: new Date().toISOString().slice(0, 10)
        }
      };

      const xpGained = rating === 'easy' ? 15 : rating === 'good' ? 10 : rating === 'hard' ? 5 : 2;
      const updated = {
        ...prev,
        cardsReviewedCount: prev.cardsReviewedCount + 1,
        xp: prev.xp + xpGained,
        level: calculateLevel(prev.xp + xpGained),
        srs: newSrs
      };

      updated.achievements = checkAchievements(updated);
      return updated;
    });
  };

  const recordGamePlayed = (gameType: 'blitz' | 'wordle' | 'scramble' | 'dialogue' | 'letter', score: number = 0) => {
    setProgress(prev => {
      const updated = { ...prev };
      updated.gamesPlayedCount += 1;

      if (gameType === 'blitz') {
        if (score > updated.highScoreArticleBlitz) {
          updated.highScoreArticleBlitz = score;
        }
      } else if (gameType === 'wordle') {
        updated.solvedWordlesCount += 1;
      } else if (gameType === 'dialogue') {
        updated.completedDialoguesCount += 1;
      } else if (gameType === 'letter') {
        updated.completedLettersCount += 1;
      }

      updated.achievements = checkAchievements(updated);
      return updated;
    });
  };

  const toggleSound = () => {
    setProgress(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const setSpeechRate = (rate: number) => {
    setProgress(prev => ({ ...prev, speechRate: rate }));
  };

  const setSelectedVoice = (voiceURI: string | null) => {
    setProgress(prev => ({ ...prev, selectedVoiceURI: voiceURI }));
    soundEngine.setSelectedVoiceURI(voiceURI);
  };

  const exportProgress = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadAnchor.setAttribute("download", `deutschmeister_backup_${dateStr}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      soundEngine.playSuccessSound();
    } catch {
      alert('Export fehlgeschlagen.');
    }
  };

  const importProgress = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed !== 'object' || parsed === null) {
        return { success: false, message: 'Ungültige JSON-Datei.' };
      }
      if (typeof parsed.xp !== 'number') {
        return { success: false, message: 'Ungültiges Datenformat: XP fehlt.' };
      }
      const restored: UserProgress = {
        ...INITIAL_PROGRESS,
        ...parsed,
        level: calculateLevel(parsed.xp || 0),
        lastActiveDate: new Date().toISOString().slice(0, 10)
      };
      setProgress(restored);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(restored));
      soundEngine.playLevelUpSound();
      return { success: true, message: `Erfolgreich wiederhergestellt: Level ${restored.level}, ${restored.xp} XP!` };
    } catch {
      return { success: false, message: 'JSON konnte nicht analysiert werden.' };
    }
  };

  const resetProgress = () => {
    if (confirm('Möchtest du wirklich deinen gesamten Fortschritt und alle Level zurücksetzen?')) {
      setProgress(INITIAL_PROGRESS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      addXp,
      recordCardReview,
      recordGamePlayed,
      toggleSound,
      setSpeechRate,
      setSelectedVoice,
      exportProgress,
      importProgress,
      resetProgress,
      getXpForNextLevel
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
