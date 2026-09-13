import { advancedLessonPackages, lessonCourses, lessonPrice } from "@/content/water-pages";
import { LessonEnquiry } from "@/components/lesson-enquiry";
import styles from "./lesson-overview.module.css";

export function LessonOverview() {
  return (
    <section className={styles.overview} aria-labelledby="course-overview">
      <div className="shell">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">Courses & prices</p>
            <h2 id="course-overview">Your next step on the water.</h2>
          </div>
        </div>
        <div className={styles.columns} aria-hidden="true">
          <span>Course</span><div><span>Private</span><span>Group</span><span>Per person</span></div><span />
        </div>
        <ul className={styles.courses}>
          {lessonCourses.map(({ id, heading, suitability, price, privateHours, groupHours }) => (
            <li key={id} className={id === "full-course" ? styles.fullCourse : undefined}>
              <div className={styles.courseIntro}>
                <a href={`#${id}`}>{heading}</a>
                <p>{suitability}</p>
              </div>
              <dl>
                <div><dt>Private</dt><dd>{privateHours} hours</dd></div>
                <div><dt>Group</dt><dd>{groupHours} hours</dd></div>
                <div><dt>Per person</dt><dd>{lessonPrice(price)}</dd></div>
              </dl>
              <LessonEnquiry course={heading} className={styles.enquiry} />
            </li>
          ))}
        </ul>
        <p className={styles.note}>Beginner courses include lesson equipment, applicable taxes and mandatory fees. The price per person is the same for private and group courses. Groups have at most two students per instructor, sharing one kite; group hours are the duration of the session.</p>
        <div className={styles.advanced}>
          <div>
            <p className="eyebrow">Already riding?</p>
            <a href="#advanced-private-coaching">Advanced private coaching</a>
          </div>
          <dl>
            {advancedLessonPackages.map(({ hours, price }) => (
              <div key={hours}><dt>{hours} {hours === 1 ? "hour" : "hours"}</dt><dd>{lessonPrice(price)}</dd></div>
            ))}
          </dl>
          <LessonEnquiry course="Advanced private coaching" className={styles.enquiry} />
        </div>
      </div>
    </section>
  );
}
