import Link from "next/link"
import { ArrowRight } from "lucide-react"

const CtaBand = () => {
  return (
    <section className="relative pb-28 pt-4 sm:pb-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-[32px] border border-gold/25 bg-gradient-to-b from-gold/[0.12] via-gold/[0.04] to-transparent px-7 py-16 text-center sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="es-grid-bg es-mask-radial absolute inset-0 opacity-60" />
            <div className="es-grain" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[2.7rem]">
              Your first cohort is{" "}
              <span className="es-gold-text">one afternoon away.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-[#A8B0BA]">
              Set up your space, publish a course, and take your first mobile
              money payment today. It costs nothing to try.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[0.95rem] font-semibold text-[#0A0E12] transition-all hover:scale-[1.02] hover:shadow-[0_0_34px_-6px_rgba(227,178,77,0.6)] sm:w-auto"
              >
                Create your free account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.07] sm:w-auto"
              >
                Compare plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaBand
