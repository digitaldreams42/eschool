import { Briefcase, GraduationCap, Megaphone, Users } from "lucide-react"
import SectionHeading from "../section-heading"

const AUDIENCE = [
  {
    icon: Briefcase,
    title: "Coaches & consultants",
    body: "Package what you already do on calls into a course your clients can buy while you sleep.",
  },
  {
    icon: GraduationCap,
    title: "Teachers & trainers",
    body: "Take your classroom online, track who is actually learning, and issue proof at the end.",
  },
  {
    icon: Megaphone,
    title: "Creators & YouTubers",
    body: "Turn an audience into a paying community — with a checkout your viewers can actually complete.",
  },
  {
    icon: Users,
    title: "Schools & institutions",
    body: "Run cohorts, multiple instructors and your own domain, all under one branded roof.",
  },
]

const Audience = () => {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.012] py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Who it is for"
          title={
            <>
              If you know something worth paying for,{" "}
              <span className="es-gold-text">this is your platform.</span>
            </>
          }
          description="eSchool is built for people who teach, train and advise — not for engineers. If you can send a WhatsApp message, you can run a course here."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.08] bg-ink/40 p-6 transition-colors hover:border-white/15"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-[#8B939E]">
                  {item.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Audience
