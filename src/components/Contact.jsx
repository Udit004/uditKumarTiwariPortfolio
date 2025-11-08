"use client"
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Mail, User, MessageSquare, Send, Play, Pause, Linkedin, Github, Instagram  } from "lucide-react";
import SocialIcons from "./SocialIcons";

// Starry background fallback component
const StarryBackground = () => {
  const [stars, setStars] = useState([]);
  const [movingStars, setMovingStars] = useState([]);

  useEffect(() => {
    // Generate stars on client-side only to avoid hydration mismatch
    const staticStars = [...Array(150)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.7
    }));

    const movingStarsData = [...Array(30)].map((_, i) => ({
      id: `moving-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 5 + Math.random() * 5,
      animationDelay: Math.random() * 5
    }));

    setStars(staticStars);
    setMovingStars(movingStarsData);
  }, []);

  return (
    <div className="absolute inset-0 bg-gray-900 overflow-hidden">
      {/* Static stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: `${star.animationDuration}s`,
            opacity: star.opacity
          }}
        />
      ))}
      
      {/* Moving stars */}
      {movingStars.map((star) => (
        <div
          key={star.id}
          className="absolute w-0.5 h-0.5 bg-blue-300 rounded-full"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animation: `float ${star.animationDuration}s linear infinite`,
            animationDelay: `${star.animationDelay}s`
          }}
        />
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-pink-900/50" />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
        `
      }} />
    </div>
  );
};

// Video background component
const VideoBackground = ({ videoSrc, onError }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoad = () => {
        setIsLoaded(true);
        video.play().catch(onError);
      };

      const handleError = () => {
        onError();
      };

      video.addEventListener('loadeddata', handleLoad);
      video.addEventListener('error', handleError);
      video.addEventListener('loadstart', () => setIsLoaded(false));

      return () => {
        video.removeEventListener('loadeddata', handleLoad);
        video.removeEventListener('error', handleError);
      };
    }
  }, [onError]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        style={{
          filter: 'brightness(0.4) contrast(1.1)',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />
    </div>
  );
};

