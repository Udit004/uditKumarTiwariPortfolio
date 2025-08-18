"use client"
import React, { useState, useEffect, useContext, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Download, Eye, Code2, Zap } from "lucide-react";

// Note: Import DarkModeContext from your actual context file path
import { DarkModeContext } from "@/contexts/DarkModeContext";

const projects = [
  {
    title: "Alumni Networking App",
  image: "/assets/alumni_project_image.jpg",
    description:
      "A full-stack platform for alumni and students to connect, share opportunities, and network. Features user authentication, profile management, and a discussion forum.",
    technologies: [
      "React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase", "Redux"
    ],
    category: "Full-Stack",
    featured: true,
    liveLink: "https://alumni-networking.vercel.app/",
    githubLink: "https://github.com/Udit004/alumni-networking.git",
  },
  {
    title: "Advanced To-Do List",
  image: "/assets/Advance_todo_list.jpg",
    description:
      "An advanced, AI-powered Progressive Web App (PWA) for task management. Includes intelligent priority prediction using Machine Learning, Gemini AI integration for productivity assistance, real-time collaboration via Socket.IO, and full notification support.",
    technologies: [
      "MERN Stack", "JavaScript", "Tailwind CSS", "Framer Motion", "Socket.IO", "Gemini AI", "Machine Learning"
    ],
    category: "AI-Powered",
    featured: true,
    liveLink: "https://advance-to-do-list-app.vercel.app/",
    githubLink: "https://github.com/Udit004/Advance-to-do-list-app",
  },
  {
    title: "Coachlix AI Fitness Coaching",
  image: "/assets/Coachlix_AI_Fitness_Coaching.jpg",
    description:
      "A smart Progressive Web App (PWA) designed to empower users in their fitness journey through AI-powered coaching. Coachlix offers personalized workout and diet plan management, real-time interaction with a Gemini AI chatbot.",
    technologies: [
      "Next.js", "JavaScript", "Tailwind CSS", "Firebase", "Gemini AI", "MongoDB", "PWA"
    ],
    category: "AI-Powered",
    featured: true,
    liveLink: "https://coachlix-ai-fitness-coaching.vercel.app/",
    githubLink: "https://github.com/Udit004/coachlix-ai-fitness-coaching",
  },
  {
    title: "Portfolio Website",
  image: "/assets/portfolio_image2.jpg",
    description:
      "A responsive, modern portfolio showcasing my projects, skills, and contact information. Features smooth animations, dark/light mode, and a clean UI.",
    technologies: [
      "React", "Tailwind CSS", "Framer Motion", "React Icons"
    ],
    category: "Frontend",
    featured: false,
    liveLink: "https://uditportfolio-six.vercel.app/",
    githubLink: "https://github.com/Udit004/Udit004.github.io.git",
  },
  {
    title: "Badminton Academy",
  image: "/assets/Badminton_Academy.jpg",
    description:
      "A dynamic sports academy website showcasing training programs, coach profiles, and class schedules. Includes animated UI elements and responsive design for seamless browsing on all devices.",
    technologies: [
      "React", "Tailwind CSS", "React Router", "SwiperJS", "Framer Motion"
    ],
    category: "Frontend",
    featured: false,
    liveLink: "https://badminton-academy-chi.vercel.app/",
    githubLink: "https://github.com/Udit004/Badminton-Academy",
  },
  {
    title: "EU Citizen Wallet Portal",
  image: "/assets/EU_Citizen_Wallet_Portal.jpg",
    description:
      "A secure and user-friendly digital wallet platform designed for EU citizens to manage personal documents online. This web application features DigiLocker-style document storage using Supabase for database and authentication.",
    technologies: [
      "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Cloudinary"
    ],
    category: "Full-Stack",
    featured: false,
    liveLink: "https://lovable.dev/projects/0b75f41c-da58-4a55-a037-874482b53fb9",
    githubLink: "https://github.com/Udit004/eu-citizen-wallet-portal",
  },
  {
    title: "Task Automation App",
  image: "/assets/window-task-automator.png",
    description:
      "A Python GUI tool to automate repetitive Windows tasks (file operations, app launches, etc.). Saves time with customizable workflows and one-click execution.",
    technologies: [
      "Python", "Tkinter", "PyInstaller"
    ],
    category: "Desktop App",
    featured: false,
    downloadLink: "https://github.com/Udit004/automated-window-task/releases/download/v1.0/automate.window.task.installer.exe",
    githubLink: "https://github.com/Udit004/automated-window-task.git",
  },
  {
    title: "Rock Paper Scissors Game",
  image: "/assets/rock_papper_scissor_screenshort.png",
    description:
      "An interactive browser-based game with score tracking, dynamic UI feedback, and a fun minimalist design. Play against the computer in real-time.",
    technologies: [
      "HTML5", "CSS3", "JavaScript"
    ],
    category: "Game",
    featured: false,
    liveLink: "https://udit004.github.io/Rock-Paper-Scissor-Game-/",
    githubLink: "https://github.com/Udit004/Rock-Paper-Scissor-Game-.git",
  },
  {
    title: "Simple Calculator",
  image: "/assets/Calculator_screenshort.png",
    description:
      "A lightweight calculator with basic arithmetic operations (+, -, ×, ÷) and a sleek, responsive interface. Built for quick calculations.",
    technologies: [
      "HTML5", "CSS3", "JavaScript"
    ],
    category: "Utility",
    featured: false,
    liveLink: "https://udit004.github.io/simple-Calculator/",
    githubLink: "https://github.com/Udit004/simple-Calculator.git",
  },
];

