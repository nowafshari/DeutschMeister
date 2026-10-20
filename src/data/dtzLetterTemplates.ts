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
  },
  {
    id: 'letter-cancellation',
    title: 'Kündigung des Fitnessstudio-Vertrags',
    context: 'Sie ziehen in eine andere Stadt um und möchten Ihren Mitgliedsvertrag beim Fitnessstudio "FitLife" fristgerecht zum Monatsende kündigen. Schreiben Sie eine formelle Kündigung an die Studioleitung.',
    recipientType: 'formal',
    requiredPoints: [
      'Grund des Schreibens (Kündigung des Mitgliedsvertrags)',
      'Mitgliedsnummer und Kündigungsdatum angeben',
      'Grund für die Kündigung (Umzug in eine andere Stadt)',
      'Schriftliche Kündigungsbestätigung und Entzug der Einzugsermächtigung erbitten'
    ],
    modelSolution: `Sehr geehrte Damen und Herren,

hiermit kündige ich meinen Mitgliedsvertrag mit der Mitgliedsnummer FL-54321 fristgerecht zum nächstmöglichen Zeitpunkt, hilfsweise zum 30. November.

Der Grund für meine Kündigung ist ein berufsbedingter Umzug in eine andere Stadt, weshalb ich Ihr Studio leider nicht mehr nutzen kann. Die Meldebescheinigung meines neuen Wohnsitzes lege ich diesem Schreiben bei.

Gleichzeitig widerrufe ich die Ihnen erteilte SEPA-Einzugsermächtigung mit Wirkung zum Vertragsende.

Bitte senden Sie mir eine schriftliche Bestätigung der Kündigung unter Angabe des Beendigungszeitpunkts per E-Mail zu.

Mit freundlichen Grüßen,
[Ihr Vorname Nachname]`,
    suggestedPhrases: {
      salutation: [
        'Sehr geehrte Damen und Herren,',
        'Sehr geehrte Studioleitung,'
      ],
      opening: [
        'hiermit kündige ich meinen Mitgliedsvertrag fristgerecht zum nächstmöglichen Termin.',
        'ich schreibe Ihnen, um mein Abonnement mit der Mitgliedsnummer FL-54321 zu kündigen.',
        'hiermit mache ich von meinem Sonderkündigungsrecht Gebrauch.'
      ],
      body: [
        'Aufgrund eines berufsbedingten Wohnortwechsels kann ich Ihr Angebot leider nicht mehr wahrnehmen.',
        'Eine Kopie meiner neuen Meldebestätigung finden Sie in der Anlage.',
        'Gleichzeitig entziehe ich Ihnen die Einzugsermächtigung für mein Bankkonto zum Ablauf des Vertrags.'
      ],
      closing: [
        'Ich bitte Sie höflich, mir den Erhalt dieser Kündigung schriftlich zu bestätigen.',
        'Vielen Dank für die gute Zusammenarbeit in den vergangenen Jahren.',
        'Über eine kurze Kündigungsbestätigung mit Enddatum würde ich mich sehr freuen.'
      ],
      signoff: [
        'Mit freundlichen Grüßen'
      ]
    }
  },
  {
    id: 'letter-absence-course',
    title: 'Entschuldigung für das Fehlen im Deutschkurs',
    context: 'Sie besuchen einen DTZ-Integrationskurs bei der Sprachschule und konnten drei Tage lang wegen einer schweren Grippe nicht am Unterricht teilnehmen. Schreiben Sie eine Entschuldigungs-E-Mail an Ihren Kursleiter Herrn Weber.',
    recipientType: 'formal',
    requiredPoints: [
      'Grund für die Abwesenheit (starke Grippe / Erkrankung)',
      'Genaue Dauer des Fehlens (Montag bis Mittwoch)',
      'Ärztliches Attest / Krankschreibung erwähnen',
      'Nach Hausaufgaben und verpasstem Unterrichtsstoff fragen'
    ],
    modelSolution: `Sehr geehrter Herr Weber,

ich schreibe Ihnen, um mich für mein Fehlen im Deutschkurs von Montag bis Mittwoch dieser Woche zu entschuldigen. Ich hatte eine schwere Grippe und der Arzt hat mir strenge Bettruhe verordnet.

Eine ärztliche Arbeitsunfähigkeitsbescheinigung habe ich diesem Schreiben als PDF-Anhang beigefügt.

Ab Donnerstag werde ich wieder regelmäßig am Unterricht teilnehmen. Könnten Sie mir bitte kurz mitteilen, welche Grammatikthemen Sie besprochen haben und welche Hausaufgaben aufzugeben sind?

Vielen Dank für Ihr Verständnis.

Mit freundlichen Grüßen,
[Ihr Vorname Nachname]`,
    suggestedPhrases: {
      salutation: [
        'Sehr geehrter Herr Weber,',
        'Sehr geehrte Frau Kursleiterin,'
      ],
      opening: [
        'ich möchte mich dafür entschuldigen, dass ich diese Woche nicht am Unterricht teilnehmen konnte.',
        'leider war ich von Montag bis Mittwoch krank und konnte den Deutschkurs nicht besuchen.',
        'hiermit reiche ich meine Entschuldigung für die vergangenen drei Kurstage ein.'
      ],
      body: [
        'Wegen eines fieberhaften Infekts musste ich das Bett hüten.',
        'Mein ärztliches Attest sende ich Ihnen anbei als Scan.',
        'Ein Mitschüler hat mir bereits erzählt, dass Sie ein neues Kapitel im Lehrbuch begonnen haben.'
      ],
      closing: [
        'Könnten Sie mir freundlicherweise die Hausaufgaben per E-Mail zusenden?',
        'Ich freue mich darauf, am Donnerstag wieder gesund im Kurs zu sein.',
        'Vielen Dank für Ihre Hilfe und Ihr Entgegenkommen.'
      ],
      signoff: [
        'Mit freundlichen Grüßen',
        'Beste Grüße'
      ]
    }
  },
  {
    id: 'letter-complaint-bill',
    title: 'Reklamation: Falsche Mobilfunkrechnung',
    context: 'Auf Ihrer aktuellen Handyrechnung Ihres Anbieters wurde Ihnen ein Betrag von 45 Euro für ein Drittanbieter-Abo berechnet, das Sie nie bestellt haben. Schreiben Sie eine Beschwerde an den Kundenservice.',
    recipientType: 'formal',
    requiredPoints: [
      'Rechnungsnummer und Kundennummer nennen',
      'Den fehlerhaften Posten (unbekanntes Abonnement über 45 €) reklamieren',
      'Korrektur der Rechnung oder Rückbuchung des Betrags verlangen',
      'Sperrung von Drittanbieter-Diensten (Drittanbietersperre) fordern'
    ],
    modelSolution: `Sehr geehrte Damen und Herren,

ich beziehe mich auf meine aktuelle Mobilfunkrechnung vom 15. Oktober mit der Rechnungsnummer RG-987654 (Kundennummer: KD-112233).

Bei der Durchsicht der Rechnung ist mir aufgefallen, dass ein Betrag in Höhe von 45,00 Euro für ein angebliches Premium-Abonnement abgebucht wurde. Ich habe diesen Dienst niemals bestellt und widerspreche dieser Forderung ausdrücklich.

Ich fordere Sie höflich auf, die fehlerhafte Abrechnung zu korrigieren und mir den zu viel berechneten Betrag auf mein Bankkonto gutzuschreiben.

Des Weiteren bitte ich Sie, ab sofort eine kostenlose Drittanbietersperre für meine Rufnummer einzurichten.

Bitte bestätigen Sie mir den Eingang dieser Reklamation sowie die Durchführung der Gutschrift schriftlich.

Mit freundlichen Grüßen,
[Ihr Vorname Nachname]`,
    suggestedPhrases: {
      salutation: [
        'Sehr geehrte Damen und Herren,',
        'Sehr geehrtes Kundenservice-Team,'
      ],
      opening: [
        'ich wende mich an Sie wegen einer fehlerhaften Position auf meiner aktuellen Monatsrechnung.',
        'ich beziehe mich auf die Rechnung mit der Nummer RG-987654 und lege Widerspruch ein.',
        'leider muss ich eine ungerechtfertigte Abbuchung auf meinem Konto beanstanden.'
      ],
      body: [
        'Auf der Rechnung ist ein Dienst aufgeführt, den ich zu keinem Zeitpunkt in Auftrag gegeben habe.',
        'Da es sich offensichtlich um eine Fehlbuchung handelt, verlange ich die sofortige Erstattung von 45 Euro.',
        'Bitte sperren Sie meine Mobilfunknummer umgehend für sämtliche Drittanbieterdienste.'
      ],
      closing: [
        'Ich setze Ihnen zur Bearbeitung eine Frist von zwei Wochen bis zum 30. Oktober.',
        'Bitte senden Sie mir eine korrigierte Rechnung per E-Mail zu.',
        'Ich danke Ihnen für eine zügige Prüfung meines Anliegens.'
      ],
      signoff: [
        'Mit freundlichen Grüßen'
      ]
    }
  }
];
