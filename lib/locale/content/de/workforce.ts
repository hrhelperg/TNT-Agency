import type { LocaleCorpus } from '../types'

/**
 * L1 Workforce-Cluster – Deutsch.
 *
 * Das rechtlich dichteste Cluster in L1, und deshalb dasjenige, in dem die
 * Rechtsordnung am deutlichsten benannt werden muss. Jede Vorschrift stammt aus
 * der tschechischen Quelle und ist als tschechisches Recht gekennzeichnet;
 * keine wurde hinzugefügt und keine zu „europäisch“ oder „üblich“
 * verallgemeinert.
 *
 * Arbeitnehmerüberlassung ist im deutschen Sprachraum der Begriff des AÜG.
 * Diese Seiten beschreiben die tschechische Ausgestaltung; der Slug der
 * betreffenden Seite trägt „tschechien“, und der erste rechtlich bedeutsame
 * Satz jeder Seite benennt Tschechien ausdrücklich.
 *
 * Mehrere Quellen verweigern ausdrücklich Angaben – einen Preis, einen Termin,
 * eine Datenbankgröße, das Versprechen, dass jemand bleibt, und auf der Seite
 * zur Agenturauswahl den eigenen geprüften Status. Diese Verweigerungen sind
 * unverändert übernommen.
 *
 * Die Aufzählungen der Quelle stehen wieder als Listen auf der Seite; sie
 * enthalten nichts, was die tschechische Quelle nicht sagt.
 */
