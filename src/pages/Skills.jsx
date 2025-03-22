// import React, { useEffect, useState } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import React from "react"; // Remove motion

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 80 },
  { name: "JavaScript", level: 70 },
  { name: "MySQL", level: 60 },
  { name: "React", level: 50 },
  { name: "C Programming", level: 60 },
  { name: "Python", level: 50 },
];

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-20 px-6 bg-gray-100 dark:bg-gray-800" // Ensure dark mode class is applied
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto text-center">
        <motion.h3
          className="text-3xl font-bold mb-10 text-gray-900 dark:text-gray-300" // Ensure dark mode class is applied
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          My Skills
        </motion.h3>

        <div className="max-w-xl mx-auto space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md" // Ensure dark mode class is applied
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-300">{skill.name}</p> {/* Ensure dark mode class is applied */}
                <motion.span
                  className="text-blue-600 font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {skill.level}%
                </motion.span>
              </div>

              <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
