# 🇩🇪 DeutschMeister (DEU) — Standalone A2–B1 German Learning Platform

**DeutschMeister** is a completely **standalone, zero-API, zero-cloud-dependency** interactive German learning web application built specifically for learners transitioning from **A2 to B1**, preparing for the **DTZ (Deutsch-Test für Zuwanderer)**, and living/working in Germany.

---

## 🎯 Built Around Your Real-World Needs & History

1. **Practical Living in Germany**:
   - **Imbiss / Restaurant Ordering**: Specific custom requests like *"Ein Döner mit weniger Soße und ohne Zwiebeln, zum Mitnehmen bitte"*.
   - **Tech & Electronics Store Financing**: Asking about *"0%-Finanzierung"*, *"monatliche Rate"*, *"Laufzeit"*, and *"Bonitätsprüfung / Schufa"*.
   - **Bürgeramt & Bureaucracy**: Master the *"Anmeldung"*, *"Wohnungsgeberbestätigung"*, *"Steuer-ID"*, and *"Meldebescheinigung"*.
   - **Immigration / Blue Card to Niederlassungserlaubnis**: Target the B1 certification required to accelerate permanent residency.
   - **Work & Office German**: *"Besprechungen"*, *"Fristen einhalten"*, *"Gleitzeit"*, *"Krankschreibung (eAU)"*, and *"Feierabend"*.

2. **100% Standalone & Free (No APIs, No AI Subscriptions)**:
   - **Zero Groq / OpenAI / Cloud fees**: All grammar explanations, mnemonics, and exam checks run via a built-in offline rule engine.
   - **Native German Pronunciation**: Powered by the browser's native **Web Speech API** (`de-DE` voice) with customizable speech speeds (0.8x slow, 1.0x normal).
   - **Synthesized Audio Effects**: Interactive sounds (chimes, clicks, level-ups, buzzers) are generated in real-time via the **Web Audio API**—no external MP3/WAV files required.
   - **Persistent Local Progress**: Streaks, XP, card intervals (SM-2 SRS), solved Wordles, and badges save directly to `localStorage`.

---

## 🕹️ Interactive Features & Game Modes

### 1. ⚡ Artikel-Blitz (Der, Die, Das Speed Match)
- 60-second high-energy reflex challenge to master German noun genders.
- Keyboard shortcuts: **1 = DER**, **2 = DIE**, **3 = DAS**.
- **Instant Mnemonic Rule Pop-ups**: Shows *why* a word has a specific article (e.g., `-ung`, `-heit`, `-keit`, `-schaft`, `-tion` $\rightarrow$ always *die*; `-chen`, `-lein`, `-ment`, `-um` $\rightarrow$ always *das*; `-or`, `-ismus`, seasons, days $\rightarrow$ always *der*).
- Multiplier combo streaks, sound effects, and confetti.

### 2. 🧩 Wort-Rätsel (German Wordle)
- Guess the secret 5-letter German word in 6 tries.
- Includes German keyboard with Umlauts (**Ä, Ö, Ü, ß**).
- Clue button with English translation and German context.
- Pronounces the word and shows an example sentence upon solving.

### 3. 🧱 Satz-Meister (Sentence Scramble)
- Interactive drag/click word tile builder to master the hardest part of German: **Word Order (Satzbau)**!
- Focus rules covered:
  - **Verb Position 2 (V2)** in main clauses.
  - **Inversion** when starting with time adverbs (*"Morgen bespreche ich..."*).
  - **Verb-Kick to the End** with subordinating conjunctions (*weil, obwohl, dass*).
  - **Modal verb bracket** (*"muss... mitbringen"*).
  - **TeKaMoLo** ordering (Temporal $\rightarrow$ Kausal $\rightarrow$ Modal $\rightarrow$ Lokal).

### 4. 💬 Überlebens-Dialoge (Branching Roleplay)
- Realistic interactive dialogue simulator:
  1. *Imbiss: Döner mit weniger Soße bestellen.*
  2. *Elektronikmarkt: 0%-Ratenzahlung & Monatsraten.*
  3. *Bürgeramt: Wohnsitz-Anmeldung & Dokumente.*
  4. *DTZ Sprechen Teil 3: Gemeinsam eine Abschiedsfeier planen.*
- Provides immediate feedback on whether phrasing was natural, too formal, or suboptimal.

### 5. 🎓 DTZ-Prüfungslabor (Deutsch-Test für Zuwanderer)
- **Brief-Schreiber (Writing Lab)**:
  - Practice real exam prompts (*Krankmeldung*, *Heizungsausfall*, *Terminverschiebung*, *Einladung*).
  - Built-in checker verifies formal salutations, comma punctuation, polite pronoun capitalization (*Sie/Ihnen*), required points, and word count.
  - One-click phrase inserts and full model solution comparison.
- **Sprechen-Trainer (Oral Lab)**:
  - Guided preparation for **Teil 1** (Sich vorstellen), **Teil 2** (Erfahrungsbericht mit 4-Stufen-System), and **Teil 3** (Gemeinsam planen).
  - Interactive phrasebook with native audio for suggestions, agreements, and counter-proposals.

### 6. 🃏 Spaced Repetition (SRS) Flashcards
- Categorized decks: *Essen & Imbiss*, *Bürokratie & Wohnen*, *Finanzen & Technik*, *Beruf & Büro*, *Alltag*, *DTZ Redemittel*.
- SM-2 scheduling: *Nochmal (<1d)*, *Schwer (2d)*, *Gut (4d)*, *Einfach (7d)*.
- Flips to reveal German audio, English translation, example sentences, and cultural notes for life in Germany.

### 7. 📖 Grammatik-Spickzettel (Handbook)
- Searchable offline cheat sheets:
  - Article suffix rules and reliability ratings.
  - **Wechselpräpositionen**: *Wohin? (Akkusativ)* vs. *Wo? (Dativ)*.
  - Connector rules: *Verb-Ende* vs. *Position 0* vs. *Position 1 (Inversion)*.

---

## 🚀 How to Run

From PowerShell in `C:\Antigravity\DEU`:

```powershell
# Development server with live reload:
npm.cmd run dev

# Or build and preview production build:
npm.cmd run build
npm.cmd run preview
```

Open the URL displayed in the terminal (usually `http://localhost:5173`).
