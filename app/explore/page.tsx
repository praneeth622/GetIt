"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { studentUsers } from "@/components/explore/mock-data"

export default function ExploreRedirect() {
  const router = useRouter()

  useEffect(() => {
    // In a real app, you would check for the logged-in user
    // For now, redirect to the first student in our mock data
    const defaultStudentId = studentUsers[0].id
    router.push(`/explore/${defaultStudentId}`)
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Redirecting to student explore page...</h2>
        <p className="mt-2 text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  )
}

