import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import { DIALOGUE_SCENARIOS } from '../data/dialogues';
import type { DialogueScenario, DialogueOption } from '../types';
import { MessageSquare, Volume2, RotateCcw, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const DialogueSimulator: React.FC = () => {
  const { addXp, recordGamePlayed } = useProgress();

  const [activeScenarioId, setActiveScenarioId] = useState<string>(DIALOGUE_SCENARIOS[0].id);
  const [currentNodeId, setCurrentNodeId] = useState<string>(DIALOGUE_SCENARIOS[0].initialNodeId);
  const [history, setHistory] = useState<{
    sender: 'npc' | 'user';
    name?: string;
    text: string;
    feedback?: string;
  }[]>([]);

  const activeScenario: DialogueScenario = DIALOGUE_SCENARIOS.find(s => s.id === activeScenarioId) || DIALOGUE_SCENARIOS[0];
  const currentNode = activeScenario.nodes[currentNodeId];

  // Initialize scenario
  useEffect(() => {
    const initial = activeScenario.nodes[activeScenario.initialNodeId];
    if (initial && initial.npcText) {
      setHistory([
        {
          sender: 'npc',
          name: initial.npcName,
          text: initial.npcText
        }
      ]);
      soundEngine.speak(initial.npcText);
    }
  }, [activeScenario]);

  const handleSelectOption = (opt: DialogueOption) => {
    soundEngine.playClickSound();

    // 1. Add user message
    const newHistory = [
      ...history,
      {
        sender: 'user' as const,
        text: opt.text,
        feedback: opt.feedback
      }
    ];

    addXp(opt.xpReward);

    // 2. Load next node
    const nextNode = activeScenario.nodes[opt.nextNodeId];
    if (nextNode) {
      setCurrentNodeId(opt.nextNodeId);
      if (nextNode.npcText) {
        newHistory.push({
          sender: 'npc',
          name: nextNode.npcName,
          text: nextNode.npcText
        });
        soundEngine.speak(nextNode.npcText);
      }
      if (nextNode.isEnd) {
        soundEngine.playLevelUpSound();
        recordGamePlayed('dialogue');
      }
    }

    setHistory(newHistory);
  };

  const restartScenario = (scenarioId?: string) => {
    const sc = DIALOGUE_SCENARIOS.find(s => s.id === (scenarioId || activeScenarioId)) || DIALOGUE_SCENARIOS[0];
    if (scenarioId) setActiveScenarioId(scenarioId);
    setCurrentNodeId(sc.initialNodeId);
    const initial = sc.nodes[sc.initialNodeId];
    if (initial && initial.npcText) {
      setHistory([
        {
          sender: 'npc',
          name: initial.npcName,
          text: initial.npcText
        }
      ]);
      soundEngine.speak(initial.npcText);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-rose-400" />
          Überlebens-Dialoge & Rollenspiel
        </h1>
        <p className="text-xs text-slate-400">
          Interaktive Konversationen für Alltag, Ämter und die DTZ-Prüfung
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DIALOGUE_SCENARIOS.map(sc => {
          const isActive = sc.id === activeScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => restartScenario(sc.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-rose-950/30 border-rose-500/50 shadow-lg shadow-rose-950/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="text-xs font-bold text-white line-clamp-1">{sc.title}</div>
              <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{sc.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* Main Dialogue Chat Window */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Scenario Info Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{activeScenario.title}</h2>
            <p className="text-xs text-slate-400">{activeScenario.description}</p>
          </div>
          <button
            onClick={() => restartScenario()}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
            title="Szenario neu starten"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Neustart</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
          {history.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5 animate-in fade-in duration-200`}
            >
              {msg.name && (
                <span className="text-[10px] font-bold text-slate-400 px-1 uppercase tracking-wider">
                  {msg.name}
                </span>
              )}

              <div className="flex items-center gap-2 max-w-[85%]">
                {msg.sender === 'npc' && (
                  <button
                    onClick={() => soundEngine.speak(msg.text)}
                    className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 shrink-0"
                    title="Audio abspielen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white font-medium rounded-tr-none shadow-md shadow-rose-950/20'
                      : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/60'
                  }`}
                >
                  {msg.text}
                </div>
              </div>

              {/* Feedback toast under user choice */}
              {msg.feedback && (
                <div className="text-[11px] text-emerald-300 bg-emerald-950/30 border border-emerald-800/40 px-3 py-1 rounded-xl max-w-[80%] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{msg.feedback}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dialogue End Notification */}
        {currentNode?.isEnd && (
          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-2 animate-in zoom-in-95">
            <Award className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Szenario erfolgreich abgeschlossen!</h3>
            <p className="text-xs text-emerald-200">{currentNode.feedback}</p>
            <div className="pt-2">
              <button
                onClick={() => restartScenario()}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                Nochmal üben
              </button>
            </div>
          </div>
        )}

        {/* Interactive Response Options */}
        {!currentNode?.isEnd && currentNode?.options && (
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-400 block">
              Wähle deine Antwort:
            </span>
            <div className="space-y-2">
              {currentNode.options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-left p-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-amber-500/50 text-slate-100 text-sm font-medium transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between gap-3 group"
                >
                  <span>{opt.text}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      +{opt.xpReward} XP
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
