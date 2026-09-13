// Tabler Icons, MIT. See public/licenses/tabler-icons.txt.
// Source: tabler/tabler-icons@55f87a73f45cf1d9eaf16d7da705065483a9e4f9, icons/outline.
const paths: Record<string, readonly string[]> = {
  "spot": [
    "M8 16l2 -6l6 -2l-2 6l-6 2",
    "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    "M12 3l0 2",
    "M12 19l0 2",
    "M3 12l2 0",
    "M19 12l2 0"
  ],
  "places-to-be": [
    "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0",
    "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0"
  ],
  "things-to-do": [
    "M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1",
    "M4 18l-1 -3h18l-1 3",
    "M11 12h7l-7 -9v9",
    "M8 7l-2 5"
  ],
  "planning-your-days": [
    "M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12",
    "M16 3v4",
    "M8 3v4",
    "M4 11h16",
    "M11 15h1",
    "M12 15v3"
  ],
  "practical-questions": [
    "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    "M12 17l0 .01",
    "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"
  ],
  "safari": [
    "M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",
    "M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4",
    "M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5"
  ]
};

export function MenuIcon({ name }: { name: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {paths[name]?.map(d => <path key={d} d={d} />)}
    </svg>
  );
}
