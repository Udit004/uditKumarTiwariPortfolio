"use client"
import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { ExternalLink, Github, Download, Eye, Code2, Zap } from "lucide-react";

// Simplified ProjectCard with minimal animations
const ProjectCard = memo(({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-white/30 hover:bg-white/10 ${project.featured ? 'lg:col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient glow on hover */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
      
      <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 h-full">
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs font-bold flex items-center gap-1 z-10">
            <Zap size={12} />
            Featured
          </div>
        )}

        {/* Project Image */}
        <div className="relative overflow-hidden rounded-xl mb-6 aspect-video bg-slate-800/50">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-700 animate-pulse rounded-xl" />
          )}
          <div className={`relative w-full h-full transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} rounded-xl`}
              onLoad={() => setImageLoaded(true)}
              placeholder="empty"
              {...(project.featured ? { priority: true } : { loading: "lazy" })}
            />
          </div>
          
          {/* Overlay on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-200">
              <div className="flex gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
                  >
                    <Eye size={18} />
                  </a>
                )}
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
                >
                  <Code2 size={18} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`text-xl font-bold transition-all duration-200 ${
              isHovered 
                ? 'bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent' 
                : 'text-white'
            }`}>
              {project.title}
            </h3>
            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-xs font-medium text-gray-300 whitespace-nowrap border border-white/10">
              {project.category}
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, project.featured ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-gray-200 rounded-full border border-white/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (project.featured ? 6 : 4) && (
              <span className="px-3 py-1 text-xs font-medium text-gray-400 rounded-full">
                +{project.technologies.length - (project.featured ? 6 : 4)} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            {project.downloadLink && (
              <a
                href={project.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
              >
                <Download size={16} />
                Download
              </a>
            )}
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-gray-200 font-medium rounded-xl hover:bg-white/20 transition-all duration-200 hover:scale-105 border border-white/10"
            >
              <Github size={16} />
              Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Main Client Component
const ProjectsClient = ({ projects, categories }) => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleFilterChange = useCallback((category) => {
    setFilter(category);
  }, []);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 backdrop-blur-sm border ${
              filter === category
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg scale-105 border-transparent'
                : 'bg-white/10 text-gray-200 hover:bg-white/20 hover:scale-105 border-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.title} 
            project={project} 
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectsClient;