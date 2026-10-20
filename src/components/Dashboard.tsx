import React from 'react';
import { useProgress, ACHIEVEMENTS_LIST, LEVEL_TITLES } from '../context/ProgressContext';
import { VOCABULARY_CARDS } from '../data/vocabulary';
import { 
  Flame, Sparkles, Zap, MessageSquare, Layers, 
  GraduationCap, Volume2, Award, ChevronRight, CheckCircle2,
  BookOpen, HelpCircle
} from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { getCleanNoun, getSpokenPhrase } from '../utils/wordFormatting';

interface DashboardProps {
  setCurrentTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setCurrentTab }) => {
  const { progress, getXpForNextLevel, resetProgress } = useProgress();
  const xpInfo = getXpForNextLevel();
  const currentTitle = LEVEL_TITLES[progress.level - 1] || 'Deutsch-Meister';

  // Deterministic Word of the Day based on day of year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const wordOfTheDay = VOCABULARY_CARDS[dayOfYear % VOCABULARY_CARDS.length];

  const quickLaunchModes = [
    {
      id: 'blitz',
      title: 'Artikel-Blitz',
      subtitle: 'Der, Die oder Das in 60 Sekunden',
      badge: 'Highscore: ' + progress.highScoreArticleBlitz,
      color: 'from-amber-500 to-orange-600',
      icon: Zap
    },
    {
      id: 'wordle',
      title: 'Wort-Rätsel',
      subtitle: '5-Buchstaben-Wort erraten (mit Hinweisen)',
      badge: 'Gelöst: ' + progress.solvedWordlesCount,
      color: 'from-emerald-500 to-teal-600',
      icon: HelpCircle
    },
    {
      id: 'scramble',
      title: 'Satz-Meister',
      subtitle: 'Satzbau & Verbpositionen trainieren',
      badge: 'Wortstellung',
      color: 'from-blue-500 to-indigo-600',
      icon: Layers
    },
    {
      id: 'dialogue',
      title: 'Überlebens-Dialoge',
      subtitle: 'Döner bestellen, 0%-Ratenzahlung & Bürgeramt',
      badge: 'Interaktiv',
      color: 'from-rose-500 to-pink-600',
      icon: MessageSquare
    },
    {
      id: 'dtz',
      title: 'DTZ-Prüfungslabor',
      subtitle: 'Sprechen (Teil 1-3) & Briefe schreiben',
      badge: 'A2-B1 Zertifikat',
      color: 'from-purple-500 to-violet-600',
      icon: GraduationCap
    },
    {
      id: 'flashcards',
      title: 'Spaced Repetition',
      subtitle: 'Wortschatz langfristig verankern',
      badge: `${progress.cardsReviewedCount} wiederholt`,
      color: 'from-cyan-500 to-blue-600',
      icon: BookOpen
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-5 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Willkommen zurück!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dein tägliches Deutsch-Training
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              100% offline & ohne API-Kosten. Trainiere realistische Alltagssituationen in Deutschland und bereite dich gezielt auf den DTZ A2–B1 Test vor.
            </p>
          </div>

          {/* Level Card */}
          <div className="bg-slate-950/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-800 min-w-[280px] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Aktuelle Stufe</span>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                Stufe {progress.level}
              </span>
            </div>
            <div className="mt-2 text-lg font-bold text-white">
              {currentTitle}
            </div>
            {/* XP Progress Bar */}
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Fortschritt</span>
                <span>{xpInfo.current} / {xpInfo.max} XP</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-700"
                  style={{ width: `${xpInfo.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <Flame className="w-5 h-5 fill-orange-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">{progress.streak}</div>
            <div className="text-xs text-slate-400">Tage Streak</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">{progress.xp}</div>
            <div className="text-xs text-slate-400">Gesamt-XP</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">{progress.cardsReviewedCount}</div>
            <div className="text-xs text-slate-400">Karten gelernt</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {Object.keys(progress.achievements).length} / {ACHIEVEMENTS_LIST.length}
            </div>
            <div className="text-xs text-slate-400">Abzeichen</div>
          </div>
        </div>
      </div>

      {/* Main Two Column Section: Word of the Day & Practical Germany Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Word of the day */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Wort des Tages
            </span>
            <span className="text-xs text-slate-400 font-mono">Niveau: {wordOfTheDay.level}</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              {wordOfTheDay.article && (
                <span className={`text-sm font-bold uppercase ${
                  wordOfTheDay.article === 'der' ? 'text-blue-400' :
                  wordOfTheDay.article === 'die' ? 'text-rose-400' :
                  wordOfTheDay.article === 'das' ? 'text-emerald-400' : 'text-slate-400'
                }`}>
                  {wordOfTheDay.article}
                </span>
              )}
              <h3 className="text-2xl font-black text-white tracking-tight">{getCleanNoun(wordOfTheDay)}</h3>
              <button
                onClick={() => soundEngine.speak(getSpokenPhrase(wordOfTheDay))}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white transition-colors"
                title="Aussprache anhören"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-300 font-medium text-sm">{wordOfTheDay.en}</p>
          </div>

          {/* Example Box */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Beispielsatz:</span>
              <button
                onClick={() => soundEngine.speak(wordOfTheDay.exampleDe)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Anhören
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-100">{wordOfTheDay.exampleDe}</p>
            <p className="text-xs text-slate-400 italic">{wordOfTheDay.exampleEn}</p>
          </div>

          {/* Cultural & Grammar Note */}
          {wordOfTheDay.culturalNote && (
            <div className="text-xs text-amber-300/90 bg-amber-950/20 border border-amber-900/40 rounded-xl p-3">
              <span className="font-bold">Praxis-Tipp für Deutschland: </span>
              {wordOfTheDay.culturalNote}
            </div>
          )}
        </div>

        {/* Life / DTZ Hack */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                DTZ & Alltags-Wissen
              </span>
              <span className="text-xs text-slate-400">Praxis pur</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Die Meldebescheinigung & der DTZ-Test
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Für die Erteilung der <strong>Niederlassungserlaubnis</strong> mit Blauer Karte EU benötigen Sie den Nachweis von Deutschkenntnissen auf dem Niveau <strong>B1</strong> (oder A2) sowie eine aktuelle <strong>Meldebescheinigung</strong> und Rentenversicherungsbeiträge.
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-200">Wichtige DTZ-Redemittel für heute:</div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li><span className="text-amber-300 font-mono">Meiner Meinung nach</span> + Verb (Position 2)</li>
                <li><span className="text-amber-300 font-mono">Ich schlage vor, dass...</span> + Verb am Ende</li>
                <li><span className="text-amber-300 font-mono">Damit bin ich einverstanden!</span> (Zustimmung)</li>
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                soundEngine.playClickSound();
                setCurrentTab('dtz');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20 transition-all"
            >
              <span>Jetzt DTZ-Sprechen & Briefe trainieren</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Launch Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">Trainings-Module</h2>
          <span className="text-xs text-slate-400">Wähle dein Lieblingsspiel</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickLaunchModes.map(mode => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                onClick={() => {
                  soundEngine.playClickSound();
                  setCurrentTab(mode.id);
                }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${mode.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                    {mode.badge}
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>{mode.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-400 leading-normal">{mode.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements Shelf */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Errungenschaften & Abzeichen</h2>
          </div>
          <span className="text-xs text-slate-400">
            {Object.keys(progress.achievements).length} von {ACHIEVEMENTS_LIST.length} freigeschaltet
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACHIEVEMENTS_LIST.map(ach => {
            const isUnlocked = !!progress.achievements[ach.id];
            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold tracking-tight">{ach.title}</span>
                  {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{ach.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer reset button */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={resetProgress}
          className="text-xs text-slate-600 hover:text-rose-400 underline transition-colors"
        >
          Fortschritt und Daten zurücksetzen
        </button>
      </div>
    </div>
  );
};
