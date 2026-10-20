export interface ListeningOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface ListeningScenario {
  id: string;
  category: 'transit' | 'doctor' | 'bureaucracy' | 'everyday' | 'news';
  categoryLabel: string;
  level: 'A2' | 'B1';
  title: string;
  speaker: string;
  audioText: string;
  question: string;
  options: ListeningOption[];
  transcriptDe: string;
  transcriptEn: string;
  examTip: string;
  keyWords: string[];
}

export const LISTENING_SCENARIOS: ListeningScenario[] = [
  {
    id: 'listen-01',
    category: 'transit',
    categoryLabel: 'Bahn & Gleisansage',
    level: 'A2',
    title: 'Gleiswechsel und Verspätung am Hauptbahnhof',
    speaker: 'Lautsprecherdurchsage der Deutschen Bahn',
    audioText: 'Achtung an Gleis 2! Der Intercity-Express 724 nach München Hauptbahnhof, planmäßige Abfahrt um 14 Uhr 15, hat heute voraussichtlich 25 Minuten Verspätung. Grund dafür ist eine behobene technische Störung am Triebfahrzeug. Bitte beachten Sie: Dieser Zug fährt heute abweichend von Gleis 6 ein! Ich wiederhole: ICE 724 nach München heute von Gleis 6!',
    question: 'Was müssen die Fahrgäste nach München beachten?',
    options: [
      { id: 'a', text: 'Der Zug fällt heute ersatzlos aus.', isCorrect: false, explanation: 'Der Zug fällt nicht aus, er hat 25 Minuten Verspätung.' },
      { id: 'b', text: 'Der Zug fährt abweichend von Gleis 6 ab.', isCorrect: true, explanation: 'Richtig! Die Durchsage sagt klar: "Dieser Zug fährt heute abweichend von Gleis 6 ein".' },
      { id: 'c', text: 'Der Zug fährt pünktlich von Gleis 2 ab.', isCorrect: false, explanation: 'Falsch, er hat 25 Minuten Verspätung und wechselt das Gleis.' },
      { id: 'd', text: 'Alle Sitzplatzreservierungen wurden storniert.', isCorrect: false, explanation: 'Davon wird in der Durchsage nichts gesagt.' }
    ],
    transcriptDe: 'Achtung an Gleis 2! Der Intercity-Express 724 nach München Hauptbahnhof, planmäßige Abfahrt um 14:15 Uhr, hat heute voraussichtlich 25 Minuten Verspätung. Grund dafür ist eine behobene technische Störung am Triebfahrzeug. Bitte beachten Sie: Dieser Zug fährt heute abweichend von Gleis 6 ein! Ich wiederhole: ICE 724 nach München heute von Gleis 6!',
    transcriptEn: 'Attention at platform 2! Intercity-Express 724 to Munich Central Station, scheduled departure at 14:15, currently has an expected 25-minute delay today. The reason is a resolved technical issue on the locomotive. Please note: This train arrives today departing from platform 6! I repeat: ICE 724 to Munich today from platform 6!',
    examTip: 'Signalwörter bei Bahn-Durchsagen: "abweichend" (different/exception), "Gleiswechsel" (track change), "Verspätung" (delay). Notieren Sie sich Zahlen und Gleisnummern sofort!',
    keyWords: ['planmäßige Abfahrt', 'die Verspätung', 'abweichend von Gleis', 'die Störung']
  },
  {
    id: 'listen-02',
    category: 'doctor',
    categoryLabel: 'Arztpraxis & Anrufbeantworter',
    level: 'A2',
    title: 'Rückruf der Hausarztpraxis Dr. Becker',
    speaker: 'Anrufbeantworter der Praxis',
    audioText: 'Guten Tag, Herr Müller! Hier ist die Gemeinschaftspraxis Dr. Becker. Wir rufen an wegen Ihrer Blutuntersuchung von letzter Woche. Die Laborergebnisse liegen nun vor. Frau Doktor Becker möchte die Werte kurz persönlich mit Ihnen besprechen. Wir haben für Sie einen Termin am kommenden Donnerstag um 11 Uhr 30 reserviert. Bitte denken Sie daran, Ihre elektronische Gesundheitskarte mitzubringen. Falls Sie den Termin nicht wahrnehmen können, rufen Sie uns bitte kurz zurück. Auf Wiederhören!',
    question: 'Was soll der Patient zum Termin mitbringen?',
    options: [
      { id: 'a', text: 'Einen Überweisungsschein vom Kardiologen.', isCorrect: false, explanation: 'Die Praxis hat nicht nach einer Überweisung gefragt.' },
      { id: 'b', text: 'Seine elektronische Gesundheitskarte.', isCorrect: true, explanation: 'Richtig! "Bitte denken Sie daran, Ihre elektronische Gesundheitskarte mitzubringen."' },
      { id: 'c', text: 'Bargeld für die Laborgebühr.', isCorrect: false, explanation: 'Gesetzliche Kassenuntersuchungen verlangen vor Ort kein Bargeld.' },
      { id: 'd', text: 'Einen neuen Impfpass.', isCorrect: false, explanation: 'Der Impfpass wurde nicht erwähnt.' }
    ],
    transcriptDe: 'Guten Tag, Herr Müller! Hier ist die Gemeinschaftspraxis Dr. Becker. Wir rufen an wegen Ihrer Blutuntersuchung von letzter Woche. Die Laborergebnisse liegen nun vor. Frau Doktor Becker möchte die Werte kurz persönlich mit Ihnen besprechen. Wir haben für Sie einen Termin am kommenden Donnerstag um 11:30 Uhr reserviert. Bitte denken Sie daran, Ihre elektronische Gesundheitskarte mitzubringen. Falls Sie den Termin nicht wahrnehmen können, rufen Sie uns bitte kurz zurück. Auf Wiederhören!',
    transcriptEn: 'Hello, Mr. Müller! This is Dr. Becker\'s joint medical practice. We are calling regarding your blood test from last week. The lab results are now available. Dr. Becker would like to discuss the values briefly in person with you. We reserved an appointment for you next Thursday at 11:30 AM. Please remember to bring your electronic health insurance card. If you cannot make the appointment, please give us a quick call back. Goodbye!',
    examTip: 'In DTZ Hören Teil 1 (Nachrichten auf dem Anrufbeantworter) wird häufig nach dem Grund des Anrufs ("Warum ruft die Person an?") oder einer Handlungsanweisung ("Was soll der Angerufene tun?") gefragt.',
    keyWords: ['die Blutuntersuchung', 'die Laborergebnisse', 'die Gesundheitskarte', 'einen Termin wahrnehmen']
  },
  {
    id: 'listen-03',
    category: 'everyday',
    categoryLabel: 'Supermarkt & Durchsage',
    level: 'A2',
    title: 'Sonderangebot im Supermarkt',
    speaker: 'Supermarkt-Kundendurchsage',
    audioText: 'Liebe Kundinnen und Kunden! Herzlich willkommen in Ihrem Frischemarkt. Wir öffnen ab sofort Kasse 4 für Sie. Außerdem haben wir heute ein exklusives Feierabend-Angebot: An unserer Frischetheke erhalten Sie ab jetzt 30 Prozent Rabatt auf alle Bio-Käsesorten und frischen Aufschnitt. Das Angebot gilt nur heute bis zum Ladenschluss um 21 Uhr. Wir wünschen Ihnen einen angenehmen Einkauf!',
    question: 'Worauf gibt es heute 30 Prozent Rabatt?',
    options: [
      { id: 'a', text: 'Auf alle Obst- und Gemüsesorten.', isCorrect: false, explanation: 'Gemüse ist nicht rabattiert.' },
      { id: 'b', text: 'Auf Bio-Käse und frischen Aufschnitt.', isCorrect: true, explanation: 'Richtig: "30 Prozent Rabatt auf alle Bio-Käsesorten und frischen Aufschnitt".' },
      { id: 'c', text: 'Auf sämtliche Getränkekisten.', isCorrect: false, explanation: 'Getränke wurden nicht erwähnt.' },
      { id: 'd', text: 'Nur auf Tiefkühlwaren an Kasse 4.', isCorrect: false, explanation: 'Kasse 4 öffnet nur, der Rabatt gilt an der Frischetheke.' }
    ],
    transcriptDe: 'Liebe Kundinnen und Kunden! Herzlich willkommen in Ihrem Frischemarkt. Wir öffnen ab sofort Kasse 4 für Sie. Außerdem haben wir heute ein exklusives Feierabend-Angebot: An unserer Frischetheke erhalten Sie ab jetzt 30 Prozent Rabatt auf alle Bio-Käsesorten und frischen Aufschnitt. Das Angebot gilt nur heute bis zum Ladenschluss um 21 Uhr. Wir wünschen Ihnen einen angenehmen Einkauf!',
    transcriptEn: 'Dear customers! Welcome to your fresh market. We are opening checkout 4 immediately for you. Furthermore, we have an exclusive after-work special today: At our deli counter you receive from now on 30 percent discount on all organic cheeses and fresh cold cuts. The offer is valid only today until closing time at 9:00 PM. We wish you pleasant shopping!',
    examTip: 'Hören Sie genau hin, welcher Bereich angesprochen wird: Kasse 4 öffnet zwar, aber der Rabatt gilt an der Frischetheke für Bio-Käse.',
    keyWords: ['die Frischetheke', 'der Rabatt', 'Bio-Käsesorten', 'der Ladenschluss']
  },
  {
    id: 'listen-04',
    category: 'bureaucracy',
    categoryLabel: 'Wohnen & Hausmeister',
    level: 'A2',
    title: 'Wartungsarbeiten im Mietshaus',
    speaker: 'Anrufbeantworter des Hausmeisters',
    audioText: 'Hallo Herr Schmidt, hier ist Kowalski, der Hausmeister. Ich rufe wegen der angekündigten Arbeiten an der Heizungsanlage an. Am kommenden Mittwoch, den 18. Oktober, müssen wir zwischen 9 Uhr morgens und 13 Uhr das Warmwasser und die Heizung komplett abstellen. Bitte drehen Sie während dieser Zeit alle Thermostate an den Heizkörpern ganz zu und lassen Sie keine Wasserhähne geöffnet. Ab 13 Uhr sollte wieder alles einwandfrei funktionieren. Vielen Dank für Ihr Verständnis!',
    question: 'Was passiert am kommenden Mittwoch?',
    options: [
      { id: 'a', text: 'Der Aufzug wird den ganzen Tag gereinigt.', isCorrect: false, explanation: 'Der Aufzug wird nicht gereinigt.' },
      { id: 'b', text: 'Warmwasser und Heizung werden von 9 bis 13 Uhr abgestellt.', isCorrect: true, explanation: 'Richtig: "zwischen 9 Uhr morgens und 13 Uhr das Warmwasser und die Heizung komplett abstellen".' },
      { id: 'c', text: 'Die Mülltonnen werden früher geleert.', isCorrect: false, explanation: 'Kein Müllthema.' },
      { id: 'd', text: 'Der Mietvertrag wird gekündigt.', isCorrect: false, explanation: 'Es geht lediglich um Heizungs- und Wasserwartung.' }
    ],
    transcriptDe: 'Hallo Herr Schmidt, hier ist Kowalski, der Hausmeister. Ich rufe wegen der angekündigten Arbeiten an der Heizungsanlage an. Am kommenden Mittwoch, den 18. Oktober, müssen wir zwischen 9 Uhr morgens und 13 Uhr das Warmwasser und die Heizung komplett abstellen. Bitte drehen Sie während dieser Zeit alle Thermostate an den Heizkörpern ganz zu und lassen Sie keine Wasserhähne geöffnet. Ab 13 Uhr sollte wieder alles einwandfrei funktionieren. Vielen Dank für Ihr Verständnis!',
    transcriptEn: 'Hello Mr. Schmidt, this is Kowalski, the caretaker. I am calling regarding the announced work on the heating system. Next Wednesday, October 18, we must turn off hot water and heating completely between 9:00 AM and 1:00 PM. Please turn all radiator thermostats completely closed during this period and do not leave any water faucets open. From 1:00 PM everything should function flawlessly again. Thank you for your understanding!',
    examTip: 'Achten Sie auf Zeitangaben: "von ... bis" (from ... to) und Handlungsaufforderungen ("drehen Sie zu", "lassen Sie keine geöffnet").',
    keyWords: ['die Wartungsarbeiten', 'das Warmwasser abstellen', 'die Thermostate zudrehen', 'der Hausmeister']
  },
  {
    id: 'listen-05',
    category: 'everyday',
    categoryLabel: 'Post & Paketdienst',
    level: 'A2',
    title: 'Paketzustellung verpasst',
    speaker: 'Sprachnachricht Paketbote',
    audioText: 'Hallo! Hier ist Ihr DHL-Zusteller. Ich habe gerade versucht, Ihr Paket zuzustellen, aber leider hat bei Ihnen im zweiten Stock niemand geöffnet. Auch bei den Nachbarn war niemand zu Hause. Ich habe Ihre Sendung nun in die Postfiliale in der Poststraße 14 gebracht. Sie können das Paket ab morgen, Dienstag, um 10 Uhr morgens dort abholen. Bitte bringen Sie Ihren gültigen Ausweis und den Benachrichtigungsschein aus Ihrem Briefkasten mit!',
    question: 'Wann und wo kann das Paket abgeholt werden?',
    options: [
      { id: 'a', text: 'Heute Abend direkt beim Nachbarn im ersten Stock.', isCorrect: false, explanation: 'Niemand bei den Nachbarn war da.' },
      { id: 'b', text: 'Ab morgen um 10 Uhr in der Postfiliale in der Poststraße.', isCorrect: true, explanation: 'Richtig: "in die Postfiliale in der Poststraße 14... ab morgen, Dienstag, um 10 Uhr".' },
      { id: 'c', text: 'An der automatischen Packstation am Bahnhof.', isCorrect: false, explanation: 'Es wurde in die Filiale gebracht, nicht an die Packstation.' },
      { id: 'd', text: 'Das Paket wird an den Absender zurückgeschickt.', isCorrect: false, explanation: 'Es wird erst 7 Tage in der Filiale zur Abholung aufbewahrt.' }
    ],
    transcriptDe: 'Hallo! Hier ist Ihr DHL-Zusteller. Ich habe gerade versucht, Ihr Paket zuzustellen, aber leider hat bei Ihnen im zweiten Stock niemand geöffnet. Auch bei den Nachbarn war niemand zu Hause. Ich habe Ihre Sendung nun in die Postfiliale in der Poststraße 14 gebracht. Sie können das Paket ab morgen, Dienstag, um 10 Uhr morgens dort abholen. Bitte bringen Sie Ihren gültigen Ausweis und den Benachrichtigungsschein aus Ihrem Briefkasten mit!',
    transcriptEn: 'Hello! This is your DHL delivery driver. I just tried to deliver your package, but unfortunately nobody opened the door on the second floor. Nobody was home at the neighbors\' either. I have now taken your parcel to the post branch at Poststraße 14. You can pick up the package there starting tomorrow, Tuesday, at 10:00 AM. Please bring your valid ID and the notification slip from your mailbox!',
    examTip: 'Häufige DTZ-Frage: Was muss man mitnehmen? ("Ausweis und Benachrichtigungsschein") und Wo ist das Paket? ("in der Postfiliale").',
    keyWords: ['die Paketzustellung', 'die Postfiliale', 'der Benachrichtigungsschein', 'der gültige Ausweis']
  },
  {
    id: 'listen-06',
    category: 'news',
    categoryLabel: 'Verkehrsfunk & Radio',
    level: 'B1',
    title: 'Verkehrswarnung auf der Autobahn A3',
    speaker: 'Radiosprecher (WDR Verkehrsservice)',
    audioText: 'Der WDR-Verkehrsservice mit aktuellen Meldungen für Nordrhein-Westfalen: Auf der Autobahn A3 Köln Richtung Frankfurt gibt es zwischen Kreuz Breitscheid und Mettmann derzeit 8 Kilometer stockenden Verkehr und Stau wegen einer ungesicherten Unfallstelle. Der Zeitverlust beträgt mindestens 40 Minuten. Wir empfehlen Autofahrern, das Gebiet weiträumig zu umfahren oder ab dem Kreuz Ratingen-Ost die ausgeschilderte Umleitungsstrecke U12 zu nutzen. Fahren Sie bitte vorsichtig!',
    question: 'Welche Empfehlung gibt der Verkehrsservice für die A3?',
    options: [
      { id: 'a', text: 'Auf dem Seitenstreifen anhalten und warten.', isCorrect: false, explanation: 'Der Seitenstreifen ist nur für Pannen da!' },
      { id: 'b', text: 'Das Gebiet umfahren oder die Umleitung U12 nutzen.', isCorrect: true, explanation: 'Richtig: "das Gebiet weiträumig zu umfahren oder... die ausgeschilderte Umleitungsstrecke U12 zu nutzen".' },
      { id: 'c', text: 'Die Geschwindigkeit auf 130 km/h erhöhen.', isCorrect: false, explanation: 'Bei Stau und Unfällen muss man vorsichtig und langsam fahren.' },
      { id: 'd', text: 'Die Fahrt sofort abbrechen.', isCorrect: false, explanation: 'Es wird lediglich eine Umleitung empfohlen.' }
    ],
    transcriptDe: 'Der WDR-Verkehrsservice mit aktuellen Meldungen für Nordrhein-Westfalen: Auf der Autobahn A3 Köln Richtung Frankfurt gibt es zwischen Kreuz Breitscheid und Mettmann derzeit 8 Kilometer stockenden Verkehr und Stau wegen einer ungesicherten Unfallstelle. Der Zeitverlust beträgt mindestens 40 Minuten. Wir empfehlen Autofahrern, das Gebiet weiträumig zu umfahren oder ab dem Kreuz Ratingen-Ost die ausgeschilderte Umleitungsstrecke U12 zu nutzen. Fahren Sie bitte vorsichtig!',
    transcriptEn: 'WDR traffic service with up-to-date reports for North Rhine-Westphalia: On motorway A3 Cologne towards Frankfurt, there is currently 8 kilometers of stop-and-go traffic and congestion between junction Breitscheid and Mettmann due to an unsecured accident site. Delay is at least 40 minutes. We recommend drivers bypass the area broadly or use the signposted detour U12 from junction Ratingen-Ost. Please drive carefully!',
    examTip: 'Verkehrsnachrichten im Radio enthalten oft Zahlen (Kilometer Stau, Minuten Zeitverlust) und Wegbeschreibungen ("Richtung Frankfurt", "Umfahrung", "Umleitung U...").',
    keyWords: ['der Stau', 'stockender Verkehr', 'die Umleitungsstrecke', 'weiträumig umfahren']
  },
  {
    id: 'listen-07',
    category: 'everyday',
    categoryLabel: 'Kfz-Werkstatt & Auto',
    level: 'B1',
    title: 'Fertigstellung der Autoreparatur',
    speaker: 'Kundendienstmeister Autowerkstatt',
    audioText: 'Guten Tag, Herr Weber! Hier ist die Autowerkstatt Jansen. Gute Nachrichten: Wir haben die Reparatur an den vorderen Bremsen und den Ölwechsel an Ihrem Golf abgeschlossen. Auch die TÜV-Hauptuntersuchung hat Ihr Wagen ohne Mängel bestanden. Die neue Plakette ist bereits angebracht. Sie können Ihren Wagen heute noch bis 18 Uhr 30 bei uns abholen. Bitte bringen Sie den Fahrzeugschein mit. Wenn Sie es heute nicht mehr schaffen, haben wir morgen früh ab 7 Uhr wieder geöffnet. Auf Wiederhören!',
    question: 'Welche Information gibt der Meister über das Auto?',
    options: [
      { id: 'a', text: 'Das Auto hat den TÜV leider nicht bestanden.', isCorrect: false, explanation: 'Der Wagen hat ohne Mängel bestanden.' },
      { id: 'b', text: 'Die Reparatur ist fertig und das Auto kann bis 18:30 Uhr abgeholt werden.', isCorrect: true, explanation: 'Richtig: "haben die Reparatur... abgeschlossen... heute noch bis 18:30 Uhr abholen".' },
      { id: 'c', text: 'Der Motor muss komplett ausgetauscht werden.', isCorrect: false, explanation: 'Nur Bremsen und Ölwechsel wurden gemacht.' },
      { id: 'd', text: 'Die Werkstatt schließt heute bereits um 15 Uhr.', isCorrect: false, explanation: 'Die Werkstatt ist bis 18:30 geöffnet.' }
    ],
    transcriptDe: 'Guten Tag, Herr Weber! Hier ist die Autowerkstatt Jansen. Gute Nachrichten: Wir haben die Reparatur an den vorderen Bremsen und den Ölwechsel an Ihrem Golf abgeschlossen. Auch die TÜV-Hauptuntersuchung hat Ihr Wagen ohne Mängel bestanden. Die neue Plakette ist bereits angebracht. Sie können Ihren Wagen heute noch bis 18:30 Uhr bei uns abholen. Bitte bringen Sie den Fahrzeugschein mit. Wenn Sie es heute nicht mehr schaffen, haben wir morgen früh ab 7 Uhr wieder geöffnet. Auf Wiederhören!',
    transcriptEn: 'Hello Mr. Weber! This is Jansen auto repair shop. Good news: We completed the repairs on the front brakes and the oil change on your Golf. Your car also passed the TÜV inspection without defects. The new badge is already attached. You can pick up your car today until 6:30 PM at our shop. Please bring the vehicle registration document. If you can\'t make it today, we open again tomorrow morning at 7:00 AM. Goodbye!',
    examTip: 'Achten Sie auf Positiv-/Negativ-Signale: "Gute Nachrichten", "ohne Mängel bestanden" signalisieren sofort ein positives Ergebnis.',
    keyWords: ['die Reparatur abschließen', 'die TÜV-Hauptuntersuchung', 'der Fahrzeugschein', 'ohne Mängel bestanden']
  },
  {
    id: 'listen-08',
    category: 'bureaucracy',
    categoryLabel: 'Sprachschule & Kursleitung',
    level: 'A2',
    title: 'Kursausfall an der Sprachschule',
    speaker: 'Sekretariat der Sprachschule',
    audioText: 'Hallo liebe Kursteilnehmerinnen und Kursteilnehmer des B1-Abendkurses! Hier ist das Büro der Volkshochschule. Unser Kursleiter Herr Schneider ist heute leider erkrankt und hat Fieber. Aus diesem Grund muss der Unterricht am heutigen Montagabend, den 12. Mai, leider entfallen. Die verpassten drei Unterrichtsstunden werden am kommenden Samstagvormittag zwischen 10 und 12 Uhr 30 nachgeholt. Bitte lesen Sie bis zum nächsten regulären Termin am Mittwoch das Kapitel 6 im Arbeitsbuch. Wir wünschen Herrn Schneider gute Besserung!',
    question: 'Wann wird der ausgefallene Unterricht nachgeholt?',
    options: [
      { id: 'a', text: 'Gar nicht, die Stunden verfallen ersatzlos.', isCorrect: false, explanation: 'Die Stunden werden nachgeholt.' },
      { id: 'b', text: 'Am kommenden Samstagvormittag von 10:00 bis 12:30 Uhr.', isCorrect: true, explanation: 'Richtig: "werden am kommenden Samstagvormittag zwischen 10 und 12:30 Uhr nachgeholt".' },
      { id: 'c', text: 'Erst in den nächsten Sommerferien.', isCorrect: false, explanation: 'Sie finden bereits am Samstag statt.' },
      { id: 'd', text: 'Heute Abend online über Zoom.', isCorrect: false, explanation: 'Heute entfällt der Kurs komplett.' }
    ],
    transcriptDe: 'Hallo liebe Kursteilnehmerinnen und Kursteilnehmer des B1-Abendkurses! Hier ist das Büro der Volkshochschule. Unser Kursleiter Herr Schneider ist heute leider erkrankt und hat Fieber. Aus diesem Grund muss der Unterricht am heutigen Montagabend, den 12. Mai, leider entfallen. Die verpassten drei Unterrichtsstunden werden am kommenden Samstagvormittag zwischen 10 und 12:30 Uhr nachgeholt. Bitte lesen Sie bis zum nächsten regulären Termin am Mittwoch das Kapitel 6 im Arbeitsbuch. Wir wünschen Herrn Schneider gute Besserung!',
    transcriptEn: 'Hello dear course participants of the B1 evening class! This is the Volkshochschule office. Our teacher Mr. Schneider is unfortunately ill today and running a fever. For this reason, class this Monday evening, May 12, unfortunately has to be cancelled. The missed three class hours will be made up next Saturday morning between 10:00 AM and 12:30 PM. Please read chapter 6 in the workbook before next regular class on Wednesday. We wish Mr. Schneider a speedy recovery!',
    examTip: 'Häufiger DTZ-Klassiker: Wann findet der Nachholtermin statt? Notieren Sie Wochentage ("Samstagvormittag") und Uhrzeiten ("10 bis 12:30").',
    keyWords: ['der Kursleiter', 'der Unterricht entfällt', 'den Unterricht nachholen', 'das Kapitel im Arbeitsbuch']
  },
  {
    id: 'listen-09',
    category: 'transit',
    categoryLabel: 'Zugansage & Umstieg',
    level: 'A2',
    title: 'Ankunft und Anschlussverbindungen in Köln',
    speaker: 'Zugbegleiter im Regional-Express',
    audioText: 'Meine Damen und Herren, wir erreichen in wenigen Minuten Köln Hauptbahnhof. Ausstieg in Fahrtrichtung rechts. Sie haben folgende unmittelbare Anschlüsse: ICE 518 nach Dortmund über Wuppertal um 16 Uhr 12 von Gleis 5. Den Regionalexpress RE 5 nach Koblenz über Bonn um 16 Uhr 18 von Gleis 9. Und die S-Bahn S19 zum Flughafen Köln/Bonn um 16 Uhr 23 von Gleis 10 D bis G. Fahrgäste zur Koelnmesse bleiben bitte für eine weitere Station im Zug. Wir verabschieden uns und danken für Ihre Reise mit der Deutschen Bahn!',
    question: 'Von welchem Gleis fährt die S-Bahn zum Flughafen ab?',
    options: [
      { id: 'a', text: 'Von Gleis 5.', isCorrect: false, explanation: 'Gleis 5 ist für den ICE nach Dortmund.' },
      { id: 'b', text: 'Von Gleis 9.', isCorrect: false, explanation: 'Gleis 9 ist für den RE 5 nach Koblenz.' },
      { id: 'c', text: 'Von Gleis 10.', isCorrect: true, explanation: 'Richtig: "die S-Bahn S19 zum Flughafen Köln/Bonn um 16:23 Uhr von Gleis 10".' },
      { id: 'd', text: 'Von Gleis 1.', isCorrect: false, explanation: 'Gleis 1 wurde nicht genannt.' }
    ],
    transcriptDe: 'Meine Damen und Herren, wir erreichen in wenigen Minuten Köln Hauptbahnhof. Ausstieg in Fahrtrichtung rechts. Sie haben folgende unmittelbare Anschlüsse: ICE 518 nach Dortmund über Wuppertal um 16:12 Uhr von Gleis 5. Den Regionalexpress RE 5 nach Koblenz über Bonn um 16:18 Uhr von Gleis 9. Und die S-Bahn S19 zum Flughafen Köln/Bonn um 16:23 Uhr von Gleis 10 D bis G. Fahrgäste zur Koelnmesse bleiben bitte für eine weitere Station im Zug. Wir verabschieden uns und danken für Ihre Reise mit der Deutschen Bahn!',
    transcriptEn: 'Ladies and gentlemen, in a few minutes we will reach Cologne Central Station. Exit in travel direction on the right. You have the following immediate connections: ICE 518 to Dortmund via Wuppertal at 16:12 from platform 5. Regional-Express RE 5 to Koblenz via Bonn at 16:18 from platform 9. And S-Bahn S19 to Cologne/Bonn Airport at 16:23 from platform 10 D to G. Passengers for Koelnmesse please remain in the train for one more station. We say goodbye and thank you for traveling with Deutsche Bahn!',
    examTip: 'Filtern Sie unwichtige Anschlüsse heraus! Die Prüfungsfrage fragt gezielt nach dem Zug zum Flughafen ("S-Bahn S19 zum Flughafen"). Konzentrieren Sie sich nur auf dieses Stichwort.',
    keyWords: ['der Anschlusszug', 'Ausstieg in Fahrtrichtung rechts', 'die S-Bahn zum Flughafen', 'unmittelbare Anschlüsse']
  },
  {
    id: 'listen-10',
    category: 'news',
    categoryLabel: 'Wetterbericht & Unwetterwarnung',
    level: 'B1',
    title: 'Wetterbericht und amtliche Unwetterwarnung',
    speaker: 'Nachrichtensprecher im Radio',
    audioText: 'Hier ist der Wetterbericht des Deutschen Wetterdienstes: Der heutige Tag beginnt in ganz Süd- und Westdeutschland freundlich und sonnig bei Höchstwerten um 29 Grad. Doch Vorsicht ab den späten Nachmittagsstunden! Von Südwesten her ziehen schwere Gewitter auf. Es drohen Starkregen mit bis zu 40 Litern pro Quadratmeter, Hagel und Sturmböen der Stufe 9. Bitte sichern Sie lose Gegenstände auf Balkonen und Terrassen und meiden Sie den Aufenthalt in Waldgebieten. Ab Mitternacht beruhigt sich die Wetterlage von Westen her wieder spürbar.',
    question: 'Welche Gefahr besteht ab dem späten Nachmittag?',
    options: [
      { id: 'a', text: 'Glätte und starker Schneefall.', isCorrect: false, explanation: 'Bei 29 Grad schneit es nicht.' },
      { id: 'b', text: 'Schwere Gewitter mit Starkregen, Hagel und Sturmböen.', isCorrect: true, explanation: 'Richtig: "schwere Gewitter auf... Starkregen... Hagel und Sturmböen".' },
      { id: 'c', text: 'Extreme Kälte und Frostgefahr.', isCorrect: false, explanation: 'Es wird gewarnt vor Sturm und Starkregen, nicht vor Kälte.' },
      { id: 'd', text: 'Dichter Nebel auf allen Straßen.', isCorrect: false, explanation: 'Nebel wird nicht vorhergesagt.' }
    ],
    transcriptDe: 'Hier ist der Wetterbericht des Deutschen Wetterdienstes: Der heutige Tag beginnt in ganz Süd- und Westdeutschland freundlich und sonnig bei Höchstwerten um 29 Grad. Doch Vorsicht ab den späten Nachmittagsstunden! Von Südwesten her ziehen schwere Gewitter auf. Es drohen Starkregen mit bis zu 40 Litern pro Quadratmeter, Hagel und Sturmböen der Stufe 9. Bitte sichern Sie lose Gegenstände auf Balkonen und Terrassen und meiden Sie den Aufenthalt in Waldgebieten. Ab Mitternacht beruhigt sich die Wetterlage von Westen her wieder spürbar.',
    transcriptEn: 'Here is the weather forecast from the German Weather Service: Today begins friendly and sunny throughout southern and western Germany with highs around 29 degrees. But caution from late afternoon hours! Severe thunderstorms are rolling in from the southwest. Threats include heavy rainfall up to 40 liters per square meter, hail and gale gusts of level 9. Please secure loose objects on balconies and patios and avoid being in forested areas. From midnight the weather situation calms down noticeably from the west.',
    examTip: 'Wetterberichte im DTZ testen oft Gegensätze: Vormittag sonnig vs. Nachmittag schwere Gewitter. Achten Sie auf Wendewörter wie "Doch Vorsicht ab..." oder "Allerdings".',
    keyWords: ['die Unwetterwarnung', 'schwere Gewitter', 'der Starkregen', 'lose Gegenstände sichern']
  }
];
