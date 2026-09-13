import { lessonVideos } from "@/content/videos";
import styles from "./lesson-videos.module.css";

export function LessonVideos() {
  return (
    <section className={styles.section} aria-labelledby="beach-practice-heading">
      <div className={`shell ${styles.layout}`}>
        <div className={styles.intro}>
          <p className="eyebrow">On the beach</p>
          <h2 id="beach-practice-heading">Before the board hits the water.</h2>
          <p>See a few moments of kite handling and movement practice on the sand.</p>
          <p className={styles.note}>Two short clips, without sound. Press play to watch.</p>
        </div>
        <div className={styles.clips}>
          {lessonVideos.map((clip) => (
            <figure className={styles.clip} key={clip.id}>
              <video
                className={styles.video}
                src={clip.src}
                poster={clip.poster}
                width={clip.width}
                height={clip.height}
                controls
                playsInline
                muted
                preload="none"
                aria-label={clip.title}
                aria-describedby={`${clip.id}-description`}
              >
                Your browser cannot play this video. Read the description below.
              </video>
              <figcaption>
                <p className={styles.duration}>{clip.duration} · Silent video</p>
                <h3>{clip.title}</h3>
                <p id={`${clip.id}-description`}>{clip.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
