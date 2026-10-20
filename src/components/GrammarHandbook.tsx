import React, { useState } from 'react';
import { GENDER_RULES, WECHSEL_PREPOSITIONS, CONNECTOR_RULES } from '../data/grammarRules';
import { BookOpen, Volume2, Search, Compass } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const GrammarHandbook: React.FC = () => {
  const [tab, setTab] = useState<'gender' | 'prepositions' | 'connectors'>('gender');
  const [search, setSearch] = useState<string>('');

  const filteredGenderRules = GENDER_RULES.filter(r => 
    r.suffix.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase()) ||
    r.examples.some(e => e.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredPrepositions = WECHSEL_PREPOSITIONS.filter(p =>
    p.preposition.toLowerCase().includes(search.toLowerCase()) ||
    p.meaning.toLowerCase().includes(search.toLowerCase())
  );

  const filteredConnectors = CONNECTOR_RULES.filter(c =>
    c.connector.toLowerCase().includes(search.toLowerCase()) ||
    c.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            Grammatik-Spickzettel & Regeln
          </h1>
          <p className="text-xs text-slate-400">
            Das kompakte Nachschlagewerk für deutsche Artikelregeln, Präpositionen und Satzbau
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start">
          <button
            onClick={() => {
              soundEngine.playClickSound();
              setTab('gender');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              tab === 'gender' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Artikel (Der/Die/Das)
          </button>
          <button
            onClick={() => {
              soundEngine.playClickSound();
              setTab('prepositions');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              tab === 'prepositions' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Wechselpräpositionen
          </button>
          <button
            onClick={() => {
              soundEngine.playClickSound();
              setTab('connectors');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              tab === 'connectors' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Konnektoren (Satzbau)
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Regel, Endung oder Wort suchen..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* ===================== TAB 1: GENDER RULES ===================== */}
      {tab === 'gender' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DIE Column */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between">
              <span className="font-extrabold text-rose-300 text-sm">DIE (Feminin)</span>
              <span className="text-[10px] text-rose-400 font-bold uppercase">Sicherheitsregeln</span>
            </div>
            <div className="space-y-3">
              {filteredGenderRules.filter(r => r.gender === 'die').map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-rose-300">{rule.suffix}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {rule.reliability}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rule.examples.map((ex, eIdx) => (
                      <span
                        key={eIdx}
                        onClick={() => soundEngine.speak(ex)}
                        className="text-[11px] bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-2 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        {ex} 🔊
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DER Column */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-center justify-between">
              <span className="font-extrabold text-blue-300 text-sm">DER (Maskulin)</span>
              <span className="text-[10px] text-blue-400 font-bold uppercase">Sicherheitsregeln</span>
            </div>
            <div className="space-y-3">
              {filteredGenderRules.filter(r => r.gender === 'der').map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-blue-300">{rule.suffix}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {rule.reliability}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rule.examples.map((ex, eIdx) => (
                      <span
                        key={eIdx}
                        onClick={() => soundEngine.speak(ex)}
                        className="text-[11px] bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-2 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        {ex} 🔊
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DAS Column */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
              <span className="font-extrabold text-emerald-300 text-sm">DAS (Neutral)</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase">Sicherheitsregeln</span>
            </div>
            <div className="space-y-3">
              {filteredGenderRules.filter(r => r.gender === 'das').map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-emerald-300">{rule.suffix}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {rule.reliability}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{rule.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rule.examples.map((ex, eIdx) => (
                      <span
                        key={eIdx}
                        onClick={() => soundEngine.speak(ex)}
                        className="text-[11px] bg-slate-950 border border-slate-800 text-slate-300 hover:text-white px-2 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        {ex} 🔊
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: PREPOSITIONS ===================== */}
      {tab === 'prepositions' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Compass className="w-5 h-5" />
              <span>Die Goldene Regel der Wechselpräpositionen</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Es gibt 9 Präpositionen, die ihren Kasus ändern: <br />
              <strong className="text-amber-400">Wohin? (Richtung / Bewegung)</strong> verlangt den <span className="underline font-bold text-amber-300">Akkusativ</span>.<br />
              <strong className="text-cyan-400">Wo? (Feste Position / Zustand)</strong> verlangt den <span className="underline font-bold text-cyan-300">Dativ</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrepositions.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white">{item.preposition}</h3>
                  <span className="text-xs text-slate-400 font-medium">{item.meaning}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200">
                    <span className="font-bold text-[10px] block uppercase text-amber-400">Akkusativ (Wohin?):</span>
                    <span>{item.exampleAkk}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-cyan-200">
                    <span className="font-bold text-[10px] block uppercase text-cyan-400">Dativ (Wo?):</span>
                    <span>{item.exampleDat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 3: CONNECTORS ===================== */}
      {tab === 'connectors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-rose-400 uppercase">Verb am Ende</span>
              <p className="text-[11px] text-slate-300">weil, obwohl, dass, wenn, da, damit</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase">Position 0 (Normal)</span>
              <p className="text-[11px] text-slate-300">denn, aber, und, oder, sondern</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase">Position 1 (Inversion)</span>
              <p className="text-[11px] text-slate-300">deshalb, deswegen, trotzdem, dann</p>
            </div>
          </div>

          <div className="space-y-3">
            {filteredConnectors.map((c, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-white">{c.connector}</span>
                    <span className="text-xs text-slate-400">({c.meaning})</span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                    {c.positionEffect}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200 flex items-center justify-between">
                  <span>{c.example}</span>
                  <button
                    onClick={() => soundEngine.speak(c.example)}
                    className="p-1 text-amber-400 hover:text-white shrink-0 ml-2"
                    title="Beispiel anhören"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
