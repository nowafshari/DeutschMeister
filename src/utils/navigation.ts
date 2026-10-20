export interface TabItem {
  id: string;
  slug: string;
  label: string;
  title: string;
  aliases: string[];
}

export const TABS: TabItem[] = [
  {
    id: 'dashboard',
    slug: 'uebersicht',
    label: 'Übersicht',
    title: 'Übersicht | DeutschMeister (DEU)',
    aliases: ['dashboard', 'home', 'uebersicht', 'overview']
  },
  {
    id: 'blitz',
    slug: 'artikel-blitz',
    label: '⚡ Artikel-Blitz',
    title: 'Artikel-Blitz (Der, Die, Das) | DeutschMeister',
    aliases: ['blitz', 'artikel-blitz', 'artikel', 'articles']
  },
  {
    id: 'wordle',
    slug: 'wort-raetsel',
    label: '🧩 Wort-Rätsel',
    title: 'Wort-Rätsel (German Wordle) | DeutschMeister',
    aliases: ['wordle', 'wort-raetsel', 'raetsel', 'woerter']
  },
  {
    id: 'scramble',
    slug: 'satz-meister',
    label: '🧱 Satz-Meister',
    title: 'Satz-Meister (Satzbau) | DeutschMeister',
    aliases: ['scramble', 'satz-meister', 'satzbau', 'sentences']
  },
  {
    id: 'dialogue',
    slug: 'dialoge',
    label: '💬 Dialoge',
    title: 'Überlebens-Dialoge | DeutschMeister',
    aliases: ['dialogue', 'dialoge', 'dialogues', 'roleplay']
  },
  {
    id: 'flashcards',
    slug: 'karteikarten',
    label: '🃏 Karteikarten',
    title: 'Karteikarten (Spaced Repetition) | DeutschMeister',
    aliases: ['flashcards', 'karteikarten', 'karten', 'cards', 'srs']
  },
  {
    id: 'dtz',
    slug: 'dtz-labor',
    label: '🎓 DTZ-Labor',
    title: 'DTZ-Prüfungslabor (A2–B1) | DeutschMeister',
    aliases: ['dtz', 'dtz-labor', 'exam', 'briefe', 'sprechen']
  },
  {
    id: 'grammar',
    slug: 'grammatik',
    label: '📖 Grammatik',
    title: 'Grammatik-Spickzettel | DeutschMeister',
    aliases: ['grammar', 'grammatik', 'regeln', 'rules']
  }
];

export const getTabFromUrl = (): string => {
  if (typeof window === 'undefined') return 'dashboard';

  // 1. Check hash first (e.g. #karteikarten or #flashcards)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (hash) {
    const found = TABS.find(t => t.id === hash || t.slug === hash || t.aliases.includes(hash));
    if (found) return found.id;
  }

  // 2. Check pathname (e.g. /karteikarten or /flashcards)
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase().trim();
  if (path) {
    const found = TABS.find(t => t.id === path || t.slug === path || t.aliases.includes(path));
    if (found) return found.id;
  }

  return 'dashboard';
};

export const syncUrlAndTitle = (tabId: string, replaceHistory = false) => {
  if (typeof window === 'undefined') return;

  const tab = TABS.find(t => t.id === tabId) || TABS[0];

  // Update document title
  document.title = tab.title;

  const targetHash = `#${tab.slug}`;
  if (window.location.hash !== targetHash) {
    if (replaceHistory) {
      window.history.replaceState({ tab: tab.id }, '', targetHash);
    } else {
      window.history.pushState({ tab: tab.id }, '', targetHash);
    }
  }
};
