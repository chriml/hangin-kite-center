import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { boracayGuideParent, type BoracaySubpage } from "@/content/boracay-guide";
import { absoluteUrl } from "@/lib/seo";
import styles from "./boracay-guide.module.css";
import serviceStyles from "./service-page.module.css";
import boracayStyles from "@/app/kitesurfing-boracay/boracay.module.css";

export function BoracaySubpageContent({ page }: { page: BoracaySubpage }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    boracayGuideParent,
    { label: page.title, href: page.path },
  ];

  return (
    <div className={`${serviceStyles.page} ${serviceStyles.boracay}`}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map(({ label, href }, index) => ({
          "@type": "ListItem", position: index + 1, name: label, item: absoluteUrl(href as `/${string}`),
        })),
      }} />
      <section className={`shell ${boracayStyles.intro}`} aria-labelledby="island-guide-heading">
        <h2 id="island-guide-heading">{page.title}</h2>
        <p>{page.lead}</p>
      </section>
      <section id={page.sectionId} className={styles.section} aria-labelledby="island-guide-heading">
        <div className="shell">
          {page.entries.map((entry) => (
            <article id={entry.id} className={styles.entry} key={entry.id}>
              <div>
                {entry.location && <p className={styles.location}>{entry.location}</p>}
                <h3>{entry.heading}</h3>
              </div>
              <div>
                {entry.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {entry.link && <Link className={styles.entryLink} href={entry.link.href}>{entry.link.label}</Link>}
              </div>
            </article>
          ))}
          {page.questions.length > 0 && (
            <div className={serviceStyles.faqList}>
              {page.questions.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
            </div>
          )}
          {page.sources.length > 0 && (
            <p className={styles.sources}><span>Further reading</span>{page.sources.map(({ label, href }) => <a href={href} key={href}>{label}</a>)}</p>
          )}
        </div>
      </section>
      <section className={serviceStyles.contactSection}>
        <div className={`shell ${serviceStyles.contactGrid}`}>
          <div><p className="eyebrow">Meet us at Bulabog</p><h2>Fit some kiting into your trip.</h2></div>
          <div className={serviceStyles.contactCopy}>
            <p>Send us your dates, riding level and what you need for the water. We&apos;ll talk through lessons, gear or a stay near the kite beach.</p>
            <ContactCta context="general" />
          </div>
        </div>
      </section>
    </div>
  );
}
