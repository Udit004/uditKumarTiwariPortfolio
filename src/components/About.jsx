"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quotes = [
  "Code is like humor. When you have to explain it, it's bad. – Cory House",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Simplicity is the soul of efficiency. – Austin Freeman",
  "Talk is cheap. Show me the code. – Linus Torvalds",
  "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
];

const About = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    { name: "React.js", color: "from-blue-500 to-cyan-400", icon: "⚛️" },
    { name: "JavaScript", color: "from-yellow-400 to-orange-500", icon: "🟨" },
    { name: "Tailwind CSS", color: "from-purple-500 to-pink-500", icon: "🎨" },
    { name: "MongoDB", color: "from-green-500 to-emerald-400", icon: "🍃" },
    { name: "Node.js", color: "from-green-600 to-lime-500", icon: "🚀" },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 py-20 overflow-hidden"
    >
      {/* Animated Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      >
        <source src="/assets/purpleBackgroundAnimation.mp4" type="video/mp4" />
      </video>

      {/* Dynamic Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: "20%", right: "10%" }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "50%", right: "5%" }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <motion.div
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image Section */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative group">
                <div className="w-80 h-80 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                    <img
                      src="/assets/udit_image.jpg"
                      alt="Udit Kumar Tiwari"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  💻
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-xl shadow-lg"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  ⚡
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Introduction */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Hey! I'm{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Udit Kumar Tiwari
                  </span>
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A passionate <strong className="text-purple-300">Web Developer</strong> and{" "}
                  <strong className="text-cyan-300">Tech Enthusiast</strong> who loves creating
                  digital experiences that make a difference. I specialize in building clean,
                  interactive, and high-performance web applications using modern technologies.
                </p>
                <p className="text-gray-400">
                  My journey in coding started from curiosity, and now it's my{" "}
                  <strong className="text-purple-300">full-time obsession</strong>. I believe in
                  writing clean, scalable code while ensuring a beautiful user experience.
                </p>
              </div>

              {/* Beyond Code Section */}
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10">
                <h4 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                  Beyond Code <span className="text-2xl">🎾⚽</span>
                </h4>
                <p className="text-gray-300">
                  Outside of coding, I enjoy playing badminton & football, staying fit, and
                  exploring new places. I'm always up for learning new skills and pushing my
                  creative limits.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Tech Stack Section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h4 className="text-3xl font-semibold text-white mb-8 text-center flex items-center justify-center gap-2">
              Tech Stack <span className="text-2xl">🛠️</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={`relative group p-4 rounded-2xl bg-gradient-to-r ${tech.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{tech.icon}</div>
                    <div className="font-semibold text-sm">{tech.name}</div>
                  </div>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h4 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
              💡 Daily Inspiration
            </h4>
            <motion.div
              className="p-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-white/10 max-w-3xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="italic text-gray-300 text-xl font-medium leading-relaxed"
                key={quoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                "{quotes[quoteIndex]}"
              </motion.p>
              <p className="text-sm text-gray-500 mt-4">
                Quotes change automatically every 4 seconds
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;