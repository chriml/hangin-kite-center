import { ContactCta } from "@/components/contact-cta";
import { ResponsiveImage } from "@/components/responsive-image";
import type { SiteImage } from "@/content/images";
import type { ContactContext } from "@/content/site";
import styles from "./service-page.module.css";

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  context,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image: SiteImage;
  context: ContactContext;
}) {
  const media = (
    <ResponsiveImage
      image={image}
      className={styles.heroImage}
      alt={image.kind === "generated" ? "" : image.alt}
      sizes="(min-width: 1180px) 590px, (min-width: 860px) 50vw, calc(100vw - 2rem)"
      priority
    />
  );

  return (
    <section className={styles.hero}>
      <div className={`shell ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.heroLead}>{lead}</p>
          <ContactCta context={context} compact label="Ask Hangin on WhatsApp" />
        </div>
        {image.kind === "proof" ? (
          <figure className={styles.heroFigure}>
            {media}
            <figcaption className={styles.photoCredit}>
              Boracay kitesurfing context. Photo by{" "}
              <a href={image.sourceUrl}>{image.credit}</a>, licensed{" "}
              <a href={image.sourceUrl}>{image.license}</a>.
            </figcaption>
          </figure>
        ) : (
          <div className={styles.heroFigure} aria-hidden="true">
            {media}
          </div>
        )}
        <svg
          className={styles.kiteLines}
          viewBox="0 0 700 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 78 C 210 78, 330 12, 700 12" />
          <path d="M0 88 C 230 88, 350 22, 700 22" />
        </svg>
      </div>
    </section>
  );
}
