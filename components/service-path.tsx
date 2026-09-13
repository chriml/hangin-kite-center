import Link from "next/link";
import { ResponsiveImage } from "@/components/responsive-image";
import type { SiteImage } from "@/content/images";
import styles from "@/app/page.module.css";

export function ServicePath({
  href,
  heading,
  description,
  image,
}: {
  href: string;
  heading: string;
  description: string;
  image: SiteImage;
}) {
  return (
    <Link className={styles.servicePath} href={href}>
      <ResponsiveImage
        image={image}
        className={styles.servicePathImage}
        sizes="(min-width: 1180px) 590px, (min-width: 860px) calc(50vw - 1rem), calc(100vw - 2rem)"
      />
      <div className={styles.servicePathContent}>
        <h3 className={styles.servicePathHeading}>{heading}</h3>
        <span className={styles.servicePathDescription}>{description}</span>
        <span className={styles.servicePathArrow} aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}
