import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { EmailIcon } from "@/components/email-icon";
import { brandImages } from "@/content/images";
import { navigationRoutes, siteConfig, sitePartners, socialLinks } from "@/content/site";
import { SocialIcon } from "@/components/social-icon";
import { routeLabels } from "@/components/site-header";
import styles from "./site-shell.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={`shell ${styles.footerGrid}`}>
        <div className={styles.footerIdentity}>
          <Image
            {...brandImages.logoLight}
            className={styles.footerWordmark}
            alt={brandImages.logoLight.alt}
          />
          <p>Bulabog Beach, Boracay</p>
          <div className={styles.footerChannels}>
            <address className={styles.footerContact}>
              <a className={styles.footerContactIcon} href={`tel:+${siteConfig.whatsappNumber}`} aria-label={`Call Hangin on ${siteConfig.whatsappDisplay}`} title={`Call ${siteConfig.whatsappDisplay}`}>
                {/* Tabler phone icon, MIT. See public/licenses/tabler-icons.txt. */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                </svg>
              </a>
              <a className={styles.footerContactIcon} href={`mailto:${siteConfig.email}`} aria-label={`Email ${siteConfig.email}`} title={`Email ${siteConfig.email}`}>
                <EmailIcon />
              </a>
            </address>
            <nav className={styles.footerSocials} aria-label="Social media">
              {socialLinks.map((social) => (
                <a key={social.platform} href={social.href} aria-label={social.label} title={social.label} target="_blank" rel="noopener noreferrer">
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </nav>
          </div>
          <ContactCta compact />
          <ul className={styles.footerPartners} aria-label="Our gear partners">
            {sitePartners.map((partner) => (
              <li key={partner.name}>
                <a href={partner.href} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={partner.logo}
                    width={partner.width}
                    height={partner.height}
                    alt={partner.name}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav className={styles.footerNav} aria-label="Footer">
          {navigationRoutes.filter((route) => route !== "/legal/").map((route) => route.startsWith("/kitesurfing-boracay/") ? (
            <a key={route} href={route}>{routeLabels[route]}</a>
          ) : (
            <Link key={route} href={route}>
              {routeLabels[route]}
            </Link>
          ))}
          <Link href="/#questions">FAQ</Link>
        </nav>
      </div>
      <div className={`shell ${styles.footerBase}`}>
        <span>© {new Date().getUTCFullYear()} {siteConfig.name}</span>
        <Link className={styles.footerLegal} href="/legal/">Legal information</Link>
        <span>Est. {siteConfig.established}</span>
      </div>
    </footer>
  );
}
