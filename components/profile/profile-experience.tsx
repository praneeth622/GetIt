"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Experience {
  company: string
  role: string
  duration: string
  responsibilities: string[]
  rating: number
}

interface ProfileExperienceProps {
  experience: Experience[]
  onUpdate: (experience: Experience[]) => void
  showAll?: boolean
}

export function ProfileExperience({ experience, onUpdate, showAll = false }: ProfileExperienceProps) {
  const [isAddingExperience, setIsAddingExperience] = useState(false)
  const [newExperience, setNewExperience] = useState<Experience>({
    company: "",
    role: "",
    duration: "",
    responsibilities: [],
    rating: 0,
  })
  const [newResponsibility, setNewResponsibility] = useState("")
  const [experienceToDelete, setExperienceToDelete] = useState<string | null>(null)

  const displayedExperience = showAll ? experience : experience.slice(0, 2)

  const handleAddExperience = () => {
    if (newExperience.company.trim() === "" || newExperience.role.trim() === "") return

    onUpdate([...experience, newExperience])
    setNewExperience({
      company: "",
      role: "",
      duration: "",
      responsibilities: [],
      rating: 0,
    })
    setIsAddingExperience(false)
  }

  const handleDeleteExperience = (company: string) => {
    onUpdate(experience.filter((exp) => exp.company !== company))
    setExperienceToDelete(null)
  }

  const handleAddResponsibility = () => {
    if (newResponsibility.trim() === "") return

    setNewExperience({
      ...newExperience,
      responsibilities: [...newExperience.responsibilities, newResponsibility],
    })
    setNewResponsibility("")
  }

  const handleRemoveResponsibility = (responsibility: string) => {
    setNewExperience({
      ...newExperience,
      responsibilities: newExperience.responsibilities.filter((r) => r !== responsibility),
    })
  }

  return (
    <Card className="overflow-hidden border-violet-100 shadow-md dark:border-violet-800/30">
      <CardHeader className="bg-gradient-to-r from-violet-100/50 to-violet-50/50 dark:from-violet-900/20 dark:to-violet-800/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.briefcase className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <CardTitle>Work Experience</CardTitle>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
                size="sm"
              >
                <Icons.plus className="mr-1 h-4 w-4" />
                Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add Work Experience</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    placeholder="e.g., Google, Microsoft, Freelance"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Job Title/Role</Label>
                  <Input
                    id="role"
                    value={newExperience.role}
                    onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                    placeholder="e.g., Software Engineer, UX Designer"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newExperience.duration}
                    onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                    placeholder="e.g., Jan 2022 - Present, Jun 2021 - Dec 2021"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Key Responsibilities</Label>
                  <ul className="space-y-2">
                    {newExperience.responsibilities.map((responsibility, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between rounded-md bg-violet-50 px-3 py-2 text-sm text-violet-800 dark:bg-violet-900/20 dark:text-violet-300"
                      >
                        <span>{responsibility}</span>
                        <button
                          onClick={() => handleRemoveResponsibility(responsibility)}
                          className="ml-2 rounded-full text-red-500 hover:text-red-700"
                        >
                          <Icons.x className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Input
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      placeholder="Add a key responsibility"
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddResponsibility} variant="outline">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddExperience}>Add Experience</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>Share your professional work history</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {experience.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-violet-200 bg-violet-50/50 p-8 text-center dark:border-violet-800/30 dark:bg-violet-900/10">
            <Icons.briefcase className="mb-2 h-10 w-10 text-violet-400 dark:text-violet-500" />
            <h3 className="mb-1 text-lg font-medium text-violet-900 dark:text-white">No work experience yet</h3>
            <p className="mb-4 text-sm text-violet-700 dark:text-violet-300">
              Add your work history to showcase your professional experience
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
                  size="sm"
                >
                  <Icons.plus className="mr-1 h-4 w-4" />
                  Add Experience
                </Button>
              </DialogTrigger>
              {/* Dialog content is the same as above */}
            </Dialog>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {displayedExperience.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative rounded-lg border border-violet-100 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-violet-800/30 dark:bg-zinc-900/80"
                >
                  <div className="absolute right-4 top-4 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                    >
                      <Icons.edit className="h-3.5 w-3.5" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => setExperienceToDelete(exp.company)}
                    >
                      <Icons.trash className="h-3.5 w-3.5" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>

                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-violet-900 dark:text-white">{exp.role}</h3>
                      <p className="text-violet-700 dark:text-violet-300">{exp.company}</p>
                      <p className="text-sm text-violet-600 dark:text-violet-400">{exp.duration}</p>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Icons.star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(exp.rating) ? "fill-current" : "fill-none"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-violet-800 dark:text-violet-200">
                      Key Responsibilities:
                    </h4>
                    <ul className="ml-5 list-disc space-y-1 text-sm text-violet-700 dark:text-violet-300">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {!showAll && experience.length > 2 && (
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  View all {experience.length} experiences
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={experienceToDelete !== null} onOpenChange={(open) => !open && setExperienceToDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Experience</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete this work experience? This action cannot be undone.</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setExperienceToDelete(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => experienceToDelete && handleDeleteExperience(experienceToDelete)}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

