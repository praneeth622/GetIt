"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileAbout } from "@/components/profile/profile-about"
import { ProfileSkills } from "@/components/profile/profile-skills"
import { ProfileProjects } from "@/components/profile/profile-projects"
import { ProfileExperience } from "@/components/profile/profile-experience"
import { ProfileConnections } from "@/components/profile/profile-connections"
import { ProfileAchievements } from "@/components/profile/profile-achievements"
import { ProfileGrowth } from "@/components/profile/profile-growth"
import { ProfileCollaboration } from "@/components/profile/profile-collaboration"
import { ProfileReviews } from "@/components/profile/profile-reviews"
import { ProfileActivity } from "@/components/profile/profile-activity"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PremiumNavbar } from "@/components/premium-navbar"
import { PremiumFooter } from "@/components/premium-footer"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { toast } from "@/components/ui/use-toast"

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0 },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: { opacity: 0, y: -20 },
}

export function ProfilePage() {
  // This would typically come from an API or context
  const [userData, setUserData] = useState({
    fullName: "Alex Johnson",
    username: "alexjohnson",
    title: "Full-Stack Developer | AI Enthusiast",
    email: "alex.johnson@university.edu",
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    socialLinks: {
      linkedin: "alexjohnson",
      github: "alexjohnson",
      behance: "alexjohnson",
      dribbble: "alexjohnson",
    },
    website: "https://alexjohnson.dev",
    about:
      "Passionate full-stack developer with a focus on AI and machine learning applications. Currently pursuing a Computer Science degree at Stanford University. I love building innovative solutions that solve real-world problems and am always looking to collaborate on exciting projects.",
    skills: [
      { name: "React", proficiency: "Expert", endorsements: 24 },
      { name: "Node.js", proficiency: "Expert", endorsements: 18 },
      { name: "Python", proficiency: "Intermediate", endorsements: 15 },
      { name: "TensorFlow", proficiency: "Intermediate", endorsements: 12 },
      { name: "UI/UX Design", proficiency: "Intermediate", endorsements: 10 },
      { name: "GraphQL", proficiency: "Beginner", endorsements: 5 },
    ],
    projects: [
      {
        title: "AI-Powered Study Assistant",
        description:
          "A web application that helps students organize study materials and provides AI-generated summaries and practice questions.",
        technologies: ["React", "Node.js", "TensorFlow.js", "MongoDB"],
        links: {
          github: "https://github.com/alexjohnson/study-assistant",
          demo: "https://study-assistant.demo.com",
        },
        role: "Lead Developer",
        contributions: "Designed the architecture, implemented the AI features, and led a team of 3 developers.",
        ratings: 4.8,
        reviews: 12,
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "E-commerce Platform",
        description:
          "A full-featured e-commerce platform with real-time inventory management and personalized recommendations.",
        technologies: ["Next.js", "Express", "PostgreSQL", "Redis"],
        links: {
          github: "https://github.com/alexjohnson/ecommerce",
          demo: "https://ecommerce.demo.com",
        },
        role: "Full-Stack Developer",
        contributions: "Built the frontend, implemented the recommendation engine, and optimized database queries.",
        ratings: 4.6,
        reviews: 8,
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Social Media Analytics Dashboard",
        description:
          "A comprehensive dashboard for tracking and analyzing social media performance across multiple platforms.",
        technologies: ["Vue.js", "D3.js", "Firebase", "Python"],
        links: {
          github: "https://github.com/alexjohnson/social-analytics",
          demo: "https://social-analytics.demo.com",
        },
        role: "Frontend Developer",
        contributions: "Designed and implemented interactive data visualizations and real-time analytics features.",
        ratings: 4.9,
        reviews: 15,
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        title: "Blockchain Voting System",
        description:
          "A secure and transparent voting system built on blockchain technology for student government elections.",
        technologies: ["Solidity", "Ethereum", "React", "Web3.js"],
        links: {
          github: "https://github.com/alexjohnson/blockchain-voting",
          demo: "https://blockchain-voting.demo.com",
        },
        role: "Blockchain Developer",
        contributions: "Developed smart contracts, implemented security features, and created the web interface.",
        ratings: 4.7,
        reviews: 10,
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    experience: [
      {
        company: "TechInnovate",
        role: "Software Engineering Intern",
        duration: "Jun 2022 - Aug 2022",
        responsibilities: [
          "Developed and maintained RESTful APIs using Node.js and Express",
          "Implemented frontend features using React and Redux",
          "Collaborated with the design team to improve UI/UX",
        ],
        rating: 4.9,
      },
      {
        company: "DataViz Solutions",
        role: "Frontend Developer (Part-time)",
        duration: "Jan 2022 - May 2022",
        responsibilities: [
          "Built interactive data visualizations using D3.js",
          "Optimized web performance for complex data rendering",
          "Implemented responsive designs for mobile and desktop",
        ],
        rating: 4.7,
      },
      {
        company: "AI Research Lab",
        role: "Research Assistant",
        duration: "Sep 2021 - Dec 2021",
        responsibilities: [
          "Conducted research on natural language processing algorithms",
          "Implemented and tested machine learning models using TensorFlow",
          "Co-authored a research paper on sentiment analysis techniques",
          "Presented findings at the university's AI symposium",
        ],
        rating: 4.8,
      },
      {
        company: "Freelance",
        role: "Web Developer",
        duration: "May 2021 - Present",
        responsibilities: [
          "Designed and developed responsive websites for small businesses",
          "Created custom e-commerce solutions using Shopify and WooCommerce",
          "Provided ongoing maintenance and support for client websites",
          "Implemented SEO best practices to improve search rankings",
        ],
        rating: 5.0,
      },
    ],
    connections: {
      followers: 156,
      following: 89,
    },
    achievements: [
      { name: "Expert Developer", description: "Completed 8 projects with high ratings", icon: "award" },
      { name: "Top Performer", description: "Ranked in the top 5% of developers", icon: "trophy" },
      { name: "Collaboration Star", description: "Successfully worked with 20+ team members", icon: "users" },
    ],
    growthSuggestions: [
      { type: "course", name: "Advanced Machine Learning", platform: "Coursera", relevance: "High" },
      { type: "certification", name: "AWS Certified Developer", platform: "Amazon", relevance: "Medium" },
      { type: "skill", name: "Docker & Kubernetes", relevance: "High" },
    ],
    collaborationProjects: [
      {
        title: "HealthTech Mobile App",
        description:
          "A mobile application that helps users track health metrics and provides personalized recommendations.",
        seeking: ["Mobile Developer", "UI/UX Designer", "Health Data Specialist"],
        status: "In Progress",
      },
    ],
    reviews: [
      {
        name: "Sarah Chen",
        role: "Project Manager at TechInnovate",
        rating: 5,
        comment:
          "Alex is an exceptional developer with great communication skills. Delivered high-quality work ahead of schedule.",
        date: "August 15, 2022",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Michael Rodriguez",
        role: "CTO at StartupX",
        rating: 4.5,
        comment: "Great problem-solver and team player. Would definitely work with Alex again on future projects.",
        date: "May 22, 2022",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    activity: [
      { type: "project", action: "Completed", target: "AI-Powered Study Assistant", date: "September 10, 2022" },
      { type: "skill", action: "Added", target: "GraphQL", date: "August 25, 2022" },
      { type: "endorsement", action: "Received", target: "React", date: "August 20, 2022" },
      { type: "job", action: "Applied for", target: "Senior Developer at InnoTech", date: "August 15, 2022" },
    ],
    analytics: {
      profileViews: 342,
      jobApplications: 12,
      projectInquiries: 8,
      endorsementsReceived: 45,
    },
  })

  const [activeTab, setActiveTab] = useState("overview")
  const [viewAllSections, setViewAllSections] = useState<Record<string, boolean>>({
    skills: false,
    projects: false,
    experience: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleUpdateUserData = (section: string, data: any) => {
    setUserData((prev) => {
      // Create a new state object to ensure React detects the change
      const newState = { ...prev }

      // If data is an object with key-value pairs (like from ProfileHeader)
      if (typeof data === "object" && !Array.isArray(data) && data !== null && section === "") {
        // Merge the data directly into userData
        Object.keys(data).forEach((key) => {
          newState[key as keyof typeof newState] = data[key]
        })
      } else {
        // Update the specific section
        newState[section as keyof typeof newState] = data
      }

      return newState
    })

    // Add a small delay to ensure smooth animation and force a re-render
    setTimeout(() => {
      // Force a re-render if needed
      setUserData((current) => ({ ...current }))

      // Show a success toast for the update
      toast({
        title: "Profile updated",
        description: `Your ${section || "profile"} has been updated successfully.`,
        type: "success",
      })
    }, 100)
  }

  // Add a function to handle adding a new project
  const handleAddNewProject = () => {
    setActiveTab("projects")
    // Add a small delay to ensure the tab change is complete
    setTimeout(() => {
      // Find the "Add Project" button and click it
      const addProjectButton = document.querySelector('[aria-label="Add Project"]') as HTMLButtonElement
      if (addProjectButton) {
        addProjectButton.click()
      }
    }, 200)
  }

  // Add a function to handle adding a new experience
  const handleAddNewExperience = () => {
    setActiveTab("experience")
    // Add a small delay to ensure the tab change is complete
    setTimeout(() => {
      // Find the "Add Experience" button and click it
      const addExperienceButton = document.querySelector('[aria-label="Add Experience"]') as HTMLButtonElement
      if (addExperienceButton) {
        addExperienceButton.click()
      }
    }, 200)
  }

  const toggleViewAll = (section: string) => {
    setViewAllSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))

    // Switch to the appropriate tab when "View All" is clicked
    setActiveTab(section)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-white via-violet-50/30 to-white text-violet-950 dark:from-black dark:via-zinc-900/50 dark:to-black dark:text-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>
        <p className="mt-4 text-lg font-medium">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-white via-violet-50/30 to-white text-violet-950 dark:from-black dark:via-zinc-900/50 dark:to-black dark:text-white">
      <PremiumNavbar />
      <motion.main className="flex-1 pt-20" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <div className="container px-4 py-8 md:px-8 lg:px-12">
          <motion.div variants={itemVariants}>
            <ProfileHeader userData={userData} onUpdate={(data) => handleUpdateUserData("", data)} />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="mb-8 overflow-x-auto">
                <TabsList className="grid min-w-max w-full grid-cols-8 gap-4 rounded-lg bg-violet-100/50 p-2 dark:bg-violet-900/20">
                  <TabsTrigger value="overview" className="rounded-md">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="rounded-md">
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="rounded-md">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="rounded-md">
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="connections" className="rounded-md">
                    Network
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="rounded-md">
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger value="growth" className="rounded-md">
                    Growth
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="rounded-md">
                    Activity
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-8 animate-in fade-in-50">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <ProfileAbout about={userData.about} onUpdate={(about) => handleUpdateUserData("about", about)} />
                  </div>
                  <div>
                    <ProfileConnections connections={userData.connections} />
                  </div>
                </div>

                <ProfileSkills
                  skills={userData.skills}
                  onUpdate={(skills) => handleUpdateUserData("skills", skills)}
                  viewAll={viewAllSections.skills}
                  onViewAllClick={() => toggleViewAll("skills")}
                />

                <div className="grid gap-8 md:grid-cols-2">
                  <ProfileProjects
                    projects={viewAllSections.projects ? userData.projects : userData.projects.slice(0, 1)}
                    onUpdate={(projects) => handleUpdateUserData("projects", projects)}
                    viewAll={viewAllSections.projects}
                    onViewAllClick={() => toggleViewAll("projects")}
                  />
                  <ProfileExperience
                    experience={viewAllSections.experience ? userData.experience : userData.experience.slice(0, 1)}
                    onUpdate={(experience) => handleUpdateUserData("experience", experience)}
                    viewAll={viewAllSections.experience}
                    onViewAllClick={() => toggleViewAll("experience")}
                  />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <ProfileAchievements achievements={userData.achievements.slice(0, 2)} />
                  <ProfileReviews reviews={userData.reviews.slice(0, 1)} />
                </div>

                <ProfileActivity activity={userData.activity.slice(0, 3)} analytics={userData.analytics} />
              </TabsContent>

              <TabsContent value="skills" className="animate-in fade-in-50">
                <ProfileSkills
                  skills={userData.skills}
                  onUpdate={(skills) => handleUpdateUserData("skills", skills)}
                  viewAll={true}
                />
              </TabsContent>

              <TabsContent value="projects" className="animate-in fade-in-50">
                <ProfileProjects
                  projects={userData.projects}
                  onUpdate={(projects) => handleUpdateUserData("projects", projects)}
                  viewAll={true}
                />
              </TabsContent>

              <TabsContent value="experience" className="animate-in fade-in-50">
                <ProfileExperience
                  experience={userData.experience}
                  onUpdate={(experience) => handleUpdateUserData("experience", experience)}
                  viewAll={true}
                />
              </TabsContent>

              <TabsContent value="connections" className="animate-in fade-in-50">
                <ProfileConnections connections={userData.connections} showAll />
              </TabsContent>

              <TabsContent value="achievements" className="animate-in fade-in-50">
                <ProfileAchievements achievements={userData.achievements} showAll />
              </TabsContent>

              <TabsContent value="growth" className="animate-in fade-in-50">
                <div className="grid gap-8 md:grid-cols-2">
                  <ProfileGrowth suggestions={userData.growthSuggestions} />
                  <ProfileCollaboration projects={userData.collaborationProjects} />
                </div>
              </TabsContent>

              <TabsContent value="activity" className="animate-in fade-in-50">
                <ProfileActivity activity={userData.activity} analytics={userData.analytics} showAll />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Quick Actions Floating Button */}
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <div className="relative group">
              <Button
                size="lg"
                className="h-14 w-14 rounded-full bg-gradient-to-r from-violet-600 to-amber-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Icons.plus className="h-6 w-6" />
              </Button>

              <div className="absolute bottom-full right-0 mb-4 hidden flex-col gap-2 group-hover:flex">
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex items-center gap-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105"
                  onClick={() => setActiveTab("projects")}
                  aria-label="Add Project"
                >
                  <Icons.briefcase className="h-4 w-4" />
                  <span>Add Project</span>
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex items-center gap-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105"
                  onClick={() => setActiveTab("skills")}
                  aria-label="Add Skill"
                >
                  <Icons.code className="h-4 w-4" />
                  <span>Add Skill</span>
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex items-center gap-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105"
                  onClick={() => setActiveTab("experience")}
                  aria-label="Add Experience"
                >
                  <Icons.briefcase className="h-4 w-4" />
                  <span>Add Experience</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
      <PremiumFooter />
    </div>
  )
}

