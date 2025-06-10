import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Custom typing animation component
  const CustomTypeAnimation = () => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const texts = ['Web Developer', 'Front-End Enthusiast', 'UI/UX Designer', 'React Specialist'];
    
    useEffect(() => {
      const currentFullText = texts[currentIndex];
      
      const timeout = setTimeout(() => {
        if (!isDeleting) {
          if (currentText.length < currentFullText.length) {
            setCurrentText(currentFullText.substring(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        }
      }, isDeleting ? 50 : 100);
      
      return () => clearTimeout(timeout);
    }, [currentText, currentIndex, isDeleting]);
    
    return (
      <div className="text-xl md:text-2xl font-semibold text-purple-400 mb-4">
        <span className="text-purple-300">
          {currentText}
          <span className="animate-pulse text-purple-400">|</span>
        </span>
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`
          }}
        />
        
        {/* Professional Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border border-purple-500 rounded-lg rotate-12"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-blue-500 rounded-full"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 border border-purple-400 rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 border border-blue-400 rounded-full"></div>
        </div>
      </div>

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      >
        <source src="/assets/blackBackgroundAnimation.mp4" type="video/mp4" />
      </video>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Profile Section */}
        <motion.div 
          className="relative mb-12"
          variants={itemVariants}
        >
          {/* Professional Profile Image */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto">
            {/* Subtle Gradient Border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 p-1">
                <img
                  src="/assets/udit_passport.jpg"
                  alt="Udit Kumar Tiwari"
                  className="w-full h-full rounded-full object-cover shadow-2xl"
                />
              </div>
            </div>
            
            {/* Professional Status Indicator */}
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg">
              <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        {/* Professional Name */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Udit Kumar Tiwari
          </h1>
        </motion.div>

        {/* Professional Role */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <CustomTypeAnimation />
        </motion.div>

        {/* Professional Description */}
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mb-10"
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light text-center">
            Passionate about crafting beautiful and responsive websites with a focus 
            on clean code and modern design. Skilled in{" "}
            <span className="text-purple-400 font-medium">React</span>,{" "}
            <span className="text-purple-400 font-medium">JavaScript</span>, and{" "}
            <span className="text-purple-400 font-medium">Tailwind CSS</span>.
          </p>
        </motion.div>

        {/* Professional CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#projects"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work
          </motion.a>
          
          <motion.a
            href="#contact"
            className="px-8 py-3 bg-transparent border-2 border-purple-500 hover:bg-purple-500 rounded-lg text-white font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-32 md:h-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.8)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.8)" />
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