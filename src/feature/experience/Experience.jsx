"use client"
import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "./experienceData";
import { Briefcase, Calendar, Award } from "lucide-react";

const Experience = () => {
  const experiences = experienceData;

  return (
    <section 
      id="experience" 
      className="relative min-h-screen flex items-center justify-center text-white px-4 py-20 overflow-hidden"
    >
      {/* Background Video - COMMENTED OUT
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        >
          <source src="/assets/purpleBackgroundAnimation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-purple-900/40 to-slate-900/60" />
      </div>
      */}

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="p-6 sm:p-8 md:p-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              Experience
            </h2>
            <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full mb-4" />
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              My journey in web development and continuous growth
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Timeline Line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 opacity-30" />

            <div className="space-y-8 md:space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-0 w-16 h-16 items-center justify-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg border-4 border-slate-900`}>
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className="md:ml-24 group relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-white/30 hover:bg-white/10">
                    {/* Gradient glow on hover */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${exp.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
                    
                    {/* Glass Shine Animation - Realistic Multi-layer */}
                    <motion.div
                      key={`shine-${exp.id}-${index}`}
                      className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 5,
                        delay: index * 0.5,
                        repeat: Infinity,
                        repeatDelay: 0,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Single realistic glass shine: low -> high -> low */}
                      <div className="h-full w-[50%] -skew-x-12">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-[15%] via-white/10 via-[35%] via-white/20 via-[50%] via-white/35 via-[65%] via-white/20 via-[85%] via-white/10 to-transparent blur-md" />
                      </div>
                    </motion.div>
                    
                    <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r ${exp.color} text-white shadow-lg flex items-center gap-1`}>
                          <Award className="w-3 h-3" />
                          {exp.type}
                        </span>
                      </div>

                      {/* Header */}
                      <div className="mb-6 pr-24">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                          {exp.role}
                        </h3>
                        <p className="text-base sm:text-lg font-medium text-gray-300 mb-2">
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-400 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                          Key Highlights
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {exp.highlights.map((highlight, idx) => (
                            <li 
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-400"
                            >
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.color} mt-2 flex-shrink-0`} />
                              <span className="leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
