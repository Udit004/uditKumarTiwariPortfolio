'use client'

import React from "react";
import Image from "next/image";
import AboutClient from "./AboutClient";
import { useVideoLazyLoad } from "../lib/useVideoLazyLoad";
import { Code2, Smartphone, Zap, Brain } from "lucide-react";

// ─── Tech stack data (untouched) ───────────────────────────────────────────
const techStack = [
    { 
      name: "React.js", 
      color: "from-blue-400 to-cyan-500", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "UI Library" 
    },
    { 
      name: "Next.js", 
      color: "from-gray-200 to-gray-400", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", 
      description: "React Framework" 
    },
    { 
      name: "JavaScript", 
      color: "from-yellow-300 to-yellow-500", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
      description: "ES6+" 
    },
    { 
      name: "TypeScript", 
      color: "from-blue-500 to-blue-700", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", 
      description: "Type Safety" 
    },
    { 
      name: "Tailwind CSS", 
      color: "from-cyan-400 to-blue-500", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", 
      description: "Styling" 
    },
    { 
      name: "MongoDB", 
      color: "from-green-400 to-green-600", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", 
      description: "Database" 
    },
    { 
      name: "Node.js", 
      color: "from-green-500 to-lime-600", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", 
      description: "Runtime" 
    },
    { 
      name: "Git", 
      color: "from-orange-400 to-red-500", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
      description: "Version Control" 
    }
];

// ─── What I Do services ─────────────────────────────────────────────────────
const services = [
  {
    icon: Code2,
    title: "Full Stack Development",
    desc: "Building robust, scalable, and high-performance web applications.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Smartphone,
    title: "Modern Web Solutions",
    desc: "Creating responsive, accessible, and pixel-perfect user experiences.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Zap,
    title: "Performance Focused",
    desc: "Optimizing speed, SEO, and performance for real-world impact.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Brain,
    title: "Problem Solver",
    desc: "Turning challenges into opportunities with clean and efficient code.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
];

// ─── Main About Component ───────────────────────────────────────────────────
const About = () => {
  const videoRef = useVideoLazyLoad();

  return (
    <section
      id="about"
      className="relative text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 60% 60% at 50% 40%, rgba(88,28,135,0.35) 0%, transparent 65%),
          radial-gradient(ellipse 40% 50% at 20% 60%, rgba(126,34,206,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 35% 40% at 80% 70%, rgba(59,130,246,0.10) 0%, transparent 55%),
          #05020d
        `,
      }}
    >
      {/* ── Perspective grid floor (same style as Hero) ── */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none z-0"
        style={{
          height: "260px",
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
          transform: "perspective(480px) rotateX(62deg)",
          transformOrigin: "bottom",
          maskImage: "linear-gradient(to top, black 10%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      {/* ── Dot particle field ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(168,85,247,0.45) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 75%)",
          opacity: 0.18,
        }}
      />

      {/* ════════════════ MAIN CONTENT ════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 py-24 sm:py-28">

        {/* ── Section label ── */}
        <p className="text-purple-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] mb-3">
          Get To Know Me
        </p>

        {/* ════════ 3-COLUMN HERO ROW ════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-8 xl:gap-12 items-center mb-20 sm:mb-28">

          {/* ── COL 1: Left — Bio ── */}
          <div className="flex flex-col gap-6 lg:order-1 order-2">
            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight">
              About{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#a855f7,#6366f1 55%,#38bdf8)" }}
              >
                Me
              </span>
            </h2>

            {/* Intro paragraph */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
              I&apos;m a passionate Full Stack Developer who loves building fast,
              scalable, and beautiful digital experiences that make an impact.
            </p>

            {/* Divider */}
            <div className="w-14 h-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />

            {/* Journey paragraph */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
              My journey in tech started with curiosity and turned into a career
              driven by creativity, problem solving, and a relentless pursuit of
              excellence. I enjoy turning complex problems into simple, elegant
              solutions.
            </p>

            {/* Download Resume */}
            <a
              href="/assets/udit_resume.jpg"
              download
              className="mt-2 self-start inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-purple-400/50 backdrop-blur-sm text-white text-sm font-medium transition-all duration-300 group"
            >
              Download Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-y-0.5 transition-transform duration-200"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>

          {/* ── COL 2: Center — Portrait Card + detached quote card ── */}
          <div className="flex justify-center lg:order-2 order-1">
            <div className="relative w-64 sm:w-72 lg:w-[260px] xl:w-[300px] flex-shrink-0 mb-14 sm:mb-16">

              {/* Purple radial glow behind card */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 40%, rgba(147,51,234,0.55) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  transform: "scale(1.2)",
                  zIndex: 0,
                }}
              />

              {/* Halo ring peeking behind the top of the portrait */}
              <div
                className="absolute left-1/2 top-22 -translate-x-1/2 -translate-y-1/4 w-[78%] aspect-square rounded-full pointer-events-none"
                style={{
                  border: "1px solid rgba(168,85,247,0.4)",
                  boxShadow: "0 0 40px rgba(168,85,247,0.18), inset 0 0 30px rgba(168,85,247,0.1)",
                  zIndex: 0,
                }}
              />

              {/* Card (image only) */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, rgba(23, 2, 38, 0.6) 0%, rgba(15,5,30,0.85) 60%)",
                  border: "1px solid rgba(64, 63, 64, 0.3)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                  zIndex: 1,
                }}
              >
                {/* Portrait — grayscale to match reference */}
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src="/assets/aboutSection/aboutSection_Image.png"
                    alt="Udit Kumar Tiwari - Full Stack Developer"
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover object-top grayscale contrast-125"
                  />
                  {/* Gradient fade at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0316] via-transparent to-transparent" />
                </div>
              </div>

              {/* ── Detached floating quote card (bottom-right, overlapping) ── */}
              <div
                className="absolute -bottom-10 -right-6 sm:-right-8 lg:-right-6 xl:-right-10 w-40 sm:w-48 lg:w-44 xl:w-52 rounded-2xl p-4 sm:p-5 z-20"
                style={{
                  background: "rgba(10,4,20,0.75)",
                  border: "1px solid rgba(168,85,247,0.25)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
                }}
              >
                {/* Quote mark */}
                <div
                  className="text-3xl sm:text-4xl font-serif leading-none mb-1"
                  style={{ color: "rgba(168,85,247,0.8)" }}
                >
                  ❝
                </div>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed italic mb-2 sm:mb-3">
                  Code is not just what I do,<br />
                  it&apos;s how I solve problems<br />
                  and create value.
                </p>
                {/* Signature */}
                <p className="font-signature text-purple-300 text-lg sm:text-xl">
                  Udit Tiwari
                </p>
              </div>
            </div>
          </div>

          {/* ── COL 3: Right — What I Do ── */}
          <div className="flex flex-col gap-5 lg:order-3 order-3">
            {/* Section heading */}
            <div className="mb-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                <h3 className="text-white text-lg sm:text-xl font-bold">What I Do</h3>
              </div>
              <div className="w-10 h-0.5 rounded-full bg-purple-500/50 mt-2 ml-5" />
            </div>

            {/* Services list */}
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 group"
                >
                  {/* Icon box */}
                  <div className={`w-10 h-10 rounded-lg ${svc.bg} border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={18} className={svc.color} />
                  </div>
                  {/* Text */}
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">{svc.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ════════ TECH STACK (untouched) ════════ */}
        <AboutClient techStack={techStack} />

      </div>
    </section>
  );
};

export default About;