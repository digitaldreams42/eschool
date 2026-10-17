import { cn } from "@/lib/utils"

type Props = {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: "center" | "left"
  className?: string
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-3xl font-display text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[2.4rem] lg:text-[2.9rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-[0.98rem] leading-relaxed text-[#98A1AC]",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
