"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu as MenuIcon, X } from "lucide-react"
import BrandMark from "../brand-mark"

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Payments", href: "#payments" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

const LandingPageNavbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl">
      <div className="container flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark className="h-8 w-8" />
          <span className="font-display text-[1.35rem] font-semibold tracking-tight text-white">
            eSchool
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[0.875rem] text-[#A8B0BA] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-[#C9D0D8] transition-colors hover:text-white sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-[#0A0E12] shadow-[0_0_0_0_rgba(227,178,77,0.5)] transition-all hover:scale-[1.03] hover:shadow-[0_0_28px_-4px_rgba(227,178,77,0.55)] sm:px-5"
          >
            Get started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="ml-1 grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.07] bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="container flex flex-col py-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-[#C9D0D8] transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm text-[#C9D0D8] transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default LandingPageNavbar
