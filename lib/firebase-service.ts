import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export interface UserDetails {
  fullName: string
  email: string
  university: string
  degree: string
  year: string
  coursework?: string
  certifications?: string
  skills: string[]
  interests: string[]
  portfolioLinks?: {
    github?: string
    linkedin?: string
    behance?: string
    dribbble?: string
  }
  experience?: string
  jobType: string
  preferences: {
    notifications: boolean
    updates: boolean
  }
  createdAt: Date
  updatedAt: Date
}

export async function registerUser(email: string, password: string, userData: UserDetails) {
  try {
    // Create user authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const { user } = userCredential

    // Create user document
    const userDoc = doc(db, `users/${user.uid}/data/user_details`)
    await setDoc(userDoc, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return { success: true, userId: user.uid }
  } catch (error: any) {
    let message = "An error occurred during registration"
    if (error.code === "auth/email-already-in-use") {
      message = "This email is already registered"
    }
    throw new Error(message)
  }
}