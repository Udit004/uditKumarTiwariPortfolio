"use client"
import React, { useState, useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomTypeAnimation from "./CustomTypeAnimation";

// Static data - could be moved to a separate file
const socialLinks = [
  { 
    icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z", 
    color: "from-gray-600 to-gray-800",
    label: "GitHub",
    href: "https://github.com/yourusername"
  },
  { 
    icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", 
    color: "from-blue-600 to-blue-800",
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourusername"
  },
  { 
    icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z", 
    color: "from-sky-500 to-sky-700",
    label: "Twitter",
    href: "https://twitter.com/yourusername"
  },
];

const Home = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements - CSS Only */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Orbs with CSS */}
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-slow top-[10%] left-[10%]" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-slower bottom-[20%] right-[10%]" />
      </div>

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
      >
        <source src="/assets/blackBackgroundAnimation.mp4" type="video/mp4" />
      </video>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 py-20 animate-fade-in">
        {/* Profile Section */}
        <div className="relative mb-8 sm:mb-12 animate-scale-in">
          {/* Professional Profile Image Container */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto">
            {/* Static Gradient Border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 p-[3px]">
              <div className="w-full h-full rounded-full bg-slate-900 p-1.5 relative">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src="/assets/udit_passport.jpg"
                    alt="Udit Kumar Tiwari - Full Stack Developer"
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                    className="object-cover shadow-2xl transition-transform duration-700 hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Professional Status Indicator */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5">
              <div className="relative">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-3 sm:border-4 border-slate-900 shadow-lg">
                  <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                </div>
                {/* Pulse Ring */}
                <div className="absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Name */}
        <div className="mb-4 sm:mb-6 animate-slide-up delay-200">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            Udit Kumar Tiwari
          </h1>
        </div>

        {/* Professional Role with Typing Animation */}
        <div className="animate-slide-up delay-300">
          <CustomTypeAnimation />
        </div>

        {/* Professional Description */}
        <div className="max-w-2xl lg:max-w-3xl mb-8 sm:mb-10 px-4 animate-slide-up delay-400">
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            Crafting exceptional digital experiences with modern technologies. 
            Specializing in{" "}
            <span className="text-purple-400 font-semibold">React</span>,{" "}
            <span className="text-purple-400 font-semibold">Node.js</span>,{" "}
            <span className="text-pink-400 font-semibold">Next.js</span>, and{" "}
            <span className="text-cyan-400 font-semibold">Full Stack Development</span>.
            Turning ideas into scalable, beautiful applications.
          </p>
        </div>

        {/* Professional CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 px-4 animate-slide-up delay-500">
          <a
            href="#projects"
            className="group relative px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold text-base sm:text-lg transition-all duration-300 overflow-hidden shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          <a
            href="#contact"
            className="group relative px-8 py-3.5 bg-transparent border-2 border-purple-500 rounded-lg text-white font-semibold text-base sm:text-lg transition-all duration-300 overflow-hidden shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get In Touch</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-8 sm:mt-10 animate-slide-up delay-600">
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg animate-scale-in`}
              style={{ animationDelay: `${700 + index * 100}ms` }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="opacity-90">
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-scroll-indicator" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-24 sm:h-32 md:h-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
              <stop offset="100%" stopColor="rgba(34, 211, 238, 0.6)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Home;