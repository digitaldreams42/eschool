import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

/**
 * eSchool brand mark — a gold tile with an arch (institution) over a
 * learner's head. Deliberately geometric so it stays crisp at 16px.
 */
const BrandMark = ({ className }: Props) => {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="eSchool"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="eschool-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F7DDA0" />
          <stop offset="45%" stopColor="#E3B24D" />
          <stop offset="100%" stopColor="#B8842A" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9.5" fill="url(#eschool-mark)" />
      <path
        d="M8.6 22.2c0-5.4 3.2-8.6 7.4-8.6s7.4 3.2 7.4 8.6"
        fill="none"
        stroke="#0A0E12"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="10.2" r="2.5" fill="#0A0E12" />
    </svg>
  )
}

export default BrandMark
