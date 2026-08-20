import type { LocaleCorpus } from './types'

/**
 * German L0 content.
 *
 * Translated from the Czech source under the same three rules as the English
 * corpus: factual strength preserved exactly, no fact introduced that the Czech
 * does not state, and the explicit refusals to publish figures translated
 * rather than dropped.
 *
 * A note on terminology, because it carries legal weight. "Arbeitnehmer-
 * überlassung" is the established German term for the model the Czech calls
 * agenturní zaměstnávání, and it is used descriptively here. The rules
 * referenced are CZECH — the Employment Act and the Czech Labour Code — and the
 * text says so, because a German reader would otherwise reasonably assume the
 * German AÜG framework applies. Where the Czech names a Czech institution, the
 * German names it as Czech too.
 */
export const DE_CONTENT: LocaleCorpus = {
  home: {
    de: {
      title: 'TalentPartnerID | Personalvermittlung und Zeitarbeit in Tschechien',
      description:
        'TalentPartnerID unterstützt Arbeitgeber dabei, die richtigen Mitarbeiterinnen und Mitarbeiter zu finden – für operative Aufgaben in Produktion, Lager und Logistik sowie für die daran anschließenden Fach- und technischen Positionen.',
      h1: 'Wir verbinden die richtigen Menschen mit den richtigen Unternehmen',
      intro:
        'TalentPartnerID unterstützt Arbeitgeber dabei, die richtigen Mitarbeiterinnen und Mitarbeiter zu finden – für operative Aufgaben in Produktion, Lager und Logistik sowie für die Fach- und technischen Positionen, die daran anschließen.',
      breadcrumb: 'Startseite',
      sections: [
        {
          heading: 'Was wir tun',
          body: [
            'Wir arbeiten mit Arbeitgebern, die operative Stellen in Produktion, Lager und Logistik besetzen müssen – sowie die technischen und fachlichen Positionen, die zu diesen Betrieben gehören.',
            'Dafür stehen zwei Modelle zur Verfügung: die Personalvermittlung, bei der Sie die Person direkt anstellen, und die Arbeitnehmerüberlassung, bei der die Mitarbeiterin oder der Mitarbeiter bei uns angestellt bleibt und Ihnen vorübergehend überlassen wird.',
          ],
        },
        {
          heading: 'Wie wir mit Zahlen umgehen',
          body: [
            'Wo eine Seite einen Beitragssatz, eine Statistik oder eine Marktzahl bräuchte, verweist sie auf die offizielle Quelle, statt eine eigene Zahl abzudrucken. Beitragssätze, Mindestlohn und Arbeitsmarktdaten ändern sich, und eine übernommene Zahl ist in dem Moment falsch, in dem das geschieht.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Beschreiben Sie die Position – wir melden uns bei Ihnen.',
      },
    },
  },

  'for-employers': {
    de: {
      title: 'Für Arbeitgeber: Personalgewinnung, Teamstabilität und Kosten',
      description:
        'Übersicht für Arbeitgeber: Personalgewinnung und ihre Planung, Fluktuation senken und Mitarbeiter binden, Onboarding, Personalmangel nach Branchen und was eine Mitarbeiterin oder ein Mitarbeiter tatsächlich kostet. Mit Quellen.',
      h1: 'Für Arbeitgeber: Personalgewinnung, Teamstabilität und Kosten',
      intro:
        'Diese Seite ist der Einstieg für Arbeitgeber, die praktische Personalfragen zu lösen haben – von der Besetzung offener Stellen über die Stabilität der Teams bis zu den Kosten eines Arbeitsplatzes. Sie verbindet die Themen so, dass Sie schnell zu der Seite gelangen, die die Entscheidung beantwortet, vor der Sie gerade stehen. Bei veränderlichen Angaben wie Beitragssätzen und Arbeitsmarktstatistiken verweist der Inhalt auf offizielle Quellen, statt Zahlen zu erfinden.',
      breadcrumb: 'Für Arbeitgeber',
      sections: [
        {
          heading: 'Personalgewinnung und ihre Planung',
          body: [
            'Wenn Sie Stellen besetzen, beginnen Sie bei der Frage, über welchen Weg Sie rekrutieren und wie Sie den Prozess organisieren. Eigene Seiten behandeln den Überblick über die Personalgewinnung, die Organisation des Auswahlverfahrens, die Kandidatensuche, die Planung und die Gewinnung ausländischer Mitarbeiterinnen und Mitarbeiter.',
          ],
        },
        {
          heading: 'Teamstabilität, Onboarding und Branchen',
          body: [
            'Menschen zu halten und sie gut einzuarbeiten wirkt sich sowohl auf die Kosten als auch auf die Leistung aus. Dieser Bereich behandelt Fluktuation, ihre Ursachen und ihre Senkung, Mitarbeiterbindung, Onboarding und Einarbeitung sowie den Personalmangel in einzelnen Branchen – Produktion, Logistik, Lager und Bau.',
          ],
        },
        {
          heading: 'Fach- und technische Positionen',
          body: [
            'Die Besetzung qualifizierter Berufe folgt einer anderen Logik als die Gewinnung operativer Kräfte. Bei technischen und fachlichen Rollen entscheidet in der Regel nicht die Zahl der Bewerbungen, sondern wie viele Menschen die Qualifikation tatsächlich besitzen, ob ihre Befähigung zu der Tätigkeit passt und ob sie noch gültig ist.',
          ],
        },
        {
          heading: 'Grundlagen für die Besetzungsentscheidung',
          body: [
            'Eine Besetzungsentscheidung fällt leichter, wenn beide Seiten der Gleichung beziffert sind. Die Mitarbeiterkosten beschreiben, was eine besetzte Stelle kostet; die Kosten einer unbesetzten Stelle beschreiben, was der leere Platz kostet. Ohne die zweite Zahl sieht Stillstand kostenlos aus und Personalgewinnung wie reine Ausgabe.',
            'Die zweite Grundlage ist die Stellenbeschreibung selbst. Viele lange offene Stellen scheitern nicht am Markt, sondern an einem Profil, das Notwendiges und Wünschenswertes nicht trennt – und nach dem sich deshalb weder gezielt suchen noch Bewerbungen vergleichen lassen.',
          ],
        },
        {
          heading: 'Kosten und weitere Quellen',
          body: [
            'Für die Budgetierung gibt es Seiten zu den tatsächlichen und indirekten Mitarbeiterkosten und dazu, wie sich die Kosten einer einzelnen Stelle schätzen lassen. Bei konkreten Beitrags- und Steuersätzen gehen Sie bitte immer von den aktuellen offiziellen Quellen aus, die auf der jeweiligen Seite genannt sind.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Wir können von der Bedarfsdefinition bis zum Eintritt unterstützen und die Administration im Rahmen der geltenden Vorschriften koordinieren.',
      },
    },
  },

  'cost-of-vacancy': {
    de: {
      title: 'Kosten unbesetzter Stellen: was ein leerer Arbeitsplatz kostet',
      description:
        'Kosten unbesetzter Stellen – wie Sie eine eigene Rechnung aus entgangener Leistung, Überstunden, Qualitätsfolgen und Rekrutierungskosten aufbauen. Eine Methode, ohne erfundene Zahlen.',
      h1: 'Kosten unbesetzter Stellen: was ein leerer Arbeitsplatz kostet',
      intro:
        'Wenn eine Stelle sich nicht besetzen lässt, entsteht zunächst der Eindruck, das Unternehmen spare ein Gehalt. Tatsächlich verlagert sich die Kosten nur – in Überstunden, in verlangsamte Leistung, in die Qualität und auf die Menschen, die die Arbeit zusätzlich mittragen. Solange das niemand beziffert, wirkt der leere Platz günstiger als seine Besetzung, und die Entscheidung wird weiter aufgeschoben. Diese Seite bietet eine Methode, wie Sie Ihre eigene Zahl aufbauen. Einen konkreten Betrag nennt sie nicht.',
      breadcrumb: 'Kosten unbesetzter Stellen',
      sections: [
        {
          heading: 'Die vier Bestandteile',
          body: [
            'Eine Rechnung ist dann sinnvoll, wenn sie bei dem bleibt, was belegbar ist. In der Praxis besteht die Kosten einer unbesetzten Stelle aus vier Teilen, die jeweils anders zu berechnen sind.',
            'Entgangene oder verschobene Leistung ist der erste und meist größte Teil. Der zweite sind die Kosten der Abdeckung – Überstunden, Zuschläge, Aushilfe über eine Agentur oder Umsetzungen aus anderen Bereichen. Der dritte sind indirekte Folgen, die verzögert sichtbar werden: Fehler, Ausschuss, Terminverzug. Der vierte sind die Kosten der Rekrutierung selbst.',
          ],
        },
        {
          heading: 'Entgangene Leistung beziffern',
          body: [
            'Der einfachste brauchbare Weg geht davon aus, was die Stelle je Zeiteinheit erbringt. Bei einer Produktionsstelle ist das üblicherweise ein Anteil am Produktionsvolumen, bei einer Vertriebsrolle der Wert bearbeiteter Aufträge, bei einer technischen Position aufgeschobene Projekte.',
            'Entscheidend ist die Unterscheidung, ob Leistung tatsächlich verloren geht oder nur später erbracht wird. Ein Auftrag, den das Unternehmen später nachholt, ist nicht dasselbe wie eine nicht geleistete Schicht. Diese Unterscheidung ist für die Glaubwürdigkeit der Rechnung wichtiger als Genauigkeit auf die Krone – eine überhöhte Rechnung verliert im ersten Gespräch ihre Wirkung.',
          ],
        },
        {
          heading: 'Abdeckungskosten sind am leichtesten zu belegen',
          body: [
            'Dieser Teil ist der am besten belegbare der ganzen Rechnung, weil er bereits verbucht ist. Sie benötigen die Überstunden, Zuschläge oder Agenturstunden, die auf die Abdeckung der unbesetzten Stelle entfallen.',
            'Rechtlicher Rahmen: Zuschläge für Überstunden, Nacht-, Wochenend- und Feiertagsarbeit regelt das tschechische Arbeitsgesetzbuch; die konkreten Sätze und die Grenzen der Überstundenarbeit ergeben sich aus der geltenden Fassung. In die Rechnung gehören die tatsächlich ausgezahlten Beträge aus Ihrer Lohnbuchhaltung, nicht allgemeine Sätze.',
          ],
        },
        {
          heading: 'Indirekte Folgen: vorsichtig rechnen, aber nicht weglassen',
          body: [
            'Indirekte Folgen sind am schwersten messbar und zugleich oft am teuersten. Ein überlastetes Team macht mehr Fehler, der Ausschuss steigt, Termine verschieben sich, und im Extremfall gehen die Menschen, die den Ausfall aufgefangen haben.',
            'Empfehlenswert ist, keine Genauigkeit anzustreben, sondern mit einer Spanne zu arbeiten: Welche Auswirkung ist beim aktuellen Stand die kleinste vorstellbare, welche die größte. Eine Spanne ist ehrlicher als eine einzelne Zahl und reicht für die Entscheidung meist aus, weil sie die Größenordnung zeigt.',
          ],
        },
        {
          heading: 'Was Sie vermeiden sollten',
          body: [
            'Der häufigste Fehler ist ein übernommenes allgemeines Vielfaches des Jahresgehalts. Solche Zahlen kursieren, beziehen sich aber nicht auf Ihren Betrieb und halten dem ersten Gespräch mit der Finanzabteilung nicht stand.',
            'Der zweite Fehler ist die Doppelzählung – etwa den vollen Leistungsausfall und zugleich die Überstunden anzusetzen, mit denen dieselbe Leistung abgedeckt wurde. Entweder wurde die Arbeit nicht erbracht, oder sie wurde teurer erbracht; beides zugleich gilt nicht.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Die Kosten einer Stelle können Sie im Rechner modellieren. Wenn es um eine konkrete Besetzung geht, beschreiben Sie sie uns.',
      },
    },
  },

  'request-staff': {
    de: {
      title: 'Personal anfragen | TalentPartnerID',
      description:
        'Sagen Sie uns, welche Stelle Sie besetzen möchten: Tätigkeit, Standort, Schichtmodell und erforderliche Qualifikation. Wir melden uns und besprechen, was die Besetzung erfordert.',
      h1: 'Personal anfragen',
      intro:
        'Beschreiben Sie die Stelle, die Sie besetzen möchten – wir melden uns bei Ihnen. Je konkreter die Beschreibung ist – die Tätigkeit selbst, die Anlagen, das Schichtmodell, die erforderliche Befähigung – desto enger und brauchbarer ist der Kreis der Menschen, die wir ansprechen können.',
      breadcrumb: 'Personal anfragen',
      sections: [
        {
          heading: 'Was uns am meisten hilft',
          body: [
            'Eine Beschreibung der Arbeit, die zu leisten ist, statt einer Wunschliste. Der häufigste Grund, weshalb eine Suche stockt, ist eine Beschreibung, die zwei verschiedene Rollen vermischt oder eine Kombination verlangt, die nur wenige Menschen mitbringen.',
            'Wenn eine Stelle einen Befähigungsnachweis erfordert, nennen Sie ihn bitte: Solche Nachweise haben eine Gültigkeitsdauer und einen begrenzten Umfang und müssen deshalb vor dem Eintritt gelesen und nicht nur abgeheftet werden.',
          ],
        },
        {
          heading: 'Wie es weitergeht',
          body: [
            'Wir gehen die Beschreibung mit Ihnen durch und ergänzen, was fehlt. Anschließend erheben wir, in welchen Betriebstypen die gesuchte Kompetenz in der Region entsteht, und sprechen Menschen gezielt an. Kandidatinnen und Kandidaten übergeben wir mit dem Hinweis, was geprüft ist und was auf Ihrer Seite fachlich zu beurteilen bleibt.',
          ],
        },
      ],
      cta: {
        label: 'Für Arbeitgeber',
        targetConceptId: 'for-employers',
        note: 'Noch keine konkrete Anfrage? Die Arbeitgeber-Übersicht behandelt die Entscheidungen, die meist davor stehen.',
      },
    },
  },

  'about-us': {
    de: {
      title: 'Über uns und Überprüfung der Agentur | TalentPartnerID',
      description:
        'Wer TalentPartnerID betreibt, wie sich die Agentur in öffentlichen Registern überprüfen lässt und was diese Website behauptet – und was nicht.',
      h1: 'Über uns und Überprüfung der Agentur',
      intro:
        'TalentPartnerID wird von der TNT agency s.r.o. mit Sitz in Pardubice betrieben. Diese Seite nennt, wer hinter der Website steht und wie sich die Angaben in öffentlichen Registern prüfen lassen, damit nichts davon geglaubt werden muss.',
      breadcrumb: 'Über uns',
      sections: [
        {
          heading: 'Wie Sie uns überprüfen können',
          body: [
            'Die Unternehmensangaben lassen sich im öffentlichen Handelsregister und im Wirtschaftsregister ARES prüfen. Personalagenturen, die in Tschechien tätig sind, müssen eine gültige Erlaubnis nach dem tschechischen Beschäftigungsgesetz besitzen; das Verzeichnis der Erlaubnisinhaber führt das Ministerium für Arbeit und Soziales.',
            'Wir veröffentlichen die für diese Prüfung nötigen Kennungen, statt Sie um Vertrauen in eine Aussage auf unserer eigenen Website zu bitten.',
          ],
        },
        {
          heading: 'Was diese Website nicht tut',
          body: [
            'Wir veröffentlichen keine Gehaltsniveaus und keine Besetzungsdauern. Gehaltsspannen für einen bestimmten Beruf und eine bestimmte Region gehören in das offizielle Informationssystem über Durchschnittsverdienste; Arbeitsmarktdaten veröffentlichen das Ministerium für Arbeit und Soziales, das Arbeitsamt der Tschechischen Republik und das Tschechische Statistische Amt.',
          ],
        },
      ],
      cta: {
        label: 'Kontakt aufnehmen',
        targetConceptId: 'contact',
      },
    },
  },

  contact: {
    de: {
      title: 'Kontakt zu TalentPartnerID',
      description:
        'Nehmen Sie Kontakt zu TalentPartnerID auf – zu einer offenen Stelle oder zur Zusammenarbeit. Kontaktdaten und was in Ihre Nachricht gehört.',
      h1: 'Kontakt aufnehmen',
      intro:
        'Sagen Sie uns, was Sie brauchen – wir melden uns bei Ihnen. Wenn Sie als Arbeitgeber eine Stelle besetzen möchten, erfasst das Anfrageformular die Angaben, die das erste Gespräch brauchbar machen.',
      breadcrumb: 'Kontakt',
      sections: [
        {
          heading: 'Was in die Nachricht gehört',
          body: [
            'Bei einer Personalanfrage: die Tätigkeit, der Standort, das Schichtmodell und die Befähigung, die die Arbeit erfordert. Für alles Übrige genügt eine kurze Beschreibung dessen, was Sie suchen.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
      },
    },
  },

  'specialist-recruitment': {
    de: {
      title: 'Fachkräfterekrutierung: worin sie sich von operativer Besetzung unterscheidet',
      description:
        'Fachkräfte- und Technikrekrutierung: worin sie sich von der Volumenbesetzung unterscheidet, welche Berufsfamilien sie umfasst, was in die Stellenbeschreibung gehört und wie die Suche abläuft.',
      h1: 'Fachkräfterekrutierung: worin sie sich von operativer Besetzung unterscheidet',
      intro:
        'Zwanzig Plätze an einer Linie zu besetzen und eine einzelne Stelle als Einrichter oder Qualitätstechniker zu besetzen sind zwei verschiedene Disziplinen, auch wenn beides Rekrutierung heißt. Bei operativen Rollen arbeiten Sie mit einem breiten Bewerberkreis, und über das Ergebnis entscheidet die Organisation der Auswahl; bei Fachpositionen ist der Kreis der Menschen, die die Tätigkeit können und zugleich ausüben dürfen, um ein Vielfaches enger, und ein Teil von ihnen ist an Befähigungsnachweise gebunden.',
      breadcrumb: 'Fachkräfterekrutierung',
      sections: [
        {
          heading: 'Worin sich Fachrekrutierung strukturell unterscheidet',
          body: [
            'Der erste Unterschied ist die Zahl. Bei Hilfs- und Bedienrollen ist die Einstiegshürde niedrig und der Kreis der Menschen, die anfangen können, breit. Bei einem qualifizierten Beruf ergibt sich der Kreis aus Ausbildung, Erfahrung an einer bestimmten Technologie oder einem gültigen Nachweis – und er verengt sich von dort weiter.',
            'Der zweite Unterschied liegt im Verhalten der Kandidatinnen und Kandidaten. Menschen mit gefragter Qualifikation haben in der Regel Arbeit und suchen nicht aktiv; sie reagieren daher wenig auf Anzeigen und haben oft keinen Lebenslauf vorbereitet. Die Ansprache erfolgt deshalb gezielt, und die erste Reaktion fällt meist zurückhaltend aus.',
          ],
        },
        {
          heading: 'Berufsfamilien, die wir abdecken',
          body: [
            'Unser Zuschnitt geht von Produktion, Lager und Logistik aus und setzt sich in den technischen und fachlichen Rollen fort, die an diese Betriebe anschließen. Jede Familie hat eine eigene Seite, weil sich unterscheidet, was die Besetzung tatsächlich blockiert – einmal ein Nachweis, einmal das Schichtmodell.',
          ],
        },
        {
          heading: 'Befähigungsnachweise: was den Eintritt wirklich blockiert',
          body: [
            'Bei vielen technischen Tätigkeiten entscheidet nicht allein das Können, sondern die Berechtigung zur Ausübung. Die fachliche Befähigung für Arbeiten an elektrischen Anlagen richtet sich nach der Regierungsverordnung über die fachliche Befähigung in der Elektrotechnik, die die zuvor angewandte Verordnung abgelöst hat.',
            'Für die Rekrutierung folgt daraus praktisch: Nachweise haben eine Gültigkeit und einen begrenzten Umfang, sie müssen vor dem Eintritt gelesen und nicht nur erfasst werden.',
          ],
        },
        {
          heading: 'Was Sie auf diesen Seiten nicht finden',
          body: [
            'Wir nennen keine Gehaltsniveaus und keine Besetzungsdauern. Gehaltsspannen für einen bestimmten Beruf und eine bestimmte Region gehören in das offizielle Informationssystem über Durchschnittsverdienste; Arbeitsmarktdaten veröffentlichen das Ministerium für Arbeit und Soziales, das Arbeitsamt der Tschechischen Republik und das Tschechische Statistische Amt; Anforderungsprofile einzelner Berufe führt das nationale Berufsverzeichnis.',
            'Auch der Umfang dieser Seiten ist begrenzt. Dieser Bereich betrifft technische und fachliche Rollen im Umfeld von Produktion, Lager und Logistik einschließlich der ersten Führungsebene. Die Suche für die Unternehmensleitung, psychodiagnostische Verfahren und die Übernahme einer gesamten Rekrutierungsfunktion gehören nicht dazu.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Beschreiben Sie die Position, die erforderliche Qualifikation und den Arbeitsplatz. Wir melden uns und besprechen, was die Besetzung erfordert.',
      },
    },
  },

  'how-agency-works': {
    de: {
      title: 'Wie eine Personalagentur funktioniert: Modelle und Regeln',
      description:
        'Wie eine Personalagentur in Tschechien funktioniert – Personalvermittlung gegenüber Arbeitnehmerüberlassung, die Erlaubnis zur Arbeitsvermittlung und das Dreiecksverhältnis zwischen Agentur, Mitarbeiter und Unternehmen.',
      h1: 'Wie eine Personalagentur funktioniert: Modelle und Regeln',
      intro:
        'Eine Personalagentur bringt Unternehmen, die Mitarbeiterinnen und Mitarbeiter suchen, mit Menschen zusammen, die Arbeit suchen. In der Praxis bietet sie zwei Hauptmodelle: die Suche einer Kandidatin oder eines Kandidaten für die direkte Anstellung im Unternehmen (Personalvermittlung) und die Arbeitnehmerüberlassung, bei der die Person bei der Agentur angestellt ist und einem Einsatzunternehmen vorübergehend überlassen wird. Diese Seite erklärt, wie beide Modelle funktionieren und welche Regeln gelten.',
      breadcrumb: 'Wie eine Personalagentur funktioniert',
      sections: [
        {
          heading: 'Die zwei Grundmodelle',
          body: [
            'Bei der Personalvermittlung sucht und sichtet die Agentur Kandidatinnen und Kandidaten vor, und das Unternehmen schließt das Arbeitsverhältnis mit der ausgewählten Person selbst. Bei der Arbeitnehmerüberlassung bleibt die Agentur Arbeitgeber und überlässt die Person dem Einsatzunternehmen vorübergehend.',
          ],
        },
        {
          heading: 'Regeln und Erlaubnis',
          body: [
            'Für die Arbeitsvermittlung muss eine Agentur eine gültige Erlaubnis nach dem tschechischen Beschäftigungsgesetz besitzen. Bei der Arbeitnehmerüberlassung gilt die Anforderung vergleichbarer Lohn- und Arbeitsbedingungen gegenüber den Stammbeschäftigten des Einsatzunternehmens.',
          ],
        },
        {
          heading: 'Das Dreiecksverhältnis',
          body: [
            'Bei der Arbeitnehmerüberlassung entsteht ein Verhältnis zwischen drei Parteien: der Agentur als formalem Arbeitgeber, der überlassenen Person und dem Einsatzunternehmen, in dem die Arbeit geleistet wird. Jede Seite hat Rechte und Pflichten, die in der vertraglichen Dokumentation klar geregelt sein sollten.',
          ],
        },
      ],
      cta: {
        label: 'Für Arbeitgeber',
        targetConceptId: 'for-employers',
      },
    },
  },

  'employee-turnover': {
    de: {
      title: 'Mitarbeiterfluktuation: was sie ist und wie Sie sie verfolgen',
      description:
        'Mitarbeiterfluktuation – was sie ist, wie Sie sie im eigenen Unternehmen messen und warum sie Kosten und Leistung beeinflusst. Ein praktischer Blick für Arbeitgeber, ohne erfundene Benchmarks.',
      h1: 'Mitarbeiterfluktuation: was sie ist und wie Sie sie verfolgen',
      intro:
        'Mitarbeiterfluktuation drückt aus, wie häufig Menschen ein Unternehmen verlassen und ersetzt werden. Für Arbeitgeber ist sie deshalb wichtig, weil Abgänge Kosten für Rekrutierung, Einarbeitung und einen vorübergehenden Leistungsausfall mit sich bringen. Diese Seite erklärt, was Fluktuation ist, wie Sie sie im eigenen Unternehmen einfach messen und wie Sie sie interpretieren – ohne erfundene Benchmarks.',
      breadcrumb: 'Mitarbeiterfluktuation',
      sections: [
        {
          heading: 'Was Fluktuation umfasst',
          body: [
            'Fluktuation beschreibt die Bewegung von Beschäftigten aus dem Unternehmen heraus und ihren Ersatz. Unterschieden wird zwischen Abgängen auf Wunsch der Beschäftigten und auf Veranlassung des Arbeitgebers; für die Steuerung der Stabilität ist meist die freiwillige Fluktuation die interessantere, weil sich Arbeitsbedingungen auf sie auswirken können.',
          ],
        },
        {
          heading: 'Wie Sie Fluktuation messen',
          body: [
            'Die Grundkennzahl setzt die Zahl der Abgänge in einem Zeitraum ins Verhältnis zur durchschnittlichen Beschäftigtenzahl. Sinnvoll ist, den Verlauf über die Zeit und die Unterschiede zwischen Teams oder Positionen zu betrachten, statt sich mit fremden Zahlen zu vergleichen. Diese Seite nennt bewusst kein „übliches" Niveau.',
          ],
        },
        {
          heading: 'Welche Entscheidung daraus folgt',
          body: [
            'Sobald Sie Fluktuation messen, erkennen Sie, wo sie am höchsten ist und ob sie steigt. Das ist die Grundlage für gezielte Maßnahmen – in der Rekrutierung, im Onboarding oder bei den Arbeitsbedingungen. Ohne Messung lässt sich das Problem schwer steuern.',
          ],
        },
      ],
      cta: {
        label: 'Für Arbeitgeber',
        targetConceptId: 'for-employers',
      },
    },
  },

  'production-workers': {
    de: {
      title: 'Produktionsmitarbeiter: Rekrutierung und Personalsicherung',
      description:
        'Produktionsmitarbeiter – wie Sie einen Fertigungsbetrieb personell sichern: Rollen, Rekrutierungswege, Einarbeitung und Kapazitätsplanung für die Kontinuität der Produktion. Ein praktischer Überblick ohne erfundene Zahlen.',
      h1: 'Produktionsmitarbeiter: Rekrutierung und Personalsicherung',
      intro:
        'Die personelle Sicherung der Produktion verbindet die Besetzung einzelner Stellen mit der Notwendigkeit, den Betrieb auch bei schwankenden Aufträgen und bei Fluktuation aufrechtzuerhalten. Fertigungsunternehmen kombinieren üblicherweise Bedien-, Montage- und Hilfsrollen im Schichtbetrieb, und jede stellt andere Anforderungen an Rekrutierung und Einarbeitung. Diese Seite gibt einen Überblick über das Vorgehen.',
      breadcrumb: 'Produktionsmitarbeiter',
      sections: [
        {
          heading: 'Was den Fertigungsbetrieb ausmacht',
          body: [
            'Produktion läuft üblicherweise im Schichtbetrieb und ist auf Kontinuität angewiesen – eine personelle Lücke wirkt sich unmittelbar auf die Auftragserfüllung aus. Die Positionen reichen von der Maschinenbedienung über die manuelle Montage bis zu Hilfs- und Transporttätigkeiten, woraus unterschiedliche Qualifikationsanforderungen folgen.',
          ],
        },
        {
          heading: 'Überlegungen zur Rekrutierung',
          body: [
            'Bei Produktionsstellen bewährt sich eine Kombination der Wege: direkte Rekrutierung für den festen Kern, Arbeitnehmerüberlassung für die flexible Abdeckung von Spitzen und bei Mangelberufen die Gewinnung aus dem Ausland. Die Wahl hängt von der Dringlichkeit ab und davon, ob es sich um einen dauerhaften oder einen zeitweiligen Bedarf handelt.',
          ],
        },
        {
          heading: 'Einarbeitung und Eintritt',
          body: [
            'Der Eintritt in die Produktion umfasst die Arbeitsschutzunterweisung, die Einführung in Arbeitsplatz und Maschinen sowie die schrittweise Einarbeitung. Bei Maschinen- und Montagepositionen ist die Zeit bis zur vollen Produktivität länger; es lohnt sich daher, die Einarbeitung gut vorzubereiten und eine feste Ansprechperson zu benennen.',
          ],
        },
        {
          heading: 'Kapazitätsplanung',
          body: [
            'Die Planung der Personalkapazität folgt aus dem Produktionsplan und seiner Saisonalität. Sinnvoll ist, den dauerhaften Bedarf von Spitzen zu trennen und jedem einen anderen Weg zuzuordnen – einen festen Kern und flexible Kapazität. Bei der Gewinnung aus dem Ausland ist die administrative Vorlaufzeit einzuplanen.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Beschreiben Sie die Positionen und das Schichtmodell – wir melden uns bei Ihnen.',
      },
    },
  },
}
