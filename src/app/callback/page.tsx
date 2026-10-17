"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const CallBackPage = () => {
  const router = useRouter()

  useEffect(() => {
    // OAuth callback is handled by /api/auth/oauth route
    // This page just redirects to the appropriate callback
    router.push("/callback/sign-in")
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-themeTextGray">Completing authentication...</p>
    </div>
  )
}

export default CallBackPage
