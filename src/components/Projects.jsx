import ProjectsClient from './ProjectsClient';

// Server Component - Static data and structure
const Projects = () => {
  // Static projects data
  const projects = [
    {
      title: "SaveServe - Food Redistribution Platform",
      image: "/assets/SaveServe.jpg",
      description: "A comprehensive full-stack web application connecting Food Providers and Recipients to redistribute surplus food and reduce waste. Features real-time notifications, AI-powered analytics reporting, automated background processing, and separate dashboards for providers and recipients with advanced booking and listing management.",
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
        "TypeScript"
      ],
      category: "Full-Stack Web App",
      featured: true,
      liveLink: "https://save-serve-phi.vercel.app/",
      githubLink: "https://github.com/satyam8589/saveserve",
    },
    {
      title: "Alumni Networking App",
      image: "/assets/alumni_project_image.jpg",
      description: "A full-stack platform for alumni and students to connect, share opportunities, and network. Features user authentication, profile management, and a discussion forum.",
      technologies: [
        "React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase", "Redux"
      ],
      category: "Full-Stack",
      featured: true,
      liveLink: "https://alumni-networking.vercel.app/",
      githubLink: "https://github.com/Udit004/alumni-networking.git",
    },
    {
      title: "Advanced To-Do List",
      image: "/assets/Advance_todo_list.jpg",
      description: "An advanced, AI-powered Progressive Web App (PWA) for task management. Includes intelligent priority prediction using Machine Learning, Gemini AI integration for productivity assistance, real-time collaboration via Socket.IO, and full notification support.",
      technologies: [
        "MERN Stack", "JavaScript", "Tailwind CSS", "Framer Motion", "Socket.IO", "Gemini AI", "Machine Learning"
      ],
      category: "AI-Powered",
      featured: true,
      liveLink: "https://advance-to-do-list-app.vercel.app/",
      githubLink: "https://github.com/Udit004/Advance-to-do-list-app",
    },
    {
      title: "Coachlix AI Fitness Coaching",
      image: "/assets/Coachlix_AI_Fitness_Coaching.jpg",
      description: "A smart Progressive Web App (PWA) designed to empower users in their fitness journey through AI-powered coaching. Coachlix offers personalized workout and diet plan management, real-time interaction with a Gemini AI chatbot.",
      technologies: [
        "Next.js", "JavaScript", "Tailwind CSS", "Firebase", "Gemini AI", "MongoDB", "PWA"
      ],
      category: "AI-Powered",
      featured: true,
      liveLink: "https://coachlix-ai-fitness-coaching.vercel.app/",
      githubLink: "https://github.com/Udit004/coachlix-ai-fitness-coaching",
    },
    {
      title: "Portfolio Website",
      image: "/assets/portfolio_image2.jpg",
      description: "A responsive, modern portfolio showcasing my projects, skills, and contact information. Features smooth animations, dark/light mode, and a clean UI.",
      technologies: [
        "React", "Tailwind CSS", "Framer Motion", "React Icons"
      ],
      category: "Frontend",
      featured: false,
      liveLink: "https://uditportfolio-six.vercel.app/",
      githubLink: "https://github.com/Udit004/Udit004.github.io.git",
    },
    {
      title: "Badminton Academy",
      image: "/assets/Badminton_Academy.jpg",
      description: "A dynamic sports academy website showcasing training programs, coach profiles, and class schedules. Includes animated UI elements and responsive design for seamless browsing on all devices.",
      technologies: [
        "React", "Tailwind CSS", "React Router", "SwiperJS", "Framer Motion"
      ],
      category: "Frontend",
      featured: false,
      liveLink: "https://badminton-academy-chi.vercel.app/",
      githubLink: "https://github.com/Udit004/Badminton-Academy",
    },
    {
      title: "EU Citizen Wallet Portal",
      image: "/assets/EU_Citizen_Wallet_Portal.jpg",
      description: "A secure and user-friendly digital wallet platform designed for EU citizens to manage personal documents online. This web application features DigiLocker-style document storage using Supabase for database and authentication.",
      technologies: [
        "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Cloudinary"
      ],
      category: "Full-Stack",
      featured: false,
      liveLink: "https://lovable.dev/projects/0b75f41c-da58-4a55-a037-874482b53fb9",
      githubLink: "https://github.com/Udit004/eu-citizen-wallet-portal",
    },
    {
      title: "Task Automation App",
      image: "/assets/window-task-automator.png",
      description: "A Python GUI tool to automate repetitive Windows tasks (file operations, app launches, etc.). Saves time with customizable workflows and one-click execution.",
      technologies: [
        "Python", "Tkinter", "PyInstaller"
      ],
      category: "Desktop App",
      featured: false,
      downloadLink: "https://github.com/Udit004/automated-window-task/releases/download/v1.0/automate.window.task.installer.exe",
      githubLink: "https://github.com/Udit004/automated-window-task.git",
    },
    {
      title: "Rock Paper Scissors Game",
      image: "/assets/rock_papper_scissor_screenshort.png",
      description: "An interactive browser-based game with score tracking, dynamic UI feedback, and a fun minimalist design. Play against the computer in real-time.",
      technologies: [
        "HTML5", "CSS3", "JavaScript"
      ],
      category: "Game",
      featured: false,
      liveLink: "https://udit004.github.io/Rock-Paper-Scissor-Game-/",
      githubLink: "https://github.com/Udit004/Rock-Paper-Scissor-Game-.git",
    },
    {
      title: "Simple Calculator",
      image: "/assets/Calculator_screenshort.png",
      description: "A lightweight calculator with basic arithmetic operations (+, -, ×, ÷) and a sleek, responsive interface. Built for quick calculations.",
      technologies: [
        "HTML5", "CSS3", "JavaScript"
      ],
      category: "Utility",
      featured: false,
      liveLink: "https://udit004.github.io/simple-Calculator/",
      githubLink: "https://github.com/Udit004/simple-Calculator.git",
    },
  ];

  const categories = ["All", "Full-Stack", "AI-Powered", "Frontend", "Desktop App", "Game", "Utility"];

  return (
    <section
      id="projects"
      className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Static Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
              <span>🚀</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>

          <div className="w-32 h-2 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full mb-8" />

          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover my latest work and innovative solutions across various technologies
          </p>
        </div>

        {/* Client Component for interactive features */}
        <ProjectsClient projects={projects} categories={categories} />
      </div>
    </section>
  );
};

export default Projects;