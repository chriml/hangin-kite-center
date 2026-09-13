import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactCta } from "@/components/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { KiteSizeCalculator } from "@/components/kite-size-calculator";
import { kiteGuideSource, kiteSizeBands } from "@/content/kite-size-guide";
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
              <p className={styles.heroLead}>Use this kite size calculator to compare one-, two- and three-kite setups for your weight, travel months and riding level.</p>
            </div>
            <p className={styles.introNote}>One, two or three kites in the bag? Start with a size range, then check the forecast and your gear with the beach team.</p>
          </div>
        </div>
      </section>
      <div className="shell"><KiteSizeCalculator /></div>
      <section className={styles.guide}>
        <div className={`shell ${styles.guideGrid}`}>
          <h2>What kite size should I bring to Boracay?</h2>
          <div>
            <p>Choose your kite size for your weight, board and the wind on the day. The calculator uses the <a href={kiteGuideSource.href}>{kiteGuideSource.title}</a> for twin-tip riding to suggest three packing options. Check the ranges against your exact kite model before packing for Bulabog Beach.</p>
            <p>Travel dates show the Boracay season. They cannot tell you the wind on a particular day. Your level changes the riding advice; it does not add power to the calculation. Take a twin-tip, a compatible bar and a correctly fitted harness, and check the full setup with Hangin.</p>
            <p>If you are taking your first lessons, your instructor chooses the equipment. Check the <Link href="/kitesurfing-boracay/">Boracay spot guide</Link> for wind, tide and launch information.</p>
            <details>
              <summary>View the reference size chart</summary>
              <div className={styles.tableWrap}>
                <table>
                  <caption>Kite sizes in m² for three separate wind scenarios</caption>
                  <thead><tr><th scope="col">Rider weight</th><th scope="col">14–17 knots</th><th scope="col">18–22 knots</th><th scope="col">23–28 knots</th></tr></thead>
                  <tbody>{kiteSizeBands.map(band => <tr key={band.label}><th scope="row">{band.label}</th><td>{band.light}</td><td>{band.medium}</td><td>{band.strong}</td></tr>)}</tbody>
                </table>
              </div>
              <p className={styles.tableNote}>At 70, 80 or 90 kg, this guide uses the lighter weight band. Automatic suggestions stop at 120 kg; this is our tool&apos;s limit. Wind figures are reference scenarios, not safe operating limits. Source checked 8 September 2026.</p>
            </details>
          </div>
        </div>
      </section>
      <section className={styles.guide}>
        <div className={`shell ${styles.guideGrid}`}>
          <h2>Before you pack your kite gear.</h2>
          <div className={styles.questions}>
            <details>
              <summary>What kite size do I need for my weight?</summary>
              <p>Enter your weight in kilograms or pounds to see size ranges for lighter, medium and stronger wind scenarios. This calculator covers riders from 60 to 120 kg using a twin-tip board. Outside that range, ask Hangin to check your setup. For your first <Link href="/kitesurfing-lessons/">kitesurfing lessons</Link>, let your instructor choose the equipment.</p>
            </details>
            <details>
              <summary>What kite sizes should I pack for Boracay in December or January?</summary>
              <p>December and January fall within the main Amihan season at Bulabog, roughly November to April. Your travel month gives seasonal context, but the wind on your riding days determines the size you use. Compare the suggested ranges, then check the forecast close to your trip. Read the <Link href="/kitesurfing-boracay/">Boracay wind and season guide</Link> for Amihan and Habagat conditions.</p>
            </details>
            <details>
              <summary>How many kites should I bring to Boracay?</summary>
              <p>One kite keeps luggage lighter, but gives you fewer size options when the wind changes. Two kites add a smaller and a larger size; three include a middle size too. Compare the three setups above with the gear you already ride, and check the wind ranges for each model with Hangin.</p>
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
