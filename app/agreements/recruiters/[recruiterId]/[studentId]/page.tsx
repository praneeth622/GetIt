import type { Metadata } from "next"
import AgreementContainer from "@/components/agreement/agreement-container"

export const metadata: Metadata = {
  title: "GetIT | Agreement",
  description: "Review and sign your agreement with the recruiter",
}

export default function AgreementPage({
  params,
}: {
  params: { recruiterId: string; studentId: string }
}) {
  return (
    <div className="container max-w-6xl py-8 mx-auto">
      <AgreementContainer recruiterId={params.recruiterId} studentId={params.studentId} />
    </div>
  )
}

