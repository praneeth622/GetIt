"use client"

import { Button } from "@/components/ui/button"

import { motion } from "framer-motion"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Achievement {
  name: string
  description: string
  icon: string
}

interface ProfileAchievementsProps {
  achievements: Achievement[]
  showAll?: boolean
}

export function ProfileAchievements({ achievements, showAll = false }: ProfileAchievementsProps) {
  const displayedAchievements = showAll ? achievements : achievements.slice(0, 3)

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "award":
        return <Icons.award className="h-6 w-6" />
      case "trophy":
        return <Icons.trophy className="h-6 w-6" />
      case "users":
        return <Icons.users className="h-6 w-6" />
      default:
        return <Icons.award className="h-6 w-6" />
    }
  }

  return (
    <Card className="overflow-hidden border-violet-100 shadow-md dark:border-violet-800/30">
      <CardHeader className="bg-gradient-to-r from-violet-100/50 to-violet-50/50 dark:from-violet-900/20 dark:to-violet-800/20">
        <div className="flex items-center gap-2">
          <Icons.award className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          <CardTitle>Achievements</CardTitle>
        </div>
        <CardDescription>Badges and recognition earned on the platform</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {achievements.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-violet-200 bg-violet-50/50 p-8 text-center dark:border-violet-800/30 dark:bg-violet-900/10">
            <Icons.award className="mb-2 h-10 w-10 text-violet-400 dark:text-violet-500" />
            <h3 className="mb-1 text-lg font-medium text-violet-900 dark:text-white">No achievements yet</h3>
            <p className="text-sm text-violet-700 dark:text-violet-300">
              Complete projects and engage with the community to earn badges
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col items-center rounded-lg border border-violet-100 bg-white p-4 text-center shadow-sm transition-all hover:shadow-md dark:border-violet-800/30 dark:bg-zinc-900/80"
              >
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-amber-500 p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-violet-600 dark:bg-zinc-900 dark:text-violet-400">
                    {getIcon(achievement.icon)}
                  </div>
                </div>
                <h3 className="mb-1 font-medium text-violet-900 dark:text-white">{achievement.name}</h3>
                <p className="text-xs text-violet-700 dark:text-violet-300">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        )}

        {!showAll && achievements.length > 3 && (
          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              View all achievements
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

