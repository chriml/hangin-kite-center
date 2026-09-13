import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { brandImages } from "@/content/images";
import {
  navigationRoutes,
  siteConfig,
  type PublicRoute,
} from "@/content/site";
import styles from "./site-shell.module.css";

export const routeLabels: Record<PublicRoute, string> = {
  "/": "Home",
  "/kitesurfing-lessons/": "Lessons",
  "/rentals-storage/": "Rentals & storage",
  "/kite-safaris/": "Safaris",
  "/events/": "Events",
  "/kite-safaris/batbatan/": "Batbatan",
  "/kite-safaris/colon/": "Colon",
  "/kite-safaris/others/": "Others",
  "/accommodation/": "Stay",
  "/shop/": "Shop",
  "/kitesurfing-boracay/": "Boracay",
  "/kitesurfing-boracay/places-to-be/": "Places to be",
  "/kitesurfing-boracay/things-to-do/": "Things to do",
  "/kitesurfing-boracay/planning-your-days/": "Planning your days",
  "/kitesurfing-boracay/practical-questions/": "Practical questions",
  "/kite-size-guide/": "Kite size guide",
  "/about/": "About",
  "/contact/": "Contact",
  "/legal/": "Legal information",
  "/terms/": "Website inquiries",
  "/accessibility/": "Accessibility",
};

const desktopRoutes: PublicRoute[] = [
  "/kitesurfing-lessons/",
  "/rentals-storage/",
  "/kite-safaris/",
  "/events/",
  "/accommodation/",
  "/kitesurfing-boracay/",
  "/about/",
];

const mobileRoutes = navigationRoutes.filter((route) => route !== "/" && route !== "/legal/");

function BrandLink() {
  return (
    <Link className={styles.brand} href="/" aria-label={siteConfig.name}>
      <Image
        {...brandImages.wordmark}
        className={styles.mark}
        alt=""
        loading="eager"
      />
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
            {desktopRoutes.map((route) => route === "/kitesurfing-boracay/" ? (
              <a key={route} href={route}>{routeLabels[route]}</a>
            ) : (
              <Link key={route} href={route}>
                {routeLabels[route]}
              </Link>
            ))}
          </nav>
          <div className={styles.headerContact}>
            <ContactCta compact label="direct" />
          </div>
          <details className={styles.mobileMenu}>
            <summary aria-label="Menu">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <path className={styles.menuBars} d="M4 6h16M4 12h16M4 18h16" />
                <path className={styles.menuClose} d="m6 6 12 12M6 18 18 6" />
              </svg>
            </summary>
            <div className={styles.mobilePanel}>
              <nav aria-label="Mobile">
                {mobileRoutes.map((route) => (
                  <a key={route} href={route}>
                    {routeLabels[route]}
                  </a>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
