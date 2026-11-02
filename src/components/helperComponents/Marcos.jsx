"use client";

import React, { useState, useEffect, useRef, useCallback, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact, setWasmUrl } from "@lottiefiles/dotlottie-react";

// Animations mapping - Includes all newly added animations, strictly omitting Point Right (11_MASCOT_POINT_RIGHT)
export const MARCOS_ANIMATIONS = {
  idle: {
    src: "/marcos_Anim/01_MASCOT_IDLE_LOOP.lottie",
    loop: true,
  },
  wave: {
    src: "/marcos_Anim/05_MASCOT_GREETING_WAVE.lottie",
    loop: true,
  },
  lookLeft: {
    src: "/marcos_Anim/02_MASCOT_LOOK_LEFT.lottie",
    loop: false,
    duration: 700,
  },
  lookRight: {
    src: "/marcos_Anim/03_MASCOT_LOOK_RIGHT.lottie",
    loop: false,
    duration: 700,
  },
  lookUp: {
    src: "/marcos_Anim/04_MASCOT_LOOK_UP.lottie",
    loop: false,
    duration: 1200,
  },
  happy: {
    src: "/marcos_Anim/06_MASCOT_HAPPY.lottie",
    loop: false,
    duration: 1200,
  },
  celebrate: {
    src: "/marcos_Anim/08_MASCOT_CELEBRATE.lottie",
    loop: false,
    duration: 1600,
  },
  thinking: {
    src: "/marcos_Anim/07_MASCOT_THINKING.lottie",
    loop: true,
  },
  confused: {
    src: "/marcos_Anim/09_MASCOT_CONFUSED.lottie",
    loop: false,
    duration: 1300,
  },
  pointLeft: {
    src: "/marcos_Anim/10_MASCOT_POINT_LEFT.lottie",
    loop: false,
    duration: 1400,
  },
  wink: {
    src: "/marcos_Anim/12_MASCOT_WINK.lottie",
    loop: false,
    duration: 1000,
  },
};

/**
 * Marcos - AI Mascot for Udit's Portfolio
 * Features seamless dual-layer animation switching with zero disappearances.
 */
