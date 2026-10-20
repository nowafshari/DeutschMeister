import type { DTZLetterPrompt } from '../types';

export const DTZ_LETTER_PROMPTS: DTZLetterPrompt[] = [
  {
    id: 'letter-sick',
    title: 'Krankmeldung an den Arbeitgeber',
    context: 'Sie sind plötzlich krank geworden und können heute und morgen nicht zur Arbeit kommen. Schreiben Sie eine E-Mail an Ihre Vorgesetzte, Frau Schneider.',
    recipientType: 'formal',
    requiredPoints: [
      'Grund des Schreibens (plötzliche Erkrankung)',
      'Dauer des Ausfalls (heute und morgen)',
      'Ärztliches Attest / Krankschreibung erwähnen',
      'Wichtige anstehende Aufgaben / Vertretung ansprechen'
    ],
    modelSolution: `Sehr geehrte Frau Schneider,

leider muss ich Ihnen mitteilen, dass ich plötzlich erkrankt bin und heute sowie morgen nicht zur Arbeit kommen kann. Ich war bereits beim Arzt und schicke Ihnen die ärztliche Krankschreibung im Anhang mit.

Meine dringenden Aufgaben für das aktuelle Projekt habe ich an meinen Kollegen Herrn Müller übergeben. Bei dringenden Rückfragen bin ich am Nachmittag auch kurz per E-Mail erreichbar.

Vielen Dank für Ihr Verständnis.

Mit freundlichen Grüßen,
[Ihr Vorname Nachname]`,
    suggestedPhrases: {
      salutation: [
        'Sehr geehrte Frau Schneider,',
        'Sehr geehrter Herr Direktor,',
        'Sehr geehrte Damen und Herren,'
      ],
      opening: [
        'ich schreibe Ihnen, weil ich leider plötzlich erkrankt bin.',
        'leider muss ich Ihnen mitteilen, dass ich heute nicht zur Arbeit kommen kann.',
        'hiermit möchte ich mich für die nächsten zwei Tage krankmelden.'
      ],
      body: [
        'Ich war heute Vormittag beim Arzt und habe eine Krankschreibung bis Freitag erhalten.',
        'Das ärztliche Attest (die Arbeitsunfähigkeitsbescheinigung) finden Sie im Anhang.',
        'Mein Kollege Herr Müller übernimmt freundlicherweise meine Vertretung für dringende Fristen.'
      ],
      closing: [
        'Ich hoffe, dass ich ab nächster Woche wieder fit im Büro sein werde.',
        'Vielen Dank für Ihr Verständnis und Ihre Unterstützung.',
        'Für Rückfragen stehe ich per E-Mail zur Verfügung.'
      ],
      signoff: [
        'Mit freundlichen Grüßen',
        'Herzliche Grüße'
      ]
    }
  },
  {
    id: 'letter-heating',
    title: 'Mängelanzeige: Heizung defekt (an den Vermieter)',
    context: 'In Ihrer gemieteten Wohnung funktioniert seit zwei Tagen die Heizung nicht mehr. Es ist sehr kalt. Schreiben Sie einen Brief an Ihren Vermieter, Herrn Lehmann.',
    recipientType: 'formal',
    requiredPoints: [
      'Problem schildern (Heizung im Wohn- und Schlafzimmer ist kalt)',
      'Seit wann besteht das Problem? (Seit zwei Tagen)',
      'Frist zur Reparatur setzen (innerhalb von 3 Tagen)',
      'Erreichbarkeit für den Handwerker angeben'
    ],
    modelSolution: `Sehr geehrter Herr Lehmann,

ich wende mich an Sie, weil in meiner Wohnung in der Goethestraße 12 seit zwei Tagen die Heizung ausgefallen ist. Sowohl das Wohnzimmer als auch das Schlafzimmer sind eiskalt.

Da es draußen winterlich kalt ist, bitte ich Sie dringend, das Problem so schnell wie möglich zu beheben. Ich bitte Sie, bis zum kommenden Freitag einen Handwerker zu schicken.

Sie erreichen mich telefonisch unter 0170-1234567 zur Vereinbarung eines Reparaturtermins.

Vielen Dank für Ihre rasche Hilfe.

Mit freundlichen Grüßen,
[Ihr Vorname Nachname]`,
    suggestedPhrases: {
      salutation: [
        'Sehr geehrter Herr Lehmann,',
        'Sehr geehrte Hausverwaltung,'
      ],
      opening: [
        'ich schreibe Ihnen wegen eines dringenden Problems in meiner Wohnung.',
        'leider muss ich Ihnen mitteilen, dass die Heizung seit zwei Tagen nicht mehr funktioniert.',
        'ich wende mich an Sie, weil es in der Wohnung sehr kalt ist.'
      ],
      body: [
        'Trotz mehrmaligem Entlüften bleiben die Heizkörper in allen Räumen komplett kalt.',
        'Da die Temperaturen unter den Gefrierpunkt fallen, ist die Situation unzumutbar.',
        'Ich bitte Sie höflich, bis zum 25. Oktober einen Handwerker zur Reparatur zu beauftragen.'
      ],
      closing: [
        'Zur Terminabsprache für den Handwerker können Sie mich jederzeit auf dem Handy anrufen.',
        'Bitte geben Sie mir kurz Bescheid, wann der Techniker vorbeikommt.',
        'Ich bedanke mich im Voraus für Ihre schnelle Rückmeldung.'
      ],
      signoff: [
        'Mit freundlichen Grüßen',
        'Viele Grüße'
      ]
    }
  },
  {
    id: 'letter-termin',
    title: 'Bitte um Terminverschiebung beim Bürgeramt',
    context: 'Sie haben einen Termin beim Bürgeramt für die Anmeldung, müssen aber beruflich dringend verreisen. Schreiben Sie eine Mitteilung zur Terminverschiebung.',
    recipientType: 'formal',
    requiredPoints: [
      'Terminnummer / Buchungsnummer und aktuelles Datum angeben',
      'Grund für die Absage (dringende Dienstreise)',
      'Um einen neuen Ausweichtermin bitten',
      'Bestätigung erbitten'
    ],
    modelSolution: `Sehr geehrte Damen und Herren,

ich habe am kommenden Donnerstag, den 24. Oktober, um 10:00 Uhr einen Termin zur Wohnsitzanmeldung (Terminnummer: AN-8942).

Leider muss ich aus dringenden beruflichen Gründen kurzfristig auf Dienstreise fahren und kann diesen Termin nicht wahrnehmen. Ich möchte Sie daher bitten, meinen Termin zu stornieren.

Könnten Sie mir freundlicherweise einen neuen Termin in der darauffolgenden Woche anbieten?

Ich danke Ihnen für Ihr Entgegenkommen.

Mit freundlichen Grüßen,
[Ihr Vorname Nachname]`,
    suggestedPhrases: {
      salutation: [
        'Sehr geehrte Damen und Herren,',
        'Sehr geehrte Sachbearbeiterin, sehr geehrter Sachbearbeiter,'
      ],
      opening: [
        'ich beziehe mich auf meine Terminreservierung vom 24. Oktober.',
        'leider muss ich meinen gebuchten Termin zur Anmeldung absagen.'
      ],
      body: [
        'Aufgrund einer unvorhergesehenen Dienstreise bin ich an diesem Tag leider verhindert.',
        'Ich bitte Sie vielmals um Entschuldigung für die Unannehmlichkeiten.',
        'Wäre es möglich, den Termin auf nächste Woche Mittwoch zu verlegen?'
      ],
      closing: [
        'Bitte senden Sie mir eine kurze Bestätigung über die Terminänderung per E-Mail.',
        'Vielen Dank für Ihre freundliche Unterstützung.'
      ],
      signoff: [
        'Mit freundlichen Grüßen'
      ]
    }
  },
  {
    id: 'letter-party',
    title: 'Einladung zur Einweihungsfeier (Informell)',
    context: 'Sie sind in eine neue Wohnung eingezogen und möchten Ihre neuen Nachbarn und Freunde zu einer kleinen Einweihungsfeier einladen.',
    recipientType: 'informal',
    requiredPoints: [
      'Grund der Feier (neue Wohnung eingeweiht)',
      'Datum, Uhrzeit und Ort angeben',
      'Was mitgebracht werden soll / Essen & Getränke',
      'Rückmeldung bis zu einem bestimmten Datum erbitten'
    ],
    modelSolution: `Liebe Freunde und liebe Nachbarn,

endlich habe ich den Umzug geschafft und meine neue Wohnung gemütlich eingerichtet! Das möchte ich gerne mit euch feiern und lade euch herzlich zu meiner Einweihungsparty ein.

Die Feier findet am nächsten Samstag, den 1. November, ab 18:00 Uhr in der Musterstraße 5 im 2. Stock statt.

Für Snacks, leckere Getränke und Musik ist gesorgt. Wenn ihr möchtet, könnt ihr gerne einen Nachtisch oder einen Salat mitbringen.

Bitte gebt mir bis Mittwoch kurz Bescheid, ob ihr kommen könnt.

Ich freue mich riesig auf euch!

Herzliche Grüße,
[Dein Vorname]`,
    suggestedPhrases: {
      salutation: [
        'Liebe Freunde, liebe Nachbarn,',
        'Liebe Kolleginnen und Kollegen,',
        'Hallo zusammen,'
      ],
      opening: [
        'ich habe mich inzwischen gut in meiner neuen Wohnung eingelebt.',
        'wie ihr wisst, bin ich vor kurzem umgezogen und möchte das gerne mit euch feiern.'
      ],
      body: [
        'Ich lade euch ganz herzlich zu meiner kleinen Einweihungsfeier am Samstagabend ein.',
        'Wir treffen uns ab 18 Uhr in meiner Wohnung in der Friedrichstraße.',
        'Für kalte Getränke und Hauptspeisen sorge ich.'
      ],
      closing: [
        'Gebt mir bitte bis Ende der Woche eine kurze Rückmeldung, damit ich planen kann.',
        'Bringt gerne gute Laune mit!'
      ],
      signoff: [
        'Herzliche Grüße,',
        'Liebe Grüße,',
        'Bis bald,'
      ]
    }
  }
];
