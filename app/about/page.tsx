import Image from "next/image";
import { ServicePage } from "@/components/service-page";
import { aboutGearPartners, islandPages, teachingOrganizations } from "@/content/island-pages";
import { sitePartners } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import styles from "./about.module.css";

const content = islandPages.about;

export const metadata = buildMetadata({
  title: content.metaTitle,
  description: content.description,
  path: content.path,
});

export default function AboutPage() {
  return (
    <ServicePage content={content} sectionHeadingExtras={{
      "how-we-teach": (
        <ul className={styles.teachingLogos} aria-label="Instructor organizations">
          {teachingOrganizations.map((organization) => (
            <li key={organization.name}>
              <a href={organization.href} target="_blank" rel="noopener noreferrer">
                <Image src={organization.logo} width={organization.width} height={organization.height} alt={organization.name} />
              </a>
            </li>
          ))}
        </ul>
      ),
    }}>
      <section className={styles.team} aria-labelledby="team-heading">
        <div className="shell">
          <p className="eyebrow">The people at Hangin</p>
          <h2 id="team-heading">Meet the team.</h2>
          <ul className={styles.teamGrid}>
            {[1, 2, 3].map((slot) => (
              <li key={slot}>
                <div className={styles.portraitPlaceholder} aria-hidden="true">
                  <Image src="/brand/mark.svg" width={80} height={80} alt="" />
                </div>
                <h3>Team member</h3>
                <p>Profile coming soon.</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={styles.gearPartners} aria-labelledby="gear-partners-heading">
        <div className={`shell ${styles.partnerGrid}`}>
          <div className={styles.partnerCopy}>
            <h2 id="gear-partners-heading">{aboutGearPartners.heading}</h2>
            <p>{aboutGearPartners.body}</p>
          </div>
          <ul className={styles.partnerList}>
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
      </section>
    </ServicePage>
  );
}
