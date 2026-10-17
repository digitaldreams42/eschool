import { ChevronDown } from "lucide-react"
import SectionHeading from "../section-heading"

const FAQS = [
  {
    q: "Do I need a website or technical skills?",
    a: "No. eSchool gives you the pages, the course builder, the checkout and the dashboard out of the box. If you can send a WhatsApp message, you can run a course here.",
  },
  {
    q: "Which payment methods can my members use?",
    a: "MTN MoMo, Airtel Money, Flutterwave, and Visa or Mastercard. Payouts settle to your mobile wallet or bank account on a fixed weekly schedule.",
  },
  {
    q: "Can I charge in Zambian Kwacha?",
    a: "Yes. Price your course in ZMW or USD, and members check out in the currency that makes sense for them. You are paid out in Kwacha.",
  },
  {
    q: "What does it cost to start?",
    a: "Nothing. The Starter plan is free forever — build your space and your first course at no cost. Upgrade only when you start charging for it.",
  },
  {
    q: "Can I use my own domain and branding?",
    a: "Yes, on the Creator and Institution plans. Point yourbrand.com at eSchool and your members never see our name on the door.",
  },
  {
    q: "Do learners get certificates?",
    a: "Yes, on paid plans. Certificates are issued automatically when a learner completes a course and can be verified and shared.",
  },
]

const Faq = () => {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Questions"
          title="The things people ask first"
          description="Still unsure? Reach out and a human will answer — usually the same day."
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
          {FAQS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-white/[0.03] [&::-webkit-details-marker]:hidden">
                <span className="text-[0.95rem] font-medium text-white">
                  {item.q}
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 text-[#7A838F] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[0.9rem] leading-relaxed text-[#98A1AC]">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
