"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Smartphone, Code, LineChart, Figma, Layers, Lightbulb, Users } from "lucide-react"

const skills = [
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI Design",
    description: "Creating beautiful, intuitive interfaces with attention to detail and visual hierarchy.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "UX Design",
    description: "Designing user-centered experiences based on research and usability principles.",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Design",
    description: "Specialized in creating responsive and native mobile application interfaces.",
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Frontend Development",
    description: "Translating designs into code with HTML, CSS, JavaScript, and React.",
  },
  {
    icon: <Figma className="h-8 w-8" />,
    title: "Design Tools",
    description: "Expert in Figma, Sketch, Adobe XD, and other industry-standard design tools.",
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Analytics",
    description: "Using data to inform design decisions and improve user experiences.",
  },
  {
    icon: <Layers className="h-8 w-8" />,
    title: "Design Systems",
    description: "Building scalable design systems and component libraries for consistent experiences.",
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Prototyping",
    description: "Creating interactive prototypes to test and validate design concepts.",
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <div ref={ref} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.title}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{skill.icon}</div>
              <h3 className="text-xl font-bold">{skill.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{skill.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

