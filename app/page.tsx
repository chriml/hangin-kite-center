export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Hangin Kite Center",
    description:
      "Kite school offering beginner to advanced kitesurf lessons with certified instructors.",
    sport: "Kitesurfing",
    url: "https://www.hanginkitecenter.com",
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-6 py-16">
      <header className="space-y-6">
        <p className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-800">
          Kite School
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Learn to kitesurf with confidence at Hangin Kite Center
        </h1>
        <p className="max-w-2xl text-lg text-zinc-700">
          Beginner to advanced kitesurf coaching with certified instructors,
          small groups, and safety-first progression.
        </p>
      </header>

      <section aria-labelledby="lessons" className="space-y-4">
        <h2 id="lessons" className="text-2xl font-semibold">
          Lessons for every level
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          <li className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-semibold">Beginner Start</h3>
            <p className="text-sm text-zinc-700">
              Wind basics, kite control, and your first safe water sessions.
            </p>
          </li>
          <li className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-semibold">Progression Coaching</h3>
            <p className="text-sm text-zinc-700">
              Build up board starts, riding consistency, and transitions.
            </p>
          </li>
          <li className="rounded-xl border border-zinc-200 p-4">
            <h3 className="font-semibold">Advanced Clinics</h3>
            <p className="text-sm text-zinc-700">
              Jumping, strapless technique, and style-focused improvement.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="booking" className="space-y-3">
        <h2 id="booking" className="text-2xl font-semibold">
          Booking is coming soon
        </h2>
        <p className="max-w-2xl text-zinc-700">
          We&apos;re launching online booking soon. For now, contact us by phone
          or email to reserve your lesson spot.
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
