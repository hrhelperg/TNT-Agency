import type { LocaleCorpus } from '../types'

/**
 * L1 Branchen-Cluster — Deutsch.
 *
 * Fünf Branchen, die im Tschechischen dieselbe Seitenform teilen und bei
 * mechanischer Übersetzung zu fünf nahezu identischen deutschen Seiten würden.
 * Das tun sie nicht, weil jede Quelle echten branchenspezifischen Gehalt trägt:
 * Berechtigungen für Flurförderzeuge im Lager, die Verkettung der Glieder und
 * die gesetzlichen Grenzen flexibler Abdeckung in der Logistik, Projekt- und
 * Witterungsabhängigkeit am Bau, Hygiene und Kältebereiche in der
 * Lebensmittelproduktion, Linientakt und Arbeitszeitverteilung im Automotive.
 *
 * Alle fünf tschechischen Quellen verweigern Löhne und Stellenzahlen; alle fünf
 * Übersetzungen tun dasselbe. Rechtsaussagen sind als tschechisches Recht
 * gekennzeichnet.
 */
export const DE_INDUSTRIES: LocaleCorpus = {
  'warehouse-workers': {
    de: {
      title: 'Lagermitarbeiter: Rekrutierung und personelle Sicherung des Lagers',
      description:
        'Ein Lager personell sichern: Rollen, Besetzungswege, Berechtigungen für Flurförderzeuge, Einarbeitung vor der Spitze und Kapazitätsplanung für stoßweise Mengen. Ohne Lohnangaben.',
      h1: 'Lagermitarbeiter: Rekrutierung und personelle Sicherung des Lagers',
      intro:
        'Lagermitarbeiterinnen und -mitarbeiter sichern Wareneingang, Einlagerung, Kommissionierung und Versand und sind die Grundlage jedes Lagerbetriebs. Kennzeichnend sind stoßweise Mengen und Schichtbetrieb, was die personelle Sicherung zur zentralen Frage macht. Diese Seite gibt einen Überblick, wie sich ein Lager personell sichern lässt — von den Besetzungswegen bis zum Umgang mit Spitzen. Löhne und Zahlen offener Stellen nennen wir nicht; es ist ein praktischer Rahmen, den jedes Unternehmen mit eigenen, geprüften Daten füllt. Der Schwerpunkt liegt auf Flexibilität und darauf, das Stammpersonal zu halten.',
      breadcrumb: 'Lagermitarbeiter',
      sections: [
        {
          heading: 'Was den Lagerbetrieb ausmacht',
          body: [
            'Lagerarbeit umfasst Wareneingang, Einlagerung, Kommissionierung, Verpackung und Versand. Sie ist meist körperlich und an das Auftragsvolumen gebunden. Der Betrieb läuft häufig in Schichten, und das Arbeitsvolumen schwankt stoßweise, besonders in Spitzenzeiten.',
            'Ein Teil der Positionen erfordert eine Berechtigung, etwa für Flurförderzeuge, was Besetzung und Einarbeitung beeinflusst.',
          ],
        },
        {
          heading: 'Wie Sie Lagerpersonal gewinnen',
          body: [
            'Für ein Lager bewährt sich die Verbindung eines festen Kerns mit flexibler Kapazität. Stammkräfte besetzt man sinnvoll direkt und stabilisiert sie über die Bindung; stoßweise Mengen deckt die Arbeitnehmerüberlassung ab. Bei Mangel erweitert die Gewinnung aus dem Ausland den Kreis.',
          ],
        },
        {
          heading: 'Einarbeitung und Sicherheit',
          body: [
            'Der Eintritt umfasst die Arbeitsschutzunterweisung, die Einführung in die Lagerprozesse und — bei Flurförderzeugen — die entsprechende Berechtigung und Einweisung.',
            'Eine schnelle und übersichtliche Einarbeitung ist vor allem vor saisonalen Spitzen wichtig, wenn mehrere Menschen gleichzeitig eintreten.',
          ],
        },
        {
          heading: 'Kapazitätsplanung im Lager',
          body: [
            'Die Lagerkapazität plant man sinnvoll nach Auftragsvolumen und Saisonalität, mit Vorlauf vor den Spitzen. Die Trennung in dauerhafte und stoßweise Positionen erlaubt es, auf Mengen zu reagieren, ohne außerhalb der Spitze unnötige Kosten zu tragen.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das Ministerium für Arbeit und Soziales und das Arbeitsamt der Tschechischen Republik. Zahlen nennen wir hier nicht.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Beschreiben Sie Positionen, Schichtmodell und Standort — wir melden uns.',
      },
    },
  },

  'logistics-workers': {
    de: {
      title: 'Logistikmitarbeiter: personelle Sicherung des Logistikbetriebs',
      description:
        'Logistik personell sichern: Rollen entlang der Kette, warum eine Lücke an einer Stelle den ganzen Fluss bremst, Wege zur Abdeckung saisonaler Schwankungen und die zulässigen Formen flexibler Abdeckung nach tschechischem Recht.',
      h1: 'Logistikmitarbeiter: personelle Sicherung des Logistikbetriebs',
      intro:
        'Die Logistik verbindet Wareneingang, Lagerung, Kommissionierung und Distribution, und ihre personelle Sicherung reagiert empfindlich auf saisonale Nachfrageschwankungen. Für Arbeitgeber heißt das, flexibel auf ein wechselndes Arbeitsvolumen reagieren zu müssen. Diese Seite gibt einen Überblick, wie sich ein Logistikbetrieb personell sichern lässt — von den Besetzungswegen bis zum Umgang mit Spitzen. Löhne und Zahlen offener Stellen nennen wir nicht; es ist ein praktischer Rahmen, den jedes Unternehmen mit eigenen, geprüften Daten füllt. Der Schwerpunkt liegt auf Flexibilität und darauf, den festen Kern zu halten.',
      breadcrumb: 'Logistikmitarbeiter',
      sections: [
        {
          heading: 'Was den Logistikbetrieb ausmacht',
          body: [
            'Die Logistik umfasst eine Reihe aufeinanderfolgender Rollen — von Lager- und Handlingpositionen bis zur Unterstützung von Distribution und Versand — und läuft häufig in Schichten. Das Arbeitsvolumen schwankt deutlich mit Saison und Nachfrage, was die Planung des Stammpersonals erschwert.',
            'Weil die Glieder verkettet sind, bremst eine Lücke an einer Stelle den gesamten Warenfluss. Genau darin unterscheidet sich die Logistik von einem einzelnen Lager: Die Kosten einer unbesetzten Stelle bleiben nicht auf sie beschränkt.',
          ],
        },
        {
          heading: 'Wie Sie für die Logistik gewinnen',
          body: [
            'Einen schwankenden Bedarf deckt die Verbindung eines festen Kerns mit flexibler Überlassungskapazität gut ab, die sich zur Spitze erhöhen und danach senken lässt. Bei Mangelberufen erweitert die Gewinnung aus dem Ausland den Kreis; den festen Kern stabilisiert man über die Bindung.',
          ],
        },
        {
          heading: 'Einarbeitung und Prozesse',
          body: [
            'Der Eintritt in die Logistik umfasst die Arbeitsschutzunterweisung, die Einführung in Prozesse und Systeme und bei Technik die entsprechenden Berechtigungen. Eine übersichtliche Einweisung ist vor allem vor saisonalen Spitzen wichtig, wenn mehrere Menschen gleichzeitig eintreten.',
          ],
        },
        {
          heading: 'Kapazitätsplanung über die Zeit',
          body: [
            'Die Planung geht vom erwarteten Volumen und seiner Saisonalität aus. Die Trennung des Bedarfs in dauerhaft und stoßweise und seine rechtzeitige Sicherung erlauben es, Spitzen ohne Ausfälle und ohne unnötige Kosten außerhalb der Saison zu bewältigen.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das Ministerium für Arbeit und Soziales und das Arbeitsamt der Tschechischen Republik. Zahlen nennen wir hier nicht.',
          ],
        },
        {
          heading: 'Zulässige Formen flexibler Abdeckung von Spitzen',
          body: [
            'Saisonale Spitzen in der Logistik lassen sich in mehreren Formen rechtmäßig abdecken: durch befristete Arbeitsverhältnisse, durch Vereinbarungen außerhalb eines Arbeitsverhältnisses und durch vorübergehende Zuweisung über eine Personalagentur. Für jede gelten nach dem tschechischen Arbeitsgesetzbuch und dem tschechischen Beschäftigungsgesetz andere Regeln.',
            'Sowohl die Aneinanderreihung befristeter Arbeitsverhältnisse als auch der Umfang jener Vereinbarungen sind durch das tschechische Arbeitsgesetzbuch begrenzt. Die genauen Grenzen sind in der geltenden Fassung des Gesetzes zu prüfen; Zahlen nennen wir hier nicht.',
            'Bei der vorübergehenden Zuweisung müssen überlassene Beschäftigte vergleichbare Lohn- und Arbeitsbedingungen wie Stammbeschäftigte auf vergleichbarer Position haben, und die Personalagentur muss eine Erlaubnis besitzen.',
          ],
        },
      ],
      cta: {
        label: 'Saisonale Kapazität',
        targetConceptId: 'seasonal-capacity',
        note: 'Wie sich eine wiederkehrende Spitze planen statt beantworten lässt.',
      },
    },
  },

  'construction-workers': {
    de: {
      title: 'Baumitarbeiter: personelle Sicherung von Bauvorhaben',
      description:
        'Bauvorhaben personell sichern: Projekt- und Witterungsabhängigkeit, die Mischung aus qualifizierten Gewerken und Hilfspositionen, und was in den eigenen Kern gehört und was flexibel oder über Nachunternehmer abgedeckt wird.',
      h1: 'Baumitarbeiter: personelle Sicherung von Bauvorhaben',
      intro:
        'Baumitarbeiterinnen und -mitarbeiter setzen Bauaufträge um, und der Bedarf ändert sich mit den laufenden Projekten, der Saison und dem Wetter. Die personelle Sicherung am Bau beruht deshalb darauf, die Kapazität mit dem Projektzeitplan in Einklang zu bringen. Diese Seite gibt einen Überblick, wie sich eine Baustelle personell sichern lässt — von der Mischung der Gewerke bis zu den Überlegungen zu Besetzung und Planung. Löhne und Zahlen nennen wir nicht; es ist ein praktischer Rahmen für Bauunternehmen, der Projektarbeit, Saisonalität und den Bedarf an qualifizierten wie an Hilfsgewerken berücksichtigt.',
      breadcrumb: 'Baumitarbeiter',
      sections: [
        {
          heading: 'Was den Bau ausmacht',
          body: [
            'Bauarbeiten sind häufig an konkrete Projekte mit definiertem Anfang und Ende gebunden, unterliegen Saison und Witterung und verbinden qualifizierte Handwerksberufe mit Hilfspositionen. Das macht die Planung eines festen Stands zur Herausforderung.',
            'Der Bedarf ändert sich mit der Projektphase und mit der Zahl paralleler Aufträge — dasselbe Unternehmen kann innerhalb eines Jahres unterbesetzt und überbesetzt sein.',
          ],
        },
        {
          heading: 'Wie Sie Baupositionen besetzen',
          body: [
            'Einen projektbezogenen Bedarf lässt sich mit einer Verbindung aus eigenem Kern, Nachunternehmern und flexibler Kapazität decken. Qualifizierte Gewerke hält man sinnvoll im eigenen Kern und stabilisiert sie; Hilfspositionen haben eine niedrigere Einstiegshürde. Bei Mangelgewerken erweitert die Gewinnung aus dem Ausland den Kreis.',
          ],
        },
        {
          heading: 'Einarbeitung und Sicherheit auf der Baustelle',
          body: [
            'Der Eintritt auf einer Baustelle legt hohen Wert auf Sicherheit — Arbeitsschutzunterweisung, Einführung in Baustelle und Gefährdungen und bei einigen Arbeiten erforderliche Berechtigungen.',
            'Eine gute Einweisung und eine klare Rollenverteilung senken das Unfallrisiko. Auf einer Baustelle, auf der mehrere Gewerke und Nachunternehmer gleichzeitig arbeiten, ist diese Verteilung keine Formalie.',
          ],
        },
        {
          heading: 'Planung nach dem Projektzeitplan',
          body: [
            'Die Kapazitätsplanung folgt dem Auftragszeitplan und der Saisonalität. Es lohnt sich, vorab zu wissen, welche Gewerke im eigenen Kern bleiben und was flexibel oder über Nachunternehmer abgedeckt wird — und bei Gewinnung aus dem Ausland die Zeit für Erlaubnisse einzuplanen.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das Ministerium für Arbeit und Soziales und das Arbeitsamt der Tschechischen Republik. Zahlen nennen wir hier nicht.',
          ],
        },
      ],
      cta: {
        label: 'Personalplanung',
        targetConceptId: 'recruitment-planning',
        note: 'Einen Personalplan aus einem Zeitplan ableiten statt aus einem Mangel.',
      },
    },
  },

  'food-production-workers': {
    de: {
      title: 'Lebensmittelproduktion: personelle Sicherung des Betriebs',
      description:
        'Lebensmittelproduktion personell sichern: Hygieneanforderungen, Kontinuität und Schichten, was die Einarbeitung abdecken muss und welche Pflichten nach tschechischem Recht für Kühl- und Gefrierbereiche gelten.',
      h1: 'Lebensmittelproduktion: personelle Sicherung des Betriebs',
      intro:
        'Die Lebensmittelproduktion hat ihre Besonderheiten — strenge Hygieneanforderungen, die Notwendigkeit eines kontinuierlichen Betriebs und häufig ein Schichtmodell. Die personelle Sicherung beruht hier nicht nur auf der Besetzung von Stellen, sondern auch auf der Einhaltung von Hygiene und Lebensmittelsicherheit. Diese Seite gibt einen Überblick, wie sich ein Lebensmittelbetrieb personell sichern lässt — von den Besetzungswegen bis zu Einarbeitung und Planung. Löhne und Zahlen nennen wir nicht; es ist ein praktischer Rahmen für Lebensmittelunternehmen, der Hygiene, Kontinuität und Schichtbetrieb sowie die Anforderungen an die Einarbeitung berücksichtigt.',
      breadcrumb: 'Lebensmittelproduktion',
      sections: [
        {
          heading: 'Was die Lebensmittelproduktion ausmacht',
          body: [
            'Ein Lebensmittelbetrieb legt Wert auf Hygiene, die Einhaltung von Verfahren und Lebensmittelsicherheit und verlangt in der Regel eine kontinuierliche Produktion über Schichten. Die Positionen umfassen Verarbeitung, Herstellung und Verpackung und häufig auch Kontrollrollen.',
            'Für einen Teil der Positionen können besondere gesundheitliche und hygienische Anforderungen gelten, die den Eintritt beeinflussen.',
          ],
        },
        {
          heading: 'Wie Sie für einen Lebensmittelbetrieb gewinnen',
          body: [
            'Ein fester Kern, ergänzt um flexible Kapazität für Schwankungen, bewährt sich in der Lebensmittelproduktion. Ein Teil der Positionen hat eine niedrigere Einstiegshürde und lässt sich schneller besetzen; bei Mangel erweitert die Gewinnung aus dem Ausland den Kreis.',
            'Hygiene- und Schichtanforderungen gehören in die Anzeige und nicht erst ins Gespräch — an ihnen entscheiden Kandidatinnen und Kandidaten selbst.',
          ],
        },
        {
          heading: 'Einarbeitung in Hygiene und Sicherheit',
          body: [
            'Neben der Arbeitsschutzunterweisung konzentriert sich die Einarbeitung in der Lebensmittelproduktion auf Hygieneverfahren und Lebensmittelsicherheit. Für einige Positionen können Gesundheitsnachweise oder die Erfüllung hygienischer Anforderungen nötig sein; die konkreten Pflichten ergeben sich aus den Vorschriften.',
          ],
        },
        {
          heading: 'Planung der Betriebskontinuität',
          body: [
            'Weil die Lebensmittelproduktion oft Kontinuität verlangt, plant man die Schichtabdeckung besser mit Reserve und mit Mehrfachqualifizierung. Flexible Kapazität hilft, Schwankungen aufzufangen, ohne den Betrieb zu gefährden.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das Ministerium für Arbeit und Soziales und das Arbeitsamt der Tschechischen Republik. Zahlen nennen wir hier nicht.',
          ],
        },
        {
          heading: 'Kühl- und Gefrierbereiche und der Schutz der Gesundheit',
          body: [
            'Ein Teil von Verarbeitung, Herstellung und Versand läuft in gekühlten, gefrorenen oder anderweitig temperaturgeführten Bereichen — Fleisch, Molkerei- und Tiefkühlprodukte, die Kühlkette. Diese Umgebung unterscheidet sich von einer gewöhnlichen Produktionshalle und stellt besondere Anforderungen an den Gesundheitsschutz.',
            'Nach dem tschechischen Arbeitsgesetzbuch hat die Arbeitgeberin die Pflicht, eine sichere und die Gesundheit nicht gefährdende Arbeitsumgebung sicherzustellen und die Arbeitsorganisation daran anzupassen; diese Pflicht erfasst auch die Arbeit bei niedrigen Temperaturen. Das tschechische Arbeitsgesetzbuch verlangt zudem, persönliche Schutzausrüstung dort unentgeltlich bereitzustellen, wo Umgebung und Gefährdungen es erfordern.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Nennen Sie uns die Umgebung und das Schichtmodell — beides verengt, wer realistisch anfangen kann.',
      },
    },
  },

  'automotive-workers': {
    de: {
      title: 'Automotive-Mitarbeiter: personelle Sicherung des Betriebs',
      description:
        'Automotive personell sichern: Linientakt und Qualität, Kontinuität über Schichten, Produktionsanläufe und wie das tschechische Recht die Arbeitszeitverteilung im Mehrschicht- und Dauerbetrieb rahmt.',
      h1: 'Automotive-Mitarbeiter: personelle Sicherung des Betriebs',
      intro:
        'Die Automobilindustrie gehört zu den anspruchsvollen Fertigungsbranchen, mit Betonung auf Linientakt, Qualität und Kontinuität im Schichtbetrieb. Die personelle Sicherung beruht hier darauf, die Linie am Laufen zu halten und die Qualitätsanforderungen einzuhalten. Diese Seite gibt einen Überblick, wie sich ein Automotive-Betrieb personell sichern lässt — von den Besetzungswegen bis zur Schichtplanung. Löhne und Zahlen nennen wir nicht; es ist ein praktischer Rahmen für Unternehmen der Branche, der Linienarbeit, Qualität und Schichtbetrieb sowie die Anforderungen an die Einarbeitung berücksichtigt.',
      breadcrumb: 'Automotive-Mitarbeiter',
      sections: [
        {
          heading: 'Was den Automotive-Betrieb ausmacht',
          body: [
            'Automotive ist gekennzeichnet durch Arbeit an Montagelinien mit vorgegebenem Takt, hohe Qualitätsanforderungen und Kontinuität über Schichten. Eine personelle Lücke oder eine Qualitätsabweichung wirkt sich auf die gesamte Linie und auf die daran hängenden Lieferungen aus.',
            'Die Betriebe stehen häufig in Lieferketten mit Druck auf Zuverlässigkeit und Stabilität — Abdeckung ist deshalb eher eine Liefer- als nur eine Personalfrage.',
          ],
        },
        {
          heading: 'Wie Sie für Automotive gewinnen',
          body: [
            'Ein fester Kern für Qualität und Kontinuität, ergänzt um flexible Kapazität für Produktionsschwankungen, bewährt sich hier. Die Arbeitnehmerüberlassung hilft, Anläufe und Spitzen abzudecken; bei Mangel erweitert die Gewinnung aus dem Ausland den Kreis.',
            'Zuverlässigkeit und die Bereitschaft zur Linienarbeit zählen ebenso wie vorherige Erfahrung.',
          ],
        },
        {
          heading: 'Einarbeitung auf Linie und Qualität',
          body: [
            'Neben der Arbeitsschutzunterweisung konzentriert sich die Einarbeitung auf die Arbeit im Linientakt, auf Qualitätsstandards und auf die konkreten Arbeitsgänge. Ein vorbereitetes und wiederholbares Onboarding ist besonders beim Produktionsanlauf oder bei mehreren gleichzeitigen Eintritten wichtig.',
          ],
        },
        {
          heading: 'Planung von Schichten und Anläufen',
          body: [
            'Die Kapazitätsplanung muss Linientakt, Schichten und Produktionsanläufe in Einklang bringen. Mehrfachqualifizierung, eine Reserve für Ausfälle und die rechtzeitige Sicherung flexibler Kapazität helfen dabei. Bei Gewinnung aus dem Ausland ist die Zeit für Erlaubnisse einzuplanen.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das Ministerium für Arbeit und Soziales und das Arbeitsamt der Tschechischen Republik. Zahlen nennen wir hier nicht.',
          ],
        },
        {
          heading: 'Dauerbetrieb und die Verteilung der Arbeitszeit',
          body: [
            'Automotive läuft typischerweise mehrschichtig oder durchgehend. Das tschechische Arbeitsgesetzbuch unterscheidet die gleichmäßige von der ungleichmäßigen Verteilung der Arbeitszeit und setzt den Rahmen für Schicht- und Dauerbetriebe, in den der Linienplan passen muss.',
            'Das Arbeitszeitkonto ist nach dem tschechischen Arbeitsgesetzbuch eine besondere Art der Arbeitszeitverteilung, die sich nur durch einen Kollektivvertrag oder eine innerbetriebliche Vorschrift einführen lässt. Es passt zu Betrieben mit schwankender Produktion — Anläufen neuer Modelle, Schwankungen der Abrufe —, weil es erlaubt, die geleistete Zeit über einen Ausgleichszeitraum auszugleichen.',
            'Nachtarbeit und die Nachtschicht haben im tschechischen Arbeitsgesetzbuch eine eigene Regelung.',
          ],
        },
      ],
      cta: {
        label: 'Personal für Produktionsanlauf',
        targetConceptId: 'production-ramp-up',
        note: 'Eine neue Linie oder Schicht besetzen, rückwärts vom Starttermin geplant.',
      },
    },
  },
}
