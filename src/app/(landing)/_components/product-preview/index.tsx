import {
  BadgeCheck,
  BookOpen,
  BarChart3,
  Hash,
  Home,
  MessagesSquare,
  Trophy,
  Users,
} from "lucide-react"
import BrandMark from "../brand-mark"

const RAIL = [
  { label: "Announcements", icon: Hash },
  { label: "General", icon: MessagesSquare, active: true },
  { label: "Big Wins", icon: Trophy },
  { label: "Course help", icon: BookOpen },
]

const LEADERS = [
  { name: "Chanda M.", pts: "1,284", hue: "from-gold to-gold-deep" },
  { name: "Naledi K.", pts: "1,140", hue: "from-[#7FD1B9] to-[#4FAF94]" },
  { name: "Joseph T.", pts: "986", hue: "from-[#8FB4FF] to-[#5B7FD6]" },
  { name: "Amina S.", pts: "874", hue: "from-[#E9A0C8] to-[#C06A9C]" },
]

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")

/**
 * Live, CSS-built product preview. This replaces the old static
 * screenshot — it is real markup, so it stays crisp, on-brand and
 * never shows another company's UI.
 */
const ProductPreview = () => {
  return (
    <section className="relative pb-24 pt-16 sm:pb-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[420px] -translate-y-1/2">
        <div className="mx-auto h-full w-[min(1100px,92%)] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(227,178,77,0.16),transparent_70%)] blur-2xl" />
      </div>

      <div className="container">
        <div
          className="animate-rise relative mx-auto max-w-6xl"
          style={{ animationDelay: "420ms" }}
        >
          {/* window frame */}
          <div className="overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#0B0F14]/90 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            {/* chrome bar */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3A424C]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3A424C]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3A424C]" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-full border border-white/[0.07] bg-ink/70 px-3.5 py-1 text-[0.7rem] text-[#7A838F]">
                <span className="h-1.5 w-1.5 rounded-full bg-jade" />
                eschool.co.zm/your-community
              </div>
              <div className="w-10" />
            </div>

            {/* app body */}
            <div className="grid grid-cols-1 lg:grid-cols-[212px_1fr_268px]">
              {/* left rail */}
              <aside className="hidden flex-col gap-6 border-r border-white/[0.07] p-5 lg:flex">
                <div className="flex items-center gap-2">
                  <BrandMark className="h-7 w-7" />
                  <div className="leading-tight">
                    <p className="text-[0.82rem] font-semibold text-white">
                      Your Community
                    </p>
                    <p className="text-[0.66rem] text-[#6E7783]">
                      1,240 members
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 px-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#5C646F]">
                    Channels
                  </p>
                  <ul className="space-y-1">
                    {RAIL.map((item) => {
                      const Icon = item.icon
                      return (
                        <li
                          key={item.label}
                          className={
                            "flex items-center gap-2 rounded-lg px-2.5 py-2 text-[0.79rem] " +
                            (item.active
                              ? "bg-white/[0.06] text-white"
                              : "text-[#8B939E]")
                          }
                        >
                          <Icon className="h-3.5 w-3.5 text-gold/80" />
                          {item.label}
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="mt-auto rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
                  <p className="text-[0.66rem] uppercase tracking-[0.14em] text-[#5C646F]">
                    This month
                  </p>
                  <p className="mt-1.5 font-display text-[1.4rem] font-semibold text-white">
                    K 18,420
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[0.68rem] text-jade">
                    <BarChart3 className="h-3 w-3" />
                    +32% vs last month
                  </p>
                </div>
              </aside>

              {/* center */}
              <div className="min-w-0 p-5 sm:p-7">
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  {[
                    { label: "Home", icon: Home, active: true },
                    { label: "Courses", icon: BookOpen },
                    { label: "Members", icon: Users },
                    { label: "Leaderboard", icon: Trophy },
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <span
                        key={tab.label}
                        className={
                          "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.75rem] " +
                          (tab.active
                            ? "bg-gold text-[#0A0E12] font-semibold"
                            : "text-[#8B939E]")
                        }
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {tab.label}
                      </span>
                    )
                  })}
                </div>

                {/* course card */}
                <div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.66rem] uppercase tracking-[0.16em] text-gold">
                        Continue learning
                      </p>
                      <h3 className="mt-1.5 font-display text-[1.15rem] font-semibold text-white">
                        Selling your first digital product
                      </h3>
                      <p className="mt-1 text-[0.78rem] text-[#8B939E]">
                        Module 3 of 8 · Lesson: Pricing with confidence
                      </p>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-jade/25 bg-jade/10 px-3 py-1 text-[0.68rem] font-medium text-jade sm:flex">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Certificate
                    </span>
                  </div>

                  <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                    <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light" />
                  </div>
                  <div className="mt-2 flex justify-between text-[0.68rem] text-[#6E7783]">
                    <span>38% complete</span>
                    <span>4 lessons left</span>
                  </div>
                </div>

                {/* feed post */}
                <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-deep text-[0.68rem] font-bold text-[#0A0E12]">
                      GM
                    </span>
                    <div className="leading-tight">
                      <p className="text-[0.8rem] font-medium text-white">
                        Grace Mwale
                      </p>
                      <p className="text-[0.68rem] text-[#6E7783]">
                        in General · 12m ago
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[0.84rem] leading-relaxed text-[#B7BEC8]">
                    Just hit 100 paying students on my Excel course 🎉 The mobile
                    money checkout made all the difference — people pay the
                    second they decide.
                  </p>
                  <div className="mt-3.5 flex items-center gap-4 text-[0.72rem] text-[#6E7783]">
                    <span className="flex items-center gap-1.5">
                      <Trophy className="h-3.5 w-3.5 text-gold/70" /> 128
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessagesSquare className="h-3.5 w-3.5" /> 24 replies
                    </span>
                  </div>
                </div>
              </div>

              {/* right rail */}
              <aside className="hidden flex-col gap-4 border-l border-white/[0.07] p-5 lg:flex">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#8B939E]">
                      Leaderboard
                    </p>
                    <span className="text-[0.62rem] text-[#5C646F]">30 days</span>
                  </div>
                  <ul className="mt-3.5 space-y-3">
                    {LEADERS.map((leader, i) => (
                      <li key={leader.name} className="flex items-center gap-2.5">
                        <span className="w-3 text-[0.68rem] tabular-nums text-[#5C646F]">
                          {i + 1}
                        </span>
                        <span
                          className={
                            "grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br text-[0.62rem] font-bold text-[#0A0E12] " +
                            leader.hue
                          }
                        >
                          {initials(leader.name)}
                        </span>
                        <span className="flex-1 truncate text-[0.76rem] text-[#C9D0D8]">
                          {leader.name}
                        </span>
                        <span className="text-[0.72rem] font-semibold tabular-nums text-gold">
                          {leader.pts}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.1] to-transparent p-4">
                  <p className="text-[0.7rem] font-semibold text-white">
                    Payouts
                  </p>
                  <p className="mt-1 text-[0.68rem] leading-relaxed text-[#8B939E]">
                    Settled to your MoMo wallet every Friday.
                  </p>
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/[0.07] bg-ink/60 px-2.5 py-2">
                    <span className="h-6 w-6 rounded-md bg-[#FFCC00]" />
                    <span className="text-[0.7rem] text-[#C9D0D8]">
                      MTN MoMo · 0964…
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* floating annotation */}
          <div className="animate-float absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2.5 rounded-2xl border border-white/[0.1] bg-[#0E141B]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-jade/15">
              <BadgeCheck className="h-4 w-4 text-jade" />
            </span>
            <div className="leading-tight">
              <p className="text-[0.76rem] font-semibold text-white">
                Certificate issued
              </p>
              <p className="text-[0.66rem] text-[#7A838F]">
                to Grace Mwale · verified
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPreview
