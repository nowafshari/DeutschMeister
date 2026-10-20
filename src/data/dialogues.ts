import type { DialogueScenario } from '../types';

export const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  // 1. IMBISS / DÖNER
  {
    id: 'dia-doener',
    title: 'Imbiss: Döner mit weniger Soße',
    subtitle: 'Bestellen wie ein Profi im deutschen Imbiss',
    category: 'daily',
    icon: 'Utensils',
    description: 'Übe die typische Bestellung am Dönerstand oder Imbiss mit Sonderwünschen (weniger Soße, ohne Zwiebeln, zum Mitnehmen).',
    initialNodeId: 'node-start',
    nodes: {
      'node-start': {
        id: 'node-start',
        speaker: 'npc',
        npcName: 'Döner-Chef',
        npcText: 'Hallo! Na Meister, was darf es heute für dich sein?',
        options: [
          {
            text: 'Hallo! Einmal Döner im Fladenbrot bitte, aber mit etwas weniger Soße und ohne Zwiebeln.',
            nextNodeId: 'node-sauce',
            xpReward: 15,
            tone: 'informal',
            feedback: 'Perfekt! Natürlich, höflich und genau auf den Punkt formuliert.'
          },
          {
            text: 'Guten Tag der Herr, ich beabsichtige eine Mahlzeit käuflich zu erwerben.',
            nextNodeId: 'node-formal-weird',
            xpReward: 5,
            tone: 'formal',
            feedback: 'Zu förmlich für einen Dönerstand! Im Imbiss wird lockerer gesprochen.'
          },
          {
            text: 'Ein Döner.',
            nextNodeId: 'node-blunt',
            xpReward: 5,
            tone: 'suboptimal',
            feedback: 'Sehr kurz angebunden. Ein "Hallo" und "bitte" machen die Bestellung sympathischer.'
          }
        ]
      },
      'node-formal-weird': {
        id: 'node-formal-weird',
        speaker: 'npc',
        npcName: 'Döner-Chef',
        npcText: 'Haha, du sprichst ja wie ein Anwalt! Also Döner komplett?',
        options: [
          {
            text: 'Gerne, aber bitte mit etwas weniger Soße und ohne scharf.',
            nextNodeId: 'node-sauce',
            xpReward: 10,
            tone: 'informal'
          }
        ]
      },
      'node-blunt': {
        id: 'node-blunt',
        speaker: 'npc',
        npcName: 'Döner-Chef',
        npcText: 'Alles klar. Welche Soße und welcher Salat?',
        options: [
          {
            text: 'Bitte Kräutersoße, aber nur wenig. Und bitte ohne Zwiebeln.',
            nextNodeId: 'node-takeaway',
            xpReward: 10,
            tone: 'informal'
          }
        ]
      },
      'node-sauce': {
        id: 'node-sauce',
        speaker: 'npc',
        npcName: 'Döner-Chef',
        npcText: 'Geht klar: wenig Soße, keine Zwiebeln! Welche Soße möchtest du: Kräuter, Knoblauch oder ein bisschen Scharf?',
        options: [
          {
            text: 'Bitte nur ein wenig Kräutersoße, vielen Dank.',
            nextNodeId: 'node-takeaway',
            xpReward: 15,
            tone: 'informal',
            feedback: 'Klasse Deutsch! "ein wenig" passt perfekt.'
          },
          {
            text: 'Knoblauchsoße bitte, aber wirklich ganz wenig Soße.',
            nextNodeId: 'node-takeaway',
            xpReward: 15,
            tone: 'informal'
          }
        ]
      },
      'node-takeaway': {
        id: 'node-takeaway',
        speaker: 'npc',
        npcName: 'Döner-Chef',
        npcText: 'Kommt sofort! Sag mal, ist das für hier oder zum Mitnehmen?',
        options: [
          {
            text: 'Einpacken zum Mitnehmen bitte!',
            nextNodeId: 'node-pay',
            xpReward: 15,
            tone: 'informal',
            feedback: '"zum Mitnehmen" ist der Standardausdruck.'
          },
          {
            text: 'Ich esse hier vor Ort.',
            nextNodeId: 'node-pay',
            xpReward: 10,
            tone: 'informal'
          }
        ]
      },
      'node-pay': {
        id: 'node-pay',
        speaker: 'npc',
        npcName: 'Döner-Chef',
        npcText: 'Hier bitte, frisch und lecker! Das macht dann 7 Euro fünfzig.',
        options: [
          {
            text: 'Hier sind 8 Euro, stimmt so! Vielen Dank und guten Appetit.',
            nextNodeId: 'node-finish',
            xpReward: 20,
            tone: 'informal',
            feedback: 'Ausgezeichnet! "Stimmt so" ist die typische deutsche Redewendung für Trinkgeld.'
          },
          {
            text: 'Hier sind genau 7 Euro fünfzig. Danke schön!',
            nextNodeId: 'node-finish',
            xpReward: 10,
            tone: 'informal'
          }
        ]
      },
      'node-finish': {
        id: 'node-finish',
        speaker: 'npc',
        npcName: 'Döner-Chef',
        npcText: 'Super, danke dir Chef! Lass es dir schmecken und bis zum nächsten Mal!',
        isEnd: true,
        feedback: 'Herzlichen Glückwunsch! Du hast das Imbiss-Szenario mit Bravour bestanden.'
      }
    }
  },

  // 2. ELECTRONICS STORE / APPLE STORE (Ratenzahlung)
  {
    id: 'dia-financing',
    title: 'Elektronikmarkt: 0%-Ratenzahlung',
    subtitle: 'Finanzierung und Ratenkauf für Geräte verhandeln',
    category: 'finance',
    icon: 'CreditCard',
    description: 'Erfahre, wie man im Fachgeschäft nach Monatsraten, Laufzeit und zinsfreier Finanzierung fragt.',
    initialNodeId: 'node-store-start',
    nodes: {
      'node-store-start': {
        id: 'node-store-start',
        speaker: 'npc',
        npcName: 'Apple-Fachberater (Nils)',
        npcText: 'Guten Tag! Willkommen bei uns. Kann ich Ihnen bei der Auswahl behilflich sein?',
        options: [
          {
            text: 'Guten Tag! Ich interessiere mich für das neue Tablet. Bieten Sie dafür auch eine Ratenzahlung an?',
            nextNodeId: 'node-store-rates',
            xpReward: 15,
            tone: 'formal',
            feedback: 'Sehr höflich und präzise formuliert ("sich interessieren für" + Akkusativ).'
          },
          {
            text: 'Hallo Nils! Ich will das iPad in Teilen bezahlen. Geht das?',
            nextNodeId: 'node-store-rates',
            xpReward: 10,
            tone: 'informal',
            feedback: 'Verständlich, aber "in monatlichen Raten zahlen" klingt professioneller.'
          }
        ]
      },
      'node-store-rates': {
        id: 'node-store-rates',
        speaker: 'npc',
        npcName: 'Apple-Fachberater (Nils)',
        npcText: 'Ja, absolut! Wir haben eine Finanzierungsoption mit 0 Prozent eff. Jahreszins. Sie können die Laufzeit flexibel zwischen 12, 24 oder 36 Monaten wählen.',
        options: [
          {
            text: 'Wie hoch wäre denn die monatliche Rate bei einer Laufzeit von 24 Monaten?',
            nextNodeId: 'node-store-docs',
            xpReward: 15,
            tone: 'formal',
            feedback: 'Exzellenter Konjunktiv II ("wäre die Rate") und richtiger Kasus bei "bei einer Laufzeit" (Dativ)!'
          },
          {
            text: 'Kommen da noch zusätzliche Zinsen oder Gebühren dazu?',
            nextNodeId: 'node-store-docs',
            xpReward: 15,
            tone: 'formal',
            feedback: 'Kluge Nachfrage nach versteckten Kosten!'
          }
        ]
      },
      'node-store-docs': {
        id: 'node-store-docs',
        speaker: 'npc',
        npcName: 'Apple-Fachberater (Nils)',
        npcText: 'Nein, bei 0% Zinsen gibt es keine Zusatzgebühren. Die monatliche Rate läge bei rund 45 Euro. Wir müssten nur kurz Ihren Personalausweis und eine deutsche Bankkarte für die Bonitätsprüfung erfassen.',
        options: [
          {
            text: 'Das passt mir sehr gut. Meinen Reisepass und meine Girokarte habe ich dabei. Können wir den Antrag ausfüllen?',
            nextNodeId: 'node-store-finish',
            xpReward: 20,
            tone: 'formal',
            feedback: 'Perfekter Abschluss! Alle benötigten Dokumente direkt parat.'
          },
          {
            text: 'Brauche ich dafür auch eine Wohnungsgeberbestätigung?',
            nextNodeId: 'node-store-finish',
            xpReward: 15,
            tone: 'formal',
            feedback: 'Gute Frage! In der Regel reicht der Ausweis mit Meldeadresse.'
          }
        ]
      },
      'node-store-finish': {
        id: 'node-store-finish',
        speaker: 'npc',
        npcName: 'Apple-Fachberater (Nils)',
        npcText: 'Wunderbar! Kommen Sie gerne mit an mein Terminal, dann füllen wir den Finanzierungsantrag unseres Partners in zwei Minuten aus.',
        isEnd: true,
        feedback: 'Klasse gemacht! Du beherrschst alle Schlüsselbegriffe wie Ratenzahlung, Monatsrate, Laufzeit und Bonitätsprüfung.'
      }
    }
  },

  // 3. BÜRGERAMT (Anmeldung)
  {
    id: 'dia-buergeramt',
    title: 'Bürgeramt: Die Wohnsitz-Anmeldung',
    subtitle: 'Termin wahrnehmen, Dokumente vorlegen & Meldebescheinigung',
    category: 'bureaucracy',
    icon: 'Landmark',
    description: 'Meistere das wichtigste Behördengespräch in Deutschland: Die offizielle Anmeldung beim Bürgeramt.',
    initialNodeId: 'node-amt-start',
    nodes: {
      'node-amt-start': {
        id: 'node-amt-start',
        speaker: 'npc',
        npcName: 'Sachbearbeiterin (Frau Weber)',
        npcText: 'Guten Tag. Sie haben einen Termin für die Wohnsitzanmeldung gebucht?',
        options: [
          {
            text: 'Guten Tag Frau Weber. Ja genau, mein Name ist [Name] und ich habe einen Termin um 10:15 Uhr zur Erstanmeldung.',
            nextNodeId: 'node-amt-docs',
            xpReward: 15,
            tone: 'formal',
            feedback: 'Sehr höflich mit Namensnennung und Uhrzeit.'
          },
          {
            text: 'Hallo, ich will mich anmelden.',
            nextNodeId: 'node-amt-docs',
            xpReward: 5,
            tone: 'suboptimal',
            feedback: 'Sehr direkt. Eine formelle Begrüßung ("Guten Tag") ist auf dem Amt Standard.'
          }
        ]
      },
      'node-amt-docs': {
        id: 'node-amt-docs',
        speaker: 'npc',
        npcName: 'Sachbearbeiterin (Frau Weber)',
        npcText: 'Sehr schön. Bitte reichen Sie mir Ihren gültigen Reisepass und die vom Vermieter ausgefüllte Wohnungsgeberbestätigung herein.',
        options: [
          {
            text: 'Hier bitte: mein Reisepass und die unterschriebene Bestätigung vom Vermieter.',
            nextNodeId: 'node-amt-tax',
            xpReward: 15,
            tone: 'formal',
            feedback: 'Präzise Übergabe der Unterlagen.'
          },
          {
            text: 'Reicht auch nur mein Mietvertrag?',
            nextNodeId: 'node-amt-warn',
            xpReward: 5,
            tone: 'formal'
          }
        ]
      },
      'node-amt-warn': {
        id: 'node-amt-warn',
        speaker: 'npc',
        npcName: 'Sachbearbeiterin (Frau Weber)',
        npcText: 'Nein, nach § 19 des Bundesmeldegesetzes ist die Wohnungsgeberbestätigung gesetzlich zwingend erforderlich. Ein Mietvertrag reicht nicht aus.',
        options: [
          {
            text: 'Verstehe! Zum Glück hat mein Vermieter das Formular unterschrieben. Hier ist es.',
            nextNodeId: 'node-amt-tax',
            xpReward: 10,
            tone: 'formal'
          }
        ]
      },
      'node-amt-tax': {
        id: 'node-amt-tax',
        speaker: 'npc',
        npcName: 'Sachbearbeiterin (Frau Weber)',
        npcText: 'Die Daten stimmen. Sind Sie Mitglied einer steuererhebenden Religionsgemeinschaft?',
        options: [
          {
            text: 'Nein, ich gehöre keiner Kirche oder Religionsgemeinschaft an.',
            nextNodeId: 'node-amt-finish',
            xpReward: 15,
            tone: 'formal',
            feedback: 'Wichtig für die Kirchensteuer in Deutschland!'
          },
          {
            text: 'Nein, ohne Religion bitte.',
            nextNodeId: 'node-amt-finish',
            xpReward: 10,
            tone: 'formal'
          }
        ]
      },
      'node-amt-finish': {
        id: 'node-amt-finish',
        speaker: 'npc',
        npcName: 'Sachbearbeiterin (Frau Weber)',
        npcText: 'Alles klar. Bitte prüfen und unterschreiben Sie dieses Meldeformular. Hier ist Ihre offizielle Meldebescheinigung. Ihre Steuer-ID erhalten Sie in etwa zwei Wochen per Post vom Bundeszentralamt für Steuern. Auf Wiedersehen!',
        isEnd: true,
        feedback: 'Hervorragend! Du bist nun offiziell mit Meldebescheinigung und Steuer-ID versorgt.'
      }
    }
  },

  // 4. DTZ SPRECHEN TEIL 3 (Gemeinsam etwas planen)
  {
    id: 'dia-dtz-plan',
    title: 'DTZ Sprechen: Gemeinsam eine Abschiedsfeier planen',
    subtitle: 'Prüfungssimulation: Vorschläge machen, verhandeln & einigen',
    category: 'dtz',
    icon: 'GraduationCap',
    description: 'Simulation der DTZ-Prüfung Teil 3: Du planst mit deinem Prüfungspartner eine Überraschungsfeier für einen Kollegen.',
    initialNodeId: 'node-dtz-start',
    nodes: {
      'node-dtz-start': {
        id: 'node-dtz-start',
        speaker: 'npc',
        npcName: 'Prüfungspartner (Stefan)',
        npcText: 'Hallo! Hast du gehört, dass unser Kollege Herr Meyer nächste Woche in Rente geht? Wollen wir zusammen eine kleine Überraschungsfeier für ihn planen?',
        options: [
          {
            text: 'Ja, das ist eine wunderbare Idee! Darf ich einen Vorschlag machen? Wir könnten am Freitagnachmittag im Konferenzraum feiern.',
            nextNodeId: 'node-dtz-food',
            xpReward: 20,
            tone: 'formal',
            feedback: 'Top DTZ-Formulierung! "Darf ich einen Vorschlag machen?" und Konjunktiv II "Wir könnten...".'
          },
          {
            text: 'Gute Idee. Was machen wir?',
            nextNodeId: 'node-dtz-food',
            xpReward: 5,
            tone: 'informal',
            feedback: 'In Teil 3 sollst du selbst aktiv Vorschläge einbringen!'
          }
        ]
      },
      'node-dtz-food': {
        id: 'node-dtz-food',
        speaker: 'npc',
        npcName: 'Prüfungspartner (Stefan)',
        npcText: 'Freitagnachmittag passt mir sehr gut. Was denkst du über Essen und Trinken? Sollen wir Pizza bestellen oder lieber selbst etwas mitbringen?',
        options: [
          {
            text: 'Meiner Meinung nach wäre es schön, wenn jeder Kollege einen kleinen Snack oder Salat mitbringt. Ich könnte Getränke und Saft besorgen.',
            nextNodeId: 'node-dtz-gift',
            xpReward: 20,
            tone: 'formal',
            feedback: 'Hervorragende Redemittel: "Meiner Meinung nach...", "wenn jeder mitbringt", und konkrete Aufgabenverteilung.'
          },
          {
            text: 'Pizza bestellen ist einfacher.',
            nextNodeId: 'node-dtz-gift',
            xpReward: 8,
            tone: 'informal',
            feedback: 'Etwas knapp. Versuche Begründungen mit "weil" oder "denn" anzufügen.'
          }
        ]
      },
      'node-dtz-gift': {
        id: 'node-dtz-gift',
        speaker: 'npc',
        npcName: 'Prüfungspartner (Stefan)',
        npcText: 'Damit bin ich absolut einverstanden! Und wie machen wir es mit einem Abschiedsgeschenk? Er liest doch so gerne Bücher über Architektur.',
        options: [
          {
            text: 'Wir könnten einen Buchgutschein kaufen und eine große Karte, auf der alle Kollegen unterschreiben. Würdest du die Karte besorgen?',
            nextNodeId: 'node-dtz-finish',
            xpReward: 20,
            tone: 'formal',
            feedback: 'Hervorragende Interaktion! Du machst den Geschenkvorschlag und bittest den Partner um Mithilfe.'
          },
          {
            text: 'Ja, Buch ist gut. Wer kauft das?',
            nextNodeId: 'node-dtz-finish',
            xpReward: 8,
            tone: 'informal'
          }
        ]
      },
      'node-dtz-finish': {
        id: 'node-dtz-finish',
        speaker: 'npc',
        npcName: 'Prüfungspartner (Stefan)',
        npcText: 'Super, so machen wir es! Ich kaufe die Karte und den Gutschein, und du kümmerst dich um die Getränke. Wir treffen uns Freitag um 14 Uhr zum Aufbauen. Perfekt abgesprochen!',
        isEnd: true,
        feedback: 'Prüfungsurteil: Bestanden mit voller Punktzahl! Zielgerichtete Vorschläge, Kompromisse und partnerschaftliche Einigung.'
      }
    }
  }
];
