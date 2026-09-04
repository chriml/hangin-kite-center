import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { ProofStrip } from "@/components/proof-strip";
import { ResponsiveImage } from "@/components/responsive-image";
import { ServicePath } from "@/components/service-path";
import { SpotGuide } from "@/components/spot-guide";
import { siteImages } from "@/content/images";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

const homepageDescription =
  "Kitesurfing lessons, equipment rental, storage, accommodation, shop and kite safaris with Hangin Kite Center on Bulabog Beach, Boracay.";

export const metadata = buildMetadata({
  title: "Kitesurfing in Boracay | Hangin Kite Center",
  description: homepageDescription,
  path: "/",
});

const guestPaths = [
  {
    href: "/kitesurfing-lessons/",
    heading: "Learn to kitesurf",
    description:
      "Start from zero, work on your first rides, or sharpen a skill with a session matched to your level and the conditions.",
  },
  {
    href: "/rentals-storage/",
    heading: "Sort out your gear",
    description:
      "Rent a full setup for your session or store your own equipment by the spot. Ask what is available for your dates.",
  },
  {
    href: "/accommodation/",
    heading: "Stay by the spot",
    description:
      "Ask about accommodation near Bulabog Beach and the kite spot. We will check what is available for your dates.",
  },
  {
    href: "/kite-safaris/",
    heading: "Ask about a kite safari",
    description:
      "Kite trips depend on the wind, rider level and local water conditions. Ask what may work during your stay.",
  },
] as const;

const services = [
  {
    eyebrow: "Rental & storage",
    heading: "Ride without flying your gear.",
    copy: "Rent a setup for your session or keep your own equipment by the spot. Ask what is available during your stay.",
    href: "/rentals-storage/",
    link: "View rental and storage",
    image: siteImages.gearArt,
  },
  {
    eyebrow: "Accommodation",
    heading: "Stay close to the kite beach.",
    copy: "Ask about accommodation near Bulabog Beach and the kite spot. We'll check what is available for your dates.",
    href: "/accommodation/",
    link: "Ask about a stay",
    image: siteImages.stayArt,
  },
  {
    eyebrow: "Kite shop",
    heading: "Check what is on the rack.",
    copy: "The shop covers kite equipment and beach essentials. Message us if you need to know what is in stock today.",
    href: "/shop/",
    link: "Visit the shop page",
    image: siteImages.gearArt,
  },
  {
    eyebrow: "Kite safaris",
    heading: "Trips follow the conditions.",
    copy: "Kite trips depend on the wind, rider level and local water conditions. Ask what may work during your stay.",
    href: "/kite-safaris/",
    link: "Ask about kite trips",
    image: siteImages.safariArt,
  },
] as const;

const questions = [
  {
    question: "Do I need experience?",
    answer:
      "No. Hangin teaches complete beginners as well as progressing and advanced riders. Tell us your level so we can point you to the right session.",
  },
  {
    question: "When is the kite season?",
    answer:
      "Boracay's Amihan season generally runs from roughly November to April. Wind changes, so ask on WhatsApp about current conditions before arranging time on the water.",
  },
  {
    question: "What should I bring?",
    answer:
      "What you need depends on the session and whether you are bringing your own equipment. Send us your plans on WhatsApp and we'll tell you what to bring.",
  },
  {
    question: "Can I rent equipment?",
    answer:
      "Hangin offers equipment rental. Send your dates, riding level and usual sizes on WhatsApp so we can check a setup for your trip.",
  },
  {
    question: "Can I store my own gear?",
    answer:
      "Yes. Hangin offers equipment storage by the spot. Ask on WhatsApp about the current arrangement for your dates.",
  },
  {
    question: "How do I arrange a session?",
    answer:
      "Send your dates and riding level on WhatsApp. Check the session, total cost and cancellation terms with Hangin before agreeing to a booking.",
  },
] as const;

function PhotoCredit({
  image,
  context,
}: {
  image: typeof siteImages.school | typeof siteImages.riding;
  context: string;
}) {
  return (
    <figcaption className={styles.photoCredit}>
      {context}{" "}Photo by <a href={image.sourceUrl}>{image.credit}</a>, licensed{" "}
      <a href={image.licenseUrl}>{image.license}</a>. Resized and converted to WebP.
    </figcaption>
  );
}

