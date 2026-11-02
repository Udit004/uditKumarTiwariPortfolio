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
  pointLeft: {
    src: "/marcos_Anim/10_MASCOT_POINT_LEFT.lottie",
    loop: true,
    duration: 3800, // Increased duration: points and guides attention for nearly 4 seconds
  },
  lookLeft: {
    src: "/marcos_Anim/02_MASCOT_LOOK_LEFT.lottie",
    loop: false,
    duration: 900,
  },
  lookRight: {
    src: "/marcos_Anim/03_MASCOT_LOOK_RIGHT.lottie",
    loop: false,
    duration: 900,
  },
  lookUp: {
    src: "/marcos_Anim/04_MASCOT_LOOK_UP.lottie",
    loop: false,
    duration: 1300,
  },
  happy: {
    src: "/marcos_Anim/06_MASCOT_HAPPY.lottie",
    loop: false,
    duration: 1300,
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
    duration: 1400,
  },
  wink: {
    src: "/marcos_Anim/12_MASCOT_WINK.lottie",
    loop: false,
    duration: 1100,
  },
};

/**
 * Marcos - AI Mascot for Udit's Portfolio
 * High-definition interactive 3D character with clean single-surface animation handoffs.
 * Uses persistent dual-canvases with cross-fading so Marcos never disappears and limbs never duplicate.
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
  const [activeMode, setActiveMode] = useState("idle"); // 'idle' | 'action'
  const [actionSrc, setActionSrc] = useState(MARCOS_ANIMATIONS.wave.src);
  const [actionLoop, setActionLoop] = useState(true);
  const [devicePixelRatio, setDevicePixelRatio] = useState(3);

  const actionDotLottieRef = useRef(null);
  const timeoutRef = useRef(null);
  const cycleIndexRef = useRef(0);
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

  // Callback to capture the action DotLottie player instance
  const handleActionDotLottieRef = useCallback((instance) => {
    actionDotLottieRef.current = instance;
    if (instance) {
      try {
        instance.play();
      } catch (e) {}
    }
  }, []);

  // Safe helper to switch to an action animation without blinking
  const triggerAction = useCallback((animKey, customDuration) => {
    const config = MARCOS_ANIMATIONS[animKey];
    if (!config) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setActionSrc(config.src);
    setActionLoop(config.loop);

    // Switch active display mode to action layer
    setActiveMode("action");

    // Play action instance
    if (actionDotLottieRef.current) {
      try {
        actionDotLottieRef.current.play();
      } catch (e) {}
    }

    // Return to idle after duration (if not looping infinitely)
    const duration = customDuration || config.duration;
    if (duration) {
      timeoutRef.current = setTimeout(() => {
        setActiveMode("idle");
      }, duration);
    }
  }, []);

  // Respond to hover and external animation prop
  useEffect(() => {
    if (forcedAnimation && MARCOS_ANIMATIONS[forcedAnimation]) {
      triggerAction(forcedAnimation);
      return;
    }

    if (isHovered) {
      // While hovered, play the greeting wave continuously
      triggerAction("wave");
    } else {
      // Revert to idle cleanly
      setActiveMode("idle");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [isHovered, forcedAnimation, triggerAction]);

  // INCREASED FREQUENCY: Idle gesture loop every 6.5 seconds with prominent pointLeft prioritization
  useEffect(() => {
    if (forcedAnimation || isHovered) return;

    // Pattern deliberately repeats pointLeft frequently so visitors are regularly guided toward site content
    const gestures = ["pointLeft", "lookLeft", "pointLeft", "lookUp", "pointLeft", "wink"];

    idleIntervalRef.current = setInterval(() => {
      const gesture = gestures[cycleIndexRef.current % gestures.length];
      cycleIndexRef.current += 1;

      triggerAction(gesture);
    }, 6500);

    return () => {
      if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [forcedAnimation, isHovered, triggerAction]);

  const handleClick = (e) => {
    triggerAction("celebrate", 500);
    setTimeout(() => {
      onClick?.(e);
    }, 350);
  };

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

        {/* Mascot Container - Dual persistent layers with smooth crossfade */}
        <div className="relative w-36 h-48 sm:w-44 sm:h-56 md:w-52 md:h-64 flex items-center justify-center overflow-visible">
          {/* LAYER 1: Permanent Idle Player. Active during idle mode, fades down when action is active. */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ease-in-out ${
              activeMode === "idle" ? "opacity-100" : "opacity-0"
            }`}
          >
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

          {/* LAYER 2: Action Player (Wave, Point Left, Look Up, Wink). Cross-fades smoothly so no blank canvas ever appears. */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ease-in-out ${
              activeMode === "action" ? "opacity-100" : "opacity-0"
            }`}
          >
            <DotLottieReact
              src={actionSrc}
              loop={actionLoop}
              autoplay={true}
              dotLottieRefCallback={handleActionDotLottieRef}
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
        </div>

        {/* Grounding Contact Shadow */}
        <div className="w-20 sm:w-24 md:w-28 h-3 bg-black/15 dark:bg-black/40 rounded-[100%] blur-[3px] -mt-2 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:opacity-50" />
      </motion.button>
    </motion.div>
  );
});

export default Marcos;
