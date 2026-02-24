import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NM Builds – PC Build Recommendations",
    template: "%s | NM Builds",
  },
  description:
    "Structured PC build recommendations for gamers, students, developers, and content creators. Every build is optimized for your budget tier and use case.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
    <html lang="en">
      <head>
        {/* TODO: Add Cloudflare Web Analytics script here once token is available */}
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
