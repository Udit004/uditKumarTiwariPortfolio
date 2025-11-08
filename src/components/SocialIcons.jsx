import React from "react";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";

const socialLinks = [
  {
    icon: Mail,
    href: "mailto:rajankumart266@gmail.com",
    label: "Gmail",
    color: "from-red-500 to-red-600",
    hoverColor: "hover:shadow-red-500/25",
    svgPath: null // Using Lucide icon
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/udit-kumar-tiwari-2b2a15216",
    label: "LinkedIn",
    color: "from-blue-600 to-blue-700",
    hoverColor: "hover:shadow-blue-500/25",
    svgPath: null
  },
  {
    icon: Github,
    href: "https://github.com/Udit004",
    label: "GitHub",
    color: "from-gray-700 to-gray-800",
    hoverColor: "hover:shadow-gray-500/25",
    svgPath: null
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/uditkumar_004/profilecard/?igsh=eXhmMGg5MjYweTR6",
    label: "Instagram",
    color: "from-pink-500 to-purple-600",
    hoverColor: "hover:shadow-pink-500/25",
    svgPath: null
  }
];

const SocialIcons = ({ variant = "home", isMounted = true, isMobile = false }) => {
  // Different styles for home vs contact page
  const styles = {
    home: {
      container: "flex gap-4 mt-8 sm:mt-10 animate-slide-up delay-600",
      link: (social, index) => `w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg animate-scale-in`,
      iconSize: 20,
      animationDelay: (index) => ({ animationDelay: `${700 + index * 100}ms` }),
      showTooltip: false
    },
    contact: {
      container: "flex justify-center gap-3 sm:gap-4 flex-shrink-0 mt-4 sm:mt-6",
      link: (social, index) => `
        relative group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${social.color}
        shadow-2xl shadow-black/30 hover:shadow-3xl ${social.hoverColor}
        transform-gpu transition-all duration-500 ease-out
        hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105 sm:hover:scale-110 active:scale-95 
        hover:rotate-2 border border-white/10
        before:absolute before:inset-0 before:rounded-xl sm:before:rounded-2xl 
        before:bg-gradient-to-br before:from-white/20 before:to-transparent
        before:opacity-0 hover:before:opacity-100 before:transition-opacity
        backdrop-blur-sm
      `,
      iconSize: isMounted && isMobile ? 20 : 24,
      animationDelay: (index) => ({ animationDelay: `${index * 0.1}s` }),
      showTooltip: true
    }
  };

  const currentStyle = styles[variant];

  return (
    <div className={currentStyle.container}>
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon;
        
        return (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
            className={currentStyle.link(social, index)}
            style={currentStyle.animationDelay(index)}
          >
            {variant === "contact" ? (
              <>
                <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-110 sm:group-hover:scale-125">
                  <IconComponent size={currentStyle.iconSize} className="text-white drop-shadow-lg" />
                </div>
                
                {/* Tooltip - only for contact variant */}
                {currentStyle.showTooltip && (
                  <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-gray-900/90 backdrop-blur-sm text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-lg shadow-xl whitespace-nowrap border border-white/20">
                      {social.label}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-t border-r border-white/20"></div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Home variant - simple SVG icon
              <IconComponent size={currentStyle.iconSize} className="text-white opacity-90" />
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;