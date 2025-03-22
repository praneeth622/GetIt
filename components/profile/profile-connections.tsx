"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileConnectionsProps {
  connections: {
    followers: number
    following: number
  }
  showAll?: boolean
}

export function ProfileConnections({ connections, showAll = false }: ProfileConnectionsProps) {
  // Mock data for followers/following
  const mockUsers = [
    { id: 1, name: "Sarah Chen", role: "UX Designer", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 2, name: "Michael Rodriguez", role: "Full-Stack Developer", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 3, name: "Emily Johnson", role: "Data Scientist", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 4, name: "David Kim", role: "Product Manager", avatar: "/placeholder.svg?height=50&width=50" },
    { id: 5, name: "Jessica Taylor", role: "Marketing Specialist", avatar: "/placeholder.svg?height=50&width=50" },
  ]

  const displayedUsers = showAll ? mockUsers : mockUsers.slice(0, 3)

  return (
    <Card className="overflow-hidden border-violet-100 shadow-md dark:border-violet-800/30">
      <CardHeader className="bg-gradient-to-r from-violet-100/50 to-violet-50/50 dark:from-violet-900/20 dark:to-violet-800/20">
        <div className="flex items-center gap-2">
          <Icons.users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          <CardTitle>Connections</CardTitle>
        </div>
        <CardDescription>Your network of professionals</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg border border-violet-100 bg-white p-4 shadow-sm dark:border-violet-800/30 dark:bg-zinc-900/80">
            <span className="text-2xl font-bold text-violet-900 dark:text-white">{connections.followers}</span>
            <span className="text-sm text-violet-700 dark:text-violet-300">Followers</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-violet-100 bg-white p-4 shadow-sm dark:border-violet-800/30 dark:bg-zinc-900/80">
            <span className="text-2xl font-bold text-violet-900 dark:text-white">{connections.following}</span>
            <span className="text-sm text-violet-700 dark:text-violet-300">Following</span>
          </div>
        </div>

        <h3 className="mb-4 text-sm font-medium text-violet-800 dark:text-violet-200">Recent Followers</h3>
        <div className="space-y-4">
          {displayedUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="flex items-center justify-between rounded-lg border border-violet-100 bg-white p-3 shadow-sm transition-all hover:shadow-md dark:border-violet-800/30 dark:bg-zinc-900/80"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-violet-900 dark:text-white">{user.name}</h4>
                  <p className="text-xs text-violet-700 dark:text-violet-300">{user.role}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-violet-200 bg-white/80 text-violet-800 shadow-sm backdrop-blur-sm hover:bg-white hover:text-violet-900 dark:border-violet-800/30 dark:bg-zinc-900/80 dark:text-violet-300 dark:hover:bg-zinc-800/80 dark:hover:text-violet-200"
              >
                View
              </Button>
            </motion.div>
          ))}
        </div>

        {!showAll && mockUsers.length > 3 && (
          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              View all connections
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

