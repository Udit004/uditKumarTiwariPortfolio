"use client"
import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-white dark:text-gray-300">
      {/* Decorative top border */}
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[rgba(255,255,255,0)] via-gray-600 to-[rgba(255,255,255,0)]"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          {/* Optional decorative element */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-[rgba(255,255,255,0)] via-gray-500 to-[rgba(255,255,255,0)]"></div>
          </div>
          
          {/* Copyright text */}
          <p className="text-sm font-light tracking-wide opacity-90 hover:opacity-100 transition-opacity duration-300">
            &copy; {new Date().getFullYear()} Udit Kumar Tiwari. All Rights Reserved.
          </p>
          
          {/* Optional subtitle */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-light">
            Crafted with passion
          </p>
        </div>
      </div>
      
      {/* Subtle bottom glow effect */}
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-px bg-gradient-to-r from-[rgba(255,255,255,0)] via-blue-500/20 to-[rgba(255,255,255,0)]"></div>
    </footer>
  );
};

export default Footer;