import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { DarkModeContext } from "../context/DarkModeContext";



const SkillCard = ({ skill, index, categoryColor }) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* 3D Background Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Floating Icon */}
        <motion.div
          className="relative z-10 mb-4"
          animate={{ 
            rotateY: [0, 15, -15, 0],
            rotateX: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatDelay: 2,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            rotateZ: 10,
            transition: { duration: 0.3 }
          }}
        >
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColor} flex items-center justify-center text-3xl shadow-xl transform-gpu perspective-1000 hover:shadow-2xl transition-shadow duration-300`}>
            <span className="drop-shadow-lg">{skill.icon}</span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-cyan-600 transition-all duration-300">
            {skill.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Hover Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${categoryColor} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, data, index }) => {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Category Header */}
      <div className="flex items-center mb-8">
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${data.color} flex items-center justify-center text-3xl mr-6 shadow-xl`}
          whileHover={{ 
            scale: 1.1, 
            rotateY: 180,
            transition: { duration: 0.6 }
          }}
        >
          {data.icon}
        </motion.div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>
          <div className={`w-20 h-1 bg-gradient-to-r ${data.color} rounded-full`}></div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.skills.map((skill, skillIndex) => (
          <SkillCard 
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

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const Skills = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [currentTheme, setCurrentTheme] = useState(0);

  // Theme configurations matching the Navbar component
  const themes = [
    { 
      accent: 'purple', 
      gradient: 'from-purple-600 to-blue-600',
      skillGradient: 'from-purple-500 to-blue-500',
      bgGradient: 'from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
    },
    { 
      accent: 'emerald', 
      gradient: 'from-emerald-600 to-teal-600',
      skillGradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
    },
    { 
      accent: 'rose', 
      gradient: 'from-rose-600 to-pink-600',
      skillGradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20'
    },
    { 
      accent: 'amber', 
      gradient: 'from-amber-600 to-orange-600',
      skillGradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20'
    }
  ];

  const currentThemeConfig = themes[currentTheme];

  // Create skills data with current theme
  const skillsData = {
    "Frontend Development": {
      icon: "🎨",
      color: currentThemeConfig.skillGradient,
      bgGradient: currentThemeConfig.bgGradient,
      skills: [
        { 
          name: "HTML5", 
          icon: "🌐",
          description: "Semantic markup & modern standards"
        },
        { 
          name: "CSS3", 
          icon: "🎭",
          description: "Advanced styling & animations"
        },
        { 
          name: "JavaScript", 
          icon: "⚡",
          description: "Modern ES6+ features"
        },
        { 
          name: "React", 
          icon: "⚛️",
          description: "Component-based architecture"
        },
        { 
          name: "Redux", 
          icon: "🔄",
          description: "State management"
        },
        { 
          name: "Tailwind CSS", 
          icon: "🎨",
          description: "Utility-first framework"
        },
        { 
          name: "Framer Motion", 
          icon: "🎬",
          description: "Smooth animations"
        }
      ]
    },
    "Backend & Databases": {
      icon: "⚙️",
      color: currentThemeConfig.skillGradient,
      bgGradient: currentThemeConfig.bgGradient,
      skills: [
        { 
          name: "Node.js", 
          icon: "🟢",
          description: "Server-side JavaScript runtime"
        },
        { 
          name: "Express", 
          icon: "🚂",
          description: "Fast web framework"
        },
        { 
          name: "MongoDB", 
          icon: "🍃",
          description: "NoSQL database"
        },
        { 
          name: "Firebase", 
          icon: "🔥",
          description: "Backend-as-a-Service"
        }
      ]
    },
    "Programming Languages": {
      icon: "💻",
      color: currentThemeConfig.skillGradient,
      bgGradient: currentThemeConfig.bgGradient,
      skills: [
        { 
          name: "JavaScript", 
          icon: "📜",
          description: "Dynamic programming language"
        },
        { 
          name: "Python", 
          icon: "🐍",
          description: "Versatile & powerful"
        },
        { 
          name: "C", 
          icon: "🔧",
          description: "System programming"
        },
        { 
          name: "C++", 
          icon: "⚒️",
          description: "Object-oriented programming"
        },
        { 
          name: "Java", 
          icon: "☕",
          description: "Enterprise development"
        }
      ]
    },
    "Tools & Technologies": {
      icon: "🛠️",
      color: currentThemeConfig.skillGradient,
      bgGradient: currentThemeConfig.bgGradient,
      skills: [
        { 
          name: "Git & GitHub", 
          icon: "🌿",
          description: "Version control & collaboration"
        },
        { 
          name: "Vercel", 
          icon: "▲",
          description: "Deployment platform"
        },
        { 
          name: "PyInstaller", 
          icon: "📦",
          description: "Python app bundler"
        },
        { 
          name: "DOM Manipulation", 
          icon: "🎯",
          description: "Dynamic web interactions"
        },
        { 
          name: "LocalStorage API", 
          icon: "💾",
          description: "Client-side data storage"
        }
      ]
    }
  };

  // Sync with navbar theme changes (simplified approach)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme(prev => (prev + 1) % themes.length);
    }, 10000); // Change theme every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="skills"
      className="relative py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen overflow-hidden"
    >
      <FloatingElements />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatDelay: 4 
            }}
          >
            <div className={`w-20 h-20 bg-gradient-to-br ${currentThemeConfig.gradient} rounded-2xl flex items-center justify-center text-4xl shadow-2xl transform-gpu`}>
              <span className="drop-shadow-lg">💫</span>
            </div>
          </motion.div>
          
          <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${currentThemeConfig.gradient} bg-clip-text text-transparent mb-6`}>
            Technical Arsenal
          </h2>
          
          <motion.div
            className={`w-32 h-2 bg-gradient-to-r ${currentThemeConfig.gradient} mx-auto rounded-full mb-8`}
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with cutting-edge technologies and creative innovation
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {Object.entries(skillsData).map(([category, data], index) => (
            <SkillCategory
              key={category}
              title={category}
              data={data}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;