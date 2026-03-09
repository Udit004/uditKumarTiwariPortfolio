"use client"
import { useEffect, useRef, useState } from "react";

const texts = [
  "Full Stack Developer",
  "Frontend Specialist",
  "AI Application Developer",
  "Backend Developer"
];

export default function CustomTypeAnimation() {
  const [text, setText] = useState("");
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    let timeout;

    const type = () => {
      const current = texts[indexRef.current];

      if (!deletingRef.current) {
        charRef.current++;
        setText(current.slice(0, charRef.current));

        if (charRef.current === current.length) {
          deletingRef.current = true;
          timeout = setTimeout(type, 1500);
          return;
        }
      } else {
        charRef.current--;
        setText(current.slice(0, charRef.current));

        if (charRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % texts.length;
        }
      }

      timeout = setTimeout(type, deletingRef.current ? 60 : 100);
    };

    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-6">
      {text}
      <span className="animate-pulse text-purple-400">|</span>
    </div>
  );
}