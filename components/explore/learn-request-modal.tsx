"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { availableSkills } from "./mock-data"
import { toast } from "@/hooks/use-toast"

interface LearnRequestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
}

export function LearnRequestModal({ isOpen, onClose, onSubmit }: LearnRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    skillToLearn: "",
    currentLevel: "beginner",
    goalLevel: "intermediate",
    timeframe: "1-3 months",
    motivation: "",
    preferredLearningStyle: "",
    projectIdeas: "",
    mentorshipType: "one-on-one",
  })
  const [skillInput, setSkillInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectSkill = (skill: string) => {
    setFormData((prev) => ({ ...prev, skillToLearn: skill }))
    setSkillInput("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData)
      setIsSubmitting(false)

      // Reset form
      setFormData({
        skillToLearn: "",
        currentLevel: "beginner",
        goalLevel: "intermediate",
        timeframe: "1-3 months",
        motivation: "",
        preferredLearningStyle: "",
        projectIdeas: "",
        mentorshipType: "one-on-one",
      })

      toast({
        title: "Request Submitted",
        description: "Your learning request has been submitted successfully!",
      })
    }, 1500)
  }

  // Filter skills based on input
  const filteredSkills = availableSkills
    .filter((skill) => skill.toLowerCase().includes(skillInput.toLowerCase()))
    .slice(0, 5)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-violet-900 dark:text-white">Request to Learn</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="skillToLearn">Skill You Want to Learn</Label>
            <div className="relative">
              <Input
                id="skillToLearn"
                placeholder="Search for a skill you want to learn..."
                value={skillInput || formData.skillToLearn}
                onChange={(e) => setSkillInput(e.target.value)}
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
                required
              />
              {skillInput && filteredSkills.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-violet-100 bg-white shadow-lg dark:border-violet-800/30 dark:bg-zinc-900">
                  <ul className="max-h-60 overflow-auto py-1">
                    {filteredSkills.map((skill) => (
                      <li
                        key={skill}
                        className="cursor-pointer px-4 py-2 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                        onClick={() => handleSelectSkill(skill)}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {formData.skillToLearn && (
              <div className="mt-2">
                <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                  {formData.skillToLearn}
                </Badge>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currentLevel">Current Skill Level</Label>
              <Select
                value={formData.currentLevel}
                onValueChange={(value) => handleSelectChange("currentLevel", value)}
              >
                <SelectTrigger
                  id="currentLevel"
                  className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
                >
                  <SelectValue placeholder="Select your current level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-experience">No Experience</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalLevel">Goal Skill Level</Label>
              <Select value={formData.goalLevel} onValueChange={(value) => handleSelectChange("goalLevel", value)}>
                <SelectTrigger
                  id="goalLevel"
                  className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
                >
                  <SelectValue placeholder="Select your goal level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeframe">Learning Timeframe</Label>
            <Select value={formData.timeframe} onValueChange={(value) => handleSelectChange("timeframe", value)}>
              <SelectTrigger
                id="timeframe"
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              >
                <SelectValue placeholder="Select your timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-month">Less than a month</SelectItem>
                <SelectItem value="1-3 months">1-3 months</SelectItem>
                <SelectItem value="3-6 months">3-6 months</SelectItem>
                <SelectItem value="6-12 months">6-12 months</SelectItem>
                <SelectItem value="more-than-year">More than a year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">Motivation</Label>
            <Textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              placeholder="Why do you want to learn this skill? How will it help your career or projects?"
              required
              className="min-h-[100px] border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredLearningStyle">Preferred Learning Style</Label>
            <Textarea
              id="preferredLearningStyle"
              name="preferredLearningStyle"
              value={formData.preferredLearningStyle}
              onChange={handleChange}
              placeholder="How do you learn best? (e.g., hands-on projects, video tutorials, reading documentation)"
              className="min-h-[100px] border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectIdeas">Project Ideas (Optional)</Label>
            <Textarea
              id="projectIdeas"
              name="projectIdeas"
              value={formData.projectIdeas}
              onChange={handleChange}
              placeholder="Do you have any specific projects in mind that you'd like to build with this skill?"
              className="min-h-[100px] border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mentorshipType">Mentorship Type</Label>
            <Select
              value={formData.mentorshipType}
              onValueChange={(value) => handleSelectChange("mentorshipType", value)}
            >
              <SelectTrigger
                id="mentorshipType"
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              >
                <SelectValue placeholder="Select mentorship type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-on-one">One-on-One Mentorship</SelectItem>
                <SelectItem value="group">Group Learning</SelectItem>
                <SelectItem value="project-based">Project-Based Collaboration</SelectItem>
                <SelectItem value="code-review">Code Review & Feedback</SelectItem>
                <SelectItem value="any">Any Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-violet-200 bg-white/80 text-violet-800 hover:bg-white hover:text-violet-900 dark:border-violet-800/30 dark:bg-zinc-900/80 dark:text-violet-300 dark:hover:bg-zinc-800/80 dark:hover:text-violet-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
            >
              {isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Icons.bookOpen className="mr-2 h-4 w-4" />
                  Submit Learning Request
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

