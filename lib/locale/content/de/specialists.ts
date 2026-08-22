import type { LocaleCorpus } from '../types'

/**
 * L1 Fachkräfte-Cluster – Deutsch.
 *
 * Dreizehn Berufe, und das Cluster, in dem die tschechischen Quellen am
 * genauesten sagen, was ein Nachweis aussagt und was nicht: Ein Schweißzeugnis
 * beschreibt einen geprüften Bereich und keinen Beruf, die fachliche Befähigung
 * in der Elektrotechnik knüpft an Tätigkeit und Anlage statt an eine Person, und
 * „THP“ ist eine betriebliche Kategorie, die das tschechische Arbeitsrecht gar
 * nicht kennt.
 *
 * Zwei Dinge tragen durchgehend. Rechtsvorschriften werden als tschechische
 * Vorschriften benannt und nie verallgemeinert. Und wo die Quelle sagt, ein
 * Standard sei etwas, das ARBEITGEBER verlangen – ISO 9001, IATF 16949, HACCP –,
 * sagt die Übersetzung dasselbe und lässt es nicht zu einer Zertifizierung
 * werden, die diese Agentur besäße.
 */
export const DE_SPECIALISTS: LocaleCorpus = {
  welders: {
    de: {
      title: 'Schweißer rekrutieren: Verfahren, Nachweise und Geltungsbereich',
      description:
        'Was ein Schweißerzeugnis nach ČSN EN ISO 9606-1 aussagt – Verfahren, Werkstoff, Position, Dicke –, der Unterschied zum Schweißerpass und der Aufbau einer Probeschweißung.',
      h1: 'Schweißer rekrutieren: Verfahren, Nachweise und Geltungsbereich',
      intro:
        'Eine Anzeige, die „einen Schweißer“ sucht, ist für Kandidatinnen und Kandidaten ebenso unbestimmt, wie wenn ein Fertigungsbetrieb „jemanden für die Maschinen“ suchte. Schweißen ist keine einzelne Fertigkeit, sondern eine Reihe von Kombinationen aus Verfahren, Werkstoff, Bauteilform und Position – und der Nachweis, den eine Schweißerin oder ein Schweißer mitbringt, ist kein Berufszeugnis, sondern die Beschreibung des Bereichs, in dem die Prüfung abgelegt wurde. Trifft die Stellenbeschreibung diesen Bereich nicht, füllt sich das Verfahren mit Menschen, die schweißen können – nur nicht das, was Sie brauchen. Diese Seite zeigt, wie die Beschreibung aussehen muss, was im Nachweis zu lesen ist, wie eine Probeschweißung aufgebaut wird und was der Arbeitsschutz bei diesem Beruf hinzufügt.',
      breadcrumb: 'Schweißer',
      sections: [
        {
          heading: 'Was ein Schweißernachweis tatsächlich aussagt',
          body: [
            'Eine Schweißerprüfung nach ČSN EN ISO 9606-1 findet nicht allgemein statt. Es wird ein Prüfstück unter genau festgelegten Bedingungen geschweißt, und das Zeugnis beschreibt anschließend den damit nachgewiesenen Bereich. Genau dieser Bereich – nicht das Wort „Schweißer“ – ist die Information, mit der die Besetzung arbeiten muss.',
            'Die genannte Norm betrifft Stähle; Aluminium und seine Legierungen behandelt ein anderer Teil derselben Norm, ein Nachweis für Stahl sagt über Aluminium also nichts aus.',
          ],
          list: {
            intro:
              'Der Bereich setzt sich aus mehreren Variablen zugleich zusammen, und die Änderung einer einzigen kann bedeuten, dass der Nachweis für Ihre Arbeit nicht genügt:',
            items: [
              'Das Schweißverfahren in der Zahlenbezeichnung nach ČSN EN ISO 4063 – etwa 111 (Lichtbogenhandschweißen mit umhüllter Elektrode), 135 (MAG mit Massivdraht), 136 (Fülldrahtelektrode), 141 (WIG mit Wolframelektrode)',
              'Die Gruppe des Grundwerkstoffs – unlegierter und nichtrostender Stahl sind nicht dasselbe',
              'Die Erzeugnisform – Blech oder Rohr',
              'Die Nahtart – Stumpfnaht oder Kehlnaht',
              'Die Schweißposition in der Bezeichnung nach ČSN EN ISO 6947, etwa PA, PB, PC oder PF; manche Positionen decken andere mit ab',
              'Die Werkstoffdicke und bei Rohren der Durchmesser, woraus sich der Geltungsbereich ableitet',
              'Die Wurzelausführung – mit oder ohne Unterlage',
            ],
          },
        },
        {
          heading: 'Warum eine Anzeige für „einen Schweißer“ unbrauchbare Bewerbungen bringt',
          body: [
            'Fehlt der Bereich in der Anzeige, ergänzt ihn die bewerbende Person selbst. Es meldet sich jemand mit einem Grundkurs im Verfahren 111 an Blechen, weil er sich zu Recht Schweißer nennt – und kommt an einen Arbeitsplatz, an dem Verfahren 141 an nichtrostenden Rohren vorgeschrieben ist, Position PF und eine Naht ohne Wurzelunterlage. Niemand hat gelogen; beide Seiten haben sich unter demselben Wort verschiedene Arbeit vorgestellt.',
            'Der Aufwand liegt nicht nur in vergeblichen Gesprächen. Eine ungenaue Beschreibung verzerrt auch das Bild vom Markt: Das Unternehmen gewinnt den Eindruck, es gebe keine Schweißer, obwohl es in Wahrheit noch nicht beschrieben hat, was es braucht. Eine Beschreibung mit Bereich wirkt umgekehrt als Filter: Wer den Bereich nicht hat, bewirbt sich meist nicht, und wer sich bewirbt, bringt einen Nachweis mit, der sich mit der Anforderung vergleichen lässt.',
            'Konkrete Löhne oder Lohnspannen für Schweißer nennt diese Seite nicht. Eine Orientierung nach Berufen und Regionen bietet das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV). In die eigene Entscheidung gehören daneben der Umfang der Qualifikation, das Schichtmodell und die Frage, ob es um Werkstattarbeit oder um Montage außerhalb des Betriebs geht.',
          ],
          list: {
            intro: 'In die Anzeige gehört deshalb:',
            items: [
              'Verfahren, Werkstoffgruppe, Erzeugnisform, Position und Dickenbereich',
              'Die Unterscheidung zwischen Werkstattarbeit und Montage auf der Baustelle oder beim Kunden',
              'Die Angabe, ob nach Schweißanweisung (WPS) und nach Zeichnung gearbeitet wird',
              'Die Angabe, ob Sie ein gültiges Zeugnis verlangen oder ob Schweißerpass und Einweisung genügen',
              'Das Schichtmodell – bei diesem Beruf beeinflusst es das Interesse der Kandidatinnen und Kandidaten deutlich',
            ],
          },
        },
        {
          heading: 'Schweißerpass, Grundkurs und Prüfungszeugnis',
          body: [
            'In der Praxis werden zwei verschiedene Nachweise vermischt. Ein Schweißerpass mit Eintrag über einen Grundkurs belegt, dass eine Person das Verfahren an einer Schweißschule erlernt hat und damit arbeiten kann. Das Zeugnis über die Schweißerprüfung nach ČSN EN ISO 9606-1 ist das Ergebnis einer Prüfung vor einer Prüfstelle und grenzt den Bereich ab, in dem dort gearbeitet werden darf, wo eine Produktnorm oder ein Kunde es verlangt.',
            'Für gewöhnliche Werkstattfertigung ohne besondere Anforderungen können Pass und Einweisung genügen. Sobald Sie die Schweißqualität jedoch gegenüber einem Kunden oder nach Normen belegen, die Anforderungen an die Qualität beim Schmelzschweißen festlegen, brauchen Sie die Prüfung und dazu eine Schweißaufsicht, die Schweißanweisungen und Schweißerqualifikationen verwaltet. Klären Sie diese Frage, bevor Sie mit der Besetzung beginnen – sie verändert den Kandidatenkreis ebenso wie das, was Sie verlangen werden.',
            'Ein Zeugnis gilt nicht lebenslang. Die Norm knüpft daran eine regelmäßige Bestätigung, dass tatsächlich im angegebenen Bereich geschweißt wird, sowie eine befristete Gültigkeit mit Bedingungen für die Erneuerung. Daten und Bereich stehen unmittelbar auf dem Nachweis; bei der Überprüfung ist das das Erste, was zu lesen ist.',
          ],
        },
        {
          heading: 'Die Probeschweißung entscheidet',
          body: [
            'Ein Nachweis sagt, was jemand am Prüfungstag unter den Bedingungen der Prüfstelle bewältigt hat. Ob er Ihre Arbeit bewältigt, entscheidet die Probeschweißung. Bereiten Sie ein Stück vor, das Ihrem üblichen Auftrag entspricht – gleicher Werkstoff, gleiche Dicke, Position, Nahtvorbereitung und möglichst auch die bei Ihnen verwendete Schweißanweisung.',
            'Achten Sie dabei auf mehr als das Aussehen der Naht: wie die Person die Stromquelle einstellt, ob sie die Zeichnung liest, wie sie den Werkstoff vorbereitet und reinigt, wie sie mit dem Schutzgas umgeht und wie sie die Naht selbst prüft. Überlassen Sie die Bewertung der Person, die bei Ihnen für das Schweißen verantwortlich ist, und halten Sie sie schriftlich fest – in strittigen Fällen und in einer weiteren Besetzungsrunde zahlt sich der Eintrag aus. Und weil es sich um Arbeit mit realem Risiko handelt, muss auch die bewerbende Person bei der Probeschweißung Schutzausrüstung erhalten und über die Regeln des Arbeitsplatzes unterwiesen werden. Die Bedingungen sollten für alle Bewerbenden auf dieselbe Position gleich sein.',
          ],
        },
        {
          heading: 'Schweißer aus dem Ausland und ihre Nachweise',
          body: [
            'Die Gewinnung aus dem Ausland ist beim Schweißen üblich, und der Nachweis ist häufig nach derselben Norm ausgestellt wie in Tschechien, weil es sich um eine übernommene internationale Norm handelt. Ohne Weiteres brauchbar ist er damit nicht. Prüfen Sie, wer das Zeugnis ausgestellt hat, welchen Bereich es enthält, ob es gültig ist und ob Ihr Kunde es akzeptiert – bei Lieferungen mit nachzuweisender Schweißqualität ist das meist entscheidend. Erfüllt es die Bedingungen nicht, folgt eine Prüfung in Tschechien.',
            'Das Zweite ist die Verständigung. Geschweißt wird nach Zeichnung und Schweißanweisung, und Sicherheitshinweise müssen verstanden werden. Überlegen Sie vorab, wie Sie sicherstellen, dass diese Unterlagen verstanden werden; bei Montagearbeiten außerhalb der Werkstatt gilt das doppelt.',
          ],
        },
        {
          heading: 'Arbeitsschutz, Schutzausrüstung und gesundheitliche Eignung',
          body: [
            'Schweißen hat ein eigenes Gefährdungsprofil, und die Besetzung trifft schon beim Eintritt darauf. Neben Verbrennungen und Funkenflug geht es um die Strahlung des Lichtbogens, die Augen und Haut schädigt, und um Schweißrauche – bei nichtrostenden Stählen und beschichteten Werkstoffen besonders beachtet.',
            'Schweißen außerhalb eines ortsfesten Schweißarbeitsplatzes ist nach tschechischen Vorschriften zudem mit besonderen Brandschutzanforderungen verbunden: schriftlich festgelegte Bedingungen für die jeweilige Arbeit und eine Aufsicht, die auch nach deren Ende fortdauert. Das wirkt sich auf die Planung aus – ein Montageschweißer ist nicht einfach ein Schweißer, der reist, sondern eine Rolle mit zusätzlicher Verwaltung und Verantwortung.',
          ],
          list: {
            intro: 'Beim Eintritt geht es deshalb konkret um:',
            items: [
              'Einen Schweißerschirm mit der richtigen Schutzstufe und schwer entflammbare Kleidung',
              'Die Absaugung der Schweißrauche am Arbeitsplatz, bei manchen Werkstoffen auch Atemschutz',
              'Eine arbeitsmedizinische Eintrittsuntersuchung, die Sehvermögen und Arbeitspositionen berücksichtigt',
              'Die Unterweisung über die Gefährdungen des Arbeitsplatzes; bei einer vorübergehenden Zuweisung nach tschechischem Recht stellt sie das Einsatzunternehmen sicher',
            ],
          },
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
      title: 'CNC-Bediener und Einrichter gewinnen: was die Besetzbarkeit wirklich bestimmt',
      description:
        'Der Unterschied zwischen Bedienung, Einrichten und Programmierung, dazu Steuerung, Messmittel und Zeichnung, Schichtmodell und die praktische Probe an der Maschine.',
      h1: 'CNC-Bediener und Einrichter gewinnen: was die Besetzbarkeit wirklich bestimmt',
      intro:
        'Viele festgefahrene CNC-Besetzungen beginnen nicht mit einem Mangel an Menschen, sondern mit einer Beschreibung, die drei verschiedene Positionen vermischt. Bediener, Einrichter und Programmierer unterscheiden sich in Verfügbarkeit, Einarbeitungsdauer und Kosten, und eine Anzeige, die sie zu einem Profil verschmilzt, sucht die höchste Stufe zu den Bedingungen der niedrigsten. Diese Seite behandelt, was die Besetzbarkeit einer CNC-Stelle tatsächlich bestimmt: Kenntnis der Steuerung, Umgang mit Messmittel und Zeichnung, Bedienung einer oder mehrerer Maschinen, Schichtmodell und die Form einer praktischen Probe. Löhne und Besetzungsfristen nennen wir hier nicht.',
      breadcrumb: 'CNC-Fachkräfte',
      sections: [
        {
          heading: 'Bedienung, Einrichten, Programmierung – drei Positionen in einer Anzeige',
          body: [
            'Der CNC-Bediener überwacht die Maschine im laufenden Programm: legt Teile ein und entnimmt sie, verfolgt den Ablauf, prüft Maße nach dem Prüfplan, wechselt stumpfe Werkzeuge nach Anweisung und meldet Abweichungen. Den Wechsel der Maschine auf einen anderen Auftrag nimmt er nicht vor.',
            'Der Einrichter bringt den Auftrag auf der Maschine zum Laufen. Er spannt Vorrichtung oder Backen, vermisst die Werkzeuge und gibt sie samt Korrekturen ein, fährt den Werkstücknullpunkt an, fährt das Programm trocken, fertigt und misst das erste Teil und übergibt die Maschine erst dann in den Serienlauf. Hier entscheiden sich Rüstzeit und Ausschuss, und deshalb ist ein Einrichter meist schlechter verfügbar als ein Bediener.',
            'Der Programmierer erstellt Technologie und Werkzeugbahn – entweder durch Werkstattprogrammierung unmittelbar an der Maschine oder in einem CAM-System mit anschließendem Postprozessor. Ein Unternehmen, das einen Programmierer sucht, löst einen anderen Bedarf als eines, dem Menschen für die Nachtschicht fehlen; die beiden in einem Profil zu vermischen heißt, auf eine Bewerbung zu warten, die nur ausnahmsweise kommt. Für die Benennung der einzelnen Stufen lohnt der Griff zur Beschreibung der Typposition im tschechischen Berufsverzeichnis (Národní soustava povolání) und nicht zu einer internen Abkürzung.',
          ],
          list: {
            intro: 'Vor der Ausschreibung klären Sie deshalb:',
            items: [
              'Wer bei Ihnen einrichtet – ein Einrichter, ein Meister oder der Bediener selbst',
              'Danach richten sich Stellenbezeichnung und Anforderungen, nicht umgekehrt',
              'Was vom Bediener beim Wechsel des Auftrags erwartet wird',
              'Beim Einrichter: Maschinentypen, Art der Aufspannung und Seriengröße',
            ],
          },
        },
        {
          heading: 'Die Steuerung: eine echte, aber erlernbare Grenze',
          body: [
            'Heidenhain, Siemens und Fanuc werden unterschiedlich bedient, und wer an eine Steuerung gewöhnt ist, ist an einer anderen in den ersten Tagen nicht gleich schnell. Das ist eine reale Grenze und nicht kleinzureden. Zugleich ist sie erlernbar: Wer die Zerspanungstechnologie versteht, Zeichnungen liest und messen kann, findet sich in einer anderen Oberfläche leichter zurecht als jemand, der nur eine Schrittfolge an einer bestimmten Maschine kennt.',
            'Praktisch folgt daraus: Bestehen Sie auf einer genauen Übereinstimmung der Steuerung, verengen Sie den Kreis so weit, dass die Besetzung länger dauert. Behandeln Sie die Übereinstimmung als Vorteil und nicht als Bedingung, müssen Sie die Einarbeitung und die Person bereithalten, die sie leistet. Diese Entscheidung gehört in die Beschreibung – sonst trifft sie in der Praxis die Vorauswahl für Sie.',
          ],
          list: {
            intro: 'Für die Beschreibung heißt das:',
            items: [
              'Nennen Sie die konkreten Steuerungen und Oberflächen, die im Betrieb tatsächlich vorhanden sind',
              'Sagen Sie rundheraus, ob die Kenntnis der Steuerung Bedingung oder Vorteil ist',
              'Beurteilen Sie die Werkstattprogrammierung gesondert – sie ist nicht dasselbe wie die Arbeit in CAM',
              'Legen Sie fest, wer eine neue Person an der Steuerung einarbeitet und in welchem Umfang',
            ],
          },
        },
        {
          heading: 'Messmittel und Zeichnung wiegen schwerer als die Maschinenmarke',
          body: [
            'Im Auswahlverfahren bewährt es sich, nach dem Messen zu fragen, bevor nach Maschinen gefragt wird. Messschieber, Mikrometer, Messuhr und Grenzlehren unterscheiden sich in Genauigkeit und Anwendung, und die Antwort auf „womit würden Sie dieses Maß prüfen und warum“ verrät mehr als eine Aufzählung von Marken.',
            'Dasselbe gilt für die Zeichnung. Toleranzfeld, geometrische Toleranzen und vorgeschriebene Rauheit bestimmen, was mit einem Teil geschieht, das das richtige Maß und die falsche Form hat. Auf dieselbe Ebene gehört, ob die Person weiß, warum das erste Teil vermessen wird, wie der Eintrag in den Prüfplan eingeht und was mit einem Teil geschieht, das nicht bestanden hat. Rückführbarkeit und Kalibrierung der verwendeten Messmittel haben ihren allgemeinen Rahmen im tschechischen Gesetz über das Messwesen und in der messtechnischen Ordnung des Betriebs.',
          ],
        },
        {
          heading: 'Eine Maschine oder mehrere',
          body: [
            'Mehrmaschinenbedienung steht häufiger in Anzeigen, als es der Betrieb hergibt. Damit sie sinnvoll ist, müssen Maschinenzeiten, Anordnung des Arbeitsplatzes und Art der Teile sie zulassen; sonst wird sie zur dauerhaften Quelle von Überstunden und Fehlern. Wenn Sie sie verlangen, nennen Sie die Zahl der Maschinen und die Arbeitsgänge.',
            'Auch das Profil unterscheidet sich. Wer jahrelang an einer Maschine in langen Serien gearbeitet hat, beherrscht sie perfekt, für den Wechsel zwischen Aufträgen braucht er jedoch eine Einarbeitung. Umgekehrt ist eine Fachkraft aus der Einzel- und Kleinserienfertigung häufige Umrüstungen und Selbstständigkeit gewohnt, nicht aber unbedingt das Tempo und die Disziplin der Großserie. Keines von beidem ist schlechter – man muss nur wissen, was der Betrieb wirklich braucht.',
          ],
        },
        {
          heading: 'Das Schichtmodell ist häufig der entscheidende Faktor',
          body: [
            'Bei CNC-Stellen entscheidet über die Besetzbarkeit überraschend oft die Schicht und nicht die Fertigkeit. Drei-Schicht- und Dauerbetrieb verengen den Kreis anders als Zwei-Schicht-Betrieb, auch unter Menschen, die die Arbeit wollen. Anfahrtsweg, familiäre Lage und die Frage, ob die Schichten vorhersehbar wechseln und der Plan früh genug bekannt ist, spielen mit.',
            'Ist die Schichtform vorgegeben und nicht änderbar, schreibt man das besser sofort und offen; eine spätere Klärung kostet beide Seiten Zeit. Lässt sie sich ändern, liegt gerade hier meist die größte Reserve für die Besetzung – etwa indem eine feste Tagesstelle für den Einrichter ausgegliedert wird oder der Plan über einen längeren Zeitraum stabil bleibt. Die Regeln zur Verteilung der Arbeitszeit, zu Pausen und Ruhezeiten legt das tschechische Arbeitsgesetzbuch fest.',
          ],
          list: {
            intro: 'In der Anzeige und in der Planung heißt das:',
            items: [
              'Nennen Sie Schichtmodell und Schichtlänge unmittelbar in der Anzeige',
              'Sagen Sie, wie lange im Voraus der Schichtplan bekannt ist',
              'Prüfen Sie, ob der Einrichter im selben Modell arbeiten muss wie der Bediener',
              'Prüfen Sie die Erreichbarkeit des Arbeitsorts zu Schichtbeginn und Schichtende',
            ],
          },
        },
        {
          heading: 'Eine praktische Probe an der Maschine statt eines längeren Gesprächs',
          body: [
            'Ein verlässliches Sieb ist bei diesen Stellen eine kurze praktische Vorführung im Betrieb. Es geht nicht um eine Prüfung, sondern darum zu sehen, wie jemand an die Maschine herangeht, wie er das Messmittel hält, wonach er fragt und was er überprüft. Ein Moment an der Maschine sagt mehr als eine Liste von Maschinenmarken im Lebenslauf und vermittelt der bewerbenden Person zugleich ein realistisches Bild der Arbeit, die sie antritt.',
            'Eine praktische Probe hat eigene Anforderungen. Vor dem Betreten des Betriebs muss die Person über die Gefährdungen unterwiesen und mit Schutzausrüstung ausgestattet sein; die Vorführung findet unter Aufsicht und in sicherem Umfang statt. Beim Eintritt gelten dann die üblichen Schritte – arbeitsmedizinische Untersuchung, Erstunterweisung im Arbeitsschutz nach tschechischen Vorschriften und Einweisung in den konkreten Arbeitsplatz und die Maschinen.',
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
        'Was „Verordnung 50“ und „Paragraf 6“ in Tschechien heute bedeuten, warum die Befähigung an Tätigkeit und Anlage statt an eine Person knüpft und was in die Beschreibung gehört.',
      h1: 'Elektriker rekrutieren: fachliche Befähigung in der Elektrotechnik in Tschechien',
      intro:
        'Eine Anfrage nach einem Elektriker bleibt fast immer an derselben Stelle hängen: In der Beschreibung steht „Paragraf 6“ oder „Verordnung 50“, doch diese Bezeichnungen stammen aus einer Vorschrift, die nicht mehr gilt, und sagen für sich genommen nichts darüber, was die Person tun wird und an welcher Anlage. Die fachliche Befähigung in der Elektrotechnik richtet sich in Tschechien heute nach der Regierungsverordnung Nr. 194/2022 Sb., die die Verordnung Nr. 50/1978 Sb. abgelöst hat, und knüpft an das tschechische Gesetz über vorbehaltene technische Anlagen an. Diese Seite erklärt die Orientierung als Arbeitgeber, ohne den Text der Vorschrift zu ersetzen – konkrete Stufen, Fristen und Anforderungen gehören in deren geltende Fassung.',
      breadcrumb: 'Elektriker',
      sections: [
        {
          heading: '„Verordnung 50“ und „Paragraf 6“: was diese Worte heute bedeuten',
          body: [
            'Die Verordnung Nr. 50/1978 Sb. galt jahrzehntelang, und ihre Nummerierung hat sich so eingebürgert, dass sie bis heute auf beiden Seiten verwendet wird – der Arbeitgeber schreibt „Paragraf 6“ in die Anzeige, und die Kandidatin oder der Kandidat antwortet im Lebenslauf mit demselben. Geregelt wird die fachliche Befähigung heute durch die tschechische Regierungsverordnung Nr. 194/2022 Sb., die jene Verordnung abgelöst hat. Die umgangssprachliche Bezeichnung hat also keine Grundlage in der geltenden Vorschrift, und zwischen alter und neuer Gliederung lässt sich nicht mechanisch umrechnen.',
            'Die Regierungsverordnung unterscheidet mehrere Stufen der fachlichen Befähigung, die sich aus der erreichten Fachausbildung, der Dauer der Fachpraxis und dem Ablegen einer Fachprüfung ergeben, und trennt unter anderem die Arbeit unter Aufsicht, die selbstständige Tätigkeit und die Leitung von Tätigkeiten. Die konkrete Abgrenzung der einzelnen Stufen, die geforderte Praxis und die Angaben des Nachweises zitieren wir hier bewusst nicht im Einzelnen; sie gehören in die geltende Fassung der Verordnung und sind dort zu prüfen.',
            'Für die Besetzung folgt daraus ein einfaches Vorgehen: Verlassen Sie sich weder auf die Anzeige noch auf den Lebenslauf, sondern lassen Sie sich den Nachweis selbst vorlegen. Aus ihm ist ersichtlich, wer ihn ausgestellt hat, für welche Tätigkeit und welche Anlagen er gilt und bis wann er gültig ist.',
          ],
        },
        {
          heading: 'Die Befähigung knüpft an Tätigkeit und Anlage an, nicht nur an die Person',
          body: [
            'Ein Nachweis über die fachliche Befähigung ist kein Universalausweis. Entscheidend ist die Kombination dreier Dinge: welche Tätigkeit auszuüben ist, an welcher Anlage und in welchem Betriebszustand. Das Bedienen eines Schaltschranks setzt eine andere Befähigung voraus als Montage und Instandsetzung, Arbeiten an spannungsfreien Anlagen eine andere als Arbeiten in der Nähe unter Spannung stehender Teile. Auch die Spannungsebene spielt eine Rolle – niedrige Spannung ist nicht dasselbe wie hohe Spannung.',
            'Eine Beschreibung der Art „wir suchen einen Elektriker mit Papieren“ gibt der Auswahl deshalb keinen Halt. Sobald Spannungsebene, Anlagenart und Tätigkeit in der Anfrage stehen, wird erkennbar, wen Sie suchen, und die bewerbende Person kann beantworten, ob ihr Nachweis das abdeckt. Das schützt auch Sie: Dafür, welche Arbeit einer beschäftigten Person zugewiesen wird und ob dafür die nötige Befähigung vorliegt, haftet der Arbeitgeber und nicht die beschäftigte Person.',
          ],
          list: {
            intro: 'In der Anfrage muss deshalb stehen:',
            items: [
              'Die Spannungsebene – niedrige, hohe, gegebenenfalls sehr hohe Spannung (tschechische Einteilung nn/vn/vvn)',
              'Die Anlagenart – Schaltschränke, elektrische Ausrüstung von Maschinen, Antriebe, Verteilungen, Photovoltaik',
              'Die Tätigkeit – Bedienen, Arbeiten (Montage, Instandsetzung, Wartung), Prüfung, Projektierung',
              'Der Betriebszustand – spannungsfrei, in der Nähe unter Spannung stehender Teile oder Arbeiten unter Spannung',
              'Der Grad der Selbstständigkeit – Arbeit unter Aufsicht, selbstständige Tätigkeit oder Leitung von Tätigkeiten',
            ],
          },
        },
        {
          heading: 'Vorbehaltene technische Anlagen und was daraus folgt',
          body: [
            'Elektrische Anlagen gehören zusammen mit Hebe-, Druck- und Gasanlagen zu den vorbehaltenen technischen Anlagen nach dem tschechischen Gesetz Nr. 250/2021 Sb. Dieses regelt die Anforderungen an ihren sicheren Betrieb sowie an die Befähigung der Personen und Organisationen, die daran tätig werden; die Regierungsverordnung zur fachlichen Befähigung in der Elektrotechnik ist seine Durchführungsvorschrift.',
            'Für Arbeitgebende folgen daraus zwei Ebenen, die in Anfragen häufig verwechselt werden. Die erste betrifft Personen – wer was tun darf. Die zweite betrifft Organisation und Anlage – die Berechtigung für Tätigkeiten an vorbehaltenen Anlagen, Prüfungen und Kontrollen, Dokumentation und Fristen. Die wiederkehrende Prüfung elektrischer Anlagen (tschech. revize) ist dabei eine eigenständige Tätigkeit, die eine Person mit dem entsprechenden Zeugnis ausübt; das Profil eines Betriebselektrikers umfasst sie in der Regel nicht, und wenn Sie sie abdecken müssen, gehört sie ausdrücklich in die Beschreibung.',
          ],
        },
        {
          heading: 'Instandhaltungselektriker, Betriebselektriker, Elektromonteur',
          body: [
            'Die drei am häufigsten gesuchten Profile unterscheiden sich in der Art der Arbeit so weit, dass sie einander nicht vertreten. Ein Instandhaltungselektriker sucht und beseitigt Störungen an Maschinen im laufenden Betrieb: liest Schaltpläne, kennt sich in der Peripherie von Steuerungen, in Frequenzumrichtern, Antrieben und Sensoren aus und entscheidet unter dem Druck des Stillstands. Entscheidend ist die Diagnose, nicht die Routine.',
            'Ein Betriebselektriker betreut die elektrischen Anlagen des Geländes und ihren Betrieb – Verteilung, Schaltschränke, Beleuchtung, kleinere Anpassungen, Unterlagen für Prüfungen und die Beseitigung festgestellter Mängel. Ein Elektromonteur arbeitet dagegen projektbezogen: Er montiert Kabeltrassen, bestückt und verdrahtet Schaltschränke und folgt der Projektdokumentation, oft im Team und auf Aufträgen außerhalb des Unternehmens. Jedes dieser Profile hat einen anderen Kandidatenkreis und damit eine andere Besetzbarkeit; eine Kombination von Rollen lässt sich anfragen, sie muss aber sowohl in der Beschreibung als auch in der Entgelteinstufung stehen.',
            'Löhne für Elektriker nennen wir hier nicht, und wir denken uns keine Lohnangaben aus. Gegliederte Daten zu den Verdiensten nach Berufen veröffentlicht das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV); ein aktuelles Bild des Arbeitsmarktes geben das tschechische Ministerium für Arbeit und Soziales (MPSV), das Arbeitsamt der Tschechischen Republik (Úřad práce ČR) und das Tschechische Statistische Amt (ČSÚ).',
          ],
        },
        {
          heading: 'Gültigkeit, Nachprüfung und gesundheitliche Eignung',
          body: [
            'Ein Befähigungsnachweis gilt nicht dauerhaft. Die Vorschrift sieht vor, dass die Befähigung in festgelegten Abständen erneut überprüft wird, und der Nachweis hat eine begrenzte Gültigkeit; die konkreten Fristen und die Form der Nachprüfung legt die Regierungsverordnung fest und sind in deren geltender Fassung zu prüfen.',
            'In die Personalunterlagen gehört deshalb nicht nur eine Kopie des Nachweises, sondern auch das Datum, an dem die Gültigkeit endet – im Voraus zu beobachten und nicht erst, wenn jemand nicht mehr an die Anlage darf.',
            'Daneben gelten die üblichen Eintrittspflichten. Bei Arbeiten an elektrischen Anlagen kommt der im Rahmen der arbeitsmedizinischen Untersuchung beurteilten gesundheitlichen Eignung besonderes Gewicht zu, ebenso einer gründlichen Einweisung in den konkreten Arbeitsplatz und seine Gefährdungen über die allgemeine Arbeitsschutzunterweisung hinaus. Dazu gehört in der Regel die Ausstattung mit Schutzausrüstung, die der Arbeit und der Umgebung entspricht.',
            'Bei einer im Ausland erworbenen Qualifikation ist damit zu rechnen, dass ein in einem anderen Land ausgestellter Nachweis nicht automatisch übernommen wird. Die Anerkennung einer in einem anderen EU-Mitgliedstaat, in einem EWR-Staat oder in der Schweiz erworbenen Berufsqualifikation regelt in Tschechien das Gesetz Nr. 18/2004 Sb.; bei Nachweisen aus Drittstaaten wird anders vorgegangen, und das Verfahren unterscheidet sich weiter danach, um welche Tätigkeit es geht. Informationen zur Anerkennung ausländischer Bildung veröffentlicht das tschechische Bildungsministerium (MŠMT). Diesen Schritt beginnt man besser, bevor man mit der bewerbenden Person einen Eintrittstermin vereinbart.',
          ],
        },
        {
          heading: 'Was in die Anfrage gehört, damit die Auswahl Sinn ergibt',
          body: [
            'Eine verlässliche Kontrolle der Beschreibung ist die Frage, ob ein Elektriker, der Ihr Unternehmen nicht kennt, danach antworten könnte. Wenn ja, entscheidet sich die Auswahl nicht erst bei der Kontrolle der Nachweise vor dem Eintritt, sondern viel früher – und zwar unter Menschen, die für diese Arbeit tatsächlich befähigt sind.',
            'So beschrieben beschleunigt sich auch die Vorauswahl: Sind Anlage und Tätigkeit bekannt, lässt sich der Nachweis vor dem Gespräch durchgehen und anhand der Originale zusammen mit der Identität prüfen.',
            'Den Wortlaut dieser Übergangsbestimmungen legen wir hier nicht aus; bei einem konkreten Nachweis gehen Sie von dessen Inhalt und Gültigkeitsdatum aus.',
          ],
          list: {
            intro: 'In die Anfrage gehören:',
            items: [
              'Spannungsebene und Anlagenart, an denen gearbeitet wird',
              'Die Tätigkeit und der geforderte Grad der Selbstständigkeit, gegebenenfalls die Leitung von Tätigkeiten',
              'Ob die Prüftätigkeit dazugehört oder nur die Vorbereitung der Unterlagen für Prüfungen',
              'Umgebung und Betrieb – Fertigungshalle, Gelände, Aufträge außerhalb des Unternehmens, Schichtbetrieb oder Rufbereitschaft',
              'Die geforderten Nachweise samt ihrem Geltungsbereich und ihrer Gültigkeitsdauer',
            ],
          },
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
        'Warum sich die Instandhaltung schwerer besetzen lässt als die Produktion: Breite der Kompetenz, vorbeugende gegen reaktive Arbeit, Rufbereitschaft, Übergabe und der Weg von innen.',
      h1: 'Instandhaltung und technischer Service: technische Stellen besetzen',
      intro:
        'Die Instandhaltung ist der Ort, an dem sich ein Personalmangel schnell und teuer zeigt: Die Maschine steht, der Plan verschiebt sich und die Bedienenden warten. Besetzt wird sie anders als die Produktion um sie herum – verlangt ist nicht eine Fertigkeit, sondern eine Kombination aus Mechanik, Elektrik, Pneumatik oder Hydraulik und zunehmend auch grundlegender Arbeit mit der Steuerung der Maschine. Dazu kommen Bedingungen, die Kandidatinnen und Kandidaten vor dem Aufgabeninhalt abwägen: Rufbereitschaft, Anfahrt und Schichtabdeckung. Diese Seite beschreibt, was in der Beschreibung zu klären ist, wie Befähigungsnachweise zu beurteilen sind und warum die Beförderung aus dem Betrieb ein vollwertiger Weg ist und keine Notlösung.',
      breadcrumb: 'Instandhaltung',
      sections: [
        {
          heading: 'Warum sich die Instandhaltung schwerer besetzen lässt',
          body: [
            'Einen Bediener suchen Sie nach einer Hauptfähigkeit und einer Einarbeitungszeit. Bei der Instandhaltung ist die Aufgabe anders: Eine Person soll in einer Schicht einen unterschiedlichen Maschinenpark abdecken und mit einer mechanischen Störung, mit Pneumatik oder Hydraulik und mit dem zurechtkommen, was im Schaltschrank geschieht. In vielen Betrieben wächst die Arbeit mit der Steuerung – kein Programmieren, sondern die Fähigkeit zu erkennen, ob das Problem im Sensor, in der Mechanik oder im Programm liegt.',
            'Die Breite der Kompetenz hat auch eine rechtliche Seite. Ein Eingriff in den elektrischen Teil einer Anlage ist an die fachliche Befähigung in der Elektrotechnik nach der tschechischen Regierungsverordnung Nr. 194/2022 Sb. gebunden, die die frühere Verordnung Nr. 50/1978 Sb. abgelöst hat und den Umfang der Tätigkeiten nach der Befähigungsstufe unterscheidet. Ein Teil der Anlagen fällt zudem unter das tschechische Gesetz Nr. 250/2021 Sb. über die Arbeitssicherheit im Zusammenhang mit dem Betrieb vorbehaltener technischer Anlagen, also Druck-, Hebe-, Elektro- und Gasanlagen. Vergleichen Sie deshalb den Umfang des Nachweises mit dem, was am Arbeitsplatz tatsächlich zu tun ist.',
          ],
        },
        {
          heading: 'Rollen in der Instandhaltung und ihre Unterschiede',
          body: [
            'Die Bezeichnungen unterscheiden sich von Unternehmen zu Unternehmen, und der Titel allein sagt über den Inhalt wenig. Nützlicher ist zu beschreiben, wo die Verantwortung einer Rolle endet und wo der externe Service oder der Maschinenlieferant beginnt.',
            'Missverständnisse entstehen vor allem zwischen Einrichter und Instandhalter: Der Einrichter hält die Maschine zwischen Aufträgen im Lauf und misst sich an der Rüstzeit, der Instandhalter verantwortet den technischen Zustand über einen längeren Zeitraum. Erfüllt eine Person beide Rollen, gehört das in die Beschreibung.',
          ],
          list: {
            intro: 'Die Rollen, die in Fertigungsbetrieben tatsächlich besetzt werden:',
            items: [
              'Instandhaltungskraft – laufende vorbeugende und betriebliche Instandhaltung, Teiletausch, Schmierung, kleinere Reparaturen',
              'Mechaniker – mechanische Reparaturen und Einstellungen, Ausrichten, Arbeit mit der Maschinendokumentation',
              'Elektromechaniker – Eingriffe in den elektrischen Teil im Rahmen der eigenen fachlichen Befähigung',
              'Mechatroniker – Mechanik, Elektrik und Steuerung zusammen, Diagnose komplexerer Störungen',
              'Einrichter – Umrüstungen und Einstellungen der Maschinen zwischen Aufträgen, Anlauf nach der Umrüstung',
              'Servicetechniker – Einsätze beim Kunden oder an mehreren Standorten, mit Reisetätigkeit',
              'Instandhaltungsleitung – Reparaturplan, Abstellungen, Ersatzteile, Lieferanten und Menschen',
            ],
          },
        },
        {
          heading: 'Vorbeugend und reaktiv: andere Aufgabe, anderer Mensch',
          body: [
            'Ein Betrieb mit geplanter Instandhaltung braucht Disziplin: den Plan einhalten, Aufzeichnungen führen, Ersatzteile im Blick behalten und eine Abstellung vorbereiten. Ein Betrieb, in dem überwiegend Störungen behoben werden, sobald sie auftreten, braucht ein anderes Naturell – schnelle Diagnose unter Druck, den Mut zu einer provisorischen Entscheidung und die Belastbarkeit dafür, dass nachts das Telefon klingelt.',
            'Das Verhältnis zwischen geplanter und Störungsarbeit gehört zu den wertvollsten Angaben, die eine Beschreibung enthalten kann. Fehlt es im Angebot, riskieren Sie eine Trennung schon in der Probezeit: Jemand tritt in die geplante Instandhaltung ein und findet dauerndes Beheben von Störungen vor – oder umgekehrt.',
          ],
          list: {
            intro: 'In die Beschreibung gehört deshalb:',
            items: [
              'Das ungefähre Verhältnis von geplanter zu Störungsarbeit',
              'Der Maschinenpark – Anlagentypen, Alter, Hersteller und die Sprache der Dokumentation',
              'Die Abgrenzung zwischen interner Instandhaltung und externem Service',
              'Ob die Einführung eines Vorbeugeplans erwartet wird oder nur dessen Umsetzung',
            ],
          },
        },
        {
          heading: 'Rufbereitschaft, Anfahrt und Schichtabdeckung',
          body: [
            'Über die Annahme eines Angebots entscheidet hier oft eine Bedingung, die mit Fachlichkeit nichts zu tun hat: wie häufig und in welcher Form Rufbereitschaft gehalten wird. Das tschechische Arbeitsgesetzbuch regelt die Rufbereitschaft als Zeit, in der Beschäftigte außerhalb ihres Schichtplans an einem vereinbarten Ort außerhalb des Arbeitsplatzes zur Arbeit bereit sind; sie muss vereinbart werden, es steht dafür eine Vergütung nach dem Arbeitsgesetzbuch zu, und während ihrer über die festgelegte Wochenarbeitszeit hinaus geleistete Arbeit ist Überstundenarbeit.',
            'Für die Person ist es ein Eingriff ins Private, den sie gemeinsam mit der Anfahrtsstrecke abwägt. Nennen Sie deshalb schon im Angebot, wie häufig die Rufbereitschaft anfällt, unter wie vielen Personen sie rotiert und welche Anfahrt Sie erwarten. Ein Betrieb, der den Dauerbetrieb mit einer einzigen Instandhaltungskraft abdeckt, ist für Kandidatinnen und Kandidaten meist schwer annehmbar und bleibt auch nach der Besetzung eine Schwachstelle.',
            'Beträge oder Spannen für Stellen in der Instandhaltung nennt diese Seite nicht und leitet sie auch nicht ab. Die Höhe der Verdienste nach Berufen veröffentlicht das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV), den Inhalt der einzelnen Berufe beschreibt das tschechische Berufsverzeichnis (Národní soustava povolání). Für die Instandhaltung kommt hinzu, dass die Vergütung der Rufbereitschaft nach dem tschechischen Arbeitsgesetzbuch eine eigenständige Leistung neben dem Lohn ist – im Angebot gehört beides deshalb getrennt ausgewiesen.',
          ],
          list: {
            intro: 'Zu klären ist dabei:',
            items: [
              'Wie viele Personen sich in der Rufbereitschaft abwechseln und wie der Plan aufgestellt wird',
              'Welche Anfahrt erwartet wird und ob ein Fahrzeug zur Verfügung steht',
              'Ob ein Teil der Einsätze aus der Ferne oder telefonisch gelöst werden kann',
              'Wer die Rufbereitschaft an Feiertagen und während der Abstellungen hält',
            ],
          },
        },
        {
          heading: 'Dokumentation und Übergabe zwischen Schichten',
          body: [
            'Die Instandhaltung ist eine Rolle, in der nicht ein angefangenes Teil übergeben wird, sondern ein Maschinenzustand. Verlässt jemand die Schicht mit dem Hinweis, „es läuft vorerst auf Provisorium“, und steht das nirgends, zeigt sich der Verlust erst bei der nächsten Störung. Zu den zu prüfenden Fähigkeiten gehört deshalb, wie eine Person einen Eingriff dokumentiert: was die Ursache war, was ersetzt wurde und was vorläufig geblieben ist.',
            'Ein Teil der Dokumentation ist verpflichtend. Bei vorbehaltenen technischen Anlagen regelt das tschechische Gesetz Nr. 250/2021 Sb. die Anforderungen an Kontrollen, Prüfungen und die fachliche Befähigung der Personen, die sie durchführen; die Prüftätigkeit ist nicht dasselbe wie die laufende Instandhaltung, und es sollte vorab klar sein, wer sie übernimmt. Nach dem tschechischen Arbeitsgesetzbuch und den tschechischen Arbeitsschutzvorschriften verantwortet der Arbeitgeber zugleich den sicheren Zustand der Anlagen und die Eignung der beschäftigten Person für die jeweilige Arbeit, einschließlich arbeitsmedizinischer Untersuchung und bereitgestellter Schutzausrüstung.',
          ],
          list: {
            intro: 'Im Auswahlverfahren heißt das:',
            items: [
              'Fragen Sie nach einer konkreten Situation: wie eine angefangene Reparatur übergeben wurde',
              'Klären Sie, worin Aufzeichnungen geführt wurden – Betriebsbuch, Instandhaltungssystem, Tabelle',
              'Vergleichen Sie den Umfang der Befähigungsnachweise mit dem tatsächlichen Aufgabeninhalt',
            ],
          },
        },
        {
          heading: 'Passive Kandidaten und der Weg von innen',
          body: [
            'Eine erfahrene Instandhaltungskraft sucht in der Regel keine Arbeit. Sie ist beschäftigt und beurteilt ein Angebot aus einer Lage, in der nichts drängt. Das verändert den gesamten Ablauf: Eine Anzeige genügt meist nicht, Empfehlungen und Direktansprache spielen eine Rolle, die Auswahl dauert länger, und das Angebot muss beim ersten Mal verständlich sein.',
            'Der zweite reale Weg führt von innen. Eine Bedien- oder Einrichtkraft, die Maschinenpark, Technologie und Menschen kennt, hat einen Vorsprung, der sich von außen nicht kaufen lässt. Es fehlen Nachweis und Systematik – beides ist lösbar: Die fachliche Befähigung in der Elektrotechnik lässt sich im Verfahren nach der tschechischen Regierungsverordnung Nr. 194/2022 Sb. erwerben, und Kompetenzen lassen sich über eine Berufsqualifikation im tschechischen Qualifikationsverzeichnis (Národní soustava kvalifikací) formalisieren. Dieser Weg braucht jedoch Zeit, einen Mentor aus der Instandhaltung und einen benannten Zeitraum, in dem die Person noch nicht allein eingreift.',
          ],
          list: {
            intro: 'Für den Weg von innen gilt:',
            items: [
              'Wählen Sie nach dem Interesse an Technik aus, nicht nach der Leistung an der Linie',
              'Planen Sie den Qualifizierungsweg, bevor Sie die Stelle öffnen',
              'Legen Sie fest, welche Eingriffe ab wann selbstständig erfolgen dürfen',
              'Rechnen Sie damit, dass der frei werdende Platz in der Produktion nachbesetzt werden muss',
            ],
          },
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
      title: 'Positionen in der Qualitätssicherung: Prüfung, Metrologie und Audits',
      description:
        'Die Stufen von der Prüfung bis zur Leitung, was beim Messen zu prüfen ist, der tschechische metrologische Rahmen, Reklamationen nach 8D und warum Unabhängigkeit zählt.',
      h1: 'Positionen in der Qualitätssicherung: Prüfung, Metrologie und Audits',
      intro:
        'Eine Beschreibung für eine Stelle „in der Qualität“ gehört zu den ungenauesten in der Personalgewinnung. Unter derselben Bezeichnung verbirgt sich sowohl jemand, der an der Linie Teile sortiert, als auch jemand, der ein Kundenaudit führt – und dazwischen liegen mehrere Kompetenzstufen, eine andere Verantwortung und ein anderer Kandidatenkreis. Diese Seite zerlegt die Qualitätssicherung in die Rollen, die in Fertigungsbetrieben tatsächlich besetzt werden, und beschreibt, was dabei zu prüfen ist: die Fähigkeit zu messen und eine Zeichnung zu lesen, die Arbeit mit Kalibrierung und Dokumentation, die Bearbeitung von Reklamationen und den Umfang der Befugnis, eine Lieferung anzuhalten. Systemstandards führen wir so an, wie Arbeitgeber sie in ihren Anforderungen formulieren.',
      breadcrumb: 'Qualitätssicherung',
      sections: [
        {
          heading: 'Die Stufen von der Prüfung bis zur Leitung',
          body: [
            'Die Rollen in der Qualität bilden eine recht klare Abfolge, und es lohnt sich zu wissen, auf welcher Stufe eine Beschreibung tatsächlich steht. Der Unterschied zwischen benachbarten Stufen liegt nicht im Fleiß, sondern darin, worüber jemand entscheidet und welche Ergebnisse von ihm bleiben.',
            'In kleineren Betrieben verschmelzen die Stufen, und eine Person macht Prüfung, Metrologie und Reklamationen. Das ist legitim, muss aber in der Beschreibung stehen – sonst kommen Bewerbungen von einer Stufe, während das Unternehmen jemanden erwartet, der drei abdeckt.',
            'Konkrete Beträge für Stellen in der Qualität finden Sie auf dieser Seite nicht. Angaben zu den Verdiensten nach Berufen veröffentlicht das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV), die Anforderungen der Berufe beschreibt das tschechische Berufsverzeichnis (Národní soustava povolání) und die Standards der Berufsqualifikationen das tschechische Qualifikationsverzeichnis (Národní soustava kvalifikací). In der Qualität entscheidet ohnehin, auf welcher Stufe dieser Abfolge die Rolle tatsächlich steht – beginnen Sie deshalb mit der Abgrenzung der Rolle und nicht mit der Überlegung zum Betrag.',
          ],
          list: {
            intro: 'Die Abfolge sieht in Fertigungsbetrieben so aus:',
            ordered: true,
            items: [
              'Qualitätsprüfer – Messung und Sichtprüfung nach Prüfplan, Aufzeichnung der Ergebnisse, Sperrung abweichender Teile',
              'Qualitätstechniker – Prüfanweisungen, Bearbeitung von Abweichungen im Betrieb, Kommunikation mit Fertigung und Lieferant',
              'Metrologe – Verwaltung der Messmittel, Kalibrierung und Rückführbarkeit, metrologische Ordnung des Unternehmens',
              'Qualitätsingenieur – Freigabe von Mustern und Prozessen, Ursachenanalysen, Kundenkommunikation',
              'Qualitätsmanager – Abteilung, System, Audits und Vertretung des Unternehmens gegenüber dem Kunden',
            ],
          },
        },
        {
          heading: 'Die Messkompetenz ist die Hauptachse der Auswahl',
          body: [
            'Unterschiede zwischen Kandidatinnen und Kandidaten zeigen sich verlässlich beim Messen. Messschieber und Mikrometer beherrscht nach Einweisung nahezu jede Person; der Unterschied liegt darin, ob sie die Zeichnung samt Toleranzen und geometrischen Angaben liest, zum Maß ein geeignetes Messmittel wählt und erkennt, wann diese Genauigkeit nicht genügt und ein Koordinatenmessgerät nötig ist.',
            'Eine praktische Probe ist kurz und überzeugend: Geben Sie eine Zeichnung und ein Teil und lassen Sie beschreiben, womit und wie das Maß geprüft würde. Die Antwort „ich messe und trage ein“ und eine Antwort, die die Wiederholbarkeit der Messung und den Zustand des Messmittels nennt, beschreiben zwei verschiedene Stufen.',
          ],
          list: {
            intro: 'Über das Lesen der Zeichnung und die Wahl des Messmittels hinaus prüfen Sie:',
            items: [
              'Den Umgang mit einem kalibrierten Messmittel und dem Kalibrierschein',
              'Erfahrung mit Koordinatenmessung und der Auswertung des Messprotokolls',
              'Das Vorgehen bei einem Ergebnis an der Toleranzgrenze und bei einem abweichenden Ergebnis',
            ],
          },
        },
        {
          heading: 'Kalibrierung und der tschechische metrologische Rahmen',
          body: [
            'Der metrologische Teil der Rolle beruht darauf, dass jemand ein Messergebnis vertreten kann. Das tschechische Gesetz Nr. 505/1990 Sb. über das Messwesen gliedert die Messmittel und verlangt bei sogenannten bestimmten Messmitteln eine Eichung; diese ist nach jenem Gesetz der staatlichen Metrologie und autorisierten Stellen anvertraut, nicht einem betrieblichen Metrologen. Die übrigen Arbeitsmessmittel hält das Unternehmen durch Kalibrierung nach eigener metrologischer Ordnung und selbst festgelegten Fristen instand.',
            'Für die Besetzung folgt daraus eine konkrete Frage: Gibt es im Unternehmen bestimmte Messmittel, wer führt ihr Verzeichnis und wer entscheidet über die Fristen. Die konkrete Einordnung der Messmittel und die damit verbundenen Pflichten prüfen Sie nach der geltenden Fassung des Gesetzes und den zugehörigen Vorschriften.',
          ],
        },
        {
          heading: 'Systemstandards, wie Arbeitgeber sie angeben',
          body: [
            'In Anforderungen tauchen regelmäßig Systemnormen auf: ISO 9001 als allgemeiner Rahmen eines Qualitätsmanagementsystems, IATF 16949 bei Zulieferern der Automobilindustrie und HACCP als System für Lebensmittelsicherheit in der Lebensmittelproduktion. Wir beschreiben sie als Anforderungen, die Arbeitgeber stellen, und nicht als Zertifizierungen, die eine Personalagentur besitzt.',
            'Für das Profil ist entscheidend, was praktisch daraus folgt: Kenntnis der Dokumentation und Aufzeichnungen, Erfahrung mit einem internen oder Kundenaudit und die Fähigkeit, ein Vorgehen vor einem Auditor zu vertreten. Bereitet ein Unternehmen die Zertifizierung erst vor, ist das eine andere Anforderung als die Pflege eines eingeführten Systems – und es wird eine andere Person gesucht.',
          ],
          list: {
            intro: 'In die Beschreibung gehört deshalb:',
            items: [
              'Ob das System läuft, eingeführt oder erneuert wird',
              'Die Unterscheidung zwischen der Erfahrung des Auditierten und der Erfahrung als interner Auditor',
              'Wer die Dokumentation führt und wer mit dem Kunden verhandelt',
              'Bei Lebensmittelproduktion: wie die Hygieneaufzeichnungen geregelt sind',
            ],
          },
        },
        {
          heading: 'Reklamationen, 8D und die tägliche Dokumentation',
          body: [
            'Die tägliche Arbeit in der Qualität ist nicht Messen, sondern Schreiben. Prüfaufzeichnungen, Protokolle, Chargenfreigaben, Sperrungen, Beschreibungen von Abweichungen und Antworten auf Reklamationen machen den größten Teil aus – und sie sind das, was bleibt, wenn ein Problem Monate später rückwirkend behandelt wird.',
            'Kundenreklamationen haben in Lieferketten eine feste Struktur; in der Automobilindustrie wird üblicherweise die Form 8D verlangt, mit Sofortmaßnahme, Ursachenanalyse und Wirksamkeitsprüfung. Prüfen lässt sich das einfach: eine Reklamation beschreiben lassen, die jemand von der Annahme bis zum Abschluss geführt hat, und darauf achten, ob Ursache und Erscheinung unterschieden werden und ob gesagt werden kann, wie die Wirksamkeit der Maßnahme überprüft wurde. Prüfen Sie außerdem die Verständlichkeit des schriftlichen Ausdrucks, am besten an einer kurzen schriftlichen Aufgabe.',
          ],
        },
        {
          heading: 'Unabhängigkeit und warum hier die Branche wiegt',
          body: [
            'Die Qualität erfüllt ihre Funktion nur, wenn die Person, die eine Charge sperrt, nicht an der Leistung der Schicht gemessen wird, die sie sperrt. Klären Sie vor der Ausschreibung, wem die Rolle unterstellt ist, was sie allein entscheiden darf und wer im Streit mit der Produktion entscheidet. Danach wird gefragt, und eine ausweichende Antwort ist für erfahrene Menschen ein Warnsignal.',
            'Die Branche wiegt hier mehr als bei anderen technischen Stellen. Ein Automobilzulieferer arbeitet mit einer anderen Dokumentationskultur und einem anderen Eskalationstempo als die Lebensmittelproduktion, in der neben dem Messen Hygiene, Chargenrückverfolgbarkeit und sensorische Beurteilung hinzutreten. Ein Wechsel zwischen Branchen ist möglich, bedeutet aber eine Zeit, in der jemand die Methode beherrscht und das Umfeld erst lernt. Klären Sie bei Kandidatinnen und Kandidaten mit ausländischer Ausbildung vorab, ob und in welcher Form Sie eine Anerkennung verlangen; den Rahmen beschreiben in Tschechien das Bildungsministerium (MŠMT) und das Gesetz über die Anerkennung der Berufsqualifikation.',
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
        'Von innen befördern oder von außen holen: was jeder Weg bringt und kostet, was bei dieser Rolle zu prüfen ist und was eine beförderte Führungskraft zuerst braucht.',
      h1: 'Schichtleiter und Meister: von innen befördern oder von außen holen',
      intro:
        'Die Stelle einer Meisterin oder eines Schichtleiters öffnet sich meist in einem ungünstigen Moment: Jemand ist gegangen, die Schicht zerfällt, und die Entscheidung fällt zwischen zwei Möglichkeiten – eine erfahrene Person aus dem Betrieb befördern oder außerhalb suchen. Beide Wege haben unterschiedliche Kosten und unterschiedliche Risiken, und keiner ist allgemein richtig. Diese Seite vergleicht beide ohne Beschönigung, beschreibt, was bei der ersten Führungsebene tatsächlich zu prüfen ist, und behandelt, was eine beförderte Führungskraft in den ersten Monaten braucht.',
      breadcrumb: 'Schichtleiter',
      sections: [
        {
          heading: 'Vier Aufgaben zugleich',
          body: [
            'Meisterin oder Schichtleiter halten vier Dinge gleichzeitig: Menschen, Plan, Qualität und Sicherheit. Innerhalb einer Schicht wechseln sie zwischen der Zuteilung von Menschen auf Positionen, der Reaktion auf Maschinenausfall oder Abwesenheit, der Entscheidung über ein abweichendes Teil und der Aufsicht darüber, dass sicher und mit vorgeschriebener Schutzausrüstung gearbeitet wird.',
            'Eine Stellenbeschreibung, die nur „Schichtführung“ sagt, verrät fast nichts darüber, welche der vier Aufgaben in Ihrem Betrieb überwiegt.',
            'Der Sicherheitsteil ist dabei kein Zusatz. Das tschechische Arbeitsgesetzbuch zählt die Sorge um Sicherheit und Gesundheitsschutz bei der Arbeit zu den untrennbaren Bestandteilen der Arbeitspflichten leitender Beschäftigter auf allen Führungsebenen; die Einhaltung dieser Pflichten kontrolliert das tschechische Staatliche Arbeitsinspektionsamt (Státní úřad inspekce práce). Legen Sie den Verantwortungsumfang der Führungskraft deshalb schriftlich fest und nicht mündlich bei der Übergabe der Funktion.',
          ],
          list: {
            intro: 'Die vier Aufgaben im Einzelnen:',
            items: [
              'Menschen – Besetzung der Positionen auf der Schicht, Einarbeitung, Konflikte, Beurteilung',
              'Plan – Durchsatz, Prioritäten, Reaktion auf Ausfälle und Abwesenheiten',
              'Qualität – Entscheidung über eine Abweichung, Eskalation, Zusammenarbeit mit der Prüfung',
              'Arbeitsschutz – Aufsicht über das sichere Vorgehen, Schutzausrüstung, Meldung von Vorfällen',
            ],
          },
        },
        {
          heading: 'Von innen befördern: was Sie gewinnen und was fehlen wird',
          body: [
            'Eine Person aus dem Betrieb bringt mit, was sich nicht kaufen lässt: Sie kennt Technologie, Maschinenpark, Gewohnheiten der Schicht und die Stellen, an denen üblicherweise Fehler entstehen. Sie braucht keine Monate, um das Produkt zu verstehen, und wird als jemand angenommen, der weiß, wovon er spricht. Wo es vor allem um Kontinuität geht, ist das ein wesentlicher Vorteil.',
            'Es fehlt ihr in der Regel das Zweite: Menschen zu führen, mit denen sie gestern noch nebeneinander gearbeitet hat. Es bedeutet, ein unangenehmes Gespräch zu führen, unbeliebte Arbeit zu verteilen, einem Freund Nein zu sagen und Abstand zu halten, ohne dass die Beziehungen zur Formalität werden. Dazu kommen Planung über eine Schicht hinaus und die Arbeit mit Auswertungen. Ein ausgezeichneter Bediener ist nicht automatisch eine gute Führungskraft, und eine Beförderung ohne Vorbereitung kann das Unternehmen beides kosten – dieser Teil muss begleitet und nicht vorausgesetzt werden.',
          ],
        },
        {
          heading: 'Von außen holen: was es einbringt und was es kostet',
          body: [
            'Eine Person von außen bringt Methode und Vergleich. Sie hat eine andere Schichtorganisation gesehen, einen anderen Umgang mit Abweichungen, eine andere Art, eine Besprechung zu führen – und trägt keine Beziehungsgeschichte aus der Halle mit sich. Geht es darum, die Art der Führung zu ändern und nicht nur einen Platz im Plan zu füllen, ist dieser Weg meist wirksamer.',
            'Der Preis sind Zeit und Legitimität. Ohne Kenntnis von Technologie und Produkt kann sie in den ersten Wochen wenig entscheiden, und die Schicht stellt sie auf die Probe – besonders, wenn jemand aus dem Betrieb die Stelle angestrebt hatte. Entschieden wird es in den ersten Wochen: wer sie einführt, welche Entscheidungen sie sofort treffen darf, wer sie in der ersten Konfliktsituation stützt und wann sie Rückmeldung bekommt. Ohne das droht ein Abgang noch in der Probezeit, und die Auswahl beginnt von vorn.',
          ],
        },
        {
          heading: 'Was bei dieser Rolle wirklich zu prüfen ist',
          body: [
            'Selbsteinschätzung hilft hier nicht – nahezu alle sagen von sich, sie könnten Menschen führen. Brauchbar sind konkrete Situationen aus der eigenen Praxis und die Frage, was jemand getan hat, nicht was er über Führung denkt.',
            'Nennen Sie die Teamgröße in der Beschreibung als Zahl aus dem eigenen Betrieb: fünf Menschen zu führen und fünfzig sind zwei verschiedene Arbeiten, auch wenn die Position gleich heißt. Ergänzen Sie das Schichtmodell, wem die Rolle unterstellt ist und welche Entscheidungen sie ohne Rücksprache trifft.',
            'Lohnspannen für Meister und Schichtleiter leiten wir nicht ab und nennen sie auf dieser Seite nicht. Die Unterlagen zu den Verdiensten nach Berufen führt das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV), die Beschreibung der Anforderungen eines Berufs das tschechische Berufsverzeichnis (Národní soustava povolání). Bei der ersten Führungsebene ist neben dem Verdienst ebenso wesentlich, welche Entscheidungsbefugnis mit der Rolle verbunden ist – Kandidatinnen und Kandidaten beurteilen beides gemeinsam.',
          ],
          list: {
            intro: 'Im Gespräch helfen konkrete Fragen:',
            items: [
              'Wie viele Menschen jemand direkt geführt hat, auf welcher Schicht und in welchem Betrieb',
              'Wie die Schicht übergeben wurde und was konkret weitergegeben wurde',
              'Was getan wurde, als morgens zwei Leute fehlten und der Plan gleich blieb',
              'Wann die eigene Führung angerufen und was selbst entschieden wurde',
              'Wie ein Konflikt zwischen zwei Personen auf der Schicht gelöst wurde',
              'Wie reagiert wurde, als die Qualitätsprüfung mitten in der Schicht eine Charge sperrte',
            ],
          },
        },
        {
          heading: 'Warum diese Rolle über die Stabilität der Schicht entscheidet',
          body: [
            'Die erste Führungsebene ist der Ort, an dem sich täglich entscheidet, ob Menschen bleiben. Sie bestimmt, wie mit einer neuen Person am ersten Tag gesprochen wird, ob jemand bemerkt, dass es nicht gut läuft, wie Überstunden verteilt werden und ob eine Beschwerde irgendwo ankommt.',
            'Die Besetzung dieser Rolle wirkt sich auf die Stabilität einer ganzen Schicht deshalb stärker aus als die Besetzung einer einzelnen Position darin. Die Einarbeitung einer neuen Person auf der Schicht führt in der Praxis genau diese Führungskraft, auch wenn der Prozess anders beschrieben ist. Wenn Sie also Abgänge in den ersten Wochen bearbeiten, ist sie der erste Ansatzpunkt, bevor Sie zu flächendeckenden Maßnahmen greifen.',
          ],
        },
        {
          heading: 'Die Vorbereitung einer beförderten Führungskraft',
          body: [
            'Eine Beförderung ist ein Zeitraum, kein Moment. Hilfreich ist, der Schicht vorab zu sagen, warum diese Person ausgewählt wurde – eine unerklärte Beförderung legt sich das Team auf eigene Weise aus.',
            'Zu einer ehrlichen Vorbereitung gehört auch der Weg zurück. Vereinbaren Sie vorab, was geschieht, wenn die Rolle nicht passt: eine Rückkehr auf die frühere Position ohne Gesichtsverlust ist für beide Seiten besser als das Verharren in einer Funktion, die jemand nicht will. Gerade diese Möglichkeit erhöht die Bereitschaft, eine Beförderung überhaupt anzunehmen.',
          ],
          list: {
            intro: 'Was eine neu beförderte Führungskraft braucht:',
            items: [
              'Einen schriftlich festgelegten Entscheidungs- und Verantwortungsumfang',
              'Eine Schulung zu den Pflichten leitender Beschäftigter einschließlich Arbeitsschutz',
              'Eine erreichbare eigene Führung und vereinbarte Kontrollpunkte',
              'Ein klares Format für die Übergabe der Schicht',
              'Eine vorab vereinbarte Möglichkeit der Rückkehr auf die frühere Position',
            ],
          },
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
      title: 'Automatisierungs- und SPS-Techniker gewinnen: was die Rolle tatsächlich abgrenzt',
      description:
        'Was „Automatisierung“ im Betrieb heißt, was tschechische Vorschriften verlangen und was nur Branchenüblichkeit ist, und warum Steuerungsplattform und Sicherheitstechnik getrennt gehören.',
      h1: 'Automatisierungs- und SPS-Techniker gewinnen: was die Rolle tatsächlich abgrenzt',
      intro:
        'Die Automatisierung ist unter den technischen Berufen darin besonders, dass sie sich nicht mit einem Fachgebiet beschreiben lässt. Wer an einer Linie die Steuerung einrichtet, bewegt sich zwischen Elektrotechnik, Mechanik und Software, und je nachdem, welche dieser drei Seiten Ihr Betrieb am meisten braucht, sieht die passende Person anders aus. Eine Beschreibung der Art „wir suchen einen Automatisierungstechniker“ sagt deshalb für sich genommen fast nichts. Diese Seite trennt, was aus Vorschriften folgt, was bloße Branchenüblichkeit ist und was jeder Betrieb selbst festlegt.',
      breadcrumb: 'Automatisierungstechnik',
      sections: [
        {
          heading: 'Was sich unter „Automatisierung“ verbirgt',
          body: [
            'Unter einem Namen treffen sich Rollen mit sehr unterschiedlichem Inhalt, und jede Variante betont eine andere Fähigkeit.',
            'Der Unterschied zwischen ihnen ist für die Besetzung wesentlicher als die Stellenbezeichnung selbst. Wer über Jahre bestehende Linien zuverlässig instand hält, muss nicht derjenige sein, der die Steuerung einer neuen Anlage vorbereitet – und umgekehrt.',
          ],
          list: {
            intro: 'In der Praxis geht es um vier verschiedene Aufgaben:',
            items: [
              'Instandhaltung und Diagnose bereits betriebener Anlagen',
              'Inbetriebnahme neuer Linien und deren Abstimmung',
              'Anpassung von Programmen nach Änderungen in der Fertigung',
              'Entwurf des Steuerungsteils einer Anlage und dessen Dokumentation',
            ],
          },
        },
        {
          heading: 'Was aus Vorschriften folgt und was nicht',
          body: [
            'Hier lohnt es sich, drei Dinge zu trennen, die in Anzeigen üblicherweise vermischt werden.',
            'Geregelte Befähigung: Soll eine Person an einer elektrischen Anlage tätig werden, richtet sich ihre fachliche Befähigung nach der tschechischen Regierungsverordnung Nr. 194/2022 Sb. Das ist eine rechtliche Anforderung, die an Tätigkeit und Anlage knüpft und nicht an eine Stellenbezeichnung. Betreibt ein Unternehmen vorbehaltene technische Anlagen, gilt zusätzlich die Regelung nach dem tschechischen Gesetz Nr. 250/2021 Sb.',
            'Branchenüblichkeit: Kenntnis einer bestimmten Steuerungsplattform, Erfahrung mit einem bestimmten Bustyp oder Praxis mit Robotern eines bestimmten Herstellers. Nichts davon folgt aus einer Vorschrift, auch wenn Arbeitgeber es häufig als Bedingung nennen.',
            'Betriebliche Wahl: die eingesetzten Systeme, die Sprache der Dokumentation, die Art der Programmverwaltung und der Fernzugriff auf die Anlagen. Das legt allein das Unternehmen fest, und eine Bewerberin oder ein Bewerber kann es vorab nicht wissen.',
            'Aus dem Ausland lässt sich diese Position besetzen. Bei Nachweisen aus dem Ausland ist dabei zu prüfen, ob und in welcher Form sie für die jeweilige Tätigkeit anerkannt werden; die Anerkennung ausländischer Qualifikationen ist eine eigene Frage, die diese Seite nicht behandelt.',
          ],
        },
        {
          heading: 'Steuerungsplattformen und der Umgang damit in der Beschreibung',
          body: [
            'Die Kenntnis einer bestimmten SPS-Plattform ist der häufigste Grund, aus dem eine Beschreibung den Kreis unnötig verengt. Die Umgebungen der Hersteller unterscheiden sich, die Logik der Arbeit überträgt sich jedoch weitgehend – wer versteht, was die Steuerung tun soll, findet sich in einer anderen Umgebung zurecht, wenn er Zeit dafür bekommt.',
            'Es lohnt sich deshalb, in der Beschreibung zu trennen, was vom ersten Tag an wirklich notwendig ist und was sich nachlernen lässt. In einem Betrieb mit einer einzigen Plattform und ohne Kapazität für Einarbeitung ist die Anforderung berechtigt. Wo mehrere Systeme nebeneinander laufen, zählt meist mehr, Dokumentation lesen und die Ursache einer Störung systematisch suchen zu können.',
            'Lohnniveaus für diese Positionen nennen wir nicht; Lohnangaben denken wir uns nicht aus. Eine Orientierung bietet das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV), betrieben vom tschechischen Ministerium für Arbeit und Soziales (MPSV), in dem sich mit Angaben nach Beruf und Region arbeiten lässt.',
          ],
          list: {
            intro: 'In der Beschreibung klären Sie deshalb:',
            items: [
              'Welche Systeme im Betrieb tatsächlich im Einsatz sind',
              'Ob es um Anpassungen bestehender Programme oder um die Erstellung neuer geht',
              'Ob jemand verfügbar ist, der eine neue Person in die Umgebung einführt',
              'Welcher Teil der Arbeit an der Anlage stattfindet und welcher außerhalb',
            ],
          },
        },
        {
          heading: 'Die Sicherheitstechnik und warum man danach getrennt fragt',
          body: [
            'Die Sicherheitskreise von Maschinen sind der Bereich, in dem sich die Erfahrung am stärksten unterscheidet und in dem sich das zugleich am schlechtesten aus einem Lebenslauf erkennen lässt. Manche haben sich nur in der Betriebslogik bewegt, andere regelmäßig auch Sicherheitsfunktionen und deren Dokumentation bearbeitet.',
            'Für den Betrieb ist das wesentlich, weil ein Eingriff in den Sicherheitsteil andere Folgen hat als eine Änderung der Betriebslogik. Diese Erfahrung prüft man deshalb am besten mit einer eigenen Frage und setzt sie nicht nach der Dauer der Praxis voraus.',
          ],
        },
        {
          heading: 'Wonach Sie in der Auswahl fragen',
          body: [
            'Bei der Automatisierung bewährt es sich, nach konkreten Situationen zu fragen statt nach einer Liste von Technologien. Die Beschreibung einer tatsächlich gelösten Störung samt dem Weg zur Ursache sagt über die Arbeitsweise mehr als eine Aufzählung von Abkürzungen.',
            'Ebenso lohnt es sich zu besprechen, wie jemand mit Dokumentation umgeht und was er hinterlässt. In einem Betrieb, in dem Anlagen über Jahre betrieben werden, ist die Nachvollziehbarkeit der vorgenommenen Änderungen oft wertvoller als die Geschwindigkeit des Eingriffs selbst.',
          ],
          list: {
            intro: 'Über die Störungsbeschreibung und den Umgang mit Dokumentation hinaus lohnt es sich zu prüfen:',
            items: [
              'Erfahrung mit der Inbetriebnahme von Anlagen',
              'Erfahrung mit dem Sicherheitsteil der Anlagen',
              'Die Bereitschaft zu Einsätzen vor Ort oder zu Rufbereitschaft, sofern der Betrieb sie verlangt',
            ],
          },
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
        'Vier Welten unter einem Namen – Prozess-, Fertigungs-, Industrial Engineering und Konstruktion –, wann „Ingenieur“ in Tschechien geregelt ist, und Ausbildung gegen Erfahrung.',
      h1: 'Ingenieurpositionen: warum die Stellenbezeichnung nichts über die Person sagt',
      intro:
        'Das Wort Ingenieur wird in tschechischen Betrieben für Rollen verwendet, die nur eines gemeinsam haben: Sie befassen sich mit Technik. Eine verbessert den Ablauf der Fertigung, eine zweite betreut den Anlauf eines neuen Produkts, eine dritte entwirft die Gestaltung eines Arbeitsplatzes, eine vierte kümmert sich um Messung und Daten. Eine Beschreibung, die nur sagt „wir suchen einen Ingenieur für die Produktion“, bringt deshalb meist Bewerbungen, die untereinander nicht vergleichbar sind. Diese Seite hilft zu benennen, um welche dieser Rollen es tatsächlich geht, und weist auf einen Unterschied hin, der bei der Besetzung regelmäßig übersehen wird.',
      breadcrumb: 'Ingenieurpositionen',
      sections: [
        {
          heading: 'Vier verschiedene Welten unter einem Namen',
          body: [
            'Ingenieurrollen in der Fertigung lassen sich danach unterscheiden, woran ihr Ergebnis hängt. Vier Gruppen kommen dabei regelmäßig vor, und Konstruktion und Technologie bilden darunter eine eigene Gruppe, der eine eigene Seite gewidmet ist.',
            'Diese Welten überschneiden sich, ihr Schwerpunkt liegt aber jeweils anderswo, und wer in einer von ihnen arbeitet, wechselt nicht automatisch in eine andere. In kleineren Unternehmen sind Prozess- und Fertigungstechnik eine Rolle, in größeren zwei getrennte.',
          ],
          list: {
            intro: 'Woran das Ergebnis jeweils hängt:',
            items: [
              'Prozesstechnik – Stabilität und Verhalten des Fertigungsprozesses: wie die Fertigung abläuft und warum sie sich so verhält, wie sie sich verhält',
              'Fertigungstechnik – Anläufe und Änderungen: Einführung eines neuen Teils, Verlagerung einer Linie, Anpassung eines Verfahrens',
              'Industrial Engineering – Organisation der Arbeit, Kapazitäten und Materialfluss',
              'Konstruktion und Technologie – Entwurf und Fertigungsvorbereitung',
            ],
          },
        },
        {
          heading: 'Wann „Ingenieur“ eine geregelte Tätigkeit ist und wann nur eine Bezeichnung',
          body: [
            'Dieser Unterschied ist wichtig zu kennen, weil er eine häufige Quelle von Missverständnissen ist.',
            'Geregelte Tätigkeit: Die Autorisierung im Bauwesen nach dem tschechischen Gesetz Nr. 360/1992 Sb. betrifft ausgewählte Tätigkeiten im Bauwesen und in der Planung. Wer eine solche Tätigkeit in Tschechien ausübt, benötigt die Autorisierung – das ist eine rechtliche Anforderung und keine Gewohnheit.',
            'Bloße Bezeichnung: Bei der überwiegenden Mehrheit der Ingenieurpositionen in der verarbeitenden Industrie besteht keine vergleichbare Regelung. „Prozessingenieur“ oder „Fertigungsingenieur“ ist eine Stellenbezeichnung, die das Unternehmen selbst festlegt. Daraus folgt eine praktische Konsequenz: Zwei Menschen mit derselben Stellenbezeichnung im Lebenslauf können völlig unterschiedliche Arbeit geleistet haben, und die Bezeichnung allein garantiert nichts.',
            'Beschreibungen der Rollen und ihrer üblichen Anforderungen veröffentlicht das tschechische Berufsverzeichnis (Národní soustava povolání); für Berufsqualifikationen dient das tschechische Qualifikationsverzeichnis (Národní soustava kvalifikací) nach dem tschechischen Gesetz Nr. 179/2006 Sb.',
          ],
        },
        {
          heading: 'Ausbildung gegen Erfahrung',
          body: [
            'Bei Ingenieurpositionen wird häufig automatisch ein technischer Hochschulabschluss verlangt. In vielen Betrieben ist das begründet, in anderen eher eine Gewohnheit, die erfahrene Menschen ausschließt, die sich aus der Fertigung zu der Rolle hochgearbeitet haben.',
            'Nützlicher als eine Ausbildungsstufe ist die Frage, welche Art von Problem die Person selbstständig zerlegen können muss. Steht die Position auf statistischer Auswertung und Arbeit mit Daten, ist eine formale Ausbildung sinnvoll. Steht sie auf der Kenntnis einer bestimmten Technologie und darauf, eine Änderung im Betrieb durchzusetzen, entscheiden eher die Praxis und die Art, wie jemand mit Meistern und Bedienern spricht.',
            'Ob jemand tatsächlich getan hat, was im Lebenslauf steht, zeigt sich am verlässlichsten an einem einzigen konkreten Fall, den die Person von der Aufgabenstellung bis zum Ergebnis beschreibt – was sie gemessen hat, was sie geändert hat und wie sich das ausgewirkt hat. Allgemeine Methoden lernt jemand schneller als die Fähigkeit, eine Änderung im Betrieb durchzusetzen.',
          ],
        },
        {
          heading: 'Was in die Beschreibung gehört',
          body: [
            'Ingenieurpositionen lassen sich besser besetzen, wenn die Beschreibung ein Ergebnis nennt statt einer Werkzeugliste. „Wir suchen jemanden, der die Zahl der abweichenden Teile an Linie X senkt“ ist für eine Suche brauchbarer als eine Aufzählung von Methoden.',
            'Ebenso wichtig ist anzugeben, mit wem die Person arbeitet und welche Befugnisse sie hat. Wer ein eingefahrenes Verfahren ändern soll, ohne Rückhalt in der Betriebsleitung zu haben, geht meist, bevor die Änderung wirkt. Diese Information beziehen Kandidatinnen und Kandidaten in ihre Entscheidung ein.',
            'Konkrete Lohnniveaus für Ingenieurpositionen nennt diese Seite nicht. Eine Orientierung nach Beruf und Region bietet das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV); die Gesamtkosten einer Stelle lassen sich in unserem Rechner durchrechnen.',
          ],
          list: {
            intro: 'In die Beschreibung gehört deshalb:',
            items: [
              'Welches konkrete Ergebnis von der Rolle erwartet wird',
              'Wer die Aufgabe stellt und wer über die Änderung entscheidet',
              'Ob es sich um eine Projektrolle oder um einen dauerhaften Aufgabenbereich handelt',
              'Welcher Teil der Arbeit unmittelbar im Betrieb stattfindet',
            ],
          },
        },
        {
          heading: 'Woher diese Menschen kommen',
          body: [
            'Ingenieurpositionen werden aus drei Quellen besetzt: durch Beförderung von innen, durch Wechsel aus einem anderen Betrieb derselben Branche und durch Wechsel aus einer anderen Branche. Jede Quelle hat einen Nachteil, den man vorher kennen sollte.',
            'Wer von innen kommt, kennt Betrieb und Menschen, hat aber womöglich keine Methode. Wer aus einem anderen Unternehmen der Branche kommt, bringt Vergleich mit, erwartet aber vergleichbare Bedingungen. Wer aus einer anderen Branche kommt, bringt einen anderen Blick, braucht aber Zeit, die Technologie zu verstehen – und gerade diese Zeit wird in der Beschreibung meist unterschätzt.',
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
        'Wo die eine Rolle endet und die andere beginnt, was sich an der Zeichnung prüfen lässt und warum CAD und CAM eine Wahl des Betriebs sind, nicht des Berufs.',
      h1: 'Technologen und Konstrukteure: zwei Rollen, die verwechselt werden',
      intro:
        'Technologe und Konstrukteur gehören zu den Rollen, die in Anzeigen am häufigsten verwechselt werden, obwohl ihre Arbeit an entgegengesetzten Enden beginnt. Der Konstrukteur verantwortet, wie ein Teil aussehen und was es erfüllen soll. Der Technologe verantwortet, wie ein solches Teil in einem konkreten Betrieb tatsächlich gefertigt wird – mit welchem Verfahren, auf welcher Maschine, mit welchem Werkzeug und in welcher Zeit. Sie zu verwechseln heißt, eine Person mit völlig anderer Erfahrung zu suchen. Diese Seite behandelt, worin sich beide unterscheiden, was sich bei ihnen prüfen lässt und was von Ihrer Ausstattung abhängt.',
      breadcrumb: 'Technologen und Konstrukteure',
      sections: [
        {
          heading: 'Wo eine Rolle endet und die andere beginnt',
          body: [
            'Der Konstrukteur arbeitet mit einer Funktionsanforderung, und das Ergebnis ist eine Dokumentation, die ein Teil oder eine Baugruppe beschreibt – Form, Maße, Werkstoff, Toleranzen, Oberflächenanforderungen.',
            'Der Technologe übernimmt diese Dokumentation und überführt sie in einen Fertigungsablauf. Er behandelt Maschinen- und Werkzeugwahl, Aufspannung, Reihenfolge der Arbeitsgänge, Zeiten und die Frage, ob sich das Teil in diesem Betrieb überhaupt wirtschaftlich fertigen lässt. Genau hier entsteht die Rückmeldung an die Konstruktion – der Technologe ist oft der Erste, der darauf hinweist, dass eine vorgeschlagene Form nur schwer zu fertigen sein wird.',
            'In kleineren Unternehmen verschmelzen beide Rollen zu einer, und die Beschreibung muss dann sagen, welcher Teil überwiegt.',
          ],
        },
        {
          heading: 'Die technische Produktionsvorbereitung als eigene Disziplin',
          body: [
            'Die technische Produktionsvorbereitung umfasst mehr als das Erstellen eines Ablaufs; sie reicht bis in die Abstimmung mit Einkauf und Qualität hinein.',
            'Für die Besetzung folgt daraus eines: Wer Abläufe für die Einzelfertigung erstellt hat, hat etwas anderes gelöst als jemand aus der Großserie. In der Einzelfertigung entscheiden die Geschwindigkeit der Vorbereitung und Vielseitigkeit, in der Serie lohnt es sich, auch Kleinigkeiten zu optimieren. Dieser Unterschied gehört in die Beschreibung.',
          ],
          list: {
            intro: 'Zur Disziplin gehören im Einzelnen:',
            items: [
              'Erstellen und Pflegen der Fertigungsabläufe',
              'Verwaltung der Dokumentation, ihrer Versionen und der Änderungsdokumentation',
              'Wahl der Werkzeuge und ihre Erfassung',
              'Zeitvorgaben und die Abstimmung mit der Planung',
            ],
          },
        },
        {
          heading: 'Die Zeichnung ist die am besten prüfbare Fähigkeit',
          body: [
            'Die Arbeit mit einer Zeichnung ist bei beiden Rollen das am besten Prüfbare. Es geht nicht nur ums Lesen von Maßen, sondern um das Verständnis von Toleranzen, vorgeschriebener Oberflächengüte und geometrischen Anforderungen.',
            'Eine praktische Prüfung an einer echten Zeichnung aus Ihrem Betrieb sagt binnen Minuten mehr als eine Programmliste im Lebenslauf – und sie ist fair gegenüber Menschen, die in einem anderen System gearbeitet haben, das Handwerk aber verstehen.',
          ],
        },
        {
          heading: 'CAD und CAM: Anforderung des Betriebs, nicht des Berufs',
          body: [
            'Das konkrete CAD- oder CAM-System wählt das Unternehmen. Keine Vorschrift schreibt es vor, und der Wechsel zwischen Systemen fällt leichter als üblicherweise angenommen – besonders erfahrenen Menschen, die verstehen, was sie vom System wollen.',
            'Entscheidend ist, ob der Betrieb Kapazität zur Einarbeitung hat. Tritt ein Technologe als einziger ein und soll sofort Aufträge übernehmen, wiegt eine genaue Übereinstimmung schwerer als sonst. Tritt er in ein eingespieltes Team ein, ist es flexibler, Verständnis für den Ablauf und die Bereitschaft zum Nachlernen zu verlangen.',
            'Ähnlich verhält es sich mit Systemen zur Verwaltung von Produktdaten. Erfahrung damit ist ein Vorteil, hängt aber meist an einer konkreten Einführung und lässt sich nicht mechanisch übertragen.',
          ],
        },
        {
          heading: 'Wie sich eine Beschreibung sinnvoll verengen lässt',
          body: [
            'Der häufigste Fehler ist eine Beschreibung, die alle im Unternehmen verwendeten Systeme und alle Fertigungsarten aufzählt. Es entsteht ein Profil, dem niemand entspricht.',
            'Besser ist zu beschreiben, was die Person in den ersten drei Monaten tun wird. Das erleichtert auch das Gespräch – Sie fragen dann nach dem, was tatsächlich entscheidet.',
            'Konstrukteur und Technologe sind nicht dieselbe Rolle, auch wenn eine Person beides abdeckt.',
          ],
          list: {
            intro: 'Vier Angaben verengen die Beschreibung sinnvoll:',
            items: [
              'Ob Konstruktion oder Fertigungsvorbereitung überwiegt',
              'Einzel-, Kleinserien- oder Serienfertigung',
              'Welche Fähigkeiten vom ersten Tag an nötig sind und was sich nachlernen lässt',
              'Wer die Vorgabe übergibt und wer das Ergebnis übernimmt',
            ],
          },
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
        'Die Familien der Metallberufe, die Grenze zwischen Bedienen, Einrichten und Programmieren und warum Zeichnung und Messmittel die Besetzbarkeit stärker bestimmen als die Maschine.',
      h1: 'Metallberufe: Zerspanung, Schweißen und Schlosserei',
      intro:
        'Unter den Metallberufen verbergen sich mehrere eigenständige Handwerke mit unterschiedlicher Ausbildung, unterschiedlichen Nachweisen und unterschiedlich großen Kandidatenkreisen. Eine Beschreibung „wir suchen einen Metaller“ führt deshalb nirgendwohin – Zerspaner, Schweißer, Schlosser und Werkzeugmacher unterscheiden sich nicht nur in dem, was sie tun, sondern vor allem darin, woran sich ihre Befähigung prüfen lässt. Diese Seite behandelt die einzelnen Familien, die Grenze zwischen Bedienen, Einrichten und Programmieren und den Grund, warum am Ende Zeichnung und Messmittel mehr über die Besetzbarkeit entscheiden als die Maschinenmarke.',
      breadcrumb: 'Metallberufe',
      sections: [
        {
          heading: 'Die Familien und ihre Unterschiede',
          body: [
            'Die Metallfertigung ruht auf mehreren Handwerken, die aneinandergrenzen, sich aber nicht vertreten. Der Unterschied liegt nicht im Geschick, sondern darin, womit gearbeitet wird: Der Zerspaner trägt Werkstoff ab, der Schweißer verbindet ihn, der Schlosser fügt und passt, der Werkzeugmacher fertigt die Werkzeuge und Vorrichtungen, mit denen alles Übrige entsteht. Verschmilzt eine Beschreibung diese Rollen zu einer, sucht das Auswahlverfahren jemanden, den es auf dem Markt entweder nicht gibt oder der für die Arbeit überqualifiziert ist.',
            'Die folgende Übersicht dient als gemeinsames Vokabular für die Abstimmung zwischen Fertigung und Personalabteilung. Eine ausführliche Beschreibung der Tätigkeiten und der fachlichen Anforderungen zu jedem dieser Berufe führt das tschechische Berufsverzeichnis (Národní soustava povolání).',
          ],
          list: {
            intro: 'Die Familien, die in der Metallfertigung wiederkehren:',
            items: [
              'Zerspaner – Drehen, Fräsen und Bohren an konventionellen wie an CNC-Maschinen, mit Schwerpunkt auf Maß und Toleranz',
              'CNC-Bediener und Einrichter – Bedienen der Maschine und ihre Vorbereitung auf den Auftrag; die Grenze dazwischen ist für die Besetzung entscheidend',
              'Schweißer – Verbinden von Werkstoff nach Verfahren und Position; der Umfang der Qualifikation ergibt sich aus dem im Zeugnis angegebenen Geltungsbereich der Prüfung',
              'Schlosser – Zusammenbauen, Passen sowie Instandsetzung und Wartung von Konstruktionen und Maschinenbaugruppen',
              'Werkzeugmacher – Fertigung und Instandhaltung von Formen, Vorrichtungen und Schnittwerkzeugen mit hohen Anforderungen an Genauigkeit und Wiederholbarkeit',
              'Schleifer – Endbearbeitung, bei der über Oberflächenrauheit und Endmaß entschieden wird',
              'Monteur und Mechaniker – Montage, Inbetriebnahme und Service von Maschinen im eigenen Betrieb wie beim Kunden',
            ],
          },
        },
        {
          heading: 'Bedienen, Einrichten und Programmieren sind nicht dasselbe',
          body: [
            'Der häufigste Fehler betrifft nicht das Handwerk, sondern die Ebene. Der Bediener überwacht die Maschine, legt Teile ein und entnimmt sie, prüft Maße und löst übliche Situationen. Der Einrichter bereitet die Maschine auf einen anderen Auftrag vor – spannt die Vorrichtung, vermisst Werkzeuge, fährt den Nullpunkt an, passt die Korrekturen an und fertigt das erste Teil. Der Programmierer erstellt Technologie und Werkzeugbahn, sei es durch Werkstattprogrammierung unmittelbar an der Maschine oder in einem CAM-System.',
            'Jede dieser Ebenen hat eine andere Verfügbarkeit am Markt und eine andere Einarbeitungszeit. Wer alle drei in eine Anzeige schreibt, erhält meist Bewerbungen von Bedienern und wartet dabei auf einen Einrichter. Dem Unterschied und dem, was daraus für die Besetzbarkeit folgt, widmet sich eine eigene Seite über CNC-Bediener und Einrichter.',
          ],
        },
        {
          heading: 'Zeichnung und Messmittel sind die eigentliche Trennlinie',
          body: [
            'Zwei Fragenkreise bringen in der Auswahl am meisten: was jemand aus einer Zeichnung liest und was er mit einem Messmittel tut. Eine Zeichnung zu lesen heißt nicht, ein Maß zu finden. Es geht um Toleranzfeld, geometrische Toleranzen, vorgeschriebene Rauheit, Schnitte und Ansichten sowie Schweißzeichen – also darum, was geschieht, wenn das Maß stimmt und die Form nicht.',
            'Der zweite Fragenkreis ist messtechnisch. Messschieber, Mikrometer, Messuhr und Grenzlehren werden unterschiedlich eingesetzt und messen mit unterschiedlicher Genauigkeit; eine erfahrene Fachkraft erkennt, wann welches Mittel nicht mehr genügt und wann eine Messung auf einem Koordinatenmessgerät angebracht ist. Auf dieselbe Ebene gehört die Ordnung in der Kalibrierung der Messmittel: Den allgemeinen Rahmen für Messmittel und ihre Rückführbarkeit gibt in Tschechien das Gesetz über das Messwesen, den konkreten Umgang mit Arbeitsmessmitteln legt der Betrieb in seiner eigenen messtechnischen Ordnung fest – und Kundenaudits fragen danach.',
          ],
          list: {
            intro: 'Vier Prüfungen bringen in der Auswahl am meisten:',
            items: [
              'Lassen Sie eine echte Zeichnung aus Ihrer Fertigung lesen, keine allgemeine Aufgabe',
              'Fragen Sie, wie ein bestimmtes Maß geprüft würde und warum gerade mit diesem Messmittel',
              'Fragen Sie nach einer Situation, in der ein Teil nicht in Ordnung war – was getan und wer informiert wurde',
              'Prüfen Sie, ob nach einem Prüfplan gearbeitet und wie die Ergebnisse erfasst wurden',
            ],
          },
        },
        {
          heading: 'Eine Maschine, mehrere Maschinen und der Wechsel zwischen Branchen',
          body: [
            'Die zweite Achse ist die Breite. Wer an einem Maschinentyp in langen Serien eingearbeitet ist, hat ein anderes Profil als jemand, der in Einzel- und Kleinserienfertigung zwischen Maschinen wechselt, die Zeichnung selbst liest und selbst einrichtet. Mehrmaschinenbedienung ist dabei nicht nur eine Frage des Könnens, sondern auch der Anordnung des Arbeitsplatzes und der Maschinenlaufzeiten; ohne diese lässt sie sich auch nach der Einarbeitung nicht erwarten.',
            'Praxis aus einer anderen Branche überträgt sich ungleichmäßig. Die handwerkliche Grundlage – Messen, Zeichnungslesen, Spannen, Umgang mit dem Werkzeug – geht gut mit. Schlechter überträgt sich, was an Werkstoff, Seriengröße und Dokumentation hängt: Wer in der automobilen Serienfertigung Aluminiumgussteile zerspant hat, ist nicht sofort in der Einzelfertigung aus nichtrostendem Stahl zu Hause, und umgekehrt. Beim Schweißen ist die Grenze härter, weil den Umfang der Qualifikation der im Zeugnis angegebene Geltungsbereich der Prüfung bestimmt und nicht die Dauer der Praxis.',
          ],
        },
        {
          heading: 'Den Beruf beschreiben: die nationalen Verzeichnisse als gemeinsames Vokabular',
          body: [
            'Für die Beschreibung einer Stelle lohnt es sich, keine eigene Terminologie zu erfinden. Das tschechische Berufsverzeichnis (Národní soustava povolání) beschreibt Berufe, Typuspositionen und ihre fachlichen Anforderungen; das tschechische Qualifikationsverzeichnis (Národní soustava kvalifikací) ordnet ihnen Berufsqualifikationen mit einem Bewertungsstandard zu, die sich nach einer Prüfung vor einer autorisierten Person nach dem tschechischen Gesetz über die Überprüfung und Anerkennung der Ergebnisse der Weiterbildung durch ein Zeugnis belegen lassen. Für Arbeitgeber ist das doppelt praktisch: Die Beschreibung bekommt eine verständliche Form, und zugleich öffnet sich ein Weg zu Menschen, die das Handwerk beherrschen, aber keinen entsprechenden Lehrabschluss haben.',
            'Daneben gibt es Nachweise, die sich durch nichts ersetzen lassen. Beim Schweißen ist es das Zeugnis über die Schweißerprüfung nach der einschlägigen Norm mit dem angegebenen Geltungsbereich, bei Arbeiten an elektrischen Anlagen der Nachweis der fachlichen Befähigung in der Elektrotechnik, bei den nach tschechischem Recht vorbehaltenen technischen Anlagen das entsprechende Zeugnis. Diese Nachweise sind befristet und gehören gleich zu Beginn in die Beschreibung, nicht erst zur Vertragsunterzeichnung.',
            'Lohnspannen für die Metallberufe nennen wir nicht, und Lohndaten denken wir uns nicht aus. Gegliederte Angaben zu den Verdiensten nach Berufen veröffentlicht das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV); ein Bild des Arbeitsmarktes geben dann das tschechische Ministerium für Arbeit und Soziales (MPSV), das Arbeitsamt der Tschechischen Republik (Úřad práce ČR) und das Tschechische Statistische Amt (ČSÚ).',
          ],
          list: {
            intro: 'Fünf Angaben machen eine Beschreibung brauchbar:',
            items: [
              'Nennen Sie den Beruf mit der Bezeichnung des tschechischen Berufsverzeichnisses, nicht mit einer internen Abkürzung oder einer Kostenstellennummer',
              'Unterscheiden Sie die Ebene: Bedienen, selbstständiges Arbeiten nach Zeichnung oder Einrichten',
              'Nennen Sie Maschinen, bearbeitete Werkstoffe und die typische Seriengröße',
              'Beschreiben Sie Schichtmodell und Arbeitsplatz, bevor Sie zum Entgelt kommen',
              'Listen Sie die erforderlichen Nachweise samt Geltungsbereich und geforderter Gültigkeit auf',
            ],
          },
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
      title: 'Technische Angestellte: was dazugehört und wie sich diese Stellen besetzen lassen',
      description:
        'Was die tschechische Kategorie „THP“ umfasst, warum sie kein Rechtsbegriff ist, welche Rollen dazuzählen und warum die Besetzung an der Beschreibung hängt.',
      h1: 'Technische Angestellte: was dazugehört und wie sich diese Stellen besetzen lassen',
      intro:
        'Die tschechische Abkürzung THP – technisch-wirtschaftliche Beschäftigte – wird in Fertigungs- und Logistikunternehmen täglich verwendet, doch jeder Betrieb zieht die Grenze dieser Kategorie selbst. Irgendwo umfasst sie nur die technische Produktionsvorbereitung, anderswo auch Meister, Planung, Einkauf und Lohnbuchhaltung. Für die Besetzung hat das eine wesentliche Folge: Dieselbe Stellenbezeichnung bedeutet in jedem Unternehmen andere Arbeit, sodass eine Anzeige ohne Beschreibung des tatsächlichen Inhalts Menschen anzieht, die etwas anderes getan haben. Diese Seite erklärt, was die Kategorie in der Praxis umfasst und worin sie sich von gewerblichen Berufen unterscheidet.',
      breadcrumb: 'Technische Angestellte',
      sections: [
        {
          heading: 'Was die Kategorie in der tschechischen Praxis bedeutet',
          body: [
            'Technisch-wirtschaftliche Beschäftigte sind eine betriebliche Einteilung und kein Rechtsbegriff – das tschechische Arbeitsgesetzbuch kennt eine solche Kategorie nicht und knüpft daran keine besonderen Rechte oder Pflichten. Unternehmen verwenden sie in ihrer Organisationsstruktur, in Budgets und im Berichtswesen, um gewerbliche Berufe, deren Arbeit unmittelbar an einen Fertigungsvorgang gebunden ist, von jenen technischen und wirtschaftlichen Funktionen zu unterscheiden, die die Fertigung vorbereiten, planen, kontrollieren und administrativ bedienen.',
            'In der Praxis gehören dazu auch eine andere Art der Vergütung und ein anderer Tagesrhythmus: Diese Stellen liegen meist außerhalb des Schichttakts, üblicherweise wird ein Monatsentgelt vereinbart, und ihre Leistung misst sich nicht in Stückzahlen, sondern in Rechtzeitigkeit und Richtigkeit des Ergebnisses – fertige Dokumentation, aufgestellter Plan, bestelltes Material, abgeschlossene Lohnabrechnung. Genau deshalb sind sie schwer zu besetzen: Es fehlt das einfache Kriterium, nach dem sich eine Bewerbung schnell beurteilen ließe.',
            'Das gehört einem ausländischen Publikum deutlich gesagt, denn eine Kategorie, die in tschechischen Stellenanzeigen überall und im Gesetz nirgends vorkommt, wird leicht für eine Qualifikation gehalten.',
          ],
        },
        {
          heading: 'Welche Rollen üblicherweise dazuzählen',
          body: [
            'Der Umfang unterscheidet sich mit der Größe des Betriebs. In einem kleineren Unternehmen deckt eine Person Technologie und Planung zugleich ab, in einem größeren sind es getrennte Arbeitsplätze mit eigenen Schnittstellen.',
          ],
          list: {
            intro:
              'Der folgende Überblick entspricht dem, was in tschechischen Fertigungs- und Logistikbetrieben am häufigsten unter die Kategorie gezählt wird:',
            items: [
              'Technologe und technische Produktionsvorbereitung – Abläufe, Verbrauchsnormen, Anlauf neuer Teile',
              'Konstrukteur – Zeichnungs- und Modelldokumentation, Änderungsverfahren',
              'Fertigungsplaner und Disponent – Auftragsplan, Materialverfügbarkeit, Reaktion auf Ausfälle',
              'Einkäufer und Beschaffer – Anfragen, Bestellungen, Termine und Lieferanten',
              'Qualitätstechniker und Qualitätsingenieur – Dokumentation, Messung, Reklamationen und Abhilfemaßnahmen',
              'Lohn- und Personaladministration – Lohnabrechnung, Anwesenheit, Aufzeichnungen und Vertragsunterlagen',
              'Versandadministration und Fakturierung – Belege für den Warenausgang und ihre Anbindung an die Buchhaltung',
            ],
          },
        },
        {
          heading: 'Warum die Besetzung an der Beschreibung hängt',
          body: [
            'Bei gewerblichen Berufen lässt sich die Arbeit über Maschine und Arbeitsgang recht gut beschreiben. Bei technisch-wirtschaftlichen Rollen ergibt sich der Inhalt daraus, welche Systeme der Betrieb nutzt, wie viele Aufträge geplant werden, wie die Änderung von Dokumentation organisiert ist und mit wie vielen Menschen sich die Person täglich abstimmt.',
            'Zwei Fertigungsplaner mit derselben Stellenbezeichnung können daher Arbeit tun, die kaum etwas gemeinsam hat – der eine löst den Plan im Unternehmenssystem in Schichten auf, der andere stellt ihn von Hand in einer Tabelle zusammen und telefoniert Lieferanten ab.',
            'Eine Beschreibung schärft sich leichter über Ergebnisse und Schnittstellen als über persönliche Eigenschaften. Statt „selbstständiger und verantwortungsbewusster Technologe“ lieber: bereitet Abläufe für die Zerspanung an drei Arbeitsplätzen vor, führt das Änderungsverfahren, stimmt sich mit Konstruktion und Qualität ab. Eine solche Beschreibung lässt sich bei der Ansprache wie im Gespräch verwenden, und die Fragen, mit denen sich Kompetenz prüfen lässt, folgen unmittelbar aus ihr.',
          ],
          list: {
            intro: 'Fünf Angaben tragen eine solche Beschreibung:',
            items: [
              'Welche Ergebnisse die Person abliefern soll und in welchem Rhythmus',
              'In welchen Systemen gearbeitet wird – Unternehmenssystem, CAD, Tabellen, Planungswerkzeug',
              'Mit wem täglich abgestimmt wird und wer auf das Ergebnis aufsetzt',
              'Wie groß der Aufgabenbereich ist – Zahl der Arbeitsplätze, Aufträge, Lieferanten',
              'Was an Vorkenntnissen nötig ist und was sich bei Ihnen aneignen lässt',
            ],
          },
        },
        {
          heading: 'Das nationale Berufsverzeichnis für die Anforderungen nutzen',
          body: [
            'Das tschechische Berufsverzeichnis (Národní soustava povolání), geführt vom tschechischen Ministerium für Arbeit und Soziales, beschreibt einzelne Berufe und ihre Typuspositionen samt den üblichen Tätigkeiten, den nötigen Kenntnissen und Fähigkeiten und der entsprechenden Ausbildungsstufe.',
            'Für eine Beschreibung ist es vor allem als neutrales Vokabular nützlich: Vergleicht man den Katalogeintrag mit dem, was die Person bei Ihnen tatsächlich tun soll, zeigt sich schnell, wo Ihre Erwartungen von den üblichen abweichen.',
            'Wo eine entsprechende Berufsqualifikation besteht, beschreibt ihre Anforderungen das tschechische Qualifikationsverzeichnis (Národní soustava kvalifikací). Bei Entgeltspannen halten Sie sich an das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV), das Angaben nach Berufen und Regionen ausweist – eigene Zahlen nennen wir nicht, weil sie nicht überprüfbar wären.',
          ],
        },
        {
          heading: 'Der kaufmännische und administrative Teil',
          body: [
            'Neben technischen Rollen gehört das wirtschaftliche Umfeld des Betriebs dazu – Lohn- und Personaladministration, Fakturierung, Aufzeichnungen und der Einkauf. Diese Stellen werden anders besetzt als technische: Entscheidend sind die Kenntnis des konkreten Systems, in dem der jeweilige Aufgabenbereich geführt wird, die Anbindung an geltende Vorschriften und Zuverlässigkeit bei Terminen, denn weder der Lohnabschluss noch der Versand von Belegen warten. Genau deshalb ist hier die Vertretbarkeit entscheidend – eine einzige unersetzliche Person ist ein betriebliches Risiko, das sich bei der ersten längeren Abwesenheit zeigt.',
            'Zur Beschreibung gehört auch die Arbeit mit sensiblen Daten: Die Lohn- und Personalverwaltung arbeitet mit personenbezogenen Daten der Beschäftigten, und Zugriffsrechte wie Verschwiegenheit werden am besten gleich beim Eintritt geregelt. Diese Seite hält sich an das administrative und technische Umfeld von Fertigungs-, Lager- und Logistikbetrieben; die oberste Finanzsteuerung und eng spezialisierte Rollen außerhalb dieses Zusammenhangs behandeln wir hier nicht.',
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
        'Die dünne Schicht über der operativen: welche Rollen sie bildet, die Tiefe der Systemkenntnis als Auswahlkriterium, Zollabwicklung und Planen unter Instabilität.',
      h1: 'Logistik-Fachkräfte: Planung, Disposition und Lagerleitung',
      intro:
        'Die meisten Texte über Logistikbesetzung beschreiben die operative Schicht – Menschen, die Ware körperlich annehmen, einlagern, kommissionieren und versenden. Darüber steht eine deutlich dünnere Schicht fachlicher Rollen, die entscheiden, was wann wohin bewegt wird: Disposition, Transportplanung, Lagerleitung, Beschaffung und Zollabwicklung. Diese Stellen werden anders besetzt als operative Schichten. Entscheidend sind die Kenntnis konkreter Systeme, die Fähigkeit unter sich ändernden Bedingungen zu planen und die Verantwortung für eine Entscheidung, deren Preis sich erst später zeigt.',
      breadcrumb: 'Logistik-Fachkräfte',
      sections: [
        {
          heading: 'Wo die operative Schicht endet und die fachliche beginnt',
          body: [
            'Die Grenze zieht man am besten danach, wer den Plan ausführt und wer ihn erstellt. Lagerkräfte, Handling-, Kommissionier- und Versandkräfte arbeiten nach einer Vorgabe, die System und Schicht ihnen bringen. Disponentin, Planer oder Lagerleitung erstellen diese Vorgabe, ändern sie im Tagesverlauf und tragen ihre Folgen.',
            'Der Unterschied zeigt sich schon bei der Beschreibung der Stelle. Bei einer operativen Rolle genügt es, Arbeitsplatz, Schichtmodell und körperliche Anforderungen zu beschreiben. Bei einer fachlichen Rolle muss die Verantwortung beschrieben werden: welches Volumen, wie viele Menschen, welche Systeme, welche Entscheidungsbefugnis – und was geschehen soll, wenn Plan und Wirklichkeit auseinandergehen.',
          ],
        },
        {
          heading: 'Welche Rollen diese Schicht bilden',
          body: [
            'Die Bezeichnungen unterscheiden sich von Unternehmen zu Unternehmen, der Inhalt wiederholt sich jedoch. In einer Beschreibung ist es deshalb besser, die Verantwortung zu benennen als den Titel – derselbe Titel bedeutet in einem kleinen Lager und in einem Distributionszentrum Verschiedenes.',
            'Das tschechische Berufsverzeichnis (Národní soustava povolání) beschreibt Berufe und ihre üblichen Anforderungen und ist ein geeigneter Ausgangspunkt, wenn eine Beschreibung zu klären ist.',
          ],
          list: {
            intro: 'Die Rollen, die unabhängig von der Bezeichnung wiederkehren:',
            items: [
              'Disponent – steuert den täglichen Fluss von Fahrzeugen und Sendungen und entscheidet in Echtzeit, wenn der Plan nicht mehr gilt',
              'Transportplaner – stellt Touren und Fahrten zusammen, bündelt Aufträge und achtet auf die Auslastung und die Einhaltung von Zeitfenstern',
              'Versandkoordinator – hält den Übergang zwischen Kommissionierung, Kontrolle und Abfertigung des Frachtführers zusammen',
              'Lagerschichtleiter – verantwortet Schichtbesetzung, Tempo, Qualität und die Übergabe an die Folgeschicht',
              'Lagerleiter – verantwortet den Betrieb als Ganzes: Kapazität, Bestand, Technik, Menschen und Kosten',
              'Beschaffungsspezialist – überwacht die Verfügbarkeit von Material oder Ware, die Bestellpunkte und die Kommunikation mit Lieferanten',
              'Zolldeklarant – bereitet Zolldokumente vor, gibt sie ab und behält die Verfahren bei Sendungen außerhalb des Zollgebiets der Union im Blick',
              'WMS-Spezialist – betreut das Lagersystem, seine Abläufe, Stammdaten und Auswertungen für die Steuerung',
            ],
          },
        },
        {
          heading: 'Die Arbeit mit Systemen als echtes Auswahlkriterium',
          body: [
            'Bei dieser Schicht ist die Arbeit mit Systemen eines der wenigen Kriterien, die sich in der Auswahl redlich prüfen lassen. Es geht nicht um die im Lebenslauf genannte Marke eines WMS oder ERP. Entscheidend ist die Tiefe: Die Arbeit einer Person, die im System nur Aufgaben bestätigt, unterscheidet sich von der einer Person, die Stammdaten anlegt, Einlagerungsregeln einstellt, Bestandsdifferenzen klärt und dem System eine brauchbare Entscheidungsgrundlage entlocken kann.',
            'Geprüft wird das mit Fragen nach Situationen, nicht nach Modulnamen. Die Übertragbarkeit zwischen Systemen ist bei einer erfahrenen Person meist hoch, sofern sie die Logik des Prozesses versteht; umgekehrt wird die Kenntnis eines einzelnen Systems ohne Verständnis des Prozesses in Anzeigen überschätzt und verengt den Kandidatenkreis unnötig.',
          ],
          list: {
            intro: 'Fünf Fragen zeigen diese Tiefe:',
            items: [
              'Was im System selbst erledigt wurde und was danach jemand anderes tat',
              'Wie eine Differenz zwischen System- und Ist-Bestand geklärt wurde und wer die Korrektur freigab',
              'Welche Rolle die Person bei der Inventur hatte und was sich danach änderte',
              'Welche Daten aus dem System regelmäßig verfolgt wurden und welche Entscheidungen darauf beruhten',
              'Ob eine Systemeinführung oder -anpassung durchlaufen wurde und wofür die Person dabei konkret zuständig war',
            ],
          },
        },
        {
          heading: 'Zollabwicklung und Sendungen außerhalb des Zollgebiets der Union',
          body: [
            'Ein Teil der Logistikbetriebe in Tschechien kommt ohne Zollabwicklung aus, ein anderer beruht darauf. Überschreitet Ware die Grenze des Zollgebiets der Union, brauchen Sie jemanden, der Zolldokumente vorbereiten und abgeben, mit Zollverfahren und Vertretung im Zollverfahren arbeiten und die anschließende Dokumentation im Blick behalten kann. Diese Kompetenz ist meist eng an eine bestimmte Warenart und an die Richtung des Warenflusses gebunden, was den Kreis geeigneter Menschen weiter verengt.',
            'Konkrete Bedingungen, den Umfang der Vertretung, Fristen oder Gebühren nennen wir hier nicht – die Zollregeln gehen auf das Unionsrecht und seine tschechische Umsetzung zurück und sind bei der tschechischen Zollverwaltung zu prüfen. Für die Beschreibung der Stelle ist wesentlich, welche Verfahren und welche Flussrichtungen die Person tatsächlich bearbeiten wird; ohne das lassen sich Lebensläufe nicht sinnvoll vergleichen.',
          ],
        },
        {
          heading: 'Planen unter Instabilität und die Schnittstelle zum Betrieb',
          body: [
            'Planungsrollen in der Logistik unterscheiden sich von der Fertigungsplanung dadurch, wie schnell sich die Eingangsgrößen ändern: eine verspätete Lieferung, ein abgesagter Frachtführer, fehlende Menschen in der Schicht, ein außerordentlicher Auftrag. Die Qualifikation zeigt sich nicht an einem ruhigen Tag, sondern in dem Moment, in dem der Plan nicht mehr gilt.',
            'In der Auswahl lohnt es sich deshalb, einen konkreten Tag beschreiben zu lassen, an dem der Plan gescheitert ist: was zuerst getan wurde, wer informiert wurde, worauf verzichtet wurde und wonach entschieden wurde.',
            'Die zweite Hälfte der Rolle ist die Schnittstelle zum Betrieb. Disponent wie Schichtleiter stehen zwischen dem Plan und den Menschen, die ihn ausführen, und die Vorgabe muss für eine Schicht verständlich sein, die in hohem Tempo arbeitet und deren Teil erst vor Kurzem eingetreten ist. Ein Schichtleiter steht zudem häufig in der Stellung einer leitenden beschäftigten Person im Sinne des tschechischen Arbeitsgesetzbuchs – dort nämlich, wo ihm weitere Beschäftigte unterstellt sind, denen er Arbeit zuweist und deren Arbeit er organisiert; mit dieser Stellung ist auch die Verantwortung für die Einhaltung der Arbeitsschutzregeln im anvertrauten Bereich verbunden. Das ist eine andere Verantwortung als Koordination, und sie sollte im Profil benannt werden.',
          ],
        },
        {
          heading: 'Warum diese Schicht auf dem Markt dünn ist',
          body: [
            'Operative Rollen gibt es in jedem Lager viele, fachliche nur wenige – Lagerleitung, Disposition, Planung, Systembetreuung. Die Kompetenz entsteht zudem über längere Zeit innerhalb eines konkreten Betriebs und nicht in der Schule, sodass die Menschen, die sie haben, üblicherweise keine Arbeit suchen und auf Anzeigen nicht reagieren. Konkrete Zahlen zur Verfügbarkeit dieser Berufe nennen wir hier nicht; Angaben zum Arbeitsmarkt veröffentlichen das tschechische Ministerium für Arbeit und Soziales, das Arbeitsamt der Tschechischen Republik (Úřad práce ČR) und das Tschechische Statistische Amt.',
            'Reale Wege gibt es deshalb zwei, und meist werden sie kombiniert: die Beförderung von innen aus der operativen Schicht und die Ansprache von Menschen, die heute anderswo arbeiten. Bei der Beförderung von innen entscheidet, ob Sie der Person Zeit und Rückhalt für das geben können, was sie bisher nicht getan hat – Planung, Verhandlungen mit Frachtführern, Führung von Menschen. Die formale Ergänzung der Qualifikation ermöglicht das System der Berufsqualifikationen, dessen Standards das tschechische Qualifikationsverzeichnis (Národní soustava kvalifikací) führt.',
            'Entgeltspannen sollten Sie weder schätzen noch aus den Anzeigen anderer Unternehmen übernehmen. Öffentlich zugängliche Daten zu Verdiensten nach Berufen liefert das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV); diese Seite nennt keine Beträge.',
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
        'Drei Ebenen unter einer Bezeichnung, was Branchenkenntnis ist und was sich erlernen lässt, was sich in der Auswahl prüfen lässt und das Lieferantenrisiko als eigene Fähigkeit.',
      h1: 'Einkauf und Beschaffung: Stellen besetzen, in denen die Befugnis entscheidet',
      intro:
        'Der Einkauf gehört zu den Bereichen, in denen Stellenbezeichnung und tatsächliche Verantwortung am weitesten auseinandergehen. Unter „Einkäufer“ verbirgt sich sowohl die Person, die nach Plan bestellt und Termine verfolgt, als auch die Person, die Lieferanten auswählt und Rahmenbedingungen für Jahre verhandelt. Der Unterschied liegt nicht in der Erfahrung, sondern im Maß der Entscheidungsbefugnis – und genau die bestimmt, wen anzusprechen sinnvoll ist. Diese Seite hilft, die Stelle abzugrenzen, und weist darauf hin, was sich prüfen lässt und was an das konkrete Unternehmen gebunden bleibt.',
      breadcrumb: 'Einkauf und Beschaffung',
      sections: [
        {
          heading: 'Drei Ebenen unter einer Bezeichnung',
          body: [
            'Der operative Einkauf arbeitet innerhalb vorgegebener Regeln: bestellt nach dem Bedarf der Fertigung, verfolgt Bestätigungen und Termine, bearbeitet Eilfälle und Abweichungen. Er entscheidet über den Ablauf, nicht darüber, bei wem gekauft wird.',
            'Die Bestandsplanung steht zwischen Einkauf und Fertigung. Sie bestimmt, wovon wie viel und wann verfügbar sein soll, und trägt die Folgen beider Fehler – stehender Fertigung und unnötig gebundener Mittel.',
            'Der strategische Einkauf wählt Lieferanten aus, verhandelt Bedingungen und trägt die Verantwortung für das Lieferantenrisiko. Diese Rolle verlangt einen anderen Typ Mensch und wird üblicherweise auch anders vergütet.',
            'Übliche Löhne im Einkauf nennen wir nicht; konkrete Beträge finden Sie auf dieser Seite nicht. Eine Orientierung nach Beruf und Region bietet das tschechische Informationssystem über den durchschnittlichen Verdienst (ISPV), betrieben vom tschechischen Ministerium für Arbeit und Soziales (MPSV).',
          ],
        },
        {
          heading: 'Branchenkenntnis und was sich erlernen lässt',
          body: [
            'Branchenüblichkeit: Die Kenntnis einer bestimmten Warengruppe – Hüttenmaterial, Kunststoffe, elektronische Bauteile, Verpackungen – hat reales Gewicht. Wer jahrelang Gussteile eingekauft hat, weiß, wo Termin- und Qualitätsprobleme entstehen, und das holt man nicht schnell nach.',
            'Betriebsspezifisch: das konkrete Unternehmenssystem, die Freigaberegeln, die Geschichte der Lieferantenbeziehungen. Das lernt man im Betrieb und sollte es nicht zur Einstiegsvoraussetzung machen.',
            'Die praktische Folge für die Beschreibung: Warengruppenkenntnis zu verlangen ist sinnvoll, Systemkenntnis zu verlangen verengt den Kreis der Menschen meist unnötig.',
          ],
        },
        {
          heading: 'Wo der Einkauf auf Qualität und Logistik trifft',
          body: [
            'Der Einkauf funktioniert nicht getrennt. Bei Reklamationen gegenüber Lieferanten greift er in die Qualitätssicherung, bei Importen in Zoll und Transport, bei der Planung in die Fertigung.',
            'Für die Besetzung heißt das, zu klären, welcher Teil dieser Berührungsflächen in die Rolle fällt. Ein Unternehmen, in dem der Einkauf Reklamationen und Lieferantenbewertung selbst bearbeitet, sucht eine andere Person als eines, in dem die Qualitätssicherung diesen Aufgabenbereich führt.',
          ],
        },
        {
          heading: 'Was sich in der Auswahl tatsächlich prüfen lässt',
          body: [
            'Im Einkauf lassen sich gerade die Fähigkeiten schlecht prüfen, über die am meisten gesprochen wird. Verhandeln erkennt man nicht am Lebenslauf, und allgemeine Fragen dazu helfen nicht.',
            'Brauchbarer ist, eine konkrete Situation beschreiben zu lassen, in der ein Lieferant Termin oder Qualität nicht eingehalten hat – was die Person tat, wen sie einbezog und wie es ausging. Die Antwort zeigt, ob die Person in betrieblichen Zusammenhängen denkt oder nur Bestellungen verwaltet.',
          ],
          list: {
            intro: 'Neben dieser Schilderung lässt sich Weiteres redlich prüfen:',
            items: [
              'Erfahrung mit der betreffenden Warengruppe',
              'Der Umfang eigenständiger Entscheidungen in der vorherigen Rolle',
              'Erfahrung mit Lieferantenbewertung und Lieferantenaudits',
              'Sprachkenntnisse, sofern ausländische Lieferanten im Spiel sind',
            ],
          },
        },
        {
          heading: 'Lieferantenrisiko als eigene Fähigkeit',
          body: [
            'Der Einkauf wird am Preis gemessen, erkennen lässt er sich aber daran, wie er Ausfälle bewältigt. Der Umgang mit Lieferantenrisiko unterscheidet eine erfahrene Person von einer, die nur bestellen kann.',
            'Dazu gehören die Beobachtung der finanziellen Lage eines Lieferanten und die Fähigkeit, Warnzeichen in der Kommunikation oder in sich allmählich verschlechternden Terminen zu erkennen.',
            'Branchenüblichkeit: In Lieferketten mit nachgewiesener Qualität gehören Lieferantenbewertung und Lieferantenaudit häufig zur Rolle. Der Umfang unterscheidet sich nach Branche und nach den Anforderungen der Abnehmer; eine gesetzliche Pflicht des Einkaufs ist es nach tschechischem Recht nicht, bei vielen Kunden aber eine vertragliche Bedingung.',
          ],
          list: {
            intro: 'Im Gespräch lässt sich das an vier Punkten festmachen:',
            items: [
              'Der Überblick darüber, wo das Unternehmen von einem einzigen Lieferanten abhängt',
              'Eine vorbereitete Ersatzvariante bei kritischen Positionen',
              'Lieferantenbewertung und wie regelmäßig sie erfolgt',
              'Reaktion auf sich allmählich verschlechternde Termine, nicht erst auf den Ausfall',
            ],
          },
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
