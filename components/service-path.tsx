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
      <h3 className={styles.servicePathHeading}>{heading}</h3>
      <span className={styles.servicePathDescription}>{description}</span>
      <span className={styles.servicePathArrow} aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}
