"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface JobDetailModalProps {
  isOpen: boolean
  onClose: () => void
  job: any
  onApply: () => void
}

export function JobDetailModal({ isOpen, onClose, job, onApply }: JobDetailModalProps) {
  if (!job) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-violet-900 dark:text-white">
            {job.isStartupIdea ? (
              <div className="flex items-center">
                <Icons.lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                {job.title}
              </div>
            ) : (
              job.title
            )}
          </DialogTitle>
          <DialogDescription className="text-base">
            {job.isStartupIdea ? (
              <span className="font-medium text-amber-700 dark:text-amber-400">
                {job.company} • Stage: {job.duration}
              </span>
            ) : (
              <>
                {job.company} • {job.location} • {job.type}
                {job.salary && ` • ${job.salary}`}
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-violet-900 dark:text-white">Description</h3>
            <p className="text-violet-800 dark:text-violet-200">{job.description}</p>
          </div>

          {job.isStartupIdea ? (
            <>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-violet-900 dark:text-white">Problem & Solution</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-amber-500">
                        {index === 0 ? (
                          <Icons.alertCircle className="h-4 w-4" />
                        ) : index === 1 ? (
                          <Icons.lightbulb className="h-4 w-4" />
                        ) : (
                          <Icons.check className="h-4 w-4" />
                        )}
                      </span>
                      <span className="text-violet-800 dark:text-violet-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-violet-900 dark:text-white">Support Needed</h3>
                <ul className="space-y-2">
                  {job.requirements.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-amber-500">
                        <Icons.helpCircle className="h-4 w-4" />
                      </span>
                      <span className="text-violet-800 dark:text-violet-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              {job.responsibilities && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-violet-900 dark:text-white">Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1 text-violet-500">
                          <Icons.check className="h-4 w-4" />
                        </span>
                        <span className="text-violet-800 dark:text-violet-200">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.requirements && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-violet-900 dark:text-white">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1 text-violet-500">
                          <Icons.check className="h-4 w-4" />
                        </span>
                        <span className="text-violet-800 dark:text-violet-200">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-violet-900 dark:text-white">Benefits</h3>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1 text-violet-500">
                          <Icons.star className="h-4 w-4" />
                        </span>
                        <span className="text-violet-800 dark:text-violet-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <div>
            <h3 className="mb-2 text-lg font-semibold text-violet-900 dark:text-white">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill: string) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className={`${
                    job.isStartupIdea
                      ? "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      : "border-violet-200 bg-violet-100 text-violet-800 dark:border-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                  }`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={onClose}
              variant="outline"
              className="mr-2 border-violet-200 bg-white/80 text-violet-800 hover:bg-white hover:text-violet-900 dark:border-violet-800/30 dark:bg-zinc-900/80 dark:text-violet-300 dark:hover:bg-zinc-800/80 dark:hover:text-violet-200"
            >
              Close
            </Button>
            {!job.isStartupIdea && (
              <Button
                onClick={onApply}
                className="bg-gradient-to-r from-violet-600 to-amber-600 text-white hover:from-violet-700 hover:to-amber-700"
              >
                Apply Now
              </Button>
            )}
            {job.isStartupIdea && (
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800"
              >
                <Icons.messageSquare className="mr-2 h-4 w-4" />
                Contact Founder
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

