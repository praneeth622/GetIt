import { redirect } from "next/navigation"
import { recruiterUsers } from "@/components/explore/recruiters/mock-data"

export default function RecruiterRedirectPage() {
  // Redirect to the first recruiter's page
  if (recruiterUsers.length > 0) {
    redirect(`/explore/recruiters/${recruiterUsers[0].id}`)
  }

  // Fallback if no recruiters exist
  return null
}

