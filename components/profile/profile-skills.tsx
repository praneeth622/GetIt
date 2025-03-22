"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"

interface Skill {
  name: string
  proficiency: string
  endorsements: number
}

interface ProfileSkillsProps {
  skills: Skill[]
  onUpdate: (skills: Skill[]) => void
  viewAll?: boolean
  onViewAllClick?: () => void
}

export function ProfileSkills({ skills, onUpdate, viewAll = false, onViewAllClick }: ProfileSkillsProps) {
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [newSkill, setNewSkill] = useState({
    name: "",
    proficiency: "Beginner",
    endorsements: 0,
  })
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null)
  const [isEditingSkill, setIsEditingSkill] = useState<string | null>(null)
  const [editedSkill, setEditedSkill] = useState<Skill | null>(null)

  const displayedSkills = viewAll ? skills : skills.slice(0, 6)

  const handleAddSkill = () => {
    if (newSkill.name.trim() === "") return

    const updatedSkills = [...skills, newSkill]
    onUpdate(updatedSkills)
    setNewSkill({
      name: "",
      proficiency: "Beginner",
      endorsements: 0,
    })
    setIsAddingSkill(false)
    toast({
      title: "Skill added",
      description: `${newSkill.name} has been added to your skills.`,
    })
  }

  const handleDeleteSkill = (skillName: string) => {
    const updatedSkills = skills.filter((skill) => skill.name !== skillName)
    onUpdate(updatedSkills)
    setSkillToDelete(null)
    toast({
      title: "Skill deleted",
      description: `${skillName} has been removed from your skills.`,
    })
  }

  const handleEditSkill = () => {
    if (!editedSkill || !isEditingSkill) return

    const updatedSkills = skills.map((skill) => (skill.name === isEditingSkill ? editedSkill : skill))
    onUpdate(updatedSkills)
    setIsEditingSkill(null)
    setEditedSkill(null)
    toast({
      title: "Skill updated",
      description: `${editedSkill.name} has been updated successfully.`,
    })
  }

  const startEditingSkill = (skill: Skill) => {
    setIsEditingSkill(skill.name)
    setEditedSkill(skill)
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Beginner":
        return "bg-blue-500"
      case "Intermediate":
        return "bg-violet-500"
      case "Expert":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProficiencyValue = (proficiency: string) => {
    switch (proficiency) {
      case "Beginner":
        return 33
      case "Intermediate":
        return 66
      case "Expert":
        return 100
      default:
        return 0
    }
  }

  return (
    <Card className="overflow-hidden border-violet-100 shadow-md dark:border-violet-800/30">
      <CardHeader className="bg-gradient-to-r from-violet-100/50 to-violet-50/50 dark:from-violet-900/20 dark:to-violet-800/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.code className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <CardTitle>Skills</CardTitle>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
                size="sm"
              >
                <Icons.plus className="mr-1 h-4 w-4" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="skillName">Skill Name</Label>
                  <Input
                    id="skillName"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    placeholder="e.g., JavaScript, Photoshop, Data Analysis"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="proficiency">Proficiency Level</Label>
                  <Select
                    value={newSkill.proficiency}
                    onValueChange={(value) => setNewSkill({ ...newSkill, proficiency: value })}
                  >
                    <SelectTrigger id="proficiency">
                      <SelectValue placeholder="Select proficiency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddSkill}>Add Skill</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>Showcase your technical and professional skills</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {displayedSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="group relative rounded-lg border border-violet-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-violet-800/30 dark:bg-zinc-900/80"
              >
                <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                    onClick={() => startEditingSkill(skill)}
                  >
                    <Icons.edit className="h-3.5 w-3.5" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    onClick={() => setSkillToDelete(skill.name)}
                  >
                    <Icons.trash className="h-3.5 w-3.5" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium text-violet-900 dark:text-white">{skill.name}</h3>
                  <Badge
                    variant="outline"
                    className="bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                  >
                    {skill.proficiency}
                  </Badge>
                </div>

                <div className="mb-2">
                  <Progress
                    value={getProficiencyValue(skill.proficiency)}
                    className="h-2 bg-violet-100 dark:bg-violet-900/30"
                  />
                </div>

                <div className="flex items-center text-sm text-violet-700 dark:text-violet-300">
                  <Icons.users className="mr-1 h-4 w-4" />
                  <span>{skill.endorsements} endorsements</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!viewAll && skills.length > 6 && (
          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              onClick={onViewAllClick}
            >
              View all {skills.length} skills
            </Button>
          </div>
        )}

        {/* Edit Skill Dialog */}
        <Dialog open={isEditingSkill !== null} onOpenChange={(open) => !open && setIsEditingSkill(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Skill</DialogTitle>
            </DialogHeader>
            {editedSkill && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="editSkillName">Skill Name</Label>
                  <Input
                    id="editSkillName"
                    value={editedSkill.name}
                    onChange={(e) => setEditedSkill({ ...editedSkill, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editProficiency">Proficiency Level</Label>
                  <Select
                    value={editedSkill.proficiency}
                    onValueChange={(value) => setEditedSkill({ ...editedSkill, proficiency: value })}
                  >
                    <SelectTrigger id="editProficiency">
                      <SelectValue placeholder="Select proficiency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleEditSkill}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={skillToDelete !== null} onOpenChange={(open) => !open && setSkillToDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Skill</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete this skill? This action cannot be undone.</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSkillToDelete(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => skillToDelete && handleDeleteSkill(skillToDelete)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

