import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import sharedStyles from "@/components/service-page.module.css";
import styles from "./events.module.css";

export const metadata = {
  ...buildMetadata({
    title: "Events",
    description:
      "Events at Hangin Kite Center in Boracay. Details are coming soon. Contact the team on WhatsApp for current information.",
    path: "/events/",
  }),
  robots: { index: false, follow: true },
};

export default function EventsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Events", item: absoluteUrl("/events/") },
        ],
      }} />
      <div className={`shell ${sharedStyles.breadcrumbs}`}>
        <Breadcrumbs current="Events" />
      </div>
      <section className={styles.comingSoon}>
        <div className="shell">
          <h1>Events</h1>
          <p>Coming soon</p>
          <Link className="button" href="/">Back to home</Link>
        </div>
      </section>
    </main>
  );
}
