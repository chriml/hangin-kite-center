import { windguruForecast } from "@/content/forecast";
import styles from "./wind-forecast.module.css";

export function WindForecast() {
  return (
    <section className={styles.section} aria-labelledby="windguru-heading">
      <div className="shell">
        <div className={styles.intro}>
          <div>
            <p className="eyebrow">Before you rig</p>
            <h2 id="windguru-heading" tabIndex={-1}>Windguru forecast for Bulabog</h2>
          </div>
          <div className={styles.copy}>
            <a className="button" href={windguruForecast.url} target="_blank" rel="noopener noreferrer">Open Windguru</a>
          </div>
        </div>
        <div className={styles.viewport}>
          <iframe
            src={windguruForecast.embedUrl}
            title="Windguru GFS forecast for Hangin, Bulabog Beach, Boracay"
            width="1100"
            height="360"
            loading="eager"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
        <p className={styles.note}>Drag or swipe across the forecast to see later hours. Open Windguru to check its update time, compare models or view the forecast if it does not load here.</p>
      </div>
    </section>
  );
}
