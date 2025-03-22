"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { availableSkills } from "./mock-data"

interface ExploreFiltersProps {
  filters: any
  onFilterChange: (filters: any) => void
}

export function ExploreFilters({ filters, onFilterChange }: ExploreFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || "")
  const [jobType, setJobType] = useState<string[]>(filters.jobType || [])
  const [location, setLocation] = useState<string[]>(filters.location || [])
  const [remote, setRemote] = useState<string[]>(filters.remote || [])
  const [experience, setExperience] = useState<string[]>(filters.experience || [])
  const [skills, setSkills] = useState<string[]>(filters.skills || [])
  const [skillInput, setSkillInput] = useState("")

  // Filter options
  const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"]
  const locationOptions = ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Remote"]
  const remoteOptions = ["Remote", "Hybrid", "On-site"]
  const experienceOptions = ["Entry Level", "1-3 years", "3-5 years", "5+ years"]

  // Update parent component when filters change
  useEffect(() => {
    const newFilters = {
      searchQuery,
      jobType,
      location,
      remote,
      experience,
      skills,
    }

    // Only call onFilterChange if the filters have actually changed
    const filtersChanged = JSON.stringify(newFilters) !== JSON.stringify(filters)
    if (filtersChanged) {
      onFilterChange(newFilters)
    }
  }, [searchQuery, jobType, location, remote, experience, skills, filters, onFilterChange])

  // Handle checkbox changes
  const handleJobTypeChange = (value: string, checked: boolean) => {
    if (checked) {
      setJobType((prev) => [...prev, value])
    } else {
      setJobType((prev) => prev.filter((item) => item !== value))
    }
  }

  const handleLocationChange = (value: string, checked: boolean) => {
    if (checked) {
      setLocation((prev) => [...prev, value])
    } else {
      setLocation((prev) => prev.filter((item) => item !== value))
    }
  }

  const handleRemoteChange = (value: string, checked: boolean) => {
    if (checked) {
      setRemote((prev) => [...prev, value])
    } else {
      setRemote((prev) => prev.filter((item) => item !== value))
    }
  }

  const handleExperienceChange = (value: string, checked: boolean) => {
    if (checked) {
      setExperience((prev) => [...prev, value])
    } else {
      setExperience((prev) => prev.filter((item) => item !== value))
    }
  }

  // Handle skill selection
  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills((prev) => [...prev, skill])
    }
    setSkillInput("")
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("")
    setJobType([])
    setLocation([])
    setRemote([])
    setExperience([])
    setSkills([])
  }

  // Filter skills based on input
  const filteredSkills = availableSkills
    .filter((skill) => skill.toLowerCase().includes(skillInput.toLowerCase()) && !skills.includes(skill))
    .slice(0, 5)

  return (
    <div className="rounded-lg border border-violet-100 bg-white p-4 shadow-sm dark:border-violet-800/30 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-violet-900 dark:text-white">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="h-8 px-2 text-xs text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          Clear All
        </Button>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <div className="relative">
            <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500 dark:text-violet-400" />
            <Input
              id="search"
              placeholder="Search jobs, skills, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-violet-200 focus:border-violet-500 focus:ring-violet-500 dark:border-violet-800/30 dark:focus:border-violet-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-500 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                <Icons.x className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["skills"]}>
          <AccordionItem value="skills">
            <AccordionTrigger className="text-sm font-medium text-violet-900 dark:text-white">Skills</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    placeholder="Search skills..."
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

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill) => (
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
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="jobType">
            <AccordionTrigger className="text-sm font-medium text-violet-900 dark:text-white">
              Job Type
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {jobTypeOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`job-type-${option}`}
                      checked={jobType.includes(option)}
                      onCheckedChange={(checked) => handleJobTypeChange(option, checked as boolean)}
                    />
                    <Label htmlFor={`job-type-${option}`} className="text-sm font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="location">
            <AccordionTrigger className="text-sm font-medium text-violet-900 dark:text-white">
              Location
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {locationOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${option}`}
                      checked={location.includes(option)}
                      onCheckedChange={(checked) => handleLocationChange(option, checked as boolean)}
                    />
                    <Label htmlFor={`location-${option}`} className="text-sm font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="remote">
            <AccordionTrigger className="text-sm font-medium text-violet-900 dark:text-white">
              Remote Options
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {remoteOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`remote-${option}`}
                      checked={remote.includes(option)}
                      onCheckedChange={(checked) => handleRemoteChange(option, checked as boolean)}
                    />
                    <Label htmlFor={`remote-${option}`} className="text-sm font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="experience">
            <AccordionTrigger className="text-sm font-medium text-violet-900 dark:text-white">
              Experience Level
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {experienceOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`experience-${option}`}
                      checked={experience.includes(option)}
                      onCheckedChange={(checked) => handleExperienceChange(option, checked as boolean)}
                    />
                    <Label htmlFor={`experience-${option}`} className="text-sm font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

