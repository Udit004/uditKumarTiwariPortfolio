import SectionHeader from "./SectionHeader";
import ProjectsClient from "./ProjectsClient";
import ProjectsCTA from "./ProjectsCTA";
import { projectsData, categories } from "./projectsData";

const Projects = () => (
  <section id="projects" className="relative min-h-screen overflow-hidden">
    <div className="relative z-10 py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="p-6 sm:p-8 md:p-12">
          <SectionHeader
            eyebrow="MY WORK"
            title="Featured"
            highlight="Projects"
            subtitle="Explore a selection of my recent work. Each project is crafted with precision, passion, and the latest technologies."
          />
          <ProjectsClient projects={projectsData} categories={categories} />
          <ProjectsCTA />
        </div>
      </div>
    </div>
  </section>
);

export default Projects;