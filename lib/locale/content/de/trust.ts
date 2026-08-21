import type { LocaleCorpus } from '../types'

/**
 * L1 Trust-Cluster – Deutsch.
 *
 * Die Seite zu den redaktionellen Grundsätzen ist die heikelste Übersetzung in
 * L1, denn ihr Gegenstand IST die Menge der Aussagen, die diese Website
 * ausdrücklich nicht trifft. Jedes Verbot des tschechischen Originals ist dem
 * Sinn nach vollständig übernommen: keine erfundenen Zahlen, keine Bewertungen,
 * kein „vom Ministerium geprüft“, keine garantierten Mitarbeitenden und kein
 * sofortiger Eintritt, und Kennungen erst nach Überprüfung als Tatsache. Eines
 * davon abzuschwächen widerspräche dem Gegenstand der Seite selbst.
 *
 * Die Aufzählungen der tschechischen Quellseiten stehen wieder als Listen: die
 * Gebiete, die der Einstieg für Arbeitgeber abdeckt, die dreizehn Glossar-
 * einträge und die beiden Listen der redaktionellen Grundsätze (die Quellen und
 * „Was wir ausdrücklich nicht behaupten“). Vorher waren sie zu Fließtext
 * gefaltet, wobei Einträge verloren gingen und Beispiele hinzukamen, die im
 * tschechischen Original nicht stehen.
 *
 * Betreiberin ist eine tschechische Personalagentur. Wo eine Aussage rechtlich
 * geladen ist – Arbeitnehmerüberlassung, Erlaubnis zur Arbeitsvermittlung,
 * zuständige Behörden, Versicherungsbeiträge –, ist die tschechische
 * Zuständigkeit spätestens an dieser Stelle ausdrücklich genannt, damit eine
 * deutschsprachige Leserin sie nicht als deutsches Recht liest.
 */
