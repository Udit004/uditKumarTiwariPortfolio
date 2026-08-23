"use client";
import Image from "next/image";
import { ExternalLink, Github, Download } from "lucide-react";
import TechBadge from "./TechBadge";

const ProjectCard = ({ project }) => (
    <div className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/25 hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-video overflow-hidden">
            <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
            />
        </div>
        <div className="p-6">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20 mb-3">
                {project.category}
            </span>
            <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-5">
                {project.technologies.slice(0, 4).map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                ))}
                {project.technologies.length > 4 && (
                    <span className="px-3 py-1 text-xs font-medium text-gray-500">
                        +{project.technologies.length - 4} more
                    </span>
                )}
            </div>
            <div className="flex gap-3">
                {project.liveLink && (
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 justify-center inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition"
                    >
                        <ExternalLink size={14} /> Live Demo
                    </a>
                )}
                {project.downloadLink && (
                    <a
                        href={project.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 justify-center inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium hover:opacity-90 transition"
                    >
                        <Download size={14} /> Download
                    </a>
                )}
                {project.githubLink && (
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 justify-center inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/15 text-gray-300 text-sm font-medium hover:bg-white/10 transition"
                    >
                        <Github size={14} /> View Code
                    </a>
                )}
            </div>
    </div >
  </div >
);

export default ProjectCard;