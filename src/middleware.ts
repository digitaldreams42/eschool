import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE = process.env.AUTH_COOKIE_NAME || "auth_session"

/**
 * Hosts that belong to the platform itself. These are never tenant custom
 * domains, so we must never try to resolve them through /api/domain.
 */
const PLATFORM_HOSTS = [".vercel.app", "localhost", "127.0.0.1", ".local"]

const isPlatformHost = (host: string) =>
  PLATFORM_HOSTS.some((suffix) => host === suffix || host.includes(suffix))

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Check session for protected routes
  if (pathname.startsWith("/group")) {
    const sessionToken = req.cookies.get(SESSION_COOKIE)?.value
    if (!sessionToken) {
      const signInUrl = new URL("/sign-in", req.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  const host = req.headers.get("host") ?? ""
  const reqPath = pathname

  // Tenant custom-domain rewrite (serve a group on the owner's own domain).
  //
  // This is OPTIONAL infrastructure. It used to be an unguarded fetch that
  // threw on every /group/* request in production — /api/domain does not
  // exist, so `response.json()` parsed a 404 HTML page and crashed the whole
  // middleware with MIDDLEWARE_INVOCATION_FAILED. It is now best-effort:
  // any failure falls through to normal routing.
  if (!reqPath.startsWith("/group") || isPlatformHost(host)) {
    return NextResponse.next()
  }

  try {
    const res = await fetch(
      `${req.nextUrl.origin}/api/domain?host=${encodeURIComponent(host)}`,
      { method: "GET", headers: { "Content-Type": "application/json" } },
    )

    if (!res.ok) return NextResponse.next()

    const data = await res.json()
    const domain = typeof data?.domain === "string" ? data.domain : null

    if (data?.status === 200 && domain) {
      return NextResponse.rewrite(new URL(reqPath, `https://${domain}`))
    }
  } catch {
    // Best-effort only — never let domain resolution break the app.
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
