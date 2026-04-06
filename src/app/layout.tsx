import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "rigter.ink",
    template: "%s — rigter.ink",
  },
  description: "Fabian Rigterink — Engineering Manager, ML. Blog, travels, and projects.",
  metadataBase: new URL("https://rigter.ink"),
  icons: {
    icon: "/logo/fr-favicon.svg",
    apple: "/logo/fr-mark.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rigter.ink",
    siteName: "rigter.ink",
    title: "rigter.ink",
    description: "Fabian Rigterink — Engineering Manager, ML. Blog, travels, and projects.",
  },
  twitter: {
    card: "summary",
    title: "rigter.ink",
    description: "Fabian Rigterink — Engineering Manager, ML. Blog, travels, and projects.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
