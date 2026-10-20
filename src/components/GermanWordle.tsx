import { useState, useEffect, useCallback } from 'react';
import { useProgress } from '../context/ProgressContext';
import { WORDLE_WORDS } from '../data/wordleWords';
import type { WordleWord } from '../types';
import { 
  HelpCircle, Volume2, RotateCcw, Sparkles, 
  ChevronDown, ChevronUp, Lightbulb, CheckCircle2,
  BookOpen
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export const GermanWordle = () => {
  const { addXp, recordGamePlayed } = useProgress();

  const [targetItem, setTargetItem] = useState<WordleWord>(() => {
    return WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
  });

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true); // Default ON for language learners!
  const [revealedLetter, setRevealedLetter] = useState<boolean>(false);
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
    setRevealedLetter(false);
    setMessage('');
    soundEngine.playClickSound();
  };

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        setMessage(`Noch ${WORD_LENGTH - currentGuess.length} Buchstaben nötig! (Genau 5 Buchstaben)`);
        setTimeout(() => setMessage(''), 2500);
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
      // Don't capture when typing in inputs/textareas
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

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

  // Determine tile color status
  const getLetterStatus = (letter: string, index: number) => {
    if (targetWord[index] === letter) {
      return 'bg-emerald-600 border-emerald-500 text-white shadow-emerald-950/40';
    }
    if (targetWord.includes(letter)) {
      return 'bg-amber-600 border-amber-500 text-white shadow-amber-950/40';
    }
    return 'bg-slate-800 border-slate-700 text-slate-400';
  };

  const getKeyStatus = (char: string) => {
    let status = '';
    for (const g of guesses) {
      for (let i = 0; i < g.length; i++) {
        if (g[i] === char) {
          if (targetWord[i] === char) return 'bg-emerald-600 text-white border-emerald-500';
          if (targetWord.includes(char)) status = 'bg-amber-600 text-white border-amber-500';
          else if (!status) status = 'bg-slate-900 text-slate-600 border-slate-800 opacity-60';
        }
      }
    }
    return status || 'bg-slate-800/90 hover:bg-slate-700 text-slate-100 border-slate-700';
  };

  const handleRevealFirstLetter = () => {
    if (revealedLetter) return;
    setRevealedLetter(true);
    soundEngine.playClickSound();
    if (currentGuess.length === 0) {
      setCurrentGuess(targetWord[0]);
    }
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
    ['ENTER', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'ß', 'DEL']
  ];

  return (
    <div className="max-w-xl mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            Wort-Rätsel
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Finde das deutsche 5-Buchstaben-Wort in maximal 6 Versuchen
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Regeln</span>
            {showInstructions ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setShowHint(!showHint)}
            className={`text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
              showHint 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{showHint ? 'Tipp an' : 'Tipp aus'}</span>
          </button>
        </div>
      </div>

      {/* Collapsible How-To-Play Guide */}
      {showInstructions && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-3 animate-in fade-in">
          <div className="font-bold text-white text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>So funktioniert das Spiel:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-300">
            <li>Tippe ein deutsches Wort mit <strong>5 Buchstaben</strong> ein.</li>
            <li>Drücke auf <strong className="text-emerald-400">ENTER ⏎</strong> zum Prüfen.</li>
            <li>Die Kacheln ändern ihre Farbe und geben dir Feedback:</li>
          </ol>

          {/* Color Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-200">
              <div className="w-6 h-6 rounded bg-emerald-600 font-bold flex items-center justify-center text-white shrink-0">A</div>
              <span className="text-[11px]"><strong>Grün:</strong> Buchstabe ist an der <strong>richtigen</strong> Stelle.</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-200">
              <div className="w-6 h-6 rounded bg-amber-600 font-bold flex items-center justify-center text-white shrink-0">B</div>
              <span className="text-[11px]"><strong>Gelb:</strong> Im Wort, aber an <strong>anderer</strong> Stelle.</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400">
              <div className="w-6 h-6 rounded bg-slate-800 font-bold flex items-center justify-center text-slate-500 shrink-0">C</div>
              <span className="text-[11px]"><strong>Grau:</strong> Kommt im Wort <strong>gar nicht</strong> vor.</span>
            </div>
          </div>
        </div>
      )}

      {/* Prominent Clue / Riddle Box (Learner Friendly) */}
      {showHint && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/20 border border-amber-500/30 text-xs space-y-1.5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Rätsel-Hinweis (Bedeutung):</span>
            </span>
            {!revealedLetter && gameStatus === 'playing' && (
              <button
                onClick={handleRevealFirstLetter}
                className="text-[11px] text-amber-300 hover:text-white underline font-medium"
              >
                🃏 1. Buchstaben aufdecken
              </button>
            )}
          </div>
          <div className="text-sm font-bold text-white">
            "{targetItem.translation}"
          </div>
          <div className="text-slate-300 text-xs leading-relaxed">
            {targetItem.hint}
          </div>
          {revealedLetter && (
            <div className="text-[11px] font-bold text-emerald-400 pt-1">
              💡 Joker-Tipp: Das Wort beginnt mit dem Buchstaben <span className="underline text-sm font-black">"{targetWord[0]}"</span>.
            </div>
          )}
        </div>
      )}

      {/* Error / Alert Message Toast */}
      {message && (
        <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-700 text-xs text-rose-200 text-center font-bold animate-bounce shadow-lg">
          {message}
        </div>
      )}

      {/* Grid: 6 rows of 5 tiles (Responsive: fits 320px screens perfectly) */}
      <div className="space-y-1.5 sm:space-y-2 max-w-[280px] sm:max-w-[320px] mx-auto py-1">
        {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
          const isCurrentRow = rowIndex === guesses.length;
          const guess = guesses[rowIndex] || (isCurrentRow ? currentGuess : '');

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const letter = guess[colIndex] || '';
                const isGuessedRow = rowIndex < guesses.length;
                const statusClass = isGuessedRow
                  ? getLetterStatus(letter, colIndex)
                  : letter
                  ? 'border-emerald-500/60 text-white bg-slate-900 scale-105'
                  : 'border-slate-800 bg-slate-950/60 text-slate-500';

                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12 sm:w-14 sm:h-14 border-2 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl select-none transition-all duration-200 shadow-md ${statusClass}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Current Input Helper Indicator */}
      {gameStatus === 'playing' && (
        <div className="text-center text-xs text-slate-400">
          {currentGuess.length === WORD_LENGTH ? (
            <span className="text-emerald-400 font-bold animate-pulse">
              ✓ 5 Buchstaben bereit! Klicke unten auf <span className="underline">ENTER ⏎</span> zum Prüfen!
            </span>
          ) : (
            <span>
              Buchstabe <strong className="text-white">{currentGuess.length}</strong> von 5 eingegeben
            </span>
          )}
        </div>
      )}

      {/* End Result Modal / Card */}
      {gameStatus !== 'playing' && (
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
          <div className="space-y-1.5">
            <div className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-2 bg-slate-800">
              {gameStatus === 'won' ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              ) : (
                <HelpCircle className="w-7 h-7 text-rose-400" />
              )}
            </div>
            <h3 className={`text-xl font-black ${gameStatus === 'won' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {gameStatus === 'won' ? 'Richtig erraten! Großartig! 🎉' : 'Runde vorbei!'}
            </h3>
            <p className="text-xs text-slate-300">
              Das gesuchte Wort war: <strong className="text-white text-base font-black tracking-wider ml-1">{targetWord}</strong> ({targetItem.translation})
            </p>
          </div>

          {/* Example & Audio */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deutscher Beispielsatz:</span>
              <button
                onClick={() => soundEngine.speak(`${targetWord}. ${targetItem.exampleDe}`)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" /> Anhören
              </button>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-100">{targetItem.exampleDe}</p>
          </div>

          <button
            onClick={startNewGame}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 mx-auto shadow-lg shadow-teal-950/40 hover:scale-105 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nächstes Worträtsel spielen</span>
          </button>
        </div>
      )}

      {/* Virtual On-Screen Keyboard (Zero overflow on any mobile screen) */}
      <div className="space-y-1.5 select-none pt-1 w-full max-w-md mx-auto px-0.5 sm:px-0">
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5 w-full">
            {row.map(k => {
              const isEnter = k === 'ENTER';
              const isDel = k === 'DEL';
              const isReadyForEnter = isEnter && currentGuess.length === WORD_LENGTH;

              return (
                <button
                  key={k}
                  onClick={() => handleKeyPress(k)}
                  className={`h-11 sm:h-12 rounded-lg sm:rounded-xl font-bold transition-all active:scale-95 shadow-sm border flex items-center justify-center touch-manipulation ${
                    isEnter
                      ? `flex-[1.5] sm:flex-[1.6] min-w-[48px] max-w-[68px] text-[10px] sm:text-xs px-1 ${
                          isReadyForEnter
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black animate-pulse shadow-emerald-950/40'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`
                      : isDel
                      ? 'flex-[1.1] sm:flex-[1.2] min-w-[36px] max-w-[48px] text-xs sm:text-sm px-1 bg-slate-800 text-slate-300 border-slate-700'
                      : `flex-1 min-w-[24px] max-w-[38px] sm:max-w-[44px] text-xs sm:text-sm px-0 ${getKeyStatus(k)}`
                  }`}
                >
                  {isDel ? '⌫' : isEnter ? 'ENTER ⏎' : k}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
