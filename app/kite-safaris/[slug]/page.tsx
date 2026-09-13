import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { safariTrips } from "@/content/safari-trips";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import sharedStyles from "@/components/service-page.module.css";
import styles from "../safaris.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return safariTrips.map(({ slug }) => ({ slug }));
}

function findTrip(slug: string) {
  const trip = safariTrips.find((trip) => trip.slug === slug);
  if (!trip) notFound();
  return trip;
}

export async function generateMetadata({ params }: Props) {
  const trip = findTrip((await params).slug);
  return {
    ...buildMetadata({
      title: `${trip.name} Kite Safari`,
      description: `${trip.name} kite safari details are coming soon. Return to Hangin's kite safari page to request information from the team on WhatsApp.`,
      path: trip.path,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function SafariTripPage({ params }: Props) {
  const trip = findTrip((await params).slug);
  return (
    <main id="main-content" tabIndex={-1}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Kite safaris", item: absoluteUrl("/kite-safaris/") },
          { "@type": "ListItem", position: 3, name: trip.name, item: absoluteUrl(trip.path) },
        ],
      }} />
      <div className={`shell ${sharedStyles.breadcrumbs}`}>
        <Breadcrumbs current={trip.name} parent={{ label: "Kite safaris", href: "/kite-safaris/" }} />
      </div>
      <section className={styles.comingSoon}>
        <div className="shell">
          <h1>{trip.name}</h1>
          <p>Coming soon…</p>
          <Link className="button" href="/kite-safaris/">Back to kite safaris</Link>
        </div>
      </section>
    </main>
  );
}
