import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { USER_TYPE_LABELS } from "@/types";

export const metadata: Metadata = {
  title: {
    default: "NM Builds – PC Build Recommendations",
    template: "%s | NM Builds",
  },
  description:
    "Structured PC build recommendations for gamers, students, developers, and content creators. Every build is optimized for your budget tier and use case.",
  metadataBase: new URL("https://nmbuilds.com"),
  openGraph: {
    type: "website",
    siteName: "NM Builds",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-zinc-950 text-zinc-100">
      <head>
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "REPLACE_WITH_YOUR_CF_ANALYTICS_TOKEN"}'
        />
      </head>
      <body className="min-h-screen font-mono antialiased">
        <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
            <Link
              href="/"
              className="text-sm font-bold tracking-tight text-zinc-100 hover:text-amber-400 transition-colors"
            >
              NM Builds
            </Link>
            <nav className="flex gap-4 flex-wrap text-xs text-zinc-400">
              {(
                Object.entries(USER_TYPE_LABELS) as [
                  keyof typeof USER_TYPE_LABELS,
                  string
                ][]
              ).map(([type, label]) => (
                <Link
                  key={type}
                  href={`/category/${type}/`}
                  className="hover:text-zinc-100 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>

        <footer className="border-t border-zinc-800 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-6 text-xs text-zinc-500 flex flex-wrap gap-4 justify-between">
            <p>
              &copy; {new Date().getFullYear()} NM Builds. Affiliate links may
              earn a commission.
            </p>
            <p>Prices listed are approximate and may change.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
