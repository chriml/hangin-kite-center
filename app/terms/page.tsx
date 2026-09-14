import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getPrimaryContactAction, siteConfig } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import styles from "./terms.module.css";

const title = "Website use and inquiries";
export const metadata = buildMetadata({
  title: "Website Inquiries and Complaints",
  description: "How to ask Hangin Kite Center about a Boracay trip, check service details and contact the team about a complaint.",
  path: "/terms/",
});

const sections = [
  ["inquiries", "Planning a service"],
  ["conditions", "Conditions and safety"],
  ["third-parties", "Linked services and images"],
  ["consumer-rights", "Consumer rights"],
  ["complaints", "Complaints"],
] as const;

export default function TermsPage() {
  const complaintContact = getPrimaryContactAction("complaint", "direct");
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: title, item: absoluteUrl("/terms/") },
        ],
      }} />
      <div className={`shell ${styles.breadcrumbs}`}><Breadcrumbs current={title} /></div>
      <header className={styles.hero}>
        <div className={`shell ${styles.heroGrid}`}>
          <div><p className="eyebrow">Website inquiries</p><h1>{title}</h1></div>
          <div className={styles.heroDetail}>
            <p>This website introduces Hangin on Bulabog Beach and gives you ways to contact the team. It does not take bookings or payments.</p>
          </div>
        </div>
      </header>
      <div className={`shell ${styles.termsLayout}`}>
        <nav className={styles.contents} aria-label="On this page">
          <p className="eyebrow">On this page</p>
          <ol>{sections.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol>
        </nav>
        <div className={styles.sections}>
          <section id="inquiries" aria-labelledby="inquiries-heading">
            <p className={styles.sectionNumber}>01</p><div>
              <h2 id="inquiries-heading">Check the details with Hangin</h2>
              <p>A first message starts an inquiry. Check the service, dates, total cost, payment steps and cancellation or rescheduling terms with Hangin before agreeing to a booking. Keep any written confirmation and payment record.</p>
              <p>Lesson, rental, storage, accommodation, shop and safari details depend on your plans and current conditions. Ask for current information before making travel arrangements.</p>
            </div>
          </section>
          <section id="conditions" aria-labelledby="conditions-heading">
            <p className={styles.sectionNumber}>02</p><div>
              <h2 id="conditions-heading">Conditions and safety</h2>
              <p>Beach and wind information here is general guidance. Check the conditions and safety instructions at the spot before going on the water. Ask about the participation requirements for your chosen activity.</p>
              <p>For a rider under 18, a parent or legal guardian should contact Hangin first. Ask for intake instructions before sharing health information.</p>
            </div>
          </section>
          <section id="third-parties" aria-labelledby="third-parties-heading">
            <p className={styles.sectionNumber}>03</p><div>
              <h2 id="third-parties-heading">Linked services and images</h2>
              <p>WhatsApp, email providers and linked websites have their own terms and privacy practices. If another provider is involved in your plans, ask who will provide the service and which terms apply.</p>
              <p>Photo credits identify the source and license of third-party images. Their reuse follows those licenses. Generated artwork is supporting illustration. See the <a href="/legal/#image-credits">image credits</a>.</p>
            </div>
          </section>
          <section id="consumer-rights" aria-labelledby="consumer-rights-heading">
            <p className={styles.sectionNumber}>04</p><div>
              <h2 id="consumer-rights-heading">Consumer rights</h2>
              <p>Nothing on this page excludes mandatory consumer rights or liability that cannot lawfully be excluded. The information here is not a liability waiver.</p>
            </div>
          </section>
          <section id="complaints" aria-labelledby="complaints-heading">
            <p className={styles.sectionNumber}>05</p><div>
              <h2 id="complaints-heading">Contact Hangin about a problem</h2>
              <p>Tell us the service or item, the relevant dates, what happened and the outcome you are asking for. Ask how to share supporting documents before sending identity, health or payment details.</p>
              <div className={styles.complaintLinks}>
                <a className="button button--coral" href={`mailto:${siteConfig.email}?subject=Complaint`}>Email a complaint</a>
                <a className={styles.textLink} href={complaintContact.href} target={complaintContact.target} rel={complaintContact.rel} aria-label={complaintContact.accessibleLabel}>{complaintContact.label}</a>
              </div>
              <p>You can find consumer complaint guidance through the <a href="https://consumercare.dti.gov.ph/">DTI Consumer Care system</a>. This contact route does not limit other remedies available under law.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
