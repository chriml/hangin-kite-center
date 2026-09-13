import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";
import { islandPages } from "@/content/island-pages";
import { boracayGuideParent, boracaySubpages } from "@/content/boracay-guide";
import { BoracayBreadcrumbs, BoracayNavigation } from "./navigation";
import styles from "@/components/service-page.module.css";

export default function BoracayLayout({ children }: { children: ReactNode }) {
  const content = islandPages.boracay;
  const pages = Object.values(boracaySubpages).map(({ slug, path, label, title }) => ({ slug, path, label, title }));

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={`shell ${styles.breadcrumbs}`}>
        <BoracayBreadcrumbs spotTitle={content.title} pages={pages} parent={boracayGuideParent} />
      </div>
      <div className={`${styles.boracay} ${styles.boracayHero}`}>
        <PageHero
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.lead}
          image={content.image}
          context={content.context}
          quickLink={{ href: "/kite-size-guide/", label: "Kite size guide" }}
          imageSizes="100vw"
        />
      </div>
      <BoracayNavigation pages={pages} />
      {children}
    </main>
  );
}
