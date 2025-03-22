"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PremiumNavbar } from "@/components/premium-navbar"
import { RecruiterExploreHeader } from "@/components/explore/recruiters/recruiter-explore-header"
import { RecruiterFilters } from "@/components/explore/recruiters/recruiter-filters"
import { StudentProfileList } from "@/components/explore/recruiters/student-profile-list"
import { StudentDetailModal } from "@/components/explore/recruiters/student-detail-modal"
import { ContactStudentModal } from "@/components/explore/recruiters/contact-student-modal"
import { SavedSearchModal } from "@/components/explore/recruiters/saved-search-modal"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import {
  getRecruiterById,
  enhancedStudentData,
  availableSkills,
  universities,
  graduationYears,
  locations,
  roles,
} from "@/components/explore/recruiters/mock-data"

export default function RecruiterExplorePage() {
  const params = useParams()
  const recruiterId = params.recruiterId as string
  const { toast } = useToast()

  const [recruiter, setRecruiter] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [filteredStudents, setFilteredStudents] = useState<any[]>([])
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isSavedSearchModalOpen, setIsSavedSearchModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("recommended")
  const [filters, setFilters] = useState({
    skills: [] as string[],
    universities: [] as string[],
    graduationYears: [] as number[],
    locations: [] as string[],
    roles: [] as string[],
    searchQuery: "",
    availability: "all",
  })
  const [savedStudents, setSavedStudents] = useState<string[]>([])
  const [contactedStudents, setContactedStudents] = useState<string[]>([])

  useEffect(() => {
    // Get recruiter data
    const recruiterData = getRecruiterById(recruiterId)
    if (recruiterData) {
      setRecruiter(recruiterData)
    }

    // Initialize student data
    setStudents(enhancedStudentData)

    // Set initial filtered students
    setFilteredStudents(enhancedStudentData)
  }, [recruiterId])

  // Filter students based on selected filters
  useEffect(() => {
    let result = [...students]

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(
        (student) =>
          student.fullName.toLowerCase().includes(query) ||
          student.skills.some((skill: string) => skill.toLowerCase().includes(query)) ||
          student.university.toLowerCase().includes(query) ||
          student.major.toLowerCase().includes(query),
      )
    }

    // Filter by skills
    if (filters.skills.length > 0) {
      result = result.filter((student) => filters.skills.every((skill) => student.skills.includes(skill)))
    }

    // Filter by universities
    if (filters.universities.length > 0) {
      result = result.filter((student) => filters.universities.includes(student.university))
    }

    // Filter by graduation years
    if (filters.graduationYears.length > 0) {
      result = result.filter((student) => filters.graduationYears.includes(student.graduationYear))
    }

    // Filter by preferred locations
    if (filters.locations.length > 0) {
      result = result.filter((student) =>
        student.preferredLocations.some((location: string) => filters.locations.includes(location)),
      )
    }

    // Filter by preferred roles
    if (filters.roles.length > 0) {
      result = result.filter((student) => student.preferredRoles.some((role: string) => filters.roles.includes(role)))
    }

    // Filter by availability
    if (filters.availability !== "all") {
      if (filters.availability === "immediate") {
        result = result.filter((student) => student.availability.toLowerCase().includes("immediate"))
      } else if (filters.availability === "internship") {
        result = result.filter((student) => student.availability.toLowerCase().includes("internship"))
      }
    }

    // Filter by active tab
    if (activeTab === "saved") {
      result = result.filter((student) => savedStudents.includes(student.id))
    } else if (activeTab === "contacted") {
      result = result.filter((student) => contactedStudents.includes(student.id))
    } else if (activeTab === "recommended") {
      // Sort by match score for recommended tab
      result.sort((a, b) => b.matchScore - a.matchScore)
    }

    setFilteredStudents(result)
  }, [filters, students, activeTab, savedStudents, contactedStudents])

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student)
    setIsDetailModalOpen(true)
  }

  const handleContactStudent = (student: any) => {
    setSelectedStudent(student)
    setIsDetailModalOpen(false)
    setIsContactModalOpen(true)
  }

  const handleSaveStudent = (studentId: string) => {
    if (savedStudents.includes(studentId)) {
      setSavedStudents(savedStudents.filter((id) => id !== studentId))
      toast({
        title: "Student removed from saved list",
        description: "You can add them back anytime.",
      })
    } else {
      setSavedStudents([...savedStudents, studentId])
      toast({
        title: "Student saved to your list",
        description: "You can view all saved students in the Saved tab.",
      })
    }
  }

  const handleContactSubmit = (message: string) => {
    if (selectedStudent) {
      setContactedStudents([...contactedStudents, selectedStudent.id])
      setIsContactModalOpen(false)
      toast({
        title: "Message sent successfully",
        description: `Your message has been sent to ${selectedStudent.fullName}.`,
      })
    }
  }

  const handleSaveSearch = (searchName: string) => {
    setIsSavedSearchModalOpen(false)
    toast({
      title: "Search saved successfully",
      description: `Your search "${searchName}" has been saved.`,
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-white via-violet-50/30 to-white text-violet-950 dark:from-black dark:via-zinc-900/50 dark:to-black dark:text-white">
      <PremiumNavbar recruiterId={recruiterId} />

      <main className="flex-1 pt-16">
        {recruiter && (
          <RecruiterExploreHeader
            recruiter={recruiter}
            totalResults={filteredStudents.length}
            onSaveSearch={() => setIsSavedSearchModalOpen(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        <div className="container px-4 py-8 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <RecruiterFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                availableSkills={availableSkills}
                universities={universities}
                graduationYears={graduationYears}
                locations={locations}
                roles={roles}
              />
            </div>

            <div className="lg:col-span-3">
              <StudentProfileList
                students={filteredStudents}
                onStudentClick={handleStudentClick}
                savedStudents={savedStudents}
                onSaveStudent={handleSaveStudent}
                contactedStudents={contactedStudents}
              />
            </div>
          </div>
        </div>
      </main>

      {selectedStudent && (
        <>
          <StudentDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            student={selectedStudent}
            onContact={() => handleContactStudent(selectedStudent)}
            isSaved={savedStudents.includes(selectedStudent.id)}
            onSave={() => handleSaveStudent(selectedStudent.id)}
          />

          <ContactStudentModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            student={selectedStudent}
            onSubmit={handleContactSubmit}
          />
        </>
      )}

      <SavedSearchModal
        isOpen={isSavedSearchModalOpen}
        onClose={() => setIsSavedSearchModalOpen(false)}
        onSave={handleSaveSearch}
        currentFilters={filters}
      />

      <Toaster />
    </div>
  )
}

