import Image from "next/image";
import { reviewPlatforms } from "@/content/site";
import styles from "@/app/page.module.css";

const starPath = "m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z";

export function ReviewBadges() {
  return (
    <div className={styles.heroReview} role="group" aria-label="Guest ratings">
      <div className={styles.reviewBadges}>
        {reviewPlatforms.map((platform) => (
          <a
            key={platform.name}
            className={styles.reviewBadge}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${platform.name}: ${platform.rating} out of 5${platform.cached ? " in the last available cached listing; current score unverified" : ""}. Read reviews.`}
            title={`${platform.name}: ${platform.rating} out of 5. ${platform.cached ? "Cached listing, current score unverified. Retrieved" : "Live listing checked"} ${platform.checkedAt}.`}
          >
            <Image className={platform.name === "Tripadvisor" ? styles.reviewLogoLight : undefined} src={platform.logo} width={platform.width} height={platform.height} alt={platform.name} />
            <span className={styles.reviewStars} aria-hidden="true">
              {[0, 1, 2, 3, 4].map((index) => {
                const clipId = `rating-${platform.name}-${index}`;
                const fill = Math.min(1, Math.max(0, platform.rating - index));
                return (
                  <svg key={index} width="18" height="18" viewBox="0 0 24 24" focusable="false">
                    <defs>
                      <clipPath id={clipId}>
                        <rect x="2" y="0" width={20 * fill} height="24" />
                      </clipPath>
                    </defs>
                    <path d={starPath} fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d={starPath} fill="currentColor" clipPath={`url(#${clipId})`} />
                  </svg>
                );
              })}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
