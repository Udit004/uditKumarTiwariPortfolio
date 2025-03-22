import React, { useState, useContext } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react"; // Import icons
import { DarkModeContext } from "../context/DarkModeContext"; // Import context

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu

  return (
    <motion.nav
      className="fixed w-full top-0 z-50 shadow-md bg-white dark:bg-gray-900 transition-all duration-300"
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

        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex space-x-6 text-lg">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
            <motion.li key={index} whileHover={{ scale: 1.1 }}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Dark Mode Toggle - Desktop */}
        <button
          onClick={() => {
            console.log("Dark mode toggle clicked");
            setDarkMode(!darkMode);
          }}

          aria-label="Toggle Dark Mode"
          className="hidden md:block p-2 rounded-full transition-all duration-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-400"
        >
          {darkMode ? (
            <Sun className="text-yellow-400 w-6 h-6" />
          ) : (
            <Moon className="text-gray-900 dark:text-white w-6 h-6" />
          )}
        </button>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col items-center py-4 space-y-4">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
              <li key={index}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="block text-lg text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {item}
                </a>
              </li>
            ))}

            {/* Dark Mode Toggle - Mobile */}
            <li>
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  setIsOpen(false); // Close menu after toggling dark mode
                }}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-400 flex items-center space-x-2"
              >
                {darkMode ? (
                  <Sun className="text-yellow-400 w-6 h-6" />
                ) : (
                  <Moon className="text-gray-900 dark:text-white w-6 h-6" />
                )}
                <span className="text-gray-900 dark:text-white">Dark Mode</span>
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
