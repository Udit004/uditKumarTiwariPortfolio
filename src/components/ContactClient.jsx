"use client"
import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import Image from "next/image";
import { Mail, User, MessageSquare, Send, Play, Pause } from "lucide-react";

// Simplified Starry Background
const StarryBackground = memo(() => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const staticStars = [...Array(100)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() > 0.5 ? 1 : 0.5,
      opacity: 0.3 + Math.random() * 0.7
    }));

    setStars(staticStars);
  }, []);

  return (
    <div className="absolute inset-0 bg-gray-900 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute bg-white rounded-full ${star.size === 1 ? 'w-1 h-1' : 'w-0.5 h-0.5'}`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-pink-900/50" />
    </div>
  );
});

StarryBackground.displayName = 'StarryBackground';

// Simplified Video Background
const VideoBackground = memo(({ videoSrc, onError }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(onError);
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
        style={{ filter: 'brightness(0.4) contrast(1.1)' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />
    </div>
  );
});

VideoBackground.displayName = 'VideoBackground';

// Simplified Robot Video Display
const RobotVideoDisplay = memo(({ videos, currentIndex, onVideoChange }) => {
  const [videoErrors, setVideoErrors] = useState({});

  const handleVideoError = useCallback((index) => {
    setVideoErrors(prev => ({ ...prev, [index]: true }));
  }, []);

  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 group min-h-[300px] sm:min-h-[400px]">
      {videos.map((video, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentIndex ? 'opacity-100' : 'opacity-0'
        }`}>
          {!videoErrors[index] ? (
            <video
              className="w-full h-full object-cover"
              src={video.src}
              loop
              muted
              playsInline
              autoPlay
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
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      
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
});

RobotVideoDisplay.displayName = 'RobotVideoDisplay';

// Social Icons Component
const SocialIcons = memo(({ contactIcons }) => {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20">
        <h4 className="text-white font-semibold mb-4 text-center text-sm sm:text-base">Connect With Me</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {contactIcons.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${item.hoverColor} group`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
});

SocialIcons.displayName = 'SocialIcons';

// Main Contact Client Component
const ContactClient = ({ contactIcons, robotVideos, spaceVideoSrc }) => {
  const [currentRobotVideo, setCurrentRobotVideo] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Robot video cycling
  useEffect(() => {
    const robotInterval = setInterval(() => {
      setCurrentRobotVideo(prev => (prev + 1) % robotVideos.length);
    }, 5000);

    return () => clearInterval(robotInterval);
  }, [robotVideos.length]);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus({ loading: false, success: true, error: false });
      setFormData({ user_name: "", user_email: "", message: "" });
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
      console.error('Error sending email:', error);
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return (
    <>
      {/* Background */}
      {!videoError ? (
        <VideoBackground videoSrc={spaceVideoSrc} onError={handleVideoError} />
      ) : (
        <StarryBackground />
      )}

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
        {/* Left Column - Robot Videos & Social */}
        <div className="flex flex-col h-full min-h-[500px] lg:min-h-[600px]">
          <RobotVideoDisplay
            videos={robotVideos}
            currentIndex={currentRobotVideo}
            onVideoChange={setCurrentRobotVideo}
          />
          <SocialIcons contactIcons={contactIcons} />
        </div>

        {/* Right Column - Contact Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 flex flex-col min-h-[500px] lg:min-h-[600px]">
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 focus:border-transparent bg-white/10 text-white backdrop-blur-sm placeholder-gray-400 hover:border-white/30 hover:bg-white/15 text-sm sm:text-base"
                  placeholder="John Doe"
                  value={formData.user_name}
                  onChange={handleChange}
                />
                <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 focus:border-transparent bg-white/10 text-white backdrop-blur-sm placeholder-gray-400 hover:border-white/30 hover:bg-white/15 text-sm sm:text-base"
                  placeholder="john@example.com"
                  value={formData.user_email}
                  onChange={handleChange}
                />
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
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
                  className="w-full h-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all duration-300 focus:border-transparent bg-white/10 text-white backdrop-blur-sm placeholder-gray-400 hover:border-white/30 hover:bg-white/15 resize-none min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                  placeholder="Tell me about your project, ideas, or just say hello!"
                  value={formData.message}
                  onChange={handleChange}
                />
                <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              </div>
            </div>

            {/* Status Messages */}
            {status.success && (
              <div className="p-3 sm:p-4 bg-green-500/20 text-green-300 rounded-xl border border-green-500/30 backdrop-blur-sm">
                <div className="flex items-center text-sm sm:text-base">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                  Message sent successfully! I'll get back to you soon.
                </div>
              </div>
            )}

            {status.error && (
              <div className="p-3 sm:p-4 bg-red-500/20 text-red-300 rounded-xl border border-red-500/30 backdrop-blur-sm">
                <div className="flex items-center text-sm sm:text-base">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                  Failed to send message. Please try again later.
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="group relative w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-sm sm:text-base"
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
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactClient;