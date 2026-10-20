export interface OralTopic {
  id: string;
  part: 'Teil 1: Vorstellung' | 'Teil 2: Erfahrung' | 'Teil 3: Planen';
  title: string;
  description: string;
  sampleQuestions: string[];
  modelPhrases: {
    category: string;
    phrases: { de: string; en: string }[];
  }[];
}

export const DTZ_ORAL_DATA: OralTopic[] = [
  {
    id: 'dtz-sp-part1',
    part: 'Teil 1: Vorstellung',
    title: 'Über sich selbst sprechen',
    description: 'Im ersten Teil stellen Sie sich den Prüfern kurz vor. Bereiten Sie die 7 klassischen Punkte vor.',
    sampleQuestions: [
      'Buchstabieren Sie bitte Ihren Nachnamen.',
      'Sagen Sie uns bitte Ihre Telefonnummer oder Handynummer.',
      'Was genau machen Sie in Ihrem Beruf als Ingenieur?',
      'Wie lange lernen Sie schon Deutsch und wo üben Sie am liebsten?'
    ],
    modelPhrases: [
      {
        category: '1. Name & Herkunft',
        phrases: [
          { de: 'Mein Name ist [Vorname Nachname].', en: 'My name is [First Name Last Name].' },
          { de: 'Ich komme ursprünglich aus [Land], lebe aber jetzt in Deutschland.', en: 'I originally come from [Country], but now live in Germany.' },
          { de: 'Ich buchstabiere meinen Nachnamen: M-U-S-T-E-R-M-A-N-N.', en: 'I spell my last name: M-U-S-T-E-R-M-A-N-N.' }
        ]
      },
      {
        category: '2. Wohnort',
        phrases: [
          { de: 'Ich wohne seit [Monaten/Jahren] in [Stadt, z.B. Köln / Berlin].', en: 'I have been living in [City] for [months/years].' },
          { de: 'Die Stadt gefällt mir sehr gut, weil es hier viele Parks und gute Jobmöglichkeiten gibt.', en: 'I like the city very much because there are many parks and good job opportunities here.' }
        ]
      },
      {
        category: '3. Beruf & Ausbildung',
        phrases: [
          { de: 'Von Beruf bin ich Ingenieur / Softwareentwickler.', en: 'By profession, I am an engineer / software developer.' },
          { de: 'Ich habe einen Hochschulabschluss gemacht und arbeite an technischen Projekten.', en: 'I completed a university degree and work on technical projects.' }
        ]
      },
      {
        category: '4. Sprachen & Hobbys',
        phrases: [
          { de: 'Meine Muttersprache ist [Sprache]. Außerdem spreche ich fließend Englisch und lerne jetzt intensiv Deutsch.', en: 'My mother tongue is [Language]. In addition, I speak fluent English and am now learning German intensively.' },
          { de: 'In meiner Freizeit gehe ich gerne spazieren, lese Bücher und treibe Sport.', en: 'In my free time, I like going for walks, reading books, and doing sports.' }
        ]
      }
    ]
  },
  {
    id: 'dtz-sp-part2',
    part: 'Teil 2: Erfahrung',
    title: 'Über ein Thema & persönliche Erfahrungen berichten',
    description: 'Sie wählen ein Thema oder ein Bild und sprechen ca. 1,5 bis 2 Minuten darüber. Nutzen Sie den 4-Stufen-Aufbau: Beschreibung -> Eigene Erfahrung in DE -> Heimatland -> Meinung.',
    sampleQuestions: [
      'Thema: Einkaufen im Internet oder im Geschäft vor Ort?',
      'Thema: Unterwegs mit öffentlichen Verkehrsmitteln oder dem eigenen Auto?',
      'Thema: Essen kochen zu Hause oder Restaurantbesuch?'
    ],
    modelPhrases: [
      {
        category: 'Stufe 1: Einleitung ins Thema',
        phrases: [
          { de: 'Das Thema meines Vortrags lautet: Einkaufen im Internet.', en: 'The topic of my presentation is: Shopping on the internet.' },
          { de: 'Auf dem Bild sieht man eine Person, die bequem am Laptop Kleidung bestellt.', en: 'In the picture you can see a person conveniently ordering clothes on a laptop.' }
        ]
      },
      {
        category: 'Stufe 2: Eigene Erfahrung in Deutschland',
        phrases: [
          { de: 'In Deutschland bestelle ich oft Bücher und Elektronik online, weil es sehr schnell geliefert wird.', en: 'In Germany, I often order books and electronics online because delivery is very fast.' },
          { de: 'Lebensmittel kaufe ich jedoch lieber im Supermarkt um die Ecke, um die Frische zu prüfen.', en: 'However, I prefer to buy groceries at the supermarket around the corner to check freshness.' }
        ]
      },
      {
        category: 'Stufe 3: Vergleich mit dem Heimatland',
        phrases: [
          { de: 'In meinem Heimatland kaufen die Menschen häufiger auf traditionellen Wochenmärkten ein.', en: 'In my home country, people buy more often at traditional weekly markets.' },
          { de: 'Dort ist der persönliche Kontakt mit den Händlern sehr wichtig.', en: 'There, personal contact with merchants is very important.' }
        ]
      },
      {
        category: 'Stufe 4: Vor- und Nachteile & Fazit',
        phrases: [
          { de: 'Auf der einen Seite spart Online-Shopping viel Zeit, auf der anderen Seite entsteht viel Verpackungsmüll.', en: 'On the one hand online shopping saves a lot of time, on the other hand a lot of packaging waste is generated.' },
          { de: 'Meiner Meinung nach sollte man eine gute Balance zwischen beidem finden.', en: 'In my opinion, one should find a good balance between both.' }
        ]
      }
    ]
  },
  {
    id: 'dtz-sp-part3',
    part: 'Teil 3: Planen',
    title: 'Gemeinsam eine Aufgabe lösen & etwas planen',
    description: 'Sie planen mit Ihrem Partner ein Vorhaben (z.B. Ausflug, Kursabschlussfeier, Geschenk, Renovierung). Zeigen Sie Dialogfähigkeit: Fragen, Reagieren, Einigen.',
    sampleQuestions: [
      'Aufgabe: Planen Sie zusammen ein gesundes Picknick für Ihren Deutschkurs am Sonntag.',
      'Punkte: Wann und wo? Was mitbringen? Schlechtwetter-Alternative? Wer lädt die anderen ein?'
    ],
    modelPhrases: [
      {
        category: 'Vorschläge machen',
        phrases: [
          { de: 'Darf ich einen Vorschlag machen? Wir könnten am Samstag um 11 Uhr starten.', en: 'May I make a suggestion? We could start on Saturday at 11 AM.' },
          { de: 'Was hältst du davon, wenn wir uns im Stadtpark treffen?', en: 'What do you think about meeting in the city park?' },
          { de: 'Ich schlage vor, dass jeder etwas zu essen mitbringt.', en: 'I suggest that everyone brings something to eat.' }
        ]
      },
      {
        category: 'Zustimmen & Begeisterung zeigen',
        phrases: [
          { de: 'Das ist eine tolle Idee! Damit bin ich absolut einverstanden.', en: 'That is a great idea! I completely agree with that.' },
          { de: 'Super, das passt mir zeitlich auch sehr gut.', en: 'Great, that also fits my schedule very well.' },
          { de: 'Genau so machen wir es!', en: 'That is exactly how we will do it!' }
        ]
      },
      {
        category: 'Höflich ablehnen & Gegenvorschlag',
        phrases: [
          { de: 'Der Vorschlag ist gut, aber leider habe ich am Vormittag einen Termin.', en: 'The suggestion is good, but unfortunately I have an appointment in the morning.' },
          { de: 'Wie wäre es stattdessen am frühen Nachmittag ab 14 Uhr?', en: 'How about early afternoon starting at 2 PM instead?' },
          { de: 'Ich würde lieber einen überdachten Ort wählen, falls es regnet.', en: 'I would rather choose a covered place in case it rains.' }
        ]
      },
      {
        category: 'Aufgaben aufteilen & Festhalten',
        phrases: [
          { de: 'Ich kann mich gerne um die Getränke und Becher kümmern.', en: 'I can gladly take care of the drinks and cups.' },
          { de: 'Würdest du eine WhatsApp-Gruppe für die anderen Teilnehmer erstellen?', en: 'Would you create a WhatsApp group for the other participants?' },
          { de: 'Abgemacht! Dann sehen wir uns am Samstag.', en: 'Agreed! Then see you on Saturday.' }
        ]
      }
    ]
  }
];
