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

interface StartupIdeaModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
}

export function StartupIdeaModal({ isOpen, onClose, onSubmit }: StartupIdeaModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    problem: "",
    solution: "",
    targetAudience: "",
    marketPotential: "",
    stage: "idea",
    skillsNeeded: [],
    helpNeeded: "",
    fundingNeeded: "",
  })
  const [skillInput, setSkillInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSkill = (skill: string) => {
    if (!formData.skillsNeeded.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skillsNeeded: [...prev.skillsNeeded, skill],
      }))
    }
    setSkillInput("")
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.filter((s) => s !== skill),
    }))
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
        title: "",
        description: "",
        problem: "",
        solution: "",
        targetAudience: "",
        marketPotential: "",
        stage: "idea",
        skillsNeeded: [],
        helpNeeded: "",
        fundingNeeded: "",
      })

      toast({
        title: "Success!",
        description: "Your startup idea has been submitted.",
      })
    }, 1500)
  }

  // Filter skills based on input
  const filteredSkills = availableSkills
    .filter((skill) => skill.toLowerCase().includes(skillInput.toLowerCase()) && !formData.skillsNeeded.includes(skill))
    .slice(0, 5)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-violet-900 dark:text-white">
            Submit Your Startup Idea
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Idea Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your startup idea a catchy name"
              required
              className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Brief Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a short overview of your startup idea"
              required
              className="min-h-[100px] border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="problem">Problem Statement</Label>
              <Textarea
                id="problem"
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                placeholder="What problem does your idea solve?"
                required
                className="min-h-[100px] border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">Proposed Solution</Label>
              <Textarea
                id="solution"
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                placeholder="How does your idea solve this problem?"
                required
                className="min-h-[100px] border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="Who will use your product/service?"
                required
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketPotential">Market Potential</Label>
              <Input
                id="marketPotential"
                name="marketPotential"
                value={formData.marketPotential}
                onChange={handleChange}
                placeholder="Estimated market size or potential"
                required
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Current Stage</Label>
            <Select value={formData.stage} onValueChange={(value) => handleSelectChange("stage", value)}>
              <SelectTrigger
                id="stage"
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              >
                <SelectValue placeholder="Select the current stage of your idea" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">Just an Idea</SelectItem>
                <SelectItem value="concept">Concept Development</SelectItem>
                <SelectItem value="prototype">Early Prototype</SelectItem>
                <SelectItem value="mvp">Minimum Viable Product</SelectItem>
                <SelectItem value="launched">Already Launched</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Skills Needed</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skillsNeeded.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="flex items-center gap-1 bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 rounded-full hover:text-red-500"
                  >
                    <Icons.x className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="relative">
              <Input
                placeholder="Search for skills needed for your startup..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
              {skillInput && filteredSkills.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-violet-100 bg-white shadow-lg dark:border-violet-800/30 dark:bg-zinc-900">
                  <ul className="max-h-60 overflow-auto py-1">
                    {filteredSkills.map((skill) => (
                      <li
                        key={skill}
                        className="cursor-pointer px-4 py-2 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                        onClick={() => handleAddSkill(skill)}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="helpNeeded">Help Needed</Label>
              <Textarea
                id="helpNeeded"
                name="helpNeeded"
                value={formData.helpNeeded}
                onChange={handleChange}
                placeholder="What kind of help are you looking for? (e.g., co-founders, mentorship, technical expertise)"
                className="min-h-[100px] border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fundingNeeded">Funding Needed (Optional)</Label>
              <Textarea
                id="fundingNeeded"
                name="fundingNeeded"
                value={formData.fundingNeeded}
                onChange={handleChange}
                placeholder="Describe your funding requirements, if any"
                className="min-h-[100px] border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>
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
                  <Icons.lightbulb className="mr-2 h-4 w-4" />
                  Submit Startup Idea
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

