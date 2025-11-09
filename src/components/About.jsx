"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import QuoteCarousel from "./QuoteCarousel";

const About = () => {
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

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }
      `}</style>

      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 py-20 overflow-hidden"
      >
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
          >
            <source src="/assets/purpleBackgroundAnimation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60" />
        </div>

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
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16">
              {/* Profile Image Section */}
              <div className="flex justify-center lg:justify-start order-1 lg:order-1">
                <div className="relative group w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg">
                  <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] xl:max-w-[500px] mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 p-2 shadow-2xl">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-700"></div>
                    
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 shadow-inner border border-slate-600/30">
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image
                          src="/assets/udit_image.jpg"
                          alt="Udit Kumar Tiwari - Full Stack Developer"
                          fill
                          sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, (max-width: 1280px) 400px, 500px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-110 contrast-110"
                          priority
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 rounded-full border border-slate-400/20 group-hover:border-slate-300/40 transition-colors duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-6 md:space-y-8 order-2 lg:order-2">
                <div className="space-y-4 md:space-y-6">
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

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 text-center hover:bg-white/15 hover:scale-105 transition-all duration-300"
                    >
                      <div className="text-2xl mb-2">{achievement.icon}</div>
                      <div className="text-sm font-medium text-gray-300">{achievement.text}</div>
                    </div>
                  ))}
                </div>

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

            {/* Tech Stack Section */}
            <div className="mt-12 md:mt-20">
              <h4 className="text-3xl sm:text-4xl font-bold text-white mb-8 md:mb-12 text-center">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Technology Stack
                </span>
              </h4>
              
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-8">
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="relative group"
                    style={{
                      animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    {/* Floating card with glass morphism */}
                    {/* <div className="relative p-6 sm:p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer hover:border-white/30 hover:-translate-y-2 group-hover:bg-white/10">
                       */}
                      {/* Glow effect on hover */}
                      {/* <div className={`absolute -inset-0.5 bg-gradient-to-r ${tech.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} /> */}
                      
                      {/* Icon container */}
                      <div className="relative">
                        {/* Icon with gradient background */}
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br ${tech.color} p-0.5 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                          <div className="w-full h-full rounded-xl bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
                            {tech.isEmoji ? (
                              <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                                {tech.icon}
                              </span>
                            ) : (
                              <Image
                                src={tech.icon}
                                alt={tech.name}
                                width={48}
                                height={48}
                                className="w-8 h-8 sm:w-12 sm:h-12 object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                              />
                            )}
                          </div>
                        {/* </div> */}
                        
                        {/* Text content */}
                        <div className="text-center">
                          <h5 className="font-bold text-base sm:text-lg text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                            {tech.name}
                          </h5>
                          <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {tech.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Orbiting particles effect */}
                      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                           style={{
                             animation: 'orbit 3s linear infinite',
                             transform: 'translate(-50%, -50%)'
                           }} 
                      />
                    </div>
                    
                    {/* Connecting lines (space effect) */}
                    <div className="absolute top-1/2 left-full w-8 h-px bg-gradient-to-r from-white/10 to-transparent hidden lg:block" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Section - Now Client Component */}
            <QuoteCarousel />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;