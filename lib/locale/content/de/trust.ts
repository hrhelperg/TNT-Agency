import type { LocaleCorpus } from '../types'

/**
 * L1 Trust-Cluster — Deutsch.
 *
 * Die Seite zu den redaktionellen Grundsätzen ist die heikelste Übersetzung in
 * L1, denn ihr Gegenstand IST die Menge der Aussagen, die diese Website
 * ausdrücklich nicht trifft. Jedes Verbot des tschechischen Originals ist dem
 * Sinn nach vollständig übernommen: keine erfundenen Zahlen, keine Bewertungen,
 * kein „vom Ministerium geprüft", keine garantierten Mitarbeitenden und kein
 * sofortiger Eintritt, und Kennungen erst nach Überprüfung als Tatsache. Eines
 * davon abzuschwächen widerspräche dem Gegenstand der Seite selbst.
 */
export const DE_TRUST: LocaleCorpus = {
  'employer-faq': {
    de: {
      title: 'Häufige Fragen von Arbeitgebern: Gewinnung, Stabilität, Kosten',
      description:
        'Häufige Arbeitgeberfragen zu Personalgewinnung, Fluktuation und Bindung, Onboarding, Personalmangel in Branchen und den Kosten eines Arbeitsplatzes — mit Verweisen auf die ausführlichen Seiten und offiziellen Quellen.',
      h1: 'Häufige Fragen von Arbeitgebern: Gewinnung, Stabilität, Kosten',
      intro:
        'Diese Seite sammelt die Fragen, die Arbeitgeber zu Personalthemen stellen — Gewinnung, Stabilität der Teams, Onboarding, Personalmangel in einzelnen Branchen und Kosten — und ist der Einstieg in den gesamten Bereich. Zu jedem Thema führt ein Verweis auf eine ausführliche Seite. Die Antworten sind allgemein und praktisch gehalten, und bei veränderlichen Angaben — Beitragssätzen, Arbeitsmarktstatistiken — verweisen sie auf offizielle Quellen, statt Zahlen zu erfinden. Wir versprechen keine Wunderergebnisse und keine bezifferten Einsparungen; das Ziel ist Unterstützung bei Personalentscheidungen. Es ist keine Rechtsberatung.',
      breadcrumb: 'Häufige Fragen',
      sections: [
        {
          heading: 'Wie Sie diese Seite nutzen',
          body: [
            'Nachstehend finden Sie Antworten auf Fragen, die sich im gesamten Bereich wiederholen. Zu jedem Gebiet gibt es eine eigene ausführliche Seite.',
            'Konkrete Werte — Beitragssätze, Arbeitsmarktzahlen — prüfen Sie bitte bei der zuständigen Institution, weil sie sich ändern.',
          ],
        },
        {
          heading: 'Wie entscheiden wir zwischen eigener Gewinnung und einer Agentur?',
          body: [
            'Nach Dringlichkeit, nach der Art des Bedarfs — dauerhaft oder vorübergehend — und nach der eigenen Kapazität. Spitzen und vorübergehende Ausfälle passen meist zu einer Agentur, dauerhafte Schlüsselstellen zur eigenen Besetzung.',
          ],
        },
        {
          heading: 'Wie senken wir die Fluktuation?',
          body: [
            'Zuerst messen und die Ursachen feststellen, dann gezielte Maßnahmen ergreifen und an der Bindung arbeiten. Fluktuation, ihre Ursachen und die Bindung haben jeweils eigene Seiten.',
          ],
        },
        {
          heading: 'Wie gehen wir mit Personalmangel in unserer Branche um?',
          body: [
            'Mit einer Kombination aus festem Kern, flexibler oder überlassener Kapazität und — bei Mangelberufen — der Gewinnung aus dem Ausland. Produktion, Logistik, Lager und Bau werden getrennt behandelt.',
          ],
        },
        {
          heading: 'Was kostet eine Mitarbeiterin oder ein Mitarbeiter tatsächlich?',
          body: [
            'Mehr als den Bruttolohn: Arbeitgeberbeiträge und indirekte Kosten kommen hinzu. Als einzelne Zahl lässt es sich nicht sagen. Die tschechischen Kostenseiten zeigen, wie sich eine Schätzung aus geprüften Sätzen der Sozialversicherungsverwaltung, der Krankenkassen und der Finanzverwaltung aufbauen lässt.',
          ],
        },
        {
          heading: 'Warum ist Onboarding so wichtig?',
          body: [
            'Die ersten Tage und Wochen entscheiden, ob eine neue Person bleibt. Ein gelungenes Onboarding verkürzt die Einarbeitung und senkt frühe Abgänge.',
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
        'Kurze, klare Erläuterungen der Personalbegriffe: Gewinnung und Kapazität, Fluktuation, Bindung, Onboarding, Arbeitnehmerüberlassung und indirekte Kosten. Zur Orientierung vereinfacht, nicht verbindlich.',
      h1: 'Glossar für Arbeitgeber',
      intro:
        'Im Personalbereich gibt es eine Reihe von Begriffen, die leicht verwechselt oder uneinheitlich verstanden werden. Dieses Glossar erläutert die wichtigsten aus Gewinnung, Teamstabilität, Onboarding und Kosten kurz und verständlich, damit Arbeitgeber sie eindeutig verwenden können. Wo ein Begriff auch eine rechtliche Dimension hat, verweist es auf die ausführliche Seite und auf offizielle Quellen. Die Definitionen sind zur Orientierung vereinfacht und ersetzen weder den verbindlichen Wortlaut von Vorschriften noch eine Beurteilung im Einzelfall; konkrete Bedingungen können sich ändern und sollten bei der zuständigen Behörde oder auf der ausführlichen Seite geprüft werden.',
      breadcrumb: 'Glossar',
      sections: [
        {
          heading: 'Gewinnung und Kapazität',
          body: [
            'Personalgewinnung umfasst die Wege, auf denen ein Arbeitgeber Stellen besetzt — selbst einstellen, eine Agentur einsetzen oder aus dem Ausland gewinnen — samt der Organisation des Auswahlverfahrens.',
            'Personalplanung leitet den Bedarf aus dem Geschäftsausblick ab: wie viele Menschen, auf welchen Stellen, bis wann, unter Berücksichtigung von Saisonalität und Fluktuation.',
            'Bei der Direktvermittlung stellt das Unternehmen die Person selbst an. Bei der Arbeitnehmerüberlassung bleibt die Person bei der Agentur angestellt und wird einem Einsatzunternehmen vorübergehend überlassen. Nach tschechischem Recht muss die Agentur eine gültige Erlaubnis zur Arbeitsvermittlung besitzen, und es gilt die Anforderung vergleichbarer Lohn- und Arbeitsbedingungen.',
            'Massenrekrutierung, Personal für den Produktionsanlauf, saisonale Kapazität und die Abdeckung von Personalausfall sind eigene betriebliche Situationen und keine Synonyme für Personalgewinnung; jede hat eine eigene Seite.',
          ],
        },
        {
          heading: 'Teamstabilität und Eintritt',
          body: [
            'Fluktuation beschreibt, wie häufig Menschen ein Unternehmen verlassen und ersetzt werden. Unterschieden wird zwischen Abgängen auf Wunsch der Beschäftigten und auf Veranlassung des Arbeitgebers.',
            'Mitarbeiterbindung ist das systematische Halten von Menschen — nicht nur das Verhindern von Abgängen, sondern das Schaffen von Gründen zu bleiben. Das Senken der Fluktuation und die Bindung ergänzen einander: das eine reagiert, das andere denkt voraus.',
            'Onboarding ist der Prozess, eine neue Person ins Unternehmen zu führen, und verbindet den administrativen mit dem praktischen Teil. Die Einarbeitung ist der längere Zeitraum danach, in dem die Person volle Leistungsfähigkeit erreicht.',
          ],
        },
        {
          heading: 'Kosten',
          body: [
            'Die Kosten einer Mitarbeiterin oder eines Mitarbeiters sind mehr als der Bruttolohn: gesetzliche Arbeitgeberbeiträge und weitere Posten kommen hinzu. Die tschechischen Kostenseiten zeigen, wie sich eine Schätzung aus aktuellen amtlichen Sätzen aufbauen lässt; hier wird kein Betrag genannt.',
            'Indirekte Kosten sind die Posten, die auf keiner Lohnabrechnung erscheinen — Ausrüstung, Schulung, der Arbeitsplatz, die Betreuung einer neuen Person.',
            'Die Kosten einer unbesetzten Stelle sind die andere Seite derselben Entscheidung: was ein leerer Platz an entgangener Leistung, Abdeckung, indirekten Folgen und Rekrutierung kostet.',
          ],
        },
        {
          heading: 'Ist dieses Glossar verbindlich?',
          body: [
            'Nein. Die Definitionen sind zur Orientierung vereinfacht und ersetzen nicht den verbindlichen Wortlaut der Vorschriften. Prüfen Sie konkrete Bedingungen bei der zuständigen Behörde oder auf der ausführlichen Seite.',
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
        'Wie Inhalte auf TalentPartnerID entstehen und geprüft werden, aus welchen offiziellen Quellen sie stammen und was diese Website ausdrücklich nicht behauptet.',
      h1: 'Redaktionelle Grundsätze und Quellen',
      intro:
        'Wie wir auf TalentPartnerID Inhalte erstellen und prüfen, aus welchen offiziellen Quellen wir schöpfen und was wir ausdrücklich nicht behaupten.',
      breadcrumb: 'Redaktionelle Grundsätze',
      sections: [
        {
          heading: 'Wer die Inhalte erstellt',
          body: [
            'Die informativen Inhalte dieser Website erstellt die Redaktion von TalentPartnerID. Betreiberin der Website ist die TNT agency s.r.o. Die Urheberschaft geben wir auf Ebene der Redaktion an und nicht unter erfundenen Namen — wir schreiben Inhalte keinen fiktiven Autorinnen oder Autoren zu und führen keine unzutreffenden Titel oder Qualifikationen an. Es handelt sich um allgemeine Informationen, nicht um Rechtsberatung im Einzelfall.',
          ],
        },
        {
          heading: 'Aus welchen Quellen wir schöpfen',
          body: [
            'Die Inhalte stützen sich auf offizielle und öffentlich überprüfbare Quellen. Konkrete Zahlen, Sätze und Fristen verweisen unmittelbar auf diese Quellen, weil sie sich im Lauf der Zeit ändern.',
            'Rechtsvorschriften aus der Gesetzessammlung der Tschechischen Republik — insbesondere das Arbeitsgesetzbuch, das Beschäftigungsgesetz, das Gesetz über den Aufenthalt von Ausländern sowie die Vorschriften über Versicherungsbeiträge und Arbeitsschutz.',
            'Das Tschechische Statistische Amt für statistische Daten. Das Ministerium für Arbeit und Soziales und das Arbeitsamt der Tschechischen Republik für Beschäftigungsangelegenheiten und die Beschäftigung ausländischer Mitarbeitender. Die Tschechische Sozialversicherungsverwaltung und die Krankenkassen für Beiträge. Das tschechische Innenministerium, Abteilung für Asyl- und Migrationspolitik, für Aufenthaltsangelegenheiten.',
            'Jede Inhaltsseite nennt die verwendeten Quellen im Abschnitt „Quellen" und eine kurze Notiz zum Vorgehen im Abschnitt „Methodik". Bei institutionellen Online-Quellen geben wir das Datum der Prüfung an.',
          ],
        },
        {
          heading: 'Was wir ausdrücklich nicht behaupten',
          body: [
            'Damit die Inhalte redlich und überprüfbar bleiben, halten wir klare Grenzen ein.',
            'Wir nennen keine erfundenen Angaben, wenn aktuelle Daten nicht verfügbar sind — statt zu schätzen, verweisen wir auf die offizielle Quelle.',
            'Wir nennen keine erfundenen Statistiken, keine Zahlen zu Mitarbeitenden oder Arbeitgebern, keine Löhne, Erfolgsquoten, Einsparungen und keine Reaktionszeiten.',
            'Wir veröffentlichen keine Bewertungen, Rezensionen oder Sterne — es gibt hier keine „Kundenbewertung" — und keine erfundenen Referenzen oder Fallstudien.',
            'Wir verwenden keine Formulierungen wie „vom Ministerium für Arbeit und Soziales geprüft", „staatlich lizenziert" oder „staatlich zugelassen". Eine solche Aussage müsste einem amtlichen Eintrag genau entsprechen.',
            'Wir versprechen keine „garantierten" Mitarbeitenden und keinen „sofortigen Eintritt". Personalgewinnung und Fristen hängen von den Umständen und den geltenden Vorschriften ab.',
            'Identifikations- und Erlaubnisangaben der Betreiberin veröffentlichen wir erst nach Überprüfung im amtlichen Verzeichnis als Tatsache. Bis dahin sind sie als in Prüfung befindlich gekennzeichnet.',
            'Angaben zur Betreiberin, dazu welche Daten geprüft sind und wie sich jede Personalagentur in Tschechien eigenständig überprüfen lässt, finden Sie auf der Seite Über uns. Die Registrierung des Unternehmens lässt sich im Wirtschaftsregister ARES prüfen, eine Erlaubnis zur Arbeitsvermittlung im Verzeichnis der Personalagenturen.',
          ],
        },
        {
          heading: 'Aktualität und Aktualisierung',
          body: [
            'Jede Inhaltsseite nennt das Datum der letzten Aktualisierung. Da sich Sätze, Fristen und Statistiken ändern, prüfen Sie konkrete Werte immer in der geltenden Fassung der Vorschriften und in den genannten offiziellen Quellen. Wenn Sie eine Ungenauigkeit oder eine veraltete Angabe finden, sagen Sie uns Bescheid — wir korrigieren sie gern.',
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
