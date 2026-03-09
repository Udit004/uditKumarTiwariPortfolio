"use client"
import { useState, useCallback } from 'react';
import ContactClient from './ContactClient';
import { useVideoLazyLoad } from '../lib/useVideoLazyLoad';

// Client Component - includes background video
const Contact = () => {
  const videoRef = useVideoLazyLoad();
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);
  // Static contact icons data - pass icon names as strings
  const contactIcons = [
    {
      icon: "Mail", // String instead of component
      href: "mailto:rajankumart266@gmail.com",
      label: "Gmail",
      color: "from-red-500 to-red-600",
      hoverColor: "hover:shadow-red-500/25"
    },
    {
      icon: "Linkedin",
      href: "https://www.linkedin.com/in/udit-kumar-tiwari-2b2a15216",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:shadow-blue-500/25"
    },
    {
      icon: "Github",
      href: "https://github.com/Udit004",
      label: "GitHub",
      color: "from-gray-700 to-gray-800",
      hoverColor: "hover:shadow-gray-500/25"
    },
    {
      icon: "Instagram",
      href: "https://www.instagram.com/uditkumar_004/profilecard/?igsh=eXhmMGg5MjYweTR6",
      label: "Instagram",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:shadow-pink-500/25"
    }
  ];

  // Robot video configurations
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

  const spaceVideoSrc = "/videos/background-space.mp4";

  return (
    <section id="contact" className="relative py-10 sm:py-20 overflow-hidden min-h-screen">
      {/* Background Video/Stars */}
      {!videoError ? (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
            muted
            loop
            playsInline
            preload="none"
            style={{ filter: 'brightness(0.4) contrast(1.1)' }}
            onError={handleVideoError}
          >
            <source src={spaceVideoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-pink-900/50" />
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Static Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              Let's Connect
            </h2>
            <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-sm px-4">
              Ready to bring your ideas to life? Let's collaborate and create something amazing together!
            </p>
          </div>

          {/* Client Component for interactive features */}
          <ContactClient 
            contactIcons={contactIcons}
            robotVideos={robotVideos}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;