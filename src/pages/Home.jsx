import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
// import blackBackgroundAnimation from "../images/blackBackgroundAnimation.mp4";

const Home = () => {
  return (
    <header
      className="
        relative 
        overflow-hidden 
        pt-28    /* Ensures there's space below the navbar */
        font-['Poppins']  /* Use Poppins font (ensure it's imported globally) */
      "
    >
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900"></div>
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/blackBackgroundAnimation.mp4" type="video/mp4" />
      </video>
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-32 md:py-40 px-6">
        {/* Profile Image with Gradient Ring */}
        <motion.div
          className="relative w-48 h-48 md:w-56 md:h-56 rounded-full shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Pulsing Gradient Ring */}
          <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-r from-pink-500 to-yellow-500 animate-pulse">
            <img
              src="/assets/udit_passport.jpg"
              alt="Udit Kumar Tiwari"
              className="rounded-full w-full h-full object-cover border-4 border-white dark:border-gray-800"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="mt-8 text-5xl md:text-6xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Udit Kumar Tiwari
        </motion.h1>

        {/* Static Title */}
        <motion.h2
          className="mt-2 text-xl md:text-2xl text-gray-200 dark:text-gray-300 font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Web Developer | Front-End Enthusiast
        </motion.h2>

        {/* Subtitle / Description */}
        <motion.p
          className="mt-4 text-lg md:text-xl max-w-2xl text-gray-100 dark:text-gray-400 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Passionate about crafting beautiful and responsive websites with a focus 
          on clean code and modern design. Skilled in <strong>React</strong>,{" "}
          <strong>JavaScript</strong>, and <strong>Tailwind CSS</strong>. 
          Always eager to learn and explore new horizons.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-white font-semibold rounded-full shadow hover:shadow-lg hover:-translate-y-1 transform transition"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-pink-500 dark:bg-pink-600 text-white font-semibold rounded-full shadow hover:shadow-lg hover:-translate-y-1 transform transition"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Bottom Wave Shape */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden text-white">
        <svg
          viewBox="0 0 1440 320"
          fill="currentColor"
          className="w-full h-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="1"
            d="M0,64L48,74.7C96,85,192,107,288,133.3C384,160,480,192,576,202.7C672,213,768,203,864,192C960,181,1056,171,1152,186.7C1248,203,1344,245,1392,266.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default Home;
