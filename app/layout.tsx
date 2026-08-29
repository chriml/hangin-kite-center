import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hanginkitecenter.com"),
  title: {
    default: "Hangin Kite Center | Kite School",
    template: "%s | Hangin Kite Center",
  },
  description:
    "Hangin Kite Center is a kite school offering beginner-friendly and advanced kitesurf coaching, safety-first lessons, and guided sessions.",
  keywords: [
    "kite school",
    "kitesurf lessons",
    "kiteboarding",
    "kite center",
    "Hangin Kite Center",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Hangin Kite Center | Kite School",
    description:
      "Learn to kite with certified instructors, structured lesson levels, and safe progression at Hangin Kite Center.",
    siteName: "Hangin Kite Center",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hangin Kite Center | Kite School",
    description:
      "Kitesurf lessons for all levels with safety-first training and professional coaching.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
