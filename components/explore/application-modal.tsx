"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  job: any
  userData: any
  onSubmit: (formData: any) => void
}

export function ApplicationModal({ isOpen, onClose, job, userData, onSubmit }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: userData.fullName || "",
    email: userData.email || "",
    phone: userData.phone || "",
    resume: userData.resume || "",
    coverLetter: "",
    portfolio: userData.portfolio || "",
    useProfileInfo: true,
  })

  if (!job) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      // Auto-fill with user data
      setFormData({
        ...formData,
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        resume: userData.resume || "",
        portfolio: userData.portfolio || "",
        useProfileInfo: true,
      })
    } else {
      // Clear the form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        resume: "",
        coverLetter: formData.coverLetter, // Keep the cover letter
        portfolio: "",
        useProfileInfo: false,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-violet-900 dark:text-white">
            Apply for {job.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-violet-50 p-4 dark:bg-violet-900/10">
            <div className="flex items-center gap-2">
              <Icons.user className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-medium text-violet-800 dark:text-violet-200">
                Use my profile information
              </span>
            </div>
            <Switch checked={formData.useProfileInfo} onCheckedChange={handleSwitchChange} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
              <Input
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <div className="flex items-center gap-2">
              <Input
                id="resume"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                placeholder="Upload or provide a link to your resume"
                required
                className="border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
              />
              <Button
                type="button"
                variant="outline"
                className="border-violet-200 bg-white/80 text-violet-800 hover:bg-white hover:text-violet-900 dark:border-violet-800/30 dark:bg-zinc-900/80 dark:text-violet-300 dark:hover:bg-zinc-800/80 dark:hover:text-violet-200"
              >
                <Icons.upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Explain why you're a good fit for this position..."
              className="min-h-[150px] border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
            />
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
                  <Icons.send className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

