"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { getKiteGuide, riderLevels, type KiteGuideResult, type RiderLevel, type WeightUnit } from "@/content/kite-size-guide";
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
  const [arrivalYear, setArrivalYear] = useState("");
  const [departureMonth, setDepartureMonth] = useState("");
  const [departureYear, setDepartureYear] = useState("");
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
    const arrival = `${arrivalYear}-${arrivalMonth}-01`;
    const departure = `${departureYear}-${departureMonth}-01`;
    if (departure < arrival) {
      setResult({ status: "invalid", message: "Choose a departure month on or after your arrival month. Check the years if your trip crosses New Year." });
      return;
    }
    setResult(getKiteGuide({ weight: Number(weight), unit, arrival, departure, level }));
  }

  return (
    <div className={styles.calculator}>
      <form className={styles.form} onSubmit={calculate} onChange={() => setResult(null)} aria-labelledby="trip-heading">
        <h2 id="trip-heading">Your trip</h2>
        <p className={styles.formIntro}>All fields are needed. Your details stay on this page.</p>
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
          <p id="weight-help" className={styles.help}>For adults from 60 to 120 kg (about 132 to 265 lb).</p>
          <p id="travel-help" className={styles.help}>Choose the month and year for each end of your trip.</p>
          <div className={styles.travelPeriod}>
            <div className={styles.field}>
              <label htmlFor="arrival-month">Arrival month</label>
              <select id="arrival-month" required value={arrivalMonth} onChange={event => setArrivalMonth(event.target.value)} aria-describedby="travel-help">
                <option value="" disabled>Choose month</option>
                {months.map((month, index) => <option key={month} value={String(index + 1).padStart(2, "0")}>{month}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="arrival-year">Arrival year</label>
              <input id="arrival-year" type="text" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} placeholder="YYYY" title="Enter a four-digit year, such as 2027" required value={arrivalYear} onChange={event => setArrivalYear(event.target.value)} />
            </div>
          </div>
          <div className={styles.travelPeriod}>
            <div className={styles.field}>
              <label htmlFor="departure-month">Departure month</label>
              <select id="departure-month" required value={departureMonth} onChange={event => setDepartureMonth(event.target.value)} aria-describedby="travel-help">
                <option value="" disabled>Choose month</option>
                {months.map((month, index) => <option key={month} value={String(index + 1).padStart(2, "0")}>{month}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="departure-year">Departure year</label>
              <input id="departure-year" type="text" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} placeholder="YYYY" title="Enter a four-digit year, such as 2027" required value={departureYear} onChange={event => setDepartureYear(event.target.value)} />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="rider-level">Riding level</label>
            <select id="rider-level" required value={level} onChange={event => setLevel(event.target.value as RiderLevel)} aria-describedby="level-help">
              <option value="" disabled>Choose your level</option>
              {riderLevels.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            <p id="level-help" className={styles.help}>{riderLevels.find(item => item.value === level)?.detail ?? "Choose beginner if you still need an instructor."}</p>
          </div>
          <button className="button button--dark" type="submit">Show my 3 setups <span aria-hidden="true">↗</span></button>
        </fieldset>
        <noscript><p className={styles.noScript}>Enable JavaScript to compare your setups, or use the size chart below and ask Hangin about your trip.</p></noscript>
      </form>

      <section className={styles.results} aria-labelledby="setups-heading">
        <h2 id="setups-heading" ref={resultHeading} tabIndex={-1}>
          {result?.status === "ready" ? "Your three possible setups" : result?.status === "invalid" ? "Check your trip details" : result ? "Check your setup with us" : "Three ways to pack"}
        </h2>
        {!result && <>
          <p>Fill in your trip details to see kite size ranges for these three packing options.</p>
          <ul className={styles.emptyList}>
            <li><span>One kite</span><p>Keep the bag light.</p></li>
            <li><span>Two kites</span><p>Bring a smaller and a larger size.</p></li>
            <li><span>Three kites</span><p>Add a middle size to the bag.</p></li>
          </ul>
          <p className={styles.help}>For freeride kites with a twin-tip board. Check the exact kite, board and conditions with Hangin before packing.</p>
        </>}
        {result?.status === "invalid" && <p role="alert">{result.message}</p>}
        {result && result.status !== "invalid" && <>
          <div className={styles.seasonNote}>
            <h3>{result.season.title}</h3>
            <p>{result.season.body}</p>
          </div>
          <p className={styles.levelNote}>{result.levelNote}</p>
          {result.status === "team-check" ? <p>{result.message}</p> : <>
            <p className={styles.resultIntro}>Using the {result.weightBand} reference band. Choose one kite size from each range shown. These are planning estimates, not a forecast or rental stock list.</p>
            <ol className={styles.setupList}>
              {result.setups.map(setup => <li key={setup.title} className={styles.setup}>
                <h3>{setup.title}</h3>
                <ul className={styles.kiteSizes}>
                  {setup.kites.map(kite => <li key={kite.label}>
                    <p className={styles.size}>{kite.size}<span>m²</span></p>
                    <p className={styles.wind}>{kite.label}<br />{kite.wind} knots</p>
                  </li>)}
                </ul>
                <p>{setup.description}</p>
              </li>)}
            </ol>
            <p className={styles.help}>The wind figures are chart references for separate conditions, not the operating limits of any specific kite. Stronger wind may be unsuitable for your level. Use the exact model&apos;s wind chart and the beach team&apos;s advice.</p>
          </>}
        </>}
      </section>
    </div>
  );
}
