import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import {
  publicRoutes,
  siteConfig,
  type PublicRoute,
} from "@/content/site";
import styles from "./site-shell.module.css";

export const routeLabels: Record<PublicRoute, string> = {
  "/": "Home",
  "/kitesurfing-lessons/": "Lessons",
  "/rentals-storage/": "Rentals & storage",
  "/kite-safaris/": "Safaris",
  "/accommodation/": "Stay",
  "/shop/": "Shop",
  "/kitesurfing-boracay/": "Boracay",
  "/about/": "About",
  "/contact/": "Contact",
  "/terms/": "Website inquiries",
  "/accessibility/": "Accessibility",
};

const desktopRoutes: PublicRoute[] = [
  "/kitesurfing-lessons/",
  "/rentals-storage/",
  "/accommodation/",
  "/kitesurfing-boracay/",
  "/about/",
];

const mobileRoutes = publicRoutes.filter((route) => route !== "/");

function BrandLink() {
  return (
    <Link className={styles.brand} href="/" aria-label={siteConfig.name}>
      <Image
        className={styles.mark}
        src="/brand/mark.svg"
        width={44}
        height={44}
        alt=""
      />
      <span>{siteConfig.shortName.toUpperCase()}</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className={styles.siteHeader}>
        <div className={`shell ${styles.headerBar}`}>
          <BrandLink />
          <nav className={styles.primaryNav} aria-label="Primary">
            {desktopRoutes.map((route) => (
              <Link key={route} href={route}>
                {routeLabels[route]}
              </Link>
            ))}
          </nav>
          <div className={styles.headerContact}>
            <ContactCta compact label="direct" />
          </div>
          <details className={styles.mobileMenu}>
            <summary>Menu</summary>
            <div className={styles.mobilePanel}>
              <nav aria-label="Mobile">
                {mobileRoutes.map((route) => (
                  <Link key={route} href={route}>
                    {routeLabels[route]}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
