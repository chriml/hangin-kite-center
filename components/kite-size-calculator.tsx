"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { getKiteGuide, riderLevels, type KiteGuideResult, type RiderLevel, type WeightUnit } from "@/content/kite-size-guide";
import { KiteWindMonths } from "@/components/kite-wind-months";
import styles from "./kite-size-guide.module.css";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function KiteSizeCalculator() {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<WeightUnit>("kg");
  const [arrivalMonth, setArrivalMonth] = useState("");
  const [departureMonth, setDepartureMonth] = useState("");
  const [level, setLevel] = useState<RiderLevel | "">("");
  const [result, setResult] = useState<KiteGuideResult | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (result) resultHeading.current?.focus();
  }, [result]);

  function changeUnit(next: WeightUnit) {
    if (weight && Number.isFinite(Number(weight))) {
      const converted = next === "lb" ? Number(weight) / 0.45359237 : Number(weight) * 0.45359237;
      setWeight(String(Math.round(converted * 1000) / 1000));
    }
    setUnit(next);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!level) return;
    setResult(getKiteGuide({ weight: Number(weight), unit, arrivalMonth: Number(arrivalMonth), departureMonth: Number(departureMonth), level }));
  }

  return (
    <div className={styles.calculator}>
      <form className={styles.form} onSubmit={calculate} onChange={() => setResult(null)} aria-labelledby="trip-heading">
        <h2 id="trip-heading">Your trip</h2>
        <p className={styles.formIntro}>Your details stay on this page.</p>
        <fieldset disabled={!ready} className={styles.fields}>
          <legend className={styles.srOnly}>Rider and travel details</legend>
          <div className={styles.weightFields}>
            <div className={styles.field}>
              <label htmlFor="rider-weight">Your weight</label>
              <input id="rider-weight" type="number" inputMode="decimal" min="1" max="1000" step="any" required value={weight} onChange={event => setWeight(event.target.value)} aria-describedby="weight-help" placeholder={unit === "kg" ? "e.g. 75" : "e.g. 165"} />
            </div>
            <div className={styles.field}>
              <label htmlFor="weight-unit">Unit</label>
              <select id="weight-unit" value={unit} onChange={event => changeUnit(event.target.value as WeightUnit)}>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>
          <p id="weight-help" className={styles.help}>Adults, 60–120 kg (132–265 lb).</p>
          <div className={styles.travelPeriod}>
            <div className={styles.field}>
              <label htmlFor="arrival-month">Arrival month</label>
              <select id="arrival-month" required value={arrivalMonth} onChange={event => setArrivalMonth(event.target.value)}>
                <option value="" disabled>Choose month</option>
                {months.map((month, index) => <option key={month} value={String(index + 1).padStart(2, "0")}>{month}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="departure-month">Departure month</label>
              <select id="departure-month" required value={departureMonth} onChange={event => setDepartureMonth(event.target.value)}>
                <option value="" disabled>Choose month</option>
                {months.map((month, index) => <option key={month} value={String(index + 1).padStart(2, "0")}>{month}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="rider-level">Riding level</label>
            <select id="rider-level" required value={level} onChange={event => setLevel(event.target.value as RiderLevel)} aria-describedby="level-help">
              <option value="" disabled>Choose your level</option>
              {riderLevels.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            <p id="level-help" className={styles.help}>{riderLevels.find(item => item.value === level)?.detail ?? "Still learning? Choose beginner."}</p>
          </div>
          <button className="button button--dark" type="submit">Compare my setups <span aria-hidden="true">↗</span></button>
        </fieldset>
        <noscript><p className={styles.noScript}>Enable JavaScript to compare your setups, or use the size chart below and ask Hangin about your trip.</p></noscript>
      </form>

      <section className={styles.results} aria-labelledby="setups-heading">
        <h2 id="setups-heading" ref={resultHeading} tabIndex={-1}>
          {result?.status === "ready" ? "Your packing options" : result?.status === "invalid" ? "Check your trip details" : result ? "Check your setup with us" : "Three ways to pack"}
        </h2>
        {!result && <>
          <p>Enter your trip details to compare kite sizes.</p>
          <ul className={styles.emptyList}>
            <li><span>One kite</span><p>Keep the bag light.</p></li>
            <li><span>Two kites</span><p>Bring a smaller and a larger size.</p></li>
            <li><span>Three kites</span><p>Add a middle size to the bag.</p></li>
          </ul>
          <p className={styles.help}>For twin-tip freeride. Check your setup with Hangin before packing.</p>
        </>}
        {result?.status === "invalid" && <p role="alert">{result.message}</p>}
        {result && result.status !== "invalid" && <>
          {result.status === "team-check" ? <p>{result.message}</p> : <>
            <ol className={styles.setupList}>
              {result.setups.map(setup => <li key={setup.title} className={styles.setup}>
                <h3>{setup.title}</h3>
                {setup.kites.length > 0 && <ul className={styles.kiteSizes}>
                  {setup.kites.map(kite => <li key={kite.size}>
                    <p className={styles.size}>{kite.size}<span>m²</span></p>
                  </li>)}
                </ul>}
                <p>{setup.description}</p>
              </li>)}
            </ol>
          </>}
          <p className={styles.levelNote}>{result.levelNote}</p>
          {result.wind.maxKnots !== null && result.wind.maxKnots > 28 && <p className={styles.windLimit}>January can reach 30 knots, occasionally 35. These suggestions stop at the chart’s 28-knot limit. Check the forecast and sit out conditions beyond your gear or ability.</p>}
          <details className={styles.explanation}>
            <summary>{result.status === "ready" ? "How these sizes are chosen" : "Wind for your months"}</summary>
            {result.status === "ready" && <>
              <p>One kite uses a {result.planningWindKnots}-knot planning reference: the median of your months’ wind-range midpoints. Each month counts equally.</p>
              <p>Two kites target the median lower and upper month references. Three add a middle choice. We compare combinations and keep at least 2 m² and 20% between sizes.</p>
              <p>Sizes use the midpoint of each chart range, rounded to a whole size with half steps rounded down. Your weight band is {result.weightBand}. These are packing estimates; check the wind range for your exact kite and board.</p>
            </>}
            <p>{result.season.body}</p>
            <KiteWindMonths months={result.wind.months} />
            <p>Hangin’s seasonal estimates, not measured averages or a forecast. December and March are broad estimates.</p>
          </details>
        </>}
      </section>
    </div>
  );
}
