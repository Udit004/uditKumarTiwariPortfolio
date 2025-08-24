"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const quotes = [
  "Code is like humor. When you have to explain it, it's bad. – Cory House",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Simplicity is the soul of efficiency. – Austin Freeman",
  "Talk is cheap. Show me the code. – Linus Torvalds",
  "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
  "The best error message is the one that never shows up. – Thomas Fuchs",
  "Programming isn't about what you know; it's about what you can figure out. – Chris Pine"
];

const About = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    { name: "React.js", color: "from-blue-500 to-cyan-400", icon: "⚛️", description: "Frontend Library" },
    { name: "Next.js", color: "from-black to-gray-600", icon: "▲", description: "React Framework" },
    { name: "JavaScript", color: "from-yellow-400 to-orange-500", icon: "🟨", description: "Programming Language" },
    { name: "Firebase", color: "from-blue-600 to-blue-400", icon: "🔥", description: "Type Safety" },
    { name: "Tailwind CSS", color: "from-purple-500 to-pink-500", icon: "🎨", description: "CSS Framework" },
    { name: "MongoDB", color: "from-green-500 to-emerald-400", icon: "🍃", description: "Database" },
    { name: "Node.js", color: "from-green-600 to-lime-500", icon: "🚀", description: "Backend Runtime" },
    { name: "Git", color: "from-orange-500 to-red-500", icon: "📦", description: "Version Control" }
  ];

  const achievements = [
    { icon: "🏆", text: "10+ Projects Completed" },
    { icon: "⭐", text: "Clean Code Advocate" },
    { icon: "🚀", text: "Performance Optimizer" },
    { icon: "🎯", text: "Problem Solver" }
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 py-20 overflow-hidden"
    >
      {/* Enhanced Animated Background Video */}
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
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60" />
      </div>

      {/* Enhanced Dynamic Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/25 to-cyan-500/25 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -20, 0],
            scale: [1, 0.7, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: "20%", right: "10%" }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "50%", right: "5%" }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 80, 0],
            y: [0, 40, -60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "30%", left: "5%" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            animate={{
              y: [-100, (typeof window !== 'undefined' ? window.innerHeight : 800) + 100],
              x: [Math.random() * 100, Math.random() * 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-100px`,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <motion.div
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              About Me
            </h2>
            <motion.div 
              className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Professional Profile Image Section */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative group">
                                 {/* Main Profile Container */}
                 <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 p-2 shadow-2xl hover:shadow-slate-400/20 transition-all duration-500">
                  {/* Subtle Ring Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 opacity-30 blur-sm group-hover:opacity-50 transition-all duration-700"></div>
                  
                  {/* Inner Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 shadow-inner border border-slate-600/30">
                    {/* Profile Image */}
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <Image
                        src="/assets/udit_image.jpg"
                        alt="Udit Kumar Tiwari - Full Stack Developer"
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-110 contrast-110"
                        priority
                      />
                      {/* Professional Overlay */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Subtle Outer Ring */}
                  <div className="absolute inset-0 rounded-full border border-slate-400/20 group-hover:border-slate-300/40 transition-colors duration-500"></div>
                </div>

                {/* Professional Badge Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-xl border border-slate-500/30 hover:shadow-slate-400/30 transition-all duration-300 group-hover:scale-105"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="opacity-90">
                      <path d="M13.5 2c-5.629 0-10.212 4.436-10.212 9.899 0 4.374 2.869 8.077 6.84 9.383.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0113.5 7.68a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0023.712 11.9C23.712 6.436 19.129 2 13.5 2z"/>
                    </svg>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-xl border border-slate-500/30 hover:shadow-slate-400/30 transition-all duration-300 group-hover:scale-105"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="w-7 h-7 bg-green-500 rounded-sm flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="opacity-90">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-2 -left-6 w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-500/30 hover:shadow-slate-400/30 transition-all duration-300 group-hover:scale-105"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="w-6 h-6 bg-purple-500 rounded-sm flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="opacity-90">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8s0 0 0 0l-6-6zM6 4h7v4h4v12H6V4z"/>
                      <path d="M8 12h8v2H8v-2z"/>
                      <path d="M8 16h8v2H8v-2z"/>
                      <path d="M8 8h2v2H8V8z"/>
                    </svg>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -right-6 w-13 h-13 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-500/30 hover:shadow-slate-400/30 transition-all duration-300 group-hover:scale-105"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <div className="w-6 h-6 bg-cyan-500 rounded-sm flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="opacity-90">
                      <path d="M12 2l2.39 7.36h7.74l-6.26 4.55 2.39 7.36L12 16.72l-6.26 4.55 2.39-7.36L2.87 9.36h7.74L12 2z"/>
                    </svg>
                  </div>
                </motion.div>

                {/* Subtle Background Glow */}
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-slate-500/10 to-slate-400/10 blur-2xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Professional Status Indicator */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-600/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-200 font-medium">Available</span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Content Section */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Introduction */}
              <div className="space-y-6">
                <motion.h3 
                  className="text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Hey! I'm{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Udit Kumar Tiwari
                  </span>
                </motion.h3>
                
                <motion.p 
                  className="text-xl text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  A passionate <strong className="text-purple-300">Full Stack Developer</strong> and{" "}
                  <strong className="text-cyan-300">Tech Innovator</strong> who transforms ideas into 
                  exceptional digital experiences. I specialize in crafting scalable, performant, 
                  and visually stunning web applications using cutting-edge technologies.
                </motion.p>
                
                <motion.p 
                  className="text-lg text-gray-400 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  My journey began with curiosity and evolved into a{" "}
                  <strong className="text-purple-300">relentless pursuit of excellence</strong>. 
                  I believe in writing elegant, maintainable code while delivering intuitive 
                  user experiences that leave lasting impressions.
                </motion.p>
              </div>

              {/* Achievements Grid */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 text-center hover:bg-white/15 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                  >
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <div className="text-sm font-medium text-gray-300">{achievement.text}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Beyond Code Section */}
              <motion.div 
                className="p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                  Beyond Code <span className="text-2xl">🎾⚽</span>
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  When I'm not crafting code, you'll find me dominating the badminton court, 
                  scoring goals on the football field, or exploring new destinations. I believe 
                  in maintaining a balanced lifestyle that fuels creativity and innovation.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Tech Stack Section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h4 className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
              <span className="text-3xl">🛠️</span>
              Tech Arsenal
              <span className="text-3xl">⚡</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={`relative group p-6 rounded-2xl bg-gradient-to-br ${tech.color} text-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden`}
                  whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
                  initial={{ opacity: 0, y: 30, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative text-center">
                    <motion.div 
                      className="text-4xl mb-3"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {tech.icon}
                    </motion.div>
                    <div className="font-bold text-lg mb-1">{tech.name}</div>
                    <div className="text-sm opacity-80">{tech.description}</div>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Quote Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h4 className="text-3xl font-bold text-white mb-8 flex items-center justify-center gap-3">
              <span className="text-2xl">💡</span>
              Daily Inspiration
              <span className="text-2xl">✨</span>
            </h4>
            <motion.div
              className="relative p-10 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/10 rounded-3xl border border-white/10 max-w-4xl mx-auto overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quote Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div
                className="relative"
                key={quoteIndex}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <div className="text-6xl text-purple-300/30 font-serif mb-4">"</div>
                <p className="italic text-gray-200 text-2xl font-medium leading-relaxed mb-6">
                  {quotes[quoteIndex]}
                </p>
                <div className="text-6xl text-cyan-300/30 font-serif rotate-180 float-right -mt-8">"</div>
              </motion.div>
              
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-50" 
                     style={{ width: `${((Date.now() % 5000) / 5000) * 100}%` }} />
              </motion.div>
              
              <p className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
                <span className="animate-pulse">🔄</span>
                Inspiration refreshes every 5 seconds
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;