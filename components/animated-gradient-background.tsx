"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const [mounted, setMounted] = useState(false);

  // Set up canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight * 0.9; // 90vh to match the hero section

        // Set display size (css pixels)
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        // Set actual size in memory (scaled for retina)
        const scale = window.devicePixelRatio;
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);

        // Normalize coordinate system to use css pixels
        const ctx = canvas.getContext("2d");
        ctx?.scale(scale, scale);

        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    setMounted(true);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Initialize particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const particleCount = Math.min(Math.floor((dimensions.width * dimensions.height) / 8000), 150);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    particlesRef.current = particles;
  }, [dimensions]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0 || !mounted) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.y > dimensions.height) particle.y = 0;
        if (particle.y < 0) particle.y = dimensions.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        // Use theme-appropriate colors
        if (resolvedTheme === "dark") {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        } else {
          ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
        }

        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, resolvedTheme, mounted]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 ${resolvedTheme === "dark" ? "bg-gradient-dark" : "bg-gradient-light"}`} aria-hidden="true" />

      {/* Particle overlay */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{ background: "transparent" }} aria-hidden="true" />
    </div>
  );
}