export const DE_WORKFORCE: LocaleCorpus = {
  'volume-hiring': {
    de: {
      title: 'Massenrekrutierung: was sich bei 20, 50 und 100 Personen ändert',
      description:
        'Was mit dem Volumen kippt: erst die Kapazität für Gespräche, dann die für die Einarbeitung, zuletzt das Umfeld. Eine Planungshilfe ohne Zahlen und ohne zugesagte Fristen.',
      h1: 'Massenrekrutierung: was sich bei 20, 50 und 100 Personen ändert',
      intro:
        'Zwanzig Menschen einzustellen und hundert einzustellen ist nicht dieselbe Aufgabe in anderem Maßstab. Mit wachsendem Volumen kippt etwas anderes als die Zahl der Angesprochenen: zuerst die Kapazität für Gespräche, dann die für die Einarbeitung und schließlich das betriebliche Umfeld, das die neuen Menschen überhaupt tragen muss. Der folgende Text ist eine Planungshilfe – er beschreibt, was sich bei den einzelnen Größen ändert und was vor der ersten Ansprache stehen muss. Die genannten Zahlen sind Modellsituationen für die Planung und keine Beschreibung durchgeführter Aufträge; konkrete Zahlen und Fristen nennen wir hier nicht.',
      breadcrumb: 'Massenrekrutierung',
      sections: [
        {
          heading: 'Was sich mit dem Volumen tatsächlich ändert',
          body: [
            'Bis etwa zwanzig Personen bleibt die Besetzung eine Sache des laufenden Betriebs. Die Gespräche führt die vorhandene Führungskraft, eingearbeitet wird an der Linie, und die neuen Menschen verteilen sich unter erfahrene Kolleginnen und Kollegen.',
            'Bei fünfzig zeigt sich erstmals eine Kapazitätsgrenze: Jemand muss die Gespräche in Vollzeit führen, und die Einarbeitung lässt sich nicht mehr dem laufenden Betrieb überlassen. Zugleich ändert sich das Verhältnis von erfahrenen zu neuen Menschen in der Schicht, was Leistung und Qualität beeinflusst.',
            'Bei hundert ist nicht mehr die Suche die Grenze, sondern das Umfeld – Umkleiden, Verpflegung, Transport, Unterkunft, die Zahl der Eintrittsuntersuchungen, die Kapazität der Einarbeitenden. Diese Dinge haben eigene Vorlaufzeiten, die sich nicht dadurch verkürzen, dass man mehr Kapazität in die Personalgewinnung steckt.',
          ],
        },
        {
          heading: 'Kapazitäten, die vor den Menschen stehen müssen',
          body: [
            'Der häufigste Fehler bei der Massenrekrutierung ist, Menschen anzusprechen, bevor geklärt ist, was nach ihrem Eintritt mit ihnen geschieht. Wer erscheint und feststellt, dass niemand Zeit hat, geht wieder und kommt in der Regel nicht zurück.',
            'Es lohnt sich deshalb, vor dem Beginn die Kapazitätsliste durchzugehen – bis hin zu der Frage, wie schnell Zutrittskarten ausgestellt werden können.',
          ],
          list: {
            intro: 'Auf diese Liste gehören vor allem:',
            items: [
              'Kapazität für Gespräche, umgerechnet auf den Tag',
              'Kapazität der Einarbeitenden und die Größe der Gruppen',
              'Vorlaufzeiten für Termine beim arbeitsmedizinischen Dienst',
              'Ausstattung mit persönlicher Schutzausrüstung und ihre Verfügbarkeit in den benötigten Größen',
              'Umkleiden, Verpflegung und Transport zur Schicht',
            ],
          },
        },
        {
          heading: 'Die Eignungsuntersuchung ist ein echter Engpass',
          body: [
            'Die Beurteilung der gesundheitlichen Eignung gehört nach tschechischem Recht zu den Arbeitgeberpflichten, und ihr Umfang richtet sich nach der Kategorie der Tätigkeit. Den Rahmen setzen das tschechische Gesetz Nr. 373/2011 Sb. über spezifische Gesundheitsleistungen und die Durchführungsverordnung Nr. 79/2013 Sb.',
            'Betrieblich wird aus einer Formalie damit ein Engpass. Die Kapazität des arbeitsmedizinischen Dienstes ist endlich und wächst nicht, weil die Suche schneller läuft. Vereinbaren Sie sie, bevor die Ansprache beginnt, und behandeln Sie sie im Zeitplan als Fixpunkt.',
          ],
        },
        {
          heading: 'Eintritte in Wellen statt an einem Datum',
          body: [
            'Der Versuch, alle am selben Tag beginnen zu lassen, verursacht die meisten Schwierigkeiten. Die Einarbeitung verdünnt sich, erfahrene Menschen kommen nicht nach, und die Qualität der ersten Serie sinkt.',
            'Eintritte in Wellen, bemessen an der Einarbeitungskapazität, sind für einen Betrieb meist erträglicher, auch wenn es insgesamt länger dauert. Wellen erlauben zudem, aus der ersten Gruppe zu lernen, bevor die zweite kommt – ein Vorteil, der sich später nicht zurückkaufen lässt.',
          ],
        },
        {
          heading: 'Rechnen Sie mit Reserve und damit, dass ein Teil geht',
          body: [
            'Bei Masseneintritten ist es normal, dass ein Teil der Angenommenen nicht antritt oder in den ersten Wochen geht. Das ist kein Versagen der Suche, sondern eine Eigenschaft des Volumens.',
            'Ein Plan wird deshalb besser mit Reserve und mit einem vorab überlegten Vorgehen zum Nachbesetzen gebaut, nicht als einmalige Aktion mit fester Zahl. Wie groß die Reserve sein sollte, hängt von Beruf, Standort und Bedingungen ab. Eine allgemeine Zahl, die für jeden Betrieb gälte, gibt es nicht, und wir nennen keine.',
          ],
        },
        {
          heading: 'Welche Wege sich beim Volumen kombinieren',
          body: [
            'Bei größeren Zahlen werden die Wege in der Praxis kombiniert. Den festen Kern besetzt man üblicherweise über die Direktvermittlung, weil sich die Investition in die Einarbeitung lohnt. Eine Schwankung oder einen Anlauf deckt die Arbeitnehmerüberlassung ab, bei der die Agentur die Arbeitgeberverwaltung trägt.',
            'Bei Mangelberufen kommt die Gewinnung aus dem Ausland in Betracht. Sie hat jedoch ihre eigene Zeitlogik, die von den nach tschechischem Recht erforderlichen Erlaubnissen bestimmt wird und sich nicht verkürzen lässt.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Beschreiben Sie Positionen, Standort und Schichtmodell – wir besprechen, was die Besetzung erfordert.',
      },
    },
  },

  'production-ramp-up': {
    de: {
      title: 'Personal für den Produktionsanlauf: neue Linie oder neue Schicht besetzen',
      description:
        'Eine neue Linie oder Schicht besetzen: in welcher Reihenfolge, was vor dem ersten Tag fertig sein muss und woran Anläufe hängen – an der Einarbeitung, nicht an der Suche.',
      h1: 'Personal für den Produktionsanlauf: neue Linie oder neue Schicht besetzen',
      intro:
        'Der Anlauf einer neuen Linie oder die Eröffnung einer weiteren Schicht unterscheidet sich vom gewöhnlichen Auffüllen in einem Punkt: Es gibt ein festes Datum, das sich aus einem Kunden oder einer Investition ergibt, und dieses Datum lässt sich in der Regel nicht verschieben. Die personelle Vorbereitung muss deshalb rückwärts von diesem Punkt laufen und nicht vorwärts von dem Moment, in dem jemand bemerkt, dass Menschen fehlen. Diese Seite beschreibt, in welcher Reihenfolge beim Anlauf besetzt wird, was vor dem Start fertig sein muss und wo Anläufe am häufigsten hängen bleiben – die schwache Stelle ist die Einarbeitung, nicht die Suche. Wie viele Wochen Vorlauf nötig sind, nennen wir hier nicht, weil es von den Berufen und vom Standort abhängt.',
      breadcrumb: 'Produktionsanlauf',
      sections: [
        {
          heading: 'Ein Anlauf wird rückwärts geplant',
          body: [
            'Beginnen Sie beim Starttermin und gehen Sie zurück: Wer muss am Tag null da sein, wer einen Monat vorher, wer noch früher. So betrachtet zeigt sich, dass zuerst nicht die Bedienpositionen zu besetzen sind, sondern die Menschen, die die anderen einarbeiten.',
            'Meister oder Schichtleitung, Einrichter und Instandhaltung müssen früher da sein, weil sie sich selbst mit der Technik vertraut machen müssen. Treten sie gleichzeitig mit den Bedienenden ein, führt sie niemand, und der Anlauf verzögert sich unabhängig davon, wie viele Bedienende gefunden wurden.',
          ],
          list: {
            intro: 'Die Reihenfolge, in der besetzt wird:',
            ordered: true,
            items: [
              'Zuerst die Betriebsführung und die zentralen technischen Rollen',
              'Danach Einrichter und Instandhaltung, die die Anlage einfahren',
              'Zuletzt die Bedienpositionen, in Wellen nach der Einarbeitungskapazität',
            ],
          },
        },
        {
          heading: 'Was vor dem ersten Tag fertig sein muss',
          body: [
            'Vieles, was im eingespielten Betrieb nebenbei geschieht, fehlt beim Anlauf und muss erst entstehen: Arbeitsanweisungen, ein Einarbeitungsplan, die Gefährdungsbeurteilung der neuen Arbeitsplätze, der Umfang der persönlichen Schutzausrüstung und die Einstufung der Tätigkeiten, von der der Umfang der arbeitsmedizinischen Untersuchungen abhängt.',
            'Die Arbeitsschutzpflichten nach tschechischem Recht knüpfen an den Arbeitsplatz und an den Arbeitgeber an, nicht daran, ob der Betrieb neu ist. Bei einem neuen Arbeitsplatz müssen sie deshalb vorbereitet sein, bevor dort jemand anfängt.',
          ],
        },
        {
          heading: 'Eine neue Schicht folgt anderen Regeln als eine neue Linie',
          body: [
            'Eine weitere Schicht auf einer bestehenden Linie zu öffnen wirkt einfacher, hat aber eigene Tücken. Die neuen Menschen muss das bestehende Team einarbeiten, das dabei weiter produzieren soll – die Einarbeitungskapazität wird also der laufenden Leistung entnommen.',
            'Zugleich ändert sich die Verfügbarkeit. Eine Nacht- oder Wochenendschicht verengt den Kreis derer, die bereit sind anzufangen, was in Zeitplan und Bedingungen gehört. Der Unterschied zwischen Schichtmodellen wirkt auf Kandidatinnen und Kandidaten früher als ein Unterschied beim Entgelt.',
          ],
        },
        {
          heading: 'Woran Anläufe am häufigsten hängen',
          body: [
            'In der Praxis verzögern sich Anläufe an wenigen wiederkehrenden Stellen. Die Einarbeitung wird meist optimistisch geplant, ohne die Rechnung, dass die erfahrene Person, die einarbeitet, währenddessen nicht produziert. Und das Umfeld – Transport zu einer untypischen Schicht, die Kapazität der Umkleiden – wird erst dann behandelt, wenn die Menschen bereits eintreten.',
          ],
          list: {
            intro: 'Die Stellen, an denen es am häufigsten hängt:',
            items: [
              'Eine Einarbeitung, die ohne den Leistungsausfall der Einarbeitenden geplant ist',
              'Der Widerspruch zwischen dem Besetzungstermin und den Kündigungsfristen der Kandidatinnen und Kandidaten',
              'Transport und Umfeld bei untypischen Schichten',
              'Fehlende Arbeitsanweisungen und Dokumentation für den neuen Arbeitsplatz',
            ],
          },
        },
        {
          heading: 'Wie sich die Wege kombinieren lassen',
          body: [
            'Beim Anlauf bewährt es sich, den festen Kern vom flexiblen Teil zu trennen. Der Kern – Führung, Einrichter, Instandhaltung – wird sinnvoll über die Direktvermittlung besetzt, weil in diese Menschen die meiste Einarbeitung fließt.',
            'Der Bedienteil lässt sich mit einer Kombination aus Direktvermittlung und Arbeitnehmerüberlassung abdecken, die es erlaubt, darauf zu reagieren, dass sich der tatsächliche Bedarf während des Anlaufs meist noch schärft. Diese Aufteilung entscheidet man besser vorab als unterwegs.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Nennen Sie den Starttermin und die Positionen – wir rechnen mit Ihnen rückwärts.',
      },
    },
  },

  'seasonal-capacity': {
    de: {
      title: 'Saisonale Kapazität: die Spitze abdecken ohne dauerhaften Stellenaufbau',
      description:
        'Eine wiederkehrende Spitze planen: worin sich saisonaler Bedarf vom Personalmangel unterscheidet, welche Modelle passen und wie sich bewährte Saisonkräfte halten lassen.',
      h1: 'Saisonale Kapazität: die Spitze abdecken ohne dauerhaften Stellenaufbau',
      intro:
        'Eine saisonale Spitze hat gegenüber anderen Personalsituationen einen Vorteil: Sie lässt sich vorhersehen. Das Vorweihnachtsgeschäft im Lager, die landwirtschaftliche Saison oder Sommerabstellungen wiederholen sich, und ein Unternehmen weiß in der Regel, wann sie kommen. Dennoch wird die Saisonbesetzung oft erst angegangen, wenn die Spitze beginnt – der teuerste denkbare Zeitpunkt. Diese Seite beschreibt, wie sich saisonaler Bedarf vom Auffüllen des Stammpersonals unterscheidet, welche Beschäftigungsmodelle dafür infrage kommen und wie sich bewährte Menschen für die nächste Saison halten lassen. Wie viel Vorlauf nötig ist, nennen wir hier nicht, weil es vom Beruf und von der Region abhängt.',
      breadcrumb: 'Saisonale Kapazität',
      sections: [
        {
          heading: 'Saisonaler Bedarf ist nicht dasselbe wie Personalmangel',
          body: [
            'Der Unterschied entscheidet über die Lösung. Personalmangel heißt, dass für dauerhaft besetzte Stellen Menschen fehlen. Saisonaler Bedarf heißt, dass Stellen für eine begrenzte Zeit entstehen und danach wieder wegfallen.',
            'Daraus folgt, dass die Lösung nicht darin besteht, die Stammbelegschaft dauerhaft zu vergrößern. Ein Unternehmen, das für die Spitze dauerhaft einstellt, hat danach ein Überbesetzungsproblem – und das ist schlimmer als das ursprüngliche.',
          ],
        },
        {
          heading: 'Modelle, die infrage kommen',
          body: [
            'In der Praxis werden mehrere Wege genutzt; sie unterscheiden sich darin, wer die Arbeitgeberverantwortung trägt und wie flexibel sich die Kapazität ändern lässt.',
            'Die Arbeitnehmerüberlassung in Form der vorübergehenden Zuweisung nach dem tschechischen Gesetz Nr. 435/2004 Sb. ist für regelmäßig wiederkehrende Schwankungen am üblichsten, weil die Agentur formaler Arbeitgeber bleibt und der Umfang dem tatsächlichen Bedarf angepasst werden kann. Eigene befristet Beschäftigte passen zu längeren und gut vorhersehbaren Saisons. Vereinbarungen außerhalb eines Arbeitsverhältnisses unterliegen nach tschechischem Recht eigenen Grenzen und eignen sich nicht zur vollwertigen Abdeckung von Schichten.',
            'Bei der vorübergehenden Zuweisung gilt der Anspruch auf Lohn- und Arbeitsbedingungen, die mit denen der Stammbeschäftigten des Einsatzunternehmens vergleichbar sind. Das ist keine vertragliche Vereinbarung, sondern eine gesetzliche Bedingung nach tschechischem Recht.',
          ],
        },
        {
          heading: 'Planen Sie aus den Daten des eigenen Betriebs',
          body: [
            'Die beste Grundlage für einen Saisonplan sind die eigenen Aufzeichnungen der Vorjahre.',
            'Diese Daten hat ein Unternehmen bereits, und sie sind verlässlicher als jede allgemeine Schätzung. Der Zusammenhang zum Arbeitsmarkt lässt sich aus den öffentlichen Quellen des Tschechischen Statistischen Amtes, des tschechischen Ministeriums für Arbeit und Soziales (MPSV) und des Arbeitsamts der Tschechischen Republik (Úřad práce ČR) ergänzen. Konkrete Zahlen nennen wir hier nicht, weil sie sich von Region zu Region unterscheiden.',
          ],
          list: {
            intro: 'Diese Angaben tragen den Plan:',
            items: [
              'Wie viele Menschen in den vergangenen Saisons tatsächlich zusätzlich gebraucht wurden und wie lange',
              'An welchen Arbeitsplätzen die Spitze zuerst entsteht',
              'Wie viele die Saison vorzeitig verlassen haben und warum',
              'Welche Saisonkräfte wiederholt zurückgekehrt sind',
            ],
          },
        },
        {
          heading: 'Die Einarbeitung ist der größte Kostenposten',
          body: [
            'Bei der Saisonbesetzung wird oft unterschätzt, dass die Einarbeitung gleich viel kostet, unabhängig davon, wie lange jemand danach bleibt. Bei einer kurzen Saison verteilt sich dieser Aufwand auf ein kleineres Arbeitsvolumen.',
            'Praktisch lohnt es sich daher, die Einstiegsunterweisung auf das Notwendige zu beschränken und anspruchsvollere Arbeit dem Stammpersonal zu überlassen. Die zweite Folge: Eine zurückkehrende Saisonkraft ist deutlich mehr wert als eine neue – und genau deshalb lohnt es sich, sie zu pflegen.',
          ],
        },
        {
          heading: 'Wie Sie bewährte Saisonkräfte halten',
          body: [
            'Unternehmen, deren Saison gelingt, haben meist eines gemeinsam: Sie halten Kontakt zu Menschen, die schon einmal bei ihnen gearbeitet haben, und sprechen sie vor der nächsten Saison rechtzeitig an.',
            'Das heißt, festzuhalten, wer sich bewährt hat, sich zu melden, bevor diese Menschen andere Arbeit finden, und Bedingungen bereitzuhalten, die einen Grund zur Rückkehr geben. Das ist erheblich günstiger, als jedes Jahr mit neuen Menschen zu beginnen – und beim Umgang mit Bewerberdaten gelten die Regeln des Datenschutzes.',
          ],
        },
      ],
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Ist die Spitze vorhersehbar, lohnt es sich, die Kapazität vor ihrem Beginn zu vereinbaren.',
      },
    },
  },

  'absence-cover': {
    de: {
      title: 'Personalausfall im Betrieb: warum Menschen in der Schicht fehlen',
      description:
        'Geplante von ungeplanter Abwesenheit unterscheiden, erkennen, wo sie sich häuft, und eine Reserve setzen, damit ein Ausfall die Schicht nicht gefährdet. Ohne allgemeine Zahl.',
      h1: 'Personalausfall im Betrieb: warum Menschen in der Schicht fehlen',
      intro:
        'Abwesenheit ist ein Personalproblem, das sich schwer benennen lässt, weil sie anders als Fluktuation nicht im Personalstand sichtbar wird. Niemand geht – die Menschen sind an einem bestimmten Tag nur nicht in der Schicht. Der Betrieb spürt es trotzdem sofort, weil die fehlende Person durch Überstunden, durch Umsetzung von einem anderen Arbeitsplatz oder durch eine langsamere Linie ersetzt werden muss. Diese Seite hilft, die Arten der Abwesenheit zu trennen, weil jede eine andere Ursache und eine andere Lösung hat, und zeigt, wie sich eine Reserve so setzen lässt, dass ein Ausfall die Schichtbesetzung nicht gefährdet.',
      breadcrumb: 'Personalausfall',
      sections: [
        {
          heading: 'Zuerst unterscheiden, um welche Abwesenheit es geht',
          body: [
            'Ein Wort deckt Situationen mit völlig unterschiedlicher Logik ab. Geplante Abwesenheit – Urlaub, Schulung, ein geplanter Eingriff – ist vorhersehbar und gehört in den Schichtplan. Abwesenheit wegen vorübergehender Arbeitsunfähigkeit ist im Einzelfall unvorhersehbar, verhält sich in der Summe aber saisonal.',
            'Arbeitshindernisse auf Seiten der Beschäftigten haben ihren rechtlichen Rahmen im tschechischen Arbeitsgesetzbuch. Und unentschuldigtes Fehlen ist eine Frage der Arbeitsdisziplin, nicht der Planung.',
            'Die Unterscheidung ist keine Formalie: Eine Maßnahme, die gegen die eine Art hilft, wirkt auf die andere nicht. Wer auf Krankenstand mit strengeren Anwesenheitsregeln reagiert, erhöht meist nur das unentschuldigte Fehlen.',
          ],
        },
        {
          heading: 'Wo Abwesenheit entsteht',
          body: [
            'Abwesenheit ist nicht gleichmäßig verteilt. Sie konzentriert sich meist auf bestimmte Arbeitsplätze, Schichten oder Gruppen, und genau diese Verteilung ist die wertvollste Information, die ein Unternehmen hat.',
            'Entstehen die Ausfälle vor allem an einem Arbeitsplatz, liegt die Ursache meist in der Arbeit selbst – körperliche Belastung, Umgebung, Beziehungen oder Führung. Hängen sie an der Nachtschicht, ist es eher das Modell. Betreffen sie neue Menschen in den ersten Wochen, ist es in Wahrheit ein Einarbeitungsproblem, das sich als Abwesenheit zeigt.',
            'Welche Ausfallquote normal ist, nennen wir hier nicht: Sie unterscheidet sich nach Branche, Art der Arbeit und Region. Nützlicher als der Vergleich mit einem fremden Wert ist die eigene Entwicklung im Zeitverlauf und die Frage, wo sich die Ausfälle häufen.',
          ],
        },
        {
          heading: 'Eine betriebliche Reserve ist eine Antwort, kein Versagen',
          body: [
            'Ein Betrieb, der auf hundert Prozent Besetzung geplant ist, ist von Natur aus instabil: Jeder Ausfall schlägt unmittelbar auf die Leistung durch. Eine Reserve ist deshalb kein Zeichen schlechter Planung, sondern Teil davon.',
            'Sie kann mehrere Formen haben, und keine davon entsteht erst im Moment des Ausfalls. Wie groß sie sein sollte, hängt von der tatsächlichen Ausfallquote im konkreten Betrieb ab; eine allgemeine Zahl nennen wir nicht, weil sie für niemanden gälte.',
          ],
          list: {
            intro: 'Die Formen, die in der Praxis tragen:',
            items: [
              'Vertretbarkeit – wie viele Menschen mehr als einen Arbeitsplatz abdecken können',
              'Vorab vereinbarte flexible Kapazität, etwa über Arbeitnehmerüberlassung, statt Suche erst beim Ausfall',
              'Bewusst niedriger geplante Besetzung an kritischen Arbeitsplätzen',
              'Ein Überblick darüber, wo die Ausfälle tatsächlich entstehen',
            ],
          },
        },
        {
          heading: 'Mehrfachqualifizierung ist günstiger als eine Reserve in Köpfen',
          body: [
            'Die wirksamste Maßnahme gegen Abwesenheit ist meist die, die mit Personalgewinnung nichts zu tun hat: die Zahl der Menschen zu erhöhen, die mehr als einen Arbeitsplatz abdecken können.',
            'Eine vorhandene Person auf einem zweiten Arbeitsplatz einzuarbeiten ist in der Regel günstiger, als freie Kapazität vorzuhalten, und erhöht zugleich ihren Wert und ihre Motivation. Ein Überblick darüber, wer was kann, ist deshalb ein praktischeres Steuerungsinstrument als eine Anwesenheitsstatistik.',
          ],
        },
        {
          heading: 'Wo Abwesenheit in Fluktuation übergeht',
          body: [
            'Abwesenheit und Fluktuation hängen enger zusammen, als es scheint. Erhöhte Abwesenheit an einem bestimmten Arbeitsplatz geht Abgängen häufig voraus – die Menschen fehlen zuerst und gehen danach.',
            'Abwesenheit zu verfolgen lohnt sich deshalb auch als frühes Signal. Konzentriert sie sich an einer Stelle, suchen Sie die Ursache, bevor daraus eine Abgangswelle wird, die Sie dann über die Rekrutierung lösen müssen.',
          ],
        },
      ],
      cta: {
        label: 'Mitarbeiterfluktuation',
        targetConceptId: 'employee-turnover',
        note: 'Wo aus Abwesenheit schon Abgänge geworden sind, beginnt man bei der Fluktuation.',
      },
    },
  },

  'direct-hire': {
    de: {
      title: 'Direktvermittlung: wann eine Stelle in die Stammbelegschaft gehört',
      description:
        'Was Direktvermittlung nach dem tschechischen Beschäftigungsgesetz bedeutet, worin sie sich von der vorübergehenden Zuweisung unterscheidet und was Ihr Unternehmen selbst übernimmt.',
      h1: 'Direktvermittlung: wann eine Stelle in die Stammbelegschaft gehört',
      intro:
        'Die Entscheidung, eine Person direkt anzustellen oder den Bedarf durch vorübergehende Zuweisung zu decken, ist nicht nur eine Preisfrage. Mit ihr ändert sich, wer Arbeitgeber ist, wer die Lohnabrechnung führt, wer die arbeitsmedizinische Untersuchung und die Arbeitsschutzunterweisung veranlasst und wie die Zusammenarbeit endet. Diese Seite erklärt, was Direktvermittlung im Regime des tschechischen Beschäftigungsgesetzes bedeutet, worin sie sich von der Arbeitnehmerüberlassung unterscheidet und was ein Unternehmen konkret übernimmt, wenn es selbst anstellt. Dazu gehört ein Vergleich beider Wege nach den Kriterien, die in der betrieblichen Praxis entscheiden.',
      breadcrumb: 'Direktvermittlung',
      sections: [
        {
          heading: 'Was Direktvermittlung rechtlich bedeutet',
          body: [
            'Bei der Direktvermittlung entsteht ein Arbeitsverhältnis unmittelbar zwischen Ihrem Unternehmen und der Person nach dem tschechischen Arbeitsgesetzbuch. Sie sind Arbeitgeber mit allem, was dazugehört, und die Person wird Stammbeschäftigte. Die Rolle der Agentur endet bei Suche, Ansprache und Vorauswahl; in das Arbeitsverhältnis tritt sie nicht ein.',
            'Die Suche nach Beschäftigten für einen Arbeitgeber ist allerdings Arbeitsvermittlung im Sinne des tschechischen Gesetzes Nr. 435/2004 Sb. über die Beschäftigung und erlaubnispflichtig. Dasselbe gilt für die Beschäftigung von Personen zum Zweck ihrer vorübergehenden Zuweisung an ein Einsatzunternehmen. Der Unterschied liegt also nicht darin, ob eine Erlaubnis nötig ist, sondern darin, wer Arbeitgeber bleibt. Ob eine bestimmte Agentur die Erlaubnis besitzt, prüfen Sie im öffentlichen Verzeichnis der Personalagenturen, das die tschechische staatliche Arbeitsverwaltung zugänglich macht – das tschechische Ministerium für Arbeit und Soziales (MPSV) und das Arbeitsamt der Tschechischen Republik (Úřad práce ČR).',
          ],
        },
        {
          heading: 'Wann die Stammbelegschaft sinnvoll ist',
          body: [
            'In die Stammbelegschaft gehört, was dauern soll und was Sie nicht verlieren möchten. Typischerweise der feste Kern des Betriebs, Rollen, die Wissen und die Einstellung der Technik tragen, Inhaberinnen und Inhaber personengebundener Nachweise und jede Position, die Menschen führt oder über Qualität entscheidet. Bei diesen lohnt sich eine längere Suche, weil die Kosten eines Wechsels höher sind als bei leicht ersetzbaren Stellen.',
            'Saisonale Spitzen, Vertretung langer Abwesenheiten, der Anlauf einer neuen Linie oder ein Auftrag mit definiertem Ende lassen sich besser durch vorübergehende Zuweisung decken – der Bedarf endet und mit ihm die Zuweisung, ohne dass auf Ihrer Seite ein Arbeitsverhältnis zu beenden wäre. Viele Unternehmen kombinieren beide Wege: einen stabilen Kern in der Stammbelegschaft und darüber eine flexible Schicht.',
          ],
          list: {
            items: [
              'Stammbelegschaft – festes Kernteam, technisches Wissen, Führung von Menschen, Entscheidung über Qualität',
              'Vorübergehende Zuweisung – Saison, Anlauf, Vertretungen, Projekt mit definiertem Ende',
              'Kombination beider Wege – ein stabiler Kern, ergänzt um flexible Kapazität',
            ],
          },
        },
        {
          heading: 'Was Sie mit eigenen Beschäftigten übernehmen',
          body: [
            'Direktvermittlung bedeutet, dass sämtliche Arbeitgeberpflichten bei Ihnen bleiben. Das ist kein Argument dagegen, nur ein Posten, den man beim Vergleich der Wege mitrechnen muss – einen Teil davon trägt bei der Zuweisung die Agentur als formaler Arbeitgeber.',
          ],
          list: {
            intro: 'Konkret bleiben bei Ihnen:',
            items: [
              'Arbeitsvertrag, Entgeltvereinbarung und innerbetriebliche Vorschriften',
              'Lohnabrechnung, gesetzliche Abgaben und steuerliche Pflichten – die Sätze prüfen Sie bei der tschechischen Sozialversicherungsanstalt (ČSSZ), der Krankenkasse und der Finanzverwaltung',
              'Die arbeitsmedizinische Eingangsuntersuchung vor Arbeitsantritt und weitere Untersuchungen in dem Umfang, den die Kategorie der Tätigkeit vorgibt',
              'Erst- und Wiederholungsunterweisungen im Arbeitsschutz sowie Ausgabe und Aufzeichnung der persönlichen Schutzausrüstung',
              'Arbeitszeiterfassung, Schichtplanung und Entgeltfortzahlung',
              'Die Beendigung des Arbeitsverhältnisses in den Grenzen des tschechischen Arbeitsgesetzbuchs einschließlich der Kündigungsfrist',
            ],
          },
        },
        {
          heading: 'Direktvermittlung im Vergleich zur Arbeitnehmerüberlassung',
          body: [
            'Beide Wege führen dazu, dass eine Person am Arbeitsplatz steht und arbeitet. Sie unterscheiden sich darin, wer sie anstellt, wer die Verwaltung trägt und wie flexibel sich das Verhältnis beenden lässt. Bei der vorübergehenden Zuweisung gilt zusätzlich die gesetzliche Anforderung vergleichbarer Lohn- und Arbeitsbedingungen gegenüber Ihren Stammbeschäftigten auf vergleichbarer Position – kein Verhandlungsposten, sondern eine Bedingung des Modells.',
            'Als praktische Leitlinie: Je dauerhafter der Bedarf und je stärker die Rolle an Ihr Wissen gebunden ist, desto mehr spricht für die Stammbelegschaft. Je schwankender das Arbeitsvolumen und je früher Kapazität verfügbar sein muss, desto eher passt die Zuweisung. Dringlichkeit allein spricht dabei für keinen der beiden Wege, weil beide bei qualifizierten Rollen an die Verfügbarkeit von Menschen und an Kündigungsfristen stoßen.',
          ],
          list: {
            intro: 'Die Kriterien nebeneinander:',
            items: [
              'Arbeitgeber – bei der Direktvermittlung Ihr Unternehmen, bei der Zuweisung die Personalagentur',
              'Arbeitsanweisungen – in beiden Fällen erteilt sie das Einsatzunternehmen, also Ihr Betrieb',
              'Lohnabrechnung und Abgaben – bei der Zuweisung führt sie die Agentur',
              'Arbeitsschutz am Arbeitsplatz – für die Dauer der Zuweisung stellt ihn das Einsatzunternehmen sicher, der Agentur bleiben ihre Arbeitgeberpflichten',
              'Beendigung – Ende des Arbeitsverhältnisses nach dem tschechischen Arbeitsgesetzbuch gegenüber dem Ende der Zuweisung zu den vereinbarten Bedingungen',
              'Lohnbedingungen – bei der Zuweisung die gesetzliche Anforderung der Vergleichbarkeit',
            ],
          },
        },
        {
          heading: 'Vergütungsmodelle im Umriss',
          body: [
            'Bei der Direktvermittlung ist die Vergütung der Agentur üblicherweise an den Eintritt der ausgewählten Person gebunden und leitet sich aus deren vereinbartem Verdienst ab; der konkrete Anteil ist Sache des Vertrags. Bei der vorübergehenden Zuweisung zahlen Sie einen Stundensatz, der das Entgelt auf dem von der Vergleichbarkeitsanforderung verlangten Niveau samt gesetzlicher Abgaben, Urlaub und Ersatzleistungen tragen muss – deshalb lässt er sich nicht mit einem Bruttolohn vergleichen.',
            'Beträge oder Prozentsätze nennen wir hier nicht. Den Aufbau der Modelle einschließlich Exklusivität, gestufter Zahlung und vertraglicher Regelungen für einen frühen Weggang behandelt die Seite zu den Vergütungsmodellen.',
          ],
        },
        {
          heading: 'Was vor der Unterschrift zu klären ist',
          body: [
            'Bevor die Suche beginnt, sollten schriftlich feststehen: der Umfang des Auftrags, Art und Fälligkeit der Vergütung, die Geltungsdauer der Vereinbarung, der Umgang mit Bewerberdaten und die Bedingungen für das Ende der Zusammenarbeit. Bei der vorübergehenden Zuweisung kommt die Aufteilung der Verantwortung für Arbeitsschutz und Schutzausrüstung am Arbeitsplatz hinzu sowie die Frage, wer die arbeitsmedizinischen Untersuchungen veranlasst.',
            'Wie vorzugehen ist, wenn die ausgewählte Person früh geht, ist Sache der vertraglichen Vereinbarung – regeln Sie sie schriftlich, bevor die Suche beginnt. Weder ein Ersatz noch der Verbleib einer Person lässt sich im Voraus versprechen, weil über beides diese Person selbst entscheidet.',
            'In dieselbe Vereinbarung gehört der umgekehrte Fall: ob eine überlassene Person später in Ihre Stammbelegschaft übernommen werden kann. Das ist Sache einer Verständigung zwischen dem Einsatzunternehmen, der Agentur und der Person selbst – kein automatischer Anspruch, aber auch kein verbotener Schritt. Die Bedingungen einschließlich einer etwaigen Vergütung dafür sollten schriftlich und im Voraus feststehen, damit sie nicht erst in dem Moment verhandelt werden müssen, in dem Ihnen an dem Menschen gelegen ist.',
          ],
        },
      ],
      cta: {
        label: 'Vergütungsmodelle',
        targetConceptId: 'agency-fees',
        note: 'Wie die beiden Vergütungsstrukturen aufgebaut sind und warum sie sich nicht direkt vergleichen lassen.',
      },
    },
  },

  'agency-employment': {
    de: {
      title: 'Arbeitnehmerüberlassung in Tschechien',
      description:
        'Wie die vorübergehende Zuweisung nach tschechischem Recht funktioniert: das Verhältnis zwischen Agentur, Beschäftigten und Einsatzunternehmen, vergleichbare Bedingungen, Arbeitsschutz.',
      h1: 'Arbeitnehmerüberlassung in Tschechien',
      intro:
        'Die vorübergehende Zuweisung ist der Kern der Arbeitnehmerüberlassung in Tschechien. Die Person ist bei der Personalagentur angestellt, und diese weist sie für eine vereinbarte Zeit einem Einsatzunternehmen zu, in dem die Arbeit tatsächlich geleistet wird. Das Modell eignet sich zur Abdeckung saisonaler Spitzen, von Projekten mit definiertem Ende oder vorübergehender Kapazitätsausfälle. Diese Seite beschreibt, wie die Zuweisung funktioniert, wie das Verhältnis zwischen den Beteiligten aussieht und welche Regeln für Lohn- und Arbeitsbedingungen gelten. Sie stützt sich auf das tschechische Arbeitsgesetzbuch und das tschechische Beschäftigungsgesetz.',
      breadcrumb: 'Arbeitnehmerüberlassung',
      sections: [
        {
          heading: 'Wie die vorübergehende Zuweisung funktioniert',
          body: [
            'Die Personalagentur begründet mit der Person ein Arbeitsverhältnis und weist sie auf Grundlage einer Vereinbarung über die vorübergehende Zuweisung einem Einsatzunternehmen zu. Die Person leistet die Arbeit beim Einsatzunternehmen und nach dessen Weisungen, formaler Arbeitgeber bleibt jedoch die Agentur.',
            'Die Dauer der Zuweisung ist üblicherweise zeitlich bestimmt und kann einvernehmlich verlängert oder beendet werden. Die konkreten Bedingungen werden in den Verträgen zwischen den Beteiligten vereinbart.',
          ],
        },
        {
          heading: 'Vergleichbare Bedingungen und Verantwortung',
          body: [
            'Bei der vorübergehenden Zuweisung verlangt das tschechische Recht, dass Lohn- und Arbeitsbedingungen der überlassenen Person mit denen der Stammbeschäftigten des Einsatzunternehmens auf vergleichbarer Position vergleichbar sind. Für Sicherheit und Gesundheitsschutz bei der Arbeit tragen Agentur und Einsatzunternehmen gemeinsam Verantwortung.',
          ],
          list: {
            intro: 'Was das Modell damit festlegt:',
            items: [
              'Lohn- und Arbeitsbedingungen, die mit denen der Stammbeschäftigten vergleichbar sind',
              'Gemeinsame Verantwortung von Agentur und Einsatzunternehmen für den Arbeitsschutz',
              'Eine zeitlich bestimmte Dauer der Zuweisung',
              'Eine klare Rollenverteilung in den Verträgen',
            ],
          },
        },
        {
          heading: 'Für wen es geeignet ist',
          body: [
            'Die vorübergehende Zuweisung passt zu Unternehmen, die flexibel auf Nachfrageschwankungen reagieren möchten, ohne die gesamte Verwaltung der Beschäftigung selbst zu übernehmen. Einen Teil der Arbeitgeberpflichten trägt die Agentur.',
          ],
        },
      ],
      cta: {
        label: 'Wie eine Personalagentur funktioniert',
        targetConceptId: 'how-agency-works',
        note: 'Die beiden Modelle nebeneinander und die Regeln, die für jedes gelten.',
      },
    },
  },

  'agency-fees': {
    de: {
      title: 'Vergütungsmodelle einer Personalagentur: Aufbau und Vergleichbarkeit',
      description:
        'Wie Vergütungsmodelle aufgebaut sind: eine einmalige Vergütung bei der Direktvermittlung, ein Stundensatz bei der Zuweisung – und was dieser nach tschechischem Recht tragen muss.',
      h1: 'Vergütungsmodelle einer Personalagentur: Aufbau und Vergleichbarkeit',
      intro:
        'Angebote von Personalagenturen lassen sich schlechter vergleichen, als es zunächst scheint: Zwei davon können ähnlich klingen und dabei einen anderen Leistungsumfang, eine andere Berechnungsgrundlage und eine andere Risikoverteilung zwischen Anbieter und Auftraggeber enthalten. Auf dieser Seite finden Sie deshalb weder Betrag noch Satz noch Anteil. Sie beschreibt, wie die einzelnen Modelle aufgebaut sind, was ein Stundensatz bei der Arbeitnehmerüberlassung nach tschechischem Recht tragen muss und woran Sie erkennen, dass zwei Angebote in Wahrheit nicht auf derselben Grundlage verglichen werden.',
      breadcrumb: 'Vergütungsmodelle',
      sections: [
        {
          heading: 'Zwei Modelle, die sich nicht direkt vergleichen lassen',
          body: [
            'Direktvermittlung und Arbeitnehmerüberlassung unterscheiden sich nicht nur im Preis, sondern vor allem darin, was gekauft wird. Bei der Direktvermittlung zahlen Sie für Suche und Vorauswahl einer Person, die Sie anschließend selbst anstellen; die Vergütung ist einmalig und meist an den Eintritt gebunden. Bei der Arbeitnehmerüberlassung bleibt die Agentur Arbeitgeber, weist die Person Ihnen als Einsatzunternehmen vorübergehend zu und rechnet die geleistete Zeit ab.',
            'Im ersten Fall ist die Zahlung an den Anbieter einmalig, und die Lohnkosten tragen Sie weiterhin selbst. Im zweiten steckt der gesamte Lohn- und Abgabenanteil im Stundensatz. Eine einmalige Vergütung mit einem Stundensatz zu vergleichen, ohne beides auf denselben Zeitraum und denselben Umfang umzurechnen, vergleicht deshalb zwei verschiedene Dinge.',
          ],
        },
        {
          heading: 'Wie die einmalige Vergütung aufgebaut ist',
          body: [
            'Die Vergütung für eine Direktvermittlung leitet sich üblicherweise vom Verdienst der zu besetzenden Stelle ab und wird als Anteil einer vereinbarten Grundlage ausgedrückt. Entscheidend ist deshalb nicht der Anteil selbst, sondern die Definition der Grundlage: ob es um das monatliche Bruttoentgelt oder den Jahresverdienst geht und ob variable Bestandteile, Schichtzuschläge oder eine Einstiegsprämie einfließen. Zwei Angebote mit gleichem Anteil können bei anderer Grundlage deutlich auseinanderliegen.',
            'Das Übrige ist Sache des Vertrags und wird sinnvollerweise vereinbart, bevor die Suche beginnt. Einen konkreten Anteil und einen Betrag nennt diese Seite nicht; beides ergibt sich aus dem Auftrag, dem Leistungsumfang und der Schwierigkeit der konkreten Stelle.',
          ],
          list: {
            intro: 'Im Vertrag sollte ausdrücklich stehen:',
            items: [
              'Die genaue Definition der Grundlage, aus der sich die Vergütung berechnet',
              'Der Moment, in dem der Anspruch entsteht: die Unterzeichnung des Arbeitsvertrags oder der tatsächliche Eintritt',
              'Fälligkeit und Rechnungsbedingungen',
              'Das Vorgehen, wenn die Person auf einer anderen Stelle antritt als derjenigen, für die sie vorgestellt wurde',
            ],
          },
        },
        {
          heading: 'Was ein Stundensatz bei der Zuweisung enthalten muss',
          body: [
            'Bei der vorübergehenden Zuweisung ist der Stundensatz keine freie kaufmännische Erwägung. Nach dem tschechischen Arbeitsgesetzbuch haben überlassene Beschäftigte Anspruch auf Lohn- und Arbeitsbedingungen, die mit denen vergleichbarer Stammbeschäftigter des Einsatzunternehmens vergleichbar sind; der Satz muss das Entgelt auf diesem Niveau samt allem daran Hängenden tragen. Erst darüber liegen die eigenen Kosten der Agentur.',
            'Ein Angebot spürbar unter den übrigen bedeutet meist kein besseres Geschäft, sondern einen anderen Inhalt: fehlende Zuschläge, eine andere Annahme über geleistete Stunden oder Posten, die in eine gesonderte Rechnung verschoben wurden. Die nützlichere Frage als „wie viel“ lautet deshalb „was ist im Satz enthalten und was wird zusätzlich berechnet“.',
          ],
          list: {
            intro: 'Konkret trägt der Satz:',
            items: [
              'Das Entgelt auf dem Niveau vergleichbarer Lohnbedingungen beim Einsatzunternehmen',
              'Die gesetzlichen Arbeitgeberbeiträge zur Sozial- und Krankenversicherung',
              'Urlaub und Entgeltfortzahlung nach dem tschechischen Arbeitsgesetzbuch',
              'Zuschläge und Ersatzleistungen aus der Schichtplanung und aus Überstunden',
              'Die eigenen Kosten der Agentur für Personalgewinnung, Lohnabrechnung und Verwaltung',
            ],
          },
        },
        {
          heading: 'Exklusivität, Stufung und Erfolgsbindung',
          body: [
            'Die Modelle unterscheiden sich auch darin, wann gezahlt wird. Eine ausschließlich erfolgsgebundene Vergütung verlagert das Risiko einer erfolglosen Suche auf den Anbieter, und diese Risikoverteilung schlägt sich in ihrer Höhe nieder. Ein gestuftes Modell, bei dem ein Teil zu Beginn und der Rest beim Eintritt gezahlt wird, teilt das Risiko und gibt dem Anbieter einen Grund, auch einem schwierigen Auftrag Kapazität zu widmen, der möglicherweise nicht mit einer Besetzung endet.',
            'Exklusivität ist eine eigene Vereinbarung und kein Aufschlag. Ein Auftrag an einen einzigen Anbieter beseitigt die Lage, in der zwei Seiten dieselbe Person vorstellen und ein Streit darüber beginnt, wer sie gebracht hat; zugleich bindet er Sie für die vereinbarte Dauer. Wenn Sie Exklusivität vereinbaren, gehören eine Laufzeit und ein klares Vorgehen für den Fall dazu, dass sich der Auftrag nicht erfüllen lässt.',
          ],
        },
        {
          heading: 'Ersatz bei frühem Weggang gehört in den Vertrag',
          body: [
            'Die Frage „was, wenn die neue Person bald geht“ gehört nicht als Versprechen in ein Angebot, sondern als Regelung in den Vertrag. Schriftlich festzuhalten sind der maßgebliche Zeitraum, die Gründe, die dabei zählen, und die Fälle, die einen Anspruch ausschließen – Wegfall der Stelle, wesentliche Änderung des Auftrags oder Beendigung durch das Einsatzunternehmen.',
            'Ein Versprechen, dass es zu keinem Weggang kommt, ist eine Aussage über das künftige Verhalten einer dritten Person und kein Leistungsmerkmal. Redlicher ist, vorab zu vereinbaren, was geschieht, wenn es dazu kommt.',
          ],
        },
        {
          heading: 'Warum Angebote nicht vergleichbar sind, und wohin die unbesetzte Stelle gehört',
          body: [
            'Angebote gehen meist eher im Umfang als im Preis auseinander. Klären Sie deshalb, was enthalten ist und was nachberechnet wird: Anzeigen, Prüfung von Nachweisen, Koordination arbeitsmedizinischer Untersuchungen, Schutzausrüstung, Transport und Unterkunft, Verwaltung bei ausländischen Mitarbeitenden oder die Lohnabrechnung. Der Unterschied im Inhalt ist meist größer als der Unterschied in der Zahl.',
            'In den Vergleich gehört auch ein Posten, der auf keiner Rechnung steht – die Kosten der unbesetzten Stelle. Nicht erbrachte Leistung, Überstunden der übrigen Schicht, abgelehnte Aufträge und eine überlastete Betriebsleitung laufen in jeder Woche mit, in der der Platz leer bleibt.',
          ],
          list: {
            intro: 'Damit zwei Angebote auf derselben Grundlage stehen, muss auf beiden Seiten dasselbe verglichen werden:',
            items: [
              'Derselbe Leistungsumfang auf beiden Seiten des Vergleichs',
              'Dieselbe Definition der Grundlage, aus der die Vergütung berechnet wird',
              'Dieselben Bedingungen für Fälligkeit und Rechnungsstellung',
              'Ein Überblick darüber, was enthalten ist und was gesondert berechnet wird',
              'Die eingerechneten Kosten der unbesetzten Stelle für die Dauer der Suche',
            ],
          },
        },
      ],
      cta: {
        label: 'Kosten unbesetzter Stellen',
        targetConceptId: 'cost-of-vacancy',
        note: 'Der Posten, der auf keiner Rechnung steht, und wie Sie ihn für Ihren Betrieb schätzen.',
      },
    },
  },

  'choosing-an-agency': {
    de: {
      title: 'Personalagentur auswählen: überprüfbare Kriterien',
      description:
        'Checkliste für Einkaufende: Erlaubnis zur Arbeitsvermittlung nach tschechischem Recht, Insolvenzversicherung, wer Arbeitgeber wird, vergleichbare Bedingungen, Warnsignale.',
      h1: 'Personalagentur auswählen: überprüfbare Kriterien',
      intro:
        'Die Auswahl einer Personalagentur ist eine Einkaufsentscheidung, die sich überprüfbar treffen lässt. Das meiste, worauf es ankommt, ist nämlich in einem öffentlichen Verzeichnis auffindbar oder mit einer einzigen Frage zu klären: ob der Anbieter eine Erlaubnis zur Arbeitsvermittlung nach tschechischem Recht besitzt und in welchem Umfang, ob er für den Fall der eigenen Insolvenz versichert ist, wer Arbeitgeber der überlassenen Menschen sein wird und wie die Nachweise der Kandidatinnen und Kandidaten geprüft werden. Der folgende Text ist als Checkliste für Einkaufende geschrieben und bewusst auch gegen uns verwendbar – wir erklären hier den eigenen Status nicht für geprüft; prüfen Sie ihn selbst im öffentlichen Verzeichnis.',
      breadcrumb: 'Agentur auswählen',
      sections: [
        {
          heading: 'Die Erlaubnis zur Arbeitsvermittlung und ihr Umfang',
          body: [
            'Nach dem tschechischen Gesetz Nr. 435/2004 Sb. über die Beschäftigung ist die Arbeitsvermittlung eine erlaubnispflichtige Tätigkeit. Eine Erlaubnis wird für bestimmte Formen der Vermittlung erteilt, weshalb der Satz „wir haben eine Erlaubnis“ für sich allein nicht genügt. Entscheidend ist, ob sie auch die Form abdeckt, die Sie tatsächlich wollen – typischerweise die vorübergehende Zuweisung von Beschäftigten an ein Einsatzunternehmen.',
            'Agenturen mit Erlaubnis sind in einem öffentlich zugänglichen Verzeichnis geführt, und die Prüfung dauert Minuten: Die Erlaubnis erteilt das Arbeitsamt der Tschechischen Republik (Úřad práce ČR), und das Verzeichnis der Personalagenturen veröffentlicht das tschechische Ministerium für Arbeit und Soziales (MPSV). Prüfen Sie dabei Firmierung und Identifikationsnummer des Rechtsträgers, der den Vertrag tatsächlich unterzeichnen wird – er kann von der im Angebot genannten Marke abweichen.',
          ],
          list: {
            intro: 'Vier Dinge, die sich vor der Unterschrift prüfen lassen:',
            items: [
              'Ob die Erlaubnis besteht und welche Nummer sie trägt',
              'Die Formen der Vermittlung, die die Erlaubnis abdeckt',
              'Die Gültigkeit der Erlaubnis zum heutigen Tag',
              'Die Übereinstimmung zwischen dem Rechtsträger im Verzeichnis und dem Rechtsträger im Vertrag',
            ],
          },
        },
        {
          heading: 'Versicherung und die Frage, wer Arbeitgeber sein wird',
          body: [
            'Eine Agentur, die eigene Beschäftigte einem Einsatzunternehmen zuweist, muss nach dem tschechischen Beschäftigungsgesetz für den Fall der eigenen Insolvenz versichert sein, damit die Lohnansprüche der überlassenen Menschen gesichert sind. Den Versicherungsnachweis und die Angabe zur Laufzeit vor der Vertragsunterzeichnung anzufordern ist völlig legitim.',
            'Die zweite Frage ist einfach: Wer wird Arbeitgeber der Menschen sein, die bei Ihnen arbeiten. Bei der Zuweisung ist es die Agentur – sie führt die Lohnabrechnung, zahlt Beiträge und trägt die Arbeitgeberpflichten. Bei der Direktvermittlung werden Sie Arbeitgeber, und die Rolle des Anbieters endet. Fällt die Antwort auf diese Frage uneindeutig aus, ist das für sich genommen bereits ein Befund.',
          ],
        },
        {
          heading: 'Wie der Anbieter vergleichbare Bedingungen ermittelt',
          body: [
            'Vergleichbare Lohn- und Arbeitsbedingungen überlassener gegenüber vergleichbaren Stammbeschäftigten sind eine gesetzliche Anforderung und kein Merkmal eines Angebots. Interessant ist deshalb nicht, ob ein Anbieter sie „einhält“, sondern wie er sie ermittelt: welche Angaben er von Ihnen braucht, wer bei Ihnen die vergleichbare Person bestimmt und wie Zuschläge aus Schichtplanung und Überstunden behandelt werden.',
            'Ein Anbieter, der diese Frage abtut, verlagert das Risiko auf Sie. Die Einhaltung der Regeln der Arbeitnehmerüberlassung unterliegt der Kontrolle durch die tschechischen Arbeitsaufsichtsbehörden, und zwar auf beiden Seiten des Verhältnisses.',
          ],
        },
        {
          heading: 'Fragen zur Auswahlmethode',
          body: [
            'Der Unterschied zwischen Anbietern zeigt sich vor allem daran, wie sie auswählen. Bei Fachpositionen kommt es darauf an, ob jemand die Nachweise tatsächlich gesehen hat und ihren Inhalt versteht – dass bei einem Schweißerzeugnis der Geltungsbereich entscheidet und nicht seine bloße Existenz, und dass sich die fachliche Befähigung in der Elektrotechnik nach der ausgeübten Tätigkeit gliedert. Ebenso wichtig ist, wer das Gespräch führt und ob diese Person betriebliche Erfahrung mit dem Beruf hat.',
            'Fragen Sie auch, was der Anbieter nicht tun wird und wo seine Leistung endet. Wer die Grenzen beschreiben kann, hat meist auch beschrieben, was innerhalb liegt. Eine Antwort wie „wir schaffen alles“ beschreibt keine Grenzen.',
          ],
          list: {
            intro: 'Die Fragen, an denen sich der Unterschied zeigt:',
            items: [
              'Wer das Gespräch führt und welche betriebliche Erfahrung diese Person mit dem Beruf hat',
              'Wie Geltungsbereich und Gültigkeit der Fachnachweise überprüft werden',
              'Wie die Berufserfahrung überprüft wird und was mit Unstimmigkeiten im Lebenslauf geschieht',
              'Wie Schichtmodell, Arbeitsumgebung und Arbeitsort gegenüber der Person kommuniziert werden',
              'Was geschieht, wenn sich nach dem Eintritt zeigt, dass die Person die Anforderungen nicht erfüllt',
            ],
          },
        },
        {
          heading: 'Warnsignale',
          body: [
            'Manche Signale sind gerade deshalb verlässlich, weil sie Dinge betreffen, die ein Anbieter nicht in der Hand hat. Ein zugesagter Eintrittstermin ist eines davon: Er hängt von der Kündigungsfrist der Person und bei Menschen aus Drittstaaten von einem Verwaltungsverfahren ab, also von Dritten.',
            'Mit derselben Vorsicht behandeln Sie Aussagen über die Größe einer eigenen Datenbank, die sich nicht überprüfen lässt. Und ebenso jede Aussage, ein Anbieter sei vom Staat geprüft oder empfohlen: Staatliche Stellen erteilen Erlaubnisse und führen Verzeichnisse, Empfehlungen für Anbieter stellen sie nicht aus.',
            'Druck auf eine schnelle Unterschrift ist eine eigene Kategorie. Ein Auftrag, der wirklich eilt, lässt sich auch mit einer kurzen, aber schriftlichen Vereinbarung beginnen; die Bereitschaft, die Bedingungen zu Papier zu bringen, ist deshalb ein besserer Indikator als die Reaktionsgeschwindigkeit. Fragen Sie bei einem Stundensatz danach, was er enthält: Bei der vorübergehenden Zuweisung muss er den Lohn auf dem Niveau vergleichbarer Bedingungen im Einsatzunternehmen tragen, dazu die Arbeitgeberabgaben, den Urlaub samt Entgeltfortzahlung sowie die Zuschläge für die Verteilung der Schichten.',
          ],
          list: {
            intro: 'Die Signale, auf die es ankommt:',
            items: [
              'Das Versprechen eines Ergebnisses oder eines konkreten Eintrittstermins',
              'Nicht überprüfbare Aussagen über den Umfang der eigenen Bewerberdatenbank',
              'Die Behauptung, staatliche Stellen hätten den Anbieter geprüft oder empfohlen',
              'Druck auf eine schnelle Unterschrift und die Weigerung, die Bedingungen schriftlich festzuhalten',
              'Ein Stundensatz bei der vorübergehenden Zuweisung, der die gesetzlichen Ansprüche der Beschäftigten offensichtlich nicht deckt',
              'Das Fehlen einer konkreten, für den Auftrag verantwortlichen Ansprechperson',
            ],
          },
        },
        {
          heading: 'Referenzen und schriftliche Bedingungen vor dem Beginn',
          body: [
            'Referenzen sagen weniger, als man von ihnen erwartet. Sie belegen, dass ein Anbieter mit jemandem zusammengearbeitet hat, aber nicht, wie er sich auf Ihrer Stelle, in Ihrer Region und in Ihrem Schichtmodell schlägt. Nützlicher ist, ein Referenzunternehmen Konkretes zu fragen: wie viele vorgestellte Menschen tatsächlich eingetreten sind, wie eine Lage behandelt wurde, in der jemand die Anforderungen nicht erfüllte, und wie die Kommunikation bei Uneinigkeit verlief.',
            'Halten Sie die Bedingungen schriftlich fest, bevor eine Suche beginnt – Umfang des Auftrags, Vergütung und Fälligkeit, Exklusivität, Schutz vorgestellter Personen und das Vorgehen bei vorzeitiger Beendigung.',
          ],
        },
      ],
      cta: {
        label: 'Über uns',
        targetConceptId: 'about-us',
        note: 'Einschließlich der Frage, wie Sie dieselben Prüfungen bei uns durchführen.',
      },
    },
  },

  'agency-contract': {
    de: {
      title: 'Vertrag mit einer Personalagentur: worauf zu achten ist',
      description:
        'Was schriftlich gehört: die zwei Vertragsverhältnisse, vergleichbare Bedingungen nach tschechischem Recht, Arbeitsschutz und Schutzausrüstung, Bewerberdaten, Ersatz, Ende.',
      h1: 'Vertrag mit einer Personalagentur: worauf zu achten ist',
      intro:
        'Der Vertrag mit einer Personalagentur entscheidet über die Lagen, die ein Angebot nicht behandelt: was geschieht, wenn eine Person nicht antritt, wenn sich der Auftrag unterwegs ändert, wenn es an Ihrem Arbeitsplatz zu einem Arbeitsunfall kommt oder wenn die Zusammenarbeit früher endet als erwartet. Seine Gestalt unterscheidet sich grundlegend danach, ob Sie die Suche nach einer Person für die Stammbelegschaft kaufen oder die vorübergehende Zuweisung überlassener Beschäftigter. Die folgende Übersicht fasst die Punkte zusammen, die schriftlich vereinbart sein sollten, und die Rollen, die sich zwischen den Beteiligten nicht durch Vereinbarung verschieben lassen. Es handelt sich um allgemeine Informationen zum tschechischen Recht, nicht um Rechtsberatung.',
      breadcrumb: 'Vertrag mit Personalagentur',
      sections: [
        {
          heading: 'Zwei verschiedene Vertragsverhältnisse',
          body: [
            'Bei der Direktvermittlung schließen Sie mit der Agentur einen Vertrag, dessen Gegenstand Suche und Vorauswahl ist. Den Arbeitsvertrag schließen Sie danach unmittelbar mit der Person und tragen sämtliche Arbeitgeberpflichten. Das Verhältnis zum Anbieter endet damit faktisch – mit Ausnahme der Regelungen, die in die Zukunft reichen: Vergütung, Schutz vorgestellter Personen und Ersatz.',
            'Bei der Arbeitnehmerüberlassung ist die Struktur eine andere. Arbeitgeber bleibt die Agentur, mit Ihnen als Einsatzunternehmen schließt sie eine Vereinbarung über die vorübergehende Zuweisung, und Sie weisen der Person Arbeit zu und erteilen Weisungen. Der Vertrag regelt hier nicht nur die kaufmännischen Bedingungen, sondern auch die Aufteilung der Pflichten für Sicherheit und Gesundheit der Menschen, die an Ihrem Arbeitsplatz arbeiten.',
          ],
        },
        {
          heading: 'Was schriftlich vereinbart sein sollte',
          body: [
            'Unabhängig vom Modell gilt: Streit entsteht dort, wo man sich auf eine mündliche Absprache verlassen hat oder darauf, dass „das ist doch üblich“. Die folgende Aufzählung ist nicht abschließend, deckt aber die Punkte ab, die sich in der Praxis als entscheidend erweisen und deren Ergänzung nach dem Beginn der Zusammenarbeit meist einseitig nachteilig ist.',
          ],
          list: {
            items: [
              'Umfang des Auftrags: Stelle, Qualifikationsanforderungen, Arbeitsort, Schichtmodell',
              'Vergütung, die Grundlage ihrer Berechnung und ihre Fälligkeit',
              'Exklusivität und die Dauer, für die sie vereinbart wird',
              'Laufzeit des Vertrags und die Art seiner Verlängerung',
              'Schutz vorgestellter Personen und die Dauer, für die eine Vorstellung gilt',
              'Regelungen zu Ersatz oder zur Rückzahlung eines Teils der Vergütung bei vorzeitiger Beendigung',
              'Die Aufteilung der Verantwortung für Arbeitsschutz und Schutzausrüstung am Arbeitsplatz des Einsatzunternehmens',
              'Die Sicherstellung arbeitsmedizinischer Untersuchungen und die Übergabe der Informationen über Gefährdungen',
              'Der Umgang mit personenbezogenen Daten von Bewerberinnen, Bewerbern und Beschäftigten',
              'Die Art der Beendigung der Zusammenarbeit und die Abwicklung laufender Aufträge',
            ],
          },
        },
        {
          heading: 'Vergleichbare Bedingungen sind nicht verhandelbar',
          body: [
            'Bei der vorübergehenden Zuweisung haben überlassene Beschäftigte nach dem tschechischen Arbeitsgesetzbuch Anspruch auf Lohn- und Arbeitsbedingungen, die mit denen vergleichbarer Stammbeschäftigter des Einsatzunternehmens vergleichbar sind. Das ist kein Zugeständnis, an dem sich in der Verhandlung sparen ließe; es ist eine gesetzliche Anforderung, und ein Vertrag kann sie nur ausführen, nicht ändern oder ausschließen.',
            'Praktisch heißt das, dass das Einsatzunternehmen der Agentur die dafür nötigen Angaben geben muss: wer die vergleichbare Person ist, welche Entgeltbedingungen für die Arbeit gelten und welche Zuschläge und Ersatzleistungen an die Schichtplanung geknüpft sind. Die Einhaltung unterliegt der Kontrolle durch die tschechischen Arbeitsaufsichtsbehörden, und der Vertrag sollte deshalb bestimmen, wer diese Angaben liefert und wie sie aktualisiert werden, wenn sich die Bedingungen beim Einsatzunternehmen ändern.',
          ],
        },
        {
          heading: 'Arbeitsschutz, Schutzausrüstung und Untersuchungen',
          body: [
            'Den Arbeitsplatz führt das Einsatzunternehmen, formaler Arbeitgeber ist jedoch die Agentur – die Verantwortung ist deshalb nicht einseitig, und der Vertrag sollte sie in konkrete Aufgaben zerlegen statt in einen allgemeinen Satz über „Zusammenwirken“. Das Einsatzunternehmen kennt Gefährdungen, Umgebung und Anlagen; die Agentur führt die arbeitsrechtliche Dokumentation und ist Adressatin der Arbeitgeberpflichten.',
          ],
          list: {
            intro: 'In den Vertrag gehört vor allem:',
            items: [
              'Erst- und Wiederholungsunterweisungen über die Gefährdungen des konkreten Arbeitsplatzes',
              'Bereitstellung und Bezahlung der persönlichen Schutzausrüstung',
              'Übergabe der für arbeitsmedizinische Untersuchungen nötigen Angaben',
              'Erfassung der geleisteten Arbeitszeit und ihre Übergabe zwischen den Beteiligten',
              'Vorgehen bei einem Arbeitsunfall, einschließlich der Meldung und der Mitwirkung an seiner Untersuchung',
            ],
          },
        },
        {
          heading: 'Schutz der personenbezogenen Daten',
          body: [
            'Bei der Besetzung wandern Lebensläufe, Qualifikationsnachweise und weitere personenbezogene Daten zwischen den Beteiligten. Der Vertrag sollte bestimmen, in welchem Umfang sie übergeben werden, zu welchem Zweck Sie sie verwenden dürfen, wie lange Sie sie aufbewahren und was mit den Daten derjenigen geschieht, die nicht eintreten. Besonders sorgfältig sind Kopien von Nachweisen zu behandeln, die bei Fachpositionen üblich sind – von Zeugnissen bis zu Unterlagen über die gesundheitliche Eignung.',
            'Der Umfang der übergebenen Daten soll dem Zweck entsprechen. Sendet ein Anbieter mehr, als für die Besetzungsentscheidung nötig ist, ist das keine zusätzliche Leistung, sondern ein Risiko, das auf Sie übergeht.',
          ],
        },
        {
          heading: 'Ersatz bei vorzeitiger Beendigung und das Ende der Zusammenarbeit',
          body: [
            'Eine Ersatzregelung gehört zu den heiklen Punkten und zugleich zu denen, die erst dann behandelt werden, wenn sie gebraucht werden. Einen Ersatz sagen wir vorab nicht zu, und die Bedingungen für Ersatz oder die Rückzahlung eines Teils der Vergütung werden vor Beginn der Zusammenarbeit vereinbart, nicht nach einem Weggang. Es geht nicht um das Versprechen, dass es zu keinem Weggang kommt – ein solches Versprechen kann niemand geben. Es geht um die Vereinbarung, was geschieht, wenn es dazu kommt. Schriftlich gehören deshalb hinein: der maßgebliche Zeitraum, die Gründe, die dabei zählen, und die Fälle, die einen Anspruch ausschließen – Wegfall der Stelle, wesentliche Änderung des Auftrags, Beendigung durch das Einsatzunternehmen oder die Nichterfüllung der Eintrittsbedingungen auf dessen Seite.',
            'Ebenso klar sollte sein, wie die Zusammenarbeit endet: Kündigungsbedingungen, Abwicklung laufender Aufträge, das Schicksal bereits vorgestellter Personen und die Frage, welche Regelungen über die Beendigung hinaus fortgelten. Bei der vorübergehenden Zuweisung kommen der Widerruf der Zuweisung und der Nachlauf der Lohnansprüche der überlassenen Beschäftigten hinzu.',
          ],
        },
      ],
      cta: {
        label: 'Personalagentur auswählen',
        targetConceptId: 'choosing-an-agency',
        note: 'Die Prüfungen, die sich lohnen, bevor überhaupt ein Vertrag entworfen wird.',
      },
    },
  },
}
