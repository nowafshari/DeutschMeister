import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { DTZ_LETTER_PROMPTS } from '../data/dtzLetterTemplates';
import { DTZ_ORAL_DATA } from '../data/dtzOralPrep';
import type { DTZLetterPrompt } from '../types';
import { 
  GraduationCap, Mail, Mic, CheckCircle2, AlertTriangle, 
  Volume2, Lightbulb, Copy, Check, Sparkles, Send
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const DTZExamLab: React.FC = () => {
  const { addXp, recordGamePlayed } = useProgress();

  const [subTab, setSubTab] = useState<'writing' | 'speaking'>('writing');

  // Writing state
  const [activePromptId, setActivePromptId] = useState<string>(DTZ_LETTER_PROMPTS[0].id);
  const [userText, setUserText] = useState<string>('');
  const [evaluation, setEvaluation] = useState<{
    score: number;
    wordCount: number;
    feedback: string[];
    isApproved: boolean;
  } | null>(null);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const activePrompt: DTZLetterPrompt = DTZ_LETTER_PROMPTS.find(p => p.id === activePromptId) || DTZ_LETTER_PROMPTS[0];

  // Speaking state
  const [activeOralPart, setActiveOralPart] = useState<string>(DTZ_ORAL_DATA[0].id);
  const currentOralTopic = DTZ_ORAL_DATA.find(o => o.id === activeOralPart) || DTZ_ORAL_DATA[0];

  const handleSelectPrompt = (id: string) => {
    setActivePromptId(id);
    setUserText('');
    setEvaluation(null);
    setShowModel(false);
    soundEngine.playClickSound();
  };

  const handleEvaluateLetter = () => {
    if (!userText.trim()) return;

    soundEngine.playClickSound();
    const words = userText.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const feedback: string[] = [];
    let score = 0;

    // 1. Word count check (DTZ requires ~30-50 words minimum)
    if (wordCount >= 30) {
      score += 30;
      feedback.push(`Wortanzahl (${wordCount} Wörter): Ausreichende Ausführlichkeit erreicht.`);
    } else {
      feedback.push(`Wortanzahl (${wordCount} Wörter): Zu kurz. Schreibe mindestens 30 Wörter für das DTZ-Zertifikat.`);
    }

    // 2. Salutation check
    const hasSalutation = 
      userText.includes('Sehr geehrte') || 
      userText.includes('Sehr geehrter') || 
      userText.includes('Liebe') || 
      userText.includes('Lieber') || 
      userText.includes('Hallo');

    if (hasSalutation) {
      score += 25;
      feedback.push('Anrede: Korrekt vorhanden.');
    } else {
      feedback.push('Anrede fehlt! Beginne z.B. mit "Sehr geehrte Damen und Herren," oder "Liebe/r...".');
    }

    // 3. Closing check
    const hasClosing = 
      userText.includes('Mit freundlichen Grüßen') || 
      userText.includes('Herzliche Grüße') || 
      userText.includes('Viele Grüße') || 
      userText.includes('Liebe Grüße');

    if (hasClosing) {
      score += 25;
      feedback.push('Grußformel am Ende: Vorbildlich vorhanden.');
    } else {
      feedback.push('Grußformel am Ende fehlt (z.B. "Mit freundlichen Grüßen").');
    }

    // 4. Politeness pronouns (Sie / Ihnen / Ihr)
    if (activePrompt.recipientType === 'formal') {
      if (userText.includes('Sie') || userText.includes('Ihnen') || userText.includes('Ihr')) {
        score += 20;
        feedback.push('Höflichkeitsform: Großgeschriebenes "Sie/Ihnen/Ihr" verwendet.');
      } else {
        feedback.push('Tipp für formelle Briefe: Achte auf die Höflichkeitsform "Sie" und "Ihnen" (großgeschrieben).');
      }
    } else {
      score += 20;
      feedback.push('Informeller Tonfall berücksichtigt.');
    }

    const isApproved = score >= 70;
    setEvaluation({
      score,
      wordCount,
      feedback,
      isApproved
    });

    if (isApproved) {
      soundEngine.playLevelUpSound();
      addXp(35);
      recordGamePlayed('letter');
    } else {
      soundEngine.playErrorSound();
    }
  };

  const copyModel = () => {
    navigator.clipboard.writeText(activePrompt.modelSolution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertPhrase = (phrase: string) => {
    setUserText(prev => prev + (prev.length > 0 && !prev.endsWith('\n') ? ' ' : '') + phrase);
    soundEngine.playClickSound();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            DTZ-Prüfungslabor (A2–B1)
          </h1>
          <p className="text-xs text-slate-400">
            Gezielte Vorbereitung auf den <strong>Deutsch-Test für Zuwanderer</strong> (Briefe & mündliche Prüfung)
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start">
          <button
            onClick={() => {
              soundEngine.playClickSound();
              setSubTab('writing');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              subTab === 'writing'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Brief-Schreiber (Schreiben)</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playClickSound();
              setSubTab('speaking');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              subTab === 'speaking'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Sprechen-Trainer (Teil 1-3)</span>
          </button>
        </div>
      </div>

      {/* ===================== TAB 1: WRITING (BRIEF-SCHREIBER) ===================== */}
      {subTab === 'writing' && (
        <div className="space-y-6">
          {/* Prompt Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DTZ_LETTER_PROMPTS.map(p => {
              const isActive = p.id === activePromptId;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPrompt(p.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isActive
                      ? 'bg-purple-950/30 border-purple-500/50 shadow-lg shadow-purple-950/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                    p.recipientType === 'formal' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {p.recipientType === 'formal' ? 'Formell (Sie)' : 'Informell (Du/Ihr)'}
                  </span>
                  <div className="text-xs font-bold text-white line-clamp-1">{p.title}</div>
                </button>
              );
            })}
          </div>

          {/* Prompt Context Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Prüfungsaufgabe DTZ
              </span>
              <h2 className="text-lg font-bold text-white">{activePrompt.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{activePrompt.context}</p>
            </div>

            {/* Required Points Checklist */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                Folgende 4 Punkte müssen im Brief behandelt werden:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activePrompt.requiredPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Phrase Helpers (Click to insert) */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Textbausteine (Klicken zum Einfügen):</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {activePrompt.suggestedPhrases.salutation.concat(activePrompt.suggestedPhrases.opening).map((ph, idx) => (
                  <button
                    key={idx}
                    onClick={() => insertPhrase(ph)}
                    className="text-xs bg-slate-800 hover:bg-purple-900/40 text-slate-300 hover:text-purple-200 border border-slate-700/60 px-3 py-1 rounded-xl transition-all"
                  >
                    + {ph}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Dein Brief-Entwurf:</span>
                <span>
                  Wortanzahl: <strong className="text-white">{userText.trim().split(/\s+/).filter(Boolean).length}</strong> Wörter (Ziel: 35–50)
                </span>
              </div>
              <textarea
                value={userText}
                onChange={e => setUserText(e.target.value)}
                placeholder="Sehr geehrte/r..."
                rows={7}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                onClick={() => setShowModel(!showModel)}
                className="text-xs font-semibold text-slate-400 hover:text-purple-300 flex items-center gap-1.5 underline"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showModel ? 'Musterlösung verbergen' : 'Musterlösung ansehen'}</span>
              </button>

              <button
                onClick={handleEvaluateLetter}
                disabled={!userText.trim()}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all ${
                  userText.trim()
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-purple-950/40 hover:scale-105 active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Brief prüfen (+35 XP)</span>
              </button>
            </div>

            {/* Model Solution Box */}
            {showModel && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Offizielle DTZ-Musterlösung:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => soundEngine.speak(activePrompt.modelSolution)}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Anhören
                    </button>
                    <button
                      onClick={copyModel}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Kopiert' : 'Kopieren'}</span>
                    </button>
                  </div>
                </div>
                <pre className="text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                  {activePrompt.modelSolution}
                </pre>
              </div>
            )}

            {/* Evaluation Results */}
            {evaluation && (
              <div className={`p-5 rounded-2xl border space-y-3 animate-in zoom-in-95 ${
                evaluation.isApproved ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-amber-950/30 border-amber-500/40'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {evaluation.isApproved ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    )}
                    <h3 className="text-sm font-bold text-white">
                      {evaluation.isApproved ? 'Prüfung bestanden!' : 'Noch Optimierungsbedarf'}
                    </h3>
                  </div>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300">
                    Punktzahl: {evaluation.score} / 100
                  </span>
                </div>

                <ul className="text-xs space-y-1 text-slate-300 list-disc list-inside">
                  {evaluation.feedback.map((fb, idx) => (
                    <li key={idx}>{fb}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== TAB 2: SPEAKING (DTZ ORAL LAB) ===================== */}
      {subTab === 'speaking' && (
        <div className="space-y-6">
          {/* Part Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DTZ_ORAL_DATA.map(t => {
              const isActive = t.id === activeOralPart;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    soundEngine.playClickSound();
                    setActiveOralPart(t.id);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isActive
                      ? 'bg-purple-950/30 border-purple-500/50 shadow-lg shadow-purple-950/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">
                    {t.part}
                  </span>
                  <div className="text-sm font-bold text-white">{t.title}</div>
                </button>
              );
            })}
          </div>

          {/* Current Part Content */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                {currentOralTopic.part}
              </span>
              <h2 className="text-xl font-bold text-white">{currentOralTopic.title}</h2>
              <p className="text-sm text-slate-300">{currentOralTopic.description}</p>
            </div>

            {/* Typical Examiner Questions */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wide">
                Typische Prüferfragen & Impulse:
              </span>
              <div className="space-y-2">
                {currentOralTopic.sampleQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-slate-200 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
                    <span>"{q}"</span>
                    <button
                      onClick={() => soundEngine.speak(q)}
                      className="p-1 rounded-full hover:bg-slate-800 text-amber-400 shrink-0 ml-2"
                      title="Frage anhören"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Phrases Bank */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-300 block uppercase tracking-wide">
                Wichtige Redemittel & Formulierungshilfen:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentOralTopic.modelPhrases.map((cat, cIdx) => (
                  <div key={cIdx} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-2.5">
                    <span className="text-xs font-bold text-purple-300 block border-b border-slate-800 pb-1.5">
                      {cat.category}
                    </span>
                    <div className="space-y-2">
                      {cat.phrases.map((ph, pIdx) => (
                        <div key={pIdx} className="space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-100">{ph.de}</span>
                            <button
                              onClick={() => soundEngine.speak(ph.de)}
                              className="p-1 text-amber-400 hover:text-white"
                              title="Aussprache anhören"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-400 italic">{ph.en}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
