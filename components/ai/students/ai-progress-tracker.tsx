"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Code, Briefcase, Zap, UserCheck } from "lucide-react"

interface AiProgressTrackerProps {
  studentId: string
}

export function AiProgressTracker({ studentId }: AiProgressTrackerProps) {
  // In a real app, this would be fetched from an API
  const [skills] = useState([
    { name: "Technical Skills", progress: 75, icon: <Code className="h-5 w-5 text-blue-500" /> },
    { name: "Soft Skills", progress: 60, icon: <UserCheck className="h-5 w-5 text-green-500" /> },
    { name: "Industry Knowledge", progress: 45, icon: <Briefcase className="h-5 w-5 text-amber-500" /> },
    { name: "Problem Solving", progress: 80, icon: <Brain className="h-5 w-5 text-violet-500" /> },
    { name: "Learning Speed", progress: 65, icon: <Zap className="h-5 w-5 text-rose-500" /> },
  ])

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-violet-900 dark:text-violet-300">Your Growth Progress</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Track your skill development and professional growth over time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <Card key={index} className="border-violet-100 dark:border-violet-800/30">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">{skill.name}</CardTitle>
                {skill.icon}
              </div>
              <CardDescription>
                {skill.progress < 50 ? "Developing" : skill.progress < 75 ? "Proficient" : "Advanced"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Progress value={skill.progress} className="h-2" />
                <span className="text-sm font-medium">{skill.progress}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

