import SkillsClient from './SkillsClient';

// Server Component - No animations, just data
const Skills = () => {
  // Static skills data - no state needed
  const skillsData = {
    "Frontend Development": {
      icon: "🎨",
      color: "from-purple-500 to-blue-500",
      skills: [
        { name: "HTML5", icon: "🌐", description: "Semantic markup & modern standards" },
        { name: "CSS3", icon: "🎭", description: "Advanced styling & animations" },
        { name: "JavaScript", icon: "⚡", description: "Modern ES6+ features" },
        { name: "React", icon: "⚛️", description: "Component-based architecture" },
        { name: "Redux", icon: "🔄", description: "State management" },
        { name: "Tailwind CSS", icon: "🎨", description: "Utility-first framework" },
        { name: "Framer Motion", icon: "🎬", description: "Smooth animations" }
      ]
    },
    "Backend & Databases": {
      icon: "⚙️",
      color: "from-emerald-500 to-teal-500",
      skills: [
        { name: "Node.js", icon: "🟢", description: "Server-side JavaScript runtime" },
        { name: "Express", icon: "🚂", description: "Fast web framework" },
        { name: "MongoDB", icon: "🍃", description: "NoSQL database" },
        { name: "MySQL", icon: "🐬", description: "Relational database" },
        { name: "Firebase", icon: "🔥", description: "Backend-as-a-Service" },
        { name: "Supabase", icon: "⚡", description: "Open source Firebase alternative" }
      ]
    },
    "Cloud & Services": {
      icon: "☁️",
      color: "from-rose-500 to-pink-500",
      skills: [
        { name: "Vercel", icon: "▲", description: "Deployment platform" },
        { name: "Render", icon: "🚀", description: "Cloud application platform" },
        { name: "Cloudinary", icon: "☁️", description: "Media management service" },
        { name: "Razorpay", icon: "💳", description: "Payment gateway integration" }
      ]
    },
    "Programming Languages": {
      icon: "💻",
      color: "from-amber-500 to-orange-500",
      skills: [
        { name: "JavaScript", icon: "📜", description: "Dynamic programming language" },
        { name: "Python", icon: "🐍", description: "Versatile & powerful" },
        { name: "C", icon: "🔧", description: "System programming" },
        { name: "C++", icon: "⚒️", description: "Object-oriented programming" },
        { name: "Java", icon: "☕", description: "Enterprise development" }
      ]
    },
    "Tools & Technologies": {
      icon: "🛠️",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Git & GitHub", icon: "🌿", description: "Version control & collaboration" },
        { name: "PyInstaller", icon: "📦", description: "Python app bundler" },
        { name: "DOM Manipulation", icon: "🎯", description: "Dynamic web interactions" },
        { name: "REST APIs", icon: "🔗", description: "Web service integration" }
      ]
    }
  };

  return (
    <section
      id="skills"
      className="relative py-12 md:py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Static Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block mb-4 md:mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 text-3xl md:text-4xl bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
              <span className="drop-shadow-2xl">💫</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 md:mb-6">
            Technical Arsenal
          </h2>
          
          <div className="w-24 md:w-32 h-2 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full mb-6 md:mb-8" />
          
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experiences with cutting-edge technologies and creative innovation
          </p>
        </div>

        {/* Client Component for animations */}
        <SkillsClient skillsData={skillsData} />
      </div>
    </section>
  );
};

export default Skills;