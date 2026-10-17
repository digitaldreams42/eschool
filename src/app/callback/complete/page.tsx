import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

const CompleteOAuthAfterCallback = async () => {
  const session = await getSession()
  if (!session) redirect("/sign-in")

  // User already exists in DB (created during OAuth flow)
  redirect(`/group/create`)
}

export default CompleteOAuthAfterCallback
