"use client"

import { motion } from "framer-motion"
import { Icons } from "@/components/icons"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Icons.user className="h-10 w-10" />,
      title: "Create Your Profile",
      description: "Sign up and build your professional profile showcasing your skills, education, and portfolio.",
    },
    {
      icon: <Icons.compass className="h-10 w-10" />,
      title: "Discover Opportunities",
      description: "Browse through available gigs or receive AI-matched opportunities based on your skills.",
    },
    {
      icon: <Icons.message className="h-10 w-10" />,
      title: "Connect & Collaborate",
      description: "Apply to projects, communicate with clients, and agree on project details and payment terms.",
    },
    {
      icon: <Icons.code className="h-10 w-10" />,
      title: "Complete the Work",
      description: "Deliver high-quality work on time and build your professional reputation with positive reviews.",
    },
    {
      icon: <Icons.dollar className="h-10 w-10" />,
      title: "Get Paid",
      description: "Receive secure payments for your completed work directly to your preferred payment method.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How GetIT Works</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Getting started is easy. Follow these simple steps to begin your freelancing journey while still in college.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border hidden md:block"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative mb-12 md:mb-24 last:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
              >
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 hidden md:block"></div>
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      {step.icon}
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground hidden md:block">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

