import styles from "@/app/page.module.css";

const facts = [
  "On the beach since 2002",
  "IKO & VDWS instruction",
  "Lessons · rental · storage",
  "Stay close to the spot",
] as const;

export function ProofStrip() {
  return (
    <aside className={styles.proofStrip} aria-label="Hangin at a glance">
      <ul className={`shell ${styles.proofList}`}>
        {facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </aside>
  );
}
