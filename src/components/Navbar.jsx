import React, { useContext } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { DarkModeContext } from "../context/DarkModeContext"; // Import context

const Navbar = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
  
    return (
      <motion.nav
        className="fixed w-full top-0 z-1000 shadow-md bg-white dark:bg-gray-900 transition-all duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          
          <motion.a
            href="#home"
            className="flex items-center space-x-3 text-2xl font-bold text-gray-900 dark:text-white"
            whileHover={{ scale: 1.1 }}
            >
            {/* Logo Image */}
            <img
                src="/assets/iconImage.png" // Replace with your actual logo file path
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover"
            />
            
            {/* Text Logo */}
            <span>Udit's Portfolio</span>
            </motion.a>

  
          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-lg">
            {["About", "Skills", "Projects", "Contact"].map((item, index) => (
              <motion.li key={index} whileHover={{ scale: 1.1 }}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                  className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
  
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-400"
          >
            {darkMode ? (
              <Sun className="text-yellow-400 w-6 h-6" />
            ) : (
              <Moon className="text-gray-900 dark:text-white w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>
    );
  };
  
  export default Navbar;
