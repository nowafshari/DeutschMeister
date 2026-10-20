import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import { LISTENING_SCENARIOS, type ListeningScenario } from '../data/listeningData';
import { 
  Headphones, Play, RotateCcw, CheckCircle2, XCircle, 
  FileText, Lightbulb, ChevronRight, Volume2, 
  HelpCircle, Award, VolumeX
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const ListeningQuiz: React.FC = () => {
  const { addXp, progress } = useProgress();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSlowSpeed, setIsSlowSpeed] = useState<boolean>(false);
  const [hasPlayedAtLeastOnce, setHasPlayedAtLeastOnce] = useState<boolean>(false);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  // Session score
  const [sessionScore, setSessionScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Filtered scenario list
  const filteredScenarios: ListeningScenario[] = LISTENING_SCENARIOS.filter(s => {
    const matchCategory = filterCategory === 'all' || s.category === filterCategory;
    const matchLevel = filterLevel === 'all' || s.level === filterLevel;
    return matchCategory && matchLevel;
  });

  const currentScenario: ListeningScenario | undefined = filteredScenarios[currentIndex];

  // Stop speech if scenario changes or unmounts
  useEffect(() => {
    return () => {
      soundEngine.stop();
    };
  }, [currentIndex]);

  const handlePlayAudio = (slow = false) => {
    if (!currentScenario) return;

    soundEngine.stop();
    setIsPlaying(true);
    setHasPlayedAtLeastOnce(true);

    const rate = slow ? 0.72 : (progress.speechRate || 0.95);
    soundEngine.speak(currentScenario.audioText, rate);

    // Estimate duration for audio bar animation (rough estimation: 1 word ~ 0.4s)
    const wordCount = currentScenario.audioText.split(' ').length;
    const estimatedDurationMs = Math.max(3500, (wordCount * 450) / rate);

    setTimeout(() => {
      setIsPlaying(false);
    }, estimatedDurationMs);
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted || !currentScenario) return;

    setSelectedOptionId(optionId);
    setIsAnswerSubmitted(true);

    const chosen = currentScenario.options.find(o => o.id === optionId);
    const isCorrect = chosen?.isCorrect ?? false;

    if (isCorrect) {
      soundEngine.playSuccessSound();
      addXp(25);
      setSessionScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      soundEngine.playErrorSound();
      setSessionScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNext = () => {
    soundEngine.playClickSound();
    soundEngine.stop();
    setIsPlaying(false);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setShowTranscript(false);
    setHasPlayedAtLeastOnce(false);

    if (currentIndex + 1 < filteredScenarios.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      soundEngine.playLevelUpSound();
    }
  };

  const handleRestart = () => {
    soundEngine.playClickSound();
    soundEngine.stop();
    setIsPlaying(false);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setShowTranscript(false);
    setHasPlayedAtLeastOnce(false);
    setSessionScore({ correct: 0, total: 0 });
    setIsCompleted(false);
  };

  const categories = [
    { id: 'all', label: 'Alle Themen' },
    { id: 'transit', label: '🚆 Bahn & Durchsagen' },
    { id: 'doctor', label: '🩺 Arzt & Gesundheit' },
    { id: 'bureaucracy', label: '🏢 Behörden & Wohnen' },
    { id: 'everyday', label: '🛒 Alltag & Einkaufen' },
    { id: 'news', label: '📻 Radio & Wetter' },
  ];

  if (!currentScenario || isCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Award className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">Hör-Quiz Runde beendet!</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Hervorragend geübt! Sie haben die DTZ-Hörverständnisübungen erfolgreich durchlaufen.
          </p>

          <div className="inline-flex items-center gap-6 bg-slate-950 px-6 py-3.5 rounded-2xl border border-slate-800">
            <div>
              <div className="text-xs text-slate-400">Richtige Antworten</div>
              <div className="text-2xl font-black text-emerald-400">
                {sessionScore.correct} / {sessionScore.total || filteredScenarios.length}
              </div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <div className="text-xs text-slate-400">Verdiente XP</div>
              <div className="text-2xl font-black text-amber-400">
                +{sessionScore.correct * 25} XP
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/40 inline-flex items-center gap-2 transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Erneut üben
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                DTZ Hör-Quiz
                <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider font-semibold">
                  Hörverstehen
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Authentische Ansagen, Anrufbeantworter & Durchsagen für den Deutsch-Test für Zuwanderer
              </p>
            </div>
          </div>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300">
          <span>Frage {currentIndex + 1} von {filteredScenarios.length}</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400">{sessionScore.correct} Richtig</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              soundEngine.playClickSound();
              soundEngine.stop();
              setFilterCategory(cat.id);
              setCurrentIndex(0);
              setSelectedOptionId(null);
              setIsAnswerSubmitted(false);
              setShowTranscript(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === cat.id
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-900/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}

        <div className="w-px h-5 bg-slate-800 mx-1 shrink-0" />

        {['all', 'A2', 'B1'].map(lvl => (
          <button
            key={lvl}
            onClick={() => {
              soundEngine.playClickSound();
              setFilterLevel(lvl);
              setCurrentIndex(0);
              setSelectedOptionId(null);
              setIsAnswerSubmitted(false);
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterLevel === lvl
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lvl === 'all' ? 'Alle Niveaus' : lvl}
          </button>
        ))}
      </div>

      {/* Main Listening Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
        {/* Scenario Header Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-md">
                {currentScenario.categoryLabel}
              </span>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded-md">
                {currentScenario.level}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {currentScenario.title}
            </h2>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Sprecher:</span>
              <span className="text-slate-200 font-medium">{currentScenario.speaker}</span>
            </p>
          </div>
        </div>

        {/* Audio Player Box */}
        <div className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Play Button */}
            <button
              onClick={() => handlePlayAudio(false)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-lg ${
                isPlaying && !isSlowSpeed
                  ? 'bg-rose-500 text-white animate-pulse shadow-rose-900/50'
                  : 'bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-950/40'
              }`}
              title="Audio abspielen (Normalgeschwindigkeit)"
            >
              <Play className="w-7 h-7 fill-white translate-x-0.5" />
            </button>

            {/* Slow Audio Button (Schildkröte 0.75x) */}
            <button
              onClick={() => {
                setIsSlowSpeed(true);
                handlePlayAudio(true);
              }}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Langsam anhören (0.75x)"
            >
              <span>🐢</span>
              <span>Langsam (0.75x)</span>
            </button>

            {isPlaying && (
              <button
                onClick={() => {
                  soundEngine.stop();
                  setIsPlaying(false);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-rose-400"
                title="Stoppen"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sound waves visualization */}
          <div className="flex items-center gap-1.5 h-6">
            {[14, 24, 18, 28, 12, 22, 16, 26, 14, 20].map((height, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isPlaying 
                    ? 'bg-cyan-400 animate-pulse' 
                    : 'bg-slate-800'
                }`}
                style={{ 
                  height: isPlaying ? `${height}px` : '6px',
                  animationDelay: `${i * 80}ms`
                }}
              />
            ))}
          </div>
        </div>

        {!hasPlayedAtLeastOnce && (
          <div className="flex items-center gap-2 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl">
            <Volume2 className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Klicken Sie zuerst auf den blauen <strong>Play-Button</strong>, um die Aufnahme anzuhören.</span>
          </div>
        )}

        {/* Question Area */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentScenario.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2.5 pt-2">
            {currentScenario.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = selectedOptionId === option.id;

              let style = 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/80 text-slate-200';
              if (isAnswerSubmitted) {
                if (option.isCorrect) {
                  style = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/30';
                } else if (isSelected && !option.isCorrect) {
                  style = 'bg-rose-950/40 border-rose-500 text-rose-200';
                } else {
                  style = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3 touch-manipulation ${style}`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isAnswerSubmitted && option.isCorrect
                      ? 'bg-emerald-500 text-white'
                      : isSelected
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {letter}
                  </span>

                  <div className="flex-1 text-sm font-medium">
                    {option.text}
                    {isAnswerSubmitted && option.explanation && (
                      <p className={`text-xs mt-1.5 font-normal ${option.isCorrect ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {option.explanation}
                      </p>
                    )}
                  </div>

                  {isAnswerSubmitted && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswerSubmitted && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Post Answer Section */}
        {isAnswerSubmitted && (
          <div className="pt-4 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                {showTranscript ? 'Transkript verbergen' : 'Transkript & Übersetzung anzeigen'}
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 transition-transform active:scale-95"
              >
                <span>Nächste Aufgabe</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Transcript Card */}
            {showTranscript && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Gesprochener Originaltext (Deutsch):
                  </span>
                  <p className="text-sm text-slate-200 font-serif leading-relaxed mt-1">
                    "{currentScenario.transcriptDe}"
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Englische Übersetzung:
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    "{currentScenario.transcriptEn}"
                  </p>
                </div>

                {/* Key vocabulary pills */}
                <div className="border-t border-slate-800/80 pt-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                    Wichtige Signalwörter:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentScenario.keyWords.map((kw, i) => (
                      <button
                        key={i}
                        onClick={() => soundEngine.speak(kw)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                        title="Anhören"
                      >
                        <Volume2 className="w-3 h-3 text-amber-400" />
                        <span>{kw}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Exam Tip */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200/90 leading-relaxed">
                <strong className="text-amber-300 block mb-0.5 font-bold">DTZ-Prüfungstipp:</strong>
                {currentScenario.examTip}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
