import React, { useState, useEffect, useCallback } from 'react';
import { useProgress } from '../context/ProgressContext';
import { WORDLE_WORDS } from '../data/wordleWords';
import type { WordleWord } from '../types';
import { HelpCircle, Volume2, RotateCcw, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export const GermanWordle: React.FC = () => {
  const { addXp, recordGamePlayed } = useProgress();

  const [targetItem, setTargetItem] = useState<WordleWord>(() => {
    return WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
  });

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const targetWord = targetItem.word.toUpperCase();

  const startNewGame = () => {
    let next = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
    if (next.word === targetItem.word && WORDLE_WORDS.length > 1) {
      next = WORDLE_WORDS[(WORDLE_WORDS.indexOf(next) + 1) % WORDLE_WORDS.length];
    }
    setTargetItem(next);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setShowHint(false);
    setMessage('');
    soundEngine.playClickSound();
  };

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        setMessage('Das Wort muss genau 5 Buchstaben haben!');
        setTimeout(() => setMessage(''), 2000);
        soundEngine.playErrorSound();
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess === targetWord) {
        setGameStatus('won');
        soundEngine.playLevelUpSound();
        addXp(40);
        recordGamePlayed('wordle');
      } else if (newGuesses.length >= MAX_GUESSES) {
        setGameStatus('lost');
        soundEngine.playErrorSound();
      } else {
        soundEngine.playSuccessSound();
      }
    } else if (key === 'BACKSPACE' || key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
      soundEngine.playClickSound();
    } else if (/^[A-ZÄÖÜß]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
      soundEngine.playClickSound();
    }
  }, [currentGuess, guesses, gameStatus, targetWord, addXp, recordGamePlayed]);

  // Keyboard listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else {
        const char = e.key.toUpperCase();
        if (/^[A-ZÄÖÜß]$/.test(char)) {
          handleKeyPress(char);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyPress]);

  // Determine letter status for keyboard & tiles
  const getLetterStatus = (letter: string, index: number) => {
    if (targetWord[index] === letter) {
      return 'bg-emerald-600 border-emerald-500 text-white';
    }
    if (targetWord.includes(letter)) {
      return 'bg-amber-600 border-amber-500 text-white';
    }
    return 'bg-slate-800 border-slate-700 text-slate-400';
  };

  const getKeyStatus = (char: string) => {
    let status = '';
    for (const g of guesses) {
      for (let i = 0; i < g.length; i++) {
        if (g[i] === char) {
          if (targetWord[i] === char) return 'bg-emerald-600 text-white';
          if (targetWord.includes(char)) status = 'bg-amber-600 text-white';
          else if (!status) status = 'bg-slate-800 text-slate-500';
        }
      }
    }
    return status || 'bg-slate-800/80 hover:bg-slate-700 text-slate-200';
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
    ['ENTER', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'ß', 'DEL']
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-400" />
            Wort-Rätsel
          </h1>
          <p className="text-xs text-slate-400">
            Errate das deutsche 5-Buchstaben-Wort in maximal 6 Versuchen
          </p>
        </div>

        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 flex items-center gap-1.5 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{showHint ? 'Hinweis verbergen' : 'Hinweis anzeigen'}</span>
        </button>
      </div>

      {/* Optional Hint Box */}
      {showHint && (
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 space-y-1 animate-in fade-in">
          <span className="font-bold">Hinweis zur Bedeutung: </span>
          <span>{targetItem.hint} ({targetItem.translation})</span>
        </div>
      )}

      {/* Error Message Toast */}
      {message && (
        <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-300 text-center font-bold animate-bounce">
          {message}
        </div>
      )}

      {/* Grid: 6 rows of 5 tiles */}
      <div className="grid grid-rows-6 gap-2 max-w-[320px] mx-auto">
        {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
          const isCurrentRow = rowIndex === guesses.length;
          const guess = guesses[rowIndex] || (isCurrentRow ? currentGuess : '');

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const letter = guess[colIndex] || '';
                const isGuessedRow = rowIndex < guesses.length;
                const statusClass = isGuessedRow
                  ? getLetterStatus(letter, colIndex)
                  : letter
                  ? 'border-slate-500 text-white bg-slate-900'
                  : 'border-slate-800 bg-slate-950/60 text-slate-500';

                return (
                  <div
                    key={colIndex}
                    className={`w-14 h-14 sm:w-14 sm:h-14 border-2 rounded-xl flex items-center justify-center font-black text-xl select-none transition-all duration-200 ${statusClass}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* End Result Box */}
      {gameStatus !== 'playing' && (
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="space-y-1">
            <h3 className={`text-xl font-black ${gameStatus === 'won' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {gameStatus === 'won' ? 'Glückwunsch! Richtig gelöst! 🎉' : 'Schade! Runde vorbei.'}
            </h3>
            <p className="text-xs text-slate-300">
              Das gesuchte Wort war: <strong className="text-white text-sm tracking-wide">{targetWord}</strong> ({targetItem.translation})
            </p>
          </div>

          {/* Example & Audio */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Beispiel:</span>
              <button
                onClick={() => soundEngine.speak(targetItem.exampleDe)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Anhören
              </button>
            </div>
            <p className="text-xs font-semibold text-slate-200">{targetItem.exampleDe}</p>
          </div>

          <button
            onClick={startNewGame}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 mx-auto shadow-lg shadow-teal-950/30 hover:scale-105 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nächstes Worträtsel</span>
          </button>
        </div>
      )}

      {/* Virtual On-Screen Keyboard */}
      <div className="space-y-1.5 select-none pt-2">
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
            {row.map(k => {
              const isWide = k === 'ENTER' || k === 'DEL';
              return (
                <button
                  key={k}
                  onClick={() => handleKeyPress(k)}
                  className={`h-11 sm:h-12 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center border border-slate-700/50 transition-all active:scale-95 ${
                    isWide ? 'px-2.5 sm:px-3 text-[11px] sm:text-xs' : 'w-8 sm:w-10'
                  } ${getKeyStatus(k)}`}
                >
                  {k === 'DEL' ? '⌫' : k}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
