import Link from "next/link"
import { ArrowRight, PlayCircle } from "lucide-react"

const TRUST = [
  "MTN MoMo",
  "Airtel Money",
  "Flutterwave",
  "Visa & Mastercard",
]

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-4 sm:pt-24">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="es-grid-bg es-mask-radial absolute inset-0" />
        <div className="es-bloom absolute inset-x-0 top-[-12%] h-[560px]" />
        <div className="es-grain" />
      </div>

      <div className="container">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.07] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold"
            style={{ animationDelay: "0ms" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-gold" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Built in Zambia · For Africa
          </span>

          <h1
            className="animate-fade-up mt-7 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            Teach. Gather.
            <br />
            <span className="es-gold-text">Get paid.</span>
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-[#A8B0BA] sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            eSchool gives African creators the courses, community and payment
            rails to turn expertise into income. Build your space, publish your
            lessons, and collect in the money your members already use.
          </p>

          <div
            className="animate-fade-up mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/sign-up"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[0.95rem] font-semibold text-[#0A0E12] transition-all hover:scale-[1.02] hover:shadow-[0_0_34px_-6px_rgba(227,178,77,0.6)] sm:w-auto"
            >
              Start free — no card
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.07] sm:w-auto"
            >
              <PlayCircle className="h-[1.15rem] w-[1.15rem] text-gold" />
              See how it works
            </a>
          </div>

          <div
            className="animate-fade-up mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-[#6E7783]"
            style={{ animationDelay: "320ms" }}
          >
            {TRUST.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full bg-[#3A424C]" aria-hidden />
                )}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
