import { ContactCta } from "@/components/contact-cta";
import { siteConfig } from "@/content/site";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-600">
          {siteConfig.location}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Kitesurfing in Boracay
        </h1>
        <p className="text-lg text-zinc-700">
          Hangin Kite Center is on Bulabog Beach. Message us with your dates and
          the service you need.
        </p>
      </header>
      <ContactCta />
    </main>
  );
}
