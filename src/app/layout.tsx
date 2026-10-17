import { MuiThemeProviderWrapper } from "@/theme/provider"
import { ReactQueryProvider } from "@/react-query/provider"
import { ReduxProvider } from "@/redux/provider"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Toaster } from "sonner"
import "./global.css"

export const metadata: Metadata = {
  title: "eSchool — Community & Courses for Africa",
  description: "Build a community around your passion. Courses, gamification, and payments — built for Africa.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500;600&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        </head>
        <body>
          <MuiThemeProviderWrapper>
            <ReduxProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>
            <Toaster />
          </MuiThemeProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}
