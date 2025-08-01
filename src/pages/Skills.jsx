import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// 3D Icon component with cursor tracking - Memoized for performance
const Icon3D = memo(({ children, isHovered, mouseX, mouseY, isMobile }) => {
  const ref = useRef(null);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  
  const springConfig = useMemo(() => ({ stiffness: 150, damping: 15, mass: 0.1 }), []);
  const x = useSpring(rotateY, springConfig);
  const y = useSpring(rotateX, springConfig);

  // Memoized animation configurations
  const mobileAnimation = useMemo(() => ({
    rotateY: isHovered ? [0, 10, -10, 0] : 0,
    rotateX: isHovered ? [0, 5, -5, 0] : 0,
    z: isHovered ? 20 : 0,
  }), [isHovered]);

  const desktopAnimation = useMemo(() => ({
    z: isHovered ? 30 : 0,
    scale: isHovered ? 1.1 : 1,
  }), [isHovered]);

  const transition = useMemo(() => ({ 
    duration: isMobile ? 1.5 : 0.3,
    repeat: isMobile && isHovered ? Infinity : 0,
    ease: "easeInOut"
  }), [isMobile, isHovered]);

  return (
    <motion.div
      ref={ref}
      className="relative perspective-1000"
      style={{
        rotateX: isMobile ? 0 : y,
        rotateY: isMobile ? 0 : x,
        transformStyle: "preserve-3d",
      }}
      animate={isMobile ? mobileAnimation : desktopAnimation}
      transition={transition}
    >
      <div className="relative transform-gpu" style={{ transformStyle: "preserve-3d" }}>
        {children}
        {/* Shadow/depth effect */}
        <div 
          className="absolute inset-0 bg-black/20 blur-sm rounded-2xl"
          style={{ 
            transform: "translateZ(-10px) scale(0.95)",
            opacity: isHovered ? 0.3 : 0.1 
          }}
        />
      </div>
    </motion.div>
  );
});

Icon3D.displayName = 'Icon3D';

const SkillCard = memo(({ skill, index, categoryColor, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((event) => {
    if (!isMobile) {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    }
  }, [isMobile, mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleTouchStart = useCallback(() => setIsHovered(true), []);
  const handleTouchEnd = useCallback(() => setIsHovered(false), []);

  // Memoized animation variants
  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, delay: index * 0.05 }
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 }
    }
  }), [index]);

  // Memoized gradient colors to prevent recalculation
  const gradientColors = useMemo(() => {
    const colors = categoryColor.split(' ');
    return {
      from: colors[1], // e.g., "from-purple-500"
      to: colors[3]    // e.g., "to-blue-500"
    };
  }, [categoryColor]);

  // Memoized background animation
  const backgroundAnimation = useMemo(() => 
    isHovered ? [
      `linear-gradient(45deg, ${gradientColors.from}, ${gradientColors.to})`,
      `linear-gradient(135deg, ${gradientColors.to}, ${gradientColors.from})`,
      `linear-gradient(45deg, ${gradientColors.from}, ${gradientColors.to})`
    ] : undefined
  , [isHovered, gradientColors]);

  // Memoized text animation
  const textAnimation = useMemo(() => ({
    background: isHovered ? 
      `linear-gradient(45deg, rgb(168, 85, 247), rgb(6, 182, 212))` : 
      'transparent',
    backgroundClip: isHovered ? 'text' : 'unset',
    WebkitBackgroundClip: isHovered ? 'text' : 'unset',
    color: isHovered ? 'transparent' : undefined
  }), [isHovered]);

  // Memoized particles for performance
  const particles = useMemo(() => 
    isHovered ? [...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
        style={{
          left: `${20 + Math.random() * 60}%`,
          top: `${20 + Math.random() * 60}%`,
        }}
        animate={{
          y: [-10, -20, -10],
          x: [-5, 5, -5],
          opacity: [0, 1, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut"
        }}
      />
    )) : []
  , [isHovered]);

  return (
    <motion.div
      className="group relative cursor-pointer"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Animated background gradient - optimized */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          animate={{ background: backgroundAnimation }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />
        
        {/* 3D Icon Container */}
        <div className="relative z-10 mb-4 flex justify-center">
          <Icon3D 
            isHovered={isHovered} 
            mouseX={mouseX} 
            mouseY={mouseY}
            isMobile={isMobile}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColor} flex items-center justify-center text-3xl shadow-2xl border border-white/20`}>
              <span className="drop-shadow-2xl filter brightness-110">{skill.icon}</span>
            </div>
          </Icon3D>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.h4 
            className="text-lg font-bold text-gray-800 dark:text-white mb-2 transition-all duration-200"
            animate={textAnimation}
          >
            {skill.name}
          </motion.h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Floating particles - only render when hovered */}
        {particles.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {particles}
          </div>
        )}

        {/* Glow effect - optimized */}
        <motion.div 
          className={`absolute -inset-1 bg-gradient-to-r ${categoryColor} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}
          animate={{
            opacity: isHovered ? [0.2, 0.4, 0.2] : 0
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />
      </div>
    </motion.div>
  );
});

