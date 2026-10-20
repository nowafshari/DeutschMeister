import type { Card } from '../types';

/**
 * Returns the clean noun text without repeating the article if card.de already includes it.
 * E.g., if card.de is "die Soße" and card.article is "die", returns "Soße".
 */
export const getCleanNoun = (card: Card): string => {
  const text = card.de.trim();
  if (card.article) {
    const regex = new RegExp(`^${card.article}\\s+`, 'i');
    if (regex.test(text)) {
      return text.replace(regex, '').trim();
    }
  }
  return text;
};

/**
 * Returns the exact phrase to speak, ensuring the article is pronounced EXACTLY ONCE.
 * E.g., if card.de is "die Soße", speaks "die Soße" (never "die die Soße").
 */
export const getSpokenPhrase = (card: Card): string => {
  const text = card.de.trim();
  if (/^(der|die|das)\s+/i.test(text)) {
    return text;
  }
  if (card.article) {
    return `${card.article} ${text}`;
  }
  return text;
};

/**
 * Returns the canonical combined German label for display (e.g. "die Soße").
 */
export const getFullDisplayLabel = (card: Card): string => {
  const text = card.de.trim();
  if (/^(der|die|das)\s+/i.test(text)) {
    return text;
  }
  if (card.article) {
    return `${card.article} ${text}`;
  }
  return text;
};
