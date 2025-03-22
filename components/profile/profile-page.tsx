"use client"

import { useState } from "react"
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

  const handleUpdateUserData = (section: string, data: any) => {
    setUserData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-white via-violet-50/30 to-white text-violet-950 dark:from-black dark:via-zinc-900/50 dark:to-black dark:text-white">
      <PremiumNavbar />
      <main className="flex-1 pt-20">
        <div className="container px-4 py-8 md:px-8 lg:px-12">
          <ProfileHeader userData={userData} onUpdate={(data) => handleUpdateUserData("socialLinks", data)} />

          <div className="mt-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-2 gap-4 rounded-lg bg-violet-100/50 p-2 dark:bg-violet-900/20 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
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

              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <ProfileAbout about={userData.about} onUpdate={(about) => handleUpdateUserData("about", about)} />
                  </div>
                  <div>
                    <ProfileConnections connections={userData.connections} />
                  </div>
                </div>

                <ProfileSkills skills={userData.skills} onUpdate={(skills) => handleUpdateUserData("skills", skills)} />

                <div className="grid gap-8 md:grid-cols-2">
                  <ProfileProjects
                    projects={userData.projects.slice(0, 1)}
                    onUpdate={(projects) => handleUpdateUserData("projects", projects)}
                  />
                  <ProfileExperience
                    experience={userData.experience.slice(0, 1)}
                    onUpdate={(experience) => handleUpdateUserData("experience", experience)}
                  />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <ProfileAchievements achievements={userData.achievements.slice(0, 2)} />
                  <ProfileReviews reviews={userData.reviews.slice(0, 1)} />
                </div>

                <ProfileActivity activity={userData.activity.slice(0, 3)} analytics={userData.analytics} />
              </TabsContent>

              <TabsContent value="skills">
                <ProfileSkills
                  skills={userData.skills}
                  onUpdate={(skills) => handleUpdateUserData("skills", skills)}
                  showAll
                />
              </TabsContent>

              <TabsContent value="projects">
                <ProfileProjects
                  projects={userData.projects}
                  onUpdate={(projects) => handleUpdateUserData("projects", projects)}
                  showAll
                />
              </TabsContent>

              <TabsContent value="experience">
                <ProfileExperience
                  experience={userData.experience}
                  onUpdate={(experience) => handleUpdateUserData("experience", experience)}
                  showAll
                />
              </TabsContent>

              <TabsContent value="connections">
                <ProfileConnections connections={userData.connections} showAll />
              </TabsContent>

              <TabsContent value="achievements">
                <ProfileAchievements achievements={userData.achievements} showAll />
              </TabsContent>

              <TabsContent value="growth">
                <div className="grid gap-8 md:grid-cols-2">
                  <ProfileGrowth suggestions={userData.growthSuggestions} />
                  <ProfileCollaboration projects={userData.collaborationProjects} />
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <ProfileActivity activity={userData.activity} analytics={userData.analytics} showAll />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <PremiumFooter />
    </div>
  )
}

