import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="not-found">
      <p className="eyebrow">404 · Boracay</p>
      <h1>{"We couldn't find that page."}</h1>
      <p>Hangin is still on Bulabog Beach.</p>
      <Link className="button button--dark" href="/">
        Back to Hangin
      </Link>
    </main>
  );
}
