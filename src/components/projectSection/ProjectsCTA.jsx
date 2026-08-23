import { Code2, ArrowRight } from "lucide-react";

const ProjectsCTA = () => (
  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shrink-0">
        <Code2 className="text-white" size={22} />
      </div>
      <div>
        <h4 className="text-white font-semibold text-lg">Have a project in mind?</h4>
        <p className="text-gray-400 text-sm">
          Let's build something amazing together. I'm always open to discussing new opportunities.
        </p>
      </div>
    </div>
    
      <a
      href="#contact"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:opacity-90 transition shrink-0"
    >
      Get In Touch <ArrowRight size={16} />
    </a>
  </div>
);

export default ProjectsCTA;
