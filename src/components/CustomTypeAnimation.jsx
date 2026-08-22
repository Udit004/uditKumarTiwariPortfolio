"use client"
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const texts = [
  "Full Stack Developer",
  "Frontend Specialist",
  "AI Application Developer",
  "Backend Developer"
];

export default function CustomTypeAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    
    // Create a GSAP timeline for the smooth left-to-right reveal effect
    const tl = gsap.timeline({
      onComplete: () => {
        // Cycle to the next text when the animation completes
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    });

    // Reset styles initially to be hidden on the left edge
    gsap.set(el, { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" });

    // Animate reveal left to right
    tl.to(el, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 1.2,
      ease: "power3.inOut",
    })
    // Hold the text for a bit so the user can read it
    .to(el, { duration: 1.8 })
    // Animate hide left to right (slide off to the right edge)
    .to(el, {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      duration: 0.8,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill(); // Cleanup GSAP timeline on unmount or before next effect
    };
  }, [currentIndex]);

  return (
    <div className="h-[40px] sm:h-[48px] md:h-[56px] flex items-center mb-6">
      <div 
        ref={containerRef}
        className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 whitespace-nowrap"
        style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
      >
        {texts[currentIndex]}
      </div>
    </div>
  );
}