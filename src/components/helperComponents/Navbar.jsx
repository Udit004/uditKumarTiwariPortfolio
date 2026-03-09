"use client"
import React, { useState, useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { throttle } from "../../lib/throttleDebounce";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [activeSection, setActiveSection] = useState('Home');
  const pathname = usePathname();
  const router = useRouter();
  const sectionCacheRef = useRef({}); // Cache section elements

  // Theme configurations matching the Home component
  const themes = [
    { accent: 'purple', gradient: 'from-purple-600 to-blue-600' },
    { accent: 'emerald', gradient: 'from-emerald-600 to-teal-600' },
    { accent: 'rose', gradient: 'from-rose-600 to-pink-600' },
    { accent: 'amber', gradient: 'from-amber-600 to-orange-600' }
  ];

  const currentThemeConfig = themes[currentTheme];

  // Navigation items based on current route
  const isHomeRoute = pathname === "/";

  // Optimized single scroll handler with throttling
  useEffect(() => {
    const handleScroll = throttle(() => {
      // Update scroll background
      setScrolled(window.scrollY > 20);

      // Detect active section (only on home route)
      if (isHomeRoute) {
        const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
        const scrollPosition = window.scrollY + 100;

        // Cache section elements to avoid repeated DOM queries
        const sectionIds = {};
        for (const section of sections) {
          if (!sectionCacheRef.current[section]) {
            sectionCacheRef.current[section] = document.getElementById(section);
          }
          sectionIds[section] = sectionCacheRef.current[section];
        }

        // Find active section
        for (const section of sections) {
          const element = sectionIds[section];
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
              break;
            }
          }
        }
      }
    }, 100); // Throttle to max once per 100ms

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomeRoute]);

  const navItems = isHomeRoute 
    ? ["Home", "About", "Skills", "Experience", "Projects", "Contact", "Blog"]
    : ["Portfolio", "Blog"];

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

  // Handle navigation click based on route
  const handleNavClick = (item) => {
    if (isHomeRoute) {
      if (item === "Blog") {
        router.push("/blog");
      } else {
        // Scroll to section for other items
        const element = document.getElementById(item.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // When not on home route
      if (item === "Portfolio") {
        router.push("/");
      } else if (item === "Blog") {
        router.push("/blog");
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? darkMode 
              ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-700/50' 
              : 'bg-gradient-to-r from-purple-600/75 via-indigo-600/65 to-purple-600/95 backdrop-blur-md shadow-lg border-b border-blue-400/30'
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo Section */}
          <Link href="/" prefetch={true} className="cursor-pointer">
            <motion.div
              className="flex items-center space-x-3 group cursor-pointer"
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
              {/* <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getGradientBg()} rounded-full border-2 border-white shadow-md`}>
                <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
              </div> */}
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col">
              <span className={`text-xl font-bold ${
                darkMode 
                  ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-purple-200 to-purple-500 bg-clip-text text-transparent'
              }`}>
                Udit's Portfolio
              </span>
              <span className={`text-xs font-medium tracking-wider ${
                darkMode ? 'text-purple-300' : 'text-white'
              }`}>
                Web Developer
              </span>
            </div>
            </motion.div>
          </Link>

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
                  {isHomeRoute && item !== "Blog" ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`relative transition-all duration-300 font-medium text-sm tracking-wide uppercase group cursor-pointer ${
                        activeSection === item
                          ? darkMode ? 'text-purple-400 font-bold' : 'text-purple-500 font-bold'
                          : darkMode 
                            ? 'text-purple-100 hover:text-purple-300'
                            : 'text-white hover:text-purple-200'
                      }`}
                    >
                      {item}
                      {/* Animated underline */}
                      <span className={`absolute -bottom-1 left-0 h-0.5 ${getGradientBg()} transition-all duration-300 ${
                        activeSection === item ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </button>
                  ) : (
                    <Link 
                      href={item === "Blog" ? "/blog" : item === "Portfolio" ? "/" : `/#${item.toLowerCase()}`}
                      prefetch={true}
                      className={`relative transition-all duration-300 font-medium text-sm tracking-wide uppercase group cursor-pointer ${
                        (item === "Blog" && pathname === "/blog") || (item === "Portfolio" && pathname === "/")
                          ? darkMode ? 'text-purple-400 font-bold' : 'text-purple-900 font-bold'
                          : darkMode 
                            ? 'text-purple-100 hover:text-purple-300'
                            : 'text-white hover:text-purple-200'
                      }`}
                    >
                      {item}
                      {/* Animated underline */}
                      <span className={`absolute -bottom-1 left-0 h-0.5 ${getGradientBg()} transition-all duration-300 ${
                        (item === "Blog" && pathname === "/blog") || (item === "Portfolio" && pathname === "/")
                          ? 'w-full'
                          : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>

            {/* Dark Mode Toggle - Desktop */}
            <motion.button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode & Theme"
              className={`relative p-3 rounded-full backdrop-blur-sm border transition-all duration-300 shadow-lg group cursor-pointer ${
                darkMode 
                  ? 'bg-slate-800/80 border-slate-600/50 hover:bg-slate-700/80'
                  : 'bg-white/90 border-blue-300/50 hover:bg-blue-50/90'
              }`}
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
                    <Moon className="text-blue-900 w-5 h-5" />
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
                        : darkMode ? 'bg-slate-400/40' : 'bg-gray-400/40'
                    }`}
                  />
                ))}
              </div>
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
              darkMode 
                ? 'bg-slate-800/80 border-slate-600/50 text-white hover:bg-slate-700/80'
                : 'bg-white/90 border-blue-300/50 text-white hover:bg-blue-50/90'
            }`}
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
              className={`fixed top-20 right-4 w-72 backdrop-blur-xl rounded-2xl shadow-2xl border z-50 md:hidden overflow-hidden ${
                darkMode 
                  ? 'bg-slate-900/95 border-white/10'
                  : 'bg-gradient-to-br from-blue-600/98 via-indigo-600/98 to-purple-600/98 border-blue-400/30'
              }`}
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    {isHomeRoute && item !== "Blog" ? (
                      <button
                        onClick={() => {
                          handleNavClick(item);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 group cursor-pointer ${
                          activeSection === item
                            ? darkMode ? 'text-purple-400 font-bold bg-purple-100/10' : 'text-purple-900 font-bold bg-purple-100/20'
                            : darkMode 
                              ? 'text-purple-100 hover:bg-slate-700/50 hover:text-purple-300'
                              : 'text-white hover:bg-white/20 hover:text-purple-200'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          {item}
                          <span className={`h-0.5 ${getGradientBg()} transition-all duration-300 ${
                            activeSection === item ? 'w-6' : 'w-0 group-hover:w-6'
                          }`}></span>
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={item === "Blog" ? "/blog" : item === "Portfolio" ? "/" : `/#${item.toLowerCase()}`}
                        prefetch={true}
                        onClick={() => setIsOpen(false)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 group cursor-pointer ${
                          (item === "Blog" && pathname === "/blog") || (item === "Portfolio" && pathname === "/")
                            ? darkMode ? 'text-purple-400 font-bold bg-purple-100/10' : 'text-purple-900 font-bold bg-purple-100/20'
                            : darkMode 
                              ? 'text-purple-100 hover:bg-slate-700/50 hover:text-purple-300'
                              : 'text-white hover:bg-white/20 hover:text-purple-200'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          {item}
                          <span className={`h-0.5 ${getGradientBg()} transition-all duration-300 ${
                            (item === "Blog" && pathname === "/blog") || (item === "Portfolio" && pathname === "/")
                              ? 'w-6'
                              : 'w-0 group-hover:w-6'
                          }`}></span>
                        </span>
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Mobile Dark Mode Toggle */}
                <motion.button
                  onClick={() => {
                    toggleDarkMode();
                    setIsOpen(false);
                  }}
                  className={`w-full p-3 mt-4 rounded-lg border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    darkMode 
                      ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50'
                      : 'bg-white/20 hover:bg-white/30 border-white/30'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className={`flex items-center space-x-3 ${
                    darkMode ? 'text-gray-100' : 'text-white'
                  }`}>
                    {darkMode ? (
                      <Sun className="text-yellow-400 w-5 h-5" />
                    ) : (
                      <Moon className="text-white w-5 h-5" />
                    )}
                    <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </span>
                  
                  {/* Theme dots */}
                  <div className="flex space-x-1">
                    {themes.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTheme 
                            ? `${getGradientBg()}` 
                            : darkMode ? 'bg-slate-400/30' : 'bg-gray-400/30'
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