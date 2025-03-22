"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Project {
  title: string
  description: string
  technologies: string[]
  links: {
    github?: string
    demo?: string
  }
  role: string
  contributions: string
  ratings: number
  reviews: number
  image: string
}

interface ProfileProjectsProps {
  projects: Project[]
  onUpdate: (projects: Project[]) => void
  showAll?: boolean
}

export function ProfileProjects({ projects, onUpdate, showAll = false }: ProfileProjectsProps) {
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [newProject, setNewProject] = useState<Project>({
    title: "",
    description: "",
    technologies: [],
    links: {},
    role: "",
    contributions: "",
    ratings: 0,
    reviews: 0,
    image: "/placeholder.svg?height=300&width=500",
  })
  const [newTechnology, setNewTechnology] = useState("")
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

  const handleAddProject = () => {
    if (newProject.title.trim() === "") return

    onUpdate([...projects, newProject])
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      links: {},
      role: "",
      contributions: "",
      ratings: 0,
      reviews: 0,
      image: "/placeholder.svg?height=300&width=500",
    })
    setIsAddingProject(false)
  }

  const handleDeleteProject = (projectTitle: string) => {
    onUpdate(projects.filter((project) => project.title !== projectTitle))
    setProjectToDelete(null)
  }

  const handleAddTechnology = () => {
    if (newTechnology.trim() === "") return

    setNewProject({
      ...newProject,
      technologies: [...newProject.technologies, newTechnology],
    })
    setNewTechnology("")
  }

  const handleRemoveTechnology = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((t) => t !== tech),
    })
  }

  return (
    <Card className="overflow-hidden border-violet-100 shadow-md dark:border-violet-800/30">
      <CardHeader className="bg-gradient-to-r from-violet-100/50 to-violet-50/50 dark:from-violet-900/20 dark:to-violet-800/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.briefcase className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <CardTitle>Projects</CardTitle>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
                size="sm"
              >
                <Icons.plus className="mr-1 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="projectTitle">Project Title</Label>
                  <Input
                    id="projectTitle"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g., E-commerce Platform, AI Assistant"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="projectDescription">Description</Label>
                  <Textarea
                    id="projectDescription"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe your project, its purpose, and key features..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Technologies Used</Label>
                  <div className="flex flex-wrap gap-2">
                    {newProject.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        className="flex items-center gap-1 bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                      >
                        {tech}
                        <button
                          onClick={() => handleRemoveTechnology(tech)}
                          className="ml-1 rounded-full hover:text-red-500"
                        >
                          <Icons.x className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      placeholder="e.g., React, Node.js, Python"
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddTechnology} variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="projectRole">Your Role</Label>
                  <Input
                    id="projectRole"
                    value={newProject.role}
                    onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                    placeholder="e.g., Lead Developer, UI Designer"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="projectContributions">Your Contributions</Label>
                  <Textarea
                    id="projectContributions"
                    value={newProject.contributions}
                    onChange={(e) => setNewProject({ ...newProject, contributions: e.target.value })}
                    placeholder="Describe your specific contributions to the project..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="githubLink">GitHub Link</Label>
                    <Input
                      id="githubLink"
                      value={newProject.links.github || ""}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          links: { ...newProject.links, github: e.target.value },
                        })
                      }
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="demoLink">Demo Link</Label>
                    <Input
                      id="demoLink"
                      value={newProject.links.demo || ""}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          links: { ...newProject.links, demo: e.target.value },
                        })
                      }
                      placeholder="https://demo-site.com"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddProject}>Add Project</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>Showcase your work and accomplishments</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-violet-200 bg-violet-50/50 p-8 text-center dark:border-violet-800/30 dark:bg-violet-900/10">
            <Icons.briefcase className="mb-2 h-10 w-10 text-violet-400 dark:text-violet-500" />
            <h3 className="mb-1 text-lg font-medium text-violet-900 dark:text-white">No projects yet</h3>
            <p className="mb-4 text-sm text-violet-700 dark:text-violet-300">
              Showcase your work by adding your first project
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
                  size="sm"
                >
                  <Icons.plus className="mr-1 h-4 w-4" />
                  Add Project
                </Button>
              </DialogTrigger>
              {/* Dialog content is the same as above */}
            </Dialog>
          </div>
        ) : (
          <Carousel className="w-full">
            <CarouselContent>
              <AnimatePresence>
                {projects.map((project, index) => (
                  <CarouselItem key={project.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="group relative overflow-hidden rounded-xl border border-violet-100 bg-white shadow-md transition-all hover:shadow-lg dark:border-violet-800/30 dark:bg-zinc-900/80"
                    >
                      <div className="absolute right-2 top-2 z-10 flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white/80 text-violet-600 backdrop-blur-sm hover:bg-white hover:text-violet-700 dark:bg-zinc-900/80 dark:text-violet-400 dark:hover:bg-zinc-800/80 dark:hover:text-violet-300"
                        >
                          <Icons.edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white/80 text-red-600 backdrop-blur-sm hover:bg-white hover:text-red-700 dark:bg-zinc-900/80 dark:text-red-400 dark:hover:bg-zinc-800/80 dark:hover:text-red-300"
                          onClick={() => setProjectToDelete(project.title)}
                        >
                          <Icons.trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>

                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{project.title}</h3>
                          <p className="text-sm text-white/80">{project.role}</p>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="mb-3 flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <p className="mb-4 text-sm text-violet-800 dark:text-violet-200">
                          {project.description.length > 150
                            ? `${project.description.substring(0, 150)}...`
                            : project.description}
                        </p>

                        <div className="mb-4 flex items-center gap-4">
                          <div className="flex items-center text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Icons.star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(project.ratings) ? "fill-current" : "fill-none"}`}
                              />
                            ))}
                            <span className="ml-1 text-xs text-violet-700 dark:text-violet-300">
                              ({project.reviews})
                            </span>
                          </div>

                          <div className="flex gap-2">
                            {project.links.github && (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-violet-100 p-1.5 text-violet-800 transition-colors hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-800/40"
                              >
                                <Icons.github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                              </a>
                            )}
                            {project.links.demo && (
                              <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-violet-100 p-1.5 text-violet-800 transition-colors hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-800/40"
                              >
                                <Icons.globe className="h-4 w-4" />
                                <span className="sr-only">Demo</span>
                              </a>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="link"
                          className="p-0 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                        >
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
            <div className="flex justify-center gap-2 pt-4">
              <CarouselPrevious className="relative inset-auto h-8 w-8 translate-y-0 border-violet-200 bg-white/80 text-violet-800 backdrop-blur-sm hover:bg-white hover:text-violet-900 dark:border-violet-800/30 dark:bg-zinc-900/80 dark:text-violet-300 dark:hover:bg-zinc-800/80 dark:hover:text-violet-200" />
              <CarouselNext className="relative inset-auto h-8 w-8 translate-y-0 border-violet-200 bg-white/80 text-violet-800 backdrop-blur-sm hover:bg-white hover:text-violet-900 dark:border-violet-800/30 dark:bg-zinc-900/80 dark:text-violet-300 dark:hover:bg-zinc-800/80 dark:hover:text-violet-200" />
            </div>
          </Carousel>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={projectToDelete !== null} onOpenChange={(open) => !open && setProjectToDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete this project? This action cannot be undone.</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setProjectToDelete(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => projectToDelete && handleDeleteProject(projectToDelete)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

