import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactCta } from "@/components/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/content/site";
import type { ServicePageContent } from "@/content/water-pages";
import { absoluteUrl } from "@/lib/seo";
import styles from "./service-page.module.css";

export function ServicePage({ content }: { content: ServicePageContent }) {
  const contact = content.contact ?? {
    heading: "Tell us your dates and riding level.",
    body: "Send the dates you will be in Boracay, your level and what you need. We'll reply with what can work in the current conditions.",
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.title,
    description: content.description,
    url: absoluteUrl(content.path),
    provider: { "@id": `${siteConfig.origin}/#kite-center` },
    areaServed: "Boracay, Philippines",
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.title,
        item: absoluteUrl(content.path),
      },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const pageKind = content.path === "/kitesurfing-lessons/"
    ? styles.lessons
    : content.path === "/rentals-storage/"
      ? styles.rentals
      : content.path === "/kite-safaris/"
        ? styles.safaris
        : content.path === "/accommodation/"
          ? styles.accommodation
          : content.path === "/shop/"
            ? styles.shop
            : content.path === "/kitesurfing-boracay/"
              ? styles.boracay
              : styles.about;

  return (
    <main id="main-content" tabIndex={-1} className={`${styles.page} ${pageKind}`}>
      {content.schema === "service" && <JsonLd data={serviceJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />
      {content.faq.length > 0 && <JsonLd data={faqJsonLd} />}

      <div className={`shell ${styles.breadcrumbs}`}>
        <Breadcrumbs current={content.title} />
      </div>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        image={content.image}
        context={content.context}
      />

      <section className={styles.sections} aria-label={`${content.title} details`}>
        <div className={`shell ${styles.sectionGrid}`}>
          {content.sections.map(({ heading, body }) => (
            <article className={styles.serviceSection} key={heading}>
              <h2>{heading}</h2>
              <div>
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {content.faq.length > 0 && (
        <section className={styles.faqSection}>
          <div className={`shell ${styles.faqGrid}`}>
            <div>
              <p className="eyebrow">Before you make plans</p>
              <h2>Practical questions.</h2>
            </div>
            <div className={styles.faqList}>
              {content.faq.map(({ question, answer }) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.contactSection}>
        <div className={`shell ${styles.contactGrid}`}>
          <div>
            <p className="eyebrow">Check the details</p>
            <h2>{contact.heading}</h2>
          </div>
          <div className={styles.contactCopy}>
            <p>{contact.body}</p>
            <ContactCta context={content.context} />
          </div>
        </div>
      </section>
    </main>
  );
}
