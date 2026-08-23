"use client";
import Image from "next/image";
import { ExternalLink, Github, Zap } from "lucide-react";
import TechBadge from "./TechBadge";

const FeaturedProjectCard = ({ project }) => (
  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md mb-8">
    <div className="grid lg:grid-cols-2 gap-0">
      <div className="p-8 sm:p-10 flex flex-col justify-center">
        <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-xs font-semibold mb-6 border border-purple-500/30">
          <Zap size={12} /> Featured
        </span>
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          {project.title}
        </h3>
        <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.slice(0, 6).map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:opacity-90 transition"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-gray-200 font-medium hover:bg-white/10 transition"
            >
              <Github size={16} /> View Code
            </a>
          )}
        </div>
      </div>

      <div className="relative bg-slate-950/60 p-4 sm:p-6 flex items-center">
        <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-2 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="relative aspect-video bg-slate-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedProjectCard;