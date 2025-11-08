"use client"
import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";

// Simplified SkillCard with minimal animations
const SkillCard = memo(({ skill, categoryColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-3 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden ${isHovered ? '-translate-y-2' : ''}`}>
        {/* Simple background gradient */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${categoryColor} transition-opacity duration-300`}
          style={{ opacity: isHovered ? 0.15 : 0.08 }}
        />
        
        {/* Icon */}
        <div className="relative z-10 mb-2 md:mb-4 flex justify-center">
          <div 
            className={`w-10 h-10 md:w-16 md:h-16 text-xl md:text-3xl rounded-2xl bg-gradient-to-br ${categoryColor} flex items-center justify-center shadow-xl border border-white/20 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
          >
            <span className="drop-shadow-lg">{skill.icon}</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h4 className={`text-sm md:text-lg font-bold text-gray-800 dark:text-white mb-1 md:mb-2 transition-all duration-200 ${isHovered ? 'text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text' : ''}`}>
            {skill.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Glow effect */}
        <div 
          className={`absolute -inset-1 bg-gradient-to-r ${categoryColor} rounded-3xl blur transition-opacity duration-300 -z-10`}
          style={{ opacity: isHovered ? 0.25 : 0 }}
        />
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

// Simplified Category with minimal motion
const SkillCategory = memo(({ title, data }) => {
  return (
    <div className="mb-8 md:mb-16">
      {/* Category Header */}
      <div className="flex items-center mb-4 md:mb-8">
        <div className={`w-12 h-12 md:w-16 md:h-16 text-2xl md:text-3xl rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center mr-4 md:mr-6 shadow-xl border border-white/20`}>
          <span className="drop-shadow-lg">{data.icon}</span>
        </div>
        <div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>
          <div className={`h-1 w-20 bg-gradient-to-r ${data.color} rounded-full`} />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {data.skills.map((skill) => (
          <SkillCard 
            key={skill.name} 
            skill={skill} 
            categoryColor={data.color}
          />
        ))}
      </div>
    </div>
  );
});

SkillCategory.displayName = 'SkillCategory';

// Main Client Component - only handles interactive parts
const SkillsClient = ({ skillsData }) => {
  return (
    <div className="space-y-8 md:space-y-16">
      {Object.entries(skillsData).map(([category, data]) => (
        <SkillCategory
          key={category}
          title={category}
          data={data}
        />
      ))}
    </div>
  );
};

export default SkillsClient;