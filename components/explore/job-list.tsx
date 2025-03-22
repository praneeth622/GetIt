"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface JobListProps {
  jobs: any[]
  onJobClick: (job: any) => void
  userSkills: string[]
}

export function JobList({ jobs, onJobClick, userSkills }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-violet-200 bg-white/50 p-8 text-center dark:border-violet-800/30 dark:bg-zinc-900/50">
        <Icons.search className="h-12 w-12 text-violet-300 dark:text-violet-700" />
        <h3 className="mt-4 text-lg font-medium text-violet-900 dark:text-white">No jobs found</h3>
        <p className="mt-2 text-sm text-violet-600 dark:text-violet-400">
          Try adjusting your filters or search query to find more opportunities.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {jobs.map((job, index) => {
        // Check if job matches user skills
        const matchingSkills = job.skills.filter((skill: string) => userSkills.includes(skill))
        const isRecommended = matchingSkills.length > 0

        return (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full overflow-hidden border-violet-100 transition-all hover:border-violet-300 hover:shadow-md dark:border-violet-800/30 dark:hover:border-violet-700/50">
              {isRecommended && (
                <div className="bg-gradient-to-r from-violet-600 to-amber-600 px-4 py-1 text-center text-xs font-medium text-white">
                  Recommended for You
                </div>
              )}
              <CardContent className={`p-4 ${isRecommended ? "" : "pt-5"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-violet-900 dark:text-white">{job.title}</h3>
                    <p className="text-sm text-violet-700 dark:text-violet-300">{job.company}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                    <Icons.briefcase className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300"
                  >
                    {job.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300"
                  >
                    {job.location}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300"
                  >
                    {job.remote}
                  </Badge>
                </div>

                <div className="mt-4">
                  <p className="line-clamp-2 text-sm text-violet-600 dark:text-violet-400">{job.description}</p>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-violet-900 dark:text-white">Skills:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.skills.map((skill: string) => (
                      <Badge
                        key={skill}
                        className={`
                          ${
                            userSkills.includes(skill)
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                          }
                        `}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-violet-600 dark:text-violet-400">
                    <span className="font-medium">{job.salary}</span>
                  </div>
                  <div className="text-sm text-violet-600 dark:text-violet-400">
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-violet-100 bg-violet-50/50 p-4 dark:border-violet-800/30 dark:bg-violet-900/10">
                <Button
                  onClick={() => onJobClick(job)}
                  className="w-full bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

