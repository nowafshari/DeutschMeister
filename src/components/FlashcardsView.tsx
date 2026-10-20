import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { VOCABULARY_CARDS, DECK_METADATA } from '../data/vocabulary';
import type { Card } from '../types';
import { 
  BookOpen, Volume2, RotateCw, Lightbulb, Globe
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const FlashcardsView: React.FC = () => {
  const { recordCardReview } = useProgress();

  const [selectedDeckId, setSelectedDeckId] = useState<string>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Filter cards by selected deck
  const activeDeckCards: Card[] = selectedDeckId === 'all'
    ? VOCABULARY_CARDS
    : VOCABULARY_CARDS.filter(c => c.category === selectedDeckId);

  const currentCard: Card | undefined = activeDeckCards[currentCardIndex];

  const handleFlip = () => {
    soundEngine.playClickSound();
    setIsFlipped(!isFlipped);
  };

  const handleRate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    soundEngine.playClickSound();
    recordCardReview(currentCard.id, rating);

    // Next card
    setIsFlipped(false);
    if (currentCardIndex + 1 < activeDeckCards.length) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setCurrentCardIndex(0); // Loop back
    }
  };

  const handleDeckChange = (id: string) => {
    soundEngine.playClickSound();
    setSelectedDeckId(id);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          Spaced Repetition Karteikarten
        </h1>
        <p className="text-xs text-slate-400">
          Wortschatz mit dem wissenschaftlichen SM-2 Spaced-Repetition-Algorithmus dauerhaft einprägen
        </p>
      </div>

      {/* Deck Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {DECK_METADATA.map(d => {
          const isActive = d.id === selectedDeckId;
          return (
            <button
              key={d.id}
              onClick={() => handleDeckChange(d.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-950/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{d.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'
              }`}>
                {d.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Card Carousel Area */}
      {currentCard ? (
        <div className="space-y-6">
          {/* Card Meta Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">
              Karte <strong className="text-white">{currentCardIndex + 1}</strong> von {activeDeckCards.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {currentCard.level}
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-800/40">
                {currentCard.category}
              </span>
            </div>
          </div>

          {/* Flashcard (Click to flip) */}
          <div
            onClick={handleFlip}
            className={`min-h-[280px] sm:min-h-[320px] rounded-3xl p-8 cursor-pointer transition-all duration-300 relative select-none shadow-2xl flex flex-col justify-between border ${
              isFlipped
                ? 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border-cyan-500/40 shadow-cyan-950/20'
                : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <RotateCw className="w-3 h-3 text-cyan-400" />
                <span>{isFlipped ? 'Rückseite (Erklärung)' : 'Vorderseite (Klicken zum Umdrehen)'}</span>
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.speak(`${currentCard.article || ''} ${currentCard.de}`);
                }}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white transition-colors"
                title="Wort anhören"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Front Center Word */}
            {!isFlipped ? (
              <div className="text-center my-auto space-y-2">
                <div className="flex items-baseline justify-center gap-3">
                  {currentCard.article && (
                    <span className={`text-xl sm:text-2xl font-black uppercase ${
                      currentCard.article === 'der' ? 'text-blue-400' :
                      currentCard.article === 'die' ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {currentCard.article}
                    </span>
                  )}
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {currentCard.de}
                  </h2>
                </div>

                {currentCard.plural && (
                  <p className="text-xs text-slate-400 font-mono">Plural: {currentCard.plural}</p>
                )}
                <p className="text-xs text-slate-500 pt-2 italic">Tippe auf die Karte, um die Übersetzung zu sehen</p>
              </div>
            ) : (
              /* Back: English Translation + Example */
              <div className="my-auto space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-extrabold text-white">{currentCard.en}</h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-cyan-300 font-semibold">
                    <span>{currentCard.article ? `${currentCard.article} ` : ''}{currentCard.de}</span>
                  </div>
                </div>

                {/* Example sentence */}
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Beispiel im Alltag:</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEngine.speak(currentCard.exampleDe);
                      }}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Anhören
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-slate-100">{currentCard.exampleDe}</p>
                  <p className="text-xs text-slate-400 italic">{currentCard.exampleEn}</p>
                </div>
              </div>
            )}

            {/* Bottom tags */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-1.5">
                {currentCard.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-cyan-400 font-medium">
                {isFlipped ? 'Bewerte dein Wissen unten 👇' : 'Umdrehen ↻'}
              </span>
            </div>
          </div>

          {/* Standalone Explainer Box */}
          {isFlipped && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Grammatik & Erklärung:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{currentCard.explanation}</p>
              </div>

              {currentCard.culturalNote && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Praxis-Tipp für Deutschland:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentCard.culturalNote}</p>
                </div>
              )}
            </div>
          )}

          {/* SRS Rating Action Buttons */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-2">
            <button
              onClick={() => handleRate('again')}
              className="py-3 px-2 rounded-2xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/60 text-rose-300 font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all hover:scale-105 active:scale-95"
            >
              <span>Nochmal</span>
              <span className="text-[10px] opacity-75 font-normal">&lt; 1 Tag (+2 XP)</span>
            </button>

            <button
              onClick={() => handleRate('hard')}
              className="py-3 px-2 rounded-2xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 text-amber-300 font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all hover:scale-105 active:scale-95"
            >
              <span>Schwer</span>
              <span className="text-[10px] opacity-75 font-normal">2 Tage (+5 XP)</span>
            </button>

            <button
              onClick={() => handleRate('good')}
              className="py-3 px-2 rounded-2xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/60 text-blue-300 font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all hover:scale-105 active:scale-95"
            >
              <span>Gut</span>
              <span className="text-[10px] opacity-75 font-normal">4 Tage (+10 XP)</span>
            </button>

            <button
              onClick={() => handleRate('easy')}
              className="py-3 px-2 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 text-emerald-300 font-bold text-xs flex flex-col items-center justify-center gap-0.5 transition-all hover:scale-105 active:scale-95"
            >
              <span>Einfach</span>
              <span className="text-[10px] opacity-75 font-normal">7 Tage (+15 XP)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-400">Keine Karten in dieser Kategorie vorhanden.</div>
      )}
    </div>
  );
};
