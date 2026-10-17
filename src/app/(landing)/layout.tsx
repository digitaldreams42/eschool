import LandingPageNavbar from "./_components/navbar"

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-ink font-sans text-[#F5F1EA] selection:bg-gold/30">
      <LandingPageNavbar />
      <main>{children}</main>
    </div>
  )
}

export default LandingPageLayout
