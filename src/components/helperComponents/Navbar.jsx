"use client"
import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { DarkModeContext } from "@/contexts/DarkModeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);

  // Theme configurations matching the Home component
  const themes = [
    { accent: 'purple', gradient: 'from-purple-600 to-blue-600' },
    { accent: 'emerald', gradient: 'from-emerald-600 to-teal-600' },
    { accent: 'rose', gradient: 'from-rose-600 to-pink-600' },
    { accent: 'amber', gradient: 'from-amber-600 to-orange-600' }
  ];

  const currentThemeConfig = themes[currentTheme];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

  // Dynamic classes based on theme
  const getAccentColor = (opacity = '') => {
    const colors = {
      purple: `text-purple-500${opacity}`,
      emerald: `text-emerald-500${opacity}`,
      rose: `text-rose-500${opacity}`,
      amber: `text-amber-500${opacity}`
    };
    return colors[currentThemeConfig.accent];
  };

  const getHoverColor = () => {
    const colors = {
      purple: 'hover:text-purple-400',
      emerald: 'hover:text-emerald-400',
      rose: 'hover:text-rose-400',
      amber: 'hover:text-amber-400'
    };
    return colors[currentThemeConfig.accent];
  };

  const getGradientBg = () => {
    return `bg-gradient-to-r ${currentThemeConfig.gradient}`;
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-white/20' 
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo Section */}
          <motion.a
            href="#home"
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated Logo Container */}
            <div className="relative">
              <div className={`absolute inset-0 ${getGradientBg()} rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
              <img
                src="/assets/iconImage.png"
                alt="Logo"
                className="relative h-12 w-12 rounded-full object-cover border-2 border-white/20 shadow-lg"
              />
              {/* Active indicator */}
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getGradientBg()} rounded-full border-2 border-white shadow-md`}>
                <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Udit's Portfolio
              </span>
              <span className={`text-xs ${getAccentColor()} font-medium tracking-wider`}>
                Web Developer
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`relative text-white/90 ${getHoverColor()} transition-all duration-300 font-medium text-sm tracking-wide uppercase group`}
                  >
                    {item}
                    {/* Animated underline */}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${getGradientBg()} transition-all duration-300 group-hover:w-full`}></span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Dark Mode Toggle - Desktop */}
            <motion.button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode & Theme"
              className="relative p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="text-yellow-400 w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="text-blue-300 w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Theme indicator dots */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {themes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentTheme 
                        ? `${getGradientBg()}` 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed top-20 right-4 w-72 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-50 md:hidden overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Menu Header */}
              <div className={`${getGradientBg()} p-4`}>
                <h3 className="text-white font-semibold text-lg">Navigation</h3>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className={`block p-3 rounded-lg text-white/90 ${getHoverColor()} transition-all duration-300 hover:bg-white/5 group`}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="flex items-center justify-between">
                      {item}
                      <span className={`w-0 h-0.5 ${getGradientBg()} transition-all duration-300 group-hover:w-6`}></span>
                    </span>
                  </motion.a>
                ))}

                {/* Mobile Dark Mode Toggle */}
                <motion.button
                  onClick={() => {
                    toggleDarkMode();
                    setIsOpen(false);
                  }}
                  className="w-full p-3 mt-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex items-center justify-between group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-white/90 flex items-center space-x-3">
                    {darkMode ? (
                      <Sun className="text-yellow-400 w-5 h-5" />
                    ) : (
                      <Moon className="text-blue-300 w-5 h-5" />
                    )}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </span>
                  
                  {/* Theme dots */}
                  <div className="flex space-x-1">
                    {themes.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTheme 
                            ? `${getGradientBg()}` 
                            : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;