SkillCard.displayName = 'SkillCard';

const SkillCategory = memo(({ title, data, index, isMobile }) => {
  // Memoized animation variants
  const categoryVariants = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 }
    }
  }), [index]);

  const headerVariants = useMemo(() => ({
    hover: { 
      scale: 1.1, 
      rotateY: 180,
      transition: { duration: 0.5 }
    }
  }), []);

  const lineVariants = useMemo(() => ({
    initial: { width: 0 },
    animate: { 
      width: "5rem",
      transition: { duration: 0.8, delay: index * 0.1 + 0.3 }
    }
  }), [index]);

  return (
    <motion.div
      className="mb-16"
      variants={categoryVariants}
      initial="initial"
      animate="animate"
    >
      {/* Category Header */}
      <div className="flex items-center mb-8">
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center text-3xl mr-6 shadow-xl border border-white/20`}
          variants={headerVariants}
          whileHover="hover"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="drop-shadow-lg">{data.icon}</span>
        </motion.div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>
          <motion.div 
            className={`h-1 bg-gradient-to-r ${data.color} rounded-full`}
            variants={lineVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.skills.map((skill, skillIndex) => (
          <SkillCard 
            key={skill.name} 
            skill={skill} 
            index={skillIndex} 
            categoryColor={data.color}
            isMobile={isMobile}
          />
        ))}
      </div>
    </motion.div>
  );
});

SkillCategory.displayName = 'SkillCategory';

// Memoized floating elements for better performance
const FloatingElements = memo(() => {
  const elements = useMemo(() => 
    [...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-20"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          opacity: [0.1, 0.4, 0.1],
          scale: [0.5, 1.2, 0.5],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut"
        }}
      />
    )), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements}
    </div>
  );
});

FloatingElements.displayName = 'FloatingElements';

const Skills = memo(() => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device - optimized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    const debouncedResize = debounce(checkMobile, 100);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // Debounce utility
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Memoized themes
  const themes = useMemo(() => [
    { 
      accent: 'purple', 
      gradient: 'from-purple-600 to-blue-600',
      skillGradient: 'from-purple-500 to-blue-500',
      bgGradient: 'from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
    },
    { 
      accent: 'emerald', 
      gradient: 'from-emerald-600 to-teal-600',
      skillGradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
    },
    { 
      accent: 'rose', 
      gradient: 'from-rose-600 to-pink-600',
      skillGradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20'
    },
    { 
      accent: 'amber', 
      gradient: 'from-amber-600 to-orange-600',
      skillGradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20'
    }
  ], []);

  const currentThemeConfig = useMemo(() => themes[currentTheme], [themes, currentTheme]);

  // Enhanced skills data with your requested additions - memoized
  const skillsData = useMemo(() => ({
    "Frontend Development": {
      icon: "🎨",
      color: currentThemeConfig.skillGradient,
      skills: [
        { name: "HTML5", icon: "🌐", description: "Semantic markup & modern standards" },
        { name: "CSS3", icon: "🎭", description: "Advanced styling & animations" },
        { name: "JavaScript", icon: "⚡", description: "Modern ES6+ features" },
        { name: "React", icon: "⚛️", description: "Component-based architecture" },
        { name: "Redux", icon: "🔄", description: "State management" },
        { name: "Tailwind CSS", icon: "🎨", description: "Utility-first framework" },
        { name: "Framer Motion", icon: "🎬", description: "Smooth animations" }
      ]
    },
    "Backend & Databases": {
      icon: "⚙️",
      color: currentThemeConfig.skillGradient,
      skills: [
        { name: "Node.js", icon: "🟢", description: "Server-side JavaScript runtime" },
        { name: "Express", icon: "🚂", description: "Fast web framework" },
        { name: "MongoDB", icon: "🍃", description: "NoSQL database" },
        { name: "MySQL", icon: "🐬", description: "Relational database" },
        { name: "Firebase", icon: "🔥", description: "Backend-as-a-Service" },
        { name: "Supabase", icon: "⚡", description: "Open source Firebase alternative" }
      ]
    },
    "Cloud & Services": {
      icon: "☁️",
      color: currentThemeConfig.skillGradient,
      skills: [
        { name: "Vercel", icon: "▲", description: "Deployment platform" },
        { name: "Render", icon: "🚀", description: "Cloud application platform" },
        { name: "Cloudinary", icon: "☁️", description: "Media management service" },
        { name: "Razorpay", icon: "💳", description: "Payment gateway integration" }
      ]
    },
    "Programming Languages": {
      icon: "💻",
      color: currentThemeConfig.skillGradient,
      skills: [
        { name: "JavaScript", icon: "📜", description: "Dynamic programming language" },
        { name: "Python", icon: "🐍", description: "Versatile & powerful" },
        { name: "C", icon: "🔧", description: "System programming" },
        { name: "C++", icon: "⚒️", description: "Object-oriented programming" },
        { name: "Java", icon: "☕", description: "Enterprise development" }
      ]
    },
    "Tools & Technologies": {
      icon: "🛠️",
      color: currentThemeConfig.skillGradient,
      skills: [
        { name: "Git & GitHub", icon: "🌿", description: "Version control & collaboration" },
        { name: "PyInstaller", icon: "📦", description: "Python app bundler" },
        { name: "DOM Manipulation", icon: "🎯", description: "Dynamic web interactions" },
        { name: "REST APIs", icon: "🔗", description: "Web service integration" }
      ]
    }
  }), [currentThemeConfig.skillGradient]);

  // Optimized theme switching with longer intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme(prev => (prev + 1) % themes.length);
    }, 15000); // Increased from 12s to 15s
    return () => clearInterval(interval);
  }, [themes.length]);

  // Memoized header animation variants
  const headerVariants = useMemo(() => ({
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }), []);

  const iconVariants = useMemo(() => ({
    animate: { 
      rotateY: [0, 360],
      scale: [1, 1.1, 1]
    },
    transition: { 
      duration: 4, 
      repeat: Infinity, 
      repeatDelay: 4 
    }
  }), []);

  const lineVariants = useMemo(() => ({
    initial: { width: 0 },
    animate: { 
      width: "8rem",
      transition: { duration: 1.2, delay: 0.4 }
    }
  }), []);

  return (
    <section
      id="skills"
      className="relative py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen overflow-hidden"
    >
      <FloatingElements />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={headerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="inline-block mb-6"
            animate={iconVariants.animate}
            transition={iconVariants.transition}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className={`w-20 h-20 bg-gradient-to-br ${currentThemeConfig.gradient} rounded-2xl flex items-center justify-center text-4xl shadow-2xl transform-gpu border border-white/20`}>
              <span className="drop-shadow-2xl">💫</span>
            </div>
          </motion.div>
          
          <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${currentThemeConfig.gradient} bg-clip-text text-transparent mb-6`}>
            Technical Arsenal
          </h2>
          
          <motion.div
            className={`w-32 h-2 bg-gradient-to-r ${currentThemeConfig.gradient} mx-auto rounded-full mb-8`}
            variants={lineVariants}
            initial="initial"
            animate="animate"
          />
          
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with cutting-edge technologies and creative innovation
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {Object.entries(skillsData).map(([category, data], index) => (
            <SkillCategory
              key={category}
              title={category}
              data={data}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;