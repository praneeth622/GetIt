"use client"

import { useParams } from "next/navigation"
import { AiStudentDashboard } from "@/components/ai/students/ai-student-dashboard"

export default function StudentAIPage() {
  const params = useParams()
  const studentId = params.studentId as string

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white dark:from-zinc-900 dark:to-black">
      <AiStudentDashboard studentId={studentId} />
    </div>
  )
}

