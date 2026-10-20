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
  },
  {
    id: 'sc-11',
    targetDe: 'Ich gehe zum Arzt, weil ich starke Halsschmerzen habe.',
    translationEn: 'I am going to the doctor because I have a severe sore throat.',
    words: ['Ich', 'gehe', 'zum', 'Arzt,', 'weil', 'ich', 'starke', 'Halsschmerzen', 'habe.'],
    grammarTip: 'Subordinate clause with "weil": the conjugated verb "habe" is kicked to the very end of the clause.',
    focusRule: 'WeilVerbEnd',
    level: 'A2'
  },
  {
    id: 'sc-12',
    targetDe: 'Wenn der Zug Verspätung hat, verpasse ich meinen Anschluss.',
    translationEn: 'If the train is delayed, I will miss my connection.',
    words: ['Wenn', 'der', 'Zug', 'Verspätung', 'hat,', 'verpasse', 'ich', 'meinen', 'Anschluss.'],
    grammarTip: 'Conditional clause: "Wenn" puts "hat" at the end. The following main clause immediately starts with its conjugated verb "verpasse" (Verb-First position).',
    focusRule: 'WeilVerbEnd',
    level: 'B1'
  },
  {
    id: 'sc-13',
    targetDe: 'Sie nimmt täglich eine Tablette, um schnell gesund zu werden.',
    translationEn: 'She takes a tablet daily in order to get well quickly.',
    words: ['Sie', 'nimmt', 'täglich', 'eine', 'Tablette,', 'um', 'schnell', 'gesund', 'zu', 'werden.'],
    grammarTip: 'Purpose clause with "um... zu" + Infinitive at the very end ("um... gesund zu werden").',
    focusRule: 'ModalVerb',
    level: 'B1'
  },
  {
    id: 'sc-14',
    targetDe: 'Gestern habe ich den Mietvertrag beim Vermieter unterschrieben.',
    translationEn: 'Yesterday I signed the lease agreement at the landlord\'s office.',
    words: ['Gestern', 'habe', 'ich', 'den', 'Mietvertrag', 'beim', 'Vermieter', 'unterschrieben.'],
    grammarTip: 'Perfekt tense with inversion: Time element "Gestern" (Pos 1) -> auxiliary "habe" (Pos 2) -> subject "ich" -> Partizip II "unterschrieben" at the sentence bracket end.',
    focusRule: 'V2',
    level: 'A2'
  },
  {
    id: 'sc-15',
    targetDe: 'Könnten Sie mir bitte die Quittung für das Ticket geben?',
    translationEn: 'Could you please give me the receipt for the ticket?',
    words: ['Könnten', 'Sie', 'mir', 'bitte', 'die', 'Quittung', 'für', 'das', 'Ticket', 'geben?'],
    grammarTip: 'Polite request with Konjunktiv II ("Könnten Sie... geben?"). Dativ pronoun "mir" precedes Akkusativ object "die Quittung".',
    focusRule: 'AkkusativDativ',
    level: 'A2'
  },
  {
    id: 'sc-16',
    targetDe: 'Da es heute sehr stark regnet, fahre ich mit dem Bus.',
    translationEn: 'Since it is raining heavily today, I am taking the bus.',
    words: ['Da', 'es', 'heute', 'sehr', 'stark', 'regnet,', 'fahre', 'ich', 'mit', 'dem', 'Bus.'],
    grammarTip: 'Causal conjunction "Da" puts the verb "regnet" at the end of the subclause; main clause begins with verb "fahre".',
    focusRule: 'WeilVerbEnd',
    level: 'B1'
  },
  {
    id: 'sc-17',
    targetDe: 'Wir müssen den neuen Wohnsitz innerhalb von zwei Wochen anmelden.',
    translationEn: 'We must register the new residence within two weeks.',
    words: ['Wir', 'müssen', 'den', 'neuen', 'Wohnsitz', 'innerhalb', 'von', 'zwei', 'Wochen', 'anmelden.'],
    grammarTip: 'Modal verb "müssen" in Pos 2 brackets the separable infinitive "anmelden" to the very end of the clause.',
    focusRule: 'SeparableVerb',
    level: 'A2'
  },
  {
    id: 'sc-18',
    targetDe: 'Ich lerne fleißig Deutsch, damit ich die DTZ-Prüfung bestehe.',
    translationEn: 'I study German diligently so that I pass the DTZ exam.',
    words: ['Ich', 'lerne', 'fleißig', 'Deutsch,', 'damit', 'ich', 'die', 'DTZ-Prüfung', 'bestehe.'],
    grammarTip: 'Subordinate clause with "damit" (so that/in order that) sends the conjugated verb "bestehe" to the end.',
    focusRule: 'WeilVerbEnd',
    level: 'B1'
  },
  {
    id: 'sc-19',
    targetDe: 'Am Bahnhof kaufe ich mir schnell eine Fahrkarte am Automaten.',
    translationEn: 'At the train station I quickly buy myself a ticket at the machine.',
    words: ['Am', 'Bahnhof', 'kaufe', 'ich', 'mir', 'schnell', 'eine', 'Fahrkarte', 'am', 'Automaten.'],
    grammarTip: 'Inversion (Lokal adverbial in Pos 1) -> verb "kaufe" -> subject "ich" -> reflexive Dativ "mir".',
    focusRule: 'V2',
    level: 'A2'
  },
  {
    id: 'sc-20',
    targetDe: 'Obwohl die Miete gestiegen ist, möchte ich in der Wohnung bleiben.',
    translationEn: 'Although the rent has increased, I would like to stay in the apartment.',
    words: ['Obwohl', 'die', 'Miete', 'gestiegen', 'ist,', 'möchte', 'ich', 'in', 'der', 'Wohnung', 'bleiben.'],
    grammarTip: 'Concessive connector "Obwohl" kicks auxiliary "ist" to subclause end. Main clause follows with modal "möchte" (Pos 1) and base infinitive "bleiben" at the end.',
    focusRule: 'WeilVerbEnd',
    level: 'B1'
  }
];
