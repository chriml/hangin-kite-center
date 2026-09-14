"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import type { PublicRoute } from "@/content/site";
import styles from "./boracay.module.css";
import { MenuIcon } from "./menu-icon";

type GuideLink = { slug: string; path: PublicRoute; label: string; title: string };

export function BoracayBreadcrumbs({ spotTitle, pages, parent }: {
  spotTitle: string;
  pages: GuideLink[];
  parent: { label: string; href: PublicRoute };
}) {
  const segment = useSelectedLayoutSegment();
  const page = pages.find(page => page.slug === segment);

  return <Breadcrumbs current={page?.title ?? spotTitle} parent={page ? { ...parent, scroll: false } : undefined} />;
}

export function BoracayNavigation({ pages }: { pages: GuideLink[] }) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className={styles.submenu} aria-label="Explore Boracay">
      <ul className="shell">
        <li><Link href="/kitesurfing-boracay/" scroll={false} aria-current={segment === null ? "page" : undefined}><MenuIcon name="spot" />Spot guide</Link></li>
        <li><a href="/kitesurfing-boracay/#windguru-heading"><MenuIcon name="forecast" />Forecast</a></li>
        {pages.map(({ slug, path, label }) => (
          <li key={slug}>
            <Link href={path} scroll={false} aria-current={segment === slug ? "page" : undefined}><MenuIcon name={slug} />{label}</Link>
          </li>
        ))}
        <li><Link href="/kite-safaris/"><MenuIcon name="safari" />Kite safaris <span aria-hidden="true">↗</span></Link></li>
      </ul>
    </nav>
  );
}
