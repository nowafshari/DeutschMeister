export interface GenderRule {
  suffix: string;
  gender: 'der' | 'die' | 'das';
  description: string;
  examples: string[];
  reliability: string;
}

export const GENDER_RULES: GenderRule[] = [
  // DIE rules (feminine)
  {
    suffix: '-ung',
    gender: 'die',
    description: 'Nouns ending in -ung are almost 100% feminine.',
    examples: ['die Wohnung', 'die Anmeldung', 'die Besprechung', 'die Heizung', 'die Rechnung'],
    reliability: '99%'
  },
  {
    suffix: '-heit / -keit',
    gender: 'die',
    description: 'Abstract nouns ending in -heit or -keit are always feminine.',
    examples: ['die Freiheit', 'die Möglichkeit', 'die Pünktlichkeit', 'die Sicherheit'],
    reliability: '100%'
  },
  {
    suffix: '-schaft',
    gender: 'die',
    description: 'Nouns ending in -schaft denote relationships or collective states and are always feminine.',
    examples: ['die Wirtschaft', 'die Freundschaft', 'die Nachbarschaft'],
    reliability: '100%'
  },
  {
    suffix: '-tion / -sion',
    gender: 'die',
    description: 'Latin loanwords ending in -tion or -sion are always feminine.',
    examples: ['die Station', 'die Information', 'die Kaution', 'die Diskussion'],
    reliability: '100%'
  },
  {
    suffix: '-tät',
    gender: 'die',
    description: 'Nouns ending in -tät (from Latin -tas) are always feminine.',
    examples: ['die Universität', 'die Qualität', 'die Flexibilität'],
    reliability: '100%'
  },
  {
    suffix: '-ik',
    gender: 'die',
    description: 'Nouns ending in -ik (disciplines, sciences) are feminine.',
    examples: ['die Musik', 'die Physik', 'die Politik', 'die Elektronik'],
    reliability: '95%'
  },
  {
    suffix: '-ei',
    gender: 'die',
    description: 'Places of business or continuous actions ending in -ei are feminine.',
    examples: ['die Bäckerei', 'die Metzgerei', 'die Datei'],
    reliability: '98%'
  },

  // DER rules (masculine)
  {
    suffix: '-or',
    gender: 'der',
    description: 'Nouns referring to agents or apparatuses ending in -or are masculine.',
    examples: ['der Motor', 'der Faktor', 'der Doktor', 'der Generator'],
    reliability: '98%'
  },
  {
    suffix: '-ismus',
    gender: 'der',
    description: 'Philosophies and technical terms ending in -ismus are masculine.',
    examples: ['der Tourismus', 'der Optimismus', 'der Realismus'],
    reliability: '100%'
  },
  {
    suffix: '-ling',
    gender: 'der',
    description: 'Nouns ending in -ling are masculine.',
    examples: ['der Lehrling', 'der Frühling', 'der Schmetterling'],
    reliability: '100%'
  },
  {
    suffix: '-ist',
    gender: 'der',
    description: 'Persons with specific professions or beliefs ending in -ist are masculine.',
    examples: ['der Polizist', 'der Tourist', 'der Spezialist'],
    reliability: '100%'
  },
  {
    suffix: 'Days / Months / Seasons',
    gender: 'der',
    description: 'All days of the week, months, and seasons are masculine.',
    examples: ['der Montag', 'der Juli', 'der Sommer', 'der Herbst'],
    reliability: '100%'
  },
  {
    suffix: '-er (Agent / Doer)',
    gender: 'der',
    description: 'Most nouns ending in -er that perform an action are masculine.',
    examples: ['der Verkäufer', 'der Mitarbeiter', 'der Rechner', 'der Fehler'],
    reliability: '85%'
  },

  // DAS rules (neuter)
  {
    suffix: '-chen / -lein',
    gender: 'das',
    description: 'Diminutives ending in -chen or -lein are always neuter, regardless of natural gender!',
    examples: ['das Mädchen', 'das Brötchen', 'das Hähnchen', 'das Häuschen'],
    reliability: '100%'
  },
  {
    suffix: '-ment',
    gender: 'das',
    description: 'Nouns of French/Latin origin ending in -ment are neuter.',
    examples: ['das Dokument', 'das Experiment', 'das Instrument'],
    reliability: '98%'
  },
  {
    suffix: '-um',
    gender: 'das',
    description: 'Latin origin nouns ending in -um are neuter.',
    examples: ['das Datum', 'das Museum', 'das Zentrum', 'das Praktikum'],
    reliability: '100%'
  },
  {
    suffix: 'Infinitive as Noun',
    gender: 'das',
    description: 'Any German verb capitalized as a noun is always neuter.',
    examples: ['das Essen', 'das Leben', 'das Einkaufen', 'das Lernen'],
    reliability: '100%'
  }
];

export interface PrepositionRule {
  preposition: string;
  meaning: string;
  caseRule: 'Wechsel' | 'Akkusativ' | 'Dativ' | 'Genitiv';
  explanation: string;
  exampleAkk: string;
  exampleDat: string;
}

