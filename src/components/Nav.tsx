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
          {/* Infinity mark — Noun Project icon by Zach Bogart, radial gradient fill */}
          <svg width="44" height="18" viewBox="0 29 100 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="nav-inf-grad" cx="18" cy="68" r="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FED576" />
                <stop offset="20%" stopColor="#F47133" />
                <stop offset="50%" stopColor="#BC3081" />
                <stop offset="100%" stopColor="#4F5BD5" />
              </radialGradient>
            </defs>
            <path fill="url(#nav-inf-grad)" fillRule="evenodd" clipRule="evenodd" d="M51.65,42.91c3.478,-2.439 8.656,-5.874 13.517,-8.351c4.321,-2.202 8.503,-3.571 11.443,-3.571c10.607,0 19.219,8.612 19.219,19.22c0,10.607 -8.612,19.219 -19.219,19.219c-2.94,-0 -7.122,-1.369 -11.443,-3.571c-5.261,-2.68 -10.891,-6.483 -14.338,-8.93l-9.341,-6.718c-2.909,-1.965 -6.502,-4.236 -9.923,-5.98c-2.502,-1.274 -4.814,-2.387 -6.516,-2.387c-4.618,-0 -8.367,3.749 -8.367,8.367c-0,4.617 3.749,8.366 8.367,8.366c1.702,0 4.014,-1.113 6.516,-2.387c3.094,-1.577 6.328,-3.585 9.071,-5.408l9.372,6.726c-3.478,2.439 -8.655,5.874 -13.516,8.351c-4.322,2.202 -8.503,3.571 -11.443,3.571c-10.608,-0 -19.22,-8.612 -19.22,-19.219c0,-10.608 8.612,-19.22 19.22,-19.22c2.94,0 7.121,1.369 11.443,3.571c5.187,2.643 10.734,6.378 14.193,8.828l9.526,6.848c2.902,1.959 6.477,4.216 9.883,5.952c2.502,1.274 4.814,2.387 6.516,2.387c4.618,0 8.367,-3.749 8.367,-8.366c-0,-4.618 -3.749,-8.367 -8.367,-8.367c-1.702,-0 -4.014,1.113 -6.516,2.387c-3.095,1.577 -6.329,3.585 -9.071,5.408l-9.373,-6.726Z" />
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
