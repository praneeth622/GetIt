"use client"

import { useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import { auth } from "@/firebase"
import { getUserDetails } from "@/lib/firebase-service"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"

export default function ProfilePage() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error("Please login first")
        router.push("/login")
        return
      }

      try {
        const userDetails = await getUserDetails(user.uid)
        if (userDetails.Role === "Recruiter") {
          router.push(`/rec/${user.uid}`)
        } else if (userDetails.Role === "Student") {
          router.push(`/stud/${user.uid}`)
        } else {
          toast.error("Invalid user role")
          router.push("/login")
        }
      } catch (error) {
        toast.error("Failed to fetch user details")
        router.push("/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>
  )
}

