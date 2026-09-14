import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { ProofStrip } from "@/components/proof-strip";
import { ResponsiveImage } from "@/components/responsive-image";
import { ReviewBadges } from "@/components/review-badges";
import { SpotGuide } from "@/components/spot-guide";
import { siteImages } from "@/content/images";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import styles from "./page.module.css";

const homepageDescription =
  "Kitesurfing lessons, equipment rental, storage, accommodation, shop and kite safaris with Hangin Kite Center on Bulabog Beach, Boracay.";

export const metadata = buildMetadata({
  title: "Kitesurfing in Boracay | Hangin Kite Center",
  description: homepageDescription,
  path: "/",
});

const services = [
  {
    eyebrow: "Kitesurfing lessons",
    heading: "Learn to kitesurf",
    copy: "Start from zero, work on your first rides, or sharpen a skill with a session matched to your level and the conditions.",
    href: "/kitesurfing-lessons/",
    link: "View lessons",
    image: siteImages.lessonPair,
  },
  {
    eyebrow: "Rental & storage",
    heading: "Rent gear or store your own.",
    copy: "Rent a setup for your session or keep your own equipment by the spot. Ask what is available during your stay.",
    href: "/rentals-storage/",
    link: "View rental and storage",
    image: siteImages.rentalBoards,
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
    image: siteImages.shopFront,
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
      "Amihan, roughly November to April, is the main kite season at Bulabog Beach. During Habagat, roughly June to October, Hangin moves sessions to the other side of Boracay. Ask on WhatsApp about conditions and the meeting point for your dates.",
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

export default function Home() {
  const heroImage = siteImages.boardRiding;
  const storyImage = siteImages.hanginCenter;

  return (
    <main id="main-content" tabIndex={-1} className={styles.home} data-cinematic-hero>
      <section id="start" className={styles.hero} aria-labelledby="hero-heading">
        <ResponsiveImage
          image={heroImage}
          className={styles.heroImage}
          sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
          priority
        />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <a className={styles.heroPlace} href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Bulabog Beach, Boracay on Google Maps">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
                <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Bulabog Beach, Boracay
            </a>
            <h1 id="hero-heading">
              <span>If the wind is up,</span>{" "}
              <span>we&apos;re out.</span>
            </h1>
            <p className={styles.heroLead}>
              Kitesurfing since 2001.
              <br />
              Join us on Bulabog&apos;s warm lagoon.
            </p>
            <div className={styles.heroActions}>
              <ContactCta compact />
            </div>
            <p className={styles.heroNote}>
              Send your dates and riding level.
              <br />
              We&apos;ll take it from there.
            </p>
          </div>
        </div>
        <div className={styles.heroEdge}>
          <p className={styles.heroTag}>
            <Image
              src="/brand/partners/duotone-mark.svg"
              width={48}
              height={55}
              alt=""
              className={styles.heroTagLogo}
              loading="eager"
            />
            <span>{siteConfig.centerDesignation}</span>
          </p>
          <ReviewBadges />
        </div>
      </section>

      <ProofStrip />

      <section id="services" className={styles.servicesSection}>
        <div className={`shell ${styles.sectionHeading}`}>
          <h2>Your Boracay kite experience.</h2>
        </div>
        <div className={styles.serviceBands}>
          {services.map((service) => (
            <article className={styles.serviceBand} key={service.eyebrow}>
              <div className={styles.serviceImage}>
                {service.image.kind === "generated" && <span className={styles.illustrationLabel}>Illustration</span>}
                <ResponsiveImage
                  image={service.image}
                  className={styles.coverImage}
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

      <SpotGuide />

      <section id="story" className={styles.storySection}>
        <div className={`shell ${styles.storyGrid}`}>
          <div className={styles.storyCopy}>
            <p className="eyebrow">The center</p>
            <h2>Kitesurfing since 2001.</h2>
            <p>
              Hangin Kite Center is a kitesurfing school on Bulabog Beach,
              Boracay. We teach complete beginners, progressing riders and
              advanced kiters with IKO and VDWS instructors. You can also ask
              us about gear rental, storage and a stay near the kite beach.
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
          </figure>
        </div>
      </section>

      <section id="questions" className={styles.questionsSection}>
        <div className={`shell ${styles.questionsGrid}`}>
          <div className={styles.questionsHeading}>
            <p className="eyebrow">FAQ</p>
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
            <p className="eyebrow">Talk to Hangin</p>
            <h2>Ask us anything.</h2>
          </div>
          <div className={styles.contactCopy}>
            <p>
              Questions about lessons, gear, where to stay or life on Boracay?
              Send us a message. We&apos;ll get back to you within one day.
            </p>
            <ContactCta />
          </div>
        </div>
      </section>
    </main>
  );
}
