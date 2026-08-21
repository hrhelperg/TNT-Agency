import type { LocaleCorpus } from '../types'

/**
 * L1 Fachkräfte-Cluster — Deutsch.
 *
 * Dreizehn Berufe, und das Cluster, in dem die tschechischen Quellen am
 * genauesten sagen, was ein Nachweis aussagt und was nicht: Ein Schweißzeugnis
 * beschreibt einen geprüften Bereich und keinen Beruf, die fachliche Befähigung
 * in der Elektrotechnik knüpft an Tätigkeit und Anlage statt an eine Person, und
 * „THP" ist eine betriebliche Kategorie, die das tschechische Arbeitsrecht gar
 * nicht kennt.
 *
 * Zwei Dinge tragen durchgehend. Rechtsvorschriften werden als tschechische
 * Vorschriften benannt und nie verallgemeinert. Und wo die Quelle sagt, ein
 * Standard sei etwas, das ARBEITGEBER verlangen — ISO 9001, IATF 16949, HACCP —,
 * sagt die Übersetzung dasselbe und lässt es nicht zu einer Zertifizierung
 * werden, die diese Agentur besäße.
 */
export const DE_SPECIALISTS: LocaleCorpus = {
  welders: {
    de: {
      title: 'Schweißer rekrutieren: Verfahren, Nachweise und Geltungsbereich',
      description:
        'Was ein Schweißerzeugnis nach ČSN EN ISO 9606-1 tatsächlich aussagt — Verfahren, Werkstoff, Position und Dicke —, der Unterschied zwischen Schweißerpass und Prüfungszeugnis und wie eine Probeschweißung aufgebaut wird.',
      h1: 'Schweißer rekrutieren: Verfahren, Nachweise und Geltungsbereich',
      intro:
        'Eine Anzeige, die „einen Schweißer" sucht, ist für Bewerbende ebenso unbestimmt, wie wenn ein Fertigungsbetrieb „jemanden für die Maschinen" suchte. Schweißen ist keine einzelne Fertigkeit, sondern eine Reihe von Kombinationen aus Verfahren, Werkstoff, Bauteilform und Position — und der Nachweis, den eine Schweißerin oder ein Schweißer mitbringt, ist kein Berufszeugnis, sondern die Beschreibung des Bereichs, in dem die Prüfung abgelegt wurde. Trifft die Stellenbeschreibung diesen Bereich nicht, füllt sich das Verfahren mit Menschen, die schweißen können — nur nicht das, was Sie brauchen. Diese Seite zeigt, wie die Beschreibung aussehen muss, was im Nachweis zu lesen ist, wie eine Probeschweißung aufgebaut wird und was der Arbeitsschutz bei diesem Beruf hinzufügt.',
      breadcrumb: 'Schweißer',
      sections: [
        {
          heading: 'Was ein Schweißernachweis tatsächlich aussagt',
          body: [
            'Eine Schweißerprüfung nach ČSN EN ISO 9606-1 findet nicht allgemein statt. Es wird ein Prüfstück unter genau festgelegten Bedingungen geschweißt, und das Zeugnis beschreibt anschließend den damit nachgewiesenen Bereich. Genau dieser Bereich — nicht das Wort „Schweißer" — ist die Information, mit der die Besetzung arbeiten muss.',
            'Der Bereich setzt sich aus mehreren Variablen zugleich zusammen, und die Änderung einer einzigen kann bedeuten, dass der Nachweis für Ihre Arbeit nicht genügt. Die genannte Norm betrifft Stähle; Aluminium und seine Legierungen behandelt ein anderer Teil derselben Norm, ein Nachweis für Stahl sagt über Aluminium also nichts aus.',
          ],
        },
        {
          heading: 'Warum eine Anzeige für „einen Schweißer" unbrauchbare Bewerbungen bringt',
          body: [
            'Fehlt der Bereich in der Anzeige, ergänzt ihn die bewerbende Person selbst. Es meldet sich jemand mit einem Grundkurs im Verfahren 111 an Blechen, weil er sich zu Recht Schweißer nennt — und kommt an einen Arbeitsplatz, an dem Verfahren 141 an nichtrostenden Rohren vorgeschrieben ist, Position PF und eine Naht ohne Wurzelunterlage. Niemand hat gelogen; beide Seiten haben sich unter demselben Wort verschiedene Arbeit vorgestellt.',
            'Der Aufwand liegt nicht nur in vergeblichen Gesprächen. Eine ungenaue Beschreibung verzerrt auch das Bild vom Markt: Das Unternehmen gewinnt den Eindruck, es gebe keine Schweißer, obwohl es in Wahrheit noch nicht beschrieben hat, was es braucht.',
          ],
        },
        {
          heading: 'Schweißerpass, Grundkurs und Prüfungszeugnis',
          body: [
            'In der Praxis werden zwei verschiedene Nachweise vermischt. Ein Schweißerpass mit Eintrag über einen Grundkurs belegt, dass eine Person das Verfahren an einer Schweißschule erlernt hat und damit arbeiten kann. Das Zeugnis über die Schweißerprüfung nach ČSN EN ISO 9606-1 ist das Ergebnis einer Prüfung vor einer Prüfstelle und grenzt den Bereich ab, in dem dort gearbeitet werden darf, wo eine Produktnorm oder ein Kunde es verlangt.',
            'Für gewöhnliche Werkstattfertigung ohne besondere Anforderungen können Pass und Einweisung genügen. Sobald Sie die Schweißqualität gegenüber einem Kunden oder nach Normen belegen, werden Zeugnis und Bereich zum entscheidenden Dokument.',
          ],
        },
        {
          heading: 'Die Probeschweißung entscheidet',
          body: [
            'Ein Nachweis sagt, was jemand am Prüfungstag unter den Bedingungen der Prüfstelle bewältigt hat. Ob er Ihre Arbeit bewältigt, entscheidet die Probeschweißung. Bereiten Sie ein Stück vor, das Ihrem üblichen Auftrag entspricht — gleicher Werkstoff, gleiche Dicke, Position, Nahtvorbereitung und möglichst auch die bei Ihnen verwendete Schweißanweisung.',
            'Achten Sie dabei auf mehr als das Aussehen der Naht: wie die Person die Stromquelle einstellt, ob sie die Zeichnung liest, wie sie den Werkstoff vorbereitet und reinigt, wie sie mit dem Schutzgas umgeht und wie sie die Naht selbst prüft.',
          ],
        },
        {
          heading: 'Schweißer aus dem Ausland und ihre Nachweise',
          body: [
            'Die Gewinnung aus dem Ausland ist beim Schweißen üblich, und der Nachweis ist häufig nach derselben Norm ausgestellt wie in Tschechien, weil es sich um eine übernommene internationale Norm handelt. Ohne Weiteres brauchbar ist er damit nicht. Prüfen Sie, wer das Zeugnis ausgestellt hat, welchen Bereich es enthält, ob es gültig ist und ob Ihr Kunde es akzeptiert — bei Lieferungen mit nachzuweisender Schweißqualität ist das meist entscheidend. Erfüllt es die Bedingungen nicht, folgt eine Prüfung in Tschechien.',
            'Das Zweite ist die Verständigung. Geschweißt wird nach Zeichnung und Schweißanweisung, und Sicherheitshinweise müssen verstanden werden.',
          ],
        },
        {
          heading: 'Arbeitsschutz, Schutzausrüstung und gesundheitliche Eignung',
          body: [
            'Schweißen hat ein eigenes Gefährdungsprofil, und die Besetzung trifft schon beim Eintritt darauf. Neben Verbrennungen und Funkenflug geht es um die Strahlung des Lichtbogens, die Augen und Haut schädigt, und um Schweißrauche — bei nichtrostenden Stählen und beschichteten Werkstoffen besonders beachtet. Deshalb werden Absaugung am Arbeitsplatz und bei einem Teil der Arbeiten auch Atemschutz behandelt.',
            'Schweißen außerhalb eines ortsfesten Schweißarbeitsplatzes ist nach tschechischen Vorschriften zudem mit besonderen Brandschutzanforderungen verbunden: schriftlich festgelegte Bedingungen für die jeweilige Arbeit und eine Aufsicht, die auch nach deren Ende fortdauert.',
          ],
        },
      ],
      cta: {
        label: 'Fachkräfterekrutierung',
        targetConceptId: 'specialist-recruitment',
        note: 'Warum bei Fachpositionen der Nachweis und nicht die Zahl der Bewerbungen entscheidet.',
      },
    },
  },

  'cnc-operators': {
    de: {
      title: 'CNC-Fachkräfte gewinnen: was die Besetzbarkeit wirklich bestimmt',
      description:
        'Der Unterschied zwischen Bedienung, Einrichten und Programmierung, die Rolle der Steuerung, Messmittel und Zeichnung, Ein- oder Mehrmaschinenbedienung, das Schichtmodell und eine praktische Probe an der Maschine.',
      h1: 'CNC-Fachkräfte gewinnen: was die Besetzbarkeit wirklich bestimmt',
      intro:
        'Viele festgefahrene CNC-Besetzungen beginnen nicht mit einem Mangel an Menschen, sondern mit einer Beschreibung, die drei verschiedene Positionen vermischt. Bedienung, Einrichter und Programmierer unterscheiden sich in Verfügbarkeit, Einarbeitungsdauer und Kosten, und eine Anzeige, die sie zu einem Profil verschmilzt, sucht die höchste Stufe zu den Bedingungen der niedrigsten. Diese Seite behandelt, was die Besetzbarkeit einer CNC-Stelle tatsächlich bestimmt: Kenntnis der Steuerung, Umgang mit Messmittel und Zeichnung, Bedienung einer oder mehrerer Maschinen, Schichtmodell und die Form einer praktischen Probe. Löhne und Besetzungsfristen nennen wir hier nicht.',
      breadcrumb: 'CNC-Fachkräfte',
      sections: [
        {
          heading: 'Bedienung, Einrichten, Programmierung — drei Positionen in einer Anzeige',
          body: [
            'Die CNC-Bedienung überwacht die Maschine im laufenden Programm: legt Teile ein und entnimmt sie, verfolgt den Ablauf, prüft Maße nach dem Prüfplan, wechselt stumpfe Werkzeuge nach Anweisung und meldet Abweichungen. Den Wechsel der Maschine auf einen anderen Auftrag nimmt sie nicht vor.',
            'Der Einrichter bringt den Auftrag auf der Maschine zum Laufen. Er spannt Vorrichtung oder Backen, vermisst die Werkzeuge und gibt sie samt Korrekturen ein, fährt den Werkstücknullpunkt an, fährt das Programm trocken, fertigt und misst das erste Teil und übergibt die Maschine erst dann in den Serienlauf. Hier entscheiden sich Rüstzeit und Ausschuss.',
            'Der Programmierer erstellt Technologie und Werkzeugbahn. Die drei in einem Profil zu vermischen ist der häufigste Grund, aus dem eine solche Stelle offen bleibt.',
          ],
        },
        {
          heading: 'Die Steuerung: eine echte, aber erlernbare Grenze',
          body: [
            'Heidenhain, Siemens und Fanuc werden unterschiedlich bedient, und wer an eine Steuerung gewöhnt ist, ist an einer anderen in den ersten Tagen nicht gleich schnell. Das ist eine reale Grenze und nicht kleinzureden. Zugleich ist sie erlernbar: Wer die Zerspanungstechnologie versteht, Zeichnungen liest und messen kann, findet sich in einer anderen Oberfläche leichter zurecht als jemand, der nur eine Schrittfolge an einer bestimmten Maschine kennt.',
            'Praktisch folgt daraus: Bestehen Sie auf einer genauen Übereinstimmung der Steuerung, verengen Sie den Kreis so weit, dass die Besetzung länger dauert. Behandeln Sie sie als wünschenswert statt als notwendig, erweitert sich der Kreis meist erheblich.',
          ],
        },
        {
          heading: 'Messmittel und Zeichnung wiegen schwerer als die Maschinenmarke',
          body: [
            'Im Auswahlverfahren bewährt es sich, nach dem Messen zu fragen, bevor nach Maschinen gefragt wird. Messschieber, Mikrometer, Messuhr und Grenzlehren unterscheiden sich in Genauigkeit und Anwendung, und die Antwort auf „womit würden Sie dieses Maß prüfen und warum" verrät mehr als eine Aufzählung von Marken.',
            'Dasselbe gilt für die Zeichnung. Toleranzfeld, geometrische Toleranzen und vorgeschriebene Rauheit bestimmen, was mit einem Teil geschieht, das das richtige Maß und die falsche Form hat.',
          ],
        },
        {
          heading: 'Eine Maschine oder mehrere',
          body: [
            'Mehrmaschinenbedienung steht häufiger in Anzeigen, als es der Betrieb hergibt. Damit sie sinnvoll ist, müssen Maschinenzeiten, Anordnung des Arbeitsplatzes und Art der Teile sie zulassen; sonst wird sie zur dauerhaften Quelle von Überstunden und Fehlern. Wenn Sie sie verlangen, nennen Sie die Zahl der Maschinen und die Arbeitsgänge.',
            'Auch das Profil unterscheidet sich. Wer jahrelang an einer Maschine in langen Serien gearbeitet hat, beherrscht sie perfekt, für den Wechsel zwischen Aufträgen braucht er jedoch eine Einarbeitung.',
          ],
        },
        {
          heading: 'Das Schichtmodell ist häufig der entscheidende Faktor',
          body: [
            'Bei CNC-Stellen entscheidet über die Besetzbarkeit überraschend oft die Schicht und nicht die Fertigkeit. Drei-Schicht- und Dauerbetrieb verengen den Kreis anders als Zwei-Schicht-Betrieb, auch unter Menschen, die die Arbeit wollen. Anfahrtsweg, familiäre Lage und die Frage, ob die Schichten vorhersehbar wechseln und der Plan früh genug bekannt ist, spielen mit.',
            'Ist die Schichtform vorgegeben und nicht änderbar, schreibt man das besser sofort und offen; eine spätere Klärung kostet beide Seiten Zeit.',
          ],
        },
        {
          heading: 'Eine praktische Probe an der Maschine statt eines längeren Gesprächs',
          body: [
            'Ein verlässliches Sieb ist bei diesen Stellen eine kurze praktische Vorführung im Betrieb. Es geht nicht um eine Prüfung, sondern darum zu sehen, wie jemand an die Maschine herangeht, wie er das Messmittel hält, wonach er fragt und was er überprüft. Ein Moment an der Maschine sagt mehr als eine Liste von Maschinenmarken im Lebenslauf.',
            'Eine praktische Probe hat eigene Anforderungen. Vor dem Betreten des Betriebs muss die Person über die Gefährdungen unterwiesen und mit Schutzausrüstung ausgestattet sein; die Vorführung findet unter Aufsicht und in sicherem Umfang statt.',
          ],
        },
      ],
      cta: {
        label: 'Metallberufe',
        targetConceptId: 'engineering-trades',
        note: 'Wo Bedienen, Einrichten und Programmieren in den Zerspanungsberufen liegen.',
      },
    },
  },

  electricians: {
    de: {
      title: 'Elektriker rekrutieren: fachliche Befähigung in der Elektrotechnik in Tschechien',
      description:
        'Was „Verordnung 50" und „Paragraf 6" heute bedeuten, warum die Befähigung an Tätigkeit und Anlage statt an eine Person knüpft und was in die Beschreibung gehört, damit die Auswahl funktioniert.',
      h1: 'Elektriker rekrutieren: fachliche Befähigung in der Elektrotechnik in Tschechien',
      intro:
        'Eine Anfrage nach einer Elektrofachkraft bleibt fast immer an derselben Stelle hängen: In der Beschreibung steht „Paragraf 6" oder „Verordnung 50", doch diese Bezeichnungen stammen aus einer Vorschrift, die nicht mehr gilt, und sagen für sich genommen nichts darüber, was die Person tun wird und an welcher Anlage. Die fachliche Befähigung in der Elektrotechnik richtet sich in Tschechien heute nach der tschechischen Regierungsverordnung Nr. 194/2022 Sb., die die Verordnung Nr. 50/1978 Sb. abgelöst hat, und knüpft an das tschechische Gesetz über vorbehaltene technische Anlagen an. Diese Seite erklärt die Orientierung als Arbeitgeberin, ohne den Text der Vorschrift zu ersetzen — konkrete Stufen, Fristen und Anforderungen gehören in deren geltende Fassung.',
      breadcrumb: 'Elektriker',
      sections: [
        {
          heading: '„Verordnung 50" und „Paragraf 6": was diese Worte heute bedeuten',
          body: [
            'Die Verordnung Nr. 50/1978 Sb. galt jahrzehntelang, und ihre Nummerierung hat sich so eingebürgert, dass sie bis heute auf beiden Seiten verwendet wird — die Arbeitgeberin schreibt „Paragraf 6" in die Anzeige, und die bewerbende Person antwortet im Lebenslauf mit demselben. Geregelt wird die fachliche Befähigung heute durch die tschechische Regierungsverordnung Nr. 194/2022 Sb., die jene Verordnung abgelöst hat. Die umgangssprachliche Bezeichnung hat also keine Grundlage in der geltenden Vorschrift, und zwischen alter und neuer Gliederung lässt sich nicht mechanisch umrechnen.',
          ],
        },
        {
          heading: 'Die Befähigung knüpft an Tätigkeit und Anlage, nicht nur an die Person',
          body: [
            'Ein Nachweis über die fachliche Befähigung ist kein Universalausweis. Entscheidend ist die Kombination dreier Dinge: welche Tätigkeit auszuüben ist, an welcher Anlage und in welchem Betriebszustand. Das Bedienen einer Schaltanlage setzt eine andere Befähigung voraus als Montage und Instandsetzung, Arbeiten an spannungsfreien Anlagen eine andere als Arbeiten in der Nähe unter Spannung stehender Teile. Auch die Spannungsebene spielt eine Rolle — Niederspannung ist nicht Hochspannung.',
            'Eine Beschreibung der Art „wir suchen einen Elektriker mit Papieren" gibt der Auswahl deshalb keinen Halt. Sobald Spannungsebene, Anlagenart und Tätigkeit in der Anfrage stehen, wird der Kreis beurteilbar.',
          ],
        },
        {
          heading: 'Vorbehaltene technische Anlagen und was daraus folgt',
          body: [
            'Elektrische Anlagen gehören zusammen mit Hebe-, Druck- und Gasanlagen zu den vorbehaltenen technischen Anlagen nach dem tschechischen Gesetz Nr. 250/2021 Sb. Dieses regelt die Anforderungen an ihren sicheren Betrieb sowie an die Befähigung der Personen und Organisationen, die daran tätig werden; die Regierungsverordnung zur fachlichen Befähigung in der Elektrotechnik ist seine Durchführungsvorschrift.',
            'Für Arbeitgebende folgen daraus zwei Ebenen, die in Anfragen häufig verwechselt werden. Die erste betrifft Personen — wer was tun darf. Die zweite betrifft Organisation und Anlage — die Berechtigung für Tätigkeiten an ihnen.',
          ],
        },
        {
          heading: 'Instandhaltungselektriker, Betriebselektriker, Elektromonteur',
          body: [
            'Die drei am häufigsten gesuchten Profile unterscheiden sich in der Art der Arbeit so weit, dass sie einander nicht vertreten. Ein Instandhaltungselektriker sucht und beseitigt Störungen an Maschinen im laufenden Betrieb: liest Schaltpläne, kennt sich in der Peripherie von Steuerungen, in Frequenzumrichtern, Antrieben und Sensoren aus und entscheidet unter dem Druck des Stillstands. Entscheidend ist die Diagnose, nicht die Routine.',
            'Ein Betriebselektriker betreut die elektrischen Anlagen des Geländes und ihren Betrieb — Verteilung, Schaltschränke, Beleuchtung, kleinere Anpassungen, Unterlagen für Prüfungen und die Beseitigung festgestellter Mängel.',
          ],
        },
        {
          heading: 'Gültigkeit, Nachprüfung und gesundheitliche Eignung',
          body: [
            'Ein Befähigungsnachweis gilt nicht dauerhaft. Die Vorschrift sieht vor, dass die Befähigung in festgelegten Abständen erneut überprüft wird, und der Nachweis hat eine begrenzte Gültigkeit; die konkreten Fristen und die Form der Nachprüfung legt die Regierungsverordnung fest und sind in deren geltender Fassung zu prüfen.',
            'In die Personalunterlagen gehört deshalb nicht nur eine Kopie des Nachweises, sondern auch das Datum, an dem die Gültigkeit endet — im Voraus zu beobachten und nicht erst, wenn jemand nicht mehr an die Anlage darf.',
          ],
        },
        {
          heading: 'Was in die Anfrage gehört, damit die Auswahl Sinn ergibt',
          body: [
            'Eine verlässliche Kontrolle der Beschreibung ist die Frage, ob eine Elektrofachkraft, die Ihr Unternehmen nicht kennt, danach antworten könnte. Wenn ja, entscheidet sich die Auswahl nicht erst bei der Prüfung der Nachweise vor dem Eintritt, sondern viel früher — und zwar unter Menschen, die für diese Arbeit tatsächlich befähigt sind.',
            'So beschrieben beschleunigt sich auch die Vorauswahl: Sind Anlage und Tätigkeit bekannt, lässt sich der Nachweis vor dem Gespräch durchgehen und anhand der Originale zusammen mit der Identität prüfen.',
          ],
        },
      ],
      cta: {
        label: 'Instandhaltung und technischer Service',
        targetConceptId: 'maintenance-technicians',
        note: 'Wo die elektrotechnische Befähigung innerhalb der Instandhaltung liegt.',
      },
    },
  },

  'maintenance-technicians': {
    de: {
      title: 'Instandhaltung und technischer Service: technische Stellen besetzen',
      description:
        'Warum sich die Instandhaltung schwerer besetzt als die Produktion um sie herum: Breite der Kompetenz, vorbeugende gegen reaktive Arbeit, Rufbereitschaft und Anfahrt, Dokumentation der Übergabe und der Weg von innen.',
      h1: 'Instandhaltung und technischer Service: technische Stellen besetzen',
      intro:
        'Die Instandhaltung ist der Ort, an dem sich ein Personalmangel schnell und teuer zeigt: Die Maschine steht, der Plan verschiebt sich und die Bedienenden warten. Besetzt wird sie anders als die Produktion um sie herum — verlangt ist nicht eine Fertigkeit, sondern eine Kombination aus Mechanik, Elektrik, Pneumatik oder Hydraulik und zunehmend auch grundlegender Arbeit mit der Steuerung der Maschine. Dazu kommen Bedingungen, die Kandidatinnen und Kandidaten vor dem Aufgabeninhalt abwägen: Rufbereitschaft, Anfahrt und Schichtabdeckung. Diese Seite beschreibt, was in der Beschreibung zu klären ist, wie Befähigungsnachweise zu beurteilen sind und warum die Beförderung aus dem Betrieb ein vollwertiger Weg ist und keine Notlösung.',
      breadcrumb: 'Instandhaltung',
      sections: [
        {
          heading: 'Warum sich die Instandhaltung schwerer besetzt',
          body: [
            'Eine Bedienkraft suchen Sie nach einer Hauptfähigkeit und einer Einarbeitungszeit. Bei der Instandhaltung ist die Aufgabe anders: Eine Person soll in einer Schicht einen unterschiedlichen Maschinenpark abdecken und mit einer mechanischen Störung, mit Pneumatik oder Hydraulik und mit dem zurechtkommen, was im Schaltschrank geschieht. In vielen Betrieben wächst die Arbeit mit der Steuerung — kein Programmieren, sondern die Fähigkeit zu erkennen, ob das Problem im Sensor, in der Mechanik oder im Programm liegt.',
            'Die Breite der Kompetenz hat auch eine rechtliche Seite. Ein Eingriff in den elektrischen Teil einer Anlage ist nach tschechischem Recht an die fachliche Befähigung in der Elektrotechnik gebunden.',
          ],
        },
        {
          heading: 'Rollen in der Instandhaltung und ihre Unterschiede',
          body: [
            'Die Bezeichnungen unterscheiden sich von Unternehmen zu Unternehmen, und der Titel allein sagt über den Inhalt wenig. Nützlicher ist zu beschreiben, wo die Verantwortung einer Rolle endet und wo der externe Service oder der Maschinenlieferant beginnt.',
            'Missverständnisse entstehen vor allem zwischen Einrichter und Instandhalter: Der Einrichter hält die Maschine zwischen Aufträgen im Lauf und misst sich an der Rüstzeit, der Instandhalter verantwortet den technischen Zustand über einen längeren Zeitraum. Erfüllt eine Person beide Rollen, gehört das in die Beschreibung.',
          ],
        },
        {
          heading: 'Vorbeugend und reaktiv: andere Aufgabe, anderer Mensch',
          body: [
            'Ein Betrieb mit geplanter Instandhaltung braucht Disziplin: den Plan einhalten, Aufzeichnungen führen, Ersatzteile im Blick behalten und eine Abstellung vorbereiten. Ein Betrieb, in dem überwiegend Störungen gelöscht werden, braucht ein anderes Naturell — schnelle Diagnose unter Druck, den Mut zu einer provisorischen Entscheidung und die Belastbarkeit dafür, dass nachts das Telefon klingelt.',
            'Das Verhältnis zwischen geplanter und Störungsarbeit gehört zu den wertvollsten Angaben, die eine Beschreibung enthalten kann.',
          ],
        },
        {
          heading: 'Rufbereitschaft, Anfahrt und Schichtabdeckung',
          body: [
            'Über die Annahme eines Angebots entscheidet hier oft eine Bedingung, die mit Fachlichkeit nichts zu tun hat: wie häufig und in welcher Form Rufbereitschaft gehalten wird. Das tschechische Arbeitsgesetzbuch regelt die Arbeitsbereitschaft als Zeit, in der Beschäftigte außerhalb ihres Schichtplans an einem vereinbarten Ort außerhalb des Arbeitsplatzes zur Arbeit bereit sind; sie muss vereinbart werden, es steht dafür eine Vergütung nach dem Arbeitsgesetzbuch zu, und während ihrer über die festgelegte Wochenarbeitszeit hinaus geleistete Arbeit ist Überstundenarbeit.',
            'Für die Person ist es ein Eingriff ins Private, den sie gemeinsam mit der Anfahrtsstrecke abwägt. Nennen Sie es deshalb in der Beschreibung.',
          ],
        },
        {
          heading: 'Dokumentation und Übergabe zwischen Schichten',
          body: [
            'Die Instandhaltung ist eine Rolle, in der nicht ein angefangenes Teil übergeben wird, sondern ein Maschinenzustand. Verlässt jemand die Schicht mit dem Hinweis, „es läuft vorerst auf Provisorium", und steht das nirgends, zeigt sich der Verlust erst bei der nächsten Störung. Zu den zu prüfenden Fähigkeiten gehört deshalb, wie eine Person einen Eingriff dokumentiert: was die Ursache war, was ersetzt wurde und was vorläufig geblieben ist.',
            'Ein Teil der Dokumentation ist verpflichtend. Bei vorbehaltenen technischen Anlagen regelt das tschechische Gesetz Nr. 250/2021 Sb. die Anforderungen an Kontrollen, Prüfungen und die fachliche Befähigung der Personen, die sie durchführen.',
          ],
        },
        {
          heading: 'Passive Kandidaten und der Weg von innen',
          body: [
            'Eine erfahrene Instandhaltungskraft sucht in der Regel keine Arbeit. Sie ist beschäftigt und beurteilt ein Angebot aus einer Lage, in der nichts drängt. Das verändert den gesamten Ablauf: Eine Anzeige genügt meist nicht, Empfehlungen und Direktansprache spielen eine Rolle, die Auswahl dauert länger, und das Angebot muss beim ersten Mal verständlich sein.',
            'Der zweite reale Weg führt von innen. Eine Bedien- oder Einrichtkraft, die Maschinenpark, Technologie und Menschen kennt, hat einen Vorsprung, der sich von außen nicht kaufen lässt. Es fehlen Nachweis und Systematik — beides ist lösbar.',
          ],
        },
      ],
      cta: {
        label: 'Elektriker',
        targetConceptId: 'electricians',
        note: 'Was die elektrotechnische Befähigung abdeckt und was nicht.',
      },
    },
  },

  'quality-roles': {
    de: {
      title: 'Positionen in der Qualitätssicherung: Prüfung, Messtechnik und Audits',
      description:
        'Die Stufen von der Prüfung bis zur Leitung, was beim Messen zu prüfen ist, der tschechische messtechnische Rahmen, wie Arbeitgeber Systemstandards angeben und warum Unabhängigkeit zählt.',
      h1: 'Positionen in der Qualitätssicherung: Prüfung, Messtechnik und Audits',
      intro:
        'Eine Beschreibung für eine Stelle „in der Qualität" gehört zu den ungenauesten in der Personalgewinnung. Unter derselben Bezeichnung verbirgt sich sowohl jemand, der an der Linie Teile sortiert, als auch jemand, der ein Kundenaudit führt — und dazwischen liegen mehrere Kompetenzstufen, eine andere Verantwortung und ein anderer Kandidatenkreis. Diese Seite zerlegt die Qualitätssicherung in die Rollen, die in Fertigungsbetrieben tatsächlich besetzt werden, und beschreibt, was dabei zu prüfen ist. Systemstandards führen wir so an, wie Arbeitgeber sie in ihren Anforderungen formulieren.',
      breadcrumb: 'Qualitätssicherung',
      sections: [
        {
          heading: 'Die Stufen von der Prüfung bis zur Leitung',
          body: [
            'Die Rollen in der Qualität bilden eine recht klare Abfolge, und es lohnt sich zu wissen, auf welcher Stufe eine Beschreibung tatsächlich steht. Der Unterschied zwischen benachbarten Stufen liegt nicht im Fleiß, sondern darin, worüber jemand entscheidet und welche Ergebnisse von ihm bleiben.',
            'In kleineren Betrieben verschmelzen die Stufen, und eine Person macht Prüfung, Messtechnik und Reklamationen. Das ist legitim, muss aber in der Beschreibung stehen — sonst kommen Bewerbungen von einer Stufe, während das Unternehmen jemanden erwartet, der drei abdeckt.',
          ],
        },
        {
          heading: 'Die Messkompetenz ist die Hauptachse der Auswahl',
          body: [
            'Unterschiede zwischen Kandidatinnen und Kandidaten zeigen sich verlässlich beim Messen. Messschieber und Mikrometer beherrscht nach Einweisung nahezu jede Person; der Unterschied liegt darin, ob sie die Zeichnung samt Toleranzen und geometrischen Angaben liest, zum Maß ein geeignetes Messmittel wählt und erkennt, wann diese Genauigkeit nicht genügt und ein Koordinatenmessgerät nötig ist.',
            'Eine praktische Probe ist kurz und überzeugend: Geben Sie eine Zeichnung und ein Teil und lassen Sie beschreiben, womit und wie das Maß geprüft würde und was mit einem Ergebnis an der Toleranzgrenze geschieht.',
          ],
        },
        {
          heading: 'Kalibrierung und der tschechische messtechnische Rahmen',
          body: [
            'Der messtechnische Teil der Rolle beruht darauf, dass jemand ein Messergebnis vertreten kann. Das tschechische Gesetz Nr. 505/1990 Sb. über das Messwesen gliedert die Messmittel und verlangt bei sogenannten bestimmten Messmitteln eine Eichung; diese ist nach jenem Gesetz der staatlichen Metrologie und autorisierten Stellen anvertraut, nicht einer betrieblichen Messtechnik. Die übrigen Arbeitsmessmittel hält das Unternehmen durch Kalibrierung nach eigener messtechnischer Ordnung und selbst festgelegten Fristen instand.',
            'Für die Besetzung folgt daraus eine konkrete Frage: Gibt es im Unternehmen bestimmte Messmittel, wer führt ihre Evidenz und wer entscheidet über die Fristen.',
          ],
        },
        {
          heading: 'Systemstandards, wie Arbeitgeber sie angeben',
          body: [
            'In Anforderungen tauchen regelmäßig Systemnormen auf: ISO 9001 als allgemeiner Rahmen eines Qualitätsmanagementsystems, IATF 16949 bei Zulieferern der Automobilindustrie und HACCP als System für Lebensmittelsicherheit in der Lebensmittelproduktion. Wir beschreiben sie als Anforderungen, die Arbeitgeber stellen, und nicht als Zertifizierungen, die eine Personalagentur besitzt.',
            'Für das Profil ist entscheidend, was praktisch daraus folgt: Kenntnis der Dokumentation und Aufzeichnungen, Erfahrung mit einem internen oder Kundenaudit und die Fähigkeit, ein Vorgehen zu vertreten.',
          ],
        },
        {
          heading: 'Reklamationen, 8D und die tägliche Dokumentation',
          body: [
            'Die tägliche Arbeit in der Qualität ist nicht Messen, sondern Schreiben. Prüfaufzeichnungen, Protokolle, Chargenfreigaben, Sperrungen, Beschreibungen von Abweichungen und Antworten auf Reklamationen machen den größten Teil aus — und sie sind das, was bleibt, wenn ein Problem Monate später rückwirkend behandelt wird.',
            'Kundenreklamationen haben in Lieferketten eine feste Struktur; in der Automobilindustrie wird üblicherweise die Form 8D verlangt, mit Sofortmaßnahme, Ursachenanalyse und Wirksamkeitsprüfung. Prüfen lässt sich das einfach: eine Reklamation beschreiben lassen, die jemand von der Annahme bis zum Abschluss geführt hat.',
          ],
        },
        {
          heading: 'Unabhängigkeit und warum hier die Branche wiegt',
          body: [
            'Die Qualität erfüllt ihre Funktion nur, wenn die Person, die eine Charge sperrt, nicht an der Leistung der Schicht gemessen wird, die sie sperrt. Klären Sie vor der Ausschreibung, wem die Rolle unterstellt ist, was sie allein entscheiden darf und wer im Streit mit der Produktion entscheidet. Danach wird gefragt, und eine ausweichende Antwort ist für erfahrene Menschen ein Warnsignal.',
            'Die Branche wiegt hier mehr als bei anderen technischen Stellen. Ein Automobilzulieferer arbeitet mit einer anderen Dokumentationskultur und einem anderen Eskalationstempo als die Lebensmittelproduktion, in der neben dem Messen die Hygiene hinzutritt.',
          ],
        },
      ],
      cta: {
        label: 'Fachkräfterekrutierung',
        targetConceptId: 'specialist-recruitment',
        note: 'Wie qualifizierte Rollen anders besetzt werden als operative.',
      },
    },
  },

  'shift-supervisors': {
    de: {
      title: 'Schichtleiter und Meister: von innen befördern oder von außen holen',
      description:
        'Die vier Aufgaben zugleich, was eine Beförderung aus dem Betrieb bringt und was fehlt, was ein Wechsel von außen einbringt und kostet, was zu prüfen ist und was eine beförderte Führungskraft in den ersten Monaten braucht.',
      h1: 'Schichtleiter und Meister: von innen befördern oder von außen holen',
      intro:
        'Die Stelle einer Meisterin oder eines Schichtleiters öffnet sich meist in einem ungünstigen Moment: Jemand ist gegangen, die Schicht zerfällt, und die Entscheidung fällt zwischen zwei Möglichkeiten — eine erfahrene Person aus dem Betrieb befördern oder außerhalb suchen. Beide Wege haben unterschiedliche Kosten und unterschiedliche Risiken, und keiner ist allgemein richtig. Diese Seite vergleicht beide ohne Beschönigung, beschreibt, was bei der ersten Führungsebene tatsächlich zu prüfen ist, und behandelt, was eine beförderte Führungskraft in den ersten Monaten braucht.',
      breadcrumb: 'Schichtleiter',
      sections: [
        {
          heading: 'Vier Aufgaben zugleich',
          body: [
            'Meisterin oder Schichtleiter halten vier Dinge gleichzeitig: Menschen, Plan, Qualität und Sicherheit. Innerhalb einer Schicht wechseln sie zwischen der Zuteilung von Menschen auf Positionen, der Reaktion auf Maschinenausfall oder Abwesenheit, der Entscheidung über ein abweichendes Teil und der Aufsicht darüber, dass sicher und mit vorgeschriebener Schutzausrüstung gearbeitet wird.',
            'Eine Stellenbeschreibung, die nur „Schichtführung" sagt, verrät fast nichts darüber, welche der vier Aufgaben in Ihrem Betrieb überwiegt.',
          ],
        },
        {
          heading: 'Von innen befördern: was Sie gewinnen und was fehlen wird',
          body: [
            'Eine Person aus dem Betrieb bringt mit, was sich nicht kaufen lässt: Sie kennt Technologie, Maschinenpark, Gewohnheiten der Schicht und die Stellen, an denen üblicherweise Fehler entstehen. Sie braucht keine Monate, um das Produkt zu verstehen, und wird als jemand angenommen, der weiß, wovon er spricht. Wo es vor allem um Kontinuität geht, ist das ein wesentlicher Vorteil.',
            'Es fehlt ihr in der Regel das Zweite: Menschen zu führen, mit denen sie gestern noch nebeneinander gearbeitet hat. Das ist eine andere Arbeit als die, in der sie gut war, und dieser Teil muss begleitet und nicht vorausgesetzt werden.',
          ],
        },
        {
          heading: 'Von außen holen: was es einbringt und was es kostet',
          body: [
            'Eine Person von außen bringt Methode und Vergleich. Sie hat eine andere Schichtorganisation gesehen, einen anderen Umgang mit Abweichungen, eine andere Art, eine Besprechung zu führen — und trägt keine Beziehungsgeschichte aus der Halle mit sich. Geht es darum, die Art der Führung zu ändern und nicht nur einen Platz im Plan zu füllen, ist dieser Weg meist wirksamer.',
            'Der Preis sind Zeit und Legitimität. Ohne Kenntnis von Technologie und Produkt kann sie in den ersten Wochen wenig entscheiden.',
          ],
        },
        {
          heading: 'Was bei dieser Rolle wirklich zu prüfen ist',
          body: [
            'Selbsteinschätzung hilft hier nicht — nahezu alle sagen von sich, sie könnten Menschen führen. Brauchbar sind konkrete Situationen aus der eigenen Praxis und die Frage, was jemand getan hat, nicht was er über Führung denkt.',
            'Nennen Sie die Teamgröße in der Beschreibung als Zahl aus dem eigenen Betrieb: fünf Menschen zu führen und fünfzig sind zwei verschiedene Arbeiten, auch wenn die Position gleich heißt.',
          ],
        },
        {
          heading: 'Warum diese Rolle über die Stabilität der Schicht entscheidet',
          body: [
            'Die erste Führungsebene ist der Ort, an dem sich täglich entscheidet, ob Menschen bleiben. Sie bestimmt, wie mit einer neuen Person am ersten Tag gesprochen wird, ob jemand bemerkt, dass es nicht gut läuft, wie Überstunden verteilt werden und ob eine Beschwerde irgendwo ankommt.',
            'Die Besetzung dieser Rolle wirkt sich auf die Stabilität einer ganzen Schicht deshalb stärker aus als die Besetzung einer einzelnen Position darin.',
          ],
        },
        {
          heading: 'Die Vorbereitung einer beförderten Führungskraft',
          body: [
            'Eine Beförderung ist ein Zeitraum, kein Moment. Eine neue Führungskraft muss wissen, was sie selbst entscheidet und was nicht, in den ersten Wochen ihre eigene Führung erreichbar haben, eine Schulung zu den Pflichten leitender Beschäftigter einschließlich Arbeitsschutz durchlaufen und ein Format haben, in dem sie die Schicht übergibt.',
            'Hilfreich ist auch, der Schicht vorab zu sagen, warum diese Person ausgewählt wurde — eine unerklärte Beförderung legt sich das Team auf eigene Weise aus.',
          ],
        },
      ],
      cta: {
        label: 'Mitarbeiterbindung',
        targetConceptId: 'employee-retention',
        note: 'Warum sich Bindung an der ersten Führungsebene entscheidet.',
      },
    },
  },

  'automation-technicians': {
    de: {
      title: 'Automatisierungstechniker gewinnen: was die Rolle tatsächlich abgrenzt',
      description:
        'Was sich unter „Automatisierung" verbirgt, welche Anforderungen aus tschechischen Vorschriften folgen und welche Branchenüblichkeit oder betriebliche Wahl sind, wie mit Steuerungsplattformen umzugehen ist und warum die Sicherheitstechnik eine eigene Frage braucht.',
      h1: 'Automatisierungstechniker gewinnen: was die Rolle tatsächlich abgrenzt',
      intro:
        'Die Automatisierung ist unter den technischen Berufen darin besonders, dass sie sich nicht mit einem Fachgebiet beschreiben lässt. Wer an einer Linie die Steuerung einrichtet, bewegt sich zwischen Elektrotechnik, Mechanik und Software, und je nachdem, welche dieser drei Seiten Ihr Betrieb am meisten braucht, sieht die passende Person anders aus. Eine Beschreibung der Art „wir suchen einen Automatisierungstechniker" sagt deshalb für sich genommen fast nichts. Diese Seite trennt, was aus Vorschriften folgt, was bloße Branchenüblichkeit ist und was jeder Betrieb selbst festlegt.',
      breadcrumb: 'Automatisierungstechnik',
      sections: [
        {
          heading: 'Was sich unter „Automatisierung" verbirgt',
          body: [
            'Unter einem Namen treffen sich Rollen mit sehr unterschiedlichem Inhalt. Irgendwo geht es vor allem um Instandhaltung und Diagnose bereits laufender Linien, anderswo um die Inbetriebnahme neuer Anlagen, um Programmanpassungen bei Produktionsänderungen oder um den Entwurf des Steuerungsteils einer neuen Maschine. Jede Variante betont eine andere Fähigkeit.',
          ],
        },
        {
          heading: 'Was aus Vorschriften folgt und was nicht',
          body: [
            'Hier lohnt es sich, drei Dinge zu trennen, die in Anzeigen üblicherweise vermischt werden.',
            'Geregelte Befähigung: Soll eine Person an einer elektrischen Anlage tätig werden, richtet sich ihre fachliche Befähigung nach der tschechischen Regierungsverordnung Nr. 194/2022 Sb. Das ist eine rechtliche Anforderung, die an Tätigkeit und Anlage knüpft und nicht an eine Stellenbezeichnung. Betreibt ein Unternehmen vorbehaltene technische Anlagen, gilt zusätzlich das tschechische Gesetz über vorbehaltene technische Anlagen.',
            'Branchenüblichkeit: Vertrautheit mit der Umgebung eines bestimmten Herstellers ist in Beschreibungen verbreitet, wird aber von keiner Vorschrift verlangt.',
            'Betriebliche Wahl: Welche Plattform eingesetzt wird und wie weit eine Fachkraft in ein laufendes Programm eingreifen darf, legt jeder Betrieb selbst fest.',
          ],
        },
        {
          heading: 'Steuerungsplattformen und der Umgang damit in der Beschreibung',
          body: [
            'Die Kenntnis einer bestimmten Plattform ist der häufigste Grund, aus dem eine Beschreibung den Kreis unnötig verengt. Die Umgebungen der Hersteller unterscheiden sich, die Logik der Arbeit überträgt sich jedoch weitgehend — wer versteht, was die Steuerung tun soll, findet sich in einer anderen Umgebung zurecht, wenn er Zeit dafür bekommt.',
            'Es lohnt sich deshalb, in der Beschreibung zu trennen, was wirklich notwendig ist und was sich erlernen lässt.',
          ],
        },
        {
          heading: 'Die Sicherheitstechnik und warum man danach getrennt fragt',
          body: [
            'Die Sicherheitskreise von Maschinen sind der Bereich, in dem sich die Erfahrung am stärksten unterscheidet und in dem sich das zugleich am schlechtesten aus einem Lebenslauf erkennen lässt. Manche haben sich nur in der Betriebslogik bewegt, andere regelmäßig auch Sicherheitsfunktionen und deren Dokumentation bearbeitet.',
            'Für den Betrieb ist das wesentlich, weil ein Eingriff in den Sicherheitsteil andere Folgen hat als eine Änderung der Betriebslogik.',
          ],
        },
        {
          heading: 'Wonach Sie in der Auswahl fragen',
          body: [
            'Bei der Automatisierung bewährt es sich, nach konkreten Situationen zu fragen statt nach einer Liste von Technologien. Die Beschreibung einer tatsächlich gelösten Störung samt dem Weg zur Ursache sagt über die Arbeitsweise mehr als eine Aufzählung von Abkürzungen.',
            'Ebenso lohnt es sich zu besprechen, wie jemand mit Dokumentation umgeht und was er hinterlässt.',
          ],
        },
      ],
      cta: {
        label: 'Instandhaltung und technischer Service',
        targetConceptId: 'maintenance-technicians',
        note: 'Wo Automatisierungsarbeit auf die tägliche Instandhaltung trifft.',
      },
    },
  },

  'engineering-roles': {
    de: {
      title: 'Ingenieurpositionen: warum die Stellenbezeichnung nichts über die Person sagt',
      description:
        'Vier verschiedene Welten unter einem Namen — Prozess-, Fertigungs-, Industrial- und Messtechnik —, wann „Ingenieur" in Tschechien eine geregelte Tätigkeit ist und wann nur eine Bezeichnung, und Ausbildung gegen Erfahrung.',
      h1: 'Ingenieurpositionen: warum die Stellenbezeichnung nichts über die Person sagt',
      intro:
        'Das Wort Ingenieur wird in tschechischen Betrieben für Rollen verwendet, die nur eines gemeinsam haben: Sie befassen sich mit Technik. Eine verbessert den Ablauf der Fertigung, eine zweite betreut den Anlauf eines neuen Produkts, eine dritte entwirft die Gestaltung eines Arbeitsplatzes, eine vierte kümmert sich um Messung und Daten. Eine Beschreibung, die nur sagt „wir suchen einen Ingenieur für die Produktion", bringt deshalb meist Bewerbungen, die untereinander nicht vergleichbar sind. Diese Seite hilft zu benennen, um welche dieser Rollen es tatsächlich geht, und weist auf einen Unterschied hin, der bei der Besetzung regelmäßig übersehen wird.',
      breadcrumb: 'Ingenieurpositionen',
      sections: [
        {
          heading: 'Vier verschiedene Welten unter einem Namen',
          body: [
            'Ingenieurrollen in der Fertigung lassen sich danach unterscheiden, woran ihr Ergebnis hängt. Prozesstechnik dreht sich darum, wie die Fertigung abläuft und warum sie sich so verhält, wie sie sich verhält. Fertigungstechnik steht näher an Anläufen und Änderungen — Einführung eines neuen Teils, Verlagerung einer Linie, Anpassung eines Verfahrens.',
            'Industrial Engineering befasst sich mit der Organisation der Arbeit, Mess- und Datenrollen mit dem, was erfasst wird und was sich daraus schließen lässt.',
          ],
        },
        {
          heading: 'Wann „Ingenieur" eine geregelte Tätigkeit ist und wann nur eine Bezeichnung',
          body: [
            'Dieser Unterschied ist wichtig zu kennen, weil er eine häufige Quelle von Missverständnissen ist.',
            'Geregelte Tätigkeit: Die Autorisierung im Bauwesen nach dem tschechischen Gesetz Nr. 360/1992 Sb. betrifft ausgewählte Tätigkeiten im Bauwesen und in der Planung. Wer eine solche Tätigkeit ausübt, benötigt die Autorisierung — das ist eine rechtliche Anforderung und keine Gewohnheit.',
            'Bloße Bezeichnung: Bei der überwiegenden Mehrheit der Ingenieurpositionen in der Fertigung ist „Ingenieur" eine Bezeichnung, die ein Unternehmen wählt. Keine Vorschrift knüpft daran an, und sie zu verlangen, als wäre es eine, verengt den Kreis ohne Grund.',
          ],
        },
        {
          heading: 'Ausbildung gegen Erfahrung',
          body: [
            'Bei Ingenieurpositionen wird häufig automatisch ein technischer Hochschulabschluss verlangt. In vielen Betrieben ist das begründet, in anderen eher eine Gewohnheit, die erfahrene Menschen ausschließt, die sich aus der Fertigung zu der Rolle hochgearbeitet haben.',
            'Nützlicher als eine Ausbildungsstufe ist die Frage, welche Art von Problem die Person selbstständig zerlegen können muss.',
          ],
        },
        {
          heading: 'Was in die Beschreibung gehört',
          body: [
            'Ingenieurpositionen besetzen sich besser, wenn die Beschreibung ein Ergebnis nennt statt einer Werkzeugliste. „Wir suchen jemanden, der die Zahl der abweichenden Teile an Linie X senkt" ist für eine Suche brauchbarer als eine Aufzählung von Methoden.',
            'Ebenso wichtig ist anzugeben, mit wem die Person arbeitet und welche Befugnisse sie hat. Wer ein eingefahrenes Verfahren ändern soll, ohne Befugnis darüber zu haben, bekommt eine unlösbare Aufgabe.',
          ],
        },
        {
          heading: 'Woher diese Menschen kommen',
          body: [
            'Ingenieurpositionen werden aus drei Quellen besetzt: durch Beförderung von innen, durch Wechsel aus einem anderen Betrieb derselben Branche und durch Wechsel aus einer anderen Branche. Jede Quelle hat einen Nachteil, den man vorher kennen sollte.',
            'Wer von innen kommt, kennt Betrieb und Menschen, hat aber womöglich keine Methode. Wer aus einem anderen Unternehmen der Branche kommt, bringt Vergleich mit, erwartet aber vergleichbare Bedingungen. Wer aus einer anderen Branche kommt, bringt einen frischen Blick und braucht länger, um das Produkt zu verstehen.',
          ],
        },
      ],
      cta: {
        label: 'Technologen und Konstrukteure',
        targetConceptId: 'process-and-design-engineers',
        note: 'Zwei Rollen, die häufiger verwechselt werden als jedes andere Paar.',
      },
    },
  },

  'process-and-design-engineers': {
    de: {
      title: 'Technologen und Konstrukteure: zwei Rollen, die verwechselt werden',
      description:
        'Wo eine Rolle endet und die andere beginnt, die technische Produktionsvorbereitung als eigene Disziplin, die Zeichnung als am besten prüfbare Fähigkeit und warum CAD und CAM eine betriebliche Wahl sind.',
      h1: 'Technologen und Konstrukteure: zwei Rollen, die verwechselt werden',
      intro:
        'Technologe und Konstrukteur gehören zu den Rollen, die in Anzeigen am häufigsten verwechselt werden, obwohl ihre Arbeit an entgegengesetzten Enden beginnt. Der Konstrukteur verantwortet, wie ein Teil aussehen und was es erfüllen soll. Der Technologe verantwortet, wie ein solches Teil in einem konkreten Betrieb tatsächlich gefertigt wird — mit welchem Verfahren, auf welcher Maschine, mit welchem Werkzeug und in welcher Zeit. Sie zu verwechseln heißt, eine Person mit völlig anderer Erfahrung zu suchen. Diese Seite behandelt, worin sich beide unterscheiden, was sich bei ihnen prüfen lässt und was von Ihrer Ausstattung abhängt.',
      breadcrumb: 'Technologen und Konstrukteure',
      sections: [
        {
          heading: 'Wo eine Rolle endet und die andere beginnt',
          body: [
            'Der Konstrukteur arbeitet mit einer Funktionsanforderung, und das Ergebnis ist eine Dokumentation, die ein Teil oder eine Baugruppe beschreibt — Form, Maße, Werkstoff, Toleranzen, Oberflächenanforderungen.',
            'Der Technologe übernimmt diese Dokumentation und überführt sie in einen Fertigungsablauf. Er behandelt Maschinen- und Werkzeugwahl, Aufspannung, Reihenfolge der Arbeitsgänge, Zeiten und die Frage, ob das Teil in diesem Betrieb überhaupt herstellbar ist.',
          ],
        },
        {
          heading: 'Die technische Produktionsvorbereitung als eigene Disziplin',
          body: [
            'Die technische Produktionsvorbereitung umfasst mehr als das Erstellen eines Ablaufs. Dazu gehören die Verwaltung der Dokumentation und ihrer Versionen, die Änderungsevidenz, die Werkzeugverwaltung, Zeitvorgaben und die Abstimmung mit Einkauf und Qualität.',
            'Für die Besetzung folgt daraus eines: Wer Abläufe für die Einzelfertigung erstellt hat, hat etwas anderes gelöst als jemand aus der Großserie.',
          ],
        },
        {
          heading: 'Die Zeichnung ist die am besten prüfbare Fähigkeit',
          body: [
            'Die Arbeit mit einer Zeichnung ist bei beiden Rollen das am besten Prüfbare. Es geht nicht nur ums Lesen von Maßen, sondern um das Verständnis von Toleranzen, vorgeschriebener Oberflächengüte und geometrischen Anforderungen.',
            'Eine praktische Prüfung an einer echten Zeichnung aus Ihrem Betrieb sagt binnen Minuten mehr als eine Programmliste im Lebenslauf — und ist fair gegenüber beiden Seiten, weil die Person die Arbeit sieht, um die es geht.',
          ],
        },
        {
          heading: 'CAD und CAM: Anforderung des Betriebs, nicht des Berufs',
          body: [
            'Das konkrete CAD- oder CAM-System wählt das Unternehmen. Keine Vorschrift schreibt es vor, und der Wechsel zwischen Systemen fällt leichter als üblicherweise angenommen — besonders erfahrenen Menschen, die verstehen, was sie vom System wollen.',
            'Entscheidend ist, ob der Betrieb Kapazität zur Einarbeitung hat. Tritt ein Technologe als einziger ein und soll sofort Aufträge übernehmen, wiegt eine genaue Übereinstimmung schwerer als sonst.',
          ],
        },
        {
          heading: 'Wie sich eine Beschreibung sinnvoll verengen lässt',
          body: [
            'Der häufigste Fehler ist eine Beschreibung, die alle im Unternehmen verwendeten Systeme und alle Fertigungsarten aufzählt. Es entsteht ein Profil, dem niemand entspricht.',
            'Besser ist zu beschreiben, was die Person in den ersten drei Monaten tun wird, und dazu anzugeben, was sofort gekonnt sein muss und was sich erlernen lässt. Diese Trennung erleichtert auch das Gespräch.',
          ],
        },
      ],
      cta: {
        label: 'Ingenieurpositionen',
        targetConceptId: 'engineering-roles',
        note: 'Die weitere Familie der Ingenieurrollen und was sie trennt.',
      },
    },
  },

  'engineering-trades': {
    de: {
      title: 'Metallberufe: Zerspanung, Schweißen und Schlosserei',
      description:
        'Die Familien der Metallberufe und ihre Unterschiede, warum Bedienen, Einrichten und Programmieren nicht dieselbe Ebene sind, und warum Zeichnung und Messmittel die Besetzbarkeit stärker bestimmen als die Maschinenmarke.',
      h1: 'Metallberufe: Zerspanung, Schweißen und Schlosserei',
      intro:
        'Unter den Metallberufen verbergen sich mehrere eigenständige Handwerke mit unterschiedlicher Ausbildung, unterschiedlichen Nachweisen und unterschiedlich großen Kandidatenkreisen. Eine Beschreibung „wir suchen einen Metaller" führt deshalb nirgendwohin — Zerspaner, Schweißer, Schlosser und Werkzeugmacher unterscheiden sich nicht nur in dem, was sie tun, sondern vor allem darin, woran sich ihre Befähigung prüfen lässt. Diese Seite behandelt die einzelnen Familien, die Grenze zwischen Bedienen, Einrichten und Programmieren und den Grund, warum am Ende Zeichnung und Messmittel mehr über die Besetzbarkeit entscheiden als die Maschinenmarke.',
      breadcrumb: 'Metallberufe',
      sections: [
        {
          heading: 'Die Familien und ihre Unterschiede',
          body: [
            'Die Metallfertigung ruht auf mehreren Handwerken, die aneinandergrenzen, sich aber nicht vertreten. Der Unterschied liegt nicht im Geschick, sondern darin, womit gearbeitet wird: Der Zerspaner trägt Werkstoff ab, der Schweißer verbindet ihn, der Schlosser fügt und passt, der Werkzeugmacher fertigt und pflegt die Werkzeuge und Vorrichtungen, mit denen alles Übrige gefertigt wird.',
            'Verwischt eine Beschreibung die Grenze zwischen ihnen, kommen Bewerbungen aus dem Nachbarhandwerk, und keine Seite trifft ein Vorwurf.',
          ],
        },
        {
          heading: 'Bedienen, Einrichten und Programmieren sind nicht dasselbe',
          body: [
            'Der häufigste Fehler betrifft nicht das Handwerk, sondern die Ebene. Die Bedienung überwacht die Maschine, legt Teile ein und entnimmt sie, prüft Maße und löst übliche Situationen. Der Einrichter bereitet die Maschine auf einen anderen Auftrag vor — spannt die Vorrichtung, vermisst Werkzeuge, fährt den Nullpunkt an, feilt Korrekturen nach und fertigt das erste Teil. Der Programmierer erstellt Technologie und Werkzeugbahn.',
          ],
        },
        {
          heading: 'Zeichnung und Messmittel sind die eigentliche Trennlinie',
          body: [
            'Zwei Fragenkreise bringen in der Auswahl am meisten: was jemand aus einer Zeichnung liest und was er mit einem Messmittel tut. Eine Zeichnung zu lesen heißt nicht, ein Maß zu finden. Es geht um Toleranzfeld, geometrische Toleranzen, vorgeschriebene Rauheit, Schnitte und Ansichten sowie Schweißzeichen — also darum, was geschieht, wenn das Maß stimmt und die Form nicht.',
          ],
        },
        {
          heading: 'Eine Maschine, mehrere Maschinen und der Wechsel zwischen Branchen',
          body: [
            'Die zweite Achse ist die Breite. Wer an einem Maschinentyp in langen Serien eingearbeitet ist, hat ein anderes Profil als jemand, der in Einzel- und Kleinserienfertigung zwischen Maschinen wechselt, die Zeichnung selbst liest und selbst einrichtet.',
            'Mehrmaschinenbedienung ist dabei nicht nur eine Frage des Könnens, sondern auch der Anordnung des Arbeitsplatzes und der Maschinenzeiten; ohne diese lässt sie sich nicht verlangen.',
          ],
        },
        {
          heading: 'Den Beruf beschreiben: die nationalen Verzeichnisse als gemeinsames Vokabular',
          body: [
            'Für die Beschreibung einer Stelle lohnt es sich, keine eigene Terminologie zu erfinden. Das tschechische nationale Berufsverzeichnis beschreibt Berufe, Typuspositionen und ihre fachlichen Anforderungen; das tschechische nationale Qualifikationsverzeichnis ordnet ihnen Berufsqualifikationen mit einem Bewertungsstandard zu, die sich nach einer Prüfung vor einer autorisierten Person nach dem tschechischen Gesetz über die Überprüfung und Anerkennung der Weiterbildung durch ein Zeugnis belegen lassen.',
          ],
        },
      ],
      cta: {
        label: 'Schweißer',
        targetConceptId: 'welders',
        note: 'Der Beruf, bei dem der Nachweis am wenigsten über den Titel und am meisten über einen geprüften Bereich sagt.',
      },
    },
  },

  'technical-office-roles': {
    de: {
      title: 'Technische Angestellte: was dazugehört und wie sich diese Stellen besetzen',
      description:
        'Was die tschechische Kategorie „THP" umfasst, warum sie eine betriebliche Einteilung und kein Rechtsbegriff ist, welche Rollen üblicherweise dazuzählen und warum die Besetzung an der Beschreibung hängt.',
      h1: 'Technische Angestellte: was dazugehört und wie sich diese Stellen besetzen',
      intro:
        'Die tschechische Abkürzung THP — technisch-wirtschaftliche Beschäftigte — wird in Fertigungs- und Logistikunternehmen täglich verwendet, doch jeder Betrieb zieht die Grenze dieser Kategorie selbst. Irgendwo umfasst sie nur die technische Produktionsvorbereitung, anderswo auch Meister, Planung, Einkauf und Lohnbuchhaltung. Für die Besetzung hat das eine wesentliche Folge: Dieselbe Stellenbezeichnung bedeutet in jedem Unternehmen andere Arbeit, sodass eine Anzeige ohne Beschreibung des tatsächlichen Inhalts Menschen anzieht, die etwas anderes getan haben. Diese Seite erklärt, was die Kategorie in der Praxis umfasst und worin sie sich von gewerblichen Berufen unterscheidet.',
      breadcrumb: 'Technische Angestellte',
      sections: [
        {
          heading: 'Was die Kategorie in der tschechischen Praxis bedeutet',
          body: [
            'Technisch-wirtschaftliche Beschäftigte sind eine betriebliche Einteilung und kein Rechtsbegriff — das tschechische Arbeitsgesetzbuch kennt eine solche Kategorie nicht und knüpft daran keine besonderen Rechte oder Pflichten. Unternehmen verwenden sie in ihrer Organisationsstruktur, in Budgets und im Berichtswesen, um gewerbliche Berufe, deren Arbeit unmittelbar an einen Fertigungsvorgang gebunden ist, von technischer und administrativer Arbeit zu unterscheiden.',
            'Das gehört einem ausländischen Publikum deutlich gesagt, denn eine Kategorie, die in tschechischen Stellenanzeigen überall und im Gesetz nirgends vorkommt, wird leicht für eine Qualifikation gehalten.',
          ],
        },
        {
          heading: 'Welche Rollen üblicherweise dazuzählen',
          body: [
            'Der Umfang unterscheidet sich mit der Größe des Betriebs. In einem kleineren Unternehmen deckt eine Person Technologie und Planung zugleich ab, in einem größeren sind es getrennte Arbeitsplätze mit eigenen Schnittstellen.',
            'Am häufigsten umfasst die Kategorie die technische Produktionsvorbereitung, die Fertigungsplanung, die Qualität, den Einkauf, die Logistikadministration und das kaufmännische Umfeld des Betriebs.',
          ],
        },
        {
          heading: 'Warum die Besetzung an der Beschreibung hängt',
          body: [
            'Bei gewerblichen Berufen lässt sich die Arbeit über Maschine und Arbeitsgang recht gut beschreiben. Bei technisch-administrativen Rollen ergibt sich der Inhalt daraus, welche Systeme der Betrieb nutzt, wie viele Aufträge geplant werden, wie die Änderung von Dokumentation organisiert ist und mit wie vielen Menschen sich die Person täglich abstimmt.',
            'Zwei Fertigungsplaner mit derselben Stellenbezeichnung können daher Arbeit tun, die kaum etwas gemeinsam hat.',
          ],
        },
        {
          heading: 'Das nationale Berufsverzeichnis für die Anforderungen nutzen',
          body: [
            'Das tschechische nationale Berufsverzeichnis, geführt vom Ministerium für Arbeit und Soziales, beschreibt einzelne Berufe und ihre Typuspositionen samt den üblichen Tätigkeiten, den nötigen Kenntnissen und Fähigkeiten und der entsprechenden Ausbildungsstufe.',
            'Für eine Beschreibung ist es vor allem als neutrales Vokabular nützlich: Vergleicht man den Katalogeintrag mit dem, was die Person bei Ihnen tatsächlich tun soll, zeigt sich schnell, wo Ihre Erwartungen von den üblichen abweichen.',
          ],
        },
        {
          heading: 'Der kaufmännische und administrative Teil',
          body: [
            'Neben technischen Rollen gehört das kaufmännische Umfeld des Betriebs dazu — Lohn- und Personaladministration, Fakturierung, Evidenz und Einkaufsagenda. Diese Stellen werden anders besetzt als technische: Entscheidend sind die Kenntnis des konkreten Systems, in dem die Agenda geführt wird, die Anbindung an geltende Vorschriften und Zuverlässigkeit bei Terminen.',
          ],
        },
      ],
      cta: {
        label: 'Glossar für Arbeitgeber',
        targetConceptId: 'employer-glossary',
        note: 'Weitere tschechische Personalbegriffe, die sich nicht sauber übersetzen lassen.',
      },
    },
  },

  'logistics-specialists': {
    de: {
      title: 'Logistik-Fachkräfte: Planung, Disposition und Lagerleitung',
      description:
        'Die dünne Schicht über der operativen: wo die operative endet und die fachliche beginnt, welche Rollen sie bildet, die Tiefe der Systemkenntnis als Auswahlkriterium, Zollabwicklung und Planen unter Instabilität.',
      h1: 'Logistik-Fachkräfte: Planung, Disposition und Lagerleitung',
      intro:
        'Die meisten Texte über Logistikbesetzung beschreiben die operative Schicht — Menschen, die Ware körperlich annehmen, einlagern, kommissionieren und versenden. Darüber steht eine deutlich dünnere Schicht fachlicher Rollen, die entscheiden, was wann wohin bewegt wird: Disposition, Transportplanung, Lagerleitung, Beschaffung und Zollabwicklung. Diese Stellen werden anders besetzt als operative Schichten. Entscheidend sind die Kenntnis konkreter Systeme, die Fähigkeit unter sich ändernden Bedingungen zu planen und die Verantwortung für eine Entscheidung, deren Preis sich erst später zeigt.',
      breadcrumb: 'Logistik-Fachkräfte',
      sections: [
        {
          heading: 'Wo die operative Schicht endet und die fachliche beginnt',
          body: [
            'Die Grenze zieht man am besten danach, wer den Plan ausführt und wer ihn erstellt. Lagerkräfte, Handling-, Kommissionier- und Versandkräfte arbeiten nach einer Vorgabe, die System und Schicht ihnen bringen. Disponentin, Planer oder Lagerleitung erstellen diese Vorgabe, ändern sie im Tagesverlauf und tragen ihre Folgen.',
          ],
        },
        {
          heading: 'Welche Rollen diese Schicht bilden',
          body: [
            'Die Bezeichnungen unterscheiden sich von Unternehmen zu Unternehmen, der Inhalt wiederholt sich jedoch. In einer Beschreibung ist es deshalb besser, die Verantwortung zu benennen als den Titel — derselbe Titel bedeutet in einem kleinen Lager und in einem Distributionszentrum Verschiedenes.',
            'Das tschechische nationale Berufsverzeichnis beschreibt Berufe und ihre üblichen Anforderungen und ist ein geeigneter Ausgangspunkt, wenn eine Beschreibung zu klären ist.',
          ],
        },
        {
          heading: 'Die Arbeit mit Systemen als echtes Auswahlkriterium',
          body: [
            'Bei dieser Schicht ist die Arbeit mit Systemen eines der wenigen Kriterien, die sich in der Auswahl redlich prüfen lassen. Es geht nicht um die im Lebenslauf genannte Marke eines WMS oder ERP. Entscheidend ist die Tiefe: Die Arbeit einer Person, die im System nur Aufgaben bestätigt, unterscheidet sich von der einer Person, die Stammdaten anlegt, Einlagerungsregeln einstellt, Bestandsdifferenzen klärt und dem System eine Antwort entlocken kann.',
          ],
        },
        {
          heading: 'Zollabwicklung und Sendungen außerhalb des Zollgebiets der Union',
          body: [
            'Ein Teil der Logistikbetriebe kommt ohne Zollabwicklung aus, ein anderer beruht darauf. Überschreitet Ware die Grenze des Zollgebiets der Union, brauchen Sie jemanden, der Zolldokumente vorbereiten und abgeben, mit Zollverfahren und Vertretung im Zollverfahren arbeiten und die anschließende Dokumentation im Blick behalten kann. Diese Kompetenz ist meist eng an eine bestimmte Warenart gebunden.',
          ],
        },
        {
          heading: 'Planen unter Instabilität',
          body: [
            'Planungsrollen in der Logistik unterscheiden sich von der Fertigungsplanung dadurch, wie schnell sich die Eingangsgrößen ändern: eine verspätete Lieferung, ein abgesagter Frachtführer, fehlende Menschen in der Schicht, ein außerordentlicher Auftrag. Die Qualifikation zeigt sich nicht an einem ruhigen Tag, sondern in dem Moment, in dem der Plan nicht mehr gilt.',
            'In der Auswahl lohnt es sich deshalb, einen konkreten Tag beschreiben zu lassen, an dem der Plan gescheitert ist.',
          ],
        },
        {
          heading: 'Warum diese Schicht auf dem Markt dünn ist',
          body: [
            'Operative Rollen gibt es in jedem Lager viele, fachliche nur wenige — Lagerleitung, Disposition, Planung, Systembetreuung. Die Kompetenz entsteht zudem über längere Zeit innerhalb eines konkreten Betriebs und nicht in der Schule, sodass die Menschen, die sie haben, üblicherweise keine Arbeit suchen und auf Anzeigen nicht reagieren.',
            'Zahlen zur Verfügbarkeit dieser Berufe nennen wir hier nicht.',
          ],
        },
      ],
      cta: {
        label: 'Direktansprache',
        targetConceptId: 'direct-sourcing',
        note: 'Wie Menschen angesprochen werden, die keine Arbeit suchen.',
      },
    },
  },

  'purchasing-and-supply': {
    de: {
      title: 'Einkauf und Beschaffung: Stellen besetzen, in denen die Befugnis entscheidet',
      description:
        'Drei Ebenen unter einer Bezeichnung, was Branchenkenntnis ist und was sich erlernen lässt, wo der Einkauf auf Qualität und Logistik trifft, was sich in der Auswahl prüfen lässt und Lieferantenrisiko als eigene Fähigkeit.',
      h1: 'Einkauf und Beschaffung: Stellen besetzen, in denen die Befugnis entscheidet',
      intro:
        'Der Einkauf gehört zu den Bereichen, in denen Stellenbezeichnung und tatsächliche Verantwortung am weitesten auseinandergehen. Unter „Einkäufer" verbirgt sich sowohl die Person, die nach Plan bestellt und Termine verfolgt, als auch die Person, die Lieferanten auswählt und Rahmenbedingungen für Jahre verhandelt. Der Unterschied liegt nicht in der Erfahrung, sondern im Maß der Entscheidungsbefugnis — und genau die bestimmt, wen anzusprechen sinnvoll ist. Diese Seite hilft, die Stelle abzugrenzen, und weist darauf hin, was sich prüfen lässt und was an das konkrete Unternehmen gebunden bleibt.',
      breadcrumb: 'Einkauf und Beschaffung',
      sections: [
        {
          heading: 'Drei Ebenen unter einer Bezeichnung',
          body: [
            'Der operative Einkauf arbeitet innerhalb vorgegebener Regeln: bestellt nach dem Bedarf der Fertigung, verfolgt Bestätigungen und Termine, bearbeitet Eilfälle und Abweichungen. Er entscheidet über den Ablauf, nicht darüber, bei wem gekauft wird.',
            'Die Bestandsplanung steht zwischen Einkauf und Fertigung. Sie bestimmt, wovon wie viel und wann verfügbar sein soll, und trägt die Folgen beider Fehler — stehender Fertigung und unnötig gebundener Mittel.',
            'Der strategische Einkauf wählt Lieferanten aus und verhandelt Bedingungen. Auf dieser Ebene wirkt eine Entscheidung über Jahre.',
          ],
        },
        {
          heading: 'Branchenkenntnis und was sich erlernen lässt',
          body: [
            'Branchenüblichkeit: Die Kenntnis einer bestimmten Warengruppe — Hüttenmaterial, Kunststoffe, elektronische Bauteile, Verpackungen — hat reales Gewicht. Wer jahrelang Gussteile eingekauft hat, weiß, wo Termin- und Qualitätsprobleme entstehen, und das holt man nicht schnell nach.',
            'Betriebsspezifisch: das konkrete Unternehmenssystem, die Freigaberegeln, die Geschichte der Lieferantenbeziehungen. Das lernt man im Betrieb und sollte es nicht zur Einstiegsvoraussetzung machen.',
          ],
        },
        {
          heading: 'Wo der Einkauf auf Qualität und Logistik trifft',
          body: [
            'Der Einkauf funktioniert nicht getrennt. Bei Reklamationen gegenüber Lieferanten greift er in die Qualitätssicherung, bei Importen in Zoll und Transport, bei der Planung in die Fertigung.',
            'Für die Besetzung heißt das, zu klären, welcher Teil dieser Berührungsflächen in die Rolle fällt. Ein Unternehmen, in dem der Einkauf Reklamationen und Lieferantenbewertung selbst bearbeitet, sucht eine andere Person als eines, in dem er das nicht tut.',
          ],
        },
        {
          heading: 'Was sich in der Auswahl tatsächlich prüfen lässt',
          body: [
            'Im Einkauf lassen sich gerade die Fähigkeiten schlecht prüfen, über die am meisten gesprochen wird. Verhandeln erkennt man nicht am Lebenslauf, und allgemeine Fragen dazu helfen nicht.',
            'Brauchbarer ist, eine konkrete Situation beschreiben zu lassen, in der ein Lieferant Termin oder Qualität nicht eingehalten hat — was die Person tat, wen sie einbezog und wie es ausging.',
          ],
        },
        {
          heading: 'Lieferantenrisiko als eigene Fähigkeit',
          body: [
            'Der Einkauf wird am Preis gemessen, erkennen lässt er sich aber daran, wie er Ausfälle bewältigt. Der Umgang mit Lieferantenrisiko unterscheidet eine erfahrene Person von einer, die nur bestellen kann.',
            'Dazu gehören die Beobachtung der finanziellen Lage eines Lieferanten, das Bewusstsein, wo das Unternehmen von einer einzigen Quelle abhängt, die Vorbereitung einer Alternative, bevor sie gebraucht wird, und das frühe Erkennen von Warnzeichen.',
          ],
        },
        {
          heading: 'Wie sich die Rolle beschreiben lässt',
          body: [
            'Der verlässlichste Weg, eine Beschreibung zu klären, ist die Antwort auf eine einzige Frage: Worüber entscheidet diese Person allein, und was legt sie zur Genehmigung vor? Die Antwort grenzt die Rolle genauer ab als jede Stellenbezeichnung.',
            'Ergänzen Sie, mit welchen Warengruppen gearbeitet wird, ob es sich um inländische oder ausländische Lieferanten handelt und wer im Unternehmen die Gegenseite ist.',
          ],
        },
      ],
      cta: {
        label: 'Anforderungsprofil',
        targetConceptId: 'role-brief',
        note: 'Ein Profil schreiben, nach dem sich tatsächlich suchen lässt.',
      },
    },
  },
}
