import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const skillsData = {
  "Frontend Development": {
    icon: "🎨",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript (ES6+)", level: 85 },
      { name: "React", level: 80 },
      { name: "Redux", level: 70 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Framer Motion", level: 75 }
    ]
  },
  "Backend & Databases": {
    icon: "⚙️",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "MongoDB", level: 65 },
      { name: "Firebase", level: 60 }
    ]
  },
  "Programming Languages": {
    icon: "💻",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "Python", level: 75 },
      { name: "C", level: 45 },
      { name: "C++", level: 45 },
      { name: "Java", level: 40 }
    ]
  },
  "Tools & Technologies": {
    icon: "🛠️",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git & GitHub", level: 80 },
      { name: "Vercel", level: 70 },
      { name: "PyInstaller", level: 65 },
      { name: "DOM Manipulation", level: 85 },
      { name: "LocalStorage API", level: 75 }
    ]
  }
};

const SkillBar = ({ skill, index, categoryColor }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(skill.level);
    }, 100 + index * 50);

    return () => clearTimeout(timer);
  }, [skill.level, index]);

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
          {skill.name}
        </span>
        <span className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${categoryColor} rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${animatedLevel}%` }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut", 
            delay: index * 0.1 
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, data, index }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${data.color} flex items-center justify-center text-2xl mr-4 shadow-lg`}>
          {data.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
      
      <div className="space-y-3">
        {data.skills.map((skill, skillIndex) => (
          <SkillBar 
            key={skill.name} 
            skill={skill} 
            index={skillIndex} 
            categoryColor={data.color}
          />
        ))}
      </div>
    </motion.div>
  );
};

const KeyStrengths = () => {
  const strengths = [
    {
      title: "Full-Stack Capability",
      description: "Comfortable with both frontend (React) and backend (Node.js/Express)",
      icon: "🚀"
    },
    {
      title: "UI/UX Focus",
      description: "Strong eye for design with modern frameworks and animations",
      icon: "🎯"
    },
    {
      title: "Problem-Solving",
      description: "Built diverse projects from games to CRUD applications",
      icon: "🧩"
    },
    {
      title: "Automation & Scripting",
      description: "Python-based tools for productivity and desktop applications",
      icon: "⚡"
    }
  ];

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Key Strengths
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {strengths.map((strength, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-600"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl mb-3">{strength.icon}</div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-2 text-sm">
              {strength.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
              {strength.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3 
            }}
          >
            <span className="text-6xl">💫</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Passionate about creating beautiful, functional applications with modern technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {Object.entries(skillsData).map(([category, data], index) => (
            <SkillCategory
              key={category}
              title={category}
              data={data}
              index={index}
            />
          ))}
        </div>

        <KeyStrengths />
      </div>
    </section>
  );
};

export default Skills;