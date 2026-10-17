import {
  BadgeCheck,
  BookOpen,
  Globe,
  Trophy,
  Wallet,
  Users,
} from "lucide-react"
import SectionHeading from "../section-heading"

const FEATURES = [
  {
    icon: BookOpen,
    title: "Courses that ship",
    body: "Build modules and lessons in minutes, drip them on a schedule, and let learners resume exactly where they stopped.",
  },
  {
    icon: Users,
    title: "Community that sticks",
    body: "Channels, posts, replies and DMs sit right beside the course — so the conversation never leaks to a separate app.",
  },
  {
    icon: Wallet,
    title: "Get paid locally",
    body: "MTN MoMo, Airtel Money, Flutterwave and cards. Members pay with the money already in their pocket.",
  },
  {
    icon: Trophy,
    title: "Gamified progress",
    body: "Leaderboards, streaks and points turn “someday” learners into weekly regulars who finish what they start.",
  },
  {
    icon: BadgeCheck,
    title: "Verified certificates",
    body: "Issue a shareable certificate the moment a learner finishes a course — proof they can put to work.",
  },
  {
    icon: Globe,
    title: "Your own domain",
    body: "Run everything on yourbrand.com, in your colours, with your name on the door. No marketplace branding.",
  },
]

const Features = () => {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Everything in one place"
          title={
            <>
              One platform for the course,{" "}
              <span className="es-gold-text">the crowd and the cash.</span>
            </>
          }
          description="You should not need five tools, a developer and a payment agent to sell what you know. eSchool puts the whole stack behind one login."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:bg-white/[0.035]"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/[0.07] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/20 bg-gold/[0.08] text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.12rem] font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-[#8B939E]">
                  {feature.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
