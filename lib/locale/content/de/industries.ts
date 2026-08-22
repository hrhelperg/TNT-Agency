import type { LocaleCorpus } from '../types'

/**
 * L1 Branchen-Cluster – Deutsch.
 *
 * Fünf Branchen, die im Tschechischen dieselbe Seitenform teilen und bei
 * mechanischer Übersetzung zu fünf nahezu identischen deutschen Seiten würden.
 * Das tun sie nicht, weil jede Quelle echten branchenspezifischen Gehalt trägt:
 * Berechtigungen für Flurförderzeuge im Lager, die Verkettung der Glieder und
 * die gesetzlichen Grenzen flexibler Abdeckung in der Logistik, Projekt- und
 * Witterungsabhängigkeit am Bau, Hygiene und Kältebereiche in der
 * Lebensmittelproduktion, Linientakt und Arbeitszeitverteilung im Automotive.
 *
 * Die Aufzählungen der tschechischen Quellen stehen wieder als Listen da,
 * statt zu Prosa verrührt zu werden.
 *
 * Alle fünf tschechischen Quellen verweigern Löhne und Stellenzahlen; alle fünf
 * Übersetzungen tun dasselbe. Jede rechtlich aufgeladene Aussage ist als
 * tschechisches Recht gekennzeichnet – spätestens in der Meta-Beschreibung,
 * damit eine deutsche Leserin sie nirgends als deutsches Recht lesen kann.
 */
