"use client";

import Link from "next/link";
import { useState } from "react";

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

  return (
    <nav className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-border">
      <div className="max-w-[1080px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 sm:gap-7 no-underline">
          {/* FR striped mark */}
          <svg width="28" height="28" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="nav-stripes" patternUnits="userSpaceOnUse" width="84" height="84" patternTransform="rotate(-55)">
                <rect x="0" width="14" height="84" fill="#007BA7"/>
                <rect x="14" width="14" height="84" fill="#FFC067"/>
                <rect x="28" width="14" height="84" fill="#98A869"/>
                <rect x="42" width="14" height="84" fill="#C11C84"/>
                <rect x="56" width="14" height="84" fill="#CD1C18"/>
                <rect x="70" width="14" height="84" fill="#6D8196"/>
              </pattern>
            </defs>
            <text x="55" y="76" fontFamily="Inter, sans-serif" fontWeight="300" fontSize="96" fill="url(#nav-stripes)" textAnchor="middle" letterSpacing="-6">FR</text>
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
                  className="text-sm font-medium text-ink-muted hover:text-ink transition-colors no-underline"
                >
                  {label}
                </Link>
                {aboutOpen && (
                  <div className="absolute left-0 top-full pt-2 w-36">
                    <ul className="bg-white border border-border rounded-lg shadow-md py-1 list-none">
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
                  className="text-sm font-medium text-ink-muted hover:text-ink transition-colors no-underline"
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
        <div className="sm:hidden border-t border-border bg-white/95 backdrop-blur-md">
          <ul className="flex flex-col list-none py-4 px-6">
            {links.map(({ href, label, children }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-ink-muted hover:text-ink transition-colors no-underline"
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
                          className="block py-2 text-sm text-ink-muted hover:text-ink transition-colors no-underline"
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
    </nav>
  );
}
