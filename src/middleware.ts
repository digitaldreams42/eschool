import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(["/group(.*)"])

/**
 * Hosts that belong to the platform itself. These are never tenant custom
 * domains, so we must never try to resolve them through /api/domain.
 */
const PLATFORM_HOSTS = [".vercel.app", "localhost", "127.0.0.1", ".local"]

const isPlatformHost = (host: string) =>
  PLATFORM_HOSTS.some((suffix) => host === suffix || host.includes(suffix))

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()
  }

  const host = req.headers.get("host") ?? ""
  const reqPath = req.nextUrl.pathname

  // Tenant custom-domain rewrite (serve a group on the owner's own domain).
  //
  // This is OPTIONAL infrastructure. It used to be an unguarded fetch that
  // threw on every /group/* request in production — /api/domain does not
  // exist, so `response.json()` parsed a 404 HTML page and crashed the whole
  // middleware with MIDDLEWARE_INVOCATION_FAILED. It is now best-effort:
  // any failure falls through to normal routing.
  if (!reqPath.startsWith("/group") || isPlatformHost(host)) {
    return
  }

  try {
    const res = await fetch(
      `${req.nextUrl.origin}/api/domain?host=${encodeURIComponent(host)}`,
      { method: "GET", headers: { "Content-Type": "application/json" } },
    )

    if (!res.ok) return

    const data = await res.json()
    const domain = typeof data?.domain === "string" ? data.domain : null

    if (data?.status === 200 && domain) {
      return NextResponse.rewrite(new URL(reqPath, `https://${domain}`))
    }
  } catch {
    // Best-effort only — never let domain resolution break the app.
    return
  }
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
