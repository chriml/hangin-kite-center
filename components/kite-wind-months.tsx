import type { WindMonth } from "@/content/kite-size-guide";
import styles from "./kite-size-guide.module.css";

export function KiteWindMonths({ months }: { months: readonly WindMonth[] }) {
  return (
    <div className={styles.tableWrap}>
      <table>
        <caption>Hangin&apos;s rough monthly wind guide</caption>
        <thead><tr><th scope="col">Month</th><th scope="col">Wind</th><th scope="col">What to expect</th></tr></thead>
        <tbody>{months.map(month => (
          <tr key={month.month}>
            <th scope="row">{month.label}</th>
            <td>{month.minKnots === null ? "No reliable range" : `${month.minKnots}–${month.maxKnots} knots${month.estimated ? " (estimate)" : ""}`}</td>
            <td>{month.note}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
