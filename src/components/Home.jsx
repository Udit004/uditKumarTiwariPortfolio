"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Code2, Bot, Palette, ArrowUpRight, MessageSquare } from "lucide-react";
import CustomTypeAnimation from "./CustomTypeAnimation";
import SocialIcons from "./SocialIcons";
import gsap from "gsap";

/* ─────────────────────────────────────────
   Floating stat pill shown below the buttons
───────────────────────────────────────── */
const StatPill = ({ icon: Icon, value, label, color }) => (
  <div className="flex flex-col items-center gap-0.5">
    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 ${color}`}>
      <Icon size={14} className="text-white sm:hidden" />
      <Icon size={15} className="text-white hidden sm:block" />
    </div>
    <span className="text-white font-bold text-xs sm:text-sm">{value}</span>
    <span className="text-gray-400 text-[10px] sm:text-xs whitespace-nowrap">{label}</span>
  </div>
);

/* ─────────────────────────────────────────
   Individual floating glassmorphism card
───────────────────────────────────────── */
const FloatingCard = ({ icon: Icon, title, subtitle, className, iconBg }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-2xl
      border border-purple-500/25 bg-black/50 backdrop-blur-md
      shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_25px_rgba(168,85,247,0.08)]
      max-w-[210px]
      ${className}`}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      <Icon size={18} className="text-white" />
    </div>
    <div className="min-w-0">
      <p className="text-white font-semibold text-sm leading-none mb-1 whitespace-nowrap">{title}</p>
      <p className="text-gray-400 text-xs whitespace-nowrap">{subtitle}</p>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Main Hero
