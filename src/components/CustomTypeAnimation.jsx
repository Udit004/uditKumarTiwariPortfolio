"use client"
import { useState, useEffect } from "react";

const CustomTypeAnimation = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = ['Full Stack Developer', 'Frontend Specialist', 'AI Application Developer', 'Backend Developer'];
  
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
    <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-6">
      <span>
        {currentText}
        <span className="animate-pulse text-purple-400">|</span>
      </span>
    </div>
  );
};

export default CustomTypeAnimation;