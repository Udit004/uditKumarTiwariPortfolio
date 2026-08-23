import { Sparkles } from "lucide-react";

// Reusable eyebrow + gradient-heading + underline pattern.
// Use this same component for About/Skills/Contact section headers.
const SectionHeader = ({ eyebrow, title, highlight, subtitle }) => (
  <div className="text-center mb-12 md:mb-16">
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium mb-6">
      <Sparkles size={14} />
      {eyebrow}
    </span>
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
      <span className="text-white">{title} </span>
      <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
        {highlight}
      </span>
    </h2>
    <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full mb-8" />
    <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
      {subtitle}
    </p>
  </div>
);

export default SectionHeader;