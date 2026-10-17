import Link from "next/link"
import BrandMark from "../brand-mark"

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Payments", href: "#payments" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Explore communities", href: "/explore" },
      { label: "Sign in", href: "/sign-in" },
      { label: "Create account", href: "/sign-up" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "mailto:hello@eschool.co.zm" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
]

const LandingFooter = () => {
  return (
    <footer className="border-t border-white/[0.07] bg-[#05080B]">
      <div className="container py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandMark className="h-8 w-8" />
              <span className="font-display text-[1.3rem] font-semibold tracking-tight text-white">
                eSchool
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[0.85rem] leading-relaxed text-[#7A838F]">
              Courses, community and mobile-money payments for African
              creators. Built in Lusaka, Zambia.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["MTN MoMo", "Airtel Money", "Flutterwave"].map((rail) => (
                <span
                  key={rail}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[0.68rem] text-[#8B939E]"
                >
                  {rail}
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#5C646F]">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) =>
                  link.href.startsWith("#") ||
                  link.href.startsWith("mailto") ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.85rem] text-[#8B939E] transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.85rem] text-[#8B939E] transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="text-[0.78rem] text-[#5C646F]">
            © {new Date().getFullYear()} eSchool. All rights reserved.
          </p>
          <p className="text-[0.78rem] text-[#5C646F]">
            Made in Zambia 🇿🇲
          </p>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
