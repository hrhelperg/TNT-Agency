import type { LocaleCorpus } from '../types'

/**
 * L1 Arbeitgeber-Cluster — Deutsch.
 *
 * Übersetzt aus dem tschechischen Konzept-Primary, das die faktische Obergrenze
 * bildet. Wo der tschechische Text eine Angabe verweigert — ein Besetzungsdatum,
 * eine durchschnittliche Besetzungsdauer, eine Gehaltsspanne, eine Datenbank-
 * größe, eine Rendite der Mitarbeiterbindung — verweigert der deutsche Text sie
 * ebenfalls.
 *
 * Zur Rechtsordnung: wo eine Aussage rechtlich wird, benennt der erste solche
 * Satz Tschechien ausdrücklich. Diese Seiten beschreiben tschechisches Recht,
 * und deutsche Begriffe wie Arbeitnehmerüberlassung tragen im deutschen
 * Sprachraum eine eigene, hier NICHT gemeinte Bedeutung.
 */
export const DE_EMPLOYER: LocaleCorpus = {
  'recruitment-overview': {
    de: {
      title: 'Personalgewinnung: praktischer Überblick für Arbeitgeber',
      description:
        'Personalgewinnung für operative und technische Stellen: Direktbesetzung, Arbeitnehmerüberlassung nach tschechischem Recht und Gewinnung aus dem Ausland — und wann welcher Weg passt.',
      h1: 'Personalgewinnung: praktischer Überblick für Arbeitgeber',
      intro:
        'Personalgewinnung ist keine einzelne Tätigkeit, sondern es sind mehrere Wege, die sich in Geschwindigkeit, Kosten und Verwaltungsaufwand unterscheiden. Die erste Entscheidung lautet, ob Sie selbst einstellen, mit einer Personalagentur arbeiten oder aus dem Ausland gewinnen — und jede Variante passt zu einer anderen Lage. Diese Seite stellt die Wege und die Kriterien für die Wahl dazwischen dar. Für konkrete Regeln und Sätze verweist sie auf offizielle Quellen, statt sie wiederzugeben. Sie ist ein Entscheidungsrahmen, keine Rechtsberatung.',
      breadcrumb: 'Personalgewinnung',
      sections: [
        {
          heading: 'Die Hauptwege',
          body: [
            'Direkte Personalgewinnung bedeutet, dass das Unternehmen selbst sucht, auswählt und anstellt. Bei der Arbeitnehmerüberlassung — in Tschechien als agenturní zaměstnávání nach dem tschechischen Beschäftigungsgesetz geregelt — geht ein Teil der Verwaltung und der Flexibilität an die Agentur über, die Mitarbeiterinnen und Mitarbeiter vorübergehend überlässt. Die Gewinnung aus dem Ausland erweitert den Kreis der Kandidatinnen und Kandidaten, bringt aber die Verwaltung rund um die Erlaubnisse mit sich.',
            'Welcher Weg passt, hängt davon ab, wie schnell die Stellen besetzt sein müssen, ob es sich um einen dauerhaften Bedarf oder eine Schwankung handelt und welche Kapazität Ihre Personalabteilung hat.',
          ],
        },
        {
          heading: 'Wonach Sie entscheiden',
          body: [
            'Brauchbare Kriterien sind Dringlichkeit, die Art des Bedarfs — dauerhaft oder vorübergehend —, die Verfügbarkeit geeigneter Menschen in Ihrer Region und Ihre interne Kapazität, ein Auswahlverfahren samt Verwaltung zu führen.',
            'Saisonale Spitzen und vorübergehende Ausfälle passen meist zur Überlassung, dauerhafte Schlüsselstellen zur direkten Besetzung.',
          ],
        },
        {
          heading: 'Welche Entscheidung daraus folgt',
          body: [
            'Nach diesen Kriterien sollten Sie sagen können, über welchen Weg — oder welche Kombination — die Stelle zu besetzen ist und wen Sie im Unternehmen einbinden müssen.',
            'Wenn Sie die Gewinnung aus dem Ausland erwägen, rechnen Sie mit der Verwaltung der Erlaubnisse, die auf den tschechischen Seiten zur Beschäftigung ausländischer Mitarbeitender beschrieben ist.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Beschreiben Sie die Positionen und den Standort — wir melden uns und besprechen, was die Besetzung erfordert.',
      },
    },
  },

  'recruitment-planning': {
    de: {
      title: 'Personalplanung: den Bedarf vorausdenken',
      description:
        'Personalplanung statt Reaktion: den Bedarf aus dem Geschäftsausblick ableiten, Saisonalität und Fluktuation einrechnen und den Ersatz für Ausscheidende planen.',
      h1: 'Personalplanung: den Bedarf vorausdenken',
      intro:
        'Reaktive Personalgewinnung — die Suche beginnt erst, wenn Menschen fehlen — ist meist langsamer und teurer als geplante. Planung verbindet den Geschäftsausblick mit dem Personalbedarf: wie viele Menschen, auf welchen Stellen, bis wann. Diese Seite beschreibt, wie Sie dabei vorgehen, wie Sie Saisonalität und Fluktuation berücksichtigen und warum sich sowohl eine Reserve als auch Zeit für Erlaubnisverfahren bei ausländischen Mitarbeitenden lohnt. Sie nennt keine Zahlen und keine Benchmarks; sie ist eine Methode, die jedes Unternehmen mit eigenen Daten füllt.',
      breadcrumb: 'Personalplanung',
      sections: [
        {
          heading: 'Vom Geschäftsausblick zum Personalbedarf',
          body: [
            'Die Planung beginnt beim erwarteten Arbeitsvolumen — Aufträgen, Produktion, Saison. Daraus ergibt sich, wie viele Menschen mit welcher Qualifikation wann gebraucht werden.',
            'Sinnvoll ist, den dauerhaften Bedarf von vorübergehenden Spitzen zu trennen, weil jeden ein anderer Weg der Personalgewinnung abdeckt.',
          ],
        },
        {
          heading: 'Saisonalität, Fluktuation und Vorlaufzeiten',
          body: [
            'In den Plan gehören saisonale Schwankungen, die erwartete Fluktuation und die Zeit, die die Besetzung selbst braucht. Bei der Gewinnung aus dem Ausland verlängert die Zeit für Aufenthalts- und Arbeitserlaubnisse den Plan zusätzlich.',
            'Diese Seite nennt keine Verfahrensfristen. Prüfen Sie sie bei den zuständigen Behörden und nehmen Sie das Ergebnis in Ihren Zeitplan auf.',
          ],
        },
        {
          heading: 'Besetzung nach dem Ausscheiden einer Person',
          body: [
            'Das Ausscheiden einer bestimmten Person ist der häufigste Grund, aus dem eine Stelle frei wird, und derjenige, auf den Pläne am wenigsten vorbereitet sind. Anders als beim Wachstum steht der Termin fest — und doch wird die Entscheidung, was genau zu besetzen ist, oft bis in die letzten Wochen aufgeschoben.',
            'Es lohnt sich, zuerst zwei Fragen zu trennen: dieselbe Stelle besetzen oder die Arbeit anders aufteilen. Ein Weggang ist der einzige Moment, in dem sich eine Rolle ohne weiteren Eingriff ins Team neu zuschneiden lässt; nach dem Eintritt einer Nachbesetzung bedeutet jede Änderung eine zweite Runde. Erst danach hat die Suche selbst Sinn.',
            'Der zweite Schritt ist die Übergabe. Überschneiden sich die Arbeitsverhältnisse wenigstens teilweise, gibt die ausscheidende Person ihr Wissen unmittelbar weiter; sonst muss es schriftlich festgehalten werden, bevor sie geht. Dieser Teil wird am häufigsten unterschätzt und zeigt sich erst mit Abstand.',
          ],
        },
        {
          heading: 'Welche Entscheidung daraus folgt',
          body: [
            'Ergebnis ist ein Plan, der sagt, wann die Suche für welche Stellen und über welchen Weg beginnt, damit Menschen rechtzeitig verfügbar sind. Das senkt das Risiko teurer Besetzungen in letzter Minute.',
            'An den Plan schließen die Wahl der Kanäle und die Organisation der Auswahl an; bei vorübergehenden Spitzen kommt die Überlassung in Betracht.',
          ],
        },
      ],
      cta: {
        label: 'Für Arbeitgeber',
        targetConceptId: 'for-employers',
        note: 'Die Arbeitgeber-Übersicht behandelt die Entscheidungen rund um einen Personalplan.',
      },
    },
  },

  'role-brief': {
    de: {
      title: 'Anforderungsprofil: was hineingehört, damit sich danach suchen lässt',
      description:
        'Wie ein Anforderungsprofil entsteht, nach dem sich wirklich suchen lässt: die Arbeit beschreiben statt der idealen Person, Notwendiges von Wünschenswertem trennen und wissen, woher jede Anforderung stammt.',
      h1: 'Anforderungsprofil: was hineingehört, damit sich danach suchen lässt',
      intro:
        'Lässt sich eine Stelle lange nicht besetzen, wird die Ursache meist auf dem Markt gesucht. In der Praxis liegt sie häufiger im Profil — darin, wie die Stelle beschrieben ist. Ein Profil, das zwanzig Anforderungen ohne Gewichtung aufzählt oder Eigenschaften statt Arbeit beschreibt, taugt weder zur Suche noch zum Vergleich von Bewerbungen, und die Auswahl folgt dann dem Eindruck. Diese Seite beschreibt, was ein Profil enthalten muss, damit sich danach suchen lässt, wie sich Notwendiges von Wünschenswertem trennen lässt und welche Fehler sich wiederholen.',
      breadcrumb: 'Anforderungsprofil',
      sections: [
        {
          heading: 'Beschreiben Sie die Arbeit, nicht die ideale Person',
          body: [
            'Der nützlichste Schritt ist, nicht mehr zu beschreiben, wie die Person sein soll, sondern was sie tun wird. „Selbstständig, sorgfältig und zuverlässig" grenzt niemanden ein — so ließen sich die meisten Bewerbenden beschreiben, und auswählen lässt sich danach nicht.',
            'Eine brauchbare Beschreibung beantwortet, was die Person in den ersten drei Monaten konkret tut, womit und mit wem sie arbeitet und woran erkennbar ist, dass sie die Arbeit bewältigt. Daraus lassen sich sowohl die Anzeige als auch die Fragen für das Gespräch ableiten.',
          ],
        },
        {
          heading: 'Trennen Sie Notwendiges von Wünschenswertem — und zwar ausdrücklich',
          body: [
            'Das ist die einzelne Änderung, die in der Regel am meisten hilft. Jede Anforderung gehört in eine von zwei Gruppen: das, ohne das jemand nicht anfangen kann, und das, was die Einarbeitung erleichtert, sich aber erlernen lässt.',
            'Die Trennung hat zwei Wirkungen. Sie erweitert den Kreis der Menschen, die anzusprechen sich lohnt, und sie beschleunigt Entscheidungen — wer alles Notwendige und einen Teil des Wünschenswerten mitbringt, gibt wenig zu beraten. Ohne die Trennung wirkt jede Anforderung wie eine Bedingung, und das Profil wird unerreichbar.',
          ],
        },
        {
          heading: 'Wissen Sie, woher jede Anforderung stammt',
          body: [
            'Bei qualifizierten Stellen lohnt es sich zu wissen, was hinter jeder Anforderung steht. In der Praxis werden vier verschiedene Dinge vermischt, und das Ergebnis ist ein unnötig verengtes Profil.',
            'Eine rechtliche Anforderung folgt aus Vorschriften und lässt sich nicht erlassen — etwa die fachliche Befähigung für Arbeiten an elektrischen Anlagen oder die arbeitsmedizinische Beurteilung entsprechend der Einstufung der Tätigkeit. Es handelt sich um Anforderungen des tschechischen Rechts.',
            'Eine geregelte Qualifikation ist ein bestimmter Nachweis, dessen Inhalt und Umfang die jeweilige Vorschrift oder Norm festlegt. Maßgeblich ist, wofür der Nachweis ausgestellt wurde, nicht die Bezeichnung des Berufs.',
            'Eine Branchenüblichkeit ist eine verbreitete Anforderung, die keine Vorschrift verlangt — etwa Erfahrung in einer bestimmten Branche.',
            'Eine betriebliche Anforderung ist ein konkretes System, eine Dokumentationssprache oder ein Schichtmodell. Sie ist legitim, aber es ist gut zu wissen, dass es sich um eine Entscheidung des Unternehmens handelt und nicht um eine Eigenschaft des Berufs.',
          ],
        },
        {
          heading: 'Was am häufigsten fehlt',
          body: [
            'Neben den Anforderungen gehören in das Profil die Angaben, die darüber entscheiden, ob eine geeignete Person das Angebot überhaupt erwägt: Schichtmodell, Standort und Erreichbarkeit des Arbeitsplatzes, Form und Dauer der Einarbeitung und wer die neue Person führt.',
            'Gerade bei qualifizierten Rollen ist oft entscheidend, was niemand aufschreibt — warum die Stelle frei ist. Eine neue Stelle aus Wachstum und ein Platz, der immer wieder frei wird, sind für Kandidatinnen und Kandidaten zwei verschiedene Angebote, und erfahrene Menschen fragen danach.',
          ],
        },
        {
          heading: 'Das Profil als Vergleichsmaßstab',
          body: [
            'Ein gutes Profil zahlt sich auch nach Beginn der Auswahl aus, weil daraus der Vergleichsmaßstab entsteht. Sind die notwendigen Anforderungen vorab benannt, lässt sich für jede Bewerbung belegen, worin sie entspricht und worin nicht.',
            'Andernfalls stützt sich der Vergleich auf die Reihenfolge der Gespräche und auf den Eindruck — weniger verlässlich und intern schwerer zu vertreten. Beim Umgang mit Bewerberdaten gelten die Regeln des Datenschutzes; erheben Sie nur, was mit der Beurteilung der Stelle zusammenhängt.',
          ],
        },
        {
          heading: 'Woran Sie erkennen, dass das Profil fertig ist',
          body: [
            'Eine praktische Probe: Geben Sie das Profil jemandem, der die Stelle nicht kennt, und lassen Sie beschreiben, wen er suchen würde. Beschreibt diese Person jemand anderen als den, den Sie meinen, ist das Profil noch nicht fertig.',
            'Die zweite Probe ist, daraus drei Fragen für das Vorstellungsgespräch abzuleiten. Geht das nicht, fehlt im Profil die Beschreibung der tatsächlichen Arbeit und es ist eine Aufzählung von Eigenschaften geblieben.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Wenn Sie eine konkrete Stelle haben, beschreiben Sie sie — wir gehen das Profil mit Ihnen durch.',
      },
    },
  },

  'direct-sourcing': {
    de: {
      title: 'Direktansprache: wie aktive Kandidatensuche funktioniert',
      description:
        'Direktansprache für Fachpositionen: der Unterschied zwischen aktiven und passiven Kandidaten, wie eine Ansprache abläuft, Diskretion und Umgang mit Daten — und was der Arbeitgeber beitragen muss.',
      h1: 'Direktansprache: wie aktive Kandidatensuche funktioniert',
      intro:
        'Arbeitgeber, bei denen eine Fachposition seit Monaten offen ist, schildern meist dieselbe Erfahrung: Die Anzeige läuft, Rückmeldungen kommen, aber nicht von Menschen mit der gesuchten Kompetenz. Der Grund ist einfach — wer diese Arbeit kann, übt sie höchstwahrscheinlich gerade aus und sucht nirgends. Die Direktansprache ist die Antwort darauf: Statt auf Reaktionen zu warten, wird ermittelt, in welchen Betrieben die Kompetenz entsteht, und geeignete Menschen werden gezielt angesprochen. Diese Seite beschreibt das Vorgehen Schritt für Schritt, was daran für beide Seiten unangenehm ist und was der Arbeitgeber beitragen muss, damit eine Ansprache Aussicht auf Erfolg hat.',
      breadcrumb: 'Direktansprache',
      sections: [
        {
          heading: 'Aktive und passive Kandidaten sind nicht dasselbe',
          body: [
            'Wer aktiv sucht, verfolgt Anzeigen, verschickt Unterlagen und reagiert schnell. Wer passiv ist, sucht nichts: Er kann seine heutige Arbeit, hat dort eingespielte Beziehungen und denkt nur dann über einen Wechsel nach, wenn ein konkreter Anlass auftaucht. Bei operativen Rollen sind aktiv Suchende eine so große Gruppe, dass Anzeigen funktionieren. Bei Fach- und technischen Rollen ist das Verhältnis umgekehrt.',
            'Daraus folgt die Grenze der Anzeige. Eine Anzeige ist ein passives Instrument und erreicht nur die Schnittmenge zweier Gruppen: Menschen mit der gesuchten Kompetenz und Menschen, die gerade schauen. Je seltener die Kompetenz, desto kleiner diese Schnittmenge. Funktioniert bei einer Fachposition die Anzeige nicht, liegt es meist weder am Text noch am gewählten Portal.',
          ],
        },
        {
          heading: 'Was Direktansprache in der Praxis bedeutet',
          body: [
            'Aktive Suche ist keine einzelne Tätigkeit, sondern eine Folge von Schritten, von denen jeder scheitern kann. Ein wesentlicher Teil der Arbeit liegt vor dem ersten Telefonat — darin zu wissen, in welchem Betriebstyp die gesuchte Kompetenz überhaupt entsteht.',
          ],
        },
        {
          heading: 'Warum das erste Nein normal ist',
          body: [
            'Eine Absage bei der ersten Ansprache ist eine gewöhnliche Reaktion und betrifft meist den Zeitpunkt, nicht die Rolle. Die Person hat Arbeit begonnen, gerade eine Erhöhung bekommen, wartet auf die Jahresauswertung oder hat eine Veränderung angestoßen, die sie abschließen will. Die Antwort sagt nicht, dass das Angebot schlecht ist, sondern dass jetzt nicht der richtige Zeitpunkt ist.',
            'Die praktische Folge ist unbequem: Wer auf eine einzige Runde und ein schnelles Ergebnis setzt, erreicht auf diesem Weg nichts. Sinnvoll ist, das Gespräch korrekt zu beenden, zu danken und die Tür offen zu lassen — auf einen Teil der Angesprochenen lässt sich später zurückkommen. Deshalb nennen wir für auf diesem Weg besetzte Stellen keinen konkreten Termin.',
          ],
        },
        {
          heading: 'Diskretion und Umgang mit Kandidatendaten',
          body: [
            'Die angesprochene Person hat eine Anstellung, die sie nicht verlieren möchte. Diskretion ist hier keine Höflichkeit, sondern Bedingung des gesamten Vorgehens. Ein Vertrauensbruch schadet nicht nur einer Person — in Fachberufen, in denen man einander über Betriebe hinweg kennt, spricht es sich schnell herum.',
            'Dieselbe Sorgfalt gilt für die Daten. Lebenslauf, Kontakt und Gesprächsnotizen sind vom ersten Moment an personenbezogene Daten, für die die Regeln des Datenschutzes gelten. Die Person soll wissen, wer sie angesprochen hat, wofür ihre Daten verwendet werden und wie lange sie aufbewahrt werden; die Weitergabe an einen bestimmten Arbeitgeber ist ein eigener Schritt, dem sie bewusst und vorab zustimmt.',
            'Eines gehört offen gesagt: Die Arbeitsvermittlung ist in Tschechien durch das tschechische Beschäftigungsgesetz geregelt und erlaubnispflichtig, und ein Entgelt für die Vermittlung darf von der Kandidatin oder dem Kandidaten nicht verlangt werden. Die Kosten trägt der Arbeitgeber, niemals die angesprochene Person.',
          ],
        },
        {
          heading: 'Was der Arbeitgeber beitragen muss',
          body: [
            'Direktansprache steht und fällt damit, was die ansprechende Seite in der Hand hat. Wer bereits Arbeit hat, braucht keine Liste von Anforderungen — sondern einen Grund, über einen Wechsel überhaupt nachzudenken, und ein Gegenüber, das schnell entscheiden kann.',
          ],
        },
        {
          heading: 'Was wir über unsere Reichweite nicht behaupten',
          body: [
            'Formulierungen über umfangreiche Datenbanken oder über sofort verfügbare Kandidatinnen und Kandidaten sind in diesem Markt verbreitet. Wir nennen keine solche Angabe zu unserer Reichweite oder zur Größe irgendeiner Datenbank, und wir werden es nicht tun. Sie ist nicht überprüfbar und sagt einem Arbeitgeber nichts: Entscheidend ist, wie viele Menschen mit der gesuchten Kompetenz in Ihrer Region erreichbar und zu einem Gespräch bereit sind, nicht die Größe irgendeiner Liste.',
            'Beschreiben können wir dagegen das Vorgehen: wie das Profil geschärft wird, wie der Kreis der Betriebe und Rollen abgegrenzt wird, wie angesprochen wird und was wir Ihnen laufend über den Stand mitteilen. Diese Seite betrifft Fach-, technische und erste Führungsrollen in Produktion, Lager und Logistik. Die Suche für die Unternehmensleitung und psychologische Testverfahren werden hier nicht beschrieben.',
          ],
        },
      ],
      cta: {
        label: 'Fachkräfterekrutierung',
        targetConceptId: 'specialist-recruitment',
        note: 'Worin sich die Besetzung qualifizierter Rollen von der operativen unterscheidet.',
      },
    },
  },

  'hard-to-fill-roles': {
    de: {
      title: 'Warum sich eine Fachposition nicht besetzen lässt: eine Diagnose in Schritten',
      description:
        'Diagnose für eine offen bleibende Fachposition: Widersprüche im Profil, geerbte Anforderungen, die eine echte Einschränkung, Verluste im eigenen Verfahren und der Vergleich, den Kandidaten anstellen.',
      h1: 'Warum sich eine Fachposition nicht besetzen lässt: eine Diagnose in Schritten',
      intro:
        'Eine Fachposition, die seit Monaten offen ist, hat meist nicht eine Ursache, sondern mehrere kleinere, die sich summieren. Solange ein Arbeitgeber sie nicht benennt, wiederholt er dieselbe Suche in der Erwartung eines anderen Ergebnisses — ein weiterer Anzeigenkanal, mehr Druck auf die Personalabteilung, weiteres Warten. Diese Seite bietet stattdessen eine Diagnosefolge: Fragen, die sich anhand eigener Unterlagen beantworten lassen und die zuerst nach dem Profil fragen, dann nach den eigenen Einschränkungen und erst zuletzt nach dem Markt. Gehaltssätze oder Spannen nennen wir hier nicht.',
      breadcrumb: 'Schwer besetzbare Stellen',
      sections: [
        {
          heading: 'Bevor Sie einen weiteren Kanal hinzunehmen: prüfen Sie das Profil',
          body: [
            'Die Diagnose lohnt sich in dieser Reihenfolge. Zuerst das Profil, weil ein Fehler darin jeden Kanal entwertet. Dann die eigenen Einschränkungen, die sich durch eine Anzeige nicht ändern lassen. Erst danach Verfahren und Angebot. Die umgekehrte Reihenfolge — erst Kanäle, dann Fragen — ist das übliche und zugleich das teurere Vorgehen.',
            'Legen Sie die Unterlagen bereit, ohne die eine Ursachendebatte reine Vermutung bleibt: den Anzeigentext, die interne Stellenbeschreibung, die Liste der Bewerbenden mit Vermerk, in welcher Phase und warum sie ausgeschieden sind, und die Daten der einzelnen Schritte. Die meisten Antworten stehen in diesen vier Unterlagen, nicht auf dem Arbeitsmarkt.',
          ],
        },
        {
          heading: 'Ist das Profil in sich widersprüchlich?',
          body: [
            'Der übliche Widerspruch besteht zwischen der geforderten Kompetenz und den gebotenen Bedingungen: Das Profil beschreibt eine erfahrene, selbstständige Person mit gültigen Nachweisen, die Bedingungen entsprechen einer Einstiegsrolle. Eine solche Anzeige zieht keine der beiden Gruppen an — Erfahrene überspringen sie, Einsteiger bewerben sich wegen der Anforderungen nicht. Die Stelle bleibt offen, ohne dass am Markt irgendetwas schiefliefe.',
            'Widersprüche gibt es auch im Profil selbst: enge Spezialisierung bei zugleich breitem Aufgabenzuschnitt, volle Schichtarbeit bei zugleich Lieferantengesprächen zu Bürozeiten, Verantwortung für ein Team ohne Entscheidungsbefugnis. Eine einfache Probe: Lesen Sie das Profil als jemand, der diese Arbeit heute tut, und fragen Sie, was ihn interessieren und was ihn abschrecken würde.',
            'Schätzen Sie keine Gehaltsspanne und übernehmen Sie keine aus fremden Anzeigen. Öffentlich verfügbare Daten zu Verdiensten nach Beruf, Qualifikation und Region veröffentlicht das tschechische Informationssystem über Durchschnittsverdienste. Diese Seite nennt keine Beträge.',
          ],
        },
        {
          heading: 'Ist es eine Anforderung oder eine geerbte Wunschliste?',
          body: [
            'Anforderungen in Anzeigen werden vererbt. Der Text entstand bei der letzten Besetzung, wurde um die Wünsche einer früheren Führungskraft ergänzt, und seitdem hat ihn niemand mit der tatsächlichen Arbeit verglichen.',
            'Eine Kontrollfrage, die den Unterschied zwischen Bedingung und Wunsch meist offenlegt: Würde die Person, die diese Arbeit heute bei Ihnen tut, die heutige Anzeige erfüllen? Wenn nicht, ist das Profil strenger als der tatsächliche Bedarf. Eine formale Ergänzung der Qualifikation ermöglicht zudem das tschechische System der Berufsqualifikationen, dessen Standards das nationale Qualifikationsverzeichnis führt; die üblichen Anforderungen eines Berufs beschreibt das nationale Berufsverzeichnis.',
          ],
        },
        {
          heading: 'Was ist die echte Einschränkung: Standort, Schicht oder Nachweis?',
          body: [
            'Bei Fachpositionen gibt es meist eine einzige Einschränkung, die sich nicht umgehen lässt, und es lohnt sich zu wissen, welche. Am häufigsten sind es Standort, Schichtmodell oder ein Nachweis — jedes hat eine andere Lösung, andere Kosten und eine andere Wirkung auf die Größe des Kandidatenkreises.',
            'Ist der Nachweis die Einschränkung, stellen Sie eine weitere Frage: Muss die Person ihn schon beim Eintritt haben, oder sind Sie bereit, den Erwerb zu finanzieren und darauf zu warten? Diese eine Antwort verändert den Kreis stärker als die meisten anderen Anpassungen des Profils.',
          ],
        },
        {
          heading: 'Verlieren Sie Kandidaten im eigenen Verfahren?',
          body: [
            'Ein Teil der unbesetzten Stellen hat nicht zu wenige Bewerbungen — er hat sie und verliert sie. Der Verlust hat meist die Form einer Verzögerung: Zwischen Gespräch und Rückmeldung vergehen Tage, die fachliche Beurteilung wird auf einen Termin gelegt, an dem die zuständige Person Zeit hat, und das Angebot kommt, wenn sich der Mensch bereits anders entschieden hat. Verzögerungen lassen sich messen, anders als der Eindruck, es gebe keine Kandidaten.',
            'Bei Fachrollen dauert die Entscheidung auch nach Annahme eines Angebots länger, weil das bestehende Arbeitsverhältnis zu beenden ist und die Kündigungsfrist einzuhalten ist, deren Mindestdauer und Lauf das tschechische Arbeitsgesetzbuch regelt. Wer diese Zeit nicht einplant, bewertet die Suche als gescheitert, bevor sie enden konnte.',
          ],
        },
        {
          heading: 'Womit Ihr Angebot verglichen wird',
          body: [
            'Arbeitgeber vergleichen ihr Angebot mit anderen Anzeigen. Eine Fachkraft vergleicht es mit der Arbeit, die sie hat und im Detail kennt: mit einer Führungskraft, die sie versteht, mit Technik, die sie eingerichtet hat, mit einem Anfahrtsweg, den sie erprobt hat, und mit der Sicherheit, dort bereits bestanden zu haben. Gegen diesen Vergleich genügt es nicht, nur ein wenig anders zu sein.',
            'Praktisch heißt das: benennen, was in Ihrem Angebot besser ist als das, was die Person heute hat, und nicht verdecken, was schlechter ist. Eine zutreffende, früh gegebene Information erspart beiden Seiten mehr als eine sorgfältig geschriebene Anzeige, auf die die Enttäuschung in der Probezeit folgt.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Bleibt die Stelle danach offen, beschreiben Sie sie uns — wir gehen das Profil mit Ihnen durch.',
      },
    },
  },

  'time-to-hire': {
    de: {
      title: 'Dauer einer Stellenbesetzung: was den Termin tatsächlich bestimmt',
      description:
        'Wir versprechen kein Besetzungsdatum. Woraus die Dauer besteht: Kündigungsfristen, Nachweise und Qualifikationen, die eigene Entscheidungsschleife, Umzug und staatliche Erlaubnisverfahren.',
      h1: 'Dauer einer Stellenbesetzung: was den Termin tatsächlich bestimmt',
      intro:
        'Auf die Frage „in welcher Zeit besetzen Sie die Stelle" nennen wir kein Datum. Der Eintrittstermin wird größtenteils weder von der Agentur noch vom Arbeitgeber bestimmt, sondern von Umständen auf Seiten der Kandidatin oder des Kandidaten, der Behörden und des Kalenders: der Kündigungsfrist in der bisherigen Arbeit, Gültigkeit und Umfang der fachlichen Nachweise, einem freien Termin für die arbeitsmedizinische Untersuchung, bei Menschen aus Drittstaaten dem staatlich geführten Erlaubnisverfahren und der Saison, in die die Suche fällt. Statt eines Versprechens beschreibt diese Seite, woraus die Besetzungsdauer tatsächlich besteht — damit Sie einen realistischen Zeitplan aufstellen und erkennen können, welche Teile Sie selbst beeinflussen.',
      breadcrumb: 'Dauer einer Besetzung',
      sections: [
        {
          heading: 'Warum Sie hier keinen zugesagten Termin finden',
          body: [
            'Eine zugesagte Zahl von Tagen klingt im Angebot gut, ist aber ein Versprechen für Personen, die der Versprechende nicht in der Hand hat — die Kandidatin oder den Kandidaten, deren bisherigen Arbeitgeber, die Prüfstelle, den arbeitsmedizinischen Dienst und eine Behörde. Deshalb sagen wir keinen Eintrittstermin zu und arbeiten auch nicht mit einer durchschnittlichen Besetzungsdauer: Bei Fach- und technischen Stellen unterscheiden sich die einzelnen Aufträge so stark, dass ein Durchschnitt eher verwirrt als orientiert.',
            'Beschreiben lässt sich dagegen der Verlauf. Nach Schärfung des Profils wissen Sie, welche Schritte anstehen, wer an der Reihe ist und wo die Suche gerade steht. Die Einschätzung des Termins wird schrittweise genauer — zuerst danach, wer von den Angesprochenen überhaupt verfügbar ist, und erst nach Annahme eines Angebots nach der Kündigungsfrist der konkreten Person und dem Stand ihrer Nachweise.',
          ],
        },
        {
          heading: 'Die Kündigungsfrist können Sie nicht verkürzen',
          body: [
            'Bei Fachpositionen sprechen Sie überwiegend Menschen an, die arbeiten. Nimmt eine solche Person das Angebot an, muss sie ihr bisheriges Arbeitsverhältnis nach den Regeln des tschechischen Arbeitsgesetzbuchs beenden, das sowohl die Mindestdauer der Kündigungsfrist als auch den Zeitpunkt ihres Beginns festlegt. Beides wurde im Lauf der Zeit geändert; gehen Sie deshalb von der geltenden Fassung aus, nicht von früherer Praxis.',
            'Praktisch bedeutet das: Den Abstand zwischen Annahme des Angebots und dem ersten Tag in Ihrer Schicht bestimmen das tschechische Gesetz und die Absprache der Person mit ihrem bisherigen Arbeitgeber, nicht Ihr Bedarf. Verkürzen kann ihn weder eine Agentur noch Sie. Ein früherer Wechsel ist nur im Einvernehmen möglich — und bei schwer ersetzbaren Stellen hat die Gegenseite dazu meist keinen Anlass. Kürzere Vorlaufzeiten haben Menschen in der Probezeit, nach Projektende oder zwischen zwei Anstellungen; auf deren Verfügbarkeit lässt sich ein Zeitplan nicht bauen.',
          ],
        },
        {
          heading: 'Qualifikationen und Nachweise, die passen müssen',
          body: [
            'Die zweite typische Verzögerung ist die Qualifikation. Bei Fachpositionen entscheidet nicht allein die Erfahrung, sondern ein bestimmter Nachweis und dessen Umfang: beim Schweißen der im Zeugnis nach ČSN EN ISO 9606-1 genannte Prüfbereich, bei Arbeiten an elektrischen Anlagen die fachliche Befähigung nach der tschechischen Regierungsverordnung Nr. 194/2022 Sb. und bei vorbehaltenen technischen Anlagen die Befähigung beziehungsweise das Zeugnis nach dem tschechischen Gesetz Nr. 250/2021 Sb. Ein Nachweis, der auf dem Papier existiert, muss die Arbeit noch nicht abdecken, die die Stelle tatsächlich umfasst.',
            'Diese Nachweise haben zudem eine begrenzte Gültigkeit, und ihre Erneuerung hängt von der Kapazität einer Prüf- oder Schulungsstelle ab, nicht von einem Dienstleister. Bei im Ausland erworbener Qualifikation kommt ein Anerkennungsverfahren nach dem tschechischen Gesetz Nr. 18/2004 Sb. hinzu, bei ausländischer Schulbildung ein Verfahren in der Zuständigkeit des tschechischen Bildungsministeriums. Konkrete Fristen oder Intervalle nennen wir hier nicht — sie ergeben sich aus der jeweiligen Vorschrift und aus den Bedingungen des konkreten Nachweises.',
          ],
        },
        {
          heading: 'Die Entscheidungsschleife beim Arbeitgeber',
          body: [
            'Ein Teil der Besetzungsdauer entsteht in Ihrem eigenen Unternehmen — und das ist in der Regel der Teil, an dem sich am leichtesten etwas ändern lässt. Dazu gehören die Zeit zwischen Übersendung eines Profils und der Rückmeldung, die Zahl der Gesprächsrunden, die Verfügbarkeit der entscheidenden Person und die Geschwindigkeit, mit der nach einem Gespräch ein konkretes Angebot folgt. Bei jemandem, der Arbeit hat und weitere Gespräche führt, senkt jede Verzögerung ohne Nachricht die Wahrscheinlichkeit, dass Ihr Angebot noch erwogen wird.',
            'Auch ein instabiles Profil verzögert. Ändern sich im Verlauf der geforderte Umfang einer Befähigung, das Schichtmodell oder der Arbeitsort, beginnt die Auswahl faktisch von vorn, und die bereits angesprochenen Menschen stehen nicht mehr zur Verfügung. Es lohnt sich, strittige Punkte zu klären, bevor die erste Person angesprochen wird.',
          ],
        },
        {
          heading: 'Umzug, Pendeln und Unterkunft',
          body: [
            'Lässt sich eine Stelle nicht aus dem Einzugsgebiet besetzen, kommt die Logistik eines Lebens in den Zeitplan. Eine Mietkündigung, die Schule der Kinder, die Arbeit der Partnerin oder des Partners oder der Verkauf eines Autos sind häufige Gründe, aus denen sich ein Eintritt verschiebt, nachdem alles andere geklärt ist. Bei Pendelnden spielt eine Rolle, ob die Schichten an Verbindungen anschließen, und bei einer Unterkunft, ob zum gewünschten Datum Kapazität frei ist.',
            'Unterkunft und Sammeltransport klärt man deshalb besser, bevor Menschen außerhalb der Region angesprochen werden, und nicht erst, wenn jemand ein Angebot abwägt. Bedingungen, Preis und Leistungsumfang gehören von Anfang an in das Angebot — nachträgliche Verhandlungen über das Wohnen können den Eintritt deutlich verschieben.',
          ],
        },
        {
          heading: 'Erlaubnisse bei ausländischen Mitarbeitenden und die Saison',
          body: [
            'Bei Menschen aus Drittstaaten tritt ein staatlich geführtes Verwaltungsverfahren in den Zeitplan. Die Dauer der Verfahren über Aufenthalts- und Arbeitserlaubnis bestimmen weder Agentur noch Arbeitgeber; Ablauf und Fristen legen Vorschriften fest, und der Verlauf hängt von der zuständigen Behörde und bei einem Teil der Anträge von einer Auslandsvertretung ab. Aktuelle Informationen veröffentlichen das tschechische Innenministerium, das Arbeitsamt der Tschechischen Republik und das tschechische Außenministerium. Konkrete Fristen nennt diese Seite nicht.',
            'Auch der Kalender wirkt. Betriebsferien, Sommerferien und Jahresende verlangsamen Gespräche, Untersuchungen und Prüfungstermine, während saisonale Spitzen in Produktion und Logistik den Wettbewerb um dieselben Menschen erhöhen. Eine Suche, die startet, wenn die entscheidenden Personen nicht verfügbar sind, dauert auch ohne jede Komplikation länger.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Beschreiben Sie die Stelle — wir besprechen, was die Besetzung erfordert und was den Termin bestimmt.',
      },
    },
  },

  onboarding: {
    de: {
      title: 'Onboarding: die ersten Wochen richtig gestalten',
      description:
        'Was Onboarding umfasst, warum die ersten Wochen darüber entscheiden, ob jemand bleibt, und wie sich der administrative und der praktische Teil so organisieren lassen, dass keiner fehlt.',
      h1: 'Onboarding: die ersten Wochen richtig gestalten',
      intro:
        'Onboarding ist der Prozess, eine neue Mitarbeiterin oder einen neuen Mitarbeiter ins Unternehmen zu führen — von den Formalitäten beim Eintritt über die Einführung in die Arbeit bis zu den ersten Wochen, in denen sich entscheidet, ob die Person bleibt. Ein gelungener Eintritt verkürzt die Zeit bis zur vollen Leistungsfähigkeit und senkt das Risiko eines frühen Abgangs. Diese Seite beschreibt, was Onboarding üblicherweise umfasst und wie es sich organisieren lässt, mit Blick auf die praktische Seite ebenso wie auf die Pflichten beim Eintritt. Sie ist keine Rechtsberatung; für konkrete Pflichten wie die Arbeitsschutzunterweisung verweist sie auf die Vorschriften und offiziellen Quellen.',
      breadcrumb: 'Onboarding',
      sections: [
        {
          heading: 'Was Onboarding umfasst',
          body: [
            'Onboarding verbindet einen administrativen Teil — Vertrag, Anmeldung zur Versicherung, Arbeitsschutzunterweisung — mit einem praktischen: Einführung in Arbeitsplatz, Werkzeuge, Team und Erwartungen. Beides bereitet man besser vorab vor, damit der erste Tag reibungslos verläuft.',
          ],
        },
        {
          heading: 'Warum Onboarding zählt',
          body: [
            'Die ersten Tage und Wochen beeinflussen stark, ob eine neue Person bleibt. Ein misslungener Eintritt — Durcheinander, fehlende Informationen, unklare Erwartungen — gehört zu den häufigen Ursachen früher Abgänge. Ein vorbereitetes Onboarding verkürzt umgekehrt die Einarbeitung.',
          ],
        },
        {
          heading: 'Welche Entscheidung daraus folgt',
          body: [
            'Nach dieser Überlegung sollten Sie eine Schrittfolge für den Eintritt bereit haben und klar wissen, wer wofür verantwortlich ist, damit kein Teil — weder Verwaltung noch Einarbeitung — fehlt. Das senkt das Risiko eines frühen Abgangs und verkürzt die Zeit bis zur Produktivität.',
            'Für die praktische Führung des ersten Tages dient eine Checkliste; an das Onboarding schließt eine längere Einarbeitung an.',
          ],
        },
      ],
      cta: {
        label: 'Mitarbeiterbindung',
        targetConceptId: 'employee-retention',
        note: 'Beim Onboarding beginnt die Bindung, statt später repariert zu werden.',
      },
    },
  },

  'employee-retention': {
    de: {
      title: 'Mitarbeiterbindung: Menschen halten, nicht nur Fluktuation senken',
      description:
        'Was Mitarbeiterbindung umfasst, worin sie sich vom reaktiven Senken der Fluktuation unterscheidet und wo die wesentlichen Hebel liegen — ohne erfundene Renditezahlen.',
      h1: 'Mitarbeiterbindung: Menschen halten, nicht nur Fluktuation senken',
      intro:
        'Mitarbeiterbindung bedeutet, Beschäftigte systematisch zu halten — nicht nur Abgänge zu verhindern, sondern aktiv Gründe zu schaffen, aus denen Menschen bleiben und gut arbeiten. Gegenüber dem bloßen Löschen von Fluktuation ist Bindung längerfristig angelegt und verbindet Personalgewinnung, Onboarding, Entwicklung und Kultur. Diese Seite erklärt, was dazugehört, worin sie sich vom Reagieren auf Fluktuation unterscheidet und wo die wesentlichen Hebel liegen. Sie arbeitet mit keinen erfundenen Renditezahlen; sie bietet einen Rahmen, Bindung als laufende Aufgabe zu behandeln, was sich besonders bei Mangelberufen auszahlt.',
      breadcrumb: 'Mitarbeiterbindung',
      sections: [
        {
          heading: 'Bindung gegenüber dem Senken der Fluktuation',
          body: [
            'Das Senken der Fluktuation ist oft eine Reaktion auf gestiegene Abgänge. Bindung ist vorausschauend — sie rechnet vom Recruiting und vom Onboarding an mit dem Halten und widmet sich auch zufriedenen Beschäftigten, damit Gründe zu gehen gar nicht erst entstehen. Beides ergänzt einander.',
          ],
        },
        {
          heading: 'Die wesentlichen Hebel',
          body: [
            'Zu den Hebeln gehören ein guter Eintritt und eine gute Einarbeitung, verständliche und faire Bedingungen, Führung und Rückmeldung, Entwicklungsmöglichkeiten und Anerkennung. In gewerblichen Betrieben und im Schichtbetrieb wirken zusätzlich die Stabilität der Dienstpläne und das praktische Umfeld.',
            'Die Wirkung einzelner Maßnahmen prüft man besser an eigenen Daten, statt fremde Zahlen zu übernehmen.',
          ],
        },
        {
          heading: 'Welche Entscheidung daraus folgt',
          body: [
            'Nach dieser Überlegung sollten Sie bestimmen können, in welche Phasen des Beschäftigungsverlaufs Sie investieren — Gewinnung, Onboarding, Entwicklung — und wie Sie das Halten verfolgen. Bindung wird damit Teil der normalen Führung statt einer Krisenmaßnahme.',
            'Sie hängt eng mit Fluktuation und Onboarding zusammen, denen eigene Seiten gewidmet sind.',
          ],
        },
      ],
      cta: {
        label: 'Mitarbeiterfluktuation',
        targetConceptId: 'employee-turnover',
        note: 'Was Fluktuation ist und wie Sie sie im eigenen Unternehmen messen.',
      },
    },
  },
}
