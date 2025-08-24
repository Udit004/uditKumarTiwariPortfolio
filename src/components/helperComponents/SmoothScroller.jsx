import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Custom hook for smooth scrolling
const useSmoothScroll = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolling(true);
          
          // Clear existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          // Set scrolling to false after scroll ends
          timeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 150);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return isScrolling;
};

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// Scroll to top button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setIsVisible(latest > 300);
    });

    return unsubscribe;
  }, [scrollY]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <motion.button
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)"
      }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </motion.button>
  );
};

// Smooth scroll wrapper for sections
const SmoothSection = ({ children, className = "", ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect for background elements
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ opacity }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Enhanced smooth scroller component
const SmoothScroller = ({ 
  children, 
  showProgress = true, 
  showScrollToTop = true,
  className = ""
}) => {
  const isScrolling = useSmoothScroll();
  const containerRef = useRef(null);

  // Apply CSS for hardware acceleration and smooth scrolling
  useEffect(() => {
    // Apply smooth scrolling to html element
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Apply CSS for better performance
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      body {
        overscroll-behavior: none;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #8b5cf6, #3b82f6);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #7c3aed, #2563eb);
      }
      
      /* Smooth transitions for all elements */
      * {
        will-change: auto;
      }
      
      .will-change-transform {
        will-change: transform;
      }
      
      .will-change-opacity {
        will-change: opacity;
      }
      
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `;
    
    document.head.appendChild(style);

    // Intersection Observer for performance optimization
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section, .smooth-section');
    sections.forEach(section => observer.observe(section));

    return () => {
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  // Smooth scroll to section function
  const scrollToSection = useCallback((sectionId, offset = 0) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Enhanced scroll event handling with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Add scrolling class to body for CSS transitions
          document.body.classList.toggle('is-scrolling', isScrolling);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  return (
    <div 
      ref={containerRef}
      className={`smooth-scroller ${className}`}
      style={{
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Scroll Progress Indicator */}
      {showProgress && <ScrollProgress />}
      
      {/* Main Content */}
      <div className="smooth-content">
        {children}
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollToTop && <ScrollToTop />}
      
      {/* Global scroll helper */}
      <div 
        style={{ display: 'none' }} 
        data-scroll-to={scrollToSection}
      />
    </div>
  );
};

// Reveal animation component for sections
const RevealSection = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.6,
  y = 50,
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const transform = useTransform(scrollYProgress, [0, 1], [`translateY(${y}px)`, 'translateY(0px)']);

  return (
    <motion.div
      ref={ref}
      className={`smooth-section ${className}`}
      style={{ 
        opacity,
        transform
      }}
      initial={{ opacity: 0, y }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Parallax container for background elements
const ParallaxContainer = ({ 
  children, 
  speed = 0.5, 
  className = "" 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={`parallax-container ${className}`}>
      <motion.div
        style={{ y }}
        className="parallax-content will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

// Navigation helper for smooth scrolling between sections
const useNavigationScroll = () => {
  const scrollToSection = useCallback((sectionId, offset = 80) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollToSection };
};

// Export all components and hooks
export default SmoothScroller;
export { 
  SmoothSection, 
  RevealSection, 
  ParallaxContainer, 
  ScrollProgress, 
  ScrollToTop,
  useNavigationScroll,
  useSmoothScroll 
};