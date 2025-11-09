import SkillsClient from './SkillsClient';

// Server Component - No animations, just data
const Skills = () => {
  // Static skills data - no state needed
  const skillsData = {
    "Frontend Development": {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "from-purple-500 to-blue-500",
      skills: [
        { 
          name: "HTML5", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", 
          description: "Semantic markup" 
        },
        { 
          name: "CSS3", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
          description: "Advanced styling" 
        },
        { 
          name: "JavaScript", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
          description: "ES6+ features" 
        },
        { 
          name: "React", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
          description: "Component-based" 
        },
        { 
          name: "Redux", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", 
          description: "State management" 
        },
        { 
          name: "Tailwind CSS", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", 
          description: "Utility-first" 
        },
        { 
          name: "Next.js", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", 
          description: "React framework" 
        }
      ]
    },
    "Backend & Databases": {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "from-emerald-500 to-teal-500",
      skills: [
        { 
          name: "Node.js", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", 
          description: "JavaScript runtime" 
        },
        { 
          name: "Express", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", 
          description: "Web framework" 
        },
        { 
          name: "MongoDB", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", 
          description: "NoSQL database" 
        },
        { 
          name: "MySQL", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", 
          description: "Relational DB" 
        },
        { 
          name: "Firebase", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", 
          description: "Backend service" 
        },
        { 
          name: "PostgreSQL", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", 
          description: "SQL database" 
        }
      ]
    },
    "Cloud & DevOps": {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      color: "from-rose-500 to-pink-500",
      skills: [
        { 
          name: "Vercel", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", 
          description: "Deployment" 
        },
        { 
          name: "Docker", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", 
          description: "Containerization" 
        },
        { 
          name: "Git", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
          description: "Version control" 
        },
        { 
          name: "GitHub", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", 
          description: "Code hosting" 
        }
      ]
    },
    "Programming Languages": {
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "from-amber-500 to-orange-500",
      skills: [
        { 
          name: "JavaScript", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
          description: "Dynamic language" 
        },
        { 
          name: "TypeScript", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", 
          description: "Type safety" 
        },
        { 
          name: "Python", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
          description: "Versatile" 
        },
        { 
          name: "C", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", 
          description: "System programming" 
        },
        { 
          name: "C++", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", 
          description: "OOP language" 
        },
        { 
          name: "Java", 
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", 
          description: "Enterprise" 
        }
      ]
    }
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-4 py-20 overflow-hidden"
    >
      {/* Background Video - Same as About */}
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

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="p-6 sm:p-8 md:p-12">
          {/* Static Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              Technical Arsenal
            </h2>
            <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full mb-8" />
            <p className="text-base sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Crafting exceptional digital experiences with cutting-edge technologies and creative innovation
            </p>
          </div>

          {/* Client Component for interactive parts */}
          <SkillsClient skillsData={skillsData} />
        </div>
      </div>
    </section>
  );
};

export default Skills;