import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { 
  OFFICIAL_FORMS, FORM_QUIZ_QUESTIONS, 
  type OfficialFormDoc, type FormFieldExplanation, type FormQuizQuestion 
} from '../data/formularData';
import { 
  FileText, HelpCircle, AlertTriangle, CheckCircle2, 
  XCircle, Volume2, Award, RotateCcw, 
  ChevronRight, BookmarkCheck, Landmark, Check
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const FormularTrainer: React.FC = () => {
  const { addXp } = useProgress();

  const [activeTab, setActiveTab] = useState<'decoder' | 'quiz'>('decoder');
  const [selectedFormId, setSelectedFormId] = useState<string>('anmeldung');
  const [selectedFieldId, setSelectedFieldId] = useState<string>('anm-01');

  // Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizSelectedOptionId, setQuizSelectedOptionId] = useState<string | null>(null);
  const [quizAnswerSubmitted, setQuizAnswerSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const currentForm: OfficialFormDoc = OFFICIAL_FORMS.find(f => f.id === selectedFormId) || OFFICIAL_FORMS[0];
  const activeField: FormFieldExplanation = currentForm.fields.find(f => f.fieldId === selectedFieldId) || currentForm.fields[0];
  const currentQuizQuestion: FormQuizQuestion | undefined = FORM_QUIZ_QUESTIONS[quizIndex];

  const handleSelectForm = (id: string) => {
    soundEngine.playClickSound();
    setSelectedFormId(id);
    const form = OFFICIAL_FORMS.find(f => f.id === id);
    if (form && form.fields.length > 0) {
      setSelectedFieldId(form.fields[0].fieldId);
    }
  };

  const handleSelectField = (field: FormFieldExplanation) => {
    soundEngine.playClickSound();
    setSelectedFieldId(field.fieldId);
  };

  const handleQuizAnswer = (optionId: string) => {
    if (quizAnswerSubmitted || !currentQuizQuestion) return;

    setQuizSelectedOptionId(optionId);
    setQuizAnswerSubmitted(true);

    const chosen = currentQuizQuestion.options.find(o => o.id === optionId);
    if (chosen?.isCorrect) {
      soundEngine.playSuccessSound();
      addXp(25);
      setQuizScore(prev => prev + 1);
    } else {
      soundEngine.playErrorSound();
    }
  };

  const handleNextQuiz = () => {
    soundEngine.playClickSound();
    setQuizSelectedOptionId(null);
    setQuizAnswerSubmitted(false);

    if (quizIndex + 1 < FORM_QUIZ_QUESTIONS.length) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      soundEngine.playLevelUpSound();
    }
  };

  const handleRestartQuiz = () => {
    soundEngine.playClickSound();
    setQuizIndex(0);
    setQuizSelectedOptionId(null);
    setQuizAnswerSubmitted(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Formular-Trainer
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider font-semibold">
                  Behörden-Deutsch
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Offizielle deutsche Anträge und Formulare entschlüsseln & bürokratische Fallen vermeiden
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => {
              soundEngine.playClickSound();
              setActiveTab('decoder');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'decoder'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Formular-Entschlüsseler</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playClickSound();
              setActiveTab('quiz');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Behörden-Quiz</span>
          </button>
        </div>
      </div>

      {/* ===================== TAB 1: FORM DECODER ===================== */}
      {activeTab === 'decoder' && (
        <div className="space-y-6">
          {/* Form Selection Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {OFFICIAL_FORMS.map(form => {
              const isActive = form.id === selectedFormId;
              return (
                <button
                  key={form.id}
                  onClick={() => handleSelectForm(form.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all touch-manipulation flex flex-col justify-between ${
                    isActive
                      ? 'bg-gradient-to-br from-slate-900 to-amber-950/20 border-amber-500/80 shadow-lg shadow-amber-950/20'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                      {form.authority}
                    </span>
                    {isActive && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{form.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{form.lawReference}</p>
                </button>
              );
            })}
          </div>

          {/* Form Banner Info */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-start gap-3">
            <BookmarkCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white font-semibold block mb-0.5">{currentForm.subtitle}</strong>
              {currentForm.importance}
            </div>
          </div>

          {/* Dual Panel: Form Simulator on Left, Decoder Inspector on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Official Form Layout (Mockup) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Amtlicher Vordruck</span>
                  <h4 className="text-sm font-bold text-slate-200">{currentForm.title}</h4>
                </div>
                <div className="text-[10px] font-mono px-2 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {currentForm.lawReference}
                </div>
              </div>

              <div className="text-xs text-slate-400 mb-2">
                Klicken Sie auf ein beliebiges Feld, um die behördliche Bedeutung und Stolperfallen anzuzeigen:
              </div>

              {/* Form Input Fields Mockup */}
              <div className="space-y-3">
                {currentForm.fields.map(field => {
                  const isSelected = field.fieldId === selectedFieldId;
                  return (
                    <div
                      key={field.fieldId}
                      onClick={() => handleSelectField(field)}
                      className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                        isSelected
                          ? 'bg-amber-950/30 border-amber-500 shadow-md shadow-amber-950/20 ring-1 ring-amber-500/50'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{field.labelDe}</span>
                          <span className="text-[10px] font-normal text-slate-400">({field.labelEn})</span>
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isSelected ? 'Ausgewählt' : 'Erklären'}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-slate-400 bg-slate-900/90 border border-slate-800/80 px-2.5 py-1.5 rounded-lg truncate">
                        {field.exampleValue}
                      </div>

                      {field.pitfallWarning && (
                        <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-400/90 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Wichtige Falle beachten</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Inspector / Decoder Explanation */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4" />
                  Amtsdeutsch-Decoder
                </span>
                <button
                  onClick={() => soundEngine.speak(activeField.audioPhrase)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                  title="Aussprache anhören"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Anhören</span>
                </button>
              </div>

              {/* Term */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Offizieller Begriff:</span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {activeField.officialTerm}
                </h3>
              </div>

              {/* Plain German */}
              <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  Einfache Erklärung (Deutsch):
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeField.plainMeaningDe}
                </p>
              </div>

              {/* Plain English */}
              <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  English Explanation:
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeField.plainMeaningEn}
                </p>
              </div>

              {/* Pitfall Warning */}
              {activeField.pitfallWarning && (
                <div className="bg-rose-950/30 border border-rose-500/40 rounded-2xl p-3.5 space-y-1 text-rose-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Vorsicht Falle!</span>
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed">
                    {activeField.pitfallWarning}
                  </p>
                </div>
              )}

              {/* Valid Example */}
              <div className="border-t border-slate-800 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Muster-Eintrag:</span>
                <div className="mt-1 font-mono text-xs text-amber-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  {activeField.exampleValue}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: BUREAUCRACY QUIZ ===================== */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {quizCompleted ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                <Award className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">Behörden-Quiz bestanden!</h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Sie haben Ihr Wissen über das deutsche Meldewesen, Vermieterbescheinigungen und Aufenthaltsrecht unter Beweis gestellt.
              </p>

              <div className="inline-flex items-center gap-6 bg-slate-950 px-6 py-3.5 rounded-2xl border border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Richtige Antworten</div>
                  <div className="text-2xl font-black text-emerald-400">
                    {quizScore} / {FORM_QUIZ_QUESTIONS.length}
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <div className="text-xs text-slate-400">Verdiente XP</div>
                  <div className="text-2xl font-black text-amber-400">
                    +{quizScore * 25} XP
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-950/40 inline-flex items-center gap-2 transition-transform active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  Quiz wiederholen
                </button>
              </div>
            </div>
          ) : currentQuizQuestion ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Frage {quizIndex + 1} von {FORM_QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  Score: {quizScore}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {currentQuizQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5">
                {currentQuizQuestion.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isSelected = quizSelectedOptionId === option.id;

                  let style = 'bg-slate-950 border-slate-800 hover:bg-slate-800/80 text-slate-200';
                  if (quizAnswerSubmitted) {
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
                      disabled={quizAnswerSubmitted}
                      onClick={() => handleQuizAnswer(option.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3 touch-manipulation ${style}`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        quizAnswerSubmitted && option.isCorrect
                          ? 'bg-emerald-500 text-white'
                          : isSelected
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {letter}
                      </span>

                      <div className="flex-1 text-sm font-medium">
                        {option.text}
                        {quizAnswerSubmitted && option.explanation && (
                          <p className={`text-xs mt-1.5 font-normal ${option.isCorrect ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {option.explanation}
                          </p>
                        )}
                      </div>

                      {quizAnswerSubmitted && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {quizAnswerSubmitted && isSelected && !option.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizAnswerSubmitted && (
                <div className="flex justify-end pt-3 border-t border-slate-800">
                  <button
                    onClick={handleNextQuiz}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-rose-950/40 transition-transform active:scale-95"
                  >
                    <span>Nächste Frage</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
