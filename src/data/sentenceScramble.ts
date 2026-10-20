import type { SentenceScrambleItem } from '../types';

export const SENTENCE_SCRAMBLE_ITEMS: SentenceScrambleItem[] = [
  {
    id: 'sc-01',
    targetDe: 'Ich möchte einen Döner mit weniger Soße bitte.',
    translationEn: 'I would like a doner with less sauce, please.',
    words: ['Ich', 'möchte', 'einen', 'Döner', 'mit', 'weniger', 'Soße', 'bitte.'],
    grammarTip: 'Modal verb "möchte" in Position 2. "einen Döner" is Akkusativ masculine. Preposition "mit" takes Dativ ("mit weniger Soße").',
    focusRule: 'ModalVerb',
    level: 'A2'
  },
  {
    id: 'sc-02',
    targetDe: 'Kann ich das Tablet in monatlichen Raten zahlen?',
    translationEn: 'Can I pay for the tablet in monthly installments?',
    words: ['Kann', 'ich', 'das', 'Tablet', 'in', 'monatlichen', 'Raten', 'zahlen?'],
    grammarTip: 'Yes/No question starts with the conjugated modal verb "Kann". The base infinitive "zahlen" is pushed to the very end of the sentence.',
    focusRule: 'ModalVerb',
    level: 'A2'
  },
  {
    id: 'sc-03',
    targetDe: 'Ich brauche einen Termin beim Bürgeramt für die Anmeldung.',
    translationEn: 'I need an appointment at the citizens\' office for the registration.',
    words: ['Ich', 'brauche', 'einen', 'Termin', 'beim', 'Bürgeramt', 'für', 'die', 'Anmeldung.'],
    grammarTip: 'Main clause: Subject "Ich" (Pos 1), conjugated verb "brauche" (Pos 2). "einen Termin" is Akkusativ (der Termin).',
    focusRule: 'V2',
    level: 'A2'
  },
  {
    id: 'sc-04',
    targetDe: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.',
    translationEn: 'I learn German because I would like to work in Germany.',
    words: ['Ich', 'lerne', 'Deutsch,', 'weil', 'ich', 'in', 'Deutschland', 'arbeiten', 'möchte.'],
    grammarTip: 'Subordinate clause with "weil" kicks the conjugated verb ("möchte") to the VERY END after the infinitive "arbeiten"!',
    focusRule: 'WeilVerbEnd',
    level: 'A2'
  },
  {
    id: 'sc-05',
    targetDe: 'Morgen bespreche ich das Projekt mit meinem Kollegen.',
    translationEn: 'Tomorrow I will discuss the project with my colleague.',
    words: ['Morgen', 'bespreche', 'ich', 'das', 'Projekt', 'mit', 'meinem', 'Kollegen.'],
    grammarTip: 'Inversion! When a time element ("Morgen") is placed in Position 1, the verb ("bespreche") remains in Position 2, immediately followed by the subject ("ich").',
    focusRule: 'V2',
    level: 'A2'
  },
  {
    id: 'sc-06',
    targetDe: 'Obwohl die Miete hoch ist, gefällt mir die Wohnung.',
    translationEn: 'Although the rent is high, I like the apartment.',
    words: ['Obwohl', 'die', 'Miete', 'hoch', 'ist,', 'gefällt', 'mir', 'die', 'Wohnung.'],
    grammarTip: '"Obwohl" kicks the verb "ist" to the end of the subordinate clause. The main clause immediately begins with its conjugated verb "gefällt".',
    focusRule: 'WeilVerbEnd',
    level: 'B1'
  },
  {
    id: 'sc-07',
    targetDe: 'Ich muss meinen gültigen Reisepass zum Termin mitbringen.',
    translationEn: 'I must bring my valid passport to the appointment.',
    words: ['Ich', 'muss', 'meinen', 'gültigen', 'Reisepass', 'zum', 'Termin', 'mitbringen.'],
    grammarTip: 'Separable prefix + modal verb: "muss" takes Position 2, while the separable infinitive "mitbringen" goes to the end intact.',
    focusRule: 'SeparableVerb',
    level: 'A2'
  },
  {
    id: 'sc-08',
    targetDe: 'Wir fahren am Wochenende mit dem Zug nach Köln.',
    translationEn: 'We are traveling to Cologne by train on the weekend.',
    words: ['Wir', 'fahren', 'am', 'Wochenende', 'mit', 'dem', 'Zug', 'nach', 'Köln.'],
    grammarTip: 'TeKaMoLo word order: Temporal (am Wochenende - Wann?) -> Modal (mit dem Zug - Wie?) -> Lokal (nach Köln - Wohin?).',
    focusRule: 'TeKaMoLo',
    level: 'A2'
  },
  {
    id: 'sc-09',
    targetDe: 'Könnten Sie mir bitte die Speisekarte bringen?',
    translationEn: 'Could you please bring me the menu?',
    words: ['Könnten', 'Sie', 'mir', 'bitte', 'die', 'Speisekarte', 'bringen?'],
    grammarTip: 'Konjunktiv II for high politeness: "Könnten Sie... bringen?". "mir" is Dativ (to me), "die Speisekarte" is Akkusativ.',
    focusRule: 'AkkusativDativ',
    level: 'A2'
  },
  {
    id: 'sc-10',
    targetDe: 'Ich freue mich sehr auf unser nächstes Meeting.',
    translationEn: 'I am looking forward very much to our next meeting.',
    words: ['Ich', 'freue', 'mich', 'sehr', 'auf', 'unser', 'nächstes', 'Meeting.'],
    grammarTip: 'Reflexive verb with preposition: "sich freuen auf" + Akkusativ (future event).',
    focusRule: 'AkkusativDativ',
    level: 'B1'
  }
];