export default function Home() {
  const heroImage = siteImages.school;
  const storyImage = siteImages.riding;

  return (
    <main id="main-content" tabIndex={-1} className={styles.home}>
      <section id="start" className={styles.hero}>
        <div className={`shell ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">Bulabog Beach, Boracay</p>
            <h1>Welcome to Hangin Kite Center.</h1>
            <p className={styles.heroLead}>
              Complete beginners and experienced riders are welcome. Come find
              us on Bulabog Beach for lessons, rental, storage, accommodation,
              the kite shop and kite safaris. If the wind is up, we&apos;re out
              there.
            </p>
            <div className={styles.heroActions}>
              <ContactCta compact />
            </div>
            <p className={styles.heroNote}>
              Send your dates, riding level and what you need. We&apos;ll help you
              work out the next step around current conditions.
            </p>
          </div>
          <figure className={`${styles.proofFigure} ${styles.heroFigure}`}>
            <ResponsiveImage
              image={heroImage}
              className={styles.coverImage}
              sizes="(min-width: 1180px) 570px, (min-width: 860px) 48vw, calc(100vw - 2rem)"
              priority
            />
            <PhotoCredit image={heroImage} context="Boracay kitesurfing context." />
          </figure>
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

      <ProofStrip />

      <section id="choose" className={styles.chooseSection}>
        <div className={`shell ${styles.sectionHeading}`}>
          <p className="eyebrow">Choose your way in</p>
          <h2>What brings you to Bulabog?</h2>
        </div>
        <div className={`shell ${styles.pathGrid}`}>
          {guestPaths.map((path) => (
            <ServicePath key={path.heading} {...path} />
          ))}
        </div>
      </section>

      <SpotGuide />

      <section id="services" className={styles.servicesSection}>
        <div className={`shell ${styles.sectionHeading}`}>
          <p className="eyebrow">Around the session</p>
          <h2>Leave the board bag at home.</h2>
        </div>
        <div className={styles.serviceBands}>
          {services.map((service) => (
            <article className={styles.serviceBand} key={service.eyebrow}>
              <div className={styles.serviceImage}>
                <span className={styles.illustrationLabel}>Illustration</span>
                <ResponsiveImage
                  image={service.image}
                  className={styles.coverImage}
                  alt=""
                  sizes="(min-width: 1180px) 590px, (min-width: 760px) 50vw, 100vw"
                />
              </div>
              <div className={styles.serviceCopy}>
                <p className="eyebrow">{service.eyebrow}</p>
                <h3>{service.heading}</h3>
                <p>{service.copy}</p>
                <Link className={styles.textLink} href={service.href}>
                  {service.link}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="story" className={styles.storySection}>
        <div className={`shell ${styles.storyGrid}`}>
          <div className={styles.storyCopy}>
            <p className="eyebrow">The center</p>
            <h2>Kitesurfing here since 2002.</h2>
            <p>
              Hangin has taught on Bulabog Beach since 2002. Today the center
              covers lessons, rental, storage, stays, the shop and kite trips.
            </p>
            <Link className={styles.textLink} href="/about/">
              About Hangin
            </Link>
          </div>
          <figure className={`${styles.proofFigure} ${styles.storyFigure}`}>
            <ResponsiveImage
              image={storyImage}
              className={styles.coverImage}
              sizes="(min-width: 1180px) 650px, (min-width: 860px) 55vw, calc(100vw - 2rem)"
            />
            <PhotoCredit image={storyImage} context="Boracay riding context." />
          </figure>
        </div>
      </section>

      <section id="questions" className={styles.questionsSection}>
        <div className={`shell ${styles.questionsGrid}`}>
          <div className={styles.questionsHeading}>
            <p className="eyebrow">Practical questions</p>
            <h2>Before you hit the water.</h2>
          </div>
          <div className={styles.faqList}>
            {questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contactSection}>
        <div className={`shell ${styles.contactGrid}`}>
          <div>
            <p className="eyebrow">Plan the session</p>
            <h2>Tell us when you&apos;re coming.</h2>
          </div>
          <div className={styles.contactCopy}>
            <p>
              Send your dates, riding level and what you need. We&apos;ll tell you
              what works with the current conditions.
            </p>
            <ContactCta />
          </div>
        </div>
      </section>
    </main>
  );
}
