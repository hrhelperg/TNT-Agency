import type { LocaleCorpus } from '../types'

/**
 * Deutsche Inhalte für den tschechischen Arbeitgeberkosten-Rechner.
 *
 * DIES IST TSCHECHISCHE LOHNABRECHNUNG, AUF DEUTSCH ERKLÄRT — kein deutscher,
 * österreichischer oder Schweizer Rechner. Das ist hier kein Detail, sondern
 * eine Build-Bedingung: scripts/validate-locale-jurisdiction.mjs lässt den Build
 * scheitern, wenn eine deutschsprachige Seite einen rechtlich aufgeladenen
 * Begriff — Mindestlohn, Sozialversicherung, zuständige Behörde — verwendet,
 * ohne davor oder an derselben Stelle Tschechien zu nennen, und zwar in der
 * Lesereihenfolge: Description, dann Intro, dann jede Überschrift und jeder
 * Absatz. Deshalb steht in jedem solchen Satz „tschechisch" — nicht aus Stil,
 * sondern weil ein deutscher Leser sonst zu Recht deutsches Recht liest.
 *
 * Auch die URL trägt es: /de/arbeitgeberkosten-rechner-tschechien.
 *
 * Die Listen unten sind Substanz, keine Dekoration. Die tschechische
 * Quellseite trägt ihre Struktur als Aufzählungen, und
 * scripts/validate-locale-fidelity.mjs prüft Punkt für Punkt gegen einen Hash
 * des Quelltexts, dass diese Seite dasselbe trägt.
 */
