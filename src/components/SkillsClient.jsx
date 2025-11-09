"use client"
import React, { useState, memo } from "react";
import Image from "next/image";

// Simplified SkillCard - No animations, just hover effects
const SkillCard = memo(({ skill, categoryColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:border-white/30 hover:-translate-y-2 hover:bg-white/10">
        
        {/* Glow effect on hover */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryColor} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
        
        {/* Icon container */}
        <div className="relative">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br ${categoryColor} p-0.5 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
            <div className="w-full h-full rounded-xl bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
              <Image
                src={skill.icon}
                alt={skill.name}
                width={40}
                height={40}
                className="w-6 h-6 sm:w-10 sm:h-10 object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Text content */}
          <div className="text-center">
            <h5 className="font-bold text-sm sm:text-base text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
              {skill.name}
            </h5>
            <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {skill.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

// Simplified Category - No animations
const SkillCategory = memo(({ title, data }) => {
  return (
    <div className="mb-12 md:mb-16">
      {/* Category Header */}
      <div className="flex items-center mb-6 md:mb-8">
        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${data.color} p-0.5 shadow-xl mr-4 sm:mr-6`}>
          <div className="w-full h-full rounded-xl bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
            <Image
              src={data.icon}
              alt={title}
              width={40}
              height={40}
              className="w-6 h-6 sm:w-10 sm:h-10 object-contain filter drop-shadow-lg"
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            {title}
          </h3>
          <div className={`h-1 w-20 sm:w-24 bg-gradient-to-r ${data.color} rounded-full`} />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
    <div className="space-y-12 md:space-y-16">
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