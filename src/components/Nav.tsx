"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/travels", label: "Travels" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about/papers", label: "Papers" },
      { href: "/about/patents", label: "Patents" },
      { href: "/about/talks", label: "Talks" },
    ],
  },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 bg-surface/92 backdrop-blur-md">
      <div className="max-w-270 mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 sm:gap-7 no-underline">
          {/* Dots mark — Noun Project icon by Creative Stall, radial gradient fill */}
          <svg width="44" height="14" viewBox="0 17 48 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="nav-dots-grad" cx="9" cy="39" r="58" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FED576" />
                <stop offset="20%" stopColor="#F47133" />
                <stop offset="50%" stopColor="#BC3081" />
                <stop offset="100%" stopColor="#4F5BD5" />
              </radialGradient>
            </defs>
            <circle fill="url(#nav-dots-grad)" cx="6.4" cy="24" r="5.9" />
            <circle fill="url(#nav-dots-grad)" cx="24" cy="24" r="5.9" />
            <circle fill="url(#nav-dots-grad)" cx="41.6" cy="24" r="5.9" />
          </svg>
          <span className="font-normal text-lg tracking-tight text-ink">
            rigter<span className="text-ink-muted">.</span>ink
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden sm:flex gap-8 list-none">
          {links.map(({ href, label, children }) =>
            children ? (
              <li
                key={href}
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors no-underline pb-1 border-b-2 ${isActive(href)
                    ? "text-ink border-ink"
                    : "text-ink-muted hover:text-ink border-transparent hover:border-ink-muted"
                    }`}
                >
                  {label}
                </Link>
                {aboutOpen && (
                  <div className="absolute left-0 top-full pt-2 w-36">
                    <ul className="bg-white border border-border rounded-xl shadow-sm py-1 list-none">
                      {children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm text-ink-muted hover:text-ink hover:bg-surface-alt transition-colors no-underline"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors no-underline pb-1 border-b-2 ${isActive(href)
                    ? "text-ink border-ink"
                    : "text-ink-muted hover:text-ink border-transparent hover:border-ink-muted"
                    }`}
                >
                  {label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-border bg-surface/95 backdrop-blur-md">
          <ul className="flex flex-col list-none py-4 px-6">
            {links.map(({ href, label, children }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-sm font-medium transition-colors no-underline ${isActive(href) ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                >
                  {label}
                </Link>
                {children && (
                  <ul className="list-none pl-4 -mt-1 mb-1">
                    {children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className={`block py-2 text-sm transition-colors no-underline ${pathname === child.href ? "text-ink" : "text-ink-muted hover:text-ink"
                            }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gradient stripe — discoverlosangeles.com dla-hero-40--gradient-type-none */}
      <div
        className="h-1"
        style={{ background: "linear-gradient(to right, #FFA175, #FF3F86 60%, #7281C2 90%, #00BAAC)" }}
      />
    </nav>
  );
}
