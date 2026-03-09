"use client"
import React from "react";
import Image from "next/image";
import QuoteCarousel from "./QuoteCarousel";

const 

AboutClient = ({ techStack = null, achievements = null }) => {
  return (
    <>
      {achievements && (
        <>
          <style jsx global>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes orbit {
              0% { transform: translate(-50%, -50%) rotate(0deg) translateX(30px) rotate(0deg); }
              100% { transform: translate(-50%, -50%) rotate(360deg) translateX(30px) rotate(-360deg); }
            }
          `}</style>

          {/* Achievements Section */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 text-center hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-medium text-gray-300">{achievement.text}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {techStack && (
        <>
          <style jsx global>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes orbit {
              0% { transform: translate(-50%, -50%) rotate(0deg) translateX(30px) rotate(0deg); }
              100% { transform: translate(-50%, -50%) rotate(360deg) translateX(30px) rotate(-360deg); }
            }
          `}</style>

          {/* Tech Stack Section */}
          <div className="mt-12 md:mt-20">
            <h4 className="text-3xl sm:text-4xl font-bold text-white mb-8 md:mb-12 text-center">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h4>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-8 py-2">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="relative group py-6"
                  style={{
                    animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="relative">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br ${tech.color} p-0.5 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                      <div className="w-full h-full rounded-xl bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
                        {tech.isEmoji ? (
                          <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                            {tech.icon}
                          </span>
                        ) : (
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={48}
                            height={48}
                            loading="lazy"
                            className="w-8 h-8 sm:w-12 sm:h-12 object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>
                    </div>

                    <div className="text-center">
                      <h5 className="font-bold text-base sm:text-lg text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                        {tech.name}
                      </h5>
                      <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {tech.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ animation: 'orbit 3s linear infinite', transform: 'translate(-50%, -50%)' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quote Section */}
          <QuoteCarousel />
        </>
      )}
    </>
  );
};

export default AboutClient;