───────────────────────────────────────── */
const Home = () => {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const orbitDotRef = useRef(null);
  const portraitRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(portraitRef.current, {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });

      // Floating card entrance
      [card1Ref, card2Ref, card3Ref].forEach((ref, i) => {
        gsap.from(ref.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.9 + i * 0.15,
          ease: "back.out(1.7)",
        });
      });

      // Looping float animations
      gsap.to(card1Ref.current, {
        y: -14,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(card2Ref.current, {
        y: 10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
      gsap.to(card3Ref.current, {
        y: -10,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // Animate the dot around an ellipse
      let angle = 0;
      const dot = orbitDotRef.current;
      const container = portraitRef.current;

      const animDot = () => {
        angle += 0.008;
        if (dot && container) {
          const width = container.offsetWidth;
          // SVG is 90% of container width
          const svgWidth = width * 0.9;
          const R_X = (225 / 480) * svgWidth;
          const R_Y = (68 / 480) * svgWidth;

          const x = R_X * Math.cos(angle);
          const y = R_Y * Math.sin(angle);
          dot.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }
        requestAnimationFrame(animDot);
      };
      const raf = requestAnimationFrame(animDot);
      return () => cancelAnimationFrame(raf);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 55% 55% at 75% 45%, rgba(126,34,206,0.45) 0%, transparent 60%),
          radial-gradient(ellipse 35% 35% at 88% 72%, rgba(59,130,246,0.18) 0%, transparent 55%),
          radial-gradient(ellipse 30% 40% at 15% 55%, rgba(168,85,247,0.08) 0%, transparent 60%),
          #05020d
        `,
      }}
    >

      {/* ── Perspective grid floor ── */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none z-0"
        style={{
          height: "320px",
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
          transform: "perspective(480px) rotateX(62deg)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(to top, black 10%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      {/* ── Dot particle field ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(168,85,247,0.55) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 65% 70% at 70% 45%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 70% at 70% 45%, black 20%, transparent 75%)",
          opacity: 0.22,
        }}
      />

      {/* ── Slow ambient orbs ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-[float-slow_9s_ease-in-out_infinite] top-[-10%] left-[-5%]"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,1), rgba(126,34,206,0.3), transparent)" }} />
        <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-15 animate-[float-slower_12s_ease-in-out_infinite] bottom-[10%] right-[-3%]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,1), transparent)" }} />
      </div>

      {/* ════════════════════════════════════════════
          MAIN LAYOUT: Left content + Right visual
      ════════════════════════════════════════════ */}
      <div className="relative z-10 min-h-screen flex items-center px-6 sm:px-10 lg:px-20 xl:px-28 py-20 sm:py-24">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* ──────── LEFT CONTENT ──────── */}
          <div ref={leftRef} className="flex flex-col items-start">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm font-medium mb-7">
              <Code2 size={14} />
              Full Stack Developer
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse ml-1" />
            </div>

            {/* Hi, I'm */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-3">
              Hi, I&apos;m
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899, #38bdf8)",
                }}
              >
                Udit Kumar Tiwari
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-gray-300 text-base sm:text-lg mb-2 font-medium">
              Crafting digital experiences that are fast, scalable, and impactful.
            </p>

            {/* GSAP type animation */}
            <div className="mb-3">
              <CustomTypeAnimation />
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
              Specializing in{" "}
              <span className="text-purple-400 font-semibold">React</span>,{" "}
              <span className="text-purple-400 font-semibold">Node.js</span>,{" "}
              <span className="text-purple-400 font-semibold">Next.js</span>, and{" "}
              <span className="text-pink-400 font-semibold">AI-powered</span> applications.
              <br />
              I build modern web solutions that solve real-world problems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4 mb-10">
              <a
                href="#projects"
                className="w-full sm:w-auto group relative flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-500/40 active:scale-95"
                style={{ background: "linear-gradient(135deg, #9333ea, #ec4899)" }}
              >
                <span className="relative z-10">View My Work</span>
                <ArrowUpRight size={16} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm border border-purple-500/50 bg-white/5 backdrop-blur-sm hover:border-purple-400 hover:bg-white/10 transition-all duration-300 active:scale-95 shadow-lg"
              >
                <span className="relative z-10">Get In Touch</span>
                <MessageSquare size={16} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-8 mb-6">
              <StatPill
                icon={Code2}
                value="20+"
                label="Projects Completed"
                color="bg-purple-600/80"
              />
              <div className="w-px h-10 bg-white/10 shrink-0" />
              <StatPill
                icon={({ size, className }) => (
                  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                )}
                value="2+"
                label="Years Experience"
                color="bg-pink-600/80"
              />
              <div className="w-px h-10 bg-white/10 shrink-0" />
              <StatPill
                icon={({ size, className }) => (
                  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                value="10+"
                label="Happy Clients"
                color="bg-green-600/80"
              />
            </div>

            {/* Social Icons */}
            {/* <SocialIcons variant="home" /> */}
          </div>

          {/* ──────── RIGHT VISUAL ──────── */}
          <div className="relative flex justify-center lg:justify-end mt-16 lg:mt-0">

            {/* Outer positioning wrapper */}
            <div
              ref={portraitRef}
              className="relative w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[520px] xl:max-w-[560px] aspect-[52/60]"
            >

              {/* Large purple glow behind portrait */}
              <div
                className="absolute pointer-events-none w-full aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(126,34,206,0.28) 38%, transparent 70%)",
                  filter: "blur(22px)",
                  zIndex: 1,
                }}
              />

              {/* Circular halo ring */}
              <div
                className="absolute pointer-events-none w-[82%] aspect-square top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  border: "1px solid rgba(168,85,247,0.45)",
                  boxShadow: "0 0 35px rgba(168,85,247,0.18), inset 0 0 35px rgba(168,85,247,0.1)",
                  zIndex: 2,
                }}
              />

              {/* Portrait image */}
              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[115%] h-[115%]"
                style={{ zIndex: 10 }}
              >
                <Image
                  src="/assets/heroSection/udit_passport_without_background.png"
                  alt="Udit Kumar Tiwari - Full Stack Developer"
                  fill
                  priority
                  className="object-contain object-bottom"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 480px, 620px"
                />
              </div>

              {/* ── SVG Orbital ellipse (the glowing swoosh trail) ── */}
              {/* <svg
                className="absolute pointer-events-none w-[90%] left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 -rotate-12"
                style={{
                  zIndex: 20,
                  filter: "drop-shadow(0 0 6px rgba(168,85,247,0.9)) drop-shadow(0 0 22px rgba(168,85,247,0.55))",
                }}
                viewBox="0 0 480 160"
                fill="none"
              >
                <defs>
                  <linearGradient id="orbitGrad" x1="0" y1="160" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f0abfc" />
                    <stop offset="18%" stopColor="#d946ef" stopOpacity="0.95" />
                    <stop offset="45%" stopColor="#a855f7" stopOpacity="0.7" />
                    <stop offset="72%" stopColor="#7c3aed" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
                <ellipse
                  cx="240"
                  cy="80"
                  rx="225"
                  ry="68"
                  stroke="url(#orbitGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg> */}

              {/* ── Animated glowing dot on orbit ── */}
              <div
                className="absolute pointer-events-none w-[90%] left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 -rotate-12"
                style={{ zIndex: 25 }}
              >
                <div
                  ref={orbitDotRef}
                  className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 8px white, 0 0 20px #d946ef, 0 0 45px #9333ea",
                  }}
                />
              </div>

              {/* ── Floating Card 1: Clean Code (top-right) ── */}
              <div
                ref={card1Ref}
                className="absolute z-30 top-[6%] right-[1%] sm:-right-[8%] lg:-right-[4%] scale-[0.68] sm:scale-[0.85] lg:scale-100 origin-top-right"
              >
                <FloatingCard
                  icon={Code2}
                  title="Clean Code"
                  subtitle="Scalable Solutions"
                  className="!relative"
                  iconBg="bg-purple-600/70"
                />
              </div>

              {/* ── Floating Card 2: AI Integration (mid-right) ── */}
              <div
                ref={card2Ref}
                className="absolute z-30 top-[45%] right-[0%] sm:-right-[10%] lg:-right-[6%] scale-[0.68] sm:scale-[0.85] lg:scale-100 origin-right"
              >
                <FloatingCard
                  icon={Bot}
                  title="AI Integration"
                  subtitle="Smart Applications"
                  className="!relative"
                  iconBg="bg-blue-600/70"
                />
              </div>

              {/* ── Floating Card 3: Modern Design (bottom-left) ── */}
              <div
                ref={card3Ref}
                className="absolute z-30 bottom-[12%] left-[1%] sm:-left-[6%] lg:-left-[2%] scale-[0.68] sm:scale-[0.85] lg:scale-100 origin-bottom-left"
              >
                <FloatingCard
                  icon={Palette}
                  title="Modern Design"
                  subtitle="Great User Experience"
                  className="!relative"
                  iconBg="bg-pink-600/70"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Home;