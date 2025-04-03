import { useEffect } from "react";
import gsap from "gsap";

const AnimatedBackground = () => {
  useEffect(() => {
    const backgroundElement = document.body;
    gsap.to(backgroundElement, {
      backgroundColor: "linear-gradient(45deg, #ff6b6b, #f5a623, #f9e44f, #6bff6b, #6b6bff)",
      duration: 5,
      repeat: -1, // Repeat indefinitely
      yoyo: true, // Reverse the animation on each repeat
    });
  }, []);

  return null;
};

export default AnimatedBackground;
