import SectionHeading from "../section-heading"

const STEPS = [
  {
    n: "01",
    title: "Create your space",
    body: "Name it, pick your colours, invite your first members. No code, no designer, no waiting on anyone.",
  },
  {
    n: "02",
    title: "Publish your courses",
    body: "Upload lessons, open channels for discussion, and set your price — free to build trust, paid to get paid.",
  },
  {
    n: "03",
    title: "Get paid and grow",
    body: "Members check out with mobile money or card. Track revenue, payouts and learner progress in one dashboard.",
  },
]

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 border-y border-white/[0.06] bg-white/[0.012] py-24 sm:py-28"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Live in an afternoon"
          title={
            <>
              From idea to first payment in{" "}
              <span className="es-gold-text">three steps.</span>
            </>
          }
          description="Most creators launch their first paid cohort the same day they sign up. Here is the whole path."
        />

        <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* connector line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent md:block" />

          {STEPS.map((step) => (
            <div key={step.n} className="relative flex flex-col">
              <span className="relative z-10 grid h-[52px] w-[52px] place-items-center rounded-2xl border border-gold/25 bg-ink font-display text-[1.05rem] font-semibold text-gold">
                {step.n}
              </span>
              <h3 className="mt-6 font-display text-[1.2rem] font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-sm text-[0.9rem] leading-relaxed text-[#8B939E]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
