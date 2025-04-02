"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import Script from "next/script";

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaInitialized, setVantaInitialized] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Initialize Vanta effect after scripts are loaded
  useEffect(() => {
    if (!mounted || !window.VANTA || vantaInitialized || !vantaRef.current) return;

    // Initialize Vanta effect
    const vantaEffect = window.VANTA.HALO({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      baseColor: resolvedTheme === "dark" ? 0x000000 : 0xffffff,
      backgroundColor: resolvedTheme === "dark" ? 0x0f1729 : 0xf8fafc,
      amplitudeFactor: 1.5,
      size: 1.5,
    });

    setVantaInitialized(true);

    // Cleanup function
    return () => {
      if (vantaEffect) vantaEffect.destroy();
      setVantaInitialized(false);
    };
  }, [resolvedTheme, mounted, vantaInitialized]);

  // Handle theme changes
  useEffect(() => {
    if (vantaInitialized && window.VANTA) {
      // Destroy and reinitialize with new theme colors
      if (vantaRef.current) {
        window.VANTA.HALO({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          baseColor: resolvedTheme === "dark" ? 0x000000 : 0xffffff,
          backgroundColor: resolvedTheme === "dark" ? 0x0f1729 : 0xf8fafc,
          amplitudeFactor: 1.5,
          size: 1.5,
        });
      }
    }
  }, [resolvedTheme, vantaInitialized]);

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Load Three.js and Vanta.js from CDN */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" onLoad={() => console.log("Three.js loaded")} />
      <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js" onLoad={() => console.log("Vanta.js loaded")} />

      <div ref={vantaRef} className="absolute inset-0 -z-10" aria-hidden="true" />
    </>
  );
}
