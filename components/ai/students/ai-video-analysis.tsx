"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Video, Upload, Camera, Play, CheckCircle2, Clock, AlertTriangle, ThumbsUp, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"

interface UserData {
  name: string
  skills: any[]
  projects: any[]
  education: any[]
  experience: any[]
}

interface AiVideoAnalysisProps {
  studentId: string
  userData: UserData
}

export function AiVideoAnalysis({ studentId, userData }: AiVideoAnalysisProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [videoUploaded, setVideoUploaded] = useState(false)
  const [videoAnalyzed, setVideoAnalyzed] = useState(false)
  const [recordingMode, setRecordingMode] = useState(false)

  const handleStartRecording = () => {
    setRecordingMode(true)
    setIsRecording(true)
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false)
      setVideoUploaded(true)
    }, 3000)
  }

  const handleUploadVideo = () => {
    setIsUploading(true)
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      setVideoUploaded(true)
    }, 1500)
  }

  const handleAnalyzeVideo = () => {
    // Simulate analysis delay
    setTimeout(() => {
      setVideoAnalyzed(true)
    }, 2000)
  }

  // Mock analysis data
  const videoAnalysis = {
    overallScore: 78,
    categories: [
      {
        name: "Body Language",
        score: 72,
        feedback: "Good posture, but try to maintain more consistent eye contact with the camera",
      },
      { name: "Speech Clarity", score: 85, feedback: "Clear articulation, but occasionally speaking too quickly" },
      { name: "Content Quality", score: 80, feedback: "Well-structured answers with good examples" },
      { name: "Confidence", score: 68, feedback: "Some nervous gestures and filler words detected" },
      { name: "Technical Accuracy", score: 84, feedback: "Strong technical explanations with appropriate terminology" },
    ],
    strengths: [
      "Clear explanation of technical concepts",
      "Good structure in your responses",
      "Professional appearance",
      "Engaging tone of voice",
    ],
    improvements: [
      "Reduce filler words like 'um' and 'uh'",
      "Maintain more consistent eye contact with the camera",
      "Slow down slightly when explaining complex concepts",
      "Use more hand gestures to emphasize key points",
    ],
    tips: [
      "Practice the STAR method (Situation, Task, Action, Result) for behavioral questions",
      "Prepare 2-3 concrete examples for common questions about your experience",
      "Research the company thoroughly before the interview",
      "Prepare thoughtful questions to ask the interviewer",
    ],
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-300">Interview Video Analysis</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Record or upload a practice interview video and get AI-powered feedback on your performance.
        </p>
      </div>

      <Card className="border-violet-100 dark:border-violet-800/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-violet-500" />
            Interview Practice Video
          </CardTitle>
          <CardDescription>
            Record yourself answering interview questions or upload a video for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!videoUploaded ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-violet-200 bg-violet-50/50 p-12 text-center dark:border-violet-800/30 dark:bg-violet-900/10">
              <Video className="mb-4 h-12 w-12 text-violet-400" />
              <h3 className="mb-2 text-lg font-medium text-violet-900 dark:text-violet-300">
                Record or upload your interview practice
              </h3>
              <p className="mb-4 max-w-md text-zinc-600 dark:text-zinc-400">
                Record yourself answering common interview questions or upload an existing video for AI analysis and
                feedback.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button variant="default" onClick={handleStartRecording} disabled={isRecording}>
                  <Camera className="mr-2 h-4 w-4" />
                  {isRecording ? "Recording..." : "Record Video"}
                </Button>
                <Button
                  variant="outline"
                  className="relative overflow-hidden"
                  disabled={isUploading}
                  onClick={handleUploadVideo}
                >
                  <Input
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleUploadVideo}
                  />
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? "Uploading..." : "Upload Video"}
                </Button>
              </div>
            </div>
          ) : !videoAnalyzed ? (
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-black">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="mx-auto h-12 w-12" />
                    <p className="mt-2">Your interview practice video</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">
                      {recordingMode ? "Recording complete" : "Video uploaded successfully"}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      {recordingMode ? "2:15 minutes" : "interview_practice.mp4"}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-green-700 dark:text-green-400">
                  {recordingMode ? "Record Again" : "Change"}
                </Button>
              </div>

              <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-violet-500" />
                  <p className="text-violet-700 dark:text-violet-400">
                    Ready to analyze your interview practice video and provide personalized feedback.
                  </p>
                </div>
              </div>

              <Button className="w-full" onClick={handleAnalyzeVideo}>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze with AI
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-900 dark:bg-violet-900 dark:text-white">
                    {videoAnalysis.overallScore}
                  </div>
                  <div>
                    <p className="font-medium text-violet-900 dark:text-violet-300">Overall Score</p>
                    <p className="text-sm text-violet-600 dark:text-violet-400">
                      Based on body language, speech clarity, and content
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Full Report
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-violet-900 dark:text-violet-300">Performance by Category</h4>
                {videoAnalysis.categories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <Badge
                        variant="outline"
                        className={`${
                          category.score >= 80
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : category.score >= 70
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                      >
                        {category.score}/100
                      </Badge>
                    </div>
                    <Progress
                      value={category.score}
                      className="h-2"
                      indicatorClassName={
                        category.score >= 80 ? "bg-green-500" : category.score >= 70 ? "bg-amber-500" : "bg-red-500"
                      }
                    />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{category.feedback}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
                  <h4 className="mb-3 flex items-center gap-2 font-medium text-green-800 dark:text-green-300">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                    Your Strengths
                  </h4>
                  <ul className="ml-5 list-disc space-y-1 text-green-700 dark:text-green-400">
                    {videoAnalysis.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
                  <h4 className="mb-3 flex items-center gap-2 font-medium text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    Areas for Improvement
                  </h4>
                  <ul className="ml-5 list-disc space-y-1 text-amber-700 dark:text-amber-400">
                    {videoAnalysis.improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-800/30 dark:bg-violet-900/20">
                <h4 className="mb-3 flex items-center gap-2 font-medium text-violet-900 dark:text-violet-300">
                  <Sparkles className="h-4 w-4 text-violet-600" />
                  Interview Success Tips
                </h4>
                <ul className="ml-5 list-disc space-y-1 text-violet-700 dark:text-violet-400">
                  {videoAnalysis.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" disabled={!videoAnalyzed}>
            Download Analysis
          </Button>
          <Button disabled={!videoAnalyzed}>Practice Again</Button>
        </CardFooter>
      </Card>

      {videoAnalyzed && (
        <div className="mt-6">
          <Card className="border-violet-100 dark:border-violet-800/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                AI Coaching Recommendations
              </CardTitle>
              <CardDescription>Personalized coaching based on your interview performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
                  <h4 className="mb-2 font-medium text-violet-900 dark:text-violet-300">
                    Recommended Practice Exercises
                  </h4>
                  <ul className="ml-5 list-disc space-y-2 text-violet-700 dark:text-violet-400">
                    <li>
                      <strong>Eye Contact Exercise:</strong> Practice answering questions while maintaining eye contact
                      with the camera for 80% of the time.
                    </li>
                    <li>
                      <strong>Filler Word Reduction:</strong> Record yourself explaining a project and count your filler
                      words. Aim to reduce them by 50% in your next recording.
                    </li>
                    <li>
                      <strong>STAR Method Practice:</strong> Prepare 5 stories from your experience using the STAR
                      method and practice delivering them concisely.
                    </li>
                    <li>
                      <strong>Pacing Exercise:</strong> Practice explaining a complex technical concept at a measured
                      pace, using pauses effectively.
                    </li>
                  </ul>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-violet-200 p-4 dark:border-violet-800/30">
                    <h4 className="mb-2 font-medium text-violet-900 dark:text-violet-300">Recommended Resources</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Video className="mt-0.5 h-4 w-4 text-violet-500" />
                        <span className="text-zinc-700 dark:text-zinc-300">
                          "Body Language Mastery for Technical Interviews" video course
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Video className="mt-0.5 h-4 w-4 text-violet-500" />
                        <span className="text-zinc-700 dark:text-zinc-300">"Eliminating Filler Words" workshop</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-violet-200 p-4 dark:border-violet-800/30">
                    <h4 className="mb-2 font-medium text-violet-900 dark:text-violet-300">Next Steps</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-violet-500" />
                        <span className="text-zinc-700 dark:text-zinc-300">
                          Schedule a follow-up practice session in 1 week
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-violet-500" />
                        <span className="text-zinc-700 dark:text-zinc-300">
                          Try a different interview scenario for broader practice
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule Follow-up Practice</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

