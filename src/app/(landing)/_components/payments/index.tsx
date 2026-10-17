import { Check, ShieldCheck, Smartphone, Zap } from "lucide-react"

const METHODS = [
  { name: "MTN MoMo", swatch: "#FFCC00", note: "Instant" },
  { name: "Airtel Money", swatch: "#E40000", note: "Instant" },
  { name: "Flutterwave", swatch: "#F5A623", note: "Cards & bank" },
  { name: "Visa", swatch: "#1A1F71", note: "3-D Secure" },
  { name: "Mastercard", swatch: "#EB001B", note: "3-D Secure" },
  { name: "Bank transfer", swatch: "#4FAF94", note: "Manual confirm" },
]

const POINTS = [
  {
    icon: Smartphone,
    title: "Mobile money first",
    body: "Most of your members do not own a credit card. They do own a phone with a wallet — so that is where checkout starts.",
  },
  {
    icon: Zap,
    title: "Instant access",
    body: "Payment confirms in seconds and unlocks the course immediately. No waiting, no screenshots, no manual unlocking.",
  },
  {
    icon: ShieldCheck,
    title: "Payouts you can count on",
    body: "Revenue settles on a fixed weekly schedule to your wallet or bank, with a full ledger of every sale.",
  },
]

const Payments = () => {
  return (
    <section id="payments" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
              Payments built for here
            </span>
            <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.4rem]">
              Your members pay the way{" "}
              <span className="es-gold-text">they already pay.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-[#98A1AC]">
              Global checkout tools assume a credit card. eSchool assumes a
              phone. Mobile money, local cards and bank rails are wired in from
              day one — priced in Kwacha, settled in Kwacha.
            </p>

            <ul className="mt-9 space-y-6">
              {POINTS.map((point) => {
                const Icon = point.icon
                return (
                  <li key={point.title} className="flex gap-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-gold/20 bg-gold/[0.07] text-gold">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{point.title}</p>
                      <p className="mt-1 max-w-md text-[0.875rem] leading-relaxed text-[#8B939E]">
                        {point.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(227,178,77,0.14),transparent_70%)] blur-2xl" />
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
              <div className="flex items-center justify-between">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#8B939E]">
                  Accepted at checkout
                </p>
                <span className="flex items-center gap-1.5 rounded-full border border-jade/25 bg-jade/10 px-2.5 py-1 text-[0.66rem] font-medium text-jade">
                  <Check className="h-3 w-3" />
                  Live
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {METHODS.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-ink/50 px-4 py-3.5 transition-colors hover:border-white/15"
                  >
                    <span
                      className="h-8 w-8 shrink-0 rounded-lg"
                      style={{ backgroundColor: method.swatch }}
                      aria-hidden
                    />
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-[0.82rem] font-medium text-white">
                        {method.name}
                      </p>
                      <p className="text-[0.66rem] text-[#6E7783]">
                        {method.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
                <span className="text-[0.78rem] text-[#8B939E]">
                  Price shown in
                </span>
                <span className="font-display text-[1rem] font-semibold text-white">
                  ZMW · USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Payments
