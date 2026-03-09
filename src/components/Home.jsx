"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomTypeAnimation from "./CustomTypeAnimation";
import SocialIcons from "./SocialIcons";

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-slow top-[10%] left-[5%]" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-slower bottom-[15%] right-[5%]" />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow top-[50%] left-[50%]" />
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

      {/* Main Content — Two-column layout */}
      <div className="relative z-10 min-h-screen flex items-center px-6 sm:px-10 lg:px-20 py-32">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — Text Content */}
          <div className="flex flex-col items-center text-center  animate-fade-in order-2 lg:order-1">
            {/* Greeting badge */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </div> */}

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight mb-4 animate-slide-up delay-200 whitespace-nowrap">
              Udit Kumar{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Tiwari
              </span>
            </h1>

            {/* Typing animation */}
            <div className="mb-5 animate-slide-up delay-300">
              <CustomTypeAnimation />
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mb-8 animate-slide-up delay-400">
              Crafting exceptional digital experiences with modern technologies.
              Specializing in{" "}
              <span className="text-purple-400 font-semibold">React</span>,{" "}
              <span className="text-purple-400 font-semibold">Node.js</span>,{" "}
              <span className="text-purple-400 font-semibold">Next.js</span>,{" "}
              <span className="text-purple-400 font-semibold">
                Full Stack Development
              </span>
              , and{" "}
              <span className="text-purple-400 font-semibold">
                AI Application Development
              </span>
              . Turning ideas into scalable, beautiful applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-slide-up delay-500">
              <a
                href="#projects"
                className="group relative px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-base transition-all duration-300 overflow-hidden shadow-lg hover:shadow-purple-500/50 active:scale-95 cursor-pointer"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#contact"
                className="group relative px-8 py-3.5 bg-transparent border-2 border-purple-500 rounded-xl text-white font-semibold text-base transition-all duration-300 overflow-hidden shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Get In Touch
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>

            {/* Social Icons */}
            <SocialIcons variant="home" />
          </div>

          {/* RIGHT — Large Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-scale-in">
            <div className="relative group w-full max-w-sm sm:max-w-md lg:max-w-lg">
              {/* Glowing halo */}
              <div className="absolute -inset-6 bg-gradient-to-br from-purple-600/50 via-pink-500/30 to-cyan-500/40 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-800/40 backdrop-blur-sm shadow-2xl">
                {/* Portrait image — tall aspect ratio */}
                <div className="relative h-[350px] md:h-[500px] w-full">
                  <Image
                    src="/assets/udit_passport.jpg"
                    alt="Udit Kumar Tiwari - Full Stack Developer"
                    fill
                    sizes="(max-width: 440px) 60vw, (max-width: 1024px) 35vw, 512px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Bottom gradient overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" /> */}
                </div>

                {/* Stats row */}
                {/* <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-slate-900/60">
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
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-scroll-indicator" />
        </div>
      </div> */}

      {/* Bottom Wave */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
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
      </div> */}
    </section>
  );
};

export default Home;
