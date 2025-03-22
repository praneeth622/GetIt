"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ExploreHeader } from "@/components/explore/explore-header"
import { ExploreFilters } from "@/components/explore/explore-filters"
import { JobList } from "@/components/explore/job-list"
import { ProjectList } from "@/components/explore/project-list"
import { StartupIdeaModal } from "@/components/explore/startup-idea-modal"
import { LearnRequestModal } from "@/components/explore/learn-request-modal"
import { JobDetailModal } from "@/components/explore/job-detail-modal"
import { ApplicationModal } from "@/components/explore/application-modal"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PremiumNavbar } from "@/components/premium-navbar"
import { PremiumFooter } from "@/components/premium-footer"
import { toast } from "@/hooks/use-toast"
import { jobData, projectData, getStudentById } from "@/components/explore/mock-data"

export default function ExplorePage() {
  const params = useParams()
  const router = useRouter()
  const studentId = params.studentId as string

  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("jobs")
  const [isStartupIdeaModalOpen, setIsStartupIdeaModalOpen] = useState(false)
  const [isLearnRequestModalOpen, setIsLearnRequestModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isJobDetailModalOpen, setIsJobDetailModalOpen] = useState(false)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [filteredJobs, setFilteredJobs] = useState(jobData)
  const [filteredProjects, setFilteredProjects] = useState(projectData)
  const [currentStudent, setCurrentStudent] = useState<any>(null)
  const [filters, setFilters] = useState({
    searchQuery: "",
    jobType: [],
    location: [],
    remote: [],
    experience: [],
    skills: [],
  })

  // Add a new state for storing submitted startup ideas
  const [submittedStartupIdeas, setSubmittedStartupIdeas] = useState<any[]>([])

  // Check if student exists and redirect if not
  useEffect(() => {
    const student = getStudentById(studentId)
    if (!student) {
      // Redirect to login page if student doesn't exist
      router.push("/login")
      return
    }

    setCurrentStudent(student)
    setMounted(true)
  }, [studentId, router])

  // Filter jobs based on student skills
  useEffect(() => {
    if (!currentStudent) return

    // Simulate loading recommended jobs based on user skills
    const recommendedJobs = jobData.filter((job) => job.skills.some((skill) => currentStudent.skills.includes(skill)))

    // Sort jobs to show recommended ones first
    const sortedJobs = [...recommendedJobs, ...jobData.filter((job) => !recommendedJobs.includes(job))]

    setFilteredJobs(sortedJobs)
  }, [currentStudent])

  useEffect(() => {
    if (!currentStudent) return

    // Filter jobs based on current filters
    const filteredJobs = filterJobs(jobData, filters, currentStudent.skills)
    setFilteredJobs(filteredJobs)
  }, [filters, currentStudent])

  useEffect(() => {
    if (!currentStudent) return

    // Filter projects based on current filters
    const filteredProjects = filterProjects(projectData, filters, currentStudent.skills)
    setFilteredProjects(filteredProjects)
  }, [filters, currentStudent])

  const filterJobs = (jobs: any[], filters: any, userSkills: string[]) => {
    let filtered = jobs

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query),
      )
    }

    if (filters.jobType.length > 0) {
      filtered = filtered.filter((job) => filters.jobType.includes(job.type))
    }

    if (filters.location.length > 0) {
      filtered = filtered.filter((job) => filters.location.includes(job.location))
    }

    if (filters.remote.length > 0) {
      filtered = filtered.filter((job) => filters.remote.includes(job.remote))
    }

    if (filters.experience.length > 0) {
      filtered = filtered.filter((job) => filters.experience.includes(job.experience))
    }

    if (filters.skills.length > 0) {
      filtered = filtered.filter((job) => job.skills.some((skill) => filters.skills.includes(skill)))
    }

    // Sort to keep recommended jobs at the top
    const recommendedJobs = filtered.filter((job) => job.skills.some((skill) => userSkills.includes(skill)))

    const sortedJobs = [...recommendedJobs, ...filtered.filter((job) => !recommendedJobs.includes(job))]

    return sortedJobs
  }

  const filterProjects = (projects: any[], filters: any, userSkills: string[]) => {
    let filteredProjs = projects

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filteredProjs = filteredProjs.filter(
        (project) => project.title.toLowerCase().includes(query) || project.description.toLowerCase().includes(query),
      )
    }

    if (filters.skills.length > 0) {
      filteredProjs = filteredProjs.filter((project) => project.skills.some((skill) => filters.skills.includes(skill)))
    }

    return filteredProjs
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted || !currentStudent) {
    return null
  }

  const handleOpenJobDetail = (job: any) => {
    setSelectedJob(job)
    setIsJobDetailModalOpen(true)
  }

  const handleApplyToJob = () => {
    setIsJobDetailModalOpen(false)
    setIsApplicationModalOpen(true)
  }

  const handleApplySubmit = (formData: any) => {
    toast({
      title: "Application Submitted",
      description: `Your application for ${selectedJob.title} at ${selectedJob.company} has been submitted successfully.`,
      type: "success",
    })
    setIsApplicationModalOpen(false)
  }

  // Update the handleStartupIdeaSubmit function to add the submitted idea to the state
  const handleStartupIdeaSubmit = (formData: any) => {
    // Create a new startup idea object with additional fields to match project structure
    const newStartupIdea = {
      id: `startup-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      company: `${currentStudent.fullName}'s Startup`,
      type: "Startup Idea",
      duration: formData.stage,
      skills: formData.skillsNeeded,
      responsibilities: [
        formData.problem,
        formData.solution,
        `Target Audience: ${formData.targetAudience}`,
        `Market Potential: ${formData.marketPotential}`,
      ],
      requirements: [
        `Help Needed: ${formData.helpNeeded || "Not specified"}`,
        `Funding Needed: ${formData.fundingNeeded || "Not specified"}`,
      ],
      postedDate: new Date().toISOString().split("T")[0],
      isStartupIdea: true, // Flag to identify this as a startup idea
    }

    // Add the new startup idea to the state
    setSubmittedStartupIdeas((prev) => [...prev, newStartupIdea])

    // Add the new startup idea to the filtered projects
    setFilteredProjects((prev) => [newStartupIdea, ...prev])

    toast({
      title: "Startup Idea Submitted",
      description: "Your startup idea has been submitted successfully. We'll notify you when people show interest.",
      type: "success",
    })
    setIsStartupIdeaModalOpen(false)
  }

  const handleLearnRequestSubmit = (formData: any) => {
    toast({
      title: "Learning Request Submitted",
      description: "Your request to learn has been submitted. We'll connect you with mentors soon.",
      type: "success",
    })
    setIsLearnRequestModalOpen(false)
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-white via-violet-50/30 to-white text-violet-950 dark:from-black dark:via-zinc-900/50 dark:to-black dark:text-white">
      <PremiumNavbar studentId={studentId} />
      <main className="flex-1 pt-20">
        <div className="container px-4 py-8 md:px-8 lg:px-12">
          <ExploreHeader student={currentStudent} />

          <div className="mt-8 flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <ExploreFilters filters={filters} onFilterChange={handleFilterChange} />

              <div className="mt-8 space-y-4">
                <Button
                  onClick={() => setIsStartupIdeaModalOpen(true)}
                  className="w-full bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
                >
                  <Icons.lightbulb className="mr-2 h-4 w-4" />
                  Submit Startup Idea
                </Button>

                <Button
                  onClick={() => setIsLearnRequestModalOpen(true)}
                  variant="outline"
                  className="w-full border-violet-200 bg-white/80 text-violet-800 hover:bg-white hover:text-violet-900 dark:border-violet-800/30 dark:bg-zinc-900/80 dark:text-violet-300 dark:hover:bg-zinc-800/80 dark:hover:text-violet-200"
                >
                  <Icons.bookOpen className="mr-2 h-4 w-4" />
                  Request to Learn
                </Button>
              </div>
            </div>

            <div className="lg:w-3/4">
              <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="jobs">Job Opportunities</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="jobs" className="animate-in fade-in-50">
                  <JobList jobs={filteredJobs} onJobClick={handleOpenJobDetail} userSkills={currentStudent.skills} />
                </TabsContent>

                <TabsContent value="projects" className="animate-in fade-in-50">
                  <ProjectList
                    projects={filteredProjects}
                    onProjectClick={handleOpenJobDetail}
                    userSkills={currentStudent.skills}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />

      {/* Modals */}
      <JobDetailModal
        isOpen={isJobDetailModalOpen}
        onClose={() => setIsJobDetailModalOpen(false)}
        job={selectedJob}
        onApply={handleApplyToJob}
      />

      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        job={selectedJob}
        userData={currentStudent}
        onSubmit={handleApplySubmit}
      />

      <StartupIdeaModal
        isOpen={isStartupIdeaModalOpen}
        onClose={() => setIsStartupIdeaModalOpen(false)}
        onSubmit={handleStartupIdeaSubmit}
      />

      <LearnRequestModal
        isOpen={isLearnRequestModalOpen}
        onClose={() => setIsLearnRequestModalOpen(false)}
        onSubmit={handleLearnRequestSubmit}
      />
    </div>
  )
}