// Memoized ProjectCard component for better performance
const ProjectCard = memo(({ project, index, currentThemeConfig }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  // Optimized animation variants - reduced complexity
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.03,
        ease: "easeOut"
      }
    },
    hover: {
      y: -6,
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }), [index]);

  const imageVariants = useMemo(() => ({
    initial: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }), []);

  // Memoized gradient styles to prevent recalculation
  const gradientStyles = useMemo(() => ({
    border: `bg-gradient-to-r ${currentThemeConfig.borderGradient}`,
    button: `bg-gradient-to-r ${currentThemeConfig.buttonGradient}`,
    card: `bg-gradient-to-r ${currentThemeConfig.cardGradient}`
  }), [currentThemeConfig]);

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 will-change-transform ${project.featured ? 'lg:col-span-2' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      layout
    >
      {/* Optimized gradient border - only shows on hover */}
      <motion.div 
        className={`absolute -inset-px ${gradientStyles.border} rounded-2xl opacity-0 will-change-opacity`}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 h-full">
        {/* Featured Badge */}
        {project.featured && (
          <motion.div 
            className={`absolute top-4 right-4 px-3 py-1 rounded-full ${gradientStyles.button} text-white text-xs font-bold flex items-center gap-1 z-10`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Zap size={12} />
            Featured
          </motion.div>
        )}

        {/* Project Image with lazy loading and fallback */}
        <div className="relative overflow-hidden rounded-xl mb-6 aspect-video bg-gray-100 dark:bg-gray-800">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl" />
          )}
          <motion.img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover will-change-transform transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            variants={imageVariants}
            animate={isHovered ? "hover" : "initial"}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={(e) => {
              e.target.src = '/assets/placeholder-project.jpg'; // fallback image
              setImageLoaded(true);
            }}
          />
          
          {/* Overlay - only renders when hovered */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex gap-3">
                  {project.liveLink && (
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.05 }}
                    >
                      <Eye size={18} />
                    </motion.a>
                  )}
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Code2 size={18} />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <motion.h3 
              className="text-xl font-bold text-gray-800 dark:text-white"
              animate={isHovered ? {
                backgroundImage: `linear-gradient(to right, ${currentThemeConfig.gradient.replace('from-', '').replace('to-', '')})`,
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              } : {
                color: 'inherit'
              }}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.h3>
            <span className={`px-2 py-1 rounded-lg ${gradientStyles.card} text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap`}>
              {project.category}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technologies - Memoized to prevent re-renders */}
          {useMemo(() => (
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, project.featured ? 6 : 4).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className={`px-3 py-1 text-xs font-medium ${gradientStyles.card} text-gray-700 dark:text-gray-200 rounded-full border border-white/20 dark:border-gray-600/30`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + techIndex * 0.02 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > (project.featured ? 6 : 4) && (
                <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 rounded-full">
                  +{project.technologies.length - (project.featured ? 6 : 4)} more
                </span>
              )}
            </div>
          ), [project.technologies, project.featured, gradientStyles.card])}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {project.liveLink && (
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 ${gradientStyles.button} text-white font-medium rounded-xl transition-all duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} />
                Live Demo
              </motion.a>
            )}
            {project.downloadLink && (
              <motion.a
                href={project.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                Download
              </motion.a>
            )}
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={16} />
              Code
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Memoized background elements to prevent unnecessary re-renders
const BackgroundElements = memo(({ currentThemeConfig }) => {
  const elements = useMemo(() => 
    [...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-80 h-80 bg-gradient-to-r ${currentThemeConfig.cardGradient} rounded-full filter blur-3xl opacity-5 will-change-transform`}
        style={{
          left: `${20 + (i * 25)}%`,
          top: `${10 + (i * 20)}%`,
        }}
        animate={{
          x: [-20, 20, -20],
          y: [-20, 20, -20],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 3,
        }}
      />
    )), [currentThemeConfig.cardGradient]
  );

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{elements}</div>;
});

BackgroundElements.displayName = 'BackgroundElements';

const Projects = memo(() => {
  const { darkMode } = useContext(DarkModeContext);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [filter, setFilter] = useState("All");

  // Theme configurations - memoized to prevent recalculation
  const themes = useMemo(() => [
    { 
      accent: 'purple', 
      gradient: 'from-purple-600 to-blue-600',
      cardGradient: 'from-purple-500/10 to-blue-500/10',
      borderGradient: 'from-purple-500/50 to-blue-500/50',
      buttonGradient: 'from-purple-500 to-blue-600'
    },
    { 
      accent: 'emerald', 
      gradient: 'from-emerald-600 to-teal-600',
      cardGradient: 'from-emerald-500/10 to-teal-500/10',
      borderGradient: 'from-emerald-500/50 to-teal-500/50',
      buttonGradient: 'from-emerald-500 to-teal-600'
    },
    { 
      accent: 'rose', 
      gradient: 'from-rose-600 to-pink-600',
      cardGradient: 'from-rose-500/10 to-pink-500/10',
      borderGradient: 'from-rose-500/50 to-pink-500/50',
      buttonGradient: 'from-rose-500 to-pink-600'
    },
    { 
      accent: 'amber', 
      gradient: 'from-amber-600 to-orange-600',
      cardGradient: 'from-amber-500/10 to-orange-500/10',
      borderGradient: 'from-amber-500/50 to-orange-500/50',
      buttonGradient: 'from-amber-500 to-orange-600'
    }
  ], []);

  const currentThemeConfig = useMemo(() => themes[currentTheme], [themes, currentTheme]);

  // Reduced theme transition interval for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme(prev => (prev + 1) % themes.length);
    }, 10000); // Increased interval
    return () => clearInterval(interval);
  }, [themes.length]);

  const categories = useMemo(() => ["All", "Full-Stack", "AI-Powered", "Frontend", "Desktop App", "Game", "Utility"], []);
  
  // Memoized filtered projects for better performance
  const filteredProjects = useMemo(() => 
    filter === "All" ? projects : projects.filter(project => project.category === filter),
    [filter]
  );

  const handleFilterChange = useCallback((category) => {
    setFilter(category);
  }, []);

  return (
    <motion.section
      id="projects"
      className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Optimized Background Elements */}
      <BackgroundElements currentThemeConfig={currentThemeConfig} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className={`w-20 h-20 bg-gradient-to-br ${currentThemeConfig.gradient} rounded-2xl flex items-center justify-center text-4xl shadow-xl`}>
              <span>🚀</span>
            </div>
          </motion.div>

          <motion.h2 
            className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${currentThemeConfig.gradient} bg-clip-text text-transparent mb-6`}
            key={currentTheme} // Force re-render for smooth color transition
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Featured Projects
          </motion.h2>

          <motion.div
            className={`w-32 h-2 bg-gradient-to-r ${currentThemeConfig.gradient} mx-auto rounded-full mb-8`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover my latest work and innovative solutions across various technologies
          </p>
        </motion.div>

        {/* Optimized Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                filter === category
                  ? `bg-gradient-to-r ${currentThemeConfig.buttonGradient} text-white shadow-lg scale-105`
                  : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-700/90 hover:scale-105'
              }`}
              whileTap={{ scale: 0.95 }}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.03,
                layout: { duration: 0.2 }
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={`${project.title}-${filter}`} 
                project={project} 
                index={index} 
                currentThemeConfig={currentThemeConfig}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
});

Projects.displayName = 'Projects';

export default Projects;