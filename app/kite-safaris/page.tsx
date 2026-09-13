import Link from "next/link";
import { safariTrips } from "@/content/safari-trips";
import { getSafariContactAction } from "@/content/site";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ServicePage } from "@/components/service-page";
import { waterPages } from "@/content/water-pages";
import { buildMetadata } from "@/lib/seo";
import styles from "./safaris.module.css";

const content = waterPages.safaris;

export const metadata = buildMetadata({
  title: content.metaTitle,
  description: content.description,
  path: content.path,
});

export default function KiteSafarisPage() {
  return (
    <ServicePage
      content={content}
      overview={
        <section className={styles.trips} aria-label="Kite safari options">
          <ul className={`shell ${styles.tripList}`}>
            {safariTrips.map((trip) => {
              const request = getSafariContactAction(trip.name);
              return (
                <li key={trip.slug}>
                  <article className={styles.tripCard} data-safari-trip={trip.slug}>
                    <div className={styles.tripCopy}>
                      <h2>{trip.name}</h2>
                      <p>Details coming soon.</p>
                    </div>
                    <div className={styles.tripActions}>
                      <a className="button button--coral button--whatsapp" href={request.href} target={request.target} rel={request.rel} aria-label={`Request ${trip.name} safari information via WhatsApp (opens in a new tab)`} aria-describedby="message-guidance">
                        <WhatsAppIcon />Request
                      </a>
                      <Link className="button" href={trip.path} aria-label={`More about ${trip.name} safaris`}>More <span aria-hidden="true">→</span></Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      }
    >
      <aside className={styles.tripNotes} aria-labelledby="boracay-planning">
        <div className={`shell ${styles.notesInner}`}>
          <div>
            <p className="eyebrow">The rest of your stay</p>
            <h2 id="boracay-planning">Back on Bulabog.</h2>
            <p>Read up on the beach, sort out your gear or work on your riding while you&apos;re in Boracay.</p>
          </div>
          <ul>
            <li><Link href="/kitesurfing-boracay/">Read the Boracay spot guide <span aria-hidden="true">↗</span></Link></li>
            <li><Link href="/rentals-storage/">Ask about rental and storage <span aria-hidden="true">↗</span></Link></li>
            <li><Link href="/kitesurfing-lessons/">Find a lesson for your level <span aria-hidden="true">↗</span></Link></li>
          </ul>
        </div>
      </aside>
    </ServicePage>
  );
}
