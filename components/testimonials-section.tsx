"use client"

import { motion } from "framer-motion"
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "GetIT helped me land my first paid web development gig while still in my sophomore year. The experience I gained was invaluable for my resume.",
      name: "David Chen",
      role: "Computer Science Student",
      university: "Stanford University",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a design student, I was looking for real-world projects to build my portfolio. Through GetIT, I've worked with three startups and even secured an internship!",
      name: "Sophia Martinez",
      role: "Graphic Design Student",
      university: "Rhode Island School of Design",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The AI-powered matching on GetIT is spot-on! It connected me with projects that perfectly matched my marketing skills, and I've been able to earn while learning.",
      name: "James Wilson",
      role: "Marketing Student",
      university: "NYU Stern",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a startup founder, finding talented students for project-based work has been a game-changer. The quality of work and enthusiasm from GetIT students is impressive.",
      name: "Emily Johnson",
      role: "Startup Founder",
      university: "TechNova",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "I've been able to pay for my textbooks and expenses through freelance writing gigs on GetIT. The platform is intuitive and the payment system is reliable.",
      name: "Michael Brown",
      role: "English Literature Student",
      university: "Columbia University",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The career guidance and skill development recommendations have helped me focus on learning the right technologies that employers are actually looking for.",
      name: "Aisha Patel",
      role: "Data Science Student",
      university: "UC Berkeley",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Students Are Saying</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join thousands of students who are already building their careers and earning while studying.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Icons.star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-muted-foreground">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.university}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

