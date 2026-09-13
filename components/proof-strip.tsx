import Image from "next/image";
import { sitePartners } from "@/content/site";
import styles from "@/app/page.module.css";

export function ProofStrip({ labelAbove = false }: { labelAbove?: boolean }) {
  return (
    <aside className={styles.proofStrip} aria-label="Our gear partners">
      <div className={`shell ${styles.partnerStrip} ${labelAbove ? styles.partnerStripStacked : ""}`}>
        <p>Our gear partners</p>
        <ul className={styles.partnerList}>
          {sitePartners.map((partner) => (
            <li key={partner.name}>
              <a href={partner.href} target="_blank" rel="noopener noreferrer">
                <Image src={partner.logo} width={partner.width} height={partner.height} alt={partner.name} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
