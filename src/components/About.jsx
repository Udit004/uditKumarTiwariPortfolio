'use client'

import React from "react";
import Image from "next/image";
import AboutClient from "./AboutClient";
import { useVideoLazyLoad } from "../lib/useVideoLazyLoad";

// Static data - moved outside component
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

const achievements = [
  { icon: "🏆", text: "5+ Projects Completed" },
  { icon: "⭐", text: "Clean Code Advocate" },
  { icon: "🚀", text: "Performance Optimizer" },
  { icon: "🎯", text: "Problem Solver" }
];

const About = () => {
  const videoRef = useVideoLazyLoad();

  return (

      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center  text-white px-4 py-20 overflow-hidden"
      >
        {/* Background Video - COMMENTED OUT
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="none"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
          >
            <source src="/assets/purpleBackgroundAnimation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60" />
        </div>
        */}

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <div className="p-6 sm:p-8 md:p-12">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
                About Me
              </h2>
              <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full" />
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-start mb-20">

              {/* Left: Rich Image Card */}
              <div className="flex justify-center lg:justify-end order-1 lg:order-1">
                <div className="relative group w-full max-w-sm">
                  {/* Glowing halo behind card */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/40 via-pink-500/20 to-cyan-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

                  {/* Main card */}
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
                    {/* Portrait image */}
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src="/assets/udit_image.jpg"
                        alt="Udit Kumar Tiwari - Full Stack Developer"
                        fill
                        sizes="(max-width: 640px) 100vw, 384px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      {/* Bottom gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-transparent" />
                      {/* Name overlay on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-1">Full Stack Developer</p>
                        <h3 className="text-xl font-bold text-white">Udit Kumar Tiwari</h3>
                      </div>
                    </div>

                    
                    {/* <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-slate-900/50">
                      <div className="py-4 text-center">
                        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">5+</div>
                        <div className="text-xs text-gray-400 mt-0.5">Projects</div>
                      </div>
                      <div className="py-4 text-center">
                        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">2+</div>
                        <div className="text-xs text-gray-400 mt-0.5">Years Exp</div>
                      </div>
                      <div className="py-4 text-center">
                        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">10+</div>
                        <div className="text-xs text-gray-400 mt-0.5">Tech Stack</div>
                      </div>
                    </div> */}
                  </div>

                  {/* Floating Available badge */}
                  {/* <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-xs font-bold text-white shadow-lg shadow-green-500/30 flex items-center gap-1.5 z-10">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Available for Work
                  </div> */}
                </div>
              </div>

              {/* Right: Bio + Achievements + Beyond Code */}
              <div className="space-y-6 md:space-y-8 order-2 lg:order-2 flex flex-col justify-center">
                <div className="space-y-4 md:space-y-5">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white">
                    Hey! I'm{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Udit Kumar Tiwari
                    </span>
                  </h3>

                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                    A passionate <strong className="text-purple-300">Full Stack Developer</strong> and{" "}
                    <strong className="text-cyan-300">Tech Innovator</strong> who transforms ideas into
                    exceptional digital experiences. I specialize in crafting scalable, performant,
                    and visually stunning web applications using cutting-edge technologies.
                  </p>

                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                    My journey began with curiosity and evolved into a{" "}
                    <strong className="text-purple-300">relentless pursuit of excellence</strong>.
                    I believe in writing elegant, maintainable code while delivering intuitive
                    user experiences that leave lasting impressions.
                  </p>
                </div>

                {/* Achievements — interactive, handled in CSR */}
                <AboutClient achievements={achievements} />

                <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <h4 className="text-xl sm:text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                    Beyond Code <span className="text-2xl">🏸⚽</span>
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    When I'm not crafting code, you'll find me dominating the badminton court,
                    scoring goals on the football field, or exploring new destinations. I believe
                    in maintaining a balanced lifestyle that fuels creativity and innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Full-width: Tech Stack + Quotes */}
            <AboutClient techStack={techStack} />


          </div>
        </div>
      </section>
  );
};

export default About;