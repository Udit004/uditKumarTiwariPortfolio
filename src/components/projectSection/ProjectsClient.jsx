"use client";
import { useState, useMemo } from "react";
import FeaturedProjectCard from "./FeaturedProjectCard";
import ProjectCard from "./ProjectCard";

const ProjectsClient = ({ projects, categories }) => {
  const [filter, setFilter] = useState("All");

  const { heroProject, gridProjects } = useMemo(() => {
    const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    const heroIndex = filtered.findIndex((p) => p.featured);
    const hero = heroIndex !== -1 ? filtered[heroIndex] : null;
    const rest = hero ? filtered.filter((_, i) => i !== heroIndex) : filtered;
    return { heroProject: hero, gridProjects: rest };
  }, [filter, projects]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
              filter === category
                ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/20"
                : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {heroProject && <FeaturedProjectCard project={heroProject} />}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {gridProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {gridProjects.length === 0 && !heroProject && (
        <p className="text-center text-gray-400 py-12">No projects in this category yet.</p>
      )}
    </>
  );
};

export default ProjectsClient;