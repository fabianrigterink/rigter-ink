/// <reference types="react/canary" />
import type { Metadata } from "next";
import { ViewTransition } from "react";
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-surface focus:text-ink focus:border focus:border-border focus:rounded-md focus:px-3 focus:py-2 focus:text-sm focus:shadow-md focus:outline-none"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          <ViewTransition>{children}</ViewTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
