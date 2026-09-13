import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { siteImages } from "@/content/images";
import { siteConfig, sitePartners } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import styles from "./legal.module.css";
import serviceStyles from "@/components/service-page.module.css";

export const metadata = buildMetadata({
  title: "Legal information and credits",
  description: "Contact information, photo credits and licenses for the images, brand artwork, fonts and icons on the Hangin Kite Center website.",
  path: "/legal/",
});

const photographs = [
  { image: siteImages.school, title: "Kitesurfers boracay", use: "The social-sharing image is cropped from this photograph. The original website derivative is also retained." },
  { image: siteImages.bulabog, title: "Boracay Bulabog Beach top view", use: "Retained image file from an earlier website version; no longer displayed on the main pages." },
  { image: siteImages.riding, title: "Boracay kitesurfing", use: "Retained image file from an earlier website version; no longer displayed on the main pages." },
];

export default function LegalPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Legal information", item: absoluteUrl("/legal/") },
        ],
      }} />
      <div className={`shell ${serviceStyles.breadcrumbs}`}><Breadcrumbs current="Legal information" /></div>
      <header className={styles.intro}>
        <div className="shell">
          <h1>Legal information</h1>
          <p>Contact details and credits for the photographs, artwork, logos, fonts and icons used on this website.</p>
        </div>
      </header>
      <div className={`shell ${styles.sections}`}>
        <section aria-labelledby="website-contact">
          <h2 id="website-contact">Website contact</h2>
          <address>
            {siteConfig.name}<br />{siteConfig.location}<br />
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br />
            <a href={`tel:+${siteConfig.whatsappNumber}`}>{siteConfig.whatsappDisplay}</a>
          </address>
        </section>
        <section aria-labelledby="image-credits">
          <h2 id="image-credits">Image credits</h2>
          <p>Hangin supplied the current beach, riding, equipment and center photographs for use on this website. They are not offered under a public reuse license.</p>
          <p>The following photographs are used for social sharing or retained as image files from earlier versions of the site. Their individual licenses apply.</p>
          <ul className={styles.credits}>
            {photographs.map(({ image, title, use }) => (
              <li key={image.src}>
                <h3><a href={image.sourceUrl}>{title}</a></h3>
                <p>By {image.credit}. <a href={image.licenseUrl}>{image.license}</a>.</p>
                <p>{use} Website files were resized and converted to WebP; smaller responsive versions use the same source and license.</p>
                <a href={image.src}>View the image file</a>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="artwork">
          <h2 id="artwork">Illustrations and Hangin artwork</h2>
          <p>The decorative gear, stay and safari illustrations were created with OpenAI ImageGen. They are illustrations, not photographs of Hangin facilities or trips.</p>
          <p>The Hangin identity was prepared with ImageGen from the existing wordmark, approved by the website owner and converted to vector artwork. It is not offered under an open-content license.</p>
        </section>
        <section aria-labelledby="brand-marks">
          <h2 id="brand-marks">Brand marks</h2>
          <p>The <a href="https://www.ikointl.com/">IKO</a> and <a href="https://www.vdws.de/en/">VDWS</a> logos identify the instructor organizations mentioned on the About page. The website owner confirmed permission to display both marks. Ownership remains with the respective organizations.</p>
          <p>{sitePartners.map((partner, index) => <span key={partner.name}>{index > 0 && " and "}<a href={partner.href}>{partner.name}</a></span>)} marks identify Hangin&apos;s gear partners. The marks belong to their respective brands and Boards &amp; More.</p>
          <p><a href="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg">Google</a> and <a href="https://tripadvisor.mediaroom.com/logo-guidelines">Tripadvisor</a> logos identify links to their review platforms. They belong to Google LLC and Tripadvisor LLC and do not imply endorsement of Hangin.</p>
          <p>Logo proportions are preserved. Monochrome versions are shown in white on dark backgrounds. These brand marks are not covered by the image or software licenses listed here.</p>
        </section>
        <section aria-labelledby="fonts-icons">
          <h2 id="fonts-icons">Fonts and icons</h2>
          <ul className={styles.credits}>
            <li><h3>Barlow Condensed</h3><p>Copyright 2017 The Barlow Project Authors. Licensed under the SIL Open Font License 1.1.</p><a href="/licenses/barlowcondensed-OFL.txt">Barlow copyright and full license</a></li>
            <li><h3>Manrope</h3><p>Copyright 2018 The Manrope Project Authors. Licensed under the SIL Open Font License 1.1.</p><a href="/licenses/manrope-OFL.txt">Manrope copyright and full license</a></li>
            <li><h3>Tabler Icons</h3><p>Copyright 2020–2026 Paweł Kuna. Used under the MIT License.</p><a href="/licenses/tabler-icons.txt">Tabler copyright and full license</a></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
