"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20" />
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center rounded-full border border-violet-200 bg-white px-3 py-1 text-sm text-violet-800 shadow-sm dark:border-violet-800/30 dark:bg-violet-900/10 dark:text-violet-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Icons.sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Launching for Fall Semester 2025</span>
              </motion.div>
              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Showcase Your Skills, <span className="text-primary">Find Paid Gigs</span>
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-lg text-muted-foreground sm:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Connect with startups and peers who need your talents. Build your portfolio, earn money, and gain
                real-world experience while still in college.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/signup-options">
                <Button size="lg" className="h-12 px-8">
                  Get Started
                  <Icons.arrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  How It Works
                </Button>
              </Link>
            </motion.div>
            <motion.div
              className="flex flex-col gap-3 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Icons.check className="h-4 w-4 text-primary" />
                <span>No fees for students</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.check className="h-4 w-4 text-primary" />
                <span>AI-powered skill matching</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.check className="h-4 w-4 text-primary" />
                <span>Secure payments and project management</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 p-1 shadow-2xl">
              <div className="h-full w-full rounded-xl bg-white p-6 dark:bg-gray-950">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-violet-100 p-2 dark:bg-violet-900/20">
                        <Icons.code className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Web Development</h3>
                        <p className="text-xs text-muted-foreground">120+ active gigs</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icons.arrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">
                        <Icons.image className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">UI/UX Design</h3>
                        <p className="text-xs text-muted-foreground">85+ active gigs</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icons.arrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-amber-100 p-2 dark:bg-amber-900/20">
                        <Icons.fileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Content Writing</h3>
                        <p className="text-xs text-muted-foreground">64+ active gigs</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icons.arrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-green-100 p-2 dark:bg-green-900/20">
                        <Icons.dollar className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Marketing</h3>
                        <p className="text-xs text-muted-foreground">42+ active gigs</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icons.arrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-red-100 p-2 dark:bg-red-900/20">
                        <Icons.zap className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Data Analysis</h3>
                        <p className="text-xs text-muted-foreground">38+ active gigs</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icons.arrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-violet-600 p-4 text-white shadow-lg">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="text-xl font-bold">500+</span>
                <span className="text-xs">Students Hired</span>
              </div>
            </div>
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-blue-600 p-4 text-white shadow-lg">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="text-xl font-bold">200+</span>
                <span className="text-xs">Partner Companies</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

