import Image from "next/image";
import Link from "next/link";
import { siteImages } from "@/content/images";
import styles from "@/app/page.module.css";

const image = siteImages.bulabog;

export function SpotGuide() {
  return (
    <section id="boracay" className={styles.spotSection}>
      <div className={`shell ${styles.spotGrid}`}>
        <figure className={`${styles.proofFigure} ${styles.spotFigure}`}>
          <Image
            className={styles.coverImage}
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes="(min-width: 1180px) 680px, (min-width: 860px) 58vw, calc(100vw - 2rem)"
          />
          <figcaption className={styles.photoCredit}>
            Bulabog Beach context. Photo by{" "}
            <a href={image.sourceUrl}>{image.credit}</a>, licensed{" "}
            <a href={image.sourceUrl}>{image.license}</a>.
          </figcaption>
        </figure>
        <div className={styles.spotCopy}>
          <p className="eyebrow">The kite side</p>
          <h2>The windward side of Boracay.</h2>
          <p>
            Bulabog Beach faces the Amihan wind on Boracay&apos;s east side. Its
            warm, shallow lagoon gives lessons and riders room to work when the
            conditions line up.
          </p>
          <p>
            Amihan generally runs from roughly November to April, but wind is
            never a daily promise. Check current conditions before planning a
            session.
          </p>
          <Link className={styles.textLink} href="/kitesurfing-boracay/">
            Read the Boracay spot guide
          </Link>
        </div>
      </div>
    </section>
  );
}
