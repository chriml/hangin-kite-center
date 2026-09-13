import Link from "next/link";
import { ResponsiveImage } from "@/components/responsive-image";
import { siteImages } from "@/content/images";
import styles from "@/app/page.module.css";

const image = siteImages.kiteBay;

export function SpotGuide() {
  return (
    <section id="boracay" className={styles.spotSection}>
      <div className={styles.spotGrid}>
        <figure className={`${styles.proofFigure} ${styles.spotFigure}`}>
          <ResponsiveImage
            image={image}
            className={styles.coverImage}
            sizes="(min-width: 860px) 63vw, 100vw"
          />
        </figure>
        <div className={styles.spotCopy}>
          <p className="eyebrow">The kite spot</p>
          <h2>The windward side of Boracay.</h2>
          <p>
            Bulabog is our home spot on Boracay&apos;s east side. The reef
            shelters the lagoon, with flat patches and chop depending on the
            wind and tide. Check the depth and leave room to launch; it gets busy
            out here.
          </p>
          <p>
            Amihan is our main kite season, roughly November to April. When
            Habagat brings southwest wind around June to October, we move our
            sessions to the other side of Boracay. Drop us a message before
            bringing your gear over.
          </p>
          <a className={styles.textLink} href="/kitesurfing-boracay/">
            Read the Boracay spot guide
          </a>
          <Link className={styles.textLink} href="/kite-size-guide/">
            Compare kite sizes for your trip
          </Link>
        </div>
      </div>
    </section>
  );
}