export const DE_INDUSTRIES: LocaleCorpus = {
  'warehouse-workers': {
    de: {
      title: 'Lagermitarbeiter: Personalgewinnung und personelle Sicherung des Lagers',
      description:
        'Ein Lager in Tschechien personell sichern: Besetzungswege, Berechtigungen für Flurförderzeuge, Einarbeitung vor der Spitze und Planung stoßweiser Mengen. Ohne Lohnangaben.',
      h1: 'Lagermitarbeiter: Personalgewinnung und personelle Sicherung des Lagers',
      intro:
        'Lagermitarbeiterinnen und -mitarbeiter sichern Wareneingang, Einlagerung, Kommissionierung und Versand und sind die Grundlage jedes Lagerbetriebs. Kennzeichnend sind stoßweise Mengen und Schichtbetrieb, was die personelle Sicherung zur zentralen Frage macht. Diese Seite gibt einen Überblick, wie sich ein Lager in Tschechien personell sichern lässt: welche Positionen eine Berechtigung für Flurförderzeuge voraussetzen und wie sich stoßweise Mengen abdecken lassen, ohne den festen Kern auszudünnen. Löhne und Zahlen offener Stellen nennen wir nicht; es ist ein praktischer Rahmen, den jedes Unternehmen mit eigenen, geprüften Daten füllt. Der Schwerpunkt liegt auf Flexibilität und darauf, das Stammpersonal zu halten.',
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
            'Für ein Lager bewährt sich die Verbindung eines festen Kerns mit flexibler Kapazität.',
          ],
          list: {
            intro: 'Die Wege der Besetzung:',
            items: [
              'Stammkräfte über Direktvermittlung und über die Bindung halten',
              'Stoßweise Mengen über die Arbeitnehmerüberlassung nach tschechischem Recht abdecken',
              'Positionen an Flurförderzeugen nach der jeweils erforderlichen Berechtigung besetzen',
              'Bei langfristigem Mangel den Kreis über die Personalgewinnung aus dem Ausland erweitern',
            ],
          },
        },
        {
          heading: 'Einarbeitung und Sicherheit',
          body: [
            'Der Eintritt umfasst die Arbeitsschutzunterweisung nach tschechischem Recht, die Einführung in die Lagerprozesse und – bei Flurförderzeugen – die entsprechende Berechtigung und Einweisung.',
            'Eine schnelle und übersichtliche Einarbeitung ist vor allem vor saisonalen Spitzen wichtig, wenn mehrere Menschen gleichzeitig eintreten.',
          ],
        },
        {
          heading: 'Kapazitätsplanung im Lager',
          body: [
            'Die Lagerkapazität plant man sinnvoll nach Auftragsvolumen und Saisonalität, mit Vorlauf vor den Spitzen. Die Trennung in dauerhafte und stoßweise Positionen erlaubt es, auf Mengen zu reagieren, ohne außerhalb der Spitze unnötige Kosten zu tragen.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das tschechische Ministerium für Arbeit und Soziales (MPSV) und das Arbeitsamt der Tschechischen Republik (Úřad práce ČR). Zahlen nennen wir hier nicht.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Beschreiben Sie Positionen, Schichtmodell und Standort – wir melden uns.',
      },
    },
  },

  'logistics-workers': {
    de: {
      title: 'Logistikmitarbeiter: personelle Sicherung des Logistikbetriebs',
      description:
        'Logistik in Tschechien personell sichern: warum eine Lücke den Warenfluss bremst, wie saisonale Schwankungen abgedeckt werden und welche Formen das tschechische Recht zulässt.',
      h1: 'Logistikmitarbeiter: personelle Sicherung des Logistikbetriebs',
      intro:
        'Die Logistik verbindet Wareneingang, Lagerung, Kommissionierung und Distribution, und ihre personelle Sicherung reagiert empfindlich auf saisonale Nachfrageschwankungen. Für Arbeitgeber heißt das, flexibel auf ein wechselndes Arbeitsvolumen reagieren zu müssen. Diese Seite gibt einen Überblick, wie sich ein Logistikbetrieb in Tschechien personell sichern lässt: warum eine Lücke an einer Stelle der Kette alles Nachgelagerte verlangsamt, warum die Besetzung vor der Saisonspitze geplant wird und nicht in ihr, und welche rechtlichen Formen die flexible Abdeckung nach tschechischem Recht annehmen kann. Löhne und Zahlen offener Stellen nennen wir nicht; es ist ein praktischer Rahmen, den jedes Unternehmen mit eigenen, geprüften Daten füllt. Der Schwerpunkt liegt auf Flexibilität und darauf, den festen Kern zu halten.',
      breadcrumb: 'Logistikmitarbeiter',
      sections: [
        {
          heading: 'Was den Logistikbetrieb ausmacht',
          body: [
            'Die Logistik umfasst eine Reihe aufeinanderfolgender Rollen – von Lager- und Handlingpositionen bis zur Unterstützung von Distribution und Versand – und läuft häufig in Schichten. Das Arbeitsvolumen schwankt deutlich mit Saison und Nachfrage, was die Planung des Stammpersonals erschwert.',
            'Weil die Glieder verkettet sind, bremst eine Lücke an einer Stelle den gesamten Warenfluss. Genau darin unterscheidet sich die Logistik von einem einzelnen Lager: Die Kosten einer unbesetzten Stelle bleiben nicht auf sie beschränkt.',
          ],
        },
        {
          heading: 'Wie Sie für die Logistik gewinnen',
          body: [
            'Einen schwankenden Bedarf deckt die Verbindung eines festen Kerns mit flexibler Kapazität einer tschechischen Personalagentur gut ab, die sich zur Spitze erhöhen und danach wieder senken lässt. Eine sofortige Verfügbarkeit sagen wir nicht zu.',
          ],
          list: {
            intro: 'Wie diese Verbindung in der Praxis aussieht:',
            items: [
              'Fester Kern über Direktvermittlung und über die Bindung',
              'Saisonale Schwankungen über Kapazität aus der Arbeitnehmerüberlassung',
              'Personalgewinnung aus dem Ausland bei Mangelberufen',
              'Die Personalgewinnung mit Vorlauf vor der Spitze planen',
            ],
          },
        },
        {
          heading: 'Einarbeitung und Prozesse',
          body: [
            'Der Eintritt in die Logistik umfasst die Arbeitsschutzunterweisung nach tschechischem Recht, die Einführung in Prozesse und Systeme und bei Technik die entsprechenden Berechtigungen. Eine übersichtliche Einweisung ist vor allem vor saisonalen Spitzen wichtig, wenn mehrere Menschen gleichzeitig eintreten.',
          ],
        },
        {
          heading: 'Kapazitätsplanung über die Zeit',
          body: [
            'Die Planung geht vom erwarteten Volumen und seiner Saisonalität aus. Die Trennung des Bedarfs in dauerhaft und stoßweise und seine rechtzeitige Sicherung erlauben es, Spitzen ohne Ausfälle und ohne unnötige Kosten außerhalb der Saison zu bewältigen.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das tschechische Ministerium für Arbeit und Soziales (MPSV) und das Arbeitsamt der Tschechischen Republik (Úřad práce ČR). Zahlen nennen wir hier nicht.',
          ],
        },
        {
          heading: 'Rechtlicher Rahmen der flexiblen Abdeckung von Spitzen in der Logistik',
          body: [
            'Saisonale Spitzen in der Logistik lassen sich in mehreren Formen rechtmäßig abdecken: durch ein befristetes Arbeitsverhältnis, durch Vereinbarungen außerhalb eines Arbeitsverhältnisses – im tschechischen Recht die dohoda o provedení práce (DPP) und die dohoda o pracovní činnosti (DPČ) – und durch die vorübergehende Zuweisung über eine tschechische Personalagentur. Für jede Form gelten nach dem tschechischen Arbeitsgesetzbuch und dem tschechischen Beschäftigungsgesetz andere Regeln.',
            'Sowohl die Aneinanderreihung befristeter Arbeitsverhältnisse als auch der Umfang jener Vereinbarungen sind durch das tschechische Arbeitsgesetzbuch begrenzt. Die genauen Grenzen sind in der geltenden Fassung des Gesetzes zu prüfen; Zahlen nennen wir hier nicht.',
            'Bei der vorübergehenden Zuweisung müssen überlassene Beschäftigte vergleichbare Arbeits- und Lohnbedingungen wie Stammbeschäftigte auf vergleichbarer Position haben, und die Personalagentur muss die tschechische Erlaubnis zur Arbeitsvermittlung besitzen. In unserem Ökosystem hält diese Erlaubnis die Personalagentur; die Plattform selbst hält sie nicht.',
            'Die Arbeitsschutzpflichten gegenüber den Menschen, die auf einem Standort arbeiten, trägt der Betreiber des Standorts – bei der Zuweisung das Einsatzunternehmen – unabhängig von der Form des Einsatzes: Erstunterweisung, Einführung in die Gefährdungen des Betriebs und Schutzausrüstung. Bei Nachtarbeit und bei risikobehafteten Handlingpositionen kommen arbeitsmedizinische Untersuchungen hinzu.',
          ],
          list: {
            items: [
              'Jeder Einsatz muss ordnungsgemäß zur tschechischen Sozial- und Krankenversicherung angemeldet und erfasst sein – sonst kann es sich um illegale Arbeit im Sinne des tschechischen Rechts handeln.',
              'Die Einhaltung der arbeitsrechtlichen Pflichten kontrolliert das tschechische Staatliche Arbeitsinspektionsamt (Státní úřad inspekce práce).',
              'Die Wahl der Form richtet sich sinnvollerweise nach Dauer und Wiederholbarkeit des Bedarfs – einmalige Aushilfe, wiederkehrende saisonale Spitze und langfristig schwankendes Volumen führen zu unterschiedlichen Lösungen.',
            ],
          },
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
        'Bauvorhaben in Tschechien personell sichern: Projekt- und Witterungsabhängigkeit, qualifizierte Gewerke und Hilfspositionen und was flexibel oder über Nachunternehmer läuft.',
      h1: 'Baumitarbeiter: personelle Sicherung von Bauvorhaben',
      intro:
        'Baumitarbeiterinnen und -mitarbeiter setzen Bauaufträge um, und der Bedarf ändert sich mit den laufenden Projekten, der Saison und dem Wetter. Die personelle Sicherung am Bau beruht deshalb darauf, die Kapazität mit dem Projektzeitplan in Einklang zu bringen. Diese Seite gibt einen Überblick, wie sich eine Baustelle in Tschechien personell sichern lässt: welche Schlüsselgewerke ein Unternehmen im eigenen Kern hält, welche Hilfspositionen sich aus einem breiteren Kreis besetzen lassen und wo subunternehmerische Kapazität in einen Zeitplan passt, der sich mit Saison und Wetter verschiebt. Löhne und Zahlen nennen wir nicht; es ist ein praktischer Rahmen für Bauunternehmen, der Projektarbeit, Saisonalität und den Bedarf an qualifizierten wie an Hilfsgewerken berücksichtigt.',
      breadcrumb: 'Baumitarbeiter',
      sections: [
        {
          heading: 'Was den Bau ausmacht',
          body: [
            'Bauarbeiten sind häufig an konkrete Projekte mit definiertem Anfang und Ende gebunden, unterliegen Saison und Witterung und verbinden qualifizierte Handwerksberufe mit Hilfspositionen. Das macht die Planung einer festen Stammbelegschaft zur Herausforderung.',
            'Der Bedarf ändert sich mit der Projektphase und mit der Zahl paralleler Aufträge.',
          ],
        },
        {
          heading: 'Wie Sie Baupositionen besetzen',
          body: [
            'Ein projektbezogener Bedarf lässt sich mit einer Verbindung aus eigenem Kern, Nachunternehmern und flexibler Kapazität decken – Hilfspositionen haben dabei eine niedrigere Einstiegshürde als die qualifizierten Gewerke.',
          ],
          list: {
            intro: 'Üblicherweise teilt sich die Verbindung so auf:',
            items: [
              'Die maßgeblichen Gewerke im eigenen Kern halten und dort stabilisieren',
              'Hilfspositionen über einen breiteren Kandidatenkreis besetzen',
              'Projektbezogene Spitzen über flexible Kapazität und Nachunternehmer abdecken',
              'Bei Mangelgewerken die Personalgewinnung aus dem Ausland hinzunehmen',
            ],
          },
        },
        {
          heading: 'Einarbeitung und Sicherheit auf der Baustelle',
          body: [
            'Der Eintritt auf einer Baustelle legt hohen Wert auf Sicherheit – Arbeitsschutzunterweisung nach tschechischem Recht, Einführung in Baustelle und Gefährdungen und bei einigen Arbeiten erforderliche Berechtigungen.',
            'Eine gute Einarbeitung und eine klare Rollenverteilung senken das Unfallrisiko. Auf einer Baustelle, auf der mehrere Gewerke und Nachunternehmer gleichzeitig arbeiten, ist diese Verteilung keine Formalie.',
          ],
        },
        {
          heading: 'Planung nach dem Projektzeitplan',
          body: [
            'Die Kapazitätsplanung folgt dem Auftragszeitplan und der Saisonalität. Es lohnt sich, vorab zu wissen, welche Gewerke im eigenen Kern bleiben und was flexibel oder über Nachunternehmer abgedeckt wird – und bei der Personalgewinnung aus dem Ausland mit den Fristen für die Erlaubnisse in Tschechien zu rechnen.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das tschechische Ministerium für Arbeit und Soziales (MPSV) und das Arbeitsamt der Tschechischen Republik (Úřad práce ČR). Zahlen nennen wir hier nicht.',
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
        'Lebensmittelproduktion in Tschechien personell sichern: Hygiene, Schichten, Einarbeitung und die Pflichten des tschechischen Rechts für Kühl- und Gefrierbereiche.',
      h1: 'Lebensmittelproduktion: personelle Sicherung des Betriebs',
      intro:
        'Die Lebensmittelproduktion hat ihre Besonderheiten – strenge Hygieneanforderungen, die Notwendigkeit eines kontinuierlichen Betriebs und häufig ein Schichtmodell. Die personelle Sicherung beruht hier nicht nur auf der Besetzung von Stellen, sondern auch auf der Einhaltung von Hygiene und Lebensmittelsicherheit. Diese Seite gibt einen Überblick, wie sich ein Lebensmittelbetrieb in Tschechien personell sichern lässt: welche Hygiene- und Schichtanforderungen bereits in die Stellenanzeige gehören und was Arbeit im Kühl- und Tiefkühlbereich an gesundheitlicher Eignung, an Arbeits- und Ruhezeitgestaltung und an Vertretbarkeit hinzufügt. Löhne und Zahlen nennen wir nicht; es ist ein praktischer Rahmen für Lebensmittelunternehmen, der Hygiene, Kontinuität und Schichtbetrieb sowie die Anforderungen an die Einarbeitung berücksichtigt.',
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
            'Ein Teil der Positionen in der Lebensmittelproduktion hat eine niedrigere Einstiegshürde und lässt sich schneller besetzen als andere.',
          ],
          list: {
            intro: 'Was sich in einem Lebensmittelbetrieb bewährt:',
            items: [
              'Fester Kern für die Kontinuität der Produktion',
              'Flexible Kapazität für Schwankungen',
              'Hygiene- und Schichtanforderungen bereits in der Anzeige nennen',
              'Personalgewinnung aus dem Ausland bei Mangel',
            ],
          },
        },
        {
          heading: 'Einarbeitung in Hygiene und Sicherheit',
          body: [
            'Neben der Arbeitsschutzunterweisung nach tschechischem Recht konzentriert sich die Einarbeitung in der Lebensmittelproduktion auf Hygieneverfahren und Lebensmittelsicherheit. Für einige Positionen können Gesundheitsnachweise oder die Erfüllung hygienischer Anforderungen nötig sein; die konkreten Pflichten ergeben sich aus den tschechischen Vorschriften.',
          ],
        },
        {
          heading: 'Planung der Betriebskontinuität',
          body: [
            'Weil die Lebensmittelproduktion oft Kontinuität verlangt, plant man die Schichtabdeckung besser mit Reserve und mit Mehrfachqualifizierung. Flexible Kapazität hilft, Schwankungen aufzufangen, ohne den Betrieb zu gefährden.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das tschechische Ministerium für Arbeit und Soziales (MPSV) und das Arbeitsamt der Tschechischen Republik (Úřad práce ČR). Zahlen nennen wir hier nicht.',
          ],
        },
        {
          heading: 'Kühl- und Gefrierbereiche und der Schutz der Gesundheit',
          body: [
            'Ein Teil von Verarbeitung, Herstellung und Versand läuft in gekühlten, gefrorenen oder anderweitig temperaturgeführten Bereichen – Fleisch, Molkerei- und Tiefkühlprodukte, die Kühlkette. Diese Umgebung unterscheidet sich von einer gewöhnlichen Produktionshalle und stellt besondere Anforderungen an den Gesundheitsschutz.',
            'Nach dem tschechischen Arbeitsgesetzbuch hat der Arbeitgeber die Pflicht, eine sichere und die Gesundheit nicht gefährdende Arbeitsumgebung sicherzustellen und die Arbeitsorganisation daran anzupassen; diese Pflicht erfasst auch die Arbeit bei niedrigen Temperaturen. Das tschechische Arbeitsgesetzbuch verlangt zudem, persönliche Schutzausrüstung dort unentgeltlich bereitzustellen, wo Umgebung und Gefährdungen es erfordern, und in den gesetzlich bestimmten Fällen auch Schutzgetränke; den konkreten Umfang und die Bedingungen legen die tschechischen Durchführungsvorschriften fest, die zu prüfen sind.',
            'Das tschechische Gesetz über die Gewährleistung weiterer Bedingungen des Arbeitsschutzes (Nr. 309/2006 Sb.) und die daran anschließenden Vorschriften regeln die Bedingungen des Gesundheitsschutzes einschließlich belastender Umgebungsfaktoren wie Temperatur und Feuchtigkeit. Bei Risikoarbeiten und bei Arbeiten mit belastenden Faktoren verlangen das tschechische Arbeitsgesetzbuch und die Vorschriften über den arbeitsmedizinischen Dienst eine Beurteilung der gesundheitlichen Eignung; das Arbeitsgesetzbuch regelt auch Arbeitspausen und Sicherheitspausen.',
          ],
          list: {
            items: [
              'Bei Arbeit in der Kälte ist mit einer Beurteilung der gesundheitlichen Eignung beim Eintritt, mit einem Arbeits- und Ruheregime und mit einer geregelten Vertretung zu rechnen.',
              'Die Einhaltung der Arbeitsschutzbedingungen beaufsichtigt das tschechische Staatliche Arbeitsinspektionsamt (Státní úřad inspekce práce); methodische Informationen veröffentlicht das MPSV.',
              'Die Arbeit in der Kälte, die Schutzausrüstung und etwaige gesundheitliche Anforderungen gehören bereits in die Anzeige und in die Einarbeitung, um Missverständnissen und unnötiger Fluktuation vorzubeugen.',
            ],
          },
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Nennen Sie uns die Umgebung und das Schichtmodell – beides verengt, wer realistisch anfangen kann.',
      },
    },
  },

  'automotive-workers': {
    de: {
      title: 'Automotive-Mitarbeiter: personelle Sicherung des Betriebs',
      description:
        'Automotive in Tschechien personell sichern: Linientakt und Qualität, Schichten und Anläufe und wie das tschechische Recht Arbeitszeit, Ruhezeiten und Zuschläge rahmt.',
      h1: 'Automotive-Mitarbeiter: personelle Sicherung des Betriebs',
      intro:
        'Die Automobilindustrie gehört zu den anspruchsvollen Fertigungsbranchen, mit Betonung auf Linientakt, Qualität und Kontinuität im Schichtbetrieb. Die personelle Sicherung beruht hier darauf, die Linie am Laufen zu halten und die Qualitätsanforderungen einzuhalten. Diese Seite gibt einen Überblick, wie sich ein Automotive-Betrieb in Tschechien personell sichern lässt: wie die Linie über die Schichten im Takt gehalten wird und wie die Arbeitszeit im durchgehenden Betrieb verteilt wird, einschließlich der vergleichbaren Arbeits- und Ruhezeitbedingungen, die überlassenen Mitarbeitenden an der Linie zustehen. Löhne und Zahlen nennen wir nicht; es ist ein praktischer Rahmen für Unternehmen der Branche, der Linienarbeit, Qualität und Schichtbetrieb sowie die Anforderungen an die Einarbeitung berücksichtigt.',
      breadcrumb: 'Automotive-Mitarbeiter',
      sections: [
        {
          heading: 'Was den Automotive-Betrieb ausmacht',
          body: [
            'Automotive ist gekennzeichnet durch Arbeit an Montagelinien mit vorgegebenem Takt, hohe Qualitätsanforderungen und Kontinuität über Schichten. Eine personelle Lücke oder eine Qualitätsabweichung wirkt sich auf die gesamte Linie und auf die daran hängenden Lieferungen aus.',
            'Die Betriebe stehen häufig in Lieferketten mit Druck auf Zuverlässigkeit und Stabilität – Abdeckung ist deshalb eher eine Liefer- als nur eine Personalfrage.',
          ],
        },
        {
          heading: 'Wie Sie für Automotive gewinnen',
          body: [
            'Anläufe und Spitzen abzudecken hilft die Arbeitnehmerüberlassung nach tschechischem Recht.',
          ],
          list: {
            intro: 'Was sich in einem Automotive-Betrieb bewährt:',
            items: [
              'Fester Kern für Qualität und Kontinuität',
              'Flexible Kapazität für Anläufe und Schwankungen',
              'Personalgewinnung aus dem Ausland bei Mangelberufen',
              'Gewicht auf Zuverlässigkeit und auf die Bereitschaft zum Schichtbetrieb',
            ],
          },
        },
        {
          heading: 'Einarbeitung auf Linie und Qualität',
          body: [
            'Neben der Arbeitsschutzunterweisung nach tschechischem Recht konzentriert sich die Einarbeitung auf die Arbeit im Linientakt, auf Qualitätsstandards und auf die konkreten Arbeitsgänge. Ein vorbereitetes und wiederholbares Onboarding ist besonders beim Produktionsanlauf oder bei mehreren gleichzeitigen Eintritten wichtig.',
          ],
        },
        {
          heading: 'Planung von Schichten und Anläufen',
          body: [
            'Die Kapazitätsplanung muss Linientakt, Schichten und Produktionsanläufe in Einklang bringen. Mehrfachqualifizierung, eine Reserve für Ausfälle und die rechtzeitige Sicherung flexibler Kapazität helfen dabei. Eine sofortige Verfügbarkeit sagen wir nicht zu. Bei der Personalgewinnung aus dem Ausland ist mit den Fristen für die Erlaubnisse in Tschechien zu rechnen.',
            'Aktuelle Arbeitsmarktdaten veröffentlichen das Tschechische Statistische Amt, das tschechische Ministerium für Arbeit und Soziales (MPSV) und das Arbeitsamt der Tschechischen Republik (Úřad práce ČR). Zahlen nennen wir hier nicht.',
          ],
        },
        {
          heading: 'Dauerbetrieb und die Verteilung der Arbeitszeit',
          body: [
            'Automotive läuft typischerweise mehrschichtig oder durchgehend. Das tschechische Arbeitsgesetzbuch unterscheidet die gleichmäßige von der ungleichmäßigen Verteilung der Arbeitszeit und setzt den Rahmen für Schicht- und Dauerbetriebe, in den der Linienplan passen muss. Genaue Schichtlängen nennen wir hier nicht; sie legt der Arbeitgeber im gesetzlichen Rahmen fest.',
            'Das Arbeitszeitkonto ist nach dem tschechischen Arbeitsgesetzbuch eine besondere Art der Arbeitszeitverteilung, die sich nur durch einen Kollektivvertrag oder eine innerbetriebliche Vorschrift einführen lässt. Es passt zu Betrieben mit schwankender Produktion – Anläufen neuer Modelle, Schwankungen der Abrufe –, weil es erlaubt, die geleistete Zeit über einen Ausgleichszeitraum auszugleichen. Nachtarbeit und die Nachtschicht haben im tschechischen Arbeitsgesetzbuch eine eigene Regelung, und Nachtarbeitenden steht ein besonderer Schutz zu – mit Blick auf den Arbeitsschutz einschließlich der Beurteilung der gesundheitlichen Eignung.',
            'Die ununterbrochene Ruhe zwischen den Schichten und in der Woche sowie die Arbeitspausen sind vom tschechischen Arbeitsgesetzbuch festgelegte Mindeststandards, die der Schichtplan der Linie einhalten muss; konkrete Längen nennen wir hier nicht. Für Arbeit in der Nacht, am Wochenende, an Feiertagen und für Überstunden stehen den Beschäftigten Zuschläge nach dem tschechischen Arbeitsgesetzbuch zu; konkrete Sätze nennen wir nicht, sie richten sich nach der gesetzlichen Regelung und nach einem etwaigen Kollektivvertrag.',
          ],
          list: {
            items: [
              'Die Einhaltung von Arbeitszeit und Ruhezeiten und deren Aufzeichnung kontrollieren nach dem tschechischen Gesetz über die Arbeitsinspektion das tschechische Staatliche Arbeitsinspektionsamt (Státní úřad inspekce práce) und die regionalen Inspektorate.',
              'Von einer Agentur an die Linie überlassenen Beschäftigten stehen vergleichbare Arbeitszeit- und Ruhebedingungen zu wie den Stammbeschäftigten.',
              'Den Schichtplan setzt der Arbeitgeber in den Grenzen des Gesetzes; die Form ist sinnvollerweise nach dem tatsächlichen Betrieb zu wählen.',
            ],
          },
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