export const DE_CALCULATORS: LocaleCorpus = {
  'germany-employer-cost-calculator': {
    de: {
      title: 'Arbeitgeberkosten-Rechner Deutschland 2026 — Beiträge, Nettoentgelt, Gesamtkosten',
      description:
        'Berechnen Sie, was ein Beschäftigter einen deutschen Arbeitgeber 2026 kostet und was netto ankommt: Renten-, Arbeitslosen-, Kranken- und Pflegeversicherung, Lohnsteuer nach dem amtlichen Programmablaufplan, Nettoentgelt und Gesamtkosten — mit Angabe der Vorschrift zu jeder Position.',
      h1: 'Arbeitgeberkosten-Rechner Deutschland 2026',
      intro:
        'Das Bruttoentgelt ist weder das, was der Arbeitgeber zahlt, noch das, was der Beschäftigte erhält. Dazwischen stehen vier Zweige der deutschen Sozialversicherung, die Lohnsteuer nach dem amtlichen Programmablaufplan des Bundesministeriums der Finanzen, der Solidaritätszuschlag und je nach Person die Kirchensteuer — jeweils mit eigener Bemessungsgrundlage, eigener Beitragsbemessungsgrenze und eigener Rundungsregel. Diese Seite trägt einen Rechner, der sie nach dem in Deutschland für 2026 geltenden Recht ermittelt, und erklärt darunter, woher jede Zahl stammt. Zu jedem Satz ist die Vorschrift genannt; die Werte wurden am 24. August 2026 im Gesetzestext selbst, in der Sozialversicherungsrechengrößen-Verordnung 2026 und in den veröffentlichten Rechengrößen des GKV-Spitzenverbandes geprüft.',
      sections: [
        {
          heading: 'Was ein Beschäftigter einen deutschen Arbeitgeber kostet',
          body: [
            'Die gesetzlichen Lohnkosten in Deutschland haben drei Schichten: das Bruttoentgelt, den Arbeitgeberanteil an vier Zweigen der Sozialversicherung und die Umlagen, die der Arbeitgeber allein trägt. Bei einem gewöhnlichen Beschäftigten unterhalb der Beitragsbemessungsgrenzen macht der Arbeitgeberanteil an den vier Zweigen rund 21 % des Bruttoentgelts aus.',
            'Hinzu kommen die Umlagen U1, U2 und U3 sowie die gesetzliche Unfallversicherung. U1 und U2 legt jede Krankenkasse in ihrer Satzung selbst fest, sie unterscheiden sich zwischen den Kassen um ganze Prozentpunkte; die Unfallversicherung erhebt die Berufsgenossenschaft nach ihrem Gefahrtarif und rechnet erst nach Ablauf des Jahres ab. Für beide gibt es keinen allgemeinen Satz, den man unterstellen dürfte — der Rechner fragt danach, statt zu schätzen.',
            'Bei 4 000 € Bruttoentgelt im Monat und dem durchschnittlichen Zusatzbeitragssatz ergeben die vier Zweige zuzüglich der Insolvenzgeldumlage Arbeitgeberkosten von 4 852,00 €, also einen Faktor von 1,21 auf das Brutto. Die Umlagen U1 und U2 sowie die Unfallversicherung sind darin bewusst NICHT enthalten: für sie gibt es keinen allgemeinen Satz, jede genannte Zahl wäre erfunden. Oberhalb der Beitragsbemessungsgrenzen sinkt dieser Faktor, weil die Beiträge stehen bleiben und das Brutto weiter steigt.'
          ],
          list: {
            items: [
              'Bruttoentgelt',
              'Rentenversicherung — die Hälfte von 18,6 %',
              'Arbeitslosenversicherung — die Hälfte von 2,6 %',
              'Krankenversicherung — die Hälfte von 14,6 % zuzüglich der halben Zusatzbeitragssatzes der Kasse',
              'Pflegeversicherung — 1,8 % (in Sachsen 1,3 %)',
              'Insolvenzgeldumlage U3 in Höhe von 0,15 %',
              'Umlagen U1 und U2 nach der Satzung der Krankenkasse',
              'Gesetzliche Unfallversicherung nach dem Gefahrtarif der Berufsgenossenschaft',
            ],
          },
        },
        {
          heading: 'Zwei Grenzen, die ständig verwechselt werden',
          body: [
            'Deutschland kennt für 2026 zwei verschiedene Beitragsbemessungsgrenzen und eine dritte Zahl, die gar keine Grenze in diesem Sinne ist. Kranken- und Pflegeversicherung werden aus Entgelt bis 5 812,50 € monatlich bemessen, also 69 750 € im Jahr. Renten- und Arbeitslosenversicherung liegen höher: 8 450 € monatlich, 101 400 € im Jahr.',
            'Die dritte Zahl ist die Jahresarbeitsentgeltgrenze — 77 400 € im Jahr. Oberhalb davon darf sich ein Beschäftigter privat versichern. Sie ist keine Beitragsbemessungsgrenze und war es nie; wer beides verwechselt, setzt die Bemessungsgrundlage um 7 650 € im Jahr zu hoch an. Der Rechner hält beide Zahlen auseinander und benennt sie in der Methodik.',
            'Für 2026 gilt ein einziger Satz von Werten im ganzen Bundesgebiet. Die getrennte Grenze für die neuen Länder, die ältere Tabellen noch führen, steht in der Verordnung für 2026 nicht mehr — die Unterscheidung West und Ost spielt bei diesen Werten keine Rolle mehr.',
          ],
          list: {
            items: [
              'Kranken- und Pflegeversicherung: 5 812,50 € monatlich',
              'Renten- und Arbeitslosenversicherung: 8 450 € monatlich',
              'Jahresarbeitsentgeltgrenze: 77 400 € im Jahr — keine Beitragsbemessungsgrenze',
              'Bezugsgröße: 3 955 € monatlich',
            ],
          },
        },
        {
          heading: 'Die Lohnsteuer ist kein Prozentsatz',
          body: [
            'Die deutsche Lohnsteuer ist nicht Brutto mal Satz. Das Bundesministerium der Finanzen veröffentlicht jedes Jahr einen Programmablaufplan — einen verbindlichen Algorithmus aus 23 Unterprogrammen, der das Entgelt auf einen Jahreswert hochrechnet, die Pauschbeträge der jeweiligen Steuerklasse abzieht, eine Vorsorgepauschale aus fiktiven Beitragssätzen bildet, den Tarif nach § 32a EStG anwendet und das Ergebnis wieder auf den Lohnzahlungszeitraum umrechnet. Die Reihenfolge der Schritte ist Teil der Vorschrift, und jeder Zwischenwert hat eine vorgeschriebene Zahl von Dezimalstellen.',
            'Der Rechner führt diesen Ablauf Schritt für Schritt in der Fassung für 2026 aus (BMF-Schreiben vom 12. November 2025). Die Umsetzung reproduziert beide amtlichen Prüftabellen vollständig, die zum Algorithmus veröffentlicht werden — 516 Werte über alle sechs Steuerklassen, sowohl für einen in allen Zweigen versicherten als auch für einen in keinem Zweig versicherten Beschäftigten.',
            'Die Steuerklasse entscheidet nicht über die Jahressteuer, sondern nur über ihre Verteilung im Jahr. Die Klassen V und VI folgen einer eigenen Konstruktion mit einer Untergrenze von 14 % und einer Obergrenze von 42 % und lassen sich daher nicht aus dem gewöhnlichen Tarif ableiten.',
          ],
        },
        {
          heading: 'Pflegeversicherung: Kinder, Kinderlosigkeit und Sachsen',
          body: [
            'Die Pflegeversicherung ist der einzige Zweig, in dem sich die beiden Anteile unterscheiden. Der Beitragssatz beträgt 3,6 %; § 55 Absatz 1 SGB XI nennt weiterhin 3,4 %, und der tatsächlich geltende Satz stammt aus einer Verordnung nach Absatz 1a — wer nur das Gesetz liest, rechnet mit 0,2 Punkten zu wenig.',
            'Ein Beschäftigter ohne Kinder zahlt ab dem Ablauf des Monats, in dem er 23 wird, einen Zuschlag von 0,6 Punkten. Umgekehrt senkt jedes zweite bis fünfte Kind unter 25 Jahren seinen Anteil um 0,25 Punkte. Beides trägt der Beschäftigte allein: der Arbeitgeberanteil beträgt in jeder Familiensituation 1,8 %. Der Gesetzeswortlaut liest sich, als senke der Abschlag den ganzen Beitragssatz und damit auch den Arbeitgeberanteil — die veröffentlichten Beitragstabellen der Kassen und der amtliche Steueralgorithmus zeigen das Gegenteil.',
            'In Sachsen gilt § 58 Absatz 3 SGB XI: der Beschäftigte trägt einen Prozentpunkt allein, der Rest wird geteilt, also 2,3 % Beschäftigter gegen 1,3 % Arbeitgeber. Der Gesamtsatz ändert sich nicht — der Punkt wird verschoben, nicht hinzugefügt.',
          ],
          list: {
            items: [
              'Beitragssatz 3,6 %, hälftig geteilt',
              'Kinderloser Beschäftigter ab 23: +0,6 Punkte, allein getragen',
              'Zweites bis fünftes Kind unter 25: je −0,25 Punkte, nur beim Beschäftigten',
              'Sachsen: 2,3 % Beschäftigter / 1,3 % Arbeitgeber',
            ],
          },
        },
        {
          heading: 'Der Zusatzbeitragssatz ist keine einzelne Zahl',
          body: [
            'Neben dem allgemeinen Beitragssatz von 14,6 % erhebt jede deutsche Krankenkasse nach § 242 SGB V einen eigenen Zusatzbeitragssatz. Das Bundesministerium für Gesundheit gibt lediglich einen Durchschnitt bekannt — 2,9 % für 2026 —, und dieser Durchschnitt gilt nur für die im Gesetz genannten Fälle. Der Satz einer bestimmten Kasse kann deutlich darüber oder darunter liegen.',
            'Seit dem 1. Januar 2019 wird der Zusatzbeitrag ebenso hälftig geteilt wie der allgemeine Satz. Ältere Darstellungen, nach denen ihn der Beschäftigte allein trägt, sind überholt, und der Unterschied ist erheblich: bei 2,9 % sind es rund 1,45 % des Bruttoentgelts auf der Arbeitgeberseite.',
            'Der Rechner nimmt den Zusatzbeitragssatz deshalb als Eingabe entgegen, vorbelegt mit dem Durchschnitt von 2,9 % und ausdrücklich als Voreinstellung gekennzeichnet — nicht als Tatsache über einen bestimmten Beschäftigten.',
          ],
        },
        {
          heading: 'Was der Rechner nicht berechnet, und warum',
          body: [
            'Eine geringfügige Beschäftigung und eine Beschäftigung im Übergangsbereich rechnet er nicht. Bis 603 € im Monat zahlt der Arbeitgeber pauschale Beiträge statt der gewöhnlichen; von dort bis 2 000 € wird die beitragspflichtige Einnahme durch den Faktor F vermindert und der Arbeitgeber trägt die Differenz. Keines von beiden ist eine kleinere Fassung der gewöhnlichen Rechnung — es ist ein anderes Regime, und die gewöhnliche Rechnung lieferte eine plausibel aussehende Antwort auf eine andere Frage.',
            'Ebenso abgelehnt werden Fälle, die sich aus den Zahlen nicht erkennen lassen und nach denen der Rechner deshalb fragt: private Krankenversicherung, Beamte, Mehrfachbeschäftigung, beschäftigte Rentner, die knappschaftliche Versicherung, berufsständische Versorgungswerke, Kurzarbeit, Einmalzahlungen, grenzüberschreitende Sachverhalte und Sachbezüge. Zu jedem Fall wird der Grund genannt.',
            'Auch die Kappung der Kirchensteuer-Progression bleibt außen vor. Sie wird in der Regel erst bei der Veranlagung und meist auf Antrag gewährt, ihre Bemessungsgrundlage ist das zu versteuernde Einkommen, das der Arbeitgeber nicht kennt, und der Satz folgt dem Beschluss der jeweiligen Religionsgemeinschaft. Der Arbeitgeber behält den ungekappten Betrag ein, und der Rechner zeigt dasselbe — mit dem Hinweis, dass es die Kappung gibt.',
          ],
          list: {
            items: [
              'Geringfügige Beschäftigung bis 603 € monatlich',
              'Übergangsbereich bis 2 000 € monatlich',
              'Private Krankenversicherung',
              'Beamte und Mitglieder berufsständischer Versorgungswerke',
              'Mehrfachbeschäftigung',
              'Einmalzahlungen und Sachbezüge',
            ],
          },
        },
        {
          heading: 'Kirchensteuer, Solidaritätszuschlag und Kinderfreibetrag',
          body: [
            'Die Kirchensteuer wird nach dem Satz einbehalten, der am Ort der BETRIEBSSTÄTTE gilt, nicht am Wohnort: 8 % in Bayern und Baden-Württemberg, 9 % in den übrigen vierzehn Ländern. Bei einem Beschäftigten, der in Bayern wohnt und in Hessen arbeitet, werden also 9 % einbehalten, und die Differenz gleicht die Veranlagung aus. Sie wird dem Beschäftigten abgezogen, verändert also das Nettoentgelt und nie die Arbeitgeberkosten.',
            'Der Kinderfreibetrag senkt die Lohnsteuer nicht. Er senkt allein die Bemessungsgrundlage für den Solidaritätszuschlag und die Kirchensteuer, weil Familien während des Jahres Kindergeld erhalten; erst die Veranlagung vergleicht, was günstiger ist. Ein Rechner, der die Lohnsteuer mit jedem Freibetrag fallen ließe, beschriebe die Veranlagung und nicht die Abrechnung.',
            'Das Ergebnis bildet einen vollen Monat bei gleichbleibendem Entgelt ab und ist keine Lohnabrechnung. Die tatsächliche Abrechnung arbeitet mit unvollständigen Monaten, Einmalzahlungen, Sachbezügen und individuellen ELStAM-Daten, die der Rechner nicht kennt.',
          ],
        },
        {
          heading: 'Quellen und Methodik',
          body: [
            'Die Lohnsteuer folgt dem Programmablaufplan des Bundesministeriums der Finanzen für 2026, die Sozialversicherung dem SGB III, V, VI und XI, die Beitragsarithmetik der Beitragsverfahrensverordnung und die Grenzen der Sozialversicherungsrechengrößen-Verordnung 2026 (BGBl. 2025 I Nr. 278). Die Werte wurden am 24. August 2026 im Gesetzestext selbst geprüft und mit den Rechengrößen des GKV-Spitzenverbandes vom 26. November 2025 abgeglichen.',
            'Die Beiträge werden so berechnet, wie § 2 Absatz 1 BVV es vorschreibt: bei hälftig geteilten Zweigen wird der halbe Beitragssatz angewendet, das Ergebnis gerundet und erst dann verdoppelt. Das ist nicht dasselbe, wie den ganzen Beitrag zu berechnen und zu halbieren — beide Wege unterscheiden sich bei gewöhnlichen Gehältern um einen Cent. Zwischenergebnisse werden nach § 1 Absatz 2 BVV überhaupt nicht gerundet.',
            'Die Regeln werden nach Jahrgängen geführt. Ein Ergebnis für 2026 bleibt reproduzierbar, auch nachdem die Werte für 2027 vorliegen. Erwähnenswert: das Gesetz zur Stabilisierung der Beitragssätze in der gesetzlichen Krankenversicherung vom 24. Juli 2026 hat § 223 SGB V mitten im Jahr geändert — sämtliche Regelungen greifen jedoch erst ab 2027 und berühren keine Abrechnung des Jahres 2026.',
          ],
        },
      ],
      breadcrumb: 'Arbeitgeberkosten-Rechner Deutschland',
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Geht es um eine konkrete Stelle? Beschreiben Sie die Position, wir gehen die Möglichkeiten durch.',
      },
    },
  },

  'employer-cost-calculator': {
    de: {
      title: 'Arbeitgeberkosten-Rechner Tschechien 2026 — Abgaben, Nettolohn, Gesamtkosten',
      description:
        'Berechnen Sie, was ein Beschäftigter einen tschechischen Arbeitgeber 2026 kostet und was netto bleibt: tschechische Sozial- und Krankenversicherung, Lohnsteuervorauszahlung und Gesamtkosten — mit Angabe der Rechtsgrundlage zu jeder Position.',
      h1: 'Arbeitgeberkosten-Rechner Tschechien 2026',
      intro:
        'Das Bruttogehalt ist weder das, was der Arbeitgeber zahlt, noch das, was der Beschäftigte erhält. Dazwischen stehen die tschechische Sozialversicherung, die tschechische Krankenversicherung und die monatliche Lohnsteuervorauszahlung — jede mit eigener Bemessungsgrundlage, eigener Rundungsregel und eigenen Ausnahmen. Diese Seite trägt einen Rechner, der sie nach dem in der Tschechischen Republik für 2026 geltenden Recht ermittelt, und erklärt darunter, woher jede Zahl stammt. Zu jedem Satz ist die tschechische Vorschrift genannt; die Werte wurden am 24. August 2026 bei ČSSZ, der tschechischen Finanzverwaltung, dem tschechischen Arbeitsministerium und den tschechischen Krankenversicherungen geprüft.',
      sections: [
        {
          heading: 'Was ein Beschäftigter einen tschechischen Arbeitgeber kostet',
          body: [
            'Die gesetzlichen Lohnkosten in Tschechien bestehen aus vier Teilen. Bei einem gewöhnlichen Beschäftigten sind die ersten drei durch tschechisches Recht festgelegt und fallen bei gleichem Brutto für jeden Arbeitgeber im Land gleich aus; der vierte hängt von der Tätigkeit des Unternehmens ab.',
            'Arbeitgeberanteile zur tschechischen Sozial- und Krankenversicherung ergeben zusammen 33,8 % des Bruttolohns. Bei 40 000 CZK brutto sind das 13 520 CZK zusätzlich, also gesetzliche Kosten von 53 520 CZK im Monat — noch ohne die gesetzliche tschechische Unfallhaftpflichtversicherung und ohne alles, was das Unternehmen über den Lohn hinaus gewährt.',
            'Der Rechner hält diese beiden Ebenen bis zum Schluss getrennt. Die gesetzlichen Kosten sind eine Rechtstatsache; Benefits, Unterkunft, Ausstattung und Rekrutierung sind Entscheidungen eines einzelnen Unternehmens. Beides in eine Zahl zu addieren hieße, Unternehmensentscheidungen als Gesetz auszugeben.',
          ],
          list: {
            items: [
              'Bruttogehalt',
              'Arbeitgeberanteil zur tschechischen Sozialversicherung 24,8 %',
              'Arbeitgeberanteil zur tschechischen Krankenversicherung — zwei Drittel von 13,5 %',
              'Gesetzliche tschechische Unfallhaftpflichtversicherung nach der überwiegenden Tätigkeit des Arbeitgebers',
            ],
          },
        },
        {
          heading: 'Brutto und netto: was wovon abgezogen wird',
          body: [
            'Dem Beschäftigten werden 7,1 % zur tschechischen Sozialversicherung abgezogen, ein Drittel des Krankenversicherungsbeitrags von 13,5 % sowie die monatliche Lohnsteuervorauszahlung. Die frühere tschechische „Supergrundlage" ist abgeschafft — Bemessungsgrundlage sind nach § 6 Abs. 12 des tschechischen Einkommensteuergesetzes schlicht die Einkünfte aus unselbständiger Tätigkeit, das Brutto wird also nicht um Arbeitgeberbeiträge erhöht.',
            'Die andere Hälfte desselben Irrtums ist ebenso verbreitet: Die eigenen Beiträge des Beschäftigten sind NICHT von der Bemessungsgrundlage abziehbar. Grundlage ist das Brutto, nicht das Brutto abzüglich 7,1 % und 4,5 %.',
            'Bei 40 000 CZK brutto und unterzeichneter tschechischer Arbeitnehmererklärung beträgt der Nettolohn 31 930 CZK: 2 840 CZK Sozialversicherung, 1 800 CZK Krankenversicherung und 3 430 CZK Steuervorauszahlung nach der Grundermäßigung von 2 570 CZK.',
          ],
        },
        {
          heading: 'Arbeitgeberanteil zur tschechischen Sozialversicherung',
          body: [
            'Der Regelsatz des Arbeitgebers beträgt 24,8 % der Bemessungsgrundlage nach § 7 des tschechischen Gesetzes Nr. 589/1992 Sb. und teilt sich in 21,5 % Rentenversicherung, 2,1 % Krankengeldversicherung und 1,2 % staatliche Beschäftigungspolitik. Der Beschäftigte zahlt 7,1 %.',
            '24,8 % ist aber nicht ohne Weiteres „der Arbeitgebersatz". Das tschechische Recht kennt drei Satzgruppen, und die Risikogruppe ist jahresgebunden — 28,8 % im Jahr 2027 und 29,8 % ab 2028 —, sie darf also nie zwischen Jahren übernommen werden. Der Rechner bietet alle drei an, voreingestellt ist die Regelgruppe.',
            'Wichtig ist die Untergrenze: Erreicht das Monatseinkommen die maßgebliche tschechische Schwelle von 4 500 CZK nicht, begründet die Beschäftigung keine Teilnahme an der tschechischen Krankengeldversicherung, und es fallen überhaupt keine Sozialbeiträge an — weder für den Beschäftigten noch für den Arbeitgeber. Die tschechische Krankenversicherung kennt keine solche Schwelle.',
          ],
          list: {
            items: [
              'Gewöhnlicher Beschäftigter 24,8 %',
              'Rettungssanitäter und Mitglieder der Werkfeuerwehr 29,8 %',
              'Risikotätigkeit 27,8 % im Jahr 2026 (28,8 % 2027, 29,8 % ab 2028)',
              'Unterhalb der Teilnahmeschwelle von 4 500 CZK zahlt keine Seite Sozialbeiträge',
            ],
          },
        },
        {
          heading: 'Tschechische Krankenversicherung: ein Satz, eine Rundung, dann Drittel',
          body: [
            'Hier irren die meisten Rechner. Das tschechische Gesetz kennt einen einzigen Satz: „Výše pojistného činí 13,5 % z vyměřovacího základu" (§ 2 Abs. 1 Gesetz Nr. 592/1992 Sb.). Der Beitrag wird einmal auf volle Kronen aufgerundet (§ 2 Abs. 2), und erst das ERGEBNIS wird geteilt — ein Drittel trägt der Beschäftigte, zwei Drittel der Arbeitgeber (§ 9 Abs. 2 Gesetz Nr. 48/1997 Sb.).',
            'Die Sätze 9 % und 4,5 % stehen nicht im Gesetz. Die Zeichenfolge „4,5" kommt im Gesetz Nr. 592/1992 Sb. kein einziges Mal vor, und § 9 Abs. 1 des Gesetzes Nr. 48/1997 Sb. sagt ausdrücklich, dass die Beitragshöhe ein anderes Gesetz bestimmt — dieses teilt also nur einen anderswo bezifferten Betrag.',
            'Der Unterschied ist nicht akademisch. Bei einer Bemessungsgrundlage von 22 401 CZK ergibt der richtige Weg 3 025 CZK (0,135 × 22 401 = 3 024,135, aufgerundet). Zwei getrennt aufgerundete Sätze ergeben 1 009 + 2 017 = 3 026 CZK — eine Krone zu viel und eine Meldung, die nicht aufgeht.',
          ],
        },
        {
          heading: 'Mindestbemessungsgrundlage der tschechischen Krankenversicherung',
          body: [
            'Mindestbemessungsgrundlage eines Beschäftigten ist der tschechische Mindestlohn: 22 400 CZK monatlich für 2026 (§ 3 Abs. 6 Gesetz Nr. 592/1992 Sb.). Der Mindestbeitrag daraus beträgt genau 3 024 CZK.',
            'Die Mindestgrundlage wird bei Teilzeit NICHT gekürzt. Die tschechische Krankenkasse VZP formuliert es wörtlich — „ohne Rücksicht auf die Dauer der Arbeitszeit" —, sodass auch ein Beschäftigter mit einem 20-Prozent-Vertrag der vollen Grenze von 22 400 CZK gegenübersteht. Das ist der häufigste Fehler in tschechischen Lohnrechnern.',
            'Entscheidend ist, wer die Differenz trägt. Im Regelfall trägt der BESCHÄFTIGTE allein 13,5 % der Differenz zwischen tatsächlicher und Mindestbemessungsgrundlage, abgeführt über den Arbeitgeber — der Aufschlag wird nicht gedrittelt und erhöht die Arbeitgeberkosten nicht. Die Ausnahme gilt, wenn die niedrige Grundlage auf einem Hindernis aufseiten des Arbeitgebers beruht; dann trägt sie der Arbeitgeber (§ 3 Abs. 10). Der Rechner kann das aus Zahlen nicht ableiten und fragt danach.',
            'Für 2026 umfassen die Ausnahmen fünf Fälle, die jeweils den ganzen Kalendermonat andauern müssen. Das tschechische Gesetz Nr. 289/2025 Sb. hat zum 1. Januar 2026 den bisherigen Buchstaben zur Kinderbetreuung aufgehoben und die übrigen neu bezeichnet; betreuende Eltern erreichen eine Ausnahme nur noch über die Kategorie, in der der tschechische Staat Beitragszahler ist.',
          ],
          list: {
            items: [
              'Inhaber eines tschechischen ZTP- oder ZTP/P-Ausweises',
              'Person im Rentenalter, die keinen Anspruch auf eine tschechische Altersrente erworben hat',
              'Person, die zugleich selbständig tätig ist und Vorauszahlungen mindestens aus der Mindestgrundlage für Selbständige leistet',
              'Person, für die der tschechische Staat Beitragszahler ist',
              'Person, die ausschließlich Pflegeelternvergütung erhält',
            ],
          },
        },
        {
          heading: 'Jahreshöchstbemessungsgrundlage der tschechischen Sozialversicherung',
          body: [
            'Die Höchstbemessungsgrundlage beträgt für 2026 2 350 416 CZK, das 48-Fache des gesetzlichen tschechischen Durchschnittslohns von 48 967 CZK (§ 15a Gesetz Nr. 589/1992 Sb.). Es handelt sich um eine JÄHRLICHE, KUMULATIVE Grenze und nicht um eine Monatsgrenze — die Lohnabrechnung muss also eine laufende Jahressumme führen.',
            'Oberhalb der Grenze zahlt auch der Arbeitgeber nicht mehr. § 15a Abs. 4 nimmt den übersteigenden Betrag auch aus der Bemessungsgrundlage des Arbeitgebers heraus, sodass die Grenzbelastung oberhalb der Höchstgrenze 0 % + 0 % beträgt und nicht 0 % + 24,8 %. Das ist das Gegenteil dessen, was üblicherweise geschrieben wird.',
            'Das Aussetzen gilt allerdings nur, wenn der Beschäftigte im Jahr bei einem einzigen tschechischen Arbeitgeber beschäftigt ist. Bei mehreren Arbeitgebern zahlt keiner weniger; der Beschäftigte fordert die Überzahlung selbst zurück, und der Arbeitgeberanteil wird nicht erstattet.',
            'Ein einzelnes Monatsgehalt enthält diese Information nicht. Der Rechner sagt daher entweder ausdrücklich, dass er von einem noch nicht erreichten Höchstwert ausgeht, oder fragt im erweiterten Modus nach der seit Jahresbeginn genutzten Grundlage. So zu tun, als genüge eine Monatszahl, wäre eine stille Schätzung über Hunderttausende von Kronen.',
          ],
        },
        {
          heading: 'Einkommensteuer des Beschäftigten und die Monatsvorauszahlung',
          body: [
            'Das Verfahren regelt § 38h des tschechischen Einkommensteuergesetzes, und seine Reihenfolge ist verbindlich. Zuerst wird die Grundlage aufgerundet — bis 100 CZK auf volle Kronen, darüber auf volle Hundert. Dann gelten 15 % bis zur Monatsgrenze von 146 901 CZK und 23 % darüber. Die Summe wird auf volle Kronen aufgerundet, und erst danach werden Ermäßigungen abgezogen.',
            'Die Grenze von 146 901 CZK ist das Dreifache des Durchschnittslohns von 48 967 CZK und wird mit der GERUNDETEN Grundlage verglichen. Das hat eine unerwartete Folge: Ein Bruttogehalt von genau 146 901 CZK wird auf 147 000 CZK gerundet, sodass 99 CZK in das 23-Prozent-Band fallen.',
            'Ohne unterzeichnete tschechische Arbeitnehmererklärung wird monatlich nichts angerechnet — weder die Grundermäßigung von 2 570 CZK (sleva na poplatníka) noch der Kindersteuerermäßigung (daňové zvýhodnění na dítě) (§ 38h Abs. 5). Der Beschäftigte erhält sie erst im tschechischen Jahresausgleich oder in der Steuererklärung. Wer nicht in Tschechien ansässig ist, kann monatlich nur die Grundermäßigung (sleva na poplatníka) geltend machen; Ermäßigungen für Invalidität und ZTP/P erst im Jahresausgleich.',
            'Auch innerhalb eines gewöhnlichen tschechischen Arbeitsverhältnisses kann eine Quellensteuer greifen: Ist keine Erklärung unterzeichnet und erreicht das Monatseinkommen 4 500 CZK nicht, bildet das Einkommen eine gesonderte Bemessungsgrundlage mit pauschal 15 % ohne jede Ermäßigung, wobei Grundlage und Steuer ABGERUNDET werden. Bei Vollzeit tritt das nie ein, bei Eintritt in der Monatsmitte oder unbezahltem Urlaub schon.',
          ],
          list: {
            items: [
              'Grundermäßigung für Steuerpflichtige (sleva na poplatníka) 2 570 CZK monatlich',
              'Invalidität 1. und 2. Grades 210 CZK, 3. Grades 420 CZK monatlich',
              'Inhaber eines tschechischen ZTP/P-Ausweises 1 345 CZK monatlich',
              'Kindersteuerermäßigung 1 267 / 1 860 / 2 320 CZK nach Reihenfolge, bei einem Kind mit ZTP/P-Ausweis das Doppelte',
            ],
          },
        },
        {
          heading: 'Der tschechische Steuerbonus für Kinder',
          body: [
            'Übersteigt die Kindersteuerermäßigung die berechnete Steuer, wird die Differenz zum monatlichen tschechischen Steuerbonus, den der Arbeitgeber an den Beschäftigten auszahlt. Ein Bonus ist kein Lohn, und der Rechner bezeichnet ihn nie so — er ist der ausgezahlte Teil einer tschechischen Steuerermäßigung.',
            'Ausgezahlt wird er nur, wenn zwei Bedingungen zusammentreffen: Der Bonus muss mindestens 50 CZK betragen, und das Monatseinkommen bei diesem Zahler muss mindestens die Hälfte des tschechischen Mindestlohns erreichen, also 11 200 CZK für 2026 (§ 35d Abs. 4). Eine Obergrenze für den Bonus gibt es nicht.',
            'Bei niedrigeren Löhnen mit mehreren Kindern kann der Nettobetrag daher über dem Bruttobetrag liegen. Das ist kein Rechenfehler, sondern genau der Zweck des Kindersteuerermäßigung.',
          ],
        },
        {
          heading: 'Gesetzliche tschechische Unfallhaftpflichtversicherung des Arbeitgebers',
          body: [
            'Die gesetzliche Versicherung der Arbeitgeberhaftung für Arbeitsunfälle und Berufskrankheiten ist eine echte Arbeitgeberkostenposition und gehört in jede Gesamtrechnung. Sie entsteht kraft tschechischen Gesetzes ohne Vertragsabschluss, und zwei Versicherer führen sie nach einem historischen Schlüssel durch: Generali Česká pojišťovna für Arbeitgeber, die am 31. Dezember 1992 bei der Česká pojišťovna versichert waren, Kooperativa für alle übrigen.',
            'Für den gesamten Arbeitgeber gilt ein einziger Satz, bestimmt durch die überwiegende Geschäftstätigkeit (§ 12 Abs. 2 der tschechischen Verordnung Nr. 125/1993 Sb.). Die Tabelle hat acht Stufen von 2,8 ‰ bis 50,4 ‰ der Bemessungsgrundlage, und die Verordnung schreibt an keiner Stelle eine Rundung vor.',
            'Bemessungsgrundlage ist die Summe der Bemessungsgrundlagen aller Beschäftigten des VORQUARTALS, zahlbar bis zum Ende des ersten Monats des versicherten Quartals. Die tschechische Jahreshöchstbemessungsgrundlage wird auf diesen Beitrag nicht angewendet — beide Durchführungsversicherer veröffentlichen das, die Verordnung selbst sagt es nicht, und der Rechner weist auf diese schwächere Grundlage hin.',
            'Jeder Betrag je Beschäftigtem ist daher ein ZUGERECHNETER Anteil und keine Rechnung. Aus demselben Grund wird der Mindestbeitrag von 100 CZK je Quartal dem Anteil eines einzelnen Beschäftigten nicht hinzugerechnet: Er ist eine Untergrenze für den gesamten Arbeitgeber.',
          ],
        },
        {
          heading: 'Was der Rechner abdeckt',
          body: [
            'Der Rechner bildet ein gewöhnliches tschechisches Arbeitsverhältnis (HPP) nach den Regeln für 2026 ab und nennt zu jeder Zahl den Satz, die Grundlage, die angewandte Rundung und die tschechische Vorschrift.',
          ],
          list: {
            items: [
              'Sozialversicherung von Arbeitnehmer und Arbeitgeber einschließlich der Jahreshöchstgrenze',
              'Krankenversicherung einschließlich Mindestbemessungsgrundlage und Zuordnung des Aufschlags',
              'Steuervorauszahlung nach § 38h, Steuerermäßigungen und Kindersteuerermäßigung',
              'Quellensteuer dort, wo das tschechische Recht sie vorsieht',
              'Arbeitgeberermäßigung bei verkürzter Arbeitszeit, soweit ihre Voraussetzungen messbar sind',
              'Ermäßigung für erwerbstätige Altersrentner',
              'Gesetzliche Unfallhaftpflichtversicherung als zugerechneter Anteil',
              'Unternehmenskosten über den Lohn hinaus als eigene Ebene',
            ],
          },
        },
        {
          heading: 'Was er nicht abdeckt, und warum',
          body: [
            'Die folgende Liste ist keine Aufzählung fehlender Funktionen. Jeder Punkt ist ein Fall, in dem sich die Regel nicht aus einer Primärquelle belegen lässt oder in dem eine rechtliche Wertung nötig ist, die keine Zahl liefern kann. Dann sagt der Rechner, dass der Fall eine individuelle tschechische Lohnabrechnung erfordert, statt eine fast richtige Zahl zurückzugeben.',
            'Die tschechischen Vereinbarungen DPP und DPČ fehlen in dieser Version vollständig. Sie haben eigene Teilnahmeschwellen und eine eigene Besteuerung, und eine halb geprüfte Umsetzung wäre schlechter als keine.',
          ],
          list: {
            items: [
              'Rundung der Krankenversicherungsdrittel, wenn der Beitrag nicht durch drei teilbar ist — weder Gesetz noch Methodik regeln sie',
              'Die genaue Formel der anteiligen Kürzung der Mindestgrundlage in einem unvollständigen Monat',
              'Aufteilung des Aufschlags, wenn die niedrige Grundlage teils auf einem Arbeitgeberhindernis und teils auf anderem beruht',
              'Tschechische Lohnfortzahlung des Arbeitgebers für die ersten 14 Krankheitstage',
              'Gleichzeitige Beschäftigung bei mehreren Arbeitgebern',
              'Die Vereinbarungen DPP und DPČ',
            ],
          },
        },
        {
          heading: 'Urlaub und Krankheit in Tschechien: warum sie nicht aufgeschlagen werden',
          body: [
            'Die vier Wochen Urlaub nach tschechischem Arbeitsrecht werden dem Monatsgehalt NICHT als weiterer Prozentsatz hinzugerechnet. Bei monatlicher Vergütung ist bezahlter Urlaub bereits Teil der Vergütungsstruktur — ein Monat mit Urlaub kostet dasselbe wie einer ohne. Urlaub gesondert aufzuschlagen hieße, denselben Lohn doppelt zu zählen.',
            'Wer die Kosten der Vertretung während der Abwesenheit abbilden will, bildet Betriebskosten ab und nicht einen höheren Lohn. Sie lassen sich in den Feldern für zusätzliche Kosten eintragen, der Rechner erfindet sie aber nie.',
            'Ebenso ist keine „durchschnittliche Krankheitsquote" eingebaut. Diese Version berechnet die tschechische Lohnfortzahlung für die ersten 14 Tage der Arbeitsunfähigkeit nicht — in Tschechien trägt der Arbeitgeber diese 14 Tage (§ 192 des tschechischen Arbeitsgesetzbuchs), nicht die sechs Wochen des deutschen Rechts —, weil die Reduktionsmechanik und ihre Rundung nicht vollständig aus Primärquellen belegbar sind — ein erfundener Durchschnitt wäre schlechter als eine offen benannte Lücke.',
          ],
        },
        {
          heading: 'Quellen und Methodik',
          body: [
            'Jeder Satz, jede Grenze und jeder Betrag im Rechner trägt in den Daten seine Quelle, seine Rechtsgrundlage und seinen Prüfstatus. Die Werte wurden am 24. August 2026 bei der tschechischen Sozialversicherungsanstalt, der tschechischen Finanzverwaltung, dem tschechischen Ministerium für Arbeit und Soziales sowie den tschechischen Krankenversicherungen geprüft; die Satztabelle der Unfallversicherung stammt aus der Verordnung Nr. 125/1993 Sb. und der Methodik ihrer Durchführungsversicherer.',
            'Die Regeln sind nach Jahren versioniert. Eine Berechnung für 2026 bleibt reproduzierbar, auch nachdem die tschechischen Regierungsverordnungen für 2027 erschienen sind, weil diese daneben treten und die alten nicht überschreiben. Der Herbst ist zugleich der Zeitpunkt, zu dem dieser Satz erneut zu prüfen ist, denn dann werden die Parameter des Folgejahres bekannt.',
            'Wo Quellen auseinandergehen oder eine Regel nur ein Prinzip ohne Formel nennt, sagt der Rechner dies an der betreffenden Position. Das betrifft die Rundung der Krankenversicherungsdrittel, die anteilige Kürzung der Mindestgrundlage und die Nichtanwendung der Jahreshöchstgrenze auf die Unfallversicherung.',
          ],
        },
        {
          heading: 'Häufige Fragen',
          body: [
            'Wie viel Prozent zahlt ein tschechischer Arbeitgeber 2026 über das Brutto hinaus? Bei einem gewöhnlichen Beschäftigten 24,8 % zur tschechischen Sozialversicherung und zwei Drittel des Krankenversicherungsbeitrags von 13,5 % — zusammen 33,8 % des Bruttolohns. Hinzu kommt die gesetzliche Unfallhaftpflichtversicherung mit einem Satz zwischen 2,8 ‰ und 50,4 ‰ je nach überwiegender Tätigkeit.',
            'Gibt es die tschechische Supergrundlage noch? Nein. Sie ist abgeschafft, und nach § 6 Abs. 12 sind Bemessungsgrundlage schlicht die Einkünfte aus unselbständiger Tätigkeit; das Brutto wird nicht um Arbeitgeberbeiträge erhöht. Ebenso sind die eigenen Beiträge des Beschäftigten nicht abziehbar.',
            'Warum 13,5 % statt 9 % plus 4,5 %? Weil 9 % und 4,5 % nicht im Gesetz stehen. Das tschechische Gesetz Nr. 592/1992 Sb. kennt einen Satz von 13,5 %; der Beitrag wird auf volle Kronen aufgerundet, und erst das Ergebnis wird geteilt — ein Drittel Beschäftigter, zwei Drittel Arbeitgeber. Beide Sätze getrennt zu rechnen und je zu runden ergibt einen um eine Krone zu hohen Beitrag.',
            'Wer zahlt den Aufschlag auf die Mindestbemessungsgrundlage? Im Regelfall der Beschäftigte allein, abgeführt über den Arbeitgeber — die 13,5 % auf die Differenz werden nicht gedrittelt. Der Arbeitgeber trägt sie nur, wenn die niedrige Grundlage auf einem Hindernis aufseiten des Arbeitgebers beruht.',
            'Wird die Mindestbemessungsgrundlage bei Teilzeit gekürzt? Nein. Die tschechische Krankenkasse VZP stellt ausdrücklich fest, dass die Mindestgrundlage ohne Rücksicht auf die Dauer der Arbeitszeit gilt; ein Beschäftigter mit 20-Prozent-Vertrag steht der vollen Grenze von 22 400 CZK gegenüber. Die anteilige Kürzung nach Kalendertagen ist eine andere Regel und betrifft unvollständige Monate oder gesetzlich genannte Hindernisse.',
            'Was geschieht nach Erreichen der Höchstbemessungsgrundlage? Bei einem Beschäftigten mit nur einem tschechischen Arbeitgeber im Jahr zahlen weder Beschäftigter noch Arbeitgeber auf den Betrag über 2 350 416 CZK. Bei mehreren Arbeitgebern zahlt keiner weniger; der Beschäftigte fordert die Überzahlung zurück, der Arbeitgeberanteil wird nicht erstattet.',
            'Wann kann das Netto höher sein als das Brutto? Wenn die Kindersteuerermäßigung die berechnete Steuer übersteigt und ein monatlicher tschechischer Steuerbonus entsteht. Er wird gezahlt, wenn er mindestens 50 CZK erreicht und das Monatseinkommen mindestens die Hälfte des tschechischen Mindestlohns beträgt, also 11 200 CZK für 2026. Der Bonus ist kein Lohn, sondern der ausgezahlte Teil einer tschechischen Steuerermäßigung.',
            'Rechnet der Rechner DPP und DPČ? Nein. Diese tschechischen Vereinbarungen haben eigene Teilnahmeschwellen und eine eigene Besteuerung; diese Version schließt sie bewusst aus — eine teilweise Umsetzung lieferte Zahlen, die richtig aussehen und es nicht sind.',
            'Rechnet der Rechner vier Wochen Urlaub auf die Kosten auf? Nein, und das ist Absicht. Bei monatlicher Vergütung ist bezahlter Urlaub Teil der Vergütungsstruktur; ihn als weiteren Prozentsatz aufzuschlagen hieße, denselben Lohn doppelt zu zählen. Die Kosten der Vertretung lassen sich gesondert als Betriebskosten eintragen.',
          ],
        },
      ],
      breadcrumb: 'Arbeitgeberkosten-Rechner Tschechien',
      cta: {
        label: 'Personal anfragen',
        targetConceptId: 'request-staff',
        note: 'Sie kalkulieren eine konkrete Stelle? Beschreiben Sie die Position, und wir gehen die Möglichkeiten durch.',
      },
    },
  },
}