export const WECHSEL_PREPOSITIONS: PrepositionRule[] = [
  {
    preposition: 'in',
    meaning: 'in / into',
    caseRule: 'Wechsel',
    explanation: 'Wohin? (Movement into) -> Akkusativ. Wo? (Location inside) -> Dativ.',
    exampleAkk: 'Ich gehe in das (ins) Bürgeramt. (Wohin?)',
    exampleDat: 'Ich bin in dem (im) Bürgeramt. (Wo?)'
  },
  {
    preposition: 'an',
    meaning: 'at / on (vertical surface) / to',
    caseRule: 'Wechsel',
    explanation: 'Wohin? (Movement up to surface) -> Akkusativ. Wo? (Stationary at/by) -> Dativ.',
    exampleAkk: 'Ich hänge das Bild an die Wand. (Wohin?)',
    exampleDat: 'Das Bild hängt an der Wand. (Wo?)'
  },
  {
    preposition: 'auf',
    meaning: 'on (horizontal) / onto',
    caseRule: 'Wechsel',
    explanation: 'Wohin? (Putting onto surface) -> Akkusativ. Wo? (Resting on top) -> Dativ.',
    exampleAkk: 'Ich lege den Mietvertrag auf den Tisch. (Wohin?)',
    exampleDat: 'Der Mietvertrag liegt auf dem Tisch. (Wo?)'
  },
  {
    preposition: 'unter',
    meaning: 'under',
    caseRule: 'Wechsel',
    explanation: 'Wohin? -> Akkusativ. Wo? -> Dativ.',
    exampleAkk: 'Die Katze läuft unter das Bett.',
    exampleDat: 'Die Katze schläft unter dem Bett.'
  },
  {
    preposition: 'vor',
    meaning: 'in front of / before',
    caseRule: 'Wechsel',
    explanation: 'Wohin? -> Akkusativ. Wo? -> Dativ.',
    exampleAkk: 'Stellen Sie sich vor das Fenster.',
    exampleDat: 'Wir warten vor dem Eingang.'
  },
  {
    preposition: 'hinter',
    meaning: 'behind',
    caseRule: 'Wechsel',
    explanation: 'Wohin? -> Akkusativ. Wo? -> Dativ.',
    exampleAkk: 'Fahren Sie das Auto hinter das Haus.',
    exampleDat: 'Der Parkplatz ist hinter dem Haus.'
  },
  {
    preposition: 'neben',
    meaning: 'next to / beside',
    caseRule: 'Wechsel',
    explanation: 'Wohin? -> Akkusativ. Wo? -> Dativ.',
    exampleAkk: 'Setzen Sie sich bitte neben meine Kollegin.',
    exampleDat: 'Ich sitze neben meiner Kollegin.'
  },
  {
    preposition: 'zwischen',
    meaning: 'between',
    caseRule: 'Wechsel',
    explanation: 'Wohin? -> Akkusativ. Wo? -> Dativ.',
    exampleAkk: 'Ich lege das Dokument zwischen die Akten.',
    exampleDat: 'Das Dokument liegt zwischen den Akten.'
  }
];

export interface ConnectorRule {
  connector: string;
  type: 'subordinating' | 'coordinating' | 'adverbial';
  positionEffect: string;
  meaning: string;
  example: string;
}

export const CONNECTOR_RULES: ConnectorRule[] = [
  {
    connector: 'weil',
    type: 'subordinating',
    positionEffect: 'Verbs kicked to the VERY END',
    meaning: 'because (gives reason)',
    example: 'Ich lerne fleißig Deutsch, weil ich die B1-Prüfung bestehen will.'
  },
  {
    connector: 'obwohl',
    type: 'subordinating',
    positionEffect: 'Verbs kicked to the VERY END',
    meaning: 'although / even though',
    example: 'Obwohl die Miete hoch ist, unterschreibe ich den Vertrag.'
  },
  {
    connector: 'dass',
    type: 'subordinating',
    positionEffect: 'Verbs kicked to the VERY END',
    meaning: 'that (reported thought/fact)',
    example: 'Ich weiß, dass die Anmeldung innerhalb von 14 Tagen erfolgen muss.'
  },
  {
    connector: 'wenn',
    type: 'subordinating',
    positionEffect: 'Verbs kicked to the VERY END',
    meaning: 'if / when (condition or repeated time)',
    example: 'Wenn Sie Fragen haben, rufen Sie mich bitte an.'
  },
  {
    connector: 'denn',
    type: 'coordinating',
    positionEffect: 'Position 0 (Normal Subject + Verb in Pos 2 follows)',
    meaning: 'for / because (conversational)',
    example: 'Ich kaufe das Gerät nicht, denn es ist zu teuer.'
  },
  {
    connector: 'deshalb / deswegen',
    type: 'adverbial',
    positionEffect: 'Position 1 -> Verb IMMEDIATELY in Pos 2 (Inversion)',
    meaning: 'therefore / that is why',
    example: 'Ich habe einen neuen Job, deshalb ziehe ich nach Düsseldorf.'
  },
  {
    connector: 'trotzdem',
    type: 'adverbial',
    positionEffect: 'Position 1 -> Verb IMMEDIATELY in Pos 2 (Inversion)',
    meaning: 'nevertheless / nonetheless',
    example: 'Der Termin war voll, trotzdem bin ich früh zum Amt gegangen.'
  }
];
