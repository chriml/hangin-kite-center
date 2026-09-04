import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import styles from "../terms/terms.module.css";

const title = "Using this website";
export const metadata = buildMetadata({
  title: "Website Accessibility and Help",
  description: "Help using the Hangin Kite Center website with a keyboard, browser zoom or without JavaScript, and how to report a problem.",
  path: "/accessibility/",
});

export default function AccessibilityPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={`shell ${styles.breadcrumbs}`}><Breadcrumbs current={title} /></div>
      <header className={styles.hero}>
        <div className={`shell ${styles.heroGrid}`}>
          <div><p className="eyebrow">Website help</p><h1>{title}</h1></div>
          <div className={styles.heroDetail}><p>If a page or link gets in your way, email Hangin with the page address and what you were trying to do.</p></div>
        </div>
      </header>
      <div className={`shell ${styles.termsLayout}`}>
        <nav className={styles.contents} aria-label="On this page">
          <a href="#navigation">Navigation and reading</a>
          <a href="#help">Report a problem</a>
          <a href="#visit">Planning your visit</a>
        </nav>
        <div className={styles.sections}>
          <section id="navigation" aria-labelledby="navigation-heading">
            <p className={styles.sectionNumber}>01</p><div>
              <h2 id="navigation-heading">Navigation and reading</h2>
              <p>Use Tab to move through links and controls. The first link skips to the page content. Press Enter to follow a link; use Enter or Space to open the mobile menu or a question.</p>
              <p>You can enlarge the page with your browser&apos;s zoom controls. Page content, menus and contact links work with JavaScript turned off. WhatsApp links open in a new tab; email links open your email app.</p>
            </div>
          </section>
          <section id="help" aria-labelledby="help-heading">
            <p className={styles.sectionNumber}>02</p><div>
              <h2 id="help-heading">Report a problem</h2>
              <p>Include the page address, what did not work and, if useful, your browser or assistive technology. You do not need to send medical information.</p>
              <div className={styles.complaintLinks}><a className="button button--coral" href={`mailto:${siteConfig.email}?subject=Website%20accessibility`}>Email about website access</a></div>
            </div>
          </section>
          <section id="visit" aria-labelledby="visit-heading">
            <p className={styles.sectionNumber}>03</p><div>
              <h2 id="visit-heading">Planning your visit</h2>
              <p>Ask Hangin about access to the beach, equipment, accommodation or the service you are considering. Check any assistance or eligibility arrangements directly before making plans.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
