"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Dynamically import Vanta.js
    const loadVanta = async () => {
      // We need to dynamically import vanta as it's a client-side only library
      const VANTA = (await import("vanta/dist/vanta.halo.min")).default;
      setVantaEffect(VANTA);
    };

    loadVanta();

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted || !vantaEffect || !vantaRef.current) return;

    // Destroy previous effect if it exists
    if (vantaEffectRef.current) {
      vantaEffectRef.current.destroy();
    }

    // Initialize Vanta effect
    vantaEffectRef.current = vantaEffect({
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
  }, [vantaEffect, resolvedTheme, mounted]);

  return <div ref={vantaRef} className="absolute inset-0 -z-10" aria-hidden="true" />;
}
