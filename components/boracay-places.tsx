import Link from "next/link";
import { boracaySubpages } from "@/content/boracay-guide";
import styles from "./boracay-guide.module.css";

export function BoracayPlaces() {
  return (
    <section id="places-to-be" className={styles.teaser} aria-labelledby="places-heading">
      <div className={`shell ${styles.teaserGrid}`}>
        <div>
          <p className="eyebrow">Between sessions</p>
          <h2 id="places-heading">Places to be in Boracay.</h2>
          <p>Head over to White Beach for sunset, find dinner around D&apos;Mall, or take a day off at Diniwid or Puka.</p>
          <Link className="button button--coral" href={boracaySubpages.places.path}>Explore places in Boracay</Link>
        </div>
        <ul className={styles.teaserLinks}>
          <li><Link href={boracaySubpages.places.path}><span>Beaches and places</span><span>White Beach, Diniwid and Puka</span></Link></li>
          <li><Link href={boracaySubpages.activities.path}><span>Out on the water</span><span>Lessons, sailing and snorkeling</span></Link></li>
          <li><Link href={boracaySubpages.planning.path}><span>Plan your island time</span><span>Days off, getting around and arrival</span></Link></li>
        </ul>
      </div>
    </section>
  );
}
