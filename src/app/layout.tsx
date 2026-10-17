import { MuiThemeProviderWrapper } from "@/theme/provider"
import { ReactQueryProvider } from "@/react-query/provider"
import { ReduxProvider } from "@/redux/provider"
import { AuthProvider } from "@/components/auth-provider"
import type { Metadata } from "next"
import { Toaster } from "sonner"
import "./global.css"

export const metadata: Metadata = {
  title: "eSchool — Teach, gather, get paid",
  description:
    "eSchool gives African creators the courses, community and payment rails to turn expertise into income — MTN MoMo, Airtel Money, Flutterwave and cards in one place.",
  metadataBase: new URL("https://eschool.co.zm"),
  openGraph: {
    title: "eSchool — Teach, gather, get paid",
    description:
      "Courses, community and mobile-money payments for African creators. Built in Zambia.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          {/* Display: Fraunces · Body: Manrope · MUI fallbacks: Roboto + IBM Plex */}
          <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700&family=IBM+Plex+Sans:wght@500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-ink text-foreground antialiased">
          <MuiThemeProviderWrapper>
            <ReduxProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>
            <Toaster />
          </MuiThemeProviderWrapper>
        </body>
      </html>
    </AuthProvider>
  )
}
