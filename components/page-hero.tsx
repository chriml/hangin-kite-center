import { ContactCta } from "@/components/contact-cta";
import { ResponsiveImage } from "@/components/responsive-image";
import type { SiteImage } from "@/content/images";
import type { ContactContext, PublicRoute } from "@/content/site";
import styles from "./service-page.module.css";

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  context,
  quickLink,
  imageSizes = "(min-width: 1180px) 590px, (min-width: 860px) 50vw, calc(100vw - 2rem)",
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image: SiteImage;
  context: ContactContext;
  quickLink?: { href: PublicRoute; label: string };
  imageSizes?: string;
}) {
  const media = (
    <ResponsiveImage
      image={image}
      className={`${styles.heroImage} ${image.kind === "provided" ? styles.providedImage : ""}`}
      alt={image.kind === "generated" ? "" : image.alt}
      sizes={imageSizes}
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
          {quickLink ? (
            <div className={styles.heroActions}>
              <ContactCta context={context} compact label="ask" />
              <Link className={styles.heroQuickLink} href={quickLink.href}>
                {quickLink.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : <ContactCta context={context} compact label="ask" />}
        </div>
        {image.kind !== "generated" ? (
          <figure className={styles.heroFigure}>
            {media}
          </figure>
        ) : (
          <figure className={`${styles.heroFigure} ${styles.illustratedFigure}`}>
            {media}
            <figcaption className={styles.photoCredit}>Supporting illustration.</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
import Link from "next/link";
