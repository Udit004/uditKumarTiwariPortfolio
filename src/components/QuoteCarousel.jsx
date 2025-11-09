"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quotes = [
  "Code is like humor. When you have to explain it, it's bad. – Cory House",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Simplicity is the soul of efficiency. – Austin Freeman",
  "Talk is cheap. Show me the code. – Linus Torvalds",
  "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
  "The best error message is the one that never shows up. – Thomas Fuchs",
  "Programming isn't about what you know; it's about what you can figure out. – Chris Pine"
];

const QuoteCarousel = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 md:mt-20 text-center">
      <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center justify-center gap-3">
        <span className="text-xl sm:text-2xl">💡</span>
        Daily Inspiration
        <span className="text-xl sm:text-2xl">✨</span>
      </h4>
      <div className="relative p-6 sm:p-8 md:p-10 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/10 rounded-3xl border border-white/10 max-w-4xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        
        <motion.div
          className="relative"
          key={quoteIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-4xl sm:text-6xl text-purple-300/30 font-serif mb-4">"</div>
          <p className="italic text-gray-200 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed mb-6">
            {quotes[quoteIndex]}
          </p>
          <div className="text-4xl sm:text-6xl text-cyan-300/30 font-serif rotate-180 float-right -mt-8">"</div>
        </motion.div>
        
        <div className="flex justify-center mt-8">
          <motion.div 
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-50 w-full max-w-md"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <p className="text-xs sm:text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
          <span className="animate-pulse">🔄</span>
          Inspiration refreshes every 5 seconds
        </p>
      </div>
    </div>
  );
};

export default QuoteCarousel;