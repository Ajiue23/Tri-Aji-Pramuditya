"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: null, y: null })

  // Set up canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const width = window.innerWidth
        const height = window.innerHeight * 0.9 // 90vh to match the hero section

        // Set display size (css pixels)
        canvas.style.width = width + "px"
        canvas.style.height = height + "px"

        // Set actual size in memory (scaled for retina)
        const scale = window.devicePixelRatio
        canvas.width = Math.floor(width * scale)
        canvas.height = Math.floor(height * scale)

        // Normalize coordinate system to use css pixels
        const ctx = canvas.getContext("2d")
        ctx?.scale(scale, scale)

        setDimensions({ width, height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Initialize particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const particleCount = Math.min(Math.floor((dimensions.width * dimensions.height) / 10000), 100)
    const particles: Particle[] = []

    const primaryColor = resolvedTheme === "dark" ? "255, 255, 255" : "0, 0, 0"

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        color: `rgba(${primaryColor}, ${Math.random() * 0.3 + 0.2})`,
      })
    }

    particlesRef.current = particles
  }, [dimensions, resolvedTheme])

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x > dimensions.width || particle.x < 0) {
          particle.speedX *= -1
        }

        if (particle.y > dimensions.height || particle.y < 0) {
          particle.speedY *= -1
        }

        // Mouse interaction
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const angle = Math.atan2(dy, dx)
            const force = (100 - distance) / 1000

            particle.speedX -= Math.cos(angle) * force
            particle.speedY -= Math.sin(angle) * force
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return

          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)

            const primaryColor = resolvedTheme === "dark" ? "255, 255, 255" : "0, 0, 0"
            const opacity = 1 - distance / 150
            ctx.strokeStyle = `rgba(${primaryColor}, ${opacity * 0.15})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      style={{
        background: "transparent",
      }}
    />
  )
}

