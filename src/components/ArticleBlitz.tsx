import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useProgress } from '../context/ProgressContext';
import { ARTICLE_GAME_WORDS } from '../data/articleGameWords';
import type { ArticleGameItem } from '../types';
import { Zap, Volume2, RotateCcw, Award, CheckCircle2, XCircle } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const ArticleBlitz: React.FC = () => {
  const { addXp, recordGamePlayed, progress } = useProgress();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [deck, setDeck] = useState<ArticleGameItem[]>([]);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    word: string;
    correctArticle: string;
    mnemonic?: string;
  } | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const shuffleDeck = () => {
    return [...ARTICLE_GAME_WORDS].sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    const shuffled = shuffleDeck();
    setDeck(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setTimeLeft(60);
    setFeedback(null);
    setGameState('playing');
    soundEngine.playClickSound();
  };

  const endGame = useCallback(() => {
    setGameState('gameover');
    soundEngine.playLevelUpSound();
    const finalScore = score;
    const earnedXp = Math.max(10, Math.floor(finalScore * 5));
    addXp(earnedXp);
    recordGamePlayed('blitz', finalScore);
  }, [score, addXp, recordGamePlayed]);

  // Timer loop
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, endGame]);

  const currentWord = deck[currentIndex];

  const handleAnswer = (selectedArticle: 'der' | 'die' | 'das') => {
    if (gameState !== 'playing' || !currentWord) return;

    const isCorrect = selectedArticle === currentWord.article;

    if (isCorrect) {
      soundEngine.playSuccessSound();
      const multiplier = combo >= 5 ? 3 : combo >= 2 ? 2 : 1;
      const points = 1 * multiplier;
      setScore(prev => prev + points);
      setCombo(prev => prev + 1);

      if ((combo + 1) % 5 === 0) {
        soundEngine.playStreakSound();
      }

      setFeedback({
        correct: true,
        word: currentWord.word,
        correctArticle: currentWord.article,
        mnemonic: currentWord.ruleMnemonic
      });
    } else {
      soundEngine.playErrorSound();
      setCombo(0);
      setFeedback({
        correct: false,
        word: currentWord.word,
        correctArticle: currentWord.article,
        mnemonic: currentWord.ruleMnemonic
      });
    }

    // Advance to next word
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Re-shuffle if we ran through all
      setDeck(shuffleDeck());
      setCurrentIndex(0);
    }
  };

  // Keyboard controls: 1=DER, 2=DIE, 3=DAS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === '1' || e.key.toLowerCase() === 'd') {
        handleAnswer('der');
      } else if (e.key === '2' || e.key.toLowerCase() === 's') {
        handleAnswer('die');
      } else if (e.key === '3' || e.key.toLowerCase() === 'a') {
        handleAnswer('das');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentIndex, deck]);

  return (
    <div className="max-w-3xl mx-auto px-2.5 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-400" />
            Artikel-Blitz
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Trainiere deine Reflexe für <strong>DER</strong>, <strong>DIE</strong> & <strong>DAS</strong> mit Eselsbrücken
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold">Rekord</div>
            <div className="text-sm sm:text-base font-black text-amber-400">{progress.highScoreArticleBlitz} Pkt</div>
          </div>
        </div>
      </div>

      {/* GAME: IDLE STATE */}
      {gameState === 'idle' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center space-y-4 sm:space-y-6 shadow-2xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
            <Zap className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white">60 Sekunden Speed-Challenge</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Erkenne das Geschlecht der deutschen Substantive blitzschnell.
            </p>
          </div>

          {/* Quick rules mnemonic teaser */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto text-xs">
            <div className="p-2.5 sm:p-3 rounded-xl bg-blue-950/40 border border-blue-900/40 text-blue-300">
              <span className="font-bold block text-sm">DER (1)</span>
              -or, -ismus, -ling, Monate, Tage
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-rose-950/40 border border-rose-900/40 text-rose-300">
              <span className="font-bold block text-sm">DIE (2)</span>
              -ung, -heit, -keit, -schaft, -tion
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/40 text-emerald-300">
              <span className="font-bold block text-sm">DAS (3)</span>
              -chen, -lein, -ment, -um, Verben
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-950/30 transition-all hover:scale-105 active:scale-95 touch-manipulation"
          >
            Blitz starten (60s)
          </button>
        </div>
      )}

      {/* GAME: PLAYING STATE */}
      {gameState === 'playing' && currentWord && (
        <div className="space-y-4 sm:space-y-6">
          {/* Top In-game stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center">
              <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold">Zeit</span>
              <div className={`text-lg sm:text-xl font-black ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>
                {timeLeft}s
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center">
              <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold">Punkte</span>
              <div className="text-lg sm:text-xl font-black text-amber-400">{score}</div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 text-center">
              <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold">Serie</span>
              <div className="text-lg sm:text-xl font-black text-emerald-400">{combo}x 🔥</div>
            </div>
          </div>

          {/* Current Word Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-center space-y-2 sm:space-y-3 shadow-2xl relative overflow-hidden">
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Welcher Artikel gehört dazu?</span>
            
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {currentWord.word}
              </h2>
              <button
                onClick={() => soundEngine.speak(currentWord.word)}
                className="p-1.5 sm:p-2 rounded-full bg-slate-800 text-amber-400 hover:text-white"
                title="Wort anhören"
              >
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-medium">{currentWord.translation}</p>
          </div>

          {/* Big Buttons for DER, DIE, DAS (Optimized for Mobile Touch) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {/* DER */}
            <button
              onClick={() => handleAnswer('der')}
              className="group py-4 sm:py-6 px-1.5 sm:px-4 rounded-2xl sm:rounded-3xl bg-blue-600/20 hover:bg-blue-600/40 border-2 border-blue-500/40 hover:border-blue-400 text-blue-300 font-black text-xl sm:text-3xl transition-all duration-150 active:scale-95 shadow-lg shadow-blue-950/40 flex flex-col items-center justify-center gap-0.5 sm:gap-1 touch-manipulation"
            >
              <span>DER</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-blue-400/80 group-hover:text-blue-300 uppercase tracking-widest hidden xs:inline sm:inline">[1]</span>
            </button>

            {/* DIE */}
            <button
              onClick={() => handleAnswer('die')}
              className="group py-4 sm:py-6 px-1.5 sm:px-4 rounded-2xl sm:rounded-3xl bg-rose-600/20 hover:bg-rose-600/40 border-2 border-rose-500/40 hover:border-rose-400 text-rose-300 font-black text-xl sm:text-3xl transition-all duration-150 active:scale-95 shadow-lg shadow-rose-950/40 flex flex-col items-center justify-center gap-0.5 sm:gap-1 touch-manipulation"
            >
              <span>DIE</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-rose-400/80 group-hover:text-rose-300 uppercase tracking-widest hidden xs:inline sm:inline">[2]</span>
            </button>

            {/* DAS */}
            <button
              onClick={() => handleAnswer('das')}
              className="group py-4 sm:py-6 px-1.5 sm:px-4 rounded-2xl sm:rounded-3xl bg-emerald-600/20 hover:bg-emerald-600/40 border-2 border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-black text-xl sm:text-3xl transition-all duration-150 active:scale-95 shadow-lg shadow-emerald-950/40 flex flex-col items-center justify-center gap-0.5 sm:gap-1 touch-manipulation"
            >
              <span>DAS</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-400/80 group-hover:text-emerald-300 uppercase tracking-widest hidden xs:inline sm:inline">[3]</span>
            </button>
          </div>

          {/* Instant Rule Toast / Feedback */}
          {feedback && (
            <div className={`p-4 rounded-2xl border transition-all animate-in fade-in zoom-in-95 duration-200 flex items-start gap-3 ${
              feedback.correct 
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' 
                : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            }`}>
              {feedback.correct ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <div className="text-xs font-bold">
                  {feedback.correct ? 'Richtig!' : `Falsch! Richtig ist: ${feedback.correctArticle.toUpperCase()} ${feedback.word}`}
                </div>
                {feedback.mnemonic && (
                  <p className="text-xs opacity-90">{feedback.mnemonic}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME: GAMEOVER STATE */}
      {gameState === 'gameover' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-xl shadow-rose-900/20">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black text-white">Runde beendet!</h2>
            <p className="text-sm text-slate-300">
              Du hast <strong className="text-amber-400 text-base">{score} Punkte</strong> erzielt und{' '}
              <strong className="text-emerald-400 text-base">+{Math.max(10, Math.floor(score * 5))} XP</strong> verdient.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-rose-950/30 hover:scale-105 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Nochmal spielen</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
