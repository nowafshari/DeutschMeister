export interface FormFieldExplanation {
  fieldId: string;
  labelDe: string;
  labelEn: string;
  officialTerm: string;
  plainMeaningDe: string;
  plainMeaningEn: string;
  pitfallWarning?: string;
  exampleValue: string;
  audioPhrase: string;
}

export interface OfficialFormDoc {
  id: string;
  title: string;
  subtitle: string;
  authority: string;
  lawReference: string;
  importance: string;
  fields: FormFieldExplanation[];
}

export interface FormQuizQuestion {
  id: string;
  formId: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const OFFICIAL_FORMS: OfficialFormDoc[] = [
  {
    id: 'anmeldung',
    title: 'Wohnsitzanmeldung (Bürgeramt)',
    subtitle: 'Anmeldung bei der Meldebehörde nach § 17 Bundesmeldegesetz (BMG)',
    authority: 'Bürgeramt / Bürgerbüro / Einwohnermeldeamt',
    lawReference: '§ 17 Abs. 1 Bundesmeldegesetz (BMG)',
    importance: 'Verpflichtend für jeden Umzug in Deutschland innerhalb von 14 Tagen! Ohne Meldebestätigung kein deutsches Bankkonto, keine Steuer-ID und kein Arbeitsbeginn.',
    fields: [
      {
        fieldId: 'anm-01',
        labelDe: 'Familienstand',
        labelEn: 'Marital Status',
        officialTerm: 'Familienstand (ledig, verheiratet, getrennt lebend, geschieden, verwitwet)',
        plainMeaningDe: 'Ihr rechtlicher Beziehungsstatus. Beeinflusst direkt Ihre Steuerklasse (Steuerklasse 1 für Alleinstehende, Steuerklasse 3/4 für Verheiratete).',
        plainMeaningEn: 'Your legal marital status. Directly determines your income tax bracket (Tax Class 1 for singles, Tax Class 3/4/5 for married couples).',
        pitfallWarning: 'Vorsicht bei "getrennt lebend": Wer dauerhaft getrennt von seinem Ehepartner lebt, verliert das steuerliche Ehegattensplitting und wird wie ledig (Steuerklasse 1) besteuert.',
        exampleValue: 'ledig (oder: verheiratet seit 15.04.2021)',
        audioPhrase: 'Der Familienstand bestimmt Ihre Lohnsteuerklasse.'
      },
      {
        fieldId: 'anm-02',
        labelDe: 'Religionsgesellschaft / Kirchensteuer',
        labelEn: 'Religious Affiliation / Church Tax',
        officialTerm: 'Zugehörigkeit zu einer öffentlich-rechtlichen Religionsgesellschaft',
        plainMeaningDe: 'Geben Sie hier Ihre Konfession an (z. B. "ev" für evangelisch, "rk" für römisch-katholisch, "keine" / "ohne Angabe" für konfessionslos).',
        plainMeaningEn: 'Declaration of religious membership (e.g., ev for Protestant, rk for Catholic, or keine / without affiliation).',
        pitfallWarning: 'Wichtige Kostenfalle: Wer "rk" oder "ev" angibt, zahlt automatisch 8% bis 9% Kirchensteuer als Zuschlag auf die Einkommensteuer direkt vom Bruttogehalt abgezogen! Wer nicht Mitglied der deutschen Amtskirche ist, trägt "keine" ein.',
        exampleValue: 'keine (oder: ohne Angabe)',
        audioPhrase: 'Die Religionsgemeinschaft entscheidet über die Kirchensteuerpflicht.'
      },
      {
        fieldId: 'anm-03',
        labelDe: 'Einzugsdatum',
        labelEn: 'Move-in Date',
        officialTerm: 'Tag des tatsächlichen Einzugs in die Wohnung',
        plainMeaningDe: 'Das genaue Datum, an dem Sie die Wohnung tatsächlich bezogen haben (muss mit der Wohnungsgeberbestätigung übereinstimmen).',
        plainMeaningEn: 'The exact calendar day you moved into the apartment (must match the landlord certificate).',
        pitfallWarning: 'Frist von 14 Tagen beachten: Laut § 17 BMG müssen Sie sich innerhalb von zwei Wochen nach Einzug anmelden. Bei Verspätung drohen empfindliche Bußgelder bis zu 1.000 Euro!',
        exampleValue: '01.10.2026',
        audioPhrase: 'Das Einzugsdatum muss exakt mit der Vermieterbescheinigung übereinstimmen.'
      },
      {
        fieldId: 'anm-04',
        labelDe: 'Wohnungsstatus',
        labelEn: 'Apartment Status (Primary vs. Secondary Residence)',
        officialTerm: 'Alleinige Wohnung / Hauptwohnung / Nebenwohnung',
        plainMeaningDe: 'Alleinige Wohnung: Ihre einzige Wohnung in Deutschland. Hauptwohnung: Ihr Lebensmittelpunkt bei mehreren Wohnungen. Nebenwohnung: Zweitwohnsitz.',
        plainMeaningEn: 'Sole flat: your only residence. Primary flat: your main center of vital interest. Secondary flat: second home.',
        pitfallWarning: 'Kostenfalle Zweitwohnsitzsteuer: Wer eine Nebenwohnung anmeldet, muss in vielen Großstädten (wie Berlin, Hamburg, München, Düsseldorf) eine Zweitwohnsitzsteuer von 10% bis 15% der Nettokaltmiete zahlen!',
        exampleValue: 'Alleinige Wohnung',
        audioPhrase: 'Die Hauptwohnung ist der vorwiegend benutzte Wohnsitz der Person.'
      },
      {
        fieldId: 'anm-05',
        labelDe: 'Bisherige Wohnung',
        labelEn: 'Previous Residence Address',
        officialTerm: 'Bisherige Wohnung (im Inland / Zuzug aus dem Ausland)',
        plainMeaningDe: 'Ihre vorherige Meldeadresse. Wenn Sie neu nach Deutschland kommen, kreuzen Sie "Zuzug aus dem Ausland" an und nennen das Herkunftsland.',
        plainMeaningEn: 'Your previous registered address. If newly relocating to Germany, tick "Relocated from abroad" and specify your country of origin.',
        exampleValue: 'Zuzug aus dem Ausland (z. B. Italien / Indien)',
        audioPhrase: 'Beim Zuzug aus dem Ausland wird die bisherige Adresse im Heimatland vermerkt.'
      },
      {
        fieldId: 'anm-06',
        labelDe: 'Ausweisdokument & Behörde',
        labelEn: 'Identity Document & Issuing Authority',
        officialTerm: 'Seriennummer des Passes / Personalausweises & Ausstellungsbehörde',
        plainMeaningDe: 'Reisepassnummer, Ausstellungsdatum und Gültigkeitsdauer Ihres gültigen Nationalpasses.',
        plainMeaningEn: 'Passport serial number, date of issue, and validity period of your current national passport.',
        pitfallWarning: 'Der Reisepass muss am Tag der Anmeldung zwingend noch gültig sein. Ein abgelaufener Ausweis wird vom Sachbearbeiter abgelehnt.',
        exampleValue: 'Reisepass Nr. C12345678, ausgestellt am 12.03.2022',
        audioPhrase: 'Bitte legen Sie Ihren gültigen Reisepass im Original vor.'
      }
    ]
  },
  {
    id: 'wohnungsgeber',
    title: 'Wohnungsgeberbestätigung (§ 19 BMG)',
    subtitle: 'Vermieterbescheinigung zur Vorlage bei der Meldebehörde',
    authority: 'Vom Vermieter / Eigentümer / Hauptmieter auszufüllen',
    lawReference: '§ 19 Abs. 3 Bundesmeldegesetz (BMG)',
    importance: 'Ohne dieses Dokument verweigert das Bürgeramt Ihre Anmeldung! Seit 2015 ist der Vermieter gesetzlich verpflichtet, diese Bestätigung innerhalb von 2 Wochen nach Einzug auszustellen.',
    fields: [
      {
        fieldId: 'wgb-01',
        labelDe: 'Name & Anschrift des Wohnungsgebers',
        labelEn: 'Landlord / Provider Name & Address',
        officialTerm: 'Name und Anschrift des Wohnungsgebers (Vermieter / Hausverwaltung / Hauptmieter)',
        plainMeaningDe: 'Die Person oder Firma, die Ihnen die Wohnung zur Nutzung überlässt. Bei einer Untermiete (WG) ist der Hauptmieter der Wohnungsgeber!',
        plainMeaningEn: 'The person or entity granting you use of the flat. In a sublease / WG room, the primary tenant acts as Wohnungsgeber!',
        pitfallWarning: 'Wichtig: Ein Mietvertrag allein reicht beim Bürgeramt NICHT aus! Sie benötigen zwingend dieses gesonderte Formular mit Originalunterschrift.',
        exampleValue: 'Immobilienverwaltung Haus & Grund GmbH, Rheinstraße 10, 40213 Düsseldorf',
        audioPhrase: 'Der Wohnungsgeber ist gesetzlich zur Ausstellung der Bescheinigung verpflichtet.'
      },
      {
        fieldId: 'wgb-02',
        labelDe: 'Lage der Wohnung im Gebäude',
        labelEn: 'Exact Location of Flat in Building',
        officialTerm: 'Genaue Bezeichnung der Wohnung (Stockwerk, Lage, Wohnungsnummer)',
        plainMeaningDe: 'Genaue Position im Haus, z. B. "3. Obergeschoss links" oder "Dachgeschoss rechts, Wohnungs-Nr. 14".',
        plainMeaningEn: 'Precise location within the building, e.g., 3rd floor on the left, or attic unit 14.',
        exampleValue: '2. Obergeschoss links, Wohnung Nr. 08',
        audioPhrase: 'Die genaue Lage der Wohnung im Haus muss angegeben werden.'
      },
      {
        fieldId: 'wgb-03',
        labelDe: 'Eigentümer der Wohnung',
        labelEn: 'Property Owner (if different from landlord)',
        officialTerm: 'Eigentümer der Wohnung (nur auszufüllen, wenn nicht mit Wohnungsgeber identisch)',
        plainMeaningDe: 'Gehört die Wohnung einer dritten Person (z. B. bei Verwaltung durch eine Hausverwaltung oder bei Untervermietung), muss hier der eigentliche Eigentümer genannt werden.',
        plainMeaningEn: 'If the flat belongs to an owner managed by a separate agency or sublet, the legal owner must be declared here.',
        exampleValue: 'Dr. Michael Hansen, Berliner Allee 45, Düsseldorf',
        audioPhrase: 'Der Eigentümer der Immobilie ist getrennt vom Verwalter aufzuführen.'
      },
      {
        fieldId: 'wgb-04',
        labelDe: 'Haftungsbelehrung (§ 19 Abs. 6 BMG)',
        labelEn: 'Liability & Fake Registration Warning',
        officialTerm: 'Bestätigung des tatsächlichen Einzugs unter Bußgeldandrohung',
        plainMeaningDe: 'Der Vermieter bestätigt verbindlich, dass die genannten Personen tatsächlich eingezogen sind. Eine Scheinanmeldung ("Gefälligkeitsanmeldung") ist eine Straftat!',
        plainMeaningEn: 'The landlord formally confirms actual move-in. Bogus registrations for friends carry severe criminal penalties.',
        pitfallWarning: 'Strafe bis zu 50.000 Euro: Wer einer Person eine Wohnanschrift anbietet, ohne dass diese dort tatsächlich wohnt (Scheinanmeldung), riskiert bis zu 50.000 Euro Bußgeld.',
        exampleValue: 'Ich bestätige mit meiner Unterschrift die Richtigkeit der Angaben.',
        audioPhrase: 'Eine Scheinanmeldung kann mit einem Bußgeld von bis zu fünfzigtausend Euro geahndet werden.'
      }
    ]
  },
  {
    id: 'niederlassung',
    title: 'Antrag auf Niederlassungserlaubnis (§ 18c AufenthG)',
    subtitle: 'Unbefristeter Aufenthaltstitel für Fachkräfte und Inhaber der Blauen Karte EU',
    authority: 'Ausländerbehörde / Landesamt für Einwanderung (LEA)',
    lawReference: '§ 18c Aufenthaltsgesetz (AufenthG)',
    importance: 'Das begehrteste Dokument für Fachkräfte: Dauerhaftes, unkündbares Aufenthaltsrecht in Deutschland unabhängig vom Arbeitgeber.',
    fields: [
      {
        fieldId: 'nl-01',
        labelDe: 'Art des aktuellen Aufenthaltstitels',
        labelEn: 'Current Residence Permit Type',
        officialTerm: 'Aktuelle Rechtsgrundlage des Aufenthalts (z. B. Blaue Karte EU nach § 18g AufenthG)',
        plainMeaningDe: 'Mit welchem Visum/Titel Sie derzeit in Deutschland leben. Blaue-Karte-Inhaber haben die schnellsten Fristen (21 Monate mit B1-Deutsch, sonst 27 Monate).',
        plainMeaningEn: 'Current legal basis. EU Blue Card holders enjoy the fastest path to permanent residency (21 months with B1 German, or 27 months with basic A1).',
        exampleValue: 'Blaue Karte EU gem. § 18g AufenthG seit Mai 2024',
        audioPhrase: 'Inhaber der Blauen Karte EU können bereits nach einundzwanzig Monaten die Niederlassungserlaubnis beantragen.'
      },
      {
        fieldId: 'nl-02',
        labelDe: 'Nachweis der Alterssicherung (Rente)',
        labelEn: 'Proof of Pension Contributions',
        officialTerm: 'Wartezeitauskunft der Deutschen Rentenversicherung (DRV)',
        plainMeaningDe: 'Nachweis, dass Sie mindestens 21, 27 oder 36 Monate lang Pflichtbeiträge in die gesetzliche Rentenversicherung eingezahlt haben.',
        plainMeaningEn: 'Official certificate from Deutsche Rentenversicherung proving required months of mandatory pension contributions.',
        pitfallWarning: 'Unbedingt rechtzeitig anfordern: Die Wartezeitauskunft muss per Post bei der Deutschen Rentenversicherung angefordert werden und dauert ca. 2 bis 3 Wochen.',
        exampleValue: 'Versicherungsverlauf der DRV mit 24 Beitragsmonaten',
        audioPhrase: 'Die Wartezeitauskunft der Rentenversicherung belegt Ihre Pflichtbeitragszeiten.'
      },
      {
        fieldId: 'nl-03',
        labelDe: 'Sprachzertifikat (Deutschkenntnisse)',
        labelEn: 'German Language Certificate',
        officialTerm: 'Nachweis ausreichender Kenntnisse der deutschen Sprache',
        plainMeaningDe: 'Offizielles anerkanntes Zertifikat: DTZ (Deutsch-Test für Zuwanderer) Niveau B1 (oder Goethe/telc B1).',
        plainMeaningEn: 'Official accredited language certificate: DTZ (Deutsch-Test für Zuwanderer) Level B1 (or telc/Goethe B1).',
        pitfallWarning: 'Teilnahmebescheinigungen von Sprachkursen reichen NICHT aus! Die Ausländerbehörde akzeptiert nur bestandene Prüfungszertifikate von telc, Goethe oder DTZ/g.a.s.t.',
        exampleValue: 'DTZ-Zertifikat Deutsch B1 (Gesamtprädikat: B1)',
        audioPhrase: 'Ein anerkanntes B1-Zertifikat wie der Deutsch-Test für Zuwanderer ist erforderlich.'
      },
      {
        fieldId: 'nl-04',
        labelDe: 'Sicherung des Lebensunterhalts',
        labelEn: 'Proof of Secure Livelihood',
        officialTerm: 'Erklärung über keine Inanspruchnahme öffentlicher Mittel',
        plainMeaningDe: 'Sie und Ihre Familie dürfen kein Bürgergeld (früher Hartz IV) oder Sozialhilfe beziehen. Ihr Gehalt muss Miete und Lebenshaltung vollständig decken.',
        plainMeaningEn: 'You must prove sufficient income without relying on government welfare benefits (Bürgergeld).',
        exampleValue: 'Gehaltsabrechnungen der letzten 3 Monate + Bestätigung des Arbeitgebers',
        audioPhrase: 'Der Lebensunterhalt muss aus eigenen Erwerbseinkünften bestritten werden.'
      },
      {
        fieldId: 'nl-05',
        labelDe: 'Ausreichender Wohnraum',
        labelEn: 'Sufficient Living Space',
        officialTerm: 'Wohnraumnachweis (Mietvertrag + Wohnflächenberechnung in qm)',
        plainMeaningDe: 'In Deutschland gilt: Mindestens 12 Quadratmeter Wohnfläche pro erwachsener Person (und 10 qm für Kinder zwischen 2 und 6 Jahren).',
        plainMeaningEn: 'Legal minimum requirement: at least 12 square meters per adult living in the apartment.',
        exampleValue: 'Mietvertrag über 68 qm für 2 Personen',
        audioPhrase: 'Für jede erwachsene Person müssen mindestens zwölf Quadratmeter Wohnfläche zur Verfügung stehen.'
      }
    ]
  }
];

export const FORM_QUIZ_QUESTIONS: FormQuizQuestion[] = [
  {
    id: 'fq-01',
    formId: 'anmeldung',
    question: 'Welche Frist gilt gesetzlich für die Wohnsitzanmeldung nach dem Einzug in Deutschland?',
    options: [
      { id: 'a', text: 'Innerhalb von 24 Stunden am selben Tag.', isCorrect: false, explanation: 'Zu kurz, 24 Stunden ist nicht die gesetzliche Frist.' },
      { id: 'b', text: 'Innerhalb von 14 Tagen (zwei Wochen).', isCorrect: true, explanation: 'Richtig! Gemäß § 17 BMG müssen Sie sich innerhalb von zwei Wochen nach tatsächlichem Einzug anmelden.' },
      { id: 'c', text: 'Bis zum Ende des jeweiligen Kalenderjahres.', isCorrect: false, explanation: 'Viel zu spät! Nach einem Monat drohen bereits Bußgelder.' },
      { id: 'd', text: 'Erst nach Ablauf der 6-monatigen Probezeit.', isCorrect: false, explanation: 'Die Anmeldung ist sofort fällig und unabhängig vom Arbeitsvertrag.' }
    ]
  },
  {
    id: 'fq-02',
    formId: 'anmeldung',
    question: 'Was passiert, wenn Sie im Anmeldeformular bei Religionsgesellschaft "rk" oder "ev" eintragen?',
    options: [
      { id: 'a', text: 'Sie erhalten automatisch freie Tage an allen kirchlichen Feiertagen.', isCorrect: false, explanation: 'Feiertage gelten für alle Arbeitnehmer im jeweiligen Bundesland.' },
      { id: 'b', text: 'Vom monatlichen Bruttogehalt werden automatisch 8% bis 9% Kirchensteuer abgezogen.', isCorrect: true, explanation: 'Richtig! Das Finanzamt zieht die Kirchensteuer direkt über die elektronische Lohnsteuerkarte (ELStAM) ein.' },
      { id: 'c', text: 'Die Miete für die Wohnung wird um 10% rabattiert.', isCorrect: false, explanation: 'Die Miete hat keinerlei Bezug zur Konfession.' },
      { id: 'd', text: 'Sie müssen verpflichtend jeden Sonntag den Gottesdienst besuchen.', isCorrect: false, explanation: 'Kirchenbesuch ist freiwillig, aber die Kirchensteuer ist gesetzlich verpflichtend.' }
    ]
  },
  {
    id: 'fq-03',
    formId: 'wohnungsgeber',
    question: 'Wer muss die Wohnungsgeberbestätigung (§ 19 BMG) ausfüllen und unterschreiben?',
    options: [
      { id: 'a', text: 'Der Mieter selbst mit zwei Zeugen.', isCorrect: false, explanation: 'Der Mieter kann sich die Wohnung nicht selbst bestätigen!' },
      { id: 'b', text: 'Der Vermieter, die Hausverwaltung oder der Hauptmieter bei Untermiete.', isCorrect: true, explanation: 'Richtig! Derjenige, der den Wohnraum zur Verfügung stellt (Wohnungsgeber), muss unterschreiben.' },
      { id: 'c', text: 'Die Polizei oder das Einwohnermeldeamt.', isCorrect: false, explanation: 'Das Amt empfängt das Dokument nur, stellt es aber nicht aus.' },
      { id: 'd', text: 'Der Makler, der die Wohnung vermittelt hat.', isCorrect: false, explanation: 'Makler sind keine Wohnungsgeber.' }
    ]
  },
  {
    id: 'fq-04',
    formId: 'wohnungsgeber',
    question: 'Was versteht man unter einer sogenannten "Scheinanmeldung" und welche Strafe droht?',
    options: [
      { id: 'a', text: 'Eine Anmeldung mit vorläufigem Reisepass; Strafe: 50 Euro.', isCorrect: false, explanation: 'Vorläufige Pässe sind legal.' },
      { id: 'b', text: 'Man meldet eine Wohnanschrift an, ohne dort tatsächlich zu wohnen; Bußgeld bis zu 50.000 Euro.', isCorrect: true, explanation: 'Richtig! § 19 Abs. 6 BMG verbietet Scheinadressen strikt mit Bußgeldern bis zu 50.000 €.' },
      { id: 'c', text: 'Die Anmeldung eines Haustieres; Strafe: Verwarnung.', isCorrect: false, explanation: 'Haustiere haben mit § 19 BMG nichts zu tun.' },
      { id: 'd', text: 'Das Anbringen eines falschen Namens am Klingelschild; Strafe: Hausverbot.', isCorrect: false, explanation: 'Scheinanmeldung bedeutet Vortäuschung eines Wohnsitzes beim Amt.' }
    ]
  },
  {
    id: 'fq-05',
    formId: 'niederlassung',
    question: 'Nach wie vielen Monaten mit B1-Deutschzertifikat können Inhaber der Blauen Karte EU die Niederlassungserlaubnis beantragen?',
    options: [
      { id: 'a', text: 'Erst nach 60 Monaten (5 Jahre).', isCorrect: false, explanation: '60 Monate gilt für den regulären Aufenthaltstitel, nicht für Blaue Karte.' },
      { id: 'b', text: 'Bereits nach 21 Monaten.', isCorrect: true, explanation: 'Richtig! Nach § 18c Abs. 2 AufenthG reichen Fachkräften mit Blauer Karte EU 21 Monate Beschäftigung + B1-Deutsch.' },
      { id: 'c', text: 'Sofort am ersten Tag nach der Einreise.', isCorrect: false, explanation: 'Ein Mindestbeitrag zur Rentenversicherung ist erforderlich.' },
      { id: 'd', text: 'Nach 36 Monaten ohne Deutschkenntnisse.', isCorrect: false, explanation: 'Mit B1 Deutsch sind es nur 21 Monate!' }
    ]
  },
  {
    id: 'fq-06',
    formId: 'anmeldung',
    question: 'Was ist der Unterschied zwischen "Hauptwohnung" und "Nebenwohnung"?',
    options: [
      { id: 'a', text: 'Hauptwohnung ist die Eigentumswohnung, Nebenwohnung ist immer gemietet.', isCorrect: false, explanation: 'Eigentum spielt keine Rolle.' },
      { id: 'b', text: 'Hauptwohnung ist der Mittelpunkt der Lebensinteressen; Nebenwohnungen können der Zweitwohnsitzsteuer unterliegen.', isCorrect: true, explanation: 'Richtig! Hauptwohnung ist dort, wo man sich überwiegend aufhält; für Nebenwohnungen fordern viele Städte 10-15% Zweitwohnsitzsteuer.' },
      { id: 'c', text: 'In einer Nebenwohnung darf man keine Möbel aufstellen.', isCorrect: false, explanation: 'Vollkommen falsch.' },
      { id: 'd', text: 'Eine Nebenwohnung benötigt keine Wohnungsgeberbestätigung.', isCorrect: false, explanation: 'Jede Wohnung benötigt eine Wohnungsgeberbestätigung.' }
    ]
  }
];
