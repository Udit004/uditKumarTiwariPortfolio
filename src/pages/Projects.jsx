import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const projects = [
  {
    title: "Alumni Networking App",
    image: "/assets/alumni_project_image.jpg",
    description:
      "A full-stack platform for alumni and students to connect, share opportunities, and network. Features user authentication, profile management, and a discussion forum.",
    technologies:
      "React, Tailwind CSS, Node.js, Express, MongoDB, Firebase (Auth), Redux (State Management)",
    liveLink: "https://alumni-networking.vercel.app/",
    githubLink: "https://github.com/Udit004/alumni-networking.git",
  },
  {
    title: "Portfolio Website",
    image: "/assets/portfolio_image2.jpg",
    description: "A responsive, modern portfolio showcasing my projects, skills, and contact information. Features smooth animations, dark/light mode, and a clean UI.",
    technologies: "React, Tailwind CSS, Framer Motion (Animations), React Icons",
    liveLink: "https://uditportfolio-six.vercel.app/",
    githubLink: "https://github.com/Udit004/Udit004.github.io.git"
  },
  {
    title: "Badminton Academy",
    image: "/assets/Badminton_Academy.jpg",
    description:
      "A dynamic sports academy website showcasing training programs, coach profiles, and class schedules. Includes animated UI elements and responsive design for seamless browsing on all devices.",
    technologies: "React, Tailwind CSS, React Router, SwiperJS, Framer Motion",
    liveLink: "https://badminton-academy-chi.vercel.app/",
    githubLink: "https://github.com/Udit004/Badminton-Academy",
  },
  {
    title: "Advanced To-Do List",
    image: "/assets/Advance_todo_list.jpg",
    description:
      "A feature-rich task management application with priority sorting, due dates, progress tracking, and dark/light mode. Helps users organize personal and professional tasks efficiently.",
    technologies: "React, TypeScript, Tailwind CSS, Framer Motion, React Icons",
    liveLink: "https://advance-to-do-list-app.vercel.app/",
    githubLink: "https://github.com/Udit004/Advance-to-do-list-app",
  },
  {
    title: "Task Automation App",
    image: "/assets/window-task-automator.png",
    description: "A Python GUI tool to automate repetitive Windows tasks (file operations, app launches, etc.). Saves time with customizable workflows and one-click execution.",
    technologies: "Python, Tkinter (GUI), PyInstaller (Executable Packaging)",
    Download_latest_version:
      "https://github.com/Udit004/automated-window-task/releases/download/v1.0/automate.window.task.installer.exe",
    liveLink: "#",
    githubLink: "https://github.com/Udit004/automated-window-task.git",
  },
  {
    title: "Rock Paper Scissors Game",
    image: "/assets/rock_papper_scissor_screenshort.png",
    description: "An interactive browser-based game with score tracking, dynamic UI feedback, and a fun minimalist design. Play against the computer in real-time.",
    technologies: "HTML5, CSS3, JavaScript (DOM Manipulation)",
    liveLink: "https://udit004.github.io/Rock-Paper-Scissor-Game-/",
    githubLink: "https://github.com/Udit004/Rock-Paper-Scissor-Game-.git"
  },
  {
    title: "Simple Calculator",
    image: "/assets/Calculator_screenshort.png",
    description: "A lightweight calculator with basic arithmetic operations (+, -, ×, ÷) and a sleek, responsive interface. Built for quick calculations.",
    technologies: "HTML5, CSS3, JavaScript (Event Handling)",
    liveLink: "https://udit004.github.io/simple-Calculator/",
    githubLink: "https://github.com/Udit004/simple-Calculator.git"
  },
  {
    title: "To-Do List App",
    image: "/assets/to do list app screenshort.png",
    description: "A task manager with add/delete functionality, persistence via LocalStorage, and a clean, intuitive interface. Organize daily tasks effortlessly.",
    technologies: "HTML5, CSS3, JavaScript, LocalStorage API",
    liveLink: "#",
    githubLink: "https://github.com/Udit004/to-do-list-app.git",
  },
];

const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="py-24 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h3
            className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            My Projects
          </motion.h3>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            Explore my portfolio of innovative solutions and creative
            applications
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -15 },
                visible: { opacity: 1, y: 0, rotateX: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

              <div className="relative overflow-hidden rounded-xl mb-6">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.4 },
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.split(", ").map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-full border border-purple-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  {project.liveLink !== "#" && (
                    <motion.a
                      href={project.liveLink}
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                  )}
                  {project.liveLink === "#" &&
                    project.Download_latest_version && (
                      <motion.a
                        href={project.Download_latest_version}
                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download
                      </motion.a>
                    )}
                  <motion.a
                    href={project.githubLink}
                    className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 border border-gray-600"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
