import Link from "next/link"
import { Check } from "lucide-react"
import SectionHeading from "../section-heading"

type Tier = {
  name: string
  price: string
  cadence?: string
  blurb: string
  cta: string
  href: string
  featured?: boolean
  features: string[]
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "Free",
    cadence: "forever",
    blurb: "For testing the water and building your first course.",
    cta: "Start free",
    href: "/sign-up",
    features: [
      "1 course",
      "Up to 25 members",
      "Community channels",
      "eSchool subdomain",
    ],
  },
  {
    name: "Creator",
    price: "K199",
    cadence: "per month",
    blurb: "For creators who are ready to charge for what they know.",
    cta: "Start 14-day trial",
    href: "/sign-up",
    featured: true,
    features: [
      "Unlimited courses & members",
      "Mobile money + card checkout",
      "Verified certificates",
      "Custom domain",
      "Revenue & payout dashboard",
      "Priority support",
    ],
  },
  {
    name: "Institution",
    price: "Custom",
    cadence: "talk to us",
    blurb: "For schools, trainers and teams running real cohorts.",
    cta: "Book a call",
    href: "/sign-up",
    features: [
      "Everything in Creator",
      "Multiple instructors",
      "Cohort & enrolment management",
      "Bulk learner invites",
      "Invoicing & purchase orders",
      "Onboarding assistance",
    ],
  },
]

const Pricing = () => {
  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Start free. Pay only when{" "}
              <span className="es-gold-text">you start earning.</span>
            </>
          }
          description="No setup fee, no revenue cut on the Starter plan, no lock-in. Cancel whenever you like."
        />

        <div className="mt-14 grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                "relative flex h-full flex-col rounded-3xl border p-7 transition-transform duration-300 " +
                (tier.featured
                  ? "border-gold/35 bg-gradient-to-b from-gold/[0.09] to-transparent shadow-[0_30px_80px_-40px_rgba(227,178,77,0.45)] lg:-translate-y-3"
                  : "border-white/[0.08] bg-white/[0.02] hover:border-white/15")
              }
            >
              {tier.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#0A0E12]">
                  Most popular
                </span>
              )}

              <p className="font-display text-[1.15rem] font-semibold text-white">
                {tier.name}
              </p>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-display text-[2.5rem] font-semibold leading-none text-white">
                  {tier.price}
                </span>
                {tier.cadence && (
                  <span className="pb-1 text-[0.8rem] text-[#7A838F]">
                    {tier.cadence}
                  </span>
                )}
              </div>
              <p className="mt-3 min-h-[42px] text-[0.86rem] leading-relaxed text-[#8B939E]">
                {tier.blurb}
              </p>

              <Link
                href={tier.href}
                className={
                  "mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[0.9rem] font-semibold transition-all " +
                  (tier.featured
                    ? "bg-gold text-[#0A0E12] hover:scale-[1.02] hover:shadow-[0_0_28px_-6px_rgba(227,178,77,0.6)]"
                    : "border border-white/12 bg-white/[0.03] text-white hover:border-white/25 hover:bg-white/[0.07]")
                }
              >
                {tier.cta}
              </Link>

              <ul className="mt-7 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[0.86rem] text-[#B7BEC8]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.8rem] text-[#6E7783]">
          Prices in Zambian Kwacha. Mobile-money and card fees apply per
          transaction and are shown before you confirm.
        </p>
      </div>
    </section>
  )
}

export default Pricing