// Robot video component with fallback
const RobotVideoDisplay = ({ videos, currentIndex, isPlaying, onTogglePlay, onVideoChange, isMobile, isMounted }) => {
  const videoRefs = useRef([]);
  const [videoErrors, setVideoErrors] = useState({});

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && isPlaying && !videoErrors[currentIndex]) {
      currentVideo.play().catch(() => {
        setVideoErrors(prev => ({ ...prev, [currentIndex]: true }));
      });
    }
  }, [currentIndex, isPlaying, videoErrors]);

  const handleVideoError = (index) => {
    setVideoErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 group min-h-[300px] sm:min-h-[400px]">
      {videos.map((video, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentIndex ? 'opacity-100' : 'opacity-0'
        }`}>
          {!videoErrors[index] ? (
            <video
              ref={el => videoRefs.current[index] = el}
              className="w-full h-full object-cover"
              src={video.src}
              loop
              muted
              playsInline
              onError={() => handleVideoError(index)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <div className="text-4xl sm:text-6xl mb-4">🤖</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-sm sm:text-base opacity-80">{video.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Video overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      
      {/* Play/Pause Control */}
      {isMounted && !isMobile && (
        <button
          onClick={onTogglePlay}
          className="absolute top-4 right-4 p-2 sm:p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-colors duration-300 opacity-0 group-hover:opacity-100"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          )}
        </button>
      )}

      {/* Video Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-white">
          <h3 className="font-bold text-base sm:text-lg mb-1">
            {videos[currentIndex]?.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            {videos[currentIndex]?.description}
          </p>
        </div>
      </div>

      {/* Video indicators */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => onVideoChange(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const form = useRef();
  const [currentTheme, setCurrentTheme] = useState(0);
  const [currentRobotVideo, setCurrentRobotVideo] = useState(0);
  const [isBackgroundVideoPlaying, setIsBackgroundVideoPlaying] = useState(true);
  const [isRobotVideoPlaying, setIsRobotVideoPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const backgroundVideoRef = useRef(null);
  
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false
  });

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Detect mobile device - only after mount to prevent hydration mismatch
  useEffect(() => {
    if (!isMounted) return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMounted]);

  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
  };

  // Theme configurations
  const themes = [
    { accent: 'purple', gradient: 'from-purple-600 to-blue-600', color: '#8B5CF6' },
    { accent: 'emerald', gradient: 'from-emerald-600 to-teal-600', color: '#10B981' },
    { accent: 'rose', gradient: 'from-rose-600 to-pink-600', color: '#F43F5E' },
    { accent: 'amber', gradient: 'from-amber-600 to-orange-600', color: '#F59E0B' }
  ];

  // Robot video configurations with fallback
  const robotVideos = [
    {
      src: "/videos/robot-laptop.mp4",
      title: "Coding Mode",
      description: "Working on amazing projects"
    },
    {
      src: "/videos/robot-skating.mp4",
      title: "Creative Break",
      description: "Taking a skating break"
    },
    {
      src: "/videos/robot-driving.mp4",
      title: "Adventure Time",
      description: "Exploring new horizons"
    }
  ];

  // Theme and robot video cycling
  useEffect(() => {
    const themeInterval = setInterval(() => {
      setCurrentTheme(prev => (prev + 1) % themes.length);
    }, 4000);

    const robotInterval = setInterval(() => {
      setCurrentRobotVideo(prev => (prev + 1) % robotVideos.length);
    }, 5000);

    return () => {
      clearInterval(themeInterval);
      clearInterval(robotInterval);
    };
  }, [themes.length, robotVideos.length]);

  // Handle video play/pause for background
  const toggleBackgroundVideo = () => {
    if (backgroundVideoRef.current) {
      if (isBackgroundVideoPlaying) {
        backgroundVideoRef.current.pause();
      } else {
        backgroundVideoRef.current.play();
      }
      setIsBackgroundVideoPlaying(!isBackgroundVideoPlaying);
    }
  };

  const currentThemeConfig = themes[currentTheme];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus({ loading: false, success: true, error: false });
      setFormData({ user_name: "", user_email: "", message: "" });
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
      console.error('Error sending email:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactIcons = [
    {
      icon: Mail,
      href: "mailto:rajankumart266@gmail.com",
      label: "Gmail",
      color: "from-red-500 to-red-600",
      hoverColor: "hover:shadow-red-500/25"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/udit-kumar-tiwari-2b2a15216",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:shadow-blue-500/25"
    },
    {
      icon: Github,
      href: "https://github.com/Udit004",
      label: "GitHub",
      color: "from-gray-700 to-gray-800",
      hoverColor: "hover:shadow-gray-500/25"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/uditkumar_004/profilecard/?igsh=eXhmMGg5MjYweTR6",
      label: "Instagram",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:shadow-pink-500/25"
    }
  ];

  // Example space video URL - replace with your actual video
  const spaceVideoSrc = "/videos/background-space.mp4";

  return (
    <section id="contact" className="relative py-10 sm:py-20 overflow-hidden min-h-screen">
      {/* Background Video or Starry Background */}
      {!videoError ? (
        <VideoBackground videoSrc={spaceVideoSrc} onError={handleVideoError} />
      ) : (
        <StarryBackground />
      )}

      {/* Floating Video Control */}
      {isMounted && !videoError && !isMobile && (
        <div className="absolute top-6 sm:top-8 left-6 sm:left-8 z-20">
          <button
            onClick={toggleBackgroundVideo}
            className="p-2 sm:p-3 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20"
            title="Toggle Space Background"
          >
            {isBackgroundVideoPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            )}
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              Let's Connect
            </h2>
            <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-sm px-4">
              Ready to bring your ideas to life? Let's collaborate and create something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
            {/* Left Column - Robot Videos */}
            <div className="flex flex-col h-full min-h-[500px] lg:min-h-[600px]">
              {/* Robot Video Display */}
              <RobotVideoDisplay
                videos={robotVideos}
                currentIndex={currentRobotVideo}
                isPlaying={isRobotVideoPlaying}
                onTogglePlay={() => setIsRobotVideoPlaying(!isRobotVideoPlaying)}
                onVideoChange={setCurrentRobotVideo}
                isMobile={isMobile}
                isMounted={isMounted}
              />

              {/* Social Media Icons - Using SocialIcons Component */}
              <SocialIcons variant="contact" isMounted={isMounted} isMobile={isMobile} />
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:shadow-3xl hover:border-white/30 flex flex-col min-h-[500px] lg:min-h-[600px]">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Send a Message</h3>
                <p className="text-sm sm:text-base text-gray-300">I'd love to hear from you! Fill out the form below.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                {/* Name Field */}
                <div className="relative group">
                  <label htmlFor="user_name" className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                    <User className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 border-2 border-white/20 rounded-xl focus:ring-2 transition-all duration-300 focus:border-transparent bg-white/10 text-white backdrop-blur-sm placeholder-gray-400 hover:border-white/30 hover:bg-white/15 text-sm sm:text-base"
                      style={{
                        '--tw-ring-color': currentThemeConfig.color
                      }}
                      placeholder="John Doe"
                      value={formData.user_name}
                      onChange={handleChange}
                    />
                    <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-focus-within:text-current transition-colors" />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <label htmlFor="user_email" className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                    <Mail className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 border-2 border-white/20 rounded-xl focus:ring-2 transition-all duration-300 focus:border-transparent bg-white/10 text-white backdrop-blur-sm placeholder-gray-400 hover:border-white/30 hover:bg-white/15 text-sm sm:text-base"
                      style={{
                        '--tw-ring-color': currentThemeConfig.color
                      }}
                      placeholder="john@example.com"
                      value={formData.user_email}
                      onChange={handleChange}
                    />
                    <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-focus-within:text-current transition-colors" />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative group flex-1 flex flex-col">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                    <MessageSquare className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Message
                  </label>
                  <div className="relative flex-1">
                    <textarea
                      id="message"
                      name="message"
                      required
                      className="w-full h-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 border-2 border-white/20 rounded-xl focus:ring-2 transition-all duration-300 focus:border-transparent bg-white/10 text-white backdrop-blur-sm placeholder-gray-400 hover:border-white/30 hover:bg-white/15 resize-none min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                      style={{
                        '--tw-ring-color': currentThemeConfig.color
                      }}
                      placeholder="Tell me about your project, ideas, or just say hello!"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-focus-within:text-current transition-colors" />
                  </div>
                </div>

                {/* Status Messages */}
                {status.success && (
                  <div className="p-3 sm:p-4 bg-green-500/20 text-green-300 rounded-xl border border-green-500/30 backdrop-blur-sm">
                    <div className="flex items-center text-sm sm:text-base">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  </div>
                )}

                {status.error && (
                  <div className="p-3 sm:p-4 bg-red-500/20 text-red-300 rounded-xl border border-red-500/30 backdrop-blur-sm">
                    <div className="flex items-center text-sm sm:text-base">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse" />
                      Failed to send message. Please try again later.
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className={`group relative w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform-gpu transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 flex-shrink-0 text-sm sm:text-base`}
                  style={{
                    background: `linear-gradient(135deg, ${currentThemeConfig.color}, ${currentThemeConfig.color}dd)`,
                    boxShadow: `0 4px 14px 0 ${currentThemeConfig.color}55`,
                  }}
                >
                  <div className="flex items-center justify-center space-x-2 z-10 relative">
                    {status.loading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,255,255,0)] via-white/20 to-[rgba(255,255,255,0)] transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;