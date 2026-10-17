import nextDynamic from "next/dynamic"
import { Box, Container } from "@mui/material"
import CallToAction from "./_components/call-to-action"
import DashboardSnippet from "./_components/dashboard-snippet"

export const dynamic = "force-dynamic"

const PricingSection = nextDynamic(
  () =>
    import("./_components/pricing").then(
      (component) => component.PricingSection,
    ),
  { ssr: true },
)

export default function Home() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, display: 'flex', flexDirection: 'column', gap: { xs: 12, md: 16 } }}>
      <Container maxWidth="lg">
        <CallToAction />
        <DashboardSnippet />
      </Container>
      <PricingSection />
    </Box>
  )
}
