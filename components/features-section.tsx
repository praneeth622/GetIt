"use client"

import { motion } from "framer-motion"
import { Icons } from "@/components/icons"

export function FeaturesSection() {
  const features = [
    {
      icon: <Icons.users className="h-10 w-10" />,
      title: "Skill Showcase",
      description:
        "Create a professional profile highlighting your skills, experience, and portfolio to stand out to potential clients.",
    },
    {
      icon: <Icons.briefcase className="h-10 w-10" />,
      title: "Find Paid Gigs",
      description:
        "Browse and apply to paid opportunities from startups and peers that match your skills and interests.",
    },
    {
      icon: <Icons.lightbulb className="h-10 w-10" />,
      title: "AI-Powered Matching",
      description:
        "Our intelligent algorithm suggests the most relevant opportunities based on your skills and preferences.",
    },
    {
      icon: <Icons.dollar className="h-10 w-10" />,
      title: "Secure Payments",
      description:
        "Get paid safely and on time with our secure payment system designed specifically for student freelancers.",
    },
    {
      icon: <Icons.star className="h-10 w-10" />,
      title: "Build Your Reputation",
      description: "Earn reviews and ratings to build a strong professional reputation while still in college.",
    },
    {
      icon: <Icons.compass className="h-10 w-10" />,
      title: "Career Guidance",
      description: "Receive personalized recommendations for skill development and career advancement opportunities.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything You Need to Succeed</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            GetIT provides all the tools and resources you need to showcase your talents, find opportunities, and
            build your professional career.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

