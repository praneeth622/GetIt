"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

interface AiFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  studentId: string
}

export function AiFeedbackModal({ isOpen, onClose, studentId }: AiFeedbackModalProps) {
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    // In a real app, this would send the feedback to an API
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        onClose()
        setFeedback("")
        setRating(null)
        setIsSubmitted(false)
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>Help us improve our AI tools by sharing your experience</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="feedback-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 py-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-violet-900 dark:text-white">
                  How would you rate your experience?
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="rounded-md p-1 transition-colors hover:bg-violet-100 dark:hover:bg-violet-900/20"
                    >
                      <Icons.star
                        className={`h-8 w-8 ${
                          rating && star <= rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-violet-300 dark:text-violet-700"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-medium text-violet-900 dark:text-white">
                  Your feedback
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you liked or how we can improve..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feedback-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Icons.check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-violet-900 dark:text-white">Thank you for your feedback!</h3>
              <p className="mt-2 text-center text-sm text-violet-600 dark:text-violet-400">
                Your input helps us improve our AI tools for everyone.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter>
          {!isSubmitted && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!rating || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

