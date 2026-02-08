// Experience data configuration
// To add new experiences, simply add a new object to the array below

export const experienceData = [
  {
    id: 1,
    role: "Web Development Intern",
    company: "Internship Program",
    period: "Sept 2025 - Present",
    type: "Internship",
    description: "Working on real-world web development projects, gaining hands-on experience with modern technologies and development practices.",
    highlights: [
      "Building responsive web applications",
      "Collaborating with development teams",
      "Learning industry best practices",
      "Contributing to live projects"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    role: "Self-Learning & Projects",
    company: "Personal Development",
    period: "Jan 2025 - Present",
    type: "Learning",
    description: "Dedicated to continuous learning and building practical projects to strengthen web development skills.",
    highlights: [
      "Built 5+ full-stack projects",
      "Mastered React & Next.js",
      "Explored modern web technologies",
      "Developed problem-solving skills"
    ],
    color: "from-purple-500 to-pink-500"
  }
];

/*
  USAGE GUIDE:
  
  To add a new experience:
  1. Copy one of the objects above
  2. Update the id (make sure it's unique)
  3. Update all fields with your new experience details
  4. Choose a color gradient from Tailwind CSS colors
  
  Color gradient options:
  - "from-blue-500 to-cyan-500" - Blue/Cyan (Tech/Professional)
  - "from-purple-500 to-pink-500" - Purple/Pink (Creative/Learning)
  - "from-green-500 to-teal-500" - Green/Teal (Growth/Success)
  - "from-orange-500 to-red-500" - Orange/Red (Energy/Passion)
  - "from-indigo-500 to-purple-500" - Indigo/Purple (Innovation)
  - "from-yellow-500 to-orange-500" - Yellow/Orange (Bright/Active)
  
  Example:
  {
    id: 3,
    role: "Frontend Developer",
    company: "Tech Company",
    period: "June 2026 - Present",
    type: "Full-time",
    description: "Description here...",
    highlights: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3",
      "Achievement 4"
    ],
    color: "from-green-500 to-teal-500"
  }
*/
