"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface ProjectListProps {
  projects: any[]
  onProjectClick: (project: any) => void
  userSkills: string[]
}

export function ProjectList({ projects, onProjectClick, userSkills }: ProjectListProps) {
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({})

  const toggleDescription = (projectId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }))
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-violet-200 bg-violet-50/50 p-8 text-center dark:border-violet-800/30 dark:bg-violet-900/10">
        <Icons.search className="mb-2 h-10 w-10 text-violet-400 dark:text-violet-500" />
        <h3 className="mb-1 text-lg font-medium text-violet-900 dark:text-white">No projects found</h3>
        <p className="mb-4 text-sm text-violet-700 dark:text-violet-300">
          Try adjusting your filters or search criteria
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => {
        const isStartupIdea = project.isStartupIdea
        const isRecommended = project.skills.some((skill: string) => userSkills.includes(skill))
        const description = expandedDescriptions[project.id]
          ? project.description
          : project.description.length > 150
            ? `${project.description.substring(0, 150)}...`
            : project.description

        return (
          <Card
            key={project.id}
            className={`group relative overflow-hidden border-violet-100 transition-all hover:shadow-md dark:border-violet-800/30 ${
              isStartupIdea
                ? "bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-zinc-900"
                : "bg-white dark:bg-zinc-900/80"
            }`}
          >
            {isRecommended && (
              <div className="absolute right-0 top-0 z-10 rounded-bl-lg bg-gradient-to-r from-violet-600 to-amber-600 px-3 py-1 text-xs font-medium text-white">
                Recommended
              </div>
            )}

            {isStartupIdea && (
              <div className="absolute left-0 top-0 z-10 rounded-br-lg bg-amber-600 px-3 py-1 text-xs font-medium text-white">
                Startup Idea
              </div>
            )}

            <CardHeader className={`pb-2 ${isStartupIdea ? "pt-10" : ""}`}>
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-violet-900 dark:text-white">{project.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {isStartupIdea ? (
                      <span className="font-medium text-amber-700 dark:text-amber-400">
                        {project.company} • Stage: {project.duration}
                      </span>
                    ) : (
                      <span>
                        {project.company} • {project.type} • {project.duration}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="text-sm text-violet-500 dark:text-violet-400">
                  {new Date(project.postedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-violet-800 dark:text-violet-200">{description}</p>
              {project.description.length > 150 && (
                <Button
                  variant="link"
                  onClick={() => toggleDescription(project.id)}
                  className="mb-3 h-auto p-0 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  {expandedDescriptions[project.id] ? "Show less" : "Read more"}
                </Button>
              )}

              <div className="mb-4 flex flex-wrap gap-2">
                {project.skills.map((skill: string) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className={`${
                      userSkills.includes(skill)
                        ? "border-violet-300 bg-violet-100 text-violet-800 dark:border-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                        : "border-gray-200 bg-gray-100 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {skill}
                    {userSkills.includes(skill) && (
                      <Icons.check className="ml-1 h-3 w-3 text-green-600 dark:text-green-400" />
                    )}
                  </Badge>
                ))}
              </div>

              <Button
                onClick={() => onProjectClick(project)}
                className={`w-full ${
                  isStartupIdea
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800"
                    : "bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
                }`}
              >
                {isStartupIdea ? (
                  <>
                    <Icons.lightbulb className="mr-2 h-4 w-4" />
                    View Startup Details
                  </>
                ) : (
                  <>
                    <Icons.briefcase className="mr-2 h-4 w-4" />
                    View Project Details
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

