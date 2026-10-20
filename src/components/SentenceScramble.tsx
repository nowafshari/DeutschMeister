import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import { SENTENCE_SCRAMBLE_ITEMS } from '../data/sentenceScramble';
import type { SentenceScrambleItem } from '../types';
import { Layers, Volume2, CheckCircle2, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const SentenceScramble: React.FC = () => {
  const { addXp, recordGamePlayed } = useProgress();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const currentItem: SentenceScrambleItem = SENTENCE_SCRAMBLE_ITEMS[currentIndex];

  // Initialize pool
  useEffect(() => {
    if (!currentItem) return;
    const shuffled = [...currentItem.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setIsEvaluated(false);
    setIsCorrect(false);
  }, [currentIndex, currentItem]);

  const handleSelectWord = (word: string, indexInAvailable: number) => {
    if (isEvaluated) return;
    soundEngine.playClickSound();
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, idx) => idx !== indexInAvailable));
  };

  const handleDeselectWord = (word: string, indexInSelected: number) => {
    if (isEvaluated) return;
    soundEngine.playClickSound();
    setAvailableWords(prev => [...prev, word]);
    setSelectedWords(prev => prev.filter((_, idx) => idx !== indexInSelected));
  };

  const handleCheck = () => {
    if (selectedWords.length === 0) return;

    const assembled = selectedWords.join(' ');
    const correct = assembled.trim() === currentItem.targetDe.trim();

    setIsEvaluated(true);
    setIsCorrect(correct);

    if (correct) {
      soundEngine.playLevelUpSound();
      addXp(25);
      recordGamePlayed('scramble');
    } else {
      soundEngine.playErrorSound();
    }
  };

  const handleNext = () => {
    soundEngine.playClickSound();
    setCurrentIndex((currentIndex + 1) % SENTENCE_SCRAMBLE_ITEMS.length);
  };

  const handleResetCurrent = () => {
    soundEngine.playClickSound();
    setAvailableWords([...currentItem.words].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setIsEvaluated(false);
    setIsCorrect(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-400" />
            Satz-Meister
          </h1>
          <p className="text-xs text-slate-400">
            Bringe die Satzglieder in die korrekte deutsche Reihenfolge (Satzbau)
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          Satz {currentIndex + 1} von {SENTENCE_SCRAMBLE_ITEMS.length}
        </div>
      </div>

      {/* Target Translation Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
          Gesuchte Übersetzung:
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          "{currentItem.translationEn}"
        </h2>
      </div>

      {/* Drop Zone / Assembled Sentence Area */}
      <div className="min-h-[110px] p-5 rounded-3xl bg-slate-950/80 border-2 border-dashed border-slate-800 flex flex-wrap items-center gap-2.5 transition-all">
        {selectedWords.length === 0 ? (
          <span className="text-xs sm:text-sm text-slate-500 italic select-none">
            Tippe unten auf die Wörter, um deinen Satz zu bauen...
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleDeselectWord(word, idx)}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-950/40 transition-all hover:scale-105 active:scale-95 animate-in fade-in zoom-in-95 duration-150"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available Word Tiles Pool */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
        <span className="text-xs text-slate-400 font-medium">Verfügbare Wort-Karten:</span>
        <div className="flex flex-wrap gap-2.5">
          {availableWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectWord(word, idx)}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-100 font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleResetCurrent}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Zurücksetzen</span>
        </button>

        {!isEvaluated ? (
          <button
            onClick={handleCheck}
            disabled={selectedWords.length === 0}
            className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-lg ${
              selectedWords.length > 0
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white shadow-indigo-950/40 hover:scale-105 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Satz prüfen
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-teal-950/40 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Nächster Satz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Result & Grammar Breakdown */}
      {isEvaluated && (
        <div className={`p-6 rounded-3xl border transition-all animate-in fade-in space-y-4 ${
          isCorrect ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'
        }`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ✕
                </div>
              )}
              <h3 className={`text-base font-bold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                {isCorrect ? 'Ausgezeichnet! Korrekte Wortstellung.' : 'Nicht ganz richtig. Sieh dir die Lösung an:'}
              </h3>
            </div>

            <button
              onClick={() => soundEngine.speak(currentItem.targetDe)}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Volume2 className="w-4 h-4" />
              <span>Anhören</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm font-bold text-white">
            {currentItem.targetDe}
          </div>

          <div className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Grammatik-Erklärung: </span>
              {currentItem.grammarTip}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
