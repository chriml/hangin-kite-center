import Link from "next/link";
import { publicRoutes, siteConfig } from "@/content/site";
import { routeLabels } from "@/components/site-header";
import styles from "./site-shell.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={`shell ${styles.footerGrid}`}>
        <div className={styles.footerIdentity}>
          <p className={styles.footerWordmark}>{siteConfig.shortName}</p>
          <p>Bulabog Beach, Boracay</p>
        </div>
        <nav className={styles.footerNav} aria-label="Footer">
          {publicRoutes.map((route) => (
            <Link key={route} href={route}>
              {routeLabels[route]}
            </Link>
          ))}
        </nav>
        <address className={styles.footerContact}>
          <a href={`tel:+${siteConfig.whatsappNumber}`}>
            {siteConfig.whatsappDisplay}
          </a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </address>
      </div>
      <div className={`shell ${styles.footerNotes}`}>
        <p id="message-guidance">
          WhatsApp opens in a new tab with a draft message. You choose whether to
          send the chat message to Hangin. Keep your first message brief.
          Ask how to share health or identity information before
          sending it.
        </p>
        <p>
          Images are owned by or licensed for use by Hangin Kite Center.
          Photographs show Boracay; artwork is illustration. <a href="/images/ATTRIBUTION.md">Image credits</a>.
        </p>
      </div>
      <div className={`shell ${styles.footerBase}`}>
        <span>{siteConfig.name}</span>
        <span>Est. {siteConfig.established}</span>
      </div>
    </footer>
  );
}
