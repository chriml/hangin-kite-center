import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactCta } from "@/components/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { LessonEnquiry } from "@/components/lesson-enquiry";
import { PageHero } from "@/components/page-hero";
import { ResponsiveImage } from "@/components/responsive-image";
import { getPrimaryContactAction, siteConfig } from "@/content/site";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { lessonPrice, type ServicePageContent } from "@/content/water-pages";
import { absoluteUrl } from "@/lib/seo";
import styles from "./service-page.module.css";

function SectionContact({ contact }: { contact: NonNullable<ServicePageContent["sections"][number]["contact"]> }) {
  const action = getPrimaryContactAction(contact.context);
  return (
    <a className={`${styles.sectionLink} ${styles.sectionContact}`} href={action.href} target={action.target} rel={action.rel} aria-label={`${contact.label} (opens in a new tab)`} aria-describedby="message-guidance">
      <WhatsAppIcon />{contact.label}
    </a>
  );
}

export function ServicePage({ content, overview, children, sectionHeadingExtras, embedded = false }: { content: ServicePageContent; overview?: ReactNode; children?: ReactNode; sectionHeadingExtras?: Readonly<Record<string, ReactNode>>; embedded?: boolean }) {
  const Container = embedded ? "div" : "main";
  const sectionImages = [...new Map(content.sections.flatMap(({ image }) =>
    image?.kind === "proof" ? [[image.src, image] as const] : []
  )).values()];
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
              ? `${styles.boracay} ${styles.boracayHero}`
              : styles.about;

  return (
    <Container id={embedded ? undefined : "main-content"} tabIndex={embedded ? undefined : -1} className={`${styles.page} ${pageKind}`}>
      {content.schema === "service" && <JsonLd data={serviceJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />
      {content.faq.length > 0 && <JsonLd data={faqJsonLd} />}

      {!embedded && <div className={`shell ${styles.breadcrumbs}`}>
        <Breadcrumbs current={content.title} />
      </div>}
      {!embedded && <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        lead={content.lead}
        image={content.image}
        context={content.context}
        imageSizes={content.path === "/about/" || content.path === "/kitesurfing-lessons/" || content.path === "/kitesurfing-boracay/"
          ? "100vw"
          : content.path === "/rentals-storage/" ? "(min-width: 860px) 50vw, 100vw" : undefined}
      />}

      {overview}

      {content.sections.length > 0 && <section className={styles.sections} aria-label={`${content.title} details`}>
        <div className={`shell ${styles.sectionGrid}`}>
          {content.sections.map(({ id, heading, image, pricing, body, link, contact: sectionContact }, index) => (
            <article className={styles.serviceSection} key={heading}>
              {image && (
                <ResponsiveImage
                  image={image}
                  className={styles.courseImage}
                  sizes={content.path === "/kitesurfing-lessons/" || content.path === "/rentals-storage/"
                    ? "(min-width: 1212px) 574px, (min-width: 700px) calc((100vw - 64px) / 2), calc(100vw - 32px)"
                    : content.path === "/kitesurfing-boracay/"
                      ? index === 0
                        ? "(min-width: 860px) 48vw, 100vw"
                        : "(min-width: 1212px) 546px, (min-width: 860px) 46vw, calc(100vw - 32px)"
                      : "100vw"}
                />
              )}
              {id && sectionHeadingExtras?.[id] ? (
                <div>
                  <h2 id={id} tabIndex={-1}>{heading}</h2>
                  {sectionHeadingExtras[id]}
                </div>
              ) : (
                <h2 id={id} tabIndex={id ? -1 : undefined}>{heading}</h2>
              )}
              {pricing?.kind === "course" && (
                <dl className={styles.coursePricing}>
                  <div className={styles.coursePrice}>
                    <dt>Per person</dt>
                    <dd>{lessonPrice(pricing.price)}</dd>
                  </div>
                  <div className={styles.courseDuration}>
                    <dt>Private</dt>
                    <dd>{pricing.privateHours} hours</dd>
                  </div>
                  <div className={styles.courseDuration}>
                    <dt>Group</dt>
                    <dd>{pricing.groupHours} hours</dd>
                  </div>
                </dl>
              )}
              {pricing?.kind === "private" && (
                <dl className={styles.privatePricing}>
                  {pricing.packages.map(({ hours, price }) => (
                    <div key={hours}>
                      <dt>{hours} {hours === 1 ? "hour" : "hours"} private</dt>
                      <dd>{lessonPrice(price)}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <div>
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {link && <a className={styles.sectionLink} href={link.href}>{link.label}</a>}
                {sectionContact && <SectionContact contact={sectionContact} />}
              </div>
              {content.path === "/kitesurfing-lessons/" && pricing && (
                <LessonEnquiry course={heading} className={`button button--coral button--whatsapp ${styles.courseEnquiry}`} label="Book via WhatsApp" />
              )}
            </article>
          ))}
        </div>
        {sectionImages.length > 0 && (
          <div className={`shell ${styles.courseCredits}`}>
            <p>Photo credits</p>
            <ul>
              {sectionImages.map((image) => (
                <li key={image.src}>
                  <a href={image.sourceUrl}>{image.credit}</a>, <a href={image.licenseUrl}>{image.license}</a>.
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>}

      {children}

      {content.safety && (
        <section
          className={styles.safetySection}
          aria-labelledby="water-safety-title"
        >
          <div className={`shell ${styles.safetyGrid}`}>
            <div>
              <p className="eyebrow">Before you get on the water</p>
              <h2 id="water-safety-title">{content.safety.heading}</h2>
            </div>
            <div className={styles.safetyCopy}>
              {content.safety.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <p className="eyebrow">{content.contact?.eyebrow ?? "Check the details"}</p>
            <h2>{contact.heading}</h2>
          </div>
          <div className={styles.contactCopy}>
            <p>{contact.body}</p>
            <ContactCta context={content.context} />
          </div>
        </div>
      </section>
    </Container>
  );
}
