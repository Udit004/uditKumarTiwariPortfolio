import {
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, SiExpress, SiMongodb,
  SiTailwindcss, SiFirebase, SiSocketdotio, SiPython, SiPrisma, SiPostgresql,
  SiSupabase, SiCloudinary, SiJavascript, SiHtml5, SiCss, SiRedux, SiFramer,
} from "react-icons/si";
import { Sparkles } from "lucide-react";

const ICON_MAP = {
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  "Next.js App Router": { icon: SiNextdotjs, color: "#ffffff" },
  "React": { icon: SiReact, color: "#61DAFB" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Node.js": { icon: SiNodedotjs, color: "#3C873A" },
  "Express": { icon: SiExpress, color: "#ffffff" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  "Firebase": { icon: SiFirebase, color: "#FFCA28" },
  "Firebase Cloud Messaging": { icon: SiFirebase, color: "#FFCA28" },
  "Socket.IO": { icon: SiSocketdotio, color: "#ffffff" },
  "Python": { icon: SiPython, color: "#3776AB" },
  "Prisma ORM": { icon: SiPrisma, color: "#ffffff" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Cloudinary": { icon: SiCloudinary, color: "#3448C5" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "HTML5": { icon: SiHtml5, color: "#E34F26" },
  "CSS3": { icon: SiCss, color: "#1572B6" },
  "Redux": { icon: SiRedux, color: "#764ABC" },
  "Framer Motion": { icon: SiFramer, color: "#ffffff" },
};

const TechBadge = ({ tech }) => {
  const entry = ICON_MAP[tech];
  const Icon = entry?.icon ?? Sparkles;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-white/5 text-gray-200 rounded-full border border-white/10">
      <Icon size={13} color={entry?.color ?? "#a78bfa"} />
      {tech}
    </span>
  );
};

export default TechBadge;