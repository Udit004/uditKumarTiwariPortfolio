import React from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";


const projects = [
    {
      title: "Rock Paper Scissors Game",
      image: "/assets/rock_papper_scissor_screenshort.png",
      description: "A simple and interactive Rock Paper Scissors game.",
      technologies: "HTML, CSS, JavaScript",
      liveLink: "https://udit004.github.io/Rock-Paper-Scissor-Game-/",
      githubLink: "https://github.com/Udit004/Rock-Paper-Scissor-Game-.git",
    },
    {
      title: "Simple Calculator",
      image: "/assets/Calculator_screenshort.png",
      description: "A basic calculator created using HTML, CSS, and JavaScript.",
      technologies: "HTML, CSS, JavaScript",
      liveLink: "https://udit004.github.io/simple-Calculator/",
      githubLink: "https://github.com/Udit004/simple-Calculator.git",
    },
    {
      title: "To-Do List App",
      image: "/assets/to do list app screenshort.png",
      description: "A simple to-do list application for managing daily tasks.",
      technologies: "HTML, CSS, JavaScript, LocalStorage",
      liveLink: "#",
      githubLink: "https://github.com/Udit004/to-do-list-app.git",
    },
    {
      title: "Alumni Networking App",
      image: "/assets/alumni_project_image.jpg",
      description: "An alumni networking platform connecting alumni with students.",
      technologies: "React, Tailwind CSS, MongoDB, Express",
      liveLink: "https://alumni-networking.vercel.app/",
      githubLink: "https://github.com/Udit004/alumni-networking.git",
    },
    {
      title: "Portfolio Website",
      image: "/assets/portfolio_image2.jpg",
      description: "My personal portfolio showcasing my skills and projects.",
      technologies: "React, Tailwind CSS",
      liveLink: "https://uditportfolio-six.vercel.app/",
      githubLink: "https://github.com/Udit004/Udit004.github.io.git",
    },
    {
      title: "Task Automation App",
      image: "/assets/window-task-automator.png",
      description: "An automation tool that simplifies daily repetitive tasks.",
      technologies: "Python, Tkinter",
      Download_latest_version: "https://github.com/Udit004/automated-window-task/releases/download/v1.0/automate.window.task.installer.exe",
      liveLink: "#",
      githubLink: "https://github.com/Udit004/automated-window-task.git",
    },
  ];
  
  const Projects = () => {
    return (
      <motion.section
        id="projects"
        className="py-20 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        <div className="container mx-auto text-center">
          <motion.h3
            className="text-4xl font-extrabold text-white mb-10 tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Projects
          </motion.h3>
            
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white/90 p-6 rounded-lg shadow-2xl transform transition-all hover:scale-105 hover:shadow-xl"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                />
                <p className="mb-2 text-gray-700 font-medium">{project.description}</p>
                <p className="text-gray-600 mb-4 font-semibold">
                  <strong>Technologies:</strong> {project.technologies}
                </p>
  
                <div className="flex justify-center space-x-4">
                  {project.liveLink !== "#" && (
                    <a
                      href={project.liveLink}
                      className="text-blue-600 font-bold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  )}
                  {project.liveLink === "#" && project.Download_latest_version && (
                    <a
                      href={project.Download_latest_version}
                      className="text-green-600 font-bold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download App
                    </a>
                  )}
                  <a
                    href={project.githubLink}
                    className="text-red-600 font-bold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    );
  };
  
  export default Projects;
