// Single source of truth for project content. UI components import
// from here instead of hardcoding data — content changes never
// require touching component code, and vice versa.

export const categories = [
  "All",
  "Full-Stack",
  "AI-Powered",
  "Frontend",
  "Desktop App",
  "Game",
  "Utility",
];

export const projectsData = [
  {
    id: "coachlix",
    title: "Coachlix AI Fitness Coaching",
    image: "/assets/Coachlix_AI_Fitness_Coaching.jpg",
    description:
      "A smart Progressive Web App (PWA) designed to empower users in their fitness journey through AI-powered coaching. Coachlix offers personalized workout and diet plan management, real-time interaction with a Gemini AI chatbot.",
    technologies: ["Next.js", "JavaScript", "Tailwind CSS", "Firebase", "Gemini AI","OpenRouter Models","LangChain","LangGraph","Cloudinary","Redis","Mem0","BullMQ Worker","Fastify","MongoDB", "PWA"],
    category: "AI-Powered",
    featured: true,
    liveLink: "https://coachlix-ai-fitness-coaching.vercel.app/",
    githubLink: "https://github.com/Udit004/coachlix-ai-fitness-coaching",
  },
  {
    id: "saveserve",
    title: "SaveServe - Food Redistribution Platform",
    image: "/assets/SaveServe.jpg",
    description:
      "A comprehensive full-stack web application connecting Food Providers and Recipients to redistribute surplus food and reduce waste. Features real-time notifications, AI-powered analytics reporting, automated background processing, and separate dashboards for providers and recipients with advanced booking and listing management.",
    technologies: [
      "Next.js App Router",
      "React",
      "Tailwind CSS",
      "Prisma ORM",
      "MongoDB",
      "Firebase Cloud Messaging",
      "Inngest",
      "Gemini AI",
      "Cloudinary",
      "TypeScript",
    ],
    category: "Full-Stack", // was "Full-Stack Web App" — didn't match the filter list
    featured: true,
    liveLink: "https://save-serve-phi.vercel.app/",
    githubLink: "https://github.com/satyam8589/saveserve",
  },
  {
    id: "alumni-networking",
    title: "Alumni Networking App",
    image: "/assets/alumni_project_image.jpg",
    description:
      "A full-stack platform for alumni and students to connect, share opportunities, and network. Features user authentication, profile management, and a discussion forum.",
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase", "Redux"],
    category: "Full-Stack",
    featured: true,
    liveLink: "https://alumni-networking.vercel.app/",
    githubLink: "https://github.com/Udit004/alumni-networking.git",
  },
  {
    id: "advance-todo",
    title: "Advanced To-Do List",
    image: "/assets/Advance_todo_list.jpg",
    description:
      "An advanced, AI-powered Progressive Web App (PWA) for task management. Includes intelligent priority prediction using Machine Learning, Gemini AI integration for productivity assistance, real-time collaboration via Socket.IO, and full notification support.",
    technologies: [
      "MERN Stack",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Socket.IO",
      "Gemini AI",
      "Machine Learning",
    ],
    category: "AI-Powered",
    featured: true,
    liveLink: "https://advance-to-do-list-app.vercel.app/",
    githubLink: "https://github.com/Udit004/Advance-to-do-list-app",
  },
  
  {
    id: "portfolio",
    title: "Portfolio Website",
    image: "/assets/portfolio_image2.jpg",
    description:
      "A responsive, modern portfolio showcasing my projects, skills, and contact information. Features smooth animations, dark/light mode, and a clean UI.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "React Icons"],
    category: "Frontend",
    featured: false,
    liveLink: "https://uditportfolio-six.vercel.app/",
    githubLink: "https://github.com/Udit004/Udit004.github.io.git",
  },
  {
    id: "badminton-academy",
    title: "Badminton Academy",
    image: "/assets/Badminton_Academy.jpg",
    description:
      "A dynamic sports academy website showcasing training programs, coach profiles, and class schedules. Includes animated UI elements and responsive design for seamless browsing on all devices.",
    technologies: ["React", "Tailwind CSS", "React Router", "SwiperJS", "Framer Motion"],
    category: "Frontend",
    featured: false,
    liveLink: "https://badminton-academy-chi.vercel.app/",
    githubLink: "https://github.com/Udit004/Badminton-Academy",
  },
  {
    id: "eu-wallet",
    title: "EU Citizen Wallet Portal",
    image: "/assets/EU_Citizen_Wallet_Portal.jpg",
    description:
      "A secure and user-friendly digital wallet platform designed for EU citizens to manage personal documents online. This web application features DigiLocker-style document storage using Supabase for database and authentication.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Cloudinary"],
    category: "Full-Stack",
    featured: false,
    liveLink: "https://lovable.dev/projects/0b75f41c-da58-4a55-a037-874482b53fb9",
    githubLink: "https://github.com/Udit004/eu-citizen-wallet-portal",
  },
  {
    id: "task-automation",
    title: "Task Automation App",
    image: "/assets/window-task-automator.png",
    description:
      "A Python GUI tool to automate repetitive Windows tasks (file operations, app launches, etc.). Saves time with customizable workflows and one-click execution.",
    technologies: ["Python", "Tkinter", "PyInstaller"],
    category: "Desktop App",
    featured: false,
    downloadLink:
      "https://github.com/Udit004/automated-window-task/releases/download/v1.0/automate.window.task.installer.exe",
    githubLink: "https://github.com/Udit004/automated-window-task.git",
  },
  {
    id: "rock-paper-scissors",
    title: "Rock Paper Scissors Game",
    image: "/assets/rock_papper_scissor_screenshort.png",
    description:
      "An interactive browser-based game with score tracking, dynamic UI feedback, and a fun minimalist design. Play against the computer in real-time.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "Game",
    featured: false,
    liveLink: "https://udit004.github.io/Rock-Paper-Scissor-Game-/",
    githubLink: "https://github.com/Udit004/Rock-Paper-Scissor-Game-.git",
  },
  {
    id: "calculator",
    title: "Simple Calculator",
    image: "/assets/Calculator_screenshort.png",
    description:
      "A lightweight calculator with basic arithmetic operations (+, -, ×, ÷) and a sleek, responsive interface. Built for quick calculations.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "Utility",
    featured: false,
    liveLink: "https://udit004.github.io/simple-Calculator/",
    githubLink: "https://github.com/Udit004/simple-Calculator.git",
  },
];