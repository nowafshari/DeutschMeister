export type Article = 'der' | 'die' | 'das' | null;

export type LanguageLevel = 'A1' | 'A2' | 'B1';

export type DeckCategory = 
  | 'everyday'
  | 'food'
  | 'bureaucracy'
  | 'work'
  | 'finance'
  | 'dtz'
  | 'health'
  | 'housing'
  | 'transit';

export interface Card {
  id: string;
  de: string;
  en: string;
  article: Article;
  plural?: string;
  level: LanguageLevel;
  category: DeckCategory;
  exampleDe: string;
  exampleEn: string;
  explanation: string;
  culturalNote?: string;
  tags: string[];
}

export interface SRSCardState {
  interval: number; // in days
  easeFactor: number; // default ~2.5
  repetitions: number;
  dueDate: string; // ISO date string
  lastReviewed?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  cardsReviewedCount: number;
  gamesPlayedCount: number;
  solvedWordlesCount: number;
  completedLettersCount: number;
  completedDialoguesCount: number;
  highScoreArticleBlitz: number;
  achievements: Record<string, boolean>;
  srs: Record<string, SRSCardState>;
  soundEnabled: boolean;
  speechRate: number;
  selectedVoiceURI?: string | null;
}

export interface ArticleGameItem {
  word: string;
  article: 'der' | 'die' | 'das';
  translation: string;
  ruleMnemonic?: string;
}

export interface WordleWord {
  word: string; // 5 uppercase letters
  translation: string;
  hint: string;
  exampleDe: string;
}

export interface SentenceScrambleItem {
  id: string;
  targetDe: string;
  translationEn: string;
  words: string[]; // shuffled or correct
  grammarTip: string;
  focusRule: 'V2' | 'WeilVerbEnd' | 'TeKaMoLo' | 'ModalVerb' | 'SeparableVerb' | 'AkkusativDativ';
  level: LanguageLevel;
}

export interface DialogueOption {
  text: string;
  nextNodeId: string;
  xpReward: number;
  tone?: 'formal' | 'informal' | 'slang' | 'suboptimal';
  feedback?: string;
}

export interface DialogueNode {
  id: string;
  speaker: 'npc' | 'user';
  npcName?: string;
  npcText?: string;
  options?: DialogueOption[];
  isEnd?: boolean;
  feedback?: string;
}

export interface DialogueScenario {
  id: string;
  title: string;
  subtitle: string;
  category: 'daily' | 'bureaucracy' | 'finance' | 'work' | 'dtz';
  icon: string;
  description: string;
  initialNodeId: string;
  nodes: Record<string, DialogueNode>;
}

export interface DTZLetterPrompt {
  id: string;
  title: string;
  context: string;
  recipientType: 'formal' | 'informal';
  requiredPoints: string[];
  modelSolution: string;
  suggestedPhrases: {
    salutation: string[];
    opening: string[];
    body: string[];
    closing: string[];
    signoff: string[];
  };
}