export const DE_TRUST: LocaleCorpus = {
  'employer-faq': {
    de: {
      title: 'Häufige Fragen von Arbeitgebern: Gewinnung, Stabilität, Kosten',
      description:
        'Arbeitgeberfragen zu Gewinnung, Fluktuation, Bindung, Onboarding, Personalmangel und Personalkosten in Tschechien – allgemeine Antworten mit Verweis auf offizielle Quellen.',
      h1: 'Häufige Fragen von Arbeitgebern: Gewinnung, Stabilität, Kosten',
      intro:
        'Diese Seite sammelt die Fragen, die Arbeitgeber zu Personalthemen stellen – Gewinnung, Stabilität der Teams, Onboarding, Personalmangel in einzelnen Branchen und Kosten – und ist der Einstieg in den gesamten Bereich; welche Gebiete dazugehören, benennt der Abschnitt gleich darunter. Die Antworten sind allgemein und praktisch gehalten, und bei veränderlichen Angaben – Beitragssätzen, Arbeitsmarktstatistiken – verweisen sie auf die offiziellen tschechischen Quellen, statt Zahlen zu erfinden. Wir versprechen keine Wunderergebnisse und keine bezifferten Einsparungen; das Ziel ist Unterstützung bei Personalentscheidungen. Es ist keine Rechtsberatung.',
      breadcrumb: 'Häufige Fragen',
      sections: [
        {
          heading: 'Wie Sie diese Seite nutzen',
          body: [
            'Nachstehend finden Sie Antworten auf Fragen, die sich im gesamten Bereich wiederholen. Jedes dieser Gebiete wird ausführlich auf einer eigenen Seite behandelt.',
            'Konkrete Werte – Beitragssätze, Arbeitsmarktzahlen – prüfen Sie bitte bei der zuständigen tschechischen Institution, weil sie sich ändern.',
          ],
        },
        {
          heading: 'Bereiche, die dieser Einstieg abdeckt',
          body: [
            'Die folgenden Fragen verteilen sich auf die Gebiete, die dieser Einstieg abdeckt.',
          ],
          list: {
            items: [
              'Personalgewinnung: Überblick, Organisation, Kandidatensuche, Planung',
              'Stabilität: Fluktuation, ihre Ursachen, das Senken der Fluktuation, Bindung',
              'Onboarding und Einarbeitung',
              'Personalmangel nach Branchen: Produktion, Logistik, Lager, Bau',
              'Kosten von Mitarbeitenden',
            ],
          },
        },
        {
          heading: 'Wie entscheiden wir zwischen eigener Gewinnung und einer Agentur?',
          body: [
            'Nach Dringlichkeit, nach der Art des Bedarfs – dauerhaft oder vorübergehend – und nach der eigenen Kapazität. Spitzen und vorübergehende Ausfälle passen meist zu einer Agentur, dauerhafte Schlüsselstellen zur eigenen Besetzung.',
          ],
        },
        {
          heading: 'Wie senken wir die Fluktuation?',
          body: [
            'Zuerst messen und die Ursachen feststellen, dann gezielte Maßnahmen ergreifen und an der Bindung arbeiten. Die Fluktuation selbst, ihre Ursachen, das Senken der Fluktuation und die Bindung werden dabei als vier getrennte Themen behandelt.',
          ],
        },
        {
          heading: 'Wie gehen wir mit Personalmangel in unserer Branche um?',
          body: [
            'Mit einer Kombination aus festem Kern, flexibler oder überlassener Kapazität und – bei Mangelberufen – der Gewinnung aus dem Ausland. Produktion, Logistik, Lager und Bau werden getrennt behandelt; die ausführlichen Seiten zu diesen vier Branchen liegen auf Tschechisch vor.',
          ],
        },
        {
          heading: 'Was kostet eine Mitarbeiterin oder ein Mitarbeiter tatsächlich?',
          body: [
            'Mehr als den Bruttolohn: Arbeitgeberbeiträge und indirekte Kosten kommen hinzu. Als einzelne Zahl lässt es sich nicht sagen. Die tschechischen Kostenseiten zeigen, wie sich eine Schätzung aus geprüften Sätzen der tschechischen Sozialversicherungsverwaltung (ČSSZ), der Krankenkassen und der Finanzverwaltung aufbauen lässt.',
          ],
        },
        {
          heading: 'Warum ist Onboarding so wichtig?',
          body: [
            'Die ersten Tage und Wochen entscheiden, ob eine neue Person bleibt. Ein gelungenes Onboarding verkürzt die Einarbeitung und senkt frühe Abgänge. Onboarding und die anschließende, längere Einarbeitung sind dabei zwei getrennte Themen.',
          ],
        },
        {
          heading: 'Versprechen Sie konkrete Ergebnisse oder Einsparungen?',
          body: [
            'Nein. Wir nennen keine erfundenen Einsparungszahlen und geben keine Garantien. Wir bieten praktische Rahmen und verweisen bei Daten auf offizielle Quellen.',
          ],
        },
      ],
      cta: {
        label: 'Für Arbeitgeber',
        targetConceptId: 'for-employers',
        note: 'Die Arbeitgeber-Übersicht verbindet diese Themen in der Reihenfolge, in der die Entscheidungen anstehen.',
      },
    },
  },

  'employer-glossary': {
    de: {
      title: 'Glossar für Arbeitgeber',
      description:
        'Personalbegriffe kurz erklärt: Gewinnung, Fluktuation, Bindung, Onboarding, Arbeitnehmerüberlassung in Tschechien, indirekte Kosten. Vereinfacht, nicht verbindlich.',
      h1: 'Glossar für Arbeitgeber',
      intro:
        'Im Personalbereich gibt es eine Reihe von Begriffen, die leicht verwechselt oder uneinheitlich verstanden werden. Dieses Glossar erläutert die wichtigsten aus Gewinnung, Teamstabilität, Onboarding und Kosten kurz und verständlich, damit Arbeitgeber sie eindeutig verwenden können. Wo ein Begriff auch eine rechtliche Dimension hat, wird sie benannt und auf die zuständigen tschechischen Stellen verwiesen. Die Definitionen sind zur Orientierung vereinfacht und ersetzen weder den verbindlichen Wortlaut von Vorschriften noch eine Beurteilung im Einzelfall; konkrete Bedingungen können sich ändern und sollten bei der zuständigen tschechischen Behörde geprüft werden.',
      breadcrumb: 'Glossar',
      sections: [
        {
          heading: 'Gewinnung und Kapazität',
          body: [
            'Diese Gruppe von Begriffen betrifft die Gewinnung von Arbeitskräften und die Planung von Kapazitäten.',
            'Bei der Arbeitnehmerüberlassung kommt eine rechtliche Bedingung hinzu: Die Agentur muss nach tschechischem Recht eine gültige Erlaubnis zur Arbeitsvermittlung besitzen.',
          ],
          list: {
            items: [
              'Besetzung ohne Agentur – das Unternehmen sucht und beschäftigt die Person selbst.',
              'Arbeitnehmerüberlassung – die Person ist bei der Personalagentur angestellt und wird einem Einsatzunternehmen vorübergehend überlassen.',
              'Vorübergehende Zuweisung – die Zuweisung überlassener Beschäftigter an ein Einsatzunternehmen für eine vereinbarte Dauer.',
              'Planung der Personalgewinnung – das Vorhersehen des Personalbedarfs und seines Zeitpunkts.',
              'Sourcing (Direktansprache) – das Suchen und Ansprechen von Kandidatinnen und Kandidaten über verschiedene Kanäle.',
            ],
          },
        },
        {
          heading: 'Teamstabilität und Eintritt',
          body: [
            'Diese Gruppe von Begriffen betrifft das Halten von Menschen und ihre Einführung ins Unternehmen. Das Senken der Fluktuation und die Bindung ergänzen einander.',
          ],
          list: {
            items: [
              'Fluktuation – die Rate der Abgänge und der Ersetzung von Mitarbeitenden.',
              'Bindung (Retention) – das systematische Halten von Mitarbeitenden im Unternehmen.',
              'Onboarding – der Prozess des Eintritts und der ersten Tage einer neuen Person.',
              'Einarbeitung (Adaptation) – das längere Hineinwachsen in den ersten Wochen und Monaten.',
            ],
          },
        },
        {
          heading: 'Kosten',
          body: [
            'Diese Gruppe von Begriffen betrifft den Preis der Arbeitskraft. Einen Betrag nennt dieses Glossar nicht; die tschechischen Kostenseiten zeigen, wie sich eine Schätzung aus aktuellen amtlichen Sätzen aufbauen lässt.',
          ],
          list: {
            items: [
              'Tatsächliche Kosten von Mitarbeitenden – die Gesamtkosten über den Bruttolohn hinaus.',
              'Indirekte Kosten – die Posten außerhalb von Lohn und Beiträgen (Personalgewinnung, Onboarding, Fluktuation).',
              'Opportunitätskosten – der Verlust aus einer unbesetzten oder nicht leistungsfähigen Stelle.',
              'Gesetzliche Arbeitgeberbeiträge – die vom Arbeitgeber getragenen Versicherungsbeiträge; die Sätze stehen bei den offiziellen tschechischen Quellen.',
            ],
          },
        },
        {
          heading: 'Ist dieses Glossar verbindlich?',
          body: [
            'Nein. Die Definitionen sind zur Orientierung vereinfacht und ersetzen nicht den verbindlichen Wortlaut der Vorschriften. Prüfen Sie konkrete Bedingungen bei der zuständigen tschechischen Behörde.',
          ],
        },
      ],
      cta: {
        label: 'Häufige Fragen',
        targetConceptId: 'employer-faq',
        note: 'Die Fragen, in denen diese Begriffe üblicherweise auftauchen.',
      },
    },
  },

  'editorial-policy': {
    de: {
      title: 'Redaktionelle Grundsätze und Quellen',
      description:
        'Wie Inhalte auf TalentPartnerID entstehen und geprüft werden, aus welchen offiziellen tschechischen Quellen sie stammen und was diese Website ausdrücklich nicht behauptet.',
      h1: 'Redaktionelle Grundsätze und Quellen',
      intro:
        'Wie wir auf TalentPartnerID Inhalte erstellen und prüfen, aus welchen offiziellen tschechischen Quellen wir schöpfen und was wir ausdrücklich nicht behaupten.',
      breadcrumb: 'Redaktionelle Grundsätze',
      sections: [
        {
          heading: 'Wer die Inhalte erstellt',
          body: [
            'Die informativen Inhalte dieser Website erstellt die Redaktion von TalentPartnerID. Betreiberin der Website ist die TNT agency s.r.o. Die Urheberschaft geben wir auf Ebene der Redaktion an und nicht unter erfundenen Namen – wir schreiben Inhalte keinen fiktiven Autorinnen oder Autoren zu und führen keine unzutreffenden Titel oder Qualifikationen an. Es handelt sich um allgemeine Informationen, nicht um Rechtsberatung im Einzelfall.',
          ],
        },
        {
          heading: 'Aus welchen Quellen wir schöpfen',
          body: [
            'Die Inhalte stützen sich auf offizielle und öffentlich überprüfbare tschechische Quellen. Konkrete Zahlen, Sätze und Fristen verweisen unmittelbar auf diese Quellen, weil sie sich im Lauf der Zeit ändern.',
            'Auf den tschechischen Inhaltsseiten nennen wir die verwendeten Quellen im Abschnitt „Quellen“ und eine kurze Notiz zum Vorgehen im Abschnitt „Methodik“. Bei institutionellen Online-Quellen geben wir das Datum der Prüfung an.',
          ],
          list: {
            items: [
              'Rechtsvorschriften aus der Gesetzessammlung der Tschechischen Republik – insbesondere das Arbeitsgesetzbuch, das Beschäftigungsgesetz, das Gesetz über den Aufenthalt von Ausländern sowie die Vorschriften über Versicherungsbeiträge und Arbeitsschutz.',
              'Das Tschechische Statistische Amt (ČSÚ) für statistische Daten.',
              'Das tschechische Ministerium für Arbeit und Soziales (MPSV) und das Arbeitsamt der Tschechischen Republik (Úřad práce ČR) für den Aufgabenbereich Beschäftigung und die Beschäftigung ausländischer Mitarbeitender.',
              'Die Tschechische Sozialversicherungsverwaltung (ČSSZ) und die Krankenkassen für Beiträge.',
              'Das tschechische Innenministerium, Abteilung für Asyl- und Migrationspolitik, für Aufenthaltsangelegenheiten von Ausländerinnen und Ausländern.',
            ],
          },
        },
        {
          heading: 'Was wir ausdrücklich nicht behaupten',
          body: [
            'Damit die Inhalte redlich und überprüfbar bleiben, halten wir klare Grenzen ein.',
          ],
          list: {
            items: [
              'Wir nennen keine erfundenen Angaben, wenn aktuelle Daten nicht verfügbar sind – statt zu schätzen, verweisen wir auf die offizielle Quelle.',
              'Wir nennen keine erfundenen Statistiken, keine Zahlen zu Mitarbeitenden oder Arbeitgebern, keine Löhne, Erfolgsquoten, Einsparungen und keine Reaktionszeiten.',
              'Wir veröffentlichen keine Bewertungen, Rezensionen oder Sterne – es gibt hier keine „Kundenbewertung“ – und keine erfundenen Referenzen oder Fallstudien.',
              'Wir verwenden keine Formulierungen wie „vom tschechischen Ministerium für Arbeit und Soziales geprüft“, „staatlich lizenziert“ oder „staatlich zugelassen“. Eine solche Aussage müsste einem amtlichen Eintrag genau entsprechen.',
              'Wir versprechen keine „garantierten“ Mitarbeitenden und keinen „sofortigen Eintritt“; Personalgewinnung und Fristen hängen von den Umständen und den geltenden tschechischen Vorschriften ab.',
              'Identifikations- und Erlaubnisangaben der Betreiberin veröffentlichen wir erst als Tatsache, nachdem wir sie im amtlichen tschechischen Verzeichnis überprüft haben – bis dahin sind sie als „Überprüfung läuft“ gekennzeichnet.',
            ],
          },
        },
        {
          heading: 'Wie sich die Angaben zur Betreiberin prüfen lassen',
          body: [
            'Angaben zur Betreiberin, dazu welche Daten geprüft sind und wie sich jede Personalagentur in Tschechien eigenständig überprüfen lässt, finden Sie auf der Seite Über uns. Die Registrierung des Unternehmens lässt sich im tschechischen Wirtschaftsregister ARES prüfen, eine Erlaubnis zur Arbeitsvermittlung im Verzeichnis der Personalagenturen des tschechischen Ministeriums für Arbeit und Soziales.',
          ],
        },
        {
          heading: 'Aktualität und Aktualisierung',
          body: [
            'Die tschechischen Inhaltsseiten nennen jeweils das Datum der letzten Aktualisierung. Da sich Sätze, Fristen und Statistiken ändern, prüfen Sie konkrete Werte immer in der geltenden Fassung der tschechischen Vorschriften und in den genannten offiziellen Quellen. Wenn Sie eine Ungenauigkeit oder eine veraltete Angabe finden, sagen Sie uns Bescheid – wir korrigieren sie gern.',
          ],
        },
        {
          heading: 'Korrekturen und Hinweise',
          body: [
            'Hinweise zur Korrektur oder Aktualisierung senden Sie bitte an die auf der Kontaktseite veröffentlichte Adresse. Wie personenbezogene Daten verarbeitet werden, beschreibt unsere Datenschutzerklärung.',
            'Redaktionell bearbeitet von der Redaktion TalentPartnerID auf Grundlage offizieller Quellen. Die Inhalte sind allgemeine Informationen, keine Rechtsberatung im Einzelfall.',
          ],
        },
      ],
      cta: {
        label: 'Über uns',
        targetConceptId: 'about-us',
        note: 'Wer die Website betreibt und wie sich die Angaben eigenständig prüfen lassen.',
      },
    },
  },
}
