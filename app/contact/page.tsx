import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { LocationMap } from "@/components/location-map";
import { getPrimaryContactAction, siteConfig } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import styles from "./contact.module.css";

const title = "Tell us when you're coming";
const description =
  "Contact Hangin Kite Center on WhatsApp or email about lessons, rental, storage, accommodation, the shop or kite safaris in Boracay.";

export const metadata = buildMetadata({
  title: "Contact Hangin in Boracay",
  description,
  path: "/contact/",
});

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
      name: title,
      item: absoluteUrl("/contact/"),
    },
  ],
};

export default function ContactPage() {
  const primaryContact = getPrimaryContactAction("general");

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <JsonLd data={breadcrumbJsonLd} />

      <div className={`shell ${styles.breadcrumbs}`}>
        <Breadcrumbs current={title} />
      </div>

      <section className={styles.hero}>
        <div className={`shell ${styles.heroGrid}`}>
          <div>
            <p className="eyebrow">Contact Hangin</p>
            <h1>{title}</h1>
          </div>
          <div className={styles.heroDetail}>
            <p>
              Send your dates, riding level and what you need. We&apos;ll reply with
              what makes sense for the current conditions.
            </p>
            <p className={styles.locationLine}>{siteConfig.location}</p>
          </div>
        </div>
      </section>

      <section className={styles.details} aria-labelledby="contact-details-heading">
        <div className={`shell ${styles.detailsGrid}`}>
          <div>
            <p className="eyebrow">What to include</p>
            <h2 id="contact-details-heading">Your dates and riding level</h2>
          </div>
          <ul className={styles.requestList}>
            <li>The dates you will be in Boracay</li>
            <li>Your riding level</li>
            <li>The lesson, rental, storage, stay, shop item or safari you need</li>
            <li>Your usual kite and board sizes if gear is involved</li>
          </ul>
        </div>
      </section>

      <section className={styles.details} aria-labelledby="message-details-heading">
        <div className={`shell ${styles.detailsGrid}`}>
          <div>
            <p className="eyebrow">Before you message</p>
            <h2 id="message-details-heading">Keep the first message to trip details</h2>
          </div>
          <div>
            <p>Ask how to share health information, identity documents or payment details before sending them. For a rider under 18, a parent or legal guardian should contact Hangin first.</p>
            <p>WhatsApp and your email provider have their own privacy practices. Opening WhatsApp loads a draft; you choose whether to send the chat message to Hangin.</p>
            <p>Check the service, dates, total cost and cancellation terms directly with Hangin before agreeing to a booking.</p>
          </div>
        </div>
      </section>

      <section className={styles.channels} aria-label="Contact options">
        <div className={`shell ${styles.channelGrid}`}>
          <article className={styles.location}>
            <div>
            <p className="eyebrow">Location</p>
            <h2>Find us on Bulabog Beach</h2>
            <p>{siteConfig.location}</p>
            <p>During Habagat, we move sessions to the other side of Boracay. Confirm your lesson meeting point with us before heading to the beach.</p>
            <a className="button" href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
              Open Google Maps
            </a>
            <p><a href="/kitesurfing-boracay/">Read the Boracay spot guide</a></p>
            </div>
            <LocationMap embedUrl={siteConfig.mapsEmbedUrl} />
          </article>
          <article className={styles.channel}>
            <p className="eyebrow">Primary contact</p>
            <h2>{primaryContact.channelLabel}</h2>
            <a
              className="button button--coral button--whatsapp"
              href={primaryContact.href}
              aria-label={`${primaryContact.channelLabel} ${primaryContact.displayDestination} (opens in a new tab)`}
              target={primaryContact.target}
              rel={primaryContact.rel}
            >
              <WhatsAppIcon />
              <span>{primaryContact.channelLabel} {primaryContact.displayDestination}</span>
            </a>
          </article>
          <article className={styles.channel}>
            <p className="eyebrow">Email</p>
            <h2>Email</h2>
            <a className={styles.emailLink} href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