const Marcos = forwardRef(function Marcos(
  {
    onClick,
    animation: forcedAnimation,
    className = "",
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentAnimKey, setCurrentAnimKey] = useState("idle");
  const [isActionReady, setIsActionReady] = useState(false);
  const [devicePixelRatio, setDevicePixelRatio] = useState(3);

  const actionInstanceRef = useRef(null);
  const timeoutRef = useRef(null);
  const idleIntervalRef = useRef(null);

  // Configure local wasm URL, determine screen pixel ratio, and pre-warm cache
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        setWasmUrl("/dotlottie-player.wasm");
      } catch (e) {}

      const dpr = window.devicePixelRatio || 1;
      setDevicePixelRatio(Math.max(dpr * 1.5, 2.5));

      // Pre-warm all animations into browser cache so transitions are instantaneous
      Object.values(MARCOS_ANIMATIONS).forEach((anim) => {
        fetch(anim.src, { cache: "force-cache" }).catch(() => {});
      });
    }
  }, []);

  // Update animation based on hover or forced props
  useEffect(() => {
    if (forcedAnimation && MARCOS_ANIMATIONS[forcedAnimation]) {
      setIsActionReady(false);
      setCurrentAnimKey(forcedAnimation);
      return;
    }

    if (isHovered) {
      setIsActionReady(false);
      setCurrentAnimKey("wave");
    } else {
      setIsActionReady(false);
      setCurrentAnimKey("idle");
    }
  }, [isHovered, forcedAnimation]);

  // Occasional lifelike idle glances (e.g. lookLeft, lookUp, wink) every 11-14 seconds
  useEffect(() => {
    if (forcedAnimation || isHovered) return;

    idleIntervalRef.current = setInterval(() => {
      const glances = ["lookLeft", "lookUp", "wink", "pointLeft"];
      const randomGlance = glances[Math.floor(Math.random() * glances.length)];
      const animConfig = MARCOS_ANIMATIONS[randomGlance];

      setIsActionReady(false);
      setCurrentAnimKey(randomGlance);

      timeoutRef.current = setTimeout(() => {
        setIsActionReady(false);
        setCurrentAnimKey("idle");
      }, animConfig.duration || 1000);
    }, 12000);

    return () => {
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [forcedAnimation, isHovered]);

  const handleActionRef = useCallback((instance) => {
    if (!instance) return;
    actionInstanceRef.current = instance;

    const onReady = () => {
      setIsActionReady(true);
      try {
        instance.play();
      } catch (e) {}
    };

    if (instance.isLoaded) {
      onReady();
    } else {
      instance.addEventListener("load", onReady);
      instance.addEventListener("ready", onReady);
    }
  }, []);

  const handleClick = (e) => {
    setIsActionReady(false);
    setCurrentAnimKey("celebrate");
    setTimeout(() => {
      onClick?.(e);
    }, 350);
  };

  const isActionActive = currentAnimKey !== "idle";
  const actionAnim = isActionActive ? MARCOS_ANIMATIONS[currentAnimKey] : null;

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50 flex flex-col items-end select-none ${className}`}
    >
      {/* Speech bubble tooltip - ONLY shown when hovered */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mb-1 mr-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md px-4 py-2 rounded-2xl rounded-br-sm shadow-xl border border-purple-200/70 dark:border-purple-800/70 text-xs text-gray-800 dark:text-gray-100 flex items-center gap-2 pointer-events-none whitespace-nowrap z-20"
          >
            <span className="flex h-2 w-2 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-semibold text-xs tracking-tight">
              Hi, I'm Marcos! Chat with me 👋
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Mascot Button */}
      <motion.button
        type="button"
        aria-label="Open AI Assistant chat with Marcos"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05, y: -6 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="relative group cursor-pointer focus:outline-none flex flex-col items-center bg-transparent border-none p-0 m-0"
      >
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-x-4 top-8 bottom-4 -z-10 rounded-full bg-purple-500/0 group-hover:bg-purple-500/20 dark:group-hover:bg-purple-400/25 blur-2xl transition-all duration-300" />

        {/* Mascot Container - Dual-layer rendering for completely seamless transitions */}
        <div className="relative w-36 h-48 sm:w-44 sm:h-56 md:w-52 md:h-64 flex items-center justify-center overflow-visible">
          {/* BASE LAYER: Permanent Idle Loop. Always mounted and running underneath so Marcos NEVER disappears. */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <DotLottieReact
              src={MARCOS_ANIMATIONS.idle.src}
              loop={true}
              autoplay={true}
              renderConfig={{
                devicePixelRatio: devicePixelRatio,
                autoResize: true,
              }}
              layout={{
                fit: "contain",
                align: [0.5, 0.5],
              }}
              className="w-full h-full transform scale-110 sm:scale-120 transition-transform duration-200 pointer-events-none"
            />
          </div>

          {/* ACTION LAYER: Overlays gesture animations (wave, glance, celebrate). Fades in only once ready. */}
          {actionAnim && (
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
                isActionReady ? "opacity-100" : "opacity-0"
              }`}
            >
              <DotLottieReact
                src={actionAnim.src}
                loop={actionAnim.loop}
                autoplay={true}
                dotLottieRefCallback={handleActionRef}
                renderConfig={{
                  devicePixelRatio: devicePixelRatio,
                  autoResize: true,
                }}
                layout={{
                  fit: "contain",
                  align: [0.5, 0.5],
                }}
                className="w-full h-full transform scale-110 sm:scale-120 transition-transform duration-200 pointer-events-none"
              />
            </div>
          )}
        </div>

        {/* Grounding Contact Shadow */}
        <div className="w-20 sm:w-24 md:w-28 h-3 bg-black/15 dark:bg-black/40 rounded-[100%] blur-[3px] -mt-2 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:opacity-50" />
      </motion.button>
    </motion.div>
  );
});

export default Marcos;
