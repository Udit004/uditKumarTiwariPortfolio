import React, { useState, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import profilePic from "../images/udit_image.jpg"; // Add your profile image here

const quotes = [
    "Code is like humor. When you have to explain it, it’s bad. – Cory House",
    "First, solve the problem. Then, write the code. – John Johnson",
    "Simplicity is the soul of efficiency. – Austin Freeman",
    "Talk is cheap. Show me the code. – Linus Torvalds",
    "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
  ];
  
  const About = () => {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [hovering, setHovering] = useState(false);
  
    // Change quote every 3s when hovered
    useEffect(() => {
      let interval;
      if (hovering) {
        interval = setInterval(() => {
          setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 3000);
      }
      return () => clearInterval(interval);
    }, [hovering]);
  
    return (
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3b0764] to-[#7e22ce] text-white px-8 overflow-hidden pt-24"
      >
        <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/purpleBackgroundAnimation.mp4" type="video/mp4" />
      </video>
        {/* Fix Navbar Overlap */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[-1]">
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl right-10 bottom-10"></div>
        </div>
  
        <motion.div
          className="max-w-5xl w-full bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-10 flex flex-col md:flex-row items-center gap-8 relative border border-white/20 z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Profile Image */}
          <motion.div
            className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg border-4 border-white flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={profilePic} alt="Udit Kumar Tiwari" className="w-full h-full object-cover" />
          </motion.div>
  
          {/* About Content */}
          <motion.div
            className="flex-1 text-center md:text-left font-['Inter']"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-6xl font-bold text-white mb-4 tracking-wide">About Me</h3>
            <p className="text-lg text-gray-200 leading-relaxed font-medium">
              Hey! I’m <strong>Udit Kumar Tiwari</strong>, a passionate **Web Developer** and **Tech Enthusiast**.  
              I specialize in **React.js, JavaScript, and Backend Development**, building clean, interactive, and high-performance web applications.
            </p>
            <p className="mt-4 text-gray-300 font-light">
              My journey in coding started from curiosity, and now it’s my **full-time obsession**.  
              I believe in writing **clean, scalable code** while ensuring a **beautiful user experience**.
            </p>
  
            {/* Hobbies & Interests */}
            <div className="mt-6">
              <h4 className="text-2xl font-semibold text-white mb-2">Beyond Code 🎾⚽</h4>
              <p className="text-gray-300 font-light">
                Outside of coding, I enjoy **playing badminton & football**, staying fit, and exploring new places.  
                I'm always up for **learning new skills** and **pushing my creative limits**.
              </p>
            </div>
  
            {/* Technologies */}
            <div className="mt-6">
              <h4 className="text-2xl font-semibold text-white mb-2">Tech Stack 🛠️</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm shadow-md font-semibold">
                  React.js
                </span>
                <span className="px-4 py-2 bg-yellow-500 text-black rounded-full text-sm shadow-md font-semibold">
                  JavaScript
                </span>
                <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm shadow-md font-semibold">
                  Tailwind CSS
                </span>
                <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm shadow-md font-semibold">
                  MongoDB
                </span>
                <span className="px-4 py-2 bg-red-600 text-white rounded-full text-sm shadow-md font-semibold">
                  Node.js
                </span>
              </div>
            </div>
  
            {/* Random Quote with Auto Change on Hover */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-white mb-2">💡 Inspiration:</h4>
              <p
                className="italic text-gray-300 text-lg font-medium cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                "{quotes[quoteIndex]}"
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    );
  };
  
  export default About;