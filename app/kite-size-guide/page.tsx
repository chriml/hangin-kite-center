import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactCta } from "@/components/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { KiteWindMonths } from "@/components/kite-wind-months";
import { KiteSizeCalculator } from "@/components/kite-size-calculator";
import { WindForecast } from "@/components/wind-forecast";
import { hanginWindMonths, kiteGuideSource, kiteSizeBands } from "@/content/kite-size-guide";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import styles from "@/components/kite-size-guide.module.css";

export const metadata = buildMetadata({
  title: "What Kite Size Should I Bring to Boracay?",
  description: "What kite size should you bring to Boracay? Compare three setups for your weight, travel months and riding level, with advice on packing and renting gear.",
  path: "/kite-size-guide/",
});

export default function KiteSizeGuidePage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Kite size guide", item: absoluteUrl("/kite-size-guide/") },
        ],
      }} />
      <section className={styles.hero}>
        <div className="shell">
          <div className={styles.breadcrumbs}><Breadcrumbs current="Kite size guide" /></div>
          <div className={styles.intro}>
            <div>
              <p className="eyebrow">Before you pack</p>
              <h1>Boracay kite size guide</h1>
              <p className={styles.heroLead}>Compare kite sizes for your weight and months in Boracay.</p>
            </div>
            <p className={styles.introNote}>One, two or three kites. Check your packing choices with the beach team.</p>
          </div>
        </div>
      </section>
      <div className="shell"><KiteSizeCalculator /></div>
      <section className={styles.guide}>
        <div className={`shell ${styles.guideGrid}`}>
          <h2>What kite size should I bring to Boracay?</h2>
          <div>
            <p>The kite size calculator uses the <a href={kiteGuideSource.href}>{kiteGuideSource.title}</a> for twin-tip riding. It suggests whole sizes for your bag; check your exact kite model and the forecast before packing.</p>
            <p>One kite is centered on the median of your months’ wind-range midpoints. Two and three kites use separate calculations with space between sizes. Hangin supplies seasonal estimates, not measured wind statistics or a forecast. December and March use broad estimates.</p>
            <p>If you are taking your first lessons, your instructor chooses the equipment. Check the <a href="/kitesurfing-boracay/">Boracay spot guide</a> for wind, tide and launch information.</p>
            <details>
              <summary>View the reference size chart</summary>
              <div className={styles.tableWrap}>
                <table>
                  <caption>Kite sizes in m² for four separate wind scenarios</caption>
                  <thead><tr><th scope="col">Rider weight</th><th scope="col">10–13 knots</th><th scope="col">14–17 knots</th><th scope="col">18–22 knots</th><th scope="col">23–28 knots</th></tr></thead>
                  <tbody>{kiteSizeBands.map(band => <tr key={band.label}><th scope="row">{band.label}</th><td>{band.veryLight}</td><td>{band.light}</td><td>{band.medium}</td><td>{band.strong}</td></tr>)}</tbody>
                </table>
              </div>
              <p className={styles.tableNote}>At 70, 80 or 90 kg, this guide uses the lighter weight band. Automatic suggestions stop at 120 kg; this is our tool&apos;s limit. Wind figures are reference scenarios, not safe operating limits. Source checked 13 September 2026.</p>
            </details>
            <details>
              <summary>View Hangin&apos;s wind guide by month</summary>
              <KiteWindMonths months={hanginWindMonths} />
              <p className={styles.tableNote}>Based on the Hangin team&apos;s seasonal account, recorded 13 September 2026. December and March are broad planning estimates between the nearby months. No daily probabilities or measured monthly averages are available.</p>
            </details>
          </div>
        </div>
      </section>
      <WindForecast />
      <section className={styles.guide}>
        <div className={`shell ${styles.guideGrid}`}>
          <h2>Before you pack your kite gear.</h2>
          <div className={styles.questions}>
            <details>
              <summary>What kite size do I need for my weight?</summary>
              <p>Enter your weight to compare packing sizes. This guide covers adults from 60 to 120 kg on a twin-tip. Ask Hangin for other weights or boards. For your first <Link href="/kitesurfing-lessons/">kitesurfing lessons</Link>, let your instructor choose the equipment.</p>
            </details>
            <details>
              <summary>What kite sizes should I pack for Boracay in December or January?</summary>
              <p>Choose your months above. January can reach 30 knots, occasionally 35, beyond this chart’s 28-knot limit. Check the forecast before packing and read the <a href="/kitesurfing-boracay/">Boracay wind and season guide</a> for Amihan and Habagat conditions.</p>
            </details>
            <details>
              <summary>How many kites should I bring to Boracay?</summary>
              <p>One keeps the bag light. Two add more choice as the wind changes; three add a middle size. Extra kites appear only when the month ranges support useful spacing. Check each model’s wind range with Hangin.</p>
            </details>
            <details>
              <summary>Should I bring my own kite gear or rent in Boracay?</summary>
              <p>Bring gear you know if you are comfortable travelling with it. Renting can reduce your luggage, or help if you need a size you do not own. Ask Hangin about <Link href="/rentals-storage/">kite rental and storage in Boracay</Link> for your dates, level and usual equipment before deciding what to pack.</p>
            </details>
          </div>
        </div>
      </section>
      <section className={styles.contact}>
        <div className={`shell ${styles.guideGrid}`}>
          <h2>Check your bag with Hangin.</h2>
          <div>
            <p>Tell us your dates, level, usual kite sizes and board. We can talk through what to bring and <Link href="/rentals-storage/">rental or storage options</Link>. The guide does not check availability.</p>
            <ContactCta context="rental-storage" />
          </div>
        </div>
      </section>
    </main>
  );
}
