"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
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
import { toast } from "sonner"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getUserProfile, updateUserProfile } from "@/lib/firebase-service"

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

export default function StudentProfilePage() {
  const params = useParams()
  const { studentId } = params
  const viewingOwnProfile = true // We'll set this based on auth check

  // Default profile structure
  const defaultProfile = {
    id: studentId as string,
    fullName: "",
    email: "",
    title: "",
    university: "",
    about: "",
    skills: [],
    projects: [],
    experience: [],
    connections: { followers: 0, following: 0 },
    achievements: [],
    growthSuggestions: [],
    collaborationProjects: [],
    reviews: [],
    activity: [],
    analytics: { profileViews: 0, jobApplications: 0, projectInquiries: 0, endorsementsReceived: 0 },
    socialLinks: {},
    avatar: "/placeholder.svg?height=200&width=200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const [userData, setUserData] = useState(defaultProfile)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [viewAllSections, setViewAllSections] = useState<Record<string, boolean>>({
    skills: false,
    projects: false,
    experience: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isEditable, setIsEditable] = useState(false)

  // Fetch user data from Firebase
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error("Please login to view this profile");
        return;
      }
      
      setCurrentUserId(user.uid);
      
      // Determine if the current user is viewing their own profile
      const isOwnProfile = user.uid === studentId;
      setIsEditable(isOwnProfile);
      
      try {
        setIsLoading(true);
        const profileData = await getUserProfile(studentId as string);
        
        // Merge default structure with fetched data to ensure all fields exist
        setUserData(prev => ({
          ...defaultProfile,
          ...profileData
        }));
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to fetch profile data");
      } finally {
        setIsLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, [studentId]);

  const handleUpdateUserData = async (section: string, data: any) => {
    // Only allow updates if the user is viewing their own profile
    if (!isEditable || !currentUserId) {
      toast.error("You can only edit your own profile");
      return;
    }
    
    try {
      // Update local state immediately for better UX
      setUserData((prev) => {
        const newState = { ...prev };
        
        // If data is an object with key-value pairs (like from ProfileHeader)
        if (typeof data === "object" && !Array.isArray(data) && data !== null && section === "") {
          // Merge the data directly into userData
          Object.keys(data).forEach((key) => {
            newState[key as keyof typeof newState] = data[key];
          });
        } else {
          // Update the specific section
          newState[section as keyof typeof newState] = data;
        }
        
        return newState;
      });
      
      // Then update in Firebase
      await updateUserProfile(currentUserId, section, data);
      toast.success(`Your ${section || "profile"} has been updated successfully.`);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(`Failed to update ${section || "profile"}.`);
    }
  };

  // Add a function to handle adding a new project
  const handleAddNewProject = () => {
    if (!isEditable) {
      toast.error("You can only edit your own profile");
      return;
    }
    
    setActiveTab("projects");
    // Add a small delay to ensure the tab change is complete
    setTimeout(() => {
      // Find the "Add Project" button and click it
      const addProjectButton = document.querySelector('[aria-label="Add Project"]') as HTMLButtonElement;
      if (addProjectButton) {
        addProjectButton.click();
      }
    }, 200);
  };

  // Add a function to handle adding a new experience
  const handleAddNewExperience = () => {
    if (!isEditable) {
      toast.error("You can only edit your own profile");
      return;
    }
    
    setActiveTab("experience");
    // Add a small delay to ensure the tab change is complete
    setTimeout(() => {
      // Find the "Add Experience" button and click it
      const addExperienceButton = document.querySelector('[aria-label="Add Experience"]') as HTMLButtonElement;
      if (addExperienceButton) {
        addExperienceButton.click();
      }
    }, 200);
  };

  const toggleViewAll = (section: string) => {
    setViewAllSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));

    // Switch to the appropriate tab when "View All" is clicked
    setActiveTab(section);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-white via-violet-50/30 to-white text-violet-950 dark:from-black dark:via-zinc-900/50 dark:to-black dark:text-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"></div>
        <p className="mt-4 text-lg font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-white via-violet-50/30 to-white text-violet-950 dark:from-black dark:via-zinc-900/50 dark:to-black dark:text-white">
      <PremiumNavbar />
      <motion.main className="flex-1 pt-20" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <div className="container px-4 py-8 md:px-8 lg:px-12">
          <motion.div variants={itemVariants}>
            <ProfileHeader 
              userData={userData} 
              onUpdate={isEditable ? (data) => handleUpdateUserData("", data) : undefined} 
              isEditable={isEditable}
            />
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
                    <ProfileAbout 
                      about={userData.about} 
                      onUpdate={isEditable ? (about) => handleUpdateUserData("about", about) : undefined}
                      isEditable={isEditable}
                    />
                  </div>
                  <div>
                    <ProfileConnections connections={userData.connections} />
                  </div>
                </div>

                <ProfileSkills
                  skills={userData.skills}
                  onUpdate={isEditable ? (skills) => handleUpdateUserData("skills", skills) : undefined}
                  viewAll={viewAllSections.skills}
                  onViewAllClick={() => toggleViewAll("skills")}
                  isEditable={isEditable}
                />

                <div className="grid gap-8 md:grid-cols-2">
                  <ProfileProjects
                    projects={viewAllSections.projects ? userData.projects : userData.projects.slice(0, 1)}
                    onUpdate={isEditable ? (projects) => handleUpdateUserData("projects", projects) : undefined}
                    viewAll={viewAllSections.projects}
                    onViewAllClick={() => toggleViewAll("projects")}
                    isEditable={isEditable}
                  />
                  <ProfileExperience
                    experience={viewAllSections.experience ? userData.experience : userData.experience.slice(0, 1)}
                    onUpdate={isEditable ? (experience) => handleUpdateUserData("experience", experience) : undefined}
                    viewAll={viewAllSections.experience}
                    onViewAllClick={() => toggleViewAll("experience")}
                    isEditable={isEditable}
                  />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <ProfileAchievements achievements={userData.achievements || []} />
                  <ProfileReviews reviews={userData.reviews || []} />
                </div>

                <ProfileActivity 
                  activity={userData.activity || []} 
                  analytics={userData.analytics || {}} 
                />
              </TabsContent>

              <TabsContent value="skills" className="animate-in fade-in-50">
                <ProfileSkills
                  skills={userData.skills}
                  onUpdate={isEditable ? (skills) => handleUpdateUserData("skills", skills) : undefined}
                  viewAll={true}
                  isEditable={isEditable}
                />
              </TabsContent>

              <TabsContent value="projects" className="animate-in fade-in-50">
                <ProfileProjects
                  projects={userData.projects}
                  onUpdate={isEditable ? (projects) => handleUpdateUserData("projects", projects) : undefined}
                  viewAll={true}
                  isEditable={isEditable}
                />
              </TabsContent>

              <TabsContent value="experience" className="animate-in fade-in-50">
                <ProfileExperience
                  experience={userData.experience}
                  onUpdate={isEditable ? (experience) => handleUpdateUserData("experience", experience) : undefined}
                  viewAll={true}
                  isEditable={isEditable}
                />
              </TabsContent>

              <TabsContent value="connections" className="animate-in fade-in-50">
                <ProfileConnections connections={userData.connections} showAll />
              </TabsContent>

              <TabsContent value="achievements" className="animate-in fade-in-50">
                <ProfileAchievements achievements={userData.achievements || []} showAll />
              </TabsContent>

              <TabsContent value="growth" className="animate-in fade-in-50">
                <div className="grid gap-8 md:grid-cols-2">
                  <ProfileGrowth suggestions={userData.growthSuggestions || []} />
                  <ProfileCollaboration projects={userData.collaborationProjects || []} />
                </div>
              </TabsContent>

              <TabsContent value="activity" className="animate-in fade-in-50">
                <ProfileActivity 
                  activity={userData.activity || []} 
                  analytics={userData.analytics || {}} 
                  showAll 
                />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Quick Actions Floating Button - Only show for own profile */}
          {isEditable && (
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
                    onClick={handleAddNewProject}
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
                    onClick={handleAddNewExperience}
                    aria-label="Add Experience"
                  >
                    <Icons.briefcase className="h-4 w-4" />
                    <span>Add Experience</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.main>
      <PremiumFooter />
    </div>
  );
}

