import styles from "./location-map.module.css";

export function LocationMap({ embedUrl }: { embedUrl: string }) {
  return (
    <div className={styles.map}>
      <iframe
        src={embedUrl}
        title="Hangin Kite Center on Bulabog Beach, Boracay, on Google Maps"
        width="600"
        height="450"
        loading="eager"
        referrerPolicy="no-referrer"
        allowFullScreen
      />
    </div>
  );
}
