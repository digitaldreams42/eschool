import { onSignInUser } from "@/actions/auth"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

const CompleteSigIn = async () => {
  const session = await getSession()
  if (!session) return redirect("/sign-in")

  const authenticated = await onSignInUser(session.email)

  if (authenticated.status === 200) return redirect(`/group/create`)

  if (authenticated.status === 207)
    return redirect(
      `/group/${authenticated.groupId}/channel/${authenticated.channelId}`,
    )

  if (authenticated.status !== 200) {
    redirect("/sign-in")
  }
}

export default CompleteSigIn
