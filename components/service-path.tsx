import Link from "next/link";
import styles from "@/app/page.module.css";

export function ServicePath({
  href,
  heading,
  description,
}: {
  href: string;
  heading: string;
  description: string;
}) {
  return (
    <Link className={styles.servicePath} href={href}>
      <span className={styles.servicePathHeading}>{heading}</span>
      <span className={styles.servicePathDescription}>{description}</span>
      <span className={styles.servicePathArrow} aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}
